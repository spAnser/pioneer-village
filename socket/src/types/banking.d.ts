// Socket perspective - what the socket server receives
declare namespace SocketIn {
  interface FromGameServer {
    ['banking.rob-bank']: (bankId: string, stolenAmount: number, callback?: (result: { success: boolean; message?: string }) => void) => void;
    ['banking.apply-interest']: (callback?: () => void) => void;
    ['banking.apply-loan-interest']: (callback?: () => void) => void;
    ['banking.recover-reputation']: (callback?: () => void) => void;
    ['banking.charge-safety-boxes']: (callback?: () => void) => void;
  }

  interface FromClient {
    ['banking.get-accounts']: (characterId: number, callback: (accounts: BankAccount.Data[]) => void) => void;
    ['banking.deposit']: (characterId: number, bankId: string, amount: number, callback: (result: { success: boolean; newBalance: number; message?: string }) => void) => void;
    ['banking.withdraw']: (characterId: number, bankId: string, amount: number, callback: (result: { success: boolean; newBalance: number; message?: string }) => void) => void;
    ['banking.wire-transfer']: (fromCharacterId: number, toCharacterId: number, fromBankId: string, toBankId: string, amount: number, callback: (result: { success: boolean; fee: number; availableAt: string; message?: string }) => void) => void;
    ['banking.collect-transfers']: (characterId: number, callback: (result: { collected: number; total: number }) => void) => void;
    ['banking.get-bank-info']: (bankId: string, callback: (info: { reputationScore: number; interestRate: number; vaultBalance: number } | null) => void) => void;
    ['banking.take-loan']: (characterId: number, bankId: string, principal: number, collateralItemId: number | null, dueAt: string, callback: (result: { success: boolean; loanId?: number; message?: string }) => void) => void;
    ['banking.repay-loan']: (characterId: number, loanId: number, amount: number, callback: (result: { success: boolean; outstanding: number; message?: string }) => void) => void;
    ['banking.get-loans']: (characterId: number, callback: (loans: BankLoan.Data[]) => void) => void;
    ['banking.rent-safety-box']: (characterId: number, bankId: string, callback: (result: { success: boolean; boxId?: number; message?: string }) => void) => void;
    ['banking.get-safety-box']: (characterId: number, bankId: string, callback: (box: BankSafetyBox.Data | null) => void) => void;
    ['banking.get-transactions']: (characterId: number, bankId: string | null, limit: number, callback: (transactions: BankTransaction.Data[]) => void) => void;
  }
}

// Socket perspective - what the socket server sends
declare namespace SocketOut {
  interface ToGameServer {}

  interface ToClient {}
}
