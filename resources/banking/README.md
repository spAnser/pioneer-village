# Banking

A full-featured banking system for Pioneer Village. Players interact with teller NPCs inside bank interiors to manage accounts, send wire transfers, take loans, rent safety boxes, and sell minerals.

---

## Features

### Account Management
Each character has a separate account per bank. Balances are tracked independently, and interest is applied hourly server-side.

### Deposits & Withdrawals
Players can move money between their on-hand cash and a bank account.

### Wire Transfers
Send money to another character at any bank. A fee is charged on send, and transfers mature over time before the recipient can collect them at a teller.

### Loans
Characters can borrow money from a bank with a set principal, interest rate, due date, and optional collateral item. Daily interest accrues on outstanding balances. Missed payments are tracked.

### Safety Boxes
Characters can rent a private safety box at a bank. A weekly fee is billed automatically, and the box is tracked as a `BankSafetyBox` record with an `inventoryId` field intended to link it to a dedicated inventory container in the inventory resource.

**This feature is not fully functional yet.** The banking side — renting, billing, and record-keeping — is implemented, but it depends on the inventory resource exposing a way to create and manage a persistent, character-bound storage container and hand back an ID that banking can store. Until that contract exists, `inventoryId` is always `null` and the safety box has nowhere to actually hold items. See [In Progress](#in-progress) for details.

### Mineral Trading
Banks buy minerals from players at dynamic prices. Each bank has a daily budget, and prices decay as the budget is spent — recovering over time. Players currently sell all minerals automatically (see [In Progress](#in-progress)).

### Bank Reputation
Each bank maintains a `reputationScore` and a corresponding `interestRate`. Reputation reflects the health and standing of the bank from a player-economy perspective — it rises over time through normal operation and falls when the bank is robbed or when vault funds are depleted.

Reputation directly influences the interest rate applied to player accounts at that bank. A high-reputation bank offers better deposit interest (more earnings for players keeping money there) and lower loan interest rates (cheaper borrowing). A damaged bank — one that has been robbed recently or has a depleted vault — applies worse rates, making it less attractive to deal with until it recovers.

This creates gameplay tension around bank robberies: a successful heist hurts the bank's reputation, raising borrowing costs and reducing deposit returns for all players at that location until the bank recovers over several hours. It also gives players a reason to care which bank they use, since rates differ and reputation fluctuates.

Reputation recovers passively every 6 hours via the `banking.recover-reputation` server tick. The full calculation logic (how much reputation a robbery removes, the mapping from score to interest rate, and the recovery curve) lives in the backend socket handler, not in this resource.

### Bank Robbery Integration
External heist/robbery resources can emit `banking:rob-bank` to log theft events and reduce vault balance.

### Transaction History
Every operation (deposits, withdrawals, wire fees, interest, loan credits, safety box fees, mineral sales, robbery losses) is recorded with a full audit trail.

---

## Banks

| Bank | Location | Daily Mineral Budget |
|------|----------|----------------------|
| Valentine | Valentine | $3,000 |
| Rhodes | Rhodes | $4,000 |
| Blackwater | Blackwater | $6,000 |
| Saint Denis | Saint Denis | $12,000 |
| Annesburg | Annesburg | $2,500 |
| Armidillo | Armidillo | — |
| Strawberry | — | $2,000 (no interior yet) |
| Tumbleweed | — | $1,500 (no interior yet) |

---

## Server-Side Exports

Other resources can import banking functions via `exports['banking']`:

```ts
getAccounts(characterId: number): Promise<BankAccount.Data[]>
getBalance(characterId: number, bankId: Bank.Id): Promise<number | null>
deposit(characterId: number, bankId: Bank.Id, amount: number): Promise<{ success, newBalance, message? }>
withdraw(characterId: number, bankId: Bank.Id, amount: number): Promise<{ success, newBalance, message? }>
wireTransfer(fromCharacterId, toCharacterId, fromBankId, toBankId, amount): Promise<{ success, fee, availableAt, message? }>
getTransactions(characterId, bankId, limit?): Promise<BankTransaction.Data[]>
getLoans(characterId: number): Promise<BankLoan.Data[]>
getBankInfo(bankId: Bank.Id): Promise<Bank.Info | null>
```

Other resources can also trigger deposits/withdrawals via net events:
- `banking.deposit-from-resource`
- `banking.withdraw-from-resource`

---

## Periodic Server Tasks

| Task | Interval | Description |
|------|----------|-------------|
| Interest tick | 1 hour | Apply interest to all accounts |
| Vault replenishment | 5 minutes | Recover vault float |
| Reputation recovery | 6 hours | Restore bank reputation toward baseline |
| Transfer resolution | 1 minute | Check for matured wire transfers |
| Loan interest | 24 hours | Apply daily interest on outstanding loans |
| Safety box billing | 1 hour | Charge overdue safety box fees |
| Mineral price recovery | 1 hour | Recover mineral price multiplier |
| Budget reset | Daily (UTC midnight) | Reset mineral daily budgets |

---

## Mineral Prices

Base prices per unit. Dynamic multiplier floors at 0.5x and decays 0.5% per 1% of daily budget spent, recovering 0.02x per hour.

| Mineral | Base Price |
|---------|-----------|
| Gold Nugget (`PV_GOLD_NUGGET`) | $45 |
| Silver Ore (`PV_SILVER_ORE`) | $18 |
| Diamond (`PV_DIAMOND`) | $120 |
| Ruby (`PV_RUBY`) | $95 |
| Emerald (`PV_EMERALD`) | $80 |

---

## Debug Commands

All commands are client-side only and intended for testing.

| Command | Description |
|---------|-------------|
| `/bankAccounts` | List all loaded accounts |
| `/bankDeposit [bankId] [amount]` | Force a deposit |
| `/bankWithdraw [bankId] [amount]` | Force a withdrawal |
| `/bankWire [fromBankId] [toBankId] [toCharacterId] [amount]` | Send a wire transfer |
| `/bankCollect` | Collect matured incoming transfers |
| `/bankInfo [bankId]` | Show bank reputation, interest rate, vault balance |
| `/bankLoan [bankId] [amount] [daysUntilDue=30]` | Take out a loan |
| `/bankRepay [loanId] [amount]` | Repay a loan |
| `/bankLoans` | List active loans |
| `/bankSafetyBox [bankId]` | Rent or view safety box |
| `/bankHistory [bankId] [limit=20]` | Show transaction log |
| `/bankSetZone [bankId]` | Manually enter a bank zone |
| `/bankClearZone` | Exit current bank zone |
| `/bankUI [tab] [bankId]` | Open UI (tabs: deposit, withdraw, wire, loan, repay) |
| `/bankUIClose` | Close UI |
| `/bankSpawnTeller [bankId]` | Force spawn a teller NPC |
| `/bankDespawnTeller [bankId]` | Force despawn a teller NPC |

---

## In Progress

### Safety Boxes — Blocked on Inventory Resource
The banking side of safety boxes is complete: the rent flow, weekly billing, and `BankSafetyBox` records all work. What's missing is the inventory side.

The intent is that renting a safety box creates a persistent, character-bound storage container in the inventory resource and stores the returned container ID as `inventoryId` on the `BankSafetyBox` record. Players would then open that container from the teller menu, much like a personal stash tied to the bank location.

For this to work, the inventory resource needs to expose something like:
- A way to create a named/typed persistent container and return its ID
- A way to open that container for a specific player
- Optionally: a way to destroy the container when the safety box is cancelled or forfeited

Until those exports or events exist, `inventoryId` is always `null`, the safety box menu option in the teller has nothing to open, and the feature is effectively a no-op beyond billing the player a weekly fee.

### Mineral Selling UI
Currently, selecting "Sell Minerals" auto-sells 100% of all minerals in the player's inventory. A proper UI dialog for selecting items and quantities is needed before this is production-ready. See `src/client/minerals.ts` line 25.

### Missing Bank Interiors
**Strawberry** and **Tumbleweed** banks are defined in config with daily mineral budgets but are commented out in `src/shared/data/bankData.ts` — no suitable interior locations or NPC positions have been set for these yet.

### Teller NPC Model
The teller uses `s_m_m_bankclerk_01` as a placeholder. The final model hasn't been decided.

---

## File Structure

```
src/
  types.d.ts                          # Global TS namespaces (Bank, BankAccount, BankTransfer, BankLoan, etc.)
  shared/
    data/
      bankData.ts                     # Bank definitions (coordinates, zones, teller positions)
      mineralConfig.ts                # Mineral prices, budgets, decay/recovery rates
  client/
    client.ts                         # Entry point, blip registration, debug commands
    config.ts                         # Zone prefix constant
    events.ts                         # Net event handlers (teller interactions)
    tellers.ts                        # NPC spawning, scenario, target menu registration
    zones.ts                          # Bank zone registration
    minerals.ts                       # Mineral sell event handler
    targets.ts                        # Placeholder (targets registered dynamically per teller)
    controllers/
      bank-controller.ts              # Main client logic, account cache, RPC calls, state
    classes/
      account.ts                      # Account data class with dirty-field tracking
  server/
    server.ts                         # Periodic tasks, event intervals, robbery hook
    exports.ts                        # Exported functions for other resources
```
