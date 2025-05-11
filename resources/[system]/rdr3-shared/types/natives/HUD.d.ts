/**
   * ALLOW_PAUSE_WHEN_NOT_IN_STATE_OF_PLAY_THIS_FRAME
   * Old name: _ALLOW_PAUSE_MENU_WHEN_DEAD_THIS_FRAME
   *
  
   * @return {void}
   */
declare function AllowPauseWhenNotInStateOfPlayThisFrame(): void;

/**
   * BUSYSPINNER_IS_ON
   *
  
   * @return {boolean}
   */
declare function BusyspinnerIsOn(): boolean;

/**
   * BUSYSPINNER_OFF
   * Removes the loading prompt at the bottom right of the screen.
   *
  
   * @return {void}
   */
declare function BusyspinnerOff(): void;

/**
   * CLEAR_ALL_HELP_MESSAGES
   *
  
   * @return {void}
   */
declare function ClearAllHelpMessages(): void;

/**
   * CREATE_FAKE_MP_GAMER_TAG
   *
   * @param {number} ped
   * @param {string | number} username
   * @param {boolean} pointedClanTag
   * @param {boolean} isRockstarClan
   * @param {string | number} clanTag
   * @param {number} clanFlag
   * @return {number}
   */
declare function CreateFakeMpGamerTag(ped: Ped, username: string | number, pointedClanTag: boolean, isRockstarClan: boolean, clanTag: string | number, clanFlag: number): number;

/**
   * DISABLE_FRONTEND_THIS_FRAME
   *
  
   * @return {void}
   */
declare function DisableFrontendThisFrame(): void;

/**
   * DISPLAY_HUD
   * If Hud should be displayed
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function DisplayHud(toggle: boolean): void;

/**
   * DOES_TEXT_LABEL_EXIST
   * Checks if the passed gxt name exists in the game files.
   *
   * @param {string | number} label
   * @return {boolean}
   */
declare function DoesTextLabelExist(label: string | number): boolean;

/**
   * GET_CHARACTER_FROM_AUDIO_CONVERSATION_FILENAME
   * Note: you must use VAR_STRING. Byte code very similar to TEXT_COMMAND_DISPLAY_TEXT in V
   * Old name: _GET_TEXT_SUBSTRING
   *
   * @param {string | number} text
   * @param {number} position
   * @param {number} length
   * @return {string | number}
   */
declare function GetCharacterFromAudioConversationFilename(text: string | number, position: number, length: number): string | number;

/**
   * GET_FILENAME_FOR_AUDIO_CONVERSATION
   * Gets a string literal from a label name.
   * 
   * Old name: _GET_LABEL_TEXT
   *
   * @param {string | number} labelName
   * @return {string | number}
   */
declare function GetFilenameForAudioConversation(labelName: string | number): string | number;

/**
   * GET_HUD_SCREEN_POSITION_FROM_WORLD_POSITION
   *
   * @param {number} worldX
   * @param {number} worldY
   * @param {number} worldZ
   * @return {[number, number, number]}
   */
declare function GetHudScreenPositionFromWorldPosition(worldX: number, worldY: number, worldZ: number): [number, number, number];

/**
   * GET_LENGTH_OF_LITERAL_STRING
   * Returns the length of the string passed (much like strlen).
   *
   * @param {string | number} string
   * @return {number}
   */
declare function GetLengthOfLiteralString(string: string | number): number;

/**
   * GET_LENGTH_OF_LITERAL_STRING_IN_BYTES
   *
   * @param {string | number} string
   * @return {number}
   */
declare function GetLengthOfLiteralStringInBytes(string: string | number): number;

/**
   * GET_NAMED_RENDERTARGET_RENDER_ID
   *
   * @param {string | number} name
   * @return {number}
   */
declare function GetNamedRendertargetRenderId(name: string | number): number;

/**
   * GET_STRING_FROM_HASH_KEY
   * Returns the label text given the hash.
   * 
   * Old name: _GET_LABEL_TEXT_BY_HASH
   *
   * @param {number} labelHash
   * @return {string | number}
   */
declare function GetStringFromHashKey(labelHash: Hash): string | number;

/**
   * HIDE_HUD_AND_RADAR_THIS_FRAME
   *
  
   * @return {void}
   */
declare function HideHudAndRadarThisFrame(): void;

/**
   * HIDE_LOADING_ON_FADE_THIS_FRAME
   *
  
   * @return {void}
   */
declare function HideLoadingOnFadeThisFrame(): void;

/**
   * IS_HUD_HIDDEN
   *
  
   * @return {boolean}
   */
declare function IsHudHidden(): boolean;

/**
   * IS_MP_GAMER_TAG_ACTIVE
   *
   * @param {number} gamerTagId
   * @return {boolean}
   */
declare function IsMpGamerTagActive(gamerTagId: number): boolean;

/**
   * IS_NAMED_RENDERTARGET_LINKED
   *
   * @param {number} modelHash
   * @return {boolean}
   */
declare function IsNamedRendertargetLinked(modelHash: Hash): boolean;

/**
   * IS_NAMED_RENDERTARGET_REGISTERED
   *
   * @param {string | number} name
   * @return {boolean}
   */
declare function IsNamedRendertargetRegistered(name: string | number): boolean;

/**
   * IS_PAUSE_MENU_ACTIVE
   * Returns true when either Pause Menu, a Frontend Menu, Online Policies menu or Social Club menu is active.
   *
  
   * @return {boolean}
   */
declare function IsPauseMenuActive(): boolean;

/**
   * IS_RADAR_HIDDEN
   *
  
   * @return {boolean}
   */
declare function IsRadarHidden(): boolean;

/**
   * IS_RADAR_HIDDEN_BY_SCRIPT
   *
  
   * @return {boolean}
   */
declare function IsRadarHiddenByScript(): boolean;

/**
   * IS_RADAR_PREFERENCE_SWITCHED_ON
   *
  
   * @return {boolean}
   */
