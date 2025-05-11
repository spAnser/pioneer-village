/**
   * BOUNTY_GET_BOUNTY_ON_PLAYER
   *
   * @param {DataView} gamerHandle
   * @param {DataView} bountyData
   * @return {boolean}
   */
declare function BountyGetBountyOnPlayer(gamerHandle: DataView, bountyData: DataView): boolean;

/**
   * BOUNTY_GET_COOLDOWN_COLLECTION
   *
   * @param {DataView} p0
   * @return {boolean}
   */
declare function BountyGetCooldownCollection(p0: DataView): boolean;

/**
   * BOUNTY_GET_LEGENDARY_TARGET
   *
   * @param {any} p0
   * @param {DataView} p1
   * @return {boolean}
   */
declare function BountyGetLegendaryTarget(p0: any, p1: DataView): boolean;

/**
   * BOUNTY_GET_WANTED_POSTER_SLOT
   *
   * @param {number} p0
   * @param {number} p1
   * @param {DataView} p2
   * @return {boolean}
   */
declare function BountyGetWantedPosterSlot(p0: Hash, p1: Hash, p2: DataView): boolean;

/**
   * BOUNTY_REQUEST_BEGIN_LEGENDARY_MISSION
   *
   * @param {DataView} outRpcGuid
   * @param {number} p1
   * @param {number} p2
   * @return {boolean}
   */
declare function BountyRequestBeginLegendaryMission(outRpcGuid: DataView, p1: number, p2: number): boolean;

/**
   * BOUNTY_REQUEST_BEGIN_LEGENDARY_MISSION_FOR_POSSE
   *
   * @param {DataView} outRpcGuid
   * @param {number} p1
   * @param {number} p2
   * @return {boolean}
   */
declare function BountyRequestBeginLegendaryMissionForPosse(outRpcGuid: DataView, p1: number, p2: number): boolean;

/**
   * _0x27D3A0E1FE090A43
   * _BOUNTY_IS_* or _BOUNTY_REQUEST_*
   *
   * @param {DataView} p0
   * @return {boolean}
   */
declare function N_0x27D3A0E1FE090A43(p0: DataView): boolean;

/**
   * _0x81847C2134039BDC
   *
   * @param {DataView} p0
   * @return {boolean}
   */
declare function N_0x81847C2134039BDC(p0: DataView): boolean;

/**
   * _0x86EC5F83867C4B70
   * _BOUNTY_C* or _BOUNTY_GET_*
   *
   * @param {DataView} p0
   * @return {boolean}
   */
declare function N_0x86EC5F83867C4B70(p0: DataView): boolean;

/**
   * _0xD6A67E2FF373D0E3
   * _BOUNTY_GET_*
   *
   * @param {number} p0
   * @return {number}
   */
declare function N_0xD6A67E2FF373D0E3(p0: number): number;

/**
   * _0xF8BCC5ECA33AC9C1
   * _BOUNTY_GET_*
   *
  
   * @return {number}
   */
declare function N_0xF8BCC5ECA33AC9C1(): number;

/**
   * _BOUNTY_CANCEL_LEGENDARY_MISSION
   *
  
   * @return {void}
   */
declare function BountyCancelLegendaryMission(): void;

/**
   * _BOUNTY_CANCEL_WANTED_POSTER
   *
  
   * @return {void}
   */
declare function BountyCancelWantedPoster(): void;

/**
   * _BOUNTY_CLEAR_BEING_BOUNTY_HUNTER
   *
  
   * @return {void}
   */
declare function BountyClearBeingBountyHunter(): void;

/**
   * _BOUNTY_CLEAR_BEING_TARGET
   *
  
   * @return {void}
   */
declare function BountyClearBeingTarget(): void;

/**
   * _BOUNTY_IS_REQUEST_PENDING
   *
   * @param {DataView} rpcGuid
   * @return {boolean}
   */
declare function BountyIsRequestPending(rpcGuid: DataView): boolean;

/**
   * _BOUNTY_REQUEST_BECOME_TARGET_OF_CHARACTER_BOUNTY_HUNT
   *
   * @param {DataView} outRpcGuid
   * @return {boolean}
   */
declare function BountyRequestBecomeTargetOfCharacterBountyHunt(outRpcGuid: DataView): boolean;

/**
   * _BOUNTY_REQUEST_BEGIN_WANTED_POSTER
   *
   * @param {DataView} outRpcGuid
   * @param {number} p1
   * @return {boolean}
   */
declare function BountyRequestBeginWantedPoster(outRpcGuid: DataView, p1: number): boolean;

/**
   * _BOUNTY_REQUEST_BRIBE_JAIL_GUARD
   *
   * @param {DataView} outRpcGuid
   * @param {number} p1
   * @return {boolean}
   */
