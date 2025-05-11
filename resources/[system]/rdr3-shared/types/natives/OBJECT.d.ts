/**
   * ALLOW_DAMAGE_EVENTS_FOR_NON_NETWORKED_OBJECTS
   *
   * @param {boolean} enabled
   * @return {void}
   */
declare function AllowDamageEventsForNonNetworkedObjects(enabled: boolean): void;

/**
   * ATTACH_PORTABLE_PICKUP_TO_PED
   *
   * @param {number} pickupObject
   * @param {number} ped
   * @return {void}
   */
declare function AttachPortablePickupToPed(pickupObject: number, ped: Ped): void;

/**
   * BLOCK_PICKUP_FROM_PLAYER_COLLECTION
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function BlockPickupFromPlayerCollection(p0: any, p1: any): void;

/**
   * BREAK_ALL_OBJECT_FRAGMENT_BONES
   *
   * @param {number} object
   * @return {void}
   */
declare function BreakAllObjectFragmentBones(object: number): void;

/**
   * BREAK_OBJECT_FRAGMENT_CHILD
   *
   * @param {number} object
   * @param {any} p1
   * @param {boolean} p2
   * @return {void}
   */
declare function BreakObjectFragmentChild(object: number, p1: any, p2: boolean): void;

/**
   * CONVERT_OLD_PICKUP_TYPE_TO_NEW
   * Old name: _GET_PICKUP_HASH
   *
   * @param {number} pickupHash
   * @return {number}
   */
declare function ConvertOldPickupTypeToNew(pickupHash: Hash): number;

/**
   * CREATE_AMBIENT_PICKUP
   * flags: see CREATE_PICKUP
   *
   * @param {number} pickupHash
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} flags
   * @param {number} value
   * @param {number} modelHash
   * @param {boolean} p7
   * @param {boolean} p8
   * @param {number} p9
   * @param {number} p10
   * @return {number}
   */
declare function CreateAmbientPickup(pickupHash: Hash, x: number, y: number, z: number, flags: number, value: number, modelHash: Hash, p7: boolean, p8: boolean, p9: number, p10: number): number;

/**
   * CREATE_OBJECT
   *
   * @param {number} modelHash
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {boolean} isNetwork
   * @param {boolean} bScriptHostObj
   * @param {boolean} dynamic
   * @param {boolean} p7
   * @param {boolean} p8
   * @return {number}
   */
declare function CreateObject(modelHash: Hash, x: number, y: number, z: number, isNetwork: boolean, bScriptHostObj: boolean, dynamic: boolean, p7: boolean, p8: boolean): number;

/**
   * CREATE_OBJECT_NO_OFFSET
   *
   * @param {number} modelHash
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {boolean} isNetwork
   * @param {boolean} bScriptHostObj
   * @param {boolean} dynamic
   * @param {boolean} p7
   * @return {number}
   */
declare function CreateObjectNoOffset(modelHash: Hash, x: number, y: number, z: number, isNetwork: boolean, bScriptHostObj: boolean, dynamic: boolean, p7: boolean): number;

/**
   * CREATE_OBJECT_SKELETON
   *
   * @param {number} object
   * @return {boolean}
   */
declare function CreateObjectSkeleton(object: number): boolean;

/**
   * CREATE_PICKUP
   * https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/Placement%20Flags
   * https://github.com/femga/rdr3_discoveries/blob/master/objects/pickup_list.lua
   *
   * @param {number} pickupHash
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} flags
   * @param {number} p5
   * @param {boolean} p6
   * @param {number} modelHash
   * @param {number} p8
   * @param {number} p9
   * @param {any} p10
   * @return {number}
   */
declare function CreatePickup(pickupHash: Hash, x: number, y: number, z: number, flags: number, p5: number, p6: boolean, modelHash: Hash, p8: number, p9: number, p10: any): Pickup;

/**
   * CREATE_PICKUP_ROTATE
   * flags: see CREATE_PICKUP
   *
   * @param {number} pickupHash
   * @param {number} posX
   * @param {number} posY
   * @param {number} posZ
   * @param {number} rotX
   * @param {number} rotY
   * @param {number} rotZ
   * @param {number} flags
   * @param {number} p8
   * @param {number} p9
   * @param {boolean} p10
   * @param {number} modelHash
   * @param {number} p12
   * @param {number} p13
   * @param {any} p14
   * @return {number}
   */
declare function CreatePickupRotate(pickupHash: Hash, posX: number, posY: number, posZ: number, rotX: number, rotY: number, rotZ: number, flags: number, p8: number, p9: number, p10: boolean, modelHash: Hash, p12: number, p13: number, p14: any): Pickup;

