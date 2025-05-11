/**
   * UI_FEED_CLEAR_CHANNEL
   * feedChannel: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/eUIFeedChannel
   *
   * @param {number} feedChannel
   * @param {boolean} p1
   * @param {boolean} p2
   * @return {void}
   */
declare function UiFeedClearChannel(feedChannel: number, p1: boolean, p2: boolean): void;

/**
   * UI_FEED_GET_CURRENT_MESSAGE
   * feedChannel: see UI_FEED_CLEAR_CHANNEL
   * Returns feedMessage
   *
   * @param {number} feedChannel
   * @return {number}
   */
declare function UiFeedGetCurrentMessage(feedChannel: number): number;

/**
   * _0x0FD07141AD048AAE
   * Only used in R* SP Script beat_animal_attack
   * Returns feedMessage
   *
   * @param {DataView} p0
   * @param {boolean} p1
   * @return {number}
   */
declare function N_0x0FD07141AD048AAE(p0: DataView, p1: boolean): number;

/**
   * _0x18D6869FBFFEC0F8
   * Only used in R* SP Scripts
   *
   * @param {DataView} p0
   * @param {DataView} p1
   * @param {boolean} p2
   * @param {boolean} p3
   * @return {number}
   */
declare function N_0x18D6869FBFFEC0F8(p0: DataView, p1: DataView, p2: boolean, p3: boolean): number;

/**
   * _0x4E88A65968A55C78
   * Returns feedMessage
   *
   * @param {DataView} p0
   * @param {boolean} p1
   * @return {number}
   */
declare function N_0x4E88A65968A55C78(p0: DataView, p1: boolean): number;

/**
   * _0x6D85126F6CCF02C9
   *
   * @param {number} feedChannel
   * @param {number} p1
   * @param {boolean} p2
   * @return {void}
   */
declare function N_0x6D85126F6CCF02C9(feedChannel: number, p1: number, p2: boolean): void;

/**
   * _0xAFF5BE9BA496CE40
   *
   * @param {DataView} p0
   * @param {DataView} p1
   * @param {boolean} p2
   * @param {boolean} p3
   * @param {number} collectableCategory
   * @return {number}
   */
declare function N_0xAFF5BE9BA496CE40(p0: DataView, p1: DataView, p2: boolean, p3: boolean, collectableCategory: Hash): number;

/**
   * _0xB7223B91CD6B7E07
   *
   * @param {number} feedChannel
   * @return {boolean}
   */
declare function N_0xB7223B91CD6B7E07(feedChannel: number): boolean;

/**
   * _UI_FEED_CLEAR_ALL_CHANNELS
   * Hides Toast Notifications
   *
  
   * @return {void}
   */
declare function UiFeedClearAllChannels(): void;

/**
   * _UI_FEED_CLEAR_HELP_TEXT_FEED
   * Clears help text
   *
   * @param {number} feedMessage
   * @param {boolean} p1
   * @return {void}
   */
declare function UiFeedClearHelpTextFeed(feedMessage: number, p1: boolean): void;

/**
   * _UI_FEED_GET_MESSAGE_STATE
   * Returns messageState, see https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/eUIMessageState
   *
   * @param {number} feedMessage
   * @return {number}
   */
declare function UiFeedGetMessageState(feedMessage: number): number;

/**
   * _UI_FEED_POST_FEED_TICKER
   * Display text on right of the screen, Example : https://pastebin.com/n1YmNe25
   *
   * @param {DataView} p0
   * @param {DataView} p1
   * @param {boolean} p2
   * @return {number}
   */
declare function UiFeedPostFeedTicker(p0: DataView, p1: DataView, p2: boolean): number;

/**
   * _UI_FEED_POST_GAME_UPDATE_SHARD
   *
   * @param {DataView} p0
   * @param {DataView} p1
   * @param {boolean} p2
   * @return {number}
   */
declare function UiFeedPostGameUpdateShard(p0: DataView, p1: DataView, p2: boolean): number;

/**
   * _UI_FEED_POST_HELP_TEXT
   * Example : https://pastebin.com/GvdBp8Dh
   *
   * @param {DataView} p0
   * @param {DataView} p1
   * @param {boolean} p2
   * @return {number}
   */
declare function UiFeedPostHelpText(p0: DataView, p1: DataView, p2: boolean): number;

