/**
   * ADD_COVER_BLOCKING_AREA
   *
   * @param {number} playerX
   * @param {number} playerY
   * @param {number} playerZ
   * @param {number} radiusX
   * @param {number} radiusY
   * @param {number} radiusZ
   * @param {boolean} p6
   * @param {boolean} p7
   * @param {boolean} p8
   * @param {boolean} p9
   * @return {void}
   */
declare function AddCoverBlockingArea(playerX: number, playerY: number, playerZ: number, radiusX: number, radiusY: number, radiusZ: number, p6: boolean, p7: boolean, p8: boolean, p9: boolean): void;

/**
   * ADD_COVER_POINT
   *
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @param {boolean} p7
   * @return {number}
   */
declare function AddCoverPoint(p0: number, p1: number, p2: number, p3: number, p4: any, p5: any, p6: any, p7: boolean): ScrHandle;

/**
   * ADD_FLEE_TARGET_PED
   * Params: p2 is always -1.f in R* Scripts
   *
   * @param {number} ped
   * @param {number} targetPed
   * @param {number} p2
   * @return {void}
   */
declare function AddFleeTargetPed(ped: Ped, targetPed: Ped, p2: number): void;

/**
   * ADD_PATROL_ROUTE_LINK
   *
   * @param {number} node1
   * @param {number} node2
   * @return {void}
   */
declare function AddPatrolRouteLink(node1: number, node2: number): void;

/**
   * ADD_PATROL_ROUTE_NODE
   *
   * @param {number} nodeId
   * @param {string | number} scenarioName
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} lookPosX
   * @param {number} lookPosY
   * @param {number} lookPosZ
   * @param {number} duration
   * @param {boolean} p9
   * @return {void}
   */
declare function AddPatrolRouteNode(nodeId: number, scenarioName: string | number, x: number, y: number, z: number, lookPosX: number, lookPosY: number, lookPosZ: number, duration: number, p9: boolean): void;

/**
   * ARE_COMPOSITE_LOOTABLE_ENTITY_DEF_ASSETS_LOADED
   * Returns true when requested asset is loaded
   *
   * @param {number} asset
   * @return {boolean}
   */
declare function AreCompositeLootableEntityDefAssetsLoaded(asset: Hash): boolean;

/**
   * ASSISTED_MOVEMENT_IS_ROUTE_LOADED
   *
   * @param {string | number} route
   * @return {boolean}
   */
declare function AssistedMovementIsRouteLoaded(route: string | number): boolean;

/**
   * ASSISTED_MOVEMENT_REMOVE_ROUTE
   *
   * @param {string | number} route
   * @return {void}
   */
declare function AssistedMovementRemoveRoute(route: string | number): void;

/**
   * ASSISTED_MOVEMENT_SET_ROUTE_PROPERTIES
   *
   * @param {string | number} route
   * @param {number} props
   * @return {void}
   */
declare function AssistedMovementSetRouteProperties(route: string | number, props: number): void;

/**
   * CAN_START_ITEM_INTERACTION
   *
   * @param {number} ped
   * @param {number} itemHash
   * @param {number} interactionAnimHash
   * @param {number} p3
   * @return {boolean}
   */
declare function CanStartItemInteraction(ped: Ped, itemHash: Hash, interactionAnimHash: Hash, p3: number): boolean;

/**
   * CLEAR_DRIVEBY_TASK_UNDERNEATH_DRIVING_TASK
   *
   * @param {number} ped
   * @return {void}
   */
declare function ClearDrivebyTaskUnderneathDrivingTask(ped: Ped): void;

/**
   * CLEAR_PED_SECONDARY_TASK
   *
   * @param {number} ped
   * @return {void}
   */
declare function ClearPedSecondaryTask(ped: Ped): void;

/**
   * CLEAR_PED_TASKS
   *
   * @param {number} ped
   * @param {boolean} p1
   * @param {boolean} p2
   * @return {void}
   */
declare function ClearPedTasks(ped: Ped, p1: boolean, p2: boolean): void;

/**
   * CLEAR_PED_TASKS_IMMEDIATELY
   * Immediately stops the pedestrian from whatever it's doing. They stop fighting, animations, etc. they forget what they were doing.
   * 
   * resetCrouch TRUE = ped will stand up if crouching, FALSE = ped will remain crouching if crouched
   *
   * @param {number} ped
   * @param {boolean} p1
   * @param {boolean} resetCrouch
   * @return {void}
   */
declare function ClearPedTasksImmediately(ped: Ped, p1: boolean, resetCrouch: boolean): void;

/**
   * CLEAR_SEQUENCE_TASK
   *
  
   * @return {number}
   */
declare function ClearSequenceTask(): number;

/**
   * CLOSE_PATROL_ROUTE
   *
  
   * @return {void}
   */
declare function ClosePatrolRoute(): void;

/**
   * CLOSE_SEQUENCE_TASK
   *
   * @param {number} taskSequenceId
   * @return {void}
   */
declare function CloseSequenceTask(taskSequenceId: number): void;

/**
   * CREATE_PATROL_ROUTE
   *
  
   * @return {void}
   */
declare function CreatePatrolRoute(): void;

/**
   * CREATE_SCENARIO_POINT_HASH
   * Returns scenario
   *
   * @param {number} scenarioHash
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} heading
   * @param {any} p5
   * @param {any} p6
   * @param {boolean} p7
   * @return {number}
   */
declare function CreateScenarioPointHash(scenarioHash: Hash, x: number, y: number, z: number, heading: number, p5: any, p6: any, p7: boolean): number;

/**
   * CREATE_SCENARIO_POINT_HASH_ATTACHED_TO_ENTITY
   * Returns scenario
   *
   * @param {number} entity
   * @param {number} scenarioHash
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} heading
   * @param {any} p6
   * @param {any} p7
   * @param {boolean} p8
   * @return {number}
   */
declare function CreateScenarioPointHashAttachedToEntity(entity: Entity, scenarioHash: Hash, x: number, y: number, z: number, heading: number, p6: any, p7: any, p8: boolean): number;

/**
   * DELETE_PATROL_ROUTE
   *
   * @param {string | number} patrolRoute
   * @return {void}
   */
declare function DeletePatrolRoute(patrolRoute: string | number): void;

/**
   * DOES_SCENARIO_EXIST_IN_AREA
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @param {boolean} p4
   * @param {any} p5
   * @param {boolean} p6
   * @return {boolean}
   */
declare function DoesScenarioExistInArea(x: number, y: number, z: number, radius: number, p4: boolean, p5: any, p6: boolean): boolean;

/**
   * DOES_SCENARIO_GROUP_EXIST
   *
   * @param {string | number} scenarioGroup
   * @return {boolean}
   */
declare function DoesScenarioGroupExist(scenarioGroup: string | number): boolean;

/**
   * DOES_SCENARIO_OF_TYPE_EXIST_IN_AREA_HASH
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} typeHash
   * @param {number} radius
   * @param {boolean} p5
   * @return {boolean}
   */
declare function DoesScenarioOfTypeExistInAreaHash(x: number, y: number, z: number, typeHash: Hash, radius: number, p5: boolean): boolean;

/**
   * DOES_SCENARIO_POINT_EXIST
   *
   * @param {number} scenario
   * @return {boolean}
   */
declare function DoesScenarioPointExist(scenario: number): boolean;

/**
   * DOES_SCRIPTED_COVER_POINT_EXIST_AT_COORDS
   * Checks if there is a cover point at position
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {boolean}
   */
declare function DoesScriptedCoverPointExistAtCoords(p0: any, p1: any, p2: any, p3: any): boolean;

/**
   * END_DUEL
   *
   * @param {number} ped
   * @param {boolean} p1
   * @param {number} p2
   * @return {void}
   */
declare function EndDuel(ped: Ped, p1: boolean, p2: number): void;

/**
   * FIND_SCENARIO_OF_TYPE_HASH
   *
   * @param {number} xPos
   * @param {number} yPos
   * @param {number} zPos
   * @param {number} scenarioType
   * @param {number} distance
   * @param {any} p5
   * @param {boolean} p6
   * @return {number}
   */
declare function FindScenarioOfTypeHash(xPos: number, yPos: number, zPos: number, scenarioType: Hash, distance: number, p5: any, p6: boolean): number;

/**
   * FORCE_SCENARIO_GROUP_PRIORITY
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function ForceScenarioGroupPriority(p0: any, p1: any): void;

/**
   * GET_ACTIVE_VEHICLE_MISSION_TYPE
   *
   * @param {number} vehicle
   * @return {number}
   */
declare function GetActiveVehicleMissionType(vehicle: Vehicle): number;

/**
   * GET_IS_CARRIABLE_ENTITY
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function GetIsCarriableEntity(entity: Entity): boolean;

/**
   * GET_IS_PED_AIMING_IN_THE_AIR
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function GetIsPedAimingInTheAir(ped: Ped): boolean;

/**
   * GET_IS_TASK_ACTIVE
   *
   * @param {number} ped
   * @param {number} taskIndex
   * @return {boolean}
   */
declare function GetIsTaskActive(ped: Ped, taskIndex: number): boolean;

/**
   * GET_IS_WAYPOINT_RECORDING_LOADED
   *
   * @param {string | number} waypointRecording
   * @return {boolean}
   */
declare function GetIsWaypointRecordingLoaded(waypointRecording: string | number): boolean;

/**
   * GET_ITEM_INTERACTION_ITEM_ID
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetItemInteractionItemId(ped: Ped): number;

/**
   * GET_ITEM_INTERACTION_PROMPT_PROGRESS
   *
   * @param {number} ped
   * @param {number} inputContext
   * @return {number}
   */
declare function GetItemInteractionPromptProgress(ped: Ped, inputContext: Hash): number;

/**
   * GET_ITEM_INTERACTION_STATE
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetItemInteractionState(ped: Ped): number;

/**
   * GET_PED_DESIRED_MOVE_BLEND_RATIO
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedDesiredMoveBlendRatio(ped: Ped): number;

/**
   * GET_PED_WAYPOINT_DISTANCE
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedWaypointDistance(ped: Ped): number;

/**
   * GET_PED_WAYPOINT_OVERRIDE_SPEED
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedWaypointOverrideSpeed(ped: Ped): number;

/**
   * GET_PED_WAYPOINT_PROGRESS
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetPedWaypointProgress(ped: Ped): number;

/**
   * GET_PROP_FOR_SCENARIO_POINT
   * Old name: _GET_SCENARIO_POINT_ENTITY
   *
   * @param {number} scenarioPoint
   * @param {string | number} name
   * @return {number}
   */
declare function GetPropForScenarioPoint(scenarioPoint: number, name: string | number): Entity;

/**
   * GET_RANSACK_SCENARIO_POINT_PED_IS_USING
   *
   * @param {number} ped
   * @return {any}
   */
declare function GetRansackScenarioPointPedIsUsing(ped: Ped): any;

/**
   * GET_SCENARIO_POINTS_IN_AREA
   * Note: scenariosInRadius is an array, and its size and values should be aligned to 8 bytes.
   *
   * @param {number} posX
   * @param {number} posY
   * @param {number} posZ
   * @param {number} radius
   * @param {any} scenariosInRadius
   * @param {number} size
   * @return {number}
   */
declare function GetScenarioPointsInArea(posX: number, posY: number, posZ: number, radius: number, scenariosInRadius: any, size: number): number;

/**
   * GET_SCRIPTED_COVER_POINT_COORDS
   *
   * @param {number} coverpoint
   * @return {Vector3}
   */
declare function GetScriptedCoverPointCoords(coverpoint: ScrHandle): Vector3;

/**
   * GET_SCRIPT_TASK_STATUS
   * Gets the status of a script-assigned task, and returns an int between 0-8
   * taskHash: https://alloc8or.re/rdr3/doc/enums/eScriptTaskHash.txt 
   * 
   * WAITING_TO_START_TASK = 0,
   * PERFORMING_TASK
   * DORMANT_TASK
   * VACANT_STAGE
   * GROUP_TASK_STAGE
   * ATTRACTOR_SCRIPT_TASK_STAGE
   * SECONDARY_TASK_STAGE
   * TASK_NOT_FOUND
   * FINISHED_TASK
   *
   * @param {number} ped
   * @param {number} taskHash
   * @param {boolean} p2
   * @return {number}
   */
declare function GetScriptTaskStatus(ped: Ped, taskHash: Hash, p2: boolean): number;

/**
   * GET_SEQUENCE_PROGRESS
   * returned values:
   * 0 to 7 = task that's currently in progress, 0 meaning the first one.
   * -1 no task sequence in progress.
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetSequenceProgress(ped: Ped): number;

/**
   * GET_TASK_MOVE_NETWORK_EVENT
   *
   * @param {number} ped
   * @param {string | number} eventName
   * @return {boolean}
   */
declare function GetTaskMoveNetworkEvent(ped: Ped, eventName: string | number): boolean;

/**
   * GET_TASK_MOVE_NETWORK_STATE
   *
   * @param {number} ped
   * @return {string | number}
   */
declare function GetTaskMoveNetworkState(ped: Ped): string | number;

/**
   * GET_VEHICLE_WAYPOINT_PLAYBACK_OVERRIDE_SPEED
   *
   * @param {any} p0
   * @return {any}
   */
declare function GetVehicleWaypointPlaybackOverrideSpeed(p0: any): any;

/**
   * GET_VEHICLE_WAYPOINT_PROGRESS
   *
   * @param {number} vehicle
   * @return {number}
   */
declare function GetVehicleWaypointProgress(vehicle: Vehicle): number;

/**
   * GET_VEHICLE_WAYPOINT_TARGET_POINT
   *
   * @param {number} vehicle
   * @return {number}
   */
declare function GetVehicleWaypointTargetPoint(vehicle: Vehicle): number;

/**
   * GET_WAYPOINT_DISTANCE_ALONG_ROUTE
   *
   * @param {string | number} waypointRecording
   * @param {number} p1
   * @return {number}
   */
declare function GetWaypointDistanceAlongRoute(waypointRecording: string | number, p1: number): number;

/**
   * IS_DRIVEBY_TASK_UNDERNEATH_DRIVING_TASK
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsDrivebyTaskUnderneathDrivingTask(ped: Ped): boolean;

/**
   * IS_EMOTE_TASK_RUNNING
   *
   * @param {number} ped
   * @param {any} p1
   * @return {boolean}
   */
declare function IsEmoteTaskRunning(ped: Ped, p1: any): boolean;

/**
   * IS_MOUNTED_WEAPON_TASK_UNDERNEATH_DRIVING_TASK
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsMountedWeaponTaskUnderneathDrivingTask(ped: Ped): boolean;

/**
   * IS_MOVE_BLEND_RATIO_RUNNING
   *
   * @param {number} moveBlendRatio
   * @return {boolean}
   */
declare function IsMoveBlendRatioRunning(moveBlendRatio: number): boolean;

/**
   * IS_MOVE_BLEND_RATIO_SPRINTING
   *
   * @param {number} moveBlendRatio
   * @return {boolean}
   */
declare function IsMoveBlendRatioSprinting(moveBlendRatio: number): boolean;

/**
   * IS_MOVE_BLEND_RATIO_STILL
   *
   * @param {number} moveBlendRatio
   * @return {boolean}
   */
declare function IsMoveBlendRatioStill(moveBlendRatio: number): boolean;

/**
   * IS_MOVE_BLEND_RATIO_WALKING
   *
   * @param {number} moveBlendRatio
   * @return {boolean}
   */
declare function IsMoveBlendRatioWalking(moveBlendRatio: number): boolean;

/**
   * IS_PED_ACTIVE_IN_SCENARIO
   *
   * @param {number} ped
   * @param {number} scenario
   * @return {boolean}
   */
declare function IsPedActiveInScenario(ped: Ped, scenario: number): boolean;

/**
   * IS_PED_BEING_ARRESTED
   * This function is hard-coded to always return false.
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedBeingArrested(ped: Ped): boolean;

/**
   * IS_PED_CUFFED
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedCuffed(ped: Ped): boolean;

/**
   * IS_PED_EXITING_SCENARIO
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {boolean}
   */
declare function IsPedExitingScenario(ped: Ped, p1: boolean): boolean;

/**
   * IS_PED_GETTING_UP
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedGettingUp(ped: Ped): boolean;

/**
   * IS_PED_IN_HIT_REACT
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedInHitReact(ped: Ped): boolean;

/**
   * IS_PED_IN_WRITHE
   * This native checks if a ped is on the ground, in pain from a (gunshot) wound.
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedInWrithe(ped: Ped): boolean;

/**
   * IS_PED_RUNNING
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedRunning(ped: Ped): boolean;

/**
   * IS_PED_RUNNING_INSPECTION_TASK
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedRunningInspectionTask(ped: Ped): boolean;

/**
   * IS_PED_RUNNING_TASK_ITEM_INTERACTION
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedRunningTaskItemInteraction(ped: Ped): boolean;

/**
   * IS_PED_SCENARIO_REACT_LOOKING
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {boolean}
   */
declare function IsPedScenarioReactLooking(ped: Ped, p1: boolean): boolean;

/**
   * IS_PED_SPRINTING
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedSprinting(ped: Ped): boolean;

/**
   * IS_PED_STILL
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedStill(ped: Ped): boolean;

/**
   * IS_PED_WALKING
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedWalking(ped: Ped): boolean;

/**
   * IS_SCENARIO_GROUP_ENABLED
   *
   * @param {string | number} scenarioGroup
   * @return {boolean}
   */
declare function IsScenarioGroupEnabled(scenarioGroup: string | number): boolean;

/**
   * IS_SCENARIO_OCCUPIED
   *
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {boolean} p4
   * @return {boolean}
   */
declare function IsScenarioOccupied(p0: number, p1: number, p2: number, p3: number, p4: boolean): boolean;

/**
   * IS_SCENARIO_TYPE_ENABLED
   *
   * @param {string | number} scenarioType
   * @return {boolean}
   */
declare function IsScenarioTypeEnabled(scenarioType: string | number): boolean;

/**
   * IS_TASK_MOVE_NETWORK_ACTIVE
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsTaskMoveNetworkActive(ped: Ped): boolean;

/**
   * IS_TASK_MOVE_NETWORK_READY_FOR_TRANSITION
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsTaskMoveNetworkReadyForTransition(ped: Ped): boolean;

/**
   * IS_TEAM_CARRIABLE_ENTITY
   *
   * @param {any} p0
   * @param {any} p1
   * @return {boolean}
   */
declare function IsTeamCarriableEntity(p0: any, p1: any): boolean;

/**
   * IS_WAYPOINT_PLAYBACK_GOING_ON_FOR_PED
   *
   * @param {number} ped
   * @param {string | number} waypointRecording
   * @return {boolean}
   */
declare function IsWaypointPlaybackGoingOnForPed(ped: Ped, waypointRecording: string | number): boolean;

/**
   * IS_WAYPOINT_PLAYBACK_GOING_ON_FOR_VEHICLE
   *
   * @param {any} p0
   * @param {any} p1
   * @return {boolean}
   */
declare function IsWaypointPlaybackGoingOnForVehicle(p0: any, p1: any): boolean;

/**
   * MAKE_OBJECT_NOT_CARRIABLE
   *
   * @param {number} object
   * @return {void}
   */
declare function MakeObjectNotCarriable(object: number): void;

/**
   * OPEN_PATROL_ROUTE
   * Note: patrolRoute must be prefixed with 'miss_' for it to be valid
   *
   * @param {string | number} patrolRoute
   * @return {void}
   */
declare function OpenPatrolRoute(patrolRoute: string | number): void;

/**
   * OPEN_SEQUENCE_TASK
   *
  
   * @return {number}
   */
declare function OpenSequenceTask(): number;

/**
   * PED_HAS_USE_SCENARIO_TASK
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function PedHasUseScenarioTask(ped: Ped): boolean;

/**
   * PLAY_ANIM_ON_RUNNING_SCENARIO
   *
   * @param {number} ped
   * @param {string | number} animDict
   * @param {string | number} animName
   * @return {void}
   */
declare function PlayAnimOnRunningScenario(ped: Ped, animDict: string | number, animName: string | number): void;

/**
   * PLAY_ENTITY_SCRIPTED_ANIM
   *
   * @param {number} entity
   * @param {any} args
   * @return {void}
   */
declare function PlayEntityScriptedAnim(entity: Entity, args: any): void;

/**
   * REACT_LOOK_AT
   * lookIntensity: see SET_PED_SHOULD_PLAY_FLEE_SCENARIO_EXIT
   * 
   * exitAnimation: LOOK_RETURN_GENERIC = 1,
   * LOOK_RETURN_DISMISSIVE = 2,
   * LOOK_RETURN_RELIEVED = 3
   *
   * @param {number} ped
   * @param {number} targetPed
   * @param {number} lookIntensity
   * @param {number} exitAnimation
   * @param {number} duration
   * @param {number} p5
   * @param {number} targetPed2
   * @param {any} p7
   * @param {any} p8
   * @return {void}
   */
declare function ReactLookAt(ped: Ped, targetPed: Ped, lookIntensity: number, exitAnimation: number, duration: number, p5: number, targetPed2: Ped, p7: any, p8: any): void;

/**
   * REACT_LOOK_AT_END
   *
   * @param {number} ped
   * @param {number} exitAnimation
   * @param {boolean} p2
   * @return {void}
   */
declare function ReactLookAtEnd(ped: Ped, exitAnimation: number, p2: boolean): void;

