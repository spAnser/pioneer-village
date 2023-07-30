import componentCategories from '../data/component-categories';
import itemCategories from '../data/ci-categories';
import itemTags from '../data/ci-tags';
import horseDrawables from '../data/horse-drawables';
import { PVBase, PVGame } from '@lib/client';
import { Vector3 } from '@lib/math';
import { Delay } from '@lib/functions';

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
      if (horseDrawables[drawable]) {
        console.log(`guids[${i}]`, horseDrawables[drawable], drawable, albedo, normal, material);
      } else {
        console.log(`guids[${i}]`, drawable, albedo, normal, material);
      }
    }
  },
  false,
);

// const horseModels = [
//   'A_C_HORSEMULEPAINTED_01',
//   'A_C_HORSEMULE_01',
//   'A_C_HORSE_AMERICANPAINT_GREYOVERO',
//   'A_C_HORSE_AMERICANPAINT_OVERO',
//   'A_C_HORSE_AMERICANPAINT_SPLASHEDWHITE',
//   'A_C_HORSE_AMERICANPAINT_TOBIANO',
//   'A_C_HORSE_AMERICANSTANDARDBRED_BLACK',
//   'A_C_HORSE_AMERICANSTANDARDBRED_BUCKSKIN',
//   'A_C_HORSE_AMERICANSTANDARDBRED_LIGHTBUCKSKIN',
//   'A_C_HORSE_AMERICANSTANDARDBRED_PALOMINODAPPLE',
//   'A_C_HORSE_AMERICANSTANDARDBRED_SILVERTAILBUCKSKIN',
//   'A_C_HORSE_ANDALUSIAN_DARKBAY',
//   'A_C_HORSE_ANDALUSIAN_PERLINO',
//   'A_C_HORSE_ANDALUSIAN_ROSEGRAY',
//   'A_C_HORSE_APPALOOSA_BLACKSNOWFLAKE',
//   'A_C_HORSE_APPALOOSA_BLANKET',
//   'A_C_HORSE_APPALOOSA_BROWNLEOPARD',
//   'A_C_HORSE_APPALOOSA_FEWSPOTTED_PC',
//   'A_C_HORSE_APPALOOSA_LEOPARD',
//   'A_C_HORSE_APPALOOSA_LEOPARDBLANKET',
//   'A_C_HORSE_ARABIAN_BLACK',
//   'A_C_HORSE_ARABIAN_GREY',
//   'A_C_HORSE_ARABIAN_REDCHESTNUT',
//   'A_C_HORSE_ARABIAN_REDCHESTNUT_PC',
//   'A_C_HORSE_ARABIAN_ROSEGREYBAY',
//   'A_C_HORSE_ARABIAN_WARPEDBRINDLE_PC',
//   'A_C_HORSE_ARABIAN_WHITE',
//   'A_C_HORSE_ARDENNES_BAYROAN',
//   'A_C_HORSE_ARDENNES_IRONGREYROAN',
//   'A_C_HORSE_ARDENNES_STRAWBERRYROAN',
//   'A_C_HORSE_BELGIAN_BLONDCHESTNUT',
//   'A_C_HORSE_BELGIAN_MEALYCHESTNUT',
//   'A_C_HORSE_BRETON_GRULLODUN',
//   'A_C_HORSE_BRETON_MEALYDAPPLEBAY',
//   'A_C_HORSE_BRETON_REDROAN',
//   'A_C_HORSE_BRETON_SEALBROWN',
//   'A_C_HORSE_BRETON_SORREL',
//   'A_C_HORSE_BRETON_STEELGREY',
//   'A_C_HORSE_BUELL_WARVETS',
//   'A_C_HORSE_CRIOLLO_BAYBRINDLE',
//   'A_C_HORSE_CRIOLLO_BAYFRAMEOVERO',
//   'A_C_HORSE_CRIOLLO_BLUEROANOVERO',
//   'A_C_HORSE_CRIOLLO_DUN',
//   'A_C_HORSE_CRIOLLO_MARBLESABINO',
//   'A_C_HORSE_CRIOLLO_SORRELOVERO',
//   'A_C_HORSE_DUTCHWARMBLOOD_CHOCOLATEROAN',
//   'A_C_HORSE_DUTCHWARMBLOOD_SEALBROWN',
//   'A_C_HORSE_DUTCHWARMBLOOD_SOOTYBUCKSKIN',
//   'A_C_HORSE_EAGLEFLIES',
//   'A_C_HORSE_GANG_BILL',
//   'A_C_HORSE_GANG_CHARLES',
//   'A_C_HORSE_GANG_CHARLES_ENDLESSSUMMER',
//   'A_C_HORSE_GANG_DUTCH',
//   'A_C_HORSE_GANG_HOSEA',
//   'A_C_HORSE_GANG_JAVIER',
//   'A_C_HORSE_GANG_JOHN',
//   'A_C_HORSE_GANG_KAREN',
//   'A_C_HORSE_GANG_KIERAN',
//   'A_C_HORSE_GANG_LENNY',
//   'A_C_HORSE_GANG_MICAH',
//   'A_C_HORSE_GANG_SADIE',
//   'A_C_HORSE_GANG_SADIE_ENDLESSSUMMER',
//   'A_C_HORSE_GANG_SEAN',
//   'A_C_HORSE_GANG_TRELAWNEY',
//   'A_C_HORSE_GANG_UNCLE',
//   'A_C_HORSE_GANG_UNCLE_ENDLESSSUMMER',
//   'A_C_HORSE_GYPSYCOB_PALOMINOBLAGDON',
//   'A_C_HORSE_GYPSYCOB_PIEBALD',
//   'A_C_HORSE_GYPSYCOB_SKEWBALD',
//   'A_C_HORSE_GYPSYCOB_SPLASHEDBAY',
//   'A_C_HORSE_GYPSYCOB_SPLASHEDPIEBALD',
//   'A_C_HORSE_GYPSYCOB_WHITEBLAGDON',
//   'A_C_HORSE_HUNGARIANHALFBRED_DARKDAPPLEGREY',
//   'A_C_HORSE_HUNGARIANHALFBRED_FLAXENCHESTNUT',
//   'A_C_HORSE_HUNGARIANHALFBRED_LIVERCHESTNUT',
//   'A_C_HORSE_HUNGARIANHALFBRED_PIEBALDTOBIANO',
//   'A_C_HORSE_JOHN_ENDLESSSUMMER',
//   'A_C_HORSE_KENTUCKYSADDLE_BLACK',
//   'A_C_HORSE_KENTUCKYSADDLE_BUTTERMILKBUCKSKIN_PC',
//   'A_C_HORSE_KENTUCKYSADDLE_CHESTNUTPINTO',
//   'A_C_HORSE_KENTUCKYSADDLE_GREY',
//   'A_C_HORSE_KENTUCKYSADDLE_SILVERBAY',
//   'A_C_HORSE_KLADRUBER_BLACK',
//   'A_C_HORSE_KLADRUBER_CREMELLO',
//   'A_C_HORSE_KLADRUBER_DAPPLEROSEGREY',
//   'A_C_HORSE_KLADRUBER_GREY',
//   'A_C_HORSE_KLADRUBER_SILVER',
//   'A_C_HORSE_KLADRUBER_WHITE',
//   'A_C_HORSE_MISSOURIFOXTROTTER_AMBERCHAMPAGNE',
//   'A_C_HORSE_MISSOURIFOXTROTTER_BLACKTOVERO',
//   'A_C_HORSE_MISSOURIFOXTROTTER_BLUEROAN',
//   'A_C_HORSE_MISSOURIFOXTROTTER_BUCKSKINBRINDLE',
//   'A_C_HORSE_MISSOURIFOXTROTTER_DAPPLEGREY',
//   'A_C_HORSE_MISSOURIFOXTROTTER_SABLECHAMPAGNE',
//   'A_C_HORSE_MISSOURIFOXTROTTER_SILVERDAPPLEPINTO',
//   'A_C_HORSE_MORGAN_BAY',
//   'A_C_HORSE_MORGAN_BAYROAN',
//   'A_C_HORSE_MORGAN_FLAXENCHESTNUT',
//   'A_C_HORSE_MORGAN_LIVERCHESTNUT_PC',
//   'A_C_HORSE_MORGAN_PALOMINO',
//   'A_C_HORSE_MP_MANGY_BACKUP',
//   'A_C_HORSE_MURFREEBROOD_MANGE_01',
//   'A_C_HORSE_MURFREEBROOD_MANGE_02',
//   'A_C_HORSE_MURFREEBROOD_MANGE_03',
//   'A_C_HORSE_MUSTANG_BLACKOVERO',
//   'A_C_HORSE_MUSTANG_BUCKSKIN',
//   'A_C_HORSE_MUSTANG_CHESTNUTTOVERO',
//   'A_C_HORSE_MUSTANG_GOLDENDUN',
//   'A_C_HORSE_MUSTANG_GRULLODUN',
//   'A_C_HORSE_MUSTANG_REDDUNOVERO',
//   'A_C_HORSE_MUSTANG_TIGERSTRIPEDBAY',
//   'A_C_HORSE_MUSTANG_WILDBAY',
//   'A_C_HORSE_NOKOTA_BLUEROAN',
//   'A_C_HORSE_NOKOTA_REVERSEDAPPLEROAN',
//   'A_C_HORSE_NOKOTA_WHITEROAN',
//   'A_C_HORSE_NORFOLKROADSTER_BLACK',
//   'A_C_HORSE_NORFOLKROADSTER_DAPPLEDBUCKSKIN',
//   'A_C_HORSE_NORFOLKROADSTER_PIEBALDROAN',
//   'A_C_HORSE_NORFOLKROADSTER_ROSEGREY',
//   'A_C_HORSE_NORFOLKROADSTER_SPECKLEDGREY',
//   'A_C_HORSE_NORFOLKROADSTER_SPOTTEDTRICOLOR',
//   'A_C_HORSE_SHIRE_DARKBAY',
//   'A_C_HORSE_SHIRE_LIGHTGREY',
//   'A_C_HORSE_SHIRE_RAVENBLACK',
//   'A_C_HORSE_SUFFOLKPUNCH_REDCHESTNUT',
//   'A_C_HORSE_SUFFOLKPUNCH_SORREL',
//   'A_C_HORSE_TENNESSEEWALKER_BLACKRABICANO',
//   'A_C_HORSE_TENNESSEEWALKER_CHESTNUT',
//   'A_C_HORSE_TENNESSEEWALKER_DAPPLEBAY',
//   'A_C_HORSE_TENNESSEEWALKER_FLAXENROAN',
//   'A_C_HORSE_TENNESSEEWALKER_GOLDPALOMINO_PC',
//   'A_C_HORSE_TENNESSEEWALKER_MAHOGANYBAY',
//   'A_C_HORSE_TENNESSEEWALKER_REDROAN',
//   'A_C_HORSE_THOROUGHBRED_BLACKCHESTNUT',
//   'A_C_HORSE_THOROUGHBRED_BLOODBAY',
//   'A_C_HORSE_THOROUGHBRED_BRINDLE',
//   'A_C_HORSE_THOROUGHBRED_DAPPLEGREY',
//   'A_C_HORSE_THOROUGHBRED_REVERSEDAPPLEBLACK',
//   'A_C_HORSE_TURKOMAN_BLACK',
//   'A_C_HORSE_TURKOMAN_CHESTNUT',
//   'A_C_HORSE_TURKOMAN_DARKBAY',
//   'A_C_HORSE_TURKOMAN_GOLD',
//   'A_C_HORSE_TURKOMAN_GREY',
//   'A_C_HORSE_TURKOMAN_PERLINO',
//   'A_C_HORSE_TURKOMAN_SILVER',
//   'A_C_HORSE_WINTER02_01',
//   'P_C_HORSE_01',
// ];
//
// RegisterCommand(
//   'checkHorses',
//   async () => {
//     const coords = Vector3.fromArray(GetEntityCoords(PlayerPedId()));
//     const forward = Vector3.fromArray(GetEntityForwardVector(PlayerPedId()));
//     coords.add(forward.multiplyScalar(5));
//     for (const model of horseModels) {
//       console.log('model', model);
//       const horse = await PVGame.createPed(model, coords.x, coords.y, coords.z);
//       await Delay(500);
//
//       const componentCount = GetNumComponentsInPed(horse);
//
//       for (let i = componentCount; i--; ) {
//         const [drawable, albedo, normal, material] = GetMetaPedAssetGuids(horse, i);
//         if (horseDrawables[drawable]) {
//           // console.log(`guids[${i}]`, horseDrawables[drawable], drawable, albedo, normal, material);
//         } else if (drawable !== 505041967 && drawable !== 1410957448) {
//           console.log(`guids[${i}]`, drawable, albedo, normal, material);
//         }
//       }
//
//       await Delay(125);
//       PVBase.deleteEntity(horse);
//     }
//     console.log('! DONE !');
//   },
//   false,
// );
