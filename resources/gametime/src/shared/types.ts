/**
 * Shared type definitions for the gametime system
 * Used across both client and server
 */

/** Authoritative game clock state, broadcast from server to clients */
export interface GameTimeState {
  hour: number;
  minute: number;
  second: number;
  dayLengthMinutes: number;
  transitionMs: number
}

export const GAMETIME_EVENTS = {
  /** Routine periodic broadcast — clients snap/correct with no transition */
  SYNC: 'gametime:sync',
} as const;
