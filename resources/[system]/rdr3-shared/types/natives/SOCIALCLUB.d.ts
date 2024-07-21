/**
 * SC_COMMUNITY_EVENT_GET_DISPLAY_NAME
 *

 * @return {[boolean, string]}
 */
declare function ScCommunityEventGetDisplayName(): [boolean, string];

/**
 * SC_COMMUNITY_EVENT_GET_DISPLAY_NAME_BY_ID
 *
 * @param {number} p0
 * @return {[boolean, string]}
 */
declare function ScCommunityEventGetDisplayNameById(p0: number): [boolean, string];

/**
 * SC_COMMUNITY_EVENT_GET_DISPLAY_NAME_FOR_TYPE
 *
 * @param {string | number} p1
 * @return {[boolean, string]}
 */
declare function ScCommunityEventGetDisplayNameForType(p1: string | number): [boolean, string];

/**
 * SC_COMMUNITY_EVENT_GET_EVENT_ID
 *

 * @return {number}
 */
declare function ScCommunityEventGetEventId(): number;

/**
 * SC_COMMUNITY_EVENT_GET_EVENT_ID_FOR_TYPE
 *
 * @param {string | number} p0
 * @return {number}
 */
declare function ScCommunityEventGetEventIdForType(p0: string | number): number;

/**
 * SC_COMMUNITY_EVENT_GET_EXTRA_DATA_FLOAT
 *
 * @param {string | number} p0
 * @return {[boolean, number]}
 */
declare function ScCommunityEventGetExtraDataFloat(p0: string | number): [boolean, number];

/**
 * SC_COMMUNITY_EVENT_GET_EXTRA_DATA_FLOAT_BY_ID
 *
 * @param {number} p0
 * @param {string | number} p1
 * @return {[boolean, number]}
 */
declare function ScCommunityEventGetExtraDataFloatById(p0: number, p1: string | number): [boolean, number];

/**
 * SC_COMMUNITY_EVENT_GET_EXTRA_DATA_FLOAT_FOR_TYPE
 *
 * @param {string | number} p0
 * @param {string | number} p2
 * @return {[boolean, number]}
 */
declare function ScCommunityEventGetExtraDataFloatForType(p0: string | number, p2: string | number): [boolean, number];

/**
 * SC_COMMUNITY_EVENT_GET_EXTRA_DATA_INT
 *
 * @param {string | number} p0
 * @return {[boolean, number]}
 */
declare function ScCommunityEventGetExtraDataInt(p0: string | number): [boolean, number];

/**
 * SC_COMMUNITY_EVENT_GET_EXTRA_DATA_INT_BY_ID
 *
 * @param {number} p0
 * @param {string | number} p1
 * @return {[boolean, number]}
 */
declare function ScCommunityEventGetExtraDataIntById(p0: number, p1: string | number): [boolean, number];

/**
 * SC_COMMUNITY_EVENT_GET_EXTRA_DATA_INT_FOR_TYPE
 *
 * @param {string | number} p0
 * @param {string | number} p2
 * @return {[boolean, number]}
 */
declare function ScCommunityEventGetExtraDataIntForType(p0: string | number, p2: string | number): [boolean, number];

/**
 * SC_COMMUNITY_EVENT_GET_EXTRA_DATA_STRING
 *
 * @param {string | number} p0
 * @return {[boolean, string]}
 */
declare function ScCommunityEventGetExtraDataString(p0: string | number): [boolean, string];

/**
 * SC_COMMUNITY_EVENT_GET_EXTRA_DATA_STRING_BY_ID
 *
 * @param {number} p0
 * @param {string | number} p1
 * @return {[boolean, string]}
 */
declare function ScCommunityEventGetExtraDataStringById(p0: number, p1: string | number): [boolean, string];

/**
 * SC_COMMUNITY_EVENT_GET_EXTRA_DATA_STRING_FOR_TYPE
 *
 * @param {string | number} p0
 * @param {string | number} p2
 * @return {[boolean, string]}
 */
declare function ScCommunityEventGetExtraDataStringForType(p0: string | number, p2: string | number): [boolean, string];

/**
 * SC_COMMUNITY_EVENT_IS_ACTIVE
 *

 * @return {boolean}
 */
declare function ScCommunityEventIsActive(): boolean;

/**
 * SC_COMMUNITY_EVENT_IS_ACTIVE_BY_ID
 *
 * @param {number} p0
 * @return {boolean}
 */
