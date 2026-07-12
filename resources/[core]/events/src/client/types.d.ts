declare interface ClientExports {
  events: Events.ClientExports;
}

declare namespace Events {
  type ClientExports = {
    register: register;
    unregister: unregister;
    keyRegister: keyRegister;
    registerCronEvent: registerCronEvent;
    registerTimeEvent: registerTimeEvent;
    unregisterCronTimeEvent: unregisterCronTimeEvent;
    registerStateEvent: registerStateEvent;
    unregisterStateEvent: unregisterStateEvent;
  };
}
