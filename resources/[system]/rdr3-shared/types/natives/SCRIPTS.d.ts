/**
   * AWARDS_GET_RESULT_ITEM
   *
   * @param {DataView} rpcGuid
   * @param {number} awardHash
   * @param {number} itemIndex
   * @param {DataView} outResultItem
   * @return {boolean}
   */
declare function AwardsGetResultItem(rpcGuid: DataView, awardHash: Hash, itemIndex: number, outResultItem: DataView): boolean;

/**
   * BAIL_TO_LANDING_PAGE
   *
   * @param {number} bailCode
   * @return {void}
   */
declare function BailToLandingPage(bailCode: number): void;

/**
   * BAIL_WITH_PASS_THROUGH_PARAMS
   *
   * @param {string | number} params
   * @return {void}
   */
declare function BailWithPassThroughParams(params: string | number): void;

/**
   * BG_DOES_LAUNCH_PARAM_EXIST
   *
   * @param {number} scriptIndex
   * @param {string | number} p1
   * @return {boolean}
   */
declare function BgDoesLaunchParamExist(scriptIndex: number, p1: string | number): boolean;

/**
   * BG_END_CONTEXT
   * Deletes the given context from the background scripts context map.
   *
   * @param {string | number} contextName
   * @return {void}
   */
declare function BgEndContext(contextName: string | number): void;

/**
   * BG_END_CONTEXT_HASH
   * Hashed version of BG_END_CONTEXT
   *
   * @param {number} contextHash
   * @return {void}
   */
declare function BgEndContextHash(contextHash: Hash): void;

/**
   * BG_GET_LAUNCH_PARAM_VALUE
   *
   * @param {number} scriptIndex
   * @param {string | number} p1
   * @return {number}
   */
declare function BgGetLaunchParamValue(scriptIndex: number, p1: string | number): number;

/**
   * BG_GET_SCRIPT_ID_FROM_NAME_HASH
   *
   * @param {number} p0
   * @return {number}
   */
declare function BgGetScriptIdFromNameHash(p0: Hash): number;

/**
   * BG_IS_EXITFLAG_SET
   * Returns true if GtaThread+0x77C is equal to 1.
   * 
   * Old name: _BG_EXITED_BECAUSE_BACKGROUND_THREAD_STOPPED
   *
  
   * @return {boolean}
   */
declare function BgIsExitflagSet(): boolean;

/**
   * BG_SET_EXITFLAG_RESPONSE
   * Sets bit 0 in GtaThread+0x784
   *
  
   * @return {void}
   */
declare function BgSetExitflagResponse(): void;

/**
   * BG_START_CONTEXT
   * Inserts the given context into the background scripts context map.
   *
   * @param {string | number} contextName
   * @return {void}
   */
declare function BgStartContext(contextName: string | number): void;

/**
   * BG_START_CONTEXT_HASH
   * Hashed version of BG_START_CONTEXT
   *
   * @param {number} contextHash
   * @return {void}
   */
declare function BgStartContextHash(contextHash: Hash): void;

/**
   * COUNT_PARTICIPANT_BITS
   *
   * @param {DataView} value
   * @return {number}
   */
declare function CountParticipantBits(value: DataView): number;

/**
   * COUNT_PLAYER_BITS
   *
   * @param {DataView} value
   * @return {number}
   */
declare function CountPlayerBits(value: DataView): number;

/**
   * DOES_SCRIPT_EXIST
   *
   * @param {string | number} scriptName
   * @return {boolean}
   */
declare function DoesScriptExist(scriptName: string | number): boolean;

/**
   * DOES_SCRIPT_WITH_NAME_HASH_EXIST
   *
   * @param {number} scriptHash
   * @return {boolean}
   */
declare function DoesScriptWithNameHashExist(scriptHash: Hash): boolean;

/**
   * DOES_THREAD_EXIST
   *
   * @param {number} threadId
   * @return {boolean}
   */
declare function DoesThreadExist(threadId: number): boolean;

/**
   * GET_BLOCK_OF_PLAYER_BITS
   *
   * @param {DataView} value
   * @param {number} p1
   * @return {number}
   */
declare function GetBlockOfPlayerBits(value: DataView, p1: number): number;

