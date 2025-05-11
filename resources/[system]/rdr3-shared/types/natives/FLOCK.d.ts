/**
   * GET_ANIMAL_TUNING_BOOL_PARAM
   * index: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/eAnimalTuningBools
   * https://github.com/femga/rdr3_discoveries/tree/master/AI/ANIMAL_TUNING_BOOL_PARAMS
   *
   * @param {number} animal
   * @param {number} index
   * @return {boolean}
   */
declare function GetAnimalTuningBoolParam(animal: Ped, index: number): boolean;

/**
   * GET_ANIMAL_TUNING_FLOAT_PARAM
   * index: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/eAnimalTuningFloats
   * https://github.com/femga/rdr3_discoveries/tree/master/AI/ANIMAL_TUNING_FLOAT_PARAMS
   *
   * @param {number} animal
   * @param {number} index
   * @return {number}
   */
declare function GetAnimalTuningFloatParam(animal: Ped, index: number): number;

/**
   * GET_SPECIES_TUNING_FLOAT_PARAM
   *
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @return {number}
   */
declare function GetSpeciesTuningFloatParam(p0: Hash, p1: number, p2: number): number;

/**
   * RESET_ANIMAL_TUNING_BOOL_PARAM
   *
   * @param {number} animal
   * @param {number} index
   * @return {void}
   */
declare function ResetAnimalTuningBoolParam(animal: Ped, index: number): void;

/**
   * RESET_ANIMAL_TUNING_FLOAT_PARAM
   *
   * @param {number} animal
   * @param {number} index
   * @return {void}
   */
declare function ResetAnimalTuningFloatParam(animal: Ped, index: number): void;

/**
   * SET_ANIMAL_TUNING_BOOL_PARAM
   *
   * @param {number} animal
   * @param {number} index
   * @param {boolean} value
   * @return {void}
   */
declare function SetAnimalTuningBoolParam(animal: Ped, index: number, value: boolean): void;

/**
   * SET_ANIMAL_TUNING_FLOAT_PARAM
   *
   * @param {number} animal
   * @param {number} index
   * @param {number} value
   * @return {void}
   */
declare function SetAnimalTuningFloatParam(animal: Ped, index: number, value: number): void;

/**
   * SET_SPECIES_TUNING_BOOL_PARAM
   *
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @param {boolean} p3
   * @return {void}
   */
declare function SetSpeciesTuningBoolParam(p0: Hash, p1: number, p2: number, p3: boolean): void;

/**
   * SET_SPECIES_TUNING_FLOAT_PARAM
   *
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @return {void}
   */
declare function SetSpeciesTuningFloatParam(p0: Hash, p1: number, p2: number, p3: number): void;

/**
   * _0x0816C31480764AB0
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function N_0x0816C31480764AB0(p0: any, p1: any, p2: any, p3: any): void;

/**
   * _0x09EE00B8F858E0BE
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @return {any}
   */
declare function N_0x09EE00B8F858E0BE(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): any;

/**
   * _0x1520626FFAFFFA8F
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x1520626FFAFFFA8F(p0: any, p1: any): void;

/**
   * _0x17E3E5C46ECCD308
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0x17E3E5C46ECCD308(p0: any, p1: any, p2: any): void;

/**
   * _0x19870C40C7EE15BE
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0x19870C40C7EE15BE(p0: any, p1: any): any;

/**
   * _0x1DA6CB02071055D5
   *
   * @param {any} p0
   * @return {Vector3}
   */
declare function N_0x1DA6CB02071055D5(p0: any): Vector3;

/**
   * _0x2DF3D457D86F8E57
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x2DF3D457D86F8E57(p0: any, p1: any): void;

/**
   * _0x34B9C4D86DF2C2F3
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x34B9C4D86DF2C2F3(p0: any): any;

/**
   * _0x36486AF7DA93A464
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x36486AF7DA93A464(p0: any): any;

/**
   * _REMOVE_HERD_PED
   * Remove the ped from a herd.
   *
   * @param {number} herd
   * @param {number} ped
   * @return {void}
   */
declare function RemoveHerdPed(herd: Entity, ped: Ped): void;

/**
   * _0x53187E563F938E76
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x53187E563F938E76(p0: any): any;

/**
   * _CLEAR_HERD
   * Clear the herd.
   *
   * @param {number} herd
   * @return {void}
   */
declare function ClearHerd(herd: Entity): void;

/**
   * _0x6C57BEA886A20C6B
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x6C57BEA886A20C6B(p0: any, p1: any): void;

/**
   * _0x706B434FEFAD6A24
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x706B434FEFAD6A24(p0: any): void;

/**
   * _0x8049B17BEC937662
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @return {any}
   */
