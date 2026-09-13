import { PVGame, exports, onResourceInit } from '@lib/client';
import { awaitUI, emitUI, onUI } from '@lib/client/comms/ui';

type NotifyType = 'info' | 'success' | 'error';

/** The notification layer maps these names to theme vars; anything else reaches the DOM as raw CSS. */
const notifyColors: Record<NotifyType, string> = {
  success: 'green',
  error: 'red',
  info: 'blue',
};

const TRANSPORT_ERROR = 'Could not reach the job server';

export const notify = (message: string, type: NotifyType = 'info', duration = 5000): void => {
  emitUI('notification.notify', message, duration, notifyColors[type], 'white', false);
};

/** Clock results carry their own failure text; success is announced by the clock-in/out broadcasts. */
export const notifyClockFailure = (result: Jobs.ClockResult, fallback: string): void => {
  if (!result.success) {
    notify(result.error ?? fallback, 'error');
  }
};

let currentJob: Jobs.JobDefinition | null = null;
let isClocked = false;

const refreshState: Jobs.ClientExports['refreshState'] = async () => {
  try {
    const state = await awaitUI('jobs.get-state');
    if (!state || state.error) {
      return;
    }
    currentJob = state.currentJob;
    isClocked = state.isClocked;
  } catch (_error) {
    // Keep the last known state; the next lifecycle event refreshes again.
  }
};

/** 0 is a real character id in no context, so a missing id must never be coerced into one. */
const isLocalCharacter = (characterId: number): boolean => {
  const id = PVGame.characterId();
  return id !== null && id === characterId;
};

onNet('game:character-selected', () => {
  refreshState();
});

onResourceInit('game', () => {
  // Restarting jobs mid-session never re-fires game:character-selected.
  if (PVGame.characterId() !== null) {
    refreshState();
  }
});

onUI('jobs.clock-in-update', (characterId, jobHandle) => {
  if (!isLocalCharacter(characterId)) {
    return;
  }
  refreshState();
  notify(`Clocked in to ${jobHandle}`, 'success');
});

onUI('jobs.clock-out-update', (characterId, jobHandle, hoursWorked) => {
  if (!isLocalCharacter(characterId)) {
    return;
  }
  refreshState();
  notify(`Clocked out of ${jobHandle} after ${hoursWorked.toFixed(2)} hours`, 'success');
});

// Accepting a task assigns and starts it in one step, so both broadcasts arrive for an
// instance that is already running. Only a still-assigned instance has news the following
// started toast will not carry, so anything further along is left to that handler.
onUI('jobs.task-assigned', (characterId, instance) => {
  if (!isLocalCharacter(characterId) || instance.status !== 'ASSIGNED') {
    return;
  }
  notify(`Task assigned: ${instance.taskHandle}`, 'info');
});

onUI('jobs.task-started', (characterId, instance) => {
  if (!isLocalCharacter(characterId)) {
    return;
  }
  notify(`Task started: ${instance.taskHandle}`, 'info');
});

onUI('jobs.task-completed', (characterId, instance) => {
  if (!isLocalCharacter(characterId)) {
    return;
  }
  notify(`Task complete: ${instance.taskHandle}`, 'success');
});

onUI('jobs.task-failed', (characterId, instance, reason) => {
  if (!isLocalCharacter(characterId)) {
    return;
  }
  notify(`Task failed: ${instance.taskHandle} — ${reason}`, 'error');
});

// Money is announced only here, so clock-out and task completion never restate the same payout.
onUI('jobs.payment-processed', (characterId, amount, reason) => {
  if (!isLocalCharacter(characterId)) {
    return;
  }
  notify(`$${amount.toFixed(2)} — ${reason}`, 'success');
});

const clockIn: Jobs.ClientExports['clockIn'] = async (jobHandle) => {
  try {
    return await awaitUI('jobs.clock-in', jobHandle, PVGame.playerCoords(true));
  } catch (_error) {
    return { success: false, error: TRANSPORT_ERROR };
  }
};

const clockOut: Jobs.ClientExports['clockOut'] = async () => {
  try {
    return await awaitUI('jobs.clock-out');
  } catch (_error) {
    return { success: false, error: TRANSPORT_ERROR };
  }
};

const getCurrentJob: Jobs.ClientExports['getCurrentJob'] = () => currentJob;

const isCurrentlyClocked: Jobs.ClientExports['isCurrentlyClocked'] = () => isClocked;

const getAvailableTasks: Jobs.ClientExports['getAvailableTasks'] = async (jobHandle) => {
  try {
    return await awaitUI('jobs.get-available-tasks', jobHandle);
  } catch (_error) {
    return [];
  }
};

const canStartTask: Jobs.ClientExports['canStartTask'] = async (jobHandle, taskHandle) => {
  try {
    return await awaitUI('jobs.can-start-task', jobHandle, taskHandle);
  } catch (_error) {
    return { canStart: false, reason: TRANSPORT_ERROR };
  }
};

const acceptTask: Jobs.ClientExports['acceptTask'] = async (jobHandle, taskHandle) => {
  try {
    return await awaitUI('jobs.accept-task', jobHandle, taskHandle);
  } catch (_error) {
    return null;
  }
};

const startTask: Jobs.ClientExports['startTask'] = async (instanceId) => {
  try {
    return await awaitUI('jobs.start-task', instanceId);
  } catch (_error) {
    return null;
  }
};

const updateTaskProgress: Jobs.ClientExports['updateTaskProgress'] = async (instanceId, progress) => {
  try {
    return await awaitUI('jobs.update-task-progress', instanceId, progress);
  } catch (_error) {
    return null;
  }
};

const completeTask: Jobs.ClientExports['completeTask'] = async (instanceId) => {
  try {
    return await awaitUI('jobs.complete-task', instanceId);
  } catch (_error) {
    return { success: false, error: TRANSPORT_ERROR };
  }
};

const failTask: Jobs.ClientExports['failTask'] = async (instanceId, reason) => {
  try {
    return await awaitUI('jobs.fail-task', instanceId, reason ?? 'Unspecified');
  } catch (_error) {
    return false;
  }
};

const getActiveTasks: Jobs.ClientExports['getActiveTasks'] = async () => {
  try {
    return await awaitUI('jobs.get-active-tasks');
  } catch (_error) {
    return [];
  }
};

const getPaySlips: Jobs.ClientExports['getPaySlips'] = async () => {
  try {
    return await awaitUI('jobs.get-pay-slips');
  } catch (_error) {
    return [];
  }
};

const redeemPaySlip: Jobs.ClientExports['redeemPaySlip'] = async (paySlipId) => {
  try {
    return await awaitUI('jobs.redeem-pay-slip', paySlipId);
  } catch (_error) {
    return false;
  }
};

exports<'jobs'>('clockIn', clockIn);
exports<'jobs'>('clockOut', clockOut);
exports<'jobs'>('getCurrentJob', getCurrentJob);
exports<'jobs'>('isCurrentlyClocked', isCurrentlyClocked);
exports<'jobs'>('refreshState', refreshState);
exports<'jobs'>('getAvailableTasks', getAvailableTasks);
exports<'jobs'>('canStartTask', canStartTask);
exports<'jobs'>('acceptTask', acceptTask);
exports<'jobs'>('startTask', startTask);
exports<'jobs'>('updateTaskProgress', updateTaskProgress);
exports<'jobs'>('completeTask', completeTask);
exports<'jobs'>('failTask', failTask);
exports<'jobs'>('getActiveTasks', getActiveTasks);
exports<'jobs'>('getPaySlips', getPaySlips);
exports<'jobs'>('redeemPaySlip', redeemPaySlip);
