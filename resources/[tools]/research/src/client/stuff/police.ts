import {
  PVBase,
  PVGame,
  PVJobs,
  PVKeymapper,
  PVTarget,
  PedManager,
  type PedReactionConfig,
  onResourceStop,
} from '@lib/client';
import { AnimFlag, AttachPoint } from '@lib/flags';
import { Delay } from '@lib/functions';
import { Vector3 } from '@lib/math';

let isWhistling = false;

const whistle = async (): Promise<void> => {
  if (isWhistling) {
    return;
  }
  isWhistling = true;
  const playerPed = PlayerPedId();
  const [ret, weaponHash] = GetCurrentPedWeapon(playerPed, false, 0, false);
  SetCurrentPedWeapon(playerPed, GetHashKey('WEAPON_UNARMED'), true, 0, false, false);
  const whistleObj = await PVGame.createObject('p_whistle01x', undefined, undefined, false);
  PVGame.attachEntityToBoneName(whistleObj, 'IK_R_HAND', undefined, new Vector3(-0.1, 0, 0), new Vector3(0, 90, 0));
  PVGame.taskPlayAnim({
    dict: 'amb_rest@world_human_smoke_cigar@male_a@idle_a',
    anim: 'idle_b',
    flags: AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
    blendInSpeed: 4,
    blendOutSpeed: -2,
    delta: 0.4,
    duration: 1000,
  });
  await Delay(100);
  PrepareSoundset('NBD1_Sounds', false);
  PlaySoundFromEntity('POLICE_WHISTLE_SINGLE', playerPed, 'NBD1_Sounds', true, 0, 0);
  await Delay(1000);
  await PVBase.deleteEntity(whistleObj);
  SetCurrentPedWeapon(playerPed, weaponHash, true, 0, false, false);
  isWhistling = false;
};

RegisterCommand('+whistle', whistle, false);

PVKeymapper.RegisterKeyMapping('whistle', 'Police Whistle', 'keyboard', 'J');

if (typeof PrepareSoundset !== 'undefined') {
  console.log('PrepareSoundset', PrepareSoundset);
} else {
  console.log('PrepareSoundset is undefined');
}

PVTarget.AddTarget({
  id: 'jobs::sheriff-desk',
  type: 'point',
  group: [{ x: -277.345, y: 805.225, z: 119.2 }],
  data: [
    {
      id: 'sheriff_clock_in',
      label: 'Clock In',
      icon: 'clock',
      event: 'jobs:client:clock-in',
      parameters: { jobHandle: 'sheriff' },
      isEnabled() {
        return !PVJobs.isCurrentlyClocked();
      },
    },
    {
      id: 'sheriff_clock_tasks',
      label: 'Tasks',
      icon: 'tasks',
      event: 'jobs:client:tasks',
      parameters: { jobHandle: 'sheriff' },
      isEnabled() {
        return PVJobs.isCurrentlyClocked();
      },
    },
    {
      id: 'sheriff_clock_out',
      label: 'Clock Out',
      icon: 'clock',
      event: 'jobs:client:clock-out',
      parameters: { jobHandle: 'sheriff' },
      isEnabled() {
        return PVJobs.isCurrentlyClocked();
      },
    },
  ],
  options: {
    distance: 2,
    renderDistance: 5,
    losCheck: false,
    screenThreshold: 0.05,
    sprite: { r: 255, g: 255, b: 255, a: 255 },
  },
});

PVTarget.AddTarget({
  id: 'research::arrest_entity',
  type: 'flag',
  group: ['isEntity'],
  data: [
    {
      id: 'arrest_entity',
      label: 'Arrest',
      icon: 'badge',
      event: 'research:client:arrest_entity',
      isEnabled(data) {
        return (
          (data.entity &&
            DoesEntityExist(data.entity) &&
            IsPedHuman(data.entity) &&
            IsPedFacingPed(PlayerPedId(), data.entity, 45) &&
            !Entity(data.entity).state.isHandcuffed) ||
          false
        );
      },
    },
  ],
  options: {
    distance: 3.0,
  },
});

PVTarget.AddTarget({
  id: 'research::uncuff',
  type: 'flag',
  group: ['isEntity'],
  data: [
    {
      id: 'uncuff',
      label: 'Uncuff',
      icon: 'badge',
      event: 'research:client:uncuff',
      isEnabled(data) {
        return data.entity && DoesEntityExist(data.entity) && Entity(data.entity).state.isHandcuffed;
      },
    },
  ],
  options: {
    distance: 3.0,
  },
});

