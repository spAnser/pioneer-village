import { exports } from '@lib/client';
import { initManager } from './managers/init-manager';

const register: Init.register = (name, options) => {
  return initManager.register(name, options);
};
const registerResource: Init.registerResource = (resourceName) => {
  return initManager.registerResource(resourceName);
};
const initialized: Init.initialized = (name) => {
  return initManager.initialized(name);
};

const initializedResource: Init.initializedResource = (resourceName) => {
  return initManager.initializedResource(resourceName);
};
const resolve: Init.resolve = (name) => {
  return initManager.resolve(name);
};
const resolveResource: Init.resolveResource = (resourceName) => {
  return initManager.resolveResource(resourceName);
};
const reject: Init.reject = (name) => {
  return initManager.reject(name);
};
const rejectResource: Init.rejectResource = (resourceName) => {
  return initManager.rejectResource(resourceName);
};

exports<'init'>('register', register);
exports<'init'>('registerResource', registerResource);
exports<'init'>('initialized', initialized);
exports<'init'>('initializedResource', initializedResource);
exports<'init'>('resolve', resolve);
exports<'init'>('resolveResource', resolveResource);
exports<'init'>('reject', reject);
exports<'init'>('rejectResource', rejectResource);
