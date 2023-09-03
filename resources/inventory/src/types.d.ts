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
  }

  enum Restrictions {
    None = 0,
    OnlySmall = 1,
    OnlyFood = 2,
    OnlyAmmo = 4,
    Clothing = 5,
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

  interface ItemBase {
    identifier: number;
    image: string;
    name: string;
    description?: string;
    flags: ItemFlags;
    stackSize: number;
    weight: number;
    decayRate?: number;
    useEvent?: string;
  }

  interface ItemWeapon extends ItemBase {
    weaponHash: number;
    weaponType: Weapon.Type;
  }

  interface ItemAmmo extends ItemBase {
    ammoHash: number;
    ammoAmount: number;
  }

  interface ItemBait extends ItemBase {
    bait: string;
    baitHash: number;
  }

  type Item = ItemBase | ItemWeapon | ItemAmmo | ItemBait;

  type UIItem = {
    name: string;
    description: string;
    image: string;
    weight: number;
    stackSize: number;
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