on('research:client:uncuff', async (entity: number) => {
  const cuffRightNetId = Entity(entity).state.cuffsR;
  const cuffLeftNetId = Entity(entity).state.cuffsL;
  const ropeNetId = Entity(entity).state.rope;

  const cuffsR = NetworkGetEntityFromNetworkId(cuffRightNetId);
  const cuffsL = NetworkGetEntityFromNetworkId(cuffLeftNetId);
  const rope = NetworkGetRopeIdFromNetworkId(ropeNetId);

  PVBase.deleteEntity(cuffsR);
  PVBase.deleteEntity(cuffsL);
  DetachRopeFromEntity(rope, entity);
  SetEnableHandcuffs(entity, false, false);
  DeleteRope(rope);
  Entity(entity).state.set('isHandcuffed', false, true);
});

on('research:client:arrest_entity', async (entity: number) => {
  const coords = Vector3.fromArray(GetEntityCoords(entity, true, true));

  const [rtn, z] = GetGroundZFor_3DCoord(coords.x, coords.y, coords.z, false);

  if (rtn) {
    coords.z = z;
  } else {
    coords.z -= 1;
  }

  const playerCoords = PVGame.playerCoords(true);
  const direction = Vector3.fromArray(
    GetOffsetFromEntityGivenWorldCoords(entity, playerCoords.x, playerCoords.y, playerCoords.z),
  );

  const [weapRtn, weaponHash] = GetCurrentPedWeapon(PlayerPedId(), false, AttachPoint.MainHand, false);

  let animStyle: 'rifle' | 'pistol' = 'pistol';
  if (weapRtn) {
    if (IsWeaponTwoHanded(weaponHash)) {
      animStyle = 'rifle';
    }
  }

  let side: 'front' | 'back' | 'left' | 'right';
  if (Math.abs(direction.x) > Math.abs(direction.y)) {
    if (direction.x > 0) {
      side = 'right';
    } else {
      side = 'left';
    }
  } else {
    if (direction.y > 0) {
      side = 'front';
    } else {
      side = 'back';
    }
  }

  let playerHeading = GetEntityHeading(entity);

  PVGame.taskPlayAnimAdvArray(
    coords,
    { x: 0, y: 0, z: playerHeading },
    [
      {
        dict: `mech_melee@${animStyle}@_male@_ambient@_healthy@_streamed`,
        anim: `arrest_enter_from_${side}_aiming_v1_att`,
        flags: AnimFlag.OFFSET_POSITION,
      },
    ],
    true,
  );

  PVGame.taskPlayAnimAdvArray(
    coords,
    { x: 0, y: 0, z: playerHeading },
    [
      {
        entity,
        dict: `mech_melee@${animStyle}@_male@_ambient@_healthy@_streamed`,
        anim: `arrest_enter_from_${side}_aiming_v1_vic`,
        flags: AnimFlag.OFFSET_POSITION,
      },
    ],
    true,
    entity,
  );

  await Delay(6_500);
  SetEnableHandcuffs(entity, true, false);

  const cuffsR = await PVGame.createObject('P_CS_SHACKLEWRIST02X');
  PVGame.attachEntityToBoneName(
    cuffsR,
    'PH_R_HAND',
    entity,
    new Vector3(-0.075, 0, 0.01),
    //
    new Vector3(0, -65, 0),
  );

  const cuffsL = await PVGame.createObject('P_CS_SHACKLEWRIST02X');
  PVGame.attachEntityToBoneName(
    cuffsL,
    'PH_L_HAND',
    entity,
    new Vector3(-0.075, 0, 0.01),
    //
    new Vector3(0, 65, 0),
  );

  // @ts-ignore
  const rope = AddRope(
    //
    coords.x,
    coords.y,
    coords.z,
    0,
    0,
    0,
    0.001,
    7,
    0.005,
    0.015,
    0,
    false,
    false,
    true,
    1.0,
    true,
  );
  console.log('rope', rope);
  AttachEntitiesToRope(
    // @ts-ignore
    rope,
    entity,
    entity,
    -0.11,
    0,
    0.05,
    -0.11,
    0,
    -0.05,
    0.1,
    0,
    0,
    0, //'PH_L_HAND',
    0, //'PH_R_HAND',
    false,
    37709,
    7966,
    0,
    0,
    true,
    false,
  );

  const cuffRightNetId = NetworkGetNetworkIdFromEntity(cuffsR);
  const cuffLeftNetId = NetworkGetNetworkIdFromEntity(cuffsL);
  // @ts-ignore
  const ropeNetId = NetworkGetNetworkIdFromRopeId(rope);

  SetEntityCarryingFlag(entity, 2, true);
  SetEntityCarryingFlag(entity, 6, true);
  SetEntityCarryingFlag(entity, 5, true);
  TaskStandStill(entity, -1);
  SetPedKeepTask(entity, true);

  Entity(entity).state.set('cuffsR', cuffRightNetId, true);
  Entity(entity).state.set('cuffsL', cuffLeftNetId, true);
  Entity(entity).state.set('rope', ropeNetId, true);
  Entity(entity).state.set('isHandcuffed', true, true);
});