declare function ScCommunityEventIsActiveById(p0: number): boolean;

/**
 * SC_COMMUNITY_EVENT_IS_ACTIVE_FOR_TYPE
 *
 * @param {string | number} p0
 * @return {boolean}
 */
declare function ScCommunityEventIsActiveForType(p0: string | number): boolean;

/**
 * SC_INBOX_GET_MESSAGE_IS_READ_AT_INDEX
 *
 * @param {number} msgIndex
 * @return {boolean}
 */
declare function ScInboxGetMessageIsReadAtIndex(msgIndex: number): boolean;

/**
 * SC_INBOX_GET_MESSAGE_TYPE_AT_INDEX
 *
 * @param {number} msgIndex
 * @return {number}
 */
declare function ScInboxGetMessageTypeAtIndex(msgIndex: number): number;

/**
 * SC_INBOX_GET_TOTAL_NUM_MESSAGES
 *

 * @return {number}
 */
declare function ScInboxGetTotalNumMessages(): number;

/**
 * SC_INBOX_MESSAGE_GET_DATA_INT
 *
 * @param {number} p0
 * @param {string | number} context
 * @return {[boolean, number]}
 */
declare function ScInboxMessageGetDataInt(p0: number, context: string | number): [boolean, number];

/**
 * SC_INBOX_MESSAGE_GET_DATA_STRING
 *
 * @param {number} p0
 * @param {string | number} context
 * @return {[boolean, string]}
 */
declare function ScInboxMessageGetDataString(p0: number, context: string | number): [boolean, string];

/**
 * SC_INBOX_MESSAGE_GET_RAW_TYPE_AT_INDEX
 *
 * @param {number} p0
 * @return {string | number}
 */
declare function ScInboxMessageGetRawTypeAtIndex(p0: number): string | number;

/**
 * SC_INBOX_SET_MESSAGE_AS_READ_AT_INDEX
 *
 * @param {number} msgIndex
 * @return {boolean}
 */
declare function ScInboxSetMessageAsReadAtIndex(msgIndex: number): boolean;

/**
 * SC_PRESENCE_ATTR_SET_FLOAT
 *
 * @param {number} attrHash
 * @param {number} value
 * @return {boolean}
 */
declare function ScPresenceAttrSetFloat(attrHash: Hash, value: number): boolean;

/**
 * SC_PRESENCE_ATTR_SET_FLOAT_EX
 *
 * @param {string | number} attrName
 * @param {number} value
 * @param {boolean} p2
 * @return {boolean}
 */
declare function ScPresenceAttrSetFloatEx(attrName: string | number, value: number, p2: boolean): boolean;

/**
 * SC_PRESENCE_ATTR_SET_INT_EX
 *
 * @param {string | number} attrName
 * @param {number} value
 * @param {boolean} p2
 * @return {boolean}
 */
declare function ScPresenceAttrSetIntEx(attrName: string | number, value: number, p2: boolean): boolean;

/**
 * SC_PRESENCE_ATTR_SET_STRING_EX
 *
 * @param {string | number} attrName
 * @param {string | number} value
 * @param {boolean} p2
 * @return {boolean}
 */
declare function ScPresenceAttrSetStringEx(attrName: string | number, value: string | number, p2: boolean): boolean;

/**
 * SC_PROFANITY_CHECK_STRING
 * Starts a task to check an entered string for profanity on the ROS/Social Club services.
 *
 * @param {string | number} string
 * @return {[boolean, number]}
 */
declare function ScProfanityCheckString(string: string | number): [boolean, number];

/**
 * SC_PROFANITY_GET_CHECK_IS_PENDING
 *
 * @param {number} token
 * @return {boolean}
 */
declare function ScProfanityGetCheckIsPending(token: number): boolean;

/**
 * SC_PROFANITY_GET_CHECK_IS_VALID
 *
 * @param {number} token
 * @return {boolean}
 */
declare function ScProfanityGetCheckIsValid(token: number): boolean;

/**
 * SC_PROFANITY_GET_STRING_PASSED
 *
 * @param {number} token
 * @return {boolean}
 */
declare function ScProfanityGetStringPassed(token: number): boolean;

/**
 * SC_PROFANITY_GET_STRING_STATUS
 *
 * @param {number} token
 * @return {number}
 */
declare function ScProfanityGetStringStatus(token: number): number;