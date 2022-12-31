import { PVBase, PVGame, PVKeymapper } from '@lib/client';
import { AnimFlag } from '@lib/flags';
import { Delay } from '@lib/functions';
import { Vector3 } from '@lib/math';

let isWhistling = false;

const whistle = async (): Promise<void> => {
  if (isWhistling) {
    return;
  }
  const playerPed = PlayerPedId();
  const [ret, weaponHash] = GetCurrentPedWeapon(playerPed, false, 0, false);
  SetCurrentPedWeapon(playerPed, GetHashKey('WEAPON_UNARMED'), true);
  const whistleObj = await PVGame.createObject('p_whistle01x');
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
  SetCurrentPedWeapon(playerPed, weaponHash, true);
  isWhistling = false;
};

RegisterCommand('+whistle', whistle, false);

PVKeymapper.RegisterKeyMapping('whistle', 'Police Whistle', 'keyboard', 'J');
