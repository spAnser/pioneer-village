/**
 * TASK_ENTER_COVER
 *
 * @param {number} ped
 * @return {void}
 */
declare function TaskEnterCover(ped: Ped): void;

/**
 * TASK_EXIT_COVER
 *
 * @param {number} ped
 * @return {void}
 */
declare function TaskExitCover(ped: Ped): void;

/**
 * _0x140B3CB1D424A945
 * weaponHash can also be -1
 *
 * @param {number} ped
 * @param {number} weaponHash
 * @return {void}
 */
declare function N_0x140B3CB1D424A945(ped: Ped, weaponHash: Hash): void;

/**
 * _0x3C7A9C2C953128FE
 *
 * @param {number} ped
 * @return {void}
 */
declare function N_0x3C7A9C2C953128FE(ped: Ped): void;

/**
 * _0x53E4D0C079CA6855
 *
 * @param {number} handle
 * @return {number}
 */
declare function N_0x53E4D0C079CA6855(handle: ScrHandle): Entity;

/**
 * _0x64340DC208D671D5
 * coverLayer: see levels_0/levels/rdr3/coverlayers
 *
 * @param {string | number} coverLayer
 * @return {void}
 */
declare function N_0x64340DC208D671D5(coverLayer: string | number): void;

/**
 * _0x733077295AB51304
 * args: f_0 = Volume Handle, f_2 = integer (-1, 32 used in R* Scripts)
 *
 * @param {DataView} args
 * @return {void}
 */
declare function N_0x733077295AB51304(args: DataView): void;

/**
 * _0x7A1FDCF35EAA140F
 * coverLayer: see levels_0/levels/rdr3/coverlayers
 *
 * @param {string | number} coverLayer
 * @return {void}
 */
declare function N_0x7A1FDCF35EAA140F(coverLayer: string | number): void;

/**
 * _0x957D7E750216D74B
 *
 * @param {number} ped
 * @return {number}
 */
declare function N_0x957D7E750216D74B(ped: Ped): number;

/**
 * _0xEBA51A294C73292E
 *
 * @param {DataView} args
 * @return {void}
 */
declare function N_0xEBA51A294C73292E(args: DataView): void;

/**
 * _ADD_SCRIPTED_COVER_POINT
 *
 * @param {DataView} data
 * @return {number}
 */
declare function AddScriptedCoverPoint(data: DataView): ScrHandle;

/**
 * _ARE_LOAD_COVER_ANIMS_LOADED
 *
 * @param {number} ped
 * @return {boolean}
 */
declare function AreLoadCoverAnimsLoaded(ped: Ped): boolean;

/**
 * _DOES_COVER_POINT_EXIST
 *
 * @param {number} handle
 * @return {boolean}
 */
declare function DoesCoverPointExist(handle: ScrHandle): boolean;

/**
 * _GET_COVER_POINT_STATE_FROM_PED
 * 1 = In cover while crouched
 * 2 = In cover while standing
 * 3 = Not in cover
 *
 * @param {number} ped
 * @return {number}
 */
declare function GetCoverPointStateFromPed(ped: Ped): number;

/**
 * _REQUEST_FLINCH_COVER_ANIM
 * Makes ped flinch (if in cover) like they have been shot at
 *
 * @param {number} ped
 * @return {void}
 */
declare function RequestFlinchCoverAnim(ped: Ped): void;

/**
 * _STOP_RUNNING_COVER_ANIMS
 * Stops running cover anims and releases them
 * _STOP_RENDERING_* - _STOP_SCRIPTED*
 *
 * @param {number} ped
 * @return {void}
 */
declare function StopRunningCoverAnims(ped: Ped): void;

/**
 * _TASK_AI_SEEK_COVER_TO_COVER_POINT
 *
 * @param {DataView} args
 * @return {void}
 */
declare function TaskAiSeekCoverToCoverPoint(args: DataView): void;