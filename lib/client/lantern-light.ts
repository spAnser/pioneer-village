import { AttachPoint } from '@lib/flags';

const LANTERN_OIL_COLOR_STATE_KEY = 'lanternOilColor';

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
    Entity(ped).state.set(LANTERN_OIL_COLOR_STATE_KEY, state, true);
    // console.log('[lantern-light] state.set applied, readback=', Entity(ped).state[LANTERN_OIL_COLOR_STATE_KEY]);
  }
}

let initialized = false;

export function initLanternLightSync() {
  if (initialized) {
    return;
  }
  initialized = true;

  // console.log('[lantern-light] initLanternLightSync registering handler, resource=', GetCurrentResourceName());

  AddStateBagChangeHandler(LANTERN_OIL_COLOR_STATE_KEY, '', (bagName: string, _key: string, value: LanternOilColorState | undefined) => {
    // console.log('[lantern-light] state bag change fired', { bagName, value });

    if (!value) {
      // console.log('[lantern-light] no value, skipping');
      return;
    }

    const ped = GetEntityFromStateBagName(bagName);
    // console.log('[lantern-light] resolved ped from bag', { bagName, ped, exists: ped ? DoesEntityExist(ped) : false, isLocalPlayer: ped === PlayerPedId() });

    if (!ped || !DoesEntityExist(ped) || ped === PlayerPedId()) {
      return;
    }

    const lanternEntity = GetCurrentPedWeaponEntityIndex(ped, value.attachPoint);
    // console.log('[lantern-light] resolved lanternEntity', lanternEntity);
    if (!lanternEntity) {
      return;
    }

    const { oilColor } = value;
    SetLightsColorForEntity(lanternEntity, oilColor[0], oilColor[1], oilColor[2]);
    // console.log('[lantern-light] applied color to other ped lantern');
  });
}
