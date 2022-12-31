// AddEventHandler('weapon:client:toggle_weapon', function(itemHash, slotId)
//     --print('Toggle Weapon', itemHash)
//     -- 0 Main Hand
//     -- 1 Off Hand
//     -- 2 Pistol Primary
//     -- 3 Pistol Secondary???
//     -- 4 Knife
//     -- 6 Hatchet/Molotov/Dynamite
//     -- 7 RIFLE
//     -- 10 RIFLE
//     -- 13 Machete/Sword
//     --local playerPed = PlayerPedId()
//     --for n = 0,32 do
//     --    local weaponEntity = GetCurrentPedWeaponEntityIndex(playerPed, n)
//     --    if weaponEntity > 0 then
//     --        print(n, weaponEntity, WEAPONS_NAMES[GetEntityModel(weaponEntity)])
//     --    end
//     --end
//     local weaponItem = _WEAPON.items[itemHash]
//     if weaponItem then
//         local playerPed = PlayerPedId()
//         local inventoryId = DecorGetInt(playerPed, 'Inventory')
//         local _, currentWeapon = GetCurrentPedWeapon(playerPed, 0, 0)
//         local _, currentOffhandWeapon = GetCurrentPedWeapon(playerPed, 0, 1)
//         local currentItemHash = WEAPON_ITEMS_HASH[currentWeapon]
//         local currentWeaponItem
//         if currentItemHash then
//             currentWeaponItem = _WEAPON.items[currentItemHash]
//         end
//         if currentWeapon == weaponItem.weapon_hash then
//             SetCurrentPedWeapon(playerPed, `WEAPON_UNARMED`, false, 0, false, false)
//             SetCurrentPedWeapon(playerPed, `WEAPON_UNARMED`, false, 1, false, false)
//             if weaponItem.weapon_type == 3 then
//                 TriggerServerEvent('weapon:server:store_thrown', {
//                     ['inventory_id'] = inventoryId,
//                     ['identifier'] = currentWeaponItem.identifier,
//                     ['slot_id'] = slotId,
//                 })
//             end
//         elseif currentOffhandWeapon == weaponItem.weapon_hash then
//             SetCurrentPedWeapon(playerPed, `WEAPON_UNARMED`, false, 1, false, false)
//         else
//             if currentWeaponItem and currentWeaponItem.weapon_type == 3 then
//                 TriggerServerEvent('weapon:server:store_thrown', {
//                     ['inventory_id'] = inventoryId,
//                     ['identifier'] = currentWeaponItem.identifier,
//                     ['slot_id'] = slotId,
//                 })
//             end
//             if not HasPedGotWeapon(playerPed, weaponItem.weapon_hash) then
//                 GiveWeaponToPed_2(playerPed, weaponItem.weapon_hash, 0, false, false, 0, false, 0.5, 1.0, 752097756, false, 0.0, false)
//             end
//             Wait(0)
//             if weaponItem.weapon_type == 3 then
//                 TriggerServerEvent('weapon:server:equip_thrown', {
//                     ['inventory_id'] = inventoryId,
//                     ['identifier'] = weaponItem.identifier,
//                     ['slot_id'] = slotId,
//                 })
//                 if weaponItem.ammo_hash and GetAmmoInPedWeapon(playerPed, weaponItem.weapon_hash) < 1 then
//                     Citizen.InvokeNative(0x106A811C6D3035F3, playerPed, weaponItem.ammo_hash, 1, 752097756)
//                 end
//             end
//             local timeout = 0
//             while not HasPedGotWeapon(playerPed, weaponItem.weapon_hash) do
//                 Wait(15)
//                 timeout = timeout + 1
//                 if timeout > 1500 then
//                     break
//                 end
//             end
//             Wait(0)
//             TaskPause(playerPed, 500)
//             local equippedToOffhand = false
//             if IsWeaponPistolOrRevolver(weaponItem.weapon_hash) and IsWeaponPistolOrRevolver(currentWeapon) then
//                 SetCurrentPedWeapon(playerPed, weaponItem.weapon_hash, true, 1, false, false)
//                 SetCurrentPedWeapon(playerPed, `WEAPON_UNARMED`, true, 1, false, false)
//                 SetCurrentPedWeapon(playerPed, weaponItem.weapon_hash, false, 1, false, false)
//                 equippedToOffhand = true
//             else
//                 SetCurrentPedWeapon(playerPed, weaponItem.weapon_hash, true, 0, false, false)
//                 SetCurrentPedWeapon(playerPed, `WEAPON_UNARMED`, true, 0, false, false)
//                 SetCurrentPedWeapon(playerPed, weaponItem.weapon_hash, false, 0, false, false)
//             end
//             Wait(0)
//             if GetAmmoInPedWeapon(playerPed, weaponItem.weapon_hash) > 0 then
//                 if equippedToOffhand then
//                     local _, weaponHash = GetCurrentPedWeapon(playerPed,false,1,true)
//                     if weaponHash ~= weaponItem.weapon_hash then
//                         SetCurrentPedWeapon(playerPed, weaponItem.weapon_hash, true, 1, false, false)
//                     end
//                 else
//                     local _, weaponHash = GetCurrentPedWeapon(playerPed,false,0,true)
//                     if weaponHash ~= weaponItem.weapon_hash then
//                         SetCurrentPedWeapon(playerPed, weaponItem.weapon_hash, true, 0, false, false)
//                     end
//                 end
//             end
//         end
//     end
// end)

