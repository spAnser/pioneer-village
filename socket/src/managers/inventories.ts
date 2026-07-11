import { and, eq, inArray, isNull, like, or } from 'drizzle-orm';
import { Socket } from 'socket.io';
import type { DefaultEventsMap } from 'socket.io/dist/typed-events';

import InventoryTypes from '../../../lib/shared/inventory-types';
import PVItems from '../../../lib/shared/items';
import { db } from '../db/connection';
import {
  ContainerSchema,
  type ContainerSchemaType,
  InventorySchema,
  type InventorySchemaType,
  ItemSchema,
  type ItemSchemaType,
} from '../db/schema';
import { Delay, logInfo, logInfoS } from '../helpers';
import { userNamespace } from '../server';

type InventoryWithContainerAndItems = InventorySchemaType & {
  container: ContainerSchemaType & { items: ItemSchemaType[] };
};

const PV_DOLLAR_HASH = 'PV_DOLLAR'.GetHashKey();

const startingDollars = new Array(20).fill({ identifier: PV_DOLLAR_HASH, slot: 0 });

const startingInventory = [...startingDollars];

const characterInventoryIdentifiers = ['character', 'clothing', 'birds'];

class Inventories {
  static readonly instance: Inventories = new Inventories();

  private initialized = false;

  private worldInventories = new Set<string>();

  constructor() {
    if (Inventories.instance) {
      throw new Error('Error: Instantiation failed: Use Inventories.Instance instead of new.');
    }
  }

  async init() {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    // Get all inventories that start with _WORLD_:
    const worldInventories = await db
      .select()
      .from(InventorySchema)
      .where(like(InventorySchema.identifier, '_WORLD_:%'));

    const inventoriesWithItems: InventoryWithContainerAndItems[] = [];
    for (const inventory of worldInventories) {
      const inventoryWithItems = await this.getInventory(inventory.identifier);
      if (inventoryWithItems?.container.items.length) {
        inventoriesWithItems.push(inventoryWithItems);
        this.worldInventories.add(inventory.identifier);
      }
    }

    logInfoS('[Inventory]', 'Initialized');

    this.emitWorldInventories();
  }

  async hasInventory(ownerId: number, type: number): Promise<boolean> {
    return false;
  }