/**
   * CREATE_PORTABLE_PICKUP
   *
   * @param {number} pickupHash
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {boolean} placeOnGround
   * @param {number} modelHash
   * @return {number}
   */
declare function CreatePortablePickup(pickupHash: Hash, x: number, y: number, z: number, placeOnGround: boolean, modelHash: Hash): number;

/**
   * DELETE_OBJECT
   * Deletes the specified object, then sets the handle pointed to by the pointer to NULL.
   *
  
   * @return {number}
   */
declare function DeleteObject(): number;

/**
   * DETACH_PORTABLE_PICKUP_FROM_PED
   *
   * @param {number} pickupObject
   * @return {void}
   */
declare function DetachPortablePickupFromPed(pickupObject: number): void;

/**
   * DOES_OBJECT_OF_TYPE_EXIST_AT_COORDS
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @param {number} hash
   * @param {boolean} p5
   * @return {boolean}
   */
declare function DoesObjectOfTypeExistAtCoords(x: number, y: number, z: number, radius: number, hash: Hash, p5: boolean): boolean;

/**
   * DOES_PICKUP_EXIST
   *
   * @param {number} pickup
   * @return {boolean}
   */
declare function DoesPickupExist(pickup: Pickup): boolean;

/**
   * DOES_PICKUP_OBJECT_EXIST
   *
   * @param {number} pickupObject
   * @return {boolean}
   */
declare function DoesPickupObjectExist(pickupObject: number): boolean;

/**
   * DOES_PICKUP_OF_TYPE_EXIST_IN_AREA
   *
   * @param {number} pickupHash
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @return {boolean}
   */
declare function DoesPickupOfTypeExistInArea(pickupHash: Hash, x: number, y: number, z: number, radius: number): boolean;

/**
   * DOES_RAYFIRE_MAP_OBJECT_EXIST
   *
   * @param {number} object
   * @return {boolean}
   */
declare function DoesRayfireMapObjectExist(object: number): boolean;

/**
   * DOOR_SYSTEM_GET_DOOR_STATE
   *
   * @param {number} doorHash
   * @return {number}
   */
declare function DoorSystemGetDoorState(doorHash: Hash): number;

/**
   * DOOR_SYSTEM_GET_OPEN_RATIO
   *
   * @param {number} doorHash
   * @return {number}
   */
declare function DoorSystemGetOpenRatio(doorHash: Hash): number;

/**
   * DOOR_SYSTEM_SET_AUTOMATIC_DISTANCE
   *
   * @param {number} doorHash
   * @param {number} distance
   * @return {void}
   */
declare function DoorSystemSetAutomaticDistance(doorHash: Hash, distance: number): void;

/**
   * DOOR_SYSTEM_SET_AUTOMATIC_RATE
   *
   * @param {number} doorHash
   * @param {number} rate
   * @return {void}
   */
declare function DoorSystemSetAutomaticRate(doorHash: Hash, rate: number): void;

/**
   * DOOR_SYSTEM_SET_DOOR_STATE
   * Door lock states:
   * enum eDoorState
   * {
   *   DOORSTATE_INVALID = -1,
   *   DOORSTATE_UNLOCKED,
   *   DOORSTATE_LOCKED_UNBREAKABLE,
   *   DOORSTATE_LOCKED_BREAKABLE,
   *   DOORSTATE_HOLD_OPEN_POSITIVE,
   *   DOORSTATE_HOLD_OPEN_NEGATIVE
   * };
   *
   * @param {number} doorHash
   * @param {number} state
   * @return {void}
   */
declare function DoorSystemSetDoorState(doorHash: Hash, state: number): void;

/**
   * DOOR_SYSTEM_SET_OPEN_RATIO
   * Sets the ajar angle of a door.
   * Ranges from -1.0 to 1.0, and 0.0 is closed / default.
   *
   * @param {number} doorHash
   * @param {number} ajar
   * @param {boolean} forceUpdate
   * @return {void}
   */
declare function DoorSystemSetOpenRatio(doorHash: Hash, ajar: number, forceUpdate: boolean): void;

/**
   * FIX_OBJECT_FRAGMENT
   *
   * @param {number} object
   * @return {void}
   */
declare function FixObjectFragment(object: number): void;

/**
   * FORCE_PICKUP_REGENERATE
   *
   * @param {any} p0
   * @return {void}
   */
declare function ForcePickupRegenerate(p0: any): void;

/**
   * GET_CLOSEST_OBJECT_OF_TYPE
   * Returns the closest object of a specified type within a given radius from a specified position
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @param {number} modelHash
   * @param {boolean} missionScriptObject
   * @param {boolean} scriptHostObject
   * @param {boolean} networkObject
   * @return {number}
   */
