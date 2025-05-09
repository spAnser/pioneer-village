/**
 * GET_ALLOW_DUAL_WIELD
 *
 * @param {number} ped
 * @return {boolean}
 */
declare function GetAllowDualWield(ped: Ped): boolean;

/**
 * GET_AMMO_IN_CLIP
 *
 * @param {number} ped
 * @param {number} weaponHash
 * @return {[boolean, number]}
 */
declare function GetAmmoInClip(ped: Ped, weaponHash: Hash): [boolean, number];

/**
 * GET_AMMO_IN_PED_WEAPON
 *
 * @param {number} ped
 * @param {number} weaponHash
 * @return {number}
 */
declare function GetAmmoInPedWeapon(ped: Ped, weaponHash: Hash): number;

/**
 * GET_BEST_PED_SHORTARM_GUID
 *
 * @param {number} ped
 * @param {DataView} outGuid
 * @param {boolean} p2
 * @param {boolean} p3
 * @return {void}
 */
declare function GetBestPedShortarmGuid(ped: Ped, outGUID: DataView, p2: boolean, p3: boolean): void;

/**
 * GET_BEST_PED_WEAPON
 *
 * @param {number} ped
 * @param {boolean} p1
 * @param {boolean} p2
 * @return {number}
 */
declare function GetBestPedWeapon(ped: Ped, p1: boolean, p2: boolean): number;

/**
 * GET_CURRENT_PED_VEHICLE_WEAPON
 *
 * @param {number} ped
 * @return {[boolean, number]}
 */
declare function GetCurrentPedVehicleWeapon(ped: Ped): [boolean, number];

/**
 * GET_CURRENT_PED_WEAPON
 * attachPoint: see SET_CURRENT_PED_WEAPON
 *
 * @param {number} ped
 * @param {boolean} p2
 * @param {number} attachPoint
 * @param {boolean} p4
 * @return {[boolean, number]}
 */
declare function GetCurrentPedWeapon(ped: Ped, p2: boolean, attachPoint: number, p4: boolean): [boolean, number];

/**
 * GET_CURRENT_PED_WEAPON_ENTITY_INDEX
 * Returns weaponObject, attachPoint: see SET_CURRENT_PED_WEAPON
 *
 * @param {number} ped
 * @param {number} attachPoint
 * @return {number}
 */
declare function GetCurrentPedWeaponEntityIndex(ped: Ped, attachPoint: number): Entity;

/**
 * GET_MAX_AMMO
 *
 * @param {number} ped
 * @param {number} weaponHash
 * @return {[boolean, number]}
 */
declare function GetMaxAmmo(ped: Ped, weaponHash: Hash): [boolean, number];

/**
 * GET_MAX_AMMO_IN_CLIP
 *
 * @param {number} ped
 * @param {number} weaponHash
 * @param {boolean} p2
 * @return {number}
 */
declare function GetMaxAmmoInClip(ped: Ped, weaponHash: Hash, p2: boolean): number;

/**
 * GET_PED_AMMO_BY_TYPE
 *
 * @param {number} ped
 * @param {number} ammoType
 * @return {number}
 */
declare function GetPedAmmoByType(ped: Ped, ammoType: Hash): number;

/**
 * GET_PED_AMMO_TYPE_FROM_WEAPON
 * Returns the current ammo type of the specified ped's specified weapon.
 *
 * @param {number} ped
 * @param {number} weaponHash
 * @return {number}
 */
declare function GetPedAmmoTypeFromWeapon(ped: Ped, weaponHash: Hash): number;

/**
 * GET_PED_BACKUP_WEAPON
 *
 * @param {number} ped
 * @param {boolean} p1
 * @return {number}
 */
declare function GetPedBackupWeapon(ped: Ped, p1: boolean): number;

/**
 * GET_PED_LAST_WEAPON_IMPACT_COORD
 *
 * @param {number} ped
 * @return {[boolean, Vector3]}
 */
declare function GetPedLastWeaponImpactCoord(ped: Ped): [boolean, Vector3];

/**
 * GET_PED_WEAPON_GUID_AT_ATTACH_POINT
 *
 * @param {number} ped
 * @param {number} attachPoint
 * @param {DataView} weaponGuid
 * @return {boolean}
 */
declare function GetPedWeaponGuidAtAttachPoint(ped: Ped, attachPoint: number, weaponGuid: DataView): boolean;

/**
 * GET_WEAPONTYPE_GROUP
 *
 * @param {number} weaponHash
 * @return {number}
 */
declare function GetWeapontypeGroup(weaponHash: Hash): number;

/**
 * GET_WEAPON_CLIP_SIZE
 *
 * @param {number} weaponHash
 * @return {number}
 */
declare function GetWeaponClipSize(weaponHash: Hash): number;

/**
 * GET_WEAPON_DEGRADATION
 * 0.0: good condition, 1.0: poor condition
 *
 * @param {number} weaponObject
 * @return {number}
 */
declare function GetWeaponDegradation(weaponObject: number): number;

/**
 * GET_WEAPON_PERMANENT_DEGRADATION
 * Related to rust of weapons
 *
 * @param {number} weaponObject
 * @return {number}
 */
declare function GetWeaponPermanentDegradation(weaponObject: number): number;

/**
 * GIVE_DELAYED_WEAPON_TO_PED
 * addReason: see _ADD_AMMO_TO_PED
 *
 * @param {number} ped
 * @param {number} weaponHash
 * @param {number} ammoCount
 * @param {boolean} p3
 * @param {number} addReason
 * @return {void}
 */
declare function GiveDelayedWeaponToPed(ped: Ped, weaponHash: Hash, ammoCount: number, p3: boolean, addReason: Hash): void;

/**
 * GIVE_WEAPON_TO_PED
 * Gives the ped the weapon.
 * List: https://github.com/femga/rdr3_discoveries/blob/master/weapons/weapons.lua
 * 
 * Params: p7 is 0.5f, and p8 is 1.0f. p11 and p12 are both 0 in R* Scripts
 * attachPoint: see SET_CURRENT_PED_WEAPON
 * addReason: see _ADD_AMMO_TO_PED
 * permanentDegradation: default 0.5, any higher than 0 it will automatically make the weapon worn, you can also adjust the value to change the weapons maximum cleanliness
 *
 * @param {number} ped
 * @param {number} weaponHash
 * @param {number} ammoCount
 * @param {boolean} bForceInHand
 * @param {boolean} bForceInHolster
 * @param {number} attachPoint
 * @param {boolean} bAllowMultipleCopies
 * @param {number} p7
 * @param {number} p8
 * @param {number} addReason
 * @param {boolean} bIgnoreUnlocks
 * @param {number} permanentDegradation
 * @param {boolean} p12
 * @return {number}
 */
declare function GiveWeaponToPed(ped: Ped, weaponHash: Hash, ammoCount: number, bForceInHand: boolean, bForceInHolster: boolean, attachPoint: number, bAllowMultipleCopies: boolean, p7: number, p8: number, addReason: Hash, bIgnoreUnlocks: boolean, permanentDegradation: number, p12: boolean): number;

/**
 * GIVE_WEAPON_TO_PED_WITH_OPTIONS
 *
 * @param {number} ped
 * @param {DataView} data
 * @param {DataView} outData
 * @return {boolean}
 */
declare function GiveWeaponToPedWithOptions(ped: Ped, data: DataView, outData: DataView): boolean;

/**
 * HAS_PED_GOT_WEAPON
 *
 * @param {number} ped
 * @param {number} weaponHash
 * @param {number} p2
 * @param {boolean} p3
 * @return {boolean}
 */
declare function HasPedGotWeapon(ped: Ped, weaponHash: Hash, p2: number, p3: boolean): boolean;

/**
 * HAS_WEAPON_GOT_WEAPON_COMPONENT
 *
 * @param {number} weapon
 * @param {number} addonHash
 * @return {boolean}
 */
declare function HasWeaponGotWeaponComponent(weapon: number, addonHash: Hash): boolean;

