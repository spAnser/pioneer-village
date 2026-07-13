import { PVBase, PVCustomization, PVGame, PVWorld, emitUI, focusUI } from '@lib/client';
import { AnimFlag } from '@lib/flags';
import { Delay } from '@lib/functions';
import { lerp } from '@lib/math';

RegisterCommand(
  'attachObjectTest',
  (src: number, args: string[]) => {
    PVGame.attachEntityToBoneName(Number(args[0]), args[1]);
  },
  false,
);

RegisterCommand(
  'compare_config_flag',
  async (source: number, args: any[], rawCommand: string) => {
    // console.log({ source, args, rawCommand });

    const pedOne = Number(args[0]);
    const pedTwo = Number(args[1]);

    for (let i = 1000; i--; ) {
      const flagOne = GetPedConfigFlag(pedOne, i, true);
      const flagTwo = GetPedConfigFlag(pedTwo, i, true);

      if (flagOne !== flagTwo) {
        console.log(`Flag ${i} differs: PedOne=${flagOne}, PedTwo=${flagTwo}`);
      }
    }
  },
  false,
);

RegisterCommand(
  'anim_menu',
  () => {
    emitUI('animations.state', { show: true });
    focusUI(true, true);
  },
  false,
);

RegisterCommand(
  'washhands',
  async () => {
    const soapObject = 'P_SOAP01X';
    const playerPed = PVGame.playerPed();
    if (!IsEntityInWater(playerPed) && !IsPedSwimming(playerPed)) {
      const coords = PVGame.playerCoords();
      coords.z -= 5;
      const soap = await PVGame.createObject(soapObject, coords, { x: 0, y: 0, z: 0 }, true);
      PVGame.attachEntityToBoneName(
        soap,
        'SKEL_R_HAND',
        playerPed,
        { x: 0.075, y: 0, z: -0.035 },
        { x: 0, y: 0, z: 90 },
      );
      PVGame.taskPlayAnimArrayNew([
        {
          dict: 'amb_misc@world_human_wash_kneel_river@female_a@stand_enter',
          anim: 'enter_back',
          flags: AnimFlag.STOP_LAST_FRAME,
        },
        {
          dict: 'amb_misc@world_human_wash_kneel_river@male_b@idle_b',
          anim: 'idle_e',
          flags: AnimFlag.STOP_LAST_FRAME,
          async onStart() {
            await PVWorld.startFxOnEntityBoneByName(
              'bathing_foam_l_hand',
              true,
              'scr_mg_bathing',
              'scr_mg_bathing_foam_torso',
              PVGame.playerPed(),
              'SKEL_L_HAND',
              { x: 0, y: 0, z: 0 },
              { x: 0, y: 0, z: 0 },
              0.5,
            );
            PVWorld.setFxEvolution('bathing_foam_l_hand', 'scrub', 0.75);
            await PVWorld.startFxOnEntityBoneByName(
              'bathing_foam_r_hand',
              true,
              'scr_mg_bathing',
              'scr_mg_bathing_foam_torso',
              PVGame.playerPed(),
              'SKEL_R_HAND',
              { x: 0, y: 0, z: 0 },
              { x: 0, y: 0, z: 0 },
              0.5,
            );
            PVWorld.setFxEvolution('bathing_foam_r_hand', 'scrub', 0.75);
          },
        },
        {
          dict: 'amb_misc@world_human_wash_kneel_river@male_b@idle_c',
          anim: 'idle_g',
          onEnd() {
            PVWorld.stopFx('bathing_foam_l_hand');
            PVWorld.stopFx('bathing_foam_r_hand');
            PVBase.deleteEntity(soap);
          },
        },
      ]);
    }
  },
  false,
);

RegisterCommand(
  'finalize',
  async (source: number, args: any[], rawCommand: string) => {
    // console.log({ source, args, rawCommand });
    PVGame.finalizePedOutfit(PVGame.playerPed());
  },
  false,
);

// MASK_OFF_LEFT_HAND
// MASK_OFF_LEFT_HAND_RIFLE
// MASK_OFF_RIGHT_HAND
// BANDANA_OFF_LEFT_HAND
// BANDANA_OFF_LEFT_HAND_RIFLE
// BANDANA_OFF_RIGHT_HAND
// MASK_ON_LEFT_HAND
// MASK_ON_LEFT_HAND_RIFLE
// MASK_ON_RIGHT_HAND
// BANDANA_ON_LEFT_HAND
// BANDANA_ON_LEFT_HAND_RIFLE
// BANDANA_ON_RIGHT_HAND
// APPLY_LOTION_BOTH_HANDS
// APPLY_LOTION_LEFT_HAND
// APPLY_LOTION_LEFT_HAND_RIFLE
// APPLY_POMADE_WITH_HAT
// APPLY_POMADE_WITH_NO_HAT
//
// let bandanaState = false;
// RegisterCommand(
//   'bandana',
//   async (source: number, args: any[], rawCommand: string) => {
//     // console.log({ source, args, rawCommand });
//
//     if (bandanaState) {
//       bandanaState = false;
//       StartTaskItemInteraction(PVGame.playerPed(), 0, 'BANDANA_OFF_RIGHT_HAND', 1, 0, -1.0);
//       await Delay(750);
//       PVCustomization.setWearableState('neckwear', 'BASE');
//     } else {
//       bandanaState = true;
//       StartTaskItemInteraction(PVGame.playerPed(), 0, 'BANDANA_ON_RIGHT_HAND', 1, 0, -1.0);
//       await Delay(600);
//       PVCustomization.setWearableState('neckwear', 'MASK_UP');
//     }
//   },
//   false,
// );
//
// let sleevesState = false;
// RegisterCommand(
//   'sleeves',
//   async (source: number, args: any[], rawCommand: string) => {
//     // console.log({ source, args, rawCommand });
//
//     if (sleevesState) {
//       sleevesState = false;
//       PVCustomization.setWearableState('shirts_full', 'BASE');
//     } else {
//       sleevesState = true;
//       PVCustomization.setWearableState('shirts_full', 'OPEN_COLLAR_ROLLED_SLEEVE');
//     }
//   },
//   false,
// );

RegisterCommand(
  'wearableState',
  async (source: number, args: any[], rawCommand: string) => {
    // console.log({ source, args, rawCommand });

    if (args[0] == Number(args[0])) {
      args[0] = Number(args[0]);
    }
    if (args[1] == Number(args[1])) {
      args[1] = Number(args[1]);
    }

    PVCustomization.setWearableState(args[0], args[1] || 'BASE');
  },
  false,
);
