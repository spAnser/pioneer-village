import { Socket } from 'socket.io-client';

import { clamp } from '@lib/math';
import { LoadResourceJson, emitClient, onClient, onClientCall } from '@lib/ui';

// Store state interface matching the component's state
interface InventoryState {
  show: boolean;
  characterId: number;
  clothingInventory: string;
  birdsInventory: string;
  mainInventory: string;
  targetInventory: string;
  targetContainerItemId: number;
  inventories: Map<string, UI.Inventory.LoadData>;
  inventoriesWeight: Map<string, number>;
  tooltipItem: UI.Inventory.ItemData | null;
  tooltipBelow: boolean;
  tooltipX: number;
  tooltipY: number;
}

// Request tracking
interface MoveRequest {
  sourceIdentifier: string;
  oldSlot: number;
  targetIdentifier: string;
  newSlot: number;
}

type StateListener = (state: InventoryState) => void;

class InventoryStore {
  private static instance: InventoryStore;
  private socket: Socket<SocketOut.ToClient, SocketIn.FromClient> | null = null;
  private state: InventoryState;
  private listeners = new Set<StateListener>();
  private subscriptions = new Set<string>();
  private worldSubscribed = false;
  private requestId = 0;
  private requests = new Map<number, MoveRequest>();
  private items: Inventory.UIItems = {};
  private drawableMap: Record<string, [number, string]> = {};
  private failedImages = new Set<string>();
  private initialized = false;
  private resyncInterval: ReturnType<typeof setInterval> | null = null;

  private constructor() {
    this.state = {
      show: false,
      characterId: 0,
      clothingInventory: '',
      birdsInventory: '',
      mainInventory: '',
      targetInventory: '',
      targetContainerItemId: 0,
      inventories: new Map(),
      inventoriesWeight: new Map(),
      tooltipItem: null,
      tooltipBelow: false,
      tooltipX: 0,
      tooltipY: 0,
    };
  }

  static getInstance(): InventoryStore {
    if (!InventoryStore.instance) {
      InventoryStore.instance = new InventoryStore();
    }
    return InventoryStore.instance;
  }

  // Initialize the store with socket connection
  initialize(socket: Socket<SocketOut.ToClient, SocketIn.FromClient>): void {
    if (this.initialized) {
      this.cleanup();
    }

    this.socket = socket;
    this.initialized = true;

    // Set up socket event handlers
    this.setupSocketHandlers();

    // Set up client event handlers
    this.setupClientHandlers();

    // Load drawable map for clothing thumbnails
    this.loadDrawableMap();

    // Periodic safety-net resync while the panel is open, in case an
    // incremental broadcast (item-add/item-move) was ever missed — cheaper
    // and simpler than a server-push invalidation signal.
    this.resyncInterval = setInterval(() => this.performBackgroundResync(), 60_000);

    // Emit startup event
    emitClient('inventory.startup');
  }

  private performBackgroundResync(): void {
    if (!this.socket || !this.state.show) return;

    if (this.state.mainInventory) {
      this.socket.emit('inventory.subscribe', this.state.mainInventory);
    }
    if (this.state.targetInventory) {
      this.socket.emit('inventory.subscribe', this.state.targetInventory);
    }
  }

  private async loadDrawableMap(): Promise<void> {
    try {
      const map = await LoadResourceJson('rdr3-shared', 'resources/drawable-map.json');
      if (map) {
        this.drawableMap = map as Record<string, [number, string]>;
      }
    } catch (err) {
      console.warn('[Inventory] Failed to load drawable map:', err);
    }
  }

  private setupSocketHandlers(): void {
    if (!this.socket) return;

    // Handle inventory load
    this.socket.on('inventory.load', this.handleInventoryLoad);

    // Handle item add
    this.socket.on('inventory.item-add', this.handleItemAdd);

    // Handle item move
    this.socket.on('inventory.item-move', this.handleItemMove);

    // Handle success response
    this.socket.on('inventory.success', this.handleSuccess);

    // Handle fail response
    this.socket.on('inventory.fail', this.handleFail);

    // Handle item wear
    this.socket.on('inventory.item-wear', this.handleItemWear);

    // Handle item remove (e.g. consumed item)
    this.socket.on('inventory.item-remove', this.handleItemRemove);

    // Handle item metadata update (e.g. lantern oil tint)
    this.socket.on('inventory.item-metadata-update', this.handleItemMetadataUpdate);

    // Handle world inventory open
    this.socket.on('inventory.open-world', this.handleOpenWorld);
  }

