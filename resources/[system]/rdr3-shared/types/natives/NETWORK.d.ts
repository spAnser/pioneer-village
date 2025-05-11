/**
   * ACTIVATE_DAMAGE_TRACKER_ON_NETWORK_ID
   *
   * @param {number} netId
   * @param {boolean} toggle
   * @return {void}
   */
declare function ActivateDamageTrackerOnNetworkId(netID: number, toggle: boolean): void;

/**
   * CAN_REGISTER_MISSION_ENTITIES
   *
   * @param {number} pedAmt
   * @param {number} vehicleAmt
   * @param {number} objectAmt
   * @param {number} pickupAmt
   * @return {boolean}
   */
declare function CanRegisterMissionEntities(ped_amt: number, vehicle_amt: number, object_amt: number, pickup_amt: number): boolean;

/**
   * CAN_REGISTER_MISSION_OBJECTS
   *
   * @param {number} amount
   * @return {boolean}
   */
declare function CanRegisterMissionObjects(amount: number): boolean;

/**
   * CAN_REGISTER_MISSION_PEDS
   *
   * @param {number} amount
   * @return {boolean}
   */
declare function CanRegisterMissionPeds(amount: number): boolean;

/**
   * CAN_REGISTER_MISSION_PICKUPS
   *
   * @param {number} amount
   * @return {boolean}
   */
declare function CanRegisterMissionPickups(amount: number): boolean;

/**
   * CAN_REGISTER_MISSION_VEHICLES
   *
   * @param {number} amount
   * @return {boolean}
   */
declare function CanRegisterMissionVehicles(amount: number): boolean;

/**
   * CLEAR_SERVICE_EVENT_ARGUMENTS
   * Old name: _CLEAR_LAUNCH_PARAMS
   *
  
   * @return {void}
   */
declare function ClearServiceEventArguments(): void;

/**
   * CLOUD_DID_REQUEST_SUCCEED
   *
   * @param {number} id
   * @return {boolean}
   */
declare function CloudDidRequestSucceed(id: number): boolean;

/**
   * CLOUD_HAS_REQUEST_COMPLETED
   *
   * @param {number} id
   * @return {boolean}
   */
declare function CloudHasRequestCompleted(id: number): boolean;

/**
   * CONVERT_POSIX_TIME
   * Takes the specified time and writes it to the structure specified in the second argument.
   * 
   * struct date_time
   * {
   *     int year;
   *     int PADDING1;
   *     int month;
   *     int PADDING2;
   *     int day;
   *     int PADDING3;
   *     int hour;
   *     int PADDING4;
   *     int minute;
   *     int PADDING5;
   *     int second;
   *     int PADDING6;
   * };
   *
   * @param {number} posixTime
   * @param {DataView} timeStructure
   * @return {void}
   */
declare function ConvertPosixTime(posixTime: number, timeStructure: DataView): void;

/**
   * GET_CLOUD_TIME_AS_INT
   *
  
   * @return {number}
   */
declare function GetCloudTimeAsInt(): number;

/**
   * GET_LAUNCH_PARAM_VALUE
   *
   * @param {string | number} paramName
   * @return {string | number}
   */
declare function GetLaunchParamValue(paramName: string | number): string | number;

/**
   * GET_MAX_NUM_NETWORK_OBJECTS
   * Always returns 60
   *
  
   * @return {number}
   */
declare function GetMaxNumNetworkObjects(): number;

/**
   * GET_MAX_NUM_NETWORK_PEDS
   * Always returns 110
   *
  
   * @return {number}
   */
declare function GetMaxNumNetworkPeds(): number;

/**
   * GET_MAX_NUM_NETWORK_PICKUPS
   * Always returns 80
   *
  
   * @return {number}
   */
declare function GetMaxNumNetworkPickups(): number;

/**
   * GET_MAX_NUM_NETWORK_VEHICLES
   * Always returns 40
   *
  
   * @return {number}
   */
declare function GetMaxNumNetworkVehicles(): number;

/**
   * GET_NETWORK_TIME
   *
  
   * @return {number}
   */
declare function GetNetworkTime(): number;

/**
   * GET_NETWORK_TIME_ACCURATE
   *
  
   * @return {number}
   */
declare function GetNetworkTimeAccurate(): number;

/**
   * GET_NUM_CREATED_MISSION_OBJECTS
   *
   * @param {boolean} p0
   * @return {number}
   */
declare function GetNumCreatedMissionObjects(p0: boolean): number;

/**
   * GET_NUM_CREATED_MISSION_PEDS
   *
   * @param {boolean} p0
   * @return {number}
   */
declare function GetNumCreatedMissionPeds(p0: boolean): number;

/**
   * GET_NUM_CREATED_MISSION_VEHICLES
   *
   * @param {boolean} p0
   * @return {number}
   */
declare function GetNumCreatedMissionVehicles(p0: boolean): number;

/**
   * GET_NUM_RESERVED_MISSION_OBJECTS
   * p0 appears to be for MP
   *
   * @param {boolean} p0
   * @return {number}
   */
declare function GetNumReservedMissionObjects(p0: boolean): number;

/**
   * GET_NUM_RESERVED_MISSION_PEDS
   * p0 appears to be for MP
   *
   * @param {boolean} p0
   * @return {number}
   */
declare function GetNumReservedMissionPeds(p0: boolean): number;

/**
   * GET_NUM_RESERVED_MISSION_VEHICLES
   * p0 appears to be for MP
   *
   * @param {boolean} p0
   * @return {number}
   */
declare function GetNumReservedMissionVehicles(p0: boolean): number;

/**
   * GET_RESERVED_MISSION_ENTITIES_IN_AREA
   * Used in Script Function NET_ACE_CLIENT_VERIFY_ENTITY_RESERVATIONS
   * Coords: Slot world position
   * 
   * Old name: _GET_RESERVATIONS_FOR_SLOT_WORLD_POSITION
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {boolean} p3
   * @return {[number, number, number, number]}
   */
declare function GetReservedMissionEntitiesInArea(x: number, y: number, z: number, p3: boolean): [number, number, number, number];

/**
   * GET_STATUS_OF_TEXTURE_DOWNLOAD
   * 0 = succeeded
   * 1 = pending
   * 2 = failed
   *
   * @param {number} textureDownloadId
   * @return {number}
   */
declare function GetStatusOfTextureDownload(textureDownloadId: number): number;

/**
   * GET_TIME_DIFFERENCE
   * Subtracts the second argument from the first.
   *
   * @param {number} timeA
   * @param {number} timeB
   * @return {number}
   */
declare function GetTimeDifference(timeA: number, timeB: number): number;

/**
   * GET_TIME_OFFSET
   * Adds the first argument to the second.
   *
   * @param {number} timeA
   * @param {number} timeB
   * @return {number}
   */
declare function GetTimeOffset(timeA: number, timeB: number): number;

/**
   * GET_UNIQUE_INT_FOR_PLAYER
   *
   * @param {number} player
   * @return {number}
   */
declare function GetUniqueIntForPlayer(player: Player): number;

/**
   * HAS_NETWORK_TIME_STARTED
   *
  
   * @return {boolean}
   */
declare function HasNetworkTimeStarted(): boolean;

/**
   * IS_DAMAGE_TRACKER_ACTIVE_ON_NETWORK_ID
   *
   * @param {number} netId
   * @return {boolean}
   */
declare function IsDamageTrackerActiveOnNetworkId(netID: number): boolean;

/**
   * IS_ENTITY_A_GHOST
   * Old name: _IS_ENTITY_GHOSTED_TO_LOCAL_PLAYER
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function IsEntityAGhost(entity: Entity): boolean;

/**
   * IS_NETWORK_ID_OWNED_BY_PARTICIPANT
   *
   * @param {number} netId
   * @return {boolean}
   */
declare function IsNetworkIdOwnedByParticipant(netId: number): boolean;

/**
   * IS_OBJECT_REASSIGNMENT_IN_PROGRESS
   * Note: this native was added in build 1311.16
   *
  
   * @return {boolean}
   */
declare function IsObjectReassignmentInProgress(): boolean;

/**
   * IS_SPHERE_VISIBLE_TO_ANOTHER_MACHINE
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {boolean}
   */
declare function IsSphereVisibleToAnotherMachine(p0: any, p1: any, p2: any, p3: any, p4: any): boolean;

/**
   * IS_SPHERE_VISIBLE_TO_PLAYER
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @return {boolean}
   */
declare function IsSphereVisibleToPlayer(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): boolean;

/**
   * IS_TIME_LESS_THAN
   * Subtracts the second argument from the first, then returns whether the result is negative.
   *
   * @param {number} timeA
   * @param {number} timeB
   * @return {boolean}
   */
declare function IsTimeLessThan(timeA: number, timeB: number): boolean;

/**
   * IS_TIME_MORE_THAN
   * Subtracts the first argument from the second, then returns whether the result is negative.
   *
   * @param {number} timeA
   * @param {number} timeB
   * @return {boolean}
   */
declare function IsTimeMoreThan(timeA: number, timeB: number): boolean;

/**
   * KEEP_NETWORK_ID_IN_FAST_INSTANCE
   *
   * @param {number} netId
   * @param {boolean} p1
   * @param {number} p2
   * @return {void}
   */
declare function KeepNetworkIdInFastInstance(netId: number, p1: boolean, p2: number): void;

/**
   * NETWORK_ACCEPT_RS_INVITE
   *
   * @param {number} p0
   * @return {boolean}
   */
declare function NetworkAcceptRsInvite(p0: number): boolean;

/**
   * NETWORK_ACCESS_TUNABLE_BOOL
   *
   * @param {number} tunableContext
   * @param {number} tunableName
   * @return {boolean}
   */
declare function NetworkAccessTunableBool(tunableContext: Hash, tunableName: Hash): boolean;

/**
   * NETWORK_ACCESS_TUNABLE_INT
   *
   * @param {number} tunableContext
   * @param {number} tunableName
   * @return {[boolean, number]}
   */
declare function NetworkAccessTunableInt(tunableContext: Hash, tunableName: Hash): [boolean, number];

/**
   * NETWORK_ACTION_PLATFORM_INVITE
   *
  
   * @return {boolean}
   */
declare function NetworkActionPlatformInvite(): boolean;

/**
   * NETWORK_ACTIVITY_RESET_TO_IDLE
   *
  
   * @return {void}
   */
declare function NetworkActivityResetToIdle(): void;

/**
   * NETWORK_ACTIVITY_SET_CURRENT
   *
   * @param {number} netPlaylistActivity
   * @return {void}
   */
declare function NetworkActivitySetCurrent(netPlaylistActivity: number): void;

/**
   * NETWORK_ADD_FRIEND
   *
   * @param {DataView} gamerHandle
   * @param {string | number} message
   * @return {boolean}
   */
declare function NetworkAddFriend(gamerHandle: DataView, message: string | number): boolean;

/**
   * NETWORK_ALLOW_ALL_ENTITY_FADING_FOR_INSTANCES
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function NetworkAllowAllEntityFadingForInstances(toggle: boolean): void;

/**
   * NETWORK_ALLOW_ENTITY_FADING_FOR_INSTANCES
   *
   * @param {number} entity
   * @param {boolean} toggle
   * @return {void}
   */
declare function NetworkAllowEntityFadingForInstances(entity: Entity, toggle: boolean): void;

/**
   * NETWORK_ALLOW_REMOTE_ATTACHMENT_MODIFICATION
   * Old name: _NETWORK_ALLOW_LOCAL_ENTITY_ATTACHMENT
   *
   * @param {number} entity
   * @param {boolean} toggle
   * @return {void}
   */
declare function NetworkAllowRemoteAttachmentModification(entity: Entity, toggle: boolean): void;

/**
   * NETWORK_ARE_HANDLES_THE_SAME
   *
   * @param {DataView} gamerHandle1
   * @param {DataView} gamerHandle2
   * @return {boolean}
   */
declare function NetworkAreHandlesTheSame(gamerHandle1: DataView, gamerHandle2: DataView): boolean;

/**
   * NETWORK_ARE_PLAYERS_IN_SAME_TUTORIAL_SESSION
   * Old name: _NETWORK_IS_PLAYER_EQUAL_TO_INDEX
   *
   * @param {number} player
   * @param {number} index
   * @return {boolean}
   */
declare function NetworkArePlayersInSameTutorialSession(player: Player, index: number): boolean;

/**
   * NETWORK_AUTO_SESSION_CAN_SPLIT_SESSION
   *
  
   * @return {[boolean, number]}
   */
declare function NetworkAutoSessionCanSplitSession(): [boolean, number];

/**
   * NETWORK_AUTO_SESSION_FINISH_INSTANCE
   *
  
   * @return {void}
   */
declare function NetworkAutoSessionFinishInstance(): void;

/**
   * NETWORK_AUTO_SESSION_IS_ALLOWED_TO_MERGE
   *
  
   * @return {boolean}
   */
declare function NetworkAutoSessionIsAllowedToMerge(): boolean;

/**
   * NETWORK_AUTO_SESSION_IS_OBJECT_CREATION_PAUSED
   *
  
   * @return {boolean}
   */
declare function NetworkAutoSessionIsObjectCreationPaused(): boolean;

/**
   * NETWORK_AUTO_SESSION_SPLIT_SESSION
   *
   * @param {number} playersToTake
   * @param {number} maxInstancePlayers
   * @param {number} sessionFlags
   * @param {number} bucketId
   * @return {boolean}
   */
declare function NetworkAutoSessionSplitSession(playersToTake: number, maxInstancePlayers: number, sessionFlags: number, bucketId: number): boolean;

/**
   * NETWORK_AWARD_HAS_REACHED_MAXCLAIM
   *
   * @param {any} p0
   * @return {boolean}
   */
declare function NetworkAwardHasReachedMaxclaim(p0: any): boolean;

/**
   * NETWORK_CAN_ACCESS_MULTIPLAYER
   *
  
   * @return {[boolean, number]}
   */
declare function NetworkCanAccessMultiplayer(): [boolean, number];

/**
   * NETWORK_CAN_REFRESH_FRIEND_PAGE
   *
  
   * @return {boolean}
   */
declare function NetworkCanRefreshFriendPage(): boolean;

/**
   * NETWORK_CAN_SESSION_END
   *
  
   * @return {boolean}
   */
declare function NetworkCanSessionEnd(): boolean;

/**
   * NETWORK_CAN_VIEW_GAMER_USER_CONTENT
   *
   * @param {DataView} gamerHandle
   * @return {boolean}
   */
declare function NetworkCanViewGamerUserContent(gamerHandle: DataView): boolean;

/**
   * NETWORK_CHECK_ACCESS_AND_ALERT_IF_FAIL
   *
  
   * @return {boolean}
   */
declare function NetworkCheckAccessAndAlertIfFail(): boolean;

/**
   * NETWORK_CHECK_COMMUNICATION_PRIVILEGES
   *
   * @param {number} p0
   * @return {boolean}
   */
declare function NetworkCheckCommunicationPrivileges(p0: number): boolean;

/**
   * NETWORK_CHECK_USER_CONTENT_PRIVILEGES
   *
   * @param {number} p0
   * @return {boolean}
   */
declare function NetworkCheckUserContentPrivileges(p0: number): boolean;

/**
   * NETWORK_CLEAR_CLOCK_TIME_OVERRIDE
   *
  
   * @return {void}
   */
declare function NetworkClearClockTimeOverride(): void;

/**
   * NETWORK_CLEAR_FOUND_GAMERS
   *
  
   * @return {void}
   */
declare function NetworkClearFoundGamers(): void;

/**
   * NETWORK_CLEAR_GET_GAMER_STATUS
   *
  
   * @return {void}
   */
declare function NetworkClearGetGamerStatus(): void;

/**
   * NETWORK_CLEAR_PLATFORM_INVITE
   *
  
   * @return {void}
   */
declare function NetworkClearPlatformInvite(): void;

/**
   * NETWORK_CONCEAL_PLAYER
   *
   * @param {number} player
   * @param {boolean} toggle
   * @return {void}
   */
declare function NetworkConcealPlayer(player: Player, toggle: boolean): void;

/**
   * NETWORK_DID_FIND_GAMERS_SUCCEED
   *
  
   * @return {boolean}
   */
declare function NetworkDidFindGamersSucceed(): boolean;

/**
   * NETWORK_DID_GET_GAMER_STATUS_SUCCEED
   *
  
   * @return {boolean}
   */
declare function NetworkDidGetGamerStatusSucceed(): boolean;

