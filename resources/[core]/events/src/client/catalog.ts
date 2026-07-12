/**
 * Single source of truth for RDR3 script events: which event-group queue each
 * event lives in, how many int32 fields the native returns, and (optionally)
 * named field extraction for events consumers care about.
 *
 * Reference: https://github.com/femga/rdr3_discoveries/blob/master/AI/EVENTS
 * Event groups: 0 = SCRIPT_EVENT_QUEUE_AI, 1 = SCRIPT_EVENT_QUEUE_NETWORK,
 * 2 = unk (scenario), 3 = unk (UI/inventory).
 *
 * `size` must be exact - GET_EVENT_DATA rejects the read entirely (returns
 * failure) if it doesn't match the event's real field count, for any group.
 * EVENT_NETWORK_LASSO_ATTACH's size was wrong (2 instead of 3) and looked
 * like a "group 1 doesn't work" bug until a size sweep found the native
 * succeeds at size 3. See GET_EVENT_DATA-LIMITATION.md for the investigation
 * - double-check any other group 1-3 sizes here against the reference before
 * relying on them, since they haven't all been live-verified.
 */

export type FieldType = 'i' | 'f';

export type EventDef = {
  group: 0 | 1 | 2 | 3;
  size: number;
  fields?: Record<string, { index: number; type: FieldType }>;
};