declare function GetClosestObjectOfType(x: number, y: number, z: number, radius: number, modelHash: Hash, missionScriptObject: boolean, scriptHostObject: boolean, networkObject: boolean): number;

/**
   * GET_OBJECT_FRAGMENT_DAMAGE_HEALTH
   *
   * @param {any} p0
   * @param {boolean} p1
   * @return {number}
   */
declare function GetObjectFragmentDamageHealth(p0: any, p1: boolean): number;

/**
   * GET_OFFSET_FROM_COORD_AND_HEADING_IN_WORLD_COORDS
   * Old name: _GET_OBJECT_OFFSET_FROM_COORDS
   *
   * @param {number} xPos
   * @param {number} yPos
   * @param {number} zPos
   * @param {number} heading
   * @param {number} xOffset
   * @param {number} yOffset
   * @param {number} zOffset
   * @return {Vector3}
   */
declare function GetOffsetFromCoordAndHeadingInWorldCoords(xPos: number, yPos: number, zPos: number, heading: number, xOffset: number, yOffset: number, zOffset: number): Vector3;

/**
   * GET_PICKUP_COORDS
   *
   * @param {number} pickup
   * @return {Vector3}
   */
declare function GetPickupCoords(pickup: Pickup): Vector3;

/**
   * GET_PICKUP_OBJECT
   *
   * @param {number} pickup
   * @return {number}
   */
declare function GetPickupObject(pickup: Pickup): number;

/**
   * GET_RAYFIRE_MAP_OBJECT
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @param {string | number} name
   * @return {number}
   */
declare function GetRayfireMapObject(x: number, y: number, z: number, radius: number, name: string | number): number;

/**
   * GET_RAYFIRE_MAP_OBJECT_ANIM_PHASE
   *
   * @param {number} object
   * @return {number}
   */
declare function GetRayfireMapObjectAnimPhase(object: number): number;

/**
   * GET_SAFE_PICKUP_COORDS
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @return {Vector3}
   */
declare function GetSafePickupCoords(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): Vector3;

/**
   * GET_STATE_OF_RAYFIRE_MAP_OBJECT
   *
   * @param {number} object
   * @return {number}
   */
declare function GetStateOfRayfireMapObject(object: number): number;

/**
   * GET_WEAPON_TYPE_FROM_PICKUP_TYPE
   *
   * @param {number} pickupHash
   * @return {number}
   */
declare function GetWeaponTypeFromPickupType(pickupHash: Hash): number;

/**
   * HAS_CLOSEST_OBJECT_OF_TYPE_BEEN_BROKEN
   *
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {number} modelHash
   * @param {any} p5
   * @return {boolean}
   */
declare function HasClosestObjectOfTypeBeenBroken(p0: number, p1: number, p2: number, p3: number, modelHash: Hash, p5: any): boolean;

/**
   * HAS_OBJECT_BEEN_BROKEN
   *
   * @param {any} p0
   * @return {boolean}
   */
declare function HasObjectBeenBroken(p0: any): boolean;

/**
   * HAS_PICKUP_BEEN_COLLECTED
   *
   * @param {number} pickup
   * @return {boolean}
   */
declare function HasPickupBeenCollected(pickup: Pickup): boolean;

/**
   * IS_DOOR_CLOSED
   *
   * @param {number} doorHash
   * @return {boolean}
   */
declare function IsDoorClosed(doorHash: Hash): boolean;

/**
   * IS_DOOR_REGISTERED_WITH_SYSTEM
   *
   * @param {number} doorHash
   * @return {boolean}
   */
declare function IsDoorRegisteredWithSystem(doorHash: Hash): boolean;

/**
   * IS_OBJECT_A_PORTABLE_PICKUP
   *
   * @param {number} object
   * @return {boolean}
   */
declare function IsObjectAPortablePickup(object: number): boolean;

/**
   * IS_OBJECT_VISIBLE
   *
   * @param {number} object
   * @return {boolean}
   */
declare function IsObjectVisible(object: number): boolean;

/**
   * IS_POINT_IN_ANGLED_AREA
   *
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {number} p4
   * @param {number} p5
   * @param {number} p6
   * @param {number} p7
   * @param {number} p8
   * @param {number} p9
   * @param {boolean} p10
   * @param {boolean} p11
   * @return {boolean}
   */
declare function IsPointInAngledArea(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number, p8: number, p9: number, p10: boolean, p11: boolean): boolean;

/**
   * ONLY_CLEAN_UP_OBJECT_WHEN_OUT_OF_RANGE
   * Old name: _MARK_OBJECT_FOR_DELETION
   *
   * @param {number} object
   * @return {void}
   */