/**
   * REMOVE_ALL_COVER_BLOCKING_AREAS
   *
  
   * @return {void}
   */
declare function RemoveAllCoverBlockingAreas(): void;

/**
   * REMOVE_COVER_POINT
   *
   * @param {number} coverpoint
   * @return {void}
   */
declare function RemoveCoverPoint(coverpoint: ScrHandle): void;

/**
   * REMOVE_WAYPOINT_RECORDING
   *
   * @param {string | number} waypointRecording
   * @return {void}
   */
declare function RemoveWaypointRecording(waypointRecording: string | number): void;

/**
   * REQUEST_TASK_MOVE_NETWORK_STATE_TRANSITION
   *
   * @param {number} ped
   * @param {string | number} name
   * @return {void}
   */
declare function RequestTaskMoveNetworkStateTransition(ped: Ped, name: string | number): void;

/**
   * REQUEST_WAYPOINT_RECORDING
   *
   * @param {string | number} waypointRecording
   * @return {void}
   */
declare function RequestWaypointRecording(waypointRecording: string | number): void;

/**
   * RESET_SCENARIO_GROUPS_ENABLED
   *
  
   * @return {void}
   */
declare function ResetScenarioGroupsEnabled(): void;

/**
   * RESET_SCENARIO_TYPES_ENABLED
   *
  
   * @return {void}
   */
declare function ResetScenarioTypesEnabled(): void;

/**
   * SET_ANIM_FILTER
   *
   * @param {number} entity
   * @param {string | number} filterName
   * @param {number} priority
   * @param {boolean} secondary
   * @return {void}
   */
declare function SetAnimFilter(entity: Entity, filterName: string | number, priority: number, secondary: boolean): void;

/**
   * SET_ANIM_RATE
   *
   * @param {any} p0
   * @param {number} p1
   * @param {any} p2
   * @param {boolean} p3
   * @return {void}
   */
declare function SetAnimRate(p0: any, p1: number, p2: any, p3: boolean): void;

/**
   * SET_DRIVEBY_TASK_TARGET
   *
   * @param {number} shootingPed
   * @param {number} targetPed
   * @param {number} targetVehicle
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {void}
   */
declare function SetDrivebyTaskTarget(shootingPed: Ped, targetPed: Ped, targetVehicle: Vehicle, x: number, y: number, z: number): void;

/**
   * SET_DRIVE_TASK_CRUISE_SPEED
   *
   * @param {number} driver
   * @param {number} cruiseSpeed
   * @return {void}
   */
declare function SetDriveTaskCruiseSpeed(driver: Ped, cruiseSpeed: number): void;

/**
   * SET_DRIVE_TASK_MAX_CRUISE_SPEED
   * Not implemented.
   *
   * @param {number} ped
   * @param {number} maxCruiseSpeed
   * @return {void}
   */
declare function SetDriveTaskMaxCruiseSpeed(ped: Ped, maxCruiseSpeed: number): void;

/**
   * SET_ENABLE_SPEED_RESTRAIN_FOR_WAYPOINT_RECORDING_LEADER
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function SetEnableSpeedRestrainForWaypointRecordingLeader(p0: any, p1: any): void;

/**
   * SET_ENHANCED_BREAK_FREE
   * clipset: CLIPSET@MECH_HOGTIE@HUMAN@BREAKOUT_MG@GROUND, CLIPSET@MECH_HOGTIE@HUMAN@BREAKOUT_MG@SHOULDER, CLIPSET@MECH_HOGTIE@HUMAN@BREAKOUT_MG@MOUNT
   * clipset can also be 0
   *
   * @param {number} ped
   * @param {boolean} p1
   * @param {string | number} clipset
   * @return {boolean}
   */
declare function SetEnhancedBreakFree(ped: Ped, p1: boolean, clipset: string | number): boolean;

/**
   * SET_HIGH_FALL_TASK
   * Makes the ped ragdoll like when falling from a great height
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @return {void}
   */
declare function SetHighFallTask(ped: Ped, p1: number, p2: number, p3: number): void;

/**
   * SET_PED_DESIRED_MOVE_BLEND_RATIO
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function SetPedDesiredMoveBlendRatio(ped: Ped, p1: number): void;

/**
   * SET_PED_PATH_AVOID_FIRE
   *
   * @param {number} ped
   * @param {boolean} avoidFire
   * @return {void}
   */
declare function SetPedPathAvoidFire(ped: Ped, avoidFire: boolean): void;

/**
   * SET_PED_PATH_CAN_DROP_FROM_HEIGHT
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedPathCanDropFromHeight(ped: Ped, toggle: boolean): void;

/**
   * SET_PED_PATH_CAN_USE_CLIMBOVERS
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedPathCanUseClimbovers(ped: Ped, toggle: boolean): void;

/**
   * SET_PED_PATH_CAN_USE_LADDERS
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedPathCanUseLadders(ped: Ped, toggle: boolean): void;

/**
   * SET_PED_PATH_CLIMB_COST_MODIFIER
   *
   * @param {number} ped
   * @param {number} modifier
   * @return {void}
   */
declare function SetPedPathClimbCostModifier(ped: Ped, modifier: number): void;

/**
   * SET_PED_PATH_DEEP_SNOW_COST_MODIFIER
   *
   * @param {number} ped
   * @param {number} modifier
   * @return {void}
   */
declare function SetPedPathDeepSnowCostModifier(ped: Ped, modifier: number): void;

/**
   * SET_PED_PATH_FOLIAGE_COST_MODIFIER
   *
   * @param {number} ped
   * @param {number} modifier
   * @return {void}
   */
declare function SetPedPathFoliageCostModifier(ped: Ped, modifier: number): void;

/**
   * SET_PED_PATH_MAY_ENTER_WATER
   *
   * @param {number} ped
   * @param {boolean} mayEnterWater
   * @return {void}
   */
declare function SetPedPathMayEnterWater(ped: Ped, mayEnterWater: boolean): void;

/**
   * SET_PED_PATH_PREFER_TO_AVOID_WATER
   *
   * @param {number} ped
   * @param {boolean} avoidWater
   * @param {number} p2
   * @return {void}
   */
declare function SetPedPathPreferToAvoidWater(ped: Ped, avoidWater: boolean, p2: number): void;

/**
   * SET_PED_WAYPOINT_ROUTE_OFFSET
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @return {any}
   */
declare function SetPedWaypointRouteOffset(ped: Ped, p1: number, p2: number, p3: number): any;

/**
   * SET_SCENARIO_GROUP_ENABLED
   *
   * @param {string | number} scenarioGroup
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetScenarioGroupEnabled(scenarioGroup: string | number, toggle: boolean): void;

/**
   * SET_SCENARIO_TYPE_ENABLED
   *
   * @param {string | number} scenarioType
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetScenarioTypeEnabled(scenarioType: string | number, toggle: boolean): void;

/**
   * SET_SEQUENCE_TO_REPEAT
   * repeatMode: 0 = REPEAT_NOT; 1 = REPEAT_FOREVER
   *
   * @param {number} taskSequenceId
   * @param {number} repeatMode
   * @return {void}
   */
declare function SetSequenceToRepeat(taskSequenceId: number, repeatMode: number): void;

/**
   * SET_TASK_MOVE_NETWORK_SIGNAL_BOOL
   *
   * @param {number} ped
   * @param {string | number} signalName
   * @param {boolean} value
   * @return {void}
   */
declare function SetTaskMoveNetworkSignalBool(ped: Ped, signalName: string | number, value: boolean): void;

/**
   * SET_TASK_MOVE_NETWORK_SIGNAL_FLOAT
   *
   * @param {number} ped
   * @param {string | number} signalName
   * @param {number} value
   * @return {void}
   */
declare function SetTaskMoveNetworkSignalFloat(ped: Ped, signalName: string | number, value: number): void;

/**
   * SET_TEAM_CARRIABLE_ENTITY
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function SetTeamCarriableEntity(p0: any, p1: any, p2: any): void;

/**
   * SET_UP_SPEED_RESTRAIN_INFORMATION_FOR_PLAYER_FOLLOWER
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
   * @return {void}
   */
