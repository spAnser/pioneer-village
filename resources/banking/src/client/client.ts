import { PVGame } from '@lib/client';
import { awaitUI } from '@lib/client/comms/ui';

import BankData from '../shared/data/bankData';
import bankController from './controllers/bank-controller';
import './events';
import './tellers';
import './targets';
import './zones';

console.log('[Banking] Client loaded');

// ── Debug helpers ────────────────────────────────────────────────────────────

const charId = () => PVGame.characterId();

const printResult = (label: string, result: Record<string, any>) => {
  console.log(`[Banking:${label}]`, JSON.stringify(result));
};

// /bankAccounts — list all loaded accounts and their balances
RegisterCommand(
  'bankAccounts',
  () => {
    const accounts = bankController.getAccounts();
    if (!accounts.length) {
      console.log('[Banking] No accounts loaded.');
      return;
    }
    for (const acc of accounts) {
      const bankName = BankData.find((b) => b.identifier === acc.bankId)?.name ?? acc.bankId;
      console.log(`[Banking]  ${bankName}: $${acc.balance.toFixed(2)}`);
    }
  },
  false,
);

// /bankDeposit [bankId] [amount] — deposit into any bank without being in the zone
RegisterCommand(
  'bankDeposit',
  async (_source: number, args: string[]) => {
    const bankId = args[0] as Bank.Id;
    const amount = Number(args[1]);
    if (!bankId || !amount) {
      console.log('Usage: /bankDeposit [bankId] [amount]');
      console.log('Banks:', BankData.map((b) => b.identifier).join(', '));
      return;
    }
    const result = await bankController.deposit(charId(), bankId, amount);
    printResult('deposit', result);
  },
  false,
);

// /bankWithdraw [bankId] [amount]
RegisterCommand(
  'bankWithdraw',
  async (_source: number, args: string[]) => {
    const bankId = args[0] as Bank.Id;
    const amount = Number(args[1]);
    if (!bankId || !amount) {
      console.log('Usage: /bankWithdraw [bankId] [amount]');
      return;
    }
    const result = await bankController.withdraw(charId(), bankId, amount);
    printResult('withdraw', result);
  },
  false,
);

// /bankWire [fromBankId] [toBankId] [toCharacterId] [amount]
RegisterCommand(
  'bankWire',
  async (_source: number, args: string[]) => {
    const fromBankId = args[0] as Bank.Id;
    const toBankId = args[1] as Bank.Id;
    const toCharId = Number(args[2]);
    const amount = Number(args[3]);
    if (!fromBankId || !toBankId || !toCharId || !amount) {
      console.log('Usage: /bankWire [fromBankId] [toBankId] [toCharacterId] [amount]');
      return;
    }
    const result = await bankController.wireTransfer(charId(), toCharId, fromBankId, toBankId, amount);
    printResult('wire', result);
  },
  false,
);

// /bankCollect — collect any matured wire transfers
RegisterCommand(
  'bankCollect',
  async () => {
    const result = await bankController.collectTransfers(charId());
    printResult('collect', result);
  },
  false,
);

// /bankInfo [bankId] — show reputation, interest rate, vault balance
RegisterCommand(
  'bankInfo',
  async (_source: number, args: string[]) => {
    const bankId = (args[0] as Bank.Id) ?? bankController.currentBank;
    if (!bankId) {
      console.log('Usage: /bankInfo [bankId]  (or enter a bank zone)');
      console.log('Banks:', BankData.map((b) => b.identifier).join(', '));
      return;
    }
    const info = await bankController.getBankInfo(bankId);
    if (!info) {
      console.log(`[Banking] No vault record found for ${bankId}`);
      return;
    }
    const bankName = BankData.find((b) => b.identifier === bankId)?.name ?? bankId;
    console.log(`[Banking] ${bankName}`);
    console.log(`  Reputation : ${info.reputationScore}/100`);
    console.log(`  Interest   : ${(info.interestRate * 100).toFixed(3)}% per tick`);
    console.log(`  Vault float: $${info.vaultBalance.toFixed(2)}`);
  },
  false,
);

