import './test';

// import worldController from './controllers/world-controller';
// import { Vector3 } from '@lib/math';
//
// const doorCoords = new Vector3(-609.7892456054688, 522.194580078125, 96.08792877197266);
//
// const doorRot = new Vector3(9.34038352966308, 0.22028501331806, 39.96985626220703);
//
// setTimeout(() => {
//   worldController.register(GetHashKey('P_CS_LUC_BASEDR'), doorCoords, doorRot, 'serial::cellar-door-l');
//   worldController.register(GetHashKey('P_CS_LUC_BASEDR_1'), doorCoords, doorRot, 'serial::cellar-door-r');
// }, 5000);
//
// on('onResourceStop', (resourceName: string) => {
//   if (resourceName === 'world') {
//     // worldController.cleanUp();
//   }
// });

// TODO: Needs entire rewrite to work on server only for networked items and client only for non networked items

onNet('world.set-coord-rot', (netId: number, coord: Vector3Format, rot: Vector3Format) => {
  const entityId = NetworkGetEntityFromNetworkId(netId);
  if (entityId) {
    SetEntityCoords(entityId, coord.x, coord.y, coord.z, false, false, false, false);
    SetEntityRotation(entityId, rot.x, rot.y, rot.z, 0, false);
  } else {
    // TODO: Fix owns entity but doesn't exist if far away.
  }
});
