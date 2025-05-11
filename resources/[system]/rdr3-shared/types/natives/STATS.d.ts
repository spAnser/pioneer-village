/**
   * CHAL_ACHIEVEMENT_GET_PROGRESS_INT
   *
   * @param {number} p0
   * @param {number} p1
   * @return {number}
   */
declare function ChalAchievementGetProgressInt(p0: Hash, p1: Hash): number;

/**
   * CHAL_ACHIEVEMENT_IS_COMPLETE
   *
   * @param {number} p0
   * @param {number} p1
   * @return {boolean}
   */
declare function ChalAchievementIsComplete(p0: Hash, p1: Hash): boolean;

/**
   * CHAL_ADD_GOAL_PROGRESS_FLOAT
   *
   * @param {number} chalHash
   * @param {number} goalHash
   * @param {number} value
   * @return {void}
   */
declare function ChalAddGoalProgressFloat(chalHash: Hash, goalHash: Hash, value: number): void;

/**
   * CHAL_ADD_GOAL_PROGRESS_FLOAT_BY_SCORE_ID
   *
   * @param {number} p0
   * @param {number} value
   * @return {void}
   */
declare function ChalAddGoalProgressFloatByScoreId(p0: Hash, value: number): void;

/**
   * CHAL_ADD_GOAL_PROGRESS_INT
   *
   * @param {number} chalHash
   * @param {number} goalHash
   * @param {number} value
   * @return {void}
   */
declare function ChalAddGoalProgressInt(chalHash: Hash, goalHash: Hash, value: number): void;

/**
   * CHAL_ADD_GOAL_PROGRESS_INT_BY_SCORE_ID
   *
   * @param {number} p0
   * @param {number} value
   * @return {void}
   */
declare function ChalAddGoalProgressIntByScoreId(p0: Hash, value: number): void;

/**
   * CHAL_GET_MAX_RANKS
   *
   * @param {number} chalHash
   * @return {number}
   */
declare function ChalGetMaxRanks(chalHash: Hash): number;

/**
   * CHAL_GET_NUM_RANKS_COMPLETED
   *
   * @param {number} chalHash
   * @return {number}
   */
declare function ChalGetNumRanksCompleted(chalHash: Hash): number;

/**
   * CHAL_IS_GOAL_ACTIVE
   * https://github.com/femga/rdr3_discoveries/blob/master/AI/EVENTS/challenge_goals.lua
   *
   * @param {number} chalHash
   * @param {number} goalHash
   * @return {boolean}
   */
declare function ChalIsGoalActive(chalHash: Hash, goalHash: Hash): boolean;

/**
   * CHAL_MISSION_ADD_GOAL_PROGRESS_INT
   *
   * @param {number} missionHash
   * @param {number} goalHash
   * @param {number} value
   * @return {void}
   */
declare function ChalMissionAddGoalProgressInt(missionHash: Hash, goalHash: Hash, value: number): void;

/**
   * CHAL_MISSION_GET_NUM_GOALS
   *
   * @param {number} missionHash
   * @return {number}
   */
declare function ChalMissionGetNumGoals(missionHash: Hash): number;

/**
   * CHAL_MISSION_GET_NUM_GOALS_COMPLETE
   *
   * @param {number} missionHash
   * @return {number}
   */
declare function ChalMissionGetNumGoalsComplete(missionHash: Hash): number;

/**
   * CHAL_MISSION_IS_GOAL_COMPLETE
   *
   * @param {number} missionHash
   * @param {number} goalHash
   * @return {boolean}
   */
declare function ChalMissionIsGoalComplete(missionHash: Hash, goalHash: Hash): boolean;

/**
   * CHAL_NET_START_CHAL
   *
   * @param {number} chalHash
   * @return {void}
   */
declare function ChalNetStartChal(chalHash: Hash): void;

/**
   * CHAL_NET_START_GOAL
   *
   * @param {number} chalHash
   * @param {number} goalHash
   * @return {void}
   */
declare function ChalNetStartGoal(chalHash: Hash, goalHash: Hash): void;

/**
   * CHAL_NET_STOP_CHAL
   *
   * @param {number} chalHash
   * @return {void}
   */
declare function ChalNetStopChal(chalHash: Hash): void;

/**
   * CHAL_NET_STOP_GOAL
   *
   * @param {number} chalHash
   * @param {number} goalHash
   * @return {void}
   */
