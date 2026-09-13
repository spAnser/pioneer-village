declare interface ClientExports {
  jobs: Jobs.ClientExports;
}

declare namespace Jobs {
  interface ClientExports {
    clockIn: (jobHandle: string) => Promise<Jobs.ClockResult>;
    clockOut: () => Promise<Jobs.ClockResult>;
    getCurrentJob: () => Jobs.JobDefinition | null;
    isCurrentlyClocked: () => boolean;
    refreshState: () => Promise<void>;
    getAvailableTasks: (jobHandle?: string) => Promise<Jobs.TaskDefinition[]>;
    canStartTask: (jobHandle: string, taskHandle: string) => Promise<Jobs.TaskAvailability>;
    acceptTask: (jobHandle: string, taskHandle: string) => Promise<Jobs.TaskInstance | null>;
    startTask: (instanceId: string) => Promise<Jobs.TaskInstance | null>;
    updateTaskProgress: (instanceId: string, progress: Record<string, unknown>) => Promise<Jobs.TaskInstance | null>;
    completeTask: (instanceId: string) => Promise<Jobs.TaskResult>;
    failTask: (instanceId: string, reason?: string) => Promise<boolean>;
    getActiveTasks: () => Promise<Jobs.TaskInstance[]>;
    getPaySlips: () => Promise<Jobs.PaySlip[]>;
    redeemPaySlip: (paySlipId: number) => Promise<boolean>;
  }
}

// Client perspective - RPC calls to the socket server, forwarded through the UI.
declare namespace ClientRPC {
  interface Socket {
    ['jobs.get-state']: () => UI.Jobs.State & { error?: string };
    ['jobs.clock-in']: (jobHandle: string, location: Vector3Format | null) => Jobs.ClockResult;
    ['jobs.clock-out']: () => Jobs.ClockResult;
    ['jobs.get-available-tasks']: (jobHandle?: string) => Jobs.TaskDefinition[];
    ['jobs.can-start-task']: (jobHandle: string, taskHandle: string) => Jobs.TaskAvailability;
    ['jobs.accept-task']: (jobHandle: string, taskHandle: string) => Jobs.TaskInstance | null;
    ['jobs.start-task']: (instanceId: string) => Jobs.TaskInstance | null;
    ['jobs.update-task-progress']: (
      instanceId: string,
      progress: Record<string, unknown>,
    ) => Jobs.TaskInstance | null;
    ['jobs.complete-task']: (instanceId: string) => Jobs.TaskResult;
    ['jobs.fail-task']: (instanceId: string, reason: string) => boolean;
    ['jobs.get-active-tasks']: () => Jobs.TaskInstance[];
    ['jobs.get-pay-slips']: () => Jobs.PaySlip[];
    ['jobs.redeem-pay-slip']: (paySlipId: number) => boolean;
  }
}

// Client perspective - events received from the socket server via the UI bridge.
declare namespace ClientIn {
  interface FromSocket {
    ['jobs.clock-in-update']: (characterId: number, jobHandle: string) => void;
    ['jobs.clock-out-update']: (characterId: number, jobHandle: string, hoursWorked: number, payment: number) => void;
    ['jobs.task-assigned']: (characterId: number, instance: Jobs.TaskInstance) => void;
    ['jobs.task-started']: (characterId: number, instance: Jobs.TaskInstance) => void;
    ['jobs.task-progress']: (characterId: number, instance: Jobs.TaskInstance) => void;
    ['jobs.task-completed']: (characterId: number, instance: Jobs.TaskInstance, payment: number) => void;
    ['jobs.task-failed']: (characterId: number, instance: Jobs.TaskInstance, reason: string) => void;
    ['jobs.payment-processed']: (characterId: number, amount: number, reason: string) => void;
  }
}
