declare interface RPC {}

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
    Small = 1,
    Food = 2,
    Ammo = 4,
    Clothing = 8,
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

  type Item = ItemBase | ItemWeapon | ItemAmmo | ItemBait;

  type UIItem = {
    name: string;
    description: string;
    image: string;
    weight: number;
    stackSize: number;
    maxDurability?: number;
    maxLife?: number;
  };

  type UIItems = Record<number, UIItem>;
}

declare namespace Weapon {
  enum Type {
    NO_AMMO,
    REQUIRES_AMMO,
    THROWN,
  }
}
