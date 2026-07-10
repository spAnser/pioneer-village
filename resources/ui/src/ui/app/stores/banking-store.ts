import { Socket } from 'socket.io-client';

import { onClient } from '@lib/ui';

export type BankingTab = 'deposit' | 'withdraw' | 'wire' | 'loan' | 'repay' | 'safetybox';

interface BankingState {
  show: boolean;
  tab: BankingTab;
  bankId: Bank.Id | null;
  bankName: string;
  characterId: number;
  characterName: string;
  cashOnPerson: number;
  currentBalance: number;
  loans: BankLoan.Data[];
  safetyBox: BankSafetyBox.Data | null;
}

type StateListener = (state: BankingState) => void;

class BankingStore {
  private static instance: BankingStore;
  private socket: Socket<SocketIO.Events, SocketIn.FromClient & SocketOut.ToClient> | null = null;
  private state: BankingState;
  private listeners = new Set<StateListener>();
  private initialized = false;

  private constructor() {
    this.state = {
      show: false,
      tab: 'deposit',
      bankId: null,
      bankName: '',
      characterId: 0,
      characterName: '',
      cashOnPerson: 0,
      currentBalance: 0,
      loans: [],
      safetyBox: null,
    };
  }

  static getInstance(): BankingStore {
    if (!BankingStore.instance) {
      BankingStore.instance = new BankingStore();
    }
    return BankingStore.instance;
  }

  initialize(socket: Socket<SocketIO.Events, SocketIn.FromClient & SocketOut.ToClient>): void {
    if (this.initialized) return;
    this.initialized = true;
    this.socket = socket;
    this.setupClientHandlers();
  }

  private setupClientHandlers(): void {
    onClient('banking.open', (data: {
      tab: BankingTab;
      bankId: Bank.Id;
      bankName: string;
      characterId: number;
      characterName: string;
      cashOnPerson: number;
      currentBalance: number;
      loans: BankLoan.Data[];
      safetyBox?: BankSafetyBox.Data | null;
    }) => {
      this.updateState({
        show: true,
        tab: data.tab ?? 'deposit',
        bankId: data.bankId,
        bankName: data.bankName,
        characterId: data.characterId,
        characterName: data.characterName,
        cashOnPerson: data.cashOnPerson ?? 0,
        currentBalance: data.currentBalance ?? 0,
        loans: data.loans ?? [],
        safetyBox: data.safetyBox ?? null,
      });
    });

    onClient('banking.close', () => {
      this.close();
    });

    onClient('banking.update-balance', (data: { balance: number; cashOnPerson?: number }) => {
      this.updateState({
        currentBalance: data.balance,
        ...(data.cashOnPerson !== undefined ? { cashOnPerson: data.cashOnPerson } : {}),
      });
    });
  }

  call<K extends keyof SocketIn.FromClient>(
    event: K,
    ...args: DropLast<Parameters<SocketIn.FromClient[K]>>
  ): Promise<CallbackArg<Parameters<SocketIn.FromClient[K]>>> {
    return new Promise((resolve, reject) => {
      if (!this.socket) {
        reject(new Error(`[Banking] Socket not initialised — cannot call ${event}`));
        return;
      }
      // @ts-ignore — socket.io generic emit doesn't accept typed rest+callback cleanly
      this.socket.emit(event, ...args, resolve);
    });
  }

  close(): void {
    this.updateState({ show: false, bankId: null, bankName: '' });
  }

  setTab(tab: BankingTab): void {
    this.updateState({ tab });
  }

  updateState(newState: Partial<BankingState>): void {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((l) => l(this.state));
  }

  subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => this.listeners.delete(listener);
  }

  getState(): BankingState {
    return this.state;
  }
}

// Utility types to extract the callback argument from a socket event signature
type DropLast<T extends unknown[]> = T extends [...infer H, unknown] ? H : never;
type Last<T extends unknown[]> = T extends [...unknown[], infer L] ? L : never;
type CallbackArg<T extends unknown[]> = Last<T> extends (arg: infer A) => void ? A : never;

export default BankingStore.getInstance();
