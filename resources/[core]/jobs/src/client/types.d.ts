declare interface ClientExports {
  jobs: Jobs.ClientExports;
}

declare namespace Jobs {
  interface ClientExports {
    clockIn: (jobHandle: string) => Promise<void>;
    clockOut: () => Promise<void>;
    getCurrentJob: () => Jobs.JobDefinition | null;
    isCurrentlyClocked: () => boolean;
    canStartTask: (taskId: number) => Promise<Jobs.TaskAvailability>;
    acceptTask: (jobHandle: string, taskHandle: string) => Promise<Jobs.TaskInstance | null>;
    getAvailableTasks: (jobHandle?: string) => Promise<Jobs.TaskDefinition[]>;
  }
}

// Client perspective - RPC calls to various destinations
declare namespace ClientRPC {
  interface Socket {
    ['jobs.clock-in']: (jobHandle: string, location: Vector3Format) => Jobs.ClockResult;
    ['jobs.clock-out']: () => Jobs.ClockResult;
    ['jobs.get-state']: () => UI.Jobs.State & { error?: string };
    ['jobs.can-start-task']: (taskId: number) => Jobs.TaskAvailability;
    ['jobs.start-task']: (jobHandle: string, taskHandle: string) => Jobs.TaskInstance | null;
    ['jobs.get-available-tasks']: (jobHandle?: string) => Jobs.TaskDefinition[];
  }
}

// Client perspective - events received from various sources
declare namespace ClientIn {
  interface FromSocket {
    ['jobs.clock-in-update']: (characterId: number, jobHandle: string) => void;
    ['jobs.clock-out-update']: (characterId: number, hoursWorked: number, payment: number) => void;
    ['jobs.task-created']: (jobHandle: string, taskInstance: Jobs.TaskInstance) => void;
    ['jobs.payment-processed']: (characterId: number, amount: number, reason: string) => void;
    ['jobs.task-started']: (characterId: number, taskId: number) => void;
    ['jobs.task-completed']: (characterId: number, taskId: number, payment: number) => void;
    ['jobs.permission-granted']: (characterId: number, type: string, typeId: number) => void;
  }
}
