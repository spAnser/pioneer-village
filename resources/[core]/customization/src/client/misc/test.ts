import componentCategories from '../data/component-categories';
import wearableStates from '../data/wearable-states';
import itemCategories from '../data/ci-categories';
import itemTags from '../data/ci-tags';
import horseDrawables from '../data/horse-drawables';
import { PVBase, PVGame } from '@lib/client';
import { Vector3 } from '@lib/math';
import { Delay } from '@lib/functions';
import { Log } from '@lib/client/comms/ui';
import { componentManager } from '../managers/component-manager';

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
      Log('struct1', struct1.getInt32(0, true));
      const wearableState = struct2.getInt32(0, true);
      if (wearableStates.has(wearableState)) {
        Log('wearableState', wearableStates.get(wearableState));
      } else {
        Log('wearableState', wearableState, `0x${(wearableState >>> 0).toString(16)}`);
      }
      const componentCategory = GetShopItemComponentCategory(component, metaPedType, true);
      // if (componentCategory !== 1606587013) {
      //   continue
      // }
      components.push(component);
      if (componentCategories.has(componentCategory)) {
        Log(i, component, componentCategories.get(componentCategory));
      } else {
        Log(i, component, componentCategory, '=================');
      }
      const struct3 = new DataView(new ArrayBuffer(512));
      ItemdatabaseFilloutItemInfo(component, struct3); // _ITEM_DATABASE_FILLOUT_ITEM_INFO

      // ItemdatabaseFilloutUiData(component, struct3);
      // for (const [tagHash, tagName] of itemTags.entries()) {
      //   if (ItemdatabaseDoesItemHaveTag(component, tagHash, TagTypes.ITEM_HAS_PROPERTY_TAG)) {
      //     Log('itemTag', tagHash, tagName);
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
      Log(ints);
      // const struct4 = new DataView(new ArrayBuffer(8));
      const [_, tagCount] = ItemdatabaseFilloutTagData(component, struct3, 20); // _ITEM_DATABASE_FILLOUT_TAG_DATA
      // const tagCount = struct4.getInt32(0, true);
      if (ItemdatabaseIsKeyValid(component, 0)) {
        const var0 = new DataView(new ArrayBuffer(4 * 256));
        const var1 = new DataView(new ArrayBuffer(4));
        // ItemdatabaseFilloutTagData
        const ret = Citizen.invokeNative('0x5A11D6EEA17165B0', component, var0, var1, 20) as boolean;
        if (ret) {
          const tagCount = var1.getUint32(0, true);
          // Log(tagCount, buf2hex(var0.buffer));
          let offset = 8;
          for (let t = tagCount; t--; ) {
            const tagHash = var0.getInt32(offset, true);
            offset += 8;
            const tagCategory = var0.getInt32(offset, true);
            offset += 8;
            Log(`Tag${tagCount - t}:`, tagCategory, tagHash, itemTags.get(tagHash));
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
      // GetCategoryOfComponentAtIndex
      const componentCategory = Citizen.invokeNative('0x9b90842304c938a7', entity, i, false);
      if (componentCategories.has(componentCategory)) {
        Log(i, componentCategories.get(componentCategory));
      } else {
        Log(i, componentCategory);
      }
    }
  },
  false,
);

RegisterCommand(
  'listComponentWearableStates',
  (source: number, args: string[]) => {
    const entity = Number(args[0]) || PlayerPedId();
    const metaPedType = GetMetaPedType(entity);
    const isMale = IsPedMale(entity);
    const componentCount = GetNumComponentsInPed(entity);

    for (let i = componentCount; i--; ) {
      Log('--------=================--------');
      const struct1 = new DataView(new ArrayBuffer(4));
      const struct2 = new DataView(new ArrayBuffer(4));
      const component = GetShopItemComponentAtIndex(entity, i, true, struct1, struct2);
      const wearableState = struct2.getInt32(0, true);

      const componentCategory = GetShopItemComponentCategory(component, metaPedType, true);

      if (componentCategories.has(componentCategory)) {
        Log(i, component, componentCategories.get(componentCategory));
      } else {
        Log(i, component, componentCategory, '=================');
      }

      const wearableStateCount = GetShopItemNumWearableStates(component, !isMale, true);

      if (wearableStates.has(wearableState)) {
        Log('Current State:', wearableStates.get(wearableState));
      } else {
        Log('Current State:', wearableState, `0x${(wearableState >>> 0).toString(16)}`);
      }

      Log('Wearable Count: ', wearableStateCount);

      if (wearableStateCount > 0) {
        for (let j = wearableStateCount; j--; ) {
          const wearableState = GetShopItemWearableStateByIndex(component, j, !isMale, true);

          if (wearableStates.has(wearableState)) {
            Log(j, wearableState, wearableStates.get(wearableState));
          } else {
            Log(j, wearableState, `0x${(wearableState >>> 0).toString(16)}`);
          }
        }
      }
    }
  },
  false,
);

