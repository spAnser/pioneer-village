import { PVGame, PVInit, awaitUI } from '@lib/client';
import { emitSocket } from '@lib/client/comms/ui';
import { Vector3 } from '@lib/math';
import { runDoorHooks } from '../misc/hooks';

// Doors that should relock once they swing back to closed position.
// Keyed by signed 32-bit door hash.
const AUTOLOCK_DOORS = new Set<number>([
  // valentine bank gate doors
  1340831050,   // p_gate_valbankvlt
  -1951221163,  // p_gate_valbankvlt (2343746133 signed)
  -1987052564,  // P_DOORSLDPRTN01X (2307914732 signed)

  // valentine jail doors
  535323366, // P_DOOR_VAL_JAIL_CELL01X
  295355979, // P_DOOR_VAL_JAIL_CELL01X
  193903155, // P_DOOR_VAL_JAIL_CELL01X

  // TODO: other bank doors, train station doors, and any other high-traffic doors that should auto-lock
]);

class DoorManager {
  protected static instance: DoorManager;

  static getInstance(): DoorManager {
    if (!DoorManager.instance) {
      DoorManager.instance = new DoorManager();
    }
    return DoorManager.instance;
  }

  doors = new Map<number, Doors.Data>();
  // Tracks doors that have been opened this session and are pending autolock
  private autolockPending = new Set<number>();

  constructor() {
    setInterval(this.checkDoors.bind(this), 2500);
    this.init();
  }

  async init() {
    await PVInit.initializedResource('game');
    console.log(`Door Manager Initializing...`);
    const doors = await awaitUI('doors.get-door-states');

    for (const [doorHash, state] of doors) {
      const entity = GetEntityByDoorhash(doorHash, 0);
      if (entity) {
        const data = this.getDoor(doorHash) || {
          entity,
          netId: NetworkGetEntityIsNetworked(entity) ? NetworkGetNetworkIdFromEntity(entity) : 0,
          state,
          coords: Vector3.fromArray(GetEntityCoords(entity, false)).toObject(),
        };

        this.doors.set(doorHash, data);
      } else {
        const data = this.getDoor(doorHash) || {
          entity: 0,
          netId: 0,
          state,
          coords: { x: 0, y: 0, z: -69 },
        };

        this.doors.set(doorHash, data);
      }

      DoorSystemSetDoorState(doorHash, state);
    }
    PVInit.resolveResource('doors');
  }

  getDoor(doorHash: number): Doors.Data | null {
    return this.doors.get(doorHash) || null;
  }

  getDoorEntity(doorHash: number): number | null {
    return this.doors.get(doorHash)?.entity || null;
  }

  getDoorNetId(doorHash: number): number | null {
    return this.doors.get(doorHash)?.netId || null;
  }

  getDoorByEntity(doorEntity: number): number | null {
    for (const [doorHash, data] of this.doors) {
      if (data.entity === doorEntity) {
        return doorHash;
      }
    }
    return null;
  }

  getDoorByNetId(doorNetId: number): number | null {
    for (const [doorHash, data] of this.doors) {
      if (data.netId === doorNetId) {
        return doorHash;
      }
    }
    return null;
  }

  getDoorState(doorHash: number): Doors.State | null {
    const data = this.doors.get(doorHash);
    return data !== undefined ? data.state : null;
  }

  getDoorCoords(doorHash: number): Vector3Format | null {
    const data = this.getDoor(doorHash);
    // console.log('getDoorCoords', doorHash, data);
    if (data && data.coords.z !== -69) {
      return data.coords;
    }
    return null;
  }

  getDoorStateByEntity(doorEntity: number): Doors.State | null {
    const doorHash = this.getDoorByEntity(doorEntity);
    if (doorHash) {
      return this.getDoorState(doorHash);
    }
    return null;
  }

  getDoorStateByNetId(doorNetId: number): Doors.State | null {
    const doorHash = this.getDoorByNetId(doorNetId);
    if (doorHash) {
      return this.getDoorState(doorHash);
    }
    return null;
  }

  getDoorDistance(doorHash: number, coords?: Vector3Format): number {
    const data = this.getDoor(doorHash);
    if (!data) return Infinity;

    // Resolve entity coords on-demand if not yet populated
    if (data.coords.z === -69) {
      const entity = data.entity || GetEntityByDoorhash(doorHash, 0);
      if (entity) {
        data.entity = entity;
        data.coords = Vector3.fromArray(GetEntityCoords(entity, false)).toObject();
        this.doors.set(doorHash, data);
      } else {
        return Infinity;
      }
    }

    return Vector3.fromObject(data.coords).getDistance(coords || PVGame.playerCoords(true));
  }

  getClosestDoor(): number | null {
    let closestDoor: number | null = null;
    let closestDistance = Infinity;

    for (const [doorHash, data] of this.doors) {
      const distance = this.getDoorDistance(doorHash);
      if (distance < closestDistance) {
        closestDoor = doorHash;
        closestDistance = distance;
      }
    }

    return closestDoor;
  }

  getClosestDoorToCoords(coords: Vector3Format): number | null {
    let closestDoor: number | null = null;
    let closestDistance = Infinity;

    for (const [doorHash, data] of this.doors) {
      const distance = this.getDoorDistance(doorHash, coords);
      if (distance < closestDistance) {
        closestDoor = doorHash;
        closestDistance = distance;
      }
    }

    return closestDoor;
  }

