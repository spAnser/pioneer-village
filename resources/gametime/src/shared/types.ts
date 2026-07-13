/**
 * Shared type definitions for the gametime system
 * Used across both client and server
 */

/** Authoritative game clock state, broadcast from server to clients */
export interface GameTimeState {
  hour: number;
  minute: number;
  second: number;
  tickIntervalMs: number;
  transitionMs: number;
}

export const SECONDS_PER_DAY = 24 * 60 * 60;
export const REAL_MINUTES_PER_DAY: number = 15;
export const GAME_HOURS_PER_DAY: number = 24;
export const MINUTES_PER_HOUR: number = 60;
export const SECONDS_PER_MINUTE: number = 60;
export const MILISECONDS_PER_SECOND: number = 1000;