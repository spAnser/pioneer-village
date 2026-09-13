import { PVBase, onSocket } from '@lib/server';

import { seedClockedIn, setClockedIn, setClockedOut } from './exports';
import { runJobHooks } from './hooks';

onSocket('jobs.hook', (type, jobHandle, payload) => {
  // Keep the local clock mirror ahead of the subscribers so a hook can read it.
  if (type === 'onClockIn') {
    setClockedIn(payload.characterId, jobHandle);
  } else if (type === 'onClockOut') {
    setClockedOut(payload.characterId);
  }

  runJobHooks(type, jobHandle, payload);
});

// `socket.connected` fires on every socket connect, so this also recovers when the
// socket server restarts underneath a game server that never stopped.
on('socket.connected', seedClockedIn);
if (PVBase.socketConnected()) {
  void seedClockedIn();
}
