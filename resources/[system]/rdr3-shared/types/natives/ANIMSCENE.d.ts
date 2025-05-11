/**
   * ABORT_ANIM_SCENE
   *
   * @param {number} animScene
   * @param {boolean} p1
   * @return {void}
   */
declare function AbortAnimScene(animScene: AnimScene, p1: boolean): void;

/**
   * ATTACH_ANIM_SCENE_TO_ENTITY
   *
   * @param {number} animScene
   * @param {number} entity
   * @param {number} p2
   * @return {void}
   */
declare function AttachAnimSceneToEntity(animScene: AnimScene, entity: Entity, p2: number): void;

/**
   * ATTACH_ANIM_SCENE_TO_ENTITY_PRESERVING_LOCATION
   *
   * @param {number} animScene
   * @param {number} entity
   * @param {number} p2
   * @return {void}
   */
declare function AttachAnimSceneToEntityPreservingLocation(animScene: AnimScene, entity: Entity, p2: number): void;

/**
   * BLOCK_ANIM_SCENE_FADING_NEXT_FRAME
   *
   * @param {boolean} p0
   * @param {boolean} p1
   * @return {void}
   */
declare function BlockAnimSceneFadingNextFrame(p0: boolean, p1: boolean): void;

/**
   * CHECK_OWNERSHIP_OF_ANIM_SCENE
   *
   * @param {number} animScene
   * @return {boolean}
   */
declare function CheckOwnershipOfAnimScene(animScene: AnimScene): boolean;

/**
   * COULD_ANIM_SCENE_ENTITY_REACH_EXIT_NEXT_FRAME
   *
   * @param {number} animScene
   * @param {string | number} entityName
   * @param {any} p2
   * @param {any} p3
   * @return {boolean}
   */
declare function CouldAnimSceneEntityReachExitNextFrame(animScene: AnimScene, entityName: string | number, p2: any, p3: any): boolean;

/**
   * DETACH_ANIM_SCENE
   *
   * @param {number} animScene
   * @return {void}
   */
declare function DetachAnimScene(animScene: AnimScene): void;

/**
   * DETACH_ANIM_SCENE_PRESERVING_LOCATION
   *
   * @param {number} animScene
   * @return {void}
   */
declare function DetachAnimScenePreservingLocation(animScene: AnimScene): void;

/**
   * DOES_ANIM_SCENE_EXIST
   *
   * @param {number} animScene
   * @return {boolean}
   */
declare function DoesAnimSceneExist(animScene: AnimScene): boolean;

/**
   * FADE_ANIM_SCENE_AUDIO_IN
   *
   * @param {number} animScene
   * @param {number} p1
   * @return {void}
   */
declare function FadeAnimSceneAudioIn(animScene: AnimScene, p1: number): void;

/**
   * FADE_ANIM_SCENE_AUDIO_OUT
   *
   * @param {number} animScene
   * @param {number} p1
   * @return {void}
   */
declare function FadeAnimSceneAudioOut(animScene: AnimScene, p1: number): void;

/**
   * GET_ANIM_SCENE_BOOL
   *
   * @param {number} animScene
   * @param {string | number} name
   * @return {boolean}
   */
declare function GetAnimSceneBool(animScene: AnimScene, name: string | number): boolean;

/**
   * GET_ANIM_SCENE_CURRENT_ACTIVE_CAMERA_COUNT
   *
   * @param {number} animScene
   * @return {number}
   */
declare function GetAnimSceneCurrentActiveCameraCount(animScene: AnimScene): number;

/**
   * GET_ANIM_SCENE_ENTITY_LOCATION_DATA
   *
   * @param {number} animScene
   * @param {string | number} entityName
   * @param {boolean} p3
   * @param {string | number} playbackListName
   * @param {number} p5
   * @return {[boolean, Vector3]}
   */
