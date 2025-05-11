import { AnimFlag } from '@lib/flags';
import { PVGame } from '@lib/client';
import { Vector3 } from '@lib/math';
import { Log } from '@lib/client/comms/ui';

// veh_horseback@seat_saddle@female@normal@additive@idle
// veh_horseback@seat_saddle@female@normal@idle
// veh_horseback@seat_saddle@female@normal@idle@slope@down
// veh_horseback@seat_saddle@female@normal@idle@slope@up
// veh_horseback@seat_saddle@female@normal@trot_fast@2h
// veh_horseback@seat_saddle@female@normal@trot_fast@2h@slope@down
// veh_horseback@seat_saddle@female@normal@trot_fast@2h@slope@up
// veh_horseback@seat_saddle@female@normal@trot_slow@2h
// veh_horseback@seat_saddle@female@normal@trot_slow@2h@slope@down
// veh_horseback@seat_saddle@female@normal@trot_slow@2h@slope@up
// veh_horseback@seat_saddle@female@normal@trot@2h
// veh_horseback@seat_saddle@female@normal@trot@2h@drift
// veh_horseback@seat_saddle@female@normal@trot@2h@piaffe
// veh_horseback@seat_saddle@female@normal@trot@2h@piaffe@slope@down
// veh_horseback@seat_saddle@female@normal@trot@2h@piaffe@slope@up
// veh_horseback@seat_saddle@female@normal@trot@2h@slope@down
// veh_horseback@seat_saddle@female@normal@trot@2h@slope@up
// veh_horseback@seat_saddle@female@normal@walk_slow@2h
// veh_horseback@seat_saddle@female@normal@walk_slow@2h@slope@down
// veh_horseback@seat_saddle@female@normal@walk_slow@2h@slope@up
// veh_horseback@seat_saddle@female@normal@walk@2h
// veh_horseback@seat_saddle@female@normal@walk@2h@drift
// veh_horseback@seat_saddle@female@normal@walk@2h@piaffe
// veh_horseback@seat_saddle@female@normal@walk@2h@piaffe@slope@down
// veh_horseback@seat_saddle@female@normal@walk@2h@piaffe@slope@up
// veh_horseback@seat_saddle@female@normal@walk@2h@slope@down
// veh_horseback@seat_saddle@female@normal@walk@2h@slope@up

