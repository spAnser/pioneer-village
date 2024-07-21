const eventListenerRegistry: Set<[string, any]> = new Set();
const rpcBuffer: Set<[string, any]> = new Set();
const emitBuffer: Set<any[]> = new Set();
const socketBuffer: Set<any[]> = new Set();
const awaitBuffer: Map<any[], any> = new Map();
const focusBuffer: Map<any[], any> = new Map();

//@ts-ignore
export const emitUI: UI.emitUI = (...args) => {
  if (GetResourceState('ui') === 'started') {
    setImmediate(() => global.exports['ui'].emitUI(...args));
  } else {
    emitBuffer.add(args);
  }
};

//@ts-ignore
export const emitSocket: UI.emitSocket = (...args) => {
  if (GetResourceState('ui') === 'started') {
    setImmediate(() => global.exports['ui'].emitUI('__socket__', ...args));
  } else {
    socketBuffer.add(args);
  }
};

//@ts-ignore
export const awaitUI: UI.awaitUI = (...args) => {
  if (GetResourceState('ui') === 'started') {
    return new Promise((res) => setImmediate(() => res(global.exports['ui'].awaitUI(...args))));
  }
  return new Promise((res) => {
    awaitBuffer.set(args, res);
  });
};

//@ts-ignore
export const onUI: UI.onUI = (...args) => {
  if (GetResourceState('ui') === 'started') {
    setImmediate(() => global.exports['ui'].onUI(...args));
  }
  eventListenerRegistry.add(args);
};

//@ts-ignore
export const onSocket: UI.onUI = onUI;

//@ts-ignore
export const onUICall: UI.onUICall = (...args) => {
  if (GetResourceState('ui') === 'started') {
    setImmediate(() => global.exports['ui'].onUICall(...args));
  }
  rpcBuffer.add(args);
};

//@ts-ignore
export const focusUI: UI.focusUI = (...args) => {
  if (GetResourceState('ui') === 'started') {
    return new Promise((res) => setImmediate(() => res(global.exports['ui'].focusUI(...args))));
  }
  return new Promise((res) => {
    focusBuffer.set(args, res);
  });
};

on('onResourceStart', (resource: string) => {
  if (resource !== 'ui') {
    return;
  }

  //@ts-ignore
  eventListenerRegistry.forEach((params) => exports['ui'].onUI(...params));

  //@ts-ignore
  rpcBuffer.forEach((params) => exports['ui'].onUICall(...params));

  //@ts-ignore
  emitBuffer.forEach((params) => exports['ui'].emitUI(...params));

  //@ts-ignore
  socketBuffer.forEach((params) => exports['ui'].emitUI('__socket__', ...params));

  awaitBuffer.forEach(async (resolve, args) => {
    //@ts-ignore
    resolve(global.exports['ui'].awaitUI(...args));
  });

  //@ts-ignore
  focusBuffer.forEach((params) => exports['ui'].focusBuffer(...params));
});

// TODO: Replace this
const DEV_ENV = true;
export const Log = (...messages: any[]) => {
  if (DEV_ENV) {
    emitUI('log.message', {
      resource: GetCurrentResourceName(),
      message: messages
        .map((item) => {
          if (typeof item === 'object') {
            return JSON.stringify(item, null, 2);
          }
          return item;
        })
        .join(' '),
    });
  }
};
export const LogExtra = (...messages: any[]) => {
  console.log(...messages);
  Log(...messages);
};
