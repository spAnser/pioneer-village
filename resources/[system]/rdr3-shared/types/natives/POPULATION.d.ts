/**
 * CLEAR_SPAWNER_INFO_PRIORITY
 *
 * @param {number} p0
 * @param {number} p1
 * @return {void}
 */
declare function ClearSpawnerInfoPriority(p0: Hash, p1: Hash): void;

/**
 * DISABLE_AMBIENT_ROAD_POPULATION
 *
 * @param {boolean} unk
 * @return {void}
 */
declare function DisableAmbientRoadPopulation(unk: boolean): void;

/**
 * ENABLE_AMBIENT_ROAD_POPULATION
 *

 * @return {void}
 */
declare function EnableAmbientRoadPopulation(): void;

/**
 * GET_NUM_MODELS_IN_POPULATION_SET
 *
 * @param {number} popSetHash
 * @return {number}
 */
declare function GetNumModelsInPopulationSet(popSetHash: Hash): number;

/**
 * GET_PED_MODEL_NAME_IN_POPULATION_SET
 *
 * @param {number} popSetHash
 * @param {number} index
 * @return {number}
 */
declare function GetPedModelNameInPopulationSet(popSetHash: Hash, index: number): number;

/**
 * GET_RANDOM_MODEL_FROM_POPULATION_SET
 *
 * @param {number} popSetHash
 * @param {number} flags
 * @param {number} p2
 * @param {boolean} p3
 * @param {boolean} p4
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {number}
 */
declare function GetRandomModelFromPopulationSet(popSetHash: Hash, flags: number, p2: Hash, p3: boolean, p4: boolean, x: number, y: number, z: number): number;

/**
 * SET_POPZONE_POPULATION_SET
 *
 * @param {number} popZone
 * @param {number} populationSetHash
 * @return {void}
 */
declare function SetPopzonePopulationSet(popZone: PopZone, populationSetHash: Hash): void;

/**
 * SET_SPAWNER_INFO_PRIORITY
 *
 * @param {number} p0
 * @param {number} p1
 * @param {number} priority
 * @return {void}
 */
declare function SetSpawnerInfoPriority(p0: Hash, p1: Hash, priority: number): void;

/**
 * _0x08892122769770D5
 *
 * @param {number} popZone
 * @param {boolean} p1
 * @return {void}
 */
declare function N_0x08892122769770D5(popZone: PopZone, p1: boolean): void;

/**
 * _0x0F1861101C9A9944
 *
 * @param {number} popZone
 * @param {boolean} p1
 * @return {void}
 */
declare function N_0x0F1861101C9A9944(popZone: PopZone, p1: boolean): void;

/**
 * _0x2161278C6322F740
 *
 * @param {number} includeFlags
 * @param {number} excludeFlags
 * @param {number} p2
 * @param {number} p3
 * @param {number} p4
 * @param {number} volume
 * @return {void}
 */
declare function N_0x2161278C6322F740(includeFlags: number, excludeFlags: number, p2: number, p3: Hash, p4: number, volume: Volume): void;

/**
 * _0x247F86595D396344
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x247F86595D396344(p0: any): void;

/**
 * _0x2660E7720EDC4BD0
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {void}
 */
declare function N_0x2660E7720EDC4BD0(p0: any, p1: any, p2: any): void;

/**
 * _0x324AB2A68AD8AEE5
 *

 * @return {void}
 */
declare function N_0x324AB2A68AD8AEE5(): void;

/**
 * _0x578E2FA64E847C60
 *
 * @param {number} popZone
 * @param {number} p1
 * @return {void}
 */
declare function N_0x578E2FA64E847C60(popZone: PopZone, p1: number): void;

/**
 * _0x638FCFC6042A9473
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x638FCFC6042A9473(p0: any, p1: any): void;

/**
 * _0x7E6BC0B94F5928F0
 *
 * @param {number} popZone
 * @param {number} p1
 * @param {number} p2
 * @return {void}
 */