declare function IsRadarPreferenceSwitchedOn(): boolean;

/**
   * IS_SUBTITLE_PREFERENCE_SWITCHED_ON
   *
  
   * @return {boolean}
   */
declare function IsSubtitlePreferenceSwitchedOn(): boolean;

/**
   * LINK_NAMED_RENDERTARGET
   *
   * @param {number} modelHash
   * @return {void}
   */
declare function LinkNamedRendertarget(modelHash: Hash): void;

/**
   * REGISTER_NAMED_RENDERTARGET
   *
   * @param {string | number} name
   * @param {boolean} p1
   * @return {boolean}
   */
declare function RegisterNamedRendertarget(name: string | number, p1: boolean): boolean;

/**
   * RELEASE_NAMED_RENDERTARGET
   *
   * @param {string | number} name
   * @return {boolean}
   */
declare function ReleaseNamedRendertarget(name: string | number): boolean;

/**
   * REMOVE_MP_GAMER_TAG
   * only works by invoking and passing as pointer value Citizen.InvokeNative(0x839BFD7D7E49FE09, Citizen.PointerValueIntInitialized(gamerTagId))
   *
   * @param {number} gamerTagId
   * @return {void}
   */
declare function RemoveMpGamerTag(gamerTagId: number): void;

/**
   * SET_FRONTEND_ACTIVE
   *
   * @param {boolean} active
   * @return {void}
   */
declare function SetFrontendActive(active: boolean): void;

/**
   * SET_MISSION_NAME
   *
   * @param {boolean} p0
   * @param {string | number} name
   * @return {void}
   */
declare function SetMissionName(p0: boolean, name: string | number): void;

/**
   * SET_MISSION_NAME_FOR_UGC_MISSION
   *
   * @param {boolean} p0
   * @param {string | number} name
   * @return {void}
   */
declare function SetMissionNameForUgcMission(p0: boolean, name: string | number): void;

/**
   * SET_MP_GAMER_TAG_BIG_TEXT
   *
   * @param {number} gamerTagId
   * @param {string | number} string
   * @return {void}
   */
declare function SetMpGamerTagBigText(gamerTagId: number, string: string | number): void;

/**
   * SET_MP_GAMER_TAG_NAME
   *
   * @param {number} gamerTagId
   * @param {string | number} string
   * @return {void}
   */
declare function SetMpGamerTagName(gamerTagId: number, string: string | number): void;

/**
   * SET_TEXT_RENDER_ID
   *
   * @param {number} renderId
   * @return {void}
   */
declare function SetTextRenderId(renderId: number): void;

/**
   * TEXT_BLOCK_IS_LOADED
   *
   * @param {string | number} textBlock
   * @return {boolean}
   */
declare function TextBlockIsLoaded(textBlock: string | number): boolean;

/**
   * TEXT_BLOCK_REQUEST
   *
   * @param {string | number} textBlock
   * @return {void}
   */
declare function TextBlockRequest(textBlock: string | number): void;

/**
   * UI_GET_SCENE_UIOBJECT
   *
   * @param {any} p0
   * @return {any}
   */
declare function UiGetSceneUiobject(p0: any): any;

/**
   * UI_MOVIEVIEW_SET_RENDER_TARGET
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function UiMovieviewSetRenderTarget(p0: any, p1: any): void;

/**
   * UI_PROMPT_IS_CONTROL_ACTION_ACTIVE
   *
   * @param {number} controlAction
   * @return {boolean}
   */
declare function UiPromptIsControlActionActive(controlAction: Hash): boolean;

/**
   * UI_REQUEST_SCENE
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function UiRequestScene(p0: any, p1: any): any;

/**
   * _GET_NEAR_HORSE
   * This native accepts 1 as parameter in the decompiles
   * returns the nearest horse handle if within 2 3 meters of the player, if not close enough returns false
   * 
   * NOTE: if type is 0 returns PlayerPedId always?
   *
   * @param {number} p0
   * @return {number}
   */
declare function GetNearHorse(p0: number): number;

/**
   * _0x052D4AC0922AF91A
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x052D4AC0922AF91A(p0: any, p1: any): void;

/**
   * _0x066725A9D52B3641
   *
  
   * @return {any}
   */
declare function N_0x066725A9D52B3641(): any;

/**
   * _0x100157D6D7FE32CA
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0x100157D6D7FE32CA(p0: any, p1: any): any;

/**
   * _0x160825DADF1B04B3
   *
  
   * @return {void}
   */
declare function N_0x160825DADF1B04B3(): void;

/**
   * _0x28AE29D909C8FDCE
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x28AE29D909C8FDCE(p0: any): any;

/**
   * _0x2F7BB105144ACF30
   * nullsub, doesn't do anything
   *
  
   * @return {void}
   */
declare function N_0x2F7BB105144ACF30(): void;

/**
   * _0x3FE4FB41EF7D2196
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x3FE4FB41EF7D2196(p0: any): void;

/**
   * _0x53CE46C01A089DA1
   *
   * @param {number} prompt
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x53CE46C01A089DA1(prompt: Prompt, p1: boolean): void;

/**
   * _0x5651516D947ABC53
   *
  
   * @return {void}
   */
declare function N_0x5651516D947ABC53(): void;

/**
   * _0x7EC0D68233E391AC
   *
   * @param {number} p0
   * @return {number}
   */
declare function N_0x7EC0D68233E391AC(p0: number): number;

/**
   * _0x806862E5D266CF38
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {any}
   */
declare function N_0x806862E5D266CF38(p0: any, p1: any, p2: any): any;

/**
   * _0x8A59D44189AF2BC5
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x8A59D44189AF2BC5(p0: any, p1: any): void;

/**
   * _0x8B55B324A9123F6B
   *
   * @param {number} groupId
   * @param {number} volume
   * @param {string | number} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @return {any}
   */
