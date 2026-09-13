import { Vector3 } from '@lib/math';

const coordA = new Vector3(2895.27, -1268.67, 45.81);
const coordB = new Vector3(2897.34, -1287.41, 43.09);

console.log(coordB.getDistance(coordA));
