import { io } from 'socket.io-client';

import App from '../app';
import items from '@lib/shared/items';

const socketServerUri = process.env.SOCKET_SERVER_CONNECTION as string;
const socketServerKey = process.env.SOCKET_SERVER_KEY as string;
const socketClientUri = process.env.SOCKET_USER_CONNECTION as string;

window.GetHashKey = (text: string): number => {
  const keyLowered = text.toLowerCase();
  const length = text.length;
  let hash, i;

  for (hash = i = 0; i < length; i++) {
    hash += keyLowered.charCodeAt(i);
    hash += hash << 10;
    hash ^= hash >>> 6;
  }

  hash += hash << 3;
  hash ^= hash >>> 11;
  hash += hash << 15;

  return hash;
};

// @ts-ignore
const emitUI = (evtName, ...args) => {
  const message = new MessageEvent('message', {
    data: {
      type: 'event',
      evtName: evtName,
      args: args,
    },
  });
  dispatchEvent(message);
};
// @ts-ignore
window.emitUI = emitUI;

// @ts-ignore
const awaitUI = (evtName, ...args) => {
  const message = new MessageEvent('message', {
    data: {
      type: 'rpc',
      evtName: evtName,
      args: args,
    },
  });
  dispatchEvent(message);
};
// @ts-ignore
window.awaitUI = awaitUI;

let speakVolume = 2;
window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 't':
      emitUI('chat.state', { show: true });
      break;
    case 'k':
      emitUI('inventory.state', { show: true, targetInventory: `horse:1` });
      break;
    case 'b':
      speakVolume++;
      if (speakVolume > 3) speakVolume = 1;
      emitUI('hud.state', { speakVolume });
      break;
  }
});

const sendInventoryItems = () => {
  const uiItems: Inventory.UIItems = {};
  for (const item of Object.values(items)) {
    uiItems[item.identifier] = {
      name: item.name,
      description: item.description || '',
      image: item.image,
      weight: item.weight,
      stackSize: item.stackSize,
      maxDurability: item.maxDurability,
      maxLife: item.maxLife,
    };
  }

  emitUI('inventory.items', uiItems);
};

setTimeout(() => {
  sendInventoryItems();
  // emitUI('inventory.state', { mainInventory: `character:1`, targetInventory: `stash:1` });
  // emitUI('inventory.state', { mainInventory: `character:1`, targetInventory: `horse:1` });
  emitUI('inventory.state', { mainInventory: `character:1`, targetInventory: '' });
}, 1000);

const loadApp = async () => {
  const serverSocket = io(socketServerUri, {
    autoConnect: false,
    transports: ['websocket'],
    auth: { token: socketServerKey },
  });

  const clientSocket = io(socketClientUri, {
    reconnectionAttempts: 0,
    autoConnect: false,
    auth: {},
  });

  serverSocket.on('connect', async () => {
    const token = await new Promise((res) => {
      serverSocket.emit('generateJWT', 1, [], res);
    });

    clientSocket.auth = { token };

    App(clientSocket);

    clientSocket.connect();

    // @ts-ignore
    window.emitServer = (evtName, ...args) => {
      serverSocket.emit(evtName, ...args);
    };
  });

  serverSocket.connect();

  clientSocket.on('connect_error', async (e) => {
    console.log('connect_error', e);
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  });

  clientSocket.on('connect', () => {
    console.log('connected to /users');
  });
};

export default () => {
  loadApp();
  return <></>;
};
