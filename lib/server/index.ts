export { emitSocket, awaitSocket, onSocket } from './comms/socket';
export { onClientCall, onClient, awaitClient, emitClient } from './comms/client';
export const exports: ServerExports = global.exports;

export const getIdentifiers = (serverId: string | number) => {
  serverId = String(serverId);
  const identifiers: Record<string, string> = {};
  for (let i = 0; i < GetNumPlayerIdentifiers(serverId); i++) {
    const identifier = GetPlayerIdentifier(serverId, i);
    const [prefix] = identifier.split(':');
    identifiers[prefix] = identifier;
  }
  return identifiers;
};

export const queueSort = (a: LineData, b: LineData): number => b.priority - a.priority || a.connectTime - b.connectTime;
