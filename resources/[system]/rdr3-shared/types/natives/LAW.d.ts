/**
 * ADD_BOUNTY
 *
 * @param {number} player
 * @param {number} itemValueAmount
 * @return {void}
 */
declare function AddBounty(player: Player, itemValueAmount: number): void;

/**
 * ARE_WITNESSES_ACTIVE
 *
 * @param {number} player
 * @return {boolean}
 */
declare function AreWitnessesActive(player: Player): boolean;

/**
 * CLEAR_BOUNTY
 *
 * @param {number} player
 * @return {void}
 */
declare function ClearBounty(player: Player): void;

/**
 * CLEAR_PLAYER_PAST_CRIMES
 *
 * @param {number} player
 * @return {void}
 */
declare function ClearPlayerPastCrimes(player: Player): void;

/**
 * CLEAR_WANTED_SCORE
 *
 * @param {number} player
 * @return {void}
 */
declare function ClearWantedScore(player: Player): void;

/**
 * GET_BOUNTY
 *
 * @param {number} player
 * @return {number}
 */
declare function GetBounty(player: Player): number;

/**
 * GET_PLAYER_REGISTERED_CRIME
 *
 * @param {number} player
 * @param {number} p1
 * @return {[boolean, number]}
 */
declare function GetPlayerRegisteredCrime(player: Player, p1: number): [boolean, number];

/**
 * GET_WANTED_SCORE
 *
 * @param {number} player
 * @return {number}
 */
declare function GetWantedScore(player: Player): number;

/**
 * IS_LAW_INCIDENT_ACTIVE
 *
 * @param {number} player
 * @return {boolean}
 */
declare function IsLawIncidentActive(player: Player): boolean;

/**
 * NUM_CRIMES_SUPPRESSED
 * Returns amount of suppressed crimes to be used later in the function MPINTRO_CRIME_MONITOR_MAINTAIN
 *
 * @param {number} player
 * @param {number} crimeType
 * @return {number}
 */
declare function NumCrimesSuppressed(player: Player, crimeType: Hash): number;

/**
 * RESET_WANTED_FOR_NEW_INCIDENT
 *
 * @param {number} player
 * @return {void}
 */
declare function ResetWantedForNewIncident(player: Player): void;

/**
 * SET_BOUNTY
 *
 * @param {number} player
 * @param {number} amount
 * @return {void}
 */
declare function SetBounty(player: Player, amount: number): void;

/**
 * SET_DISABLE_DISTURBANCE_CRIMES
 *
 * @param {number} player
 * @param {boolean} p1
 * @return {void}
 */
declare function SetDisableDisturbanceCrimes(player: Player, p1: boolean): void;

/**
 * SET_LAW_SENSE_RANGE_MODIFIER
 * Default range is 1.0f
 *
 * @param {number} player
 * @param {number} range
 * @return {void}
 */
declare function SetLawSenseRangeModifier(player: Player, range: number): void;

/**
 * SET_PLAYER_ARRESTED_IN_REGION
 *
 * @param {number} player
 * @param {number} lawRegionHash
 * @return {void}
 */
declare function SetPlayerArrestedInRegion(player: Player, lawRegionHash: Hash): void;

/**
 * SET_PLAYER_TURNED_IN_BOUNTY_IN_REGION
 *
 * @param {number} player
 * @param {number} lawRegionHash
 * @return {void}
 */
declare function SetPlayerTurnedInBountyInRegion(player: Player, lawRegionHash: Hash): void;

/**
 * SET_POSTPONE_DISTURBANCE_CRIMES_DURING_COMBAT
 *
 * @param {number} player
 * @param {boolean} p1
 * @return {void}
 */
declare function SetPostponeDisturbanceCrimesDuringCombat(player: Player, p1: boolean): void;

/**
 * SET_WANTED_SCORE
 *
 * @param {number} player
 * @param {number} intensity
 * @return {void}
 */
declare function SetWantedScore(player: Player, intensity: number): void;

/**
 * SUPPRESS_CRIME_THIS_FRAME
 * crimeType: see _REPORT_CRIME
 *
 * @param {number} player
 * @param {number} crimeType
 * @param {number} p2
 * @param {number} p3
 * @param {number} p4
 * @return {void}
 */
declare function SuppressCrimeThisFrame(player: Player, crimeType: Hash, p2: number, p3: number, p4: number): void;

/**
 * _0x00DB0BC05E3FAA4E
 *
 * @param {number} ped
 * @param {number} bitset
 * @return {void}
 */
declare function N_0x00DB0BC05E3FAA4E(ped: Ped, bitset: number): void;

/**
 * _0x018F30D762E62DF8
 *
 * @param {number} ped
 * @param {DataView} p1
 * @return {any}
 */
declare function N_0x018F30D762E62DF8(ped: Ped, p1: DataView): any;