/**
   * NETWORK_DISABLE_LEAVE_REMOTE_PED_BEHIND
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function NetworkDisableLeaveRemotePedBehind(toggle: boolean): void;

/**
   * NETWORK_DISABLE_PROXIMITY_MIGRATION
   *
   * @param {number} netId
   * @return {void}
   */
declare function NetworkDisableProximityMigration(netID: number): void;

/**
   * NETWORK_DISABLE_REALTIME_MULTIPLAYER
   *
  
   * @return {void}
   */
declare function NetworkDisableRealtimeMultiplayer(): void;

/**
   * NETWORK_DISPLAYNAMES_FROM_HANDLES_START
   * Hardcoded to return -1.
   *
   * @param {DataView} p0
   * @param {any} p1
   * @return {number}
   */
declare function NetworkDisplaynamesFromHandlesStart(p0: DataView, p1: any): number;

/**
   * NETWORK_DOES_NETWORK_ID_EXIST
   *
   * @param {number} netId
   * @return {boolean}
   */
declare function NetworkDoesNetworkIdExist(netID: number): boolean;

/**
   * NETWORK_DOES_TUNABLE_EXIST
   *
   * @param {number} tunableContext
   * @param {number} tunableName
   * @return {boolean}
   */
declare function NetworkDoesTunableExist(tunableContext: Hash, tunableName: Hash): boolean;

/**
   * NETWORK_DUMP_NET_IF_CONFIG
   * nullsub, doesn't do anything
   *
  
   * @return {void}
   */
declare function NetworkDumpNetIfConfig(): void;

/**
   * NETWORK_END_TUTORIAL_SESSION
   *
  
   * @return {void}
   */
declare function NetworkEndTutorialSession(): void;

/**
   * NETWORK_GET_ASSISTED_DAMAGE_OF_ENTITY
   *
   * @param {number} player
   * @param {number} entity
   * @return {[boolean, number]}
   */
declare function NetworkGetAssistedDamageOfEntity(player: Player, entity: Entity): [boolean, number];

/**
   * NETWORK_GET_AVERAGE_LATENCY
   * Old name: _NETWORK_GET_AVERAGE_LATENCY_FOR_PLAYER
   *
   * @param {number} player
   * @return {number}
   */
declare function NetworkGetAverageLatency(player: Player): number;

/**
   * NETWORK_GET_AVERAGE_PACKET_LOSS
   * Old name: _NETWORK_GET_AVERAGE_PACKET_LOSS_FOR_PLAYER
   *
   * @param {number} player
   * @return {number}
   */
declare function NetworkGetAveragePacketLoss(player: Player): number;

/**
   * NETWORK_GET_AVERAGE_PING
   * Same as NETWORK_GET_AVERAGE_LATENCY (0xD414BE129BB81B32)
   * 
   * Old name: _NETWORK_GET_AVERAGE_LATENCY_FOR_PLAYER_2
   *
   * @param {number} player
   * @return {number}
   */
declare function NetworkGetAveragePing(player: Player): number;

/**
   * NETWORK_GET_DESTROYER_OF_NETWORK_ID
   *
   * @param {number} netId
   * @return {[number, number]}
   */
declare function NetworkGetDestroyerOfNetworkId(netId: number): [number, number];

/**
   * NETWORK_GET_DISPLAYNAMES_FROM_HANDLES
   * Hardcoded to return zero.
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {number}
   */
declare function NetworkGetDisplaynamesFromHandles(p0: any, p1: any, p2: any): number;

/**
   * NETWORK_GET_ENTITY_FROM_NETWORK_ID
   *
   * @param {number} netId
   * @return {number}
   */
declare function NetworkGetEntityFromNetworkId(netId: number): Entity;

/**
   * NETWORK_GET_ENTITY_IS_NETWORKED
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function NetworkGetEntityIsNetworked(entity: Entity): boolean;

/**
   * NETWORK_GET_ENTITY_KILLER_OF_PLAYER
   *
   * @param {number} player
   * @return {[Entity, number]}
   */
declare function NetworkGetEntityKillerOfPlayer(player: Player): [Entity, number];

/**
   * NETWORK_GET_GAMERTAG_FROM_HANDLE
   * Always returns a null string.
   *
   * @param {DataView} gamerHandle
   * @return {string | number}
   */
declare function NetworkGetGamertagFromHandle(gamerHandle: DataView): string | number;

/**
   * NETWORK_GET_GAME_MODE
   *
  
   * @return {number}
   */
declare function NetworkGetGameMode(): number;

/**
   * NETWORK_GET_GLOBAL_CLOCK
   *
  
   * @return {[boolean, number, number, number]}
   */
declare function NetworkGetGlobalClock(): [boolean, number, number, number];

/**
   * NETWORK_GET_GLOBAL_MULTIPLAYER_CLOCK
   *
  
   * @return {[number, number, number]}
   */
declare function NetworkGetGlobalMultiplayerClock(): [number, number, number];

/**
   * NETWORK_GET_HIGHEST_RELIABLE_RESEND_COUNT
   * Old name: _NETWORK_GET_OLDEST_RESEND_COUNT_FOR_PLAYER
   *
   * @param {number} player
   * @return {number}
   */
declare function NetworkGetHighestReliableResendCount(player: Player): number;

/**
   * NETWORK_GET_HOST_OF_SCRIPT
   *
   * @param {string | number} scriptName
   * @param {number} p1
   * @param {number} p2
   * @return {number}
   */
declare function NetworkGetHostOfScript(scriptName: string | number, p1: number, p2: number): Player;

/**
   * NETWORK_GET_HOST_OF_THIS_SCRIPT
   *
  
   * @return {number}
   */
declare function NetworkGetHostOfThisScript(): Player;

/**
   * NETWORK_GET_HOST_OF_THREAD
   *
   * @param {number} threadId
   * @return {number}
   */
declare function NetworkGetHostOfThread(threadId: number): Player;

/**
   * NETWORK_GET_INSTANCE_ID_OF_THIS_SCRIPT
   *
  
   * @return {number}
   */
declare function NetworkGetInstanceIdOfThisScript(): number;

/**
   * NETWORK_GET_LOCAL_HANDLE
   *
   * @param {DataView} gamerHandle
   * @return {void}
   */
declare function NetworkGetLocalHandle(gamerHandle: DataView): void;

/**
   * NETWORK_GET_MAX_NUM_PARTICIPANTS
   * Seems to always return 0, but it's used in quite a few loops.
   * 
   * for (num3 = 0; num3 < NETWORK::0xCCD8C02D(); num3++)
   *     {
   *         if (NETWORK::NETWORK_IS_PARTICIPANT_ACTIVE(PLAYER::0x98F3B274(num3)) != 0)
   *         {
   *             var num5 = NETWORK::NETWORK_GET_PLAYER_INDEX(PLAYER::0x98F3B274(num3));
   *
  
   * @return {number}
   */
declare function NetworkGetMaxNumParticipants(): number;

/**
   * NETWORK_GET_NETWORK_ID_FROM_ENTITY
   *
   * @param {number} entity
   * @return {number}
   */
declare function NetworkGetNetworkIdFromEntity(entity: Entity): number;

/**
   * NETWORK_GET_NETWORK_ID_FROM_ROPE_ID
   *
   * @param {number} ropeId
   * @return {number}
   */
declare function NetworkGetNetworkIdFromRopeId(ropeId: number): number;

/**
   * NETWORK_GET_NET_STATISTICS_INFO
   * nullsub, doesn't do anything
   *
  
   * @return {void}
   */
declare function NetworkGetNetStatisticsInfo(): void;

/**
   * NETWORK_GET_NP_UNAVAILABLE_REASON
   * Hardcoded to return zero.
   * 
   * ==== PS4 specific info ====
   * 
   * Returns some sort of unavailable reason:
   * -1 = REASON_INVALID
   *  0 = REASON_OTHER
   *  1 = REASON_SYSTEM_UPDATE
   *  2 = REASON_GAME_UPDATE
   *  3 = REASON_SIGNED_OUT
   *  4 = REASON_AGE
   *  5 = REASON_CONNECTION
   * 
   * =================================
   *
  
   * @return {number}
   */
declare function NetworkGetNpUnavailableReason(): number;

/**
   * NETWORK_GET_NUM_CONNECTED_PLAYERS
   * Returns the amount of players connected in the current session. Only works when connected to a session/server.
   *
  
   * @return {number}
   */
declare function NetworkGetNumConnectedPlayers(): number;

/**
   * NETWORK_GET_NUM_PARTICIPANTS
   *
  
   * @return {number}
   */
declare function NetworkGetNumParticipants(): number;

/**
   * NETWORK_GET_NUM_SCRIPT_PARTICIPANTS
   *
   * @param {string | number} scriptName
   * @param {number} instanceId
   * @param {number} position
   * @return {number}
   */
declare function NetworkGetNumScriptParticipants(scriptName: string | number, instanceId: number, position: Hash): number;

/**
   * NETWORK_GET_NUM_UNACKED_RELIABLES
   * Old name: _NETWORK_GET_NUM_UNACKED_FOR_PLAYER
   *
   * @param {number} player
   * @return {number}
   */
declare function NetworkGetNumUnackedReliables(player: Player): number;

/**
   * NETWORK_GET_PARTICIPANT_INDEX
   *
   * @param {number} index
   * @return {number}
   */
declare function NetworkGetParticipantIndex(index: number): number;

/**
   * NETWORK_GET_PLAYER_FROM_GAMER_HANDLE
   *
   * @param {DataView} gamerHandle
   * @return {number}
   */
declare function NetworkGetPlayerFromGamerHandle(gamerHandle: DataView): Player;

/**
   * NETWORK_GET_PLAYER_INDEX
   *
   * @param {number} player
   * @return {number}
   */
declare function NetworkGetPlayerIndex(player: Player): number;

/**
   * NETWORK_GET_PLAYER_INDEX_FROM_PED
   * Returns the Player associated to a given Ped when in an online session.
   *
   * @param {number} ped
   * @return {number}
   */
declare function NetworkGetPlayerIndexFromPed(ped: Ped): Player;

/**
   * NETWORK_GET_PROMOTION_DLG_SEEN_COUNT
   * Hardcoded to return zero.
   *
  
   * @return {number}
   */
declare function NetworkGetPromotionDlgSeenCount(): number;

/**
   * NETWORK_GET_RANDOM_INT_RANGED
   *
   * @param {number} rangeStart
   * @param {number} rangeEnd
   * @return {number}
   */
declare function NetworkGetRandomIntRanged(rangeStart: number, rangeEnd: number): number;

/**
   * NETWORK_GET_RECENT_GAMER_NAMES
   *
   * @param {number} p0
   * @param {number} p1
   * @param {DataView} outData
   * @param {number} dataSize
   * @return {boolean}
   */
declare function NetworkGetRecentGamerNames(p0: number, p1: number, outData: DataView, dataSize: number): boolean;

/**
   * NETWORK_GET_ROPE_ID_FROM_NETWORK_ID
   *
   * @param {number} netId
   * @return {number}
   */
declare function NetworkGetRopeIdFromNetworkId(netId: number): number;

/**
   * NETWORK_GET_SCRIPT_STATUS
   *
  
   * @return {number}
   */
declare function NetworkGetScriptStatus(): number;

/**
   * NETWORK_GET_THIS_SCRIPT_IS_NETWORK_SCRIPT
   *
  
   * @return {boolean}
   */
declare function NetworkGetThisScriptIsNetworkScript(): boolean;

/**
   * NETWORK_GET_TIMEOUT_TIME
   *
  
   * @return {number}
   */
declare function NetworkGetTimeoutTime(): number;

/**
   * NETWORK_GET_TOTAL_NUM_FRIENDS
   *
  
   * @return {number}
   */
declare function NetworkGetTotalNumFriends(): number;

/**
   * NETWORK_GET_TOTAL_NUM_PLAYERS
   *
  
   * @return {number}
   */
declare function NetworkGetTotalNumPlayers(): number;

/**
   * NETWORK_GET_TUNABLE_CLOUD_CRC
   *
  
   * @return {number}
   */
declare function NetworkGetTunableCloudCrc(): number;

/**
   * NETWORK_GET_UNRELIABLE_RESEND_COUNT
   * Old name: _NETWORK_GET_UNRELIABLE_RESEND_COUNT_FOR_PLAYER
   *
   * @param {number} player
   * @return {number}
   */
declare function NetworkGetUnreliableResendCount(player: Player): number;

/**
   * NETWORK_HANDLE_FROM_FRIEND
   *
   * @param {number} friendIndex
   * @param {DataView} gamerHandle
   * @return {void}
   */
declare function NetworkHandleFromFriend(friendIndex: number, gamerHandle: DataView): void;

/**
   * NETWORK_HANDLE_FROM_PLAYER
   *
   * @param {number} player
   * @param {DataView} gamerHandle
   * @return {void}
   */
declare function NetworkHandleFromPlayer(player: Player, gamerHandle: DataView): void;

/**
   * NETWORK_HASH_FROM_PLAYER_HANDLE
   *
   * @param {number} player
   * @return {number}
   */
declare function NetworkHashFromPlayerHandle(player: Player): number;

/**
   * NETWORK_HAS_CONTROL_OF_ENTITY
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function NetworkHasControlOfEntity(entity: Entity): boolean;

/**
   * NETWORK_HAS_CONTROL_OF_NETWORK_ID
   *
   * @param {number} netId
   * @return {boolean}
   */
declare function NetworkHasControlOfNetworkId(netId: number): boolean;

/**
   * NETWORK_HAS_CONTROL_OF_PICKUP
   *
   * @param {number} pickup
   * @return {boolean}
   */
declare function NetworkHasControlOfPickup(pickup: Pickup): boolean;

/**
   * NETWORK_HAS_CONTROL_OF_PICKUP_PLACEMENT
   *
   * @param {any} p0
   * @return {boolean}
   */
declare function NetworkHasControlOfPickupPlacement(p0: any): boolean;

/**
   * NETWORK_HAS_ENTITY_BEEN_REGISTERED_WITH_THIS_THREAD
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function NetworkHasEntityBeenRegisteredWithThisThread(entity: Entity): boolean;

/**
   * NETWORK_HAS_PENDING_INVITE_FAILURE
   *
  
   * @return {boolean}
   */
declare function NetworkHasPendingInviteFailure(): boolean;

/**
   * NETWORK_HAS_RECEIVED_HOST_BROADCAST_DATA
   *
  
   * @return {boolean}
   */
declare function NetworkHasReceivedHostBroadcastData(): boolean;

/**
   * NETWORK_HAS_ROS_PRIVILEGE
   *
   * @param {number} index
   * @return {boolean}
   */
declare function NetworkHasRosPrivilege(index: number): boolean;

/**
   * NETWORK_HAS_SOCIAL_CLUB_ACCOUNT
   *
  
   * @return {boolean}
   */
declare function NetworkHasSocialClubAccount(): boolean;

/**
   * NETWORK_HAS_VALID_ROS_CREDENTIALS
   * Returns whether the signed-in user has valid Rockstar Online Services (ROS) credentials.
   *
  
   * @return {boolean}
   */
declare function NetworkHasValidRosCredentials(): boolean;

/**
   * NETWORK_HAVE_ONLINE_PRIVILEGES
   *
  
   * @return {boolean}
   */
declare function NetworkHaveOnlinePrivileges(): boolean;

/**
   * NETWORK_HAVE_ROS_BANNED_PRIV
   *
  
   * @return {boolean}
   */
declare function NetworkHaveRosBannedPriv(): boolean;

/**
   * NETWORK_IS_AIM_CAM_ACTIVE
   *
   * @param {number} player
   * @return {boolean}
   */
declare function NetworkIsAimCamActive(player: Player): boolean;

/**
   * NETWORK_IS_CLOCK_TIME_OVERRIDDEN
   *
  
   * @return {boolean}
   */
declare function NetworkIsClockTimeOverridden(): boolean;

/**
   * NETWORK_IS_CLOUD_AVAILABLE
   *
  
   * @return {boolean}
   */
declare function NetworkIsCloudAvailable(): boolean;

/**
   * NETWORK_IS_CONNECTED_VIA_RELAY
   * Old name: _NETWORK_IS_CONNECTION_ENDPOINT_RELAY_SERVER
   *
   * @param {number} player
   * @return {boolean}
   */
declare function NetworkIsConnectedViaRelay(player: Player): boolean;

/**
   * NETWORK_IS_CUSTOM_UPSELL_ENABLED
   * Hardcoded to return false.
   *
  
   * @return {boolean}
   */
