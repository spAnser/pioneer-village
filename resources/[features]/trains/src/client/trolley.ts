import { PVBase, PVGame, PVZone, onResourceStop } from '@lib/client';
import { Delay } from '@lib/functions';
import { Vector3 } from '@lib/math';

import TrackConfigs from './data';

const TrainTracks = TrackConfigs.TrainTracks;

let trolley = 0;
let trolleyDriver = 0;
const junctions: {
  junctionIndex: number;
  trackName: string;
  trackHash: number;
  index: number;
  coords: Vector3Format;
}[] = [];

const junctionSwitch: Record<string, boolean> = {};

let nextJunctionIndex = -1;

async function checkJunction() {
  const [trainTrack, junctionIndex] = Citizen.invokeNative(
    '0x09034479e6e3e269',
    trolley,
    Citizen.pointerValueInt(),
    Citizen.pointerValueInt(),
  );

  if (nextJunctionIndex === -1) {
    nextJunctionIndex = junctionIndex;
    console.log(`Setting Next Junction Index to ${nextJunctionIndex}`);
  }

  // console.log('junctionIndex', junctionIndex);

  const trainCoords = Vector3.fromArray(GetEntityCoords(trolley, true, true));
  for (const junction of junctions) {
    if (trainTrack !== junction.trackHash) continue;
    const distance = trainCoords.getDistance(junction.coords);
    if (distance < 5 && nextJunctionIndex === junction.junctionIndex) {
      console.log(
        `Trolley is on ${junction.trackName} next junction is ${nextJunctionIndex}, near the junction ${junction.junctionIndex}:`,
        distance,
      );
      nextJunctionIndex = -1;

      if (!(`${junction.trackName}_${junction.junctionIndex}` in junctionSwitch)) {
        junctionSwitch[`${junction.trackName}_${junction.junctionIndex}`] = false;
      }

      let nextCheck = 5_000;
      if (!junctionSwitch[`${junction.trackName}_${junction.junctionIndex}`]) {
        await Delay(nextCheck);
        nextCheck = 1;
        SetTrainTrackJunctionSwitch(junction.trackHash, junction.junctionIndex, true);
        console.log(`SetTrainTrackJunctionSwitch(${junction.trackHash}, ${junction.junctionIndex}, true);`);
        junctionSwitch[`${junction.trackName}_${junction.junctionIndex}`] = true;
      } else {
        await Delay(nextCheck);
        nextCheck = 1;
        SetTrainTrackJunctionSwitch(junction.trackHash, junction.junctionIndex, false);
        console.log(`SetTrainTrackJunctionSwitch(${junction.trackHash}, ${junction.junctionIndex}, false);`);
        junctionSwitch[`${junction.trackName}_${junction.junctionIndex}`] = false;
      }
      setTimeout(checkJunction, 5_000);
      return;
    }
  }
  setTimeout(checkJunction, 1_000);
}

async function spawnTrolley() {
  const trainHash = GetHashKey('trolley_config_2');
  console.log(trainHash);
  const wagonCount = GetNumCarsFromTrainConfig(trainHash);
  console.log(wagonCount);
  for (let n = wagonCount; n--; ) {
    const trainWagonModel = GetTrainModelFromTrainConfigByCarIndex(trainHash, n);
    await PVGame.loadModel(trainWagonModel);
  }
  const train = CreateMissionTrain(trainHash, 2631.914, -1281.219, 51.20428, false, false, true, true);
  SetTrainStopsForStations(train, true);
  // Citizen.invokeNative('0xe6bd7dd3fd474415', train, true); // _SET_TRAIN_COLLISION_AVOIDANCE_ENABLED

  let tries = 0;
  let driver = GetPedInVehicleSeat(train, -1);
  while (!DoesEntityExist(driver)) {
    await Delay(50);
    driver = GetPedInVehicleSeat(train, -1);
    if (tries++ > 20) {
      console.error('Failed to get driver ped for train');
      PVBase.deleteEntity(train);
      return;
    }
  }

  SetVehicleExtra(train, 1, false);
  SetVehicleExtra(train, 2, true);
  Citizen.invokeNative('0xdd100ce1ebbf37e3', train, 0);
  Citizen.invokeNative('0xa72b1bf3857b94d7', train, true);
  Citizen.invokeNative('0x1bfbafcc6760ff02', train, false);
  Citizen.invokeNative('0x0794199b25e499e1', train, false);
  Citizen.invokeNative('0xae7e66a61e7c17a5', train, true);
  Citizen.invokeNative('0xef28a614b4b264b8', train, true);

  trolley = train;
  trolleyDriver = driver;
  SetEntityAsMissionEntity(driver, true, true);
  SetEntityInvincible(driver, true);
  SetPedResetFlag(driver, 245, true);

  setTimeout(checkJunction, 1_000);
}

const trolleyConfigs = [
  'nb_trolley_track_config',
  'nb_trolley_track_config_temp',
  'trolley3',
  'trolley4',
  'trolley_intersection2',
  'trolley_intersection3',
  'trolley_intersection5',
];

async function trolleyZones() {
  for (const [trackConfigName, trackConfig] of Object.entries(TrainTracks)) {
    if (!trolleyConfigs.includes(trackConfigName)) continue;

    // if ('1' in trackConfig.flags.bits || '2' in trackConfig.flags.bits) {
    //   console.log(trackConfigName);
    //   console.log(trackConfig.flags.bits['1']);
    //   console.log(trackConfig.flags.bits['2']);
    // }

    if ('8' in trackConfig.flags.bits) {
      // console.log(trackConfigName);
      let n = -1;
      const nodes = trackConfig.flags.bits['8'].nodes;
      for (const junction of nodes) {
        n++;
        // console.log('junction', junction);

        const node = trackConfig.nodes[junction.index];

        // console.log('junction.index', junction.index);
        junctions.push({
          junctionIndex: n,
          trackName: trackConfigName,
          trackHash: GetHashKey(trackConfigName),
          index: junction.index,
          coords: { x: node.position[0], y: node.position[1], z: node.position[2] },
        });
      }
    }
  }
}

trolleyZones();
// spawnTrolley();

// const a = new Vector3(2726.71, -1143.25, 48.9782);
// const b = new Vector3(2799.41, -1185.41, 46.401);
// 1  0b00001
// 4  0b00100
// 5  0b00101
// 7  0b00111
// 8  0b01000
// 15 0b01111
// 16 0b10000
// 23 0b10111

// const volume = CreateVolumeBox(2763.06, -1164.33, 47.6896, 0, 0, 59.8, 3.5, 45.1, 10.5);
// console.log('volume', volume);
// AddNavmeshBlockingVolume(volume, 15);
// AddAmbientAvoidanceRestriction(volume, 0, 0, 0, -1, -1, 8);
// setTimeout(() => {
//   console.log(`DoesNavmeshBlockingVolumeExist(${volume})`, DoesNavmeshBlockingVolumeExist(volume));
// }, 1_000);
//

// PVZone.AddBox(
//   'tram_line',
//   { x: 2793.922, y: -1326.734, z: 48.91198 },
//   { x: 10.85562, y: 100.127, z: 11.07461 },
//   -40.99868,
//   {
//     debug: true,
//   },
// );
//
// onResourceStop(() => {
//   if (trolley) {
//     PVBase.deleteEntities([trolley, trolleyDriver]);
//   }
//   RemoveNavmeshBlockingVolume(volume);
//   RemoveAmbientAvoidanceRestriction(volume);
//   DeleteVolume(volume);
//   console.log('DoesNavmeshBlockingVolumeExist', DoesNavmeshBlockingVolumeExist(volume));
// });
