/**
   * APPLY_FORCE_TO_ENTITY
   *
   * @param {number} entity
   * @param {number} forceFlags
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} offX
   * @param {number} offY
   * @param {number} offZ
   * @param {number} boneIndex
   * @param {boolean} isDirectionRel
   * @param {boolean} ignoreUpVec
   * @param {boolean} isForceRel
   * @param {boolean} p12
   * @param {boolean} p13
   * @return {void}
   */
declare function ApplyForceToEntity(entity: Entity, forceFlags: number, x: number, y: number, z: number, offX: number, offY: number, offZ: number, boneIndex: number, isDirectionRel: boolean, ignoreUpVec: boolean, isForceRel: boolean, p12: boolean, p13: boolean): void;

/**
   * APPLY_FORCE_TO_ENTITY_CENTER_OF_MASS
   * p6/relative - makes the xyz force not relative to world coords, but to something else
   * p7/highForce - setting false will make the force really low
   *
   * @param {number} entity
   * @param {number} forceType
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} component
   * @param {boolean} isDirectionRel
   * @param {boolean} isForceRel
   * @param {boolean} p8
   * @return {void}
   */
declare function ApplyForceToEntityCenterOfMass(entity: Entity, forceType: number, x: number, y: number, z: number, component: number, isDirectionRel: boolean, isForceRel: boolean, p8: boolean): void;

/**
   * ATTACH_ENTITY_TO_ENTITY
   * Attaches entity1 to bone (boneIndex) of entity2.
   * 
   * boneIndex - this is different to boneID, use GET_PED_BONE_INDEX to get the index from the ID. use the index for attaching to specific bones. entity1 will be attached to entity2's centre if bone index given doesn't correspond to bone indexes for that entity type.
   * https://github.com/femga/rdr3_discoveries/tree/master/boneNames
   * 
   * useSoftPinning - if set to false attached entity will not detach when fixed
   * collision - controls collision between the two entities (FALSE disables collision).
   * isPed - pitch doesn't work when false and roll will only work on negative numbers (only peds)
   * vertexIndex - position of vertex
   * fixedRot - if false it ignores entity vector
   *
   * @param {number} entity1
   * @param {number} entity2
   * @param {number} boneIndex
   * @param {number} xPos
   * @param {number} yPos
   * @param {number} zPos
   * @param {number} xRot
   * @param {number} yRot
   * @param {number} zRot
   * @param {boolean} p9
   * @param {boolean} useSoftPinning
   * @param {boolean} collision
   * @param {boolean} isPed
   * @param {number} vertexIndex
   * @param {boolean} fixedRot
   * @param {boolean} p15
   * @param {boolean} p16
   * @return {void}
   */
declare function AttachEntityToEntity(entity1: Entity, entity2: Entity, boneIndex: number, xPos: number, yPos: number, zPos: number, xRot: number, yRot: number, zRot: number, p9: boolean, useSoftPinning: boolean, collision: boolean, isPed: boolean, vertexIndex: number, fixedRot: boolean, p15: boolean, p16: boolean): void;

/**
   * ATTACH_ENTITY_TO_ENTITY_PHYSICALLY
   *
   * @param {number} entity1
   * @param {number} entity2
   * @param {number} p2
   * @param {number} boneIndex
   * @param {number} offsetX
   * @param {number} offsetY
   * @param {number} offsetZ
   * @param {number} p7
   * @param {number} p8
   * @param {number} p9
   * @param {number} p10
   * @param {number} p11
   * @param {number} p12
   * @param {number} p13
   * @param {boolean} p14
   * @param {boolean} p15
   * @param {boolean} p16
   * @param {boolean} p17
   * @param {number} p18
   * @param {boolean} p19
   * @param {number} p20
   * @param {number} p21
   * @return {void}
   */
declare function AttachEntityToEntityPhysically(entity1: Entity, entity2: Entity, p2: number, boneIndex: number, offsetX: number, offsetY: number, offsetZ: number, p7: number, p8: number, p9: number, p10: number, p11: number, p12: number, p13: number, p14: boolean, p15: boolean, p16: boolean, p17: boolean, p18: number, p19: boolean, p20: number, p21: number): void;

/**
   * CLEAR_ENTITY_LAST_DAMAGE_ENTITY
   *
   * @param {number} entity
   * @return {void}
   */
declare function ClearEntityLastDamageEntity(entity: Entity): void;

/**
   * CREATE_FORCED_OBJECT
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {any} p3
   * @param {number} modelHash
   * @param {boolean} p5
   * @return {void}
   */
declare function CreateForcedObject(x: number, y: number, z: number, p3: any, modelHash: Hash, p5: boolean): void;

/**
   * CREATE_MODEL_HIDE
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @param {number} model
   * @param {boolean} p5
   * @return {void}
   */
declare function CreateModelHide(x: number, y: number, z: number, radius: number, model: Hash, p5: boolean): void;

/**
   * CREATE_MODEL_HIDE_EXCLUDING_SCRIPT_OBJECTS
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @param {number} model
   * @param {boolean} p5
   * @return {void}
   */
declare function CreateModelHideExcludingScriptObjects(x: number, y: number, z: number, radius: number, model: Hash, p5: boolean): void;

/**
   * CREATE_MODEL_SWAP
   * Only works with objects!
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @param {number} originalModel
   * @param {number} newModel
   * @param {boolean} p6
   * @return {void}
   */
declare function CreateModelSwap(x: number, y: number, z: number, radius: number, originalModel: Hash, newModel: Hash, p6: boolean): void;

/**
   * DELETE_ENTITY
   * Deletes the specified entity, then sets the handle pointed to by the pointer to NULL.
   *
   * @param {number} entity
   * @return {void}
   */
declare function DeleteEntity(entity: Entity): void;

/**
   * DETACH_ENTITY
   *
   * @param {number} entity
   * @param {boolean} p1
   * @param {boolean} collision
   * @return {void}
   */
declare function DetachEntity(entity: Entity, p1: boolean, collision: boolean): void;

/**
   * DOES_ENTITY_BELONG_TO_THIS_SCRIPT
   *
   * @param {number} entity
   * @param {boolean} p1
   * @return {boolean}
   */
declare function DoesEntityBelongToThisScript(entity: Entity, p1: boolean): boolean;

/**
   * DOES_ENTITY_EXIST
   * Checks if the Entity exists
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function DoesEntityExist(entity: Entity): boolean;

/**
   * DOES_ENTITY_HAVE_DRAWABLE
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function DoesEntityHaveDrawable(entity: Entity): boolean;

/**
   * DOES_ENTITY_HAVE_PHYSICS
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function DoesEntityHavePhysics(entity: Entity): boolean;

/**
   * FIND_ANIM_EVENT_PHASE
   *
   * @param {string | number} animDictionary
   * @param {string | number} animName
   * @param {string | number} p2
   * @param {DataView} p3
   * @param {DataView} p4
   * @return {boolean}
   */
declare function FindAnimEventPhase(animDictionary: string | number, animName: string | number, p2: string | number, p3: DataView, p4: DataView): boolean;

/**
   * FORCE_ENTITY_AI_AND_ANIMATION_UPDATE
   *
   * @param {number} entity
   * @param {boolean} p1
   * @return {void}
   */
declare function ForceEntityAiAndAnimationUpdate(entity: Entity, p1: boolean): void;

/**
   * FREEZE_ENTITY_POSITION
   *
   * @param {number} entity
   * @param {boolean} toggle
   * @return {void}
   */
declare function FreezeEntityPosition(entity: Entity, toggle: boolean): void;

/**
   * GET_ANIM_DURATION
   *
   * @param {string | number} animDict
   * @param {string | number} animName
   * @return {number}
   */
declare function GetAnimDuration(animDict: string | number, animName: string | number): number;

/**
   * GET_CARRIABLE_ENTITY_STATE
   * enum eCarriableState
   * {
   *   CARRIABLE_STATE_NONE,
   *   CARRIABLE_STATE_TRANSITIONING_TO_HOGTIED,
   *   CARRIABLE_STATE_CARRIABLE_INTRO,
   *   CARRIABLE_STATE_CARRIABLE,
   *   CARRIABLE_STATE_BEING_PICKED_UP_FROM_GROUND,
   *   CARRIABLE_STATE_CARRIED_BY_HUMAN,
   *   CARRIABLE_STATE_BEING_PLACED_ON_GROUND,
   *   CARRIABLE_STATE_CARRIED_BY_MOUNT,
   *   CARRIABLE_STATE_BEING_PLACED_ON_MOUNT,
   *   CARRIABLE_STATE_BEING_PICKED_UP_FROM_MOUNT,
   *   CARRIABLE_STATE_BEING_CUT_FREE,
   *   CARRIABLE_STATE_BEING_PLACED_ON_GROUND_ESCAPE,
   *   CARRIABLE_STATE_BEING_PLACED_IN_VEHICLE
   * };
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetCarriableEntityState(entity: Entity): number;

/**
   * GET_ENTITY_ALPHA
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetEntityAlpha(entity: Entity): number;

/**
   * GET_ENTITY_ATTACHED_TO
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetEntityAttachedTo(entity: Entity): Entity;

/**
   * GET_ENTITY_BONE_INDEX_BY_NAME
   *
   * @param {number} entity
   * @param {string | number} boneName
   * @return {number}
   */
