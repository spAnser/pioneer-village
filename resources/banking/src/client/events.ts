import { PVBase, PVGame } from '@lib/client';
import { emitUI, focusUI } from '@lib/client/comms/ui';

import BankData from '../shared/data/bankData';
import bankController from './controllers/bank-controller';

// Open the banking UI focused on a specific tab and populate live data
async function openBankingUI(tab: 'deposit' | 'withdraw' | 'wire' | 'loan' | 'repay', bankId?: Bank.Id) {
  const resolvedBankId = bankId ?? bankController.currentBank;
  if (!resolvedBankId) return;

  const characterId = PVGame.characterId();
  const character = PVGame.getCurrentCharacter();
  const bankData = BankData.find((b) => b.identifier === resolvedBankId);
  const [loans] = await Promise.all([
    bankController.getLoans(characterId),
    bankController.loadAccounts(characterId),
  ]);
  const cashOnPerson = PVBase.getCurrentCharacter()?.currencies?.dollars ?? 0;
  const account = bankController.getAccount(resolvedBankId);

  emitUI('banking.open', {
    tab,
    bankId: resolvedBankId,
    bankName: bankData?.name ?? resolvedBankId,
    characterId,
    characterName: character ? `${character.firstName} ${character.lastName}` : 'Unknown',
    cashOnPerson,
    currentBalance: account?.balance ?? 0,
    loans,
  });

  focusUI(true, true);
}

on('banking:client:deposit', async (_entity: number, pArgs: Record<string, any>) => {
  await openBankingUI('deposit', pArgs?.bankId);
});

on('banking:client:withdraw', async (_entity: number, pArgs: Record<string, any>) => {
  await openBankingUI('withdraw', pArgs?.bankId);
});

on('banking:client:wire', async (_entity: number, pArgs: Record<string, any>) => {
  await openBankingUI('wire', pArgs?.bankId);
});

on('banking:client:loan', async (_entity: number, pArgs: Record<string, any>) => {
  await openBankingUI('loan', pArgs?.bankId);
});

on('banking:client:repay-loan', async (_entity: number, pArgs: Record<string, any>) => {
  await openBankingUI('repay', pArgs?.bankId);
});

on('banking:client:collect-transfers', async (_entity: number, pArgs: Record<string, any>) => {
  const bankId = pArgs?.bankId ?? bankController.currentBank;
  if (!bankId) return;

  const characterId = PVGame.characterId();
  const result = await bankController.collectTransfers(characterId);

  if (result.collected > 0) {
    const account = bankController.getAccount(bankId);
    emitUI('banking.update-balance', { balance: account?.balance ?? 0 });
    console.log(`[Banking] Collected ${result.collected} transfer(s) totalling $${result.total}`);
  } else {
    console.log('[Banking] No pending transfers ready to collect.');
  }
});

on('banking:client:safety-box', async (_entity: number, pArgs: Record<string, any>) => {
  const bankId = pArgs?.bankId ?? bankController.currentBank;
  if (!bankId) return;

  const characterId = PVGame.characterId();
  const box = await bankController.getSafetyBox(characterId, bankId);

  if (box) {
    console.log(`[Banking] Safety box active. Next due: ${box.nextDueAt}`);
  } else {
    const result = await bankController.rentSafetyBox(characterId, bankId);
    if (result.success) {
      console.log(`[Banking] Safety box rented. Box ID: ${result.boxId}`);
    } else {
      console.log(`[Banking] Safety box rental failed: ${result.message}`);
    }
  }
});

on('banking:client:bank-info', async (_entity: number, pArgs: Record<string, any>) => {
  const bankId = pArgs?.bankId ?? bankController.currentBank;
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
