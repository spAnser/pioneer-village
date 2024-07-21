/**
 * SAVEGAME_IS_SAVE_PENDING
 *

 * @return {boolean}
 */
declare function SavegameIsSavePending(): boolean;

/**
 * SAVEGAME_SAVE_MP
 * See SAVEGAME_SAVE_SP
 *
 * @param {number} savegameType
 * @return {boolean}
 */
declare function SavegameSaveMp(savegameType: Hash): boolean;

/**
 * SAVEGAME_SAVE_SP
 * enum eSavegameType : Hash
 * {
 *   SAVEGAMETYPE_AMBIENT = 0x3CA4E1F8,
 *   SAVEGAMETYPE_DEFAULT = 0xCB6ED080,
 *   SAVEGAMETYPE_DELETE_CHAR = 0xCD35F947,
 *   SAVEGAMETYPE_END_CREATE_NEWCHAR = 0x4C50A3CE,
 *   SAVEGAMETYPE_END_MATCH = 0xE470ED50,
 *   SAVEGAMETYPE_END_MISSION = 0x9A444E54,
 *   SAVEGAMETYPE_END_SESSION = 0x6D23956C,
 *   SAVEGAMETYPE_END_SHOPPING = 0xA311A6C4,
 *   SAVEGAMETYPE_RANKUP = 0xE25F8017,
 *   SAVEGAMETYPE_SCRIPT_MP_GLOBALS = 0xAFF30AD4,
 *   SAVEGAMETYPE_SP_AUTOSAVE = 0xF4AE69EC,
 *   SAVEGAMETYPE_SP_DEBUG = 0x6A8122FD,
 *   SAVEGAMETYPE_SP_PROPERTY = 0xAE0AB38E
 * };
 *
 * @param {number} savegameType
 * @return {boolean}
 */
declare function SavegameSaveSp(savegameType: Hash): boolean;

/**
 * _0x1431540BCA1A1BD2
 *

 * @return {any}
 */
declare function N_0x1431540BCA1A1BD2(): any;

/**
 * _0x443174C20B8B9E7F
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {void}
 */
declare function N_0x443174C20B8B9E7F(p0: any, p1: any, p2: any): void;

/**
 * _0x4FB5869E2B37FC00
 *

 * @return {void}
 */
declare function N_0x4FB5869E2B37FC00(): void;

/**
 * _0x81F4E92BE3958364
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {void}
 */
declare function N_0x81F4E92BE3958364(p0: any, p1: any, p2: any): void;

/**
 * _0x8E8FFB9E4AD051D2
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @param {any} p3
 * @return {void}
 */
declare function N_0x8E8FFB9E4AD051D2(p0: any, p1: any, p2: any, p3: any): void;

/**
 * _0x9BB83C4DD7BE0802
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @param {any} p3
 * @param {any} p4
 * @return {void}
 */
declare function N_0x9BB83C4DD7BE0802(p0: any, p1: any, p2: any, p3: any, p4: any): void;

/**
 * _0xA7ECEBAFBAF997A5
 *
 * @param {number} savegameType
 * @return {any}
 */
declare function N_0xA7ECEBAFBAF997A5(savegameType: Hash): any;

/**
 * _0xA844FEB5C22C2C74
 *

 * @return {void}
 */
declare function N_0xA844FEB5C22C2C74(): void;

/**
 * _0xB00CE33465B5406D
 *
 * @param {any} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0xB00CE33465B5406D(p0: any, p1: any): any;

/**
 * _0xC0ABF784590798A9
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0xC0ABF784590798A9(p0: any): void;

/**
 * _0xE0B45E983BFC0768
 *

 * @return {void}
 */
declare function N_0xE0B45E983BFC0768(): void;

/**
 * _0xE8346E62FD7FB962
 *

 * @return {void}
 */
declare function N_0xE8346E62FD7FB962(): void;

/**
 * _0xED4B0C1057892B2E
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @param {any} p3
 * @return {void}
 */
declare function N_0xED4B0C1057892B2E(p0: any, p1: any, p2: any, p3: any): void;

/**
 * _SAVEGAME_GET_BOOL
 * Does the exact same as 0x529B9CCD0972AF4E
 *
 * @param {DataView} p0
 * @param {string | number} variableName
 * @return {void}
 */
declare function SavegameGetBool(p0: DataView, variableName: string | number): void;

/**
 * _SAVEGAME_GET_FLOAT
 *
 * @param {DataView} p0
 * @param {string | number} variableName
 * @return {void}
 */
declare function SavegameGetFloat(p0: DataView, variableName: string | number): void;

/**
 * _SAVEGAME_GET_INT
 *
 * @param {DataView} p0
 * @param {string | number} variableName
 * @return {void}
 */
declare function SavegameGetInt(p0: DataView, variableName: string | number): void;

/**
 * _SAVEGAME_GET_INT_2
 * Does the exact same as 0x529B9CCD0972AF4E
 * Commonly used with time/timestamps
 *
 * @param {DataView} p0
 * @param {string | number} variableName
 * @return {void}
 */
declare function SavegameGetInt_2(p0: DataView, variableName: string | number): void;

/**
 * _SAVEGAME_GET_INT_3
 * Does the exact same as 0x529B9CCD0972AF4E
 * Commonly used with enums and flags
 *
 * @param {DataView} p0
 * @param {string | number} variableName
 * @return {void}
 */
declare function SavegameGetInt_3(p0: DataView, variableName: string | number): void;

/**
 * _SAVEGAME_GET_TEXT_LABEL_23
 *
 * @param {DataView} p0
 * @param {string | number} variableName
 * @return {void}
 */
declare function SavegameGetTextLabel_23(p0: DataView, variableName: string | number): void;

/**
 * _SAVEGAME_GET_TEXT_LABEL_31
 *
 * @param {DataView} p0
 * @param {string | number} variableName
 * @return {void}
 */
declare function SavegameGetTextLabel_31(p0: DataView, variableName: string | number): void;

/**
 * _SAVEGAME_GET_TEXT_LABEL_63
 *
 * @param {DataView} p0
 * @param {string | number} variableName
 * @return {void}
 */
declare function SavegameGetTextLabel_63(p0: DataView, variableName: string | number): void;