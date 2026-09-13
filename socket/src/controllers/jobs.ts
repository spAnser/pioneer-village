import type { Socket } from 'socket.io';

import { logInfoC, logInfoS } from '../helpers';
import Characters from '../managers/characters';
import jobSystemManager from '../managers/jobs';
import { serverNamespace, userNamespace } from '../server';

type UserSocket = Socket<SocketIn.FromClient, SocketOut.ToClient>;

/** Only the jobs slice of the client event map — the bridge itself carries everything. */
type JobsClientEvent = Extract<keyof SocketOut.ToClient, `jobs.${string}`>;

const NO_CHARACTER_DATA = 'No character data';
const HOURLY_WAGE_REASON = 'Hourly wages';
const TASK_COMPLETION_REASON = 'Task completion';
const DISCONNECT_REASON = 'Player disconnected';

const characterIdOf = (socket: UserSocket): number | undefined => socket.data?.character?.id;

/** The UI socket of a player who is not the one making the request. */
const playerSocket = (characterId: number): UserSocket | null => Characters.getCharacterSocket(characterId) ?? null;

/**
 * Job, wage and pay slip data is per-character, so it goes to one player rather than
 * every connected client. `target` is null once the player has gone.
 */
const emitToPlayer = <TEvent extends JobsClientEvent>(
  target: UserSocket | null,
  event: TEvent,
  ...args: Parameters<SocketOut.ToClient[TEvent]>
): void => {
  target?.emit('__client__', event, ...args);
};

/** The only channel to the game server: one envelope per lifecycle transition. */
const emitHook = <TType extends Jobs.HookType>(
  type: TType,
  jobHandle: string,
  payload: Jobs.HookPayloads[TType],
): void => {
  serverNamespace.emit('jobs.hook', type, jobHandle, payload);
};

/**
 * A rejected handler would leave the caller's acknowledgement unanswered, hanging its
 * RPC forever, so every asynchronous handler answers with a fallback on failure.
 */
const respond = async <TResult>(
  log: (name: string, ...args: unknown[]) => void,
  label: string,
  cb: (result: TResult) => void,
  fallback: TResult,
  run: () => Promise<TResult>,
): Promise<void> => {
  try {
    cb(await run());
  } catch (error) {
    log('[Jobs]', label, 'failed', error);
    cb(fallback);
  }
};

const respondToServer = <TResult>(
  label: string,
  cb: (result: TResult) => void,
  fallback: TResult,
  run: () => Promise<TResult>,
): Promise<void> => respond(logInfoS, label, cb, fallback, run);

const respondToClient = <TResult>(
  label: string,
  cb: (result: TResult) => void,
  fallback: TResult,
  run: () => Promise<TResult>,
): Promise<void> => respond(logInfoC, label, cb, fallback, run);

const findActiveTask = (characterId: number, instanceId: string): Jobs.TaskInstance | null =>
  jobSystemManager.getActiveTasks(characterId).find((task) => task.id === instanceId) ?? null;

/**
 * Wages were earned and written to a slip. Nothing has been paid out yet, so subscribers
 * are told the slip exists rather than that money moved; the player is told because the
 * earning is real either way.
 */
const announcePaySlipIssued = (
  characterId: number,
  jobHandle: string,
  amount: number,
  reason: string,
  target: UserSocket | null,
): void => {
  if (amount <= 0) {
    return;
  }

  emitToPlayer(target, 'jobs.payment-processed', characterId, amount, reason);
  emitHook('onPaySlipIssued', jobHandle, { characterId, jobHandle, amount, reason });
};

/**
 * Redemption is the only point money changes hands, so it is the only point `onPayment`
 * fires — firing it at issue too would pay every shift twice.
 */
const announcePayment = (characterId: number, jobHandle: string, amount: number, reason: string): void => {
  if (amount <= 0) {
    return;
  }

  emitHook('onPayment', jobHandle, { characterId, jobHandle, amount, reason });
};

const announceTaskAssigned = (characterId: number, instance: Jobs.TaskInstance, target: UserSocket | null): void => {
  emitToPlayer(target, 'jobs.task-assigned', characterId, instance);
  emitHook('onTaskAssigned', instance.jobHandle, { characterId, instance });
};

const announceTaskStarted = (characterId: number, instance: Jobs.TaskInstance, target: UserSocket | null): void => {
  emitToPlayer(target, 'jobs.task-started', characterId, instance);
  emitHook('onTaskStarted', instance.jobHandle, { characterId, instance });
};

const announceClockOut = (
  characterId: number,
  jobHandle: string,
  result: Jobs.ClockResult,
  target: UserSocket | null,
): void => {
  const hoursWorked = result.hoursWorked ?? 0;
  const payment = result.payment ?? 0;

  emitToPlayer(target, 'jobs.clock-out-update', characterId, jobHandle, hoursWorked, payment);
  emitHook('onClockOut', jobHandle, { characterId, jobHandle, hoursWorked, payment });
  announcePaySlipIssued(characterId, jobHandle, payment, HOURLY_WAGE_REASON, target);
};

