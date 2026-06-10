import { PVGame } from '@lib/client';

// bankId -> local entity handle (resolved from server net ID)
export const tellerPeds: Map<Bank.Id, number> = new Map();

// Resolves once all teller peds are ready for targeting
let _tellersReadyResolve: () => void;
export const tellersReady: Promise<void> = new Promise((resolve) => {
  _tellersReadyResolve = resolve;
});

interface TellerSpawnRequest {
  identifier: string;
  model: number;
  x: number;
  y: number;
  z: number;
  w: number;
}

const applyTellerBehaviour = (ped: number): void => {
  SetEntityInvincible(ped, true);
  FreezeEntityPosition(ped, true);
  SetBlockingOfNonTemporaryEvents(ped, true);
  SetPedFleeAttributes(ped, 0, false);
  SetPedCombatAttributes(ped, 17, true);
  SetEntityAsMissionEntity(ped, true, true);
  TaskStartScenarioInPlace(ped, 'WORLD_HUMAN_STAND_IMPATIENT', 0, true, false, 0, -1.0, false);
};

// Server nominates this client to spawn all tellers
onNet('banking:spawn-tellers', async (banks: TellerSpawnRequest[]) => {
  const netIdMap: Record<string, number> = {};

  for (const bank of banks) {
    const ped = await PVGame.createPed(bank.model, bank.x, bank.y, bank.z, bank.w, false, true);
    if (!ped || !DoesEntityExist(ped)) {
      console.warn(`[Banking] Failed to spawn teller for ${bank.identifier}`);
      continue;
    }

    applyTellerBehaviour(ped);

    const netId = NetworkGetNetworkIdFromEntity(ped);
    netIdMap[bank.identifier] = netId;
    tellerPeds.set(bank.identifier as Bank.Id, ped);
    console.log(`[Banking] Spawned teller for ${bank.identifier} (ped: ${ped}, netId: ${netId})`);
  }

  // Report net IDs back to server
  emitNet('banking:tellers-spawned', netIdMap);
  _tellersReadyResolve();
});

// All other clients receive net IDs from server and resolve peds locally
onNet('banking:tellers-ready', async (netIdMap: Record<string, number>) => {
  // Skip if this client was the spawner (already has peds from spawn-tellers handler)
  if (tellerPeds.size > 0) return;

  for (const [bankId, netId] of Object.entries(netIdMap)) {
    let ped = 0;
    for (let i = 0; i < 50; i++) {
      ped = NetworkGetEntityFromNetworkId(netId);
      if (ped && DoesEntityExist(ped)) break;
      await Delay(100);
    }

    if (!ped || !DoesEntityExist(ped)) {
      console.warn(`[Banking] Could not resolve teller netId ${netId} for ${bankId}`);
      continue;
    }

    applyTellerBehaviour(ped);
    tellerPeds.set(bankId as Bank.Id, ped);
    console.log(`[Banking] Teller ready at ${bankId} (ped: ${ped}, netId: ${netId})`);
  }

  _tellersReadyResolve();
});

// Request net IDs if this client connects after initial spawn
on('onClientResourceStart', (resourceName: string) => {
  if (resourceName !== GetCurrentResourceName()) return;
  emitNet('banking:request-tellers');
});
