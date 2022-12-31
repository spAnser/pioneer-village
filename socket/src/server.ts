import { createServer } from 'http';
import { Namespace, Server, Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { logEvent } from './helpers/log';
import { inspect } from 'util';

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

export const serverNamespace: Namespace<SocketServer.Server & SocketServer.ServerEvents, SocketEvents> = io
  .of('/server')
  .use(requireServerKey)
  .use(logAll);

export const userNamespace: Namespace<SocketServer.Client & SocketServer.ClientEvents, UISocketEvents> = io
  .of('/users')
  .use(requireUuid)
  .use(logAll);
