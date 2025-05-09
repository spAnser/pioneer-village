/**
 * ADD_SHOCKING_EVENT_AT_POSITION
 * eventType: https://alloc8or.re/rdr3/doc/enums/eEventType.txt
 * https://github.com/femga/rdr3_discoveries/blob/master/AI/EVENTS
 *
 * @param {number} eventType
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} p4
 * @param {number} p5
 * @param {number} p6
 * @param {number} p7
 * @param {number} p8
 * @param {number} p9
 * @param {number} p10
 * @return {number}
 */
declare function AddShockingEventAtPosition(eventType: Hash, x: number, y: number, z: number, p4: number, p5: number, p6: number, p7: number, p8: number, p9: number, p10: number): ScrHandle;

/**
 * ADD_SHOCKING_EVENT_FOR_ENTITY
 * eventType: https://alloc8or.re/rdr3/doc/enums/eEventType.txt
 *
 * @param {number} eventType
 * @param {number} entity
 * @param {number} p2
 * @param {number} p3
 * @param {number} p4
 * @param {number} p5
 * @param {number} p6
 * @param {number} p7
 * @param {boolean} p8
 * @param {boolean} p9
 * @param {number} p10
 * @param {number} p11
 * @return {number}
 */
declare function AddShockingEventForEntity(eventType: Hash, entity: Entity, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number, p8: boolean, p9: boolean, p10: number, p11: number): ScrHandle;

/**
 * IS_SHOCKING_EVENT_IN_SPHERE
 * eventType: https://alloc8or.re/rdr3/doc/enums/eEventType.txt
 *
 * @param {number} eventType
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} radius
 * @return {boolean}
 */
declare function IsShockingEventInSphere(eventType: Hash, x: number, y: number, z: number, radius: number): boolean;

/**
 * REMOVE_ALL_SHOCKING_EVENTS
 *
 * @param {boolean} p0
 * @return {void}
 */
declare function RemoveAllShockingEvents(p0: boolean): void;

/**
 * REMOVE_ALL_SHOCKING_EVENTS_OF_TYPE
 * eventType: https://alloc8or.re/rdr3/doc/enums/eEventType.txt
 *
 * @param {number} eventType
 * @param {boolean} p1
 * @return {void}
 */
declare function RemoveAllShockingEventsOfType(eventType: Hash, p1: boolean): void;

/**
 * REMOVE_SHOCKING_EVENT
 *
 * @param {number} event
 * @return {boolean}
 */
declare function RemoveShockingEvent(event: ScrHandle): boolean;

/**
 * REMOVE_SHOCKING_EVENT_SPAWN_BLOCKING_AREAS
 *

 * @return {void}
 */
declare function RemoveShockingEventSpawnBlockingAreas(): void;

/**
 * SET_DECISION_MAKER
 *
 * @param {number} ped
 * @param {number} name
 * @return {void}
 */
declare function SetDecisionMaker(ped: Ped, name: Hash): void;

/**
 * SET_DECISION_MAKER_TO_DEFAULT
 *
 * @param {number} ped
 * @return {void}
 */
declare function SetDecisionMakerToDefault(ped: Ped): void;

/**
 * SUPPRESS_SHOCKING_EVENTS_NEXT_FRAME
 *

 * @return {void}
 */
declare function SuppressShockingEventsNextFrame(): void;

/**
 * _0x18E93EBFC1FCFA48
 * Only used in R* SP Script beat_rat_infestation and homeinvasion
 *
 * @param {number} volume
 * @param {boolean} p1
 * @param {boolean} p2
 * @return {any}
 */
declare function N_0x18E93EBFC1FCFA48(volume: Volume, p1: boolean, p2: boolean): any;

/**
 * _0x1A5C5D350068A673
 * AGGRO_CHECK_PROPERTY_DAMAGE: Property damage found with event
 *
 * @param {number} ped
 * @param {number} p1
 * @return {void}
 */
declare function N_0x1A5C5D350068A673(ped: Ped, p1: number): void;

/**
 * _0x1D1B448D719415AB
 * _GET*
 *
 * @param {number} ped
 * @return {any}
 */
declare function N_0x1D1B448D719415AB(ped: Ped): any;

/**
 * _0x26054EB81AC0893B
 *
 * @param {number} object
 * @return {boolean}
 */
declare function N_0x26054EB81AC0893B(object: number): boolean;

/**
 * _0x2DD42FAD06E6F19E
 *
 * @param {number} object
 * @param {boolean} p1
 * @param {boolean} p2
 * @return {any}
 */
declare function N_0x2DD42FAD06E6F19E(object: number, p1: boolean, p2: boolean): any;

/**
 * _0x36D0F2BA2C0D9BDE
 * _ADD* (_ADD_SHOCKING_EVENT_* ?)
 *
 * @param {number} entity
 * @param {number} p1
 * @return {any}
 */
declare function N_0x36D0F2BA2C0D9BDE(entity: Entity, p1: number): any;

/**
 * _0x4465C3D1475BD3FD
 *
 * @param {number} model
 * @return {void}
 */
declare function N_0x4465C3D1475BD3FD(model: Hash): void;

/**
 * _0x4B2B1A891D437CA7
 * Only used in R* SP Script coachrobberies
 * _SET_S*
 *
 * @param {number} p0
 * @return {void}
 */
declare function N_0x4B2B1A891D437CA7(p0: number): void;

/**
 * _0x56B3410626A473E7
 * Only used in R* SP Script beat_rat_infestation
 * Params: p0 = value returned by 0x18E93EBFC1FCFA48
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x56B3410626A473E7(p0: any): void;

/**
 * _0x7C511E91738A0828
 * Only used in R* SP Scripts
 * Hash only used in R* Script mob3.ysc: ROBBERY
 * _ADD_PED*
 *
 * @param {number} ped1
 * @param {number} ped2
 * @param {number} p2
 * @param {number} p3
 * @return {void}
 */
