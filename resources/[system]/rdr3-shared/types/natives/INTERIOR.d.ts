/**
 * ACTIVATE_INTERIOR_ENTITY_SET
 * https://github.com/femga/rdr3_discoveries/tree/master/interiors/interior_sets
 *
 * @param {number} interior
 * @param {string | number} entitySetName
 * @param {number} p2
 * @return {void}
 */
declare function ActivateInteriorEntitySet(interior: Interior, entitySetName: string | number, p2: number): void;

/**
 * CLEAR_ROOM_FOR_ENTITY
 *
 * @param {number} entity
 * @return {void}
 */
declare function ClearRoomForEntity(entity: Entity): void;

/**
 * CLEAR_ROOM_FOR_GAME_VIEWPORT
 *

 * @return {void}
 */
declare function ClearRoomForGameViewport(): void;

/**
 * DEACTIVATE_INTERIOR_ENTITY_SET
 *
 * @param {number} interior
 * @param {string | number} entitySetName
 * @param {boolean} p2
 * @return {void}
 */
declare function DeactivateInteriorEntitySet(interior: Interior, entitySetName: string | number, p2: boolean): void;

/**
 * DISABLE_INTERIOR
 *
 * @param {number} interior
 * @param {boolean} toggle
 * @return {void}
 */
declare function DisableInterior(interior: Interior, toggle: boolean): void;

/**
 * FORCE_ROOM_FOR_ENTITY
 *
 * @param {number} entity
 * @param {number} interior
 * @param {number} roomHashKey
 * @return {void}
 */
declare function ForceRoomForEntity(entity: Entity, interior: Interior, roomHashKey: Hash): void;

/**
 * FORCE_ROOM_FOR_GAME_VIEWPORT
 *
 * @param {number} interiorId
 * @param {number} roomHashKey
 * @return {void}
 */
declare function ForceRoomForGameViewport(interiorID: number, roomHashKey: Hash): void;

/**
 * GET_INTERIOR_AT_COORDS
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {number}
 */
declare function GetInteriorAtCoords(x: number, y: number, z: number): Interior;

/**
 * GET_INTERIOR_AT_COORDS_WITH_TYPE
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {string | number} interiorType
 * @return {number}
 */
declare function GetInteriorAtCoordsWithType(x: number, y: number, z: number, interiorType: string | number): Interior;

/**
 * GET_INTERIOR_AT_COORDS_WITH_TYPEHASH
 * Hashed version of GET_INTERIOR_AT_COORDS_WITH_TYPE
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} typeHash
 * @return {number}
 */
declare function GetInteriorAtCoordsWithTypehash(x: number, y: number, z: number, typeHash: Hash): Interior;

/**
 * GET_INTERIOR_FROM_COLLISION
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {number}
 */
declare function GetInteriorFromCollision(x: number, y: number, z: number): number;

/**
 * GET_INTERIOR_FROM_ENTITY
 * Returns the handle of the interior that the entity is in. Returns 0 if outside.
 *
 * @param {number} entity
 * @return {number}
 */
declare function GetInteriorFromEntity(entity: Entity): Interior;

/**
 * GET_INTERIOR_FROM_PRIMARY_VIEW
 *

 * @return {number}
 */
declare function GetInteriorFromPrimaryView(): Interior;

/**
 * GET_INTERIOR_LOCATION_AND_NAMEHASH
 *
 * @param {number} interior
 * @return {[Vector3, number]}
 */
declare function GetInteriorLocationAndNamehash(interior: Interior): [Vector3, number];

/**
 * GET_KEY_FOR_ENTITY_IN_ROOM
 * Seems to do the exact same as INTERIOR::GET_ROOM_KEY_FROM_ENTITY
 *
 * @param {number} entity
 * @return {number}
 */
declare function GetKeyForEntityInRoom(entity: Entity): number;

/**
 * GET_ROOM_KEY_FROM_ENTITY
 * Gets the room hash key from the room that the specified entity is in. Each room in every interior has a unique key. Returns 0 if the entity is outside.
 *
 * @param {number} entity
 * @return {number}
 */
declare function GetRoomKeyFromEntity(entity: Entity): number;

/**
 * IS_COLLISION_MARKED_OUTSIDE
 * Returns true if the collision at the specified coords is marked as being outside (false if there's an interior)
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {boolean}
 */
declare function IsCollisionMarkedOutside(x: number, y: number, z: number): boolean;

/**
 * IS_INTERIOR_ENTITY_SET_ACTIVE
 *
 * @param {number} interior
 * @param {string | number} entitySetName
 * @return {boolean}
 */
declare function IsInteriorEntitySetActive(interior: Interior, entitySetName: string | number): boolean;

/**
 * IS_INTERIOR_READY
 *
 * @param {number} interior
 * @return {boolean}
 */
declare function IsInteriorReady(interior: Interior): boolean;

/**
 * IS_INTERIOR_SCENE
 *

 * @return {boolean}
 */
declare function IsInteriorScene(): boolean;

/**
 * IS_VALID_INTERIOR
 *
 * @param {number} interior
 * @return {boolean}
 */
declare function IsValidInterior(interior: Interior): boolean;

/**
 * PIN_INTERIOR_IN_MEMORY
 *
 * @param {number} interior
 * @return {void}
 */
declare function PinInteriorInMemory(interior: Interior): void;

/**
 * RETAIN_ENTITY_IN_INTERIOR
 *
 * @param {number} entity
 * @param {number} interior
 * @return {void}
 */
declare function RetainEntityInInterior(entity: Entity, interior: Interior): void;

/**
 * SET_INTERIOR_IN_USE
 * Actually returns void in IDA but the script header defines a BOOL return type
 *
 * @param {number} interior
 * @return {boolean}
 */
declare function SetInteriorInUse(interior: Interior): boolean;

/**
 * UNPIN_INTERIOR
 * Does something similar to INTERIOR::DISABLE_INTERIOR.
 * 
 * You don't fall through the floor but everything is invisible inside and looks the same as when INTERIOR::DISABLE_INTERIOR is used. Peds behaves normally inside. 
 *
 * @param {number} interior
 * @return {void}
 */
declare function UnpinInterior(interior: Interior): void;

/**
 * _0x2533F2AB0EB9C6F9
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x2533F2AB0EB9C6F9(p0: any, p1: any): void;

/**
 * _0xFE2B3D5500B1B2E4
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0xFE2B3D5500B1B2E4(p0: any, p1: any): void;

/**
 * _GET_INTERIOR_MINIMAP_HASH
 *
 * @param {number} interior
 * @return {number}
 */
declare function GetInteriorMinimapHash(interior: Interior): number;

/**
 * _GET_INTERIOR_POSITION
 *
 * @param {number} interior
 * @return {Vector3}
 */
declare function GetInteriorPosition(interior: Interior): Vector3;

/**
 * _IS_INTERIOR_ENTITY_SET_VALID
 *
 * @param {number} interior
 * @param {string | number} entitySetName
 * @return {boolean}
 */
declare function IsInteriorEntitySetValid(interior: Interior, entitySetName: string | number): boolean;