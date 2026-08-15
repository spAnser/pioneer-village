import { PVGame, PVGameEvents } from '@lib/client';
import { Delay } from '@lib/functions';
import { Vector3 } from '@lib/math';

import { PELTS } from './pelts';

PVGameEvents.register('EVENT_PICKUP_CARRIABLE', (data) => {
  console.log('EVENT_PICKUP_CARRIABLE', data);
});

PVGameEvents.register('EVENT_PLACE_CARRIABLE_ONTO_PARENT', (data) => {
  console.log('EVENT_PLACE_CARRIABLE_ONTO_PARENT', data);

  const peltTexture = Citizen.invokeNative<number>('0x120376c23f019c6c', data.carriable, Citizen.pointerValueInt());
  let peltData;
  for (const [texture, data] of Object.entries(PELTS)) {
    if (GetHashKey(texture) === peltTexture) {
      peltData = { id: texture, ...data };
    }
  }

  console.log('peltTexture', peltTexture, peltData);
  // ExecuteCommand(`pelts ${data.parent}`);
});

PVGameEvents.register('EVENT_CARRIABLE_UPDATE_CARRY_STATE', (data) => {
  console.log('EVENT_CARRIABLE_UPDATE_CARRY_STATE', data);
});

PVGameEvents.register('EVENT_LOOT', (data) => {
  console.log('EVENT_LOOT', data);
});

PVGameEvents.register('EVENT_LOOT_COMPLETE', (data) => {
  console.log('EVENT_LOOT_COMPLETE', data);
});

const PROVISION = [
  'PROVISION_BEAR_FUR_POOR', // P_CS_PELT_XLARGE_BEAR | CARRIABLE_XL_BEAR_SKIN
  'PROVISION_BEAR_FUR', // P_CS_PELT_XLARGE_BEAR | CARRIABLE_XL_BEAR_SKIN
  'PROVISION_BEAR_FUR_PRISTINE', // P_CS_PELT_XLARGE_BEAR | CARRIABLE_XL_BEAR_SKIN
  'PROVISION_BEAR_LEGENDARY_FUR_PRISTINE', // P_CS_PELT_XLARGE_BEARLEGENDARY | CARRIABLE_XL_BEAR_SKIN

  'PROVISION_BEAVER_FUR_POOR', // P_CS_PELT_MEDLARGE | CARRIABLE_ANIMAL_SKIN_ML
  'PROVISION_BEAVER_FUR', // P_CS_PELT_MEDLARGE | CARRIABLE_ANIMAL_SKIN_ML
  'PROVISION_BEAVER_FUR_PRISTINE', // P_CS_PELT_MEDLARGE | CARRIABLE_ANIMAL_SKIN_ML
  'PROVISION_BEAVER_LEGENDARY_FUR_PRISTINE', // TODO: Find out?

  // 'PROVISION_BLACK_BEAR_FUR_POOR', // P_CS_BLACKBEARSKIN_MEDLARGE | CARRIABLE_XL_BEAR_BLACK_SKIN
  // 'PROVISION_BLACK_BEAR_FUR', // P_CS_BLACKBEARSKIN_MEDLARGE | CARRIABLE_XL_BEAR_BLACK_SKIN
  // 'PROVISION_BLACK_BEAR_FUR_PRISTINE', // P_CS_BLACKBEARSKIN_MEDLARGE | CARRIABLE_XL_BEAR_BLACK_SKIN

  'PROVISION_BUCK_FUR_POOR', // P_CS_PELT_LARGE | CARRIABLE_ANIMAL_SKIN_L
  'PROVISION_BUCK_FUR', // P_CS_PELT_LARGE | CARRIABLE_ANIMAL_SKIN_L
  'PROVISION_BUCK_FUR_PRISTINE', // P_CS_PELT_LARGE | CARRIABLE_ANIMAL_SKIN_L
  'PROVISION_BUCK_LEGENDARY_FUR_PRISTINE', // P_CS_PELT_LARGE | CARRIABLE_ANIMAL_SKIN_L

  // 'PROVISION_BUFFALO_FUR_POOR', // P_CS_PELT_XLARGE_BUFFALO | CARRIABLE_XL_BUFFALO_SKIN
  // 'PROVISION_BUFFALO_FUR', // P_CS_PELT_XLARGE_BUFFALO | CARRIABLE_XL_BUFFALO_SKIN
  // 'PROVISION_BUFFALO_FUR_PRISTINE', // P_CS_PELT_XLARGE_BUFFALO | CARRIABLE_XL_BUFFALO_SKIN
  // 'PROVISION_TAKANTA_BUFFALO_LEGENDARY_FUR_PRISTINE', // P_CS_PELT_XLARGE_TBUFFALO | CARRIABLE_XL_BUFFALO_SKIN
  // 'PROVISION_WHITE_BUFFALO_LEGENDARY_FUR_PRISTINE', // P_CS_PELT_XLARGE_WBUFFALO | CARRIABLE_XL_BUFFALO_SKIN

  'PROVISION_COUGAR_FUR_POOR', // P_CS_PELT_LARGE | CARRIABLE_ANIMAL_SKIN_L
  'PROVISION_COUGAR_FUR', // P_CS_PELT_LARGE | CARRIABLE_ANIMAL_SKIN_L
  'PROVISION_COUGAR_FUR_PRISTINE', // P_CS_PELT_LARGE | CARRIABLE_ANIMAL_SKIN_L
  'PROVISION_COUGAR_LEGENDARY_FUR_PRISTINE', // TODO: Find out?

  'PROVISION_COYOTE_FUR_POOR', // P_CS_PELT_MEDLARGE | CARRIABLE_ANIMAL_SKIN_ML
  'PROVISION_COYOTE_FUR', // P_CS_PELT_MEDLARGE | CARRIABLE_ANIMAL_SKIN_ML
  'PROVISION_COYOTE_FUR_PRISTINE', // P_CS_PELT_MEDLARGE | CARRIABLE_ANIMAL_SKIN_ML
  'PROVISION_COYOTE_LEGENDARY_FUR_PRISTINE', // TODO: Find out?

  // 'PROVISION_ELK_FUR_POOR', // P_CS_PELT_XLARGE | CARRIABLE_XL_ANIMAL_SKIN
  // 'PROVISION_ELK_FUR', // P_CS_PELT_XLARGE | CARRIABLE_XL_ANIMAL_SKIN
  // 'PROVISION_ELK_FUR_PRISTINE', // P_CS_PELT_XLARGE | CARRIABLE_XL_ANIMAL_SKIN
  // 'PROVISION_ELK_LEGENDARY_FUR_PRISTINE',

  'PROVISION_FOX_FUR_POOR', // P_CS_PELT_MEDLARGE | CARRIABLE_ANIMAL_SKIN_ML
  'PROVISION_FOX_FUR', // P_CS_PELT_MEDLARGE | CARRIABLE_ANIMAL_SKIN_ML
  'PROVISION_FOX_FUR_PRISTINE', // P_CS_PELT_MEDLARGE | CARRIABLE_ANIMAL_SKIN_ML
  'PROVISION_FOX_LEGENDARY_FUR_PRISTINE', // TODO: Find out?

  // 'PROVISION_MOOSE_FUR_POOR', // P_CS_PELT_XLARGE | CARRIABLE_XL_ANIMAL_SKIN
  // 'PROVISION_MOOSE_FUR', // P_CS_PELT_XLARGE | CARRIABLE_XL_ANIMAL_SKIN
  // 'PROVISION_MOOSE_FUR_PRISTINE', // P_CS_PELT_XLARGE | CARRIABLE_XL_ANIMAL_SKIN
  // 'PROVISION_MOOSE_LEGENDARY_FUR_PRISTINE',

  // 'PROVISION_MUSKRAT_FUR_POOR', // P_CS_PELT_MED_MUSKRAT | 301878756 0x11FE4DE4
  // 'PROVISION_MUSKRAT_FUR', // P_CS_PELT_MED_MUSKRAT | 301878756 0x11FE4DE4
  // 'PROVISION_MUSKRAT_FUR_PRISTINE', // P_CS_PELT_MED_MUSKRAT | 301878756 0x11FE4DE4

  // 'PROVISION_OPOSSUM_FUR_POOR', // P_CS_PELT_MED_POSSUM | 301878756 0x11FE4DE4
  // 'PROVISION_OPOSSUM_FUR', // P_CS_PELT_MED_POSSUM | 301878756 0x11FE4DE4
  // 'PROVISION_OPOSSUM_FUR_PRISTINE', // P_CS_PELT_MED_POSSUM | 301878756 0x11FE4DE4

  'PROVISION_PANTHER_FUR_POOR', // P_CS_PELT_LARGE | CARRIABLE_ANIMAL_SKIN_L
  'PROVISION_PANTHER_FUR', // P_CS_PELT_LARGE | CARRIABLE_ANIMAL_SKIN_L
  'PROVISION_PANTHER_FUR_PRISTINE', // P_CS_PELT_LARGE | CARRIABLE_ANIMAL_SKIN_L
  'PROVISION_PANTHER_LEGENDARY_FUR_PRISTINE', // TODO: Find out?

  'PROVISION_PRONGHORN_FUR_POOR', // P_CS_PELT_LARGE | CARRIABLE_ANIMAL_SKIN_L
  'PROVISION_PRONGHORN_FUR', // P_CS_PELT_LARGE | CARRIABLE_ANIMAL_SKIN_L
  'PROVISION_PRONGHORN_FUR_PRISTINE', // P_CS_PELT_LARGE | CARRIABLE_ANIMAL_SKIN_L
  'PROVISION_PRONGHORN_LEGENDARY_FUR_PRISTINE', // TODO: Find out?

  // 'PROVISION_RACCOON_FUR_POOR', // P_CS_PELT_MED_RACCOON | 301878756 0x11FE4DE4
  // 'PROVISION_RACCOON_FUR', // P_CS_PELT_MED_RACCOON | 301878756 0x11FE4DE4
  // 'PROVISION_RACCOON_FUR_PRISTINE', // P_CS_PELT_MED_RACCOON | 301878756 0x11FE4DE4

  // 'PROVISION_RAT_FUR_POOR',
  // 'PROVISION_RAT_FUR',
  // 'PROVISION_RAT_FUR_PRISTINE',

  // 'PROVISION_SKUNK_FUR_POOR', // P_CS_PELT_MED_SKUNK | 301878756 0x11FE4DE4
  // 'PROVISION_SKUNK_FUR', // P_CS_PELT_MED_SKUNK | 301878756 0x11FE4DE4
  // 'PROVISION_SKUNK_FUR_PRISTINE', // P_CS_PELT_MED_SKUNK | 301878756 0x11FE4DE4

  'PROVISION_WOLF_FUR_POOR', // P_CS_PELT_LARGE | CARRIABLE_ANIMAL_SKIN_L
  'PROVISION_WOLF_FUR', // P_CS_PELT_LARGE | CARRIABLE_ANIMAL_SKIN_L
  'PROVISION_WOLF_FUR_PRISTINE', // P_CS_PELT_LARGE | CARRIABLE_ANIMAL_SKIN_L
  'PROVISION_WOLF_LEGENDARY_FUR_PRISTINE', // TODO: Find out?
];

