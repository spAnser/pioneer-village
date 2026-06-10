import { awaitUI } from '@lib/client/comms/ui';

export default class Account {
  _id: BankAccount.Id;
  _characterId: number;
  _bankId: Bank.Id;
  _balance: number;
  _updatedAt: Date;

  _dirtyFields: Set<string> = new Set();

  constructor(data: BankAccount.Data) {
    this._id = data.id;
    this._characterId = data.characterId;
    this._bankId = data.bankId;
    this._balance = data.balance;
    this._updatedAt = new Date(data.updatedAt);
  }

  get id(): BankAccount.Id {
    return this._id;
  }

  get characterId(): number {
    return this._characterId;
  }

  get bankId(): Bank.Id {
    return this._bankId;
  }

  get balance(): number {
    return this._balance;
  }

  set balance(value: number) {
    this._balance = Math.max(0, value);
    this._dirtyFields.add('balance');
  }

  get isDirty(): boolean {
    return this._dirtyFields.size > 0;
  }

  toData(): BankAccount.Data {
    return {
      id: this._id,
      characterId: this._characterId,
      bankId: this._bankId,
      balance: this._balance,
      updatedAt: this._updatedAt.toISOString(),
    };
  }
}