/**
   * GET_EVENT_AT_INDEX
   * eventGroup: 0 = SCRIPT_EVENT_QUEUE_AI (CEventGroupScriptAI), 1 = SCRIPT_EVENT_QUEUE_NETWORK (CEventGroupScriptNetwork), 2 = unk, 3 = unk, 4 = SCRIPT_EVENT_QUEUE_SCRIPT_ERRORS (CEventGroupScriptErrors)
   * 
   * Returns event name hash: https://alloc8or.re/rdr3/doc/enums/eEventType.txt
   *
   * @param {number} eventGroup
   * @param {number} eventIndex
   * @return {number}
   */
declare function GetEventAtIndex(eventGroup: number, eventIndex: number): number;

/**
   * GET_EVENT_DATA
   * eventGroup: 0 = SCRIPT_EVENT_QUEUE_AI (CEventGroupScriptAI), 1 = SCRIPT_EVENT_QUEUE_NETWORK (CEventGroupScriptNetwork), 2 = unk, 3 = unk, 4 = SCRIPT_EVENT_QUEUE_SCRIPT_ERRORS (CEventGroupScriptErrors)
   * 
   * Note: eventDataSize is NOT the size in bytes, it is the size determined by the SIZE_OF operator (RAGE Script operator, not C/C++ sizeof). That is, the size in bytes divided by 8 (script variables are always 8-byte aligned!).
   * 
   * https://github.com/femga/rdr3_discoveries/tree/master/AI/EVENTS
   *
   * @param {number} eventGroup
   * @param {number} eventIndex
   * @param {DataView} eventData
   * @param {number} eventDataSize
   * @return {boolean}
   */
declare function GetEventData(eventGroup: number, eventIndex: number, eventData: DataView, eventDataSize: number): boolean;

/**
   * GET_EVENT_EXISTS
   * eventGroup: 0 = SCRIPT_EVENT_QUEUE_AI (CEventGroupScriptAI), 1 = SCRIPT_EVENT_QUEUE_NETWORK (CEventGroupScriptNetwork), 2 = unk, 3 = unk, 4 = SCRIPT_EVENT_QUEUE_SCRIPT_ERRORS (CEventGroupScriptErrors)
   *
   * @param {number} eventGroup
   * @param {number} eventType
   * @return {boolean}
   */
declare function GetEventExists(eventGroup: number, eventType: Hash): boolean;

/**
   * GET_HASH_OF_THIS_SCRIPT_NAME
   *
  
   * @return {number}
   */
declare function GetHashOfThisScriptName(): number;

/**
   * GET_ID_OF_THIS_THREAD
   *
  
   * @return {number}
   */
declare function GetIdOfThisThread(): number;

/**
   * GET_NO_LOADING_SCREEN
   *
  
   * @return {boolean}
   */
declare function GetNoLoadingScreen(): boolean;

/**
   * GET_NUMBER_OF_EVENTS
   * eventGroup: 0 = SCRIPT_EVENT_QUEUE_AI (CEventGroupScriptAI), 1 = SCRIPT_EVENT_QUEUE_NETWORK (CEventGroupScriptNetwork), 2 = unk, 3 = unk, 4 = SCRIPT_EVENT_QUEUE_ERRORS (CEventGroupScriptErrors)
   *
   * @param {number} eventGroup
   * @return {number}
   */
declare function GetNumberOfEvents(eventGroup: number): number;

/**
   * GET_NUMBER_OF_THREADS_RUNNING_THE_SCRIPT_WITH_THIS_HASH
   * Gets the number of instances of the specified script is currently running.
   * 
   * Actually returns numRefs - 1.
   * if (program)
   *   v3 = rage::scrProgram::GetNumRefs(program) - 1;
   * return v3;
   * 
   * Old name: _GET_NUMBER_OF_REFERENCES_OF_SCRIPT_WITH_NAME_HASH
   *
   * @param {number} scriptHash
   * @return {number}
   */
declare function GetNumberOfThreadsRunningTheScriptWithThisHash(scriptHash: Hash): number;

/**
   * GET_THREAD_EXISTENCE_DETAILS
   *
   * @param {number} threadId
   * @return {[boolean, boolean]}
   */
declare function GetThreadExistenceDetails(threadId: number): [boolean, boolean];

