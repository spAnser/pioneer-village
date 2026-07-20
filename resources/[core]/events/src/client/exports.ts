import { exports } from '@lib/client';

import timeManager from '../shared/managers/time-manager';
import { EventName } from './catalog';
import eventPoller, { EventData } from './managers/event-poller';
import keyManager from './managers/key-manager';
import stateManager from './managers/state-bag-manager';

const register = <T extends EventName>(name: T, callback: (data: EventData<T>) => void): void => {
  eventPoller.register(name, callback);
};

const unregister = <T extends EventName>(name: T, callback: (data: EventData<T>) => void): void => {
  eventPoller.unregister(name, callback);
};

const once = <T extends EventName>(name: T, callback: (data: EventData<T>) => void): void => {
  eventPoller.once(name, callback);
};

const awaitEvent = <T extends EventName>(name: T): Promise<EventData<T>> => {
  return eventPoller.awaitEvent(name);
};

const keyRegister: Events.keyRegister = (command, name, method, key) => {
  keyManager.register(command, key);
};

const registerCronEvent: Events.registerCronEvent = (eventId, cron) => {
  return timeManager.registerCronEvent(eventId, cron);
};

const registerTimeEvent: Events.registerTimeEvent = (eventId, time) => {
  return timeManager.registerTimeEvent(eventId, time);
};

const unregisterCronTimeEvent: Events.unregisterCronTimeEvent = (eventId) => {
  timeManager.unregisterEvent(eventId);
};

const registerStateEvent: Events.registerStateEvent = (identifier, key, opts) => {
  stateManager.register(identifier, key, opts);
};

const unregisterStateEvent: Events.unregisterStateEvent = (identifier) => {
  // timeManager.unregisterEvent(eventId);
};

exports<'events'>('register', register);
exports<'events'>('unregister', unregister);
exports<'events'>('once', once);
exports<'events'>('awaitEvent', awaitEvent);
exports<'events'>('keyRegister', keyRegister);
exports<'events'>('registerCronEvent', registerCronEvent);
exports<'events'>('registerTimeEvent', registerTimeEvent);
exports<'events'>('unregisterCronTimeEvent', unregisterCronTimeEvent);
exports<'events'>('registerStateEvent', registerStateEvent);
exports<'events'>('unregisterStateEvent', unregisterStateEvent);
