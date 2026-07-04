import { Buffer } from 'buffer';

import { PVEvents, PVEventsManager } from '@lib/client/resources';

const intToFloat = (int: number) => {
  const buffer = Buffer.alloc(4);
  buffer.writeInt32LE(int, 0);
  return buffer.readFloatLE(0);
};

const registeredEvents = new Set();

const callbacks = new Map();

type EventMappingData = { [p: string]: 'i' | 'f' };

const eventMappings = {
  EVENT_ENTITY_DAMAGED: {
    attacked: 'i',
    attacker: 'i',
    weaponHash: 'i',
    ammoHash: 'i',
    damage: 'f',
    _5: 'i',
    x: 'f',
    y: 'f',
    z: 'f',
  },
  EVENT_ENTITY_DESTROYED: {
    attacked: 'i',
    attacker: 'i',
    weaponHash: 'i',
    ammoHash: 'i',
    damage: 'f',
    _5: 'i',
    x: 'f',
    y: 'f',
    z: 'f',
  },
  EVENT_ENTITY_EXPLOSION: {
    pedOrigin: 'i',
    _1: 'i',
    weaponHash: 'i',
    x: 'f',
    y: 'f',
    z: 'f',
  },
  EVENT_PLAYER_HAT_KNOCKED_OFF: {
    originPed: 'i',
    causePed: 'i',
    hat: 'i',
    _3: 'i',
    _4: 'i',
  },
  EVENT_CARRIABLE_UPDATE_CARRY_STATE: {
    carriable: 'i',
    ped: 'i',
    ped2: 'i',
    _3: 'i',
    dropped: 'i',
  },
  // {name = 'EVENT_PICKUP_CARRIABLE', group = 0, size = 4},
  EVENT_PICKUP_CARRIABLE: {
    ped: 'i',
    carriable: 'i',
    fromEntity: 'i',
    entity: 'i',
  },
  // {name = 'EVENT_PED_ANIMAL_INTERACTION', group = 0, size = 3},
  EVENT_PED_ANIMAL_INTERACTION: {
    _0: 'i',
    _1: 'i',
    _2: 'i',
  },
  // {name = 'EVENT_PLACE_CARRIABLE_ONTO_PARENT', group = 0, size = 6},
  EVENT_PLACE_CARRIABLE_ONTO_PARENT: {
    ped: 'i',
    carriable: 'i',
    parent: 'i',
    slot: 'i',
    subSlot: 'i',
    provision: 'i',
  },
  // {name = 'EVENT_LOOT', group = 0, size = 38},
  EVENT_LOOT: {
    _0: 'i',
    _1: 'i',
    _2: 'i',
    _3: 'i',
    _4: 'i',
    _5: 'i',
    _6: 'i',
    _7: 'i',
    _8: 'i',
    _9: 'i',
    _10: 'i',
    _11: 'i',
    _12: 'i',
    _13: 'i',
    _14: 'i',
    _15: 'i',
    _16: 'i',
    _17: 'i',
    _18: 'i',
    _19: 'i',
    _20: 'i',
    _21: 'i',
    _22: 'i',
    _23: 'i',
    _24: 'i',
    _25: 'i',
    _26: 'i',
    _27: 'i',
    _28: 'i',
    _29: 'i',
    _30: 'i',
    _31: 'i',
    _32: 'i',
    _33: 'i',
    _34: 'i',
    _35: 'i',
    _36: 'i',
    _37: 'i',
  },
  // {name = 'EVENT_LOOT_COMPLETE', group = 0, size = 3},
  EVENT_LOOT_COMPLETE: {
    playerPed: 'i',
    entity: 'i',
    _2: 'i',
  },
  // {name = 'EVENT_LOOT_PLANT_START', group = 0, size = 36},
  EVENT_LOOT_PLANT_START: {
    _0: 'i',
    _1: 'i',
    _2: 'i',
    _3: 'i',
    _4: 'i',
    _5: 'i',
    _6: 'i',
    _7: 'i',
    _8: 'i',
    _9: 'i',
    _10: 'i',
    _11: 'i',
    _12: 'i',
    _13: 'i',
    _14: 'i',
    _15: 'i',
    _16: 'i',
    _17: 'i',
    _18: 'i',
    _19: 'i',
    _20: 'i',
    _21: 'i',
    _22: 'i',
    _23: 'i',
    _24: 'i',
    _25: 'i',
    _26: 'i',
    _27: 'i',
    _28: 'i',
    _29: 'i',
    _30: 'i',
    _31: 'i',
    _32: 'i',
    _33: 'i',
    _34: 'i',
    _35: 'i',
  },
  // {name = 'EVENT_LOOT_VALIDATION_FAIL', group = 0, size = 2},
  EVENT_LOOT_VALIDATION_FAIL: {
    _0: 'i',
    _1: 'i',
  },
  EVENT_PLAYER_HAT_EQUIPPED: {
    ped: 'i',
    hat: 'i',
    _2: 'i',
    _3: 'i',
    _4: 'i',
    _5: 'i',
    palette: 'i',
    tint0: 'i',
    tint1: 'i',
    tint2: 'i',
  },
  EVENT_PED_WHISTLE: {
    _0: 'i',
    _1: 'i',
  },
  // size = 1: the ped who fired the shot
  EVENT_SHOT_FIRED_BULLET_IMPACT: {
    shooter: 'i',
  },
  // size = 3: crime entity + two unknown fields
  EVENT_CRIME_CONFIRMED: {
    ped: 'i',
    _1: 'i',
    _2: 'i',
  },
  weapon: {
    mainHand: 'i',
    offHand: 'i',
  },
};

