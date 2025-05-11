/**
   * CAN_LAUNCH_UIAPP_BY_HASH
   *
   * @param {number} appNameHash
   * @return {boolean}
   */
declare function CanLaunchUiappByHash(appNameHash: Hash): boolean;

/**
   * CAN_LAUNCH_UIAPP_BY_HASH_WITH_ENTRY
   *
   * @param {number} appNameHash
   * @param {number} entryHash
   * @return {boolean}
   */
declare function CanLaunchUiappByHashWithEntry(appNameHash: Hash, entryHash: Hash): boolean;

/**
   * IS_ANY_UIAPP_ACTIVE
   *
  
   * @return {boolean}
   */
declare function IsAnyUiappActive(): boolean;

/**
   * IS_ANY_UIAPP_RUNNING
   *
  
   * @return {boolean}
   */
declare function IsAnyUiappRunning(): boolean;

/**
   * IS_UIAPP_ACTIVE_BY_HASH
   *
   * @param {number} appNameHash
   * @return {boolean}
   */
declare function IsUiappActiveByHash(appNameHash: Hash): boolean;

/**
   * IS_UIAPP_RUNNING
   *
   * @param {string | number} appName
   * @return {boolean}
   */
declare function IsUiappRunning(appName: string | number): boolean;

/**
   * IS_UIAPP_RUNNING_BY_HASH
   *
   * @param {number} appNameHash
   * @return {boolean}
   */
declare function IsUiappRunningByHash(appNameHash: Hash): boolean;

/**
   * IS_UIAPP_TRANSITIONING_BY_HASH
   *
   * @param {number} appNameHash
   * @return {boolean}
   */
declare function IsUiappTransitioningByHash(appNameHash: Hash): boolean;

/**
   * LAUNCH_UIAPP_BY_HASH
   *
   * @param {number} appNameHash
   * @return {number}
   */
declare function LaunchUiappByHash(appNameHash: Hash): number;

/**
   * LAUNCH_UIAPP_BY_HASH_WITH_ENTRY
   *
   * @param {number} appNameHash
   * @param {number} entryHash
   * @return {number}
   */
declare function LaunchUiappByHashWithEntry(appNameHash: Hash, entryHash: Hash): number;

/**
   * LAUNCH_UIAPP_WITH_ENTRY
   *
   * @param {string | number} appName
   * @param {string | number} entry
   * @return {number}
   */
declare function LaunchUiappWithEntry(appName: string | number, entry: string | number): number;

/**
   * REQUEST_UIAPP_TRANSITION_BY_HASH
   *
   * @param {number} appNameHash
   * @param {number} transitionHash
   * @return {boolean}
   */
declare function RequestUiappTransitionByHash(appNameHash: Hash, transitionHash: Hash): boolean;

/**
   * _CLOSE_ALL_UIAPPS
   *
  
   * @return {void}
   */
declare function CloseAllUiapps(): void;

/**
   * _CLOSE_ALL_UIAPPS_IMMEDIATE
   *
  
   * @return {void}
   */
declare function CloseAllUiappsImmediate(): void;

/**
   * _CLOSE_UIAPP
   *
   * @param {string | number} appName
   * @return {void}
   */
declare function CloseUiapp(appName: string | number): void;

/**
   * _CLOSE_UIAPP_BY_HASH
   *
   * @param {number} appNameHash
   * @return {void}
   */
declare function CloseUiappByHash(appNameHash: Hash): void;

/**
   * _CLOSE_UIAPP_BY_HASH_IMMEDIATE
   *
   * @param {number} appNameHash
   * @return {void}
   */
declare function CloseUiappByHashImmediate(appNameHash: Hash): void;

/**
   * _CLOSE_UIAPP_IMMEDIATE
   *
   * @param {string | number} appName
   * @return {void}
   */
declare function CloseUiappImmediate(appName: string | number): void;

/**
   * _GET_UIAPP_CURRENT_ACTIVITY_BY_HASH
   *
   * @param {number} appNameHash
   * @return {number}
   */
declare function GetUiappCurrentActivityByHash(appNameHash: Hash): number;