const tick = setTick(() => {
  SetBlockingOfNonTemporaryEventsForAmbientPedsThisFrame(true);
});

onResourceStop(() => {
  clearTick(tick);
});

/*

mech_melee@rifle@_male@_ambient@_healthy@_streamed

arrest_enter_from_back_aiming_v1_att
arrest_enter_from_back_aiming_v1_vic
arrest_enter_from_front_aiming_v1_att
arrest_enter_from_front_aiming_v1_vic
arrest_enter_from_right_aiming_v1_att
arrest_enter_from_right_aiming_v1_vic
arrest_enter_from_left_aiming_v1_att
arrest_enter_from_left_aiming_v1_vic



mech_melee@pistol@_male@_ambient@_healthy@_streamed

arrest_enter_from_back_aiming_v1_att
arrest_enter_from_back_aiming_v1_vic
arrest_enter_from_front_aiming_v1_att
arrest_enter_from_right_aiming_v1_vic
arrest_enter_from_front_aiming_v1_vic
arrest_enter_from_right_aiming_v1_att
arrest_enter_from_left_aiming_v1_att
arrest_enter_from_left_aiming_v1_vic

*/

RegisterCommand(
  'anim_scene_test',
  async (source: number, args: any[], rawCommand: string) => {
    // Log({ source, args, rawCommand });

    // PVGame.taskPlayAnimAdvArray(
    //   coords,
    //   { x: 0, y: 0, z: playerHeading },
    //   [
    //     {
    //       dict: `mech_melee@${animStyle}@_male@_ambient@_healthy@_streamed`,
    //       anim: `arrest_enter_from_${side}_aiming_v1_att`,
    //       flags: AnimFlag.OFFSET_POSITION,
    //     },
    //   ],
    //   true,
    // );
    //
    // PVGame.taskPlayAnimAdvArray(
    //   coords,
    //   { x: 0, y: 0, z: playerHeading },
    //   [
    //     {
    //       entity,
    //       dict: `mech_melee@${animStyle}@_male@_ambient@_healthy@_streamed`,
    //       anim: `arrest_enter_from_${side}_aiming_v1_vic`,
    //       flags: AnimFlag.OFFSET_POSITION,
    //     },
    //   ],
    //   true,
    //   entity,
    // );

    const animStyle = 'pistol';
    const animDict = `mech_melee@${animStyle}@_male@_ambient@_healthy@_streamed`;

    await PVGame.loadAnimDict(animDict);

    const animScene = CreateAnimScene(animDict, 2, 'arrest_enter_from_back_aiming_v1_att', false, true);

    if (IsAnimSceneLoaded(animScene, true, false)) {
      RequestAnimScenePlayList(animScene, 'arrest_enter_from_back_aiming_v1_att');
      StartAnimScene(animScene);
    }

    DeleteAnimScene(animScene);
  },
  false,
);

const manager = PedManager.getInstance();