/**
 * HIDE_PED_WEAPON_FOR_SCRIPTED_CUTSCENE
 * Hides the ped's weapon during a cutscene.
 *
 * @param {number} ped
 * @param {boolean} toggle
 * @return {void}
 */
declare function HidePedWeaponForScriptedCutscene(ped: Ped, toggle: boolean): void;

/**
 * IS_PED_ARMED
 *
 * @param {number} ped
 * @param {number} flags
 * @return {boolean}
 */
declare function IsPedArmed(ped: Ped, flags: number): boolean;

/**
 * IS_PED_CARRYING_WEAPON
 *
 * @param {number} ped
 * @param {number} weaponHash
 * @return {boolean}
 */
declare function IsPedCarryingWeapon(ped: Ped, weaponHash: Hash): boolean;

/**
 * IS_PED_WEAPON_READY_TO_SHOOT
 *
 * @param {number} ped
 * @return {boolean}
 */
declare function IsPedWeaponReadyToShoot(ped: Ped): boolean;

/**
 * IS_WEAPON_A_GUN
 * Returns true if CWeaponInfoFlags::Flags::Gun is set.
 *
 * @param {number} weaponHash
 * @return {boolean}
 */
declare function IsWeaponAGun(weaponHash: Hash): boolean;

/**
 * IS_WEAPON_BOW
 *
 * @param {number} weaponHash
 * @return {boolean}
 */
declare function IsWeaponBow(weaponHash: Hash): boolean;

/**
 * IS_WEAPON_MELEE_WEAPON
 *
 * @param {number} weaponHash
 * @return {boolean}
 */
declare function IsWeaponMeleeWeapon(weaponHash: Hash): boolean;

/**
 * IS_WEAPON_PISTOL
 *
 * @param {number} weaponHash
 * @return {boolean}
 */
declare function IsWeaponPistol(weaponHash: Hash): boolean;

/**
 * IS_WEAPON_REPEATER
 *
 * @param {number} weaponHash
 * @return {boolean}
 */
declare function IsWeaponRepeater(weaponHash: Hash): boolean;

/**
 * IS_WEAPON_REVOLVER
 *
 * @param {number} weaponHash
 * @return {boolean}
 */
declare function IsWeaponRevolver(weaponHash: Hash): boolean;

/**
 * IS_WEAPON_RIFLE
 *
 * @param {number} weaponHash
 * @return {boolean}
 */
declare function IsWeaponRifle(weaponHash: Hash): boolean;

/**
 * IS_WEAPON_SHOTGUN
 *
 * @param {number} weaponHash
 * @return {boolean}
 */
declare function IsWeaponShotgun(weaponHash: Hash): boolean;

/**
 * IS_WEAPON_VALID
 *
 * @param {number} weaponHash
 * @return {boolean}
 */
declare function IsWeaponValid(weaponHash: Hash): boolean;

/**
 * MAKE_PED_DROP_WEAPON
 * Old name: _DROP_CURRENT_PED_WEAPON
 *
 * @param {number} ped
 * @param {boolean} p1
 * @param {number} attachPoint
 * @param {boolean} p3
 * @param {boolean} p4
 * @return {number}
 */
declare function MakePedDropWeapon(ped: Ped, p1: boolean, attachPoint: number, p3: boolean, p4: boolean): Entity;

/**
 * REMOVE_ALL_PED_WEAPONS
 *
 * @param {number} ped
 * @param {boolean} p1
 * @param {boolean} p2
 * @return {void}
 */
declare function RemoveAllPedWeapons(ped: Ped, p1: boolean, p2: boolean): void;

/**
 * REMOVE_WEAPON_COMPONENT_FROM_WEAPON_OBJECT
 *
 * @param {number} weaponObject
 * @param {number} component
 * @return {void}
 */
declare function RemoveWeaponComponentFromWeaponObject(weaponObject: number, component: Hash): void;

/**
 * REMOVE_WEAPON_FROM_PED
 * removeReason:
 * enum eRemoveItemReason : Hash
 * {
 *   REMOVE_REASON_CLIENT_PURGED = 0x4A4E94DC,
 *   REMOVE_REASON_COALESCE = 0x2ABE393E,
 *   REMOVE_REASON_DEBUG = 0xA07362E6,
 *   REMOVE_REASON_DEFAULT = 0xF77DE93D,
 *   REMOVE_REASON_DELETE_CHARACTER = 0x20AFBDE9,
 *   REMOVE_REASON_DROPPED = 0xEC7FB5D5,
 *   REMOVE_REASON_DUPLICATE = 0x19047132,
 *   REMOVE_REASON_GIFTED_INCORRECTLY = 0x9C4E3829,
 *   REMOVE_REASON_GIVEN = 0xAD5377D4,
 *   REMOVE_REASON_INSUFFICIENT_INVENTORY = 0x518D1AAE,
 *   REMOVE_REASON_ITEM_DOES_NOT_EXIST = 0xEAD5D889,
 *   REMOVE_REASON_LOADOUT = 0x1B94E3BA,
 *   REMOVE_REASON_SET_AMOUNT = 0x19D5CFA5,
 *   REMOVE_REASON_SOLD = 0x76C4B482,
 *   REMOVE_REASON_USED = 0x2188E0A3,
 *   REMOVE_REASON_USE_FAILED = 0x671F9EAD
 * };
 *
 * @param {number} ped
 * @param {number} weaponHash
 * @param {boolean} p2
 * @param {number} removeReason
 * @return {void}
 */
declare function RemoveWeaponFromPed(ped: Ped, weaponHash: Hash, p2: boolean, removeReason: Hash): void;

/**
 * SET_ALLOW_ANY_WEAPON_DROP
 *
 * @param {number} ped
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetAllowAnyWeaponDrop(ped: Ped, toggle: boolean): void;

/**
 * SET_AMMO_IN_CLIP
 *
 * @param {number} ped
 * @param {number} weaponHash
 * @param {number} ammo
 * @return {boolean}
 */
declare function SetAmmoInClip(ped: Ped, weaponHash: Hash, ammo: number): boolean;

/**
 * SET_CURRENT_PED_VEHICLE_WEAPON
 *
 * @param {number} ped
 * @param {number} weaponHash
 * @return {boolean}
 */
declare function SetCurrentPedVehicleWeapon(ped: Ped, weaponHash: Hash): boolean;

/**
 * SET_CURRENT_PED_WEAPON
 * attachPoint:
 * enum eWeaponAttachPoint
 * {
 *   WEAPON_ATTACH_POINT_INVALID = -1,
 *   WEAPON_ATTACH_POINT_HAND_PRIMARY = 0,
 *   WEAPON_ATTACH_POINT_HAND_SECONDARY = 1,
 *   WEAPON_ATTACH_POINT_PISTOL_R = 2,
 *   MAX_HAND_WEAPON_ATTACH_POINTS = 2,
 *   WEAPON_ATTACH_POINT_PISTOL_L = 3,
 *   WEAPON_ATTACH_POINT_KNIFE = 4,
 *   WEAPON_ATTACH_POINT_LASSO = 5,
 *   WEAPON_ATTACH_POINT_THROWER = 6,
 *   WEAPON_ATTACH_POINT_BOW = 7,
 *   WEAPON_ATTACH_POINT_BOW_ALTERNATE = 8,
 *   WEAPON_ATTACH_POINT_RIFLE = 9,
 *   WEAPON_ATTACH_POINT_RIFLE_ALTERNATE = 10,
 *   WEAPON_ATTACH_POINT_LANTERN = 11,
 *   WEAPON_ATTACH_POINT_TEMP_LANTERN = 12,
 *   WEAPON_ATTACH_POINT_MELEE = 13,
 *   MAX_SYNCED_WEAPON_ATTACH_POINTS = 13,
 *   WEAPON_ATTACH_POINT_HIP = 14,
 *   WEAPON_ATTACH_POINT_BOOT = 15,
 *   WEAPON_ATTACH_POINT_BACK = 16,
 *   WEAPON_ATTACH_POINT_FRONT = 17,
 *   WEAPON_ATTACH_POINT_SHOULDERSLING = 18,
 *   WEAPON_ATTACH_POINT_LEFTBREAST = 19,
 *   WEAPON_ATTACH_POINT_RIGHTBREAST = 20,
 *   WEAPON_ATTACH_POINT_LEFTARMPIT = 21,
 *   WEAPON_ATTACH_POINT_RIGHTARMPIT = 22,
 *   WEAPON_ATTACH_POINT_LEFTARMPIT_RIFLE = 23,
 *   WEAPON_ATTACH_POINT_SATCHEL = 24,
 *   WEAPON_ATTACH_POINT_LEFTARMPIT_BOW = 25,
 *   WEAPON_ATTACH_POINT_RIGHT_HAND_EXTRA = 26,
 *   WEAPON_ATTACH_POINT_LEFT_HAND_EXTRA = 27,
 *   WEAPON_ATTACH_POINT_RIGHT_HAND_AUX = 28,
 *   MAX_WEAPON_ATTACH_POINTS = 29
 * };
 *
 * @param {number} ped
 * @param {number} weaponHash
 * @param {boolean} equipNow
 * @param {number} attachPoint
 * @param {boolean} p4
 * @param {boolean} p5
 * @return {void}
 */
