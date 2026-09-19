import { PVGameEvents } from '@lib/client';

import healthManager from '../managers/health-manager';

const registerEvents = () => {
  PVGameEvents.register('EVENT_ENTITY_DAMAGED', (data) => {
    const { attacked, attacker, weaponHash, ammoHash, damage, x, y, z } = data;
    healthManager.handleDamageEvent(attacker, attacked, weaponHash, ammoHash, x, y, z);
  });
};

on('onResourceStart', (resourceName: string) => {
  // Events Resource Starts
  if (resourceName === 'events') {
    registerEvents();
  }
});

if (GetResourceState('events') === 'started') {
  registerEvents();
}
