/**
   * ACTIVATE_PHYSICS
   *
   * @param {number} entity
   * @return {void}
   */
declare function ActivatePhysics(entity: Entity): void;

/**
   * ADD_ROPE
   * There are 19 types of rope, from type = 0 to type = 18
   * Rope definitions are stored in ropedata.xml
   * Rope types 0, 15 and 18 have proper physics for hanging objects (taut, do not sag, small to medium diameter, good aspect for a rope)
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} rotX
   * @param {number} rotY
   * @param {number} rotZ
   * @param {number} length
   * @param {number} ropeType
   * @param {number} maxLength
   * @param {number} minLength
   * @param {number} p10
   * @param {boolean} p11
   * @param {boolean} p12
   * @param {boolean} rigid
   * @param {number} p14
   * @param {boolean} breakWhenShot
   * @param {DataView} unkPtr
   * @param {boolean} p17
   * @return {number}
   */
declare function AddRope(x: number, y: number, z: number, rotX: number, rotY: number, rotZ: number, length: number, ropeType: number, maxLength: number, minLength: number, p10: number, p11: boolean, p12: boolean, rigid: boolean, p14: number, breakWhenShot: boolean, unkPtr: DataView, p17: boolean): number;

/**
   * ATTACH_ENTITIES_TO_ROPE
   * Attaches entity 1 to entity 2.
   * If you use a boneName (p12/p13) make sure boneId (p15/p16) is set to -1.
   *
   * @param {number} ropeId
   * @param {number} entity1
   * @param {number} entity2
   * @param {number} ent1X
   * @param {number} ent1Y
   * @param {number} ent1Z
   * @param {number} ent2X
   * @param {number} ent2Y
   * @param {number} ent2Z
   * @param {number} length
   * @param {number} alwaysZero1
   * @param {number} alwaysZero2
   * @param {string | number} boneName1
   * @param {string | number} boneName2
   * @param {boolean} p14
   * @param {number} boneId1
   * @param {number} boneId2
   * @param {number} alwaysZero3
   * @param {number} alwaysZero4
   * @param {boolean} p19
   * @param {boolean} p20
   * @return {void}
   */
declare function AttachEntitiesToRope(ropeId: number, entity1: Entity, entity2: Entity, ent1X: number, ent1Y: number, ent1Z: number, ent2X: number, ent2Y: number, ent2Z: number, length: number, alwaysZero1: number, alwaysZero2: number, boneName1: string | number, boneName2: string | number, p14: boolean, boneId1: number, boneId2: number, alwaysZero3: number, alwaysZero4: number, p19: boolean, p20: boolean): void;

/**
   * BREAK_ENTITY_GLASS
   *
   * @param {number} entity
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {number} p4
   * @param {number} p5
   * @param {number} p6
   * @param {number} p7
   * @param {number} p8
   * @param {any} p9
   * @param {boolean} p10
   * @return {void}
   */
declare function BreakEntityGlass(entity: Entity, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number, p8: number, p9: any, p10: boolean): void;

/**
   * DELETE_CHILD_ROPE
   *
   * @param {number} ropeId
   * @return {void}
   */
declare function DeleteChildRope(ropeId: number): void;

/**
   * DELETE_ROPE
   *
  
   * @return {number}
   */
declare function DeleteRope(): number;

/**
   * DETACH_ROPE_FROM_ENTITY
   *
   * @param {number} ropeId
   * @param {number} entity
   * @return {void}
   */
declare function DetachRopeFromEntity(ropeId: number, entity: Entity): void;

/**
   * DOES_ROPE_EXIST
   *
   * @param {number} ropeId
   * @return {boolean}
   */
declare function DoesRopeExist(ropeId: number): boolean;

/**
   * GET_ROPE_LAST_VERTEX_COORD
   *
   * @param {number} ropeId
   * @return {Vector3}
   */
declare function GetRopeLastVertexCoord(ropeId: number): Vector3;

/**
   * GET_ROPE_VERTEX_COORD
   *
   * @param {number} ropeId
   * @param {number} vertex
   * @return {Vector3}
   */
declare function GetRopeVertexCoord(ropeId: number, vertex: number): Vector3;

/**
   * GET_ROPE_VERTEX_COUNT
   *
   * @param {number} ropeId
   * @return {number}
   */
declare function GetRopeVertexCount(ropeId: number): number;

