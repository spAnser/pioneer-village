/**
 * COMPENDIUM_ANIMAL_GET_SAMPLE_INVENTORY_ITEM
 *
 * @param {number} compendiumEntry
 * @return {any}
 */
declare function CompendiumAnimalGetSampleInventoryItem(compendiumEntry: number): any;

/**
 * COMPENDIUM_ANIMAL_HAS_SAMPLE
 *
 * @param {number} compendiumEntry
 * @return {boolean}
 */
declare function CompendiumAnimalHasSample(compendiumEntry: number): boolean;

/**
 * COMPENDIUM_ANIMAL_HAS_STAMP
 *
 * @param {number} compendiumEntry
 * @return {boolean}
 */
declare function CompendiumAnimalHasStamp(compendiumEntry: number): boolean;

/**
 * COMPENDIUM_ANIMAL_OBSERVED_BY_STAT_NAME
 *
 * @param {number} animalType
 * @param {boolean} disableCompendiumToast
 * @return {void}
 */
declare function CompendiumAnimalObservedByStatName(animalType: Hash, disableCompendiumToast: boolean): void;

/**
 * COMPENDIUM_ANIMAL_SET_DISCOVERED
 *
 * @param {number} compendiumEntry
 * @return {void}
 */
declare function CompendiumAnimalSetDiscovered(compendiumEntry: number): void;

/**
 * COMPENDIUM_FISH_CAUGHT
 *
 * @param {number} ped
 * @param {number} category
 * @return {void}
 */
declare function CompendiumFishCaught(ped: Ped, category: Hash): void;

/**
 * COMPENDIUM_FISH_GET_LURE_SUITABILITY_BY_STAT_ITEM
 *
 * @param {number} animalType
 * @param {number} baitType
 * @return {number}
 */
declare function CompendiumFishGetLureSuitabilityByStatItem(animalType: Hash, baitType: Hash): number;

/**
 * COMPENDIUM_GANG_AMBUSH_SURVIVED
 *
 * @param {any} p0
 * @return {void}
 */
declare function CompendiumGangAmbushSurvived(p0: any): void;

/**
 * COMPENDIUM_GANG_BOUNTY_CAPTURED
 *
 * @param {any} p0
 * @return {void}
 */
declare function CompendiumGangBountyCaptured(p0: any): void;

/**
 * COMPENDIUM_GANG_CAMP_FOUND
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function CompendiumGangCampFound(p0: any, p1: any): void;

/**
 * COMPENDIUM_GANG_ENCOUNTERED
 *
 * @param {any} p0
 * @return {void}
 */
declare function CompendiumGangEncountered(p0: any): void;

/**
 * COMPENDIUM_GANG_HIDEOUT_FOUND
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function CompendiumGangHideoutFound(p0: any, p1: any): void;

/**
 * COMPENDIUM_GANG_MEMBER_KILLED
 *
 * @param {any} p0
 * @return {void}
 */
declare function CompendiumGangMemberKilled(p0: any): void;

/**
 * COMPENDIUM_GET_ENTRY_BY_INDEX_IN_SUBCATEGORY
 *
 * @param {number} category
 * @param {number} subcategory
 * @param {number} count
 * @return {number}
 */
declare function CompendiumGetEntryByIndexInSubcategory(category: Hash, subcategory: Hash, count: number): number;

/**
 * COMPENDIUM_GET_ENTRY_BY_PED_INDEX
 *
 * @param {number} category
 * @param {number} ped
 * @return {number}
 */
declare function CompendiumGetEntryByPedIndex(category: Hash, ped: Ped): number;

/**
 * COMPENDIUM_GET_ENTRY_BY_STAT_ITEM
 *
 * @param {number} category
 * @param {number} animalType
 * @return {number}
 */
declare function CompendiumGetEntryByStatItem(category: Hash, animalType: Hash): number;

/**
 * COMPENDIUM_GET_MAP_DISCOVERABLE_FROM_STAT_ITEM
 *
 * @param {number} animalStatItem
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {number}
 */
declare function CompendiumGetMapDiscoverableFromStatItem(animalStatItem: Hash, x: number, y: number, z: number): number;

/**
 * COMPENDIUM_GET_NUM_ENTRIES_IN_SUBCATEGORY
 *
 * @param {number} category
 * @param {number} subcategory
 * @return {number}
 */
declare function CompendiumGetNumEntriesInSubcategory(category: Hash, subcategory: Hash): number;

