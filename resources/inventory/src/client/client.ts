import { emitUI, onUI, PVGame } from '@lib/client';
import items from '@lib/shared/items';
import './keybinds';
import './weapons';
import { Delay } from '@lib/functions';
import { Log } from '@lib/client/comms/ui';

onUI('inventory.use-item', (itemData: UI.Inventory.ItemData) => {
  // Log(itemData);
  const item = items[itemData.identifier];
  if (!item || !item.useEvent) {
    console.warn(`Item doesn't exist ${itemData.identifier}`);
    return;
  }

  Log('Emitting event', item.useEvent);
  emit(item.useEvent, item, itemData);
});

const sendInventoryItems = () => {
  const uiItems: Inventory.UIItems = {};
  for (const item of Object.values(items)) {
    uiItems[item.identifier] = {
      name: item.name,
      description: item.description || '',
      image: item.image,
      weight: item.weight,
      stackSize: item.stackSize,
    };
  }

  emitUI('inventory.items', uiItems);
};

onNet('game:character-selected', (charId: number) => {
  sendInventoryItems();
  emitUI('inventory.state', { mainInventory: `character:${charId}` });
});

const sendUIData = async () => {
  await Delay(2000);
  sendInventoryItems();
  const character = PVGame.getCurrentCharacter();
  if (character) {
    emitUI('inventory.state', { mainInventory: `character:${character.id}` });
  }
};

on('onResourceStart', (resourceName: string) => {
  // Events Resource Starts
  if (resourceName === 'ui') {
    sendUIData();
  }
});

if (GetResourceState('ui') === 'started') {
  sendUIData();
}

const noHolsterWeapons = [GetHashKey('WEAPON_MELEE_TORCH'), GetHashKey('WEAPON_MELEE_TORCH_CROWD')];

onUI('inventory.main-inventory', (data) => {
  const playerPed = PVGame.playerPed();
  RemoveAllPedWeapons(playerPed, true, true);
  for (const slot of Object.values(data.items)) {
    const item = items[slot.identifier];

    if (!item) {
      Log(GetHashKey('PV_DOOR_KEY'), GetHashKey('PV_DOOR_KEY') >>> 0, slot.identifier);
      continue;
    }

    if ('weaponHash' in item && item.weaponHash) {
      if (noHolsterWeapons.includes(item.weaponHash)) {
        continue;
      }
      const weapon = item.weaponHash;
      if (!HasPedGotWeapon(playerPed, weapon, false)) {
        GiveWeaponToPed(playerPed, weapon, 0, false, true, -1, false, 0.5, 1.0, 752097756, false, 0.0, false);
      }
    }
  }
});
