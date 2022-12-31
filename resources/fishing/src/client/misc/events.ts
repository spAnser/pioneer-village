import { PVEvents } from '@lib/client';
import fishingManager from '../managers/fishing-manager';

const eventHandlers = {
  weaponChanged(data: Record<string, number>): void {
    if (data.mainHand === GetHashKey('WEAPON_FISHINGROD')) {
      fishingManager.startFishing();
    } else {
      fishingManager.stopFishing();
    }
  },
};

// setTimeout(() => {
//   const [hasRightHandWeapon, rightHandWeapon] = GetCurrentPedWeapon(PlayerPedId(), true, 0, false);
//   const [hasLeftHandWeapon, leftHandWeapon] = GetCurrentPedWeapon(PlayerPedId(), true, 1, false);
//
//   if (rightHandWeapon === GetHashKey('WEAPON_FISHINGROD')) {
//     fishingManager.startFishing();
//   }
// }, 1000);

const registerEvents = () => {
  PVEvents.register('weapon', eventHandlers.weaponChanged);
};

on('onResourceStart', (resourceName: string) => {
  // Events Resource Starts
  if (resourceName === 'events_manager') {
    registerEvents();
  } else if (resourceName === 'prompts') {
    fishingManager.registerPrompts();
  }
});

if (GetResourceState('events_manager') === 'started') {
  registerEvents();
}

if (GetResourceState('prompts') === 'started') {
  setTimeout(() => {
    fishingManager.registerPrompts();
  }, 2500);
}

// p_baitbread01x
// p_baitcorn01x
// p_baitcheese01x
// p_baitworm01x
// p_baitcricket01x
// p_crawdad01x
// p_finishedragonfly01x
// p_finisdfishlure01x
// p_finishdcrawd01x
// p_finishedragonflylegendary01x
// p_finisdfishlurelegendary01x
// p_finishdcrawdlegendary01x
// p_lgoc_spinner_v4
// p_fishhook02x

RegisterCommand(
  'bait',
  () => {
    fishingManager.useBait('P_BAITWORM01X');
  },
  false,
);

on('fishing:client:use_bait', (item: Inventory.ItemBait) => {
  fishingManager.useBait(item.bait);
});
