declare interface RPC {}

declare namespace Customization {
  enum CreationState {
    None = -1,
    GenderSelection = 0,
    ClothingSelection = 1,
  }

  type Guids = { drawable: number; albedo: number; normal: number; material: number };
  type Palette = { palette: number; tint0: number; tint1: number; tint2: number };

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
