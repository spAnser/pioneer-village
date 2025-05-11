import { awaitUI, PVBase, PVGame } from '@lib/client';
import { Vector3 } from '@lib/math';
import { emitSocket, Log } from '@lib/client/comms/ui';

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
    }, 5e3);

    // TODO: Replace with timeout and register new objects as they get created instead of periodically checking
    setInterval(() => {
      this.serverObjects();
    }, 5e3);
  }

  async serverObjects(): Promise<void> {
    const serverObjects = await awaitUI('world.registered-objects');
    // Log('serverObjects', serverObjects);
    for (const [name, id] of Object.entries(serverObjects)) {
      // Log('NetworkDoesNetworkIdExist(id)', name, NetworkDoesNetworkIdExist(id));
      if (NetworkDoesNetworkIdExist(id)) {
        this.activeObjects.set(name, NetworkGetEntityFromNetworkId(id));
        this.networkObjects.set(name, id);
        // Log('Net World Object', name, id, NetworkGetEntityFromNetworkId(id));
      } else {
        // Log('Net World Object', name, id, 'does not exist');
        // emitSocket('world.unregister-object', name);
        // TODO: Handle on server using : NetworkGetEntityFromNetworkId
      }
    }

    this.receivedNetworkObjects = true;
  }

  async check(): Promise<void> {
    const playerCoords = Vector3.fromObject(PVGame.playerCoords());
    for (const [cellX, columns] of this.cells.entries()) {
      for (const [cellY, objectNames] of columns.entries()) {
        const distance = playerCoords.getDistance2D(cellX, cellY);
        if (distance < 100) {
          for (const objectName of objectNames) {
            if (!this.activeObjects.has(objectName)) {
              if (this.objects.get(objectName)?.networked) {
                if (await awaitUI('world.request-creation', objectName)) {
                  Log('createObject', objectName);
                  this.createObject(objectName);
                }
              } else {
                this.createObject(objectName);
              }
            }
          }
        } else if (distance > 150) {
          for (const objectName of objectNames) {
            if (this.activeObjects.has(objectName)) {
              if (this.objects.get(objectName)?.networked) {
                // TODO: Check before deleting.
                // emitSocket('world.request-creation', objectName);
              } else {
                this.destroyObject(objectName);
              }
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
      // Log('new Map', coordsCell.x);
    }
    if (!this.cells.get(coordsCell.x)?.has(coordsCell.y)) {
      this.cells.get(coordsCell.x)?.set(coordsCell.y, new Set());
      // Log('new Set', coordsCell.y);
    }

    console.info(`Registering world object: ${name}`);
    this.cells.get(coordsCell.x)?.get(coordsCell.y)?.add(name);
    this.objects.set(name, { model, coords, rotation, name, networked });
  }

  async createObject(name: string): Promise<void> {
    const worldObject = this.objects.get(name);
    if (worldObject) {
      const entityId = await PVGame.createObject(
        worldObject.model,
        worldObject.coords,
        worldObject.rotation,
        worldObject.networked,
      );
      Log('Created:', name, entityId);
      this.activeObjects.set(name, entityId);
      if (worldObject.networked) {
        const netId = NetworkGetNetworkIdFromEntity(entityId);
        this.networkObjects.set(name, netId);
        emitSocket('world.register-object', name, netId);
      }
    }
  }

  async destroyObject(name: string): Promise<void> {
    const entityId = this.activeObjects.get(name);
    if (entityId) {
      await PVBase.deleteEntity(entityId);
      Log('Destroyed:', name, entityId);
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
    for (const name of this.objects.keys()) {
      emitSocket('world.unregister-object', name);
    }
    for (const entityId of this.activeObjects.values()) {
      PVBase.deleteEntity(entityId);
    }
  }
}

const worldController = new WorldController();

export default worldController;