declare function NetworkIsCustomUpsellEnabled(): boolean;

/**
   * NETWORK_IS_FEATURE_SUPPORTED
   *
   * @param {number} featureId
   * @return {boolean}
   */
declare function NetworkIsFeatureSupported(featureId: number): boolean;

/**
   * NETWORK_IS_FINDING_GAMERS
   *
  
   * @return {boolean}
   */
declare function NetworkIsFindingGamers(): boolean;

/**
   * NETWORK_IS_FRIEND
   *
   * @param {DataView} gamerHandle
   * @return {boolean}
   */
declare function NetworkIsFriend(gamerHandle: DataView): boolean;

/**
   * NETWORK_IS_GAMER_IN_MY_SESSION
   *
   * @param {DataView} gamerHandle
   * @return {boolean}
   */
declare function NetworkIsGamerInMySession(gamerHandle: DataView): boolean;

/**
   * NETWORK_IS_GAME_IN_PROGRESS
   *
  
   * @return {boolean}
   */
declare function NetworkIsGameInProgress(): boolean;

/**
   * NETWORK_IS_HANDLE_VALID
   *
   * @param {DataView} gamerHandle
   * @return {boolean}
   */
declare function NetworkIsHandleValid(gamerHandle: DataView): boolean;

/**
   * NETWORK_IS_HOST
   * If you are host, returns true else returns false.
   *
  
   * @return {boolean}
   */
declare function NetworkIsHost(): boolean;

/**
   * NETWORK_IS_HOST_OF_THIS_SCRIPT
   *
  
   * @return {boolean}
   */
declare function NetworkIsHostOfThisScript(): boolean;

/**
   * NETWORK_IS_IN_MP_CUTSCENE
   *
  
   * @return {boolean}
   */
declare function NetworkIsInMpCutscene(): boolean;

/**
   * NETWORK_IS_IN_PLATFORM_PARTY
   * Hardcoded to return false.
   *
  
   * @return {boolean}
   */
declare function NetworkIsInPlatformParty(): boolean;

/**
   * NETWORK_IS_IN_PLATFORM_PARTY_CHAT
   * Hardcoded to return false.
   *
  
   * @return {boolean}
   */
declare function NetworkIsInPlatformPartyChat(): boolean;

/**
   * NETWORK_IS_IN_SESSION
   *
  
   * @return {boolean}
   */
declare function NetworkIsInSession(): boolean;

/**
   * NETWORK_IS_IN_SPECTATOR_MODE
   *
  
   * @return {boolean}
   */
declare function NetworkIsInSpectatorMode(): boolean;

/**
   * NETWORK_IS_IN_TUTORIAL_SESSION
   *
  
   * @return {boolean}
   */
declare function NetworkIsInTutorialSession(): boolean;

/**
   * NETWORK_IS_PARTICIPANT_ACTIVE
   *
   * @param {number} p0
   * @return {boolean}
   */
declare function NetworkIsParticipantActive(p0: number): boolean;

/**
   * NETWORK_IS_PENDING_FRIEND
   * Hardcoded to return false.
   *
   * @param {DataView} gamerHandle
   * @return {boolean}
   */
declare function NetworkIsPendingFriend(gamerHandle: DataView): boolean;

/**
   * NETWORK_IS_PLATFORM_INVITE_PENDING
   *
  
   * @return {boolean}
   */
declare function NetworkIsPlatformInvitePending(): boolean;

/**
   * NETWORK_IS_PLAYER_ACTIVE
   *
   * @param {number} player
   * @return {boolean}
   */
declare function NetworkIsPlayerActive(player: Player): boolean;

/**
   * NETWORK_IS_PLAYER_A_PARTICIPANT
   *
   * @param {number} player
   * @return {boolean}
   */
declare function NetworkIsPlayerAParticipant(player: Player): boolean;

/**
   * NETWORK_IS_PLAYER_A_PARTICIPANT_ON_SCRIPT
   *
   * @param {number} p0
   * @param {DataView} p1
   * @param {any} p2
   * @return {boolean}
   */
declare function NetworkIsPlayerAParticipantOnScript(p0: Player, p1: DataView, p2: any): boolean;

/**
   * NETWORK_IS_PLAYER_CONCEALED
   *
   * @param {number} player
   * @return {boolean}
   */
declare function NetworkIsPlayerConcealed(player: Player): boolean;

/**
   * NETWORK_IS_PLAYER_CONNECTED
   *
   * @param {number} player
   * @return {boolean}
   */
declare function NetworkIsPlayerConnected(player: Player): boolean;

/**
   * NETWORK_IS_PLAYER_INDEX_VALID
   * Returns true if the passed value is less than 32.
   *
   * @param {number} player
   * @return {boolean}
   */
declare function NetworkIsPlayerIndexValid(player: Player): boolean;

/**
   * NETWORK_IS_PLAYER_IN_MP_CUTSCENE
   * Note: scripts seem to indicate that this was renamed to NETWORK_IS_PLAYER_IN_MP_FAST_INSTANCE
   *
   * @param {number} player
   * @return {boolean}
   */
declare function NetworkIsPlayerInMpCutscene(player: Player): boolean;

/**
   * NETWORK_IS_PROMOTION_ENABLED
   * Hardcoded to return false.
   *
  
   * @return {boolean}
   */
declare function NetworkIsPromotionEnabled(): boolean;

/**
   * NETWORK_IS_RESETTING_POPULATION
   *
  
   * @return {boolean}
   */
declare function NetworkIsResettingPopulation(): boolean;

/**
   * NETWORK_IS_SCRIPT_ACTIVE
   *
   * @param {string | number} scriptName
   * @param {number} p1
   * @param {boolean} p2
   * @param {number} p3
   * @return {boolean}
   */
declare function NetworkIsScriptActive(scriptName: string | number, p1: number, p2: boolean, p3: number): boolean;

/**
   * NETWORK_IS_SCRIPT_ACTIVE_BY_HASH
   *
   * @param {number} scriptHash
   * @param {number} p1
   * @param {boolean} p2
   * @param {number} p3
   * @return {boolean}
   */
declare function NetworkIsScriptActiveByHash(scriptHash: Hash, p1: number, p2: boolean, p3: number): boolean;

/**
   * NETWORK_IS_SESSION_ACTIVE
   *
  
   * @return {boolean}
   */
declare function NetworkIsSessionActive(): boolean;

/**
   * NETWORK_IS_SESSION_STARTED
   *
  
   * @return {boolean}
   */
declare function NetworkIsSessionStarted(): boolean;

/**
   * NETWORK_IS_SIGNED_ONLINE
   *
  
   * @return {boolean}
   */
declare function NetworkIsSignedOnline(): boolean;

/**
   * NETWORK_IS_TUNABLE_CLOUD_REQUEST_PENDING
   *
  
   * @return {boolean}
   */
declare function NetworkIsTunableCloudRequestPending(): boolean;

/**
   * NETWORK_IS_TUTORIAL_SESSION_CHANGE_PENDING
   *
  
   * @return {boolean}
   */
declare function NetworkIsTutorialSessionChangePending(): boolean;

/**
   * NETWORK_PREVENT_SCRIPT_HOST_MIGRATION
   *
  
   * @return {void}
   */
declare function NetworkPreventScriptHostMigration(): void;

/**
   * NETWORK_REFRESH_CURRENT_FRIEND_PAGE
   *
  
   * @return {boolean}
   */
declare function NetworkRefreshCurrentFriendPage(): boolean;

/**
   * NETWORK_REGISTER_ENTITY_AS_NETWORKED
   *
   * @param {number} entity
   * @return {void}
   */
declare function NetworkRegisterEntityAsNetworked(entity: Entity): void;

/**
   * NETWORK_REGISTER_HOST_BROADCAST_VARIABLES
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function NetworkRegisterHostBroadcastVariables(p0: any, p1: any, p2: any): void;

/**
   * NETWORK_REGISTER_PLAYER_BROADCAST_VARIABLES
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function NetworkRegisterPlayerBroadcastVariables(p0: any, p1: any, p2: any): void;

/**
   * NETWORK_REQUEST_CLOUD_TUNABLES
   * Note: this native was added in build 1311.23, but was only used after build 1436.25
   *
  
   * @return {void}
   */
declare function NetworkRequestCloudTunables(): void;

/**
   * NETWORK_REQUEST_CONTROL_OF_ENTITY
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function NetworkRequestControlOfEntity(entity: Entity): boolean;

/**
   * NETWORK_REQUEST_CONTROL_OF_NETWORK_ID
   *
   * @param {number} netId
   * @return {boolean}
   */
declare function NetworkRequestControlOfNetworkId(netId: number): boolean;

/**
   * NETWORK_REQUEST_CONTROL_OF_PICKUP_PLACEMENT
   *
   * @param {any} p0
   * @return {boolean}
   */
declare function NetworkRequestControlOfPickupPlacement(p0: any): boolean;

/**
   * NETWORK_REQUEST_JOIN
   *
   * @param {any} p0
   * @return {number}
   */
declare function NetworkRequestJoin(p0: any): number;

/**
   * NETWORK_REQUEST_RECENT_GAMER_NAMES
   *
   * @param {number} p0
   * @param {number} playerCount
   * @return {boolean}
   */
declare function NetworkRequestRecentGamerNames(p0: number, playerCount: number): boolean;

/**
   * NETWORK_REQUEST_SESSION_SEAMLESS
   * flags:
   * enum eSessionRequestOptionFlags
   * {
   *   SESSION_REQUEST_OPTION_FLAG_INCLUDE_GANG_MEMBERS = (1 << 1),
   *   SESSION_REQUEST_OPTION_FLAG_LEADER_KEEPS_GANG = (1 << 7),
   * };
   * 
   * seamlessType:
   * enum eSeamlessType
   * {
   *   SEAMLESS_TYPE_NORMAL,
   *   SEAMLESS_TYPE_PVE,
   *   SEAMLESS_TYPE_DEV,
   *   SEAMLESS_TYPE_NO_SEAMLESS
   * };
   *
   * @param {number} flags
   * @param {number} seamlessType
   * @param {DataView} sessionRequestId
   * @return {boolean}
   */
declare function NetworkRequestSessionSeamless(flags: number, seamlessType: number, sessionRequestId: DataView): boolean;

/**
   * NETWORK_RESET_POPULATION
   *
   * @param {boolean} p0
   * @param {number} p1
   * @return {boolean}
   */
declare function NetworkResetPopulation(p0: boolean, p1: number): boolean;

/**
   * NETWORK_RESURRECT_LOCAL_PLAYER
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} heading
   * @param {number} p4
   * @param {boolean} p5
   * @param {any} p6
   * @param {boolean} p7
   * @return {void}
   */
declare function NetworkResurrectLocalPlayer(x: number, y: number, z: number, heading: number, p4: number, p5: boolean, p6: any, p7: boolean): void;

/**
   * NETWORK_SEED_RANDOM_NUMBER_GENERATOR
   *
   * @param {number} seed
   * @return {void}
   */
declare function NetworkSeedRandomNumberGenerator(seed: number): void;

/**
   * NETWORK_SESSION_GET_SESSION_FLAGS
   *
  
   * @return {number}
   */
declare function NetworkSessionGetSessionFlags(): number;

/**
   * NETWORK_SESSION_GET_SESSION_TYPE
   *
  
   * @return {number}
   */
declare function NetworkSessionGetSessionType(): number;

/**
   * NETWORK_SESSION_IS_ANY_REQUEST_IN_PROGRESS
   *
  
   * @return {boolean}
   */
declare function NetworkSessionIsAnyRequestInProgress(): boolean;

/**
   * NETWORK_SESSION_IS_PRIVATE
   * Checks for session flag 'SF_PRIVATE'
   *
  
   * @return {boolean}
   */
declare function NetworkSessionIsPrivate(): boolean;

/**
   * NETWORK_SESSION_IS_REQUEST_IN_PROGRESS
   *
   * @param {DataView} sessionRequestId
   * @return {boolean}
   */
declare function NetworkSessionIsRequestInProgress(sessionRequestId: DataView): boolean;

/**
   * NETWORK_SESSION_IS_REQUEST_PENDING_TRANSITION
   *
   * @param {DataView} sessionRequestId
   * @return {boolean}
   */
declare function NetworkSessionIsRequestPendingTransition(sessionRequestId: DataView): boolean;

/**
   * NETWORK_SESSION_IS_SESSION_REQUEST_ID_VALID
   *
   * @param {DataView} sessionRequestId
   * @return {boolean}
   */
declare function NetworkSessionIsSessionRequestIdValid(sessionRequestId: DataView): boolean;

/**
   * NETWORK_SESSION_IS_TRANSITIONING
   *
  
   * @return {boolean}
   */
declare function NetworkSessionIsTransitioning(): boolean;

/**
   * NETWORK_SESSION_LEAVE_SESSION
   *
  
   * @return {boolean}
   */
declare function NetworkSessionLeaveSession(): boolean;

/**
   * NETWORK_SESSION_LEFT_QUEUE_OR_REQUESTED_SESSION
   *
   * @param {DataView} sessionRequestId
   * @return {boolean}
   */
declare function NetworkSessionLeftQueueOrRequestedSession(sessionRequestId: DataView): boolean;

/**
   * NETWORK_SESSION_REMOVE_SESSION_FLAGS
   * See _NETWORK_SESSION_ADD_SESSION_FLAGS
   *
   * @param {number} flags
   * @return {boolean}
   */
declare function NetworkSessionRemoveSessionFlags(flags: number): boolean;

/**
   * NETWORK_SESSION_REQUEST_SESSION_COMPETITIVE
   * matchType:
   * enum eMatchType
   * {
   *   MATCHTYPE_DEPRECATED,
   *   MATCHTYPE_UGCPLAYLIST,
   *   MATCHTYPE_UGCMISSION,
   *   MATCHTYPE_MINIGAME,
   *   MATCHTYPE_SEAMLESS,
   *   MATCHTYPE_PRIVATE_DO_NOT_USE
   * };
   *
   * @param {number} flags
   * @param {number} matchType
   * @param {number} userHash
   * @param {number} p3
   * @param {DataView} sessionRequestId
   * @return {boolean}
   */
declare function NetworkSessionRequestSessionCompetitive(flags: number, matchType: number, userHash: number, p3: number, sessionRequestId: DataView): boolean;

/**
   * NETWORK_SESSION_REQUEST_SESSION_PRIVATE
   * Session flag 'SF_PRIVATE' is set internally
   * p1 represents max amount of players in private session
   *
   * @param {number} flags
   * @param {number} numPlayers
   * @param {number} userHash
   * @param {DataView} sessionRequestId
   * @return {boolean}
   */
declare function NetworkSessionRequestSessionPrivate(flags: number, numPlayers: number, userHash: number, sessionRequestId: DataView): boolean;

/**
   * NETWORK_SESSION_REQUEST_SESSION_SEAMLESS
   * Equivalent to NETWORK_REQUEST_SESSION_SEAMLESS if userHash == 0.
   * Otherwise it is equivalent to NETWORK_SESSION_REQUEST_SESSION_COMPETITIVE(flags, MATCHTYPE_SEAMLESS, userHash, 0, sessionRequestId);
   * 
   * p1 is unused
   *
   * @param {number} flags
   * @param {number} seamlessType
   * @param {number} userHash
   * @param {DataView} sessionRequestId
   * @return {boolean}
   */
declare function NetworkSessionRequestSessionSeamless(flags: number, seamlessType: number, userHash: number, sessionRequestId: DataView): boolean;

/**
   * NETWORK_SET_COMPLETED_MP_INTRO_FLOW_ON_CURRENT_SLOT
   *
   * @param {boolean} completed
   * @return {boolean}
   */
declare function NetworkSetCompletedMpIntroFlowOnCurrentSlot(completed: boolean): boolean;

/**
   * NETWORK_SET_ENTITY_ONLY_EXISTS_FOR_PARTICIPANTS
   * if set to true other network players can't see it
   * if set to false other network player can see it
   * =========================================
   * ^^ I attempted this by grabbing an object with GET_ENTITY_PLAYER_IS_FREE_AIMING_AT and setting this naive no matter the toggle he could still see it.
   * 
   * pc or last gen?
   * 
   * ^^ last-gen
   * 
   * Old name: _NETWORK_SET_ENTITY_INVISIBLE_TO_NETWORK
   *
   * @param {number} entity
   * @param {boolean} toggle
   * @return {void}
   */
declare function NetworkSetEntityOnlyExistsForParticipants(entity: Entity, toggle: boolean): void;

