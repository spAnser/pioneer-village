import './misc/events';
import './misc/exports';
import './misc/commands';
import eventListener from './event/event-listener';

on('onResourceStart', (resourceName: string) => {
  // Events Resource Starts
  if (resourceName === GetCurrentResourceName()) {
    eventListener.restartListener();
    console.log('EventListener Started');
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
  console.log('EventListener Restarted');
});
