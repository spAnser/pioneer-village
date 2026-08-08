import blipController from './controllers/blip-controller';
import Blips from './data/blips';

setTimeout(() => {
  let b = 0;
  for (const blip of Blips) {
    blipController.register(`base:${b++}`, GetCurrentResourceName(), blip);
  }
}, 5e3);
