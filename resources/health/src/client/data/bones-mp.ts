export const mpBoneHealth: Record<string, { percent: number; multiplier: number }> = {
  SKEL_HEAD: {
    percent: 100.0,
    multiplier: 2.5,
  },
  SKEL_L_CALF: {
    percent: 5.0,
    multiplier: 1.0,
  },
  SKEL_L_CLAVICLE: {
    percent: 5.0,
    multiplier: 1.0,
  },
  SKEL_L_FOOT: {
    percent: 7.5,
    multiplier: 1.0,
  },
  SKEL_L_FOREARM: {
    percent: 5.0,
    multiplier: 1.0,
  },
  SKEL_L_HAND: {
    percent: 7.5,
    multiplier: 1.0,
  },
  SKEL_L_THIGH: {
    percent: 5.0,
    multiplier: 1.0,
  },
  SKEL_L_UPPERARM: {
    percent: 5.0,
    multiplier: 1.0,
  },
  SKEL_NECK1: {
    percent: 85.0,
    multiplier: 1.75,
  },
  SKEL_PENIS00: {
    percent: 25.0,
    multiplier: 1.5,
  },
  SKEL_R_CALF: {
    percent: 5.0,
    multiplier: 1.0,
  },
  SKEL_R_CLAVICLE: {
    percent: 5.0,
    multiplier: 1.0,
  },
  SKEL_R_FOOT: {
    percent: 7.5,
    multiplier: 1.0,
  },
  SKEL_R_FOREARM: {
    percent: 5.0,
    multiplier: 1.0,
  },
  SKEL_R_HAND: {
    percent: 7.5,
    multiplier: 1.0,
  },
  SKEL_R_THIGH: {
    percent: 5.0,
    multiplier: 1.0,
  },
  SKEL_R_UPPERARM: {
    percent: 5.0,
    multiplier: 1.0,
  },
  SKEL_SPINE4: {
    // REALLY THE CHEST
    percent: 85.0,
    multiplier: 1.0,
  },
};

export const injuryLimbBones: string[] = [
  'SKEL_L_CALF',
  'SKEL_L_FINGER00',
  'SKEL_L_FINGER01',
  'SKEL_L_FINGER02',
  'SKEL_L_FINGER10',
  'SKEL_L_FINGER11',
  'SKEL_L_FINGER12',
  'SKEL_L_FINGER13',
  'SKEL_L_FINGER20',
  'SKEL_L_FINGER21',
  'SKEL_L_FINGER22',
  'SKEL_L_FINGER23',
  'SKEL_L_FINGER30',
  'SKEL_L_FINGER31',
  'SKEL_L_FINGER32',
  'SKEL_L_FINGER33',
  'SKEL_L_FINGER40',
  'SKEL_L_FINGER41',
  'SKEL_L_FINGER42',
  'SKEL_L_FINGER43',
  'SKEL_L_FOOT',
  'SKEL_L_FOREARM',
  'SKEL_L_HAND',
  'SKEL_L_THIGH',
  'SKEL_L_TOE0',
  'SKEL_L_TOE10',
  'SKEL_L_TOE20',
  'SKEL_L_UPPERARM',
  'SKEL_R_CALF',
  'SKEL_R_FINGER00',
  'SKEL_R_FINGER01',
  'SKEL_R_FINGER02',
  'SKEL_R_FINGER10',
  'SKEL_R_FINGER11',
  'SKEL_R_FINGER12',
  'SKEL_R_FINGER13',
  'SKEL_R_FINGER20',
  'SKEL_R_FINGER21',
  'SKEL_R_FINGER22',
  'SKEL_R_FINGER23',
  'SKEL_R_FINGER30',
  'SKEL_R_FINGER31',
  'SKEL_R_FINGER32',
  'SKEL_R_FINGER33',
  'SKEL_R_FINGER40',
  'SKEL_R_FINGER41',
  'SKEL_R_FINGER42',
  'SKEL_R_FINGER43',
  'SKEL_R_FOOT',
  'SKEL_R_FOREARM',
  'SKEL_R_HAND',
  'SKEL_R_THIGH',
  'SKEL_R_TOE0',
  'SKEL_R_TOE10',
  'SKEL_R_TOE20',
  'SKEL_R_UPPERARM',
];

