import { PVGame, awaitServer, emitUI, onResourceInit } from '@lib/client';

import { DrawTxt, TxtAtWorldCoord } from '@lib/client';
import { Vector3 } from '@lib/math';

import './misc/events';
import './misc/exports';
import './misc/commands';

import healthManager from './managers/health-manager';
import { emitSocket, Log } from '@lib/client/comms/ui';

const DEBUG = false;
let characterSelected = false;

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

// Log('getWarmthTarget(-10)', healthManager.getWarmthTarget(-10));
// Log('getWarmthTarget(0)', healthManager.getWarmthTarget(0));
// Log('getWarmthTarget(15)', healthManager.getWarmthTarget(15));
// Log('getWarmthTarget(38)', healthManager.getWarmthTarget(38));

const handleCharacterSelected = async (charId: number) => {
  healthManager.checkUpdatePed();
  characterSelected = true;

  const { food, drink } = await awaitServer('health.getFoodAndDrink', charId);
  healthManager.food = food;
  healthManager.water = drink;
  emitUI('hud.state', { food, drink });

  const healthMetadata = await awaitServer('health.getHealthMetadata', charId);
  // Log('healthMetadata', healthMetadata);
  healthManager.health = healthMetadata.health;
  healthManager.stamina = healthMetadata.stamina;
  healthManager.litersOfBlood = healthMetadata.litersOfBlood;
  if (healthMetadata.boneStatus.length !== 0) {
    healthManager.boneStatus = new Map(healthMetadata.boneStatus);
  }
  if (healthMetadata.boneHealth.length !== 0) {
    healthManager.boneHealth = new Map(healthMetadata.boneHealth);
  }
  healthManager.sick = healthMetadata.sick;
  healthManager.activeTonic = healthMetadata.activeTonic;

  for (const [boneId, boneStatus] of healthManager.boneStatus) {
    if (boneStatus.broken) {
      healthManager.hasBrokenBone = true;
    }
    if ((boneStatus.shot > 0 || boneStatus.slash > 0) && !boneStatus.bandaged) {
      healthManager.isBleeding = true;
    }
  }
};

if (PVGame.getCurrentCharacter()) {
  const charId = PVGame.getCurrentCharacter().id;
  handleCharacterSelected(charId);
}

onNet('game:character-selected', handleCharacterSelected);

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

let interval: CitizenTimer;

const initHealth = async () => {
  if (interval) {
    clearInterval(interval);
  }
  // Log('[HEALTH] onResourceInit(game)');
  Log('[HEALTH] Character Selected');
  await healthManager.init();

  SetAiMeleeWeaponDamageModifier(0.001);
  SetAiWeaponDamageModifier(0.001);

  interval = setInterval(
    () => {
      if (!characterSelected && !DEBUG) return;
      emitSocket(
        'character-update.food-drink',
        parseInt(healthManager.food.toFixed(2)),
        parseInt(healthManager.water.toFixed(2)),
      );
      emitSocket(
        'character-update.health-status',
        Array.from(healthManager.boneHealth.entries()),
        Array.from(healthManager.boneStatus.entries()),
        healthManager.sick,
        healthManager.activeTonic,
        healthManager.health,
        healthManager.stamina,
        healthManager.litersOfBlood,
      );
    },
    5 * 60 * 60 * 1000,
  ); // every 5 minutes
};

onResourceInit('game', initHealth);
onNet('game:character-selected', initHealth);

/*
 * TODO: Move to a different resource
 */
// setInterval(() => {
//   const activePlayers = GetActivePlayers();
//   Log(activePlayers);
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