  closeDoor(doorHash: number, durationMultiplier = 1.0) {
    const doorOpenRatio = DoorSystemGetOpenRatio(doorHash);

    const duration = Math.abs(doorOpenRatio) * 1000 * durationMultiplier;

    const timer = GetGameTimer();
    const doorCloseTick = setTick(() => {
      const delta = Math.min(1, (GetGameTimer() - timer) / duration);

      DoorSystemSetOpenRatio(doorHash, doorOpenRatio - doorOpenRatio * delta, true);

      if (timer + duration < GetGameTimer()) {
        clearTick(doorCloseTick);
        DoorSystemSetOpenRatio(doorHash, 0, false);
      }
    });
  }

  async hasDoorKey(doorHash: number): Promise<boolean> {
    const items = await awaitUI('inventory.player-get-items', GetHashKey('PV_DOOR_KEY'));
    console.log('[doors] hasDoorKey checking doorHash:', doorHash, 'items found:', JSON.stringify(items));

    for (const item of items) {
      for (const metadatas of item.metadatas) {
        if (metadatas.doorHash === doorHash) {
          return true;
        }
        if (metadatas.doorHashes && metadatas.doorHashes.includes(doorHash)) {
          return true;
        }
        if (metadatas.linkedDoors) {
          for (const linkedDoors of metadatas.linkedDoors) {
            if (linkedDoors.includes(doorHash)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  async setDoorState(doorHash: number, state: Doors.State, emit = true, pairedHash?: number) {
    const data = this.getDoor(doorHash);
    if (!data || state === null || state < -1 || state > 4) {
      return;
    }
    // Key check only applies when the local player is initiating the change
    if (emit && !(await this.hasDoorKey(doorHash))) {
      return;
    }
    if (data.state !== state) {
      const isUnlocking = state === 0;
      const beforeHook = isUnlocking ? 'beforeUnlock' : 'beforeLock';
      if (!(await runDoorHooks(beforeHook, doorHash))) return;

      data.state = state;
      DoorSystemSetDoorState(doorHash, state);

      if (emit) {
        emitSocket('doors.set-door-state', doorHash, state, pairedHash);
      }

      const afterHook = isUnlocking ? 'afterUnlock' : 'afterLock';
      await runDoorHooks(afterHook, doorHash);
    }
  }

  async attemptLockpick(doorHash: number): Promise<void> {
    const data = this.getDoor(doorHash);
    if (!data || data.state !== 1) return;

    if (!(await runDoorHooks('onLockpick', doorHash))) return;

    // TODO: trigger lockpicking minigame here
    // On success, call: await this.setDoorStateBypass(doorHash, 0);
    emit('doors:client:lockpick_stub', doorHash);
  }

  async setDoorStateBypass(doorHash: number, state: Doors.State, pairedHash?: number): Promise<void> {
    const data = this.getDoor(doorHash);
    if (!data || state === null || state < -1 || state > 4) return;
    if (data.state !== state) {
      data.state = state;
      DoorSystemSetDoorState(doorHash, state);
      emitSocket('doors.set-door-state-bypass', doorHash, state, pairedHash);
    }
  }

  async toggleDoorState(doorHash: number, emit = true, pairedHash?: number): Promise<void> {
    const data = this.getDoor(doorHash);
    if (!data || !(await this.hasDoorKey(doorHash))) {
      return;
    }
    const state = data.state === 0 ? 1 : 0;
    await this.setDoorState(doorHash, state, emit, pairedHash);
  }

  async checkDoors() {
    await PVInit.initializedResource('doors');
    let doorChanged = false;

    for (const [doorHashUnsigned, doorEntity] of DoorSystemGetActive()) {
      const doorHash = doorHashUnsigned << 0;
      if (!this.doors.has(doorHash)) {
        let doorNetId = NetworkGetNetworkIdFromEntity(doorEntity);

        // This is a door the server doesn't know about yet — use game default and report it
        const data = {
          entity: doorEntity,
          netId: doorNetId,
          state: DoorSystemGetDoorState(doorHash),
          coords: Vector3.fromArray(GetEntityCoords(doorEntity, false)).toObject(),
        };

        emitSocket('doors.set-door-state', doorHash, data.state);
        this.doors.set(doorHash, data);
        doorChanged = true;
        // console.log('addDoor', doorHash, doorEntity);
      } else {
        const data = this.getDoor(doorHash);
        if (data) {
          // Re-apply stored state if game engine has reset it (happens on stream-in)
          if (DoorSystemGetDoorState(doorHash) !== data.state) {
            DoorSystemSetDoorState(doorHash, data.state);
          }

          if (data.entity === 0) {
            const entity = GetEntityByDoorhash(doorHash, 0);
            if (entity) {
              data.entity = entity;
              data.netId = NetworkGetEntityIsNetworked(entity) ? NetworkGetNetworkIdFromEntity(entity) : 0;
              data.coords = Vector3.fromArray(GetEntityCoords(entity, false)).toObject();
              this.doors.set(doorHash, data);
            }
          }
        }
      }
    }

    if (doorChanged) {
      // console.log(this.doors);
    }

    for (const [doorHash, data] of this.doors) {
      if (data.state !== 0) {
        this.autolockPending.delete(doorHash);
        continue;
      }

      const openRatio = Math.abs(DoorSystemGetOpenRatio(doorHash));
      const isAutolock = AUTOLOCK_DOORS.has(doorHash);
      const playerNear = this.getDoorDistance(doorHash) < 1.5;

      if (playerNear) continue;

      if (openRatio > 0.05) {
        this.closeDoor(doorHash, 2.5);
        if (isAutolock) {
          this.autolockPending.add(doorHash);
        }
      } else if (this.autolockPending.has(doorHash)) {
        this.autolockPending.delete(doorHash);
        this.setDoorStateBypass(doorHash, 1);
      }
    }
  }
}

const doorManager = DoorManager.getInstance();

export default doorManager;
