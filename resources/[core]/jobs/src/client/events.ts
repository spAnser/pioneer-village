import { PVJobs, emitUI, focusUI } from '@lib/client';

import { notify, notifyClockFailure } from './exports';

on('jobs:client:clock-in', async (_context: number | string, data: { jobHandle: string }): Promise<void> => {
  notifyClockFailure(await PVJobs.clockIn(data.jobHandle), 'Failed to clock in');
});

on('jobs:client:tasks', async (_context: number | string, data: { jobHandle: string }): Promise<void> => {
  const tasks = await PVJobs.getAvailableTasks(data.jobHandle);

  if (tasks.length === 0) {
    notify('No tasks available', 'info');
    return;
  }

  const actions: Target.Item[] = tasks.map((task) => ({
    id: `jobs:task:${data.jobHandle}:${task.handle}`,
    label: task.name,
    icon: 'fa-solid fa-briefcase',
    event: 'jobs:client:task:accept',
    parameters: { jobHandle: data.jobHandle, taskHandle: task.handle },
  }));

  // The target resource exports only AddTarget/RemoveTarget for statically registered menus; its own
  // handler opens computed submenus this same way (target/client/handler.lua:554).
  emitUI('target.state', {
    show: false,
    context: 'point',
    actions,
  });
  focusUI(true, true);
});

on(
  'jobs:client:task:accept',
  async (_context: number | string, data: { jobHandle: string; taskHandle: string }): Promise<void> => {
    const instance = await PVJobs.acceptTask(data.jobHandle, data.taskHandle);
    if (instance) {
      // Success is announced by the jobs.task-started broadcast.
      return;
    }

    const availability = await PVJobs.canStartTask(data.jobHandle, data.taskHandle);
    notify(availability.reason ?? `Could not accept ${data.taskHandle}`, 'error');
  },
);

on('jobs:client:clock-out', async (): Promise<void> => {
  notifyClockFailure(await PVJobs.clockOut(), 'Failed to clock out');
});
