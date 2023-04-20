import { Vector3 } from '@lib/math';
import { PVGame, PVPrompt } from '@lib/client';
import { VegModifierFlag, VegModifierType } from '@lib/flags/veg-modifiers';

export default class ItemPlacer {
  ghostItem: number = 0;
  playerCoords: Vector3 = new Vector3(0, 0, 0);
  ghostCoords: Vector3 = new Vector3(0, 0, 0);
  model: number = 0;
  tick: number = 0;
  rotation = 0.0;
  placed = 0;
  maxPlaced = 1;
  placedIds: number[] = [];
  placedObjects: number[] = [];
  finished: Promise<number[]>;
  resolver?: (placedObjects: number[]) => void;
  groundOnly: boolean = false;
  groundObject = true;
  snap = false;

  isValidPlacement = true;
  uprightLimit = 1.0;
  isUpright = true;
  subItems: PlaceObject.SubItem[] = [];

  disablePrompts = false;

  constructor(model: number, maxPlaced = 1, groundOnly = true) {
    this.finished = new Promise((resolve) => {
      this.resolver = resolve;
    });

    if (!(Citizen.invokeNative('0x274EE1B90CFA669E', model) as boolean)) {
      this.destroy();
      return;
    }

    this.groundOnly = groundOnly;
    this.model = model;
    this.maxPlaced = maxPlaced;
  }

  promptPlaceHandler() {
    if (this.placed < this.maxPlaced) {
      this.createFinalObject();
      this.disablePrompts = true;
      setTimeout(() => {
        this.disablePrompts = false;
      }, 500);
    }
  }

  promptGroundHandler() {
    this.groundObject = !this.groundObject;
    PVPrompt.updatePromptText('ground_object', this.groundObject ? 'Un-Ground' : 'Ground');
  }

  start(): void {
    if (!this.model) {
      return;
    }
    this.setPlayerCoords();
    this.createGhostObject();

    PVPrompt.show('place-object::place');
    if (!this.groundOnly) {
      PVPrompt.show('place-object::ground');
    }
    PVPrompt.show('place-object::cancel');

    PVPrompt.enable('place-object::place');
    let promptWasEnabled = true;

    this.tick = setTick(() => {
      if (IsControlPressed(0, 0xf78d7337)) {
        // SelectPrevWeapon
        if (IsControlPressed(0, 0x8ffc75d6)) {
          this.rotation++;
        } else {
          this.rotation += 15;
        }
      }
      if (IsControlPressed(0, 0xd0842edf)) {
        // SelectNextWeapon
        if (IsControlPressed(0, 0x8ffc75d6)) {
          this.rotation--;
        } else {
          this.rotation -= 15;
        }
      }
      this.positionGhostObject();
      if (this.isValidPlacement && this.isUpright && !this.disablePrompts) {
        if (!promptWasEnabled) {
          PVPrompt.enable('place-object::place');
          promptWasEnabled = true;
        }
      } else if (promptWasEnabled) {
        PVPrompt.disable('place-object::place');
        promptWasEnabled = false;
      }
    });
  }

  destroy(): void {
    PVPrompt.hide('place-object::place');
    PVPrompt.hide('place-object::ground');
    PVPrompt.hide('place-object::cancel');
    this.resolver && this.resolver(this.placedObjects);
    clearTick(this.tick);
    DeleteEntity(this.ghostItem);
    this.ghostItem = 0;
  }

  place(again = false): void {
    if (!again) {
      this.destroy();
    }
  }
  /*
    toVector3(x, y, z): Vector3 {
        return { x, y, z };
    }

    vectorAdd(
        { x, y, z }: { x: number; y: number; z: number },
        { x: x2, y: y2, z: z2 }: { x: number; y: number; z: number },
    ): Vector3 {
        return { x: x + x2, y: y + y2, z: z + z2 };
    }

    vectorDelta(
        { x, y, z }: { x: number; y: number; z: number },
        { x: x2, y: y2, z: z2 }: { x: number; y: number; z: number },
    ): Vector3 {
        return { x: x - x2, y: y - y2, z: z - z2 };
    }

    vectorMult(
        { x, y, z }: { x: number; y: number; z: number },
        { x: x2, y: y2, z: z2 }: { x: number; y: number; z: number },
    ): Vector3 {
        return { x: x * x2, y: y * y2, z: z * z2 };
    }

    vectorMultSingle({ x, y, z }: { x: number; y: number; z: number }, mult: number): Vector3 {
        return { x: x * mult, y: y * mult, z: z * mult };
    }
    */
  setPlayerCoords(): void {
    this.playerCoords = Vector3.fromArray(GetEntityCoords(PVGame.playerPed(), true));
  }

