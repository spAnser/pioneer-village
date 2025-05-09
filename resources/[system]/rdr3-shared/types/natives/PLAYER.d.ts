/**
 * BOOST_PLAYER_HORSE_SPEED_FOR_TIME
 *
 * @param {number} player
 * @param {number} speedBoost
 * @param {number} duration
 * @return {void}
 */
declare function BoostPlayerHorseSpeedForTime(player: Player, speedBoost: number, duration: number): void;

/**
 * CAN_PLAYER_START_MISSION
 *
 * @param {number} player
 * @return {boolean}
 */
declare function CanPlayerStartMission(player: Player): boolean;

/**
 * CLEAR_PLAYER_HAS_DAMAGED_AT_LEAST_ONE_NON_ANIMAL_PED
 *
 * @param {number} player
 * @return {void}
 */
declare function ClearPlayerHasDamagedAtLeastOneNonAnimalPed(player: Player): void;

/**
 * CLEAR_PLAYER_HAS_DAMAGED_AT_LEAST_ONE_PED
 *
 * @param {number} player
 * @return {void}
 */
declare function ClearPlayerHasDamagedAtLeastOnePed(player: Player): void;

/**
 * CLEAR_PLAYER_WANTED_LEVEL
 * nullsub, doesn't do anything
 *
 * @param {number} player
 * @return {void}
 */
declare function ClearPlayerWantedLevel(player: Player): void;

/**
 * DISABLE_PLAYER_FIRING
 * Inhibits the player from using any method of combat including melee and firearms.
 * 
 * NOTE: Only disables the firing for one frame
 *
 * @param {number} player
 * @param {boolean} toggle
 * @return {void}
 */
declare function DisablePlayerFiring(player: Player, toggle: boolean): void;

/**
 * EAGLE_EYE_SET_CUSTOM_ENTITY_TINT
 *
 * @param {number} entity
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @return {void}
 */
declare function EagleEyeSetCustomEntityTint(entity: Entity, red: number, green: number, blue: number): void;

/**
 * FORCE_CLEANUP
 *
 * @param {number} cleanupFlags
 * @return {void}
 */
declare function ForceCleanup(cleanupFlags: number): void;

/**
 * FORCE_CLEANUP_FOR_ALL_THREADS_WITH_THIS_NAME
 *
 * @param {string | number} name
 * @param {number} cleanupFlags
 * @return {void}
 */
declare function ForceCleanupForAllThreadsWithThisName(name: string | number, cleanupFlags: number): void;

/**
 * FORCE_CLEANUP_FOR_THREAD_WITH_THIS_ID
 *
 * @param {number} id
 * @param {number} cleanupFlags
 * @return {void}
 */
declare function ForceCleanupForThreadWithThisId(id: number, cleanupFlags: number): void;

/**
 * GET_CAUSE_OF_MOST_RECENT_FORCE_CLEANUP
 *

 * @return {number}
 */
declare function GetCauseOfMostRecentForceCleanup(): number;

/**
 * GET_DISCOVERABLE_NAME_HASH_AND_TYPE_FOR_ENTITY
 * Returns name hash (name) and outHash includes the type.
 *
 * @param {number} entity
 * @return {[number, number]}
 */
declare function GetDiscoverableNameHashAndTypeForEntity(entity: Entity): [number, number];

/**
 * GET_ENTITY_PLAYER_IS_FREE_AIMING_AT
 *
 * @param {number} player
 * @return {[boolean, Entity]}
 */
declare function GetEntityPlayerIsFreeAimingAt(player: Player): [boolean, Entity];

/**
 * GET_HAS_PLAYER_DISCOVERED_CHARACTER_NAME_MP
 *
 * @param {number} discoveryHash
 * @return {boolean}
 */
declare function GetHasPlayerDiscoveredCharacterNameMp(discoveryHash: Hash): boolean;

/**
 * GET_IS_PLAYER_UI_PROMPT_ACTIVE
 *
 * @param {number} player
 * @param {number} p1
 * @return {boolean}
 */
declare function GetIsPlayerUiPromptActive(player: Player, p1: number): boolean;

/**
 * GET_MAX_WANTED_LEVEL
 * Gets the maximum wanted level the player can get.
 * Ranges from 0 to 5.
 *

 * @return {number}
 */
declare function GetMaxWantedLevel(): number;

/**
 * GET_MOUNT_OWNED_BY_PLAYER
 *
 * @param {number} player
 * @return {number}
 */
declare function GetMountOwnedByPlayer(player: Player): Ped;

/**
 * GET_PLAYERS_LAST_VEHICLE
 *

 * @return {number}
 */
declare function GetPlayersLastVehicle(): Vehicle;

/**
 * GET_PLAYER_CURRENT_STEALTH_NOISE
 *
 * @param {number} player
 * @return {number}
 */
declare function GetPlayerCurrentStealthNoise(player: Player): number;

/**
 * GET_PLAYER_GROUP
 * Returns the group ID the player is member of.
 *
 * @param {number} player
 * @return {number}
 */
declare function GetPlayerGroup(player: Player): number;

/**
 * GET_PLAYER_INDEX
 * Returns the same as PLAYER_ID and NETWORK_PLAYER_ID_TO_INT
 *

 * @return {number}
 */
declare function GetPlayerIndex(): Player;

/**
 * GET_PLAYER_INTERACTION_TARGET_ENTITY
 *
 * @param {number} player
 * @param {boolean} p2
 * @param {boolean} p3
 * @return {[boolean, Entity]}
 */
declare function GetPlayerInteractionTargetEntity(player: Player, p2: boolean, p3: boolean): [boolean, Entity];

/**
 * GET_PLAYER_INVINCIBLE
 * Returns the player's invincibility status.
 *
 * @param {number} player
 * @return {boolean}
 */
declare function GetPlayerInvincible(player: Player): boolean;

/**
 * GET_PLAYER_NAME
 *
 * @param {number} player
 * @return {string | number}
 */
declare function GetPlayerName(player: Player): string | number;

/**
 * GET_PLAYER_PED
 *
 * @param {number} player
 * @return {number}
 */
declare function GetPlayerPed(player: Player): Ped;

/**
 * GET_PLAYER_PED_SCRIPT_INDEX
 * Does the same like PLAYER::GET_PLAYER_PED
 *
 * @param {number} player
 * @return {number}
 */
declare function GetPlayerPedScriptIndex(player: Player): Ped;

/**
 * GET_PLAYER_RECEIVED_BATTLE_EVENT_RECENTLY
 *
 * @param {number} player
 * @param {number} p1
 * @param {boolean} p2
 * @return {boolean}
 */
declare function GetPlayerReceivedBattleEventRecently(player: Player, p1: number, p2: boolean): boolean;

/**
 * GET_PLAYER_TARGET_ENTITY
 *
 * @param {number} player
 * @return {[boolean, Entity]}
 */
declare function GetPlayerTargetEntity(player: Player): [boolean, Entity];

/**
 * GET_PLAYER_TEAM
 * Gets the player's team.
 * Returns -1 in singleplayer.
 *
 * @param {number} player
 * @return {number}
 */
declare function GetPlayerTeam(player: Player): number;

/**
 * GET_PLAYER_WANTED_LEVEL
 *
 * @param {number} player
 * @return {number}
 */
declare function GetPlayerWantedLevel(player: Player): number;

/**
 * GET_TARGET_CHARACTER_NAME_FOR_LOCAL_PLAYER
 *
 * @param {number} ped
 * @return {number}
 */
declare function GetTargetCharacterNameForLocalPlayer(ped: Ped): number;

/**
 * GET_TARGET_CHARACTER_NAME_SCRIPT_OVERRIDE_HASH
 *
 * @param {number} ped
 * @return {number}
 */
declare function GetTargetCharacterNameScriptOverrideHash(ped: Ped): number;

/**
 * GET_TARGET_CHARACTER_NAME_SCRIPT_OVERRIDE_RAW_STRING
 *
 * @param {number} ped
 * @return {string | number}
 */
declare function GetTargetCharacterNameScriptOverrideRawString(ped: Ped): string | number;

/**
 * GET_WANTED_LEVEL_RADIUS
 *
 * @param {number} p0
 * @return {number}
 */
declare function GetWantedLevelRadius(p0: number): number;

/**
 * GET_WANTED_LEVEL_THRESHOLD
 *
 * @param {number} wantedLevel
 * @return {number}
 */
declare function GetWantedLevelThreshold(wantedLevel: number): number;

/**
 * HAS_FORCE_CLEANUP_OCCURRED
 *
 * @param {number} cleanupFlags
 * @return {boolean}
 */
declare function HasForceCleanupOccurred(cleanupFlags: number): boolean;

/**
 * HAS_PLAYER_BEEN_SPOTTED_IN_STOLEN_VEHICLE
 *
 * @param {number} player
 * @return {boolean}
 */
declare function HasPlayerBeenSpottedInStolenVehicle(player: Player): boolean;

/**
 * HAS_PLAYER_DAMAGED_AT_LEAST_ONE_NON_ANIMAL_PED
 *
 * @param {number} player
 * @return {boolean}
 */
declare function HasPlayerDamagedAtLeastOneNonAnimalPed(player: Player): boolean;

/**
 * HAS_PLAYER_DAMAGED_AT_LEAST_ONE_PED
 *
 * @param {number} player
 * @return {boolean}
 */
declare function HasPlayerDamagedAtLeastOnePed(player: Player): boolean;

/**
 * INT_TO_PARTICIPANTINDEX
 * Simply returns whatever is passed to it (Regardless of whether the handle is valid or not).
 *
 * @param {number} value
 * @return {number}
 */
declare function IntToParticipantindex(value: number): number;

/**
 * INT_TO_PLAYERINDEX
 * Simply returns whatever is passed to it (Regardless of whether the handle is valid or not).
 *
 * @param {number} value
 * @return {number}
 */
declare function IntToPlayerindex(value: number): Player;

/**
 * IS_PLAYER_BEING_ARRESTED
 * Return true while player is being arrested / busted.
 * 
 * If atArresting is set to 1, this function will return 1 when player is being arrested (while player is putting his hand up, but still have control)
 * 
 * If atArresting is set to 0, this function will return 1 only when the busted screen is shown.
 *
 * @param {number} player
 * @param {boolean} atArresting
 * @return {boolean}
 */
declare function IsPlayerBeingArrested(player: Player, atArresting: boolean): boolean;

/**
 * IS_PLAYER_CLIMBING
 * Returns TRUE if the player ('s ped) is climbing at the moment.
 *
 * @param {number} player
 * @return {boolean}
 */
declare function IsPlayerClimbing(player: Player): boolean;

/**
 * IS_PLAYER_CONTROL_ON
 * Returns whether the player can control himself.
 *
 * @param {number} player
 * @return {boolean}
 */
declare function IsPlayerControlOn(player: Player): boolean;

/**
 * IS_PLAYER_DEAD
 *
 * @param {number} player
 * @return {boolean}
 */
declare function IsPlayerDead(player: Player): boolean;

/**
 * IS_PLAYER_FREE_AIMING
 * Gets a value indicating whether the specified player is currently aiming freely.
 *
 * @param {number} player
 * @return {boolean}
 */
declare function IsPlayerFreeAiming(player: Player): boolean;

/**
 * IS_PLAYER_FREE_AIMING_AT_ENTITY
 * Gets a value indicating whether the specified player is currently aiming freely at the specified entity.
 *
 * @param {number} player
 * @param {number} entity
 * @return {boolean}
 */
declare function IsPlayerFreeAimingAtEntity(player: Player, entity: Entity): boolean;