export const injuryLimbInfo: Health.InjuryInfo[] = [
  {
    threshold: 10,
    text: 'Broken',
    recoveryMultiplier: 0.8,
    boneBroken: true,
  },
  {
    threshold: 30,
    text: 'Fractured',
    recoveryMultiplier: 0.9,
    boneBroken: true,
  },
  {
    threshold: 60,
    text: 'Sprained',
    recoveryMultiplier: 0.95,
  },
  {
    threshold: 85,
    text: 'Bruised',
    recoveryMultiplier: 0.975,
  },
  {
    threshold: 95,
    text: 'Lacerations',
    recoveryMultiplier: 1.0,
  },
];

export const injuryBodyBones: string[] = [
  'SKEL_L_CLAVICLE',
  'SKEL_NECK0',
  'SKEL_NECK1',
  'SKEL_NECK2',
  'SKEL_PELVIS',
  'SKEL_R_CLAVICLE',
  'SKEL_SPINE0',
  'SKEL_SPINE1',
  'SKEL_SPINE2',
  'SKEL_SPINE3',
  'SKEL_SPINE4',
  'SKEL_SPINE5',
  'SKEL_SPINE6',
  'SKEL_SPINE_ROOT',
];

export const injuryBodyInfo: Health.InjuryInfo[] = [
  {
    threshold: 20,
    text: 'Broken',
    recoveryMultiplier: 1.0,
    boneBroken: true,
  },
  {
    threshold: 40,
    text: 'Fractured',
    recoveryMultiplier: 1.15,
    boneBroken: true,
  },
  {
    threshold: 60,
    text: 'Sprained',
    recoveryMultiplier: 1.25,
  },
  {
    threshold: 85,
    text: 'Bruised',
    recoveryMultiplier: 1.325,
  },
  {
    threshold: 95,
    text: 'Sore',
    recoveryMultiplier: 1.4,
  },
];

export const injuryHeadBones: string[] = ['SKEL_HEAD'];

export const injuryHeadInfo: Health.InjuryInfo[] = [
  {
    threshold: 10,
    text: 'Fractured',
    recoveryMultiplier: 0.375,
  },
  {
    threshold: 35,
    text: 'Concussed',
    recoveryMultiplier: 0.5,
  },
  {
    threshold: 65,
    text: 'Bruised',
    recoveryMultiplier: 0.625,
  },
  {
    threshold: 85,
    text: 'Lacerations',
    recoveryMultiplier: 0.75,
  },
];

export const injuryOtherBones: string[] = ['SKEL_PENIS00', 'SKEL_PENIS01', 'SKEL_PENIS_TRANS'];

export const injuryOtherInfo: Health.InjuryInfo[] = [
  {
    threshold: 25,
    text: 'Broken',
    recoveryMultiplier: 0.5,
    boneBroken: true,
  },
  {
    threshold: 50,
    text: 'Bruised',
    recoveryMultiplier: 0.625,
  },
  {
    threshold: 75,
    text: 'Lacerations',
    recoveryMultiplier: 0.75,
  },
];

export const infectionNames = [
  {
    threshold: 80,
    text: 'Severe Infection',
  },
  {
    threshold: 60,
    text: 'Major Infection',
  },
  {
    threshold: 40,
    text: 'Infection',
  },
  {
    threshold: 20,
    text: 'Minor Infection',
  },
];

