import 'dotenv/config';
import { exports } from '@lib/server';
import { io, Socket } from 'socket.io-client';

const socketListeners: Map<string, Map<string, any>> = new Map();

const client: Socket<SocketEvents, SocketServer.Server> = io(process.env.SOCKET_SERVER_CONNECTION, {
  autoConnect: false,
  transports: ['websocket'],
  auth: {
    token: process.env.SOCKET_SERVER_KEY
  }
});

client.on('disconnect', () => {
  console.log('why we disconnect?');
});

setImmediate(() => {
  client.connect();
});

export const emitSocket: Base.emitSocket = (evtName, ...params) => {
  //@ts-ignore fuck u of course its tuple, it's PARAMETERS
  client.emit(evtName, ...params);
};

export const awaitSocket: Base.awaitSocket = (evtName, ...params) =>
  new Promise((res) => {
    //@ts-ignore - fuck it. I'm too thick and it doesnt matter
    client.emit(evtName, ...params, res);
  });

export const onSocket: Base.onSocket = (evtName, callback) => {
  const resource = GetInvokingResource();
  if (!socketListeners.has(resource)) {
    socketListeners.set(resource, new Map());
  }
  const listeners = socketListeners.get(resource)!;
  if (listeners.has(evtName)) {
    // already registed event. lets ignore.
    return;
  }
  listeners.set(evtName, callback);
  client.on(evtName as keyof SocketEvents, callback);
};

on('onResourceStop', (resource: string) => {
  const listeners = socketListeners.get(resource);
  if (listeners) {
    listeners.forEach((callback, evtName) => {
      client.off(evtName as keyof SocketEvents, callback);
    });
  }
});

exports<'base'>('emitSocket', emitSocket);
exports<'base'>('awaitSocket', awaitSocket);
exports<'base'>('onSocket', onSocket);