declare function N_0x8B55B324A9123F6B(groupId: number, volume: Volume, p2: string | number, p3: any, p4: any, p5: any): any;

/**
   * _0x958278B97C4AFFD8
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x958278B97C4AFFD8(p0: any, p1: any): void;

/**
   * _HUD_WEAPON_WHEEL_GET_SELECTED_ITEM_HASH
   * Returns the hash of the currently highlighted item in the weapon wheel.
   * Only works while the wheel is open will return false
   * 
   * Use in conjunction with IS_CONTROL_JUST_RELEASED(0, 'INPUT_OPEN_WHEEL_MENU') to detect item selection/usage.
   *
  
   * @return {any}
   */
declare function HudWeaponWheelGetSelectedItemHash(): any;

/**
   * _0x9D37EB5003E0F2CF
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x9D37EB5003E0F2CF(p0: any, p1: any): void;

/**
   * _0xB0E8599243B3F568
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xB0E8599243B3F568(p0: any): any;

/**
   * _0xBFFF81E12A745A5F
   * nullsub, doesn't do anything
   *
  
   * @return {void}
   */
declare function N_0xBFFF81E12A745A5F(): void;

/**
   * _SET_CURRENT_UGC_MISSION_DESCRIPTION
   * string1 is the only string used in the scripts, the others are null (0)
   *
   * @param {boolean} active
   * @param {string | number} string1
   * @param {string | number} string2
   * @param {string | number} string3
   * @param {string | number} string4
   * @return {void}
   */
declare function SetCurrentUgcMissionDescription(active: boolean, string1: string | number, string2: string | number, string3: string | number, string4: string | number): void;

/**
   * _0xD6BD313CFA41E57A
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xD6BD313CFA41E57A(p0: any): any;

/**
   * _0xF1E6979C0B779985
   *
   * @param {number} uiscene
   * @return {void}
   */
declare function N_0xF1E6979C0B779985(uiscene: number): void;

/**
   * _BUSYSPINNER_SET_TEXT
   *
   * @param {string | number} text
   * @return {void}
   */
declare function BusyspinnerSetText(text: string | number): void;

/**
   * _CREATE_MP_GAMER_TAG
   *
   * @param {number} player
   * @param {string | number} username
   * @param {boolean} pointedClanTag
   * @param {boolean} isRockstarClan
   * @param {string | number} clanTag
   * @param {number} clanFlag
   * @return {number}
   */
declare function CreateMpGamerTag(player: Player, username: string | number, pointedClanTag: boolean, isRockstarClan: boolean, clanTag: string | number, clanFlag: number): number;

/**
   * _CREATE_MP_GAMER_TAG_ON_ENTITY
   *
   * @param {number} entity
   * @param {string | number} text
   * @return {number}
   */
declare function CreateMpGamerTagOnEntity(entity: Entity, text: string | number): number;

/**
   * _DISABLE_HUD_CONTEXT
   * Old name: _DISPLAY_HUD_COMPONENT
   *
   * @param {number} component
   * @return {void}
   */
declare function DisableHudContext(component: Hash): void;

/**
   * _DISABLE_REDUCED_MENU_TIME_SCALE
   * Disables reduced time scale while menus such as weapon wheel and satchel are open.
   *
  
   * @return {void}
   */
declare function DisableReducedMenuTimeScale(): void;

/**
   * _DISPLAY_TEXT
   * nullsub, this native does nothing since build 1436, use _BG_DISPLAY_TEXT (0x16794E044C9EFB58) instead.
   *
   * @param {string | number} text
   * @param {number} xPos
   * @param {number} yPos
   * @return {void}
   */
declare function DisplayText(text: string | number, xPos: number, yPos: number): void;

/**
   * _DOES_TEXT_BLOCK_EXIST
   *
   * @param {string | number} textDatabase
   * @return {boolean}
   */
declare function DoesTextBlockExist(textDatabase: string | number): boolean;

/**
   * _ENABLE_HUD_CONTEXT
   * https://github.com/femga/rdr3_discoveries/tree/master/graphics/HUD/hud_presets
   * Old name: _HIDE_HUD_COMPONENT
   *
   * @param {number} component
   * @return {void}
   */
declare function EnableHudContext(component: Hash): void;

/**
   * _ENABLE_HUD_CONTEXT_THIS_FRAME
   *
   * @param {number} component
   * @return {void}
   */
declare function EnableHudContextThisFrame(component: Hash): void;

/**
   * _ENABLE_REDUCED_MENU_TIME_SCALE
   * Enables reduced time scale while menus such as weapon wheel and satchel are open.
   *
  
   * @return {void}
   */
declare function EnableReducedMenuTimeScale(): void;

/**
   * _GET_COLOR_FROM_NAME
   * colorNameHash: https://alloc8or.re/rdr3/doc/enums/eColor.txt
   *
   * @param {number} colorNameHash
   * @return {[number, number, number, number]}
   */
declare function GetColorFromName(colorNameHash: Hash): [number, number, number, number];

/**
   * _GET_LABEL_TEXT_2
   *
   * @param {string | number} label
   * @return {string | number}
   */
declare function GetLabelText_2(label: string | number): string | number;

/**
   * _GET_TEXT_SUBSTRING_2
   * Similar to 0x9D7E12EC6A1EE4E5(GET_TEXT_SUBSTRING) but starts at the beginning of the string
   *
   * @param {string | number} text
   * @param {number} length
   * @return {string | number}
   */
declare function GetTextSubstring_2(text: string | number, length: number): string | number;

/**
   * _HIDE_HUD_THIS_FRAME
   *
  
   * @return {void}
   */
declare function HideHudThisFrame(): void;

/**
   * _IS_MP_GAMER_TAG_ACTIVE_ON_ENTITY
   *
   * @param {number} gamerTagId
   * @param {number} entity
   * @return {boolean}
   */
declare function IsMpGamerTagActiveOnEntity(gamerTagId: number, entity: Entity): boolean;

