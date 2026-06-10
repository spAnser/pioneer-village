import { and, eq, lte, sql } from 'drizzle-orm';

import { db } from '../db/connection';
import {
  BankAccountsSchema,
  BankLoansSchema,
  BankSafetyBoxesSchema,
  BankTransactionsSchema,
  BankTransfersSchema,
  BankVaultsSchema,
  CharactersSchema,
} from '../db/schema';

type BankTxType = typeof BankTransactionsSchema.$inferInsert['type'];
import { logInfo } from '../helpers';
import Characters from './characters';

const WIRE_FEE_FLAT = 5;
const WIRE_FEE_PCT = 0.02;
const WIRE_DELAY_MS = 30 * 60 * 1000; // 30 minutes
const INTEREST_RATE = 0.002; // 0.2% per tick
const ROBBERY_PLAYER_SHARE = 0.15; // 15% of stolen comes from players
const ROBBERY_MAX_PLAYER_PCT = 0.05; // cap at 5% of individual balance
const ROBBERY_COOLDOWN_MS = 2 * 60 * 60 * 1000; // 2 hours
const REPUTATION_ROBBERY_PENALTY = 20;
const REPUTATION_RECOVERY_RATE = 2;
const SAFETY_BOX_WEEKLY_FEE = 10;
const LOAN_DAILY_INTEREST = 0.01;

class Banking {
  static readonly instance: Banking = new Banking();

  constructor() {
    if (Banking.instance) {
      throw new Error('Use Banking.instance instead of new.');
    }
  }

  // ── Transaction log ──────────────────────────────────────────────────────

  private async logTransaction(
    characterId: number,
    bankId: string,
    type: BankTxType,
    amount: number,
    balanceAfter: number,
    relatedId?: number,
    note?: string,
  ): Promise<void> {
    await db.insert(BankTransactionsSchema).values({
      characterId,
      bankId,
      type,
      amount: String(amount),
      balanceAfter: String(balanceAfter),
      relatedId: relatedId ?? null,
      note: note ?? null,
    });
  }

  // ── Vault helpers ────────────────────────────────────────────────────────

  async getOrCreateVault(bankId: string) {
    const existing = await db.select().from(BankVaultsSchema).where(eq(BankVaultsSchema.bankId, bankId)).limit(1);
    if (existing.length) return existing[0];

    const inserted = await db
      .insert(BankVaultsSchema)
      .values({ bankId, vaultBalance: '0.00', reputationScore: 100, robberyCount: 0 })
      .returning();
    return inserted[0];
  }

  async getVault(bankId: string) {
    const result = await db.select().from(BankVaultsSchema).where(eq(BankVaultsSchema.bankId, bankId)).limit(1);
    return result[0] ?? null;
  }

  // ── Account helpers ──────────────────────────────────────────────────────

  async getOrCreateAccount(characterId: number, bankId: string) {
    const existing = await db
      .select()
      .from(BankAccountsSchema)
      .where(and(eq(BankAccountsSchema.characterId, characterId), eq(BankAccountsSchema.bankId, bankId)))
      .limit(1);

    if (existing.length) return existing[0];

    const inserted = await db
      .insert(BankAccountsSchema)
      .values({ characterId, bankId, balance: '0.00' })
      .returning();
    return inserted[0];
  }

  async getCharacterAccounts(characterId: number) {
    return db.select().from(BankAccountsSchema).where(eq(BankAccountsSchema.characterId, characterId));
  }

  // ── Deposit / Withdraw ───────────────────────────────────────────────────

