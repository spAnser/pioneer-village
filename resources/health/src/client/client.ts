import { PVGame, emitUI, focusUI } from '@lib/client';

import { DrawTxt, TxtAtWorldCoord } from '@lib/client';
import { Vector3 } from '@lib/math';

import './misc/events';
import './misc/exports';
import './misc/commands';

import healthManager from './managers/health-manager';
import { AnimFlag } from '@lib/flags';
import { Delay } from '@lib/functions';

const DEBUG = false;

SetAiMeleeWeaponDamageModifier(0.001);
SetAiWeaponDamageModifier(0.001);

const boneNames: string[] = [
  'SKEL_HEAD',
  'SKEL_NECK1',
  'SKEL_L_CLAVICLE',
  'SKEL_R_CLAVICLE',
  'SKEL_L_UPPERARM',
  'SKEL_SPINE4',
  'SKEL_R_UPPERARM',
  'SKEL_L_FOREARM',
  'SKEL_R_FOREARM',
  'SKEL_L_HAND',
  'SKEL_R_HAND',
  'SKEL_PENIS00',
  'SKEL_L_THIGH',
  'SKEL_R_THIGH',
  'SKEL_L_CALF',
  'SKEL_R_CALF',
  'SKEL_L_FOOT',
  'SKEL_R_FOOT',
];

onNet('game:character-selected', () => {
  healthManager.checkUpdatePed();
});

if (DEBUG) {
  setTick(() => {
    const playerPed = PVGame.playerPed();
    for (const boneName of boneNames) {
      const bone = healthManager.boneNames[boneName];
      if (!bone) {
        continue;
      }
      const boneCoords = Vector3.fromArray(GetWorldPositionOfEntityBone(playerPed, bone.index));
      let boneInfo = boneName.replace('SKEL_', '');
      const boneHealth = Math.floor(healthManager.boneHealth.get(bone.id) || 0);
      const boneStatus = healthManager.boneStatus.get(bone.id);
      if (!boneStatus) {
        continue;
      }
      if (boneHealth < 100) {
        boneInfo += ` ${boneHealth}`;
      } else if (!boneStatus.broken && !boneStatus.shot && !boneStatus.slash && !boneStatus.infected) {
        continue;
      }
      if (boneStatus.broken) {
        if (boneStatus.stabilized) {
          boneInfo += ` [B]`;
        } else {
          boneInfo += ` B`;
        }
      }
      if (boneStatus.shot) {
        if (boneStatus.bandaged) {
          boneInfo += ` [S]`;
        } else {
          boneInfo += ` S`;
        }
      }
      if (boneStatus.slash) {
        if (boneStatus.bandaged) {
          boneInfo += ` [W]`;
        } else {
          boneInfo += ` W`;
        }
      }
      if (boneStatus.burned) {
        if (boneStatus.bandaged) {
          boneInfo += ` [F]`;
        } else {
          boneInfo += ` F`;
        }
      }
      if (boneStatus.infected) {
        if (healthManager.infectionStabilized) {
          boneInfo += ` [I]`;
        } else {
          boneInfo += ` I`;
        }
        boneInfo += ` ${Math.round(boneStatus.infection)}`;
      }
      TxtAtWorldCoord(boneCoords.x, boneCoords.y, boneCoords.z, boneInfo, 0.2);
    }

    if (healthManager.litersOfBlood < 5) {
      DrawTxt(`Blood: ${Math.round(healthManager.litersOfBlood * 100) / 100}L`, 0.15, 0.625, 0.25);
    }
    if (healthManager.health < 100) {
      DrawTxt(`Health: ${Math.ceil(healthManager.health)}%`, 0.15, 0.65, 0.25);
    }

    DrawTxt(`Stamina: ${Math.ceil(healthManager.stamina)}%`, 0.15, 0.675, 0.25);
    DrawTxt(`Speed: ${Math.ceil(GetEntitySpeed(playerPed) * 100) / 100}`, 0.15, 0.7, 0.25);
    DrawTxt(`CurMBR: ${Math.ceil(GetPedDesiredMoveBlendRatio(playerPed) * 100) / 100}`, 0.15, 0.725, 0.25);
    DrawTxt(`DesMBR: ${healthManager.desiredMaxBlendRatio}`, 0.15, 0.75, 0.25);
    DrawTxt(`Temperature: ${Math.ceil(healthManager.internalTemperature)}C`, 0.15, 0.775, 0.25);
  });
}

RegisterCommand(
  'melee',
  async () => {
    const coord = PVGame.playerCoords();
    const meleePed = await PVGame.createPed('A_M_M_ARMTOWNFOLK_01', coord.x, coord.y, coord.z, 0, true, true);

    TaskCombatPed(meleePed, PVGame.playerPed(), 0, 0);
  },
  false,
);

// AddEventHandler('doctor:client:use_bandage', (identifier: string, n: number, id: number) => {
//   const usedItem = Items[identifier];
//   const itemWasUsed = healthManager.bandageBone(usedItem.infectionChance);
//   if (itemWasUsed) {
//     // TODO: removeItem
//   }
// });
//
// AddEventHandler('doctor:client:use_splint', (identifier: string, n: number, id: number) => {
//   const itemWasUsed = healthManager.splintBone();
//   if (itemWasUsed) {
//     // TODO: removeItem
//   }
// });
//
// AddEventHandler('doctor:client:use_pharma', (identifier: string, n: number, id: number) => {
//   const usedItem = Items[identifier];
//   let itemWasUsed = false;
//   if (usedItem.identifier === 'OXY') {
//     itemWasUsed = healthManager.popOxy();
//   }
//   if (itemWasUsed) {
//     // TODO: removeItem
//   }
// });

