export { emitSocket, awaitSocket, onSocket } from './comms/socket';
export { onClientCall, onClient, awaitClient, emitClient } from './comms/client';
export * from './resources';
export * from './zones';

// @ts-ignore
export const exports: ServerExports = global.exports;

export const getIdentifiers = (serverId: string | number) => {
  serverId = String(serverId);
  const identifiers: Record<string, string> = {};
  console.log(`GetPlayerIdentifierByType(serverId, 'steam')`, GetPlayerIdentifierByType(serverId, 'steam'));
  console.log('GetNumPlayerIdentifiers(serverId)', GetNumPlayerIdentifiers(serverId));
  for (let i = 0; i < GetNumPlayerIdentifiers(serverId); i++) {
    const identifier = GetPlayerIdentifier(serverId, i);
    console.log(`identifier ${i}:`, identifier);
    const [prefix] = identifier.split(':');
    identifiers[prefix] = identifier;
  }
  return identifiers;
};

export const queueSort = (a: LineData, b: LineData): number => b.priority - a.priority || a.connectTime - b.connectTime;
