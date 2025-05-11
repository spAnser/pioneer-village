/**
   * ABSF
   *
   * @param {number} value
   * @return {number}
   */
declare function Absf(value: number): number;

/**
   * ABSI
   *
   * @param {number} value
   * @return {number}
   */
declare function Absi(value: number): number;

/**
   * ACOS
   *
   * @param {number} p0
   * @return {number}
   */
declare function Acos(p0: number): number;

/**
   * ACTION_MANAGER_ENABLE_ACTION
   * Appears to remove stealth kill action from memory (?)
   *
   * @param {number} hash
   * @param {boolean} enable
   * @return {void}
   */
declare function ActionManagerEnableAction(hash: Hash, enable: boolean): void;

/**
   * ACTION_MANAGER_IS_ACTION_ENABLED
   *
   * @param {number} hash
   * @return {boolean}
   */
declare function ActionManagerIsActionEnabled(hash: Hash): boolean;

/**
   * ACTIVITY_FEED_ACTION_START_WITH_COMMAND_LINE
   * nullsub, doesn't do anything
   *
   * @param {string | number} p0
   * @param {string | number} p1
   * @return {void}
   */
declare function ActivityFeedActionStartWithCommandLine(p0: string | number, p1: string | number): void;

/**
   * ACTIVITY_FEED_ACTION_START_WITH_COMMAND_LINE_ADD
   * nullsub, doesn't do anything
   *
   * @param {string | number} p0
   * @return {void}
   */
declare function ActivityFeedActionStartWithCommandLineAdd(p0: string | number): void;

/**
   * ACTIVITY_FEED_ADD_SUBSTRING_TO_CAPTION
   * nullsub, doesn't do anything
   *
   * @param {string | number} p0
   * @return {void}
   */
declare function ActivityFeedAddSubstringToCaption(p0: string | number): void;

/**
   * ACTIVITY_FEED_CREATE
   * nullsub, doesn't do anything
   *
   * @param {string | number} p0
   * @param {string | number} p1
   * @return {void}
   */
declare function ActivityFeedCreate(p0: string | number, p1: string | number): void;

/**
   * ACTIVITY_FEED_POST
   * nullsub, doesn't do anything
   *
  
   * @return {void}
   */
declare function ActivityFeedPost(): void;

/**
   * ADD_POP_MULTIPLIER_AREA
   *
   * @param {number} x1
   * @param {number} y1
   * @param {number} z1
   * @param {number} x2
   * @param {number} y2
   * @param {number} z2
   * @param {number} pedDensity
   * @param {number} trafficDensity
   * @param {boolean} p8
   * @param {boolean} p9
   * @return {number}
   */
declare function AddPopMultiplierArea(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, pedDensity: number, trafficDensity: number, p8: boolean, p9: boolean): number;

/**
   * ADD_TACTICAL_NAV_MESH_POINT
   * Params: p3 is 0 in R* Script utopia2
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} p3
   * @return {void}
   */
declare function AddTacticalNavMeshPoint(x: number, y: number, z: number, p3: number): void;

/**
   * ARE_STRINGS_EQUAL
   *
   * @param {string | number} string1
   * @param {string | number} string2
   * @return {boolean}
   */
declare function AreStringsEqual(string1: string | number, string2: string | number): boolean;

/**
   * ASIN
   *
   * @param {number} p0
   * @return {number}
   */
declare function Asin(p0: number): number;

/**
   * ATAN
   *
   * @param {number} p0
   * @return {number}
   */
declare function Atan(p0: number): number;

/**
   * ATAN2
   *
   * @param {number} p0
   * @param {number} p1
   * @return {number}
   */
declare function Atan2(p0: number, p1: number): number;

/**
   * BLOCK_DISPATCH_SERVICE_RESOURCE_CREATION
   * dispatchService: see ENABLE_DISPATCH_SERVICE
   *
   * @param {number} dispatchService
   * @param {boolean} toggle
   * @return {void}
   */
declare function BlockDispatchServiceResourceCreation(dispatchService: number, toggle: boolean): void;

/**
   * CANCEL_ONSCREEN_KEYBOARD
   * Old name: _CANCEL_ONSCREEN_KEYBOARD
   *
  
   * @return {void}
   */
declare function CancelOnscreenKeyboard(): void;

/**
   * CLEAR_ANGLED_AREA_OF_VEHICLES
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
declare function ClearAngledAreaOfVehicles(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;

/**
   * CLEAR_AREA
   * Possible flag names:
   * ALL_BASE = 0,
   * PROJECTILES = 1,
   * BROADCAST = 524288,
   * AMBIENT_POPULATION = 1048576
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @param {number} flag
   * @return {void}
   */
declare function ClearArea(x: number, y: number, z: number, radius: number, flag: number): void;

/**
   * CLEAR_BIT
   *
   * @param {number} offset
   * @return {number}
   */
declare function ClearBit(offset: number): number;

/**
   * CLEAR_OVERRIDE_WEATHER
   *
  
   * @return {void}
   */
declare function ClearOverrideWeather(): void;

/**
   * CLEAR_TACTICAL_NAV_MESH_POINTS
   *
  
   * @return {void}
   */
declare function ClearTacticalNavMeshPoints(): void;

/**
   * CLEAR_WEATHER_TYPE_PERSIST
   *
  
   * @return {void}
   */
declare function ClearWeatherTypePersist(): void;

/**
   * COMPARE_STRINGS
   *
   * @param {string | number} str1
   * @param {string | number} str2
   * @param {boolean} matchCase
   * @param {number} maxLength
   * @return {number}
   */
declare function CompareStrings(str1: string | number, str2: string | number, matchCase: boolean, maxLength: number): number;

/**
   * COPY_SCRIPT_STRUCT
   * Old name: _COPY_MEMORY
   *
   * @param {DataView} dst
   * @param {DataView} src
   * @param {number} size
   * @return {void}
   */
declare function CopyScriptStruct(dst: DataView, src: DataView, size: number): void;

/**
   * CREATE_INCIDENT
   * dispatchService: see ENABLE_DISPATCH_SERVICE
   *
   * @param {number} dispatchService
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} numUnits
   * @param {number} radius
   * @param {any} p7
   * @param {any} p8
   * @return {[boolean, number]}
   */
declare function CreateIncident(dispatchService: number, x: number, y: number, z: number, numUnits: number, radius: number, p7: any, p8: any): [boolean, number];

/**
   * DELETE_INCIDENT
   * Delete an incident with a given id.
   *
   * @param {number} incidentId
   * @return {void}
   */
declare function DeleteIncident(incidentId: number): void;

/**
   * DISABLE_LOOTING_COMPOSITE_LOOTABLE_THIS_FRAME
   * disables prompt eat 
   *
   * @param {number} compositeId
   * @param {boolean} disable
   * @return {void}
   */
declare function DisableLootingCompositeLootableThisFrame(compositeId: number, disable: boolean): void;

/**
   * DISPLAY_ONSCREEN_KEYBOARD
   * enum eOnscreenKeyboardTextType
   * {
   *   KTEXTTYPE_INVALID = -1,
   *   KTEXTTYPE_DEFAULT,
   *   KTEXTTYPE_EMAIL,
   *   KTEXTTYPE_PASSWORD,
   *   KTEXTTYPE_NUMERIC,
   *   KTEXTTYPE_ALPHABET,
   *   KTEXTTYPE_GAMERTAG,
   *   KTEXTTYPE_FILENAME,
   *   KTEXTTYPE_COUNT
   * };
   *
   * @param {number} textType
   * @param {string | number} windowTitle
   * @param {string | number} p2
   * @param {string | number} defaultText
   * @param {string | number} defaultConcat1
   * @param {string | number} defaultConcat2
   * @param {string | number} defaultConcat3
   * @param {number} maxInputLength
   * @return {void}
   */
declare function DisplayOnscreenKeyboard(textType: number, windowTitle: string | number, p2: string | number, defaultText: string | number, defaultConcat1: string | number, defaultConcat2: string | number, defaultConcat3: string | number, maxInputLength: number): void;

/**
   * DOES_POP_MULTIPLIER_AREA_EXIST
   *
   * @param {number} id
   * @return {boolean}
   */
declare function DoesPopMultiplierAreaExist(id: number): boolean;

