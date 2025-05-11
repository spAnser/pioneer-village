/**
   * ADD_ATTRIBUTE_POINTS
   * attributeIndex: see SET_ATTRIBUTE_BASE_RANK
   *
   * @param {number} ped
   * @param {number} attributeIndex
   * @param {number} p2
   * @return {void}
   */
declare function AddAttributePoints(ped: Ped, attributeIndex: number, p2: number): void;

/**
   * DISABLE_ATTRIBUTE_OVERPOWER
   * attributeIndex: see SET_ATTRIBUTE_BASE_RANK
   *
   * @param {number} ped
   * @param {number} attributeIndex
   * @return {void}
   */
declare function DisableAttributeOverpower(ped: Ped, attributeIndex: number): void;

/**
   * ENABLE_ATTRIBUTE_OVERPOWER
   * attributeIndex: see SET_ATTRIBUTE_BASE_RANK
   * 
   * Old name: _SET_ATTRIBUTE_OVERPOWER_VALUE
   *
   * @param {number} ped
   * @param {number} attributeIndex
   * @param {number} value
   * @param {boolean} makeSound
   * @return {void}
   */
declare function EnableAttributeOverpower(ped: Ped, attributeIndex: number, value: number, makeSound: boolean): void;

/**
   * GET_ATTRIBUTE_BASE_RANK
   * attributeIndex: see SET_ATTRIBUTE_BASE_RANK
   *
   * @param {number} ped
   * @param {number} attributeIndex
   * @return {number}
   */
declare function GetAttributeBaseRank(ped: Ped, attributeIndex: number): number;

/**
   * GET_ATTRIBUTE_BONUS_RANK
   * attributeIndex: see SET_ATTRIBUTE_BASE_RANK
   *
   * @param {number} ped
   * @param {number} coreIndex
   * @return {number}
   */
declare function GetAttributeBonusRank(ped: Ped, coreIndex: number): number;

/**
   * GET_ATTRIBUTE_POINTS
   * attributeIndex: see SET_ATTRIBUTE_BASE_RANK
   *
   * @param {number} ped
   * @param {number} attributeIndex
   * @return {number}
   */
declare function GetAttributePoints(ped: Ped, attributeIndex: number): number;

/**
   * GET_ATTRIBUTE_RANK
   * attributeIndex: see SET_ATTRIBUTE_BASE_RANK
   *
   * @param {number} ped
   * @param {number} attributeIndex
   * @return {number}
   */
declare function GetAttributeRank(ped: Ped, attributeIndex: number): number;

/**
   * GET_DEFAULT_ATTRIBUTE_POINTS_NEEDED_FOR_RANK
   * attributeIndex: see SET_ATTRIBUTE_BASE_RANK
   *
   * @param {number} modelHash
   * @param {number} attributeIndex
   * @param {number} rank
   * @return {number}
   */
declare function GetDefaultAttributePointsNeededForRank(modelHash: Hash, attributeIndex: number, rank: number): number;

/**
   * GET_DEFAULT_ATTRIBUTE_RANK
   * attributeIndex: see SET_ATTRIBUTE_BASE_RANK
   *
   * @param {number} ped
   * @param {number} attributeIndex
   * @return {number}
   */
declare function GetDefaultAttributeRank(ped: Ped, attributeIndex: number): number;

/**
   * GET_DEFAULT_MAX_ATTRIBUTE_RANK
   * attributeIndex: see SET_ATTRIBUTE_BASE_RANK
   *
   * @param {number} ped
   * @param {number} attributeIndex
   * @return {number}
   */
declare function GetDefaultMaxAttributeRank(ped: Ped, attributeIndex: number): number;

/**
   * GET_MAX_ATTRIBUTE_POINTS
   * attributeIndex: see SET_ATTRIBUTE_BASE_RANK
   *
   * @param {number} ped
   * @param {number} attributeIndex
   * @return {number}
   */
declare function GetMaxAttributePoints(ped: Ped, attributeIndex: number): number;

/**
   * GET_MAX_ATTRIBUTE_RANK
   * attributeIndex: see SET_ATTRIBUTE_BASE_RANK
   *
   * @param {number} ped
   * @param {number} attributeIndex
   * @return {number}
   */
declare function GetMaxAttributeRank(ped: Ped, attributeIndex: number): number;

/**
   * SET_ATTRIBUTE_BASE_RANK
   * attributeIndex:
   * enum ePedAttribute
   * {
   *   PA_HEALTH,
   *   PA_STAMINA,
   *   PA_SPECIALABILITY,
   *   PA_COURAGE,
   *   PA_AGILITY,
   *   PA_SPEED,
   *   PA_ACCELERATION,
   *   PA_BONDING,
   *   SA_HUNGER,
   *   SA_FATIGUED,
   *   SA_INEBRIATED,
   *   SA_POISONED,
   *   SA_BODYHEAT,
   *   SA_BODYWEIGHT,
   *   SA_OVERFED,
   *   SA_SICKNESS,
   *   SA_DIRTINESS,
   *   SA_DIRTINESSHAT,
   *   MTR_STRENGTH,
   *   MTR_GRIT,
   *   MTR_INSTINCT,
   *   PA_UNRULINESS,
   *   SA_DIRTINESSSKIN
   * };
   *
   * @param {number} ped
   * @param {number} attributeIndex
   * @param {number} newValue
   * @return {void}
   */
declare function SetAttributeBaseRank(ped: Ped, attributeIndex: number, newValue: number): void;