/**
   * NETWORK_SET_ENTITY_REMAINS_WHEN_UNNETWORKED
   *
   * @param {number} entity
   * @param {boolean} toggle
   * @return {void}
   */
declare function NetworkSetEntityRemainsWhenUnnetworked(entity: Entity, toggle: boolean): void;

/**
   * NETWORK_SET_FRIENDLY_FIRE_OPTION
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function NetworkSetFriendlyFireOption(toggle: boolean): void;

/**
   * NETWORK_SET_IN_MP_CUTSCENE
   *
   * @param {boolean} p0
   * @param {boolean} p1
   * @param {number} p2
   * @param {boolean} p3
   * @return {void}
   */
declare function NetworkSetInMpCutscene(p0: boolean, p1: boolean, p2: number, p3: boolean): void;

/**
   * NETWORK_SET_IN_SPECTATOR_MODE
   *
   * @param {boolean} toggle
   * @param {number} playerPed
   * @return {void}
   */
declare function NetworkSetInSpectatorMode(toggle: boolean, playerPed: Ped): void;

/**
   * NETWORK_SET_LOCAL_PLAYER_INVINCIBLE_TIME
   *
   * @param {number} time
   * @return {void}
   */
declare function NetworkSetLocalPlayerInvincibleTime(time: number): void;

/**
   * NETWORK_SET_LOCAL_PLAYER_PENDING_FAST_INSTANCE_ID
   *
   * @param {number} instanceId
   * @return {void}
   */
declare function NetworkSetLocalPlayerPendingFastInstanceId(instanceId: number): void;

/**
   * NETWORK_SET_LOCAL_PLAYER_SYNC_LOOK_AT
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function NetworkSetLocalPlayerSyncLookAt(toggle: boolean): void;

/**
   * NETWORK_SET_MISSION_FINISHED
   *
  
   * @return {void}
   */
declare function NetworkSetMissionFinished(): void;

/**
   * NETWORK_SET_MP_MISSION_FLAG_ON_CURRENT_SLOT
   *
   * @param {boolean} enabled
   * @param {number} flagIndex
   * @return {boolean}
   */
declare function NetworkSetMpMissionFlagOnCurrentSlot(enabled: boolean, flagIndex: number): boolean;

/**
   * NETWORK_SET_PLAYER_IS_PASSIVE
   * Old name: _NETWORK_SET_PASSIVE_MODE_OPTION
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function NetworkSetPlayerIsPassive(toggle: boolean): void;

/**
   * NETWORK_SET_RECENT_GAMERS_ENABLED
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function NetworkSetRecentGamersEnabled(toggle: boolean): void;

/**
   * NETWORK_SET_RICH_PRESENCE
   *
   * @param {number} p0
   * @param {DataView} p1
   * @param {number} p2
   * @param {number} p3
   * @return {void}
   */
declare function NetworkSetRichPresence(p0: number, p1: DataView, p2: number, p3: number): void;

/**
   * NETWORK_SET_SCRIPT_READY_FOR_EVENTS
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function NetworkSetScriptReadyForEvents(toggle: boolean): void;

/**
   * NETWORK_SET_THIS_SCRIPT_IS_NETWORK_SCRIPT
   *
   * @param {number} maxNumMissionParticipants
   * @param {boolean} p1
   * @param {number} instanceId
   * @return {void}
   */
declare function NetworkSetThisScriptIsNetworkScript(maxNumMissionParticipants: number, p1: boolean, instanceId: number): void;

/**
   * NETWORK_SHOULD_SHOW_PROMOTION_DLG
   * Hardcoded to return false.
   *
  
   * @return {boolean}
   */
declare function NetworkShouldShowPromotionDlg(): boolean;

/**
   * NETWORK_SHOW_ACCOUNT_UPGRADE_UI
   *
  
   * @return {void}
   */
declare function NetworkShowAccountUpgradeUi(): void;

/**
   * NETWORK_SHOW_CHAT_RESTRICTION_MSC
   * nullsub, doesn't do anything
   *
   * @param {number} player
   * @return {void}
   */
declare function NetworkShowChatRestrictionMsc(player: Player): void;

/**
   * NETWORK_SHOW_PROFILE_UI
   *
   * @param {DataView} gamerHandle
   * @return {void}
   */
declare function NetworkShowProfileUi(gamerHandle: DataView): void;

/**
   * NETWORK_SHOW_PSN_UGC_RESTRICTION
   * nullsub, doesn't do anything
   *
  
   * @return {void}
   */
declare function NetworkShowPsnUgcRestriction(): void;

/**
   * NETWORK_SPAWN_CONFIG_SET_FLAGS
   *
   * @param {number} flags
   * @return {void}
   */
declare function NetworkSpawnConfigSetFlags(flags: number): void;

/**
   * NETWORK_SPAWN_CONFIG_SET_GROUND_TO_ROOT_OFFSET
   *
   * @param {number} offset
   * @return {void}
   */
declare function NetworkSpawnConfigSetGroundToRootOffset(offset: number): void;

/**
   * NETWORK_SPAWN_CONFIG_SET_TUNING_FLOAT
   *
   * @param {number} p0
   * @param {number} p1
   * @return {void}
   */
declare function NetworkSpawnConfigSetTuningFloat(p0: Hash, p1: number): void;

/**
   * NETWORK_START_SOLO_TUTORIAL_SESSION
   *
  
   * @return {void}
   */
declare function NetworkStartSoloTutorialSession(): void;

/**
   * NETWORK_START_USER_CONTENT_PERMISSIONS_CHECK
   * Always returns -1. Seems to be XB1 specific.
   *
   * @param {DataView} gamerHandle
   * @return {number}
   */
declare function NetworkStartUserContentPermissionsCheck(gamerHandle: DataView): number;

/**
   * NETWORK_TRIGGER_DAMAGE_EVENT_FOR_ZERO_DAMAGE
   * Old name: _NETWORK_SET_VEHICLE_WHEELS_DESTRUCTIBLE
   *
   * @param {number} entity
   * @param {boolean} p1
   * @return {void}
   */
declare function NetworkTriggerDamageEventForZeroDamage(entity: Entity, p1: boolean): void;

/**
   * NETWORK_TRY_ACCESS_TUNABLE_BOOL_HASH
   *
   * @param {number} tunableContext
   * @param {number} tunableName
   * @param {boolean} defaultValue
   * @return {boolean}
   */
declare function NetworkTryAccessTunableBoolHash(tunableContext: Hash, tunableName: Hash, defaultValue: boolean): boolean;

/**
   * NETWORK_TRY_ACCESS_TUNABLE_FLOAT_HASH
   *
   * @param {number} tunableContext
   * @param {number} tunableName
   * @param {number} defaultValue
   * @return {number}
   */
declare function NetworkTryAccessTunableFloatHash(tunableContext: Hash, tunableName: Hash, defaultValue: number): number;

/**
   * NETWORK_TRY_ACCESS_TUNABLE_INT_HASH
   *
   * @param {number} tunableContext
   * @param {number} tunableName
   * @param {number} defaultValue
   * @return {number}
   */
declare function NetworkTryAccessTunableIntHash(tunableContext: Hash, tunableName: Hash, defaultValue: number): number;

/**
   * NET_TO_ENT
   * gets the entity id of a network id
   *
   * @param {number} netHandle
   * @return {number}
   */
declare function NetToEnt(netHandle: number): Entity;

/**
   * NET_TO_OBJ
   * gets the object id of a network id
   *
   * @param {number} netHandle
   * @return {number}
   */
declare function NetToObj(netHandle: number): number;

/**
   * NET_TO_PED
   * gets the ped id of a network id
   *
   * @param {number} netHandle
   * @return {number}
   */
declare function NetToPed(netHandle: number): Ped;

/**
   * NET_TO_VEH
   *
   * @param {number} netHandle
   * @return {number}
   */
declare function NetToVeh(netHandle: number): Vehicle;

/**
   * OBJ_TO_NET
   * Returns the network ID of the given object.
   *
   * @param {number} object
   * @return {number}
   */
declare function ObjToNet(object: number): number;

/**
   * PARTICIPANT_ID
   * Return the local Participant ID
   *
  
   * @return {number}
   */
declare function ParticipantId(): Player;

/**
   * PARTICIPANT_ID_TO_INT
   * Return the local Participant ID.
   * 
   * This native is exactly the same as 'PARTICIPANT_ID' native.
   *
  
   * @return {number}
   */
declare function ParticipantIdToInt(): number;

/**
   * PED_TO_NET
   * Returns the network ID of the given ped.
   *
   * @param {number} ped
   * @return {number}
   */
declare function PedToNet(ped: Ped): number;

/**
   * PREVENT_MIGRATION_OF_ENTITIES_IN_FAST_INSTANCE_FOR_LOCAL_PLAYER
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function PreventMigrationOfEntitiesInFastInstanceForLocalPlayer(toggle: boolean): void;

/**
   * PREVENT_NETWORK_ID_MIGRATION
   *
   * @param {number} netId
   * @return {void}
   */
declare function PreventNetworkIdMigration(netId: number): void;

/**
   * RESERVE_NETWORK_CLIENT_MISSION_OBJECTS
   *
   * @param {number} amount
   * @return {void}
   */
declare function ReserveNetworkClientMissionObjects(amount: number): void;

/**
   * RESERVE_NETWORK_CLIENT_MISSION_PEDS
   *
   * @param {number} amount
   * @return {void}
   */
declare function ReserveNetworkClientMissionPeds(amount: number): void;

/**
   * RESERVE_NETWORK_MISSION_OBJECTS
   *
   * @param {number} amount
   * @return {void}
   */
declare function ReserveNetworkMissionObjects(amount: number): void;

/**
   * RESERVE_NETWORK_MISSION_PEDS
   *
   * @param {number} amount
   * @return {void}
   */
declare function ReserveNetworkMissionPeds(amount: number): void;

/**
   * RESERVE_NETWORK_MISSION_PICKUPS
   *
   * @param {number} amount
   * @return {void}
   */
declare function ReserveNetworkMissionPickups(amount: number): void;

/**
   * RESERVE_NETWORK_MISSION_VEHICLES
   *
   * @param {number} amount
   * @return {void}
   */
declare function ReserveNetworkMissionVehicles(amount: number): void;

/**
   * SET_ENTITY_VISIBLE_IN_CUTSCENE
   *
   * @param {number} entity
   * @param {boolean} p1
   * @param {boolean} p2
   * @param {number} p3
   * @return {void}
   */
declare function SetEntityVisibleInCutscene(entity: Entity, p1: boolean, p2: boolean, p3: number): void;

/**
   * SET_LOCAL_PLAYER_AS_GHOST
   * Old name: _SET_LOCAL_PLAYER_AS_GHOST
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetLocalPlayerAsGhost(toggle: boolean): void;

/**
   * SET_LOCAL_PLAYER_INVISIBLE_LOCALLY
   *
   * @param {boolean} p0
   * @return {void}
   */
declare function SetLocalPlayerInvisibleLocally(p0: boolean): void;

/**
   * SET_LOCAL_PLAYER_VISIBLE_IN_CUTSCENE
   *
   * @param {boolean} local
   * @param {boolean} remote
   * @param {number} instanceId
   * @return {void}
   */
declare function SetLocalPlayerVisibleInCutscene(local: boolean, remote: boolean, instanceId: number): void;

/**
   * SET_NETWORK_ID_ALWAYS_EXISTS_FOR_PLAYER
   *
   * @param {number} netId
   * @param {number} player
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetNetworkIdAlwaysExistsForPlayer(netId: number, player: Player, toggle: boolean): void;

/**
   * SET_NETWORK_ID_EXISTS_ON_ALL_MACHINES
   *
   * @param {number} netId
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetNetworkIdExistsOnAllMachines(netId: number, toggle: boolean): void;

/**
   * SET_NETWORK_ID_STOP_CLONING
   *
   * @param {number} networkId
   * @param {boolean} bStopCloning
   * @return {void}
   */
declare function SetNetworkIdStopCloning(networkId: number, bStopCloning: boolean): void;

/**
   * SET_NETWORK_ID_VISIBLE_IN_CUTSCENE
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function SetNetworkIdVisibleInCutscene(p0: any, p1: any, p2: any, p3: any): void;

/**
   * SET_PLAYER_INVISIBLE_LOCALLY
   *
   * @param {number} player
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPlayerInvisibleLocally(player: Player, toggle: boolean): void;

/**
   * SET_PLAYER_VISIBLE_LOCALLY
   *
   * @param {number} player
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPlayerVisibleLocally(player: Player, toggle: boolean): void;

/**
   * TEXTURE_DOWNLOAD_GET_NAME
   *
   * @param {number} textureDownloadId
   * @return {string | number}
   */
declare function TextureDownloadGetName(textureDownloadId: number): string | number;

/**
   * TEXTURE_DOWNLOAD_RELEASE
   *
   * @param {number} textureDownloadId
   * @return {void}
   */
declare function TextureDownloadRelease(textureDownloadId: number): void;

/**
   * TEXTURE_DOWNLOAD_REQUEST
   * Returns textureDownloadId
   *
   * @param {DataView} gamerHandle
   * @param {string | number} filePath
   * @param {string | number} name
   * @param {boolean} p3
   * @return {number}
   */
declare function TextureDownloadRequest(gamerHandle: DataView, filePath: string | number, name: string | number, p3: boolean): number;

/**
   * UGC_CLEAR_QUERY_RESULTS
   *
   * @param {number} ugcRequestId
   * @return {void}
   */
declare function UgcClearQueryResults(ugcRequestId: number): void;

/**
   * UGC_DID_DESCRIPTION_REQUEST_SUCCEED
   *
   * @param {number} description
   * @return {boolean}
   */
declare function UgcDidDescriptionRequestSucceed(description: Hash): boolean;

/**
   * UGC_DID_REQUEST_SUCCEED
   *
   * @param {number} ugcRequestId
   * @return {boolean}
   */
declare function UgcDidRequestSucceed(ugcRequestId: number): boolean;

/**
   * UGC_GET_CACHED_DESCRIPTION
   *
   * @param {number} description
   * @param {number} length
   * @return {string | number}
   */
declare function UgcGetCachedDescription(description: Hash, length: number): string | number;

/**
   * UGC_HAS_DESCRIPTION_REQUEST_FINISHED
   *
   * @param {number} description
   * @return {boolean}
   */
declare function UgcHasDescriptionRequestFinished(description: Hash): boolean;

/**
   * UGC_HAS_REQUEST_FINISHED
   *
   * @param {number} ugcRequestId
   * @return {boolean}
   */
declare function UgcHasRequestFinished(ugcRequestId: number): boolean;

/**
   * UGC_IS_DESCRIPTION_REQUEST_IN_PROGRESS
   *
   * @param {number} description
   * @return {boolean}
   */
declare function UgcIsDescriptionRequestInProgress(description: Hash): boolean;

/**
   * UGC_IS_LANGUAGE_SUPPORTED
   *
   * @param {number} languageId
   * @return {boolean}
   */
declare function UgcIsLanguageSupported(languageId: number): boolean;

/**
   * UGC_IS_REQUEST_PENDING
   *
   * @param {number} ugcRequestId
   * @return {boolean}
   */
declare function UgcIsRequestPending(ugcRequestId: number): boolean;

/**
   * UGC_QUERY_GET_CONTENT_HAS_PLAYER_RECORD
   *
   * @param {any} p0
   * @param {number} index
   * @return {boolean}
   */
declare function UgcQueryGetContentHasPlayerRecord(p0: any, index: number): boolean;

/**
   * UGC_QUERY_GET_CONTENT_NUM
   *
   * @param {number} ugcRequestId
   * @return {number}
   */
declare function UgcQueryGetContentNum(ugcRequestId: number): number;

/**
   * UGC_QUERY_WAS_FORCE_CANCELLED
   *
   * @param {number} ugcRequestId
   * @return {boolean}
   */
declare function UgcQueryWasForceCancelled(ugcRequestId: number): boolean;

/**
   * UGC_RELEASE_ALL_CACHED_DESCRIPTIONS
   *
  
   * @return {void}
   */
declare function UgcReleaseAllCachedDescriptions(): void;

/**
   * UGC_RELEASE_CACHED_DESCRIPTION
   *
   * @param {number} description
   * @return {boolean}
   */
declare function UgcReleaseCachedDescription(description: Hash): boolean;

/**
   * UGC_REQUEST_CACHED_DESCRIPTION
   *
   * @param {number} description
   * @return {number}
   */