/**
   * ENABLE_DISPATCH_SERVICE
   * enum DispatchType
   * {
   *   DT_Invalid,
   *   DT_PoliceAutomobile,
   *   DT_PoliceHelicopter,
   *   DT_FireDepartment,
   *   DT_SwatAutomobile,
   *   DT_AmbulanceDepartment,
   *   DT_PoliceRiders,
   *   DT_PoliceVehicleRequest,
   *   DT_PoliceRoadBlock,
   *   DT_PoliceAutomobileWaitPulledOver,
   *   DT_PoliceAutomobileWaitCruising,
   *   DT_Gangs,
   *   DT_SwatHelicopter,
   *   DT_PoliceBoat,
   *   DT_ArmyVehicle,
   *   DT_OnFoot,
   *   DT_PoliceDogs
   * };
   *
   * @param {number} dispatchService
   * @param {boolean} toggle
   * @return {void}
   */
declare function EnableDispatchService(dispatchService: number, toggle: boolean): void;

/**
   * FIRE_SINGLE_BULLET
   *
   * @param {DataView} args
   * @return {void}
   */
declare function FireSingleBullet(args: DataView): void;

/**
   * FORCE_LIGHTNING_FLASH
   * creates single lightning+thunder at random position
   *
  
   * @return {void}
   */
declare function ForceLightningFlash(): void;

/**
   * GAME_FRAMEWORK_MANAGER_INIT
   *
   * @param {number} transitionMode
   * @return {boolean}
   */
declare function GameFrameworkManagerInit(transitionMode: Hash): boolean;

/**
   * GET_ANGLE_BETWEEN_2D_VECTORS
   *
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @return {number}
   */
declare function GetAngleBetween_2DVectors(x1: number, y1: number, x2: number, y2: number): number;

/**
   * GET_BENCHMARK_ITERATIONS
   * Returns value of the '-benchmarkIterations' command line option.
   * 
   * Old name: _GET_BENCHMARK_ITERATIONS_FROM_COMMAND_LINE
   *
  
   * @return {number}
   */
declare function GetBenchmarkIterations(): number;

/**
   * GET_BENCHMARK_PASS
   * Returns value of the '-benchmarkPass' command line option.
   * 
   * Old name: _GET_BENCHMARK_PASS_FROM_COMMAND_LINE
   *
  
   * @return {number}
   */
declare function GetBenchmarkPass(): number;

/**
   * GET_BITS_IN_RANGE
   *
   * @param {number} value
   * @param {number} rangeStart
   * @param {number} rangeEnd
   * @return {number}
   */
declare function GetBitsInRange(value: number, rangeStart: number, rangeEnd: number): number;

/**
   * GET_CLOSEST_POINT_ON_LINE
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
   * @param {boolean} p9
   * @return {Vector3}
   */
declare function GetClosestPointOnLine(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number, p8: number, p9: boolean): Vector3;

/**
   * GET_COORDS_OF_PROJECTILE_TYPE_WITHIN_DISTANCE
   *
   * @param {number} ped
   * @param {number} weaponHash
   * @param {number} distance
   * @param {boolean} p4
   * @param {boolean} mustBeOwnedByThisPed
   * @return {[boolean, Vector3]}
   */
declare function GetCoordsOfProjectileTypeWithinDistance(ped: Ped, weaponHash: Hash, distance: number, p4: boolean, mustBeOwnedByThisPed: boolean): [boolean, Vector3];

/**
   * GET_CURR_WEATHER_STATE
   * Params: percentWeather2: 0f - 0.75f in R* Scripts
   * 
   * Old name: _GET_WEATHER_TYPE_TRANSITION
   *
  
   * @return {[number, number, number]}
   */
declare function GetCurrWeatherState(): [number, number, number];

/**
   * GET_DISTANCE_BETWEEN_COORDS
   * If useZ is false, only the 2D plane (X-Y) will be considered for calculating the distance.
   * 
   * Consider using this faster native instead: BUILTIN::VDIST - DVIST always takes in consideration the 3D coordinates.
   *
   * @param {number} x1
   * @param {number} y1
   * @param {number} z1
   * @param {number} x2
   * @param {number} y2
   * @param {number} z2
   * @param {boolean} useZ
   * @return {number}
   */
declare function GetDistanceBetweenCoords(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, useZ: boolean): number;

/**
   * GET_FRAME_COUNT
   *
  
   * @return {number}
   */
declare function GetFrameCount(): number;

/**
   * GET_FRAME_TIME
   *
  
   * @return {number}
   */
declare function GetFrameTime(): number;

/**
   * GET_GAME_TIMER
   *
  
   * @return {number}
   */
declare function GetGameTimer(): number;

/**
   * GET_GROUND_Z_AND_NORMAL_FOR_3D_COORD
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {[boolean, number, Vector3]}
   */
declare function GetGroundZAndNormalFor_3DCoord(x: number, y: number, z: number): [boolean, number, Vector3];

/**
   * GET_GROUND_Z_FOR_3D_COORD
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {boolean} p4
   * @return {[boolean, number]}
   */
declare function GetGroundZFor_3DCoord(x: number, y: number, z: number, p4: boolean): [boolean, number];

/**
   * GET_HASH_KEY
   * Computes a hash for the given string. It is hashed using Jenkins' One-at-a-Time hash algorithm (https://en.wikipedia.org/wiki/Jenkins_hash_function)
   * Note: this implementation is case-insensitive.
   *
   * @param {string | number} string
   * @return {number}
   */
declare function GetHashKey(string: string | number): number;

/**
   * GET_HEADING_FROM_VECTOR_2D
   * dx = x1 - x2
   * dy = y1 - y2
   *
   * @param {number} dx
   * @param {number} dy
   * @return {number}
   */
declare function GetHeadingFromVector_2D(dx: number, dy: number): number;

/**
   * GET_LINE_PLANE_INTERSECTION
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
   * @param {number} p10
   * @param {number} p11
   * @return {[boolean, number]}
   */
declare function GetLinePlaneIntersection(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number, p8: number, p9: number, p10: number, p11: number): [boolean, number];

/**
   * GET_MISSION_FLAG
   *
  
   * @return {boolean}
   */
declare function GetMissionFlag(): boolean;

/**
   * GET_MODEL_DIMENSIONS
   *
   * @param {number} modelHash
   * @return {[Vector3, Vector3]}
   */
declare function GetModelDimensions(modelHash: Hash): [Vector3, Vector3];

/**
   * GET_NUMBER_OF_FREE_STACKS_OF_THIS_SIZE
   *
   * @param {number} stackSize
   * @return {number}
   */
declare function GetNumberOfFreeStacksOfThisSize(stackSize: number): number;

/**
   * GET_NUMBER_OF_MICROSECONDS_SINCE_LAST_CALL
   *
  
   * @return {number}
   */
declare function GetNumberOfMicrosecondsSinceLastCall(): number;

/**
   * GET_ONSCREEN_KEYBOARD_RESULT
   * Returns NULL unless UPDATE_ONSCREEN_KEYBOARD() returns 1 in the same tick.
   *
  
   * @return {string | number}
   */
declare function GetOnscreenKeyboardResult(): string | number;

/**
   * GET_PROJECTILE_OF_PROJECTILE_TYPE_WITHIN_DISTANCE
   *
   * @param {number} ped
   * @param {number} weaponHash
   * @param {number} distance
   * @param {boolean} p5
   * @param {boolean} mustBeOwnedByThisPed
   * @return {[boolean, Vector3, number]}
   */
declare function GetProjectileOfProjectileTypeWithinDistance(ped: Ped, weaponHash: Hash, distance: number, p5: boolean, mustBeOwnedByThisPed: boolean): [boolean, Vector3, number];

/**
   * GET_RAIN_LEVEL
   *
  
   * @return {number}
   */
declare function GetRainLevel(): number;

/**
   * GET_RANDOM_EVENT_FLAG
   *
  
   * @return {boolean}
   */
declare function GetRandomEventFlag(): boolean;

/**
   * GET_RANDOM_FLOAT_IN_RANGE
   *
   * @param {number} startRange
   * @param {number} endRange
   * @return {number}
   */
declare function GetRandomFloatInRange(startRange: number, endRange: number): number;

/**
   * GET_RANDOM_INT_IN_RANGE
   *
   * @param {number} startRange
   * @param {number} endRange
   * @return {number}
   */
declare function GetRandomIntInRange(startRange: number, endRange: number): number;

/**
   * GET_REAL_WORLD_TIME
   * Returns GET_GAME_TIMER() / 1000
   * Only used in rcm_pearson1.ysc
   *
  
   * @return {number}
   */
