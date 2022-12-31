import { AnimFlag } from '@lib/flags';

export enum EmoteType {
  emote,
  animation,
  scenario,
}

export interface AnimationInterface {
  dict: string;
  anim: string;
  flags?: number;
  /*
    enum eAnimationFlags
    {
      ANIM_FLAG_NORMAL = 0,
      ANIM_FLAG_REPEAT = 1,
      ANIM_FLAG_STOP_LAST_FRAME = 2,
      ANIM_FLAG_UPPERBODY = 8,
      ANIM_FLAG_ENABLE_PLAYER_CONTROL = 16,
      ANIM_FLAG_CANCELABLE = 32,
    };
    */
}

export interface EmoteInterface {
  emote?: string;
  animation?: Anim.Task | Anim.Task[];
  scenario?: string;
  category?: number;
  type?: number;
}

export const EMOTES: Record<string, EmoteInterface> = {
  amazed: { emote: `KIT_EMOTE_REACTION_AMAZED_1` },
  applause: { emote: `KIT_EMOTE_REACTION_APPLAUSE_1` },
  bartend: { scenario: `WORLD_HUMAN_BARTENDER_CLEAN_GLASS` },
  beckon: { emote: `KIT_EMOTE_ACTION_BECKON_1` },
  begmercy: { emote: `KIT_EMOTE_REACTION_BEGMERCY_1` },
  bestshot: { emote: `KIT_EMOTE_TAUNT_BEST_SHOT_1` },
  bitecoin: { emote: `KIT_EMOTE_ACTION_BITING_GOLD_COIN_1` },
  blowkiss: { emote: `KIT_EMOTE_ACTION_BLOW_KISS_1` },
  boast: { emote: `KIT_EMOTE_ACTION_BOAST_1` },
  boohoo: { emote: `KIT_EMOTE_TAUNT_BOOHOO_1` },
  bow1: { emote: `KIT_EMOTE_GREET_FANCY_BOW_1` },
  bow2: { emote: `KIT_EMOTE_GREET_RESPECTFUL_BOW_1` },
  clap1: { emote: `KIT_EMOTE_REACTION_CLAP_ALONG_1` },
  clap2: { emote: `KIT_EMOTE_REACTION_SLOW_CLAP_1` },
  checkmakeup: { scenario: `WORLD_HUMAN_POCKET_MIRROR` },
  checkwatch: { emote: `KIT_EMOTE_ACTION_CHECK_POCKET_WATCH_1` },
  chicken: { emote: `KIT_EMOTE_TAUNT_CHICKEN_1` },
  coinflip: { emote: `KIT_EMOTE_ACTION_COIN_FLIP_1` },
  comeover: { emote: `KIT_EMOTE_GREET_GET_OVER_HERE_1` },
  cuckoo: { emote: `KIT_EMOTE_TAUNT_CUCKOO_1` },
  danceawkward: { emote: `KIT_EMOTE_DANCE_AWKWARD_A_1` },
  dancecancan: { animation: { dict: 'script_shows@cancandance@p2', anim: 'cancandance_p2_fem3' } },
  dancecarefree1: { emote: `KIT_EMOTE_DANCE_CAREFREE_A_1` },
  dancecarefree2: { emote: `KIT_EMOTE_DANCE_CAREFREE_B_1` },
  danceconfident1: { emote: `KIT_EMOTE_DANCE_CONFIDENT_A_1` },
  danceconfident2: { emote: `KIT_EMOTE_DANCE_CONFIDENT_B_1` },
  dancedrunk1: { emote: `KIT_EMOTE_DANCE_DRUNK_A_1` },
  dancedrunk2: { emote: `KIT_EMOTE_DANCE_DRUNK_B_1` },
  dancedrunk3: { animation: { dict: 'amb_misc@world_human_drunk_dancing@male@male_b@idle_a', anim: 'idle_c' } },
  dancefire: { animation: { dict: 'script_shows@firedancer@act3_p1', anim: 'dance' } },
  danceformal: { emote: `KIT_EMOTE_DANCE_FORMAL_A_1` },
  dancegraceful: { emote: `KIT_EMOTE_DANCE_GRACEFUL_A_1` },
  danceold: { emote: `KIT_EMOTE_DANCE_OLD_A_1` },
  dancesnake: { animation: { dict: 'script_shows@snakedancer@act1_p1', anim: 'dance_dancer' } },
  dancesword: { animation: { dict: 'script_shows@sworddance@act3_p1', anim: 'dancer_sworddance' } },
  dancewild1: { emote: `KIT_EMOTE_DANCE_WILD_A_1` },
  dancewild2: { emote: `KIT_EMOTE_DANCE_WILD_B_1` },
  facepalm: { emote: `KIT_EMOTE_REACTION_FACEPALM_1` },
  farmerhoe: { animation: { dict: 'amb_work@world_human_farmer_hoe@male_a@base', anim: 'base' } },
  fakedraw: { emote: `KIT_EMOTE_TAUNT_FAKE_DRAW_1` },
  fiddlehead: { emote: `KIT_EMOTE_TAUNT_FIDDLEHEAD_1` },
  fingerslinger: { emote: `KIT_EMOTE_TAUNT_FINGER_SLINGER_1` },
  fistpump: { emote: `KIT_EMOTE_ACTION_FIST_PUMP_1` },
  flex: { emote: `KIT_EMOTE_ACTION_FLEX_1` },
  flipoff: { emote: `KIT_EMOTE_TAUNT_FLIP_OFF_1` },
  followme: { emote: `KIT_EMOTE_ACTION_FOLLOW_ME_1` },
  frighten: { emote: `KIT_EMOTE_TAUNT_FRIGHTEN_1` },
  glad: { emote: `KIT_EMOTE_GREET_GLAD_1` },
  gorillachest: { emote: `KIT_EMOTE_TAUNT_GORILLA_CHEST_1` },
  hangover: { emote: `KIT_EMOTE_REACTION_HANGOVER_1` },
  hatflick: { emote: `KIT_EMOTE_GREET_HAT_FLICK_1` },
  hatflickf: { emote: `KIT_EMOTE_GREET_HAT_FLICK_1`, type: 2 },
  hattip: { emote: `KIT_EMOTE_GREET_HAT_TIP_1` },
  heyyou: { emote: `KIT_EMOTE_GREET_HEY_YOU_1` },
  hissyfit: { emote: `KIT_EMOTE_ACTION_HISSYFIT_1` },
  howdareyou: { emote: `KIT_EMOTE_REACTION_HOW_DARE_YOU_1` },
  howl: { emote: `KIT_EMOTE_ACTION_HOWL_1` },
  hurl: { emote: `KIT_EMOTE_REACTION_HURL_1` },
  hush: { emote: `KIT_EMOTE_REACTION_HUSH_YOUR_MOUTH_1` },
  hypnosis: { emote: `KIT_EMOTE_ACTION_HYPNOSIS_POCKET_WATCH_1` },
  idea: { emote: `KIT_EMOTE_ACTION_IDEA_1` },
  laugh1: { emote: `KIT_EMOTE_REACTION_JOVIAL_LAUGH_1` },
  laughpoint: { emote: `KIT_EMOTE_REACTION_POINTLAUGH_1` },
  lean1: {
    animation: {
      dict: 'mech_respawn@leaning',
      anim: 'base_player',
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  lean2: {
    animation: {
      dict: 'amb_temp@world_human_leaning@male@wall@back@hands_together@idle_a',
      anim: 'idle_a',
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  lean3: {
    animation: {
      dict: 'amb_temp@world_human_leaning@male@wall@back@hands_together@idle_a',
      anim: 'idle_b',
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  lean4: {
    animation: {
      dict: 'amb_temp@world_human_leaning@male@wall@back@hands_together@idle_a',
      anim: 'idle_c',
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  lean5: {
    animation: {
      dict: 'mech_respawn@leaning@wall@male_a@idle_a',
      anim: ['idle_a', 'idle_b', 'idle_c'],
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  lean6: {
    animation: {
      dict: 'mech_respawn@leaning@wall@male_a@idle_b',
      anim: ['idle_d', 'idle_e', 'idle_f'],
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  lean7: {
    animation: {
      dict: 'mech_respawn@leaning@wall@male_a@idle_c',
      anim: ['idle_g', 'idle_h'],
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  lean8: {
    animation: {
      dict: 'mech_respawn@leaning@wall@male_d@idle_a',
      anim: ['idle_a', 'idle_b', 'idle_c'],
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  lean9: {
    animation: {
      dict: 'mech_respawn@leaning@wall@male_d@idle_b',
      anim: ['idle_d', 'idle_e', 'idle_f'],
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  lean10: {
    animation: {
      dict: 'mech_respawn@leaning@wall@male_d@idle_c',
      anim: ['idle_g', 'idle_h', 'idle_i'],
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  leanbar: {
    animation: {
      dict: 'amb_work@world_human_guard@lean_railing@male_a@wip_base',
      anim: 'wip_base',
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  leanbar2: { scenario: `WORLD_HUMAN_BAR_DRINK_BARTENDER` },
  letscraft: { emote: `KIT_EMOTE_ACTION_LETS_CRAFT_1` },
  letsfish: { emote: `KIT_EMOTE_ACTION_LETS_FISH_1` },
  letsgo: { emote: `KIT_EMOTE_ACTION_LETS_GO_1` },
  letsplaycards: { emote: `KIT_EMOTE_ACTION_LETS_PLAY_CARDS_1` },
  listen: { emote: `KIT_EMOTE_ACTION_LISTEN_1` },
  look1: { emote: `KIT_EMOTE_ACTION_LOOK_DISTANCE_1` },
  look2: { emote: `KIT_EMOTE_ACTION_LOOK_YONDER_1` },
  newclothes: { emote: `KIT_EMOTE_ACTION_NEWTHREADS_1` },
  nod: { emote: `KIT_EMOTE_REACTION_NOD_HEAD_1` },
  outpour: { emote: `KIT_EMOTE_GREET_OUTPOUR_1` },
  phew: { emote: `KIT_EMOTE_REACTION_PHEW_1` },
  point: { emote: `KIT_EMOTE_ACTION_POINT_1` },
  posseup: { emote: `KIT_EMOTE_ACTION_POSSE_UP_1` },
  possum: { emote: `POSSUM_EMOTE` },
  prayer: { emote: `KIT_EMOTE_ACTION_PRAYER_1` },
  prospectorjig: { emote: `KIT_EMOTE_ACTION_PROSPECTOR_JIG_1` },
  provoke: { emote: `KIT_EMOTE_TAUNT_PROVOKE_1` },
  rabbit: { emote: `RABBIT_EMOTE` },
  ripper: { emote: `KIT_EMOTE_TAUNT_RIPPER_1` },
  rockpaperscissors: { emote: `KIT_EMOTE_ACTION_ROCK_PAPER_SCISSORS_1` },
  scared: { emote: `KIT_EMOTE_REACTION_SCARED_1` },
  scheme: { emote: `KIT_EMOTE_ACTION_SCHEME_1` },
  seven: { emote: `KIT_EMOTE_GREET_SEVEN_1` },
  shakehead: { emote: `KIT_EMOTE_REACTION_SHAKEHEAD_1` },
  sharpennknifechairbadass: { scenario: `PROP_HUMAN_SEAT_CHAIR_KNIFE_BADASS` },
  sharpenknifetable: { scenario: `WORLD_HUMAN_LEAN_TABLE_SHARPEN_KNIFE` },
  shoothip: { emote: `KIT_EMOTE_ACTION_SHOOTHIP_1` },
  shootsky: { emote: `KIT_EMOTE_ACTION_SKYWARD_SHOOTING_1` },
  shot: { emote: `KIT_EMOTE_REACTION_SHOT_1` },
  shrug: { emote: `KIT_EMOTE_REACTION_SHRUG_1` },
  shuffle: { emote: `KIT_EMOTE_REACTION_SHUFFLE_1` },
  siteat: { scenario: `PROP_CAMP_JACK_SEAT_CHAIR_STEW_EATING` },
  slitthroat: { emote: `KIT_EMOTE_TAUNT_THROAT_SLIT_1` },
  smoke1: { emote: `KIT_EMOTE_ACTION_SMOKE_CIGARETTE_1` },
  smoke2: { emote: `KIT_EMOTE_ACTION_SMOKE_CIGAR_1` },
  smoke3: { emote: `KIT_EMOTE_ACTION_SMOKE_PIPE_1` },
  snarl: { emote: `KIT_EMOTE_TAUNT_COUGAR_SNARL_1` },
  sniffing: { emote: `KIT_EMOTE_REACTION_SNIFFING_1` },
  sob: { emote: `KIT_EMOTE_REACTION_SOB_1` },
  spinaim: { emote: `KIT_EMOTE_ACTION_SPIN_AND_AIM_1` },
  spit: { emote: `KIT_EMOTE_ACTION_SPIT_1` },
  spooky: { emote: `KIT_EMOTE_ACTION_SPOOKY_1` },
  stop: { emote: `KIT_EMOTE_ACTION_STOP_HERE_1` },
  surrender: { emote: `KIT_EMOTE_REACTION_SURRENDER_1` },
  tada: { emote: `KIT_EMOTE_GREET_TADA_1` },
  takenotes: { emote: `KIT_EMOTE_ACTION_TAKE_NOTES_1` },
  thanks: { emote: `KIT_EMOTE_REACTION_THANKS_1` },
  throwrock: { scenario: `WORLD_CAMP_JACK_THROWS_ROCKS_CASUAL` },
  thumbsdown: { emote: `KIT_EMOTE_REACTION_THUMBSDOWN_1` },
  thumbsup: { emote: `KIT_EMOTE_GREET_THUMBSUP_1` },
  tough: { emote: `KIT_EMOTE_GREET_TOUGH_1` },
  twirlgun: { emote: `KIT_EMOTE_TWIRL_GUN`, category: 4, type: 1 },
  twirlgun2: { emote: `KIT_EMOTE_TWIRL_GUN_DUAL`, category: 4, type: 1 },
  twirlgun3: { emote: `KIT_EMOTE_TWIRL_GUN_LEFT_HOLSTER`, category: 4, type: 1 },
  upyours: { emote: `KIT_EMOTE_TAUNT_UP_YOURS_1` },
  versus: { emote: `KIT_EMOTE_TAUNT_VERSUS_1` },
  vomit1: { animation: { dict: 'amb_misc@world_human_vomit@male_a@idle_b', anim: 'idle_f' } },
  vomit2: { scenario: `WORLD_HUMAN_VOMIT` },
  vomitkneel: { scenario: `WORLD_HUMAN_VOMIT_KNEEL` },
  wagfinger: { emote: `KIT_EMOTE_REACTION_WAG_FINGER_1` },
  waiting1: { animation: { dict: 'amb_misc@world_human_stand_waiting@male_a@idle_c', anim: 'idle_h' } },
  waiting2: { animation: { dict: 'amb_misc@world_human_stand_waiting@male_a@idle_c', anim: 'idle_g' } },
  waitingbar: { animation: { dict: 'amb_work@world_human_bartender@pre_service@male_a@idle_a', anim: 'idle_a' } },
  warcry: { emote: `KIT_EMOTE_TAUNT_WAR_CRY_1` },
  washface: { scenario: `WORLD_HUMAN_WASH_FACE_BUCKET_GROUND_NO_BUCKET` },
  watchingyou: { emote: `KIT_EMOTE_TAUNT_IM_WATCHING_YOU_1` },
  wave1: { emote: `KIT_EMOTE_GREET_SUBTLE_WAVE_1` },
  wave2: { emote: `KIT_EMOTE_GREET_WAVENEAR_1` },
  wave3: { emote: `KIT_EMOTE_GREET_GENTLEWAVE_1` },
  whome: { emote: `KIT_EMOTE_REACTION_WHO_ME_1` },
  yeehaw: { emote: `KIT_EMOTE_REACTION_YEEHAW_1` },
  youstink: { emote: `KIT_EMOTE_TAUNT_YOUSTINK_1` },
  handsup: {
    animation: {
      dict: 'script_proc@bounty@rhodes_rancher@ranch',
      anim: 'hands_up_idle_target',
      flags: AnimFlag.REPEAT + AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
    },
  },
  handsup2: {
    animation: {
      dict: 'mech_loco_m@generic@reaction@handsup@unarmed@normal',
      anim: 'loop',
      flags: AnimFlag.REPEAT + AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
    },
  },
  handsup3: {
    animation: {
      dict: 'mech_loco_m@generic@reaction@handsup@unarmed@tough',
      anim: 'loop',
      flags: AnimFlag.REPEAT + AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
    },
  },
  handsup4: {
    animation: {
      dict: 'mech_loco_f@generic@reaction@handsup@unarmed@normal',
      anim: 'loop',
      flags: AnimFlag.REPEAT + AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
    },
  },
  handsup5: {
    animation: {
      dict: 'mech_loco_f@generic@reaction@handsup@unarmed@tough',
      anim: 'loop',
      flags: AnimFlag.REPEAT + AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
    },
  },
  tantrum: {
    animation: {
      dict: 'ai_damage@ko@base',
      anim: 'floor_right',
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  deskchan: {
    animation: {
      dict: 'mini_games@story@beechers@build_floor@john',
      anim: 'hammer_hit_onbeat_mid_strong',
      flags: AnimFlag.REPEAT + AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL + AnimFlag.CANCELABLE,
      duration: 2500,
    },
  },
  ko: {
    animation: {
      dict: 'ai_damage@ko@base',
      anim: 'ko_left',
      flags: AnimFlag.STOP_LAST_FRAME,
    },
  },
  clap3: {
    animation: {
      dict: 'script_rc@ckpt@ig@ig_clapping',
      anim: 'clapping_a_m_m_nbxupperclass_01',
      flags: AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
    },
  },
  clap4: {
    animation: {
      dict: 'script_rc@ckpt@ig@ig_clapping',
      anim: 'clapping_a_f_m_nbxupperclass_01',
      flags: AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
    },
  },
  tiphat: {
    animation: {
      dict: 'script_common@handover@generic@ped_handover@upper_body',
      anim: 'tip_hat_rhand',
      flags: AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
    },
  },
  tiphat2: {
    animation: {
      dict: 'script_common@handover@generic@ped_handover@upper_body',
      anim: 'tip_hat_lhand',
      flags: AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
    },
  },
  leginjured: {
    animation: {
      dict: 'script_rc@cldn@ig@s2_ig4_maninjured',
      anim: 'a_m_m_nbxslums_01_ig4_maninjured_youalright',
      flags: AnimFlag.REPEAT,
    },
  },
  sitafraid: {
    animation: {
      dict: 'amb_misc@world_human_begging_mother@female_a@idle_a',
      anim: 'idle_a',
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  campfirestand: {
    animation: {
      dict: 'amb_camp@world_human_fire_stand@male_a@idle_a',
      anim: ['idle_a', 'idle_b', 'idle_c'],
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  campfirestandwarmup: {
    animation: {
      dict: 'amb_camp@world_human_fire_stand@cold@male_a@wip_base',
      anim: 'wip_base',
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  campfirestandcold: {
    animation: {
      dict: 'amb_camp@world_human_fire_stand@cold@male_b@wip_base',
      anim: 'wip_base',
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  cower: {
    animation: {
      dict: 'amb_temp@code_human_cower@male@idle_a',
      anim: ['idle_c', 'idle_b', 'idle_c'],
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  announce: {
    animation: {
      dict: 'amb_misc@world_human_announce@male@base',
      anim: 'base',
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  pray: {
    animation: {
      dict: 'amb_misc@world_human_pray_rosary@base',
      anim: 'base',
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  mourn: {
    animation: {
      dict: 'amb_misc@world_human_grave_mourning@male_b@idle_a',
      anim: ['idle_a', 'idle_b', 'idle_c'],
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  mourn2: {
    animation: {
      dict: 'amb_misc@world_human_grave_mourning@female_a@idle_a',
      anim: ['idle_a', 'idle_b'],
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  mournkneel: {
    animation: {
      dict: 'amb_misc@world_human_grave_mourning@kneel@male_b@idle_a',
      anim: ['idle_a', 'idle_b', 'idle_c'],
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  mournkneel2: {
    animation: {
      dict: 'amb_misc@world_human_grave_mourning@kneel@female_a@idle_c',
      anim: ['idle_g', 'idle_h'],
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  sit1: {
    animation: {
      dict: 'amb_rest_sit@world_human_sit_ground@male_b@idle_a',
      anim: ['idle_a', 'idle_b', 'idle_c'],
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  sit2: {
    animation: {
      dict: 'amb_rest_sit@world_human_sit_ground@male_b@idle_b',
      anim: ['idle_d', 'idle_e', 'idle_f'],
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  sit3: {
    animation: {
      dict: 'amb_rest_sit@world_human_sit_ground@male_b@idle_c',
      anim: ['idle_g', 'idle_h'],
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  sit4: {
    animation: {
      dict: 'amb_temp@world_human_picnic@female@base',
      anim: 'base',
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  sitsleep: {
    animation: {
      dict: 'amb_rest_sit@world_human_sit_ground@fall_asleep@male_a@sleeping@idle_b',
      anim: ['idle_d', 'idle_e', 'idle_f'],
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  cough: {
    animation: {
      dict: 'mech_loco_m@character@arthur@fidgets@sick@action@unarmed',
      anim: ['cough_a', 'cough_b', 'cough_c', 'cough_d'],
      flags: AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
    },
  },
  cough2: {
    animation: {
      dict: 'mech_loco_m@character@arthur@fidgets@smoke@unarmed',
      anim: 'cough',
      flags: AnimFlag.REPEAT + AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
    },
  },
  scratch: {
    animation: {
      dict: 'mech_loco_m@character@arthur@fidgets@crouch@unarmed',
      anim: ['scratch_a', 'scratch_b', 'scratch_c', 'scratch_d', 'scratch_e'],
      flags: AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
    },
  },
  smelly: {
    animation: {
      dict: 'mech_loco_m@character@arthur@fidgets@smoke@unarmed',
      anim: 'wave_left_hand',
      flags: AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
    },
  },
  cop: {
    animation: {
      dict: 'mech_loco_m@character@micah@special@chain_gang@idle@_variations@c',
      anim: 'idle',
      flags: AnimFlag.REPEAT + AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
    },
  },
  fanning: {
    animation: {
      dict: 'mech_loco_m@generic@fidgets@hot',
      anim: [
        'both_hands_fanning_01',
        'both_hands_fanning_02',
        'right_hand_fanning_01',
        'right_hand_fanning_02',
        'left_hand_fanning_01',
      ],
      flags: AnimFlag.ENABLE_PLAYER_CONTROL,
    },
  },
  dustoff: {
    animation: {
      dict: 'ai_react@shake_it_off',
      anim: 'dustoff',
      flags: AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
    },
  },
  wipesweat: {
    animation: {
      dict: 'mech_loco_m@generic@fidgets@hot',
      anim: [
        'both_hands_wipe_sweat_01',
        'both_hands_wipe_sweat_02',
        'left_hand_wipe_sweat_01',
        'left_hand_wipe_sweat_02',
        'left_hand_wipe_sweat_03',
        'left_hand_wipe_sweat_04',
        'left_hand_wipe_sweat_05',
        'left_hand_wipe_sweat_06',
        'right_hand_wipe_sweat_01',
        'right_hand_wipe_sweat_02',
        'right_hand_wipe_sweat_03',
        'right_hand_wipe_sweat_04',
        'right_hand_wipe_sweat_05',
        'right_hand_wipe_sweat_06',
      ],
      flags: AnimFlag.ENABLE_PLAYER_CONTROL,
    },
  },
  hatadjust: {
    animation: {
      dict: 'mech_loco_m@character@arthur@fidgets@crouch@unarmed',
      anim: ['hat_touch_a', 'hat_touch_b', 'hat_touch_c', 'hat_touch_d'],
      flags: AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
    },
  },
  wipeface: {
    animation: {
      dict: 'mech_loco_m@character@arthur@fidgets@crouch@unarmed',
      anim: 'face_wipe_a',
      flags: AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
    },
  },
  wipehands: {
    animation: {
      dict: 'mech_loco_m@character@arthur@fidgets@skinning@small_animal',
      anim: 'clean_both_hands',
      flags: AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
    },
  },
  warmhands: {
    animation: {
      dict: 'mech_loco_m@generic@fidgets@cold',
      anim: ['warm_hands_01', 'warm_hands_02', 'warm_hands_03', 'warm_hands_04', 'warm_hands_05', 'rub_arms_01'],
      flags: AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
    },
  },
  inspect: {
    animation: {
      dict: 'amb_work@world_human_crouch_inspect@male_a@idle_a',
      anim: ['idle_a', 'idle_b', 'idle_c'],
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  inspect2: {
    animation: {
      dict: 'amb_work@world_human_crouch_inspect@female_a@idle_a',
      anim: ['idle_a', 'idle_b', 'idle_c'],
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  shiver: {
    animation: {
      dict: 'mech_loco_m@character@random_event@lost_man@normal@unarmed@upper',
      anim: 'idle',
      flags: AnimFlag.REPEAT + AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
    },
  },
  pistol: {
    animation: {
      dict: 'mech_loco_m@character@sheriff_grey@idle@variation@touchweaponbelt',
      anim: 'idle',
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  yawn: {
    animation: {
      dict: 'mech_loco_m@character@arthur@fidgets@core@normal@stamina@unarmed',
      anim: 'yawn',
    },
  },
  bum: {
    animation: {
      dict: 'amb_rest@world_human_bum_slumped@male_a@idle_a',
      anim: ['idle_a', 'idle_b', 'idle_c'],
      flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
    },
  },
  itch: {
    animation: {
      dict: 'mech_loco_m@generic@special@unarmed@itchy@idle',
      anim: 'idle',
      flags: AnimFlag.CANCELABLE,
    },
  },
  servebeer: {
    animation: [
      {
        dict: 'amb_work@world_human_bartender@serve_beer@male_a@serve_bottle@under_bar@base',
        anim: 'base',
        flags: AnimFlag.STOP_LAST_FRAME,
      },
      {
        dict: 'amb_work@world_human_bartender@serve_beer@male_a@serve_bottle@under_bar@base',
        anim: [
          'under_trans_over_a',
          'under_trans_over_b',
          'under_trans_over_c',
          'under_trans_over_d',
          'under_trans_over_e',
          'under_trans_over_f',
          'under_trans_over_g',
        ],
        flags: AnimFlag.STOP_LAST_FRAME,
      },
      {
        dict: 'amb_work@world_human_bartender@serve_beer@male_a@serve_bottle@over_bar@base',
        anim: [
          'over_trans_front_a',
          'over_trans_front_b',
          'over_trans_front_c',
          'over_trans_front_d',
          'over_trans_front_e',
          'over_trans_front_f',
          'over_trans_front_g',
        ],
        flags: AnimFlag.CANCELABLE,
      },
    ],
  },
  pee: {
    animation: [
      {
        dict: 'amb_misc@world_human_pee@prep@male_a@trans',
        anim: 'prep_trans_pee',
        flags: AnimFlag.STOP_LAST_FRAME + AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
      },
      {
        dict: 'amb_misc@world_human_pee@male_a@base',
        anim: 'base',
        flags: AnimFlag.REPEAT + AnimFlag.CANCELABLE,
        blendInSpeed: 8.0,
        blendOutSpeed: -8.0,
      },
    ],
    // onEnd: {
    //   animation: {
    //     dict: 'amb_misc@world_human_pee@male_a@stand_exit',
    //     anim: 'exit_front',
    //   },
    // },
  },
  pee2: {
    animation: [
      {
        dict: 'amb_misc@world_human_pee@prep@male_a@trans',
        anim: 'prep_trans_pee',
        flags: AnimFlag.STOP_LAST_FRAME + AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
      },
      {
        dict: 'amb_misc@world_human_pee@male_a@base',
        anim: 'base',
        flags: AnimFlag.REPEAT + AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
        blendInSpeed: 8.0,
        blendOutSpeed: -8.0,
      },
    ],
  },
};

// TODO: Lots of good emotes in:
// mech_loco_m@generic@fidgets@gross
// script_re@town_robbery
// mech_loco_m@character@arthur@fidgets@normal@unarmed@_variations@subtle
// mech_loco_m@character@arthur@fidgets@core@normal@stamina@unarmed

// script_re@moonshine_camp@initial@male_b@crouch
// script_re@moonshine_camp@initial@male_b@stand_inspect
