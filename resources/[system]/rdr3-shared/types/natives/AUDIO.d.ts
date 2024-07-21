/**
 * ADD_ENTITY_TO_AUDIO_MIX_GROUP
 *
 * @param {number} entity
 * @param {string | number} groupName
 * @param {number} p2
 * @return {void}
 */
declare function AddEntityToAudioMixGroup(entity: Entity, groupName: string | number, p2: number): void;

/**
 * ADD_PED_TO_CONVERSATION
 *
 * @param {string | number} convoRoot
 * @param {number} ped
 * @param {string | number} characterName
 * @return {void}
 */
declare function AddPedToConversation(convoRoot: string | number, ped: Ped, characterName: string | number): void;

/**
 * AUDIO_IS_MUSIC_PLAYING
 * Old name: AUDIO_IS_SCRIPTED_MUSIC_PLAYING
 *

 * @return {boolean}
 */
declare function AudioIsMusicPlaying(): boolean;

/**
 * AUDIO_TRIGGER_EXPLOSION
 *
 * @param {string | number} name
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {void}
 */
declare function AudioTriggerExplosion(name: string | number, x: number, y: number, z: number): void;

/**
 * CANCEL_MUSIC_EVENT
 *
 * @param {string | number} eventName
 * @return {boolean}
 */
declare function CancelMusicEvent(eventName: string | number): boolean;

/**
 * CLEAR_AMBIENT_ZONE_LIST_STATE
 *
 * @param {string | number} ambientZone
 * @param {boolean} p1
 * @return {void}
 */
declare function ClearAmbientZoneListState(ambientZone: string | number, p1: boolean): void;

/**
 * CLEAR_AMBIENT_ZONE_STATE
 *
 * @param {string | number} zoneName
 * @param {boolean} p1
 * @return {void}
 */
declare function ClearAmbientZoneState(zoneName: string | number, p1: boolean): void;

/**
 * CLEAR_CONVERSATION_HISTORY
 *

 * @return {void}
 */
declare function ClearConversationHistory(): void;

/**
 * CREATE_NEW_SCRIPTED_CONVERSATION
 *
 * @param {string | number} convoRoot
 * @return {boolean}
 */
declare function CreateNewScriptedConversation(convoRoot: string | number): boolean;

/**
 * DISABLE_PED_PAIN_AUDIO
 *
 * @param {number} ped
 * @param {boolean} toggle
 * @return {void}
 */
declare function DisablePedPainAudio(ped: Ped, toggle: boolean): void;

/**
 * DOES_CONTEXT_EXIST_FOR_THIS_PED
 * Checks if the ped can play the speech or has the speech file, last parameter is usually false.
 *
 * @param {number} ped
 * @param {string | number} speechName
 * @param {boolean} unk
 * @return {boolean}
 */
declare function DoesContextExistForThisPed(ped: Ped, speechName: string | number, unk: boolean): boolean;

/**
 * FORCE_PED_PANIC_WALLA
 *

 * @return {void}
 */
declare function ForcePedPanicWalla(): void;

/**
 * FORCE_USE_AUDIO_GAME_OBJECT
 * Old name: _FORCE_VEHICLE_ENGINE_AUDIO
 *
 * @param {number} vehicle
 * @param {string | number} audioName
 * @return {void}
 */
declare function ForceUseAudioGameObject(vehicle: Vehicle, audioName: string | number): void;

/**
 * GET_CURRENT_SCRIPTED_CONVERSATION_LINE
 *
 * @param {string | number} p0
 * @return {number}
 */
declare function GetCurrentScriptedConversationLine(p0: string | number): number;

/**
 * GET_MUSIC_PLAYTIME
 *

 * @return {number}
 */
declare function GetMusicPlaytime(): number;

/**
 * GET_SOUND_ID
 *

 * @return {number}
 */
declare function GetSoundId(): number;

/**
 * IS_AMBIENT_SPEECH_DISABLED
 *
 * @param {number} ped
 * @return {boolean}
 */
declare function IsAmbientSpeechDisabled(ped: Ped): boolean;

/**
 * IS_AMBIENT_SPEECH_PLAYING
 *
 * @param {number} ped
 * @return {boolean}
 */
declare function IsAmbientSpeechPlaying(ped: Ped): boolean;

/**
 * IS_ANIMAL_VOCALIZATION_PLAYING
 *
 * @param {number} pedHandle
 * @return {boolean}
 */
declare function IsAnimalVocalizationPlaying(pedHandle: Ped): boolean;

/**
 * IS_ANY_SPEECH_PLAYING
 *
 * @param {number} ped
 * @return {boolean}
 */
declare function IsAnySpeechPlaying(ped: Ped): boolean;

/**
 * IS_AUDIO_SCENE_ACTIVE
 *
 * @param {string | number} scene
 * @return {boolean}
 */
declare function IsAudioSceneActive(scene: string | number): boolean;

/**
 * IS_HORN_ACTIVE
 * Checks whether the horn of a vehicle is currently played.
 *
 * @param {number} vehicle
 * @return {boolean}
 */
declare function IsHornActive(vehicle: Vehicle): boolean;

/**
 * IS_PED_IN_CURRENT_CONVERSATION
 *
 * @param {string | number} p0
 * @param {number} ped
 * @param {any} p2
 * @return {boolean}
 */
declare function IsPedInCurrentConversation(p0: string | number, ped: Ped, p2: any): boolean;

/**
 * IS_SCRIPTED_CONVERSATION_LOADED
 *
 * @param {string | number} convoRoot
 * @return {boolean}
 */
declare function IsScriptedConversationLoaded(convoRoot: string | number): boolean;

/**
 * IS_SCRIPTED_CONVERSATION_PLAYING
 *
 * @param {string | number} p0
 * @return {boolean}
 */
declare function IsScriptedConversationPlaying(p0: string | number): boolean;

/**
 * IS_SCRIPTED_SPEECH_PLAYING
 *
 * @param {any} p0
 * @return {boolean}
 */
declare function IsScriptedSpeechPlaying(p0: any): boolean;

/**
 * IS_STREAM_PLAYING
 *
 * @param {number} streamId
 * @return {boolean}
 */
declare function IsStreamPlaying(streamId: number): boolean;

/**
 * LOAD_STREAM
 *
 * @param {string | number} streamName
 * @param {string | number} soundSet
 * @return {boolean}
 */
