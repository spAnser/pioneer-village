import {
  Container as PrismaContainer,
  Inventory as PrismaInventory,
  Item as PrismaItem,
} from '../../../node_modules/.prisma/client/index';

type PrismaInventoryWithContainerAndItems = PrismaInventory & { container: PrismaContainer & { Item: PrismaItem[] } };

import { PrismaClient, Prisma } from '@prisma/client';
import { logInfo } from '../helpers/log';
import items from '../../../lib/shared/items';
import InventoryTypes from '../../../lib/shared/inventory-types';
const tenDollars = new Array(10).fill({ identifier: 'PV_DOLLAR'.GetHashKey(), slot: 0 });

const startingInventory = [...tenDollars];

class Inventories {
  static readonly instance: Inventories = new Inventories();

  prisma: PrismaClient;

  constructor() {
    if (Inventories.instance) {
      throw new Error('Error: Instantiation failed: Use Inventories.Instance instead of new.');
    }
  }

  async setDB(prisma: PrismaClient) {
    this.prisma = prisma;

    // await this.createInventory('character:1');
    // await this.createInventory('horse:1');
    // for (let n = 13; n--; ) {
    //   await this.prisma.item.createMany({
    //     data: [
    //       {
    //         identifier: 'PV_RAW_MEAT'.GetHashKey(),
    //         slot: 1,
    //         containerId: 1,
    //       },
    //     ],
    //   });
    // }
    // for (let n = 5; n--; ) {
    //   await this.prisma.item.createMany({
    //     data: [
    //       {
    //         identifier: 'PV_COOKED_MEAT'.GetHashKey(),
    //         slot: 3,
    //         containerId: 1,
    //       },
    //     ],
    //   });
    // }
  }

  async hasInventory(ownerId: number, type: number): Promise<boolean> {
    return false;
  }

