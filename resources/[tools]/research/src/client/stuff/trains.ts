import { DrawLine, PVBase, PVGame, TxtAtWorldCoord, onResourceStop } from '@lib/client';
import { Delay } from '@lib/functions';
import { Vector3 } from '@lib/math';
import { BlipModifiers, BlipSprites, BlipStyles } from '@lib/shared/blips';

const TRAIN_TRACK = [
  'TRAINS1',
  'TRAINS2',
  'TRAINS3',
  'TROLLEY1',
  'TROLLEY2',
  'TROLLEY3',
  'TROLLEY4',
  'MINECART_JAM3_4',
  'RIVERS1',
  'TROLLEY_INTERSECTION2',
  'TROLLEY_INTERSECTION3',
  'TROLLEY_INTERSECTION5',
  'TRAINS_NB1',
  'TRAINS_NB2',
  'TRAINS_NB3',
  'TRAINS_ROB3',
  'TRAINS_INTERSECTION1_3',
  'TRAINS_INTERSECTION2_3',
  'TRAINS_INTERSECTION1_ANN',
  'TRAINS_INTERSECTION2_ANN',
  'TRAINS_INTERSECTION3_COR',
  'TRAINS_INTERSECTION1_APP',
  'TRAINS_ROB3',
  'TRAINS_OLD_WEST03',
  'TRAINS_OLD_WEST02',
  'TRAINS_OLD_WEST01',
  'TRAINS_OLD_WEST_INTERSECTION02',
  'TRAINS_OLD_WEST_INTERSECTION01',
  'FREIGHT_NB1_INTER',
  'FREIGHT_GROUP',
];

const TRAIN_TRACK_HASHES: Record<number, string> = {};
for (const name of TRAIN_TRACK) {
  const hash = GetHashKey(name);
  TRAIN_TRACK_HASHES[hash] = name;
}

RegisterCommand(
  'train_track_junctions',
  async (source: number, args: any[], rawCommand: string) => {
    // console.log({ source, args, rawCommand });

    const junctionCoords = new Map<
      string,
      {
        coords: Vector3Format;
        trackJIndex: string[];
      }
    >();

    const TRACK_JUNCTIONS: Record<string, { junctionIndex: number; coords: Vector3Format }[]> = {};

    for (const [trainTrackKey, trainTrack] of Object.entries(TRAIN_TRACK_HASHES)) {
      const trainTrackHash = Number(trainTrackKey);
      let total = 0;
      try {
        for (let n = 0; n < 999; n++) {
          const coords = Vector3.fromArray(
            Citizen.invokeNative('0x785639d89f8451ab', trainTrackHash, n, Citizen.resultAsVector()),
          );

          const [ret, juncIndex] = GetTrainTrackJunctionAtCoords(trainTrackHash, coords.x, coords.y, coords.z);

          if (!ret) continue;

          if (juncIndex !== n) {
            // console.log(`Junction index mismatch for ${trainTrack} at index ${n}: expected ${n}, got ${juncIndex}`);
            continue;
          }

          // console.log(n, coords);
          const coordsKey = coords.toString();

          if (junctionCoords.has(coordsKey)) {
            // junctionCoords.get(coordsKey)?.trackJIndex.push(`${trainTrack}${n}`);
            junctionCoords.get(coordsKey)?.trackJIndex.push(`${n}`);
          } else {
            junctionCoords.set(coordsKey, {
              coords: coords,
              // trackJIndex: [`${trainTrack}${n}`],
              trackJIndex: [`${n}`],
            });
          }

          if (!TRACK_JUNCTIONS[trainTrack]) {
            TRACK_JUNCTIONS[trainTrack] = [];
          }

          TRACK_JUNCTIONS[trainTrack].push({
            junctionIndex: n,
            coords: {
              x: Number(coords.x.toFixed(3)),
              y: Number(coords.y.toFixed(3)),
              z: Number(coords.z.toFixed(3)),
            },
          });

          total++;
        }
      } catch {}
      // console.log(`Found ${total} junctions for ${trainTrack}`);
    }

    console.log(TRACK_JUNCTIONS);

    for (const [key, junction] of junctionCoords.entries()) {
      console.log(`Registering junction blip for ${key} with ${junction.trackJIndex.length} tracks`);
      // console.log(junction.trackJIndex.join('\n'));
      PVBase.blipRegister(key, {
        type: 'sprite',
        label: junction.trackJIndex.join(','),
        sprite: BlipSprites.MISSION_BG,
        modifiers: [BlipModifiers.LIGHT_BLUE],
        coords: junction.coords,
        style: BlipStyles.FRIENDLY,
      });
    }
  },
  false,
);

let TRAIN_DEBUG = false;
const FREIGHT_GROUP = GetHashKey('TRAINS3');

// SetTrainTrackJunctionSwitch(`FREIGHT_GROUP`, 11, false)
// IN(0x3ABFA128F5BF5A70, `FREIGHT_GROUP`, 11, false)

async function trainDebug() {
  if (!TRAIN_DEBUG) return;
  const vehicle = GetVehiclePedIsIn(PlayerPedId(), false);

  let trainTrack = '';
  let trainTrackHash = 0;
  let junctionIndex = -1;
  let coords = new Vector3();

  const tick = setTick(() => {
    if (trainTrackHash && junctionIndex !== -1) {
      TxtAtWorldCoord(
        coords.x,
        coords.y,
        coords.z,
        `Train Track: ${trainTrack || trainTrackHash}, Junction Index: ${junctionIndex}`,
        0.25,
      );
    }

    const playerCoords = Vector3.fromArray(GetEntityCoords(PlayerPedId(), false, false));

    const [ret, juncIndex] = GetTrainTrackJunctionAtCoords(
      FREIGHT_GROUP,
      playerCoords.x,
      playerCoords.y,
      playerCoords.z,
    );

    if (ret) {
      const juncCoords = Vector3.fromArray(
        Citizen.invokeNative('0x785639d89f8451ab', FREIGHT_GROUP, juncIndex, Citizen.resultAsVector()),
      );
      TxtAtWorldCoord(
        juncCoords.x,
        juncCoords.y,
        juncCoords.z,
        `Train Track: FREIGHT_GROUP, Junction Index: ${juncIndex}`,
        0.25,
      );
    }
  });

  while (TRAIN_DEBUG) {
    [trainTrackHash, junctionIndex] = Citizen.invokeNative(
      '0x09034479e6e3e269',
      vehicle,
      Citizen.pointerValueInt(),
      Citizen.pointerValueInt(),
    );

    if (trainTrackHash && junctionIndex !== -1) {
      coords = Vector3.fromArray(
        Citizen.invokeNative('0x785639d89f8451ab', trainTrackHash, junctionIndex, Citizen.resultAsVector()),
      );

      trainTrack = TRAIN_TRACK_HASHES[trainTrackHash] || '';

      TxtAtWorldCoord(
        coords.x,
        coords.y,
        coords.z,
        `Train Track: ${trainTrack}, Junction Index: ${junctionIndex}`,
        0.25,
      );
    }

    await Delay(1000);
  }

  clearTick(tick);
}

RegisterCommand(
  'train_debug',
  () => {
    TRAIN_DEBUG = !TRAIN_DEBUG;
    if (!TRAIN_DEBUG) return;
    trainDebug();
  },
  false,
);

(async () => {
  const obj = await PVGame.createObject(
    's_railswitch01x_cmbd',
    { x: -277.17, y: -316.1038, z: 87.8 },
    { x: 0, y: 0, z: 207.0 },
    false,
  );

  onResourceStop(() => {
    PVBase.deleteEntity(obj);
  });
})();