declare function LoadStream(streamName: string | number, soundSet: string | number): boolean;

/**
 * PAUSE_SCRIPTED_CONVERSATION
 *
 * @param {string | number} p0
 * @param {boolean} p1
 * @param {boolean} p2
 * @param {boolean} p3
 * @param {boolean} p4
 * @return {void}
 */
declare function PauseScriptedConversation(p0: string | number, p1: boolean, p2: boolean, p3: boolean, p4: boolean): void;

/**
 * PLAY_AMBIENT_SPEECH_FROM_POSITION_NATIVE
 * Old name: _PLAY_AMBIENT_SPEECH_AT_COORDS
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {DataView} params
 * @return {boolean}
 */
declare function PlayAmbientSpeechFromPositionNative(x: number, y: number, z: number, params: DataView): boolean;

/**
 * PLAY_ANIMAL_VOCALIZATION
 *
 * @param {number} ped
 * @param {string | number} vocalizationName
 * @param {boolean} p2
 * @return {void}
 */
declare function PlayAnimalVocalization(ped: Ped, vocalizationName: string | number, p2: boolean): void;

/**
 * PLAY_END_CREDITS_MUSIC
 *
 * @param {boolean} play
 * @return {void}
 */
declare function PlayEndCreditsMusic(play: boolean): void;

/**
 * PLAY_PAIN
 * Valid pain IDs: 0..12
 *
 * @param {number} ped
 * @param {number} painId
 * @param {number} p2
 * @param {boolean} p3
 * @param {boolean} isNetwork
 * @return {void}
 */
declare function PlayPain(ped: Ped, painId: number, p2: number, p3: boolean, isNetwork: boolean): void;

/**
 * PLAY_PED_AMBIENT_SPEECH_NATIVE
 * struct ScriptedSpeechParams
 * {
 *   const char* speechName;
 *   const char* voiceName;
 *   alignas(8) int variation;
 *   alignas(8) Hash speechParamHash;
 *   alignas(8) Ped listenerPed;
 *   alignas(8) BOOL syncOverNetwork;
 *   alignas(8) int v7;
 *   alignas(8) int v8;
 * };
 * 
 * static_assert(sizeof(ScriptedSpeechParams) == 0x40, "incorrect ScriptedSpeechParams size");
 * 
 * 
 * Example:
 * 
 * ScriptedSpeechParams params{"RE_PH_RHD_V3_AGGRO", "0405_U_M_M_RhdSheriff_01", 1, joaat("SPEECH_PARAMS_BEAT_SHOUTED_CLEAR"), 0, true, 1, 1};
 * PLAY_PED_AMBIENT_SPEECH_NATIVE(PLAYER_PED_ID(), (Any*)&params);
 * 
 * Old name: _PLAY_AMBIENT_SPEECH1
 * https://github.com/femga/rdr3_discoveries/tree/master/audio/audio_banks
 *
 * @param {number} speaker
 * @param {DataView} params
 * @return {boolean}
 */
declare function PlayPedAmbientSpeechNative(speaker: Ped, params: DataView): boolean;

/**
 * PLAY_SOUND
 *
 * @param {string | number} audioName
 * @param {string | number} audioRef
 * @param {boolean} p2
 * @param {any} p3
 * @param {boolean} p4
 * @param {any} p5
 * @return {void}
 */
declare function PlaySound(audioName: string | number, audioRef: string | number, p2: boolean, p3: any, p4: boolean, p5: any): void;

/**
 * PLAY_SOUND_FROM_ENTITY
 *
 * @param {string | number} audioName
 * @param {number} entity
 * @param {string | number} audioRef
 * @param {boolean} isNetwork
 * @param {any} p4
 * @param {any} p5
 * @return {void}
 */
declare function PlaySoundFromEntity(audioName: string | number, entity: Entity, audioRef: string | number, isNetwork: boolean, p4: any, p5: any): void;

/**
 * PLAY_SOUND_FRONTEND
 * https://github.com/femga/rdr3_discoveries/tree/master/audio/frontend_soundsets
 *
 * @param {string | number} audioName
 * @param {string | number} audioRef
 * @param {boolean} p2
 * @param {any} p3
 * @return {void}
 */
declare function PlaySoundFrontend(audioName: string | number, audioRef: string | number, p2: boolean, p3: any): void;

/**
 * PLAY_STREAM_FROM_PED
 *
 * @param {number} ped
 * @param {number} streamId
 * @return {void}
 */
declare function PlayStreamFromPed(ped: Ped, streamId: number): void;

/**
 * PLAY_STREAM_FROM_POSITION
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} streamId
 * @return {void}
 */
declare function PlayStreamFromPosition(x: number, y: number, z: number, streamId: number): void;

/**
 * PLAY_STREAM_FRONTEND
 *
 * @param {number} streamId
 * @return {void}
 */
declare function PlayStreamFrontend(streamId: number): void;

/**
 * PRELOAD_SCRIPT_CONVERSATION
 *
 * @param {string | number} convoRoot
 * @param {boolean} p1
 * @param {boolean} p2
 * @param {boolean} clone
 * @return {void}
 */
declare function PreloadScriptConversation(convoRoot: string | number, p1: boolean, p2: boolean, clone: boolean): void;

/**
 * PREPARE_MUSIC_EVENT
 *
 * @param {string | number} eventName
 * @return {boolean}
 */
declare function PrepareMusicEvent(eventName: string | number): boolean;

/**
 * PREPARE_SOUND
 *
 * @param {string | number} soundName
 * @param {string | number} soundsetName
 * @param {number} soundId
 * @return {boolean}
 */
declare function PrepareSound(soundName: string | number, soundsetName: string | number, soundId: number): boolean;

/**
 * PREPARE_SOUNDSET
 * https://github.com/femga/rdr3_discoveries/tree/master/audio/soundsets
 *
 * @param {string | number} soundsetName
 * @param {boolean} p1
 * @return {boolean}
 */
declare function PrepareSoundset(soundsetName: string | number, p1: boolean): boolean;

/**
 * PREPARE_SOUND_WITH_ENTITY
 *
 * @param {string | number} soundName
 * @param {number} entity
 * @param {string | number} soundsetName
 * @param {number} soundId
 * @return {boolean}
 */