declare function N_0x8049B17BEC937662(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): any;

/**
   * _IS_PED_IN_HERD
   * Return whether the ped is in the herd.
   *
   * @param {number} herd
   * @param {number} ped
   * @return {boolean}
   */
declare function IsPedInHerd(herd: Entity, ped: Ped): boolean;

/**
   * _0xA881F5C77A560906
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xA881F5C77A560906(p0: any): void;

/**
   * _0xC3D581A34BC0A1F0
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xC3D581A34BC0A1F0(p0: any, p1: any): void;

/**
   * _0xC72CE37081DAE625
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function N_0xC72CE37081DAE625(p0: any, p1: any, p2: any, p3: any): void;

/**
   * _0xC95611869E14F8AF
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function N_0xC95611869E14F8AF(p0: any, p1: any, p2: any, p3: any): void;

/**
   * _0xCC6B5AAFC87BFC7B
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0xCC6B5AAFC87BFC7B(p0: any, p1: any, p2: any): void;

/**
   * _0xD95F04A4E73BE85E
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0xD95F04A4E73BE85E(p0: any, p1: any): any;

/**
   * _DELETE_HERD
   * Delete and invalidate the herd.
   *
   * @param {number} herd
   * @return {void}
   */
declare function DeleteHerd(herd: Entity): void;

/**
   * _0xE36D2CB540597EF7
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @param {any} p7
   * @return {void}
   */
declare function N_0xE36D2CB540597EF7(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;

/**
   * _0xE93415B3307208E5
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @param {any} p7
   * @param {any} p8
   * @return {any}
   */
declare function N_0xE93415B3307208E5(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): any;

/**
   * _0xF2CCA7B68CFAB2B9
   * species: SPECIES_BIRD_CROW
   *
   * @param {number} species
   * @param {number} x1
   * @param {number} y1
   * @param {number} z1
   * @param {number} x2
   * @param {number} y2
   * @param {number} z2
   * @param {number} x3
   * @param {number} y3
   * @param {number} z3
   * @param {number} p10
   * @param {number} p11
   * @param {number} p12
   * @param {number} p13
   * @return {void}
   */
declare function N_0xF2CCA7B68CFAB2B9(species: Hash, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, x3: number, y3: number, z3: number, p10: number, p11: number, p12: number, p13: number): void;

/**
   * _0xFA821997794F48E7
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0xFA821997794F48E7(p0: any, p1: any, p2: any): void;

/**
   * _0xFB16F08F47B83B4C
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xFB16F08F47B83B4C(p0: any): void;

/**
   * _0xFDB008B3BCF5992F
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0xFDB008B3BCF5992F(p0: any, p1: any, p2: any): void;

/**
   * _0xFF1E339CE40EAAAF
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xFF1E339CE40EAAAF(p0: any, p1: any): void;

/**
   * _ADD_PED_TO_FLOCK
   *
   * @param {any} p0
   * @param {number} ped
   * @return {void}
   */
declare function AddPedToFlock(p0: any, ped: Ped): void;

/**
   * _CREATE_HERD
   *
  
   * @return {number}
   */
declare function CreateHerd(): ScrHandle;

/**
   * _GET_ANIMAL_IS_WILD
   * Ped (horse) will run away from players and mounting will trigger them to buck until disabled.
   * Used for: REL_DOMESTICATED_ANIMAL
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function GetAnimalIsWild(ped: Ped): boolean;

/**
   * _GET_ANIMAL_RARITY
   * enum eAnimalRarityLevel
   * {
   *   ARL_COMMON,
   *   ARL_RARE,
   *   ARL_LEGENDARY,
   *   ARL_NUMRARITYLEVELS
   * };
   *
   * @param {number} ped
   * @return {number}
   */
declare function GetAnimalRarity(ped: Ped): number;

/**
   * _IS_HERD_VALID
   *
   * @param {number} herdHandle
   * @return {boolean}
   */
declare function IsHerdValid(herdHandle: ScrHandle): boolean;

/**
   * _SET_ANIMAL_IS_WILD
   *
   * @param {number} ped
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetAnimalIsWild(ped: Ped, toggle: boolean): void;

/**
   * _SET_ANIMAL_RARITY
   * rarityLevel: see _GET_ANIMAL_RARITY
   *
   * @param {number} ped
   * @param {number} rarityLevel
   * @return {void}
   */
declare function SetAnimalRarity(ped: Ped, rarityLevel: number): void;