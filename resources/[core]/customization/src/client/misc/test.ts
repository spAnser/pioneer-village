const componentCategories = new Map();

componentCategories.set(822561179, 'CHAPS');
componentCategories.set(-529714994, 'COAT');
componentCategories.set(107129908, 'CLOSECOAT');
componentCategories.set(-356646862, 'GLOVES');
componentCategories.set(1214179380, 'VEST');
componentCategories.set(2004797167, 'BOOTS');
componentCategories.set(1606587013, 'NECKERCHIEF');
componentCategories.set(539411565, 'SHIRT');
componentCategories.set(491541130, 'PANTS');
componentCategories.set(-1725579161, 'HAT');
componentCategories.set(-2041904210, 'HAIR');
componentCategories.set(-366693282, 'EYES');
componentCategories.set(931844364, 'HEAD');
componentCategories.set(188311241, 'TORSO');
componentCategories.set(-2110355467, 'LEGS');
componentCategories.set(1963323202, 'MASK');
componentCategories.set(-1595692161, 'SKIRT');
componentCategories.set(2056714954, 'NECKTIE');
componentCategories.set(2272931063, 'SUSPENDERS');
componentCategories.set(-1357631221, 'PONCHO');
componentCategories.set(1008366797, 'CLOAK');
componentCategories.set(-244703965, 'RINGS_LEFT');
componentCategories.set(2053881099, 'RINGS_RIGHT');
componentCategories.set(2076247897, 'BRACELET');
componentCategories.set(1363860714, 'SPATS');
componentCategories.set(-1496238906, 'BELT');
// componentCategories.set(1000000000, 'CATEGORY_NAME')
// componentCategories.set(1000000000, 'CATEGORY_NAME')

const itemProperties = new Map();
const props = [
  'CLOTHING',
  'CI_CATEGORY_WARDROBE_ACCESSORIES',
  'CI_CATEGORY_WARDROBE_ACCESSORY',
  'CI_CATEGORY_WARDROBE_AGEING',
  'CI_CATEGORY_WARDROBE_APRONS',
  'CI_CATEGORY_WARDROBE_BADGE',
  'CI_CATEGORY_WARDROBE_BAG',
  'CI_CATEGORY_WARDROBE_BANDANA',
  'CI_CATEGORY_WARDROBE_BEARD',
  'CI_CATEGORY_WARDROBE_BELTS',
  'CI_CATEGORY_WARDROBE_BIG_MASK',
  'CI_CATEGORY_WARDROBE_BLOUSES',
  'CI_CATEGORY_WARDROBE_BLUSH',
  'CI_CATEGORY_WARDROBE_BODICE',
  'CI_CATEGORY_WARDROBE_BODY',
  'CI_CATEGORY_WARDROBE_BOOTS',
  'CI_CATEGORY_WARDROBE_BRACELET',
  'CI_CATEGORY_WARDROBE_BUCKLE',
  'CI_CATEGORY_WARDROBE_CHAPS',
  'CI_CATEGORY_WARDROBE_CLOAK',
  'CI_CATEGORY_WARDROBE_COATS',
  'CI_CATEGORY_WARDROBE_COMPLEXION',
  'CI_CATEGORY_WARDROBE_CORSETS',
  'CI_CATEGORY_WARDROBE_DRESSES',
  'CI_CATEGORY_WARDROBE_EYEBROWS',
  'CI_CATEGORY_WARDROBE_EYELINER',
  'CI_CATEGORY_WARDROBE_EYES',
  'CI_CATEGORY_WARDROBE_EYEWEAR',
  'CI_CATEGORY_WARDROBE_FOUNDATION',
  'CI_CATEGORY_WARDROBE_FRECKLES',
  'CI_CATEGORY_WARDROBE_GAUNTLETS',
  'CI_CATEGORY_WARDROBE_GENDER',
  'CI_CATEGORY_WARDROBE_GLASSES',
  'CI_CATEGORY_WARDROBE_GLOVES',
  'CI_CATEGORY_WARDROBE_GRIME',
  'CI_CATEGORY_WARDROBE_GUNBELT',
  'CI_CATEGORY_WARDROBE_HAIR',
  'CI_CATEGORY_WARDROBE_HAIR_ACCESSORY',
  'CI_CATEGORY_WARDROBE_HAT',
  'CI_CATEGORY_WARDROBE_HEAD',
  'CI_CATEGORY_WARDROBE_HEADBAND',
  'CI_CATEGORY_WARDROBE_LEFT_RINGS',
  'CI_CATEGORY_WARDROBE_LIPSTICK',
  'CI_CATEGORY_WARDROBE_MASK',
  'CI_CATEGORY_WARDROBE_MOLES',
  'CI_CATEGORY_WARDROBE_NECKWEAR',
  'CI_CATEGORY_WARDROBE_NIGHTGOWN',
  'CI_CATEGORY_WARDROBE_OUTFIT',
  'CI_CATEGORY_WARDROBE_OVERALLS',
  'CI_CATEGORY_WARDROBE_PANT',
  'CI_CATEGORY_WARDROBE_PONCHO',
  'CI_CATEGORY_WARDROBE_RIGHT_RINGS',
  'CI_CATEGORY_WARDROBE_RINGS',
  'CI_CATEGORY_WARDROBE_SATCHEL',
  'CI_CATEGORY_WARDROBE_SCAR',
  'CI_CATEGORY_WARDROBE_SCARVES',
  'CI_CATEGORY_WARDROBE_SHAWLS',
  'CI_CATEGORY_WARDROBE_SHIRT',
  'CI_CATEGORY_WARDROBE_SKIRTS',
  'CI_CATEGORY_WARDROBE_SPATS',
  'CI_CATEGORY_WARDROBE_SPOTS',
  'CI_CATEGORY_WARDROBE_STOCKINGS',
  'CI_CATEGORY_WARDROBE_SUSPENDERS',
  'CI_CATEGORY_WARDROBE_TEETH',
  'CI_CATEGORY_WARDROBE_TIES',
  'CI_CATEGORY_WARDROBE_UNDERGARMENT',
  'CI_CATEGORY_WARDROBE_UNIONSUIT',
  'CI_CATEGORY_WARDROBE_UNIONSUIT_LOWER',
  'CI_CATEGORY_WARDROBE_VEST',
];
for (const prop of props) {
  itemProperties.set(GetHashKey(prop), prop);
}