declare function GetEntityBoneIndexByName(entity: Entity, boneName: string | number): number;

/**
   * GET_ENTITY_COLLISION_DISABLED
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function GetEntityCollisionDisabled(entity: Entity): boolean;

/**
   * GET_ENTITY_COORDS
   * Gets the current coordinates for a specified entity.
   * `entity` = The entity to get the coordinates from.
   * `alive` = Unused by the game, potentially used by debug builds in order to assert whether or not an entity was alive.
   * 
   * If entity is a ped and it's in a vehicle or on a mount the coords of that entity are returned. Set 'realCoords' to true when you need the true ped coords.
   *
   * @param {number} entity
   * @param {boolean} alive
   * @param {boolean} realCoords
   * @return {Vector3}
   */
declare function GetEntityCoords(entity: Entity, alive: boolean, realCoords: boolean): Vector3;

/**
   * GET_ENTITY_FORWARD_VECTOR
   * Gets the entity's forward vector in XY(Z) eulers.
   *
   * @param {number} entity
   * @return {Vector3}
   */
declare function GetEntityForwardVector(entity: Entity): Vector3;

/**
   * GET_ENTITY_FORWARD_X
   * Gets the X-component of the entity's forward vector.
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetEntityForwardX(entity: Entity): number;

/**
   * GET_ENTITY_FORWARD_Y
   * Gets the Y-component of the entity's forward vector.
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetEntityForwardY(entity: Entity): number;

/**
   * GET_ENTITY_HEADING
   * Returns the heading of the entity in degrees. Also know as the "Yaw" of an entity.
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetEntityHeading(entity: Entity): number;

/**
   * GET_ENTITY_HEALTH
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetEntityHealth(entity: Entity): number;

/**
   * GET_ENTITY_HEIGHT
   *
   * @param {number} entity
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {boolean} atTop
   * @param {boolean} inWorldCoords
   * @return {number}
   */
declare function GetEntityHeight(entity: Entity, X: number, Y: number, Z: number, atTop: boolean, inWorldCoords: boolean): number;

/**
   * GET_ENTITY_HEIGHT_ABOVE_GROUND
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetEntityHeightAboveGround(entity: Entity): number;

/**
   * GET_ENTITY_LOD_DIST
   * Returns the LOD distance of an entity.
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetEntityLodDist(entity: Entity): number;

/**
   * GET_ENTITY_MATRIX
   *
   * @param {number} entity
   * @return {[Vector3, Vector3, Vector3, Vector3]}
   */
declare function GetEntityMatrix(entity: Entity): [Vector3, Vector3, Vector3, Vector3];

/**
   * GET_ENTITY_MAX_HEALTH
   *
   * @param {number} entity
   * @param {boolean} p1
   * @return {number}
   */
declare function GetEntityMaxHealth(entity: Entity, p1: boolean): number;

/**
   * GET_ENTITY_MODEL
   * Returns the model hash from the entity
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetEntityModel(entity: Entity): number;

/**
   * GET_ENTITY_PITCH
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetEntityPitch(entity: Entity): number;

/**
   * GET_ENTITY_POPULATION_TYPE
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetEntityPopulationType(entity: Entity): number;

/**
   * GET_ENTITY_ROLL
   * Displays the current ROLL axis of the entity [-180.0000/180.0000+]
   * (Sideways Roll) such as a vehicle tipped on its side
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetEntityRoll(entity: Entity): number;

/**
   * GET_ENTITY_ROTATION
   *
   * @param {number} entity
   * @param {number} rotationOrder
   * @return {Vector3}
   */
declare function GetEntityRotation(entity: Entity, rotationOrder: number): Vector3;

/**
   * GET_ENTITY_SPEED
   * Result is in meters per second (m/s)
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetEntitySpeed(entity: Entity): number;

/**
   * GET_ENTITY_SPEED_VECTOR
   *
   * @param {number} entity
   * @param {boolean} relative
   * @return {Vector3}
   */
declare function GetEntitySpeedVector(entity: Entity, relative: boolean): Vector3;

/**
   * GET_ENTITY_SUBMERGED_LEVEL
   * Get how much of the entity is submerged.  1.0f is whole entity.
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetEntitySubmergedLevel(entity: Entity): number;

/**
   * GET_ENTITY_TYPE
   * Returns entityType: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/eEntityType
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetEntityType(entity: Entity): number;

/**
   * GET_ENTITY_UPRIGHT_VALUE
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetEntityUprightValue(entity: Entity): number;

/**
   * GET_ENTITY_VELOCITY
   *
   * @param {number} entity
   * @param {number} p1
   * @return {Vector3}
   */
declare function GetEntityVelocity(entity: Entity, p1: number): Vector3;

/**
   * GET_IS_ANIMAL
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function GetIsAnimal(entity: Entity): boolean;

/**
   * GET_MATCHING_ENTITIES
   *
   * @param {number} volume
   * @param {number} itemSet
   * @param {number} entityType
   * @param {any} p3
   * @param {number} p4
   * @param {string | number} p5
   * @return {number}
   */
declare function GetMatchingEntities(volume: Volume, itemSet: ItemSet, entityType: number, p3: any, p4: Hash, p5: string | number): number;

/**
   * GET_NEAREST_PARTICIPANT_TO_ENTITY
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetNearestParticipantToEntity(entity: Entity): Player;

/**
   * GET_NEAREST_PLAYER_TO_ENTITY
   *
   * @param {number} entity
   * @param {number} playerPedToIgnore
   * @param {number} flags
   * @return {number}
   */
declare function GetNearestPlayerToEntity(entity: Entity, playerPedToIgnore: Ped, flags: number): Player;

/**
   * GET_NEAREST_PLAYER_TO_ENTITY_ON_TEAM
   *
   * @param {number} entity
   * @param {number} team
   * @param {number} playerPedToIgnore
   * @param {number} flags
   * @return {number}
   */
declare function GetNearestPlayerToEntityOnTeam(entity: Entity, team: number, playerPedToIgnore: Ped, flags: number): Player;

/**
   * GET_OBJECT_INDEX_FROM_ENTITY_INDEX
   * Simply returns whatever is passed to it (Regardless of whether the handle is valid or not).
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetObjectIndexFromEntityIndex(entity: Entity): number;

/**
   * GET_OFFSET_FROM_ENTITY_GIVEN_WORLD_COORDS
   *
   * @param {number} entity
   * @param {number} posX
   * @param {number} posY
   * @param {number} posZ
   * @return {Vector3}
   */
declare function GetOffsetFromEntityGivenWorldCoords(entity: Entity, posX: number, posY: number, posZ: number): Vector3;

/**
   * GET_OFFSET_FROM_ENTITY_IN_WORLD_COORDS
   * Offset values are relative to the entity.
   * 
   * x = left/right
   * y = forward/backward
   * z = up/down
   *
   * @param {number} entity
   * @param {number} offsetX
   * @param {number} offsetY
   * @param {number} offsetZ
   * @return {Vector3}
   */
declare function GetOffsetFromEntityInWorldCoords(entity: Entity, offsetX: number, offsetY: number, offsetZ: number): Vector3;

/**
   * GET_PED_INDEX_FROM_ENTITY_INDEX
   * Simply returns whatever is passed to it (Regardless of whether the handle is valid or not).
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetPedIndexFromEntityIndex(entity: Entity): Ped;

/**
   * GET_VEHICLE_INDEX_FROM_ENTITY_INDEX
   * Simply returns whatever is passed to it (Regardless of whether the handle is valid or not).
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetVehicleIndexFromEntityIndex(entity: Entity): Vehicle;

/**
   * GET_WORLD_POSITION_OF_ENTITY_BONE
   * Returns the coordinates of an entity-bone.
   * https://github.com/femga/rdr3_discoveries/tree/master/boneNames
   *
   * @param {number} entity
   * @param {number} boneIndex
   * @return {Vector3}
   */
declare function GetWorldPositionOfEntityBone(entity: Entity, boneIndex: number): Vector3;

/**
   * HAS_ANIM_EVENT_FIRED
   *
   * @param {number} entity
   * @param {number} actionHash
   * @return {boolean}
   */
declare function HasAnimEventFired(entity: Entity, actionHash: Hash): boolean;

