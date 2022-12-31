import doorManager from '../managers/door-manager';

RegisterCommand(
  'door_closest',
  async () => {
    console.log(doorManager.getClosestDoor());
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
