import { EventManager } from '../managers/event-manager';
import { Log } from '@lib/client/comms/ui';

const eventManager = EventManager.getInstance();

RegisterCommand(
  'registerEvent',
  async () => {
    Log('registering');
    const added1 = eventManager.register('event:test', 'entityDamaged', (variable, variable2, variable3) => {
      Log('event entityDamagedCB', variable, variable2, variable3);
    });
    Log('Added1: ', added1);
    const added2 = eventManager.register('event:test', 'entityKilled', (variable, variable2, variable3) => {
      Log('event entityKilledCB', variable, variable2, variable3);
    });
    Log('Added2: ', added2);
  },
  false,
);

RegisterCommand(
  'unregisterEvent',
  async () => {
    Log('unregistering');
    const added = eventManager.unregister('event:test', 'entityDamaged');
    Log('Removed: ', added);
    const added1 = eventManager.unregister('event:test', 'entityKilled');
    Log('Removed1: ', added1);
  },
  false,
);
