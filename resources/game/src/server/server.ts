import { onClientCall, getIdentifiers, onSocket } from '@lib/server';

onClientCall('game.getSteamId', async (serverId) => {
  const identifiers = getIdentifiers(serverId);
  return identifiers.steam;
});

onSocket('player-management.kick', (serverId, reason) => {
  DropPlayer(serverId.toString(), reason);
});
