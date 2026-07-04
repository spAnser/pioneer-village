import { PVBase, PVGame } from '@lib/client';
import { emitSocket, emitUI, onUI } from '@lib/client/comms/ui';
import { Delay, lerp } from '@lib/functions';
import { Vector3 } from '@lib/math';

import doorManager from '../managers/door-manager';
import { doorOpenAnim } from './anim-tasks';
import { runDoorHooks } from './hooks';

const INTERACT_DISTANCE = 3.0;
const LOCKPICK_DISTANCE = 2.0;

// ---- Notifications ----

const notify = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
  const colors: Record<string, ['primary' | 'success' | 'danger' | 'warning', 'white']> = {
    success: ['success', 'white'],
    error: ['danger', 'white'],
    info: ['primary', 'white'],
  };
  const [bg, fg] = colors[type];
  emitUI('notification.notify', text, 3000, bg, fg, false);
};

// ---- Door toggle logic ----

const toggleDoor = async (doorHash: number) => {
  console.log('[doors] toggleDoor called, doorHash:', doorHash);

  const hasKey = await doorManager.hasDoorKey(doorHash);
  console.log('[doors] hasDoorKey result:', hasKey);
  if (!hasKey) {
    notify('You do not have a key for this door.', 'error');
    return;
  }

  const prevState = doorManager.getDoorState(doorHash);
  console.log('[doors] prevState:', prevState);
  if (prevState !== 0) {
    const doorEntity = doorManager.getDoorEntity(doorHash);
    if (doorEntity) {
      const keyholeCoords = Vector3.fromArray(GetOffsetFromEntityInWorldCoords(doorEntity, 1.0, 0.0, 1.0));
      const angleTo = PVGame.getAngleTo(keyholeCoords);
      if (angleTo > 20) {
        await PVGame.turnPedToFaceCoord(
          PVGame.playerPed(),
          keyholeCoords.x,
          keyholeCoords.y,
          keyholeCoords.z,
          lerp(250, 750, angleTo / 180),
        );
        await Delay(lerp(125, 250, angleTo / 180));
        await PVGame.taskPlayAnim(doorOpenAnim);
      }
    }
  }

  const pairedHash = getPairedDoorHash(doorHash) ?? undefined;
  await doorManager.toggleDoorState(doorHash, true, pairedHash);

  const newState = doorManager.getDoorState(doorHash);
  console.log('[doors] newState after toggle:', newState);
  if (newState !== prevState) {
    notify(newState === 0 ? 'Door unlocked.' : 'Door locked.', 'success');
  }
};

// ---- Proximity interact POI + door indicator tick ----

let isDeveloper = false;

const DOUBLE_DOOR_RADIUS = 2.3;

let proximityTick: number | null = null;
let lastIndicatorHash: number | null = null;

// Returns the paired door hash for a double door, or null if single door.
const getPairedDoorHash = (doorHash: number): number | null => {
  const doorCoords = doorManager.getDoorCoords(doorHash);
  if (!doorCoords) {
    console.log('[doors] getPairedDoorHash: no coords for', doorHash);
    return null;
  }

  let closestHash: number | null = null;
  let closestDist = Infinity;

  for (const [hash] of (doorManager as any).doors as Map<number, Doors.Data>) {
    if (hash === doorHash) continue;
    const other = doorManager.getDoorCoords(hash);
    if (!other) continue;
    const dx = other.x - doorCoords.x;
    const dy = other.y - doorCoords.y;
    const dz = other.z - doorCoords.z;
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (dist < closestDist) {
      closestDist = dist;
      closestHash = hash;
    }
  }

  // console.log('[doors] getPairedDoorHash: closest door to', doorHash, 'is', closestHash, 'at distance', closestDist, '(threshold', DOUBLE_DOOR_RADIUS, ')');
  return closestDist <= DOUBLE_DOOR_RADIUS ? closestHash : null;
};

// Returns the midpoint world coords of the closest door and any paired door within DOUBLE_DOOR_RADIUS.
const getDoorWorldMidpoint = (closestHash: number): [number, number, number] | null => {
  const doorCoords = doorManager.getDoorCoords(closestHash);
  if (!doorCoords) return null;

  const coords: Vector3Format[] = [doorCoords];
  const pairedHash = getPairedDoorHash(closestHash);
  if (pairedHash) {
    const other = doorManager.getDoorCoords(pairedHash);
    if (other) coords.push(other);
  }

  const mid = coords.reduce(
    (acc, c) => ({ x: acc.x + c.x, y: acc.y + c.y, z: acc.z + c.z }),
    { x: 0, y: 0, z: 0 },
  );
  const n = coords.length;
  return [mid.x / n, mid.y / n, mid.z / n];
};

