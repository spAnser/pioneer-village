import worldController from './controllers/world-controller';
import { Vector3 } from '@lib/math';

/*
 * Serial Killer Cellar.
 */
const doorCoords = new Vector3(-609.7892456054688, 522.194580078125, 96.08792877197266);
const doorRot = new Vector3(9.34038352966308, 0.22028501331806, 39.96985626220703);

setTimeout(() => {
  worldController.register(GetHashKey('P_CS_LUC_BASEDR'), doorCoords, doorRot, 'serial::cellar-door-l');
  worldController.register(GetHashKey('P_CS_LUC_BASEDR_1'), doorCoords, doorRot, 'serial::cellar-door-r');
}, 5000);