declare function GetAnimSceneEntityLocationData(animScene: AnimScene, entityName: string | number, p3: boolean, playbackListName: string | number, p5: number): [boolean, Vector3];

/**
   * GET_ANIM_SCENE_FLOAT
   *
   * @param {number} animScene
   * @param {string | number} name
   * @return {number}
   */
declare function GetAnimSceneFloat(animScene: AnimScene, name: string | number): number;

/**
   * GET_ANIM_SCENE_INT
   *
   * @param {number} animScene
   * @param {string | number} name
   * @return {number}
   */
declare function GetAnimSceneInt(animScene: AnimScene, name: string | number): number;

/**
   * GET_ANIM_SCENE_ORIGIN
   *
   * @param {number} animScene
   * @param {number} order
   * @return {[Vector3, Vector3]}
   */
declare function GetAnimSceneOrigin(animScene: AnimScene, order: number): [Vector3, Vector3];

/**
   * GET_ANIM_SCENE_PHASE
   *
   * @param {number} animScene
   * @return {number}
   */
declare function GetAnimScenePhase(animScene: AnimScene): number;

/**
   * HAS_ANIM_SCENE_EXITED
   *
   * @param {number} animScene
   * @param {boolean} p1
   * @return {boolean}
   */
declare function HasAnimSceneExited(animScene: AnimScene, p1: boolean): boolean;

/**
   * HAS_ENTITY_EXITED_ANIM_SCENE
   *
   * @param {number} animScene
   * @param {string | number} entityName
   * @return {boolean}
   */
declare function HasEntityExitedAnimScene(animScene: AnimScene, entityName: string | number): boolean;

/**
   * IS_ANIM_SCENE_EXITING_THIS_FRAME
   *
   * @param {number} animScene
   * @return {boolean}
   */
declare function IsAnimSceneExitingThisFrame(animScene: AnimScene): boolean;

/**
   * IS_ANIM_SCENE_FINISHED
   *
   * @param {number} animScene
   * @param {boolean} p1
   * @return {boolean}
   */
declare function IsAnimSceneFinished(animScene: AnimScene, p1: boolean): boolean;

/**
   * IS_ANIM_SCENE_IN_SECTION
   *
   * @param {number} animScene
   * @param {string | number} sectionName
   * @param {boolean} p2
   * @return {boolean}
   */
declare function IsAnimSceneInSection(animScene: AnimScene, sectionName: string | number, p2: boolean): boolean;

/**
   * IS_ANIM_SCENE_LOADED
   *
   * @param {number} animScene
   * @param {boolean} p1
   * @param {boolean} p2
   * @return {boolean}
   */
declare function IsAnimSceneLoaded(animScene: AnimScene, p1: boolean, p2: boolean): boolean;

/**
   * IS_ANIM_SCENE_METADATA_LOADED
   *
   * @param {number} animScene
   * @param {boolean} p1
   * @return {boolean}
   */
declare function IsAnimSceneMetadataLoaded(animScene: AnimScene, p1: boolean): boolean;

/**
   * IS_ANIM_SCENE_RUNNING
   *
   * @param {number} animScene
   * @param {boolean} p1
   * @return {boolean}
   */
declare function IsAnimSceneRunning(animScene: AnimScene, p1: boolean): boolean;

/**
   * IS_ENTITY_EXITING_ANIM_SCENE_THIS_FRAME
   *
   * @param {number} animScene
   * @param {string | number} entityName
   * @return {boolean}
   */
declare function IsEntityExitingAnimSceneThisFrame(animScene: AnimScene, entityName: string | number): boolean;

/**
   * IS_ENTITY_PLAYING_ANIM_SCENE
   *
   * @param {number} entity
   * @param {number} animScene
   * @return {boolean}
   */
declare function IsEntityPlayingAnimScene(entity: Entity, animScene: AnimScene): boolean;

/**
   * LOAD_ANIM_SCENE
   *
   * @param {number} animScene
   * @return {void}
   */
