import { PVEvents } from '@lib/client/resources';

/**
 * Derived player-state events, broadcast by the events resource's
 * PlayerStateManager rather than pulled from a game event queue. They have no
 * catalog entry, so their field names live here - listed in the order the
 * manager packs its payload array (see the `events:weapon` emit in
 * `resources/[core]/events/src/client/managers/player-state-manager.ts`).
 */
const derivedEventFields = {
  weapon: ['mainHand', 'offHand'],
} as const satisfies Record<string, readonly string[]>;

type DerivedEventName = keyof typeof derivedEventFields;

type DerivedEventData = {
  [K in DerivedEventName]: Record<(typeof derivedEventFields)[K][number], number>;
};

type DerivedListener = (data: unknown) => void;

const callbacks = new Map<DerivedEventName, DerivedListener[]>();

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

/**
 * Every event `register` accepts, keyed by event name.
 *
 * Raw game event shapes come straight from the events resource's catalog
 * (`resources/[core]/events/src/client/catalog.ts`), which is the single
 * source of truth for field names, indices and types - the same mapping the
 * event poller decodes with. Never mirror those field names here.
 */
export type EventData = {
  [K in Events.EventName]: Events.EventData<K>;
} & DerivedEventData;

export type EventName = keyof EventData;

const isDerivedEvent = (event: EventName): event is DerivedEventName => event in derivedEventFields;

function register<T extends EventName>(event: T, callback: (data: EventData[T]) => void): void {
  if (isDerivedEvent(event)) {
    let listeners = callbacks.get(event);

    if (!listeners) {
      listeners = [];
      callbacks.set(event, listeners);

      const fieldNames: readonly string[] = derivedEventFields[event];

      on(`events:${event}`, (dataArray: number[]): void => {
        const data: Record<string, number> = {};
        fieldNames.forEach((name, n) => {
          data[name] = dataArray[n];
        });
        for (const cb of callbacks.get(event) ?? []) {
          cb(data);
        }
      });
    }

    listeners.push(callback as DerivedListener);
    return;
  }

  PVEvents.register(event as Events.EventName, callback as (data: unknown) => void);
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
