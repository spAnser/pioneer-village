export class BlipController {
  protected static instance: BlipController;

  protected blips: Map<string, Base.InternalBlips> = new Map();
  protected jobsClocked: Record<string, boolean> = {};

  static getInstance(): BlipController {
    if (!BlipController.instance) {
      BlipController.instance = new BlipController();
    }
    return BlipController.instance;
  }

  constructor() {
    on('onResourceStop', (resourceName: string) => {
      if (resourceName === GetCurrentResourceName()) {
        this.destruct();
      } else {
        this.resourceStopped(resourceName);
      }
    });

    on('jobs:client:clock-in', (_: any, data: { jobHandle: string }) => {
      this.jobsClocked[data.jobHandle] = true;
      this.refreshBlips();
    });
    on('jobs:client:clock-out', (_: any, data: { jobHandle: string }) => {
      delete this.jobsClocked[data.jobHandle];
      this.refreshBlips();
    });

    emit('blip-controller.ready');
  }

  private destruct(): void {
    for (const [id, data] of this.blips.entries()) {
      if (data.handle && DoesBlipExist(data.handle)) {
        this.removeBlip(id);
        this.blips.delete(id);
      }
    }
  }

  private resourceStopped(resourceName: string) {
    for (const [id, data] of this.blips.entries()) {
      if (data.resource === resourceName) {
        this.removeBlip(id);
        this.blips.delete(id);
      }
    }

    if (resourceName === 'jobs') {
      this.jobsClocked = {};
      this.refreshBlips();
    }
  }

  private removeBlip(id: string) {
    const blip = this.blips.get(id);
    if (!blip || !blip.handle) return;

    Citizen.invokeNative('0x01B928CA2E198B01', blip.handle); // I don't know what this native does, but I will keep it here.
    RemoveBlip(blip.handle);
    this.blips.set(id, { ...blip, handle: undefined });
  }

  private refreshBlips() {
    for (const [id, data] of this.blips.entries()) {
      let passedAllConstraints = true;

      if (data.constraints.jobHandle && !this.jobsClocked[data.constraints.jobHandle]) {
        passedAllConstraints = false;
      }

      if (passedAllConstraints && (!data.handle || !DoesBlipExist(data.handle))) {
        this.drawBlip(id, data);
      } else if (!passedAllConstraints && data.handle) {
        this.removeBlip(id);
      }
    }
  }

  private drawBlip(id: string, data: Base.InternalBlips): Base.BlipData['handle'] {
    let blipHandle: number;
    switch (data.type) {
      case 'sprite':
        blipHandle = BlipAddForCoords(data.style, data.coords.x, data.coords.y, data.coords.z);
        break;
      case 'entity':
        blipHandle = BlipAddForEntity(data.style, data.entity);
        break;
      case 'pickup':
        blipHandle = BlipAddForPickupPlacement(data.style, data.pickup);
        break;
      case 'radius':
        blipHandle = BlipAddForRadius(data.style, data.coords.x, data.coords.y, data.coords.z, data.scale);
        break;
      case 'area':
        blipHandle = BlipAddForArea(
          data.style,
          data.coords.x,
          data.coords.y,
          data.coords.z,
          data.scale[0],
          data.scale[1],
          0,
          19,
        );
        break;
      case 'volume':
        blipHandle = BlipAddForVolume(data.style, data.volume);
        break;
      default: {
        console.log('Blip Manager received a blip without a proper type. Aborting blip creation.');
        return;
      }
    }
    if ('sprite' in data && data.sprite) {
      SetBlipSprite(blipHandle, data.sprite, true);
    }
    if (data.modifiers) {
      for (const modifier of data.modifiers) {
        BlipAddModifier(blipHandle, modifier);
      }
    }

    SetBlipFlashTimer(blipHandle, 16, -1);
    SetBlipFlashes(0);
    SetBlipName(blipHandle, data.label);
    this.blips.set(id, { ...data, handle: blipHandle });
  }

  public register(
    id: string,
    resource: string,
    data: Base.BlipDataWithoutIdAndResource,
    constraints: Base.BlipConstraints = {},
  ) {
    console.log('BlipController::register', id, resource, data);

    const blip = this.blips.get(id);

    if (blip) {
      this.removeBlip(id);
    }

    this.blips.set(id, { ...data, resource, constraints, id });

    this.refreshBlips();
  }

  public updateCoords(blipId: string, coords: Vector3Format) {
    const blip = this.blips.get(blipId);

    if (!blip || !('coords' in blip)) return;

    if (blip.handle && DoesBlipExist(blip.handle)) {
      SetBlipCoords(blip.handle, coords.x, coords.y, coords.z);
    }

    this.blips.set(blipId, { ...blip, coords });
  }

  public updateSprite(blipId: string, sprite: number) {
    const blip = this.blips.get(blipId);

    if (!blip || !('sprite' in blip)) return;

    if (blip.handle && DoesBlipExist(blip.handle)) {
      SetBlipSprite(blip.handle, sprite, true);
    }

    this.blips.set(blipId, { ...blip, sprite });
  }

  public updateLabel(blipId: string, label: string) {
    const blip = this.blips.get(blipId);

    if (!blip || !('label' in blip)) return;

    if (blip.handle && DoesBlipExist(blip.handle)) {
      SetBlipName(blip.handle, label);
    }

    this.blips.set(blipId, { ...blip, label });
  }

  public addModifier(id: string, modifier: number) {
    const blip = this.blips.get(id);

    if (!blip) return;

    if (blip.handle && DoesBlipExist(blip.handle)) {
      BlipAddModifier(blip.handle, modifier);
    }

    const newModifiers = blip.modifiers ? [...blip.modifiers, modifier] : [modifier];
    this.blips.set(id, { ...blip, modifiers: newModifiers });
  }

  public removeModifier(id: string, modifier: number = 0) {
    const blip = this.blips.get(id);

    if (!blip) return;

    if (blip.handle && DoesBlipExist(blip.handle)) {
      BlipRemoveModifier(blip.handle, modifier);
    }

    const newModifiers = modifier === 0 ? [] : blip.modifiers?.filter((mod) => mod === modifier);

    this.blips.set(id, { ...blip, modifiers: newModifiers });
  }

  public getHandle(id: string): Base.BlipData['handle'] {
    const blip = this.blips.get(id);
    if (blip) {
      return blip.handle;
    }
  }

  public unregister(id: string) {
    const blip = this.blips.get(id);
    if (!blip) {
      return;
    }
    console.log('Unregistering blip with id', id, blip.handle);
    this.removeBlip(id);
    this.blips.delete(id);
  }
}

const blipController = BlipController.getInstance();

export default blipController;
