import { exports } from '@lib/client';

import doorManager from './managers/door-manager';
import { registerDoorHook, DoorHookType } from './misc/hooks';

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

const getClosestDoorToCoords: Doors.GetClosestDoorToCoords = (coords: Vector3Format) => {
  return doorManager.getClosestDoorToCoords(coords);
};

const closeDoor: Doors.CloseDoor = (doorHash: number, durationMultiplier = 1.0) => {
  doorManager.closeDoor(doorHash, durationMultiplier);
};

const attemptLockpick: Doors.AttemptLockpick = (doorHash) => {
  doorManager.attemptLockpick(doorHash);
};

const onDoorHook: Doors.OnDoorHook = (id, type, doorHash, fn) => registerDoorHook(id, type, doorHash, fn);

exports<'doors'>('lockDoor', lockDoor);
exports<'doors'>('unlockDoor', unlockDoor);
exports<'doors'>('setDoorState', setDoorState);
exports<'doors'>('getClosestDoor', getClosestDoor);
exports<'doors'>('getClosestDoorToCoords', getClosestDoorToCoords);
exports<'doors'>('closeDoor', closeDoor);
exports<'doors'>('attemptLockpick', attemptLockpick);
exports<'doors'>('onDoorHook', onDoorHook);
