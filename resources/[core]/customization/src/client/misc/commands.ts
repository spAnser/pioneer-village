import { emitUI, focusUI, onUI, PVGame } from '@lib/client';
import TextureTypes from '../data/texture-types';
import BaseOverlay from '../data/base-overlay';
import OverlayInfo from '../data/overlay-info';
import ColorPalettes from '../data/color-palettes';
import { Delay } from '@lib/functions';

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

    SetTextureLayerPallete(textureId, overlayId, ColorPalettes.metaped_tint_generic);
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
    emitUI('customization.state', { show: true, state: 'gender' });
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

const GetComponentIndexByCategory = (ped: number, category: number): number => {
  const componentCount = GetNumComponentsInPed(ped);
  for (let n = componentCount; n--; ) {
    if (category === GetCategoryOfComponentAtIndex(ped, n)) {
      return n;
    }
  }
  return -1;
};

// @ts-ignore
onUI('customization.tint-test', async (palette: string, tint0: number, tint1: number, tint2: number) => {
  console.log('customization.tint-test', palette, tint0, tint1, tint2);

  // const ped = PVGame.playerPed();
  const ped = 673026;

  // const textureId = TextureIDs.get(ped);
  // const overlayId = 1;
  //
  // if (textureId) {
  //   SetTextureLayerPallete(textureId, overlayId, GetHashKey(palette));
  //   SetTextureLayerTint(textureId, overlayId, tint0, tint1, tint2);
  //   UpdatePedTexture(textureId);
  // }

  // const index = GetComponentIndexByCategory(ped, GetHashKey('vests'));
  // const index = 3;
  const componentCount = GetNumComponentsInPed(ped);
  for (let index = componentCount; index--; ) {
    console.log('index', index);
    const [oldPalette, oldTint0, oldTint1, oldTint2] = GetMetaPedAssetTint(ped, index);
    console.log('palette', oldPalette, '->', palette);
    console.log('tint0', oldTint0, '->', tint0);
    console.log('tint1', oldTint1, '->', tint1);
    console.log('tint2', oldTint2, '->', tint2);
    const [drawable, albedo, normal, material] = GetMetaPedAssetGuids(ped, index);

    console.log('category', GetCategoryOfComponentAtIndex(ped, index));

    console.log('drawable', drawable);

    SetMetaPedTag(ped, drawable, albedo, normal, material, palette, tint0, tint1, tint2);
  }
  PVGame.finalizePedOutfit(ped);
});