  async deposit(characterId: number, bankId: string, amount: number): Promise<{ success: boolean; newBalance: number; message?: string }> {
    if (amount <= 0) return { success: false, newBalance: 0, message: 'Invalid amount' };

    const character = Characters.getActiveCharacterForCharacterId(characterId);
    if (!character || character.currencies.dollars < amount) {
      return { success: false, newBalance: 0, message: 'Insufficient on-hand cash' };
    }

    const removed = Characters.removeCharacterCurrency(characterId, 'dollars', amount);
    if (!removed) return { success: false, newBalance: 0, message: 'Failed to deduct cash' };

    const account = await this.getOrCreateAccount(characterId, bankId);
    const newBalance = Number(account.balance) + amount;

    await db
      .update(BankAccountsSchema)
      .set({ balance: String(newBalance), updatedAt: new Date() })
      .where(eq(BankAccountsSchema.id, account.id));

    // Add deposited amount to bank vault float
    await db
      .update(BankVaultsSchema)
      .set({ vaultBalance: sql`${BankVaultsSchema.vaultBalance} + ${amount}`, updatedAt: new Date() })
      .where(eq(BankVaultsSchema.bankId, bankId));

    await this.logTransaction(characterId, bankId, 'DEPOSIT', amount, newBalance);
    logInfo(`[Banking] Deposit: char ${characterId} +$${amount} at ${bankId}. New balance: $${newBalance}`);
    return { success: true, newBalance };
  }

  async withdraw(characterId: number, bankId: string, amount: number): Promise<{ success: boolean; newBalance: number; message?: string }> {
    if (amount <= 0) return { success: false, newBalance: 0, message: 'Invalid amount' };

    const account = await this.getOrCreateAccount(characterId, bankId);
    const currentBalance = Number(account.balance);
    if (currentBalance < amount) {
      return { success: false, newBalance: currentBalance, message: 'Insufficient funds' };
    }

    const newBalance = currentBalance - amount;
    await db
      .update(BankAccountsSchema)
      .set({ balance: String(newBalance), updatedAt: new Date() })
      .where(eq(BankAccountsSchema.id, account.id));

    await db
      .update(BankVaultsSchema)
      .set({ vaultBalance: sql`${BankVaultsSchema.vaultBalance} - ${amount}`, updatedAt: new Date() })
      .where(eq(BankVaultsSchema.bankId, bankId));

    Characters.addCharacterCurrency(characterId, 'dollars', amount);

    await this.logTransaction(characterId, bankId, 'WITHDRAWAL', amount, newBalance);
    logInfo(`[Banking] Withdraw: char ${characterId} -$${amount} at ${bankId}. New balance: $${newBalance}`);
    return { success: true, newBalance };
  }

  // ── Wire Transfers ───────────────────────────────────────────────────────

  async initiateWire(
    fromCharacterId: number,
    toCharacterId: number,
    fromBankId: string,
    toBankId: string,
    amount: number,
  ): Promise<{ success: boolean; fee: number; availableAt: string; message?: string }> {
    if (amount <= 0) return { success: false, fee: 0, availableAt: '', message: 'Invalid amount' };

    const fee = Math.ceil(WIRE_FEE_FLAT + amount * WIRE_FEE_PCT);
    const total = amount + fee;

    const account = await this.getOrCreateAccount(fromCharacterId, fromBankId);
    if (Number(account.balance) < total) {
      return { success: false, fee, availableAt: '', message: 'Insufficient funds (including fee)' };
    }

    const newBalance = Number(account.balance) - total;
    await db
      .update(BankAccountsSchema)
      .set({ balance: String(newBalance), updatedAt: new Date() })
      .where(eq(BankAccountsSchema.id, account.id));

    // Fee goes to destination bank vault float
    await db
      .update(BankVaultsSchema)
      .set({ vaultBalance: sql`${BankVaultsSchema.vaultBalance} + ${fee}`, updatedAt: new Date() })
      .where(eq(BankVaultsSchema.bankId, toBankId));

    const scheduledAt = new Date(Date.now() + WIRE_DELAY_MS);

    await db.insert(BankTransfersSchema).values({
      fromCharacterId,
      toCharacterId,
      fromBankId,
      toBankId,
      amount: String(amount),
      fee: String(fee),
      status: 'PENDING',
      scheduledAt,
    });

    // newBalance = originalBalance - amount - fee; log both steps against final balance
    await this.logTransaction(fromCharacterId, fromBankId, 'WIRE_OUT', amount, newBalance + fee, undefined, `to char ${toCharacterId} at ${toBankId}`);
    await this.logTransaction(fromCharacterId, fromBankId, 'WIRE_FEE', fee, newBalance, undefined, `wire fee to ${toBankId}`);
    logInfo(`[Banking] Wire: char ${fromCharacterId} -> char ${toCharacterId}, $${amount} (fee $${fee}), available at ${scheduledAt.toISOString()}`);
    return { success: true, fee, availableAt: scheduledAt.toISOString() };
  }