/**
 * _0x07E8B8B20570271C
 * Used in SP only, called together with 0x55F37F5F3F2475E1 & CLEAR_WANTED_SCORE
 * _REPORT_*
 *
 * @param {number} player
 * @return {void}
 */
declare function N_0x07E8B8B20570271C(player: Player): void;

/**
 * _0x0BDFEBCF40A5F7E3
 * Only used in net_fetch R* Script
 *
 * @param {number} crimeType
 * @return {number}
 */
declare function N_0x0BDFEBCF40A5F7E3(crimeType: Hash): number;

/**
 * _0x0C392DB374655176
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} p3
 * @param {number} itemSet
 * @return {void}
 */
declare function N_0x0C392DB374655176(x: number, y: number, z: number, p3: number, itemSet: ItemSet): void;

/**
 * _0x0DBACA9C38C9A686
 * Only used in sisikapenitentiary R* Script: name = SISIKA
 * _IS_G* or _IS_H*
 *
 * @param {string | number} name
 * @return {boolean}
 */
declare function N_0x0DBACA9C38C9A686(name: string | number): boolean;

/**
 * _0x0EAF918F751F27BA
 *
 * @param {number} ped
 * @return {boolean}
 */
declare function N_0x0EAF918F751F27BA(ped: Ped): boolean;

/**
 * _0x0F230DE0DDBE3649
 *
 * @param {number} player
 * @return {boolean}
 */
declare function N_0x0F230DE0DDBE3649(player: Player): boolean;

/**
 * _0x148E7AC8141C9E64
 *
 * @param {number} player
 * @return {number}
 */
declare function N_0x148E7AC8141C9E64(player: Player): number;

/**
 * _0x15ABD5004CAD2D99
 * Params: p0 either 0, 1 or -1 in R* Scripts
 * Set to 0 called together with _SUPPRESS_CRIME
 *
 * @param {number} p0
 * @return {void}
 */
declare function N_0x15ABD5004CAD2D99(p0: number): void;

/**
 * _0x2001687F9562FD9D
 * Only used in resapwn_dump_body R* Script
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x2001687F9562FD9D(p0: any): void;

/**
 * _0x21213B833EF4DAE7
 *
 * @param {number} player
 * @param {number} ped
 * @return {Vector3}
 */
declare function N_0x21213B833EF4DAE7(player: Player, ped: Ped): Vector3;

/**
 * _0x22741652985C84D0
 * Used in SP only
 * _REPORT_*
 *
 * @param {number} player
 * @param {number} lawRegionHash
 * @return {void}
 */
declare function N_0x22741652985C84D0(player: Player, lawRegionHash: Hash): void;

/**
 * _0x26934083D3F2579C
 *
 * @param {number} player
 * @return {boolean}
 */
declare function N_0x26934083D3F2579C(player: Player): boolean;

/**
 * _0x292AD61A33A7A485
 * Only used in R* Script fm_mission_controller
 * _CLEAR_WANTED_*
 *

 * @return {void}
 */
declare function N_0x292AD61A33A7A485(): void;

/**
 * _0x29CD4896ECB66C12
 *

 * @return {void}
 */
declare function N_0x29CD4896ECB66C12(): void;

/**
 * _0x318F0F9A4426CFA2
 * Only used in R* SP Script av_amb_camp_robbery
 *
 * @param {number} ped
 * @param {DataView} p1
 * @return {any}
 */
declare function N_0x318F0F9A4426CFA2(ped: Ped, p1: DataView): any;

/**
 * _0x331D349E0380B097
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x331D349E0380B097(p0: any): void;

/**
 * _0x3738B784DDD35CC6
 *
 * @param {number} player
 * @param {number} p1
 * @param {number} p2
 * @return {boolean}
 */
declare function N_0x3738B784DDD35CC6(player: Player, p1: number, p2: number): boolean;

/**
 * _0x3852237A3D9DF145
 *
 * @param {number} p0
 * @return {void}
 */
declare function N_0x3852237A3D9DF145(p0: number): void;

/**
 * _0x390710D2DAFA6BFF
 * _CLEAR*
 *
 * @param {number} player
 * @param {boolean} p1
 * @return {void}
 */
declare function N_0x390710D2DAFA6BFF(player: Player, p1: boolean): void;

/**
 * _0x3D2674828A4E6B3C
 *

 * @return {boolean}
 */
declare function N_0x3D2674828A4E6B3C(): boolean;

/**
 * _0x40851BCC33ACD9AB
 *
 * @param {number} ped
 * @return {boolean}
 */
declare function N_0x40851BCC33ACD9AB(ped: Ped): boolean;

/**
 * _0x522F74636DF10201
 *
 * @param {number} player
 * @param {number} itemSet
 * @return {void}
 */