/**
   * ROPE_DRAW_SHADOW_ENABLED
   *
   * @param {boolean} toggle
   * @return {number}
   */
declare function RopeDrawShadowEnabled(toggle: boolean): number;

/**
   * ROPE_FORCE_LENGTH
   * Forces a rope to a certain length.
   *
   * @param {number} ropeId
   * @param {number} length
   * @return {void}
   */
declare function RopeForceLength(ropeId: number, length: number): void;

/**
   * ROPE_SET_UPDATE_ORDER
   *
   * @param {number} ropeId
   * @param {any} p1
   * @return {void}
   */
declare function RopeSetUpdateOrder(ropeId: number, p1: any): void;

/**
   * SET_DAMPING
   *
   * @param {number} entity
   * @param {number} vertex
   * @param {number} value
   * @return {void}
   */
declare function SetDamping(entity: Entity, vertex: number, value: number): void;

/**
   * SET_DISABLE_BREAKING
   *
   * @param {number} object
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetDisableBreaking(object: number, toggle: boolean): void;

/**
   * SET_DISABLE_FRAG_DAMAGE
   *
   * @param {number} object
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetDisableFragDamage(object: number, toggle: boolean): void;

/**
   * START_ROPE_UNWINDING_FRONT
   *
   * @param {number} ropeId
   * @return {void}
   */
declare function StartRopeUnwindingFront(ropeId: number): void;

/**
   * START_ROPE_WINDING
   *
   * @param {number} ropeId
   * @return {void}
   */
declare function StartRopeWinding(ropeId: number): void;

/**
   * STOP_ROPE_UNWINDING_FRONT
   *
   * @param {number} ropeId
   * @return {void}
   */
declare function StopRopeUnwindingFront(ropeId: number): void;

/**
   * STOP_ROPE_WINDING
   *
   * @param {number} ropeId
   * @return {void}
   */
declare function StopRopeWinding(ropeId: number): void;

/**
   * _0x0CB16D05E03FB525
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x0CB16D05E03FB525(p0: any): void;

/**
   * _0x1D97DA8ACB5D2582
   *
   * @param {number} ropeId
   * @param {number} p1
   * @return {void}
   */
declare function N_0x1D97DA8ACB5D2582(ropeId: number, p1: number): void;

/**
   * _0x1FC92BDBA1106BD2
   *
   * @param {number} ropeId
   * @param {number} p1
   * @return {void}
   */
declare function N_0x1FC92BDBA1106BD2(ropeId: number, p1: number): void;

/**
   * _0x21D0890D88DFB0B0
   *
   * @param {number} ropeId
   * @param {boolean} p1
   * @param {number} p2
   * @param {number} p3
   * @param {number} p4
   * @param {number} p5
   * @param {number} p6
   * @param {number} p7
   * @param {number} p8
   * @param {number} p9
   * @param {number} p10
   * @return {void}
   */
declare function N_0x21D0890D88DFB0B0(ropeId: number, p1: boolean, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number, p8: number, p9: number, p10: number): void;

/**
   * _0x31160EC47E7C9549
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x31160EC47E7C9549(p0: any, p1: any): void;

/**
   * _0x32F4DBFDFCCCC735
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0x32F4DBFDFCCCC735(p0: any, p1: any, p2: any): void;

/**
   * _0x3900491C0D61ED4B
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x3900491C0D61ED4B(p0: any, p1: any): void;

/**
   * _0x423C6B1F3786D28B
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x423C6B1F3786D28B(p0: any, p1: any): void;

/**
   * _0x461FCBDEB4D06717
   *
   * @param {number} ropeId
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x461FCBDEB4D06717(ropeId: number, p1: boolean): void;

/**
   * _0x483D4E917B0D35A9
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x483D4E917B0D35A9(p0: any, p1: any): void;

/**
   * _0x522FA3F490E2F7AC
   *
   * @param {number} ropeId
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0x522FA3F490E2F7AC(ropeId: number, p1: any, p2: any): void;

/**
   * _0x5A989B7EE3672A56
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x5A989B7EE3672A56(p0: any, p1: any): void;

/**
   * _0x5BD7457221CC5FF4
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x5BD7457221CC5FF4(p0: any, p1: any): void;

/**
   * _0x5E981C764DF33117
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x5E981C764DF33117(p0: any, p1: any): void;

/**
   * _0x69C810B72291D831
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @return {void}
   */