declare function GetRealWorldTime(): number;

/**
   * GET_SCRIPT_TIME_WITHIN_FRAME_IN_MICROSECONDS
   *
  
   * @return {number}
   */
declare function GetScriptTimeWithinFrameInMicroseconds(): number;

/**
   * GET_SNOW_LEVEL
   *
  
   * @return {number}
   */
declare function GetSnowLevel(): number;

/**
   * GET_SYSTEM_TIME
   *
  
   * @return {number}
   */
declare function GetSystemTime(): number;

/**
   * GET_SYSTEM_TIME_STEP
   * Old name: _GET_BENCHMARK_TIME
   *
  
   * @return {number}
   */
declare function GetSystemTimeStep(): number;

/**
   * GET_WIND_DIRECTION
   *
  
   * @return {Vector3}
   */
declare function GetWindDirection(): Vector3;

/**
   * GET_WIND_SPEED
   *
  
   * @return {number}
   */
declare function GetWindSpeed(): number;

/**
   * HAS_BULLET_IMPACTED_IN_AREA
   * p3 - possibly radius?
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} p3
   * @param {boolean} p4
   * @param {boolean} p5
   * @return {boolean}
   */
declare function HasBulletImpactedInArea(x: number, y: number, z: number, p3: number, p4: boolean, p5: boolean): boolean;

/**
   * HAS_BULLET_IMPACTED_IN_BOX
   *
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {number} p4
   * @param {number} p5
   * @param {boolean} p6
   * @param {boolean} p7
   * @return {boolean}
   */
declare function HasBulletImpactedInBox(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: boolean, p7: boolean): boolean;

/**
   * IGNORE_NEXT_RESTART
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function IgnoreNextRestart(toggle: boolean): void;

/**
   * INFORM_CODE_OF_CONTENT_ID_OF_CURRENT_UGC_MISSION
   *
   * @param {string | number} p0
   * @return {void}
   */
declare function InformCodeOfContentIdOfCurrentUgcMission(p0: string | number): void;

/**
   * IS_BIT_SET
   *
   * @param {number} address
   * @param {number} offset
   * @return {boolean}
   */
declare function IsBitSet(address: number, offset: number): boolean;

/**
   * IS_BULLET_IN_ANGLED_AREA
   *
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {number} p4
   * @param {number} p5
   * @param {number} p6
   * @param {boolean} p7
   * @return {boolean}
   */
declare function IsBulletInAngledArea(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: boolean): boolean;

/**
   * IS_BULLET_IN_AREA
   *
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {boolean} p4
   * @return {boolean}
   */
declare function IsBulletInArea(p0: number, p1: number, p2: number, p3: number, p4: boolean): boolean;

/**
   * IS_BULLET_IN_BOX
   *
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {number} p4
   * @param {number} p5
   * @param {boolean} p6
   * @return {boolean}
   */
declare function IsBulletInBox(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: boolean): boolean;

/**
   * IS_DURANGO_VERSION
   * Hardcoded to return false.
   * Checks for XBOXONE Game Build.
   *
  
   * @return {boolean}
   */
declare function IsDurangoVersion(): boolean;

/**
   * IS_GAME_SESSION_STATE_MACHINE_IDLE
   *
  
   * @return {boolean}
   */
declare function IsGameSessionStateMachineIdle(): boolean;

/**
   * IS_INCIDENT_VALID
   *
   * @param {number} incidentId
   * @return {boolean}
   */
declare function IsIncidentValid(incidentId: number): boolean;

/**
   * IS_MAG_DEMO_1_ACTIVE
   * magdemo = magazine demo, i. e. for magazines such as IGN, pre play phases to prepare articles etc. - example 2012 builds for V
   * Hardcoded to return false.
   *
  
   * @return {boolean}
   */
declare function IsMagDemo_1Active(): boolean;

/**
   * IS_MINIGAME_IN_PROGRESS
   *
  
   * @return {boolean}
   */
declare function IsMinigameInProgress(): boolean;

/**
   * IS_ORBIS_VERSION
   * Hardcoded to return false.
   * Checks for PS4 Game Build.
   *
  
   * @return {boolean}
   */
declare function IsOrbisVersion(): boolean;

/**
   * IS_PC_VERSION
   * Hardcoded to return true.
   *
  
   * @return {boolean}
   */
declare function IsPcVersion(): boolean;

/**
   * IS_POSITION_OCCUPIED
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} range
   * @param {boolean} p4
   * @param {boolean} p5
   * @param {boolean} p6
   * @param {boolean} p7
   * @param {boolean} p8
   * @param {any} p9
   * @param {boolean} p10
   * @return {boolean}
   */
declare function IsPositionOccupied(x: number, y: number, z: number, range: number, p4: boolean, p5: boolean, p6: boolean, p7: boolean, p8: boolean, p9: any, p10: boolean): boolean;

/**
   * IS_PROJECTILE_IN_AREA
   * Determines whether there is a projectile within the specified coordinates. The coordinates form a rectangle.
   * 
   * ownedByPlayer = only projectiles fired by the player will be detected.
   *
   * @param {number} x1
   * @param {number} y1
   * @param {number} z1
   * @param {number} x2
   * @param {number} y2
   * @param {number} z2
   * @param {boolean} ownedByPlayer
   * @return {boolean}
   */
declare function IsProjectileInArea(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, ownedByPlayer: boolean): boolean;

/**
   * IS_PROJECTILE_TYPE_IN_ANGLED_AREA
   *
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {number} p4
   * @param {number} p5
   * @param {number} p6
   * @param {any} p7
   * @param {boolean} p8
   * @return {boolean}
   */
declare function IsProjectileTypeInAngledArea(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: any, p8: boolean): boolean;

/**
   * IS_PROJECTILE_TYPE_IN_AREA
   * Determines whether there is a projectile of a specific type within the specified coordinates. The coordinates form a rectangle.
   *
   * @param {number} xMin
   * @param {number} yMin
   * @param {number} zMin
   * @param {number} xMax
   * @param {number} yMax
   * @param {number} zMax
   * @param {number} weaponType
   * @param {boolean} isPlayer
   * @return {boolean}
   */
declare function IsProjectileTypeInArea(xMin: number, yMin: number, zMin: number, xMax: number, yMax: number, zMax: number, weaponType: Hash, isPlayer: boolean): boolean;

/**
   * IS_PROJECTILE_TYPE_WITHIN_DISTANCE
   *
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @param {any} p3
   * @param {number} p4
   * @param {boolean} p5
   * @return {boolean}
   */
declare function IsProjectileTypeWithinDistance(p0: number, p1: number, p2: number, p3: any, p4: number, p5: boolean): boolean;

/**
   * IS_STADIA_VERSION
   * Hardcoded to return false.
   *
  
   * @return {boolean}
   */
declare function IsStadiaVersion(): boolean;

/**
   * IS_STRING_NULL
   *
   * @param {string | number} string
   * @return {boolean}
   */
declare function IsStringNull(string: string | number): boolean;

/**
   * IS_STRING_NULL_OR_EMPTY
   *
   * @param {string | number} string
   * @return {boolean}
   */
declare function IsStringNullOrEmpty(string: string | number): boolean;

/**
   * IS_STRING_NULL_OR_EMPTY_OR_SPACES
   * Returns true if the entire string consists only of space characters.
   *
   * @param {string | number} string
   * @return {boolean}
   */
declare function IsStringNullOrEmptyOrSpaces(string: string | number): boolean;

/**
   * NETWORK_SET_SCRIPT_IS_SAFE_FOR_NETWORK_GAME
   *
  
   * @return {void}
   */
declare function NetworkSetScriptIsSafeForNetworkGame(): void;

/**
   * NEXT_ONSCREEN_KEYBOARD_RESULT_WILL_DISPLAY_USING_THESE_FONTS
   *
   * @param {number} fontBitField
   * @return {void}
   */
declare function NextOnscreenKeyboardResultWillDisplayUsingTheseFonts(fontBitField: number): void;

/**
   * OVERRIDE_SAVE_HOUSE
   *
   * @param {boolean} override
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} heading
   * @param {boolean} isAutosave
   * @return {[boolean, Vector3, number]}
   */
declare function OverrideSaveHouse(override: boolean, x: number, y: number, z: number, heading: number, isAutosave: boolean): [boolean, Vector3, number];