declare function UgcRequestCachedDescription(description: Hash): number;

/**
   * UGC_REQUEST_CONTENT_DATA_FROM_PARAMS
   *
   * @param {string | number} contentTypeName
   * @param {string | number} contentId
   * @param {number} fileId
   * @param {number} fileVersion
   * @param {number} languageId
   * @return {number}
   */
declare function UgcRequestContentDataFromParams(contentTypeName: string | number, contentId: string | number, fileId: number, fileVersion: number, languageId: number): number;

/**
   * UGC_SET_QUERY_DATA_FROM_OFFLINE
   *
   * @param {boolean} p0
   * @return {void}
   */
declare function UgcSetQueryDataFromOffline(p0: boolean): void;

/**
   * UGC_TEXTURE_DOWNLOAD_REQUEST
   *
   * @param {DataView} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {DataView} p4
   * @param {boolean} p5
   * @return {number}
   */
declare function UgcTextureDownloadRequest(p0: DataView, p1: any, p2: any, p3: any, p4: DataView, p5: boolean): number;

/**
   * VEH_TO_NET
   * Returns the network ID of the given vehicle.
   *
   * @param {number} vehicle
   * @return {number}
   */
declare function VehToNet(vehicle: Vehicle): number;

/**
   * _0x02B3CDD652B3CDD6
   * Note: this native was added in build 1311.16
   * 
   * GET_NUM_*
   *
  
   * @return {number}
   */
declare function N_0x02B3CDD652B3CDD6(): number;

/**
   * _0x02C4C6C2900D84DF
   * Only used in SP R* Script dominoes_sp: p1 = 0
   *
   * @param {number} player
   * @param {any} p1
   * @return {void}
   */
declare function N_0x02C4C6C2900D84DF(player: Player, p1: any): void;

/**
   * _0x039AD6B57D5179FF
   * Note: this native was added in build 1311.23
   *
  
   * @return {number}
   */
declare function N_0x039AD6B57D5179FF(): number;

/**
   * _0x039B692B3318FAB6
   * Note: this native was added in build 1311.23
   *
   * @param {boolean} p0
   * @return {number}
   */
declare function N_0x039B692B3318FAB6(p0: boolean): number;

/**
   * _0x062842D61D0D53FD
   * Note: this native was added in build 1311.23
   *
  
   * @return {boolean}
   */
declare function N_0x062842D61D0D53FD(): boolean;

/**
   * _0x0B6B4507AC5EA8B8
   *
  
   * @return {boolean}
   */
declare function N_0x0B6B4507AC5EA8B8(): boolean;

/**
   * _0x0BF90CBB6B72977B
   *
  
   * @return {void}
   */
declare function N_0x0BF90CBB6B72977B(): void;

/**
   * _0x0CC28C08613BA9E5
   * nullsub, doesn't do anything
   *
   * @param {number} p0
   * @return {void}
   */
declare function N_0x0CC28C08613BA9E5(p0: number): void;

/**
   * _0x0D183D8490EE4366
   * Note: this native was added in build 1311.23
   *
   * @param {number} p0
   * @param {number} p1
   * @return {void}
   */
declare function N_0x0D183D8490EE4366(p0: number, p1: number): void;

/**
   * _0x0E54D4DA6018FF8E
   *
  
   * @return {boolean}
   */
declare function N_0x0E54D4DA6018FF8E(): boolean;

/**
   * _0x106CBDD5077DEDE1
   * Note: this native was added in build 1311.23
   *
   * @param {boolean} p0
   * @return {number}
   */
declare function N_0x106CBDD5077DEDE1(p0: boolean): number;

/**
   * _0x13F592FC3BF0EA84
   *
   * @param {number} volume
   * @param {boolean} p1
   * @param {number} originalWeight
   * @param {any} p3
   * @param {any} p4
   * @return {void}
   */
declare function N_0x13F592FC3BF0EA84(volume: Volume, p1: boolean, originalWeight: number, p3: any, p4: any): void;

/**
   * _0x1413B6BF27AB7A95
   *
  
   * @return {number}
   */
declare function N_0x1413B6BF27AB7A95(): number;

/**
   * _0x160F0CE6D76A39C9
   * nullsub, doesn't do anything
   *
  
   * @return {any}
   */
declare function N_0x160F0CE6D76A39C9(): any;

/**
   * _0x16EFB123C4451032
   *
   * @param {number} p0
   * @param {DataView} gamerHandle
   * @return {boolean}
   */
declare function N_0x16EFB123C4451032(p0: number, gamerHandle: DataView): boolean;

/**
   * _0x18B94666CF610AEB
   *
  
   * @return {boolean}
   */
declare function N_0x18B94666CF610AEB(): boolean;

/**
   * _0x19447FCAE97704DC
   * Note: this native was added in build 1311.23
   *
   * @param {number} ctx
   * @param {number} ec
   * @param {boolean} ex
   * @param {boolean} ro
   * @return {void}
   */
declare function N_0x19447FCAE97704DC(ctx: Hash, ec: number, ex: boolean, ro: boolean): void;

/**
   * _0x19B52C20B5C4757C
   *
  
   * @return {void}
   */
declare function N_0x19B52C20B5C4757C(): void;

/**
   * _0x1E4E097D71D449FB
   * Note: this native was added in build 1311.23
   *
   * @param {boolean} p0
   * @return {number}
   */
declare function N_0x1E4E097D71D449FB(p0: boolean): number;

/**
   * _0x232E1EB23CDB313C
   *
  
   * @return {boolean}
   */
declare function N_0x232E1EB23CDB313C(): boolean;

/**
   * _0x236321F1178A5446
   * _NETWORK_GET_A* - _NETWORK_GET_D*
   *
   * @param {number} player
   * @param {number} ped
   * @param {DataView} p2
   * @return {boolean}
   */
declare function N_0x236321F1178A5446(player: Player, ped: Ped, p2: DataView): boolean;

/**
   * _0x2686BD9566B65EDA
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {void}
   */
declare function N_0x2686BD9566B65EDA(x: number, y: number, z: number): void;

/**
   * _0x26A867C0B7A456D1
   * _GET_LAUNCH_PARAM_(RESPOT?)*
   * Name is probably invalid since this native only reads data from parsed entity.
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function N_0x26A867C0B7A456D1(entity: Entity): boolean;

/**
   * _0x271F95E55C663B8B
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0x271F95E55C663B8B(p0: any, p1: any): any;

/**
   * _0x273E04A3A7AD1F2D
   *
  
   * @return {boolean}
   */
declare function N_0x273E04A3A7AD1F2D(): boolean;

/**
   * _0x27B1AE4D8C652F08
   *
   * @param {number} p0
   * @return {number}
   */
declare function N_0x27B1AE4D8C652F08(p0: number): number;

/**
   * _0x2C4E98DDA475364F
   * nullsub, doesn't do anything
   *
   * @param {string | number} p0
   * @return {void}
   */
declare function N_0x2C4E98DDA475364F(p0: string | number): void;

/**
   * _0x2CD41AC000E6F611
   * nullsub, doesn't do anything
   *
  
   * @return {void}
   */
declare function N_0x2CD41AC000E6F611(): void;

/**
   * _0x3034C77C79A58880
   *
   * @param {boolean} p0
   * @return {void}
   */
declare function N_0x3034C77C79A58880(p0: boolean): void;

/**
   * _0x316FD416C432C761
   * Note: this native was added in build 1311.23
   *
  
   * @return {boolean}
   */
declare function N_0x316FD416C432C761(): boolean;

/**
   * _0x335AF56613CA0F49
   * Note: this native was added in build 1311.23
   *
   * @param {number} p0
   * @return {void}
   */
declare function N_0x335AF56613CA0F49(p0: number): void;

/**
   * _0x34BC1E79546BA543
   * _NETWORK_A* - _NETWORK_C*
   *
   * @param {boolean} p0
   * @return {void}
   */
declare function N_0x34BC1E79546BA543(p0: boolean): void;

/**
   * _0x3AA0CDC63696166D
   *
   * @param {number} p0
   * @return {boolean}
   */
declare function N_0x3AA0CDC63696166D(p0: number): boolean;

/**
   * _0x3CBD6565D9C3B133
   * Note: this native was added in build 1311.23
   *
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @return {void}
   */
declare function N_0x3CBD6565D9C3B133(p0: number, p1: number, p2: number): void;

/**
   * _0x3E4A16BC669E71B3
   *
  
   * @return {boolean}
   */
declare function N_0x3E4A16BC669E71B3(): boolean;

/**
   * _0x3E74A687A73979C6
   *
   * @param {boolean} p0
   * @return {void}
   */
declare function N_0x3E74A687A73979C6(p0: boolean): void;

/**
   * _0x3E8CCE6769DB5F34
   * Stadia only; always returns -1 on other platforms. p0 may be a BOOL.
   *
   * @param {number} p0
   * @return {number}
   */
declare function N_0x3E8CCE6769DB5F34(p0: number): number;

/**
   * _0x3F0ABAE38A0515AD
   *
   * @param {number} p0
   * @param {number} p1
   * @return {void}
   */
declare function N_0x3F0ABAE38A0515AD(p0: number, p1: number): void;

/**
   * _0x3F2EE18A3E294801
   *
   * @param {number} p0
   * @return {number}
   */
declare function N_0x3F2EE18A3E294801(p0: number): number;

/**
   * _0x405DDEFB1F531B18
   *
   * @param {number} volume
   * @param {boolean} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function N_0x405DDEFB1F531B18(volume: Volume, p1: boolean, p2: any, p3: any): void;

/**
   * _0x40FEDB13870042F1
   * Note: this native was added in build 1355.30
   *
  
   * @return {void}
   */
declare function N_0x40FEDB13870042F1(): void;

/**
   * _0x41452E8A3B9C0C4B
   *
  
   * @return {number}
   */
declare function N_0x41452E8A3B9C0C4B(): number;

/**
   * _0x422F9D6D6C7BC290
   * Note: this native was added in build 1355.30
   *
   * @param {number} p0
   * @return {void}
   */
declare function N_0x422F9D6D6C7BC290(p0: number): void;

/**
   * _0x43CF999205084B4B
   *
  
   * @return {void}
   */
declare function N_0x43CF999205084B4B(): void;

/**
   * _0x4538EE7C321590BC
   * Returns the entity associated with the given network ID.
   *
   * @param {number} networkId
   * @return {number}
   */
declare function N_0x4538EE7C321590BC(networkId: number): Entity;

/**
   * _0x455156F47DC6B78C
   *
   * @param {boolean} p0
   * @return {void}
   */
declare function N_0x455156F47DC6B78C(p0: boolean): void;

/**
   * _0x4835413EA6F9C9CD
   * Note: this native was added in build 1311.23
   *
   * @param {boolean} p0
   * @return {number}
   */
declare function N_0x4835413EA6F9C9CD(p0: boolean): number;

/**
   * _0x49CF17A564918E8D
   *
  
   * @return {void}
   */
declare function N_0x49CF17A564918E8D(): void;

/**
   * _0x5133CF81924F1129
   * Hardcoded to return zero.
   *
  
   * @return {number}
   */
declare function N_0x5133CF81924F1129(): number;

/**
   * _0x51951DE06C0D1C40
   *
   * @param {number} player
   * @param {number} type
   * @return {void}
   */
declare function N_0x51951DE06C0D1C40(player: Player, type: number): void;

/**
   * _0x564552C6AF1EEAB1
   *
  
   * @return {void}
   */
declare function N_0x564552C6AF1EEAB1(): void;

/**
   * _0x5759160AC17C13CE
   *
   * @param {DataView} gamerHandle
   * @param {string | number} message
   * @return {void}
   */
declare function N_0x5759160AC17C13CE(gamerHandle: DataView, message: string | number): void;

/**
   * _0x5A91BCEF74944E93
   *
   * @param {number} player
   * @param {number} p1
   * @return {void}
   */
declare function N_0x5A91BCEF74944E93(player: Player, p1: number): void;

/**
   * _0x5B9C6AC118FD4774
   *
  
   * @return {void}
   */
declare function N_0x5B9C6AC118FD4774(): void;

/**
   * _0x5CB8B0C846D0F30B
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x5CB8B0C846D0F30B(p0: any): void;

/**
   * _0x5CD3AAD8FF9ED121
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x5CD3AAD8FF9ED121(p0: any): void;

/**
   * _0x5D3C528B7A7DF836
   * _NETWORK_SPAWN_CONFIG_*
   *
   * @param {number} nsctf
   * @return {void}
   */
declare function N_0x5D3C528B7A7DF836(nsctf: Hash): void;

/**
   * _0x5ED39DA62BEB1330
   *
   * @param {number} p0
   * @return {any}
   */
declare function N_0x5ED39DA62BEB1330(p0: number): any;

/**
   * _0x5F0E99071582DECA
   *
   * @param {any} p0
   * @param {number} index
   * @param {number} p2
   * @return {any}
   */
declare function N_0x5F0E99071582DECA(p0: any, index: number, p2: number): any;

/**
   * _0x5F328FC909F0E0FF
   * Note: this native was added in build 1311.23
   *
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @return {boolean}
   */
declare function N_0x5F328FC909F0E0FF(p0: number, p1: number, p2: number, p3: number): boolean;

/**
   * _0x603469298A4308AF
   *
   * @param {boolean} p0
   * @return {void}
   */
declare function N_0x603469298A4308AF(p0: boolean): void;

/**
   * _0x61BFBAA795E712AD
   *
  
   * @return {void}
   */
declare function N_0x61BFBAA795E712AD(): void;

/**
   * _0x64A36BA85CE01A81
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {any}
   */
declare function N_0x64A36BA85CE01A81(p0: any, p1: any, p2: any, p3: any): any;

/**
   * _0x67CCDF74C4DF7169
   *
  
   * @return {boolean}
   */
declare function N_0x67CCDF74C4DF7169(): boolean;

/**
   * _0x691E4DE5309EAEFC
   *
   * @param {any} p0
   * @param {DataView} p1
   * @return {void}
   */
declare function N_0x691E4DE5309EAEFC(p0: any, p1: DataView): void;

/**
   * _0x6C27442A225A241A
   *
   * @param {number} p0
   * @return {number}
   */
declare function N_0x6C27442A225A241A(p0: number): number;

/**
   * _0x6C7E04E9DE451789
   *
  
   * @return {void}
   */
declare function N_0x6C7E04E9DE451789(): void;

/**
   * _0x6CEE2E30021DAEC6
   * _NETWORK_SPAWN_CONFIG_*
   *
  
   * @return {void}
   */
declare function N_0x6CEE2E30021DAEC6(): void;

/**
   * _0x6CF82A7F65A5AD5F
   * _NETWORK_GET_A* - _NETWORK_GET_D*
   *
   * @param {number} ped
   * @param {DataView} p1
   * @return {number}
   */
declare function N_0x6CF82A7F65A5AD5F(ped: Ped, p1: DataView): Player;

/**
   * _0x704F92B3AF20D857
   *
   * @param {boolean} setting
   * @return {void}
   */
declare function N_0x704F92B3AF20D857(setting: boolean): void;

/**
   * _0x71FA2D1880C48032
   * Only used in R* Script fm_race_controller
   *
   * @param {boolean} p0
   * @return {void}
   */
declare function N_0x71FA2D1880C48032(p0: boolean): void;

/**
   * _0x744BFBB0CA908161
   * Note: this native was added in build 1311.23
   *
   * @param {boolean} p0
   * @return {number}
   */
declare function N_0x744BFBB0CA908161(p0: boolean): number;

/**
   * _0x75FC34A2BA345BD1
   *
   * @param {number} entity
   * @param {number} player
   * @param {DataView} p2
   * @return {boolean}
   */
declare function N_0x75FC34A2BA345BD1(entity: Entity, player: Player, p2: DataView): boolean;

/**
   * _0x7673C0D2C5CDAC55
   * Note: this native was added in build 1311.23
   *
  
   * @return {void}
   */
declare function N_0x7673C0D2C5CDAC55(): void;

/**
   * _0x77B299E8799B1332
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {any}
   */
declare function N_0x77B299E8799B1332(p0: any, p1: any, p2: any): any;

/**
   * _0x780A13F780A13F1B
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function N_0x780A13F780A13F1B(toggle: boolean): void;

/**
   * _0x78271BC02AE9AF83
   * Note: this native was added in build 1436.31
   *
   * @param {number} p0
   * @return {number}
   */
declare function N_0x78271BC02AE9AF83(p0: number): number;

