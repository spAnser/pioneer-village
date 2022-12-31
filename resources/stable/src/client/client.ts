import stableController from './controllers/stable-controller';

import Stables from '../shared/data/stables';
import { zoneBoxSetup, zonePolySetup } from '@lib/client';

for (const stable of Stables) {
  stableController.addStable(stable);
}

const zonePrefix = 'stable:';

const registerStableZones = () => {
  for (const stable of Stables) {
    console.log('adding zone', stable.identifier);
    zonePolySetup({
      name: `${zonePrefix}${stable.identifier}`,
      minZ: 114.0,
      maxZ: 123.0,
      coords: stable.zones.interior,
      onEnter() {
        console.log(`Entered ${stable.identifier}`);
        stableController.enterStable(stable.identifier);
      },
      onExit() {
        console.log(`Exited ${stable.identifier}`);
        stableController.exitStable();
      },
    });
  }
};

if (GetResourceState('plouffe_lib') === 'started') {
  registerStableZones();
}

on('onResourceStart', (resource: string) => {
  if (resource === 'plouffe_lib') {
    registerStableZones();
  }
});