// veh_horseback@seat_saddle@female@normal@trot_fast@2h@slope@down/move.clip
// veh_horseback@seat_saddle@female@normal@trot_fast@2h@slope@up/move.clip
// veh_horseback@seat_saddle@female@normal@trot_fast@2h/move_-135.clip
// veh_horseback@seat_saddle@female@normal@trot_fast@2h/move_135.clip
// veh_horseback@seat_saddle@female@normal@trot_fast@2h/move.clip
// veh_horseback@seat_saddle@female@normal@trot_fast@2h/turn_l2.clip
// veh_horseback@seat_saddle@female@normal@trot_fast@2h/turn_r2.clip
// veh_horseback@seat_saddle@female@normal@trot_slow@2h@slope@down/move.clip
// veh_horseback@seat_saddle@female@normal@trot_slow@2h@slope@up/move.clip
// veh_horseback@seat_saddle@female@normal@trot_slow@2h/move_-135.clip
// veh_horseback@seat_saddle@female@normal@trot_slow@2h/move_135.clip
// veh_horseback@seat_saddle@female@normal@trot_slow@2h/move.clip
// veh_horseback@seat_saddle@female@normal@trot_slow@2h/turn_l2.clip
// veh_horseback@seat_saddle@female@normal@trot_slow@2h/turn_r2.clip
// veh_horseback@seat_saddle@female@normal@trot@2h@drift/move_fwd_-45.clip
// veh_horseback@seat_saddle@female@normal@trot@2h@drift/move_fwd_-90.clip
// veh_horseback@seat_saddle@female@normal@trot@2h@drift/move_fwd_45.clip
// veh_horseback@seat_saddle@female@normal@trot@2h@drift/move_fwd_90.clip
// veh_horseback@seat_saddle@female@normal@trot@2h@drift/turn_l2_fwd_-45.clip
// veh_horseback@seat_saddle@female@normal@trot@2h@drift/turn_l2_fwd_-90.clip
// veh_horseback@seat_saddle@female@normal@trot@2h@drift/turn_l2_fwd_45.clip
// veh_horseback@seat_saddle@female@normal@trot@2h@drift/turn_l2_fwd_90.clip
// veh_horseback@seat_saddle@female@normal@trot@2h@drift/turn_r2_fwd_-45.clip
// veh_horseback@seat_saddle@female@normal@trot@2h@drift/turn_r2_fwd_-90.clip
// veh_horseback@seat_saddle@female@normal@trot@2h@drift/turn_r2_fwd_45.clip
// veh_horseback@seat_saddle@female@normal@trot@2h@drift/turn_r2_fwd_90.clip
// veh_horseback@seat_saddle@female@normal@trot@2h@piaffe@slope@down/move.clip
// veh_horseback@seat_saddle@female@normal@trot@2h@piaffe@slope@up/move.clip
// veh_horseback@seat_saddle@female@normal@trot@2h@piaffe/move_-135.clip
// veh_horseback@seat_saddle@female@normal@trot@2h@piaffe/move_135.clip
// veh_horseback@seat_saddle@female@normal@trot@2h@piaffe/move.clip
// veh_horseback@seat_saddle@female@normal@trot@2h@piaffe/turn_l2.clip
// veh_horseback@seat_saddle@female@normal@trot@2h@piaffe/turn_r2.clip
// veh_horseback@seat_saddle@female@normal@trot@2h@slope@down/move.clip
// veh_horseback@seat_saddle@female@normal@trot@2h@slope@up/move.clip
// veh_horseback@seat_saddle@female@normal@trot@2h/move_-135.clip
// veh_horseback@seat_saddle@female@normal@trot@2h/move_135.clip
// veh_horseback@seat_saddle@female@normal@trot@2h/move.clip
// veh_horseback@seat_saddle@female@normal@trot@2h/turn_l2.clip
// veh_horseback@seat_saddle@female@normal@trot@2h/turn_r2.clip
// veh_horseback@seat_saddle@female@normal@walk_slow@2h@slope@down/move.clip
// veh_horseback@seat_saddle@female@normal@walk_slow@2h@slope@up/move.clip
// veh_horseback@seat_saddle@female@normal@walk_slow@2h/move.clip
// veh_horseback@seat_saddle@female@normal@walk_slow@2h/turn_l2.clip
// veh_horseback@seat_saddle@female@normal@walk_slow@2h/turn_r2.clip
// veh_horseback@seat_saddle@female@normal@walk@2h@drift/move_fwd_-45.clip
// veh_horseback@seat_saddle@female@normal@walk@2h@drift/move_fwd_-90.clip
// veh_horseback@seat_saddle@female@normal@walk@2h@drift/move_fwd_45.clip
// veh_horseback@seat_saddle@female@normal@walk@2h@drift/move_fwd_90.clip
// veh_horseback@seat_saddle@female@normal@walk@2h@drift/turn_l2_fwd_-45.clip
// veh_horseback@seat_saddle@female@normal@walk@2h@drift/turn_l2_fwd_-90.clip
// veh_horseback@seat_saddle@female@normal@walk@2h@drift/turn_l2_fwd_45.clip
// veh_horseback@seat_saddle@female@normal@walk@2h@drift/turn_l2_fwd_90.clip
// veh_horseback@seat_saddle@female@normal@walk@2h@drift/turn_r2_fwd_-45.clip
// veh_horseback@seat_saddle@female@normal@walk@2h@drift/turn_r2_fwd_-90.clip
// veh_horseback@seat_saddle@female@normal@walk@2h@drift/turn_r2_fwd_45.clip
// veh_horseback@seat_saddle@female@normal@walk@2h@drift/turn_r2_fwd_90.clip
// veh_horseback@seat_saddle@female@normal@walk@2h@piaffe@slope@down/move.clip
// veh_horseback@seat_saddle@female@normal@walk@2h@piaffe@slope@up/move.clip
// veh_horseback@seat_saddle@female@normal@walk@2h@piaffe/move.clip
// veh_horseback@seat_saddle@female@normal@walk@2h@piaffe/turn_l2.clip
// veh_horseback@seat_saddle@female@normal@walk@2h@piaffe/turn_r2.clip
// veh_horseback@seat_saddle@female@normal@walk@2h@slope@down/move.clip
// veh_horseback@seat_saddle@female@normal@walk@2h@slope@up/move.clip
// veh_horseback@seat_saddle@female@normal@walk@2h/move.clip
// veh_horseback@seat_saddle@female@normal@walk@2h/turn_l2.clip
// veh_horseback@seat_saddle@female@normal@walk@2h/turn_r2.clip

const sideSaddle: 'left' | 'right' | false = 'right';

// const animDict = 'veh_horseback@seat_rear@female@%side%@normal@%speed%';
const animDict = 'veh_horseback@seat_saddle@female@normal@%speed%';

let lastDict = '';
let lastAnim = '';

const flags = AnimFlag.REPEAT + AnimFlag.ENABLE_PLAYER_CONTROL + AnimFlag.CANCELABLE;

setInterval(async () => {
  if (!sideSaddle) {
    return;
  }

  if (GetMount(PlayerPedId())) {
    const speed = Vector3.fromArray(GetEntitySpeedVector(GetMount(PlayerPedId()), true));

    // Log('speed', speed);

    let animSpeed = 'idle';
    let anim = 'idle';

    if (speed.y > 6) {
      animSpeed = 'trot_fast@2h';
      anim = 'move';
    } else if (speed.y > 4) {
      animSpeed = 'trot@2h';
      anim = 'move';
    } else if (speed.y > 2) {
      animSpeed = 'trot_slow@2h';
      anim = 'move';
    } else if (speed.y > 1) {
      animSpeed = 'walk@2h';
      anim = 'move';
    }

    if (anim === 'move') {
      if (speed.x > 0.15) {
        anim = 'turn_l2';
      } else if (speed.x < -0.15) {
        anim = 'turn_r2';
      }
    }

    const dict = animDict.replace('%side%', sideSaddle).replace('%speed%', animSpeed);

    // if (lastDict === dict && lastAnim === anim) {
    if (IsEntityPlayingAnim(PlayerPedId(), dict, anim, flags)) {
      return;
    }

    Log(dict, anim);

    lastDict = dict;
    lastAnim = anim;

    // PVGame.taskPlayAnim({
    //   dict,
    //   anim,
    //   flags,
    // });
    //
    // await Delay(10);

    PVGame.taskPlayAnim({
      dict,
      anim,
      flags,
    });
  } else if (lastDict || lastAnim) {
    Log('stop anim', lastDict, lastAnim);
    StopAnimTask(PlayerPedId(), lastDict, lastAnim, 1);
    lastDict = '';
    lastAnim = '';
  }
}, 1000);
