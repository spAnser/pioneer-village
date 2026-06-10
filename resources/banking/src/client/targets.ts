import { PVTarget, onResourceInit } from '@lib/client';

import BankData from '../shared/data/bankData';
import bankController from './controllers/bank-controller';
import { tellerPeds, tellersReady } from './tellers';

const registerTargets = async () => {
  await tellersReady;

  for (const bank of BankData) {
    const teller = tellerPeds.get(bank.identifier);
    if (!teller) {
      console.warn(`[Banking] No teller ped for ${bank.identifier} — skipping target`);
      continue;
    }

    PVTarget.AddTarget({
      id: `banking::teller_${bank.identifier}`,
      type: 'entity',
      group: [teller],
      data: [
        {
          id: `banking::deposit_${bank.identifier}`,
          label: 'Deposit',
          icon: 'coins',
          event: 'banking:client:deposit',
        },
        {
          id: `banking::withdraw_${bank.identifier}`,
          label: 'Withdraw',
          icon: 'wallet',
          event: 'banking:client:withdraw',
        },
        {
          id: `banking::wire_${bank.identifier}`,
          label: 'Wire Transfer',
          icon: 'arrow-right-arrow-left',
          event: 'banking:client:wire',
        },
        {
          id: `banking::collect_${bank.identifier}`,
          label: 'Collect Transfers',
          icon: 'inbox',
          event: 'banking:client:collect-transfers',
        },
        {
          id: `banking::loan_${bank.identifier}`,
          label: 'Request Loan',
          icon: 'handshake',
          event: 'banking:client:loan',
        },
        {
          id: `banking::repay_${bank.identifier}`,
          label: 'Repay Loan',
          icon: 'money-bill',
          event: 'banking:client:repay-loan',
        },
        {
          id: `banking::safetybox_${bank.identifier}`,
          label: 'Safety Box',
          icon: 'vault',
          event: 'banking:client:safety-box',
        },
        {
          id: `banking::info_${bank.identifier}`,
          label: 'Bank Info',
          icon: 'info',
          event: 'banking:client:bank-info',
        },
      ],
      options: {
        distance: 2.5,
        throttle: 1_000,
        isEnabled() {
          return bankController.currentBank === bank.identifier;
        },
      },
    });
  }
};

// targets must register after tellers are spawned
onResourceInit('target', registerTargets);
