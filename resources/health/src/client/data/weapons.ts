export enum DamageType {
  DEFAULT = 1,
  FALL = 2,
  BLUNT = 4,
  SHARP = 8,
  GUN = 16,
  FIRE = 32,
  EXPLOSIVE = 64,
  POISON = 128,
}

export interface EffectiveRange {
  min: number;
  max: number;
  falloff: number;
  minModifier: number;
}

export interface WeaponStats {
  name: string;
  modifier: number;
  damageType: DamageType;
  effectiveRange?: EffectiveRange;
}

export const weapons: Record<string, WeaponStats> = {
  DEFAULT: {
    name: 'DEFAULT',
    modifier: 1.0,
    damageType: DamageType.DEFAULT,
  },
  [GetHashKey('WEAPON_ALLIGATOR')]: {
    name: 'WEAPON_ALLIGATOR',
    modifier: 20.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_ANIMAL')]: {
    name: 'WEAPON_ANIMAL',
    modifier: 2.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_BADGER')]: {
    name: 'WEAPON_BADGER',
    modifier: 0.5,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_BEAR')]: {
    name: 'WEAPON_BEAR',
    modifier: 3.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_BEAVER')]: {
    name: 'WEAPON_BEAVER',
    modifier: 0.5,
    damageType: DamageType.SHARP,
  },
  // [GetHashKey('WEAPON_BLEEDING')]: 'WEAPON_BLEEDING',
  [GetHashKey('WEAPON_BOW')]: {
    name: 'WEAPON_BOW',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_BOW_CHARLES')]: {
    name: 'WEAPON_BOW_CHARLES',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_BOW_IMPROVED')]: {
    name: 'WEAPON_BOW_IMPROVED',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_COUGAR')]: {
    name: 'WEAPON_COUGAR',
    modifier: 3.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_COYOTE')]: {
    name: 'WEAPON_COYOTE',
    modifier: 2.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_DEER')]: {
    name: 'WEAPON_DEER',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_DROWNING')]: {
    name: 'WEAPON_DROWNING',
    modifier: 5.0,
    damageType: DamageType.DEFAULT,
  },
  [GetHashKey('WEAPON_DROWNING_IN_VEHICLE')]: {
    name: 'WEAPON_DROWNING_IN_VEHICLE',
    modifier: 5.0,
    damageType: DamageType.DEFAULT,
  },
  [GetHashKey('WEAPON_EXPLOSION')]: {
    name: 'WEAPON_EXPLOSION',
    modifier: 10.0,
    damageType: DamageType.EXPLOSIVE,
  },
  // [GetHashKey('WEAPON_FALL')]: {
  //     name: 'WEAPON_FALL',
  //     modifier: 1.0,
  //     damageType: DamageType.FALL,
  // },
  [GetHashKey('WEAPON_FIRE')]: {
    name: 'WEAPON_FIRE',
    modifier: 2.0,
    damageType: DamageType.FIRE,
  },
  [GetHashKey('WEAPON_FOX')]: { name: 'WEAPON_FOX', modifier: 1.0, damageType: DamageType.SHARP },
  [GetHashKey('WEAPON_HORSE')]: { name: 'WEAPON_HORSE', modifier: 5.0, damageType: DamageType.BLUNT },
  [GetHashKey('WEAPON_LASSO')]: { name: 'WEAPON_LASSO', modifier: 0, damageType: DamageType.DEFAULT },
  [GetHashKey('WEAPON_LASSO_REINFORCED')]: {
    name: 'WEAPON_LASSO_REINFORCED',
    modifier: 0,
    damageType: DamageType.DEFAULT,
  },
  [GetHashKey('WEAPON_MACHINERY')]: { name: 'WEAPON_MACHINERY', modifier: 1.0, damageType: DamageType.DEFAULT },
  [GetHashKey('WEAPON_MELEE_ANCIENT_HATCHET')]: {
    name: 'WEAPON_MELEE_ANCIENT_HATCHET',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_MELEE_BROKEN_SWORD')]: {
    name: 'WEAPON_MELEE_BROKEN_SWORD',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_MELEE_CLEAVER')]: { name: 'WEAPON_MELEE_CLEAVER', modifier: 1.0, damageType: DamageType.SHARP },
  [GetHashKey('WEAPON_MELEE_DAVY_LANTERN')]: {
    name: 'WEAPON_MELEE_DAVY_LANTERN',
    modifier: 1.0,
    damageType: DamageType.FIRE,
  },
  [GetHashKey('WEAPON_MELEE_HAMMER')]: { name: 'WEAPON_MELEE_HAMMER', modifier: 2.0, damageType: DamageType.BLUNT },
  [GetHashKey('WEAPON_MELEE_HATCHET')]: { name: 'WEAPON_MELEE_HATCHET', modifier: 1.0, damageType: DamageType.SHARP },
  [GetHashKey('WEAPON_MELEE_HATCHET_DOUBLE_BIT')]: {
    name: 'WEAPON_MELEE_HATCHET_DOUBLE_BIT',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_MELEE_HATCHET_DOUBLE_BIT_RUSTED')]: {
    name: 'WEAPON_MELEE_HATCHET_DOUBLE_BIT_RUSTED',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_MELEE_HATCHET_HEWING')]: {
    name: 'WEAPON_MELEE_HATCHET_HEWING',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_MELEE_HATCHET_HUNTER')]: {
    name: 'WEAPON_MELEE_HATCHET_HUNTER',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_MELEE_HATCHET_HUNTER_RUSTED')]: {
    name: 'WEAPON_MELEE_HATCHET_HUNTER_RUSTED',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_MELEE_HATCHET_MELEEONLY')]: {
    name: 'WEAPON_MELEE_HATCHET_MELEEONLY',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_MELEE_HATCHET_VIKING')]: {
    name: 'WEAPON_MELEE_HATCHET_VIKING',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_MELEE_KNIFE')]: { name: 'WEAPON_MELEE_KNIFE', modifier: 1.0, damageType: DamageType.SHARP },
  [GetHashKey('WEAPON_MELEE_KNIFE_BEAR')]: {
    name: 'WEAPON_MELEE_KNIFE_BEAR',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_MELEE_KNIFE_BILL')]: {
    name: 'WEAPON_MELEE_KNIFE_BILL',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_MELEE_KNIFE_CHARLES')]: {
    name: 'WEAPON_MELEE_KNIFE_CHARLES',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_MELEE_KNIFE_CIVIL_WAR')]: {
    name: 'WEAPON_MELEE_KNIFE_CIVIL_WAR',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_MELEE_KNIFE_DUTCH')]: {
    name: 'WEAPON_MELEE_KNIFE_DUTCH',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_MELEE_KNIFE_HOSEA')]: {
    name: 'WEAPON_MELEE_KNIFE_HOSEA',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_MELEE_KNIFE_JAVIER')]: {
    name: 'WEAPON_MELEE_KNIFE_JAVIER',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_MELEE_KNIFE_JAWBONE')]: {
    name: 'WEAPON_MELEE_KNIFE_JAWBONE',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_MELEE_KNIFE_JOHN')]: {
    name: 'WEAPON_MELEE_KNIFE_JOHN',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_MELEE_KNIFE_KIERAN')]: {
    name: 'WEAPON_MELEE_KNIFE_KIERAN',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_MELEE_KNIFE_LENNY')]: {
    name: 'WEAPON_MELEE_KNIFE_LENNY',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_MELEE_KNIFE_MICAH')]: {
    name: 'WEAPON_MELEE_KNIFE_MICAH',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_MELEE_KNIFE_MINER')]: {
    name: 'WEAPON_MELEE_KNIFE_MINER',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_MELEE_KNIFE_SADIE')]: {
    name: 'WEAPON_MELEE_KNIFE_SADIE',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_MELEE_KNIFE_SEAN')]: {
    name: 'WEAPON_MELEE_KNIFE_SEAN',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_MELEE_KNIFE_TRADER')]: {
    name: 'WEAPON_MELEE_KNIFE_TRADER',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_MELEE_KNIFE_UNCLE')]: {
    name: 'WEAPON_MELEE_KNIFE_UNCLE',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_MELEE_KNIFE_VAMPIRE')]: {
    name: 'WEAPON_MELEE_KNIFE_VAMPIRE',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_MELEE_LANTERN')]: { name: 'WEAPON_MELEE_LANTERN', modifier: 1.0, damageType: DamageType.FIRE },
  [GetHashKey('WEAPON_MELEE_LANTERN_ELECTRIC')]: {
    name: 'WEAPON_MELEE_LANTERN_ELECTRIC',
    modifier: 1.0,
    damageType: DamageType.EXPLOSIVE,
  },
  [GetHashKey('WEAPON_MELEE_MACHETE')]: { name: 'WEAPON_MELEE_MACHETE', modifier: 1.0, damageType: DamageType.SHARP },
  [GetHashKey('WEAPON_MELEE_MACHETE_COLLECTOR')]: {
    name: 'WEAPON_MELEE_MACHETE_COLLECTOR',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_MELEE_TORCH')]: { name: 'WEAPON_MELEE_TORCH', modifier: 1.0, damageType: DamageType.FIRE },
  [GetHashKey('WEAPON_MELEE_TORCH_CROWD')]: {
    name: 'WEAPON_MELEE_TORCH_CROWD',
    modifier: 1.0,
    damageType: DamageType.FIRE,
  },
  [GetHashKey('WEAPON_MOONSHINEJUG')]: { name: 'WEAPON_MOONSHINEJUG', modifier: 1.0, damageType: DamageType.FIRE },
  [GetHashKey('WEAPON_MOONSHINEJUG_MP')]: {
    name: 'WEAPON_MOONSHINEJUG_MP',
    modifier: 1.0,
    damageType: DamageType.FIRE,
  },
  [GetHashKey('WEAPON_MUSKRAT')]: { name: 'WEAPON_MUSKRAT', modifier: 1.0, damageType: DamageType.SHARP },
  [GetHashKey('WEAPON_PANTHER')]: { name: 'WEAPON_PANTHER', modifier: 1.0, damageType: DamageType.SHARP },
  [GetHashKey('WEAPON_PISTOL_M1899')]: { name: 'WEAPON_PISTOL_M1899', modifier: 5.0, damageType: DamageType.GUN },
  [GetHashKey('WEAPON_PISTOL_MAUSER')]: { name: 'WEAPON_PISTOL_MAUSER', modifier: 5.0, damageType: DamageType.GUN },
  [GetHashKey('WEAPON_PISTOL_MAUSER_DRUNK')]: {
    name: 'WEAPON_PISTOL_MAUSER_DRUNK',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_PISTOL_SEMIAUTO')]: { name: 'WEAPON_PISTOL_SEMIAUTO', modifier: 5.0, damageType: DamageType.GUN },
  [GetHashKey('WEAPON_PISTOL_VOLCANIC')]: { name: 'WEAPON_PISTOL_VOLCANIC', modifier: 5.0, damageType: DamageType.GUN },
  [GetHashKey('WEAPON_POISON')]: { name: 'WEAPON_POISON', modifier: 5.0, damageType: DamageType.POISON },
  [GetHashKey('WEAPON_RACCOON')]: { name: 'WEAPON_RACCOON', modifier: 5.0, damageType: DamageType.SHARP },
  [GetHashKey('WEAPON_RAMMED_BY_CAR')]: { name: 'WEAPON_RAMMED_BY_CAR', modifier: 5.0, damageType: DamageType.BLUNT },
  [GetHashKey('WEAPON_REPEATER_CARBINE')]: {
    name: 'WEAPON_REPEATER_CARBINE',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REPEATER_CARBINE_SADIE')]: {
    name: 'WEAPON_REPEATER_CARBINE_SADIE',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REPEATER_EVANS')]: { name: 'WEAPON_REPEATER_EVANS', modifier: 5.0, damageType: DamageType.GUN },
  [GetHashKey('WEAPON_REPEATER_HENRY')]: { name: 'WEAPON_REPEATER_HENRY', modifier: 5.0, damageType: DamageType.GUN },
  [GetHashKey('WEAPON_REPEATER_WINCHESTER')]: {
    name: 'WEAPON_REPEATER_WINCHESTER',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REPEATER_WINCHESTER_JOHN')]: {
    name: 'WEAPON_REPEATER_WINCHESTER_JOHN',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REVOLVER_CATTLEMAN')]: {
    name: 'WEAPON_REVOLVER_CATTLEMAN',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REVOLVER_CATTLEMAN_DUALWIELD')]: {
    name: 'WEAPON_REVOLVER_CATTLEMAN_DUALWIELD',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REVOLVER_CATTLEMAN_HOSEA')]: {
    name: 'WEAPON_REVOLVER_CATTLEMAN_HOSEA',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REVOLVER_CATTLEMAN_HOSEA_DUALWIELD')]: {
    name: 'WEAPON_REVOLVER_CATTLEMAN_HOSEA_DUALWIELD',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REVOLVER_CATTLEMAN_JOHN')]: {
    name: 'WEAPON_REVOLVER_CATTLEMAN_JOHN',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REVOLVER_CATTLEMAN_KIERAN')]: {
    name: 'WEAPON_REVOLVER_CATTLEMAN_KIERAN',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REVOLVER_CATTLEMAN_LENNY')]: {
    name: 'WEAPON_REVOLVER_CATTLEMAN_LENNY',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REVOLVER_CATTLEMAN_MEXICAN')]: {
    name: 'WEAPON_REVOLVER_CATTLEMAN_MEXICAN',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REVOLVER_CATTLEMAN_PIG')]: {
    name: 'WEAPON_REVOLVER_CATTLEMAN_PIG',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REVOLVER_CATTLEMAN_SADIE')]: {
    name: 'WEAPON_REVOLVER_CATTLEMAN_SADIE',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REVOLVER_CATTLEMAN_SADIE_DUALWIELD')]: {
    name: 'WEAPON_REVOLVER_CATTLEMAN_SADIE_DUALWIELD',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REVOLVER_CATTLEMAN_SEAN')]: {
    name: 'WEAPON_REVOLVER_CATTLEMAN_SEAN',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REVOLVER_DOUBLEACTION')]: {
    name: 'WEAPON_REVOLVER_DOUBLEACTION',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REVOLVER_DOUBLEACTION_DUALWIELD')]: {
    name: 'WEAPON_REVOLVER_DOUBLEACTION_DUALWIELD',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REVOLVER_DOUBLEACTION_EXOTIC')]: {
    name: 'WEAPON_REVOLVER_DOUBLEACTION_EXOTIC',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REVOLVER_DOUBLEACTION_GAMBLER')]: {
    name: 'WEAPON_REVOLVER_DOUBLEACTION_GAMBLER',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REVOLVER_DOUBLEACTION_JAVIER')]: {
    name: 'WEAPON_REVOLVER_DOUBLEACTION_JAVIER',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REVOLVER_DOUBLEACTION_MICAH')]: {
    name: 'WEAPON_REVOLVER_DOUBLEACTION_MICAH',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REVOLVER_DOUBLEACTION_MICAH_DUALWIELD')]: {
    name: 'WEAPON_REVOLVER_DOUBLEACTION_MICAH_DUALWIELD',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REVOLVER_LEMAT')]: { name: 'WEAPON_REVOLVER_LEMAT', modifier: 5.0, damageType: DamageType.GUN },
  [GetHashKey('WEAPON_REVOLVER_NAVY')]: { name: 'WEAPON_REVOLVER_NAVY', modifier: 5.0, damageType: DamageType.GUN },
  [GetHashKey('WEAPON_REVOLVER_NAVY_CROSSOVER')]: {
    name: 'WEAPON_REVOLVER_NAVY_CROSSOVER',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REVOLVER_SCHOFIELD')]: {
    name: 'WEAPON_REVOLVER_SCHOFIELD',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REVOLVER_SCHOFIELD_BILL')]: {
    name: 'WEAPON_REVOLVER_SCHOFIELD_BILL',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REVOLVER_SCHOFIELD_CALLOWAY')]: {
    name: 'WEAPON_REVOLVER_SCHOFIELD_CALLOWAY',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REVOLVER_SCHOFIELD_DUALWIELD')]: {
    name: 'WEAPON_REVOLVER_SCHOFIELD_DUALWIELD',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REVOLVER_SCHOFIELD_DUTCH')]: {
    name: 'WEAPON_REVOLVER_SCHOFIELD_DUTCH',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REVOLVER_SCHOFIELD_DUTCH_DUALWIELD')]: {
    name: 'WEAPON_REVOLVER_SCHOFIELD_DUTCH_DUALWIELD',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REVOLVER_SCHOFIELD_GOLDEN')]: {
    name: 'WEAPON_REVOLVER_SCHOFIELD_GOLDEN',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_REVOLVER_SCHOFIELD_UNCLE')]: {
    name: 'WEAPON_REVOLVER_SCHOFIELD_UNCLE',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_RIFLE_BOLTACTION')]: {
    name: 'WEAPON_RIFLE_BOLTACTION',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_RIFLE_BOLTACTION_BILL')]: {
    name: 'WEAPON_RIFLE_BOLTACTION_BILL',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_RIFLE_SPRINGFIELD')]: {
    name: 'WEAPON_RIFLE_SPRINGFIELD',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_RIFLE_VARMINT')]: { name: 'WEAPON_RIFLE_VARMINT', modifier: 5.0, damageType: DamageType.GUN },
  [GetHashKey('WEAPON_RUN_OVER_BY_CAR')]: {
    name: 'WEAPON_RUN_OVER_BY_CAR',
    modifier: 1.0,
    damageType: DamageType.BLUNT,
  },
  [GetHashKey('WEAPON_SHOTGUN_DOUBLEBARREL')]: {
    name: 'WEAPON_SHOTGUN_DOUBLEBARREL',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_SHOTGUN_DOUBLEBARREL_EXOTIC')]: {
    name: 'WEAPON_SHOTGUN_DOUBLEBARREL_EXOTIC',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_SHOTGUN_DOUBLEBARREL_UNCLE')]: {
    name: 'WEAPON_SHOTGUN_DOUBLEBARREL_UNCLE',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_SHOTGUN_PUMP')]: { name: 'WEAPON_SHOTGUN_PUMP', modifier: 5.0, damageType: DamageType.GUN },
  [GetHashKey('WEAPON_SHOTGUN_REPEATING')]: {
    name: 'WEAPON_SHOTGUN_REPEATING',
    modifier: 15.0,
    damageType: DamageType.GUN,
    effectiveRange: {
      min: 0.0,
      max: 1.0,
      falloff: 0.25,
      minModifier: 0.25,
    },
  },
  [GetHashKey('WEAPON_SHOTGUN_SAWEDOFF')]: {
    name: 'WEAPON_SHOTGUN_SAWEDOFF',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_SHOTGUN_SAWEDOFF_CHARLES')]: {
    name: 'WEAPON_SHOTGUN_SAWEDOFF_CHARLES',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_SHOTGUN_SEMIAUTO')]: {
    name: 'WEAPON_SHOTGUN_SEMIAUTO',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_SHOTGUN_SEMIAUTO_HOSEA')]: {
    name: 'WEAPON_SHOTGUN_SEMIAUTO_HOSEA',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_SNAKE')]: { name: 'WEAPON_SNAKE', modifier: 5.0, damageType: DamageType.SHARP },
  [GetHashKey('WEAPON_SNIPERRIFLE_CARCANO')]: {
    name: 'WEAPON_SNIPERRIFLE_CARCANO',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_SNIPERRIFLE_ROLLINGBLOCK')]: {
    name: 'WEAPON_SNIPERRIFLE_ROLLINGBLOCK',
    modifier: 25.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_SNIPERRIFLE_ROLLINGBLOCK_EXOTIC')]: {
    name: 'WEAPON_SNIPERRIFLE_ROLLINGBLOCK_EXOTIC',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_SNIPERRIFLE_ROLLINGBLOCK_LENNY')]: {
    name: 'WEAPON_SNIPERRIFLE_ROLLINGBLOCK_LENNY',
    modifier: 5.0,
    damageType: DamageType.GUN,
  },
  [GetHashKey('WEAPON_THROWN_BOLAS')]: { name: 'WEAPON_THROWN_BOLAS', modifier: 1.0, damageType: DamageType.DEFAULT },
  [GetHashKey('WEAPON_THROWN_DYNAMITE')]: {
    name: 'WEAPON_THROWN_DYNAMITE',
    modifier: 10.0,
    damageType: DamageType.EXPLOSIVE,
  },
  [GetHashKey('WEAPON_THROWN_MOLOTOV')]: { name: 'WEAPON_THROWN_MOLOTOV', modifier: 15.0, damageType: DamageType.FIRE },
  [GetHashKey('WEAPON_THROWN_POISONBOTTLE')]: {
    name: 'WEAPON_THROWN_POISONBOTTLE',
    modifier: 1.0,
    damageType: DamageType.POISON,
  },
  [GetHashKey('WEAPON_THROWN_THROWING_KNIVES')]: {
    name: 'WEAPON_THROWN_THROWING_KNIVES',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_THROWN_THROWING_KNIVES_JAVIER')]: {
    name: 'WEAPON_THROWN_THROWING_KNIVES_JAVIER',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_THROWN_TOMAHAWK')]: {
    name: 'WEAPON_THROWN_TOMAHAWK',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_THROWN_TOMAHAWK_ANCIENT')]: {
    name: 'WEAPON_THROWN_TOMAHAWK_ANCIENT',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_THROWN_TOMAHAWK_MELEEONLY')]: {
    name: 'WEAPON_THROWN_TOMAHAWK_MELEEONLY',
    modifier: 1.0,
    damageType: DamageType.SHARP,
  },
  [GetHashKey('WEAPON_TURRET_CANNON')]: {
    name: 'WEAPON_TURRET_CANNON',
    modifier: 10,
    damageType: DamageType.EXPLOSIVE,
  },
  [GetHashKey('WEAPON_TURRET_GATLING')]: { name: 'WEAPON_TURRET_GATLING', modifier: 1.0, damageType: DamageType.GUN },
  [GetHashKey('WEAPON_TURRET_MAXIM')]: { name: 'WEAPON_TURRET_MAXIM', modifier: 1.0, damageType: DamageType.GUN },
  [GetHashKey('WEAPON_TURRET_REVOLVING_CANNON')]: {
    name: 'WEAPON_TURRET_REVOLVING_CANNON',
    modifier: 10,
    damageType: DamageType.EXPLOSIVE,
  },
  [GetHashKey('WEAPON_UNARMED')]: { name: 'WEAPON_UNARMED', modifier: 1.0, damageType: DamageType.DEFAULT },
  [GetHashKey('WEAPON_WOLF')]: { name: 'WEAPON_WOLF', modifier: 1.0, damageType: DamageType.SHARP },
  [GetHashKey('WEAPON_WOLF_MEDIUM')]: { name: 'WEAPON_WOLF_MEDIUM', modifier: 1.0, damageType: DamageType.SHARP },
  [GetHashKey('WEAPON_WOLF_SMALL')]: { name: 'WEAPON_WOLF_SMALL', modifier: 1.0, damageType: DamageType.SHARP },
};
