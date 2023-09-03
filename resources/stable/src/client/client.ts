import stableController from './controllers/stable-controller';

import Stables from '../shared/data/stables';
import { addZone, onResourceInit } from '@lib/client';
import { Log } from '@lib/client/comms/ui';

for (const stable of Stables) {
  stableController.addStable(stable);
}

const zonePrefix = `${GetCurrentResourceName()}::`;

const registerStableZones = async () => {
  Log('registerStableZones');
  for (const stable of Stables) {
    // Log('adding zone', stable.identifier);
    // PVZone.CreatePoly(`${zonePrefix}${stable.identifier}`, stable.zones.interior, 114.0, 123.0, { debug: true },);
    addZone({
      _type: 'poly',
      name: `${zonePrefix}${stable.identifier}`,
      coords: stable.zones.interior,
      minZ: 0,
      maxZ: 999,
      options: { debug: false, delayExit: 5000 },
      onEnter() {
        Log(`Entered ${stable.identifier}`);
        stableController.enterStable(stable.identifier);
      },
      onExit() {
        Log(`Exited ${stable.identifier}`);
        stableController.exitStable(stable.identifier);
      },
    });
  }
};

onResourceInit('zones', registerStableZones);