declare function LoadAnimScene(animScene: AnimScene): void;

/**
   * REMOVE_ANIM_SCENE_ENTITY
   *
   * @param {number} animScene
   * @param {string | number} entityName
   * @param {number} entity
   * @return {void}
   */
declare function RemoveAnimSceneEntity(animScene: AnimScene, entityName: string | number, entity: Entity): void;

/**
   * REQUEST_ANIM_SCENE_PLAY_LIST
   *
   * @param {number} animScene
   * @param {string | number} playlistName
   * @return {boolean}
   */
declare function RequestAnimScenePlayList(animScene: AnimScene, playlistName: string | number): boolean;

/**
   * RESET_ANIM_SCENE
   *
   * @param {number} animScene
   * @param {string | number} playbackListName
   * @return {void}
   */
declare function ResetAnimScene(animScene: AnimScene, playbackListName: string | number): void;

/**
   * RESUME_ANIM_SCENE_FROM_LAST_CHECKPOINT
   *
   * @param {number} animScene
   * @return {void}
   */
declare function ResumeAnimSceneFromLastCheckpoint(animScene: AnimScene): void;

/**
   * SET_ANIM_SCENE_BOOL
   *
   * @param {number} animScene
   * @param {string | number} name
   * @param {boolean} value
   * @param {boolean} p3
   * @return {void}
   */
declare function SetAnimSceneBool(animScene: AnimScene, name: string | number, value: boolean, p3: boolean): void;

/**
   * SET_ANIM_SCENE_ENTITY
   *
   * @param {number} animScene
   * @param {string | number} entityName
   * @param {number} entity
   * @param {number} flags
   * @return {void}
   */
declare function SetAnimSceneEntity(animScene: AnimScene, entityName: string | number, entity: Entity, flags: number): void;

/**
   * SET_ANIM_SCENE_FLOAT
   *
   * @param {number} animScene
   * @param {string | number} name
   * @param {number} value
   * @param {boolean} p3
   * @param {boolean} p4
   * @return {void}
   */
declare function SetAnimSceneFloat(animScene: AnimScene, name: string | number, value: number, p3: boolean, p4: boolean): void;

/**
   * SET_ANIM_SCENE_INT
   *
   * @param {number} animScene
   * @param {string | number} name
   * @param {number} value
   * @param {boolean} p3
   * @return {void}
   */
declare function SetAnimSceneInt(animScene: AnimScene, name: string | number, value: number, p3: boolean): void;

/**
   * SET_ANIM_SCENE_ORIGIN
   *
   * @param {number} animScene
   * @param {number} posX
   * @param {number} posY
   * @param {number} posZ
   * @param {number} rotX
   * @param {number} rotY
   * @param {number} rotZ
   * @param {number} order
   * @return {void}
   */
declare function SetAnimSceneOrigin(animScene: AnimScene, posX: number, posY: number, posZ: number, rotX: number, rotY: number, rotZ: number, order: number): void;

/**
   * SET_ANIM_SCENE_PAUSED
   *
   * @param {number} animScene
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetAnimScenePaused(animScene: AnimScene, toggle: boolean): void;

/**
   * SET_ANIM_SCENE_PLAYBACK_LIST
   *
   * @param {number} animScene
   * @param {string | number} playbackListName
   * @return {void}
   */
declare function SetAnimScenePlaybackList(animScene: AnimScene, playbackListName: string | number): void;

/**
   * SET_ANIM_SCENE_PLAY_LIST
   *
   * @param {number} animScene
   * @param {string | number} playlistName
   * @param {boolean} p2
   * @return {void}
   */
declare function SetAnimScenePlayList(animScene: AnimScene, playlistName: string | number, p2: boolean): void;

/**
   * SET_ANIM_SCENE_RATE
   *
   * @param {number} animScene
   * @param {number} rate
   * @return {void}
   */
declare function SetAnimSceneRate(animScene: AnimScene, rate: number): void;

