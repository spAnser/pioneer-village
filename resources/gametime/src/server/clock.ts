import { emitClient, onClientCall } from '@lib/server';
import { lerp } from '@lib/math';

import type { GameTimeState } from '../shared/types';
import {
  REAL_MINUTES_PER_DAY,
  SECONDS_PER_DAY,
  SECONDS_PER_MINUTE,
  MILISECONDS_PER_SECOND,
  GAME_HOURS_PER_DAY,
  MINUTES_PER_HOUR,
} from '../shared/types';

/**
 * Authoritative virtual game clock. Advances hour/minute/second forward at a
 * configurable ratio of game-seconds per real second, independent of any
 * client. Broadcasting the resulting state is the caller's responsibility.
 */
export class GameClock {
  private static instance: GameClock | null = null;

  private totalSeconds: number;
  private dayLengthMinutes: number;
  private tickIntervalId: ReturnType<typeof setInterval> | null = null;
  private syncIntervalId: ReturnType<typeof setInterval> | null = null;

  private constructor(dayLengthMinutes: number, startHour = 6, startMinute = 0, startSecond = 0) {
    this.dayLengthMinutes = dayLengthMinutes;
    this.totalSeconds = startHour * 3600 + startMinute * 60 + startSecond;
  }

  public static getInstance(dayLengthMinutes?: number, startHour = 6, startMinute = 0, startSecond = 0): GameClock {
    if (!GameClock.instance) {
      GameClock.instance = new GameClock(dayLengthMinutes ?? REAL_MINUTES_PER_DAY, startHour, startMinute, startSecond);
    }
    return GameClock.instance;
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

    if (this.syncIntervalId !== null) {
      clearInterval(this.syncIntervalId);
      this.syncIntervalId = null;
    }
  }

  /** Wires up broadcasting, client pull, resource lifecycle, and the settime command. */
  public init(syncIntervalMs: number): void {
    this.start();

    this.syncIntervalId = setInterval(() => this.broadcastState(), syncIntervalMs);

    RegisterCommand(
      'gametime:settime',
      (_source: number, args: string[]) => {
        const hour = Number(args[0]);
        const minute = Number(args[1] ?? 0);

        if (
          !Number.isFinite(hour) ||
          hour < 0 ||
          hour > 23 ||
          !Number.isFinite(minute) ||
          minute < 0 ||
          minute > 59
        ) {
          console.log('Usage: gametime:settime <hour 0-23> <minute 0-59>');
          return;
        }

        const before = this.getState();
        this.setTime(hour, minute, 0);

        // Same lerp shape as the /daytime and /nighttime commands in the research tool —
        // farther jumps get a longer, smoother transition, closer jumps snap faster.
        const hourDelta = Math.abs(before.hour - hour);
        const transitionMs = Math.round(lerp(1_000, 10_000, Math.min(hourDelta, 24 - hourDelta) / 12));

        this.broadcastState(transitionMs);
        console.log(`[GameTime] Jumping to ${hour}:${minute.toString().padStart(2, '0')} over ${transitionMs}ms`);
      },
      false,
    );
  }

  public broadcastState(transitionMs: number = 0): void {
    emitClient('gametime.sync', -1, { ...this.getState(), transitionMs });
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
      tickIntervalMs: this.calculateMsPerGameMinute(),
      transitionMs: 0,
    };
  }

  private calculateMsPerGameMinute(): number {
    const totalRealMs: number = this.dayLengthMinutes * SECONDS_PER_MINUTE * MILISECONDS_PER_SECOND;
    const totalGameMinutes: number = GAME_HOURS_PER_DAY * MINUTES_PER_HOUR;
    return totalRealMs / totalGameMinutes;
  }
}
