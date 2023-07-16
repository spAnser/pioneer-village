import { Vector3 } from '@lib/math';
import { Delay } from '@lib/functions';
import { PVGame } from '@lib/client';

RegisterCommand(
  'tp_waypoint',
  async () => {
    DoScreenFadeOut(500);
    await Delay(500);

    FreezeEntityPosition(PVGame.mountPed() || PVGame.playerPed(), true);
    const waypoint = Vector3.fromArray(GetWaypointCoords());
    SetEntityCoords(PVGame.mountPed() || PVGame.playerPed(), waypoint.x, waypoint.y, 250.0, false, false, false, false);
    await Delay(1000);

    const [ret, groundZ] = GetGroundZAndNormalFor_3dCoord(waypoint.x, waypoint.y, 400.0);
    SetEntityCoords(
      PVGame.mountPed() || PVGame.playerPed(),
      waypoint.x,
      waypoint.y,
      ret ? groundZ : waypoint.z,
      false,
      false,
      false,
      false,
    );
    FreezeEntityPosition(PVGame.mountPed() || PVGame.playerPed(), false);

    console.log('waypoint', waypoint);
    console.log('groundZ', groundZ);

    await Delay(1000);
    DoScreenFadeIn(500);
  },
  false,
);

/**
 * Teleport to Towns
 */

const teleport = async (x: number, y: number, z: number) => {
  DoScreenFadeOut(500);
  await Delay(500);
  SetEntityCoords(PVGame.mountPed() || PVGame.playerPed(), x, y, z, true, false, false, true);
  await Delay(1000);
  DoScreenFadeIn(500);
};

RegisterCommand(
  'tp_valentine',
  () => {
    teleport(-211.46, 631.7, 112.0);
  },
  false,
);

RegisterCommand(
  'tp_strawberry',
  () => {
    teleport(-1799.9, -360.4, 162.5);
  },
  false,
);

RegisterCommand(
  'tp_blackwater',
  () => {
    teleport(-858.6, -1337.7, 43.5);
  },
  false,
);

RegisterCommand(
  'tp_armadillo',
  () => {
    teleport(-3735.9, -2611.4, -13.8);
  },
  false,
);

RegisterCommand(
  'tp_tumbleweed',
  () => {
    teleport(-3735.9, -2611.4, -13.8);
  },
  false,
);

RegisterCommand(
  'tp_rhodes',
  () => {
    teleport(1235.0, -1309.5, 75.9);
  },
  false,
);

RegisterCommand(
  'tp_stdenis',
  () => {
    teleport(2588.1, -1200.8, 52.9);
  },
  false,
);

RegisterCommand(
  'tp_vanhorn',
  () => {
    teleport(2964.2, 533.1, 43.2);
  },
  false,
);

RegisterCommand(
  'tp_annesburg',
  () => {
    teleport(2924.5, 1278.0, 43.6);
  },
  false,
);

/**
 * Teleport to Misc
 */

RegisterCommand(
  'tp_snow',
  () => {
    teleport(-1346.2, 2421.5, 306.0);
  },
  false,
);

RegisterCommand(
  'tp_wapiti',
  () => {
    teleport(460.7, 2208.4, 245.0);
  },
  false,
);

RegisterCommand(
  'tp_tesla',
  () => {
    teleport(2512.9, 2268.5, 175.5);
  },
  false,
);

RegisterCommand(
  'tp_emerald',
  () => {
    teleport(1419.3, 350.7, 87.5);
  },
  false,
);

RegisterCommand(
  'tp_lake',
  () => {
    teleport(1598.3, 1457.6, 144.7);
  },
  false,
);

RegisterCommand(
  'tp_swamp',
  () => {
    teleport(2105.3, -588.8, 40.5);
  },
  false,
);

/**
 * Misc Commands
 */
RegisterCommand(
  'get_pos',
  () => {
    const playerPed = PlayerPedId();
    const coords = GetEntityCoords(playerPed, false);
    const heightAboveGround = GetEntityHeightAboveGround(playerPed);

    console.log(`x: ${coords[0]}, y: ${coords[1]}, z: ${coords[2] - heightAboveGround}`);
  },
  false,
);
