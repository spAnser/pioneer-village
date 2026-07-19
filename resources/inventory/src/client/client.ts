import { PVCustomization, PVGame, emitUI, onUI } from '@lib/client';
import { Delay } from '@lib/functions';
import InventoryTypes from '@lib/shared/inventory-types';
import PVItems from '@lib/shared/items';

import './events';
import './exports';
import './hats';
import './keybinds';
import './targets';
import './weapons';

onUI('inventory.use-item', (itemData: UI.Inventory.ItemData) => {
  // console.log(itemData);
  const item = PVItems[itemData.identifier];
  if (!item) {
    console.warn(`Item doesn't exist ${itemData.identifier}`);
    return;
  }
  if (!item.useEvent) {
    console.warn(`Item doesn't have useEvent ${itemData.identifier}`);
    return;
  }

  console.log('Emitting event', item.useEvent);
  emit(item.useEvent, item, itemData);
});

const sendInventoryItems = () => {
  const uiItems: Inventory.UIItems = {};
  for (const item of Object.values(PVItems)) {
    uiItems[item.identifier] = {
      name: item.name,
      description: item.description || '',
      image: item.image,
      weight: item.weight,
      stackSize: item.stackSize,
      maxDurability: item.maxDurability,
      maxLife: item.maxLife,
      hasUseEvent: !!item.useEvent,
      containerType: item.containerType,
      containerRestrictions: item.containerType ? InventoryTypes[item.containerType]?.restrictions : undefined,
      restriction: item.restriction,
    };
  }

  emitUI('inventory.items', uiItems);
};

onNet('game:character-selected', (charId: number) => {
  sendInventoryItems();
  emitUI('inventory.state', {
    clothingInventory: `clothing:${charId}`,
    mainInventory: `character:${charId}`,
    birdsInventory: `birds:${charId}`,
  });
});

const sendUIData = async () => {
  await Delay(2000);
  sendInventoryItems();
  const character = PVGame.getCurrentCharacter();
  if (character) {
    emitUI('inventory.state', {
      clothingInventory: `clothing:${character.id}`,
      mainInventory: `character:${character.id}`,
      birdsInventory: `birds:${character.id}`,
      // targetInventory: '_WORLD_:-207_631_113',
    });
  }
};

on('onResourceStart', (resourceName: string) => {
  // Events Resource Starts
  if (resourceName === 'ui') {
    sendUIData();
  }
});

onUI('inventory.startup', () => {
  sendUIData();
});

if (GetResourceState('ui') === 'started') {
  sendUIData();
}

const noHolsterWeapons = [GetHashKey('WEAPON_MELEE_TORCH'), GetHashKey('WEAPON_MELEE_TORCH_CROWD')];

const processItemData = (items: Record<string, UI.Inventory.ItemData>) => {
  const playerPed = PVGame.playerPed();

  for (const slot of Object.values(items)) {
    const item = PVItems[slot.identifier];

    if (!item) {
      console.log(GetHashKey('PV_DOOR_KEY'), GetHashKey('PV_DOOR_KEY') >>> 0, slot.identifier);
      continue;
    }

    if ('weaponHash' in item && item.weaponHash) {
      if (noHolsterWeapons.includes(item.weaponHash)) {
        continue;
      }
      const weapon = item.weaponHash;
      if (!HasPedGotWeapon(playerPed, weapon, 0, false)) {
        GiveWeaponToPed(playerPed, weapon, 0, false, true, -1, false, 0.5, 1.0, 752097756, false, 0.0, false);
      }
    }
  }
};

onUI('inventory.main-inventory', (data, clothingData) => {
  const playerPed = PVGame.playerPed();

  // console.log('inventory.main-inventory', data);
  // console.log('inventory.main-inventory clothing', clothingData);
  RemoveAllPedWeapons(playerPed, true, true);

  processItemData(data.items);
  if (clothingData?.items) {
    processItemData(clothingData.items);
  }
});

onUI('inventory.clothing-change', async (equippedItems) => {
  // console.log('inventory.clothing-change', equippedItems);
  const playerPed = PVGame.playerPed();

  console.log('clothing-change', JSON.stringify(equippedItems, null, 2));

  PVCustomization.equipItems(playerPed, equippedItems);
});

console.log('hatItemId', Entity(7238405).state.hatItemId);

// TODO: _
// Hold Key to see Marker
// Sync all World Inventories at coordinates with clients, only coords.
// Removal inventories that no longer have items from clients coords tracking.

(async () => {
  // ApplyShopItemToPed(PlayerPedId(), `CLOTHING_ITEM_M_HAT_006_TINT_004`, true, true, false);
  // await Delay(15);
  // KnockOffPedProp(PlayerPedId(), false, true, false, true);
  // const hat = GetPedLastDroppedHat(PlayerPedId());
  // SetEntityVisible(hat, false, false);
  // emitSocket('inventory.world-inventories');
})();

RegisterCommand(
  'testVest',
  async (source: number, args: any[], rawCommand: string) => {
    // console.log({ source, args, rawCommand });

    const ped = PlayerPedId();
    ApplyShopItemToPed(ped, GetHashKey('CLOTHING_ITEM_M_VEST_000_TINT_001'), false, true, false);
    PVGame.finalizePedOutfit(ped);
  },
  false,
);
