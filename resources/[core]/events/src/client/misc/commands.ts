import { EventManager } from '../managers/event-manager';

const eventManager = EventManager.getInstance();

RegisterCommand(
    'registerEvent',
    async () => {
        console.log('registering');
        const added1 = eventManager.register('event:test', 'entityDamaged', (variable, variable2, variable3) => {
            console.log('event entityDamagedCB', variable, variable2, variable3);
        });
        console.log('Added1: ', added1);
        const added2 = eventManager.register('event:test', 'entityKilled', (variable, variable2, variable3) => {
            console.log('event entityKilledCB', variable, variable2, variable3);
        });
        console.log('Added2: ', added2);
    },
    false,
);

RegisterCommand(
    'unregisterEvent',
    async () => {
        console.log('unregistering');
        const added = eventManager.unregister('event:test', 'entityDamaged');
        console.log('Removed: ', added);
        const added1 = eventManager.unregister('event:test', 'entityKilled');
        console.log('Removed1: ', added1);
    },
    false,
);
