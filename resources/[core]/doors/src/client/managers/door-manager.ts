import { awaitUI, PVGame } from '@lib/client';
import { emitSocket } from '@lib/client/comms/ui';
import { Vector3 } from '@lib/math';
import { initManager } from '@lib/shared/init-manager';
import { Delay } from '@lib/functions';

class DoorManager {
  protected static instance: DoorManager;

  static getInstance(): DoorManager {
    if (!DoorManager.instance) {
      DoorManager.instance = new DoorManager();
    }
    return DoorManager.instance;
  }

  doors = new Map<number, Doors.Data>();

  constructor() {
    setInterval(this.checkDoors.bind(this), 2500);
    onNet('game:character-selected', this.init.bind(this));

    if (GetResourceState('game') === 'started') {
      const character = PVGame.getCurrentCharacter();
      if (character) {
        this.init();
      }
    }
  }

  async init() {
    console.log(`Door Manager Initializing...`);
    const doors = await awaitUI('doors.get-door-states');

    for (const [doorHash, state] of doors) {
      const entity = GetEntityByDoorhash(doorHash);
      if (entity) {
        const data = this.getDoor(doorHash) || {
          entity,
          netId: NetworkGetEntityIsNetworked(entity) ? NetworkGetNetworkIdFromEntity(entity) : 0,
          state,
          coords: Vector3.fromArray(GetEntityCoords(entity)).toObject(),
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
    initManager.resolveThisResource();
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
    return this.doors.get(doorHash)?.state || null;
  }

  getDoorCoords(doorHash: number): Vector3Format | null {
    const data = this.getDoor(doorHash);
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

  getDoorDistance(doorHash: number): number {
    const coords = this.getDoorCoords(doorHash);
    if (coords) {
      return Vector3.fromObject(coords).getDistance(PVGame.playerCoords(true));
    }
    return Infinity;
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
    // console.log(items);

    for (const item of items) {
      for (const metadatas of item.metadatas) {
        if (metadatas.doorHash === doorHash) {
          return true;
        }
        if (metadatas.doorHashes && metadatas.doorHashes.includes(doorHash)) {
          return true;
        }
      }
    }
    return false;
  }

  async setDoorState(doorHash: number, state: Doors.State, emit = true) {
    const data = this.getDoor(doorHash);
    if (!data || state === null || state < -1 || state > 4 || !(await this.hasDoorKey(doorHash))) {
      return;
    }
    if (data.state !== state) {
      data.state = state;
      DoorSystemSetDoorState(doorHash, state);

      if (emit) {
        emitSocket('doors.set-door-state', doorHash, state);
      }
    }
  }

  async toggleDoorState(doorHash: number, emit = true): Promise<void> {
    const data = this.getDoor(doorHash);
    if (!data || !(await this.hasDoorKey(doorHash))) {
      return;
    }
    const state = data.state === 0 ? 1 : 0;
    this.setDoorState(doorHash, state, emit);
  }

  async checkDoors() {
    await initManager.initializedThisResource();
    let doorChanged = false;

    for (const [doorHash, doorEntity] of DoorSystemGetActive()) {
      if (!this.doors.has(doorHash)) {
        let doorNetId = NetworkGetNetworkIdFromEntity(doorEntity);

        // TODO: Double check this is loading the current state and not using fallback.
        const data = this.getDoor(doorHash) || {
          entity: doorEntity,
          netId: doorNetId,
          state: DoorSystemGetDoorState(doorHash),
          coords: Vector3.fromArray(GetEntityCoords(doorEntity)).toObject(),
        };

        data.entity = doorEntity;
        data.netId = doorNetId;
        if (data.state !== DoorSystemGetDoorState(doorHash)) {
          DoorSystemSetDoorState(doorHash, data.state);
        }
        if (data.coords.z === -69) {
          data.coords = Vector3.fromArray(GetEntityCoords(doorEntity)).toObject();
        }

        if (!this.getDoor(doorHash)) {
          emitSocket('doors.set-door-state', doorHash, data.state);
        }

        this.doors.set(doorHash, data);

        doorChanged = true;
        // console.log('addDoor', doorHash, doorEntity);
      } else {
        const data = this.getDoor(doorHash);
        if (data && data.entity === 0) {
          const entity = GetEntityByDoorhash(doorHash);
          if (entity) {
            data.entity = entity;
            data.netId = NetworkGetEntityIsNetworked(entity) ? NetworkGetNetworkIdFromEntity(entity) : 0;
            data.coords = Vector3.fromArray(GetEntityCoords(entity)).toObject();
          }

          // console.log(`Setting Door Entity: ${doorHash} ${entity}`);

          this.doors.set(doorHash, data);
        }
      }
    }

    if (doorChanged) {
      // console.log(this.doors);
    }

    // console.log(this.getClosestDoor());
  }
}

const doorManager = DoorManager.getInstance();

export default doorManager;
