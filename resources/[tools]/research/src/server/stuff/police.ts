// Register a Sheriff job
import { PVJobs } from '@lib/server';

import taskManager from './jobs';

const sheriffJob = {
  handle: 'sheriff',
  name: 'Sheriff Department',
  description: 'Maintain law and order in the town',
  paymentType: 'HOURLY',
  paymentAmount: '25.00',
  requirements: { badge: true },
  clockInConstraints: {
    location: { x: -277.345, y: 805.225, z: 119.2, radius: 10 },
    // hours: { start: 6, end: 22 },
  },
  metadata: { department: 'law_enforcement' },
} satisfies Jobs.JobDefinition;

// Create a patrol task
const patrolTask = {
  handle: 'patrol-valentine',
  name: 'Patrol Valentine',
  description: 'Walk patrol around the Valentine area',
  taskType: 'patrol',
  requirements: { badge: true },
  rewards: { money: 10 },
  timeConstraints: {
    startHour: 8,
    endHour: 20,
  },
  repeatConfig: {
    type: 'COOLDOWN',
    cooldownMinutes: 30,
    maxPerDay: 8,
  },
  zone: 'research_zone_valentine_0',
} satisfies Jobs.TaskDefinition;

// Create a patrol task
const escortTask = {
  handle: 'escort-valentine-prisoner',
  name: 'Escort Prisoner',
  description: 'Prison escort',
  taskType: 'escort',
  requirements: { badge: true },
  rewards: { money: 10 },
  timeConstraints: {
    startHour: 8,
    endHour: 20,
  },
  repeatConfig: {
    type: 'COOLDOWN',
    cooldownMinutes: 30,
    maxPerDay: 8,
  },
  startLocation: { x: 0, y: 0, z: 0 },
  endLocation: { x: 0, y: 0, z: 0 },
} satisfies Jobs.TaskDefinition;

// Function to register job and task
const registerJobAndTask = () => {
  if (PVJobs && PVJobs.registerJob) {
    // Register the job
    PVJobs.registerJob(sheriffJob);

    // Create the task
    PVJobs.createTask('sheriff', patrolTask);
    PVJobs.createTask('sheriff', escortTask);
  } else {
    console.error('[Research] Jobs exports not available - ensure jobs resource is started before research');
  }
};

// Wait for jobs resource to be available before registering
on('onResourceStart', (resourceName: string) => {
  if (resourceName === 'jobs') {
    // Jobs resource just started, wait a moment for exports to be fully available
    setTimeout(registerJobAndTask, 100);
  }
});

// Also try to register immediately if jobs is already started
if (GetResourceState('jobs') === 'started') {
  setTimeout(registerJobAndTask, 100);
}

onNet('research:jobs:task', () => {
  console.log('research:jobs:task event received');

  taskManager.startTask(source);
});
