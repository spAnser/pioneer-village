import queueManager from './managers/queue-manager';
import { msToHMS } from '@lib/functions';
import { awaitSocket, getIdentifiers } from '@lib/server';

const Delay = (ms: number) => new Promise((res) => setTimeout(res, Math.max(1, ms)));

const clocks = ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛'];

const playerIntervals: Record<any, any> = {};

function getMethods(obj: any) {
  var res = [];
  for (var m in obj) {
    if (typeof obj[m] == 'function') {
      res.push(m);
    }
  }
  return res;
}

on('playerConnecting', async (name: string, setKickReason: (reason: string) => void, deferrals: Deferrals) => {
  console.log('playerConnecting', name);
  const serverId = source;
  const connectTime = GetGameTimer();

  deferrals.defer();

  if (GetPlayerEndpoint(String(serverId)) === '127.0.0.1') {
    deferrals.done();
    return;
  }

  await Delay(0);

  deferrals.update(`Connecting.`);

  // await initManager.initializedThisResource();
  // await whitelistManager.initialized;

  const identifiers = getIdentifiers(serverId);

  if (identifiers.steam === undefined) {
    deferrals.done('You are not connected to Steam.');
    return;
  }

  const account = await awaitSocket('getAccount', identifiers);

  queueManager.joinQueue(serverId, connectTime, 50);

  console.log(`${name} placed ${queueManager.positionInQueue(serverId)}/${queueManager.length} in queue.`);

  playerIntervals[serverId] = setInterval(() => {
    const sourceQueue = queueManager.line[serverId];
    const millisecondsInQueue = GetGameTimer() - connectTime;
    const secondsInQueue = Math.floor(millisecondsInQueue / 1000);
    deferrals.update(
      `${sourceQueue?.crashed ? '🦠' : sourceQueue?.boosted ? '🚀' : '🐌'} You are ${queueManager.positionInQueue(
        serverId,
      )}/${queueManager.length} in queue ${clocks[secondsInQueue % 12]} ${msToHMS(millisecondsInQueue)}`,
    );
  }, 1000);

  await queueManager.sourceAccepted(serverId);

  clearInterval(playerIntervals[serverId]);

  deferrals.done();
});

on('playerDropped', async (reason: string) => {
  console.log('playerDropped', reason);

  clearInterval(playerIntervals[source]);

  queueManager.leaveQueue(source);
});
