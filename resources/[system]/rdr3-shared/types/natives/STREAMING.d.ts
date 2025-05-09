/**
 * BEGIN_SRL
 *

 * @return {void}
 */
declare function BeginSrl(): void;

/**
 * CLEAR_FOCUS
 *

 * @return {void}
 */
declare function ClearFocus(): void;

/**
 * CLEAR_HD_AREA
 *

 * @return {void}
 */
declare function ClearHdArea(): void;

/**
 * DOES_ANIM_DICT_EXIST
 *
 * @param {string | number} animDict
 * @return {boolean}
 */
declare function DoesAnimDictExist(animDict: string | number): boolean;

/**
 * END_SRL
 *

 * @return {void}
 */
declare function EndSrl(): void;

/**
 * GET_NUMBER_OF_STREAMING_REQUESTS
 *

 * @return {number}
 */
declare function GetNumberOfStreamingRequests(): number;

/**
 * GET_POPULATION_BUDGET_MULTIPLIER
 *

 * @return {number}
 */
declare function GetPopulationBudgetMultiplier(): number;

/**
 * HAS_ANIM_DICT_LOADED
 *
 * @param {string | number} animDict
 * @return {boolean}
 */
declare function HasAnimDictLoaded(animDict: string | number): boolean;

/**
 * HAS_CLIP_SET_LOADED
 * Alias for HAS_ANIM_SET_LOADED.
 *
 * @param {string | number} clipSet
 * @return {boolean}
 */
declare function HasClipSetLoaded(clipSet: string | number): boolean;

/**
 * HAS_COLLISION_FOR_MODEL_LOADED
 *
 * @param {number} model
 * @return {boolean}
 */
declare function HasCollisionForModelLoaded(model: Hash): boolean;

/**
 * HAS_MODEL_LOADED
 * Checks if the specified model has loaded into memory.
 *
 * @param {number} model
 * @return {boolean}
 */
declare function HasModelLoaded(model: Hash): boolean;

/**
 * HAS_MOVE_NETWORK_DEF_LOADED
 *
 * @param {string | number} name
 * @return {boolean}
 */
declare function HasMoveNetworkDefLoaded(name: string | number): boolean;

/**
 * HAS_NAMED_PTFX_ASSET_LOADED
 *
 * @param {number} fxNameHash
 * @return {boolean}
 */
declare function HasNamedPtfxAssetLoaded(fxNameHash: Hash): boolean;

/**
 * HAS_PTFX_ASSET_LOADED
 *

 * @return {boolean}
 */
declare function HasPtfxAssetLoaded(): boolean;

/**
 * IPL_GROUP_SWAP_CANCEL
 *

 * @return {void}
 */
declare function IplGroupSwapCancel(): void;

/**
 * IPL_GROUP_SWAP_FINISH
 *

 * @return {void}
 */
declare function IplGroupSwapFinish(): void;

/**
 * IPL_GROUP_SWAP_IS_ACTIVE
 *

 * @return {boolean}
 */
declare function IplGroupSwapIsActive(): boolean;

/**
 * IPL_GROUP_SWAP_IS_READY
 *

 * @return {boolean}
 */
declare function IplGroupSwapIsReady(): boolean;

/**
 * IPL_GROUP_SWAP_START
 *
 * @param {string | number} iplName1
 * @param {string | number} iplName2
 * @return {void}
 */
declare function IplGroupSwapStart(iplName1: string | number, iplName2: string | number): void;

/**
 * IS_ENTITY_FOCUS
 *
 * @param {number} entity
 * @return {boolean}
 */
declare function IsEntityFocus(entity: Entity): boolean;

/**
 * IS_IPL_ACTIVE_BY_HASH
 * Old name: _IS_IMAP_ACTIVE_2
 *
 * @param {number} iplHash
 * @return {boolean}
 */
declare function IsIplActiveByHash(iplHash: Hash): boolean;

/**
 * IS_IPL_ACTIVE_HASH
 * Old name: _IS_IMAP_ACTIVE
 *
 * @param {number} iplHash
 * @return {boolean}
 */
declare function IsIplActiveHash(iplHash: Hash): boolean;

