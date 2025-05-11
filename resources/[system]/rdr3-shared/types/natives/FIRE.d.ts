/**
   * ADD_EXPLOSION
   * https://github.com/femga/rdr3_discoveries/tree/master/graphics/explosions
   * 
   * explosionType:
   * enum eExplosionTag
   * {
   *   EXP_TAG_DONTCARE = -1,
   *   EXP_TAG_GRENADE,
   *   EXP_TAG_STICKYBOMB,
   *   EXP_TAG_MOLOTOV,
   *   EXP_TAG_MOLOTOV_VOLATILE,
   *   EXP_TAG_HI_OCTANE,
   *   EXP_TAG_CAR,
   *   EXP_TAG_PLANE,
   *   EXP_TAG_PETROL_PUMP,
   *   EXP_TAG_DIR_STEAM,
   *   EXP_TAG_DIR_FLAME,
   *   EXP_TAG_DIR_WATER_HYDRANT,
   *   EXP_TAG_BOAT,
   *   EXP_TAG_BULLET,
   *   EXP_TAG_SMOKEGRENADE,
   *   EXP_TAG_BZGAS,
   *   EXP_TAG_GAS_CANISTER,
   *   EXP_TAG_EXTINGUISHER,
   *   EXP_TAG_TRAIN,
   *   EXP_TAG_DIR_FLAME_EXPLODE,
   *   EXP_TAG_VEHICLE_BULLET,
   *   EXP_TAG_BIRD_CRAP,
   *   EXP_TAG_FIREWORK,
   *   EXP_TAG_TORPEDO,
   *   EXP_TAG_TORPEDO_UNDERWATER,
   *   EXP_TAG_LANTERN,
   *   EXP_TAG_DYNAMITE,
   *   EXP_TAG_DYNAMITESTACK,
   *   EXP_TAG_DYNAMITE_VOLATILE,
   *   EXP_TAG_RIVER_BLAST,
   *   EXP_TAG_PLACED_DYNAMITE,
   *   EXP_TAG_FIRE_ARROW,
   *   EXP_TAG_DYNAMITE_ARROW,
   *   EXP_TAG_PHOSPHOROUS_BULLET,
   *   EXP_TAG_LIGHTNING_STRIKE,
   *   EXP_TAG_TRACKING_ARROW,
   *   EXP_TAG_POISON_BOTTLE
   * };
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} explosionType
   * @param {number} damageScale
   * @param {boolean} isAudible
   * @param {boolean} isInvisible
   * @param {number} cameraShake
   * @return {void}
   */
declare function AddExplosion(x: number, y: number, z: number, explosionType: number, damageScale: number, isAudible: boolean, isInvisible: boolean, cameraShake: number): void;

/**
   * ADD_EXPLOSION_WITH_USER_VFX
   * explosionType: see ADD_EXPLOSION
   * Change explosionFx (Visual Effect) for specified explosionType
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} explosionType
   * @param {number} explosionFx
   * @param {number} damageScale
   * @param {boolean} isAudible
   * @param {boolean} isInvisible
   * @param {number} cameraShake
   * @return {void}
   */
declare function AddExplosionWithUserVfx(x: number, y: number, z: number, explosionType: number, explosionFx: Hash, damageScale: number, isAudible: boolean, isInvisible: boolean, cameraShake: number): void;

/**
   * ADD_OWNED_EXPLOSION
   * explosionType: see ADD_EXPLOSION
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} explosionType
   * @param {number} damageScale
   * @param {boolean} isAudible
   * @param {boolean} isInvisible
   * @param {number} cameraShake
   * @return {void}
   */
declare function AddOwnedExplosion(ped: Ped, x: number, y: number, z: number, explosionType: number, damageScale: number, isAudible: boolean, isInvisible: boolean, cameraShake: number): void;

/**
   * GET_CLOSEST_FIRE_POS
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {[boolean, Vector3]}
   */
declare function GetClosestFirePos(x: number, y: number, z: number): [boolean, Vector3];

/**
   * GET_NUMBER_OF_FIRES_IN_RANGE
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @return {number}
   */
