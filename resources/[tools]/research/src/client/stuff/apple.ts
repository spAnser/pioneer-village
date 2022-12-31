import { Delay } from '@lib/functions';
import { PVBase, PVGame } from '@lib/client';
import { AnimFlag } from '@lib/flags';
import { Vector3 } from '@lib/math';

RegisterCommand(
  'eat',
  async (src: number, args: any[]) => {
    const playerPed = PlayerPedId();
    let apple = 0;

    ClearPedTasks(playerPed);
    await Delay(125);
    await PVGame.taskPlayAnimArrayNew([
      {
        dict: 'amb_misc@world_human_eat_apple@male_a@enter',
        anim: 'enter',
        flags: AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
        async onStart() {
          await Delay(1000);
          // P_APPLE01X
          // P_ONIONRED01X
          // P_ONIONWHITE_01X
          // P_BREAD06X
          // S_HORSNACK_BEET01X
          apple = await PVGame.createObject(
            GetHashKey(args[0] ?? 'P_APPLE01X'),
            new Vector3(0, 0, 0),
            new Vector3(0, 0, 0),
          );
          PVGame.attachEntityToBoneName(apple, 'PH_R_HAND');
        },
      },
      {
        dict: 'amb_misc@world_human_eat_apple@male_a@idle_a',
        anim: ['idle_a', 'idle_c'],
        flags: AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
        blendInSpeed: 8,
      },
      {
        dict: 'amb_misc@world_human_eat_apple@male_a@idle_b',
        anim: ['idle_d', 'idle_d', 'idle_d', 'idle_d', 'idle_e', 'idle_f', 'idle_f'],
        flags: AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
        repeat: 4,
        blendInSpeed: 8,
      },
      {
        dict: 'amb_misc@world_human_eat_apple@male_a@exit',
        anim: 'exit',
        flags: AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
        blendInSpeed: 8,
        async onStart() {
          await Delay(650);
          DetachEntity(apple, true, true);
        },
      },
    ]);
    await Delay(5000);
    PVBase.deleteEntity(apple);
  },
  false,
);

RegisterCommand(
  'pick_apple',
  () => {
    PVGame.taskPlayAnimArrayNew([
      {
        dict: 'mech_pickup@plant@orchid_tree',
        anim: 'enter_lf',
        flags: AnimFlag.STOP_LAST_FRAME,
      },
      {
        dict: 'mech_pickup@plant@orchid_tree',
        anim: 'base',
      },
    ]);
  },
  false,
);