  async identifierExists(identifier: string): Promise<boolean> {
    try {
      const inventoryResult = await db
        .select()
        .from(InventorySchema)
        .where(eq(InventorySchema.identifier, identifier))
        .limit(1);
      return inventoryResult.length > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async createCharacterInventories(characterId: number): Promise<void> {
    for (const identifier of characterInventoryIdentifiers) {
      await this.createInventory(`${identifier}:${characterId}`);
    }
  }

  async createInventory(identifier: string): Promise<InventorySchemaType | undefined> {
    try {
      if (await this.identifierExists(identifier)) {
        return;
      }

      logInfo('Creating inventory', identifier);

      // Create container first
      const newContainer = await db.insert(ContainerSchema).values({}).returning();

      // Create inventory
      const newInventory = await db
        .insert(InventorySchema)
        .values({
          identifier,
          containerId: newContainer[0].id,
        })
        .returning();

      // Add starting items if it's a character inventory
      if (identifier.startsWith('character:')) {
        for (const startingItem of startingInventory) {
          await db.insert(ItemSchema).values({
            identifier: startingItem.identifier,
            slot: startingItem.slot,
            containerId: newContainer[0].id,
          });
        }
      }

      return newInventory[0];
    } catch (error) {
      console.error(error);
    }
  }

  async getInventory(identifier: string): Promise<InventoryWithContainerAndItems | null> {
    try {
      if (identifier.startsWith('_WORLD_:')) {
        await this.createInventory(identifier);
      }
      const inventoryResult = await db
        .select()
        .from(InventorySchema)
        .leftJoin(ContainerSchema, eq(InventorySchema.containerId, ContainerSchema.id))
        .where(eq(InventorySchema.identifier, identifier))
        .limit(1);

      if (inventoryResult.length === 0) {
        // Safety net: auto-create sub-container inventories on access if they don't exist yet
        const created = await this.ensureSubContainerInventory(identifier);
        if (created) {
          return this.getInventory(identifier);
        }
        return null;
      }

      const inventoryData = inventoryResult[0].Inventory;
      const containerData = inventoryResult[0].Container;

      if (!inventoryData || !containerData) {
        return null;
      }

      // Get items for this container
      const items = await db
        .select()
        .from(ItemSchema)
        .where(and(eq(ItemSchema.containerId, containerData.id), isNull(ItemSchema.deletedAt)));

      return {
        ...inventoryData,
        container: {
          ...containerData,
          items,
        },
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * Permanently removes an inventory and its container, soft-deleting any
   * remaining items first (there is no cascade FK from Item -> Container).
   */
  async deleteInventory(identifier: string): Promise<void> {
    const inventoryResult = await db.select().from(InventorySchema).where(eq(InventorySchema.identifier, identifier)).limit(1);
    const inventory = inventoryResult[0];
    if (!inventory) {
      return;
    }

    await db
      .update(ItemSchema)
      .set({ deletedAt: new Date() })
      .where(eq(ItemSchema.containerId, inventory.containerId));

    await db.delete(InventorySchema).where(eq(InventorySchema.id, inventory.id));
    await db.delete(ContainerSchema).where(eq(ContainerSchema.id, inventory.containerId));
  }

  /**
   * Counts how many active (non-deleted) items with the given identifier
   * exist in an inventory.
   */
  async getItemCount(identifier: string, itemIdentifier: number): Promise<number> {
    const inventoryData = await this.getInventory(identifier);
    if (!inventoryData) {
      return 0;
    }
    return inventoryData.container.items.filter((item) => item.identifier === itemIdentifier && item.deletedAt === null).length;
  }

  /**
   * Soft-deletes up to `amount` active items matching the given identifier
   * from an inventory. Returns the number actually removed (may be less
   * than requested if the inventory doesn't hold enough).
   */
  async removeItemsByIdentifier(identifier: string, itemIdentifier: number, amount: number): Promise<number> {
    const inventoryData = await this.getInventory(identifier);
    if (!inventoryData) {
      return 0;
    }

    // Drain whole slots/stacks before moving to the next, rather than
    // removing the oldest rows across every stack indiscriminately.
    const bySlot = new Map<number | null, ItemSchemaType[]>();
    for (const item of inventoryData.container.items) {
      if (item.identifier !== itemIdentifier || item.deletedAt !== null) continue;
      const slotItems = bySlot.get(item.slot) ?? [];
      slotItems.push(item);
      bySlot.set(item.slot, slotItems);
    }

    const matching: ItemSchemaType[] = [];
    for (const slotItems of bySlot.values()) {
      if (matching.length >= amount) break;
      matching.push(...slotItems.slice(0, amount - matching.length));
    }

    if (matching.length === 0) {
      return 0;
    }

    await db.update(ItemSchema).set({ deletedAt: new Date() }).where(
      inArray(
        ItemSchema.id,
        matching.map((item) => item.id),
      ),
    );

    this.checkWorldInventory(identifier, true);
    await this.broadcastInventory(identifier);

    return matching.length;
  }

  /** Re-fetches an inventory and pushes a full reload to any subscribed clients. */
  private async broadcastInventory(identifier: string): Promise<void> {
    const inventoryData = await this.getInventory(identifier);
    if (!inventoryData) {
      return;
    }
    const uiInventory = this.convertToUIInventory(inventoryData);
    userNamespace.to(`inventory:${identifier}`).emit('inventory.load', uiInventory);
  }

  /** Gives a character physical cash as `PV_DOLLAR` items in their inventory. */
  async giveCash(characterId: number, amount: number): Promise<void> {
    if (amount <= 0) return;
    const identifier = `character:${characterId}`;
    const itemAddEvent = await this.addItem(identifier, PV_DOLLAR_HASH, Math.round(amount));
    if (itemAddEvent) {
      userNamespace.to(`inventory:${identifier}`).emit('inventory.item-add', itemAddEvent);
    }
  }

  /**
   * Removes up to `amount` physical `PV_DOLLAR` items from a character's
   * inventory. Returns false (removing nothing) if they don't have enough.
   */
  async takeCash(characterId: number, amount: number): Promise<boolean> {
    if (amount <= 0) return true;
    const rounded = Math.round(amount);
    const identifier = `character:${characterId}`;
    const held = await this.getItemCount(identifier, PV_DOLLAR_HASH);
    if (held < rounded) {
      return false;
    }
    const removed = await this.removeItemsByIdentifier(identifier, PV_DOLLAR_HASH, rounded);
    return removed === rounded;
  }

  /** Returns how many physical dollars a character is carrying. */
  async getCash(characterId: number): Promise<number> {
    return this.getItemCount(`character:${characterId}`, PV_DOLLAR_HASH);
  }

  getInventoryType(identifier: string): Inventory.Type {
    const inventoryType = identifier.split(':')[0];
    const inventoryTypeData = InventoryTypes[inventoryType];
    if (inventoryTypeData) {
      return inventoryTypeData;
    }
    return InventoryTypes.DEFAULT;
  }

  convertToUIInventory(dbInventory: InventoryWithContainerAndItems): UI.Inventory.LoadData {
    const inventoryType = this.getInventoryType(dbInventory.identifier);
    const inventoryUI: UI.Inventory.LoadData = {
      identifier: dbInventory.identifier,
      slots: inventoryType.slots,
      maxWeight: inventoryType.maxWeight,
      container: {
        locked: dbInventory.container.locked || false,
        sealed: dbInventory.container.sealed || 'NONE',
      },
      items: {},
    };

    for (const inventoryItem of dbInventory.container.items) {
      // logInfo('item', inventoryItem);
      if (inventoryItem.slot === null || inventoryItem.slot === undefined) {
        continue;
      }
      if (inventoryUI.items[inventoryItem.slot]) {
        inventoryUI.items[inventoryItem.slot].quantity++;
        inventoryUI.items[inventoryItem.slot].ids.push(inventoryItem.id);
        inventoryUI.items[inventoryItem.slot].metadatas.push(inventoryItem.metadata);
        inventoryUI.items[inventoryItem.slot].durabilities.push(inventoryItem.durability);
      } else {
        inventoryUI.items[inventoryItem.slot] = {
          identifier: inventoryItem.identifier,
          ids: [inventoryItem.id],
          metadatas: [inventoryItem.metadata],
          durabilities: [inventoryItem.durability],
          quantity: 1,
        };
      }
    }

    return inventoryUI;
  }

  async getInventoryForUI(identifier: string): Promise<UI.Inventory.LoadData | undefined> {
    const dbInventory = await this.getInventory(identifier);
    if (!dbInventory) {
      return;
    }

    return this.convertToUIInventory(dbInventory);
  }

  async getItem(itemId: number) {
    const itemResult = await db.select().from(ItemSchema).where(eq(ItemSchema.id, itemId)).limit(1);

    if (itemResult.length === 0) {
      return;
    }

    return itemResult[0];
  }

  async getItemInSlot(identifier: string, slot: number): Promise<ItemSchemaType | undefined> {
    const inventory = await this.getInventory(identifier);

    if (!inventory) {
      return;
    }

    const itemsInSlot = inventory.container.items.filter((item) => item.slot === slot && item.deletedAt === null);

    if (itemsInSlot.length === 0) {
      return;
    }

    return itemsInSlot[0];
  }

  async getFirstActiveItemByIdentifier(
    identifier: string,
    itemIdentifier: number,
  ): Promise<ItemSchemaType | undefined> {
    const inventory = await this.getInventory(identifier);

    if (!inventory) {
      return;
    }

    return inventory.container.items.find((item) => item.identifier === itemIdentifier && item.deletedAt === null);
  }

  async getInventoryForItem(itemId: number): Promise<{ identifier: string; slot: number | null } | undefined> {
    console.log('getInventoryForItem', itemId);
    const itemResult = await db.select().from(ItemSchema).where(eq(ItemSchema.id, itemId)).limit(1);

    if (itemResult.length === 0) {
      return;
    }

    const item = itemResult[0];
    console.log('item', item);

    const inventoryResult = await db
      .select({ identifier: InventorySchema.identifier })
      .from(InventorySchema)
      .where(eq(InventorySchema.containerId, item.containerId))
      .limit(1);

    if (inventoryResult.length === 0) {
      return;
    }

    return {
      identifier: inventoryResult[0].identifier,
      slot: item.slot,
    };
  }

  findSlotForItem(inventory: InventoryWithContainerAndItems, itemIdentifier: number) {
    const inventoryType = this.getInventoryType(inventory.identifier);

    let numberOfSlots = inventoryType.slots;

    if (inventoryType.maxWeight === Infinity) {
      let maxSlot = inventoryType.slots;
      for (const inventoryItem of inventory.container.items) {
        if (typeof inventoryItem.slot === 'number' && inventoryItem.slot > maxSlot) {
          maxSlot = inventoryItem.slot;
        }
      }

      numberOfSlots = maxSlot + 1;
    }

    const slots: Array<boolean | number> = new Array(numberOfSlots).fill(false);
    const slotCounts: Record<number, number> = {};
    for (const inventoryItem of inventory.container.items) {
      if (typeof inventoryItem.slot !== 'number') {
        continue;
      }
      slots[inventoryItem.slot] = inventoryItem.identifier;
      slotCounts[inventoryItem.slot] = (slotCounts[inventoryItem.slot] || 0) + 1;
    }

    for (const s in slots) {
      const slot = Number(s);
      if (slots[slot] === false) {
        continue;
      }
      if (slots[slot] === itemIdentifier && slotCounts[slot] < PVItems[itemIdentifier].stackSize) {
        return slot;
      }
    }

    return slots.indexOf(false);
  }

  isAllowedInInventory(identifier: string, inventoryItem: Inventory.Item): boolean {
    const inventoryType = this.getInventoryType(identifier);
    let isAllowed = false;
    logInfo('isAllowedInInventory', inventoryType.restrictions, inventoryItem.restriction);
    if (inventoryType.restrictions === 0 || inventoryType.restrictions & inventoryItem.restriction) {
      isAllowed = true;
    }
    logInfo('isAllowedInInventory result', isAllowed);
    return isAllowed;
  }

  async changeDurability(itemId: number, durability = -1): Promise<{ success: boolean; inventoryIdentifier?: string }> {
    try {
      const itemResult = await db.select().from(ItemSchema).where(eq(ItemSchema.id, itemId)).limit(1);

      if (itemResult.length === 0 || itemResult[0].durability === null) {
        return { success: false };
      }

      const inventoryResult = await db
        .select()
        .from(InventorySchema)
        .where(eq(InventorySchema.containerId, itemResult[0].containerId))
        .limit(1);

      const newDurability = Math.max((itemResult[0].durability || 0) + durability, 0);
      const durabilityUpdate = await db
        .update(ItemSchema)
        .set({ durability: newDurability })
        .where(eq(ItemSchema.id, itemId))
        .returning();

      return {
        success: durabilityUpdate.length > 0 && durabilityUpdate[0].durability === newDurability,
        inventoryIdentifier: inventoryResult[0]?.identifier,
      };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }

  async updateItemMetadata(
    itemId: number,
    partialMetadata: Record<string, any>,
  ): Promise<{ success: boolean; inventoryIdentifier?: string; metadata?: Record<string, any> }> {
    try {
      const itemResult = await db.select().from(ItemSchema).where(eq(ItemSchema.id, itemId)).limit(1);

      if (itemResult.length === 0) {
        return { success: false };
      }

      const item = itemResult[0];
      const existingMetadata = (item.metadata || {}) as Record<string, any>;
      const mergedMetadata = { ...existingMetadata, ...partialMetadata };

      const inventoryResult = await db
        .select()
        .from(InventorySchema)
        .where(eq(InventorySchema.containerId, item.containerId))
        .limit(1);

      await db.update(ItemSchema).set({ metadata: mergedMetadata }).where(eq(ItemSchema.id, itemId));

      return {
        success: true,
        inventoryIdentifier: inventoryResult[0]?.identifier,
        metadata: mergedMetadata,
      };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }

  private async validateInventories(
    oldIdentifier: string,
    newIdentifier: string,
  ): Promise<{ oldInventory: InventoryWithContainerAndItems; newInventory: InventoryWithContainerAndItems } | null> {
    const oldInventory = await this.getInventory(oldIdentifier);
    const newInventory = await this.getInventory(newIdentifier);

    if (!oldInventory || !newInventory) {
      return null;
    }

    return { oldInventory, newInventory };
  }

  // Helper function to find item in inventory slot
  private findItemsInSlot(inventory: InventoryWithContainerAndItems, slot: number) {
    // console.log(
    //   'inventory.container.items',
    //   typeof slot,
    //   slot,
    //   inventory.container.items.map((item: ItemSchemaType) => item.slot),
    // );

    return (
      inventory.container.items.filter((item: ItemSchemaType) => item.slot === slot && item.deletedAt === null) || null
    );
  }

  // Helper function to validate item can be moved to new inventory
  private validateItemMove(item: ItemSchemaType[], newIdentifier: string): boolean {
    const itemData = PVItems[item[0].identifier];
    if (!itemData || !this.isAllowedInInventory(newIdentifier, itemData)) {
      return false;
    }
    // Prevent nesting a container inside the same container type
    if (itemData.containerType) {
      const destType = newIdentifier.split(':')[0];
      if (destType === itemData.containerType) {
        return false;
      }
    }
    return true;
  }

  // Helper function to create item data for response
  private createItemData(items: ItemSchemaType[]): UI.Inventory.ItemData {
    return {
      identifier: items[0].identifier,
      ids: items.map((item) => item.id),
      metadatas: items.map((item) => item.metadata),
      durabilities: items.map((item) => item.durability),
      quantity: items.length,
    };
  }

  private createFailureResponse(
    identifier: string,
    requestId: number,
    requestType: UI.Inventory.RequestType,
  ): [UI.Inventory.SuccessFailData, null] {
    return [
      {
        identifier,
        requestId,
        requestType,
      } satisfies UI.Inventory.SuccessFailData,
      null,
    ];
  }

  // Helper function to perform database swap operation
  private async performItemSwap(
    oldItems: ItemSchemaType[],
    existingItems: ItemSchemaType[],
    oldSlot: number,
    newSlot: number,
    oldInventory: InventorySchemaType,
    newInventory: InventorySchemaType,
  ): Promise<void> {
    // Move existing item to old slot
    await db
      .update(ItemSchema)
      .set({
        slot: oldSlot,
        containerId: oldInventory.containerId,
      })
      .where(
        inArray(
          ItemSchema.id,
          existingItems.map((item) => item.id),
        ),
      );

    // Move old item to new slot
    await db
      .update(ItemSchema)
      .set({
        slot: newSlot,
        containerId: newInventory.containerId,
      })
      .where(
        inArray(
          ItemSchema.id,
          oldItems.map((item) => item.id),
        ),
      );
  }

  // Helper function to perform simple move operation
  private async performSimpleMove(
    moveItems: ItemSchemaType[],
    newSlot: number,
    newInventory: InventorySchemaType,
  ): Promise<void> {
    await db
      .update(ItemSchema)
      .set({
        slot: newSlot,
        containerId: newInventory.containerId,
      })
      .where(
        inArray(
          ItemSchema.id,
          moveItems.map((item) => item.id),
        ),
      );
  }

  // Helper function to create swap response
  private createSwapResponse(
    characterId: number,
    requestId: number,
    oldIdentifier: string,
    newIdentifier: string,
    oldSlot: number,
    newSlot: number,
    oldItems: ItemSchemaType[],
    existingItems: ItemSchemaType[],
  ): [UI.Inventory.MoveData, UI.Inventory.MoveData] {
    return [
      {
        charRequestId: `${characterId}:${requestId}`,
        identifier: oldIdentifier,
        items: {
          [oldSlot]: this.createItemData(existingItems),
        },
        emptySlots: [],
      } satisfies UI.Inventory.MoveData,
      {
        charRequestId: `${characterId}:${requestId}`,
        identifier: newIdentifier,
        items: {
          [newSlot]: this.createItemData(oldItems),
        },
        emptySlots: [],
      } satisfies UI.Inventory.MoveData,
    ];
  }

  // Helper function to create simple move response
  private createSimpleMoveResponse(
    characterId: number,
    requestId: number,
    oldIdentifier: string,
    newIdentifier: string,
    oldSlot: number,
    newSlot: number,
    movedItems: ItemSchemaType[],
  ): [UI.Inventory.MoveData, UI.Inventory.MoveData] {
    return [
      {
        charRequestId: `${characterId}:${requestId}`,
        identifier: oldIdentifier,
        items: {},
        emptySlots: [oldSlot],
      } satisfies UI.Inventory.MoveData,
      {
        charRequestId: `${characterId}:${requestId}`,
        identifier: newIdentifier,
        items: {
          [newSlot]: this.createItemData(movedItems),
        },
        emptySlots: [],
      } satisfies UI.Inventory.MoveData,
    ];
  }

  async checkWorldInventory(identifier: string, force = false) {
    if (!identifier.startsWith('_WORLD_:')) {
      return;
    }
    let change = false;
    if (force) {
      if (this.worldInventories.has(identifier)) {
        return;
      }
      this.worldInventories.add(identifier);
      change = true;
    } else {
      await Delay(500);
      const inventory = await this.getInventory(identifier);

      if (!inventory?.container.items.length) {
        if (!this.worldInventories.has(identifier)) {
          return;
        }
        this.worldInventories.delete(identifier);
        change = true;
      } else {
        if (this.worldInventories.has(identifier)) {
          return;
        }
        this.worldInventories.add(identifier);
        change = true;
      }
    }

    if (change) {
      this.emitWorldInventories();
    }
  }

  emitWorldInventories() {
    logInfo('inventory.check-world', 'Emitting world inventories', [...this.worldInventories.values()]);
    userNamespace.emit('__client__', 'inventory.world-inventories', [...this.worldInventories.values()]);
  }

  async addItem(
    inventoryIdentifier: string,
    itemIdentifier: number,
    amount = 1,
    metadata: Record<string, any> = {},
    durability: number | null = null,
  ): Promise<UI.Inventory.AddData | void> {
    try {
      const inventoryData = await this.getInventory(inventoryIdentifier);

      if (!inventoryData) {
        throw new Error('Inventory not found');
      }

      const itemAddEvent: UI.Inventory.AddData = {
        identifier: inventoryIdentifier,
        items: {},
      };

      const itemDef = PVItems[itemIdentifier];
      const stackSize = itemDef?.stackSize ?? 1;

      let remaining = amount;
      let currentInventoryData = inventoryData;

      while (remaining > 0) {
        const slot = this.findSlotForItem(currentInventoryData, itemIdentifier);
        logInfo('slot', slot, slot > -1);

        if (slot < 0) {
          throw new Error('No free slot found');
        }

        const existingInSlot = currentInventoryData.container.items.filter(
          (item) => item.slot === slot && item.identifier === itemIdentifier,
        ).length;
        const spaceInSlot = Math.max(stackSize - existingInSlot, 1);
        const toInsert = Math.min(remaining, spaceInSlot);

        for (let n = toInsert; n--; ) {
          const newItem = await db
            .insert(ItemSchema)
            .values({
              identifier: itemIdentifier,
              slot,
              containerId: currentInventoryData.containerId,
              metadata,
              durability,
            })
            .returning();

          logInfo('item', newItem[0]);

          // Auto-create sub-container inventory if the item definition has a containerType
          if (itemDef?.containerType) {
            const subContainerIdentifier = `${itemDef.containerType}:${newItem[0].id}`;
            logInfo('addItem', `Creating sub-container inventory: ${subContainerIdentifier}`);
            await this.createInventory(subContainerIdentifier);
          }

          if (itemAddEvent.items[slot]) {
            itemAddEvent.items[slot].ids.push(newItem[0].id);
            itemAddEvent.items[slot].metadatas.push(metadata);
            itemAddEvent.items[slot].durabilities.push(durability);
            itemAddEvent.items[slot].quantity++;
          } else {
            itemAddEvent.items[slot] = {
              identifier: itemIdentifier,
              ids: [newItem[0].id],
              metadatas: [metadata],
              durabilities: [durability],
              quantity: 1,
            };
          }
        }

        remaining -= toInsert;

        if (remaining > 0) {
          // Re-fetch so the next findSlotForItem sees the slot we just filled.
          const refreshed = await this.getInventory(inventoryIdentifier);
          if (!refreshed) {
            throw new Error('Inventory not found');
          }
          currentInventoryData = refreshed;
        }
      }

      this.checkWorldInventory(inventoryData.identifier, true);

      return itemAddEvent;
    } catch (error) {
      console.error(error);
    }
  }

  async stackItem(
    characterId: number,
    requestId: number,
    oldIdentifier: string,
    oldSlot: number,
    newIdentifier: string,
    newSlot: number,
  ): Promise<[UI.Inventory.MoveOrFailData, UI.Inventory.MoveOrFailData | null] | void> {
    try {
      // Get both inventories
      const oldInventory = await this.getInventory(oldIdentifier);
      const newInventory = await this.getInventory(newIdentifier);

      if (!oldInventory || !newInventory) {
        return this.createFailureResponse(oldIdentifier, requestId, 'stack');
      }

      // Find the item to move from old slot
      const oldItems = this.findItemsInSlot(oldInventory, oldSlot);
      if (!oldItems || oldItems.length === 0) {
        return this.createFailureResponse(oldIdentifier, requestId, 'stack');
      }

      // Check if items can be stacked
      const itemData = PVItems[oldItems[0].identifier];
      if (!itemData || itemData.stackSize <= 1) {
        return this.createFailureResponse(oldIdentifier, requestId, 'stack');
      }

      // Find existing item in new slot
      const existingItems = this.findItemsInSlot(newInventory, newSlot);

      if (existingItems && existingItems[0]?.identifier !== oldItems[0].identifier) {
        return this.createFailureResponse(oldIdentifier, requestId, 'stack');
      }

      // Count existing items in the new slot
      const existingCount = existingItems?.length || 0;

      const itemsToMove = Math.min(itemData.stackSize - existingCount, oldItems.length);

      if (itemsToMove <= 0) {
        return this.createFailureResponse(oldIdentifier, requestId, 'stack');
      }

      const movedItems = oldItems.slice(0, itemsToMove);

      // Move the item by updating its slot and container
      await db
        .update(ItemSchema)
        .set({
          slot: newSlot,
          containerId: newInventory.containerId,
        })
        .where(
          inArray(
            ItemSchema.id,
            movedItems.map((item) => item.id),
          ),
        );

      this.checkWorldInventory(oldIdentifier);
      if (oldIdentifier !== newIdentifier) {
        this.checkWorldInventory(newIdentifier, true);
      }

      // Return success events as MoveData
      return [
        {
          charRequestId: `${characterId}:${requestId}`,
          identifier: oldIdentifier,
          items: {},
          emptySlots: [oldSlot],
        } satisfies UI.Inventory.MoveData,
        {
          charRequestId: `${characterId}:${requestId}`,
          identifier: newIdentifier,
          items: {
            [newSlot]: this.createItemData([...existingItems, ...movedItems]),
          },
          emptySlots: [],
        } satisfies UI.Inventory.MoveData,
      ];
    } catch (error) {
      console.error('Error in stackItem:', error);
      return [
        {
          identifier: oldIdentifier,
          requestId,
          requestType: 'stack',
        } satisfies UI.Inventory.SuccessFailData,
        null,
      ];
    }
  }

  // Helper function to create partial move response
  private createPartialMoveResponse(
    characterId: number,
    requestId: number,
    oldIdentifier: string,
    newIdentifier: string,
    oldSlot: number,
    newSlot: number,
    movedItems: ItemSchemaType[],
    remainingItems: ItemSchemaType[],
  ): [UI.Inventory.MoveData, UI.Inventory.MoveData] {
    return [
      {
        charRequestId: `${characterId}:${requestId}`,
        identifier: oldIdentifier,
        items: {
          [oldSlot]: this.createItemData(remainingItems),
        },
        emptySlots: [],
      } satisfies UI.Inventory.MoveData,
      {
        charRequestId: `${characterId}:${requestId}`,
        identifier: newIdentifier,
        items: {
          [newSlot]: this.createItemData(movedItems),
        },
        emptySlots: [],
      } satisfies UI.Inventory.MoveData,
    ];
  }

  // Refactored main function
  async moveItem(
    characterId: number,
    requestId: number,
    oldIdentifier: string,
    oldSlot: number,
    newIdentifier: string,
    newSlot: number,
    quantity?: number,
  ): Promise<[UI.Inventory.MoveOrFailData, UI.Inventory.MoveOrFailData | null]> {
    console.log('===================');
    try {
      // Validate inventories exist
      const inventories = await this.validateInventories(oldIdentifier, newIdentifier);
      if (!inventories) {
        console.log('=================== AAA');
        return this.createFailureResponse(oldIdentifier, requestId, 'move');
      }

      const { oldInventory, newInventory } = inventories;

      // Find the item to move
      const oldItems = this.findItemsInSlot(oldInventory, oldSlot);
      if (!oldItems || oldItems.length === 0) {
        console.log('=================== BBB', oldIdentifier, oldSlot, oldItems);
        return this.createFailureResponse(oldIdentifier, requestId, 'move');
      }

      // Validate item can be moved to new inventory
      if (!this.validateItemMove(oldItems, newIdentifier)) {
        console.log('=================== CCC');
        return this.createFailureResponse(oldIdentifier, requestId, 'move');
      }

      // Determine if this is a partial move
      const isPartialMove = quantity !== undefined && quantity > 0 && quantity < oldItems.length;

      // Check if destination slot is occupied
      const existingItem = this.findItemsInSlot(newInventory, newSlot);

      this.checkWorldInventory(oldIdentifier);
      if (oldIdentifier !== newIdentifier) {
        this.checkWorldInventory(newIdentifier, true);
      }

      if (existingItem && existingItem.length > 0) {
        // Cannot partial-move onto an occupied slot
        if (isPartialMove) {
          return this.createFailureResponse(oldIdentifier, requestId, 'move');
        }
        // Validate the displaced item can go back to the source inventory
        if (!this.validateItemMove(existingItem, oldIdentifier)) {
          return this.createFailureResponse(oldIdentifier, requestId, 'move');
        }
        // Perform swap operation
        await this.performItemSwap(oldItems, existingItem, oldSlot, newSlot, oldInventory, newInventory);
        return this.createSwapResponse(
          characterId,
          requestId,
          oldIdentifier,
          newIdentifier,
          oldSlot,
          newSlot,
          oldItems,
          existingItem,
        );
      }

      if (isPartialMove) {
        // Split: move only `quantity` items, leave the rest
        const movedItems = oldItems.slice(0, quantity);
        const remainingItems = oldItems.slice(quantity);

        await this.performSimpleMove(movedItems, newSlot, newInventory);
        return this.createPartialMoveResponse(
          characterId,
          requestId,
          oldIdentifier,
          newIdentifier,
          oldSlot,
          newSlot,
          movedItems,
          remainingItems,
        );
      }

      // Perform simple move operation (move all)
      await this.performSimpleMove(oldItems, newSlot, newInventory);
      return this.createSimpleMoveResponse(
        characterId,
        requestId,
        oldIdentifier,
        newIdentifier,
        oldSlot,
        newSlot,
        oldItems,
      );
    } catch (error) {
      console.error('Error in moveItem:', error);
    }
    console.log('=================== DDD');
    return this.createFailureResponse(oldIdentifier, requestId, 'move');
  }

  async moveItemToInventory(
    characterId: number,
    requestId: number,
    oldIdentifier: string,
    oldSlot: number,
    newIdentifier: string,
  ): Promise<[UI.Inventory.MoveOrFailData, UI.Inventory.MoveOrFailData | null]> {
    const newInventory = await this.getInventory(newIdentifier);
    if (!newInventory) {
      return this.createFailureResponse(oldIdentifier, requestId, 'move');
    }

    let newSlot = this.findSlotForItem(newInventory, 0);

    if (newSlot < 0) {
      return this.createFailureResponse(oldIdentifier, requestId, 'move');
    }

    this.checkWorldInventory(oldIdentifier);
    if (oldIdentifier !== newIdentifier) {
      this.checkWorldInventory(newIdentifier, true);
    }

    return await this.moveItem(characterId, requestId, oldIdentifier, oldSlot, newIdentifier, newSlot);
  }

  coordsToWorldIdentifier(coords: Vector3Format) {
    const x = Math.round(coords.x);
    const y = Math.round(coords.y);
    const z = Math.round(coords.z - 1);
    return `_WORLD_:${x}_${y}_${z}`;
  }

  async getWorldInventoryAtCoords(coords: Vector3Format) {
    const identifier = this.coordsToWorldIdentifier(coords);
    const inventory = await this.getInventory(identifier);
    if (!inventory) {
      return null;
    }
    return inventory;
  }

  async getWorldInventoryAtCoordsContainingItems(coords: Vector3Format) {
    const inventory = await this.getWorldInventoryAtCoords(coords);
    if (!inventory?.container.items.length) {
      const identifier = this.coordsToWorldIdentifier(coords);
      logInfo('inventory.check-world', `${identifier} does not exist or has no items.`);
    }

    return inventory;
  }

  async moveItemToWorld(
    characterId: number,
    requestId: number,
    oldIdentifier: string,
    oldSlot: number,
    coords: Vector3Format,
  ): Promise<[UI.Inventory.MoveOrFailData, UI.Inventory.MoveOrFailData | null]> {
    const newIdentifier = this.coordsToWorldIdentifier(coords);

    // Create the world inventory if it doesn't exist
    if (!(await this.identifierExists(newIdentifier))) {
      const inventory = await this.createInventory(newIdentifier);
      if (!inventory) {
        return this.createFailureResponse(oldIdentifier, requestId, 'move');
      }
    }

    this.checkWorldInventory(oldIdentifier);
    if (oldIdentifier !== newIdentifier) {
      this.checkWorldInventory(newIdentifier);
    }

    return await this.moveItemToInventory(characterId, requestId, oldIdentifier, oldSlot, newIdentifier);
  }

  async hasDoorKey(identifier: string, doorHash: number): Promise<boolean> {
    const inventoryData = await this.getInventory(identifier);
    if (inventoryData) {
      for (const inventoryItem of inventoryData.container.items) {
        if (inventoryItem.identifier === 'PV_DOOR_KEY'.GetHashKey()) {
          if (
            inventoryItem?.metadata &&
            typeof inventoryItem?.metadata === 'object' &&
            !Array.isArray(inventoryItem?.metadata)
          ) {
            const metadata = inventoryItem.metadata as Inventory.DoorKeyMetadata;
            if (metadata?.doorHash === doorHash) {
              return true;
            }
            if (
              metadata?.doorHashes &&
              Array.isArray(metadata?.doorHashes) &&
              metadata?.doorHashes.includes(doorHash)
            ) {
              return true;
            }
            if (metadata?.linkedDoors) {
              for (const linkedDoorHashes of metadata?.linkedDoors as any[]) {
                if (Array.isArray(linkedDoorHashes) && linkedDoorHashes.includes(doorHash)) {
                  return true;
                }
              }
            }
          }
        }
      }
    }
    return false;
  }

  async getWorldInventories() {
    return this.worldInventories.values();
  }

  async sendWorldInventories(socket: Socket<SocketIn.FromClient, SocketOut.ToClient, DefaultEventsMap, any>) {
    await Delay(5000);
    const inventories = [...this.worldInventories.values()];
    logInfo('inventory.sendWorldInventories', 'Sending world inventories', inventories);
    socket.emit('__client__', 'inventory.world-inventories', inventories);
  }

  /**
   * Safety net for sub-container inventories. When accessing an inventory like `bird:333`,
   * if it doesn't exist yet, checks whether item 333 exists and has a matching containerType.
   * If so, creates the inventory on-the-fly.
   */
  private async ensureSubContainerInventory(identifier: string): Promise<boolean> {
    const parts = identifier.split(':');
    if (parts.length !== 2) {
      return false;
    }

    const [type, idStr] = parts;
    const itemId = parseInt(idStr, 10);
    if (isNaN(itemId)) {
      return false;
    }

    // Look up the item in the database
    const item = await this.getItem(itemId);
    if (!item || item.deletedAt !== null) {
      return false;
    }

    // Check if the item definition has a containerType matching this identifier's type
    const itemDef = PVItems[item.identifier];
    if (!itemDef?.containerType || itemDef.containerType !== type) {
      return false;
    }

    logInfo('ensureSubContainerInventory', `Creating missing sub-container inventory: ${identifier}`);
    const created = await this.createInventory(identifier);
    return !!created;
  }

  /**
   * Removes an item by setting its deletedAt timestamp (soft-delete).
   * If the item has a containerType (sub-container), checks for remaining items
   * in the sub-container and logs a warning if any exist.
   */
  async removeItem(itemId: number): Promise<ItemSchemaType | undefined> {
    try {
      console.log('removeItem', itemId);
      const item = await this.getItem(itemId);
      console.log('item', item);
      if (!item) {
        console.log('No item matching', itemId);
        return;
      }

      // Soft-delete the item
      const deletedItems = await db
        .update(ItemSchema)
        .set({ deletedAt: new Date() })
        .where(eq(ItemSchema.id, itemId))
        .returning();

      if (deletedItems.length === 0) {
        console.log('No items deleted matching', itemId);
        return;
      }
      console.log('deletedItems.length', deletedItems.length);

      const deletedItem = deletedItems[0];

      // Find which inventory this item belonged to for update notifications
      const inventoryResult = await db
        .select({ identifier: InventorySchema.identifier })
        .from(InventorySchema)
        .where(eq(InventorySchema.containerId, item.containerId))
        .limit(1);

      if (inventoryResult.length > 0) {
        this.checkWorldInventory(inventoryResult[0].identifier);
      }

      // Check for sub-container if the item has a containerType
      const itemDef = PVItems[item.identifier];
      if (itemDef?.containerType) {
        const subContainerIdentifier = `${itemDef.containerType}:${itemId}`;
        const subInventory = await this.getInventory(subContainerIdentifier);

        if (subInventory) {
          const activeItems = subInventory.container.items.filter((i) => i.deletedAt === null);
          if (activeItems.length > 0) {
            console.warn(
              `[Inventory] WARNING: Removed item ${itemId} (${itemDef.name}) has sub-container ` +
                `${subContainerIdentifier} with ${activeItems.length} active item(s) still inside.`,
            );
          }
        }
      }

      return deletedItem;
    } catch (error) {
      console.error('Error in removeItem:', error);
    }
  }
}

export default Inventories.instance;