const itemTags = new Map();
const tags = [
  'CI_TAG_ITEM_ALCOHOL',
  'CI_TAG_ITEM_CLOTHING_NONE',
  'CI_TAG_ITEM_COLLECTIBLE_FAMILY_HEIRLOOMS',
  'CI_TAG_ITEM_CONFECTIONARY',
  'CI_TAG_ITEM_DISABLE_TAKE',
  'CI_TAG_ITEM_DOCUMENT_HIDE_READ_PROMPT',
  'CI_TAG_ITEM_ENGRAVING_INLAY_BASE',
  'CI_TAG_ITEM_HORSE_ITEM',
  'CI_TAG_ITEM_LETTER_INVITATION',
  'CI_TAG_ITEM_MEAT_ANIMAL',
  'CI_TAG_ITEM_NED_KELLY_ADVERSARY',
  'CI_TAG_ITEM_NED_KELLY_COOP',
  'CI_TAG_ITEM_NED_KELLY_GOLDEN',
  'CI_TAG_ITEM_SAVED_OUTFIT',
  'CI_TAG_ITEM_TREASURE_HUNTER_MAP',
  'CI_TAG_ITEM_SLIGHTLY_WARM_CLOTHING',
  'CI_TAG_ITEM_REASONABLY_WARM_CLOTHING',
  'CI_TAG_ITEM_WARM_CLOTHING',
  'CI_TAG_ITEM_VERY_WARM_CLOTHING',
  'CI_TAG_ITEM_MASK',
  'CI_TAG_ITEM_BANDANA',
];
for (const tag of tags) {
  itemTags.set(GetHashKey(tag), tag);
}
const TagTypes = {
  ITEM_HAS_FOLDER_TAG: 1224357681,
  ITEM_HAS_PROPERTY_TAG: 1120943070,
  ITEM_HAS_INTERACTION_TAG: -949239683,
  ITEM_HAS_MATERIAL_TAG: 2129182224,
};