  private setupClientHandlers(): void {
    // Handle inventory state updates from client
    onClient('inventory.state', this.handleInventoryState);

    // Handle items data update
    onClient('inventory.items', this.handleItemsUpdate);

    // Handle use slot request
    onClient('inventory.use-slot', this.useSlot);

    // Register RPC handler for getting player items
    onClientCall('inventory.player-get-items', this.getPlayerItems);
  }

  // Handle inventory state update from client
  private handleInventoryState = (event: Partial<UI.Inventory.State>): void => {
    if (!event || !this.socket) return;

    // Re-subscribe to clothing inventory on every open — forces a fresh
    // authoritative reload so the client can self-heal from any missed
    // incremental broadcast, instead of trusting a session-long cache.
    if (event.clothingInventory) {
      this.socket.emit('inventory.subscribe', event.clothingInventory);
      this.subscriptions.add(event.clothingInventory);
    }

    // Re-subscribe to birds inventory on every open (see comment above).
    if (event.birdsInventory) {
      this.socket.emit('inventory.subscribe', event.birdsInventory);
      this.subscriptions.add(event.birdsInventory);
    }

    // Re-subscribe to main inventory on every open (see comment above).
    if (event.mainInventory) {
      this.socket.emit('inventory.subscribe', event.mainInventory);
      this.subscriptions.add(event.mainInventory);

      const [_inventoryType, characterId] = event.mainInventory.split(':');
      event.characterId = Number(characterId);
    }

    // Handle target inventory changes
    const previousTargetInventory = this.state.targetInventory;

    // Unsubscribe from old target inventory
    if (previousTargetInventory && previousTargetInventory !== event.targetInventory) {
      this.socket.emit('inventory.unsubscribe', previousTargetInventory);
      this.subscriptions.delete(previousTargetInventory);
    }

    // Subscribe to new target inventory
    if (event.targetInventory && !this.subscriptions.has(event.targetInventory)) {
      this.socket.emit('inventory.subscribe', event.targetInventory);
      this.subscriptions.add(event.targetInventory);
      this.worldSubscribed = false;
    } else if (!event.targetInventory && !this.worldSubscribed) {
      // Subscribe to world if no target inventory
      this.socket.emit('inventory.subscribe-world');

      // Check world inventories at current location if not coming from another target
      if (event.show && !previousTargetInventory) {
        this.socket.emit('inventory.check-world');
      }

      this.worldSubscribed = true;
    }

    this.updateState(event);
  };

  // Handle items data update
  private handleItemsUpdate = (items: Inventory.UIItems): void => {
    this.items = items;
  };

  // Handle inventory load from socket
  private handleInventoryLoad = (data: UI.Inventory.LoadData): void => {
    const inventories = new Map(this.state.inventories);
    inventories.set(data.identifier, data);

    // Emit events based on inventory type
    if (this.state.mainInventory === data.identifier) {
      const clothingInv = inventories.get(this.state.clothingInventory);
      emitClient('inventory.main-inventory', data, clothingInv);
    }

    if (this.state.targetInventory === data.identifier) {
      emitClient('inventory.target-inventory', data);
    }

    if (`clothing:${this.state.characterId}` === data.identifier) {
      emitClient('inventory.clothing-change', Object.values(data.items));
    }

    if (this.socket && `birds:${this.state.characterId}` === data.identifier) {
      for (const item of Object.values(data.items)) {
        const birdInvIdentifier = `bird:${item.ids[0]}`;
        this.socket.emit('inventory.subscribe', birdInvIdentifier);
        this.subscriptions.add(birdInvIdentifier);
      }
    }

    this.updateState({ inventories });
    this.computeInventoryWeight();
  };

