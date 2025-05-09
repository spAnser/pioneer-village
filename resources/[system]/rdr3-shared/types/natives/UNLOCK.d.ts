/**
 * UNLOCK_IS_UNLOCKED
 *
 * @param {number} unlockHash
 * @return {boolean}
 */
declare function UnlockIsUnlocked(unlockHash: Hash): boolean;

/**
 * UNLOCK_IS_VISIBLE
 *
 * @param {number} unlockHash
 * @return {boolean}
 */
declare function UnlockIsVisible(unlockHash: Hash): boolean;

/**
 * UNLOCK_SET_UNLOCKED
 *
 * @param {number} unlockHash
 * @param {boolean} toggle
 * @return {void}
 */
declare function UnlockSetUnlocked(unlockHash: Hash, toggle: boolean): void;

/**
 * UNLOCK_SET_VISIBLE
 *
 * @param {number} unlockHash
 * @param {boolean} toggle
 * @return {void}
 */
declare function UnlockSetVisible(unlockHash: Hash, toggle: boolean): void;

/**
 * _UNLOCK_GET_ITEM_ROLE_UNLOCK_INFO
 *
 * @param {number} unlockHash
 * @param {DataView} outData
 * @return {void}
 */
declare function UnlockGetItemRoleUnlockInfo(unlockHash: Hash, outData: DataView): void;

/**
 * _UNLOCK_IS_LOOTABLE
 *
 * @param {number} unlockHash
 * @return {boolean}
 */
declare function UnlockIsLootable(unlockHash: Hash): boolean;

/**
 * _UNLOCK_IS_NEW
 *
 * @param {number} unlockHash
 * @return {boolean}
 */
declare function UnlockIsNew(unlockHash: Hash): boolean;

/**
 * _UNLOCK_IS_UNLOCK_FLAG_SET
 *
 * @param {number} unlockHash
 * @param {number} flag
 * @return {boolean}
 */
declare function UnlockIsUnlockFlagSet(unlockHash: Hash, flag: number): boolean;

/**
 * _UNLOCK_SET_NEW
 *
 * @param {number} unlockHash
 * @param {boolean} toggle
 * @return {void}
 */
declare function UnlockSetNew(unlockHash: Hash, toggle: boolean): void;