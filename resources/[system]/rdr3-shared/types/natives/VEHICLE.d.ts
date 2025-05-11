/**
   * ADD_ROAD_NODE_SPEED_ZONE
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
   * @return {number}
   */
declare function AddRoadNodeSpeedZone(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any, p10: any): number;

/**
   * ARE_ANY_VEHICLE_SEATS_FREE
   * Returns false if every seat is occupied.
   *
   * @param {number} vehicle
   * @return {boolean}
   */
declare function AreAnyVehicleSeatsFree(vehicle: Vehicle): boolean;

/**
   * BRING_VEHICLE_TO_HALT
   * This native makes the vehicle stop immediately
   * 
   * distance defines how far it will travel until stopping.
   *
   * @param {number} vehicle
   * @param {number} distance
   * @param {number} duration
   * @param {boolean} unknown
   * @return {void}
   */
declare function BringVehicleToHalt(vehicle: Vehicle, distance: number, duration: number, unknown: boolean): void;

/**
   * CAN_ANCHOR_BOAT_HERE
   *
   * @param {number} vehicle
   * @return {boolean}
   */
declare function CanAnchorBoatHere(vehicle: Vehicle): boolean;

/**
   * CAN_SHUFFLE_SEAT
   * seatIndex: see CREATE_PED_INSIDE_VEHICLE
   *
   * @param {number} vehicle
   * @param {number} seatIndex
   * @return {boolean}
   */
declare function CanShuffleSeat(vehicle: Vehicle, seatIndex: number): boolean;

/**
   * CLEAR_LAST_DRIVEN_VEHICLE
   *
  
   * @return {void}
   */
declare function ClearLastDrivenVehicle(): void;

/**
   * COPY_VEHICLE_DAMAGES
   * Copies sourceVehicle's damage (broken bumpers, broken lights, etc.) to targetVehicle.
   *
   * @param {number} sourceVehicle
   * @param {number} targetVehicle
   * @return {void}
   */
declare function CopyVehicleDamages(sourceVehicle: Vehicle, targetVehicle: Vehicle): void;

/**
   * CREATE_VEHICLE
   *
   * @param {number} modelHash
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} heading
   * @param {boolean} isNetwork
   * @param {boolean} bScriptHostVeh
   * @param {boolean} bDontAutoCreateDraftAnimals
   * @param {boolean} p8
   * @return {number}
   */
declare function CreateVehicle(modelHash: Hash, x: number, y: number, z: number, heading: number, isNetwork: boolean, bScriptHostVeh: boolean, bDontAutoCreateDraftAnimals: boolean, p8: boolean): Vehicle;

/**
   * DELETE_ALL_TRAINS
   *
  
   * @return {void}
   */
declare function DeleteAllTrains(): void;

/**
   * DELETE_MISSION_TRAIN
   *
  
   * @return {number}
   */
declare function DeleteMissionTrain(): Vehicle;

/**
   * DELETE_VEHICLE
   * Deletes a vehicle.
   * The vehicle must be a mission entity to delete, so call this before deleting: SET_ENTITY_AS_MISSION_ENTITY(vehicle, true, true);
   * 
   * eg how to use:
   * SET_ENTITY_AS_MISSION_ENTITY(vehicle, true, true);
   * DELETE_VEHICLE(&vehicle);
   * 
   * Deletes the specified vehicle, then sets the handle pointed to by the pointer to NULL.
   *
  
   * @return {number}
   */
declare function DeleteVehicle(): Vehicle;

/**
   * DISABLE_VEHICLE_WEAPON
   *
   * @param {boolean} disabled
   * @param {number} weaponHash
   * @param {number} vehicle
   * @param {number} owner
   * @return {void}
   */
declare function DisableVehicleWeapon(disabled: boolean, weaponHash: Hash, vehicle: Vehicle, owner: Ped): void;

/**
   * DOES_EXTRA_EXIST
   *
   * @param {number} vehicle
   * @param {number} extraId
   * @return {boolean}
   */
declare function DoesExtraExist(vehicle: Vehicle, extraId: number): boolean;

/**
   * EXPLODE_VEHICLE
   * Explodes a selected vehicle.
   * 
   * Vehicle vehicle = Vehicle you want to explode.
   * BOOL isAudible = If explosion makes a sound.
   * BOOL isInvisible = If the explosion is invisible or not.
   * 
   * First BOOL does not give any visual explosion, the vehicle just falls apart completely but slowly and starts to burn.
   *
   * @param {number} vehicle
   * @param {boolean} isAudible
   * @param {boolean} isInvisible
   * @param {any} p3
   * @param {any} p4
   * @return {void}
   */
declare function ExplodeVehicle(vehicle: Vehicle, isAudible: boolean, isInvisible: boolean, p3: any, p4: any): void;

/**
   * FORCE_PLAYBACK_RECORDED_VEHICLE_UPDATE
   * Often called after START_PLAYBACK_RECORDED_VEHICLE and SKIP_TIME_IN_PLAYBACK_RECORDED_VEHICLE; similar in use to FORCE_ENTITY_AI_AND_ANIMATION_UPDATE.
   *
   * @param {number} vehicle
   * @param {boolean} p1
   * @return {void}
   */
declare function ForcePlaybackRecordedVehicleUpdate(vehicle: Vehicle, p1: boolean): void;

/**
   * GET_CLOSEST_VEHICLE
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @param {number} modelHash
   * @param {number} flags
   * @return {number}
   */
declare function GetClosestVehicle(x: number, y: number, z: number, radius: number, modelHash: Hash, flags: number): Vehicle;

/**
   * GET_CURRENT_STATION_FOR_TRAIN
   * Returns p1 for 0xBA958F68031DDBFC (stationIndex)
   *
   * @param {number} train
   * @return {number}
   */
declare function GetCurrentStationForTrain(train: Vehicle): number;

/**
   * GET_DRAFT_ANIMAL_COUNT
   *
   * @param {number} vehicle
   * @return {[boolean, number, number]}
   */
declare function GetDraftAnimalCount(vehicle: Vehicle): [boolean, number, number];

/**
   * GET_DRIVER_OF_VEHICLE
   *
   * @param {number} vehicle
   * @return {number}
   */
declare function GetDriverOfVehicle(vehicle: Vehicle): Ped;

/**
   * GET_LAST_DRIVEN_VEHICLE
   *
  
   * @return {number}
   */
declare function GetLastDrivenVehicle(): Vehicle;

/**
   * GET_LAST_PED_IN_VEHICLE_SEAT
   * seatIndex: see CREATE_PED_INSIDE_VEHICLE
   *
   * @param {number} vehicle
   * @param {number} seatIndex
   * @return {number}
   */
declare function GetLastPedInVehicleSeat(vehicle: Vehicle, seatIndex: number): Ped;

/**
   * GET_PED_IN_VEHICLE_SEAT
   * seatIndex: see CREATE_PED_INSIDE_VEHICLE
   *
   * @param {number} vehicle
   * @param {number} seatIndex
   * @return {number}
   */
declare function GetPedInVehicleSeat(vehicle: Vehicle, seatIndex: number): Ped;

/**
   * GET_POSITION_OF_VEHICLE_RECORDING_AT_TIME
   * This native does no interpolation between pathpoints. The same position will be returned for all times up to the next pathpoint in the recording.
   * 
   * See REQUEST_VEHICLE_RECORDING
   *
   * @param {number} recording
   * @param {number} time
   * @param {string | number} script
   * @return {Vector3}
   */
declare function GetPositionOfVehicleRecordingAtTime(recording: number, time: number, script: string | number): Vector3;

/**
   * GET_ROTATION_OF_VEHICLE_RECORDING_AT_TIME
   * This native does no interpolation between pathpoints. The same rotation will be returned for all times up to the next pathpoint in the recording.
   * 
   * See REQUEST_VEHICLE_RECORDING
   *
   * @param {number} recording
   * @param {number} time
   * @param {string | number} script
   * @return {Vector3}
   */
declare function GetRotationOfVehicleRecordingAtTime(recording: number, time: number, script: string | number): Vector3;

/**
   * GET_TIME_POSITION_IN_RECORDING
   *
   * @param {number} vehicle
   * @return {number}
   */
declare function GetTimePositionInRecording(vehicle: Vehicle): number;

/**
   * GET_TRACK_INDEX_OF_TRAIN
   *
   * @param {number} train
   * @return {number}
   */
declare function GetTrackIndexOfTrain(train: Vehicle): number;

/**
   * GET_TRAIN_CARRIAGE
   *
   * @param {number} train
   * @param {number} trailerNumber
   * @return {number}
   */
declare function GetTrainCarriage(train: Vehicle, trailerNumber: number): Entity;

/**
   * GET_VEHICLE_BODY_HEALTH
   * Seems related to vehicle health, like the one in IV.
   * Max 1000, min 0.
   * Vehicle does not necessarily explode or become undrivable at 0.
   *
   * @param {number} vehicle
   * @return {number}
   */
declare function GetVehicleBodyHealth(vehicle: Vehicle): number;

/**
   * GET_VEHICLE_DOORS_LOCKED_FOR_PLAYER
   *
   * @param {number} vehicle
   * @param {number} player
   * @return {boolean}
   */
declare function GetVehicleDoorsLockedForPlayer(vehicle: Vehicle, player: Player): boolean;

/**
   * GET_VEHICLE_DOOR_LOCK_STATUS
   *
   * @param {number} vehicle
   * @return {number}
   */
declare function GetVehicleDoorLockStatus(vehicle: Vehicle): number;

/**
   * GET_VEHICLE_ENGINE_HEALTH
   * Returns 1000.0 if the function is unable to get the address of the specified vehicle or if it's not a vehicle.
   * 
   * Minimum: -4000
   * Maximum: 1000
   * 
   * -4000: Engine is destroyed
   * 0 and below: Engine catches fire and health rapidly declines
   * 300: Engine is smoking and losing functionality
   * 1000: Engine is perfect
   *
   * @param {number} vehicle
   * @return {number}
   */
declare function GetVehicleEngineHealth(vehicle: Vehicle): number;

/**
   * GET_VEHICLE_ESTIMATED_MAX_SPEED
   *
   * @param {number} vehicle
   * @return {number}
   */
declare function GetVehicleEstimatedMaxSpeed(vehicle: Vehicle): number;

/**
   * GET_VEHICLE_MAX_NUMBER_OF_PASSENGERS
   *
   * @param {number} vehicle
   * @return {number}
   */
declare function GetVehicleMaxNumberOfPassengers(vehicle: Vehicle): number;

/**
   * GET_VEHICLE_MODEL_NUMBER_OF_SEATS
   *
   * @param {number} modelHash
   * @return {number}
   */
declare function GetVehicleModelNumberOfSeats(modelHash: Hash): number;

/**
   * GET_VEHICLE_NUMBER_OF_PASSENGERS
   * Gets the number of passengers, NOT including the driver. Use IS_VEHICLE_SEAT_FREE(Vehicle, -1) to also check for the driver
   *
   * @param {number} vehicle
   * @return {number}
   */
declare function GetVehicleNumberOfPassengers(vehicle: Vehicle): number;

/**
   * GET_VEHICLE_PETROL_TANK_HEALTH
   * 1000 is max health
   *
   * @param {number} vehicle
   * @return {number}
   */
declare function GetVehiclePetrolTankHealth(vehicle: Vehicle): number;

/**
   * GET_VEHICLE_TRAILER_VEHICLE
   * Gets the trailer of a vehicle and puts it into the trailer parameter.
   *
   * @param {number} vehicle
   * @return {[boolean, Vehicle]}
   */
declare function GetVehicleTrailerVehicle(vehicle: Vehicle): [boolean, Vehicle];

/**
   * HAS_INSTANT_FILL_VEHICLE_POPULATION_FINISHED
   *
  
   * @return {boolean}
   */
declare function HasInstantFillVehiclePopulationFinished(): boolean;

/**
   * HAS_VEHICLE_ASSET_LOADED
   *
   * @param {number} vehicleAsset
   * @return {boolean}
   */
declare function HasVehicleAssetLoaded(vehicleAsset: Hash): boolean;

/**
   * HAS_VEHICLE_RECORDING_BEEN_LOADED
   * See REQUEST_VEHICLE_RECORDING
   *
   * @param {number} recording
   * @param {string | number} script
   * @return {boolean}
   */
