import { awaitServer, onServer } from '@lib/client';

import type { GameTimeState } from '../shared/types';

const GAME_MINUTES_PER_DAY = 24 * 60;

function applyState(state: GameTimeState): void {
  // Point the game's own clock at the given rate so it free-runs forward every
  // frame on its own — no client-side ticking/polling needed between syncs.
  SetMillisecondsPerGameMinute((state.dayLengthMinutes * 60 * 1000) / GAME_MINUTES_PER_DAY);
  NetworkClockTimeOverride(state.hour, state.minute, state.second, state.transitionMs, false);
}

// Periodic drift-correction and admin-triggered jumps both arrive as
// gametime:sync — routine corrections carry transitionMs=0 (instant), jumps
// carry a lerped transitionMs so the change animates.
onServer('gametime:sync', (state: GameTimeState) => {
  console.log('gametime sync', state)
  applyState(state)
});

// Pull the current state on startup rather than waiting for the next periodic
// broadcast (up to several minutes away) — covers both newly-joined players
// and this resource being restarted while players are already connected.
// awaitServer('gametime.getState').then(applyState);

awaitServer('gametime.getState').then((state: GameTimeState) => {
  console.log('fetched gametime state', state)
  applyState(state)
});
