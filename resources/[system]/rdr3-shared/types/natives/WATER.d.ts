/**
 * DISABLE_WATER_LOOKUP
 * Must be called every frame to take full effect.
 *

 * @return {void}
 */
declare function DisableWaterLookup(): void;

/**
 * ENABLE_WATER_LOOKUP
 *

 * @return {void}
 */
declare function EnableWaterLookup(): void;

/**
 * GET_WATER_HEIGHT
 * Checks against a global variable that is set by _SET_WORLD_WATER_TYPE. If that is set to one it will fail. Likely not the only issue but part of it.
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {[boolean, number]}
 */
declare function GetWaterHeight(x: number, y: number, z: number): [boolean, number];

/**
 * GET_WATER_HEIGHT_NO_WAVES
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {[boolean, number]}
 */
declare function GetWaterHeightNoWaves(x: number, y: number, z: number): [boolean, number];

/**
 * REMOVE_EXTRA_CALMING_QUAD
 * Only used in rcm_crackpot1 R* Script: p0 = 0
 *
 * @param {number} index
 * @return {void}
 */
declare function RemoveExtraCalmingQuad(index: number): void;

/**
 * TEST_PROBE_AGAINST_ALL_WATER
 * enum eScriptWaterTestResult
 * {
 *   SCRIPT_WATER_TEST_RESULT_NONE,
 *   SCRIPT_WATER_TEST_RESULT_WATER,
 *   SCRIPT_WATER_TEST_RESULT_BLOCKED,
 * };
 *
 * @param {number} x1
 * @param {number} y1
 * @param {number} z1
 * @param {number} x2
 * @param {number} y2
 * @param {number} z2
 * @param {number} flags
 * @return {[number, Vector3]}
 */
declare function TestProbeAgainstAllWater(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, flags: number): [number, Vector3];

/**
 * TEST_VERTICAL_PROBE_AGAINST_ALL_WATER
 * Checks against a global variable that is set by _SET_WORLD_WATER_TYPE. If it's set to 1 (Guarma) it will fail.
 * 
 * See TEST_PROBE_AGAINST_ALL_WATER.
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} flags
 * @return {[number, number]}
 */
declare function TestVerticalProbeAgainstAllWater(x: number, y: number, z: number, flags: number): [number, number];

/**
 * _0x09A1C7DFDCE54FBC
 * Called together with REMOVE_EXTRA_CALMING_QUAD in rcm_crackpot1 R* Script: p0 = 0
 * _REMOVE_*
 *
 * @param {number} p0
 * @return {void}
 */
declare function N_0x09A1C7DFDCE54FBC(p0: number): void;

/**
 * _0x0DCEC6A92E497E17
 * Only used in native_son1 R* Script: p1 = 1
 *
 * @param {number} entity
 * @param {number} p1
 * @return {void}
 */
declare function N_0x0DCEC6A92E497E17(entity: Entity, p1: number): void;

/**
 * _0xA33F5069B0CB89B8
 * Only used in fishing_core R* Script
 *

 * @return {void}
 */
declare function N_0xA33F5069B0CB89B8(): void;

/**
 * _0xB34A6009A0DB80B8
 * Used in bounty1, fanale3, sean1 R* Scripts
 *
 * @param {number} entity
 * @return {void}
 */
declare function N_0xB34A6009A0DB80B8(entity: Entity): void;

/**
 * _0xE8126623008372AA
 * Only used in fussar1 / train_robbery2 R* Script
 *

 * @return {void}
 */
declare function N_0xE8126623008372AA(): void;

/**
 * _0xF0FBF193F1F5C0EA
 * Only used in fishing_core R* Script
 *
 * @param {number} ped
 * @return {void}
 */
declare function N_0xF0FBF193F1F5C0EA(ped: Ped): void;

/**
 * _GET_WORLD_WATER_TYPE
 *

 * @return {number}
 */
declare function GetWorldWaterType(): number;

/**
 * _RESET_GUARMA_WATER_STATE
 * Only used in guama1 / guama3 R* Script
 * _REQUEST_* or _RESET_*
 *

 * @return {void}
 */
declare function ResetGuarmaWaterState(): void;

/**
 * _SET_OCEAN_GUARMA_WATER_QUADRANT
 * Only used in R* Script guama1 this native allows to modify the ocean water in the guarma island. wave direction accepts 0, 1 and 2 values.
 *
 * @param {number} wavesHeight
 * @param {number} p1
 * @param {number} waveDirection
 * @param {number} p3
 * @param {number} waveAmmount
 * @param {number} p5
 * @param {number} waveSpeed
 * @param {number} wavesStrength
 * @param {number} p8
 * @return {void}
 */
declare function SetOceanGuarmaWaterQuadrant(wavesHeight: number, p1: number, waveDirection: number, p3: number, waveAmmount: number, p5: number, waveSpeed: number, wavesStrength: number, p8: number): void;

/**
 * _SET_WORLD_WATER_TYPE
 * 0 = World
 * 1 = Guarma
 *
 * @param {number} waterType
 * @return {void}
 */
declare function SetWorldWaterType(waterType: number): void;