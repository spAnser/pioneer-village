/**
 * CEIL
 * Rounds a float value up to the next whole number
 *
 * @param {number} value
 * @return {number}
 */
declare function Ceil(value: number): number;

/**
 * COS
 *
 * @param {number} value
 * @return {number}
 */
declare function Cos(value: number): number;

/**
 * FLOOR
 * Rounds a float value down to the next whole number
 *
 * @param {number} value
 * @return {number}
 */
declare function Floor(value: number): number;

/**
 * LOG10
 * Old name: _LOG10
 *
 * @param {number} value
 * @return {number}
 */
declare function Log10(value: number): number;

/**
 * POW
 *
 * @param {number} base
 * @param {number} exponent
 * @return {number}
 */
declare function Pow(base: number, exponent: number): number;

/**
 * ROUND
 *
 * @param {number} value
 * @return {number}
 */
declare function Round(value: number): number;

/**
 * SETTIMERA
 *
 * @param {number} value
 * @return {void}
 */
declare function Settimera(value: number): void;

/**
 * SETTIMERB
 *
 * @param {number} value
 * @return {void}
 */
declare function Settimerb(value: number): void;

/**
 * SET_THIS_THREAD_PRIORITY
 * THREAD_PRIO_HIGHEST = 0
 * THREAD_PRIO_NORMAL = 1
 * THREAD_PRIO_LOWEST = 2
 * THREAD_PRIO_MANUAL_UPDATE = 100
 *
 * @param {number} priority
 * @return {void}
 */
declare function SetThisThreadPriority(priority: number): void;

/**
 * SHIFT_LEFT
 *
 * @param {number} value
 * @param {number} bitShift
 * @return {number}
 */
declare function ShiftLeft(value: number, bitShift: number): number;

/**
 * SHIFT_RIGHT
 *
 * @param {number} value
 * @param {number} bitShift
 * @return {number}
 */
declare function ShiftRight(value: number, bitShift: number): number;

/**
 * SIN
 *
 * @param {number} value
 * @return {number}
 */
declare function Sin(value: number): number;

/**
 * SQRT
 *
 * @param {number} value
 * @return {number}
 */
declare function Sqrt(value: number): number;

/**
 * TIMERA
 * Counts up. Every 1000 is 1 real-time second. Use SETTIMERA(int value) to set the timer (e.g.: SETTIMERA(0)).
 *

 * @return {number}
 */
declare function Timera(): number;

/**
 * TIMERB
 *

 * @return {number}
 */
declare function Timerb(): number;

/**
 * TIMESTEP
 * Gets the current frame time.
 *

 * @return {number}
 */
declare function Timestep(): number;

/**
 * TO_FLOAT
 *
 * @param {number} value
 * @return {number}
 */
declare function ToFloat(value: number): number;

/**
 * VDIST
 * Calculates distance between vectors.
 * The value returned will be in meters.
 *
 * @param {number} x1
 * @param {number} y1
 * @param {number} z1
 * @param {number} x2
 * @param {number} y2
 * @param {number} z2
 * @return {number}
 */
declare function Vdist(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number;

/**
 * VDIST2
 * Calculates distance between vectors but does not perform Sqrt operations. (Its way faster)
 * The value returned will be in RAGE units.
 *
 * @param {number} x1
 * @param {number} y1
 * @param {number} z1
 * @param {number} x2
 * @param {number} y2
 * @param {number} z2
 * @return {number}
 */
declare function Vdist2(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number;

/**
 * VMAG
 * Calculates the magnitude of a vector.
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {number}
 */
declare function Vmag(x: number, y: number, z: number): number;

/**
 * VMAG2
 * Calculates the magnitude of a vector but does not perform Sqrt operations. (Its way faster)
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {number}
 */
declare function Vmag2(x: number, y: number, z: number): number;

/**
 * WAIT
 *
 * @param {number} ms
 * @return {void}
 */
declare function Wait(ms: number): void;