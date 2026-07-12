import { exports } from '@lib/client';

import timeManager from '../shared/managers/time-manager';
import { EventManager } from './managers/event-manager';
import { KeyManager } from './managers/key-manager';
import stateManager from './managers/state-manager';

const eventManager = EventManager.getInstance();
const keyManager = KeyManager.getInstance();

const register: Events.register = (identifier, event, callback) => {
  return eventManager.register(identifier, event, callback);
};

const unregister: Events.unregister = (identifier, event) => {
  return eventManager.unregister(identifier, event);
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
exports<'events'>('keyRegister', keyRegister);
exports<'events'>('registerCronEvent', registerCronEvent);
exports<'events'>('registerTimeEvent', registerTimeEvent);
exports<'events'>('unregisterCronTimeEvent', unregisterCronTimeEvent);
exports<'events'>('registerStateEvent', registerStateEvent);
exports<'events'>('unregisterStateEvent', unregisterStateEvent);
