import React, { useCallback, useEffect, useMemo, useState } from 'react';


import { useEscapeKey } from '../../hooks/use-game-events';
import bankingStore, { BankingTab } from '../../stores/banking-store';
import styles from './styles.module.scss';

const BANK_MASTHEAD: Record<string, { est: string; sub: string }> = {
  valentine:     { est: 'Est. 1871 · West Elizabeth',    sub: '"A steady hand for uncertain times."' },
  rhodes:        { est: 'Est. 1858 · Lemoyne Territory', sub: '"Where Southern honour meets sound money."' },
  blackwater:    { est: 'Est. 1882 · West Elizabeth',    sub: '"The frontier\'s most trusted institution."' },
  'saint-denis': { est: 'Est. 1791 · Lemoyne Territory', sub: '"Wealth managed with Creole distinction."' },
  annesburg:     { est: 'Est. 1876 · Roanoke Ridge',     sub: '"Hard-earned coin, safely kept."' },
  armidillo:     { est: 'Est. 1885 · New Austin',        sub: '"Your money\'s safe with us, partner."' },
};

const DEFAULT_MASTHEAD = { est: 'Est. 1865 · Lemoyne Territory', sub: '"Your fortune, kept under lock, key & honest men."' };

const TAB_LABELS: Record<BankingTab, string> = {
  deposit: 'Deposit',
  withdraw: 'Withdrawal',
  wire: 'Wire Transfer',
  loan: 'Request Loan',
  repay: 'Repay Loan',
};

const WAX_LETTER: Record<BankingTab, string> = {
  deposit: 'D',
  withdraw: 'W',
  wire: 'T',
  loan: '£',
  repay: 'R',
};