const handleClockOut = async (characterId: number, target: UserSocket | null): Promise<Jobs.ClockResult> => {
  // Read the job before settling — a clocked-out character no longer has one to name.
  const job = jobSystemManager.getCharacterJob(characterId);
  const result = await jobSystemManager.clockOut(characterId);

  if (result.success && job) {
    announceClockOut(characterId, job.handle, result, target);
  }

  return result;
};

const handleAssignTask = async (
  characterId: number,
  jobHandle: string,
  taskHandle: string,
  target: UserSocket | null,
): Promise<Jobs.TaskInstance | null> => {
  const instance = await jobSystemManager.assignTask(characterId, jobHandle, taskHandle);

  if (instance) {
    announceTaskAssigned(characterId, instance, target);
  }

  return instance;
};

const handleCompleteTask = async (
  characterId: number,
  instanceId: string,
  target: UserSocket | null,
): Promise<Jobs.TaskResult> => {
  // Completion retires the instance, so capture it while it is still active: both the
  // client event and the hook envelope carry the whole instance.
  const instance = findActiveTask(characterId, instanceId);
  const result = await jobSystemManager.completeTask(characterId, instanceId);

  if (!result.success || !instance) {
    return result;
  }

  const payment = result.payment ?? 0;
  emitToPlayer(target, 'jobs.task-completed', characterId, instance, payment);
  emitHook('onTaskCompleted', instance.jobHandle, { characterId, instance, payment });
  announcePaySlipIssued(characterId, instance.jobHandle, payment, TASK_COMPLETION_REASON, target);

  return result;
};

const handleFailTask = async (
  characterId: number,
  instanceId: string,
  reason: string,
  target: UserSocket | null,
): Promise<boolean> => {
  const instance = findActiveTask(characterId, instanceId);
  const success = await jobSystemManager.failTask(characterId, instanceId, reason);

  if (success && instance) {
    emitToPlayer(target, 'jobs.task-failed', characterId, instance, reason);
    emitHook('onTaskFailed', instance.jobHandle, { characterId, instance, reason });
  }

  return success;
};

