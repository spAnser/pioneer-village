// Socket perspective - what the socket server receives
declare namespace SocketIn {
  interface FromGameServer {
    createInventory: (identifier: string, inventoryType: number, callback: (success: boolean) => void) => void;
    deleteInventory: (identifier: string, callback: (success: boolean) => void) => void;
    inventoryAddItem: (
      inventoryId: string,
      itemIdentifier: number,
      amount?: number,
      metadata?: Record<string, any>,
      callback?: (success: boolean) => void,
    ) => void;
    'inventory.item-wear': (itemId: number) => void;
  }

  interface FromClient {
    'inventory.subscribe': (identifier: string) => void;
    'inventory.unsubscribe': (identifier: string) => void;
    'inventory.subscribe-world': () => void;
    'inventory.item-stack': (
      requestId: number,
      oldIdentifier: string,
      oldSlot: number,
      newIdentifier: string,
      newSlot: number,
    ) => void;
    'inventory.item-move': (
      requestId: number,
      oldIdentifier: string,
      oldSlot: number,
      newIdentifier: string,
      newSlot: number,
      quantity?: number,
    ) => void;
    'inventory.item-drop': (requestId: number, identifier: string, slot: number) => void;
    'inventory.item-wear': (itemId: number) => void;
    'inventory.lost-hat': (hatNetId: number, coords: Vector3) => void;
    'inventory.pickup-hat': (itemId: number) => void;
    'inventory.check-world': () => void;
    'inventory.get-world-inventories': () => void;
    'inventory.item-update-metadata': (itemId: number, metadata: Record<string, any>) => void;
  }
}

// Socket perspective - what the socket server sends
declare namespace SocketOut {
  interface ToGameServer {
    'inventory.set-hat-item-id': (hatNetId: number, itemId: number) => void;
    'inventory.delete-hat-by-item-id': (itemId: number) => void;
  }

  interface ToClient {
    'inventory.world-inventories': (inventories: string[]) => void;
    'inventory.startup': (data: any) => void;
    'inventory.fail': (data: UI.Inventory.MoveOrFailData) => void;
    'inventory.success': (data: {
      identifier: string;
      requestId: number;
      requestType: UI.Inventory.RequestType;
    }) => void;
    'inventory.item-move': (data: UI.Inventory.MoveOrFailData) => void;
    'inventory.load': (inventory: any) => void;
    'inventory.item-add': (event: any) => void;
    'inventory.item-wear': (itemId: number, wearAmount: number) => void;
    'inventory.open-world': (identifier: string) => void;
    'inventory.target-inventory': (data: any) => void;
    'inventory.main-inventory': (data: any) => void;
    'inventory.subscribe': (identifier: string) => void;
    'inventory.subscribe-world': () => void;
    'inventory.unsubscribe': (identifier: string) => void;
    'inventory.item-stack': (
      requestId: number,
      oldIdentifier: string,
      oldSlot: number,
      newIdentifier: string,
      newSlot: number,
    ) => void;
    'inventory.item-drop': (requestId: number, identifier: string, slot: number) => void;
    'inventory.lost-hat': (hatNetId: number, coords: Vector3) => void;
    'inventory.check-world': () => void;
  }
}

// Keep backward compatibility during migration
declare namespace SocketServer {
  interface Server extends SocketIn.FromGameServer {}
  interface ServerEvents extends SocketOut.ToGameServer {}
  interface Client extends SocketOut.ToClient {}
  interface ClientEvents extends SocketIn.FromClient {}
}