/**
 * IS_PLAYER_PLAYING
 * Checks whether the specified player has a Ped, the Ped is not dead, is not injured and is not arrested.
 *
 * @param {number} player
 * @return {boolean}
 */
declare function IsPlayerPlaying(player: Player): boolean;

/**
 * IS_PLAYER_READY_FOR_CUTSCENE
 *
 * @param {number} player
 * @return {boolean}
 */
declare function IsPlayerReadyForCutscene(player: Player): boolean;

/**
 * IS_PLAYER_RIDING_TRAIN
 * Returns true if the player is riding a train.
 *
 * @param {number} player
 * @return {boolean}
 */
declare function IsPlayerRidingTrain(player: Player): boolean;

/**
 * IS_PLAYER_SCRIPT_CONTROL_ON
 *
 * @param {number} player
 * @return {boolean}
 */
declare function IsPlayerScriptControlOn(player: Player): boolean;

/**
 * IS_PLAYER_TARGETTING_ANYTHING
 *
 * @param {number} player
 * @return {boolean}
 */
declare function IsPlayerTargettingAnything(player: Player): boolean;

/**
 * IS_PLAYER_TARGETTING_ENTITY
 *
 * @param {number} player
 * @param {number} entity
 * @param {boolean} p2
 * @return {boolean}
 */
declare function IsPlayerTargettingEntity(player: Player, entity: Entity, p2: boolean): boolean;

/**
 * IS_PLAYER_TELEPORT_ACTIVE
 *

 * @return {boolean}
 */
declare function IsPlayerTeleportActive(): boolean;

/**
 * IS_PLAYER_WANTED_LEVEL_GREATER
 *
 * @param {number} player
 * @param {number} wantedLevel
 * @return {boolean}
 */
declare function IsPlayerWantedLevelGreater(player: Player, wantedLevel: number): boolean;

/**
 * IS_SYSTEM_UI_BEING_DISPLAYED
 *

 * @return {boolean}
 */
declare function IsSystemUiBeingDisplayed(): boolean;

/**
 * NETWORK_PLAYER_ID_TO_INT
 * Does exactly the same thing as PLAYER_ID()
 *

 * @return {number}
 */
declare function NetworkPlayerIdToInt(): number;

/**
 * PLAYER_ID
 * This returns YOUR 'identity' as a Player type.
 * 
 * Always returns 0 in story mode.
 *

 * @return {number}
 */
declare function PlayerId(): Player;

/**
 * PLAYER_PED_ID
 * Returns current player ped
 *

 * @return {number}
 */
declare function PlayerPedId(): Ped;

/**
 * REPORT_POLICE_SPOTTED_PLAYER
 *
 * @param {number} player
 * @return {void}
 */
declare function ReportPoliceSpottedPlayer(player: Player): void;

/**
 * RESET_LAW_RESPONSE_DELAY_OVERRIDE
 *

 * @return {void}
 */
declare function ResetLawResponseDelayOverride(): void;

/**
 * RESET_PLAYER_ARREST_STATE
 *
 * @param {number} player
 * @return {void}
 */
declare function ResetPlayerArrestState(player: Player): void;

/**
 * RESET_PLAYER_INPUT_GAIT
 *
 * @param {number} player
 * @return {void}
 */
declare function ResetPlayerInputGait(player: Player): void;

/**
 * RESET_WANTED_LEVEL_DIFFICULTY
 *
 * @param {number} player
 * @return {void}
 */
declare function ResetWantedLevelDifficulty(player: Player): void;

/**
 * RESTORE_PLAYER_STAMINA
 *
 * @param {number} player
 * @param {number} p1
 * @return {void}
 */
declare function RestorePlayerStamina(player: Player, p1: number): void;

/**
 * SET_AIR_DRAG_MULTIPLIER_FOR_PLAYERS_VEHICLE
 * This can be between 1.0f - 50.0f
 *
 * @param {number} player
 * @param {number} multiplier
 * @return {void}
 */
declare function SetAirDragMultiplierForPlayersVehicle(player: Player, multiplier: number): void;

/**
 * SET_ALL_NEUTRAL_RANDOM_PEDS_FLEE_THIS_FRAME
 *
 * @param {number} player
 * @return {void}
 */
declare function SetAllNeutralRandomPedsFleeThisFrame(player: Player): void;

/**
 * SET_ALL_RANDOM_PEDS_FLEE
 * Sets whether all random peds will run away from player if they are agitated (threatened) (bool=true), or some peds can stand up for themselves (bool=false).
 *
 * @param {number} player
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetAllRandomPedsFlee(player: Player, toggle: boolean): void;

/**
 * SET_ALL_RANDOM_PEDS_FLEE_THIS_FRAME
 *
 * @param {number} player
 * @return {void}
 */
declare function SetAllRandomPedsFleeThisFrame(player: Player): void;

/**
 * SET_EVERYONE_IGNORE_PLAYER
 *
 * @param {number} player
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetEveryoneIgnorePlayer(player: Player, toggle: boolean): void;

/**
 * SET_LAW_RESPONSE_DELAY_OVERRIDE
 *
 * @param {number} p0
 * @return {void}
 */
declare function SetLawResponseDelayOverride(p0: number): void;

/**
 * SET_LOCKON_TO_FRIENDLY_PLAYERS
 *
 * @param {number} player
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetLockonToFriendlyPlayers(player: Player, toggle: boolean): void;

/**
 * SET_MAX_WANTED_LEVEL
 *
 * @param {number} maxWantedLevel
 * @return {void}
 */
declare function SetMaxWantedLevel(maxWantedLevel: number): void;

/**
 * SET_MIN_TIME_BEFORE_HORSE_BUCKING
 *
 * @param {number} mount
 * @param {number} iMinBuckTime
 * @return {void}
 */
declare function SetMinTimeBeforeHorseBucking(mount: Ped, iMinBuckTime: number): void;

/**
 * SET_PED_AS_TEMP_PLAYER_HORSE
 *
 * @param {number} player
 * @param {number} horse
 * @return {boolean}
 */
declare function SetPedAsTempPlayerHorse(player: Player, horse: Ped): boolean;

/**
 * SET_PLAYER_CAN_BE_HASSLED_BY_GANGS
 * Sets whether this player can be hassled by gangs.
 *
 * @param {number} player
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetPlayerCanBeHassledByGangs(player: Player, toggle: boolean): void;

/**
 * SET_PLAYER_CAN_USE_COVER
 * Sets whether this player can take cover.
 *
 * @param {number} player
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetPlayerCanUseCover(player: Player, toggle: boolean): void;

/**
 * SET_PLAYER_CLOTH_PIN_FRAMES
 *
 * @param {number} ped
 * @param {number} p1
 * @return {void}
 */
declare function SetPlayerClothPinFrames(ped: Ped, p1: number): void;

/**
 * SET_PLAYER_CONTROL
 * flags: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/eSetPlayerControlFlags
 *
 * @param {number} player
 * @param {boolean} toggle
 * @param {number} flags
 * @param {boolean} bPreventHeadingChange
 * @return {void}
 */
declare function SetPlayerControl(player: Player, toggle: boolean, flags: number, bPreventHeadingChange: boolean): void;

/**
 * SET_PLAYER_FORCED_AIM
 *
 * @param {number} player
 * @param {boolean} toggle
 * @param {number} ped
 * @param {number} p3
 * @param {boolean} p4
 * @return {void}
 */
declare function SetPlayerForcedAim(player: Player, toggle: boolean, ped: Ped, p3: number, p4: boolean): void;

/**
 * SET_PLAYER_HEALTH_RECHARGE_MULTIPLIER
 *
 * @param {number} player
 * @param {number} regenRate
 * @return {void}
 */
declare function SetPlayerHealthRechargeMultiplier(player: Player, regenRate: number): void;

/**
 * SET_PLAYER_INVINCIBLE
 * Simply sets you as invincible (Health will not deplete).
 *
 * @param {number} player
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetPlayerInvincible(player: Player, toggle: boolean): void;

/**
 * SET_PLAYER_LOCKON
 *
 * @param {number} player
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetPlayerLockon(player: Player, toggle: boolean): void;

/**
 * SET_PLAYER_LOCKON_RANGE_OVERRIDE
 * Affects the range of auto aim target.
 *
 * @param {number} player
 * @param {number} range
 * @return {void}
 */
declare function SetPlayerLockonRangeOverride(player: Player, range: number): void;

/**
 * SET_PLAYER_MAY_NOT_ENTER_ANY_VEHICLE
 *
 * @param {number} player
 * @return {void}
 */
declare function SetPlayerMayNotEnterAnyVehicle(player: Player): void;

/**
 * SET_PLAYER_MAY_ONLY_ENTER_THIS_VEHICLE
 *
 * @param {number} player
 * @param {number} vehicle
 * @return {void}
 */
declare function SetPlayerMayOnlyEnterThisVehicle(player: Player, vehicle: Vehicle): void;

/**
 * SET_PLAYER_MELEE_WEAPON_DAMAGE_MODIFIER
 *
 * @param {number} player
 * @param {number} modifier
 * @return {void}
 */
declare function SetPlayerMeleeWeaponDamageModifier(player: Player, modifier: number): void;

/**
 * SET_PLAYER_MODEL
 * Make sure to request the model first and wait until it has loaded.
 *
 * @param {number} player
 * @param {number} modelHash
 * @param {boolean} p2
 * @return {void}
 */
declare function SetPlayerModel(player: Player, modelHash: Hash, p2: boolean): void;

/**
 * SET_PLAYER_NOISE_MULTIPLIER
 *
 * @param {number} player
 * @param {number} multiplier
 * @return {void}
 */
declare function SetPlayerNoiseMultiplier(player: Player, multiplier: number): void;

/**
 * SET_PLAYER_SIMULATE_AIMING
 *
 * @param {number} player
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetPlayerSimulateAiming(player: Player, toggle: boolean): void;

/**
 * SET_PLAYER_SNEAKING_NOISE_MULTIPLIER
 *
 * @param {number} player
 * @param {number} multiplier
 * @return {void}
 */
declare function SetPlayerSneakingNoiseMultiplier(player: Player, multiplier: number): void;

/**
 * SET_PLAYER_STAMINA_RECHARGE_MULTIPLIER
 *
 * @param {number} player
 * @param {number} multiplier
 * @return {void}
 */
declare function SetPlayerStaminaRechargeMultiplier(player: Player, multiplier: number): void;

/**
 * SET_PLAYER_TARGETING_MODE
 * Sets your targeting mode for when you're on foot.
 * enum eTargetingMode
 * {
 *   TARGETING_MODE_INVALID = -1,
 *   TARGETING_MODE_CAUSAL, (Wide)
 *   TARGETING_MODE_NORMAL,
 *   TARGETING_MODE_HARD, (Narrow)
 *   TARGETING_MODE_EXPERT (Free Aim)
 * };
 *
 * @param {number} targetMode
 * @return {void}
 */
declare function SetPlayerTargetingMode(targetMode: number): void;

/**
 * SET_PLAYER_TEAM
 * Sets the player's team.
 *
 * @param {number} player
 * @param {number} team
 * @param {boolean} bRestrictToThisScript
 * @return {void}
 */
declare function SetPlayerTeam(player: Player, team: number, bRestrictToThisScript: boolean): void;

/**
 * SET_PLAYER_WANTED_LEVEL
 * nullsub, doesn't do anything
 *
 * @param {number} player
 * @param {number} wantedLevel
 * @param {boolean} disableNoMission
 * @return {void}
 */
declare function SetPlayerWantedLevel(player: Player, wantedLevel: number, disableNoMission: boolean): void;