declare function N_0x522F74636DF10201(player: Player, itemSet: ItemSet): void;

/**
 * _0x5E6F375CA101C108
 * Only used in R* SP Scripts
 *
 * @param {number} player
 * @param {boolean} p1
 * @return {void}
 */
declare function N_0x5E6F375CA101C108(player: Player, p1: boolean): void;

/**
 * _0x61B98367D93F012F
 *
 * @param {number} player
 * @return {void}
 */
declare function N_0x61B98367D93F012F(player: Player): void;

/**
 * _0x6ABC50979655BEE7
 *
 * @param {number} player
 * @param {any} p2
 * @return {number}
 */
declare function N_0x6ABC50979655BEE7(player: Player, p2: any): number;

/**
 * _0x7351DA734F989F4E
 * Only used in shoprobberies
 *
 * @param {number} entity
 * @return {boolean}
 */
declare function N_0x7351DA734F989F4E(entity: Entity): boolean;

/**
 * _0x7803436E68C32B26
 *

 * @return {void}
 */
declare function N_0x7803436E68C32B26(): void;

/**
 * _0x7EF2A2FE38D74456
 * _SET_DISPATCH_*
 *
 * @param {number} flag
 * @param {boolean} p1
 * @return {void}
 */
declare function N_0x7EF2A2FE38D74456(flag: number, p1: boolean): void;

/**
 * _0x7FC667F6DDFBCDCC
 * Only used in R* Script long_update
 * Returns a value thats being subtracted from GET_GAME_TIMER
 *
 * @param {number} player
 * @return {number}
 */
declare function N_0x7FC667F6DDFBCDCC(player: Player): number;

/**
 * _0x82F11E1296996574
 * Only used in rcm_gunslinger1_1 R* Script: p0 = 0
 *
 * @param {number} p0
 * @return {void}
 */
declare function N_0x82F11E1296996574(p0: number): void;

/**
 * _0x856CE8FDE2416602
 *
 * @param {number} ped
 * @return {boolean}
 */
declare function N_0x856CE8FDE2416602(ped: Ped): boolean;

/**
 * _0x89E005B1662F6E48
 *
 * @param {number} player
 * @param {number} p1
 * @param {number} p2
 * @return {boolean}
 */
declare function N_0x89E005B1662F6E48(player: Player, p1: number, p2: number): boolean;

/**
 * _0x95878B13E272EF1F
 *
 * @param {number} entity
 * @param {number} ped
 * @param {boolean} p2
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} crimeType
 * @return {any}
 */
declare function N_0x95878B13E272EF1F(entity: Entity, ped: Ped, p2: boolean, x: number, y: number, z: number, crimeType: Hash): any;

/**
 * _0x9772395CC73E8D1F
 * Only used in loanshark_miner1 R* Script: name = ANNESBURG_MINES
 *
 * @param {number} ped
 * @param {string | number} name
 * @return {void}
 */
declare function N_0x9772395CC73E8D1F(ped: Ped, name: string | number): void;

/**
 * _0x987BE590FB9D41E5
 *
 * @param {boolean} p0
 * @return {void}
 */
declare function N_0x987BE590FB9D41E5(p0: boolean): void;

/**
 * _0x9945A3E2528A02E8
 *
 * @param {number} player
 * @return {boolean}
 */
declare function N_0x9945A3E2528A02E8(player: Player): boolean;

/**
 * _0x9B4C564BFA7CFF37
 *
 * @param {number} p0
 * @return {void}
 */
declare function N_0x9B4C564BFA7CFF37(p0: number): void;

/**
 * _0x9C5BD8C562565CE6
 *

 * @return {number}
 */
declare function N_0x9C5BD8C562565CE6(): number;

/**
 * _0x9C8A2BF37E966464
 * Only used in act_bankrobbery01 R* Script
 *
 * @param {number} player
 * @param {number} itemSet
 * @return {void}
 */
declare function N_0x9C8A2BF37E966464(player: Player, itemSet: ItemSet): void;

/**
 * _0x9D5C9A5A3321B128
 *
 * @param {number} player
 * @return {boolean}
 */
declare function N_0x9D5C9A5A3321B128(player: Player): boolean;

/**
 * _0x9EF07CFBB19A9733
 * Only used in shoprobberies R* Scripts
 *

 * @return {boolean}
 */
declare function N_0x9EF07CFBB19A9733(): boolean;

/**
 * _0xB527099D1E1EED49
 *
 * @param {number} player
 * @param {number} p1
 * @return {[boolean, number]}
 */
declare function N_0xB527099D1E1EED49(player: Player, p1: number): [boolean, number];

/**
 * _0xBD944A3D36E992DE
 * Called together with REPORT_POLICE_SPOTTED_PLAYER
 *

 * @return {void}
 */
