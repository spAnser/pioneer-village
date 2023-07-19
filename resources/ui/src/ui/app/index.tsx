import { render } from 'preact';
import App from './app';
import { emitClient, onClient } from '@lib/ui';
import { Socket } from 'socket.io-client';

import DoorController from './controllers/doors';
import StableController from './controllers/stable';
import WorldController from './controllers/world';
import BaseController from './controllers/base';

export default (socket: Socket<UISocketEvents, SocketServer.Client & SocketServer.ClientEvents>) => {
  render(<App socket={socket} />, document.body);

  const restartUI = () => {
    window.location.reload();
  };

  onClient('nui.restart', () => {
    console.log('nui.restart');
    restartUI();
  });

  onClient('__socket__', (name, ...args) => {
    console.log('__socket__', name, ...args);
    socket.emit(name, ...args);
  });

  socket.on('__client__', (name, ...args) => {
    console.log('__client__', name, ...args);
    emitClient(name, ...args);
  });

  DoorController(socket);
  StableController(socket);
  WorldController(socket);
  BaseController(socket);

  if (module.hot) {
    module.hot.accept('./app', () => {
      console.log('Accepting the updated App module!');
      restartUI();
    });
  }
};
