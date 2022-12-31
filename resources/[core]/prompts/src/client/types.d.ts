declare interface ClientExports {
  prompts: Prompts.ClientExports;
}

declare namespace Prompts {
  type Type =
    | 'create'
    | 'createHold'
    | 'createHoldIndefinitely'
    | 'createMash'
    | 'createMashAuto'
    | 'createMashManual'
    | 'createMashManualFail'
    | 'createMashResist'
    | 'createMashResistFail';

  type register = (
    callback: Function,
    promptType: Prompts.Type,
    name: string,
    key: number,
    label: string,
    duration?: number,
    enabled?: boolean,
    visible?: boolean,
  ) => void;
  type registerWithEvent = (
    promptType: Prompts.Type,
    name: string,
    key: number,
    label: string,
    duration?: number,
    enabled?: boolean,
    visible?: boolean,
  ) => void;
  type show = (name: string, label?: string | null) => void;
  type hide = (name: string) => void;
  type enable = (name: string) => void;
  type disable = (name: string) => void;
  type updatePromptText = (name: string, text: string | number) => void;
  type addToEntity = (name: string, entity: number) => void;
  type removeFromEntity = (name: string, entity: number) => void;
  type showAtEntity = (name: string, label: string, entity: number) => void;

  type ClientExports = {
    register: register;
    registerWithEvent: registerWithEvent;
    show: show;
    hide: hide;
    enable: enable;
    disable: disable;
    updatePromptText: updatePromptText;
    addToEntity: addToEntity;
    removeFromEntity: removeFromEntity;
    showAtEntity: showAtEntity;
  };
}
