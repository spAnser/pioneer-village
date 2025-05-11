/**
   * NETWORK_CLAN_GET_LOCAL_MEMBERSHIPS_COUNT
   *
  
   * @return {number}
   */
declare function NetworkClanGetLocalMembershipsCount(): number;

/**
   * NETWORK_CLAN_GET_MEMBERSHIP_DESC
   *
   * @param {DataView} memberDesc
   * @param {number} p1
   * @return {boolean}
   */
declare function NetworkClanGetMembershipDesc(memberDesc: DataView, p1: number): boolean;

/**
   * NETWORK_CLAN_IS_EMBLEM_READY
   *
   * @param {any} p0
   * @param {DataView} p1
   * @return {boolean}
   */
declare function NetworkClanIsEmblemReady(p0: any, p1: DataView): boolean;

/**
   * NETWORK_CLAN_PLAYER_GET_DESC
   *
   * @param {DataView} clanDesc
   * @param {number} bufferSize
   * @param {DataView} gamerHandle
   * @return {boolean}
   */
declare function NetworkClanPlayerGetDesc(clanDesc: DataView, bufferSize: number, gamerHandle: DataView): boolean;

/**
   * NETWORK_CLAN_PLAYER_IS_ACTIVE
   *
   * @param {DataView} gamerHandle
   * @return {boolean}
   */
declare function NetworkClanPlayerIsActive(gamerHandle: DataView): boolean;

/**
   * NETWORK_CLAN_RELEASE_EMBLEM
   *
   * @param {any} p0
   * @return {void}
   */
declare function NetworkClanReleaseEmblem(p0: any): void;

/**
   * NETWORK_CLAN_REQUEST_EMBLEM
   *
   * @param {any} p0
   * @return {boolean}
   */
declare function NetworkClanRequestEmblem(p0: any): boolean;

/**
   * NETWORK_CLAN_SERVICE_IS_VALID
   *
  
   * @return {boolean}
   */
declare function NetworkClanServiceIsValid(): boolean;

/**
   * NETWORK_FIND_GAMERS_IN_CREW
   *
   * @param {number} crewId
   * @return {boolean}
   */
declare function NetworkFindGamersInCrew(crewId: number): boolean;

/**
   * NETWORK_GET_PRIMARY_CLAN_DATA_CLEAR
   *
  
   * @return {any}
   */
declare function NetworkGetPrimaryClanDataClear(): any;

/**
   * NETWORK_GET_PRIMARY_CLAN_DATA_NEW
   *
   * @param {DataView} p0
   * @param {DataView} p1
   * @return {boolean}
   */
declare function NetworkGetPrimaryClanDataNew(p0: DataView, p1: DataView): boolean;

/**
   * NETWORK_GET_PRIMARY_CLAN_DATA_PENDING
   *
  
   * @return {any}
   */
declare function NetworkGetPrimaryClanDataPending(): any;

/**
   * NETWORK_GET_PRIMARY_CLAN_DATA_START
   *
   * @param {DataView} p0
   * @param {any} p1
   * @return {boolean}
   */
declare function NetworkGetPrimaryClanDataStart(p0: DataView, p1: any): boolean;

/**
   * NETWORK_GET_PRIMARY_CLAN_DATA_SUCCESS
   *
  
   * @return {any}
   */
declare function NetworkGetPrimaryClanDataSuccess(): any;

/**
   * _0x58D378AF2C8765B7
   *
   * @param {any} p0
   * @return {boolean}
   */
declare function N_0x58D378AF2C8765B7(p0: any): boolean;

/**
   * _NETWORK_ACCEPT_CLAN_INVITE
   *
   * @param {number} crewInviteIndex
   * @return {boolean}
   */
declare function NetworkAcceptClanInvite(crewInviteIndex: number): boolean;

/**
   * _NETWORK_CLAN_INVITE_PLAYER
   *
   * @param {any} p0
   * @return {boolean}
   */
declare function NetworkClanInvitePlayer(p0: any): boolean;

/**
   * _NETWORK_CLAN_SET_ACTIVE
   *
   * @param {any} p0
   * @return {any}
   */
declare function NetworkClanSetActive(p0: any): any;