(async () => {
  const ped = await manager.spawn('val-bank-ped', {
    model: 's_m_m_bankclerk_01',
    position: { x: -308.09, y: 773.89, z: 117.7, w: 9.3 },
    freeze: true,
    invincible: true,
    blockEvents: true,
    missionEntity: true,
    // Ambient speech fires on a random interval independently of the routine.
    speech: {
      ref: '0822_S_M_M_BANKCLERK_01_WHITE_01',
      names: ['HOWS_IT_GOING', 'WELCOME'],
      lines: ['HOWS_IT_GOING', 'WELCOME'],
      params: 'speech_params_standard',
      intervalMs: [15_000, 45_000],
    },
    // Routine loops through all step types as a demonstration:
    //   scenario — teller works at the counter
    //   anim     — does key unlock animation
    //   speech   — one-shot voiced line mid-routine
    //   wait     — brief pause before the next cycle
    routine: [
      { type: 'scenario', name: 'WORLD_HUMAN_VAL_BANKTELLER', duration: 10_000 },
      // { type: 'anim', dict: 'script_common@jail_cell@unlock@key', anim: 'action_mp_female', duration: 2_000 },
      // {
      //   type: 'speech',
      //   ref: '0822_S_M_M_BANKCLERK_01_WHITE_01',
      //   name: 'UNAUTHORIZED_AREA',
      //   params: 'speech_params_force',
      // },
      // { type: 'wait', ms: 2_000 },
    ],
    reactions: [
      // Teller reacts when they personally are attacked.
      {
        event: 'EVENT_ENTITY_DAMAGED',
        entityField: 'attacked',
        cooldownMs: 8_000,
        lines: [
          { ref: '0822_S_M_M_BANKCLERK_01_WHITE_01', name: 'GENERIC_FRIGHTENED_HIGH', params: 'speech_params_force' },
          { ref: '0822_S_M_M_BANKCLERK_01_WHITE_01', name: 'LAW_THREAT', params: 'speech_params_force' },
        ],
        onReact: (pedHandle, data) => {
          // e.g. trigger a flee animation, send a server event, update UI, etc.
          console.log(`ped ${pedHandle} was hit:`, data);
        },
      },
      // Teller reacts to any violence happening nearby (any entity damaged).
      {
        event: 'EVENT_SHOT_FIRED_BULLET_IMPACT',
        cooldownMs: 15_000,
        lines: [
          { ref: '0822_S_M_M_BANKCLERK_01_WHITE_01', name: 'GET_AWAY_FROM_ME', params: 'speech_params_force_shouted' },
          {
            ref: '0822_S_M_M_BANKCLERK_01_WHITE_01',
            name: 'GENERIC_SHOCKED_MED',
            params: 'speech_params_force_shouted',
          },
        ],
        onReact: (pedHandle, data) => {
          // e.g. trigger a flee animation, send a server event, update UI, etc.
          console.log(`ped ${pedHandle} was hit:`, data);
        },
      },
    ] satisfies PedReactionConfig[],
  });

  console.log('bank ped', ped);
})();
/*
const blipCoords = {
  x: 0,
  y: 800,
  z: 120,
};

PVBase.blipRegister('test-1', {
  type: 'area',
  coords: blipCoords,
  label: 'Area',
  scale: [100, 150],
  style: BlipStyles.MISSION,
  modifiers: [BlipModifiers.OBJECTIVE],
});

PVBase.blipRegister('test-2', {
  type: 'radius',
  coords: Vector3.fromObject(blipCoords).add(new Vector3(66.6, -150, 0)),
  label: 'Radius',
  style: BlipStyles.MISSION,
  modifiers: [BlipModifiers.RED],
  scale: 100,
});

const volumeCylinder = CreateVolumeCylinder(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 100, 100, 1);
SetVolumeCoords(volumeCylinder, blipCoords.x + 200, blipCoords.y + 200, blipCoords.z);
SetVolumeScale(volumeCylinder, 100, 100, 1);

PVBase.blipRegister('test-3', {
  type: 'volume',
  volume: volumeCylinder,
  label: 'Volume Cylinder',
  style: BlipStyles.MISSION,
  modifiers: [BlipModifiers.RED],
});

const volumeAggregate = CreateVolumeAggregate();
AddBoxVolumeToVolumeAggregate(volumeAggregate, -270.606, 827.282, 118.4249, 0.0, 0.0, 11.275, 80.0, 100.4, 86.6);
AddBoxVolumeToVolumeAggregate(volumeAggregate, -235.442, 653.1498, 112.3099, 0.0, 0.0, 49.575, 44.4, 76.775, 50.0);
AddBoxVolumeToVolumeAggregate(volumeAggregate, -236.9004, 797.5648, 121.6383, 0.0, 0.0, 17.55, 53.975, 105.5, 20.0);
AddBoxVolumeToVolumeAggregate(volumeAggregate, -339.8, 829.675, 100.0, 0.0, 0.0, 14.975, 25.0, 75.0, 50.0);

PVBase.blipRegister('test-4', {
  type: 'volume',
  volume: volumeAggregate,
  label: 'Volume Aggregate',
  style: BlipStyles.MISSION,
  modifiers: [BlipModifiers.RED],
});

AllowSonarBlips(true);
ForceSonarBlipsThisFrame();

TriggerSonarBlip(Sonars.CONVERSATION, blipCoords.x, blipCoords.y, blipCoords.z);
*/
