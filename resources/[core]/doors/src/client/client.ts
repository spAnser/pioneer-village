import { onSocket } from '@lib/client/comms/ui';

import doorManager from './managers/door-manager';

import './misc/commands';
import './misc/events';
import './exports';

onSocket('doors.set-door-state', (doorHash: number, state: number, pairedHash?: number) => {
  doorManager.setDoorState(doorHash, state, false);
  if (pairedHash !== undefined && pairedHash !== null) {
    doorManager.setDoorState(pairedHash, state, false);
  }
});