  // Handle item add from socket
  private handleItemAdd = (data: UI.Inventory.AddData): void => {
    const inventories = new Map(this.state.inventories);
    const inventory = inventories.get(data.identifier);

    if (inventory) {
      for (const [slot, item] of Object.entries(data.items)) {
        if (inventory.items[slot]) {
          inventory.items[slot].ids.push(...item.ids);
          inventory.items[slot].metadatas.push(...item.metadatas);
          inventory.items[slot].quantity += item.quantity;
        } else {
          inventory.items[slot] = item;
        }
      }
    }

    this.updateState({ inventories });
    this.computeInventoryWeight();
  };

  // Handle item move from socket
  private handleItemMove = (data: UI.Inventory.MoveOrFailData): void => {
    console.log('handleItemMove', data); // Required for actually working.
    if ('charRequestId' in data) {
      const moveData = data as UI.Inventory.MoveData;
      const [requestCharId] = moveData.charRequestId.split(':');

      if (this.state.characterId === Number(requestCharId)) {
        return;
      }

      if (this.socket && data.identifier.startsWith('birds:')) {
        const inventory = this.state.inventories.get(data.identifier);
        if (inventory) {
          const birdInvIdentifiers: string[] = [];
          for (const item of Object.values(inventory.items)) {
            birdInvIdentifiers.push(`bird:${item.ids[0]}`);
          }
          const oldBirdInvIdentifiers = [...this.subscriptions.keys()].filter((id) => id.startsWith('bird:'));
          for (const oldId of oldBirdInvIdentifiers) {
            if (!birdInvIdentifiers.includes(oldId)) {
              this.socket.emit('inventory.unsubscribe', oldId);
              this.subscriptions.delete(oldId);
              console.log('Unsubscribing from old bird inventory:', oldId);
            }
          }
          for (const birdInvIdentifier of birdInvIdentifiers) {
            if (!this.subscriptions.has(birdInvIdentifier)) {
              this.socket.emit('inventory.subscribe', birdInvIdentifier);
              this.subscriptions.add(birdInvIdentifier);
              console.log('Subscribing to new bird inventory:', birdInvIdentifier);
            }
          }
        }
      }

      const inventories = new Map(this.state.inventories);
      const inventory = inventories.get(moveData.identifier);

      if (inventory) {
        // Check if drag item needs to be cancelled
        const dragItem = document.getElementById('drag-item');
        if (dragItem) {
          const dragItemSlot = Number(dragItem.dataset.slot);
          if (
            dragItem.dataset.inventoryIdentifier === moveData.identifier &&
            moveData.emptySlots.includes(dragItemSlot)
          ) {
            this.cancelDrag();
          }
        }

        // Update items
        for (const [slot, item] of Object.entries(moveData.items)) {
          inventory.items[slot] = item;
        }

        // Clear empty slots
        for (const slot of moveData.emptySlots) {
          delete inventory.items[slot];
        }

        // Handle clothing equipment changes
        if (moveData.identifier === `clothing:${this.state.characterId}`) {
          emitClient('inventory.clothing-change', Object.values(inventory.items));
        }

        // Auto-close target inventory if the container item was moved by another player
        if (this.state.targetContainerItemId) {
          const containerItemId = this.state.targetContainerItemId;
          let containerItemStillExists = false;
          for (const inv of inventories.values()) {
            for (const item of Object.values(inv.items)) {
              if (item.ids.includes(containerItemId)) {
                containerItemStillExists = true;
                break;
              }
            }
            if (containerItemStillExists) break;
          }
          if (!containerItemStillExists) {
            this.closeTargetInventory();
          }
        }
      }

      this.updateState({ inventories });
      this.computeInventoryWeight();
    }
  };

  // Handle success response from socket
  private handleSuccess = (data: UI.Inventory.SuccessFailData): void => {
    this.requests.delete(data.requestId);
  };

