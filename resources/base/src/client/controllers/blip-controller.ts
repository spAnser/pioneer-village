import { BlipStyles } from '@lib/shared/blips';

export class BlipController {
  protected static instance: BlipController;

  protected blips: Map<string, Base.BlipData> = new Map();

  static getInstance(): BlipController {
    if (!BlipController.instance) {
      BlipController.instance = new BlipController();
    }
    return BlipController.instance;
  }

  initialized = false;

  constructor() {
    on('onResourceStop', (resourceName: string) => {
      if (resourceName === GetCurrentResourceName()) {
        this.destruct();
      }
    });
  }

  destruct(): void {
    for (const [id, data] of this.blips.entries()) {
      Citizen.invokeNative('0x01B928CA2E198B01', data.id);
      RemoveBlip(data.id);
      this.blips.delete(id);
    }
  }

  register(id: string, data: Base.BlipDataWithoutId, style = BlipStyles.NEUTRAL_OBJECTIVE) {
    console.log('BlipController::register', id, data);
    if (this.blips.has(id)) {
      console.log(`Blip with id ${id} already exists, unregistering before registering new one.`);
      this.unregister(id);
    }

    let blipId: number;
    switch (data.type) {
      case 'sprite':
        blipId = BlipAddForCoords(style, data.coords.x, data.coords.y, data.coords.z);
        SetBlipSprite(blipId, data.sprite, true);
        break;
      case 'entity':
        blipId = BlipAddForEntity(style, data.entity);
        break;
      case 'pickup':
        blipId = BlipAddForPickupPlacement(style, data.pickup);
        break;
      case 'radius':
        blipId = BlipAddForRadius(style, data.coords.x, data.coords.y, data.coords.z, data.scale);
        break;
      case 'area':
        blipId = BlipAddForArea(
          style,
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
        blipId = BlipAddForVolume(style, data.volume);
        break;
    }
    if ('sprite' in data && data.sprite) {
      SetBlipSprite(blipId, data.sprite, true);
    } else if ('style' in data) {
      SetBlipSprite(blipId, data.style, true);
    }
    if (data.modifiers) {
      for (const modifier of data.modifiers) {
        BlipAddModifier(blipId, modifier);
      }
    }

    SetBlipFlashTimer(blipId, 16, -1);

    const [_, blipType, mapCardId] = SetBlipFlashes(0);
    // will return whatever you passed in blipType as long is an int

    SetBlipName(blipId, data.label);
    // console.log('Registering blip with id', id, blipId);
    this.blips.set(id, { id: blipId, ...data });
    return blipId;
  }

  unregister(id: string) {
    const blipData = this.blips.get(id);
    if (!blipData) {
      return;
    }
    console.log('Unregistering blip with id', id, blipData.id);
    Citizen.invokeNative('0x01B928CA2E198B01', blipData.id);
    RemoveBlip(blipData.id);
    this.blips.delete(id);
  }
}

const blipController = BlipController.getInstance();

export default blipController;