/**
   * SET_ATTRIBUTE_BONUS_RANK
   * attributeIndex: see SET_ATTRIBUTE_BASE_RANK
   *
   * @param {number} ped
   * @param {number} attributeIndex
   * @param {number} newValue
   * @return {void}
   */
declare function SetAttributeBonusRank(ped: Ped, attributeIndex: number, newValue: number): void;

/**
   * SET_ATTRIBUTE_POINTS
   * attributeIndex: see SET_ATTRIBUTE_BASE_RANK
   *
   * @param {number} ped
   * @param {number} attributeIndex
   * @param {number} p2
   * @return {void}
   */
declare function SetAttributePoints(ped: Ped, attributeIndex: number, p2: number): void;

/**
   * STOP_ITEM_PREVIEW
   *
  
   * @return {void}
   */
declare function StopItemPreview(): void;

/**
   * _ENABLE_ATTRIBUTE_CORE_OVERPOWER
   * coreIndex: see _SET_ATTRIBUTE_CORE_VALUE
   * 
   * Previously incorrectly named ENABLE_ATTRIBUTE_OVERPOWER
   *
   * @param {number} ped
   * @param {number} coreIndex
   * @param {number} value
   * @param {boolean} makeSound
   * @return {void}
   */
declare function EnableAttributeCoreOverpower(ped: Ped, coreIndex: number, value: number, makeSound: boolean): void;

/**
   * _GET_ATTRIBUTE_CORE_OVERPOWER_SECONDS_LEFT
   *
   * @param {number} ped
   * @param {number} coreIndex
   * @return {number}
   */
declare function GetAttributeCoreOverpowerSecondsLeft(ped: Ped, coreIndex: number): number;

/**
   * _GET_ATTRIBUTE_CORE_VALUE
   * Gets the ped's core value on a scale of 0 to 100.
   * coreIndex: see _SET_ATTRIBUTE_CORE_VALUE
   *
   * @param {number} ped
   * @param {number} coreIndex
   * @return {number}
   */
declare function GetAttributeCoreValue(ped: Ped, coreIndex: number): number;

/**
   * _GET_ATTRIBUTE_OVERPOWER_SECONDS_LEFT
   *
   * @param {number} ped
   * @param {number} attributeIndex
   * @return {number}
   */
declare function GetAttributeOverpowerSecondsLeft(ped: Ped, attributeIndex: number): number;

/**
   * _IS_ATTRIBUTE_CORE_OVERPOWERED
   *
   * @param {number} ped
   * @param {number} coreIndex
   * @return {boolean}
   */
declare function IsAttributeCoreOverpowered(ped: Ped, coreIndex: number): boolean;

/**
   * _IS_ATTRIBUTE_OVERPOWERED
   * attributeIndex: see SET_ATTRIBUTE_BASE_RANK
   *
   * @param {number} ped
   * @param {number} attributeIndex
   * @return {boolean}
   */
declare function IsAttributeOverpowered(ped: Ped, attributeIndex: number): boolean;

/**
   * _SET_ATTRIBUTE_CORE_VALUE
   * coreIndex:
   * enum eAttributeCore
   * {
   *   ATTRIBUTE_CORE_HEALTH,
   *   ATTRIBUTE_CORE_STAMINA,
   *   ATTRIBUTE_CORE_DEADEYE
   * };
   *
   * @param {number} ped
   * @param {number} coreIndex
   * @param {number} value
   * @return {void}
   */
declare function SetAttributeCoreValue(ped: Ped, coreIndex: number, value: number): void;

/**
   * _SET_STATUS_EFFECT_CORE_ICON
   * Displays status effects on core icons (includes warnings).
   * 
   * enum eUiRpgStatusEffect
   * {
   *   STATUS_NONE,
   *   STATUS_COLD,
   *   STATUS_HOT,
   *   STATUS_OVERFED,
   *   STATUS_DIRTY,
   *   STATUS_SNAKE_VENOM,
   *   STATUS_ARROW_WOUNDED,
   *   STATUS_ARROW_DRAINED,
   *   STATUS_ARROW_DISORIENTED,
   *   STATUS_ARROW_TRACKED,
   *   STATUS_ARROW_CONFUSION,
   *   STATUS_UNDERWEIGHT,
   *   STATUS_OVERWEIGHT,
   *   STATUS_SICK_1,
   *   STATUS_SICK_2,
   *   STATUS_PREDATOR_INVULNERABLE
   * };
   *
   * @param {number} statusEffectType
   * @return {void}
   */
declare function SetStatusEffectCoreIcon(statusEffectType: number): void;

/**
   * _SET_STATUS_EFFECT_PERIODIC_ICON
   * Starts core periodic icon.
   * statusEffectType: see 0xA4D3A1C008F250DF
   *
   * @param {number} statusEffectType
   * @return {void}
   */
declare function SetStatusEffectPeriodicIcon(statusEffectType: number): void;

/**
   * _START_ITEM_PREVIEW
   * Params: p1 is related to satchel_category
   *
   * @param {any} p0
   * @param {number} p1
   * @return {void}
   */
declare function StartItemPreview(p0: any, p1: number): void;

/**
   * _STOP_STATUS_EFFECT_PERIODIC_ICON
   * Stops periodic icon.
   * statusEffectType: see 0xA4D3A1C008F250DF
   *
   * @param {number} statusEffectType
   * @return {void}
   */
declare function StopStatusEffectPeriodicIcon(statusEffectType: number): void;