/**
 * SET_PLAYER_WEAPON_DAMAGE_MODIFIER
 * This modifies the damage value of your weapon. Whether it is a multiplier or base damage is unknown.
 *
 * @param {number} player
 * @param {number} modifier
 * @return {void}
 */
declare function SetPlayerWeaponDamageModifier(player: Player, modifier: number): void;

/**
 * SET_PLAYER_WEAPON_DEFENSE_MODIFIER
 *
 * @param {number} player
 * @param {number} modifier
 * @return {void}
 */
declare function SetPlayerWeaponDefenseModifier(player: Player, modifier: number): void;

/**
 * SET_PLAYER_WEAPON_TYPE_DAMAGE_MODIFIER
 *
 * @param {number} player
 * @param {number} weaponHash
 * @param {number} damageModifier
 * @return {void}
 */
declare function SetPlayerWeaponTypeDamageModifier(player: Player, weaponHash: Hash, damageModifier: number): void;

/**
 * SET_POLICE_RADAR_BLIPS
 * If toggle is set to false:
 *  The police won't be shown on the (mini)map
 * 
 * If toggle is set to true:
 *  The police will be shown on the (mini)map
 *
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetPoliceRadarBlips(toggle: boolean): void;

/**
 * SET_SWIM_MULTIPLIER_FOR_PLAYER
 * Swim speed multiplier.
 * Multiplier goes up to 1.49f
 *
 * @param {number} player
 * @param {number} multiplier
 * @return {void}
 */
declare function SetSwimMultiplierForPlayer(player: Player, multiplier: number): void;

/**
 * SET_WANTED_LEVEL_MULTIPLIER
 *
 * @param {number} multiplier
 * @return {void}
 */
declare function SetWantedLevelMultiplier(multiplier: number): void;

/**
 * SIMULATE_PLAYER_INPUT_GAIT
 *
 * @param {number} player
 * @param {number} speed
 * @param {number} duration
 * @param {number} heading
 * @param {boolean} p4
 * @param {boolean} p5
 * @return {void}
 */
declare function SimulatePlayerInputGait(player: Player, speed: number, duration: number, heading: number, p4: boolean, p5: boolean): void;

/**
 * START_PLAYER_TELEPORT
 *
 * @param {number} player
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} heading
 * @param {boolean} p5
 * @param {boolean} p6
 * @param {boolean} p7
 * @param {boolean} p8
 * @return {void}
 */
declare function StartPlayerTeleport(player: Player, x: number, y: number, z: number, heading: number, p5: boolean, p6: boolean, p7: boolean, p8: boolean): void;

/**
 * STOP_PLAYER_TELEPORT
 * Disables the player's teleportation
 *

 * @return {void}
 */
declare function StopPlayerTeleport(): void;

/**
 * SUPPRESS_WITNESSES_CALLING_POLICE_THIS_FRAME
 *
 * @param {number} player
 * @return {void}
 */
declare function SuppressWitnessesCallingPoliceThisFrame(player: Player): void;

/**
 * UPDATE_PLAYER_TELEPORT
 *
 * @param {number} player
 * @return {boolean}
 */
declare function UpdatePlayerTeleport(player: Player): boolean;

/**
 * UPDATE_WANTED_POSITION_THIS_FRAME
 *
 * @param {number} player
 * @return {void}
 */
declare function UpdateWantedPositionThisFrame(player: Player): void;

/**
 * _0x00B156AFEBCC5AE0
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x00B156AFEBCC5AE0(p0: any): void;

/**
 * _0x00EB5A760638DB55
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {void}
 */
declare function N_0x00EB5A760638DB55(p0: any, p1: any, p2: any): void;

/**
 * _0x03B4B759A8990505
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0x03B4B759A8990505(p0: any): any;

/**
 * _0x06C3DB00B69D5435
 *
 * @param {number} player
 * @param {string | number} p1
 * @return {void}
 */
declare function N_0x06C3DB00B69D5435(player: Player, p1: string | number): void;

/**
 * _0x06E1FB78B1E59CA5
 *
 * @param {number} ped
 * @param {boolean} p1
 * @return {void}
 */
declare function N_0x06E1FB78B1E59CA5(ped: Ped, p1: boolean): void;

/**
 * _0x086549F3B0381CB1
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x086549F3B0381CB1(p0: any, p1: any): void;

/**
 * _0x0869D499A7848309
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
declare function N_0x0869D499A7848309(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;

/**
 * _0x08E22898A6AF4905
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x08E22898A6AF4905(p0: any, p1: any): void;

/**
 * _0x0B7803F6F7BB43E0
 * Hardcoded to return zero/false.
 *

 * @return {any}
 */
declare function N_0x0B7803F6F7BB43E0(): any;

/**
 * _0x0E9057A9DA78D0F8
 *
 * @param {number} player
 * @param {number} bitflag
 * @return {void}
 */
declare function N_0x0E9057A9DA78D0F8(player: Player, bitflag: number): void;

/**
 * _0x0F4EAF69DA41AF43
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0x0F4EAF69DA41AF43(p0: any): any;

/**
 * _0x0F9CF06986300875
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x0F9CF06986300875(p0: any): void;

/**
 * _0x0FAF95D71ED67ADE
 *
 * @param {number} player
 * @param {string | number} p1
 * @return {void}
 */
declare function N_0x0FAF95D71ED67ADE(player: Player, p1: string | number): void;

/**
 * _0x107F2A66E1C4C83A
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x107F2A66E1C4C83A(p0: any): void;

/**
 * _0x113EF458AB6CDA67
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x113EF458AB6CDA67(p0: any, p1: any): void;

/**
 * _0x12E09E278C6C29B7
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x12E09E278C6C29B7(p0: any): void;

/**
 * _0x131E294EF60160DF
 *
 * @param {number} player
 * @param {number} p1
 * @param {number} p2
 * @param {number} p3
 * @param {number} p4
 * @param {any} p5
 * @return {void}
 */
declare function N_0x131E294EF60160DF(player: Player, p1: number, p2: number, p3: number, p4: number, p5: any): void;

/**
 * _0x14E57F88BA0A07FC
 *
 * @param {number} location
 * @return {void}
 */
declare function N_0x14E57F88BA0A07FC(location: Hash): void;

/**
 * _0x19B2C7A6C34FAD54
 *
 * @param {any} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0x19B2C7A6C34FAD54(p0: any, p1: any): any;

/**
 * _0x1A6E84F13C952094
 *
 * @param {number} player
 * @param {number} p1
 * @param {DataView} p2
 * @return {boolean}
 */
declare function N_0x1A6E84F13C952094(player: Player, p1: number, p2: DataView): boolean;

/**
 * _0x1AD8AD999C27F44A
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x1AD8AD999C27F44A(p0: any): void;

/**
 * _0x1D256EED194F5B58
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x1D256EED194F5B58(p0: any): void;

/**
 * _0x1DA5C5B0923E1B85
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0x1DA5C5B0923E1B85(p0: any): any;

/**
 * _0x1E8099F449ABB0BA
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0x1E8099F449ABB0BA(p0: any): any;

/**
 * _0x1F488807BC8E0630
 * _RESET_PLAYER_A* - _RESET_PLAYER_I*
 *
 * @param {number} player
 * @return {void}
 */
declare function N_0x1F488807BC8E0630(player: Player): void;

/**
 * _0x1FDA57E8908F2609
 *
 * @param {number} player
 * @param {number} ped
 * @param {boolean} useSteerassist
 * @return {void}
 */
declare function N_0x1FDA57E8908F2609(player: Player, ped: Ped, useSteerassist: boolean): void;

/**
 * _0x2009F8AB7A5E9D6D
 * _IS_PLAYER_F*
 *
 * @param {number} player
 * @return {boolean}
 */
declare function N_0x2009F8AB7A5E9D6D(player: Player): boolean;

/**
 * _0x21091B4BEB6376EE
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0x21091B4BEB6376EE(p0: any): any;

/**
 * _0x216BC0D3D2E413D2
 *
 * @param {number} player
 * @param {any} p1
 * @return {void}
 */
declare function N_0x216BC0D3D2E413D2(player: Player, p1: any): void;

/**
 * _0x22B3CABEDDB538B2
 *
 * @param {number} player
 * @param {number} p1
 * @return {void}
 */
declare function N_0x22B3CABEDDB538B2(player: Player, p1: number): void;

/**
 * _0x22C8B10802301381
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x22C8B10802301381(p0: any, p1: any): void;

/**
 * _0x263D69767F76059C
 *
 * @param {number} player
 * @param {number} p1
 * @return {void}
 */
declare function N_0x263D69767F76059C(player: Player, p1: number): void;

/**
 * _0x27AD7162D3FED01E
 *
 * @param {any} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0x27AD7162D3FED01E(p0: any, p1: any): any;

/**
 * _0x2B12B6FC8B8772AB
 *
 * @param {number} player
 * @param {number} p1
 * @return {void}
 */
declare function N_0x2B12B6FC8B8772AB(player: Player, p1: number): void;

/**
 * _0x2BB8D58E88777499
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x2BB8D58E88777499(p0: any): void;

/**
 * _0x2BEED53B912537D0
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {void}
 */
declare function N_0x2BEED53B912537D0(p0: any, p1: any, p2: any): void;

/**
 * _0x2C2D287748E8E9B7
 *
 * @param {boolean} p0
 * @return {void}
 */
declare function N_0x2C2D287748E8E9B7(p0: boolean): void;

/**
 * _0x2E1ABE627C95ED9B
 *

 * @return {any}
 */
declare function N_0x2E1ABE627C95ED9B(): any;

/**
 * _0x2E67707BEC52CA4B
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x2E67707BEC52CA4B(p0: any): void;

/**
 * _0x310CE349E0C0EC4B
 *
 * @param {number} player
 * @param {number} ped
 * @param {number} p2
 * @return {void}
 */
declare function N_0x310CE349E0C0EC4B(player: Player, ped: Ped, p2: number): void;

/**
 * _0x325434C68358D282
 * Only used in script function UPDATE_PLAYER_JUST_DIED_STATE
 *
 * @param {boolean} toggle
 * @return {void}
 */
declare function N_0x325434C68358D282(toggle: boolean): void;

/**
 * _0x330CA55A3647FA1C
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x330CA55A3647FA1C(p0: any, p1: any): void;

/**
 * _0x35A33783EC3C3448
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x35A33783EC3C3448(p0: any): void;

/**
 * _0x3813E11A378958A5
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0x3813E11A378958A5(p0: any): any;

/**
 * _0x3946FC742AC305CD
 *
 * @param {number} player
 * @param {number} ped
 * @param {string | number} p2
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} targetEntity
 * @param {string | number} p7
 * @return {void}
 */
declare function N_0x3946FC742AC305CD(player: Player, ped: Ped, p2: string | number, x: number, y: number, z: number, targetEntity: Entity, p7: string | number): void;

/**
 * _0x39D8D7082BC34B72
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x39D8D7082BC34B72(p0: any): void;

/**
 * _0x3A8611BD7BDE84F7
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x3A8611BD7BDE84F7(p0: any, p1: any): void;

/**
 * _0x3ACAC8832E77BC93
 * Used in script function INIT_DEADEYE_SLOWDOWN
 *
 * @param {number} player
 * @param {boolean} p1
 * @return {void}
 */
declare function N_0x3ACAC8832E77BC93(player: Player, p1: boolean): void;