/**
   * _UI_FEED_POST_LOCATION_SHARD
   * Example : https://pastebin.com/h1YzycuR
   *
   * @param {DataView} duration
   * @param {DataView} data
   * @param {boolean} p2
   * @param {boolean} p3
   * @return {number}
   */
declare function UiFeedPostLocationShard(duration: DataView, data: DataView, p2: boolean, p3: boolean): number;

/**
   * _UI_FEED_POST_MISSION_NAME
   *
   * @param {DataView} p0
   * @param {DataView} p1
   * @param {boolean} p2
   * @return {number}
   */
declare function UiFeedPostMissionName(p0: DataView, p1: DataView, p2: boolean): number;

/**
   * _UI_FEED_POST_OBJECTIVE
   * Example : https://pastebin.com/13tuRa63
   *
   * @param {DataView} p0
   * @param {DataView} p1
   * @param {boolean} p2
   * @return {number}
   */
declare function UiFeedPostObjective(p0: DataView, p1: DataView, p2: boolean): number;

/**
   * _UI_FEED_POST_ONE_TEXT_SHARD
   *
   * @param {DataView} p0
   * @param {DataView} p1
   * @param {boolean} p2
   * @return {number}
   */
declare function UiFeedPostOneTextShard(p0: DataView, p1: DataView, p2: boolean): number;

/**
   * _UI_FEED_POST_RANKUP_TOAST
   *
   * @param {DataView} p0
   * @param {DataView} p1
   * @param {number} p2
   * @param {number} p3
   * @return {number}
   */
declare function UiFeedPostRankupToast(p0: DataView, p1: DataView, p2: number, p3: number): number;

/**
   * _UI_FEED_POST_RETICLE_MESSAGE
   *
   * @param {DataView} p0
   * @param {DataView} p1
   * @param {boolean} p2
   * @return {number}
   */
declare function UiFeedPostReticleMessage(p0: DataView, p1: DataView, p2: boolean): number;

/**
   * _UI_FEED_POST_SAMPLE_NOTIFICATION
   * Example : https://pastebin.com/kAtEMQTD
   *
   * @param {DataView} p0
   * @param {DataView} p1
   * @param {number} p2
   * @param {number} p3
   * @return {number}
   */
declare function UiFeedPostSampleNotification(p0: DataView, p1: DataView, p2: number, p3: number): number;

/**
   * _UI_FEED_POST_SAMPLE_TOAST
   * Example : https://pastebin.com/YZMBkAmW
   *
   * @param {DataView} p0
   * @param {DataView} p1
   * @param {boolean} p2
   * @param {boolean} p3
   * @return {number}
   */
declare function UiFeedPostSampleToast(p0: DataView, p1: DataView, p2: boolean, p3: boolean): number;

/**
   * _UI_FEED_POST_SAMPLE_TOAST_RIGHT
   *
   * @param {DataView} p0
   * @param {DataView} p1
   * @param {boolean} p2
   * @return {number}
   */
declare function UiFeedPostSampleToastRight(p0: DataView, p1: DataView, p2: boolean): number;

/**
   * _UI_FEED_POST_SAMPLE_TOAST_WITH_APP_LINK
   *
   * @param {DataView} p0
   * @param {DataView} p1
   * @param {boolean} p2
   * @param {boolean} p3
   * @param {boolean} p4
   * @return {number}
   */
declare function UiFeedPostSampleToastWithAppLink(p0: DataView, p1: DataView, p2: boolean, p3: boolean, p4: boolean): number;

/**
   * _UI_FEED_POST_THREE_TEXT_SHARD
   *
   * @param {DataView} p0
   * @param {DataView} p1
   * @param {boolean} p2
   * @param {boolean} p3
   * @param {boolean} p4
   * @return {number}
   */
declare function UiFeedPostThreeTextShard(p0: DataView, p1: DataView, p2: boolean, p3: boolean, p4: boolean): number;

/**
   * _UI_FEED_POST_TWO_TEXT_SHARD
   *
   * @param {DataView} p0
   * @param {DataView} p1
   * @param {boolean} p2
   * @param {boolean} p3
   * @return {number}
   */
declare function UiFeedPostTwoTextShard(p0: DataView, p1: DataView, p2: boolean, p3: boolean): number;

/**
   * _UI_FEED_POST_VOICE_CHAT_FEED
   *
   * @param {DataView} p0
   * @param {DataView} p1
   * @param {boolean} p2
   * @return {number}
   */
declare function UiFeedPostVoiceChatFeed(p0: DataView, p1: DataView, p2: boolean): number;