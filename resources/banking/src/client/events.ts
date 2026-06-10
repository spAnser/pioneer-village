import { PVGame } from '@lib/client';

import BankData from '../shared/data/bankData';
import bankController from './controllers/bank-controller';

on('banking:client:deposit', async (_entity: number, pArgs: Record<string, any>) => {
  const bankId = bankController.currentBank;
  if (!bankId) return;

  const characterId = PVGame.characterId();
  const amountStr = pArgs?.amount ?? await promptAmount('Deposit amount:');
  const amount = Number(amountStr);
  if (!amount || amount <= 0) return;

  const result = await bankController.deposit(characterId, bankId, amount);
  if (result.success) {
    console.log(`[Banking] Deposited $${amount}. New balance: $${result.newBalance}`);
  } else {
    console.log(`[Banking] Deposit failed: ${result.message}`);
  }
});

on('banking:client:withdraw', async (_entity: number, pArgs: Record<string, any>) => {
  const bankId = bankController.currentBank;
  if (!bankId) return;

  const characterId = PVGame.characterId();
  const amountStr = pArgs?.amount ?? await promptAmount('Withdraw amount:');
  const amount = Number(amountStr);
  if (!amount || amount <= 0) return;

  const result = await bankController.withdraw(characterId, bankId, amount);
  if (result.success) {
    console.log(`[Banking] Withdrew $${amount}. New balance: $${result.newBalance}`);
  } else {
    console.log(`[Banking] Withdrawal failed: ${result.message}`);
  }
});

on('banking:client:wire', async (_entity: number, pArgs: Record<string, any>) => {
  const fromBankId = bankController.currentBank;
  if (!fromBankId) return;

  const fromCharacterId = PVGame.characterId();
  const toCharacterId = Number(pArgs?.toCharacterId);
  const toBankId = pArgs?.toBankId as Bank.Id;
  const amount = Number(pArgs?.amount);

  if (!toCharacterId || !toBankId || !amount || amount <= 0) {
    console.log('[Banking] Wire transfer: missing required arguments (toCharacterId, toBankId, amount)');
    return;
  }

  const result = await bankController.wireTransfer(fromCharacterId, toCharacterId, fromBankId, toBankId, amount);
  if (result.success) {
    console.log(`[Banking] Wire sent. Fee: $${result.fee}. Available at: ${result.availableAt}`);
  } else {
    console.log(`[Banking] Wire failed: ${result.message}`);
  }
});

on('banking:client:collect-transfers', async (_entity: number, _pArgs: Record<string, any>) => {
  const bankId = bankController.currentBank;
  if (!bankId) return;

  const characterId = PVGame.characterId();
  const result = await bankController.collectTransfers(characterId);

  if (result.collected > 0) {
    console.log(`[Banking] Collected ${result.collected} transfer(s) totalling $${result.total}`);
  } else {
    console.log('[Banking] No pending transfers ready to collect.');
  }
});

on('banking:client:loan', async (_entity: number, pArgs: Record<string, any>) => {
  const bankId = bankController.currentBank;
  if (!bankId) return;

  const characterId = PVGame.characterId();
  const principal = Number(pArgs?.amount);
  const collateralItemId = pArgs?.collateralItemId ? Number(pArgs.collateralItemId) : null;
  const dueAt = pArgs?.dueAt ?? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  if (!principal || principal <= 0) {
    console.log('[Banking] Loan: missing required argument (amount)');
    return;
  }

  const result = await bankController.takeLoan(characterId, bankId, principal, collateralItemId, dueAt);
  if (result.success) {
    console.log(`[Banking] Loan issued. Loan ID: ${result.loanId}`);
  } else {
    console.log(`[Banking] Loan failed: ${result.message}`);
  }
});

on('banking:client:repay-loan', async (_entity: number, pArgs: Record<string, any>) => {
  const characterId = PVGame.characterId();
  const loanId = Number(pArgs?.loanId);
  const amount = Number(pArgs?.amount);

  if (!loanId || !amount || amount <= 0) {
    console.log('[Banking] Repay: missing required arguments (loanId, amount)');
    return;
  }

  const result = await bankController.repayLoan(characterId, loanId, amount);
  if (result.success) {
    console.log(`[Banking] Repaid. Outstanding: $${result.outstanding}`);
  } else {
    console.log(`[Banking] Repay failed: ${result.message}`);
  }
});

on('banking:client:safety-box', async (_entity: number, _pArgs: Record<string, any>) => {
  const bankId = bankController.currentBank;
  if (!bankId) return;

  const characterId = PVGame.characterId();
  const box = await bankController.getSafetyBox(characterId, bankId);

  if (box) {
    console.log(`[Banking] Safety box active. Next due: ${box.nextDueAt}`);
    // TODO: open box inventory via PVInventory.openInventory(`safetybox:${box.id}`)
  } else {
    const result = await bankController.rentSafetyBox(characterId, bankId);
    if (result.success) {
      console.log(`[Banking] Safety box rented. Box ID: ${result.boxId}`);
    } else {
      console.log(`[Banking] Safety box rental failed: ${result.message}`);
    }
  }
});

on('banking:client:bank-info', async (_entity: number, _pArgs: Record<string, any>) => {
  const bankId = bankController.currentBank;
  if (!bankId) return;

  const info = await bankController.getBankInfo(bankId);
  if (!info) {
    console.log('[Banking] Could not retrieve bank info.');
    return;
  }

  const bankName = BankData.find((b) => b.identifier === bankId)?.name ?? bankId;
  console.log(
    `[Banking] ${bankName} — Reputation: ${info.reputationScore}/100 | Interest Rate: ${(info.interestRate * 100).toFixed(3)}% | Vault: $${info.vaultBalance.toFixed(2)}`,
  );
});

// Simple in-console prompt helper (placeholder until UI dialogs are wired up)
async function promptAmount(label: string): Promise<string> {
  console.log(`[Banking] ${label} (use target args to pass amount)`);
  return '0';
}
