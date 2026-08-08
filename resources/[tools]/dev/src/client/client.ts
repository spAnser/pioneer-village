import { PVGame } from '@lib/client';
import { Delay } from '@lib/functions';
import { Vector3 } from '@lib/math';

const collisionLoaded = async function (x: number, y: number, z: number, delay = 250) {
  if (HasCollisionLoadedAtCoord(x, y, z)) {
    return;
  }
  return new Promise<void>((resolve) => {
    RequestCollisionAtCoord(x, y, z);
    if (HasCollisionLoadedAtCoord(x, y, z)) {
      resolve();
    } else {
      const timeout = setTimeout(() => {
        resolve();
        clearInterval(collisionLoadCheck);
      }, 5_000);
      const collisionLoadCheck = setInterval(() => {
        if (HasCollisionLoadedAtCoord(x, y, z)) {
          resolve();
          clearInterval(collisionLoadCheck);
          clearTimeout(timeout);
        }
      }, delay);
    }
  });
};

const teleport = async (x: number, y: number, z: number) => {
  FreezeEntityPosition(PVGame.mountPed() || PVGame.playerPed(), true);
  DoScreenFadeOut(500);
  await Delay(500);
  SetEntityCoords(PVGame.mountPed() || PVGame.playerPed(), x, y, z, true, false, false, true);
  await collisionLoaded(x, y, z);
  DoScreenFadeIn(500);
  FreezeEntityPosition(PVGame.mountPed() || PVGame.playerPed(), false);
};

RegisterCommand(
  'tp_waypoint',
  async () => {
    DoScreenFadeOut(500);
    await Delay(500);

    FreezeEntityPosition(PVGame.mountPed() || PVGame.playerPed(), true);
    const waypoint = Vector3.fromArray(GetWaypointCoords());
    SetEntityCoords(PVGame.mountPed() || PVGame.playerPed(), waypoint.x, waypoint.y, 250.0, false, false, false, false);
    await Delay(1000);

    await collisionLoaded(waypoint.x, waypoint.y, 250.0);

    const [ret, groundZ] = GetGroundZAndNormalFor_3DCoord(waypoint.x, waypoint.y, 400.0);
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

RegisterCommand(
  'tp',
  async (src: number, args: string[], raw: any) => {
    let [x, y, z] = args.map((c) => parseFloat(c.replace(/,/g, '')) || 0);

    if (x === undefined || y === undefined || z === undefined) return console.log('Invalid coords.');

    teleport(x, y, z);

    console.log('Coords', x, y, z);
  },
  false,
);

/**
 * Teleport to Towns
 */

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
    teleport(-5495.5, -2950.2, -1.5);
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

RegisterCommand(
  'tp_geyser',
  () => {
    teleport(216.6, 1918.4, 205.5);
  },
  false,
);

RegisterCommand(
  'tp_cellar',
  () => {
    teleport(-599.6, 519.5, 96.2);
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
    const coords = GetEntityCoords(playerPed, false, true);
    const heightAboveGround = GetEntityHeightAboveGround(playerPed);
    const heading = GetEntityHeading(playerPed);

    console.log(`x: ${coords[0]}, y: ${coords[1]}, z: ${coords[2] - heightAboveGround}, heading: ${heading}`);
  },
  false,
);