  async collectPendingTransfers(characterId: number): Promise<{ collected: number; total: number }> {
    const now = new Date();
    const ready = await db
      .select()
      .from(BankTransfersSchema)
      .where(
        and(
          eq(BankTransfersSchema.toCharacterId, characterId),
          eq(BankTransfersSchema.status, 'PENDING'),
          lte(BankTransfersSchema.scheduledAt, now),
        ),
      );

    let total = 0;
    for (const transfer of ready) {
      const amount = Number(transfer.amount);
      const account = await this.getOrCreateAccount(characterId, transfer.toBankId);
      const newBalance = Number(account.balance) + amount;

      await db
        .update(BankAccountsSchema)
        .set({ balance: String(newBalance), updatedAt: new Date() })
        .where(eq(BankAccountsSchema.id, account.id));

      await db
        .update(BankTransfersSchema)
        .set({ status: 'COMPLETED', completedAt: new Date() })
        .where(eq(BankTransfersSchema.id, transfer.id));

      await this.logTransaction(characterId, transfer.toBankId, 'WIRE_IN', amount, newBalance, transfer.id, `from char ${transfer.fromCharacterId} at ${transfer.fromBankId}`);
      total += amount;
    }

    logInfo(`[Banking] Collected ${ready.length} transfers for char ${characterId}, total $${total}`);
    return { collected: ready.length, total };
  }

  // ── Interest ─────────────────────────────────────────────────────────────

  async applyInterest(): Promise<void> {
    const accounts = await db.select().from(BankAccountsSchema);

    const byBank: Record<string, typeof accounts> = {};
    for (const acc of accounts) {
      if (!byBank[acc.bankId]) byBank[acc.bankId] = [];
      byBank[acc.bankId].push(acc);
    }

    for (const [bankId, bankAccounts] of Object.entries(byBank)) {
      const vault = await this.getVault(bankId);
      if (!vault) continue;

      const interestRate = this.effectiveInterestRate(vault.reputationScore);
      for (const account of bankAccounts) {
        const bal = Number(account.balance);
        if (bal <= 0) continue;
        const interest = Math.floor(bal * interestRate * 100) / 100;
        if (interest < 0.01) continue;

        const newBalance = bal + interest;
        await db
          .update(BankAccountsSchema)
          .set({ balance: String(newBalance), updatedAt: new Date() })
          .where(eq(BankAccountsSchema.id, account.id));

        await this.logTransaction(account.characterId, bankId, 'INTEREST', interest, newBalance);
      }
      logInfo(`[Banking] Interest applied at ${bankId} (rate: ${(interestRate * 100).toFixed(3)}%)`);
    }
  }

  effectiveInterestRate(reputationScore: number): number {
    // Rate scales 0–INTEREST_RATE proportional to reputation 0–100
    return INTEREST_RATE * (reputationScore / 100);
  }

  // ── Robbery ──────────────────────────────────────────────────────────────

