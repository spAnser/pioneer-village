/**
   * ADD_ARMOUR_TO_PED
   * Same as SET_PED_ARMOUR, but ADDS 'amount' to the armor the Ped already has.
   *
   * @param {number} ped
   * @param {number} amount
   * @return {void}
   */
declare function AddArmourToPed(ped: Ped, amount: number): void;

/**
   * ADD_CUSTOM_FORMATION_LOCATION
   *
   * @param {number} groupId
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} position
   * @return {void}
   */
declare function AddCustomFormationLocation(groupId: number, x: number, y: number, z: number, position: number): void;

/**
   * ADD_FORMATION_LOCATION
   *
   * @param {number} groupId
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @return {boolean}
   */
declare function AddFormationLocation(groupId: number, p1: number, p2: number, p3: number): boolean;

/**
   * ADD_RELATIONSHIP_GROUP
   * The hash of the created relationship group is output in the second parameter.
   *
   * @param {string | number} name
   * @param {number} groupHash
   * @return {boolean}
   */
declare function AddRelationshipGroup(name: string | number, groupHash: Hash): boolean;

/**
   * ADD_SCENARIO_BLOCKING_AREA
   * blockingFlags: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/eScenarioBlockingFlags
   *
   * @param {number} x1
   * @param {number} y1
   * @param {number} z1
   * @param {number} x2
   * @param {number} y2
   * @param {number} z2
   * @param {boolean} p6
   * @param {number} blockingFlags
   * @return {number}
   */
declare function AddScenarioBlockingArea(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, p6: boolean, blockingFlags: number): number;

/**
   * APPLY_DAMAGE_TO_PED
   * damages a ped with the given amount
   *
   * @param {number} ped
   * @param {number} damageAmount
   * @param {boolean} damageArmour
   * @param {number} boneId
   * @param {number} pedKiller
   * @return {void}
   */
declare function ApplyDamageToPed(ped: Ped, damageAmount: number, damageArmour: boolean, boneId: number, pedKiller: Ped): void;

/**
   * APPLY_PED_BLOOD_SPECIFIC
   *
   * @param {number} ped
   * @param {any} p1
   * @param {number} p2
   * @param {number} p3
   * @param {number} p4
   * @param {number} p5
   * @param {any} p6
   * @param {number} p7
   * @param {DataView} p8
   * @return {void}
   */
declare function ApplyPedBloodSpecific(ped: Ped, p1: any, p2: number, p3: number, p4: number, p5: number, p6: any, p7: number, p8: DataView): void;

/**
   * APPLY_PED_DAMAGE_PACK
   * https://github.com/femga/rdr3_discoveries/blob/master/peds_customization/ped_decals.lua
   *
   * @param {number} ped
   * @param {string | number} damagePack
   * @param {number} damage
   * @param {number} mult
   * @return {void}
   */
declare function ApplyPedDamagePack(ped: Ped, damagePack: string | number, damage: number, mult: number): void;

/**
   * CAN_KNOCK_PED_OFF_VEHICLE
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function CanKnockPedOffVehicle(ped: Ped): boolean;

/**
   * CAN_PED_BE_MOUNTED
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function CanPedBeMounted(ped: Ped): boolean;

/**
   * CAN_PED_IN_COMBAT_SEE_TARGET
   *
   * @param {number} ped
   * @param {number} target
   * @return {boolean}
   */
declare function CanPedInCombatSeeTarget(ped: Ped, target: Ped): boolean;

/**
   * CAN_PED_RAGDOLL
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function CanPedRagdoll(ped: Ped): boolean;

/**
   * CAN_PED_SEE_ENTITY
   * Returns:
   * 0 - CTR_CANNOT_TARGET
   * 1 - CTR_CAN_TARGET
   * 2 - CTR_NOT_SURE_YET
   *
   * @param {number} ped
   * @param {number} targetEntity
   * @param {boolean} p2
   * @param {boolean} p3
   * @return {number}
   */
declare function CanPedSeeEntity(ped: Ped, targetEntity: Entity, p2: boolean, p3: boolean): number;

/**
   * CAN_PED_SEE_PED_CACHED
   *
   * @param {number} ped
   * @param {number} targetPed
   * @param {boolean} p2
   * @return {number}
   */
declare function CanPedSeePedCached(ped: Ped, targetPed: Ped, p2: boolean): number;

/**
   * CLEAR_FACIAL_IDLE_ANIM_OVERRIDE
   *
   * @param {number} ped
   * @return {void}
   */
declare function ClearFacialIdleAnimOverride(ped: Ped): void;

/**
   * CLEAR_PED_BLOOD_DAMAGE
   *
   * @param {number} ped
   * @return {void}
   */
declare function ClearPedBloodDamage(ped: Ped): void;

/**
   * CLEAR_PED_BLOOD_DAMAGE_BY_ZONE
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function ClearPedBloodDamageByZone(ped: Ped, p1: number): void;

/**
   * CLEAR_PED_DAMAGE_DECAL_BY_ZONE
   *
   * @param {number} ped
   * @param {number} p1
   * @param {string | number} p2
   * @return {void}
   */
declare function ClearPedDamageDecalByZone(ped: Ped, p1: number, p2: string | number): void;

/**
   * CLEAR_PED_DECORATIONS
   *
   * @param {number} ped
   * @return {void}
   */
declare function ClearPedDecorations(ped: Ped): void;

/**
   * CLEAR_PED_ENV_DIRT
   *
   * @param {number} ped
   * @return {void}
   */
declare function ClearPedEnvDirt(ped: Ped): void;

/**
   * CLEAR_PED_LAST_DAMAGE_BONE
   *
   * @param {number} ped
   * @return {void}
   */
declare function ClearPedLastDamageBone(ped: Ped): void;

/**
   * CLEAR_PED_NON_CREATION_AREA
   *
  
   * @return {void}
   */
declare function ClearPedNonCreationArea(): void;

/**
   * CLEAR_PED_WETNESS
   * It clears the wetness of the selected Ped/Player. Clothes have to be wet to notice the difference.
   *
   * @param {number} ped
   * @return {void}
   */
declare function ClearPedWetness(ped: Ped): void;

/**
   * CLEAR_RAGDOLL_BLOCKING_FLAGS
   * flags: see SET_RAGDOLL_BLOCKING_FLAGS
   *
   * @param {number} ped
   * @param {number} flags
   * @return {void}
   */
declare function ClearRagdollBlockingFlags(ped: Ped, flags: number): void;

/**
   * CLEAR_RELATIONSHIP_BETWEEN_GROUPS
   *
   * @param {number} relationship
   * @param {number} group1
   * @param {number} group2
   * @return {void}
   */
declare function ClearRelationshipBetweenGroups(relationship: number, group1: Hash, group2: Hash): void;

/**
   * CLONE_PED
   *
   * @param {number} ped
   * @param {boolean} isNetwork
   * @param {boolean} bScriptHostPed
   * @param {boolean} copyHeadBlendFlag
   * @return {number}
   */
declare function ClonePed(ped: Ped, isNetwork: boolean, bScriptHostPed: boolean, copyHeadBlendFlag: boolean): Ped;

/**
   * CLONE_PED_TO_TARGET
   * Copies ped's components and props to targetPed.
   * Can be used to clear anything from a ped by cloning it, including bullet holes.
   *
   * @param {number} ped
   * @param {number} targetPed
   * @return {void}
   */
declare function ClonePedToTarget(ped: Ped, targetPed: Ped): void;

/**
   * COMPUTE_SATCHEL_ITEM_FOR_PED_DAMAGE
   *
   * @param {any} p0
   * @param {number} pedAttached
   * @param {number} damageCleanliness
   * @return {boolean}
   */
declare function ComputeSatchelItemForPedDamage(p0: any, pedAttached: Ped, damageCleanliness: number): boolean;

/**
   * COUNT_PEDS_IN_COMBAT_WITH_TARGET
   *
   * @param {number} ped
   * @param {number} flag
   * @return {number}
   */
declare function CountPedsInCombatWithTarget(ped: Ped, flag: number): number;

/**
   * COUNT_PEDS_IN_COMBAT_WITH_TARGET_WITHIN_RADIUS
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @param {number} flag
   * @return {number}
   */
declare function CountPedsInCombatWithTargetWithinRadius(ped: Ped, x: number, y: number, z: number, radius: number, flag: number): number;

/**
   * CREATE_GROUP
   * Creates a new ped group.
   * Groups can contain up to 8 peds.
   * 
   * The parameter is unused.
   * 
   * Returns a handle to the created group, or 0 if a group couldn't be created.
   *
   * @param {number} taskAllocator
   * @return {number}
   */
declare function CreateGroup(taskAllocator: number): number;

/**
   * CREATE_PED
   *
   * @param {number} modelHash
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} heading
   * @param {boolean} isNetwork
   * @param {boolean} bScriptHostPed
   * @param {boolean} p7
   * @param {boolean} p8
   * @return {number}
   */
declare function CreatePed(modelHash: Hash, x: number, y: number, z: number, heading: number, isNetwork: boolean, bScriptHostPed: boolean, p7: boolean, p8: boolean): Ped;

/**
   * CREATE_PED_INSIDE_VEHICLE
   * seatIndex:
   * enum eVehicleSeat
   * {
   *   VS_ANY_PASSENGER = -2,
   *   VS_DRIVER,
   *   VS_FRONT_RIGHT,
   *   VS_BACK_LEFT,
   *   VS_BACK_RIGHT,
   *   VS_EXTRA_LEFT_1,
   *   VS_EXTRA_RIGHT_1,
   *   VS_EXTRA_LEFT_2,
   *   VS_EXTRA_RIGHT_2,
   *   VS_EXTRA_LEFT_3,
   *   VS_EXTRA_RIGHT_3,
   *   VS_NUM_SEATS
   * };
   *
   * @param {number} vehicle
   * @param {number} modelHash
   * @param {number} seatIndex
   * @param {boolean} p3
   * @param {boolean} p4
   * @param {boolean} p5
   * @return {number}
   */
declare function CreatePedInsideVehicle(vehicle: Vehicle, modelHash: Hash, seatIndex: number, p3: boolean, p4: boolean, p5: boolean): Ped;

/**
   * CREATE_PED_ON_MOUNT
   *
   * @param {number} mount
   * @param {number} modelHash
   * @param {number} index
   * @param {boolean} p3
   * @param {boolean} p4
   * @param {boolean} p5
   * @param {boolean} p6
   * @return {number}
   */
declare function CreatePedOnMount(mount: Ped, modelHash: Hash, index: number, p3: boolean, p4: boolean, p5: boolean, p6: boolean): Ped;

/**
   * DELETE_PED
   * Deletes the specified ped, then sets the handle pointed to by the pointer to NULL.
   *
  
   * @return {number}
   */
declare function DeletePed(): Ped;

/**
   * DETACH_CARRIABLE_ENTITY
   *
   * @param {number} entity
   * @param {boolean} p1
   * @param {boolean} p2
   * @return {void}
   */
declare function DetachCarriableEntity(entity: Entity, p1: boolean, p2: boolean): void;

/**
   * DISABLE_PED_INJURED_ON_GROUND_BEHAVIOUR
   *
   * @param {number} ped
   * @return {void}
   */
declare function DisablePedInjuredOnGroundBehaviour(ped: Ped): void;

/**
   * DOES_GROUP_EXIST
   *
   * @param {number} groupId
   * @return {boolean}
   */
declare function DoesGroupExist(groupId: number): boolean;

/**
   * EXPLODE_PED_HEAD
   * Forces the ped to fall back and kills it.
   * 
   * It doesn't really explode the ped's head but it kills the ped
   *
   * @param {number} ped
   * @param {number} weaponHash
   * @return {void}
   */
declare function ExplodePedHead(ped: Ped, weaponHash: Hash): void;

/**
   * FADE_AND_DESTROY_PED
   *
  
   * @return {number}
   */
declare function FadeAndDestroyPed(): Ped;

/**
   * FIND_ALL_ATTACHED_CARRIABLE_ENTITIES
   *
   * @param {number} ped
   * @param {number} itemset
   * @return {void}
   */
declare function FindAllAttachedCarriableEntities(ped: Ped, itemset: ItemSet): void;

/**
   * FORCE_ALL_HEADING_VALUES_TO_ALIGN
   * Old name: _FREEZE_PED_CAMERA_ROTATION
   *
   * @param {number} ped
   * @return {void}
   */
declare function ForceAllHeadingValuesToAlign(ped: Ped): void;

/**
   * FORCE_PED_AI_AND_ANIMATION_UPDATE
   *
   * @param {number} ped
   * @param {boolean} p1
   * @param {boolean} p2
   * @return {void}
   */
declare function ForcePedAiAndAnimationUpdate(ped: Ped, p1: boolean, p2: boolean): void;

/**
   * FORCE_PED_MOTION_STATE
   * motionStateHash: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/CPedMotionStates__eMotionState
   *
   * @param {number} ped
   * @param {number} motionStateHash
   * @param {boolean} p2
   * @param {number} p3
   * @param {boolean} p4
   * @return {boolean}
   */
declare function ForcePedMotionState(ped: Ped, motionStateHash: Hash, p2: boolean, p3: number, p4: boolean): boolean;

/**
   * GET_ANIM_INITIAL_OFFSET_POSITION
   *
   * @param {string | number} animDict
   * @param {string | number} animName
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} xRot
   * @param {number} yRot
   * @param {number} zRot
   * @param {number} p8
   * @param {number} p9
   * @return {Vector3}
   */
declare function GetAnimInitialOffsetPosition(animDict: string | number, animName: string | number, x: number, y: number, z: number, xRot: number, yRot: number, zRot: number, p8: number, p9: number): Vector3;

/**
   * GET_ANIM_INITIAL_OFFSET_ROTATION
   *
   * @param {string | number} animDict
   * @param {string | number} animName
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} xRot
   * @param {number} yRot
   * @param {number} zRot
   * @param {number} p8
   * @param {number} p9
   * @return {Vector3}
   */
declare function GetAnimInitialOffsetRotation(animDict: string | number, animName: string | number, x: number, y: number, z: number, xRot: number, yRot: number, zRot: number, p8: number, p9: number): Vector3;

/**
   * GET_CARRIED_ATTACHED_INFO_FOR_SLOT
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {any}
   */
declare function GetCarriedAttachedInfoForSlot(p0: any, p1: any, p2: any, p3: any): any;

/**
   * GET_CLOSEST_PED
   * Gets the closest ped in a radius.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @param {boolean} p4
   * @param {boolean} p5
   * @param {boolean} p7
   * @param {boolean} p8
   * @param {boolean} p9
   * @param {number} pedType
   * @return {[boolean, Ped]}
   */
declare function GetClosestPed(x: number, y: number, z: number, radius: number, p4: boolean, p5: boolean, p7: boolean, p8: boolean, p9: boolean, pedType: number): [boolean, Ped];

/**
   * GET_COMBAT_FLOAT
   *
   * @param {number} ped
   * @param {number} combatType
   * @return {number}
   */
declare function GetCombatFloat(ped: Ped, combatType: number): number;

/**
   * GET_CURRENT_TARGET_FOR_PED
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetCurrentTargetForPed(ped: Ped): Entity;

/**
   * GET_DEAD_PED_PICKUP_COORDS
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} p2
   * @return {Vector3}
   */
declare function GetDeadPedPickupCoords(ped: Ped, p1: number, p2: number): Vector3;

/**
   * GET_GROUP_SIZE
   *
   * @param {number} groupId
   * @return {[boolean, number]}
   */
declare function GetGroupSize(groupId: number): [boolean, number];

/**
   * GET_IS_PED_RESPONDING_TO_NEGATIVE_INTERACTION
   *
   * @param {number} ped
   * @param {number} player
   * @return {boolean}
   */
declare function GetIsPedRespondingToNegativeInteraction(ped: Ped, player: Player): boolean;

/**
   * GET_IS_PED_RESPONDING_TO_POSITIVE_INTERACTION
   *
   * @param {number} ped
   * @param {number} player
   * @return {boolean}
   */
declare function GetIsPedRespondingToPositiveInteraction(ped: Ped, player: Player): boolean;

/**
   * GET_JACK_TARGET
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetJackTarget(ped: Ped): Ped;

/**
   * GET_LOOTING_PICKUP_TARGET_ENTITY
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetLootingPickupTargetEntity(ped: Ped): Entity;

/**
   * GET_MELEE_TARGET_FOR_PED
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetMeleeTargetForPed(ped: Ped): Ped;

/**
   * GET_META_PED_ASSET_GUIDS
   * This is a way to get what drawables a ped has equipped
   * Example: you are able to tell if the ped has the drawable PLAYER_ZERO_HAT_017 attached
   * Note: this works with non shop components, direct .ydd files.
   *
   * @param {number} ped
   * @param {number} index
   * @return {[boolean, number, number, number, number]}
   */
declare function GetMetaPedAssetGuids(ped: Ped, index: number): [boolean, number, number, number, number];

/**
   * GET_META_PED_ASSET_TINT
   *
   * @param {number} ped
   * @param {number} index
   * @return {[boolean, number, number, number, number]}
   */
declare function GetMetaPedAssetTint(ped: Ped, index: number): [boolean, number, number, number, number];

/**
   * GET_MOUNT
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetMount(ped: Ped): Ped;

/**
   * GET_NUM_META_PED_OUTFITS
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetNumMetaPedOutfits(ped: Ped): number;

/**
   * GET_PEDS_JACKER
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedsJacker(ped: Ped): Ped;

/**
   * GET_PED_ACCURACY
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedAccuracy(ped: Ped): number;

/**
   * GET_PED_AS_GROUP_LEADER
   *
   * @param {number} groupId
   * @return {number}
   */
declare function GetPedAsGroupLeader(groupID: number): Ped;

/**
   * GET_PED_AS_GROUP_MEMBER
   *
   * @param {number} groupId
   * @param {number} memberNumber
   * @return {number}
   */
declare function GetPedAsGroupMember(groupID: number, memberNumber: number): Ped;

/**
   * GET_PED_BLACKBOARD_SCRIPT_BOOL
   *
   * @param {number} ped
   * @param {string | number} variableName
   * @return {boolean}
   */
declare function GetPedBlackboardScriptBool(ped: Ped, variableName: string | number): boolean;

/**
   * GET_PED_BLACKBOARD_SCRIPT_FLOAT
   *
   * @param {number} ped
   * @param {string | number} variableName
   * @return {number}
   */
declare function GetPedBlackboardScriptFloat(ped: Ped, variableName: string | number): number;

/**
   * GET_PED_BLACKBOARD_SCRIPT_INT
   *
   * @param {number} ped
   * @param {string | number} variableName
   * @return {number}
   */
declare function GetPedBlackboardScriptInt(ped: Ped, variableName: string | number): number;

/**
   * GET_PED_BONE_COORDS
   * Gets the position of the specified bone of the specified ped.
   * 
   * ped: The ped to get the position of a bone from.
   * boneId: The ID of the bone to get the position from. This is NOT the index.
   * offsetX: The X-component of the offset to add to the position relative to the bone's rotation.
   * offsetY: The Y-component of the offset to add to the position relative to the bone's rotation.
   * offsetZ: The Z-component of the offset to add to the position relative to the bone's rotation.
   *
   * @param {number} ped
   * @param {number} boneId
   * @param {number} offsetX
   * @param {number} offsetY
   * @param {number} offsetZ
   * @return {Vector3}
   */
declare function GetPedBoneCoords(ped: Ped, boneId: number, offsetX: number, offsetY: number, offsetZ: number): Vector3;

/**
   * GET_PED_BONE_INDEX
   * no bone = -1
   *
   * @param {number} ped
   * @param {number} boneId
   * @return {number}
   */
declare function GetPedBoneIndex(ped: Ped, boneId: number): number;

/**
   * GET_PED_CAUSE_OF_DEATH
   * Returns the hash of the weapon/model/object that killed the ped.
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedCauseOfDeath(ped: Ped): number;

/**
   * GET_PED_COMBAT_MOVEMENT
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedCombatMovement(ped: Ped): number;

/**
   * GET_PED_CONFIG_FLAG
   * flagId: see SET_PED_CONFIG_FLAG
   *
   * @param {number} ped
   * @param {number} flagId
   * @param {boolean} p2
   * @return {boolean}
   */
declare function GetPedConfigFlag(ped: Ped, flagId: number, p2: boolean): boolean;

/**
   * GET_PED_CROUCH_MOVEMENT
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function GetPedCrouchMovement(ped: Ped): boolean;

/**
   * GET_PED_CURRENT_MOVE_BLEND_RATIO
   * Old name: _GET_PED_CURRENT_MOVEMENT_SPEED
   *
   * @param {number} ped
   * @return {[boolean, number, number]}
   */
declare function GetPedCurrentMoveBlendRatio(ped: Ped): [boolean, number, number];

/**
   * GET_PED_DEFENSIVE_AREA_POSITION
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {Vector3}
   */
declare function GetPedDefensiveAreaPosition(ped: Ped, p1: boolean): Vector3;

/**
   * GET_PED_GRAPPLE_STATE
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedGrappleState(ped: Ped): number;

/**
   * GET_PED_GROUP_INDEX
   * Returns the groupId of which the specified ped is a member of.
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedGroupIndex(ped: Ped): number;

/**
   * GET_PED_IS_BEING_GRAPPLED
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function GetPedIsBeingGrappled(ped: Ped): boolean;

/**
   * GET_PED_IS_DOING_COMBAT_ROLL
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function GetPedIsDoingCombatRoll(ped: Ped): boolean;

/**
   * GET_PED_IS_GRAPPLING
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function GetPedIsGrappling(ped: Ped): boolean;

/**
   * GET_PED_LAST_DAMAGE_BONE
   *
   * @param {number} ped
   * @return {[boolean, number]}
   */
declare function GetPedLastDamageBone(ped: Ped): [boolean, number];

/**
   * GET_PED_LOOT_STATUS_MP
   * enum ePedLootStatus
   * {
   *   PLS_NONE,
   *   PLS_PRE_LOOT,
   *   PLS_SAMPLING,
   *   PLS_SKINNING
   * };
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedLootStatusMp(ped: Ped): number;

/**
   * GET_PED_MAX_HEALTH
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedMaxHealth(ped: Ped): number;

/**
   * GET_PED_MONEY
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedMoney(ped: Ped): number;

/**
   * GET_PED_MOTION_FOCUS_ENTITY
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedMotionFocusEntity(ped: Ped): Entity;

/**
   * GET_PED_NEARBY_PEDS
   *
   * @param {number} ped
   * @param {DataView} sizeAndPeds
   * @param {number} ignoredPedType
   * @param {number} p3
   * @return {number}
   */
declare function GetPedNearbyPeds(ped: Ped, sizeAndPeds: DataView, ignoredPedType: number, p3: number): number;

/**
   * GET_PED_NEARBY_VEHICLES
   *
   * @param {number} ped
   * @param {DataView} sizeAndVehs
   * @return {number}
   */
declare function GetPedNearbyVehicles(ped: Ped, sizeAndVehs: DataView): number;

/**
   * GET_PED_RELATIONSHIP_GROUP_DEFAULT_HASH
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedRelationshipGroupDefaultHash(ped: Ped): number;

/**
   * GET_PED_RELATIONSHIP_GROUP_HASH
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedRelationshipGroupHash(ped: Ped): number;

/**
   * GET_PED_RESET_FLAG
   *
   * @param {number} ped
   * @param {number} flagId
   * @return {boolean}
   */
declare function GetPedResetFlag(ped: Ped, flagId: number): boolean;

/**
   * GET_PED_SOURCE_OF_DEATH
   * Returns the entity that killed the ped
   * 
   * It is best to check if the Ped is dead before asking for its killer.
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedSourceOfDeath(ped: Ped): Entity;

/**
   * GET_PED_STEALTH_MOVEMENT
   * Returns whether the entity is in stealth mode
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function GetPedStealthMovement(ped: Ped): boolean;

/**
   * GET_PED_TIME_OF_DEATH
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedTimeOfDeath(ped: Ped): number;

/**
   * GET_PED_TO_PLAYER_WEAPON_DAMAGE_MODIFIER
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedToPlayerWeaponDamageModifier(ped: Ped): number;

/**
   * GET_PED_TYPE
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedType(ped: Ped): number;

/**
   * GET_PLAYER_PED_IS_FOLLOWING
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPlayerPedIsFollowing(ped: Ped): Player;

/**
   * GET_RELATIONSHIP_BETWEEN_GROUPS
   *
   * @param {number} group1
   * @param {number} group2
   * @return {number}
   */
declare function GetRelationshipBetweenGroups(group1: Hash, group2: Hash): number;

/**
   * GET_RELATIONSHIP_BETWEEN_PEDS
   *
   * @param {number} ped1
   * @param {number} ped2
   * @return {number}
   */
declare function GetRelationshipBetweenPeds(ped1: Ped, ped2: Ped): number;

/**
   * GET_SEAT_PED_IS_TRYING_TO_ENTER
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetSeatPedIsTryingToEnter(ped: Ped): number;

/**
   * GET_SEAT_PED_IS_USING
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetSeatPedIsUsing(ped: Ped): number;

/**
   * GET_TRACKED_PED_PIXELCOUNT
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetTrackedPedPixelcount(ped: Ped): number;

/**
   * GET_VEHICLE_PED_IS_ENTERING
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetVehiclePedIsEntering(ped: Ped): Vehicle;

/**
   * GET_VEHICLE_PED_IS_IN
   * Gets the vehicle the specified Ped is in.
   * 
   * If the Ped is not in a vehicle and includeLastVehicle is true, the vehicle they were last in is returned.
   *
   * @param {number} ped
   * @param {boolean} lastVehicle
   * @return {number}
   */
declare function GetVehiclePedIsIn(ped: Ped, lastVehicle: boolean): Vehicle;

/**
   * GET_VEHICLE_PED_IS_USING
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetVehiclePedIsUsing(ped: Ped): Vehicle;

/**
   * GIVE_PED_HASH_SCENARIO_PROP
   *
   * @param {number} ped
   * @param {number} object
   * @param {string | number} conditionalAnim
   * @param {number} scenarioType
   * @param {number} p4
   * @param {boolean} p5
   * @return {boolean}
   */
declare function GivePedHashScenarioProp(ped: Ped, object: number, conditionalAnim: string | number, scenarioType: Hash, p4: Hash, p5: boolean): boolean;

/**
   * HAS_MOTION_TYPE_ASSET_LOADED
   *
   * @param {number} nameHash
   * @param {number} ped
   * @return {boolean}
   */
declare function HasMotionTypeAssetLoaded(nameHash: Hash, ped: Ped): boolean;

/**
   * INIT_PED_DEFAULT_HEALTH
   *
   * @param {number} ped
   * @return {void}
   */
declare function InitPedDefaultHealth(ped: Ped): void;

/**
   * INSTANTLY_FILL_PED_POPULATION
   *
  
   * @return {void}
   */
declare function InstantlyFillPedPopulation(): void;

/**
   * IS_ANIMAL_INTERACTION_POSSIBLE
   *
   * @param {number} ped
   * @param {number} animal
   * @return {boolean}
   */
declare function IsAnimalInteractionPossible(ped: Ped, animal: Ped): boolean;

/**
   * IS_ANY_HOSTILE_PED_NEAR_POINT
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @return {boolean}
   */
declare function IsAnyHostilePedNearPoint(ped: Ped, x: number, y: number, z: number, radius: number): boolean;

/**
   * IS_ANY_PED_NEAR_POINT
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @return {boolean}
   */
declare function IsAnyPedNearPoint(x: number, y: number, z: number, radius: number): boolean;

/**
   * IS_ANY_PED_SHOOTING_IN_AREA
   *
   * @param {number} x1
   * @param {number} y1
   * @param {number} z1
   * @param {number} x2
   * @param {number} y2
   * @param {number} z2
   * @param {boolean} p6
   * @param {boolean} p7
   * @return {boolean}
   */
declare function IsAnyPedShootingInArea(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, p6: boolean, p7: boolean): boolean;

/**
   * IS_EVENT_IN_QUEUE
   *
   * @param {number} ped
   * @param {number} eventType
   * @return {boolean}
   */
declare function IsEventInQueue(ped: Ped, eventType: Hash): boolean;

/**
   * IS_GROUP_LOCALLY_CONTROLLED
   *
   * @param {number} groupId
   * @return {boolean}
   */
declare function IsGroupLocallyControlled(groupId: number): boolean;

/**
   * IS_INSTANTLY_FILL_PED_POPULATION_FINISHED
   *
  
   * @return {boolean}
   */
declare function IsInstantlyFillPedPopulationFinished(): boolean;

/**
   * IS_LOCATION_SPAWN_SAFE
   *
   * @param {number} ped
   * @param {number} p1
   * @return {boolean}
   */
declare function IsLocationSpawnSafe(ped: Ped, p1: number): boolean;

/**
   * IS_PED_AIMING_FROM_COVER
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedAimingFromCover(ped: Ped): boolean;

/**
   * IS_PED_A_PLAYER
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedAPlayer(ped: Ped): boolean;

/**
   * IS_PED_BEING_DRAGGED
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedBeingDragged(ped: Ped): boolean;

/**
   * IS_PED_BEING_HOGTIED
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedBeingHogtied(ped: Ped): boolean;

/**
   * IS_PED_BEING_JACKED
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedBeingJacked(ped: Ped): boolean;

/**
   * IS_PED_BEING_STEALTH_KILLED
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedBeingStealthKilled(ped: Ped): boolean;

/**
   * IS_PED_BEING_STUNNED
   *
   * @param {number} ped
   * @param {number} weaponType
   * @return {boolean}
   */
declare function IsPedBeingStunned(ped: Ped, weaponType: Hash): boolean;

/**
   * IS_PED_CARRYING_SOMETHING
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedCarryingSomething(ped: Ped): boolean;

/**
   * IS_PED_CLIMBING
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedClimbing(ped: Ped): boolean;

/**
   * IS_PED_DEAD_OR_DYING
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {boolean}
   */
declare function IsPedDeadOrDying(ped: Ped, p1: boolean): boolean;

/**
   * IS_PED_DEFENSIVE_AREA_ACTIVE
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {boolean}
   */
declare function IsPedDefensiveAreaActive(ped: Ped, p1: boolean): boolean;

/**
   * IS_PED_DIVING
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedDiving(ped: Ped): boolean;

/**
   * IS_PED_ENTERING_ANY_TRANSPORT
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedEnteringAnyTransport(ped: Ped): boolean;

/**
   * IS_PED_EVASIVE_DIVING
   * Presumably returns the Entity that the Ped is currently diving out of the way of.
   *
   * @param {number} ped
   * @param {number} evadingEntity
   * @return {boolean}
   */
declare function IsPedEvasiveDiving(ped: Ped, evadingEntity: Entity): boolean;

/**
   * IS_PED_FACING_PED
   * angle is ped's view cone
   *
   * @param {number} ped
   * @param {number} otherPed
   * @param {number} angle
   * @return {boolean}
   */
declare function IsPedFacingPed(ped: Ped, otherPed: Ped, angle: number): boolean;

/**
   * IS_PED_FALLING
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedFalling(ped: Ped): boolean;

/**
   * IS_PED_FALLING_OVER
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedFallingOver(ped: Ped): boolean;

/**
   * IS_PED_FATALLY_INJURED
   * Gets a value indicating whether this ped's health is below its fatally injured threshold. The default threshold is 100.
   * If the handle is invalid, the function returns true.
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedFatallyInjured(ped: Ped): boolean;

/**
   * IS_PED_FLEEING
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedFleeing(ped: Ped): boolean;

/**
   * IS_PED_FULLY_ON_MOUNT
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {boolean}
   */
