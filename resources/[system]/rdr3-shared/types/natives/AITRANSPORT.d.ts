/**
 * GET_TRANSPORT_CONFIG_FLAG
 * flagId: see SET_TRANSPORT_CONFIG_FLAG
 *
 * @param {number} transportEntity
 * @param {number} flagId
 * @param {boolean} p2
 * @return {boolean}
 */
declare function GetTransportConfigFlag(transportEntity: Entity, flagId: number, p2: boolean): boolean;

/**
 * IS_PED_ENTERING_TRANSPORT
 *
 * @param {number} ped
 * @param {number} transportEntity
 * @param {boolean} p2
 * @return {boolean}
 */
declare function IsPedEnteringTransport(ped: Ped, transportEntity: Entity, p2: boolean): boolean;

/**
 * IS_PED_EXITING_TRANSPORT
 *
 * @param {number} ped
 * @param {number} transportEntity
 * @return {boolean}
 */
declare function IsPedExitingTransport(ped: Ped, transportEntity: Entity): boolean;

/**
 * SET_PED_OFF_TRANSPORT_SEAT
 *
 * @param {number} ped
 * @param {number} flags
 * @return {void}
 */
declare function SetPedOffTransportSeat(ped: Ped, flags: number): void;

/**
 * SET_PED_ON_TRANSPORT_SEAT
 * seat: see CREATE_PED_INSIDE_VEHICLE
 *
 * @param {number} ped
 * @param {number} transportEntity
 * @param {number} seat
 * @param {number} flags
 * @return {void}
 */
declare function SetPedOnTransportSeat(ped: Ped, transportEntity: Entity, seat: number, flags: number): void;

/**
 * SET_TRANSPORT_ACCESSIBLE_SEAT_FLAGS
 *
 * @param {number} transportEntity
 * @param {number} flags
 * @return {void}
 */
declare function SetTransportAccessibleSeatFlags(transportEntity: Entity, flags: number): void;

/**
 * SET_TRANSPORT_CONFIG_FLAG
 * flagId:
 * enum eTransportConfigFlags
 * {
 *   TCF_NotConsideredForEntryByLocalPlayer,
 *   TCF_0xB78D6624,
 *   TCF_0xA9700425,
 *   TCF_0x8D7E4641,
 *   TCF_0xF24BAA1F,
 *   TCF_0x63B77935,
 *   TCF_NotConsideredForEntryByAllPlayers,
 *   TCF_0xD17A2AFD,
 *   TCF_0xD4E4FDD5,
 *   TCF_0x8227C929,
 *   TCF_0x812C1070,
 *   TCF_0x0E1AB26F,
 *   TCF_0xBF4EC863,
 *   TCF_0x75660C36,
 *   TCF_0xA2539E20,
 *   TCF_0x9162C633,
 *   TCF_DisableHonorModifiers,
 *   TCF_0xF9E71CB6,
 *   TCF_0x933ECD3F,
 *   TCF_0x18513A34
 * };
 * https://github.com/femga/rdr3_discoveries/tree/master/AI/TRANSPORT_CONFIG_FLAGS
 *
 * @param {number} transportEntity
 * @param {number} flagId
 * @param {boolean} value
 * @return {void}
 */
declare function SetTransportConfigFlag(transportEntity: Entity, flagId: number, value: boolean): void;

/**
 * TASK_ENTER_TRANSPORT
 *
 * @param {DataView} args
 * @return {void}
 */
declare function TaskEnterTransport(args: DataView): void;

/**
 * TASK_EXIT_TRANSPORT
 *
 * @param {DataView} args
 * @return {void}
 */
declare function TaskExitTransport(args: DataView): void;

/**
 * _0x4248AB2EEB3C75AD
 * _SET_TRANSPORT_*
 *
 * @param {number} transportEntity
 * @param {number} ped
 * @param {boolean} p2
 * @return {void}
 */
declare function N_0x4248AB2EEB3C75AD(transportEntity: Entity, ped: Ped, p2: boolean): void;

/**
 * _0x4B6C9A43F7D9109B
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x4B6C9A43F7D9109B(p0: any, p1: any): void;

/**
 * _0x5639FBEA922788DA
 * _CLEAR_A*
 *
 * @param {number} transportEntity
 * @return {void}
 */
declare function N_0x5639FBEA922788DA(transportEntity: Entity): void;

