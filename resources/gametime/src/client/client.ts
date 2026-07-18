import { awaitServer, onServer } from '@lib/client';

import type { GameTimeState } from '../shared/types';
import {
  MINUTES_PER_HOUR,
  SECONDS_PER_MINUTE,
  GAME_HOURS_PER_DAY
} from '../shared/types'

const SECONDS_PER_DAY = GAME_HOURS_PER_DAY * MINUTES_PER_HOUR * SECONDS_PER_MINUTE;

let DEFAULT_GAMETIME_TICK_MS: number = 250;
const TRANSITION_TICK_MS: number = 5;
const MAX_TRANSITION_MS: number = 7500;

const toDaySeconds = (hour: number, minute: number, second: number): number =>
  hour * MINUTES_PER_HOUR * SECONDS_PER_MINUTE + minute * SECONDS_PER_MINUTE + second;

const applyDaySeconds = (daySeconds: number): void => {
  const wrapped = ((daySeconds % SECONDS_PER_DAY) + SECONDS_PER_DAY) % SECONDS_PER_DAY;
  const hour = Math.floor(wrapped / (MINUTES_PER_HOUR * SECONDS_PER_MINUTE));
  const minute = Math.floor(wrapped / SECONDS_PER_MINUTE) % MINUTES_PER_HOUR;
  const second = Math.floor(wrapped) % SECONDS_PER_MINUTE;
  SetClockTime(hour, minute, second);
};

let currentDaySeconds = toDaySeconds(6, 0, 0);

// When a sync/getState arrives with transitionMs > 0, we lerp currentDaySeconds
// toward the target over that duration instead of snapping to it immediately.
let transition: { from: number; to: number; startedAt: number; durationMs: number } | null = null;

let tickHandle: ReturnType<typeof setInterval> | null = null;
let lastTickAt: number = Date.now();

// Runs the tick loop at `ms` — used to switch to a fast tick during a
// transition so the lerp reads as smooth, then revert once it's done.
const scheduleTick = (ms: number): void => {
  if (tickHandle !== null) clearInterval(tickHandle);
  lastTickAt = Date.now();
  tickHandle = setInterval(tick, ms);
};


function tick(): void {
  if (transition) {
    const elapsed = Date.now() - transition.startedAt;
    const t = Math.min(elapsed / transition.durationMs, 1);
    currentDaySeconds = transition.from + (transition.to - transition.from) * t;
    if (t >= 1) {
      transition = null;
      scheduleTick(DEFAULT_GAMETIME_TICK_MS);
    }
  } else {
    // Elapsed-time based rather than a fixed per-tick increment, so drift or
    // throttling in the underlying setInterval (CEF/NUI timer jitter is
    // worse at short intervals) doesn't slow the clock down.
    const now = Date.now();
    const realElapsedMs = now - lastTickAt;
    lastTickAt = now;
    currentDaySeconds += (SECONDS_PER_MINUTE / DEFAULT_GAMETIME_TICK_MS) * realElapsedMs;
  }
  applyDaySeconds(currentDaySeconds);
}

const beginTransition = (state: GameTimeState): void => {
  const target = toDaySeconds(state.hour, state.minute, state.second);

  if (!state.transitionMs || state.transitionMs <= 0) {
    transition = null;
    currentDaySeconds = target;
    applyDaySeconds(currentDaySeconds);
    scheduleTick(DEFAULT_GAMETIME_TICK_MS);
    return;
  }

  // Lerp along the shorter direction around the 24h wrap (e.g. 23:59 -> 00:01).
  let delta = (target - currentDaySeconds) % SECONDS_PER_DAY;
  if (delta > SECONDS_PER_DAY / 2) delta -= SECONDS_PER_DAY;
  if (delta < -SECONDS_PER_DAY / 2) delta += SECONDS_PER_DAY;

  const durationMs = Math.min(state.transitionMs, MAX_TRANSITION_MS);

  transition = {
    from: currentDaySeconds,
    to: currentDaySeconds + delta,
    startedAt: Date.now(),
    durationMs
  };

  console.log(`gametime transition starting, lerping over ${durationMs}ms`);

  // Tick fast for the duration of the transition so the lerp is smooth,
  // independent of the (possibly much slower) steady-state tick rate.
  scheduleTick(Math.min(TRANSITION_TICK_MS, DEFAULT_GAMETIME_TICK_MS));
};

scheduleTick(DEFAULT_GAMETIME_TICK_MS);

// Periodic drift-correction and admin-triggered jumps both arrive as
// gametime.sync — routine corrections carry transitionMs=0 (instant), jumps
// carry a lerped transitionMs so the change animates.
onServer('gametime.sync', (state: GameTimeState) => {
  console.log('gametime sync', state)
  SetWeatherOwnedByNetwork(false);
  DEFAULT_GAMETIME_TICK_MS = state.tickIntervalMs
  beginTransition(state);
});

// Pull the current state on startup rather than waiting for the next periodic
// broadcast (up to several minutes away) — covers both newly-joined players
// and this resource being restarted while players are already connected.
awaitServer('gametime.getState').then((state: GameTimeState) => {
  console.log('fetched gametime state', state)
  SetWeatherOwnedByNetwork(false);
  DEFAULT_GAMETIME_TICK_MS = state.tickIntervalMs
  beginTransition(state);
});