function fmt(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function randDocNo(): string {
  return String(Math.floor(10000 + Math.random() * 90000));
}

// ─── Deposit panel ───────────────────────────────────────────────────────────
function useAmountInputRef() {
  const ref = React.useRef<HTMLInputElement>(null);
  useEffect(() => { ref.current?.focus(); }, []);
  return ref;
}

function DepositPanel({ state, onClose }: { state: ReturnType<typeof bankingStore.getState>; onClose: () => void }) {
  const [amount, setAmount] = useState('');
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<{ msg: string; ok: boolean } | null>(null);
  const amountRef = useAmountInputRef();
  const docNo = useMemo(randDocNo, []);

  const numeric = parseFloat(amount) || 0;
  const balanceAfter = state.currentBalance + numeric;

  const addAmount = (n: number) => setAmount((prev) => fmt((parseFloat(prev) || 0) + n));
  const allCash = () => setAmount(fmt(state.cashOnPerson));

  const submit = async () => {
    if (numeric <= 0 || busy) return;
    setBusy(true);
    setFeedback(null);
    try {
      const result: { success: boolean; newBalance: number; message?: string } =
        await bankingStore.call('banking.deposit', state.bankId, numeric);
      if (result.success) {
        bankingStore.updateState({ currentBalance: result.newBalance, cashOnPerson: state.cashOnPerson - numeric });
        setFeedback({ msg: `Deposited $${fmt(numeric)} — new balance $${fmt(result.newBalance)}`, ok: true });
        setAmount('');
      } else {
        setFeedback({ msg: result.message ?? 'Transaction refused.', ok: false });
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className={styles.docHead}>
        <div className={styles.bankName}>
          {state.bankName}
          <small>Deposits insured by the vault &amp; honest men</small>
        </div>
        <div className={styles.docNo}>Slip Nº<b>{docNo}</b></div>
      </div>
      <h2 className={styles.docTitle}><span>Deposit Slip</span></h2>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>Account Holder</label>
          <input type="text" readOnly value={state.characterName} />
        </div>
      </div>

      <div className={styles.field}>
        <label>Sum to Deposit</label>
        <div className={styles.amountWrap}>
          <span className={styles.cur}>$</span>
          <input
            ref={amountRef}
            type="text"
            inputMode="decimal"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className={styles.denoms}>
          <button className={styles.denom} type="button" onClick={() => addAmount(10)}>+ $10</button>
          <button className={styles.denom} type="button" onClick={() => addAmount(50)}>+ $50</button>
          <button className={styles.denom} type="button" onClick={() => addAmount(100)}>+ $100</button>
          <button className={styles.denom} type="button" onClick={allCash}>All Pocket Cash</button>
        </div>
      </div>

      <div className={styles.ledger}>
        <div className={styles.ledgerRow}><span className={styles.lab}>Cash on Person</span><span className={styles.val}>$ {fmt(state.cashOnPerson)}</span></div>
        <div className={styles.ledgerRow}><span className={styles.lab}>Current Balance</span><span className={styles.val}>$ {fmt(state.currentBalance)}</span></div>
        <div className={styles.ledgerRow}><span className={styles.lab}>Balance After Deposit</span><span className={`${styles.val} ${styles.valGreen}`}>$ {fmt(balanceAfter)}</span></div>
      </div>

      <div className={styles.actions}>
        <button className={styles.btnGhost} type="button" onClick={onClose}>Never Mind</button>
        <button className={styles.btnSeal} type="button" onClick={submit} disabled={busy || numeric <= 0}>
          {busy ? <span className={styles.spinner}>⟳</span> : 'Deposit Funds'}
        </button>
      </div>
      {feedback && <p className={`${styles.feedback} ${feedback.ok ? styles.feedbackOk : styles.feedbackErr}`}>{feedback.msg}</p>}
      <p className={styles.tellerNote}>— The teller counts your notes twice, as is custom. —</p>
    </>
  );
}

// ─── Withdraw panel ──────────────────────────────────────────────────────────
function WithdrawPanel({ state, onClose }: { state: ReturnType<typeof bankingStore.getState>; onClose: () => void }) {
  const [amount, setAmount] = useState('');
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<{ msg: string; ok: boolean } | null>(null);
  const amountRef = useAmountInputRef();
  const docNo = useMemo(randDocNo, []);

  const numeric = parseFloat(amount) || 0;
  const balanceAfter = state.currentBalance - numeric;

  const setPreset = (n: number) => setAmount(fmt(n));
  const halfBalance = () => setAmount(fmt(state.currentBalance / 2));
  const closeAccount = () => setAmount(fmt(state.currentBalance));

  const submit = async () => {
    if (numeric <= 0 || busy) return;
    setBusy(true);
    setFeedback(null);
    try {
      const result: { success: boolean; newBalance: number; message?: string } =
        await bankingStore.call('banking.withdraw', state.bankId, numeric);
      if (result.success) {
        bankingStore.updateState({ currentBalance: result.newBalance, cashOnPerson: state.cashOnPerson + numeric });
        setFeedback({ msg: `Withdrew $${fmt(numeric)} — remaining balance $${fmt(result.newBalance)}`, ok: true });
        setAmount('');
      } else {
        setFeedback({ msg: result.message ?? 'Transaction refused.', ok: false });
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className={styles.docHead}>
        <div className={styles.bankName}>
          {state.bankName}
          <small>Pay to bearer upon presentation of this voucher</small>
        </div>
        <div className={styles.docNo}>Voucher Nº<b>{docNo}</b></div>
      </div>
      <h2 className={styles.docTitle}><span>Withdrawal Voucher</span></h2>

      <div className={styles.field}>
        <label>Account Holder</label>
        <input type="text" readOnly value={state.characterName} />
      </div>

      <div className={styles.field}>
        <label>Sum to Withdraw</label>
        <div className={styles.amountWrap}>
          <span className={styles.cur}>$</span>
          <input
            ref={amountRef}
            type="text"
            inputMode="decimal"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className={styles.denoms}>
          <button className={styles.denom} type="button" onClick={() => setPreset(25)}>$25</button>
          <button className={styles.denom} type="button" onClick={() => setPreset(50)}>$50</button>
          <button className={styles.denom} type="button" onClick={() => setPreset(100)}>$100</button>
          <button className={styles.denom} type="button" onClick={halfBalance}>Half of Balance</button>
        </div>
      </div>

      <div className={styles.ledger}>
        <div className={styles.ledgerRow}><span className={styles.lab}>Current Balance</span><span className={styles.val}>$ {fmt(state.currentBalance)}</span></div>
        <div className={styles.ledgerRow}><span className={styles.lab}>Sum Withdrawn</span><span className={`${styles.val} ${styles.valRed}`}>− $ {fmt(numeric)}</span></div>
        <div className={styles.ledgerRow}><span className={styles.lab}>Balance Remaining</span><span className={styles.val}>$ {fmt(balanceAfter)}</span></div>
      </div>

      <div className={styles.actions}>
        <button className={styles.btnGhost} type="button" onClick={onClose}>Never Mind</button>
        <button className={styles.btnSeal} type="button" onClick={submit} disabled={busy || numeric <= 0 || numeric > state.currentBalance}>
          {busy ? <span className={styles.spinner}>⟳</span> : 'Withdraw Funds'}
        </button>
      </div>
      {feedback && <p className={`${styles.feedback} ${feedback.ok ? styles.feedbackOk : styles.feedbackErr}`}>{feedback.msg}</p>}
      <p className={styles.tellerNote}>— Notes dispensed in tens and twenties, unless otherwise requested. —</p>
    </>
  );
}

// ─── Wire transfer panel ─────────────────────────────────────────────────────
import BankData from '../../../../../../banking/src/shared/data/bankData';

const BANK_OPTIONS: { id: Bank.Id; label: string }[] = BankData.map((b: Bank.Data) => ({ id: b.identifier, label: b.name }));

const WIRE_FEE_FLAT = 5;
const WIRE_FEE_PCT = 0.02;
const WIRE_MAX_AMOUNT = 100;
const LOAN_MAX_AMOUNT = 100;

function WirePanel({ state, onClose }: { state: ReturnType<typeof bankingStore.getState>; onClose: () => void }) {
  const [toCharId, setToCharId] = useState('');
  const [toBankId, setToBankId] = useState<Bank.Id>('valentine');
  const [amount, setAmount] = useState('');
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<{ msg: string; ok: boolean } | null>(null);
  const amountRef = useAmountInputRef();
  const docNo = useMemo(randDocNo, []);

  const numeric = parseFloat(amount) || 0;
  const fee = numeric > 0 ? Math.round((WIRE_FEE_FLAT + numeric * WIRE_FEE_PCT) * 100) / 100 : 0;
  const total = numeric + fee;
  const balanceAfter = state.currentBalance - total;

  const submit = async () => {
    if (numeric <= 0 || !toCharId || busy) return;
    setBusy(true);
    setFeedback(null);
    try {
      const result: { success: boolean; fee: number; availableAt: string; message?: string } =
        await bankingStore.call('banking.wire-transfer', parseInt(toCharId), state.bankId, toBankId, numeric);
      if (result.success) {
        bankingStore.updateState({ currentBalance: state.currentBalance - numeric - result.fee });
        setFeedback({ msg: `Wire sent! Available ${new Date(result.availableAt).toLocaleString()}`, ok: true });
        setAmount('');
        setToCharId('');
      } else {
        setFeedback({ msg: result.message ?? 'Wire refused.', ok: false });
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className={styles.docHead}>
        <div className={styles.bankName}>
          Continental Telegraph Co.
          <small>In partnership with {state.bankName} · Funds wired same day</small>
        </div>
        <div className={styles.docNo}>Form Nº<b>{docNo}</b></div>
      </div>
      <h2 className={styles.docTitle}><span>Money by Wire</span></h2>

      <div className={styles.tgStrip}>
        WIRE READY — AWAITING INSTRUCTION
        <span className={styles.morse}>·–– ·· ·–· ·   ·–· · ·– –·· –·––</span>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>Recipient Character ID</label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Character ID"
            value={toCharId}
            onChange={(e) => setToCharId(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label>Receiving Office</label>
          <select value={toBankId} onChange={(e) => setToBankId(e.target.value as Bank.Id)}>
            {BANK_OPTIONS.map((b) => (
              <option key={b.id} value={b.id}>{b.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label>Sum to Wire</label>
        <div className={styles.amountWrap}>
          <span className={styles.cur}>$</span>
          <input
            ref={amountRef}
            type="text"
            inputMode="decimal"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.ledger}>
        <div className={styles.ledgerRow}><span className={styles.lab}>Current Balance</span><span className={styles.val}>$ {fmt(state.currentBalance)}</span></div>
        <div className={styles.ledgerRow}><span className={styles.lab}>Sum Wired</span><span className={`${styles.val} ${styles.valRed}`}>− $ {fmt(numeric)}</span></div>
        <div className={styles.ledgerRow}><span className={styles.lab}>Telegraph Fee ($5 + 2%)</span><span className={`${styles.val} ${styles.valRed}`}>− $ {fmt(fee)}</span></div>
        <div className={styles.ledgerRow}><span className={styles.lab}>Balance After Wire</span><span className={styles.val}>$ {fmt(balanceAfter)}</span></div>
      </div>

      <div className={styles.actions}>
        <button className={styles.btnGhost} type="button" onClick={onClose}>Never Mind</button>
        <button className={styles.btnSeal} type="button" onClick={submit} disabled={busy || numeric <= 0 || numeric > WIRE_MAX_AMOUNT || !toCharId}>
          {busy ? <span className={styles.spinner}>⟳</span> : 'Send the Wire'}
        </button>
      </div>
      {feedback && <p className={`${styles.feedback} ${feedback.ok ? styles.feedbackOk : styles.feedbackErr}`}>{feedback.msg}</p>}
      <p className={styles.tellerNote}>— Delivery within the hour, weather and outlaws permitting. —</p>
    </>
  );
}

// ─── Loan panel ───────────────────────────────────────────────────────────────
type LoanTerm = 1 | 2 | 4;  // weeks: 1 week, 2 weeks, 1 month (~4 weeks)

function LoanPanel({ state, onClose }: { state: ReturnType<typeof bankingStore.getState>; onClose: () => void }) {
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState<LoanTerm>(2);
  const [busy, setBusy] = useState(false);
  const [approved, setApproved] = useState(false);
  const [feedback, setFeedback] = useState<{ msg: string; ok: boolean } | null>(null);
  const amountRef = useAmountInputRef();
  const hasActiveLoan = state.loans.some((l) => l.status === 'ACTIVE' && l.bankId === state.bankId);
  const docNo = useMemo(randDocNo, []);

  const principal = parseFloat(amount) || 0;
  const annualRate = 0.12;
  const weeklyRate = annualRate / 52;
  const interest = principal * weeklyRate * term;
  const total = principal + interest;

  const TERM_LABELS: Record<LoanTerm, string> = { 1: '1 week', 2: '2 weeks', 4: '1 month' };

  const submit = async () => {
    if (principal <= 0 || busy) return;
    setBusy(true);
    setFeedback(null);
    const dueAt = new Date(Date.now() + term * 7 * 24 * 60 * 60 * 1000).toISOString();
    try {
      const result: { success: boolean; loanId?: number; message?: string } =
        await bankingStore.call('banking.take-loan', state.bankId, principal, null, dueAt);
      if (result.success) {
        bankingStore.updateState({ currentBalance: state.currentBalance + principal });
        setApproved(true);
        setFeedback({ msg: `Loan #${result.loanId} issued for $${fmt(principal)}. Due in ${TERM_LABELS[term]}.`, ok: true });
        setAmount('');
      } else {
        setFeedback({ msg: result.message ?? 'Loan refused.', ok: false });
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className={styles.docHead}>
        <div className={styles.bankName}>
          {state.bankName}
          <small>Lending Department · Collateral may be claimed by force of law</small>
        </div>
        <div className={styles.docNo}>Note Nº<b>{docNo}</b></div>
      </div>
      <h2 className={styles.docTitle}><span>Promissory Note</span></h2>

      <div className={styles.interestNote}>
        <div className={styles.pct}>12%</div>
        <p>Interest per annum, compounded monthly. Miss three payments and the bank sends men far less polite than your teller.</p>
      </div>

      <div className={styles.field}>
        <label>Principal Requested</label>
        <div className={styles.amountWrap}>
          <span className={styles.cur}>$</span>
          <input
            ref={amountRef}
            type="text"
            inputMode="decimal"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label>Term of Repayment</label>
        <div className={styles.terms}>
          {([1, 2, 4] as LoanTerm[]).map((t) => (
            <button
              key={t}
              type="button"
              className={`${styles.term} ${term === t ? styles.termSel : ''}`}
              onClick={() => setTerm(t)}
            >
              <div className={styles.d}>{t === 4 ? '1' : t}</div>
              <div className={styles.l}>{t === 1 ? 'week' : t === 2 ? 'weeks' : 'month'}</div>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.ledger}>
        <div className={styles.ledgerRow}><span className={styles.lab}>Principal</span><span className={styles.val}>$ {fmt(principal)}</span></div>
        <div className={styles.ledgerRow}><span className={styles.lab}>Interest ({TERM_LABELS[term]})</span><span className={`${styles.val} ${styles.valRed}`}>$ {fmt(interest)}</span></div>
        <div className={styles.ledgerRow}><span className={styles.lab}>Total Repayable</span><span className={styles.val}>$ {fmt(total)}</span></div>
      </div>

      {approved && <div className={styles.stamp}>Approved</div>}

      <div className={styles.actions}>
        <button className={styles.btnGhost} type="button" onClick={onClose}>Never Mind</button>
        <button className={styles.btnSeal} type="button" onClick={submit} disabled={busy || principal <= 0 || principal > LOAN_MAX_AMOUNT || hasActiveLoan || approved}>
          {busy ? <span className={styles.spinner}>⟳</span> : 'Sign the Note'}
        </button>
      </div>
      {hasActiveLoan
        ? <p className={`${styles.feedback} ${styles.feedbackErr}`}>Outstanding loan at this bank — settle it before taking another.</p>
        : feedback && <p className={`${styles.feedback} ${feedback.ok ? styles.feedbackOk : styles.feedbackErr}`}>{feedback.msg}</p>
      }
      <p className={styles.tellerNote}>— Your mark below binds you in the eyes of God and Lemoyne. —</p>
    </>
  );
}

// ─── Repay panel ──────────────────────────────────────────────────────────────
function RepayPanel({ state, onClose }: { state: ReturnType<typeof bankingStore.getState>; onClose: () => void }) {
  const [selectedLoanId, setSelectedLoanId] = useState<number | null>(null);
  const [amount, setAmount] = useState('');
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<{ msg: string; ok: boolean } | null>(null);
  const docNo = useMemo(randDocNo, []);

  const activeLoans = state.loans.filter((l) => l.status === 'ACTIVE');
  const selectedLoan = activeLoans.find((l) => l.id === selectedLoanId) ?? null;
  const numeric = parseFloat(amount) || 0;

  useEffect(() => {
    if (activeLoans.length === 1) setSelectedLoanId(activeLoans[0].id);
  }, []);

  const payFull = () => {
    if (selectedLoan) setAmount(fmt(selectedLoan.outstanding));
  };

  const submit = async () => {
    if (!selectedLoanId || numeric <= 0 || busy) return;
    setBusy(true);
    setFeedback(null);
    try {
      const result: { success: boolean; outstanding: number; message?: string } =
        await bankingStore.call('banking.repay-loan', selectedLoanId, numeric);
      if (result.success) {
        bankingStore.updateState({
          currentBalance: state.currentBalance - numeric,
          loans: state.loans.map((l) =>
            l.id === selectedLoanId ? { ...l, outstanding: result.outstanding, status: result.outstanding <= 0 ? 'REPAID' : 'ACTIVE' } : l,
          ),
        });
        setFeedback({ msg: `Repaid $${fmt(numeric)}. Outstanding: $${fmt(result.outstanding)}`, ok: true });
        setAmount('');
      } else {
        setFeedback({ msg: result.message ?? 'Repayment refused.', ok: false });
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className={styles.docHead}>
        <div className={styles.bankName}>
          {state.bankName}
          <small>Repayment ledger · Outstanding balances accrue interest daily</small>
        </div>
        <div className={styles.docNo}>Repay Nº<b>{docNo}</b></div>
      </div>
      <h2 className={styles.docTitle}><span>Loan Repayment</span></h2>

      {activeLoans.length === 0 ? (
        <p className={styles.tellerNote} style={{ margin: '20px 0', textAlign: 'center' }}>
          — No outstanding loans on record. Good standing, friend. —
        </p>
      ) : (
        <>
          <div className={styles.field}>
            <label>Select Loan</label>
            {activeLoans.map((loan) => (
              <div
                key={loan.id}
                className={`${styles.loanItem} ${selectedLoanId === loan.id ? styles.loanItemSel : ''}`}
                onClick={() => { setSelectedLoanId(loan.id); setAmount(''); }}
              >
                <div className={styles.loanBank}>Loan #{loan.id}</div>
                <div className={styles.loanDetail}>
                  Outstanding: ${fmt(loan.outstanding)} / ${fmt(loan.principal)} — Due: {new Date(loan.dueAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>

          {selectedLoan && (
            <>
              <div className={styles.field}>
                <label>Amount to Repay</label>
                <div className={styles.amountWrap}>
                  <span className={styles.cur}>$</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className={styles.denoms}>
                  <button className={styles.denom} type="button" onClick={payFull}>Pay in Full</button>
                </div>
              </div>

              <div className={styles.ledger}>
                <div className={styles.ledgerRow}><span className={styles.lab}>Outstanding</span><span className={`${styles.val} ${styles.valRed}`}>$ {fmt(selectedLoan.outstanding)}</span></div>
                <div className={styles.ledgerRow}><span className={styles.lab}>Repaying</span><span className={styles.val}>$ {fmt(numeric)}</span></div>
                <div className={styles.ledgerRow}><span className={styles.lab}>Remaining After</span><span className={styles.val}>$ {fmt(Math.max(0, selectedLoan.outstanding - numeric))}</span></div>
              </div>
            </>
          )}
        </>
      )}

      <div className={styles.actions}>
        <button className={styles.btnGhost} type="button" onClick={onClose}>Never Mind</button>
        {activeLoans.length > 0 && (
          <button className={styles.btnSeal} type="button" onClick={submit} disabled={busy || !selectedLoanId || numeric <= 0}>
            {busy ? <span className={styles.spinner}>⟳</span> : 'Submit Payment'}
          </button>
        )}
      </div>
      {feedback && <p className={`${styles.feedback} ${feedback.ok ? styles.feedbackOk : styles.feedbackErr}`}>{feedback.msg}</p>}
      <p className={styles.tellerNote}>— Prompt payment keeps the marshals at bay. —</p>
    </>
  );
}

// ─── SVG filter definitions ───────────────────────────────────────────────────
function SvgFilters() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <filter id="tornpaper" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018 0.024" numOctaves={4} seed={7} result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={14} xChannelSelector="R" yChannelSelector="G"/>
        </filter>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves={2} seed={3} stitchTiles="stitch"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.36  0 0 0 0 0.28  0 0 0 0 0.18  0 0 0 0.18 0"/>
        </filter>
        <filter id="inkpress" x="-3%" y="-3%" width="106%" height="106%">
          <feTurbulence type="fractalNoise" baseFrequency="0.011 0.019" numOctaves={3} seed={11} result="warp"/>
          <feDisplacementMap in="SourceGraphic" in2="warp" scale={2} xChannelSelector="R" yChannelSelector="G" result="warped"/>
          <feTurbulence type="fractalNoise" baseFrequency="0.32" numOctaves={2} seed={5} result="rough"/>
          <feDisplacementMap in="warped" in2="rough" scale={0.8} xChannelSelector="R" yChannelSelector="G"/>
        </filter>
        <filter id="specks">
          <feTurbulence type="fractalNoise" baseFrequency="0.45" numOctaves={3} seed={9} stitchTiles="stitch"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.914  0 0 0 0 0.867  0 0 0 0 0.753  0 0 0 1.1 -0.78"/>
        </filter>
        <filter id="drybrush" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.09 0.05" numOctaves={3} seed={14} result="w"/>
          <feDisplacementMap in="SourceGraphic" in2="w" scale={3} result="d"/>
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves={2} seed={21} result="r"/>
          <feDisplacementMap in="d" in2="r" scale={2.2}/>
        </filter>
      </defs>
    </svg>
  );
}

// ─── Per-tab stain configuration ──────────────────────────────────────────────
type StainConfig = { type: 'ring' | 'blot' | 'smudge' | 'thumb'; style: React.CSSProperties }[];

const TAB_STAINS: Record<BankingTab, StainConfig> = {
  deposit: [
    { type: 'smudge', style: { bottom: 120, left: 18 } },
    { type: 'thumb',  style: { bottom: 34, right: 84 } },
  ],
  withdraw: [
    { type: 'blot',   style: { top: 110, left: 26 } },
    { type: 'smudge', style: { top: 40, right: 120, transform: 'rotate(2deg)' } },
  ],
  wire: [
    { type: 'smudge', style: { top: 208, left: 30, width: 180 } },
    { type: 'blot',   style: { bottom: 90, right: 40, width: 48, height: 40 } },
    { type: 'thumb',  style: { top: 60, left: 44, transform: 'rotate(-24deg)' } },
  ],
  loan: [
    { type: 'blot',   style: { top: 64, right: 110, width: 38, height: 30 } },
    { type: 'smudge', style: { bottom: 70, left: 140 } },
    { type: 'thumb',  style: { bottom: 160, right: 30 } },
  ],
  repay: [
    { type: 'smudge', style: { bottom: 80, left: 18 } },
  ],
};

const STAIN_CLASS: Record<'ring' | 'blot' | 'smudge' | 'thumb', string> = {
  ring:   styles.stainRing,
  blot:   styles.stainBlot,
  smudge: styles.stainSmudge,
  thumb:  styles.stainThumb,
};

// ─── Root component ───────────────────────────────────────────────────────────
export default function Banking() {
  const [state, setState] = useState(bankingStore.getState());

  useEffect(() => {
    return bankingStore.subscribe(setState);
  }, []);

  const onClose = useCallback(() => {
    bankingStore.close();
  }, []);

  useEscapeKey(state.show, onClose);

  const tabs = useMemo<BankingTab[]>(() => ['deposit', 'withdraw', 'wire', 'loan', 'repay'], []);

  if (!state.show) return null;

  const currentTab = state.tab;

  const docRotate = { deposit: '0.35', withdraw: '-0.4', wire: '0.25', loan: '-0.3', repay: '0.2' };

  return (
    <div className={styles.overlay}>
      <SvgFilters />
      <div className={styles.tableWrap}>
        <header className={styles.masthead}>
          <div className={styles.mastheadEst}>{(BANK_MASTHEAD[state.bankId ?? ''] ?? DEFAULT_MASTHEAD).est}</div>
          <h1 className={styles.mastheadTitle}>{state.bankName || 'Bank'}</h1>
          <div className={styles.mastheadSub}>{(BANK_MASTHEAD[state.bankId ?? ''] ?? DEFAULT_MASTHEAD).sub}</div>
          <div className={styles.rule} />
        </header>

        <nav className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${styles.tab} ${currentTab === tab ? styles.tabActive : ''}`}
              onClick={() => bankingStore.setTab(tab)}
            >
              {TAB_LABELS[tab]}
            </button>
          ))}
        </nav>

        <div className={styles.doc} style={{ transform: `rotate(${docRotate[currentTab]}deg)` }}>
          <div className={styles.paper} />
          {TAB_STAINS[currentTab].map((s, i) => (
            <span key={i} className={`${styles.stain} ${STAIN_CLASS[s.type]}`} style={s.style} />
          ))}
          <div className={styles.wax}>{WAX_LETTER[currentTab]}</div>
          <div className={styles.docInner}>
            {currentTab === 'deposit' && <DepositPanel state={state} onClose={onClose} />}
            {currentTab === 'withdraw' && <WithdrawPanel state={state} onClose={onClose} />}
            {currentTab === 'wire' && <WirePanel state={state} onClose={onClose} />}
            {currentTab === 'loan' && <LoanPanel state={state} onClose={onClose} />}
            {currentTab === 'repay' && <RepayPanel state={state} onClose={onClose} />}
          </div>
        </div>
      </div>
    </div>
  );
}