declare function N_0x7C511E91738A0828(ped1: Ped, ped2: Ped, p2: number, p3: Hash): void;

/**
 * _0x83D43F0FD5276E4D
 * _GET*
 *
 * @param {number} entity
 * @param {number} p1
 * @return {any}
 */
declare function N_0x83D43F0FD5276E4D(entity: Entity, p1: number): any;

/**
 * _0x9520175B35E2268D
 * _SET_P*
 *
 * @param {number} ped
 * @param {boolean} p1
 * @return {void}
 */
declare function N_0x9520175B35E2268D(ped: Ped, p1: boolean): void;

/**
 * _0xA86B0EE9B39D15D6
 *
 * @param {number} object
 * @return {void}
 */
declare function N_0xA86B0EE9B39D15D6(object: number): void;

/**
 * _0xAD17A18215DD23D6
 * Might return time since some (?) event.
 *
 * @param {number} entity
 * @param {number} p1
 * @param {number} p2
 * @return {number}
 */
declare function N_0xAD17A18215DD23D6(entity: Entity, p1: number, p2: number): number;

/**
 * _0xB6F4825153920582
 * _S* (_SUPPRESS_EVENTS_NEXT_FRAME?)
 *

 * @return {void}
 */
declare function N_0xB6F4825153920582(): void;

/**
 * _0xE28D7FC9FD32ABEB
 * HAS_ACTOR_RECEIVED_TRACKED_EVENT_THAT_SHOULD_ALERT - iTimeSinceEvent >= iTimeLimitMS
 *
 * @param {number} entity
 * @param {number} eventType
 * @param {number} p2
 * @return {void}
 */
declare function N_0xE28D7FC9FD32ABEB(entity: Entity, eventType: Hash, p2: number): void;

/**
 * _0xE2C2FBB7825FFC66
 *

 * @return {void}
 */
declare function N_0xE2C2FBB7825FFC66(): void;

/**
 * _ADD_MODEL_TO_EVENT_MONITOR
 * Models used in the scripts: P_REGISTER05X, P_REGISTER06X, P_REGISTER03X, PLAYER_ZERO, PLAYER_THREE, A_C_HORSE_MORGAN_FLAXENCHESTNUT
 *
 * @param {number} model
 * @param {boolean} p1
 * @param {boolean} p2
 * @return {void}
 */
declare function AddModelToEventMonitor(model: Hash, p1: boolean, p2: boolean): void;

/**
 * _CREATE_SHOCKING_EVENT
 *
 * @param {DataView} args
 * @return {number}
 */
declare function CreateShockingEvent(args: DataView): ScrHandle;

/**
 * _EVENT_FLUSH_ALL_EVENT_TRACKERS
 *
 * @param {number} ped
 * @return {void}
 */
declare function EventFlushAllEventTrackers(ped: Ped): void;

/**
 * _EVENT_GET_RECENT_EVENT
 * Returns eventType
 *
 * @param {number} entity
 * @param {number} p1
 * @param {number} p2
 * @return {number}
 */
declare function EventGetRecentEvent(entity: Entity, p1: number, p2: number): number;

/**
 * _EVENT_GET_SOURCE_ENTITY_FROM_EVENT
 *
 * @param {number} entity
 * @param {number} eventType
 * @param {number} p2
 * @param {number} p3
 * @return {number}
 */
declare function EventGetSourceEntityFromEvent(entity: Entity, eventType: Hash, p2: number, p3: number): Entity;

/**
 * _EVENT_GET_TARGET_ENTITY_FROM_EVENT
 *
 * @param {number} entity
 * @param {number} eventType
 * @param {number} p2
 * @param {number} p3
 * @return {number}
 */
declare function EventGetTargetEntityFromEvent(entity: Entity, eventType: Hash, p2: number, p3: number): Entity;

/**
 * _EVENT_GET_TIME_SINCE_EVENT
 *
 * @param {number} entity
 * @param {number} eventType
 * @param {number} p2
 * @param {number} p3
 * @return {number}
 */
declare function EventGetTimeSinceEvent(entity: Entity, eventType: Hash, p2: number, p3: number): number;

/**
 * _IS_EVENT_TRACKER_ACTIVE
 *
 * @param {string | number} eventName
 * @param {number} shockingEvent
 * @return {boolean}
 */
declare function IsEventTrackerActive(eventName: string | number, shockingEvent: Hash): boolean;

/**
 * _REMOVE_ALL_SHOCKING_EVENTS_IN_AREA
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} radius
 * @param {boolean} p4
 * @return {void}
 */
declare function RemoveAllShockingEventsInArea(x: number, y: number, z: number, radius: number, p4: boolean): void;

/**
 * _REMOVE_ALL_SHOCKING_EVENTS_OF_TYPE_IN_AREA
 * eventType: https://alloc8or.re/rdr3/doc/enums/eEventType.txt
 *
 * @param {number} eventType
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} radius
 * @param {boolean} p5
 * @return {void}
 */
declare function RemoveAllShockingEventsOfTypeInArea(eventType: Hash, x: number, y: number, z: number, radius: number, p5: boolean): void;

/**
 * _SET_EVENT_TRACKER_FOR_PED
 *
 * @param {number} ped
 * @param {string | number} eventName
 * @param {number} p2
 * @return {void}
 */
declare function SetEventTrackerForPed(ped: Ped, eventName: string | number, p2: number): void;