/**
 * _0x3AD212429E095EFB
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x3AD212429E095EFB(p0: any, p1: any): void;

/**
 * _0x3B296934DB026873
 * nullsub, doesn't do anything
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x3B296934DB026873(p0: any, p1: any): void;

/**
 * _0x3BB84F812E052C90
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x3BB84F812E052C90(p0: any): void;

/**
 * _0x3C4AE8506638C7E2
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x3C4AE8506638C7E2(p0: any, p1: any): void;

/**
 * _0x3D9DA5C9EFD20D88
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x3D9DA5C9EFD20D88(p0: any, p1: any): void;

/**
 * _0x3DAABE78A23694BC
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x3DAABE78A23694BC(p0: any, p1: any): void;

/**
 * _0x45EF176B532CA851
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x45EF176B532CA851(p0: any, p1: any): void;

/**
 * _0x497A18F8F88AA9D8
 *

 * @return {void}
 */
declare function N_0x497A18F8F88AA9D8(): void;

/**
 * _0x4D1699543B1C023C
 * _SET_SPECIAL_ABILITY_*
 *
 * @param {number} player
 * @param {number} p1
 * @return {void}
 */
declare function N_0x4D1699543B1C023C(player: Player, p1: number): void;

/**
 * _0x4DBC4873707E8FD6
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @param {any} p3
 * @return {void}
 */
declare function N_0x4DBC4873707E8FD6(p0: any, p1: any, p2: any, p3: any): void;

/**
 * _0x4EC8BE63B8A5D4EF
 *
 * @param {number} player
 * @param {number} p1
 * @return {void}
 */
declare function N_0x4EC8BE63B8A5D4EF(player: Player, p1: number): void;

/**
 * _0x4F0D2256AAE94EDA
 *
 * @param {number} p0
 * @return {void}
 */
declare function N_0x4F0D2256AAE94EDA(p0: number): void;

/**
 * _0x51139D8C17B16FBC
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0x51139D8C17B16FBC(p0: any): any;

/**
 * _0x57028FD99886F6F9
 * _IS_PLAYER_D* - _IS_PLAYER_F*
 *

 * @return {boolean}
 */
declare function N_0x57028FD99886F6F9(): boolean;

/**
 * _0x570A13A4CA2799BB
 * Used in script function INIT_DEADEYE_SLOWDOWN
 *
 * @param {number} player
 * @param {boolean} p1
 * @return {void}
 */
declare function N_0x570A13A4CA2799BB(player: Player, p1: boolean): void;

/**
 * _0x57D9991DC1334151
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0x57D9991DC1334151(p0: any): any;

/**
 * _0x585CE159DB46FADB
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x585CE159DB46FADB(p0: any, p1: any): void;

/**
 * _0x5B7B97E99F84138B
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0x5B7B97E99F84138B(p0: any): any;

/**
 * _0x5C2E5E3CAEEB1F58
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {void}
 */
declare function N_0x5C2E5E3CAEEB1F58(p0: any, p1: any, p2: any): void;

/**
 * _0x621D1B289CAF5978
 * _IS_PLAYER_S* - _IS_PLAYER_T*
 *
 * @param {number} player
 * @return {boolean}
 */
declare function N_0x621D1B289CAF5978(player: Player): boolean;

/**
 * _0x628E742FE1F79C4A
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x628E742FE1F79C4A(p0: any, p1: any): void;

/**
 * _0x65887EAC535A0B0C
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x65887EAC535A0B0C(p0: any): void;

/**
 * _0x67659A8F248E0141
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x67659A8F248E0141(p0: any, p1: any): void;

/**
 * _0x6852288340B43239
 *
 * @param {any} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0x6852288340B43239(p0: any, p1: any): any;

/**
 * _0x694FFA4308060CD1
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x694FFA4308060CD1(p0: any, p1: any): void;

/**
 * _0x6C54E69516CC56BD
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0x6C54E69516CC56BD(p0: any): any;

/**
 * _0x6ECFC621A168424C
 *
 * @param {number} entity1
 * @param {number} entity2
 * @param {any} p2
 * @param {number} p3
 * @return {void}
 */
declare function N_0x6ECFC621A168424C(entity1: Entity, entity2: Entity, p2: any, p3: number): void;

/**
 * _0x6EDB5D08CB03E763
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x6EDB5D08CB03E763(p0: any, p1: any): void;

/**
 * _0x72AD59F7B7FB6E24
 * _HAS_PLAYER_D*
 *
 * @param {number} player
 * @param {number} p1
 * @return {boolean}
 */
declare function N_0x72AD59F7B7FB6E24(player: Player, p1: number): boolean;

/**
 * _0x73EB2EF2E92D23BF
 *

 * @return {boolean}
 */
declare function N_0x73EB2EF2E92D23BF(): boolean;

/**
 * _0x747257807B8721CE
 *
 * @param {any} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0x747257807B8721CE(p0: any, p1: any): any;

/**
 * _0x76F7E1BCD623A429
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x76F7E1BCD623A429(p0: any): void;

/**
 * _0x77B0B6D17A3AC9AA
 * nullsub, doesn't do anything
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x77B0B6D17A3AC9AA(p0: any, p1: any): void;

/**
 * _0x77E83C315A3B31CA
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x77E83C315A3B31CA(p0: any): void;

/**
 * _0x7AE93C45EC14A166
 * Only used in script function PROCESS_PED_INTERRUPT_DIALOGUE
 * _GET_PLAYER_*
 *
 * @param {number} player
 * @return {[boolean, Ped]}
 */
declare function N_0x7AE93C45EC14A166(player: Player): [boolean, Ped];

/**
 * _0x818241B3EDA84191
 * _SET_PLAYER_DAMAGE_* - _SET_PLAYER_DEFENSE_*
 *
 * @param {number} player
 * @param {boolean} p1
 * @return {void}
 */
declare function N_0x818241B3EDA84191(player: Player, p1: boolean): void;

/**
 * _0x83C989D5B5B5B466
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x83C989D5B5B5B466(p0: any, p1: any): void;

/**
 * _0x84481018E668E1B8
 *
 * @param {number} player
 * @param {number} ped
 * @param {any} p2
 * @return {void}
 */
declare function N_0x84481018E668E1B8(player: Player, ped: Ped, p2: any): void;

/**
 * _0x8591EE69CC3ED257
 * SET_PLAYER_S/T*
 *
 * @param {number} player
 * @param {boolean} toggle
 * @return {void}
 */
declare function N_0x8591EE69CC3ED257(player: Player, toggle: boolean): void;

/**
 * _0x8702D9150D9FBB3D
 *
 * @param {any} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0x8702D9150D9FBB3D(p0: any, p1: any): any;

/**
 * _0x8F44EBB3BA8F6D44
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x8F44EBB3BA8F6D44(p0: any, p1: any): void;

/**
 * _0x9044835BE9D9DBFE
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x9044835BE9D9DBFE(p0: any, p1: any): void;

/**
 * _0x9073EC5456651A90
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x9073EC5456651A90(p0: any, p1: any): void;

/**
 * _0x908D4B72854C8F62
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x908D4B72854C8F62(p0: any): void;

/**
 * _0x927861B2C08DBEA5
 * _GET_A* - _GET_C*
 *
 * @param {number} player
 * @return {boolean}
 */
declare function N_0x927861B2C08DBEA5(player: Player): boolean;

/**
 * _0x929DDD5538F3DF1F
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x929DDD5538F3DF1F(p0: any, p1: any): void;

/**
 * _0x93624B36E8851B42
 *
 * @param {number} player
 * @return {void}
 */
declare function N_0x93624B36E8851B42(player: Player): void;

/**
 * _0x9422743A5BA50E10
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0x9422743A5BA50E10(p0: any): any;

/**
 * _0x9461A8FAB0378E5B
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x9461A8FAB0378E5B(p0: any, p1: any): void;

/**
 * _0x988C9045531B9FCE
 *
 * @param {number} player
 * @param {string | number} p1
 * @return {void}
 */
declare function N_0x988C9045531B9FCE(player: Player, p1: string | number): void;

/**
 * _0x9AFCF9FE1884BF62
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x9AFCF9FE1884BF62(p0: any, p1: any): void;

/**
 * _0x9FC5A003FB76EDBD
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x9FC5A003FB76EDBD(p0: any, p1: any): void;

/**
 * _0xA0C683284DF027C7
 * Params: p1 is mostly 15, sometimes 1 in R* Scripts (Function: PLAYER_TOGGLE_PICK_UP_HATS)
 * _SET_PLAYER_*
 *
 * @param {number} player
 * @param {number} p1
 * @param {boolean} enable
 * @return {void}
 */
declare function N_0xA0C683284DF027C7(player: Player, p1: number, enable: boolean): void;

/**
 * _0xA28056CD1B04B250
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
 * @return {void}
 */
declare function N_0xA28056CD1B04B250(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any, p10: any): void;

/**
 * _0xA342495F93B7B838
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0xA342495F93B7B838(p0: any, p1: any): void;

/**
 * _0xA54000D4BFD90BDE
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0xA54000D4BFD90BDE(p0: any): any;

/**
 * _0xA62BBAAE67A05BB0
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0xA62BBAAE67A05BB0(p0: any): any;

/**
 * _0xAAED694CE814817F
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0xAAED694CE814817F(p0: any): any;

/**
 * _0xACA45DDCEF6071C4
 * _SET_PLAYER_CAN_BE_* - _SET_PLAYER_CAN_USE_*
 *
 * @param {number} player
 * @param {boolean} p1
 * @return {void}
 */
declare function N_0xACA45DDCEF6071C4(player: Player, p1: boolean): void;

/**
 * _0xB15CD2F9932C9AB5
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0xB15CD2F9932C9AB5(p0: any): any;

/**
 * _0xB331D8A73F9D2BDF
 * _IS_PLAYER_I* - _IS_PLAYER_P*
 *
 * @param {number} player
 * @param {DataView} p1
 * @return {boolean}
 */
declare function N_0xB331D8A73F9D2BDF(player: Player, p1: DataView): boolean;

/**
 * _0xBA5CA1FEB5DE0DF6
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @param {any} p3
 * @param {any} p4
 * @param {any} p5
 * @return {void}
 */
