import { exports } from '@lib/client';
import { EventManager } from '../managers/event-manager';
import { KeyManager } from '../managers/key-manager';

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

exports<'events'>('register', register);
exports<'events'>('unregister', unregister);
exports<'events'>('keyRegister', keyRegister);
