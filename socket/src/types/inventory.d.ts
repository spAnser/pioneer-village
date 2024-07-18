declare namespace SocketServer {
  interface Server {
    createInventory: (identifier: string, inventoryType: number, callback: (inventory: boolean) => void) => void;
    inventoryAddItem: (
      identifier: string,
      itemId: number,
      amount: number,
      metadata: Record<string, any>,
      callback: (success: boolean) => void,
    ) => void;
    ['inventory.item-wear']: (itemId: number) => void;
  }

  interface ServerEvents {
    inventoryAddItem: (
      identifier: string,
      itemId: number,
      amount: number,
      metadata: Record<string, any>,
      callback: (success: boolean) => void,
    ) => void;
    ['inventory.item-wear']: (itemId: number) => void;
  }

  interface Client {}

  interface ClientEvents {
    inventorySubscribe: (identifier: string) => void;
    inventoryUnsubscribe: (identifier: string) => void;
    inventoryStack: (
      requestId: number,
      oldIdentifier: string,
      oldSlot: number,
      newIdentifier: string,
      newSlot: number,
    ) => void;
    inventoryMove: (
      requestId: number,
      oldIdentifier: string,
      oldSlot: number,
      newIdentifier: string,
      newSlot: number,
    ) => void;
    ['inventory.item-wear']: (itemId: number) => void;
  }
}
