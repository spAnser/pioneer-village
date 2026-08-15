import { randomBytes } from 'crypto';
import { createServer } from 'http';
import { verify } from 'jsonwebtoken';
import { Namespace, Server, Socket } from 'socket.io';
import { inspect } from 'util';

import { logEvent } from './helpers';

export const userAccessKey = randomBytes(64).toString('hex');

const requireUuid = (socket: Socket, next: (err?: Error) => void) => {
  verify(socket.handshake.auth.token, userAccessKey, (err: any, user: any) => {
    if (err) {
      return next(err);
    }
    socket.data.user = user;
    next();
  });
};

const requireServerKey = (socket: Socket, next: (err?: Error) => void) =>
  next(socket.handshake.auth.token === process.env.SOCKET_SERVER_KEY ? undefined : new Error('invalid'));

const logAll = (socket: Socket, next: (err?: Error) => void) => {
  socket.onAny((...args: any[]) => logEvent(socket.nsp.name, inspect(args, { depth: null, colors: true })));
  // socket.onAny((...args: any[]) =>
  //   logEvent(socket.nsp.name, JSON.stringify(args.filter((arg) => typeof arg !== 'function')).substring(0, 100)),
  // );
  next();
};

const server = createServer();
const io = new Server(server);

export default server;

export const serverNamespace: Namespace<SocketIn.FromGameServer, SocketOut.ToGameServer & SocketInternal.Events> = io
  .of('/server')
  .use(requireServerKey)
  .use(logAll);

export const userNamespace: Namespace<SocketIn.FromClient, SocketOut.ToClient> = io
  .of('/users')
  .use(requireUuid)
  .use(logAll);

// Each controller registers one 'connection' listener per namespace.
// Set a generous limit so Node doesn't warn as more controllers are added.
serverNamespace.setMaxListeners(50);
userNamespace.setMaxListeners(50);

// setTimeout(() => {
//   console.log('Shutting down server after 1 second for testing purposes');
//   process.exit();
// }, 1500);