declare function SetCurrentPedWeapon(ped: Ped, weaponHash: Hash, equipNow: boolean, attachPoint: number, p4: boolean, p5: boolean): void;

/**
 * SET_CURRENT_PED_WEAPON_BY_GUID
 * Equips a weapon from a weaponItem, similar to GIVE_WEAPON_TO_PED
 *
 * @param {number} ped
 * @param {DataView} weaponUid
 * @param {boolean} p2
 * @param {boolean} p3
 * @param {boolean} p4
 * @param {boolean} p5
 * @return {void}
 */
declare function SetCurrentPedWeaponByGuid(ped: Ped, weaponUid: DataView, p2: boolean, p3: boolean, p4: boolean, p5: boolean): void;

/**
 * SET_INSTANTLY_EQUIP_WEAPON_PICKUPS
 *
 * @param {number} ped
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetInstantlyEquipWeaponPickups(ped: Ped, toggle: boolean): void;

/**
 * SET_PED_AMMO
 *
 * @param {number} ped
 * @param {number} weaponHash
 * @param {number} ammo
 * @return {void}
 */
declare function SetPedAmmo(ped: Ped, weaponHash: Hash, ammo: number): void;

/**
 * SET_PED_AMMO_BY_TYPE
 *
 * @param {number} ped
 * @param {number} ammoType
 * @param {number} ammo
 * @return {void}
 */
declare function SetPedAmmoByType(ped: Ped, ammoType: Hash, ammo: number): void;

/**
 * SET_PED_AMMO_TO_DROP
 *
 * @param {number} ped
 * @param {number} p1
 * @param {number} p2
 * @return {void}
 */
declare function SetPedAmmoToDrop(ped: Ped, p1: number, p2: number): void;

/**
 * SET_PED_CURRENT_WEAPON_VISIBLE
 *
 * @param {number} ped
 * @param {boolean} visible
 * @param {boolean} deselectWeapon
 * @param {boolean} p3
 * @param {boolean} p4
 * @return {void}
 */
declare function SetPedCurrentWeaponVisible(ped: Ped, visible: boolean, deselectWeapon: boolean, p3: boolean, p4: boolean): void;

/**
 * SET_PED_DROPS_INVENTORY_WEAPON
 *
 * @param {number} ped
 * @param {number} weaponHash
 * @param {number} xOffset
 * @param {number} yOffset
 * @param {number} zOffset
 * @param {number} ammoCount
 * @return {void}
 */
declare function SetPedDropsInventoryWeapon(ped: Ped, weaponHash: Hash, xOffset: number, yOffset: number, zOffset: number, ammoCount: number): void;

/**
 * SET_PED_DROPS_WEAPONS_WHEN_DEAD
 *
 * @param {number} ped
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetPedDropsWeaponsWhenDead(ped: Ped, toggle: boolean): void;

/**
 * SET_PED_INFINITE_AMMO
 *
 * @param {number} ped
 * @param {boolean} toggle
 * @param {number} weaponHash
 * @return {void}
 */
declare function SetPedInfiniteAmmo(ped: Ped, toggle: boolean, weaponHash: Hash): void;

/**
 * SET_PLAYER_PED_QUICK_SWAP_WEAPON_BY_GUID
 *
 * @param {number} ped
 * @param {DataView} guidPrimary
 * @param {DataView} guidSecondary
 * @return {void}
 */
declare function SetPlayerPedQuickSwapWeaponByGuid(ped: Ped, guidPrimary: DataView, guidSecondary: DataView): void;

/**
 * SET_VEHICLE_WEAPON_HEADING
 *
 * @param {number} vehicle
 * @param {number} seatIndex
 * @param {number} heading
 * @param {boolean} p3
 * @return {void}
 */
declare function SetVehicleWeaponHeading(vehicle: Vehicle, seatIndex: number, heading: number, p3: boolean): void;

/**
 * SHOULD_WEAPON_BE_DISCARDED_WHEN_SWAPPED
 *
 * @param {number} weaponHash
 * @return {boolean}
 */
declare function ShouldWeaponBeDiscardedWhenSwapped(weaponHash: Hash): boolean;

/**
 * _0x000FA7A4A8443AF7
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x000FA7A4A8443AF7(p0: any): void;

/**
 * _0x07E1C35F0078C3F9
 * Seems to return true if the passed weapon is some sort of non-lethal melee weapon.
 * Weapon must currently be held/equipped by the ped.
 *
 * @param {number} ped
 * @param {number} weapon
 * @return {boolean}
 */
declare function N_0x07E1C35F0078C3F9(ped: Ped, weapon: Hash): boolean;

/**
 * _0x0DE0944ECCB3DF5D
 * _GET_D* - _GET_L*
 *
 * @param {number} ped
 * @return {boolean}
 */
declare function N_0x0DE0944ECCB3DF5D(ped: Ped): boolean;

/**
 * _0x14FF0C2545527F9B
 * Puts the gun visibly in your horse's holster without having to be close to the horse. Use 0xE9BD19F8121ADE3E before using this native
 * _A* or _B*
 *
 * @param {number} horse
 * @param {number} weaponHash
 * @param {number} ped
 * @return {void}
 */
declare function N_0x14FF0C2545527F9B(horse: Ped, weaponHash: Hash, ped: Ped): void;

/**
 * _0x16D9841A85FA627E
 *
 * @param {number} ped
 * @param {boolean} toggle
 * @return {void}
 */
declare function N_0x16D9841A85FA627E(ped: Ped, toggle: boolean): void;

/**
 * _0x183CE355115B6E75
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x183CE355115B6E75(p0: any, p1: any): void;

/**
 * _0x23BF601A42F329A0
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0x23BF601A42F329A0(p0: any): any;

/**
 * _0x2EBF70E1D8C06683
 * _SET_A* - _SET_B*
 *
 * @param {number} ped
 * @param {number} p1
 * @return {void}
 */
declare function N_0x2EBF70E1D8C06683(ped: Ped, p1: Hash): void;

/**
 * _0x3799EFCC3C8CD5E1
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0x3799EFCC3C8CD5E1(p0: any): any;

/**
 * _0x404514D231DB27A0
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x404514D231DB27A0(p0: any, p1: any): void;

/**
 * _0x431240A58484D5D0
 *
 * @param {number} ped
 * @param {boolean} toggle
 * @return {void}
 */
declare function N_0x431240A58484D5D0(ped: Ped, toggle: boolean): void;

/**
 * _0x44C8F4908F1B2622
 *
 * @param {number} ped
 * @param {number} ammoHash
 * @return {boolean}
 */
declare function N_0x44C8F4908F1B2622(ped: Ped, ammoHash: Hash): boolean;

