import { emitUI, focusUI, onUI, PVGame } from '@lib/client';
import { ColorPalettes } from '@lib/shared/color-palettes';
import BaseOverlay from '../data/base-overlay';
import OverlayInfo from '../data/overlay-info';
import { paletteManager } from '../managers/palette-manager';
import { Log } from '@lib/client/comms/ui';
import { creationManager } from '../managers/creation-manager';
import PaletteOptions from '../../shared/palette-options';

const TextureIDs: Map<number, number> = new Map();

RegisterCommand(
  'overlay_test',
  () => {
    const overlay: Customization.Overlay = {
      // id: 'mp_u_faov_eyebrow_m_000',
      // id: 'mp_u_faov_ageing_000',
      id: 'mp_u_faov_eyebrow_m_000',
      opacity: 0.99,
      // palette: {
      //   palette: 'metaped_tint_makeup',
      //   tint0: 41,
      //   tint1: 41,
      //   tint2: 41,
      // },
    };

    creationManager.setOverlays([overlay], PlayerPedId());
  },
  false,
);

onUI('overlay.test.thing', (overlay: UI.Customization.OverlayJsonData) => {
  Log('overlay.test.thing', overlay);

  creationManager.setOverlays([
    {
      id: overlay.id,
      opacity: 0.99,
      // palette: {
      //   palette: 'metaped_tint_makeup',
      //   tint0: 41,
      //   tint1: 41,
      //   tint2: 41,
      // },
    },
  ]);
});

RegisterCommand(
  'overlay',
  async () => {
    const playerPed = PVGame.playerPed();

    const oldTextureId = TextureIDs.get(playerPed);
    if (oldTextureId) {
      ClearPedTexture(oldTextureId);
      ReleaseTexture(oldTextureId);
      TextureIDs.delete(playerPed);
    }

    const index = paletteManager.getIndexForCategory(playerPed, 'HEADS');
    const { albedo, normal, material } = paletteManager.getGuidsAtIndex(playerPed, index);
    Log('heads guids', index, albedo, normal, material);

    const textureId = RequestTexture(albedo, normal, material);
    Log('textureId', textureId);
    TextureIDs.set(playerPed, textureId);

    // paletteManager.updateLayersForCategory(playerPed, 'HEADS', [
    //     {OverlayInfo.eyebrows[0], color_type, opacity, unk, palette_hash, paleete_primary, palette_secondary, palette_teriatary},
    // ])

    // PED | TextureID | OverlayID[]

    const overlay = {
      id: 'mp_u_faov_eyebrow_m_000',
    };
    const [overlayCategory, overlayInfo] = creationManager.getOverlayInfo(overlay.id);
    if (!overlayCategory || !overlayInfo) {
      Log('Overlay not found', overlay.id);
      return;
    }
    const baseOverlay = creationManager.getBaseOverlay(overlayCategory);

    Log('addLayer', textureId, overlay, baseOverlay, overlayInfo);

    if (!baseOverlay || !overlayInfo) {
      return;
    }

    const layerId = AddTextureLayer(
      textureId,
      overlayInfo.id,
      overlayInfo.normal || 0,
      overlayInfo.ma || 0,
      baseOverlay.tx_color_type,
      baseOverlay.tx_opacity,
      baseOverlay.tx_unk,
    );
    Log('layerId', layerId);

    SetTextureLayerPallete(textureId, layerId, ColorPalettes.metaped_tint_generic.hash);
    SetTextureLayerTint(
      textureId,
      layerId,
      0, //baseOverlay.palette_color_primary,
      0, //baseOverlay.palette_color_secondary,
      0, //baseOverlay.palette_color_tertiary,
    );

    SetTextureLayerSheetGridIndex(textureId, layerId, baseOverlay.var);
    SetTextureLayerAlpha(textureId, layerId, 0.9999); // baseOverlay.opacity
    SetTextureLayerRoughness(textureId, layerId, 0);

    await PVGame.waitTextureIsValid(textureId);

    ApplyTextureOnPed(playerPed, GetHashKey('heads'), textureId);
    UpdatePedTexture(textureId);

    PVGame.finalizePedOutfit(playerPed);
    Log('DONE');
  },
  false,
);

RegisterCommand(
  'overlay_ui',
  () => {
    const ped = PVGame.playerPed();

    const hatCategoryTint = paletteManager.getTintForCategory(ped, 'hats');
    const hatCategoryIndex = paletteManager.getIndexForCategory(ped, 'hats');
    Log('hatCategoryTint', hatCategoryIndex, hatCategoryTint);
    const coatCategoryTint = paletteManager.getTintForCategory(ped, 'coats');
    const coatCategoryIndex = paletteManager.getIndexForCategory(ped, 'coats');
    Log('coatCategoryTint', coatCategoryIndex, coatCategoryTint);
    emitUI('customization.state', { show: true, state: 'gender' });
    if (hatCategoryTint) {
      emitUI('customization.set-tint-by-category', 'hats', hatCategoryTint);
    }
    if (coatCategoryTint) {
      emitUI('customization.set-tint-by-category', 'coats', coatCategoryTint);
    }
    focusUI(true, true);

    const categories: string[] = ['BOOTS', 'NECKWEAR', 'SHIRTS_FULL', 'VESTS', 'PANTS'];
    for (const category of categories) {
      const CategoryTint = paletteManager.getTintForCategory(ped, category);
      const CategoryIndex = paletteManager.getIndexForCategory(ped, category);
      Log('CategoryTint', category, CategoryIndex, CategoryTint);
    }
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

// Log('GetMetaPedAssetGuids', GetMetaPedAssetGuids(PVGame.playerPed(), 7));

// @ts-ignore
onUI('customization.tint-test', async (palette: string, tint0: number, tint1: number, tint2: number) => {
  Log('customization.tint-test', palette, tint0, tint1, tint2);

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
