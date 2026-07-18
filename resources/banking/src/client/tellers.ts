import { PedManager, PVTarget, PVDoors, type PedReactionConfig } from '@lib/client';
import BankData from '../shared/data/bankData';
import bankController from './controllers/bank-controller';
import { Vector3 } from '@lib/math';

const tellerManager = PedManager.getInstance();

const tellerTargetId = (bankId: Bank.Id) => `banking::teller_${bankId}`;

const registerTellerTarget = (bankId: Bank.Id, ped: Ped): void => {
  const bank = BankData.find((b) => b.identifier === bankId);
  if (!bank) return;
  if (!ped) return;

  const { x, y, z } = bank.tellerPosition;

  PVTarget.AddTarget({
    id: tellerTargetId(bankId),
    type: 'point',
    group: [{ x, y, z: z + 1.3 }],
    data: [
      { id: `banking::deposit_${bankId}`,      label: 'Banking',           icon: 'coins', event: 'banking:client:deposit',           parameters: { bankId } },
      { id: `banking::collect_${bankId}`,      label: 'Collect Transfers', icon: 'inbox', event: 'banking:client:collect-transfers', parameters: { bankId } },
      { id: `banking::sellminerals_${bankId}`, label: 'Sell Minerals',     icon: 'gem',   event: 'banking:client:sell-minerals',     parameters: { bankId } },
      // disable the example movement/sequence routine in BlackWater
      // { id: `banking::testanim_${bankId}`,     label: 'test anim',         icon: 'coins', event: 'banking:client:test',              parameters: { bankId } }
    ],
    options: {
      distance: 2.5,
      losCheck: false,
      throttle: 1_000,
      screenThreshold: 0.12,
      isEnabled() {
        if (bankController.currentBank === bankId) {
          // TODO: Only allow interaction if the bank is open, maybe it gets closed after robbery?
          // if (bankController.isBankOpen) {
          //   return true;
          // }

          // Only allow interaction if the Ped is within 1 meter of the teller position
          // This is needed as we use a point target instead of an entity target, so we need
          // to disable the point target when the teller Ped is not in their default position.
          // They move away from it due to animations that don't end at the same position
          // where they started, or if some movement sequence was performed??
          const pedPos = Vector3.fromArray(GetEntityCoords(ped, true));
          if (pedPos.getDistance(Vector3.fromObject(bank.tellerPosition)) < 2.0) {
            return true;
          }
        }
        return false;
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
    freeze: false,
    invincible: true,
    blockEvents: false,
    missionEntity: false,
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
      // { type: 'scenario', name: 'WORLD_HUMAN_VAL_BANKTELLER', duration: 10_000 },
      { type: 'anim',     dict: 'script_proc@robberies@bank@valbank_counter', anim: 'counter_loop', duration: 15_000, flags: 1 },
      
      // Note: Disabled for now, as these animations cause the ped to slowly drift from there original position/
      // will need to create some sort of re-centering routine type to ensure npc stays at desired location over time.
      // { type: 'anim',     dict: 'script_proc@robberies@bank@valbank_counter', anim: 'enter_counter', duration: 3_000, flags: 1 },
      // { type: 'anim',     dict: 'script_proc@robberies@bank@valbank_counter', anim: 'idle_c', duration: 15_000, flags: 1 },
      // { type: 'anim',     dict: 'script_proc@robberies@bank@valbank_counter', anim: 'idle_b', duration: 15_000, flags: 1 },
      // { type: 'anim',     dict: 'script_proc@robberies@bank@valbank_counter', anim: 'idle_a', duration: 15_000, flags: 1 },
      // { type: 'anim',     dict: 'script_proc@robberies@bank@valbank_counter', anim: 'exit_counter', duration: 1_200, flags: 1 },
      // { type: 'speech',   ref: '0822_S_M_M_BANKCLERK_01_WHITE_01', name: 'UNAUTHORIZED_AREA', params: 'speech_params_force' },
      // { type: 'wait',     ms: 30_000 },
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

  // 1	bullet proof
  // 2	flame proof
  // 4	explosion proof
  // 8	collision proof
  // 16	melee proof
  // 32	steam proof
  // 64	smoke proof
  // 128	headshots proof
  // 256	projectile proof
  // https://github.com/femga/rdr3_discoveries/blob/master/AI/ENTITY_PROOFS/README.md
  SetEntityProofs(ped, 1 + 2 + 4 + 16 + 32 + 64 + 128 + 256, false);

  registerTellerTarget(bankId, ped);
  console.log(`[Banking] Spawned local teller for ${bankId} (ped: ${ped})`);
};

export const despawnTeller = (bankId: Bank.Id): void => {
  PVTarget.RemoveTarget(tellerTargetId(bankId));
  console.log(`[Banking] Removed target for teller ${bankId}`);
  tellerManager.despawn(tellerTargetId(bankId));
  console.log(`[Banking] Despawned local teller for ${bankId}`);
};

export const despawnTellers = (): void => {
  for (const bankId of BankData.map((b) => b.identifier)) {
    if (tellerManager.getPed(tellerTargetId(bankId))) {
      PVTarget.RemoveTarget(tellerTargetId(bankId));
      console.log(`[Banking] Removed target for teller ${bankId}`);
    }
  }
  tellerManager.despawnAll();
};

export const pauseTellerRoutine = (bankId: Bank.Id): void => tellerManager.pauseRoutine(bankId);
export const resumeTellerRoutine = (bankId: Bank.Id): void => tellerManager.resumeRoutine(bankId);

// TODO: hook this up with secureDoorHashes, so NPC can react to players trying to lockpick doors or something like that?
// PVDoors.onDoorHook(`banking::teller12345`,'onLockpick', 2117902999, (doorHash) => {
//   // const bank = BankData.find((b) => b.doorHash === doorHash);
//   // if (!bank) return;
//   console.log(`[Banking] Bank door lockpick attempt detected (doorHash: ${doorHash})`);
//   const bankId = bankController.currentBank;
//   if (!bankId) return;

//   console.log('[Banking] Bank door interacted with, triggering teller speech reaction');
//   tellerManager.playSpeech(`banking::teller_${bankId}`, {
//     // ref: '0822_S_M_M_BANKCLERK_01_WHITE_01',
//     // names: ['NO_IDEA'],
//     // names: ['HAND_OVER_MONEY'],
//     ref:'0083_U_M_O_BLWGENERALSTOREOWNER_01',
//     names: ['LOCKDOWN_BANK', 'LAW_THREAT', 'STOP_THAT'],
//     params: 'speech_params_force',
//     intervalMs: [0, 0],
//   });
// })