const PROVISION_HASHES: Record<number, string> = {};
for (const name of PROVISION) {
  const hash = GetHashKey(name);
  PROVISION_HASHES[hash] = name;
}

const SLOT_ID_NAMES = [
  'SLOTID_ACTIVE_HORSE',
  'SLOTID_ANY',
  'SLOTID_CAMP_DOG',
  'SLOTID_CAMP_DOG_COAT',
  'SLOTID_CAMP_FLAG',
  'SLOTID_CAMP_FOLLOWER',
  'SLOTID_CAMP_FOLLOWER_OUTFIT',
  'SLOTID_CAMP_LOCKBOX',
  'SLOTID_CAMP_MUSIC',
  'SLOTID_CAMP_TENT',
  'SLOTID_CAMP_THEME',
  'SLOTID_CAMP_UPGRADE',
  'SLOTID_CARAVAN_UPGRADE',
  'SLOTID_CARD_PROGRESSION',
  'SLOTID_CARDS',
  'SLOTID_CARDS_DEADEYE',
  'SLOTID_CARDS_PASSIVE_EQUIPPED_1',
  'SLOTID_CARDS_PASSIVE_EQUIPPED_2',
  'SLOTID_CARDS_PASSIVE_EQUIPPED_3',
  'SLOTID_CARRIED_HORSE_EQUIPMENT',
  'SLOTID_CARRIED_WEAPONS',
  'SLOTID_CARRIED_WEAPONS_MODS',
  'SLOTID_CHALLENGE_PROGRESSION',
  'SLOTID_CHARACTER_0',
  'SLOTID_CHARACTER_1',
  'SLOTID_CHIPS_GAME',
  'SLOTID_COACH_INSURANCE',
  'SLOTID_COACH_LIVERY',
  'SLOTID_COACH_STALL_01',
  'SLOTID_COMPENDIUM',
  'SLOTID_COMPENDIUM_PAGE',
  'SLOTID_COMPENDIUM_STAMP',
  'SLOTID_COUPONS',
  'SLOTID_CURRENCY',
  'SLOTID_DEFAULT_STABLE',
  'SLOTID_DEFAULT_STABLE_STALLS',
  'SLOTID_EMOTE_ACTION',
  'SLOTID_EMOTE_DANCE',
  'SLOTID_EMOTE_GREET',
  'SLOTID_EMOTE_ITEM',
  'SLOTID_EMOTE_REACT',
  'SLOTID_EMOTE_TAUNT',
  'SLOTID_EMOTE_TWIRL_GUN',
  'SLOTID_FEES',
  'SLOTID_FME_HERBS_EXPAND',
  'SLOTID_HANDGUN_BARREL',
  'SLOTID_HANDGUN_HAMMER',
  'SLOTID_HONOR',
  'SLOTID_HORSE_BEDROLL',
  'SLOTID_HORSE_BLANKET',
  'SLOTID_HORSE_CANTLE',
  'SLOTID_HORSE_FENDER',
  'SLOTID_HORSE_HORN',
  'SLOTID_HORSE_INSURANCE',
  'SLOTID_HORSE_LANTERN',
  'SLOTID_HORSE_MANE',
  'SLOTID_HORSE_MASK',
  'SLOTID_HORSE_MOUSTACHE',
  'SLOTID_HORSE_REINS',
  'SLOTID_HORSE_SADDLE',
  'SLOTID_HORSE_SADDLE_01',
  'SLOTID_HORSE_SADDLE_02',
  'SLOTID_HORSE_SADDLE_03',
  'SLOTID_HORSE_SADDLE_04',
  'SLOTID_HORSE_SADDLE_05',
  'SLOTID_HORSE_SADDLE_06',
  'SLOTID_HORSE_SADDLE_07',
  'SLOTID_HORSE_SADDLE_08',
  'SLOTID_HORSE_SADDLE_09',
  'SLOTID_HORSE_SADDLE_10',
  'SLOTID_HORSE_SADDLEBAG',
  'SLOTID_HORSE_SATCHEL',
  'SLOTID_HORSE_SEAT',
  'SLOTID_HORSE_SEX',
  'SLOTID_HORSE_SKIRT',
  'SLOTID_HORSE_STALL_01',
  'SLOTID_HORSE_STALL_02',
  'SLOTID_HORSE_STALL_03',
  'SLOTID_HORSE_STALL_04',
  'SLOTID_HORSE_STALL_05',
  'SLOTID_HORSE_STIRRUP',
  'SLOTID_HORSE_TAIL',
  'SLOTID_HUNTING_WAGON',
  'SLOTID_MINIGAME',
  'SLOTID_MISSION_TIMERS',
  'SLOTID_MOONSHINE_COOK',
  'SLOTID_MOONSHINE_RECIPE',
  'SLOTID_MOONSHINE_STILL',
  'SLOTID_MOONSHINER_BAR_PHOTO',
  'SLOTID_MOONSHINER_CRAFT_FLAVOR',
  'SLOTID_MOONSHINER_CRAFT_INPUT',
  'SLOTID_MOONSHINER_LOCATION',
  'SLOTID_MOONSHINER_THEME',
  'SLOTID_MOONSHINER_UPGRADE',
  'SLOTID_NONE',
  'SLOTID_NOTORIETY',
  'SLOTID_OWNED_CONTENT',
  'SLOTID_PLAYER_BODY_TYPE',
  'SLOTID_PLAYER_GENDER',
  'SLOTID_PLAYER_VOICE',
  'SLOTID_PROGRESSION',
  'SLOTID_PROPERTY',
  'SLOTID_PURCHASED_CONTENT',
  'SLOTID_ROLE_ITEMS',
  'SLOTID_SAMPLE',
  'SLOTID_SATCHEL',
  'SLOTID_STABLE',
  'SLOTID_TEMPORARY_HORSE',
  'SLOTID_UPGRADE',
  'SLOTID_VOUCHERS',
  'SLOTID_WARDROBE',
  'SLOTID_WARDROBE_AGEING',
  'SLOTID_WARDROBE_BEARD',
  'SLOTID_WARDROBE_BEARD_CHIN',
  'SLOTID_WARDROBE_BEARD_CHOPS',
  'SLOTID_WARDROBE_BEARD_MUSTACHE',
  'SLOTID_WARDROBE_BLUSH',
  'SLOTID_WARDROBE_COMPLEXION',
  'SLOTID_WARDROBE_COMPLEXION_2',
  'SLOTID_WARDROBE_EYEBROWS',
  'SLOTID_WARDROBE_EYELINER',
  'SLOTID_WARDROBE_EYES',
  'SLOTID_WARDROBE_EYESHADOW',
  'SLOTID_WARDROBE_EYEWEAR',
  'SLOTID_WARDROBE_FACE_PAINT',
  'SLOTID_WARDROBE_FOOTWEAR_1',
  'SLOTID_WARDROBE_FOOTWEAR_2',
  'SLOTID_WARDROBE_FOOTWEAR_3',
  'SLOTID_WARDROBE_FOUNDATION',
  'SLOTID_WARDROBE_FRECKLES',
  'SLOTID_WARDROBE_GLOVES',
  'SLOTID_WARDROBE_GRIME',
  'SLOTID_WARDROBE_GUNBELT',
  'SLOTID_WARDROBE_HAIR',
  'SLOTID_WARDROBE_HEAD',
  'SLOTID_WARDROBE_HEADWEAR',
  'SLOTID_WARDROBE_LIPSTICK',
  'SLOTID_WARDROBE_LOADOUT',
  'SLOTID_WARDROBE_LOADOUT_1',
  'SLOTID_WARDROBE_LOADOUT_2',
  'SLOTID_WARDROBE_LOADOUT_3',
  'SLOTID_WARDROBE_LOADOUT_4',
  'SLOTID_WARDROBE_LOADOUT_5',
  'SLOTID_WARDROBE_LOADOUT_6',
  'SLOTID_WARDROBE_LOADOUT_7',
  'SLOTID_WARDROBE_LOADOUT_8',
  'SLOTID_WARDROBE_LOADOUT_9',
  'SLOTID_WARDROBE_LOWER_BODY',
  'SLOTID_WARDROBE_LOWER_GARB',
  'SLOTID_WARDROBE_MISC',
  'SLOTID_WARDROBE_MOLES',
  'SLOTID_WARDROBE_NECKWEAR_1',
  'SLOTID_WARDROBE_NECKWEAR_2',
  'SLOTID_WARDROBE_OUTFIT',
  'SLOTID_WARDROBE_SATCHEL',
  'SLOTID_WARDROBE_SCAR',
  'SLOTID_WARDROBE_SKIN_MOTTLING',
  'SLOTID_WARDROBE_SPOTS',
  'SLOTID_WARDROBE_TEETH',
  'SLOTID_WARDROBE_UPPER_BODY',
  'SLOTID_WARDROBE_UPPER_GARB',
  'SLOTID_WATCH',
  'SLOTID_WEAPON_0',
  'SLOTID_WEAPON_1',
  'SLOTID_WEAPON_2',
  'SLOTID_WEAPON_3',
  'SLOTID_WEAPON_BOW_FRAME_TINT',
  'SLOTID_WEAPON_BOW_GRIPSTOCK_TINT',
  'SLOTID_WEAPON_BOW_IMPROVED_GRIP',
  'SLOTID_WEAPON_BOW_TRIGGER_TINT',
  'SLOTID_WEAPON_FISHINGROD_GRIP',
  'SLOTID_WEAPON_LONGARM_BARREL_ENGRAVING',
  'SLOTID_WEAPON_LONGARM_BARREL_ENGRAVING_MATERIAL',
  'SLOTID_WEAPON_LONGARM_BARREL_MATERIAL',
  'SLOTID_WEAPON_LONGARM_BARREL_RIFLING',
  'SLOTID_WEAPON_LONGARM_CYLINDER_ENGRAVING',
  'SLOTID_WEAPON_LONGARM_CYLINDER_ENGRAVING_MATERIAL',
  'SLOTID_WEAPON_LONGARM_CYLINDER_MATERIAL',
  'SLOTID_WEAPON_LONGARM_FRAME_ENGRAVING',
  'SLOTID_WEAPON_LONGARM_FRAME_ENGRAVING_MATERIAL',
  'SLOTID_WEAPON_LONGARM_FRAME_ENGRAVING_ROLE',
  'SLOTID_WEAPON_LONGARM_FRAME_MATERIAL',
  'SLOTID_WEAPON_LONGARM_GRIP_MATERIAL',
  'SLOTID_WEAPON_LONGARM_GRIPSTOCK_ENGRAVING',
  'SLOTID_WEAPON_LONGARM_GRIPSTOCK_TINT',
  'SLOTID_WEAPON_LONGARM_HAMMER_MATERIAL',
  'SLOTID_WEAPON_LONGARM_SIGHT_MATERIAL',
  'SLOTID_WEAPON_LONGARM_STRAP_TINT',
  'SLOTID_WEAPON_LONGARM_TRIGGER_MATERIAL',
  'SLOTID_WEAPON_LONGARM_WRAP_MATERIAL',
  'SLOTID_WEAPON_LONGARM_WRAP_TINT',
  'SLOTID_WEAPON_MELEE_BLADE_ENGRAVING',
  'SLOTID_WEAPON_MELEE_BLADE_ENGRAVING_MATERIAL',
  'SLOTID_WEAPON_MELEE_BLADE_MATERIAL',
  'SLOTID_WEAPON_MELEE_GRIP_TINT',
  'SLOTID_WEAPON_PISTOL_M1899_BARREL',
  'SLOTID_WEAPON_PISTOL_M1899_CLIP',
  'SLOTID_WEAPON_PISTOL_M1899_GRIP',
  'SLOTID_WEAPON_PISTOL_M1899_SIGHT',
  'SLOTID_WEAPON_PISTOL_MAUSER_BARREL',
  'SLOTID_WEAPON_PISTOL_MAUSER_CLIP',
  'SLOTID_WEAPON_PISTOL_MAUSER_GRIP',
  'SLOTID_WEAPON_PISTOL_MAUSER_SIGHT',
  'SLOTID_WEAPON_PISTOL_SEMIAUTO_BARREL',
  'SLOTID_WEAPON_PISTOL_SEMIAUTO_CLIP',
  'SLOTID_WEAPON_PISTOL_SEMIAUTO_GRIP',
  'SLOTID_WEAPON_PISTOL_SEMIAUTO_SIGHT',
  'SLOTID_WEAPON_PISTOL_VOLCANIC_BARREL',
  'SLOTID_WEAPON_PISTOL_VOLCANIC_CLIP',
  'SLOTID_WEAPON_PISTOL_VOLCANIC_GRIP',
  'SLOTID_WEAPON_PISTOL_VOLCANIC_SIGHT',
  'SLOTID_WEAPON_REPEATER_CARBINE_CLIP',
  'SLOTID_WEAPON_REPEATER_CARBINE_GRIP',
  'SLOTID_WEAPON_REPEATER_CARBINE_LEVER',
  'SLOTID_WEAPON_REPEATER_CARBINE_SIGHT',
  'SLOTID_WEAPON_REPEATER_CARBINE_TUBE',
  'SLOTID_WEAPON_REPEATER_CARBINE_WRAP1',
  'SLOTID_WEAPON_REPEATER_EVANS_GRIP',
  'SLOTID_WEAPON_REPEATER_EVANS_SIGHT',
  'SLOTID_WEAPON_REPEATER_EVANS_WRAP',
  'SLOTID_WEAPON_REPEATER_HENRY_GRIP',
  'SLOTID_WEAPON_REPEATER_HENRY_LEVER',
  'SLOTID_WEAPON_REPEATER_HENRY_SIGHT',
  'SLOTID_WEAPON_REPEATER_HENRY_WRAP1',
  'SLOTID_WEAPON_REPEATER_PUMPACTION_CLIP',
  'SLOTID_WEAPON_REPEATER_PUMPACTION_GRIP',
  'SLOTID_WEAPON_REPEATER_PUMPACTION_SIGHT',
  'SLOTID_WEAPON_REPEATER_WINCHESTER_GRIP',
  'SLOTID_WEAPON_REPEATER_WINCHESTER_LEVER',
  'SLOTID_WEAPON_REPEATER_WINCHESTER_SIGHT',
  'SLOTID_WEAPON_REPEATER_WINCHESTER_WRAP1',
  'SLOTID_WEAPON_REVOLVER_CATTLEMAN_BARREL',
  'SLOTID_WEAPON_REVOLVER_CATTLEMAN_CLIP',
  'SLOTID_WEAPON_REVOLVER_CATTLEMAN_GRIP',
  'SLOTID_WEAPON_REVOLVER_CATTLEMAN_SIGHT',
  'SLOTID_WEAPON_REVOLVER_DOUBLEACTION_BARREL',
  'SLOTID_WEAPON_REVOLVER_DOUBLEACTION_CLIP',
  'SLOTID_WEAPON_REVOLVER_DOUBLEACTION_GRIP',
  'SLOTID_WEAPON_REVOLVER_DOUBLEACTION_SIGHT',
  'SLOTID_WEAPON_REVOLVER_LEMAT_AMMO_REVOLVER',
  'SLOTID_WEAPON_REVOLVER_LEMAT_AMMO_SHOTGUN',
  'SLOTID_WEAPON_REVOLVER_LEMAT_BARREL',
  'SLOTID_WEAPON_REVOLVER_LEMAT_GRIP',
  'SLOTID_WEAPON_REVOLVER_LEMAT_SIGHT',
  'SLOTID_WEAPON_REVOLVER_NAVY_AMMO_REVOLVER',
  'SLOTID_WEAPON_REVOLVER_NAVY_BARREL',
  'SLOTID_WEAPON_REVOLVER_NAVY_BARREL_CROSSOVER',
  'SLOTID_WEAPON_REVOLVER_NAVY_GRIP',
  'SLOTID_WEAPON_REVOLVER_NAVY_GRIP_CROSSOVER',
  'SLOTID_WEAPON_REVOLVER_NAVY_SIGHT',
  'SLOTID_WEAPON_REVOLVER_NAVY_SIGHT_CROSSOVER',
  'SLOTID_WEAPON_REVOLVER_SCHOFIELD_BARREL',
  'SLOTID_WEAPON_REVOLVER_SCHOFIELD_CLIP',
  'SLOTID_WEAPON_REVOLVER_SCHOFIELD_GRIP',
  'SLOTID_WEAPON_REVOLVER_SCHOFIELD_SCOPE',
  'SLOTID_WEAPON_REVOLVER_SCHOFIELD_SIGHT',
  'SLOTID_WEAPON_RIFLE_BOLTACTION_GRIP',
  'SLOTID_WEAPON_RIFLE_BOLTACTION_SIGHT',
  'SLOTID_WEAPON_RIFLE_CARCANO_SIGHT',
  'SLOTID_WEAPON_RIFLE_ELEPHANT_BARREL',
  'SLOTID_WEAPON_RIFLE_ELEPHANT_CLIP',
  'SLOTID_WEAPON_RIFLE_ELEPHANT_GRIP',
  'SLOTID_WEAPON_RIFLE_ELEPHANT_SIGHT',
  'SLOTID_WEAPON_RIFLE_ELEPHANT_STOCK',
  'SLOTID_WEAPON_RIFLE_ELEPHANT_WRAP1',
  'SLOTID_WEAPON_RIFLE_ROLLINGBLOCK_SIGHT',
  'SLOTID_WEAPON_RIFLE_SPRINGFIELD_GRIP',
  'SLOTID_WEAPON_RIFLE_SPRINGFIELD_SIGHT',
  'SLOTID_WEAPON_RIFLE_SPRINGFIELD_WRAP1',
  'SLOTID_WEAPON_RIFLE_VARMINT_CLIP',
  'SLOTID_WEAPON_RIFLE_VARMINT_GRIP',
  'SLOTID_WEAPON_RIFLE_VARMINT_WRAP1',
  'SLOTID_WEAPON_SHORTARM_BARREL_ENGRAVING',
  'SLOTID_WEAPON_SHORTARM_BARREL_ENGRAVING_MATERIAL',
  'SLOTID_WEAPON_SHORTARM_BARREL_MATERIAL',
  'SLOTID_WEAPON_SHORTARM_BARREL_RIFLING',
  'SLOTID_WEAPON_SHORTARM_CYLINDER_ENGRAVING',
  'SLOTID_WEAPON_SHORTARM_CYLINDER_ENGRAVING_MATERIAL',
  'SLOTID_WEAPON_SHORTARM_CYLINDER_MATERIAL',
  'SLOTID_WEAPON_SHORTARM_FRAME_ENGRAVING',
  'SLOTID_WEAPON_SHORTARM_FRAME_ENGRAVING_MATERIAL',
  'SLOTID_WEAPON_SHORTARM_FRAME_ENGRAVING_ROLE',
  'SLOTID_WEAPON_SHORTARM_FRAME_MATERIAL',
  'SLOTID_WEAPON_SHORTARM_GRIP_MATERIAL',
  'SLOTID_WEAPON_SHORTARM_GRIPSTOCK_ENGRAVING',
  'SLOTID_WEAPON_SHORTARM_GRIPSTOCK_TINT',
  'SLOTID_WEAPON_SHORTARM_HAMMER_MATERIAL',
  'SLOTID_WEAPON_SHORTARM_SIGHT_MATERIAL',
  'SLOTID_WEAPON_SHORTARM_TRIGGER_MATERIAL',
  'SLOTID_WEAPON_SHOTGUN_BARREL_ENGRAVING',
  'SLOTID_WEAPON_SHOTGUN_CYLINDER_ENGRAVING',
  'SLOTID_WEAPON_SHOTGUN_DOUBLEBARREL_BARREL',
  'SLOTID_WEAPON_SHOTGUN_DOUBLEBARREL_CLIP',
  'SLOTID_WEAPON_SHOTGUN_DOUBLEBARREL_CLIP_EXOTIC',
  'SLOTID_WEAPON_SHOTGUN_DOUBLEBARREL_GRIP',
  'SLOTID_WEAPON_SHOTGUN_DOUBLEBARREL_GRIP_EXOTIC',
  'SLOTID_WEAPON_SHOTGUN_DOUBLEBARREL_SIGHT',
  'SLOTID_WEAPON_SHOTGUN_DOUBLEBARREL_WRAP1',
  'SLOTID_WEAPON_SHOTGUN_FOLDING_GRIP',
  'SLOTID_WEAPON_SHOTGUN_FOLDING_WRAP1',
  'SLOTID_WEAPON_SHOTGUN_FRAME_ENGRAVING',
  'SLOTID_WEAPON_SHOTGUN_FRAME_ENGRAVING_ROLE',
  'SLOTID_WEAPON_SHOTGUN_PUMP_CLIP',
  'SLOTID_WEAPON_SHOTGUN_PUMP_GRIP',
  'SLOTID_WEAPON_SHOTGUN_PUMP_WRAP1',
  'SLOTID_WEAPON_SHOTGUN_PUMPACTION_BARREL',
  'SLOTID_WEAPON_SHOTGUN_PUMPACTION_SIGHT',
  'SLOTID_WEAPON_SHOTGUN_REPEATING_BARREL',
  'SLOTID_WEAPON_SHOTGUN_REPEATING_GRIP',
  'SLOTID_WEAPON_SHOTGUN_REPEATING_SIGHT',
  'SLOTID_WEAPON_SHOTGUN_SAWED_SIGHT',
  'SLOTID_WEAPON_SHOTGUN_SAWEDOFF_GRIP',
  'SLOTID_WEAPON_SHOTGUN_SAWEDOFF_STOCK',
  'SLOTID_WEAPON_SHOTGUN_SAWEDOFF_WRAP1',
  'SLOTID_WEAPON_SHOTGUN_SEMIAUTO_BARREL',
  'SLOTID_WEAPON_SHOTGUN_SEMIAUTO_GRIP',
  'SLOTID_WEAPON_SHOTGUN_SEMIAUTO_SIGHT',
  'SLOTID_WEAPON_SHOTGUN_SEMIAUTO_WRAP1',
  'SLOTID_WEAPON_SNIPERRIFLE_ROLLINGBLOCK_GRIP',
  'SLOTID_WEB_INBOX',
  'SLOTID_WEB_INBOX_AMMO',
  'SLOTID_WEB_INBOX_CONSUMABLES',
  'SLOTID_WEB_INBOX_DOCUMENTS',
  'SLOTID_WEB_INBOX_GIFTS',
  'SLOTID_WEB_INBOX_HORSES',
  'SLOTID_WEB_INBOX_KIT',
  'SLOTID_WEB_INBOX_OFFERS',
  'SLOTID_WEB_INBOX_WEAPONS',
];

