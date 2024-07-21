/**
 * MISSIONDATA_GET_CATAGORY
 *
 * @param {number} missionId
 * @return {number}
 */
declare function MissiondataGetCatagory(missionId: Hash): number;

/**
 * MISSIONDATA_GET_HIGH_SCORE
 *
 * @param {number} missionId
 * @return {number}
 */
declare function MissiondataGetHighScore(missionId: Hash): number;

/**
 * MISSIONDATA_GET_RATING
 *
 * @param {number} missionId
 * @return {number}
 */
declare function MissiondataGetRating(missionId: Hash): number;

/**
 * MISSIONDATA_GET_REPLAY_STATE
 *
 * @param {any} p0
 * @return {number}
 */
declare function MissiondataGetReplayState(p0: any): number;

/**
 * MISSIONDATA_GET_TEXTURE_NAME
 *
 * @param {number} missionId
 * @return {number}
 */
declare function MissiondataGetTextureName(missionId: Hash): number;

/**
 * MISSIONDATA_GET_TEXTURE_TXD
 *
 * @param {number} missionId
 * @return {number}
 */
declare function MissiondataGetTextureTxd(missionId: Hash): number;

/**
 * MISSIONDATA_IS_REQUIRED_STORY_MISSION
 *
 * @param {number} missionId
 * @return {boolean}
 */
declare function MissiondataIsRequiredStoryMission(missionId: Hash): boolean;

/**
 * MISSIONDATA_IS_VALID
 *
 * @param {any} p0
 * @return {boolean}
 */
declare function MissiondataIsValid(p0: any): boolean;

/**
 * MISSIONDATA_SET_HIGH_SCORE
 *
 * @param {number} missionId
 * @param {number} score
 * @return {void}
 */
declare function MissiondataSetHighScore(missionId: Hash, score: number): void;

/**
 * MISSIONDATA_SET_RATING_SCORES
 *
 * @param {number} missionId
 * @param {number} bronzeScore
 * @param {number} silverScore
 * @param {number} goldScore
 * @return {void}
 */
declare function MissiondataSetRatingScores(missionId: Hash, bronzeScore: number, silverScore: number, goldScore: number): void;

/**
 * MISSIONDATA_SET_REPLAY_LOCKED_FOR_CATEGORY
 *
 * @param {number} category
 * @param {boolean} locked
 * @return {void}
 */
declare function MissiondataSetReplayLockedForCategory(category: Hash, locked: boolean): void;

/**
 * MISSIONDATA_WAS_COMPLETED
 * see: missions.meta
 *
 * @param {number} missionId
 * @return {boolean}
 */
declare function MissiondataWasCompleted(missionId: Hash): boolean;

/**
 * _MISSIONDATA_IS_REPLAY_CATEGORY_LOCKED
 *
 * @param {number} category
 * @return {boolean}
 */
declare function MissiondataIsReplayCategoryLocked(category: Hash): boolean;

/**
 * _MISSIONDATA_SET_MISSION_RATING
 * MISSION_RATING_INCOMPLETE = 0,
 * MISSION_RATING_SKIPPED,
 * MISSION_RATING_COMPLETE,
 * MISSION_RATING_BRONZE,
 * MISSION_RATING_SILVER,
 * MISSION_RATING_GOLD,
 *
 * @param {number} missionId
 * @param {number} rating
 * @return {void}
 */
declare function MissiondataSetMissionRating(missionId: Hash, rating: number): void;

/**
 * _MISSIONDATA_SET_REPLAY_STATE_LOCKED
 * replayState: MISSIONDATA_GET_REPLAY_STATE
 *
 * @param {number} missionId
 * @param {number} replayState
 * @return {void}
 */
declare function MissiondataSetReplayStateLocked(missionId: Hash, replayState: number): void;

/**
 * _MISSIONDATA_TIMECYCLE_BOX_DELETE
 *

 * @return {void}
 */
declare function MissiondataTimecycleBoxDelete(): void;

/**
 * _MISSIONDATA_TIMECYCLE_BOX_EXISTS
 *

 * @return {boolean}
 */
declare function MissiondataTimecycleBoxExists(): boolean;

/**
 * _MISSIONDATA_TIMECYCLE_BOX_SET_MODIFIER
 *
 * @param {string | number} timecycleName
 * @return {void}
 */
declare function MissiondataTimecycleBoxSetModifier(timecycleName: string | number): void;