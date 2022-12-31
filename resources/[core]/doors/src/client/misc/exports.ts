import { exports } from '@lib/client';
import doorManager from '../managers/door-manager';

const lockDoor: Doors.LockDoor = (doorHash) => {
  doorManager.setDoorState(doorHash, 1);
};

const unlockDoor: Doors.UnlockDoor = (doorHash) => {
  doorManager.setDoorState(doorHash, 0);
};

const setDoorState: Doors.SetDoorState = (doorHash, state) => {
  doorManager.setDoorState(doorHash, state);
};

const getClosestDoor: Doors.GetClosestDoor = () => {
  return doorManager.getClosestDoor();
};

const closeDoor: Doors.CloseDoor = (doorHash: number, durationMultiplier = 1.0) => {
  doorManager.closeDoor(doorHash, durationMultiplier);
};

exports<'doors'>('lockDoor', lockDoor);
exports<'doors'>('unlockDoor', unlockDoor);
exports<'doors'>('setDoorState', setDoorState);
exports<'doors'>('getClosestDoor', getClosestDoor);
exports<'doors'>('closeDoor', closeDoor);
