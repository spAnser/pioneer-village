const eventListenerRegistry: Set<[string, any]> = new Set();
const rpcBuffer: Set<[string, any]> = new Set();
const emitBuffer: Set<any[]> = new Set();
const socketBuffer: Set<any[]> = new Set();
const awaitBuffer: Map<any[], any> = new Map();
const focusBuffer: Map<any[], any> = new Map();

export const emitUINotify = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
  emitUI('notification.notify', text, 3000, type, false);
};

export const emitUI: UI.emitUI = <T extends keyof ClientIn.FromSocket>(
  evtName: T,
  ...args: Parameters<ClientIn.FromSocket[T]>
) => {
  if (GetResourceState('ui') === 'started') {
    setImmediate(() => global.exports['ui'].emitUI(evtName, ...args));
  } else {
    emitBuffer.add([evtName, ...args]);
  }
};

export const emitSocket: UI.emitSocket = <T extends keyof SocketForwardEvents>(
  evtName: T,
  ...args: Parameters<SocketForwardEvents[T]>
) => {
  if (GetResourceState('ui') === 'started') {
    setImmediate(() => global.exports['ui'].emitUI('__socket__', evtName, ...args));
  } else {
    socketBuffer.add([evtName, ...args]);
  }
};

export const awaitUI: UI.awaitUI = <T extends keyof ClientRPC.Socket>(
  evtName: T,
  ...args: Parameters<ClientRPC.Socket[T]>
): Promise<ReturnType<ClientRPC.Socket[T]>> => {
  if (GetResourceState('ui') === 'started') {
    return new Promise((res) => setImmediate(() => res(global.exports['ui'].awaitUI(evtName, ...args))));
  }
  return new Promise((res) => {
    awaitBuffer.set([evtName, ...args], res);
  });
};

export const onUI: UI.onUI = <T extends keyof ClientIn.FromSocket>(
  evtName: T,
  callback: (...args: Parameters<ClientIn.FromSocket[T]>) => void,
) => {
  if (GetResourceState('ui') === 'started') {
    setImmediate(() => global.exports['ui'].onUI(evtName, callback));
  }
  eventListenerRegistry.add([evtName, callback]);
};

export const onSocket: UI.onUI = onUI;

export const onUICall: UI.onUICall = <T extends keyof ClientRPC.Socket>(
  evtName: T,
  callback: (
    ...args: Parameters<ClientRPC.Socket[T]>
  ) => Promise<ReturnType<ClientRPC.Socket[T]>> | ReturnType<ClientRPC.Socket[T]>,
) => {
  if (GetResourceState('ui') === 'started') {
    setImmediate(() => global.exports['ui'].onUICall(evtName, callback));
  }
  rpcBuffer.add([evtName, callback]);
};

export const focusUI: UI.focusUI = (hasFocus: boolean, hasCursor: boolean) => {
  if (GetResourceState('ui') === 'started') {
    setImmediate(() => global.exports['ui'].focusUI(hasFocus, hasCursor));
  } else {
    focusBuffer.set([hasFocus, hasCursor], true);
  }
};

on('onResourceStart', (resource: string) => {
  if (resource !== 'ui') {
    return;
  }

  eventListenerRegistry.forEach((params) => global.exports['ui'].onUI(...params));

  rpcBuffer.forEach((params) => global.exports['ui'].onUICall(...params));

  emitBuffer.forEach((params) => global.exports['ui'].emitUI(...params));

  socketBuffer.forEach((params) => global.exports['ui'].emitUI('__socket__', ...params));

  awaitBuffer.forEach(async (resolve, args) => {
    resolve(global.exports['ui'].awaitUI(...args));
  });

  focusBuffer.forEach((_, params) => global.exports['ui'].focusUI(...params));
});
