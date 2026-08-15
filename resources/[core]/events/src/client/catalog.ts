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
 * succeeds at size 3. double-check any other group 1-3 sizes here against
 * the reference before relying on them, since they haven't all been live-verified.
 */

export type FieldType = 'i' | 'f';

export type EventDef = {
  group: 0 | 1 | 2 | 3;
  size: number;
  fields?: Record<string, { index: number; type: FieldType }>;
};

export const EVENT_CATALOG = {
  // Group 0 - SCRIPT_EVENT_QUEUE_AI
  EVENT_BUCKED_OFF: {
    group: 0,
    size: 3,
    fields: {
      rider: { index: 0, type: 'i' },
      mount: { index: 1, type: 'i' },
      _unk2: { index: 2, type: 'i' },
    },
  },
  EVENT_CALCULATE_LOOT: {
    group: 0,
    size: 26,
    fields: {
      _unk0: { index: 0, type: 'i' },
      _unk1: { index: 1, type: 'i' },
      inventoryItemHash: { index: 2, type: 'i' },
      consumableActionHash: { index: 3, type: 'i' },
      _unk4: { index: 4, type: 'i' },
      _unk5: { index: 5, type: 'i' },
      _unk6: { index: 6, type: 'i' },
      _unk7: { index: 7, type: 'i' },
      _unk8: { index: 8, type: 'i' },
      _unk9: { index: 9, type: 'i' },
      _unk10: { index: 10, type: 'i' },
      _unk11: { index: 11, type: 'i' },
      _unk12: { index: 12, type: 'i' },
      _unk13: { index: 13, type: 'i' },
      _unk14: { index: 14, type: 'i' },
      _unk15: { index: 15, type: 'i' },
      _unk16: { index: 16, type: 'i' },
      _unk17: { index: 17, type: 'i' },
      _unk18: { index: 18, type: 'i' },
      _unk19: { index: 19, type: 'i' },
      _unk20: { index: 20, type: 'i' },
      _unk21: { index: 21, type: 'i' },
      _unk22: { index: 22, type: 'i' },
      looter: { index: 23, type: 'i' },
      looted: { index: 24, type: 'i' },
      _unk25: { index: 25, type: 'i' },
    },
  },
  EVENT_CALM_PED: {
    group: 0,
    size: 4,
    fields: {
      calmer: { index: 0, type: 'i' },
      mount: { index: 1, type: 'i' },
      calmTypeId: { index: 2, type: 'i' },
      isFullyCalmed: { index: 3, type: 'i' },
    },
  },
  EVENT_CARRIABLE_UPDATE_CARRY_STATE: {
    group: 0,
    size: 5,
    fields: {
      carriable: { index: 0, type: 'i' },
      perpetrator: { index: 1, type: 'i' },
      carrier: { index: 2, type: 'i' },
      isOnHorse: { index: 3, type: 'i' },
      isOnGround: { index: 4, type: 'i' },
    },
  },
  EVENT_CARRIABLE_PROMPT_INFO_REQUEST: {
    group: 0,
    size: 6,
    fields: {
      carriable: { index: 0, type: 'i' },
      carryActionId: { index: 1, type: 'i' },
      _unk2: { index: 2, type: 'i' },
      vehicle: { index: 3, type: 'i' },
      _unk4: { index: 4, type: 'i' },
      _unk5: { index: 5, type: 'i' },
    },
  },
  EVENT_CARRIABLE_VEHICLE_STOW_START: {
    group: 0,
    size: 5,
    fields: {
      _unk0: { index: 0, type: 'i' },
      carriable: { index: 1, type: 'i' },
      vehicle: { index: 2, type: 'i' },
      _unk3: { index: 3, type: 'i' },
      _unk4: { index: 4, type: 'i' },
    },
  },
  EVENT_CARRIABLE_VEHICLE_STOW_COMPLETE: {
    group: 0,
    size: 3,
    fields: {
      _unk0: { index: 0, type: 'i' },
      vehicle: { index: 1, type: 'i' },
      isItemToAddCancelled: { index: 2, type: 'i' },
    },
  },
  EVENT_CHALLENGE_GOAL_COMPLETE: {
    group: 0,
    size: 1,
    fields: {
      challengeGoalHash: { index: 0, type: 'i' },
    },
  },
  EVENT_CHALLENGE_GOAL_UPDATE: {
    group: 0,
    size: 1,
    fields: {
      challengeGoalHash: { index: 0, type: 'i' },
    },
  },
  EVENT_CHALLENGE_REWARD: {
    group: 0,
    size: 3,
    fields: {
      challengeRewardHash: { index: 0, type: 'i' },
      _unk1: { index: 1, type: 'i' },
      _unk2: { index: 2, type: 'i' },
    },
  },
  EVENT_CONTAINER_INTERACTION: {
    group: 0,
    size: 4,
    fields: {
      searcher: { index: 0, type: 'i' },
      searched: { index: 1, type: 'i' },
      _unk2: { index: 2, type: 'i' },
      isContainerClosed: { index: 3, type: 'i' },
    },
  },
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
      _unk1: { index: 1, type: 'i' },
      _unk2: { index: 2, type: 'i' },
      _unk3: { index: 3, type: 'i' },
      _unk4: { index: 4, type: 'i' },
      _unk5: { index: 5, type: 'i' },
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
      damager: { index: 1, type: 'i' },
      weaponHash: { index: 2, type: 'i' },
      ammoHash: { index: 3, type: 'i' },
      damage: { index: 4, type: 'f' },
      _unk5: { index: 5, type: 'i' },
      x: { index: 6, type: 'f' },
      y: { index: 7, type: 'f' },
      z: { index: 8, type: 'f' },
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
      _unk5: { index: 5, type: 'i' },
      x: { index: 6, type: 'f' },
      y: { index: 7, type: 'f' },
      z: { index: 8, type: 'f' },
    },
  },
  EVENT_ENTITY_DISARMED: {
    group: 0,
    size: 4,
    fields: {
      victim: { index: 0, type: 'i' },
      damager: { index: 1, type: 'i' },
      weaponHash: { index: 2, type: 'i' },
      _unk3: { index: 3, type: 'i' },
    }
  },
  EVENT_ENTITY_EXPLOSION: {
    group: 0,
    size: 6,
    fields: {
      pedOrigin: { index: 0, type: 'i' },
      _unk1: { index: 1, type: 'i' },
      weaponHash: { index: 2, type: 'i' },
      x: { index: 3, type: 'f' },
      y: { index: 4, type: 'f' },
      z: { index: 5, type: 'f' },
    },
  },
  EVENT_ENTITY_HOGTIED: {
    group: 0,
    size: 3,
    fields: {
      hogtiedEntity: { index: 0, type: 'i' },
      hogtierEntity: { index: 1, type: 'i' },
      _unk2: { index: 2, type: 'i' },
    }
  },
  EVENT_HEADSHOT_BLOCKED_BY_HAT: {
    group: 0,
    size: 2,
    fields: {
      victim: { index: 0, type: 'i' },
      inflictor: { index: 1, type: 'i' },
    },
  },
  EVENT_HELP_TEXT_REQUEST: {
    group: 0,
    size: 4,
    fields: {
      _unk0: { index: 0, type: 'i' },
      tutorialFlagHash: { index: 1, type: 'i' },
      _unk2: { index: 2, type: 'i' },
      inventoryItemHash: { index: 3, type: 'i' },
    },
  },
  EVENT_HITCH_ANIMAL: {
    group: 0,
    size: 4,
    fields: {
      riderEntity: { index: 0, type: 'i' },
      mountEntity: { index: 1, type: 'i' },
      isAnimalHitched: { index: 2, type: 'i' },
      hitchingType: { index: 3, type: 'i' },
    }
  },
  EVENT_HOGTIED_ENTITY_PICKED_UP: {
    group: 0,
    size: 2,
    fields: {
      hogtiedPed: { index: 0, type: 'i' },
      carrierPed: { index: 1, type: 'i' },
    },
  },
  EVENT_HORSE_BROKEN: {
    group: 0,
    size: 3,
    fields: {
      rider: { index: 0, type: 'i' },
      brokenHorse: { index: 1, type: 'i' },
      horseBrokenEventTypeId: { index: 2, type: 'i' },
    },
  },
  EVENT_IMPENDING_SAMPLE_PROMPT: {
    group: 0,
    size: 2,
    fields: {
      _unk0: { index: 0, type: 'i' },
      inventoryItemHash: { index: 1, type: 'i' },
    },
  },
  EVENT_INVENTORY_ITEM_PICKED_UP: {
    group: 0,
    size: 5,
    fields: {
      inventoryItemHash: { index: 0, type: 'i' },
      pickedUpEntityModel: { index: 1, type: 'i' },
      isItemWasUsed: { index: 2, type: 'i' },
      isItemWasBought: { index: 3, type: 'i' },
      pickedUpEntity: { index: 4, type: 'i' },
    },
  },
  EVENT_INVENTORY_ITEM_REMOVED: {
    group: 0,
    size: 1,
    fields: {
      inventoryItemHash: { index: 0, type: 'i' },
    },
  },
  EVENT_ITEM_PROMPT_INFO_REQUEST: {
    group: 0,
    size: 2,
    fields: {
      entity: { index: 0, type: 'i' },
      inventoryItemHash: { index: 1, type: 'i' },
    },
  },
  EVENT_LOOT: {
    group: 0,
    size: 36,
    fields: {
      numGivenRewards: { index: 0, type: 'i' },
      rewardHash: { index: 1, type: 'i' },
      inventoryItemHash: { index: 2, type: 'i' },
      num: { index: 12, type: 'i' },
      weaponHash: { index: 22, type: 'i' },
      looter: { index: 26, type: 'i' },
      looted: { index: 27, type: 'i' },
      lootedEntityModel: { index: 28, type: 'i' },
      lootedCompositeHashId: { index: 29, type: 'i' },
    },
  },
  EVENT_LOOT_COMPLETE: {
    group: 0,
    size: 3,
    fields: {
      playerPed: { index: 0, type: 'i' },
      _unk1: { index: 1, type: 'i' },
      entity: { index: 2, type: 'i' },
    },
  },
  EVENT_LOOT_PLANT_START: {
    group: 0,
    size: 36,
    fields: {
      numGivenRewards: { index: 0, type: 'i' },
      originalTargetSpawnLocation: { index: 23, type: 'i' },
      looter: { index: 26, type: 'i' },
      looted: { index: 27, type: 'i' },
      lootedCompositeHashId: { index: 29, type: 'i' },
      lootedPedStatHashName: { index: 30, type: 'i' },
      lootedEntityWasAnimal: { index: 31, type: 'i' },
      lootedEntityWasBird: { index: 32, type: 'i' },
      lootingBehaviorType: { index: 34, type: 'i' },
    },
  },
  EVENT_LOOT_VALIDATION_FAIL: {
    group: 0,
    size: 2,
    fields: {
      failReasonId: { index: 0, type: 'i' },
      lootedEntity: { index: 1, type: 'i' },
    },
  },
  EVENT_MISS_INTENDED_TARGET: {
    group: 0,
    size: 3,
    fields: {
      shooter: { index: 0, type: 'i' },
      victim: { index: 1, type: 'i' },
      weaponHash: { index: 2, type: 'i' },
    }
  },
  EVENT_MOUNT_OVERSPURRED: {
    group: 0,
    size: 6,
    fields: {
      rider: { index: 0, type: 'i' },
      mount: { index: 1, type: 'i' },
      _unk2: { index: 2, type: 'i' },
      overspurCount: { index: 3, type: 'i' },
      maxOverspurCount: { index: 4, type: 'i' },
      _unk5: { index: 5, type: 'i' },
    },
  },
  EVENT_OBJECT_INTERACTION: {
    group: 0,
    size: 10,
    fields: {
      ped: { index: 0, type: 'i' },
      interactionEntity: { index: 1, type: 'i' },
      inventoryItemHash: { index: 2, type: 'i' },
      inventoryItemQuantity: { index: 3, type: 'i' },
      _unk4: { index: 4, type: 'i' },
      _unk5: { index: 5, type: 'i' },
      _unk6: { index: 6, type: 'i' },
      _unk7: { index: 7, type: 'i' },
      scenarioPointId: { index: 8, type: 'i' },
      _unk9: { index: 9, type: 'i' },
    },
  },
  EVENT_PED_ANIMAL_INTERACTION: {
    group: 0,
    size: 3,
    fields: {
      ped: { index: 0, type: 'i' },
      animal: { index: 1, type: 'i' },
      interactionTypeHash: { index: 2, type: 'i' },
    },
  },
  EVENT_PED_CREATED: {
    group: 0,
    size: 1,
    fields: {
      ped: { index: 0, type: 'i' },
    },
  },
  EVENT_PED_DESTROYED: { group: 0, size: 1 },
  EVENT_PED_HAT_KNOCKED_OFF: {
    group: 0,
    size: 2,
    fields: {
      entity: { index: 0, type: 'i' },
      hatEntity: { index: 1, type: 'i' },
    },
  },
  EVENT_PED_WHISTLE: {
    group: 0,
    size: 2,
    fields: {
      ped: { index: 0, type: 'i' },
      whistleType: { index: 1, type: 'i' },
    },
  },
  EVENT_PICKUP_CARRIABLE: {
    group: 0,
    size: 4,
    fields: {
      carrier: { index: 0, type: 'i' },
      carriable: { index: 1, type: 'i' },
      isPickupDoneFromParent: { index: 2, type: 'i' },
      carrierMount: { index: 3, type: 'i' },
    },
  },
  EVENT_PLACE_CARRIABLE_ONTO_PARENT: {
    group: 0,
    size: 6,
    fields: {
      perpetrator: { index: 0, type: 'i' },
      carriable: { index: 1, type: 'i' },
      carrier: { index: 2, type: 'i' },
      // not in the femga/rdr3_discoveries reference (marked unknown there),
      // but relied on by stable/pelt-controller.ts to key corpse storage slots
      slot: { index: 3, type: 'i' },
      isCarriedEntityAPelt: { index: 4, type: 'i' },
      inventoryItemHash: { index: 5, type: 'i' },
    },
  },
  EVENT_PLAYER_COLLECTED_AMBIENT_PICKUP: {
    group: 0,
    size: 8,
    fields: {
      pickupNameHash: { index: 0, type: 'i' },
      _unk1: { index: 1, type: 'i' },
      player: { index: 2, type: 'i' },
      pickupModelHash: { index: 3, type: 'i' },
      _unk4: { index: 4, type: 'i' },
      _unk5: { index: 5, type: 'i' },
      collectedQuantity: { index: 6, type: 'i' },
      inventoryItemHash: { index: 7, type: 'i' },
    },
  },
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
      player: { index: 0, type: 'i' },
      hat: { index: 1, type: 'i' },
      hatDrawableHash: { index: 2, type: 'i' },
      hatAlbedoHash: { index: 3, type: 'i' },
      hatNormalHash: { index: 4, type: 'i' },
      hatMaterialHash: { index: 5, type: 'i' },
      hatPaletteHash: { index: 6, type: 'i' },
      tint1: { index: 7, type: 'i' },
      tint2: { index: 8, type: 'i' },
      tint3: { index: 9, type: 'i' },
    },
  },
  EVENT_PLAYER_HAT_KNOCKED_OFF: {
    group: 0,
    size: 5,
    fields: {
      player: { index: 0, type: 'i' },
      causePed: { index: 1, type: 'i' },
      hat: { index: 2, type: 'i' },
      _unk3: { index: 3, type: 'i' },
      _unk4: { index: 4, type: 'i' },
    },
  },
  EVENT_PLAYER_HORSE_AGITATED_BY_ANIMAL: {
    group: 0,
    size: 4,
    fields: {
      horse: { index: 0, type: 'i' },
      agitatedAnimal: { index: 1, type: 'i' },
      _unk2: { index: 2, type: 'i' },
      _unk3: { index: 3, type: 'i' },
    },
  },
  EVENT_PLAYER_MOUNT_WILD_HORSE: {
    group: 0,
    size: 1,
    fields: {
      wildHorse: { index: 0, type: 'i' },
    },
  },
  EVENT_PLAYER_PROMPT_TRIGGERED: {
    group: 0,
    size: 10,
    fields: {
      promptTypeId: { index: 0, type: 'i' },
      _unk1: { index: 1, type: 'i' },
      targetEntity: { index: 2, type: 'i' },
      _unk3: { index: 3, type: 'i' },
      x: { index: 4, type: 'f' },
      y: { index: 5, type: 'f' },
      z: { index: 6, type: 'f' },
      discoverableEntityTypeId: { index: 7, type: 'i' },
      _unk8: { index: 8, type: 'i' },
      kitEmoteActionHash: { index: 9, type: 'i' },
    },
  },
  EVENT_RAN_OVER_PED: {
    group: 0,
    size: 2,
    fields: {
      _unk0: { index: 0, type: 'i' },
      ranOverPed: { index: 1, type: 'i' },
    },
  },
  EVENT_REVIVE_ENTITY: {
    group: 0,
    size: 3,
    fields: {
      victim: { index: 0, type: 'i' },
      reviver: { index: 1, type: 'i' },
      usedInventoryItemHash: { index: 2, type: 'i' },
    },
  },
  EVENT_SHOCKING_ITEM_STOLEN: {
    group: 0,
    size: 3,
    fields: {
      _unk0: { index: 0, type: 'i' },
      _unk1: { index: 1, type: 'i' },
      carriable: { index: 2, type: 'i' },
    },
  },
  EVENT_SHOT_FIRED_BULLET_IMPACT: {
    group: 0,
    size: 1,
    fields: {
      hitEntity: { index: 0, type: 'i' },
    },
  },
  EVENT_SHOT_FIRED_WHIZZED_BY: {
    group: 0,
    size: 1,
    fields: {
      shotEntity: { index: 0, type: 'i' },
    },
  },
  EVENT_STAT_VALUE_CHANGED: {
    group: 0,
    size: 2,
    fields: {
      statValueTypeHash: { index: 0, type: 'i' },
      _unk1: { index: 1, type: 'i' },
    },
  },
  EVENT_TRIGGERED_ANIMAL_WRITHE: {
    group: 0,
    size: 2,
    fields: {
      animal: { index: 0, type: 'i' },
      damager: { index: 1, type: 'i' },
    },
  },
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
  EVENT_NETWORK_CASHINVENTORY_TRANSACTION: {
    group: 1,
    size: 6,
    fields: {
      transactionId: { index: 0, type: 'i' },
      _unk1: { index: 1, type: 'i' },
      failed: { index: 2, type: 'i' },
      resultCode: { index: 3, type: 'i' },
      itemsAmount: { index: 4, type: 'i' },
      actionHash: { index: 5, type: 'i' },
    },
  },
  EVENT_NETWORK_CREW_CREATION: {
    group: 1,
    size: 10,
    fields: {
      isCreationSuccessful: { index: 0, type: 'i' },
      crewId: { index: 1, type: 'i' },
    },
  },
  EVENT_NETWORK_CREW_DISBANDED: {
    group: 1,
    size: 2,
    fields: {
      isDisbandingSuccessful: { index: 0, type: 'i' },
      _unk1: { index: 1, type: 'i' },
    },
  },
  EVENT_NETWORK_CREW_INVITE_RECEIVED: {
    group: 1,
    size: 11,
    fields: {
      id: { index: 0, type: 'i' },
      hasMessage: { index: 10, type: 'i' },
    },
  },
  EVENT_NETWORK_CREW_JOINED: { group: 1, size: 2 },
  EVENT_NETWORK_CREW_KICKED: {
    group: 1,
    size: 2,
    fields: {
      crewId: { index: 0, type: 'i' },
      primary: { index: 1, type: 'i' },
    },
  },
  EVENT_NETWORK_CREW_LEFT: {
    group: 1,
    size: 2,
    fields: {
      leftCrewId: { index: 0, type: 'i' },
      _unk1: { index: 1, type: 'i' },
    },
  },
  EVENT_NETWORK_CREW_RANK_CHANGE: {
    group: 1,
    size: 7,
    fields: {
      crewId: { index: 0, type: 'i' },
      rankOrder: { index: 1, type: 'i' },
      promotion: { index: 2, type: 'i' },
    },
  },
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
      _unk30: { index: 30, type: 'i' },
      isSuicide: { index: 31, type: 'i' },
    }
  },
  EVENT_NETWORK_GANG: {
    group: 1,
    size: 18,
    fields: {
      gangEventTypeId: { index: 1, type: 'i' },
      senderGamerHandle: { index: 2, type: 'i' },
    },
  },
  EVENT_NETWORK_GANG_WAYPOINT_CHANGED: {
    group: 1,
    size: 3,
    fields: {
      gangWaypointChangingTypeId: { index: 0, type: 'i' },
    },
  },
  EVENT_NETWORK_HOGTIE_BEGIN: {
    group: 1,
    size: 2,
    fields: {
      victim: { index: 0, type: 'i' },
      perpetrator: { index: 1, type: 'i' },
    },
  },
  EVENT_NETWORK_HOGTIE_END: {
    group: 1,
    size: 2,
    fields: {
      victim: { index: 0, type: 'i' },
      perpetrator: { index: 1, type: 'i' },
    },
  },
  EVENT_NETWORK_HUB_UPDATE: {
    group: 1,
    size: 1,
    fields: {
      updateHash: { index: 0, type: 'i' },
    },
  },
  EVENT_NETWORK_INCAPACITATED_ENTITY: {
    group: 1,
    size: 4,
    fields: {
      victim: { index: 0, type: 'i' },
      damager: { index: 1, type: 'i' },
      weaponHash: { index: 2, type: 'i' },
      damage: { index: 3, type: 'i' },
    },
  },
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
      _unk2: { index: 2, type: 'i' },
    },
  },
  EVENT_NETWORK_LASSO_DETACH: {
    group: 1,
    size: 2,
    fields: {
      victim: { index: 0, type: 'i' },
      perpetrator: { index: 1, type: 'i' },
    },
  },
  EVENT_NETWORK_LOOT_CLAIMED: {
    group: 1,
    size: 9,
    fields: {
      requestId: { index: 0, type: 'i' },
      status: { index: 7, type: 'i' },
    },
  },
  EVENT_NETWORK_MINIGAME_REQUEST_COMPLETE: {
    group: 1,
    size: 6,
    fields: {
      seatRequestData0: { index: 0, type: 'i' },
      seatRequestData1: { index: 1, type: 'i' },
      seatRequestData2: { index: 2, type: 'i' },
      seatRequestData3: { index: 3, type: 'i' },
      isSuccess: { index: 4, type: 'i' },
      minigameErrorCodeHash: { index: 5, type: 'i' },
    },
  },
  EVENT_NETWORK_PED_DISARMED: {
    group: 1,
    size: 3,
    fields: {
      victim: { index: 0, type: 'i' },
      damager: { index: 1, type: 'i' },
      weaponHash: { index: 2, type: 'i' },
    },
  },
  EVENT_NETWORK_PED_HAT_SHOT_OFF: {
    group: 1,
    size: 3,
    fields: {
      victim: { index: 0, type: 'i' },
      damager: { index: 1, type: 'i' },
      weaponHash: { index: 2, type: 'i' },
    },
  },
  EVENT_NETWORK_PERMISSION_CHECK_RESULT: { group: 1, size: 2 },
  EVENT_NETWORK_PICKUP_COLLECTION_FAILED: {
    group: 1,
    size: 3,
    fields: {
      _unk0: { index: 0, type: 'i' },
      player: { index: 1, type: 'i' },
      pickupTypeHash: { index: 2, type: 'i' },
    },
  },
  EVENT_NETWORK_PICKUP_RESPAWNED: {
    group: 1,
    size: 2,
    fields: {
      pickup: { index: 0, type: 'i' },
      _unk1: { index: 1, type: 'i' },
    },
  },
  EVENT_NETWORK_PLAYER_COLLECTED_PICKUP: {
    group: 1,
    size: 8,
    fields: {
      collectedEntity: { index: 0, type: 'i' },
      collectorPlayer: { index: 1, type: 'i' },
      pickupTypeHash: { index: 2, type: 'i' },
      pickupEntityModelHash: { index: 4, type: 'i' },
      pickupAmmoAmount: { index: 5, type: 'i' },
      pickupAmmoTypeHash: { index: 6, type: 'i' },
    },
  },
  EVENT_NETWORK_PLAYER_COLLECTED_PORTABLE_PICKUP: {
    group: 1,
    size: 3,
    fields: {
      collectedPickupNetworkId: { index: 0, type: 'i' },
      player: { index: 1, type: 'i' },
      _unk2: { index: 2, type: 'i' },
    },
  },
  EVENT_NETWORK_PLAYER_DROPPED_PORTABLE_PICKUP: {
    group: 1,
    size: 3,
    fields: {
      collectedPickupNetworkId: { index: 0, type: 'i' },
      player: { index: 1, type: 'i' },
      _unk2: { index: 2, type: 'i' },
    },
  },
  EVENT_NETWORK_PLAYER_JOIN_SCRIPT: {
    group: 1,
    size: 41,
    fields: {
      numThreads: { index: 11, type: 'i' },
      participantId: { index: 40, type: 'i' },
    },
  },
  EVENT_NETWORK_PLAYER_LEFT_SCRIPT: {
    group: 1,
    size: 41,
    fields: {
      numThreads: { index: 11, type: 'i' },
      participantId: { index: 40, type: 'i' },
    },
  },
  EVENT_NETWORK_PLAYER_JOIN_SESSION: {
    group: 1,
    size: 10,
    fields: {
      player: { index: 8, type: 'i' },
    },
  },
  EVENT_NETWORK_PLAYER_LEFT_SESSION: {
    group: 1,
    size: 10,
    fields: {
      player: { index: 8, type: 'i' },
    },
  },
  EVENT_NETWORK_PLAYER_MISSED_SHOT: {
    group: 1,
    size: 9,
    fields: {
      shooter: { index: 0, type: 'i' },
      weaponHash: { index: 1, type: 'i' },
      _unk2: { index: 2, type: 'i' },
      _unk3: { index: 3, type: 'i' },
      _unk4: { index: 4, type: 'i' },
      _unk5: { index: 5, type: 'i' },

      // isn't shooter position, something like how close it was to entity bounds
      // not always set, only when the shot is close to an entity (ped/animal/vehicle) and the shot is a miss
      // shooterX: { index: 3, type: 'f' },
      // shooterY: { index: 4, type: 'f' },
      // shooterZ: { index: 5, type: 'f' },

      bulletImpactX: { index: 6, type: 'f' },
      bulletImpactY: { index: 7, type: 'f' },
      bulletImpactZ: { index: 8, type: 'f' },
    }
  },
  EVENT_NETWORK_POSSE_CREATED: {
    group: 1,
    size: 10,
    fields: {
      isSuccess: { index: 0, type: 'i' },
      posseId: { index: 1, type: 'i' },
    },
  },
  EVENT_NETWORK_POSSE_DATA_CHANGED: { group: 1, size: 2 },
  EVENT_NETWORK_POSSE_DISBANDED: {
    group: 1,
    size: 2,
    fields: {
      isSuccess: { index: 0, type: 'i' },
      posseId: { index: 1, type: 'i' },
    },
  },
  EVENT_NETWORK_POSSE_EX_ADMIN_DISBANDED: { group: 1, size: 9 },
  EVENT_NETWORK_POSSE_EX_INACTIVE_DISBANDED: { group: 1, size: 10 },
  EVENT_NETWORK_POSSE_JOINED: {
    group: 1,
    size: 2,
    fields: {
      isSuccess: { index: 0, type: 'i' },
      posseId: { index: 1, type: 'i' },
    },
  },
  EVENT_NETWORK_POSSE_LEADER_SET_ACTIVE: {
    group: 1,
    size: 23,
    fields: {
      posseId: { index: 0, type: 'i' },
      gamerHandle: { index: 9, type: 'i' },
    },
  },
  EVENT_NETWORK_POSSE_LEFT: {
    group: 1,
    size: 1,
    fields: {
      posseId: { index: 0, type: 'i' },
    },
  },
  EVENT_NETWORK_POSSE_MEMBER_DISBANDED: {
    group: 1,
    size: 23,
    fields: {
      posseId: { index: 0, type: 'i' },
      gamerHandle: { index: 9, type: 'i' },
    },
  },
  EVENT_NETWORK_POSSE_MEMBER_JOINED: {
    group: 1,
    size: 23,
    fields: {
      posseId: { index: 0, type: 'i' },
      gamerHandle: { index: 9, type: 'i' },
    },
  },
  EVENT_NETWORK_POSSE_MEMBER_KICKED: {
    group: 1,
    size: 23,
    fields: {
      posseId: { index: 0, type: 'i' },
      gamerHandle: { index: 9, type: 'i' },
    },
  },
  EVENT_NETWORK_POSSE_MEMBER_LEFT: {
    group: 1,
    size: 23,
    fields: {
      posseId: { index: 0, type: 'i' },
      gamerHandle: { index: 9, type: 'i' },
    },
  },
  EVENT_NETWORK_POSSE_MEMBER_SET_ACTIVE: {
    group: 1,
    size: 23,
    fields: {
      posseId: { index: 0, type: 'i' },
      gamerHandle: { index: 9, type: 'i' },
    },
  },
  EVENT_NETWORK_PROJECTILE_ATTACHED: {
    group: 1,
    size: 6,
    fields: {
      damager: { index: 0, type: 'i' },
      victim: { index: 1, type: 'i' },
      x: { index: 2, type: 'f' },
      y: { index: 3, type: 'f' },
      z: { index: 4, type: 'f' },
      weaponHash: { index: 5, type: 'i' },
    },
  },
  EVENT_NETWORK_PROJECTILE_NO_DAMAGE_IMPACT: {
    group: 1,
    size: 2,
    fields: {
      ped: { index: 0, type: 'i' },
      ammoHash: { index: 1, type: 'i' },
    },
  },
  EVENT_NETWORK_REVIVED_ENTITY: {
    group: 1,
    size: 2,
    fields: {
      victim: { index: 0, type: 'i' },
      reviver: { index: 1, type: 'i' },
    },
  },
  EVENT_NETWORK_SESSION_EVENT: { group: 1, size: 10 },
  EVENT_NETWORK_SESSION_MERGE_END: {
    group: 1,
    size: 1,
    fields: {
      sessionMessageId: { index: 0, type: 'i' },
    },
  },
  EVENT_NETWORK_SESSION_MERGE_START: {
    group: 1,
    size: 1,
    fields: {
      sessionMessageId: { index: 0, type: 'i' },
    },
  },
  EVENT_NETWORK_VEHICLE_LOOTED: {
    group: 1,
    size: 3,
    fields: {
      looter: { index: 0, type: 'i' },
      lootedVehicle: { index: 1, type: 'i' },
      _unk2: { index: 2, type: 'i' },
    },
  },
  EVENT_NETWORK_VEHICLE_UNDRIVABLE: {
    group: 1,
    size: 3,
    fields: {
      vehicle: { index: 0, type: 'i' },
      damager: { index: 1, type: 'i' },
      _unk2: { index: 2, type: 'i' },
    },
  },

  // Group 2 - scenario events
  EVENT_SCENARIO_ADD_PED: {
    group: 2,
    size: 2,
    fields: {
      scriptUID: { index: 0, type: 'i' },
      _unk1: { index: 1, type: 'i' },
    },
  },
  EVENT_SCENARIO_DESTROY_PROP: {
    group: 2,
    size: 2,
    fields: {
      scriptUID: { index: 0, type: 'i' },
      _unk1: { index: 1, type: 'i' },
    },
  },
  EVENT_SCENARIO_REMOVE_PED: {
    group: 2,
    size: 2,
    fields: {
      scriptUID: { index: 0, type: 'i' },
      _unk1: { index: 1, type: 'i' },
    },
  },

  // Group 3 - UI events
  EVENT_UI_ITEM_INSPECT_ACTIONED: { group: 3, size: 6 },
  EVENT_UI_QUICK_ITEM_USED: {
    group: 3,
    size: 6,
    fields: {
      entity: { index: 5, type: 'i' },
    },
  },
} as const satisfies Record<string, EventDef>;

export type EventName = keyof typeof EVENT_CATALOG;

export const EVENT_GROUPS = [...new Set(Object.values(EVENT_CATALOG).map((def) => def.group))];

/**
 * Events confirmed common/high-frequency in normal play. Excluded from the
 * discovery log (EVENTS_LOG_ALL) so it stays useful for spotting genuinely
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
  'EVENT_SCENARIO_ADD_PED',
  'EVENT_SCENARIO_DESTROY_PROP',
  'EVENT_SCENARIO_REMOVE_PED',
]);