/**
 * _0x8C8371EDFAF014A0
 * _SET_TRANSPORT_*
 *
 * @param {number} ped
 * @param {number} p1
 * @return {void}
 */
declare function N_0x8C8371EDFAF014A0(ped: Ped, p1: number): void;

/**
 * _0xF8C20282B237E3F7
 * _SET_TRANSPORT_*
 *
 * @param {number} ped
 * @return {void}
 */
declare function N_0xF8C20282B237E3F7(ped: Ped): void;

/**
 * _GET_PED_IN_TRANSPORT_SEAT
 * seatIndex: see CREATE_PED_INSIDE_VEHICLE
 *
 * @param {number} transportEntity
 * @param {number} seatIndex
 * @return {number}
 */
declare function GetPedInTransportSeat(transportEntity: Entity, seatIndex: number): Ped;

/**
 * _GET_TRANSPORT_USAGE_FLAGS
 * See _SET_TRANSPORT_USAGE_FLAGS
 *
 * @param {number} transportEntity
 * @return {[any, number]}
 */
declare function GetTransportUsageFlags(transportEntity: Entity): [any, number];

/**
 * _IS_PED_ON_TRANSPORT_ENTITY
 * Checks if ped is placed on target transportEntity
 *
 * @param {number} ped
 * @param {number} transportEntity
 * @return {boolean}
 */
declare function IsPedOnTransportEntity(ped: Ped, transportEntity: Entity): boolean;

/**
 * _IS_PED_ON_TRANSPORT_SEAT
 *
 * @param {number} ped
 * @param {boolean} p1
 * @return {boolean}
 */
declare function IsPedOnTransportSeat(ped: Ped, p1: boolean): boolean;

/**
 * _IS_TRANSPORT_SEAT_FREE
 * Called together with IS_VEHICLE_SEAT_FREE
 *
 * @param {number} transportEntity
 * @param {number} seatIndex
 * @return {boolean}
 */
declare function IsTransportSeatFree(transportEntity: Entity, seatIndex: number): boolean;

/**
 * _IS_TRANSPORT_SEAT_OCCUPIED
 *
 * @param {number} transportEntity
 * @param {number} seatIndex
 * @return {boolean}
 */
declare function IsTransportSeatOccupied(transportEntity: Entity, seatIndex: number): boolean;

/**
 * _SET_AI_CAN_USE_TRANSPORT
 *
 * @param {number} transportEntity
 * @param {boolean} state
 * @return {void}
 */
declare function SetAiCanUseTransport(transportEntity: Entity, state: boolean): void;

/**
 * _SET_PED_USE_TRANSPORT_SEAT_PREFERENCE
 *
 * @param {number} ped
 * @param {number} transportEntity
 * @param {number} preferenceSlot
 * @param {number} p3
 * @param {number} seatIndex
 * @return {void}
 */
declare function SetPedUseTransportSeatPreference(ped: Ped, transportEntity: Entity, preferenceSlot: number, p3: number, seatIndex: number): void;

/**
 * _SET_TRANSPORT_PRIORITY_SEAT
 *
 * @param {number} transportEntity
 * @param {number} seatIndex
 * @return {void}
 */
declare function SetTransportPrioritySeat(transportEntity: Entity, seatIndex: number): void;

/**
 * _SET_TRANSPORT_USAGE_FLAGS
 * enum eTransportUsageFlags
 * {
 *   TUF_INVALID = 0,
 *   TUF_ALLOW_DRIVER_ME = (1 << 0),
 *   TUF_ALLOW_DRIVER_GANG = (1 << 1),
 *   TUF_ALLOW_DRIVER_CREW = (1 << 2),
 *   TUF_ALLOW_DRIVER_FRIENDS = (1 << 3),
 *   TUF_ALLOW_DRIVER_ANYONE = (1 << 4),
 *   TUF_ALLOW_PASSENGER_ME = (1 << 5),
 *   TUF_ALLOW_PASSENGER_GANG = (1 << 6),
 *   TUF_ALLOW_PASSENGER_CREW = (1 << 7),
 *   TUF_ALLOW_PASSENGER_FRIENDS = (1 << 8),
 *   TUF_ALLOW_PASSENGER_ANYONE = (1 << 9),
 *   TUF_ALLOW_ACCESS_AI = (1 << 10)
 * };
 *
 * @param {number} transportEntity
 * @param {number} flags
 * @return {void}
 */
declare function SetTransportUsageFlags(transportEntity: Entity, flags: number): void;