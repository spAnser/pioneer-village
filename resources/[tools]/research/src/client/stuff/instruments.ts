// import gameManager, { AnimTask } from '@ts-shared/client/managers/game-manager';
// import { Vector3 } from '@ts-shared/shared/classes/vector3';
// import {AnimFlag} from '@ts-shared/shared/flags';

import { Vector3 } from '@lib/math';
import { AnimFlag } from '@lib/flags';
import { PVBase, PVGame, PVHealth } from '@lib/client';
import { Delay } from '@lib/functions';
import { Log } from '@lib/client/comms/ui';

interface Song {
  streamSet: string;
  streamName: string;
}

interface InstrumentProp {
  model: string;
  attach: string;
  offset?: Vector3;
  rotation?: Vector3;
  animate?: boolean;
}

interface InstrumentAnim {
  intro: Anim.Task;
  loop: Anim.Task;
  flourish?: Anim.Task;
  outro?: Anim.Task;
  facial?: Anim.Task;
}

interface Instrument {
  props: InstrumentProp[];
  anims: Record<string, InstrumentAnim>;
  songs: Record<string, string[]>;
}

// banjo 14
// banjo_upbeat 7
// banjo_downbeat 7
// fiddle 2
// fiddle_upbeat 7
// fiddle_downbeat 5
// jawharp 6
// jawharp_upbeat 4
// jawharp_downbeat 2
// trumpet 6
// trumpet_upbeat 3
// trumpet_somber 3
// mandolin 15
// mandolin_upbeat 10
// mandolin_downbeat 5
// guitar 17
// guitar_upbeat 8
// guitar_downbeat 9
// harmonica 7
// harmonica_upbeat 3
// harmonica_downbeat 4
// concertina 10
// concertina_upbeat 4
// concertina_downbeat 6

// whistle_casual 9 no 5

// wax_cylinder 6

// abigail_piano 8
// piano 32
// piano_riverboat 3
// piano_sketchy 13
// piano_upperclass 3