declare function N_0xBD944A3D36E992DE(): void;

/**
 * _0xC0DF161950FB101E
 * Only used in rcm_serial_killer1 R* Script
 *
 * @param {number} ped
 * @return {boolean}
 */
declare function N_0xC0DF161950FB101E(ped: Ped): boolean;

/**
 * _0xC310239ACCCF5579
 *

 * @return {void}
 */
declare function N_0xC310239ACCCF5579(): void;

/**
 * _0xC5EB2755FA25F1E9
 *
 * @param {boolean} p0
 * @return {void}
 */
declare function N_0xC5EB2755FA25F1E9(p0: boolean): void;

/**
 * _0xC687A23E166DCF68
 *
 * @param {DataView} p0
 * @return {any}
 */
declare function N_0xC687A23E166DCF68(p0: DataView): any;

/**
 * _0xC7DC5A0A7DF608CB
 * _GET_DISPATCH_*
 *
 * @param {number} flag
 * @return {boolean}
 */
declare function N_0xC7DC5A0A7DF608CB(flag: number): boolean;

/**
 * _0xCBFB4951F2E3934C
 *
 * @param {number} player
 * @param {DataView} data
 * @return {void}
 */
declare function N_0xCBFB4951F2E3934C(player: Player, data: DataView): void;

/**
 * _0xD6C0A8C7C0B2F82C
 *
 * @param {number} player
 * @param {boolean} p1
 * @return {void}
 */
declare function N_0xD6C0A8C7C0B2F82C(player: Player, p1: boolean): void;

/**
 * _0xD7494DED50C6EF52
 * Only used in R* SP Scripts
 * Params: p2 either 1 or 2
 *
 * @param {number} player
 * @param {number} crimeType
 * @param {number} p2
 * @return {void}
 */
declare function N_0xD7494DED50C6EF52(player: Player, crimeType: Hash, p2: number): void;

/**
 * _0xDA1A9ADC4E3D4B16
 * Only used in R* SP Scripts
 * Params: p1 = true, p2 = false
 *
 * @param {number} itemSet
 * @param {boolean} p1
 * @param {boolean} p2
 * @return {void}
 */
declare function N_0xDA1A9ADC4E3D4B16(itemSet: ItemSet, p1: boolean, p2: boolean): void;

/**
 * _0xDAEFDFDB2AEECE37
 * crimeType: see _REPORT_CRIME
 *
 * @param {number} crimeType
 * @param {any} p1
 * @return {number}
 */
declare function N_0xDAEFDFDB2AEECE37(crimeType: Hash, p1: any): number;

/**
 * _0xDCF12B89624AAC96
 *
 * @param {boolean} p0
 * @return {void}
 */
declare function N_0xDCF12B89624AAC96(p0: boolean): void;

/**
 * _0xDDCE8E960D1DE240
 *
 * @param {boolean} p0
 * @return {void}
 */
declare function N_0xDDCE8E960D1DE240(p0: boolean): void;

/**
 * _0xDEA083C16BB91345
 *

 * @return {void}
 */
declare function N_0xDEA083C16BB91345(): void;

/**
 * _0xE083BEDA81709891
 *
 * @param {number} player
 * @return {number}
 */
declare function N_0xE083BEDA81709891(player: Player): number;

/**
 * _0xE4D6E45F491A66CB
 *
 * @param {number} player
 * @param {number} p1
 * @return {any}
 */
declare function N_0xE4D6E45F491A66CB(player: Player, p1: number): any;

/**
 * _0xE94B5E938619712E
 * Seems to disable lawmen guarding behaviors (like during a region lockdown). Must be called every frame.
 * Only used in R* SP Scripts, mostly used in train_fast_travel_core
 *

 * @return {void}
 */
declare function N_0xE94B5E938619712E(): void;

/**
 * _0xE9AC8466ABE484BB
 * Only used in R* SP Scripts
 * Params: p1 = 0
 *
 * @param {boolean} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0xE9AC8466ABE484BB(p0: boolean, p1: any): void;

/**
 * _0xE9EB79CBF9C0F58A
 * Returns p1 value for 0xE4D6E45F491A66CB
 *
 * @param {number} player
 * @return {number}
 */
declare function N_0xE9EB79CBF9C0F58A(player: Player): number;

/**
 * _0xEDFC6C1FD1C964F5
 * _SET_C* - _SET_D*
 *
 * @param {number} player
 * @param {number} crimeType
 * @param {number} bounty
 * @param {number} p3
 * @param {number} p4
 * @param {boolean} p5
 * @param {number} p6
 * @param {number} p7
 * @param {any} p8
 * @return {void}
 */
declare function N_0xEDFC6C1FD1C964F5(player: Player, crimeType: Hash, bounty: number, p3: number, p4: number, p5: boolean, p6: number, p7: number, p8: any): void;

