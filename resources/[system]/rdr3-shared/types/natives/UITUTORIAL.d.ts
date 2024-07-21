/**
 * _UITUTORIAL_GET_IS_THREAT_INDICATOR_CAPABLE_RADAR_SHOWN
 *

 * @return {boolean}
 */
declare function UitutorialGetIsThreatIndicatorCapableRadarShown(): boolean;

/**
 * _UITUTORIAL_GET_IS_THREAT_INDICATOR_ON
 *

 * @return {boolean}
 */
declare function UitutorialGetIsThreatIndicatorOn(): boolean;

/**
 * _UITUTORIAL_SET_RPG_ICON_VISIBILITY
 * enum eRpgIcons
 * {
 *   ICON_STAMINA,
 *   ICON_STAMINA_CORE,
 *   ICON_DEADEYE,
 *   ICON_DEADEYE_CORE,
 *   ICON_HEALTH,
 *   ICON_HEALTH_CORE,
 *   ICON_HORSE_HEALTH,
 *   ICON_HORSE_HEALTH_CORE,
 *   ICON_HORSE_STAMINA,
 *   ICON_HORSE_STAMINA_CORE,
 *   ICON_HORSE_COURAGE,
 *   ICON_HORSE_COURAGE_CORE
 * };
 * 
 * enum eRpgIconVisibility
 * {
 *   ICON_VISIBILITY_WAIT_TO_HIDE,
 *   ICON_VISIBILITY_ALWAYS_SHOW,
 *   ICON_VISIBILITY_ALWAYS_HIDE,
 *   ICON_VISIBILITY_ALWAYS_BLINK
 * };
 *
 * @param {number} rpgIcon
 * @param {number} visibility
 * @return {void}
 */
declare function UitutorialSetRpgIconVisibility(rpgIcon: number, visibility: number): void;