/**
   * _JOURNAL_CAN_WRITE_ENTRY
   *
   * @param {any} p0
   * @return {any}
   */
declare function JournalCanWriteEntry(p0: any): any;

/**
   * _JOURNAL_CLEAR_ALL_PROGRESS
   *
  
   * @return {void}
   */
declare function JournalClearAllProgress(): void;

/**
   * _JOURNAL_GET_ENTRY_AT_INDEX
   *
   * @param {any} p0
   * @return {any}
   */
declare function JournalGetEntryAtIndex(p0: any): any;

/**
   * _JOURNAL_GET_ENTRY_COUNT
   *
  
   * @return {any}
   */
declare function JournalGetEntryCount(): any;

/**
   * _JOURNAL_GET_ENTRY_INFO
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function JournalGetEntryInfo(p0: any, p1: any): any;

/**
   * _JOURNAL_GET_GRIME_AT_INDEX
   *
   * @param {any} p0
   * @return {any}
   */
declare function JournalGetGrimeAtIndex(p0: any): any;

/**
   * _JOURNAL_GET_TEXTURE_WITH_LAYOUT
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {any}
   */
declare function JournalGetTextureWithLayout(p0: any, p1: any, p2: any): any;

/**
   * _JOURNAL_MARK_READ
   *
   * @param {any} p0
   * @return {void}
   */
declare function JournalMarkRead(p0: any): void;

/**
   * _JOURNAL_WRITE_ENTRY
   *
   * @param {any} p0
   * @return {void}
   */
declare function JournalWriteEntry(p0: any): void;

/**
   * _MP_GAMER_TAG_DISABLE_REVIVE_TOP_ICON
   *
   * @param {number} gamerTagId
   * @return {void}
   */
declare function MpGamerTagDisableReviveTopIcon(gamerTagId: number): void;

/**
   * _MP_GAMER_TAG_ENABLE_REVIVE_TOP_ICON
   *
   * @param {number} gamerTagId
   * @return {void}
   */
declare function MpGamerTagEnableReviveTopIcon(gamerTagId: number): void;

/**
   * _SET_MP_GAMER_TAG_COLOUR
   *
   * @param {number} gamerTagId
   * @param {number} colour
   * @return {void}
   */
declare function SetMpGamerTagColour(gamerTagId: number, colour: Hash): void;

/**
   * _SET_MP_GAMER_TAG_NAME_POSSE
   *
   * @param {number} gamerTagId
   * @param {string | number} text
   * @return {void}
   */
declare function SetMpGamerTagNamePosse(gamerTagId: number, text: string | number): void;

/**
   * _SET_MP_GAMER_TAG_SECONDARY_ICON
   * Found icons: SPEAKER, THROPY
   *
   * @param {number} gamerTagId
   * @param {number} icon
   * @return {void}
   */
declare function SetMpGamerTagSecondaryIcon(gamerTagId: number, icon: Hash): void;

/**
   * _SET_MP_GAMER_TAG_TOP_ICON
   * Found icons: https://pastebin.com/xx6rEgiG
   *
   * @param {number} gamerTagId
   * @param {number} icon
   * @return {void}
   */
declare function SetMpGamerTagTopIcon(gamerTagId: number, icon: Hash): void;

/**
   * _SET_MP_GAMER_TAG_TYPE
   * Found types: GENERIC_PLAYER, DEADDROP, HOTPROPERTY, MINIGAMES
   *
   * @param {number} gamerTagId
   * @param {number} type
   * @return {void}
   */
declare function SetMpGamerTagType(gamerTagId: number, type: Hash): void;

/**
   * _SET_MP_GAMER_TAG_UNK_ALLOW_LOCALIZED
   * nullsub, doesn't do anything
   *
   * @param {number} gamerTagId
   * @param {boolean} allow
   * @return {void}
   */
declare function SetMpGamerTagUnkAllowLocalized(gamerTagId: number, allow: boolean): void;

/**
   * _SET_MP_GAMER_TAG_VISIBILITY
   * visibility:
   * enum eUIGamertagVisibility
   * {
   *   UIGAMERTAGVISIBILITY_NONE,
   *   UIGAMERTAGVISIBILITY_ICON,
   *   UIGAMERTAGVISIBILITY_SIMPLE,
   *   UIGAMERTAGVISIBILITY_COMPLEX
   * };
   *
   * @param {number} gamerTagId
   * @param {number} visibility
   * @return {void}
   */
declare function SetMpGamerTagVisibility(gamerTagId: number, visibility: number): void;

/**
   * _SET_TEXT_COLOR
   * This native does nothing since build 1436, use _BG_SET_TEXT_COLOR (0x16FA5CE47F184F1E) instead.
   *
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @param {number} a
   * @return {void}
   */
declare function SetTextColor(r: number, g: number, b: number, a: number): void;

/**
   * _SHOW_HORSE_CORES
   *
   * @param {boolean} state
   * @return {void}
   */
declare function ShowHorseCores(state: boolean): void;

/**
   * _SHOW_PLAYER_CORES
   *
   * @param {boolean} state
   * @return {void}
   */
declare function ShowPlayerCores(state: boolean): void;

/**
   * _TEXT_BLOCK_DELETE
   *
   * @param {string | number} textBlock
   * @return {void}
   */
declare function TextBlockDelete(textBlock: string | number): void;

/**
   * _TEXT_BLOCK_IS_STREAMED
   *
   * @param {string | number} textBlock
   * @return {boolean}
   */
declare function TextBlockIsStreamed(textBlock: string | number): boolean;

/**
   * _UI_PROMPT_ADD_GROUP_LINK
   *
   * @param {any} p0
   * @param {number} prompt
   * @param {any} p2
   * @return {void}
   */
declare function UiPromptAddGroupLink(p0: any, prompt: Prompt, p2: any): void;

/**
   * _UI_PROMPT_ADD_GROUP_RETURN_LINK
   *
   * @param {any} p0
   * @param {number} prompt
   * @return {void}
   */
