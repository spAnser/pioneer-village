import { PVEvents } from '@lib/client';
import { AttachPoint } from '@lib/flags';
import { Delay } from '@lib/functions';

type LanternOilColorState = {
  attachPoint: AttachPoint;
  oilColor: [number, number, number];
};

export function setLanternOilColor(ped: number, attachPoint: AttachPoint, oilColor: [number, number, number]) {
  const lanternEntity = GetCurrentPedWeaponEntityIndex(ped, attachPoint);
  if (lanternEntity) {
    SetLightsColorForEntity(lanternEntity, oilColor[0], oilColor[1], oilColor[2]);
  }

  // console.log('[lantern-light] setLanternOilColor', {
  //   ped,
  //   attachPoint,
  //   oilColor,
  //   isNetworked: NetworkGetEntityIsNetworked(ped),
  //   netId: NetworkGetEntityIsNetworked(ped) ? NetworkGetNetworkIdFromEntity(ped) : undefined,
  // });

  if (NetworkGetEntityIsNetworked(ped)) {
    const state: LanternOilColorState = { attachPoint, oilColor };
    Entity(ped).state.set('lanternOilColor', state, true);
    // console.log('[lantern-light] state.set applied, readback=', Entity(ped).state['lanternOilColor']);
  }
}

PVEvents.registerStateEvent(`inventory:lanternOilColor`, 'lanternOilColor', {
  callback: async (entity, key, value) => {
    let attempts = 0;
    let lanternEntity: number;
    do {
      lanternEntity = GetCurrentPedWeaponEntityIndex(entity, value.attachPoint);

      await Delay(50);
      if (++attempts > 50) {
        break;
      }
    } while (!lanternEntity);
    // console.log('[lantern-light] resolved lanternEntity', lanternEntity);
    if (!lanternEntity) {
      return;
    }

    const { oilColor } = value;
    SetLightsColorForEntity(lanternEntity, oilColor[0], oilColor[1], oilColor[2]);
    // console.log('[lantern-light] applied color to other ped lantern');
  },
  includeClear: false,
  includeSelf: false,
});
