import { awaitSocket, emitSocket } from '@lib/server';
import { Delay } from '@lib/functions';
import { Vector3 } from '@lib/math';

class WorldController {
  protected static instance: WorldController;

  static getInstance(): WorldController {
    if (!WorldController.instance) {
      WorldController.instance = new WorldController();
    }
    return WorldController.instance;
  }

  cellSize = 50;
  cells: Map<number, Map<number, Set<string>>> = new Map();
  objects: Map<string, World.Object> = new Map();

  stateBool: Map<string, boolean> = new Map();

  networkObjects: Map<string, number> = new Map();
  activeObjects: Map<string, number> = new Map();

  protected interval: CitizenTimer;

  protected receivedNetworkObjects = false;

  constructor() {
    this.interval = setInterval(() => {
      if (this.receivedNetworkObjects) {
        this.check();
      }
    }, 10e3);

    this.serverObjects();
  }

  async serverObjects(): Promise<void> {
    const serverObjects = await awaitSocket('world.registered-objects');
    console.log('serverObjects', serverObjects);
    for (const [name, id] of Object.entries(serverObjects)) {
      console.log('NetworkDoesNetworkIdExist(id)', name, NetworkGetEntityFromNetworkId(id) !== 0);
      if (NetworkGetEntityFromNetworkId(id) !== 0) {
        this.activeObjects.set(name, NetworkGetEntityFromNetworkId(id));
        this.networkObjects.set(name, id);
        console.log('Net World Object', name, id, NetworkGetEntityFromNetworkId(id));
      } else {
        console.log('Net World Object', name, id, 'does not exist');
      }
    }

    this.receivedNetworkObjects = true;
  }

  async playerInRange(objectCoords: Vector3Format, maxDistance = this.cellSize * 2): Promise<number | void> {
    let closest = 99999;
    let closestPlayer = 0;

    const indexes = GetNumPlayerIndices();

    for (let i = 0; i < indexes; i++) {
      const serverId = Number(GetPlayerFromIndex(i));
      if (serverId === 0) {
        continue;
      }

      const playerPed = GetPlayerPed(String(serverId));

      if (playerPed !== 0) {
        const playerCoords = Vector3.fromArray(GetEntityCoords(playerPed));

        const distance = playerCoords.getDistance(objectCoords);

        if (distance < maxDistance && distance < closest) {
          closest = distance;
          closestPlayer = serverId;
        }
      }
    }

    if (closestPlayer) {
      return closestPlayer;
    }

    return;
  }

  async check(): Promise<void> {
    for (const [cellX, columns] of this.cells.entries()) {
      for (const [cellY, objectNames] of columns.entries()) {
        for (const objectName of objectNames) {
          if (!this.activeObjects.has(objectName)) {
            if (this.objects.get(objectName)?.networked) {
              // console.log('createObject', objectName);
              this.createObject(objectName);
            }
          }
        }
      }
    }
  }

  round(n: number): number {
    return Math.round(n / this.cellSize) * this.cellSize;
  }

  register(model: number, coords: Vector3Format, rotation: Vector3Format, name: string, networked = true): void {
    if (this.objects.has(name)) {
      console.warn(`Tried to register object already registered with name: "${name}"`);
      return;
    }

    const coordsCell = {
      x: this.round(coords.x),
      y: this.round(coords.y),
    };
    if (!this.cells.has(coordsCell.x)) {
      this.cells.set(coordsCell.x, new Map());
      // console.log('new Map', coordsCell.x);
    }
    if (!this.cells.get(coordsCell.x)?.has(coordsCell.y)) {
      this.cells.get(coordsCell.x)?.set(coordsCell.y, new Set());
      // console.log('new Set', coordsCell.y);
    }

    console.info(`Registering world object: ${name}`);
    this.cells.get(coordsCell.x)?.get(coordsCell.y)?.add(name);
    this.objects.set(name, { model, coords, rotation, name, networked });
  }

  async createObject(name: string): Promise<void> {
    const worldObject = this.objects.get(name);

    if (worldObject && worldObject.networked) {
      const closestPlayer = await this.playerInRange(worldObject.coords);
      // console.log('closestPlayer', closestPlayer);

      if (!closestPlayer) {
        // console.log('No player in range', name);
        return;
      }

      const entityId = CreateObject(
        worldObject.model,
        worldObject.coords.x,
        worldObject.coords.y,
        worldObject.coords.z,
        true,
        true,
        false,
      );
      if (entityId !== 0) {
        await Delay(1000);
        console.log('Created:', name, entityId);
        this.activeObjects.set(name, entityId);
        const netId = NetworkGetNetworkIdFromEntity(entityId);

        const owner = NetworkGetEntityOwner(entityId);
        if (owner) {
          emitNet('world.set-coord-rot', owner, netId, worldObject.coords, worldObject.rotation);
        }

        console.log('NetId:', netId);
        this.networkObjects.set(name, netId);
        emitSocket('world.register-object', name, netId);
      } else {
        console.log('Failed to create:', name);
      }
    }
  }

  async destroyObject(name: string): Promise<void> {
    const entityId = this.activeObjects.get(name);
    if (entityId) {
      DeleteEntity(entityId);
      console.log('Destroyed:', name, entityId);
      this.activeObjects.delete(name);
      this.networkObjects.delete(name);
      emitSocket('world.unregister-object', name);
    }
  }

  getEntity(name: string): number | undefined {
    return this.activeObjects.get(name);
  }

  cleanUp(): void {
    clearInterval(this.interval);
    // for (const name of this.objects.keys()) {
    //   emitSocket('world.unregister-object', name);
    // }
    // for (const entityId of this.activeObjects.values()) {
    //   DeleteEntity(entityId);
    // }
  }
}

const worldController = new WorldController();

export default worldController;