declare function OnlyCleanUpObjectWhenOutOfRange(object: number): void;

/**
   * PLACE_OBJECT_ON_GROUND_PROPERLY
   *
   * @param {number} object
   * @param {boolean} p1
   * @return {boolean}
   */
declare function PlaceObjectOnGroundProperly(object: number, p1: boolean): boolean;

/**
   * PREVENT_COLLECTION_OF_PORTABLE_PICKUP
   *
   * @param {number} object
   * @param {boolean} p1
   * @param {boolean} p2
   * @return {void}
   */
declare function PreventCollectionOfPortablePickup(object: number, p1: boolean, p2: boolean): void;

/**
   * REMOVE_ALL_PICKUPS_OF_TYPE
   *
   * @param {number} pickupHash
   * @return {void}
   */
declare function RemoveAllPickupsOfType(pickupHash: Hash): void;

/**
   * REMOVE_DOOR_FROM_SYSTEM
   *
   * @param {number} doorHash
   * @return {void}
   */
declare function RemoveDoorFromSystem(doorHash: Hash): void;

/**
   * REMOVE_PICKUP
   *
   * @param {number} pickup
   * @return {void}
   */
declare function RemovePickup(pickup: Pickup): void;

/**
   * SET_ACTIVATE_OBJECT_PHYSICS_AS_SOON_AS_IT_IS_UNFROZEN
   *
   * @param {number} object
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetActivateObjectPhysicsAsSoonAsItIsUnfrozen(object: number, toggle: boolean): void;

/**
   * SET_CUSTOM_TEXTURES_ON_OBJECT
   *
   * @param {number} object
   * @param {number} txdHash
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function SetCustomTexturesOnObject(object: number, txdHash: Hash, p2: any, p3: any): void;

/**
   * SET_FORCE_OBJECT_THIS_FRAME
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} p3
   * @return {void}
   */
declare function SetForceObjectThisFrame(x: number, y: number, z: number, p3: number): void;

/**
   * SET_LOCAL_PLAYER_CAN_COLLECT_PORTABLE_PICKUPS
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetLocalPlayerCanCollectPortablePickups(toggle: boolean): void;

/**
   * SET_LOCAL_PLAYER_PERMITTED_TO_COLLECT_PICKUPS_WITH_MODEL
   * Maximum amount of pickup models that can be disallowed is 10.
   * 
   * Old name: _SET_LOCAL_PLAYER_CAN_USE_PICKUPS_WITH_THIS_MODEL
   *
   * @param {number} modelHash
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetLocalPlayerPermittedToCollectPickupsWithModel(modelHash: Hash, toggle: boolean): void;

/**
   * SET_MAX_NUM_PORTABLE_PICKUPS_CARRIED_BY_PLAYER
   *
   * @param {number} modelHash
   * @param {number} p1
   * @return {void}
   */
declare function SetMaxNumPortablePickupsCarriedByPlayer(modelHash: Hash, p1: number): void;

/**
   * SET_OBJECT_ALLOW_LOW_LOD_BUOYANCY
   *
   * @param {number} object
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetObjectAllowLowLodBuoyancy(object: number, toggle: boolean): void;

/**
   * SET_OBJECT_PHYSICS_PARAMS
   * Adjust the physics parameters of a prop, or otherwise known as "object". This is useful for simulated gravity.
   * 
   * Other parameters seem to be unknown.
   * 
   * p2: seems to be weight and gravity related. Higher value makes the obj fall faster. Very sensitive?
   * p3: seems similar to p2
   * p4: makes obj fall slower the higher the value
   * p5: similar to p4
   *
   * @param {number} object
   * @param {number} weight
   * @param {number} p2
   * @param {number} p3
   * @param {number} p4
   * @param {number} p5
   * @param {number} gravity
   * @param {number} p7
   * @param {number} p8
   * @param {number} p9
   * @param {number} p10
   * @param {number} buoyancy
   * @return {void}
   */
declare function SetObjectPhysicsParams(object: number, weight: number, p2: number, p3: number, p4: number, p5: number, gravity: number, p7: number, p8: number, p9: number, p10: number, buoyancy: number): void;

/**
   * SET_OBJECT_TAKES_DAMAGE_FROM_COLLIDING_WITH_BUILDINGS
   *
   * @param {number} object
   * @param {boolean} enabled
   * @return {void}
   */
declare function SetObjectTakesDamageFromCollidingWithBuildings(object: number, enabled: boolean): void;

/**
   * SET_OBJECT_TARGETTABLE
   *
   * @param {number} object
   * @param {boolean} targettable
   * @return {void}
   */