/**
 * _0x457B16951AD77C1B
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x457B16951AD77C1B(p0: any): void;

/**
 * _0x45E57FDD531C9477
 *
 * @param {number} ped
 * @param {boolean} toggle
 * @return {void}
 */
declare function N_0x45E57FDD531C9477(ped: Ped, toggle: boolean): void;

/**
 * _0x46D42883E873C1D7
 * _GET_NUM_*
 *
 * @param {number} ped
 * @return {any}
 */
declare function N_0x46D42883E873C1D7(ped: Ped): any;

/**
 * _0x4820A6939D7CEF28
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x4820A6939D7CEF28(p0: any, p1: any): void;

/**
 * _0x4823F13A21F51964
 *
 * @param {any} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0x4823F13A21F51964(p0: any, p1: any): any;

/**
 * _0x486C96A0DCD2BC92
 *
 * @param {any} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0x486C96A0DCD2BC92(p0: any, p1: any): any;

/**
 * _0x495A04CAEC263AF8
 *
 * @param {any} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0x495A04CAEC263AF8(p0: any, p1: any): any;

/**
 * _0x58425FCA3D3A2D15
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0x58425FCA3D3A2D15(p0: any): any;

/**
 * _0x5A695BD328586B44
 *
 * @param {any} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0x5A695BD328586B44(p0: any, p1: any): any;

/**
 * _0x5B235F24472F2C3B
 *
 * @param {any} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0x5B235F24472F2C3B(p0: any, p1: any): any;

/**
 * _0x63B83A526329AFBC
 * Only used in R* Script fme_escaped_convicts, p0 = 0
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x63B83A526329AFBC(p0: any): void;

/**
 * _0x641351E9AD103890
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x641351E9AD103890(p0: any, p1: any): void;

/**
 * _0x65DC4AC5B96614CB
 * Returns attachPoint
 *
 * @param {number} weaponHash
 * @return {number}
 */
declare function N_0x65DC4AC5B96614CB(weaponHash: Hash): number;

/**
 * _0x74C2365FDD1BB48F
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x74C2365FDD1BB48F(p0: any, p1: any): void;

/**
 * _0x74C8000FDD1BB111
 *
 * @param {any} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0x74C8000FDD1BB111(p0: any, p1: any): any;

/**
 * _0x74C8000FDD1BB222
 *
 * @param {any} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0x74C8000FDD1BB222(p0: any, p1: any): any;

/**
 * _0x74C9080FDD1BB48E
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x74C9080FDD1BB48E(p0: any, p1: any): void;

/**
 * _0x74C9080FDD1BB48F
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x74C9080FDD1BB48F(p0: any, p1: any): void;

/**
 * _0x74C90AAACC1DD48F
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x74C90AAACC1DD48F(p0: any): void;

/**
 * _0x80BB243789008A82
 *
 * @param {any} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0x80BB243789008A82(p0: any, p1: any): any;

/**
 * _0x8A779706DA5CA3DD
 * Only used in R* SP Scripts native_son2, native_son3 and smuggler2
 * Params: p2 = -1
 *
 * @param {number} ped
 * @param {boolean} p1
 * @param {number} p2
 * @return {void}
 */
declare function N_0x8A779706DA5CA3DD(ped: Ped, p1: boolean, p2: number): void;

/**
 * _0x9409C62504A8F9E9
 * Only used in R* SP Script guama3
 *
 * @param {number} vehicle
 * @param {boolean} p1
 * @return {void}
 */
declare function N_0x9409C62504A8F9E9(vehicle: Vehicle, p1: boolean): void;

/**
 * _0x95CA12E2C68043E5
 *
 * @param {any} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0x95CA12E2C68043E5(p0: any, p1: any): any;

/**
 * _0x9CCA3131E6B53C68
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {any}
 */
declare function N_0x9CCA3131E6B53C68(p0: any, p1: any, p2: any): any;

/**
 * _0x9EEFD670F10656D7
 * Returns weaponHash
 *
 * @param {number} weaponCollection
 * @param {number} weaponGroup
 * @return {number}
 */
declare function N_0x9EEFD670F10656D7(weaponCollection: Hash, weaponGroup: Hash): number;

/**
 * _0x9F0E1892C7F228A8
 *
 * @param {boolean} p0
 * @return {any}
 */
declare function N_0x9F0E1892C7F228A8(p0: boolean): any;

/**
 * _0xA2091482ED42EF85
 *
 * @param {any} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0xA2091482ED42EF85(p0: any, p1: any): any;

/**
 * _0xA3716A77DCF17424
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {void}
 */
declare function N_0xA3716A77DCF17424(p0: any, p1: any, p2: any): void;

/**
 * _0xA769D753922B031B
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {void}
 */
declare function N_0xA769D753922B031B(p0: any, p1: any, p2: any): void;

/**
 * _0xABC18A28BAD4B46F
 *
 * @param {any} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0xABC18A28BAD4B46F(p0: any, p1: any): any;

/**
 * _0xAFFD0CCF31F469B8
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0xAFFD0CCF31F469B8(p0: any): any;

/**
 * _0xB0FB9B196A3D13F0
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {void}
 */
declare function N_0xB0FB9B196A3D13F0(p0: any, p1: any, p2: any): void;

/**
 * _0xB832F1A686B9B810
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {void}
 */
declare function N_0xB832F1A686B9B810(p0: any, p1: any, p2: any): void;

/**
 * _0xBC9444F2FF94A9C0
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0xBC9444F2FF94A9C0(p0: any): any;

/**
 * _0xBFCA7AFABF9D7967
 *
 * @param {any} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0xBFCA7AFABF9D7967(p0: any, p1: any): any;

/**
 * _0xC5899C4CD2E2495D
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0xC5899C4CD2E2495D(p0: any): void;

/**
 * _0xD2209866B0CB72EA
 *
 * @param {any} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0xD2209866B0CB72EA(p0: any, p1: any): any;

/**
 * _0xD4C6E24D955FF061
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0xD4C6E24D955FF061(p0: any): void;

/**
 * _0xD53846B9C931C181
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {void}
 */
declare function N_0xD53846B9C931C181(p0: any, p1: any, p2: any): void;

/**
 * _0xD63B4BA3A02A99E0
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0xD63B4BA3A02A99E0(p0: any, p1: any): void;

/**
 * _0xE9B3FEC825668291
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {void}
 */
declare function N_0xE9B3FEC825668291(p0: any, p1: any, p2: any): void;

/**
 * _0xEA522F991E120D45
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0xEA522F991E120D45(p0: any): any;

/**
 * _0xEC97101A8F311282
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0xEC97101A8F311282(p0: any): any;

/**
 * _0xECBB26529A737EF6
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0xECBB26529A737EF6(p0: any): void;

/**
 * _0xF08D8FEB455F2C8C
 *
 * @param {number} ped
 * @param {boolean} toggle
 * @return {void}
 */
declare function N_0xF08D8FEB455F2C8C(ped: Ped, toggle: boolean): void;

/**
 * _0xF252A85B8F3F8C58
 *
 * @param {number} weaponCollection
 * @param {number} dualwieldVariant
 * @return {boolean}
 */
declare function N_0xF252A85B8F3F8C58(weaponCollection: Hash, dualwieldVariant: Hash): boolean;

/**
 * _0xF2F585411E748B9C
 *
 * @param {any} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0xF2F585411E748B9C(p0: any, p1: any): any;

/**
 * _0xF8204EF17410BF43
 * Returns weaponHash
 *
 * @param {number} weaponGroupHash
 * @param {number} p1
 * @param {number} p2
 * @param {any} p3
 * @return {number}
 */
declare function N_0xF8204EF17410BF43(weaponGroupHash: Hash, p1: number, p2: number, p3: any): number;