declare function ChalNetStopGoal(chalHash: Hash, goalHash: Hash): void;

/**
   * CHAL_SET_GOAL_DISABLED
   *
   * @param {number} chalHash
   * @param {number} goalHash
   * @param {boolean} disabled
   * @return {void}
   */
declare function ChalSetGoalDisabled(chalHash: Hash, goalHash: Hash, disabled: boolean): void;

/**
   * CHAL_SET_GOAL_PROGRESS_INT
   *
   * @param {number} chalHash
   * @param {number} goalHash
   * @param {number} value
   * @return {void}
   */
declare function ChalSetGoalProgressInt(chalHash: Hash, goalHash: Hash, value: number): void;

/**
   * STATSTRACKER_DEED_STARTED
   *
   * @param {number} p0
   * @param {any} p1
   * @return {void}
   */
declare function StatstrackerDeedStarted(p0: Hash, p1: any): void;

/**
   * STATSTRACKER_IS_INITIALIZED
   *
   * @param {number} p0
   * @return {boolean}
   */
declare function StatstrackerIsInitialized(p0: Hash): boolean;

/**
   * STAT_ADD_BOUNTY_TARGET
   *
   * @param {number} unlockHash
   * @param {number} ped
   * @return {void}
   */
declare function StatAddBountyTarget(unlockHash: Hash, ped: Ped): void;

/**
   * STAT_BOUNTY_CAPTURED
   *
   * @param {number} entity
   * @return {void}
   */
declare function StatBountyCaptured(entity: Entity): void;

/**
   * STAT_BOUNTY_ESCAPED
   *
   * @param {number} ped
   * @return {void}
   */
declare function StatBountyEscaped(ped: Ped): void;

/**
   * STAT_ID_GET_BOOL
   * statId: see STAT_ID_IS_VALID
   *
   * @param {DataView} statId
   * @return {[boolean, boolean]}
   */
declare function StatIdGetBool(statId: DataView): [boolean, boolean];

/**
   * STAT_ID_GET_DATE
   * statId: see STAT_ID_IS_VALID
   *
   * @param {DataView} statId
   * @param {DataView} date
   * @return {boolean}
   */
declare function StatIdGetDate(statId: DataView, date: DataView): boolean;

/**
   * STAT_ID_GET_FLOAT
   * statId: see STAT_ID_IS_VALID
   *
   * @param {DataView} statId
   * @return {[boolean, number]}
   */
declare function StatIdGetFloat(statId: DataView): [boolean, number];

/**
   * STAT_ID_GET_INT
   * statId: see STAT_ID_IS_VALID
   *
   * @param {DataView} statId
   * @return {[boolean, number]}
   */
declare function StatIdGetInt(statId: DataView): [boolean, number];

/**
   * STAT_ID_IS_VALID
   * struct StatId
   * {
   *   alignas(8) Hash BaseId;
   *   alignas(8) Hash PermutationId;
   * }
   *
   * @param {DataView} statId
   * @return {boolean}
   */
declare function StatIdIsValid(statId: DataView): boolean;

/**
   * STAT_ID_SET_BOOL
   * statId: see STAT_ID_IS_VALID
   *
   * @param {DataView} statId
   * @param {boolean} value
   * @param {boolean} p2
   * @return {boolean}
   */
declare function StatIdSetBool(statId: DataView, value: boolean, p2: boolean): boolean;

/**
   * STAT_ID_SET_DATE
   * statId: see STAT_ID_IS_VALID
   *
   * @param {DataView} statId
   * @param {DataView} date
   * @param {boolean} p2
   * @return {boolean}
   */
declare function StatIdSetDate(statId: DataView, date: DataView, p2: boolean): boolean;

/**
   * STAT_ID_SET_FLOAT
   * statId: see STAT_ID_IS_VALID
   *
   * @param {DataView} statId
   * @param {number} value
   * @param {boolean} p2
   * @return {boolean}
   */
declare function StatIdSetFloat(statId: DataView, value: number, p2: boolean): boolean;

/**
   * STAT_ID_SET_GXT_LABEL
   * statId: see STAT_ID_IS_VALID
   *
   * @param {DataView} statId
   * @param {string | number} label
   * @param {boolean} p2
   * @return {boolean}
   */
declare function StatIdSetGxtLabel(statId: DataView, label: string | number, p2: boolean): boolean;

