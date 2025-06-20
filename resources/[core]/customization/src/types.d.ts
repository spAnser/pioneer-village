declare interface RPC {}

declare namespace Customization {
  enum CreationState {
    None = -1,
    GenderSelection = 0,
    NameSelection = 1,
    ClothingSelection = 2,
  }

  type State = 'transition' | 'gender' | 'info' | 'head' | 'body' | 'clothing' | 'finalize';

  type Guids = {
    drawable: number;
    albedo: number;
    normal: number;
    material: number;
  };
  type Palette = {
    palette: number;
    tint0: number;
    tint1: number;
    tint2: number;
  };
  type Overlay = {
    id: number | string;
    opacity: number;
    roughness?: number;
    palette: Palette;
  };

  type OverlayCategories =
    | 'eyebrows'
    | 'scars'
    | 'eyeliners'
    | 'lipsticks'
    | 'acne'
    | 'shadows'
    | 'beardstabble'
    | 'paintedmasks'
    | 'ageing'
    | 'blush'
    | 'complex'
    | 'disc'
    | 'foundation'
    | 'freckles'
    | 'grime'
    | 'hair'
    | 'moles'
    | 'spots'
    | string;

  type BaseOverlayItem = {
    name: OverlayCategories;
    visibility: number;
    tx_id: number;
    tx_normal: number;
    tx_material: number;
    tx_color_type: number;
    tx_opacity: number;
    tx_unk: number;
    palette: number;
    palette_color_primary: number;
    palette_color_secondary: number;
    palette_color_tertiary: number;
    var: number;
    opacity: number;
  };

  type PaletteData = { hash: number; count: number };

  type Palettes =
    | 'metaped_tint_animal'
    | 'metaped_tint_combined'
    | 'metaped_tint_combined_leather'
    | 'metaped_tint_eye'
    | 'metaped_tint_generic'
    | 'metaped_tint_generic_clean'
    | 'metaped_tint_generic_weathered'
    | 'metaped_tint_generic_worn'
    | 'metaped_tint_hair'
    | 'metaped_tint_hat'
    | 'metaped_tint_hat_clean'
    | 'metaped_tint_hat_weathered'
    | 'metaped_tint_hat_worn'
    | 'metaped_tint_horse'
    | 'metaped_tint_horse_leather'
    | 'metaped_tint_leather'
    | 'metaped_tint_makeup'
    | 'metaped_tint_mpadv'
    | 'metaped_tint_skirt_clean'
    | 'metaped_tint_skirt_weathered'
    | 'metaped_tint_skirt_worn'
    | 'weapon_tint_wood'
    | 'weapon_tint_wood_working';

  type HorseParts =
    | 'acc2'
    | 'acc3'
    | 'accs'
    | 'body'
    | 'coat'
    | 'explorer_items'
    | 'feather'
    | 'feet'
    | 'hair'
    | 'hand'
    | 'head'
    | 'hunting_items'
    | 'lasso'
    | 'longscabbardl'
    | 'longscabbardr'
    | 'lowr'
    | 'mane'
    | 'merge'
    | 'moneybags'
    | 'moustache'
    | 'peltlarge'
    | 'peltmedium'
    | 'peltmediumsmall'
    | 'prosleg'
    | 'prospectorsgear'
    | 'task'
    | 'teef'
    | 'uppr';
}
