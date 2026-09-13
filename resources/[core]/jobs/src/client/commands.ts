import { PVJobs, emitUI, focusUI } from '@lib/client';

import { notify, notifyClockFailure } from './exports';

RegisterCommand(
  'clockin',
  async (_source: number, args: string[]): Promise<void> => {
    const jobHandle = args[0];
    if (!jobHandle) {
      notify('Usage: /clockin <job-handle>', 'error');
      return;
    }
    notifyClockFailure(await PVJobs.clockIn(jobHandle), 'Failed to clock in');
  },
  false,
);

RegisterCommand(
  'clockout',
  async (): Promise<void> => {
    notifyClockFailure(await PVJobs.clockOut(), 'Failed to clock out');
  },
  false,
);

RegisterCommand(
  'jobs',
  async (): Promise<void> => {
    const currentJob = PVJobs.getCurrentJob();
    if (!currentJob) {
      notify('Not currently clocked in', 'info');
      return;
    }

    const tasks = await PVJobs.getAvailableTasks(currentJob.handle);
    if (tasks.length === 0) {
      notify(`No tasks available for ${currentJob.name}`, 'info');
      return;
    }

    // getAvailableTasks is already gated on canStartTask server-side, so every task here is startable.
    notify(tasks.map((task) => task.name).join(', '), 'info', 10000);
  },
  false,
);

// The panel already renders shift status, available jobs, active tasks and a clock-out button,
// so it is the richer form of what this command reported as a toast. Focus is released by the
// panel's own escape handler, which emits nui.close.
RegisterCommand(
  'jobstatus',
  (): void => {
    emitUI('jobs.show');
    focusUI(true, true);
  },
  false,
);
