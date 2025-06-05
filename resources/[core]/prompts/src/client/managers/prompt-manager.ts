import { Delay } from '@lib/functions';
import { PVInit } from '@lib/client';
import { PromptAttribute } from '@lib/flags/prompt-attribute';
import { Log } from '@lib/client/comms/ui';

// const temporaryPromptGroup = 3;
// const showPromptGroup = 4;
const temporaryPromptGroup = 69;
const showPromptGroup = 420;

class PromptManager {
  protected static instance: PromptManager;

  static getInstance(): PromptManager {
    if (!PromptManager.instance) {
      PromptManager.instance = new PromptManager();
    }
    return PromptManager.instance;
  }

  // promptInterval;
  prompts: Record<string, any> = {};
  registeredPrompts: Map<string, [Prompts.Type, string, number, string, number?, boolean?, boolean?]> = new Map();
  promptCallbacks: Map<string, Function> = new Map();

  constructor() {
    // this.promptInterval = setInterval(() => {
    //   for (const [name, prompt] of Object.entries(this.prompts)) {
    //     if (
    //       (prompt.mode === 'standard' && PromptHasStandardModeCompleted(prompt.id, 0)) ||
    //       (prompt.mode === 'hold' && PromptHasHoldModeCompleted(prompt.id))
    //     ) {
    //       // Log('Trigger', name + '::completed', prompt)
    //       this.temporarilyDisablePrompts();
    //       const callback = this.promptCallbacks.get(name);
    //       if (callback) {
    //         callback();
    //       }
    //     }
    //   }
    // }, 100);
    on('onResourceStop', (resourceName: string) => {
      if (resourceName === GetCurrentResourceName()) {
        // clearInterval(this.promptInterval);
        for (const prompt of Object.values(this.prompts)) {
          UiPromptDelete(prompt.id);
        }
      }
    });

    PVInit.resolveResource('prompts');
  }

  register(
    callback: Function,
    promptType: Prompts.Type,
    name: string,
    key: number,
    label: string,
    duration: number | undefined = undefined,
    enabled = true,
    visible = true,
  ): void {
    if (!this.registeredPrompts.has(name)) {
      // Register a new prompt
      this.promptCallbacks.set(name, callback);
      this.registeredPrompts.set(name, [promptType, name, key, label, duration, enabled, visible]);
      this.createFromRegistered(name);
      on(`lua::${name}::completed`, () => {
        const callback = this.promptCallbacks.get(name);
        if (callback) {
          callback();
        }
      });
    } else {
      // Update the callback if it already exists
      this.promptCallbacks.set(name, callback);
    }
  }

  createFromRegistered(name: string): void {
    if (this.prompts[name]) {
      UiPromptDelete(this.prompts[name].id);
      delete this.prompts[name];
    }
    const registeredPrompt = this.registeredPrompts.get(name);
    if (registeredPrompt) {
      const [promptType, _, key, label, duration, enabled, visible] = registeredPrompt;
      switch (promptType) {
        case 'create':
          this.create(name, key, label, duration, enabled, visible);
        case 'createHold':
          this.createHold(name, key, label, duration, enabled, visible);
        // case 'createHoldIndefinitely':
        //   this.createHoldIndefinitely(name, key, label, duration, enabled, visible);
        // case 'createMash':
        //   this.createMash(name, key, label, duration, enabled, visible);
        // case 'createMashAuto':
        //   this.createMashAuto(name, key, label, duration, enabled, visible);
        // case 'createMashManual':
        //   this.createMashManual(name, key, label, duration, enabled, visible);
        // case 'createMashManualFail':
        //   this.createMashManualFail(name, key, label, duration, enabled, visible);
        // case 'createMashResist':
        //   this.createMashResist(name, key, label, duration, enabled, visible);
        // case 'createMashResistFail':
        //   this.createMashResistFail(name, key, label, duration, enabled, visible);
      }
      // this[promptType](name, key, label, duration, enabled, visible);
    }
  }

  show(name: string, label: string | null = null): void {
    setImmediate(() => {
      let prompt = this.prompts[name];
      if (!prompt || !UiPromptIsValid(prompt.id)) {
        if (this.registeredPrompts.has(name)) {
          this.createFromRegistered(name);
        } else {
          return;
        }
      }
      prompt = this.prompts[name];

      if (!prompt) {
        return;
      }

      if (prompt.lastGroup !== showPromptGroup) {
        UiPromptRemoveGroup(prompt.id, prompt.lastGroup);
        // UiPromptSetGroup(prompt.id, temporaryPromptGroup, 0);
      }
      // ClearSameKeyPrompts(prompt, showPromptGroup)
      this.prompts[name].lastGroup = showPromptGroup;
      UiPromptSetGroup(prompt.id, showPromptGroup, 0);
      // if (!IsPedInMeleeCombat(PVGame.playerPed())) {
      //   const labelVar = VarString(10, 'LITERAL_STRING', label);
      //   UiPromptSetActiveGroupThisFrame(showPromptGroup, labelVar, 1, 0, 0, 0);
      // }
      emit('lua::prompts::show', name);
    });
  }