RegisterCommand(
  'listComponentsTest',
  () => {
    const components = componentManager.getPedComponentsForUI(PlayerPedId());

    Log(components);
  },
  false,
);

RegisterCommand(
  'listGuids',
  (source: number, args: string[]) => {
    const entity = Number(args[0]) || PlayerPedId();
    const componentCount = GetNumComponentsInPed(entity);

    for (let i = componentCount; i--; ) {
      const [_, drawable, albedo, normal, material] = GetMetaPedAssetGuids(entity, i);
      if (horseDrawables[drawable]) {
        Log(`guids[${i}]`, horseDrawables[drawable], drawable, albedo, normal, material);
      } else {
        Log(`guids[${i}]`, _, drawable, albedo, normal, material);
      }
    }
  },
  false,
);

const expressions = [
  55682,
  43894,
  55710,
  55711,

  10726, // horse body size
  3015, // horse muscles
  18278, // horse belly size / y pos
  60649, // horse belly x pos
  42991, // horse base of neck height
  26839, // horse neck thickness
  62347, // horse butt size
  11904, // horse rear back height
  36550, // horse thighs
  16934, // horse hind legs
  60975, // horse ankles
  39436, // horse hooves
  48003, // horse head size
  1589, // horse under jaw sagging
  62196, // horse nose bridge depth
  3054, // horse nose length
  55026, // horse forehead height
  23050, // horse right ear size
  22538, // horse left ear size
  22549, // horse nose size
  29982, // horse nose bridge height
  36120, // horse right nostril size
  35608, // horse left nostril size
  43213, // horse head width
  2075, // horse throat size
  34850, // horse right eye size
  17697, // horse right eye forward/backward
  17698, // horse right eye height
  34338, // horse left eye size
  17185, // horse left eye forward/backward
  17186, // horse left eye height
  9675, // horse hooves length
  8147, // horse muscle tone / veins
  57577, // horse belly size
  10002, // horse neck height
  63348, // horse belly size
  19812, // horse left ear forward/backward
  19813, // horse left ear x pos
  19780, // horse right ear forward/backward
  19781, // horse right ear x pos
  54287, // horse tail angle
  26933, // horse knee and hock size
  41611, // horse gender (0.0 = male, 1.0 = female)

  15833, // shoulder height - humans and horses
  41478, // back width / chest size/width - humans and horses
  8420, // forearms for humans / front legs for horses

  18046, // shoulder blades / back muscles
  46032, // arms size
  27779, // chest
  50460, // waist width
  49787, // hip width / stomach size
  64834, // thighs
  42067, // calves
  50039, // shoulders
  7010, // shoulder thickness
  34006, // head width
  41396, // face width
  13059, // eyebrow height
  12281, // eyebrow width
  19153, // eyebrow depth
  49231, // ears depth
  46798, // ears angle
  10308, // ears height
  60720, // earlobes
  27147, // cheekbones height
  43983, // cheekbones width
  13709, // cheekbones depth
  15375, // chin height
  50098, // chin width
  58147, // chin depth
  35627, // eyelid height
  7019, // eyelid width
  60996, // eyes depth
  53862, // eyes angle
  42318, // eyes distance
  56827, // eyes height
  28287, // nose width
  13425, // nose size
  1013, // nose height
  13489, // nose angle
  61782, // nose curvature
  22046, // nostrils distance
  61541, // mouth width
  43625, // mouth depth
  31427, // mouth x pos
  16653, // mouth y pos
  6656, // upper lip height
  37313, // upper lip width
  50037, // upper lip depth
  47949, // lower lip height
  45232, // lower lip width
  23830, // lower lip depth
  36106, // jaw height
  60334, // jaw width
  7670, // jaw depth
  55182, // jaw y pos

  57350, // mouth corner left width
  40950, // mouth corner left depth
  46661, // mouth corner left height
  22344, // mouth corner left upper lip distance
  60292, // mouth corner right upper lip distance
  49299, // mouth corner right height
  9423, // mouth corner right depth
  55718, // mouth corner right width

  22421, // right eyelid open/close
  52902, // left eyelid open/close
  36277, // neck width
  60890, // neck depth
  33485, // anterior trapezius
  46240, // chest height, females only
  8991, // butt/hip size, females only

  // ------------------
  // Hat adjustments can make you bald somewhat so make sure you have a hat on
  9584, // Hat Rotation
  9586, // Hat Angle Forward/Backward
  3437, // Hat Angle Left/Right
  52553, // Hat x pos
  16009, // Hat y pos
  38169, // Hat z pos

  2007, // BodyWeight
  65374, // Muscles | BodyWeight increases when negative
  50957, // Shoulder Size females only

  18365, // Left Mouth Corner Y Position
  56529, // Left Mouth Corner X Position
  38761, // Left Mouth Corner Depth

  18269, // Right Mouth Corner Y Position
  26786, // Right Mouth Corner X Position
  37225, // Right Mouth Corner Depth

  64491, // Right Mouth Width?
  65229, // Left Mouth Width?

  47172, // Left Ear Height
  50511, // Left Ear Width
  55285, // Left Ear Angle
  60384, // Left Earlobe Size

  38980, // Right Ear Height
  51023, // Right Ear Width
  53071, // Right Ear Angle
  60352, // Right Earlobe Size

  12691, // Left Brow Y Position
  16401, // Left Brow X Position
  45521, // Left Brow Depth

  12723, // Right Brow Y Position
  4593, // Right Brow X Position
  46033, // Right Brow Depth

  53838, // Left Eye Y Position
  50805, // Left Eye X Position
  60884, // Left Eye Depth
  30023, // Left Eye Angle

  47265, // Right Eye Y Position
  48591, // Right Eye X Position
  60852, // Right Eye Depth
  41831, // Right Eye Angle

  38948, // Left Eyelid Height
  60155, // Left Eyelid Width

  38210, // Right Eyelid Height
  48347, // Right Eyelid Width

  28571, // Left Cheekbone Y Position
  51671, // Left Cheekbone X Position
  3213, // Left Cheekbone Depth

  28603, // Right Cheekbone Y Position
  39863, // Right Cheekbone X Position
  3725, // Right Cheekbone Depth

  21326, // Right Nostril Size
  21422, // Left Nostril Size

  58204, // Skull Width
  38632, // Skull Height
  35929, // Skull Depth
];