const SLOT_IDS: Record<number, string> = {};

for (const name of SLOT_ID_NAMES) {
  const hash = GetHashKey(name);
  SLOT_IDS[hash] = name;
}

for (let handle = 0; handle < 15; handle++) {
  InventoryReleaseItemCollection(handle);
}

RegisterCommand(
  'pelts',
  async (source: number, args: any[], rawCommand: string) => {
    // console.log({ source, args, rawCommand });
    const horse = Number(GetMountOwnedByPlayer(PlayerId())) || 0;
    if (!horse) return;

    const horseState = Entity(horse).state;

    const lastPeltCount = horseState.lastPeltCount;
    const lastPelts = horseState.lastPelts || [];
    const storedPelts = horseState.storedPelts || [];

    console.log(`Horse ${horse} last pelt count:`, lastPeltCount);
    console.log(`Horse ${horse} last pelts:`, lastPelts);

    const pelts: [number, string][] = [];
    let n = 0;
    while (true) {
      const pelt = GetPeltFromHorse(horse, n);
      if (pelt === 0) break;
      let peltName = PROVISION_HASHES[pelt] || '';
      console.log(`Pelt ${n}:`, peltName || pelt);
      pelts.push([pelt, peltName]);
      n++;
      if (n > 5) break;
    }
    // if (pelts.length > 2) {
    //   ClearPeltFromHorse(horse, pelts[2]);
    // }
    // if (pelts.length > 1) {
    //   ClearPeltFromHorse(horse, pelts[1]);
    // }
    if (lastPeltCount >= 3) {
      const oldestPelt = lastPelts[0];
      storedPelts.push(oldestPelt);
    }
    // lastPelts = pelts;
    // lastPeltCount = pelts.length;
    horseState.set('lastPelts', pelts, true);
    horseState.set('lastPeltCount', pelts.length, true);
    horseState.set('storedPelts', storedPelts, true);
    console.log('Visible Pelts\n', pelts.join('\n '));
    console.log('Stored Pelts\n', storedPelts.join('\n '));
  },
  false,
);

