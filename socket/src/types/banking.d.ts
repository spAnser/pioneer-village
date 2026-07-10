// Socket perspective - what the socket server receives
declare namespace SocketIn {
  interface FromGameServer {
    ['banking.rob-bank']: (bankId: string, stolenAmount: number, callback?: (result: { success: boolean; message?: string }) => void) => void;
    ['banking.apply-interest']: (callback?: () => void) => void;
    ['banking.apply-vault-interest']: (callback?: () => void) => void;
    ['banking.apply-loan-interest']: (callback?: () => void) => void;
    ['banking.recover-reputation']: (callback?: () => void) => void;
    ['banking.charge-safety-boxes']: (callback?: () => void) => void;
    ['banking.recover-mineral-prices']: (callback?: () => void) => void;
    ['banking.reset-mineral-budgets']: (callback?: () => void) => void;
    // Server export bridge — called via awaitSocket from other FXServer resources
    ['banking.server.get-accounts']: (characterId: number, callback?: (accounts: BankAccount.Data[]) => void) => void;
    ['banking.server.deposit']: (characterId: number, bankId: string, amount: number, callback?: (result: { success: boolean; newBalance: number; message?: string }) => void) => void;
    ['banking.server.withdraw']: (characterId: number, bankId: string, amount: number, callback?: (result: { success: boolean; newBalance: number; message?: string }) => void) => void;
    ['banking.server.wire-transfer']: (fromCharacterId: number, toCharacterId: number, fromBankId: string, toBankId: string, amount: number, callback?: (result: { success: boolean; fee: number; availableAt: string; message?: string }) => void) => void;
    ['banking.server.get-transactions']: (characterId: number, bankId: string | null, limit: number, callback?: (transactions: BankTransaction.Data[]) => void) => void;
    ['banking.server.get-loans']: (characterId: number, callback?: (loans: BankLoan.Data[]) => void) => void;
    ['banking.server.get-bank-info']: (bankId: string, callback?: (info: { reputationScore: number; interestRate: number; vaultBalance: number } | null) => void) => void;
    ['banking.server.redeem-job-pay-slip']: (characterId: number, paySlipId: number, bankId: string, callback?: (result: { success: boolean; amount: number; message?: string }) => void) => void;
  }

  interface FromClient {
    ['banking.get-accounts']: (callback: (accounts: BankAccount.Data[]) => void) => void;
    ['banking.get-cash-on-hand']: (callback: (cash: number) => void) => void;
    ['banking.deposit']: (bankId: string, amount: number, callback: (result: { success: boolean; newBalance: number; message?: string }) => void) => void;
    ['banking.withdraw']: (bankId: string, amount: number, callback: (result: { success: boolean; newBalance: number; message?: string }) => void) => void;
    ['banking.wire-transfer']: (toCharacterId: number, fromBankId: string, toBankId: string, amount: number, callback: (result: { success: boolean; fee: number; availableAt: string; message?: string }) => void) => void;
    ['banking.collect-transfers']: (callback: (result: { collected: number; total: number }) => void) => void;
    ['banking.take-loan']: (bankId: string, principal: number, collateralItemId: number | null, dueAt: string, callback: (result: { success: boolean; loanId?: number; message?: string }) => void) => void;
    ['banking.repay-loan']: (loanId: number, amount: number, callback: (result: { success: boolean; outstanding: number; message?: string }) => void) => void;
    ['banking.get-loans']: (callback: (loans: BankLoan.Data[]) => void) => void;
    ['banking.rent-safety-box']: (bankId: string, callback: (result: { success: boolean; boxId?: number; message?: string }) => void) => void;
    ['banking.get-safety-box']: (bankId: string, callback: (box: BankSafetyBox.Data | null) => void) => void;
    ['banking.cancel-safety-box']: (bankId: string, callback: (result: { success: boolean; message?: string }) => void) => void;
    ['banking.get-transactions']: (bankId: string | null, limit: number, callback: (transactions: BankTransaction.Data[]) => void) => void;
    ['banking.get-mineral-prices']: (bankId: string, callback: (result: { prices: BankMineralPrice.Data[]; budget: BankMineralBudget.Data }) => void) => void;
    ['banking.sell-minerals']: (bankId: string, items: { itemIdentifier: string; itemIds: number[]; quantity: number }[], callback: (result: { success: boolean; payout: number; budgetRemaining: number; message?: string }) => void) => void;
  }
}

// Socket perspective - what the socket server sends
declare namespace SocketOut {
  interface ToGameServer {}

  interface ToClient {}
}
