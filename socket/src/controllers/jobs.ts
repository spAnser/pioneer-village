import { eq } from 'drizzle-orm';

import { db } from '../db/connection';
import { JobsSchema } from '../db/schema';
import { logInfoC, logInfoS } from '../helpers';
import jobSystemManager from '../managers/jobs';
import { serverNamespace, userNamespace } from '../server';

export default () => {
  jobSystemManager.restoreState();

  serverNamespace.on('connection', (socket) => {
    logInfoS('[Jobs]', 'Game server connected');

    socket.on('jobs.register-job', async (jobData: Jobs.JobDefinition, cb = () => {}) => {
      logInfoS('[Jobs]', 'registerJob', jobData.handle, jobData.name);

      try {
        // Upsert DB row for FK references only — config source of truth is jobData
        const existingJobs = await db.select().from(JobsSchema).where(eq(JobsSchema.handle, jobData.handle));

        let dbId: number;
        if (existingJobs.length > 0) {
          dbId = existingJobs[0].id;
          await db
            .update(JobsSchema)
            .set({ name: jobData.name, updatedAt: new Date() })
            .where(eq(JobsSchema.handle, jobData.handle));
        } else {
          const [newJob] = await db
            .insert(JobsSchema)
            .values({ handle: jobData.handle, name: jobData.name })
            .returning();
          dbId = newJob.id;
        }

        const success = jobSystemManager.registerJob(jobData, dbId);
        cb(success);
      } catch (error) {
        logInfoS('[Jobs]', 'Job registration failed:', error);
        cb(false);
      }
    });

    socket.on('jobs.create-task', async (jobHandle: string, taskData: Jobs.TaskDefinition, cb = () => {}) => {
      logInfoS('[Jobs]', 'createTask', jobHandle, taskData.name);

      try {
        const task = await jobSystemManager.createTask(jobHandle, taskData);
        if (task) {
          userNamespace.emit('__client__', 'jobs.task-created', jobHandle, task);
        }
        cb(task ? true : false);
      } catch (error) {
        logInfoS('[Jobs]', 'Task creation failed:', error);
        cb(false);
      }
    });

    socket.on(
      'jobs.grant-permission',
      async (characterId: number, type: 'JOB' | 'TASK', typeId: string, grantedBy: number, cb = () => {}) => {
        logInfoS('[Jobs]', 'grantPermission', characterId, type, typeId);

        try {
          const success = await jobSystemManager.grantPermission(characterId, type, typeId, grantedBy);
          if (success) {
            userNamespace.emit('__client__', 'jobs.permission-granted', characterId, type, typeId);
          }
          cb(success);
        } catch (error) {
          logInfoS('[Jobs]', 'Permission grant failed:', error);
          cb(false);
        }
      },
    );

    socket.on(
      'jobs.revoke-permission',
      async (characterId: number, type: 'JOB' | 'TASK', typeId: string, cb = () => {}) => {
        logInfoS('[Jobs]', 'revokePermission', characterId, type, typeId);

        try {
          const success = await jobSystemManager.revokePermission(characterId, type, typeId);
          if (success) {
            userNamespace.emit('__client__', 'jobs.permission-revoked', characterId, type, typeId);
          }
          cb(success);
        } catch (error) {
          logInfoS('[Jobs]', 'Permission revoke failed:', error);
          cb(false);
        }
      },
    );
  });

  userNamespace.on('connection', (socket) => {
    logInfoC('[Jobs]', 'User connected', socket.id, socket.data);

    socket.on('jobs.get-state', (cb = () => {}) => {
      const characterId = socket.data?.character?.id;
      if (!characterId) {
        cb({
          show: false,
          isClocked: false,
          currentJob: null,
          availableJobs: [],
          clockedInEmployees: 0,
          error: 'No character data',
        });
        return;
      }

      const isClocked = jobSystemManager.isCharacterClockedIn(characterId);
      const currentJob = jobSystemManager.getCharacterJob(characterId);

      cb({
        show: false,
        isClocked,
        currentJob,
        availableJobs: jobSystemManager.getRegisteredJobs(),
        clockedInEmployees: jobSystemManager.getClockedInCount(),
      });
    });

    socket.on(
      'jobs.clock-in',
      async (jobHandle: string, location: { x: number; y: number; z: number } | undefined | null, cb = () => {}) => {
        const characterId = socket.data?.character?.id;
        if (!characterId) {
          cb({ success: false, error: 'No character data' });
          return;
        }

        logInfoC('[Jobs]', 'clockIn', characterId, jobHandle);

        const success = await jobSystemManager.clockIn(characterId, jobHandle, location || undefined);

        if (success) {
          userNamespace.emit('__client__', 'jobs.clock-in-update', characterId, jobHandle);
        }

        cb({ success, error: success ? undefined : 'Clock in failed' });
      },
    );

    socket.on('jobs.clock-out', async (cb = () => {}) => {
      const characterId = socket.data?.character?.id;
      if (!characterId) {
        cb({ success: false, error: 'No character data' });
        return;
      }

      logInfoC('[Jobs]', 'clockOut', characterId);

      const result = await jobSystemManager.clockOut(characterId);

      if (result.success && result.hoursWorked !== undefined && result.payment !== undefined) {
        userNamespace.emit('__client__', 'jobs.clock-out-update', characterId, result.hoursWorked, result.payment);
        if (result.payment > 0) {
          userNamespace.emit('__client__', 'jobs.payment-processed', characterId, result.payment, 'Hourly wages');
        }
      }

      cb(result);
    });

    socket.on('jobs.can-start-task', async (taskId: number, cb = () => {}) => {
      const characterId = socket.data?.character?.id;
      if (!characterId) {
        cb({ canStart: false, reason: 'No character data' });
        return;
      }

      const result = await jobSystemManager.canStartTask(characterId, taskId);
      cb(result);
    });

    socket.on('jobs.get-available-tasks', async (jobHandle: string | undefined, cb = () => {}) => {
      logInfoC('[Jobs]', 'getAvailableTasks', jobHandle);
      const characterId = socket.data?.character?.id;
      if (!characterId) {
        cb([]);
        return;
      }

      const tasks = await jobSystemManager.getAvailableTasks(characterId, jobHandle);
      logInfoC('[Jobs]', 'Available tasks for character', characterId, ':', tasks);
      cb(tasks);
    });

    socket.on('jobs.assign-task', async (taskId: number, cb = () => {}) => {
      const characterId = socket.data?.character?.id;
      if (!characterId) {
        cb(null);
        return;
      }

      const instance = await jobSystemManager.assignTask(characterId, taskId);
      cb(instance);
    });

    socket.on('jobs.start-task', async (jobHandle, taskHandle, cb = () => {}) => {
      const characterId = socket.data?.character?.id;
      if (!characterId) {
        cb(false);
        return;
      }

      // const success = await jobSystemManager.startTask(jobHandle, taskHandle);
      // if (success) {
      //   userNamespace.emit('__client__', 'jobs.task-started', characterId, instanceId);
      // }
      // cb(success);
      cb(false);
    });

    socket.on('jobs.complete-task', async (instanceId: number, cb = () => {}) => {
      const characterId = socket.data?.character?.id;
      if (!characterId) {
        cb({ success: false });
        return;
      }

      const result = await jobSystemManager.completeTask(instanceId);
      if (result.success) {
        userNamespace.emit('__client__', 'jobs.task-completed', characterId, instanceId, result.payment || 0);
        if (result.payment && result.payment > 0) {
          userNamespace.emit('__client__', 'jobs.payment-processed', characterId, result.payment, 'Task completion');
        }
      }
      cb(result);
    });

    socket.on('jobs.get-pay-slips', async (cb = () => {}) => {
      const characterId = socket.data?.character?.id;
      if (!characterId) {
        cb([]);
        return;
      }

      const slips = await jobSystemManager.getUnredeemedPaySlips(characterId);
      cb(slips);
    });
  });
};
