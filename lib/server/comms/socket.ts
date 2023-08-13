const listenerRegistry: Set<[string, any]> = new Set();
const emitBuffer: Set<any[]> = new Set();
const awaitBuffer: Map<any[], any> = new Map();

//@ts-ignore
export const emitSocket: Base.emitSocket = (...args) => {
  if (GetResourceState('base') === 'started') {
    setImmediate(() => exports['base'].emitSocket(...args));
  } else {
    emitBuffer.add(args);
  }
};

//@ts-ignore
export const awaitSocket: Base.awaitSocket = (...args) => {
  if (GetResourceState('base') === 'started') {
    return new Promise((res) => setImmediate(() => res(exports['base'].awaitSocket(...args))));
  }
  return new Promise((res) => {
    awaitBuffer.set(args, res);
  });
};

//@ts-ignore
export const onSocket: Base.onSocket = (...args) => {
  if (GetResourceState('base') === 'started') {
    setImmediate(() => exports['base'].onSocket(...args));
  }
  listenerRegistry.add(args);
};

on('onResourceStart', (resource: string) => {
  if (resource !== 'base') {
    return;
  }

  setImmediate(() => {
    // These dont really need to be typed. they're internal buffers and typing these would make me suicidal

    //@ts-ignore
    listenerRegistry.forEach((params) => exports['base'].onSocket(...params));

    //@ts-ignore
    emitBuffer.forEach((params) => exports['base'].emitSocket(...params));

    awaitBuffer.forEach(async (resolve, args) => {
      //@ts-ignore
      resolve(exports['base'].awaitSocket(...args));
    });
  });
});
