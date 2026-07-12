import { emitClient, onClientCall } from '@lib/server';
import { lerp } from '@lib/math';

import { GAMETIME_EVENTS } from '../shared/types';
import { GameClock } from './clock';

// How long an in-game day (24 hours) should take in real time
const DAY_LENGTH_MINUTES = Number(GetConvar('GAMETIME_DAY_LENGTH_MINUTES', '60'));
// Drift-correction only — the client's own clock free-runs between syncs via
// SetMillisecondsPerGameMinute, so this can be infrequent.
const SYNC_INTERVAL_MS = Number(GetConvar('GAMETIME_SYNC_INTERVAL_MS', String(5 * 60 * 1000)));

const clock = new GameClock(DAY_LENGTH_MINUTES);

function broadcastState(transitionMs: number = 0): void {
  emitClient(GAMETIME_EVENTS.SYNC, -1, { ...clock.getState(), transitionMs });
}

clock.start();
setInterval(() => broadcastState(), SYNC_INTERVAL_MS);

// Newly-joined players (and clients whose own resource just (re)started) pull
// their initial state directly instead of waiting on the next periodic sync,
// which can be minutes away. This also covers this resource restarting while
// players are already connected — client.ts re-runs the same pull on load.
onClientCall('gametime.getState', () => ({ ...clock.getState(), transitionMs: 0 }));

on('onResourceStop', (resourceName: string) => {
  if (resourceName === GetCurrentResourceName()) {
    clock.stop();
  }
});

RegisterCommand(
  'gametime:settime',
  (_source: number, args: string[]) => {
    const hour = Number(args[0]);
    const minute = Number(args[1] ?? 0);

    if (!Number.isFinite(hour) || hour < 0 || hour > 23 || !Number.isFinite(minute) || minute < 0 || minute > 59) {
      console.log('Usage: gametime:settime <hour 0-23> <minute 0-59>');
      return;
    }

    const before = clock.getState();
    clock.setTime(hour, minute, 0);

    // Same lerp shape as the /daytime and /nighttime commands in the research tool —
    // farther jumps get a longer, smoother transition, closer jumps snap faster.
    const hourDelta = Math.abs(before.hour - hour);
    const transitionMs = Math.round(lerp(1_000, 10_000, Math.min(hourDelta, 24 - hourDelta) / 12));

    broadcastState(transitionMs);
    console.log(`[GameTime] Jumping to ${hour}:${minute.toString().padStart(2, '0')} over ${transitionMs}ms`);
  },
  false,
);
