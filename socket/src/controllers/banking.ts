import { logInfoC, logInfoS } from '../helpers';
import Banking from '../managers/banking';
import { serverNamespace, userNamespace } from '../server';

export default () => {
  serverNamespace.on('connection', (socket) => {
    socket.on('banking.rob-bank', async (bankId: string, stolenAmount: number, cb?: (result: { success: boolean; message?: string }) => void) => {
      logInfoS('banking.rob-bank', bankId, stolenAmount);
      const result = await Banking.executeRobbery(bankId, stolenAmount);
      cb?.(result);
    });

    socket.on('banking.apply-interest', async (cb?: () => void) => {
      logInfoS('banking.apply-interest');
      await Banking.applyInterest();
      cb?.();
    });

    socket.on('banking.apply-loan-interest', async (cb?: () => void) => {
      logInfoS('banking.apply-loan-interest');
      await Banking.applyLoanInterest();
      cb?.();
    });

    socket.on('banking.recover-reputation', async (cb?: () => void) => {
      logInfoS('banking.recover-reputation');
      await Banking.recoverReputation();
      cb?.();
    });

    socket.on('banking.charge-safety-boxes', async (cb?: () => void) => {
      logInfoS('banking.charge-safety-boxes');
      await Banking.chargeOverdueSafetyBoxes();
      cb?.();
    });
  });

  userNamespace.on('connection', (socket) => {
    socket.on('banking.get-accounts', async (characterId: number, cb) => {
      logInfoC('banking.get-accounts', characterId);
      const accounts = await Banking.getCharacterAccounts(characterId);
      cb(
        accounts.map((a) => ({
          id: a.id,
          characterId: a.characterId,
          bankId: a.bankId,
          balance: Number(a.balance),
          updatedAt: a.updatedAt?.toISOString() ?? a.createdAt?.toISOString() ?? new Date().toISOString(),
        })),
      );
    });

    socket.on('banking.deposit', async (characterId: number, bankId: string, amount: number, cb) => {
      logInfoC('banking.deposit', characterId, bankId, amount);
      const result = await Banking.deposit(characterId, bankId, amount);
      cb(result);
    });

    socket.on('banking.withdraw', async (characterId: number, bankId: string, amount: number, cb) => {
      logInfoC('banking.withdraw', characterId, bankId, amount);
      const result = await Banking.withdraw(characterId, bankId, amount);
      cb(result);
    });

    socket.on(
      'banking.wire-transfer',
      async (fromCharacterId: number, toCharacterId: number, fromBankId: string, toBankId: string, amount: number, cb) => {
        logInfoC('banking.wire-transfer', fromCharacterId, '->', toCharacterId, fromBankId, '->', toBankId, amount);
        const result = await Banking.initiateWire(fromCharacterId, toCharacterId, fromBankId, toBankId, amount);
        cb(result);
      },
    );

    socket.on('banking.collect-transfers', async (characterId: number, cb) => {
      logInfoC('banking.collect-transfers', characterId);
      const result = await Banking.collectPendingTransfers(characterId);
      cb(result);
    });

    socket.on('banking.get-bank-info', async (bankId: string, cb) => {
      logInfoC('banking.get-bank-info', bankId);
      const info = await Banking.getBankInfo(bankId);
      cb(info);
    });

    socket.on('banking.take-loan', async (characterId: number, bankId: string, principal: number, collateralItemId: number | null, dueAt: string, cb) => {
      logInfoC('banking.take-loan', characterId, bankId, principal);
      const result = await Banking.takeLoan(characterId, bankId, principal, collateralItemId, new Date(dueAt));
      cb(result);
    });

    socket.on('banking.repay-loan', async (characterId: number, loanId: number, amount: number, cb) => {
      logInfoC('banking.repay-loan', characterId, loanId, amount);
      const result = await Banking.repayLoan(characterId, loanId, amount);
      cb(result);
    });

    socket.on('banking.get-loans', async (characterId: number, cb) => {
      logInfoC('banking.get-loans', characterId);
      const loans = await Banking.getCharacterLoans(characterId);
      cb(
        loans.map((l) => ({
          id: l.id,
          characterId: l.characterId,
          bankId: l.bankId,
          principal: Number(l.principal),
          outstanding: Number(l.outstanding),
          collateralItemId: l.collateralItemId,
          issuedAt: l.issuedAt?.toISOString() ?? new Date().toISOString(),
          dueAt: l.dueAt.toISOString(),
          missedPayments: l.missedPayments,
          status: l.status,
        })),
      );
    });

    socket.on('banking.rent-safety-box', async (characterId: number, bankId: string, cb) => {
      logInfoC('banking.rent-safety-box', characterId, bankId);
      const result = await Banking.rentSafetyBox(characterId, bankId);
      cb(result);
    });

    socket.on('banking.get-safety-box', async (characterId: number, bankId: string, cb) => {
      logInfoC('banking.get-safety-box', characterId, bankId);
      const box = await Banking.getSafetyBox(characterId, bankId);
      cb(
        box
          ? {
              id: box.id,
              characterId: box.characterId,
              bankId: box.bankId,
              inventoryId: box.inventoryId,
              rentedAt: box.rentedAt?.toISOString() ?? new Date().toISOString(),
              nextDueAt: box.nextDueAt.toISOString(),
              weeklyFee: Number(box.weeklyFee),
              active: box.active,
            }
          : null,
      );
    });

    socket.on('banking.get-transactions', async (characterId: number, bankId: string | null, limit: number, cb) => {
      logInfoC('banking.get-transactions', characterId, bankId, limit);
      const rows = await Banking.getTransactions(characterId, bankId, limit || 50);
      cb(
        rows.map((tx) => ({
          id: tx.id,
          characterId: tx.characterId,
          bankId: tx.bankId,
          type: tx.type,
          amount: Number(tx.amount),
          balanceAfter: Number(tx.balanceAfter),
          relatedId: tx.relatedId,
          note: tx.note,
          createdAt: tx.createdAt.toISOString(),
        })),
      );
    });
  });
};