declare function SetObjectTargettable(object: number, targettable: boolean): void;

/**
   * SET_OBJECT_TINT_INDEX
   * Alt name: _SET_OBJECT_TINT
   * 
   * Old name: _SET_OBJECT_TEXTURE_VARIATION
   *
   * @param {number} object
   * @param {number} textureVariation
   * @return {void}
   */
declare function SetObjectTintIndex(object: number, textureVariation: number): void;

/**
   * SET_PICKUP_DO_NOT_AUTO_PLACE_ON_GROUND
   *
   * @param {number} pickupObject
   * @return {void}
   */
declare function SetPickupDoNotAutoPlaceOnGround(pickupObject: number): void;

/**
   * SET_PICKUP_GENERATION_RANGE_MULTIPLIER
   *
   * @param {number} multiplier
   * @return {void}
   */
declare function SetPickupGenerationRangeMultiplier(multiplier: number): void;

/**
   * SET_PICKUP_HIDDEN_WHEN_UNCOLLECTABLE
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function SetPickupHiddenWhenUncollectable(p0: any, p1: any): void;

/**
   * SET_PICKUP_NOT_LOOTABLE
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function SetPickupNotLootable(p0: any, p1: any): void;

/**
   * SET_PICKUP_PARTICLE_FX_HIGHLIGHT
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function SetPickupParticleFxHighlight(p0: any, p1: any): void;

/**
   * SET_PICKUP_PARTICLE_FX_SPAWN
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function SetPickupParticleFxSpawn(p0: any, p1: any): void;

/**
   * SET_PICKUP_REGENERATION_TIME
   *
   * @param {number} pickup
   * @param {number} duration
   * @return {void}
   */
declare function SetPickupRegenerationTime(pickup: Pickup, duration: number): void;

/**
   * SET_PICKUP_UNCOLLECTABLE
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function SetPickupUncollectable(p0: any, p1: any): void;

/**
   * SET_STATE_OF_RAYFIRE_MAP_OBJECT
   *
   * @param {number} object
   * @param {number} state
   * @return {void}
   */
declare function SetStateOfRayfireMapObject(object: number, state: number): void;

/**
   * SET_TEAM_PICKUP_OBJECT
   *
   * @param {number} object
   * @param {any} p1
   * @param {boolean} p2
   * @return {void}
   */
declare function SetTeamPickupObject(object: number, p1: any, p2: boolean): void;

/**
   * SLIDE_OBJECT
   *
   * @param {number} object
   * @param {number} toX
   * @param {number} toY
   * @param {number} toZ
   * @param {number} speedX
   * @param {number} speedY
   * @param {number} speedZ
   * @param {boolean} collision
   * @return {boolean}
   */
declare function SlideObject(object: number, toX: number, toY: number, toZ: number, speedX: number, speedY: number, speedZ: number, collision: boolean): boolean;

/**
   * SUPPRESS_PICKUP_REWARD_TYPE
   *
   * @param {number} rewardType
   * @param {boolean} suppress
   * @return {void}
   */
declare function SuppressPickupRewardType(rewardType: number, suppress: boolean): void;

/**
   * TRACK_OBJECT_VISIBILITY
   *
   * @param {number} object
   * @return {void}
   */
declare function TrackObjectVisibility(object: number): void;

/**
   * _0x08C5825A2932EA7B
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x08C5825A2932EA7B(p0: any): any;

/**
   * _0x0943113E02322164
   * Params: p1 = 23 in R* Scripts
   *
   * @param {number} object
   * @param {number} p1
   * @return {any}
   */
declare function N_0x0943113E02322164(object: number, p1: number): any;

/**
   * _0x0C0A373D181BF900
   * something to do with doors lockdown when navmesh is swapping?UPDATE_WORLD_STATE  seems to be for unlocking something
   *
   * @param {number} doorHash
   * @return {void}
   */
declare function N_0x0C0A373D181BF900(doorHash: Hash): void;

/**
   * _0x1F5E07E14A86FAFC
   * _SET_A(MBIENT_PICKUP_?)*
   *
   * @param {boolean} p0
   * @return {void}
   */
declare function N_0x1F5E07E14A86FAFC(p0: boolean): void;

/**
   * _0x20135AF9C10D2A3D
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x20135AF9C10D2A3D(p0: any): any;

/**
   * _0x22031584496CFB70
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x22031584496CFB70(p0: any, p1: any): void;

/**
   * _0x235C863DA77BD88D
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {any}
   */
declare function N_0x235C863DA77BD88D(p0: any, p1: any, p2: any): any;

