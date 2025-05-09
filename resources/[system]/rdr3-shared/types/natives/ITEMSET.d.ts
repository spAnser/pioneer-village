/**
 * ADD_TO_ITEMSET
 *
 * @param {number} entity
 * @param {number} itemset
 * @return {boolean}
 */
declare function AddToItemset(entity: Entity, itemset: ItemSet): boolean;

/**
 * CLEAN_ITEMSET
 *
 * @param {number} itemset
 * @return {void}
 */
declare function CleanItemset(itemset: ItemSet): void;

/**
 * CREATE_ITEMSET
 *
 * @param {boolean} p0
 * @return {number}
 */
declare function CreateItemset(p0: boolean): ItemSet;

/**
 * DESTROY_ITEMSET
 *
 * @param {number} itemset
 * @return {void}
 */
declare function DestroyItemset(itemset: ItemSet): void;

/**
 * GET_INDEXED_ITEM_IN_ITEMSET
 *
 * @param {number} index
 * @param {number} itemset
 * @return {number}
 */
declare function GetIndexedItemInItemset(index: number, itemset: ItemSet): ScrHandle;

/**
 * GET_INDEXED_SCENARIO_POINT_INDEX_IN_ITEMSET
 *
 * @param {number} index
 * @param {number} itemset
 * @return {any}
 */
declare function GetIndexedScenarioPointIndexInItemset(index: number, itemset: ItemSet): any;

/**
 * GET_ITEMSET_SIZE
 *
 * @param {number} itemset
 * @return {number}
 */
declare function GetItemsetSize(itemset: ItemSet): number;

/**
 * IS_IN_ITEMSET
 *
 * @param {number} entity
 * @param {number} itemset
 * @return {boolean}
 */
declare function IsInItemset(entity: Entity, itemset: ItemSet): boolean;

/**
 * IS_ITEMSET_VALID
 *
 * @param {number} itemset
 * @return {boolean}
 */
declare function IsItemsetValid(itemset: ItemSet): boolean;

/**
 * REMOVE_FROM_ITEMSET
 *
 * @param {number} entity
 * @param {number} itemset
 * @return {void}
 */
declare function RemoveFromItemset(entity: Entity, itemset: ItemSet): void;

/**
 * _CLEAR_ITEMSET
 *
 * @param {number} itemset
 * @return {void}
 */
declare function ClearItemset(itemset: ItemSet): void;