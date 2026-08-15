import { PVGame, PVWorld, TxtAtWorldCoord } from '@lib/client';
import { Delay } from '@lib/functions';
import { Vector3 } from '@lib/math';

const ptfxJson = LoadResourceFile('rdr3-shared', `resources/particle-fx.json`);
const ptfx = JSON.parse(ptfxJson) as PtfxJson;

const SPACING = 5.0;

type TxtData = {
  x: number;
  y: number;
  z: number;
  txt: string;
};

let DrawTxtData: TxtData[] = [];

const DrawTxtLoop = async () => {
  for (const txtData of DrawTxtData) {
    TxtAtWorldCoord(txtData.x, txtData.y, txtData.z, txtData.txt, 0.2, 0, 255);
  }
};

setTick(DrawTxtLoop);

const testPtfxDict = async (dict: string) => {
  const coords = PVGame.playerCoords(true);

  if (!(dict in ptfx)) return;

  const fxs = ptfx[dict];
  const fxCount = Object.values(fxs).length;

  let interval: NodeJS.Timeout | null = null;
  if (fxCount) {
    const columns = Math.ceil(Math.sqrt(fxCount));
    // Create Test grid of all fx in dict
    let n = 0;
    for (const [fxName, fxData] of Object.entries(fxs)) {
      const row = Math.floor(n / columns);
      const col = n % columns;

      const fxCoords: Vector3 = new Vector3(coords.x + col * SPACING, coords.y + row * SPACING, coords.z);

      const [found, groundZ] = GetGroundZFor_3DCoord(fxCoords.x, fxCoords.y, fxCoords.z, true);
      if (found) {
        fxCoords.z = groundZ + 1.0;
      }

      console.log(`Starting PTFX: Dict='${dict}' FX='${fxName}' at X=${fxCoords.x} Y=${fxCoords.y} Z=${fxCoords.z}`);
      const id = await PVWorld.startFxAtCoords(
        `ptfx_${dict}_${fxName}`,
        fxData.looped,
        dict,
        fxName,
        fxCoords,
        { x: 0, y: 0, z: 0 },
        1.0,
      );
      DrawTxtData.push({
        x: fxCoords.x,
        y: fxCoords.y,
        z: fxCoords.z - 0.25,
        txt: `${id}\n${dict}\n${fxName}\n${fxData.looped ? 'Looped' : 'Non-Looped'}`,
      });

      if (fxData.evolutions) {
        for (const evolution of fxData.evolutions) {
          // if (evolution === 'LOD') continue;
          console.log(` - Setting evolution: ${evolution} to 1.0`);
          PVWorld.setFxEvolution('ptfx_looped_test', evolution, 1.0);
        }
      }

      n++;
    }

    interval = setInterval(() => {
      n = 0;
      for (const [fxName, fxData] of Object.entries(fxs)) {
        const row = Math.floor(n / columns);
        const col = n % columns;

        if (fxData.looped) {
          n++;
          continue;
        }

        const fxCoords: Vector3 = new Vector3(coords.x + col * SPACING, coords.y + row * SPACING, coords.z);

        const [found, groundZ] = GetGroundZFor_3DCoord(fxCoords.x, fxCoords.y, fxCoords.z, true);
        if (found) {
          fxCoords.z = groundZ + 1.0;
        }

        console.log(`Starting PTFX: Dict='${dict}' FX='${fxName}' at X=${fxCoords.x} Y=${fxCoords.y} Z=${fxCoords.z}`);
        PVWorld.startFxAtCoords(
          `ptfx_${dict}_${fxName}`,
          fxData.looped,
          dict,
          fxName,
          fxCoords,
          { x: 0, y: 0, z: 0 },
          1.0,
        );

        n++;
      }
    }, 2_500);
  }

  await Delay(30_000);
  if (interval) clearInterval(interval);

  // Stop all fx in dict
  for (const [fxName, fxData] of Object.entries(fxs)) {
    console.log(`Stopping PTFX: Dict='${dict}' FX='${fxName}'`);
    PVWorld.stopFx(`ptfx_${dict}_${fxName}`);
  }
  DrawTxtData = [];
};

RegisterCommand(
  'ptfx_dict',
  async (source: number, args: any[], rawCommand: string) => {
    // console.log({ source, args, rawCommand });

    testPtfxDict(args[0]);
  },
  false,
);
