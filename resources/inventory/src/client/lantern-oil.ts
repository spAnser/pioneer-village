import { PVGame } from '@lib/client';
import { emitSocket } from '@lib/client/comms/ui';
import { AttachPoint } from '@lib/flags';
import PVItems from '@lib/shared/items';

const lanternIdentifierByWeaponHash = new Map<number, number>();
for (const item of Object.values(PVItems)) {
  if ('weaponHash' in item && item.image?.startsWith('lantern')) {
    lanternIdentifierByWeaponHash.set(item.weaponHash >>> 0, item.identifier);
  }
}

on('inventory:client:apply_lantern_oil', (oilItem: Inventory.ItemLanternOil, oilItemData: UI.Inventory.ItemData) => {
  const playerPed = PVGame.playerPed();
  const [hasMainHand, mainHandWeapon] = GetCurrentPedWeapon(playerPed, false, AttachPoint.MainHand, false);
  const [hasOffHand, offHandWeapon] = GetCurrentPedWeapon(playerPed, false, AttachPoint.OffHand, false);
  const [hasHip, hipWeapon] = GetCurrentPedWeapon(playerPed, false, AttachPoint.Hip, false);

  let attachPoint: AttachPoint | undefined;
  let lanternIdentifier: number | undefined;
  if (hasMainHand && lanternIdentifierByWeaponHash.has(mainHandWeapon >>> 0)) {
    attachPoint = AttachPoint.MainHand;
    lanternIdentifier = lanternIdentifierByWeaponHash.get(mainHandWeapon >>> 0);
  } else if (hasOffHand && lanternIdentifierByWeaponHash.has(offHandWeapon >>> 0)) {
    attachPoint = AttachPoint.OffHand;
    lanternIdentifier = lanternIdentifierByWeaponHash.get(offHandWeapon >>> 0);
  } else if (hasHip && lanternIdentifierByWeaponHash.has(hipWeapon >>> 0)) {
    attachPoint = AttachPoint.Hip;
    lanternIdentifier = lanternIdentifierByWeaponHash.get(hipWeapon >>> 0);
  }

  if (attachPoint === undefined || lanternIdentifier === undefined) {
    console.warn('No equipped lantern to apply oil to');
    return;
  }

  const lanternEntity = GetCurrentPedWeaponEntityIndex(playerPed, attachPoint);
  if (lanternEntity) {
    const [red, green, blue] = oilItem.oilColor;
    SetLightsColorForEntity(lanternEntity, red, green, blue);
  }

  const oilItemId = oilItemData.ids[0];
  emitSocket('inventory.apply-lantern-oil', oilItemId, lanternIdentifier);
});
