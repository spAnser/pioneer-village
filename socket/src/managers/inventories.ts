import { eq, inArray } from 'drizzle-orm';
import { db } from '../db/connection';
import { inventory, container, item, type Inventory, type Container, type Item } from '../db/schema';
import { logInfo } from '../helpers/log';
import PVItems from '../../../lib/shared/items';
import InventoryTypes from '../../../lib/shared/inventory-types';

type InventoryWithContainerAndItems = Inventory & { container: Container & { items: Item[] } };
const tenDollars = new Array(10).fill({ identifier: 'PV_DOLLAR'.GetHashKey(), slot: 0 });

const startingInventory = [...tenDollars];

class Inventories {
  static readonly instance: Inventories = new Inventories();

  constructor() {
    if (Inventories.instance) {
      throw new Error('Error: Instantiation failed: Use Inventories.Instance instead of new.');
    }
  }

  async hasInventory(ownerId: number, type: number): Promise<boolean> {
    return false;
  }

  async createInventory(identifier: string): Promise<Inventory | undefined> {
    try {
      // Create container first
      const newContainer = await db.insert(container).values({}).returning();
      
      // Create inventory
      const newInventory = await db.insert(inventory).values({
        identifier,
        containerId: newContainer[0].id,
      }).returning();

      // Add starting items if it's a character inventory
      if (identifier.startsWith('character:')) {
        for (const startingItem of startingInventory) {
          await db.insert(item).values({
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
      const inventoryResult = await db
        .select()
        .from(inventory)
        .leftJoin(container, eq(inventory.containerId, container.id))
        .where(eq(inventory.identifier, identifier))
        .limit(1);

      if (inventoryResult.length === 0) {
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
        .from(item)
        .where(eq(item.containerId, containerData.id));

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

  getInventoryType(identifier: string): Inventory.Type {
    const inventoryType = identifier.split(':')[0];
    const inventoryTypeData = InventoryTypes[inventoryType];
    if (inventoryTypeData) {
      return inventoryTypeData;
    }
    return InventoryTypes.DEFAULT;
  }

  async getInventoryForUI(identifier: string): Promise<UI.Inventory.LoadData | undefined> {
    const dbInventory = await this.getInventory(identifier);
    if (!dbInventory) {
      return;
    }
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

  findSlotForItem(inventory: InventoryWithContainerAndItems, itemIdentifier: number) {
    const inventoryType = this.getInventoryType(inventory.identifier);

    const slots: Array<boolean | number> = new Array(inventoryType.slots).fill(false);
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
    if (inventoryType.restrictions === 0 || inventoryType.restrictions & inventoryItem.restriction) {
      isAllowed = true;
    }
    return isAllowed;
  }

  async changeDurability(itemId: number, durability = -1): Promise<{ success: boolean; inventoryIdentifier?: string }> {
    try {
      const itemResult = await db
        .select()
        .from(item)
        .where(eq(item.id, itemId))
        .limit(1);

      if (itemResult.length === 0 || itemResult[0].durability === null) {
        return { success: false };
      }

      const inventoryResult = await db
        .select()
        .from(inventory)
        .where(eq(inventory.containerId, itemResult[0].containerId))
        .limit(1);

      const newDurability = Math.max((itemResult[0].durability || 0) + durability, 0);
      const durabilityUpdate = await db
        .update(item)
        .set({ durability: newDurability })
        .where(eq(item.id, itemId))
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

      const slot = this.findSlotForItem(inventoryData, itemIdentifier);
      logInfo('slot', slot, slot > -1);

      if (slot < 0) {
        throw new Error('No free slot found');
      }

      const itemAddEvent: UI.Inventory.AddData = {
        identifier: inventoryIdentifier,
        items: {},
      };

      for (let n = amount; n--; ) {
        const newItem = await db.insert(item).values({
          identifier: itemIdentifier,
          slot,
          containerId: inventoryData.containerId,
          metadata,
          durability,
        }).returning();

        logInfo('item', newItem[0]);

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
        return [
          {
            identifier: oldIdentifier,
            requestId,
            requestType: 'stack',
          } as UI.Inventory.SuccessFailData,
          null,
        ];
      }

      // Find the item to move from old slot
      const oldItem = oldInventory.container.items.find(
        (itm) => itm.slot === oldSlot && itm.deletedAt === null
      );

      if (!oldItem) {
        return [
          {
            identifier: oldIdentifier,
            requestId,
            requestType: 'stack',
          } as UI.Inventory.SuccessFailData,
          null,
        ];
      }

      // Find existing item in new slot
      const existingItem = newInventory.container.items.find(
        (itm) => itm.slot === newSlot && itm.deletedAt === null
      );

      if (!existingItem || existingItem.identifier !== oldItem.identifier) {
        return [
          {
            identifier: oldIdentifier,
            requestId,
            requestType: 'stack',
          } as UI.Inventory.SuccessFailData,
          null,
        ];
      }

      // Check if items can be stacked
      const itemData = PVItems[oldItem.identifier];
      if (!itemData || itemData.stackSize <= 1) {
        return [
          {
            identifier: oldIdentifier,
            requestId,
            requestType: 'stack',
          } as UI.Inventory.SuccessFailData,
          null,
        ];
      }

      // Count existing items in the new slot
      const existingCount = newInventory.container.items.filter(
        (itm) => itm.slot === newSlot && itm.deletedAt === null
      ).length;

      if (existingCount >= itemData.stackSize) {
        return [
          {
            identifier: oldIdentifier,
            requestId,
            requestType: 'stack',
          } as UI.Inventory.SuccessFailData,
          null,
        ];
      }

      // Move the item by updating its slot and container
      await db
        .update(item)
        .set({
          slot: newSlot,
          containerId: newInventory.containerId,
        })
        .where(eq(item.id, oldItem.id));

      // Return success events as MoveData
      return [
        {
          charRequestId: requestId.toString(),
          identifier: oldIdentifier,
          items: {},
          emptySlots: [oldSlot],
        } as UI.Inventory.MoveData,
        {
          charRequestId: requestId.toString(),
          identifier: newIdentifier,
          items: {
            [newSlot]: {
              identifier: oldItem.identifier,
              ids: [oldItem.id],
              metadatas: [oldItem.metadata],
              durabilities: [oldItem.durability],
              quantity: 1,
            },
          },
          emptySlots: [],
        } as UI.Inventory.MoveData,
      ];
    } catch (error) {
      console.error('Error in stackItem:', error);
      return [
        {
          identifier: oldIdentifier,
          requestId,
          requestType: 'stack',
        } as UI.Inventory.SuccessFailData,
        null,
      ];
    }
  }

  async moveItem(
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
        return [
          {
            identifier: oldIdentifier,
            requestId,
            requestType: 'move',
          } as UI.Inventory.SuccessFailData,
          null,
        ];
      }

      // Find the item to move from old slot
      const oldItem = oldInventory.container.items.find(
        (itm) => itm.slot === oldSlot && itm.deletedAt === null
      );

      if (!oldItem) {
        return [
          {
            identifier: oldIdentifier,
            requestId,
            requestType: 'move',
          } as UI.Inventory.SuccessFailData,
          null,
        ];
      }

      // Check if item is allowed in new inventory
      const itemData = PVItems[oldItem.identifier];
      if (!itemData || !this.isAllowedInInventory(newIdentifier, itemData)) {
        return [
          {
            identifier: oldIdentifier,
            requestId,
            requestType: 'move',
          } as UI.Inventory.SuccessFailData,
          null,
        ];
      }

      // Check if new slot is occupied
      const existingItem = newInventory.container.items.find(
        (itm) => itm.slot === newSlot && itm.deletedAt === null
      );

      if (existingItem) {
        // Swap items if both slots are occupied
        await db
          .update(item)
          .set({
            slot: oldSlot,
            containerId: oldInventory.containerId,
          })
          .where(eq(item.id, existingItem.id));

        await db
          .update(item)
          .set({
            slot: newSlot,
            containerId: newInventory.containerId,
          })
          .where(eq(item.id, oldItem.id));

        return [
          {
            charRequestId: requestId.toString(),
            identifier: oldIdentifier,
            items: {
              [oldSlot]: {
                identifier: existingItem.identifier,
                ids: [existingItem.id],
                metadatas: [existingItem.metadata],
                durabilities: [existingItem.durability],
                quantity: 1,
              },
            },
            emptySlots: [],
          } as UI.Inventory.MoveData,
          {
            charRequestId: requestId.toString(),
            identifier: newIdentifier,
            items: {
              [newSlot]: {
                identifier: oldItem.identifier,
                ids: [oldItem.id],
                metadatas: [oldItem.metadata],
                durabilities: [oldItem.durability],
                quantity: 1,
              },
            },
            emptySlots: [],
          } as UI.Inventory.MoveData,
        ];
      } else {
        // Simple move to empty slot
        await db
          .update(item)
          .set({
            slot: newSlot,
            containerId: newInventory.containerId,
          })
          .where(eq(item.id, oldItem.id));

        return [
          {
            charRequestId: requestId.toString(),
            identifier: oldIdentifier,
            items: {},
            emptySlots: [oldSlot],
          } as UI.Inventory.MoveData,
          {
            charRequestId: requestId.toString(),
            identifier: newIdentifier,
            items: {
              [newSlot]: {
                identifier: oldItem.identifier,
                ids: [oldItem.id],
                metadatas: [oldItem.metadata],
                durabilities: [oldItem.durability],
                quantity: 1,
              },
            },
            emptySlots: [],
          } as UI.Inventory.MoveData,
        ];
      }
    } catch (error) {
      console.error('Error in moveItem:', error);
      return [
        {
          identifier: oldIdentifier,
          requestId,
          requestType: 'move',
        } as UI.Inventory.SuccessFailData,
        null,
      ];
    }
  }

  async hasDoorKey(identifier: string, doorHash: number): Promise<boolean> {
    const inventoryData = await this.getInventory(identifier);
    if (inventoryData) {
      for (const inventoryItem of inventoryData.container.items) {
        if (inventoryItem.identifier === 'PV_DOOR_KEY'.GetHashKey()) {
          if (inventoryItem?.metadata && typeof inventoryItem?.metadata === 'object' && !Array.isArray(inventoryItem?.metadata)) {
            const metadata = inventoryItem.metadata as Record<string, any>;
            if (metadata?.doorHash === doorHash) {
              return true;
            }
            if (metadata?.doorHashes && Array.isArray(metadata?.doorHashes) && metadata?.doorHashes.includes(doorHash)) {
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
}

export default Inventories.instance;
