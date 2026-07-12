import type { GameTimeState } from '../shared/types';

const SECONDS_PER_DAY = 24 * 60 * 60;

/**
 * Authoritative virtual game clock. Advances hour/minute/second forward at a
 * configurable ratio of game-seconds per real second, independent of any
 * client. Broadcasting the resulting state is the caller's responsibility.
 */
export class GameClock {
  private totalSeconds: number;
  private dayLengthMinutes: number;
  private tickIntervalId: ReturnType<typeof setInterval> | null = null;

  constructor(dayLengthMinutes: number, startHour = 6, startMinute = 0, startSecond = 0) {
    this.dayLengthMinutes = dayLengthMinutes;
    this.totalSeconds = startHour * 3600 + startMinute * 60 + startSecond;
  }

  /** Game-seconds that pass per real second, given the configured day length */
  private get gameSecondsPerRealSecond(): number {
    return SECONDS_PER_DAY / (this.dayLengthMinutes * 60);
  }

  public start(): void {
    if (this.tickIntervalId !== null) return;

    this.tickIntervalId = setInterval(() => {
      this.totalSeconds = (this.totalSeconds + this.gameSecondsPerRealSecond) % SECONDS_PER_DAY;
    }, 1000);
  }

  public stop(): void {
    if (this.tickIntervalId !== null) {
      clearInterval(this.tickIntervalId);
      this.tickIntervalId = null;
    }
  }

  public setDayLengthMinutes(minutes: number): void {
    this.dayLengthMinutes = minutes;
  }

  /** Set the clock to a specific time immediately (no transition — that's a client concern) */
  public setTime(hour: number, minute: number, second = 0): void {
    this.totalSeconds = ((hour * 3600 + minute * 60 + second) % SECONDS_PER_DAY + SECONDS_PER_DAY) % SECONDS_PER_DAY;
  }

  public getState(): GameTimeState {
    const wholeSeconds = Math.floor(this.totalSeconds);
    return {
      hour: Math.floor(wholeSeconds / 3600),
      minute: Math.floor((wholeSeconds % 3600) / 60),
      second: wholeSeconds % 60,
      dayLengthMinutes: this.dayLengthMinutes,
      transitionMs: 0,
    };
  }
}