declare function IsPedFullyOnMount(ped: Ped, p1: boolean): boolean;

/**
   * IS_PED_GETTING_INTO_A_VEHICLE
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedGettingIntoAVehicle(ped: Ped): boolean;

/**
   * IS_PED_GOING_INTO_COVER
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedGoingIntoCover(ped: Ped): boolean;

/**
   * IS_PED_GROUP_MEMBER
   *
   * @param {number} ped
   * @param {number} groupId
   * @param {boolean} p2
   * @return {boolean}
   */
declare function IsPedGroupMember(ped: Ped, groupId: number, p2: boolean): boolean;

/**
   * IS_PED_HANGING_ON_TO_VEHICLE
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedHangingOnToVehicle(ped: Ped): boolean;

/**
   * IS_PED_HEADING_TOWARDS_POSITION
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} p4
   * @return {boolean}
   */
declare function IsPedHeadingTowardsPosition(ped: Ped, x: number, y: number, z: number, p4: number): boolean;

/**
   * IS_PED_HEADTRACKING_ENTITY
   *
   * @param {number} ped
   * @param {number} entity
   * @return {boolean}
   */
declare function IsPedHeadtrackingEntity(ped: Ped, entity: Entity): boolean;

/**
   * IS_PED_HEADTRACKING_PED
   *
   * @param {number} ped1
   * @param {number} ped2
   * @return {boolean}
   */
declare function IsPedHeadtrackingPed(ped1: Ped, ped2: Ped): boolean;

/**
   * IS_PED_HOGTIED
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedHogtied(ped: Ped): boolean;

/**
   * IS_PED_HOGTYING
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedHogtying(ped: Ped): boolean;

/**
   * IS_PED_HUMAN
   * Returns true/false if the ped is/isn't humanoid.
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedHuman(ped: Ped): boolean;

/**
   * IS_PED_INCAPACITATED
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedIncapacitated(ped: Ped): boolean;

/**
   * IS_PED_INJURED
   * Gets a value indicating whether this ped's health is below its injured threshold.
   * 
   * The default threshold is 100.
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedInjured(ped: Ped): boolean;

/**
   * IS_PED_IN_ANY_BOAT
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedInAnyBoat(ped: Ped): boolean;

/**
   * IS_PED_IN_ANY_HELI
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedInAnyHeli(ped: Ped): boolean;

/**
   * IS_PED_IN_ANY_PLANE
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedInAnyPlane(ped: Ped): boolean;

/**
   * IS_PED_IN_ANY_TAXI
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedInAnyTaxi(ped: Ped): boolean;

/**
   * IS_PED_IN_ANY_TRAIN
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedInAnyTrain(ped: Ped): boolean;

/**
   * IS_PED_IN_ANY_VEHICLE
   * Gets a value indicating whether the specified ped is in any vehicle.
   *
   * @param {number} ped
   * @param {boolean} atGetIn
   * @return {boolean}
   */
declare function IsPedInAnyVehicle(ped: Ped, atGetIn: boolean): boolean;

/**
   * IS_PED_IN_COMBAT
   *
   * @param {number} ped
   * @param {number} target
   * @return {boolean}
   */
declare function IsPedInCombat(ped: Ped, target: Ped): boolean;

/**
   * IS_PED_IN_COVER
   *
   * @param {number} ped
   * @param {boolean} p1
   * @param {boolean} p2
   * @return {boolean}
   */
declare function IsPedInCover(ped: Ped, p1: boolean, p2: boolean): boolean;

/**
   * IS_PED_IN_COVER_FACING_LEFT
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedInCoverFacingLeft(ped: Ped): boolean;

/**
   * IS_PED_IN_FLYING_VEHICLE
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedInFlyingVehicle(ped: Ped): boolean;

/**
   * IS_PED_IN_GROUP
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedInGroup(ped: Ped): boolean;

/**
   * IS_PED_IN_MELEE_COMBAT
   * Notes: The function only returns true while the ped is: 
   * A.) Swinging a random melee attack (including pistol-whipping)
   * 
   * B.) Reacting to being hit by a melee attack (including pistol-whipping)
   * 
   * C.) Is locked-on to an enemy (arms up, strafing/skipping in the default fighting-stance, ready to dodge+counter). 
   * 
   * You don't have to be holding the melee-targeting button to be in this stance; you stay in it by default for a few seconds after swinging at someone. If you do a sprinting punch, it returns true for the duration of the punch animation and then returns false again, even if you've punched and made-angry many peds
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedInMeleeCombat(ped: Ped): boolean;

/**
   * IS_PED_IN_MODEL
   *
   * @param {number} ped
   * @param {number} modelHash
   * @return {boolean}
   */
declare function IsPedInModel(ped: Ped, modelHash: Hash): boolean;

/**
   * IS_PED_IN_VEHICLE
   * Gets a value indicating whether the specified ped is in the specified vehicle.
   *
   * @param {number} ped
   * @param {number} vehicle
   * @param {boolean} atGetIn
   * @return {boolean}
   */
declare function IsPedInVehicle(ped: Ped, vehicle: Vehicle, atGetIn: boolean): boolean;

/**
   * IS_PED_JACKING
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedJacking(ped: Ped): boolean;

/**
   * IS_PED_JUMPING
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedJumping(ped: Ped): boolean;

/**
   * IS_PED_LASSOED
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedLassoed(ped: Ped): boolean;

/**
   * IS_PED_MALE
   * Returns true/false if the ped is/isn't male.
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedMale(ped: Ped): boolean;

/**
   * IS_PED_MODEL
   *
   * @param {number} ped
   * @param {number} modelHash
   * @return {boolean}
   */
declare function IsPedModel(ped: Ped, modelHash: Hash): boolean;

/**
   * IS_PED_ON_FOOT
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedOnFoot(ped: Ped): boolean;

/**
   * IS_PED_ON_MOUNT
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedOnMount(ped: Ped): boolean;

/**
   * IS_PED_ON_SPECIFIC_VEHICLE
   *
   * @param {number} ped
   * @param {number} vehicle
   * @return {boolean}
   */
declare function IsPedOnSpecificVehicle(ped: Ped, vehicle: Vehicle): boolean;

/**
   * IS_PED_ON_VEHICLE
   * Gets a value indicating whether the specified ped is on top of any vehicle.
   * 
   * Return 1 when ped is on vehicle.
   * Return 0 when ped is not on a vehicle.
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {boolean}
   */
declare function IsPedOnVehicle(ped: Ped, p1: boolean): boolean;

/**
   * IS_PED_OPENING_DOOR
   * Returns true if the ped is currently opening a door (CTaskOpenDoor).
   * 
   * Old name: _IS_PED_OPENING_A_DOOR
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedOpeningDoor(ped: Ped): boolean;

/**
   * IS_PED_PERFORMING_MELEE_ACTION
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} p2
   * @return {boolean}
   */
declare function IsPedPerformingMeleeAction(ped: Ped, p1: number, p2: Hash): boolean;

/**
   * IS_PED_PLANTING_BOMB
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedPlantingBomb(ped: Ped): boolean;

/**
   * IS_PED_PRONE
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedProne(ped: Ped): boolean;

/**
   * IS_PED_RAGDOLL
   * If the ped handle passed through the parenthesis is in a ragdoll state this will return true.
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedRagdoll(ped: Ped): boolean;

/**
   * IS_PED_READY_TO_RENDER
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedReadyToRender(ped: Ped): boolean;

/**
   * IS_PED_RELOADING
   * Returns whether the specified ped is reloading.
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedReloading(ped: Ped): boolean;

/**
   * IS_PED_RESPONDING_TO_EVENT
   * eventType: https://alloc8or.re/rdr3/doc/enums/eEventType.txt
   *
   * @param {number} ped
   * @param {number} eventType
   * @return {boolean}
   */
declare function IsPedRespondingToEvent(ped: Ped, eventType: Hash): boolean;

/**
   * IS_PED_RESPONDING_TO_THREAT
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedRespondingToThreat(ped: Ped): boolean;

/**
   * IS_PED_RUNNING_MOBILE_PHONE_TASK
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedRunningMobilePhoneTask(ped: Ped): boolean;

/**
   * IS_PED_RUNNING_RAGDOLL_TASK
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedRunningRagdollTask(ped: Ped): boolean;

/**
   * IS_PED_SHOOTING
   * Returns whether the specified ped is shooting.
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedShooting(ped: Ped): boolean;

/**
   * IS_PED_SITTING
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedSitting(ped: Ped): boolean;

/**
   * IS_PED_SITTING_IN_ANY_VEHICLE
   * Detect if ped is in any vehicle
   * [True/False]
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedSittingInAnyVehicle(ped: Ped): boolean;

/**
   * IS_PED_SITTING_IN_VEHICLE
   * Detect if ped is sitting in the specified vehicle
   * [True/False]
   *
   * @param {number} ped
   * @param {number} vehicle
   * @return {boolean}
   */
declare function IsPedSittingInVehicle(ped: Ped, vehicle: Vehicle): boolean;

/**
   * IS_PED_STOPPED
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedStopped(ped: Ped): boolean;

/**
   * IS_PED_SWIMMING
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedSwimming(ped: Ped): boolean;

/**
   * IS_PED_SWIMMING_UNDER_WATER
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedSwimmingUnderWater(ped: Ped): boolean;

/**
   * IS_PED_USING_ACTION_MODE
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedUsingActionMode(ped: Ped): boolean;

/**
   * IS_PED_USING_ANY_SCENARIO
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedUsingAnyScenario(ped: Ped): boolean;

/**
   * IS_PED_USING_SCENARIO_HASH
   * Equivalent to IS_PED_USING_SCENARIO from V but takes a hash instead of a string.
   *
   * @param {number} ped
   * @param {number} scenarioHash
   * @return {boolean}
   */
declare function IsPedUsingScenarioHash(ped: Ped, scenarioHash: Hash): boolean;

/**
   * IS_PED_USING_THIS_SCENARIO
   *
   * @param {number} ped
   * @param {number} scenario
   * @return {boolean}
   */
declare function IsPedUsingThisScenario(ped: Ped, scenario: number): boolean;

/**
   * IS_PED_VAULTING
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedVaulting(ped: Ped): boolean;

/**
   * IS_TARGET_PED_IN_PERCEPTION_AREA
   * Returns true if ped is in perception (focused and looking at target ped)
   * Most float params are -1.f in R* Scripts
   *
   * @param {number} ped
   * @param {number} targetPed
   * @param {number} p2
   * @param {number} customDistance
   * @param {number} p4
   * @param {number} p5
   * @return {boolean}
   */
declare function IsTargetPedInPerceptionArea(ped: Ped, targetPed: Ped, p2: number, customDistance: number, p4: number, p5: number): boolean;

/**
   * IS_TRACKED_PED_VISIBLE
   * Returns whether or not a ped is visible within your FOV, not this check auto's to false after a certain distance.
   * Target needs to be tracked first, won't work otherwise.
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsTrackedPedVisible(ped: Ped): boolean;

/**
   * KNOCK_OFF_PED_PROP
   *
   * @param {number} ped
   * @param {boolean} p1
   * @param {boolean} p2
   * @param {boolean} p3
   * @param {boolean} p4
   * @return {void}
   */
declare function KnockOffPedProp(ped: Ped, p1: boolean, p2: boolean, p3: boolean, p4: boolean): void;

/**
   * KNOCK_PED_OFF_VEHICLE
   *
   * @param {number} ped
   * @return {void}
   */
declare function KnockPedOffVehicle(ped: Ped): void;

/**
   * PED_COWER_IN_PLACE
   *
   * @param {number} ped
   * @param {number} ped2
   * @return {void}
   */
declare function PedCowerInPlace(ped: Ped, ped2: Ped): void;

/**
   * PED_COWER_MOVE_TO_POINT
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {number} ped2
   * @param {number} p5
   * @return {void}
   */
declare function PedCowerMoveToPoint(ped: Ped, p1: number, p2: number, p3: number, ped2: Ped, p5: number): void;

/**
   * REGISTER_HATED_TARGETS_AROUND_PED
   * Based on TASK_COMBAT_HATED_TARGETS_AROUND_PED, the parameters are likely similar (PedHandle, and area to attack in).
   *
   * @param {number} ped
   * @param {number} radius
   * @return {void}
   */
declare function RegisterHatedTargetsAroundPed(ped: Ped, radius: number): void;

/**
   * REGISTER_TARGET
   *
   * @param {number} ped
   * @param {number} targetPed
   * @param {boolean} p2
   * @return {void}
   */
declare function RegisterTarget(ped: Ped, targetPed: Ped, p2: boolean): void;

/**
   * RELEASE_PED_VISIBILITY_TRACKING
   *
   * @param {number} ped
   * @return {void}
   */
declare function ReleasePedVisibilityTracking(ped: Ped): void;

/**
   * REMOVE_GROUP
   *
   * @param {number} groupId
   * @return {void}
   */
declare function RemoveGroup(groupId: number): void;

/**
   * REMOVE_PED_DEFENSIVE_AREA
   * Ped will no longer get angry when you stay near him.
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function RemovePedDefensiveArea(ped: Ped, toggle: boolean): void;

/**
   * REMOVE_PED_FROM_GROUP
   *
   * @param {number} ped
   * @return {void}
   */
declare function RemovePedFromGroup(ped: Ped): void;

/**
   * REMOVE_RELATIONSHIP_GROUP
   *
   * @param {number} groupHash
   * @return {void}
   */
declare function RemoveRelationshipGroup(groupHash: Hash): void;

/**
   * REMOVE_SCENARIO_BLOCKING_AREA
   *
   * @param {any} p0
   * @param {boolean} p1
   * @return {void}
   */
declare function RemoveScenarioBlockingArea(p0: any, p1: boolean): void;

/**
   * REMOVE_SCENARIO_BLOCKING_AREAS
   *
  
   * @return {void}
   */
declare function RemoveScenarioBlockingAreas(): void;

/**
   * REMOVE_SHOP_ITEM_FROM_PED_BY_CATEGORY
   * Params: p2, p3 usually 0 in R* Scripts
   *
   * @param {number} ped
   * @param {number} componentCategory
   * @param {number} p2
   * @param {boolean} p3
   * @return {void}
   */
declare function RemoveShopItemFromPedByCategory(ped: Ped, componentCategory: Hash, p2: number, p3: boolean): void;

/**
   * REMOVE_TAG_FROM_META_PED
   *
   * @param {number} ped
   * @param {number} component
   * @param {number} p2
   * @return {void}
   */
declare function RemoveTagFromMetaPed(ped: Ped, component: Hash, p2: number): void;

/**
   * REQUEST_PED_USE_SMALL_BBOX_VISIBILITY_TRACKING
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {void}
   */
declare function RequestPedUseSmallBboxVisibilityTracking(ped: Ped, p1: boolean): void;

/**
   * REQUEST_PED_VEHICLE_VISIBILITY_TRACKING
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {void}
   */
declare function RequestPedVehicleVisibilityTracking(ped: Ped, p1: boolean): void;

/**
   * REQUEST_PED_VISIBILITY_TRACKING
   *
   * @param {number} ped
   * @return {void}
   */
declare function RequestPedVisibilityTracking(ped: Ped): void;

/**
   * RESET_AI_WEAPON_DAMAGE_MODIFIER
   *
  
   * @return {void}
   */
declare function ResetAiWeaponDamageModifier(): void;

/**
   * RESET_GROUP_FORMATION_DEFAULT_SPACING
   *
   * @param {number} groupId
   * @return {void}
   */
declare function ResetGroupFormationDefaultSpacing(groupId: number): void;

/**
   * RESET_HORSE_AVOIDANCE_LEVEL_TO_DEFAULT
   *
   * @param {number} horse
   * @return {void}
   */
declare function ResetHorseAvoidanceLevelToDefault(horse: Ped): void;

/**
   * RESET_PED_IN_VEHICLE_CONTEXT
   *
   * @param {number} ped
   * @return {void}
   */
declare function ResetPedInVehicleContext(ped: Ped): void;

/**
   * RESET_PED_LAST_VEHICLE
   * Resets the value for the last vehicle driven by the Ped.
   *
   * @param {number} ped
   * @return {void}
   */
declare function ResetPedLastVehicle(ped: Ped): void;

/**
   * RESET_PED_RAGDOLL_TIMER
   *
   * @param {number} ped
   * @return {void}
   */
declare function ResetPedRagdollTimer(ped: Ped): void;

/**
   * RESET_PED_WEAPON_MOVEMENT_CLIPSET
   *
   * @param {number} ped
   * @return {void}
   */
declare function ResetPedWeaponMovementClipset(ped: Ped): void;

/**
   * RESURRECT_PED
   * This function will simply bring the dead ped back to life.
   * 
   * Before calling this function, you may want to declare the position, where your Resurrected ped to be spawn at because theres a chance the ped will fall through the map
   * 
   * Also, disabling any assigned task immediately helped in the number of scenarios, where If you want peds to perform certain decided tasks.
   *
   * @param {number} ped
   * @return {void}
   */
declare function ResurrectPed(ped: Ped): void;

/**
   * REVIVE_INJURED_PED
   *
   * @param {number} ped
   * @return {void}
   */
declare function ReviveInjuredPed(ped: Ped): void;

/**
   * SET_AI_MELEE_WEAPON_DAMAGE_MODIFIER
   *
   * @param {number} modifier
   * @return {void}
   */
declare function SetAiMeleeWeaponDamageModifier(modifier: number): void;

/**
   * SET_AI_WEAPON_DAMAGE_MODIFIER
   *
   * @param {number} value
   * @return {void}
   */
declare function SetAiWeaponDamageModifier(value: number): void;

/**
   * SET_BLOCKING_OF_NON_TEMPORARY_EVENTS
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetBlockingOfNonTemporaryEvents(ped: Ped, toggle: boolean): void;

/**
   * SET_BLOCKING_OF_NON_TEMPORARY_EVENTS_FOR_AMBIENT_PEDS_THIS_FRAME
   *
   * @param {boolean} p0
   * @return {void}
   */
declare function SetBlockingOfNonTemporaryEventsForAmbientPedsThisFrame(p0: boolean): void;

/**
   * SET_COMBAT_FLOAT
   * combatType can be between 0-14. See GET_COMBAT_FLOAT below for a list of possible parameters.
   * https://github.com/femga/rdr3_discoveries/tree/master/AI/COMBAT_FLOATS 
   * https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/eCombatAttributeFloats
   *
   * @param {number} ped
   * @param {number} combatType
   * @param {number} newValue
   * @return {void}
   */
declare function SetCombatFloat(ped: Ped, combatType: number, newValue: number): void;

/**
   * SET_CREATE_RANDOM_COPS
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetCreateRandomCops(toggle: boolean): void;

/**
   * SET_ENABLE_BOUND_ANKLES
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetEnableBoundAnkles(ped: Ped, toggle: boolean): void;

/**
   * SET_ENABLE_HANDCUFFS
   * Ped can not pull out a weapon when true
   *
   * @param {number} ped
   * @param {boolean} p1
   * @param {boolean} p2
   * @return {void}
   */
declare function SetEnableHandcuffs(ped: Ped, p1: boolean, p2: boolean): void;

/**
   * SET_FACIAL_IDLE_ANIM_OVERRIDE
   *
   * @param {number} ped
   * @param {string | number} animName
   * @param {string | number} animDict
   * @return {void}
   */
declare function SetFacialIdleAnimOverride(ped: Ped, animName: string | number, animDict: string | number): void;

/**
   * SET_FORMATION_POSITIONS_TARGET_RADIUS
   *
   * @param {number} groupId
   * @param {number} radius
   * @return {boolean}
   */
declare function SetFormationPositionsTargetRadius(groupId: number, radius: number): boolean;

/**
   * SET_GROUP_FORMATION
   * eFormationType
   * 
   * 0: Default
   * 1: Circle Around Leader
   * 2: Alternative Circle Around Leader
   * 3: Line, with Leader at center
   *
   * @param {number} groupId
   * @param {number} formationType
   * @return {void}
   */
declare function SetGroupFormation(groupId: number, formationType: number): void;

/**
   * SET_GROUP_FORMATION_SPACING
   *
   * @param {number} groupId
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @return {void}
   */
declare function SetGroupFormationSpacing(groupId: number, p1: number, p2: number, p3: number): void;

/**
   * SET_GROUP_SEPARATION_RANGE
   * Sets the range at which members will automatically leave the group.
   *
   * @param {number} groupId
   * @param {number} separationRange
   * @return {void}
   */
declare function SetGroupSeparationRange(groupId: number, separationRange: number): void;

/**
   * SET_HORSE_AVOIDANCE_LEVEL
   * -1 - HORSE_ASSIST__NO_CHANGE
   *  0 - HORSE_ASSIST__MANUAL
   *  1 - HORSE_ASSIST__SEMIASSIST
   *  2 - HORSE_ASSIST__FULLASSIST
   *
   * @param {number} horse
   * @param {number} avoidanceLevel
   * @return {void}
   */
declare function SetHorseAvoidanceLevel(horse: Ped, avoidanceLevel: number): void;

/**
   * SET_IK_TARGET
   *
   * @param {number} ped
   * @param {number} ikIndex
   * @param {number} entityLookAt
   * @param {number} boneLookAt
   * @param {number} offsetX
   * @param {number} offsetY
   * @param {number} offsetZ
   * @param {any} p7
   * @param {number} blendInDuration
   * @param {number} blendOutDuration
   * @return {void}
   */
declare function SetIkTarget(ped: Ped, ikIndex: number, entityLookAt: Entity, boneLookAt: number, offsetX: number, offsetY: number, offsetZ: number, p7: any, blendInDuration: number, blendOutDuration: number): void;

/**
   * SET_LOOTING_FLAG
   * https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/CLootingFlags__Flags
   * https://github.com/femga/rdr3_discoveries/tree/master/AI/LOOTING_FLAGS
   * 
   * lootFlag:
   * enum eLootFlag
   * {
   *   LOOT_FLAG_IS_CRITICAL_LOOT_TARGET = 7,
   *   LOOT_FLAG_IGNORE_WATER_CHECKS = 8,
   *   LOOT_FLAG_ANIMAL_FLAGGED_FOR_TAGGING = 23,
   * };
   *
   * @param {number} ped
   * @param {number} lootFlag
   * @param {boolean} enabled
   * @return {void}
   */
declare function SetLootingFlag(ped: Ped, lootFlag: number, enabled: boolean): void;

/**
   * SET_PAUSE_PED_WRITHE_BLEEDOUT
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPausePedWritheBleedout(ped: Ped, toggle: boolean): void;

/**
   * SET_PED_ACCURACY
   * accuracy = 0-100, 100 being perfectly accurate
   *
   * @param {number} ped
   * @param {number} accuracy
   * @return {void}
   */
declare function SetPedAccuracy(ped: Ped, accuracy: number): void;

/**
   * SET_PED_AS_COP
   * Turns the desired ped into a cop. If you use this on the player ped, you will become almost invisible to cops dispatched for you. You will also report your own crimes, get a generic cop voice, get a cop-vision-cone on the radar, and you will be unable to shoot at other cops. Toggling ped as "false" has no effect; you must change p0's ped model to disable the effect.
   * toggle = bSetRelGroup
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedAsCop(ped: Ped, toggle: boolean): void;

/**
   * SET_PED_AS_GROUP_LEADER
   *
   * @param {number} ped
   * @param {number} groupId
   * @param {boolean} p2
   * @return {void}
   */
declare function SetPedAsGroupLeader(ped: Ped, groupId: number, p2: boolean): void;

/**
   * SET_PED_AS_GROUP_MEMBER
   *
   * @param {number} ped
   * @param {number} groupId
   * @return {void}
   */
declare function SetPedAsGroupMember(ped: Ped, groupId: number): void;

/**
   * SET_PED_CAN_ARM_IK
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedCanArmIk(ped: Ped, toggle: boolean): void;

/**
   * SET_PED_CAN_BE_INCAPACITATED
   * When set on a player ped, its just like when you die in RDO
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedCanBeIncapacitated(ped: Ped, toggle: boolean): void;

/**
   * SET_PED_CAN_BE_KNOCKED_OFF_VEHICLE
   * state:
   * enum eKnockOffVehicle
   * {
   *   KNOCKOFFVEHICLE_DEFAULT,
   *   KNOCKOFFVEHICLE_NEVER,
   *   KNOCKOFFVEHICLE_EASY,
   *   KNOCKOFFVEHICLE_HARD
   * };
   *
   * @param {number} ped
   * @param {number} state
   * @return {void}
   */
declare function SetPedCanBeKnockedOffVehicle(ped: Ped, state: number): void;

/**
   * SET_PED_CAN_BE_TARGETTED
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedCanBeTargetted(ped: Ped, toggle: boolean): void;

/**
   * SET_PED_CAN_BE_TARGETTED_BY_PLAYER
   *
   * @param {number} ped
   * @param {number} player
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedCanBeTargettedByPlayer(ped: Ped, player: Player, toggle: boolean): void;

/**
   * SET_PED_CAN_BE_TARGETTED_BY_TEAM
   *
   * @param {number} ped
   * @param {number} team
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedCanBeTargettedByTeam(ped: Ped, team: number, toggle: boolean): void;

/**
   * SET_PED_CAN_HEAD_IK
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedCanHeadIk(ped: Ped, toggle: boolean): void;

/**
   * SET_PED_CAN_LEG_IK
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedCanLegIk(ped: Ped, toggle: boolean): void;

/**
   * SET_PED_CAN_PLAY_AMBIENT_ANIMS
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedCanPlayAmbientAnims(ped: Ped, toggle: boolean): void;

/**
   * SET_PED_CAN_PLAY_AMBIENT_BASE_ANIMS
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedCanPlayAmbientBaseAnims(ped: Ped, toggle: boolean): void;

/**
   * SET_PED_CAN_PLAY_GESTURE_ANIMS
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function SetPedCanPlayGestureAnims(ped: Ped, p1: any, p2: any): void;

/**
   * SET_PED_CAN_RAGDOLL
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedCanRagdoll(ped: Ped, toggle: boolean): void;

/**
   * SET_PED_CAN_RAGDOLL_FROM_PLAYER_IMPACT
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedCanRagdollFromPlayerImpact(ped: Ped, toggle: boolean): void;

/**
   * SET_PED_CAN_TELEPORT_TO_GROUP_LEADER
   * This only will teleport the ped to the group leader if the group leader teleports (sets coords).
   * 
   * Only works in singleplayer
   *
   * @param {number} pedHandle
   * @param {number} groupId
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedCanTeleportToGroupLeader(pedHandle: Ped, groupId: number, toggle: boolean): void;

/**
   * SET_PED_CAN_TORSO_IK
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedCanTorsoIk(ped: Ped, toggle: boolean): void;

/**
   * SET_PED_CAN_TORSO_REACT_IK
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedCanTorsoReactIk(ped: Ped, toggle: boolean): void;

/**
   * SET_PED_CAN_TORSO_VEHICLE_IK
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedCanTorsoVehicleIk(ped: Ped, toggle: boolean): void;

/**
   * SET_PED_CAN_USE_AUTO_CONVERSATION_LOOKAT
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedCanUseAutoConversationLookat(ped: Ped, toggle: boolean): void;

/**
   * SET_PED_CAPSULE
   * Overrides the ped's collision capsule radius for the current tick.
   * Must be called every tick to be effective.
   * 
   * Setting this to 0.001 will allow warping through some objects.
   *
   * @param {number} ped
   * @param {number} value
   * @return {void}
   */
declare function SetPedCapsule(ped: Ped, value: number): void;

/**
   * SET_PED_CLOTH_PIN_FRAMES
   * Old name: SET_PED_CLOTH_PACKAGE_INDEX
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {void}
   */
declare function SetPedClothPinFrames(ped: Ped, p1: boolean): void;

/**
   * SET_PED_COMBAT_ABILITY
   * abilityLevel:
   * enum eCombatAbilityLevel
   * {
   *   CAL_POOR,
   *   CAL_AVERAGE,
   *   CAL_PROFESSIONAL
   * };
   *
   * @param {number} ped
   * @param {number} abilityLevel
   * @return {void}
   */
declare function SetPedCombatAbility(ped: Ped, abilityLevel: number): void;

/**
   * SET_PED_COMBAT_ATTRIBUTES
   * attributeIndex: https://alloc8or.re/rdr3/doc/enums/eCombatAttribute.txt
   * https://github.com/femga/rdr3_discoveries/tree/master/AI/COMBAT_ATTRIBUTES
   *
   * @param {number} ped
   * @param {number} attributeIndex
   * @param {boolean} enabled
   * @return {void}
   */
declare function SetPedCombatAttributes(ped: Ped, attributeIndex: number, enabled: boolean): void;

/**
   * SET_PED_COMBAT_MOVEMENT
   * 0 - Stationary (Will just stand in place)
   * 1 - Defensive (Will try to find cover and very likely to blind fire)
   * 2 - Offensive (Will attempt to charge at enemy but take cover as well)
   * 3 - Suicidal Offensive (Will try to flank enemy in a suicidal attack)
   *
   * @param {number} ped
   * @param {number} combatMovement
   * @return {void}
   */
declare function SetPedCombatMovement(ped: Ped, combatMovement: number): void;

/**
   * SET_PED_COMBAT_RANGE
   * range:
   * enum eCombatRange
   * {
   *   CR_NEAR,
   *   CR_MEDIUM,
   *   CR_FAR,
   *   CR_VERY_FAR
   * };
   *
   * @param {number} ped
   * @param {number} range
   * @return {void}
   */
declare function SetPedCombatRange(ped: Ped, range: number): void;

/**
   * SET_PED_CONFIG_FLAG
   * flagId: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/ePedScriptConfigFlags
   * https://alloc8or.re/rdr3/doc/enums/ePedScriptConfigFlags.txt
   * https://github.com/femga/rdr3_discoveries/tree/master/AI/CPED_CONFIG_FLAGS
   *
   * @param {number} ped
   * @param {number} flagId
   * @param {boolean} value
   * @return {void}
   */
declare function SetPedConfigFlag(ped: Ped, flagId: number, value: boolean): void;

/**
   * SET_PED_DEFENSIVE_AREA_DIRECTION
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {boolean} p4
   * @return {void}
   */
declare function SetPedDefensiveAreaDirection(ped: Ped, p1: number, p2: number, p3: number, p4: boolean): void;

/**
   * SET_PED_DEFENSIVE_AREA_VOLUME
   *
   * @param {number} ped
   * @param {number} volume
   * @param {boolean} p2
   * @param {boolean} p3
   * @param {boolean} p4
   * @return {void}
   */
declare function SetPedDefensiveAreaVolume(ped: Ped, volume: Volume, p2: boolean, p3: boolean, p4: boolean): void;

/**
   * SET_PED_DESIRED_HEADING
   *
   * @param {number} ped
   * @param {number} heading
   * @return {void}
   */
declare function SetPedDesiredHeading(ped: Ped, heading: number): void;

/**
   * SET_PED_FIRING_PATTERN
   * Used in various R* MP & SP Scripts
   *
   * @param {number} ped
   * @param {number} patternHash
   * @return {void}
   */
declare function SetPedFiringPattern(ped: Ped, patternHash: Hash): void;

