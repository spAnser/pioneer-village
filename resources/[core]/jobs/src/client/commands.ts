import { PVJobs } from '@lib/client';
import { emitUI } from '@lib/client/comms/ui';

const notify = (message: string, type: 'info' | 'success' | 'error' = 'success', duration = 5000): void => {
  emitUI('notification.notify', message, duration, type, false);
};

RegisterCommand(
  'clockin',
  (_source: number, args: string[]) => {
    const jobHandle = args[0];
    if (!jobHandle) {
      notify('Usage: /clockin <job_handle>', 'error');
      return;
    }
    PVJobs.clockIn(jobHandle, { x: 0, y: 0, z: 0 });
  },
  false,
);

RegisterCommand(
  'clockout',
  () => {
    PVJobs.clockOut();
  },
  false,
);

RegisterCommand(
  'jobs',
  async () => {
    try {
      const tasks = await PVJobs.getAvailableTasks();
      if (tasks && Array.isArray(tasks) && tasks.length > 0) {
        const taskList = tasks.map((task: Jobs.TaskDefinition) => task.name).join(', ');
        notify(`Available: ${taskList}`, 'info', 10000);
      } else {
        notify('No tasks available', 'info');
      }
    } catch (_error) {
      notify('Error getting jobs list', 'error');
    }
  },
  false,
);

RegisterCommand(
  'jobstatus',
  () => {
    const currentJob = PVJobs.getCurrentJob();
    if (PVJobs.isCurrentlyClocked() && currentJob) {
      notify(`Currently working: ${currentJob.name}`, 'info');
    } else {
      notify('Not currently clocked in', 'info');
    }
  },
  false,
);