/**
 * _0xF46108C50A22B029
 *

 * @return {boolean}
 */
declare function N_0xF46108C50A22B029(): boolean;

/**
 * _0xF611DE44AEB36A1D
 *
 * @param {number} crimeType
 * @param {boolean} p1
 * @return {void}
 */
declare function N_0xF611DE44AEB36A1D(crimeType: Hash, p1: boolean): void;

/**
 * _0xFFEBE5AA96BC2E4E
 *
 * @param {number} ped
 * @param {number} crimeType
 * @param {boolean} p2
 * @return {any}
 */
declare function N_0xFFEBE5AA96BC2E4E(ped: Ped, crimeType: Hash, p2: boolean): any;

/**
 * _ADD_WITNESS_RESPONSE
 *
 * @param {number} player
 * @param {number} crimeType
 * @param {number} pedGroup
 * @return {void}
 */
declare function AddWitnessResponse(player: Player, crimeType: Hash, pedGroup: Ped): void;

/**
 * _ARE_ANY_LAW_PEDS_INVESTIGATING
 * Only used in rcm_homerob00 R* Script
 *

 * @return {boolean}
 */
declare function AreAnyLawPedsInvestigating(): boolean;

/**
 * _ARE_INVESTIGATORS_ACTIVE
 *
 * @param {number} player
 * @param {boolean} areInvestigatorsActive
 * @param {any} p2
 * @return {boolean}
 */
declare function AreInvestigatorsActive(player: Player, areInvestigatorsActive: boolean, p2: any): boolean;

/**
 * _ARE_LAW_PEDS_ENABLED_FOR_TRAIN
 * Only used in trainrobbery_ambient R* Script
 *

 * @return {boolean}
 */
declare function AreLawPedsEnabledForTrain(): boolean;

/**
 * _ARE_WITNESSES_PENDING
 *
 * @param {number} player
 * @return {boolean}
 */
declare function AreWitnessesPending(player: Player): boolean;

/**
 * _CREATE_GUARD_ZONE
 *
 * @param {string | number} name
 * @return {void}
 */
declare function CreateGuardZone(name: string | number): void;

/**
 * _CREATE_GUARD_ZONE_FOR_ENTITY
 * Returns true when investigation creation was successful
 *
 * @param {string | number} guardZoneName
 * @param {number} entity
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {boolean}
 */
declare function CreateGuardZoneForEntity(guardZoneName: string | number, entity: Entity, x: number, y: number, z: number): boolean;

/**
 * _CREATE_LAW_DISPATCH_RESPONSE_FOR_COORDS
 * dispatchResponseHash: see common/data/dispatchresponses/..
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} dispatchResponseHash
 * @return {any}
 */
declare function CreateLawDispatchResponseForCoords(x: number, y: number, z: number, dispatchResponseHash: Hash): any;

/**
 * _DISABLE_GUARD_ZONE
 *
 * @param {string | number} name
 * @return {void}
 */
declare function DisableGuardZone(name: string | number): void;

/**
 * _ENABLE_DISPATCH_LAW
 *
 * @param {boolean} toggle
 * @return {void}
 */
declare function EnableDispatchLaw(toggle: boolean): void;

/**
 * _ENABLE_DISPATCH_LAW_2
 *
 * @param {boolean} toggle
 * @return {void}
 */
declare function EnableDispatchLaw_2(toggle: boolean): void;

/**
 * _FORCE_LAW_ON_LOCAL_PLAYER_IMMEDIATELY
 *

 * @return {void}
 */
declare function ForceLawOnLocalPlayerImmediately(): void;

/**
 * _GET_BOUNTY_HUNTER_GLOBAL_COOLDOWN
 * p0 is always BOUNTYHUNTERSGLOBALCOOLDOWN in R* scripts
 *
 * @param {number} p0
 * @return {number}
 */
declare function GetBountyHunterGlobalCooldown(p0: Hash): number;

/**
 * _GET_CRIME_BOUNTY_AMOUNT_BY_TYPE
 * Returns bounty (increment) value
 *
 * @param {number} crimeType
 * @return {number}
 */
declare function GetCrimeBountyAmountByType(crimeType: Hash): number;

/**
 * _GET_HUD_PLAYER_CRIME_TYPE
 * See _REPORT_CRIME
 *
 * @param {number} player
 * @return {number}
 */
declare function GetHudPlayerCrimeType(player: Player): number;

/**
 * _GET_TIME_SINCE_LAST_SEEN_BY_LAW
 * Returns the amount of time (probably in game minutes) since last seen by the law / left the wanted radius
 *
 * @param {number} player
 * @return {number}
 */
declare function GetTimeSinceLastSeenByLaw(player: Player): number;

