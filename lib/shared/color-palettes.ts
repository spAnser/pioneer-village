const ColorPalettes: Record<Customization.PaletteNames, Customization.PaletteData> = {
  metaped_tint_animal: {
    hash: 0x9ac34f34,
    count: 255, // 256
  },
  metaped_tint_combined: {
    hash: 0x6765bc15,
    count: 255, // 256
  },
  metaped_tint_combined_leather: {
    hash: 0xf509c745,
    count: 255, // 256
  },
  metaped_tint_eye: {
    hash: 0xa4cfabd0,
    count: 255, // 256
  },
  metaped_tint_generic: {
    hash: 0xaa65d8a3,
    count: 255, // 256
  },
  metaped_tint_generic_clean: {
    hash: 0x4101ed87,
    count: 255, // 256
  },
  metaped_tint_generic_weathered: {
    hash: 0xf93db0c8,
    count: 255, // 256
  },
  metaped_tint_generic_worn: {
    hash: 0xb562025c,
    count: 128,
  },
  metaped_tint_hair: {
    hash: 0xdfb1f64c,
    count: 255, // 256
  },
  metaped_tint_hat: {
    hash: 0xfb71527b,
    count: 255, // 256
  },
  metaped_tint_hat_clean: {
    hash: 0x3385c5db,
    count: 255, // 256
  },
  metaped_tint_hat_weathered: {
    hash: 0x63838a81,
    count: 255, // 256
  },
  metaped_tint_hat_worn: {
    hash: 0x17cbcc83,
    count: 255, // 256
  },
  metaped_tint_horse: {
    hash: 0xa4041cef,
    count: 255, // 256
  },
  metaped_tint_horse_leather: {
    hash: 0x8ba18876,
    count: 255, // 256
  },
  metaped_tint_leather: {
    hash: 0xd1476963,
    count: 128,
  },
  metaped_tint_makeup: {
    hash: 0x3f6e70ff,
    count: 64,
  },
  metaped_tint_mpadv: {
    hash: 0xd799e1c2,
    count: 255, // 256
  },
  metaped_tint_skirt_clean: {
    hash: 0x0105607b,
    count: 255, // 256
  },
  metaped_tint_skirt_weathered: {
    hash: 0xb9e7f722,
    count: 255, // 256
  },
  metaped_tint_skirt_worn: {
    hash: 0xdc6bc93b,
    count: 255, // 256
  },
  weapon_tint_wood: {
    hash: 0x69abf60e,
    count: 128,
  },
  weapon_tint_wood_working: {
    hash: 0xe25ba89f,
    count: 128,
  },

  // metaped_tint_swatch_000: 0xbbf43ef8,
  // metaped_tint_swatch_001: 0x9e4803a0,
  // metaped_tint_swatch_002: 0x29f81b2a,
  // metaped_tint_swatch_003: 0x37cd36d4,
};

const ColorPaletteNames: Record<number, Customization.PaletteNames> = {
  [0x9ac34f34 >>> 0]: 'metaped_tint_animal',
  [0x6765bc15 >>> 0]: 'metaped_tint_combined',
  [0xf509c745 >>> 0]: 'metaped_tint_combined_leather',
  [0xa4cfabd0 >>> 0]: 'metaped_tint_eye',
  [0xaa65d8a3 >>> 0]: 'metaped_tint_generic',
  [0x4101ed87 >>> 0]: 'metaped_tint_generic_clean',
  [0xf93db0c8 >>> 0]: 'metaped_tint_generic_weathered',
  [0xb562025c >>> 0]: 'metaped_tint_generic_worn',
  [0xdfb1f64c >>> 0]: 'metaped_tint_hair',
  [0xfb71527b >>> 0]: 'metaped_tint_hat',
  [0x3385c5db >>> 0]: 'metaped_tint_hat_clean',
  [0x63838a81 >>> 0]: 'metaped_tint_hat_weathered',
  [0x17cbcc83 >>> 0]: 'metaped_tint_hat_worn',
  [0xa4041cef >>> 0]: 'metaped_tint_horse',
  [0x8ba18876 >>> 0]: 'metaped_tint_horse_leather',
  [0xd1476963 >>> 0]: 'metaped_tint_leather',
  [0x3f6e70ff >>> 0]: 'metaped_tint_makeup',
  [0xd799e1c2 >>> 0]: 'metaped_tint_mpadv',
  [0x0105607b >>> 0]: 'metaped_tint_skirt_clean',
  [0xb9e7f722 >>> 0]: 'metaped_tint_skirt_weathered',
  [0xdc6bc93b >>> 0]: 'metaped_tint_skirt_worn',
  [0x69abf60e >>> 0]: 'weapon_tint_wood',
  [0xe25ba89f >>> 0]: 'weapon_tint_wood_working',

  // [0xbbf43ef8 >>> 0]: 'metaped_tint_swatch_000',
  // [0x9e4803a0 >>> 0]: 'metaped_tint_swatch_001',
  // [0x29f81b2a >>> 0]: 'metaped_tint_swatch_002',
  // [0x37cd36d4 >>> 0]: 'metaped_tint_swatch_003',
};

export { ColorPalettes, ColorPaletteNames };