/**
   * HAS_COLLISION_LOADED_AROUND_ENTITY
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function HasCollisionLoadedAroundEntity(entity: Entity): boolean;

/**
   * HAS_COLLISION_LOADED_AROUND_POSITION
   * Old name: _HAS_COLLISION_LOADED_AT_COORDS
   *
   * @param {number} xPos
   * @param {number} yPos
   * @param {number} zPos
   * @return {boolean}
   */
declare function HasCollisionLoadedAroundPosition(xPos: number, yPos: number, zPos: number): boolean;

/**
   * HAS_ENTITY_ANIM_FINISHED
   *
   * @param {number} entity
   * @param {string | number} animDict
   * @param {string | number} animName
   * @param {number} p3
   * @return {boolean}
   */
declare function HasEntityAnimFinished(entity: Entity, animDict: string | number, animName: string | number, p3: number): boolean;

/**
   * HAS_ENTITY_BEEN_DAMAGED_BY_ANY_OBJECT
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function HasEntityBeenDamagedByAnyObject(entity: Entity): boolean;

/**
   * HAS_ENTITY_BEEN_DAMAGED_BY_ANY_PED
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function HasEntityBeenDamagedByAnyPed(entity: Entity): boolean;

/**
   * HAS_ENTITY_BEEN_DAMAGED_BY_ANY_VEHICLE
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function HasEntityBeenDamagedByAnyVehicle(entity: Entity): boolean;

/**
   * HAS_ENTITY_BEEN_DAMAGED_BY_ENTITY
   *
   * @param {number} entity1
   * @param {number} entity2
   * @param {boolean} p2
   * @param {boolean} p3
   * @return {boolean}
   */
declare function HasEntityBeenDamagedByEntity(entity1: Entity, entity2: Entity, p2: boolean, p3: boolean): boolean;

/**
   * HAS_ENTITY_CLEAR_LOS_TO_COORD
   *
   * @param {number} entity
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} flags
   * @return {boolean}
   */
declare function HasEntityClearLosToCoord(entity: Entity, x: number, y: number, z: number, flags: number): boolean;

/**
   * HAS_ENTITY_CLEAR_LOS_TO_ENTITY
   *
   * @param {number} entity1
   * @param {number} entity2
   * @param {number} traceType
   * @return {boolean}
   */
declare function HasEntityClearLosToEntity(entity1: Entity, entity2: Entity, traceType: number): boolean;

/**
   * HAS_ENTITY_CLEAR_LOS_TO_ENTITY_IN_FRONT
   * Has the entity1 got a clear line of sight to the other entity2 from the direction entity1 is facing.
   *
   * @param {number} entity1
   * @param {number} entity2
   * @param {number} traceType
   * @return {boolean}
   */
declare function HasEntityClearLosToEntityInFront(entity1: Entity, entity2: Entity, traceType: number): boolean;

/**
   * HAS_ENTITY_COLLIDED_WITH_ANYTHING
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function HasEntityCollidedWithAnything(entity: Entity): boolean;

/**
   * IS_AN_ENTITY
   *
   * @param {number} handle
   * @return {boolean}
   */
declare function IsAnEntity(handle: ScrHandle): boolean;

/**
   * IS_ENTITY_AN_OBJECT
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function IsEntityAnObject(entity: Entity): boolean;

/**
   * IS_ENTITY_ATTACHED
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function IsEntityAttached(entity: Entity): boolean;

/**
   * IS_ENTITY_ATTACHED_TO_ANY_OBJECT
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function IsEntityAttachedToAnyObject(entity: Entity): boolean;

/**
   * IS_ENTITY_ATTACHED_TO_ANY_PED
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function IsEntityAttachedToAnyPed(entity: Entity): boolean;

/**
   * IS_ENTITY_ATTACHED_TO_ANY_VEHICLE
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function IsEntityAttachedToAnyVehicle(entity: Entity): boolean;

/**
   * IS_ENTITY_ATTACHED_TO_ENTITY
   *
   * @param {number} from
   * @param {number} to
   * @return {boolean}
   */
declare function IsEntityAttachedToEntity(from: Entity, to: Entity): boolean;

/**
   * IS_ENTITY_AT_COORD
   * Checks if entity is within x/y/zSize distance of x/y/z. 
   * 
   * Last three are unknown ints, almost always p7 = 0, p8 = 1, p9 = 0
   *
   * @param {number} entity
   * @param {number} xPos
   * @param {number} yPos
   * @param {number} zPos
   * @param {number} xSize
   * @param {number} ySize
   * @param {number} zSize
   * @param {boolean} p7
   * @param {boolean} p8
   * @param {number} p9
   * @return {boolean}
   */
declare function IsEntityAtCoord(entity: Entity, xPos: number, yPos: number, zPos: number, xSize: number, ySize: number, zSize: number, p7: boolean, p8: boolean, p9: number): boolean;

/**
   * IS_ENTITY_AT_ENTITY
   * Checks if entity1 is within the box defined by x/y/zSize of entity2.
   * 
   * Last three parameters are almost always p5 = 0, p6 = 1, p7 = 0
   *
   * @param {number} entity1
   * @param {number} entity2
   * @param {number} xSize
   * @param {number} ySize
   * @param {number} zSize
   * @param {boolean} p5
   * @param {boolean} p6
   * @param {number} p7
   * @return {boolean}
   */
declare function IsEntityAtEntity(entity1: Entity, entity2: Entity, xSize: number, ySize: number, zSize: number, p5: boolean, p6: boolean, p7: number): boolean;

/**
   * IS_ENTITY_A_MISSION_ENTITY
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function IsEntityAMissionEntity(entity: Entity): boolean;

/**
   * IS_ENTITY_A_PED
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function IsEntityAPed(entity: Entity): boolean;

/**
   * IS_ENTITY_A_VEHICLE
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function IsEntityAVehicle(entity: Entity): boolean;

/**
   * IS_ENTITY_DEAD
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function IsEntityDead(entity: Entity): boolean;

/**
   * IS_ENTITY_IN_AIR
   *
   * @param {number} entity
   * @param {any} p1
   * @return {boolean}
   */
declare function IsEntityInAir(entity: Entity, p1: any): boolean;

/**
   * IS_ENTITY_IN_ANGLED_AREA
   * Creates a spherical cone at origin that extends to surface with the angle specified. Then returns true if the entity is inside the spherical cone
   * 
   * Angle is measured in degrees.
   *
   * @param {number} entity
   * @param {number} originX
   * @param {number} originY
   * @param {number} originZ
   * @param {number} edgeX
   * @param {number} edgeY
   * @param {number} edgeZ
   * @param {number} angle
   * @param {boolean} p8
   * @param {boolean} p9
   * @param {any} p10
   * @return {boolean}
   */
declare function IsEntityInAngledArea(entity: Entity, originX: number, originY: number, originZ: number, edgeX: number, edgeY: number, edgeZ: number, angle: number, p8: boolean, p9: boolean, p10: any): boolean;

/**
   * IS_ENTITY_IN_AREA
   *
   * @param {number} entity
   * @param {number} x1
   * @param {number} y1
   * @param {number} z1
   * @param {number} x2
   * @param {number} y2
   * @param {number} z2
   * @param {boolean} p7
   * @param {boolean} p8
   * @param {any} p9
   * @return {boolean}
   */
declare function IsEntityInArea(entity: Entity, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, p7: boolean, p8: boolean, p9: any): boolean;

/**
   * IS_ENTITY_IN_VOLUME
   *
   * @param {number} entity
   * @param {number} volume
   * @param {boolean} p2
   * @param {number} p3
   * @return {boolean}
   */
declare function IsEntityInVolume(entity: Entity, volume: ScrHandle, p2: boolean, p3: number): boolean;

/**
   * IS_ENTITY_IN_WATER
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function IsEntityInWater(entity: Entity): boolean;

/**
   * IS_ENTITY_OCCLUDED
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function IsEntityOccluded(entity: Entity): boolean;

/**
   * IS_ENTITY_ON_SCREEN
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function IsEntityOnScreen(entity: Entity): boolean;

/**
   * IS_ENTITY_PLAYING_ANIM
   *
   * @param {number} entity
   * @param {string | number} animDict
   * @param {string | number} animName
   * @param {number} animType
   * @return {boolean}
   */
declare function IsEntityPlayingAnim(entity: Entity, animDict: string | number, animName: string | number, animType: number): boolean;

/**
   * IS_ENTITY_STATIC
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function IsEntityStatic(entity: Entity): boolean;

/**
   * IS_ENTITY_TOUCHING_ENTITY
   *
   * @param {number} entity
   * @param {number} targetEntity
   * @return {boolean}
   */
declare function IsEntityTouchingEntity(entity: Entity, targetEntity: Entity): boolean;

/**
   * IS_ENTITY_TOUCHING_MODEL
   *
   * @param {number} entity
   * @param {number} modelHash
   * @return {boolean}
   */