  async executeRobbery(bankId: string, stolenAmount: number): Promise<{ success: boolean; message?: string }> {
    const vault = await this.getOrCreateVault(bankId);

    // Cooldown check
    if (vault.lastRobbedAt) {
      const msSinceRob = Date.now() - vault.lastRobbedAt.getTime();
      if (msSinceRob < ROBBERY_COOLDOWN_MS) {
        const minutesLeft = Math.ceil((ROBBERY_COOLDOWN_MS - msSinceRob) / 60000);
        return { success: false, message: `Bank still on alert. ${minutesLeft} minutes remaining.` };
      }
    }

    let remaining = stolenAmount;
    const vaultFloat = Number(vault.vaultBalance);

    // Drain void first
    const fromVoid = Math.min(vaultFloat * (1 - ROBBERY_PLAYER_SHARE), remaining);
    remaining -= fromVoid;

    // Remainder comes proportionally from player accounts
    if (remaining > 0) {
      const accounts = await db
        .select()
        .from(BankAccountsSchema)
        .where(eq(BankAccountsSchema.bankId, bankId));

      const totalDeposited = accounts.reduce((sum, a) => sum + Number(a.balance), 0);

      for (const account of accounts) {
        if (remaining <= 0) break;
        const share = totalDeposited > 0 ? Number(account.balance) / totalDeposited : 0;
        const playerLoss = Math.min(
          remaining * share,
          Number(account.balance) * ROBBERY_MAX_PLAYER_PCT,
        );
        if (playerLoss < 0.01) continue;

        const newBalance = Number(account.balance) - playerLoss;
        await db
          .update(BankAccountsSchema)
          .set({ balance: String(newBalance), updatedAt: new Date() })
          .where(eq(BankAccountsSchema.id, account.id));

        await this.logTransaction(account.characterId, bankId, 'ROBBERY_LOSS', playerLoss, newBalance, undefined, `bank robbery`);
        remaining -= playerLoss;
      }
    }

    const newVaultBalance = Math.max(0, vaultFloat - fromVoid);
    const newRep = Math.max(0, vault.reputationScore - REPUTATION_ROBBERY_PENALTY);

    await db
      .update(BankVaultsSchema)
      .set({
        vaultBalance: String(newVaultBalance),
        lastRobbedAt: new Date(),
        robberyCount: vault.robberyCount + 1,
        reputationScore: newRep,
        updatedAt: new Date(),
      })
      .where(eq(BankVaultsSchema.bankId, bankId));

    logInfo(`[Banking] Robbery at ${bankId}: $${stolenAmount} stolen. Vault drained $${fromVoid.toFixed(2)}. New rep: ${newRep}`);
    return { success: true };
  }

  async recoverReputation(): Promise<void> {
    await db
      .update(BankVaultsSchema)
      .set({
        reputationScore: sql`LEAST(100, ${BankVaultsSchema.reputationScore} + ${REPUTATION_RECOVERY_RATE})`,
        updatedAt: new Date(),
      });
  }

  // ── Loans ────────────────────────────────────────────────────────────────

  async takeLoan(
    characterId: number,
    bankId: string,
    principal: number,
    collateralItemId: number | null,
    dueAt: Date,
  ): Promise<{ success: boolean; loanId?: number; message?: string }> {
    if (principal <= 0) return { success: false, message: 'Invalid amount' };

    const vault = await this.getOrCreateVault(bankId);
    if (Number(vault.vaultBalance) < principal) {
      return { success: false, message: 'Bank does not have sufficient funds to issue this loan' };
    }

    const inserted = await db
      .insert(BankLoansSchema)
      .values({
        characterId,
        bankId,
        principal: String(principal),
        outstanding: String(principal),
        collateralItemId,
        dueAt,
        missedPayments: 0,
        status: 'ACTIVE',
      })
      .returning({ id: BankLoansSchema.id });

    if (!inserted.length) return { success: false, message: 'Failed to create loan record' };

    // Credit account and reduce vault
    const account = await this.getOrCreateAccount(characterId, bankId);
    const newBalance = Number(account.balance) + principal;
    await db.update(BankAccountsSchema).set({ balance: String(newBalance), updatedAt: new Date() }).where(eq(BankAccountsSchema.id, account.id));
    await db.update(BankVaultsSchema).set({ vaultBalance: sql`${BankVaultsSchema.vaultBalance} - ${principal}`, updatedAt: new Date() }).where(eq(BankVaultsSchema.bankId, bankId));

    await this.logTransaction(characterId, bankId, 'LOAN_CREDIT', principal, newBalance, inserted[0].id, `loan issued`);
    logInfo(`[Banking] Loan issued: char ${characterId} at ${bankId}, $${principal}, due ${dueAt.toISOString()}`);
    return { success: true, loanId: inserted[0].id };
  }

