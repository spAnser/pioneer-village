import { PVGame, PVTarget } from '@lib/client';
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
  TaskStartScenarioInPlace(ped, 'WORLD_HUMAN_VAL_BANKTELLER', 0, true, false, 0, -1.0, false);
};

const tellerTargetId = (bankId: Bank.Id) => `banking::teller_${bankId}`;

const registerTellerTarget = (bankId: Bank.Id): void => {
  const bank = BankData.find((b) => b.identifier === bankId);
  if (!bank) return;

  const { x, y, z } = bank.tellerPosition;

  PVTarget.AddTarget({
    id: tellerTargetId(bankId),
    type: 'point',
    group: [{ x, y, z: z + 1.3 }],
    data: [
      // Note: We default banking action to be a deposit as it's the most common.
      // Players can then tab-click to switch to other actions, which is a more intuitive flow than showing all options upfront in the PVTarget menu.
      { id: `banking::deposit_${bankId}`,      label: 'Banking',           icon: 'coins', event: 'banking:client:deposit',           parameters: { bankId } },
      { id: `banking::collect_${bankId}`,      label: 'Collect Transfers', icon: 'inbox', event: 'banking:client:collect-transfers', parameters: { bankId } },
      { id: `banking::safetybox_${bankId}`,    label: 'Safety Box',        icon: 'vault', event: 'banking:client:safety-box',        parameters: { bankId } },
      { id: `banking::sellminerals_${bankId}`, label: 'Sell Minerals',     icon: 'gem',   event: 'banking:client:sell-minerals',     parameters: { bankId } },
    ],
    options: {
      distance: 2.5,
      losCheck: false,
      throttle: 1_000,
      screenThreshold: 0.12,
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
  registerTellerTarget(bankId);
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
