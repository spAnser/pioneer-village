export const BlipColors = {
  LIGHT_BLUE: GetHashKey('BLIP_MODIFIER_MP_COLOR_1'),
  DARK_RED: GetHashKey('BLIP_MODIFIER_MP_COLOR_2'),
  PURPLE: GetHashKey('BLIP_MODIFIER_MP_COLOR_3'),
  ORANGE: GetHashKey('BLIP_MODIFIER_MP_COLOR_4'),
  TEAL: GetHashKey('BLIP_MODIFIER_MP_COLOR_5'),
  LIGHT_YELLOW: GetHashKey('BLIP_MODIFIER_MP_COLOR_6'),
  PINK: GetHashKey('BLIP_MODIFIER_MP_COLOR_7'),
  GREEN: GetHashKey('BLIP_MODIFIER_MP_COLOR_8'),
  DARK_TEAL: GetHashKey('BLIP_MODIFIER_MP_COLOR_9'),
  RED: GetHashKey('BLIP_MODIFIER_MP_COLOR_10'),
  LIGHT_GREEN: GetHashKey('BLIP_MODIFIER_MP_COLOR_11'),
  TEAL2: GetHashKey('BLIP_MODIFIER_MP_COLOR_12'),
  BLUE: GetHashKey('BLIP_MODIFIER_MP_COLOR_13'),
  DARK_PURPLE: GetHashKey('BLIP_MODIFIER_MP_COLOR_14'),
  DARK_PINK: GetHashKey('BLIP_MODIFIER_MP_COLOR_15'),
  DARK_DARK_RED: GetHashKey('BLIP_MODIFIER_MP_COLOR_16'),
  GRAY: GetHashKey('BLIP_MODIFIER_MP_COLOR_17'),
  PINKISH: GetHashKey('BLIP_MODIFIER_MP_COLOR_18'),
  YELLOW_GREEN: GetHashKey('BLIP_MODIFIER_MP_COLOR_19'),
  DARK_GREEN: GetHashKey('BLIP_MODIFIER_MP_COLOR_20'),
  BRIGHT_BLUE: GetHashKey('BLIP_MODIFIER_MP_COLOR_21'),
  BRIGHT_PURPLE: GetHashKey('BLIP_MODIFIER_MP_COLOR_22'),
  YELLOW_ORANGE: GetHashKey('BLIP_MODIFIER_MP_COLOR_23'),
  BLUE2: GetHashKey('BLIP_MODIFIER_MP_COLOR_24'),
  TEAL3: GetHashKey('BLIP_MODIFIER_MP_COLOR_25'),
  TAN: GetHashKey('BLIP_MODIFIER_MP_COLOR_26'),
  OFF_WHITE: GetHashKey('BLIP_MODIFIER_MP_COLOR_27'),
  LIGHT_YELLOW2: GetHashKey('BLIP_MODIFIER_MP_COLOR_28'),
  LIGHT_PINK: GetHashKey('BLIP_MODIFIER_MP_COLOR_29'),
  LIGHT_RED: GetHashKey('BLIP_MODIFIER_MP_COLOR_30'),
  LIGHT_YELLOW3: GetHashKey('BLIP_MODIFIER_MP_COLOR_31'),
  WHITE: GetHashKey('BLIP_MODIFIER_MP_COLOR_32'),
};

