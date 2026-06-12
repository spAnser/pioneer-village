import { emitSocket } from '@lib/server';
import { LogToUI } from '@lib/server/comms/client';


const INTEREST_INTERVAL_MS = 60 * 60 * 1000;           // 1 hour
const VAULT_INTEREST_INTERVAL_MS = 5 * 60 * 1000;      // 5 minutes
const REPUTATION_INTERVAL_MS = 6 * 60 * 60 * 1000;     // 6 hours
const TRANSFER_CHECK_MS = 60 * 1000;                    // 1 minute
const LOAN_INTEREST_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours
const SAFETY_BOX_CHECK_MS = 60 * 60 * 1000;             // 1 hour
const MINERAL_PRICE_RECOVERY_MS = 60 * 60 * 1000;       // 1 hour

// ── Interest tick ────────────────────────────────────────────────────────────
setInterval(() => {
  LogToUI('[Banking] Applying interest to all accounts...');
  emitSocket('banking.apply-interest');
}, INTEREST_INTERVAL_MS);

// ── Vault replenishment tick ──────────────────────────────────────────────────
setInterval(() => {
  emitSocket('banking.apply-vault-interest');
}, VAULT_INTEREST_INTERVAL_MS);

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

// ── Mineral price recovery tick ───────────────────────────────────────────────
setInterval(() => {
  emitSocket('banking.recover-mineral-prices');
}, MINERAL_PRICE_RECOVERY_MS);

// ── Mineral daily budget reset (schedules itself to fire at each UTC midnight) ─
function scheduleMidnightReset() {
  const now = new Date();
  const midnight = new Date();
  midnight.setUTCHours(24, 0, 0, 0);
  const msUntilMidnight = midnight.getTime() - now.getTime();

  setTimeout(() => {
    LogToUI('[Banking] Resetting mineral budgets for new day...');
    emitSocket('banking.reset-mineral-budgets');
    scheduleMidnightReset();
  }, msUntilMidnight);
}
scheduleMidnightReset();

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