declare function UiPromptAddGroupReturnLink(p0: any, prompt: Prompt): void;

/**
   * _UI_PROMPT_CLEAR_HORIZONTAL_ORIENTATION
   * id is the return value from 0xD9459157EB22C895.
   *
   * @param {number} id
   * @return {void}
   */
declare function UiPromptClearHorizontalOrientation(id: number): void;

/**
   * _UI_PROMPT_CLEAR_PROMPT_PRIORITY_PREFERENCE
   *
  
   * @return {void}
   */
declare function UiPromptClearPromptPriorityPreference(): void;

/**
   * _UI_PROMPT_CONTEXT_SET_POINT
   *
   * @param {number} prompt
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {void}
   */
declare function UiPromptContextSetPoint(prompt: Prompt, x: number, y: number, z: number): void;

/**
   * _UI_PROMPT_CONTEXT_SET_RADIUS
   *
   * @param {number} prompt
   * @param {number} radius
   * @return {void}
   */
declare function UiPromptContextSetRadius(prompt: Prompt, radius: number): void;

/**
   * _UI_PROMPT_CONTEXT_SET_VOLUME
   * Attaches a Volume
   *
   * @param {number} prompt
   * @param {number} volume
   * @return {void}
   */
declare function UiPromptContextSetVolume(prompt: Prompt, volume: Volume): void;

/**
   * _UI_PROMPT_CREATE
   *
   * @param {number} inputHash
   * @param {string | number} labelName
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {number} p5
   * @return {number}
   */
declare function UiPromptCreate(inputHash: Hash, labelName: string | number, p2: any, p3: any, p4: any, p5: number): Prompt;

/**
   * _UI_PROMPT_DELETE
   *
   * @param {number} prompt
   * @return {void}
   */
declare function UiPromptDelete(prompt: Prompt): void;

/**
   * _UI_PROMPT_DISABLE_PROMPTS_THIS_FRAME
   *
  
   * @return {void}
   */
declare function UiPromptDisablePromptsThisFrame(): void;

/**
   * _UI_PROMPT_DISABLE_PROMPT_TYPE_THIS_FRAME
   *
   * @param {number} p0
   * @return {void}
   */
declare function UiPromptDisablePromptTypeThisFrame(p0: number): void;

/**
   * _UI_PROMPT_DOES_AMBIENT_GROUP_EXIST
   *
   * @param {number} hash
   * @return {boolean}
   */
declare function UiPromptDoesAmbientGroupExist(hash: Hash): boolean;

/**
   * _UI_PROMPT_ENABLE_PROMPT_TYPE_THIS_FRAME
   * https://github.com/femga/rdr3_discoveries/tree/master/graphics/HUD/prompts/prompt_types
   *
   * @param {number} p0
   * @return {void}
   */
declare function UiPromptEnablePromptTypeThisFrame(p0: number): void;

/**
   * _UI_PROMPT_FILTER_CLEAR
   *
  
   * @return {void}
   */
declare function UiPromptFilterClear(): void;

/**
   * _UI_PROMPT_GET_GROUP_ACTIVE_PAGE
   *
   * @param {number} hash
   * @return {number}
   */
declare function UiPromptGetGroupActivePage(hash: Hash): number;

/**
   * _UI_PROMPT_GET_GROUP_ID_FOR_SCENARIO_POINT
   *
   * @param {any} p0
   * @param {number} p1
   * @return {number}
   */
declare function UiPromptGetGroupIdForScenarioPoint(p0: any, p1: number): number;

/**
   * _UI_PROMPT_GET_GROUP_ID_FOR_TARGET_ENTITY
   *
   * @param {number} entity
   * @return {number}
   */
declare function UiPromptGetGroupIdForTargetEntity(entity: Entity): number;

/**
   * _UI_PROMPT_GET_MASH_MODE_PROGRESS
   *
   * @param {number} prompt
   * @return {number}
   */
declare function UiPromptGetMashModeProgress(prompt: Prompt): number;

/**
   * _UI_PROMPT_GET_PROGRESS
   *
   * @param {number} prompt
   * @return {number}
   */
declare function UiPromptGetProgress(prompt: Prompt): number;

/**
   * _UI_PROMPT_GET_URGENT_PULSING_ENABLED
   *
   * @param {number} prompt
   * @return {boolean}
   */
declare function UiPromptGetUrgentPulsingEnabled(prompt: Prompt): boolean;

/**
   * _UI_PROMPT_HAS_HOLD_AUTO_FILL_MODE
   *
   * @param {number} prompt
   * @return {boolean}
   */
declare function UiPromptHasHoldAutoFillMode(prompt: Prompt): boolean;

/**
   * _UI_PROMPT_HAS_HOLD_MODE
   *
   * @param {number} prompt
   * @return {boolean}
   */
declare function UiPromptHasHoldMode(prompt: Prompt): boolean;

/**
   * _UI_PROMPT_HAS_HOLD_MODE_COMPLETED
   *
   * @param {number} prompt
   * @return {boolean}
   */
declare function UiPromptHasHoldModeCompleted(prompt: Prompt): boolean;

/**
   * _UI_PROMPT_HAS_MANUAL_MASH_MODE
   *
   * @param {number} prompt
   * @return {boolean}
   */
declare function UiPromptHasManualMashMode(prompt: Prompt): boolean;

/**
   * _UI_PROMPT_HAS_MASH_MODE
   *
   * @param {number} prompt
   * @return {boolean}
   */
declare function UiPromptHasMashMode(prompt: Prompt): boolean;

/**
   * _UI_PROMPT_HAS_MASH_MODE_COMPLETED
   *
   * @param {number} prompt
   * @return {boolean}
   */
declare function UiPromptHasMashModeCompleted(prompt: Prompt): boolean;

/**
   * _UI_PROMPT_HAS_MASH_MODE_FAILED
   *
   * @param {number} prompt
   * @return {boolean}
   */
