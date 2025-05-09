import { VegModifierFlag } from '@lib/flags/veg-modifiers';
import { Vector3 } from '@lib/math';

class VegModifierManager {
  protected static instance: VegModifierManager;

  static getInstance(): VegModifierManager {
    if (!VegModifierManager.instance) {
      VegModifierManager.instance = new VegModifierManager();
    }
    return VegModifierManager.instance;
  }

  protected sphereIds: Set<number> = new Set();

  addSphereAtEntity(entity: number, radius: number, modifierType: number, flags: VegModifierFlag): number {
    if (!DoesEntityExist(entity)) {
      return 0;
    }
    const coords = Vector3.fromArray(GetEntityCoords(entity, false, false));

    const id = AddVegModifierSphere(coords.x, coords.y, coords.z, radius, modifierType, flags, 0);
    this.sphereIds.add(id);

    return id;
  }

  addVolume(volume: number, modifierType: number, flags: VegModifierFlag): number {
    const id = AddVegModifierZone(volume, flags, modifierType, 0);
    // this.sphereIds.add(id);

    return id;
  }

  removeAllSpheres() {
    for (const id of this.sphereIds) {
      RemoveVegModifierSphere(id, 0);
    }
    this.sphereIds.clear();
  }
}

const vegModifierManager = VegModifierManager.getInstance();

export default vegModifierManager;