/**
   * _0x7A8E8DF782B47EB0
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {any}
   */
declare function N_0x7A8E8DF782B47EB0(p0: any, p1: any, p2: any): any;

/**
   * _0x7B3FF2D193628126
   *
   * @param {number} player
   * @return {void}
   */
declare function N_0x7B3FF2D193628126(player: Player): void;

/**
   * _0x7BCA0A3972708436
   *
   * @param {DataView} outData
   * @param {number} p1
   * @return {number}
   */
declare function N_0x7BCA0A3972708436(outData: DataView, p1: number): number;

/**
   * _0x7E300B5B86AB1D1A
   *
   * @param {DataView} p0
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {number} p4
   * @param {number} p5
   * @param {number} p6
   * @param {number} p7
   * @param {number} p8
   * @param {number} p9
   * @param {number} p10
   * @param {number} p11
   * @param {number} p12
   * @param {number} p13
   * @param {number} p14
   * @return {void}
   */
declare function N_0x7E300B5B86AB1D1A(p0: DataView, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number, p8: number, p9: number, p10: number, p11: number, p12: number, p13: number, p14: number): void;

/**
   * _0x814729078AED6D30
   *
  
   * @return {void}
   */
declare function N_0x814729078AED6D30(): void;

/**
   * _0x862C5040F4888741
   *
   * @param {number} player1
   * @param {number} player2
   * @return {boolean}
   */
declare function N_0x862C5040F4888741(player1: Player, player2: Player): boolean;

/**
   * _0x880A7202301E282B
   * Params: p5 = 50.f, p6 = 0 in R* Script net_fetch (NET_FETCH_CLIENT_UPDATE_PED_ROLE_CLUE_IDLE)
   *
   * @param {DataView} p0
   * @param {DataView} p1
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} p5
   * @param {any} p6
   * @return {boolean}
   */
declare function N_0x880A7202301E282B(p0: DataView, p1: DataView, x: number, y: number, z: number, p5: number, p6: any): boolean;

/**
   * _0x894B5ECAB45D2342
   *
   * @param {number} netHandle
   * @param {any} p1
   * @return {void}
   */
declare function N_0x894B5ECAB45D2342(netHandle: number, p1: any): void;

/**
   * _0x917AD74BDCF8B6E9
   * Note: this native was added in build 1311.23
   *
   * @param {boolean} p0
   * @return {number}
   */
declare function N_0x917AD74BDCF8B6E9(p0: boolean): number;

/**
   * _0x923346025512DFB7
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x923346025512DFB7(p0: any): any;

/**
   * _0x950ACD8F05B7B9DF
   * Related to container entity (RANSACK_ATTACHED_LOCKBOX / RANSACK_ATTACHED_CHEST)
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x950ACD8F05B7B9DF(p0: any): any;

/**
   * _0x979765465A6F25FC
   * Must be called from a background script, otherwise it will do nothing.
   *
   * @param {number} entity
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x979765465A6F25FC(entity: Entity, p1: boolean): void;

/**
   * _0x97BCE4C4B3191228
   *
  
   * @return {void}
   */
declare function N_0x97BCE4C4B3191228(): void;

/**
   * _0x981146E5C9CE9250
   *
   * @param {number} inviteIndex
   * @return {boolean}
   */
declare function N_0x981146E5C9CE9250(inviteIndex: number): boolean;

/**
   * _0x982D7AD755B8F62C
   * Note: this native was added in build 1311.23
   *
   * @param {boolean} p0
   * @return {number}
   */
declare function N_0x982D7AD755B8F62C(p0: boolean): number;

/**
   * _0x9B39B0555CC692B5
   *
  
   * @return {void}
   */
declare function N_0x9B39B0555CC692B5(): void;

/**
   * _0x9E5A47744C0F0376
   * Note: this native was added in build 1311.23
   *
   * @param {number} p0
   * @return {boolean}
   */
declare function N_0x9E5A47744C0F0376(p0: number): boolean;

/**
   * _0xA2837A5E21FB5A58
   *
   * @param {any} p0
   * @return {boolean}
   */
declare function N_0xA2837A5E21FB5A58(p0: any): boolean;

/**
   * _0xA47D48D06AA5A188
   *
  
   * @return {boolean}
   */
declare function N_0xA47D48D06AA5A188(): boolean;

/**
   * _0xA63E4F050F20021F
   *
  
   * @return {void}
   */
declare function N_0xA63E4F050F20021F(): void;

/**
   * _0xA6F1BAABFF6AD7B9
   *
   * @param {DataView} p0
   * @return {void}
   */
declare function N_0xA6F1BAABFF6AD7B9(p0: DataView): void;

/**
   * _0xA7670F7991099680
   * Note: this native was added in build 1311.23
   *
   * @param {number} p0
   * @return {void}
   */
declare function N_0xA7670F7991099680(p0: number): void;

/**
   * _0xA94ECE191D90637A
   *
  
   * @return {number}
   */
declare function N_0xA94ECE191D90637A(): number;

/**
   * _0xA95470DA137587F5
   *
   * @param {boolean} p0
   * @return {void}
   */
declare function N_0xA95470DA137587F5(p0: boolean): void;

/**
   * _0xACC44768AF229042
   * nullsub, doesn't do anything
   *
  
   * @return {void}
   */
declare function N_0xACC44768AF229042(): void;

/**
   * _0xAFA14F98327791CE
   *
   * @param {DataView} sessionRequestId
   * @return {boolean}
   */
declare function N_0xAFA14F98327791CE(sessionRequestId: DataView): boolean;

/**
   * _0xB131E686BD97B3F8
   *
  
   * @return {void}
   */
declare function N_0xB131E686BD97B3F8(): void;

/**
   * _0xB389289F031F059A
   *
  
   * @return {number}
   */
declare function N_0xB389289F031F059A(): number;

/**
   * _0xBAF7E2979442B29F
   * Note: this native was added in build 1311.23
   *
   * @param {boolean} p0
   * @return {number}
   */
declare function N_0xBAF7E2979442B29F(p0: boolean): number;

/**
   * _0xBB1EC8C2EEF33BAA
   *
   * @param {number} entity
   * @return {void}
   */
declare function N_0xBB1EC8C2EEF33BAA(entity: Entity): void;

/**
   * _0xBB697756309D77EE
   *
   * @param {boolean} p0
   * @return {any}
   */
declare function N_0xBB697756309D77EE(p0: boolean): any;

/**
   * _0xBC7D36946D19E60E
   * Only used in fm_race_controller R* Script (PROCESS_LOCAL_PLAYER_INIT)
   *
   * @param {boolean} p0
   * @return {void}
   */
declare function N_0xBC7D36946D19E60E(p0: boolean): void;

/**
   * _0xBF8276E51761F9DA
   *
  
   * @return {number}
   */
declare function N_0xBF8276E51761F9DA(): number;

/**
   * _0xC028B3F52C707C49
   *
   * @param {any} p0
   * @return {boolean}
   */
declare function N_0xC028B3F52C707C49(p0: any): boolean;

/**
   * _0xC0CFFDA87C2C163D
   *
   * @param {number} p0
   * @param {any} p1
   * @param {number} p2
   * @return {any}
   */
declare function N_0xC0CFFDA87C2C163D(p0: number, p1: any, p2: number): any;

/**
   * _0xC1968045EEB563B7
   * Note: this native was added in build 1311.23
   *
   * @param {number} p0
   * @return {void}
   */
declare function N_0xC1968045EEB563B7(p0: number): void;

/**
   * _0xC8B6D18E22484643
   *
  
   * @return {void}
   */
declare function N_0xC8B6D18E22484643(): void;

/**
   * _0xC964FCD3D1720697
   * nullsub, doesn't do anything
   *
  
   * @return {any}
   */
declare function N_0xC964FCD3D1720697(): any;

/**
   * _0xCA58D4FD20D70F24
   *
   * @param {any} p0
   * @return {number}
   */
declare function N_0xCA58D4FD20D70F24(p0: any): number;

/**
   * _0xCC4E72C339461ED1
   *
  
   * @return {any}
   */
declare function N_0xCC4E72C339461ED1(): any;

/**
   * _0xCD53E6CBF609C012
   *
   * @param {number} ugcRequestId
   * @return {boolean}
   */
declare function N_0xCD53E6CBF609C012(ugcRequestId: number): boolean;

/**
   * _0xCF23AB5BD47B384D
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xCF23AB5BD47B384D(p0: any): void;

/**
   * _0xD1FFB246F4E088AC
   *
   * @param {number} p0
   * @return {boolean}
   */
declare function N_0xD1FFB246F4E088AC(p0: number): boolean;

/**
   * _0xD39A72AE5EBD57E5
   *
  
   * @return {void}
   */
declare function N_0xD39A72AE5EBD57E5(): void;

/**
   * _0xD3A3C8B9F3BDEF81
   *
  
   * @return {any}
   */
declare function N_0xD3A3C8B9F3BDEF81(): any;

/**
   * _0xD3B6EBC6C3D77D44
   * Note: this native was added in build 1311.23
   *
   * @param {number} p0
   * @return {void}
   */
declare function N_0xD3B6EBC6C3D77D44(p0: number): void;

/**
   * _0xD4022C7286B0DFA2
   *
   * @param {string | number} p0
   * @param {number} p1
   * @param {number} p2
   * @return {any}
   */
declare function N_0xD4022C7286B0DFA2(p0: string | number, p1: number, p2: number): any;

/**
   * _0xD42C543F73233041
   *
   * @param {boolean} p0
   * @return {void}
   */
declare function N_0xD42C543F73233041(p0: boolean): void;

/**
   * _0xD637D327080CD86E
   *
   * @param {number} p0
   * @return {void}
   */
declare function N_0xD637D327080CD86E(p0: number): void;

/**
   * _0xD78A26024BB13E08
   *
   * @param {number} player
   * @return {void}
   */
declare function N_0xD78A26024BB13E08(player: Player): void;

/**
   * _0xD7BAD4062074B9C1
   *
   * @param {any} p0
   * @return {boolean}
   */
declare function N_0xD7BAD4062074B9C1(p0: any): boolean;

/**
   * _0xD7D0DF27CB1765B5
   *
   * @param {number} p0
   * @return {boolean}
   */
declare function N_0xD7D0DF27CB1765B5(p0: number): boolean;

/**
   * _0xDA1BFED8582F61F0
   *
  
   * @return {boolean}
   */
declare function N_0xDA1BFED8582F61F0(): boolean;

/**
   * _0xDBDF80673BBA3D65
   * Note: this native was added in build 1491.50
   *
   * @param {number} p0
   * @return {boolean}
   */
declare function N_0xDBDF80673BBA3D65(p0: number): boolean;

/**
   * _0xDC6AD5C046F33AB4
   *
   * @param {boolean} p0
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0xDC6AD5C046F33AB4(p0: boolean, p1: boolean): void;

/**
   * _0xDCA4A74135E1DEA5
   *
   * @param {any} p0
   * @return {boolean}
   */
declare function N_0xDCA4A74135E1DEA5(p0: any): boolean;

/**
   * _0xE10F2D7715ABABEC
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xE10F2D7715ABABEC(p0: any): any;

/**
   * NETWORK_UNREGISTER_NETWORKED_ENTITY
   *
   * @param {number} entity
   * @return {void}
   */
declare function NetworkUnregisterNetworkedEntity(entity: Entity): void;

/**
   * _0xE39600E50D608693
   *
   * @param {any} p0
   * @param {any} p1
   * @return {boolean}
   */
declare function N_0xE39600E50D608693(p0: any, p1: any): boolean;

/**
   * _0xE3AB5EEFCB6671A2
   *
   * @param {number} setting
   * @return {void}
   */
declare function N_0xE3AB5EEFCB6671A2(setting: number): void;

/**
   * _0xE5634491A58C2703
   *
   * @param {number} p0
   * @return {void}
   */
declare function N_0xE5634491A58C2703(p0: number): void;

/**
   * _0xE59F4924BD3A718D
   *
   * @param {number} p0
   * @return {string | number}
   */
declare function N_0xE59F4924BD3A718D(p0: number): string | number;

/**
   * _0xE5FF65CFF5160752
   *
  
   * @return {void}
   */
declare function N_0xE5FF65CFF5160752(): void;

/**
   * _0xE79BA3BC265895DA
   *
   * @param {number} p0
   * @return {string | number}
   */
declare function N_0xE79BA3BC265895DA(p0: number): string | number;

/**
   * _0xE8E633215471BB5D
   *
   * @param {any} p0
   * @return {number}
   */
declare function N_0xE8E633215471BB5D(p0: any): number;

/**
   * _0xEC089F84A9C16C62
   * nullsub, doesn't do anything
   *
  
   * @return {any}
   */
declare function N_0xEC089F84A9C16C62(): any;

/**
   * _0xF23A6D6C11D8EC15
   *
   * @param {DataView} gamerHandle
   * @return {boolean}
   */
declare function N_0xF23A6D6C11D8EC15(gamerHandle: DataView): boolean;

/**
   * _0xF260AF6F43953316
   * Same Native Handler as VEH_TO_NET, PED_TO_NET, OBJ_TO_NET and NETWORK_GET_NETWORK_ID_FROM_ENTITY
   *
   * @param {number} handle
   * @return {number}
   */
declare function N_0xF260AF6F43953316(handle: ScrHandle): number;

/**
   * _0xF302AB9D978352EE
   * Returns the entity's network ID.
   *
   * @param {number} entity
   * @return {number}
   */
declare function N_0xF302AB9D978352EE(entity: Entity): number;

/**
   * _0xF342F6BD0A8287D5
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xF342F6BD0A8287D5(p0: any): void;

/**
   * _0xF8DC69DC1AD19072
   * Note: this native was added in build 1311.23
   *
   * @param {boolean} p0
   * @return {number}
   */
declare function N_0xF8DC69DC1AD19072(p0: boolean): number;

/**
   * _0xFB3205788F8AFA3F
   * Note: this native was added in build 1311.23
   *
  
   * @return {number}
   */
declare function N_0xFB3205788F8AFA3F(): number;

/**
   * _0xFC6FCF4C03F1BBF6
   * nullsub, doesn't do anything
   *
  
   * @return {void}
   */
declare function N_0xFC6FCF4C03F1BBF6(): void;

/**
   * _NETWORK_LEAVE_SESSION
   * Only used in R* Script startup_clip Seems to just kill the network connection, sets the players coords to 0, 0, 0 when doing GetEntityCoords
   *
  
   * @return {void}
   */
declare function NetworkLeaveSession(): void;

/**
   * _0xFD8112109A96877C
   * Note: this native was added in build 1311.23
   *
  
   * @return {void}
   */
declare function N_0xFD8112109A96877C(): void;

/**
   * _0xFE53B1F8D43F19BF
   *
   * @param {number} player1
   * @param {number} player2
   * @return {number}
   */
declare function N_0xFE53B1F8D43F19BF(player1: Player, player2: Player): number;

/**
   * _0xFF36F36B07E69059
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xFF36F36B07E69059(p0: any): void;

/**
   * _ANIM_SCENE_TO_NET
   *
   * @param {number} animScene
   * @return {number}
   */
declare function AnimSceneToNet(animScene: AnimScene): number;

/**
   * _CLEAR_LAUNCH_PARAM
   *
   * @param {string | number} paramName
   * @return {void}
   */
declare function ClearLaunchParam(paramName: string | number): void;

/**
   * _COMMERCE_STORE_IS_ENABLED
   *
  
   * @return {boolean}
   */
declare function CommerceStoreIsEnabled(): boolean;

/**
   * _COMMERCE_STORE_IS_OPEN
   *
  
   * @return {boolean}
   */
declare function CommerceStoreIsOpen(): boolean;

/**
   * _GET_LAUNCH_PARAM_EXISTS
   *
   * @param {string | number} paramName
   * @return {boolean}
   */
declare function GetLaunchParamExists(paramName: string | number): boolean;

/**
   * _GET_LAUNCH_PARAM_STRING
   *
  
   * @return {string | number}
   */
declare function GetLaunchParamString(): string | number;

/**
   * _GET_NUM_CREATED_MISSION_PICKUPS
   *
   * @param {boolean} p0
   * @return {number}
   */
declare function GetNumCreatedMissionPickups(p0: boolean): number;

/**
   * _GET_NUM_PEER_NEGOTIATION_RESPONSES
   * Note: this native was added in build 1311.16
   *
  
   * @return {number}
   */
declare function GetNumPeerNegotiationResponses(): number;

