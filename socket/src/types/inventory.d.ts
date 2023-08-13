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
  }

  interface ServerEvents {
    inventoryAddItem: (
      identifier: string,
      itemId: number,
      amount: number,
      metadata: Record<string, any>,
      callback: (success: boolean) => void,
    ) => void;
  }

  interface Client {}

  interface ClientEvents {
    inventorySubscribe: (identifier: string) => void;
    inventoryUnsubscribe: (identifier: string) => void;
    inventoryStack: (oldIdentifier: string, oldSlot: number, newIdentifier: string, newSlot: number) => void;
    inventoryMove: (oldIdentifier: string, oldSlot: number, newIdentifier: string, newSlot: number) => void;
  }
}
