import { PVGame } from '@lib/client';
import horseDrawables from '../data/horse-drawables';

class PaletteManager {
  protected static instance: PaletteManager;

  static getInstance(): PaletteManager {
    if (!PaletteManager.instance) {
      PaletteManager.instance = new PaletteManager();
    }
    return PaletteManager.instance;
  }

  getGuidsAtIndex: Customization.GetGuidsAtIndex = (entity, index) => {
    const [_, drawable, albedo, normal, material] = GetMetaPedAssetGuids(entity, index);
    return { drawable, albedo, normal, material };
  };

  getDrawableAtIndex: Customization.GetDrawableAtIndex = (entity, index) => {
    return this.getGuidsAtIndex(entity, index).drawable;
  };

  getAlbedoAtIndex: Customization.GetAlbedoAtIndex = (entity, index) => {
    return this.getGuidsAtIndex(entity, index).albedo;
  };

  getNormalAtIndex: Customization.GetNormalAtIndex = (entity, index) => {
    return this.getGuidsAtIndex(entity, index).normal;
  };

  getMaterialAtIndex: Customization.GetMaterialAtIndex = (entity, index) => {
    return this.getGuidsAtIndex(entity, index).material;
  };

  getTintAtIndex: Customization.GetTintAtIndex = (entity, index) => {
    const [_, palette, tint0, tint1, tint2] = GetMetaPedAssetTint(entity, index);
    return { palette, tint0, tint1, tint2 };
  };

  getPaletteAtIndex: Customization.GetPaletteAtIndex = (entity, index) => {
    return this.getTintAtIndex(entity, index).palette;
  };

  getTint0AtIndex: Customization.GetTint0AtIndex = (entity, index) => {
    return this.getTintAtIndex(entity, index).tint0;
  };

  getTint1AtIndex: Customization.GetTint1AtIndex = (entity, index) => {
    return this.getTintAtIndex(entity, index).tint1;
  };

  getTint2AtIndex: Customization.GetTint2AtIndex = (entity, index) => {
    return this.getTintAtIndex(entity, index).tint2;
  };

  getIndexForDrawable: Customization.GetIndexForDrawable = (entity, drawable) => {
    if (typeof drawable === 'string') {
      drawable = GetHashKey(drawable);
    }

    const componentCount = GetNumComponentsInPed(entity);
    for (let index = componentCount; index--; ) {
      if (this.getDrawableAtIndex(entity, index) === drawable) {
        return index;
      }
    }

    return -1;
  };

  getTintForDrawable: Customization.GetTintForDrawable = (entity, drawable) => {
    if (typeof drawable === 'string') {
      drawable = GetHashKey(drawable);
    }

    const index = this.getIndexForDrawable(entity, drawable);
    if (index === -1) {
      return;
    }

    return this.getTintAtIndex(entity, index);
  };

  getIndexForCategory: Customization.GetIndexForCategory = (entity, category) => {
    if (typeof category === 'string') {
      category = GetHashKey(category);
    }

    const componentCount = GetNumComponentsInPed(entity);
    for (let index = componentCount; index--; ) {
      // GetCategoryOfComponentAtIndex
      // @ts-ignore
      if (Citizen.invokeNative('0x9b90842304c938a7', entity, index, 0) === category) {
        return index;
      }
    }

    return -1;
  };

  getTintForCategory: Customization.GetTintForCategory = (entity, category) => {
    if (typeof category === 'string') {
      category = GetHashKey(category);
    }

    const index = this.getIndexForCategory(entity, category);
    if (index === -1) {
      return;
    }

    return this.getTintAtIndex(entity, index);
  };

  setTintForCategory: Customization.SetTintForCategory = (entity, category, palette, tint0, tint1, tint2) => {
    if (typeof category === 'string') {
      category = GetHashKey(category);
    }

    SetTextureOutfitTints(entity, category, palette, tint0, tint1, tint2);

    const index = this.getIndexForCategory(entity, category);
    if (index === -1) {
      return;
    }

    return this.getTintAtIndex(entity, index);
  };

  setTintAtIndex: Customization.SetTintAtIndex = (entity, index, palette, tint0, tint1, tint2) => {
    if (typeof palette === 'string') {
      palette = GetHashKey(palette);
    }
    const { drawable, albedo, normal, material } = this.getGuidsAtIndex(entity, index);

    SetMetaPedTag(entity, drawable, albedo, normal, material, palette, tint0, tint1, tint2);

    PVGame.finalizePedOutfit(entity);
  };

  setTint: Customization.SetTint = (entity, palette, tint0, tint1, tint2) => {
    const componentCount = GetNumComponentsInPed(entity);
    for (let index = componentCount; index--; ) {
      this.setTintAtIndex(entity, index, palette, tint0, tint1, tint2);
    }
  };

  removeTint: Customization.RemoveTint = (entity) => {
    // RemoveTagFromMetaPed
    const componentCount = GetNumComponentsInPed(entity);
    for (let index = componentCount; index--; ) {
      this.setTintAtIndex(entity, index, -1, 0, 0, 0);
    }
  };

  removeTintByIndex: Customization.RemoveTintByIndex = (entity, index) => {
    this.setTintAtIndex(entity, index, -1, 0, 0, 0);
  };

  removeTintByCategory: Customization.RemoveTintByCategory = (entity, category) => {
    if (typeof category === 'string') {
      category = GetHashKey(category);
    }
    const index = this.getIndexForCategory(entity, category);
    if (index === -1) {
      return;
    }
    this.setTintAtIndex(entity, index, -1, 0, 0, 0);
  };

  setTintByCategory: Customization.SetTintByCategory = (entity, category, palette, tint0, tint1, tint2) => {
    if (typeof category === 'string') {
      category = GetHashKey(category);
    }
    const index = this.getIndexForCategory(entity, category);
    if (index === -1) {
      return;
    }
    this.setTintAtIndex(entity, index, palette, tint0, tint1, tint2);
  };

  setTintByDrawable: Customization.SetTintByDrawable = (entity, drawable, palette, tint0, tint1, tint2) => {
    if (typeof drawable === 'string') {
      drawable = GetHashKey(drawable);
    }
    const index = this.getIndexForDrawable(entity, drawable);
    if (index === -1) {
      return;
    }
    this.setTintAtIndex(entity, index, palette, tint0, tint1, tint2);
  };

  getHorseDrawableAtIndex: Customization.GetHorseDrawableAtIndex = (entity, index) => {
    return horseDrawables[this.getDrawableAtIndex(entity, index)];
  };

  getIndexForHorsePart: Customization.GetIndexForHorsePart = (entity, part) => {
    const componentCount = GetNumComponentsInPed(entity);
    for (let index = componentCount; index--; ) {
      if (this.getHorseDrawableAtIndex(entity, index)?.includes(part)) {
        return index;
      }
    }

    return -1;
  };

  setTintByHorsePart: Customization.SetTintByHorsePart = (entity, part, palette, tint0, tint1, tint2) => {
    const index = this.getIndexForHorsePart(entity, part);
    if (index === -1) {
      return;
    }
    this.setTintAtIndex(entity, index, palette, tint0, tint1, tint2);
  };
}

export const paletteManager = PaletteManager.getInstance();
