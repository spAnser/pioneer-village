import { onClientCall } from '@lib/server';
import { GameClock } from './clock';

// How long an in-game day (24 hours) should take in real time
const DAY_LENGTH_MINUTES = Number(GetConvar('GAMETIME_DAY_LENGTH_MINUTES', '1'));

// Drift-correction only — the client's own clock free-runs between syncs via
// SetMillisecondsPerGameMinute, so this can be infrequent.
// Default 5 minutes
const SYNC_INTERVAL_MS = Number(GetConvar('GAMETIME_SYNC_INTERVAL_MS', String(5 * 60 * 1000)));

// Newly-joined players (and clients whose own resource just (re)started) pull
// their initial state directly instead of waiting on the next periodic sync,
// which can be minutes away. This also covers this resource restarting while
// players are already connected — client.ts re-runs the same pull on load.
let gc = GameClock.getInstance(DAY_LENGTH_MINUTES);
gc.init(SYNC_INTERVAL_MS);

onClientCall('gametime.getState', () => ({ ...gc.getState(), transitionMs: 0 }));

on('onResourceStop', (resourceName: string) => {
  if (resourceName === GetCurrentResourceName()) {
    gc.stop();
  }
});