const buf2hex = (buffer: ArrayBuffer): string => {
  // buffer is an ArrayBuffer
  return Array.prototype.map.call(new Uint8Array(buffer), (x) => ('00' + x.toString(16)).slice(-2)).join('');
};

RegisterCommand(
  'listComponents',
  (source, args) => {
    const entity = Number(args[0]) || PlayerPedId();
    // _GET_METAPED_TYPE
    const metaPedType = Citizen.invokeNative('0xEC9A1261BF0CE510', entity) as number;
    // _GET_NUM_COMPONENTS_IN_PED
    const componentCount = Citizen.invokeNative('0x90403E8107B60E81', entity) as number;

    const components = [];
    for (let i = componentCount; i--; ) {
      const struct1 = new DataView(new ArrayBuffer(4));
      const struct2 = new DataView(new ArrayBuffer(4));
      // _GET_PED_COMPONENT_AT_INDEX
      const component = Citizen.invokeNative('0x77ba37622e22023b', entity, i, true, struct1, struct2) as number;
      console.log('struct1', struct1.getInt32(0, true));
      console.log('struct2', struct2.getInt32(0, true));
      // _GET_PED_COMPONENT_CATEGORY
      const componentCategory = Citizen.invokeNative('0x5FF9A878C3D115B8', component, metaPedType, true) as number;
      // if (componentCategory !== 1606587013) {
      //   continue
      // }
      components.push(component);
      if (componentCategories.has(componentCategory)) {
        console.log(i, component, componentCategories.get(componentCategory));
      } else {
        console.log(i, component, componentCategory, '=================');
      }
      const struct3 = new DataView(new ArrayBuffer(512));
      Citizen.invokeNative('0xFE90ABBCBFDC13B2', component, struct3); // _ITEM_DATABASE_FILLOUT_ITEM_INFO
      // Citizen.invokeNative('0xB86F7CC2DC67AC60', component, struct3) // _ITEM_DATABASE_FILLOUT_UI_DATA
      console.log(
        'isBandana',
        Citizen.invokeNative('0xff5fb5605ad56856', component, GetHashKey('CI_TAG_ITEM_BANDANA'), 1120943070), // 160827531
        Citizen.invokeNative('0xff5fb5605ad56856', component, GetHashKey('CI_TAG_ITEM_MASK'), 1120943070), // -1303648999
      ); // _ITEMDATABASE_DOES_ITEM_HAVE_TAG
      const ints = [];
      for (let n = 0; n < 512; n += 8) {
        const int = struct3.getInt32(n, true);
        const int2 = struct3.getInt32(n + 4, true);
        if (int) {
          let intStr = `${n / 8} | ${int} : ${(int >>> 0).toString(16)} | ${int2} : ${(int2 >>> 0).toString(16)}`;
          if (itemProperties.get(int)) {
            intStr += ` | ${itemProperties.get(int)}`;
          }
          ints.push(intStr);
        }
      }
      console.log(ints);
      // const struct4 = new DataView(new ArrayBuffer(8))
      // Citizen.invokeNative('0x5A11D6EEA17165B0', component, struct3, struct4, 20) // _ITEM_DATABASE_FILLOUT_TAG_DATA
      // const tagCount = struct4.getInt32(0, true)
      // if (Citizen.invokeNative('0x6D5D51B188333FD1', component, 0) as boolean) {
      //   // _ITEM_DATABASE_IS_KEY_VALID
      //   const var0 = new DataView(new ArrayBuffer(4 * 256))
      //   const var1 = new DataView(new ArrayBuffer(4))
      //   const ret = Citizen.invokeNative('0x5A11D6EEA17165B0', component, var0, var1, 20) as boolean
      //   if (ret) {
      //     const tagCount = var1.getUint32(0, true)
      //     console.log(tagCount, buf2hex(var0.buffer))
      //     let offset = 8
      //     for (let t = tagCount * 2; t--; ) {
      //       console.log(
      //         `Tag${tagCount * 2 - t}:`,
      //         var0.getInt32(offset, true),
      //       )
      //       offset += 8
      //     }
      //   }
      // }
    }
  },
  false,
);
