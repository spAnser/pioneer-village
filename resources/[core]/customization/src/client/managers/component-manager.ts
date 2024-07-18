import { PVGame } from '@lib/client';
import { Delay } from '@lib/functions';
import componentCategories from '../data/component-categories';
import { paletteManager } from './palette-manager';

const CategoriesToKeep = ['BODIES_LOWER', 'BODIES_UPPER', 'EYES', 'HAIR', 'HEADS'];

class Component {
  protected static instance: Component;

  static getInstance(): Component {
    if (!Component.instance) {
      Component.instance = new Component();
    }
    return Component.instance;
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

    for (const item of items) {
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
    }

    PVGame.finalizePedOutfit(ped);
  }
}

export const componentManager = Component.getInstance();