  async createGhostObject(): Promise<void> {
    await PVGame.loadModel(this.model);

    this.ghostItem = CreateObject(
      this.model,
      this.playerCoords.x,
      this.playerCoords.y,
      this.playerCoords.z,
      false,
      false,
      false,
      true,
      true,
    );
    FreezeEntityPosition(this.ghostItem, true);
    SetEntityAsMissionEntity(this.ghostItem, true, true);
    SetEntityAlpha(this.ghostItem, 200, false);
    SetEntityCompletelyDisableCollision(this.ghostItem, true, true);
    SetPickupLight(this.ghostItem, true);
    SetEntityCollision(this.ghostItem, false, false);
  }

  cameraForwardVector(): Vector3 {
    // const rot = this.vectorMultSingle(this.toVector3(...GetGameplayCamRot()), Math.PI / 180.0);
    const rot = Vector3.fromArray(GetGameplayCamRot(0)).multiplyScalar(Math.PI / 180);
    return new Vector3(
      -Math.sin(rot.z) * Math.abs(Math.cos(rot.x)),
      Math.cos(rot.z) * Math.abs(Math.cos(rot.x)),
      Math.sin(rot.x),
    );
  }

  // 1 World - Ground / Walls / Rocks -- 2 Vehicle -- 4 Ped -- 8 Entity
  // 16 Items - Pelts / Buckets / Brooms / Power Poles / Lasso
  // 32 Pickup Weapon? -- 64 Glass - Breakable? -- 128 Water -- 256 Shrubs / Bushes / Small Trees
  // 512 Road / Zone ? - 1024 Horse Ped - 2048 Horse Entity
  updateGhostPosition(): void {
    const camCoords = Vector3.fromArray(GetGameplayCamCoord());
    const targetCoords = camCoords.copy().add(this.cameraForwardVector().multiplyScalar(10));
    const shapeTest = StartExpensiveSynchronousShapeTestLosProbe(
      camCoords.x,
      camCoords.y,
      camCoords.z,
      targetCoords.x,
      targetCoords.y,
      targetCoords.z - 1.5,
      1 + 16 + 32 + 64 + 128,
      this.ghostItem,
    );
    const [rtnVal, hit, endCoords, surfaceNormal, entityHit] = GetShapeTestResult(shapeTest);
    const hitCoords = Vector3.fromArray(endCoords);
    // if (hit > 0 && (!this.groundObject || (surfaceNormal[0] < 0.45 && surfaceNormal[1] < 0.45 && surfaceNormal[2] > 0.5))) {
    if (hit > 0) {
      if (IsEntityInWater(this.ghostItem)) {
        this.isValidPlacement = false;
      } else {
        this.isValidPlacement = true;
      }
      // console.log(Math.abs(surfaceNormal[0]), Math.abs(surfaceNormal[1]), Math.abs(surfaceNormal[2]));
      if (
        this.isUpright &&
        (Math.abs(surfaceNormal[0]) > this.uprightLimit || Math.abs(surfaceNormal[1]) > this.uprightLimit) &&
        Math.abs(surfaceNormal[2]) < 1.05 - this.uprightLimit
      ) {
        this.isUpright = false;
      } else if (
        !this.isUpright &&
        Math.abs(surfaceNormal[0]) <= this.uprightLimit &&
        Math.abs(surfaceNormal[1]) <= this.uprightLimit &&
        Math.abs(surfaceNormal[2]) >= 1.05 - this.uprightLimit
      ) {
        this.isUpright = true;
      }
      if (this.isValidPlacement && this.isUpright) {
        SetEntityAlpha(this.ghostItem, 200, false);
        SetPickupLight(this.ghostItem, true);
      } else {
        SetEntityAlpha(this.ghostItem, 100, false);
        SetPickupLight(this.ghostItem, false);
      }
      /** Snap Behavior kinda janky
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const entityCoords = this.toVector3(...GetEntityCoords(entityHit, false))
        if (this.snap && entityCoords.x !== 0 && entityCoords.y !== 0 && entityCoords.z !== 0) {
          const hitDelta = this.vectorDelta(hitCoords, entityCoords)
          if (hitDelta.x > 0 && hitDelta.x > hitDelta.y) {
            this.ghostCoords = this.vectorAdd(entityCoords, { x: 2.0, y: 1.5, z: 0.0 })
          } else if (hitDelta.x < 0 && hitDelta.x < hitDelta.y) {
            this.ghostCoords = this.vectorAdd(entityCoords, { x: 2.0, y: 1.5, z: 0.0 })
          } else if (hitDelta.y > 0 && hitDelta.y > hitDelta.x) {
            this.ghostCoords = this.vectorAdd(entityCoords, { x: 2.0, y: 1.5, z: 0.0 })
          } else if (hitDelta.y < 0 && hitDelta.y < hitDelta.x) {
            this.ghostCoords = this.vectorAdd(entityCoords, { x: 2.0, y: 1.5, z: 0.0 })
          }
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          this.ghostCoords = hitCoords
        }
      */
      this.ghostCoords = hitCoords;
    }
  }