/**
   * SET_PED_FLEE_ATTRIBUTES
   * https://github.com/femga/rdr3_discoveries/tree/master/AI/FLEE_ATTRIBUTES
   * 
   * attributeFlags:
   * enum eFleeAttribute
   * {
   *   FA_FORCE_EXIT_VEHICLE = (1 << 16),
   *   FA_DISABLE_MOUNT_USAGE = (1 << 20),
   *   FA_DISABLE_ENTER_VEHICLES = (1 << 22),
   * };
   *
   * @param {number} ped
   * @param {number} attributeFlags
   * @param {boolean} enable
   * @return {void}
   */
declare function SetPedFleeAttributes(ped: Ped, attributeFlags: number, enable: boolean): void;

/**
   * SET_PED_GESTURE_GROUP
   *
   * @param {number} ped
   * @param {string | number} gesture
   * @param {number} p2
   * @return {void}
   */
declare function SetPedGestureGroup(ped: Ped, gesture: string | number, p2: number): void;

/**
   * SET_PED_GRAVITY
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedGravity(ped: Ped, toggle: boolean): void;

/**
   * SET_PED_GROUP_MEMBER_PASSENGER_INDEX
   *
   * @param {number} ped
   * @param {number} index
   * @return {void}
   */
declare function SetPedGroupMemberPassengerIndex(ped: Ped, index: number): void;

/**
   * SET_PED_HEARING_RANGE
   *
   * @param {number} ped
   * @param {number} value
   * @return {void}
   */
declare function SetPedHearingRange(ped: Ped, value: number): void;

/**
   * SET_PED_HIGHLY_PERCEPTIVE
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedHighlyPerceptive(ped: Ped, toggle: boolean): void;

/**
   * SET_PED_ID_RANGE
   *
   * @param {number} ped
   * @param {number} value
   * @return {void}
   */
declare function SetPedIdRange(ped: Ped, value: number): void;

/**
   * SET_PED_INJURED_ON_GROUND_BEHAVIOUR
   *
   * @param {number} ped
   * @param {number} unk
   * @return {void}
   */
declare function SetPedInjuredOnGroundBehaviour(ped: Ped, unk: number): void;

/**
   * SET_PED_INTO_VEHICLE
   * Ped: The ped to warp.
   * vehicle: The vehicle to warp the ped into.
   * seatIndex: see CREATE_PED_INSIDE_VEHICLE
   *
   * @param {number} ped
   * @param {number} vehicle
   * @param {number} seatIndex
   * @return {void}
   */
declare function SetPedIntoVehicle(ped: Ped, vehicle: Vehicle, seatIndex: number): void;

/**
   * SET_PED_KEEP_TASK
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedKeepTask(ped: Ped, toggle: boolean): void;

/**
   * SET_PED_LASSO_HOGTIE_FLAG
   *
   * @param {number} ped
   * @param {number} flagId
   * @param {boolean} value
   * @return {void}
   */
declare function SetPedLassoHogtieFlag(ped: Ped, flagId: number, value: boolean): void;

/**
   * SET_PED_LEG_IK_MODE
   *
   * @param {number} ped
   * @param {number} mode
   * @return {void}
   */
declare function SetPedLegIkMode(ped: Ped, mode: number): void;

/**
   * SET_PED_LOD_MULTIPLIER
   *
   * @param {number} ped
   * @param {number} multiplier
   * @return {void}
   */
declare function SetPedLodMultiplier(ped: Ped, multiplier: number): void;

/**
   * SET_PED_MAX_HEALTH
   * Sets the maximum health of a ped.
   *
   * @param {number} ped
   * @param {number} value
   * @return {void}
   */
declare function SetPedMaxHealth(ped: Ped, value: number): void;

/**
   * SET_PED_MAX_MOVE_BLEND_RATIO
   *
   * @param {number} ped
   * @param {number} value
   * @return {void}
   */
declare function SetPedMaxMoveBlendRatio(ped: Ped, value: number): void;

/**
   * SET_PED_MAX_TIME_IN_WATER
   *
   * @param {number} ped
   * @param {number} value
   * @return {void}
   */
declare function SetPedMaxTimeInWater(ped: Ped, value: number): void;

/**
   * SET_PED_MAX_TIME_UNDERWATER
   *
   * @param {number} ped
   * @param {number} value
   * @return {void}
   */
declare function SetPedMaxTimeUnderwater(ped: Ped, value: number): void;

/**
   * SET_PED_MIN_MOVE_BLEND_RATIO
   *
   * @param {number} ped
   * @param {number} value
   * @return {void}
   */
declare function SetPedMinMoveBlendRatio(ped: Ped, value: number): void;

/**
   * SET_PED_MODEL_IS_SUPPRESSED
   *
   * @param {number} model
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedModelIsSuppressed(model: Hash, toggle: boolean): void;

/**
   * SET_PED_MONEY
   *
   * @param {number} ped
   * @param {number} amount
   * @return {void}
   */
declare function SetPedMoney(ped: Ped, amount: number): void;

/**
   * SET_PED_MOVE_ANIMS_BLEND_OUT
   *
   * @param {number} ped
   * @return {void}
   */
declare function SetPedMoveAnimsBlendOut(ped: Ped): void;

/**
   * SET_PED_MOVE_RATE_OVERRIDE
   * Min: 0.0f
   * Max: 1.15f
   *
   * @param {number} ped
   * @param {number} value
   * @return {void}
   */
declare function SetPedMoveRateOverride(ped: Ped, value: number): void;

/**
   * SET_PED_NAME_DEBUG
   * nullsub, doesn't do anything
   *
   * @param {number} ped
   * @param {string | number} name
   * @return {void}
   */
declare function SetPedNameDebug(ped: Ped, name: string | number): void;

/**
   * SET_PED_NON_CREATION_AREA
   * The distance between these points, is the diagonal of a box (remember it's 3D).
   *
   * @param {number} x1
   * @param {number} y1
   * @param {number} z1
   * @param {number} x2
   * @param {number} y2
   * @param {number} z2
   * @return {void}
   */
declare function SetPedNonCreationArea(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): void;

/**
   * SET_PED_ONTO_MOUNT
   *
   * @param {number} ped
   * @param {number} mount
   * @param {number} seatIndex
   * @param {boolean} p3
   * @return {void}
   */
declare function SetPedOntoMount(ped: Ped, mount: Ped, seatIndex: number, p3: boolean): void;

/**
   * SET_PED_OWNS_ANIMAL
   *
   * @param {number} ped
   * @param {number} animal
   * @param {boolean} p2
   * @return {void}
   */
declare function SetPedOwnsAnimal(ped: Ped, animal: Ped, p2: boolean): void;

/**
   * SET_PED_PANIC_EXIT_SCENARIO
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {boolean}
   */
declare function SetPedPanicExitScenario(ped: Ped, x: number, y: number, z: number): boolean;

/**
   * SET_PED_RAGDOLL_FORCE_FALL
   *
   * @param {number} ped
   * @return {void}
   */
declare function SetPedRagdollForceFall(ped: Ped): void;

/**
   * SET_PED_RAGDOLL_ON_COLLISION
   * Causes Ped to ragdoll on collision with any object (e.g Running into trashcan). If applied to player you will sometimes trip on the sidewalk.
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @param {boolean} p2
   * @return {void}
   */
declare function SetPedRagdollOnCollision(ped: Ped, toggle: boolean, p2: boolean): void;

/**
   * SET_PED_RANDOM_COMPONENT_VARIATION
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function SetPedRandomComponentVariation(ped: Ped, p1: number): void;

/**
   * SET_PED_RELATIONSHIP_GROUP_DEFAULT_HASH
   *
   * @param {number} ped
   * @param {number} hash
   * @return {void}
   */
declare function SetPedRelationshipGroupDefaultHash(ped: Ped, hash: Hash): void;

/**
   * SET_PED_RELATIONSHIP_GROUP_HASH
   *
   * @param {number} ped
   * @param {number} relationshipGroup
   * @return {void}
   */
declare function SetPedRelationshipGroupHash(ped: Ped, relationshipGroup: Hash): void;

/**
   * SET_PED_RESET_FLAG
   * Needs to be called every frame
   * 
   * flagid:https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/ePedScriptResetFlags
   * https://github.com/femga/rdr3_discoveries/tree/master/AI/CPED_RESET_FLAGS
   *
   * @param {number} ped
   * @param {number} flagId
   * @param {boolean} doReset
   * @return {void}
   */
declare function SetPedResetFlag(ped: Ped, flagId: number, doReset: boolean): void;

/**
   * SET_PED_SEEING_RANGE
   *
   * @param {number} ped
   * @param {number} value
   * @return {void}
   */
declare function SetPedSeeingRange(ped: Ped, value: number): void;

/**
   * SET_PED_SHOOT_RATE
   * Params: shootRate = 0 - 1000
   *
   * @param {number} ped
   * @param {number} shootRate
   * @return {void}
   */
declare function SetPedShootRate(ped: Ped, shootRate: number): void;

/**
   * SET_PED_SHOULD_PLAY_COMBAT_SCENARIO_EXIT
   * lookIntensity: see SET_PED_SHOULD_PLAY_FLEE_SCENARIO_EXIT
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} lookIntensity
   * @return {boolean}
   */
declare function SetPedShouldPlayCombatScenarioExit(ped: Ped, x: number, y: number, z: number, lookIntensity: number): boolean;

/**
   * SET_PED_SHOULD_PLAY_DIRECTED_NORMAL_SCENARIO_EXIT
   * Old name: _SET_PED_SHOULD_PLAY_DIRECTED_SCENARIO_EXIT
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {boolean}
   */
declare function SetPedShouldPlayDirectedNormalScenarioExit(ped: Ped, x: number, y: number, z: number): boolean;

/**
   * SET_PED_SHOULD_PLAY_EMOTIONAL_SCENARIO_EXIT
   * lookIntensity: see SET_PED_SHOULD_PLAY_FLEE_SCENARIO_EXIT
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} lookIntensity
   * @param {boolean} p5
   * @return {boolean}
   */
declare function SetPedShouldPlayEmotionalScenarioExit(ped: Ped, x: number, y: number, z: number, lookIntensity: number, p5: boolean): boolean;

/**
   * SET_PED_SHOULD_PLAY_FLEE_SCENARIO_EXIT
   * lookIntensity:
   * 0 - REACT_LOOK_NONE
   * 1 - REACT_LOOK_LOW
   * 2 - REACT_LOOK_MEDIUM
   * 3 - REACT_LOOK_HIGH
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} lookIntensity
   * @return {boolean}
   */
declare function SetPedShouldPlayFleeScenarioExit(ped: Ped, x: number, y: number, z: number, lookIntensity: number): boolean;

/**
   * SET_PED_SHOULD_PLAY_IMMEDIATE_SCENARIO_EXIT
   *
   * @param {number} ped
   * @return {void}
   */
declare function SetPedShouldPlayImmediateScenarioExit(ped: Ped): void;

/**
   * SET_PED_SHOULD_PLAY_NORMAL_SCENARIO_EXIT
   *
   * @param {number} ped
   * @return {void}
   */
declare function SetPedShouldPlayNormalScenarioExit(ped: Ped): void;

/**
   * SET_PED_SHOULD_PLAY_QUICK_SCENARIO_EXIT
   * lookIntensity: see SET_PED_SHOULD_PLAY_FLEE_SCENARIO_EXIT
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} lookIntensity
   * @param {boolean} p5
   * @return {boolean}
   */
declare function SetPedShouldPlayQuickScenarioExit(ped: Ped, x: number, y: number, z: number, lookIntensity: number, p5: boolean): boolean;

/**
   * SET_PED_SPHERE_DEFENSIVE_AREA
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @param {boolean} p5
   * @param {boolean} p6
   * @param {boolean} p7
   * @return {void}
   */
declare function SetPedSphereDefensiveArea(ped: Ped, x: number, y: number, z: number, radius: number, p5: boolean, p6: boolean, p7: boolean): void;

/**
   * SET_PED_STEALTH_MOVEMENT
   * Not implemented.
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function SetPedStealthMovement(ped: Ped, toggle: boolean, p2: any, p3: any): void;

/**
   * SET_PED_SWEAT
   *
   * @param {number} ped
   * @param {number} sweat
   * @return {void}
   */
declare function SetPedSweat(ped: Ped, sweat: number): void;

/**
   * SET_PED_TARGET_LOSS_RESPONSE
   * TLR_ExitTask = 0,
   * TLR_NeverLoseTarget,
   * TLR_SearchForTarget
   *
   * @param {number} ped
   * @param {number} responseType
   * @return {void}
   */
declare function SetPedTargetLossResponse(ped: Ped, responseType: number): void;

/**
   * SET_PED_TO_INFORM_RESPECTED_FRIENDS
   *
   * @param {number} ped
   * @param {number} radius
   * @param {number} maxFriends
   * @return {void}
   */
declare function SetPedToInformRespectedFriends(ped: Ped, radius: number, maxFriends: number): void;

/**
   * SET_PED_TO_PLAYER_WEAPON_DAMAGE_MODIFIER
   * Old name: _SET_PED_DAMAGE_MODIFIER
   *
   * @param {number} ped
   * @param {number} damageModifier
   * @return {void}
   */
declare function SetPedToPlayerWeaponDamageModifier(ped: Ped, damageModifier: number): void;

/**
   * SET_PED_TO_RAGDOLL
   * nmTaskMessageParameterName: See physicstasks.ymt. Search for DraggedByCart or 0xD00820D7 (Used in R* SP Script marston8)
   *
   * @param {number} ped
   * @param {number} timeMin
   * @param {number} timeMax
   * @param {number} ragdollType
   * @param {boolean} abortIfInjured
   * @param {boolean} abortIfDead
   * @param {string | number} nmTaskMessageParameterName
   * @return {boolean}
   */
declare function SetPedToRagdoll(ped: Ped, timeMin: number, timeMax: number, ragdollType: number, abortIfInjured: boolean, abortIfDead: boolean, nmTaskMessageParameterName: string | number): boolean;

/**
   * SET_PED_TO_RAGDOLL_WITH_FALL
   *
   * @param {number} ped
   * @param {number} timeMin
   * @param {number} timeMax
   * @param {number} ragdollType
   * @param {number} falldirX
   * @param {number} falldirY
   * @param {number} falldirZ
   * @param {number} p7
   * @param {number} p8
   * @param {number} p9
   * @param {number} p10
   * @param {number} p11
   * @param {number} p12
   * @param {number} p13
   * @return {boolean}
   */
declare function SetPedToRagdollWithFall(ped: Ped, timeMin: number, timeMax: number, ragdollType: number, falldirX: number, falldirY: number, falldirZ: number, p7: number, p8: number, p9: number, p10: number, p11: number, p12: number, p13: number): boolean;

/**
   * SET_PED_USING_ACTION_MODE
   *
   * @param {number} ped
   * @param {boolean} bActionModeEnabled
   * @param {number} p2
   * @param {string | number} action
   * @return {void}
   */
declare function SetPedUsingActionMode(ped: Ped, bActionModeEnabled: boolean, p2: number, action: string | number): void;

/**
   * SET_PED_VISUAL_FIELD_CENTER_ANGLE
   *
   * @param {number} ped
   * @param {number} angle
   * @return {void}
   */
declare function SetPedVisualFieldCenterAngle(ped: Ped, angle: number): void;

/**
   * SET_PED_VISUAL_FIELD_MAX_ANGLE
   *
   * @param {number} ped
   * @param {number} value
   * @return {void}
   */
declare function SetPedVisualFieldMaxAngle(ped: Ped, value: number): void;

/**
   * SET_PED_VISUAL_FIELD_MIN_ANGLE
   *
   * @param {number} ped
   * @param {number} value
   * @return {void}
   */
declare function SetPedVisualFieldMinAngle(ped: Ped, value: number): void;

/**
   * SET_PED_VISUAL_FIELD_PERIPHERAL_RANGE
   *
   * @param {number} ped
   * @param {number} range
   * @return {void}
   */
declare function SetPedVisualFieldPeripheralRange(ped: Ped, range: number): void;

/**
   * SET_PED_WETNESS_ENABLED_THIS_FRAME
   * combined with PED::SET_PED_WETNESS_HEIGHT(), this native makes the ped drenched in water up to the height specified in the other function
   *
   * @param {number} ped
   * @return {void}
   */
declare function SetPedWetnessEnabledThisFrame(ped: Ped): void;

/**
   * SET_PED_WETNESS_HEIGHT
   * It adds the wetness level to the player clothing/outfit. As if player just got out from water surface.
   *
   * @param {number} ped
   * @param {number} height
   * @return {void}
   */
declare function SetPedWetnessHeight(ped: Ped, height: number): void;

/**
   * SET_POP_CONTROL_SPHERE_THIS_FRAME
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {void}
   */
declare function SetPopControlSphereThisFrame(p0: any, p1: any, p2: any, p3: any, p4: any): void;

/**
   * SET_RAGDOLL_BLOCKING_FLAGS
   * https://github.com/femga/rdr3_discoveries/tree/master/AI/RAGDOLL_BLOCKING_FLAGS
   * 
   * flags:
   * enum eRagdollBlockingFlags
   * {
   *   RBF_BULLET_IMPACT = (1 << 0),
   *   RBF_VEHICLE_IMPACT = (1 << 1),
   *   RBF_FIRE = (1 << 2),
   *   RBF_ELECTROCUTION = (1 << 3),
   *   RBF_PLAYER_IMPACT = (1 << 4),
   *   RBF_EXPLOSION = (1 << 5),
   *   RBF_IMPACT_OBJECT = (1 << 6),
   *   RBF_MELEE = (1 << 7),
   *   RBF_RUBBER_BULLET = (1 << 8),
   *   RBF_FALLING = (1 << 9),
   *   RBF_WATER_JET = (1 << 10),
   *   RBF_DROWNING = (1 << 11),
   *   RBF_0x9F52E2C4 = (1 << 12),
   *   RBF_PLAYER_BUMP = (1 << 13),
   *   RBF_PLAYER_RAGDOLL_BUMP = (1 << 14),
   *   RBF_PED_RAGDOLL_BUMP = (1 << 15),
   *   RBF_VEHICLE_GRAB = (1 << 16),
   *   RBF_SMOKE_GRENADE = (1 << 17),
   *   RBF_HORSE_BUMP = (1 << 18),
   *   RBF_ACTIVATE_ON_COLLISION = (1 << 19)
   * };
   *
   * @param {number} ped
   * @param {number} flags
   * @return {void}
   */
declare function SetRagdollBlockingFlags(ped: Ped, flags: number): void;

/**
   * SET_RELATIONSHIP_BETWEEN_GROUPS
   *
   * @param {number} relationship
   * @param {number} group1
   * @param {number} group2
   * @return {void}
   */
declare function SetRelationshipBetweenGroups(relationship: number, group1: Hash, group2: Hash): void;

/**
   * SET_SCENARIO_PED_DENSITY_MULTIPLIER_THIS_FRAME
   *
   * @param {number} multiplier
   * @return {void}
   */
declare function SetScenarioPedDensityMultiplierThisFrame(multiplier: number): void;

/**
   * SPAWNPOINTS_CANCEL_SEARCH
   *
  
   * @return {void}
   */
declare function SpawnpointsCancelSearch(): void;

/**
   * SPAWNPOINTS_GET_NUM_SEARCH_RESULTS
   *
  
   * @return {number}
   */
declare function SpawnpointsGetNumSearchResults(): number;

/**
   * SPAWNPOINTS_GET_SEARCH_RESULT
   *
   * @param {number} randomInt
   * @param {DataView} y
   * @return {[number, number]}
   */
declare function SpawnpointsGetSearchResult(randomInt: number, y: DataView): [number, number];

/**
   * SPAWNPOINTS_GET_SEARCH_RESULT_FLAGS
   *
   * @param {any} p0
   * @param {DataView} p1
   * @return {void}
   */
declare function SpawnpointsGetSearchResultFlags(p0: any, p1: DataView): void;

/**
   * SPAWNPOINTS_IS_SEARCH_ACTIVE
   *
  
   * @return {boolean}
   */
declare function SpawnpointsIsSearchActive(): boolean;

/**
   * SPAWNPOINTS_IS_SEARCH_COMPLETE
   *
  
   * @return {boolean}
   */
declare function SpawnpointsIsSearchComplete(): boolean;

/**
   * SPAWNPOINTS_IS_SEARCH_FAILED
   *
  
   * @return {boolean}
   */
declare function SpawnpointsIsSearchFailed(): boolean;

/**
   * SPAWNPOINTS_START_SEARCH
   * Params: p4 = 35.f, duration = 5000 in R* Scripts
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} width
   * @param {number} p4
   * @param {number} spawnpointsFlag
   * @param {number} p6
   * @param {number} duration
   * @param {number} p8
   * @return {void}
   */
declare function SpawnpointsStartSearch(x: number, y: number, z: number, width: number, p4: number, spawnpointsFlag: number, p6: number, duration: number, p8: number): void;

/**
   * SPAWNPOINTS_START_SEARCH_IN_ANGLED_AREA
   * Searching area between coords 1 and 2
   *
   * @param {number} x1
   * @param {number} y1
   * @param {number} z1
   * @param {number} x2
   * @param {number} y2
   * @param {number} z2
   * @param {number} width
   * @param {number} spawnpointsFlag
   * @param {number} p8
   * @param {number} duration
   * @param {number} p10
   * @return {void}
   */
declare function SpawnpointsStartSearchInAngledArea(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, width: number, spawnpointsFlag: number, p8: number, duration: number, p10: number): void;

/**
   * SPECIAL_FUNCTION_DO_NOT_USE
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {void}
   */
declare function SpecialFunctionDoNotUse(ped: Ped, p1: boolean): void;

/**
   * TIME_SINCE_PED_LAST_SHOT
   * Returns time since the specified ped last shot, in seconds. (fPlayerJustShotTime)
   *
   * @param {number} ped
   * @return {number}
   */
declare function TimeSincePedLastShot(ped: Ped): number;

/**
   * TOGGLE_SCENARIO_PED_COWER_IN_PLACE
   * If toggle is true, when the ped is using a scenario he will stop it and become scared
   * If toggle is false, the ped will not be scared anymore and continue his scenario
   * 
   * Old name: _SET_PED_SCARED_WHEN_USING_SCENARIO
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function ToggleScenarioPedCowerInPlace(ped: Ped, toggle: boolean): void;

/**
   * WAS_PED_SKELETON_UPDATED
   * Despite this function's name, it simply returns whether the specified handle is a Ped.
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function WasPedSkeletonUpdated(ped: Ped): boolean;

/**
   * _0x00B380FF2DF6AB7A
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x00B380FF2DF6AB7A(p0: any, p1: any): void;

/**
   * _0x0105FEE8F9091255
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0x0105FEE8F9091255(p0: any, p1: any): any;

/**
   * _0x024EC9B649111915
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x024EC9B649111915(ped: Ped, p1: boolean): void;

/**
   * _0x028E7B3BBA0BD2FC
   * _SET_ST* - _SET_SW*
   *
   * @param {number} ped
   * @return {void}
   */
declare function N_0x028E7B3BBA0BD2FC(ped: Ped): void;

/**
   * _0x02E741E19E39628C
   * _SET_PLAYER_SN* - _SET_PLAYER_STAMINA*
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function N_0x02E741E19E39628C(ped: Ped, p1: number): void;

/**
   * _0x0455546F23FF08E4
   * _DOES_GROUP_* - _DOES_N*
   *
   * @param {number} groupId
   * @return {boolean}
   */
declare function N_0x0455546F23FF08E4(groupId: number): boolean;

/**
   * _0x06A10B4D7F50B0C3
   * _GET_PED_D*
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0x06A10B4D7F50B0C3(ped: Ped): boolean;

/**
   * _0x070A3841406C43D5
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x070A3841406C43D5(p0: any, p1: any): void;

/**
   * _0x07EA5B053FA60AC7
   *
   * @param {number} groupId
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x07EA5B053FA60AC7(groupId: number, p1: boolean): void;

/**
   * _0x09171A6F8FDE5DC1
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {void}
   */
declare function N_0x09171A6F8FDE5DC1(p0: any, p1: any, p2: any, p3: any, p4: any): void;

/**
   * _0x095C2277FED731DB
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x095C2277FED731DB(p0: any): any;

/**
   * _0x09D7AFD3716DA8E1
   *
   * @param {number} ped
   * @param {number} p1
   * @return {boolean}
   */
declare function N_0x09D7AFD3716DA8E1(ped: Ped, p1: number): boolean;

/**
   * _TOGGLE_PLAYER_PED_FLINCH
   * _TOGGLE_S* - _UPDATE_*
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} scale
   * @return {void}
   */
declare function TogglePlayerPedFlinch(ped: Ped, x: number, y: number, z: number, scale: number): void;

/**
   * _0x0A4618FFD517E24D
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x0A4618FFD517E24D(p0: any, p1: any): void;

/**
   * _0x0ADA3EC589E1736E
   *
  
   * @return {void}
   */
declare function N_0x0ADA3EC589E1736E(): void;

/**
   * _0x0B787A37EEDD226F
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x0B787A37EEDD226F(p0: any, p1: any): void;

/**
   * _0x0D3B1568917EBDA0
   * _IS_PED_M*
   *
   * @param {number} ped
   * @param {number} p1
   * @return {boolean}
   */
declare function N_0x0D3B1568917EBDA0(ped: Ped, p1: number): boolean;

/**
   * _0x0D497AA69059FE40
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x0D497AA69059FE40(p0: any, p1: any): void;

/**
   * _0x0EA9EACBA3B01601
   * _CAN_PED_B* - _CAN_PED_I*
   *
   * @param {number} ped1
   * @param {number} ped2
   * @param {boolean} p2
   * @return {number}
   */
declare function N_0x0EA9EACBA3B01601(ped1: Ped, ped2: Ped, p2: boolean): number;

/**
   * _0x0EEF7A81C17679DB
   * _IS_PED_L* - _IS_PED_M*
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0x0EEF7A81C17679DB(ped: Ped): boolean;

/**
   * _0x0F967019CC853BCC
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x0F967019CC853BCC(p0: any, p1: any): void;

/**
   * _0x0FB1BA7FF73B41E1
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0x0FB1BA7FF73B41E1(p0: any, p1: any, p2: any): void;

/**
   * _0x0FFDF937E5C11382
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @return {void}
   */
