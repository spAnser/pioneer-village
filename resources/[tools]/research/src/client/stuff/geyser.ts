import { PVGame, PVPrompt, PVTarget, PVWorld, addZone } from '@lib/client';
import { AnimFlag } from '@lib/flags';
import { Delay } from '@lib/functions';
import { Vector3 } from '@lib/math';

let soundId: number;

let crackpotActive = false;
let crackpotSoundId = 0;
let crackpotSoundId2 = 0;

let engineOneActive = false; // 2511.316162, 2284.134521, 177.351471
let engineTwoActive = false; // 2512.821777, 2289.186035, 177.351471
let engineOneSoundId: number; // ELECTRIC_GENERATOR RRTL7_Sounds
let engineTwoSoundId: number; // ELECTRIC_GENERATOR RRTL7_Sounds

on('onResourceStop', (resourceName: string) => {
  if (resourceName === GetCurrentResourceName()) {
    StopSound(soundId);
    ReleaseSoundId(soundId);

    if (crackpotActive) {
      StopSound(crackpotSoundId);
      ReleaseSoundId(crackpotSoundId);
      PVWorld.stopFx('ptfx_crackpot');
      PVWorld.stopFx('ptfx_test');
      PVWorld.stopFx('ptfx_test_alt');
      PVWorld.stopFx('bathing_foam_head');
      PVWorld.stopFx('bathing_foam_torso');
      PVWorld.stopFx('bathing_foam_l_upperarm');
      PVWorld.stopFx('bathing_foam_l_forearm');
      PVWorld.stopFx('bathing_foam_r_upperarm');
      PVWorld.stopFx('bathing_foam_r_forearm');
      PVWorld.stopFx('ptfx_test_all');
    }

    if (engineOneActive) {
      StopSound(engineOneSoundId);
      ReleaseSoundId(engineOneSoundId);
    }

    if (engineTwoActive) {
      StopSound(engineTwoSoundId);
      ReleaseSoundId(engineTwoSoundId);
    }
  }
});

const flipTeslaLever = async () => {
  PVPrompt.hide('tesla_coil_lever');
  SetPedDesiredHeading(PlayerPedId(), 335.89);
  await Delay(1500);
  await PVGame.playAnimTask({
    dict: 'script_rc@ckpt@ig@ig4_switches',
    anim: `pull_middle_switch_${crackpotActive ? 'up' : 'down'}_arthur`,
    duration: crackpotActive ? 3500 : 2000,
  });

  if (crackpotActive) {
    // Stop crackpot fx and sound
    PVWorld.stopFx('ptfx_crackpot');
    StopSound(crackpotSoundId);
    ReleaseSoundId(crackpotSoundId);
  } else {
    // Start crackpot fx and sound
    await PVWorld.startFxAtCoords(
      'ptfx_crackpot',
      true,
      'scr_crackpot',
      'scr_crackpot_tesla_coil',
      { x: 2515.84, y: 2285.24, z: 179.46 },
      { x: 0, y: 0, z: 0 },
      1.0,
    );

    crackpotSoundId = GetSoundId();
    console.log('crackpotSoundId', crackpotSoundId);
    PrepareSoundset('RCKPT2_Sounds', false);
    PlaySoundFromPositionWithId(crackpotSoundId, 'DEVICE', 2515.84, 2285.24, 179.46, 'RCKPT2_Sounds', false, 0, false);
  }

  crackpotActive = !crackpotActive;
  PVPrompt.show('tesla_coil_lever');
};

PVPrompt.register(flipTeslaLever, 'createHold', 'tesla_coil_lever', 0xcefd9220, 'Flip Lever');

addZone({
  _type: 'sphere',
  coords: { x: 2521.847168, y: 2284.270264, z: 177.351501 },
  radius: 0.75,
  name: 'tesla_coil_lever',
  onEnter: () => {
    if (!engineOneActive || !engineTwoActive) return;
    PVPrompt.enable('tesla_coil_lever');
    PVPrompt.show('tesla_coil_lever');
  },
  onExit: () => {
    PVPrompt.hide('tesla_coil_lever');
  },
});