/**
   * HAS_SCRIPT_LOADED
   * Returns if a script has been loaded into the game. Used to see if a script was loaded after requesting.
   *
   * @param {string | number} scriptName
   * @return {boolean}
   */
declare function HasScriptLoaded(scriptName: string | number): boolean;

/**
   * HAS_SCRIPT_WITH_NAME_HASH_LOADED
   *
   * @param {number} scriptHash
   * @return {boolean}
   */
declare function HasScriptWithNameHashLoaded(scriptHash: Hash): boolean;

/**
   * HAVE_ALL_CHILD_SCRIPTS_TERMINATED
   * Waiting for child scripts to terminate / waiting for collapse of child scripts
   *
   * @param {number} p0
   * @return {boolean}
   */
declare function HaveAllChildScriptsTerminated(p0: number): boolean;

/**
   * IS_LOADING_SCREEN_VISIBLE
   * Same as GET_IS_LOADING_SCREEN_ACTIVE
   *
  
   * @return {boolean}
   */
declare function IsLoadingScreenVisible(): boolean;

/**
   * IS_THREAD_ACTIVE
   *
   * @param {number} threadId
   * @param {boolean} ignoreKilledState
   * @return {boolean}
   */
declare function IsThreadActive(threadId: number, ignoreKilledState: boolean): boolean;

/**
   * IS_THREAD_EXIT_REQUESTED
   *
  
   * @return {boolean}
   */
declare function IsThreadExitRequested(): boolean;

/**
   * REQUEST_SCRIPT
   *
   * @param {string | number} scriptName
   * @return {void}
   */
declare function RequestScript(scriptName: string | number): void;

/**
   * REQUEST_SCRIPT_WITH_NAME_HASH
   *
   * @param {number} scriptHash
   * @return {void}
   */
declare function RequestScriptWithNameHash(scriptHash: Hash): void;

/**
   * SCRIPT_THREAD_ITERATOR_GET_NEXT_THREAD_ID
   * If the function returns 0, the end of the iteration has been reached.
   *
  
   * @return {number}
   */
declare function ScriptThreadIteratorGetNextThreadId(): number;

/**
   * SCRIPT_THREAD_ITERATOR_RESET
   * Starts a new iteration of the current threads.
   * Call this first, then SCRIPT_THREAD_ITERATOR_GET_NEXT_THREAD_ID (0x30B4FA1C82DD4B9F)
   *
  
   * @return {void}
   */
declare function ScriptThreadIteratorReset(): void;

/**
   * SET_BLOCK_OF_PLAYER_BITS
   *
   * @param {DataView} value
   * @param {number} p1
   * @param {number} p2
   * @return {void}
   */
declare function SetBlockOfPlayerBits(value: DataView, p1: number, p2: number): void;

/**
   * SET_EVENT_FLAG_FOR_DELETION
   *
   * @param {number} eventGroup
   * @param {number} eventIndex
   * @param {boolean} p2
   * @return {void}
   */
declare function SetEventFlagForDeletion(eventGroup: number, eventIndex: number, p2: boolean): void;

/**
   * SET_NO_LOADING_SCREEN
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetNoLoadingScreen(toggle: boolean): void;

/**
   * SET_SCRIPT_AS_NO_LONGER_NEEDED
   *
   * @param {string | number} scriptName
   * @return {void}
   */
declare function SetScriptAsNoLongerNeeded(scriptName: string | number): void;

/**
   * SET_SCRIPT_WITH_NAME_HASH_AS_NO_LONGER_NEEDED
   *
   * @param {number} scriptHash
   * @return {void}
   */
declare function SetScriptWithNameHashAsNoLongerNeeded(scriptHash: Hash): void;

/**
   * SHUTDOWN_LOADING_SCREEN
   *
  
   * @return {void}
   */
declare function ShutdownLoadingScreen(): void;

/**
   * START_NEW_SCRIPT
   *
   * @param {string | number} scriptName
   * @param {number} stackSize
   * @return {number}
   */
declare function StartNewScript(scriptName: string | number, stackSize: number): number;

/**
   * START_NEW_SCRIPT_WITH_ARGS
   * return : script thread id, 0 if failed
   * Pass pointer to struct of args in p1, size of struct goes into p2
   *
   * @param {string | number} scriptName
   * @param {DataView} args
   * @param {number} argCount
   * @param {number} stackSize
   * @return {number}
   */
