import { PVEvents } from '@lib/client';

PVEvents.registerStateEvent('test:applyForce', 'applyForce', {
  callback: (entity, key, value) => {
    console.log('applyForce event triggered');
    console.log({ entity, key, value });
  },
  includeClear: false,
});
