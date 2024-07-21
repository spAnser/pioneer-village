/**
 * ADD_TO_CLOCK_TIME
 *
 * @param {number} hours
 * @param {number} minutes
 * @param {number} seconds
 * @return {void}
 */
declare function AddToClockTime(hours: number, minutes: number, seconds: number): void;

/**
 * ADVANCE_CLOCK_TIME_TO
 *
 * @param {number} hour
 * @param {number} minute
 * @param {number} second
 * @return {void}
 */
declare function AdvanceClockTimeTo(hour: number, minute: number, second: number): void;

/**
 * GET_CLOCK_DAY_OF_MONTH
 *

 * @return {number}
 */
declare function GetClockDayOfMonth(): number;

/**
 * GET_CLOCK_DAY_OF_WEEK
 * Gets the current day of the week.
 * 
 * 0: Sunday
 * 1: Monday
 * 2: Tuesday
 * 3: Wednesday
 * 4: Thursday
 * 5: Friday
 * 6: Saturday
 *

 * @return {number}
 */
declare function GetClockDayOfWeek(): number;

/**
 * GET_CLOCK_HOURS
 * Gets the current ingame hour, expressed without zeros. (09:34 will be represented as 9)
 *

 * @return {number}
 */
declare function GetClockHours(): number;

/**
 * GET_CLOCK_MINUTES
 * Gets the current ingame clock minute.
 *

 * @return {number}
 */
declare function GetClockMinutes(): number;

/**
 * GET_CLOCK_MONTH
 *

 * @return {number}
 */
declare function GetClockMonth(): number;

/**
 * GET_CLOCK_SECONDS
 * Gets the current ingame clock second. Note that ingame clock seconds change really fast since a day in RDR is only 48 minutes in real life.
 *

 * @return {number}
 */
declare function GetClockSeconds(): number;

/**
 * GET_CLOCK_YEAR
 *

 * @return {number}
 */
declare function GetClockYear(): number;

/**
 * GET_MILLISECONDS_PER_GAME_MINUTE
 *

 * @return {number}
 */
declare function GetMillisecondsPerGameMinute(): number;

/**
 * GET_POSIX_TIME
 *

 * @return {[number, number, number, number, number, number]}
 */
declare function GetPosixTime(): [number, number, number, number, number, number];

/**
 * PAUSE_CLOCK
 *
 * @param {boolean} toggle
 * @param {any} unused
 * @return {void}
 */
declare function PauseClock(toggle: boolean, unused: any): void;

/**
 * SET_CLOCK_DATE
 *
 * @param {number} day
 * @param {number} month
 * @param {number} year
 * @return {void}
 */
declare function SetClockDate(day: number, month: number, year: number): void;

/**
 * SET_CLOCK_TIME
 * SET_CLOCK_TIME(12, 34, 56);
 *
 * @param {number} hour
 * @param {number} minute
 * @param {number} second
 * @return {void}
 */
declare function SetClockTime(hour: number, minute: number, second: number): void;

/**
 * _ADD_TIME_TO_DATE_TIME
 *
 * @param {DataView} inDateTime
 * @param {DataView} timeToAdd
 * @param {DataView} outDateTime
 * @return {void}
 */
declare function AddTimeToDateTime(inDateTime: DataView, timeToAdd: DataView, outDateTime: DataView): void;

/**
 * _GET_POSIX_TIME_STRUCT
 * Same as GET_POSIX_TIME except that it takes a single pointer to a struct.
 *
 * @param {DataView} outTime
 * @return {void}
 */
declare function GetPosixTimeStruct(outTime: DataView): void;

/**
 * _GET_SECONDS_SINCE_BASE_YEAR
 * Base year is 1898.
 *

 * @return {number}
 */
declare function GetSecondsSinceBaseYear(): number;

/**
 * _PAUSE_CLOCK_THIS_FRAME
 *
 * @param {boolean} toggle
 * @return {void}
 */
declare function PauseClockThisFrame(toggle: boolean): void;

/**
 * _SET_MILLISECONDS_PER_GAME_MINUTE
 *
 * @param {number} ms
 * @return {void}
 */
declare function SetMillisecondsPerGameMinute(ms: number): void;