  async repayLoan(characterId: number, loanId: number, amount: number): Promise<{ success: boolean; outstanding: number; message?: string }> {
    const loans = await db.select().from(BankLoansSchema).where(and(eq(BankLoansSchema.id, loanId), eq(BankLoansSchema.characterId, characterId))).limit(1);
    if (!loans.length) return { success: false, outstanding: 0, message: 'Loan not found' };

    const loan = loans[0];
    if (loan.status !== 'ACTIVE') return { success: false, outstanding: 0, message: 'Loan is not active' };

    const account = await this.getOrCreateAccount(characterId, loan.bankId);
    if (Number(account.balance) < amount) return { success: false, outstanding: Number(loan.outstanding), message: 'Insufficient funds' };

    const newOutstanding = Math.max(0, Number(loan.outstanding) - amount);
    const newStatus = newOutstanding <= 0 ? 'REPAID' : 'ACTIVE';

    await db.update(BankLoansSchema).set({ outstanding: String(newOutstanding), status: newStatus }).where(eq(BankLoansSchema.id, loanId));
    const newBalance = Number(account.balance) - amount;
    await db.update(BankAccountsSchema).set({ balance: String(newBalance), updatedAt: new Date() }).where(eq(BankAccountsSchema.id, account.id));

    // Repaid amount returns to vault
    await db.update(BankVaultsSchema).set({ vaultBalance: sql`${BankVaultsSchema.vaultBalance} + ${amount}`, updatedAt: new Date() }).where(eq(BankVaultsSchema.bankId, loan.bankId));

    await this.logTransaction(characterId, loan.bankId, 'LOAN_REPAYMENT', amount, newBalance, loanId, `loan repayment${newStatus === 'REPAID' ? ' (paid off)' : ''}`);
    logInfo(`[Banking] Loan repayment: char ${characterId}, loan ${loanId}, $${amount}. Outstanding: $${newOutstanding}`);
    return { success: true, outstanding: newOutstanding };
  }

  async applyLoanInterest(): Promise<void> {
    const activeLoans = await db.select().from(BankLoansSchema).where(eq(BankLoansSchema.status, 'ACTIVE'));
    const now = new Date();

    for (const loan of activeLoans) {
      const daily = Number(loan.outstanding) * LOAN_DAILY_INTEREST;
      const newOutstanding = Number(loan.outstanding) + daily;
      const overdue = loan.dueAt < now;

      await db
        .update(BankLoansSchema)
        .set({
          outstanding: String(newOutstanding),
          missedPayments: overdue ? loan.missedPayments + 1 : loan.missedPayments,
        })
        .where(eq(BankLoansSchema.id, loan.id));

      const loanAccount = await this.getOrCreateAccount(loan.characterId, loan.bankId);
      await this.logTransaction(loan.characterId, loan.bankId, 'LOAN_INTEREST', daily, Number(loanAccount.balance), loan.id, `daily interest on loan`);
    }
  }

  // ── Safety Boxes ─────────────────────────────────────────────────────────