RegisterCommand(
  'pelts2',
  async (source: number, args: string[]) => {
    // Get PLAYER inventory, not horse
    const playerPed = PlayerPedId();
    const inventoryId = InventoryGetInventoryIdFromPed(playerPed);
    console.log('Inventory ID:', inventoryId); // Should be 1-5

    // Create filter struct (18 fields × 8 bytes = 144 bytes)
    const filterStruct = new DataView(new ArrayBuffer(18 * 8));
    for (let f = 0; f < 18; f++) {
      filterStruct.setBigInt64(f * 8, BigInt(-1), true); // 64-bit, little endian
    }

    const [collectionHandle, itemCount] = Citizen.invokeNative<[number, number]>(
      '0x640F890C3E5A3FFD',
      inventoryId,
      filterStruct,
      Citizen.pointerValueInt(),
      Citizen.returnResultAnyway(),
      Citizen.resultAsInteger(),
    );

    console.log('Collection Handle:', collectionHandle);
    console.log('Item Count:', itemCount);
    if (collectionHandle === -1) return;

    const pelts: number[] = [];

    for (let i = 0; i < itemCount; i++) {
      // Item struct (use struct<29> = 232 bytes for full data)
      const itemStruct = new DataView(new ArrayBuffer(29 * 8));
      itemStruct.setInt32(9 * 8, GetHashKey('SLOTID_NONE'), true);

      InventoryGetItemFromCollectionIndex(collectionHandle, i, itemStruct);

      // Field 4 (offset 32) contains the item hash
      const itemHash = itemStruct.getInt32(4 * 8, true);

      // Check if it's a pelt
      const isPelt = InventoryGetInventoryItemIsAnimalPelt(itemHash);
      if (isPelt) {
        pelts.push(itemHash);
        console.log(`Pelt found: ${itemHash} (0x${(itemHash >>> 0).toString(16).toUpperCase()})`);
      }
    }

    // ALWAYS release collection
    InventoryReleaseItemCollection(collectionHandle);

    console.log('Total pelts:', pelts.length, pelts);
  },
  false,
);