/**
   * _GET_NUM_RESERVED_MISSION_PICKUPS
   *
   * @param {boolean} p0
   * @return {number}
   */
declare function GetNumReservedMissionPickups(p0: boolean): number;

/**
   * _GET_PLAYER_WAYPOINT_IS_ACTIVE
   *
   * @param {number} player
   * @return {boolean}
   */
declare function GetPlayerWaypointIsActive(player: Player): boolean;

/**
   * _GET_RESERVED_MISSION_ENTITIES_FOR_THREAD
   * Only used in R* Script net_stable_manager
   *
   * @param {number} threadId
   * @return {[number, number, number, number, number, number]}
   */
declare function GetReservedMissionEntitiesForThread(threadId: number): [number, number, number, number, number, number];

/**
   * _GET_SOCIAL_MATCHMAKING_ALLOWED
   *
  
   * @return {boolean}
   */
declare function GetSocialMatchmakingAllowed(): boolean;

/**
   * _LOCAL_PLAYER_PEDSHOT_TEXTURE_DOWNLOAD_REQUEST
   *
   * @param {number} playerSlot
   * @param {number} personaPhotoLocalCacheType
   * @return {number}
   */
declare function LocalPlayerPedshotTextureDownloadRequest(playerSlot: number, personaPhotoLocalCacheType: number): number;

/**
   * _MUGSHOT_TEXTURE_DOWNLOAD_REQUEST
   * Returns textureDownloadId
   *
   * @param {DataView} gamerHandle
   * @param {number} p1
   * @param {string | number} name
   * @param {boolean} p3
   * @return {number}
   */
declare function MugshotTextureDownloadRequest(gamerHandle: DataView, p1: number, name: string | number, p3: boolean): number;

/**
   * _NETWORK_ADD_PLAYER_TO_RECENT_GAMERS_LIST
   *
   * @param {number} player
   * @param {number} p1
   * @return {void}
   */
declare function NetworkAddPlayerToRecentGamersList(player: Player, p1: number): void;

/**
   * _NETWORK_ALERT
   *
   * @param {number} ctx
   * @param {number} lh
   * @param {number} ec
   * @param {number} h
   * @return {void}
   */
declare function NetworkAlert(ctx: Hash, lh: Hash, ec: number, h: number): void;

/**
   * _NETWORK_ARE_ONLINE_NOTIFICATIONS_SHOWN_IN_STORY_MODE
   * Returns value of fwuiCachedSetting "general.onlineNotificationsInStoryMode"
   *
  
   * @return {boolean}
   */
declare function NetworkAreOnlineNotificationsShownInStoryMode(): boolean;

/**
   * _NETWORK_ARE_PLAYERS_IN_SAME_PLATFORM_PARTY
   *
   * @param {DataView} gamerHandle1
   * @param {DataView} gamerHandle2
   * @return {boolean}
   */
declare function NetworkArePlayersInSamePlatformParty(gamerHandle1: DataView, gamerHandle2: DataView): boolean;

/**
   * _NETWORK_AUTO_SESSION_IS_AUTO_WARP_DISABLED
   *
  
   * @return {boolean}
   */
declare function NetworkAutoSessionIsAutoWarpDisabled(): boolean;

/**
   * _NETWORK_AUTO_SESSION_IS_INSTANCED_SESSION
   *
  
   * @return {boolean}
   */
declare function NetworkAutoSessionIsInstancedSession(): boolean;

/**
   * _NETWORK_AUTO_SESSION_IS_PROCESSING_SESSION_SPLIT
   *
  
   * @return {boolean}
   */
declare function NetworkAutoSessionIsProcessingSessionSplit(): boolean;

/**
   * _NETWORK_AUTO_SESSION_SET_ALLOWED_TO_MERGE
   *
   * @param {boolean} toggle
   * @param {DataView} p1
   * @param {number} p2
   * @return {void}
   */
declare function NetworkAutoSessionSetAllowedToMerge(toggle: boolean, p1: DataView, p2: number): void;

/**
   * _NETWORK_AUTO_SESSION_SET_ALLOWED_TO_SPLIT
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function NetworkAutoSessionSetAllowedToSplit(toggle: boolean): void;

/**
   * _NETWORK_AUTO_SESSION_SET_AUTO_WARP_ENABLED
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function NetworkAutoSessionSetAutoWarpEnabled(toggle: boolean): void;

/**
   * _NETWORK_AUTO_SESSION_SPLIT_SESSION_SUCCESSFUL
   *
  
   * @return {boolean}
   */
declare function NetworkAutoSessionSplitSessionSuccessful(): boolean;

/**
   * _NETWORK_CAN_ADD_FRIEND
   * On PC this returns true if gamerHandle is a valid handle.
   *
   * @param {DataView} gamerHandle
   * @return {boolean}
   */
declare function NetworkCanAddFriend(gamerHandle: DataView): boolean;

/**
   * _NETWORK_CAN_RECEIVE_INVITE_FROM_HANDLE
   *
   * @param {DataView} gamerHandle
   * @return {boolean}
   */
declare function NetworkCanReceiveInviteFromHandle(gamerHandle: DataView): boolean;

/**
   * _NETWORK_CLEAR_CLOCK_OVERRIDE_OVERTIME
   *
   * @param {number} milliseconds
   * @return {void}
   */
declare function NetworkClearClockOverrideOvertime(milliseconds: number): void;

/**
   * _NETWORK_CLOCK_TIME_OVERRIDE
   *
   * @param {number} hour
   * @param {number} minute
   * @param {number} second
   * @param {number} transitionTime
   * @param {boolean} pauseClock
   * @return {void}
   */
declare function NetworkClockTimeOverride(hour: number, minute: number, second: number, transitionTime: number, pauseClock: boolean): void;

/**
   * _NETWORK_CLOCK_TIME_OVERRIDE_2
   *
   * @param {number} hour
   * @param {number} minute
   * @param {number} second
   * @param {number} transitionTime
   * @param {boolean} pauseClock
   * @param {boolean} clockwise
   * @return {void}
   */
declare function NetworkClockTimeOverride_2(hour: number, minute: number, second: number, transitionTime: number, pauseClock: boolean, clockwise: boolean): void;

/**
   * _NETWORK_DEBUG_REQUEST_ENTITY_POSITION
   * Must be called from a background script, otherwise it will do nothing.
   *
   * @param {DataView} p0
   * @return {void}
   */
declare function NetworkDebugRequestEntityPosition(p0: DataView): void;

/**
   * _NETWORK_DID_RECENT_GAMER_NAMES_REQUEST_SUCCEED
   *
  
   * @return {boolean}
   */
declare function NetworkDidRecentGamerNamesRequestSucceed(): boolean;

/**
   * _NETWORK_GET_CURRENT_FRIEND_PAGE_DATA
   *
   * @param {DataView} p0
   * @return {boolean}
   */
declare function NetworkGetCurrentFriendPageData(p0: DataView): boolean;

/**
   * _NETWORK_GET_DISPLAY_NAME_FROM_HANDLE
   * Example:
   * 
   * char displayName[64];
   * if (_NETWORK_GET_DISPLAY_NAME_FROM_HANDLE(handle, displayName))
   * {
   *   // use displayName
   * }
   *
   * @param {DataView} gamerHandle
   * @param {string | number} displayName
   * @return {boolean}
   */
declare function NetworkGetDisplayNameFromHandle(gamerHandle: DataView, displayName: string | number): boolean;

/**
   * _NETWORK_GET_GAMERTAG_FROM_FRIEND
   *
   * @param {DataView} gamerHandle
   * @return {string | number}
   */
declare function NetworkGetGamertagFromFriend(gamerHandle: DataView): string | number;

/**
   * _NETWORK_GET_GAMER_SESSION_FROM_HANDLE
   *
   * @param {DataView} data
   * @param {number} count
   * @return {boolean}
   */
declare function NetworkGetGamerSessionFromHandle(data: DataView, count: number): boolean;

/**
   * _NETWORK_GET_GAMER_STATUS
   *
   * @param {DataView} gamerHandle
   * @param {number} p1
   * @return {number}
   */
declare function NetworkGetGamerStatus(gamerHandle: DataView, p1: number): number;

/**
   * _NETWORK_GET_GLOBAL_ENTITY_FLAGS
   *
   * @param {number} entity
   * @return {number}
   */
declare function NetworkGetGlobalEntityFlags(entity: Entity): number;

/**
   * _NETWORK_GET_INSTANCE_ID_OF_THREAD
   *
   * @param {number} threadId
   * @return {number}
   */
declare function NetworkGetInstanceIdOfThread(threadId: number): number;

/**
   * _NETWORK_GET_NUM_RECENT_GAMERS
   *
  
   * @return {number}
   */
declare function NetworkGetNumRecentGamers(): number;

/**
   * _NETWORK_GET_PLATFORM_INVITE_ID
   *
  
   * @return {number}
   */
declare function NetworkGetPlatformInviteId(): number;

/**
   * _NETWORK_GET_PLAYER_FAST_INSTANCE_ID
   *
   * @param {number} player
   * @return {number}
   */
declare function NetworkGetPlayerFastInstanceId(player: Player): number;

/**
   * _NETWORK_GET_PLAYER_OWNER_OF_NETWORK_ID
   *
   * @param {number} netId
   * @return {number}
   */
declare function NetworkGetPlayerOwnerOfNetworkId(netId: number): Player;

/**
   * _NETWORK_GET_RANK
   *
  
   * @return {number}
   */
declare function NetworkGetRank(): number;

/**
   * _NETWORK_GET_ROS_TITLE_NAME
   * Returns CGameConfig->ConfigOnlineServices->RosTitleName (see gameconfig.xml)
   *
  
   * @return {string | number}
   */
declare function NetworkGetRosTitleName(): string | number;

/**
   * _NETWORK_GET_SESSION_HOST
   *
  
   * @return {number}
   */
declare function NetworkGetSessionHost(): Player;

/**
   * _NETWORK_GET_SIZE_OF_HOST_BROADCAST_DATA_STORAGE
   *
  
   * @return {[number, number]}
   */
declare function NetworkGetSizeOfHostBroadcastDataStorage(): [number, number];

/**
   * _NETWORK_GET_SIZE_OF_PLAYER_BROADCAST_DATA_STORAGE
   *
  
   * @return {[number, number]}
   */
declare function NetworkGetSizeOfPlayerBroadcastDataStorage(): [number, number];

/**
   * _NETWORK_GET_XP
   *
  
   * @return {number}
   */
declare function NetworkGetXp(): number;

/**
   * _NETWORK_HAS_COMPLETED_MP_INTRO_FLOW_ON_CURRENT_SLOT
   *
  
   * @return {boolean}
   */
declare function NetworkHasCompletedMpIntroFlowOnCurrentSlot(): boolean;

/**
   * _NETWORK_HAS_CONTROL_OF_ANIM_SCENE
   *
   * @param {number} animScene
   * @return {boolean}
   */
declare function NetworkHasControlOfAnimScene(animScene: AnimScene): boolean;

/**
   * _NETWORK_HAS_CURRENT_GET_GAMER_STATUS_STARTED
   *
  
   * @return {boolean}
   */
declare function NetworkHasCurrentGetGamerStatusStarted(): boolean;

/**
   * _NETWORK_IS_FRIEND_HANDLE_IN_SAME_TITLE
   *
   * @param {DataView} gamerHandle
   * @return {boolean}
   */
declare function NetworkIsFriendHandleInSameTitle(gamerHandle: DataView): boolean;

/**
   * _NETWORK_IS_FRIEND_HANDLE_ONLINE
   *
   * @param {DataView} gamerHandle
   * @return {boolean}
   */
declare function NetworkIsFriendHandleOnline(gamerHandle: DataView): boolean;

/**
   * _NETWORK_IS_IN_SESSION_LOBBY
   * Hardcoded to return false.
   *
  
   * @return {boolean}
   */
declare function NetworkIsInSessionLobby(): boolean;

/**
   * _NETWORK_IS_PLAYER_IN_SPECTATOR_MODE
   *
   * @param {number} player
   * @return {boolean}
   */
declare function NetworkIsPlayerInSpectatorMode(player: Player): boolean;

/**
   * _NETWORK_IS_PREVIOUS_UPLOAD_PENDING
   * _NETWORK_IS_T* - _NETWORK_RE*
   *
  
   * @return {boolean}
   */
declare function NetworkIsPreviousUploadPending(): boolean;

/**
   * _NETWORK_IS_RECENT_GAMER_NAMES_REQUEST_IN_PROGRESS
   *
  
   * @return {boolean}
   */
declare function NetworkIsRecentGamerNamesRequestInProgress(): boolean;

/**
   * _NETWORK_IS_THREAD_ACTIVE
   *
   * @param {number} threadId
   * @return {boolean}
   */
declare function NetworkIsThreadActive(threadId: number): boolean;

/**
   * _NETWORK_IS_TRACKED_PLAYER_VISIBLE
   *
   * @param {number} player
   * @param {number} trackedPlayer
   * @return {boolean}
   */
declare function NetworkIsTrackedPlayerVisible(player: Player, trackedPlayer: Player): boolean;

/**
   * _NETWORK_PERSONA_PHOTO_WRITE_LOCAL
   * Returns false if pedshot push failed
   *
   * @param {string | number} texture
   * @param {number} playerSlot
   * @param {number} p2
   * @param {number} personaPhotoLocalCacheType
   * @return {boolean}
   */
declare function NetworkPersonaPhotoWriteLocal(texture: string | number, playerSlot: number, p2: number, personaPhotoLocalCacheType: number): boolean;

/**
   * _NETWORK_PERSONA_PHOTO_WRITE_SC_PROFILE
   * Returns false if pedshot push failed
   *
   * @param {string | number} texture
   * @param {number} personaPhotoType
   * @param {number} formatIndex
   * @return {boolean}
   */
declare function NetworkPersonaPhotoWriteScProfile(texture: string | number, personaPhotoType: number, formatIndex: number): boolean;

/**
   * _NETWORK_REMOVE_FRIEND
   *
   * @param {DataView} gamerHandle
   * @return {boolean}
   */
declare function NetworkRemoveFriend(gamerHandle: DataView): boolean;

/**
   * _NETWORK_REQUEST_CONTROL_OF_ANIM_SCENE
   *
   * @param {number} animScene
   * @return {boolean}
   */
declare function NetworkRequestControlOfAnimScene(animScene: AnimScene): boolean;

/**
   * _NETWORK_RESURRECT_LOCAL_PLAYER_2
   *
   * @param {DataView} args
   * @return {void}
   */
declare function NetworkResurrectLocalPlayer_2(args: DataView): void;

/**
   * _NETWORK_SEND_SESSION_INVITE
   *
   * @param {DataView} gamerHandle
   * @param {string | number} contentId
   * @param {DataView} data
   * @param {number} dataSize
   * @param {number} p4
   * @param {number} flags
   * @return {boolean}
   */
declare function NetworkSendSessionInvite(gamerHandle: DataView, contentId: string | number, data: DataView, dataSize: number, p4: number, flags: number): boolean;

/**
   * _NETWORK_SESSION_ADD_SESSION_FLAGS
   * enum eSessionFlags
   * {
   *   SESSION_FLAG_NONE = 0,
   *   SF_INSTANCE = (1 << 0),
   *   SF_MATCH = (1 << 1),
   *   SF_PRIVATE = (1 << 2),
   *   SF_BLOCK_INVITES = (1 << 3),
   *   SF_BLOCK_JOIN_VIA_PRESENCE = (1 << 4),
   *   SF_BLOCK_NON_HOST_INVITES = (1 << 5),
   *   SF_BLOCK_IN_PROGRESS_MATCHMAKING_BACKFILL = (1 << 6),
   *   SF_BLOCK_IN_GAMEPLAY_MATCHMAKING_BACKFILL = (1 << 7),
   *   SF_BLOCK_INVITES_TEMPORARY = (1 << 8),
   *   SF_IN_GAMEPLAY = (1 << 9),
   *   SF_COMPETITIVE = (1 << 10),
   *   SF_MATCHMAKING_BACKFILL_IS_BLOCKED = (1 << 11)
   * };
   *
   * @param {number} flags
   * @return {boolean}
   */
declare function NetworkSessionAddSessionFlags(flags: number): boolean;

/**
   * _NETWORK_SESSION_ARE_SESSION_IDS_EQUAL
   * Note: this native was added in build 1311.23
   *
   * @param {DataView} sessionId1
   * @param {DataView} sessionId2
   * @return {boolean}
   */