/**
   * _0x250EBB11E81A10BE
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x250EBB11E81A10BE(p0: any): any;

/**
   * _0x2BF1953C0C21AC88
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x2BF1953C0C21AC88(p0: any): any;

/**
   * _0x3A77DAE8B4FD7586
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x3A77DAE8B4FD7586(p0: any, p1: any): void;

/**
   * _0x3DF1A0A58498E209
   *
   * @param {number} object
   * @param {any} p1
   * @return {void}
   */
declare function N_0x3DF1A0A58498E209(object: number, p1: any): void;

/**
   * _0x3E2616E7EA539480
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x3E2616E7EA539480(p0: any): any;

/**
   * _0x46CBCF0E98A4E156
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x46CBCF0E98A4E156(p0: any, p1: any): void;

/**
   * _0x491439AEF410A2FC
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x491439AEF410A2FC(p0: any): void;

/**
   * _0x4AE07EBA3462C5D5
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x4AE07EBA3462C5D5(p0: any, p1: any): void;

/**
   * _0x4D8611DFE1126478
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x4D8611DFE1126478(p0: any): any;

/**
   * _0x5230BF34EB0EC645
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x5230BF34EB0EC645(p0: any): void;

/**
   * _0x57C242543B7B8FB9
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x57C242543B7B8FB9(p0: any, p1: any): void;

/**
   * _0x58DE624FA7FB0E7F
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x58DE624FA7FB0E7F(p0: any): any;

/**
   * _0x614D0B4533F842D3
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x614D0B4533F842D3(p0: any): any;

/**
   * _0x6579860A5558524A
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x6579860A5558524A(p0: any, p1: any): void;

/**
   * _0x6E2AA80BB0C03728
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0x6E2AA80BB0C03728(p0: any, p1: any): any;

/**
   * _0x7D4411D6736CD295
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0x7D4411D6736CD295(p0: any, p1: any): any;

/**
   * _0x7F458B543006C8FE
   * something to do with doors lockdown when navmesh is swapping? UPDATE_WORLD_STATE, seems to be for locking something
   *
   * @param {number} doorHash
   * @param {number} p1
   * @return {void}
   */
declare function N_0x7F458B543006C8FE(doorHash: Hash, p1: number): void;

/**
   * _0x7FCD49388BC9B775
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x7FCD49388BC9B775(p0: any, p1: any): void;

/**
   * _0x9A74A9CADFA8A598
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x9A74A9CADFA8A598(p0: any): void;

/**
   * _0x9F52AD67D1A91BAD
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0x9F52AD67D1A91BAD(p0: any, p1: any): any;

/**
   * _0xA93F925F1942E434
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xA93F925F1942E434(p0: any, p1: any): void;

/**
   * _0xAAACF33CBF9B990A
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xAAACF33CBF9B990A(p0: any, p1: any): void;

/**
   * _0xACD4F9831DFAD7F5
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xACD4F9831DFAD7F5(p0: any): any;

/**
   * _SET_OBJECT_PROMPT_NAME
   * Not official native name
   *
   * @param {number} object
   * @param {string | number} name
   * @return {void}
   */
declare function SetObjectPromptName(object: number, name: string | number): void;

/**
   * _0xB3B1546D23DF8DE1
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {void}
   */
declare function N_0xB3B1546D23DF8DE1(p0: any, p1: any, p2: any, p3: any, p4: any): void;

/**
   * _0xC07B91B996C1DE89
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xC07B91B996C1DE89(p0: any, p1: any): void;

/**
   * _0xCAAF2BCCFEF37F77
   * _SET_OBJECT_*
   *
   * @param {number} object
   * @param {any} p1
   * @return {void}
   */
declare function N_0xCAAF2BCCFEF37F77(object: number, p1: any): void;

/**
   * _0xCBFBD38F2E0A263B
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xCBFBD38F2E0A263B(p0: any, p1: any): void;

/**
   * _0xCEAB54F4632C6EF6
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xCEAB54F4632C6EF6(p0: any, p1: any): void;

/**
   * _SET_OBJECT_PROMPT_NAME_FROM_GXT_ENTRY
   * Not official native name
   *
   * @param {number} object
   * @param {number} gxtEntryHash
   * @return {void}
   */
declare function SetObjectPromptNameFromGxtEntry(object: number, gxtEntryHash: Hash): void;

