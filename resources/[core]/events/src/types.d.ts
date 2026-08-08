declare interface RPC {}

declare namespace Events {
  // Registry mapping each state key -> the value type it carries.
  // Extend this (here or via declaration merging from other resources) to add keys.
  interface StateEventMap {
    applyForce: [number, number, number];
    lanternOilColor: { attachPoint: number; oilColor: [number, number, number] };
  }

  // The set of known state keys, derived from the map.
  type StateName = keyof StateEventMap;

  // A callback for a specific key K: value is narrowed to the key's value type.
  type StateCallback<K extends StateName = StateName> = (entity: number, key: K, value: StateEventMap[K]) => void;

  type TimeConfig =
    | {
        type: 'cron';
        resource: string;
        cron: string;
        nextFire: number;
        lastFired?: number;
      }
    | {
        type: 'time';
        resource: string;
        time: number;
        fired?: number;
        deleteAfterFire?: boolean;
      };

  type StateOpts<K extends StateName = StateName> = {
    callback: StateCallback<K>;
    includeClear?: boolean;
    includeSelf?: boolean;
  };

  // The union of every key's opts, for heterogeneous storage (e.g. the manager's Map).
  type AnyStateOpts = { [K in StateName]: StateOpts<K> }[StateName];

  type register = (identifier: string, event: string, callback: (...args: number[]) => void) => void;
  type unregister = (identifier: string, event: string) => void;
  type keyRegister = (command: string, name: string, method: string, key: string) => void;
  type registerCronEvent = (eventId: string, cron: string) => string;
  type registerTimeEvent = (eventId: string, time: number, deleteAfterFire?: boolean) => string;
  type unregisterCronTimeEvent = (eventId: string) => void;
  type registerStateEvent = <K extends StateName>(identifier: string, key: K, opts: StateOpts<K>) => void;
  type unregisterStateEvent = (identifier: string) => void;
}