  // Handle fail response from socket
  private handleFail = (data: UI.Inventory.MoveOrFailData): void => {
    if ('requestId' in data) {
      const failData = data as UI.Inventory.SuccessFailData;
      const request = this.requests.get(failData.requestId);

      if (!request) return;

      this.requests.delete(failData.requestId);
      const { sourceIdentifier, oldSlot, targetIdentifier, newSlot } = request;

      if (failData.requestType === 'move') {
        const inventories = new Map(this.state.inventories);
        const sourceInventory = inventories.get(sourceIdentifier);
        const targetInventory = inventories.get(targetIdentifier);

        if (!sourceInventory) return;

        if (!targetInventory) {
          // Target not in state (e.g., container deposit that failed)
          // Re-subscribe to source to get fresh server state
          if (this.socket) {
            this.socket.emit('inventory.subscribe', sourceIdentifier);
          }
          return;
        }

        // Revert the move
        const oldItem = sourceInventory.items[oldSlot];
        const newItem = targetInventory.items[newSlot];

        if (oldItem) {
          targetInventory.items[newSlot] = oldItem;
        } else {
          delete targetInventory.items[newSlot];
        }

        if (newItem) {
          sourceInventory.items[oldSlot] = newItem;
        } else {
          delete sourceInventory.items[oldSlot];
        }

        this.updateState({ inventories });
        this.computeInventoryWeight();
      }
    }
  };

  // Handle item wear from socket
  private handleItemWear = (itemId: number, wearAmount: number): void => {
    let itemChanged = false;
    const inventories = new Map(this.state.inventories);

    for (const inventory of inventories.values()) {
      for (const item of Object.values(inventory.items)) {
        if (item.ids.includes(itemId)) {
          const oldDurability = item.durabilities[0] || 0;
          const maxDurability = this.items[item.identifier]?.maxDurability || 1;
          const newDurability = clamp(oldDurability + wearAmount, 0, maxDurability);

          item.durabilities[0] = newDurability;
          itemChanged = true;
        }
      }
    }

    if (itemChanged) {
      this.updateState({ inventories });
    }
  };

  // Handle item remove from socket (e.g. a consumed item)
  private handleItemRemove = (itemId: number): void => {
    let itemChanged = false;
    const inventories = new Map(this.state.inventories);

    for (const inventory of inventories.values()) {
      for (const [slot, item] of Object.entries(inventory.items)) {
        const idIndex = item.ids.indexOf(itemId);
        if (idIndex === -1) continue;

        item.ids.splice(idIndex, 1);
        item.metadatas.splice(idIndex, 1);
        item.durabilities.splice(idIndex, 1);
        item.quantity -= 1;

        if (item.quantity <= 0) {
          delete inventory.items[slot];
        }

        itemChanged = true;
      }
    }

    if (itemChanged) {
      this.updateState({ inventories });
      this.computeInventoryWeight();
    }
  };

  // Handle item metadata update from socket (e.g. lantern oil tint)
  private handleItemMetadataUpdate = (itemId: number, metadata: Record<string, any>): void => {
    let itemChanged = false;
    const inventories = new Map(this.state.inventories);

    for (const inventory of inventories.values()) {
      for (const item of Object.values(inventory.items)) {
        const idIndex = item.ids.indexOf(itemId);
        if (idIndex === -1) continue;

        item.metadatas[idIndex] = { ...item.metadatas[idIndex], ...metadata };
        itemChanged = true;
      }
    }

    if (itemChanged) {
      this.updateState({ inventories });
    }
  };

  // Handle world inventory open from socket
  private handleOpenWorld = (targetInventory: string): void => {
    this.updateState({ targetInventory });
  };

  // Use an item in a slot
  private useSlot = (slot: number): void => {
    const inventory = this.state.inventories.get(this.state.mainInventory);
    if (!inventory) return;

    const slotItem = inventory.items[slot];
    if (!slotItem) return;

    if (slotItem.durabilities && slotItem.durabilities[0] !== null && slotItem.durabilities[0] <= 0) {
      return;
    }

    emitClient('inventory.use-item', slotItem);
  };

  // Get items for a player by item ID
  private getPlayerItems = (itemId: number): UI.Inventory.ItemData[] => {
    const inventory = this.state.inventories.get(this.state.mainInventory);
    return Object.values(inventory?.items || []).filter((item) => item.identifier === itemId);
  };