// crun IN(0x669E223E64B1903C, 12, 0, 0, 0, true)
// crun PlayerPedId()
// spawn A_C_HORSE_ARABIAN_WHITE
// spawn A_C_DONKEY_01
// setExpressions 0 1.0

RegisterCommand(
  'getExpressions',
  (source: number, args: string[]) => {
    const ped = Number(args[0]);

    for (const expression of expressions) {
      const value = GetCharExpression(ped, expression);
      Log(expression, value);
    }
  },
  false,
);

RegisterCommand(
  'setExpressions',
  async (source: number, args: string[]) => {
    const ped = Number(args[0]);
    const value = Number(args[1]);

    // crun IN(0x669E223E64B1903C, 12, 0, 0, 0, true)
    // setExpressions 2.5 90

    for (const expression of expressions) {
      SetPedFaceFeature(ped, expression, value);
    }

    UpdatePedVariation(ped, false, true, true, true, false);

    console.log('done');
  },
  false,
);

RegisterCommand(
  'setExpression',
  async (source: number, args: string[]) => {
    const ped = args[2] ? Number(args[2]) : PlayerPedId();
    SetPedFaceFeature(ped, Number(args[0]), Number(args[1]));
    console.log(`SetPedFaceFeature(${ped}, ${Number(args[0])}, ${Number(args[1])})`);
    UpdatePedVariation(ped, false, true, true, true, false);
  },
  false,
);

