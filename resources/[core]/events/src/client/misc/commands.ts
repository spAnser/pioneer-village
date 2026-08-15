import eventPoller from '../managers/event-poller';

const onEntityDamaged = (data: unknown) => console.log('EVENT_ENTITY_DAMAGED', data);
const onEntityDestroyed = (data: unknown) => console.log('EVENT_ENTITY_DESTROYED', data);

RegisterCommand(
  'registerEvent',
  async () => {
    console.log('registering test events');
    eventPoller.register('EVENT_ENTITY_DAMAGED', onEntityDamaged);
    eventPoller.register('EVENT_ENTITY_DESTROYED', onEntityDestroyed);
  },
  false,
);

RegisterCommand(
  'unregisterEvent',
  async () => {
    console.log('unregistering test events');
    eventPoller.unregister('EVENT_ENTITY_DAMAGED', onEntityDamaged);
    eventPoller.unregister('EVENT_ENTITY_DESTROYED', onEntityDestroyed);
  },
  false,
);