declare function PrepareSoundWithEntity(soundName: string | number, entity: Entity, soundsetName: string | number, soundId: number): boolean;

/**
 * REGISTER_SCRIPT_WITH_AUDIO
 * nullsub, doesn't do anything
 *
 * @param {boolean} p0
 * @return {void}
 */
declare function RegisterScriptWithAudio(p0: boolean): void;

/**
 * RELEASE_NAMED_SCRIPT_AUDIO_BANK
 *
 * @param {string | number} audioBank
 * @return {void}
 */
declare function ReleaseNamedScriptAudioBank(audioBank: string | number): void;

/**
 * RELEASE_SCRIPT_AUDIO_BANK
 *

 * @return {void}
 */
declare function ReleaseScriptAudioBank(): void;

/**
 * RELEASE_SOUND_ID
 *
 * @param {number} soundId
 * @return {void}
 */
declare function ReleaseSoundId(soundId: number): void;

/**
 * REMOVE_ENTITY_FROM_AUDIO_MIX_GROUP
 *
 * @param {number} entity
 * @param {number} p1
 * @return {void}
 */
declare function RemoveEntityFromAudioMixGroup(entity: Entity, p1: number): void;

/**
 * REMOVE_PORTAL_SETTINGS_OVERRIDE
 *
 * @param {string | number} p0
 * @return {void}
 */
declare function RemovePortalSettingsOverride(p0: string | number): void;

/**
 * REQUEST_SCRIPT_AUDIO_BANK
 *
 * @param {string | number} audioBank
 * @return {boolean}
 */
declare function RequestScriptAudioBank(audioBank: string | number): boolean;

/**
 * RESTART_SCRIPTED_CONVERSATION
 *
 * @param {string | number} p0
 * @return {void}
 */
declare function RestartScriptedConversation(p0: string | number): void;

/**
 * SET_AMBIENT_VOICE_NAME
 *
 * @param {number} ped
 * @param {string | number} name
 * @return {void}
 */
declare function SetAmbientVoiceName(ped: Ped, name: string | number): void;

/**
 * SET_AMBIENT_ZONE_LIST_STATE
 *
 * @param {string | number} ambientZone
 * @param {boolean} p1
 * @param {boolean} p2
 * @return {void}
 */
declare function SetAmbientZoneListState(ambientZone: string | number, p1: boolean, p2: boolean): void;

/**
 * SET_AMBIENT_ZONE_LIST_STATE_PERSISTENT
 *
 * @param {string | number} ambientZone
 * @param {boolean} p1
 * @param {boolean} p2
 * @return {void}
 */
declare function SetAmbientZoneListStatePersistent(ambientZone: string | number, p1: boolean, p2: boolean): void;

/**
 * SET_AMBIENT_ZONE_STATE
 *
 * @param {string | number} zoneName
 * @param {boolean} isEnabled
 * @param {boolean} p2
 * @return {void}
 */
declare function SetAmbientZoneState(zoneName: string | number, isEnabled: boolean, p2: boolean): void;

/**
 * SET_AMBIENT_ZONE_STATE_PERSISTENT
 *
 * @param {string | number} ambientZone
 * @param {boolean} p1
 * @param {boolean} p2
 * @return {void}
 */
declare function SetAmbientZoneStatePersistent(ambientZone: string | number, p1: boolean, p2: boolean): void;

/**
 * SET_ANIMAL_MOOD
 * Not implemented.
 *
 * @param {number} animal
 * @param {number} mood
 * @return {void}
 */
declare function SetAnimalMood(animal: Ped, mood: number): void;

/**
 * SET_AUDIO_FLAG
 * https://github.com/femga/rdr3_discoveries/tree/master/audio/audio_flags
 *
 * @param {string | number} flagName
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetAudioFlag(flagName: string | number, toggle: boolean): void;

/**
 * SET_AUDIO_ONLINE_TRANSITION_STAGE
 *
 * @param {string | number} p0
 * @return {void}
 */
declare function SetAudioOnlineTransitionStage(p0: string | number): void;

/**
 * SET_AUDIO_SCENE_VARIABLE
 *
 * @param {string | number} scene
 * @param {string | number} variable
 * @param {number} value
 * @return {void}
 */
declare function SetAudioSceneVariable(scene: string | number, variable: string | number, value: number): void;

/**
 * SET_AUDIO_VEHICLE_PRIORITY
 *
 * @param {number} vehicle
 * @param {any} p1
 * @return {void}
 */
declare function SetAudioVehiclePriority(vehicle: Vehicle, p1: any): void;

/**
 * SET_GPS_ACTIVE
 * nullsub, doesn't do anything
 *
 * @param {boolean} active
 * @return {void}
 */
declare function SetGpsActive(active: boolean): void;

/**
 * SET_HORN_ENABLED
 *
 * @param {number} vehicle
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetHornEnabled(vehicle: Vehicle, toggle: boolean): void;

/**
 * SET_IS_SCRIPTED_SPEECH_DISABLED
 *
 * @param {number} ped
 * @param {boolean} disabled
 * @return {any}
 */
declare function SetIsScriptedSpeechDisabled(ped: Ped, disabled: boolean): any;

/**
 * SET_PED_INTERIOR_WALLA_DENSITY
 *
 * @param {number} p0
 * @param {number} p1
 * @return {void}
 */
declare function SetPedInteriorWallaDensity(p0: number, p1: number): void;

/**
 * SET_PED_IS_DRUNK
 *
 * @param {number} ped
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetPedIsDrunk(ped: Ped, toggle: boolean): void;

/**
 * SET_PED_WALLA_DENSITY
 * https://en.m.wikipedia.org/wiki/Walla
 *
 * @param {number} p0
 * @param {number} p1
 * @return {void}
 */
declare function SetPedWallaDensity(p0: number, p1: number): void;

/**
 * SET_PORTAL_SETTINGS_OVERRIDE
 *
 * @param {string | number} p0
 * @param {string | number} p1
 * @return {void}
 */
declare function SetPortalSettingsOverride(p0: string | number, p1: string | number): void;

/**
 * SET_STATIC_EMITTER_ENABLED
 *
 * @param {string | number} emitterName
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetStaticEmitterEnabled(emitterName: string | number, toggle: boolean): void;

/**
 * SKIP_TO_NEXT_SCRIPTED_CONVERSATION_LINE
 *
 * @param {string | number} p0
 * @return {void}
 */
