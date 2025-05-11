/**
   * DISABLE_SCRIPT_BRAIN_SET
   *
   * @param {number} brainSet
   * @return {void}
   */
declare function DisableScriptBrainSet(brainSet: number): void;

/**
   * ENABLE_SCRIPT_BRAIN_SET
   *
   * @param {number} brainSet
   * @return {void}
   */
declare function EnableScriptBrainSet(brainSet: number): void;

/**
   * REACTIVATE_ALL_OBJECT_BRAINS_THAT_ARE_WAITING_TILL_OUT_OF_RANGE
   * Called before starting a new thread_monitor script thread in startup_mp/startup_tlg
   * Alternative name _REGISTER_SCRIPT_BRAIN
   * 
   * Old name: _PREPARE_SCRIPT_BRAIN
   *
  
   * @return {void}
   */
declare function ReactivateAllObjectBrainsThatAreWaitingTillOutOfRange(): void;

/**
   * REACTIVATE_NAMED_OBJECT_BRAINS_WAITING_TILL_OUT_OF_RANGE
   *
   * @param {string | number} scriptName
   * @return {void}
   */
declare function ReactivateNamedObjectBrainsWaitingTillOutOfRange(scriptName: string | number): void;

/**
   * REGISTER_OBJECT_SCRIPT_BRAIN
   * Registers a script for any object with a specific model hash.
   *
   * @param {string | number} scriptName
   * @param {number} modelHash
   * @param {number} p2
   * @param {number} activationRange
   * @param {number} p4
   * @param {number} p5
   * @return {void}
   */
declare function RegisterObjectScriptBrain(scriptName: string | number, modelHash: Hash, p2: number, activationRange: number, p4: number, p5: number): void;

/**
   * _0x4AA5EA1EDFB25786
   * Called with flag 0 before 0xA6AC35DB4A7957A8 in net_entity_brain
   * _SET_SCRIPT_BRAIN*
   *
   * @param {number} flag
   * @return {void}
   */
declare function N_0x4AA5EA1EDFB25786(flag: number): void;

/**
   * _0xA6AC35DB4A7957A8
   * Common flags: 250, 99999
   * _SET_SCRIPT_BRAIN*
   *
   * @param {number} flag
   * @return {void}
   */
declare function N_0xA6AC35DB4A7957A8(flag: number): void;

/**
   * _GET_SCRIPT_BRAIN_ENTITY
   *
  
   * @return {number}
   */
declare function GetScriptBrainEntity(): Entity;

/**
   * _REMOVE_SCRIPT_BRAIN_ENTITY
   *
   * @param {number} entity
   * @return {void}
   */
declare function RemoveScriptBrainEntity(entity: Entity): void;

/**
   * _START_PRELOADED_SCRIPT_BRAIN
   * Returns threadId
   *
   * @param {number} entity
   * @param {string | number} scriptName
   * @param {number} scriptStackSize
   * @param {boolean} p3
   * @return {number}
   */
declare function StartPreloadedScriptBrain(entity: Entity, scriptName: string | number, scriptStackSize: number, p3: boolean): number;

/**
   * _START_SCRIPT_BRAIN
   * Returns threadId
   *
   * @param {number} entity
   * @param {string | number} scriptName
   * @param {number} p2
   * @param {DataView} p3
   * @param {number} p4
   * @param {boolean} p5
   * @return {number}
   */
declare function StartScriptBrain(entity: Entity, scriptName: string | number, p2: number, p3: DataView, p4: number, p5: boolean): number;