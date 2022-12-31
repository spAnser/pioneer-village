const resource = GetCurrentResourceName();
const pendingCallbacks: Map<number, PendingCallback> = new Map();
let callId = 0;

export const onClientCall: onClientCall = (evtName, callback) => {
  onNet(`rpc:${evtName}`, async (originResource: string, callId: number, ...args: any[]) => {
    const serverId = source;
    let response = null;
    let success = false;
    try {
      //@ts-ignore - we can ignore this because it's internal and complex
      response = await Promise.resolve(callback(serverId, ...args));
      success = true;
    } catch (e: any) {
      response = (e && e.message) || `Failed to call ${evtName}`;
    }

    emitNet(`rpc:${originResource}:response`, serverId, callId, success, response);
  });
}

export const emitClient: emitClient = emitNet;
export const onClient: onClient = onNet;

export const awaitClient: awaitClient = (evtName, serverId, ...args) => {
  const cId = callId++;
  emitNet(`rpc:${evtName}`, serverId, resource, cId, ...args);
  const promise = new Promise<any>((resolve, reject) => {
    pendingCallbacks.set(cId, {
      resolve,
      reject,
      timeout: setTimeout(() => {
        reject(new Error(`RPC call timeout to ${serverId} with event ${evtName}`))
      }, 10e3)
    });
  });
  promise.finally(() => {
    pendingCallbacks.delete(cId);
  });
  return promise;
};

onNet(`rpc:${resource}:response`, (cId: number, success: boolean, response: any) => {
  const callbackInfo = pendingCallbacks.get(cId);
  if (!callbackInfo) {
    return;
  }
  const { resolve, reject, timeout } = callbackInfo;
  clearTimeout(timeout);
  if (success) {
    resolve(response);
  } else {
    reject(new Error(response));
  }
})