declare function SkipToNextScriptedConversationLine(p0: string | number): void;

/**
 * START_AUDIO_SCENE
 *
 * @param {string | number} scene
 * @return {boolean}
 */
declare function StartAudioScene(scene: string | number): boolean;

/**
 * START_PRELOADED_CONVERSATION
 *
 * @param {string | number} convoRoot
 * @return {void}
 */
declare function StartPreloadedConversation(convoRoot: string | number): void;

/**
 * START_SCRIPT_CONVERSATION
 *
 * @param {string | number} convoRoot
 * @param {boolean} p1
 * @param {boolean} p2
 * @param {boolean} clone
 * @return {void}
 */
declare function StartScriptConversation(convoRoot: string | number, p1: boolean, p2: boolean, clone: boolean): void;

/**
 * STOP_AUDIO_SCENE
 *
 * @param {string | number} scene
 * @return {void}
 */
declare function StopAudioScene(scene: string | number): void;

/**
 * STOP_AUDIO_SCENES
 *

 * @return {void}
 */
declare function StopAudioScenes(): void;

/**
 * STOP_CURRENT_PLAYING_AMBIENT_SPEECH
 *
 * @param {number} ped
 * @param {any} p1
 * @return {void}
 */
declare function StopCurrentPlayingAmbientSpeech(ped: Ped, p1: any): void;

/**
 * STOP_CURRENT_PLAYING_SPEECH
 *
 * @param {number} ped
 * @param {any} p1
 * @return {void}
 */
declare function StopCurrentPlayingSpeech(ped: Ped, p1: any): void;

/**
 * STOP_PED_SPEAKING
 *
 * @param {number} ped
 * @param {boolean} shaking
 * @return {void}
 */
declare function StopPedSpeaking(ped: Ped, shaking: boolean): void;

/**
 * STOP_SCRIPTED_CONVERSATION
 *
 * @param {string | number} p0
 * @param {boolean} p1
 * @param {boolean} p2
 * @return {number}
 */
declare function StopScriptedConversation(p0: string | number, p1: boolean, p2: boolean): number;

/**
 * STOP_STREAM
 *
 * @param {number} streamId
 * @return {void}
 */
declare function StopStream(streamId: number): void;

/**
 * TRIGGER_MUSIC_EVENT
 * https://github.com/femga/rdr3_discoveries/blob/master/audio/music_events/music_events.lua
 *
 * @param {string | number} eventName
 * @return {boolean}
 */
declare function TriggerMusicEvent(eventName: string | number): boolean;

/**
 * UNREGISTER_SCRIPT_WITH_AUDIO
 * nullsub, doesn't do anything
 *

 * @return {void}
 */
declare function UnregisterScriptWithAudio(): void;

/**
 * USE_FOOTSTEP_SCRIPT_SWEETENERS
 *
 * @param {number} ped
 * @param {boolean} p1
 * @param {number} hash
 * @return {void}
 */
declare function UseFootstepScriptSweeteners(ped: Ped, p1: boolean, hash: Hash): void;

/**
 * _0x017492B2201E3428
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @param {any} p3
 * @return {void}
 */
declare function N_0x017492B2201E3428(p0: any, p1: any, p2: any, p3: any): void;

/**
 * _0x018ABE833CA64D2A
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x018ABE833CA64D2A(p0: any, p1: any): void;

/**
 * _0x06C5DF5EE444BC6B
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @param {any} p3
 * @param {any} p4
 * @return {void}
 */
declare function N_0x06C5DF5EE444BC6B(p0: any, p1: any, p2: any, p3: any, p4: any): void;

/**
 * _0x078F77FD1A43EAB3
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x078F77FD1A43EAB3(p0: any, p1: any): void;

/**
 * _0x0CB3D1919E8D7CBA
 *
 * @param {string | number} convoRoot
 * @return {boolean}
 */
declare function N_0x0CB3D1919E8D7CBA(convoRoot: string | number): boolean;

/**
 * _0x0D7FD6A55FD63AEF
 * speechEventType: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/naSpeechEventType 
 * p1 is possibly naSpeechAudibility, naSpeechType, or naSpeechEventTypeRequestPriority
 * SKIP_* - START_*
 *
 * @param {number} speechEventType
 * @param {number} p1
 * @param {boolean} p2
 * @return {void}
 */
declare function N_0x0D7FD6A55FD63AEF(speechEventType: number, p1: number, p2: boolean): void;

/**
 * _0x0FAF7171BF613B80
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x0FAF7171BF613B80(p0: any): void;

/**
 * _0x131EC9247E7A2903
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0x131EC9247E7A2903(p0: any): any;

/**
 * _0x138ADB94F8B90616
 *

 * @return {void}
 */
declare function N_0x138ADB94F8B90616(): void;

/**
 * _0x139A4B9DF2D26CBF
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x139A4B9DF2D26CBF(p0: any, p1: any): void;

/**
 * _0x152ED1B56E8F1F50
 *
 * @param {string | number} p0
 * @param {number} currentScriptedConvoLine
 * @return {number}
 */
declare function N_0x152ED1B56E8F1F50(p0: string | number, currentScriptedConvoLine: number): Ped;

/**
 * _0x1E6F9A9FE1A99F36
 *
 * @param {string | number} audSpeechEvent
 * @return {void}
 */
declare function N_0x1E6F9A9FE1A99F36(audSpeechEvent: string | number): void;

/**
 * _0x254B0241E964B450
 *
 * @param {string | number} p0
 * @param {number} currentScriptedConvoLine
 * @return {number}
 */
declare function N_0x254B0241E964B450(p0: string | number, currentScriptedConvoLine: number): Ped;

/**
 * _0x259ACC5B52A2B2D9
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x259ACC5B52A2B2D9(p0: any, p1: any): void;

/**
 * _0x2651DDC0EA269073
 *
 * @param {number} ropeId
 * @param {number} p1
 * @return {void}
 */
declare function N_0x2651DDC0EA269073(ropeId: number, p1: number): void;

/**
 * _0x295859EB18F48D82
 *
 * @param {string | number} p0
 * @return {number}
 */
declare function N_0x295859EB18F48D82(p0: string | number): number;

/**
 * _0x2B101AD9F651243A
 *

 * @return {any}
 */
