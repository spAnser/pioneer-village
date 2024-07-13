import { Log } from '@lib/client/comms/ui';
import { PVTarget } from '@lib/client';

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

// RequestStreamedTextureDict('pv_markers', true);

// const obj = 47874;
// const waterBottleCoords = GetEntityCoords(obj, false);
// let target = PlayerPedId();

// on('target:changed', (newTarget: number) => {
//   target = newTarget;
// });

// setTick(async () => {
//   // DrawMarker(
//   //   9,
//   //   waterBottleCoords[0],
//   //   waterBottleCoords[1],
//   //   waterBottleCoords[2] + 0.01,
//   //   0.0,
//   //   0.0,
//   //   0.0,
//   //   0.0,
//   //   0.0,
//   //   0.0,
//   //   0.25,
//   //   0.25,
//   //   0.25,
//   //   255,
//   //   255,
//   //   255,
//   //   255,
//   //   false,
//   //   false,
//   //   2,
//   //   true,
//   //   'pv_markers',
//   //   'pickup_circle',
//   //   false,
//   // );
//
//   target = await PVTarget.GetEntityPlayerIsLookingAt(9.9, 2.5, 4 + 1024);
//
//   if (!target || !(DoesEntityExist(target) || IsEntityAVehicle(target))) {
//     return;
//   }
//
//   const boneIndex = GetEntityBoneIndexByName(target, 'handle_dside_f');
//
//   let coords: number[];
//   if (boneIndex !== -1) {
//     coords = GetWorldPositionOfEntityBone(target, boneIndex);
//   } else {
//     coords = GetEntityCoords(target, true);
//   }
//
//   const forward = GetEntityForwardVector(target);
//   DrawMarker(
//     9,
//     coords[0] + forward[0] * -0.05,
//     coords[1] + forward[1] * -0.05,
//     coords[2] + 0.05,
//     0.0,
//     0.0,
//     0.0,
//     forward[0] * -45,
//     forward[1] * -45,
//     GetEntityHeading(target) - 90.0,
//     1.0,
//     1.0,
//     1.0,
//     255,
//     255,
//     255,
//     255,
//     false,
//     false,
//     2,
//     false,
//     'markers',
//     'locked',
//     false,
//   );
// });