declare function GetNumberOfFiresInRange(x: number, y: number, z: number, radius: number): number;

/**
   * GET_OWNER_OF_EXPLOSION_IN_ANGLED_AREA
   * explosionType: see ADD_EXPLOSION
   *
   * @param {number} explosionType
   * @param {number} x1
   * @param {number} y1
   * @param {number} z1
   * @param {number} x2
   * @param {number} y2
   * @param {number} z2
   * @param {number} radius
   * @return {number}
   */
declare function GetOwnerOfExplosionInAngledArea(explosionType: number, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, radius: number): Entity;

/**
   * IS_ENTITY_ON_FIRE
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function IsEntityOnFire(entity: Entity): boolean;

/**
   * IS_EXPLOSION_ACTIVE_IN_AREA
   * explosionType: see ADD_EXPLOSION
   *
   * @param {number} explosionType
   * @param {number} x1
   * @param {number} y1
   * @param {number} z1
   * @param {number} x2
   * @param {number} y2
   * @param {number} z2
   * @return {boolean}
   */
declare function IsExplosionActiveInArea(explosionType: number, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): boolean;

/**
   * IS_EXPLOSION_IN_ANGLED_AREA
   * explosionType: see ADD_EXPLOSION
   *
   * @param {number} explosionType
   * @param {number} x1
   * @param {number} y1
   * @param {number} z1
   * @param {number} x2
   * @param {number} y2
   * @param {number} z2
   * @param {number} angle
   * @return {boolean}
   */
declare function IsExplosionInAngledArea(explosionType: number, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, angle: number): boolean;

/**
   * IS_EXPLOSION_IN_AREA
   * explosionType: see ADD_EXPLOSION
   *
   * @param {number} explosionType
   * @param {number} x1
   * @param {number} y1
   * @param {number} z1
   * @param {number} x2
   * @param {number} y2
   * @param {number} z2
   * @return {boolean}
   */
declare function IsExplosionInArea(explosionType: number, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): boolean;

/**
   * IS_EXPLOSION_IN_SPHERE
   * explosionType: see ADD_EXPLOSION
   *
   * @param {number} explosionType
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @return {boolean}
   */
declare function IsExplosionInSphere(explosionType: number, x: number, y: number, z: number, radius: number): boolean;

/**
   * REMOVE_SCRIPT_FIRE
   *
   * @param {FireId} fireHandle
   * @return {void}
   */
declare function RemoveScriptFire(fireHandle: FireId): void;

/**
   * START_ENTITY_FIRE
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function StartEntityFire(p0: any, p1: any, p2: any, p3: any): void;

/**
   * START_SCRIPT_FIRE
   * Starts a fire:
   * 
   * xyz: Location of fire
   * maxChildren: The max amount of times a fire can spread to other objects. Must be 25 or less, or the function will do nothing.
   * isGasFire: Whether or not the fire is powered by gasoline.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} p3
   * @param {number} p4
   * @param {boolean} p5
   * @param {string | number} soundsetName
   * @param {number} p7
   * @param {number} p8
   * @return {FireId}
   */
declare function StartScriptFire(x: number, y: number, z: number, p3: number, p4: number, p5: boolean, soundsetName: string | number, p7: number, p8: number): FireId;

/**
   * STOP_ENTITY_FIRE
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function StopEntityFire(p0: any, p1: any): void;

/**
   * STOP_FIRE_IN_RANGE
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @return {void}
   */
declare function StopFireInRange(x: number, y: number, z: number, radius: number): void;

/**
   * _0x24DB6B9F2B719043
   * Only used in R* SP Related Camp Scripts
   *
   * @param {number} p0
   * @return {void}
   */
declare function N_0x24DB6B9F2B719043(p0: number): void;

