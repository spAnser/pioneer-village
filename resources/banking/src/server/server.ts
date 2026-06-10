import { emitSocket } from '@lib/server';
import { LogToUI } from '@lib/server/comms/client';

import BankData from '../shared/data/bankData';

// ── Teller NPC spawning ───────────────────────────────────────────────────────
// Tellers are spawned client-side by the first player to connect (so that
// PVGame.createPed can handle model loading). The spawning client sends net IDs
// back to the server, which stores them and broadcasts to all current/future clients.

const tellerNetIds: Map<string, number> = new Map();
let tellerSpawnerSource: number | null = null;

on('playerConnecting', () => {
  // Nominate the first connecting player as the teller spawner if not yet done
  // and tellers haven't been spawned yet.
  if (tellerNetIds.size === 0 && tellerSpawnerSource === null) {
    const source = (global as any).source as number;
    tellerSpawnerSource = source;
    // Give the client time to fully load before asking it to spawn
    setTimeout(() => {
      emitNet('banking:spawn-tellers', source, BankData.map((b) => ({
        identifier: b.identifier,
        model: b.tellerModel,
        x: b.tellerPosition.x,
        y: b.tellerPosition.y,
        z: b.tellerPosition.z,
        w: b.tellerPosition.w,
      })));
    }, 5000);
  }
});

// Spawning client reports back with { bankId -> netId }
onNet('banking:tellers-spawned', (netIdMap: Record<string, number>) => {
  for (const [bankId, netId] of Object.entries(netIdMap)) {
    tellerNetIds.set(bankId, netId);
  }
  LogToUI(`[Banking] ${tellerNetIds.size} teller(s) registered. Broadcasting to all clients.`);
  emitNet('banking:tellers-ready', -1, Object.fromEntries(tellerNetIds));
});

// Any client that connects after the initial spawn requests the stored net IDs
onNet('banking:request-tellers', () => {
  const source = (global as any).source as number;
  if (tellerNetIds.size > 0) {
    emitNet('banking:tellers-ready', source, Object.fromEntries(tellerNetIds));
  }
});

const INTEREST_INTERVAL_MS = 60 * 60 * 1000;       // 1 hour
const REPUTATION_INTERVAL_MS = 6 * 60 * 60 * 1000;  // 6 hours
const TRANSFER_CHECK_MS = 60 * 1000;                  // 1 minute
const LOAN_INTEREST_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours
const SAFETY_BOX_CHECK_MS = 60 * 60 * 1000;           // 1 hour

// ── Interest tick ────────────────────────────────────────────────────────────
setInterval(() => {
  LogToUI('[Banking] Applying interest to all accounts...');
  emitSocket('banking.apply-interest');
}, INTEREST_INTERVAL_MS);

// ── Reputation recovery tick ─────────────────────────────────────────────────
setInterval(() => {
  LogToUI('[Banking] Running reputation recovery...');
  emitSocket('banking.recover-reputation');
}, REPUTATION_INTERVAL_MS);

// ── Pending transfer resolution tick ─────────────────────────────────────────
// NOTE: collection is player-triggered, but server can also push resolved transfers
setInterval(() => {
  // LogToUI('[Banking] Checking for matured wire transfers...');
  // No-op server-side tick — players collect at counter via banking:client:collect-transfers.
  // Could emit a player notification here once a notification system exists.
}, TRANSFER_CHECK_MS);

// ── Daily loan interest tick ──────────────────────────────────────────────────
setInterval(() => {
  LogToUI('[Banking] Applying daily loan interest...');
  emitSocket('banking.apply-loan-interest');
}, LOAN_INTEREST_INTERVAL_MS);

// ── Safety box billing tick ───────────────────────────────────────────────────
setInterval(() => {
  LogToUI('[Banking] Charging overdue safety boxes...');
  emitSocket('banking.charge-safety-boxes');
}, SAFETY_BOX_CHECK_MS);

// ── Bank robbery hook ─────────────────────────────────────────────────────────
// Called by an external heist/job resource: emitNet('banking:rob-bank', bankId, stolenAmount)
onNet('banking:rob-bank', (bankId: string, stolenAmount: number) => {
  const source = (global as any).source as number;
  LogToUI(`[Banking] Robbery event from source ${source}: bank ${bankId}, $${stolenAmount}`);

  emitSocket('banking.rob-bank', bankId, stolenAmount, (result: { success: boolean; message?: string }) => {
    if (result.success) {
      LogToUI(`[Banking] Robbery processed at ${bankId}`);
    } else {
      LogToUI(`[Banking] Robbery rejected at ${bankId}: ${result.message}`);
    }
  });
});

LogToUI('[Banking] Server loaded');