declare function N_0x2B101AD9F651243A(): any;

/**
 * _0x2B9C37C01BF25EDB
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0x2B9C37C01BF25EDB(p0: any): any;

/**
 * _0x2FFF4A78384AFFDF
 *
 * @param {number} entity
 * @return {any}
 */
declare function N_0x2FFF4A78384AFFDF(entity: Entity): any;

/**
 * _0x341CDD17EFC2472E
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x341CDD17EFC2472E(p0: any, p1: any): void;

/**
 * _0x35B8C070E0C16E2F
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x35B8C070E0C16E2F(p0: any, p1: any): void;

/**
 * _0x380A2E353AD30917
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {void}
 */
declare function N_0x380A2E353AD30917(p0: any, p1: any, p2: any): void;

/**
 * _0x3A00D87B20A2A5E4
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x3A00D87B20A2A5E4(p0: any, p1: any): void;

/**
 * _0x3A3BE6B920525237
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x3A3BE6B920525237(p0: any, p1: any): void;

/**
 * _0x3D0BBCCF401B5FDB
 *

 * @return {void}
 */
declare function N_0x3D0BBCCF401B5FDB(): void;

/**
 * _0x3E93DDDCBB6111E4
 *
 * @param {string | number} p0
 * @param {number} p1
 * @return {void}
 */
declare function N_0x3E93DDDCBB6111E4(p0: string | number, p1: number): void;

/**
 * _0x3E98AC9D8C56C62C
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x3E98AC9D8C56C62C(p0: any): void;

/**
 * _0x40CA665AB9D8D505
 *
 * @param {string | number} convoRoot
 * @param {number} singleLineIndex
 * @return {void}
 */
declare function N_0x40CA665AB9D8D505(convoRoot: string | number, singleLineIndex: number): void;

/**
 * _0x43037ABFE214A851
 *

 * @return {void}
 */
declare function N_0x43037ABFE214A851(): void;

/**
 * _0x448F2647DD6F2E27
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @param {any} p3
 * @param {any} p4
 * @return {void}
 */
declare function N_0x448F2647DD6F2E27(p0: any, p1: any, p2: any, p3: any, p4: any): void;

/**
 * _0x44A5EEF54F62E823
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0x44A5EEF54F62E823(p0: any): any;

/**
 * _0x4A98E228A936DBCC
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0x4A98E228A936DBCC(p0: any): any;

/**
 * _0x4BE3EC91C01F0FE8
 *

 * @return {void}
 */
declare function N_0x4BE3EC91C01F0FE8(): void;

/**
 * _0x569ABC36E28DDEAA
 *

 * @return {void}
 */
declare function N_0x569ABC36E28DDEAA(): void;

/**
 * _0x580D71DFE0088E34
 * _IS_SOUND_RUNNING(?)
 *
 * @param {string | number} audioName
 * @param {string | number} audioRef
 * @return {boolean}
 */
declare function N_0x580D71DFE0088E34(audioName: string | number, audioRef: string | number): boolean;

/**
 * _0x5A13586A9447931F
 *
 * @param {boolean} p0
 * @return {boolean}
 */
declare function N_0x5A13586A9447931F(p0: boolean): boolean;

/**
 * _0x5AE0CB5F35F034FD
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
declare function N_0x5AE0CB5F35F034FD(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;

/**
 * _0x5BC885EBD75FAA7D
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x5BC885EBD75FAA7D(p0: any, p1: any): void;

/**
 * _0x5E3CCF03995388B5
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @param {any} p3
 * @return {void}
 */
declare function N_0x5E3CCF03995388B5(p0: any, p1: any, p2: any, p3: any): void;

/**
 * _0x62377977E4F08668
 *
 * @param {number} entity
 * @return {number}
 */
declare function N_0x62377977E4F08668(entity: Entity): AnimScene;

/**
 * _0x64B956F4E761DF5C
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x64B956F4E761DF5C(p0: any): void;

/**
 * _0x660A8F876DF1D4F8
 * speechEventType: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/naSpeechEventType 
 * SKIP_* - START_*
 *
 * @param {number} speechEventType
 * @return {void}
 */
declare function N_0x660A8F876DF1D4F8(speechEventType: number): void;

/**
 * _0x6652B0C8F3D414D0
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x6652B0C8F3D414D0(p0: any): void;

/**
 * _0x6AB944DF68B512D3
 * _STOP_AUDIO_*
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x6AB944DF68B512D3(p0: any): void;

/**
 * _0x6B7A88A61B41E589
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x6B7A88A61B41E589(p0: any): void;

/**
 * _0x6BFFB7C276866996
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0x6BFFB7C276866996(p0: any): any;

/**
 * _0x6DA15746D5CC1A92
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @param {any} p3
 * @param {any} p4
 * @param {any} p5
 * @return {void}
 */