/**
   * _ADD_EXPLOSION_WITH_USER_VFX_AND_DAMAGE_CAUSER
   * Add explosion with vfx and assign an entity as damage causer.
   * explosionType: https://github.com/femga/rdr3_discoveries/blob/master/graphics/explosions/README.md
   * explosionFx: https://github.com/femga/rdr3_discoveries/blob/master/graphics/explosions/explosion_vfxTags.lua
   *
   * @param {number} entity
   * @param {boolean} p1
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} explosionType
   * @param {number} explosionFx
   * @param {number} damageScale
   * @param {boolean} isAudible
   * @param {boolean} isInvisible
   * @param {number} cameraShake
   * @return {void}
   */
declare function AddExplosionWithUserVfxAndDamageCauser(entity: Entity, p1: boolean, x: number, y: number, z: number, explosionType: number, explosionFx: Hash, damageScale: number, isAudible: boolean, isInvisible: boolean, cameraShake: number): void;

/**
   * _0x41B87A6495EE13DD
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @param {any} p7
   * @param {any} p8
   * @param {any} p9
   * @return {any}
   */
declare function N_0x41B87A6495EE13DD(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): any;

/**
   * _GET_CLOSEST_FIRE_POS_IN_VOLUME
   *
   * @param {number} posX
   * @param {number} posY
   * @param {number} posZ
   * @param {number} rotX
   * @param {number} rotY
   * @param {number} rotZ
   * @param {number} scaleX
   * @param {number} scaleY
   * @param {number} scaleZ
   * @return {[boolean, Vector3]}
   */
declare function GetClosestFirePosInVolume(posX: number, posY: number, posZ: number, rotX: number, rotY: number, rotZ: number, scaleX: number, scaleY: number, scaleZ: number): [boolean, Vector3];

/**
   * _0x68F6A75FDF5A70D6
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} p3
   * @return {void}
   */
declare function N_0x68F6A75FDF5A70D6(x: number, y: number, z: number, p3: number): void;

/**
   * _0x754937C28271BC65
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x754937C28271BC65(p0: any): void;

/**
   * _IS_ENTITY_DAMAGED_BY_FIRE
   * this natives only returns true if entity is damaged by fire , once damaged caused to entity by fire (like burned appearance) has cleared (they clear over time) then returns false
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function IsEntityDamagedByFire(entity: Entity): boolean;

/**
   * _ADD_EXPLOSION_WITH_DAMAGE_CAUSER
   * Add explosion with and assign an entity as damage causer.
   * explosionType: https://github.com/femga/rdr3_discoveries/blob/master/graphics/explosions/README.md
   *
   * @param {number} entity
   * @param {number} p1
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} explosionType
   * @param {number} damageScale
   * @param {boolean} isAudible
   * @param {boolean} isInvisible
   * @param {number} cameraShake
   * @return {void}
   */
declare function AddExplosionWithDamageCauser(entity: Entity, p1: number, x: number, y: number, z: number, explosionType: number, damageScale: number, isAudible: boolean, isInvisible: boolean, cameraShake: number): void;

/**
   * _IS_ENTITY_CONSUMED_BY_FIRE
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function IsEntityConsumedByFire(entity: Entity): boolean;

/**
   * _IS_EXPLOSION_IN_VOLUME
   * explosionType: see ADD_EXPLOSION
   *
   * @param {number} explosionType
   * @param {number} volume
   * @return {boolean}
   */
declare function IsExplosionInVolume(explosionType: number, volume: Volume): boolean;

/**
   * _IS_PED_SHOCKING_EVENT_ACTIVE
   * Tested with fire & dynamite. Only returns true using value p1 = 1 and when the ped is affected by fire.
   *
   * @param {number} ped
   * @param {number} p1
   * @return {boolean}
   */
declare function IsPedShockingEventActive(ped: Ped, p1: number): boolean;

/**
   * _STOP_FIRE_IN_BOX
   *
   * @param {number} posX
   * @param {number} posY
   * @param {number} posZ
   * @param {number} rotX
   * @param {number} rotY
   * @param {number} rotZ
   * @param {number} scaleX
   * @param {number} scaleY
   * @param {number} scaleZ
   * @return {void}
   */
declare function StopFireInBox(posX: number, posY: number, posZ: number, rotX: number, rotY: number, rotZ: number, scaleX: number, scaleY: number, scaleZ: number): void;