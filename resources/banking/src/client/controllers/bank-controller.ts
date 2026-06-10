import { PVGame, onResourceInit } from '@lib/client';
import { awaitUI } from '@lib/client/comms/ui';

import Account from '../classes/account';

class BankController {
  protected static instance: BankController;

  protected _accounts: Map<Bank.Id, Account> = new Map();
  protected _pendingTransfers: BankTransfer.Data[] = [];
  protected _loans: BankLoan.Data[] = [];
  protected _currentBank: Bank.Id | null = null;

  static getInstance(): BankController {
    if (!BankController.instance) {
      BankController.instance = new BankController();
    }
    return BankController.instance;
  }

  constructor() {
    onResourceInit('game', () => {
      const character = PVGame.getCurrentCharacter();
      if (character) {
        this.loadAccounts(character.id);
      }
    });

    onNet('game:character-selected', async (characterId: number) => {
      this.loadAccounts(characterId);
    });
  }

  async loadAccounts(characterId: number): Promise<void> {
    const accounts = await awaitUI('banking.get-accounts', characterId);
    this._accounts.clear();
    for (const data of accounts) {
      this._accounts.set(data.bankId, new Account(data));
    }
    console.log(`[Banking] Loaded ${this._accounts.size} accounts for character ${characterId}`);
  }

  getAccount(bankId: Bank.Id): Account | undefined {
    return this._accounts.get(bankId);
  }

  getAccounts(): Account[] {
    return Array.from(this._accounts.values());
  }

  async deposit(characterId: number, bankId: Bank.Id, amount: number): Promise<{ success: boolean; newBalance: number; message?: string }> {
    const result = await awaitUI('banking.deposit', characterId, bankId, amount);
    if (result.success) {
      const account = this._accounts.get(bankId);
      if (account) {
        account._balance = result.newBalance;
      }
    }
    return result;
  }

  async withdraw(characterId: number, bankId: Bank.Id, amount: number): Promise<{ success: boolean; newBalance: number; message?: string }> {
    const result = await awaitUI('banking.withdraw', characterId, bankId, amount);
    if (result.success) {
      const account = this._accounts.get(bankId);
      if (account) {
        account._balance = result.newBalance;
      }
    }
    return result;
  }

  async wireTransfer(
    fromCharacterId: number,
    toCharacterId: number,
    fromBankId: Bank.Id,
    toBankId: Bank.Id,
    amount: number,
  ): Promise<{ success: boolean; fee: number; availableAt: string; message?: string }> {
    const result = await awaitUI('banking.wire-transfer', fromCharacterId, toCharacterId, fromBankId, toBankId, amount);
    if (result.success) {
      const account = this._accounts.get(fromBankId);
      if (account) {
        account._balance -= amount + result.fee;
      }
    }
    return result;
  }

  async collectTransfers(characterId: number): Promise<{ collected: number; total: number }> {
    const result = await awaitUI('banking.collect-transfers', characterId);
    if (result.collected > 0) {
      await this.loadAccounts(characterId);
    }
    return result;
  }

  async getBankInfo(bankId: Bank.Id): Promise<Bank.Info | null> {
    return awaitUI('banking.get-bank-info', bankId);
  }

  async takeLoan(
    characterId: number,
    bankId: Bank.Id,
    principal: number,
    collateralItemId: number | null,
    dueAt: string,
  ): Promise<{ success: boolean; loanId?: number; message?: string }> {
    const result = await awaitUI('banking.take-loan', characterId, bankId, principal, collateralItemId, dueAt);
    if (result.success) {
      await this.loadAccounts(characterId);
    }
    return result;
  }

  async repayLoan(characterId: number, loanId: number, amount: number): Promise<{ success: boolean; outstanding: number; message?: string }> {
    const result = await awaitUI('banking.repay-loan', characterId, loanId, amount);
    if (result.success) {
      await this.loadAccounts(characterId);
    }
    return result;
  }

  async getLoans(characterId: number): Promise<BankLoan.Data[]> {
    this._loans = await awaitUI('banking.get-loans', characterId);
    return this._loans;
  }

  async rentSafetyBox(characterId: number, bankId: Bank.Id): Promise<{ success: boolean; boxId?: number; message?: string }> {
    const result = await awaitUI('banking.rent-safety-box', characterId, bankId);
    if (result.success) {
      await this.loadAccounts(characterId);
    }
    return result;
  }

  async getSafetyBox(characterId: number, bankId: Bank.Id): Promise<BankSafetyBox.Data | null> {
    return awaitUI('banking.get-safety-box', characterId, bankId);
  }

  async getTransactions(characterId: number, bankId: Bank.Id | null, limit: number = 50): Promise<BankTransaction.Data[]> {
    return awaitUI('banking.get-transactions', characterId, bankId, limit);
  }

  get currentBank(): Bank.Id | null {
    return this._currentBank;
  }

  setCurrentBank(bankId: Bank.Id): void {
    this._currentBank = bankId;
  }

  clearCurrentBank(bankId: Bank.Id): void {
    if (this._currentBank === bankId) {
      this._currentBank = null;
    }
  }
}

const bankController = BankController.getInstance();
export default bankController;
