/**
 * _UI_STICKY_FEED_CLEAR_MESSAGE
 *
 * @param {number} msgId
 * @return {void}
 */
declare function UiStickyFeedClearMessage(msgId: number): void;

/**
 * _UI_STICKY_FEED_CREATE_DEATH_FAIL_MESSAGE
 * Example: https://pastebin.com/JygJShNU
 *
 * @param {DataView} p0
 * @param {DataView} p1
 * @param {boolean} p2
 * @return {number}
 */
declare function UiStickyFeedCreateDeathFailMessage(p0: DataView, p1: DataView, p2: boolean): number;

/**
 * _UI_STICKY_FEED_CREATE_ERROR_MESSAGE
 * Example: https://pastebin.com/EJD7ytnz
 *
 * @param {DataView} p0
 * @param {DataView} p1
 * @param {boolean} p2
 * @return {number}
 */
declare function UiStickyFeedCreateErrorMessage(p0: DataView, p1: DataView, p2: boolean): number;

/**
 * _UI_STICKY_FEED_CREATE_WARNING_MESSAGE
 * Example: https://pastebin.com/6mLtee2S
 *
 * @param {DataView} p0
 * @param {DataView} p1
 * @param {boolean} p2
 * @return {number}
 */
declare function UiStickyFeedCreateWarningMessage(p0: DataView, p1: DataView, p2: boolean): number;

/**
 * _UI_STICKY_FEED_GET_MESSAGE_STATE
 * Returns state of sticky feed message, see 0x59FA676177DBE4C9
 *
 * @param {number} msgId
 * @return {number}
 */
declare function UiStickyFeedGetMessageState(msgId: number): number;

/**
 * _UI_STICKY_FEED_IS_ALERT_SCREEN_ACTIVE
 *

 * @return {boolean}
 */
declare function UiStickyFeedIsAlertScreenActive(): boolean;

/**
 * _UI_STICKY_FEED_IS_CHANNEL_ACTIVE
 * stickyFeedChannel: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/eUIStickyFeedChannel
 *
 * @param {number} stickyFeedChannel
 * @return {boolean}
 */
declare function UiStickyFeedIsChannelActive(stickyFeedChannel: number): boolean;

/**
 * _UI_STICKY_FEED_UPDATE_MESSAGE
 * Seems to only update _UI_STICKY_FEED_CREATE_ERROR_MESSAGE(0x9F2CC2439A04E7BA) and _UI_STICKY_FEED_CREATE_DEATH_FAIL_MESSAGE(0x815C4065AE6E6071) message.
 * Example: https://pastebin.com/nDrJyWq2
 *
 * @param {number} msgId
 * @param {DataView} p1
 * @param {boolean} p2
 * @return {void}
 */
declare function UiStickyFeedUpdateMessage(msgId: number, p1: DataView, p2: boolean): void;