  async hide(name: string): Promise<void> {
    const prompt = this.prompts[name];
    if (!prompt) {
      return;
    }

    if (!UiPromptIsEnabled(prompt.id)) {
      UiPromptSetEnabled(prompt.id, true);
      await Delay(1);
    }
    if (prompt && prompt.lastGroup !== temporaryPromptGroup) {
      UiPromptRemoveGroup(prompt.id, prompt.lastGroup);
    }
    this.prompts[name].lastGroup = temporaryPromptGroup;
    UiPromptSetGroup(prompt.id, temporaryPromptGroup, 0);
    emit('lua::prompts::hide', name);
  }

  async temporarilyDisablePrompts(duration = 1000): Promise<void> {
    for (const prompt of Object.values(this.prompts)) {
      UiPromptSetEnabled(prompt.id, false);
    }
    await Delay(duration);
    for (const prompt of Object.values(this.prompts)) {
      UiPromptSetEnabled(prompt.id, prompt.enabled);
    }
  }

  disable(name: string): void {
    if (!this.prompts[name]) {
      return;
    }
    const id = this.prompts[name].id;
    this.prompts[name].enabled = false;
    emit('lua::prompts::prompt', name, { id, mode: this.prompts[name].mode, enabled: false });
    UiPromptSetEnabled(id, false);
    Log(`PromptSetEnabled(id, ${false});`);
  }

  enable(name: string): void {
    if (!this.prompts[name]) {
      return;
    }
    const id = this.prompts[name].id;
    this.prompts[name].enabled = true;
    emit('lua::prompts::prompt', name, { id, mode: this.prompts[name].mode, enabled: true });
    UiPromptSetEnabled(id, true);
  }

  updatePromptText(name: string, text: string | number): void {
    if (!this.prompts[name]) {
      return;
    }
    const id = this.prompts[name].id;
    this.prompts[name].label = text;
    text = VarString(10, 'LITERAL_STRING', text.toString());
    UiPromptSetText(id, text);
  }

  create(name: string, key: number, text: string, duration = 1000, enabled = true, visible = true): number {
    let id;
    if (this.prompts[name] && this.prompts[name].id) {
      id = this.prompts[name].id;
      UiPromptSetStandardMode(id, false);
      UiPromptSetHoldMode(id, 0);
    } else {
      id = UiPromptRegisterBegin();
    }
    UiPromptSetControlAction(id, key);
    UiPromptSetText(id, VarString(10, 'LITERAL_STRING', text));
    UiPromptSetEnabled(id, enabled);
    UiPromptSetVisible(id, visible);
    UiPromptSetStandardMode(id, true);
    UiPromptSetAttribute(id, PromptAttribute._0xA9F5CB58, true);

    UiPromptSetGroup(id, temporaryPromptGroup, 0);
    if (!this.prompts[name]) {
      UiPromptRegisterEnd(id);
    }
    this.prompts[name] = {
      id: id,
      key: key,
      mode: 'standard',
      duration,
      enabled,
      visible,
      lastGroup: temporaryPromptGroup,
    };
    emit('lua::prompts::prompt', name, { id, mode: 'standard', enabled: true });
    Log(`Created prompt: ${id} ${name}`);
    return id;
  }

  createHold(name: string, key: number, text: string, duration = 1000, enabled = true, visible = true): number {
    const id = this.create(name, key, text, duration, enabled, visible);

    UiPromptSetStandardMode(id, false);
    UiPromptSetHoldMode(id, 1);

    this.prompts[name].mode = 'hold';
    emit('lua::prompts::prompt', name, { id, mode: 'hold', enabled: true });

    return id;
  }

  // TODO: Fix up
  addToEntity(name: string, entity: number) {
    if (!this.prompts[name]) {
      return;
    }
    const prompt = this.prompts[name];

    const promptGroup = UiPromptGetGroupIdForTargetEntity(entity);

    if (promptGroup && promptGroup !== prompt.lastGroup) {
      if (prompt.lastGroup) {
        UiPromptRemoveGroup(prompt.id, prompt.lastGroup);
      }
      UiPromptSetGroup(prompt.id, promptGroup, 0);
      prompt.lastGroup = promptGroup;
      // @ts-ignore
      // PromptSetAmbientGroupThisFrame(entity, 1.5, 1, 1, 0, 'Beer', 0);
    }
  }

  removeFromEntity(name: string, entity: number) {
    if (!this.prompts[name]) {
      return;
    }
    const prompt = this.prompts[name];

    if (prompt.lastGroup === temporaryPromptGroup) {
      return;
    }

    const promptGroup = UiPromptGetGroupIdForTargetEntity(entity);

    if (promptGroup) {
      UiPromptRemoveGroup(prompt.id, promptGroup);
      UiPromptSetGroup(prompt.id, temporaryPromptGroup, 0);
      prompt.lastGroup = temporaryPromptGroup;
    }
  }

  showAtEntity(name: string, label: string, entity: number) {
    if (!this.prompts[name]) {
      return;
    }

    const prompt = this.prompts[name];
  }
}

const promptManager = PromptManager.getInstance();

export default promptManager;
