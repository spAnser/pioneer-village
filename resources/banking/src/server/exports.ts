import { awaitSocket, exports } from '@lib/server';

// Event handlers — allow other server resources to trigger banking ops via net events
onNet('banking.deposit-from-resource', (characterId: number, bankId: string, amount: number) => {
  deposit(characterId, bankId, amount);
});

onNet('banking.withdraw-from-resource', (characterId: number, bankId: string, amount: number) => {
  withdraw(characterId, bankId, amount);
});

// Exported functions
const getAccounts: Banking.ServerExports['getAccounts'] = async (characterId) => {
  try {
    return await awaitSocket('banking.server.get-accounts', characterId);
  } catch (error) {
    console.log(`[Banking] getAccounts failed:`, characterId, error);
    return [];
  }
};

const getBalance: Banking.ServerExports['getBalance'] = async (characterId, bankId) => {
  try {
    const accounts: BankAccount.Data[] = await awaitSocket('banking.server.get-accounts', characterId);
    const account = accounts.find((a) => a.bankId === bankId);
    return account?.balance ?? null;
  } catch (error) {
    console.log(`[Banking] getBalance failed:`, characterId, bankId, error);
    return null;
  }
};

const deposit: Banking.ServerExports['deposit'] = async (characterId, bankId, amount) => {
  try {
    return await awaitSocket('banking.server.deposit', characterId, bankId, amount);
  } catch (error) {
    console.log(`[Banking] deposit failed:`, characterId, bankId, amount, error);
    return { success: false, newBalance: 0, message: 'Socket error' };
  }
};

const withdraw: Banking.ServerExports['withdraw'] = async (characterId, bankId, amount) => {
  try {
    return await awaitSocket('banking.server.withdraw', characterId, bankId, amount);
  } catch (error) {
    console.log(`[Banking] withdraw failed:`, characterId, bankId, amount, error);
    return { success: false, newBalance: 0, message: 'Socket error' };
  }
};

const wireTransfer: Banking.ServerExports['wireTransfer'] = async (fromCharacterId, toCharacterId, fromBankId, toBankId, amount) => {
  try {
    return await awaitSocket('banking.server.wire-transfer', fromCharacterId, toCharacterId, fromBankId, toBankId, amount);
  } catch (error) {
    console.log(`[Banking] wireTransfer failed:`, fromCharacterId, '->', toCharacterId, error);
    return { success: false, fee: 0, availableAt: new Date().toISOString(), message: 'Socket error' };
  }
};

const getTransactions: Banking.ServerExports['getTransactions'] = async (characterId, bankId, limit = 50) => {
  try {
    return await awaitSocket('banking.server.get-transactions', characterId, bankId, limit);
  } catch (error) {
    console.log(`[Banking] getTransactions failed:`, characterId, bankId, error);
    return [];
  }
};

const getLoans: Banking.ServerExports['getLoans'] = async (characterId) => {
  try {
    return await awaitSocket('banking.server.get-loans', characterId);
  } catch (error) {
    console.log(`[Banking] getLoans failed:`, characterId, error);
    return [];
  }
};

const getBankInfo: Banking.ServerExports['getBankInfo'] = async (bankId) => {
  try {
    return await awaitSocket('banking.server.get-bank-info', bankId);
  } catch (error) {
    console.log(`[Banking] getBankInfo failed:`, bankId, error);
    return null;
  }
};

const redeemJobPaySlip: Banking.ServerExports['redeemJobPaySlip'] = async (characterId, paySlipId, bankId) => {
  try {
    return await awaitSocket('banking.server.redeem-job-pay-slip', characterId, paySlipId, bankId);
  } catch (error) {
    console.log(`[Banking] redeemJobPaySlip failed:`, characterId, paySlipId, bankId, error);
    return { success: false, amount: 0, message: 'Socket error' };
  }
};

exports<'banking'>('getAccounts', getAccounts);
exports<'banking'>('getBalance', getBalance);
exports<'banking'>('deposit', deposit);
exports<'banking'>('withdraw', withdraw);
exports<'banking'>('wireTransfer', wireTransfer);
exports<'banking'>('getTransactions', getTransactions);
exports<'banking'>('getLoans', getLoans);
exports<'banking'>('getBankInfo', getBankInfo);
exports<'banking'>('redeemJobPaySlip', redeemJobPaySlip);
