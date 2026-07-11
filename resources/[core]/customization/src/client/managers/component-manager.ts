import { PVGame } from '@lib/client';
import { AttachPoint } from '@lib/flags';
import { Delay } from '@lib/functions';
import { BODY_CATEGORIES } from '@lib/shared/body-categories';
import PVItems from '@lib/shared/items';
import { getWearableStateConfig } from '@lib/shared/wearable-states';

import componentCategories from '../data/component-categories';
import wearableStates from '../data/wearable-states';
import { paletteManager } from './palette-manager';

const BASE_HASH = GetHashKey('BASE');

const CategoriesToKeep = BODY_CATEGORIES.map((c) => c.toUpperCase());

const mpComponentHashes = new Set<number>();

const componentFiles = [
  '2886757168',
  'accessories',
  'ammo_pistols',
  'ammo_rifles',
  'aprons',
  'armor',
  'badges',
  'beards_chin',
  'beards_chops',
  'beards_complete',
  'beards_mustache',
  'belt_buckles',
  'belts',
  'bodies_lower',
  'bodies_upper',
  'boot_accessories',
  'boots',
  'chaps',
  'cloaks',
  'coats',
  'coats_closed',
  'dresses',
  'eyes',
  'eyewear',
  'gauntlets',
  'gloves',
  'gunbelt_accs',
  'gunbelts',
  'hair',
  'hair_accessories',
  'hats',
  'heads',
  'holsters_crossdraw',
  'holsters_knife',
  'holsters_left',
  'holsters_right',
  'jewelry_bracelets',
  'jewelry_rings_left',
  'jewelry_rings_right',
  'loadouts',
  'masks',
  'masks_large',
  'neckties',
  'neckwear',
  'pants',
  'ponchos',
  'satchels',
  'shirts_full',
  'skirts',
  'spats',
  'suspenders',
  'talisman_belt',
  'talisman_holster',
  'talisman_satchel',
  'talisman_wrist',
  'teeth',
  'vests',
];

for (const file of componentFiles) {
  try {
    const json = LoadResourceFile('rdr3-shared', `components-ui/${file}.json`);
    if (!json) continue;
    const styles: ComponentsUIJson = JSON.parse(json);
    for (const style of styles) {
      for (const comp of style.components) {
        if (comp.isMp) mpComponentHashes.add(comp.component >>> 0);
      }
    }
  } catch (_e) {
    // Skip files that fail to parse
  }
}

export const isMpComponent = (hash: number): boolean => mpComponentHashes.has(hash >>> 0);

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
      // console.log('removePedComponentCategory', ped, categoryHash);
      await PVGame.removePedComponentCategory(ped, categoryHash);
      await Delay(1);
    }
  }

  async equipItems(ped: number, items: UI.Inventory.ItemData[]) {
    await this.unequipClothing(ped);

    // console.log('equipItems', items);
    for (const item of items) {
      for (const meta of item.metadatas) {
        const hash = typeof meta.shopItem === 'string' ? GetHashKey(meta.shopItem) : meta.shopItem;
        ApplyShopItemToPed(ped, hash, false, isMpComponent(hash), false);
        await Delay(1);
        if (meta.wearableState) {
          const state = typeof meta.wearableState === 'string' ? GetHashKey(meta.wearableState) : meta.wearableState;
          UpdateShopItemWearableState(ped, hash, state, 0, true, 0);
        }
      }
    }

    // RefreshMetaPedShopItems(ped, 1);
    PVGame.finalizePedOutfit(ped);
    await PVGame.pedIsReadyToRender(ped, 5);

    let lanternOnHip = false;
    for (const item of items) {
      const itemData = PVItems[item.identifier];

      for (const metadata of item.metadatas) {
        if (!metadata.palette || metadata.palette === 'NONE') {
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
        const playerPed = PVGame.playerPed();
        SetCurrentPedWeapon(playerPed, itemData.weaponHash, true, AttachPoint.Hip, false, false);

        const oilColor = (item.metadatas[0] as Inventory.LanternMetadata | undefined)?.oilColor;
        if (oilColor) {
          let attempts = 0;
          let weaponEntity = GetCurrentPedWeaponEntityIndex(playerPed, AttachPoint.Hip);
          while (weaponEntity === 0) {
            weaponEntity = GetCurrentPedWeaponEntityIndex(playerPed, AttachPoint.Hip);
            console.log('weaponEntity', weaponEntity);
            await Delay(100);
          }
          if (weaponEntity) {
            SetLightsColorForEntity(weaponEntity, oilColor[0], oilColor[1], oilColor[2]);
          }
        }
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

  async loadMetaPedOutfit(model: number, outfit: string | number, delay = 250): Promise<number> {
    if (typeof outfit === 'string') {
      outfit = GetHashKey(outfit);
    }
    const requestId = RequestMetaPedOutfit(model, outfit);
    if (HasMetaPedOutfitLoaded(requestId)) {
      return requestId;
    }
    return new Promise((resolve) => {
      if (HasMetaPedOutfitLoaded(requestId)) {
        resolve(requestId);
      } else {
        const modelLoadedCheck = setInterval(() => {
          if (HasMetaPedOutfitLoaded(requestId)) {
            resolve(requestId);
            clearInterval(modelLoadedCheck);
          }
        }, delay);
      }
    });
  }

  async applyMetaPedOutfit(ped: number, outfitHash: string | number) {
    const model = GetEntityModel(ped);

    if (!DoesMetaPedOutfitExistForPedModel(outfitHash, model)) return;

    const requestId = await this.loadMetaPedOutfit(model, outfitHash);

    ApplyPedMetaPedOutfit(requestId, ped, true, false);
    ReleaseMetaPedOutfitRequest(requestId);
  }

  async setWearableState(category: string | number, state: string | number, ped?: number) {
    if (!ped) {
      ped = PVGame.playerPed();
    }
    console.log(`PVCustomization.setWearableState(${category}, ${state});`);

    const options = getWearableStateConfig(category, state);

    if (typeof category === 'string') {
      category = GetHashKey(category);
    }
    if (typeof state === 'string') {
      state = GetHashKey(state);
    }

    const components = this.getPedComponents(ped);

    for (const component of components) {
      if (category === component.category) {
        if (options) {
          if ('interaction' in options) {
            StartTaskItemInteraction(PVGame.playerPed(), 0, options.interaction, 1, 0, -1.0);
            await Delay(options.interactionDelay);
          }
          if ('anim' in options) {
            await PVGame.playAnimTask(options.anim);
          }
        }
        UpdateShopItemWearableState(ped, component.id, state, 0, true, 0);
        break;
      }
    }
    PVGame.finalizePedOutfit(ped);
  }
}

export const componentManager = ComponentManager.getInstance();
