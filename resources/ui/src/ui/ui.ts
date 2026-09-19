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
    secure: false,
    rejectUnauthorized: false,
    reconnection: false, // Explicitly disable automatic reconnection
    reconnectionAttempts: 0,
    autoConnect: false,
    auth: { token },
  });

  let isReconnecting = false;
  let reconnectAttempts = 0;

  const reconnect = async () => {
    // Check if we should attempt reconnection
    if (isReconnecting) {
      console.log('Already attempting to reconnect, skipping...');
      return;
    }

    isReconnecting = true;

    while (true) {
      if (socket.connected) break;

      reconnectAttempts++;

      console.log(`Attempting reconnection ${reconnectAttempts}...`);

      // Wait before attempting reconnection (exponential backoff, capped)
      const delay = Math.min(1000 * Math.pow(2, reconnectAttempts - 1), 10000);
      console.log(`Waiting ${delay}ms before next reconnection attempt...`);
      await new Promise((res) => setTimeout(res, delay));

      try {
        const { token } = await awaitClient('getSocketDetails', false);
        socket.auth = { token };

        console.log('Reconnecting to socket server with new token...');

        // Only attempt to connect if socket is not already connected
        if (!socket.connected) {
          console.log('Socket not connected, attempting to connect...');
          socket.connect();
        }
      } catch (error) {
        console.error('Failed to get socket details:', error);
      }
    }

    isReconnecting = false;
  };

  socket.on('connect_error', async (e) => {
    console.log('socket error', e);
    reconnect();
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from socket server');
    reconnect();
  });

  socket.on('connect', () => {
    console.log('connected');
    isReconnecting = false;
    reconnectAttempts = 0; // Reset attempts on successful connection
    emitClient('socket.connected');
  });

  App(socket);

  socket.connect();
}, 1e3);
