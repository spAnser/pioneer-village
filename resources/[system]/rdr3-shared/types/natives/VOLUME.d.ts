/**
 * CREATE_VOLUME_AGGREGATE
 *

 * @return {number}
 */
declare function CreateVolumeAggregate(): Volume;

/**
 * CREATE_VOLUME_BOX
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} rotX
 * @param {number} rotY
 * @param {number} rotZ
 * @param {number} scaleX
 * @param {number} scaleY
 * @param {number} scaleZ
 * @return {number}
 */
declare function CreateVolumeBox(x: number, y: number, z: number, rotX: number, rotY: number, rotZ: number, scaleX: number, scaleY: number, scaleZ: number): Volume;

/**
 * CREATE_VOLUME_CYLINDER
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} rotX
 * @param {number} rotY
 * @param {number} rotZ
 * @param {number} scaleX
 * @param {number} scaleY
 * @param {number} scaleZ
 * @return {number}
 */
declare function CreateVolumeCylinder(x: number, y: number, z: number, rotX: number, rotY: number, rotZ: number, scaleX: number, scaleY: number, scaleZ: number): Volume;

/**
 * CREATE_VOLUME_SPHERE
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} rotX
 * @param {number} rotY
 * @param {number} rotZ
 * @param {number} scaleX
 * @param {number} scaleY
 * @param {number} scaleZ
 * @return {number}
 */
declare function CreateVolumeSphere(x: number, y: number, z: number, rotX: number, rotY: number, rotZ: number, scaleX: number, scaleY: number, scaleZ: number): Volume;

/**
 * DELETE_VOLUME
 *
 * @param {number} volume
 * @return {void}
 */
declare function DeleteVolume(volume: Volume): void;

/**
 * DOES_VOLUME_COLLIDE_WITH_ANY_VOLUME_LOCK
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} radius
 * @param {boolean} p4
 * @param {number} p5
 * @param {number} p6
 * @return {boolean}
 */
declare function DoesVolumeCollideWithAnyVolumeLock(x: number, y: number, z: number, radius: number, p4: boolean, p5: number, p6: number): boolean;

/**
 * DOES_VOLUME_EXIST
 *
 * @param {number} volume
 * @return {boolean}
 */
declare function DoesVolumeExist(volume: Volume): boolean;

/**
 * GET_VOLUME_COORDS
 *
 * @param {number} volume
 * @return {Vector3}
 */
declare function GetVolumeCoords(volume: Volume): Vector3;

/**
 * GET_VOLUME_LOCK_REQUEST_STATUS
 * enum eVolumeLockRequestStatus
 * {
 *   VOLUME_LOCK_REQUEST_STATUS_INVALID,
 *   VOLUME_LOCK_REQUEST_STATUS_READY,
 *   VOLUME_LOCK_REQUEST_STATUS_IN_PROGRESS,
 *   VOLUME_LOCK_REQUEST_STATUS_SUCCEEDED,
 *   VOLUME_LOCK_REQUEST_STATUS_FAILED
 * };
 *
 * @param {number} volLockRequestId
 * @return {number}
 */
declare function GetVolumeLockRequestStatus(volLockRequestId: number): number;

/**
 * GET_VOLUME_ROTATION
 *
 * @param {number} volume
 * @return {Vector3}
 */
declare function GetVolumeRotation(volume: Volume): Vector3;

/**
 * GET_VOLUME_SCALE
 *
 * @param {number} volume
 * @return {Vector3}
 */
declare function GetVolumeScale(volume: Volume): Vector3;

/**
 * IS_POINT_IN_VOLUME
 * Old name: _IS_POSITION_INSIDE_VOLUME
 *
 * @param {number} volume
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {boolean}
 */
declare function IsPointInVolume(volume: Volume, x: number, y: number, z: number): boolean;

/**
 * IS_VOLUME_LOCK_REQUEST_VALID
 *
 * @param {number} volLockRequestId
 * @return {boolean}
 */
declare function IsVolumeLockRequestValid(volLockRequestId: number): boolean;

/**
 * REQUEST_VOLUME_LOCK
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} radius
 * @param {number} p4
 * @param {number} p5
 * @return {number}
 */
declare function RequestVolumeLock(x: number, y: number, z: number, radius: number, p4: number, p5: number): number;

