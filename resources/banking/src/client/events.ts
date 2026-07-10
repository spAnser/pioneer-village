import { PVBase, PVGame, PedManager } from '@lib/client';
import { emitUI, emitUINotify, focusUI } from '@lib/client/comms/ui';

import BankData from '../shared/data/bankData';
import bankController from './controllers/bank-controller';
import { Delay } from '@lib/functions';
import { Vector3 } from '@lib/math';

// Open the banking UI focused on a specific tab and populate live data
async function openBankingUI(
  tab: 'deposit' | 'withdraw' | 'wire' | 'loan' | 'repay' | 'safetybox',
  bankId?: Bank.Id,
  safetyBox?: BankSafetyBox.Data | null,
) {
  const resolvedBankId = bankId ?? bankController.currentBank;
  if (!resolvedBankId) return;

  const characterId = PVGame.characterId();
  const character = PVGame.getCurrentCharacter();
  const bankData = BankData.find((b) => b.identifier === resolvedBankId);
  const [loans, , cashOnPerson] = await Promise.all([
    bankController.getLoans(characterId),
    bankController.loadAccounts(characterId),
    bankController.getCashOnHand(characterId),
  ]);
  const account = bankController.getAccount(resolvedBankId);

  emitUI('banking.open', {
    tab,
    bankId: resolvedBankId,
    bankName: bankData?.name ?? resolvedBankId,
    characterId,
    characterName: character ? `${character.firstName} ${character.lastName}` : 'Unknown',
    cashOnPerson,
    currentBalance: account?.balance ?? 0,
    loans,
    safetyBox: safetyBox ?? null,
  });

  focusUI(true, true);
}

on('banking:client:deposit', async (_entity: number, pArgs: Record<string, any>) => {
  await openBankingUI('deposit', pArgs?.bankId);
});

on('banking:client:withdraw', async (_entity: number, pArgs: Record<string, any>) => {
  await openBankingUI('withdraw', pArgs?.bankId);
});

on('banking:client:wire', async (_entity: number, pArgs: Record<string, any>) => {
  await openBankingUI('wire', pArgs?.bankId);
});

on('banking:client:loan', async (_entity: number, pArgs: Record<string, any>) => {
  await openBankingUI('loan', pArgs?.bankId);
});

on('banking:client:repay-loan', async (_entity: number, pArgs: Record<string, any>) => {
  await openBankingUI('repay', pArgs?.bankId);
});

on('banking:client:collect-transfers', async (_entity: number, pArgs: Record<string, any>) => {
  const bankId = pArgs?.bankId ?? bankController.currentBank;
  if (!bankId) return;

  const characterId = PVGame.characterId();
  const result = await bankController.collectTransfers(characterId);
  const pm = PedManager.getInstance();

  if (result.collected > 0) {
    const account = bankController.getAccount(bankId);
    emitUI('banking.update-balance', { balance: account?.balance ?? 0 });
    console.log(`[Banking] Collected ${result.collected} transfer(s) totalling $${result.total}`);
    emitUINotify(`Collected ${result.collected} transfer(s) totalling $${result.total}`, 'success');
    pm.playSpeech(`banking::teller_${bankId}`, {
      ref: '0822_S_M_M_BANKCLERK_01_WHITE_01',
      names: ["COME_SEE_THIS"],
      params: 'speech_params_force',
      intervalMs: [0, 0],
    });
  } else {
    console.log('[Banking] No pending transfers ready to collect.');
    emitUINotify('No pending transfers ready to collect.', 'info');
    pm.playSpeech(`banking::teller_${bankId}`, {
      // ref: '0822_S_M_M_BANKCLERK_01_WHITE_01',
      // names: ['NO_IDEA'],
      // names: ['HAND_OVER_MONEY'],
      ref:'0083_U_M_O_BLWGENERALSTOREOWNER_01',
      names: ['REFUSE_OFFER', 'FAREWELL_NO_SALE'],
      params: 'speech_params_force',
      intervalMs: [0, 0],
    });
  }
});

