const callListeners: Map<string, (...args: any[]) => any> = new Map();
const eventListeners: Map<string, ((...args: any[]) => void)[]> = new Map();

const perform = (action: string, params: any = {}) =>
  //@ts-ignore
  fetch(`https://ui/${action}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(params),
  }).then((resp: any) => resp.json())

export const emitClient: UI.emitClient = (evtName, ...params) => perform('uiEvent', {
  evtName,
  params
});

export const awaitClient: UI.awaitClient = async (evtName, ...params) => {
  console.log('performing ui request', evtName);
  const { success, response} = await perform('uiRequest', {
    evtName,
    params
  });
  if (!success) {
    throw new Error(response);
  }
  return response;
}

export const onClient: UI.onClient = (evtName, callback) => {
  if (!eventListeners.has(evtName)) {
    eventListeners.set(evtName, []);
  }
  //@ts-ignore
  eventListeners.get(evtName)?.push(callback);
}

export const onClientCall: UI.onClientCall = (evtName, callback) => {
  if (callListeners.has(evtName)) {
    throw new Error(`We already have an onClientCall registered for ${evtName}`);
  }
  callListeners.set(evtName, callback);
}

//@ts-ignore
window.addEventListener('message', async (msg: any) => {
  const data = msg.data;
  if (data.type === 'rpc') {
    const { cId, evtName, args } = data;
    const listener = callListeners.get(evtName);
    if (!listener) {
      perform('uiResponse', {
        cId,
        success: false,
        response: `Unable to find call listener for ${evtName}`
      });
      return;
    }
    let response: any = null;
    let success = false;
    try {
      response = await Promise.resolve(listener(...args));
      success = true;
    } catch (e: any) {
      response = (e && e.message) || `Failed to call ${evtName}`;
    }
    perform('uiResponse', {
      cId,
      success,
      response
    });
    return;
  }
  if (data.type === 'event') {
    const { evtName, args } = data;
    const listeners = eventListeners.get(evtName);
    if (!listeners) {
      return;
    }
    listeners.forEach((listener) => {
      Promise.resolve(listener(...args));
    });
    return;
  }
});