/**
   * STAT_ID_SET_INT
   * statId: see STAT_ID_IS_VALID
   *
   * @param {DataView} statId
   * @param {number} value
   * @param {boolean} p2
   * @return {boolean}
   */
declare function StatIdSetInt(statId: DataView, value: number, p2: boolean): boolean;

/**
   * STAT_ID_SET_TO_POSSE_ID
   * statId: see STAT_ID_IS_VALID
   *
   * @param {DataView} statId
   * @return {void}
   */
declare function StatIdSetToPosseId(statId: DataView): void;

/**
   * STAT_PHOTOGRAPH_TAKEN
   *
   * @param {number} itemset
   * @return {void}
   */
declare function StatPhotographTaken(itemset: ItemSet): void;

/**
   * STAT_REGISTER_LEGENDARY_ANIMAL_DEED
   *
   * @param {number} deedHash
   * @return {void}
   */
declare function StatRegisterLegendaryAnimalDeed(deedHash: Hash): void;

/**
   * WEEKLY_COLLECTIBLE_GET_ITEM_IN_SET
   *
   * @param {number} chalHash
   * @param {number} setIndex
   * @param {number} itemIndex
   * @return {[boolean, number, number]}
   */
declare function WeeklyCollectibleGetItemInSet(chalHash: Hash, setIndex: number, itemIndex: number): [boolean, number, number];

/**
   * WEEKLY_COLLECTIBLE_GET_ITEM_SET_BUY_AWARD
   *
   * @param {number} chalHash
   * @param {number} index
   * @return {number}
   */
declare function WeeklyCollectibleGetItemSetBuyAward(chalHash: Hash, index: number): number;

/**
   * WEEKLY_COLLECTIBLE_GET_ITEM_SET_LABEL
   *
   * @param {number} chalHash
   * @param {number} index
   * @return {number}
   */
declare function WeeklyCollectibleGetItemSetLabel(chalHash: Hash, index: number): number;

/**
   * WEEKLY_COLLECTIBLE_GET_NUM_ITEMS_IN_SET
   *
   * @param {number} chalHash
   * @param {number} index
   * @return {number}
   */
declare function WeeklyCollectibleGetNumItemsInSet(chalHash: Hash, index: number): number;

/**
   * WEEKLY_COLLECTIBLE_GET_NUM_SETS
   *
   * @param {number} chalHash
   * @return {number}
   */
declare function WeeklyCollectibleGetNumSets(chalHash: Hash): number;

/**
   * _0x025E98E317652CDD
   *
   * @param {number} p0
   * @return {void}
   */
declare function N_0x025E98E317652CDD(p0: number): void;

/**
   * _0x0FEE2561120F3333
   * statId: see STAT_ID_IS_VALID
   *
   * @param {DataView} statId
   * @return {void}
   */
declare function N_0x0FEE2561120F3333(statId: DataView): void;

/**
   * _0x218F7710A139D012
   *
  
   * @return {void}
   */
declare function N_0x218F7710A139D012(): void;

/**
   * _0x302E71C1D9EE75B9
   * statId: see STAT_ID_IS_VALID
   *
   * @param {DataView} statId
   * @param {number} p1
   * @return {[boolean, number]}
   */
declare function N_0x302E71C1D9EE75B9(statId: DataView, p1: Hash): [boolean, number];

/**
   * _0x378D3B1B11D9385B
   *
   * @param {number} p0
   * @return {void}
   */
declare function N_0x378D3B1B11D9385B(p0: number): void;

/**
   * _0x3AEABAE3F3C7600C
   *
  
   * @return {boolean}
   */
declare function N_0x3AEABAE3F3C7600C(): boolean;

/**
   * _0x3EB2791A1FBC8A42
   *
   * @param {number} statItem
   * @param {number} p1
   * @return {void}
   */
declare function N_0x3EB2791A1FBC8A42(statItem: Hash, p1: number): void;

/**
   * _0x3F6FD87D2030ADC6
   *
  
   * @return {string | number}
   */
declare function N_0x3F6FD87D2030ADC6(): string | number;

/**
   * _0x4DAC398297981B87
   * Only used in R* SP Scripts
   *
   * @param {number} p0
   * @return {boolean}
   */
declare function N_0x4DAC398297981B87(p0: number): boolean;