on('banking:client:bank-info', async (_entity: number, pArgs: Record<string, any>) => {
  const bankId = pArgs?.bankId ?? bankController.currentBank;
  if (!bankId) return;

  const info = await bankController.getBankInfo(bankId);
  if (!info) {
    console.log('[Banking] Could not retrieve bank info.');
    emitUINotify('Could not retrieve bank info.', 'error');
    return;
  }

  const bankName = BankData.find((b) => b.identifier === bankId)?.name ?? bankId;
  console.log(
    `[Banking] ${bankName} — Reputation: ${info.reputationScore}/100 | Interest Rate: ${(info.interestRate * 100).toFixed(3)}% | Vault: $${info.vaultBalance.toFixed(2)}`,
  );
});




// TODO: Move elsewhere - TEST ANIMATION (blackwater) FOR TELLER RETRIEVING MONEY FROM VAULT
on('banking:client:test', async (_entity: number, pArgs: Record<string, any>) => {
  console.log(`[Banking] Test animation event triggered with args: ${JSON.stringify(pArgs)}`);
  const bankId = pArgs?.bankId ?? bankController.currentBank;
  if (!bankId) return;
  console.log(`[Banking] Current bank ID: ${bankId}`);

  const pm = PedManager.getInstance();

  const pedId = `banking::teller_${bankId}`;
  const pHandle = pm.getPed(pedId);
  if (!pHandle) return;
  console.log(`[Banking] Found ped handle for ${pedId}: ${pHandle}`);

  pm.pauseRoutine(pedId);

  if (IsEntityPlayingAnyAnim(pHandle, 0)) {
    console.log(`[Banking] Ped ${pedId} is currently playing an animation. Stopping it.`);
    ClearPedTasks(pHandle);
    StopEntityAnim(pHandle, 0)
  } else {
    console.log(`[Banking] Ped ${pedId} is not playing any animation.`);
  }

  await PVGame.loadAnimDict('script_proc@robberies@bank@valbank_counter');
  TaskPlayAnim(
    pHandle,
    'script_proc@robberies@bank@valbank_counter',
    'exit_counter180',
    8.0,
    8.0,
    -1,
    0,
    0,
    false,
    false,
    false,
  );

  console.log(`[Banking] Moving ped ${pedId} to a temporary position for testing.`);

  const cc = Vector3.fromArray([-812.276917, -1273.191895, 43.63772]);
  TaskFollowNavMeshToCoord(pHandle, cc.x, cc.y, cc.z, 1.5, -1, 0.0, 0, 355.55);

  // Note: This should be something like PVGame.pedReachedCoords(pHandle, cc, 0.0), current func assumes ped is player...
  await new Promise<void>((resolve) => {
    const interval = setInterval(() => {
      const coords = Vector3.fromArray(GetEntityCoords(pHandle, false));
      if (coords.getDistance(cc) <= 0.5) {
        clearInterval(interval);
        resolve();
      }
    }, 100);
    setTimeout(() => {
      clearInterval(interval);
      resolve();
    }, 10000);
  });

  await Delay(5_000); // Wait a moment, maybe do some cabinet animation or something here to make it look like the teller is interacting with the vault. 

  const c = BankData.find((b) => b.identifier === bankId);
  if (!c) return;

  console.log(`[Banking] Moving ped ${pedId} to teller position: x=${c.tellerPosition.x}, y=${c.tellerPosition.y}, z=${c.tellerPosition.z}`);

  const xx = Vector3.fromObject(c.tellerPosition);
  // Note: TaskGotoCoordAnyMeans doesn't return ped to the exact position its best-effort, use navmesh instead as it works better for this case.
  TaskFollowNavMeshToCoord(pHandle, xx.x, xx.y, xx.z, 1.5, -1, 0.0, 0, c.tellerPosition.w);

  await new Promise<void>((resolve) => {
    const interval = setInterval(() => {
      const coords = Vector3.fromArray(GetEntityCoords(pHandle, false));
      if (coords.getDistance(xx) <= 0.5) {
        clearInterval(interval);
        resolve();
      }
    }, 100);
    setTimeout(() => {
      clearInterval(interval);
      resolve();
    }, 10000);
  });

  pm.resumeRoutineFromStart(pedId);
});
