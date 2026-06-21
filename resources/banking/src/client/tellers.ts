import { PedManager, PVTarget, type PedReactionConfig } from '@lib/client';
import BankData from '../shared/data/bankData';
import bankController from './controllers/bank-controller';

const tellerManager = PedManager.getInstance();

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
  const bank = BankData.find((b) => b.identifier === bankId);
  if (!bank) return;

  const ped = await tellerManager.spawn(tellerTargetId(bankId), {
    model: bank.tellerModel,
    position: bank.tellerPosition,
    freeze: true,
    invincible: true,
    blockEvents: true,
    missionEntity: true,
    // Ambient speech fires on a random interval independently of the routine.
    speech: {
      ref: '0822_S_M_M_BANKCLERK_01_WHITE_01',
      names: ['HOWS_IT_GOING', 'WELCOME'],
      params: 'speech_params_standard',
      intervalMs: [15_000, 45_000],
    },
    // Routine loops through all step types as a demonstration:
    //   scenario — teller works at the counter
    //   anim     — glances down at paperwork
    //   speech   — one-shot voiced line mid-routine
    //   wait     — brief pause before the next cycle
    routine: [
      { type: 'scenario', name: 'WORLD_HUMAN_VAL_BANKTELLER', duration: 10_000 },
      { type: 'anim',     dict: 'script_common@jail_cell@unlock@key', anim: 'action_mp_female', duration: 2_000 },
      { type: 'speech',   ref: '0822_S_M_M_BANKCLERK_01_WHITE_01', name: 'UNAUTHORIZED_AREA', params: 'speech_params_force' },
      { type: 'wait',     ms: 30_000 },
    ],
    reactions: [
      // Teller reacts when they personally are attacked.
      {
        event: 'EVENT_ENTITY_DAMAGED',
        entityField: 'attacked',
        cooldownMs: 8_000,
        lines: [
          { ref: '0822_S_M_M_BANKCLERK_01_WHITE_01', name: 'GENERIC_FRIGHTENED_HIGH', params: 'speech_params_force' },
          { ref: '0822_S_M_M_BANKCLERK_01_WHITE_01', name: 'LAW_THREAT',  params: 'speech_params_force' },
        ],
      },
      // Teller reacts to any violence happening nearby (any entity damaged).
      {
        event: 'EVENT_SHOT_FIRED_BULLET_IMPACT',
        cooldownMs: 15_000,
        lines: [
          { ref: '0822_S_M_M_BANKCLERK_01_WHITE_01', name: 'GET_AWAY_FROM_ME', params: 'speech_params_force_shouted' },
          { ref: '0822_S_M_M_BANKCLERK_01_WHITE_01', name: 'GENERIC_SHOCKED_MED',  params: 'speech_params_force_shouted' },
        ],
        onReact: (pedHandle, data) => {
          // e.g. trigger a flee animation, send a server event, update UI, etc.
          console.log(`[Banking] teller ${pedHandle} was hit:`, data);
        },
      },
    ] satisfies PedReactionConfig[],
  });

  if (!ped) return;

  registerTellerTarget(bankId);
  console.log(`[Banking] Spawned local teller for ${bankId} (ped: ${ped})`);
};

export const despawnTeller = (bankId: Bank.Id): void => {
  PVTarget.RemoveTarget(tellerTargetId(bankId));
  tellerManager.despawn(bankId);
  console.log(`[Banking] Despawned local teller for ${bankId}`);
};

export const despawnTellers = (): void => {
  for (const bankId of BankData.map((b) => b.identifier)) {
    if (tellerManager.getPed(bankId)) {
      PVTarget.RemoveTarget(tellerTargetId(bankId));
    }
  }
  tellerManager.despawnAll();
};

export const pauseTellerRoutine = (bankId: Bank.Id): void => tellerManager.pauseRoutine(bankId);
export const resumeTellerRoutine = (bankId: Bank.Id): void => tellerManager.resumeRoutine(bankId);