declare function StartNewScriptWithArgs(scriptName: string | number, args: DataView, argCount: number, stackSize: number): number;

/**
   * START_NEW_SCRIPT_WITH_NAME_HASH
   *
   * @param {number} scriptHash
   * @param {number} stackSize
   * @return {number}
   */
declare function StartNewScriptWithNameHash(scriptHash: Hash, stackSize: number): number;

/**
   * START_NEW_SCRIPT_WITH_NAME_HASH_AND_ARGS
   *
   * @param {number} scriptHash
   * @param {DataView} args
   * @param {number} argCount
   * @param {number} stackSize
   * @return {number}
   */
declare function StartNewScriptWithNameHashAndArgs(scriptHash: Hash, args: DataView, argCount: number, stackSize: number): number;

/**
   * STOP_DISPLAYING_MP_TRANSITION_LOADING_SCREENS
   *
   * @param {any} p0
   * @return {void}
   */
declare function StopDisplayingMpTransitionLoadingScreens(p0: any): void;

/**
   * TERMINATE_THIS_THREAD
   *
  
   * @return {void}
   */
declare function TerminateThisThread(): void;

/**
   * TERMINATE_THREAD
   *
   * @param {number} threadId
   * @return {void}
   */
declare function TerminateThread(threadId: number): void;

/**
   * TRIGGER_SCRIPT_EVENT
   * eventGroup: 0 = SCRIPT_EVENT_QUEUE_AI (CEventGroupScriptAI), 1 = SCRIPT_EVENT_QUEUE_NETWORK (CEventGroupScriptNetwork), 2 = unk, 3 = unk, 4 = SCRIPT_EVENT_QUEUE_SCRIPT_ERRORS (CEventGroupScriptErrors)
   * 
   * Note: eventDataSize is NOT the size in bytes, it is the size determined by the SIZE_OF operator (RAGE Script operator, not C/C++ sizeof). That is, the size in bytes divided by 8 (script variables are always 8-byte aligned!).
   * 
   * playerBits (also known as playersToBroadcastTo) is a bitset that indicates which players this event should be sent to. In order to send the event to specific players only, use (1 << playerIndex). Set all bits if it should be broadcast to all players.
   *
   * @param {number} eventGroup
   * @param {DataView} eventData
   * @param {number} eventDataSize
   * @param {number} scriptMetadataIndex
   * @return {number}
   */
declare function TriggerScriptEvent(eventGroup: number, eventData: DataView, eventDataSize: number, scriptMetadataIndex: number): number;

/**
   * _0x0A79C81C418F5D38
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0x0A79C81C418F5D38(p0: any, p1: any): any;

/**
   * _0x11B0A0B282FA9B10
   * Used in Script Function DISABLE_REGISTERED_WORLD_BRAINS
   *
   * @param {boolean} p0
   * @return {void}
   */
declare function N_0x11B0A0B282FA9B10(p0: boolean): void;

/**
   * _0x1BDB5A07307F6929
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x1BDB5A07307F6929(p0: any, p1: any): void;

/**
   * _0x1C5EB3C27F7508CB
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x1C5EB3C27F7508CB(p0: any, p1: any): void;

/**
   * _0x29FB4CE89472C3CB
   *
   * @param {any} p0
   * @param {any} p1
   * @param {number} p2
   * @param {number} p3
   * @param {string | number} p4
   * @param {string | number} p5
   * @param {string | number} p6
   * @param {number} p7
   * @return {void}
   */
declare function N_0x29FB4CE89472C3CB(p0: any, p1: any, p2: number, p3: number, p4: string | number, p5: string | number, p6: string | number, p7: number): void;

/**
   * _0x42A429CDFED6D99D
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0x42A429CDFED6D99D(p0: any, p1: any, p2: any): void;

/**
   * _0x5827BE85A87B073D
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x5827BE85A87B073D(p0: any): void;

/**
   * _0x64F765D9A1F8F02C
   *
   * @param {DataView} p0
   * @param {DataView} p1
   * @param {DataView} p2
   * @return {void}
   */