/**
   * PAUSE_DEATH_ARREST_RESTART
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function PauseDeathArrestRestart(toggle: boolean): void;

/**
   * POPULATE_NOW
   * spawns a few distant/out-of-sight peds, vehicles, animals etc each time it is called
   *
  
   * @return {void}
   */
declare function PopulateNow(): void;

/**
   * REGISTER_INTERACTION_LOCKON_PROMPT
   * p3 is usually the same value of radius
   * p8 determines whether the ILO prompt is a lock on prompt with RMB
   *
   * @param {number} entity
   * @param {string | number} text
   * @param {number} radius
   * @param {number} p3
   * @param {number} flag
   * @param {number} p5
   * @param {number} p6
   * @param {number} prompt
   * @param {boolean} p8
   * @param {number} p9
   * @return {boolean}
   */
declare function RegisterInteractionLockonPrompt(entity: Entity, text: string | number, radius: number, p3: number, flag: number, p5: number, p6: number, prompt: Prompt, p8: boolean, p9: number): boolean;

/**
   * REMOVE_DISPATCH_SPAWN_BLOCKING_AREA
   *
   * @param {any} p0
   * @return {void}
   */
declare function RemoveDispatchSpawnBlockingArea(p0: any): void;

/**
   * REMOVE_POP_MULTIPLIER_AREA
   *
   * @param {number} id
   * @param {boolean} p1
   * @return {void}
   */
declare function RemovePopMultiplierArea(id: number, p1: boolean): void;

/**
   * RESET_DISPATCH_IDEAL_SPAWN_DISTANCE
   *
  
   * @return {void}
   */
declare function ResetDispatchIdealSpawnDistance(): void;

/**
   * RESET_END_USER_BENCHMARK
   * Begins with RESET_*. Next character in the name is either D or E.
   * 
   * Old name: _RESET_BENCHMARK_RECORDING
   *
  
   * @return {void}
   */
declare function ResetEndUserBenchmark(): void;

/**
   * RESET_SCRIPT_TIME_WITHIN_FRAME
   *
  
   * @return {void}
   */
declare function ResetScriptTimeWithinFrame(): void;

/**
   * RESET_WANTED_RESPONSE_NUM_PEDS_TO_SPAWN
   *
  
   * @return {void}
   */
declare function ResetWantedResponseNumPedsToSpawn(): void;

/**
   * SAVE_END_USER_BENCHMARK
   * Saves the benchmark recording to %USERPROFILE%\Documents\Rockstar Games\Red Dead Redemption 2\Benchmarks and submits some metrics.
   * 
   * Old name: _SAVE_BENCHMARK_RECORDING
   *
  
   * @return {void}
   */
declare function SaveEndUserBenchmark(): void;

/**
   * SCRIPT_RACE_GET_PLAYER_SPLIT_TIME
   *
   * @param {any} p0
   * @param {DataView} p1
   * @param {DataView} p2
   * @return {boolean}
   */
declare function ScriptRaceGetPlayerSplitTime(p0: any, p1: DataView, p2: DataView): boolean;

/**
   * SCRIPT_RACE_INIT
   *
   * @param {number} numCheckpoints
   * @param {number} numLaps
   * @param {number} numPlayers
   * @param {any} p3
   * @return {void}
   */
declare function ScriptRaceInit(numCheckpoints: number, numLaps: number, numPlayers: number, p3: any): void;

/**
   * SCRIPT_RACE_PLAYER_HIT_CHECKPOINT
   *
   * @param {number} part
   * @param {number} checkpoint
   * @param {number} lap
   * @param {number} time
   * @return {void}
   */
declare function ScriptRacePlayerHitCheckpoint(part: number, checkpoint: number, lap: number, time: number): void;

/**
   * SCRIPT_RACE_SHUTDOWN
   *
  
   * @return {void}
   */
declare function ScriptRaceShutdown(): void;

/**
   * SET_BIT
   *
   * @param {number} offset
   * @return {number}
   */
declare function SetBit(offset: number): number;

/**
   * SET_BITS_IN_RANGE
   *
   * @param {number} rangeStart
   * @param {number} rangeEnd
   * @param {number} p3
   * @return {number}
   */
declare function SetBitsInRange(rangeStart: number, rangeEnd: number, p3: number): number;

/**
   * SET_CHEAT_ACTIVE
   * Cheats are GTA IV cheats:
   * 
   * 0 = unknown
   * 1 = unknown (same as 0)
   * 2 = Max Health and Armor
   * 3 = Raise Wanted Level
   * 4 = Lower Wanted Level
   * 5 = unknown (does nothing)
   * 6 = Change Weather
   * 7 = Spawn Annihilator
   * 8 = Spawn NRG 900
   * 9 = Spawn FBI
   * 10 = Spawn Jetmax
   * 11 = Spawn Comet
   * 12 = Spawn Turismo
   * 13 = Spawn Cognoscenti
   * 14 = Spawn Super GT
   * 15 = Spawn Sanchez
   * 
   * Initially used in Max Payne 3, that's why we know the name.
   *
   * @param {number} cheatId
   * @return {void}
   */
declare function SetCheatActive(cheatId: number): void;

/**
   * SET_CREDITS_ACTIVE
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetCreditsActive(toggle: boolean): void;

/**
   * SET_CURR_WEATHER_STATE
   * Params: BOOL p3 is always true
   * 
   * Old name: _SET_WEATHER_TYPE_TRANSITION
   *
   * @param {number} weatherType1
   * @param {number} weatherType2
   * @param {number} percentWeather2
   * @param {boolean} enabled
   * @return {void}
   */
declare function SetCurrWeatherState(weatherType1: Hash, weatherType2: Hash, percentWeather2: number, enabled: boolean): void;

/**
   * SET_DISPATCH_IDEAL_SPAWN_DISTANCE
   *
   * @param {number} fIdealSpawnDistance
   * @return {void}
   */
declare function SetDispatchIdealSpawnDistance(fIdealSpawnDistance: number): void;

/**
   * SET_FADE_IN_AFTER_DEATH_ARREST
   * Sets whether the game should fade in after the player dies or is arrested.
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetFadeInAfterDeathArrest(toggle: boolean): void;

/**
   * SET_FADE_IN_AFTER_LOAD
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetFadeInAfterLoad(toggle: boolean): void;

/**
   * SET_GAME_PAUSED
   * Make sure to call this from the correct thread if you're using multiple threads because all other threads except the one which is calling SET_GAME_PAUSED will be paused.
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetGamePaused(toggle: boolean): void;

/**
   * SET_MISSION_FLAG
   * If true, the player can't save the game.
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetMissionFlag(toggle: boolean): void;

/**
   * SET_PED_DECOMPOSED
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPedDecomposed(ped: Ped, toggle: boolean): void;

/**
   * SET_RAIN
   * Old name: _SET_RAIN_LEVEL
   *
   * @param {number} intensity
   * @return {void}
   */
declare function SetRain(intensity: number): void;

/**
   * SET_RANDOM_EVENT_FLAG
   * If the parameter is true, sets the random event flag to true, if the parameter is false, the function does nothing at all.
   * Does nothing if the mission flag is set.
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetRandomEventFlag(toggle: boolean): void;

/**
   * SET_RANDOM_SEED
   *
   * @param {number} seed
   * @return {void}
   */
declare function SetRandomSeed(seed: number): void;

/**
   * SET_RANDOM_WEATHER_TYPE
   *
   * @param {boolean} p0
   * @param {boolean} p1
   * @return {void}
   */
declare function SetRandomWeatherType(p0: boolean, p1: boolean): void;

/**
   * SET_SUPER_JUMP_THIS_FRAME
   *
   * @param {number} player
   * @return {void}
   */
declare function SetSuperJumpThisFrame(player: Player): void;

/**
   * SET_THIS_SCRIPT_CAN_BE_PAUSED
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetThisScriptCanBePaused(toggle: boolean): void;

/**
   * SET_THIS_SCRIPT_CAN_REMOVE_BLIPS_CREATED_BY_ANY_SCRIPT
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetThisScriptCanRemoveBlipsCreatedByAnyScript(toggle: boolean): void;

/**
   * SET_TIME_SCALE
   * Maximum value is 1.0f
   * At a value of 0.0f the game will still run at a minimum time scale.
   *
   * @param {number} timeScale
   * @return {void}
   */
declare function SetTimeScale(timeScale: number): void;