const instruments: Record<string, Instrument> = {
  banjo: {
    props: [
      {
        model: 'P_BANJO01X',
        attach: 'PH_R_HAND',
      },
    ],
    anims: {
      normal_male: {
        intro: {
          dict: 'ai_gestures@instruments@banjo@seated@male@normal',
          anim: ['banjo_intro_01', 'banjo_intro_02', 'banjo_intro_03', 'banjo_downb_intro_01', 'banjo_downb_intro_02'],
        },
        loop: {
          dict: 'ai_gestures@instruments@banjo@seated@male@normal',
          anim: [
            'banjo_downb_strum_pick_-1_01',
            'banjo_spine_0_hand_+1_02',
            'banjo_downb_strum_pick_-1_02',
            'banjo_spine_0_hand_+1_03',
            'banjo_downb_strum_pick_-1_0_08',
            'banjo_downb_strum_pick_-1_0_+1_01',
            'banjo_downb_strum_pick_-1_0_+1_02',
            'banjo_spine_+1_hand_0_01',
            'banjo_spine_0_hand_+1_04',
            'banjo_spine_0_hand_+1_05',
            'banjo_spine_+1_hand_-1_01',
            'banjo_downb_strum_pick_-1_0_+1_03',
            'banjo_spine_+1_hand_+1_01',
            'banjo_spine_0_hand_+1_06',
            'banjo_spine_0_hand_-1_01',
            'banjo_spine_0_hand_-1_02',
            'banjo_downb_strum_pick_-1_0_+1_04',
            'banjo_downb_strum_pick_-1_0_04',
            'banjo_spine_0_hand_0_01',
            'banjo_spine_0_hand_0_02',
            'banjo_downb_strum_pick_-1_0_+1_05',
            'banjo_downb_strum_pick_-1_0_10',
            'banjo_spine_0_hand_0_03',
            'banjo_downb_strum_pick_-1_0_09',
            'banjo_spine_0_hand_0_04',
            'banjo_downb_strum_pick_-1_0_06',
            'banjo_downb_strum_pick_-1_0_03',
            'banjo_downb_strum_-1_01',
            'banjo_spine_+1_hand_0_02',
            'banjo_spine_0_hand_0_05',
            'banjo_spine_0_hand_0_06',
            'banjo_spine_-1_hand_+1_01',
            'banjo_spine_0_hand_0_07',
            'banjo_downb_strum_-1_02',
            'banjo_spine_-1_hand_+1_02',
            'banjo_downb_strum_-1_03',
            'banjo_downb_strum_-1_07',
            'banjo_spine_-1_hand_+1_03',
            'banjo_downb_strum_-1_0_01',
            'banjo_downb_strum_pick_-1_0_07',
            'banjo_spine_-1_hand_0_01',
            'banjo_downb_strum_-1_0_04',
            'banjo_downb_strum_-1_0_05',
            'banjo_spine_0_hand_+1_01',
            'banjo_downb_strum_pick_-1_+1_01',
          ],
        },
        flourish: {
          dict: 'ai_gestures@instruments@banjo@seated@male@normal',
          anim: ['flourish_a', 'flourish_b', 'flourish_c'],
        },
      },
      // drunk_male: {
      //     intro: {
      //         dict: 'ai_gestures@instruments@banjo@seated@male@drunk',
      //     },
      //     loop: {
      //         dict: 'ai_gestures@instruments@banjo@seated@male@drunk',
      //     },
      //     flourish: {
      //         dict: 'ai_gestures@instruments@banjo@seated@male@drunk',
      //     },
      // },
      // normal_female: {},
      // drunk_female: {},
    },
    songs: {
      inworld_music_banjo: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'],
      inworld_music_banjo_upbeat: ['1', '2', '3', '4', '5', '6', '7'],
      inworld_music_banjo_downbeat: ['1', '2', '3', '4', '5', '6', '7'],
    },
  },
  concertina: {
    props: [
      {
        model: 'P_CS_CONCERTINA01X',
        attach: 'PH_L_HAND',
        animate: true,
      },
    ],
    anims: {
      '80bpm': {
        intro: {
          dict: 'ai_gestures@instruments@concertina@seated@120bpm',
          anim: ['intro_01', 'intro_02'],
        },
        loop: {
          dict: 'ai_gestures@instruments@concertina@seated@80bpm',
          anim: [
            'down_longs_fast_01',
            'down_longs_med_01',
            'down_longs_med_02',
            'down_longs_med_03',
            'down_longs_slow_01',
            'down_longs_slow_02',
            'down_longs_slow_03',
            'down_longs_slow_04',
            'down_longs_slow_05',
            'down_short_short_fast_01',
            'down_shorts_fast_long_med_01',
            'down_shorts_fast_long_med_02',
            'down_shorts_fast_long_med_03',
            'down_shorts_fast_long_slow_03',
            'down_shorts_longs_med_01',
            'down_shorts_longs_med_02',
            'down_shorts_longs_med_03',
            'down_shorts_med_02',
            'down_shorts_med_03',
            'down_shorts_med_07',
            'down_shorts_med_12',
            'down_shorts_med_13',
            'down_shorts_med_long_slow_02',
            'down_shorts_med_long_slow_03',
            'down_shorts_med_long_slow_04',
            'down_shorts_med_longs_slow_01',
            'down_shorts_slow_01',
            'down_up_longs_slow_01',
            'down_up_longs_slow_02',
            'down_up_longs_slow_03',
            'down_up_shorts_fast_01',
            'down_up_shorts_fast_02',
            'down_up_shorts_fast_03',
            'down_up_shorts_fast_05',
            'down_up_shorts_fast_06',
            'down_up_shorts_fast_08',
            'down_up_shorts_fast_13',
            'down_up_shorts_fast_long_med_01',
            'down_up_shorts_longs_fast_01',
            'down_up_shorts_veryshorts_fast_01',
            'down_up_shorts_veryshorts_fast_02',
            'down_up_squeeze_01',
            'down_verylongs_slow_01',
            'down_verylongs_slow_02',
            'down_verylongs_veryslow_01',
            'down_verylongs_veryslow_02',
            'down_verylongs_veryslow_03',
            'down_veryshorts_med_01',
          ],
        },
      },
      '120bpm': {
        intro: {
          dict: 'ai_gestures@instruments@concertina@seated@120bpm',
          anim: ['intro_01', 'intro_02'],
        },
        loop: {
          dict: 'ai_gestures@instruments@concertina@seated@120bpm',
          anim: [
            'longs_med_01',
            'longs_slow_01',
            'longs_slow_02',
            'longs_slow_03',
            'shorts_fast_01',
            'shorts_longs_med_01',
            'shorts_longs_med_02',
            'shorts_longs_med_03',
            'shorts_longs_med_06',
            'shorts_med_01',
            'shorts_med_02',
            'shorts_med_03',
            'shorts_med_04',
            'shorts_med_05',
            'shorts_med_06',
            'shorts_med_longs_slow_01',
            'shorts_med_longs_slow_02',
            'shorts_shorts_longs_slow_02',
            'shorts_shorts_med_01',
            'shorts_shorts_med_02',
            'shorts_shorts_med_03',
            'shorts_shorts_med_04',
            'shorts_slow_01',
            'veryup_shorts_fast_01',
            'veryup_shorts_fast_02',
            'veryup_shorts_fast_04',
            'veryup_shorts_fast_06',
            'veryup_shorts_fast_07',
            'veryup_shorts_med_04',
            'veryup_shorts_shorts_01',
            'veryup_shorts_shorts_02',
          ],
        },
      },
    },
    songs: {
      inworld_music_concertina: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      inworld_music_concertina_upbeat: ['1', '2', '3', '4'],
      inworld_music_concertina_downbeat: ['1', '2', '3', '4', '5', '6'],
    },
  },
  fiddle: {
    props: [
      {
        model: 'P_FIDDLE01X',
        attach: 'PH_L_HAND',
        offset: new Vector3(0.0, -0.04, 0),
      },
      {
        model: 'P_BOW01X',
        attach: 'PH_R_HAND',
      },
    ],
    anims: {
      normal_male: {
        intro: {
          dict: 'ai_gestures@instruments@fiddle@standing@male@normal',
          anim: [
            'fiddle_low_intro_01',
            'fiddle_med_intro_02',
            'fiddle_med_intro_01',
            'fiddle_up_intro_01',
            'fiddle_up_intro_02',
            'fiddle_low_intro_02',
          ],
        },
        loop: {
          dict: 'ai_gestures@instruments@fiddle@standing@male@normal',
          anim: [
            'fiddle_low_long_-1_01',
            'fiddle_low_long_-1_02',
            'fiddle_low_long_shorts_-1_01',
            'fiddle_low_long_shorts_-1_02',
            'fiddle_low_shorts_-1_01',
            'fiddle_low_shorts_-1_02',
            'fiddle_low_shorts_veryshorts_-1_01',
            'fiddle_low_shorts_veryshorts_-1_02',
            'fiddle_low_shorts_veryshorts_-1_03',
            'fiddle_low_strokes_-1_01',
            'fiddle_low_verylong_-1_01',
            'fiddle_low_verylong_long_-1_01',
            'fiddle_low_verylong_long_-1_02',
            'fiddle_low_verylong_long_-1_0_01',
            'fiddle_med_long_-1_01',
            'fiddle_med_long_-1_02',
            'fiddle_med_long_-1_0_01',
            'fiddle_med_long_shorts_-1_01',
            'fiddle_med_long_shorts_-1_02',
            'fiddle_med_long_shorts_-1_03',
            'fiddle_med_long_shorts_-1_04',
            'fiddle_med_shorts_-1_0_01',
            'fiddle_med_long_shorts_-1_05',
            'fiddle_med_long_shorts_-1_06',
            'fiddle_med_long_shorts_-1_0_01',
            'fiddle_med_long_shorts_-1_0_02',
            'fiddle_med_long_shorts_-1_0_03',
            'fiddle_med_long_veryshorts_-1_01',
            'fiddle_med_shorts_-1_01',
            'fiddle_med_shorts_-1_0_02',
            'fiddle_med_shorts_veryshorts_-1_01',
            'fiddle_med_shorts_veryshorts_-1_02',
            'fiddle_med_shorts_veryshorts_-1_03',
            'fiddle_med_verylong_shorts',
            'fiddle_med_verylong_shorts_-1_01',
            'fiddle_med_veryshorts_-1_0_01',
            'fiddle_up_shorts_veryshorts_-1_01',
            'fiddle_up_shorts_veryshorts_-1_02',
            'fiddle_up_shorts_veryshorts_-1_03',
            'fiddle_up_shorts_veryshorts_-1_04',
            'fiddle_up_shorts_veryshorts_-1_0_01',
            'fiddle_up_shorts_veryshorts_-1_0_02',
            'fiddle_up_veryshorts_-1_01',
            'fiddle_up_veryshorts_-1_0_01',
            'fiddle_up_veryshorts_-1_0_02',
            'fiddle_up_veryshorts_-1_0_03',
            'fiddle_up_veryshorts_-1_0_04',
            'fiddle_up_veryshorts_-1_0_05',
            'fiddle_up_veryshorts_long_-1_01',
          ],
        },
        flourish: {
          dict: 'ai_gestures@instruments@fiddle@standing@male@normal',
          anim: ['flourish_a', 'flourish_b', 'flourish_c'],
        },
      },
    },
    songs: {
      inworld_music_fiddle: ['1', '2'],
      inworld_music_fiddle_upbeat: ['1', '2', '3', '4', '5', '6', '7'],
      inworld_music_fiddle_downbeat: ['1', '2', '3', '4', '5'],
    },
  },
  guitar: {
    props: [
      {
        model: 'P_GUITAR01X',
        attach: 'PH_R_HAND',
      },
    ],
    anims: {
      // normal_male: {},
      drunk_male: {
        intro: {
          dict: 'ai_gestures@instruments@guitar@standing@male@drunk',
          anim: ['guitar_med_intro_01', 'guitar_med_intro_02', 'guitar_up_intro_01', 'guitar_up_intro_02'],
        },
        loop: {
          dict: 'ai_gestures@instruments@guitar@standing@male@drunk',
          anim: [
            'guitar_down_strum_rt_-1_+1_01',
            'guitar_down_strum_rt_-1_+1_02',
            'guitar_med_doubstrum_-1_0_+1_01',
            'guitar_med_doubstrum_-1_0_+1_02',
            'guitar_med_doubstrum_-1_0_+1_03',
            'guitar_med_doubstrum_-1_0_01',
            'guitar_med_down_strum_-1_+1_01',
            'guitar_med_down_strum_-1_+1_02',
            'guitar_med_down_strum_lt_-1_+1_01',
            'guitar_med_down_strum_lt_-1_+1_02',
            'guitar_med_down_strum_lt_-1_0_+1_01',
            'guitar_med_long_strum_-1_0_+1_01',
            'guitar_med_long_strum_-1_0_+1_02',
            'guitar_med_long_strum_-1_0_+1_03',
            'guitar_med_long_strum_-1_0_+1_04',
            'guitar_med_long_strum_-1_0_+1_05',
            'guitar_med_long_strum_-1_01',
            'guitar_med_melody_-1_0_+1_01',
            'guitar_med_melody_-1_0_+1_02',
            'guitar_med_melody_-1_0_01',
            'guitar_med_melody_bend_-1_0_+1_01',
            'guitar_med_pick_-1_0_+1_01',
            'guitar_med_pick_-1_0_+1_02',
            'guitar_med_pick_-1_0_+1_03',
            'guitar_med_pick_-1_0_01',
            'guitar_med_pick_melody_-1_0_+1_01',
            'guitar_med_pick_melody_-1_0_+1_02',
            'guitar_med_strum_-1_0_+1_01',
            'guitar_med_strum_-1_0_+1_02',
            'guitar_med_strum_fast_lt_-1_0_+1_01',
            'guitar_med_strum_fast_lt_-1_0_+1_02',
            'guitar_med_strum_fast_lt_-1_0_+1_03',
            'guitar_med_strum_fast_lt_-1_0_+1_04',
            'guitar_med_strum_fast_lt_-1_0_+1_05',
            'guitar_med_strum_fast_lt_-1_0_+1_06',
            'guitar_med_strum_lt_-1_+1_01',
            'guitar_med_strum_lt_-1_+1_02',
            'guitar_med_strum_lt_-1_+1_03',
            'guitar_med_strum_lt_-1_+1_04',
            'guitar_med_strum_lt_-1_+1_05',
            'guitar_med_strum_lt_-1_0_+1_03',
            'guitar_med_strum_lt_-1_0_+1_04',
            'guitar_med_strum_lt_-1_0_+1_06',
            'guitar_med_strum_lt_-1_0_+1_07',
            'guitar_med_strum_lt_-1_0_+1_08',
            'guitar_med_strum_lt_-1_0_01',
            'guitar_med_strum_lt_-1_0_02',
            'guitar_med_strum_lt_-1_0_03',
            'guitar_med_strum_lt_-1_0_04',
            'guitar_med_strum_lt_-1_01',
            'guitar_med_strum_melody_lt_-1_0_+1_01',
            'guitar_med_strum_slide_lt_-1_0_+1_01',
            'guitar_med_strum_slow_bend_lt_-1_0_+1_01',
            'guitar_med_up_down_strum_lt_-1_+1_01',
            'guitar_med_up_down_strum_lt_-1_0_+1_01',
            'guitar_med_up_down_strum_lt_-1_0_+1_02',
            'guitar_med_up_down_strum_lt_-1_0_+1_03',
            'guitar_med_up_strum_lt_-1_01',
            'guitar_med_up_strum_rt_-1_0_+1_01',
            'guitar_rt_down_strum_rt_-1_0_+1_01',
            'guitar_rt_med_strum_rt_-1_01',
            'guitar_rt_strum_lt_-1_+1_01',
            'guitar_rt_up_strum_rt_-1_01',
            'guitar_slow_doubstrum_-1_+1_01',
            'guitar_slow_doubstrum_-1_0_+1_01',
            'guitar_slow_doubstrum_-1_0_+1_02',
            'guitar_slow_doubstrum_-1_0_+1_03',
            'guitar_slow_doubstrum_-1_0_+1_04',
            'guitar_slow_doubstrum_-1_0_01',
            'guitar_slow_melody_-1_0_+1_01',
            'guitar_slow_melody_-1_0_01',
            'guitar_slow_pick_-1_0_+1_01',
            'guitar_slow_pick_-1_0_+1_02',
            'guitar_slow_pick_-1_0_+1_03',
            'guitar_slow_pick_-1_0_+1_04',
            'guitar_slow_pick_-1_0_+1_05',
            'guitar_slow_pick_0_+1_01',
            'guitar_slow_pick_strum_-1_0_+1_01',
            'guitar_slow_single_strum_-1_+1_01',
            'guitar_slow_single_strum_-1_0_+1_01',
            'guitar_slow_single_strum_-1_0_+1_02',
            'guitar_slow_single_strum_-1_0_+1_03',
            'guitar_slow_single_strum_-1_0_+1_04',
            'guitar_slow_single_strum_-1_0_+1_05',
            'guitar_slow_single_strum_-1_0_01',
            'guitar_slow_strum_-1_0_+1_12',
            'guitar_slow_up_strum_-1_+1_01',
            'guitar_up_down_strum_rt_-1_+1_01',
            'guitar_up_down_strum_rt_-1_0_+1_01',
            'guitar_up_down_strum_rt_-1_0_+1_02',
            'guitar_up_down_strum_rt_-1_0_+1_03',
            'guitar_veryup_dwn_strum_lt_-1_0_+1_01',
            'guitar_veryup_dwn_strum_lt_-1_0_+1_02',
            'guitar_veryup_strum_lt_-1_+1_01',
            'guitar_veryup_strum_lt_-1_0_+1_01',
            'guitar_veryup_strum_lt_-1_0_+1_02',
            'guitar_veryup_strum_lt_-1_0_+1_03',
            'guitar_veryup_strum_lt_-1_0_+1_04',
            'guitar_veryup_strum_lt_-1_0_+1_05',
            'guitar_veryup_strum_lt_-1_0_+1_06',
            'guitar_veryup_strum_lt_-1_0_01',
            'guitar_veryup_strum_lt_-1_0_02',
            'guitar_veryup_strum_lt_-1_0_03',
            'guitar_veryup_up_strum_lt_-1_0_01',
          ],
        },
        flourish: {
          dict: 'ai_gestures@instruments@guitar@standing@male@drunk',
          anim: ['flourish_a', 'flourish_b', 'flourish_c'],
        },
      },
      // normal_female: {},
      // drunk_female: {},
    },
    songs: {
      inworld_music_guitar: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
      ],
      inworld_music_guitar_upbeat: ['1', '2', '3', '4', '5', '6', '7', '8'],
      inworld_music_guitar_downbeat: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    },
  },
  harmonica: {
    props: [
      {
        model: 'P_HARMONICA01X',
        attach: 'PH_R_HAND',
      },
    ],
    anims: {
      '80bpm': {
        intro: {
          dict: 'ai_gestures@instruments@harmonica@seated@80bpm',
          anim: ['intro_01', 'intro_02'],
        },
        loop: {
          dict: 'ai_gestures@instruments@harmonica@seated@80bpm',
          anim: [
            'back_in_play_01',
            'breath_out_01',
            'breath_out_02',
            'down_blues_spine_cen_01',
            'down_blues_spine_cen_02',
            'down_blues_spine_cen_04',
            'down_blues_spine_cen_05',
            'down_blues_spine_fwd_01',
            'down_blues_spine_fwd_modulate_01',
            'down_spine_bwd_01',
            'down_spine_bwd_02',
            'down_spine_bwd_modulate_01',
            'down_spine_cen_01',
            'down_spine_cen_02',
            'down_spine_cen_03',
            'down_spine_cen_04',
            'down_spine_cen_05',
            'down_spine_cen_06',
            'down_spine_cen_07',
            'down_spine_cen_08',
            'down_spine_cen_full_notes_01',
            'down_spine_cen_full_notes_02',
            'down_spine_cen_modulate_01',
            'down_spine_cen_modulate_03',
            'down_spine_cen_modulate_05',
            'down_spine_cen_open_notes_01',
            'down_spine_cen_open_notes_02',
            'down_spine_cen_open_notes_03',
            'down_spine_cen_open_notes_04',
            'down_spine_cen_vibrato_01',
            'down_spine_fwd_01',
            'down_spine_fwd_02',
            'down_spine_fwd_03',
            'down_spine_fwd_full_notes_01',
          ],
        },
        facial: {
          dict: 'ai_gestures@instruments@harmonica@seated@facial',
          anim: [
            'f_down',
            'f_down_exhale',
            'f_down_exhale_short',
            'f_down_inhale',
            'f_down_inhale_short',
            'f_neutral',
            'f_neutral_exhale',
            'f_neutral_exhale_short',
            'f_neutral_inhale',
            'f_neutral_inhale_short',
            'f_neutral_short',
            'f_raised',
            'f_raised_exhale',
            'f_raised_exhale_short',
            'f_raised_inhale',
            'f_raised_inhale_short',
            'f_raised_short',
          ],
        },
      },
      '120bpm': {
        intro: {
          dict: 'ai_gestures@instruments@harmonica@seated@120bpm',
          anim: ['intro_03', 'intro_04'],
        },
        loop: {
          dict: 'ai_gestures@instruments@harmonica@seated@120bpm',
          anim: [
            'spine_bwd_01',
            'spine_bwd_fast_hold_note_01',
            'spine_bwd_fast_hold_note_02',
            'spine_bwd_faster_01',
            'spine_bwd_modulate_01',
            'spine_cen_01',
            'spine_cen_02',
            'spine_cen_03',
            'spine_cen_04',
            'spine_cen_05',
            'spine_cen_06',
            'spine_cen_07',
            'spine_cen_08',
            'spine_cen_09',
            'spine_cen_fast_modulate_01',
            'spine_cen_fast_modulate_02',
            'spine_cen_fast_modulate_03',
            'spine_cen_fast_modulate_04',
            'spine_cen_fast_modulate_06',
            'spine_cen_faster_01',
            'spine_cen_faster_02',
            'spine_cen_faster_03',
            'spine_cen_faster_04',
            'spine_cen_faster_05',
            'spine_cen_faster_06',
            'spine_cen_hold_note_01',
            'spine_cen_modulate_01',
            'spine_cen_modulate_03',
            'spine_cen_modulate_04',
            'spine_cen_slowmood_01',
            'spine_cen_slowmood_02',
            'spine_cen_slowmood_03',
            'spine_fwd_faster_01',
          ],
        },
      },
    },
    songs: {
      inworld_music_harmonica: ['1', '2', '3', '4', '5', '6', '7'],
      inworld_music_harmonica_upbeat: ['1', '2', '3'],
      inworld_music_harmonica_downbeat: ['1', '2', '3', '4'],
    },
  },
  jawharp: {
    props: [
      {
        model: 'P_JAWHARP01X',
        attach: 'PH_L_HAND',
        offset: new Vector3(0.02, 0, 0),
      },
    ],
    anims: {
      '80bpm': {
        intro: {
          dict: 'ai_gestures@instruments@jawharp@seated@80bpm',
          anim: ['intro_01', 'intro_02'],
        },
        loop: {
          dict: 'ai_gestures@instruments@jawharp@seated@80bpm',
          anim: [
            'long_long_long_short_short_01',
            'long_short_short_01',
            'long_short_short_02',
            'longs_01',
            'longs_06',
            'longs_08',
            'longs_09',
            'longs_10',
            'rest_01',
            'short_short_01',
            'short_short_long_01',
            'shorts_01',
            'shorts_02',
            'shorts_03',
            'shorts_04',
            'shorts_05',
            'shorts_06',
            'shorts_07',
            'shorts_long_01',
            'shorts_longrest_01',
            'single_01',
            'single_08',
            'singles_01',
            'veryshorts_01',
          ],
        },
      },
    },
    songs: {
      inworld_music_jawharp: ['1', '2', '3', '4', '5', '6'],
      inworld_music_jawharp_upbeat: ['1', '2', '3', '4'],
      inworld_music_jawharp_downbeat: ['1', '2'],
    },
  },
  mandolin: {
    props: [
      {
        model: 'P_MANDOLIN01X',
        attach: 'PH_R_HAND',
      },
    ],
    anims: {
      '80bpm': {
        intro: {
          dict: 'ai_gestures@instruments@mandolin@seated@80bpm',
          anim: ['intro_01', 'intro_02', 'intro_04'],
        },
        loop: {
          dict: 'ai_gestures@instruments@mandolin@seated@80bpm',
          anim: [
            'down_pick_0_-1_01',
            'down_pick_0_01',
            'down_pick_0_02',
            'down_pick_0_03',
            'down_pick_0_04',
            'down_smallvibrato_pick_0_01',
            'down_smallvibrato_pick_rest_-1_0_01',
            'down_smallvibrato_pick_rest_-1_0_02',
            'down_smallvibrato_pick_rest_+1_0_01',
            'down_smallvibrato_pick_rest_0_01',
            'down_smallvibrato_pick_rest_0_03',
            'down_smallvibrato_pick_rest_0_04',
            'down_vibrato_0_01',
            'down_vibrato_0_02',
            'down_vibrato_0_03',
            'down_vibrato_0_04',
            'down_vibrato_0_05',
            'down_vibrato_0_06',
            'down_vibrato_pick_-1_0_02',
            'down_vibrato_pick_+1_0_01',
            'down_vibrato_pick_0_01',
            'down_vibrato_pick_0_03',
            'down_vibrato_pick_0_04',
            'down_vibrato_rest_0_+1_01',
            'down_vibrato_rest_0_+1_02',
            'down_vibrato_rest_0_02',
            'down_vibrato_rest_0_03',
            'down_vibrato_rest_0_05',
            'down_vibrato_rest_0_06',
            'rest_01',
          ],
        },
      },
      '120bpm': {
        intro: {
          dict: 'ai_gestures@instruments@mandolin@seated@80bpm',
          anim: ['intro_01', 'intro_02', 'intro_04'],
        },
        loop: {
          dict: 'ai_gestures@instruments@mandolin@seated@120bpm',
          anim: [
            'fast_pick_0_01',
            'fast_pick_0_02',
            'fast_pick_0_03',
            'pick_0_-1_01',
            'pick_0_+1_01',
            'pick_0_+1_02',
            'pick_0_+1_03',
            'pick_0_+1_04',
            'pick_0_+1_05',
            'pick_0_+1_06',
            'pick_0_+1_07',
            'pick_0_+1_09',
            'pick_0_+1_11',
            'pick_0_+1_14',
            'pick_0_+1_15',
            'pick_0_+1_16',
            'pick_0_+1_17',
            'pick_0_+1_19',
            'pick_0_+1_20',
            'pick_0_+1_21',
            'pick_0_05',
            'pick_0_06',
            'pick_0_08',
            'pick_0_09',
            'pick_0_10',
            'pick_0_12',
            'pick_rest_0_01',
            'pick_rest_strum_0_01',
            'pick_slide_0_+1_02',
            'pick_slide_0_+1_03',
            'pick_slow_0_01',
            'slow_pick_0_+1_01',
            'slow_pick_0_+1_02',
            'slow_strum_pick_0_01',
            'slow_strum_pick_0_02',
            'strum_0_01',
            'strum_0_02',
            'strum_0_03',
            'strum_pick_0_-1_01',
            'strum_pick_0_-1_02',
            'strum_pick_0_-1_03',
            'strum_pick_0_-1_04',
            'strum_pick_0_-1_05',
            'strum_pick_0_-1_06',
            'strum_pick_0_-1_07',
            'strum_pick_0_+1_02',
            'strum_pick_0_+1_03',
            'strum_pick_0_+1_04',
            'strum_pick_0_+1_05',
            'strum_pick_0_+1_07',
            'strum_pick_rest_0_+1_01',
          ],
        },
      },
    },
    songs: {
      inworld_music_mandolin: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
      inworld_music_mandolin_upbeat: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      inworld_music_mandolin_downbeat: ['1', '2', '3', '4', '5'],
    },
  },
  trumpet: {
    props: [
      {
        model: 'P_TRUMPET01X',
        attach: 'PH_L_HAND',
        animate: true,
      },
    ],
    anims: {
      '100bpm': {
        intro: {
          dict: 'ai_gestures@instruments@trumpet@standing@100bpm',
          anim: 'intro_01',
        },
        loop: {
          dict: 'ai_gestures@instruments@trumpet@standing@100bpm',
          anim: [
            'downbeat_cen_001',
            'downbeat_cen_002',
            'downbeat_cen_004',
            'downbeat_cen_005',
            'downbeat_cen_007',
            'downbeat_cen_left_001',
            'downbeat_cen_left_002',
            'downbeat_cen_vibrato_001',
            'downbeat_left_right_001',
            'downbeat_left_right_002',
            'downbeat_low_cen_001',
            'downbeat_low_cen_002',
            'downbeat_low_cen_003',
            'downbeat_low_cen_004',
            'downbeat_low_right_001',
            'downbeat_low_right_002',
            'downbeat_low_top_cen_001',
            'downbeat_top_cen_001',
            'downbeat_top_cen_002',
            'downbeat_top_cen_003',
            'downbeat_top_cen_004',
            'downbeat_top_cen_005',
            'downbeat_top_cen_006',
            'downbeat_top_cen_009',
            'downbeat_top_cen_right_001',
            'downbeat_top_left_001',
            'verydownbeat_cen_001',
            'verydownbeat_cen_002',
            'verydownbeat_cen_003',
            'verydownbeat_low_right_001',
          ],
        },
      },
      '140bpm': {
        intro: {
          dict: 'ai_gestures@instruments@trumpet@standing@140bpm',
          anim: 'intro_02',
        },
        loop: {
          dict: 'ai_gestures@instruments@trumpet@standing@140bpm',
          anim: [
            'upbeat_cen_001',
            'upbeat_cen_002',
            'upbeat_cen_003',
            'upbeat_cen_004',
            'upbeat_cen_005',
            'upbeat_cen_006',
            'upbeat_cen_rest_001',
            'upbeat_cen_right_001',
            'upbeat_high_cen_001',
            'upbeat_high_cen_002',
            'upbeat_high_cen_003',
            'upbeat_high_cen_004',
            'upbeat_high_cen_left_001',
            'upbeat_high_cen_left_005',
            'upbeat_high_cen_right_001',
            'upbeat_high_cen_right_002',
            'upbeat_high_cen_right_rest_001',
            'upbeat_left_right_002',
            'upbeat_low_cen_001',
            'upbeat_low_cen_002',
          ],
        },
      },
    },
    songs: {
      // TRUMPET_TWO_LITTLE_GIRLS_IN_BLUE_FAST 1
      // TRUMPET_TWO_LITTLE_GIRLS_IN_BLUE_SOMBER 4
      inworld_music_trumpet: ['1', '2', '3', '4', '5', '6'],
      inworld_music_trumpet_upbeat: ['1', '2', '3'],
      inworld_music_trumpet_somber: ['1', '2', '3'],
    },
  },
  washboard: {
    props: [
      {
        model: 'MP006_P_MNSHN_WASHBOARD01X',
        attach: 'PH_R_HAND',
      },
    ],
    anims: {
      normal_male: {
        intro: {
          dict: 'ai_gestures@instruments@washboard@seated@male@normal',
          anim: [
            'wb_low_intro_01',
            'wb_low_intro_02',
            'wb_med_intro_01',
            'wb_med_intro_02',
            'wb_up_intro_01',
            'wb_up_intro_02',
          ],
        },
        loop: {
          dict: 'ai_gestures@instruments@washboard@seated@male@normal',
          anim: [
            'wb_low_lt_singles_slide_01',
            'wb_low_rt_singles_slide_01',
            'wb_low_rt_tap_bell_lt_tap_01',
            'wb_low_rt_tap_slide_lt_tap_01',
            'wb_low_rt_tap_slide_lt_tap_02',
            'wb_low_rt_tap_slide_lt_tap_03',
            'wb_low_tap_border_lt_tap_border_01',
            'wb_low_tap_border_slide_lt_tap_border_01',
            'wb_low_tap_border_slide_lt_tap_border_02',
            'wb_low_tap_border_slide_lt_tap_border_03',
            'wb_low_tap_border_slide_lt_tap_border_04',
            'wb_low_tap_lt_tap_border_01',
            'wb_med_not_playing_pausing',
            'wb_med_rt_accent_lt_tap_01',
            'wb_med_rt_lt_altern_slide_01',
            'wb_med_rt_lt_altern_slide_02',
            'wb_med_rt_lt_single_tap_01',
            'wb_med_rt_lt_single_tap_02',
            'wb_med_rt_single_tap_lt_tap_01',
            'wb_med_rt_single_tap_slide_01',
            'wb_med_rt_slide_tap_lt_slide_tap_01',
            'wb_med_rt_slide_tap_lt_slide_tap_02',
            'wb_med_rt_slide_tap_lt_tap_01',
            'wb_med_rt_slide_tap_lt_tap_02',
            'wb_med_rt_slide_tap_lt_tap_03',
            'wb_med_rt_slide_tap_lt_tap_04',
            'wb_med_rt_slide_tap_lt_tap_05',
            'wb_med_rt_tap_bell_tamb_cymb_lt_tap_01',
            'wb_med_rt_tap_bell_tamb_cymb_lt_tap_02',
            'wb_med_rt_tap_border_bell_lt_tap_border_01',
            'wb_med_rt_tap_border_bell_lt_tap_border_02',
            'wb_med_rt_tap_border_cymb_lt_tap_border_01',
            'wb_med_rt_tap_border_lt_tap_border_01',
            'wb_med_rt_tap_border_lt_tap_border_02',
            'wb_med_rt_tap_border_lt_tap_border_03',
            'wb_med_rt_tap_border_lt_tap_border_04',
            'wb_med_rt_tap_border_slide_cymb_lt_tap_border_01',
            'wb_med_rt_tap_border_slide_cymb_lt_tap_border_02',
            'wb_med_rt_tap_border_slide_lt_tap_border_01',
            'wb_med_rt_tap_border_slide_lt_tap_border_02',
            'wb_med_rt_tap_border_slide_lt_tap_border_03',
            'wb_med_rt_tap_cymb_lt_tap_border_01',
            'wb_med_rt_tap_lt_tap_01',
            'wb_med_rt_tap_lt_tap_02',
            'wb_med_rt_tap_lt_tap_pause_01',
            'wb_med_rt_tap_slide_bell_lt_tap_01',
            'wb_med_rt_tap_slide_bell_lt_tap_02',
            'wb_med_rt_tap_slide_bell_lt_tap_03',
            'wb_med_rt_tap_slide_border_bell_lt_tap_border_01',
            'wb_med_rt_tap_slide_cymb_tamb_lt_tap_01',
            'wb_up_rt_tap_bell_lt_tap_01',
            'wb_up_rt_tap_bell_lt_tap_02',
            'wb_up_rt_tap_bell_slide_border_lt_tap_border_01',
            'wb_up_rt_tap_bell_slide_lt_tap_01',
            'wb_up_rt_tap_bell_slide_lt_tap_02',
            'wb_up_rt_tap_bell_slide_lt_tap_03',
            'wb_up_rt_tap_bell_tamb_lt_tap_01',
            'wb_up_rt_tap_border_cymb_lt_tap_border_01',
            'wb_up_rt_tap_border_slide_lt_tap_01',
            'wb_up_rt_tap_cymb_lt_tap_01',
            'wb_up_rt_tap_lt_tap_01',
            'wb_up_rt_tap_lt_tap_02',
            'wb_up_rt_tap_slide_border_lt_tap_border_01',
            'wb_up_rt_tap_slide_lt_tap_01',
            'wb_up_rt_tap_slide_lt_tap_02',
            'wb_up_rt_tap_slide_lt_tap_03',
            'wb_up_rt_tap_slide_lt_tap_04',
            'wb_up_rt_tap_slide_lt_tap_05',
            'wb_up_rt_tap_slide_lt_tap_06',
          ],
        },
        flourish: {
          dict: 'ai_gestures@instruments@washboard@seated@male@normal',
          anim: ['flourish_a', 'flourish_b', 'flourish_c'],
        },
      },
    },
    songs: {
      inworld_music_guitar: ['1'],
    },
  },
};

