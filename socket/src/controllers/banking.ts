import { logInfoC, logInfoS } from '../helpers';
import Banking from '../managers/banking';
import Inventories from '../managers/inventories';
import jobSystemManager from '../managers/jobs';
import { serverNamespace, userNamespace } from '../server';

export default () => {
  serverNamespace.on('connection', (socket) => {
    // Server-to-socket exports (called via awaitSocket from other FXServer resources)
    socket.on('banking.server.get-accounts', async (characterId, cb) => {
      logInfoS('banking.server.get-accounts', characterId);
      const accounts = await Banking.getCharacterAccounts(characterId);
      cb?.(
        accounts.map((a) => ({
          id: a.id,
          characterId: a.characterId,
          bankId: a.bankId,
          balance: Number(a.balance),
          updatedAt: a.updatedAt?.toISOString() ?? a.createdAt?.toISOString() ?? new Date().toISOString(),
        })),
      );
    });

    socket.on('banking.server.deposit', async (characterId, bankId, amount, cb) => {
      logInfoS('banking.server.deposit', characterId, bankId, amount);
      const result = await Banking.deposit(characterId, bankId, amount);
      cb?.(result);
    });

    socket.on('banking.server.withdraw', async (characterId, bankId, amount, cb) => {
      logInfoS('banking.server.withdraw', characterId, bankId, amount);
      const result = await Banking.withdraw(characterId, bankId, amount);
      cb?.(result);
    });

    socket.on('banking.server.wire-transfer', async (fromCharacterId, toCharacterId, fromBankId, toBankId, amount, cb) => {
      logInfoS('banking.server.wire-transfer', fromCharacterId, '->', toCharacterId, fromBankId, '->', toBankId, amount);
      const result = await Banking.initiateWire(fromCharacterId, toCharacterId, fromBankId, toBankId, amount);
      cb?.(result);
    });

    socket.on('banking.server.get-transactions', async (characterId, bankId, limit, cb) => {
      logInfoS('banking.server.get-transactions', characterId, bankId, limit);
      const rows = await Banking.getTransactions(characterId, bankId, limit || 50);
      cb?.(
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

    socket.on('banking.server.get-loans', async (characterId, cb) => {
      logInfoS('banking.server.get-loans', characterId);
      const loans = await Banking.getCharacterLoans(characterId);
      cb?.(
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

    socket.on('banking.server.get-bank-info', async (bankId, cb) => {
      logInfoS('banking.server.get-bank-info', bankId);
      const info = await Banking.getBankInfo(bankId);
      cb?.(info);
    });

    socket.on('banking.server.redeem-job-pay-slip', async (characterId, paySlipId, bankId, cb) => {
      logInfoS('banking.server.redeem-job-pay-slip', characterId, paySlipId, bankId);
      const redeemResult = await jobSystemManager.redeemPaySlip(paySlipId, characterId, bankId);
      if (!redeemResult.success) {
        cb?.({ success: false, amount: 0, message: redeemResult.message });
        return;
      }
      const depositResult = await Banking.deposit(characterId, bankId, redeemResult.amount);
      cb?.({ success: depositResult.success, amount: redeemResult.amount, message: depositResult.message });
    });

    socket.on('banking.rob-bank', async (bankId, stolenAmount, cb) => {
      logInfoS('banking.rob-bank', bankId, stolenAmount);
      const result = await Banking.executeRobbery(bankId, stolenAmount);
      cb?.(result);
    });

    socket.on('banking.apply-interest', async (cb) => {
      logInfoS('banking.apply-interest');
      await Banking.applyInterest();
      cb?.();
    });

    socket.on('banking.apply-loan-interest', async (cb) => {
      logInfoS('banking.apply-loan-interest');
      await Banking.applyLoanInterest();
      cb?.();
    });

    socket.on('banking.apply-vault-interest', async (cb) => {
      logInfoS('banking.apply-vault-interest');
      await Banking.applyVaultInterest();
      cb?.();
    });

    socket.on('banking.recover-reputation', async (cb) => {
      logInfoS('banking.recover-reputation');
      await Banking.recoverReputation();
      cb?.();
    });

    socket.on('banking.charge-safety-boxes', async (cb) => {
      logInfoS('banking.charge-safety-boxes');
      await Banking.chargeOverdueSafetyBoxes();
      cb?.();
    });

    socket.on('banking.recover-mineral-prices', async (cb) => {
      logInfoS('banking.recover-mineral-prices');
      await Banking.recoverMineralPrices();
      cb?.();
    });

    socket.on('banking.reset-mineral-budgets', async (cb) => {
      logInfoS('banking.reset-mineral-budgets');
      await Banking.resetMineralBudgets();
      cb?.();
    });
  });

  userNamespace.on('connection', (socket) => {
    socket.on('banking.get-cash-on-hand', async (cb) => {
      const characterId = socket.data.character?.id;
      if (!characterId) return cb(0);
      logInfoC('banking.get-cash-on-hand', characterId);
      cb(await Inventories.getCash(characterId));
    });

    socket.on('banking.get-accounts', async (cb) => {
      const characterId = socket.data.character?.id;
      if (!characterId) return cb([]);
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

    socket.on('banking.deposit', async (bankId, amount, cb) => {
      const characterId = socket.data.character?.id;
      if (!characterId) return cb({ success: false, newBalance: 0, message: 'No character selected' });
      logInfoC('banking.deposit', characterId, bankId, amount);
      const result = await Banking.deposit(characterId, bankId, amount);
      cb(result);
    });

    socket.on('banking.withdraw', async (bankId, amount, cb) => {
      const characterId = socket.data.character?.id;
      if (!characterId) return cb({ success: false, newBalance: 0, message: 'No character selected' });
      logInfoC('banking.withdraw', characterId, bankId, amount);
      const result = await Banking.withdraw(characterId, bankId, amount);
      cb(result);
    });

    socket.on('banking.wire-transfer', async (toCharacterId, fromBankId, toBankId, amount, cb) => {
      const fromCharacterId = socket.data.character?.id;
      if (!fromCharacterId) return cb({ success: false, fee: 0, availableAt: '', message: 'No character selected' });
      logInfoC('banking.wire-transfer', fromCharacterId, '->', toCharacterId, fromBankId, '->', toBankId, amount);
      const result = await Banking.initiateWire(fromCharacterId, toCharacterId, fromBankId, toBankId, amount);
      cb(result);
    });

    socket.on('banking.collect-transfers', async (cb) => {
      const characterId = socket.data.character?.id;
      if (!characterId) return cb({ collected: 0, total: 0 });
      logInfoC('banking.collect-transfers', characterId);
      const result = await Banking.collectPendingTransfers(characterId);
      cb(result);
    });

    socket.on('banking.take-loan', async (bankId, principal, collateralItemId, dueAt, cb) => {
      const characterId = socket.data.character?.id;
      if (!characterId) return cb({ success: false, message: 'No character selected' });
      logInfoC('banking.take-loan', characterId, bankId, principal);
      const result = await Banking.takeLoan(characterId, bankId, principal, collateralItemId, new Date(dueAt));
      cb(result);
    });

    socket.on('banking.repay-loan', async (loanId, amount, cb) => {
      const characterId = socket.data.character?.id;
      if (!characterId) return cb({ success: false, outstanding: 0, message: 'No character selected' });
      logInfoC('banking.repay-loan', characterId, loanId, amount);
      const result = await Banking.repayLoan(characterId, loanId, amount);
      cb(result);
    });

    socket.on('banking.get-loans', async (cb) => {
      const characterId = socket.data.character?.id;
      if (!characterId) return cb([]);
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

    socket.on('banking.rent-safety-box', async (bankId, cb) => {
      const characterId = socket.data.character?.id;
      if (!characterId) return cb({ success: false, message: 'No character selected' });
      logInfoC('banking.rent-safety-box', characterId, bankId);
      const result = await Banking.rentSafetyBox(characterId, bankId);
      cb(result);
    });

    socket.on('banking.get-safety-box', async (bankId, cb) => {
      const characterId = socket.data.character?.id;
      if (!characterId) return cb(null);
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

    socket.on('banking.get-transactions', async (bankId, limit, cb) => {
      const characterId = socket.data.character?.id;
      if (!characterId) return cb([]);
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

    socket.on('banking.get-mineral-prices', async (bankId, cb) => {
      logInfoC('banking.get-mineral-prices', bankId);
      const result = await Banking.getMineralPrices(bankId);
      cb(result);
    });

    socket.on('banking.sell-minerals', async (bankId, items, cb) => {
      const characterId = socket.data.character?.id;
      if (!characterId) return cb({ success: false, payout: 0, budgetRemaining: 0, message: 'No character selected' });
      logInfoC('banking.sell-minerals', characterId, bankId, items.length, 'item lines');
      const result = await Banking.sellMinerals(characterId, bankId, items);
      cb(result);
    });
  });
};