/**
 * _ADD_AMMO_TO_PED
 * addReason:
 * enum eAddItemReason : Hash
 * {
 *   ADD_REASON_AWARDS = 0xB784AD1E,
 *   ADD_REASON_CREATE_CHARACTER = 0xE2C4FF71,
 *   ADD_REASON_DEBUG = 0x5C05C64D,
 *   ADD_REASON_DEFAULT = 0x2CD419DC,
 *   ADD_REASON_GET_INVENTORY = 0xD8188685,
 *   ADD_REASON_INCENTIVE = 0x8ADC2E95,
 *   ADD_REASON_LOADOUT = 0xCA3454E6,
 *   ADD_REASON_LOAD_SAVEGAME = 0x56212906,
 *   ADD_REASON_LOOTED = 0xCA806A55,
 *   ADD_REASON_MELEE = 0x7B9BDCE7,
 *   ADD_REASON_MP_MISSION = 0xEC0E0194,
 *   ADD_REASON_NOTIFICATION = 0xC56292D2,
 *   ADD_REASON_PICKUP = 0x1A770E22,
 *   ADD_REASON_PURCHASED = 0x4A6726C9,
 *   ADD_REASON_SET_AMOUNT = 0x4504731E,
 *   ADD_REASON_SYNCING = 0x8D4B4FF4,
 *   ADD_REASON_USE_FAILED = 0xD385B670
 * };
 *
 * @param {number} ped
 * @param {number} weaponHash
 * @param {number} amount
 * @param {number} addReason
 * @return {void}
 */
declare function AddAmmoToPed(ped: Ped, weaponHash: Hash, amount: number, addReason: Hash): void;

/**
 * _ADD_AMMO_TO_PED_BY_TYPE
 * addReason: see _ADD_AMMO_TO_PED
 *
 * @param {number} ped
 * @param {number} ammoType
 * @param {number} amount
 * @param {number} addReason
 * @return {void}
 */
declare function AddAmmoToPedByType(ped: Ped, ammoType: Hash, amount: number, addReason: Hash): void;

/**
 * _CLEAR_PED_LAST_WEAPON_DAMAGE
 *
 * @param {number} ped
 * @return {void}
 */
declare function ClearPedLastWeaponDamage(ped: Ped): void;

/**
 * _CREATE_WEAPON_OBJECT
 *
 * @param {number} weaponHash
 * @param {number} ammoCount
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {boolean} showWorldModel
 * @param {number} scale
 * @return {number}
 */
declare function CreateWeaponObject(weaponHash: Hash, ammoCount: number, x: number, y: number, z: number, showWorldModel: boolean, scale: number): number;

/**
 * _DISABLE_AMMO_TYPE_FOR_PED
 *
 * @param {number} ped
 * @param {number} ammoHash
 * @return {void}
 */
declare function DisableAmmoTypeForPed(ped: Ped, ammoHash: Hash): void;

/**
 * _DISABLE_AMMO_TYPE_FOR_PED_WEAPON
 *
 * @param {number} ped
 * @param {number} weaponHash
 * @param {number} ammoHash
 * @return {void}
 */
declare function DisableAmmoTypeForPedWeapon(ped: Ped, weaponHash: Hash, ammoHash: Hash): void;

/**
 * _ENABLE_AMMO_TYPE_FOR_PED
 *
 * @param {number} ped
 * @param {number} weaponHash
 * @return {void}
 */
declare function EnableAmmoTypeForPed(ped: Ped, weaponHash: Hash): void;

/**
 * _ENABLE_AMMO_TYPE_FOR_PED_WEAPON
 *
 * @param {number} ped
 * @param {number} weaponHash
 * @param {number} ammoHash
 * @return {void}
 */
declare function EnableAmmoTypeForPedWeapon(ped: Ped, weaponHash: Hash, ammoHash: Hash): void;

/**
 * _ENABLE_WEAPON_RESTORE
 *
 * @param {number} ped
 * @return {boolean}
 */
declare function EnableWeaponRestore(ped: Ped): boolean;

/**
 * _GET_AMMO_IN_CLIP_BY_INVENTORY_UID
 *
 * @param {number} ped
 * @param {DataView} inventoryUid
 * @return {[boolean, number]}
 */
declare function GetAmmoInClipByInventoryUid(ped: Ped, inventoryUid: DataView): [boolean, number];

/**
 * _GET_AMMO_TYPE_FOR_WEAPON
 *
 * @param {number} weaponHash
 * @return {number}
 */
declare function GetAmmoTypeForWeapon(weaponHash: Hash): number;

/**
 * _GET_BEST_PED_WEAPON_IN_GROUP
 * If near your horse when called, weapons stored on your horse will be considered
 * Returns weaponHash
 *
 * @param {number} ped
 * @param {number} weaponGroup
 * @param {boolean} p2
 * @param {boolean} p3
 * @return {number}
 */
declare function GetBestPedWeaponInGroup(ped: Ped, weaponGroup: Hash, p2: boolean, p3: boolean): number;

/**
 * _GET_BEST_PED_WEAPON_IN_INVENTORY
 *
 * @param {number} ped
 * @param {any} p1
 * @param {DataView} guidPrimary
 * @return {any}
 */
declare function GetBestPedWeaponInInventory(ped: Ped, p1: any, guidPrimary: DataView): any;

/**
 * _GET_CAN_TWIRL_WEAPON
 *
 * @param {number} weaponHash
 * @return {boolean}
 */
declare function GetCanTwirlWeapon(weaponHash: Hash): boolean;

/**
 * _GET_CORRECT_KIT_EMOTE_TWIRL_GUN
 * _GET_BEST_* - _GET_CLOSEST_*
 *
 * @param {number} ped
 * @param {DataView} weaponGuid
 * @return {boolean}
 */
declare function GetCorrectKitEmoteTwirlGun(ped: Ped, weaponGuid: DataView): boolean;

/**
 * _GET_CURRENT_AMMO_TYPE_FROM_GUID
 * Returns ammoHash
 *
 * @param {number} ped
 * @param {DataView} weaponGuid
 * @return {number}
 */
declare function GetCurrentAmmoTypeFromGuid(ped: Ped, weaponGuid: DataView): number;

/**
 * _GET_CURRENT_PED_WEAPON_AMMO_TYPE
 * Returns ammoHash from weaponObject (Returned by 0x6CA484C9A7377E4F)
 *
 * @param {number} ped
 * @param {number} weaponObject
 * @return {number}
 */
declare function GetCurrentPedWeaponAmmoType(ped: Ped, weaponObject: number): number;

/**
 * _GET_DEFAULT_PED_WEAPON_COLLECTION
 * Returns weaponCollection Hash
 * Example: RE_POLICECHASE_MALES_01: Carbine Repeater + Knife, LO_AGRO_PED
 *
 * @param {number} pedModel
 * @return {number}
 */
declare function GetDefaultPedWeaponCollection(pedModel: Hash): number;

/**
 * _GET_DEFAULT_UNARMED_WEAPON_HASH
 * Returns the ped's default unarmed weapon hash as defined in CPedModelInfo (DefaultUnarmedWeapon).
 * Falls back to WEAPON_UNARMED if the ped doesn't have a valid model info pointer, or 0 if the ped doesn't exist.
 *
 * @param {number} ped
 * @return {number}
 */
declare function GetDefaultUnarmedWeaponHash(ped: Ped): number;

/**
 * _GET_MAX_LOCKON_DISTANCE_OF_CURRENT_PED_WEAPON
 *
 * @param {number} ped
 * @return {number}
 */
declare function GetMaxLockonDistanceOfCurrentPedWeapon(ped: Ped): number;

/**
 * _GET_PED_CURRENT_HELD_WEAPON
 * Returns eCurrentHeldWeapon
 * _GET_R* - _GET_T*
 *
 * @param {number} ped
 * @return {number}
 */
declare function GetPedCurrentHeldWeapon(ped: Ped): number;

/**
 * _GET_PED_GUN_SPINNING_EQUIPPED_KIT_EMOTE_TWIRL
 * Returns emote Hash
 *
 * @param {number} ped
 * @return {number}
 */
declare function GetPedGunSpinningEquippedKitEmoteTwirl(ped: Ped): number;

/**
 * _GET_PED_GUN_SPINNING_HASH_FROM_WEAPON_EMOTE_VARIATION
 * Returns iSpinHash / iVariationSpin
 *
 * @param {number} ped
 * @param {number} weaponEmoteVariation
 * @return {number}
 */