  positionGhostObject(): void {
    this.updateGhostPosition();
    if (this.ghostCoords) {
      SetEntityCoords(
        this.ghostItem,
        this.ghostCoords.x,
        this.ghostCoords.y,
        this.ghostCoords.z,
        false,
        false,
        false,
        false,
      );
      SetEntityRotation(this.ghostItem, 0.0, 0.0, this.rotation, 2, false);
      if (this.groundObject) {
        PlaceObjectOnGroundProperly(this.ghostItem, false);
      }
    }
  }

  async createFinalObject(): Promise<void> {
    const objectId = CreateObject(
      this.model,
      this.ghostCoords.x,
      this.ghostCoords.y,
      this.ghostCoords.z,
      true,
      false,
      false,
      false,
      false,
    );
    SetEntityAsMissionEntity(objectId, true, true);
    SetEntityRotation(objectId, 0.0, 0.0, this.rotation, 2, false);
    if (this.groundObject) {
      PlaceObjectOnGroundProperly(objectId, false);
    }

    const objectRotation = Vector3.fromArray(GetEntityRotation(objectId, 2));

    for (const subItem of this.subItems) {
      const subItemCoords = Vector3.fromArray(
        GetOffsetFromEntityInWorldCoords(objectId, subItem.offset.x, subItem.offset.y, subItem.offset.z),
      );
      const subObjectId = CreateObject(
        GetHashKey(subItem.model),
        subItemCoords.x,
        subItemCoords.y,
        subItemCoords.z,
        true,
        false,
        false,
        false,
        false,
      );
      const subItemRotation = objectRotation.add(Vector3.fromArray([0, 0, subItem.offsetHeading]));
      SetEntityCollision(subObjectId, false, false);
      SetEntityAsMissionEntity(subObjectId, true, true);
      SetEntityRotation(subObjectId, subItemRotation.x, subItemRotation.y, subItemRotation.z, 2, false);
      if (this.groundObject) {
        PlaceObjectOnGroundProperly(subObjectId, false);
      }
      Entity(objectId).state.set(subItem.name, subObjectId, false);
      Entity(objectId).state.set(`${subItem.name}NetId`, NetworkGetNetworkIdFromEntity(subObjectId), true);
    }

    this.placedObjects.push(objectId);

    this.placed++;

    if (this.placed >= this.maxPlaced) {
      this.destroy();
    }

    // Cull nearby vegetation
    const [dimensionMin, dimensionMax] = GetModelDimensions(this.model);

    const dimension = Vector3.fromArray(dimensionMax).sub(Vector3.fromArray(dimensionMin));
    const radius = (Math.max(dimension.x, dimension.y) / 2) * 1.15;

    PVGame.vegAddSphereAtEntity(objectId, radius, VegModifierType.Cull, VegModifierFlag.All);
  }
}
