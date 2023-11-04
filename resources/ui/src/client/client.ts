import './auto-close-layers';
import './cleanup';
import './crosshair';
import { Log } from '@lib/client/comms/ui';

const callListeners: Map<string, Map<string, (...args: any[]) => any>> = new Map();
const eventListeners: Map<string, Map<string, (...args: any[]) => any>> = new Map();
const pendingCallbacks: Map<number, PendingCallback> = new Map();
let callId = 0;

const onUICall: UI.onUICall = (evtName, callback) => {
  const resource = GetInvokingResource();
  if (!callListeners.has(resource)) {
    callListeners.set(resource, new Map());
  }
  const listeners = callListeners.get(resource)!;
  if (listeners.has(evtName)) {
    // already registed event. lets ignore.
    return;
  }
  Log(`registering listener ${resource}/${evtName}`);
  listeners.set(evtName, callback);
};

const onUI: UI.onUI = (evtName, callback) => {
  const resource = GetInvokingResource();
  if (!eventListeners.has(resource)) {
    eventListeners.set(resource, new Map());
  }
  const listeners = eventListeners.get(resource)!;
  if (listeners.has(evtName)) {
    // already registered event. lets ignore.
    return;
  }
  listeners.set(evtName, callback);
};

const awaitUI: UI.awaitUI = (evtName, ...args) => {
  const cId = callId++;
  const promise = new Promise<any>((resolve, reject) => {
    pendingCallbacks.set(cId, {
      resolve,
      reject,
      timeout: setTimeout(() => {
        reject(new Error(`RPC call timeout to UI with event ${evtName}`));
      }, 10e3),
    });
  });

  promise.finally(() => {
    pendingCallbacks.delete(cId);
  });

  SendNUIMessage({
    type: 'rpc',
    cId,
    evtName,
    args,
  });

  return promise;
};

const emitUI: UI.emitUI = (evtName, ...args) =>
  SendNUIMessage({
    type: 'event',
    evtName,
    args,
  });

const focusUI: UI.focusUI = (hasFocus, hasCursor) => SetNuiFocus(hasFocus, hasCursor);

on('onResourceStop', (resource: string) => {
  callListeners.delete(resource);
  eventListeners.delete(resource);
});

RegisterNuiCallbackType('uiResponse');
on(
  `__cfx_nui:uiResponse`,
  async ({ cId, success, response }: { cId: number; success: boolean; response: any }, cb: (res: any) => void) => {
    const callbackInfo = pendingCallbacks.get(cId);
    if (!callbackInfo) {
      return cb({});
    }
    const { resolve, reject, timeout } = callbackInfo;
    clearTimeout(timeout);
    if (success) {
      resolve(response);
    } else {
      reject(new Error(response));
    }
    pendingCallbacks.delete(cId);
    cb({});
  },
);

RegisterNuiCallbackType('uiEvent');
on(`__cfx_nui:uiEvent`, async ({ evtName, params }: { evtName: string; params: any[] }, cb: (res: any) => void) => {
  eventListeners.forEach((listeners) => {
    const listener = listeners.get(evtName);
    if (listener) {
      listener(...params);
    }
  });
  cb({});
});

RegisterNuiCallbackType('uiRequest');
on(
  `__cfx_nui:uiRequest`,
  async ({ evtName, params }: { cId: number; evtName: string; params: any[] }, cb: (res: any) => void) => {
    let processed = false;
    let success = false;
    let response: any = null;
    Log(`Processing UI callback for ${evtName}`);

    callListeners.forEach((listeners) => {
      if (processed) {
        return;
      }

      const listener = listeners.get(evtName);
      if (!listener) {
        return;
      }

      processed = true;

      (async () => {
        Log(`Attempting to resolve listener for ${evtName}`);
        try {
          response = await Promise.resolve(listener(...params));
          success = true;
        } catch (e: any) {
          response = (e && e.message) || `Failed to call ${evtName}`;
        }
        Log(`Response from ${evtName}, success: ${success}`);
        cb({
          success,
          response,
        });
      })();
    });
    if (!processed) {
      cb({
        success: false,
        response: `Unable to find call handler for ${evtName}`,
      });
    }
  },
);

onUI('nui.close', () => {
  SetNuiFocus(false, false);
});

// we dont want these visible to typescript as we dont want these called directly
global.exports('onUICall', onUICall);
global.exports('onUI', onUI);
global.exports('awaitUI', awaitUI);
global.exports('emitUI', emitUI);
global.exports('focusUI', focusUI);

RegisterCommand(
  'formTest',
  () => {
    emitUI('form.state', { show: true, title: 'What is your name?' });
    focusUI(true, true);
  },
  false,
);

onUI('form.answer', (formEvent) => {
  focusUI(false, false);
  Log('formEvent', formEvent);
});

RegisterCommand(
  '+openChat',
  () => {
    emitUI('chat.state', { show: true });
    focusUI(true, true);
  },
  false,
);

RegisterKeyMapping('+openChat', 'Chat', 'keyboard', 't');

// TODO: Replace this
const DEV_ENV = true;
onNet('server.log.message', (logData: { resource: string; message: string }) => {
  Log('server.log.message', logData);
  if (DEV_ENV) {
    emitUI('log.message', logData, 'server');
  }
});