/**
   * START_ANIM_SCENE
   *
   * @param {number} animScene
   * @return {void}
   */
declare function StartAnimScene(animScene: AnimScene): void;

/**
   * TAKE_OWNERSHIP_OF_ANIM_SCENE
   *
   * @param {number} animScene
   * @return {void}
   */
declare function TakeOwnershipOfAnimScene(animScene: AnimScene): void;

/**
   * TRIGGER_ANIM_SCENE_SKIP
   *
   * @param {number} animScene
   * @return {void}
   */
declare function TriggerAnimSceneSkip(animScene: AnimScene): void;

/**
   * WAS_ANIM_SCENE_SKIPPED
   *
   * @param {number} animScene
   * @return {boolean}
   */
declare function WasAnimSceneSkipped(animScene: AnimScene): boolean;

/**
   * _0x1407F5115FB9583E
   * Used in SP R* Scripts only
   * Params: p1 = 2B-LowHonor, 2A-HighHonor
   *
   * @param {number} animScene
   * @param {string | number} p1
   * @return {boolean}
   */
declare function N_0x1407F5115FB9583E(animScene: AnimScene, p1: string | number): boolean;

/**
   * _0x1AD896BF43619551
   * Used in braithwaites2 SP R* Scripts only
   * _A*
   *
  
   * @return {void}
   */
declare function N_0x1AD896BF43619551(): void;

/**
   * _0x1C5D33A4293E6DDE
   * Used in SP R* Scripts only
   * _IS_ANIM_SCENE_P*
   *
   * @param {number} animScene
   * @param {string | number} phaseName
   * @return {boolean}
   */
declare function N_0x1C5D33A4293E6DDE(animScene: AnimScene, phaseName: string | number): boolean;

/**
   * _0x2DB524750DC41ED4
   * Used in SP R* Scripts only
   * _IS_PED_* - _IS_SC*
   *
  
   * @return {boolean}
   */
declare function N_0x2DB524750DC41ED4(): boolean;

/**
   * _0x3641FCD53E59B335
   * p2: MINIGAME_GET_SECONDARY_VOICE_STRING
   * _SET_*
   *
   * @param {number} mgmHandle
   * @param {number} ped
   * @param {string | number} secondaryVoiceString
   * @return {void}
   */
declare function N_0x3641FCD53E59B335(mgmHandle: number, ped: Ped, secondaryVoiceString: string | number): void;

/**
   * _0x3B393716C3FD8237
   * Used in SP R* Scripts only
   * _IS_*
   *
   * @param {number} ped
   * @return {boolean}
   */
declare function N_0x3B393716C3FD8237(ped: Ped): boolean;

/**
   * _0x4B85B3CF91972222
   * Used in Script Function CUTSCENE_MANAGE_SKIP
   * _CHECK_* (?)
   *
   * @param {number} animScene
   * @return {boolean}
   */
declare function N_0x4B85B3CF91972222(animScene: AnimScene): boolean;

/**
   * _0x5D7BFDA2290B4E39
   * Used in SP R* Scripts only
   * _IS_ANIM_SCENE_R* - _IS_ANIM_SCENE_S*
   *
   * @param {string | number} p0
   * @return {boolean}
   */
declare function N_0x5D7BFDA2290B4E39(p0: string | number): boolean;

/**
   * _0x61B2AAEF645DDAF0
   * Only used in tg_p R* Script
   * Returns true when mgm event success
   * _PREPARE_* - _REGISTER_*
   *
   * @param {number} mgmEventHandle
   * @param {string | number} p1
   * @param {number} seatId
   * @param {number} p3
   * @param {boolean} p4
   * @return {boolean}
   */
declare function N_0x61B2AAEF645DDAF0(mgmEventHandle: number, p1: string | number, seatId: number, p3: number, p4: boolean): boolean;

