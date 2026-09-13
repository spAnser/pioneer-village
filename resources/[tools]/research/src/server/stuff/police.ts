import { PVBase, PVJobs } from '@lib/server';

import taskManager from './jobs';

// PER_TASK is what makes a task's `rewards.payment` reachable: the manager only reads it on
// completion of a PER_TASK job, and `paymentAmount` is the payout for a task that declares none.
const sheriffJob = {
  handle: 'sheriff',
  name: 'Sheriff Department',
  description: 'Maintain law and order in the town',
  paymentType: 'PER_TASK',
  paymentAmount: '10.00',
  requirements: { badge: true },
  clockInConstraints: {
    location: { x: -277.345, y: 805.225, z: 119.2, radius: 10 },
    // hours: { start: 6, end: 22 },
  },
  metadata: { department: 'law_enforcement' },
} satisfies Jobs.JobDefinition;

const patrolTask = {
  handle: 'patrol-valentine',
  name: 'Patrol Valentine',
  description: 'Walk patrol around the Valentine area',
  taskType: 'patrol',
  config: { zone: 'research_zone_valentine_0' },
  requirements: { badge: true },
  timeConstraints: {
    startHour: 8,
    endHour: 20,
  },
  repeatConfig: {
    type: 'COOLDOWN',
    cooldownMinutes: 30,
    maxPerDay: 8,
  },
} satisfies Jobs.TaskDefinition<Jobs.PatrolConfig>;

const escortTask = {
  handle: 'escort-valentine-prisoner',
  name: 'Escort Prisoner',
  description: 'Prison escort',
  taskType: 'escort',
  config: {
    startLocation: { x: 0, y: 0, z: 0 },
    endLocation: { x: 0, y: 0, z: 0 },
  },
  requirements: { badge: true },
  // An escort is worth more than a patrol, so it overrides the job's per-task amount.
  rewards: { payment: '25.00' },
  timeConstraints: {
    startHour: 8,
    endHour: 20,
  },
  repeatConfig: {
    type: 'COOLDOWN',
    cooldownMinutes: 30,
    maxPerDay: 8,
  },
} satisfies Jobs.TaskDefinition<Jobs.EscortConfig>;

// Definitions live only in socket-server memory, so every socket connection has to replay them —
// a socket server that restarts under a running game server otherwise comes back with no jobs.
// The job has to land before its tasks — a task for an unregistered job is rejected.
const registerJobAndTasks = async (): Promise<void> => {
  await PVJobs.registerJob(sheriffJob);
  await PVJobs.registerTask('sheriff', patrolTask);
  await PVJobs.registerTask('sheriff', escortTask);
};

on('socket.connected', registerJobAndTasks);

if (PVBase.socketConnected()) {
  void registerJobAndTasks();
}

onNet('research:jobs:task', () => {
  console.log('research:jobs:task event received');

  taskManager.startTask(source);
});