  async createInventory(identifier: string): Promise<void> {
    try {
      await this.prisma.inventory.create({
        data: {
          identifier,
          container: {
            create: {
              Item: {
                create: identifier.startsWith('character:') ? startingInventory : [],
              },
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getInventory(identifier: string): Promise<PrismaInventoryWithContainerAndItems | null> {
    try {
      return await this.prisma.inventory.findFirst({
        where: {
          identifier,
        },
        include: {
          container: {
            include: {
              Item: true,
            },
          },
        },
      });
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
    const inventory: UI.Inventory.LoadData = {
      identifier: dbInventory.identifier,
      slots: inventoryType.slots,
      maxWeight: inventoryType.maxWeight,
      container: {
        locked: dbInventory.container.locked,
        sealed: dbInventory.container.sealed,
      },
      items: {},
    };

    for (const item of dbInventory.container.Item) {
      // logInfo('item', item);
      if (item.slot === null || item.slot === undefined) {
        continue;
      }
      if (inventory.items[item.slot]) {
        inventory.items[item.slot].quantity++;
        inventory.items[item.slot].ids.push(item.id);
        inventory.items[item.slot].metadatas.push(item.metadata);
      } else {
        inventory.items[item.slot] = {
          identifier: item.identifier,
          ids: [item.id],
          metadatas: [item.metadata],
          durability: Math.max(0, Math.random() - 0.15), // TODO: Implement Durability
          quantity: 1,
        };
      }
    }

    return inventory;
  }

  findSlotForItem(inventory: PrismaInventoryWithContainerAndItems, itemIdentifier: number) {
    const inventoryType = this.getInventoryType(inventory.identifier);

    const slots: Array<boolean | number> = new Array(inventoryType.slots).fill(false);
    console.log('inventory.container.Item', inventory.container.Item);
    const slotCounts: Record<number, number> = {};
    for (const item of inventory.container.Item) {
      if (typeof item.slot !== 'number') {
        continue;
      }
      slots[item.slot] = item.identifier;
      slotCounts[item.slot] = (slotCounts[item.slot] || 0) + 1;
    }

    console.log('slots', slots);
    console.log('slotCounts', slotCounts);

    for (const s in slots) {
      const slot = Number(s);
      if (slots[slot] === false) {
        continue;
      }
      if (slots[slot] === itemIdentifier && slotCounts[slot] < items[itemIdentifier].stackSize) {
        return slot;
      }
    }

    return slots.indexOf(false);
  }

  async addItem(
    inventoryIdentifier: string,
    itemIdentifier: number,
    amount = 1,
    metadata: Record<string, any> = {},
  ): Promise<UI.Inventory.AddData | void> {
    try {
      const inventory = await this.getInventory(inventoryIdentifier);

      if (!inventory) {
        throw new Error('Inventory not found');
      }

      const slot = this.findSlotForItem(inventory, itemIdentifier);
      logInfo('slot', slot, slot > -1);

      if (slot < 0) {
        throw new Error('No free slot found');
      }

      const itemAddEvent: UI.Inventory.AddData = {
        identifier: inventoryIdentifier,
        items: {},
      };

      for (let n = amount; n--; ) {
        const item = await this.prisma.item.create({
          data: {
            identifier: itemIdentifier,
            slot,
            containerId: inventory.id,
            metadata,
          },
        });
        logInfo('item', item);

        if (itemAddEvent.items[slot]) {
          itemAddEvent.items[slot].ids.push(item.id);
          itemAddEvent.items[slot].metadatas.push(metadata);
          itemAddEvent.items[slot].quantity++;
        } else {
          itemAddEvent.items[slot] = {
            identifier: itemIdentifier,
            ids: [item.id],
            metadatas: [metadata],
            durability: Math.max(0, Math.random() - 0.15), // TODO: Implement Durability
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
    oldIdentifier: string,
    oldSlot: number,
    newIdentifier: string,
    newSlot: number,
  ): Promise<[UI.Inventory.MoveData, UI.Inventory.MoveData | null] | void> {
    try {
      const oldInventory = await this.getInventory(oldIdentifier);
      if (!oldInventory) {
        return;
      }
      let newInventory;
      if (newIdentifier === oldIdentifier) {
        newInventory = oldInventory;
      } else {
        newInventory = await this.getInventory(newIdentifier);
      }
      if (!newInventory) {
        return;
      }

      const oldItems = oldInventory.container.Item.filter((item) => item.slot === oldSlot);
      const oldItemIds = oldItems.map((item) => item.id);

      const newItems = newInventory.container.Item.filter((item) => item.slot === newSlot);
      const newItemIds = newItems.map((item) => item.id);

      logInfo('oldItemIds', oldItemIds);
      logInfo('newItemIds', newItemIds);

      if (oldItemIds.length === 0 || newItemIds.length === 0) {
        return;
      }

      if (oldItems[0].identifier !== newItems[0].identifier) {
        return;
      }

      const itemData = items[oldItems[0].identifier];

      if (oldItems.length + newItems.length <= itemData.stackSize) {
        const oldSlotUpdate = await this.prisma.item.updateMany({
          where: {
            id: {
              in: oldItemIds,
            },
          },
          data: {
            slot: newSlot,
            containerId: newInventory.containerId,
          },
        });

        if (oldSlotUpdate.count === 0) {
          return;
        }

        const eventOld: UI.Inventory.MoveData = {
          identifier: oldIdentifier,
          items: {},
          emptySlots: [oldSlot],
        };

        const eventNew: UI.Inventory.MoveData = {
          identifier: newIdentifier,
          items: {
            [newSlot]: {
              identifier: itemData.identifier,
              ids: newItemIds.concat(oldItemIds),
              metadatas: [...newItems.map((item) => item.metadata), ...oldItems.map((item) => item.metadata)],
              durability: Math.max(0, Math.random() - 0.15), // TODO: Implement Durability
              quantity: newItemIds.length + oldItemIds.length,
            },
          },
          emptySlots: [],
        };

        return [eventOld, eventNew];
      } else {
        const diff = itemData.stackSize - newItems.length;
        const oldItemsMoved = oldItems.slice(0, diff);
        const oldItemsLeft = oldItems.slice(diff);
        const oldItemIdsMoved = oldItemIds.slice(0, diff);
        const oldItemIdsLeft = oldItemIds.slice(diff);

        const oldSlotUpdate = await this.prisma.item.updateMany({
          where: {
            id: {
              in: oldItemIdsMoved,
            },
          },
          data: {
            slot: newSlot,
            containerId: newInventory.containerId,
          },
        });

        if (oldSlotUpdate.count === 0) {
          return;
        }
        const eventOld: UI.Inventory.MoveData = {
          identifier: oldIdentifier,
          items: {
            [oldSlot]: {
              identifier: itemData.identifier,
              ids: oldItemIdsLeft,
              metadatas: oldItemsLeft.map((item) => item.metadata),
              durability: Math.max(0, Math.random() - 0.15), // TODO: Implement Durability
              quantity: oldItemsLeft.length,
            },
          },
          emptySlots: [],
        };

        const eventNew: UI.Inventory.MoveData = {
          identifier: newIdentifier,
          items: {
            [newSlot]: {
              identifier: itemData.identifier,
              ids: newItemIds.concat(oldItemIdsMoved),
              metadatas: [...newItems.map((item) => item.metadata), ...oldItemsMoved.map((item) => item.metadata)],
              durability: Math.max(0, Math.random() - 0.15), // TODO: Implement Durability
              quantity: newItemIds.length + oldItemsMoved.length,
            },
          },
          emptySlots: [],
        };

        return [eventOld, eventNew];
      }
    } catch (error) {
      console.error(error);
    }
  }

  async moveItem(
    oldIdentifier: string,
    oldSlot: number,
    newIdentifier: string,
    newSlot: number,
  ): Promise<[UI.Inventory.MoveData, UI.Inventory.MoveData | null] | void> {
    try {
      const oldInventory = await this.getInventory(oldIdentifier);
      if (!oldInventory) {
        return;
      }
      let newInventory;
      if (newIdentifier === oldIdentifier) {
        newInventory = oldInventory;
      } else {
        newInventory = await this.getInventory(newIdentifier);
      }
      if (!newInventory) {
        return;
      }

      const oldItems = oldInventory.container.Item.filter((item) => item.slot === oldSlot);
      const oldItemIds = oldItems.map((item) => item.id);

      const newItems = newInventory.container.Item.filter((item) => item.slot === newSlot);
      const newItemIds = newItems.map((item) => item.id);

      logInfo('oldItemIds', oldItemIds);
      logInfo('newItemIds', newItemIds);

      const oldSlotUpdate = await this.prisma.item.updateMany({
        where: {
          id: {
            in: oldItemIds,
          },
        },
        data: {
          slot: newSlot,
          containerId: newInventory.containerId,
        },
      });

      const newSlotUpdate = await this.prisma.item.updateMany({
        where: {
          id: {
            in: newItemIds,
          },
        },
        data: {
          slot: oldSlot,
          containerId: oldInventory.containerId,
        },
      });

      if (oldSlotUpdate.count === 0 && newSlotUpdate.count === 0) {
        return;
      }

      const oldSlotItems = await this.prisma.item.findMany({
        where: {
          containerId: oldInventory.containerId,
          slot: oldSlot,
        },
      });

      console.log('oldSlotItems', oldSlotItems);

      const oldItemUpdates: Record<string, UI.Inventory.ItemData> = {};
      const oldEmptySlots: number[] = [];

      if (oldSlotItems.length) {
        for (const item of oldSlotItems) {
          // logInfo('item', item);
          if (item.slot === null || item.slot === undefined) {
            continue;
          }
          if (oldItemUpdates[item.slot]) {
            oldItemUpdates[item.slot].quantity++;
            oldItemUpdates[item.slot].ids.push(item.id);
            oldItemUpdates[item.slot].metadatas.push(item.metadata);
          } else {
            oldItemUpdates[item.slot] = {
              identifier: item.identifier,
              ids: [item.id],
              metadatas: [item.metadata],
              durability: Math.max(0, Math.random() - 0.15), // TODO: Implement Durability
              quantity: 1,
            };
          }
        }
      } else {
        oldEmptySlots.push(oldSlot);
      }

      const newSlotItems = await this.prisma.item.findMany({
        where: {
          containerId: newInventory.containerId,
          slot: newSlot,
        },
      });

      console.log('newSlotItems', newSlotItems);

      const newItemUpdates: Record<string, UI.Inventory.ItemData> = {};
      const newEmptySlots: number[] = [];

      if (newSlotItems.length) {
        for (const item of newSlotItems) {
          // logInfo('item', item);
          if (item.slot === null || item.slot === undefined) {
            continue;
          }
          if (newItemUpdates[item.slot]) {
            newItemUpdates[item.slot].quantity++;
            newItemUpdates[item.slot].ids.push(item.id);
            newItemUpdates[item.slot].metadatas.push(item.metadata);
          } else {
            newItemUpdates[item.slot] = {
              identifier: item.identifier,
              ids: [item.id],
              metadatas: [item.metadata],
              durability: Math.max(0, Math.random() - 0.15), // TODO: Implement Durability
              quantity: 1,
            };
          }
        }
      } else {
        newEmptySlots.push(newSlot);
      }

      const eventOld: UI.Inventory.MoveData = {
        identifier: oldIdentifier,
        items: oldItemUpdates,
        emptySlots: oldEmptySlots,
      };

      if (oldIdentifier !== newIdentifier) {
        const eventNew: UI.Inventory.MoveData = {
          identifier: newIdentifier,
          items: newItemUpdates,
          emptySlots: newEmptySlots,
        };

        return [eventOld, eventNew];
      }

      eventOld.items = {
        ...oldItemUpdates,
        ...newItemUpdates,
      };
      eventOld.emptySlots = [...oldEmptySlots, ...newEmptySlots];

      return [eventOld, null];
    } catch (error) {
      console.error(error);
    }
  }

  async hasDoorKey(identifier: string, doorHash: number): Promise<boolean> {
    const inventory = await this.getInventory(identifier);
    if (inventory) {
      for (const item of inventory.container.Item) {
        if (item.identifier === 'PV_DOOR_KEY'.GetHashKey()) {
          if (item?.metadata && typeof item?.metadata === 'object' && !Array.isArray(item?.metadata)) {
            const metadata = item.metadata as Prisma.JsonObject;
            if (metadata?.doorHash === doorHash) {
              return true;
            }
            if (metadata?.doorHashes && (metadata?.doorHashes as Prisma.JsonArray).includes(doorHash)) {
              return true;
            }
            if (metadata?.linkedDoors) {
              for (const linkedDoorHashes of metadata?.linkedDoors as Prisma.JsonArray) {
                if ((linkedDoorHashes as Prisma.JsonArray).includes(doorHash)) {
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