/**
   * _0x73616E64696C132E
   * Used in SP R* Scripts only
   * _CO* - _CR*
   *
   * @param {number} animScene
   * @param {boolean} p1
   * @return {boolean}
   */
declare function N_0x73616E64696C132E(animScene: AnimScene, p1: boolean): boolean;

/**
   * _0x9AAE3C1148A09BCA
   * Used in SP R* Scripts only
   * _IS_ANIM_SCENE_*
   *
   * @param {number} animScene
   * @return {boolean}
   */
declare function N_0x9AAE3C1148A09BCA(animScene: AnimScene): boolean;

/**
   * _0xA96619FE85159ED2
   * Used in SP R* Scripts only
   * _WAS_ANIM_SCENE_*
   *
   * @param {number} animScene
   * @return {boolean}
   */
declare function N_0xA96619FE85159ED2(animScene: AnimScene): boolean;

/**
   * _0xAE6DE22DE0ED4554
   * _UNLOAD_* - _WAS_ANIM_SCENE_*
   *
   * @param {number} mgmHandle
   * @param {number} ped
   * @return {void}
   */
declare function N_0xAE6DE22DE0ED4554(mgmHandle: number, ped: Ped): void;

/**
   * _0xB1A196BAFE650402
   * _PREPARE_* - _REGISTER_*
   *
   * @param {number} mgmHandle
   * @param {number} ped
   * @return {void}
   */
declare function N_0xB1A196BAFE650402(mgmHandle: number, ped: Ped): void;

/**
   * _0xC1193521E3B9FADD
   * Used in SP R* Scripts only
   * _RESUME_* - _SET_A*
   *
   * @param {number} entity
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0xC1193521E3B9FADD(entity: Entity, p1: boolean): void;

/**
   * _0xCDCD7B2D49AEE73A
   * Used in SP R* Scripts only
   * _SET_P*
   *
   * @param {boolean} p0
   * @return {void}
   */
declare function N_0xCDCD7B2D49AEE73A(p0: boolean): void;

/**
   * _0xD70C7A30412F8FA0
   * Used in SP R* Scripts only
   * _IS_ANIM_SCENE_*
   *
   * @param {number} animScene
   * @return {boolean}
   */
declare function N_0xD70C7A30412F8FA0(animScene: AnimScene): boolean;

/**
   * _0xE12D7B4B959644CD
   * Used in SP R* Scripts only
   * _SET_B* - _SET_C*
   *
  
   * @return {void}
   */
declare function N_0xE12D7B4B959644CD(): void;

/**
   * _0xEA41D44A8D42057B
   * Used in SP R* Scripts only
   * _PAUSE_* - _PLAY_*
   *
  
   * @return {boolean}
   */
declare function N_0xEA41D44A8D42057B(): boolean;

/**
   * _CLEAR_ANIM_SCENE_WAS_SKIPPED
   *
   * @param {number} animScene
   * @return {void}
   */
declare function ClearAnimSceneWasSkipped(animScene: AnimScene): void;

/**
   * _CLEAR_BREAKOUT_ARCHETYPE
   *
   * @param {number} ped
   * @return {void}
   */
declare function ClearBreakoutArchetype(ped: Ped): void;

/**
   * _CREATE_ANIM_SCENE
   * flags: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/eAnimSceneFlag
   *
   * @param {string | number} animDict
   * @param {number} flags
   * @param {string | number} playbackListName
   * @param {boolean} p3
   * @param {boolean} p4
   * @return {number}
   */
declare function CreateAnimScene(animDict: string | number, flags: number, playbackListName: string | number, p3: boolean, p4: boolean): AnimScene;

/**
   * _CREATE_MGM_SYSTEM
   * Returns mgmHandle
   *
   * @param {string | number} mgmFilename
   * @return {number}
   */
declare function CreateMgmSystem(mgmFilename: string | number): number;

/**
   * _DELETE_ANIM_SCENE
   *
   * @param {number} animScene
   * @return {void}
   */
