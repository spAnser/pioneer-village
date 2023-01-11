import { io } from 'socket.io-client';
import { awaitClient, emitClient } from '@lib/ui';
import App from './app';

/*******
we've got some weird timing issue here:
Resources such as 'queue' attempt to register ui callbacks, but can't until UI resource has fully started
But the UI seems to be a lot quicker and is able to awaitClient before its registered

Still working on a fix, but for now here's a hacky timeout
*/

setTimeout(async () => {
  const { socketUrl, token } = await awaitClient('getSocketDetails');

  const socket = io(socketUrl, {
    secure: true,
    rejectUnauthorized: false,
    reconnectionAttempts: 0,
    autoConnect: false,
    auth: { token },
  });

  socket.on('connect_error', async (e) => {
    console.log('socket error', e);
    await new Promise((res) => setTimeout(res, 1e3));
    const { token } = await awaitClient('getSocketDetails', false);
    socket.auth = { token };
    socket.connect();
  });

  socket.on('connect', () => {
    console.log('connected');
    emitClient('socket.connected');
  });

  App(socket);

  socket.connect();
}, 1e3);