  // Move an item between inventories
  moveItem(
    sourceIdentifier: string,
    oldSlot: number,
    targetIdentifier: string,
    newSlot?: number | null,
    force = false,
    quantity?: number,
  ): void {
    if (!this.socket) return;

    if (sourceIdentifier === targetIdentifier && oldSlot === newSlot) {
      return;
    }

    // Find an empty slot if none specified
    if (newSlot === undefined || newSlot === null) {
      const targetInventory = this.state.inventories.get(targetIdentifier);
      if (!targetInventory) {
        if (force) {
          // Optimistically remove from source and let server handle destination
          const inventories = new Map(this.state.inventories);
          const sourceRaw = inventories.get(sourceIdentifier);
          if (sourceRaw) {
            const sourceItems = { ...sourceRaw.items };
            delete sourceItems[oldSlot];
            inventories.set(sourceIdentifier, { ...sourceRaw, items: sourceItems });
          }
          this.updateState({ inventories });
          this.computeInventoryWeight();

          // Send to server with slot -1 to let server find first available slot
          this.requestId++;
          this.socket.emit('inventory.item-move', this.requestId, sourceIdentifier, oldSlot, targetIdentifier, -1, quantity);
          this.requests.set(this.requestId, { sourceIdentifier, oldSlot, targetIdentifier, newSlot: -1 });
        }
        return;
      }

      for (let s = 0; s < targetInventory.slots; s++) {
        if (!targetInventory.items[s]) {
          newSlot = s;
          break;
        }
      }

      if (newSlot === undefined || newSlot === null) {
        return;
      }
    }

    // Check if the moved item or the swapped item is the container that opened the target inventory
    if (this.state.targetContainerItemId) {
      const containerItemId = this.state.targetContainerItemId;
      const sourceInventory = this.state.inventories.get(sourceIdentifier);
      const targetInventory = this.state.inventories.get(targetIdentifier);
      const sourceSlotItem = sourceInventory?.items[oldSlot];
      const targetSlotItem = targetInventory?.items[newSlot];
      if (
        (sourceSlotItem && sourceSlotItem.ids.includes(containerItemId)) ||
        (targetSlotItem && targetSlotItem.ids.includes(containerItemId))
      ) {
        this.closeTargetInventory();
      }
    }

    // Clear failed image cache for these slots
    this.failedImages.delete(`${sourceIdentifier}::${oldSlot}`);
    this.failedImages.delete(`${targetIdentifier}::${newSlot}`);

    // Send move request to socket
    this.requestId++;
    this.socket.emit('inventory.item-move', this.requestId, sourceIdentifier, oldSlot, targetIdentifier, newSlot, quantity);
    this.requests.set(this.requestId, { sourceIdentifier, oldSlot, targetIdentifier, newSlot });

    // Optimistically update state with deep clones to prevent shared references
    const inventories = new Map(this.state.inventories);
    const sourceRaw = inventories.get(sourceIdentifier);
    const targetRaw = inventories.get(targetIdentifier);

    if (!sourceRaw || !targetRaw) return;

    const sourceItems = { ...sourceRaw.items };
    const targetItems = sourceIdentifier === targetIdentifier ? sourceItems : { ...targetRaw.items };

    const oldItem = sourceItems[oldSlot] ? { ...sourceItems[oldSlot] } : undefined;
    const newItem = targetItems[newSlot] ? { ...targetItems[newSlot] } : undefined;

    if (quantity && oldItem && oldItem.quantity > quantity) {
      // Partial move: split the stack
      const splitItem = {
        ...oldItem,
        ids: oldItem.ids.slice(0, quantity),
        metadatas: oldItem.metadatas.slice(0, quantity),
        durabilities: oldItem.durabilities.slice(0, quantity),
        quantity,
      };
      const remainingItem = {
        ...oldItem,
        ids: oldItem.ids.slice(quantity),
        metadatas: oldItem.metadatas.slice(quantity),
        durabilities: oldItem.durabilities.slice(quantity),
        quantity: oldItem.quantity - quantity,
      };
      targetItems[newSlot] = splitItem;
      sourceItems[oldSlot] = remainingItem;
    } else {
      if (oldItem) {
        targetItems[newSlot] = oldItem;
      } else {
        delete targetItems[newSlot];
      }

      if (newItem) {
        sourceItems[oldSlot] = newItem;
      } else {
        delete sourceItems[oldSlot];
      }
    }

    const sourceInventory = { ...sourceRaw, items: sourceItems };
    inventories.set(sourceIdentifier, sourceInventory);
    if (sourceIdentifier !== targetIdentifier) {
      const targetInventory = { ...targetRaw, items: targetItems };
      inventories.set(targetIdentifier, targetInventory);

      // Handle clothing equipment changes
      if (sourceIdentifier === `clothing:${this.state.characterId}`) {
        emitClient('inventory.clothing-change', Object.values(sourceInventory.items));
      }
      if (targetIdentifier === `clothing:${this.state.characterId}`) {
        emitClient('inventory.clothing-change', Object.values(targetInventory.items));
      }
    }

    this.updateState({ inventories });
    this.computeInventoryWeight();
  }

