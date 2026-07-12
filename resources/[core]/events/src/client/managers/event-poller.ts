import { EVENT_CATALOG, EVENT_GROUPS, NOISY_EVENTS } from '../catalog';
import type { EventDef, EventName } from '../catalog';

const catalogEntry = (name: EventName): EventDef => EVENT_CATALOG[name];

// GET_EVENT_DATA (0x57EC5FA4D4D6AFCA) needs a mutable output buffer, which
// RedM's JS native-calling ABI has no argument type for - see
// GET_EVENT_DATA-LIMITATION.md. client/event-data.lua does the native call
// with a Lua string buffer instead and hands back the decoded int32 fields.
const decodeEventNative = (group: number, index: number, size: number): number[] | undefined => {
  return exports[GetCurrentResourceName()].decodeEvent(group, index, size);
};

type EventFields<T extends EventName> = (typeof EVENT_CATALOG)[T]['fields'];
export type EventData<T extends EventName> = EventFields<T> extends undefined
  ? number[]
  : { [K in keyof EventFields<T>]: number };

type Listener = (data: unknown) => void;

const WARNINGS_CONVAR = 'events:warnings';
const LOG_ALL_CONVAR = 'events:log_all';

export class EventPoller {
  protected static instance: EventPoller;

  static getInstance(): EventPoller {
    if (!EventPoller.instance) {
      EventPoller.instance = new EventPoller();
    }
    return EventPoller.instance;
  }

  protected tracked: Map<EventName, number> = new Map();
  protected listeners: Map<EventName, Set<Listener>> = new Map();
  protected awaiting: Map<EventName, Array<(data: unknown) => void>> = new Map();
  protected onceListeners: Map<EventName, Set<Listener>> = new Map();
  protected warnings: Map<EventName, number> = new Map();
  protected warn = GetConvar(WARNINGS_CONVAR, 'false') === 'true';
  protected logAll = GetConvar(LOG_ALL_CONVAR, 'true') === 'true';
  protected seenUnobserved: Set<EventName> = new Set();

  // Scratch buffer for reinterpreting an int32's bits as a float32 (fields
  // the native returns as a raw int32 that actually encode a float).
  protected scratch = new DataView(new ArrayBuffer(4));

  protected intBitsToFloat(bits: number): number {
    this.scratch.setInt32(0, bits, true);
    return this.scratch.getFloat32(0, true);
  }

  protected decode<T extends EventName>(
    group: number,
    index: number,
    name: T,
  ): { data: EventData<T>; raw: number[] | undefined } {
    const def = catalogEntry(name);
    const params = decodeEventNative(group, index, def.size);

    if (!params) {
      return { data: (def.fields ? {} : []) as EventData<T>, raw: params };
    }

    if (def.fields) {
      const data: Record<string, number> = {};
      for (const [key, field] of Object.entries(def.fields)) {
        data[key] = field.type === 'f' ? this.intBitsToFloat(params[field.index]) : params[field.index];
      }
      return { data: data as EventData<T>, raw: params };
    }

    return { data: params as EventData<T>, raw: params };
  }

  /**
   * Named/formatted view of an event's data for logging. Includes the raw
   * field array alongside the named view whenever the catalog's `fields`
   * mapping doesn't account for every field the native actually returned
   * (fewer named fields than the raw array length), since that mismatch
   * means the named mapping may be wrong or incomplete - same situation
   * that caused the EVENT_NETWORK_LASSO_ATTACH field mixup.
   */
  protected describe<T extends EventName>(name: T, data: EventData<T>, raw: number[] | undefined): unknown {
    const def = catalogEntry(name);
    if (!def.fields) {
      const described: Record<string, number> = {};
      Object.entries(data as Record<string, number>).forEach(([i, value]) => {
        described[`_${i}`] = value;
      });
      return described;
    }

    const namedFieldCount = Object.keys(def.fields).length;
    if (!raw || namedFieldCount >= raw.length) {
      return data;
    }

    return { named: data, raw };
  }

  protected warnIfSpamming(name: EventName): void {
    if (!this.warn) return;

    const now = GetGameTimer();
    const last = this.warnings.get(name);
    if (last !== undefined && now - last < 500) {
      console.log(`${name} has triggered an event in ${now - last}ms (events spamming can create performance issues)`);
    }
    this.warnings.set(name, now);
  }

  tick(): void {
    for (const group of EVENT_GROUPS) {
      const size = GetNumberOfEvents(group);
      if (size <= 0) continue;

      for (let i = 0; i < size; i++) {
        const hash = GetEventAtIndex(group, i);
        const name = this.hashToName.get(hash);

        if (!name || EVENT_CATALOG[name].group !== group) {
          if (this.logAll && !this.seenUnobserved.has((name ?? hash) as EventName)) {
            this.seenUnobserved.add((name ?? hash) as EventName);
            console.log(`unobserved event (group ${group})`, name ?? hash);
          }
          continue;
        }

        const isRegistered = this.tracked.has(name) || this.awaiting.has(name) || this.onceListeners.has(name);
        const shouldLog = this.logAll && !NOISY_EVENTS.has(name);
        if (!isRegistered && !shouldLog) continue;

        const { data, raw } = this.decode(group, i, name);

        if (!isRegistered && shouldLog) {
          console.log(`unregistered event ${name}`, this.describe(name, data, raw));
          continue;
        }
        this.warnIfSpamming(name);

        for (const listener of this.listeners.get(name) ?? []) {
          listener(data);
        }

        const listenersForName = this.onceListeners.get(name);
        if (listenersForName) {
          for (const listener of listenersForName) {
            listener(data);
          }
          this.onceListeners.delete(name);
        }

        const resolvers = this.awaiting.get(name);
        if (resolvers) {
          for (const resolve of resolvers) {
            resolve(data);
          }
          this.awaiting.delete(name);
        }
      }
    }
  }

  protected hashToName: Map<number, EventName> = new Map(
    (Object.keys(EVENT_CATALOG) as EventName[]).map((name) => [GetHashKey(name), name]),
  );

  register<T extends EventName>(name: T, callback: (data: EventData<T>) => void): void {
    if (!this.listeners.has(name)) {
      this.listeners.set(name, new Set());
    }
    this.listeners.get(name)!.add(callback as Listener);
    this.tracked.set(name, (this.tracked.get(name) ?? 0) + 1);
  }

  unregister<T extends EventName>(name: T, callback: (data: EventData<T>) => void): void {
    this.listeners.get(name)?.delete(callback as Listener);

    const count = this.tracked.get(name);
    if (count === undefined) return;
    if (count <= 1) {
      this.tracked.delete(name);
    } else {
      this.tracked.set(name, count - 1);
    }
  }

  once<T extends EventName>(name: T, callback: (data: EventData<T>) => void): void {
    if (!this.onceListeners.has(name)) {
      this.onceListeners.set(name, new Set());
    }
    this.onceListeners.get(name)!.add(callback as Listener);
  }

  awaitEvent<T extends EventName>(name: T): Promise<EventData<T>> {
    return new Promise((resolve) => {
      if (!this.awaiting.has(name)) {
        this.awaiting.set(name, []);
      }
      this.awaiting.get(name)!.push(resolve as (data: unknown) => void);
    });
  }
}

export default EventPoller.getInstance();
