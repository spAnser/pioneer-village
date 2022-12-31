declare interface ClientExports {
  events: Events.ClientExports;
}

declare namespace Events {
  type register = (identifier: string, event: string, callback: (...args: number[]) => void) => void;
  type unregister = (identifier: string, event: string) => void;
  type keyRegister = (command: string, name: string, method: string, key: string) => void;

  type ClientExports = {
    register: register;
    unregister: unregister;
    keyRegister: keyRegister;
  };
}