declare function N_0xBA5CA1FEB5DE0DF6(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;

/**
 * _0xBB6EA5D59E926095
 * NPEW__ENUM__EMOTE_CATEGORY_INVALID = -1
 * NPEW__ENUM__EMOTE_CATEGORY_ACTIONS
 * NPEW__ENUM__EMOTE_CATEGORY_ANTAGONIZE
 * NPEW__ENUM__EMOTE_CATEGORY_REACTIONS
 * NPEW__ENUM__EMOTE_CATEGORY_GREET
 * NPEW__ENUM__NUM_EMOTE_CATEGORIES
 * NPEW__ENUM__NUM_DISPLAY_TEXTURES
 *
 * @param {number} category
 * @param {number} emote
 * @return {void}
 */
declare function N_0xBB6EA5D59E926095(category: number, emote: Hash): void;

/**
 * _0xBBA140062B15A8AC
 * Used in script function INIT_DEADEYE_SLOWDOWN
 * _SPECIAL_ABILITY*
 *
 * @param {number} player
 * @return {void}
 */
declare function N_0xBBA140062B15A8AC(player: Player): void;

/**
 * _0xBC02B3D151D3859F
 *
 * @param {number} entity
 * @param {any} p1
 * @return {void}
 */
declare function N_0xBC02B3D151D3859F(entity: Entity, p1: any): void;

/**
 * _0xBD96185264DDAAEA
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0xBD96185264DDAAEA(p0: any, p1: any): void;

/**
 * _0xBEA3A6E5F5F79A6F
 * _GET_PLAYER_I*
 *
 * @param {any} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0xBEA3A6E5F5F79A6F(p0: any, p1: any): any;

/**
 * _0xBED386157F65942C
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0xBED386157F65942C(p0: any, p1: any): void;

/**
 * _0xBEFED69CE8317F91
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0xBEFED69CE8317F91(p0: any): any;

/**
 * _0xC177C827CEFC0AA4
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0xC177C827CEFC0AA4(p0: any, p1: any): void;

/**
 * _0xC4873B053054C04B
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
declare function N_0xC4873B053054C04B(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;

/**
 * _0xC58CE6824E604DEC
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0xC58CE6824E604DEC(p0: any): void;

/**
 * _0xC67A4910425F11F1
 * _DISABLE_*(PLAYER_FORCED_INTERACTION_LOCKON?)
 *
 * @param {number} player
 * @param {string | number} name
 * @return {void}
 */
declare function N_0xC67A4910425F11F1(player: Player, name: string | number): void;

/**
 * _0xC71D07C96946E263
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0xC71D07C96946E263(p0: any, p1: any): void;

/**
 * _0xC74EB3F2EC169F6B
 * Hardcoded to return zero/false.
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0xC74EB3F2EC169F6B(p0: any): any;

/**
 * _0xC900A465364A85D6
 *
 * @param {number} player
 * @return {void}
 */
declare function N_0xC900A465364A85D6(player: Player): void;

/**
 * _0xC93A9A45430D484E
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0xC93A9A45430D484E(p0: any): any;

/**
 * _0xCA59808E51FD67C4
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0xCA59808E51FD67C4(p0: any, p1: any): void;

/**
 * _0xCB0B9506BC91E441
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0xCB0B9506BC91E441(p0: any, p1: any): void;

/**
 * _0xCB61A63AA53D7D22
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0xCB61A63AA53D7D22(p0: any, p1: any): void;

/**
 * _0xCBB54CC7FFFFAB86
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @param {any} p3
 * @return {void}
 */
declare function N_0xCBB54CC7FFFFAB86(p0: any, p1: any, p2: any, p3: any): void;

/**
 * _0xCD7CA3013FD12749
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0xCD7CA3013FD12749(p0: any, p1: any): void;

/**
 * _0xCDDD4B74660E2335
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {void}
 */
declare function N_0xCDDD4B74660E2335(p0: any, p1: any, p2: any): void;

/**
 * _0xCEDC16930526F728
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0xCEDC16930526F728(p0: any): void;

/**
 * _0xCFB2EED4FCB7BD77
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {void}
 */
declare function N_0xCFB2EED4FCB7BD77(p0: any, p1: any, p2: any): void;

/**
 * _0xCFFC3ECCD7A5CCEB
 *
 * @param {number} player
 * @param {number} weapon
 * @param {boolean} p2
 * @return {void}
 */
declare function N_0xCFFC3ECCD7A5CCEB(player: Player, weapon: Hash, p2: boolean): void;

/**
 * _0xD1A70C1E8D1031FE
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0xD1A70C1E8D1031FE(p0: any, p1: any): void;

/**
 * _0xD1F6B912785BFD35
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0xD1F6B912785BFD35(p0: any): any;

/**
 * _0xD288E02E364972D2
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {void}
 */
declare function N_0xD288E02E364972D2(p0: any, p1: any, p2: any): void;

/**
 * _0xD48227263E3D06AE
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
declare function N_0xD48227263E3D06AE(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;

/**
 * _0xDA9D7BE231FE865F
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {any}
 */
declare function N_0xDA9D7BE231FE865F(p0: any, p1: any, p2: any): any;

/**
 * _0xDAB6A2FC56B7DE65
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0xDAB6A2FC56B7DE65(p0: any): any;

/**
 * _0xDC5E09D012D759C4
 *
 * @param {number} entity1
 * @param {number} entity2
 * @param {any} p2
 * @return {void}
 */
declare function N_0xDC5E09D012D759C4(entity1: Entity, entity2: Entity, p2: any): void;

/**
 * _0xDD33A82352C4652F
 *
 * @param {number} player
 * @param {number} ped
 * @param {number} p2
 * @return {void}
 */
declare function N_0xDD33A82352C4652F(player: Player, ped: Ped, p2: number): void;

/**
 * _0xDE6C85975F9D4894
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0xDE6C85975F9D4894(p0: any): any;

/**
 * _0xE1D356F5A66D0FFA
 *
 * @param {number} emote
 * @return {boolean}
 */
declare function N_0xE1D356F5A66D0FFA(emote: Hash): boolean;

/**
 * _0xE50A67C33514A390
 *
 * @param {any} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0xE50A67C33514A390(p0: any, p1: any): any;

/**
 * _0xE5D3EB37ABC1EB03
 * _CLEAR_FACIAL_* - _CLEAR_PED_BLOOD*
 *
 * @param {number} player
 * @return {void}
 */
declare function N_0xE5D3EB37ABC1EB03(player: Player): void;

/**
 * _0xE631EAF35828FA67
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0xE631EAF35828FA67(p0: any): any;

/**
 * _0xE7F8707269544B29
 * _IS_PLAYER_A* - _IS_PLAYER_BE*
 *
 * @param {number} player
 * @param {number} ped
 * @return {boolean}
 */
declare function N_0xE7F8707269544B29(player: Player, ped: Ped): boolean;

/**
 * _0xE910932F4B30BE23
 *
 * @param {number} player
 * @return {void}
 */
declare function N_0xE910932F4B30BE23(player: Player): void;

/**
 * _0xE92261BD28C0878F
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0xE92261BD28C0878F(p0: any): any;

/**
 * _0xE956C2340A76272E
 *
 * @param {any} p0
 * @return {any}
 */
declare function N_0xE956C2340A76272E(p0: any): any;

/**
 * _0xEACEBAAE0A33FB3F
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0xEACEBAAE0A33FB3F(p0: any): void;

/**
 * _0xEBB6E27AC2FF32DA
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @param {any} p3
 * @param {any} p4
 * @return {void}
 */
declare function N_0xEBB6E27AC2FF32DA(p0: any, p1: any, p2: any, p3: any, p4: any): void;

/**
 * _0xEBFF94328FF7A18A
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0xEBFF94328FF7A18A(p0: any, p1: any): void;

/**
 * _0xF21C7A3F3FFBA629
 * _CLEAR_FACIAL_* - _CLEAR_PED_BLOOD*
 *
 * @param {number} player
 * @return {void}
 */
declare function N_0xF21C7A3F3FFBA629(player: Player): void;

/**
 * _0xF4CB347D7B5EB0FD
 *

 * @return {any}
 */
declare function N_0xF4CB347D7B5EB0FD(): any;

/**
 * _0xF993373285053D77
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {void}
 */
declare function N_0xF993373285053D77(p0: any, p1: any, p2: any): void;

/**
 * _0xFA437FA0738C370C
 * Params: p1, p2, p3, p4 = 1.f, 0, 0, 0 in R* Scripts
 * _SPECIAL_ABILITY*
 *
 * @param {number} player
 * @param {number} p1
 * @param {number} p2
 * @param {number} p3
 * @param {number} p4
 * @return {void}
 */
declare function N_0xFA437FA0738C370C(player: Player, p1: number, p2: number, p3: number, p4: number): void;

/**
 * _0xFA7DAAE3959E6C7B
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0xFA7DAAE3959E6C7B(p0: any, p1: any): void;

/**
 * _ADD_PLAYER_AS_FOLLOW_TARGET
 * Used in script function: NET_AUTO_FOLLOW_UPDATE_LEADER_VALUES
 * followMode:
 * HORSEFOLLOWMODE_AUTO = 0,
 * HORSEFOLLOWMODE_SIDE_ONLY,
 * HORSEFOLLOWMODE_BEHIND_ONLY,
 * HORSEFOLLOWMODE_BEHIND_AND_SIDE,
 * HORSEFOLLOWMODE_BEHIND_CLOSE
 * followPriority:
 * HORSEFOLLOWPRIORITY_STEER_ASSIST = 0,
 * HORSEFOLLOWPRIORITY_AMBIENT,
 * HORSEFOLLOWPRIORITY_NORMAL,
 * HORSEFOLLOWPRIORITY_HIGH
 *
 * @param {number} player
 * @param {number} ped
 * @param {number} p2
 * @param {number} p3
 * @param {number} followMode
 * @param {number} followPriority
 * @param {boolean} p6
 * @return {void}
 */
declare function AddPlayerAsFollowTarget(player: Player, ped: Ped, p2: number, p3: number, followMode: number, followPriority: number, p6: boolean): void;

/**
 * _CLEAR_BOUNTY_TARGET
 *
 * @param {number} player
 * @return {void}
 */
declare function ClearBountyTarget(player: Player): void;

/**
 * _EAGLE_EYE_DISABLE_TRACKING_TRAIL
 *
 * @param {number} entity
 * @param {string | number} trail
 * @param {any} p2
 * @param {any} p3
 * @return {void}
 */
declare function EagleEyeDisableTrackingTrail(entity: Entity, trail: string | number, p2: any, p3: any): void;

/**
 * _EAGLE_EYE_SET_COLOR
 * false: default eagleeye color
 * true: green eagleeye color
 *
 * @param {number} player
 * @param {boolean} p1
 * @param {DataView} p2
 * @return {void}
 */
declare function EagleEyeSetColor(player: Player, p1: boolean, p2: DataView): void;

/**
 * _EAGLE_EYE_SET_CUSTOM_DISTANCE
 *
 * @param {number} entity
 * @param {number} distance
 * @return {void}
 */
declare function EagleEyeSetCustomDistance(entity: Entity, distance: number): void;

/**
 * _EAGLE_EYE_SET_DRAIN_RATE_MODIFIER
 *
 * @param {number} player
 * @param {number} modifier
 * @return {void}
 */
declare function EagleEyeSetDrainRateModifier(player: Player, modifier: number): void;

/**
 * _EAGLE_EYE_SET_FOCUS_ON_ASSOCIATED_CLUE_TRAIL
 *
 * @param {number} player
 * @param {number} linkedWaypointPed
 * @return {void}
 */
declare function EagleEyeSetFocusOnAssociatedClueTrail(player: Player, linkedWaypointPed: Entity): void;

/**
 * _EAGLE_EYE_SET_PLUS_FLAG_DISABLED
 *
 * @param {number} ped
 * @param {boolean} disabled
 * @return {void}
 */
declare function EagleEyeSetPlusFlagDisabled(ped: Ped, disabled: boolean): void;

/**
 * _EAGLE_EYE_SET_TRACKING_UPGRADE
 *
 * @param {number} player
 * @param {number} p1
 * @return {void}
 */
declare function EagleEyeSetTrackingUpgrade(player: Player, p1: number): void;

/**
 * _EAGLE_EYE_SET_TRACKING_UPGRADE_2
 *
 * @param {number} player
 * @param {number} p1
 * @return {void}
 */
declare function EagleEyeSetTrackingUpgrade_2(player: Player, p1: number): void;

/**
 * _ENABLE_CUSTOM_DEADEYE_ABILITY
 *
 * @param {number} player
 * @param {boolean} enable
 * @return {void}
 */
declare function EnableCustomDeadeyeAbility(player: Player, enable: boolean): void;

/**
 * _ENABLE_EAGLEEYE
 * (Un)lock Eagle Eye functionality
 *
 * @param {number} player
 * @param {boolean} enable
 * @return {void}
 */
declare function EnableEagleeye(player: Player, enable: boolean): void;

/**
 * _FORCE_REST_SCENARIO
 *
 * @param {boolean} toggle
 * @return {void}
 */
declare function ForceRestScenario(toggle: boolean): void;

/**
 * _FORMAT_PLAYER_NAME_STRING
 *
 * @param {string | number} string
 * @return {string | number}
 */
declare function FormatPlayerNameString(string: string | number): string | number;

/**
 * _GET_ACTIVE_HORSE_FOR_PLAYER
 *
 * @param {number} player
 * @return {number}
 */
declare function GetActiveHorseForPlayer(player: Player): Ped;

/**
 * _GET_AI_PLAYER_DEFENSE_MODIFIER_AGAINST_AI
 *
 * @param {number} player
 * @return {number}
 */
declare function GetAiPlayerDefenseModifierAgainstAi(player: Player): number;

/**
 * _GET_CONSTRUCTED_DISCOVERED_CHARACTER_NAME
 * p0: mostly Ped Hashes
 *
 * @param {number} p0
 * @param {boolean} model
 * @param {boolean} outfit
 * @return {number}
 */
declare function GetConstructedDiscoveredCharacterName(p0: Hash, model: boolean, outfit: boolean): number;

/**
 * _GET_DEADEYE_ABILITY_LEVEL
 *
 * @param {number} player
 * @return {number}
 */
declare function GetDeadeyeAbilityLevel(player: Player): number;

/**
 * _GET_HAS_PLAYER_DISCOVERED_CHARACTER_NAME_SP
 *
 * @param {number} player
 * @param {number} p1
 * @param {number} discoveryHash
 * @return {boolean}
 */
declare function GetHasPlayerDiscoveredCharacterNameSp(player: Player, p1: number, discoveryHash: Hash): boolean;

/**
 * _GET_IS_DEADEYE_TAGGING_ENABLED
 *
 * @param {number} player
 * @return {boolean}
 */
declare function GetIsDeadeyeTaggingEnabled(player: Player): boolean;

/**
 * _GET_NUM_MARKED_DEADEYE_TARGETS
 *
 * @param {number} player
 * @return {number}
 */
declare function GetNumMarkedDeadeyeTargets(player: Player): number;

/**
 * _GET_PLAYER_CACHED_DEAD_EYE_AMOUNT
 *
 * @param {number} player
 * @return {number}
 */
declare function GetPlayerCachedDeadEyeAmount(player: Player): number;

/**
 * _GET_PLAYER_DEAD_EYE
 *
 * @param {number} player
 * @return {number}
 */
declare function GetPlayerDeadEye(player: Player): number;

/**
 * _GET_PLAYER_DEAD_EYE_METER_LEVEL
 *
 * @param {number} player
 * @param {boolean} p1
 * @return {number}
 */
declare function GetPlayerDeadEyeMeterLevel(player: Player, p1: boolean): number;

/**
 * _GET_PLAYER_HEALTH
 *
 * @param {number} player
 * @return {number}
 */
declare function GetPlayerHealth(player: Player): number;

/**
 * _GET_PLAYER_HEALTH_RECHARGE_MULTIPLIER
 *
 * @param {number} player
 * @return {number}
 */
declare function GetPlayerHealthRechargeMultiplier(player: Player): number;

/**
 * _GET_PLAYER_HUNTING_WAGON
 *
 * @param {number} player
 * @return {number}
 */
declare function GetPlayerHuntingWagon(player: Player): Vehicle;

/**
 * _GET_PLAYER_MAX_DEAD_EYE
 *
 * @param {number} player
 * @param {any} p1
 * @return {number}
 */
declare function GetPlayerMaxDeadEye(player: Player, p1: any): number;

/**
 * _GET_PLAYER_MOOD
 * See _SET_PLAYER_MOOD
 *
 * @param {number} player
 * @return {number}
 */
declare function GetPlayerMood(player: Player): number;

/**
 * _GET_PLAYER_OWNER_OF_MOUNT
 *
 * @param {number} mount
 * @return {number}
 */
declare function GetPlayerOwnerOfMount(mount: Ped): Player;

/**
 * _GET_PLAYER_OWNER_OF_VEHICLE
 *
 * @param {number} vehicle
 * @return {number}
 */
declare function GetPlayerOwnerOfVehicle(vehicle: Vehicle): Player;

/**
 * _GET_PLAYER_PED_2
 *
 * @param {number} player
 * @return {number}
 */
declare function GetPlayerPed_2(player: Player): Ped;

/**
 * _GET_PLAYER_REQUIRED_DEAD_EYE_AMOUNT
 * If player has less Dead Eye than required, Dead Eye cant be triggered.
 *
 * @param {number} player
 * @return {number}
 */
declare function GetPlayerRequiredDeadEyeAmount(player: Player): number;

/**
 * _GET_PLAYER_RESET_FLAG
 * playerResetFlag: See 0x9F9A829C6751F3C7
 *
 * @param {number} player
 * @param {number} playerResetFlag
 * @return {boolean}
 */
declare function GetPlayerResetFlag(player: Player, playerResetFlag: number): boolean;

/**
 * _GET_PLAYER_SPECIAL_ABILITY_MULTIPLIER
 *
 * @param {number} player
 * @return {number}
 */
declare function GetPlayerSpecialAbilityMultiplier(player: Player): number;

/**
 * _GET_PLAYER_STAMINA
 *
 * @param {number} player
 * @return {number}
 */
declare function GetPlayerStamina(player: Player): number;

/**
 * _GET_PLAYER_STAMINA_DEPLETION_MULTIPLIER
 *
 * @param {number} player
 * @return {number}
 */
declare function GetPlayerStaminaDepletionMultiplier(player: Player): number;

/**
 * _GET_PLAYER_STAMINA_RECHARGE_MULTIPLIER
 *
 * @param {number} player
 * @return {number}
 */
declare function GetPlayerStaminaRechargeMultiplier(player: Player): number;

/**
 * _GET_PLAYER_UI_PROMPT_FOR_PED_IS_ENABLED
 * Returns true if PromptType is enabled for ped (mount)
 * Params: See 0x0751D461F06E41CE
 *
 * @param {number} player
 * @param {number} ped
 * @param {number} promptType
 * @param {number} promptMode
 * @return {boolean}
 */
declare function GetPlayerUiPromptForPedIsEnabled(player: Player, ped: Ped, promptType: number, promptMode: number): boolean;

/**
 * _GET_PLAYER_UI_PROMPT_IS_DISABLED
 * Returns false if PromptType is enabled
 * Params: See 0x0751D461F06E41CE
 *
 * @param {number} player
 * @param {number} promptType
 * @param {number} promptMode
 * @return {boolean}
 */
declare function GetPlayerUiPromptIsDisabled(player: Player, promptType: number, promptMode: number): boolean;

/**
 * _GET_PLAYER_WEAPON_DAMAGE
 *
 * @param {number} player
 * @param {number} weaponHash
 * @return {number}
 */
declare function GetPlayerWeaponDamage(player: Player, weaponHash: Hash): number;

/**
 * _GET_SADDLE_HORSE_FOR_PLAYER
 *
 * @param {number} player
 * @return {number}
 */
declare function GetSaddleHorseForPlayer(player: Player): Ped;

/**
 * _GET_TEMP_PLAYER_HORSE
 *
 * @param {number} player
 * @return {number}
 */
declare function GetTempPlayerHorse(player: Player): Ped;

/**
 * _GET_VEHICLE_OWNED_BY_PLAYER
 *
 * @param {number} player
 * @return {number}
 */
declare function GetVehicleOwnedByPlayer(player: Player): Vehicle;

/**
 * _GET_WANTED_LEVEL_MULTIPLIER
 * Returns -1.0f if no multiplier has been set
 *

 * @return {number}
 */
declare function GetWantedLevelMultiplier(): number;

/**
 * _IS_DEADEYE_ABILITY_LOCKED
 *
 * @param {number} player
 * @param {number} abilityType
 * @return {boolean}
 */
declare function IsDeadeyeAbilityLocked(player: Player, abilityType: number): boolean;

/**
 * _IS_EAGLE_EYE_REGISTERED_FOR_ENTITY
 *
 * @param {number} player
 * @param {number} entity
 * @return {boolean}
 */
declare function IsEagleEyeRegisteredForEntity(player: Player, entity: Entity): boolean;

/**
 * _IS_PLAYER_FOLLOWING_TARGET
 *
 * @param {number} player
 * @param {number} ped
 * @return {boolean}
 */
declare function IsPlayerFollowingTarget(player: Player, ped: Ped): boolean;

/**
 * _IS_PLAYER_FREE_FOCUSING
 * Checks if player is focused on any entity
 *
 * @param {number} player
 * @return {boolean}
 */
declare function IsPlayerFreeFocusing(player: Player): boolean;

/**
 * _IS_PLAYER_IN_SCOPE
 *
 * @param {number} player
 * @return {boolean}
 */
declare function IsPlayerInScope(player: Player): boolean;

/**
 * _IS_SECONDARY_SPECIAL_ABILITY_ACTIVE
 *
 * @param {number} player
 * @return {boolean}
 */
declare function IsSecondarySpecialAbilityActive(player: Player): boolean;

/**
 * _IS_SECONDARY_SPECIAL_ABILITY_ENABLED
 * Returns true if eagle eye is enabled for the player
 *
 * @param {number} player
 * @return {boolean}
 */
declare function IsSecondarySpecialAbilityEnabled(player: Player): boolean;

/**
 * _IS_SPECIAL_ABILITY_ACTIVE
 *
 * @param {number} player
 * @return {boolean}
 */
declare function IsSpecialAbilityActive(player: Player): boolean;

/**
 * _MODIFY_INFINITE_TRAIL_VISION
 * Toggle handles wether Deadeye and Eagleeye are infinite or not.
 *
 * @param {number} player
 * @param {boolean} toggle
 * @return {void}
 */
declare function ModifyInfiniteTrailVision(player: Player, toggle: boolean): void;

/**
 * _MODIFY_PLAYER_DISCOVERED_CHARACTER_NAME_MP_SET_UNDISCOVERED
 *
 * @param {number} discoveryHash
 * @return {void}
 */
declare function ModifyPlayerDiscoveredCharacterNameMpSetUndiscovered(discoveryHash: Hash): void;

/**
 * _MODIFY_PLAYER_UI_PROMPT
 * Params: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/ePromptType
 * promptType is mostly 34 (PP_TRACK_ANIMAL), promptMode = 0 (PP_MODE_BLOCK) in R* Scripts
 *
 * @param {number} player
 * @param {number} promptType
 * @param {number} promptMode
 * @param {boolean} disabled
 * @return {void}
 */
declare function ModifyPlayerUiPrompt(player: Player, promptType: number, promptMode: number, disabled: boolean): void;

/**
 * _MODIFY_PLAYER_UI_PROMPT_FOR_PED
 * Params: See 0x0751D461F06E41CE
 *
 * @param {number} player
 * @param {number} ped
 * @param {number} promptType
 * @param {number} promptMode
 * @param {boolean} enabled
 * @return {void}
 */
declare function ModifyPlayerUiPromptForPed(player: Player, ped: Ped, promptType: number, promptMode: number, enabled: boolean): void;

/**
 * _NETWORK_HAS_PLAYER_VALID_PED
 * Returns true if the given player has a valid ped.
 *
 * @param {number} player
 * @return {boolean}
 */
declare function NetworkHasPlayerValidPed(player: Player): boolean;

/**
 * _REGISTER_EAGLE_EYE_FOR_ENTITY
 * Used for setting up eagle eye for entity
 * Params: p2 = re-register or not?
 *
 * @param {number} player
 * @param {number} entity
 * @param {boolean} p2
 * @return {void}
 */
declare function RegisterEagleEyeForEntity(player: Player, entity: Entity, p2: boolean): void;

/**
 * _REGISTER_EAGLE_EYE_TRAILS_FOR_ENTITY
 *
 * @param {number} player
 * @param {number} entity
 * @param {any} p2
 * @return {void}
 */
declare function RegisterEagleEyeTrailsForEntity(player: Player, entity: Entity, p2: any): void;

/**
 * _REMOVE_PLAYER_AS_FOLLOW_TARGET
 *
 * @param {number} player
 * @param {number} ped
 * @return {void}
 */
declare function RemovePlayerAsFollowTarget(player: Player, ped: Ped): void;

/**
 * _SECONDARY_SPECIAL_ABILITY_SET_ACTIVE
 * Activates EagleEye, called together with 0x28A13BF6B05C3D83
 *
 * @param {number} player
 * @return {void}
 */
declare function SecondarySpecialAbilitySetActive(player: Player): void;

/**
 * _SECONDARY_SPECIAL_ABILITY_SET_DISABLED
 * Deactivates EagleEye, called together with 0xC0B21F235C02139C
 *
 * @param {number} player
 * @param {boolean} disabled
 * @return {void}
 */
declare function SecondarySpecialAbilitySetDisabled(player: Player, disabled: boolean): void;

/**
 * _SET_AI_PLAYER_DEFENSE_MODIFIER_AGAINST_AI
 * Sets Player's Defense against AI modifier
 *
 * @param {number} player
 * @param {number} modifier
 * @return {void}
 */
declare function SetAiPlayerDefenseModifierAgainstAi(player: Player, modifier: number): void;

/**
 * _SET_BOUNTY_TARGET
 *
 * @param {number} player
 * @param {number} target
 * @return {void}
 */
declare function SetBountyTarget(player: Player, target: Player): void;

/**
 * _SET_BOW_DRAW_REDUCTION_TIME_IN_DEADEYE
 *
 * @param {number} player
 * @param {number} drawReductionTime
 * @return {void}
 */
declare function SetBowDrawReductionTimeInDeadeye(player: Player, drawReductionTime: number): void;

/**
 * _SET_BOW_STAMINA_DRAIN_SPEED
 * Decreases Stamina bar drain speed by % when drawing a bow.
 *
 * @param {number} player
 * @param {number} staminaDrain
 * @return {void}
 */
declare function SetBowStaminaDrainSpeed(player: Player, staminaDrain: number): void;

/**
 * _SET_DAMAGE_CLOSE_DISTANCE_BONUS
 *
 * @param {number} player
 * @param {number} closeRangeLowerBound
 * @param {number} closeRangeUpperBound
 * @return {void}
 */
declare function SetDamageCloseDistanceBonus(player: Player, closeRangeLowerBound: number, closeRangeUpperBound: number): void;

/**
 * _SET_DAMAGE_CLOSE_DISTANCE_BONUS_TOTAL
 *
 * @param {number} player
 * @param {number} closeDamageBonus
 * @return {void}
 */
declare function SetDamageCloseDistanceBonusTotal(player: Player, closeDamageBonus: number): void;

/**
 * _SET_DAMAGE_FAR_DISTANCE_BONUS
 *
 * @param {number} player
 * @param {number} farRangeLowerBound
 * @param {number} farRangeUpperBound
 * @return {void}
 */
declare function SetDamageFarDistanceBonus(player: Player, farRangeLowerBound: number, farRangeUpperBound: number): void;

/**
 * _SET_DAMAGE_FAR_DISTANCE_BONUS_TOTAL
 *
 * @param {number} player
 * @param {number} farDamageBonus
 * @return {void}
 */
declare function SetDamageFarDistanceBonusTotal(player: Player, farDamageBonus: number): void;

/**
 * _SET_DEADEYE_ABILITY_DEPLETION_DELAY
 * Only used in R* SP Script short_update
 *
 * @param {number} player
 * @param {number} delay
 * @return {void}
 */
declare function SetDeadeyeAbilityDepletionDelay(player: Player, delay: number): void;

/**
 * _SET_DEADEYE_ABILITY_LEVEL
 * Max level is 5.
 *
 * @param {number} player
 * @param {number} level
 * @return {void}
 */
declare function SetDeadeyeAbilityLevel(player: Player, level: number): void;

/**
 * _SET_DEADEYE_ABILITY_LOCKED
 *
 * @param {number} player
 * @param {number} abilityType
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetDeadeyeAbilityLocked(player: Player, abilityType: number, toggle: boolean): void;

/**
 * _SET_DEADEYE_TAGGING_CONFIG
 *
 * @param {number} player
 * @param {number} filter
 * @return {void}
 */
declare function SetDeadeyeTaggingConfig(player: Player, filter: number): void;

/**
 * _SET_DEADEYE_TAGGING_ENABLED
 *
 * @param {number} player
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetDeadeyeTaggingEnabled(player: Player, toggle: boolean): void;

/**
 * _SET_DISABLE_PLAYER_WANTED_LEVEL
 * Disables the players ability to be wanted by lawmen
 *
 * @param {number} player
 * @param {boolean} disable
 * @return {void}
 */
declare function SetDisablePlayerWantedLevel(player: Player, disable: boolean): void;

/**
 * _SET_LOCAL_PLAYER_PERSONA_ABILITY_FLAG
 * see personaabilities.meta
 * enum ePersonaAbilityFlag
 * {
 *   PERSONA_CAN_AUTOESCAPE_FROM_LASSO,
 *   PERSONA_HAT_BLOCKS_FIRST_HEADSHOT,
 *   PERSONA_FULL_AUTO_FOR_ALL_WEAPONS,
 *   PERSONA_MIGHT_LIVE_AFTER_DEADLY_DAMAGE,
 *   PERSONA_IGNORE_AIM_BEFORE_FIRING_RESTRICTIONS,
 *   PERSONA_DEADEYE_INSTANT_RELOAD,
 *   PERSONA_USE_PHOSPHOROUS_ROUNDS,
 *   PERSONA_CONT_DEADEYE_ON_TAKING_COVER,
 *   PERSONA_CONT_DEADEYE_ON_RELOAD,
 *   PERSONA_CONT_DEADEYE_ON_SHOOTING,
 *   PERSONA_CONT_DEADEYE_ON_EXITING_AIM,
 *   PERSONA_DISABLE_PLAYER_CANCELLING_DEADEYE,
 *   PERSONA_CONT_DEADEYE_ON_RAGDOLL,
 *   PERSONA_USE_EXPLOSIVE_ROUNDS,
 *   PERSONA_EXIT_DEADEYE_ON_TAKING_DAMAGE,
 *   PERSONA_CARRY_TWO_MONEYBAGS,
 *   PERSONA_ABILITY_LONG_PICK_HERBS,
 *   PERSONA_ABILITY_UNBREAKABLE_LASSO,
 *   PERSONA_CONT_DEADEYE_ON_SPRINTING,
 *   PERSONA_CANT_DEAL_HEADSHOTS,
 *   PERSONA_HANGMAN,
 *   PERSONA_ALLOW_DEADEYE_WITH_MELEE_WEAPONS,
 *   PERSONA_ALLOW_DEADEYE_WHILE_UNARMED,
 *   PERSONA_DISABLE_DEADEYE_PERFECT_ACCURACY,
 *   PERSONA_CANT_DEAL_HEADSHOTS_TO_PLAYERS,
 *   PERSONA_CANT_DEAL_CRITICAL_DAMAGE,
 *   PERSONA_CANT_DEAL_CRITICAL_DAMAGE_TO_PLAYERS,
 *   PERSONA_ALLOW_EAGLEEYE_IN_COMBAT,
 *   PERSONA_CONT_EAGLEEYE_ON_SPRINT,
 *   PERSONA_SUPPRESS_LENGENDARY_EAGLEEYE_TRAIL_COLOR
 * };
 *
 * @param {number} flagId
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetLocalPlayerPersonaAbilityFlag(flagId: number, toggle: boolean): void;

/**
 * _SET_LOCKON_FOCUS_FIRE_VFX
 * Focus Fire VFX start for player: p1 = focusfire
 *
 * @param {number} player
 * @param {string | number} p1
 * @return {void}
 */
declare function SetLockonFocusFireVfx(player: Player, p1: string | number): void;

/**
 * _SET_MAX_WANTED_LEVEL_2
 *
 * @param {number} maxWantedLevel
 * @return {void}
 */
declare function SetMaxWantedLevel_2(maxWantedLevel: number): void;

/**
 * _SET_MOUNT_PROMPT_DISABLED
 *
 * @param {boolean} disabled
 * @return {void}
 */
declare function SetMountPromptDisabled(disabled: boolean): void;

/**
 * _SET_PED_ACTIVE_PLAYER_HORSE
 * Seems to work similar to 0xD2CB0FB0FDCB473D
 *
 * @param {number} player
 * @param {number} horse
 * @return {void}
 */
declare function SetPedActivePlayerHorse(player: Player, horse: Ped): void;

/**
 * _SET_PED_AS_SADDLE_HORSE_FOR_PLAYER
 *
 * @param {number} player
 * @param {number} mount
 * @return {void}
 */
declare function SetPedAsSaddleHorseForPlayer(player: Player, mount: Ped): void;

/**
 * _SET_PLAYER_CAN_MERCY_KILL
 *
 * @param {number} player
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetPlayerCanMercyKill(player: Player, toggle: boolean): void;

/**
 * _SET_PLAYER_DAMAGE_INFO_OVERRIDE
 * damageInfo: STANDARD_PED_DAMAGE, STANDARD_FEMALE_PED_DAMAGE, STANDARD_PLAYER_PED_DAMAGE_MP, STANDARD_FEMALE_PLAYER_PED_DAMAGE_MP
 *
 * @param {number} player
 * @param {string | number} damageInfo
 * @return {void}
 */
declare function SetPlayerDamageInfoOverride(player: Player, damageInfo: string | number): void;

/**
 * _SET_PLAYER_DEFENSE_MODIFIER
 * Sets stamina core drains peed using ranged damage scale and melee damage scale
 *
 * @param {number} player
 * @param {number} weaponDefenseMod
 * @param {number} meleeDefenseMod
 * @return {void}
 */
declare function SetPlayerDefenseModifier(player: Player, weaponDefenseMod: number, meleeDefenseMod: number): void;

/**
 * _SET_PLAYER_DEFENSE_TYPE_MODIFIER
 * bullet damage modifier: type = 4
 * explosive damage Defense mod: type = 7
 * fire damage Defense mod: type = 8, 15
 *
 * @param {number} player
 * @param {number} type
 * @param {number} defenseModifier
 * @return {void}
 */
declare function SetPlayerDefenseTypeModifier(player: Player, type: number, defenseModifier: number): void;

/**
 * _SET_PLAYER_EXPLOSIVE_WEAPON_DAMAGE_MODIFIER
 *
 * @param {number} player
 * @param {number} modifier
 * @return {void}
 */
declare function SetPlayerExplosiveWeaponDamageModifier(player: Player, modifier: number): void;

/**
 * _SET_PLAYER_HAS_DISCOVERED_CHARACTER_NAME_MP
 *
 * @param {number} discoveryHash
 * @return {void}
 */
declare function SetPlayerHasDiscoveredCharacterNameMp(discoveryHash: Hash): void;

/**
 * _SET_PLAYER_HAS_DISCOVERED_CHARACTER_NAME_SP
 *
 * @param {number} player
 * @param {number} p1
 * @param {number} discoveryHash
 * @return {void}
 */
declare function SetPlayerHasDiscoveredCharacterNameSp(player: Player, p1: number, discoveryHash: Hash): void;

/**
 * _SET_PLAYER_HEALTH_RECHARGE_TIME_MODIFIER
 * Setting player's Health recharge time to zero forces immediate health regen
 *
 * @param {number} player
 * @param {number} modifier
 * @return {void}
 */
declare function SetPlayerHealthRechargeTimeModifier(player: Player, modifier: number): void;

/**
 * _SET_PLAYER_HUNTING_WAGON
 * Only applies to HUNTERCART01
 *
 * @param {number} player
 * @param {number} wagon
 * @return {void}
 */
declare function SetPlayerHuntingWagon(player: Player, wagon: Vehicle): void;

/**
 * _SET_PLAYER_INTERACTION_NEGATIVE_RESPONSE
 *
 * @param {number} player
 * @param {string | number} speech
 * @return {void}
 */
declare function SetPlayerInteractionNegativeResponse(player: Player, speech: string | number): void;

/**
 * _SET_PLAYER_INTERACTION_POSITIVE_RESPONSE
 *
 * @param {number} player
 * @param {string | number} speech
 * @return {void}
 */
declare function SetPlayerInteractionPositiveResponse(player: Player, speech: string | number): void;

/**
 * _SET_PLAYER_IN_VEHICLE_TARGETING_MODE
 * Sets your targeting mode for when you're in a vehicle (perhaps a mount/horse).
 * see SET_PLAYER_TARGETING_MODE for eTargetingMode
 *
 * @param {number} targetMode
 * @return {void}
 */
declare function SetPlayerInVehicleTargetingMode(targetMode: number): void;

/**
 * _SET_PLAYER_LASSO_DAMAGE_PER_SECOND
 * _SET_PLAYER_A* - _SET_PLAYER_C*
 *
 * @param {number} player
 * @param {number} damage
 * @return {void}
 */
declare function SetPlayerLassoDamagePerSecond(player: Player, damage: number): void;

/**
 * _SET_PLAYER_LOCAL_ACCURACY_FLOOR_MODIFIER
 *
 * @param {number} player
 * @param {number} accuracy
 * @return {void}
 */
declare function SetPlayerLocalAccuracyFloorModifier(player: Player, accuracy: number): void;

/**
 * _SET_PLAYER_MANAGE_BUFF_SUPER_JUMP
 *
 * @param {number} player
 * @param {number} p1
 * @return {void}
 */
declare function SetPlayerManageBuffSuperJump(player: Player, p1: number): void;

/**
 * _SET_PLAYER_MAX_AMMO_OVERRIDE_FOR_AMMO_TYPE
 *
 * @param {number} player
 * @param {number} ammoType
 * @param {number} amount
 * @return {void}
 */
declare function SetPlayerMaxAmmoOverrideForAmmoType(player: Player, ammoType: Hash, amount: number): void;

/**
 * _SET_PLAYER_MOOD
 * mood: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/ePedMood
 *
 * @param {number} player
 * @param {number} mood
 * @return {void}
 */
declare function SetPlayerMood(player: Player, mood: number): void;

/**
 * _SET_PLAYER_MOUNT_STATE_ACTIVE
 * Name could potentially be inaccurate.
 * Used in Script Function HORSE_SETUP_PLAYER_HORSE_ATTRIBUTES (p1 = true)
 * _SET_PLAYER_L* - _SET_PLAYER_M*
 *
 * @param {number} player
 * @param {boolean} active
 * @return {void}
 */
declare function SetPlayerMountStateActive(player: Player, active: boolean): void;

/**
 * _SET_PLAYER_OWNS_MOUNT
 * Seems to enable active horse equipment prompt when being near it and enables the control that opens the inventory as well
 *
 * @param {number} player
 * @param {number} mount
 * @return {void}
 */
declare function SetPlayerOwnsMount(player: Player, mount: Ped): void;

/**
 * _SET_PLAYER_OWNS_VEHICLE
 *
 * @param {number} player
 * @param {number} vehicle
 * @return {void}
 */
declare function SetPlayerOwnsVehicle(player: Player, vehicle: Vehicle): void;

/**
 * _SET_PLAYER_REMOTE_ACCURACY_FLOOR_MODIFIER
 *
 * @param {number} player
 * @param {number} accuracy
 * @return {void}
 */
declare function SetPlayerRemoteAccuracyFloorModifier(player: Player, accuracy: number): void;

/**
 * _SET_PLAYER_RESET_FLAG
 * https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/ePlayerResetFlags
 * https://github.com/femga/rdr3_discoveries/tree/master/AI/PLAYER_RESET_FLAGS
 *
 * @param {number} player
 * @param {number} playerResetFlag
 * @param {boolean} p2
 * @return {void}
 */
declare function SetPlayerResetFlag(player: Player, playerResetFlag: number, p2: boolean): void;

/**
 * _SET_PLAYER_STAMINA_SPRINT_DEPLETION_MULTIPLIER
 *
 * @param {number} player
 * @param {number} multiplier
 * @return {void}
 */
declare function SetPlayerStaminaSprintDepletionMultiplier(player: Player, multiplier: number): void;

/**
 * _SET_PLAYER_STAT_FLAG_HASH
 * _N*, _O* or _PE*
 *
 * @param {number} player
 * @param {number} p1
 * @return {void}
 */
declare function SetPlayerStatFlagHash(player: Player, p1: Hash): void;

/**
 * _SET_PLAYER_TOTAL_ACCURACY_MODIFIER
 *
 * @param {number} player
 * @param {number} accuracy
 * @return {void}
 */
declare function SetPlayerTotalAccuracyModifier(player: Player, accuracy: number): void;

/**
 * _SET_PLAYER_TRAMPLE_DAMAGE_MODIFIER
 *
 * @param {number} player
 * @param {number} modifier
 * @return {void}
 */
declare function SetPlayerTrampleDamageModifier(player: Player, modifier: number): void;

/**
 * _SET_PLAYER_WEAPON_GROUP_AS_INSTANT_KILL
 *
 * @param {number} player
 * @param {number} weaponGroup
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetPlayerWeaponGroupAsInstantKill(player: Player, weaponGroup: Hash, toggle: boolean): void;

/**
 * _SET_PLAYER_WEAPON_GROUP_DAMAGE_MODIFIER
 *
 * @param {number} player
 * @param {number} weaponGroup
 * @param {number} modifier
 * @return {void}
 */
declare function SetPlayerWeaponGroupDamageModifier(player: Player, weaponGroup: Hash, modifier: number): void;

/**
 * _SET_RECEIVED_HORSEBACK_DAMAGE_DECREASE
 * Decreases the damage the player receives while on horseback
 *
 * @param {number} player
 * @param {number} damageDecrease
 * @return {void}
 */
declare function SetReceivedHorsebackDamageDecrease(player: Player, damageDecrease: number): void;

/**
 * _SET_SHOW_INFO_CARD
 *
 * @param {number} player
 * @param {boolean} showingInfoCard
 * @return {void}
 */
declare function SetShowInfoCard(player: Player, showingInfoCard: boolean): void;

/**
 * _SET_SPECIAL_ABILITY_ACTIVATION_COST
 *
 * @param {number} player
 * @param {number} activationCost
 * @param {number} p2
 * @return {void}
 */
declare function SetSpecialAbilityActivationCost(player: Player, activationCost: number, p2: number): void;

/**
 * _SET_SPECIAL_ABILITY_DISABLE_TIMER
 * Only used in R* SP Script short_update
 *
 * @param {number} player
 * @param {number} timer
 * @return {void}
 */
declare function SetSpecialAbilityDisableTimer(player: Player, timer: number): void;

/**
 * _SET_SPECIAL_ABILITY_DURATION_COST
 * durationCost: per second
 *
 * @param {number} player
 * @param {number} durationCost
 * @return {void}
 */
declare function SetSpecialAbilityDurationCost(player: Player, durationCost: number): void;

/**
 * _SET_SPECIAL_ABILITY_MULTIPLIER
 *
 * @param {number} player
 * @param {number} multiplier
 * @return {void}
 */
declare function SetSpecialAbilityMultiplier(player: Player, multiplier: number): void;

/**
 * _SET_SPECIAL_ABILITY_TYPE
 * SPECIAL_ABILITY_NONE = -1,
 * SPECIAL_ABILITY_CAR_SLOWDOWN,
 * SPECIAL_ABILITY_RAGE,
 * SPECIAL_ABILITY_BULLET_TIME,
 * SPECIAL_ABILITY_SNAPSHOT,
 * SPECIAL_ABILITY_INSULT,
 * SPECIAL_ABILITY_DEADEYE,
 * SPECIAL_ABILITY_REVIVE
 *
 * @param {number} player
 * @param {number} type
 * @return {void}
 */
declare function SetSpecialAbilityType(player: Player, type: number): void;

/**
 * _SET_USED_ITEM_EFFECT
 *
 * @param {number} health
 * @param {number} stamina
 * @param {number} deadeye
 * @param {number} healthCore
 * @param {number} staminaCore
 * @param {number} deadeyeCore
 * @return {void}
 */
declare function SetUsedItemEffect(health: number, stamina: number, deadeye: number, healthCore: number, staminaCore: number, deadeyeCore: number): void;

/**
 * _SET_WEAPON_DEGRADATION_MODIFIER
 *
 * @param {number} player
 * @param {number} modifier
 * @return {void}
 */
declare function SetWeaponDegradationModifier(player: Player, modifier: number): void;

/**
 * _SPECIAL_ABILITY_DRAIN_BY_AMOUNT
 * Drains Deadeye by given amount.
 *
 * @param {number} player
 * @param {number} amount
 * @param {any} p2
 * @return {void}
 */
declare function SpecialAbilityDrainByAmount(player: Player, amount: number, p2: any): void;

/**
 * _SPECIAL_ABILITY_GET_AMOUNT_CACHED
 * Returns Deadeye value from player
 *
 * @param {number} player
 * @return {number}
 */
declare function SpecialAbilityGetAmountCached(player: Player): number;

/**
 * _SPECIAL_ABILITY_RESTORE_BY_AMOUNT
 * Restores Deadeye by given amount.
 * Params: p2, p3, p4 = 0, 0, 1 in R* Scripts
 *
 * @param {number} player
 * @param {number} amount
 * @param {number} p2
 * @param {number} p3
 * @param {number} p4
 * @return {void}
 */
declare function SpecialAbilityRestoreByAmount(player: Player, amount: number, p2: number, p3: number, p4: number): void;

/**
 * _SPECIAL_ABILITY_RESTORE_OUTER_RING
 * Only used in R* SP Script short_update
 * Restores Deadeye Outer Ring
 *
 * @param {number} player
 * @param {number} amount
 * @return {void}
 */
declare function SpecialAbilityRestoreOuterRing(player: Player, amount: number): void;

/**
 * _SPECIAL_ABILITY_SET_DISABLED
 *
 * @param {number} player
 * @param {boolean} disabled
 * @return {void}
 */
declare function SpecialAbilitySetDisabled(player: Player, disabled: boolean): void;

/**
 * _SPECIAL_ABILITY_SET_EAGLE_EYE_DISABLED
 *
 * @param {number} player
 * @return {void}
 */
declare function SpecialAbilitySetEagleEyeDisabled(player: Player): void;

/**
 * _SPECIAL_ABILITY_START_RESTORE
 * Params: p1 = -1 in R* Scripts
 *
 * @param {number} player
 * @param {number} p1
 * @param {boolean} p2
 * @return {void}
 */
declare function SpecialAbilityStartRestore(player: Player, p1: number, p2: boolean): void;

/**
 * _UNREGISTER_EAGLE_EYE_FOR_ENTITY
 *
 * @param {number} player
 * @param {number} entity
 * @return {void}
 */
declare function UnregisterEagleEyeForEntity(player: Player, entity: Entity): void;

/**
 * _UNREGISTER_EAGLE_EYE_TRAILS_FOR_ENTITY
 *
 * @param {number} player
 * @param {number} entity
 * @param {any} p2
 * @return {void}
 */
declare function UnregisterEagleEyeTrailsForEntity(player: Player, entity: Entity, p2: any): void;