declare function GetPedGunSpinningHashFromWeaponEmoteVariation(ped: Ped, weaponEmoteVariation: number): number;

/**
 * _GET_PED_HOGTIE_WEAPON
 *
 * @param {number} ped
 * @return {number}
 */
declare function GetPedHogtieWeapon(ped: Ped): number;

/**
 * _GET_PED_WEAPON_IN_SLOT
 * slotHash is usually just the weaponHash name, but WEAPON_* is replaced with SLOT_*
 *
 * @param {number} ped
 * @param {number} slotHash
 * @return {number}
 */
declare function GetPedWeaponInSlot(ped: Ped, slotHash: Hash): number;

/**
 * _GET_PED_WEAPON_OBJECT
 * _GET_M* - _GET_PED_A*
 *
 * @param {number} ped
 * @param {boolean} p1
 * @return {number}
 */
declare function GetPedWeaponObject(ped: Ped, p1: boolean): number;

/**
 * _GET_PED_WORST_WEAPON
 *
 * @param {number} ped
 * @param {boolean} p1
 * @param {boolean} p2
 * @param {boolean} p3
 * @return {number}
 */
declare function GetPedWorstWeapon(ped: Ped, p1: boolean, p2: boolean, p3: boolean): number;

/**
 * _GET_PLAYER_PED_QUICK_SWAP_WEAPON_BY_GUID
 * Outputs cached guids
 *
 * @param {number} ped
 * @param {DataView} guidPrimary
 * @param {DataView} guidSecondary
 * @return {void}
 */
declare function GetPlayerPedQuickSwapWeaponByGuid(ped: Ped, guidPrimary: DataView, guidSecondary: DataView): void;

/**
 * _GET_WEAPONTYPE_MODEL
 * Gets the model hash from the weapon hash.
 *
 * @param {number} weaponHash
 * @return {number}
 */
declare function GetWeapontypeModel(weaponHash: Hash): number;

/**
 * _GET_WEAPONTYPE_SLOT
 * Returns hash where WEAPON_ is replaced with SLOT_
 *
 * @param {number} weaponHash
 * @return {number}
 */
declare function GetWeapontypeSlot(weaponHash: Hash): number;

/**
 * _GET_WEAPON_ATTACH_POINT
 * Returns WeaponAttachPoint
 *
 * @param {number} ped
 * @param {number} attachPoint
 * @return {number}
 */
declare function GetWeaponAttachPoint(ped: Ped, attachPoint: number): number;

/**
 * _GET_WEAPON_COMPONENT_TYPE_MODEL
 *
 * @param {number} componentHash
 * @return {number}
 */
declare function GetWeaponComponentTypeModel(componentHash: Hash): number;

/**
 * _GET_WEAPON_DAMAGE
 * Related to weapon visual damage, not actual damage.
 *
 * @param {number} weaponObject
 * @return {number}
 */
declare function GetWeaponDamage(weaponObject: number): number;

/**
 * _GET_WEAPON_DIRT
 *
 * @param {number} weaponObject
 * @return {number}
 */
declare function GetWeaponDirt(weaponObject: number): number;

/**
 * _GET_WEAPON_EMOTE_VARIATION
 * Returns weaponEmoteVariation
 * 
 * WEAPON_EMOTE_VARIATION_INVALID = -2,
 * WEAPON_EMOTE_VARIATION_BASE,
 * WEAPON_EMOTE_VARIATION_A,
 * WEAPON_EMOTE_VARIATION_B,
 * WEAPON_EMOTE_VARIATION_C,
 * WEAPON_EMOTE_VARIATION_D,
 * WEAPON_EMOTE_VARIATION_PREVIEW,
 * WEAPON_EMOTE_NUM_VARIATIONS
 *
 * @param {number} ped
 * @param {number} variation
 * @return {number}
 */
declare function GetWeaponEmoteVariation(ped: Ped, variation: number): number;

/**
 * _GET_WEAPON_GUN_SPINNING_WEAPON_EMOTE_TRICK_TYPE_HASH
 * Returns iSpinHash
 *
 * @param {number} emote
 * @param {number} weaponEmoteTrickType
 * @return {number}
 */
declare function GetWeaponGunSpinningWeaponEmoteTrickTypeHash(emote: Hash, weaponEmoteTrickType: number): number;

/**
 * _GET_WEAPON_NAME
 * Returns "WNS_INVALID" if the weapon is invalid/doesn't exist.
 *
 * @param {number} weaponHash
 * @return {string | number}
 */
declare function GetWeaponName(weaponHash: Hash): string | number;

/**
 * _GET_WEAPON_NAME_2
 *
 * @param {number} weaponHash
 * @return {string | number}
 */
declare function GetWeaponName_2(weaponHash: Hash): string | number;

/**
 * _GET_WEAPON_NAME_WITH_PERMANENT_DEGRADATION
 *
 * @param {number} weaponHash
 * @param {number} permanentDegradationLevel
 * @return {string | number}
 */
declare function GetWeaponNameWithPermanentDegradation(weaponHash: Hash, permanentDegradationLevel: number): string | number;

/**
 * _GET_WEAPON_OBJECT_FROM_PED
 * Detaches the weapon from the ped and actually removes the ped's weapon
 *
 * @param {number} ped
 * @param {boolean} p1
 * @return {number}
 */
declare function GetWeaponObjectFromPed(ped: Ped, p1: boolean): number;

/**
 * _GET_WEAPON_SCALE
 *
 * @param {number} weaponObject
 * @return {number}
 */
declare function GetWeaponScale(weaponObject: number): number;

/**
 * _GET_WEAPON_SOOT
 *
 * @param {number} weaponObject
 * @return {number}
 */
declare function GetWeaponSoot(weaponObject: number): number;

/**
 * _GET_WEAPON_STAT_ID
 *
 * @param {number} weaponHash
 * @return {number}
 */
declare function GetWeaponStatId(weaponHash: Hash): number;

/**
 * _GET_WEAPON_TYPE_FROM_AMMO_TYPE
 *
 * @param {number} ammoType
 * @return {number}
 */
declare function GetWeaponTypeFromAmmoType(ammoType: Hash): number;

/**
 * _GET_WEAPON_UNLOCK
 *
 * @param {number} weaponHash
 * @return {number}
 */
declare function GetWeaponUnlock(weaponHash: Hash): number;

/**
 * _GIVE_WEAPON_COLLECTION_TO_PED
 *
 * @param {number} ped
 * @param {number} weaponCollection
 * @return {void}
 */
declare function GiveWeaponCollectionToPed(ped: Ped, weaponCollection: Hash): void;

/**
 * _GIVE_WEAPON_COMPONENT_TO_ENTITY
 * entity can be a ped or weapon object.
 *
 * @param {number} entity
 * @param {number} componentHash
 * @param {number} weaponHash
 * @param {boolean} p3
 * @return {void}
 */
declare function GiveWeaponComponentToEntity(entity: Entity, componentHash: Hash, weaponHash: Hash, p3: boolean): void;

/**
 * _GIVE_WEAPON_COMPONENT_TO_WEAPON_OBJECT
 *
 * @param {number} ped
 * @param {number} componentHash
 * @param {boolean} p3
 * @return {number}
 */
declare function GiveWeaponComponentToWeaponObject(ped: Ped, componentHash: Hash, p3: boolean): number;

/**
 * _HAS_ENTITY_BEEN_DAMAGED_BY_WEAPON
 *
 * @param {number} entity
 * @param {number} weaponName
 * @param {number} weaponType
 * @return {boolean}
 */
declare function HasEntityBeenDamagedByWeapon(entity: Entity, weaponName: Hash, weaponType: number): boolean;

/**
 * _HAS_ENTITY_BEEN_DAMAGED_BY_WEAPON_RECENTLY
 *
 * @param {number} entity
 * @param {number} weaponHash
 * @param {number} ms
 * @return {boolean}
 */
