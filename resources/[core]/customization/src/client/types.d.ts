declare interface ClientExports {
  customization: Customization.ClientExports;
}

declare namespace Customization {
  type GetGuidsAtIndex = (entity: number, index: number) => Guids;
  type GetDrawableAtIndex = (entity: number, index: number) => number;
  type GetAlbedoAtIndex = (entity: number, index: number) => number;
  type GetNormalAtIndex = (entity: number, index: number) => number;
  type GetMaterialAtIndex = (entity: number, index: number) => number;
  type GetTintAtIndex = (entity: number, index: number) => Palette;
  type GetPaletteAtIndex = (entity: number, index: number) => string | number;
  type GetTint0AtIndex = (entity: number, index: number) => number;
  type GetTint1AtIndex = (entity: number, index: number) => number;
  type GetTint2AtIndex = (entity: number, index: number) => number;
  type GetIndexForDrawable = (entity: number, drawable: number | string) => number;
  type GetTintForDrawable = (entity: number, drawable: number | string) => Palette | undefined;
  type GetIndexForCategory = (entity: number, category: number | string) => number;
  type GetTintForCategory = (entity: number, category: number | string) => Palette | undefined;
  type SetTintForCategory = (
    entity: number,
    category: number | string,
    palette: number | string,
    tint0: number,
    tint1: number,
    tint2: number,
  ) => void;
  type SetTintAtIndex = (
    entity: number,
    index: number,
    palette: number | string,
    tint0: number,
    tint1: number,
    tint2: number,
  ) => void;
  type SetTint = (entity: number, palette: number | string, tint0: number, tint1: number, tint2: number) => void;
  type RemoveTint = (entity: number) => void;
  type RemoveTintByIndex = (entity: number, index: number) => void;
  type RemoveTintByCategory = (entity: number, category: number | string) => void;
  type SetTintByCategory = (
    entity: number,
    category: number | string,
    palette: number | string,
    tint0: number,
    tint1: number,
    tint2: number,
  ) => void;
  type SetTintByDrawable = (
    entity: number,
    drawable: number | string,
    palette: number | string,
    tint0: number,
    tint1: number,
    tint2: number,
  ) => void;
  type GetHorseDrawableAtIndex = (entity: number, index: number) => string;
  type GetIndexForHorsePart = (entity: number, part: Customization.HorseParts) => number;
  type SetTintByHorsePart = (
    entity: number,
    part: Customization.HorseParts,
    palette: number | string,
    tint0: number,
    tint1: number,
    tint2: number,
  ) => void;

  type EquipItems = (ped: number, items: UI.Inventory.ItemData[]) => void;
  type ApplyMetaPedOutfit = (ped: number, outfit: string | number) => void;

  type SetWearableState = (catgegory: string | number, state: string | number, ped?: number) => void;

  type SetLanternColor = (ped: number, attachPoint: number, oilColor: [number, number, number]) => void;

  interface ClientExports {
    getGuidsAtIndex: GetGuidsAtIndex;
    getDrawableAtIndex: GetDrawableAtIndex;
    getAlbedoAtIndex: GetAlbedoAtIndex;
    getNormalAtIndex: GetNormalAtIndex;
    getMaterialAtIndex: GetMaterialAtIndex;
    getTintAtIndex: GetTintAtIndex;
    getPaletteAtIndex: GetPaletteAtIndex;
    getTint0AtIndex: GetTint0AtIndex;
    getTint1AtIndex: GetTint1AtIndex;
    getTint2AtIndex: GetTint2AtIndex;
    getIndexForDrawable: GetIndexForDrawable;
    getTintForDrawable: GetTintForDrawable;
    getIndexForCategory: GetIndexForCategory;
    getTintForCategory: GetTintForCategory;
    setTintAtIndex: SetTintAtIndex;
    setTint: SetTint;
    removeTint: RemoveTint;
    removeTintByIndex: RemoveTintByIndex;
    removeTintByCategory: RemoveTintByCategory;
    setTintByCategory: SetTintByCategory;
    setTintByDrawable: SetTintByDrawable;
    getHorseDrawableAtIndex: GetHorseDrawableAtIndex;
    getIndexForHorsePart: GetIndexForHorsePart;
    setTintByHorsePart: SetTintByHorsePart;
    equipItems: EquipItems;
    applyMetaPedOutfit: ApplyMetaPedOutfit;
    setWearableState: SetWearableState;
    setLanternColor: SetLanternColor;
  }
}

// Client perspective - RPC calls to various destinations
declare namespace ClientRPC {
  interface Socket {
    // Add customization RPC calls here when needed
  }
}

// Client perspective - events received from various sources
declare namespace ClientIn {
  interface FromSocket {
    // Add customization events from socket here when needed
  }
}

// Client perspective - events sent to various destinations
declare namespace ClientOut {
  interface ToSocket {
    // Add customization events to socket here when needed
  }
}

// Raw Socket.io events for UI layer typing - DEDUPLICATED
// Note: SocketIO.Events eliminated - use ClientIn.FromSocket and ClientOut.ToSocket directly
