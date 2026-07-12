import { PVGame, PVGameEvents, emitServer } from '@lib/client';
import { emitSocket } from '@lib/client/comms/ui';
import { Vector3 } from '@lib/math';

const registerEvents = () => {
  PVGameEvents.register('EVENT_PLAYER_HAT_KNOCKED_OFF', (data) => {
    const { originPed, hat } = data;

    if (!originPed || !hat || originPed !== PVGame.playerPed()) {
      return;
    }

    BlockPickupObjectLight(hat, true);

    console.log(`EVENT_PLAYER_HAT_KNOCKED_OFF: Hat ${hat} knocked off by ${data.causePed} on player ${originPed}`);

    setTimeout(() => {
      const coords = Vector3.fromArray(GetEntityCoords(hat, false));

      const hatNetId = NetworkGetNetworkIdFromEntity(hat);

      emitSocket('inventory.lost-hat', hatNetId, coords.toArray());
    }, 1_500);
  });

  PVGameEvents.register('EVENT_PLAYER_HAT_EQUIPPED', (data) => {
    const { ped, hat } = data;

    if (!ped || !hat || ped !== PVGame.playerPed()) {
      return;
    }

    console.log(`EVENT_PLAYER_HAT_EQUIPPED: Hat ${hat} equipped on player ${ped}`);

    // const hatNetId = NetworkGetNetworkIdFromEntity(hat);

    const itemId = Entity(hat).state.hatItemId;

    emitSocket('inventory.pickup-hat', itemId);
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