/**
 * _IS_GUARD_PED_INVESTIGATING
 *
 * @param {number} ped
 * @return {boolean}
 */
declare function IsGuardPedInvestigating(ped: Ped): boolean;

/**
 * _LAW_WITNESS_RESPONSE_TASK
 *
 * @param {number} pedGroup1
 * @param {number} ped
 * @param {number} pedGroup2
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} crimeType
 * @return {boolean}
 */
declare function LawWitnessResponseTask(pedGroup1: Ped, ped: Ped, pedGroup2: Ped, x: number, y: number, z: number, crimeType: Hash): boolean;

/**
 * _PAUSE_BOUNTY_HUNTER_COOLDOWN
 * p0 is always BOUNTYHUNTERSGLOBALCOOLDOWN in R* scripts
 *
 * @param {number} p0
 * @param {boolean} p1
 * @param {any} p2
 * @return {void}
 */
declare function PauseBountyHunterCooldown(p0: Hash, p1: boolean, p2: any): void;

/**
 * _REMOVE_GUARD_ZONE
 *
 * @param {string | number} name
 * @return {void}
 */
declare function RemoveGuardZone(name: string | number): void;

/**
 * _REPORT_CRIME
 * crimeType:
 * enum eCrimeType : Hash
 * {
 *   CRIME_ACCOMPLICE = 0xAF074F6D,
 *   CRIME_ARSON = 0x68134DC7,
 *   CRIME_ASSAULT = 0x0BADC882,
 *   CRIME_ASSAULT_ANIMAL = 0x18DA55EE,
 *   CRIME_ASSAULT_CORPSE = 0x4E5F23F2,
 *   CRIME_ASSAULT_HORSE = 0xC4736181,
 *   CRIME_ASSAULT_LAW = 0xD7466D7C,
 *   CRIME_ASSAULT_LIVESTOCK = 0xCCE1CCBD,
 *   CRIME_BANK_ROBBERY = 0x6A1ADE3D,
 *   CRIME_BURGLARY = 0xA54C77E0,
 *   CRIME_CHEATING = 0xA2FF1145,
 *   CRIME_DISTURBANCE = 0x5011F613,
 *   CRIME_EXPLOSION = 0x3EBA7A37,
 *   CRIME_EXPLOSION_POISON = 0x91D0A0E1,
 *   CRIME_GRAVE_ROBBERY = 0x971EA5AF,
 *   CRIME_HASSLE = 0x58488776,
 *   CRIME_HIT_AND_RUN = 0xFF0A3CC4,
 *   CRIME_HIT_AND_RUN_LAW = 0x064814AF,
 *   CRIME_INTIMIDATION = 0x8319FBAB,
 *   CRIME_JACK_HORSE = 0x82F7E4A2,
 *   CRIME_JACK_VEHICLE = 0x6B981F4C,
 *   CRIME_JAIL_BREAK = 0x12C1D589,
 *   CRIME_KIDNAPPING = 0x98F908DB,
 *   CRIME_KIDNAPPING_LAW = 0xFD72A7EA,
 *   CRIME_LASSO_ASSAULT = 0x56EE5D5A,
 *   CRIME_LAW_IS_THREATENED = 0x1CB91DF0,
 *   CRIME_LOITERING = 0x6629D2F4,
 *   CRIME_LOOTING = 0x55AD2BEB,
 *   CRIME_MURDER = 0xE28ECE7E,
 *   CRIME_MURDER_ANIMAL = 0x48F59A66,
 *   CRIME_MURDER_HORSE = 0xC7261D79,
 *   CRIME_MURDER_LAW = 0x7797FCE7,
 *   CRIME_MURDER_LIVESTOCK = 0x9569C546,
 *   CRIME_MURDER_PLAYER = 0xF5ABD6C9,
 *   CRIME_MURDER_PLAYER_HORSE = 0xD55C6A79,
 *   CRIME_PROPERTY_DESTRUCTION = 0x533B003D,
 *   CRIME_RESIST_ARREST = 0xDF577BA5,
 *   CRIME_ROBBERY = 0xA3BEDE4C,
 *   CRIME_SELF_DEFENCE = 0xBD6A0AA3,
 *   CRIME_STAGECOACH_ROBBERY = 0xFC738E61,
 *   CRIME_STOLEN_GOODS = 0x9A949C79,
 *   CRIME_THEFT = 0x72ADE410,
 *   CRIME_THEFT_HORSE = 0xBE3A5838,
 *   CRIME_THEFT_LIVESTOCK = 0x85BA08FD,
 *   CRIME_THEFT_VEHICLE = 0x43A9ECA1,
 *   CRIME_THREATEN = 0x941C985A,
 *   CRIME_THREATEN_LAW = 0x7F908566,
 *   CRIME_TRAIN_ROBBERY = 0x647D2A5A,
 *   CRIME_TRAMPLE = 0x45DB39D8,
 *   CRIME_TRAMPLE_LAW = 0xF00F266B,
 *   CRIME_TRAMPLE_PLAYER = 0x75970C15,
 *   CRIME_TRESPASSING = 0xAEDE8E35,
 *   CRIME_UNARMED_ASSAULT = 0x5098CC5A,
 *   CRIME_VANDALISM = 0x80FDC759,
 *   CRIME_VANDALISM_VEHICLE = 0xF9E7ECE4,
 *   CRIME_VEHICLE_DESTRUCTION = 0x54A85DDC,
 *   CRIME_WANTED_LEVEL_UP_DEBUG_HIGH = 0x99C52FF5,
 *   CRIME_WANTED_LEVEL_UP_DEBUG_LOW = 0xD891890F
 * };
 *
 * @param {number} player
 * @param {number} crimeType
 * @param {number} bounty
 * @param {number} entity
 * @param {boolean} isKnownSuspect
 * @return {void}
 */
