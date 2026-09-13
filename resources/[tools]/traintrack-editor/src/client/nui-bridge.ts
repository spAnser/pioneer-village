export function sendToUI(message: TraintrackEditor.HostMessage): void {
  SendNuiMessage(JSON.stringify(message));
}

export function onNuiCallback<T = unknown, R = unknown>(name: string, handler: (data: T) => R | void): void {
  RegisterNuiCallbackType(name);
  on(`__cfx_nui:${name}`, (data: T, cb: (res: R | Record<string, never>) => void) => {
    const result = handler(data);
    cb(result === undefined ? {} : result);
  });
}