// /bankLoan [bankId] [amount] [daysUntilDue] — take a loan (no collateral for debug)
RegisterCommand(
  'bankLoan',
  async (_source: number, args: string[]) => {
    const bankId = args[0] as Bank.Id;
    const amount = Number(args[1]);
    const days = Number(args[2]) || 30;
    if (!bankId || !amount) {
      console.log('Usage: /bankLoan [bankId] [amount] [daysUntilDue=30]');
      return;
    }
    const dueAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
    const result = await bankController.takeLoan(charId(), bankId, amount, null, dueAt);
    printResult('loan', result);
  },
  false,
);

// /bankRepay [loanId] [amount]
RegisterCommand(
  'bankRepay',
  async (_source: number, args: string[]) => {
    const loanId = Number(args[0]);
    const amount = Number(args[1]);
    if (!loanId || !amount) {
      console.log('Usage: /bankRepay [loanId] [amount]');
      return;
    }
    const result = await bankController.repayLoan(charId(), loanId, amount);
    printResult('repay', result);
  },
  false,
);

// /bankLoans — list all active loans for this character
RegisterCommand(
  'bankLoans',
  async () => {
    const loans = await bankController.getLoans(charId());
    if (!loans.length) {
      console.log('[Banking] No loans found.');
      return;
    }
    for (const loan of loans) {
      const bankName = BankData.find((b) => b.identifier === loan.bankId)?.name ?? loan.bankId;
      console.log(
        `[Banking]  #${loan.id} @ ${bankName} — outstanding: $${loan.outstanding.toFixed(2)} / $${loan.principal.toFixed(2)} | status: ${loan.status} | due: ${loan.dueAt}`,
      );
    }
  },
  false,
);

// /bankSafetyBox [bankId] — rent or view safety box
RegisterCommand(
  'bankSafetyBox',
  async (_source: number, args: string[]) => {
    const bankId = (args[0] as Bank.Id) ?? bankController.currentBank;
    if (!bankId) {
      console.log('Usage: /bankSafetyBox [bankId]');
      return;
    }
    const box = await bankController.getSafetyBox(charId(), bankId);
    if (box) {
      console.log(`[Banking] Safety box #${box.id} active at ${bankId}. Next due: ${box.nextDueAt}`);
    } else {
      const result = await bankController.rentSafetyBox(charId(), bankId);
      printResult('safetybox-rent', result);
    }
  },
  false,
);

// /bankSetZone [bankId] — manually set current bank zone (bypass physical zone check)
RegisterCommand(
  'bankSetZone',
  (_source: number, args: string[]) => {
    const bankId = args[0] as Bank.Id;
    if (!bankId) {
      console.log('Usage: /bankSetZone [bankId]');
      console.log('Banks:', BankData.map((b) => b.identifier).join(', '));
      return;
    }
    bankController.setCurrentBank(bankId);
    const bankName = BankData.find((b) => b.identifier === bankId)?.name ?? bankId;
    console.log(`[Banking] Current bank set to: ${bankName}`);
  },
  false,
);

// /bankHistory [bankId] [limit=20] — show transaction log
RegisterCommand(
  'bankHistory',
  async (_source: number, args: string[]) => {
    const bankId = (args[0] as Bank.Id) || null;
    const limit = Number(args[1]) || 20;
    const txs = await bankController.getTransactions(charId(), bankId, limit);
    if (!txs.length) {
      console.log('[Banking] No transactions found.');
      return;
    }
    for (const tx of txs) {
      const bankName = BankData.find((b) => b.identifier === tx.bankId)?.name ?? tx.bankId;
      const sign = ['DEPOSIT', 'WIRE_IN', 'INTEREST', 'LOAN_CREDIT'].includes(tx.type) ? '+' : '-';
      console.log(
        `[Banking]  ${tx.createdAt.substring(0, 19).replace('T', ' ')}  ${tx.type.padEnd(16)}  ${sign}$${tx.amount.toFixed(2).padStart(10)}  bal: $${tx.balanceAfter.toFixed(2)}  @ ${bankName}${tx.note ? `  (${tx.note})` : ''}`,
      );
    }
  },
  false,
);

// /bankClearZone — clear the current bank zone
RegisterCommand(
  'bankClearZone',
  () => {
    const current = bankController.currentBank;
    if (current) bankController.clearCurrentBank(current);
    console.log('[Banking] Current bank cleared.');
  },
  false,
);