// Engine 1 uses a lever instead of a valve
const turnEngineOneValue = async () => {
  const entity = GetClosestObjectOfType(
    2510.823242,
    2284.524902,
    177.351471,
    1.0,
    `P_DOV_LAB_GENERATOR01`,
    false,
    false,
    false,
  );
  if (!entity) {
    console.log('No entity found for engine two lever');
    return;
  }

  console.log(entity);
  PVPrompt.hide('engine_two_lever');
  SetPedDesiredHeading(PlayerPedId(), 157.81008911133);
  await Delay(1500);
  await PVGame.playAnimTask({
    dict: 'script_rc@ckpt@ig@ig4_switches',
    anim: `pull_middle_switch_${engineOneActive ? 'up' : 'down'}_arthur`,
    duration: engineOneActive ? 3500 : 2000,
  });

  if (engineOneActive) {
    StopSound(engineOneSoundId);
    PVGame.taskPlayEntityAnim([
      {
        obj: entity,
        loop: false,
        delta: 0.75,
        dict: 'script_rc@ckpt@ig@temp',
        anim: 'p_dov_lab_generator01',
      },
    ]);
  } else {
    engineOneSoundId = GetSoundId();
    PrepareSoundset('RRTL7_Sounds', false);
    PlaySoundFromPositionWithId(
      engineOneSoundId,
      'ELECTRIC_GENERATOR',
      2510.823242,
      2284.524902,
      177.351471,
      'RRTL7_Sounds',
      false,
      10,
      false,
    );
    Citizen.invokeNative('0x531a78d6bf27014b', 'RRTL7_Sounds');
    PVGame.taskPlayEntityAnim([
      {
        obj: entity,
        loop: true,
        dict: 'script_rc@ckpt@ig@temp',
        anim: 'p_dov_lab_generator01',
      },
    ]);
  }

  engineOneActive = !engineOneActive;
  PVPrompt.show('engine_two_lever');
};

PVPrompt.register(turnEngineOneValue, 'createHold', 'engine_two_lever', 0xcefd9220, 'Pull Lever');

const turnEngineTwoValue = async () => {
  const entity = GetClosestObjectOfType(
    2513.862549,
    2289.636719,
    177.863708,
    1.0,
    `P_DOV_LAB_GENERATOR02`,
    false,
    false,
    false,
  );
  if (!entity) {
    console.log('No entity found for engine one valve');
    return;
  }

  console.log(entity);

  PVPrompt.hide('engine_one_valve');
  const dict = `amb_work@world_human_valve@med@male_${engineTwoActive ? 'a' : 'b'}@wip_base`;
  SetPedDesiredHeading(PlayerPedId(), 357.71298217773);
  await Delay(1500);
  await PVGame.playAnimTask({
    dict,
    anim: 'wip_base',
  });

  if (engineTwoActive) {
    StopSound(engineTwoSoundId);
    PVGame.taskPlayEntityAnim([
      {
        obj: entity,
        loop: false,
        delta: 0.75,
        dict: 'script_rc@ckpt@ig@temp',
        anim: 'p_dov_lab_generator02',
      },
    ]);
  } else {
    engineTwoSoundId = GetSoundId();
    PrepareSoundset('RRTL7_Sounds', false);
    PlaySoundFromPositionWithId(
      engineTwoSoundId,
      'ELECTRIC_GENERATOR',
      2513.862549,
      2289.636719,
      177.863708,
      'RRTL7_Sounds',
      true,
      0,
      false,
    );
    Citizen.invokeNative('0x531a78d6bf27014b', 'RRTL7_Sounds');
    PVGame.taskPlayEntityAnim([
      {
        obj: entity,
        loop: true,
        dict: 'script_rc@ckpt@ig@temp',
        anim: 'p_dov_lab_generator02',
      },
    ]);
  }

  engineTwoActive = !engineTwoActive;
  PVPrompt.show('engine_one_valve');
};

PVPrompt.register(turnEngineTwoValue, 'createHold', 'engine_one_valve', 0xcefd9220, 'Turn Valve');

addZone({
  _type: 'sphere',
  coords: { x: 2512.821777, y: 2289.186035, z: 177.351471 },
  radius: 0.75,
  name: 'engine_1_valve',
  onEnter: () => {
    PVPrompt.enable('engine_one_valve');
    PVPrompt.show('engine_one_valve');
  },
  onExit: () => {
    PVPrompt.hide('engine_one_valve');
  },
});

addZone({
  _type: 'sphere',
  coords: { x: 2511.316162, y: 2284.134521, z: 177.351471 },
  radius: 0.75,
  name: 'engine_2_lever',
  onEnter: () => {
    PVPrompt.enable('engine_two_lever');
    PVPrompt.show('engine_two_lever');
  },
  onExit: () => {
    PVPrompt.hide('engine_two_lever');
  },
});

RegisterCommand(
  'meteor_shower',
  async (source: number, args: any[], rawCommand: string) => {
    // console.log({ source, args, rawCommand });

    await PVWorld.startFxAtCoords(
      'meteor_shower',
      true,
      'scr_discoverables',
      'scr_disc_meteor_shower',
      { x: 2895.893, y: 1650.213, z: 1000.863 },
      { x: 0, y: 0, z: 0 },
      2.0,
      true,
    );

    await Delay(60e3);

    PVWorld.stopFx('meteor_shower');
  },
  false,
);