declare function N_0x64F765D9A1F8F02C(p0: DataView, p1: DataView, p2: DataView): void;

/**
   * _0x6F700A4BF7C3331B
   *
   * @param {boolean} p0
   * @return {void}
   */
declare function N_0x6F700A4BF7C3331B(p0: boolean): void;

/**
   * _0x76CBCD9EADC00955
   *
  
   * @return {void}
   */
declare function N_0x76CBCD9EADC00955(): void;

/**
   * _0xA88E1D7FA1E20080
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xA88E1D7FA1E20080(p0: any): any;

/**
   * _0xE4ABE20DCE7C7CFE
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0xE4ABE20DCE7C7CFE(p0: any, p1: any, p2: any): void;

/**
   * _0xE7282390542F570D
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xE7282390542F570D(p0: any): any;

/**
   * _0xF9E951A1E5517C06
   *
  
   * @return {void}
   */
declare function N_0xF9E951A1E5517C06(): void;

/**
   * _0xFFDDF802279BE128
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0xFFDDF802279BE128(p0: any, p1: any, p2: any): void;

/**
   * _ACTIVATE_GOAL_CONTEXT
   * goalContext: see <availableContexts> in common/data/stats_and_challenges/goals_*.meta
   *
   * @param {number} goalContext
   * @return {void}
   */
declare function ActivateGoalContext(goalContext: Hash): void;

/**
   * _AWARDS_GET_UNLOCK_CLAIM_DATA
   *
   * @param {DataView} rpcGuid
   * @param {number} awardHash
   * @param {number} dataIndex
   * @param {DataView} outUnlockData
   * @return {boolean}
   */
declare function AwardsGetUnlockClaimData(rpcGuid: DataView, awardHash: Hash, dataIndex: number, outUnlockData: DataView): boolean;

/**
   * _BG_RELOAD_ALL_BACKGROUND_SCRIPTS
   *
  
   * @return {void}
   */
declare function BgReloadAllBackgroundScripts(): void;

/**
   * _CLEAR_ALL_PLAYER_BITS
   *
   * @param {DataView} value
   * @return {void}
   */
declare function ClearAllPlayerBits(value: DataView): void;

/**
   * _CLEAR_PLAYER_BIT_AT_INDEX
   *
   * @param {DataView} value
   * @param {number} bitIndex
   * @return {void}
   */
declare function ClearPlayerBitAtIndex(value: DataView, bitIndex: number): void;

/**
   * _DEACTIVATE_GOAL_CONTEXT
   * goalContext: see _ACTIVATE_GOAL_CONTEXT
   *
   * @param {number} goalContext
   * @return {void}
   */
declare function DeactivateGoalContext(goalContext: Hash): void;

/**
   * _DISPLAY_LOADING_SCREENS
   *
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @param {string | number} gamemodeName
   * @param {string | number} title
   * @param {string | number} subtitle
   * @return {void}
   */
declare function DisplayLoadingScreens(p0: Hash, p1: Hash, p2: Hash, gamemodeName: string | number, title: string | number, subtitle: string | number): void;

/**
   * _DOES_COMPRESSED_GLOBAL_BLOCK_BUFFER_EXIST
   *
   * @param {number} index
   * @return {boolean}
   */
declare function DoesCompressedGlobalBlockBufferExist(index: number): boolean;

/**
   * _GET_GLOBAL_BLOCK_CAN_BE_ACCESSED
   *
   * @param {number} index
   * @return {boolean}
   */
declare function GetGlobalBlockCanBeAccessed(index: number): boolean;

/**
   * _GET_HASH_OF_THREAD
   *
   * @param {number} threadId
   * @return {number}
   */
declare function GetHashOfThread(threadId: number): number;

/**
   * _GET_THREAD_EXIT_REASON
   * enum eThreadExitReason
   * {
   *   THREAD_EXIT_REASON_NONE,
   *   THREAD_EXIT_REASON_BACKGROUND_THREAD_STOPPED,
   *   THREAD_EXIT_REASON_SESSION_MERGE,
   *   THREAD_EXIT_REASON_SCENARIO_OUT_OF_SCOPE,
   *   THREAD_EXIT_REASON_REQUESTED_BY_SCRIPT
   * };
   *
  
   * @return {number}
   */