/**
 * IS_LOAD_SCENE_ACTIVE
 *

 * @return {boolean}
 */
declare function IsLoadSceneActive(): boolean;

/**
 * IS_LOAD_SCENE_LOADED
 *

 * @return {boolean}
 */
declare function IsLoadSceneLoaded(): boolean;

/**
 * IS_MODEL_A_PED
 *
 * @param {number} model
 * @return {boolean}
 */
declare function IsModelAPed(model: Hash): boolean;

/**
 * IS_MODEL_A_VEHICLE
 * Returns whether the specified model represents a vehicle.
 *
 * @param {number} model
 * @return {boolean}
 */
declare function IsModelAVehicle(model: Hash): boolean;

/**
 * IS_MODEL_IN_CDIMAGE
 * Returns whether the specified model exists in the game.
 *
 * @param {number} model
 * @return {boolean}
 */
declare function IsModelInCdimage(model: Hash): boolean;

/**
 * IS_MODEL_VALID
 * Returns whether the specified model is valid
 *
 * @param {number} model
 * @return {boolean}
 */
declare function IsModelValid(model: Hash): boolean;

/**
 * IS_PLAYER_SWITCH_IN_PROGRESS
 *

 * @return {boolean}
 */
declare function IsPlayerSwitchInProgress(): boolean;

/**
 * IS_RENDERED_SCENE_LOADED
 *

 * @return {boolean}
 */
declare function IsRenderedSceneLoaded(): boolean;

/**
 * IS_SRL_LOADED
 *

 * @return {boolean}
 */
declare function IsSrlLoaded(): boolean;

/**
 * LOAD_SCENE_START
 *
 * @param {number} posX
 * @param {number} posY
 * @param {number} posZ
 * @param {number} offsetX
 * @param {number} offsetY
 * @param {number} offsetZ
 * @param {number} radius
 * @param {number} p7
 * @return {boolean}
 */
declare function LoadSceneStart(posX: number, posY: number, posZ: number, offsetX: number, offsetY: number, offsetZ: number, radius: number, p7: number): boolean;

/**
 * LOAD_SCENE_START_SPHERE
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} radius
 * @param {any} p4
 * @return {boolean}
 */
declare function LoadSceneStartSphere(x: number, y: number, z: number, radius: number, p4: any): boolean;

/**
 * LOAD_SCENE_STOP
 *

 * @return {void}
 */
declare function LoadSceneStop(): void;

/**
 * PREFETCH_SRL
 *
 * @param {string | number} srl
 * @return {void}
 */
declare function PrefetchSrl(srl: string | number): void;

/**
 * REMOVE_ANIM_DICT
 *
 * @param {string | number} animDict
 * @return {void}
 */
declare function RemoveAnimDict(animDict: string | number): void;

/**
 * REMOVE_CLIP_SET
 * Alias for REMOVE_ANIM_SET.
 *
 * @param {string | number} clipSet
 * @return {void}
 */
declare function RemoveClipSet(clipSet: string | number): void;

/**
 * REMOVE_IPL_BY_HASH
 * Old name: _REMOVE_IMAP_2
 *
 * @param {number} iplHash
 * @return {void}
 */
declare function RemoveIplByHash(iplHash: Hash): void;

/**
 * REMOVE_IPL_HASH
 * Old name: _REMOVE_IMAP
 *
 * @param {number} iplHash
 * @return {void}
 */
declare function RemoveIplHash(iplHash: Hash): void;

/**
 * REMOVE_MOVE_NETWORK_DEF
 *
 * @param {string | number} name
 * @return {void}
 */
declare function RemoveMoveNetworkDef(name: string | number): void;

/**
 * REMOVE_NAMED_PTFX_ASSET
 *
 * @param {number} fxNameHash
 * @return {void}
 */
declare function RemoveNamedPtfxAsset(fxNameHash: Hash): void;

/**
 * REMOVE_PTFX_ASSET
 *

 * @return {void}
 */
declare function RemovePtfxAsset(): void;

/**
 * REQUEST_ADDITIONAL_COLLISION_AT_COORD
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {void}
 */
declare function RequestAdditionalCollisionAtCoord(x: number, y: number, z: number): void;

