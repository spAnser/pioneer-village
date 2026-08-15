import { PVGame, exports } from '@lib/client';
import { awaitUI, emitUI, onUI } from '@lib/client/comms/ui';

// Module state
let currentJob: Jobs.JobDefinition | null = null;
let isClocked = false;

// Notification helper
const notify = (message: string, type: 'info' | 'success' | 'error' = 'success', duration = 5000): void => {
  const colors: Record<string, { bg: string; fg: string }> = {
    success: { bg: '#2d5a2d', fg: '#ffffff' },
    error: { bg: '#5a2d2d', fg: '#ffffff' },
    info: { bg: '#2d2d5a', fg: '#ffffff' },
  };
  const color = colors[type] || colors.info;
  emitUI('notification.notify', message, duration, color.bg, color.fg, false);
};

const getCharacterId = (): number => {
  const id = PVGame.characterId();
  return id ?? 0;
};

// Event handlers
onUI('jobs.clock-in-update', (characterId, jobHandle) => {
  if (characterId === getCharacterId()) {
    isClocked = true;
    getJobState();
    notify(`Clocked in to ${jobHandle}`, 'success');
  }
});

onUI('jobs.clock-out-update', (characterId, hoursWorked, payment) => {
  if (characterId === getCharacterId()) {
    isClocked = false;
    currentJob = null;
    notify(`Clocked out! Worked ${hoursWorked.toFixed(2)} hours. Earned $${payment.toFixed(2)}`, 'success');
  }
});

onUI('jobs.task-started', (characterId, taskId) => {
  if (characterId === getCharacterId()) {
    notify(`Started task #${taskId}`, 'info');
  }
});

onUI('jobs.task-completed', (characterId, _taskId, payment) => {
  if (characterId === getCharacterId()) {
    notify(`Task completed! Earned $${payment.toFixed(2)}`, 'success');
  }
});

onUI('jobs.payment-processed', (characterId, amount, reason) => {
  if (characterId === getCharacterId()) {
    notify(`Pay slip: $${amount.toFixed(2)} — ${reason}`, 'info');
  }
});

onUI('jobs.permission-granted', (characterId, type, typeId) => {
  if (characterId === getCharacterId()) {
    notify(`Permission granted: ${type} ${typeId}`, 'info');
  }
});

// State management
const getJobState = async (): Promise<void> => {
  try {
    const state = await awaitUI('jobs.get-state');
    if (state && !state.error) {
      currentJob = state.currentJob;
      isClocked = state.isClocked;
    }
  } catch (_error) {
    // State refresh failure is non-critical
  }
};

getJobState();

// Exported functions
const clockIn: Jobs.ClientExports['clockIn'] = async (jobHandle) => {
  try {
    const location = PVGame.playerCoords(true);
    const result = await awaitUI('jobs.clock-in', jobHandle, location);
    if (!result.success) {
      notify(`Failed to clock in: ${result.error}`, 'error');
    }
  } catch (_error) {
    notify('Failed to clock in', 'error');
  }
};

const clockOut: Jobs.ClientExports['clockOut'] = async () => {
  try {
    const result = await awaitUI('jobs.clock-out');
    if (!result.success) {
      notify(`Failed to clock out: ${result.error}`, 'error');
    }
  } catch (_error) {
    notify('Failed to clock out', 'error');
  }
};

const getCurrentJob: Jobs.ClientExports['getCurrentJob'] = () => {
  return currentJob;
};

const isCurrentlyClocked: Jobs.ClientExports['isCurrentlyClocked'] = () => {
  return isClocked;
};

const canStartTask: Jobs.ClientExports['canStartTask'] = async (taskId) => {
  try {
    return await awaitUI('jobs.can-start-task', taskId);
  } catch (_error) {
    return { canStart: false, reason: 'Error checking task availability' };
  }
};

const acceptTask: Jobs.ClientExports['acceptTask'] = async (jobHandle, taskHandle) => {
  try {
    const activeTask = await awaitUI('jobs.start-task', jobHandle, taskHandle);
    if (!activeTask) {
      notify('Failed to accept task', 'error');
    }
    return activeTask;
  } catch (_error) {
    notify('Failed to accept task', 'error');
  }

  return null;
};

const getAvailableTasks: Jobs.ClientExports['getAvailableTasks'] = async (jobHandle?) => {
  try {
    const handle = jobHandle || currentJob?.handle;
    if (!handle) return [];
    return await awaitUI('jobs.get-available-tasks', handle);
  } catch (_error) {
    return [];
  }
};

exports<'jobs'>('clockIn', clockIn);
exports<'jobs'>('clockOut', clockOut);
exports<'jobs'>('getCurrentJob', getCurrentJob);
exports<'jobs'>('isCurrentlyClocked', isCurrentlyClocked);
exports<'jobs'>('canStartTask', canStartTask);
exports<'jobs'>('acceptTask', acceptTask);
exports<'jobs'>('getAvailableTasks', getAvailableTasks);
