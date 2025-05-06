import { Delay } from '@lib/functions';
import { PVBase, PVGame } from '@lib/client';
import { Vector3 } from '@lib/math';

export const doorOpenAnim: Anim.Task = {
  dict: 'script_common@jail_cell@unlock@key',
  anim: 'action_mp_female',
  duration: 2000,
  async onStart() {
    await Delay(850);
    const key = await PVGame.createObject(GetHashKey('P_KEY02X'));
    PVGame.attachEntityToBoneName(
      key,
      'IK_R_HAND',
      PVGame.playerPed(),
      new Vector3(0.15, 0.05, -0.05),
      new Vector3(0, -90, 90),
    );

    await Delay(2000);
    PVBase.deleteEntity(key);

    await PVGame.loadModel('p_jaildoor01x', 10);
  },
};
