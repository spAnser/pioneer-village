// Teller model names — period-appropriate townsfolk used as placeholders.
// Replace with confirmed bank clerk models once found in-game.
const TELLER_MODEL_MALE   = 's_m_m_bankclerk_01';

const BankData: Bank.Data[] = [
  {
    identifier: 'valentine',
    name: 'Valentine Bank',
    type: 'VALENTINE',
    zones: {
      interior: [
        { x: -302.9530334472656, y: 780.9509887695312 },
        { x: -312.9951477050781, y: 778.946044921875 },
        { x: -309.84332275390625, y: 761.6168212890625 },
        { x: -299.9834899902344, y: 763.2606811523438 },
      ],
    },
    tellerPosition:  { x: -308.131103515625, y: 774.0001220703125, z: 117.70309448242188, w: 6.133 },
    tellerModel: TELLER_MODEL_MALE,
    vaultPosition: { x: -307.33880615234375, y: 767.1898803710938, z: 117.7029037475586, w: 190.05 },
  },
  {
    identifier: 'rhodes',
    name: 'Rhodes Bank',
    type: 'RHODES',
    zones: {
      interior: [
        { x: 1300.46826171875, y: -1302.2900390625 },
        { x: 1290.4044189453125, y: -1293.9554443359375 },
        { x: 1277.666259765625, y: -1309.9339599609375 },
        { x: 1287.185546875, y: -1317.947021484375 },
      ],
    },
    tellerPosition:  { x: 1291.263427734375, y: -1303.233642578125, z: 76.04118347167969, w: 322.02911376953125 },
    tellerModel: TELLER_MODEL_MALE,
    vaultPosition: { x: 1282.31396484375, y: -1308.405029296875, z: 76.03968811035156, w: 230.05653381347656 },
  },
  {
    identifier: 'blackwater',
    name: 'Blackwater Bank',
    type: 'BLACKWATER',
    zones: {
      interior: [
        { x: -822.69287109375, y: -1280.6141357421875 },
        { x: -808.739990234375, y: -1280.3028564453125 },
        { x: -808.385498046875, y: -1271.868408203125 },
        { x: -822.8059692382812, y: -1271.5072021484375 },
      ],
    },
    tellerPosition:  { x: -813.2230834960938, y: -1275.484619140625, z: 42.63771438598633, w: 179.35914611816406 },
    tellerModel: TELLER_MODEL_MALE,
    vaultPosition: { x: -817.0316772460938, y: -1273.8338623046875, z: 42.64748001098633, w: 90.05548095703125 },
  },
  {
    identifier: 'saint-denis',
    name: 'Saint Denis Bank',
    type: 'SAINT_DENIS',
    zones: {
      interior: [
        { x: 2634.10595703125, y: -1289.0498046875 },
        { x: 2648.34033203125, y: -1283.1739501953125 },
        { x: 2656.92431640625, y: -1301.4881591796875 },
        { x: 2643.05224609375, y: -1307.9317626953125 },
      ],
    },
    tellerPosition:  { x: 2644.806640625, y: -1293.972900390625, z: 51.24766159057617, w: 22.97601318359375 },
    tellerModel: TELLER_MODEL_MALE,
    vaultPosition: { x: 2643.875, y: -1300.0091552734375, z: 51.24612045288086, w: 170.52244567871094 },
  },
  {
    identifier: 'annesburg',
    name: 'Annesburg Bank',
    type: 'ANNESBURG',
    zones: {
      interior: [
        { x: 2942.298828125, y: 1291.4483642578125 },
        { x: 2933.29736328125, y: 1294.716552734375 },
        { x: 2924.407470703125, y: 1270.341064453125 },
        { x: 2933.279052734375, y: 1266.9754638671875 },
      ],
    },
    tellerPosition:  { x: 2938.801513671875, y: 1287.0623779296875, z: 43.652854919433594, w: 338.81280517578125 },
    tellerModel: TELLER_MODEL_MALE,
    vaultPosition: { x: 2934.58544921875, y: 1284.16650390625, z: 43.652854919433594, w: 338.5799560546875 },
  },
  {
    identifier: 'armidillo',
    name: 'Armidillo Bank',
    type: 'ARMIDILLO',
    zones: {
      interior: [
        { x: -3669.995361328125, y: -2620.980224609375 },
        { x: -3669.619384765625, y: -2638.93115234375 },
        { x: -3660.799072265625, y: -2639.072998046875 },
        { x: -3660.879638671875, y: -2621.12744140625 },
      ],
    },
    tellerPosition:  { x: -3666.257568359375, y: -2628.696533203125, z: -14.588133811950684, w: 354.2425537109375 },
    tellerModel: TELLER_MODEL_MALE,
    // no vault in Armidillo, but we'll use the teller position as a placeholder for now
    vaultPosition: { x: -3666.257568359375, y: -2628.696533203125, z: -14.588133811950684, w: 354.2425537109375 },
  },

  // Note: Strawberry and Tumbleweed don't have dedicated bank interiors, so these are placeholders until we find better locations/models.
  // {
  //   identifier: 'strawberry',
  //   name: 'Strawberry Bank',
  //   type: 'STRAWBERRY',
  //   zones: {
  //     interior: [],
  //   },
  //   tellerPosition:  { },
  //   tellerModel: TELLER_MODEL_MALE,
  //   vaultPosition: { },
  // },
  // {
  //   identifier: 'tumbleweed',
  //   name: 'Tumbleweed Bank',
  //   type: 'TUMBLEWEED',
  //   zones: {
  //     interior: [],
  //   },
  //   tellerPosition:  { },
  //   tellerModel: TELLER_MODEL_MALE,
  //   vaultPosition: { },
  // },
];

export default BankData;