async function exploreInventoryTree(inventoryId: number, itemStruct: DataView, depth = 0) {
  const indent = '  '.repeat(depth);
  const slotId = itemStruct.getInt32(9 * 8, true);
  const itemHash = itemStruct.getInt32(4 * 8, true);
  const slotName = SLOT_IDS[slotId] || `0x${(slotId >>> 0).toString(16)}`;

  const isPelt = InventoryGetInventoryItemIsAnimalPelt(itemHash);
  const peltMarker = isPelt ? ' ★ PELT!' : '';

  console.log(`${indent}Slot: ${slotName}, Hash: 0x${(itemHash >>> 0).toString(16)}${peltMarker}`);

  const childCount = InventoryGetChildrenCount(inventoryId, itemStruct);

  if (childCount > 0) {
    console.log(`${indent}  Children: ${childCount}`);

    for (let c = 0; c < childCount; c++) {
      const childStruct = new DataView(new ArrayBuffer(14 * 8));
      childStruct.setInt32(9 * 8, GetHashKey('SLOTID_NONE'), true);

      const success = InventoryGetInventoryItemChild(inventoryId, itemStruct, c, childStruct);
      if (success) {
        await exploreInventoryTree(inventoryId, childStruct, depth + 1);
      }
    }
  }
}

// GetCarriedPeltSkins
const HASH_NAMES = [
  'WEAPON_UNARMED',
  'WEAPON_HORSE',
  'CHARACTER',
  'HORSE',
  'MOUNT',
  'WARDROBE',
  'KIT',
  'KIT_CAMP_WILDERNESS',
  'KIT_CAMP',
  'KIT_MOONSHINER_PROPERTY',
];
const HASHES: Record<number, string> = {};
for (const name of HASH_NAMES) {
  const hash = GetHashKey(name);
  HASHES[hash] = name;
}
RegisterCommand(
  'pelts3',
  async (source: number, args: any[], rawCommand: string) => {
    // console.log({ source, args, rawCommand });
    const horse = Number(GetMountOwnedByPlayer(PlayerId())) || 0;
    console.log('Horse Entity:', horse);
    if (!horse) return;

    /**/
    const peltStruct = new DataView(new ArrayBuffer(48));
    GetCarriedPeltSkins(horse, peltStruct);
    for (let n = 0; n < 3; n++) {
      console.log(n * 16, peltStruct.getInt32(n * 16));
      console.log(n * 16 + 4, peltStruct.getInt32(n * 16 + 4));
      console.log(n * 16 + 8, peltStruct.getInt32(n * 16 + 8));
      console.log(n * 16 + 12, peltStruct.getInt32(n * 16 + 12));
    }
    /**/

    const pelts = [];
    let n = 0;
    while (true) {
      const pelt = GetPeltFromHorse(horse, n);
      if (pelt === 0) break;
      let peltName = PROVISION_HASHES[pelt] || '';
      console.log(`Pelt ${n}:`, peltName || pelt);
      pelts.push(pelt);
      n++;
      if (n > 5) break;
    }
    console.log('Pelts found:', pelts);

    // 1 | 5 |6
    // const inventoryId = 1;
    const inventoryId = InventoryGetInventoryIdFromPed(horse);
    console.log('Inventory ID:', inventoryId);
    const struct = new DataView(new ArrayBuffer(18 * 8));
    for (let f = 0; f < 18; f++) {
      struct.setBigInt64(f * 8, BigInt(-1), true);
      // struct.setInt32(f * 4, -1, true);
    }
    const [collectionHandle, itemCount] = Citizen.invokeNative<[number, number]>(
      // const collectionHandle = Citizen.invokeNative<number>(
      '0x640F890C3E5A3FFD',
      inventoryId,
      struct,
      Citizen.pointerValueInt(),
      Citizen.returnResultAnyway(),
      Citizen.resultAsInteger(),
    );
    console.log('Collection Handle:', collectionHandle);
    console.log('Item Count:', itemCount);
    if (collectionHandle === -1) return;

    for (let i = 0; i < itemCount; i++) {
      const itemStruct = new DataView(new ArrayBuffer(14 * 8));
      itemStruct.setInt32(9 * 8, GetHashKey('SLOTID_NONE'), true);
      InventoryGetItemFromCollectionIndex(collectionHandle, i, itemStruct);
      const ints = [];
      for (let n = 0; n < 14; n++) {
        ints.push(itemStruct.getInt32(n * 8, true));
        ints.push(itemStruct.getInt32(n * 8 + 4, true));
      }
      const slotId = itemStruct.getInt32(9 * 8, true);
      for (const int of ints) {
        const isPelt = InventoryGetInventoryItemIsAnimalPelt(int);
        if (isPelt) {
          console.log('Is Pelt:', isPelt);
          console.log('Is Pelt:', isPelt);
          console.log('Is Pelt:', isPelt);
          console.log('Is Pelt:', isPelt);
        }
      }
      console.log(`Item ${i}`, SLOT_IDS[slotId] || '');
      console.log(
        ints
          .map((int, i) => (int === 0 ? false : `${i}: ${HASHES[int] || `${int} 0x${(int >>> 0).toString(16)}`}`))
          .filter(Boolean)
          .join('\n'),
      );

      try {
        /*
        for (let i = 0; i < itemCount; i++) {
          const itemStruct = new DataView(new ArrayBuffer(14 * 8));
          itemStruct.setInt32(9 * 8, GetHashKey('SLOTID_NONE'), true);
          InventoryGetItemFromCollectionIndex(collectionHandle, i, itemStruct);

          console.log(`\n=== ROOT ITEM ${i} ===`);
          await exploreInventoryTree(inventoryId, itemStruct, 0);
        }*/
        const childCOunt = InventoryGetChildrenCount(inventoryId, itemStruct);
        console.log(`Child count`, childCOunt);

        for (let c = 0; c < childCOunt; c++) {
          const childStruct = new DataView(new ArrayBuffer(14 * 8));
          const gotChild = Boolean(InventoryGetInventoryItemChild(inventoryId, itemStruct, c, childStruct));
          console.log(`| Got child ${c}:`, gotChild);

          const childInts = [];
          for (let n = 0; n < 14; n++) {
            childInts.push(childStruct.getInt32(n * 8, true));
            childInts.push(childStruct.getInt32(n * 8 + 4, true));
          }
          console.log(`| Child Item ${c}`);
          console.log(
            '| ',
            childInts
              .map((int, i) => (int === 0 ? false : `${i}: ${HASHES[int] || `${int} 0x${(int >>> 0).toString(16)}`}`))
              .filter(Boolean)
              .join('\n| '),
          );
          console.log('|________________________');
        }
      } catch (e) {}

      try {
        const itemStruct2 = new DataView(new ArrayBuffer(29 * 4));
        InventoryGetFullInventoryItemData(inventoryId, itemStruct, itemStruct2, 29, 1);

        const ints2 = [];
        for (let n = 0; n < 29; n++) {
          ints2.push(itemStruct2.getUint8(n));
        }
        console.log(`Item2 ${i}`);
        console.log(ints2);
      } catch (e) {}
      console.log('----------------');
    }

    InventoryReleaseItemCollection(collectionHandle);
  },
  false,
);