declare function BountyRequestBribeJailGuard(outRpcGuid: DataView, p1: number): boolean;

/**
   * _BOUNTY_REQUEST_CLAIM_CHARACTER_BOUNTY
   *
   * @param {DataView} outRpcGuid
   * @param {number} p1
   * @param {DataView} p2
   * @return {boolean}
   */
declare function BountyRequestClaimCharacterBounty(outRpcGuid: DataView, p1: number, p2: DataView): boolean;

/**
   * _BOUNTY_REQUEST_COMPLETE_LEGENDARY_MISSION
   *
   * @param {DataView} outRpcGuid
   * @param {DataView} p1
   * @return {boolean}
   */
declare function BountyRequestCompleteLegendaryMission(outRpcGuid: DataView, p1: DataView): boolean;

/**
   * _BOUNTY_REQUEST_COMPLETE_SPLIT_WANTED_POSTER
   *
   * @param {DataView} outRpcGuid
   * @param {DataView} p1
   * @return {boolean}
   */
declare function BountyRequestCompleteSplitWantedPoster(outRpcGuid: DataView, p1: DataView): boolean;

/**
   * _BOUNTY_REQUEST_COMPLETE_WANTED_POSTER
   *
   * @param {DataView} outRpcGuid
   * @param {DataView} p1
   * @return {boolean}
   */
declare function BountyRequestCompleteWantedPoster(outRpcGuid: DataView, p1: DataView): boolean;

/**
   * _BOUNTY_REQUEST_ESCAPED_CHARACTER_BOUNTY_HUNT
   *
   * @param {DataView} outRpcGuid
   * @return {boolean}
   */
declare function BountyRequestEscapedCharacterBountyHunt(outRpcGuid: DataView): boolean;

/**
   * _BOUNTY_REQUEST_PAY_OFF_BOUNTY
   *
   * @param {DataView} outRpcGuid
   * @return {boolean}
   */
declare function BountyRequestPayOffBounty(outRpcGuid: DataView): boolean;

/**
   * _BOUNTY_REQUEST_PAY_OFF_BOUNTY_EX
   *
   * @param {DataView} outRpcGuid
   * @param {number} p1
   * @param {number} costType
   * @return {boolean}
   */
declare function BountyRequestPayOffBountyEx(outRpcGuid: DataView, p1: Hash, costType: Hash): boolean;

/**
   * _BOUNTY_REQUEST_POSSE_LEADER_CLAIM_CHARACTER_BOUNTY
   *
   * @param {DataView} outRpcGuid
   * @param {number} p1
   * @param {DataView} p2
   * @return {boolean}
   */
declare function BountyRequestPosseLeaderClaimCharacterBounty(outRpcGuid: DataView, p1: number, p2: DataView): boolean;

/**
   * _BOUNTY_REQUEST_POSSE_LEADER_ESCAPED_CHARACTER_BOUNTY_HUNT
   *
   * @param {DataView} outRpcGuid
   * @return {boolean}
   */
declare function BountyRequestPosseLeaderEscapedCharacterBountyHunt(outRpcGuid: DataView): boolean;

/**
   * _BOUNTY_REQUEST_POSSE_MEMBER_CLAIM_CHARACTER_BOUNTY_SHARE
   *
   * @param {DataView} outRpcGuid
   * @param {DataView} p1
   * @return {boolean}
   */
declare function BountyRequestPosseMemberClaimCharacterBountyShare(outRpcGuid: DataView, p1: DataView): boolean;

/**
   * _BOUNTY_REQUEST_POSSE_MEMBER_ESCAPED_CHARACTER_BOUNTY_HUNT
   *
   * @param {DataView} outRpcGuid
   * @return {boolean}
   */
declare function BountyRequestPosseMemberEscapedCharacterBountyHunt(outRpcGuid: DataView): boolean;

/**
   * _BOUNTY_REQUEST_SELF_REPORT_CRIME
   * crimeType: see _REPORT_CRIME
   *
   * @param {DataView} outRpcGuid
   * @param {number} crimeType
   * @param {boolean} p2
   * @return {boolean}
   */
declare function BountyRequestSelfReportCrime(outRpcGuid: DataView, crimeType: Hash, p2: boolean): boolean;

/**
   * _BOUNTY_REQUEST_SELF_REPORT_KILLED_BY_BOUNTY_HUNTER
   *
   * @param {DataView} outRpcGuid
   * @return {boolean}
   */
declare function BountyRequestSelfReportKilledByBountyHunter(outRpcGuid: DataView): boolean;

/**
   * _BOUNTY_REQUEST_SERVED_FULL_JAIL_SENTENCE
   *
   * @param {DataView} outRpcGuid
   * @return {boolean}
   */
declare function BountyRequestServedFullJailSentence(outRpcGuid: DataView): boolean;