const GetHashKey = (text: string): number => {
  const keyLowered = text.toLowerCase();
  const length = keyLowered.length;
  let hash = 0;

  for (let i = 0; i < length; i++) {
    hash = (hash + keyLowered.charCodeAt(i)) | 0;
    hash = (hash + (hash << 10)) | 0;
    hash = (hash ^ (hash >>> 6)) | 0;
  }

  hash = (hash + (hash << 3)) | 0;
  hash = (hash ^ (hash >>> 11)) | 0;
  hash = (hash + (hash << 15)) | 0;

  return hash;
};

const Minutes = (minutes: number): number => {
  return 60 * minutes;
};

const Hours = (hours: number): number => {
  return Minutes(60 * hours);
};

const Days = (days: number): number => {
  return Hours(24 * days);
};

const Weeks = (weeks: number): number => {
  return Days(7 * weeks);
};

const Months = (months: number): number => {
  return Weeks(4 * months);
};

// Inventory.ItemFlags
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

const WeaponType = {
  NO_AMMO: 0,
  REQUIRES_AMMO: 1,
  THROWN: 2,
};

const PVItems: Record<number, Inventory.Item> = {
  /**
   * Currency
   */
  [GetHashKey('PV_DOLLAR')]: {
    identifier: GetHashKey('PV_DOLLAR'),
    image: 'dollar',
    name: 'Dollar',
    flags: ItemFlags.CURRENCY,
    restriction: Restrictions.Small,
    stackSize: 100,
    weight: 0.01,
  },
  [GetHashKey('PV_QUARTER')]: {
    identifier: GetHashKey('PV_QUARTER'),
    image: 'quarter',
    name: 'Quarter',
    flags: ItemFlags.CURRENCY,
    restriction: Restrictions.Small,
    stackSize: 100,
    weight: 0.01,
  },
  [GetHashKey('PV_GOLD_BAR')]: {
    identifier: GetHashKey('PV_GOLD_BAR'),
    image: 'gold-bar',
    name: 'Gold Bar',
    flags: ItemFlags.CURRENCY + ItemFlags.MATERIAL,
    restriction: Restrictions.None,
    stackSize: 1,
    weight: 5,
  },
  /**
   * Tools
   */
  [GetHashKey('PV_SHOVEL')]: {
    identifier: GetHashKey('PV_SHOVEL'),
    image: 'shovel',
    name: 'Shovel',
    flags: ItemFlags.TOOL,
    restriction: Restrictions.None,
    stackSize: 1,
    weight: 4,
  },
  [GetHashKey('PV_HANDCUFFS')]: {
    identifier: GetHashKey('PV_HANDCUFFS'),
    image: 'handcuffs',
    name: 'Handcuffs',
    flags: ItemFlags.TOOL,
    restriction: Restrictions.None,
    stackSize: 1,
    weight: 2,
  },
  /**
   * Bows
   */
  [GetHashKey('PV_BOW')]: {
    identifier: GetHashKey('PV_BOW'),
    image: 'bow',
    name: 'Bow',
    flags: ItemFlags.WEAPON,
    restriction: Restrictions.None,
    stackSize: 1,
    decayRate: 0.5,
    weight: 3,
    useEvent: 'inventory:client:toggle_weapon',
    weaponHash: GetHashKey('WEAPON_BOW'),
    weaponType: WeaponType.REQUIRES_AMMO,
  },
  [GetHashKey('PV_AMMO_ARROW')]: {
    identifier: GetHashKey('PV_AMMO_ARROW'),
    image: 'arrow',
    name: 'Arrow',
    flags: ItemFlags.AMMO,
    restriction: Restrictions.Ammo + Restrictions.Small,
    stackSize: 20,
    weight: 0.01,
    useEvent: 'inventory:client:equip_ammo',
    ammoHash: GetHashKey('AMMO_ARROW'),
    ammoAmount: 1,
  },
  /**
   * Lasso
   */
  [GetHashKey('PV_LASSO')]: {
    identifier: GetHashKey('PV_LASSO'),
    image: 'lasso',
    name: 'Lasso',
    flags: ItemFlags.WEAPON,
    restriction: Restrictions.None,
    stackSize: 1,
    decayRate: 0.5,
    weight: 1.2,
    useEvent: 'inventory:client:toggle_weapon',
    weaponHash: GetHashKey('WEAPON_LASSO'),
    weaponType: WeaponType.NO_AMMO,
  },
  /**
   * Melee
   */
  [GetHashKey('PV_KNIFE')]: {
    identifier: GetHashKey('PV_KNIFE'),
    image: 'knife',
    name: 'Knife',
    flags: ItemFlags.WEAPON,
    restriction: Restrictions.None,
    stackSize: 1,
    decayRate: 0.5,
    weight: 1.2,
    useEvent: 'inventory:client:toggle_weapon',
    weaponHash: GetHashKey('WEAPON_MELEE_KNIFE'),
    weaponType: WeaponType.NO_AMMO,
  },
  [GetHashKey('PV_MELEE_MACHETE')]: {
    identifier: GetHashKey('PV_MELEE_MACHETE'),
    image: 'machete',
    name: 'Machete',
    flags: ItemFlags.WEAPON,
    restriction: Restrictions.None,
    stackSize: 1,
    decayRate: 0.5,
    weight: 1.2,
    useEvent: 'inventory:client:toggle_weapon',
    weaponHash: GetHashKey('WEAPON_MELEE_MACHETE'),
    weaponType: WeaponType.NO_AMMO,
  },
  [GetHashKey('PV_MELEE_TORCH')]: {
    identifier: GetHashKey('PV_MELEE_TORCH'),
    image: 'torch',
    name: 'Torch',
    flags: ItemFlags.WEAPON,
    restriction: Restrictions.None,
    stackSize: 1,
    decayRate: 0.5,
    weight: 0.8,
    useEvent: 'inventory:client:toggle_weapon',
    weaponHash: GetHashKey('WEAPON_MELEE_TORCH'),
    weaponType: WeaponType.NO_AMMO,
  },
  [GetHashKey('PV_MELEE_BROKEN_SWORD')]: {
    identifier: GetHashKey('PV_MELEE_BROKEN_SWORD'),
    image: 'broken-sword',
    name: 'Broken Sword',
    flags: ItemFlags.WEAPON,
    restriction: Restrictions.None,
    stackSize: 1,
    decayRate: 0.5,
    weight: 1.2,
    useEvent: 'inventory:client:toggle_weapon',
    weaponHash: GetHashKey('WEAPON_MELEE_BROKEN_SWORD'),
    weaponType: WeaponType.NO_AMMO,
  },
  /**
   * Misc
   */
  [GetHashKey('PV_MELEE_LANTERN')]: {
    identifier: GetHashKey('PV_MELEE_LANTERN'),
    image: 'lantern',
    name: 'Lantern',
    flags: ItemFlags.WEAPON,
    restriction: Restrictions.Clothing,
    stackSize: 1,
    decayRate: 0.5,
    weight: 2.5,
    useEvent: 'inventory:client:toggle_weapon',
    weaponHash: GetHashKey('WEAPON_MELEE_LANTERN'),
    weaponType: WeaponType.NO_AMMO,
  },
  [GetHashKey('PV_MELEE_DAVY_LANTERN')]: {
    identifier: GetHashKey('PV_MELEE_DAVY_LANTERN'),
    image: 'lantern_davy',
    name: 'Davy Lantern',
    flags: ItemFlags.WEAPON,
    restriction: Restrictions.Clothing,
    stackSize: 1,
    decayRate: 0.5,
    weight: 2.5,
    useEvent: 'inventory:client:toggle_weapon',
    weaponHash: GetHashKey('WEAPON_MELEE_DAVY_LANTERN'),
    weaponType: WeaponType.NO_AMMO,
  },
  [GetHashKey('PV_MELEE_LANTERN_ELECTRIC')]: {
    identifier: GetHashKey('PV_MELEE_LANTERN_ELECTRIC'),
    image: 'lantern_electric',
    name: 'Electric Lantern',
    flags: ItemFlags.WEAPON,
    restriction: Restrictions.Clothing,
    stackSize: 1,
    decayRate: 0.5,
    weight: 2.5,
    useEvent: 'inventory:client:toggle_weapon',
    weaponHash: GetHashKey('WEAPON_MELEE_LANTERN_ELECTRIC'),
    weaponType: WeaponType.NO_AMMO,
  },
  /**
   * Thrown
   */
  [GetHashKey('PV_THROWN_DYNAMITE')]: {
    identifier: GetHashKey('PV_THROWN_DYNAMITE'),
    image: 'dynamite',
    name: 'Dynamite',
    flags: ItemFlags.AMMO,
    restriction: Restrictions.Ammo + Restrictions.Small,
    stackSize: 6,
    weight: 1,
    useEvent: 'inventory:client:toggle_thrown',
    weaponHash: GetHashKey('WEAPON_THROWN_DYNAMITE'),
    weaponType: WeaponType.THROWN,
    ammoHash: GetHashKey('AMMO_DYNAMITE'),
  },
  [GetHashKey('PV_THROWN_MOLOTOV')]: {
    identifier: GetHashKey('PV_THROWN_MOLOTOV'),
    image: 'molotov',
    name: 'Molotov',
    flags: ItemFlags.AMMO,
    restriction: Restrictions.Ammo + Restrictions.Small,
    stackSize: 3,
    weight: 1,
    useEvent: 'inventory:client:toggle_thrown',
    weaponHash: GetHashKey('WEAPON_THROWN_MOLOTOV'),
    weaponType: WeaponType.THROWN,
    ammoHash: GetHashKey('AMMO_MOLOTOV'),
  },
  /**
   * Rifles
   */
  [GetHashKey('PV_SNIPERRIFLE_CARCANO')]: {
    identifier: GetHashKey('PV_SNIPERRIFLE_CARCANO'),
    image: 'sniperrifle-carcano',
    name: 'Carcano Rifle',
    flags: ItemFlags.WEAPON,
    restriction: Restrictions.None,
    stackSize: 1,
    decayRate: 0.5,
    weight: 2.4,
    useEvent: 'inventory:client:toggle_weapon',
    weaponHash: GetHashKey('WEAPON_SNIPERRIFLE_CARCANO'),
    weaponType: WeaponType.REQUIRES_AMMO,
  },
  [GetHashKey('PV_AMMO_RIFLE')]: {
    identifier: GetHashKey('PV_AMMO_RIFLE'),
    image: 'ammo-rifle',
    name: 'Rifle Ammo',
    flags: ItemFlags.AMMO,
    restriction: Restrictions.Ammo + Restrictions.Small,
    stackSize: 20,
    weight: 0.01,
    useEvent: 'inventory:client:equip_ammo',
    ammoHash: GetHashKey('AMMO_RIFLE'),
    ammoAmount: 5,
  },
  /**
   * Varmint Rifles
   */
  [GetHashKey('PV_RIFLE_VARMINT')]: {
    identifier: GetHashKey('PV_RIFLE_VARMINT'),
    image: 'rifle-varmint',
    name: 'Varmint Rifle',
    flags: ItemFlags.WEAPON,
    restriction: Restrictions.None,
    stackSize: 1,
    decayRate: 0.5,
    weight: 2.4,
    useEvent: 'inventory:client:toggle_weapon',
    weaponHash: GetHashKey('WEAPON_RIFLE_VARMINT'),
    weaponType: WeaponType.REQUIRES_AMMO,
  },
  [GetHashKey('PV_AMMO_RIFLE_VARMINT')]: {
    identifier: GetHashKey('PV_AMMO_RIFLE_VARMINT'),
    image: 'ammo-rifle-varmint',
    name: 'Varmint Rifle Ammo',
    flags: ItemFlags.AMMO,
    restriction: Restrictions.Ammo + Restrictions.Small,
    stackSize: 20,
    weight: 0.01,
    useEvent: 'inventory:client:equip_ammo',
    ammoHash: GetHashKey('AMMO_RIFLE_VARMINT'),
    ammoAmount: 5,
  },
  /**
   * Pistols
   */
  [GetHashKey('PV_PISTOL_SEMIAUTO')]: {
    identifier: GetHashKey('PV_PISTOL_SEMIAUTO'),
    image: 'pistol-semiauto',
    name: 'Semi-Auto Pistol',
    flags: ItemFlags.WEAPON,
    restriction: Restrictions.None,
    stackSize: 1,
    decayRate: 0.5,
    weight: 1.2,
    useEvent: 'inventory:client:toggle_weapon',
    weaponHash: GetHashKey('WEAPON_PISTOL_SEMIAUTO'),
    weaponType: WeaponType.REQUIRES_AMMO,
  },
  [GetHashKey('PV_PISTOL_VOLCANIC')]: {
    identifier: GetHashKey('PV_PISTOL_VOLCANIC'),
    image: 'pistol-volcanic',
    name: 'Volcanic Pistol',
    flags: ItemFlags.WEAPON,
    restriction: Restrictions.None,
    stackSize: 1,
    decayRate: 0.5,
    weight: 1.3,
    useEvent: 'inventory:client:toggle_weapon',
    weaponHash: GetHashKey('WEAPON_PISTOL_VOLCANIC'),
    weaponType: WeaponType.REQUIRES_AMMO,
  },
  [GetHashKey('PV_AMMO_PISTOL')]: {
    identifier: GetHashKey('PV_AMMO_PISTOL'),
    image: 'ammo-pistol',
    name: 'Pistol Ammo',
    flags: ItemFlags.AMMO,
    restriction: Restrictions.Ammo + Restrictions.Small,
    stackSize: 20,
    weight: 0.01,
    useEvent: 'inventory:client:equip_ammo',
    ammoHash: GetHashKey('AMMO_PISTOL'),
    ammoAmount: 5,
  },
  /**
   * Revolvers
   */
  [GetHashKey('PV_REVOLVER_CATTLEMAN')]: {
    identifier: GetHashKey('PV_REVOLVER_CATTLEMAN'),
    image: 'revolver-cattleman',
    name: 'Cattleman Revolver',
    flags: ItemFlags.WEAPON,
    restriction: Restrictions.None,
    stackSize: 1,
    decayRate: 0.5,
    weight: 1.3,
    useEvent: 'inventory:client:toggle_weapon',
    weaponHash: GetHashKey('WEAPON_REVOLVER_CATTLEMAN'),
    weaponType: WeaponType.REQUIRES_AMMO,
  },
  [GetHashKey('PV_REVOLVER_SCHOFIELD')]: {
    identifier: GetHashKey('PV_REVOLVER_SCHOFIELD'),
    image: 'revolver-schofield',
    name: 'Schofield Revolver',
    flags: ItemFlags.WEAPON,
    restriction: Restrictions.None,
    stackSize: 1,
    decayRate: 0.5,
    weight: 1.3,
    useEvent: 'inventory:client:toggle_weapon',
    weaponHash: GetHashKey('WEAPON_REVOLVER_SCHOFIELD'),
    weaponType: WeaponType.REQUIRES_AMMO,
  },
  [GetHashKey('PV_AMMO_REVOLVER')]: {
    identifier: GetHashKey('PV_AMMO_REVOLVER'),
    image: 'ammo-revolver',
    name: 'Revolver Ammo',
    flags: ItemFlags.AMMO,
    restriction: Restrictions.Ammo + Restrictions.Small,
    stackSize: 20,
    weight: 0.01,
    useEvent: 'inventory:client:equip_ammo',
    ammoHash: GetHashKey('AMMO_REVOLVER'),
    ammoAmount: 5,
  },
  /**
   * Repeaters
   */
  [GetHashKey('PV_REPEATER_CARBINE')]: {
    identifier: GetHashKey('PV_REPEATER_CARBINE'),
    image: 'repeater-carbine',
    name: 'Carbine Repeater',
    flags: ItemFlags.WEAPON,
    restriction: Restrictions.None,
    stackSize: 1,
    decayRate: 0.5,
    weight: 2.1,
    useEvent: 'inventory:client:toggle_weapon',
    weaponHash: GetHashKey('WEAPON_REPEATER_CARBINE'),
    weaponType: WeaponType.REQUIRES_AMMO,
  },
  [GetHashKey('PV_AMMO_REPEATER')]: {
    identifier: GetHashKey('PV_AMMO_REPEATER'),
    image: 'ammo-repeater',
    name: 'Repeater Ammo',
    flags: ItemFlags.AMMO,
    restriction: Restrictions.Ammo + Restrictions.Small,
    stackSize: 20,
    weight: 0.01,
    useEvent: 'inventory:client:equip_ammo',
    ammoHash: GetHashKey('AMMO_REPEATER'),
    ammoAmount: 5,
  },
  /**
   * Shotguns
   */
  [GetHashKey('PV_SHOTGUN_PUMP')]: {
    identifier: GetHashKey('PV_SHOTGUN_PUMP'),
    image: 'shotgun-pump',
    name: 'Pump Action Shotgun',
    flags: ItemFlags.WEAPON,
    restriction: Restrictions.None,
    stackSize: 1,
    decayRate: 0.5,
    weight: 1.8,
    useEvent: 'inventory:client:toggle_weapon',
    weaponHash: GetHashKey('WEAPON_SHOTGUN_PUMP'),
    weaponType: WeaponType.REQUIRES_AMMO,
  },
  [GetHashKey('PV_SHOTGUN_DOUBLEBARREL')]: {
    identifier: GetHashKey('PV_SHOTGUN_DOUBLEBARREL'),
    image: 'shotgun-doublebarrel',
    name: 'Double Barrel Shotgun',
    flags: ItemFlags.WEAPON,
    restriction: Restrictions.None,
    stackSize: 1,
    decayRate: 0.5,
    weight: 1.8,
    useEvent: 'inventory:client:toggle_weapon',
    weaponHash: GetHashKey('WEAPON_SHOTGUN_DOUBLEBARREL'),
    weaponType: WeaponType.REQUIRES_AMMO,
  },
  [GetHashKey('PV_SHOTGUN_REPEATING') >>> 0]: {
    identifier: GetHashKey('PV_SHOTGUN_REPEATING') >>> 0,
    image: 'shotgun-repeating',
    name: 'Repeating Shotgun',
    flags: ItemFlags.WEAPON,
    restriction: Restrictions.None,
    stackSize: 1,
    decayRate: 0.5,
    weight: 1.8,
    useEvent: 'inventory:client:toggle_weapon',
    weaponHash: GetHashKey('WEAPON_SHOTGUN_REPEATING'),
    weaponType: WeaponType.REQUIRES_AMMO,
  },
  [GetHashKey('PV_SHOTGUN_SEMIAUTO')]: {
    identifier: GetHashKey('PV_SHOTGUN_SEMIAUTO'),
    image: 'shotgun-semiauto',
    name: 'Semi-Auto Shotgun',
    flags: ItemFlags.WEAPON,
    restriction: Restrictions.None,
    stackSize: 1,
    decayRate: 0.5,
    weight: 1.8,
    useEvent: 'inventory:client:toggle_weapon',
    weaponHash: GetHashKey('WEAPON_SHOTGUN_SEMIAUTO'),
    weaponType: WeaponType.REQUIRES_AMMO,
  },
  [GetHashKey('PV_SHOTGUN_SAWEDOFF')]: {
    identifier: GetHashKey('PV_SHOTGUN_SAWEDOFF'),
    image: 'shotgun-sawedoff',
    name: 'Sawed-Off Shotgun',
    flags: ItemFlags.WEAPON,
    restriction: Restrictions.None,
    stackSize: 1,
    decayRate: 0.5,
    weight: 1.3,
    useEvent: 'inventory:client:toggle_weapon',
    weaponHash: GetHashKey('WEAPON_SHOTGUN_SAWEDOFF'),
    weaponType: WeaponType.REQUIRES_AMMO,
  },
  [GetHashKey('PV_AMMO_SHOTGUN')]: {
    identifier: GetHashKey('PV_AMMO_SHOTGUN'),
    image: 'ammo-shotgun',
    name: 'Shotgun Ammo',
    flags: ItemFlags.AMMO,
    restriction: Restrictions.Ammo + Restrictions.Small,
    stackSize: 20,
    weight: 0.01,
    useEvent: 'inventory:client:equip_ammo',
    ammoHash: GetHashKey('AMMO_SHOTGUN'),
    ammoAmount: 5,
  },
  /**
   * Fishing
   */
  [GetHashKey('PV_FISHINGROD')]: {
    identifier: GetHashKey('PV_FISHINGROD'),
    image: 'fishingrod',
    name: 'Fishing Rod',
    flags: ItemFlags.WEAPON,
    restriction: Restrictions.None,
    stackSize: 1,
    decayRate: 0.5,
    weight: 1.3,
    useEvent: 'inventory:client:toggle_weapon',
    weaponHash: GetHashKey('WEAPON_FISHINGROD'),
    weaponType: WeaponType.NO_AMMO,
    maxDurability: 100,
  },
  [GetHashKey('PV_BAIT_WORM')]: {
    identifier: GetHashKey('PV_BAIT_WORM'),
    image: 'bait-worm',
    name: 'Bait Worm',
    flags: ItemFlags.AMMO,
    restriction: Restrictions.Ammo + Restrictions.Small,
    stackSize: 10,
    weight: 0.1,
    useEvent: 'fishing:client:use_bait',
    bait: 'P_BAITWORM01X',
    baitHash: GetHashKey('P_BAITWORM01X'),
  },
  [GetHashKey('PV_BAIT_BREAD')]: {
    identifier: GetHashKey('PV_BAIT_BREAD'),
    image: 'bait-bread',
    name: 'Bait Bread',
    flags: ItemFlags.AMMO,
    restriction: Restrictions.Ammo + Restrictions.Small,
    stackSize: 10,
    weight: 0.1,
    useEvent: 'fishing:client:use_bait',
    bait: 'P_BAITBREAD01X',
    baitHash: GetHashKey('P_BAITBREAD01X'),
  },
  [GetHashKey('PV_BAIT_CHEESE')]: {
    identifier: GetHashKey('PV_BAIT_CHEESE'),
    image: 'bait-Cheese',
    name: 'Bait Cheese',
    flags: ItemFlags.AMMO,
    restriction: Restrictions.Ammo + Restrictions.Small,
    stackSize: 10,
    weight: 0.1,
    useEvent: 'fishing:client:use_bait',
    bait: 'P_BAITCHEESE01X',
    baitHash: GetHashKey('P_BAITCHEESE01X'),
  },
  [GetHashKey('PV_BAIT_CORN')]: {
    identifier: GetHashKey('PV_BAIT_CORN'),
    image: 'bait-corn',
    name: 'Bait Corn',
    flags: ItemFlags.AMMO,
    restriction: Restrictions.Ammo + Restrictions.Small,
    stackSize: 10,
    weight: 0.1,
    useEvent: 'fishing:client:use_bait',
    bait: 'P_BAITCORN01X',
    baitHash: GetHashKey('P_BAITCORN01X'),
  },
  [GetHashKey('PV_BAIT_CRAWFISH')]: {
    identifier: GetHashKey('PV_BAIT_CRAWFISH'),
    image: 'bait-crawfish',
    name: 'Bait Crawfish',
    flags: ItemFlags.AMMO,
    restriction: Restrictions.Ammo + Restrictions.Small,
    stackSize: 10,
    weight: 0.1,
    useEvent: 'fishing:client:use_bait',
    bait: 'P_BAITCRAWFISH01X',
    baitHash: GetHashKey('P_BAITCRAWFISH01X'),
  },
  [GetHashKey('PV_BAIT_CRICKET')]: {
    identifier: GetHashKey('PV_BAIT_CRICKET'),
    image: 'bait-cricket',
    name: 'Bait Cricket',
    flags: ItemFlags.AMMO,
    restriction: Restrictions.Ammo + Restrictions.Small,
    stackSize: 10,
    weight: 0.1,
    useEvent: 'fishing:client:use_bait',
    bait: 'P_BAITCRICKET01X',
    baitHash: GetHashKey('P_BAITCRICKET01X'),
  },
  [GetHashKey('PV_BASS')]: {
    identifier: GetHashKey('PV_BASS'),
    image: 'bass',
    name: 'Bass',
    flags: ItemFlags.MATERIAL + ItemFlags.CARCASS,
    restriction: Restrictions.Food,
    stackSize: 1,
    decayRate: 0.2,
    weight: 1,
  },
  [GetHashKey('PV_RAW_MEAT')]: {
    identifier: GetHashKey('PV_RAW_MEAT'),
    image: 'raw-meat',
    name: 'Raw Meat',
    flags: ItemFlags.MATERIAL + ItemFlags.CARCASS,
    restriction: Restrictions.Food,
    stackSize: 1,
    decayRate: 0.2,
    weight: 1,
    maxLife: Days(1),
  },
  [GetHashKey('PV_COOKED_MEAT')]: {
    identifier: GetHashKey('PV_COOKED_MEAT'),
    image: 'cooked-meat',
    name: 'Cooked Meat',
    flags: ItemFlags.MATERIAL + ItemFlags.CARCASS,
    restriction: Restrictions.Food,
    stackSize: 1,
    decayRate: 0.2,
    weight: 1,
    maxLife: Days(7),
  },
  [GetHashKey('PV_DOOR_KEY')]: {
    identifier: GetHashKey('PV_DOOR_KEY'),
    image: 'door-key',
    name: 'Door Key',
    flags: ItemFlags.KEY,
    restriction: Restrictions.None,
    stackSize: 1,
    weight: 0.1,
    useEvent: 'doors:client:toggle_door',
    maxDurability: 100,
  },
  [GetHashKey('PV_CLOTHING')]: {
    identifier: GetHashKey('PV_CLOTHING'),
    image: 'missing',
    name: 'Clothing',
    flags: ItemFlags.CLOTHING,
    restriction: Restrictions.Clothing,
    stackSize: 1,
    weight: 2,
  },
};

export default PVItems;

/**

 {
   shopItem: 'CLOTHING_ITEM_M_HAT_006_TINT_005', // 1253035524
   category: 'HATS', // -1725579161
   palette: 'metaped_tint_horse_leather', //-1952348042
   tint0: 107,
   tint1: 132,
   tint2: 255,
 }

[
 61606861,
 -2045421226,
 1253035524,
 2036592873,
 879214843,
 2142227305,
 -45967399,
 1707193846,
 -457866027,
 -2003481241,
 -251978256,
 383947425,
 46507404,
 495640017
]

 */