/**
 * REQUEST_VOLUME_LOCK_WITH_ARGS
 *
 * @param {DataView} args
 * @return {number}
 */
declare function RequestVolumeLockWithArgs(args: DataView): number;

/**
 * SET_VOLUME_COORDS
 *
 * @param {number} volume
 * @param {number} posX
 * @param {number} posY
 * @param {number} posZ
 * @return {boolean}
 */
declare function SetVolumeCoords(volume: Volume, posX: number, posY: number, posZ: number): boolean;

/**
 * SET_VOLUME_OWNER_PERSISTENT_CHARACTER
 *
 * @param {number} volume
 * @param {number} persChar
 * @param {boolean} p2
 * @return {void}
 */
declare function SetVolumeOwnerPersistentCharacter(volume: Volume, persChar: PersChar, p2: boolean): void;

/**
 * SET_VOLUME_ROTATION
 *
 * @param {number} volume
 * @param {number} rotX
 * @param {number} rotY
 * @param {number} rotZ
 * @return {boolean}
 */
declare function SetVolumeRotation(volume: Volume, rotX: number, rotY: number, rotZ: number): boolean;

/**
 * SET_VOLUME_SCALE
 *
 * @param {number} volume
 * @param {number} scaleX
 * @param {number} scaleY
 * @param {number} scaleZ
 * @return {boolean}
 */
declare function SetVolumeScale(volume: Volume, scaleX: number, scaleY: number, scaleZ: number): boolean;

/**
 * _0x128FC3A893BF853A
 * nullsub, doesn't do anything
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x128FC3A893BF853A(p0: any): void;

/**
 * _0x2B32B11520626229
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @param {any} p3
 * @param {any} p4
 * @return {any}
 */
declare function N_0x2B32B11520626229(p0: any, p1: any, p2: any, p3: any, p4: any): any;

/**
 * _0x351D71B8B72B858B
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0x351D71B8B72B858B(p0: any): any;

/**
 * _0x3EFABB21E14A6BD1
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {void}
 */
declare function N_0x3EFABB21E14A6BD1(p0: any, p1: any, p2: any): void;

/**
 * _0x40F769D31A00D5A0
 *
 * @param {any} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0x40F769D31A00D5A0(p0: any, p1: any): any;

/**
 * _0x4A8FEFC43FD8AC9B
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {void}
 */
declare function N_0x4A8FEFC43FD8AC9B(p0: any, p1: any, p2: any): void;

/**
 * _0x51E52C9687FCDEEC
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
declare function N_0x51E52C9687FCDEEC(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): any;

/**
 * _0x52572B331E693AED
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {void}
 */
declare function N_0x52572B331E693AED(p0: any, p1: any, p2: any): void;

/**
 * _0x53D05D60E5F5B40C
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @param {any} p3
 * @return {void}
 */
declare function N_0x53D05D60E5F5B40C(p0: any, p1: any, p2: any, p3: any): void;

/**
 * _0x695DAC2DB928F308
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x695DAC2DB928F308(p0: any, p1: any): void;

/**
 * _0x6D5F9E69BA1BE783
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x6D5F9E69BA1BE783(p0: any): void;

/**
 * _0x748C5F51A18CB8F0
 * nullsub, doesn't do anything
 *
 * @param {boolean} p0
 * @return {void}
 */
declare function N_0x748C5F51A18CB8F0(p0: boolean): void;

/**
 * _0x7FD78DFD0C5D7B9B
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0x7FD78DFD0C5D7B9B(p0: any): any;

/**
 * _0x870E9981ED27C815
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @param {any} p3
 * @param {any} p4
 * @param {any} p5
 * @return {any}
 */
