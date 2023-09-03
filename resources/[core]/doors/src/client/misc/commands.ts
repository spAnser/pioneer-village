import doorManager from '../managers/door-manager';
import { Log } from '@lib/client/comms/ui';

RegisterCommand(
  'door_closest',
  async () => {
    Log(doorManager.getClosestDoor());
  },
  false,
);

RegisterCommand(
  'door_lock',
  async () => {
    const doorHash = doorManager.getClosestDoor();
    if (!doorHash) {
      return;
    }

    doorManager.setDoorState(doorHash, 1);
  },
  false,
);

RegisterCommand(
  'door_unlock',
  async () => {
    const doorHash = doorManager.getClosestDoor();
    if (!doorHash) {
      return;
    }

    doorManager.setDoorState(doorHash, 0);
  },
  false,
);