declare function NetworkSessionAreSessionIdsEqual(sessionId1: DataView, sessionId2: DataView): boolean;

/**
   * _NETWORK_SESSION_CANCEL_REQUEST
   *
   * @param {DataView} sessionRequestId
   * @return {boolean}
   */
declare function NetworkSessionCancelRequest(sessionRequestId: DataView): boolean;

/**
   * _NETWORK_SESSION_GET_SESSION_ID
   * Note: this native was added in build 1311.23
   *
   * @param {DataView} sessionId
   * @return {void}
   */
declare function NetworkSessionGetSessionId(sessionId: DataView): void;

/**
   * _NETWORK_SESSION_GET_SESSION_REQUEST_RESULT
   * Returns result of session request:
   * 0 - NOT_FOUND
   * 1 - IN_PROGRESS
   * 2 - TIMEOUT
   * 3 - PLAYER_OFFLINE
   * 4 - GANG_MEMBERS_CHANGED
   * 5 - PLAYER_CANCELLED
   * 6 - PLAYER_SET_TOO_LARGE
   * 7 - MATCH_ACCEPTED
   * 8 - OTHER
   *
   * @param {DataView} sessionRequestId
   * @return {[number, number]}
   */
declare function NetworkSessionGetSessionRequestResult(sessionRequestId: DataView): [number, number];

/**
   * _NETWORK_SESSION_IS_NSRR_SUCCESS
   *
   * @param {DataView} sessionRequestId
   * @return {boolean}
   */
declare function NetworkSessionIsNsrrSuccess(sessionRequestId: DataView): boolean;

/**
   * _NETWORK_SESSION_IS_REQUEST_IN_PROGRESS_BY_QUEUE_GROUP
   *
   * @param {number} queueGroup
   * @return {boolean}
   */
declare function NetworkSessionIsRequestInProgressByQueueGroup(queueGroup: number): boolean;

/**
   * _NETWORK_SESSION_PLAYLIST_GET_UPCOMING_CONTENT
   * Only used in R* Script net_rolling_playlist
   *
  
   * @return {void}
   */
declare function NetworkSessionPlaylistGetUpcomingContent(): void;

/**
   * _NETWORK_SESSION_PLAYLIST_GO_TO_NEXT_CONTENT
   * Only used in R* Script net_rolling_playlist
   *
  
   * @return {void}
   */
declare function NetworkSessionPlaylistGoToNextContent(): void;

/**
   * _NETWORK_SESSION_REMOVE_PLAYER_FLAGS
   *
   * @param {number} flags
   * @return {boolean}
   */
declare function NetworkSessionRemovePlayerFlags(flags: number): boolean;

/**
   * _NETWORK_SESSION_REQUEST_SESSION_NOMINATED
   *
   * @param {number} flags
   * @param {number} userHash
   * @param {number} p2
   * @param {DataView} sessionRequestId
   * @return {boolean}
   */
declare function NetworkSessionRequestSessionNominated(flags: number, userHash: number, p2: number, sessionRequestId: DataView): boolean;

/**
   * _NETWORK_SESSION_REQUEST_SESSION_ON_CALL
   * category:
   * enum eOnCallType
   * {
   *   NETWORK_SESSION_REQUEST_ON_CALL_TYPE_STORY = 2,
   *   NETWORK_SESSION_REQUEST_ON_CALL_TYPE_MATCH = 3
   * };
   *
   * @param {number} flags
   * @param {number} category
   * @param {DataView} p2
   * @param {number} userHash
   * @param {DataView} sessionRequestId
   * @return {boolean}
   */
declare function NetworkSessionRequestSessionOnCall(flags: number, category: number, p2: DataView, userHash: number, sessionRequestId: DataView): boolean;

/**
   * _NETWORK_SESSION_SET_PLAYER_FLAGS
   *
   * @param {number} flags
   * @return {boolean}
   */
declare function NetworkSessionSetPlayerFlags(flags: number): boolean;

/**
   * _NETWORK_SESSION_TRANSITION_TO_SESSION
   *
   * @param {DataView} sessionRequestId
   * @return {boolean}
   */
declare function NetworkSessionTransitionToSession(sessionRequestId: DataView): boolean;

/**
   * _NETWORK_SET_IN_STATIC_SPECTATOR_MODE
   *
   * @param {boolean} toggle
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {void}
   */
declare function NetworkSetInStaticSpectatorMode(toggle: boolean, x: number, y: number, z: number): void;

/**
   * _NETWORK_SPAWN_CONFIG_ADD_EXCLUSION_VOLUME
   *
   * @param {number} volume
   * @return {void}
   */
declare function NetworkSpawnConfigAddExclusionVolume(volume: Volume): void;

/**
   * _NETWORK_SPAWN_CONFIG_ADD_PROPERTY_PREFERENCE
   *
   * @param {number} configProperty
   * @param {boolean} include
   * @param {number} weight
   * @return {void}
   */
declare function NetworkSpawnConfigAddPropertyPreference(configProperty: number, include: boolean, weight: number): void;

/**
   * _NETWORK_SPAWN_CONFIG_ADD_PROPERTY_SCRIPTED
   *
   * @param {number} configProperty
   * @param {boolean} include
   * @return {void}
   */
declare function NetworkSpawnConfigAddPropertyScripted(configProperty: number, include: boolean): void;

/**
   * _NETWORK_SPAWN_CONFIG_ADD_SPAWN_POINT
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} heading
   * @return {void}
   */
declare function NetworkSpawnConfigAddSpawnPoint(x: number, y: number, z: number, heading: number): void;

/**
   * _NETWORK_SPAWN_CONFIG_REMOVE_EXCLUSION_VOLUME
   *
   * @param {number} volume
   * @return {void}
   */
declare function NetworkSpawnConfigRemoveExclusionVolume(volume: Volume): void;

/**
   * _NETWORK_SPAWN_CONFIG_SEARCH_IN_PROGRESS
   *
  
   * @return {boolean}
   */
declare function NetworkSpawnConfigSearchInProgress(): boolean;

/**
   * _NETWORK_SPAWN_CONFIG_SET_CANCEL_SEARCH
   *
  
   * @return {void}
   */
declare function NetworkSpawnConfigSetCancelSearch(): void;

/**
   * _NETWORK_SPAWN_CONFIG_SET_LEVEL_WATER_DEPTH
   *
   * @param {number} waterDepthLevel
   * @return {void}
   */
declare function NetworkSpawnConfigSetLevelWaterDepth(waterDepthLevel: number): void;

/**
   * _NET_TO_ANIM_SCENE
   *
   * @param {number} netId
   * @return {number}
   */
declare function NetToAnimScene(netId: number): AnimScene;

/**
   * _NET_TO_PROPSET
   *
   * @param {number} netId
   * @return {number}
   */
declare function NetToPropset(netId: number): PropSet;

/**
   * _PEDMUGSHOT_GET_STATUS
   *
  
   * @return {number}
   */
declare function PedmugshotGetStatus(): number;

/**
   * _PEDMUGSHOT_REQUEST_SEND
   *
  
   * @return {any}
   */
declare function PedmugshotRequestSend(): any;

/**
   * _PEDMUGSHOT_TAKE
   *
  
   * @return {boolean}
   */
declare function PedmugshotTake(): boolean;

/**
   * _PROPSET_TO_NET
   *
   * @param {number} propSet
   * @return {number}
   */
declare function PropsetToNet(propSet: PropSet): number;

/**
   * _REPORT_PLAYER
   *
   * @param {number} player
   * @param {number} reportType
   * @param {string | number} description
   * @param {string | number} horseName
   * @return {void}
   */
declare function ReportPlayer(player: Player, reportType: number, description: string | number, horseName: string | number): void;

/**
   * _REQUEST_PEDSHOT_TEXTURE_LOCAL_BACKUP_DOWNLOAD
   * Only used in R* SP Scripts
   *
   * @param {number} player
   * @param {number} personaPhotoLocalCacheType
   * @return {string | number}
   */
declare function RequestPedshotTextureLocalBackupDownload(player: number, personaPhotoLocalCacheType: number): string | number;

/**
   * _REQUEST_PEDSHOT_TEXTURE_LOCAL_DOWNLOAD
   * Only used in R* SP Script map_app_event_handler
   *
   * @param {DataView} gamerHandle
   * @param {number} p1
   * @return {string | number}
   */
declare function RequestPedshotTextureLocalDownload(gamerHandle: DataView, p1: number): string | number;

/**
   * _REQUEST_PEDSHOT_TEXTURE_MULTIPLAYER_DOWNLOAD
   *
   * @param {DataView} gamerHandle
   * @param {number} p1
   * @return {string | number}
   */
declare function RequestPedshotTextureMultiplayerDownload(gamerHandle: DataView, p1: number): string | number;

/**
   * _SET_DOOR_NETWORKED
   *
   * @param {number} doorHash
   * @return {void}
   */
declare function SetDoorNetworked(doorHash: Hash): void;

/**
   * _SET_DOOR_UNNETWORKED
   *
   * @param {any} p0
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetDoorUnnetworked(p0: any, toggle: boolean): void;

/**
   * _SET_ENTITY_GHOSTED_TO_LOCAL_PLAYER
   *
   * @param {number} entity
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetEntityGhostedToLocalPlayer(entity: Entity, toggle: boolean): void;

/**
   * _SET_LAUNCH_PARAM_STRING
   *
   * @param {string | number} params
   * @return {void}
   */
declare function SetLaunchParamString(params: string | number): void;

/**
   * _SET_LAUNCH_PARAM_VALUE
   *
   * @param {string | number} paramName
   * @param {string | number} value
   * @return {void}
   */
declare function SetLaunchParamValue(paramName: string | number, value: string | number): void;

/**
   * _SET_LOCAL_PLAYER_DAMAGE_MULTIPLIER_FOR_PLAYER
   *
   * @param {number} player
   * @param {number} damageMultiplier
   * @return {void}
   */
declare function SetLocalPlayerDamageMultiplierForPlayer(player: Player, damageMultiplier: number): void;

/**
   * _SET_NETWORK_RESPOT_TIMER
   *
   * @param {number} entity
   * @param {number} timer
   * @param {boolean} p2
   * @return {void}
   */
declare function SetNetworkRespotTimer(entity: Entity, timer: number, p2: boolean): void;

/**
   * _SET_PLAYER_VISIBILITY_TO_LOCAL_PLAYER_DISABLED
   * _SET_PLAYER_V* - _SET_S*
   *
   * @param {number} player
   * @param {boolean} disabled
   * @return {void}
   */
declare function SetPlayerVisibilityToLocalPlayerDisabled(player: Player, disabled: boolean): void;

/**
   * _SET_SOCIAL_MATCHMAKING_ALLOWED
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetSocialMatchmakingAllowed(toggle: boolean): void;

/**
   * _TEXTURE_DOWNLOAD_RELEASE_BY_NAME
   *
   * @param {string | number} name
   * @return {void}
   */
declare function TextureDownloadReleaseByName(name: string | number): void;

/**
   * _TEXTURE_DOWNLOAD_TEXTURE_NAME_IS_VALID
   *
   * @param {string | number} name
   * @return {boolean}
   */
declare function TextureDownloadTextureNameIsValid(name: string | number): boolean;

/**
   * _UGC_HAS_PRIVILEGE
   * Checks if the user has ROS privilege 14.
   *
  
   * @return {boolean}
   */
declare function UgcHasPrivilege(): boolean;

/**
   * _UGC_IS_BOOK_MARKED
   *
   * @param {string | number} contentId
   * @return {boolean}
   */
declare function UgcIsBookMarked(contentId: string | number): boolean;

/**
   * _UGC_QUERY_BY_CATEGORY
   * Returns ugcRequestId
   *
   * @param {number} categoryType
   * @param {number} p1
   * @param {number} maxGet
   * @param {string | number} contentTypeName
   * @param {number} p4
   * @param {boolean} p5
   * @return {number}
   */
declare function UgcQueryByCategory(categoryType: number, p1: number, maxGet: number, contentTypeName: string | number, p4: number, p5: boolean): number;

/**
   * _UGC_QUERY_BY_CONTENT_ID
   * Returns ugcRequestId
   *
   * @param {string | number} contentId
   * @param {boolean} latestVersion
   * @param {string | number} contentTypeName
   * @return {number}
   */
declare function UgcQueryByContentId(contentId: string | number, latestVersion: boolean, contentTypeName: string | number): number;

/**
   * _UGC_QUERY_BY_CONTENT_TYPE
   * Returns ugcRequestId
   *
   * @param {number} p0
   * @param {number} maxGet
   * @param {string | number} contentTypeName
   * @param {number} p3
   * @param {number} p4
   * @param {number} p5
   * @return {number}
   */
declare function UgcQueryByContentType(p0: number, maxGet: number, contentTypeName: string | number, p3: number, p4: number, p5: number): number;

/**
   * _UGC_QUERY_GET_BOOK_MARKED
   *
   * @param {any} p0
   * @param {number} index
   * @return {boolean}
   */
declare function UgcQueryGetBookMarked(p0: any, index: number): boolean;

/**
   * _UGC_QUERY_GET_CREATOR_HANDLE
   *
   * @param {any} p0
   * @param {number} index
   * @param {DataView} gamerHandle
   * @return {any}
   */
declare function UgcQueryGetCreatorHandle(p0: any, index: number, gamerHandle: DataView): any;

/**
   * _UGC_QUERY_GET_CREATOR_PHOTO
   * Returns string for GET_STATUS_OF_LOAD_MISSION_CREATOR_PHOTO
   *
   * @param {any} p0
   * @param {number} p1
   * @param {any} p2
   * @return {string | number}
   */
declare function UgcQueryGetCreatorPhoto(p0: any, p1: number, p2: any): string | number;

/**
   * _UGC_QUERY_GET_DATE
   *
   * @param {any} p0
   * @param {number} index
   * @param {DataView} p2
   * @return {void}
   */
declare function UgcQueryGetDate(p0: any, index: number, p2: DataView): void;

/**
   * _UGC_QUERY_GET_LANGUAGE
   *
   * @param {any} p0
   * @param {number} index
   * @return {number}
   */
declare function UgcQueryGetLanguage(p0: any, index: number): number;

/**
   * _UGC_QUERY_GET_MISSION_DESC_HASH
   *
   * @param {any} p0
   * @param {number} index
   * @return {number}
   */
declare function UgcQueryGetMissionDescHash(p0: any, index: number): number;

/**
   * _UGC_QUERY_GET_NAME
   *
   * @param {any} p0
   * @param {number} index
   * @return {string | number}
   */
declare function UgcQueryGetName(p0: any, index: number): string | number;

/**
   * _UGC_QUERY_GET_OWNER_ID
   *
   * @param {any} p0
   * @param {number} index
   * @return {string | number}
   */
declare function UgcQueryGetOwnerId(p0: any, index: number): string | number;

/**
   * _UGC_QUERY_GET_PLAYLIST_NAME
   *
   * @param {any} p0
   * @param {number} index
   * @return {string | number}
   */
declare function UgcQueryGetPlaylistName(p0: any, index: number): string | number;

/**
   * _UGC_QUERY_GET_POSIX_PUBLISHED_DATE
   *
   * @param {any} p0
   * @param {any} p1
   * @return {number}
   */
declare function UgcQueryGetPosixPublishedDate(p0: any, p1: any): number;

/**
   * _UGC_QUERY_GET_POSIX_UPDATED_DATE
   *
   * @param {any} p0
   * @param {any} p1
   * @return {number}
   */
declare function UgcQueryGetPosixUpdatedDate(p0: any, p1: any): number;

/**
   * _UGC_QUERY_GET_PUBLISHED
   *
   * @param {any} p0
   * @param {any} p1
   * @return {boolean}
   */
declare function UgcQueryGetPublished(p0: any, p1: any): boolean;

/**
   * _UGC_QUERY_GET_RATING
   *
   * @param {any} p0
   * @param {number} index
   * @param {number} p2
   * @return {number}
   */
declare function UgcQueryGetRating(p0: any, index: number, p2: number): number;

/**
   * _UGC_QUERY_GET_ROOT_CONTENT_ID
   *
   * @param {any} p0
   * @param {number} index
   * @return {string | number}
   */
declare function UgcQueryGetRootContentId(p0: any, index: number): string | number;

/**
   * _UGC_QUERY_GET_VERSION
   *
   * @param {any} p0
   * @param {number} index
   * @param {number} p2
   * @return {number}
   */
declare function UgcQueryGetVersion(p0: any, index: number, p2: number): number;