declare function SetUpSpeedRestrainInformationForPlayerFollower(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;

/**
   * START_TASK_ITEM_INTERACTION
   * Params: p3 = 0, 1; p5 = 0.0f, -1.0f
   * https://github.com/femga/rdr3_discoveries/tree/master/tasks/TASK_ITEM_INTERACTION
   *
   * @param {number} ped
   * @param {number} itemHash
   * @param {number} interactionAnimHash
   * @param {number} p3
   * @param {number} flag
   * @param {number} p5
   * @return {void}
   */
declare function StartTaskItemInteraction(ped: Ped, itemHash: Hash, interactionAnimHash: Hash, p3: number, flag: number, p5: number): void;

/**
   * STOP_ANIM_PLAYBACK
   *
   * @param {number} ped
   * @param {number} p1
   * @param {boolean} p2
   * @return {void}
   */
declare function StopAnimPlayback(ped: Ped, p1: number, p2: boolean): void;

/**
   * STOP_ANIM_TASK
   *
   * @param {number} ped
   * @param {string | number} animDictionary
   * @param {string | number} animationName
   * @param {number} p3
   * @return {void}
   */
declare function StopAnimTask(ped: Ped, animDictionary: string | number, animationName: string | number, p3: number): void;

/**
   * TASK_ACHIEVE_HEADING
   * Makes the specified ped achieve the specified heading.
   * 
   * pedHandle: The handle of the ped to assign the task to.
   * heading: The desired heading.
   * timeout: The time, in milliseconds, to allow the task to complete. If the task times out, it is canceled, and the ped will stay at the heading it managed to reach in the time.
   *
   * @param {number} ped
   * @param {number} heading
   * @param {number} timeout
   * @return {void}
   */
declare function TaskAchieveHeading(ped: Ped, heading: number, timeout: number): void;

/**
   * TASK_AIM_AT_COORD
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @return {void}
   */
declare function TaskAimAtCoord(ped: Ped, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;

/**
   * TASK_AIM_AT_ENTITY
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {void}
   */
declare function TaskAimAtEntity(ped: Ped, p1: any, p2: any, p3: any, p4: any): void;

/**
   * TASK_AIM_GUN_AT_COORD
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} time
   * @param {boolean} p5
   * @param {boolean} p6
   * @return {void}
   */
declare function TaskAimGunAtCoord(ped: Ped, x: number, y: number, z: number, time: number, p5: boolean, p6: boolean): void;

/**
   * TASK_AIM_GUN_AT_ENTITY
   * duration: the amount of time in milliseconds to do the task.  -1 will keep the task going until either another task is applied, or CLEAR_ALL_TASKS() is called with the ped
   *
   * @param {number} ped
   * @param {number} targetEntity
   * @param {number} duration
   * @param {boolean} p3
   * @param {number} p4
   * @return {void}
   */
declare function TaskAimGunAtEntity(ped: Ped, targetEntity: Entity, duration: number, p3: boolean, p4: number): void;

/**
   * TASK_AMBIENT_ANIMAL_HUNT
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function TaskAmbientAnimalHunt(ped: Ped, p1: any, p2: any): void;

/**
   * TASK_AMBIENT_ANIMAL_STALK
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function TaskAmbientAnimalStalk(ped: Ped, p1: any, p2: any): void;

/**
   * TASK_ANIMAL_ALERTED
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function TaskAnimalAlerted(ped: Ped, p1: any, p2: any): void;

/**
   * TASK_ANIMAL_FLEE
   *
   * @param {number} ped
   * @param {number} targetPed
   * @param {any} p2
   * @return {void}
   */
declare function TaskAnimalFlee(ped: Ped, targetPed: Ped, p2: any): void;

/**
   * TASK_ANIMAL_INTERACTION
   * https://github.com/femga/rdr3_discoveries/tree/master/tasks/TASK_ANIMAL_INTERACTION
   *
   * @param {number} ped
   * @param {number} targetPed
   * @param {number} interactionType
   * @param {number} interactionModel
   * @param {boolean} skipIdleAnimationClip
   * @return {void}
   */
declare function TaskAnimalInteraction(ped: Ped, targetPed: Ped, interactionType: Hash, interactionModel: Hash, skipIdleAnimationClip: boolean): void;

/**
   * TASK_ANIMAL_UNALERTED
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {void}
   */
declare function TaskAnimalUnalerted(ped: Ped, p1: any, p2: any, p3: any, p4: any): void;

/**
   * TASK_ANIMAL_WRITHE
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function TaskAnimalWrithe(ped: Ped, p1: any, p2: any): void;

/**
   * TASK_ARREST_PED
   *
   * @param {number} ped
   * @param {number} target
   * @return {void}
   */
declare function TaskArrestPed(ped: Ped, target: Ped): void;

/**
   * TASK_BARK
   *
   * @param {number} ped
   * @param {number} barkAtTarget
   * @param {number} mood
   * @return {void}
   */
declare function TaskBark(ped: Ped, barkAtTarget: Ped, mood: Hash): void;

/**
   * TASK_BOAT_MISSION
   *
   * @param {number} pedDriver
   * @param {number} boat
   * @param {any} p2
   * @param {any} p3
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {any} p7
   * @param {number} maxSpeed
   * @param {number} drivingStyle
   * @param {number} p10
   * @param {any} p11
   * @return {void}
   */
declare function TaskBoatMission(pedDriver: Ped, boat: Vehicle, p2: any, p3: any, x: number, y: number, z: number, p7: any, maxSpeed: number, drivingStyle: number, p10: number, p11: any): void;

/**
   * TASK_BREAK_VEHICLE_DOOR_LOCK
   *
   * @param {number} ped
   * @param {number} vehicle
   * @return {void}
   */
declare function TaskBreakVehicleDoorLock(ped: Ped, vehicle: Vehicle): void;

/**
   * TASK_CARRIABLE
   * carriableSlot:
   *  7 > Back of a horse
   *  6 > Right side of a horse
   *  5 > Left side of a horse
   * flags:
   *  512: enables the prompt being the name of the item when using a generic item
   *
   * @param {number} entity
   * @param {number} carryConfig
   * @param {number} carrier
   * @param {number} carriableSlot
   * @param {number} flags
   * @return {void}
   */
declare function TaskCarriable(entity: Entity, carryConfig: Hash, carrier: Ped, carriableSlot: number, flags: number): void;

/**
   * TASK_CLEAR_DEFENSIVE_AREA
   *
   * @param {number} ped
   * @return {void}
   */
declare function TaskClearDefensiveArea(ped: Ped): void;

/**
   * TASK_CLEAR_LOOK_AT
   *
   * @param {number} ped
   * @return {void}
   */
declare function TaskClearLookAt(ped: Ped): void;

/**
   * TASK_CLIMB
   * Climbs or vaults the nearest thing.
   *
   * @param {number} ped
   * @param {boolean} unused
   * @return {void}
   */
declare function TaskClimb(ped: Ped, unused: boolean): void;

/**
   * TASK_CLIMB_LADDER
   *
   * @param {number} ped
   * @param {number} p1
   * @param {boolean} p2
   * @param {boolean} p3
   * @return {void}
   */
declare function TaskClimbLadder(ped: Ped, p1: number, p2: boolean, p3: boolean): void;

/**
   * TASK_COMBAT_ANIMAL_CHARGE_PED
   *
   * @param {number} ped
   * @param {number} targetPed
   * @param {boolean} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @return {void}
   */
declare function TaskCombatAnimalChargePed(ped: Ped, targetPed: Ped, p2: boolean, p3: any, p4: any, p5: any, p6: any): void;

/**
   * TASK_COMBAT_ANIMAL_WARN
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function TaskCombatAnimalWarn(ped: Ped, p1: any, p2: any): void;

/**
   * TASK_COMBAT_HATED_TARGETS
   *
   * @param {number} ped
   * @param {number} radius
   * @return {void}
   */
declare function TaskCombatHatedTargets(ped: Ped, radius: number): void;

/**
   * TASK_COMBAT_HATED_TARGETS_AROUND_PED
   * Despite its name, it only attacks ONE hated target. The one closest hated target.
   *
   * @param {number} ped
   * @param {number} radius
   * @param {number} flags
   * @param {any} p3
   * @return {void}
   */
declare function TaskCombatHatedTargetsAroundPed(ped: Ped, radius: number, flags: number, p3: any): void;

/**
   * TASK_COMBAT_HATED_TARGETS_AROUND_PED_TIMED
   *
   * @param {number} ped
   * @param {number} radius
   * @param {number} time
   * @param {number} flags
   * @return {void}
   */
declare function TaskCombatHatedTargetsAroundPedTimed(ped: Ped, radius: number, time: number, flags: number): void;

/**
   * TASK_COMBAT_HATED_TARGETS_IN_AREA
   * Despite its name, it only attacks ONE hated target. The one closest to the specified position.
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @param {number} flags
   * @param {any} p6
   * @return {void}
   */
declare function TaskCombatHatedTargetsInArea(ped: Ped, x: number, y: number, z: number, radius: number, flags: number, p6: any): void;

/**
   * TASK_COMBAT_HATED_TARGETS_NO_LOS_TEST
   *
   * @param {number} ped
   * @param {number} radius
   * @return {void}
   */
declare function TaskCombatHatedTargetsNoLosTest(ped: Ped, radius: number): void;

/**
   * TASK_COMBAT_PED
   *
   * @param {number} ped
   * @param {number} targetPed
   * @param {number} p2
   * @param {number} p3
   * @return {void}
   */
declare function TaskCombatPed(ped: Ped, targetPed: Ped, p2: number, p3: number): void;

/**
   * TASK_COMBAT_PED_TIMED
   *
   * @param {number} ped
   * @param {number} targetPed
   * @param {number} p2
   * @param {any} p3
   * @return {void}
   */
declare function TaskCombatPedTimed(ped: Ped, targetPed: Ped, p2: number, p3: any): void;

/**
   * TASK_COMPANION_AMBIENT
   *
   * @param {number} ped
   * @param {any} p1
   * @return {void}
   */
declare function TaskCompanionAmbient(ped: Ped, p1: any): void;

/**
   * TASK_CONFRONT
   *
   * @param {number} ped
   * @param {number} targetPed
   * @param {number} p2
   * @return {boolean}
   */
declare function TaskConfront(ped: Ped, targetPed: Ped, p2: number): boolean;

/**
   * TASK_COWER
   *
   * @param {number} ped
   * @param {number} duration
   * @param {number} pedToCowerFrom
   * @param {string | number} p3
   * @return {void}
   */
declare function TaskCower(ped: Ped, duration: number, pedToCowerFrom: Ped, p3: string | number): void;

/**
   * TASK_DISEMBARK_NEAREST_TRAIN_CARRIAGE
   * flags: See TASK_ENTER_VEHICLE
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} flags
   * @return {void}
   */
declare function TaskDisembarkNearestTrainCarriage(ped: Ped, p1: number, flags: number): void;

/**
   * TASK_DISMOUNT_ANIMAL
   * Dismounts the ped from the animal it's mounted on. taskFlag affects what side the rider gets off. p2-p5 are almost always 0.
   * flags: See TASK_ENTER_VEHICLE
   *
   * @param {number} rider
   * @param {number} taskFlag
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {number} targetPed
   * @return {void}
   */
declare function TaskDismountAnimal(rider: Ped, taskFlag: number, p2: any, p3: any, p4: any, targetPed: Ped): void;

/**
   * TASK_DRIVE_BY
   *
   * @param {number} driverPed
   * @param {number} targetPed
   * @param {number} targetVehicle
   * @param {number} targetX
   * @param {number} targetY
   * @param {number} targetZ
   * @param {number} distanceToShoot
   * @param {number} pedAccuracy
   * @param {boolean} p8
   * @param {number} firingPattern
   * @return {void}
   */
declare function TaskDriveBy(driverPed: Ped, targetPed: Ped, targetVehicle: Vehicle, targetX: number, targetY: number, targetZ: number, distanceToShoot: number, pedAccuracy: number, p8: boolean, firingPattern: Hash): void;

/**
   * TASK_DUCK
   *
   * @param {number} ped
   * @param {number} time
   * @return {void}
   */
declare function TaskDuck(ped: Ped, time: number): void;

/**
   * TASK_DUEL
   * Params: p4 either 0.2f, 0.25f, 0.31f, 0.4f
   *
   * @param {number} ped
   * @param {any} p1
   * @param {number} p2
   * @param {number} entity
   * @param {number} p4
   * @param {number} p5
   * @param {number} vPosOpponentX
   * @param {number} vPosOpponentY
   * @param {number} vPosOpponentZ
   * @param {number} fOpponentHead
   * @param {number} p10
   * @return {void}
   */
declare function TaskDuel(ped: Ped, p1: any, p2: number, entity: Entity, p4: number, p5: number, vPosOpponentX: number, vPosOpponentY: number, vPosOpponentZ: number, fOpponentHead: number, p10: number): void;

/**
   * TASK_DUMP_CARRIABLE_FROM_PARENT
   *
   * @param {number} ped
   * @param {number} ped2
   * @param {number} entity
   * @return {void}
   */
declare function TaskDumpCarriableFromParent(ped: Ped, ped2: Ped, entity: Entity): void;

/**
   * TASK_EAT
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function TaskEat(ped: Ped, p1: any, p2: any): void;

/**
   * TASK_ENTER_ANIM_SCENE
   * flags:
   * MOVE_WHILST_WAITING_FOR_PATH = (1 << 0),
   * DO_NOT_STAND_STILL_AT_END_OF_PATH = (1 << 1),
   * SKIP_NAVIGATION = (1 << 2),
   * TEASF_AUTO_START_ANIM_SCENE = (1 << 3),
   * FORCE_STAND_STILL_AT_END_OF_PATH = (1 << 6),
   * ENTER_ANIM_SCENE_DONT_FOLLOW_NAVMESH = (1 << 7)
   *
   * @param {number} ped
   * @param {number} animScene
   * @param {string | number} entityName
   * @param {string | number} playbackListName
   * @param {number} enterSpeed
   * @param {boolean} bAutoStart
   * @param {number} flag
   * @param {number} p7
   * @param {number} p8
   * @return {void}
   */
declare function TaskEnterAnimScene(ped: Ped, animScene: AnimScene, entityName: string | number, playbackListName: string | number, enterSpeed: number, bAutoStart: boolean, flag: number, p7: number, p8: number): void;

/**
   * TASK_ENTER_VEHICLE
   * flags: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/eEnterExitVehicleFlags
   *
   * @param {number} ped
   * @param {number} vehicle
   * @param {number} timeout
   * @param {number} seat
   * @param {number} speed
   * @param {number} flag
   * @param {any} p6
   * @return {void}
   */
declare function TaskEnterVehicle(ped: Ped, vehicle: Vehicle, timeout: number, seat: number, speed: number, flag: number, p6: any): void;

/**
   * TASK_EVASIVE_ANIM
   * Params: p2 is returned by BUILTIN::SHIFT_LEFT
   *
   * @param {number} ped1
   * @param {number} ped2
   * @param {number} p2
   * @return {void}
   */
declare function TaskEvasiveAnim(ped1: Ped, ped2: Ped, p2: number): void;

/**
   * TASK_EVERYONE_LEAVE_VEHICLE_IN_ORDER
   *
   * @param {number} vehicle
   * @param {boolean} p1
   * @return {void}
   */
declare function TaskEveryoneLeaveVehicleInOrder(vehicle: Vehicle, p1: boolean): void;

/**
   * TASK_EXTEND_ROUTE
   * Adds a new point to the current point route. Call TASK_FLUSH_ROUTE before the first call to this. Call TASK_FOLLOW_POINT_ROUTE to make the Ped go the route.
   * 
   * A maximum of 8 points can be added.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {void}
   */
declare function TaskExtendRoute(x: number, y: number, z: number): void;

/**
   * TASK_FLEE_COORD
   * Params: p5 = some flag?, p6 = -1.0f, p8 = 0 in R* Scripts
   * fleeStyle: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/eFleeStyle
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} fleeStyle
   * @param {number} p5
   * @param {number} p6
   * @param {number} duration
   * @param {number} p8
   * @return {void}
   */
declare function TaskFleeCoord(ped: Ped, x: number, y: number, z: number, fleeStyle: number, p5: number, p6: number, duration: number, p8: number): void;

/**
   * TASK_FLEE_COORD_VIA
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
   * @param {any} p10
   * @param {any} p11
   * @return {void}
   */
declare function TaskFleeCoordVia(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any, p10: any, p11: any): void;

/**
   * TASK_FLEE_PED
   * Params: p4 = -1.0f, p5 = -1, p6 = 0 in R* Scripts
   * fleeStyle: see TASK_FLEE_COORD
   *
   * @param {number} ped
   * @param {number} fleeFromTarget
   * @param {number} fleeStyle
   * @param {number} flag
   * @param {number} p4
   * @param {number} p5
   * @param {number} p6
   * @return {void}
   */
declare function TaskFleePed(ped: Ped, fleeFromTarget: Ped, fleeStyle: number, flag: number, p4: number, p5: number, p6: number): void;

/**
   * TASK_FLEE_PED_VIA
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
declare function TaskFleePedVia(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;

/**
   * TASK_FLUSH_ROUTE
   * Clears the current point route. Call this before TASK_EXTEND_ROUTE and TASK_FOLLOW_POINT_ROUTE.
   *
  
   * @return {void}
   */
declare function TaskFlushRoute(): void;

/**
   * TASK_FLYING_CIRCLE
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @return {void}
   */
declare function TaskFlyingCircle(ped: Ped, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;

/**
   * TASK_FLY_AWAY
   *
   * @param {number} ped
   * @param {number} fleeFromTarget
   * @return {void}
   */
declare function TaskFlyAway(ped: Ped, fleeFromTarget: Ped): void;

/**
   * TASK_FLY_TO_COORD
   *
   * @param {number} ped
   * @param {number} travelMbr
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {boolean} p5
   * @param {boolean} p6
   * @return {void}
   */
declare function TaskFlyToCoord(ped: Ped, travelMbr: number, x: number, y: number, z: number, p5: boolean, p6: boolean): void;

/**
   * TASK_FOLLOW_AND_CONVERSE_WITH_PED
   *
   * @param {number} ped
   * @param {number} targetPed
   * @param {any} p2
   * @param {any} p3
   * @param {number} p4
   * @param {number} p5
   * @param {number} p6
   * @param {any} p7
   * @param {any} p8
   * @param {number} p9
   * @param {number} p10
   * @return {void}
   */
declare function TaskFollowAndConverseWithPed(ped: Ped, targetPed: Ped, p2: any, p3: any, p4: number, p5: number, p6: number, p7: any, p8: any, p9: number, p10: number): void;

/**
   * TASK_FOLLOW_ENTITY_ALONG_WAYPOINT_RECORDING_AT_OFFSET
   *
   * @param {number} ped0
   * @param {number} ped1
   * @param {string | number} waypointRecording
   * @param {number} p3
   * @param {number} p4
   * @param {number} p5
   * @param {number} p6
   * @param {number} p7
   * @param {boolean} p8
   * @return {void}
   */
declare function TaskFollowEntityAlongWaypointRecordingAtOffset(ped0: Ped, ped1: Ped, waypointRecording: string | number, p3: number, p4: number, p5: number, p6: number, p7: number, p8: boolean): void;

/**
   * TASK_FOLLOW_ENTITY_WHILE_AIMING_AT_ENTITY
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @param {any} p7
   * @return {void}
   */
declare function TaskFollowEntityWhileAimingAtEntity(ped: Ped, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;

/**
   * TASK_FOLLOW_NAV_MESH_TO_COORD
   * If no timeout, set timeout to -1.
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} speedMultiplier
   * @param {number} timeout
   * @param {number} stoppingRange
   * @param {number} flags
   * @param {number} heading
   * @return {void}
   */
declare function TaskFollowNavMeshToCoord(ped: Ped, x: number, y: number, z: number, speedMultiplier: number, timeout: number, stoppingRange: number, flags: number, heading: number): void;

/**
   * TASK_FOLLOW_NAV_MESH_TO_COORD_ADVANCED
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} speedMultiplier
   * @param {number} timeout
   * @param {number} stoppingRange
   * @param {number} flags
   * @param {number} p8
   * @param {number} p9
   * @param {number} p10
   * @param {number} entity
   * @param {number} unk
   * @return {void}
   */
declare function TaskFollowNavMeshToCoordAdvanced(ped: Ped, x: number, y: number, z: number, speedMultiplier: number, timeout: number, stoppingRange: number, flags: number, p8: number, p9: number, p10: number, entity: Entity, unk: number): void;

/**
   * TASK_FOLLOW_PAVEMENT_TO_COORD
   *
   * @param {number} ped
   * @param {any} args
   * @return {void}
   */
declare function TaskFollowPavementToCoord(ped: Ped, args: any): void;

/**
   * TASK_FOLLOW_POINT_ROUTE
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @return {void}
   */
declare function TaskFollowPointRoute(ped: Ped, p1: any, p2: any, p3: any, p4: any, p5: any): void;

/**
   * TASK_FOLLOW_TO_OFFSET_OF_COORD
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @param {any} p7
   * @param {any} p8
   * @param {any} p9
   * @param {any} p10
   * @param {any} p11
   * @param {any} p12
   * @param {any} p13
   * @param {any} p14
   * @return {void}
   */
declare function TaskFollowToOffsetOfCoord(ped: Ped, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any, p10: any, p11: any, p12: any, p13: any, p14: any): void;

/**
   * TASK_FOLLOW_TO_OFFSET_OF_ENTITY
   *
   * @param {number} ped
   * @param {number} entity
   * @param {number} offsetX
   * @param {number} offsetY
   * @param {number} offsetZ
   * @param {number} movementSpeed
   * @param {number} timeout
   * @param {number} stoppingRange
   * @param {boolean} persistFollowing
   * @param {boolean} p9
   * @param {boolean} walkOnly
   * @param {boolean} p11
   * @param {boolean} p12
   * @param {boolean} p13
   * @return {void}
   */
declare function TaskFollowToOffsetOfEntity(ped: Ped, entity: Entity, offsetX: number, offsetY: number, offsetZ: number, movementSpeed: number, timeout: number, stoppingRange: number, persistFollowing: boolean, p9: boolean, walkOnly: boolean, p11: boolean, p12: boolean, p13: boolean): void;

/**
   * TASK_FOLLOW_WAYPOINT_RECORDING
   *
   * @param {number} ped
   * @param {string | number} waypointRecording
   * @param {number} p2
   * @param {number} flag
   * @param {number} p4
   * @param {boolean} p5
   * @param {any} p6
   * @param {number} p7
   * @return {void}
   */
declare function TaskFollowWaypointRecording(ped: Ped, waypointRecording: string | number, p2: number, flag: number, p4: number, p5: boolean, p6: any, p7: number): void;

/**
   * TASK_FOLLOW_WAYPOINT_RECORDING_ADVANCED
   *
   * @param {number} ped
   * @param {any} p1
   * @return {void}
   */
declare function TaskFollowWaypointRecordingAdvanced(ped: Ped, p1: any): void;

/**
   * TASK_FOLLOW_WAYPOINT_RECORDING_AT_OFFSET
   *
   * @param {number} ped
   * @param {string | number} waypointRecording
   * @param {number} p2
   * @param {number} p3
   * @param {number} p4
   * @param {number} p5
   * @param {boolean} p6
   * @return {void}
   */
declare function TaskFollowWaypointRecordingAtOffset(ped: Ped, waypointRecording: string | number, p2: number, p3: number, p4: number, p5: number, p6: boolean): void;

/**
   * TASK_FORCE_MOTION_STATE
   * motionStateHash: see FORCE_PED_MOTION_STATE
   *
   * @param {number} ped
   * @param {number} motionStateHash
   * @param {boolean} p2
   * @return {void}
   */
declare function TaskForceMotionState(ped: Ped, motionStateHash: Hash, p2: boolean): void;

/**
   * TASK_GOTO_ENTITY_AIMING
   * ped = Ped you want to perform this task.
   * target = the Entity they should aim at.
   * distanceToStopAt = distance from the target, where the ped should stop to aim.
   * StartAimingDist = distance where the ped should start to aim.
   *
   * @param {number} ped
   * @param {number} target
   * @param {number} distanceToStopAt
   * @param {number} startAimingDist
   * @return {void}
   */
declare function TaskGotoEntityAiming(ped: Ped, target: Entity, distanceToStopAt: number, StartAimingDist: number): void;

/**
   * TASK_GOTO_ENTITY_OFFSET
   *
   * @param {number} ped
   * @param {number} entity
   * @param {any} p2
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} duration
   * @return {void}
   */
declare function TaskGotoEntityOffset(ped: Ped, entity: Entity, p2: any, x: number, y: number, z: number, duration: number): void;

/**
   * TASK_GOTO_ENTITY_OFFSET_XY
   *
   * @param {number} ped
   * @param {number} entity
   * @param {number} duration
   * @param {number} targetRadius
   * @param {number} xOffset
   * @param {number} yOffset
   * @param {number} moveBlendRatio
   * @param {number} offsetFlags
   * @return {void}
   */
declare function TaskGotoEntityOffsetXy(ped: Ped, entity: Entity, duration: number, targetRadius: number, xOffset: number, yOffset: number, moveBlendRatio: number, offsetFlags: number): void;

/**
   * TASK_GOTO_ENTITY_OFFSET_XYZ
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @param {any} p7
   * @param {any} p8
   * @return {void}
   */
declare function TaskGotoEntityOffsetXyz(ped: Ped, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;

/**
   * TASK_GOTO_ENTITY_OFFSET_XYZ_AIMING
   *
   * @param {number} ped
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
declare function TaskGotoEntityOffsetXyzAiming(ped: Ped, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;

/**
   * TASK_GOTO_ENTITY_OFFSET_XY_AIMING
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @param {any} p7
   * @param {any} p8
   * @return {void}
   */
declare function TaskGotoEntityOffsetXyAiming(ped: Ped, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;

/**
   * TASK_GO_STRAIGHT_TO_COORD
   * Tells the ped to go to a coord, without using the navemesh. if timeBeforeTeleport is -1 the ped will never warp, p8 is always 0 or 1 still unknown
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} moveBlendRatio
   * @param {number} timeBeforeTeleport
   * @param {number} finalHeading
   * @param {number} targetRadius
   * @param {number} p8
   * @return {void}
   */
declare function TaskGoStraightToCoord(ped: Ped, x: number, y: number, z: number, moveBlendRatio: number, timeBeforeTeleport: number, finalHeading: number, targetRadius: number, p8: number): void;

/**
   * TASK_GO_STRAIGHT_TO_COORD_RELATIVE_TO_ENTITY
   * Tells the ped to go to an offset coord from an entity, without using the navmesh. if timeBeforeTeleport is -1 the ped will never warp, p7 is 1 or 0 still unknown param 
   *
   * @param {number} ped
   * @param {number} entity
   * @param {number} xOffset
   * @param {number} yoffset
   * @param {number} zOffset
   * @param {number} moveBlendRatio
   * @param {number} timeBeforeTeleport
   * @param {number} p7
   * @return {void}
   */
declare function TaskGoStraightToCoordRelativeToEntity(ped: Ped, entity: Entity, xOffset: number, Yoffset: number, zOffset: number, moveBlendRatio: number, timeBeforeTeleport: number, p7: number): void;

/**
   * TASK_GO_TO_COORD_AND_AIM_AT_HATED_ENTITIES_NEAR_COORD
   *
   * @param {number} ped
   * @param {number} goToLocationX
   * @param {number} goToLocationY
   * @param {number} goToLocationZ
   * @param {number} focusLocationX
   * @param {number} focusLocationY
   * @param {number} focusLocationZ
   * @param {number} speed
   * @param {boolean} shootAtEnemies
   * @param {number} distanceToStopAt
   * @param {number} noRoadsDistance
   * @param {boolean} unkTrue
   * @param {number} unkFlag
   * @param {number} aimingFlag
   * @param {number} firingPattern
   * @return {void}
   */
declare function TaskGoToCoordAndAimAtHatedEntitiesNearCoord(ped: Ped, goToLocationX: number, goToLocationY: number, goToLocationZ: number, focusLocationX: number, focusLocationY: number, focusLocationZ: number, speed: number, shootAtEnemies: boolean, distanceToStopAt: number, noRoadsDistance: number, unkTrue: boolean, unkFlag: number, aimingFlag: number, firingPattern: Hash): void;

/**
   * TASK_GO_TO_COORD_AND_AIM_AT_HATED_ENTITIES_NEAR_COORD_USING_COMBAT_STYLE
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @param {any} p7
   * @param {any} p8
   * @param {any} p9
   * @param {any} p10
   * @param {any} p11
   * @param {any} p12
   * @param {any} p13
   * @param {any} p14
   * @return {void}
   */
declare function TaskGoToCoordAndAimAtHatedEntitiesNearCoordUsingCombatStyle(ped: Ped, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any, p10: any, p11: any, p12: any, p13: any, p14: any): void;

/**
   * TASK_GO_TO_COORD_ANY_MEANS
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} speed
   * @param {number} entity
   * @param {boolean} p6
   * @param {number} walkingStyle
   * @param {number} p8
   * @return {void}
   */
declare function TaskGoToCoordAnyMeans(ped: Ped, x: number, y: number, z: number, speed: number, entity: Entity, p6: boolean, walkingStyle: number, p8: number): void;

/**
   * TASK_GO_TO_COORD_ANY_MEANS_EXTRA_PARAMS
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} speed
   * @param {any} p5
   * @param {boolean} p6
   * @param {number} walkingStyle
   * @param {number} p8
   * @param {any} p9
   * @param {any} p10
   * @param {any} p11
   * @param {any} p12
   * @return {void}
   */
declare function TaskGoToCoordAnyMeansExtraParams(ped: Ped, x: number, y: number, z: number, speed: number, p5: any, p6: boolean, walkingStyle: number, p8: number, p9: any, p10: any, p11: any, p12: any): void;

/**
   * TASK_GO_TO_COORD_ANY_MEANS_EXTRA_PARAMS_WITH_CRUISE_SPEED
   * This native allows to control the cruise speed of where you want the ped to go
   * 3rd param might be the entity ped is in? like boat or wagon, 12th param might be the cruiseSpeed of the entity ped is in?
   * EXAMPLE: TaskGoToCoordAnyMeansExtraParamsWithCruiseSpeed(PlayerPedId(), vector3(x, y, z), 3.0, entity, 1, 0, -1082130432, 0, 101004800, 520, 3.0, 1082130432, 0)
   *
   * @param {number} ped
   * @param {number} cruiseSpeed
   * @param {number} entity
   * @param {number} p4
   * @param {number} p5
   * @param {any} p6
   * @param {any} p7
   * @param {any} p8
   * @param {any} p9
   * @param {any} p10
   * @param {any} p11
   * @param {number} cruiseSpeed_2
   * @param {any} p13
   * @param {any} p14
   * @return {Vector3}
   */
declare function TaskGoToCoordAnyMeansExtraParamsWithCruiseSpeed(ped: Ped, cruiseSpeed: number, entity: Entity, p4: number, p5: number, p6: any, p7: any, p8: any, p9: any, p10: any, p11: any, cruiseSpeed_2: number, p13: any, p14: any): Vector3;

/**
   * TASK_GO_TO_COORD_WHILE_AIMING_AT_COORD
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @param {any} p7
   * @param {any} p8
   * @param {any} p9
   * @param {any} p10
   * @param {any} p11
   * @param {any} p12
   * @param {any} p13
   * @param {any} p14
   * @param {any} p15
   * @return {void}
   */
declare function TaskGoToCoordWhileAimingAtCoord(ped: Ped, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any, p10: any, p11: any, p12: any, p13: any, p14: any, p15: any): void;

/**
   * TASK_GO_TO_COORD_WHILE_AIMING_AT_COORD_USING_COMBAT_STYLE
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @param {any} p7
   * @param {any} p8
   * @param {any} p9
   * @param {any} p10
   * @param {any} p11
   * @param {any} p12
   * @param {any} p13
   * @param {any} p14
   * @param {any} p15
   * @return {void}
   */
declare function TaskGoToCoordWhileAimingAtCoordUsingCombatStyle(ped: Ped, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any, p10: any, p11: any, p12: any, p13: any, p14: any, p15: any): void;

/**
   * TASK_GO_TO_COORD_WHILE_AIMING_AT_ENTITY
   *
   * @param {number} ped1
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} ped2
   * @param {number} p5
   * @param {any} p6
   * @param {number} p7
   * @param {number} p8
   * @param {any} p9
   * @param {any} p10
   * @param {any} p11
   * @param {number} firingPattern
   * @param {number} p13
   * @param {any} p14
   * @return {void}
   */
declare function TaskGoToCoordWhileAimingAtEntity(ped1: Ped, x: number, y: number, z: number, ped2: Ped, p5: number, p6: any, p7: number, p8: number, p9: any, p10: any, p11: any, firingPattern: Hash, p13: number, p14: any): void;

/**
   * TASK_GO_TO_COORD_WHILE_AIMING_AT_ENTITY_USING_COMBAT_STYLE
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @param {any} p7
   * @param {any} p8
   * @param {any} p9
   * @param {any} p10
   * @param {any} p11
   * @param {any} p12
   * @param {any} p13
   * @param {any} p14
   * @return {void}
   */
declare function TaskGoToCoordWhileAimingAtEntityUsingCombatStyle(ped: Ped, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any, p10: any, p11: any, p12: any, p13: any, p14: any): void;

/**
   * TASK_GO_TO_ENTITY
   *
   * @param {number} ped
   * @param {number} target
   * @param {number} duration
   * @param {number} distance
   * @param {number} speed
   * @param {number} p5
   * @param {number} p6
   * @return {void}
   */
declare function TaskGoToEntity(ped: Ped, target: Entity, duration: number, distance: number, speed: number, p5: number, p6: number): void;

/**
   * TASK_GO_TO_ENTITY_WHILE_AIMING_AT_ENTITY
   * shootatEntity:
   * If true, peds will shoot at Entity till it is dead.
   * If false, peds will just walk till they reach the entity and will cease shooting.
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @param {any} p7
   * @param {any} p8
   * @param {any} p9
   * @param {any} p10
   * @return {void}
   */
declare function TaskGoToEntityWhileAimingAtEntity(ped: Ped, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any, p10: any): void;

/**
   * TASK_GO_TO_ENTITY_WHILE_AIMING_AT_ENTITY_USING_COMBAT_STYLE
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @param {any} p7
   * @param {any} p8
   * @param {any} p9
   * @param {any} p10
   * @return {void}
   */
declare function TaskGoToEntityWhileAimingAtEntityUsingCombatStyle(ped: Ped, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any, p10: any): void;

/**
   * TASK_GO_TO_WHISTLE
   * enum eWhistleType
   * {
   *   WHISTLE_MAIN,
   *   WHISTLE_SECONDARY,
   *   WHISTLE_DOUBLE,
   *   WHISTLE_URGENT,
   *   WHISTLE_LONG
   * };
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} whistleType
   * @return {void}
   */
declare function TaskGoToWhistle(ped: Ped, p1: Ped, whistleType: number): void;

/**
   * TASK_GRAPPLE
   * grappleStyle: AR_GRAPPLE_MOUNT_STANDING_FROM_FRONT, AR_GRAPPLE_MOUNT_STANDING_FROM_RIGHT, AR_GRAPPLE_MOUNT_STANDING_FROM_BACK, AR_GRAPPLE_MOUNT_STANDING_FROM_LEFT, AR_GRAPPLE_MOUNT_FROM_FRONT, AR_WOLF_EXECUTION_ENTER_FROM_BACK, AR_GRAPPLE_DRAG_FRONT_ON_ASS, AR_GRAPPLE_FRONT_FROM_LEFT_FAR, AR_BEAR_CHALLENGE_FRONT, AR_GRAPPLE_FRONT_FROM_FRONT, AR_GRAPPLE_MOUNT_FACEUP_FROM_FRONT
   *
   * @param {number} ped
   * @param {number} targetPed
   * @param {number} grappleStyle
   * @param {number} p3
   * @param {number} p4
   * @param {number} p5
   * @param {number} p6
   * @return {boolean}
   */
declare function TaskGrapple(ped: Ped, targetPed: Ped, grappleStyle: Hash, p3: number, p4: number, p5: number, p6: number): boolean;

/**
   * TASK_GUARD
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function TaskGuard(ped: Ped, p1: any, p2: any): void;

/**
   * TASK_GUARD_ASSIGNED_DEFENSIVE_AREA
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {number} p4
   * @param {number} p5
   * @param {any} p6
   * @return {void}
   */
declare function TaskGuardAssignedDefensiveArea(ped: Ped, p1: number, p2: number, p3: number, p4: number, p5: number, p6: any): void;

/**
   * TASK_GUARD_CURRENT_POSITION
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} p2
   * @param {boolean} p3
   * @return {void}
   */
declare function TaskGuardCurrentPosition(ped: Ped, p1: number, p2: number, p3: boolean): void;

/**
   * TASK_HANDS_UP
   * flags: 0 = HANDS_UP_NOTHING; 1 = HANDS_UP_STRAIGHT_TO_LOOP
   *
   * @param {number} ped
   * @param {number} duration
   * @param {number} facingPed
   * @param {number} timeToFacePed
   * @param {number} flags
   * @return {void}
   */
declare function TaskHandsUp(ped: Ped, duration: number, facingPed: Ped, timeToFacePed: number, flags: number): void;

/**
   * TASK_HITCH_ANIMAL
   *
   * @param {number} ped
   * @param {number} scenarioPoint
   * @param {number} flag
   * @return {void}
   */
declare function TaskHitchAnimal(ped: Ped, scenarioPoint: number, flag: number): void;

/**
   * TASK_HOGTIEABLE
   *
   * @param {number} ped
   * @return {void}
   */
declare function TaskHogtieable(ped: Ped): void;

/**
   * TASK_HOGTIE_TARGET_PED
   *
   * @param {number} ped
   * @param {number} targetPed
   * @return {void}
   */
declare function TaskHogtieTargetPed(ped: Ped, targetPed: Ped): void;

/**
   * TASK_HORSE_ACTION
   * https://github.com/femga/rdr3_discoveries/tree/master/tasks/TASK_HORSE_ACTION
   * Params: p2, p3 are set to 0 in R* Scripts
   *
   * @param {number} ped
   * @param {number} action
   * @param {number} targetPed
   * @param {any} p3
   * @return {void}
   */
declare function TaskHorseAction(ped: Ped, action: number, targetPed: Ped, p3: any): void;

/**
   * TASK_INVESTIGATE
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @return {void}
   */
declare function TaskInvestigate(ped: Ped, p1: any, p2: any, p3: any, p4: any, p5: any): void;

/**
   * TASK_JUMP
   *
   * @param {number} ped
   * @param {boolean} unused
   * @return {void}
   */
declare function TaskJump(ped: Ped, unused: boolean): void;

/**
   * TASK_KNOCKED_OUT
   *
   * @param {number} ped
   * @param {number} p1
   * @param {boolean} permanently
   * @return {void}
   */
declare function TaskKnockedOut(ped: Ped, p1: number, permanently: boolean): void;

/**
   * TASK_KNOCKED_OUT_AND_HOGTIED
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} p2
   * @return {void}
   */
declare function TaskKnockedOutAndHogtied(ped: Ped, p1: number, p2: number): void;

/**
   * TASK_LASSO_PED
   *
   * @param {number} ped
   * @param {number} targetPed
   * @return {void}
   */
declare function TaskLassoPed(ped: Ped, targetPed: Ped): void;

/**
   * TASK_LEAD_AND_CONVERSE
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @param {any} p7
   * @param {any} p8
   * @return {void}
   */
declare function TaskLeadAndConverse(ped: Ped, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;

/**
   * TASK_LEAD_HORSE
   *
   * @param {number} ped
   * @param {number} horse
   * @return {void}
   */
declare function TaskLeadHorse(ped: Ped, horse: Ped): void;

/**
   * TASK_LEAVE_ANY_VEHICLE
   * flags: See TASK_ENTER_VEHICLE
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} taskFlag
   * @return {void}
   */
declare function TaskLeaveAnyVehicle(ped: Ped, p1: number, taskFlag: number): void;

/**
   * TASK_LEAVE_VEHICLE
   * flags: See TASK_ENTER_VEHICLE
   *
   * @param {number} ped
   * @param {number} vehicle
   * @param {number} flags
   * @param {number} unkPed
   * @return {void}
   */
declare function TaskLeaveVehicle(ped: Ped, vehicle: Vehicle, flags: number, unkPed: Ped): void;

/**
   * TASK_LOOK_AT_COORD
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} duration
   * @param {number} flags
   * @param {number} p6
   * @param {boolean} p7
   * @return {void}
   */
declare function TaskLookAtCoord(ped: Ped, x: number, y: number, z: number, duration: number, flags: number, p6: number, p7: boolean): void;

/**
   * TASK_LOOK_AT_ENTITY
   * param3: duration in ms, use -1 to look forever
   * param4: using 2048 is fine
   * param5: using 3 is fine
   *
   * @param {number} ped
   * @param {number} lookAtTarget
   * @param {number} duration
   * @param {number} p3
   * @param {number} p4
   * @param {number} p5
   * @return {void}
   */
declare function TaskLookAtEntity(ped: Ped, lookAtTarget: Entity, duration: number, p3: number, p4: number, p5: number): void;

/**
   * TASK_LOOT_ENTITY
   *
   * @param {number} ped
   * @param {number} entity
   * @return {void}
   */
declare function TaskLootEntity(ped: Ped, entity: Entity): void;

/**
   * TASK_LOOT_NEAREST_ENTITY
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} p4
   * @param {number} p5
   * @return {void}
   */
declare function TaskLootNearestEntity(ped: Ped, x: number, y: number, z: number, p4: number, p5: number): void;

/**
   * TASK_MELEE
   * Params: p2: AR_TAKEDOWN_FRONT, AR_EXECUTION_FRONT, 0 in R* Scripts
   *
   * @param {number} ped
   * @param {number} targetPed
   * @param {number} p2
   * @param {any} p3
   * @param {any} p4
   * @param {number} p5
   * @param {any} p6
   * @param {number} p7
   * @return {boolean}
   */
declare function TaskMelee(ped: Ped, targetPed: Ped, p2: Hash, p3: any, p4: any, p5: number, p6: any, p7: number): boolean;

/**
   * TASK_MOUNT_ANIMAL
   * timer: in ms, if it reaches 0 it will auto warp the ped on the horse
   * mountStyle: See TASK_ENTER_VEHICLE
   * Flags will still apply to mountStyle
   *
   * @param {number} ped
   * @param {number} mount
   * @param {number} timer
   * @param {number} seatIndex
   * @param {number} pedSpeed
   * @param {number} mountStyle
   * @param {any} p6
   * @param {any} p7
   * @return {void}
   */
declare function TaskMountAnimal(ped: Ped, mount: Ped, timer: number, seatIndex: number, pedSpeed: number, mountStyle: number, p6: any, p7: any): void;

/**
   * TASK_MOVE_BE_IN_FORMATION
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @return {void}
   */
declare function TaskMoveBeInFormation(ped: Ped, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;

/**
   * TASK_MOVE_FOLLOW_ROAD_USING_NAVMESH
   * Params: moveBlendRatio commonly 1.25f, p5 is always 0 in R* Scripts
   *
   * @param {number} ped
   * @param {number} moveBlendRatio
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {any} p5
   * @return {void}
   */
declare function TaskMoveFollowRoadUsingNavmesh(ped: Ped, moveBlendRatio: number, x: number, y: number, z: number, p5: any): void;

/**
   * TASK_MOVE_IN_TRAFFIC
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function TaskMoveInTraffic(ped: Ped, p1: any, p2: any, p3: any): void;

/**
   * TASK_MOVE_IN_TRAFFIC_AWAY_FROM_ENTITY
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {void}
   */
declare function TaskMoveInTrafficAwayFromEntity(ped: Ped, p1: any, p2: any, p3: any, p4: any): void;

/**
   * TASK_MOVE_IN_TRAFFIC_TO_DESTINATION
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @param {any} p7
   * @return {void}
   */
declare function TaskMoveInTrafficToDestination(ped: Ped, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;

/**
   * TASK_MOVE_NETWORK_ADVANCED_BY_NAME_WITH_INIT_PARAMS
   *
   * @param {number} ped
   * @param {string | number} moveNetworkDefName
   * @param {any} taskData
   * @param {number} xPos
   * @param {number} yPos
   * @param {number} zPos
   * @param {number} xRot
   * @param {number} yRot
   * @param {number} zRot
   * @param {number} p9
   * @param {number} p10
   * @param {number} p11
   * @param {number} p12
   * @param {number} flag
   * @param {number} p14
   * @return {void}
   */
declare function TaskMoveNetworkAdvancedByNameWithInitParams(ped: Ped, moveNetworkDefName: string | number, taskData: any, xPos: number, yPos: number, zPos: number, xRot: number, yRot: number, zRot: number, p9: number, p10: number, p11: number, p12: number, flag: number, p14: number): void;

/**
   * TASK_MOVE_NETWORK_ADVANCED_BY_NAME_WITH_INIT_PARAMS_ATTACHED
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @param {any} p7
   * @param {any} p8
   * @param {any} p9
   * @param {any} p10
   * @param {any} p11
   * @param {any} p12
   * @param {any} p13
   * @param {any} p14
   * @param {any} p15
   * @param {any} p16
   * @param {any} p17
   * @return {void}
   */
declare function TaskMoveNetworkAdvancedByNameWithInitParamsAttached(ped: Ped, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any, p10: any, p11: any, p12: any, p13: any, p14: any, p15: any, p16: any, p17: any): void;

/**
   * TASK_MOVE_NETWORK_BY_NAME
   *
   * @param {number} ped
   * @param {string | number} task
   * @param {number} multiplier
   * @param {boolean} p3
   * @param {string | number} animDict
   * @param {number} flags
   * @return {void}
   */
declare function TaskMoveNetworkByName(ped: Ped, task: string | number, multiplier: number, p3: boolean, animDict: string | number, flags: number): void;

/**
   * TASK_MOVE_NETWORK_BY_NAME_WITH_INIT_PARAMS
   *
   * @param {number} ped
   * @param {string | number} moveNetworkDefName
   * @param {DataView} taskData
   * @param {number} p3
   * @param {boolean} p4
   * @param {string | number} animDict
   * @param {number} flags
   * @return {void}
   */
declare function TaskMoveNetworkByNameWithInitParams(ped: Ped, moveNetworkDefName: string | number, taskData: DataView, p3: number, p4: boolean, animDict: string | number, flags: number): void;

/**
   * TASK_PATROL
   *
   * @param {number} ped
   * @param {string | number} patrolRoute
   * @param {any} p2
   * @param {boolean} p3
   * @param {boolean} p4
   * @return {void}
   */
declare function TaskPatrol(ped: Ped, patrolRoute: string | number, p2: any, p3: boolean, p4: boolean): void;

/**
   * TASK_PAUSE
   * This tasks the ped to do nothing for the specified amount of milliseconds.
   * This is useful if you want to add a delay between tasks when using a sequence task.
   *
   * @param {number} ped
   * @param {number} ms
   * @return {void}
   */
declare function TaskPause(ped: Ped, ms: number): void;

/**
   * TASK_PED_SLIDE_TO_COORD
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} heading
   * @param {number} p5
   * @return {void}
   */
declare function TaskPedSlideToCoord(ped: Ped, x: number, y: number, z: number, heading: number, p5: number): void;

/**
   * TASK_PERFORM_SEQUENCE
   *
   * @param {number} ped
   * @param {number} taskSequenceId
   * @return {void}
   */
declare function TaskPerformSequence(ped: Ped, taskSequenceId: number): void;

/**
   * TASK_PERFORM_SEQUENCE_FROM_PROGRESS
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function TaskPerformSequenceFromProgress(ped: Ped, p1: any, p2: any, p3: any): void;

/**
   * TASK_PERSISTENT_CHARACTER
   *
   * @param {number} ped
   * @return {void}
   */
declare function TaskPersistentCharacter(ped: Ped): void;

/**
   * TASK_PICKUP_CARRIABLE_ENTITY
   *
   * @param {number} ped
   * @param {number} entity
   * @return {void}
   */
declare function TaskPickupCarriableEntity(ped: Ped, entity: Entity): void;

/**
   * TASK_PICK_UP_WEAPON
   *
   * @param {number} ped
   * @param {any} p1
   * @return {void}
   */
declare function TaskPickUpWeapon(ped: Ped, p1: any): void;

/**
   * TASK_PLACE_CARRIED_ENTITY_AT_COORD
   *
   * @param {number} ped
   * @param {number} entity
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} p5
   * @param {number} flags
   * @return {void}
   */
declare function TaskPlaceCarriedEntityAtCoord(ped: Ped, entity: Entity, x: number, y: number, z: number, p5: number, flags: number): void;

/**
   * TASK_PLACE_CARRIED_ENTITY_ON_MOUNT
   *
   * @param {number} ped
   * @param {number} entity
   * @param {number} mount
   * @param {number} p3
   * @return {void}
   */
declare function TaskPlaceCarriedEntityOnMount(ped: Ped, entity: Entity, mount: Ped, p3: number): void;

/**
   * TASK_PLANT_BOMB
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} heading
   * @return {void}
   */
declare function TaskPlantBomb(ped: Ped, x: number, y: number, z: number, heading: number): void;

/**
   * TASK_PLAY_ANIM
   * https://github.com/femga/rdr3_discoveries/tree/master/animations
   * flags: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/eScriptedAnimFlags
   * ikFlags: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/eIkControlFlags 
   *
   * @param {number} ped
   * @param {string | number} animDict
   * @param {string | number} animName
   * @param {number} speed
   * @param {number} speedMultiplier
   * @param {number} duration
   * @param {number} flags
   * @param {number} playbackRate
   * @param {boolean} p8
   * @param {number} ikFlags
   * @param {boolean} p10
   * @param {string | number} taskFilter
   * @param {boolean} p12
   * @return {void}
   */
declare function TaskPlayAnim(ped: Ped, animDict: string | number, animName: string | number, speed: number, speedMultiplier: number, duration: number, flags: number, playbackRate: number, p8: boolean, ikFlags: number, p10: boolean, taskFilter: string | number, p12: boolean): void;

/**
   * TASK_PLAY_ANIM_ADVANCED
   * flags: see TASK_PLAY_ANIM
   * ikFlags: see TASK_PLAY_ANIM
   *
   * @param {number} ped
   * @param {string | number} animDict
   * @param {string | number} animName
   * @param {number} posX
   * @param {number} posY
   * @param {number} posZ
   * @param {number} rotX
   * @param {number} rotY
   * @param {number} rotZ
   * @param {number} speed
   * @param {number} speedMultiplier
   * @param {number} duration
   * @param {number} flags
   * @param {number} p13
   * @param {number} p14
   * @param {number} p15
   * @param {number} p16
   * @return {void}
   */
declare function TaskPlayAnimAdvanced(ped: Ped, animDict: string | number, animName: string | number, posX: number, posY: number, posZ: number, rotX: number, rotY: number, rotZ: number, speed: number, speedMultiplier: number, duration: number, flags: number, p13: number, p14: number, p15: number, p16: number): void;

/**
   * TASK_PLAY_EMOTE_WITH_HASH
   * https://github.com/femga/rdr3_discoveries/blob/master/animations/kit_emotes_list.lua
   * emote: https://alloc8or.re/rdr3/doc/enums/eEmote.txt
   * 
   * enum eEmoteType
   * {
   *   EMOTE_TYPE_INVALID = -1,
   *   EMOTE_TYPE_REACT,
   *   EMOTE_TYPE_ACTION,
   *   EMOTE_TYPE_TAUNT,
   *   EMOTE_TYPE_GREET,
   *   EMOTE_TYPE_TWIRL_GUN,
   *   EMOTE_TYPE_DANCE_FLOOR
   * };
   * 
   * enum eEmotePlaybackMode
   * {
   *   EMOTE_PM_INVALID = -1,
   *   EMOTE_PM_UPPERBODY,
   *   EMOTE_PM_UPPERBODY_LOOP,
   *   EMOTE_PM_FULLBODY,
   * };
   *
   * @param {number} ped
   * @param {number} emoteType
   * @param {number} playbackMode
   * @param {number} emote
   * @param {boolean} isSecondaryTask
   * @param {boolean} canBreakOut
   * @param {boolean} disableEarlyOutAnimTag
   * @param {boolean} ignoreInvalidMainTask
   * @param {boolean} destroyProps
   * @return {void}
   */
declare function TaskPlayEmoteWithHash(ped: Ped, emoteType: number, playbackMode: number, emote: Hash, isSecondaryTask: boolean, canBreakOut: boolean, disableEarlyOutAnimTag: boolean, ignoreInvalidMainTask: boolean, destroyProps: boolean): void;

/**
   * TASK_PLAY_UPPER_ANIM_FACING_ENTITY
   *
   * @param {number} ped
   * @param {string | number} animDict
   * @param {string | number} animName
   * @param {number} entity
   * @param {number} p4
   * @param {number} p5
   * @param {number} p6
   * @param {number} p7
   * @param {number} p8
   * @param {boolean} p9
   * @param {boolean} p10
   * @param {number} p11
   * @param {string | number} p12
   * @param {number} p13
   * @param {number} p14
   * @return {void}
   */
declare function TaskPlayUpperAnimFacingEntity(ped: Ped, animDict: string | number, animName: string | number, entity: Entity, p4: number, p5: number, p6: number, p7: number, p8: number, p9: boolean, p10: boolean, p11: number, p12: string | number, p13: number, p14: number): void;

/**
   * TASK_POLICE
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {boolean}
   */
declare function TaskPolice(ped: Ped, p1: boolean): boolean;

/**
   * TASK_PUT_PED_DIRECTLY_INTO_COVER
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} timeout
   * @param {boolean} p5
   * @param {number} p6
   * @param {any} p7
   * @param {any} p8
   * @param {number} coverpoint
   * @param {boolean} p10
   * @param {boolean} p11
   * @param {any} p12
   * @return {void}
   */
declare function TaskPutPedDirectlyIntoCover(ped: Ped, x: number, y: number, z: number, timeout: number, p5: boolean, p6: number, p7: any, p8: any, coverpoint: ScrHandle, p10: boolean, p11: boolean, p12: any): void;

/**
   * TASK_PUT_PED_DIRECTLY_INTO_GRAPPLE
   * grappleStyle: AR_GRAPPLE_STRUGGLE, AR_ALLIGATOR_LEG_GRAB_CHALLENGE_FAIL, AR_GRAPPLE_BACK_FROM_BACK, AR_GRAPPLE_BACK_DEFEND, AR_GRAPPLE_FRONT_FROM_FRONT
   *
   * @param {number} ped
   * @param {number} grappleTarget
   * @param {number} grappleStyle
   * @param {number} p3
   * @param {number} p4
   * @param {boolean} p5
   * @param {number} p6
   * @return {void}
   */
declare function TaskPutPedDirectlyIntoGrapple(ped: Ped, grappleTarget: Ped, grappleStyle: Hash, p3: number, p4: number, p5: boolean, p6: number): void;

/**
   * TASK_PUT_PED_DIRECTLY_INTO_MELEE
   * meleeStyles: AR_GRAPPLE_BACK_FROM_BACK, AR_GRAPPLE_MOUNT_FACEDOWN_FROM_FRONT, AR_ALLIGATOR_LEAPKILL, AR_ALLIGATOR_WAIST_AUTOKILL_FRONT
   *
   * @param {number} ped
   * @param {number} meleeTarget
   * @param {number} meleeStyle
   * @param {number} p3
   * @param {number} animBlendRatio
   * @param {boolean} p5
   * @param {number} p6
   * @return {void}
   */
declare function TaskPutPedDirectlyIntoMelee(ped: Ped, meleeTarget: Ped, meleeStyle: Hash, p3: number, animBlendRatio: number, p5: boolean, p6: number): void;

/**
   * TASK_REACT
   * Makes a ped react to an entity.
   * Params: reactingTo Entity can be 0, p8 is always 4
   *
   * @param {number} ped
   * @param {number} reactingTo
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {string | number} reactionName
   * @param {number} p6
   * @param {number} p7
   * @param {number} p8
   * @return {void}
   */
declare function TaskReact(ped: Ped, reactingTo: Entity, x: number, y: number, z: number, reactionName: string | number, p6: number, p7: number, p8: number): void;

/**
   * TASK_RELOAD_WEAPON
   *
   * @param {number} ped
   * @param {boolean} unused
   * @return {void}
   */
declare function TaskReloadWeapon(ped: Ped, unused: boolean): void;

/**
   * TASK_REVIVE_TARGET
   *
   * @param {number} ped
   * @param {number} reviver
   * @param {number} tool
   * @return {void}
   */
declare function TaskReviveTarget(ped: Ped, reviver: Ped, tool: Hash): void;

/**
   * TASK_RIDE_TRAIN
   *
   * @param {number} ped
   * @param {number} train
   * @param {number} scenarioPoint
   * @param {number} scenarioHash
   * @return {void}
   */
declare function TaskRideTrain(ped: Ped, train: Vehicle, scenarioPoint: number, scenarioHash: Hash): void;

/**
   * TASK_ROB_PED
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {void}
   */
declare function TaskRobPed(ped: Ped, p1: any, p2: any, p3: any, p4: any): void;

/**
   * TASK_SCRIPTED_ANIMATION
   *
   * @param {number} ped
   * @param {DataView} args
   * @return {void}
   */
declare function TaskScriptedAnimation(ped: Ped, args: DataView): void;

/**
   * TASK_SEEK_CLEAR_LOS_TO_ENTITY
   *
   * @param {number} ped
   * @param {number} entity
   * @param {number} p2
   * @param {number} p3
   * @param {number} p4
   * @return {void}
   */
declare function TaskSeekClearLosToEntity(ped: Ped, entity: Entity, p2: number, p3: number, p4: number): void;

/**
   * TASK_SEEK_COVER_FROM_PED
   *
   * @param {number} ped
   * @param {number} fromPed
   * @param {number} duration
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @return {void}
   */
declare function TaskSeekCoverFromPed(ped: Ped, fromPed: Ped, duration: number, p3: any, p4: any, p5: any): void;

/**
   * TASK_SEEK_COVER_FROM_POS
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} duration
   * @param {any} p5
   * @param {any} p6
   * @param {any} p7
   * @return {void}
   */
declare function TaskSeekCoverFromPos(ped: Ped, x: number, y: number, z: number, duration: number, p5: any, p6: any, p7: any): void;

/**
   * TASK_SEEK_COVER_TO_COORDS
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @param {any} p7
   * @param {any} p8
   * @param {any} p9
   * @param {any} p10
   * @return {void}
   */
declare function TaskSeekCoverToCoords(ped: Ped, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any, p10: any): void;

/**
   * TASK_SEEK_COVER_TO_COVER_POINT
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @param {any} p7
   * @param {any} p8
   * @return {void}
   */
declare function TaskSeekCoverToCoverPoint(ped: Ped, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;

/**
   * TASK_SET_BLOCKING_OF_NON_TEMPORARY_EVENTS
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function TaskSetBlockingOfNonTemporaryEvents(ped: Ped, toggle: boolean): void;

/**
   * TASK_SET_CROUCH_MOVEMENT
   *
   * @param {number} ped
   * @param {boolean} p1
   * @param {any} p2
   * @param {boolean} p3
   * @return {void}
   */
declare function TaskSetCrouchMovement(ped: Ped, p1: boolean, p2: any, p3: boolean): void;

/**
   * TASK_SET_SPHERE_DEFENSIVE_AREA
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {number} p4
   * @return {void}
   */
declare function TaskSetSphereDefensiveArea(ped: Ped, p1: number, p2: number, p3: number, p4: number): void;

/**
   * TASK_SET_STEALTH_MOVEMENT
   *
   * @param {number} ped
   * @param {boolean} p1
   * @param {any} p2
   * @param {boolean} p3
   * @return {void}
   */
declare function TaskSetStealthMovement(ped: Ped, p1: boolean, p2: any, p3: boolean): void;

/**
   * TASK_SHOCKING_EVENT_REACT
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function TaskShockingEventReact(ped: Ped, p1: any, p2: any): void;

/**
   * TASK_SHOOT_AT_COORD
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} duration
   * @param {number} firingPattern
   * @param {any} p6
   * @return {void}
   */
declare function TaskShootAtCoord(ped: Ped, x: number, y: number, z: number, duration: number, firingPattern: Hash, p6: any): void;

/**
   * TASK_SHOOT_AT_ENTITY
   *
   * @param {number} entity
   * @param {number} targetEntity
   * @param {number} duration
   * @param {number} firingPattern
   * @param {boolean} affectCockedState
   * @return {void}
   */
declare function TaskShootAtEntity(entity: Entity, targetEntity: Entity, duration: number, firingPattern: Hash, affectCockedState: boolean): void;

/**
   * TASK_SHOOT_WITH_WEAPON
   *
   * @param {number} ped
   * @param {DataView} args
   * @return {void}
   */
declare function TaskShootWithWeapon(ped: Ped, args: DataView): void;

/**
   * TASK_SHUFFLE_TO_NEXT_VEHICLE_SEAT
   * Makes the specified ped shuffle to the next vehicle seat.
   * The ped MUST be in a vehicle and the vehicle parameter MUST be the ped's current vehicle.
   *
   * @param {number} ped
   * @param {number} vehicle
   * @return {void}
   */
declare function TaskShuffleToNextVehicleSeat(ped: Ped, vehicle: Vehicle): void;

/**
   * TASK_SMART_FLEE_COORD
   * Makes the specified ped flee the specified distance from the specified position.
   * fleeType: see TASK_FLEE_COORD
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} distance
   * @param {number} time
   * @param {number} fleeType
   * @param {number} fleeSpeed
   * @return {void}
   */
declare function TaskSmartFleeCoord(ped: Ped, x: number, y: number, z: number, distance: number, time: number, fleeType: number, fleeSpeed: number): void;

/**
   * TASK_SMART_FLEE_PED
   * Makes a ped run away from another ped (fleeFromTarget)
   * 
   * fleeDistance = ped will flee this distance
   * fleeTime = ped will flee for this amount of time, set to "-1" to flee forever
   * fleeType = see TASK_FLEE_COORD, can be 0, R* Scripts: fm_mission/race_controller: 66048; fme_escaped_convicts: 2260992, 2523136, 2359296; la_alligator/fox: 2097152; net_fetch: 17301536; net_stable_mount: 540928
   * fleeSpeed = mostly 3f, rarely 1f in R* Scripts
   *
   * @param {number} ped
   * @param {number} fleeFromTarget
   * @param {number} fleeDistance
   * @param {number} fleeTime
   * @param {number} fleeType
   * @param {number} fleeSpeed
   * @param {number} targetPed
   * @return {void}
   */
declare function TaskSmartFleePed(ped: Ped, fleeFromTarget: Ped, fleeDistance: number, fleeTime: number, fleeType: number, fleeSpeed: number, targetPed: Ped): void;

/**
   * TASK_STAND_GUARD
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} heading
   * @param {string | number} scenarioName
   * @return {void}
   */
declare function TaskStandGuard(ped: Ped, x: number, y: number, z: number, heading: number, scenarioName: string | number): void;

/**
   * TASK_STAND_STILL
   * Makes the specified ped stand still for (time) milliseconds.
   *
   * @param {number} ped
   * @param {number} time
   * @return {void}
   */
declare function TaskStandStill(ped: Ped, time: number): void;

/**
   * TASK_START_SCENARIO_AT_POSITION
   *
   * @param {number} ped
   * @param {number} scenarioHash
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} heading
   * @param {number} duration
   * @param {boolean} sittingScenario
   * @param {boolean} teleport
   * @param {string | number} p9
   * @param {number} p10
   * @param {boolean} p11
   * @return {void}
   */
declare function TaskStartScenarioAtPosition(ped: Ped, scenarioHash: Hash, x: number, y: number, z: number, heading: number, duration: number, sittingScenario: boolean, teleport: boolean, p9: string | number, p10: number, p11: boolean): void;

/**
   * TASK_START_SCENARIO_IN_PLACE_HASH
   * https://github.com/femga/rdr3_discoveries/blob/master/animations/scenarios
   * Params: duration in milliseconds
   * 
   * conditionalHash (optionally):
   * 0 = play random conditional anim.
   * Every conditional anim has requirements to play it.
   * If requirements are not met, ped plays random allowed conditional anim or can be stuck.
   * For example, this scenario type has possible conditional anim WORLD_HUMAN_LEAN_BACK_WALL_SMOKING_MALE_D, but it can not be played by player, because condition is set to NOT be CAIConditionIsPlayer (check file amb_rest.meta and amb_rest_CA.meta with OPENIV to clarify requirements).
   *
   * @param {number} ped
   * @param {number} scenarioHash
   * @param {number} duration
   * @param {boolean} playEnterAnim
   * @param {number} conditionalHash
   * @param {number} heading
   * @param {boolean} p6
   * @return {void}
   */
declare function TaskStartScenarioInPlaceHash(ped: Ped, scenarioHash: Hash, duration: number, playEnterAnim: boolean, conditionalHash: Hash, heading: number, p6: boolean): void;

/**
   * TASK_STAY_IN_COVER
   * Makes the ped run to take cover
   *
   * @param {number} ped
   * @return {void}
   */
declare function TaskStayInCover(ped: Ped): void;

/**
   * TASK_STOP_LEADING_HORSE
   *
   * @param {number} ped
   * @return {void}
   */
declare function TaskStopLeadingHorse(ped: Ped): void;

/**
   * TASK_SWAP_FISHING_BAIT
   * Baits: see 0x9B0C7FA063E67629
   *
   * @param {number} ped
   * @param {string | number} bait
   * @param {boolean} withoutBuoy
   * @return {void}
   */
declare function TaskSwapFishingBait(ped: Ped, bait: string | number, withoutBuoy: boolean): void;

/**
   * TASK_SWAP_WEAPON
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {void}
   */
declare function TaskSwapWeapon(ped: Ped, p1: any, p2: any, p3: any, p4: any): void;

/**
   * TASK_THROW_PROJECTILE
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function TaskThrowProjectile(ped: Ped, p1: any, p2: any, p3: any): void;

/**
   * TASK_TURN_PED_TO_FACE_COORD
   * duration in milliseconds
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} duration
   * @return {void}
   */
declare function TaskTurnPedToFaceCoord(ped: Ped, x: number, y: number, z: number, duration: number): void;

/**
   * TASK_TURN_PED_TO_FACE_ENTITY
   * duration: the amount of time in milliseconds to do the task. -1 will keep the task going until either another task is applied, or CLEAR_ALL_TASKS() is called with the ped
   *
   * @param {number} ped
   * @param {number} targetEntity
   * @param {number} duration
   * @param {number} p3
   * @param {number} p4
   * @param {number} p5
   * @return {void}
   */
declare function TaskTurnPedToFaceEntity(ped: Ped, targetEntity: Entity, duration: number, p3: number, p4: number, p5: number): void;

/**
   * TASK_TURN_TO_FACE_CLOSEST_PED
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @return {void}
   */
declare function TaskTurnToFaceClosestPed(ped: Ped, p1: number, p2: number, p3: number): void;

/**
   * TASK_USE_NEAREST_SCENARIO_CHAIN_TO_COORD
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} distance
   * @param {boolean} p5
   * @param {boolean} p6
   * @param {boolean} p7
   * @param {boolean} p8
   * @return {void}
   */
declare function TaskUseNearestScenarioChainToCoord(ped: Ped, x: number, y: number, z: number, distance: number, p5: boolean, p6: boolean, p7: boolean, p8: boolean): void;

/**
   * TASK_USE_NEAREST_SCENARIO_CHAIN_TO_COORD_WARP
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} distance
   * @param {boolean} p5
   * @param {boolean} p6
   * @param {boolean} p7
   * @param {boolean} p8
   * @return {void}
   */
declare function TaskUseNearestScenarioChainToCoordWarp(ped: Ped, x: number, y: number, z: number, distance: number, p5: boolean, p6: boolean, p7: boolean, p8: boolean): void;

/**
   * TASK_USE_NEAREST_SCENARIO_TO_COORD_WARP
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} distance
   * @param {number} duration
   * @param {boolean} p6
   * @param {boolean} p7
   * @param {boolean} p8
   * @param {boolean} p9
   * @return {void}
   */
declare function TaskUseNearestScenarioToCoordWarp(ped: Ped, x: number, y: number, z: number, distance: number, duration: number, p6: boolean, p7: boolean, p8: boolean, p9: boolean): void;

/**
   * TASK_USE_NEAREST_TRAIN_SCENARIO_TO_COORD_WARP
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} distance
   * @return {void}
   */
declare function TaskUseNearestTrainScenarioToCoordWarp(ped: Ped, x: number, y: number, z: number, distance: number): void;

/**
   * TASK_USE_RANDOM_SCENARIO_IN_GROUP
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {void}
   */
declare function TaskUseRandomScenarioInGroup(ped: Ped, p1: any, p2: any, p3: any, p4: any): void;

/**
   * TASK_USE_SCENARIO_POINT
   *
   * @param {number} ped
   * @param {number} scenario
   * @param {string | number} conditionalAnim
   * @param {number} p3
   * @param {boolean} p4
   * @param {boolean} p5
   * @param {number} p6
   * @param {boolean} p7
   * @param {number} p8
   * @param {boolean} p9
   * @return {void}
   */
declare function TaskUseScenarioPoint(ped: Ped, scenario: number, conditionalAnim: string | number, p3: number, p4: boolean, p5: boolean, p6: Hash, p7: boolean, p8: number, p9: boolean): void;

/**
   * TASK_VEHICLE_AIM_AT_COORD
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {void}
   */
declare function TaskVehicleAimAtCoord(ped: Ped, x: number, y: number, z: number): void;

/**
   * TASK_VEHICLE_AIM_AT_PED
   *
   * @param {number} ped
   * @param {number} target
   * @return {void}
   */
declare function TaskVehicleAimAtPed(ped: Ped, target: Ped): void;

/**
   * TASK_VEHICLE_DRIVE_STRAIGHT_TO_POINT
   * Old name: _TASK_VEHICLE_DRIVE_TO_POINT
   * flag: 524419 and 0 in shop_horse_shop R* Script
   *
   * @param {number} driver
   * @param {number} vehicle
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} p5
   * @param {number} p6
   * @param {number} flag
   * @return {void}
   */
declare function TaskVehicleDriveStraightToPoint(driver: Ped, vehicle: Vehicle, x: number, y: number, z: number, p5: number, p6: number, flag: number): void;

/**
   * TASK_VEHICLE_DRIVE_TO_COORD
   * stopRange: how close vehicle will get to destination before stopping, default 4.0
   * straightLineDist: distance at which AI switches to heading for target directly instead of following nodes, default -1
   *
   * @param {number} ped
   * @param {number} vehicle
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} speed
   * @param {any} style
   * @param {number} vehicleModel
   * @param {number} drivingMode
   * @param {number} stopRange
   * @param {number} straightLineDist
   * @return {void}
   */
declare function TaskVehicleDriveToCoord(ped: Ped, vehicle: Vehicle, x: number, y: number, z: number, speed: number, style: any, vehicleModel: Hash, drivingMode: number, stopRange: number, straightLineDist: number): void;

/**
   * TASK_VEHICLE_DRIVE_TO_DESTINATION
   * flags: 67108864, 2097152, 524564, 524675 (eDrivingFlags)
   * p7 = 6 or 3
   * p8 = x coordinate
   * p9 - 8.f
   * p10 = false
   *
   * @param {number} driver
   * @param {number} vehicle
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} speed
   * @param {number} drivingFlags
   * @param {number} p7
   * @param {number} stoppingRange1
   * @param {number} stoppingRange2
   * @param {boolean} p10
   * @return {void}
   */
declare function TaskVehicleDriveToDestination(driver: Ped, vehicle: Vehicle, x: number, y: number, z: number, speed: number, drivingFlags: number, p7: number, stoppingRange1: number, stoppingRange2: number, p10: boolean): void;

/**
   * TASK_VEHICLE_DRIVE_WANDER
   *
   * @param {number} ped
   * @param {number} vehicle
   * @param {number} speed
   * @param {number} drivingStyle
   * @return {void}
   */
declare function TaskVehicleDriveWander(ped: Ped, vehicle: Vehicle, speed: number, drivingStyle: number): void;

/**
   * TASK_VEHICLE_ESCORT
   *
   * @param {number} ped
   * @param {number} vehicle
   * @param {number} targetVehicle
   * @param {number} mode
   * @param {number} speed
   * @param {number} drivingStyle
   * @param {number} minDistance
   * @param {number} p7
   * @param {number} noRoadsDistance
   * @return {void}
   */
declare function TaskVehicleEscort(ped: Ped, vehicle: Vehicle, targetVehicle: Vehicle, mode: number, speed: number, drivingStyle: number, minDistance: number, p7: number, noRoadsDistance: number): void;

/**
   * TASK_VEHICLE_FOLLOW_WAYPOINT_RECORDING
   *
   * @param {number} ped
   * @param {number} vehicle
   * @param {string | number} waypointRecording
   * @param {number} drivingMode
   * @param {any} p4
   * @param {number} eWaypoint
   * @param {number} flag
   * @param {number} p7
   * @param {boolean} p8
   * @param {number} stoppingDist
   * @param {any} p10
   * @return {void}
   */
declare function TaskVehicleFollowWaypointRecording(ped: Ped, vehicle: Vehicle, waypointRecording: string | number, drivingMode: number, p4: any, eWaypoint: number, flag: number, p7: number, p8: boolean, stoppingDist: number, p10: any): void;

/**
   * TASK_VEHICLE_GOTO_NAVMESH
   *
   * @param {number} ped
   * @param {number} vehicle
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} speed
   * @param {number} behaviorFlag
   * @param {number} stoppingRange
   * @return {void}
   */
declare function TaskVehicleGotoNavmesh(ped: Ped, vehicle: Vehicle, x: number, y: number, z: number, speed: number, behaviorFlag: number, stoppingRange: number): void;

/**
   * TASK_VEHICLE_MISSION
   *
   * @param {number} driver
   * @param {number} vehicle
   * @param {number} vehicleTarget
   * @param {number} missionType
   * @param {number} p4
   * @param {any} p5
   * @param {number} p6
   * @param {number} p7
   * @param {boolean} driveAgainstTraffic
   * @return {void}
   */
declare function TaskVehicleMission(driver: Ped, vehicle: Vehicle, vehicleTarget: Vehicle, missionType: number, p4: number, p5: any, p6: number, p7: number, DriveAgainstTraffic: boolean): void;

/**
   * TASK_VEHICLE_MISSION_PED_TARGET
   * See TASK_VEHICLE_MISSION
   *
   * @param {number} ped
   * @param {number} vehicle
   * @param {number} pedTarget
   * @param {number} mode
   * @param {number} maxSpeed
   * @param {number} drivingStyle
   * @param {number} minDistance
   * @param {number} p7
   * @param {boolean} driveAgainstTraffic
   * @return {void}
   */
declare function TaskVehicleMissionPedTarget(ped: Ped, vehicle: Vehicle, pedTarget: Ped, mode: number, maxSpeed: number, drivingStyle: number, minDistance: number, p7: number, DriveAgainstTraffic: boolean): void;

/**
   * TASK_VEHICLE_SHOOT_AT_COORD
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} p4
   * @return {void}
   */
declare function TaskVehicleShootAtCoord(ped: Ped, x: number, y: number, z: number, p4: number): void;

/**
   * TASK_VEHICLE_SHOOT_AT_PED
   *
   * @param {number} ped
   * @param {number} target
   * @param {number} p2
   * @return {void}
   */
declare function TaskVehicleShootAtPed(ped: Ped, target: Ped, p2: number): void;

/**
   * TASK_VEHICLE_TEMP_ACTION
   * Documentation from GTA V, might be the same in RDR:
   * 
   * '1 - brake
   * '3 - brake + reverse
   * '4 - turn left 90 + braking
   * '5 - turn right 90 + braking
   * '6 - brake strong (handbrake?) until time ends
   * '7 - turn left + accelerate
   * '7 - turn right + accelerate
   * '9 - weak acceleration
   * '10 - turn left + restore wheel pos to center in the end
   * '11 - turn right + restore wheel pos to center in the end
   * '13 - turn left + go reverse
   * '14 - turn left + go reverse
   * '16 - crash the game after like 2 seconds :)
   * '17 - keep actual state, game crashed after few tries
   * '18 - game crash
   * '19 - strong brake + turn left/right
   * '20 - weak brake + turn left then turn right
   * '21 - weak brake + turn right then turn left
   * '22 - brake + reverse
   * '23 - accelerate fast
   * '24 - brake
   * '25 - brake turning left then when almost stopping it turns left more
   * '26 - brake turning right then when almost stopping it turns right more
   * '27 - brake until car stop or until time ends
   * '28 - brake + strong reverse acceleration
   * '30 - performs a burnout (brake until stop + brake and accelerate)
   * '31 - accelerate + handbrake
   * '32 - accelerate very strong
   * 
   * Seems to be this:
   * Works on NPCs, but overrides their current task. If inside a task sequence (and not being the last task), "time" will work, otherwise the task will be performed forever until tasked with something else
   *
   * @param {number} driver
   * @param {number} vehicle
   * @param {number} action
   * @param {number} time
   * @return {void}
   */
declare function TaskVehicleTempAction(driver: Ped, vehicle: Vehicle, action: number, time: number): void;

/**
   * TASK_WALK_AWAY
   *
   * @param {number} ped
   * @param {number} entity
   * @return {void}
   */
declare function TaskWalkAway(ped: Ped, entity: Entity): void;

/**
   * TASK_WANDER_AND_CONVERSE_WITH_PED
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function TaskWanderAndConverseWithPed(ped: Ped, p1: any, p2: any, p3: any): void;

/**
   * TASK_WANDER_IN_AREA
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @param {number} p5
   * @param {number} p6
   * @param {number} p7
   * @return {void}
   */
declare function TaskWanderInArea(ped: Ped, x: number, y: number, z: number, radius: number, p5: number, p6: number, p7: number): void;

/**
   * TASK_WANDER_IN_VOLUME
   *
   * @param {number} ped
   * @param {number} volume
   * @param {number} p2
   * @param {number} p3
   * @param {number} p4
   * @return {void}
   */
declare function TaskWanderInVolume(ped: Ped, volume: Volume, p2: number, p3: number, p4: number): void;

/**
   * TASK_WANDER_STANDARD
   * Makes ped walk around the area the params p1 p2 seems to not affect anything but p2 is either 0 or 1 and p1 is mostly 1.0 or ped heading
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} p2
   * @return {void}
   */
declare function TaskWanderStandard(ped: Ped, p1: number, p2: number): void;

/**
   * TASK_WANDER_SWIM
   *
   * @param {number} ped
   * @param {any} p1
   * @return {void}
   */
declare function TaskWanderSwim(ped: Ped, p1: any): void;

/**
   * TASK_WARP_PED_INTO_VEHICLE
   *
   * @param {number} ped
   * @param {number} vehicle
   * @param {number} seat
   * @return {void}
   */
declare function TaskWarpPedIntoVehicle(ped: Ped, vehicle: Vehicle, seat: number): void;

/**
   * TASK_WEAPON
   *
   * @param {number} ped
   * @return {void}
   */
declare function TaskWeapon(ped: Ped): void;

/**
   * TASK_WHISTLE_ANIM
   * https://github.com/femga/rdr3_discoveries/blob/master/AI/EVENTS/aud_ped_whistle_types.lua
   * p2: UNSPECIFIED
   *
   * @param {number} ped
   * @param {number} audPedWhistleType
   * @param {number} p2
   * @return {void}
   */
declare function TaskWhistleAnim(ped: Ped, audPedWhistleType: Hash, p2: Hash): void;

/**
   * UNCUFF_PED
   *
   * @param {number} ped
   * @return {void}
   */
declare function UncuffPed(ped: Ped): void;

/**
   * UNHOGTIE_PED
   * getupSetHash: see nm_blend_out_sets.meta
   *
   * @param {number} ped
   * @param {number} flags
   * @param {number} getupSetHash
   * @param {string | number} p3
   * @param {string | number} p4
   * @param {number} p5
   * @return {void}
   */
declare function UnhogtiePed(ped: Ped, flags: number, getupSetHash: Hash, p3: string | number, p4: string | number, p5: number): void;

/**
   * UPDATE_TASK_HANDS_UP_DURATION
   *
   * @param {number} ped
   * @param {number} duration
   * @return {void}
   */
declare function UpdateTaskHandsUpDuration(ped: Ped, duration: number): void;

/**
   * USE_WAYPOINT_RECORDING_AS_ASSISTED_MOVEMENT_ROUTE
   *
   * @param {string | number} waypointRecording
   * @param {boolean} p1
   * @param {number} p2
   * @param {number} p3
   * @param {boolean} p4
   * @return {void}
   */
declare function UseWaypointRecordingAsAssistedMovementRoute(waypointRecording: string | number, p1: boolean, p2: number, p3: number, p4: boolean): void;

/**
   * VEHICLE_WAYPOINT_PLAYBACK_GET_IS_PAUSED
   *
   * @param {any} p0
   * @return {any}
   */
declare function VehicleWaypointPlaybackGetIsPaused(p0: any): any;

/**
   * VEHICLE_WAYPOINT_PLAYBACK_OVERRIDE_SPEED
   *
   * @param {number} vehicle
   * @param {number} speed
   * @return {void}
   */
declare function VehicleWaypointPlaybackOverrideSpeed(vehicle: Vehicle, speed: number): void;

/**
   * VEHICLE_WAYPOINT_PLAYBACK_PAUSE
   *
   * @param {number} vehicle
   * @return {void}
   */
declare function VehicleWaypointPlaybackPause(vehicle: Vehicle): void;

/**
   * VEHICLE_WAYPOINT_PLAYBACK_RESUME
   *
   * @param {number} vehicle
   * @return {void}
   */
declare function VehicleWaypointPlaybackResume(vehicle: Vehicle): void;

/**
   * VEHICLE_WAYPOINT_PLAYBACK_USE_DEFAULT_SPEED
   *
   * @param {number} vehicle
   * @return {void}
   */
declare function VehicleWaypointPlaybackUseDefaultSpeed(vehicle: Vehicle): void;

/**
   * WAYPOINT_PLAYBACK_GET_IS_AIMING
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function WaypointPlaybackGetIsAiming(ped: Ped): boolean;

/**
   * WAYPOINT_PLAYBACK_GET_IS_PAUSED
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function WaypointPlaybackGetIsPaused(ped: Ped): boolean;

/**
   * WAYPOINT_PLAYBACK_GET_IS_SHOOTING
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function WaypointPlaybackGetIsShooting(ped: Ped): boolean;

/**
   * WAYPOINT_PLAYBACK_OVERRIDE_SPEED
   *
   * @param {number} ped
   * @param {number} speed
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {void}
   */
declare function WaypointPlaybackOverrideSpeed(ped: Ped, speed: number, p2: any, p3: any, p4: any): void;

/**
   * WAYPOINT_PLAYBACK_PAUSE
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function WaypointPlaybackPause(ped: Ped, p1: any, p2: any, p3: any): void;

/**
   * WAYPOINT_PLAYBACK_RESUME
   *
   * @param {number} ped
   * @param {boolean} p1
   * @param {number} p2
   * @param {number} p3
   * @return {void}
   */
declare function WaypointPlaybackResume(ped: Ped, p1: boolean, p2: number, p3: number): void;

/**
   * WAYPOINT_PLAYBACK_START_AIMING_AT_COORD
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @return {void}
   */
declare function WaypointPlaybackStartAimingAtCoord(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;

/**
   * WAYPOINT_PLAYBACK_START_AIMING_AT_ENTITY
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function WaypointPlaybackStartAimingAtEntity(p0: any, p1: any, p2: any, p3: any): void;

/**
   * WAYPOINT_PLAYBACK_START_AIMING_AT_PED
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function WaypointPlaybackStartAimingAtPed(p0: any, p1: any, p2: any, p3: any): void;

/**
   * WAYPOINT_PLAYBACK_START_SHOOTING_AT_COORD
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
declare function WaypointPlaybackStartShootingAtCoord(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;

/**
   * WAYPOINT_PLAYBACK_START_SHOOTING_AT_ENTITY
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {void}
   */
declare function WaypointPlaybackStartShootingAtEntity(p0: any, p1: any, p2: any, p3: any, p4: any): void;

/**
   * WAYPOINT_PLAYBACK_START_SHOOTING_AT_PED
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {void}
   */
declare function WaypointPlaybackStartShootingAtPed(p0: any, p1: any, p2: any, p3: any, p4: any): void;

/**
   * WAYPOINT_PLAYBACK_STOP_AIMING_OR_SHOOTING
   *
   * @param {any} p0
   * @return {void}
   */
declare function WaypointPlaybackStopAimingOrShooting(p0: any): void;

/**
   * WAYPOINT_PLAYBACK_USE_DEFAULT_SPEED
   *
   * @param {number} ped
   * @return {void}
   */
declare function WaypointPlaybackUseDefaultSpeed(ped: Ped): void;

/**
   * WAYPOINT_RECORDING_GET_CLOSEST_WAYPOINT
   *
   * @param {string | number} waypointRecording
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} point
   * @return {boolean}
   */
declare function WaypointRecordingGetClosestWaypoint(waypointRecording: string | number, x: number, y: number, z: number, point: number): boolean;

/**
   * WAYPOINT_RECORDING_GET_COORD
   *
   * @param {string | number} waypointRecording
   * @param {number} point
   * @return {[boolean, Vector3]}
   */
declare function WaypointRecordingGetCoord(waypointRecording: string | number, point: number): [boolean, Vector3];

/**
   * WAYPOINT_RECORDING_GET_NUM_POINTS
   *
   * @param {string | number} waypointRecording
   * @param {number} points
   * @return {boolean}
   */
declare function WaypointRecordingGetNumPoints(waypointRecording: string | number, points: number): boolean;

/**
   * WAYPOINT_RECORDING_GET_SPEED_AT_POINT
   *
   * @param {string | number} waypointRecording
   * @param {number} point
   * @return {number}
   */
declare function WaypointRecordingGetSpeedAtPoint(waypointRecording: string | number, point: number): number;

/**
   * _0x0000A8ACDC2E1B6A
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x0000A8ACDC2E1B6A(p0: any, p1: any): void;

/**
   * _0x00FFE0F85253C572
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x00FFE0F85253C572(p0: any): any;

/**
   * _0x01AF8A3729231A43
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x01AF8A3729231A43(p0: any): any;

/**
   * _0x0365000D8BF86531
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x0365000D8BF86531(p0: any): any;

/**
   * _0x03D741CB4052E26C
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x03D741CB4052E26C(p0: any): any;

/**
   * _SET_PED_PATH_MAY_USE_SLIDING_SURFACES
   *
   * @param {number} ped
   * @param {boolean} useSlidingSurfaces
   * @return {void}
   */
declare function SetPedPathMayUseSlidingSurfaces(ped: Ped, useSlidingSurfaces: boolean): void;

/**
   * _0x098036CAB8373D36
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x098036CAB8373D36(p0: any): void;

/**
   * _0x098CAA6DBE7D8D82
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x098CAA6DBE7D8D82(p0: any, p1: any): void;

/**
   * _0x0A98A362C5A19A43
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x0A98A362C5A19A43(p0: any): any;

/**
   * _0x0D322AEF8878B8FE
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x0D322AEF8878B8FE(p0: any, p1: any): void;

/**
   * _0x0E184495B27BB57D
   *
  
   * @return {void}
   */
declare function N_0x0E184495B27BB57D(): void;

/**
   * _0x0F4F6C4CE471259D
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x0F4F6C4CE471259D(p0: any, p1: any): void;

/**
   * _0x0FE797DD9F70DFA6
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function N_0x0FE797DD9F70DFA6(p0: any, p1: any, p2: any, p3: any): void;

/**
   * _0x10ADFDF07B7DFFBA
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {any}
   */
declare function N_0x10ADFDF07B7DFFBA(p0: any, p1: any, p2: any): any;

/**
   * _0x10C44F633E2D6D9E
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x10C44F633E2D6D9E(p0: any): void;

/**
   * _0x11C7CE1AE38911B5
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x11C7CE1AE38911B5(p0: any): any;

/**
   * _SET_PED_PATH_PREFER_TO_AVOID_FOLIAGE
   *
   * @param {number} ped
   * @param {boolean} preferAvoidFoliage
   * @param {number} p2
   * @return {void}
   */
declare function SetPedPathPreferToAvoidFoliage(ped: Ped, preferAvoidFoliage: boolean, p2: number): void;

/**
   * _0x141BC64C8D7C5529
   *
   * @param {number} vehicle
   * @return {void}
   */
declare function N_0x141BC64C8D7C5529(vehicle: Vehicle): void;

/**
   * _0x152664AA3188B193
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @return {any}
   */
declare function N_0x152664AA3188B193(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

/**
   * _0x1632EB9386CDBE64
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x1632EB9386CDBE64(p0: any, p1: any): void;

/**
   * _0x19BC99C678FBA139
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0x19BC99C678FBA139(p0: any, p1: any, p2: any): void;

/**
   * _0x1A7D63CB1B0BB223
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x1A7D63CB1B0BB223(p0: any): void;

/**
   * _0x1AC5A8AB50CFAA33
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x1AC5A8AB50CFAA33(p0: any): any;

/**
   * _IS_SCENARIO_IN_USE
   * Checks whether a specified scenario is currently being used (actively played) by any entity (player or ped). Returns true if the scenario is already occupied, otherwise false.
   *
   * @param {number} scenarioHash
   * @return {boolean}
   */
declare function IsScenarioInUse(scenarioHash: Hash): boolean;

/**
   * _0x1D125814EBC517EB
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function N_0x1D125814EBC517EB(p0: any, p1: any, p2: any, p3: any): void;

/**
   * _0x1ECF56C040FD839C
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x1ECF56C040FD839C(p0: any, p1: any): void;

/**
   * _0x1F298C7BD30D1240
   *
   * @param {number} ped
   * @return {void}
   */
declare function N_0x1F298C7BD30D1240(ped: Ped): void;

/**
   * _0x1F7A9A9C38C13A56
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x1F7A9A9C38C13A56(p0: any): any;

/**
   * _0x2064B33F6E6B92D4
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function N_0x2064B33F6E6B92D4(p0: any, p1: any, p2: any, p3: any): void;

/**
   * _SET_PED_PATH_PREFER_HORSE_WALKABLE
   *
   * @param {number} ped
   * @param {boolean} preferHorseWalkable
   * @param {number} p2
   * @return {void}
   */
declare function SetPedPathPreferHorseWalkable(ped: Ped, preferHorseWalkable: boolean, p2: number): void;

/**
   * _0x22CD2C33ED4467A1
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x22CD2C33ED4467A1(p0: any): any;

/**
   * _0x22CDBF317C40A122
   *
   * @param {number} ped
   * @return {void}
   */
declare function N_0x22CDBF317C40A122(ped: Ped): void;

/**
   * _0x23767D80C7EED7C6
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x23767D80C7EED7C6(p0: any, p1: any): void;

/**
   * _0x2416EC2F31F75266
   *
   * @param {number} entity
   * @param {number} targetEntity
   * @param {number} duration
   * @param {any} p3
   * @param {any} p4
   * @return {void}
   */
declare function N_0x2416EC2F31F75266(entity: Entity, targetEntity: Entity, duration: number, p3: any, p4: any): void;

/**
   * _0x244430C13BA5258E
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {any}
   */
declare function N_0x244430C13BA5258E(p0: any, p1: any, p2: any, p3: any): any;

/**
   * _0x28EF780BDEA8A639
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function N_0x28EF780BDEA8A639(ped: Ped, p1: number): void;

/**
   * _0x2948235DB2058E99
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x2948235DB2058E99(p0: any, p1: any): void;

/**
   * _0x2A10538D0A005E81
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x2A10538D0A005E81(p0: any, p1: any): void;

/**
   * _0x2B8AF29A78024BD3
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x2B8AF29A78024BD3(p0: any): void;

/**
   * _0x2C497BDEF897C6DF
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x2C497BDEF897C6DF(p0: any): any;

/**
   * _0x2D657B10F211C572
   *
   * @param {number} ped
   * @param {number} p1
   * @return {any}
   */
declare function N_0x2D657B10F211C572(ped: Ped, p1: number): any;

/**
   * _0x2E1D6D87346BB7D2
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function N_0x2E1D6D87346BB7D2(p0: any, p1: any, p2: any, p3: any): void;

/**
   * _0x2EB977293923C723
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x2EB977293923C723(p0: any, p1: any): void;

/**
   * _0x30146C25686B7836
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0x30146C25686B7836(p0: any, p1: any): any;

/**
   * _0x30B391915538EBE2
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x30B391915538EBE2(p0: any): void;

/**
   * _0x31BB338F64D5C861
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x31BB338F64D5C861(ped: Ped, p1: boolean): void;

/**
   * _0x351F74ED6177EBE7
   *
  
   * @return {any}
   */
declare function N_0x351F74ED6177EBE7(): any;

/**
   * _0x358A1A751B335A11
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x358A1A751B335A11(p0: any): void;

/**
   * _0x370F57C47F68EBCA
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x370F57C47F68EBCA(p0: any): any;

/**
   * _0x3ACC128510142B9D
   *
   * @param {string | number} waypointRecording
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {number}
   */
declare function N_0x3ACC128510142B9D(waypointRecording: string | number, x: number, y: number, z: number): number;

/**
   * _0x3BBEECC5B8F35318
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x3BBEECC5B8F35318(p0: any, p1: any): void;

/**
   * _0x3F8387DB1B9F31B7
   * Used for HORSE_REVIVE
   *
   * @param {DataView} scriptStruct
   * @param {boolean} p1
   * @return {boolean}
   */
declare function N_0x3F8387DB1B9F31B7(scriptStruct: DataView, p1: boolean): boolean;

/**
   * _0x3FEB770D8ED9047A
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x3FEB770D8ED9047A(p0: any): any;

/**
   * _0x3FFCD7BBA074CC80
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @param {any} p7
   * @param {any} p8
   * @return {void}
   */
declare function N_0x3FFCD7BBA074CC80(ped: Ped, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;

/**
   * _0x41323F4E0C4AE94B
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
declare function N_0x41323F4E0C4AE94B(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;

/**
   * _0x4161648394262FDF
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function N_0x4161648394262FDF(p0: any, p1: any, p2: any, p3: any): void;

/**
   * _0x41D1331AFAD5A091
   * _SET_PED_*
   *
   * @param {number} ped
   * @param {number} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0x41D1331AFAD5A091(ped: Ped, p1: number, p2: any): void;

/**
   * _SET_PED_PATH_NEVER_USE_INTERIORS
   *
   * @param {number} ped
   * @param {boolean} neverUseInteriors
   * @return {void}
   */
declare function SetPedPathNeverUseInteriors(ped: Ped, neverUseInteriors: boolean): void;

/**
   * _0x450080DDEDB91258
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x450080DDEDB91258(p0: any, p1: any): void;

/**
   * _0x4A7D73989F52EB37
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x4A7D73989F52EB37(p0: any, p1: any): void;

/**
   * _0x4BA972D0E5AD8122
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x4BA972D0E5AD8122(p0: any, p1: any): void;

/**
   * _0x4E806A395D43A458
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x4E806A395D43A458(p0: any): void;

/**
   * _0x4F57397388E1DFF8
   *
  
   * @return {void}
   */
declare function N_0x4F57397388E1DFF8(): void;

/**
   * _0x508F5053E3F6F0C4
   * Only used in R* SP Scripts
   * Params: p4 = 1.0f - 30.0f
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} p4
   * @return {boolean}
   */
declare function N_0x508F5053E3F6F0C4(ped: Ped, x: number, y: number, z: number, p4: number): boolean;

/**
   * _0x50AA09A0DA64E73C
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
declare function N_0x50AA09A0DA64E73C(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;

/**
   * _0x517D01BF27B682D1
   *
   * @param {number} ped
   * @param {number} entity
   * @param {number} p2
   * @param {number} p3
   * @param {number} p4
   * @param {number} p5
   * @param {number} p6
   * @return {void}
   */
declare function N_0x517D01BF27B682D1(ped: Ped, entity: Entity, p2: number, p3: number, p4: number, p5: number, p6: number): void;

/**
   * _0x5217B7B6DB78E1F3
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {void}
   */
declare function N_0x5217B7B6DB78E1F3(p0: any, p1: any, p2: any, p3: any, p4: any): void;

/**
   * _0x583AE9AF9CEE0958
   *
   * @param {number} vehicle
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {boolean}
   */
declare function N_0x583AE9AF9CEE0958(vehicle: Vehicle, x: number, y: number, z: number): boolean;

/**
   * _0x5952DFA38FA529FE
   *
  
   * @return {any}
   */
declare function N_0x5952DFA38FA529FE(): any;

/**
   * _GET_COVERPOINT_FROM_ENTITY_WITH_OFFSET
   * Returns the entity coverpoint with offset.
   *
   * @param {number} entity
   * @param {number} xOffset
   * @param {number} yOffset
   * @param {number} zOffset
   * @param {number} heading
   * @param {number} p5
   * @param {number} p6
   * @param {number} p7
   * @param {number} p8
   * @return {number}
   */
declare function GetCoverpointFromEntityWithOffset(entity: Entity, xOffset: number, yOffset: number, zOffset: number, heading: number, p5: number, p6: number, p7: number, p8: number): number;

/**
   * _0x59AE5CA4FFB4E378
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0x59AE5CA4FFB4E378(p0: any, p1: any): any;

/**
   * _0x59AEA4DC640814B9
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x59AEA4DC640814B9(p0: any, p1: any): void;

/**
   * _0x5B68D0007D9C92EB
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x5B68D0007D9C92EB(p0: any, p1: any): void;

/**
   * _0x5D9B0BAAF04CF65B
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function N_0x5D9B0BAAF04CF65B(p0: any, p1: any, p2: any, p3: any): void;

/**
   * _0x5EA655F01D93667A
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x5EA655F01D93667A(p0: any): any;

/**
   * _0x615DC4A82E90BB48
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0x615DC4A82E90BB48(p0: any, p1: any, p2: any): void;

/**
   * _0x640A602946A8C972
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x640A602946A8C972(p0: any): any;

/**
   * _0x643FD1556F621772
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {any}
   */
declare function N_0x643FD1556F621772(p0: any, p1: any, p2: any): any;

/**
   * _0x651F0530083C0E5A
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x651F0530083C0E5A(p0: any, p1: any): void;

/**
   * _0x65D281985F2BDFC2
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x65D281985F2BDFC2(p0: any, p1: any): void;

/**
   * _0x673A8779D229BA5A
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @return {void}
   */
declare function N_0x673A8779D229BA5A(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;

/**
   * _0x678D3226CF70B9C8
   * Only used in R* SP Script beat_washed_ashore
   * Returns Object prop for TASK::_TASK_ITEM_INTERACTION_2
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {number}
   */
declare function N_0x678D3226CF70B9C8(ped: Ped, p1: boolean): number;

/**
   * _0x6A1AF481407BF6E9
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x6A1AF481407BF6E9(p0: any): void;

/**
   * _0x6AFD84AEAA3EA538
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x6AFD84AEAA3EA538(p0: any): any;

/**
   * _0x6AFDA2264925BD11
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x6AFDA2264925BD11(p0: any): void;

/**
   * _0x6BA606AB3A83BC4D
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x6BA606AB3A83BC4D(p0: any): any;

/**
   * _0x6C269F673C47031E
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x6C269F673C47031E(p0: any): any;

/**
   * _IS_ENTITY_REVIVABLE
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsEntityRevivable(ped: Ped): boolean;

/**
   * _0x6DAC799857EF3F11
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0x6DAC799857EF3F11(p0: any, p1: any): any;

/**
   * _0x722D6A49200174FE
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {void}
   */
declare function N_0x722D6A49200174FE(p0: any, p1: any, p2: any, p3: any, p4: any): void;

/**
   * _0x748D5E0D2A1A4C61
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0x748D5E0D2A1A4C61(p0: any, p1: any, p2: any): void;

/**
   * _0x74F0209674864CBD
   *
  
   * @return {any}
   */
declare function N_0x74F0209674864CBD(): any;

/**
   * _0x756C7B4C43DF0422
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x756C7B4C43DF0422(p0: any): any;

/**
   * _0x764DB5A48390FBAD
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x764DB5A48390FBAD(p0: any, p1: any): void;

/**
   * _0x76610D12A838EBDE
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x76610D12A838EBDE(p0: any): any;

/**
   * _0x78D8C1D4EB80C588
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x78D8C1D4EB80C588(p0: any): any;

/**
   * _0x79197F7D2BB5E73A
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @return {any}
   */
declare function N_0x79197F7D2BB5E73A(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

/**
   * _SET_PED_PATH_AVOID_TRAFFIC
   *
   * @param {number} ped
   * @param {boolean} avoidTraffic
   * @return {void}
   */
declare function SetPedPathAvoidTraffic(ped: Ped, avoidTraffic: boolean): void;

/**
   * _0x7CB99FADDE73CD1B
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x7CB99FADDE73CD1B(p0: any): any;

/**
   * _0x7FB78B2199C10E92
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x7FB78B2199C10E92(p0: any): void;

/**
   * _0x801BD27403F3CBA0
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function N_0x801BD27403F3CBA0(p0: any, p1: any, p2: any, p3: any): void;

/**
   * _0x816A3ACD265E2297
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x816A3ACD265E2297(p0: any, p1: any): void;

/**
   * _0x827A58CED9D4D5B4
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x827A58CED9D4D5B4(p0: any, p1: any): void;

/**
   * _0x82ED59F095056550
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x82ED59F095056550(p0: any, p1: any): void;

/**
   * _0x849791EBBDBA0362
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x849791EBBDBA0362(p0: any): any;

/**
   * _0x865732725536EE39
   *
   * @param {any} p0
   * @return {Vector3}
   */
declare function N_0x865732725536EE39(p0: any): Vector3;

/**
   * _0x8798CF6815B8FE0F
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x8798CF6815B8FE0F(p0: any, p1: any): void;

/**
   * _0x885D19AC2B6FBFF4
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x885D19AC2B6FBFF4(p0: any, p1: any): void;

/**
   * _0x88FD60D846D9CD63
   *
   * @param {number} ped
   * @return {void}
   */
declare function N_0x88FD60D846D9CD63(ped: Ped): void;

/**
   * _0x8B1FDF63C3193EDA
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function N_0x8B1FDF63C3193EDA(ped: Ped, p1: number): void;

/**
   * _SET_PED_PATH_PREFER_TO_AVOID_MUD
   *
   * @param {number} ped
   * @param {boolean} preferAvoidMud
   * @param {number} p2
   * @return {void}
   */
declare function SetPedPathPreferToAvoidMud(ped: Ped, preferAvoidMud: boolean, p2: number): void;

/**
   * _0x8E1DDE26D270CC5E
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x8E1DDE26D270CC5E(p0: any, p1: any): void;

/**
   * _0x8F8C84363810691A
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x8F8C84363810691A(p0: any, p1: any): void;

/**
   * _0x9050DF2C53801208
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function N_0x9050DF2C53801208(ped: Ped, p1: number): void;

/**
   * _0x90703A8F75EE4ABD
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0x90703A8F75EE4ABD(p0: any, p1: any): any;

/**
   * _0x908BB14BCE85C80E
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x908BB14BCE85C80E(p0: any): any;

/**
   * _0x91CB5E431F579BA1
   *
   * @param {any} p0
   * @return {Vector3}
   */
declare function N_0x91CB5E431F579BA1(p0: any): Vector3;

/**
   * _0x920684BE432875B1
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x920684BE432875B1(p0: any): any;

/**
   * _0x9420FB11B8D77948
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x9420FB11B8D77948(p0: any): any;

/**
   * _0x954451EA2D2120FB
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x954451EA2D2120FB(p0: any, p1: any): void;

/**
   * _0x9585FF23C4B8EDE0
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x9585FF23C4B8EDE0(p0: any, p1: any): void;

/**
   * _0x9667CCE29BFA0780
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x9667CCE29BFA0780(p0: any): void;

/**
   * _0x974DA3408DEC4E79
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x974DA3408DEC4E79(p0: any): any;

/**
   * _0x9ADDBB9242179D56
   *
   * @param {number} object
   * @param {number} ped
   * @return {void}
   */
declare function N_0x9ADDBB9242179D56(object: number, ped: Ped): void;

/**
   * _0x9B6A58FDB0024F12
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x9B6A58FDB0024F12(p0: any, p1: any): void;

/**
   * _0x9C8F42A5D1859DC1
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x9C8F42A5D1859DC1(p0: any): void;

/**
   * _0x9EBD34958AB6F824
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x9EBD34958AB6F824(p0: any): void;

/**
   * _0x9FF5F9B24E870748
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x9FF5F9B24E870748(p0: any): any;

/**
   * _0xA052608A12559BBB
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xA052608A12559BBB(p0: any, p1: any): void;

/**
   * _0xA21AA2F0C2180125
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xA21AA2F0C2180125(p0: any, p1: any): void;

/**
   * _0xA263ADBBC8056214
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xA263ADBBC8056214(p0: any, p1: any): void;

/**
   * _0xA42DC7919159CCCF
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xA42DC7919159CCCF(p0: any): void;

/**
   * _0xA6A76D666A281F2D
   *
   * @param {any} p0
   * @param {number} item
   * @return {void}
   */
declare function N_0xA6A76D666A281F2D(p0: any, item: Hash): void;

/**
   * _0xA7479FB665361EDB
   * _SET_SCENARIO_*
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xA7479FB665361EDB(p0: any, p1: any): void;

/**
   * _0xA9E7672F8C6C6F74
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xA9E7672F8C6C6F74(p0: any): any;

/**
   * _0xAC5045AB7F1A34FD
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xAC5045AB7F1A34FD(p0: any): any;

/**
   * _0xADC45010BC17AF0E
   * _SET_SCENARIO_POINT_*
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xADC45010BC17AF0E(p0: any, p1: any): void;

/**
   * _0xAF2EF28CE3084505
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function N_0xAF2EF28CE3084505(p0: any, p1: any, p2: any, p3: any): void;

/**
   * _0xB2D15D3551FE4FAE
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xB2D15D3551FE4FAE(p0: any): void;

/**
   * _0xB2F47A1AFDFCC595
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xB2F47A1AFDFCC595(p0: any, p1: any): void;

/**
   * _SET_ITEM_INTERACTION_STATE
   * All Interaction states
   * https://github.com/femga/rdr3_discoveries/tree/master/tasks/TASK_ITEM_INTERACTION#-4-item_interaction_state_name--item_interaction_propid--1
   *
   * @param {number} ped
   * @param {number} itemInteractionState
   * @param {number} p2
   * @return {void}
   */
declare function SetItemInteractionState(ped: Ped, itemInteractionState: Hash, p2: number): void;

/**
   * _0xB520DBDA7FCF573F
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0xB520DBDA7FCF573F(ped: Ped): boolean;

/**
   * _0xB79817DB31FF72B9
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xB79817DB31FF72B9(p0: any, p1: any): void;

/**
   * _0xB8E213D02F37947D
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
declare function N_0xB8E213D02F37947D(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;

/**
   * _0xB8E3486D107F4194
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xB8E3486D107F4194(p0: any, p1: any): void;

/**
   * _HAS_CARRIABLE_CONFIG_HASH_LOADED
   * list of carriable configs  https://gist.github.com/WesternGamer/95a1f8daf02520cad2bf96af6d957e70
   *
   * @param {number} hash
   * @return {boolean}
   */
declare function HasCarriableConfigHashLoaded(hash: Hash): boolean;

/**
   * _0xBAAB791AA72C2821
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xBAAB791AA72C2821(p0: any, p1: any): void;

/**
   * _0xBC3F847AE2C3DC65
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xBC3F847AE2C3DC65(p0: any, p1: any): void;

/**
   * _0xBD1C3C0F271C39D3
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xBD1C3C0F271C39D3(p0: any, p1: any): void;

/**
   * _0xBD70108D01875299
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xBD70108D01875299(p0: any): any;

/**
   * _0xBEDBE39B5FD98FD6
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0xBEDBE39B5FD98FD6(ped: Ped): boolean;

/**
   * _0xBEEFBB608D2AA68A
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xBEEFBB608D2AA68A(p0: any): void;

/**
   * _SET_PED_PATH_PREFER_STAY_IN_WATER
   *
   * @param {number} ped
   * @param {boolean} preferStayInWater
   * @param {number} p2
   * @return {void}
   */
declare function SetPedPathPreferStayInWater(ped: Ped, preferStayInWater: boolean, p2: number): void;

/**
   * _0xCE4E669400E5F8AA
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function N_0xCE4E669400E5F8AA(p0: any, p1: any, p2: any, p3: any): void;

/**
   * _0xD0ABC4EA3B5E21A0
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0xD0ABC4EA3B5E21A0(p0: any, p1: any): any;

/**
   * _0xD508FA229F1C4900
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @return {any}
   */
declare function N_0xD508FA229F1C4900(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

/**
   * _0xD999E379265A4501
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0xD999E379265A4501(p0: any, p1: any, p2: any): void;

/**
   * _0xDE0C8B145EA466FF
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @return {void}
   */
declare function N_0xDE0C8B145EA466FF(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;

/**
   * _0xDF56A2B50C04DEA4
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0xDF56A2B50C04DEA4(p0: any, p1: any): any;

/**
   * _0xDF94844D474F31E5
   *
   * @param {number} ped
   * @return {void}
   */
declare function N_0xDF94844D474F31E5(ped: Ped): void;

/**
   * _0xE01C8DC8EDD28D31
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xE01C8DC8EDD28D31(p0: any, p1: any): void;

/**
   * _0xE01F55B2896F6B37
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xE01F55B2896F6B37(p0: any, p1: any): void;

/**
   * _0xE05A5D39BE6E93AF
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xE05A5D39BE6E93AF(p0: any): void;

/**
   * _0xE116F6F2DA2D777E
   *
   * @param {any} p0
   * @return {Vector3}
   */
declare function N_0xE116F6F2DA2D777E(p0: any): Vector3;

/**
   * _0xE1C105E6BBA48270
   *
  
   * @return {any}
   */
declare function N_0xE1C105E6BBA48270(): any;

/**
   * _0xE2CF104ADD49D4BF
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xE2CF104ADD49D4BF(p0: any): void;

/**
   * _0xE55478C5EDF70AC2
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xE55478C5EDF70AC2(p0: any): any;

/**
   * _0xE5831AA1E2FD147C
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xE5831AA1E2FD147C(p0: any): void;

/**
   * _0xE62754D09354F6CF
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xE62754D09354F6CF(p0: any): any;

/**
   * _0xE69FDA40AAC3EFC0
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xE69FDA40AAC3EFC0(p0: any, p1: any): void;

/**
   * _0xE6A151364C600B24
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xE6A151364C600B24(p0: any): any;

/**
   * _0xE7BBC4E56B989449
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {any}
   */
declare function N_0xE7BBC4E56B989449(p0: any, p1: any, p2: any): any;

/**
   * _0xE9225354FB7437A7
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xE9225354FB7437A7(p0: any, p1: any): void;

/**
   * _0xE9A6400D1A0E7A55
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xE9A6400D1A0E7A55(p0: any): any;

/**
   * _0xEAF87DA2BE78A15B
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xEAF87DA2BE78A15B(p0: any, p1: any): void;

/**
   * _0xEB67D4E056C85A81
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xEB67D4E056C85A81(p0: any): any;

/**
   * _0xEBA2081E0A5F4D17
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xEBA2081E0A5F4D17(p0: any): void;

/**
   * _0xEC516FE805D2CB2D
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xEC516FE805D2CB2D(p0: any): void;

/**
   * _0xEFD875C2791EBEFD
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {any}
   */
declare function N_0xEFD875C2791EBEFD(p0: any, p1: any, p2: any, p3: any): any;

/**
   * _0xF3C3503276F4A034
   *
   * @param {number} entity
   * @param {any} p1
   * @return {void}
   */
declare function N_0xF3C3503276F4A034(entity: Entity, p1: any): void;

/**
   * _0xF40A109B4B79A848
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0xF40A109B4B79A848(p0: any, p1: any, p2: any): void;

/**
   * _0xF718931A82EEB898
   *
  
   * @return {void}
   */
declare function N_0xF718931A82EEB898(): void;

/**
   * _0xF948F4356F010F11
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0xF948F4356F010F11(p0: any, p1: any, p2: any): void;

/**
   * _0xF97F462779B31786
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xF97F462779B31786(p0: any): any;

/**
   * _0xFA30E2254461ADEB
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xFA30E2254461ADEB(p0: any, p1: any): void;

/**
   * _0xFC7F71CF49F70B6B
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xFC7F71CF49F70B6B(p0: any): void;

/**
   * _0xFDECCA06E8B81346
   *
   * @param {number} ped
   * @return {any}
   */
declare function N_0xFDECCA06E8B81346(ped: Ped): any;

/**
   * _0xFE5D28B9B7837CC1
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {any}
   */
declare function N_0xFE5D28B9B7837CC1(p0: any, p1: any, p2: any, p3: any): any;

/**
   * _LOAD_CARRIABLE_CONFIG_HASH
   * https://gist.github.com/WesternGamer/95a1f8daf02520cad2bf96af6d957e70 carriable config list 
   *
   * @param {number} hash
   * @return {void}
   */
declare function LoadCarriableConfigHash(hash: Hash): void;

/**
   * _0xFF8AFCA532B500D4
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xFF8AFCA532B500D4(p0: any, p1: any): void;

/**
   * _0xFFB520A3E16F7B7B
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function N_0xFFB520A3E16F7B7B(ped: Ped, p1: number): void;

/**
   * _ADD_COVER_BLOCKING_VOLUME
   *
   * @param {number} volume
   * @param {boolean} p1
   * @param {boolean} p2
   * @param {boolean} p3
   * @param {boolean} p4
   * @return {void}
   */
declare function AddCoverBlockingVolume(volume: Volume, p1: boolean, p2: boolean, p3: boolean, p4: boolean): void;

/**
   * _ADD_FLEE_TARGET_COORDS
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} p4
   * @return {void}
   */
declare function AddFleeTargetCoords(ped: Ped, x: number, y: number, z: number, p4: number): void;

/**
   * _ASSOCIATE_PROP_WITH_SCENARIO
   *
   * @param {number} scenario
   * @param {number} entity
   * @param {string | number} propName
   * @param {boolean} p3
   * @return {boolean}
   */
declare function AssociatePropWithScenario(scenario: number, entity: Entity, propName: string | number, p3: boolean): boolean;

/**
   * _CREATE_HERB_COMPOSITES
   * groundSetting: 0: spawn on ground, 2 (1?): do not spawn on ground
   * p7: -1 in R* Scripts
   * Returns compositeId
   *
   * @param {number} asset
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} heading
   * @param {number} groundSetting
   * @param {any} p6
   * @param {number} p7
   * @return {number}
   */
declare function CreateHerbComposites(asset: Hash, x: number, y: number, z: number, heading: number, groundSetting: number, p6: any, p7: number): number;

/**
   * _CREATE_WAYPOINT_PATH
   *
   * @param {string | number} pathName
   * @param {any} p1
   * @param {number} nodes
   * @param {number} p3
   * @return {boolean}
   */
declare function CreateWaypointPath(pathName: string | number, p1: any, nodes: number, p3: number): boolean;

/**
   * _CUFF_PED
   *
   * @param {number} ped
   * @return {void}
   */
declare function CuffPed(ped: Ped): void;

/**
   * _DELETE_PATCH_OBJECTS_FROM_HERB_COMPOSITES
   * Params: p1 is always false except in script nb_egg_protector
   *
   * @param {number} compositeId
   * @param {boolean} p1
   * @return {void}
   */
declare function DeletePatchObjectsFromHerbComposites(compositeId: number, p1: boolean): void;

/**
   * _DELETE_SCENARIO_POINT
   *
   * @param {number} scenario
   * @return {void}
   */
declare function DeleteScenarioPoint(scenario: number): void;

/**
   * _DETACH_CARRIABLE_PED
   *
   * @param {number} ped
   * @return {void}
   */
declare function DetachCarriablePed(ped: Ped): void;

/**
   * _DISASSOCIATE_PROP_FROM_SCENARIO
   *
   * @param {number} scenario
   * @param {string | number} propName
   * @return {boolean}
   */
declare function DisassociatePropFromScenario(scenario: number, propName: string | number): boolean;

/**
   * _DOES_SCENARIO_GROUP_EXIST_HASH
   *
   * @param {number} scenarioGroup
   * @return {boolean}
   */
declare function DoesScenarioGroupExistHash(scenarioGroup: Hash): boolean;

/**
   * _DOES_SCENARIO_POINT_HAVE_PROPS
   *
   * @param {number} scenario
   * @return {boolean}
   */
declare function DoesScenarioPointHaveProps(scenario: number): boolean;

/**
   * _FIND_MODEL_FOR_ITEM
   *
   * @param {number} item
   * @return {number}
   */
declare function FindModelForItem(item: Hash): number;

/**
   * _GET_HERB_COMPOSITE_NUM_ENTITIES
   * Flowers, Stalks or whatever the composite has
   *
   * @param {number} compositeId
   * @param {DataView} outEntities
   * @return {number}
   */
declare function GetHerbCompositeNumEntities(compositeId: number, outEntities: DataView): number;

/**
   * _GET_HOGTIE_ESCAPE_TIMER
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetHogtieEscapeTimer(ped: Ped): number;

/**
   * _GET_ITEM_INTERACTION_ENTITY_FROM_PED
   * item hashes: PRIMARYITEM, P_MUGCOFFEE01X_PH_R_HAND, P_BOTTLEBEER01X_PH_R_HAND
   * http://prntscr.com/1qtp3bz
   * https://github.com/femga/rdr3_discoveries/tree/master/tasks/TASK_ITEM_INTERACTION
   *
   * @param {number} ped
   * @param {number} item
   * @return {number}
   */
declare function GetItemInteractionEntityFromPed(ped: Ped, item: Hash): Entity;

/**
   * _GET_LED_HORSE_FROM_PED
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetLedHorseFromPed(ped: Ped): Ped;

/**
   * _GET_PED_IS_IGNORING_DEAD_BODIES
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function GetPedIsIgnoringDeadBodies(ped: Ped): boolean;

/**
   * _GET_PED_USING_SCENARIO_POINT
   *
   * @param {number} scenario
   * @return {number}
   */
declare function GetPedUsingScenarioPoint(scenario: number): Ped;

/**
   * _GET_SCENARIO_CONTAINER_OPENING_STATE
   * Returns m_eContainerState
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function GetScenarioContainerOpeningState(entity: Entity): boolean;

/**
   * _GET_SCENARIO_POINT_COORDS
   * Params: p1 is always true in R* Scripts
   *
   * @param {number} scenario
   * @param {boolean} p1
   * @return {Vector3}
   */
declare function GetScenarioPointCoords(scenario: number, p1: boolean): Vector3;

/**
   * _GET_SCENARIO_POINT_ENTITY
   * Note: The current name for this native is the old name of 0x295514F198EFD0CA
   * Old name for this native: _GET_ENTITY_SCENARIO_POINT_IS_ATTACHED_TO
   *
   * @param {number} scenario
   * @return {number}
   */
declare function GetScenarioPointEntity(scenario: number): Entity;

/**
   * _GET_SCENARIO_POINT_HEADING
   * Params: p1 is always true in R* Scripts
   *
   * @param {number} scenario
   * @param {boolean} p1
   * @return {number}
   */
declare function GetScenarioPointHeading(scenario: number, p1: boolean): number;

/**
   * _GET_SCENARIO_POINT_PED_IS_USING
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {number}
   */
declare function GetScenarioPointPedIsUsing(ped: Ped, p1: boolean): number;

/**
   * _GET_SCENARIO_POINT_RADIUS
   *
   * @param {number} scenario
   * @return {number}
   */
declare function GetScenarioPointRadius(scenario: number): number;

/**
   * _GET_SCENARIO_POINT_TYPE
   *
   * @param {number} scenario
   * @return {number}
   */
declare function GetScenarioPointType(scenario: number): number;

/**
   * _GET_SCENARIO_POINT_TYPE_PED_IS_USING
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetScenarioPointTypePedIsUsing(ped: Ped): number;

/**
   * _GET_SCRIPT_TASK_ACTION_TIME
   *
   * @param {number} ped
   * @param {number} task
   * @return {number}
   */
declare function GetScriptTaskActionTime(ped: Ped, task: Hash): number;

/**
   * _GET_TASK_FISHING
   * Fishing Research: https://pastebin.com/NmK5ZLVs
   * Only used in R* Scripts fishing_core and av_fishing_river
   *
   * @param {number} ped
   * @param {DataView} p1
   * @return {boolean}
   */
declare function GetTaskFishing(ped: Ped, p1: DataView): boolean;

/**
   * _GET_TASK_MOVE_NETWORK_ID
   * Returns hash of the underlying move network def, see move_networks.xml
   * https://alloc8or.re/rdr3/doc/misc/move_networks.txt
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetTaskMoveNetworkId(ped: Ped): number;

/**
   * _GET_TASK_MOVE_NETWORK_PHASE_FLOAT
   *
   * @param {number} ped
   * @param {string | number} phaseName
   * @return {number}
   */
declare function GetTaskMoveNetworkPhaseFloat(ped: Ped, phaseName: string | number): number;

/**
   * _IS_HAT_BEING_PICKED_UP
   * Returns true while a hat is being picked up
   * _IS_A* - _IS_D*
   *
   * @param {number} hatObject
   * @return {boolean}
   */
declare function IsHatBeingPickedUp(hatObject: number): boolean;

/**
   * _IS_HAT_BEING_PICKED_UP_2
   * Returns true while a hat is being picked up. Similar to 0x11CD066F54DA0133
   * _IS_A* - _IS_D*
   *
   * @param {number} hatObject
   * @return {boolean}
   */
declare function IsHatBeingPickedUp_2(hatObject: number): boolean;

/**
   * _IS_PED_ARRESTING_ANY_PED
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedArrestingAnyPed(ped: Ped): boolean;

/**
   * _IS_PED_DUELLING
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedDuelling(ped: Ped): boolean;

/**
   * _IS_PED_LEADING_HORSE
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedLeadingHorse(ped: Ped): boolean;

/**
   * _IS_SCENARIO_GROUP_ENABLED_HASH
   *
   * @param {number} scenarioGroup
   * @return {boolean}
   */
declare function IsScenarioGroupEnabledHash(scenarioGroup: Hash): boolean;

/**
   * _IS_SCENARIO_POINT_ACTIVE
   *
   * @param {number} scenario
   * @return {boolean}
   */
declare function IsScenarioPointActive(scenario: number): boolean;

/**
   * _IS_SCENARIO_POINT_FLAG_SET
   *
   * @param {number} scenario
   * @param {number} flag
   * @return {boolean}
   */
declare function IsScenarioPointFlagSet(scenario: number, flag: number): boolean;

/**
   * _MAKE_OBJECT_CARRIABLE
   *
   * @param {number} object
   * @return {void}
   */
declare function MakeObjectCarriable(object: number): void;

/**
   * _PED_FISHINGROD_HOOK_ENTITY
   *
   * @param {number} ped
   * @param {number} entity
   * @return {void}
   */
declare function PedFishingrodHookEntity(ped: Ped, entity: Entity): void;

/**
   * _PED_FISHINGROD_HOOK_OBJECT
   * Used with 'P_BODYPARTARMFLOAT02X' model in fishing_core.c
   *
   * @param {number} ped
   * @param {number} object
   * @return {void}
   */
declare function PedFishingrodHookObject(ped: Ped, object: number): void;

/**
   * _PED_IS_IN_SCENARIO_BASE
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function PedIsInScenarioBase(ped: Ped): boolean;

/**
   * _REQUEST_HERB_COMPOSITE_ASSET
   * https://github.com/femga/rdr3_discoveries/tree/master/objects/composites
   *
   * @param {number} asset
   * @return {boolean}
   */
declare function RequestHerbCompositeAsset(asset: Hash): boolean;

/**
   * _RESET_SCENARIO_FOR_ENTITY
   *
   * @param {number} scenario
   * @param {number} entity
   * @return {void}
   */
declare function ResetScenarioForEntity(scenario: number, entity: Entity): void;

/**
   * _RESET_SCENARIO_SCRIPT
   *
   * @param {number} scenario
   * @return {void}
   */
declare function ResetScenarioScript(scenario: number): void;

/**
   * _SET_FISHING_BAIT
   * Baits: p_fishHook02x, p_baitBread01x, p_baitCorn01x, p_baitCheese01x, p_baitWorm01x, p_baitCricket01x, p_crawdad01x, p_finisheDragonfly01x, p_finisdFishlure01x, p_finishdCrawd01x, p_finisheDragonflyLegendary01x, p_finisdFishlureLegendary01x, p_finishdCrawdLegendary01x, p_lgoc_spinner_v4
   *
   * @param {number} ped
   * @param {string | number} bait
   * @param {boolean} withoutBuoy
   * @param {boolean} instantly
   * @return {void}
   */
declare function SetFishingBait(ped: Ped, bait: string | number, withoutBuoy: boolean, instantly: boolean): void;

/**
   * _SET_HOGTIE_ESCAPE_TIMER
   * Sets the time it takes for a hogtied ped to escape
   * -1.0f for ped to never escape
   *
   * @param {number} ped
   * @param {number} time
   * @return {void}
   */
declare function SetHogtieEscapeTimer(ped: Ped, time: number): void;

/**
   * _SET_PED_CLEAR_AIMING_IN_THE_AIR
   *
   * @param {number} ped
   * @param {any} p1
   * @return {void}
   */
declare function SetPedClearAimingInTheAir(ped: Ped, p1: any): void;

/**
   * _SET_PED_IGNORE_DEAD_BODIES
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedIgnoreDeadBodies(ped: Ped, toggle: boolean): void;

/**
   * _SET_PED_PATH_LADDER_COST_MODIFIER
   * _SET_PED_PATH_P*
   *
   * @param {number} ped
   * @param {number} modifier
   * @return {void}
   */
declare function SetPedPathLadderCostModifier(ped: Ped, modifier: number): void;

/**
   * _SET_PED_PATH_MAY_ENTER_DEEP_WATER
   *
   * @param {number} ped
   * @param {boolean} mayEnterDeepWater
   * @return {void}
   */
declare function SetPedPathMayEnterDeepWater(ped: Ped, mayEnterDeepWater: boolean): void;

/**
   * _SET_SCENARIO_CONTAINER_OPENING_STATE
   * Opens/closes containers: ChestDugUp
   *
   * @param {number} entity
   * @param {boolean} open
   * @return {void}
   */
declare function SetScenarioContainerOpeningState(entity: Entity, open: boolean): void;

/**
   * _SET_SCENARIO_GROUP_ENABLED_HASH
   *
   * @param {number} scenarioGroup
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetScenarioGroupEnabledHash(scenarioGroup: Hash, toggle: boolean): void;

/**
   * _SET_SCENARIO_POINT_ACTIVE
   *
   * @param {number} scenario
   * @param {boolean} active
   * @return {void}
   */
declare function SetScenarioPointActive(scenario: number, active: boolean): void;

/**
   * _SET_SCENARIO_POINT_COORDS
   *
   * @param {number} scenario
   * @param {number} xPos
   * @param {number} yPos
   * @param {number} zPos
   * @param {boolean} p4
   * @return {void}
   */
declare function SetScenarioPointCoords(scenario: number, xPos: number, yPos: number, zPos: number, p4: boolean): void;

/**
   * _SET_SCENARIO_POINT_FLAG
   * flag: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/CScenarioPointFlags__Flags
   *
   * @param {number} scenario
   * @param {number} flag
   * @param {boolean} value
   * @return {void}
   */
declare function SetScenarioPointFlag(scenario: number, flag: number, value: boolean): void;

/**
   * _SET_SCENARIO_POINT_HEADING
   *
   * @param {number} scenario
   * @param {number} heading
   * @param {boolean} p2
   * @return {void}
   */
declare function SetScenarioPointHeading(scenario: number, heading: number, p2: boolean): void;

/**
   * _SET_SCENARIO_POINT_RADIUS
   *
   * @param {number} scenario
   * @param {number} radius
   * @return {void}
   */
declare function SetScenarioPointRadius(scenario: number, radius: number): void;

/**
   * _SET_SCENARIO_TYPE_ENABLED_HASH
   *
   * @param {number} scenarioType
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetScenarioTypeEnabledHash(scenarioType: Hash, toggle: boolean): void;

/**
   * _SET_TASK_FISHING
   * Only used in R* Scripts fishing_core and av_fishing_river
   *
   * @param {number} ped
   * @param {any} p1
   * @return {boolean}
   */
declare function SetTaskFishing(ped: Ped, p1: any): boolean;

/**
   * _SET_TASK_MOVE_NETWORK_SIGNAL_FLOAT_2
   *
   * @param {number} ped
   * @param {string | number} signalName
   * @param {number} value
   * @return {void}
   */
declare function SetTaskMoveNetworkSignalFloat_2(ped: Ped, signalName: string | number, value: number): void;

/**
   * _SET_TASK_MOVE_NETWORK_SIGNAL_VECTOR
   *
   * @param {number} ped
   * @param {string | number} signalName
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {void}
   */
declare function SetTaskMoveNetworkSignalVector(ped: Ped, signalName: string | number, x: number, y: number, z: number): void;

/**
   * _TASK_ANIMAL_BLEED_OUT
   *
   * @param {number} ped
   * @param {number} killer
   * @param {boolean} p2
   * @param {number} weaponHash
   * @param {number} p4
   * @param {number} p5
   * @return {void}
   */
declare function TaskAnimalBleedOut(ped: Ped, killer: Ped, p2: boolean, weaponHash: Hash, p4: number, p5: number): void;

/**
   * _TASK_BOARD_VEHICLE
   *
   * @param {number} ped
   * @param {number} vehicle
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @return {void}
   */
declare function TaskBoardVehicle(ped: Ped, vehicle: Vehicle, p2: any, p3: any, p4: any, p5: any): void;

/**
   * _TASK_BOARD_VEHICLE_2
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {number} p3
   * @param {number} flags
   * @return {void}
   */
declare function TaskBoardVehicle_2(ped: Ped, p1: any, p2: any, p3: number, flags: number): void;

/**
   * _TASK_CLIMB_2
   *
   * @param {number} ped
   * @param {number} heading
   * @return {void}
   */
declare function TaskClimb_2(ped: Ped, heading: number): void;

/**
   * _TASK_COMBAT_PED_AT_COORDS
   * Coords: volume coords used in R* Script smuggler2
   * p4/p5 = 0 in R* Scripts previous name TASK_COMBAT_PED_3
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} p4
   * @param {number} p5
   * @return {void}
   */
declare function TaskCombatPedAtCoords(ped: Ped, x: number, y: number, z: number, p4: number, p5: number): void;

/**
   * _TASK_CUT_FREE_HOGTIED_TARGET_PED
   *
   * @param {number} ped
   * @param {number} targetPed
   * @return {void}
   */
declare function TaskCutFreeHogtiedTargetPed(ped: Ped, targetPed: Ped): void;

/**
   * _TASK_CUT_FREE_HOGTIED_TARGET_PED_2
   *
   * @param {number} ped
   * @param {number} targetPed
   * @param {number} p2
   * @return {void}
   */
declare function TaskCutFreeHogtiedTargetPed_2(ped: Ped, targetPed: Ped, p2: number): void;

/**
   * _TASK_DISEMBARK_VEHICLE
   *
   * @param {any} p0
   * @param {number} vehicle
   * @param {number} p2
   * @param {any} p3
   * @param {number} p4
   * @param {any} p5
   * @return {void}
   */
declare function TaskDisembarkVehicle(p0: any, vehicle: Vehicle, p2: number, p3: any, p4: number, p5: any): void;

/**
   * _TASK_EMOTE_OUTRO
   *
   * @param {number} ped
   * @return {void}
   */
declare function TaskEmoteOutro(ped: Ped): void;

/**
   * _TASK_EQUIP_HAT
   * _A*
   *
   * @param {number} hatObject
   * @param {number} ped
   * @return {void}
   */
declare function TaskEquipHat(hatObject: number, ped: Ped): void;

/**
   * _TASK_FLEE_FROM_COORD
   * fleeType: see TASK_FLEE_COORD
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
   * @param {any} p10
   * @param {any} p11
   * @return {void}
   */
declare function TaskFleeFromCoord(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any, p10: any, p11: any): void;

/**
   * _TASK_FLEE_FROM_PED
   * fleeType: see TASK_FLEE_COORD
   *
   * @param {number} ped
   * @param {number} fleeFromTarget
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} distance
   * @param {number} p6
   * @param {number} p7
   * @param {number} p8
   * @param {number} targetPed
   * @return {void}
   */
declare function TaskFleeFromPed(ped: Ped, fleeFromTarget: Ped, x: number, y: number, z: number, distance: number, p6: number, p7: number, p8: number, targetPed: Ped): void;

/**
   * _TASK_GUARD_ASSIGNED_DEFENSIVE_AREA_2
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @param {any} p7
   * @return {void}
   */
declare function TaskGuardAssignedDefensiveArea_2(ped: Ped, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;

/**
   * _TASK_INTIMIDATED
   *
   * @param {any} p0
   * @param {number} ped
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {boolean}
   */
declare function TaskIntimidated(p0: any, ped: Ped, p2: any, p3: any, p4: any): boolean;

/**
   * _TASK_INTIMIDATED_2
   *
   * @param {number} victim
   * @param {number} attacker
   * @param {number} p2
   * @param {boolean} p3
   * @param {boolean} p4
   * @param {boolean} everyFrame
   * @param {boolean} p6
   * @param {boolean} p7
   * @param {number} flag
   * @return {boolean}
   */
declare function TaskIntimidated_2(victim: Ped, attacker: Ped, p2: number, p3: boolean, p4: boolean, everyFrame: boolean, p6: boolean, p7: boolean, flag: number): boolean;

/**
   * _TASK_ITEM_INTERACTION_2
   *
   * @param {number} ped
   * @param {number} propNameGxt
   * @param {number} prop
   * @param {number} propId
   * @param {number} itemInteractionState
   * @param {number} p5
   * @param {any} p6
   * @param {number} p7
   * @return {void}
   */
declare function TaskItemInteraction_2(ped: Ped, propNameGxt: Hash, prop: number, propId: Hash, itemInteractionState: Hash, p5: number, p6: any, p7: number): void;

/**
   * _TASK_ITEM_INTERACTION_3
   * Params: p3, p4, p5, p6: 0, 0, 0, -1.0f in R* Scripts
   *
   * @param {number} ped
   * @param {number} item
   * @param {DataView} guid
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {number} p6
   * @return {void}
   */
declare function TaskItemInteraction_3(ped: Ped, item: Hash, guid: DataView, p3: any, p4: any, p5: any, p6: number): void;

/**
   * _TASK_JUMP_2
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} entity
   * @return {void}
   */
declare function TaskJump_2(ped: Ped, x: number, y: number, z: number, entity: Entity): void;

/**
   * _TASK_PATROL_2
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
declare function TaskPatrol_2(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;

/**
   * TASK_PERFORM_SEQUENCE_LOCALLY
   * Old name: _TASK_PERFORM_SEQUENCE_2
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function TaskPerformSequenceLocally(p0: any, p1: any, p2: any, p3: any): void;

/**
   * _TASK_PLAY_EMOTE
   * Similar to 0xB31A277C1AC7B7FF but checks if the ped's inventory contains the specified emote kit.
   *
   * @param {number} ped
   * @param {number} emoteType
   * @param {number} playbackMode
   * @param {number} emote
   * @param {boolean} isSecondaryTask
   * @param {boolean} canBreakOut
   * @param {boolean} disableEarlyOutAnimTag
   * @param {boolean} ignoreInvalidMainTask
   * @param {boolean} destroyProps
   * @return {void}
   */
declare function TaskPlayEmote(ped: Ped, emoteType: number, playbackMode: number, emote: Hash, isSecondaryTask: boolean, canBreakOut: boolean, disableEarlyOutAnimTag: boolean, ignoreInvalidMainTask: boolean, destroyProps: boolean): void;

/**
   * _TASK_PUT_PED_DIRECTLY_INTO_COVER_FROM_COORDS
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} fromX
   * @param {number} fromY
   * @param {number} fromZ
   * @param {number} timeout
   * @param {any} p8
   * @param {any} p9
   * @param {any} p10
   * @param {any} p11
   * @param {any} p12
   * @param {any} p13
   * @param {any} p14
   * @param {any} p15
   * @param {any} p16
   * @param {any} p17
   * @return {void}
   */
declare function TaskPutPedDirectlyIntoCoverFromCoords(ped: Ped, x: number, y: number, z: number, fromX: number, fromY: number, fromZ: number, timeout: number, p8: any, p9: any, p10: any, p11: any, p12: any, p13: any, p14: any, p15: any, p16: any, p17: any): void;

/**
   * _TASK_START_SCENARIO_IN_PLACE_2
   * Takes scenario point handle instead of hash
   *
   * @param {number} ped
   * @param {any} p1
   * @param {string | number} p2
   * @param {number} p3
   * @param {boolean} p4
   * @param {number} p5
   * @param {boolean} p6
   * @return {void}
   */
declare function TaskStartScenarioInPlace_2(ped: Ped, p1: any, p2: string | number, p3: number, p4: boolean, p5: number, p6: boolean): void;

/**
   * _TASK_THROW_PROJECTILE_2
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function TaskThrowProjectile_2(p0: any, p1: any, p2: any, p3: any): void;

/**
   * _TASK_USE_NEAREST_SCENARIO_TO_COORD
   *
   * @param {number} ped
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} distance
   * @param {number} duration
   * @param {boolean} p6
   * @param {boolean} p7
   * @param {boolean} p8
   * @param {boolean} p9
   * @return {void}
   */
declare function TaskUseNearestScenarioToCoord(ped: Ped, x: number, y: number, z: number, distance: number, duration: number, p6: boolean, p7: boolean, p8: boolean, p9: boolean): void;

/**
   * _TASK_USE_SCENARIO_POINT_2
   *
   * @param {number} ped
   * @param {number} ped2
   * @param {any} p2
   * @param {string | number} p3
   * @param {number} p4
   * @param {number} p5
   * @param {number} p6
   * @param {boolean} p7
   * @return {void}
   */
declare function TaskUseScenarioPoint_2(ped: Ped, ped2: Ped, p2: any, p3: string | number, p4: number, p5: Hash, p6: number, p7: boolean): void;

/**
   * _TASK_VEHICLE_DRIVE_TO_COORD_2
   *
   * @param {number} ped
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @param {any} p7
   * @param {any} p8
   * @return {void}
   */
declare function TaskVehicleDriveToCoord_2(ped: Ped, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;

/**
   * _TASK_VEHICLE_DRIVE_TO_DESTINATION_2
   * Tasks vehicle towards owner
   *
   * @param {number} vehicle
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} speed
   * @param {number} p5
   * @param {number} p6
   * @param {number} p7
   * @param {number} p8
   * @return {void}
   */
declare function TaskVehicleDriveToDestination_2(vehicle: Vehicle, x: number, y: number, z: number, speed: number, p5: number, p6: number, p7: number, p8: number): void;

/**
   * _TASK_VEHICLE_DRIVE_TO_POINT_2
   * Params: p4 = 3.f or 8.f, p5 = 0.25f, p6 = 0 in R* Scripts
   *
   * @param {number} vehicle
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} p4
   * @param {number} p5
   * @param {any} p6
   * @return {void}
   */
declare function TaskVehicleDriveToPoint_2(vehicle: Vehicle, x: number, y: number, z: number, p4: number, p5: number, p6: any): void;

/**
   * _TASK_VEHICLE_FLEE_ON_CLEANUP
   * Vehicle Auto Drive (?)
   * p1/p2/p3: usually 1f, 1f, 0f or 0f, 0f, 0f
   * Speed: usually 8f
   * Types: 1148979456 (task with flee), 1148979587 (dismissing the vehicle)
   *
   * @param {number} vehicle
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {number} speed
   * @param {number} type
   * @return {void}
   */
declare function TaskVehicleFleeOnCleanup(vehicle: Vehicle, p1: number, p2: number, p3: number, speed: number, type: Hash): void;

/**
   * _TASK_VEHICLE_FOLLOW_WAYPOINT_RECORDING_2
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
declare function TaskVehicleFollowWaypointRecording_2(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;