declare function ReportCrime(player: Player, crimeType: Hash, bounty: number, entity: Entity, isKnownSuspect: boolean): void;

/**
 * _REPORT_PLAYER_LAW_DISPATCH_RESPONSE_OVERRIDE
 *
 * @param {number} player
 * @param {number} dispatchResponseHash
 * @return {void}
 */
declare function ReportPlayerLawDispatchResponseOverride(player: Player, dispatchResponseHash: Hash): void;

/**
 * _SET_ALLOW_DISABLED_LAW_RESPONSES
 *
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetAllowDisabledLawResponses(toggle: boolean): void;

/**
 * _SET_BOUNTY_HUNTER_GLOBAL_COOLDOWN
 * p0 is always BOUNTYHUNTERSGLOBALCOOLDOWN in R* scripts
 *
 * @param {number} p0
 * @param {number} p1
 * @return {void}
 */
declare function SetBountyHunterGlobalCooldown(p0: Hash, p1: number): void;

/**
 * _SET_BOUNTY_HUNTER_PURSUIT_CLEARED
 * Force clears local player's wanted level
 *

 * @return {void}
 */
declare function SetBountyHunterPursuitCleared(): void;

/**
 * _SET_CUSTOM_LAW_DISPATCH_RESPONSE
 * Note: This native is only used in multiplayer scripts
 * dispatchResponseHash: see update1/common/data/dispatchresponses/..
 *
 * @param {number} dispatchResponseHash
 * @return {void}
 */
declare function SetCustomLawDispatchResponse(dispatchResponseHash: Hash): void;

/**
 * _SET_DISPATCH_MULTIPLIER_OVERRIDE
 *
 * @param {number} multiplier
 * @return {void}
 */
declare function SetDispatchMultiplierOverride(multiplier: number): void;

/**
 * _SET_GUARD_ZONE_POSITION
 *
 * @param {string | number} name
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {void}
 */
declare function SetGuardZonePosition(name: string | number, x: number, y: number, z: number): void;

/**
 * _SET_GUARD_ZONE_POSITION_2
 *
 * @param {string | number} name
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {void}
 */
declare function SetGuardZonePosition_2(name: string | number, x: number, y: number, z: number): void;

/**
 * _SET_GUARD_ZONE_VOLUME_REGISTRATION_END
 *
 * @param {string | number} name
 * @param {number} volume
 * @return {void}
 */
declare function SetGuardZoneVolumeRegistrationEnd(name: string | number, volume: Volume): void;

/**
 * _SET_GUARD_ZONE_VOLUME_REGISTRATION_START
 *
 * @param {string | number} name
 * @param {number} volume
 * @return {void}
 */
declare function SetGuardZoneVolumeRegistrationStart(name: string | number, volume: Volume): void;

/**
 * _SET_GUARD_ZONE_VOLUME_RESTRICTED
 *
 * @param {string | number} name
 * @param {number} volume
 * @return {void}
 */
declare function SetGuardZoneVolumeRestricted(name: string | number, volume: Volume): void;

/**
 * _SET_GUARD_ZONE_VOLUME_THREAT
 *
 * @param {string | number} name
 * @param {number} volume
 * @return {void}
 */
declare function SetGuardZoneVolumeThreat(name: string | number, volume: Volume): void;

/**
 * _SET_GUARD_ZONE_VOLUME_WARNING
 *
 * @param {string | number} name
 * @param {number} volume
 * @return {void}
 */
declare function SetGuardZoneVolumeWarning(name: string | number, volume: Volume): void;

/**
 * _SET_LAW_DISABLED
 *
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetLawDisabled(toggle: boolean): void;

/**
 * _SET_LAW_RBS_VOLUME
 *
 * @param {number} player
 * @param {number} p1
 * @return {void}
 */