declare function N_0x870E9981ED27C815(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

/**
 * _0x998202B206872672
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x998202B206872672(p0: any): void;

/**
 * _0xAA9EE2AAFC717623
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @param {any} p3
 * @param {any} p4
 * @param {any} p5
 * @return {any}
 */
declare function N_0xAA9EE2AAFC717623(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

/**
 * _0xAC355980681A7F89
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0xAC355980681A7F89(p0: any): void;

/**
 * _0xB440F4E35393FC39
 *
 * @param {number} volume
 * @param {any} p1
 * @return {void}
 */
declare function N_0xB440F4E35393FC39(volume: Volume, p1: any): void;

/**
 * _0xB469CFD9E065EB99
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0xB469CFD9E065EB99(p0: any, p1: any): void;

/**
 * _0xC4019CF9AE8E931A
 *
 * @param {number} volLockRequestId
 * @return {Vector3}
 */
declare function N_0xC4019CF9AE8E931A(volLockRequestId: number): Vector3;

/**
 * _0xC61E2FD926DBB406
 *

 * @return {void}
 */
declare function N_0xC61E2FD926DBB406(): void;

/**
 * _0xCA5C90D40665D5CE
 *
 * @param {any} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0xCA5C90D40665D5CE(p0: any, p1: any): any;

/**
 * _0xD460135C98940274
 *
 * @param {number} volume
 * @param {any} p1
 * @return {void}
 */
declare function N_0xD460135C98940274(volume: Volume, p1: any): void;

/**
 * _0xD4FA73FE628FEC63
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0xD4FA73FE628FEC63(p0: any, p1: any): void;

/**
 * _0xD52DF30355EA7C8E
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {void}
 */
declare function N_0xD52DF30355EA7C8E(p0: any, p1: any, p2: any): void;

/**
 * _0xD882C5B3991575B7
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @param {any} p3
 * @param {any} p4
 * @return {Vector3}
 */
declare function N_0xD882C5B3991575B7(p0: any, p1: any, p2: any, p3: any, p4: any): Vector3;

/**
 * _0xEBA87B9273835CF3
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0xEBA87B9273835CF3(p0: any, p1: any): void;

/**
 * _0xEE1D6FF54CAF7714
 *
 * @param {any} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0xEE1D6FF54CAF7714(p0: any, p1: any): any;

/**
 * _0xF3A2FBA5985C8CD5
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @param {any} p3
 * @return {void}
 */
declare function N_0xF3A2FBA5985C8CD5(p0: any, p1: any, p2: any, p3: any): void;

/**
 * _0xF6CE6F9C3897804E
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0xF6CE6F9C3897804E(p0: any): any;

/**
 * _0xF6F5447D418DAA82
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0xF6F5447D418DAA82(p0: any): any;

/**
 * _0xFA15C9A320E707B0
 * nullsub, doesn't do anything
 *

 * @return {void}
 */
declare function N_0xFA15C9A320E707B0(): void;

/**
 * _ADD_BOUNDS_TO_AGGREGATE_VOLUME
 * _ADD_R* - _ADD_V(OLUME?)*
 *
 * @param {number} volume
 * @param {number} aggregate
 * @return {void}
 */
declare function AddBoundsToAggregateVolume(volume: Volume, aggregate: Volume): void;

/**
 * _ADD_BOX_VOLUME_TO_VOLUME_AGGREGATE
 *
 * @param {number} aggregate
 * @param {number} p1
 * @param {number} p2
 * @param {number} p3
 * @param {number} p4
 * @param {number} p5
 * @param {number} p6
 * @param {number} p7
 * @param {number} p8
 * @param {number} p9
 * @return {void}
 */
declare function AddBoxVolumeToVolumeAggregate(aggregate: Volume, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number, p8: number, p9: number): void;

/**
 * _ADD_CYLINDER_VOLUME_TO_VOLUME_AGGREGATE
 *
 * @param {number} aggregate
 * @param {number} p1
 * @param {number} p2
 * @param {number} p3
 * @param {number} p4
 * @param {number} p5
 * @param {number} p6
 * @param {number} p7
 * @param {number} p8
 * @param {number} p9
 * @return {void}
 */
declare function AddCylinderVolumeToVolumeAggregate(aggregate: Volume, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number, p8: number, p9: number): void;

/**
 * _ADD_ENTRY_VOLUME_LOCK
 *
 * @param {DataView} args
 * @return {boolean}
 */
declare function AddEntryVolumeLock(args: DataView): boolean;

/**
 * _ADD_SPHERE_VOLUME_TO_VOLUME_AGGREGATE
 *
 * @param {number} aggregate
 * @param {number} p1
 * @param {number} p2
 * @param {number} p3
 * @param {number} p4
 * @param {number} p5
 * @param {number} p6
 * @param {number} p7
 * @param {number} p8
 * @param {number} p9
 * @return {void}
 */
declare function AddSphereVolumeToVolumeAggregate(aggregate: Volume, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number, p8: number, p9: number): void;

/**
 * _ADD_VOLUME_TO_VOLUME_AGGREGATE
 *
 * @param {number} aggregate
 * @param {number} typeHash
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} rotX
 * @param {number} rotY
 * @param {number} rotZ
 * @param {number} scaleX
 * @param {number} scaleY
 * @param {number} scaleZ
 * @return {void}
 */
declare function AddVolumeToVolumeAggregate(aggregate: Volume, typeHash: Hash, x: number, y: number, z: number, rotX: number, rotY: number, rotZ: number, scaleX: number, scaleY: number, scaleZ: number): void;

/**
 * _CREATE_ANTI_GRIEF_VOLUME
 *
 * @param {number} volumeType
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} rotX
 * @param {number} rotY
 * @param {number} rotZ
 * @param {number} scaleX
 * @param {number} scaleY
 * @param {number} scaleZ
 * @return {number}
 */
declare function CreateAntiGriefVolume(volumeType: Hash, x: number, y: number, z: number, rotX: number, rotY: number, rotZ: number, scaleX: number, scaleY: number, scaleZ: number): Volume;

/**
 * _CREATE_SPEED_VOLUME
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
 * @param {any} p10
 * @param {any} p11
 * @param {any} p12
 * @param {any} p13
 * @param {any} p14
 * @return {number}
 */
declare function CreateSpeedVolume(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any, p10: any, p11: any, p12: any, p13: any, p14: any): Volume;

/**
 * _CREATE_VOLUME_AGGREGATE_WITH_CUSTOM_NAME
 *
 * @param {string | number} name
 * @return {number}
 */
declare function CreateVolumeAggregateWithCustomName(name: string | number): Volume;

/**
 * _CREATE_VOLUME_BOX_WITH_CUSTOM_NAME
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} rotX
 * @param {number} rotY
 * @param {number} rotZ
 * @param {number} scaleX
 * @param {number} scaleY
 * @param {number} scaleZ
 * @param {string | number} name
 * @return {number}
 */
declare function CreateVolumeBoxWithCustomName(x: number, y: number, z: number, rotX: number, rotY: number, rotZ: number, scaleX: number, scaleY: number, scaleZ: number, name: string | number): Volume;

/**
 * _CREATE_VOLUME_BY_HASH
 *
 * @param {number} volumeType
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} rotX
 * @param {number} rotY
 * @param {number} rotZ
 * @param {number} scaleX
 * @param {number} scaleY
 * @param {number} scaleZ
 * @return {number}
 */
declare function CreateVolumeByHash(volumeType: Hash, x: number, y: number, z: number, rotX: number, rotY: number, rotZ: number, scaleX: number, scaleY: number, scaleZ: number): Volume;

/**
 * _CREATE_VOLUME_BY_HASH_WITH_CUSTOM_NAME
 *
 * @param {number} volumeType
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} rotX
 * @param {number} rotY
 * @param {number} rotZ
 * @param {number} scaleX
 * @param {number} scaleY
 * @param {number} scaleZ
 * @param {string | number} name
 * @return {number}
 */
declare function CreateVolumeByHashWithCustomName(volumeType: Hash, x: number, y: number, z: number, rotX: number, rotY: number, rotZ: number, scaleX: number, scaleY: number, scaleZ: number, name: string | number): Volume;

/**
 * _CREATE_VOLUME_CYLINDER_WITH_CUSTOM_NAME
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} rotX
 * @param {number} rotY
 * @param {number} rotZ
 * @param {number} scaleX
 * @param {number} scaleY
 * @param {number} scaleZ
 * @param {string | number} name
 * @return {number}
 */
declare function CreateVolumeCylinderWithCustomName(x: number, y: number, z: number, rotX: number, rotY: number, rotZ: number, scaleX: number, scaleY: number, scaleZ: number, name: string | number): Volume;

/**
 * _CREATE_VOLUME_LOCK
 * Params: p5 is always 0
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} radius
 * @param {number} flag
 * @param {any} p5
 * @return {number}
 */
declare function CreateVolumeLock(x: number, y: number, z: number, radius: number, flag: number, p5: any): Volume;

/**
 * _CREATE_VOLUME_LOCK_ATTACHED_TO_ENTITY
 * Params: p3 is always 0
 *
 * @param {number} entity
 * @param {number} radius
 * @param {number} flag
 * @param {any} p3
 * @return {number}
 */
declare function CreateVolumeLockAttachedToEntity(entity: Entity, radius: number, flag: number, p3: any): Volume;

/**
 * _CREATE_VOLUME_SPHERE_WITH_CUSTOM_NAME
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} rotX
 * @param {number} rotY
 * @param {number} rotZ
 * @param {number} scaleX
 * @param {number} scaleY
 * @param {number} scaleZ
 * @param {string | number} name
 * @return {number}
 */
declare function CreateVolumeSphereWithCustomName(x: number, y: number, z: number, rotX: number, rotY: number, rotZ: number, scaleX: number, scaleY: number, scaleZ: number, name: string | number): Volume;

/**
 * _CREATE_WALK_AND_TALK_VOLUME
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
 * @param {any} p10
 * @param {any} p11
 * @param {any} p12
 * @return {number}
 */
declare function CreateWalkAndTalkVolume(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any, p10: any, p11: any, p12: any): Volume;

/**
 * _FIND_VOLUME_LOCK_REQUEST_ID_WITH_ARGS
 *
 * @param {DataView} args
 * @return {number}
 */
declare function FindVolumeLockRequestIdWithArgs(args: DataView): number;

/**
 * _GET_VOLUME_BOUNDS
 *
 * @param {number} volume
 * @return {[Vector3, Vector3]}
 */
declare function GetVolumeBounds(volume: Volume): [Vector3, Vector3];

/**
 * _GET_VOLUME_RELATIONSHIP
 * Returns relationshipGroup Hash
 *
 * @param {number} volume
 * @return {number}
 */
declare function GetVolumeRelationship(volume: Volume): number;

/**
 * _IS_AGGREGATE_VOLUME
 *
 * @param {number} volume
 * @return {boolean}
 */
declare function IsAggregateVolume(volume: Volume): boolean;

/**
 * _IS_POINT_NEAR_VOLUME_LOCK_CENTER
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} radius
 * @param {number} p4
 * @param {number} p5
 * @param {number} flags
 * @return {boolean}
 */
declare function IsPointNearVolumeLockCenter(x: number, y: number, z: number, radius: number, p4: number, p5: number, flags: number): boolean;

/**
 * _IS_VOLUME_LOCK_REQUEST_VALID_2
 *
 * @param {number} volLockRequestId
 * @return {boolean}
 */
declare function IsVolumeLockRequestValid_2(volLockRequestId: number): boolean;

/**
 * _MODIFY_VOLUME_LOCK_LOCATION
 *
 * @param {number} volLock
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {void}
 */
declare function ModifyVolumeLockLocation(volLock: number, x: number, y: number, z: number): void;

/**
 * _RELEASE_LOCK_VOLUME
 *
 * @param {number} volLockRequestId
 * @return {void}
 */
declare function ReleaseLockVolume(volLockRequestId: number): void;

/**
 * _REMOVE_BOUNDS_FROM_AGGREGATE_VOLUME
 * _REMOVE_E* - _REMOVE_R*
 *
 * @param {number} volume
 * @param {number} aggregate
 * @return {void}
 */
declare function RemoveBoundsFromAggregateVolume(volume: Volume, aggregate: Volume): void;

/**
 * _SET_ANTI_GRIEF_VOLUME_BLOCKS_HORSE
 *
 * @param {number} volume
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetAntiGriefVolumeBlocksHorse(volume: Volume, toggle: boolean): void;

/**
 * _SET_ANTI_GRIEF_VOLUME_BLOCKS_PLAYER
 *
 * @param {number} volume
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetAntiGriefVolumeBlocksPlayer(volume: Volume, toggle: boolean): void;

/**
 * _SET_VOLUME_RELATIONSHIP
 *
 * @param {number} volume
 * @param {number} relationshipGroup
 * @return {void}
 */
declare function SetVolumeRelationship(volume: Volume, relationshipGroup: Hash): void;