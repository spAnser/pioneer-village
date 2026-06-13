declare namespace SocketIn {
  interface FromGameServer {
    ['jobs.register-job']: (jobData: Jobs.JobDefinition, callback: (success: boolean) => void) => void;
    ['jobs.create-task']: (
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
  }

  interface FromClient {
    ['jobs.get-state']: (callback: (state: UI.Jobs.State & { error?: string }) => void) => void;
    ['jobs.clock-in']: (
      jobHandle: string,
      location: { x: number; y: number; z: number } | undefined | null,
      callback: (result: Jobs.ClockResult) => void,
    ) => void;
    ['jobs.clock-out']: (
      callback: (result: Jobs.ClockResult & { hoursWorked?: number; payment?: number }) => void,
    ) => void;
    ['jobs.can-start-task']: (taskId: number, callback: (result: Jobs.TaskAvailability) => void) => void;
    ['jobs.get-available-tasks']: (
      jobHandle: string | undefined,
      callback: (tasks: Jobs.TaskDefinition[]) => void,
    ) => void;
    ['jobs.assign-task']: (taskId: number, callback: (instance: Jobs.TaskInstance | null) => void) => void;
    ['jobs.start-task']: (instanceId: number, callback: (success: boolean) => void) => void;
    ['jobs.complete-task']: (
      instanceId: number,
      callback: (result: { success: boolean; payment?: number }) => void,
    ) => void;
    ['jobs.get-pay-slips']: (callback: (slips: Jobs.PaySlip[]) => void) => void;
    ['jobs.redeem-pay-slip']: (paySlipId: number, bankId: string, callback: (result: { success: boolean; amount?: number; message?: string }) => void) => void;
  }
}

declare namespace SocketOut {
  interface ToGameServer {
    ['jobs.clock-in']: (characterId: number, jobHandle: string, clockInTime: Date) => void;
    ['jobs.clock-out']: (characterId: number, jobHandle: string, hoursWorked: number, payment: number) => void;
    ['jobs.task-created']: (jobHandle: string, taskInstance: Jobs.TaskInstance) => void;
    ['jobs.payment-processed']: (characterId: number, amount: number, reason: string) => void;
  }

  interface ToClient {
    'jobs.clock-in-update': (characterId: number, jobHandle: string) => void;
    'jobs.clock-out-update': (characterId: number, hoursWorked: number, payment: number) => void;
    'jobs.task-created': (jobHandle: string, taskInstance: Jobs.TaskInstance) => void;
    'jobs.payment-processed': (characterId: number, amount: number, reason: string) => void;
    'jobs.task-started': (characterId: number, taskId: number) => void;
    'jobs.task-completed': (characterId: number, taskId: number, payment: number) => void;
    'jobs.permission-granted': (characterId: number, type: string, typeId: number) => void;
    'jobs.pay-slip-redeemed': (characterId: number, paySlipId: number, amount: number, newBalance: number) => void;
  }
}