export const boneRedirection: Record<string, string> = {
  SKEL_L_FINGER00: 'SKEL_L_HAND',
  SKEL_L_FINGER01: 'SKEL_L_HAND',
  SKEL_L_FINGER02: 'SKEL_L_HAND',
  SKEL_L_FINGER10: 'SKEL_L_HAND',
  SKEL_L_FINGER11: 'SKEL_L_HAND',
  SKEL_L_FINGER12: 'SKEL_L_HAND',
  SKEL_L_FINGER13: 'SKEL_L_HAND',
  SKEL_L_FINGER20: 'SKEL_L_HAND',
  SKEL_L_FINGER21: 'SKEL_L_HAND',
  SKEL_L_FINGER22: 'SKEL_L_HAND',
  SKEL_L_FINGER23: 'SKEL_L_HAND',
  SKEL_L_FINGER30: 'SKEL_L_HAND',
  SKEL_L_FINGER31: 'SKEL_L_HAND',
  SKEL_L_FINGER32: 'SKEL_L_HAND',
  SKEL_L_FINGER33: 'SKEL_L_HAND',
  SKEL_L_FINGER40: 'SKEL_L_HAND',
  SKEL_L_FINGER41: 'SKEL_L_HAND',
  SKEL_L_FINGER42: 'SKEL_L_HAND',
  SKEL_L_FINGER43: 'SKEL_L_HAND',
  SKEL_L_TOE0: 'SKEL_L_FOOT',
  SKEL_L_TOE10: 'SKEL_L_FOOT',
  SKEL_L_TOE20: 'SKEL_L_FOOT',
  SKEL_R_FINGER00: 'SKEL_R_HAND',
  SKEL_R_FINGER01: 'SKEL_R_HAND',
  SKEL_R_FINGER02: 'SKEL_R_HAND',
  SKEL_R_FINGER10: 'SKEL_R_HAND',
  SKEL_R_FINGER11: 'SKEL_R_HAND',
  SKEL_R_FINGER12: 'SKEL_R_HAND',
  SKEL_R_FINGER13: 'SKEL_R_HAND',
  SKEL_R_FINGER20: 'SKEL_R_HAND',
  SKEL_R_FINGER21: 'SKEL_R_HAND',
  SKEL_R_FINGER22: 'SKEL_R_HAND',
  SKEL_R_FINGER23: 'SKEL_R_HAND',
  SKEL_R_FINGER30: 'SKEL_R_HAND',
  SKEL_R_FINGER31: 'SKEL_R_HAND',
  SKEL_R_FINGER32: 'SKEL_R_HAND',
  SKEL_R_FINGER33: 'SKEL_R_HAND',
  SKEL_R_FINGER40: 'SKEL_R_HAND',
  SKEL_R_FINGER41: 'SKEL_R_HAND',
  SKEL_R_FINGER42: 'SKEL_R_HAND',
  SKEL_R_FINGER43: 'SKEL_R_HAND',
  SKEL_R_TOE0: 'SKEL_R_FOOT',
  SKEL_R_TOE10: 'SKEL_R_FOOT',
  SKEL_R_TOE20: 'SKEL_R_FOOT',
  SKEL_NECK0: 'SKEL_NECK1',
  SKEL_NECK2: 'SKEL_NECK1',
  SKEL_PENIS_TRANS: 'SKEL_PENIS00',
  SKEL_PENIS01: 'SKEL_PENIS00',
  SKEL_SPINE6: 'SKEL_SPINE4',
  SKEL_SPINE5: 'SKEL_SPINE4',
  SKEL_SPINE3: 'SKEL_SPINE4',
  SKEL_SPINE2: 'SKEL_SPINE4',
  SKEL_SPINE1: 'SKEL_SPINE4',
  SKEL_SPINE0: 'SKEL_SPINE4',
  SKEL_SPINE_ROOT: 'SKEL_SPINE4',
  SKEL_PELVIS: 'SKEL_SPINE4',
};

export const boneBulletFragmentChance: Record<string, number> = {
  SKEL_HEAD: 0.25,
  SKEL_NECK1: 0.15,
  SKEL_L_CLAVICLE: 0.35,
  SKEL_R_CLAVICLE: 0.35,
  SKEL_L_UPPERARM: 0.15,
  SKEL_R_UPPERARM: 0.15,
  SKEL_SPINE4: 0.75,
  SKEL_L_FOREARM: 0.1,
  SKEL_R_FOREARM: 0.1,
  SKEL_L_HAND: 0.0,
  SKEL_R_HAND: 0.0,
  SKEL_PENIS00: 0.0,
  SKEL_L_THIGH: 0.35,
  SKEL_R_THIGH: 0.35,
  SKEL_L_CALF: 0.2,
  SKEL_R_CALF: 0.2,
  SKEL_L_FOOT: 0.05,
  SKEL_R_FOOT: 0.05,
};

// Healing Sheet Layout

//                    SKEL_HEAD
//                    SKEL_NECK1
// SKEL_L_CLAVICLE                   SKEL_R_CLAVICLE
//
// SKEL_L_UPPERARM    SKEL_SPINE4    SKEL_R_UPPERARM
//
//  SKEL_L_FOREARM                   SKEL_R_FOREARM
//
//   SKEL_L_HAND                       SKEL_R_HAND
//                    SKEL_PENIS00
//          SKEL_L_THIGH       SKEL_R_THIGH

//          SKEL_L_CALF         SKEL_R_CALF

//          SKEL_L_FOOT         SKEL_R_FOOT