RegisterCommand(
  'create_pelt',
  async (source: number, args: any[], rawCommand: string) => {
    // console.log({ source, args, rawCommand });

    // PROVISION_FOX_FUR_POOR
    // P_CS_PELT_MEDLARGE
    // CARRIABLE_ANIMAL_SKIN_ML

    // CARRIABLE_ANIMAL_SKIN_ML
    // CARRIABLE_ANIMAL_SKIN_L
    const carryConfig = 'CARRIABLE_ANIMAL_SKIN_ML';
    // P_CS_PELT_MED_MUSKRAT
    // P_CS_PELT_MEDLARGE
    // P_CS_PELT_LARGE
    // P_CS_PELT_XLARGE_BUFFALO
    const peltModel = 'P_CS_PELT_MEDLARGE';
    const peltDetails = 'PROVISION_FOX_FUR_POOR'; //PROVISION[Math.floor(Math.random() * PROVISION.length)];
    console.log('Pelt details:', peltDetails);

    const coords = PVGame.playerCoords();
    coords.x += 2;

    const object = await PVGame.createObject(peltModel, coords);
    if (!object) {
      return;
    }
    TaskCarriable(object, carryConfig, 0, 0, 0);
    SetEntityCarcassType(object, peltDetails);
    TaskPickupCarriableEntity(PlayerPedId(), object);

    console.log('Pelt', object);
  },
  false,
);

