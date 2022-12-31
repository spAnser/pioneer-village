import { Socket } from 'socket.io-client';
import { onClientCall } from '@lib/ui';

export default (socket: Socket<UISocketEvents, SocketServer.Client & SocketServer.ClientEvents>) => {
  onClientCall('stable.load-character-horses', (characterId) => {
    return new Promise((resolve) => {
      socket.emit('stable.load-character-horses', characterId, (data) => {
        resolve(data);
      });
    });
  });
};