class InstrumentManager {
  protected static instance: InstrumentManager;

  static getInstance(): InstrumentManager {
    if (!InstrumentManager.instance) {
      InstrumentManager.instance = new InstrumentManager();
    }
    return InstrumentManager.instance;
  }

  isPlaying?: string;
  isStreamNotPlaying = 0;
  currentInstrument?: Instrument;
  attachedEntities: Set<number> = new Set();
  songPlaying?: Song;

  constructor() {
    on('onResourceStop', (resourceName: string) => {
      // Current Resource Stops
      if (resourceName === GetCurrentResourceName()) {
        this.stop();
      }
    });
  }

  // IsStreamPlaying(N_0x0556C784FA056628(song.streamName, song.streamSet))

  async playInstrument(instrumentName: string, anim?: string, song?: Song) {
    if (this.isPlaying) {
      return;
    }
    this.currentInstrument = instruments[instrumentName];
    if (!this.currentInstrument) {
      return;
    }
    if (!anim) {
      const animKeys = Object.keys(this.currentInstrument.anims);
      anim = animKeys[Math.floor(Math.random() * animKeys.length)];
    }
    if (!song) {
      const songKeys = Object.keys(this.currentInstrument.songs);
      const songKey = songKeys[Math.floor(Math.random() * songKeys.length)];
      Log('songKey', songKey);
      const songs = this.currentInstrument.songs[songKey];
      song = {
        streamSet: songKey,
        streamName: songs[Math.floor(Math.random() * songs.length)],
      };
      Log('song', song);
    }

    for (const prop of this.currentInstrument.props) {
      const coords = await PVGame.playerCoords();
      const propEntity = await PVGame.createObject(prop.model, coords, new Vector3(0, 0, 0), true);
      Log('propEntity', propEntity);
      Log(propEntity, prop.attach);
      PVGame.attachEntityToBoneName(
        propEntity,
        prop.attach,
        undefined,
        prop.offset ?? new Vector3(0, 0, 0),
        prop.rotation ?? new Vector3(0, 0, 0),
      );
      this.attachedEntities.add(propEntity);
    }
    // TODO: Move to helper
    const id = Math.round(Math.random() * 10000000).toString(16);
    Log('id', id);
    this.isPlaying = id;
    this.isStreamNotPlaying = 0;

    PVHealth.limitWalkSpeed(1);
    this.songPlaying = song;
    PVGame.playStreamFromPed(PVGame.playerPed(), song.streamSet, song.streamName);
    const hasPropAnim = this.currentInstrument.props.filter((prop) => prop.animate).length;
    if (hasPropAnim) {
      PVGame.loadAnimDict(`${this.currentInstrument.anims[anim].intro.dict}@prop`);
      PVGame.loadAnimDict(`${this.currentInstrument.anims[anim].loop.dict}@prop`);
    }
    const introAnimTask = {
      ...this.currentInstrument.anims[anim].intro,
      flags: AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
      blendInSpeed: 2,
    };
    introAnimTask.onStart = (animName, animDict) => {
      for (const propEntity of this.attachedEntities.values()) {
        PVGame.taskPlayEntityAnim([
          {
            // @ts-ignore
            ...this.currentInstrument?.anims[anim].intro,
            obj: propEntity,
            dict: `${animDict}@prop`,
            anim: animName,
          },
        ]);
      }
    };
    const animTaskDone = new Promise((resolve) => {
      introAnimTask.onEnd = () => {
        resolve(null);
      };
    });
    await PVGame.playAnimTask(introAnimTask);
    await animTaskDone;
    while (this.isPlaying === id && this.isStreamNotPlaying < 3) {
      const loadedStreamId = GetLoadedStreamIdFromCreation(song.streamName, song.streamSet);
      if (!IsStreamPlaying(GetLoadedStreamIdFromCreation(song.streamName, song.streamSet))) {
        this.isStreamNotPlaying++;
      } else {
        this.isStreamNotPlaying = 0;
      }
      const animTask = {
        ...this.currentInstrument.anims[anim].loop,
        flags: AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
        blendInSpeed: 8,
      };
      if (hasPropAnim) {
        animTask.onStart = (animName, animDict) => {
          for (const propEntity of this.attachedEntities.values()) {
            PVGame.taskPlayEntityAnim([
              {
                obj: propEntity,
                dict: `${animDict}@prop`,
                anim: animName,
                flags: 0,
              },
            ]);
          }
        };
      }
      await PVGame.playAnimTask(animTask);
    }

    Log('Loop ended');

    if (this.isPlaying === id) {
      this.stop();
    }
  }

