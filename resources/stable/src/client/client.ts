import stableController from './controllers/stable-controller';

import Stables from '../shared/data/stables';
// import { PVZone } from '@lib/client';
import { addZone, removeZone } from '@lib/client';
import { debounce } from '@lib/functions';

for (const stable of Stables) {
  stableController.addStable(stable);
}

const zonePrefix = 'stable:';

const registerStableZones = () => {
  for (const stable of Stables) {
    // console.log('adding zone', stable.identifier);
    // PVZone.CreatePoly(`${zonePrefix}${stable.identifier}`, stable.zones.interior, 114.0, 123.0, { debug: true },);
    addZone({
      _type: 'poly',
      name: `${zonePrefix}${stable.identifier}`,
      coords: stable.zones.interior,
      minZ: 0,
      maxZ: 999,
      options: { debug: false, delayExit: 5000 },
      onEnter() {
        console.log(`Entered ${stable.identifier}`);
        stableController.enterStable(stable.identifier);
      },
      onExit() {
        console.log(`Exited ${stable.identifier}`);
        stableController.exitStable(stable.identifier);
      },
    });
  }
};

if (GetResourceState('zones') === 'started') {
  registerStableZones();
}

on('onResourceStart', (resource: string) => {
  if (resource === 'zones') {
    registerStableZones();
  }
});
