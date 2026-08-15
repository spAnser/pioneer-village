import { PVJobs, emitUI, focusUI, onUI } from '@lib/client';

on('jobs:client:clock-in', async (type: string, data: { jobHandle: string }) => {
  console.log('Clocking in', type, data);

  const tasks = await PVJobs.clockIn(data.jobHandle);

  console.log('tasks', tasks);
});

on('jobs:client:tasks', async (type: string, data: { jobHandle: string }) => {
  console.log('Tasks', type, data);

  const tasks = await PVJobs.getAvailableTasks(data.jobHandle);

  console.log(`Available tasks for ${data.jobHandle}:`, JSON.stringify(tasks, null, 2));

  const actions: Target.Item[] = [];

  for (const task of tasks) {
    actions.push({
      id: 'jobs:client:task:accept',
      label: `${task.name}`,
      icon: 'fa-solid fa-briefcase',
      event: 'jobs:client:task:accept',
      parameters: { jobHandle: data.jobHandle, taskHandle: task.handle },
    });
  }

  emitUI('target.state', {
    show: false,
    context: 'point',
    actions,
  });
  focusUI(true, true);
});

on('jobs:client:task:accept', async (type: string, data: { jobHandle: string; taskHandle: string }) => {
  console.log('Accepting task', data);

  // PVJobs.acceptTask(data.jobHandle, data.taskHandle)
});

on('jobs:client:clock-out', (type: string, data: { jobHandle: string }) => {
  console.log('Clocking out', type, data);

  PVJobs.clockOut();
});
