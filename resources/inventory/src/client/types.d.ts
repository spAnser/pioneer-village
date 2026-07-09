declare interface ClientExports {
  inventory: Inventory.ClientExports;
}

declare namespace Inventory {
  type openInventory = (identifier: string) => void;

  type ClientExports = {
    openInventory: openInventory;
  };
}

// Client perspective - RPC calls to various destinations
declare namespace ClientRPC {
  interface Socket {
    ['inventory.has-item']: (inventoryId: string | number, itemId: number, amount: number) => void;
    ['inventory.player-has-item']: (itemId: number, amount: number) => void;
    ['inventory.get-items']: (inventoryId: string | number, itemId: number) => void;
    ['inventory.player-get-items']: (itemId: number) => UI.Inventory.ItemData[];
  }
}

// Client perspective - events received from various sources
declare namespace ClientIn {
  interface FromSocket {
    ['inventory.state']: (event: UI.Inventory.Event) => void;
    ['inventory.items']: (items: Record<number, Inventory.UIItem>) => void;
    ['inventory.use-slot']: (slot: number) => void;
    ['inventory.use-item']: (itemData: UI.Inventory.ItemData) => void;
    ['inventory.send-bird']: (birdId: number, destinationId: number) => void;
    ['inventory.clothing-change']: (equippedItems: UI.Inventory.ItemData[]) => void;
    ['inventory.main-inventory']: (data: UI.Inventory.LoadData, clothingData?: UI.Inventory.LoadData) => void;
    ['inventory.target-inventory']: (data: UI.Inventory.LoadData) => void;
    ['inventory.startup']: () => void;
    ['inventory.world-inventories']: (inventories: string[]) => void;
  }
}

// Client perspective - events sent to various destinations
declare namespace ClientOut {
  interface ToSocket {
    ['inventory.item-wear']: (itemId: number) => void;
    ['inventory.lost-hat']: (hatNetId: number, coords: Vector3) => void;
    ['inventory.pickup-hat']: (itemId: number) => void;
    ['inventory.get-world-inventories']: () => void;
    ['inventory.item-update-metadata']: (itemId: number, metadata: Record<string, any>) => void;
    ['inventory.item-consume']: (itemId: number) => void;
  }
  interface ToServer {
    ['inventory.pickup-hat']: (hatNetId: number) => void;
  }
}
