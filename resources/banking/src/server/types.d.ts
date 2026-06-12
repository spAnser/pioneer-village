declare interface ServerExports {
  banking: Banking.ServerExports;
}

declare namespace Banking {
  interface ServerExports {
    getAccounts: (characterId: number) => Promise<BankAccount.Data[]>;
    getBalance: (characterId: number, bankId: Bank.Id) => Promise<number | null>;
    deposit: (characterId: number, bankId: Bank.Id, amount: number) => Promise<{ success: boolean; newBalance: number; message?: string }>;
    withdraw: (characterId: number, bankId: Bank.Id, amount: number) => Promise<{ success: boolean; newBalance: number; message?: string }>;
    wireTransfer: (fromCharacterId: number, toCharacterId: number, fromBankId: Bank.Id, toBankId: Bank.Id, amount: number) => Promise<{ success: boolean; fee: number; availableAt: string; message?: string }>;
    getTransactions: (characterId: number, bankId: Bank.Id | null, limit?: number) => Promise<BankTransaction.Data[]>;
    getLoans: (characterId: number) => Promise<BankLoan.Data[]>;
    getBankInfo: (bankId: Bank.Id) => Promise<Bank.Info | null>;
  }
}

declare namespace ServerRPC {
  interface Socket {}
}

declare namespace ServerIn {
  interface FromSocket {}
}

declare namespace ServerOut {
  interface ToSocket {}
}
