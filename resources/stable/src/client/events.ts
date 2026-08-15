import { PVGame, PVGameEvents, PVInventory, PVZone } from '@lib/client';
import { awaitUI } from '@lib/client';
import { PedConfigFlag } from '@lib/flags';
import { Delay } from '@lib/functions';
import { Vector3 } from '@lib/math';

import StableData from '../shared/data/stableData';
import { ZonePrefix } from './config';
import peltController from './controllers/pelt-controller';
import stableController from './controllers/stable-controller';

on('stable:client:lead', (pEntity: number, pArgs: Record<string, any>) => {
  console.log('stable:client:lead', pEntity, pArgs);
  ClearPedTasks(pEntity, false, false);
  TaskLeadHorse(PVGame.playerPed(), pEntity);
});

on('stable:client:remove-pelt', (pEntity: number, pArgs: Record<string, any>) => {
  console.log('stable:client:remove-pelt', pEntity, pArgs);
  peltController.removePelt(pEntity);
});

on('stable:client:horse-inv', (pEntity: number, pArgs: Record<string, any>) => {
  console.log('stable:client:horse-inv', pEntity, pArgs);

  const horseId = pEntity && Entity(pEntity).state.horseId;
  // console.log('Horse ID:', horseId);
  if (!horseId) {
    return false;
  }

  console.log(`Opening inventory for horse ${horseId} on entity ${pEntity}`);

  PVInventory.openInventory(`horse:${horseId}`);
});

on('stable:client:stable-horse', (pEntity: number, pArgs: Record<string, any>) => {
  console.log('stable:client:stable-horse', pEntity, pArgs);
  const horseId = Entity(pEntity).state.horseId;
  if (!horseId) {
    return;
  }

  const zoneNames = StableData.map((s) => `${ZonePrefix}${s.identifier}`);
  const inZone = PVZone.IsEntityInZones(zoneNames, pEntity);
  if (inZone) {
    stableController.stableHorse(pEntity, horseId, inZone.replace(ZonePrefix, ''));
  }

  if (IsPedLeadingHorse(PVGame.playerPed())) {
    ClearPedTasks(PVGame.playerPed(), false, false);
  }

  SetPedConfigFlag(pEntity, PedConfigFlag.Unridable, true);
});

on('stable:client:unstable-horse', async (pEntity: number, pArgs: Record<string, any>) => {
  console.log('stable:client:unstable-horse', pEntity, pArgs);
  const horseId = DecorGetInt(pEntity, 'horseId');
  if (!horseId) {
    return;
  }
  const currentStable = stableController.currentStableData();
  const stallIndex = stableController.getHorseStall(pEntity) ?? -1;
  console.log(`Current stable for horse ${horseId}:`, currentStable, stallIndex);
  stableController.unstableHorse(horseId, pEntity);

  const interiorBounds = currentStable?.zones?.interior || [];
  if (interiorBounds.length) {
    console.log('Moving horse to random point in stable interior');

    console.log('Stall Doors:', currentStable?.stallDoors);
    const stallDoor = currentStable?.stallDoors?.[stallIndex];
    console.log(`Stall door for stall index ${stallIndex}: ${stallDoor}`);
    if (currentStable?.stallDoors) {
      console.log(currentStable?.stallDoors[stallIndex]);
    }
    if (stallDoor) {
      DoorSystemSetOpenRatio(stallDoor, 0.5, false);
    }

    TaskFollowToOffsetOfEntity(
      pEntity,
      PVGame.playerPed(),
      0,
      0,
      0,
      2.5,
      20_000,
      0.5,
      true,
      true,
      false,
      false,
      false,
      false,
    );

    await Delay(5_000);

    if (stallDoor) {
      DoorSystemSetOpenRatio(stallDoor, 0, false);
    }
  }
});

on('stable:client:birth_foal', async (pEntity: number, pArgs: Record<string, any>) => {
  console.log('stable:client:birth_foal', pEntity, pArgs);
  const horseId = DecorGetInt(pEntity, 'horseId');
  if (!horseId) {
    return;
  }
  const canBirth = await awaitUI('stable.can-birth-foal', horseId);
  console.log('Can birth:', canBirth);
  if (!canBirth) {
    return;
  }
  stableController.birthFoal(pEntity, horseId);
});

on('stable:client:detach', async (pEntity: number, pArgs: Record<string, any>) => {
  console.log('stable:client:detach', pEntity, pArgs);

  const wagon = GetVehicleDraftHorseIsAttachedTo(pEntity);
  console.log(`Wagon: ${wagon}`);
  if (!wagon) {
    return;
  }

  // DetachDraftVehicleHarnessPed(wagon, pEntity);

  const wagonModel = GetEntityModel(wagon);

  const harnesses = GetNumDraftVehicleHarnessPed(wagonModel);
  console.log(`Harnesses: ${harnesses}`);

  for (let i = 0; i < harnesses; i++) {
    const horse = GetPedInDraftHarness(wagon, i);
    console.log(`Horse in harness ${i}: ${horse}`, horse === pEntity);
    if (horse === pEntity) {
      // PVGame.getNetworkControlOfNetworkId();
      DetachDraftVehicleHarnessFromIndex(wagon, i);
      await Delay(250);
      ClearPedTasksImmediately(pEntity);
      break;
    }
  }
});