declare function DeleteAnimScene(animScene: AnimScene): void;

/**
   * _DELETE_MGM_SYSTEM
   *
   * @param {number} mgmHandle
   * @return {void}
   */
declare function DeleteMgmSystem(mgmHandle: number): void;

/**
   * _DOES_ANIM_SCENE_OWNERSHIP_OF_ENTITY_EXIST
   *
   * @param {number} animScene
   * @param {string | number} entityName
   * @return {boolean}
   */
declare function DoesAnimSceneOwnershipOfEntityExist(animScene: AnimScene, entityName: string | number): boolean;

/**
   * _DOES_ANIM_SCENE_PLAY_LIST_EXIST
   *
   * @param {number} animScene
   * @param {string | number} playbackListName
   * @return {boolean}
   */
declare function DoesAnimScenePlayListExist(animScene: AnimScene, playbackListName: string | number): boolean;

/**
   * _DOES_ENTITY_WITH_ID_EXIST_IN_ANIM_SCENE
   *
   * @param {number} animScene
   * @param {string | number} entityId
   * @return {boolean}
   */
declare function DoesEntityWithIdExistInAnimScene(animScene: AnimScene, entityId: string | number): boolean;

/**
   * _GET_ANIM_SCENE_DICT
   *
   * @param {number} animScene
   * @return {number}
   */
declare function GetAnimSceneDict(animScene: AnimScene): number;

/**
   * _GET_ANIM_SCENE_DURATION
   *
   * @param {number} animScene
   * @return {number}
   */
declare function GetAnimSceneDuration(animScene: AnimScene): number;

/**
   * _GET_ANIM_SCENE_OBJECT
   *
   * @param {number} animScene
   * @param {string | number} name
   * @param {boolean} isNetwork
   * @return {number}
   */
declare function GetAnimSceneObject(animScene: AnimScene, name: string | number, isNetwork: boolean): number;

/**
   * _GET_ANIM_SCENE_PED
   *
   * @param {number} animScene
   * @param {string | number} name
   * @param {boolean} isNetwork
   * @return {number}
   */
declare function GetAnimScenePed(animScene: AnimScene, name: string | number, isNetwork: boolean): Ped;

/**
   * _GET_ANIM_SCENE_PLAYBACK_LIST_PHASE_AUDIO_LOAD_STRESS
   *
   * @param {number} animScene
   * @param {string | number} phaseName
   * @return {number}
   */
declare function GetAnimScenePlaybackListPhaseAudioLoadStress(animScene: AnimScene, phaseName: string | number): number;

/**
   * _GET_ANIM_SCENE_RATE
   *
   * @param {number} animScene
   * @return {number}
   */
declare function GetAnimSceneRate(animScene: AnimScene): number;

/**
   * _GET_ANIM_SCENE_TIME
   *
   * @param {number} animScene
   * @return {number}
   */
declare function GetAnimSceneTime(animScene: AnimScene): number;

/**
   * _GET_ANIM_SCENE_VEHICLE
   *
   * @param {number} animScene
   * @param {string | number} name
   * @param {boolean} isNetwork
   * @return {number}
   */
declare function GetAnimSceneVehicle(animScene: AnimScene, name: string | number, isNetwork: boolean): Vehicle;

/**
   * _HAS_ENTITY_ENTERED_ANIM_SCENE
   * _HAS_L* (?)
   *
   * @param {number} animScene
   * @param {string | number} entityName
   * @return {boolean}
   */
declare function HasEntityEnteredAnimScene(animScene: AnimScene, entityName: string | number): boolean;

/**
   * _IS_ANIM_SCENE_ABORTED
   *
   * @param {number} animScene
   * @return {boolean}
   */
declare function IsAnimSceneAborted(animScene: AnimScene): boolean;

/**
   * _IS_ANIM_SCENE_LOADING
   *
   * @param {number} animScene
   * @param {boolean} p1
   * @return {boolean}
   */