export const EVENT_CATALOG = {
  // Group 0 - SCRIPT_EVENT_QUEUE_AI
  EVENT_BUCKED_OFF: { group: 0, size: 3 },
  EVENT_CALCULATE_LOOT: { group: 0, size: 26 },
  EVENT_CALM_PED: { group: 0, size: 4 },
  EVENT_CARRIABLE_UPDATE_CARRY_STATE: {
    group: 0,
    size: 5,
    fields: {
      carriable: { index: 0, type: 'i' },
      ped: { index: 1, type: 'i' },
      ped2: { index: 2, type: 'i' },
      dropped: { index: 4, type: 'i' },
    },
  },
  EVENT_CARRIABLE_PROMPT_INFO_REQUEST: { group: 0, size: 6 },
  EVENT_CARRIABLE_VEHICLE_STOW_START: { group: 0, size: 5 },
  EVENT_CARRIABLE_VEHICLE_STOW_COMPLETE: { group: 0, size: 3 },
  EVENT_CHALLENGE_GOAL_COMPLETE: { group: 0, size: 1 },
  EVENT_CHALLENGE_GOAL_UPDATE: { group: 0, size: 1 },
  EVENT_CHALLENGE_REWARD: { group: 0, size: 3 },
  EVENT_CONTAINER_INTERACTION: { group: 0, size: 4 },
  EVENT_CRIME_CONFIRMED: {
    group: 0,
    size: 3,
    fields: {
      crimeTypeHash: { index: 0, type: 'i' },
      criminal: { index: 1, type: 'i' },
      witness: { index: 2, type: 'i' },
    },
  },
  EVENT_DAILY_CHALLENGE_STREAK_COMPLETED: { group: 0, size: 1 },
  EVENT_ENTITY_BROKEN: { 
    group: 0,
    size: 9,
    fields: {
      entity: { index: 0, type: 'i' },
      x: { index: 6, type: 'f' },
      y: { index: 7, type: 'f' },
      z: { index: 8, type: 'f' },
    }
  },
  EVENT_ENTITY_DAMAGED: {
    group: 0,
    size: 9,
    fields: {
      attacked: { index: 0, type: 'i' },
      attacker: { index: 2, type: 'i' },
      weaponHash: { index: 4, type: 'i' },
      ammoHash: { index: 6, type: 'i' },
      x: { index: 12, type: 'f' },
      y: { index: 14, type: 'f' },
      z: { index: 16, type: 'f' },
    },
  },
  EVENT_ENTITY_DESTROYED: {
    group: 0,
    size: 9,
    fields: {
      entity: { index: 0, type: 'i' },
      entityWhichCausedDamage: { index: 1, type: 'i' },
      weaponHash: { index: 2, type: 'i' },
      ammoHash: { index: 3, type: 'i' },
      damage: { index: 4, type: 'f' },
      //
      x: { index: 6, type: 'f' },
      y: { index: 7, type: 'f' },
      z: { index: 8, type: 'f' },
    },
  },
  EVENT_ENTITY_DISARMED: { group: 0, size: 4 },
  EVENT_ENTITY_EXPLOSION: {
    group: 0,
    size: 6,
    fields: {
      pedOrigin: { index: 0, type: 'i' },
      weaponHash: { index: 2, type: 'i' },
      x: { index: 3, type: 'f' },
      y: { index: 4, type: 'f' },
      z: { index: 5, type: 'f' },
    },
  },
  EVENT_ENTITY_HOGTIED: { group: 0, size: 3 },
  EVENT_HEADSHOT_BLOCKED_BY_HAT: { group: 0, size: 2 },
  EVENT_HELP_TEXT_REQUEST: { group: 0, size: 4 },
  EVENT_HITCH_ANIMAL: { group: 0, size: 4 },
  EVENT_HOGTIED_ENTITY_PICKED_UP: { group: 0, size: 2 },
  EVENT_HORSE_BROKEN: { group: 0, size: 3 },
  EVENT_IMPENDING_SAMPLE_PROMPT: { group: 0, size: 2 },
  EVENT_INVENTORY_ITEM_PICKED_UP: { group: 0, size: 5 },
  EVENT_INVENTORY_ITEM_REMOVED: { group: 0, size: 1 },
  EVENT_ITEM_PROMPT_INFO_REQUEST: { group: 0, size: 2 },
  EVENT_LOOT: { group: 0, size: 36 },
  EVENT_LOOT_COMPLETE: {
    group: 0,
    size: 3,
    fields: {
      playerPed: { index: 0, type: 'i' },
      entity: { index: 2, type: 'i' },
    },
  },
  EVENT_LOOT_PLANT_START: { group: 0, size: 36 },
  EVENT_LOOT_VALIDATION_FAIL: { group: 0, size: 2 },
  EVENT_MISS_INTENDED_TARGET: {
    group: 0,
    size: 3,
    fields: {
      shooter: { index: 0, type: 'i' },
      victim: { index: 1, type: 'i' },
      weaponHash: { index: 2, type: 'i' },
    }
  },
  EVENT_MOUNT_OVERSPURRED: { group: 0, size: 6 },
  EVENT_OBJECT_INTERACTION: { group: 0, size: 10 },
  EVENT_PED_ANIMAL_INTERACTION: {
    group: 0,
    size: 3,
    fields: {
      entity: { index: 2, type: 'i' },
      interaction: { index: 4, type: 'i' },
    },
  },
  EVENT_PED_CREATED: { group: 0, size: 1 },
  EVENT_PED_DESTROYED: { group: 0, size: 1 },
  EVENT_PED_HAT_KNOCKED_OFF: { group: 0, size: 2 },
  EVENT_PED_WHISTLE: { group: 0, size: 2 },
  EVENT_PICKUP_CARRIABLE: {
    group: 0,
    size: 4,
    fields: {
      ped: { index: 0, type: 'i' },
      carriable: { index: 1, type: 'i' },
      fromEntity: { index: 2, type: 'i' },
      entity: { index: 3, type: 'i' },
    },
  },
  EVENT_PLACE_CARRIABLE_ONTO_PARENT: {
    group: 0,
    size: 6,
    fields: {
      ped: { index: 0, type: 'i' },
      carriable: { index: 1, type: 'i' },
      parent: { index: 2, type: 'i' },
      slot: { index: 3, type: 'i' },
      subSlot: { index: 4, type: 'i' },
      provision: { index: 5, type: 'i' },
    },
  },
  EVENT_PLAYER_COLLECTED_AMBIENT_PICKUP: { group: 0, size: 8 },
  EVENT_PLAYER_ESCALATED_PED: {
    group: 0,
    size: 2,
    fields: {
      playerPed: { index: 0, type: 'i' },
      escalatedPed: { index: 1, type: 'i' },
    },
  },
  EVENT_PLAYER_HAT_EQUIPPED: {
    group: 0,
    size: 10,
    fields: {
      ped: { index: 0, type: 'i' },
      hat: { index: 1, type: 'i' },
      palette: { index: 6, type: 'i' },
      tint0: { index: 7, type: 'i' },
      tint1: { index: 8, type: 'i' },
      tint2: { index: 9, type: 'i' },
    },
  },
  EVENT_PLAYER_HAT_KNOCKED_OFF: {
    group: 0,
    size: 5,
    fields: {
      originPed: { index: 0, type: 'i' },
      causePed: { index: 1, type: 'i' },
      hat: { index: 2, type: 'i' },
    },
  },
  EVENT_PLAYER_HORSE_AGITATED_BY_ANIMAL: { group: 0, size: 4 },
  EVENT_PLAYER_MOUNT_WILD_HORSE: { group: 0, size: 1 },
  EVENT_PLAYER_PROMPT_TRIGGERED: { group: 0, size: 10 },
  EVENT_RAN_OVER_PED: { group: 0, size: 2 },
  EVENT_REVIVE_ENTITY: { group: 0, size: 3 },
  EVENT_SHOT_FIRED_BULLET_IMPACT: {
    group: 0,
    size: 1,
    fields: {
      shooter: { index: 0, type: 'i' },
    },
  },
  EVENT_SHOT_FIRED_WHIZZED_BY: { 
    group: 0,
    size: 1,
    fields: {
      victim: { index: 0, type: 'i' },
    },
  },
  EVENT_STAT_VALUE_CHANGED: { group: 0, size: 2 },
  EVENT_TRIGGERED_ANIMAL_WRITHE: { group: 0, size: 2 },
  EVENT_VEHICLE_CREATED: {
    group: 0,
    size: 1,
    fields: {
      vehicle: { index: 0, type: 'i' },
    },
  },
  EVENT_VEHICLE_DESTROYED: {
    group: 0,
    size: 1,
    fields: {
      vehicle: { index: 0, type: 'i' },
    },
  },

  // Group 1 - SCRIPT_EVENT_QUEUE_NETWORK
  EVENT_NETWORK_AWARD_CLAIMED: { group: 1, size: 12 },
  EVENT_NETWORK_BOUNTY_REQUEST_COMPLETE: { group: 1, size: 7 },
  EVENT_NETWORK_BULLET_IMPACTED_MULTIPLE_PEDS: {
    group: 1,
    size: 4,
    fields: {
      shooter: { index: 0, type: 'i' },
      numImpacts: { index: 1, type: 'i' },
      numKilled: { index: 2, type: 'i' },
      numIncapacitated: { index: 3, type: 'i' },
    },
  },
  EVENT_NETWORK_CASHINVENTORY_TRANSACTION: { group: 1, size: 6 },
  EVENT_NETWORK_CREW_CREATION: { group: 1, size: 10 },
  EVENT_NETWORK_CREW_DISBANDED: { group: 1, size: 2 },
  EVENT_NETWORK_CREW_INVITE_RECEIVED: { group: 1, size: 11 },
  EVENT_NETWORK_CREW_JOINED: { group: 1, size: 2 },
  EVENT_NETWORK_CREW_KICKED: { group: 1, size: 2 },
  EVENT_NETWORK_CREW_LEFT: { group: 1, size: 2 },
  EVENT_NETWORK_CREW_RANK_CHANGE: { group: 1, size: 7 },
  EVENT_NETWORK_DAMAGE_ENTITY: {
    group: 1,
    size: 32,
    fields: {
      damagedEntity: { index: 0, type: 'i' },
      killerEntity: { index: 1, type: 'i' },
      damage: { index: 2, type: 'f' },
      isVictimDestroyed: { index: 3, type: 'i' },
      isVictimIncapacitated: { index: 4, type: 'i' },
      weaponHashUsed: { index: 5, type: 'i' },
      ammoHashUsed: { index: 6, type: 'i' },
      instigatedWeaponHash: { index: 7, type: 'i' },
      victimSpeed: { index: 8, type: 'i' },
      attackerSpeed: { index: 9, type: 'i' },
      isResponsibleForCollision: { index: 10, type: 'i' },
      isHeadShot: { index: 11, type: 'i' },
      isWithMeleeWeapon: { index: 12, type: 'i' },
      isVictimExecuted: { index: 13, type: 'i' },
      victimBledOut: { index: 14, type: 'i' },
      attackerWasScopedIn: { index: 15, type: 'i' },
      attackerSpecialAbilityActive: { index: 16, type: 'i' },
      victimHogtied: { index: 17, type: 'i' },
      victimMounted: { index: 18, type: 'i' },
      victimInVehicle: { index: 19, type: 'i' },
      victimInCover: { index: 20, type: 'i' },
      attackerShotLastBullet: { index: 21, type: 'i' },
      victimKilledByStealth: { index: 22, type: 'i' },
      victimKilledByTakedown: { index: 23, type: 'i' },
      victimKnockedOut: { index: 24, type: 'i' },
      isVictimTranquillized: { index: 25, type: 'i' },
      victimKilledByStandardMelee: { index: 26, type: 'i' },
      victimMissionEntity: { index: 27, type: 'i' },
      victimFleeing: { index: 28, type: 'i' },
      victimInCombat: { index: 29, type: 'i' },
      //
      isSuicide: { index: 30, type: 'i' },
    }
  },
  EVENT_NETWORK_GANG: { group: 1, size: 18 },
  EVENT_NETWORK_GANG_WAYPOINT_CHANGED: { group: 1, size: 3 },
  EVENT_NETWORK_HOGTIE_BEGIN: { group: 1, size: 2 },
  EVENT_NETWORK_HOGTIE_END: { group: 1, size: 2 },
  EVENT_NETWORK_HUB_UPDATE: { group: 1, size: 1 },
  EVENT_NETWORK_INCAPACITATED_ENTITY: { group: 1, size: 4 },
  // size confirmed as 3 via live testing (catalog previously had 2, which made
  // GET_EVENT_DATA reject the read entirely). attacker confirmed against a
  // live test (matched the tester's own ped id). indices 0/2 unconfirmed -
  // observed values don't look like ped/entity handles (index 2 in
  // particular looks too large, possibly a timestamp)
  EVENT_NETWORK_LASSO_ATTACH: {
    group: 1,
    size: 3,
    fields: {
      victim: { index: 0, type: 'i' },
      attacker: { index: 1, type: 'i' },
    },
  },
  EVENT_NETWORK_LASSO_DETACH: { group: 1, size: 2 },
  EVENT_NETWORK_LOOT_CLAIMED: { group: 1, size: 9 },
  EVENT_NETWORK_MINIGAME_REQUEST_COMPLETE: { group: 1, size: 6 },
  EVENT_NETWORK_PED_DISARMED: { group: 1, size: 3 },
  EVENT_NETWORK_PED_HAT_SHOT_OFF: { group: 1, size: 3 },
  EVENT_NETWORK_PERMISSION_CHECK_RESULT: { group: 1, size: 2 },
  EVENT_NETWORK_PICKUP_COLLECTION_FAILED: { group: 1, size: 3 },
  EVENT_NETWORK_PICKUP_RESPAWNED: { group: 1, size: 2 },
  EVENT_NETWORK_PLAYER_COLLECTED_PICKUP: { group: 1, size: 8 },
  EVENT_NETWORK_PLAYER_COLLECTED_PORTABLE_PICKUP: { group: 1, size: 3 },
  EVENT_NETWORK_PLAYER_DROPPED_PORTABLE_PICKUP: { group: 1, size: 3 },
  EVENT_NETWORK_PLAYER_JOIN_SCRIPT: { group: 1, size: 41 },
  EVENT_NETWORK_PLAYER_LEFT_SCRIPT: { group: 1, size: 41 },
  EVENT_NETWORK_PLAYER_JOIN_SESSION: { group: 1, size: 10 },
  EVENT_NETWORK_PLAYER_LEFT_SESSION: { group: 1, size: 10 },
  EVENT_NETWORK_PLAYER_MISSED_SHOT: {
    group: 1,
    size: 9,
    fields: {
      shooter: { index: 0, type: 'i' },
      weaponHash: { index: 1, type: 'i' },
    }
  },
  EVENT_NETWORK_POSSE_CREATED: { group: 1, size: 10 },
  EVENT_NETWORK_POSSE_DATA_CHANGED: { group: 1, size: 2 },
  EVENT_NETWORK_POSSE_DISBANDED: { group: 1, size: 2 },
  EVENT_NETWORK_POSSE_EX_ADMIN_DISBANDED: { group: 1, size: 9 },
  EVENT_NETWORK_POSSE_EX_INACTIVE_DISBANDED: { group: 1, size: 10 },
  EVENT_NETWORK_POSSE_JOINED: { group: 1, size: 2 },
  EVENT_NETWORK_POSSE_LEADER_SET_ACTIVE: { group: 1, size: 23 },
  EVENT_NETWORK_POSSE_LEFT: { group: 1, size: 1 },
  EVENT_NETWORK_POSSE_MEMBER_DISBANDED: { group: 1, size: 23 },
  EVENT_NETWORK_POSSE_MEMBER_JOINED: { group: 1, size: 23 },
  EVENT_NETWORK_POSSE_MEMBER_KICKED: { group: 1, size: 23 },
  EVENT_NETWORK_POSSE_MEMBER_LEFT: { group: 1, size: 23 },
  EVENT_NETWORK_POSSE_MEMBER_SET_ACTIVE: { group: 1, size: 23 },
  EVENT_NETWORK_PROJECTILE_ATTACHED: { group: 1, size: 6 },
  EVENT_NETWORK_PROJECTILE_NO_DAMAGE_IMPACT: { group: 1, size: 2 },
  EVENT_NETWORK_REVIVED_ENTITY: { group: 1, size: 2 },
  EVENT_NETWORK_SESSION_EVENT: { group: 1, size: 10 },
  EVENT_NETWORK_SESSION_MERGE_END: { group: 1, size: 1 },
  EVENT_NETWORK_SESSION_MERGE_START: { group: 1, size: 1 },
  EVENT_NETWORK_VEHICLE_LOOTED: { group: 1, size: 3 },
  EVENT_NETWORK_VEHICLE_UNDRIVABLE: { group: 1, size: 3 },

  // Group 2 - scenario events
  EVENT_SCENARIO_ADD_PED: { group: 2, size: 2 },
  EVENT_SCENARIO_DESTROY_PROP: { group: 2, size: 2 },
  EVENT_SCENARIO_REMOVE_PED: { group: 2, size: 2 },

  // Group 3 - UI events
  EVENT_UI_ITEM_INSPECT_ACTIONED: { group: 3, size: 6 },
  EVENT_UI_QUICK_ITEM_USED: { group: 3, size: 6 },
} as const satisfies Record<string, EventDef>;

export type EventName = keyof typeof EVENT_CATALOG;

export const EVENT_GROUPS = [...new Set(Object.values(EVENT_CATALOG).map((def) => def.group))];

/**
 * Events confirmed common/high-frequency in normal play. Excluded from the
 * discovery log (events:log_all) so it stays useful for spotting genuinely
 * unfamiliar events, but still registerable as normal by any consumer.
 */
export const NOISY_EVENTS = new Set<EventName>([
  'EVENT_PED_CREATED',
  'EVENT_PED_DESTROYED',
  'EVENT_HITCH_ANIMAL',
  'EVENT_VEHICLE_CREATED',
  'EVENT_VEHICLE_DESTROYED',
  'EVENT_CHALLENGE_GOAL_UPDATE',
  'EVENT_ENTITY_BROKEN',
]);