on('stable:client:attach', async (pEntity: number, pArgs: Record<string, any>) => {
  console.log('stable:client:attach', pEntity, pArgs);

  // const wagon = GetLastVehicleDraftHorseWasAttachedTo(pEntity);
  const wagon = NetworkGetEntityFromNetworkId(171);
  console.log(`Wagon: ${wagon}`);
  if (!wagon) {
    return;
  }

  const horseCoords = Vector3.fromArray(GetEntityCoords(pEntity, true));
  const wagonCoords = Vector3.fromArray(GetEntityCoords(wagon, true));

  if (horseCoords.getDistance(wagonCoords) > 8) {
    return;
  }

  const wagonModel = GetEntityModel(wagon);

  const harnesses = GetNumDraftVehicleHarnessPed(wagonModel);
  console.log(`Harnesses: ${harnesses}`);

  for (let i = 0; i < harnesses; i++) {
    const horse = GetPedInDraftHarness(wagon, i);
    console.log(`Horse in harness ${i}: ${horse}`, horse === pEntity);
    if (horse === 0) {
      const horseNetId = NetworkGetNetworkIdFromEntity(pEntity);
      const wagonNetId = NetworkGetNetworkIdFromEntity(wagon);
      console.log(`Requesting network control of horse ${pEntity} (${horseNetId}) and wagon ${wagon} (${wagonNetId})`);
      await PVGame.getNetworkControlOfEntity(horseNetId);
      await PVGame.getNetworkControlOfEntity(wagonNetId);
      console.log(`Got network control of horse ${pEntity} and wagon ${wagon}`);
      SetPedConfigFlag(pEntity, PedConfigFlag.CanActivateRagdollWhenVehicleUpsideDown, false);
      SetPedConfigFlag(pEntity, PedConfigFlag.CantWitnessCrimes, true);
      SetPedConfigFlag(pEntity, PedConfigFlag.DisableEvasiveStep, true);
      SetPedConfigFlag(pEntity, 304, false);
      Citizen.invokeNative('0xe31a04513237dc89', pEntity);
      AttachDraftVehicleHarnessPed(pEntity, wagon, i);
      console.log(`AttachDraftVehicleHarnessPed(${pEntity}, ${wagon}, ${i});`);
      break;
    }
  }
});

PVGameEvents.register('EVENT_PED_WHISTLE', (data) => {
  console.log('EVENT_PED_WHISTLE', data);
  const playerPed = PlayerPedId();

  if (data._0 !== playerPed) {
    return;
  }

  stableController.whistleLastOrNearby(data._1);
});

// Generate random point within the scaled quadrilateral using triangulation
function getRandomPointInQuad(quad: Vector2Format[]): Vector2Format {
  // Split quadrilateral into two triangles
  const triangle1: Vector2Format[] = [quad[0], quad[1], quad[2]];
  const triangle2: Vector2Format[] = [quad[0], quad[2], quad[3]];

  // Calculate areas of both triangles
  const area1: number =
    Math.abs(
      (triangle1[1].x - triangle1[0].x) * (triangle1[2].y - triangle1[0].y) -
        (triangle1[2].x - triangle1[0].x) * (triangle1[1].y - triangle1[0].y),
    ) / 2;

  const area2: number =
    Math.abs(
      (triangle2[1].x - triangle2[0].x) * (triangle2[2].y - triangle2[0].y) -
        (triangle2[2].x - triangle2[0].x) * (triangle2[1].y - triangle2[0].y),
    ) / 2;

  // Choose triangle based on area proportion
  const totalArea: number = area1 + area2;
  const useTriangle1: boolean = Math.random() < area1 / totalArea;
  const selectedTriangle: Vector2Format[] = useTriangle1 ? triangle1 : triangle2;

  // Generate random point in selected triangle using barycentric coordinates
  let r1: number = Math.random();
  let r2: number = Math.random();

  // Ensure point is inside triangle
  if (r1 + r2 > 1) {
    r1 = 1 - r1;
    r2 = 1 - r2;
  }

  const r3: number = 1 - r1 - r2;

  return {
    x: r1 * selectedTriangle[0].x + r2 * selectedTriangle[1].x + r3 * selectedTriangle[2].x,
    y: r1 * selectedTriangle[0].y + r2 * selectedTriangle[1].y + r3 * selectedTriangle[2].y,
  };
}