  // Stack items
  stackItem(sourceIdentifier: string, oldSlot: number, targetIdentifier: string, newSlot: number): void {
    if (!this.socket) return;

    if (sourceIdentifier === targetIdentifier && oldSlot === newSlot) {
      return;
    }

    // Check if the stacked item is the container that opened the target inventory
    if (this.state.targetContainerItemId) {
      const sourceInventory = this.state.inventories.get(sourceIdentifier);
      const slotItem = sourceInventory?.items[oldSlot];
      if (slotItem && slotItem.ids.includes(this.state.targetContainerItemId)) {
        this.closeTargetInventory();
      }
    }

    // Clear failed image cache
    this.failedImages.delete(`${sourceIdentifier}::${oldSlot}`);
    this.failedImages.delete(`${targetIdentifier}::${newSlot}`);

    // Send stack request
    this.requestId++;
    this.socket.emit('inventory.item-stack', this.requestId, sourceIdentifier, oldSlot, targetIdentifier, newSlot);
    this.requests.set(this.requestId, { sourceIdentifier, oldSlot, targetIdentifier, newSlot });

    // Optimistically update state with deep clones
    const inventories = new Map(this.state.inventories);
    const sourceRaw = inventories.get(sourceIdentifier);
    const targetRaw = inventories.get(targetIdentifier);

    if (!sourceRaw || !targetRaw) return;

    const sourceItems = { ...sourceRaw.items };
    const targetItems = sourceIdentifier === targetIdentifier ? sourceItems : { ...targetRaw.items };

    const oldItem = sourceItems[oldSlot] ? { ...sourceItems[oldSlot], ids: [...sourceItems[oldSlot].ids], metadatas: [...sourceItems[oldSlot].metadatas], durabilities: [...sourceItems[oldSlot].durabilities] } : undefined;
    const newItem = targetItems[newSlot] ? { ...targetItems[newSlot], ids: [...targetItems[newSlot].ids], metadatas: [...targetItems[newSlot].metadatas], durabilities: [...targetItems[newSlot].durabilities] } : undefined;

    if (!oldItem || !newItem) return;
    if (oldItem.identifier !== newItem.identifier) return;

    const itemData = this.items[oldItem.identifier];
    if (!itemData) return;

    if (oldItem.quantity + newItem.quantity <= itemData.stackSize) {
      // Complete stack
      newItem.ids.push(...oldItem.ids);
      newItem.metadatas.push(...oldItem.metadatas);
      newItem.quantity += oldItem.quantity;
      targetItems[newSlot] = newItem;
      delete sourceItems[oldSlot];
    } else {
      // Partial stack
      const diff = itemData.stackSize - newItem.quantity;
      newItem.ids.push(...oldItem.ids.slice(0, diff));
      newItem.metadatas.push(...oldItem.metadatas.slice(0, diff));
      newItem.quantity += diff;
      oldItem.ids = oldItem.ids.slice(diff);
      oldItem.metadatas = oldItem.metadatas.slice(diff);
      oldItem.quantity -= diff;
      sourceItems[oldSlot] = oldItem;
      targetItems[newSlot] = newItem;
    }

    inventories.set(sourceIdentifier, { ...sourceRaw, items: sourceItems });
    if (sourceIdentifier !== targetIdentifier) {
      inventories.set(targetIdentifier, { ...targetRaw, items: targetItems });
    }

    this.updateState({ inventories });
  }