declare function IsAnimSceneLoading(animScene: AnimScene, p1: boolean): boolean;

/**
   * _IS_ANIM_SCENE_METADATA_ASSET_IN_RANGE_LOADING
   *
   * @param {number} animScene
   * @param {boolean} p1
   * @return {boolean}
   */
declare function IsAnimSceneMetadataAssetInRangeLoading(animScene: AnimScene, p1: boolean): boolean;

/**
   * _IS_ANIM_SCENE_PAUSED
   *
   * @param {number} animScene
   * @return {boolean}
   */
declare function IsAnimScenePaused(animScene: AnimScene): boolean;

/**
   * _IS_ANIM_SCENE_PLAYBACK_LIST_PHASE_ACTIVE
   *
   * @param {number} animScene
   * @param {string | number} phaseName
   * @return {boolean}
   */
declare function IsAnimScenePlaybackListPhaseActive(animScene: AnimScene, phaseName: string | number): boolean;

/**
   * _IS_ANIM_SCENE_PLAYBACK_LIST_PHASE_LOADED
   *
   * @param {number} animScene
   * @param {string | number} phaseName
   * @return {boolean}
   */
declare function IsAnimScenePlaybackListPhaseLoaded(animScene: AnimScene, phaseName: string | number): boolean;

/**
   * _IS_ANIM_SCENE_PLAYBACK_LIST_PHASE_LOADING
   *
   * @param {number} animScene
   * @param {string | number} phaseName
   * @return {boolean}
   */
declare function IsAnimScenePlaybackListPhaseLoading(animScene: AnimScene, phaseName: string | number): boolean;

/**
   * _IS_ANIM_SCENE_SKIPPABLE
   *
   * @param {number} animScene
   * @return {boolean}
   */
declare function IsAnimSceneSkippable(animScene: AnimScene): boolean;

/**
   * _IS_MGM_SYSTEM_LOADED
   * MGM stands for MiniGameMoments.
   *
   * @param {string | number} mgmFilename
   * @return {boolean}
   */
declare function IsMgmSystemLoaded(mgmFilename: string | number): boolean;

/**
   * _LOAD_MGM_ASSETS
   * Used to request MiniGameMoments Assets.
   * 
   * mgmFilename's:
   * Poker
   * PokerArthur
   * PokerArthurCamp
   * PokerJohn
   * PokerJohnCamp
   *
   * @param {string | number} mgmFilename
   * @return {boolean}
   */
declare function LoadMgmAssets(mgmFilename: string | number): boolean;

/**
   * _PAUSE_SCRIPT_THREADS
   * Pauses all script threads except the one that called it.
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function PauseScriptThreads(toggle: boolean): void;

/**
   * _RELEASE_ANIM_SCENE_PLAY_LIST
   *
   * @param {number} animScene
   * @param {string | number} playlistName
   * @return {boolean}
   */
declare function ReleaseAnimScenePlayList(animScene: AnimScene, playlistName: string | number): boolean;

/**
   * _REQUEST_PHOTO_MODE_DEFREEZE
   *
  
   * @return {void}
   */
declare function RequestPhotoModeDefreeze(): void;

/**
   * _REQUEST_PHOTO_MODE_FREEZE
   *
  
   * @return {void}
   */
declare function RequestPhotoModeFreeze(): void;

/**
   * _SET_BREAKOUT_ARCHETYPE
   *
   * @param {number} ped
   * @param {string | number} archetype
   * @return {void}
   */
declare function SetBreakoutArchetype(ped: Ped, archetype: string | number): void;

/**
   * _SET_MGM_EVENT
   *
   * @param {number} mgmEventHandle
   * @param {string | number} p1
   * @param {any} seatId
   * @param {number} p3
   * @param {number} p4
   * @return {void}
   */
declare function SetMgmEvent(mgmEventHandle: number, p1: string | number, seatId: any, p3: number, p4: number): void;