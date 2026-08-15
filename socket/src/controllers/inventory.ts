import type { Socket } from 'socket.io';
// @ts-ignore
import type { SocketReservedEventsMap } from 'socket.io/dist/socket-types';
// @ts-ignore
import type { DefaultEventsMap, ReservedOrUserEventNames } from 'socket.io/dist/typed-events';

import { Vector3 } from '../../../lib/math';
import PVItems from '../../../lib/shared/items';
import { logInfoC, logInfoS } from '../helpers';
import Characters from '../managers/characters';
import Inventories from '../managers/inventories';
import { serverNamespace, userNamespace } from '../server';

Inventories.init();

export default () => {
  // inventoryTest(prisma);

  type SocketType = Socket<
    SocketIn.FromClient & SocketOut.ToClient,
    SocketOut.ToClient,
    DefaultEventsMap,
    SocketInternal.Data
  >;

  const sendMoveOrFailData = (
    socket: Socket<SocketIn.FromClient & SocketOut.ToClient, SocketOut.ToClient, DefaultEventsMap, any>,
    requestId: number,
    requestType: UI.Inventory.RequestType,
    event?: UI.Inventory.MoveOrFailData | null,
  ) => {
    if (!event) {
      return;
    }
    if ('requestId' in event) {
      // TODO: Verify this only sends to the original user. Not to the entire room.
      socket.emit('inventory.fail', event);
      logInfoC(`inventory:${event.identifier}`, 'inventory.fail', event);
    } else {
      socket.emit('inventory.success', { identifier: event.identifier, requestId, requestType });
      // logInfoC(`inventory:${event.identifier}`, 'inventory.item-move', event);
      userNamespace.to(`inventory:${event.identifier}`).emit('inventory.item-move', event);
    }
  };

  class ClientspaceInventory {
    socket: SocketType;

    events: ReservedOrUserEventNames<SocketReservedEventsMap, SocketIn.FromClient & SocketOut.ToClient>[] = [
      'inventory.subscribe',
      'inventory.subscribe-world',
      'inventory.unsubscribe',
      'inventory.item-stack',
      'inventory.item-move',
      'inventory.item-wear',
      'inventory.item-drop',
      'inventory.item-update-metadata',
      'inventory.item-consume',
      'inventory.apply-lantern-oil',
      'inventory.lost-hat',
      'inventory.pickup-hat',
      'inventory.check-world',
      'inventory.get-world-inventories',
    ];

    constructor(socket: SocketType) {
      this.socket = socket;
    }

    ['inventory.subscribe']: SocketIn.FromClient['inventory.subscribe'] = async (identifier) => {
      logInfoC('Subscribing to inventory', identifier);

      // TODO: Check if user can access inventory. ie. Is Own Pockets, Distance, etc.
      this.socket.join(`inventory:${identifier}`);

      const inventory = await Inventories.getInventoryForUI(identifier);

      if (!inventory) {
        return;
      }
      // logInfo(`inventory:${identifier}`, yellow('inventory.load'), inventory);

      userNamespace.to(`inventory:${identifier}`).emit('inventory.load', inventory);
    };

    ['inventory.subscribe-world']: SocketIn.FromClient['inventory.subscribe-world'] = async () => {
      // TODO: Get player coords rounded and emit to client that it exists and has items.
    };

    ['inventory.unsubscribe']: SocketIn.FromClient['inventory.unsubscribe'] = (identifier) => {
      logInfoC('Unsubscribing from inventory', identifier);
      this.socket.leave(`inventory:${identifier}`);
    };

    ['inventory.item-stack']: SocketIn.FromClient['inventory.item-stack'] = async (
      requestId,
      oldIdentifier,
      oldSlot,
      newIdentifier,
      newSlot,
    ) => {
      logInfoC('inventory.item-stack', oldIdentifier, oldSlot, newIdentifier, newSlot);

      if (!this.socket.data.character?.id) {
        return;
      }

      const itemStackEvents = await Inventories.stackItem(
        this.socket.data.character?.id,
        requestId,
        oldIdentifier,
        oldSlot,
        newIdentifier,
        newSlot,
      );

      if (itemStackEvents) {
        const [eventOld, eventNew] = itemStackEvents;
        sendMoveOrFailData(this.socket, requestId, 'stack', eventOld);
        sendMoveOrFailData(this.socket, requestId, 'stack', eventNew);
      }
    };

    ['inventory.item-move']: SocketIn.FromClient['inventory.item-move'] = async (
      requestId,
      oldIdentifier,
      oldSlot,
      newIdentifier,
      newSlot,
      quantity?,
    ) => {
      logInfoC('inventory.item-move', requestId, oldIdentifier, oldSlot, newIdentifier, newSlot, quantity);
      if (!this.socket.data.character?.id) {
        return;
      }

      if (oldIdentifier.includes('_WORLD_:') && !newIdentifier.includes('_WORLD_:')) {
        const item = await Inventories.getItemInSlot(oldIdentifier, oldSlot);

        // @ts-ignore
        if (item?.metadata?.category === 'HATS') {
          serverNamespace.emit('inventory.delete-hat-by-item-id', item.id);
        }
      }

      let result: [UI.Inventory.MoveOrFailData, UI.Inventory.MoveOrFailData | null];
      if (newSlot < 0) {
        result = await Inventories.moveItemToInventory(
          this.socket.data.character.id,
          requestId,
          oldIdentifier,
          oldSlot,
          newIdentifier,
        );
      } else {
        result = await Inventories.moveItem(
          this.socket.data.character.id,
          requestId,
          oldIdentifier,
          oldSlot,
          newIdentifier,
          newSlot,
          quantity,
        );
      }

      const [eventSource, eventDestination] = result;
      sendMoveOrFailData(this.socket, requestId, 'move', eventSource);
      sendMoveOrFailData(this.socket, requestId, 'move', eventDestination);
    };

    ['inventory.item-wear']: SocketIn.FromClient['inventory.item-wear'] = async (itemId) => {
      logInfoC('inventory.item-wear', itemId);
      const wearAmount = -1;
      const { success, inventoryIdentifier } = await Inventories.changeDurability(itemId, wearAmount);
      logInfoC('success', success, itemId, inventoryIdentifier);

      if (success && inventoryIdentifier) {
        userNamespace.to(`inventory:${inventoryIdentifier}`).emit('inventory.item-wear', itemId, wearAmount);
      }
    };

    ['inventory.item-update-metadata']: SocketIn.FromClient['inventory.item-update-metadata'] = async (
      itemId,
      metadata,
    ) => {
      logInfoC('inventory.item-update-metadata', itemId, metadata);
      await Inventories.updateItemMetadata(itemId, metadata);
    };

    ['inventory.item-consume']: SocketIn.FromClient['inventory.item-consume'] = async (itemId) => {
      logInfoC('inventory.item-consume', itemId);
      const inventoryInfo = await Inventories.getInventoryForItem(itemId);
      await Inventories.removeItem(itemId);

      if (inventoryInfo?.identifier) {
        userNamespace.to(`inventory:${inventoryInfo.identifier}`).emit('inventory.item-remove', itemId);
      }
    };

    ['inventory.apply-lantern-oil']: SocketIn.FromClient['inventory.apply-lantern-oil'] = async (
      oilItemId,
      lanternIdentifier,
    ) => {
      logInfoC('inventory.apply-lantern-oil', oilItemId, lanternIdentifier);

      if (!this.socket.data.character?.id) {
        return;
      }

      const oilItem = await Inventories.getItem(oilItemId);
      const oilItemDef = oilItem ? (PVItems[oilItem.identifier] as Inventory.ItemLanternOil | undefined) : undefined;

      if (!oilItem || !oilItemDef?.oilColor) {
        return;
      }

      const mainInventoryIdentifier = `character:${this.socket.data.character.id}`;
      const lanternItem = await Inventories.getFirstActiveItemByIdentifier(mainInventoryIdentifier, lanternIdentifier);

      if (!lanternItem) {
        return;
      }

      await Inventories.updateItemMetadata(lanternItem.id, { oilColor: oilItemDef.oilColor, oilName: oilItemDef.name });
      await Inventories.removeItem(oilItemId);

      userNamespace
        .to(`inventory:${mainInventoryIdentifier}`)
        .emit('inventory.item-metadata-update', lanternItem.id, {
          oilColor: oilItemDef.oilColor,
          oilName: oilItemDef.name,
        });
      userNamespace.to(`inventory:${mainInventoryIdentifier}`).emit('inventory.item-remove', oilItemId);
    };

    ['inventory.lost-hat']: SocketIn.FromClient['inventory.lost-hat'] = async (hatNetId, coords) => {
      // crun KnockOffPedProp(PlayerPedId(), false, true, false, true)
      const [x, y, z] = coords;
      logInfoC('inventory.lost-hat', `Player lost their hat at coordinates: ${x}, ${y}, ${z}`);
      if (!this.socket.data.character?.id) {
        return;
      }

      const characterId = this.socket.data.character.id;
      const identifier = `clothing:${characterId}`;

      const inventory = await Inventories.getInventory(identifier);

      if (!Array.isArray(inventory?.container.items)) {
        return;
      }

      for (const item of inventory.container.items) {
        // @ts-ignore
        if (item?.metadata?.category === 'HATS') {
          const [eventSource, eventDesination] = await Inventories.moveItemToWorld(
            this.socket.data.character.id,
            -1,
            identifier,
            item.slot || 0,
            { x, y, z },
          );
          sendMoveOrFailData(this.socket, -1, 'move', eventSource);
          sendMoveOrFailData(this.socket, -1, 'move', eventDesination);
          console.log('Emitting hat item ID to hat entity', hatNetId, item.id);
          serverNamespace.emit('inventory.set-hat-item-id', hatNetId, item.id);
        }
      }
    };

    ['inventory.pickup-hat']: SocketIn.FromClient['inventory.pickup-hat'] = async (itemId) => {
      logInfoC('inventory.pickup-hat', 'Player picked up a hat', itemId);
      if (!this.socket.data.character?.id) {
        logInfoC('inventory.pickup-hat', 'No character ID found on socket');
        return;
      }

      const inventory = await Inventories.getInventoryForItem(itemId);

      logInfoC('inventory', inventory);

      if (inventory?.slot === null || !inventory?.identifier.startsWith('_WORLD_:')) {
        logInfoC('inventory.pickup-hat', 'No world inventory found for hat item', itemId);
        return;
      }

      const inventoryCoords = Vector3.fromArray(inventory.identifier.replace('_WORLD_:', '').split('_').map(Number));

      const characterId = this.socket.data.character.id;
      const coords = await Characters.getLastCoords(characterId, 250);
      const playerCoords = Vector3.fromObject(coords);

      const distance = playerCoords.getDistance(inventoryCoords);

      logInfoC('inventory.pickup-hat', `Distance to hat inventory: ${distance} units`);
      if (distance > 5) {
        logInfoC('inventory.pickup-hat', 'Hat is too far away to pick up');
        return;
      }

      const [eventSource, eventDestination] = await Inventories.moveItemToInventory(
        characterId,
        -1,
        inventory.identifier,
        inventory.slot,
        `clothing:${characterId}`,
      );

      sendMoveOrFailData(this.socket, -1, 'move', eventSource);
      sendMoveOrFailData(this.socket, -1, 'move', eventDestination);
    };

    ['inventory.item-drop']: SocketIn.FromClient['inventory.item-drop'] = async (requestId, identifier, slot) => {
      logInfoC('inventory.item-drop', requestId, identifier, slot);
      if (!this.socket.data.character?.id) {
        return;
      }

      const serverId = this.socket.data.user.serverId;
      const characterId = this.socket.data.character.id;

      logInfoC('this.socket.data', serverId, characterId);

      const coords = await Characters.getLastCoords(characterId, 250);

      if (coords.x === 0 && coords.y === 0 && coords.z === 0) {
        logInfoC('inventory.item-drop', 'No valid coordinates found for item drop');
        return;
      }

      logInfoC('inventory.item-drop', `Player dropped item at coordinates: ${coords.x}, ${coords.y}, ${coords.z}`);

      const [moveEvent] = await Inventories.moveItemToWorld(characterId, requestId, identifier, slot, coords);

      console.log('moveEvent', moveEvent);

      sendMoveOrFailData(this.socket, requestId, 'stack', moveEvent);
    };

    ['inventory.check-world']: SocketIn.FromClient['inventory.check-world'] = async () => {
      logInfoC('inventory.check-world', 'Checking world inventories');
      if (!this.socket.data.character?.id) {
        return;
      }

      const characterId = this.socket.data.character.id;
      const coords = await Characters.getLastCoords(characterId, 250);

      if (coords.x === 0 && coords.y === 0 && coords.z === 0) {
        return;
      }

      logInfoC(
        'inventory.check-world',
        `Player checking world inventories at coordinates: ${coords.x}, ${coords.y}, ${coords.z}`,
      );

      const inventory = await Inventories.getWorldInventoryAtCoordsContainingItems(coords);

      if (!inventory?.container.items.length) {
        return;
      }

      const identifier = inventory.identifier;

      logInfoC('inventory.check-world', 'Found world inventory', identifier, inventory?.container.items.length);
      this.socket.join(`inventory:${identifier}`);
      this.socket.emit('inventory.open-world', identifier);

      const uiInventory = Inventories.convertToUIInventory(inventory);
      userNamespace.to(`inventory:${identifier}`).emit('inventory.load', uiInventory);
    };

    ['inventory.get-world-inventories']: SocketIn.FromClient['inventory.get-world-inventories'] = async () => {
      logInfoC('inventory.get-world-inventories', 'Requesting world inventories');
      await Inventories.sendWorldInventories(this.socket);
    };
  }

  serverNamespace.on('connection', (socket) => {
    logInfoS('[Inventory]', 'Game server connected');

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
          userNamespace.to(`inventory:${itemAddEvent.identifier}`).emit('inventory.item-add', itemAddEvent);
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
    logInfoC('[Inventory]', 'User connected', socket.id, socket.data);

    const usI = new ClientspaceInventory(socket);

    for (const event of usI.events) {
      // @ts-ignore
      socket.on(event, usI[event]);
    }
  });
};