RegisterCommand(
  'heal',
  async () => {
    healthManager.resetHealth();
  },
  false,
);

RegisterCommand(
  'eatDrink',
  async () => {
    healthManager.food = 100;
    healthManager.water = 100;
  },
  false,
);

RegisterCommand(
  'damageBone',
  async (source: number, args: any[], rawCommand: string) => {
    healthManager.damageBoneByName(args[0], args[1]);
  },
  false,
);

RegisterCommand(
  'shootBone',
  async (source: number, args: any[], rawCommand: string) => {
    healthManager.damageBoneByName(args[0], 5);
    for (let n = Number(args[1] ?? 1); n--; ) {
      healthManager.shootBoneByName(args[0]);
    }
  },
  false,
);

RegisterCommand(
  'bloodLoss',
  async (source: number, args: any[], rawCommand: string) => {
    healthManager.litersOfBlood -= Number(args[0]);
  },
  false,
);

RegisterCommand(
  'bed',
  async (source: number, args: any[], rawCommand: string) => {
    // const playerPed = PlayerPedId();
    const playerPed = 643074;

    FreezeEntityPosition(playerPed, true);
    SetEntityCollision(playerPed, false, false);
    SetEntityCoords(playerPed, -286.2163391113281, 816.0573120117188, 119.1258642578125, 0.0, 0.0, 0.0, false);
    SetEntityHeading(playerPed, 98.1);

    PVGame.taskPlayAnim({
      entity: playerPed,
      dict: 'amb_rest@prop_human_sleep_bed@pillow@male_b@idle_a',
      anim: 'idle_a',
      flags: AnimFlag.STOP_LAST_FRAME,
      blendInSpeed: 8,
      blendOutSpeed: -8,
    });

    await Delay(150);
    SetEntityCollision(playerPed, true, true);
    // FreezeEntityPosition(playerPed, false);

    TaskKnockedOut(playerPed, 30.0, true);
  },
  false,
);

RegisterCommand(
  'inspect',
  async (source: number, args: any[], rawCommand: string) => {
    // const playerPed = 643074;
    const playerPed = PlayerPedId();

    const bones = [
      'SKEL_HEAD',
      'SKEL_L_CALF',
      'SKEL_L_CLAVICLE',
      'SKEL_L_FOOT',
      'SKEL_L_FOREARM',
      'SKEL_L_HAND',
      'SKEL_L_THIGH',
      'SKEL_L_UPPERARM',
      'SKEL_NECK1',
      'SKEL_PENIS00',
      'SKEL_R_CALF',
      'SKEL_R_CLAVICLE',
      'SKEL_R_FOOT',
      'SKEL_R_FOREARM',
      'SKEL_R_HAND',
      'SKEL_R_THIGH',
      'SKEL_R_UPPERARM',
      'SKEL_SPINE4',
    ];

    const uiBones: UI.Doctor.BoneStatus[] = [];

    for (const boneName of bones) {
      const bone = healthManager.boneNames[boneName];
      if (!bone) {
        continue;
      }
      const coords = GetPedBoneCoords(playerPed, bone.id, 0.0, 0.0, 0.0);
      const screenCoords = GetScreenCoordFromWorldCoord(coords[0], coords[1], coords[2]);

      if (screenCoords[0]) {
        const boneStatus = healthManager.boneStatus.get(bone.id);
        if (!boneStatus) {
          continue;
        }
        uiBones.push({
          coords: { x: screenCoords[1] * 100, y: screenCoords[2] * 100 },
          name: boneName
            .replace(/(SKEL_|[0-9])/g, '')
            .replace('L_', 'Left ')
            .replace('R_', 'Right ')
            .toLowerCase(),
          health: healthManager.boneHealth.get(bone.id) ?? 100,
          broken: boneStatus.broken,
          wound: boneStatus.slash,
          burned: boneStatus.burned,
          infection: boneStatus.infection,
        });
      }
    }

    emitUI('doctor.state', { show: true, entity: playerPed, boneStatus: uiBones });
    focusUI(true, true);
  },
  false,
);

RegisterCommand(
  'chair_doctor',
  async (source: number, args: any[], rawCommand: string) => {
    // const playerPed = PlayerPedId();
    const playerPed = 643074;
    const x = 2732.02978515625;
    const y = -1230.1536865234375;
    const z = 49.3677978515625;

    SetEntityCoords(playerPed, x, y, z, 0.0, 0.0, 0.0, false);
    SetEntityHeading(playerPed, 95.116);

    PVGame.taskPlayAnim({
      entity: playerPed,
      dict: 'script_re@murder_for_hire@doctor_office',
      anim: ['passout_fail_loop_vic', 'passout_success_loop_vic'],
      flags: AnimFlag.REPEAT,
      blendInSpeed: 1,
      blendOutSpeed: -1,
    });
  },
  false,
);

/*
 * TODO: Move to a different resource
 */
// setInterval(() => {
//   const activePlayers = GetActivePlayers();
//   console.log(activePlayers);
//
//   for (const player of activePlayers) {
//     const playerPed = GetPlayerPedScriptIndex(player);
//     SetPedPromptName(playerPed, `${GetPlayerServerId(player)}`);
//   }
// }, 5000);

/*

P_TABLE31X


amb_rest@prop_human_sleep_bed@pillow@female_a
amb_rest@prop_human_sleep_bed@pillow@male_b
amb_rest@prop_human_sleep_bed_high@pillow@male_b


script_story@mob1@ig@ig20_arthur_fall_p1


{
    dict: 'script_respawn@one_shot@hybrid@near_water@unarmed@crouch_stream_drink@a',
    anim: 'respawn_action',
    blendInSpeed: 1,
    blendOutSpeed: -1,
}



 */
