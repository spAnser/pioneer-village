import { PVGame } from '@lib/client';
import { Delay } from '@lib/functions';
import componentCategories from '../data/component-categories';
import wearableStates from '../data/wearable-states';
import { paletteManager } from './palette-manager';
import { AttachPoint } from '@lib/flags';
import PVItems from '@lib/shared/items';

const BASE_HASH = GetHashKey('BASE');

const CategoriesToKeep = ['BODIES_LOWER', 'BODIES_UPPER', 'EYES', 'HAIR', 'HEADS'];

enum Options {
  NONE = 0,
  DRAWABLE = 1,
  WEARABLE_STATES = 2,
}

type Component = {
  id: number;
  category: number;
  categoryName?: string;
  wearableState: number;
  wearableStateName?: string;
  wearableStates?: Record<number, { hash: number; name: string }>;
  drawable?: number;
  albedo?: number;
  normal?: number;
  material?: number;
};

type ComponentWithDrawable = Component & {
  drawable: number;
  albedo: number;
  normal: number;
  material: number;
};

type ComponentWithWearableStates = Component & {
  wearableStates: Record<number, { hash: number; name: string }>;
};

type ComponentWithAll = Component & ComponentWithDrawable & ComponentWithWearableStates;

class ComponentManager {
  protected static instance: ComponentManager;

  static getInstance(): ComponentManager {
    if (!ComponentManager.instance) {
      ComponentManager.instance = new ComponentManager();
    }
    return ComponentManager.instance;
  }

  async unequipClothing(ped: number) {
    for (const [categoryHash, categoryName] of componentCategories.entries()) {
      if (CategoriesToKeep.includes(categoryName)) {
        continue;
      }
      // Log('removePedComponentCategory', ped, categoryHash);
      await PVGame.removePedComponentCategory(ped, categoryHash);
      await Delay(1);
    }
  }

  async equipItems(ped: number, items: UI.Inventory.ItemData[]) {
    await this.unequipClothing(ped);

    // Log('equipItems', items);
    for (const item of items) {
      const components = item.metadatas.map((meta) => GetHashKey(meta.shopItem));
      await PVGame.setPedComponentsMp(ped, components);
    }

    // RefreshMetaPedShopItems(ped, 1);
    PVGame.finalizePedOutfit(ped);
    await PVGame.pedIsReadyToRender(ped, 5);

    let lanternOnHip = false;
    for (const item of items) {
      const itemData = PVItems[item.identifier];

      for (const metadata of item.metadatas) {
        if (metadata.palette === 'NONE') {
          continue;
        }
        paletteManager.setTintByCategory(
          ped,
          metadata.category,
          metadata.palette,
          metadata.tint0,
          metadata.tint1,
          metadata.tint2,
        );
      }

      if ('weaponHash' in itemData && itemData.weaponHash) {
        lanternOnHip = true;
        SetCurrentPedWeapon(PVGame.playerPed(), itemData.weaponHash, true, AttachPoint.Hip, false, false);
      }
    }

    if (!lanternOnHip) {
      SetCurrentPedWeapon(PVGame.playerPed(), GetHashKey('WEAPON_UNARMED'), true, AttachPoint.Hip, false, false);
    }

    PVGame.finalizePedOutfit(ped);
  }

  getComponentWearableStates(component: number, isMale = false) {
    const wearableStateCount = GetShopItemNumWearableStates(component, !isMale, true);

    const states: Record<number, { hash: number; name: string }> = {
      [0]: {
        hash: BASE_HASH,
        name: 'BASE',
      },
    };

    if (wearableStateCount > 0) {
      for (let i = wearableStateCount; i--; ) {
        const wearableState = GetShopItemWearableStateByIndex(component, i, !isMale, true);

        if (wearableStates.has(wearableState)) {
          states[i + 1] = {
            hash: wearableState,
            name: wearableStates.get(wearableState) as string,
          };
        } else {
          states[i + 1] = {
            hash: wearableState,
            name: `0x${(wearableState >>> 0).toString(16)}`,
          };
        }
      }
    }

    return states;
  }

  getPedComponentAtIndex(ped: number, index: number, metaPedType?: number, options?: Options.NONE): Component;
  getPedComponentAtIndex(
    ped: number,
    index: number,
    metaPedType?: number,
    options?: Options.DRAWABLE,
  ): ComponentWithDrawable;
  getPedComponentAtIndex(
    ped: number,
    index: number,
    metaPedType?: number,
    options?: Options.WEARABLE_STATES,
  ): ComponentWithWearableStates;
  getPedComponentAtIndex(
    ped: number,
    index: number,
    metaPedType?: number,
    options?: Options.DRAWABLE & Options.WEARABLE_STATES,
  ): ComponentWithAll;
  getPedComponentAtIndex(ped: number, index: number, metaPedType?: number, options: Options = Options.NONE) {
    if (!metaPedType) {
      metaPedType = GetMetaPedType(ped);
    }

    const struct1 = new DataView(new ArrayBuffer(4));
    const struct2 = new DataView(new ArrayBuffer(4));
    const componentId = GetShopItemComponentAtIndex(ped, index, true, struct1, struct2);
    const wearableState = struct2.getInt32(0, true);
    const category = GetShopItemComponentCategory(componentId, metaPedType, true);

    const component: Component = {
      id: componentId,
      category,
      wearableState,
    };

    if (componentCategories.has(category)) {
      component.categoryName = componentCategories.get(category);
    }

    if (wearableStates.has(wearableState)) {
      component.wearableStateName = wearableStates.get(wearableState);
    }

    if (options & Options.WEARABLE_STATES) {
      component.wearableStates = this.getComponentWearableStates(componentId, true);
    }

    if (options & Options.DRAWABLE) {
      const [_, drawable, albedo, normal, material] = GetMetaPedAssetGuids(ped, index);

      component.drawable = drawable;
      component.albedo = albedo;
      component.normal = normal;
      component.material = material;
    }

    return component;
  }

  getPedComponents(ped: number) {
    const metaPedType = GetMetaPedType(ped);
    const componentCount = GetNumComponentsInPed(ped);

    const components: Component[] = [];
    for (let i = componentCount; i--; ) {
      const component = this.getPedComponentAtIndex(ped, i, metaPedType);

      components.push(component);
    }

    return components;
  }

  getPedComponentsForUI(ped: number): ComponentWithWearableStates[] {
    const metaPedType = GetMetaPedType(ped);
    const componentCount = GetNumComponentsInPed(ped);

    const components: ComponentWithWearableStates[] = [];
    for (let i = componentCount; i--; ) {
      const component = this.getPedComponentAtIndex(ped, i, metaPedType, Options.WEARABLE_STATES);

      components.push(component);
    }

    return components;
  }
}

export const componentManager = ComponentManager.getInstance();
