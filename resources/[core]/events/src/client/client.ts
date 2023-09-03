import './misc/events';
import './misc/exports';
import './misc/commands';
import eventListener from './event/event-listener';
import { Log } from '@lib/client/comms/ui';

on('onResourceStart', (resourceName: string) => {
  // Events Resource Starts
  if (resourceName === GetCurrentResourceName()) {
    eventListener.restartListener();
    Log('EventListener Started');
  }
});

on('onResourceStop', (resourceName: string) => {
  // Current Resource Stops
  if (resourceName === GetCurrentResourceName() && eventListener) {
    eventListener.destroy();
  }
});

onNet('game:character-selected', (charId: number) => {
  eventListener.restartListener();
  Log('EventListener Restarted');
});