declare function N_0x6DA15746D5CC1A92(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;

/**
 * _0x72E4D1C4639BC465
 *
 * @param {number} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0x72E4D1C4639BC465(p0: Entity, p1: any): any;

/**
 * _0x7455CD705F7E933E
 * _AUDIO_IS_* - _AUDIO_TRIGGER*
 *

 * @return {void}
 */
declare function N_0x7455CD705F7E933E(): void;

/**
 * _0x7678FE0455ED1145
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {any}
 */
declare function N_0x7678FE0455ED1145(p0: any, p1: any, p2: any): any;

/**
 * _0x79F9C57B8D0DFE90
 * Only used in R* SP Script cv_mus_shared
 *
 * @param {string | number} convoRoot
 * @param {number} animScene
 * @return {boolean}
 */
declare function N_0x79F9C57B8D0DFE90(convoRoot: string | number, animScene: AnimScene): boolean;

/**
 * _0x7E176C676F8652A9
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x7E176C676F8652A9(p0: any): void;

/**
 * _0x821C32C728B24477
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {void}
 */
declare function N_0x821C32C728B24477(p0: any, p1: any, p2: any): void;

/**
 * _0x839C9F124BE74D94
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @param {any} p3
 * @param {any} p4
 * @return {void}
 */
declare function N_0x839C9F124BE74D94(p0: any, p1: any, p2: any, p3: any, p4: any): void;

/**
 * _0x847748AE5D7B1071
 *
 * @param {boolean} p0
 * @return {boolean}
 */
declare function N_0x847748AE5D7B1071(p0: boolean): boolean;

/**
 * _0x864A842B86993851
 * Not implemented.
 *
 * @param {number} ped
 * @return {void}
 */
declare function N_0x864A842B86993851(ped: Ped): void;

/**
 * _0x886657C5B3D8EDE3
 *
 * @param {number} entity
 * @return {any}
 */
declare function N_0x886657C5B3D8EDE3(entity: Entity): any;

/**
 * _0x8D29FDF565DED9AE
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {void}
 */
declare function N_0x8D29FDF565DED9AE(p0: any, p1: any, p2: any): void;

/**
 * _0x8E901B65206C2D3E
 *
 * @param {number} ped
 * @return {void}
 */
declare function N_0x8E901B65206C2D3E(ped: Ped): void;

/**
 * _0x935DBD96D4A3DA1F
 *
 * @param {string | number} p0
 * @param {number} currentScriptedConvoLine
 * @return {number}
 */
declare function N_0x935DBD96D4A3DA1F(p0: string | number, currentScriptedConvoLine: number): number;

/**
 * _0x9D6DEC9791A4E501
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @param {any} p3
 * @return {any}
 */
declare function N_0x9D6DEC9791A4E501(p0: any, p1: any, p2: any, p3: any): any;

/**
 * _0x9EB779765E68C52E
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x9EB779765E68C52E(p0: any, p1: any): void;

/**
 * _0xA2323A2EAE32A290
 *
 * @param {number} listeningToPed
 * @param {number} ped
 * @param {string | number} listenerName
 * @return {void}
 */
declare function N_0xA2323A2EAE32A290(listeningToPed: Ped, ped: Ped, listenerName: string | number): void;

/**
 * _0xA2B851605748AD0E
 *

 * @return {void}
 */
declare function N_0xA2B851605748AD0E(): void;

/**
 * _0xA6847BBA4FCDD13F
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0xA6847BBA4FCDD13F(p0: any, p1: any): void;

/**
 * _0xA6A3A3F96B8B030E
 *

 * @return {any}
 */
declare function N_0xA6A3A3F96B8B030E(): any;

/**
 * _0xABDB4863D3D72021
 *
 * @param {number} entity
 * @param {any} p1
 * @param {any} p2
 * @param {number} p3
 * @param {any} p4
 * @return {void}
 */
declare function N_0xABDB4863D3D72021(entity: Entity, p1: any, p2: any, p3: number, p4: any): void;

/**
 * _0xB18FEC133C7C6C69
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0xB18FEC133C7C6C69(p0: any): any;

/**
 * _0xB93A769B8B726950
 * Used in Script Function NET_CAMP_CLIENT_UPDATE_PED_ROLE_STATE_SHOP: hash exists! Playing hash
 *
 * @param {number} ped
 * @param {number} p1
 * @return {void}
 */
declare function N_0xB93A769B8B726950(ped: Ped, p1: Hash): void;

/**
 * _0xBC07CA8FD710E7FD
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0xBC07CA8FD710E7FD(p0: any, p1: any): void;

/**
 * _0xBE28DB99556FF8D9
 * Checks for MOONSHINE_BAND
 *
 * @param {number} entity
 * @return {number}
 */
declare function N_0xBE28DB99556FF8D9(entity: Entity): number;

/**
 * _0xC369E2234E34A0CA
 *
 * @param {any} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0xC369E2234E34A0CA(p0: any, p1: any): any;

/**
 * _0xC4CFCE4C656EF480
 *
 * @param {number} ped
 * @return {void}
 */
declare function N_0xC4CFCE4C656EF480(ped: Ped): void;

/**
 * _0xC68C02DE259C927C
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0xC68C02DE259C927C(p0: any): any;

/**
 * _0xC886CD666ADD42E1
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0xC886CD666ADD42E1(p0: any, p1: any): void;

/**
 * _0xCBF2BEBB468A34F3
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0xCBF2BEBB468A34F3(p0: any): void;

/**
 * _0xCFAD2C8CD1054523
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @param {any} p3
 * @return {void}
 */
declare function N_0xCFAD2C8CD1054523(p0: any, p1: any, p2: any, p3: any): void;

/**
 * _0xD05A460328560477
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0xD05A460328560477(p0: any): any;

/**
 * _0xD0730C1FA40348D9
 * _IS_SCRIPTED_CONVERSATION_*
 *
 * @param {string | number} convoRoot
 * @return {boolean}
 */
declare function N_0xD0730C1FA40348D9(convoRoot: string | number): boolean;

/**
 * _0xD47D47EFBF103FB8
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0xD47D47EFBF103FB8(p0: any, p1: any): void;

/**
 * _0xD733528B6C35647A
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0xD733528B6C35647A(p0: any, p1: any): void;

/**
 * _0xDAD6CD07CAA4F382
 *

 * @return {void}
 */
declare function N_0xDAD6CD07CAA4F382(): void;

/**
 * _0xDC2F83A0612CA34D
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0xDC2F83A0612CA34D(p0: any): any;

/**
 * _0xDC93F0948F2C28F4
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0xDC93F0948F2C28F4(p0: any): void;

/**
 * _0xDF947FE0D551684E
 *
 * @param {number} ped
 * @param {string | number} p1
 * @return {boolean}
 */
declare function N_0xDF947FE0D551684E(ped: Ped, p1: string | number): boolean;

/**
 * _0xE600F61F54A444A6
 *

 * @return {any}
 */
declare function N_0xE600F61F54A444A6(): any;

/**
 * _0xE7E6CB8B713ED190
 *

 * @return {void}
 */
declare function N_0xE7E6CB8B713ED190(): void;

/**
 * _0xE891504B2F0E2DBA
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0xE891504B2F0E2DBA(p0: any, p1: any): void;

/**
 * _0xE9694B2D6CB87B06
 *
 * @param {number} entity
 * @param {any} p1
 * @return {void}
 */
declare function N_0xE9694B2D6CB87B06(entity: Entity, p1: any): void;

/**
 * _0xEA546C31FD45F8CD
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0xEA546C31FD45F8CD(p0: any): void;

/**
 * _0xEB4D592620B8C209
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0xEB4D592620B8C209(p0: any): void;

/**
 * _0xF092B6030D6FD49C
 * Name: ROPE_SETTINGS_DEFAULT
 *
 * @param {number} ropeId
 * @param {string | number} name
 * @return {void}
 */
declare function N_0xF092B6030D6FD49C(ropeId: number, name: string | number): void;

/**
 * _0xF0EE69F500952FA5
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0xF0EE69F500952FA5(p0: any): any;

/**
 * _0xF232C2C546AC16D0
 *
 * @param {string | number} p0
 * @return {void}
 */
declare function N_0xF232C2C546AC16D0(p0: string | number): void;

/**
 * _0xF336E9F989B3518F
 *
 * @param {string | number} p0
 * @return {number}
 */
declare function N_0xF336E9F989B3518F(p0: string | number): number;

/**
 * _0xF64034D533CE8AAC
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {void}
 */
declare function N_0xF64034D533CE8AAC(p0: any, p1: any, p2: any): void;

/**
 * _0xFCDEC42B1C78B7F8
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0xFCDEC42B1C78B7F8(p0: any, p1: any): void;

/**
 * _0xFD461D0ABA5559B1
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0xFD461D0ABA5559B1(p0: any, p1: any): void;

/**
 * _0xFE5C6177064BD390
 *
 * @param {boolean} p0
 * @return {boolean}
 */
declare function N_0xFE5C6177064BD390(p0: boolean): boolean;

/**
 * _0xFFE9C53DEEA3DB0B
 *
 * @param {any} p0
 * @param {any} p1
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {boolean} isSrlLoaded
 * @param {any} p6
 * @return {any}
 */
declare function N_0xFFE9C53DEEA3DB0B(p0: any, p1: any, x: number, y: number, z: number, isSrlLoaded: boolean, p6: any): any;

/**
 * _BLOCK_SPEECH_CONTEXT
 *
 * @param {string | number} context
 * @param {boolean} block
 * @return {void}
 */
declare function BlockSpeechContext(context: string | number, block: boolean): void;

/**
 * _CLEAR_CONVERSATION_HISTORY_FOR_SCRIPTED_CONVERSATION
 *
 * @param {string | number} convoRoot
 * @return {void}
 */
declare function ClearConversationHistoryForScriptedConversation(convoRoot: string | number): void;

/**
 * _GET_ENTITY_AUDIO_MIX_GROUP
 *
 * @param {number} entity
 * @return {number}
 */
declare function GetEntityAudioMixGroup(entity: Entity): number;

/**
 * _GET_LOADED_STREAM_ID_FROM_CREATION
 * Creates stream and returns streamId handle to be used with PLAY_STREAM_* natives
 * https://github.com/femga/rdr3_discoveries/tree/master/audio/create_stream
 *
 * @param {string | number} streamName
 * @param {string | number} soundSet
 * @return {number}
 */
declare function GetLoadedStreamIdFromCreation(streamName: string | number, soundSet: string | number): number;

/**
 * _GET_PED_SONG_INDEX_HOST
 *
 * @param {number} ped
 * @return {any}
 */
declare function GetPedSongIndexHost(ped: Ped): any;

/**
 * _HAS_SOUND_AUDIO_NAME_FINISHED
 *
 * @param {string | number} audioName
 * @param {string | number} soundsetName
 * @return {boolean}
 */
declare function HasSoundAudioNameFinished(audioName: string | number, soundsetName: string | number): boolean;

/**
 * _HAS_SOUND_ID_FINISHED
 *
 * @param {number} soundId
 * @return {boolean}
 */
declare function HasSoundIdFinished(soundId: number): boolean;

/**
 * _IS_ANY_CONVERSATION_PLAYING
 *
 * @param {boolean} p0
 * @return {boolean}
 */
declare function IsAnyConversationPlaying(p0: boolean): boolean;

/**
 * _IS_PED_IN_ANY_CONVERSATION
 *
 * @param {number} ped
 * @param {boolean} p1
 * @return {boolean}
 */
declare function IsPedInAnyConversation(ped: Ped, p1: boolean): boolean;

/**
 * _IS_SCRIPTED_AUDIO_CUSTOM
 * item: FUSE, value returned from 0x2E1CDC1FF3B8473E
 * soundSet: HUD_SHOP_SOUNDSET, COMPANIONS_ROBBERIES_SOUNDSET
 *
 * @param {number} item
 * @param {number} soundSet
 * @return {boolean}
 */
declare function IsScriptedAudioCustom(item: Hash, soundSet: Hash): boolean;

/**
 * _IS_SCRIPTED_CONVERSATION_CREATED
 *
 * @param {string | number} convoRoot
 * @return {boolean}
 */
declare function IsScriptedConversationCreated(convoRoot: string | number): boolean;

/**
 * _IS_SCRIPTED_CONVERSION_ONGOING
 *
 * @param {string | number} p0
 * @return {boolean}
 */
declare function IsScriptedConversionOngoing(p0: string | number): boolean;

/**
 * _PLAY_ANIMAL_VOCALIZATION_PHEROMONE_VIAL_RESPONSE
 *
 * @param {number} ped
 * @param {number} p1
 * @param {boolean} p2
 * @return {void}
 */
declare function PlayAnimalVocalizationPheromoneVialResponse(ped: Ped, p1: Hash, p2: boolean): void;

/**
 * _PLAY_SOUND_FROM_ENTITY_WITH_SET
 * Params: p5 seems to be always 0
 *
 * @param {number} soundId
 * @param {string | number} soundName
 * @param {number} entity
 * @param {string | number} soundsetName
 * @param {boolean} p4
 * @param {any} p5
 * @return {void}
 */
declare function PlaySoundFromEntityWithSet(soundId: number, soundName: string | number, entity: Entity, soundsetName: string | number, p4: boolean, p5: any): void;

/**
 * _PLAY_SOUND_FROM_ITEM
 * item: value returned from 0x2E1CDC1FF3B8473E
 * soundSet: HUD_SHOP_SOUNDSET, COMPANIONS_ROBBERIES_SOUNDSET
 *
 * @param {number} item
 * @param {number} soundSet
 * @param {any} p2
 * @return {void}
 */
declare function PlaySoundFromItem(item: Hash, soundSet: Hash, p2: any): void;

/**
 * _PLAY_SOUND_FROM_POSITION
 *
 * @param {string | number} audioName
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {string | number} audioRef
 * @param {boolean} isNetwork
 * @param {any} p6
 * @param {boolean} p7
 * @param {any} p8
 * @return {void}
 */
declare function PlaySoundFromPosition(audioName: string | number, x: number, y: number, z: number, audioRef: string | number, isNetwork: boolean, p6: any, p7: boolean, p8: any): void;

/**
 * _PLAY_SOUND_FROM_POSITION_WITH_ID
 * Starts Audio Loop
 * _PLAY_SOUND_FROM_ENTITY* - _PLAY_SOUND_FRONTEND*
 *
 * @param {number} soundId
 * @param {string | number} soundName
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {string | number} soundsetName
 * @param {boolean} p6
 * @param {number} p7
 * @param {boolean} p8
 * @return {void}
 */
declare function PlaySoundFromPositionWithId(soundId: number, soundName: string | number, x: number, y: number, z: number, soundsetName: string | number, p6: boolean, p7: number, p8: boolean): void;

/**
 * _PLAY_SOUND_FRONTEND_WITH_SOUND_ID
 *
 * @param {number} soundId
 * @param {string | number} name
 * @param {string | number} soundSet
 * @param {boolean} p3
 * @return {void}
 */
declare function PlaySoundFrontendWithSoundId(soundId: number, name: string | number, soundSet: string | number, p3: boolean): void;

/**
 * _RELEASE_SHARD_SOUNDS
 *
 * @param {string | number} soundName
 * @param {string | number} soundsetName
 * @return {void}
 */
declare function ReleaseShardSounds(soundName: string | number, soundsetName: string | number): void;

/**
 * _RELEASE_SOUNDSET
 *
 * @param {string | number} soundsetName
 * @return {void}
 */
declare function ReleaseSoundset(soundsetName: string | number): void;

/**
 * _SET_AMBIENT_ZONE_POSITION
 *
 * @param {string | number} ambientZone
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} heading
 * @return {void}
 */
declare function SetAmbientZonePosition(ambientZone: string | number, x: number, y: number, z: number, heading: number): void;

/**
 * _SET_AUDIO_SCENESET
 *
 * @param {string | number} audioName
 * @param {string | number} sceneset
 * @return {boolean}
 */
declare function SetAudioSceneset(audioName: string | number, sceneset: string | number): boolean;

/**
 * _SET_SOUND_RELATIONSHIP_ON_PED
 * p1: Entity.Relationship
 * p2: Player, Enemy, Teammate, Neutral
 *
 * @param {number} ped
 * @param {string | number} p1
 * @param {string | number} p2
 * @return {void}
 */
declare function SetSoundRelationshipOnPed(ped: Ped, p1: string | number, p2: string | number): void;

/**
 * _SET_VARIABLE_ON_SOUND_WITH_ID
 *
 * @param {number} soundId
 * @param {string | number} variableName
 * @param {number} variableValue
 * @return {void}
 */
declare function SetVariableOnSoundWithId(soundId: number, variableName: string | number, variableValue: number): void;

/**
 * _SET_VARIABLE_ON_SOUND_WITH_NAME
 *
 * @param {string | number} variableName
 * @param {number} variableValue
 * @param {string | number} audioName
 * @param {string | number} audioRef
 * @return {void}
 */
declare function SetVariableOnSoundWithName(variableName: string | number, variableValue: number, audioName: string | number, audioRef: string | number): void;

/**
 * _SET_VOFX_PED_VOICE
 * Hashes: VOFX_PLAYER_MALE01, VOFX_PLAYER_MALE02, VOFX_PLAYER_MALE03, VOFX_PLAYER_FEMALE01, VOFX_PLAYER_FEMALE02, VOFX_PLAYER_FEMALE03
 *
 * @param {number} ped
 * @param {number} voice
 * @return {void}
 */
declare function SetVofxPedVoice(ped: Ped, voice: Hash): void;

/**
 * _SET_WHISTLE_CONFIG_FOR_PED
 * whistleConfig: Ped.WhistlePitch (0.0 - 1.0), Ped.WhistleClarity (0.0 - 1.0), Ped.WhistleShape (0.0 - 10.0)
 *
 * @param {number} ped
 * @param {string | number} whistleConfig
 * @param {number} value
 * @return {void}
 */
declare function SetWhistleConfigForPed(ped: Ped, whistleConfig: string | number, value: number): void;

/**
 * _START_AUDIO_SCENESET
 *
 * @param {string | number} audioName
 * @param {string | number} sceneset
 * @return {boolean}
 */
declare function StartAudioSceneset(audioName: string | number, sceneset: string | number): boolean;

/**
 * _STOP_ALL_SCRIPTED_AUDIO_SOUNDS
 *

 * @return {void}
 */
declare function StopAllScriptedAudioSounds(): void;

/**
 * _STOP_ALL_SCRIPTED_CONVERSIONS
 *
 * @param {boolean} p0
 * @param {boolean} p1
 * @param {boolean} p2
 * @return {void}
 */
declare function StopAllScriptedConversions(p0: boolean, p1: boolean, p2: boolean): void;

/**
 * _STOP_AUDIO_SCENESET
 *
 * @param {string | number} sceneset
 * @return {void}
 */
declare function StopAudioSceneset(sceneset: string | number): void;

/**
 * _STOP_SOUND_WITH_ID
 *
 * @param {number} soundId
 * @return {void}
 */
declare function StopSoundWithId(soundId: number): void;

/**
 * _STOP_SOUND_WITH_NAME
 *
 * @param {string | number} audioName
 * @param {string | number} audioRef
 * @return {void}
 */
declare function StopSoundWithName(audioName: string | number, audioRef: string | number): void;

/**
 * _TRIGGER_MUSIC_EVENT_WITH_HASH
 *
 * @param {number} eventName
 * @return {any}
 */
declare function TriggerMusicEventWithHash(eventName: Hash): any;

/**
 * _UNLOAD_SPEECH_CONTEXT
 * _UNLOAD_[A-C]* - USE_*
 *
 * @param {string | number} speechContext
 * @return {void}
 */
declare function UnloadSpeechContext(speechContext: string | number): void;

/**
 * _UPDATE_SOUND_POSITION
 * Only used in R* SP Scripts
 *
 * @param {number} soundId
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {void}
 */
declare function UpdateSoundPosition(soundId: number, x: number, y: number, z: number): void;