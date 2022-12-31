import { Socket } from 'socket.io-client';
import { onClientCall } from '@lib/ui';

export default (socket: Socket<UISocketEvents, SocketServer.Client & SocketServer.ClientEvents>) => {
  onClientCall('world.registered-objects', () => {
    return new Promise((resolve) => {
      socket.emit('world.registered-objects', (data) => {
        resolve(data);
      });
    });
  });
  onClientCall('world.request-creation', (name) => {
    return new Promise((resolve) => {
      socket.emit('world.request-creation', name, (success) => {
        resolve(success);
      });
    });
  });
};