RegisterCommand(
  'crackpot',
  async (source: number, args: any[], rawCommand: string) => {
    // console.log({ source, args, rawCommand });
    await PVWorld.startFxAtCoords(
      'ptfx_test',
      true,
      'scr_crackpot',
      'scr_crackpot_tesla_coil',
      { x: 2515.84, y: 2285.24, z: 179.46 },
      { x: 0, y: 0, z: 0 },
      1.0,
    );

    soundId = GetSoundId();
    // console.log({ source, args, rawCommand });
    PrepareSoundset('RCKPT2_Sounds', false);
    // PlaySoundFromEntity('DEVICE', playerPed, 'RCKPT2_Sounds', true, 0, 0);
    PlaySoundFromPositionWithId(soundId, 'DEVICE', 2515.84, 2285.24, 179.46, 'RCKPT2_Sounds', false, 0, false);

    await Delay(5000);

    StopSound(soundId);
    ReleaseSoundId(soundId);

    PVWorld.stopFx('ptfx_test');
  },
  false,
);

const locs = [
  { x: 2521.12, y: 2302.99, z: 193.24 },
  { x: 2389.52, y: 2291.71, z: 242.51 },
  { x: 2381.77, y: 2397.26, z: 251.36 },
  { x: 2394.05, y: 2302.79, z: 243.02 },
  { x: 2372.04, y: 2382.25, z: 262.96 },
  { x: 2341.92, y: 2341.52, z: 263.26 },
  { x: 2412.97, y: 2344.84, z: 240.92 },
  { x: 2521.55, y: 2301.41, z: 197.35 },
  { x: 2518.76, y: 2298.03, z: 195.23 },
  { x: 2517.07, y: 2302.53, z: 195.3 },
  { x: 2520.89, y: 2301.48, z: 197.35 },
  { x: 2520.89, y: 2301.48, z: 197.35 },
];

RegisterCommand(
  'ptfx_test',
  async () => {
    PVWorld.stopFx('ptfx_test');

    const coords = PVGame.playerCoords(true);
    // cosnt coords = { x: 2520.91, y: 2301.47, z: 196.82 }
    coords.x -= 1;

    const id = await PVWorld.startFxAtCoords(
      'ptfx_test',
      true,
      'scr_winter1',
      'scr_winter1_fog_cover',
      coords,
      { x: 0, y: 0, z: 0 },
      1.0,
    );
    console.log('id', id);

    /*
    await PVWorld.startFxOnEntityBoneByName(
      'bathing_foam_head',
      true,
      'scr_mg_bathing',
      'scr_mg_bathing_foam_head',
      PVGame.playerPed(),
      'SKEL_HEAD',
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      0.4,
    );
    await PVWorld.startFxOnEntityBoneByName(
      'bathing_foam_torso',
      true,
      'scr_mg_bathing',
      'scr_mg_bathing_foam_torso',
      PVGame.playerPed(),
      'SKEL_SPINE2',
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      0.4,
    );
    await PVWorld.startFxOnEntityBoneByName(
      'bathing_foam_l_upperarm',
      true,
      'scr_mg_bathing',
      'scr_mg_bathing_foam_upperarm',
      PVGame.playerPed(),
      'SKEL_L_UPPERARM',
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      0.6,
    );
    await PVWorld.startFxOnEntityBoneByName(
      'bathing_foam_l_forearm',
      true,
      'scr_mg_bathing',
      'scr_mg_bathing_foam_forearm',
      PVGame.playerPed(),
      'SKEL_L_FOREARM',
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      0.5,
    );
    await PVWorld.startFxOnEntityBoneByName(
      'bathing_foam_r_upperarm',
      true,
      'scr_mg_bathing',
      'scr_mg_bathing_foam_upperarm',
      PVGame.playerPed(),
      'SKEL_R_UPPERARM',
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      0.6,
    );
    await PVWorld.startFxOnEntityBoneByName(
      'bathing_foam_r_forearm',
      true,
      'scr_mg_bathing',
      'scr_mg_bathing_foam_forearm',
      PVGame.playerPed(),
      'SKEL_R_FOREARM',
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      0.5,
    );
    await Delay(250);
    */

    // for (const loc of locs) {
    //   console.log('Spawning at', loc);
    //   await PVWorld.startFxAtCoords(
    //     'ptfx_test',
    //     false,
    //     'scr_crackpot',
    //     'scr_crackpot_rc_lightening',
    //     // coords,
    //     loc,
    //     { x: 0, y: 0, z: 0 },
    //     1.0,
    //   );
    //
    //   await Delay(250);
    //   PVWorld.stopFx('ptfx_test');
    //   await Delay(250);
    // }

    // PVWorld.setFxEvolution('bathing_foam_head', 'scrub', 1);
    // PVWorld.setFxEvolution('bathing_foam_torso', 'scrub', 1);
    // PVWorld.setFxEvolution('bathing_foam_l_upperarm', 'scrub', 1);
    // PVWorld.setFxEvolution('bathing_foam_l_forearm', 'scrub', 1);
    // PVWorld.setFxEvolution('bathing_foam_r_upperarm', 'scrub', 1);
    // PVWorld.setFxEvolution('bathing_foam_r_forearm', 'scrub', 1);

    PVWorld.setFxEvolution('ptfx_test', 'fade', 0.25);
    // PVWorld.setFxEvolution('ptfx_test', 'density', 1.0);
    // PVWorld.setFxEvolution('ptfx_test', 'strength', 1.0);
    // PVWorld.setFxEvolution('ptfx_test', 'intensity', 1.0);

    await Delay(60_000);

    PVWorld.stopFx('ptfx_test');
    PVWorld.stopFx('ptfx_test_alt');
    PVWorld.stopFx('bathing_foam_head');
    PVWorld.stopFx('bathing_foam_torso');
    PVWorld.stopFx('bathing_foam_l_upperarm');
    PVWorld.stopFx('bathing_foam_l_forearm');
    PVWorld.stopFx('bathing_foam_r_upperarm');
    PVWorld.stopFx('bathing_foam_r_forearm');
  },
  false,
);