/**
   * SET_WEATHER_TYPE
   * https://github.com/femga/rdr3_discoveries/blob/master/weather/weather_types.lua
   *
   * @param {number} weatherType
   * @param {boolean} p1
   * @param {boolean} p2
   * @param {boolean} transition
   * @param {number} transitionTime
   * @param {boolean} p5
   * @return {void}
   */
declare function SetWeatherType(weatherType: Hash, p1: boolean, p2: boolean, transition: boolean, transitionTime: number, p5: boolean): void;

/**
   * SET_WIND_DIRECTION
   *
   * @param {number} direction
   * @return {void}
   */
declare function SetWindDirection(direction: number): void;

/**
   * SET_WIND_SPEED
   *
   * @param {number} speed
   * @return {void}
   */
declare function SetWindSpeed(speed: number): void;

/**
   * SHOOT_SINGLE_BULLET_BETWEEN_COORDS
   *
   * @param {number} x1
   * @param {number} y1
   * @param {number} z1
   * @param {number} x2
   * @param {number} y2
   * @param {number} z2
   * @param {number} damage
   * @param {boolean} p7
   * @param {number} weaponHash
   * @param {number} ownerPed
   * @param {boolean} isAudible
   * @param {boolean} isInvisible
   * @param {number} speed
   * @param {boolean} p13
   * @return {void}
   */
declare function ShootSingleBulletBetweenCoords(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, damage: number, p7: boolean, weaponHash: Hash, ownerPed: Ped, isAudible: boolean, isInvisible: boolean, speed: number, p13: boolean): void;

/**
   * SHOULD_USE_METRIC_MEASUREMENTS
   * Returns whether the game's measurement system is set to metric.
   *
  
   * @return {boolean}
   */
declare function ShouldUseMetricMeasurements(): boolean;

/**
   * START_END_USER_BENCHMARK
   * Begins with START_*. Next character in the name is either D or E.
   * 
   * Old name: _START_BENCHMARK_RECORDING
   *
  
   * @return {void}
   */
declare function StartEndUserBenchmark(): void;

/**
   * STOP_CURRENT_LOADING_PROGRESS_TIMER
   * nullsub, doesn't do anything
   *
  
   * @return {void}
   */
declare function StopCurrentLoadingProgressTimer(): void;

/**
   * STOP_END_USER_BENCHMARK
   * Begins with STOP_*. Next character in the name is either D or E.
   * 
   * Old name: _STOP_BENCHMARK_RECORDING
   *
  
   * @return {void}
   */
declare function StopEndUserBenchmark(): void;

/**
   * STRING_TO_INT
   * Returns false if it's a null or empty string or if the string is too long. outInteger will be set to -999 in that case.
   *
   * @param {string | number} string
   * @return {[boolean, number]}
   */
declare function StringToInt(string: string | number): [boolean, number];

/**
   * TAN
   *
   * @param {number} p0
   * @return {number}
   */
declare function Tan(p0: number): number;

/**
   * UI_STARTED_END_USER_BENCHMARK
   * Hardcoded to return false.
   * 
   * Old name: _UI_IS_SINGLEPLAYER_PAUSE_MENU_ACTIVE
   *
  
   * @return {boolean}
   */
declare function UiStartedEndUserBenchmark(): boolean;

/**
   * UNREGISTER_INTERACTION_LOCKON_PROMPT
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function UnregisterInteractionLockonPrompt(entity: Entity): boolean;

/**
   * UPDATE_ONSCREEN_KEYBOARD
   * Returns the current status of the onscreen keyboard, and updates the output.
   * 
   * Status Codes:
   * 
   * 0 - User still editing
   * 1 - User has finished editing
   * 2 - User has canceled editing
   * 3 - Keyboard isn't active
   *
  
   * @return {number}
   */
declare function UpdateOnscreenKeyboard(): number;

/**
   * VAR_STRING
   * Note: The first bit in 'flags' must not be set.
   * It is also required to pass at least one extra argument (this must be a text label string or hash).
   * When passing a hash, flags should be 0.
   *
   * @param {number} flags
   * @param {string | number} stringType
   * @param {string} value
   * @return {string | number}
   */
declare function VarString(flags: number, stringType: string | number, value: string): string | number;

/**
   * WATER_OVERRIDE_SET_OCEANWAVEMAXAMPLITUDE
   * Only used in smuggler2 script
   *
   * @param {number} maxAmplitude
   * @return {void}
   */
declare function WaterOverrideSetOceanwavemaxamplitude(maxAmplitude: number): void;

/**
   * WATER_OVERRIDE_SET_SHOREWAVEAMPLITUDE
   * Only used in smuggler2 script
   *
   * @param {number} amplitude
   * @return {void}
   */
declare function WaterOverrideSetShorewaveamplitude(amplitude: number): void;

/**
   * _0x0358B8A41916C613
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {any}
   */
declare function N_0x0358B8A41916C613(p0: any, p1: any, p2: any, p3: any): any;

/**
   * _0x0730E518486DEEC3
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x0730E518486DEEC3(p0: any): void;

/**
   * _DISABLE_COMPOSITE_PICK_PROMPT_THIS_FRAME
   * disables composite Pick prompt
   *
   * @param {number} compositeId
   * @param {boolean} disable
   * @return {void}
   */
declare function DisableCompositePickPromptThisFrame(compositeId: number, disable: boolean): void;

/**
   * _0x0A487CC74A517FB5
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x0A487CC74A517FB5(p0: any): void;

/**
   * _0x0D0AE5081F88CFE1
   *
   * @param {number} p0
   * @return {boolean}
   */
declare function N_0x0D0AE5081F88CFE1(p0: Hash): boolean;

/**
   * _0x1096603B519C905F
   * _SET_MISSION_NAME_*(FOR_ACTIVITY?/MINIGAME?)
   *
   * @param {string | number} name
   * @return {void}
   */
declare function N_0x1096603B519C905F(name: string | number): void;

/**
   * _0x154340E87D8CC178
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x154340E87D8CC178(p0: any): void;

/**
   * _0x183672FE838A661B
   *
   * @param {DataView} data
   * @return {void}
   */
declare function N_0x183672FE838A661B(data: DataView): void;

/**
   * _0x243CEDE8F916B994
   *
  
   * @return {void}
   */
declare function N_0x243CEDE8F916B994(): void;

/**
   * _0x2916B30DC6C41179
   *
   * @param {number} weatherType
   * @return {void}
   */
declare function N_0x2916B30DC6C41179(weatherType: Hash): void;

/**
   * _0x33982467B1E349EF
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
declare function N_0x33982467B1E349EF(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): any;

/**
   * _0x35165C658077CD0B
   *
  
   * @return {any}
   */
declare function N_0x35165C658077CD0B(): any;

/**
   * _0x38C0C9CAE1544500
   *
   * @param {number} p0
   * @return {void}
   */
declare function N_0x38C0C9CAE1544500(p0: Hash): void;

/**
   * _0x38C2BF94D15F464D
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x38C2BF94D15F464D(p0: any): any;

/**
   * _0x3A87FDA8F1B6CDFB
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0x3A87FDA8F1B6CDFB(p0: any, p1: any, p2: any): void;

/**
   * _0x3C3C7B1B5EC08764
   *
  
   * @return {void}
   */
declare function N_0x3C3C7B1B5EC08764(): void;

/**
   * _0x4647842FE8F31C1E
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x4647842FE8F31C1E(p0: any, p1: any): void;

/**
   * _0x49C44FE78A135A1D
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x49C44FE78A135A1D(p0: any): void;

/**
   * _0x49F3241C28EBBFBC
   *
   * @param {number} p0
   * @return {void}
   */
declare function N_0x49F3241C28EBBFBC(p0: number): void;

/**
   * _0x4B0501A468B749F8
   *
  
   * @return {void}
   */
declare function N_0x4B0501A468B749F8(): void;

/**
   * _0x4B101DBCC9482F2D
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0x4B101DBCC9482F2D(ped: Ped): boolean;

/**
   * _0x4D5C9CC7E7E23E09
   *
  
   * @return {void}
   */
declare function N_0x4D5C9CC7E7E23E09(): void;

/**
   * _0x553D67295DDD2309
   * UPDATE_PICKUP_COLLECTIBLE: set Eagle Eye fountain
   * _J*, _K*, _L*
   *
   * @param {number} entity
   * @return {void}
   */
declare function N_0x553D67295DDD2309(entity: Entity): void;