declare function N_0x7E6BC0B94F5928F0(popZone: PopZone, p1: number, p2: number): void;

/**
 * _0x8EC7CD701F872F87
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @param {any} p3
 * @param {any} p4
 * @param {any} p5
 * @return {void}
 */
declare function N_0x8EC7CD701F872F87(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;

/**
 * _0xC4533E3E87125C9E
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0xC4533E3E87125C9E(p0: any): void;

/**
 * _0xDBBF12EA7C1029B2
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0xDBBF12EA7C1029B2(p0: any, p1: any): void;

/**
 * _0xEC116EDB683AD479
 * Only used for Special Event (XMAS).
 * _SET_P*
 *
 * @param {boolean} p0
 * @return {void}
 */
declare function N_0xEC116EDB683AD479(p0: boolean): void;

/**
 * _0xF45E46DEECF7DF6E
 *
 * @param {number} bitFlag
 * @param {any} p1
 * @param {any} p2
 * @param {any} p3
 * @param {any} p4
 * @return {void}
 */
declare function N_0xF45E46DEECF7DF6E(bitFlag: number, p1: any, p2: any, p3: any, p4: any): void;

/**
 * _ADD_AMBIENT_AVOIDANCE_RESTRICTION
 * flags: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/PedFilterFlags
 *
 * @param {number} volume
 * @param {number} includeFlags
 * @param {number} excludeFlags
 * @param {number} p3
 * @param {number} p4
 * @param {number} p5
 * @param {number} p6
 * @return {void}
 */
declare function AddAmbientAvoidanceRestriction(volume: Volume, includeFlags: number, excludeFlags: number, p3: Hash, p4: Hash, p5: Hash, p6: number): void;

/**
 * _ADD_AMBIENT_SPAWN_RESTRICTION
 * flags: see 0xB56D41A694E42E86
 *
 * @param {number} volume
 * @param {number} includeFlags
 * @param {number} excludeFlags
 * @param {number} p3
 * @param {number} p4
 * @param {number} p5
 * @param {number} p6
 * @return {void}
 */
declare function AddAmbientSpawnRestriction(volume: Volume, includeFlags: number, excludeFlags: number, p3: Hash, p4: Hash, p5: Hash, p6: number): void;

/**
 * _CREATE_POPZONE_FROM_VOLUME
 *
 * @param {number} volume
 * @return {number}
 */
declare function CreatePopzoneFromVolume(volume: Volume): PopZone;

/**
 * _DELETE_SCRIPT_POPZONE
 *
 * @param {number} popZone
 * @return {void}
 */
declare function DeleteScriptPopzone(popZone: PopZone): void;

/**
 * _GET_RANDOM_FISH_TYPE_FOR_LOCATION
 * Returns model hash of the closest fish
 *

 * @return {number}
 */
declare function GetRandomFishTypeForLocation(): number;

/**
 * _IS_POPZONE_VALID
 *
 * @param {number} popZone
 * @return {boolean}
 */
declare function IsPopzoneValid(popZone: PopZone): boolean;

/**
 * _REMOVE_AMBIENT_AVOIDANCE_RESTRICTION
 * flags: see 0xB56D41A694E42E86
 *
 * @param {number} volume
 * @return {void}
 */
declare function RemoveAmbientAvoidanceRestriction(volume: Volume): void;

/**
 * _REMOVE_AMBIENT_SPAWN_RESTRICTION
 *
 * @param {number} volume
 * @return {void}
 */
declare function RemoveAmbientSpawnRestriction(volume: Volume): void;

/**
 * _SET_PED_SHOULD_IGNORE_AVOIDANCE_VOLUMES
 * Params: p1 = 1 & 2 in R* Scripts, 0 = Disable avoidance, 1 = Enabled avoidance, 2 = Enabled avoidance (?)
 *
 * @param {number} ped
 * @param {number} p1
 * @return {void}
 */
declare function SetPedShouldIgnoreAvoidanceVolumes(ped: Ped, p1: number): void;