/**
   * _0xD91E55B6C005EB09
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0xD91E55B6C005EB09(p0: any, p1: any): any;

/**
   * _0xDE116ECFFDD4B997
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xDE116ECFFDD4B997(p0: any, p1: any): void;

/**
   * _0xDFA1237F5228263F
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xDFA1237F5228263F(p0: any, p1: any): void;

/**
   * _0xE157A8A336C7F04A
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xE157A8A336C7F04A(p0: any, p1: any): void;

/**
   * _0xEBA314768FB35D58
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xEBA314768FB35D58(p0: any): any;

/**
   * _0xF65EDE5D02A7A760
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xF65EDE5D02A7A760(p0: any, p1: any): void;

/**
   * _0xF6E88489B4E6EBE5
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xF6E88489B4E6EBE5(p0: any, p1: any): void;

/**
   * _0xFA99E8E575F2FEF8
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xFA99E8E575F2FEF8(p0: any): any;

/**
   * _ADD_DOOR_TO_SYSTEM_NEW
   * Registers a door, hashes: https://github.com/femga/rdr3_discoveries/tree/master/doorHashes
   *
   * @param {number} doorHash
   * @param {boolean} p1
   * @param {boolean} p2
   * @param {boolean} p3
   * @param {number} threadId
   * @param {number} p5
   * @param {boolean} p6
   * @return {void}
   */
declare function AddDoorToSystemNew(doorHash: Hash, p1: boolean, p2: boolean, p3: boolean, threadId: number, p5: number, p6: boolean): void;

/**
   * _DAMAGE_BONE_ON_PROP
   *
   * @param {number} object
   * @param {number} bone
   * @return {void}
   */
declare function DamageBoneOnProp(object: number, bone: number): void;

/**
   * _DOOR_SYSTEM_CHANGE_SCRIPT_OWNER
   *
   * @param {number} doorHash
   * @return {void}
   */
declare function DoorSystemChangeScriptOwner(doorHash: Hash): void;

/**
   * _DOOR_SYSTEM_FORCE_SHUT
   *
   * @param {number} doorHash
   * @param {boolean} p1
   * @return {void}
   */
declare function DoorSystemForceShut(doorHash: Hash, p1: boolean): void;

/**
   * _DOOR_SYSTEM_GET_AUTOMATIC_RATE
   *
   * @param {number} doorHash
   * @return {number}
   */
declare function DoorSystemGetAutomaticRate(doorHash: Hash): number;

/**
   * _DOOR_SYSTEM_SET_ABLE_TO_CHANGE_OPEN_RATIO_WHILE_LOCKED
   *
   * @param {number} doorHash
   * @param {boolean} p1
   * @return {void}
   */
declare function DoorSystemSetAbleToChangeOpenRatioWhileLocked(doorHash: Hash, p1: boolean): void;

/**
   * _DOOR_SYSTEM_SET_AUTOMATIC_STATE
   * _ALLOW_* - _ATTACH_*
   *
   * @param {number} doorHash
   * @param {boolean} disable
   * @return {void}
   */
declare function DoorSystemSetAutomaticState(doorHash: Hash, disable: boolean): void;

/**
   * _GET_AMMO_TYPE_FROM_PICKUP_TYPE
   *
   * @param {number} pickupHash
   * @return {number}
   */
declare function GetAmmoTypeFromPickupType(pickupHash: Hash): number;

/**
   * _GET_LIGHT_INTENSITY_FROM_OBJECT
   *
   * @param {number} object
   * @return {number}
   */
declare function GetLightIntensityFromObject(object: number): number;

/**
   * _GET_OBJECT_LIGHT_INTENSITY
   * Returns float value to be used with _SET_LIGHT_INTENSITY_FOR_OBJECT
   *
   * @param {number} object
   * @return {number}
   */
declare function GetObjectLightIntensity(object: number): number;

/**
   * _HIDE_PICKUP_OBJECT
   *
   * @param {number} pickupObject
   * @param {boolean} toggle
   * @return {void}
   */
declare function HidePickupObject(pickupObject: number, toggle: boolean): void;

/**
   * _IS_DOOR_REGISTERED_WITH_NETWORK
   *
   * @param {number} doorHash
   * @return {boolean}
   */
declare function IsDoorRegisteredWithNetwork(doorHash: Hash): boolean;

/**
   * _IS_DOOR_REGISTERED_WITH_OWNER
   * Returns true if door is alredy registered with owner
   *
   * @param {number} doorHash
   * @return {boolean}
   */
declare function IsDoorRegisteredWithOwner(doorHash: Hash): boolean;

/**
   * _IS_PICKUP_TYPE_VALID
   *
   * @param {number} pickupHash
   * @return {boolean}
   */
declare function IsPickupTypeValid(pickupHash: Hash): boolean;

/**
   * _MAKE_ITEM_CARRIABLE
   * _PRE* or _Q* or _RE*
   *
   * @param {number} object
   * @return {void}
   */
