import { PrismaClient } from '@prisma/client';
import { serverNamespace, userNamespace } from '../server';
import Inventories from '../managers/inventories';
import { logGreen, logInfo, logInfoC, logInfoS } from '../helpers/log';
import { yellow } from 'colors';

export default (prisma: PrismaClient) => {
  Inventories.setDB(prisma);
  // inventoryTest(prisma);

  serverNamespace.on('connection', (socket) => {
    logGreen('[Inventory] Game server connected');

    socket.on('createInventory', (identifier, inventoryType, cb) => {
      logInfoS('createInventory', identifier, inventoryType);
      try {
        Inventories.createInventory(identifier);
        cb(true);
      } catch (e) {
        cb(false);
      }
    });

    socket.on('inventoryAddItem', async (inventoryId, itemIdentifier, amount = 1, metadata = {}, cb = () => {}) => {
      try {
        const itemAddEvent = await Inventories.addItem(inventoryId, itemIdentifier, amount, metadata);
        if (itemAddEvent) {
          userNamespace.to(`inventory:${itemAddEvent.identifier}`).emit('inventoryAdd', itemAddEvent);
        }
        if (itemAddEvent) {
          cb(true);
        } else {
          cb(false);
        }
      } catch (e) {
        cb(false);
      }
    });
  });

  userNamespace.on('connection', (socket) => {
    logInfoC('user connected', socket.id, socket.data);

    socket.on('inventorySubscribe', async (identifier) => {
      logInfoC('Subscribing to inventory', identifier);

      // TODO: Check if user can access inventory. ie. Is Own Pockets, Distance, etc.
      socket.join(`inventory:${identifier}`);

      const inventory = await Inventories.getInventoryForUI(identifier);

      if (!inventory) {
        return;
      }
      // logInfo(`inventory:${identifier}`, yellow('inventoryLoad'), inventory);

      userNamespace.to(`inventory:${identifier}`).emit('inventoryLoad', inventory);
    });

    socket.on('inventoryUnsubscribe', (identifier) => {
      logInfoC('Unsubscribing to inventory', identifier);
      socket.leave(`inventory:${identifier}`);
    });

    socket.on('inventoryStack', async (oldIdentifier, oldSlot, newIdentifier, newSlot) => {
      logInfoC('inventoryStack', oldIdentifier, oldSlot, newIdentifier, newSlot);

      const itemStackEvents = await Inventories.stackItem(oldIdentifier, oldSlot, newIdentifier, newSlot);

      if (itemStackEvents) {
        const [eventOld, eventNew] = itemStackEvents;
        if (eventOld) {
          userNamespace.to(`inventory:${eventOld.identifier}`).emit('inventoryMove', eventOld);
        }
        if (eventNew) {
          userNamespace.to(`inventory:${eventNew.identifier}`).emit('inventoryMove', eventNew);
        }
      }
    });

    socket.on('inventoryMove', async (oldIdentifier, oldSlot, newIdentifier, newSlot) => {
      logInfoC('inventoryMove', oldIdentifier, oldSlot, newIdentifier, newSlot);

      const itemMoveEvents = await Inventories.moveItem(oldIdentifier, oldSlot, newIdentifier, newSlot);

      if (itemMoveEvents) {
        const [eventOld, eventNew] = itemMoveEvents;
        if (eventOld) {
          userNamespace.to(`inventory:${eventOld.identifier}`).emit('inventoryMove', eventOld);
        }
        if (eventNew) {
          userNamespace.to(`inventory:${eventNew.identifier}`).emit('inventoryMove', eventNew);
        }
      }
    });
  });
};