/**
 * REQUEST_ANIM_DICT
 *
 * @param {string | number} animDict
 * @return {void}
 */
declare function RequestAnimDict(animDict: string | number): void;

/**
 * REQUEST_CLIP_SET
 *
 * @param {string | number} clipSet
 * @return {void}
 */
declare function RequestClipSet(clipSet: string | number): void;

/**
 * REQUEST_COLLISION_AT_COORD
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {void}
 */
declare function RequestCollisionAtCoord(x: number, y: number, z: number): void;

/**
 * REQUEST_COLLISION_FOR_MODEL
 *
 * @param {number} model
 * @return {void}
 */
declare function RequestCollisionForModel(model: Hash): void;

/**
 * REQUEST_IPL_BY_HASH
 * Old name: _REQUEST_IMAP_2
 *
 * @param {number} iplHash
 * @return {void}
 */
declare function RequestIplByHash(iplHash: Hash): void;

/**
 * REQUEST_IPL_HASH
 * Old name: _REQUEST_IMAP
 *
 * @param {number} iplHash
 * @return {void}
 */
declare function RequestIplHash(iplHash: Hash): void;

/**
 * REQUEST_MODEL
 * Request a model to be loaded into memory.
 *
 * @param {number} model
 * @param {boolean} p1
 * @return {void}
 */
declare function RequestModel(model: Hash, p1: boolean): void;

/**
 * REQUEST_MOVE_NETWORK_DEF
 *
 * @param {string | number} name
 * @return {void}
 */
declare function RequestMoveNetworkDef(name: string | number): void;

/**
 * REQUEST_NAMED_PTFX_ASSET
 *
 * @param {number} fxNameHash
 * @return {void}
 */
declare function RequestNamedPtfxAsset(fxNameHash: Hash): void;

/**
 * REQUEST_PTFX_ASSET
 *

 * @return {void}
 */
declare function RequestPtfxAsset(): void;

/**
 * SET_ALL_MAPDATA_CULLED
 * nullsub, doesn't do anything
 *
 * @param {any} p0
 * @return {void}
 */
declare function SetAllMapdataCulled(p0: any): void;

/**
 * SET_FOCUS_ENTITY
 * It seems to make the entity's coords mark the point from which LOD-distances are measured. In my testing, setting a vehicle as the focus entity and moving that vehicle more than 300 distance units away from the player will make the level of detail around the player go down drastically (shadows disappear, textures go extremely low res, etc). The player seems to be the default focus entity.
 *
 * @param {number} entity
 * @return {void}
 */
declare function SetFocusEntity(entity: Entity): void;

/**
 * SET_FOCUS_POS_AND_VEL
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} offsetX
 * @param {number} offsetY
 * @param {number} offsetZ
 * @return {void}
 */
declare function SetFocusPosAndVel(x: number, y: number, z: number, offsetX: number, offsetY: number, offsetZ: number): void;

/**
 * SET_GAME_PAUSES_FOR_STREAMING
 *
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetGamePausesForStreaming(toggle: boolean): void;

/**
 * SET_HD_AREA
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} radius
 * @return {void}
 */
declare function SetHdArea(x: number, y: number, z: number, radius: number): void;

/**
 * SET_MAPDATACULLBOX_ENABLED
 *
 * @param {string | number} name
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetMapdatacullboxEnabled(name: string | number, toggle: boolean): void;

/**
 * SET_MODEL_AS_NO_LONGER_NEEDED
 * Marks the model as no longer needed.
 *
 * @param {number} model
 * @return {void}
 */
declare function SetModelAsNoLongerNeeded(model: Hash): void;

/**
 * SET_POPULATION_BUDGET_MULTIPLIER
 *
 * @param {number} fBudgetMultiplier
 * @return {void}
 */
declare function SetPopulationBudgetMultiplier(fBudgetMultiplier: number): void;

/**
 * SET_SCENE_STREAMING_TRACKS_CAM_POS_THIS_FRAME
 *

 * @return {void}
 */
declare function SetSceneStreamingTracksCamPosThisFrame(): void;

/**
 * SET_SRL_LONG_JUMP_MODE
 *
 * @param {boolean} p0
 * @return {void}
 */
declare function SetSrlLongJumpMode(p0: boolean): void;

