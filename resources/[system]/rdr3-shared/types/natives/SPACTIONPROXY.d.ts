/**
 * _SPACTIONPROXY_GET_NEXT_PENDING_BUY_ACTION
 *
 * @param {DataView} data
 * @return {boolean}
 */
declare function SpactionproxyGetNextPendingBuyAction(data: DataView): boolean;

/**
 * _SPACTIONPROXY_GET_NEXT_PENDING_CRAFTING_ACTION
 *
 * @param {DataView} data
 * @return {boolean}
 */
declare function SpactionproxyGetNextPendingCraftingAction(data: DataView): boolean;

/**
 * _SPACTIONPROXY_MANAGER_IS_FAILED
 *

 * @return {boolean}
 */
declare function SpactionproxyManagerIsFailed(): boolean;

/**
 * _SPACTIONPROXY_MANAGER_IS_READY
 *

 * @return {boolean}
 */
declare function SpactionproxyManagerIsReady(): boolean;

/**
 * _SPACTIONPROXY_PROCESS_ACTION
 *
 * @param {any} p0
 * @param {boolean} p1
 * @return {boolean}
 */
declare function SpactionproxyProcessAction(p0: any, p1: boolean): boolean;

/**
 * _SPACTIONPROXY_START_MANAGER
 *

 * @return {boolean}
 */
declare function SpactionproxyStartManager(): boolean;