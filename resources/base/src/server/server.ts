import './comms';
import { emitSocket } from './comms';

let connectedPlayers: Base.PlayerInfo[] = [];

const getConnectedPlayers = () => {
  const players: Base.PlayerInfo[] = [];
  const indexes = GetNumPlayerIndices();

  for (let i = 0; i < indexes; i++) {
    const serverId = Number(GetPlayerFromIndex(i));
    if (serverId === 0) {
      continue;
    }

    const playerPed = GetPlayerPed(String(serverId));

    const playerData: Base.PlayerInfo = { serverId };

    if (playerPed !== 0) {
      playerData.coords = GetEntityCoords(playerPed) as Base.PlayerInfo['coords'];
    }

    players.push(playerData);
  }

  return players;
};

setInterval(async () => {
  connectedPlayers = getConnectedPlayers();
  emitSocket('connectedPlayers', connectedPlayers);
}, 3e3);