/**
 * SET_SRL_READAHEAD_TIMES
 *
 * @param {number} p0
 * @param {number} p1
 * @param {number} p2
 * @param {number} p3
 * @return {void}
 */
declare function SetSrlReadaheadTimes(p0: number, p1: number, p2: number, p3: number): void;

/**
 * SET_SRL_TIME
 *
 * @param {number} p0
 * @return {void}
 */
declare function SetSrlTime(p0: number): void;

/**
 * _0x032A14D082A9B269
 * _SET_E* or _SET_F*
 *
 * @param {number} p0
 * @return {void}
 */
declare function N_0x032A14D082A9B269(p0: Hash): void;

/**
 * _0x03DDBF2D73799F9E
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x03DDBF2D73799F9E(p0: any): void;

/**
 * _0x05DD384F39DE1C8C
 *
 * @param {any} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0x05DD384F39DE1C8C(p0: any, p1: any): any;

/**
 * _0x071769BCB24379E5
 *

 * @return {any}
 */
declare function N_0x071769BCB24379E5(): any;

/**
 * _0x07559B29950301FF
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x07559B29950301FF(p0: any, p1: any): void;

/**
 * _0x09FBF15D73EFC900
 *

 * @return {void}
 */
declare function N_0x09FBF15D73EFC900(): void;

/**
 * _0x198B85CC3C7A4593
 *
 * @param {any} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0x198B85CC3C7A4593(p0: any, p1: any): any;

/**
 * _0x27AF48C62B281341
 *

 * @return {any}
 */
declare function N_0x27AF48C62B281341(): any;

/**
 * _0x2A6D1DAAB9EBB262
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0x2A6D1DAAB9EBB262(p0: any): any;

/**
 * _0x2E24C27B112B5B12
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x2E24C27B112B5B12(p0: any): void;

/**
 * _0x2F4D53023F826FF0
 *

 * @return {any}
 */
declare function N_0x2F4D53023F826FF0(): any;

/**
 * _0x5288B7F0690F7C1F
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0x5288B7F0690F7C1F(p0: any): any;

/**
 * _0x53764309C4618087
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0x53764309C4618087(p0: any): any;

/**
 * _0x5D5E2102B174B8D2
 *

 * @return {any}
 */
declare function N_0x5D5E2102B174B8D2(): any;

/**
 * _0x62D5F0588915B277
 *

 * @return {void}
 */
declare function N_0x62D5F0588915B277(): void;

/**
 * _0x66BC28E50E85270E
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0x66BC28E50E85270E(p0: any): any;

/**
 * _0x6A6E79FBE8678C98
 *

 * @return {void}
 */
declare function N_0x6A6E79FBE8678C98(): void;

/**
 * _0x7B8C2B846C05E5AD
 *

 * @return {any}
 */
declare function N_0x7B8C2B846C05E5AD(): any;

/**
 * _0x80B3E0597366ADF1
 *

 * @return {void}
 */
declare function N_0x80B3E0597366ADF1(): void;

/**
 * _0x85B8F04555AB49B8
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0x85B8F04555AB49B8(p0: any): any;

/**
 * _0x8D56BDA343D9519F
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0x8D56BDA343D9519F(p0: any): any;

/**
 * _0x99F92061EFE908BA
 *

 * @return {any}
 */
declare function N_0x99F92061EFE908BA(): any;

/**
 * _0x9F348DE670423460
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x9F348DE670423460(p0: any): void;

/**
 * _0xA0AE7653E8181725
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0xA0AE7653E8181725(p0: any): any;

/**
 * _0xAE00387E53B1E9FC
 *

 * @return {void}
 */
declare function N_0xAE00387E53B1E9FC(): void;

/**
 * _0xAFA87A7D41EE346A
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0xAFA87A7D41EE346A(p0: any): void;

/**
 * _0xB223249B7798EEED
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @param {any} p3
 * @return {any}
 */
declare function N_0xB223249B7798EEED(p0: any, p1: any, p2: any, p3: any): any;

/**
 * _0xB9B9E47EDB9D63DB
 * Sorts some unknown data.
 * 
 * Likely SORT_*
 *

 * @return {void}
 */