declare function HasVehicleRecordingBeenLoaded(recording: number, script: string | number): boolean;

/**
   * INSTANTLY_FILL_VEHICLE_POPULATION
   *
  
   * @return {void}
   */
declare function InstantlyFillVehiclePopulation(): void;

/**
   * IS_ANY_VEHICLE_NEAR_POINT
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @return {boolean}
   */
declare function IsAnyVehicleNearPoint(x: number, y: number, z: number, radius: number): boolean;

/**
   * IS_DRAFT_VEHICLE
   *
   * @param {number} vehicle
   * @return {boolean}
   */
declare function IsDraftVehicle(vehicle: Vehicle): boolean;

/**
   * IS_ENTRY_POINT_FOR_SEAT_CLEAR
   *
   * @param {number} ped
   * @param {number} vehicle
   * @param {number} seatIndex
   * @param {boolean} side
   * @param {boolean} onEnter
   * @return {boolean}
   */
declare function IsEntryPointForSeatClear(ped: Ped, vehicle: Vehicle, seatIndex: number, side: boolean, onEnter: boolean): boolean;

/**
   * IS_PLAYBACK_GOING_ON_FOR_VEHICLE
   *
   * @param {number} vehicle
   * @return {boolean}
   */
declare function IsPlaybackGoingOnForVehicle(vehicle: Vehicle): boolean;

/**
   * IS_PLAYBACK_USING_AI_GOING_ON_FOR_VEHICLE
   *
   * @param {number} vehicle
   * @return {boolean}
   */
declare function IsPlaybackUsingAiGoingOnForVehicle(vehicle: Vehicle): boolean;

/**
   * IS_SEAT_WARP_ONLY
   * seatIndex: see CREATE_PED_INSIDE_VEHICLE
   *
   * @param {number} vehicle
   * @param {number} seatIndex
   * @return {boolean}
   */
declare function IsSeatWarpOnly(vehicle: Vehicle, seatIndex: number): boolean;

/**
   * IS_THIS_MODEL_A_BOAT
   *
   * @param {number} model
   * @return {boolean}
   */
declare function IsThisModelABoat(model: Hash): boolean;

/**
   * IS_THIS_MODEL_A_TRAIN
   *
   * @param {number} model
   * @return {boolean}
   */
declare function IsThisModelATrain(model: Hash): boolean;

/**
   * IS_TRAIN_WAITING_AT_STATION
   *
   * @param {number} train
   * @return {boolean}
   */
declare function IsTrainWaitingAtStation(train: Vehicle): boolean;

/**
   * IS_VEHICLE_DOOR_FULLY_OPEN
   * doorId: see SET_VEHICLE_DOOR_SHUT
   *
   * @param {number} vehicle
   * @param {number} doorId
   * @return {boolean}
   */
declare function IsVehicleDoorFullyOpen(vehicle: Vehicle, doorId: number): boolean;

/**
   * IS_VEHICLE_DRIVEABLE
   *
   * @param {number} vehicle
   * @param {boolean} p1
   * @param {boolean} p2
   * @return {boolean}
   */
declare function IsVehicleDriveable(vehicle: Vehicle, p1: boolean, p2: boolean): boolean;

/**
   * IS_VEHICLE_EXTRA_TURNED_ON
   *
   * @param {number} vehicle
   * @param {number} extraId
   * @return {boolean}
   */
declare function IsVehicleExtraTurnedOn(vehicle: Vehicle, extraId: number): boolean;

/**
   * IS_VEHICLE_IN_BURNOUT
   *
   * @param {number} vehicle
   * @return {boolean}
   */
declare function IsVehicleInBurnout(vehicle: Vehicle): boolean;

/**
   * IS_VEHICLE_MODEL
   *
   * @param {number} vehicle
   * @param {number} model
   * @return {boolean}
   */
declare function IsVehicleModel(vehicle: Vehicle, model: Hash): boolean;

/**
   * IS_VEHICLE_ON_ALL_WHEELS
   *
   * @param {number} vehicle
   * @return {boolean}
   */
declare function IsVehicleOnAllWheels(vehicle: Vehicle): boolean;

/**
   * IS_VEHICLE_SEAT_FREE
   * seatIndex: see CREATE_PED_INSIDE_VEHICLE
   * Use GET_VEHICLE_MAX_NUMBER_OF_PASSENGERS(vehicle) - 1 for last seat index.
   *
   * @param {number} vehicle
   * @param {number} seatIndex
   * @return {boolean}
   */
declare function IsVehicleSeatFree(vehicle: Vehicle, seatIndex: number): boolean;

/**
   * IS_VEHICLE_STOPPED
   * Returns true if the vehicle's current speed is less than, or equal to 0.0025f.
   * 
   * For some vehicles it returns true if the current speed is <= 0.00039999999.
   *
   * @param {number} vehicle
   * @return {boolean}
   */
declare function IsVehicleStopped(vehicle: Vehicle): boolean;

/**
   * IS_VEHICLE_STUCK_TIMER_UP
   * VEH_STUCK_ON_ROOF = 0,
   * VEH_STUCK_ON_SIDE,
   * VEH_STUCK_HUNG_UP,
   * VEH_STUCK_JAMMED
   *
   * @param {number} vehicle
   * @param {number} stuckType
   * @param {number} ms
   * @return {boolean}
   */
declare function IsVehicleStuckTimerUp(vehicle: Vehicle, stuckType: number, ms: number): boolean;

/**
   * IS_VEHICLE_VISIBLE
   * Requires a visibility tracker on the vehicle (TRACK_VEHICLE_VISIBILITY)
   *
   * @param {number} vehicle
   * @return {boolean}
   */
declare function IsVehicleVisible(vehicle: Vehicle): boolean;

/**
   * IS_VEHICLE_WINDOW_INTACT
   *
   * @param {number} vehicle
   * @param {number} windowIndex
   * @return {boolean}
   */
declare function IsVehicleWindowIntact(vehicle: Vehicle, windowIndex: number): boolean;

/**
   * IS_VEHICLE_WRECKED
   *
   * @param {number} vehicle
   * @return {boolean}
   */
declare function IsVehicleWrecked(vehicle: Vehicle): boolean;

/**
   * LOCK_DOORS_WHEN_NO_LONGER_NEEDED
   *
   * @param {number} vehicle
   * @return {void}
   */
declare function LockDoorsWhenNoLongerNeeded(vehicle: Vehicle): void;

/**
   * MODIFY_VEHICLE_TOP_SPEED
   *
   * @param {number} vehicle
   * @param {number} value
   * @return {void}
   */
declare function ModifyVehicleTopSpeed(vehicle: Vehicle, value: number): void;

/**
   * REMOVE_ROAD_NODE_SPEED_ZONE
   *
   * @param {number} speedzone
   * @return {boolean}
   */
declare function RemoveRoadNodeSpeedZone(speedzone: number): boolean;

/**
   * REMOVE_VEHICLES_FROM_GENERATORS_IN_AREA
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @return {void}
   */
