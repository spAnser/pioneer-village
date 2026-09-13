declare interface ServerExports {
  jobs: Jobs.ServerExports;
}

declare namespace Jobs {
  interface ServerExports {
    registerJob: (jobData: Jobs.JobDefinition) => Promise<boolean>;
    registerTask: (jobHandle: string, taskData: Jobs.TaskDefinition) => Promise<boolean>;
    grantPermission: (characterId: number, type: 'JOB' | 'TASK', typeId: string, grantedBy: number) => Promise<boolean>;
    revokePermission: (characterId: number, type: 'JOB' | 'TASK', typeId: string) => Promise<boolean>;
    /** Permission id for a task — pair it with type 'TASK' when granting or revoking. */
    taskPermissionId: (jobHandle: string, taskHandle: string) => string;
    /** Assign a task to a character from the server side; the character starts it themselves. */
    assignTask: (characterId: number, jobHandle: string, taskHandle: string) => Promise<Jobs.TaskInstance | null>;
    completeTask: (characterId: number, instanceId: string) => Promise<Jobs.TaskResult>;
    failTask: (characterId: number, instanceId: string, reason?: string) => Promise<boolean>;
    getActiveTasks: (characterId: number) => Promise<Jobs.TaskInstance[]>;
    isCharacterClockedIn: (characterId: number) => boolean;
    getCharacterJob: (characterId: number) => string | null;
    /** Subscribe to a job's lifecycle. Returns an unregister function. */
    registerJobHook: <TType extends Jobs.HookType>(
      id: string,
      type: TType,
      jobHandle: string,
      fn: Jobs.Hook<TType>,
    ) => () => void;
  }
}

// `awaitSocket` keys off SocketServer.Server, which already merges in SocketIn.FromGameServer
// from socket/src/types/*.d.ts — so the jobs RPCs declared there are what types these calls.
// Redeclaring them here as ServerRPC.Socket members collides with that merge (TS2320).

// Server perspective - events received from the socket server.
declare namespace ServerIn {
  interface FromSocket {
    /** One envelope for every lifecycle notification; narrow on `type` to read `payload`. */
    ['jobs.hook']: (
      type: Jobs.HookType,
      jobHandle: string,
      payload: Jobs.HookPayloads[Jobs.HookType],
    ) => void;
  }
}
