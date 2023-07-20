import { Socket } from 'socket.io-client';
import { emitClient } from '@lib/ui';

export default (socket: Socket<UISocketEvents, SocketServer.Client & SocketServer.ClientEvents>) => {
  socket.on('character-client-update.getCharacter', (character) => {
    emitClient('character-client-update.getCharacter', character);
  });
  socket.on('character-client-update.updateAttribute', (...args) => {
    emitClient('character-client-update.updateAttribute', ...args);
  });
};
