import { PVGame, PVTarget } from '@lib/client';
import { SET_ENTITY_CAN_BE_TARGETED_WITHOUT_LOS } from '@lib/shared/named_hashes';

import BankData from '../shared/data/bankData';
import bankController from './controllers/bank-controller';

export const tellerPeds: Map<Bank.Id, number> = new Map();

const applyTellerBehaviour = (ped: number): void => {
  SetEntityInvincible(ped, true);
  FreezeEntityPosition(ped, true);
  SetBlockingOfNonTemporaryEvents(ped, true);
  SetPedFleeAttributes(ped, 0, false);
  SetPedCombatAttributes(ped, 17, true);
  SetEntityAsMissionEntity(ped, true, true);
  SetPedConfigFlag(ped, 276, true); // TargettableWithNoLos
  Citizen.invokeNative(SET_ENTITY_CAN_BE_TARGETED_WITHOUT_LOS, ped, true);
  
  TaskStartScenarioInPlace(ped, 'WORLD_HUMAN_STAND_IMPATIENT', 0, true, false, 0, -1.0, false);
};

const tellerTargetId = (bankId: Bank.Id) => `banking::teller_${bankId}`;

const registerTellerTarget = (bankId: Bank.Id, ped: number): void => {
  PVTarget.AddTarget({
    id: tellerTargetId(bankId),
    // type: 'model',
    // group: ['s_m_m_bankclerk_01'],
    type: 'entity',
    group: [ped],
    data: [
      { id: `banking::deposit_${bankId}`,      label: 'Banking',           icon: 'coins',                   event: 'banking:client:deposit',           parameters: { bankId } },
      // { id: `banking::withdraw_${bankId}`,     label: 'Withdraw',          icon: 'wallet',                  event: 'banking:client:withdraw',          parameters: { bankId } },
      // { id: `banking::wire_${bankId}`,         label: 'Wire Transfer',     icon: 'arrow-right-arrow-left',  event: 'banking:client:wire',              parameters: { bankId } },
      { id: `banking::collect_${bankId}`,      label: 'Collect Transfers', icon: 'inbox',                   event: 'banking:client:collect-transfers', parameters: { bankId } },
      // { id: `banking::loan_${bankId}`,         label: 'Request Loan',      icon: 'handshake',               event: 'banking:client:loan',              parameters: { bankId } },
      // { id: `banking::repay_${bankId}`,        label: 'Repay Loan',        icon: 'money-bill',              event: 'banking:client:repay-loan',        parameters: { bankId } },
      { id: `banking::safetybox_${bankId}`,    label: 'Safety Box',        icon: 'vault',                   event: 'banking:client:safety-box',        parameters: { bankId } },
      // { id: `banking::info_${bankId}`,         label: 'Bank Info',         icon: 'info',                    event: 'banking:client:bank-info',         parameters: { bankId } },
      { id: `banking::sellminerals_${bankId}`, label: 'Sell Minerals',     icon: 'gem',                     event: 'banking:client:sell-minerals',     parameters: { bankId } },
    ],
    options: {
      distance: 14.0,
      losCheck: false,
      throttle: 1_000,
      isEnabled() {
        return bankController.currentBank === bankId;
      },
    },
  });
};

export const spawnTeller = async (bankId: Bank.Id): Promise<void> => {
  if (tellerPeds.has(bankId)) return;

  const bank = BankData.find((b) => b.identifier === bankId);
  if (!bank) return;

  const { x, y, z, w } = bank.tellerPosition;
  const ped = await PVGame.createPed(bank.tellerModel, x, y, z, w, true, false);
  if (!ped || !DoesEntityExist(ped)) {
    console.warn(`[Banking] Failed to spawn teller for ${bankId}`);
    return;
  }

  applyTellerBehaviour(ped);
  tellerPeds.set(bankId, ped);
  registerTellerTarget(bankId, ped);
  console.log(`[Banking] Spawned local teller for ${bankId} (ped: ${ped})`);
};

export const despawnTeller = (bankId: Bank.Id): void => {
  const ped = tellerPeds.get(bankId);
  if (!ped) return;

  PVTarget.RemoveTarget(tellerTargetId(bankId));

  if (DoesEntityExist(ped)) {
    SetEntityAsMissionEntity(ped, false, true);
    DeletePed(ped);
  }
  tellerPeds.delete(bankId);
  console.log(`[Banking] Despawned local teller for ${bankId}`);
};

export const despawnTellers = (): void => {
  for (const [bankId] of tellerPeds) {
    despawnTeller(bankId);
  }
};
