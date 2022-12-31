import { emitUI } from '@lib/client';

let wasAiming = false;
let aimingInAir = false;
let currentWeapon: number = 0;

const playerId = PlayerId();

const disabledCrosshairHashes: number[] = [
  0,
  GetHashKey('WEAPON_UNARMED'),
  GetHashKey('WEAPON_MELEE_KNIFE'),
  GetHashKey('WEAPON_FISHINGROD'),
  GetHashKey('WEAPON_MELEE_LANTERN'),
  GetHashKey('WEAPON_LASSO'),
  GetHashKey('WEAPON_MELEE_TORCH'),
  GetHashKey('WEAPON_THROWN_DYNAMITE'),
  GetHashKey('WEAPON_THROWN_MOLOTOV'),
];

const checkAiming = (isAiming: boolean) => {
  if (!isAiming && !wasAiming) {
    return;
  }
  const playerPed = PlayerPedId();
  const aimingInAir = GetIsPedAimingInTheAir(playerPed);
  if (isAiming && !aimingInAir && !wasAiming && !disabledCrosshairHashes.includes(currentWeapon)) {
    wasAiming = true;
    emitUI('hud.state', { crosshair: true });
  } else if ((!isAiming || aimingInAir || disabledCrosshairHashes.includes(currentWeapon)) && wasAiming) {
    wasAiming = false;
    emitUI('hud.state', { crosshair: false });
  }
};

on('events_manager:aimingInAir', (isAimingInAir: boolean) => {
  aimingInAir = isAimingInAir;
  checkAiming(wasAiming);
});

on('events_manager:aiming', (isAiming: boolean) => {
  checkAiming(isAiming);
});

on('events_manager:weapon', ([mainHand, offHand]: [number, number]) => {
  currentWeapon = mainHand;
  checkAiming(wasAiming);
});