  stop() {
    if (!this.songPlaying) {
      return;
    }
    PVGame.stopStream(this.songPlaying.streamSet, this.songPlaying.streamName);
    if (!this.isPlaying) {
      return;
    }
    for (const propEntity of this.attachedEntities.values()) {
      PVBase.deleteEntity(propEntity);
      this.attachedEntities.delete(propEntity);
    }
    PVHealth.clearWalkSpeed();
    this.isPlaying = undefined;
    ClearPedTasks(PVGame.playerPed());
    PVGame.stopStream(this.songPlaying.streamSet, this.songPlaying.streamName);
  }
}

const instrumentManager = InstrumentManager.getInstance();

export default instrumentManager;

RegisterCommand(
  'playInstrument',
  async (src: number, args: string[]) => {
    if (args.length > 2) {
      // instrumentManager.playInstrument(args[0], args[1], { streamSet: args[2], streamName: args[3] });
      instrumentManager.playInstrument(args[0], undefined, { streamSet: args[1], streamName: args[2] });
    } else {
      instrumentManager.playInstrument(args[0], args[1]);
    }
  },
  false,
);

RegisterCommand(
  'stopInstrument',
  async (src: number, args: string[]) => {
    instrumentManager.stop();
  },
  false,
);

RegisterCommand(
  'playStream',
  (src: number, args: string[]) => {
    PVGame.playStreamFromPed(PVGame.playerPed(), args[0], args[1]);
  },
  false,
);

