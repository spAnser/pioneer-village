import { Buffer } from 'buffer';
import { PVEventsManager } from '@lib/client/resources';

const intToFloat = (int: number) => {
  const buffer = Buffer.alloc(4);
  buffer.writeInt32LE(int, 0);
  return buffer.readFloatLE(0);
};

const registeredEvents = new Set();

const callbacks = new Map();

const eventMappings: Record<string, { [p: string]: 'i' | 'f' }> = {
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
  weapon: {
    mainHand: 'i',
    offHand: 'i',
  },
};

const register = (event: EventsManager.EventName, callback: (data: Record<string, number>) => void) => {
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
};

export const PVEvents = {
  register,
};