/**
   * _0x4E463A3CDEFFFE96
   * Only used in R* Script net_char_creator
   *
  
   * @return {void}
   */
declare function N_0x4E463A3CDEFFFE96(): void;

/**
   * _0x4F2D5FA23DB992DE
   * Only used in R* Script net_char_creator
   *
  
   * @return {void}
   */
declare function N_0x4F2D5FA23DB992DE(): void;

/**
   * _0x4FCBCC0584CD08E9
   *
   * @param {number} p0
   * @return {void}
   */
declare function N_0x4FCBCC0584CD08E9(p0: Hash): void;

/**
   * _0x6123E2832C34243D
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {void}
   */
declare function N_0x6123E2832C34243D(p0: any, p1: any, p2: any, p3: any, p4: any): void;

/**
   * _0x8312F09C56149A8A
   * Only used in R* SP Scripts
   *
   * @param {number} animalType
   * @return {void}
   */
declare function N_0x8312F09C56149A8A(animalType: Hash): void;

/**
   * _0x8BA3D7B1E83EF803
   *
   * @param {number} p0
   * @return {number}
   */
declare function N_0x8BA3D7B1E83EF803(p0: Hash): number;

/**
   * _0x8C889E4CBB4B2356
   *
   * @param {any} p0
   * @param {number} ped
   * @return {void}
   */
declare function N_0x8C889E4CBB4B2356(p0: any, ped: Ped): void;

/**
   * _0x91A4F58E01ED5E4C
   * statId: see STAT_ID_IS_VALID
   *
   * @param {DataView} statId
   * @param {number} value
   * @return {void}
   */
declare function N_0x91A4F58E01ED5E4C(statId: DataView, value: number): void;

/**
   * _0x99230691875FC218
   *
   * @param {any} p0
   * @param {number} p1
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {void}
   */
declare function N_0x99230691875FC218(p0: any, p1: Hash, x: number, y: number, z: number): void;

/**
   * _0x9D0F5D2E1951CD84
   *
  
   * @return {number}
   */
declare function N_0x9D0F5D2E1951CD84(): number;

/**
   * _0xA2E2BEA4E83F6270
   *
   * @param {number} p0
   * @return {any}
   */
declare function N_0xA2E2BEA4E83F6270(p0: Hash): any;

/**
   * _0xA59590050F80FF2E
   * Only used in R* SP Scripts
   *
   * @param {any} p0
   * @param {boolean} p1
   * @param {boolean} p2
   * @param {boolean} p3
   * @return {void}
   */
declare function N_0xA59590050F80FF2E(p0: any, p1: boolean, p2: boolean, p3: boolean): void;

/**
   * _0xA596890CF55B5095
   *
   * @param {number} ped
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0xA596890CF55B5095(ped: Ped, p1: boolean): void;

/**
   * _0xB112B9262EC29C20
   *
   * @param {number} p0
   * @param {number} p1
   * @return {string | number}
   */
declare function N_0xB112B9262EC29C20(p0: Hash, p1: number): string | number;

/**
   * _0xB5E2EDA2135E0FA1
   *
   * @param {number} p0
   * @param {number} p1
   * @return {[boolean, number]}
   */
declare function N_0xB5E2EDA2135E0FA1(p0: Hash, p1: number): [boolean, number];

/**
   * _0xBE66B26B6529E943
   *
   * @param {number} unlockHash
   * @param {number} ped
   * @param {number} animalType
   * @return {void}
   */
declare function N_0xBE66B26B6529E943(unlockHash: Hash, ped: Ped, animalType: Hash): void;

/**
   * _0xCA1F0B5103936891
   *
   * @param {number} p0
   * @return {boolean}
   */
declare function N_0xCA1F0B5103936891(p0: Hash): boolean;

/**
   * _0xCA41E86545413B5B
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @return {void}
   */
