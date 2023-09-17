declare namespace Inventory {}

declare interface UIRPC {
  ['inventory.has-item']: (inventoryId: string | number, itemId: number, amount: number) => void;
  ['inventory.player-has-item']: (itemId: number, amount: number) => void;
  ['inventory.get-items']: (inventoryId: string | number, itemId: number) => void;
  ['inventory.player-get-items']: (itemId: number) => UI.Inventory.ItemData[];
}

declare interface UIEvents {
  ['inventory.state']: (event: UI.Inventory.Event) => void;
  ['inventory.items']: (items: Record<number, Inventory.UIItem>) => void;
  ['inventory.use-slot']: (slot: number) => void;
  ['inventory.use-item']: (itemData: UI.Inventory.ItemData) => void;
  ['inventory.clothing-change']: (equippedItems: UI.Inventory.ItemData[]) => void;
  ['inventory.main-inventory']: (data: UI.Inventory.LoadData) => void;
  ['inventory.target-inventory']: (data: UI.Inventory.LoadData) => void;
}

declare interface SocketForwardEvents {
  ['inventory.item-wear']: (itemId: number) => void;
}