export default (): void => {
  // The entry point is not async, so settling shifts orphaned by a crash runs detached;
  // reporting it keeps the failure out of an unhandled rejection.
  void jobSystemManager
    .restoreState()
    .then(() => logInfoS('[Jobs]', 'Restored job state'))
    .catch((error: unknown) => logInfoS('[Jobs]', 'Failed to restore job state', error));

  serverNamespace.on('connection', (socket) => {
    logInfoS('[Jobs]', 'Game server connected');

    socket.on('jobs.register-job', (jobData, cb = () => {}): void => {
      const success = jobSystemManager.registerJob(jobData);
      logInfoS('[Jobs]', 'register-job', jobData.handle, success);
      cb(success);
    });

    socket.on('jobs.register-task', (jobHandle, taskData, cb = () => {}): void => {
      const success = jobSystemManager.registerTask(jobHandle, taskData);
      logInfoS('[Jobs]', 'register-task', jobHandle, taskData.handle, success);
      cb(success);
    });

    socket.on('jobs.grant-permission', async (characterId, type, typeId, grantedBy, cb = () => {}): Promise<void> => {
      logInfoS('[Jobs]', 'grant-permission', characterId, type, typeId);

      await respondToServer<boolean>('grant-permission', cb, false, () =>
        jobSystemManager.grantPermission(characterId, type, typeId, grantedBy),
      );
    });

    socket.on('jobs.revoke-permission', async (characterId, type, typeId, cb = () => {}): Promise<void> => {
      logInfoS('[Jobs]', 'revoke-permission', characterId, type, typeId);

      await respondToServer<boolean>('revoke-permission', cb, false, () =>
        jobSystemManager.revokePermission(characterId, type, typeId),
      );
    });

    socket.on('jobs.assign-task', async (characterId, jobHandle, taskHandle, cb = () => {}): Promise<void> => {
      logInfoS('[Jobs]', 'assign-task', characterId, jobHandle, taskHandle);

      await respondToServer<Jobs.TaskInstance | null>('assign-task', cb, null, () =>
        handleAssignTask(characterId, jobHandle, taskHandle, playerSocket(characterId)),
      );
    });

    socket.on('jobs.complete-task', async (characterId, instanceId, cb = () => {}): Promise<void> => {
      logInfoS('[Jobs]', 'complete-task', characterId, instanceId);

      await respondToServer<Jobs.TaskResult>(
        'complete-task',
        cb,
        { success: false, error: 'Task completion failed' },
        () => handleCompleteTask(characterId, instanceId, playerSocket(characterId)),
      );
    });

    socket.on('jobs.fail-task', async (characterId, instanceId, reason, cb = () => {}): Promise<void> => {
      logInfoS('[Jobs]', 'fail-task', characterId, instanceId, reason);

      await respondToServer<boolean>('fail-task', cb, false, () =>
        handleFailTask(characterId, instanceId, reason, playerSocket(characterId)),
      );
    });

    socket.on('jobs.get-active-tasks', (characterId, cb = () => {}): void => {
      cb(jobSystemManager.getActiveTasks(characterId));
    });

    socket.on('jobs.get-clocked-in', (cb = () => {}): void => {
      cb(jobSystemManager.getClockedIn());
    });
  });

  userNamespace.on('connection', (socket) => {
    logInfoC('[Jobs]', 'User connected', socket.id, socket.data);

    socket.on('jobs.get-state', (cb = () => {}): void => {
      const characterId = characterIdOf(socket);
      if (!characterId) {
        cb({
          isClocked: false,
          currentJob: null,
          availableJobs: [],
          clockedInEmployees: 0,
          error: NO_CHARACTER_DATA,
        });
        return;
      }

      cb({
        isClocked: jobSystemManager.isCharacterClockedIn(characterId),
        currentJob: jobSystemManager.getCharacterJob(characterId),
        availableJobs: jobSystemManager.getRegisteredJobs(),
        clockedInEmployees: jobSystemManager.getClockedInCount(),
      });
    });

    socket.on('jobs.clock-in', async (jobHandle, location, cb = () => {}): Promise<void> => {
      const characterId = characterIdOf(socket);
      if (!characterId) {
        cb({ success: false, error: NO_CHARACTER_DATA });
        return;
      }

      logInfoC('[Jobs]', 'clock-in', characterId, jobHandle);

      await respondToClient<Jobs.ClockResult>(
        'clock-in',
        cb,
        { success: false, error: 'Clock in failed' },
        async () => {
          const result = await jobSystemManager.clockIn(characterId, jobHandle, location);

          if (result.success) {
            emitToPlayer(socket, 'jobs.clock-in-update', characterId, jobHandle);
            emitHook('onClockIn', jobHandle, { characterId, jobHandle });
          }

          return result;
        },
      );
    });

    socket.on('jobs.clock-out', async (cb = () => {}): Promise<void> => {
      const characterId = characterIdOf(socket);
      if (!characterId) {
        cb({ success: false, error: NO_CHARACTER_DATA });
        return;
      }

      logInfoC('[Jobs]', 'clock-out', characterId);

      await respondToClient<Jobs.ClockResult>('clock-out', cb, { success: false, error: 'Clock out failed' }, () =>
        handleClockOut(characterId, socket),
      );
    });

    socket.on('jobs.get-available-tasks', async (jobHandle, cb = () => {}): Promise<void> => {
      const characterId = characterIdOf(socket);
      if (!characterId) {
        cb([]);
        return;
      }

      await respondToClient<Jobs.TaskDefinition[]>('get-available-tasks', cb, [], () =>
        jobSystemManager.getAvailableTasks(characterId, jobHandle),
      );
    });

    socket.on('jobs.can-start-task', async (jobHandle, taskHandle, cb = () => {}): Promise<void> => {
      const characterId = characterIdOf(socket);
      if (!characterId) {
        cb({ canStart: false, reason: NO_CHARACTER_DATA });
        return;
      }

      await respondToClient<Jobs.TaskAvailability>(
        'can-start-task',
        cb,
        { canStart: false, reason: 'Availability check failed' },
        () => jobSystemManager.canStartTask(characterId, jobHandle, taskHandle),
      );
    });

    socket.on('jobs.accept-task', async (jobHandle, taskHandle, cb = () => {}): Promise<void> => {
      const characterId = characterIdOf(socket);
      if (!characterId) {
        cb(null);
        return;
      }

      logInfoC('[Jobs]', 'accept-task', characterId, jobHandle, taskHandle);

      await respondToClient<Jobs.TaskInstance | null>('accept-task', cb, null, async () => {
        const instance = await jobSystemManager.acceptTask(characterId, jobHandle, taskHandle);

        if (instance) {
          // Accepting creates the instance and starts it in one step. Announcing both
          // transitions keeps the guarantee that every instance is seen as assigned
          // before it is seen as started, whichever hook a resource subscribed to.
          announceTaskAssigned(characterId, instance, socket);
          announceTaskStarted(characterId, instance, socket);
        }

        return instance;
      });
    });

    socket.on('jobs.start-task', async (instanceId, cb = () => {}): Promise<void> => {
      const characterId = characterIdOf(socket);
      if (!characterId) {
        cb(null);
        return;
      }

      await respondToClient<Jobs.TaskInstance | null>('start-task', cb, null, async () => {
        const instance = await jobSystemManager.startTask(characterId, instanceId);

        if (instance) {
          announceTaskStarted(characterId, instance, socket);
        }

        return instance;
      });
    });

    socket.on('jobs.update-task-progress', async (instanceId, progress, cb = () => {}): Promise<void> => {
      const characterId = characterIdOf(socket);
      if (!characterId) {
        cb(null);
        return;
      }

      await respondToClient<Jobs.TaskInstance | null>('update-task-progress', cb, null, async () => {
        const instance = await jobSystemManager.updateTaskProgress(characterId, instanceId, progress);

        if (instance) {
          emitToPlayer(socket, 'jobs.task-progress', characterId, instance);
          emitHook('onTaskProgress', instance.jobHandle, { characterId, instance });
        }

        return instance;
      });
    });

    socket.on('jobs.complete-task', async (instanceId, cb = () => {}): Promise<void> => {
      const characterId = characterIdOf(socket);
      if (!characterId) {
        cb({ success: false, error: NO_CHARACTER_DATA });
        return;
      }

      logInfoC('[Jobs]', 'complete-task', characterId, instanceId);

      await respondToClient<Jobs.TaskResult>(
        'complete-task',
        cb,
        { success: false, error: 'Task completion failed' },
        () => handleCompleteTask(characterId, instanceId, socket),
      );
    });

    socket.on('jobs.fail-task', async (instanceId, reason, cb = () => {}): Promise<void> => {
      const characterId = characterIdOf(socket);
      if (!characterId) {
        cb(false);
        return;
      }

      logInfoC('[Jobs]', 'fail-task', characterId, instanceId, reason);

      await respondToClient<boolean>('fail-task', cb, false, () =>
        handleFailTask(characterId, instanceId, reason, socket),
      );
    });

    socket.on('jobs.get-active-tasks', (cb = () => {}): void => {
      const characterId = characterIdOf(socket);
      if (!characterId) {
        cb([]);
        return;
      }

      cb(jobSystemManager.getActiveTasks(characterId));
    });

    socket.on('jobs.get-pay-slips', async (cb = () => {}): Promise<void> => {
      const characterId = characterIdOf(socket);
      if (!characterId) {
        cb([]);
        return;
      }

      await respondToClient<Jobs.PaySlip[]>('get-pay-slips', cb, [], () =>
        jobSystemManager.getUnredeemedPaySlips(characterId),
      );
    });

    socket.on('jobs.redeem-pay-slip', async (paySlipId, cb = () => {}): Promise<void> => {
      const characterId = characterIdOf(socket);
      if (!characterId) {
        cb(false);
        return;
      }

      logInfoC('[Jobs]', 'redeem-pay-slip', characterId, paySlipId);

      await respondToClient<boolean>('redeem-pay-slip', cb, false, async () => {
        // Redemption only reports whether it worked, so the slip is read first for the
        // job, amount and reason the payment announcement has to name. A failed read
        // yields an empty list, so bail rather than burn a slip nobody can be paid for —
        // redemption is the one point where money changes hands.
        const slips = await jobSystemManager.getUnredeemedPaySlips(characterId);
        const slip = slips.find((entry) => entry.id === paySlipId);
        if (!slip) {
          return false;
        }

        const success = await jobSystemManager.redeemPaySlip(characterId, paySlipId);

        if (success) {
          announcePayment(characterId, slip.jobHandle, Number(slip.amount), slip.reason);
        }

        return success;
      });
    });

    socket.on('disconnect', async (): Promise<void> => {
      const characterId = characterIdOf(socket);
      if (!characterId) {
        return;
      }

      const job = jobSystemManager.getCharacterJob(characterId);
      // Disconnecting drops every live instance, so read them while they still exist: a
      // job resource keys its world cleanup off the failure hook and would otherwise
      // leave whatever it spawned for the task standing.
      const abandoned = jobSystemManager.getActiveTasks(characterId);

      try {
        const result = await jobSystemManager.handleDisconnect(characterId);

        if (result?.success && job) {
          logInfoC('[Jobs]', 'settled shift on disconnect', characterId, job.handle);
          // The player is already gone, so only the hook side of the clock-out lands.
          announceClockOut(characterId, job.handle, result, null);
        }
      } catch (error) {
        logInfoC('[Jobs]', 'disconnect settle failed', characterId, error);
      } finally {
        // Settling can fail after the instances are already dropped, so the cleanup
        // notice has to land on both paths.
        for (const instance of abandoned) {
          emitHook('onTaskFailed', instance.jobHandle, { characterId, instance, reason: DISCONNECT_REASON });
        }
      }
    });
  });
};