declare function N_0xCA41E86545413B5B(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;

/**
   * _0xD64DBC8B0424135F
   *
   * @param {number} ped
   * @param {number} animalType
   * @return {void}
   */
declare function N_0xD64DBC8B0424135F(ped: Ped, animalType: Hash): void;

/**
   * _0xDA26263C07CCE9C2
   *
   * @param {number} p0
   * @return {void}
   */
declare function N_0xDA26263C07CCE9C2(p0: number): void;

/**
   * _0xDDBD560745B1EE98
   *
   * @param {number} chalHash
   * @param {number} goalHash
   * @param {number} player
   * @return {number}
   */
declare function N_0xDDBD560745B1EE98(chalHash: Hash, goalHash: Hash, player: Player): number;

/**
   * _0xDF95DF488A645CE7
   *
  
   * @return {void}
   */
declare function N_0xDF95DF488A645CE7(): void;

/**
   * _0xE141F6B40B1E3683
   * statId: see STAT_ID_IS_VALID
   * Only used in R* SP Scripts
   * _STAT_ID_SET_*
   *
   * @param {DataView} statId
   * @param {number} value
   * @return {void}
   */
declare function N_0xE141F6B40B1E3683(statId: DataView, value: number): void;

/**
   * _0xE5A680A5D8B1F687
   *
   * @param {number} p0
   * @return {void}
   */
declare function N_0xE5A680A5D8B1F687(p0: number): void;

/**
   * _0xF21A5D66874FCEDD
   *
   * @param {any} p0
   * @param {number} p1
   * @param {number} p2
   * @return {void}
   */
declare function N_0xF21A5D66874FCEDD(p0: any, p1: Hash, p2: Hash): void;

/**
   * _0xF2B5ABDE09958689
   *
   * @param {number} unlockHash
   * @param {number} ped1
   * @param {number} ped2
   * @return {void}
   */
declare function N_0xF2B5ABDE09958689(unlockHash: Hash, ped1: Ped, ped2: Ped): void;

/**
   * _0xF8181B5EF156862C
   *
   * @param {number} ped
   * @return {void}
   */
declare function N_0xF8181B5EF156862C(ped: Ped): void;

/**
   * _STATSTRACKER_DEED_STATUS
   *
   * @param {number} deedType
   * @param {number} deedHash
   * @param {number} missionStatus
   * @param {DataView} data
   * @return {void}
   */
declare function StatstrackerDeedStatus(deedType: number, deedHash: Hash, missionStatus: number, data: DataView): void;

/**
   * _STAT_ADD_ANIMAL_SAMPLE_TARGET
   * Related to animal tagging
   *
   * @param {number} animalType
   * @return {void}
   */
declare function StatAddAnimalSampleTarget(animalType: Hash): void;

/**
   * _STAT_CALCULATE_COOLDOWN
   * Calculation: (value / 1000) / 60 % 60
   *
   * @param {number} value
   * @return {number}
   */
declare function StatCalculateCooldown(value: number): number;

/**
   * _STAT_CARRIED_SATCHEL_ITEM_FROM_PED
   *
   * @param {number} ped
   * @return {void}
   */
declare function StatCarriedSatchelItemFromPed(ped: Ped): void;

/**
   * _STAT_DONATE_INCREMENT_ITEM
   *
   * @param {number} item
   * @param {number} slot
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function StatDonateIncrementItem(item: number, slot: number, p2: any, p3: any): void;

/**
   * _STAT_ID_DECREMENT_INT
   * statId: see STAT_ID_IS_VALID
   *
   * @param {DataView} statId
   * @param {number} value
   * @return {void}
   */
declare function StatIdDecrementInt(statId: DataView, value: number): void;

/**
   * _STAT_ID_INCREMENT_FLOAT
   * statId: see STAT_ID_IS_VALID
   *
   * @param {DataView} statId
   * @param {number} value
   * @return {void}
   */
declare function StatIdIncrementFloat(statId: DataView, value: number): void;

/**
   * _STAT_ID_INCREMENT_INT
   * statId: see STAT_ID_IS_VALID
   *
   * @param {DataView} statId
   * @param {number} value
   * @return {void}
   */
declare function StatIdIncrementInt(statId: DataView, value: number): void;

/**
   * _STAT_ITEM_FISH_CAUGHT
   *
   * @param {number} fish
   * @param {number} weight
   * @param {number} category
   * @param {number} subcategory
   * @return {void}
   */
declare function StatItemFishCaught(fish: Ped, weight: number, category: Hash, subcategory: Hash): void;

/**
   * _STAT_PHEROMONE_COOLDOWN_LEGENDARY_ANIMAL
   * statId: see STAT_ID_IS_VALID
   *
   * @param {number} entity
   * @param {DataView} statId
   * @return {boolean}
   */
declare function StatPheromoneCooldownLegendaryAnimal(entity: Entity, statId: DataView): boolean;