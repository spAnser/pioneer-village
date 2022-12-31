import 'dotenv/config';
import { onClientCall, awaitSocket, getIdentifiers } from '@lib/server';
import './queue';

const socketDetails: Map<number, SocketDetails> = new Map();

on('onResourceStop', (resourceName: string) => {
  console.log(`[Queue] Stopping ${resourceName}`);
  if (resourceName === 'ui') {
    socketDetails.clear();
  }
});

onClientCall('getSocketDetails', async (serverId, useCache = true) => {
  if (useCache && socketDetails.has(serverId)) {
    return socketDetails.get(serverId) as SocketDetails;
  }
  const identifiers = getIdentifiers(serverId);
  // console.log('identifiers', identifiers);
  const token = await awaitSocket('generateJWT', serverId, identifiers);
  const details: SocketDetails = {
    socketUrl: process.env.SOCKET_USER_CONNECTION,
    token,
  };
  socketDetails.set(serverId, details);
  return details;
});