declare function MakeItemCarriable(object: number): void;

/**
   * _RESET_OBJECT_VELOCITY
   *
   * @param {number} object
   * @return {void}
   */
declare function ResetObjectVelocity(object: number): void;

/**
   * _SET_AMBIENT_PICKUP_LIFETIME
   *
   * @param {number} lifetime
   * @return {void}
   */
declare function SetAmbientPickupLifetime(lifetime: number): void;

/**
   * _SET_AUTO_JUMPABLE_BY_HORSE
   * Sets object as auto-jumpable by horse.
   *
   * @param {number} object
   * @param {boolean} p1
   * @return {void}
   */
declare function SetAutoJumpableByHorse(object: number, p1: boolean): void;

/**
   * _SET_LIGHT_INTENSITY_FOR_OBJECT
   *
   * @param {number} object
   * @param {number} lightIntensity
   * @return {void}
   */
declare function SetLightIntensityForObject(object: number, lightIntensity: number): void;

/**
   * _SET_LIGHT_SCATTERING_DISABLED_FOR_OBJECT
   *
   * @param {number} object
   * @param {boolean} disable
   * @return {void}
   */
declare function SetLightScatteringDisabledForObject(object: number, disable: boolean): void;

/**
   * _SET_LIGHT_TRANSLUCENCY_FOR_OBJECT
   * Params: value = 0.0 - 586.67 (?)
   *
   * @param {number} object
   * @param {number} value
   * @return {void}
   */
declare function SetLightTranslucencyForObject(object: number, value: number): void;

/**
   * _SET_NETWORK_PICKUP_USABLE_FOR_PLAYER
   * Params: p2 controls whether to make pickups usable/collectable or not in networked games
   *
   * @param {number} player
   * @param {number} pickupHash
   * @param {boolean} isUsable
   * @return {void}
   */
declare function SetNetworkPickupUsableForPlayer(player: Player, pickupHash: Hash, isUsable: boolean): void;

/**
   * _SET_NOT_JUMPABLE_BY_HORSE
   * Sets object as not jumpable by horse.
   *
   * @param {number} object
   * @param {boolean} p1
   * @return {void}
   */
declare function SetNotJumpableByHorse(object: number, p1: boolean): void;

/**
   * _SET_OBJECT_BREAK_SCALE
   *
   * @param {number} object
   * @param {number} scale
   * @return {void}
   */
declare function SetObjectBreakScale(object: number, scale: number): void;

/**
   * _SET_OBJECT_BURN_INTENSITY
   *
   * @param {number} object
   * @param {number} intensity
   * @return {void}
   */
declare function SetObjectBurnIntensity(object: number, intensity: number): void;

/**
   * _SET_OBJECT_BURN_LEVEL
   * Seems to mostly have effect on wood-made objects https://imgur.com/a/32oQvOn
   *
   * @param {number} object
   * @param {number} burnLevel
   * @param {boolean} affectAsh
   * @return {void}
   */
declare function SetObjectBurnLevel(object: number, burnLevel: number, affectAsh: boolean): void;

/**
   * _SET_OBJECT_BURN_OPACITY
   *
   * @param {number} object
   * @param {number} opacity
   * @return {void}
   */
declare function SetObjectBurnOpacity(object: number, opacity: number): void;

/**
   * _SET_OBJECT_BURN_SPEED
   * p2 is usually the same as speed parameter
   *
   * @param {number} object
   * @param {number} speed
   * @param {number} p2
   * @return {void}
   */
declare function SetObjectBurnSpeed(object: number, speed: number, p2: number): void;

/**
   * _SET_OBJECT_KICKABLE
   *
   * @param {number} object
   * @param {boolean} kickable
   * @return {void}
   */
declare function SetObjectKickable(object: number, kickable: boolean): void;

/**
   * _SET_OBJECT_TARGETTABLE_2
   *
   * @param {number} object
   * @param {boolean} targettable
   * @return {void}
   */
declare function SetObjectTargettable_2(object: number, targettable: boolean): void;

/**
   * _SET_OBJECT_TARGETTABLE_FOCUS
   * focus on objects like focus on peds, p1 is to enable/disable p2 is to enable/disable focus when you have a weapon out
   *
   * @param {number} object
   * @param {boolean} toggle
   * @param {boolean} weaponLock
   * @return {void}
   */
declare function SetObjectTargettableFocus(object: number, toggle: boolean, weaponLock: boolean): void;

/**
   * _SET_PICKUP_COLLECTABLE_ON_MOUNT
   *
   * @param {number} object
   * @return {void}
   */
declare function SetPickupCollectableOnMount(object: number): void;