declare function N_0x0FFDF937E5C11382(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;

/**
   * _0x101B45C5F56D970F
   *
   * @param {DataView} p0
   * @param {number} ped
   * @param {number} damageCleanliness
   * @param {number} p3
   * @return {boolean}
   */
declare function N_0x101B45C5F56D970F(p0: DataView, ped: Ped, damageCleanliness: number, p3: number): boolean;

/**
   * _0x10F96086123B939F
   * NB_CUSTOM_CLIENT_ON_CREATE_COMPLETE - set legendary to not avoid prey
   *
   * @param {number} legendaryPed
   * @param {number} preyPed
   * @param {number} p2
   * @return {void}
   */
declare function N_0x10F96086123B939F(legendaryPed: Ped, preyPed: Ped, p2: number): void;

/**
   * _0x1148F706CF4EBDDA
   * _CAN_PED_SEE* - _CAN_PED_USE_(SCENARIO_HASH?)*
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} p2
   * @return {boolean}
   */
declare function N_0x1148F706CF4EBDDA(ped: Ped, p1: Hash, p2: number): boolean;

/**
   * _0x1298B3D8E4C2409F
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x1298B3D8E4C2409F(p0: any): void;

/**
   * _0x12EB4E31F092C9B3
   * _GET_IS_PED_(BLEEDING_OUT?)*
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0x12EB4E31F092C9B3(ped: Ped): boolean;

/**
   * _0x12F2D161BF4031FC
   * _SET_A* - _SET_B*
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function N_0x12F2D161BF4031FC(ped: Ped, p1: number): void;

/**
   * _0x134775B093AD5C38
   * _GET_PED_M*
   *
   * @param {number} ped
   * @return {number}
   */
declare function N_0x134775B093AD5C38(ped: Ped): number;

/**
   * _0x154B7E841AC7412F
   * _SET_SCENARIO_PED_* - _SET_SPAWNER_*
   *
   * @param {number} groupId
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x154B7E841AC7412F(groupId: number, p1: boolean): void;

/**
   * _0x15F4732C357B1D6D
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0x15F4732C357B1D6D(p0: any, p1: any, p2: any): void;

/**
   * _0x16802C32B2FCA06B
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function N_0x16802C32B2FCA06B(p0: any, p1: any, p2: any, p3: any): void;

/**
   * _0x16F798A05BB9E3B5
   * _PED_COWER_M*
   *
   * @param {number} ped
   * @return {void}
   */
declare function N_0x16F798A05BB9E3B5(ped: Ped): void;

/**
   * _0x1D23D3F70606D788
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x1D23D3F70606D788(p0: any, p1: any): void;

/**
   * _0x1D4636C90BBEFACB
   * _SET_PED_CA* - _SET_PED_CO*
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function N_0x1D4636C90BBEFACB(ped: Ped, p1: number): void;

/**
   * _0x1E017404784AA6A3
   * something to do with speech lines? 
   *  some hashs MAR2_RIDE1, MAR2_RIDE1, RBCH1_RIDE1, SAD5_RIDE1
   *
   * @param {number} ped
   * @param {number} p1
   * @return {boolean}
   */
declare function N_0x1E017404784AA6A3(ped: Ped, p1: Hash): boolean;

/**
   * _0x1F44B7E283C09EDE
   * Only used in SP R* Scripts
   * Params: p2 = same as p2 of 0x3C529A827998F9B3
   * _SET_PED_TA* - _SET_PED_TO_*
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} p2
   * @return {void}
   */
declare function N_0x1F44B7E283C09EDE(ped: Ped, p1: number, p2: number): void;

/**
   * _APPLY_COLD_TO_PED
   * Apply cold intensity to ped from 0.0 to 1.0
   *
   * @param {number} ped
   * @param {number} intensity
   * @param {number} p2
   * @return {void}
   */
declare function ApplyColdToPed(ped: Ped, intensity: number, p2: number): void;

/**
   * _0x2371C39D4F91C288
   *
   * @param {number} ped
   * @return {void}
   */
declare function N_0x2371C39D4F91C288(ped: Ped): void;

/**
   * _0x23BDE06596A22CEC
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} p2
   * @param {any} p3
   * @return {void}
   */
declare function N_0x23BDE06596A22CEC(ped: Ped, p1: number, p2: number, p3: any): void;

/**
   * _0x242EDF85D4E87B65
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x242EDF85D4E87B65(p0: any): any;

/**
   * _0x256EDD55C6BE1482
   * _IS_PED_FL* - _IS_PED_FU*
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0x256EDD55C6BE1482(ped: Ped): boolean;

/**
   * _0x273915CE30780986
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0x273915CE30780986(p0: any, p1: any): any;

/**
   * _0x27E8A84C12B0B7D1
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {any}
   */
declare function N_0x27E8A84C12B0B7D1(p0: any, p1: any, p2: any): any;

/**
   * _0x28508173C6A7CC18
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x28508173C6A7CC18(p0: any): void;

/**
   * _0x290B2E6CCDE532E1
   * _IS_PED_L* - _IS_PED_M*
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0x290B2E6CCDE532E1(ped: Ped): boolean;

/**
   * _0x29924EB8EE9DB926
   * _SET_PED_K* or _SET_PED_L*
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function N_0x29924EB8EE9DB926(ped: Ped, p1: number): void;

/**
   * _0x29F3539189D3E277
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x29F3539189D3E277(p0: any, p1: any): void;

/**
   * _0x2B4CE170DE09F346
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function N_0x2B4CE170DE09F346(ped: Ped, p1: Hash): void;

/**
   * _0x2BA9D7BF629F920C
   * Used in Script Function CHECK_IS_PLAYER_SEEN
   * _GET_PED_*
   *
   * @param {number} ped
   * @return {number}
   */
declare function N_0x2BA9D7BF629F920C(ped: Ped): number;

/**
   * _0x2D976DBDC731DF80
   *
   * @param {number} ped
   * @return {void}
   */
declare function N_0x2D976DBDC731DF80(ped: Ped): void;

/**
   * _0x2DC0E8DCBD3546E9
   * _IS_PED_D*
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0x2DC0E8DCBD3546E9(ped: Ped): boolean;

/**
   * _0x2DD4E0E26DFAD97D
   * _IS_PED_M* - _IS_PED_O*
   *
   * @param {number} ped1
   * @param {number} ped2
   * @param {number} p2
   * @return {boolean}
   */
declare function N_0x2DD4E0E26DFAD97D(ped1: Ped, ped2: Ped, p2: number): boolean;

/**
   * _0x2E5B5D1F1453E08E
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function N_0x2E5B5D1F1453E08E(ped: Ped, p1: number): void;

/**
   * _0x2FA568BFA725F8D6
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function N_0x2FA568BFA725F8D6(p0: any, p1: any, p2: any, p3: any): void;

/**
   * _0x31B2E7F2E3C58B89
   * _GET_SHOP_ITEM_NUM_*? returns a number of ? p1 seems to be always joaat("base") 
   *
   * @param {number} componentHash
   * @param {number} p1
   * @param {number} metapedType
   * @param {boolean} isMp
   * @return {number}
   */
declare function N_0x31B2E7F2E3C58B89(componentHash: Hash, p1: Hash, metapedType: number, isMP: boolean): number;

/**
   * _0x32417CB860A3BDC4
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0x32417CB860A3BDC4(p0: any, p1: any): any;

/**
   * _0x326F7951EF0D7F75
   * Only used in R* SP Script short_update
   * _GET_TARGET_* - _GET_TRACKED*
   *
   * @param {number} ped
   * @param {number} eventType
   * @return {any}
   */
declare function N_0x326F7951EF0D7F75(ped: Ped, eventType: Hash): any;

/**
   * _0x329772C47DBB2FBC
   * _SET_PED_P* - _SET_PED_R*
   *
   * @param {number} ped
   * @return {void}
   */
declare function N_0x329772C47DBB2FBC(ped: Ped): void;

/**
   * _0x32CCAD8A981B53D3
   * _STOP_(?)*
   *
   * @param {number} ped
   * @return {void}
   */
declare function N_0x32CCAD8A981B53D3(ped: Ped): void;

/**
   * _0x32CEDA9A0AB4CEF7
   *
   * @param {number} ped
   * @param {number} p1
   * @param {boolean} p2
   * @return {void}
   */
declare function N_0x32CEDA9A0AB4CEF7(ped: Ped, p1: Hash, p2: boolean): void;

/**
   * _0x34B5CEAC180A5D6E
   *
   * @param {number} ped
   * @param {number} p1
   * @param {boolean} p2
   * @return {void}
   */
declare function N_0x34B5CEAC180A5D6E(ped: Ped, p1: Hash, p2: boolean): void;

/**
   * _0x34C11114887150FD
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x34C11114887150FD(p0: any, p1: any): void;

/**
   * _0x34EDDD59364AD74A
   *
   * @param {number} ped
   * @param {DataView} p1
   * @return {void}
   */
declare function N_0x34EDDD59364AD74A(ped: Ped, p1: DataView): void;

/**
   * _0x354CA4DDDEEC397A
   *
   * @param {number} ped
   * @return {number}
   */
declare function N_0x354CA4DDDEEC397A(ped: Ped): number;

/**
   * _RESET_PED_STAMINA
   * Seems to set the peds stamina to 30%
   *
   * @param {number} ped
   * @return {void}
   */
declare function ResetPedStamina(ped: Ped): void;

/**
   * _0x370A973252741AC4
   * _RESET_PED_*
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x370A973252741AC4(ped: Ped, p1: boolean): void;

/**
   * _0x3A5697B80FED5EBE
   * _SET_PED_MO*
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {number} p4
   * @return {void}
   */
declare function N_0x3A5697B80FED5EBE(ped: Ped, p1: number, p2: number, p3: number, p4: number): void;

/**
   * _0x3ACCE14DFA6BA8C2
   * Used in R* Script net_fetch (NET_FETCH_UPDATE_RECIPIENT_PROP_ILO_IN_COMBAT) and various SP Scripts
   * Params: p1 = 4/5/6, p5 = 40.f/100.f, coords = Player ped
   * Perhaps returns some distance (Clearing that the local player is able to use ILO while in combat because they are near the recipient but also near hated peds)
   * _GET_NUM_M* - _GET_PEDS_J*
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} p5
   * @param {number} itemset
   * @return {number}
   */
declare function N_0x3ACCE14DFA6BA8C2(ped: Ped, p1: number, x: number, y: number, z: number, p5: number, itemset: ItemSet): number;

/**
   * _0x3AEC4A410ECAF30D
   * _IS_PED_R*
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0x3AEC4A410ECAF30D(ped: Ped): boolean;

/**
   * _0x3C529A827998F9B3
   * _SET_PED_TA* - _SET_PED_TO_*
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} p2
   * @return {void}
   */
declare function N_0x3C529A827998F9B3(ped: Ped, p1: number, p2: number): void;

/**
   * _0x3D9F958834AB9C30
   *
   * @param {number} ped
   * @return {number}
   */
declare function N_0x3D9F958834AB9C30(ped: Ped): Ped;

/**
   * _0x3EFED081B4834BA1
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x3EFED081B4834BA1(p0: any): void;

/**
   * _0x3FCBB5FCFD968698
   * Used for script function PROCESS_PLAYER_HAT_EVENT
   * Returns requestId to be used with 0x13E7320C762F0477
   *
   * @param {number} drawable
   * @param {number} albedo
   * @param {number} normal
   * @param {number} material
   * @param {any} p4
   * @return {number}
   */
declare function N_0x3FCBB5FCFD968698(drawable: Hash, albedo: Hash, normal: Hash, material: Hash, p4: any): number;

/**
   * _0x3FDBB99EFD8CE4AF
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0x3FDBB99EFD8CE4AF(p0: any, p1: any, p2: any): void;

/**
   * _0x3FDCC1F8C17E303E
   * Changes health bar around heart core icon
   * INITIALISE_NEW_ROLE - Applying Super Jump buffs: p1 = 10, p2 = 0.0f
   * INITIALISE_NEW_ROLE - Clearing up Super Jump buffs: p1 = 10, p2 = 1.0f
   * _SET_D*
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} p2
   * @return {void}
   */
declare function N_0x3FDCC1F8C17E303E(ped: Ped, p1: number, p2: number): void;

/**
   * _0x405180B14DA5A935
   * _SET_PED_A*
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x405180B14DA5A935(ped: Ped, p1: boolean): void;

/**
   * _0x40C3524D4ED83554
   * _SET_SCENARIO_PED_* - _SET_SPAWNER_*
   *
   * @param {number} groupId
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x40C3524D4ED83554(groupId: number, p1: boolean): void;

/**
   * _0x40C9155AF8BC13F3
   * _IS_PED_RE*
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0x40C9155AF8BC13F3(ped: Ped): boolean;

/**
   * _0x413697EC260AABBF
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0x413697EC260AABBF(p0: any, p1: any, p2: any): void;

/**
   * _0x41C23A8E6B344867
   * _SET_PED_IN*
   *
   * @param {number} ped
   * @param {string | number} p1
   * @return {void}
   */
declare function N_0x41C23A8E6B344867(ped: Ped, p1: string | number): void;

/**
   * _0x45FEA6D5539BD474
   * _SET_PED_IN*
   *
   * @param {number} ped
   * @param {string | number} p1
   * @return {void}
   */
declare function N_0x45FEA6D5539BD474(ped: Ped, p1: string | number): void;

/**
   * _0x4642182A298187D0
   *
   * @param {number} ped
   * @param {number} p1
   * @param {DataView} p2
   * @param {number} p3
   * @param {number} p4
   * @return {number}
   */
declare function N_0x4642182A298187D0(ped: Ped, p1: number, p2: DataView, p3: number, p4: number): number;

/**
   * _0x46BF2A810679D6E6
   * Returns vehicle (desired) speed
   * _COMPUTE_(VEHICLE_SPEED_USING_BLEND_RATIO?)*
   *
   * @param {number} ped
   * @param {number} maxMoveBlendRatio
   * @return {number}
   */
declare function N_0x46BF2A810679D6E6(ped: Ped, maxMoveBlendRatio: number): number;

/**
   * _0x49DADFC4CD808B0A
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0x49DADFC4CD808B0A(p0: any, p1: any, p2: any): void;

/**
   * _0x4B19F171450E0D4F
   *
   * @param {number} ped
   * @return {number}
   */
declare function N_0x4B19F171450E0D4F(ped: Ped): Ped;

/**
   * _0x4E68C7EF706DF35D
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} p4
   * @param {number} relationshipGroup
   * @return {void}
   */
declare function N_0x4E68C7EF706DF35D(ped: Ped, x: number, y: number, z: number, p4: number, relationshipGroup: Hash): void;

/**
   * _0x4EC4EA2F72B36358
   * _SET_PED_A*
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x4EC4EA2F72B36358(ped: Ped, p1: boolean): void;

/**
   * _0x4F27603E44A8E4C0
   *
   * @param {number} ped
   * @param {number} p1
   * @param {boolean} p2
   * @return {void}
   */
declare function N_0x4F27603E44A8E4C0(ped: Ped, p1: number, p2: boolean): void;

/**
   * _0x4F63433CE3C08230
   * Only used in R* Script shop_harriet
   * _SET_PED_F*
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x4F63433CE3C08230(ped: Ped, p1: boolean): void;

/**
   * _0x5203038FF8BAE577
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} p2
   * @return {boolean}
   */
declare function N_0x5203038FF8BAE577(ped: Ped, p1: number, p2: number): boolean;

/**
   * _0x52250B92EA70BE3D
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x52250B92EA70BE3D(p0: any): any;

/**
   * _0x52A24D8A1DA89658
   *
   * @param {number} ped
   * @param {number} p1
   * @param {boolean} p2
   * @return {void}
   */
declare function N_0x52A24D8A1DA89658(ped: Ped, p1: number, p2: boolean): void;

/**
   * _0x53BA7D96B9A421D9
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x53BA7D96B9A421D9(p0: any, p1: any): void;

/**
   * _0x54D3CD482742C482
   *
   * @param {number} animal
   * @param {number} p2
   * @return {void}
   */
declare function N_0x54D3CD482742C482(animal: Ped, p2: number): void;

/**
   * _0x550CB89DD7F4FA3D
   * _HAS_PED_*
   *
   * @param {number} ped1
   * @param {number} ped2
   * @return {boolean}
   */
declare function N_0x550CB89DD7F4FA3D(ped1: Ped, ped2: Ped): boolean;

/**
   * _0x55546004A244302A
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x55546004A244302A(p0: any, p1: any): void;

/**
   * _0x56076667E7C2DCD6
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x56076667E7C2DCD6(p0: any, p1: any): void;

/**
   * _0x56E4BAD93D33453C
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0x56E4BAD93D33453C(p0: any, p1: any): any;

/**
   * _0x577C60BA06D0EA64
   * _IS_PED_C* - _IS_PED_D*
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0x577C60BA06D0EA64(ped: Ped): boolean;

/**
   * _0x57F35552E771BE9D
   * _SET_PED_M*
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function N_0x57F35552E771BE9D(ped: Ped, p1: number): void;

/**
   * _APPLY_PED_DAMAGE_PACK_TO_BONE
   * seems to only work with PD_Vomit ? 
   *
   * @param {number} ped
   * @param {number} boneId
   * @param {number} xOffset
   * @param {number} yOffset
   * @param {number} zOffset
   * @param {number} xRot
   * @param {number} yRot
   * @param {number} zRot
   * @param {string | number} damagePack
   * @return {void}
   */
declare function ApplyPedDamagePackToBone(ped: Ped, boneId: number, xOffset: number, yOffset: number, zOffset: number, xRot: number, yRot: number, zRot: number, damagePack: string | number): void;

/**
   * _0x5A1A929C8B729B4A
   * _C*
   *
   * @param {number} ped
   * @return {void}
   */
declare function N_0x5A1A929C8B729B4A(ped: Ped): void;

/**
   * _0x5AF24CA9C974E51A
   * _SET_C*
   *
   * @param {number} ped1
   * @param {number} ped2
   * @return {void}
   */
declare function N_0x5AF24CA9C974E51A(ped1: Ped, ped2: Ped): void;

/**
   * _0x5B73975B4F12F7F3
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {void}
   */
declare function N_0x5B73975B4F12F7F3(p0: any, p1: any, p2: any, p3: any, p4: any): void;

/**
   * _0x5BB04BC74A474B47
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x5BB04BC74A474B47(p0: any, p1: any): void;

/**
   * _0x5BF0B9D9A8E227A0
   * _IS_PED_B* - _IS_PED_C*
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0x5BF0B9D9A8E227A0(ped: Ped): boolean;

/**
   * _0x5C6C7C70CA302801
   * _IS_PED_IN*
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0x5C6C7C70CA302801(ped: Ped): boolean;

/**
   * _0x5C90E20C25E6D83C
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x5C90E20C25E6D83C(p0: any): void;

/**
   * _0x5CA20FBE49891BBD
   * Used in Script Function MP_MAIN_OFFLINE__INITIALIZE_FLOW & PROCESS_GENERIC_PLAYER_INITIALIZATION
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function N_0x5CA20FBE49891BBD(ped: Ped, p1: number): void;

/**
   * _0x5CB2EBB467BE3ED6
   *
   * @param {number} animal
   * @param {number} p2
   * @return {void}
   */
declare function N_0x5CB2EBB467BE3ED6(animal: Ped, p2: number): void;

/**
   * _0x5D4CD22A8C82A81A
   * Related to ped hat
   * _SET_PED_LA* - _SET_PED_LE*
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x5D4CD22A8C82A81A(ped: Ped, p1: boolean): void;

/**
   * _0x5DA36CCCB63C0895
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {any}
   */
declare function N_0x5DA36CCCB63C0895(p0: any, p1: any, p2: any): any;

/**
   * _0x5E9FAF6C513347B4
   * Only used in R* SP Scripts
   * _GET_PED_IN*
   *
   * @param {number} ped
   * @param {number} eventType
   * @return {number}
   */
declare function N_0x5E9FAF6C513347B4(ped: Ped, eventType: Hash): Entity;

/**
   * _0x5EFA8A3D8A60D662
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0x5EFA8A3D8A60D662(p0: any, p1: any): any;

/**
   * _0x5FCF25D584065BFD
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function N_0x5FCF25D584065BFD(p0: any, p1: any, p2: any, p3: any): void;

/**
   * _0x600BBDD29820370C
   * Not implemented.
   *
   * @param {number} ped
   * @return {void}
   */
declare function N_0x600BBDD29820370C(ped: Ped): void;

/**
   * _0x604E1010E3162E86
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0x604E1010E3162E86(p0: any, p1: any, p2: any): void;

/**
   * _0x606D529DADA3C940
   * Not implemented.
   *
   * @param {number} ped
   * @param {any} p1
   * @return {void}
   */
declare function N_0x606D529DADA3C940(ped: Ped, p1: any): void;

/**
   * _0x62FDF4E678E40CC6
   * Returns p1 value for 0x8E84119A23C16623
   *
   * @param {number} entity
   * @param {any} p1
   * @return {any}
   */
declare function N_0x62FDF4E678E40CC6(entity: Entity, p1: any): any;

/**
   * _0x633F83B301C87994
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x633F83B301C87994(p0: any, p1: any): void;

/**
   * _0x642720D8D69328B6
   * _SET_PED_M*
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function N_0x642720D8D69328B6(ped: Ped, p1: Hash): void;

/**
   * _0x6507AC3BD7C99009
   * _IS_N* - _IS_P*
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} p3
   * @return {boolean}
   */
declare function N_0x6507AC3BD7C99009(x: number, y: number, z: number, p3: number): boolean;

/**
   * _0x6734F0A6A52C371C
   *
   * @param {number} player
   * @param {number} horseSlot
   * @return {void}
   */
declare function N_0x6734F0A6A52C371C(player: Player, horseSlot: number): void;

/**
   * _0x6A190B94C2541A99
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x6A190B94C2541A99(p0: any): void;

/**
   * _0x6A489892E813951A
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x6A489892E813951A(p0: any): void;

/**
   * _0x6B67320E0D57856A
   *
   * @param {number} ped
   * @param {DataView} p1
   * @param {number} p2
   * @param {boolean} p3
   * @return {void}
   */
declare function N_0x6B67320E0D57856A(ped: Ped, p1: DataView, p2: number, p3: boolean): void;

/**
   * _0x6DB875AFC584FA32
   * Only used in R* SP Script winter1: p1 = 5000
   * _SET_PED_M*
   *
   * @param {number} ped
   * @param {number} p1
   * @return {any}
   */
declare function N_0x6DB875AFC584FA32(ped: Ped, p1: number): any;

/**
   * _0x6E8B87139854022D
   * Only used in SP R* Script train_robbery3: p1 = CLIPSET@VEH_TRAIN@HANDCART@BASE_PANIC & CLIPSET@VEH_TRAIN@HANDCART@BASE_PANIC_JOHN
   *
   * @param {number} ped
   * @param {string | number} clipset
   * @return {void}
   */
declare function N_0x6E8B87139854022D(ped: Ped, clipset: string | number): void;

/**
   * _GET_CARRIED_PELT_SKINS
   *
   * @param {number} mount
   * @param {DataView} outData
   * @return {number}
   */
declare function GetCarriedPeltSkins(mount: Ped, outData: DataView): number;

/**
   * _0x6F46F8ACB44C4FC1
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x6F46F8ACB44C4FC1(p0: any): any;

/**
   * _0x7020839C7302D8AC
   * _HAS_*
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0x7020839C7302D8AC(ped: Ped): boolean;

/**
   * _0x704C908E9C405136
   * _CLEAR*
   *
   * @param {number} ped
   * @return {void}
   */
declare function N_0x704C908E9C405136(ped: Ped): void;

/**
   * _0x712B2C2B2471B493
   * _SET_PED_MO*
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function N_0x712B2C2B2471B493(ped: Ped, p1: Hash): void;

/**
   * _0x735662994E60A710
   * _SET_PED_F*
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x735662994E60A710(ped: Ped, p1: boolean): void;

/**
   * _0x7406C71F4AC2FFCC
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x7406C71F4AC2FFCC(p0: any): void;

/**
   * _0x758F081DB204DDDE
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0x758F081DB204DDDE(ped: Ped): boolean;

/**
   * _0x75A082563B4452E5
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function N_0x75A082563B4452E5(p0: any, p1: any, p2: any, p3: any): void;

/**
   * _0x75D3333409CD33CE
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0x75D3333409CD33CE(p0: any, p1: any, p2: any): void;

/**
   * _0x763FA8A9D76EE3A7
   * Used in Script Function NB_EVENT_OVERRIDE__HANDLE__EVENT_DAMAGE_ENTITY
   *
   * @param {number} ped
   * @return {number}
   */
declare function N_0x763FA8A9D76EE3A7(ped: Ped): number;

/**
   * _0x77243ED4F7CAAA55
   * _IS_I* - _IS_L*
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0x77243ED4F7CAAA55(ped: Ped): boolean;

/**
   * _0x7ABBD9E449E0DB00
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x7ABBD9E449E0DB00(ped: Ped, p1: boolean): void;

/**
   * _0x7B5C293238EE4F20
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x7B5C293238EE4F20(p0: any): any;

/**
   * _0x7BB810E8B343AC7B
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x7BB810E8B343AC7B(p0: any): any;

/**
   * _0x7C08E7CB8D951B70
   * Only used in SP
   * _SET_REMOVE_PED*
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function N_0x7C08E7CB8D951B70(ped: Ped, p1: number): void;

/**
   * _0x7C10221CE718AA72
   * _CLEAR_PED_M*
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function N_0x7C10221CE718AA72(ped: Ped, p1: number): void;

/**
   * _0x7C8AA850617651D9
   * Returns wether `0x1E017404784AA6A3` was applied on the ped.
   *  some hashs MAR2_RIDE1, MAR2_RIDE1, RBCH1_RIDE1, SAD5_RIDE1
   *
   * @param {number} ped
   * @param {number} p1
   * @return {any}
   */
declare function N_0x7C8AA850617651D9(ped: Ped, p1: Hash): any;

/**
   * _0x7E5185B979706210
   * _SET_FORMATION_P*
   *
   * @param {number} groupId
   * @param {number} p1
   * @return {void}
   */
declare function N_0x7E5185B979706210(groupId: number, p1: number): void;

/**
   * _0x7E8F9949B7AABBF0
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0x7E8F9949B7AABBF0(p0: any, p1: any, p2: any): void;

/**
   * _0x7EDB3C766B0D073F
   * Only used in R* Script net_moonshine_property
   * _A* - _B*
   *
   * @param {number} ped
   * @return {void}
   */
declare function N_0x7EDB3C766B0D073F(ped: Ped): void;

/**
   * _0x7EE3A8660F38797E
   * _IS_PED_H* - _IS_PED_I*
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0x7EE3A8660F38797E(ped: Ped): boolean;

/**
   * _0x7F090958AE95B61B
   *
   * @param {number} ped
   * @param {number} p1
   * @return {boolean}
   */
declare function N_0x7F090958AE95B61B(ped: Ped, p1: number): boolean;

/**
   * _0x8101BA1C0B462412
   * _ATTACH_*
   *
   * @param {number} ped
   * @param {number} ropeId
   * @return {void}
   */
declare function N_0x8101BA1C0B462412(ped: Ped, ropeId: number): void;

/**
   * _0x815C0074A1BC0D93
   * _SET_PED_COMBAT_R - _SET_PED_C*
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function N_0x815C0074A1BC0D93(ped: Ped, p1: number): void;

/**
   * _0x82CB0F3F0C7785E5
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x82CB0F3F0C7785E5(p0: any): any;

/**
   * _0x851966E1E35AF491
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x851966E1E35AF491(p0: any, p1: any): void;

/**
   * _0x85F500F4E24CA43E
   * Used in Script Function SKCS_PLAYER_ROBBING
   * _SET_PED_A*
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function N_0x85F500F4E24CA43E(ped: Ped, p1: number): void;

/**
   * _0x86F0B6730C32AC14
   * _SET_PED_*
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x86F0B6730C32AC14(ped: Ped, p1: boolean): void;

/**
   * _0x86FAFC18E3D4380C
   *
   * @param {number} groupId
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x86FAFC18E3D4380C(groupId: number, p1: boolean): void;

/**
   * _0x878E8104FA27CDAE
   *
   * @param {number} vehicle
   * @param {number} p1
   * @return {void}
   */
declare function N_0x878E8104FA27CDAE(vehicle: Vehicle, p1: Hash): void;

/**
   * _0x87C2724A56F66020
   * _CLEAR_PED_E* - _CLEAR_PED_L*
   *
   * @param {number} ped
   * @return {void}
   */
declare function N_0x87C2724A56F66020(ped: Ped): void;

/**
   * _0x8822F124788B8D0A
   * Only used in R* Script train_robbery4
   * _SET_PED_D*
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x8822F124788B8D0A(ped: Ped, p1: boolean): void;

/**
   * _0x8822F139408B8D0A
   * If returned true, SET_ENABLE_BOUND_ANKLES is called in R* Script guama2
   * _GET_D* - _GET_E*
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0x8822F139408B8D0A(ped: Ped): boolean;

/**
   * _0x88A5564B19C15391
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0x88A5564B19C15391(ped: Ped): boolean;

/**
   * _0x88A95BB640FC186F
   * Used in R* Script generic_weight_control_item
   * _CLEAR_PED_E* - CLEAR_PED_(G?)L*
   *
   * @param {number} ped
   * @return {void}
   */
declare function N_0x88A95BB640FC186F(ped: Ped): void;

/**
   * _0x88B2026A3B0BE33D
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function N_0x88B2026A3B0BE33D(ped: Ped, p1: number): void;

/**
   * _0x897934E868EDDD6C
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {number} p4
   * @return {void}
   */
declare function N_0x897934E868EDDD6C(ped: Ped, p1: number, p2: number, p3: number, p4: number): void;

/**
   * _0x89816B58C3466262
   * _GET_PED_B* - _GET_PED_C*
   *
   * @param {number} ped
   * @return {any}
   */
declare function N_0x89816B58C3466262(ped: Ped): any;

/**
   * _0x899DFA0009AC93DE
   * _SET_PED_O*
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function N_0x899DFA0009AC93DE(ped: Ped, p1: number): void;

/**
   * _0x89E59DBD15E21177
   * _SET_C*
   *
   * @param {number} groupId
   * @param {number} p1
   * @return {void}
   */
declare function N_0x89E59DBD15E21177(groupId: number, p1: number): void;

/**
   * _0x8AF46E5159A5B620
   * _SET_PED_IN*
   *
   * @param {number} ped
   * @param {number} speechParams
   * @return {void}
   */
declare function N_0x8AF46E5159A5B620(ped: Ped, speechParams: Hash): void;

/**
   * _0x8AF8E647D6B2A649
   * Returns offset (0 < 32) to be used with MISC::SET_BIT
   * _GET_PED_CR*
   *
   * @param {number} groupId
   * @param {number} ped
   * @return {number}
   */
declare function N_0x8AF8E647D6B2A649(groupId: number, ped: Ped): number;

/**
   * _0x8AFCCC0F18D70018
   * _SET_FORMATION_*
   *
   * @param {number} groupId
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x8AFCCC0F18D70018(groupId: number, p1: boolean): void;

/**
   * _0x8BA0C65AC15A7D33
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function N_0x8BA0C65AC15A7D33(p0: any, p1: any, p2: any, p3: any): void;

/**
   * _0x8BE24D74D74C6E9B
   * Used in Script Function NET_CAMP_DOG_CLIENT_HANDLE_ANIMAL_INTERACTION
   *
   * @param {number} ped
   * @return {number}
   */
declare function N_0x8BE24D74D74C6E9B(ped: Ped): Ped;

/**
   * _0x8CB2553C559102C1
   * _SET_PED_T* - SET_PED_U*
   *
   * @param {number} ped
   * @param {number} p1
   * @param {boolean} p2
   * @return {void}
   */
declare function N_0x8CB2553C559102C1(ped: Ped, p1: number, p2: boolean): void;

/**
   * _0x8D9DB115FBA8E23D
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x8D9DB115FBA8E23D(p0: any): void;

/**
   * _0x900CA00CE703E1E2
   * Used in Script Function AGGRO_SHOULD_PED_HEAR_DEATH
   * _GET_PED_*
   *
   * @param {number} ped
   * @return {number}
   */
declare function N_0x900CA00CE703E1E2(ped: Ped): number;

/**
   * _0x9078FB0557364099
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x9078FB0557364099(p0: any): void;

/**
   * _0x913D04A5176F84C9
   * _IS_PED_S* - _IS_PED_U*
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0x913D04A5176F84C9(ped: Ped): boolean;

/**
   * _0x9184788BFF1EDAD7
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x9184788BFF1EDAD7(p0: any, p1: any): void;

/**
   * _0x91BAB9E064F036CD
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x91BAB9E064F036CD(p0: any, p1: any): void;

/**
   * _0x92A1B55A59720395
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x92A1B55A59720395(p0: any, p1: any): void;

/**
   * _0x94132D7C8D3575C4
   * _GET_IS_PED_*
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0x94132D7C8D3575C4(ped: Ped): boolean;

/**
   * _HAS_PED_INTERACTED_WITH_PLAYER_RECENTLY
   * Returns whether a ped has interacted with a player recently.
   * flags: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/0x947E43F544B6AB34
   *
   * @param {number} ped
   * @param {number} player
   * @param {number} flag
   * @param {number} ms
   * @return {boolean}
   */
declare function HasPedInteractedWithPlayerRecently(ped: Ped, player: Player, flag: number, ms: number): boolean;

/**
   * _0x9629FAF6460D35CB
   *
   * @param {number} group
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x9629FAF6460D35CB(group: Hash, p1: boolean): void;

/**
   * _0x96595B36D6A2279B
   * Only used in R* Script mob4 combined with SET_ANIMAL_TUNING_BOOL_PARAM
   * _SET_PED_S* - _SET_PED_TARGET_*
   *
   * @param {number} animal
   * @param {boolean} toggle
   * @return {void}
   */
declare function N_0x96595B36D6A2279B(animal: Ped, toggle: boolean): void;

/**
   * _0x966DE09688A1DE39
   * _SET_FORMATION_P*
   *
   * @param {number} groupId
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {number} p4
   * @return {void}
   */
declare function N_0x966DE09688A1DE39(groupId: number, p1: number, p2: number, p3: number, p4: number): void;

/**
   * _0x96C7B659854DE629
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x96C7B659854DE629(p0: any, p1: any): void;

/**
   * _0x97A38B65EBDA3D50
   * _SET_PED_D*
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x97A38B65EBDA3D50(ped: Ped, p1: boolean): void;

/**
   * _0x97B06669AC569003
   * _CLEAR*
   *
   * @param {number} ped1
   * @param {number} ped2
   * @return {void}
   */
declare function N_0x97B06669AC569003(ped1: Ped, ped2: Ped): void;

/**
   * _0x97C475212B327666
   * _SET_SCENARIO_PED_* - _SET_SPAWNER_*
   *
   * @param {number} groupId
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x97C475212B327666(groupId: number, p1: boolean): void;

/**
   * _0x9851DE7AEC10B4E1
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} p3
   * @param {number} p4
   * @param {any} p5
   * @return {void}
   */
declare function N_0x9851DE7AEC10B4E1(x: number, y: number, z: number, p3: number, p4: number, p5: any): void;

/**
   * _0x992187D975635DF5
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x992187D975635DF5(p0: any, p1: any): void;

/**
   * _0x99DF2639DA76C1DC
   * _CAN_PED_*
   *
   * @param {number} ped1
   * @param {number} ped2
   * @param {number} p2
   * @return {boolean}
   */
declare function N_0x99DF2639DA76C1DC(ped1: Ped, ped2: Ped, p2: number): boolean;

/**
   * _0x9A4AC116CC1EEE14
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x9A4AC116CC1EEE14(p0: any): void;

/**
   * _0x9AB33CB5834885B3
   * _SET_PED_M*
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {number} p4
   * @return {void}
   */
declare function N_0x9AB33CB5834885B3(ped: Ped, p1: number, p2: number, p3: number, p4: number): void;

/**
   * _0x9B65444C07B782BF
   * Only used in SP R* Script winter1: p1 = Winter1Mount
   *
   * @param {number} ped
   * @param {string | number} p1
   * @return {void}
   */
declare function N_0x9B65444C07B782BF(ped: Ped, p1: string | number): void;

/**
   * _GET_CATEGORY_OF_COMPONENT_AT_INDEX
   *
   * @param {number} ped
   * @param {number} componentIndex
   * @param {any} p2
   * @return {number}
   */
declare function GetCategoryOfComponentAtIndex(ped: Ped, componentIndex: number, p2: any): number;

/**
   * _0x9B9B9FA0EA283E3D
   * Used in Script Function SKCS_PLAYER_ROBBING
   * _SET_PED_SHOULD_PLAY_* - _SET_PED_SW*
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function N_0x9B9B9FA0EA283E3D(ped: Ped, p1: number): void;

/**
   * _0x9BBEAF8B0C007F1E
   * _SET_PLAYER_CAN_B* - _SET_PLAYER_CAN_U*
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x9BBEAF8B0C007F1E(ped: Ped, p1: boolean): void;

/**
   * _HAS_PED_BEEN_SHOT_BY_PLAYER_RECENTLY
   * this native checks if player has shot a specific ped for the duration passed p2 is in milliseconds 
   *
   * @param {number} player
   * @param {number} ped
   * @param {number} duration
   * @return {boolean}
   */
declare function HasPedBeenShotByPlayerRecently(player: Player, ped: Ped, duration: number): boolean;

/**
   * _0x9D8DFE2DE9CB4DFC
   * _RESET_PED_*
   *
   * @param {number} ped
   * @return {void}
   */
declare function N_0x9D8DFE2DE9CB4DFC(ped: Ped): void;

/**
   * _0x9E3842E5DAD69F80
   * Only used in SP R* Script loanshark_hunter
   *
   * @param {number} volume
   * @return {void}
   */
declare function N_0x9E3842E5DAD69F80(volume: Volume): void;

/**
   * _0x9E66708B2B41F14A
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x9E66708B2B41F14A(p0: any, p1: any): void;

/**
   * _0x9F0F28B42C4EE80A
   *
   * @param {number} animal
   * @param {number} p2
   * @return {void}
   */
declare function N_0x9F0F28B42C4EE80A(animal: Ped, p2: number): void;

/**
   * _0x9F933E0985E12C51
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @return {void}
   */
declare function N_0x9F933E0985E12C51(ped: Ped, p1: number, p2: number, p3: number): void;

/**
   * _0xA064BBABB064446F
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xA064BBABB064446F(p0: any): void;

/**
   * _0xA180FBD502A03125
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {any}
   */
declare function N_0xA180FBD502A03125(p0: any, p1: any, p2: any): any;

/**
   * _0xA1FBAC56D38563E2
   *
   * @param {number} volume
   * @return {boolean}
   */
declare function N_0xA1FBAC56D38563E2(volume: Volume): boolean;

/**
   * _0xA2116C1E4ED85C24
   * _SET_PED_*
   *
   * @param {number} ped
   * @param {boolean} inverted
   * @return {void}
   */
declare function N_0xA2116C1E4ED85C24(ped: Ped, inverted: boolean): void;

/**
   * _0xA218D2BBCAA7388C
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0xA218D2BBCAA7388C(p0: any, p1: any): any;

/**
   * _0xA274F51EF7E34B95
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0xA274F51EF7E34B95(p0: any, p1: any): any;

/**
   * _0xA2B8E47442C76CEC
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xA2B8E47442C76CEC(p0: any, p1: any): void;

/**
   * _0xA2F8B3B5FEDFC100
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xA2F8B3B5FEDFC100(p0: any, p1: any): void;

/**
   * _0xA31D350D66FA1855
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xA31D350D66FA1855(p0: any): any;

/**
   * _0xA405BF9F01960C16
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xA405BF9F01960C16(p0: any): void;

/**
   * _0xA4AC05B1A364EBC5
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {any}
   */
declare function N_0xA4AC05B1A364EBC5(p0: any, p1: any, p2: any): any;

/**
   * _0xA4B6432E3880F2F9
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0xA4B6432E3880F2F9(ped: Ped): boolean;

/**
   * _0xA691C10054275290
   *
   * @param {number} mount
   * @param {number} player
   * @param {number} dismountedTimestamp
   * @return {void}
   */
declare function N_0xA691C10054275290(mount: Ped, player: Player, dismountedTimestamp: number): void;

/**
   * _0xA6D6F03095C88F59
   * _DELETE_*
   *
   * @param {number} ped
   * @return {void}
   */
declare function N_0xA6D6F03095C88F59(ped: Ped): void;

/**
   * _0xA7A806677F8DE138
   * Washing player's face/hands now
   * _CLEAR_PED_E* - _CLEAR_PED_L*
   *
   * @param {number} ped
   * @return {void}
   */
declare function N_0xA7A806677F8DE138(ped: Ped): void;

/**
   * _0xA7DC9266ED6A4E51
   * _CLEAR_PED_B* - _CLEAR_PED_C*
   *
   * @param {number} ped
   * @return {void}
   */
declare function N_0xA7DC9266ED6A4E51(ped: Ped): void;

/**
   * _0xA8A95CECB1906EA2
   * _SET_ENABLE_B* - _SET_ENABLE_H*
   *
   * @param {number} groupId
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0xA8A95CECB1906EA2(groupId: number, p1: boolean): void;

/**
   * _0xA90684ED185CCB4B
   * Only used in R* Script mob4 and rcm_mason4
   * _SET_PED_DEFENSIVE_* - _SET_PED_DESIRED_*
   *
   * @param {number} animal
   * @param {boolean} p1
   * @param {number} p2
   * @param {number} p3
   * @return {void}
   */
declare function N_0xA90684ED185CCB4B(animal: Ped, p1: boolean, p2: number, p3: number): void;

/**
   * _0xA967D6A8ED2D713B
   * _SET_PED_P* - _SET_PED_R*
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0xA967D6A8ED2D713B(ped: Ped, p1: boolean): void;

/**
   * _0xAA6C49AE90A32299
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function N_0xAA6C49AE90A32299(ped: Ped, p1: Hash): void;

/**
   * _SET_ACTIVE_META_PED_COMPONENTS_UPDATED
   * Related to _0x704C908E9C405136 for component loading
   * Can be used to fix missing outfit changes, always paired with _UPDATE_PED_VARIATION
   * _S*
   * Doesn't actually return anything.
   *
   * @param {number} ped
   * @param {boolean} isMp
   * @return {any}
   */
declare function SetActiveMetaPedComponentsUpdated(ped: Ped, isMP: boolean): any;

/**
   * _0xAAC0EE3B4999ABB5
   *
   * @param {number} ped
   * @param {number} targetPed
   * @return {void}
   */
declare function N_0xAAC0EE3B4999ABB5(ped: Ped, targetPed: Ped): void;

/**
   * _0xAD3330E3C3E98007
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xAD3330E3C3E98007(p0: any, p1: any): void;

/**
   * _0xAE6B68A83ABBE7C0
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xAE6B68A83ABBE7C0(p0: any): void;

/**
   * _0xAF041C10756C30FB
   * _CLEAR_PED_D*
   *
   * @param {number} ped
   * @param {boolean} p1
   * @param {boolean} p2
   * @param {boolean} p3
   * @return {void}
   */
declare function N_0xAF041C10756C30FB(ped: Ped, p1: boolean, p2: boolean, p3: boolean): void;

/**
   * _0xB05CC690CDE8A4A9
   * Used to set up bad guy groups in nb_kidnapped R* Script (MP_RE_KIDNAPPED): p1 = 4.f
   * _SET_FORMATION_*
   *
   * @param {number} groupId
   * @param {number} p1
   * @return {boolean}
   */
declare function N_0xB05CC690CDE8A4A9(groupId: number, p1: number): boolean;

/**
   * _0xB06F5F1DEF417216
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function N_0xB06F5F1DEF417216(p0: any, p1: any, p2: any, p3: any): void;

/**
   * _GET_META_PED_RACE
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetMetaPedRace(ped: Ped): number;

/**
   * _0xB29C553BA582D09E
   * Used in Script Function SATCHEL_COUNT_BREAKDOWN_COMPONENTS
   *
   * @param {DataView} p0
   * @param {number} model
   * @param {number} damageCleanliness
   * @param {number} p3
   * @return {any}
   */
declare function N_0xB29C553BA582D09E(p0: DataView, model: Hash, damageCleanliness: number, p3: number): any;

/**
   * _0xB4B7C92FCE7347B7
   * _RESET_PED_C*
   *
   * @param {number} ped
   * @return {void}
   */
declare function N_0xB4B7C92FCE7347B7(ped: Ped): void;

/**
   * _0xB65927F861E7AE39
   *
   * @param {number} ped
   * @param {number} p1
   * @return {boolean}
   */
declare function N_0xB65927F861E7AE39(ped: Ped, p1: number): boolean;

/**
   * _0xB7DBB2986B87E230
   *
   * @param {number} ped
   * @param {number} p1
   * @return {boolean}
   */
declare function N_0xB7DBB2986B87E230(ped: Ped, p1: number): boolean;

/**
   * _0xB8AB265426CFE6DD
   * _SET_HO*
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0xB8AB265426CFE6DD(ped: Ped, p1: boolean): void;

/**
   * _0xB8E2D655E1D5BD39
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xB8E2D655E1D5BD39(p0: any): any;

/**
   * _0xB91AB3BE7F655D49
   * _IS_PED_J* - _IS_PED_L*
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0xB91AB3BE7F655D49(ped: Ped): boolean;

/**
   * _0xB9BDFAE609DFB7C5
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0xB9BDFAE609DFB7C5(p0: any, p1: any, p2: any): void;

/**
   * _SET_PED_DESIRES_GROUP
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedDesiresGroup(ped: Ped, toggle: boolean): void;

/**
   * _0xBB3E5370EBB6BE28
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0xBB3E5370EBB6BE28(p0: any, p1: any): any;

/**
   * _0xBC1DC48270468444
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xBC1DC48270468444(p0: any): void;

/**
   * _0xBD0E4F52F6D95242
   * _IS_PED_M* - _IS_PED_O*
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0xBD0E4F52F6D95242(ped: Ped): boolean;

/**
   * _0xBF567DF2BEF211A6
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xBF567DF2BEF211A6(p0: any, p1: any): void;

/**
   * _0xBFA6B7731C3BAF02
   * Only used in R* Script tg_p (CLIENT__AMBIENT_POPULATION - Player starts the populate in region)
   *
  
   * @return {void}
   */
declare function N_0xBFA6B7731C3BAF02(): void;

/**
   * _0xC17A94CC8FC3C61A
   * _SET_PED_P* - _SET_PED_R*
   *
   * @param {number} entity
   * @param {number} boneId
   * @param {number} p2
   * @param {number} p3
   * @param {number} p4
   * @return {void}
   */
declare function N_0xC17A94CC8FC3C61A(entity: Entity, boneId: number, p2: number, p3: number, p4: number): void;

/**
   * _0xC2722B252C79E641
   * _FORCE_PED_*
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {boolean} p3
   * @return {void}
   */
declare function N_0xC2722B252C79E641(ped: Ped, p1: any, p2: any, p3: boolean): void;

/**
   * _0xC2EF407645BEECDC
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xC2EF407645BEECDC(p0: any): any;

/**
   * _0xC3995D396F1D97B6
   * _GET_PED_G* - _GET_PED_I*
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} p2
   * @return {boolean}
   */
declare function N_0xC3995D396F1D97B6(ped: Ped, p1: number, p2: number): boolean;

/**
   * _SET_PELT_FOR_HORSE_BY_INVENTORY_ITEM
   * Set the pelt of the animal to the back of the horse
   * EXAMPLE:
   * local mount = GetMountOwnedByPlayer(PlayerId())
   * Citizen.InvokeNative(0xC412AA1C73111FE0,mount,GetHashKey('PROVISION_DEER_HIDE_POOR'),GetHashKey('a_c_deer_01_uppr_000_c0_001_ab'),0,0)
   *
   * @param {number} horse
   * @param {number} itemHash
   * @param {number} albedo
   * @param {number} normal
   * @param {boolean} p4
   * @return {void}
   */
declare function SetPeltForHorseByInventoryItem(horse: Ped, itemHash: Hash, albedo: Hash, normal: Hash, p4: boolean): void;

/**
   * _0xC48AF420371C7407
   * _SET_PED_M*
   *
   * @param {number} ped
   * @param {number} grapple
   * @return {any}
   */
declare function N_0xC48AF420371C7407(ped: Ped, grapple: Hash): any;

/**
   * _PED_SET_SIMPLE_PLAYER_MEMORY
   * memoryType: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/_PED_SET_SIMPLE_PLAYER_MEMORY
   *
   * @param {number} ped
   * @param {number} memoryType
   * @return {void}
   */
declare function PedSetSimplePlayerMemory(ped: Ped, memoryType: number): void;

/**
   * _GET_PED_RAGDOLL_BONE_INDEX
   * Returns boneIndex
   *
   * @param {number} ped
   * @param {number} boneId
   * @return {number}
   */
declare function GetPedRagdollBoneIndex(ped: Ped, boneId: number): number;

/**
   * _0xC5B78E41DCF8227C
   * _SET_H* - _SET_I*
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0xC5B78E41DCF8227C(ped: Ped, p1: boolean): void;

/**
   * _0xC6136B40FFFB778B
   *
   * @param {boolean} p0
   * @return {void}
   */
declare function N_0xC6136B40FFFB778B(p0: boolean): void;

/**
   * _0xC6981AFF6D2A71C2
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xC6981AFF6D2A71C2(p0: any): void;

/**
   * _0xC6C4E15CF7D52FEA
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xC6C4E15CF7D52FEA(p0: any, p1: any): void;

/**
   * _0xC9151483CC06A414
   *
   * @param {number} ped
   * @return {void}
   */
declare function N_0xC9151483CC06A414(ped: Ped): void;

/**
   * _0xC991EF46FE323867
   * Not implemented.
   *
   * @param {number} ped
   * @param {any} p1
   * @return {void}
   */
declare function N_0xC991EF46FE323867(ped: Ped, p1: any): void;

/**
   * _0xC99F104BDF8C7F5A
   * _SET_PLAYER_N* - _SET_PLAYER_S*
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0xC99F104BDF8C7F5A(ped: Ped, p1: boolean): void;

/**
   * _0xCA95924C893A0C91
   * Returns vehicle speed
   * _COMPUTE_*
   *
   * @param {number} ped
   * @param {number} p1
   * @return {number}
   */
declare function N_0xCA95924C893A0C91(ped: Ped, p1: number): number;

/**
   * _0xCA95C156C14B2054
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xCA95C156C14B2054(p0: any, p1: any): void;

/**
   * _0xCAC43D060099EA72
   *
   * @param {number} ped
   * @return {void}
   */
declare function N_0xCAC43D060099EA72(ped: Ped): void;

/**
   * _0xCB1A3864C524F784
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xCB1A3864C524F784(p0: any, p1: any): void;

/**
   * _0xCB86D3E3E3708901
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {any}
   */
declare function N_0xCB86D3E3E3708901(p0: any, p1: any, p2: any, p3: any, p4: any): any;

/**
   * _0xCB8F4C9343EBE240
   * Only used in R* SP Scripts
   * _GET_PLAYER_W* - _GET_RANDOM_*
   *
   * @param {number} ped
   * @param {number} eventType
   * @return {[boolean, Vector3]}
   */
declare function N_0xCB8F4C9343EBE240(ped: Ped, eventType: Hash): [boolean, Vector3];

/**
   * _0xCBDE59C48F2B06F5
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0xCBDE59C48F2B06F5(p0: any, p1: any, p2: any): void;

/**
   * _0xCD9E5F94A2F38683
   * _SET_PED_R* - _SET_PED_S*
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0xCD9E5F94A2F38683(ped: Ped, p1: boolean): void;

/**
   * _0xCDFB8C04D4C95D9B
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function N_0xCDFB8C04D4C95D9B(p0: any, p1: any, p2: any, p3: any): void;

/**
   * _0xCE7A6C1D5CDE1F9D
   *
   * @param {number} ped
   * @param {number} object
   * @param {string | number} propName
   * @param {string | number} animName
   * @return {void}
   */
declare function N_0xCE7A6C1D5CDE1F9D(ped: Ped, object: number, propName: string | number, animName: string | number): void;

/**
   * _0xCF0B19806473D324
   * _SET_PED_COMBAT_*
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {void}
   */
declare function N_0xCF0B19806473D324(ped: Ped, x: number, y: number, z: number): void;

/**
   * _0xD049920CD29F6CC8
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {void}
   */
declare function N_0xD049920CD29F6CC8(p0: any, p1: any, p2: any, p3: any, p4: any): void;

/**
   * _0xD049FDAF089FDDB0
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} p2
   * @return {void}
   */
declare function N_0xD049FDAF089FDDB0(ped: Ped, p1: Hash, p2: number): void;

/**
   * _0xD103F6DBB5442BE8
   * Params: p1 either a 1 or 0, so perhaps BOOL
   * _SET_PED_A*
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function N_0xD103F6DBB5442BE8(ped: Ped, p1: number): void;

/**
   * _0xD2F0FE8805D91647
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xD2F0FE8805D91647(p0: any, p1: any): void;

/**
   * _0xD355E2F1BB41087E
   *
   * @param {number} ped
   * @param {number} p1
   * @return {boolean}
   */
declare function N_0xD355E2F1BB41087E(ped: Ped, p1: number): boolean;

/**
   * _0xD4D403EA031F351C
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0xD4D403EA031F351C(ped: Ped): boolean;

/**
   * _0xD55DB4466D00A258
   * Used in Script Function LA_CHECK_ALERTED
   * _GET_IS_PED_*
   *
   * @param {number} legendaryAnimal
   * @return {boolean}
   */
declare function N_0xD55DB4466D00A258(legendaryAnimal: Ped): boolean;

/**
   * _0xD5BD1B5318A81994
   * _SET_FORMATION_*
   *
   * @param {number} groupId
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0xD5BD1B5318A81994(groupId: number, p1: boolean): void;

/**
   * _0xD61FCF9FCFD515B7
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0xD61FCF9FCFD515B7(p0: any, p1: any, p2: any): void;

/**
   * _0xD7D2F45C56A4F4DF
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0xD7D2F45C56A4F4DF(p0: any, p1: any, p2: any): void;

/**
   * _0xD8544F6260F5F01E
   * METAPED_PLAYER_COMPONENTS_SET_META_TYPE_TO_BE_BYPASSED: Setting visibility
   * p1 is mostly 10
   * _CLEAR_PED_N* - _CLEAR_PED_W*
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function N_0xD8544F6260F5F01E(ped: Ped, p1: number): void;

/**
   * _0xD8CEEED54C672B5D
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @return {void}
   */
declare function N_0xD8CEEED54C672B5D(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;

/**
   * _0xD97BC27AC039F681
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {any}
   */
declare function N_0xD97BC27AC039F681(p0: any, p1: any, p2: any, p3: any): any;

/**
   * _IS_PED_AFLOAT
   * detects if ped is afloat in water like swimming or in a boat (driving or standing on it)
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedAfloat(ped: Ped): boolean;

/**
   * _0xDC91F22F09BC6C2F
   * Used in Script Function MP_MAIN_OFFLINE__INITIALIZE_GAME
   * _SET_RELATIONSHIP_*
   *
   * @param {number} group
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0xDC91F22F09BC6C2F(group: Hash, p1: boolean): void;

/**
   * _0xDD9540E7B1C9714F
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @return {void}
   */
declare function N_0xDD9540E7B1C9714F(ped: Ped, p1: Hash, r: number, g: number, b: number): void;

/**
   * _0xDDFAD4DEAA7FA362
   * _SET_FORMATION_P*
   *
   * @param {number} groupId
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {number} p4
   * @return {void}
   */
declare function N_0xDDFAD4DEAA7FA362(groupId: number, p1: number, p2: number, p3: number, p4: number): void;

/**
   * _0xDEDBED3020DA49DC
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xDEDBED3020DA49DC(p0: any): void;

/**
   * _0xDEE8D30AA5C2E28D
   *
   * @param {number} ped
   * @param {number} p1
   * @param {boolean} p2
   * @return {void}
   */
declare function N_0xDEE8D30AA5C2E28D(ped: Ped, p1: Hash, p2: boolean): void;

/**
   * _0xE0FE107AB174D64A
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xE0FE107AB174D64A(p0: any, p1: any): void;

/**
   * _0xE1103300F3456DE7
   * _SET_FORMATION_P*
   *
   * @param {number} groupId
   * @param {number} p1
   * @param {number} p2
   * @return {void}
   */
declare function N_0xE1103300F3456DE7(groupId: number, p1: number, p2: number): void;

/**
   * _0xE1AADD0055D76603
   * _C*
   *
   * @param {number} ped
   * @param {number} entity
   * @param {number} boneIndex1
   * @param {number} boneIndex2
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} p7
   * @param {boolean} p8
   * @param {boolean} p9
   * @param {number} p10
   * @return {void}
   */
declare function N_0xE1AADD0055D76603(ped: Ped, entity: Entity, boneIndex1: number, boneIndex2: number, x: number, y: number, z: number, p7: number, p8: boolean, p9: boolean, p10: number): void;

/**
   * _0xE1B3BE07D3AADDED
   *
   * @param {number} ped
   * @param {number} p1
   * @param {boolean} p2
   * @return {void}
   */
declare function N_0xE1B3BE07D3AADDED(ped: Ped, p1: number, p2: boolean): void;

/**
   * _0xE20027B414BFE6C7
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xE20027B414BFE6C7(p0: any, p1: any): void;

/**
   * _0xE29D8CD66553DBAA
   * _SET_PED_R* -_SET_PED_S*
   *
   * @param {number} horse
   * @return {void}
   */
declare function N_0xE29D8CD66553DBAA(horse: Ped): void;

/**
   * _0xE37ACEE15AC50C7E
   * _SET_PED_IN*
   *
   * @param {number} ped
   * @param {string | number} p1
   * @return {void}
   */
declare function N_0xE37ACEE15AC50C7E(ped: Ped, p1: string | number): void;

/**
   * _0xE4C95E0AE31C6512
   *
   * @param {number} ped
   * @param {any} p1
   * @return {void}
   */
declare function N_0xE4C95E0AE31C6512(ped: Ped, p1: any): void;

/**
   * _0xE4EF4382E22C780C
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xE4EF4382E22C780C(p0: any): void;

/**
   * _0xE50C9816B3F22D8B
   * _SET_D*
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} p2
   * @return {void}
   */
declare function N_0xE50C9816B3F22D8B(ped: Ped, p1: Hash, p2: number): void;

/**
   * _0xE6CB36F43A95D75F
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xE6CB36F43A95D75F(p0: any): void;

/**
   * _0xE735A7DA22E88359
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xE735A7DA22E88359(p0: any): void;

/**
   * _0xE737D5F14304A2EC
   * Only used in R* Script nb_animal_attack: p2 = 120000
   * _SET_PED_SH* - _SET_PED_SP*
   *
   * @param {number} ped
   * @param {number} player
   * @param {number} p2
   * @return {void}
   */
declare function N_0xE737D5F14304A2EC(ped: Ped, player: Player, p2: number): void;

/**
   * _0xE76687023D8C8505
   * Used for AUDIO / ANIMSCENE (REFERENCE_REGIONAL_CHARACTER)
   * Params: p1 = 0
   * _GET_PED_IN*
   *
   * @param {number} perscharModel
   * @param {number} p1
   * @return {number}
   */
declare function N_0xE76687023D8C8505(perscharModel: Hash, p1: number): Entity;

/**
   * _0xE8ABE3B73FC7FE17
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function N_0xE8ABE3B73FC7FE17(p0: any, p1: any, p2: any, p3: any): void;

/**
   * _GET_PLAYER_DISMOUNT_TIMESTAMP
   * Returns dismounted timestamp
   *
   * @param {number} mount
   * @param {number} player
   * @return {number}
   */
declare function GetPlayerDismountTimestamp(mount: Ped, player: Player): number;

/**
   * _0xE9E06EA514A69061
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xE9E06EA514A69061(p0: any, p1: any): void;

/**
   * _0xEA8763E505AFD49A
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0xEA8763E505AFD49A(p0: any, p1: any, p2: any): void;

/**
   * _0xEB8886E1065654CD
   * Washing player's face/hands now
   * _FA* - _FI*
   *
   * @param {number} ped
   * @param {number} p1
   * @param {string | number} p2
   * @param {number} p3
   * @return {void}
   */
declare function N_0xEB8886E1065654CD(ped: Ped, p1: number, p2: string | number, p3: number): void;

/**
   * _0xEBAAC9A750E7563B
   * If returned true: PROCESS_RESIZING_TRACKING_BOUNDS_VOLUME - Scaling UP the bounds due to tracking
   * If returned false: PROCESS_RESIZING_TRACKING_BOUNDS_VOLUME - Scaling DOWN the bounds due to tracking
   * _IS_PED_T* - _IS_PED_U*
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0xEBAAC9A750E7563B(ped: Ped): boolean;

/**
   * _0xEBD49472BCCF7642
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xEBD49472BCCF7642(p0: any, p1: any): void;

/**
   * _0xEC60D1D225BC50AA
   * _SET_C*
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function N_0xEC60D1D225BC50AA(ped: Ped, p1: number): void;

/**
   * _0xED1C764997A86D5A
   * Only used in R* Script nb_stalking_hunter
   *
   * @param {number} ped1
   * @param {number} ped2
   * @return {void}
   */
declare function N_0xED1C764997A86D5A(ped1: Ped, ped2: Ped): void;

/**
   * _0xEEDC9B29314B2733
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
   * @return {void}
   */
declare function N_0xEEDC9B29314B2733(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;

/**
   * _0xEF371232BC6053E1
   * _ADD_*
   *
   * @param {number} ped
   * @return {void}
   */
declare function N_0xEF371232BC6053E1(ped: Ped): void;

/**
   * _0xF47D54B986F0A346
   * Used in Script Function MOONSHINE_BAND_CLIENT_PATRON_UPDATE
   *
   * @param {number} ped
   * @param {number} danceIntensity
   * @return {void}
   */
declare function N_0xF47D54B986F0A346(ped: Ped, danceIntensity: number): void;

/**
   * _0xF4860514AD354226
   * Only used in SP Scripts
   * Returns count / index
   * _C*
   *
   * @param {number} shockingEvent
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} p4
   * @return {[number, number]}
   */
declare function N_0xF4860514AD354226(shockingEvent: ScrHandle, x: number, y: number, z: number, p4: number): [number, number];

/**
   * _0xF634E2892220EF34
   *
   * @param {number} ped
   * @param {any} p1
   * @return {void}
   */
declare function N_0xF634E2892220EF34(ped: Ped, p1: any): void;

/**
   * _0xF6A8C4B4A11AE89C
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @return {any}
   */
declare function N_0xF6A8C4B4A11AE89C(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

/**
   * _0xF7327ACC7A89AEF1
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {any}
   */
declare function N_0xF7327ACC7A89AEF1(p0: any, p1: any, p2: any): any;

/**
   * _0xF917F92BF22ECBAB
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xF917F92BF22ECBAB(p0: any): void;

/**
   * _0xF9331B3A314EB49D
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0xF9331B3A314EB49D(ped: Ped): boolean;

/**
   * _0xF9CBD46433E36713
   * Used in Script Function PLAYER_HEAD_TRACKING_MAINTAIN
   *
   * @param {number} ped
   * @param {number} targetEntity
   * @param {number} p2
   * @param {number} p3
   * @param {number} p4
   * @param {number} p5
   * @param {number} p6
   * @param {number} p7
   * @param {number} p8
   * @param {string | number} p9
   * @return {void}
   */
declare function N_0xF9CBD46433E36713(ped: Ped, targetEntity: Entity, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number, p8: number, p9: string | number): void;

/**
   * _SET_PED_WETNESS
   * only works when you use SET_PED_WETNESS_HEIGHT first , if you do 0.0 (it resets) you need to apply again with SET_PED_WETNESS_HEIGHT to see the wetness effects again
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function SetPedWetness(ped: Ped, p1: number): void;

/**
   * _0xFA0D206B489A6846
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {void}
   */
declare function N_0xFA0D206B489A6846(p0: any, p1: any, p2: any, p3: any, p4: any): void;

/**
   * _0xFA742B82D093D848
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0xFA742B82D093D848(p0: any, p1: any, p2: any): void;

/**
   * _0xFA8C10DCE0706D43
   * _HAS_PED_*
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0xFA8C10DCE0706D43(ped: Ped): boolean;

/**
   * _0xFC23348F0F4E245F
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function N_0xFC23348F0F4E245F(p0: any, p1: any, p2: any, p3: any): void;

/**
   * _GET_NUM_RESERVED_STAMINA
   * returns the number of reserved stamina similar to _GET_NUM_RESERVED_HEALTH
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetNumReservedStamina(ped: Ped): number;

/**
   * _0xFD3C31A2E45671E7
   * _DISABLE_A* - _DISABLE_C*
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function N_0xFD3C31A2E45671E7(ped: Ped, p1: number): void;

/**
   * _0xFD8E853F0BC2E942
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xFD8E853F0BC2E942(p0: any, p1: any): void;

/**
   * _0xFEA6126C34DF2532
   * METAPED_PLAYER_COMPONENTS_SET_META_TYPE_TO_BE_BYPASSED: Setting visibility
   * _SET_M* - _SET_P*
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0xFEA6126C34DF2532(ped: Ped, p1: boolean): void;

/**
   * _0xFFA1594703ED27CA
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function N_0xFFA1594703ED27CA(ped: Ped, p1: number): void;

/**
   * _0xFFDE295662405B25
   * _GET_PED_COMBAT_M* - _GET_PED_C*
   *
   * @param {number} ped
   * @return {number}
   */
declare function N_0xFFDE295662405B25(ped: Ped): number;

/**
   * _ADD_PED_STAY_OUT_VOLUME
   *
   * @param {number} ped
   * @param {number} volume
   * @return {boolean}
   */
declare function AddPedStayOutVolume(ped: Ped, volume: Volume): boolean;

/**
   * _ADD_PED_SUBSCRIBE_TO_LEGENDARY_BLIPS
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function AddPedSubscribeToLegendaryBlips(ped: Ped): boolean;

/**
   * _ADD_SCENARIO_BLOCKING_VOLUME
   * flag: see ADD_SCENARIO_BLOCKING_AREA
   *
   * @param {number} volume
   * @param {boolean} p1
   * @param {number} flag
   * @return {any}
   */
declare function AddScenarioBlockingVolume(volume: Volume, p1: boolean, flag: number): any;

/**
   * _ADD_SCENARIO_TRANSITION
   * Forces transition now, called together with 0xD65FDC686A031C83
   *
   * @param {number} ped
   * @return {void}
   */
declare function AddScenarioTransition(ped: Ped): void;

/**
   * _ADD_TEXTURE_LAYER
   * Creates ped overlay in texture override data and returns it's index.
   * This index are used for further overlay editing.
   * 
   * albedoHash: a hash of overlay's albedo texture
   * colorType: a color type(from 0 to 2). 0 is used for overlays with RGB colors usually.
   *
   * @param {number} textureId
   * @param {number} albedoHash
   * @param {number} normalHash
   * @param {number} materialHash
   * @param {number} blendType
   * @param {number} texAlpha
   * @param {number} sheetGridIndex
   * @return {number}
   */
declare function AddTextureLayer(textureId: number, albedoHash: Hash, normalHash: Hash, materialHash: Hash, blendType: number, texAlpha: number, sheetGridIndex: number): number;

/**
   * _APPLY_PED_META_PED_OUTFIT
   * https://github.com/femga/rdr3_discoveries/blob/master/clothes/metaped_outfits.lua
   *
   * @param {number} requestId
   * @param {number} ped
   * @param {boolean} p2
   * @param {boolean} p3
   * @return {boolean}
   */
declare function ApplyPedMetaPedOutfit(requestId: number, ped: Ped, p2: boolean, p3: boolean): boolean;

/**
   * _APPLY_SHOP_ITEM_TO_PED
   *
   * @param {number} ped
   * @param {number} componentHash
   * @param {boolean} immediately
   * @param {boolean} isMp
   * @param {boolean} p4
   * @return {void}
   */
declare function ApplyShopItemToPed(ped: Ped, componentHash: Hash, immediately: boolean, isMp: boolean, p4: boolean): void;

/**
   * _APPLY_TEXTURE_ON_PED
   *
   * @param {number} ped
   * @param {number} componentHash
   * @param {number} textureId
   * @return {void}
   */
declare function ApplyTextureOnPed(ped: Ped, componentHash: Hash, textureId: number): void;

/**
   * _ARE_ALL_AMBIENT_PED_RESERVATIONS_READY
   *
  
   * @return {boolean}
   */
declare function AreAllAmbientPedReservationsReady(): boolean;

/**
   * _ATTACH_VOLUME_TO_ENTITY
   *
   * @param {number} volume
   * @param {number} entity
   * @param {number} offsetX
   * @param {number} offsetY
   * @param {number} offsetZ
   * @param {number} rotX
   * @param {number} rotY
   * @param {number} rotZ
   * @param {number} p8
   * @param {boolean} p9
   * @return {void}
   */
declare function AttachVolumeToEntity(volume: Volume, entity: Entity, offsetX: number, offsetY: number, offsetZ: number, rotX: number, rotY: number, rotZ: number, p8: number, p9: boolean): void;

/**
   * _CAN_PED_USE_SCENARIO_POINT
   * p2 is always 0, p3 is always 0, p4 is always 1
   *
   * @param {number} ped
   * @param {number} scenario
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {boolean}
   */
declare function CanPedUseScenarioPoint(ped: Ped, scenario: number, p2: any, p3: any, p4: any): boolean;

/**
   * _CHANGE_PED_STAMINA
   * Alters entity's stamina by 'amount'. Can be negative (to drain stamina). float amount: -1000.0 - 1000.0
   *
   * @param {number} ped
   * @param {number} amount
   * @return {boolean}
   */
declare function ChangePedStamina(ped: Ped, amount: number): boolean;

/**
   * _CLEAR_ACTIVE_ANIMAL_OWNER
   * Used in Script Functions PLAYER_HORSE_RELEASE_HORSE_TO_AMBIENT_WORLD (p1 = true), HORSE_SETUP_PLAYER_HORSE_ATTRIBUTES (p1 = false)
   * Set to false for player horse in scripts and seems it's only true when releasing/changing a player horse? Cannot determine what effect it has, but it doesn't seem to affect _GET_HORSE_TAMING_STATE
   *
   * @param {number} horse
   * @param {boolean} clear
   * @return {void}
   */
declare function ClearActiveAnimalOwner(horse: Ped, clear: boolean): void;

/**
   * _CLEAR_PED_ACTION_DISABLE_FLAG
   *
   * @param {number} ped
   * @param {number} actionDisableFlag
   * @return {void}
   */
declare function ClearPedActionDisableFlag(ped: Ped, actionDisableFlag: number): void;

/**
   * _CLEAR_PED_BLOOD_DAMAGE_FACIAL
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function ClearPedBloodDamageFacial(ped: Ped, p1: number): void;

/**
   * _CLEAR_PED_COMBAT_STYLE
   * Params: p1 = 1 in R* Scripts
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function ClearPedCombatStyle(ped: Ped, p1: number): void;

/**
   * _CLEAR_PED_COMBAT_STYLE_MOD
   * _CLEAR_PED_COMBAT_*
   *
   * @param {number} ped
   * @param {number} combatStyleModHash
   * @return {void}
   */
declare function ClearPedCombatStyleMod(ped: Ped, combatStyleModHash: Hash): void;

/**
   * _CLEAR_PED_DESIRED_LOCO_FOR_MODEL
   * Clears locomotion archetype
   *
   * @param {number} ped
   * @return {void}
   */
declare function ClearPedDesiredLocoForModel(ped: Ped): void;

/**
   * _CLEAR_PED_DESIRED_LOCO_MOTION_TYPE
   *
   * @param {number} ped
   * @return {void}
   */
declare function ClearPedDesiredLocoMotionType(ped: Ped): void;

/**
   * _CLEAR_PED_GRAPPLE_FLAG
   *
   * @param {number} ped
   * @param {number} flag
   * @return {void}
   */
declare function ClearPedGrappleFlag(ped: Ped, flag: number): void;

/**
   * _CLEAR_PED_TARGET_ACTION_DISABLE_FLAG
   *
   * @param {number} ped
   * @param {number} actionDisableFlag
   * @return {void}
   */
declare function ClearPedTargetActionDisableFlag(ped: Ped, actionDisableFlag: number): void;

/**
   * _CLEAR_PED_TEXTURE
   * Removes every texture layer
   * Old Name: _RESET_PED_TEXTURE_2
   *
   * @param {number} textureId
   * @return {void}
   */
declare function ClearPedTexture(textureId: number): void;

/**
   * _CLEAR_PELT_FROM_HORSE
   *
   * @param {number} horse
   * @param {number} peltId
   * @return {void}
   */
declare function ClearPeltFromHorse(horse: Ped, peltId: number): void;

/**
   * _COMPUTE_SATCHEL_ITEM_FOR_PED_CARCASS
   * Related to dead animals items/loots
   * Notice: skinningQuality is partially calculated using pedQuality
   *
   * @param {DataView} outInventoryItemArray
   * @param {number} ped
   * @param {number} damageCleanliness
   * @param {number} skinningQuality
   * @return {number}
   */
declare function ComputeSatchelItemForPedCarcass(outInventoryItemArray: DataView, ped: Ped, damageCleanliness: number, skinningQuality: number): number;

/**
   * _CREATE_GRAVITY_WELL
   * Creates a handle to an instance of "CScriptResource_GravityWell", this system forces local ped to target specified position when moving, however player still can interrupt this.
   * Can be useful to "point" player at some specific position.
   * Only works while on-foot.
   * 
   * _CREATE_[P-Z]
   *
   * @param {number} xPos
   * @param {number} yPos
   * @param {number} zPos
   * @param {number} heading
   * @param {number} radius
   * @param {number} p5
   * @param {number} p6
   * @param {number} p7
   * @param {boolean} stopAtDestination
   * @return {number}
   */
declare function CreateGravityWell(xPos: number, yPos: number, zPos: number, heading: number, radius: number, p5: number, p6: number, p7: number, stopAtDestination: boolean): number;

/**
   * _CREATE_META_PED
   * Only used in SP scripts, for example odriscolls1: BOOLS: true, true, true, false, false
   *
   * @param {number} requestId
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} heading
   * @param {boolean} p5
   * @param {boolean} p6
   * @param {boolean} p7
   * @param {boolean} p8
   * @param {boolean} p9
   * @return {number}
   */
declare function CreateMetaPed(requestId: number, x: number, y: number, z: number, heading: number, p5: boolean, p6: boolean, p7: boolean, p8: boolean, p9: boolean): Ped;

/**
   * _CREATE_META_PED_ASSET
   * Creates prop from metaped asset bundle
   * https://github.com/femga/rdr3_discoveries/blob/master/objects/metaped_asset_bundles_list.lua
   * Creates a pickup-able metaped component. asset doesn't seems to be related to component hashes. Hash example : 0xD20354AB (https ://i.imgur.com/dzHkcDb.png)
   *
   * @param {number} asset
   * @param {number} posX
   * @param {number} posY
   * @param {number} posZ
   * @param {number} rotX
   * @param {number} rotY
   * @param {number} rotZ
   * @param {boolean} p7
   * @param {boolean} p8
   * @param {boolean} p9
   * @return {number}
   */
declare function CreateMetaPedAsset(asset: Hash, posX: number, posY: number, posZ: number, rotX: number, rotY: number, rotZ: number, p7: boolean, p8: boolean, p9: boolean): Entity;

/**
   * _CREATE_META_PED_OUTFIT_PED
   * Creates metaped from ped outfit requestId. See _REQUEST_METAPED_OUTFIT
   *
   * @param {number} requestId
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} heading
   * @param {boolean} p5
   * @param {boolean} p6
   * @param {boolean} p7
   * @param {boolean} p8
   * @return {number}
   */
declare function CreateMetaPedOutfitPed(requestId: number, x: number, y: number, z: number, heading: number, p5: boolean, p6: boolean, p7: boolean, p8: boolean): Ped;

/**
   * _DETACH_VOLUME_FROM_ENTITY
   *
   * @param {number} volume
   * @param {number} entity
   * @return {void}
   */
declare function DetachVolumeFromEntity(volume: Volume, entity: Entity): void;

/**
   * _DISABLE_ALL_LOOK_AT_REQUESTS
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function DisableAllLookAtRequests(ped: Ped, p1: number): void;

/**
   * _DISABLE_AMBIENT_LOOK_AT_REQUESTS
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function DisableAmbientLookAtRequests(p0: any, p1: any): void;

/**
   * _DOES_META_PED_OUTFIT_EXIST_FOR_PED_MODEL
   *
   * @param {number} outfit
   * @param {number} model
   * @return {boolean}
   */
declare function DoesMetaPedOutfitExistForPedModel(outfit: Hash, model: Hash): boolean;

/**
   * _DOES_META_PED_SUBOUTFIT_EXIST_FOR_PED_MODEL
   *
   * @param {number} outfit
   * @param {number} suboutfit
   * @param {number} model
   * @return {boolean}
   */
declare function DoesMetaPedSuboutfitExistForPedModel(outfit: Hash, suboutfit: Hash, model: Hash): boolean;

/**
   * _EQUIP_META_PED_OUTFIT
   * Note: you have to update your ped's variation after calling (using 0xCC8CA3E88256E58F)
   * 
   * Body Types:
   * MPCREATOR_NEUTRAL
   * MPCREATOR_SKINNY
   * MPCREATOR_SKINNY_MUSCULAR
   * MPCREATOR_HEAVY
   * MPCREATOR_HEAVY_MUSCULAR
   * 
   * eBodyWeightOutfit (pedattributes.ymt):
   * -2045421226 (smallest)
   * -1745814259
   * -325933489
   * -1065791927
   * -844699484
   * -1273449080
   * 927185840
   * 149872391
   * 399015098
   * -644349862
   * 1745919061 (default)
   * 1004225511
   * 1278600348
   * 502499352
   * -2093198664
   * -1837436619
   * 1736416063
   * 2040610690
   * -1173634986
   * -867801909
   * 1960266524 (biggest)
   * 
   * https://github.com/femga/rdr3_discoveries/blob/master/peds_customization/ped_outfits.lua
   * 
   * Alt name: _EQUIP_META_PED_OUTFIT_COMPONENT
   *
   * @param {number} ped
   * @param {number} hash
   * @return {void}
   */
declare function EquipMetaPedOutfit(ped: Ped, hash: Hash): void;

/**
   * _EQUIP_META_PED_OUTFIT_EXTRA
   * Changes Multiplayer ped face and body type components, they can be stacked
   * Params: p3 = 1
   * Body shape for mp_male from 124 - 128, 110 - 115 for mp_female
   * Face shape for mp_male from 110 - 123, 96 - 109 for mp_female
   * Cloth type for mp_male from 0 - 109, 0 - 95 for mp_female
   *
   * @param {number} ped
   * @param {number} component
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function EquipMetaPedOutfitExtra(ped: Ped, component: number, p2: any, p3: any): void;

/**
   * _EQUIP_META_PED_OUTFIT_PRESET
   * Sets the outfit preset for the ped. The presetId is an index which determines its preset outfit. p2 is always false in the scripts.
   * If p2 is true as player, then certain components like facial hair and hair will not be removed.
   * Old name: _SET_PED_OUTFIT_PRESET
   *
   * @param {number} ped
   * @param {number} presetId
   * @param {boolean} p2
   * @return {void}
   */
declare function EquipMetaPedOutfitPreset(ped: Ped, presetId: number, p2: boolean): void;

/**
   * _EQUIP_META_PED_SUBOUTFIT
   *
   * @param {number} ped
   * @param {number} suboutfit
   * @param {number} p2
   * @return {void}
   */
declare function EquipMetaPedSuboutfit(ped: Ped, suboutfit: Hash, p2: number): void;

/**
   * _FAKE_SET_PED_LOCO_INJURED
   *
   * @param {number} ped
   * @param {boolean} enabled
   * @return {void}
   */
declare function FakeSetPedLocoInjured(ped: Ped, enabled: boolean): void;

/**
   * _FORCE_PED_DEATH
   *
   * @param {number} ped
   * @param {number} pedKiller
   * @param {number} weapon
   * @return {void}
   */
declare function ForcePedDeath(ped: Ped, pedKiller: Ped, weapon: Hash): void;

/**
   * _GET_ACCURACY_AGAINST_LOCAL_PLAYER_MODIFIER
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetAccuracyAgainstLocalPlayerModifier(ped: Ped): number;

/**
   * _GET_ACTIVE_ANIMAL_OWNER
   *
   * @param {number} animal
   * @return {number}
   */
declare function GetActiveAnimalOwner(animal: Ped): Ped;

/**
   * _GET_ACTIVE_DYNAMIC_SCENARIO
   * Returns kneeling, sitting, squating, and sleeping scenario hashes
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetActiveDynamicScenario(ped: Ped): number;

/**
   * _GET_ACTIVE_DYNAMIC_SCENARIO_2
   * Returns kneeling, sitting, squating, and sleeping scenario hashes
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetActiveDynamicScenario_2(ped: Ped): number;

/**
   * _GET_BLOCKING_OF_NON_TEMPORARY_EVENTS
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function GetBlockingOfNonTemporaryEvents(ped: Ped): boolean;

/**
   * _GET_CARRIER_AS_HUMAN
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetCarrierAsHuman(entity: Entity): Ped;

/**
   * _GET_CARRIER_AS_MOUNT
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetCarrierAsMount(entity: Entity): Ped;

/**
   * _GET_CARRIER_AS_PED
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetCarrierAsPed(entity: Entity): Ped;

/**
   * _GET_CHAR_EXPRESSION
   * Gets MetaPedExpression at index specified
   * 
   * For index, see: _SET_CHAR_EXPRESSION
   * 
   * Old name: _GET_PED_FACE_FEATURE
   *
   * @param {number} ped
   * @param {number} index
   * @return {number}
   */
declare function GetCharExpression(ped: Ped, index: number): number;

/**
   * _GET_DEFAULT_RELATIONSHIP_GROUP_HASH
   *
   * @param {number} modelHash
   * @return {number}
   */
declare function GetDefaultRelationshipGroupHash(modelHash: Hash): number;

/**
   * _GET_FIRST_ENTITY_PED_IS_CARRYING
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetFirstEntityPedIsCarrying(ped: Ped): Entity;

/**
   * _GET_GROUP_FORMATION
   *
   * @param {number} groupId
   * @return {number}
   */
declare function GetGroupFormation(groupId: number): number;

/**
   * _GET_HEALTH_RECHARGE_MULTIPLIER
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetHealthRechargeMultiplier(ped: Ped): number;

/**
   * _GET_HORSE_TAMING_STATE
   * Returns an int based on enum eTamingState
   * 
   * enum eTamingState
   * {
   *   ATS_INVALID = 0,
   *   ATS_INACTIVE,
   *   ATS_TARGET_DETECTED,
   *   ATS_CALLED_OUT,
   *   ATS_MOUNTABLE,
   *   ATS_BEING_PATTED,
   *   ATS_BREAKING_ACTIVE,
   *   ATS_SPOOKED,
   *   ATS_RETREATING,
   *   ATS_FLEEING
   * };
   *
   * @param {number} horse
   * @return {number}
   */
declare function GetHorseTamingState(horse: Ped): number;

/**
   * _GET_INCAPACITATION_TIME_REMAINING
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetIncapacitationTimeRemaining(ped: Ped): number;

/**
   * _GET_IS_PED_BEING_ROBBED
   * If p2 is false, then this native will return true until the interaction is complete. If true, the native will return true until player pockets robbery item.
   * _GET_IS_PED_[M-R]*
   *
   * @param {number} ped
   * @param {number} player
   * @param {boolean} trueUntilPlayerPocketsItem
   * @return {boolean}
   */
declare function GetIsPedBeingRobbed(ped: Ped, player: Player, trueUntilPlayerPocketsItem: boolean): boolean;

/**
   * _GET_IS_PED_COMMAND_HASH_PRESENT
   *
   * @param {number} ped
   * @param {number} commandHash
   * @return {boolean}
   */
declare function GetIsPedCommandHashPresent(ped: Ped, commandHash: Hash): boolean;

/**
   * _GET_IS_PED_IN_DISPUTE_WITH_PED
   * Returns true if ped is in a dispute another ped (pedInDisputeWith can also be 0)
   *
   * @param {number} ped
   * @param {number} pedInDisputeWith
   * @return {boolean}
   */
declare function GetIsPedInDisputeWithPed(ped: Ped, pedInDisputeWith: Ped): boolean;

/**
   * _GET_IS_PED_MOTIVATION_STATE_ENABLED
   * motivationState: see _SET_PED_MOTIVATION
   *
   * @param {number} ped
   * @param {number} motivationState
   * @return {boolean}
   */
declare function GetIsPedMotivationStateEnabled(ped: Ped, motivationState: number): boolean;

/**
   * _GET_LASSOED_LASSOER
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetLassoedLassoer(ped: Ped): Ped;

/**
   * _GET_LASSOER_OF_PED
   * _IS_PED_S* - _IS_PED_U*
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetLassoerOfPed(ped: Ped): Entity;

/**
   * _GET_LASSO_TARGET
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetLassoTarget(ped: Ped): Entity;

/**
   * _GET_LAST_LED_MOUNT
   * Returns last horse the ped was leading
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetLastLedMount(ped: Ped): Ped;

/**
   * _GET_LAST_MOUNT
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetLastMount(ped: Ped): Ped;

/**
   * _GET_LAST_VEHICLE_DRAFT_HORSE_WAS_ATTACHED_TO
   *
   * @param {number} horse
   * @return {number}
   */
declare function GetLastVehicleDraftHorseWasAttachedTo(horse: Ped): Vehicle;

/**
   * _GET_LOOTING_FLAG
   * lootFlag: see SET_LOOTING_FLAG
   *
   * @param {number} ped
   * @param {number} lootFlag
   * @return {boolean}
   */
declare function GetLootingFlag(ped: Ped, lootFlag: number): boolean;

/**
   * _GET_META_PED_TYPE
   * enum eMetaPedType
   * {
   *   MPT_MALE,
   *   MPT_FEMALE,
   *   MPT_TEEN,
   *   MPT_ANIMAL,
   *   MPT_NONE
   * };
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetMetaPedType(ped: Ped): number;

/**
   * _GET_NUM_COMPONENTS_IN_PED
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetNumComponentsInPed(ped: Ped): number;

/**
   * _GET_NUM_COMPONENT_CATEGORIES_IN_PED
   * Works similar to 0x90403E8107B60E81 (_GET_NUM_COMPONENTS_IN_PED) but is used to get category hashes instead
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetNumComponentCategoriesInPed(ped: Ped): number;

/**
   * _GET_NUM_FREE_SLOTS_IN_PED_POOL
   *
  
   * @return {number}
   */
declare function GetNumFreeSlotsInPedPool(): number;

/**
   * _GET_NUM_RESERVED_AMBIENT_PEDS_DESIRED
   *
  
   * @return {number}
   */
declare function GetNumReservedAmbientPedsDesired(): number;

/**
   * _GET_NUM_RESERVED_AMBIENT_PEDS_READY
   *
  
   * @return {number}
   */
declare function GetNumReservedAmbientPedsReady(): number;

/**
   * _GET_NUM_RESERVED_HEALTH
   *
   * @param {number} ped
   * @return {any}
   */
declare function GetNumReservedHealth(ped: Ped): any;

/**
   * _GET_PEDS_IN_COMBAT_WITH_TARGET
   *
   * @param {number} ped
   * @param {number} itemset
   * @param {number} flag
   * @return {number}
   */
declare function GetPedsInCombatWithTarget(ped: Ped, itemset: ItemSet, flag: number): number;

/**
   * _GET_PED_ATTITUDE
   * AI_ATTITUDE_NEUTRAL = 0,
   * AI_ATTITUDE_FRIENDLY,
   * AI_ATTITUDE_WARY,
   * AI_ATTITUDE_COMBATIVE,
   * AI_ATTITUDE_NEVER_MET
   *
   * @param {number} ped
   * @param {number} player
   * @return {number}
   */
declare function GetPedAttitude(ped: Ped, player: Player): number;

/**
   * _GET_PED_BLACKBOARD_BOOL
   * Can be used to get a peds foliage active status: variableName = FoliageActive
   *
   * @param {number} ped
   * @param {string | number} variableName
   * @return {boolean}
   */
declare function GetPedBlackboardBool(ped: Ped, variableName: string | number): boolean;

/**
   * _GET_PED_BLACKBOARD_FLOAT
   * Can be used to get a peds foliage raw height: variableName = FoliageHeight
   *
   * @param {number} ped
   * @param {string | number} variableName
   * @return {number}
   */
declare function GetPedBlackboardFloat(ped: Ped, variableName: string | number): number;

/**
   * _GET_PED_BLACKBOARD_HASH
   *
   * @param {number} ped
   * @param {string | number} variableName
   * @return {number}
   */
declare function GetPedBlackboardHash(ped: Ped, variableName: string | number): number;

/**
   * _GET_PED_BRAWLING_STYLE
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedBrawlingStyle(ped: Ped): number;

/**
   * _GET_PED_CAN_BE_INCAPACITATED_THIS_FRAME
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function GetPedCanBeIncapacitatedThisFrame(ped: Ped): boolean;

/**
   * _GET_PED_COMBAT_ATTRIBUTE
   *
   * @param {number} ped
   * @param {number} attributeIndex
   * @return {boolean}
   */
declare function GetPedCombatAttribute(ped: Ped, attributeIndex: number): boolean;

/**
   * _GET_PED_COMPONENT_CATEGORY_BY_INDEX
   * Returns category hash that each ped component has. Hash examples: MASKS, HATS, HEADS, HORSE_MANES
   *
   * @param {number} ped
   * @param {number} index
   * @return {number}
   */
declare function GetPedComponentCategoryByIndex(ped: Ped, index: number): number;

/**
   * _GET_PED_DAMAGED
   * Returns true if _GET_PED_DAMAGE_CLEANLINESS was ever lower than 2
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function GetPedDamaged(ped: Ped): boolean;

/**
   * _GET_PED_DAMAGE_CLEANLINESS
   * enum ePedDamageCleanliness
   * {
   *   PED_DAMAGE_CLEANLINESS_POOR,
   *   PED_DAMAGE_CLEANLINESS_GOOD,
   *   PED_DAMAGE_CLEANLINESS_PERFECT
   * };
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedDamageCleanliness(ped: Ped): number;

/**
   * _GET_PED_DEFENSIVE_VOLUME
   *
   * @param {number} ped
   * @param {any} p1
   * @return {number}
   */
declare function GetPedDefensiveVolume(ped: Ped, p1: any): Volume;

/**
   * _GET_PED_DRUNKNESS
   * Returns ped drunk level
   * _H* or _I*
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedDrunkness(ped: Ped): number;

/**
   * _GET_PED_GRAPPLER
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedGrappler(ped: Ped): Ped;

/**
   * _GET_PED_GRAPPLE_FLAG
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedGrappleFlag(ped: Ped): number;

/**
   * _GET_PED_GRAPPLE_STYLE
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedGrappleStyle(ped: Ped): number;

/**
   * _GET_PED_HEIGHT
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedHeight(ped: Ped): number;

/**
   * _GET_PED_ID_RANGE
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedIdRange(ped: Ped): number;

/**
   * _GET_PED_INCAPACITATION_HEALTH
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedIncapacitationHealth(ped: Ped): number;

/**
   * _GET_PED_INTERACTION_PERSONALITY
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedInteractionPersonality(ped: Ped): number;

/**
   * _GET_PED_LASSO_HOGTIE_FLAG
   * https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/Lasso%20Hogtie%20Flags
   * https://github.com/femga/rdr3_discoveries/tree/master/AI/LASSO_HOGTIE_FLAG
   *
   * @param {number} ped
   * @param {number} flagId
   * @return {boolean}
   */
declare function GetPedLassoHogtieFlag(ped: Ped, flagId: number): boolean;

/**
   * _GET_PED_LAST_DROPPED_HAT
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedLastDroppedHat(ped: Ped): number;

/**
   * _GET_PED_LOD_MULTIPLIER
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedLodMultiplier(ped: Ped): number;

/**
   * _GET_PED_MAX_STAMINA
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedMaxStamina(ped: Ped): number;

/**
   * _GET_PED_MELEE_ACTION_PHASE
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedMeleeActionPhase(ped: Ped): number;

/**
   * _GET_PED_META_OUTFIT_HASH
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedMetaOutfitHash(ped: Ped): number;

/**
   * _GET_PED_MODEL_SIZE_FROM_HASH
   * PS_SMALL = 0,
   * PS_MEDIUM,
   * PS_MEDIUM_LARGE,
   * PS_LARGE,
   * PS_EXTRA_LARGE
   *
   * @param {number} modelHash
   * @return {number}
   */
declare function GetPedModelSizeFromHash(modelHash: Hash): number;

/**
   * _GET_PED_MOTIVATION
   * If targetPed is set to 0 the ped motivationState affects everyone
   *
   * @param {number} ped
   * @param {number} motivationState
   * @param {number} targetPed
   * @return {number}
   */
declare function GetPedMotivation(ped: Ped, motivationState: number, targetPed: Ped): number;

/**
   * _GET_PED_QUALITY
   * Returns Ped Quality to be used to calculate Skinning Quality
   * 
   * enum ePedQuality
   * {
   *   PQ_INVALID = -1,
   *   PQ_LOW,
   *   PQ_MEDIUM,
   *   PQ_HIGH,
   *   PQ_MAX
   * };
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedQuality(ped: Ped): number;

/**
   * _GET_PED_REGISTER_PROP
   * Gets a registered/attached prop entity for a particular ped. Second parameter will detach the prop entity from the ped if true. Props primarily appear to come from scenarios, such as a broom or hay bale.
   * 
   * Known props: https://pastebin.com/ap2NEJqB
   *
   * @param {number} ped
   * @param {string | number} propName
   * @param {boolean} detachProp
   * @return {number}
   */
declare function GetPedRegisterProp(ped: Ped, propName: string | number, detachProp: boolean): Entity;

/**
   * _GET_PED_REMAINING_REVIVAL_TIME
   * normalized / non normalized
   * 0.0        / 1000.0         STARTED IN WRITHE STAGE
   * 1.0        / 0.0            END OF WRITHE, DEAD
   * -1.0                        DEAD
   * 
   * Returns some value from AI task 562 (unknown).
   *
   * @param {number} ped
   * @param {boolean} normalized
   * @return {number}
   */
declare function GetPedRemainingRevivalTime(ped: Ped, normalized: boolean): number;

/**
   * _GET_PED_STAMINA
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedStamina(ped: Ped): number;

/**
   * _GET_PED_STAMINA_NORMALIZED
   * Returns stamina normalizedValue / normalizedUnlockedMax
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedStaminaNormalized(ped: Ped): number;

/**
   * _GET_PED_TRANQUILIZER
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedTranquilizer(ped: Ped): Ped;

/**
   * _GET_PELT_FROM_HORSE
   * Returns peltId
   *
   * @param {number} horse
   * @param {number} index
   * @return {number}
   */
declare function GetPeltFromHorse(horse: Ped, index: number): number;

/**
   * _GET_PLAYER_CURRENT_ANIMAL_DAMAGE_MODIFIER
   * Returns animal skin quality modifier
   *
   * @param {number} player
   * @return {number}
   */
declare function GetPlayerCurrentAnimalDamageModifier(player: Player): number;

/**
   * _GET_PLAYER_PED_WATER_DEPTH
   * Returns how deep the water is below the ped (if in water)
   * -1.0f = Not in water
   * 10.0f = Max water depth
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPlayerPedWaterDepth(ped: Ped): number;

/**
   * _GET_RIDER_OF_MOUNT
   *
   * @param {number} mount
   * @param {boolean} p1
   * @return {number}
   */
declare function GetRiderOfMount(mount: Ped, p1: boolean): Ped;

/**
   * _GET_SHOP_ITEM_BASE_LAYERS
   *
   * @param {number} shopItem
   * @param {any} p1
   * @param {number} ped
   * @param {number} metapedType
   * @param {boolean} p4
   * @return {[boolean, number, number, number, number, number, number, number, number]}
   */
declare function GetShopItemBaseLayers(shopItem: Hash, p1: any, ped: Ped, metapedType: number, p4: boolean): [boolean, number, number, number, number, number, number, number, number];

/**
   * _GET_SHOP_ITEM_COMPONENT_AT_INDEX
   *
   * @param {number} ped
   * @param {number} index
   * @param {boolean} p2
   * @param {DataView} argStruct
   * @param {DataView} argStruct2
   * @return {number}
   */
declare function GetShopItemComponentAtIndex(ped: Ped, index: number, p2: boolean, argStruct: DataView, argStruct2: DataView): number;

/**
   * _GET_SHOP_ITEM_COMPONENT_CATEGORY
   *
   * @param {number} componentHash
   * @param {number} metapedType
   * @param {boolean} isMp
   * @return {number}
   */
declare function GetShopItemComponentCategory(componentHash: Hash, metapedType: number, isMP: boolean): number;

/**
   * _GET_SHOP_ITEM_HAT_COMPONENT
   *
   * @param {number} ped
   * @param {number} metapedType
   * @param {boolean} p2
   * @return {any}
   */
declare function GetShopItemHatComponent(ped: Ped, metapedType: number, p2: boolean): any;

/**
   * _GET_SHOP_ITEM_NUM_WEARABLE_STATES
   * Returns the number of wearable states available for a shop item / component. p2 seems to be true in scripts.
   * 
   * For use with 0x6243635AF2F1B826 (_GET_SHOP_ITEM_AVAILABLE_WEARABLE_STATE_BY_INDEX)
   *
   * @param {number} componentHash
   * @param {boolean} isMpFemale
   * @param {boolean} p2
   * @return {number}
   */
declare function GetShopItemNumWearableStates(componentHash: Hash, isMpFemale: boolean, p2: boolean): number;

/**
   * _GET_SHOP_ITEM_WEARABLE_STATE_BY_INDEX
   * Gets an available wearable state by index for a shop item / component - it does not retreive what the current state is. p3 seems to be true in scripts.
   * 
   * Use 0xFFCC2DB2D9953401 (_GET_SHOP_ITEM_NUM_WEARABLE_STATES) to get the number of available wearable states
   *
   * @param {number} componentHash
   * @param {number} wearableStateIndex
   * @param {boolean} isMpFemale
   * @param {boolean} p3
   * @return {number}
   */
declare function GetShopItemWearableStateByIndex(componentHash: Hash, wearableStateIndex: number, isMpFemale: boolean, p3: boolean): number;

/**
   * _GET_STAMINA_DEPLETION_MULTIPLIER
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetStaminaDepletionMultiplier(ped: Ped): number;

/**
   * _GET_STAMINA_RECHARGE_MULTIPLIER
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetStaminaRechargeMultiplier(ped: Ped): number;

/**
   * _GET_TOTAL_PED_DAMAGE_FROM_AI
   * _GET_WA*
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetTotalPedDamageFromAi(ped: Ped): number;

/**
   * _GET_TRANSPORT_PED_IS_SEATED_ON
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetTransportPedIsSeatedOn(ped: Ped): Entity;

/**
   * _GET_VEHICLE_DRAFT_HORSE_IS_ATTACHED_TO
   *
   * @param {number} horse
   * @return {number}
   */
declare function GetVehicleDraftHorseIsAttachedTo(horse: Ped): Vehicle;

/**
   * _GIVE_PED_HASH_COMMAND
   * Ped Command Hash are special commands, that can be activated to change conditional anim variations or trigger transitions between conditional anims.
   * https://github.com/femga/rdr3_discoveries/blob/master/animations/scenarios
   *
   * @param {number} ped
   * @param {number} commandHash
   * @param {number} activationDuration
   * @return {void}
   */
declare function GivePedHashCommand(ped: Ped, commandHash: Hash, activationDuration: number): void;

/**
   * _GIVE_PED_SCENARIO_PROP
   *
   * @param {number} ped
   * @param {number} object
   * @param {string | number} conditionalAnim
   * @param {string | number} p3
   * @param {string | number} p4
   * @param {boolean} p5
   * @return {boolean}
   */
declare function GivePedScenarioProp(ped: Ped, object: number, conditionalAnim: string | number, p3: string | number, p4: string | number, p5: boolean): boolean;

/**
   * _GIVE_PED_SCENARIO_PROP_DYNAMIC
   * Only used in SP R* Script rcm_jack2
   *
   * @param {number} ped
   * @param {number} object
   * @param {string | number} p2
   * @param {string | number} p3
   * @param {boolean} p4
   * @return {boolean}
   */
declare function GivePedScenarioPropDynamic(ped: Ped, object: number, p2: string | number, p3: string | number, p4: boolean): boolean;

/**
   * _HAS_META_PED_ASSET_LOADED
   *
   * @param {number} requestId
   * @return {boolean}
   */
declare function HasMetaPedAssetLoaded(requestId: number): boolean;

/**
   * _HAS_META_PED_OUTFIT_LOADED
   *
   * @param {number} requestId
   * @return {boolean}
   */
declare function HasMetaPedOutfitLoaded(requestId: number): boolean;

/**
   * _HAS_META_PED_REQUEST_LOADED
   *
   * @param {number} requestId
   * @return {boolean}
   */
declare function HasMetaPedRequestLoaded(requestId: number): boolean;

/**
   * _HAS_PED_BEEN_SHOVED_RECENTLY
   *
   * @param {number} ped
   * @param {number} ms
   * @return {boolean}
   */
declare function HasPedBeenShovedRecently(ped: Ped, ms: number): boolean;

/**
   * _HAS_PED_EMOTIONAL_PRESET_LOADED
   * See _REQUEST_PED_EMOTIONAL_PRESET
   *
   * @param {number} ped
   * @param {string | number} name
   * @return {boolean}
   */
declare function HasPedEmotionalPresetLoaded(ped: Ped, name: string | number): boolean;

/**
   * _HAS_PED_TAKEN_GORE_DAMAGE
   * limb: 3 = Left Hand, 4 = Left Arm, 6 = Right Hand, 7 = Right Arm, 9 = Left Foot, 10 = Left Leg, 12 = Right Foot, 13 = Right Leg, 37 = Head
   *
   * @param {number} ped
   * @param {number} limb
   * @return {boolean}
   */
declare function HasPedTakenGoreDamage(ped: Ped, limb: number): boolean;

/**
   * _HORSE_AGITATE
   * _H* - _I*
   *
   * @param {number} mount
   * @param {boolean} kickOffRider
   * @return {void}
   */
declare function HorseAgitate(mount: Ped, kickOffRider: boolean): void;

/**
   * _INCAPACITATED_REVIVE
   *
   * @param {number} ped
   * @param {number} ped2
   * @return {void}
   */
declare function IncapacitatedRevive(ped: Ped, ped2: Ped): void;

/**
   * _IS_ANIMAL_CONTROLLED_BY_A_PLAYER
   * Returns true only if it's a player ped and an animal as well.
   * _IS_ANY_* - _IS_CONTROL_*
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsAnimalControlledByAPlayer(ped: Ped): boolean;

/**
   * _IS_ANIMAL_INTERACTION_RUNNING
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsAnimalInteractionRunning(ped: Ped): boolean;

/**
   * _IS_META_PED_ASSET_VALID
   *
   * @param {number} requestId
   * @return {boolean}
   */
declare function IsMetaPedAssetValid(requestId: number): boolean;

/**
   * _IS_META_PED_FISH
   * Returns true if given ped is a fish.
   * _IS_ME* - _IS_MO*
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsMetaPedFish(ped: Ped): boolean;

/**
   * _IS_META_PED_OUTFIT_EQUIPPED
   * Used in script function HORSE_IS_META_PED_OUTFIT_SADDLE_EQUIPPED
   *
   * @param {number} ped
   * @param {number} outfit
   * @return {boolean}
   */
declare function IsMetaPedOutfitEquipped(ped: Ped, outfit: Hash): boolean;

/**
   * _IS_META_PED_OUTFIT_REQUEST_VALID
   *
   * @param {number} requestId
   * @return {boolean}
   */
declare function IsMetaPedOutfitRequestValid(requestId: number): boolean;

/**
   * _IS_META_PED_REQUEST_VALID
   *
   * @param {number} requestId
   * @return {boolean}
   */
declare function IsMetaPedRequestValid(requestId: number): boolean;

/**
   * _IS_META_PED_USING_COMPONENT_CATEGORY
   * checks if a ped is using a component category
   * see component category hashes here https://raw.githubusercontent.com/femga/rdr3_discoveries/refs/heads/master/clothes/cloth_hash_names.lua
   * Old name: _IS_META_PED_USING_COMPONENT
   *
   * @param {number} ped
   * @param {number} componentCategory
   * @return {boolean}
   */
declare function IsMetaPedUsingComponentCategory(ped: Ped, componentCategory: Hash): boolean;

/**
   * _IS_MOUNT_SEAT_FREE
   *
   * @param {number} mount
   * @param {number} seat
   * @return {boolean}
   */
declare function IsMountSeatFree(mount: Ped, seat: number): boolean;

/**
   * _IS_PED_ACTION_DISABLE_FLAG_ENABLED
   *
   * @param {number} ped
   * @param {number} actionDisableFlag
   * @return {boolean}
   */
declare function IsPedActionDisableFlagEnabled(ped: Ped, actionDisableFlag: number): boolean;

/**
   * _IS_PED_CHILD
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedChild(ped: Ped): boolean;

/**
   * _IS_PED_CLIMBING_LADDER
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedClimbingLadder(ped: Ped): boolean;

/**
   * _IS_PED_COWERING
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedCowering(ped: Ped): boolean;

/**
   * _IS_PED_DOING_SCENARIO_TRANSITION
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedDoingScenarioTransition(ped: Ped): boolean;

/**
   * _IS_PED_DRAGGING
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedDragging(ped: Ped): boolean;

/**
   * _IS_PED_DRUNK
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedDrunk(ped: Ped): boolean;

/**
   * IS_PED_GROUP_LEADER
   *
   * @param {number} ped
   * @param {number} groupId
   * @return {boolean}
   */
declare function IsPedGroupLeader(ped: Ped, groupId: number): boolean;

/**
   * _IS_PED_INTIMIDATED
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedIntimidated(ped: Ped): boolean;

/**
   * _IS_PED_INVESTIGATING
   * _IS_PED_IN*
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedInvestigating(ped: Ped): boolean;

/**
   * _IS_PED_IN_POINT
   * If returned true: There are enemy peds near friendly turn in ped. Going to aggro.
   * If returned false: Moving back to idle as there aren't any remaining enemy peds near ped
   * _IS_PED_IN_*
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @param {boolean} p5
   * @return {boolean}
   */
declare function IsPedInPoint(ped: Ped, x: number, y: number, z: number, radius: number, p5: boolean): boolean;

/**
   * _IS_PED_LEADING_ANY_GROUP
   * _IS_PED_L* - _IS_PED_M*
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedLeadingAnyGroup(ped: Ped): boolean;

/**
   * _IS_PED_MODEL_SUPPRESSED
   *
   * @param {number} model
   * @return {boolean}
   */
declare function IsPedModelSuppressed(model: Hash): boolean;

/**
   * _IS_PED_QUEUED_FOR_DELETION
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedQueuedForDeletion(ped: Ped): boolean;

/**
   * _IS_PED_SLIDING
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedSliding(ped: Ped): boolean;

/**
   * _IS_PED_TARGET_ACTION_DISABLE_FLAG_ENABLED
   *
   * @param {number} ped
   * @param {number} actionDisableFlag
   * @return {boolean}
   */
declare function IsPedTargetActionDisableFlagEnabled(ped: Ped, actionDisableFlag: number): boolean;

/**
   * _IS_PED_USING_ACTION_MODE_2
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedUsingActionMode_2(ped: Ped): boolean;

/**
   * _IS_PED_VISIBILITY_TRACKED
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedVisibilityTracked(ped: Ped): boolean;

/**
   * _IS_SCENARIO_BLOCKING_AREA_VALID
   *
   * @param {any} p0
   * @return {boolean}
   */
declare function IsScenarioBlockingAreaValid(p0: any): boolean;

/**
   * _IS_TARGET
   *
   * @param {number} ped
   * @param {number} targetPed
   * @return {boolean}
   */
declare function IsTarget(ped: Ped, targetPed: Ped): boolean;

/**
   * _IS_TEXTURE_VALID
   *
   * @param {number} textureId
   * @return {boolean}
   */
declare function IsTextureValid(textureId: number): boolean;

/**
   * _IS_THIS_MODEL_A_HORSE
   *
   * @param {number} model
   * @return {boolean}
   */
declare function IsThisModelAHorse(model: Hash): boolean;

/**
   * _IS_TRACKED_PED_VISIBILITY_PERCENTAGE_NOT_LESS_THAN
   *
   * @param {number} ped
   * @param {number} percent
   * @return {boolean}
   */
declare function IsTrackedPedVisibilityPercentageNotLessThan(ped: Ped, percent: number): boolean;

/**
   * _IS_USING_SLIPSTREAM
   * _IS_TRACKED_* - IS_V*
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsUsingSlipstream(ped: Ped): boolean;

/**
   * _PED_CLEAR_LOCO_MOTION
   *
   * @param {number} ped
   * @return {void}
   */
declare function PedClearLocoMotion(ped: Ped): void;

/**
   * _PED_DUELING_DID_PLAYER_HEADSHOT_OPPONENT
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function PedDuelingDidPlayerHeadshotOpponent(ped: Ped): boolean;

/**
   * _PED_EMOTIONAL_PRESET_LOCO_MOTION
   * target: 0 affects everyone
   * duration: -1 indefinite
   * flag: always 4 in R* Scripts
   *
   * @param {number} ped
   * @param {string | number} presetName
   * @param {number} targetPed
   * @param {number} duration
   * @param {number} flag
   * @return {void}
   */
declare function PedEmotionalPresetLocoMotion(ped: Ped, presetName: string | number, targetPed: Ped, duration: number, flag: number): void;

/**
   * _PED_WAS_KILLED_BY_HEADSHOT
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function PedWasKilledByHeadshot(ped: Ped): boolean;

/**
   * _REFRESH_LOOT_STATE_FOR_PED
   * Returns loot state
   * enum eLootState
   * {
   *   LAP_NONE,
   *   LAP_RESUMING,
   *   LAP_GETTING_ON_FOOT,
   *   LAP_DISTANT_NAV,
   *   LAP_CHOOSING_ACTION,
   *   LAP_APPROACHING,
   *   LAP_ENTERING,
   *   LAP_LOOTING,
   *   LAP_EXITING
   * };
   * 
   * _POSSE_* - _REGISTER_HATED*
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} p3
   * @param {number} p4
   * @return {[number, Ped]}
   */
declare function RefreshLootStateForPed(ped: Ped, p1: number, p3: number, p4: number): [number, Ped];

/**
   * _REFRESH_META_PED_SHOP_ITEMS
   * p1 is always 1
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function RefreshMetaPedShopItems(ped: Ped, p1: number): void;

/**
   * _REGISTER_HATED_TARGETS_IN_AREA
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @return {void}
   */
declare function RegisterHatedTargetsInArea(ped: Ped, x: number, y: number, z: number, radius: number): void;

/**
   * _RELEASE_META_PED_ASSET_REQUEST
   *
   * @param {number} requestId
   * @return {void}
   */
declare function ReleaseMetaPedAssetRequest(requestId: number): void;

/**
   * _RELEASE_META_PED_OUTFIT_REQUEST
   *
   * @param {number} requestId
   * @return {void}
   */
declare function ReleaseMetaPedOutfitRequest(requestId: number): void;

/**
   * _RELEASE_META_PED_REQUEST
   *
   * @param {number} requestId
   * @return {void}
   */
declare function ReleaseMetaPedRequest(requestId: number): void;

/**
   * _RELEASE_TEXTURE
   * Removes a texture created by 0xC5E7204F322E49EB.
   *
   * @param {number} textureId
   * @return {void}
   */
declare function ReleaseTexture(textureId: number): void;

/**
   * _REMOVE_GRAVITY_WELL
   * Removes gravity well by handle returned from 0x4F5EBE70081E5A20
   *
   * @param {number} handle
   * @return {void}
   */
declare function RemoveGravityWell(handle: number): void;

/**
   * _REMOVE_MOTION_TYPE_ASSET
   *
   * @param {number} nameHash
   * @param {number} ped
   * @return {void}
   */
declare function RemoveMotionTypeAsset(nameHash: Hash, ped: Ped): void;

/**
   * _REMOVE_PED_BLACKBOARD_BOOL
   *
   * @param {number} ped
   * @param {string | number} variableName
   * @return {void}
   */
declare function RemovePedBlackboardBool(ped: Ped, variableName: string | number): void;

/**
   * _REMOVE_PED_BLACKBOARD_FLOAT
   *
   * @param {number} ped
   * @param {string | number} variableName
   * @return {void}
   */
declare function RemovePedBlackboardFloat(ped: Ped, variableName: string | number): void;

/**
   * _REMOVE_PED_BLACKBOARD_HASH
   *
   * @param {number} ped
   * @param {string | number} variableName
   * @return {void}
   */
declare function RemovePedBlackboardHash(ped: Ped, variableName: string | number): void;

/**
   * _REMOVE_PED_BLACKBOARD_INT
   *
   * @param {number} ped
   * @param {string | number} variableName
   * @return {void}
   */
declare function RemovePedBlackboardInt(ped: Ped, variableName: string | number): void;

/**
   * _REMOVE_PED_EMOTIONAL_PRESET
   * See _REQUEST_PED_EMOTIONAL_PRESET
   *
   * @param {number} ped
   * @param {string | number} name
   * @return {void}
   */
declare function RemovePedEmotionalPreset(ped: Ped, name: string | number): void;

/**
   * _REMOVE_PED_FROM_MOUNT
   *
   * @param {number} ped
   * @param {boolean} p1
   * @param {boolean} p2
   * @return {void}
   */
declare function RemovePedFromMount(ped: Ped, p1: boolean, p2: boolean): void;

/**
   * _REMOVE_PED_OVERLAY
   *
   * @param {number} textureId
   * @param {number} overlayId
   * @return {void}
   */
declare function RemovePedOverlay(textureId: number, overlayId: number): void;

/**
   * _REMOVE_PED_PROP
   *
   * @param {number} ped
   * @param {string | number} propName
   * @return {void}
   */
declare function RemovePedProp(ped: Ped, propName: string | number): void;

/**
   * _REMOVE_PED_STAY_OUT_VOLUME
   *
   * @param {number} ped
   * @param {number} volume
   * @return {boolean}
   */
declare function RemovePedStayOutVolume(ped: Ped, volume: Volume): boolean;

/**
   * _REMOVE_PED_SUBSCRIBE_TO_LEGENDARY_BLIPS
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function RemovePedSubscribeToLegendaryBlips(ped: Ped): boolean;

/**
   * _REMOVE_SHOP_ITEM_FROM_PED
   * Directly removes a shop item component from a ped
   * Params: p2 and p3 are always 0
   *
   * @param {number} ped
   * @param {number} componentHash
   * @param {number} p2
   * @param {boolean} p3
   * @return {void}
   */
declare function RemoveShopItemFromPed(ped: Ped, componentHash: Hash, p2: number, p3: boolean): void;

/**
   * _REMOVE_TARGET
   *
   * @param {number} ped
   * @param {number} targetPed
   * @return {void}
   */
declare function RemoveTarget(ped: Ped, targetPed: Ped): void;

/**
   * _REQUEST_META_PED
   * Returns requestId
   * Params: p1 = 1 in R* Scripts (Used in SP only)
   *
   * @param {number} model
   * @param {number} p1
   * @return {number}
   */
declare function RequestMetaPed(model: Hash, p1: number): number;

/**
   * _REQUEST_META_PED_ASSET_BUNDLE
   * Returns requestId
   * Params: p1 = 1 in R* Scripts
   *
   * @param {number} asset
   * @param {number} p1
   * @return {number}
   */
declare function RequestMetaPedAssetBundle(asset: Hash, p1: number): number;

/**
   * _REQUEST_META_PED_COMPONENT
   *
   * @param {number} metaPedType
   * @param {any} p1
   * @param {number} p2
   * @param {number} p3
   * @param {number} p4
   * @return {any}
   */
declare function RequestMetaPedComponent(metaPedType: number, p1: any, p2: number, p3: number, p4: number): any;

/**
   * _REQUEST_META_PED_OUTFIT
   * https://github.com/femga/rdr3_discoveries/blob/master/clothes/metaped_outfits.lua
   * Returns requestId, to be used with 0x74F512E29CB717E2
   *
   * @param {number} model
   * @param {number} outfit
   * @return {number}
   */
declare function RequestMetaPedOutfit(model: Hash, outfit: Hash): number;

/**
   * _REQUEST_MOTION_TYPE_ASSET
   *
   * @param {number} nameHash
   * @param {number} ped
   * @return {void}
   */
declare function RequestMotionTypeAsset(nameHash: Hash, ped: Ped): void;

/**
   * _REQUEST_PED_EMOTIONAL_PRESET
   * For more information, see common:/data/emotional_presets.meta
   *
   * @param {number} ped
   * @param {string | number} name
   * @return {void}
   */
declare function RequestPedEmotionalPreset(ped: Ped, name: string | number): void;

/**
   * _REQUEST_PED_FACIAL_MOOD_THIS_FRAME
   * mood: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/fwFacialAnimRequest__Mood
   * Params: p2 = 6 in R* Scripts
   *
   * @param {number} ped
   * @param {number} mood
   * @param {number} p2
   * @return {void}
   */
declare function RequestPedFacialMoodThisFrame(ped: Ped, mood: Hash, p2: number): void;

/**
   * _REQUEST_PED_FOR_SCENARIO_TYPE
   *
   * @param {number} ped
   * @param {number} object
   * @param {string | number} p2
   * @param {number} scenarioType
   * @param {string | number} p4
   * @param {boolean} p5
   * @return {any}
   */
declare function RequestPedForScenarioType(ped: Ped, object: number, p2: string | number, scenarioType: Hash, p4: string | number, p5: boolean): any;

/**
   * _REQUEST_PED_GETUP_ANIMATION
   * Known get up animation types: REAR, FRONT
   *
   * @param {number} ped
   * @param {string | number} getUpType
   * @return {void}
   */
declare function RequestPedGetupAnimation(ped: Ped, getUpType: string | number): void;

/**
   * _REQUEST_PROP_SCENARIO_PED
   *
   * @param {number} ped
   * @param {number} object
   * @param {string | number} p2
   * @param {string | number} p3
   * @param {string | number} p4
   * @param {boolean} p5
   * @return {any}
   */
declare function RequestPropScenarioPed(ped: Ped, object: number, p2: string | number, p3: string | number, p4: string | number, p5: boolean): any;

/**
   * _REQUEST_TEXTURE
   * Creates a texture override data for ped and returns it's index.
   * So you can replace any texture of any ped's component.
   * Also, you can add overlays on it, such as aging, lipstick and more.
   * Textures can be reused by multiple peds at once.
   * You can keep only 32 textures at once(including other peds).
   * 
   * https://github.com/femga/rdr3_discoveries/blob/master/clothes/change_overlays_script.lua
   * materialHash: https://github.com/femga/rdr3_discoveries/blob/master/clothes/cloth_drawable_albedo_normal_material_TEMPORARY.lua
   *
   * @param {number} albedoHash
   * @param {number} normalHash
   * @param {number} materialHash
   * @return {number}
   */
declare function RequestTexture(albedoHash: Hash, normalHash: Hash, materialHash: Hash): number;

/**
   * _RESERVE_AMBIENT_PEDS
   *
   * @param {number} numPeds
   * @return {void}
   */
declare function ReserveAmbientPeds(numPeds: number): void;

/**
   * _RESERVE_AMBIENT_PEDS_TOTAL
   *
   * @param {number} numPeds
   * @return {void}
   */
declare function ReserveAmbientPedsTotal(numPeds: number): void;

/**
   * _RESET_PED_COMPONENTS
   *
   * @param {number} ped
   * @return {void}
   */
declare function ResetPedComponents(ped: Ped): void;

/**
   * _RESET_PED_INCAPACITATION_BLEED_OUT_DURATION
   *
   * @param {number} ped
   * @return {void}
   */
declare function ResetPedIncapacitationBleedOutDuration(ped: Ped): void;

/**
   * _RESET_PED_LADDER_MOVEMENT_SPEED_MODIFIER
   *
   * @param {number} ped
   * @return {void}
   */
declare function ResetPedLadderMovementSpeedModifier(ped: Ped): void;

/**
   * _RESET_PED_TEXTURE
   * Removes every texture layer but the base layer
   * Clearing texture's data: setting params to default values, but keep overlays.
   *
   * @param {number} textureId
   * @return {void}
   */
declare function ResetPedTexture(textureId: number): void;

/**
   * _RESTORE_PED_STAMINA
   * 0.0 <= stamina <= 100.0
   *
   * @param {number} ped
   * @param {number} stamina
   * @return {void}
   */
declare function RestorePedStamina(ped: Ped, stamina: number): void;

/**
   * _SET_ACCURACY_AGAINST_LOCAL_PLAYER_MODIFIER
   *
   * @param {number} ped
   * @param {number} modifier
   * @return {void}
   */
declare function SetAccuracyAgainstLocalPlayerModifier(ped: Ped, modifier: number): void;

/**
   * _SET_AMBIENT_ANIMAL_DENSITY_MULTIPLIER_THIS_FRAME
   *
   * @param {number} multiplier
   * @return {void}
   */
declare function SetAmbientAnimalDensityMultiplierThisFrame(multiplier: number): void;

/**
   * _SET_AMBIENT_HUMAN_DENSITY_MULTIPLIER_THIS_FRAME
   *
   * @param {number} multiplier
   * @return {void}
   */
declare function SetAmbientHumanDensityMultiplierThisFrame(multiplier: number): void;

/**
   * _SET_AMBIENT_PED_DENSITY_MULTIPLIER_THIS_FRAME
   *
   * @param {number} multiplier
   * @return {void}
   */
declare function SetAmbientPedDensityMultiplierThisFrame(multiplier: number): void;

/**
   * _SET_CHAR_EXPRESSION
   * Sets MetaPedExpression at index specified. Morphs components, such as changing body size or facial features.
   * 
   * Note: You have to update the ped's variation (using 0xCC8CA3E88256E58F) after calling this native
   * 
   * index = MetaPedExpression IDs
   * List of face features: https://pastebin.com/9jb88FXW
   * Full list of MetaPedExpressions: https://pastebin.com/Ld76cAn7
   * value: -1.0 to 1.0 (values beyond this likely won't sync to other clients)
   * 
   * This native also allows you to change a horse's gender.
   * 
   * Old name: _SET_PED_FACE_FEATURE
   *
   * @param {number} ped
   * @param {number} index
   * @param {number} value
   * @return {void}
   */
declare function SetCharExpression(ped: Ped, index: number, value: number): void;

/**
   * _SET_CURRENT_DEFENSE_AGAINST_PLAYERS_MODIFIER
   *
   * @param {number} horse
   * @param {number} modifier
   * @return {void}
   */
declare function SetCurrentDefenseAgainstPlayersModifier(horse: Ped, modifier: number): void;

/**
   * _SET_DEFENSE_MODIFIER_FOR_PED
   *
   * @param {number} ped
   * @param {number} modifier
   * @return {void}
   */
declare function SetDefenseModifierForPed(ped: Ped, modifier: number): void;

/**
   * _SET_FORMATION_AUTO_ASSIGN_POSITION
   *
   * @param {number} groupId
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetFormationAutoAssignPosition(groupId: number, toggle: boolean): void;

/**
   * _SET_HEALTH_RECHARGE_MULTIPLIER
   *
   * @param {number} ped
   * @param {number} multiplier
   * @return {void}
   */
declare function SetHealthRechargeMultiplier(ped: Ped, multiplier: number): void;

/**
   * _SET_INTERACTION_LOCKON_FLAG
   *
   * @param {number} ped
   * @param {number} player
   * @param {number} flag
   * @param {boolean} enable
   * @return {void}
   */
declare function SetInteractionLockonFlag(ped: Ped, player: Player, flag: number, enable: boolean): void;

/**
   * _SET_META_PED_TAG
   * Use to apply metaped player components
   * Replaces asset, alternatively you can remove assets using REMOVE_TAG_FROM_META_PED
   *
   * @param {number} ped
   * @param {number} drawable
   * @param {number} albedo
   * @param {number} normal
   * @param {number} material
   * @param {number} palette
   * @param {number} tint0
   * @param {number} tint1
   * @param {number} tint2
   * @return {void}
   */
declare function SetMetaPedTag(ped: Ped, drawable: Hash, albedo: Hash, normal: Hash, material: Hash, palette: Hash, tint0: number, tint1: number, tint2: number): void;

/**
   * _SET_META_PED_WEARINESS
   * Sets ped eye redness, weariness: 0.f to 1.f
   *
   * @param {number} ped
   * @param {number} weariness
   * @return {void}
   */
declare function SetMetaPedWeariness(ped: Ped, weariness: number): void;

/**
   * _SET_MIN_PED_HEALTH_THRESHOLD
   *
   * @param {number} ped
   * @param {number} healthAmount
   * @return {void}
   */
declare function SetMinPedHealthThreshold(ped: Ped, healthAmount: number): void;

/**
   * _SET_MOUNT_BONDING_LEVEL
   *
   * @param {number} ped
   * @param {number} bondingLevel
   * @return {void}
   */
declare function SetMountBondingLevel(ped: Ped, bondingLevel: number): void;

/**
   * _SET_MOUNT_SECURITY_ENABLED
   * Note: this native was added in build 1232.40
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetMountSecurityEnabled(ped: Ped, toggle: boolean): void;

/**
   * _SET_PED_ACTION_DISABLE_FLAG
   * https://github.com/femga/rdr3_discoveries/tree/master/AI/COMBAT_ACTION_DISABLE_FLAGS
   *
   * @param {number} ped
   * @param {number} actionDisableFlag
   * @return {void}
   */
declare function SetPedActionDisableFlag(ped: Ped, actionDisableFlag: number): void;

/**
   * _SET_PED_ACTIVATE_WOUND_EFFECT
   * bloodFountainPressure: visible effect from 0.0 till 20.0
   * yaw: visible effect from -3.0 till 3.0
   * bloodFountainDirection: 1.0 left side, -1.0 right side
   * bloodFountainPulse: from 0.1 (low) till 1.0 (fast)
   * make blood fountain from your stomach: _SET_PED_ACTIVATE_WOUND_EFFECT(ped, unk, 2, 14411, 0.0, 0.1, 0.0, 0.0, 3.0, -1.0, 1.0)
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} boneId
   * @param {number} moveWoundLeftRight
   * @param {number} bloodFountainPressure
   * @param {number} yaw
   * @param {number} bloodFountainDirection
   * @param {number} bloodFountainPulse
   * @param {number} p8
   * @param {number} p9
   * @return {void}
   */
declare function SetPedActivateWoundEffect(ped: Ped, p1: number, boneId: number, moveWoundLeftRight: number, bloodFountainPressure: number, yaw: number, bloodFountainDirection: number, bloodFountainPulse: number, p8: number, p9: number): void;

/**
   * _SET_PED_ACTIVE_PLAYER_TYPE
   * Params: hash - ARTHUR or JOHN
   * _SET_PED_(A-D)*
   *
   * @param {number} ped
   * @param {number} playerType
   * @return {void}
   */
declare function SetPedActivePlayerType(ped: Ped, playerType: Hash): void;

/**
   * _SET_PED_ANIMAL_DETECTION_MODIFIER
   *
   * @param {number} ped
   * @param {number} modifier
   * @return {void}
   */
declare function SetPedAnimalDetectionModifier(ped: Ped, modifier: number): void;

/**
   * _SET_PED_BEAT_MULTIPLIER
   * NET_FETCH_CLIENT_UPDATE_PED_FIGHT_PROFICIENCY: Changing parry multiplier for ped
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function SetPedBeatMultiplier(ped: Ped, p1: number): void;

/**
   * _SET_PED_BLACKBOARD_BOOL
   *
   * @param {number} ped
   * @param {string | number} variableName
   * @param {boolean} value
   * @param {number} removeTimer
   * @return {void}
   */
declare function SetPedBlackboardBool(ped: Ped, variableName: string | number, value: boolean, removeTimer: number): void;

/**
   * _SET_PED_BLACKBOARD_FLOAT
   *
   * @param {number} ped
   * @param {string | number} variableName
   * @param {number} value
   * @param {number} removeTimer
   * @return {void}
   */
declare function SetPedBlackboardFloat(ped: Ped, variableName: string | number, value: number, removeTimer: number): void;

/**
   * _SET_PED_BLACKBOARD_HASH
   * p1:
   * BodyPartChained
   * OverloadMostInjuredBodyPart
   * 
   * p2:
   * LeftLeg
   * Legs
   * RightArm
   *
   * @param {number} ped
   * @param {string | number} variableName
   * @param {string | number} value
   * @param {number} removeTimer
   * @return {void}
   */
declare function SetPedBlackboardHash(ped: Ped, variableName: string | number, value: string | number, removeTimer: number): void;

/**
   * _SET_PED_BLACKBOARD_INT
   * https://github.com/femga/rdr3_discoveries/tree/master/AI/BLACKBOARDS
   * Blackboard natives allow you to apply and check certain data to/for peds.
   * Blackboard bools, floats and strings are subdivided into 6 sections: "all", "animation", "any", "code", "global" and "script"
   * Most changes are only visible for "script" blackboards, some "script" blackboards change ped motions
   * "removeTimer" is self-removal timer, can be "-1" so your data will not be removed by the game (forever); 100 = 1 second
   *
   * @param {number} ped
   * @param {string | number} variableName
   * @param {number} value
   * @param {number} removeTimer
   * @return {void}
   */
declare function SetPedBlackboardInt(ped: Ped, variableName: string | number, value: number, removeTimer: number): void;

/**
   * _SET_PED_BLEEDOUT_PROFILE
   * Bleedout profiles:
   * Animal_FastBleedout
   * Animal_Generic
   * Human_FastBleedout
   * Human_Generic
   * Human_Mission
   * 
   * For more information, see common/data/ai/peddamageinfo.meta
   *
   * @param {number} ped
   * @param {number} bleedoutProfile
   * @return {void}
   */
declare function SetPedBleedoutProfile(ped: Ped, bleedoutProfile: Hash): void;

/**
   * _SET_PED_BRAWLING_STYLE
   * brawlingStyle:
   * enum eBrawlingStyle : Hash
   * {
   *   BS_AI = 0x802C604D,
   *   BS_AI_BARBRAWL = 0x4FF5F0C7,
   *   BS_AI_DEFENSIVE = 0xD888F2FD,
   *   BS_AI_MOONSHINE_BARBRAWL = 0xA01B433A,
   *   BS_ALLIGATOR = 0x7A5548ED,
   *   BS_ALLIGATOR_LARGE = 0x368EC7CB,
   *   BS_ALLY = 0x69C76C14,
   *   BS_ANIMAL = 0xD777C754,
   *   BS_BADGER = 0x7E7C3F53,
   *   BS_BEAR = 0x0BC66E35,
   *   BS_BEAVER = 0x4E313783,
   *   BS_BOAR = 0x176A5831,
   *   BS_BOUNTY_HUNTER = 0x3900654C,
   *   BS_BRUISER = 0x4514DB61,
   *   BS_BULL = 0x4E50C5D2,
   *   BS_COUGAR = 0x9DAA7CCB,
   *   BS_COW = 0xB0E91295,
   *   BS_COYOTE = 0xA448EB69,
   *   BS_DEER = 0xA781E6B3,
   *   BS_DOG = 0x5A4155C4,
   *   BS_ELK = 0x408697F0,
   *   BS_FEMALE = 0x6A3BB2C2,
   *   BS_FEMALE_STRONG = 0x4DAFDD84,
   *   BS_GANGUP = 0xD0CECFF2,
   *   BS_GOAT = 0x078E649F,
   *   BS_HORSE = 0xF6B775F3,
   *   BS_MICAH_FINALE = 0x1F0BB27A,
   *   BS_MOOSE = 0x968917AB,
   *   BS_MUSKRAT = 0x1EDC33AC,
   *   BS_NO_MELEE = 0x25B5F931,
   *   BS_PIG = 0x22EAD110,
   *   BS_PLAYER = 0x78BAEF07,
   *   BS_PLAYER_FINALE = 0xF9E77D2D,
   *   BS_PLAYER_MOONSHINER = 0x687BF19F,
   *   BS_PLAYER_WINTER1 = 0x3C6A802F,
   *   BS_QUICK = 0xC4CABB1B,
   *   BS_RACCOON = 0x505F8917,
   *   BS_SHEEP = 0x6827CCCF,
   *   BS_SNAKE = 0x82BEBC4B,
   *   BS_TIMID = 0x431AEF77,
   *   BS_WOLF = 0xA8F023D4
   * };
   *
   * @param {number} ped
   * @param {number} brawlingStyle
   * @return {void}
   */
declare function SetPedBrawlingStyle(ped: Ped, brawlingStyle: Hash): void;

/**
   * _SET_PED_CAN_BE_LASSOED
   * SET_PED_CAN_*
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedCanBeLassoed(ped: Ped, toggle: boolean): void;

/**
   * SET_PED_CAN_BODY_RECOIL_IK
   *
   * @param {number} pedIndex
   * @param {boolean} bEnableIk
   * @return {void}
   */
declare function SetPedCanBodyRecoilIk(PedIndex: Ped, bEnableIK: boolean): void;

/**
   * _SET_PED_COMBAT_ATTRIBUTE_HASH
   * Hashes: GUARD, COMBAT_ANIMAL, LAW, LAW_SHERIFF
   * _SET_PED_COMBAT_A* - _SET_PED_COMBAT_M*
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function SetPedCombatAttributeHash(ped: Ped, p1: Hash): void;

/**
   * _SET_PED_COMBAT_BEHAVIOUR
   *
   * @param {number} ped
   * @param {number} behaviour
   * @return {void}
   */
declare function SetPedCombatBehaviour(ped: Ped, behaviour: Hash): void;

/**
   * _SET_PED_COMBAT_STYLE
   * https://github.com/femga/rdr3_discoveries/tree/master/AI/COMBAT_STYLES
   * Params: p2 is usually 1, sometimes 0 or 2
   * duration in seconds, -1.0 = forever
   *
   * @param {number} ped
   * @param {number} combatStyleHash
   * @param {number} p2
   * @param {number} duration
   * @return {void}
   */
declare function SetPedCombatStyle(ped: Ped, combatStyleHash: Hash, p2: number, duration: number): void;

/**
   * _SET_PED_COMBAT_STYLE_MOD
   * duration in seconds, -1.0 = forever
   *
   * @param {number} ped
   * @param {number} combatStyleModHash
   * @param {number} duration
   * @return {void}
   */
declare function SetPedCombatStyleMod(ped: Ped, combatStyleModHash: Hash, duration: number): void;

/**
   * _SET_PED_CROUCH_MOVEMENT
   *
   * @param {number} ped
   * @param {boolean} state
   * @param {number} p2
   * @param {boolean} immediately
   * @return {void}
   */
declare function SetPedCrouchMovement(ped: Ped, state: boolean, p2: number, immediately: boolean): void;

/**
   * _SET_PED_CULL_RANGE
   * The higher the multiplier the less the engine renders culls (https://docs.unity3d.com/Manual/OcclusionCulling.html)
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} p2
   * @return {void}
   */
declare function SetPedCullRange(ped: Ped, p1: number, p2: number): void;

/**
   * _SET_PED_DAMAGED
   *
   * @param {number} ped
   * @param {boolean} damaged
   * @return {void}
   */
declare function SetPedDamaged(ped: Ped, damaged: boolean): void;

/**
   * _SET_PED_DAMAGE_CLEANLINESS
   * damageCleanliness: see _GET_PED_DAMAGE_CLEANLINESS
   *
   * @param {number} ped
   * @param {number} damageCleanliness
   * @return {void}
   */
declare function SetPedDamageCleanliness(ped: Ped, damageCleanliness: number): void;

/**
   * _SET_PED_DEFENSIVE_AREA_TO_ANGLED_AREA
   * _SET_PED_(A?)*
   *
   * @param {number} ped
   * @param {number} x1
   * @param {number} y1
   * @param {number} z1
   * @param {number} x2
   * @param {number} y2
   * @param {number} z2
   * @param {any} p7
   * @param {boolean} p8
   * @param {boolean} p9
   * @param {number} entity
   * @param {boolean} p11
   * @return {void}
   */
declare function SetPedDefensiveAreaToAngledArea(ped: Ped, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, p7: any, p8: boolean, p9: boolean, entity: Entity, p11: boolean): void;

/**
   * _SET_PED_DEFENSIVE_SPHERE_ATTACHED_TO_ENTITY
   *
   * @param {number} ped
   * @param {number} entity
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @param {number} p6
   * @param {boolean} p7
   * @return {void}
   */
declare function SetPedDefensiveSphereAttachedToEntity(ped: Ped, entity: Entity, x: number, y: number, z: number, radius: number, p6: number, p7: boolean): void;

/**
   * _SET_PED_DESIRED_LOCO_FOR_MODEL
   * Seems to set the ped's loco type.
   * Values used in the scripts:
   * algie
   * angry_female
   * arthur_healthy
   * cowboy
   * cowboy_f
   * default
   * default_female
   * free_slave_01
   * free_slave_02
   * gold_panner
   * guard_lantern
   * injured_general
   * john_marston
   * lilly_millet
   * lone_prisoner
   * lost_man
   * mp_ova_hunter
   * mp_ova_hunter_female
   * murfree
   * old_female
   * primate
   * rally
   * waiter
   * war_veteran
   *
   * @param {number} ped
   * @param {string | number} locomotionArchetype
   * @return {void}
   */
declare function SetPedDesiredLocoForModel(ped: Ped, locomotionArchetype: string | number): void;

/**
   * _SET_PED_DESIRED_LOCO_MOTION_TYPE
   * Sets peds motion type
   *
   * @param {number} ped
   * @param {string | number} locoMotionType
   * @return {void}
   */
declare function SetPedDesiredLocoMotionType(ped: Ped, locoMotionType: string | number): void;

/**
   * _SET_PED_DIRT_CLEANED
   * Params: ped, 0f, -1, true, true in R* MP Scripts
   * _SET_PED_DE* - _SET_PED_F*
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} p2
   * @param {boolean} p3
   * @param {boolean} p4
   * @return {void}
   */
declare function SetPedDirtCleaned(ped: Ped, p1: number, p2: number, p3: boolean, p4: boolean): void;

/**
   * _SET_PED_DISABLE_KICK_MOVE
   * Disables being able to kick move ped.
   *
   * @param {number} ped
   * @param {boolean} disable
   * @return {void}
   */
declare function SetPedDisableKickMove(ped: Ped, disable: boolean): void;

/**
   * _SET_PED_DRUNKNESS
   * SOBER = 0.0f, SLIGHTLY_DRUNK = 0.25f, MODERATELY_DRUNK = 0.5f, VERY_DRUNK = 1.0f
   *
   * @param {number} ped
   * @param {boolean} enabled
   * @param {number} drunknessLevel
   * @return {void}
   */
declare function SetPedDrunkness(ped: Ped, enabled: boolean, drunknessLevel: number): void;

/**
   * _SET_PED_FIRING_PATTERN_2
   * Used in R* MP Script fm_mission_controller and various R* SP Scripts for ambush*
   *
   * @param {number} ped
   * @param {number} patternHash
   * @return {void}
   */
declare function SetPedFiringPattern_2(ped: Ped, patternHash: Hash): void;

/**
   * _SET_PED_FIRING_PATTERN_3
   * Only used in R* MP Script fm_mission_controller
   *
   * @param {number} ped
   * @param {number} patternHash
   * @return {void}
   */
declare function SetPedFiringPattern_3(ped: Ped, patternHash: Hash): void;

/**
   * _SET_PED_FORMATION_POSITION
   *
   * @param {number} ped
   * @param {number} position
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedFormationPosition(ped: Ped, position: number, toggle: boolean): void;

/**
   * _SET_PED_GETUP_ANIMATION
   *
   * @param {number} ped
   * @param {string | number} animName
   * @param {boolean} p2
   * @return {void}
   */
declare function SetPedGetupAnimation(ped: Ped, animName: string | number, p2: boolean): void;

/**
   * _SET_PED_GRAPPLE_ACTION
   *
   * @param {number} ped
   * @param {number} grappleAction
   * @return {void}
   */
declare function SetPedGrappleAction(ped: Ped, grappleAction: Hash): void;

/**
   * _SET_PED_GRAPPLE_ANIMATION
   *
   * @param {number} ped
   * @param {number} grappleAnim
   * @return {void}
   */
declare function SetPedGrappleAnimation(ped: Ped, grappleAnim: Hash): void;

/**
   * _SET_PED_GRAPPLE_EFFECT_MULTIPLIER
   *
   * @param {number} ped
   * @param {number} multiplier
   * @return {any}
   */
declare function SetPedGrappleEffectMultiplier(ped: Ped, multiplier: number): any;

/**
   * _SET_PED_GRAPPLE_FLAG
   *
   * @param {number} ped
   * @param {number} flag
   * @param {boolean} enable
   * @return {void}
   */
declare function SetPedGrappleFlag(ped: Ped, flag: number, enable: boolean): void;

/**
   * _SET_PED_GRAPPLE_SEQUENCE
   *
   * @param {number} ped
   * @param {string | number} grappleSequence
   * @return {void}
   */
declare function SetPedGrappleSequence(ped: Ped, grappleSequence: string | number): void;

/**
   * _SET_PED_GRAPPLE_STYLE
   * Hashes: GS_DRAGGING, GS_FACE_TO_BACK, GS_FACE_TO_FACE, GS_FACE_TO_FACE_WALL, GS_MOUNTED
   *
   * @param {number} ped
   * @param {number} style
   * @return {any}
   */
declare function SetPedGrappleStyle(ped: Ped, style: Hash): any;

/**
   * _SET_PED_HEADSHOT_DAMAGE_MULTIPLIER
   *
   * @param {number} ped
   * @param {number} multiplier
   * @return {void}
   */
declare function SetPedHeadshotDamageMultiplier(ped: Ped, multiplier: number): void;

/**
   * _SET_PED_HEALTH_CONFIG
   * configHash: see pedhealth.meta
   *
   * @param {number} ped
   * @param {number} configHash
   * @return {void}
   */
declare function SetPedHealthConfig(ped: Ped, configHash: Hash): void;

/**
   * _SET_PED_IMMERSION_FLAG
   * Only used in R* Script beat_sharp_shooter
   * Blocks ped from swimming underwater
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedImmersionFlag(ped: Ped, toggle: boolean): void;

/**
   * _SET_PED_INCAPACITATION_FLAGS
   *
   * @param {number} ped
   * @param {number} flags
   * @return {void}
   */
declare function SetPedIncapacitationFlags(ped: Ped, flags: number): void;

/**
   * _SET_PED_INCAPACITATION_MODIFIERS
   *
   * @param {number} ped
   * @param {boolean} canBeIncapacitated
   * @param {number} threshold
   * @param {number} bleedoutTime
   * @param {number} p4
   * @return {void}
   */
declare function SetPedIncapacitationModifiers(ped: Ped, canBeIncapacitated: boolean, threshold: number, bleedoutTime: number, p4: number): void;

/**
   * _SET_PED_INCAPACITATION_TOTAL_BLEED_OUT_DURATION
   *
   * @param {number} ped
   * @param {number} duration
   * @return {void}
   */
declare function SetPedIncapacitationTotalBleedOutDuration(ped: Ped, duration: number): void;

/**
   * _SET_PED_INTERACTION_NEGATIVE_RESPONSE
   *
   * @param {number} ped
   * @param {string | number} speech
   * @return {void}
   */
declare function SetPedInteractionNegativeResponse(ped: Ped, speech: string | number): void;

/**
   * _SET_PED_INTERACTION_PERSONALITY
   * personality (script_mp_rel): NONE, AGGRESSIVE, TIMID (non-aggressive), CRIPPS, SCRIPTEDINTIMIDATION, MAGGIE, MARCEL, SCRIPTEDSALOON
   * personality (script_rel): AVOID, SCRIPTEDOUTLAW, TIMIDGUARDDOG, SCRIPTEDTIMIDROB, AGGRESSIVECAMPER, LAZYDOG, KIERANTIEDUP, SCRIPTEDGALA
   *
   * @param {number} ped
   * @param {number} personality
   * @return {void}
   */
declare function SetPedInteractionPersonality(ped: Ped, personality: Hash): void;

/**
   * _SET_PED_INTERACTION_POSITIVE_RESPONSE
   *
   * @param {number} ped
   * @param {string | number} speech
   * @return {void}
   */
declare function SetPedInteractionPositiveResponse(ped: Ped, speech: string | number): void;

/**
   * _SET_PED_KNOCKED_BY_ONE_HIT
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function SetPedKnockedByOneHit(ped: Ped, p1: number): void;

/**
   * _SET_PED_LADDER_MOVEMENT_SPEED_MODIFIER
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function SetPedLadderMovementSpeedModifier(ped: Ped, p1: number): void;

/**
   * _SET_PED_LIGHTS
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedLights(ped: Ped, toggle: boolean): void;

/**
   * _SET_PED_MOTIVATION
   * enum eMotivationState
   * {
   *   TOILET_STATE,
   *   FEAR_STATE,
   *   ANGRY_STATE,
   *   AGITATION_STATE,
   *   HUNGRY_STATE,
   *   TIRED_STATE,
   *   SAD_STATE,
   *   BRAVE_STATE,
   *   OFFER_ITEM_STATE,
   *   SUSPICION,
   *   DRUNK_STATE
   * };
   * 
   * If targetPed is set to 0 the ped motivationState affects everyone
   *
   * @param {number} ped
   * @param {number} motivationState
   * @param {number} threshold
   * @param {number} targetPed
   * @return {void}
   */
declare function SetPedMotivation(ped: Ped, motivationState: number, threshold: number, targetPed: Ped): void;

/**
   * _SET_PED_MOTIVATION_MODIFIER
   * The higher the modifier, the slower the motivationState value will decrease
   *
   * @param {number} ped
   * @param {number} motivationState
   * @param {number} modifier
   * @return {void}
   */
declare function SetPedMotivationModifier(ped: Ped, motivationState: number, modifier: number): void;

/**
   * _SET_PED_MOTIVATION_STATE_OVERRIDE
   * motivationState: see _SET_PED_MOTIVATION
   *
   * @param {number} ped
   * @param {number} motivationState
   * @param {boolean} enabled
   * @return {void}
   */
declare function SetPedMotivationStateOverride(ped: Ped, motivationState: number, enabled: boolean): void;

/**
   * _SET_PED_PERSONALITY
   * Hashes: STANDARD_PED_AGRO_GUARD, BOUNTY_HUNTER, PLAYER_HORSE, LAW_POLICE, GUARD_DOG, ATTACK_DOG
   * Personalities can also be found in common:/data/ai/interactionpersonalities
   *
   * @param {number} ped
   * @param {number} personality
   * @return {void}
   */
declare function SetPedPersonality(ped: Ped, personality: Hash): void;

/**
   * _SET_PED_PROMPT_NAME
   *
   * @param {number} ped
   * @param {string | number} name
   * @return {void}
   */
declare function SetPedPromptName(ped: Ped, name: string | number): void;

/**
   * _SET_PED_PROMPT_NAME_2
   *
   * @param {number} ped
   * @param {string | number} name
   * @return {void}
   */
declare function SetPedPromptName_2(ped: Ped, name: string | number): void;

/**
   * _SET_PED_PROMPT_NAME_FROM_GXT_ENTRY
   *
   * @param {number} ped
   * @param {number} gxtEntryHash
   * @return {void}
   */
declare function SetPedPromptNameFromGxtEntry(ped: Ped, gxtEntryHash: Hash): void;

/**
   * _SET_PED_PROMPT_NAME_FROM_GXT_ENTRY_2
   *
   * @param {number} ped
   * @param {number} gxtEntryHash
   * @return {void}
   */
declare function SetPedPromptNameFromGxtEntry_2(ped: Ped, gxtEntryHash: Hash): void;

/**
   * _SET_PED_QUALITY
   * quality: see _GET_PED_QUALITY
   *
   * @param {number} ped
   * @param {number} quality
   * @return {void}
   */
declare function SetPedQuality(ped: Ped, quality: number): void;

/**
   * _SET_PED_SCALE
   *
   * @param {number} ped
   * @param {number} scale
   * @return {void}
   */
declare function SetPedScale(ped: Ped, scale: number): void;

/**
   * _SET_PED_SCENT
   * 0.0 - 1.0
   * Modifies the "scent line" on the ped's body when using Eagle Eye.
   *
   * @param {number} ped
   * @param {number} scent
   * @return {void}
   */
declare function SetPedScent(ped: Ped, scent: number): void;

/**
   * _SET_PED_TARGET_ACTION_DISABLE_FLAG
   *
   * @param {number} ped
   * @param {number} actionDisableFlag
   * @return {void}
   */
declare function SetPedTargetActionDisableFlag(ped: Ped, actionDisableFlag: number): void;

/**
   * _SET_PED_TO_BE_REMOVED
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {any} p4
   * @return {void}
   */
declare function SetPedToBeRemoved(ped: Ped, p1: number, p2: number, p3: number, p4: any): void;

/**
   * _SET_PED_TO_DISABLE_RAGDOLL
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedToDisableRagdoll(ped: Ped, toggle: boolean): void;

/**
   * _SET_PED_TRAIL_EFFECT
   * duration in seconds
   *
   * @param {number} ped
   * @param {boolean} p1
   * @param {number} duration
   * @return {void}
   */
declare function SetPedTrailEffect(ped: Ped, p1: boolean, duration: number): void;

/**
   * _SET_PED_USE_HORSE_MAP_COLLISION
   * Doesn't actually return anything.
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {any}
   */
declare function SetPedUseHorseMapCollision(ped: Ped, toggle: boolean): any;

/**
   * _SET_PED_VOICE_VOLUME
   * _SET_PED_S* - _SET_PED_T*
   *
   * @param {number} ped
   * @param {number} volume
   * @return {void}
   */
declare function SetPedVoiceVolume(ped: Ped, volume: number): void;

/**
   * _SET_PED_WRITHING_DURATION
   *
   * @param {number} ped
   * @param {number} writhingDuration1
   * @param {number} writhingDuration2
   * @param {number} p3
   * @return {void}
   */
declare function SetPedWrithingDuration(ped: Ped, writhingDuration1: number, writhingDuration2: number, p3: number): void;

/**
   * _SET_PELT_FOR_HORSE
   *
   * @param {number} horse
   * @param {number} peltId
   * @return {void}
   */
declare function SetPeltForHorse(horse: Ped, peltId: number): void;

/**
   * _SET_PLAYER_ANTAGONIZE_DISABLED_FOR_PED
   *
   * @param {number} ped
   * @param {number} player
   * @param {number} duration
   * @return {void}
   */
declare function SetPlayerAntagonizeDisabledForPed(ped: Ped, player: Player, duration: number): void;

/**
   * _SET_PLAYER_CURRENT_ANIMAL_DAMAGE_MODIFIER
   * Animal Skin Quality Modifier
   * Params: p2 = 2, p3 = 3 in R* Scripts
   *
   * @param {number} player
   * @param {number} modifier
   * @param {number} p2
   * @param {number} p3
   * @return {any}
   */
declare function SetPlayerCurrentAnimalDamageModifier(player: Player, modifier: number, p2: number, p3: number): any;

/**
   * _SET_PLAYER_GREET_DISABLED_FOR_PED
   *
   * @param {number} ped
   * @param {number} player
   * @param {number} duration
   * @return {void}
   */
declare function SetPlayerGreetDisabledForPed(ped: Ped, player: Player, duration: number): void;

/**
   * _SET_RANDOM_OUTFIT_VARIATION
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {void}
   */
declare function SetRandomOutfitVariation(ped: Ped, p1: boolean): void;

/**
   * _SET_REMOVE_PED_NETWORKED
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function SetRemovePedNetworked(ped: Ped, p1: number): void;

/**
   * _SET_SCENARIO_ANIMAL_DENSITY_MULTIPLIER_THIS_FRAME
   *
   * @param {number} multiplier
   * @return {void}
   */
declare function SetScenarioAnimalDensityMultiplierThisFrame(multiplier: number): void;

/**
   * _SET_SCENARIO_HUMAN_DENSITY_MULTIPLIER_THIS_FRAME
   *
   * @param {number} multiplier
   * @return {void}
   */
declare function SetScenarioHumanDensityMultiplierThisFrame(multiplier: number): void;

/**
   * _SET_SCENARIO_PED_DENSITY_THIS_FRAME
   * Sets the scenario ped density to the given config.
   * 
   * Valid configs:
   * - BLACKWATER
   * - DEFAULT
   * - NEWBORDEAUX
   * - RHODES
   * - STRAWBERRY
   * - TUMBLEWEED
   * - VALENTINE
   * - VANHORN
   * 
   * See common/data/ai/densityscoringconfigs.meta for more information.
   *
   * @param {number} configHash
   * @return {void}
   */
declare function SetScenarioPedDensityThisFrame(configHash: Hash): void;

/**
   * _SET_SCENARIO_PED_RANGE_MULTIPLIER_THIS_FRAME
   *
   * @param {number} multiplier
   * @return {void}
   */
declare function SetScenarioPedRangeMultiplierThisFrame(multiplier: number): void;

/**
   * _SET_STAMINA_DEPLETION_MULTIPLIER
   *
   * @param {number} ped
   * @param {number} multiplier
   * @return {void}
   */
declare function SetStaminaDepletionMultiplier(ped: Ped, multiplier: number): void;

/**
   * _SET_STAMINA_RECHARGE_MULTIPLIER
   *
   * @param {number} ped
   * @param {number} multiplier
   * @return {void}
   */
declare function SetStaminaRechargeMultiplier(ped: Ped, multiplier: number): void;

/**
   * _SET_TANK_ATTRIBUTE_SIZE
   * Size will be permanent
   *
   * @param {number} ped
   * @param {number} attributeIndex
   * @param {number} size
   * @return {void}
   */
declare function SetTankAttributeSize(ped: Ped, attributeIndex: number, size: number): void;

/**
   * _SET_TEXTURE_LAYER_ALPHA
   *
   * @param {number} textureId
   * @param {number} layerId
   * @param {number} texAlpha
   * @return {void}
   */
declare function SetTextureLayerAlpha(textureId: number, layerId: number, texAlpha: number): void;

/**
   * _SET_TEXTURE_LAYER_MOD
   *
   * @param {number} textureId
   * @param {number} layerId
   * @param {number} modTextureHash
   * @param {number} modAlpha
   * @param {number} modChannel
   * @return {void}
   */
declare function SetTextureLayerMod(textureId: number, layerId: number, modTextureHash: Hash, modAlpha: number, modChannel: number): void;

/**
   * _SET_TEXTURE_LAYER_PALLETE
   * paletteHash: https://raw.githubusercontent.com/femga/rdr3_discoveries/master/clothes/cloth_color_palletes.lua
   *
   * @param {number} textureId
   * @param {number} layerId
   * @param {number} paletteHash
   * @return {void}
   */
declare function SetTextureLayerPallete(textureId: number, layerId: number, paletteHash: Hash): void;

/**
   * _SET_TEXTURE_LAYER_ROUGHNESS
   *
   * @param {number} textureId
   * @param {number} layerId
   * @param {number} texRough
   * @return {void}
   */
declare function SetTextureLayerRoughness(textureId: number, layerId: number, texRough: number): void;

/**
   * _SET_TEXTURE_LAYER_SHEET_GRID_INDEX
   *
   * @param {number} textureId
   * @param {number} layerId
   * @param {number} sheetGridIndex
   * @return {void}
   */
declare function SetTextureLayerSheetGridIndex(textureId: number, layerId: number, sheetGridIndex: number): void;

/**
   * _SET_TEXTURE_LAYER_TEXTURE_MAP
   *
   * @param {number} textureId
   * @param {number} layerId
   * @param {number} albedoHash
   * @param {number} normalHash
   * @param {number} materialHash
   * @return {void}
   */
declare function SetTextureLayerTextureMap(textureId: number, layerId: number, albedoHash: Hash, normalHash: Hash, materialHash: Hash): void;

/**
   * _SET_TEXTURE_LAYER_TINT
   * Seem color is not RGB or HSV
   *
   * @param {number} textureId
   * @param {number} layerId
   * @param {number} tint0
   * @param {number} tint1
   * @param {number} tint2
   * @return {void}
   */
declare function SetTextureLayerTint(textureId: number, layerId: number, tint0: number, tint1: number, tint2: number): void;

/**
   * _SET_TEXTURE_OUTFIT_TINTS
   * Used in script function METAPED_CLOTHING__XML__APPLY_OUTFIT_TINTS_TO_PED
   *
   * @param {number} ped
   * @param {number} componentCategory
   * @param {number} palette
   * @param {number} tint0
   * @param {number} tint1
   * @param {number} tint2
   * @return {void}
   */
declare function SetTextureOutfitTints(ped: Ped, componentCategory: Hash, palette: Hash, tint0: number, tint1: number, tint2: number): void;

/**
   * _SET_TOTAL_PED_DAMAGE_FALLOFF_BONUS
   * _SET_W(EAPON?)*
   *
   * @param {number} ped
   * @param {number} bonus
   * @return {void}
   */
declare function SetTotalPedDamageFalloffBonus(ped: Ped, bonus: number): void;

/**
   * _SET_TOTAL_PED_DAMAGE_FROM_AI
   * _SET_W(EAPON?)*
   *
   * @param {number} ped
   * @param {number} totalDamage
   * @return {void}
   */
declare function SetTotalPedDamageFromAi(ped: Ped, totalDamage: number): void;

/**
   * _SHOOT_TRIGGER_AT_COORDS
   * Triggers a gunshot
   * Params: p5 = -1 in R* Scripts
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} p4
   * @param {number} p5
   * @param {number} p6
   * @param {number} p7
   * @return {any}
   */
declare function ShootTriggerAtCoords(ped: Ped, x: number, y: number, z: number, p4: number, p5: number, p6: number, p7: number): any;

/**
   * _SPAWNPOINTS_START_SEARCH_WITH_VOLUME
   *
   * @param {number} volume
   * @param {number} spawnpointsFlag
   * @param {number} p2
   * @param {number} duration
   * @param {number} p4
   * @return {void}
   */
declare function SpawnpointsStartSearchWithVolume(volume: Volume, spawnpointsFlag: number, p2: number, duration: number, p4: number): void;

/**
   * _UNRESERVE_AMBIENT_PEDS
   *
   * @param {number} numPeds
   * @return {void}
   */
declare function UnreserveAmbientPeds(numPeds: number): void;

/**
   * _UPDATE_ANIMAL_DAMAGE_MODIFIER
   *
   * @param {number} player
   * @return {void}
   */
declare function UpdateAnimalDamageModifier(player: Player): void;

/**
   * _UPDATE_PED_TEXTURE
   * Should be called at least once for any new texture override.
   * Otherwise component textures will be just black.
   * Also needs to be called for updating any ped overlays to apply the changes.
   *
   * @param {number} textureId
   * @return {void}
   */
declare function UpdatePedTexture(textureId: number): void;

/**
   * _UPDATE_PED_VARIATION
   * Update variation on ped, needed after first creation, or when component or texture/overlay is changed
   *
   * @param {number} ped
   * @param {boolean} p1
   * @param {boolean} p2
   * @param {boolean} p3
   * @param {boolean} p4
   * @param {boolean} p5
   * @return {void}
   */
declare function UpdatePedVariation(ped: Ped, p1: boolean, p2: boolean, p3: boolean, p4: boolean, p5: boolean): void;

/**
   * _UPDATE_PED_WOUND_EFFECT
   * Params: 0.0f to remove wound effects
   *
   * @param {number} ped
   * @param {number} value
   * @return {void}
   */
declare function UpdatePedWoundEffect(ped: Ped, value: number): void;

/**
   * _UPDATE_SHOP_ITEM_WEARABLE_STATE
   *
   * @param {number} ped
   * @param {number} componentHash
   * @param {number} wearableState
   * @param {number} p3
   * @param {boolean} p4
   * @param {number} p5
   * @return {void}
   */
declare function UpdateShopItemWearableState(ped: Ped, componentHash: Hash, wearableState: Hash, p3: number, p4: boolean, p5: number): void;

/**
   * _WARP_PED_OUT_OF_VEHICLE
   *
   * @param {number} ped
   * @return {void}
   */
declare function WarpPedOutOfVehicle(ped: Ped): void;