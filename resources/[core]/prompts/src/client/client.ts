import { exports } from '@lib/client';

import promptManager from './managers/prompt-manager';

const register: Prompts.register = (callback, promptType, name, key, label, duration, enabled, visible): void => {
  promptManager.register(callback, promptType, name, key, label, duration, enabled, visible);
};

const registerWithEvent: Prompts.registerWithEvent = (
  promptType,
  name,
  key,
  label,
  duration,
  enabled,
  visible,
): void => {
  promptManager.register(
    () => {
      emit(`${name}::completed`);
    },
    promptType,
    name,
    key,
    label,
    duration,
    enabled,
    visible,
  );
};

const show: Prompts.show = (name, label) => {
  promptManager.show(name, label);
};

const hide: Prompts.hide = (name) => {
  promptManager.hide(name);
};

const enable: Prompts.enable = (name) => {
  promptManager.enable(name);
};

const disable: Prompts.disable = (name) => {
  promptManager.disable(name);
};

const updatePromptText: Prompts.updatePromptText = (name, text) => {
  promptManager.updatePromptText(name, text);
};

const addToEntity: Prompts.addToEntity = (name, entity) => {
  promptManager.addToEntity(name, entity);
};

const removeFromEntity: Prompts.removeFromEntity = (name, entity) => {
  promptManager.removeFromEntity(name, entity);
};

const showAtEntity: Prompts.showAtEntity = (name, label, entity) => {
  promptManager.showAtEntity(name, label, entity);
};

exports<'prompts'>('register', register);
exports<'prompts'>('registerWithEvent', registerWithEvent);
exports<'prompts'>('show', show);
exports<'prompts'>('hide', hide);
exports<'prompts'>('enable', enable);
exports<'prompts'>('disable', disable);
exports<'prompts'>('updatePromptText', updatePromptText);
exports<'prompts'>('addToEntity', addToEntity);
exports<'prompts'>('removeFromEntity', removeFromEntity);