declare function HasEntityBeenDamagedByWeaponRecently(entity: Entity, weaponHash: Hash, ms: number): boolean;

/**
 * _HAS_PED_GOT_WEAPON_COMPONENT
 *
 * @param {number} ped
 * @param {number} componentHash
 * @param {number} weaponHash
 * @return {boolean}
 */
declare function HasPedGotWeaponComponent(ped: Ped, componentHash: Hash, weaponHash: Hash): boolean;

/**
 * _HAS_WEAPON_ASSET_LOADED
 *
 * @param {number} weaponHash
 * @return {boolean}
 */
declare function HasWeaponAssetLoaded(weaponHash: Hash): boolean;

/**
 * _HIDE_PED_WEAPONS
 * Unequip current weapon and set current weapon to WEAPON_UNARMED.
 * p0 usually 2 in R* scripts. Doesn't seem to have any effect if changed....
 * immediately: if true it will instantly switch to unarmed
 *
 * @param {number} ped
 * @param {number} p0
 * @param {boolean} immediately
 * @return {void}
 */
declare function HidePedWeapons(ped: Ped, p0: number, immediately: boolean): void;

/**
 * _HOLSTER_PED_WEAPONS
 *
 * @param {number} ped
 * @param {boolean} p1
 * @param {boolean} p2
 * @param {boolean} p3
 * @param {boolean} immediately
 * @return {void}
 */
declare function HolsterPedWeapons(ped: Ped, p1: boolean, p2: boolean, p3: boolean, immediately: boolean): void;

/**
 * _IS_AMMO_SILENT
 *
 * @param {number} ammoHash
 * @return {boolean}
 */
declare function IsAmmoSilent(ammoHash: Hash): boolean;

/**
 * _IS_AMMO_SILENT_2
 *
 * @param {number} ammoHash
 * @return {boolean}
 */
declare function IsAmmoSilent_2(ammoHash: Hash): boolean;

/**
 * _IS_AMMO_TYPE_VALID_FOR_WEAPON
 *
 * @param {number} weaponHash
 * @param {number} ammoHash
 * @return {boolean}
 */
declare function IsAmmoTypeValidForWeapon(weaponHash: Hash, ammoHash: Hash): boolean;

/**
 * _IS_AMMO_VALID
 *
 * @param {number} ammoHash
 * @return {boolean}
 */
declare function IsAmmoValid(ammoHash: Hash): boolean;

/**
 * _IS_PED_CURRENT_WEAPON_HOLSTERED
 *
 * @param {number} ped
 * @return {boolean}
 */
declare function IsPedCurrentWeaponHolstered(ped: Ped): boolean;

/**
 * _IS_TARGET_PED_CONSTRAINED_BY_PED_USING_BOLAS
 *
 * @param {number} ped
 * @param {number} targetPed
 * @return {boolean}
 */
declare function IsTargetPedConstrainedByPedUsingBolas(ped: Ped, targetPed: Ped): boolean;

/**
 * _IS_WEAPON_BINOCULARS
 *
 * @param {number} weaponHash
 * @return {boolean}
 */
declare function IsWeaponBinoculars(weaponHash: Hash): boolean;

/**
 * _IS_WEAPON_HOLSTER_STATE_CHANGING
 * Returns true if the ped is currently holstering or unholstering a weapon
 *
 * @param {number} ped
 * @return {boolean}
 */
declare function IsWeaponHolsterStateChanging(ped: Ped): boolean;

/**
 * _IS_WEAPON_KIT
 * Returns true when the weapon passed is either a lasso, the camera or the binoculars
 * _IS_WEAPON_M* - _IS_WEAPON_P*
 *
 * @param {number} weaponHash
 * @return {boolean}
 */
declare function IsWeaponKit(weaponHash: Hash): boolean;

/**
 * _IS_WEAPON_KIT_2
 * Returns true when the weapon passed is either the fishingrod, a lasso, the camera or the binoculars
 * _IS_WEAPON_M* - _IS_WEAPON_P*
 *
 * @param {number} weaponHash
 * @return {boolean}
 */
declare function IsWeaponKit_2(weaponHash: Hash): boolean;

/**
 * _IS_WEAPON_KNIFE
 *
 * @param {number} weaponHash
 * @return {boolean}
 */
declare function IsWeaponKnife(weaponHash: Hash): boolean;

/**
 * _IS_WEAPON_LANTERN
 *
 * @param {number} weaponHash
 * @return {boolean}
 */
declare function IsWeaponLantern(weaponHash: Hash): boolean;

/**
 * _IS_WEAPON_LASSO
 *
 * @param {number} weaponHash
 * @return {boolean}
 */
declare function IsWeaponLasso(weaponHash: Hash): boolean;

/**
 * _IS_WEAPON_ONE_HANDED
 *
 * @param {number} weaponHash
 * @return {boolean}
 */
declare function IsWeaponOneHanded(weaponHash: Hash): boolean;

/**
 * _IS_WEAPON_SILENT
 *
 * @param {number} weaponHash
 * @return {boolean}
 */
declare function IsWeaponSilent(weaponHash: Hash): boolean;

/**
 * _IS_WEAPON_SNIPER
 *
 * @param {number} weaponHash
 * @return {boolean}
 */
declare function IsWeaponSniper(weaponHash: Hash): boolean;

/**
 * _IS_WEAPON_THROWABLE
 *
 * @param {number} weaponHash
 * @return {boolean}
 */
declare function IsWeaponThrowable(weaponHash: Hash): boolean;

/**
 * _IS_WEAPON_TORCH
 *
 * @param {number} weaponHash
 * @return {boolean}
 */
declare function IsWeaponTorch(weaponHash: Hash): boolean;

/**
 * _IS_WEAPON_TWO_HANDED
 *
 * @param {number} weaponHash
 * @return {boolean}
 */
declare function IsWeaponTwoHanded(weaponHash: Hash): boolean;

/**
 * _LISTEN_PROJECTILE_HIT_EVENTS
 *
 * @param {boolean} listen
 * @return {void}
 */
declare function ListenProjectileHitEvents(listen: boolean): void;

/**
 * _MAKE_PED_RELOAD
 *
 * @param {number} ped
 * @return {any}
 */
declare function MakePedReload(ped: Ped): any;

/**
 * _REFILL_AMMO_IN_CLIP
 *
 * @param {number} ped
 * @param {DataView} clipInventoryUid
 * @param {number} p2
 * @return {any}
 */
declare function RefillAmmoInClip(ped: Ped, clipInventoryUid: DataView, p2: number): any;

/**
 * _REFILL_AMMO_IN_CURRENT_PED_WEAPON
 *
 * @param {number} ped
 * @return {any}
 */
declare function RefillAmmoInCurrentPedWeapon(ped: Ped): any;

/**
 * _REMOVE_ALL_PED_AMMO
 *
 * @param {number} ped
 * @return {void}
 */
declare function RemoveAllPedAmmo(ped: Ped): void;

/**
 * _REMOVE_AMMO_FROM_PED
 * removeReason must be REMOVE_REASON_USED, REMOVE_REASON_GIVEN, REMOVE_REASON_DROPPED or REMOVE_REASON_DEBUG, unless amount is -1
 * 
 * removeReason: see REMOVE_WEAPON_FROM_PED
 *
 * @param {number} ped
 * @param {number} weaponHash
 * @param {number} amount
 * @param {number} removeReason
 * @return {void}
 */
declare function RemoveAmmoFromPed(ped: Ped, weaponHash: Hash, amount: number, removeReason: Hash): void;

/**
 * _REMOVE_AMMO_FROM_PED_BY_TYPE
 * removeReason must be REMOVE_REASON_USED, REMOVE_REASON_GIVEN, REMOVE_REASON_DROPPED or REMOVE_REASON_DEBUG, unless amount is -1
 * 
 * removeReason: see REMOVE_WEAPON_FROM_PED
 *
 * @param {number} ped
 * @param {number} ammoHash
 * @param {number} amount
 * @param {number} removeReason
 * @return {void}
 */
