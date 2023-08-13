import { emitUI, focusUI, onUI, PVGame } from '@lib/client';

import './stuff/apple';
import './stuff/gold-panning';
import './stuff/instruments';
import './stuff/police';

import { AnimFlag } from '@lib/flags';

RegisterCommand(
  'anim_menu',
  () => {
    emitUI('animations.state', { show: true });
    focusUI(true, true);
  },
  false,
);

onUI('animations.play-anim', (data) => {
  let isPed = true;
  if (data.entity !== 0) {
    isPed = IsEntityAPed(data.entity);
  }
  if (isPed) {
    if (data.dict.startsWith('0x')) {
      const number = Number(data.dict);
      if (!isNaN(number)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data.dict = number;
      }
    }

    PVGame.taskPlayAnimArrayNew({
      dict: data.dict,
      anim: data.clip,
      flags: data.flags,
      blendInSpeed: data.blendInSpeed,
      blendOutSpeed: data.blendOutSpeed,
      entity: data.entity !== 0 ? data.entity : undefined,
    });
  } else {
    PVGame.taskPlayEntityAnim([
      {
        dict: data.dict,
        anim: data.clip,
        flags: data.flags,
        blendInSpeed: data.blendInSpeed,
        blendOutSpeed: data.blendOutSpeed,
        obj: data.entity,
      },
    ]);
  }
});

onUI('animations.stop-anim', (data) => {
  ClearPedTasks(data.entity || PVGame.playerPed(), false, false);
});

RegisterCommand(
  'washhands',
  () => {
    const playerPed = PVGame.playerPed();
    if (IsEntityInWater(playerPed) && !IsPedSwimming(playerPed)) {
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
        },
        {
          dict: 'amb_misc@world_human_wash_kneel_river@male_b@idle_c',
          anim: 'idle_g',
        },
      ]);
    }
  },
  false,
);