/**
   * _0x5801BE2DF2AF07EC
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x5801BE2DF2AF07EC(p0: any): void;

/**
   * _0x5B4A8121A47D844D
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x5B4A8121A47D844D(p0: any): any;

/**
   * _0x627B68D9CE6EE8DE
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x627B68D9CE6EE8DE(p0: any): any;

/**
   * _0x68319452C5064ABA
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x68319452C5064ABA(p0: any, p1: any): void;

/**
   * _0x6BCF7B5CD338281A
   * _SET_DISPATCH_*, unused
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0x6BCF7B5CD338281A(p0: any, p1: any, p2: any): void;

/**
   * _0x6BED40493A1AFDB8
   *
   * @param {DataView} p0
   * @param {number} p1
   * @return {void}
   */
declare function N_0x6BED40493A1AFDB8(p0: DataView, p1: number): void;

/**
   * _0x6C7B68D3CE60E8DE
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x6C7B68D3CE60E8DE(p0: any): any;

/**
   * _0x6F02B5E50511721E
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x6F02B5E50511721E(p0: any): any;

/**
   * _0x745808BB01CEC6B9
   *
   * @param {number} p0
   * @return {void}
   */
declare function N_0x745808BB01CEC6B9(p0: number): void;

/**
   * _0x74ACA66484CEBAF0
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x74ACA66484CEBAF0(p0: any): void;

/**
   * _0x7A76104CC2CC69E8
   *
   * @param {number} entity
   * @param {number} p1
   * @param {number} p2
   * @return {any}
   */
declare function N_0x7A76104CC2CC69E8(entity: Entity, p1: number, p2: number): any;

/**
   * _0x7CF96F1250EF3221
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x7CF96F1250EF3221(p0: any): any;

/**
   * _0x7FA58CED69405F9A
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x7FA58CED69405F9A(p0: any, p1: any): void;

/**
   * _0x8314FC2013ECE2DA
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {any}
   */
declare function N_0x8314FC2013ECE2DA(p0: any, p1: any, p2: any): any;

/**
   * _0x8BB99B85444544D9
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0x8BB99B85444544D9(p0: any, p1: any): any;

/**
   * _0x8C0F6A3D7236DEEB
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x8C0F6A3D7236DEEB(p0: any, p1: any): void;

/**
   * _0x8DB104CCEBCD58C5
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0x8DB104CCEBCD58C5(p0: any, p1: any): any;

/**
   * _STRING_SPLIT_AND_COUNT_SEGMENTS
   * Not officially named 
   * , Counts the number of segments in a string that are separated by specified delimiter characters, ignoring consecutive delimiters.
   *
   * @param {string | number} inputString
   * @param {string | number} delimiters
   * @return {number}
   */
declare function StringSplitAndCountSegments(inputString: string | number, delimiters: string | number): number;

/**
   * _0x94FCADCF9F0C368E
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x94FCADCF9F0C368E(p0: any): void;

/**
   * _0x96282005C5C6801F
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x96282005C5C6801F(p0: any, p1: any): void;

/**
   * _0x970339EFA4FDE518
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {any}
   */
declare function N_0x970339EFA4FDE518(p0: any, p1: any, p2: any): any;

/**
   * _0x9A252AA23D7098F2
   *
  
   * @return {void}
   */
declare function N_0x9A252AA23D7098F2(): void;

/**
   * _0x9BF2C0C568C61641
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x9BF2C0C568C61641(p0: any): void;

/**
   * _0xA08111B053D84B4D
   * _CLEAR*
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xA08111B053D84B4D(p0: any): void;

/**
   * _0xA3A8926951471C82
   *
  
   * @return {void}
   */
declare function N_0xA3A8926951471C82(): void;

/**
   * _0xA9342743B634A462
   * nullsub, doesn't do anything
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xA9342743B634A462(p0: any): void;

/**
   * _0xAB26DEEE120FD3FD
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xAB26DEEE120FD3FD(p0: any, p1: any): void;

/**
   * _0xAD44856A1CD29635
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0xAD44856A1CD29635(p0: any, p1: any, p2: any): void;

/**
   * _0xAF3A84C7DE6A1DC5
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xAF3A84C7DE6A1DC5(p0: any, p1: any): void;

/**
   * _0xAF530E56505D1BD6
   * Hardcoded to return one/true.
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xAF530E56505D1BD6(p0: any): any;

/**
   * _0xB08C4FA25BC29DB9
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xB08C4FA25BC29DB9(p0: any): void;

/**
   * _0xB1F6665AA54DCD5C
   *
   * @param {number} p0
   * @return {any}
   */
declare function N_0xB1F6665AA54DCD5C(p0: Hash): any;

/**
   * _0xB711EB4BC8D06013
   * nullsub, doesn't do anything
   *
  
   * @return {void}
   */
declare function N_0xB711EB4BC8D06013(): void;

/**
   * _0xBB282CF5D2333FB8
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xBB282CF5D2333FB8(p0: any, p1: any): void;

/**
   * _0xBBE5B63EFFB08E68
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
declare function N_0xBBE5B63EFFB08E68(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): any;

/**
   * _0xCC1BAF72D571DB8D
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {any}
   */
declare function N_0xCC1BAF72D571DB8D(p0: any, p1: any, p2: any): any;

/**
   * _0xCC3EDC5614B03F61
   *
   * @param {number} p0
   * @return {void}
   */
declare function N_0xCC3EDC5614B03F61(p0: number): void;

/**
   * _0xD3F943B88F55376A
   *
   * @param {number} weatherType
   * @return {void}
   */
declare function N_0xD3F943B88F55376A(weatherType: Hash): void;

/**
   * _0xDA4D8EB04E8E2928
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xDA4D8EB04E8E2928(p0: any): void;

/**
   * _0xDBDA48EC456ED908
   *
  
   * @return {void}
   */
declare function N_0xDBDA48EC456ED908(): void;

/**
   * _0xDC057B86FC157031
   * Hardcoded to return one/true.
   *
  
   * @return {any}
   */
declare function N_0xDC057B86FC157031(): any;

/**
   * _0xDC416CA762BC4F43
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @return {any}
   */
