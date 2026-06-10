// Teller model names — period-appropriate townsfolk used as placeholders.
// Replace with confirmed bank clerk models once found in-game.
const TELLER_MODEL_MALE   = 's_m_m_bankclerk_01';
const TELLER_MODEL_FORMAL = 'a_m_m_townspeople_03';

const BankData: Bank.Data[] = [
  {
    identifier: 'valentine',
    name: 'Valentine Bank',
    type: 'VALENTINE',
    zones: {
      interior: [
        { x: -278.5, y: 792.8 },
        { x: -291.2, y: 792.8 },
        { x: -291.2, y: 806.0 },
        { x: -278.5, y: 806.0 },
      ],
    },
    counterPosition: { x: -308.54046630859375, y: 775.9349365234375, z: 117.70172119140625, w: 193.50 },
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
        { x: 1257.5, y: -1298.0 },
        { x: 1271.0, y: -1298.0 },
        { x: 1271.0, y: -1285.0 },
        { x: 1257.5, y: -1285.0 },
      ],
    },
    counterPosition: { x: 1261.3, y: -1292.5, z: 77.0, w: 90.0 },
    tellerPosition:  { x: 1262.3, y: -1292.5, z: 77.0, w: 270.0 },
    tellerModel: TELLER_MODEL_FORMAL,
    vaultPosition: { x: 1267.8, y: -1286.5, z: 77.0, w: 180.0 },
  },
  {
    identifier: 'blackwater',
    name: 'Blackwater Bank',
    type: 'BLACKWATER',
    zones: {
      interior: [
        { x: -819.5, y: -1280.5 },
        { x: -806.0, y: -1280.5 },
        { x: -806.0, y: -1267.0 },
        { x: -819.5, y: -1267.0 },
      ],
    },
    counterPosition: { x: -815.0, y: -1275.0, z: 43.2, w: 0.0 },
    tellerPosition:  { x: -815.0, y: -1274.0, z: 43.2, w: 180.0 },
    tellerModel: TELLER_MODEL_FORMAL,
    vaultPosition: { x: -808.5, y: -1269.5, z: 43.2, w: 270.0 },
  },
  {
    identifier: 'saint-denis',
    name: 'Saint Denis Bank',
    type: 'SAINT_DENIS',
    zones: {
      interior: [
        { x: 2533.0, y: -1291.0 },
        { x: 2552.0, y: -1291.0 },
        { x: 2552.0, y: -1274.0 },
        { x: 2533.0, y: -1274.0 },
      ],
    },
    counterPosition: { x: 2538.5, y: -1284.0, z: 46.5, w: 90.0 },
    tellerPosition:  { x: 2539.5, y: -1284.0, z: 46.5, w: 270.0 },
    tellerModel: TELLER_MODEL_FORMAL,
    vaultPosition: { x: 2548.5, y: -1278.0, z: 46.5, w: 180.0 },
  },
  {
    identifier: 'annesburg',
    name: 'Annesburg Bank',
    type: 'ANNESBURG',
    zones: {
      interior: [
        { x: 2891.5, y: 1270.0 },
        { x: 2904.0, y: 1270.0 },
        { x: 2904.0, y: 1282.0 },
        { x: 2891.5, y: 1282.0 },
      ],
    },
    counterPosition: { x: 2895.5, y: 1274.5, z: 51.7, w: 270.0 },
    tellerPosition:  { x: 2895.5, y: 1275.5, z: 51.7, w: 90.0 },
    tellerModel: TELLER_MODEL_MALE,
    vaultPosition: { x: 2901.5, y: 1279.5, z: 51.7, w: 90.0 },
  },
  {
    identifier: 'strawberry',
    name: 'Strawberry Bank',
    type: 'STRAWBERRY',
    zones: {
      interior: [
        { x: -1845.5, y: -537.0 },
        { x: -1833.5, y: -537.0 },
        { x: -1833.5, y: -525.5 },
        { x: -1845.5, y: -525.5 },
      ],
    },
    counterPosition: { x: -1841.5, y: -532.5, z: 160.5, w: 90.0 },
    tellerPosition:  { x: -1840.5, y: -532.5, z: 160.5, w: 270.0 },
    tellerModel: TELLER_MODEL_MALE,
    vaultPosition: { x: -1836.5, y: -527.5, z: 160.5, w: 270.0 },
  },
  {
    identifier: 'tumbleweed',
    name: 'Tumbleweed Bank',
    type: 'TUMBLEWEED',
    zones: {
      interior: [
        { x: -5448.0, y: -2901.5 },
        { x: -5436.0, y: -2901.5 },
        { x: -5436.0, y: -2890.0 },
        { x: -5448.0, y: -2890.0 },
      ],
    },
    counterPosition: { x: -5444.0, y: -2897.0, z: 345.2, w: 90.0 },
    tellerPosition:  { x: -5443.0, y: -2897.0, z: 345.2, w: 270.0 },
    tellerModel: TELLER_MODEL_MALE,
    vaultPosition: { x: -5439.0, y: -2892.5, z: 345.2, w: 270.0 },
  },
];

export default BankData;