declare function UiPromptHasMashModeFailed(prompt: Prompt): boolean;

/**
   * _UI_PROMPT_HAS_PRESSED_TIMED_MODE_COMPLETED
   *
   * @param {number} prompt
   * @return {boolean}
   */
declare function UiPromptHasPressedTimedModeCompleted(prompt: Prompt): boolean;

/**
   * _UI_PROMPT_HAS_PRESSED_TIMED_MODE_FAILED
   *
   * @param {number} prompt
   * @return {boolean}
   */
declare function UiPromptHasPressedTimedModeFailed(prompt: Prompt): boolean;

/**
   * _UI_PROMPT_HAS_STANDARD_MODE_COMPLETED
   * Params: p1 is 0
   *
   * @param {number} prompt
   * @param {number} p1
   * @return {boolean}
   */
declare function UiPromptHasStandardModeCompleted(prompt: Prompt, p1: number): boolean;

/**
   * _UI_PROMPT_IS_ACTIVE
   *
   * @param {number} prompt
   * @return {boolean}
   */
declare function UiPromptIsActive(prompt: Prompt): boolean;

/**
   * _UI_PROMPT_IS_ENABLED
   *
   * @param {number} prompt
   * @return {boolean}
   */
declare function UiPromptIsEnabled(prompt: Prompt): boolean;

/**
   * _UI_PROMPT_IS_HOLD_MODE_RUNNING
   *
   * @param {number} prompt
   * @return {boolean}
   */
declare function UiPromptIsHoldModeRunning(prompt: Prompt): boolean;

/**
   * _UI_PROMPT_IS_JUST_PRESSED
   *
   * @param {number} prompt
   * @return {boolean}
   */
declare function UiPromptIsJustPressed(prompt: Prompt): boolean;

/**
   * _UI_PROMPT_IS_JUST_RELEASED
   *
   * @param {number} prompt
   * @return {boolean}
   */
declare function UiPromptIsJustReleased(prompt: Prompt): boolean;

/**
   * _UI_PROMPT_IS_PRESSED
   *
   * @param {number} prompt
   * @return {boolean}
   */
declare function UiPromptIsPressed(prompt: Prompt): boolean;

/**
   * _UI_PROMPT_IS_RELEASED
   *
   * @param {number} prompt
   * @return {boolean}
   */
declare function UiPromptIsReleased(prompt: Prompt): boolean;

/**
   * _UI_PROMPT_IS_VALID
   *
   * @param {number} prompt
   * @return {boolean}
   */
declare function UiPromptIsValid(prompt: Prompt): boolean;

/**
   * _UI_PROMPT_REGISTER_BEGIN
   *
  
   * @return {number}
   */
declare function UiPromptRegisterBegin(): Prompt;

/**
   * _UI_PROMPT_REGISTER_END
   *
   * @param {number} prompt
   * @return {void}
   */
declare function UiPromptRegisterEnd(prompt: Prompt): void;

/**
   * _UI_PROMPT_REMOVE_GROUP
   *
   * @param {number} prompt
   * @param {any} p1
   * @return {void}
   */
declare function UiPromptRemoveGroup(prompt: Prompt, p1: any): void;

/**
   * _UI_PROMPT_RESTART_MODES
   *
   * @param {number} prompt
   * @return {void}
   */
declare function UiPromptRestartModes(prompt: Prompt): void;

/**
   * _UI_PROMPT_SET_ACTIVE_GROUP_THIS_FRAME
   * Note: you must use VAR_STRING for p1 if string is not part of text database
   * tabAmount: specifies number of tabs in prompt group
   * tabDefaultIndex: specifies starting index
   * p3 if is set > 3 you can no longer press Q to change tab if there are more than one tab set in tabAmount
   *
   * @param {number} hash
   * @param {string | number} name
   * @param {number} tabAmount
   * @param {number} tabDefaultIndex
   * @param {number} p4
   * @param {number} prompt
   * @return {any}
   */
declare function UiPromptSetActiveGroupThisFrame(hash: Hash, name: string | number, tabAmount: number, tabDefaultIndex: number, p4: number, prompt: Prompt): any;

/**
   * _UI_PROMPT_SET_ALLOWED_ACTION
   *
   * @param {number} prompt
   * @param {number} action
   * @return {void}
   */
declare function UiPromptSetAllowedAction(prompt: Prompt, action: Hash): void;

/**
   * _UI_PROMPT_SET_AMBIENT_GROUP_THIS_FRAME
   *
   * @param {number} entity
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {number} p4
   * @param {string | number} name
   * @param {number} p6
   * @return {any}
   */
declare function UiPromptSetAmbientGroupThisFrame(entity: Entity, p1: number, p2: number, p3: number, p4: Hash, name: string | number, p6: number): any;

/**
   * _UI_PROMPT_SET_ATTRIBUTE
   * attribute: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/eUIPromptAttribute
   *
   * @param {number} prompt
   * @param {number} attribute
   * @param {boolean} enabled
   * @return {void}
   */
declare function UiPromptSetAttribute(prompt: Prompt, attribute: number, enabled: boolean): void;

/**
   * _UI_PROMPT_SET_BEAT_MODE
   *
   * @param {number} prompt
   * @param {boolean} toggle
   * @return {void}
   */
declare function UiPromptSetBeatMode(prompt: Prompt, toggle: boolean): void;

/**
   * _UI_PROMPT_SET_BEAT_MODE_GRAYED_OUT
   *
   * @param {number} prompt
   * @param {any} p1
   * @return {void}
   */
declare function UiPromptSetBeatModeGrayedOut(prompt: Prompt, p1: any): void;

/**
   * _UI_PROMPT_SET_CONTROL_ACTION
   *
   * @param {number} prompt
   * @param {number} action
   * @return {any}
   */
declare function UiPromptSetControlAction(prompt: Prompt, action: Hash): any;