declare function IsEntityTouchingModel(entity: Entity, modelHash: Hash): boolean;

/**
   * IS_ENTITY_UPRIGHT
   *
   * @param {number} entity
   * @param {number} angle
   * @return {boolean}
   */
declare function IsEntityUpright(entity: Entity, angle: number): boolean;

/**
   * IS_ENTITY_UPSIDEDOWN
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function IsEntityUpsidedown(entity: Entity): boolean;

/**
   * IS_ENTITY_VISIBLE
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function IsEntityVisible(entity: Entity): boolean;

/**
   * IS_ENTITY_VISIBLE_TO_SCRIPT
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function IsEntityVisibleToScript(entity: Entity): boolean;

/**
   * IS_ENTITY_WAITING_FOR_WORLD_COLLISION
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function IsEntityWaitingForWorldCollision(entity: Entity): boolean;

/**
   * IS_MAP_ENTITY_PINNED
   *
   * @param {any} p0
   * @return {boolean}
   */
declare function IsMapEntityPinned(p0: any): boolean;

/**
   * PIN_CLOSEST_MAP_ENTITY
   *
   * @param {number} modelHash
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} flags
   * @return {any}
   */
declare function PinClosestMapEntity(modelHash: Hash, x: number, y: number, z: number, flags: number): any;

/**
   * PLACE_ENTITY_ON_GROUND_PROPERLY
   *
   * @param {number} entity
   * @param {boolean} p1
   * @return {boolean}
   */
declare function PlaceEntityOnGroundProperly(entity: Entity, p1: boolean): boolean;

/**
   * PLAY_ENTITY_ANIM
   * https://github.com/femga/rdr3_discoveries/tree/master/animations
   *
   * @param {number} entity
   * @param {string | number} animName
   * @param {string | number} animDict
   * @param {number} p3
   * @param {boolean} loop
   * @param {boolean} stayInAnim
   * @param {boolean} p6
   * @param {number} delta
   * @param {any} bitset
   * @return {boolean}
   */
declare function PlayEntityAnim(entity: Entity, animName: string | number, animDict: string | number, p3: number, loop: boolean, stayInAnim: boolean, p6: boolean, delta: number, bitset: any): boolean;

/**
   * REMOVE_FORCED_OBJECT
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {void}
   */
declare function RemoveForcedObject(p0: any, p1: any, p2: any, p3: any, p4: any): void;

/**
   * REMOVE_MODEL_HIDE
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @return {void}
   */