/**
 * COMPENDIUM_GET_SHORT_DESCRIPTION_FROM_PED
 *
 * @param {number} ped
 * @return {number}
 */
declare function CompendiumGetShortDescriptionFromPed(ped: Ped): number;

/**
 * COMPENDIUM_GET_STUDY_AWARD_ID
 *
 * @param {number} ped
 * @return {any}
 */
declare function CompendiumGetStudyAwardId(ped: Ped): any;

/**
 * COMPENDIUM_GET_SUBCATEGORY_PED_IS_IN
 *
 * @param {number} category
 * @param {number} ped
 * @return {number}
 */
declare function CompendiumGetSubcategoryPedIsIn(category: Hash, ped: Ped): number;

/**
 * COMPENDIUM_GET_SUBCATEGORY_SAMPLE_TOAST_DESC_COMPLETE
 *
 * @param {number} category
 * @param {number} subcategory
 * @return {string | number}
 */
declare function CompendiumGetSubcategorySampleToastDescComplete(category: Hash, subcategory: Hash): string | number;

/**
 * COMPENDIUM_GET_SUBCATEGORY_SAMPLE_TOAST_DESC_PROGRESS
 *
 * @param {number} category
 * @param {number} subcategory
 * @return {string | number}
 */
declare function CompendiumGetSubcategorySampleToastDescProgress(category: Hash, subcategory: Hash): string | number;

/**
 * COMPENDIUM_GET_SUBCATEGORY_SAMPLE_TOAST_TITLE
 *
 * @param {number} category
 * @param {number} subcategory
 * @return {string | number}
 */
declare function CompendiumGetSubcategorySampleToastTitle(category: Hash, subcategory: Hash): string | number;

/**
 * COMPENDIUM_GET_SUBCATEGORY_TOAST_APP_ID
 *
 * @param {number} category
 * @param {number} subcategory
 * @return {any}
 */
declare function CompendiumGetSubcategoryToastAppId(category: Hash, subcategory: Hash): any;

/**
 * COMPENDIUM_HERB_PICKED
 * herbType: https://alloc8or.re/rdr3/doc/enums/eHerbType.txt
 * Vector3: Player Location
 *
 * @param {number} herbType
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {void}
 */
declare function CompendiumHerbPicked(herbType: Hash, x: number, y: number, z: number): void;

/**
 * COMPENDIUM_HORSE_BONDING
 *
 * @param {number} ped
 * @param {number} bondingLevel
 * @return {void}
 */
declare function CompendiumHorseBonding(ped: Ped, bondingLevel: number): void;

/**
 * COMPENDIUM_HORSE_OBSERVED
 * Only gets called if bSetObserved is true and animalType is matching
 *
 * @param {number} ped
 * @param {boolean} disableCompendiumToast
 * @return {void}
 */
declare function CompendiumHorseObserved(ped: Ped, disableCompendiumToast: boolean): void;

/**
 * COMPENDIUM_HORSE_WILD_BROKEN
 * NET_PLAYER_HORSE_PROCESS_EVENT_HORSE_BREAKING
 *
 * @param {number} ped
 * @return {void}
 */
declare function CompendiumHorseWildBroken(ped: Ped): void;

/**
 * COMPENDIUM_WAS_ANIMAL_OBSERVED
 *
 * @param {number} ped
 * @return {boolean}
 */
declare function CompendiumWasAnimalObserved(ped: Ped): boolean;

/**
 * _0x725D52F21A5E9E22
 * Only used in R* SP Scripts, category = GANGS
 * _COMPENDIUM_GET_*
 *
 * @param {number} category
 * @return {number}
 */
declare function N_0x725D52F21A5E9E22(category: Hash): number;

/**
 * _0x729D52461AEA9E22
 * Only used in R* SP Scripts, category = GANGS
 * _COMPENDIUM_GET_NUM_OF_ENTRIES_IN_*
 *
 * @param {number} category
 * @return {number}
 */
declare function N_0x729D52461AEA9E22(category: Hash): number;

/**
 * _COMPENDIUM_GET_NUM_OF_ENTRIES_IN_CATEGORY
 *
 * @param {number} category
 * @return {number}
 */
declare function CompendiumGetNumOfEntriesInCategory(category: Hash): number;

/**
 * _COMPENDIUM_GET_SUBCATEGORY_HASH_FROM_ANIMAL_TYPE
 *
 * @param {number} category
 * @param {number} animalType
 * @return {number}
 */
declare function CompendiumGetSubcategoryHashFromAnimalType(category: Hash, animalType: Hash): number;