declare function N_0xDC416CA762BC4F43(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

/**
   * _0xDE2C3B74D2B3705C
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xDE2C3B74D2B3705C(p0: any, p1: any): void;

/**
   * _0xEB946B9E579729AD
   * Not implemented.
   *
   * @param {number} ped
   * @param {any} p1
   * @return {void}
   */
declare function N_0xEB946B9E579729AD(ped: Ped, p1: any): void;

/**
   * _0xF569E33FB72ED28E
   *
  
   * @return {void}
   */
declare function N_0xF569E33FB72ED28E(): void;

/**
   * _0xF63FA29D4A9ACA86
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xF63FA29D4A9ACA86(p0: any, p1: any): void;

/**
   * _0xF650DCF5D6F312C1
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xF650DCF5D6F312C1(p0: any): void;

/**
   * _0xF81C53561D15F330
   *
  
   * @return {string | number}
   */
declare function N_0xF81C53561D15F330(): string | number;

/**
   * _0xFC6ECB9170145ECE
   *
  
   * @return {void}
   */
declare function N_0xFC6ECB9170145ECE(): void;

/**
   * _0xFF252E2BAFB7330F
   * nullsub, doesn't do anything
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xFF252E2BAFB7330F(p0: any): void;

/**
   * _ADD_DISPATCH_SPAWN_BLOCKING_AREA
   *
   * @param {number} volume
   * @return {any}
   */
declare function AddDispatchSpawnBlockingArea(volume: Volume): any;

/**
   * _ADD_POP_MULTIPLIER_VOLUME
   * Only used in script function PROCESS_ZONE_CREATION
   * Returns Pop multiplier volume ID
   *
   * @param {number} volume
   * @param {number} pedDensity
   * @param {number} vehicleDensity
   * @param {boolean} p3
   * @param {boolean} p4
   * @return {number}
   */
declare function AddPopMultiplierVolume(volume: Volume, pedDensity: number, vehicleDensity: number, p3: boolean, p4: boolean): number;

/**
   * _CLEAR_ALL_BIT_FLAGS
   *
   * @param {DataView} bitFlags
   * @return {void}
   */
declare function ClearAllBitFlags(bitFlags: DataView): void;

/**
   * _CLEAR_BIT_FLAG
   *
   * @param {DataView} bitFlags
   * @param {number} flag
   * @return {void}
   */
declare function ClearBitFlag(bitFlags: DataView, flag: number): void;

/**
   * _CLEAR_VOLUME_AREA
   *
   * @param {number} volume
   * @param {number} flag
   * @return {void}
   */
declare function ClearVolumeArea(volume: Volume, flag: number): void;

/**
   * _CLEAR_WEATHER_TYPE_PERSIST_OVERTIME
   *
   * @param {number} milliseconds
   * @return {void}
   */
declare function ClearWeatherTypePersistOvertime(milliseconds: number): void;

/**
   * _CLEAR_WEATHER_VARIATION
   *
   * @param {string | number} weatherType
   * @param {boolean} p1
   * @return {void}
   */
declare function ClearWeatherVariation(weatherType: string | number, p1: boolean): void;

/**
   * _COUNT_BIT_FLAGS
   *
   * @param {DataView} bitFlags
   * @return {number}
   */
declare function CountBitFlags(bitFlags: DataView): number;

/**
   * _CREATE_AI_MEMORY
   * aiMemoryType: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/_CREATE_AI_MEMORY
   *
   * @param {DataView} args
   * @param {number} aiMemoryType
   * @return {void}
   */
declare function CreateAiMemory(args: DataView, aiMemoryType: number): void;

/**
   * _CREATE_COLOR_STRING
   * Returns a formatted string (0x%x)
   *
   * @param {number} rgb
   * @return {string | number}
   */
declare function CreateColorString(rgb: number): string | number;

/**
   * _CREATE_INCIDENT_WITH_ENTITIES
   * dispatchService: see ENABLE_DISPATCH_SERVICE
   * 
   * The entities must be added to itemSet.
   *
   * @param {number} dispatchService
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} itemSet
   * @param {number} radius
   * @return {[boolean, number]}
   */
declare function CreateIncidentWithEntities(dispatchService: number, x: number, y: number, z: number, itemSet: ItemSet, radius: number): [boolean, number];

/**
   * _DOES_ITEM_HAVE_VALID_BASE
   *
   * @param {number} item
   * @return {boolean}
   */
declare function DoesItemHaveValidBase(item: ScrHandle): boolean;

/**
   * _DOES_POP_MULTIPLIER_AREA_EXIST_FOR_VOLUME
   *
   * @param {number} volume
   * @return {boolean}
   */
declare function DoesPopMultiplierAreaExistForVolume(volume: Volume): boolean;

/**
   * _DOES_STRING_EXIST_IN_STRING
   *
   * @param {string | number} string1
   * @param {string | number} string2
   * @return {boolean}
   */
declare function DoesStringExistInString(string1: string | number, string2: string | number): boolean;

/**
   * _FORCE_LIGHTNING_FLASH_AT_COORDS
   * p3 is always -1.0f in the scripts
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} p3
   * @return {void}
   */
declare function ForceLightningFlashAtCoords(x: number, y: number, z: number, p3: number): void;

/**
   * _GAME_FRAMEWORK_MANAGER_GET_MODE
   *
  
   * @return {number}
   */
declare function GameFrameworkManagerGetMode(): number;

/**
   * _GAME_FRAMEWORK_MANAGER_SHUTDOWN
   *
  
   * @return {void}
   */
declare function GameFrameworkManagerShutdown(): void;

/**
   * _GET_AI_PED_DOES_HAVE_EVENT_MEMORY
   *
   * @param {DataView} args
   * @param {number} p1
   * @return {boolean}
   */
declare function GetAiPedDoesHaveEventMemory(args: DataView, p1: number): boolean;

/**
   * _GET_EASING_CURVE_VALUE
   * https://easings.net/
   * 
   * enum class eEasingCurveType
   * {
   *   TYPE_LINEAR,
   *   TYPE_QUADRATIC_IN,
   *   TYPE_QUADRATIC_OUT,
   *   TYPE_QUADRATIC_INOUT,
   *   TYPE_CUBIC_IN,
   *   TYPE_CUBIC_OUT,
   *   TYPE_CUBIC_INOUT,
   *   TYPE_QUARTIC_IN,
   *   TYPE_QUARTIC_OUT,
   *   TYPE_QUARTIC_INOUT,
   *   TYPE_QUINTIC_IN,
   *   TYPE_QUINTIC_OUT,
   *   TYPE_QUINTIC_INOUT,
   *   TYPE_EXPONENTIAL_IN,
   *   TYPE_EXPONENTIAL_OUT,
   *   TYPE_EXPONENTIAL_INOUT,
   *   TYPE_SINE_IN,
   *   TYPE_SINE_OUT,
   *   TYPE_SINE_INOUT,
   *   TYPE_CIRCULAR_IN,
   *   TYPE_CIRCULAR_OUT,
   *   TYPE_CIRCULAR_INOUT,
   *   TYPE_BOUNCE_IN,
   *   TYPE_BOUNCE_OUT,
   *   TYPE_BOUNCE_INOUT,
   *   TYPE_CUSTOM
   * };
   *
   * @param {number} t
   * @param {number} b
   * @param {number} d
   * @param {number} easingCurveType
   * @return {number}
   */
declare function GetEasingCurveValue(t: number, b: number, d: number, easingCurveType: number): number;

/**
   * _GET_ENTITY_FROM_ITEM
   *
   * @param {number} item
   * @return {number}
   */
declare function GetEntityFromItem(item: ScrHandle): Entity;

/**
   * _GET_FORCED_WEATHER
   * Returns the weather type that has been set by a script
   *
  
   * @return {[number, number]}
   */
declare function GetForcedWeather(): [number, number];

/**
   * _GET_GAME_TIMER_NON_SCALED_CLIPPED
   * Returns rage::fwTimer::sm_nonScaledClippedTime
   *
  
   * @return {number}
   */
declare function GetGameTimerNonScaledClipped(): number;

/**
   * _GET_ITEM_TYPE
   * 0 = invalid
   * 1 = CEntity
   * 2 = rage::volBase
   * 3 = rage::volSphere
   * 4 = rage::volBox
   * 5 = rage::volAggregate
   * 6 = rage::volCylinder
   * 7 = CScriptedCoverPoint
   * 8 = rage::ptfxScriptInfo
   * 9 = CPed
   * 10 = CVehicle
   * 11 = CObject
   * 12 = CItemSet
   * 13 = CPersistentCharacter
   *
   * @param {number} handle
   * @return {number}
   */
declare function GetItemType(handle: ScrHandle): number;

/**
   * _GET_LOOTING_EVENT_HAS_FIRED
   * Event names in the scripts: MGBegin, MGEnd, ReadyForCut
   *
   * @param {number} ped
   * @param {string | number} eventName
   * @return {boolean}
   */
declare function GetLootingEventHasFired(ped: Ped, eventName: string | number): boolean;

/**
   * _GET_MAX_NUM_INSTRUCTIONS
   *
  
   * @return {number}
   */
declare function GetMaxNumInstructions(): number;

/**
   * _GET_NEXT_WEATHER_TYPE_HASH_NAME
   *
  
   * @return {number}
   */
declare function GetNextWeatherTypeHashName(): number;

/**
   * _GET_NUMBER_OF_INSTRUCTIONS
   *
  
   * @return {number}
   */
declare function GetNumberOfInstructions(): number;

/**
   * _GET_OBJECT_FROM_INDEXED_ITEM
   *
   * @param {number} item
   * @return {number}
   */
declare function GetObjectFromIndexedItem(item: ScrHandle): number;

/**
   * _GET_PED_FROM_INDEXED_ITEM
   *
   * @param {number} item
   * @return {number}
   */
declare function GetPedFromIndexedItem(item: ScrHandle): Ped;

/**
   * _GET_PREV_WEATHER_TYPE_HASH_NAME
   *
  
   * @return {number}
   */
declare function GetPrevWeatherTypeHashName(): number;

/**
   * _GET_RANDOM_WEATHER_TYPE
   *
  
   * @return {number}
   */
declare function GetRandomWeatherType(): number;

/**
   * _GET_RANDOM_WEATHER_TYPE_INDEX
   *
  
   * @return {number}
   */
declare function GetRandomWeatherTypeIndex(): number;

/**
   * _GET_STATUS_OF_SAVEGAME_OPERATION
   * Only 0 and 1 are valid for p0, higher values causes the native to return 2.
   *
   * @param {number} p0
   * @return {number}
   */
declare function GetStatusOfSavegameOperation(p0: number): number;

/**
   * _GET_STRING_FROM_BOOL
   *
   * @param {boolean} value
   * @return {string | number}
   */
declare function GetStringFromBool(value: boolean): string | number;

/**
   * _GET_STRING_FROM_FLOAT
   *
   * @param {number} value
   * @param {number} digits
   * @return {string | number}
   */
declare function GetStringFromFloat(value: number, digits: number): string | number;

/**
   * _GET_STRING_FROM_VECTOR
   * Returns a string in the following format: <<%.4f,%.4f,%.4f>>
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {string | number}
   */
declare function GetStringFromVector(x: number, y: number, z: number): string | number;

/**
   * _GET_TEMPERATURE_AT_COORDS
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {number}
   */
declare function GetTemperatureAtCoords(x: number, y: number, z: number): number;

/**
   * _GET_VEHICLE_FROM_INDEXED_ITEM
   *
   * @param {number} item
   * @return {number}
   */
declare function GetVehicleFromIndexedItem(item: ScrHandle): Vehicle;

/**
   * _GET_VOLUME_FROM_INDEXED_ITEM
   *
   * @param {number} item
   * @return {number}
   */
declare function GetVolumeFromIndexedItem(item: ScrHandle): Volume;

/**
   * _INT_TO_STRING
   * Note: the buffer should be exactly 32 bytes long
   *
   * @param {number} value
   * @param {string | number} format
   * @param {string | number} buffer
   * @return {void}
   */
declare function IntToString(value: number, format: string | number, buffer: string | number): void;

/**
   * _IS_ANY_BIT_FLAG_SET
   *
   * @param {DataView} bitFlags
   * @return {boolean}
   */
declare function IsAnyBitFlagSet(bitFlags: DataView): boolean;

/**
   * _IS_BASE_A_COVER_POINT
   *
   * @param {number} handle
   * @return {boolean}
   */
declare function IsBaseACoverPoint(handle: ScrHandle): boolean;

/**
   * _IS_BASE_A_PERSISTENT_CHARACTER
   *
   * @param {number} handle
   * @return {boolean}
   */
declare function IsBaseAPersistentCharacter(handle: ScrHandle): boolean;

/**
   * _IS_BIT_FLAG_SET
   *
   * @param {DataView} bitFlags
   * @param {number} flag
   * @return {boolean}
   */
declare function IsBitFlagSet(bitFlags: DataView, flag: number): boolean;

/**
   * _IS_GLOBAL_BLOCK_VALID
   *
   * @param {number} index
   * @return {boolean}
   */
declare function IsGlobalBlockValid(index: number): boolean;

/**
   * _IS_MISSION_CREATOR_ACTIVE
   *
  
   * @return {boolean}
   */
declare function IsMissionCreatorActive(): boolean;

/**
   * _IS_PED_DECOMPOSED
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedDecomposed(ped: Ped): boolean;

/**
   * _IS_PLAYER_OWNING_STANDALONE_SP
   *
  
   * @return {boolean}
   */
declare function IsPlayerOwningStandaloneSp(): boolean;

/**
   * _LOOT_TABLES_GET_INFO
   *
   * @param {number} ped
   * @param {boolean} p1
   * @param {boolean} p2
   * @param {number} lootTableKey
   * @param {DataView} p4
   * @param {any} p5
   * @return {void}
   */
declare function LootTablesGetInfo(ped: Ped, p1: boolean, p2: boolean, lootTableKey: Hash, p4: DataView, p5: any): void;

/**
   * _QUEUE_SAVEGAME_OPERATION
   * p0 must be < 2
   *
   * @param {number} p0
   * @return {boolean}
   */
declare function QueueSavegameOperation(p0: number): boolean;

/**
   * _READ_INT_AS_FLOAT
   * Reads the passed value as floating point value and returns it.
   * Example: _READ_INT_AS_FLOAT(0x3F800000) returns 1.0f because 0x3F800000 is the hexadecimal representation of 1.0f.
   *
   * @param {number} value
   * @return {number}
   */
declare function ReadIntAsFloat(value: number): number;

/**
   * _REMOVE_POP_MULTIPLIER_AREA_FOR_VOLUME
   *
   * @param {number} volume
   * @param {number} p1
   * @return {void}
   */
declare function RemovePopMultiplierAreaForVolume(volume: Volume, p1: number): void;

/**
   * _RESET_DISPATCH_MAX_SPAWN_DISTANCE
   *
  
   * @return {void}
   */
declare function ResetDispatchMaxSpawnDistance(): void;

/**
   * _RESET_DISPATCH_MIN_SPAWN_DISTANCE
   *
  
   * @return {void}
   */
declare function ResetDispatchMinSpawnDistance(): void;

/**
   * _SET_AI_MEMORY_REACTIONS_ENABLED
   * Used in CAIConditionAmbientAIMemoryReactionsEnabled
   *
   * @param {boolean} enabled
   * @return {void}
   */
declare function SetAiMemoryReactionsEnabled(enabled: boolean): void;

/**
   * _SET_BIT_FLAG
   * Similar to SET_BIT but specifically designed for large (>32 flags) bit flag sets.
   * The flags are stored in an int array where each int has the ability to hold 32 flags.
   * Flags 0-31 would be stored in the first int, flags 32-63 in the second int, etc.
   *
   * @param {DataView} bitFlags
   * @param {number} flag
   * @return {void}
   */
declare function SetBitFlag(bitFlags: DataView, flag: number): void;

/**
   * _SET_DISPATCH_MAX_SPAWN_DISTANCE
   *
   * @param {number} maxSpawnDistance
   * @return {void}
   */
declare function SetDispatchMaxSpawnDistance(maxSpawnDistance: number): void;

/**
   * _SET_DISPATCH_MIN_SPAWN_DISTANCE
   *
   * @param {number} minSpawnDistance
   * @return {void}
   */
declare function SetDispatchMinSpawnDistance(minSpawnDistance: number): void;

/**
   * _SET_GAME_LOGIC_PAUSED
   * Note: this native was added in build 1232.56
   *
  
   * @return {void}
   */
declare function SetGameLogicPaused(): void;

/**
   * _SET_GLOBAL_BLOCK_IS_LOADED
   *
   * @param {number} index
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetGlobalBlockIsLoaded(index: number, toggle: boolean): void;

/**
   * _SET_INCIDENT_UNK
   *
   * @param {number} incidentId
   * @return {void}
   */
declare function SetIncidentUnk(incidentId: number): void;

/**
   * _SET_LOOT_PELT_SATCHEL_ITEM
   *
   * @param {number} ped
   * @param {any} item
   * @return {void}
   */
declare function SetLootPeltSatchelItem(ped: Ped, item: any): void;

/**
   * _SET_OVERRIDE_WEATHER
   *
   * @param {number} weatherType
   * @return {void}
   */
declare function SetOverrideWeather(weatherType: Hash): void;

/**
   * _SET_SNOW_LEVEL
   *
   * @param {number} level
   * @return {void}
   */
declare function SetSnowLevel(level: number): void;

/**
   * _SET_WEATHER_TYPE_2
   *
   * @param {number} weatherType
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {boolean} p4
   * @return {void}
   */
declare function SetWeatherType_2(weatherType: Hash, p1: number, p2: number, p3: number, p4: boolean): void;

/**
   * _SET_WEATHER_TYPE_FROZEN
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetWeatherTypeFrozen(toggle: boolean): void;

/**
   * _SET_WEATHER_VARIATION
   * https://github.com/femga/rdr3_discoveries/blob/master/weather/weather_variations.lua
   *
   * @param {string | number} weatherType
   * @param {string | number} variation
   * @return {void}
   */
declare function SetWeatherVariation(weatherType: string | number, variation: string | number): void;

/**
   * _SHOULD_USE_24_HOUR_CLOCK
   *
  
   * @return {boolean}
   */
declare function ShouldUse_24HourClock(): boolean;

/**
   * _SHOULD_USE_METRIC_MEASUREMENTS_2
   * Same as SHOULD_USE_METRIC_MEASUREMENTS
   *
  
   * @return {boolean}
   */
declare function ShouldUseMetricMeasurements_2(): boolean;

/**
   * _SHOULD_USE_METRIC_TEMPERATURE
   *
  
   * @return {boolean}
   */
declare function ShouldUseMetricTemperature(): boolean;

/**
   * _SHOULD_USE_METRIC_WEIGHT
   *
  
   * @return {boolean}
   */
declare function ShouldUseMetricWeight(): boolean;