  // Drop an item
  dropItem(identifier: string, slot: number): void {
    if (!this.socket) return;

    // Check if the dropped item is the container that opened the target inventory
    if (this.state.targetContainerItemId) {
      const inventory = this.state.inventories.get(identifier);
      const slotItem = inventory?.items[slot];
      if (slotItem && slotItem.ids.includes(this.state.targetContainerItemId)) {
        this.closeTargetInventory();
      }
    }

    if (this.state.targetInventory.startsWith('_WORLD_:')) {
      this.moveItem(identifier, slot, this.state.targetInventory, undefined, true);
      return;
    }

    // Optimistic removal
    const inventories = new Map(this.state.inventories);
    const inventory = inventories.get(identifier);
    if (inventory) {
      const updatedItems = { ...inventory.items };
      delete updatedItems[slot];
      inventories.set(identifier, { ...inventory, items: updatedItems });
      this.updateState({ inventories });
      this.computeInventoryWeight();
    }

    this.requestId++;
    this.socket.emit('inventory.item-drop', this.requestId, identifier, slot);
  }

  // Update item metadata (e.g., wearable state) — optimistic + fire-and-forget DB persist
  updateItemMetadata(identifier: string, slot: number, metadata: Record<string, any>): void {
    if (!this.socket) return;

    const inventories = new Map(this.state.inventories);
    const inventory = inventories.get(identifier);
    if (!inventory) return;

    const slotItem = inventory.items[slot];
    if (!slotItem) return;

    // Optimistic local update
    slotItem.metadatas[0] = { ...slotItem.metadatas[0], ...metadata };
    this.updateState({ inventories });

    // DB persist (fire-and-forget)
    const itemId = slotItem.ids[0];
    this.socket.emit('inventory.item-update-metadata', itemId, metadata);

    // Visual update (instant, no re-equip)
    if (identifier.startsWith('clothing:')) {
      emitClient('customization.set-wearable-state', slotItem.metadatas[0]?.category, metadata.wearableState);
    }
  }

  // Cancel current drag operation
  cancelDrag(): void {
    const dragItem = document.getElementById('drag-item');
    if (!dragItem) return;

    document.body.removeChild(dragItem);
    const draggedElements = document.getElementsByClassName('dragged-source');
    for (const element of draggedElements) {
      element.classList.remove('dragged-source');
    }
  }

  // Compute inventory weights
  private computeInventoryWeight(): void {
    const inventoriesWeight = new Map(this.state.inventoriesWeight);
    let updated = false;

    for (const [identifier, data] of this.state.inventories) {
      let weight = 0;
      for (const item of Object.values(data.items)) {
        const itemData = this.items[item.identifier];
        if (itemData && itemData.weight && item.quantity > 0) {
          weight += itemData.weight * item.quantity;
        }
      }
      const weightRatio = weight / data.maxWeight;
      if (weightRatio !== inventoriesWeight.get(identifier)) {
        inventoriesWeight.set(data.identifier, weightRatio);
        updated = true;
      }
    }

    if (updated) {
      this.updateState({ inventoriesWeight });
    }
  }

  // Update state and notify listeners
  updateState(newState: Partial<InventoryState>): void {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((listener) => listener(this.state));
  }

  // Startup method required by component
  startup(): void {
    // This method is called by the inventory component on mount
    // All initialization is handled in the initialize method
    // This is kept for backwards compatibility
  }

  // Subscribe to state changes
  subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    listener(this.state); // Call immediately with current state

