declare interface ClientExports {
  events: Events.ClientExports;
}

declare namespace Events {
  type EventName = import('./catalog').EventName;
  type EventData<T extends EventName> = import('./managers/event-poller').EventData<T>;

  type register = <T extends EventName>(name: T, callback: (data: EventData<T>) => void) => void;
  type unregister = <T extends EventName>(name: T, callback: (data: EventData<T>) => void) => void;
  type once = <T extends EventName>(name: T, callback: (data: EventData<T>) => void) => void;
  type awaitEvent = <T extends EventName>(name: T) => Promise<EventData<T>>;

  type ClientExports = {
    register: register;
    unregister: unregister;
    once: once;
    awaitEvent: awaitEvent;
    keyRegister: keyRegister;
    registerCronEvent: registerCronEvent;
    registerTimeEvent: registerTimeEvent;
    unregisterCronTimeEvent: unregisterCronTimeEvent;
    registerStateEvent: registerStateEvent;
    unregisterStateEvent: unregisterStateEvent;
  };
}
