declare namespace SocketIn {
  interface FromGameServer {
    ['jobs.register-job']: (jobData: Jobs.JobDefinition, callback: (success: boolean) => void) => void;
    ['jobs.register-task']: (
      jobHandle: string,
      taskData: Jobs.TaskDefinition,
      callback: (success: boolean) => void,
    ) => void;
    ['jobs.grant-permission']: (
      characterId: number,
      type: 'JOB' | 'TASK',
      typeId: string,
      grantedBy: number,
      callback: (success: boolean) => void,
    ) => void;
    ['jobs.revoke-permission']: (
      characterId: number,
      type: 'JOB' | 'TASK',
      typeId: string,
      callback: (success: boolean) => void,
    ) => void;
    ['jobs.assign-task']: (
      characterId: number,
      jobHandle: string,
      taskHandle: string,
      callback: (instance: Jobs.TaskInstance | null) => void,
    ) => void;
    ['jobs.complete-task']: (
      characterId: number,
      instanceId: string,
      callback: (result: Jobs.TaskResult) => void,
    ) => void;
    ['jobs.fail-task']: (
      characterId: number,
      instanceId: string,
      reason: string,
      callback: (success: boolean) => void,
    ) => void;
    ['jobs.get-active-tasks']: (
      characterId: number,
      callback: (instances: Jobs.TaskInstance[]) => void,
    ) => void;
    /** Seeds the game server's clocked-in mirror after a reconnect. */
    ['jobs.get-clocked-in']: (callback: (entries: Jobs.ClockedInEntry[]) => void) => void;
  }

  interface FromClient {
    ['jobs.get-state']: (callback: (state: UI.Jobs.State & { error?: string }) => void) => void;
    ['jobs.clock-in']: (
      jobHandle: string,
      location: Vector3Format | null,
      callback: (result: Jobs.ClockResult) => void,
    ) => void;
    ['jobs.clock-out']: (callback: (result: Jobs.ClockResult) => void) => void;
    ['jobs.get-available-tasks']: (
      jobHandle: string | undefined,
      callback: (tasks: Jobs.TaskDefinition[]) => void,
    ) => void;
    ['jobs.can-start-task']: (
      jobHandle: string,
      taskHandle: string,
      callback: (result: Jobs.TaskAvailability) => void,
    ) => void;
    ['jobs.accept-task']: (
      jobHandle: string,
      taskHandle: string,
      callback: (instance: Jobs.TaskInstance | null) => void,
    ) => void;
    ['jobs.start-task']: (instanceId: string, callback: (instance: Jobs.TaskInstance | null) => void) => void;
    ['jobs.update-task-progress']: (
      instanceId: string,
      progress: Record<string, unknown>,
      callback: (instance: Jobs.TaskInstance | null) => void,
    ) => void;
    ['jobs.complete-task']: (instanceId: string, callback: (result: Jobs.TaskResult) => void) => void;
    ['jobs.fail-task']: (instanceId: string, reason: string, callback: (success: boolean) => void) => void;
    ['jobs.get-active-tasks']: (callback: (instances: Jobs.TaskInstance[]) => void) => void;
    ['jobs.get-pay-slips']: (callback: (slips: Jobs.PaySlip[]) => void) => void;
    ['jobs.redeem-pay-slip']: (paySlipId: number, callback: (success: boolean) => void) => void;
  }
}

declare namespace SocketOut {
  interface ToGameServer {
    /** One envelope for every lifecycle notification; the game server narrows on `type`. */
    ['jobs.hook']: (
      type: Jobs.HookType,
      jobHandle: string,
      payload: Jobs.HookPayloads[Jobs.HookType],
    ) => void;
  }

  interface ToClient {
    'jobs.clock-in-update': (characterId: number, jobHandle: string) => void;
    'jobs.clock-out-update': (characterId: number, jobHandle: string, hoursWorked: number, payment: number) => void;
    'jobs.task-assigned': (characterId: number, instance: Jobs.TaskInstance) => void;
    'jobs.task-started': (characterId: number, instance: Jobs.TaskInstance) => void;
    'jobs.task-progress': (characterId: number, instance: Jobs.TaskInstance) => void;
    'jobs.task-completed': (characterId: number, instance: Jobs.TaskInstance, payment: number) => void;
    'jobs.task-failed': (characterId: number, instance: Jobs.TaskInstance, reason: string) => void;
    'jobs.payment-processed': (characterId: number, amount: number, reason: string) => void;
  }
}
