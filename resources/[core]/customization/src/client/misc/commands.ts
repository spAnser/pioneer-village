import { emitUI, focusUI, onUI, PVGame } from '@lib/client';
import { ColorPalettes } from '@lib/shared/color-palettes';
import TextureTypes from '../data/texture-types';
import BaseOverlay from '../data/base-overlay';
import OverlayInfo from '../data/overlay-info';
import { paletteManager } from '../managers/palette-manager';

const TextureIDs: Map<number, number> = new Map();

RegisterCommand(
  'overlay',
  async () => {
    const playerPed = PVGame.playerPed();

    const isMale = IsPedMale(playerPed);

    const textureSettings = isMale ? TextureTypes.male : TextureTypes.female;

    const oldTextureId = TextureIDs.get(playerPed);
    if (oldTextureId) {
      ResetPedTexture_2(oldTextureId);
      ReleaseTexture(oldTextureId);
      TextureIDs.delete(playerPed);
    }

    const skinTone = 0;

    const textureId = RequestTexture(
      textureSettings.albedo[skinTone],
      textureSettings.normal[skinTone],
      textureSettings.material,
    );
    console.log('textureId', textureId);
    TextureIDs.set(playerPed, textureId);

    const overlayId = AddTextureLayer(
      textureId,
      OverlayInfo.eyebrows[0].id,
      OverlayInfo.eyebrows[0].normal,
      OverlayInfo.eyebrows[0].ma,
      BaseOverlay[0].tx_color_type,
      BaseOverlay[0].tx_opacity,
      BaseOverlay[0].tx_unk,
    );
    console.log('overlayId', overlayId);

    SetTextureLayerPallete(textureId, overlayId, ColorPalettes.metaped_tint_generic.hash);
    SetTextureLayerTint(
      textureId,
      overlayId,
      BaseOverlay[0].palette_color_primary,
      BaseOverlay[0].palette_color_secondary,
      BaseOverlay[0].palette_color_tertiary,
    );

    SetTextureLayerSheetGridIndex(textureId, overlayId, BaseOverlay[0].var);
    SetTextureLayerAlpha(textureId, overlayId, BaseOverlay[0].opacity);

    await PVGame.waitTextureIsValid(textureId);

    OverrideTextureOnPed(playerPed, GetHashKey('heads'), textureId);
    UpdatePedTexture(textureId);

    PVGame.finalizePedOutfit(playerPed);
    console.log('DONE');
  },
  false,
);

RegisterCommand(
  'overlay_ui',
  () => {
    const ped = PVGame.playerPed();
    const hatCategoryTint = paletteManager.getTintForCategory(ped, 'hats');
    console.log('hatCategoryTint', hatCategoryTint);
    const coatCategoryTint = paletteManager.getTintForCategory(ped, 'coats');
    console.log('coatCategoryTint', coatCategoryTint);
    emitUI('customization.state', { show: true, state: 'gender' });
    if (hatCategoryTint) {
      emitUI('customization.set-tint-by-category', 'hats', hatCategoryTint);
    }
    if (coatCategoryTint) {
      emitUI('customization.set-tint-by-category', 'coats', coatCategoryTint);
    }
    focusUI(true, true);
  },
  false,
);

RegisterCommand(
  'overlay_ui_close',
  () => {
    emitUI('customization.state', { show: false });
    focusUI(false, false);
  },
  false,
);

// console.log('GetMetaPedAssetGuids', GetMetaPedAssetGuids(PVGame.playerPed(), 7));

// @ts-ignore
onUI('customization.tint-test', async (palette: string, tint0: number, tint1: number, tint2: number) => {
  console.log('customization.tint-test', palette, tint0, tint1, tint2);

  // const ped = 437506;
  // paletteManager.setTint(ped, palette, tint0, tint1, tint2);
  const ped = PVGame.playerPed();
  paletteManager.setTintByCategory(ped, 'coats', palette, tint0, tint1, tint2);

  // const ped = GetLastMount(PVGame.playerPed());
  // paletteManager.setTint(ped, palette, tint0, tint1, tint2);
  // paletteManager.removeTint(ped);
  // paletteManager.setTintByHorsePart(ped, 'head', 'metaped_tint_horse', 18, 1, 5);
  // paletteManager.setTintByHorsePart(ped, 'hand', 'metaped_tint_horse', 18, 1, 6);
  // paletteManager.setTintByHorsePart(ped, 'hair', 'metaped_tint_horse', 0, 0, 0);
  // paletteManager.setTintByHorsePart(ped, 'mane', 'metaped_tint_horse', 0, 0, 0);
  // await Delay(1000);
  // paletteManager.setTintByHorsePart(ped, 'teef', palette, tint0, tint1, tint2);
  // paletteManager.setTintByHorsePart(ped, 'hair', palette, tint0, tint1, tint2);
  // paletteManager.setTintByHorsePart(ped, 'mane', palette, tint0, tint1, tint2);

  // const ped = 7593731;
  // paletteManager.setTint(ped, palette, tint0, tint1, tint2);
});

onUI('customization.set-tint-by-category', (category, data) => {
  const ped = PVGame.playerPed();
  if (data.palette !== 0) {
    paletteManager.setTintByCategory(ped, category, data.palette, data.tint0, data.tint1, data.tint2);
  }
});
