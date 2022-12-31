import { onSocket } from '@lib/client/comms/ui';

import doorManager from './managers/door-manager';

import './misc/commands';
import './misc/events';
import './misc/exports';

onSocket('doors.set-door-state', (doorHash: number, state: number) => {
  // console.log('doors.set-door-state', doorHash, state);
  doorManager.setDoorState(doorHash, state, false);
});
