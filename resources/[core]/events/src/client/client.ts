import eventPoller from './managers/event-poller';
import keyManager from './managers/key-manager';
import playerStateManager from './managers/player-state-manager';
import './exports';
import './misc/commands';

let tickHandle: number;

function startTicking(): void {
  if (tickHandle !== undefined) {
    clearTick(tickHandle);
  }

  tickHandle = setTick(() => {
    eventPoller.tick();
    playerStateManager.tick();
    keyManager.tick();
  });
}

startTicking();

on('onResourceStop', (resourceName: string) => {
  if (resourceName === GetCurrentResourceName() && tickHandle !== undefined) {
    clearTick(tickHandle);
  }
});

onNet('game:character-selected', () => {
  startTicking();
  console.log('EventListener restarted');
});