const startProximityTick = () => {
  if (proximityTick !== null) return;

  proximityTick = setTick(() => {
    const playerCoords = PVGame.playerCoords(true);

    // Fast-path: if we already have an active indicator, check that door first.
    // This lets us clear immediately without iterating all doors.
    if (lastIndicatorHash !== null) {
      const activeDistance = doorManager.getDoorDistance(lastIndicatorHash);
      if (activeDistance > INTERACT_DISTANCE) {
        emitUI('doors.indicator', []);
        lastIndicatorHash = null;
        return;
      }
    }

    const closestHash = doorManager.getClosestDoorToCoords(playerCoords as Vector3Format);
    if (!closestHash) return;

    const distance = doorManager.getDoorDistance(closestHash);
    const doorState = doorManager.getDoorState(closestHash);

    const midpoint = getDoorWorldMidpoint(closestHash);
    let screenX: number | null = null;
    let screenY: number | null = null;

    if (midpoint) {
      const [onScreen, sx, sy] = GetScreenCoordFromWorldCoord(midpoint[0], midpoint[1], midpoint[2] + 1.0);
      if (onScreen) {
        screenX = sx;
        screenY = sy;
      }
    }

    // Door state indicator — only within interact distance and on screen
    if (distance <= INTERACT_DISTANCE && screenX !== null && screenY !== null) {
      emitUI('doors.indicator', [
        {
          doorHash: closestHash,
          screenX,
          screenY,
          locked: doorState !== 0,
          distance,
          canInteract: true,
          lockpickable: doorState === 1 && distance <= LOCKPICK_DISTANCE,
          devOpen: isDeveloper,
        },
      ]);
      lastIndicatorHash = closestHash;
    } else if (lastIndicatorHash !== null) {
      emitUI('doors.indicator', []);
      lastIndicatorHash = null;
    }
  });
};

const stopProximityTick = () => {
  if (proximityTick !== null) {
    clearTick(proximityTick);
    proximityTick = null;
    emitUI('doors.indicator', []);
    lastIndicatorHash = null;
  }
};

startProximityTick();

// ---- Keybind registration ----

global.exports['keymapper'].RegisterKeyMapping('doors_interact', 'Interact with door', 'keyboard', 'E');
global.exports['keymapper'].RegisterKeyMapping('doors_lockpick', 'Lockpick door', 'keyboard', 'G');

RegisterCommand('+doors_interact', () => {
  console.log('[doors] doors_interact command fired');
  emit('doors:client:key_interact');
}, false);
RegisterCommand('-doors_interact', () => {}, false);

RegisterCommand('+doors_lockpick', () => emit('doors:client:key_lockpick'), false);
RegisterCommand('-doors_lockpick', () => {}, false);

// ---- Developer keybind (registered once when a DEVELOPER/ADMIN character is active) ----

let devKeybindRegistered = false;

const tryRegisterDevKeybind = (role: string) => {
  isDeveloper = role === 'DEVELOPER' || role === 'ADMIN';
  if (devKeybindRegistered || !isDeveloper) return;
  devKeybindRegistered = true;
  global.exports['keymapper'].RegisterKeyMapping('doors_dev_open', '[DEV] Force open door', 'keyboard', 'F');
  RegisterCommand('+doors_dev_open', () => emit('doors:client:key_dev_open'), false);
  RegisterCommand('-doors_dev_open', () => {}, false);
};

// Cover the case where character is already loaded when this resource starts
const existingCharacter = PVBase.getCurrentCharacter();
if (existingCharacter) tryRegisterDevKeybind(existingCharacter.role);

onUI('character-client-update.getCharacter', (pCharacter: string) => {
  const character = JSON.parse(pCharacter) as CharacterData;
  tryRegisterDevKeybind(character.role);
});

// ---- Key handlers (E = toggle, G = lockpick) ----

on('doors:client:key_interact', async () => {
  console.log('[doors] key_interact fired, lastIndicatorHash:', lastIndicatorHash);
  if (lastIndicatorHash === null) return;
  if (!(await runDoorHooks('onInteract', lastIndicatorHash))) return;
  await toggleDoor(lastIndicatorHash);
});

on('doors:client:key_lockpick', async () => {
  if (lastIndicatorHash === null) return;
  const doorState = doorManager.getDoorState(lastIndicatorHash);
  const distance = doorManager.getDoorDistance(lastIndicatorHash);
  if (doorState === 1 && distance <= LOCKPICK_DISTANCE) {
    await doorManager.attemptLockpick(lastIndicatorHash);
  }
});

on('doors:client:key_dev_open', async () => {
  if (lastIndicatorHash === null) return;
  const currentState = doorManager.getDoorState(lastIndicatorHash);
  console.log('[doors] dev_open currentState:', currentState);
  const newState = currentState === 0 ? 1 : 0;
  const pairedHash = getPairedDoorHash(lastIndicatorHash) ?? undefined;
  await doorManager.setDoorStateBypass(lastIndicatorHash, newState, pairedHash);
});

// ---- Key item usage (existing flow) ----

on('doors:client:toggle_door', async (item: Inventory.ItemBase, itemData: UI.Inventory.ItemData) => {
  console.log('doors:client:toggle_door', item, itemData);
  for (const metadata of itemData.metadatas) {
    let closestDoorHash = metadata.doorHash;
    let distance = doorManager.getDoorDistance(metadata.doorHash);
    for (const doorHash of metadata.doorHashes || []) {
      const curDistance = doorManager.getDoorDistance(doorHash);
      if (curDistance < distance) {
        closestDoorHash = doorHash;
        distance = curDistance;
      }
    }

    if (distance < 2.5) {
      await toggleDoor(closestDoorHash);
    }

    let keyWasUsed = false;
    for (const doorHashes of metadata.linkedDoors || []) {
      if (doorHashes.length === 0) {
        continue;
      }
      const distance = doorManager.getDoorDistance(doorHashes[0]);
      const curState = doorManager.getDoorState(doorHashes[0]);
      if (distance < 2.5) {
        await toggleDoor(doorHashes.shift());
        for (const doorHash of doorHashes) {
          if (doorManager.getDoorState(doorHash) === curState) {
            await doorManager.toggleDoorState(doorHash);
            keyWasUsed = true;
          }
        }
      }
    }

    if (keyWasUsed) {
      emitSocket('inventory.item-wear', itemData.ids[0]);
    }
  }
});
