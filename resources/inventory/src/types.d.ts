declare namespace Inventory {
  enum ItemFlags {
    MATERIAL = 1,
    WEAPON = 2,
    AMMO = 4,
    CURRENCY = 8,
    TOOL = 16,
    CONSUMABLE = 32,
    CARCASS = 64,
    KEY = 128,
    CLOTHING = 256,
  }

  enum Restrictions {
    None = 0,
    Tiny = 1,
    Small = 2,
    Food = 4,
    Ammo = 8,
    Clothing = 16,
    Bird = 32,
  }

  interface Type {
    slots: number;
    maxWeight: number;
    restrictions: Restrictions;
  }

  interface Thing {
    itemId: number;
    name: string;
    description: string;
    decayTime: number;
    weight: number;
    stackSize: number;
    onUse: string;
  }

  type ItemBase = {
    identifier: number;
    image: string;
    name: string;
    description?: string;
    flags: ItemFlags;
    restriction: Restrictions;
    stackSize: number;
    weight: number;
    decayRate?: number;
    useEvent?: string;
    maxDurability?: number;
    maxLife?: number;
    containerType?: string;
    birdType?: string;
  };

  // type ItemDurable = ItemBase & {
  //   stackSize: 1;
  //   maxDurability: number;
  // }

  type ItemWeapon = ItemBase & {
    weaponHash: number;
    weaponType: Weapon.Type;
  };

  type ItemAmmo = ItemBase & {
    ammoHash: number;
    ammoAmount: number;
  };

  type ItemBait = ItemBase & {
    bait: string;
    baitHash: number;
  };

  type ItemLanternOil = ItemBase & {
    oilColor: [number, number, number];
  };

  type Item = ItemBase | ItemWeapon | ItemAmmo | ItemBait | ItemLanternOil;

  type UIItem = {
    name: string;
    description: string;
    image: string;
    weight: number;
    stackSize: number;
    maxDurability?: number;
    maxLife?: number;
    hasUseEvent?: boolean;
    containerType?: string;
    containerRestrictions?: number;
    restriction?: number;
  };

  type UIItems = Record<number, UIItem>;

  type ItemMetadata = {
    name: string;
    image: string;
  };

  type ClothingMetadata = ItemMetadata & {
    category: string | number;
    shopItem: string | number;
    palette: string | number;
    tint0: number;
    tint1: number;
    tint2: number;
    wearableState?: string | number;
  };

  type DoorKeyMetadata = ItemMetadata & {
    doorHash?: number;
    doorHashes?: number[];
    linkedDoors?: number[][];
  };

  type LanternMetadata = ItemMetadata & {
    oilColor?: [number, number, number];
    oilName?: string;
  };

  type AnyItemMetadata = ItemMetadata | ClothingMetadata | DoorKeyMetadata | LanternMetadata | undefined;

  type InventoryMetadata = {
    name: string;
  };

  type WorldMetadata = InventoryMetadata & {
    slotId: number;
  };

  type AnyInventoryMetadata = InventoryMetadata | WorldMetadata | undefined;
}

declare namespace Weapon {
  enum Type {
    NO_AMMO,
    REQUIRES_AMMO,
    THROWN,
  }
}