RegisterCommand(
  'ptfx_test_stop',
  async (source: number, args: any[], rawCommand: string) => {
    // console.log({ source, args, rawCommand });

    PVWorld.stopFx('ptfx_test');
  },
  false,
);

RegisterCommand(
  'sound_test',
  async (source: number, args: any[], rawCommand: string) => {
    soundId = GetSoundId();
    // console.log({ source, args, rawCommand });
    PrepareSoundset('RCKPT2_Sounds', false);
    // PlaySoundFromEntity('DEVICE', playerPed, 'RCKPT2_Sounds', true, 0, 0);
    const coords = PVGame.playerCoords(true);
    PlaySoundFromPositionWithId(soundId, 'DEVICE', coords.x, coords.y, coords.z, 'RCKPT2_Sounds', false, 0, false);

    await Delay(5000);

    StopSound(soundId);
    ReleaseSoundId(soundId);
  },
  false,
);

/*

type PtfxData = {
  looped: boolean;
  evolutions?: string[];
};

type PtfxJson = Record<string, Record<string, PtfxData>>;

*/

const startLoopedFx = async (dict: string, fxName: string, coords: Vector3) => {
  await PVWorld.startFxAtCoords('ptfx_test_all', true, dict, fxName, coords, { x: 0, y: 0, z: 0 }, 1.0);
};

const startFx = async (dict: string, fxName: string, coords: Vector3) => {
  await PVWorld.startFxAtCoords('ptfx_test_all', false, dict, fxName, coords, { x: 0, y: 0, z: 0 }, 1.0);
};

const stopLoopedFx = async () => {
  PVWorld.stopFx('ptfx_test_all');
};

let ptfxAllActive = false;
RegisterCommand(
  'ptfx_test_all',
  async (source: number, args: any[], rawCommand: string) => {
    // console.log({ source, args, rawCommand });

    if (ptfxAllActive) return;
    ptfxAllActive = true;

    const coords = Vector3.fromObject(PVGame.playerCoords(true));
    // const coords = Vector3.fromArray([225.375092, 1889.395142, 205.78125]);
    const forward = Vector3.fromArray(GetEntityForwardVector(PVGame.playerPed())).multiplyScalar(2);
    coords.add(forward);

    const ptfxJson = LoadResourceFile('rdr3-shared', `resources/particle-fx.json`);
    const ptfx = JSON.parse(ptfxJson) as PtfxJson;
    for (const [dict, fxs] of Object.entries(ptfx)) {
      if (!dict.startsWith('scr_winter1')) continue;
      for (const [fxName, fxData] of Object.entries(fxs)) {
        console.log(`Starting FX: ${dict} - ${fxName}`);

        if (fxData.looped) {
          await startLoopedFx(dict, fxName, coords);
        } else {
          await startFx(dict, fxName, coords);
        }
        await Delay(1_000);
        // Set all evolutions to max with a delay and reducing back to 0
        if (fxData.evolutions) {
          for (const evolution of fxData.evolutions) {
            if (evolution === 'LOD') continue;
            console.log(` - Setting evolution: ${evolution} to 1.0`);
            PVWorld.setFxEvolution('ptfx_looped_test', evolution, 1.0);
            await Delay(5_000);
            console.log(` - Setting evolution: ${evolution} to 0.0`);
            PVWorld.setFxEvolution('ptfx_looped_test', evolution, 0.0);
            await Delay(1_000);
          }
        }
        await Delay(2_000);
        await stopLoopedFx();
        await Delay(1_000);
      }
    }

    console.log('Done');
    ptfxAllActive = false;
  },
  false,
);

// ExecuteCommand('ptfx_test_all');