declare function SetLawRbsVolume(player: Player, p1: Hash): void;

/**
 * _SET_LAW_REGION
 * enum eLawRegion : Hash
 * {
 *   LAW_DISPATCH_REGION_NONE = 0,
 *   LAW_REGION_AGUASDULCES = 0x2F573EBE,
 *   LAW_REGION_ANNESBURG = 0x68CAFD50,
 *   LAW_REGION_ARMADILLO = 0xF0B90756,
 *   LAW_REGION_BAYOU_NWA = 0x80966B1C,
 *   LAW_REGION_BEECHERS_HOPE = 0xE2544977,
 *   LAW_REGION_BIG_VALLEY = 0x3DF1559A,
 *   LAW_REGION_BLACKWATER = 0x60D4886D,
 *   LAW_REGION_BLACKWATER_MAINGAME = 0x66553576,
 *   LAW_REGION_BLUEGILL_MARSH = 0x1D6AED8E,
 *   LAW_REGION_BRAITHWAITE_MANOR = 0x3D71E7FF,
 *   LAW_REGION_BUTCHER_CREEK = 0x2B3E1822,
 *   LAW_REGION_CALIGA_HALL = 0xF3FE5080,
 *   LAW_REGION_CORNWALL = 0xCC4672FA,
 *   LAW_REGION_CUMBERLAND_FOREST = 0x81A78306,
 *   LAW_REGION_EMERALD_RANCH = 0x5C069DF3,
 *   LAW_REGION_FORT_WALLACE = 0x0AF25192,
 *   LAW_REGION_GREAT_PLAINS = 0xB20573FA,
 *   LAW_REGION_GREAT_PLAINS_MAINGAME = 0x9862FF7C,
 *   LAW_REGION_GRIZZLIES = 0xBB936031,
 *   LAW_REGION_GUAMA = 0x200DFF42,
 *   LAW_REGION_HEARTLANDS = 0xAD14DA65,
 *   LAW_REGION_LAGRAS = 0xC64808D3,
 *   LAW_REGION_MACFARLANES_RANCH = 0x396A7D5F,
 *   LAW_REGION_MANICATO = 0x039DB6BF,
 *   LAW_REGION_MANZANITA_POST = 0x895E580E,
 *   LAW_REGION_MANZANITA_POST_MAINGAME = 0x9BDD6A38,
 *   LAW_REGION_OCCUPIED_CARAVAN_CAMP = 0x7EBABB01,
 *   LAW_REGION_OLD_MAP_WILDERNESS = 0xCBB45950,
 *   LAW_REGION_OLD_MAP_WILDERNESS_MAINGAME = 0x9F839BE7,
 *   LAW_REGION_OUTLAW3 = 0x97A02FC1,
 *   LAW_REGION_PRONGHORN_RANCH = 0x398E4BFC,
 *   LAW_REGION_RHODES = 0x89222928,
 *   LAW_REGION_RHODES_LOCKDOWN = 0xB1181671,
 *   LAW_REGION_RIDGEWOOD_FARM = 0x635C3028,
 *   LAW_REGION_ROANOKE_RIDGE = 0x46386A9A,
 *   LAW_REGION_SAINT_DENIS = 0x5CF7C268,
 *   LAW_REGION_SAINT_DENIS_RURAL = 0x4FD5331A,
 *   LAW_REGION_SCARLETT_MEADOWS = 0x5FDD9717,
 *   LAW_REGION_SISIKA = 0x2B6BBA52,
 *   LAW_REGION_STRAWBERRY = 0xDD932620,
 *   LAW_REGION_TALL_TREES = 0xD939B758,
 *   LAW_REGION_TALL_TREES_MAINGAME = 0x084B17DF,
 *   LAW_REGION_THIEVES_LANDING = 0x3D0C2EB6,
 *   LAW_REGION_THIEVES_LANDING_MAINGAME = 0x61C450F3,
 *   LAW_REGION_TUMBLEWEED = 0x0EFAF8DC,
 *   LAW_REGION_VALENTINE = 0xA7A3F0C3,
 *   LAW_REGION_VALENTINE_LOCKDOWN = 0x123582FE,
 *   LAW_REGION_VAN_HORN = 0x619B528E,
 *   LAW_REGION_WAPITI = 0x7A976E02
 * };
 *
 * @param {number} player
 * @param {number} lawRegionHash
 * @param {number} stateHash
 * @return {void}
 */
declare function SetLawRegion(player: Player, lawRegionHash: Hash, stateHash: Hash): void;

/**
 * _SET_PED_LAW_BEHAVIOUR
 * behaviour: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/CLawBehavior__Flags
 *
 * @param {number} ped
 * @param {number} behaviour
 * @return {void}
 */
declare function SetPedLawBehaviour(ped: Ped, behaviour: number): void;