RegisterCommand(
  'stopStream',
  (src: number, args: string[]) => {
    PVGame.stopStream(args[0], args[1]);
  },
  false,
);

// 'inworld_music_band_jack_rabbit' 'whistle'
// 'BANJO_BUFFALO_GALS_UPBEAT' 0x0cd5859c

RegisterCommand(
  'checkInstruments',
  async (src: number, args: string[]) => {
    const instruments = [
      'banjo',
      'fiddle',
      'guitar',
      'harmonica',
      'jawharp',
      'mandolin',
      'trumpet',
      'washboard',
      'double_bass',
      'piano',
      'concertina',
      'doublebass',
      'bass',
      'whistle',
      'piano',
      'abigail_piano',
      'wax_cylinder',
    ];
    // const instruments = ['mnshn_washboard', 'washboard', 'wash_board', 'wb'];
    // const instruments = ['dblcello', 'dblbass'];
    const suffixes = [
      '',
      '_upbeat',
      '_downbeat',
      // '_somber',
      // '_riverboat',
      // '_upscale',
      '_normal',
      '_drunk',
      '_casual',
      // '_sloppy',
      // '_tipsy',
      // '_sketchy',
      // '_upperclass',
    ];
    for (const instrument of instruments) {
      Log(`Checking ${instrument}`);
      for (const suffix of suffixes) {
        let failures = 0;
        let n = 0;
        const streamSet = `inworld_music_${instrument}${suffix}`;
        while (true) {
          n++;
          if (await PVGame.loadStream(streamSet, n.toString())) {
            Log(`${streamSet} ${n}`);
            PVGame.stopStream(streamSet, n.toString());
          } else {
            failures++;
          }
          if (failures > 2) {
            break;
          }
        }
      }
    }
    Log('Done');
  },
  false,
);

RegisterCommand(
  'isStream',
  async (src: number, args: string[]) => {
    if (await PVGame.loadStream(args[0], args[1], 150, 15)) {
      PVGame.stopStream(args[0], args[1]);
      Log('Yes');
    } else {
      Log('No');
    }
  },
  false,
);
