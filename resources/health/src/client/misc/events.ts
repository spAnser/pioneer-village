import { PVEvents } from '@lib/client';

import healthManager from '../managers/health-manager';

const registerEvents = () => {
  PVEvents.register('EVENT_ENTITY_DAMAGED', (data) => {
    const { attacked, attacker, weaponHash, ammoHash, damage, x, y, z } = data;
    healthManager.handleDamageEvent(attacker, attacked, weaponHash, ammoHash, x, y, z);
  });
};

on('onResourceStart', (resourceName: string) => {
  // Events Resource Starts
  if (resourceName === 'events_manager') {
    registerEvents();
  }
});

if (GetResourceState('events_manager') === 'started') {
  registerEvents();
}
