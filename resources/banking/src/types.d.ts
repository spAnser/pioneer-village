declare interface RPC {}

declare namespace Bank {
  type Id = string;

  type Type =
    | 'VALENTINE'
    | 'RHODES'
    | 'BLACKWATER'
    | 'SAINT_DENIS'
    | 'ANNESBURG'
    | 'STRAWBERRY'
    | 'TUMBLEWEED'
    | 'ARMIDILLO';

  interface Data {
    identifier: Id;
    name: string;
    type: Type;
    zones: Record<string, Vector2Format[]>;
    vaultPosition: Vector4Format;
    tellerPosition: Vector4Format;
    tellerModel: string;
  }

  interface Info {
    reputationScore: number;
    interestRate: number;
    vaultBalance: number;
  }
}

declare namespace BankAccount {
  type Id = number;

  interface Data {
    id: Id;
    characterId: number;
    bankId: Bank.Id;
    balance: number;
    updatedAt: string;
  }

  type DirtyData = Partial<Omit<Data, 'id'>> & { id: Id };
}

declare namespace BankTransfer {
  type Status = 'PENDING' | 'COMPLETED' | 'CANCELLED';

  interface Data {
    id: number;
    fromCharacterId: number;
    toCharacterId: number;
    fromBankId: Bank.Id;
    toBankId: Bank.Id;
    amount: number;
    fee: number;
    status: Status;
    scheduledAt: string;
    completedAt?: string;
  }
}

declare namespace BankLoan {
  type Status = 'ACTIVE' | 'DEFAULTED' | 'REPAID';

  interface Data {
    id: number;
    characterId: number;
    bankId: Bank.Id;
    principal: number;
    outstanding: number;
    collateralItemId: number | null;
    issuedAt: string;
    dueAt: string;
    missedPayments: number;
    status: Status;
  }
}

declare namespace BankMineralPrice {
  interface Data {
    itemIdentifier: string;
    label: string;
    pricePerUnit: number;
  }
}

declare namespace BankMineralBudget {
  interface Data {
    bankId: Bank.Id;
    dailyLimit: number;
    spentToday: number;
    budgetRemaining: number;
    priceMultiplier: number;
    resetAt: string;
  }
}

declare namespace BankTransaction {
  type Type =
    | 'DEPOSIT'
    | 'WITHDRAWAL'
    | 'WIRE_OUT'
    | 'WIRE_IN'
    | 'WIRE_FEE'
    | 'INTEREST'
    | 'LOAN_CREDIT'
    | 'LOAN_REPAYMENT'
    | 'LOAN_INTEREST'
    | 'SAFETY_BOX_FEE'
    | 'ROBBERY_LOSS'
    | 'MINERAL_SALE';

  interface Data {
    id: number;
    characterId: number;
    bankId: Bank.Id;
    type: Type;
    amount: number;
    balanceAfter: number;
    relatedId: number | null;
    note: string | null;
    createdAt: string;
  }
}

declare namespace BankSafetyBox {
  interface Data {
    id: number;
    characterId: number;
    bankId: Bank.Id;
    inventoryId: number | null;
    rentedAt: string;
    nextDueAt: string;
    weeklyFee: number;
    active: boolean;
  }
}

declare namespace ClientRPC {
  interface Socket {
    ['banking.get-accounts']: () => BankAccount.Data[];
    ['banking.deposit']: (bankId: Bank.Id, amount: number) => { success: boolean; newBalance: number; message?: string };
    ['banking.withdraw']: (bankId: Bank.Id, amount: number) => { success: boolean; newBalance: number; message?: string };
    ['banking.wire-transfer']: (toCharacterId: number, fromBankId: Bank.Id, toBankId: Bank.Id, amount: number) => { success: boolean; fee: number; availableAt: string; message?: string };
    ['banking.collect-transfers']: () => { collected: number; total: number };
    ['banking.take-loan']: (bankId: Bank.Id, principal: number, collateralItemId: number | null, dueAt: string) => { success: boolean; loanId?: number; message?: string };
    ['banking.repay-loan']: (loanId: number, amount: number) => { success: boolean; outstanding: number; message?: string };
    ['banking.get-loans']: () => BankLoan.Data[];
    ['banking.rent-safety-box']: (bankId: Bank.Id) => { success: boolean; boxId?: number; message?: string };
    ['banking.get-safety-box']: (bankId: Bank.Id) => BankSafetyBox.Data | null;
    ['banking.get-transactions']: (bankId: Bank.Id | null, limit: number) => BankTransaction.Data[];
    ['banking.get-mineral-prices']: (bankId: Bank.Id) => { prices: BankMineralPrice.Data[]; budget: BankMineralBudget.Data };
    ['banking.sell-minerals']: (
      bankId: Bank.Id,
      items: { itemIdentifier: string; itemIds: number[]; quantity: number }[],
    ) => { success: boolean; payout: number; budgetRemaining: number; message?: string };
  }
}

declare namespace ClientIn {
  interface FromSocket {
    ['banking.open']: (data: {
      tab: 'deposit' | 'withdraw' | 'wire' | 'loan' | 'repay';
      bankId: Bank.Id;
      bankName: string;
      characterId: number;
      characterName: string;
      cashOnPerson: number;
      currentBalance: number;
      loans: BankLoan.Data[];
    }) => void;
    ['banking.close']: () => void;
    ['banking.update-balance']: (data: { balance: number; cashOnPerson?: number }) => void;
  }
}

declare namespace ClientOut {
  interface ToSocket {}
}