// type emitSocket = <T extends keyof SocketServer.ServerEvents>(
//   evtName: T,
//   ...params: Parameters<SocketServer.ServerEvents[T]>
// ) => void;
//
// type awaitSocket = <
//   T extends keyof {
//     [K in keyof SocketServer.Server]: LastParam<SocketServer.Server[K]> extends () => any ? T : never;
//   },
// >(
//   evtName: T,
//   ...params: DropLastParam<SocketServer.Server[T]>
// ) => Promise<Parameters<LastParam<SocketServer.Server[T]>>[0]>;

type EventsManagerDataStuff = Record<keyof EventMappingData, number>;

export type EventData = {
  [K in keyof typeof eventMappings]: Record<keyof (typeof eventMappings)[K], number>;
};

function register<T extends keyof typeof eventMappings>(
  event: T,
  callback: (data: Record<keyof (typeof eventMappings)[T], number>) => void,
) {
  if (!callbacks.has(event)) {
    callbacks.set(event, []);
  }
  callbacks.get(event).push(callback);
  if (!registeredEvents.has(event)) {
    registeredEvents.add(event);
    PVEventsManager.Register(event);
    on(`events_manager:${event}`, (dataArray: number[]): void => {
      const data: Record<string, number> = {};
      let n = 0;
      if (eventMappings[event]) {
        for (const [index, dataType] of Object.entries(eventMappings[event])) {
          switch (dataType) {
            case 'f':
              data[index] = intToFloat(dataArray[n]);
              break;
            default:
              data[index] = dataArray[n];
              break;
          }
          n++;
        }
      } else {
        for (const value of dataArray) {
          data[`_${n}`] = value;
          n++;
        }
      }
      for (const callback of callbacks.get(event) ?? []) {
        callback(data);
      }
    });
  }
}

type CronEntry = {
  type: 'cron';
  eventId: string;
  cron: string;
  callback: () => void;
  boundEventName?: string;
};

type TimeEntry = {
  type: 'time';
  eventId: string;
  time: number;
  deleteAfterFire?: boolean;
  callback: () => void;
  boundEventName?: string;
};

type CronTimeEntry = CronEntry | TimeEntry;

const cronTimeRegistry: Set<CronTimeEntry> = new Set();

const performRegistration = (entry: CronTimeEntry): void => {
  if (entry.boundEventName) {
    removeEventListener(entry.boundEventName, entry.callback);
    entry.boundEventName = undefined;
  }

  const label = entry.type === 'cron' ? 'registerCronEvent' : 'registerTimeEvent';
  const eventName =
    entry.type === 'cron'
      ? PVEvents.registerCronEvent(entry.eventId, entry.cron)
      : PVEvents.registerTimeEvent(entry.eventId, entry.time, entry.deleteAfterFire);

  if (eventName) {
    console.log(`Successful ${label} with id "${eventName}"`);
    on(eventName, entry.callback);
    entry.boundEventName = eventName;
  } else {
    console.log(`Failed to ${label} with id "${entry.eventId}"`);
  }
};

export function registerCronEvent(callback: () => void, eventId: string, cron: string) {
  const entry: CronEntry = { type: 'cron', eventId, cron, callback };
  cronTimeRegistry.add(entry);
  if (GetResourceState('events') === 'started') {
    performRegistration(entry);
  }
}

export function registerTimeEvent(callback: () => void, eventId: string, time: number, deleteAfterFire?: boolean) {
  const entry: TimeEntry = { type: 'time', eventId, time, deleteAfterFire, callback };
  cronTimeRegistry.add(entry);
  if (GetResourceState('events') === 'started') {
    performRegistration(entry);
  }
}

on('onResourceStart', (resource: string) => {
  if (resource !== 'events') {
    return;
  }

  for (const entry of cronTimeRegistry) {
    if (entry.type === 'time' && entry.time < Date.now()) {
      cronTimeRegistry.delete(entry);
      continue;
    }
    performRegistration(entry);
  }
});

export const PVGameEvents = {
  register,
};