const Blips: Base.BlipData[] = [
  /**
   * Valentine
   */
  {
    name: 'Butcher',
    sprite: GetHashKey('blip_shop_butcher'),
    coords: { x: -338.99, y: 767.6321, z: 115.5632 },
  },
  {
    name: 'Train Station',
    sprite: 'blip_shop_train',
    coords: { x: -175.2594, y: 631.9643, z: 113.0896 },
  },
  {
    name: 'Post Office',
    sprite: 'blip_post_office',
    coords: { x: -178.005, y: 628.197, z: 114.089 },
  },
  {
    name: 'Bath',
    sprite: 'blip_bath_house',
    coords: { x: -317.424, y: 762.619, z: 117.436 },
  },
  {
    name: 'General Store',
    sprite: 'blip_shop_store',
    coords: { x: -324.0513, y: 803.7102, z: 116.8817 },
  },
  {
    name: 'Gunsmith',
    sprite: 'blip_shop_gunsmith',
    coords: { x: -281.0177, y: 778.9867, z: 118.504 },
  },
  {
    name: 'Saloon',
    sprite: 'blip_saloon',
    color: BlipColors.TAN,
    coords: { x: -309.6799, y: 805.6077, z: 118.9795 },
  },
  {
    name: 'Saloon',
    sprite: 'blip_saloon',
    color: BlipColors.TAN,
    coords: { x: -242.4913, y: 769.6014, z: 118.085 },
  },
  {
    name: 'Barber',
    sprite: 'blip_shop_barber',
    color: BlipColors.OFF_WHITE,
    coords: { x: -306.615, y: 813.569, z: 119.0 },
  },
  {
    name: 'Tailor',
    sprite: 'blip_shop_tailor',
    color: BlipColors.OFF_WHITE,
    coords: { x: -325.9, y: 806.1, z: 117.9 },
  },
  {
    name: 'Bank',
    sprite: 'blip_proc_bank',
    color: BlipColors.GREEN,
    coords: { x: -307.679, y: 778.314, z: 118.7042 },
  },
  {
    name: 'Stables',
    sprite: 'blip_stable',
    coords: { x: -368.7, y: 786.9, z: 116.2 },
  },
  {
    name: 'Doctor',
    sprite: 'blip_shop_doctor',
    color: BlipColors.TEAL,
    coords: { x: -287.209, y: 806.736, z: 119.385 },
  },

  // -=================
  {
    name: 'Butcher',
    sprite: GetHashKey('blip_shop_butcher'),
    coords: { x: 2540.75, y: 802.25, z: 76.37 },
  },
  {
    name: 'Butcher',
    sprite: 'blip_shop_butcher',
    coords: { x: -1752.9288, y: -392.7518, z: 155.2471 },
  },
  {
    name: 'Butcher',
    sprite: 'blip_shop_butcher',
    coords: { x: -753.337, y: -1284.7538, z: 42.5011 },
  },
  {
    name: 'Bank',
    sprite: 'blip_proc_bank',
    color: BlipColors.GREEN,
    coords: { x: -811.9281, y: -1278.3322, z: 43.6377 },
  },
  {
    name: 'Butcher',
    sprite: 'blip_shop_butcher',
    coords: { x: -5510.3481, y: -2946.9421, z: -2.8951 },
  },
  {
    name: 'Butcher',
    sprite: 'blip_shop_butcher',
    coords: { x: 2819.4917, y: -1331.3773, z: 45.5076 },
  },
  {
    name: 'Bank',
    sprite: 'blip_proc_bank',
    color: BlipColors.GREEN,
    coords: { x: 2645.4055, y: -1295.6056, z: 52.2461 },
  },
  {
    name: 'Gunsmith',
    sprite: 'blip_shop_gunsmith',
    coords: { x: 2946.45, y: 1319.47, z: 44.82 },
  },
  {
    name: 'Train Station',
    sprite: 'blip_shop_train',
    coords: { x: -732.5, y: -1226.7, z: 44.8 },
  },
  {
    name: 'Train Station',
    sprite: 'blip_shop_train',
    coords: { x: 1230.3, y: -1298.7, z: 76.0 },
  },
  {
    name: 'Train Station',
    sprite: 'blip_shop_train',
    coords: { x: -3729.1, y: -2601.4, z: -13.9 },
  },
  {
    // Annesburg
    name: 'Train Station',
    sprite: 'blip_shop_train',
    coords: { x: 2933.088, y: 1282.3311, z: 44.652 },
  },
  {
    // Annesburg
    name: 'Post Office',
    sprite: 'blip_post_office',
    coords: { x: 2938.942, y: 1287.05, z: 44.652 },
  },
  {
    // Annesburg
    name: 'Bath',
    sprite: 'blip_bath_house',
    coords: { x: 2951.886, y: 1335.001, z: 44.452 },
  },
  {
    // Rhodes
    name: 'Bath',
    sprite: 'blip_bath_house',
    coords: { x: 1336.573, y: -1378.813, z: 84.291 },
  },
  {
    // St.Denis
    name: 'Bath',
    sprite: 'blip_bath_house',
    coords: { x: 2630.503, y: -1223.306, z: 59.587 },
  },
  {
    name: 'Bank',
    sprite: 'blip_proc_bank',
    color: BlipColors.GREEN,
    coords: { x: 1294.1935, y: -1300.2317, z: 77.0401 },
  },
  {
    name: 'Bank',
    sprite: 'blip_proc_bank',
    color: BlipColors.GREEN,
    coords: { x: -3665.6079, y: -2623.0203, z: -13.5551 },
  },
  {
    name: 'Saloon',
    sprite: 'blip_saloon',
    color: BlipColors.TAN,
    coords: { x: 1340.2, y: -1374.7, z: 80.5 },
  },
  {
    name: 'Saloon',
    sprite: 'blip_saloon',
    color: BlipColors.TAN,
    coords: { x: 2632.9, y: -1224.4, z: 53.4 },
  },
  {
    name: 'Saloon',
    sprite: 'blip_saloon',
    color: BlipColors.TAN,
    coords: { x: 2794.4, y: -1170.4, z: 48.0 },
  },
  {
    name: 'Saloon',
    sprite: 'blip_saloon',
    color: BlipColors.TAN,
    coords: { x: 1448.9, y: 371.8, z: 89.9 },
  },
  {
    name: 'Saloon',
    sprite: 'blip_saloon',
    color: BlipColors.TAN,
    coords: { x: 2947.8, y: 523.6, z: 45.4 },
  },
  {
    name: 'Saloon',
    sprite: 'blip_saloon',
    color: BlipColors.TAN,
    coords: { x: -815.1, y: -1319.3, z: 43.7 },
  },
  {
    name: 'Saloon',
    sprite: 'blip_saloon',
    color: BlipColors.TAN,
    coords: { x: -3705.3, y: -2597.9, z: -13.3 },
  },
  {
    name: 'Saloon',
    sprite: 'blip_saloon',
    color: BlipColors.TAN,
    coords: { x: -5513.9, y: -2913.8, z: -1.7 },
  },
  {
    name: 'Stables',
    sprite: 'blip_stable',
    coords: { x: -866.5, y: -1366.9, z: 43.5 },
  },
  {
    name: 'Stables',
    sprite: 'blip_stable',
    coords: { x: -1819.4, y: -561.9, z: 156.1 },
  },
  {
    name: 'Stables',
    sprite: 'blip_stable',
    coords: { x: 1209.2, y: -192.9, z: 101.4 },
  },
  {
    name: 'Stables',
    sprite: 'blip_stable',
    coords: { x: 2503.2, y: -1451.8, z: 46.3 },
  },
  {
    name: 'Stables',
    sprite: 'blip_stable',
    coords: { x: 2968.7, y: 796.4, z: 51.4 },
  },
  {
    name: 'Stables',
    sprite: 'blip_stable',
    coords: { x: -5520.9, y: -3044.5, z: -2.4 },
  },
  {
    name: 'Stables',
    sprite: 'blip_stable',
    coords: { x: 1434.199, y: -1294.95, z: 77.823 },
  },
  {
    name: 'Stables',
    sprite: 'blip_stable',
    coords: { x: -1338.55, y: 2399.3, z: 306.985 },
  },
  {
    name: 'Stables',
    sprite: 'blip_stable',
    coords: { x: -2217.875, y: 733.65, z: 123.08 },
  },
  {
    name: 'Stables',
    sprite: 'blip_stable',
    coords: { x: -2407.496, y: -2376.35, z: 61.176 },
  },
  {
    name: 'Stables',
    sprite: 'blip_stable',
    coords: { x: -1415.363, y: -2197.88, z: 43.395 },
  },
  {
    name: 'Stables',
    sprite: 'blip_stable',
    coords: { x: -629.495, y: -64.463, z: 82.933 },
  },
  {
    name: 'Stables',
    sprite: 'blip_stable',
    coords: { x: -861.817, y: 336.34, z: 96.424 },
  },
  {
    name: 'Stables',
    sprite: 'blip_stable',
    coords: { x: -3709.043, y: -2553.437, z: -14.64 },
  },
  {
    name: 'Barber',
    sprite: 'blip_shop_barber',
    color: BlipColors.OFF_WHITE,
    coords: { x: -815.35, y: -1367.875, z: 43.8 },
  },
  {
    name: 'Tailor',
    sprite: 'blip_shop_tailor',
    color: BlipColors.OFF_WHITE,
    coords: { x: -766.3, y: -1293.2, z: 43.9 },
  },
  {
    name: 'Barber',
    sprite: 'blip_shop_barber',
    color: BlipColors.OFF_WHITE,
    coords: { x: 2655.375, y: -1181.1, z: 53.3 },
  },
  {
    name: 'Tailor',
    sprite: 'blip_shop_tailor',
    color: BlipColors.OFF_WHITE,
    coords: { x: 2552.6, y: -1168.5, z: 53.7 },
  },
  {
    name: 'Tailor',
    sprite: 'blip_shop_tailor',
    color: BlipColors.OFF_WHITE,
    coords: { x: -1792.2, y: -391.8, z: 160.3 },
  },
  {
    name: 'Tailor',
    sprite: 'blip_shop_tailor',
    color: BlipColors.OFF_WHITE,
    coords: { x: 1323.5, y: -1292.0, z: 77.1 },
  },
  {
    name: 'Tailor',
    sprite: 'blip_shop_tailor',
    color: BlipColors.OFF_WHITE,
    coords: { x: -5481.3, y: -2935.0, z: -0.3 },
  },
  {
    name: 'Tailor',
    sprite: 'blip_shop_tailor',
    color: BlipColors.OFF_WHITE,
    coords: { x: -1298.5, y: 396.8, z: 95.5 },
  },
  {
    name: 'Sheriff',
    sprite: 'blip_ambient_sheriff',
    coords: { x: 2907.331, y: 1311.787, z: 44.938 },
  },
  {
    name: 'Poker',
    sprite: 'blip_mg_poker',
    coords: { x: 2718.1831, y: -1288.4312, z: 60.36 },
  },
];

export default Blips;
