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

// IN(0xA9C28516A6DC9D56, PlayerPedId(), 7, Citizen.PointerValueInt(), Citizen.PointerValueInt(), Citizen.PointerValueInt(), Citizen.PointerValueInt())

// console.log('GetMetaPedAssetGuids', GetMetaPedAssetGuids(PVGame.playerPed(), 7));

const SetMetaPedTag = function (
  ped: number,
  drawable: number | string,
  albedo: number | string,
  normal: number | string,
  material: number | string,
  palette: number | string,
  tint0: number,
  tint1: number,
  tint2: number,
) {
  Citizen.invokeNative(
    '0xBC6DF00D7A4A6819',
    ped,
    typeof drawable === 'string' ? GetHashKey(drawable) : drawable,
    typeof albedo === 'string' ? GetHashKey(albedo) : albedo,
    typeof normal === 'string' ? GetHashKey(normal) : normal,
    typeof material === 'string' ? GetHashKey(material) : material,
    typeof palette === 'string' ? GetHashKey(palette) : palette,
    tint0,
    tint1,
    tint2,
  );
  PVGame.finalizePedOutfit(ped);
};

RegisterCommand(
  'tint_test',
  async (source: number, args: string[]) => {
    const tint0 = Number(args[0]);
    const tint1 = Number(args[1]);
    const tint2 = Number(args[2]);
    SetMetaPedTag(
      PVGame.playerPed(),
      994231401,
      -1958475523,
      967249018,
      162475627,
      'metaped_tint_generic',
      tint0,
      tint1,
      tint2,
    );
  },
  false,
);

const GetComponentIndexByCategory = (ped: number, category: number): number => {
  const componentCount = GetNumComponentsInPed(ped);
  for (let n = componentCount; n--; ) {
    if (category === (Citizen.invokeNative('0x9b90842304c938a7', ped, n) as number)) {
      return n;
    }
  }
};

// @ts-ignore
onUI('customization.tint-test', async (palette: string, tint0: number, tint1: number, tint2: number) => {
  console.log('customization.tint-test', palette, tint0, tint1, tint2);

  const playerPed = PVGame.playerPed();

  // const textureId = TextureIDs.get(playerPed);
  // const overlayId = 1;
  //
  // if (textureId) {
  //   SetTextureLayerPallete(textureId, overlayId, GetHashKey(palette));
  //   SetTextureLayerTint(textureId, overlayId, tint0, tint1, tint2);
  //   UpdatePedTexture(textureId);
  // }

  const index = GetComponentIndexByCategory(playerPed, GetHashKey('eyes'));
  console.log('index', index);
  // GetMetaPedAssetTint
  // GetMetaPedAssetGuids
  // @ts-ignore
  const [drawable, albedo, normal, material] = Citizen.invokeNative(
    '0xA9C28516A6DC9D56',
    PVGame.playerPed(),
    index,
    Citizen.pointerValueInt(),
    Citizen.pointerValueInt(),
    Citizen.pointerValueInt(),
    Citizen.pointerValueInt(),
  );

  // GetCategoryOfComponentAtIndex;
  console.log('category', Citizen.invokeNative('0x9b90842304c938a7', playerPed, index));

  console.log('drawable', drawable);

  SetMetaPedTag(playerPed, drawable, albedo, normal, material, palette, tint0, tint1, tint2);
});
