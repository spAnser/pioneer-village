import componentCategories from '../data/component-categories';
import itemCategories from '../data/ci-categories';
import itemTags from '../data/ci-tags';

const TagTypes = {
  ITEM_HAS_FOLDER_TAG: 1224357681,
  ITEM_HAS_PROPERTY_TAG: 1120943070,
  ITEM_HAS_INTERACTION_TAG: -949239683,
  ITEM_HAS_MATERIAL_TAG: 2129182224,
  UNK1: -442898163,
};

RegisterCommand(
  'listComponents',
  (source: number, args: string[]) => {
    const entity = Number(args[0]) || PlayerPedId();
    const metaPedType = GetMetaPedType(entity);
    const componentCount = GetNumComponentsInPed(entity);

    const components = [];
    for (let i = componentCount; i--; ) {
      const struct1 = new DataView(new ArrayBuffer(4));
      const struct2 = new DataView(new ArrayBuffer(4));
      const component = GetShopItemComponentAtIndex(entity, i, true, struct1, struct2);
      console.log('struct1', struct1.getInt32(0, true));
      console.log('struct2', struct2.getInt32(0, true));
      const componentCategory = GetPedComponentCategory(component, metaPedType, true);
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
      ItemdatabaseFilloutItemInfo(component, struct3); // _ITEM_DATABASE_FILLOUT_ITEM_INFO

      // ItemdatabaseFilloutUiData(component, struct3);
      // for (const [tagHash, tagName] of itemTags.entries()) {
      //   if (ItemdatabaseDoesItemHaveTag(component, tagHash, TagTypes.ITEM_HAS_PROPERTY_TAG)) {
      //     console.log('itemTag', tagHash, tagName);
      //   }
      // }
      const ints = [];
      for (let n = 0; n < 512; n += 8) {
        const int = struct3.getInt32(n, true);
        const int2 = struct3.getInt32(n + 4, true);
        if (int) {
          let intStr = `${n / 8} | ${int} : ${(int >>> 0).toString(16)} | ${int2} : ${(int2 >>> 0).toString(16)}`;
          if (itemCategories.get(int)) {
            intStr += ` | ${itemCategories.get(int)}`;
          }
          ints.push(intStr);
        }
      }
      console.log(ints);
      const struct4 = new DataView(new ArrayBuffer(8));
      ItemdatabaseFilloutTagData(component, struct3, struct4, 20); // _ITEM_DATABASE_FILLOUT_TAG_DATA
      const tagCount = struct4.getInt32(0, true);
      if (ItemdatabaseIsKeyValid(component, 0)) {
        const var0 = new DataView(new ArrayBuffer(4 * 256));
        const var1 = new DataView(new ArrayBuffer(4));
        const ret = Citizen.invokeNative('0x5A11D6EEA17165B0', component, var0, var1, 20) as boolean;
        if (ret) {
          const tagCount = var1.getUint32(0, true);
          // console.log(tagCount, buf2hex(var0.buffer));
          let offset = 8;
          for (let t = tagCount; t--; ) {
            const tagHash = var0.getInt32(offset, true);
            offset += 8;
            const tagCategory = var0.getInt32(offset, true);
            offset += 8;
            console.log(`Tag${tagCount - t}:`, tagCategory, tagHash, itemTags.get(tagHash));
          }
        }
      }
    }
  },
  false,
);

RegisterCommand(
  'listComponentCategories',
  (source: number, args: string[]) => {
    const entity = Number(args[0]) || PlayerPedId();
    const componentCount = GetNumComponentsInPed(entity);

    const components = [];
    for (let i = componentCount; i--; ) {
      const componentCategory = GetCategoryOfComponentAtIndex(entity, i);
      if (componentCategories.has(componentCategory)) {
        console.log(i, componentCategories.get(componentCategory));
      } else {
        console.log(i, componentCategory);
      }
    }
  },
  false,
);

RegisterCommand(
  'listGuids',
  (source: number, args: string[]) => {
    const entity = Number(args[0]) || PlayerPedId();
    const componentCount = GetNumComponentsInPed(entity);

    for (let i = componentCount; i--; ) {
      const [drawable, albedo, normal, material] = GetMetaPedAssetGuids(entity, i);
      console.log(`guids[${i}]`, drawable, albedo, normal, material);
    }
  },
  false,
);