declare function RemoveVehiclesFromGeneratorsInArea(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;

/**
   * REMOVE_VEHICLE_ASSET
   *
   * @param {number} vehicleAsset
   * @return {void}
   */
declare function RemoveVehicleAsset(vehicleAsset: Hash): void;

/**
   * REMOVE_VEHICLE_RECORDING
   * See REQUEST_VEHICLE_RECORDING
   *
   * @param {any} p0
   * @param {DataView} p1
   * @return {void}
   */
declare function RemoveVehicleRecording(p0: any, p1: DataView): void;

/**
   * REMOVE_VEHICLE_WINDOW
   * windowIndex:
   * 0 = Front Right Window
   * 1 = Front Left Window
   * 2 = Back Right Window
   * 3 = Back Left Window
   *
   * @param {number} vehicle
   * @param {number} windowIndex
   * @return {void}
   */
declare function RemoveVehicleWindow(vehicle: Vehicle, windowIndex: number): void;

/**
   * REQUEST_VEHICLE_ASSET
   *
   * @param {number} vehicleHash
   * @param {number} vehicleAsset
   * @return {void}
   */
declare function RequestVehicleAsset(vehicleHash: Hash, vehicleAsset: number): void;

/**
   * REQUEST_VEHICLE_HIGH_DETAIL_MODEL
   *
   * @param {number} vehicle
   * @return {void}
   */
declare function RequestVehicleHighDetailModel(vehicle: Vehicle): void;

/**
   * REQUEST_VEHICLE_RECORDING
   * Request the vehicle recording defined by the lowercase format string "%s%03d.yvr". For example, REQUEST_VEHICLE_RECORDING(1, "FBIs1UBER") corresponds to fbis1uber001.yvr.
   * For all vehicle recording/playback natives, "script" is a common prefix that usually corresponds to the script/mission the recording is used in, "recording" is its int suffix, and "id" corresponds to a unique identifier within the recording streaming module.
   * (GTA) Note that only 24 recordings (hardcoded in multiple places) can ever active at a given time before clobbering begins.
   *
   * @param {number} recording
   * @param {string | number} script
   * @return {void}
   */
declare function RequestVehicleRecording(recording: number, script: string | number): void;

/**
   * RESET_VEHICLE_STUCK_TIMER
   *
   * @param {number} vehicle
   * @param {number} nullAttributes
   * @return {void}
   */
declare function ResetVehicleStuckTimer(vehicle: Vehicle, nullAttributes: number): void;

/**
   * SET_ALLOW_VEHICLE_EXPLODES_ON_CONTACT
   *
   * @param {number} vehicle
   * @param {boolean} p1
   * @return {void}
   */
declare function SetAllowVehicleExplodesOnContact(vehicle: Vehicle, p1: boolean): void;

/**
   * SET_ALL_VEHICLE_GENERATORS_ACTIVE
   *
  
   * @return {void}
   */
declare function SetAllVehicleGeneratorsActive(): void;

/**
   * SET_ALL_VEHICLE_GENERATORS_ACTIVE_IN_AREA
   *
   * @param {number} x1
   * @param {number} y1
   * @param {number} z1
   * @param {number} x2
   * @param {number} y2
   * @param {number} z2
   * @param {boolean} p6
   * @param {boolean} p7
   * @return {void}
   */
declare function SetAllVehicleGeneratorsActiveInArea(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, p6: boolean, p7: boolean): void;

/**
   * SET_BOAT_ANCHOR
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetBoatAnchor(vehicle: Vehicle, toggle: boolean): void;

/**
   * SET_BOAT_LOW_LOD_ANCHOR_DISTANCE
   * Value: mostly 99999.9f
   * 
   * Old name: _SET_BOAT_MOVEMENT_RESISTANCE
   *
   * @param {number} vehicle
   * @param {number} value
   * @return {void}
   */
declare function SetBoatLowLodAnchorDistance(vehicle: Vehicle, value: number): void;

/**
   * SET_BOAT_REMAINS_ANCHORED_WHILE_PLAYER_IS_DRIVER
   * Old name: _SET_BOAT_FROZEN_WHEN_ANCHORED
   *
   * @param {number} vehicle
   * @param {boolean} p1
   * @param {boolean} p2
   * @return {void}
   */
declare function SetBoatRemainsAnchoredWhilePlayerIsDriver(vehicle: Vehicle, p1: boolean, p2: boolean): void;

/**
   * SET_BOAT_SINKS_WHEN_WRECKED
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetBoatSinksWhenWrecked(vehicle: Vehicle, toggle: boolean): void;

/**
   * SET_BREAKABLE_VEHICLE_LOCKS_UNBREAKABLE
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetBreakableVehicleLocksUnbreakable(vehicle: Vehicle, toggle: boolean): void;

/**
   * SET_DISABLE_RANDOM_TRAINS_THIS_FRAME
   * nullsub, doesn't do anything
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetDisableRandomTrainsThisFrame(toggle: boolean): void;

/**
   * SET_DISABLE_SUPERDUMMY
   * Old name: _SET_DISABLE_SUPERDUMMY_MODE
   *
   * @param {number} vehicle
   * @param {boolean} disable
   * @return {void}
   */
declare function SetDisableSuperdummy(vehicle: Vehicle, disable: boolean): void;

/**
   * SET_DISABLE_VEHICLE_ENGINE_FIRES
   *
   * @param {number} vehicle
   * @param {boolean} p1
   * @return {void}
   */
declare function SetDisableVehicleEngineFires(vehicle: Vehicle, p1: boolean): void;

/**
   * SET_DISABLE_VEHICLE_PETROL_TANK_DAMAGE
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetDisableVehiclePetrolTankDamage(vehicle: Vehicle, toggle: boolean): void;

/**
   * SET_DISABLE_VEHICLE_PETROL_TANK_FIRES
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetDisableVehiclePetrolTankFires(vehicle: Vehicle, toggle: boolean): void;

/**
   * SET_DONT_ALLOW_PLAYER_TO_ENTER_VEHICLE_IF_LOCKED_FOR_PLAYER
   *
   * @param {number} vehicle
   * @param {boolean} p1
   * @return {void}
   */
declare function SetDontAllowPlayerToEnterVehicleIfLockedForPlayer(vehicle: Vehicle, p1: boolean): void;

/**
   * SET_DOOR_ALLOWED_TO_BE_BROKEN_OFF
   * doorId: see SET_VEHICLE_DOOR_SHUT
   * 
   * Old name: _SET_VEHICLE_DOOR_CAN_BREAK
   *
   * @param {number} vehicle
   * @param {number} doorId
   * @param {boolean} isBreakable
   * @return {void}
   */
declare function SetDoorAllowedToBeBrokenOff(vehicle: Vehicle, doorId: number, isBreakable: boolean): void;

/**
   * SET_ENABLE_VEHICLE_SLIPSTREAMING
   *
   * @param {boolean} p0
   * @return {void}
   */
declare function SetEnableVehicleSlipstreaming(p0: boolean): void;

/**
   * SET_FORCE_HD_VEHICLE
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetForceHdVehicle(vehicle: Vehicle, toggle: boolean): void;

/**
   * SET_FORCE_LOW_LOD_ANCHOR_MODE
   * Sets boat to be anchored on spawn, called together with SET_BOAT_ANCHOR and _SET_BOAT_ANCHOR_BUOYANCY_COEFFICIENT
   *
   * @param {number} vehicle
   * @param {boolean} p1
   * @return {void}
   */
declare function SetForceLowLodAnchorMode(vehicle: Vehicle, p1: boolean): void;

/**
   * SET_FORCE_VEHICLE_ENGINE_DAMAGE_BY_BULLET
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetForceVehicleEngineDamageByBullet(vehicle: Vehicle, toggle: boolean): void;

/**
   * SET_MISSION_TRAIN_AS_NO_LONGER_NEEDED
   * flags = 0: DEFAULT; 1: KEEP_OLD_SPEED
   *
   * @param {number} flags
   * @return {number}
   */
declare function SetMissionTrainAsNoLongerNeeded(flags: number): Vehicle;

/**
   * SET_MISSION_TRAIN_COORDS
   *
   * @param {number} train
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {void}
   */
declare function SetMissionTrainCoords(train: Vehicle, x: number, y: number, z: number): void;

/**
   * SET_PARKED_VEHICLE_DENSITY_MULTIPLIER_THIS_FRAME
   *
   * @param {number} multiplier
   * @return {void}
   */
declare function SetParkedVehicleDensityMultiplierThisFrame(multiplier: number): void;

/**
   * SET_PED_OWNS_VEHICLE
   *
   * @param {number} ped
   * @param {number} vehicle
   * @return {void}
   */
declare function SetPedOwnsVehicle(ped: Ped, vehicle: Vehicle): void;

/**
   * SET_PLAYBACK_SPEED
   *
   * @param {number} vehicle
   * @param {number} speed
   * @return {void}
   */
declare function SetPlaybackSpeed(vehicle: Vehicle, speed: number): void;

/**
   * SET_RANDOM_BOATS
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetRandomBoats(toggle: boolean): void;

/**
   * SET_RANDOM_TRAINS
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetRandomTrains(toggle: boolean): void;

/**
   * SET_RANDOM_VEHICLE_DENSITY_MULTIPLIER_THIS_FRAME
   *
   * @param {number} multiplier
   * @return {void}
   */
declare function SetRandomVehicleDensityMultiplierThisFrame(multiplier: number): void;

/**
   * SET_TRAIN_CRUISE_SPEED
   *
   * @param {number} train
   * @param {number} speed
   * @return {void}
   */
declare function SetTrainCruiseSpeed(train: Vehicle, speed: number): void;

/**
   * SET_TRAIN_OFFSET_FROM_STATION
   *
   * @param {number} train
   * @param {number} offset
   * @return {void}
   */
declare function SetTrainOffsetFromStation(train: Vehicle, offset: number): void;

/**
   * SET_TRAIN_SPEED
   *
   * @param {number} train
   * @param {number} speed
   * @return {void}
   */
declare function SetTrainSpeed(train: Vehicle, speed: number): void;

/**
   * SET_VEHICLE_AI_CAN_USE_EXCLUSIVE_SEATS
   * Used to be incorrectly named SET_VEHICLE_EXCLUSIVE_DRIVER
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetVehicleAiCanUseExclusiveSeats(vehicle: Vehicle, toggle: boolean): void;

/**
   * SET_VEHICLE_ALLOW_HOMING_MISSLE_LOCKON
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetVehicleAllowHomingMissleLockon(vehicle: Vehicle, toggle: boolean): void;

/**
   * SET_VEHICLE_ALLOW_NO_PASSENGERS_LOCKON
   * Makes the vehicle accept no passengers.
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetVehicleAllowNoPassengersLockon(vehicle: Vehicle, toggle: boolean): void;

/**
   * SET_VEHICLE_AUTOMATICALLY_ATTACHES
   *
   * @param {number} vehicle
   * @param {boolean} p1
   * @param {any} p2
   * @return {any}
   */
declare function SetVehicleAutomaticallyAttaches(vehicle: Vehicle, p1: boolean, p2: any): any;

/**
   * SET_VEHICLE_BODY_HEALTH
   *
   * @param {number} vehicle
   * @param {number} value
   * @return {void}
   */
declare function SetVehicleBodyHealth(vehicle: Vehicle, value: number): void;

/**
   * SET_VEHICLE_BROKEN_PARTS_DONT_AFFECT_AI_HANDLING
   *
   * @param {number} vehicle
   * @param {boolean} p1
   * @return {void}
   */
declare function SetVehicleBrokenPartsDontAffectAiHandling(vehicle: Vehicle, p1: boolean): void;

/**
   * SET_VEHICLE_CAN_BE_TARGETTED
   *
   * @param {number} vehicle
   * @param {boolean} state
   * @return {void}
   */
declare function SetVehicleCanBeTargetted(vehicle: Vehicle, state: boolean): void;

/**
   * SET_VEHICLE_CAN_BE_USED_BY_FLEEING_PEDS
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetVehicleCanBeUsedByFleeingPeds(vehicle: Vehicle, toggle: boolean): void;

/**
   * SET_VEHICLE_CAN_BE_VISIBLY_DAMAGED
   *
   * @param {number} vehicle
   * @param {boolean} state
   * @return {void}
   */
declare function SetVehicleCanBeVisiblyDamaged(vehicle: Vehicle, state: boolean): void;

/**
   * SET_VEHICLE_CAN_BREAK
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetVehicleCanBreak(vehicle: Vehicle, toggle: boolean): void;

/**
   * SET_VEHICLE_CAN_EJECT_PASSENGERS_IF_LOCKED
   *
   * @param {number} vehicle
   * @param {boolean} p1
   * @return {void}
   */
declare function SetVehicleCanEjectPassengersIfLocked(vehicle: Vehicle, p1: boolean): void;

/**
   * SET_VEHICLE_DAMAGE
   * Apply damage to vehicle at a location. Location is relative to vehicle model (not world).
   * 
   * Radius of effect damage applied in a sphere at impact location
   *
   * @param {number} vehicle
   * @param {number} xOffset
   * @param {number} yOffset
   * @param {number} zOffset
   * @param {number} damage
   * @param {number} radius
   * @param {boolean} p6
   * @return {void}
   */
declare function SetVehicleDamage(vehicle: Vehicle, xOffset: number, yOffset: number, zOffset: number, damage: number, radius: number, p6: boolean): void;

/**
   * SET_VEHICLE_DENSITY_MULTIPLIER_THIS_FRAME
   *
   * @param {number} multiplier
   * @return {void}
   */
declare function SetVehicleDensityMultiplierThisFrame(multiplier: number): void;

/**
   * SET_VEHICLE_DIRT_LEVEL
   *
   * @param {number} vehicle
   * @param {number} dirtLevel
   * @return {void}
   */
declare function SetVehicleDirtLevel(vehicle: Vehicle, dirtLevel: number): void;

/**
   * SET_VEHICLE_DOORS_LOCKED
   *
   * @param {number} vehicle
   * @param {number} doorLockStatus
   * @return {void}
   */
declare function SetVehicleDoorsLocked(vehicle: Vehicle, doorLockStatus: number): void;

/**
   * SET_VEHICLE_DOORS_LOCKED_FOR_ALL_PLAYERS
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetVehicleDoorsLockedForAllPlayers(vehicle: Vehicle, toggle: boolean): void;

/**
   * SET_VEHICLE_DOORS_LOCKED_FOR_PLAYER
   *
   * @param {number} vehicle
   * @param {number} player
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetVehicleDoorsLockedForPlayer(vehicle: Vehicle, player: Player, toggle: boolean): void;

/**
   * SET_VEHICLE_DOORS_LOCKED_FOR_TEAM
   *
   * @param {number} vehicle
   * @param {number} team
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetVehicleDoorsLockedForTeam(vehicle: Vehicle, team: number, toggle: boolean): void;

/**
   * SET_VEHICLE_DOORS_SHUT
   * Closes all doors of a vehicle:
   *
   * @param {number} vehicle
   * @param {boolean} closeInstantly
   * @return {void}
   */
declare function SetVehicleDoorsShut(vehicle: Vehicle, closeInstantly: boolean): void;

/**
   * SET_VEHICLE_DOORS_TO_OPEN_AT_ANY_DISTANCE
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetVehicleDoorsToOpenAtAnyDistance(vehicle: Vehicle, toggle: boolean): void;

/**
   * SET_VEHICLE_DOOR_BROKEN
   * doorId: see SET_VEHICLE_DOOR_SHUT
   *
   * @param {number} vehicle
   * @param {number} doorId
   * @param {boolean} deleteDoor
   * @return {void}
   */
declare function SetVehicleDoorBroken(vehicle: Vehicle, doorId: number, deleteDoor: boolean): void;

/**
   * SET_VEHICLE_DOOR_CONTROL
   * doorId: see SET_VEHICLE_DOOR_SHUT
   *
   * @param {number} vehicle
   * @param {number} doorId
   * @param {number} speed
   * @param {number} angle
   * @return {void}
   */
declare function SetVehicleDoorControl(vehicle: Vehicle, doorId: number, speed: number, angle: number): void;

/**
   * SET_VEHICLE_DOOR_LATCHED
   * doorId: see SET_VEHICLE_DOOR_SHUT
   *
   * @param {number} vehicle
   * @param {number} doorId
   * @param {boolean} p2
   * @param {boolean} p3
   * @param {boolean} p4
   * @return {void}
   */
declare function SetVehicleDoorLatched(vehicle: Vehicle, doorId: number, p2: boolean, p3: boolean, p4: boolean): void;

/**
   * SET_VEHICLE_DOOR_OPEN
   * doorId: see SET_VEHICLE_DOOR_SHUT
   * Can also be used on trains and its wagons
   *
   * @param {number} vehicle
   * @param {number} doorId
   * @param {boolean} loose
   * @param {boolean} openInstantly
   * @return {void}
   */
declare function SetVehicleDoorOpen(vehicle: Vehicle, doorId: number, loose: boolean, openInstantly: boolean): void;

/**
   * SET_VEHICLE_DOOR_SHUT
   * doorId: enum eDoorId
   * {
   *   VEH_EXT_DOOR_INVALID_ID = -1,
   *   VEH_EXT_DOOR_DSIDE_F,
   *   VEH_EXT_DOOR_DSIDE_M,
   *   VEH_EXT_DOOR_DSIDE_M1,
   *   VEH_EXT_DOOR_DSIDE_M2,
   *   VEH_EXT_DOOR_DSIDE_R,
   *   VEH_EXT_DOOR_PSIDE_F,
   *   VEH_EXT_DOOR_PSIDE_M,
   *   VEH_EXT_DOOR_PSIDE_M1,
   *   VEH_EXT_DOOR_PSIDE_M2,
   *   VEH_EXT_DOOR_PSIDE_R,
   *   VEH_EXT_BONNET,
   *   VEH_EXT_BOOT
   * };
   *
   * @param {number} vehicle
   * @param {number} doorId
   * @param {boolean} closeInstantly
   * @return {void}
   */
declare function SetVehicleDoorShut(vehicle: Vehicle, doorId: number, closeInstantly: boolean): void;

/**
   * SET_VEHICLE_ENGINE_CAN_DEGRADE
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetVehicleEngineCanDegrade(vehicle: Vehicle, toggle: boolean): void;

/**
   * SET_VEHICLE_ENGINE_HEALTH
   * 1000 is max health
   * Begins leaking gas at around 650 health
   * -999.90002441406 appears to be minimum health, although nothing special occurs <- false statement
   * 
   * -------------------------
   * Minimum: -4000
   * Maximum: 1000
   * 
   * -4000: Engine is destroyed
   * 0 and below: Engine catches fire and health rapidly declines
   * 300: Engine is smoking and losing functionality
   * 1000: Engine is perfect
   *
   * @param {number} vehicle
   * @param {number} health
   * @return {void}
   */
declare function SetVehicleEngineHealth(vehicle: Vehicle, health: number): void;

/**
   * SET_VEHICLE_ENGINE_ON
   * Starts or stops the engine on the specified vehicle.
   * 
   * vehicle: The vehicle to start or stop the engine on.
   * value: true to turn the vehicle on; false to turn it off.
   * instantly: if true, the vehicle will be set to the state immediately; otherwise, the current driver will physically turn on or off the engine.
   *
   * @param {number} vehicle
   * @param {boolean} value
   * @param {boolean} instantly
   * @return {void}
   */
declare function SetVehicleEngineOn(vehicle: Vehicle, value: boolean, instantly: boolean): void;

/**
   * SET_VEHICLE_EXCLUSIVE_DRIVER
   * index: 0 - 1
   * 
   * Used to be incorrectly named _SET_VEHICLE_EXCLUSIVE_DRIVER_2
   *
   * @param {number} vehicle
   * @param {number} ped
   * @param {number} index
   * @return {void}
   */
declare function SetVehicleExclusiveDriver(vehicle: Vehicle, ped: Ped, index: number): void;

/**
   * SET_VEHICLE_EXPLODES_ON_HIGH_EXPLOSION_DAMAGE
   * Sets a vehicle to be strongly resistant to explosions. p0 is the vehicle; set p1 to false to toggle the effect on/off.
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetVehicleExplodesOnHighExplosionDamage(vehicle: Vehicle, toggle: boolean): void;

/**
   * SET_VEHICLE_EXTRA
   * Note: only some vehicle have extras
   * https://github.com/femga/rdr3_discoveries/blob/master/vehicles/vehicle_modding/vehicle_extras.lua
   *
   * @param {number} vehicle
   * @param {number} extraId
   * @param {boolean} disable
   * @return {void}
   */
declare function SetVehicleExtra(vehicle: Vehicle, extraId: number, disable: boolean): void;

/**
   * SET_VEHICLE_FIXED
   * This fixes a vehicle.
   * If the vehicle's engine's broken then you cannot fix it with this native.
   *
   * @param {number} vehicle
   * @return {void}
   */
declare function SetVehicleFixed(vehicle: Vehicle): void;

/**
   * SET_VEHICLE_FORWARD_SPEED
   *
   * @param {number} vehicle
   * @param {number} speed
   * @return {void}
   */
declare function SetVehicleForwardSpeed(vehicle: Vehicle, speed: number): void;

/**
   * SET_VEHICLE_HANDBRAKE
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetVehicleHandbrake(vehicle: Vehicle, toggle: boolean): void;

/**
   * SET_VEHICLE_HAS_BEEN_OWNED_BY_PLAYER
   *
   * @param {number} vehicle
   * @param {boolean} owned
   * @return {void}
   */
declare function SetVehicleHasBeenOwnedByPlayer(vehicle: Vehicle, owned: boolean): void;

/**
   * SET_VEHICLE_HAS_STRONG_AXLES
   * if true, axles won't bend.
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetVehicleHasStrongAxles(vehicle: Vehicle, toggle: boolean): void;

/**
   * SET_VEHICLE_HAS_UNBREAKABLE_LIGHTS
   *
   * @param {number} vehicle
   * @param {boolean} p1
   * @return {void}
   */
declare function SetVehicleHasUnbreakableLights(vehicle: Vehicle, p1: boolean): void;

/**
   * SET_VEHICLE_INACTIVE_DURING_PLAYBACK
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetVehicleInactiveDuringPlayback(vehicle: Vehicle, toggle: boolean): void;

/**
   * SET_VEHICLE_INDIVIDUAL_DOORS_LOCKED
   * doorId: see SET_VEHICLE_DOOR_SHUT
   *
   * @param {number} vehicle
   * @param {number} doorId
   * @param {number} doorLockStatus
   * @return {void}
   */
declare function SetVehicleIndividualDoorsLocked(vehicle: Vehicle, doorId: number, doorLockStatus: number): void;

/**
   * SET_VEHICLE_INFLUENCES_WANTED_LEVEL
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetVehicleInfluencesWantedLevel(vehicle: Vehicle, toggle: boolean): void;

/**
   * SET_VEHICLE_IS_CONSIDERED_BY_PLAYER
   * Setting this to false, makes the specified vehicle to where if you press Y your character doesn't even attempt the animation to enter the vehicle. Hence it's not considered aka ignored.
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetVehicleIsConsideredByPlayer(vehicle: Vehicle, toggle: boolean): void;

/**
   * SET_VEHICLE_IS_STOLEN
   *
   * @param {number} vehicle
   * @param {boolean} isStolen
   * @return {void}
   */
declare function SetVehicleIsStolen(vehicle: Vehicle, isStolen: boolean): void;

/**
   * SET_VEHICLE_KEEP_ENGINE_ON_WHEN_ABANDONED
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetVehicleKeepEngineOnWhenAbandoned(vehicle: Vehicle, toggle: boolean): void;

/**
   * SET_VEHICLE_LIGHTS
   * Sets the vehicle's lights state.
   *
   * @param {number} vehicle
   * @param {number} state
   * @return {void}
   */
declare function SetVehicleLights(vehicle: Vehicle, state: number): void;

/**
   * SET_VEHICLE_LIMIT_SPEED_WHEN_PLAYER_INACTIVE
   * _SET_VEHICLE_LI*
   *
   * @param {number} vehicle
   * @param {boolean} p1
   * @return {void}
   */
declare function SetVehicleLimitSpeedWhenPlayerInactive(vehicle: Vehicle, p1: boolean): void;

/**
   * SET_VEHICLE_LOD_MULTIPLIER
   *
   * @param {number} vehicle
   * @param {number} multiplier
   * @return {void}
   */
declare function SetVehicleLodMultiplier(vehicle: Vehicle, multiplier: number): void;

/**
   * SET_VEHICLE_MAY_BE_USED_BY_GOTO_POINT_ANY_MEANS
   *
   * @param {number} vehicle
   * @param {boolean} p1
   * @return {void}
   */
declare function SetVehicleMayBeUsedByGotoPointAnyMeans(vehicle: Vehicle, p1: boolean): void;

/**
   * SET_VEHICLE_NOT_STEALABLE_AMBIENTLY
   *
   * @param {number} vehicle
   * @param {boolean} p1
   * @return {void}
   */
declare function SetVehicleNotStealableAmbiently(vehicle: Vehicle, p1: boolean): void;

/**
   * SET_VEHICLE_ON_GROUND_PROPERLY
   *
   * @param {number} vehicle
   * @param {boolean} p1
   * @return {boolean}
   */
declare function SetVehicleOnGroundProperly(vehicle: Vehicle, p1: boolean): boolean;

/**
   * SET_VEHICLE_PETROL_TANK_HEALTH
   * 1000 is max health
   *
   * @param {number} vehicle
   * @param {number} health
   * @return {void}
   */
declare function SetVehiclePetrolTankHealth(vehicle: Vehicle, health: number): void;

/**
   * SET_VEHICLE_PROVIDES_COVER
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetVehicleProvidesCover(vehicle: Vehicle, toggle: boolean): void;

/**
   * SET_VEHICLE_RESPECTS_LOCKS_WHEN_HAS_DRIVER
   *
   * @param {number} vehicle
   * @param {boolean} p1
   * @return {void}
   */
declare function SetVehicleRespectsLocksWhenHasDriver(vehicle: Vehicle, p1: boolean): void;

/**
   * SET_VEHICLE_SHOOT_AT_TARGET
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @return {void}
   */
declare function SetVehicleShootAtTarget(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;

/**
   * SET_VEHICLE_STAYS_FROZEN_WHEN_CLEANED_UP
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetVehicleStaysFrozenWhenCleanedUp(vehicle: Vehicle, toggle: boolean): void;

/**
   * SET_VEHICLE_STEER_BIAS
   * Locks the vehicle's steering to the desired angle, explained below.
   * 
   * Requires to be called onTick. Steering is unlocked the moment the function stops being called on the vehicle.
   * 
   * Steer bias:
   * -1.0 = full right
   * 0.0 = centered steering
   * 1.0 = full left
   *
   * @param {number} vehicle
   * @param {number} value
   * @return {void}
   */
declare function SetVehicleSteerBias(vehicle: Vehicle, value: number): void;

/**
   * SET_VEHICLE_STOP_INSTANTLY_WHEN_PLAYER_INACTIVE
   *
   * @param {number} vehicle
   * @param {boolean} p1
   * @return {void}
   */
declare function SetVehicleStopInstantlyWhenPlayerInactive(vehicle: Vehicle, p1: boolean): void;

/**
   * SET_VEHICLE_STRONG
   * If set to true, vehicle will not take crash damage, but is still susceptible to damage from bullets and explosives
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetVehicleStrong(vehicle: Vehicle, toggle: boolean): void;

/**
   * SET_VEHICLE_TYRES_CAN_BURST
   * Allows you to toggle bulletproof tires.
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetVehicleTyresCanBurst(vehicle: Vehicle, toggle: boolean): void;

/**
   * SET_VEHICLE_UNDRIVEABLE
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetVehicleUndriveable(vehicle: Vehicle, toggle: boolean): void;

/**
   * SET_VEHICLE_WHEELS_CAN_BREAK
   *
   * @param {number} vehicle
   * @param {boolean} enabled
   * @return {void}
   */
declare function SetVehicleWheelsCanBreak(vehicle: Vehicle, enabled: boolean): void;

/**
   * SET_VEHICLE_WHEELS_CAN_BREAK_OFF_WHEN_BLOW_UP
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetVehicleWheelsCanBreakOffWhenBlowUp(vehicle: Vehicle, toggle: boolean): void;

/**
   * SKIP_TIME_IN_PLAYBACK_RECORDED_VEHICLE
   * SET_TIME_POSITION_IN_RECORDING can be emulated by: desired_time - GET_TIME_POSITION_IN_RECORDING(vehicle)
   *
   * @param {number} vehicle
   * @param {number} time
   * @return {void}
   */
declare function SkipTimeInPlaybackRecordedVehicle(vehicle: Vehicle, time: number): void;

/**
   * START_PLAYBACK_RECORDED_VEHICLE
   * p3 is some flag related to 'trailers' (invokes CVehicle::GetTrailer).
   * 
   * See REQUEST_VEHICLE_RECORDING
   *
   * @param {number} vehicle
   * @param {number} recording
   * @param {string | number} script
   * @param {boolean} p3
   * @return {void}
   */
declare function StartPlaybackRecordedVehicle(vehicle: Vehicle, recording: number, script: string | number, p3: boolean): void;

/**
   * START_VEHICLE_HORN
   * Sounds the horn for the specified vehicle.
   * 
   * vehicle: The vehicle to activate the horn for.
   * mode: The hash of "NORMAL" or "HELDDOWN". Can be 0.
   * duration: The duration to sound the horn, in milliseconds.
   * 
   * Note: If a player is in the vehicle, it will only sound briefly.
   *
   * @param {number} vehicle
   * @param {number} duration
   * @param {number} mode
   * @param {boolean} forever
   * @return {void}
   */
declare function StartVehicleHorn(vehicle: Vehicle, duration: number, mode: Hash, forever: boolean): void;

/**
   * STOP_BRINGING_VEHICLE_TO_HALT
   * Old name: _STOP_BRING_VEHICLE_TO_HALT
   *
   * @param {number} vehicle
   * @return {void}
   */
declare function StopBringingVehicleToHalt(vehicle: Vehicle): void;

/**
   * STOP_PLAYBACK_RECORDED_VEHICLE
   *
   * @param {number} vehicle
   * @return {void}
   */
declare function StopPlaybackRecordedVehicle(vehicle: Vehicle): void;

/**
   * TRACK_VEHICLE_VISIBILITY
   *
   * @param {number} vehicle
   * @return {void}
   */
declare function TrackVehicleVisibility(vehicle: Vehicle): void;

/**
   * _0x012701ED938B85DE
   * Only used in SP Scripts.
   * Related to Vehicle Speed.
   *
   * @param {number} p0
   * @param {number} p1
   * @return {void}
   */
declare function N_0x012701ED938B85DE(p0: number, p1: number): void;

/**
   * _0x0355FE37240E2C77
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x0355FE37240E2C77(p0: any, p1: any): void;

/**
   * _0x04F0579DBDD32F34
   * _SET_VEHICLE_*
   *
   * @param {number} vehicle
   * @return {void}
   */
declare function N_0x04F0579DBDD32F34(vehicle: Vehicle): void;

/**
   * _0x0516FAE561276EFC
   * Takes value returned from 0x45853F4E17D847D5
   *
   * @param {number} trackIndex
   * @return {boolean}
   */
declare function N_0x0516FAE561276EFC(trackIndex: number): boolean;

/**
   * _0x06A09A6E0C6D2A84
   * _SET_TRAIN_*
   *
   * @param {number} train
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x06A09A6E0C6D2A84(train: Vehicle, p1: boolean): void;

/**
   * _0x0794199B25E499E1
   * _SET_VEHICLE_S*
   *
   * @param {number} wagon
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x0794199B25E499E1(wagon: Vehicle, p1: boolean): void;

/**
   * _0x07E2E21E799080A0
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x07E2E21E799080A0(p0: any, p1: any): void;

/**
   * _RETURN_TRAIN_INFO_FROM_HANDLE
   * Outputs track hash and junction index on given train vehicle handle.
   * _RESET_VEHICLE_* (?)
   *
   * @param {number} train
   * @return {[boolean, number, number]}
   */
declare function ReturnTrainInfoFromHandle(train: Vehicle): [boolean, number, number];

/**
   * _0x0BA4250D20007C2E
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x0BA4250D20007C2E(p0: any): any;

/**
   * _0x0CD7914D17A970AB
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x0CD7914D17A970AB(p0: any, p1: any): void;

/**
   * _0x0D5FDF0D36FA10CD
   *
   * @param {number} trackIndex
   * @return {void}
   */
declare function N_0x0D5FDF0D36FA10CD(trackIndex: number): void;

/**
   * _0x0E558D3A49D759D6
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0x0E558D3A49D759D6(p0: any, p1: any): any;

/**
   * _0x0F7F603BDE08C4D3
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x0F7F603BDE08C4D3(p0: any): void;

/**
   * _0x0FDDEE66E3465726
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x0FDDEE66E3465726(p0: any): any;

/**
   * _0x104D9A7B1C0D0783
   *
   * @param {number} vehicle
   * @param {number} p1
   * @return {void}
   */
declare function N_0x104D9A7B1C0D0783(vehicle: Vehicle, p1: number): void;

/**
   * _0x1121B07088ED3013
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x1121B07088ED3013(p0: any): any;

/**
   * _0x1180A2974D251B7B
   * Returns p1 for 0xBA958F68031DDBFC (stationIndex)
   * _GET_N* (NEAREST_STATION_FOR_TRAIN?)
   *
   * @param {number} train
   * @return {number}
   */
declare function N_0x1180A2974D251B7B(train: Vehicle): number;

/**
   * _0x12F6C6ED3EFF42DE
   * Params: coords = GET_ENTITY_VELOCITY
   * _SET_VELOCITY*
   *
   * @param {number} vehicle
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {void}
   */
declare function N_0x12F6C6ED3EFF42DE(vehicle: Vehicle, x: number, y: number, z: number): void;

/**
   * _0x13C190302369308B
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x13C190302369308B(p0: any): any;

/**
   * _0x13EB275BF81636D1
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x13EB275BF81636D1(p0: any, p1: any): void;

/**
   * _0x14DA8C4BC2CCD90A
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x14DA8C4BC2CCD90A(p0: any): any;

/**
   * _0x15206E88FF7617DF
   *
   * @param {number} trackIndex
   * @param {number} p1
   * @return {void}
   */
declare function N_0x15206E88FF7617DF(trackIndex: number, p1: number): void;

/**
   * _0x15CC8C33D7FFCC4A
   *
   * @param {number} vehicle
   * @param {number} p1
   * @return {void}
   */
declare function N_0x15CC8C33D7FFCC4A(vehicle: Vehicle, p1: number): void;

/**
   * _0x160C1B5AB48AB87C
   *
   * @param {number} train
   * @param {number} p1
   * @return {void}
   */
declare function N_0x160C1B5AB48AB87C(train: Vehicle, p1: number): void;

/**
   * _0x165BE2001E5E4B75
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x165BE2001E5E4B75(p0: any): void;

/**
   * _0x16B86A49E072AA85
   *
  
   * @return {void}
   */
declare function N_0x16B86A49E072AA85(): void;

/**
   * _0x172E9DD35858DCD7
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x172E9DD35858DCD7(p0: any): void;

/**
   * _ARE_ANY_VEHICLE_WHEELS_DESTROYED
   * returns true if any wheel is destroyed/detached
   *
   * @param {number} vehicle
   * @return {boolean}
   */
declare function AreAnyVehicleWheelsDestroyed(vehicle: Vehicle): boolean;

/**
   * _0x1A861F899EBBE17C
   *
   * @param {number} train
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x1A861F899EBBE17C(train: Vehicle, p1: boolean): void;

/**
   * _0x1BFBAFCC6760FF02
   *
   * @param {number} train
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x1BFBAFCC6760FF02(train: Vehicle, p1: boolean): void;

/**
   * _0x2045429505158D1A
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x2045429505158D1A(p0: any): any;

/**
   * _0x2200AB13CBD10F4E
   *
   * @param {number} vehicle
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {boolean} p4
   * @param {number} p5
   * @return {void}
   */
declare function N_0x2200AB13CBD10F4E(vehicle: Vehicle, x: number, y: number, z: number, p4: boolean, p5: number): void;

/**
   * _0x23F66C36F8E5EAAB
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x23F66C36F8E5EAAB(p0: any, p1: any): void;

/**
   * _0x27E3F2B57209FA54
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x27E3F2B57209FA54(p0: any, p1: any): void;

/**
   * _0x288CBB414C3C2FBB
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x288CBB414C3C2FBB(p0: any): any;

/**
   * _0x2A7413168F6CD5A8
   *
  
   * @return {void}
   */
declare function N_0x2A7413168F6CD5A8(): void;

/**
   * _0x2BB2B5BCF0DF8008
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x2BB2B5BCF0DF8008(p0: any, p1: any): void;

/**
   * _0x2C46D2A591D8C322
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {any}
   */
declare function N_0x2C46D2A591D8C322(p0: any, p1: any, p2: any): any;

/**
   * _0x3053064F909B5F42
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x3053064F909B5F42(p0: any, p1: any): void;

/**
   * _0x3137EDC899E6DAE4
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x3137EDC899E6DAE4(p0: any, p1: any): void;

/**
   * _0x331CBD247FC5DAA8
   * Returns trackIndex
   *
   * @param {number} configHash
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {boolean} direction
   * @param {boolean} p5
   * @return {number}
   */
declare function N_0x331CBD247FC5DAA8(configHash: Hash, x: number, y: number, z: number, direction: boolean, p5: boolean): number;

/**
   * _0x34BCF6209B9668A7
   *
   * @param {number} trackIndex
   * @param {any} p1
   * @return {void}
   */
declare function N_0x34BCF6209B9668A7(trackIndex: number, p1: any): void;

/**
   * _0x37D238BE69F7378A
   *
   * @param {number} trackIndex
   * @return {boolean}
   */
declare function N_0x37D238BE69F7378A(trackIndex: number): boolean;

/**
   * _0x38E7DD70A242D5CB
   *
   * @param {number} trackIndex
   * @param {number} p1
   * @return {void}
   */
declare function N_0x38E7DD70A242D5CB(trackIndex: number, p1: number): void;

/**
   * _0x3ABFA128F5BF5A70
   * Called together with 0xE6C5E2125EB210C1 in R* Script medium_update
   *
   * @param {number} trainTrack
   * @param {number} junctionIndex
   * @param {boolean} enabled
   * @return {void}
   */
declare function N_0x3ABFA128F5BF5A70(trainTrack: Hash, junctionIndex: number, enabled: boolean): void;

/**
   * _0x3D86997A86FEEF0D
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x3D86997A86FEEF0D(p0: any, p1: any): void;

/**
   * _0x41365DB586CD9E8E
   *
   * @param {number} trackIndex
   * @param {number} p1
   * @return {void}
   */
declare function N_0x41365DB586CD9E8E(trackIndex: number, p1: number): void;

/**
   * _0x41F0B254DDF71473
   * _H*
   *
   * @param {number} wagon
   * @return {void}
   */
declare function N_0x41F0B254DDF71473(wagon: Vehicle): void;

/**
   * _0x42404D57D621601A
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x42404D57D621601A(p0: any): any;

/**
   * _0x427C919E9809E370
   *
   * @param {number} trackIndex
   * @param {number} p1
   * @return {void}
   */
declare function N_0x427C919E9809E370(trackIndex: number, p1: number): void;

/**
   * _0x485B05EF05B9AEE9
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x485B05EF05B9AEE9(p0: any, p1: any): void;

/**
   * _0x4C05B42A8D937796
   *
  
   * @return {void}
   */
declare function N_0x4C05B42A8D937796(): void;

/**
   * _0x4C60C333F9CCA2B6
   * Params: p1 usually true in R* Scripts
   * _SET_DRAFT_VEHICLE_*
   *
   * @param {number} vehicle
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x4C60C333F9CCA2B6(vehicle: Vehicle, p1: boolean): void;

/**
   * _0x51C7694E140FAE43
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x51C7694E140FAE43(p0: any): any;

/**
   * _0x5AADC7BBBB1BCEEB
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {void}
   */
declare function N_0x5AADC7BBBB1BCEEB(p0: any, p1: any, p2: any, p3: any, p4: any): void;

/**
   * _0x615B3B8E73634509
   *
   * @param {number} trackIndex
   * @param {number} p1
   * @return {void}
   */
declare function N_0x615B3B8E73634509(trackIndex: number, p1: number): void;

/**
   * _0x63509DDF102E08E8
   *
   * @param {number} trackIndex
   * @param {number} p1
   * @return {void}
   */
declare function N_0x63509DDF102E08E8(trackIndex: number, p1: number): void;

/**
   * _0x6355602C02EDC6DF
   * Only used in R* Script beat_train_holdup: p1 = 1
   *
   * @param {number} entity
   * @param {any} p1
   * @return {void}
   */
declare function N_0x6355602C02EDC6DF(entity: Entity, p1: any): void;

/**
   * _0x6703872EC09BC158
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x6703872EC09BC158(p0: any, p1: any): void;

/**
   * _0x6835AFEA10E186F4
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x6835AFEA10E186F4(p0: any, p1: any): void;

/**
   * _0x68830738A6BFB370
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x68830738A6BFB370(p0: any, p1: any): void;

/**
   * _0x697DF68F3A761A50
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x697DF68F3A761A50(p0: any): void;

/**
   * _0x6B34BE961F639E21
   *
   * @param {number} trackIndex
   * @param {number} p1
   * @return {void}
   */
declare function N_0x6B34BE961F639E21(trackIndex: number, p1: number): void;

/**
   * _0x6B53F4B811E583D2
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function N_0x6B53F4B811E583D2(vehicle: Vehicle, toggle: boolean): void;

/**
   * _0x6C87F49BFA181DB5
   * Returns trackIndex
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {number}
   */
declare function N_0x6C87F49BFA181DB5(x: number, y: number, z: number): number;

/**
   * _0x6DE072AC8A95FFC1
   * _SET_INSTANTLY_* - _SET_MISSION_TRAIN*
   *
   * @param {number} vehicle
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x6DE072AC8A95FFC1(vehicle: Vehicle, p1: boolean): void;

/**
   * _0x6EA1273D525427F4
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0x6EA1273D525427F4(p0: any, p1: any, p2: any): void;

/**
   * _0x6FD7BDF10304363A
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x6FD7BDF10304363A(p0: any, p1: any): void;

/**
   * _0x703D4FB366DA4452
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x703D4FB366DA4452(p0: any, p1: any): void;

/**
   * _0x718EB706B6E998A0
   *
   * @param {number} trackIndex
   * @return {void}
   */
declare function N_0x718EB706B6E998A0(trackIndex: number): void;

/**
   * _0x73118A3EE9C9B6DB
   * _SET_VEHICLE_WHEELS_*
   *
   * @param {number} wagon
   * @param {number} p1
   * @param {boolean} p2
   * @return {void}
   */
declare function N_0x73118A3EE9C9B6DB(wagon: Vehicle, p1: number, p2: boolean): void;

/**
   * _0x7408B5C66BA31ADB
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
   * @return {void}
   */
declare function N_0x7408B5C66BA31ADB(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any, p10: any): void;

/**
   * _0x750D42C013F64AE7
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x750D42C013F64AE7(p0: any, p1: any): void;

/**
   * _0x762FDC4C19E5A981
   * Seems to be related while setting a (door) state of specific trains (midlandboxcar05x, privateboxcar01x, privateboxcar02x, midlandrefrigeratorCar, privateArmoured, armoredCar01x)
   *
   * @param {number} trainCarriage
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x762FDC4C19E5A981(trainCarriage: Entity, p1: boolean): void;

/**
   * _0x7840576C50A13DBA
   *
   * @param {number} train
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x7840576C50A13DBA(train: Vehicle, p1: boolean): void;

/**
   * _0x785639D89F8451AB
   *
   * @param {any} p0
   * @param {any} p1
   * @return {Vector3}
   */
declare function N_0x785639D89F8451AB(p0: any, p1: any): Vector3;

/**
   * _0x7BE0746539DEF0C8
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0x7BE0746539DEF0C8(p0: any, p1: any): any;

/**
   * _0x8379E05871AD24E0
   *
  
   * @return {void}
   */
declare function N_0x8379E05871AD24E0(): void;

/**
   * _0x850CE59DEC2028F3
   *
   * @param {number} vehicle
   * @param {any} p1
   * @return {void}
   */
declare function N_0x850CE59DEC2028F3(vehicle: Vehicle, p1: any): void;

/**
   * _0x873AAF600CC36DAC
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x873AAF600CC36DAC(p0: any): void;

/**
   * _0x877EA24EB1614495
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {any}
   */
declare function N_0x877EA24EB1614495(p0: any, p1: any, p2: any): any;

/**
   * _0x87B974E54C71BA7B
   *
   * @param {number} vehicle
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x87B974E54C71BA7B(vehicle: Vehicle, p1: boolean): void;

/**
   * _0x8878FF3EEE2868A9
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x8878FF3EEE2868A9(p0: any, p1: any): void;

/**
   * _0x8DECD262602548B9
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x8DECD262602548B9(p0: any, p1: any): void;

/**
   * _0x9868C0D0134855F7
   * nullsub, doesn't do anything
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x9868C0D0134855F7(p0: any): void;

/**
   * _0x98A7598C579EE871
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0x98A7598C579EE871(p0: any, p1: any, p2: any): void;

/**
   * _0x9CC94A948EAF5372
   * _GET_P - _GET_T*
   *
   * @param {number} trackIndex
   * @param {number} stationIndex
   * @return {number}
   */
declare function N_0x9CC94A948EAF5372(trackIndex: number, stationIndex: number): number;

/**
   * _0x9D12796EF4BF9EA9
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x9D12796EF4BF9EA9(p0: any): void;

/**
   * _0x9E8711C81AA17876
   * Forcing high LOD buoyancy for vehicle: p1 = false
   * _SET_A*
   *
   * @param {number} vehicle
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x9E8711C81AA17876(vehicle: Vehicle, p1: boolean): void;

/**
   * _0xA13028E22564A1BD
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xA13028E22564A1BD(p0: any, p1: any): void;

/**
   * _0xA230A5DDE12ED374
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xA230A5DDE12ED374(p0: any): void;

/**
   * _0xA72B1BF3857B94D7
   *
   * @param {number} train
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0xA72B1BF3857B94D7(train: Vehicle, p1: boolean): void;

/**
   * _0xA7966807953A18EE
   *
   * @param {number} trackIndex
   * @param {number} p1
   * @return {void}
   */
declare function N_0xA7966807953A18EE(trackIndex: number, p1: number): void;

/**
   * _0xA9E185D498B9AC67
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0xA9E185D498B9AC67(p0: any, p1: any): any;

/**
   * _0xAE7E66A61E7C17A5
   * _SET_TRAIN_*
   *
   * @param {number} train
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0xAE7E66A61E7C17A5(train: Vehicle, p1: boolean): void;

/**
   * _0xB4241AD8F5AEE9ED
   *
   * @param {number} trackIndex
   * @return {boolean}
   */
declare function N_0xB4241AD8F5AEE9ED(trackIndex: number): boolean;

/**
   * _0xB42C87521D1BDD2F
   *
   * @param {number} vehicle
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {void}
   */
declare function N_0xB42C87521D1BDD2F(vehicle: Vehicle, x: number, y: number, z: number): void;

/**
   * _0xB961DD799A837BD7
   *
  
   * @return {void}
   */
declare function N_0xB961DD799A837BD7(): void;

/**
   * _0xC2E62678D602853C
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
declare function N_0xC2E62678D602853C(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;

/**
   * _0xC325A6BAA62CF8A2
   * Used in Script Function MC_LOCAL_SETUP_VEH - enabling transitions
   *
   * @param {number} vehicle
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0xC325A6BAA62CF8A2(vehicle: Vehicle, p1: boolean): void;

/**
   * _0xC351394B932A6A50
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xC351394B932A6A50(p0: any): void;

/**
   * _0xC399CC89FBA05DA0
   *
   * @param {number} vehicle
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0xC399CC89FBA05DA0(vehicle: Vehicle, p1: boolean): void;

/**
   * _0xC4A2C11FC0D41916
   * _SET_DRAFT_VEHICLE_(STOP?)*
   *
   * @param {number} vehicle
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0xC4A2C11FC0D41916(vehicle: Vehicle, p1: boolean): void;

/**
   * _0xCACAB2B123BBDBD6
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {any}
   */
declare function N_0xCACAB2B123BBDBD6(p0: any, p1: any, p2: any): any;

/**
   * _0xCAFF2C9747103C02
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {any}
   */
declare function N_0xCAFF2C9747103C02(p0: any, p1: any, p2: any): any;

/**
   * _0xCBC7B6F9A56B79F6
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xCBC7B6F9A56B79F6(p0: any, p1: any): void;

/**
   * _0xCBF88256E44D5D39
   * Used in Script Function MC_LOCAL_SETUP_VEH - enabling transitions
   *
   * @param {number} vehicle
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0xCBF88256E44D5D39(vehicle: Vehicle, p1: boolean): void;

/**
   * _0xCEB1F1EED484A5B4
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xCEB1F1EED484A5B4(p0: any, p1: any): void;

/**
   * _0xCF342503CA4C8DF1
   *
   * @param {number} vehicle
   * @param {number} p1
   * @return {void}
   */
declare function N_0xCF342503CA4C8DF1(vehicle: Vehicle, p1: number): void;

/**
   * _REQUEST_VEHICLE_ASSET_ANIMS
   *
   * @param {number} ped
   * @param {number} entity
   * @param {number} vehicleAsset
   * @return {void}
   */
declare function RequestVehicleAssetAnims(ped: Ped, entity: Entity, vehicleAsset: number): void;

/**
   * _0xD0116DF21E6C7B36
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0xD0116DF21E6C7B36(p0: any, p1: any): any;

/**
   * _0xD0AABE5B9F8FA589
   *
   * @param {number} trackIndex
   * @param {number} p1
   * @return {void}
   */
declare function N_0xD0AABE5B9F8FA589(trackIndex: number, p1: number): void;

/**
   * _0xD0BA1853D76683C8
   *
   * @param {number} trackIndex
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {any} p4
   * @return {void}
   */
declare function N_0xD0BA1853D76683C8(trackIndex: number, x: number, y: number, z: number, p4: any): void;

/**
   * _0xD1DF5E54F4ACBE1A
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @return {any}
   */
declare function N_0xD1DF5E54F4ACBE1A(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): any;

/**
   * _0xD1EFA8D68BF5D63D
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function N_0xD1EFA8D68BF5D63D(p0: any, p1: any, p2: any, p3: any): void;

/**
   * _0xD21A3D421E7F09F7
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xD21A3D421E7F09F7(p0: any, p1: any): void;

/**
   * _0xD4907EF4334C7602
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xD4907EF4334C7602(p0: any, p1: any): void;

/**
   * _0xD826690B5CF3BEFF
   *
   * @param {number} vehicle
   * @param {any} p1
   * @return {void}
   */
declare function N_0xD826690B5CF3BEFF(vehicle: Vehicle, p1: any): void;

/**
   * _0xD9BF3ED8EFB67EA3
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {any}
   */
declare function N_0xD9BF3ED8EFB67EA3(p0: any, p1: any, p2: any, p3: any, p4: any): any;

/**
   * _0xDC0556D0F484ECAA
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xDC0556D0F484ECAA(p0: any): void;

/**
   * _0xDC69F6913CCA0B99
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xDC69F6913CCA0B99(p0: any, p1: any): void;

/**
   * _0xDD100CE1EBBF37E3
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xDD100CE1EBBF37E3(p0: any, p1: any): void;

/**
   * _0xDE8C5B9F65017FA1
   *
   * @param {number} train
   * @return {any}
   */
declare function N_0xDE8C5B9F65017FA1(train: Vehicle): any;

/**
   * _0xE12F5ED49F44D40D
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xE12F5ED49F44D40D(p0: any): void;

/**
   * _0xE1C0F8781BF130C2
   * Only used in R* SP Script rcm_abigail31: p1 = 5
   * _GET_VEHICLE_T* - _GET_VO*
   *
   * @param {number} wagon
   * @param {number} p1
   * @return {boolean}
   */
declare function N_0xE1C0F8781BF130C2(wagon: Vehicle, p1: number): boolean;

/**
   * _0xE682002DB1F30669
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xE682002DB1F30669(p0: any): void;

/**
   * _0xE6BD7DD3FD474415
   *
   * @param {number} train
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0xE6BD7DD3FD474415(train: Vehicle, p1: boolean): void;

/**
   * _0xE777DDF3E78397E8
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xE777DDF3E78397E8(p0: any): any;

/**
   * _0xE78993FF9022C064
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xE78993FF9022C064(p0: any): void;

/**
   * _0xEF28A614B4B264B8
   * _SET_TRAIN_*
   *
   * @param {number} train
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0xEF28A614B4B264B8(train: Vehicle, p1: boolean): void;

/**
   * _0xF05DFAF1ADFEF2CD
   * _IS_* (related to CREATE_MISSION_TRAIN)
   *
   * @param {number} trainConfig
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {boolean} direction
   * @param {boolean} p5
   * @return {boolean}
   */
declare function N_0xF05DFAF1ADFEF2CD(trainConfig: Hash, x: number, y: number, z: number, direction: boolean, p5: boolean): boolean;

/**
   * _0xF57DB8E83DCD8349
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xF57DB8E83DCD8349(p0: any): any;

/**
   * _0xF5EA41C1408695FB
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {any}
   */
declare function N_0xF5EA41C1408695FB(p0: any, p1: any, p2: any, p3: any): any;

/**
   * _0xF6E3D38869D0F7AD
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xF6E3D38869D0F7AD(p0: any): void;

/**
   * _0xF8F7DA13CFBD4532
   *
   * @param {number} trackIndex
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0xF8F7DA13CFBD4532(trackIndex: number, p1: boolean): void;

/**
   * _0xFC4F15A7DDDC47B1
   * _SET_DRAFT_VEHICLE_*
   *
   * @param {number} vehicle
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0xFC4F15A7DDDC47B1(vehicle: Vehicle, p1: boolean): void;

/**
   * _0xFF2B1F59FB892F14
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xFF2B1F59FB892F14(p0: any): void;

/**
   * _0xFFFE15B433300B8C
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0xFFFE15B433300B8C(p0: any, p1: any, p2: any): void;

/**
   * _ADD_TRAIN_TEMPORARY_STOP
   *
   * @param {number} train
   * @param {number} trackIndex
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {void}
   */
declare function AddTrainTemporaryStop(train: Vehicle, trackIndex: number, x: number, y: number, z: number): void;

/**
   * _ATTACH_DRAFT_VEHICLE_HARNESS_PED
   *
   * @param {number} mount
   * @param {number} draft
   * @param {number} harnessId
   * @return {boolean}
   */
declare function AttachDraftVehicleHarnessPed(mount: Ped, draft: Vehicle, harnessId: number): boolean;

/**
   * _BREAK_OFF_DRAFT_WHEEL
   * Params: destroyingForce is usually 100f in R* Scripts
   * Similar to 0xD4F5EFB55769D272, _A*
   *
   * @param {number} vehicle
   * @param {number} wheelIndex
   * @param {number} destroyingForce
   * @return {void}
   */
declare function BreakOffDraftWheel(vehicle: Vehicle, wheelIndex: number, destroyingForce: number): void;

/**
   * _BREAK_OFF_VEHICLE_WHEEL
   * wheelIndex 0: left, wheelIndex 1: right, 4 & 5: unknown
   *
   * @param {number} vehicle
   * @param {number} wheelIndex
   * @return {number}
   */
declare function BreakOffVehicleWheel(vehicle: Vehicle, wheelIndex: number): Entity;

/**
   * _CREATE_DRAFT_VEHICLE
   * Identical to CREATE_VEHICLE but allows to set draftAnimalPopGroup (see popgroups.#mt for DRAFT_HORSES_*)
   *
   * @param {number} modelHash
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} heading
   * @param {boolean} isNetwork
   * @param {boolean} bScriptHostVeh
   * @param {boolean} bDontAutoCreateDraftAnimals
   * @param {number} draftAnimalPopGroup
   * @param {boolean} p9
   * @return {number}
   */
declare function CreateDraftVehicle(modelHash: Hash, x: number, y: number, z: number, heading: number, isNetwork: boolean, bScriptHostVeh: boolean, bDontAutoCreateDraftAnimals: boolean, draftAnimalPopGroup: Hash, p9: boolean): Vehicle;

/**
   * _CREATE_MISSION_TRAIN
   * configHash: https://alloc8or.re/rdr3/doc/enums/eTrainConfig.txt
   * For more information, see trainconfigs.ymt
   * To make the train AI controlled, set conductor to true and set the speed once.
   *
   * @param {number} configHash
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {boolean} direction
   * @param {boolean} passengers
   * @param {boolean} p6
   * @param {boolean} conductor
   * @return {number}
   */
declare function CreateMissionTrain(configHash: Hash, x: number, y: number, z: number, direction: boolean, passengers: boolean, p6: boolean, conductor: boolean): Vehicle;

/**
   * _DELETE_VEHICLE_LANTERNS
   * Spawn without lanterns set
   *
   * @param {number} vehicle
   * @return {boolean}
   */
declare function DeleteVehicleLanterns(vehicle: Vehicle): boolean;

/**
   * _DETACH_DRAFT_VEHICLE_HARNESS_FROM_INDEX
   *
   * @param {number} draft
   * @param {number} harnessId
   * @return {boolean}
   */
declare function DetachDraftVehicleHarnessFromIndex(draft: Vehicle, harnessId: number): boolean;

/**
   * _DETACH_DRAFT_VEHICLE_HARNESS_PED
   *
   * @param {number} draft
   * @param {number} ped
   * @return {boolean}
   */
declare function DetachDraftVehicleHarnessPed(draft: Vehicle, ped: Ped): boolean;

/**
   * _DETACH_WAGON_ENTITY_FROM_TRAIN
   * Only used in train_robbery4 R* Script
   * _C* - _DEL*
   *
   * @param {number} entity
   * @return {void}
   */
declare function DetachWagonEntityFromTrain(entity: Entity): void;

/**
   * _DOES_TRAIN_EXIST_ON_TRACK
   *
   * @param {number} trackIndex
   * @return {boolean}
   */
declare function DoesTrainExistOnTrack(trackIndex: number): boolean;

/**
   * _FADE_AND_DESTROY_VEHICLE
   *
  
   * @return {number}
   */
declare function FadeAndDestroyVehicle(): Vehicle;

/**
   * _GET_BREAKABLE_VEHICLE_LOCKS_STATE
   *
   * @param {number} vehicle
   * @return {number}
   */
declare function GetBreakableVehicleLocksState(vehicle: Vehicle): number;

/**
   * _GET_BREAKABLE_VEHICLE_LOCK_OBJECT
   *
   * @param {number} vehicle
   * @param {number} index
   * @return {number}
   */
declare function GetBreakableVehicleLockObject(vehicle: Vehicle, index: number): number;

/**
   * _GET_CHECKPOINT_TRAIN_SPAWN_LOCATION
   *
   * @param {number} trackIndex
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} distance
   * @param {boolean} direction
   * @return {Vector3}
   */
declare function GetCheckpointTrainSpawnLocation(trackIndex: number, x: number, y: number, z: number, distance: number, direction: boolean): Vector3;

/**
   * _GET_CURRENT_TRACK_FOR_TRAIN
   * Returns p0 for 0xBA958F68031DDBFC (trackIndex)
   *
   * @param {number} train
   * @return {number}
   */
declare function GetCurrentTrackForTrain(train: Vehicle): number;

/**
   * _GET_DRAFT_VEHICLE_DESIRED_SPEED
   * Returns rage::NumericLimits<float>::kMax (3.402823466e+38) if vehicle is not a valid vehicle of type VEHICLE_TYPE_DRAFT.
   *
   * @param {number} vehicle
   * @return {number}
   */
declare function GetDraftVehicleDesiredSpeed(vehicle: Vehicle): number;

/**
   * _GET_NEAREST_TRAIN_TRACK_POSITION
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {Vector3}
   */
declare function GetNearestTrainTrackPosition(x: number, y: number, z: number): Vector3;

/**
   * _GET_NUM_BREAKABLE_VEHICLE_LOCK_OBJECTS
   *
   * @param {number} vehicle
   * @return {number}
   */
declare function GetNumBreakableVehicleLockObjects(vehicle: Vehicle): number;

/**
   * _GET_NUM_CARS_FROM_TRAIN_CONFIG
   * Returns amount for CAN_REGISTER_MISSION_VEHICLES
   *
   * @param {number} trainConfig
   * @return {number}
   */
declare function GetNumCarsFromTrainConfig(trainConfig: Hash): number;

/**
   * _GET_NUM_DRAFT_VEHICLE_HARNESS_PED
   * Returns number of horses a wagon can have
   *
   * @param {number} modelHash
   * @return {number}
   */
declare function GetNumDraftVehicleHarnessPed(modelHash: Hash): number;

/**
   * _GET_PED_IN_DRAFT_HARNESS
   * enum eDraftHarness
   * {
   *   DRAFT_HARNESS_LR,
   *   DRAFT_HARNESS_RR,
   *   DRAFT_HARNESS_LM,
   *   DRAFT_HARNESS_RM,
   *   DRAFT_HARNESS_LF,
   *   DRAFT_HARNESS_RF,
   *   DRAFT_HARNESS_COUNT
   * };
   *
   * @param {number} vehicle
   * @param {number} harnessId
   * @return {number}
   */
declare function GetPedInDraftHarness(vehicle: Vehicle, harnessId: number): Ped;

/**
   * _GET_ROWING_OARS
   * Returns handles of boat paddles entities.
   *
   * @param {number} vehicle
   * @param {number} left
   * @param {number} right
   * @return {void}
   */
declare function GetRowingOars(vehicle: Vehicle, left: Entity, right: Entity): void;

/**
   * _GET_STATION_COORDS_FROM_TRAIN_STATION_DATA
   * Returns Coords of vStation
   * p0 - NET_TRAIN_MANAGER_GET_TRAIN_STATION_DATA
   * _GET_P* - _GET_T*
   *
   * @param {number} trackIndex
   * @param {number} stationIndex
   * @return {Vector3}
   */
declare function GetStationCoordsFromTrainStationData(trackIndex: number, stationIndex: number): Vector3;

/**
   * _GET_TRACK_INDEX_FROM_COORDS
   * Returns trackIndex
   * _E* - _F*
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {number}
   */
declare function GetTrackIndexFromCoords(x: number, y: number, z: number): number;

/**
   * _GET_TRAIN_CAR
   * Returns train car, use GET_TRAIN_CARRIAGE when trailerNumber is bigger than 0
   *
   * @param {number} train
   * @return {number}
   */
declare function GetTrainCar(train: Vehicle): Entity;

/**
   * _GET_TRAIN_CARRIAGE_TRAILER_NUMBER
   * Returns iNumCars - to be used with GET_TRAIN_CARRIAGE (trailerNumber)
   * _C* (O, P, Q, R)
   *
   * @param {number} train
   * @return {number}
   */
declare function GetTrainCarriageTrailerNumber(train: Vehicle): number;

/**
   * _GET_TRAIN_DIRECTION
   *
   * @param {number} train
   * @return {boolean}
   */
declare function GetTrainDirection(train: Vehicle): boolean;

/**
   * _GET_TRAIN_DIRECTION_FROM_INDEX
   * https://i.imgur.com/1rHibjW.jpg
   *
   * @param {number} trackIndex
   * @return {boolean}
   */
declare function GetTrainDirectionFromIndex(trackIndex: number): boolean;

/**
   * _GET_TRAIN_MODEL_FROM_TRAIN_CONFIG_BY_CAR_INDEX
   * Returns modelHash
   *
   * @param {number} trainConfig
   * @param {number} trainCarIndex
   * @return {number}
   */
declare function GetTrainModelFromTrainConfigByCarIndex(trainConfig: Hash, trainCarIndex: number): number;

/**
   * _GET_TRAIN_POSITION_ON_TRACK
   *
   * @param {number} trackIndex
   * @return {Vector3}
   */
declare function GetTrainPositionOnTrack(trackIndex: number): Vector3;

/**
   * _GET_TRAIN_TRACK_FROM_TRAIN_VEHICLE
   * Returns trackIndex
   *
   * @param {number} train
   * @return {number}
   */
declare function GetTrainTrackFromTrainVehicle(train: Vehicle): number;

/**
   * _GET_TRAIN_TRACK_JUNCTION_AT_COORDS
   * Outputs junctionIndex, to be used with 0xE6C5E2125EB210C1
   *
   * @param {number} trainTrack
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {[boolean, number]}
   */
declare function GetTrainTrackJunctionAtCoords(trainTrack: Hash, x: number, y: number, z: number): [boolean, number];

/**
   * _GET_TRAIN_VEHICLE_FROM_TRACK_INDEX
   * Returns train
   *
   * @param {number} trackIndex
   * @return {number}
   */
declare function GetTrainVehicleFromTrackIndex(trackIndex: number): Vehicle;

/**
   * _GET_VEHICLE_DOORS_LOCKED_FOR_TEAM
   *
   * @param {number} vehicle
   * @param {number} team
   * @return {boolean}
   */
declare function GetVehicleDoorsLockedForTeam(vehicle: Vehicle, team: number): boolean;

/**
   * _GET_VEHICLE_IS_PROP_SET_APPLIED
   *
   * @param {number} vehicle
   * @return {boolean}
   */
declare function GetVehicleIsPropSetApplied(vehicle: Vehicle): boolean;

/**
   * _GET_VEHICLE_LIVERY
   *
   * @param {number} vehicle
   * @return {number}
   */
declare function GetVehicleLivery(vehicle: Vehicle): number;

/**
   * _GET_VEHICLE_OWNER
   *
   * @param {number} vehicle
   * @return {number}
   */
declare function GetVehicleOwner(vehicle: Vehicle): Entity;

/**
   * _GET_VEHICLE_TINT
   *
   * @param {number} vehicle
   * @return {number}
   */
declare function GetVehicleTint(vehicle: Vehicle): number;

/**
   * _GET_VEHICLE_TURRET_SEAT
   *
   * @param {number} vehicle
   * @return {[boolean, number]}
   */
declare function GetVehicleTurretSeat(vehicle: Vehicle): [boolean, number];

/**
   * _HAS_TRAIN_LOADED
   *
   * @param {number} train
   * @return {boolean}
   */
declare function HasTrainLoaded(train: Vehicle): boolean;

/**
   * _HIDE_HORSE_REINS
   *
   * @param {number} vehicle
   * @return {void}
   */
declare function HideHorseReins(vehicle: Vehicle): void;

/**
   * _IS_BOAT_GROUNDED
   *
   * @param {number} vehicle
   * @return {boolean}
   */
declare function IsBoatGrounded(vehicle: Vehicle): boolean;

/**
   * _IS_PED_EXCLUSIVE_DRIVER_OF_VEHICLE
   *
   * @param {number} ped
   * @param {number} vehicle
   * @return {[boolean, number]}
   */
declare function IsPedExclusiveDriverOfVehicle(ped: Ped, vehicle: Vehicle): [boolean, number];

/**
   * _IS_THIS_MODEL_A_DRAFT_VEHICLE
   *
   * @param {number} model
   * @return {boolean}
   */
declare function IsThisModelADraftVehicle(model: Hash): boolean;

/**
   * _IS_VEHICLE_BROUGHT_TO_HALT
   * Only returns true if BRING_VEHICLE_TO_HALT is called on vehicle beforehand
   *
   * @param {number} vehicle
   * @return {boolean}
   */
declare function IsVehicleBroughtToHalt(vehicle: Vehicle): boolean;

/**
   * _IS_VEHICLE_DOOR_BROKEN
   * doorId: see SET_VEHICLE_DOOR_SHUT
   *
   * @param {number} vehicle
   * @param {number} doorId
   * @return {boolean}
   */
declare function IsVehicleDoorBroken(vehicle: Vehicle, doorId: number): boolean;

/**
   * _IS_VEHICLE_FADING_OUT
   *
   * @param {number} vehicle
   * @return {boolean}
   */
declare function IsVehicleFadingOut(vehicle: Vehicle): boolean;

/**
   * _IS_VEHICLE_ON_FIRE
   *
   * @param {number} vehicle
   * @return {boolean}
   */
declare function IsVehicleOnFire(vehicle: Vehicle): boolean;

/**
   * _IS_VEHICLE_WHEEL_DESTROYED
   *
   * @param {number} vehicle
   * @param {number} wheel
   * @return {boolean}
   */
declare function IsVehicleWheelDestroyed(vehicle: Vehicle, wheel: number): boolean;

/**
   * _SET_ALL_JUNCTIONS_CLEARED
   *
  
   * @return {void}
   */
declare function SetAllJunctionsCleared(): void;

/**
   * _SET_ALL_VEHICLE_GENERATORS_DISABLED_FOR_VOLUME
   *
   * @param {number} volume
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetAllVehicleGeneratorsDisabledForVolume(volume: Volume, toggle: boolean): void;

/**
   * _SET_BALLOON_HOVER_STATE
   * Params: 1.0f will make balloon hover
   *
   * @param {number} balloon
   * @param {number} p1
   * @return {void}
   */
declare function SetBalloonHoverState(balloon: Vehicle, p1: number): void;

/**
   * _SET_BATCH_TARP_HEIGHT
   * Total height is calculated using: cargo ratio + pelt ratio (by pelt count)
   * Screenshot: https://imgur.com/a/nsomtiv
   *
   * @param {number} vehicle
   * @param {number} height
   * @param {boolean} immediately
   * @return {void}
   */
declare function SetBatchTarpHeight(vehicle: Vehicle, height: number, immediately: boolean): void;

/**
   * _SET_DRAFT_ANIMAL_RANDOM_SEED
   *
   * @param {number} vehicle
   * @param {number} seed
   * @return {void}
   */
declare function SetDraftAnimalRandomSeed(vehicle: Vehicle, seed: number): void;

/**
   * _SET_DRAFT_VEHICLE_ALLOW_DRAFT_ANIMAL_AUTO_CREATION
   *
   * @param {number} vehicle
   * @param {boolean} allow
   * @return {void}
   */
declare function SetDraftVehicleAllowDraftAnimalAutoCreation(vehicle: Vehicle, allow: boolean): void;

/**
   * _SET_DRAFT_VEHICLE_ANIMALS_CAN_DETACH
   *
   * @param {number} draft
   * @param {boolean} canDetach
   * @return {void}
   */
declare function SetDraftVehicleAnimalsCanDetach(draft: Vehicle, canDetach: boolean): void;

/**
   * _SET_DRAFT_VEHICLE_DESIRED_SPEED
   *
   * @param {number} vehicle
   * @param {number} speed
   * @return {void}
   */
declare function SetDraftVehicleDesiredSpeed(vehicle: Vehicle, speed: number): void;

/**
   * _SET_DRAFT_VEHICLE_YOKE_CAN_BREAK
   *
   * @param {number} draft
   * @param {boolean} canBreak
   * @return {void}
   */
declare function SetDraftVehicleYokeCanBreak(draft: Vehicle, canBreak: boolean): void;

/**
   * _SET_FORCE_COACH_ROBBERY_LOOT
   * Hashes: COACH2_BOOT_LOOT_ITEMS_COACHROB_RSC, COACH2_BOOT_LOOT_ITEMS_COACHROB, COACH2_MARY3
   *
   * @param {number} vehicle
   * @param {number} coachrobberyLoot
   * @return {void}
   */
declare function SetForceCoachRobberyLoot(vehicle: Vehicle, coachrobberyLoot: Hash): void;

/**
   * _SET_FORCE_HIGH_LOD_VEHICLE
   *
   * @param {number} vehicle
   * @param {boolean} p1
   * @return {void}
   */
declare function SetForceHighLodVehicle(vehicle: Vehicle, p1: boolean): void;

/**
   * _SET_HORSE_TRAFFIC_GROUPING_DISTRIBUTION
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function SetHorseTrafficGroupingDistribution(p0: any, p1: any, p2: any, p3: any): void;

/**
   * _SET_MISSION_TRAIN_WARP_TO_COORDS
   * Notice: BOOL p4 was wrongly named takePassengers (?)
   * Can be used to rotate the train by setting the BOOL direction
   *
   * @param {number} train
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {boolean} direction
   * @return {void}
   */
declare function SetMissionTrainWarpToCoords(train: Vehicle, x: number, y: number, z: number, direction: boolean): void;

/**
   * _SET_TRAIN_HALT
   *
   * @param {number} train
   * @return {void}
   */
declare function SetTrainHalt(train: Vehicle): void;

/**
   * _SET_TRAIN_LEAVE_STATION
   * Restarts the train
   *
   * @param {number} train
   * @return {void}
   */
declare function SetTrainLeaveStation(train: Vehicle): void;

/**
   * _SET_TRAIN_MAX_SPEED
   * Maximum possible speed is 30.0 (108 km/h)
   *
   * @param {number} train
   * @param {number} speed
   * @return {void}
   */
declare function SetTrainMaxSpeed(train: Vehicle, speed: number): void;

/**
   * _SET_TRAIN_STOPS_FOR_STATIONS
   *
   * @param {number} train
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetTrainStopsForStations(train: Vehicle, toggle: boolean): void;

/**
   * _SET_TRAIN_TRACK_JUNCTION_SWITCH
   * trainTrack: FREIGHT_GROUP, TRAINS3, BRAITHWAITES2_TRACK_CONFIG, TRAINS_OLD_WEST01, TRAINS_OLD_WEST03, TRAINS_NB1, TRAINS_INTERSECTION1_ANN
   *
   * @param {number} trainTrack
   * @param {number} junctionIndex
   * @param {boolean} enabled
   * @return {void}
   */
declare function SetTrainTrackJunctionSwitch(trainTrack: Hash, junctionIndex: number, enabled: boolean): void;

/**
   * _SET_VEHICLE_DETERIORATION
   *
   * @param {number} vehicle
   * @param {number} amount
   * @param {number} p2
   * @param {boolean} p3
   * @return {void}
   */
declare function SetVehicleDeterioration(vehicle: Vehicle, amount: number, p2: number, p3: boolean): void;

/**
   * _SET_VEHICLE_DIRT_LEVEL_2
   * dirtLevel: 0.0 - 1.0
   *
   * @param {number} vehicle
   * @param {number} dirtLevel
   * @return {void}
   */
declare function SetVehicleDirtLevel_2(vehicle: Vehicle, dirtLevel: number): void;

/**
   * _SET_VEHICLE_IS_IN_HURRY
   *
   * @param {number} vehicle
   * @param {boolean} enabled
   * @return {void}
   */
declare function SetVehicleIsInHurry(vehicle: Vehicle, enabled: boolean): void;

/**
   * _SET_VEHICLE_LIVERY
   * https://github.com/femga/rdr3_discoveries/blob/master/vehicles/vehicle_modding/vehicle_liveries.lua
   *
   * @param {number} vehicle
   * @param {number} liveryIndex
   * @return {void}
   */
declare function SetVehicleLivery(vehicle: Vehicle, liveryIndex: number): void;

/**
   * _SET_VEHICLE_LOD_LEVEL
   * Ranges from -1 to 2? (internal type is int8)
   * https://imgur.com/a/bPzHcft
   *
   * @param {number} vehicle
   * @param {number} lodLevel
   * @return {void}
   */
declare function SetVehicleLodLevel(vehicle: Vehicle, lodLevel: number): void;

/**
   * _SET_VEHICLE_MUD_LEVEL
   * mudLevel: 0.0 - 1.0
   *
   * @param {number} vehicle
   * @param {number} mudLevel
   * @return {void}
   */
declare function SetVehicleMudLevel(vehicle: Vehicle, mudLevel: number): void;

/**
   * _SET_VEHICLE_SNOW_LEVEL
   * snowLevel: 0.0 - 1.0
   *
   * @param {number} vehicle
   * @param {number} snowLevel
   * @return {void}
   */
declare function SetVehicleSnowLevel(vehicle: Vehicle, snowLevel: number): void;

/**
   * _SET_VEHICLE_TINT
   * https://github.com/femga/rdr3_discoveries/blob/master/vehicles/vehicle_modding/vehicle_tints.lua
   *
   * @param {number} vehicle
   * @param {number} tintId
   * @return {void}
   */
declare function SetVehicleTint(vehicle: Vehicle, tintId: number): void;

/**
   * _SET_VEHICLE_WET_LEVEL
   * wetLevel: 0.0 - 1.0
   *
   * @param {number} vehicle
   * @param {number} wetLevel
   * @return {void}
   */
declare function SetVehicleWetLevel(vehicle: Vehicle, wetLevel: number): void;

/**
   * _SHOW_HORSE_REINS
   *
   * @param {number} vehicle
   * @return {void}
   */
declare function ShowHorseReins(vehicle: Vehicle): void;

/**
   * _TRIGGER_TRAIN_WHISTLE
   * whistleSequence: ACKNOWLEDGE, BACKING_UP, CROSSING, DANGER, MOVING, NEXT_STATION, PASSING, STOPPED
   * p2 = true seems to mute the sound
   *
   * @param {number} train
   * @param {string | number} whistleSequence
   * @param {boolean} p2
   * @param {boolean} p3
   * @return {void}
   */
declare function TriggerTrainWhistle(train: Vehicle, whistleSequence: string | number, p2: boolean, p3: boolean): void;