declare function N_0xB9B9E47EDB9D63DB(): void;

/**
 * _0xBE8DAA9D8D01DA6A
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {void}
 */
declare function N_0xBE8DAA9D8D01DA6A(p0: any, p1: any, p2: any): void;

/**
 * _0xCC61D8D6C19D9F14
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0xCC61D8D6C19D9F14(p0: any): void;

/**
 * _0xD6E39DC5D46DF4AB
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0xD6E39DC5D46DF4AB(p0: any): any;

/**
 * _0xD840C130D7AACFA5
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {void}
 */
declare function N_0xD840C130D7AACFA5(p0: any, p1: any, p2: any): void;

/**
 * _0xD9F2FF4AF394D926
 *

 * @return {void}
 */
declare function N_0xD9F2FF4AF394D926(): void;

/**
 * _0xDA7FDEFF4DE86839
 *

 * @return {any}
 */
declare function N_0xDA7FDEFF4DE86839(): any;

/**
 * _0xDABFE48BA0D457AA
 *

 * @return {any}
 */
declare function N_0xDABFE48BA0D457AA(): any;

/**
 * _0xDEEE1F265B7ECEF5
 *

 * @return {void}
 */
declare function N_0xDEEE1F265B7ECEF5(): void;

/**
 * _0xE5B76E5B56CD77DD
 *

 * @return {any}
 */
declare function N_0xE5B76E5B56CD77DD(): any;

/**
 * _0xEF1A8A484118735E
 *

 * @return {void}
 */
declare function N_0xEF1A8A484118735E(): void;

/**
 * _0xF01D21DF39554115
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0xF01D21DF39554115(p0: any): void;

/**
 * _0xF11D7CB962FCD747
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0xF11D7CB962FCD747(p0: any): void;

/**
 * _GET_IPL_BOUNDING_SPHERE
 * Outputs IPL position and radius (previously wrongly named heading)
 * https://github.com/femga/rdr3_discoveries/blob/master/imaps/imaps_with_coords_and_heading.lua
 *
 * @param {number} iplHash
 * @return {[boolean, Vector3, number]}
 */
declare function GetIplBoundingSphere(iplHash: Hash): [boolean, Vector3, number];

/**
 * _HAS_COLLISION_LOADED_AT_COORD
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {boolean}
 */
declare function HasCollisionLoadedAtCoord(x: number, y: number, z: number): boolean;

/**
 * _HAS_SCENARIO_TYPE_LOADED
 *
 * @param {number} scenarioType
 * @param {boolean} p1
 * @return {boolean}
 */
declare function HasScenarioTypeLoaded(scenarioType: Hash, p1: boolean): boolean;

/**
 * _IS_MODEL_AN_OBJECT
 *
 * @param {number} model
 * @return {boolean}
 */
declare function IsModelAnObject(model: Hash): boolean;

/**
 * _IS_POSITION_INSIDE_IPL_STREAMING_EXTENTS
 * Returns true if IPL is streamed in (?)
 *
 * @param {number} iplHash
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {boolean}
 */
declare function IsPositionInsideIplStreamingExtents(iplHash: Hash, x: number, y: number, z: number): boolean;

/**
 * _REMOVE_SCENARIO_ASSET
 *
 * @param {number} scenarioType
 * @return {any}
 */
declare function RemoveScenarioAsset(scenarioType: Hash): any;

/**
 * _REQUEST_CLIP_SET_BY_HASH
 *
 * @param {number} clipSetHash
 * @return {void}
 */
declare function RequestClipSetByHash(clipSetHash: Hash): void;

/**
 * _REQUEST_METADATA_AT_COORD
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {void}
 */
declare function RequestMetadataAtCoord(x: number, y: number, z: number): void;

/**
 * _REQUEST_SCENARIO_TYPE
 *
 * @param {number} scenarioType
 * @param {number} p1
 * @param {any} p2
 * @param {any} p3
 * @return {number}
 */
declare function RequestScenarioType(scenarioType: Hash, p1: number, p2: any, p3: any): number;

/**
 * _SET_GUARMA_WORLDHORIZON_ACTIVE
 *
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetGuarmaWorldhorizonActive(toggle: boolean): void;