RegisterCommand(
  'inv',
  async (source: number, args: any[], rawCommand: string) => {
    // console.log({ source, args, rawCommand });

    const invId = InventoryGetInventoryIdFromPed(Number(args[0])) >>> 0;
    console.log('invId', invId);

    const struct = new DataView(new ArrayBuffer(29));
    const struct2 = new DataView(new ArrayBuffer(29));
    InventoryGetFullInventoryItemData(invId, struct, struct2, 29, 1);
    const ints = [];
    const ints2 = [];
    for (let n = 0; n < 29; n++) {
      ints.push(struct.getUint8(n));
      ints2.push(struct2.getUint8(n));
    }
    console.log('struct', ints);
    console.log('struct2', ints2);
  },
  false,
);

RegisterCommand(
  'create_pelt_2',
  async (source: number, args: any[], rawCommand: string) => {
    // Mapping of provision hashes to their animal rig hashes
    const PELT_RIG_MAP: Record<string, string> = {
      PROVISION_FOX_FUR: 'A_C_FOX_01',
      PROVISION_FOX_FUR_POOR: 'A_C_FOX_01',
      PROVISION_FOX_FUR_PRISTINE: 'A_C_FOX_01',
      PROVISION_WOLF_FUR: 'A_C_WOLF',
      PROVISION_WOLF_FUR_POOR: 'A_C_WOLF',
      PROVISION_WOLF_FUR_PRISTINE: 'A_C_WOLF',
      PROVISION_COYOTE_FUR: 'A_C_COYOTE_01',
      PROVISION_DEER_FUR: 'A_C_DEER_01',
      PROVISION_BUCK_SKIN: 'A_C_BUCK_01',
      // Add more mappings as needed
    };

    const carryConfig = 'CARRIABLE_ANIMAL_SKIN_ML';
    const peltModel = 'P_CS_PELT_MEDLARGE';
    const peltDetails = 'PROVISION_FOX_FUR_POOR';

    console.log('Pelt details:', peltDetails);

    const coords = PVGame.playerCoords();
    coords.x += 2;

    const object = await PVGame.createObject(peltModel, coords);
    if (!object) {
      return;
    }

    // Set up carriable
    TaskCarriable(object, GetHashKey(carryConfig), 0, 0, 0);
    SetEntityCarcassType(object, GetHashKey(peltDetails));

    /*
    a_c_bighornram_01_head_000_c0_000_ab
    a_c_bighornram_01_head_000_c0_001_ab
    a_c_bighornram_01_head_000_c0_002_ab
    a_c_bighornram_01_head_000_c0_003_ab
    a_c_bighornram_01_head_000_c0_004_ab
     */
    const txdAlbedoAnimal = 'a_c_boar_01_head_000_c0_000_ab';
    if (txdAlbedoAnimal) {
      const rigHash = GetHashKey(txdAlbedoAnimal);

      // Get PELT TXDs from Animal Albedo
      const txdAlbedoDV = new DataView(new ArrayBuffer(16));
      const txdNormalMapDV = new DataView(new ArrayBuffer(16));
      const txdMaterialDV = new DataView(new ArrayBuffer(16));
      const success = Citizen.invokeNative<boolean>(
        '0x5744562E973E33CD', // Get PELT TXDs from Animal Albedo
        rigHash,
        txdAlbedoDV,
        txdNormalMapDV,
        txdMaterialDV,
        0,
        Citizen.resultAsInteger(),
      );

      if (success) {
        const txdAlbedo = txdAlbedoDV.getInt32(0, true); // pelt_large_panther_000_c0_000_ab
        const txdNormalMap = txdNormalMapDV.getInt32(0, true); // pelt_large_panther_000_c0_000_nm
        const txdMaterial = txdMaterialDV.getInt32(0, true); // pelt_large_panther_000_c0_000_m

        console.log('TXD hashes:', txdAlbedo, txdNormalMap, txdMaterial);

        // if (txdAlbedo) RequestStreamedTxd(txdAlbedo, false);
        // if (txdNormalMap) RequestStreamedTxd(txdNormalMap, false);
        // if (txdMaterial) RequestStreamedTxd(txdMaterial, false);

        // Wait for textures to load
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Apply texture to pelt object
        Citizen.invokeNative(
          '0xdd03fc2089ad093c', // Apply pelt texture
          object,
          GetHashKey(peltDetails),
          rigHash,
          0,
        );

        console.log('Applied texture from rig:', txdAlbedoAnimal);
      } else {
        console.log('Failed to get TXD from rig:', txdAlbedoAnimal);
      }
    }

    // Pick up the pelt
    TaskPickupCarriableEntity(PlayerPedId(), object);

    console.log('Pelt created:', object);
  },
  false,
);