const components = [
  -369348190,
  -2045421226,
  // 1790080661, // Prison Shirt
  // 1975258357, // Prison Pants
  // -755702786, // Darned Stockings
  // -864332025, // Darned Stockings Blue
  GetHashKey('CLOTHING_ITEM_F_TEETH_000'),
  // GetHashKey('CLOTHING_F_SEASON3_NIGHTGOWN_001_TINT_001'),
  GetHashKey('CLOTHING_ITEM_F_SHIRT_000_TINT_001'),
  // GetHashKey('CLOTHING_ITEM_F_PANTS_000_TINT_001'),
  GetHashKey('CLOTHING_ITEM_F_BODIES_UPPER_001_V_001'),
  GetHashKey('CLOTHING_ITEM_F_BODIES_LOWER_001_V_001'),
  GetHashKey('CLOTHING_ITEM_F_EYES_001_TINT_001'),
  GetHashKey('CLOTHING_ITEM_F_HEAD_001_V_001'),
  GetHashKey('CLOTHING_ITEM_F_HAIR_001_BLONDE'),
];

RegisterCommand(
  'findExpressions',
  async (source: number, args: string[]) => {
    const character = PVGame.getCurrentCharacter();
    Log('character', character);

    await PVGame.loadModel('MP_FEMALE');
    SetPlayerModel(PlayerId(), 'MP_FEMALE');
    await Delay(100);
    SetGameplayCamInitialHeading(162.5);
    SetRandomOutfitVariation(PlayerPedId(), true);
    await Delay(100);
    // await PVGame.pedIsReadyToRender(PlayerPedId()); // Spawn as Female
    // await PVGame.setPedComponentsMp(PlayerPedId(), components); // Spawn as Female
    await PVGame.skinPed(PlayerPedId(), character); // Clone current character
    UpdatePedVariation(PlayerPedId(), false, true, true, true, false);
    await Delay(200);

    const ped = PlayerPedId();
    const value = Number(args[0]);
    const mul = Number(args[1]);

    await Delay(50);

    const range = 10000;
    const start = 10000 * mul;
    const end = Math.min(start + range, 0xffff);
    console.log(start, '-', end);
    for (let n = start; n <= end; n++) {
      if (expressions.includes(n)) {
        Log('Skip', n);
        continue;
      }

      if (range < 10) {
        console.log('Set', n);
      }

      SetPedFaceFeature(ped, n, value);
      if (n % 100 === 0) {
        await Delay(1);
        UpdatePedVariation(ped, false, true, true, true, false);
        await Delay(1);
      }
    }
    UpdatePedVariation(ped, false, true, true, true, false);

    console.log('done');
  },
  false,
);

// ExecuteCommand('findExpressions 20 0');

RegisterCommand(
  'cloneExpressions',
  (source: number, args: string[]) => {
    const ped = Number(args[0]);
    const ped2 = Number(args[1]);

    for (const expression of expressions) {
      const value = GetCharExpression(ped, expression);
      Log(expression, value);
      SetPedFaceFeature(ped2, expression, value);
    }

    UpdatePedVariation(ped2, false, true, true, true, false);
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
//       Log('model', model);
//       const horse = await PVGame.createPed(model, coords.x, coords.y, coords.z);
//       await Delay(500);
//
//       const componentCount = GetNumComponentsInPed(horse);
//
//       for (let i = componentCount; i--; ) {
//         const [drawable, albedo, normal, material] = GetMetaPedAssetGuids(horse, i);
//         if (horseDrawables[drawable]) {
//           // Log(`guids[${i}]`, horseDrawables[drawable], drawable, albedo, normal, material);
//         } else if (drawable !== 505041967 && drawable !== 1410957448) {
//           Log(`guids[${i}]`, drawable, albedo, normal, material);
//         }
//       }
//
//       await Delay(125);
//       PVBase.deleteEntity(horse);
//     }
//     Log('! DONE !');
//   },
//   false,
// );