declare function N_0x69C810B72291D831(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;

/**
   * _0x6EA0E93CFFA472CC
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x6EA0E93CFFA472CC(p0: any): void;

/**
   * _0x751DF00EEFF122E3
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x751DF00EEFF122E3(p0: any): void;

/**
   * _0x76BAD9D538BCA1AA
   *
   * @param {number} ropeId
   * @param {number} p1
   * @return {void}
   */
declare function N_0x76BAD9D538BCA1AA(ropeId: number, p1: number): void;

/**
   * _0x814D453FCFDF119F
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0x814D453FCFDF119F(p0: any, p1: any, p2: any): void;

/**
   * _0x8D59079C37C21D78
   * _ROPE_SET_*
   *
   * @param {number} ropeId
   * @param {number} p1
   * @return {void}
   */
declare function N_0x8D59079C37C21D78(ropeId: number, p1: number): void;

/**
   * _0x8EEDFD8921389928
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
   * @param {any} p9
   * @return {void}
   */
declare function N_0x8EEDFD8921389928(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;

/**
   * _0x9C24846D0A4A2776
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x9C24846D0A4A2776(p0: any): void;

/**
   * _0xB40EA9E0D2E2F7F3
   *
   * @param {number} ropeId
   * @param {number} p1
   * @return {void}
   */
declare function N_0xB40EA9E0D2E2F7F3(ropeId: number, p1: number): void;

/**
   * _0xB7469CB9AC3C0FD4
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
declare function N_0xB7469CB9AC3C0FD4(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;

/**
   * _0xBB3E9B073E66C3C9
   *
   * @param {number} ropeId
   * @param {boolean} p1
   * @param {boolean} p2
   * @param {boolean} p3
   * @param {boolean} p4
   * @return {void}
   */
declare function N_0xBB3E9B073E66C3C9(ropeId: number, p1: boolean, p2: boolean, p3: boolean, p4: boolean): void;

/**
   * _0xBDDA142759307528
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xBDDA142759307528(p0: any): void;

/**
   * _0xC64E7A62632AD2FE
   *
   * @param {number} ropeId
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @param {any} p7
   * @return {void}
   */
declare function N_0xC64E7A62632AD2FE(ropeId: number, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;

/**
   * _0xC89E7410A93AC19A
   *
   * @param {number} ropeId
   * @param {number} p1
   * @return {void}
   */
declare function N_0xC89E7410A93AC19A(ropeId: number, p1: number): void;

/**
   * _0xD699E688B49C0FD2
   *
   * @param {number} ropeId
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {boolean} p4
   * @return {void}
   */
declare function N_0xD699E688B49C0FD2(ropeId: number, p1: number, p2: number, p3: number, p4: boolean): void;

/**
   * _0xDEDE679ED29DD4E7
   *
   * @param {number} ropeId
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0xDEDE679ED29DD4E7(ropeId: number, p1: boolean): void;

/**
   * _0xE54BF2CE6C7D23A9
   *
   * @param {number} ropeId
   * @param {number} p1
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {void}
   */
declare function N_0xE54BF2CE6C7D23A9(ropeId: number, p1: number, x: number, y: number, z: number): void;

/**
   * _0xEAF529446488EB18
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xEAF529446488EB18(p0: any): void;

/**
   * _0xF1EA2A881EB7F2CD
   *
   * @param {number} ropeId
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0xF1EA2A881EB7F2CD(ropeId: number, p1: boolean): void;

/**
   * _0xF27F1A8DE4F50A1B
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @return {void}
   */
declare function N_0xF27F1A8DE4F50A1B(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;

/**
   * _0xF8CA39D5C0D1D9A1
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xF8CA39D5C0D1D9A1(p0: any, p1: any): void;

/**
   * _0xFB9153A54AC713E8
   *
   * @param {number} ropeId
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0xFB9153A54AC713E8(ropeId: number, p1: boolean): void;

/**
   * _ADD_ROPE_2
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} rotX
   * @param {number} rotY
   * @param {number} rotZ
   * @param {number} length
   * @param {number} ropeType
   * @param {boolean} isNetworked
   * @param {number} p9
   * @param {number} p10
   * @return {number}
   */
declare function AddRope_2(x: number, y: number, z: number, rotX: number, rotY: number, rotZ: number, length: number, ropeType: number, isNetworked: boolean, p9: number, p10: number): number;

/**
   * _ATTACH_ENTITES_TO_ROPE_3
   *
   * @param {number} ropeId
   * @param {number} entity1
   * @param {number} entity2
   * @param {number} p3
   * @param {number} p4
   * @param {number} p5
   * @param {number} p6
   * @param {number} p7
   * @param {number} p8
   * @param {any} p9
   * @param {any} p10
   * @return {void}
   */
declare function AttachEntitesToRope_3(ropeId: number, entity1: Entity, entity2: Entity, p3: number, p4: number, p5: number, p6: number, p7: number, p8: number, p9: any, p10: any): void;

/**
   * _ATTACH_ENTITIES_TO_ROPE_2
   * Attaches a rope to two entities: binds two bones from two entities; one entity can be an object, i.e. a suspension point, the other an NPC bone
   *
   * @param {number} ropeId
   * @param {number} entity1
   * @param {number} entity2
   * @param {number} ent1X
   * @param {number} ent1Y
   * @param {number} ent1Z
   * @param {number} ent2X
   * @param {number} ent2Y
   * @param {number} ent2Z
   * @param {string | number} boneName1
   * @param {string | number} boneName2
   * @return {void}
   */
declare function AttachEntitiesToRope_2(ropeId: number, entity1: Entity, entity2: Entity, ent1X: number, ent1Y: number, ent1Z: number, ent2X: number, ent2Y: number, ent2Z: number, boneName1: string | number, boneName2: string | number): void;

/**
   * _BREAK_ROPE
   * ropeTop returns top half of rope, ropeBottom returns bottom half of rope
   *
   * @param {number} offsetX
   * @param {number} offsetY
   * @param {number} offsetZ
   * @param {number} p6
   * @return {[number, number, number]}
   */
declare function BreakRope(offsetX: number, offsetY: number, offsetZ: number, p6: number): [number, number, number];

/**
   * _CREATE_ROPE_WINDING_ABILITY
   * Combining this with ADD_ROPE enables winding
   * p1: mostly empty (0)
   * ropeModelType: RB_L_Wrist02, RB_R_Wrist02, ropeAttach, noose01x_Rope_03, SKEL_Neck0, SKEL_L_FOOT, SKEL_Neck1, Root_s_meatbit_Chunck_Xlarge01x
   * _CREATE_*
   *
   * @param {number} ropeId
   * @param {string | number} p1
   * @param {string | number} ropeModelType
   * @param {number} length
   * @param {boolean} p4
   * @return {void}
   */
declare function CreateRopeWindingAbility(ropeId: number, p1: string | number, ropeModelType: string | number, length: number, p4: boolean): void;

/**
   * _HITCH_HORSE
   *
   * @param {number} horse
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {void}
   */
declare function HitchHorse(horse: Ped, x: number, y: number, z: number): void;

/**
   * _IS_ROPE_ATTACHED_TO_ENTITY
   *
   * @param {number} ropeId
   * @param {number} entity
   * @return {boolean}
   */
declare function IsRopeAttachedToEntity(ropeId: number, entity: Entity): boolean;

/**
   * _IS_ROPE_BROKEN
   *
   * @param {number} ropeId
   * @return {boolean}
   */
declare function IsRopeBroken(ropeId: number): boolean;

/**
   * _RELEASE_ROPE
   *
   * @param {number} ropeId
   * @return {void}
   */
declare function ReleaseRope(ropeId: number): void;

/**
   * _ROPE_CHANGE_VISIBILITY
   *
   * @param {boolean} visible
   * @return {number}
   */
declare function RopeChangeVisibility(visible: boolean): number;

/**
   * _ROPE_GET_BREAKER_OF_ROPE
   *
   * @param {number} ropeId
   * @return {number}
   */
declare function RopeGetBreakerOfRope(ropeId: number): Player;

/**
   * _ROPE_GET_FORCED_LENGTH
   *
   * @param {number} ropeId
   * @return {number}
   */
declare function RopeGetForcedLength(ropeId: number): number;

/**
   * _START_ROPE_UNWINDING_BACK
   *
   * @param {number} ropeId
   * @return {void}
   */
declare function StartRopeUnwindingBack(ropeId: number): void;

/**
   * _STOP_ROPE_UNWINDING_BACK
   *
   * @param {number} ropeId
   * @return {void}
   */
declare function StopRopeUnwindingBack(ropeId: number): void;

/**
   * _UNHITCH_HORSE
   *
   * @param {number} horse
   * @return {void}
   */
declare function UnhitchHorse(horse: Ped): void;