    return () => {
      this.listeners.delete(listener);
    };
  }

  // Get current state
  getState(): InventoryState {
    return this.state;
  }

  // Get items data
  getItems(): Inventory.UIItems {
    return this.items;
  }

  // Get drawable map for clothing thumbnails
  getDrawableMap(): Record<string, [number, string]> {
    return this.drawableMap;
  }

  // Check if an image has failed to load
  hasFailedImage(key: string): boolean {
    return this.failedImages.has(key);
  }

  // Mark an image as failed
  markImageFailed(key: string): void {
    this.failedImages.add(key);
    // Force re-render by updating state
    this.updateState({});
  }

  // Set tooltip information
  setTooltip(item: UI.Inventory.ItemData | null, below: boolean = false, x: number = 0, y: number = 0): void {
    this.updateState({
      tooltipItem: item,
      tooltipBelow: below,
      tooltipX: x,
      tooltipY: y,
    });
  }

  // Use an item from a specific inventory and slot (public)
  useItemInSlot(inventoryIdentifier: string, slot: number): void {
    const inventory = this.state.inventories.get(inventoryIdentifier);
    if (!inventory) return;

    const slotItem = inventory.items[slot];
    if (!slotItem) return;

    if (slotItem.durabilities && slotItem.durabilities[0] !== null && slotItem.durabilities[0] <= 0) {
      return;
    }

    emitClient('inventory.use-item', slotItem);
  }

  // Open a container item as the target inventory
  openContainer(inventoryIdentifier: string, slot: number): void {
    const inventory = this.state.inventories.get(inventoryIdentifier);
    if (!inventory) return;

    const slotItem = inventory.items[slot];
    if (!slotItem) return;

    const itemData = this.items[slotItem.identifier];
    if (!itemData?.containerType) return;

    const itemId = slotItem.ids[0];
    const targetIdentifier = `${itemData.containerType}:${itemId}`;
    this.updateState({ targetContainerItemId: itemId });
    this.handleInventoryState({ targetInventory: targetIdentifier });
  }

  // Close only the target inventory panel
  closeTargetInventory(): void {
    if (!this.socket || !this.state.targetInventory) return;

    const targetIdentifier = this.state.targetInventory;

    // Check if a bird auto-subscription uses this identifier — don't unsubscribe if so
    const birdsInventory = this.state.inventories.get(this.state.birdsInventory);
    let isUsedByBird = false;
    if (birdsInventory) {
      for (const item of Object.values(birdsInventory.items)) {
        if (`bird:${item.ids[0]}` === targetIdentifier) {
          isUsedByBird = true;
          break;
        }
      }
    }

    if (!isUsedByBird) {
      this.socket.emit('inventory.unsubscribe', targetIdentifier);
      this.subscriptions.delete(targetIdentifier);
    }

    this.updateState({ targetInventory: '', targetContainerItemId: 0 });

    // Re-subscribe to world inventories since no target is open
    if (!this.worldSubscribed) {
      this.socket.emit('inventory.subscribe-world');
      this.worldSubscribed = true;
    }
  }

  // Close inventory
  closeInventory(): void {
    this.cancelDrag();
    if (!this.socket) return;
    this.socket.emit('inventory.unsubscribe', this.state.targetInventory);
    this.subscriptions.delete(this.state.targetInventory);
    this.updateState({
      show: false,
      targetInventory: '',
      targetContainerItemId: 0,
    });
  }

  // Cleanup when store is destroyed
  cleanup(): void {
    if (this.resyncInterval !== null) {
      clearInterval(this.resyncInterval);
      this.resyncInterval = null;
    }

    if (this.socket) {
      // Remove socket handlers
      this.socket.off('inventory.load', this.handleInventoryLoad);
      this.socket.off('inventory.item-add', this.handleItemAdd);
      this.socket.off('inventory.item-move', this.handleItemMove);
      this.socket.off('inventory.success', this.handleSuccess);
      this.socket.off('inventory.fail', this.handleFail);
      this.socket.off('inventory.item-wear', this.handleItemWear);
      this.socket.off('inventory.item-remove', this.handleItemRemove);
      this.socket.off('inventory.item-metadata-update', this.handleItemMetadataUpdate);
      this.socket.off('inventory.open-world', this.handleOpenWorld);

      // Unsubscribe from all inventories
      this.subscriptions.forEach((subscription) => {
        this.socket!.emit('inventory.unsubscribe', subscription);
      });
    }

    this.subscriptions.clear();
    this.worldSubscribed = false;
    this.requests.clear();
    this.listeners.clear();
    this.initialized = false;
  }
}

export default InventoryStore.getInstance();