  async rentSafetyBox(characterId: number, bankId: string): Promise<{ success: boolean; boxId?: number; message?: string }> {
    const existing = await db
      .select()
      .from(BankSafetyBoxesSchema)
      .where(and(eq(BankSafetyBoxesSchema.characterId, characterId), eq(BankSafetyBoxesSchema.bankId, bankId), eq(BankSafetyBoxesSchema.active, true)))
      .limit(1);

    if (existing.length) return { success: false, message: 'Already renting a box at this bank' };

    const account = await this.getOrCreateAccount(characterId, bankId);
    if (Number(account.balance) < SAFETY_BOX_WEEKLY_FEE) {
      return { success: false, message: 'Insufficient funds for first week fee' };
    }

    const newBalance = Number(account.balance) - SAFETY_BOX_WEEKLY_FEE;
    await db.update(BankAccountsSchema).set({ balance: String(newBalance), updatedAt: new Date() }).where(eq(BankAccountsSchema.id, account.id));

    const nextDueAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const inserted = await db
      .insert(BankSafetyBoxesSchema)
      .values({ characterId, bankId, nextDueAt, weeklyFee: String(SAFETY_BOX_WEEKLY_FEE), active: true })
      .returning({ id: BankSafetyBoxesSchema.id });

    await this.logTransaction(characterId, bankId, 'SAFETY_BOX_FEE', SAFETY_BOX_WEEKLY_FEE, newBalance, inserted[0].id, `safety box first week`);
    return { success: true, boxId: inserted[0].id };
  }

  async getSafetyBox(characterId: number, bankId: string) {
    const result = await db
      .select()
      .from(BankSafetyBoxesSchema)
      .where(and(eq(BankSafetyBoxesSchema.characterId, characterId), eq(BankSafetyBoxesSchema.bankId, bankId), eq(BankSafetyBoxesSchema.active, true)))
      .limit(1);
    return result[0] ?? null;
  }

  async chargeOverdueSafetyBoxes(): Promise<void> {
    const now = new Date();
    const overdue = await db.select().from(BankSafetyBoxesSchema).where(and(eq(BankSafetyBoxesSchema.active, true), lte(BankSafetyBoxesSchema.nextDueAt, now)));

    for (const box of overdue) {
      const account = await this.getOrCreateAccount(box.characterId, box.bankId);
      const fee = Number(box.weeklyFee);

      if (Number(account.balance) >= fee) {
        const newBalance = Number(account.balance) - fee;
        await db.update(BankAccountsSchema).set({ balance: String(newBalance), updatedAt: new Date() }).where(eq(BankAccountsSchema.id, account.id));
        await this.logTransaction(box.characterId, box.bankId, 'SAFETY_BOX_FEE', fee, newBalance, box.id, `weekly safety box rental`);
        const nextDueAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        await db.update(BankSafetyBoxesSchema).set({ nextDueAt }).where(eq(BankSafetyBoxesSchema.id, box.id));
      } else {
        // Deactivate box — insufficient funds
        await db.update(BankSafetyBoxesSchema).set({ active: false }).where(eq(BankSafetyBoxesSchema.id, box.id));
        logInfo(`[Banking] Safety box ${box.id} deactivated (char ${box.characterId}) — insufficient funds`);
      }
    }
  }

  // ── Reputation ───────────────────────────────────────────────────────────

  async getBankInfo(bankId: string): Promise<{ reputationScore: number; interestRate: number; vaultBalance: number } | null> {
    const vault = await this.getVault(bankId);
    if (!vault) return null;

    return {
      reputationScore: vault.reputationScore,
      interestRate: this.effectiveInterestRate(vault.reputationScore),
      vaultBalance: Number(vault.vaultBalance),
    };
  }

  // ── Loans for character ──────────────────────────────────────────────────

  async getCharacterLoans(characterId: number) {
    return db.select().from(BankLoansSchema).where(eq(BankLoansSchema.characterId, characterId));
  }

  // ── Transaction history ──────────────────────────────────────────────────

  async getTransactions(characterId: number, bankId: string | null, limit: number) {
    const conditions = bankId
      ? and(eq(BankTransactionsSchema.characterId, characterId), eq(BankTransactionsSchema.bankId, bankId))
      : eq(BankTransactionsSchema.characterId, characterId);

    return db
      .select()
      .from(BankTransactionsSchema)
      .where(conditions)
      .orderBy(sql`${BankTransactionsSchema.createdAt} DESC`)
      .limit(Math.min(limit, 200));
  }
}

export default Banking.instance;