/**
   * _UI_PROMPT_SET_ENABLED
   *
   * @param {number} prompt
   * @param {boolean} toggle
   * @return {void}
   */
declare function UiPromptSetEnabled(prompt: Prompt, toggle: boolean): void;

/**
   * _UI_PROMPT_SET_GROUP
   * tabIndex: specifies tab of prompt
   *
   * @param {number} prompt
   * @param {number} groupId
   * @param {number} tabIndex
   * @return {void}
   */
declare function UiPromptSetGroup(prompt: Prompt, groupId: number, tabIndex: number): void;

/**
   * _UI_PROMPT_SET_HOLD_AUTO_FILL_MODE
   *
   * @param {number} prompt
   * @param {number} autoFillTimeMs
   * @param {number} holdTimeMs
   * @return {void}
   */
declare function UiPromptSetHoldAutoFillMode(prompt: Prompt, autoFillTimeMs: number, holdTimeMs: number): void;

/**
   * _UI_PROMPT_SET_HOLD_AUTO_FILL_WITH_DECAY_MODE
   *
   * @param {number} prompt
   * @param {number} autoFillTimeMs
   * @param {number} holdTimeMs
   * @return {void}
   */
declare function UiPromptSetHoldAutoFillWithDecayMode(prompt: Prompt, autoFillTimeMs: number, holdTimeMs: number): void;

/**
   * _UI_PROMPT_SET_HOLD_INDEFINITELY_MODE
   *
   * @param {number} prompt
   * @return {void}
   */
declare function UiPromptSetHoldIndefinitelyMode(prompt: Prompt): void;

/**
   * _UI_PROMPT_SET_HOLD_MODE
   * Params: p2 is 304000 in R* SP Script coachrobberies
   *
   * @param {number} prompt
   * @param {number} holdTimeMs
   * @return {void}
   */
declare function UiPromptSetHoldMode(prompt: Prompt, holdTimeMs: number): void;

/**
   * _UI_PROMPT_SET_MANUAL_RESOLVED
   *
   * @param {number} prompt
   * @param {any} p1
   * @return {void}
   */
declare function UiPromptSetManualResolved(prompt: Prompt, p1: any): void;

/**
   * _UI_PROMPT_SET_MASH_AUTO_FILL_MODE
   *
   * @param {number} prompt
   * @param {number} autoFillTimeMs
   * @param {number} mashes
   * @return {void}
   */
declare function UiPromptSetMashAutoFillMode(prompt: Prompt, autoFillTimeMs: number, mashes: number): void;

/**
   * _UI_PROMPT_SET_MASH_INDEFINITELY_MODE
   *
   * @param {number} prompt
   * @return {void}
   */
declare function UiPromptSetMashIndefinitelyMode(prompt: Prompt): void;

/**
   * _UI_PROMPT_SET_MASH_MANUAL_CAN_FAIL_MODE
   *
   * @param {number} prompt
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {any} p4
   * @return {void}
   */
declare function UiPromptSetMashManualCanFailMode(prompt: Prompt, p1: number, p2: number, p3: number, p4: any): void;

/**
   * _UI_PROMPT_SET_MASH_MANUAL_MODE
   *
   * @param {number} prompt
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {any} p4
   * @return {void}
   */
declare function UiPromptSetMashManualMode(prompt: Prompt, p1: number, p2: number, p3: number, p4: any): void;

/**
   * _UI_PROMPT_SET_MASH_MANUAL_MODE_DECAY_SPEED
   * standard (prompt not held) rate: 0.035f
   * fast (prompt held) rate: 0.015f
   * punitive (been hit) rate: 0.14f
   *
   * @param {number} prompt
   * @param {number} speed
   * @return {void}
   */
declare function UiPromptSetMashManualModeDecaySpeed(prompt: Prompt, speed: number): void;

/**
   * _UI_PROMPT_SET_MASH_MANUAL_MODE_INCREASE_PER_PRESS
   * standard (prompt not held) rate: (1f / 128f)
   * fast (prompt held) rate: (1f / 64f)
   * punitive (been hit) rate: (1f / 128f)
   *
   * @param {number} prompt
   * @param {number} rate
   * @return {void}
   */
declare function UiPromptSetMashManualModeIncreasePerPress(prompt: Prompt, rate: number): void;

/**
   * _UI_PROMPT_SET_MASH_MANUAL_MODE_PRESSED_GROWTH_SPEED
   *
   * @param {number} prompt
   * @param {number} speed
   * @return {void}
   */
declare function UiPromptSetMashManualModePressedGrowthSpeed(prompt: Prompt, speed: number): void;

/**
   * _UI_PROMPT_SET_MASH_MODE
   *
   * @param {number} prompt
   * @param {number} mashes
   * @return {void}
   */
declare function UiPromptSetMashMode(prompt: Prompt, mashes: number): void;

/**
   * _UI_PROMPT_SET_MASH_WITH_RESISTANCE_CAN_FAIL_MODE
   * For startProgress, 0.0f - 1.0f is a percentage value, so 0.5f = 50% progress. Range: 0.0f - 1.0f
   * For decreaseSpeed, 0.0f will result in the prompt not showing the mash progress at all. 0.01f - ?.0f. At speeds around 7.0f to 8.0f the prompt basically fails immediately if you don't start mashing right away.
   *
   * @param {number} prompt
   * @param {number} mashes
   * @param {number} decreaseSpeed
   * @param {number} startProgress
   * @return {void}
   */
declare function UiPromptSetMashWithResistanceCanFailMode(prompt: Prompt, mashes: number, decreaseSpeed: number, startProgress: number): void;

/**
   * _UI_PROMPT_SET_MASH_WITH_RESISTANCE_MODE
   *
   * @param {number} prompt
   * @param {number} mashes
   * @param {number} p2
   * @param {number} p3
   * @return {void}
   */
declare function UiPromptSetMashWithResistanceMode(prompt: Prompt, mashes: number, p2: number, p3: number): void;