/**
 0xAF72EC7E1B54539B | PED_LAST_DAMAGE

-147944023 a_c_panther_01_uppr_000_c0_000_ab
802857313 a_c_panther_01_uppr_000_c0_001_ab
-351729966 a_c_panther_01_uppr_000_c0_002_ab
-945357109 a_c_panther_01_uppr_001_c0_000_ab
-334858322 mp_a_c_panther_01_uppr_000_c0_000_ab
2103307444 mp_a_c_panther_01_uppr_000_c0_001_ab
1034437441 mp_a_c_panther_01_uppr_000_c0_002_ab

guids[3] 1 -1086745047 -418884932 -1786886727 1328850526
guids[2] 1 -1451760263 1839491432 -408457871 1067479952
guids[1] 1 -873154355 -147944023 -1326836115 -1519871318
guids[0] 1 -283697558 66160022 -212120206 257455351


 */

RegisterCommand(
  'applyMetaPedOutfit',
  async (source: number, args: any[], rawCommand: string) => {
    // console.log({ source, args, rawCommand });
    const entity = Number(args[0]);
    const outfitHash = Number(args[1]) == args[1] ? Number(args[1]) : GetHashKey(args[1]);
    const model = GetEntityModel(entity);

    console.log('Entity:', entity);
    console.log('Outfit Hash:', outfitHash);
    console.log('Model Hash:', model);

    if (!DoesMetaPedOutfitExistForPedModel(outfitHash, model)) return;

    const requestId = RequestMetaPedOutfit(model, outfitHash);
    if (!requestId) return;

    await new Promise<void>((resolve) => {
      if (HasMetaPedOutfitLoaded(requestId)) {
        resolve();
      } else {
        const modelLoadedCheck = setInterval(() => {
          if (HasMetaPedOutfitLoaded(requestId)) {
            resolve();
            clearInterval(modelLoadedCheck);
            ('meta_animal_outfit_buck_001');
          }
        }, 250);
      }
    });

    console.log('requestId', requestId);

    ApplyPedMetaPedOutfit(requestId, entity, true, false);
    ReleaseMetaPedOutfitRequest(requestId);
  },
  false,
);

RegisterCommand(
  'setSkinned',
  async (source: number, args: any[], rawCommand: string) => {
    // console.log({ source, args, rawCommand });
    const entity = Number(args[0]);
    const model = GetEntityModel(entity);

    const outfit = GetPedMetaOutfitHash(entity);

    const fieldDressings: [number, boolean][] = [
      // [0xf9b4df25, false],
      // [0xe364a979, false],
      [GetHashKey('META_OUTFIT_FIELD_DRESSING_002'), false],
      [GetHashKey('META_OUTFIT_FIELD_DRESSING_001'), false],
      [GetHashKey('META_OUTFIT_FIELD_DRESSING_000'), true],
    ];

    for (const [fieldDressing, skipCheck] of fieldDressings) {
      if (skipCheck || DoesMetaPedSuboutfitExistForPedModel(outfit, fieldDressing, model)) {
        console.log(`Equipping suboutfit ${fieldDressing}`);
        EquipMetaPedSuboutfit(entity, fieldDressing, 0);
        UpdatePedVariation(entity, false, true, true, true, false);
        break;
      }
    }
    UpdatePedVariation(entity, false, true, true, true, false);

    SetLootingFlag(entity, 0, false);
    SetEntityFullyLooted(entity, true);
  },
  false,
);

// NOTE: Turns it into a buck PED::_0xA274F51EF7E34B95(entity, 0)
// NOTE: But examples are PED::_0xA274F51EF7E34B95(iParam0, "HORSE_PREVIEW_OUTFIT" | "FREEROAM_OUTFIT" | "ADVERSARIAL_OUTFIT" | "GAME_MODE_OUTFIT" | "GANG_THEME_OUTFIT");

RegisterCommand(
  'outfitsTest',
  async (source: number, args: any[], rawCommand: string) => {
    // console.log({ source, args, rawCommand });

    const entity = Number(args[0]);
    const model = GetEntityModel(entity);

    const outfitCount = GetNumMetaPedOutfits(entity);

    console.log(`Entity ${entity} has ${outfitCount} meta outfits:`);
    for (let i = 0; i < outfitCount; i++) {
      const outfitHash = Citizen.invokeNative<number>('0x62FDF4E678E40CC6', entity, i);
      const hasFieldDressing = DoesMetaPedSuboutfitExistForPedModel(
        outfitHash,
        GetHashKey('META_OUTFIT_FIELD_DRESSING_002'), // META_OUTFIT_FIELD_DRESSING_001 | META_OUTFIT_FIELD_DRESSING_000
        model,
      );
      if (!outfitHash) continue;
      console.log(
        `Outfit ${i}:`,
        outfitHash,
        // outfitHash ? DoesMetaPedOutfitExistForPedModel(outfitHash, model) : '',
        hasFieldDressing ? 'Has Field Dressing Suboutfit' : '',
      );
      await PVGame.equipMetaPedOutfit(entity, outfitHash);
      await PVGame.pedIsReadyToRender(entity);
      PVGame.finalizePedOutfit(entity);

      await Delay(2_500);
    }
    console.log('Done testing outfits');
  },
  false,
);

/**
 * Set the pelt of the animal to the back of the horse EXAMPLE:
 * local mount = GetMountOwnedByPlayer(PlayerId())
 * Citizen.InvokeNative(0xC412AA1C73111FE0, mount, `PROVISION_DEER_HIDE_POOR`, `a_c_deer_01_uppr_000_c0_001_ab`, 0, 0)
 */

RegisterCommand(
  'attached_info',
  async (source: number, args: any[], rawCommand: string) => {
    // console.log({ source, args, rawCommand });
    const ped = Number(args[0]);

    for (let n = 0; n < 10; n++) {
      const data = new DataView(new ArrayBuffer(32));
      const result = GetCarriedAttachedInfoForSlot(data, ped, n, 0);

      if (result) {
        console.log('--- Slot', n, '---');
        const model = data.getInt32(0, true);
        const carryConfig = data.getInt32(8, true);
        const carriableSlot = data.getInt32(16, true);
        const entityCarried = data.getInt32(24, true);

        console.log('Model:', model);
        console.log('Carry Config:', carryConfig);
        console.log('Carriable Slot:', carriableSlot);
        console.log('Entity Carried:', entityCarried);
      }
    }
  },
  false,
);

RegisterCommand(
  'test_pos',
  async (source: number, args: any[], rawCommand: string) => {
    // console.log({ source, args, rawCommand });
    const player = PlayerPedId();
    const horse = 259074;

    const horseHeading = GetEntityHeading(horse);

    const playerPosition = Vector3.fromObject(PVGame.playerCoords(true));
    // const offset = Vector3.fromArray(
    //   GetOffsetFromEntityInWorldCoords(horse, playerPosition.x, playerPosition.y, playerPosition.z),
    // );
    const left = Vector3.fromArray(GetOffsetFromEntityInWorldCoords(horse, -0.65, -0.5, 0));
    const right = Vector3.fromArray(GetOffsetFromEntityInWorldCoords(horse, 0.65, -0.5, 0));

    // console.log(offset);

    const leftDistance = playerPosition.getDistance(left);
    const rightDistance = playerPosition.getDistance(right);

    if (leftDistance < rightDistance) {
      TaskGoToCoordAnyMeans(player, left.x, left.y, left.z, 1.5, 0, false, 0, 0);
      await PVGame.reachedCoords(left, 1.0, 5_000);
      SetPedDesiredHeading(player, horseHeading - 90);
    } else {
      TaskGoToCoordAnyMeans(player, right.x, right.y, right.z, 1.5, 0, false, 0, 0);
      await PVGame.reachedCoords(right, 1.0, 5_000);
      SetPedDesiredHeading(player, horseHeading + 90);
    }
  },
  false,
);