declare function RemoveAmmoFromPedByType(ped: Ped, ammoHash: Hash, amount: number, removeReason: Hash): void;

/**
 * _REMOVE_WEAPON_ASSET
 *
 * @param {number} weaponHash
 * @return {void}
 */
declare function RemoveWeaponAsset(weaponHash: Hash): void;

/**
 * _REMOVE_WEAPON_COMPONENT_FROM_PED
 *
 * @param {number} ped
 * @param {number} componentHash
 * @param {number} weaponHash
 * @return {void}
 */
declare function RemoveWeaponComponentFromPed(ped: Ped, componentHash: Hash, weaponHash: Hash): void;

/**
 * _REMOVE_WEAPON_FROM_PED_BY_GUID
 *
 * @param {number} ped
 * @param {DataView} weaponGuid
 * @param {number} removeReason
 * @return {void}
 */
declare function RemoveWeaponFromPedByGuid(ped: Ped, weaponGuid: DataView, removeReason: Hash): void;

/**
 * _REQUEST_WEAPON_ASSET
 *
 * @param {number} weaponHash
 * @param {number} p1
 * @param {boolean} p2
 * @return {void}
 */
declare function RequestWeaponAsset(weaponHash: Hash, p1: number, p2: boolean): void;

/**
 * _SEND_WEAPON_TO_INVENTORY
 * Appears to just send specified weapon to your horse holster without having to be close
 * However, the weapon is not visible on the horse holster, but you can reach the weapon on the weapon wheel
 *
 * @param {number} ped
 * @param {number} weaponHash
 * @return {void}
 */
declare function SendWeaponToInventory(ped: Ped, weaponHash: Hash): void;

/**
 * _SET_ACTIVE_GUN_SPINNING_EQUIP_KIT_EMOTE_TWIRL
 * emote hashes: KIT_EMOTE_TWIRL_GUN, KIT_EMOTE_TWIRL_GUN_LEFT_HOLSTER, KIT_EMOTE_TWIRL_GUN_DUAL, 0 (to unequip)
 *
 * @param {number} ped
 * @param {number} emote
 * @return {void}
 */
declare function SetActiveGunSpinningEquipKitEmoteTwirl(ped: Ped, emote: Hash): void;

/**
 * _SET_ACTIVE_GUN_SPINNING_KIT_EMOTE_TWIRL
 * spinHash can be -1, 0 to disable
 *
 * @param {number} ped
 * @param {number} weaponEmoteTrickType
 * @param {number} spin
 * @return {void}
 */
declare function SetActiveGunSpinningKitEmoteTwirl(ped: Ped, weaponEmoteTrickType: number, spin: Hash): void;

/**
 * _SET_ALLOW_DUAL_WIELD
 *
 * @param {number} ped
 * @param {boolean} allow
 * @return {void}
 */
declare function SetAllowDualWield(ped: Ped, allow: boolean): void;

/**
 * _SET_AMMO_IN_TURRET
 * turretHash: WEAPON_TURRET_MAXIUM, WEAPON_TURRET_GATLING, WEAPON_TURRET_CANNON, WEAPON_TURRET_REVOLVING_CANNON
 *
 * @param {number} vehicle
 * @param {number} turretHash
 * @param {number} ammo
 * @return {void}
 */
declare function SetAmmoInTurret(vehicle: Vehicle, turretHash: Hash, ammo: number): void;

/**
 * _SET_AMMO_TYPE_FOR_PED_WEAPON
 *
 * @param {number} ped
 * @param {number} weaponHash
 * @param {number} ammoHash
 * @return {void}
 */
declare function SetAmmoTypeForPedWeapon(ped: Ped, weaponHash: Hash, ammoHash: Hash): void;

/**
 * _SET_AMMO_TYPE_FOR_PED_WEAPON_INVENTORY
 *
 * @param {number} ped
 * @param {DataView} weaponInventoryUid
 * @param {number} ammoHash
 * @return {void}
 */
declare function SetAmmoTypeForPedWeaponInventory(ped: Ped, weaponInventoryUid: DataView, ammoHash: Hash): void;

/**
 * _SET_FORCE_AUTO_EQUIP
 *
 * @param {number} ped
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetForceAutoEquip(ped: Ped, toggle: boolean): void;

/**
 * _SET_FORCE_CURRENT_WEAPON_INTO_COCKED_STATE
 *
 * @param {number} ped
 * @param {number} attachPoint
 * @return {void}
 */
declare function SetForceCurrentWeaponIntoCockedState(ped: Ped, attachPoint: number): void;

/**
 * _SET_GUN_SPINNING_INVENTORY_SLOT_ID_ACTIVATE
 * _STOP_* - _TEST_*
 *
 * @param {number} ped
 * @param {number} emoteType
 * @return {void}
 */
declare function SetGunSpinningInventorySlotIdActivate(ped: Ped, emoteType: number): void;

/**
 * _SET_PED_ALL_WEAPONS_VISIBILITY
 *
 * @param {number} ped
 * @param {boolean} visible
 * @return {void}
 */
declare function SetPedAllWeaponsVisibility(ped: Ped, visible: boolean): void;

/**
 * _SET_PED_INFINITE_AMMO_CLIP
 *
 * @param {number} ped
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetPedInfiniteAmmoClip(ped: Ped, toggle: boolean): void;

/**
 * _SET_PED_WEAPON_ATTACH_POINT_VISIBILITY
 * attachPoint: see SET_CURRENT_PED_WEAPON
 *
 * @param {number} ped
 * @param {number} attachPoint
 * @param {boolean} visible
 * @return {void}
 */
declare function SetPedWeaponAttachPointVisibility(ped: Ped, attachPoint: number, visible: boolean): void;

/**
 * _SET_VEHICLE_WEAPON_HEADING_LIMITS
 *
 * @param {number} vehicle
 * @param {number} p1
 * @param {number} minHeading
 * @param {number} maxHeading
 * @return {void}
 */
declare function SetVehicleWeaponHeadingLimits(vehicle: Vehicle, p1: number, minHeading: number, maxHeading: number): void;

/**
 * _SET_VEHICLE_WEAPON_HEADING_LIMITS_2
 *
 * @param {number} vehicle
 * @param {number} p1
 * @param {number} minHeading
 * @param {number} maxHeading
 * @return {any}
 */
declare function SetVehicleWeaponHeadingLimits_2(vehicle: Vehicle, p1: number, minHeading: number, maxHeading: number): any;

/**
 * _SET_WEAPON_DAMAGE
 * Related to weapon visual damage, not actual damage.
 *
 * @param {number} weaponObject
 * @param {number} level
 * @param {boolean} p2
 * @return {void}
 */
declare function SetWeaponDamage(weaponObject: number, level: number, p2: boolean): void;

/**
 * _SET_WEAPON_DEGRADATION
 *
 * @param {number} weaponObject
 * @param {number} level
 * @return {void}
 */
declare function SetWeaponDegradation(weaponObject: number, level: number): void;

/**
 * _SET_WEAPON_DIRT
 *
 * @param {number} weaponObject
 * @param {number} level
 * @param {boolean} p2
 * @return {void}
 */
declare function SetWeaponDirt(weaponObject: number, level: number, p2: boolean): void;

/**
 * _SET_WEAPON_LEVEL_THRESHOLD
 * every other level will have the max value of (brokeLevel - threshold)
 *
 * @param {number} weaponObject
 * @param {number} threshold
 * @return {void}
 */
declare function SetWeaponLevelThreshold(weaponObject: number, threshold: number): void;

/**
 * _SET_WEAPON_SCALE
 *
 * @param {number} weaponObject
 * @param {number} scale
 * @return {void}
 */
declare function SetWeaponScale(weaponObject: number, scale: number): void;

/**
 * _SET_WEAPON_SOOT
 *
 * @param {number} weaponObject
 * @param {number} level
 * @param {boolean} p2
 * @return {void}
 */
declare function SetWeaponSoot(weaponObject: number, level: number, p2: boolean): void;