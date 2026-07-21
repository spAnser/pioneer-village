export function sendToUI(message: ZoneManagerNew.HostMessage): void {
  SendNuiMessage(JSON.stringify(message));
}

export function onNuiCallback<T = any, R = any>(name: string, handler: (data: T) => R | void): void {
  RegisterNuiCallbackType(name);
  on(`__cfx_nui:${name}`, (data: T, cb: (res: R | {}) => void) => {
    const result = handler(data);
    cb(result === undefined ? {} : result);
  });
}