import { PVGame } from '@lib/client';
import { AttachPoint } from '@lib/flags';

on('inventory:client:toggle_weapon', (item: Inventory.ItemWeapon) => {
  const playerPed = PVGame.playerPed();
  const [hasMainHand, currentWeapon] = GetCurrentPedWeapon(playerPed, false, AttachPoint.MainHand, false);
  const [hasOffHand, currentWeaponOffhand] = GetCurrentPedWeapon(playerPed, false, AttachPoint.OffHand, false);

  if (currentWeapon === item.weaponHash) {
    SetCurrentPedWeapon(playerPed, `WEAPON_UNARMED`, false, AttachPoint.MainHand, false, false);
    SetCurrentPedWeapon(playerPed, `WEAPON_UNARMED`, false, AttachPoint.OffHand, false, false);
  } else if (currentWeaponOffhand === item.weaponHash) {
    SetCurrentPedWeapon(playerPed, `WEAPON_UNARMED`, false, AttachPoint.OffHand, false, false);
  } else {
    // TODO: Handle Thrown Weapons
    if (!HasPedGotWeapon(playerPed, item.weaponHash, false)) {
      GiveWeaponToPed(playerPed, item.weaponHash, 0, false, true, 0, false, 0.5, 1.0, 752097756, false, 0.0, false);
    }

    SetCurrentPedWeapon(playerPed, item.weaponHash, false, 0, false, false);
  }
});

on('inventory:client:equip_ammo', (item: Inventory.ItemAmmo) => {
  const playerPed = PVGame.playerPed();
  AddAmmoToPedByType(playerPed, item.ammoHash, item.ammoAmount, 752097756);
});

on('inventory:client:toggle_thrown', (item: Inventory.ItemWeapon & Inventory.ItemAmmo) => {
  // TODO: Some kind of event when thrown weapon is used remove from inventory
  const playerPed = PVGame.playerPed();
  const [hasMainHand, currentWeapon] = GetCurrentPedWeapon(playerPed, false, AttachPoint.MainHand, false);
  const [hasOffHand, currentWeaponOffhand] = GetCurrentPedWeapon(playerPed, false, AttachPoint.OffHand, false);

  if (currentWeapon === item.weaponHash) {
    SetCurrentPedWeapon(playerPed, `WEAPON_UNARMED`, false, AttachPoint.MainHand, false, false);
    SetCurrentPedWeapon(playerPed, `WEAPON_UNARMED`, false, AttachPoint.OffHand, false, false);
  } else {
    if (!HasPedGotWeapon(playerPed, item.weaponHash, false)) {
      GiveWeaponToPed(playerPed, item.weaponHash, 0, false, true, 0, false, 0.5, 1.0, 752097756, false, 0.0, false);
    }

    AddAmmoToPedByType(playerPed, item.ammoHash, 1, 752097756);

    SetCurrentPedWeapon(playerPed, item.weaponHash, false, 0, false, false);
  }
});
