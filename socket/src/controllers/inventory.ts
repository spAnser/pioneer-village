import type { Socket } from 'socket.io';
import type { DefaultEventsMap } from 'socket.io/dist/typed-events';

import { PrismaClient } from '@prisma/client';
import { serverNamespace, userNamespace } from '../server';
import Inventories from '../managers/inventories';
import { logGreen, logInfoC, logInfoS } from '../helpers/log';

export default (prisma: PrismaClient) => {
  Inventories.setDB(prisma);
  // inventoryTest(prisma);

  const sendMoveOrFailData = (
    socket: Socket<SocketServer.Client & SocketServer.ClientEvents, UISocketEvents, DefaultEventsMap, any>,
    requestId: number,
    requestType: UI.Inventory.RequestType,
    event?: UI.Inventory.MoveOrFailData | null,
  ) => {
    if (!event) {
      return;
    }
    if ('requestId' in event) {
      // TODO: Verify this only sends to the original user. Not to the entire room.
      socket.emit('inventoryFail', event);
      logInfoC(`inventory:${event.identifier}`, 'inventoryFail', event);
    } else {
      socket.emit('inventorySuccess', { identifier: event.identifier, requestId, requestType });
      userNamespace.to(`inventory:${event.identifier}`).emit('inventoryMove', event);
    }
  };

  serverNamespace.on('connection', (socket) => {
    logGreen('[Inventory]', 'Game server connected');

    socket.on('createInventory', (identifier, inventoryType, cb) => {
      logInfoS('[Inventory]', 'createInventory', identifier, inventoryType);
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

    socket.on('inventory.item-wear', async (itemId: number) => {
      const success = await Inventories.changeDurability(itemId);
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

    socket.on('inventoryStack', async (requestId, oldIdentifier, oldSlot, newIdentifier, newSlot) => {
      logInfoC('inventoryStack', oldIdentifier, oldSlot, newIdentifier, newSlot);

      const itemStackEvents = await Inventories.stackItem(
        socket.data.character.id,
        requestId,
        oldIdentifier,
        oldSlot,
        newIdentifier,
        newSlot,
      );

      if (itemStackEvents) {
        const [eventOld, eventNew] = itemStackEvents;
        sendMoveOrFailData(socket, requestId, 'stack', eventOld);
        sendMoveOrFailData(socket, requestId, 'stack', eventNew);
      }
    });

    socket.on('inventoryMove', async (requestId, oldIdentifier, oldSlot, newIdentifier, newSlot) => {
      logInfoC('inventoryMove', requestId, oldIdentifier, oldSlot, newIdentifier, newSlot);

      const itemMoveEvents = await Inventories.moveItem(
        socket.data.character.id,
        requestId,
        oldIdentifier,
        oldSlot,
        newIdentifier,
        newSlot,
      );

      if (itemMoveEvents) {
        const [eventOld, eventNew] = itemMoveEvents;

        sendMoveOrFailData(socket, requestId, 'move', eventOld);
        sendMoveOrFailData(socket, requestId, 'move', eventNew);
      }
    });

    socket.on('inventory.item-wear', async (itemId: number) => {
      logInfoC('inventory.item-wear', itemId);
      const wearAmount = -1;
      const { success, inventoryIdentifier } = await Inventories.changeDurability(itemId, wearAmount);
      logInfoC('success', success, itemId, inventoryIdentifier);

      if (success && inventoryIdentifier) {
        userNamespace.to(`inventory:${inventoryIdentifier}`).emit('inventoryWear', itemId, wearAmount);
      }
    });
  });
};
