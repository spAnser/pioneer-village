import './misc/events';
import './misc/commands';
import './misc/exports';
import './misc/test';

// const strings = LoadResourceFile('research', 'files/strings.txt').split('\n');
//
// const find = [
//   -1241887289, -2045421226, -162963160, 174153218, 46507404, 1537699023, -1136463505, 560337648, -251978256,
//   -2045421226, -1241887289, -755702786, 1975258357, -254962964, 1218117202, 1790080661, 625380794, -1658511610,
// ];
//
// for (const string of strings) {
//   if (find.includes(GetHashKey(string))) {
//     console.log(string, GetHashKey(string));
//   }
// }

// setTick(() => {
//   if (creationManager.getChosen()) {
//     const ped = creationManager.getChosen();
//     SetIkTarget(ped, 1, ped, 12844, 0.0, 0.0, 0.0, 0, -1, -1);
//     ForcePedMotionState(ped, `MotionState_None`, false, 1, true);
//   } else {
//     const ped = PlayerPedId();
//     SetEntityAnimSpeed(ped, '', '', 0.001);
//     // ForcePedMotionState(ped, GetHashKey('MotionState_Aiming'), true, 1, false);
//     // TaskForceMotionState(ped, GetHashKey('MotionState_Aiming'), true);
//     // SetIkTarget(ped, 1, ped, 12844, 0.0, 0.0, 0.0, 0, -1, -1);
//   }
// });

// MotionState_None,
// MotionState_Idle,
// MotionState_WalkStart,
// MotionState_Walk,
// MotionState_WalkStop,
// MotionState_JogStart,
// MotionState_Jog,
// MotionState_JogStop,
// MotionState_Run,
// MotionState_RunStart,
// MotionState_RunStop,
// MotionState_SprintStart,
// MotionState_Sprint,
// MotionState_SprintStop,
// MotionState_Crouch_Idle,
// MotionState_Crouch_WalkStart,
// MotionState_Crouch_Walk,
// MotionState_Crouch_WalkStop,
// MotionState_Crouch_JogStart,
// MotionState_Crouch_Jog,
// MotionState_Crouch_JogStop,
// MotionState_Crouch_RunStart,
// MotionState_Crouch_Run,
// MotionState_Crouch_RunStop,
// MotionState_DoNothing,
// MotionState_AnimatedVelocity,
// MotionState_InVehicle,
// MotionState_OnMount,
// MotionState_Aiming,
// MotionState_Diving_Idle,
// MotionState_Diving_Swim,
// MotionState_Swimming_TreadWater,
// MotionState_Dead,
// MotionState_InCover,
// MotionState_Jetpack,
// MotionState_Flying,
// MotionState_Carriable,
// MotionState_HitReact,
// MotionState_Strafing,
// MotionState_Grappling,
// MotionState_Parachuting,
// MotionState_0x930FDD2D = 2882129524,
// MotionState_0xE5AC0F31 = 3914821169,
// MotionState_Stealth_Idle,
// MotionState_Stealth_WalkStart,
// MotionState_Stealth_Walk,
// MotionState_Stealth_WalkStop,
// MotionState_Stealth_JogStart,
// MotionState_Stealth_Jog,
// MotionState_Stealth_JogStop,
// MotionState_Stealth_RunStart,
// MotionState_Stealth_Run,
// MotionState_Stealth_RunStop,
// MotionState_ActionMode_Idle,
// MotionState_ActionMode_WalkStart,
// MotionState_ActionMode_Walk,
// MotionState_ActionMode_WalkStop,
// MotionState_ActionMode_JogStart,
// MotionState_ActionMode_Jog,
// MotionState_ActionMode_JogStop,
// MotionState_ActionMode_RunStart,
// MotionState_ActionMode_Run,
// MotionState_ActionMode_RunStop,
// MotionState_ActionCrouch_Idle,
// MotionState_ActionCrouch_WalkStart,
// MotionState_ActionCrouch_Walk,
// MotionState_ActionCrouch_WalkStop,
// MotionState_ActionCrouch_JogStart,
// MotionState_ActionCrouch_Jog,
// MotionState_ActionCrouch_JogStop,
// MotionState_ActionCrouch_RunStart,
// MotionState_ActionCrouch_Run,
// MotionState_ActionCrouch_RunStop,
// MotionState_StealthCrouch_Idle,
// MotionState_StealthCrouch_WalkStart,
// MotionState_StealthCrouch_Walk,
// MotionState_StealthCrouch_WalkStop,
// MotionState_StealthCrouch_JogStart,
// MotionState_StealthCrouch_Jog,
// MotionState_StealthCrouch_JogStop,
// MotionState_StealthCrouch_RunStart,
// MotionState_StealthCrouch_Run,
// MotionState_StealthCrouch_RunStop,

// AddStateBagChangeHandler('textures', '', (bagName: string, key: string, value: string) => {
//   Log('Textures state changed', bagName, key, value);
// });