declare function RemoveModelHide(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;

/**
   * REMOVE_MODEL_SWAP
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @param {number} originalModel
   * @param {number} newModel
   * @param {boolean} p6
   * @return {void}
   */
declare function RemoveModelSwap(x: number, y: number, z: number, radius: number, originalModel: Hash, newModel: Hash, p6: boolean): void;

/**
   * RESET_ENTITY_ALPHA
   *
   * @param {number} entity
   * @return {void}
   */
declare function ResetEntityAlpha(entity: Entity): void;

/**
   * SCRIPT_OVERRIDE_ENTITY_LOOT_TABLE_PERMANENT
   * Sets the loot table an entity will carry. Returns true if loot table has been successfully set. Returns false if entity is not a ped or object.
   * https://github.com/femga/rdr3_discoveries/blob/master/AI/EVENTS/loot_rewards.lua
   *
   * @param {number} entity
   * @param {number} lootTable
   * @return {boolean}
   */
declare function ScriptOverrideEntityLootTablePermanent(entity: Entity, lootTable: Hash): boolean;

/**
   * SET_CAN_AUTO_VAULT_ON_ENTITY
   *
   * @param {number} entity
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetCanAutoVaultOnEntity(entity: Entity, toggle: boolean): void;

/**
   * SET_CAN_CLIMB_ON_ENTITY
   *
   * @param {number} entity
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetCanClimbOnEntity(entity: Entity, toggle: boolean): void;

/**
   * SET_ENTITY_ALPHA
   * skin - everything alpha except skin
   * Set entity alpha level. Ranging from 0 to 255 but changes occur after every 20 percent (after every 51).
   *
   * @param {number} entity
   * @param {number} alphaLevel
   * @param {boolean} skin
   * @return {void}
   */
declare function SetEntityAlpha(entity: Entity, alphaLevel: number, skin: boolean): void;

/**
   * SET_ENTITY_ALWAYS_PRERENDER
   *
   * @param {number} entity
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetEntityAlwaysPrerender(entity: Entity, toggle: boolean): void;

/**
   * SET_ENTITY_AS_MISSION_ENTITY
   * Makes the specified entity (ped, vehicle or object) persistent. Persistent entities will not automatically be removed by the engine.
   *
   * @param {number} entity
   * @param {boolean} p1
   * @param {boolean} p2
   * @return {void}
   */
declare function SetEntityAsMissionEntity(entity: Entity, p1: boolean, p2: boolean): void;

/**
   * SET_ENTITY_AS_NO_LONGER_NEEDED
   * Marks the specified entity (ped, vehicle or object) as no longer needed.
   * Entities marked as no longer needed, will be deleted as the engine sees fit.
   *
   * @param {number} entity
   * @return {void}
   */
declare function SetEntityAsNoLongerNeeded(entity: Entity): void;

/**
   * SET_ENTITY_CAN_BE_DAMAGED
   *
   * @param {number} entity
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetEntityCanBeDamaged(entity: Entity, toggle: boolean): void;

/**
   * SET_ENTITY_CAN_BE_DAMAGED_BY_RELATIONSHIP_GROUP
   *
   * @param {number} entity
   * @param {boolean} bCanBeDamaged
   * @param {number} relGroup
   * @return {void}
   */
declare function SetEntityCanBeDamagedByRelationshipGroup(entity: Entity, bCanBeDamaged: boolean, relGroup: Hash): void;

/**
   * SET_ENTITY_CAN_BE_TARGETED_WITHOUT_LOS
   * Sets whether the entity can be targeted without being in line-of-sight.
   *
   * @param {number} entity
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetEntityCanBeTargetedWithoutLos(entity: Entity, toggle: boolean): void;

/**
   * SET_ENTITY_COLLISION
   *
   * @param {number} entity
   * @param {boolean} toggle
   * @param {boolean} keepPhysics
   * @return {void}
   */
declare function SetEntityCollision(entity: Entity, toggle: boolean, keepPhysics: boolean): void;

/**
   * SET_ENTITY_COMPLETELY_DISABLE_COLLISION
   *
   * @param {number} entity
   * @param {boolean} toggle
   * @param {boolean} keepPhysics
   * @return {void}
   */
declare function SetEntityCompletelyDisableCollision(entity: Entity, toggle: boolean, keepPhysics: boolean): void;

/**
   * SET_ENTITY_COORDS
   *
   * @param {number} entity
   * @param {number} xPos
   * @param {number} yPos
   * @param {number} zPos
   * @param {boolean} xAxis
   * @param {boolean} yAxis
   * @param {boolean} zAxis
   * @param {boolean} clearArea
   * @return {void}
   */
declare function SetEntityCoords(entity: Entity, xPos: number, yPos: number, zPos: number, xAxis: boolean, yAxis: boolean, zAxis: boolean, clearArea: boolean): void;

/**
   * SET_ENTITY_COORDS_NO_OFFSET
   * Axis - Invert Axis Flags
   *
   * @param {number} entity
   * @param {number} xPos
   * @param {number} yPos
   * @param {number} zPos
   * @param {boolean} xAxis
   * @param {boolean} yAxis
   * @param {boolean} zAxis
   * @return {void}
   */
declare function SetEntityCoordsNoOffset(entity: Entity, xPos: number, yPos: number, zPos: number, xAxis: boolean, yAxis: boolean, zAxis: boolean): void;

/**
   * SET_ENTITY_DYNAMIC
   *
   * @param {number} entity
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetEntityDynamic(entity: Entity, toggle: boolean): void;

/**
   * SET_ENTITY_HAS_GRAVITY
   *
   * @param {number} entity
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetEntityHasGravity(entity: Entity, toggle: boolean): void;

/**
   * SET_ENTITY_HEADING
   *
   * @param {number} entity
   * @param {number} heading
   * @return {void}
   */
declare function SetEntityHeading(entity: Entity, heading: number): void;

/**
   * SET_ENTITY_HEALTH
   * Sets the entity's health. healthAmount sets the health value to that, and sets the maximum health core value. Setting healthAmount to 0 will kill the entity. entityKilledBy parameter can also be 0
   *
   * @param {number} entity
   * @param {number} healthAmount
   * @param {number} entityKilledBy
   * @return {void}
   */
declare function SetEntityHealth(entity: Entity, healthAmount: number, entityKilledBy: Entity): void;

/**
   * SET_ENTITY_INVINCIBLE
   * Sets a ped or an object totally invincible. It doesn't take any kind of damage. Peds will not ragdoll on explosions.
   *
   * @param {number} entity
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetEntityInvincible(entity: Entity, toggle: boolean): void;

/**
   * SET_ENTITY_IS_TARGET_PRIORITY
   *
   * @param {number} entity
   * @param {boolean} p1
   * @param {number} p2
   * @return {void}
   */
declare function SetEntityIsTargetPriority(entity: Entity, p1: boolean, p2: number): void;

/**
   * SET_ENTITY_LOAD_COLLISION_FLAG
   *
   * @param {number} entity
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetEntityLoadCollisionFlag(entity: Entity, toggle: boolean): void;

/**
   * SET_ENTITY_LOD_DIST
   * LOD distance can be 0 to 0xFFFF (higher values will result in 0xFFFF) as it is actually stored as a 16-bit value (aka uint16_t).
   *
   * @param {number} entity
   * @param {number} value
   * @return {void}
   */
declare function SetEntityLodDist(entity: Entity, value: number): void;

/**
   * SET_ENTITY_MAX_HEALTH
   *
   * @param {number} entity
   * @param {number} value
   * @return {void}
   */
declare function SetEntityMaxHealth(entity: Entity, value: number): void;

/**
   * SET_ENTITY_MOTION_BLUR
   *
   * @param {number} entity
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetEntityMotionBlur(entity: Entity, toggle: boolean): void;

/**
   * SET_ENTITY_NOWEAPONDECALS
   * Old name: _SET_ENTITY_DECALS_DISABLED
   *
   * @param {number} entity
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetEntityNoweapondecals(entity: Entity, toggle: boolean): void;

/**
   * SET_ENTITY_NO_COLLISION_ENTITY
   *
   * @param {number} entity1
   * @param {number} entity2
   * @param {boolean} thisFrameOnly
   * @return {void}
   */
declare function SetEntityNoCollisionEntity(entity1: Entity, entity2: Entity, thisFrameOnly: boolean): void;

/**
   * SET_ENTITY_ONLY_DAMAGED_BY_PLAYER
   *
   * @param {number} entity
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetEntityOnlyDamagedByPlayer(entity: Entity, toggle: boolean): void;

/**
   * SET_ENTITY_ONLY_DAMAGED_BY_RELATIONSHIP_GROUP
   *
   * @param {number} entity
   * @param {boolean} p1
   * @param {number} relationshipGroup
   * @return {void}
   */
declare function SetEntityOnlyDamagedByRelationshipGroup(entity: Entity, p1: boolean, relationshipGroup: Hash): void;

/**
   * SET_ENTITY_PROOFS
   * https://github.com/femga/rdr3_discoveries/tree/master/AI/ENTITY_PROOFS
   * BOOL p2: handles an additional special proofs flag, so it simply indicates whether it should be enabled or disabled, not sure what exactly it proofs the entity from though
   *
   * @param {number} entity
   * @param {number} proofsBitset
   * @param {boolean} specialFlag
   * @return {void}
   */
declare function SetEntityProofs(entity: Entity, proofsBitset: number, specialFlag: boolean): void;

/**
   * SET_ENTITY_QUATERNION
   *
   * @param {number} entity
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} w
   * @return {void}
   */
declare function SetEntityQuaternion(entity: Entity, x: number, y: number, z: number, w: number): void;

/**
   * SET_ENTITY_RENDER_SCORCHED
   *
   * @param {number} entity
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetEntityRenderScorched(entity: Entity, toggle: boolean): void;

/**
   * SET_ENTITY_REQUIRES_MORE_EXPENSIVE_RIVER_CHECK
   *
   * @param {number} entity
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetEntityRequiresMoreExpensiveRiverCheck(entity: Entity, toggle: boolean): void;

/**
   * SET_ENTITY_ROTATION
   *
   * @param {number} entity
   * @param {number} pitch
   * @param {number} roll
   * @param {number} yaw
   * @param {number} rotationOrder
   * @param {boolean} p5
   * @return {void}
   */
declare function SetEntityRotation(entity: Entity, pitch: number, roll: number, yaw: number, rotationOrder: number, p5: boolean): void;

/**
   * SET_ENTITY_SHOULD_FREEZE_WAITING_ON_COLLISION
   * Old name: _SET_ENTITY_CLEANUP_BY_ENGINE
   *
   * @param {number} entity
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetEntityShouldFreezeWaitingOnCollision(entity: Entity, toggle: boolean): void;

/**
   * SET_ENTITY_VELOCITY
   * Note that the third parameter(denoted as z) is "up and down" with positive numbers encouraging upwards movement.
   *
   * @param {number} entity
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {void}
   */
declare function SetEntityVelocity(entity: Entity, x: number, y: number, z: number): void;

/**
   * SET_ENTITY_VISIBLE
   *
   * @param {number} entity
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetEntityVisible(entity: Entity, toggle: boolean): void;

/**
   * SET_OBJECT_AS_NO_LONGER_NEEDED
   * This is an alias of SET_ENTITY_AS_NO_LONGER_NEEDED.
   *
  
   * @return {number}
   */
declare function SetObjectAsNoLongerNeeded(): number;

/**
   * SET_PED_AS_NO_LONGER_NEEDED
   * This is an alias of SET_ENTITY_AS_NO_LONGER_NEEDED.
   *
  
   * @return {number}
   */
declare function SetPedAsNoLongerNeeded(): Ped;

/**
   * SET_VEHICLE_AS_NO_LONGER_NEEDED
   * This is an alias of SET_ENTITY_AS_NO_LONGER_NEEDED.
   *
  
   * @return {number}
   */
declare function SetVehicleAsNoLongerNeeded(): Vehicle;

/**
   * STOP_ENTITY_ANIM
   *
   * @param {number} entity
   * @param {string | number} animation
   * @param {string | number} animGroup
   * @param {number} p3
   * @return {any}
   */
declare function StopEntityAnim(entity: Entity, animation: string | number, animGroup: string | number, p3: number): any;

/**
   * WOULD_ENTITY_BE_OCCLUDED
   *
   * @param {number} entityModelHash
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {boolean} p4
   * @return {boolean}
   */
declare function WouldEntityBeOccluded(entityModelHash: Hash, x: number, y: number, z: number, p4: boolean): boolean;

/**
   * _0x002AAC783ED323ED
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x002AAC783ED323ED(p0: any, p1: any): void;

/**
   * _0x007AAC783ED323ED
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0x007AAC783ED323ED(p0: any, p1: any, p2: any): void;

/**
   * _0x0939E773925C4719
   *
  
   * @return {void}
   */
declare function N_0x0939E773925C4719(): void;

/**
   * _0x0CCEFC6C2C95DA2A
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {any}
   */
declare function N_0x0CCEFC6C2C95DA2A(p0: any, p1: any, p2: any, p3: any): any;

/**
   * _0x0DB41D59E0F1502B
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x0DB41D59E0F1502B(p0: any): void;

/**
   * _0x0FD7D7C232876E72
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x0FD7D7C232876E72(p0: any): void;

/**
   * _0x119A5714578F4E05
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x119A5714578F4E05(p0: any, p1: any): void;

/**
   * _0x120376C23F019C6C
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0x120376C23F019C6C(p0: any, p1: any): any;

/**
   * _0x16908E859C3AB698
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {void}
   */
declare function N_0x16908E859C3AB698(p0: any, p1: any, p2: any, p3: any, p4: any): void;

/**
   * _0x188736456D1DEDE6
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0x188736456D1DEDE6(p0: any, p1: any): any;

/**
   * _0x20FAEE47427A4497
   *
  
   * @return {void}
   */
declare function N_0x20FAEE47427A4497(): void;

/**
   * _0x2A77EF9BEC8518F4
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x2A77EF9BEC8518F4(p0: any): any;

/**
   * _0x2D40BCBFE9305DEA
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x2D40BCBFE9305DEA(p0: any, p1: any): void;

/**
   * _0x350E9211074955AF
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0x350E9211074955AF(p0: any, p1: any): any;

/**
   * _0x371D179701D9C082
   * Called if entity is in water and submerged level is larger than 1f. If CARRYING_FLAG_FORCE_ALLOW_WARP_TO_SAFE_GROUND_LOCATION is true, it gets disabled as well.
   *
   * @param {number} entity
   * @return {void}
   */
declare function N_0x371D179701D9C082(entity: Entity): void;

/**
   * _0x37B01666BAE8F7EF
   * Seems to return true if entity is burned / scorched
   * _GET_ENTITY_*
   *
   * @param {number} entity
   * @return {any}
   */
declare function N_0x37B01666BAE8F7EF(entity: Entity): any;

/**
   * _0x37CEB637BA3B1A47
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x37CEB637BA3B1A47(p0: any): void;

/**
   * _0x383F64263F946E45
   * Used when checking if ped is in water
   *
   * @param {number} entity
   * @param {number} p2
   * @param {number} ped
   * @param {any} p4
   * @param {number} p5
   * @return {[boolean, number]}
   */
declare function N_0x383F64263F946E45(entity: Entity, p2: number, ped: Ped, p4: any, p5: number): [boolean, number];

/**
   * _0x3AB3A77672F6473F
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {Vector3}
   */
declare function N_0x3AB3A77672F6473F(p0: any, p1: any, p2: any, p3: any): Vector3;

/**
   * _0x3EC28DA1FFAC9DDD
   * Used in Script Function DUELING_DID_PLAYER_DISARM_OPPONENT
   *
   * @param {number} entity1
   * @param {number} entity2
   * @param {any} p2
   * @param {any} p3
   * @return {boolean}
   */
declare function N_0x3EC28DA1FFAC9DDD(entity1: Entity, entity2: Entity, p2: any, p3: any): boolean;

/**
   * _0x3F08C6163A4AB1D6
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x3F08C6163A4AB1D6(p0: any): void;

/**
   * _ATTACH_ENTITY_TO_COORDS_PHYSICALLY
   * Attach an entity to coordinates physically better name may be perfered? seems to be used with boats `p_skiff02x` ? The last 6 params are always 0 everywhere in the base code. p7 = 500.0 some kind of time? p8 =1
   *
   * @param {number} entity
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} offsetx
   * @param {number} offsety
   * @param {number} offsetz
   * @param {number} p7
   * @param {boolean} p8
   * @param {number} p9
   * @param {number} p10
   * @param {number} p11
   * @param {number} p12
   * @param {number} p13
   * @param {number} p14
   * @return {void}
   */
declare function AttachEntityToCoordsPhysically(entity: Entity, x: number, y: number, z: number, offsetx: number, offsety: number, offsetz: number, p7: number, p8: boolean, p9: number, p10: number, p11: number, p12: number, p13: number, p14: number): void;

/**
   * _0x56E0735D6273B227
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x56E0735D6273B227(p0: any, p1: any): void;

/**
   * _0x5744562E973E33CD
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {any}
   */
declare function N_0x5744562E973E33CD(p0: any, p1: any, p2: any, p3: any, p4: any): any;

/**
   * _0x5826EFD6D73C4DE5
   * _REMOVE_DECALS_* - _REMOVE_FORCED*
   *
   * @param {number} entity
   * @return {void}
   */
declare function N_0x5826EFD6D73C4DE5(entity: Entity): void;

/**
   * _0x582F73ACFE969571
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {any}
   */
declare function N_0x582F73ACFE969571(p0: any, p1: any, p2: any): any;

/**
   * _0x5E214112806591EA
   * Attaches scenario to bone with an offset
   * _GET_I* - _GET_M*
   *
   * @param {number} entity
   * @param {number} boneIndex
   * @return {Vector3}
   */
declare function N_0x5E214112806591EA(entity: Entity, boneIndex: number): Vector3;

/**
   * _SET_FILL_IN_STATE_FOR_ENTITY
   * sets the fill in state for some objects like for the stew, coffee mug ,poker chips, jugs ? P1 is either 0 or 2 p2 seems to be a label/name p3 is the fill in state, max seems to be for some 3.0 (most is 1.0) - 0.0
   * heres some of the labels/names found 
   * tumbler_fill, Canvas, Stew_Fill, from Chip01_Ctrl to Chip10_Ctrl, from empty_jug01_Ctrl to empty_jug20_Ctrl, from full_jug01_Ctrl to full_jug20_Ctrl, CTRL_cupFill, Food_DOF_Fill, from WhiteChip_Ctrl_0 to WhiteChip_Ctrl_10, from BlueChip_Ctrl_0 to BlueChip_Ctrl_10, from BlackChip_Ctrl_0 to BlackChip_Ctrl_10, from RedChip_Ctrl_0 to RedChip_Ctrl_10,
   *
   * @param {number} entity
   * @param {number} p1
   * @param {string | number} p2
   * @param {number} fill
   * @return {void}
   */
declare function SetFillInStateForEntity(entity: Entity, p1: number, p2: string | number, fill: number): void;

/**
   * _0x6C31B06E91518269
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x6C31B06E91518269(p0: any, p1: any): void;

/**
   * _0x6D58167F62238284
   *
   * @param {number} vehicle
   * @return {number}
   */
declare function N_0x6D58167F62238284(vehicle: Vehicle): number;

/**
   * _0x7A49D40DE437BC8D
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x7A49D40DE437BC8D(p0: any, p1: any): void;

/**
   * _0x7F20092547B4DDEA
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x7F20092547B4DDEA(p0: any): void;

/**
   * _0x80FDEB3A9E9AA578
   *
   * @param {number} entity
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x80FDEB3A9E9AA578(entity: Entity, p1: boolean): void;

/**
   * _0x898586729DB5221D
   *
   * @param {number} ped
   * @return {void}
   */
declare function N_0x898586729DB5221D(ped: Ped): void;

/**
   * _0x8E10DF0FFA63FB65
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {any}
   */
declare function N_0x8E10DF0FFA63FB65(p0: any, p1: any, p2: any, p3: any, p4: any): any;

/**
   * _0x8E46E18AA828334F
   * Used in Script Function GENERIC_ITEM_HAS_ANIM_COMPLETED
   * _GET_ENTITY_*
   *
   * @param {number} entity
   * @param {string | number} animDict
   * @param {string | number} animClip
   * @return {number}
   */
declare function N_0x8E46E18AA828334F(entity: Entity, animDict: string | number, animClip: string | number): number;

/**
   * _0x978AA2323ED32209
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x978AA2323ED32209(p0: any, p1: any): void;

/**
   * _0x9C6906EF8CB20C5F
   *
   * @param {number} entity
   * @return {void}
   */
declare function N_0x9C6906EF8CB20C5F(entity: Entity): void;

/**
   * _0xA48E4801DEBDF7E4
   *
   * @param {number} entity
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0xA48E4801DEBDF7E4(entity: Entity, p1: boolean): void;

/**
   * _0xA9E6D8F2DDFC4DB9
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xA9E6D8F2DDFC4DB9(p0: any, p1: any): void;

/**
   * _0xAAACB74442C1BED3
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xAAACB74442C1BED3(p0: any): any;

/**
   * _0xAF72EC7E1B54539B
   *
   * @param {number} entity
   * @return {number}
   */
declare function N_0xAF72EC7E1B54539B(entity: Entity): Entity;

/**
   * _0xAF7F3099B9FEB535
   * SET_ENTITY_LO*
   *
   * @param {number} entity
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @return {void}
   */
declare function N_0xAF7F3099B9FEB535(entity: Entity, p1: number, p2: number, p3: number): void;

/**
   * _0xB16C780C51E51E2B
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xB16C780C51E51E2B(p0: any): any;

/**
   * _0xB38A29CCD5447783
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0xB38A29CCD5447783(p0: any, p1: any, p2: any): void;

/**
   * _0xBA2A089E60ED1163
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {any}
   */
declare function N_0xBA2A089E60ED1163(p0: any, p1: any, p2: any, p3: any, p4: any): any;

/**
   * _0xBD94CECFB2D65119
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @return {void}
   */
declare function N_0xBD94CECFB2D65119(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;

/**
   * _0xC0EDEF16D90661EE
   * SET_ENTITY_A*
   *
   * @param {number} entity
   * @param {number} p1
   * @return {void}
   */
declare function N_0xC0EDEF16D90661EE(entity: Entity, p1: number): void;

/**
   * _0xC2E71D7E0A7B4C89
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xC2E71D7E0A7B4C89(p0: any): any;

/**
   * _0xC3ABCFBC7D74AFA5
   * Returns BOOL in ida
   *
   * @param {number} ped
   * @param {number} p1
   * @param {boolean} p2
   * @return {void}
   */
declare function N_0xC3ABCFBC7D74AFA5(ped: Ped, p1: number, p2: boolean): void;

/**
   * _0xC6A1A3D63F122DE7
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xC6A1A3D63F122DE7(p0: any, p1: any): void;

/**
   * _0xC76E94A78127412B
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0xC76E94A78127412B(p0: any, p1: any, p2: any): void;

/**
   * _0xCDB682BB47C02F0A
   *
   * @param {number} entity
   * @param {number} p1
   * @return {void}
   */
declare function N_0xCDB682BB47C02F0A(entity: Entity, p1: Hash): void;

/**
   * _0xD21C7418C590BB40
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xD21C7418C590BB40(p0: any): any;

/**
   * _0xD45BB89B53FC0CFD
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @param {any} p7
   * @return {void}
   */
declare function N_0xD45BB89B53FC0CFD(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;

/**
   * _0xD4636C2EDB0DEA8A
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xD4636C2EDB0DEA8A(p0: any): any;

/**
   * _0xD46BF94C4C66FAB0
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {any}
   */
declare function N_0xD46BF94C4C66FAB0(p0: any, p1: any, p2: any, p3: any): any;

/**
   * _0xDD03FC2089AD093C
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function N_0xDD03FC2089AD093C(p0: any, p1: any, p2: any, p3: any): void;

/**
   * _0xDF8E49EA89A01DB1
   * Hardcoded to return zero/false.
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {any}
   */
declare function N_0xDF8E49EA89A01DB1(p0: any, p1: any, p2: any): any;

/**
   * _0xDFC2B226D56D85F6
   *
   * @param {any} p0
   * @param {any} p1
   * @return {number}
   */
declare function N_0xDFC2B226D56D85F6(p0: any, p1: any): number;

/**
   * _0xE19035EB65AB2932
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xE19035EB65AB2932(p0: any, p1: any): void;

/**
   * _0xE31FC20319874CB3
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {any}
   */
declare function N_0xE31FC20319874CB3(p0: any, p1: any, p2: any): any;

/**
   * _0xE75EEA8DB59A9F39
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @return {void}
   */
declare function N_0xE75EEA8DB59A9F39(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;

/**
   * _0xE9E7A0BAC7F57746
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xE9E7A0BAC7F57746(p0: any, p1: any): void;

/**
   * _0xEAB3D91D30A344F1
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xEAB3D91D30A344F1(p0: any): void;

/**
   * _0xEF259AA1E097E0AD
   *
   * @param {number} entity
   * @param {any} p1
   * @return {void}
   */
declare function N_0xEF259AA1E097E0AD(entity: Entity, p1: any): void;

/**
   * _GET_ENTITY_LOOTING_PED
   * Returns the entity that is looting a ped but only while the looting is active
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetEntityLootingPed(entity: Entity): Entity;

/**
   * _0xF41E2979D5BC5370
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xF41E2979D5BC5370(p0: any): void;

/**
   * _0xF59FDE7B4D31A630
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xF59FDE7B4D31A630(p0: any): any;

/**
   * SET_ENTITY_CAN_ONLY_BE_DAMAGED_BY_SCRIPT_PARTICIPANTS
   *
   * @param {number} entityIndex
   * @param {boolean} bOnlyDamagedWhenRunningScript
   * @return {void}
   */
declare function SetEntityCanOnlyBeDamagedByScriptParticipants(EntityIndex: Entity, bOnlyDamagedWhenRunningScript: boolean): void;

/**
   * _0xFF9965C47FA404DA
   * SET_ENTITY_LO*
   *
   * @param {number} entity
   * @param {boolean} toggle
   * @return {void}
   */
declare function N_0xFF9965C47FA404DA(entity: Entity, toggle: boolean): void;

/**
   * _ADD_ENTITY_TRACKING_TRAILS
   *
   * @param {number} entity
   * @return {void}
   */
declare function AddEntityTrackingTrails(entity: Entity): void;

/**
   * _CHANGE_ENTITY_HEALTH
   * Alters entity's health by 'amount'. Can be negative (to drain health).
   * In the scripts entity2 and weaponHash are unused (zero).
   *
   * @param {number} entity
   * @param {number} amount
   * @param {number} entity2
   * @param {number} weaponHash
   * @return {boolean}
   */
declare function ChangeEntityHealth(entity: Entity, amount: number, entity2: Entity, weaponHash: Hash): boolean;

/**
   * _CREATE_FOOTPATH_TRAIL
   *
   * @param {any} p0
   * @param {string | number} waypointRecord
   * @param {boolean} bUseSnowOffset
   * @param {number} p3
   * @param {number} p4
   * @param {any} p5
   * @param {any} p6
   * @param {any} p7
   * @param {any} p8
   * @param {any} p9
   * @param {any} p10
   * @param {boolean} bInit
   * @return {any}
   */
declare function CreateFootpathTrail(p0: any, waypointRecord: string | number, bUseSnowOffset: boolean, p3: number, p4: number, p5: any, p6: any, p7: any, p8: any, p9: any, p10: any, bInit: boolean): any;

/**
   * _DELETE_CARRIABLE
   *
   * @param {number} entity
   * @return {void}
   */
declare function DeleteCarriable(entity: Entity): void;

/**
   * _DELETE_ENTITY_2
   * Must be called from a background script, otherwise it will do nothing.
   *
   * @param {number} entity
   * @return {void}
   */
declare function DeleteEntity_2(entity: Entity): void;

/**
   * _DOES_THREAD_OWN_THIS_ENTITY
   * Returns true if calling script owns specified entity
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function DoesThreadOwnThisEntity(entity: Entity): boolean;

/**
   * _GET_CARRIABLE_FROM_ENTITY
   * Returns a hash of an entity's name. (Alternative Name: _GET_ENTITY_PROMPT_NAME_HASH)
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetCarriableFromEntity(entity: Entity): number;

/**
   * _GET_ENTITIES_IN_VOLUME
   *
   * @param {number} volume
   * @param {number} itemSet
   * @param {number} entityType
   * @return {number}
   */
declare function GetEntitiesInVolume(volume: Volume, itemSet: ItemSet, entityType: number): number;

/**
   * _GET_ENTITIES_NEAR_POINT
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @param {number} itemSet
   * @param {number} p5
   * @return {number}
   */
declare function GetEntitiesNearPoint(x: number, y: number, z: number, radius: number, itemSet: ItemSet, p5: number): number;

/**
   * _GET_ENTITY_ANIM_CURRENT_TIME
   * Returns a normalized value between 0.0f and 1.0f. You can get the actual anim time by multiplying this by GET_ANIM_DURATION
   *
   * @param {number} entity
   * @param {string | number} animDict
   * @param {string | number} animName
   * @return {number}
   */
declare function GetEntityAnimCurrentTime(entity: Entity, animDict: string | number, animName: string | number): number;

/**
   * _GET_ENTITY_BY_DOORHASH
   * Params: p1 = 0 in R* Scripts (GET_DOOR_ENTITY_FROM_ID)
   * https://github.com/femga/rdr3_discoveries/blob/master/doorHashes/doorhashes.lua
   *
   * @param {number} doorHash
   * @param {number} p1
   * @return {number}
   */
declare function GetEntityByDoorhash(doorHash: Hash, p1: number): Entity;

/**
   * GET_ENTITY_CAN_BE_DAMAGED
   * Old name: _GET_ENTITY_CAN_BE_DAMAGED
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function GetEntityCanBeDamaged(entity: Entity): boolean;

/**
   * _GET_ENTITY_CARRYING_FLAG
   * flagId: see _SET_ENTITY_CARRYING_FLAG
   *
   * @param {number} entity
   * @param {number} flagId
   * @return {boolean}
   */
declare function GetEntityCarryingFlag(entity: Entity, flagId: number): boolean;

/**
   * _GET_ENTITY_CARRY_CONFIG
   * Returns zero if the entity is not a carriable
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetEntityCarryConfig(entity: Entity): number;

/**
   * _GET_ENTITY_FORWARD_VECTOR_YX
   * Gets the entity's forward vector in YX(Z) eulers. Similar to GET_ENTITY_FORWARD_VECTOR
   *
   * @param {number} entity
   * @return {Vector3}
   */
declare function GetEntityForwardVectorYx(entity: Entity): Vector3;

/**
   * _GET_ENTITY_HEALTH_FLOAT
   * Returns (CUR_HEALTH / MAX_HEALTH)
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetEntityHealthFloat(entity: Entity): number;

/**
   * GET_ENTITY_PROOFS
   * Note: this native was removed in 1232 but added back in 1311
   * Old name: _GET_ENTITY_PROOFS
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetEntityProofs(entity: Entity): number;

/**
   * _GET_ENTITY_SCRIPT
   *
   * @param {number} entity
   * @param {DataView} argStruct
   * @return {number}
   */
declare function GetEntityScript(entity: Entity, argStruct: DataView): number;

/**
   * _GET_ENTITY_THREAT_TIER
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetEntityThreatTier(entity: Entity): number;

/**
   * _GET_ENTITY_WORLD_POSITION_OF_DIMENSIONS
   *
   * @param {number} entity
   * @return {[Vector3, Vector3]}
   */
declare function GetEntityWorldPositionOfDimensions(entity: Entity): [Vector3, Vector3];

/**
   * _GET_IS_BIRD
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function GetIsBird(entity: Entity): boolean;

/**
   * _GET_IS_CARRIABLE_PELT
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function GetIsCarriablePelt(entity: Entity): boolean;

/**
   * _GET_IS_PREDATOR
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function GetIsPredator(entity: Entity): boolean;

/**
   * _GET_OPTIMAL_CARRY_CONFIG
   * Valid indices: 0 - 3
   * Index 1 always returns a `hogtied` config, doesn't matter the entity.
   * It's for humans only and the ped must be resurrected first if it's dead.
   *
   * @param {number} entity
   * @param {number} index
   * @return {number}
   */
declare function GetOptimalCarryConfig(entity: Entity, index: number): number;

/**
   * _GET_PED_ANIMAL_TYPE
   * Returns the ped's animal type hash: https://alloc8or.re/rdr3/doc/enums/eAnimalType.txt
   * Combine this with GET_STRING_FROM_HASH_KEY to display localized entity names
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedAnimalType(ped: Ped): number;

/**
   * _GET_PINNED_MAP_ENTITY
   *
   * @param {any} p0
   * @return {number}
   */
declare function GetPinnedMapEntity(p0: any): Entity;

/**
   * _GET_SCRIPT_OVERRIDE_ENTITY_LOOT_TABLE_PERMANENT
   * Returns false if entity is not a ped or object.
   *
   * @param {number} entity
   * @return {[boolean, number]}
   */
declare function GetScriptOverrideEntityLootTablePermanent(entity: Entity): [boolean, number];

/**
   * _IS_CARRIABLE_MODEL
   *
   * @param {number} model
   * @return {boolean}
   */
declare function IsCarriableModel(model: Hash): boolean;

/**
   * _IS_ENTITY_FROZEN
   * Getter for FREEZE_ENTITY_POSITION
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function IsEntityFrozen(entity: Entity): boolean;

/**
   * _IS_ENTITY_FULLY_LOOTED
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function IsEntityFullyLooted(entity: Entity): boolean;

/**
   * _IS_ENTITY_ON_TRAIN_TRACK
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function IsEntityOnTrainTrack(entity: Entity): boolean;

/**
   * _IS_ENTITY_OWNED_BY_PERSISTENCE_SYSTEM
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function IsEntityOwnedByPersistenceSystem(entity: Entity): boolean;

/**
   * _IS_ENTITY_PLAYING_ANY_ANIM
   * Params: p1 (probably animType) = 1, 0
   *
   * @param {number} entity
   * @param {number} p1
   * @return {boolean}
   */
declare function IsEntityPlayingAnyAnim(entity: Entity, p1: number): boolean;

/**
   * _IS_ENTITY_UNDERWATER
   *
   * @param {number} entity
   * @param {boolean} p1
   * @return {boolean}
   */
declare function IsEntityUnderwater(entity: Entity, p1: boolean): boolean;

/**
   * _IS_TRACKED_ENTITY_VISIBLE
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function IsTrackedEntityVisible(entity: Entity): boolean;

/**
   * _PAUSE_ENTITY_TRACKING
   *
   * @param {number} entity
   * @param {boolean} pause
   * @return {void}
   */
declare function PauseEntityTracking(entity: Entity, pause: boolean): void;

/**
   * _REQUEST_ENTITY_LOOT_LIST
   *
   * @param {number} mount
   * @param {DataView} argStruct
   * @param {number} visiblelootslotrequestType
   * @param {number} flag
   * @param {number} p4
   * @param {boolean} p5
   * @return {boolean}
   */
declare function RequestEntityLootList(mount: Ped, argStruct: DataView, visiblelootslotrequestType: Hash, flag: number, p4: number, p5: boolean): boolean;

/**
   * _SEARCH_BUILDING_POOL_FOR_ENTITY_WITH_THIS_MODEL
   * Alternative Name: _GET_ENTITY_FROM_MAP_OBJECT; You can get existing objects and manipulate them using this native.
   *
   * @param {number} modelHash
   * @return {number}
   */
declare function SearchBuildingPoolForEntityWithThisModel(modelHash: Hash): Entity;

/**
   * _SET_ENTITY_ANIM_CURRENT_TIME
   *
   * @param {number} entity
   * @param {string | number} animDict
   * @param {string | number} animName
   * @param {number} time
   * @return {void}
   */
declare function SetEntityAnimCurrentTime(entity: Entity, animDict: string | number, animName: string | number, time: number): void;

/**
   * _SET_ENTITY_ANIM_SPEED
   *
   * @param {number} entity
   * @param {string | number} animDict
   * @param {string | number} animName
   * @param {number} speedMultiplier
   * @return {void}
   */
declare function SetEntityAnimSpeed(entity: Entity, animDict: string | number, animName: string | number, speedMultiplier: number): void;

/**
   * _SET_ENTITY_CARCASS_TYPE
   * Changes type and quality of skins
   * type hashes: https://pastebin.com/C1WvQjCy
   *
   * @param {number} entity
   * @param {number} type
   * @return {void}
   */
declare function SetEntityCarcassType(entity: Entity, type: Hash): void;

/**
   * _SET_ENTITY_CARRYING_FLAG
   * flagId: https://github.com/femga/rdr3_discoveries/tree/master/AI/CARRYING_FLAGS
   * https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/CCarryingFlags__Flags
   * 
   * enum eCarryingFlag
   * {
   *   CARRYING_FLAG_CAN_BE_CUT_FREE = 1,
   *   CARRYING_FLAG_CAN_BE_CARRIED_ON_FOOT = 2,
   *   CARRYING_FLAG_CAN_BE_DROPPED = 4,
   *   CARRYING_FLAG_CAN_BE_CARRIED_WHEN_DEAD = 7,
   *   CARRYING_FLAG_CAN_CARRY_ANYTHING = 9,
   *   CARRYING_FLAG_DISABLE_PROMPT_LOS_CHECKS = 19,
   *   CARRYING_FLAG_FORCE_ALLOW_WARP_TO_SAFE_GROUND_LOCATION = 23,
   *   CARRYING_FLAG_PICKUPS_IGNORE_HEIGHT_RESTRICTIONS = 26,
   *   CARRYING_FLAG_CLEAN_UP_WHEN_NOT_CARRIED = 27,
   *   CARRYING_FLAG_BLOCK_KNOCK_OFF_PED_VARIATIONS_FROM_CARRIABLE_INTERACTIONS = 29,
   *   CARRYING_FLAG_HIT_WHEN_CARRIABLE = 31,
   *   CARRYING_FLAG_DISABLE_CARRIABLE_INTERACTIONS_ON_THIS_MOUNT = 34,
   *   CARRYING_FLAG_FORCE_HIDE_PROMPT_GROUP = 37,
   * };
   *
   * @param {number} entity
   * @param {number} flagId
   * @param {boolean} value
   * @return {void}
   */
declare function SetEntityCarryingFlag(entity: Entity, flagId: number, value: boolean): void;

/**
   * _SET_ENTITY_COORDS_AND_HEADING
   *
   * @param {number} entity
   * @param {number} xPos
   * @param {number} yPos
   * @param {number} zPos
   * @param {number} heading
   * @param {boolean} xAxis
   * @param {boolean} yAxis
   * @param {boolean} zAxis
   * @return {void}
   */
declare function SetEntityCoordsAndHeading(entity: Entity, xPos: number, yPos: number, zPos: number, heading: number, xAxis: boolean, yAxis: boolean, zAxis: boolean): void;

/**
   * _SET_ENTITY_COORDS_AND_HEADING_NO_OFFSET
   *
   * @param {number} entity
   * @param {number} xPos
   * @param {number} yPos
   * @param {number} zPos
   * @param {number} heading
   * @param {boolean} p5
   * @param {boolean} p6
   * @return {void}
   */
declare function SetEntityCoordsAndHeadingNoOffset(entity: Entity, xPos: number, yPos: number, zPos: number, heading: number, p5: boolean, p6: boolean): void;

/**
   * _SET_ENTITY_CUSTOM_PICKUP_RADIUS
   *
   * @param {number} entity
   * @param {number} radius
   * @return {void}
   */
declare function SetEntityCustomPickupRadius(entity: Entity, radius: number): void;

/**
   * _SET_ENTITY_FADE_IN
   *
   * @param {number} entity
   * @return {void}
   */
declare function SetEntityFadeIn(entity: Entity): void;

/**
   * _SET_ENTITY_FULLY_LOOTED
   *
   * @param {number} entity
   * @param {boolean} looted
   * @return {void}
   */
declare function SetEntityFullyLooted(entity: Entity, looted: boolean): void;

/**
   * _SET_ENTITY_LIGHTS_ENABLED
   *
   * @param {number} entity
   * @param {boolean} enabled
   * @return {void}
   */
declare function SetEntityLightsEnabled(entity: Entity, enabled: boolean): void;

/**
   * _SET_ENTITY_THREAT_TIER
   * tier: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/eEntityThreatTier
   *
   * @param {number} entity
   * @param {number} tier
   * @param {boolean} p2
   * @return {void}
   */
declare function SetEntityThreatTier(entity: Entity, tier: number, p2: boolean): void;

/**
   * _UNPIN_MAP_ENTITY
   *
   * @param {number} entity
   * @return {void}
   */
declare function UnpinMapEntity(entity: Entity): void;