declare function GetThreadExitReason(): number;

/**
   * _IS_ANY_PLAYER_BIT_SET
   *
  
   * @return {[boolean, number]}
   */
declare function IsAnyPlayerBitSet(): [boolean, number];

/**
   * _IS_BACKGROUND_SCRIPT
   *
   * @param {number} threadId
   * @return {boolean}
   */
declare function IsBackgroundScript(threadId: number): boolean;

/**
   * _IS_GOAL_CONTEXT_ACTIVE
   * goalContext: see _ACTIVATE_GOAL_CONTEXT
   *
   * @param {number} goalContext
   * @return {boolean}
   */
declare function IsGoalContextActive(goalContext: Hash): boolean;

/**
   * _IS_PLAYER_BIT_SET_AT_INDEX
   *
   * @param {DataView} value
   * @param {number} bitIndex
   * @return {boolean}
   */
declare function IsPlayerBitSetAtIndex(value: DataView, bitIndex: number): boolean;

/**
   * _IS_THREAD_EXIT_REQUESTED_FOR_THREAD_WITH_THIS_ID
   *
   * @param {number} threadId
   * @return {boolean}
   */
declare function IsThreadExitRequestedForThreadWithThisId(threadId: number): boolean;

/**
   * _LOOT_GET_LOOT_CLAIM_DATA
   *
   * @param {DataView} rpcGuid
   * @param {number} dataIndex
   * @param {DataView} outLootData
   * @return {boolean}
   */
declare function LootGetLootClaimData(rpcGuid: DataView, dataIndex: number, outLootData: DataView): boolean;

/**
   * _LOOT_GET_RESULT_ITEM
   *
   * @param {DataView} rpcGuid
   * @param {number} itemIndex
   * @param {DataView} outResultItem
   * @return {boolean}
   */
declare function LootGetResultItem(rpcGuid: DataView, itemIndex: number, outResultItem: DataView): boolean;

/**
   * _NET_RPC_GUID_TO_STRING
   * Returns "INVALID_NET_RPC_GUID" if netRpcGuid is invalid.
   *
   * @param {DataView} netRpcGuid
   * @return {string | number}
   */
declare function NetRpcGuidToString(netRpcGuid: DataView): string | number;

/**
   * _REQUEST_THREAD_EXIT
   *
   * @param {number} threadId
   * @return {void}
   */
declare function RequestThreadExit(threadId: number): void;

/**
   * _REQUEST_THREAD_EXIT_FOR_ALL_THREADS_WITH_THIS_NAME
   *
   * @param {number} nameHash
   * @return {void}
   */
declare function RequestThreadExitForAllThreadsWithThisName(nameHash: Hash): void;

/**
   * _RESTORE_GLOBAL_BLOCK
   *
   * @param {number} index
   * @return {boolean}
   */
declare function RestoreGlobalBlock(index: number): boolean;

/**
   * _SET_ALL_GLOBAL_BLOCKS_HAVE_BEEN_LOADED
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetAllGlobalBlocksHaveBeenLoaded(toggle: boolean): void;

/**
   * _SET_ALL_PLAYER_BITS
   *
   * @param {DataView} value
   * @return {void}
   */
declare function SetAllPlayerBits(value: DataView): void;

/**
   * _SET_GLOBAL_BLOCK_CAN_BE_ACCESSED
   *
   * @param {number} index
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetGlobalBlockCanBeAccessed(index: number, toggle: boolean): void;

/**
   * _SET_PLAYER_BIT_AT_INDEX
   *
   * @param {DataView} value
   * @param {number} bitIndex
   * @return {void}
   */
declare function SetPlayerBitAtIndex(value: DataView, bitIndex: number): void;

/**
   * _STORE_GLOBAL_BLOCK
   *
   * @param {number} index
   * @return {boolean}
   */
declare function StoreGlobalBlock(index: number): boolean;

/**
   * _TRIGGER_SCRIPT_EVENT_2
   *
   * @param {DataView} eventData
   * @param {number} eventDataSize
   * @param {number} scriptMetadataIndex
   * @param {number} threadId
   * @return {void}
   */
declare function TriggerScriptEvent_2(eventData: DataView, eventDataSize: number, scriptMetadataIndex: number, threadId: number): void;