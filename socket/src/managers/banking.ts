import { and, eq, lte, sql } from 'drizzle-orm';

import {
  DAILY_BUDGET_BY_BANK,
  MINERALS,
  PRICE_DECAY_PER_PCT,
  PRICE_MULTIPLIER_MIN,
  PRICE_RECOVERY_PER_HOUR,
} from '../../../resources/banking/src/shared/data/mineralConfig';
import { db } from '../db/connection';
import {
  BankAccountsSchema,
  BankLoansSchema,
  BankMineralBudgetsSchema,
  BankSafetyBoxesSchema,
  BankTransactionsSchema,
  BankTransfersSchema,
  BankVaultsSchema,
} from '../db/schema';

type BankTxType = typeof BankTransactionsSchema.$inferInsert['type'];
import { logInfo } from '../helpers';
import Characters from './characters';
import Inventories from './inventories';

const WIRE_FEE_FLAT = 5; // flat fee charged on every wire transfer
const WIRE_FEE_PCT = 0.02; // 2% of transfer amount added on top of the flat fee
const WIRE_MAX_AMOUNT = 100; // maximum amount that can be sent in a single wire transfer
const WIRE_DELAY_MS = 30 * 60 * 1000; // 30 minutes — delay before a wire transfer is completed
const LOAN_MAX_AMOUNT = 100; // maximum amount a player can borrow in a single loan
const LOAN_VAULT_FLOOR = 500; // minimum vault balance; funds below this cannot be lent out or stolen
const INTEREST_RATE = 0.002; // 0.2% per tick applied to player account balances
const VAULT_INTEREST_RATE = 0.001; // 0.1% per tick used to replenish the vault balance over time
const ROBBERY_PLAYER_SHARE = 0.15; // 15% of robbed funds are drawn from player accounts rather than the vault
const ROBBERY_MAX_PLAYER_PCT = 0.05; // maximum 5% that can be taken from any single player's balance during a robbery
const ROBBERY_COOLDOWN_MS = 2 * 60 * 60 * 1000; // 2 hours — minimum time between robberies at the same bank
const REPUTATION_ROBBERY_PENALTY = 20; // reputation points deducted from a player who robs a bank
const REPUTATION_RECOVERY_RATE = 2; // reputation points restored per tick after a robbery penalty
const SAFETY_BOX_WEEKLY_FEE = 10; // weekly fee charged to players renting a safety deposit box
const LOAN_DAILY_INTEREST = 0.01; // 1% daily interest charged on outstanding loan balances

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
    if (!character) {
      return { success: false, newBalance: 0, message: 'Insufficient on-hand cash' };
    }

    // Sync in-memory currencies from DB in case they diverged
    const freshCurrencies = await Characters.getCharacterCurrencies(characterId);
    if (freshCurrencies) {
      character.currencies.dollars = Number(freshCurrencies.dollars);
    }

    if (character.currencies.dollars < amount) {
      return { success: false, newBalance: 0, message: 'Insufficient on-hand cash' };
    }

    const dollarsBefore = character.currencies.dollars;
    const removed = await Characters.removeCharacterCurrency(characterId, 'dollars', amount);
    logInfo(`[Banking] Deposit deduct: char ${characterId} dollars before=${dollarsBefore} amount=${amount} removed=${removed} dollarsAfter=${character.currencies.dollars}`);
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

    await Characters.addCharacterCurrency(characterId, 'dollars', amount);

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
    if (amount > WIRE_MAX_AMOUNT) return { success: false, fee: 0, availableAt: '', message: `Wire transfers are capped at $${WIRE_MAX_AMOUNT}` };

    const fee = Math.round((WIRE_FEE_FLAT + amount * WIRE_FEE_PCT) * 100) / 100;
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
    // Robberies cannot drain the vault below the loan reserve floor
    const robbableVault = Math.max(0, vaultFloat - LOAN_VAULT_FLOOR);

    // Drain vault first (up to robbable portion)
    const fromVoid = Math.min(robbableVault * (1 - ROBBERY_PLAYER_SHARE), remaining);
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

    const newVaultBalance = Math.max(LOAN_VAULT_FLOOR, vaultFloat - fromVoid);
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
    if (principal > LOAN_MAX_AMOUNT) return { success: false, message: `Loans are capped at $${LOAN_MAX_AMOUNT}` };

    // One active loan per bank per character
    const existingLoans = await db
      .select({ id: BankLoansSchema.id })
      .from(BankLoansSchema)
      .where(and(eq(BankLoansSchema.characterId, characterId), eq(BankLoansSchema.bankId, bankId), eq(BankLoansSchema.status, 'ACTIVE')))
      .limit(1);
    if (existingLoans.length > 0) {
      return { success: false, message: 'You must settle your current loan before taking another' };
    }

    const vault = await this.getOrCreateVault(bankId);
    const lendableBalance = Number(vault.vaultBalance) - LOAN_VAULT_FLOOR;
    if (lendableBalance < principal) {
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

  async applyVaultInterest(): Promise<void> {
    const vaults = await db.select().from(BankVaultsSchema);
    for (const vault of vaults) {
      const balance = Number(vault.vaultBalance);
      if (balance <= 0) continue;
      const rate = VAULT_INTEREST_RATE * (vault.reputationScore / 100);
      const gain = Math.floor(balance * rate * 100) / 100;
      if (gain < 0.01) continue;
      await db
        .update(BankVaultsSchema)
        .set({ vaultBalance: sql`${BankVaultsSchema.vaultBalance} + ${gain}`, updatedAt: new Date() })
        .where(eq(BankVaultsSchema.bankId, vault.bankId));
      logInfo(`[Banking] Vault replenished at ${vault.bankId}: +$${gain.toFixed(2)} (rep ${vault.reputationScore}/100, rate ${(rate * 100).toFixed(3)}%)`);
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

  // ── Mineral purchasing ───────────────────────────────────────────────────

  private async getOrCreateMineralBudget(bankId: string) {
    const existing = await db
      .select()
      .from(BankMineralBudgetsSchema)
      .where(eq(BankMineralBudgetsSchema.bankId, bankId))
      .limit(1);

    if (existing.length) return existing[0];

    const dailyLimit = DAILY_BUDGET_BY_BANK[bankId] ?? 2000;
    const resetAt = this.nextMidnight();

    const inserted = await db
      .insert(BankMineralBudgetsSchema)
      .values({
        bankId,
        dailyLimit: String(dailyLimit),
        spentToday: '0.00',
        priceMultiplier: '1.00',
        resetAt,
      })
      .returning();

    return inserted[0];
  }

  private nextMidnight(): Date {
    const d = new Date();
    d.setUTCHours(24, 0, 0, 0);
    return d;
  }

  async getMineralPrices(bankId: string): Promise<{
    prices: { itemIdentifier: string; label: string; pricePerUnit: number }[];
    budget: { bankId: string; dailyLimit: number; spentToday: number; budgetRemaining: number; priceMultiplier: number; resetAt: string };
  }> {
    const budget = await this.getOrCreateMineralBudget(bankId);
    const multiplier = Number(budget.priceMultiplier);

    const prices = MINERALS.map((m) => ({
      itemIdentifier: m.itemIdentifier,
      label: m.label,
      pricePerUnit: Math.round(m.basePricePerUnit * multiplier * 100) / 100,
    }));

    const dailyLimit = Number(budget.dailyLimit);
    const spentToday = Number(budget.spentToday);

    return {
      prices,
      budget: {
        bankId,
        dailyLimit,
        spentToday,
        budgetRemaining: Math.max(0, dailyLimit - spentToday),
        priceMultiplier: multiplier,
        resetAt: budget.resetAt.toISOString(),
      },
    };
  }

  async sellMinerals(
    characterId: number,
    bankId: string,
    items: { itemIdentifier: string; itemIds: number[]; quantity: number }[],
  ): Promise<{ success: boolean; payout: number; budgetRemaining: number; message?: string }> {
    if (!items.length) return { success: false, payout: 0, budgetRemaining: 0, message: 'No items provided' };

    const budget = await this.getOrCreateMineralBudget(bankId);
    const dailyLimit = Number(budget.dailyLimit);
    const spentToday = Number(budget.spentToday);
    const budgetRemaining = Math.max(0, dailyLimit - spentToday);

    if (budgetRemaining <= 0) {
      return { success: false, payout: 0, budgetRemaining: 0, message: 'This bank has reached its daily purchasing limit. Try another bank.' };
    }

    const multiplier = Number(budget.priceMultiplier);

    // Calculate payout, capped to remaining budget
    let totalPayout = 0;
    const validatedItems: { itemIdentifier: string; itemIds: number[]; quantity: number; unitPrice: number }[] = [];

    for (const sellItem of items) {
      const def = MINERALS.find((m) => m.itemIdentifier === sellItem.itemIdentifier);
      if (!def) continue;
      if (sellItem.quantity <= 0 || sellItem.itemIds.length !== sellItem.quantity) continue;

      const unitPrice = Math.round(def.basePricePerUnit * multiplier * 100) / 100;
      const linePayout = unitPrice * sellItem.quantity;
      totalPayout += linePayout;
      validatedItems.push({ ...sellItem, unitPrice });
    }

    if (totalPayout <= 0 || !validatedItems.length) {
      return { success: false, payout: 0, budgetRemaining, message: 'No valid mineral items to sell' };
    }

    // Cap payout to budget
    const cappedPayout = Math.min(totalPayout, budgetRemaining);
    const payoutRatio = cappedPayout / totalPayout;

    // Remove items from inventory proportionally (best-effort: remove what fits)
    const inventoryIdentifier = `character:${characterId}`;
    let actualPayout = 0;

    for (const sellItem of validatedItems) {
      const scaledQty = Math.floor(sellItem.quantity * payoutRatio);
      const qtyToRemove = scaledQty > 0 ? scaledQty : (actualPayout < cappedPayout ? sellItem.quantity : 0);
      if (qtyToRemove <= 0) continue;

      let removed = 0;
      for (const itemId of sellItem.itemIds.slice(0, qtyToRemove)) {
        const result = await Inventories.removeItem(itemId);
        if (result) {
          removed++;
          actualPayout += sellItem.unitPrice;
        }
      }

      if (removed === 0) continue;
    }

    if (actualPayout <= 0) {
      return { success: false, payout: 0, budgetRemaining, message: 'Failed to remove items from inventory' };
    }

    actualPayout = Math.round(actualPayout * 100) / 100;

    // Give player cash
    await Characters.addCharacterCurrency(characterId, 'dollars', actualPayout);

    // Update budget: deduct spent, decay multiplier proportional to purchase size
    const newSpent = spentToday + actualPayout;
    const pctOfLimit = actualPayout / dailyLimit;
    const decay = pctOfLimit * PRICE_DECAY_PER_PCT * 100;
    const newMultiplier = Math.max(PRICE_MULTIPLIER_MIN, multiplier - decay);

    await db
      .update(BankMineralBudgetsSchema)
      .set({
        spentToday: String(newSpent),
        priceMultiplier: String(Math.round(newMultiplier * 10000) / 10000),
        updatedAt: new Date(),
      })
      .where(eq(BankMineralBudgetsSchema.bankId, bankId));

    // Log transaction
    const account = await this.getOrCreateAccount(characterId, bankId);
    await this.logTransaction(characterId, bankId, 'MINERAL_SALE', actualPayout, Number(account.balance), undefined, `mineral sale at ${bankId}`);

    logInfo(`[Banking] Mineral sale: char ${characterId} sold $${actualPayout} worth at ${bankId}. Budget remaining: $${Math.max(0, dailyLimit - newSpent).toFixed(2)}`);

    return {
      success: true,
      payout: actualPayout,
      budgetRemaining: Math.max(0, dailyLimit - newSpent),
    };
  }

  async recoverMineralPrices(): Promise<void> {
    await db
      .update(BankMineralBudgetsSchema)
      .set({
        priceMultiplier: sql`LEAST(1.0, ${BankMineralBudgetsSchema.priceMultiplier} + ${PRICE_RECOVERY_PER_HOUR})`,
        updatedAt: new Date(),
      });
    logInfo('[Banking] Mineral price multipliers recovered');
  }

  async resetMineralBudgets(): Promise<void> {
    const now = new Date();
    const resetAt = this.nextMidnight();

    await db
      .update(BankMineralBudgetsSchema)
      .set({
        spentToday: '0.00',
        priceMultiplier: '1.00',
        resetAt,
        updatedAt: now,
      });

    logInfo('[Banking] Mineral budgets reset for new day');
  }
}

export default Banking.instance;
