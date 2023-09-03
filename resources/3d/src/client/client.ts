import { exports } from '@lib/client';

import { Vector3 } from '@lib/math/vector3';
import { emitUI } from '@lib/client';
import { Log } from '@lib/client/comms/ui';

let active = false;
let lastFov = 0;
let lastCamCoords = new Vector3();
let lastCamRot = new Vector3();
let lastTargetCoords = new Vector3();
let lastTargetRot = new Vector3();

const playerId = PlayerId();
const playerPed = PlayerPedId();

setInterval(() => {
  if (
    IsPedSprinting(playerPed) ||
    IsPedRunning(playerPed) ||
    GetVehiclePedIsIn(playerPed, false) ||
    IsPlayerFreeAiming(playerId)
  ) {
    if (active) {
      active = false;
      emitUI('threejs.state', { show: false });
    }
    return;
  }
  active = true;
  const fov = GetGameplayCamFov();
  const cameraCoords = Vector3.fromArray(GetGameplayCamCoord());
  const cameraRot = Vector3.fromArray(GetGameplayCamRot(3));
  const targetCoords = Vector3.fromArray(GetEntityCoords(playerPed, false));
  const targetRot = Vector3.fromArray(GetEntityRotation(playerPed, 3));

  let sendData = false;

  if (
    Math.abs(fov - lastFov) > 0.5 ||
    cameraCoords.getDistance(lastCamCoords) > 0.01 ||
    cameraRot.getDistance(lastCamRot) > 2.5 ||
    targetCoords.getDistance(lastTargetCoords) > 0.01 ||
    targetRot.getDistance(lastTargetRot) > 2.5
  ) {
    lastFov = fov;
    lastCamCoords = cameraCoords;
    lastCamRot = cameraRot;
    lastTargetCoords = targetCoords;
    lastTargetRot = targetRot;
    sendData = true;
  }

  if (sendData) {
    emitUI('threejs.state', {
      show: active,
      fov,
      cameraPosition: cameraCoords.toObject(),
      cameraRotation: cameraRot.toObject(),
      targetPosition: targetCoords.toObject(),
      targetRotation: targetRot.toObject(),
    });
  }
}, 35);

const loadModel = (model: number | string): Promise<void> => {
  if (typeof model === 'string') {
    model = GetHashKey(model);
  }
  return new Promise((resolve) => {
    RequestModel(model);
    if (HasModelLoaded(model)) {
      resolve();
    } else {
      const interval = setInterval(() => {
        if (HasModelLoaded(model)) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    }
  });
};

RegisterCommand(
  'object',
  async (source: number, args: string[]) => {
    const model = GetHashKey(args[0]);
    if (!IsModelValid(model)) {
      Log('invalid model');
      return;
    }

    await loadModel(model);
    const coords = GetEntityCoords(PlayerPedId(), true);
    const entity = CreateObject(model, coords[0] + 1, coords[1], coords[2] - 1.0, true, true, false);
    SetEntityRotation(entity, 0.0, 0.0, 0.0, 2, false);
    Log('spawned', entity);
  },
  false,
);

RequestStreamedTextureDict('gassm_markers', true);

// const obj = 47874;
// const waterBottleCoords = GetEntityCoords(obj, false);
let target = 576514;

on('target:changed', (newTarget: number) => {
  target = newTarget;
});

setTick(() => {
  // DrawMarker(
  //   9,
  //   waterBottleCoords[0],
  //   waterBottleCoords[1],
  //   waterBottleCoords[2] + 0.01,
  //   0.0,
  //   0.0,
  //   0.0,
  //   0.0,
  //   0.0,
  //   0.0,
  //   0.25,
  //   0.25,
  //   0.25,
  //   255,
  //   255,
  //   255,
  //   255,
  //   false,
  //   false,
  //   2,
  //   true,
  //   'gassm_markers',
  //   'pickup_circle',
  //   false,
  // );

  if (!target || !DoesEntityExist(target) || !IsEntityAVehicle(target)) {
    return;
  }

  const boneIndex = GetEntityBoneIndexByName(target, 'handle_dside_f');

  let coords: number[];

  if (boneIndex) {
    coords = GetWorldPositionOfEntityBone(target, boneIndex);
  } else {
    coords = GetEntityCoords(target, true);
  }

  const forward = GetEntityForwardVector(target);

  DrawMarker(
    9,
    coords[0] + forward[0] * -0.05,
    coords[1] + forward[1] * -0.05,
    coords[2] + 0.05,
    0.0,
    0.0,
    0.0,
    forward[0] * -45,
    forward[1] * -45,
    GetEntityHeading(target) - 90.0,
    0.25,
    0.25,
    1.0,
    255,
    255,
    255,
    255,
    false,
    false,
    2,
    false,
    'gassm_markers',
    'locked',
    false,
  );
});