/**
   * _UI_PROMPT_SET_ORDERING_AS_INPUT_TYPE
   *
   * @param {number} prompt
   * @param {any} p1
   * @return {void}
   */
declare function UiPromptSetOrderingAsInputType(prompt: Prompt, p1: any): void;

/**
   * _UI_PROMPT_SET_PRESSED_TIMED_MODE
   *
   * @param {number} prompt
   * @param {number} depletionTimeMs
   * @return {void}
   */
declare function UiPromptSetPressedTimedMode(prompt: Prompt, depletionTimeMs: number): void;

/**
   * _UI_PROMPT_SET_PRIORITY
   * priority: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/ePromptPriority
   *
   * @param {number} prompt
   * @param {number} priority
   * @return {void}
   */
declare function UiPromptSetPriority(prompt: Prompt, priority: number): void;

/**
   * _UI_PROMPT_SET_PROMPT_PRIORITY_PREFERENCE
   *
   * @param {number} ped
   * @return {void}
   */
declare function UiPromptSetPromptPriorityPreference(ped: Ped): void;

/**
   * _UI_PROMPT_SET_REGISTER_HORIZONTAL_ORIENTATION
   * This returns an id that can be used with 0x6095358C4142932A.
   *
  
   * @return {number}
   */
declare function UiPromptSetRegisterHorizontalOrientation(): number;

/**
   * _UI_PROMPT_SET_ROTATE_MODE
   * Used for controllers
   *
   * @param {number} prompt
   * @param {number} p1
   * @param {boolean} counterclockwise
   * @return {void}
   */
declare function UiPromptSetRotateMode(prompt: Prompt, p1: number, counterclockwise: boolean): void;

/**
   * _UI_PROMPT_SET_SPINNER_POSITION
   *
   * @param {number} prompt
   * @param {any} p1
   * @return {void}
   */
declare function UiPromptSetSpinnerPosition(prompt: Prompt, p1: any): void;

/**
   * _UI_PROMPT_SET_SPINNER_SPEED
   *
   * @param {number} prompt
   * @param {any} p1
   * @return {void}
   */
declare function UiPromptSetSpinnerSpeed(prompt: Prompt, p1: any): void;

/**
   * _UI_PROMPT_SET_STANDARDIZED_HOLD_MODE
   * Hashes: SHORT_TIMED_EVENT_MP, SHORT_TIMED_EVENT, MEDIUM_TIMED_EVENT, LONG_TIMED_EVENT, RUSTLING_CALM_TIMING, PLAYER_FOCUS_TIMING, PLAYER_REACTION_TIMING
   *
   * @param {number} prompt
   * @param {number} timedEventHash
   * @return {void}
   */
declare function UiPromptSetStandardizedHoldMode(prompt: Prompt, timedEventHash: Hash): void;

/**
   * _UI_PROMPT_SET_STANDARD_MODE
   *
   * @param {number} prompt
   * @param {boolean} releaseMode
   * @return {void}
   */
declare function UiPromptSetStandardMode(prompt: Prompt, releaseMode: boolean): void;

/**
   * _UI_PROMPT_SET_TAG
   *
   * @param {number} prompt
   * @param {any} p1
   * @return {void}
   */
declare function UiPromptSetTag(prompt: Prompt, p1: any): void;

/**
   * _UI_PROMPT_SET_TARGET_MODE
   *
   * @param {number} prompt
   * @param {number} p1
   * @param {number} p2
   * @param {any} p3
   * @return {void}
   */
declare function UiPromptSetTargetMode(prompt: Prompt, p1: number, p2: number, p3: any): void;

/**
   * _UI_PROMPT_SET_TARGET_MODE_PROGRESS
   *
   * @param {number} prompt
   * @param {number} progress
   * @return {void}
   */
declare function UiPromptSetTargetModeProgress(prompt: Prompt, progress: number): void;

/**
   * _UI_PROMPT_SET_TARGET_MODE_TARGET
   *
   * @param {number} prompt
   * @param {number} p1
   * @param {number} p2
   * @return {void}
   */
declare function UiPromptSetTargetModeTarget(prompt: Prompt, p1: number, p2: number): void;

/**
   * _UI_PROMPT_SET_TEXT
   *
   * @param {number} prompt
   * @param {string | number} text
   * @return {void}
   */
declare function UiPromptSetText(prompt: Prompt, text: string | number): void;

/**
   * _UI_PROMPT_SET_TRANSPORT_MODE
   * TM_ANY = 0,
   * TM_ON_FOOT,
   * TM_IN_VEHICLE
   *
   * @param {number} prompt
   * @param {number} mode
   * @return {void}
   */
declare function UiPromptSetTransportMode(prompt: Prompt, mode: number): void;

/**
   * _UI_PROMPT_SET_TYPE
   * Params: type = mostly 0, 6 (net_mission_intro_story_gvo), 7 (fm_mission_controller), 14 (net_ugc_end_flow_transition_online), 15 (net_main_[tlg_]offline)
   *
   * @param {number} prompt
   * @param {number} type
   * @return {void}
   */
declare function UiPromptSetType(prompt: Prompt, type: number): void;

/**
   * _UI_PROMPT_SET_URGENT_PULSING_ENABLED
   *
   * @param {number} prompt
   * @param {boolean} toggle
   * @return {void}
   */
declare function UiPromptSetUrgentPulsingEnabled(prompt: Prompt, toggle: boolean): void;

/**
   * _UI_PROMPT_SET_VISIBLE
   *
   * @param {number} prompt
   * @param {boolean} toggle
   * @return {void}
   */
declare function UiPromptSetVisible(prompt: Prompt, toggle: boolean): void;

/**
   * _UI_PROMPT_WAS_BEAT_MODE_PRESSED_IN_TIME_WINDOW
   *
   * @param {number} prompt
   * @return {boolean}
   */
declare function UiPromptWasBeatModePressedInTimeWindow(prompt: Prompt): boolean;