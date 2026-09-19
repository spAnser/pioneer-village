declare namespace UI {
  namespace Jobs {
    interface State {
      isClocked: boolean;
      currentJob: globalThis.Jobs.JobDefinition | null;
      availableJobs: globalThis.Jobs.JobDefinition[];
      clockedInEmployees: number;
    }
  }
}

declare namespace Jobs {
  type PaymentType = 'HOURLY' | 'PER_TASK' | 'COMMISSION' | 'SALARY' | 'CALLBACK';

  interface ClockInConstraints {
    location?: {
      x: number;
      y: number;
      z: number;
      radius: number;
    };
    /** Real-world local hours, inclusive start, exclusive end. Wraps when start > end. */
    hours?: {
      start: number;
      end: number;
    };
    daysOfWeek?: number[];
  }

  interface JobDefinition {
    handle: string;
    name: string;
    description?: string;
    paymentType: PaymentType;
    paymentAmount: string;
    requirements?: Record<string, unknown>;
    inventory?: Record<string, unknown>;
    clockInConstraints?: ClockInConstraints;
    metadata?: Record<string, unknown>;
  }

  /**
   * How often a task may be repeated. A discriminated union so each variant only
   * carries the fields it actually uses — a flat optional bag silently accepts
   * configuration the matching branch never reads.
   */
  type RepeatConfig =
    | { type: 'UNLIMITED' }
    | { type: 'COOLDOWN'; cooldownMinutes: number; maxPerDay?: number }
    | { type: 'BURST'; burstSize: number; burstCooldownMinutes: number; maxPerHour?: number }
    | { type: 'WINDOW'; maxPerWindow: number; windowMinutes: number; maxPerDay?: number };

  interface TimeConstraints {
    /** Real-world local hours, inclusive start, exclusive end. Wraps when start > end. */
    startHour?: number;
    endHour?: number;
    daysOfWeek?: number[];
  }

  interface TaskRewards {
    /** Overrides the job's paymentAmount for a PER_TASK payout. */
    payment?: string;
    items?: Record<string, number>;
  }

  /**
   * A task the framework knows how to gate, meter and pay for. It deliberately does
   * not know what a task *does* — `taskType` is a free-form category and `config`
   * is an opaque payload carried through untouched for the owning resource to read.
   */
  interface TaskDefinition<TConfig = Record<string, unknown>> {
    handle: string;
    name: string;
    description?: string;
    taskType: string;
    config?: TConfig;
    requirements?: Record<string, unknown>;
    rewards?: TaskRewards;
    timeConstraints?: TimeConstraints;
    repeatConfig?: RepeatConfig;
    metadata?: Record<string, unknown>;
  }

  /** Convenience payload shapes for the task types shipped with the core jobs. */
  interface EscortConfig {
    startLocation: Vector3Format;
    endLocation: Vector3Format;
  }

  interface PatrolConfig {
    zone: string | Zones.ZoneData;
  }

  type TaskStatus = 'ASSIGNED' | 'IN_PROGRESS';

  /**
   * A live attempt at a task. Instances exist only in socket-server memory: they
   * describe work in a world (zones, peds, blips) that does not survive a restart
   * either, so persisting them would only leave pointers to things that are gone.
   * Timestamps are epoch milliseconds because Date does not survive JSON transport.
   */
  interface TaskInstance {
    id: string;
    jobHandle: string;
    taskHandle: string;
    characterId: number;
    status: TaskStatus;
    progress: Record<string, unknown>;
    assignedAt: number;
    startedAt: number | null;
  }

  interface TaskAvailability {
    canStart: boolean;
    reason?: string;
    nextAvailableAt?: number;
    remainingCooldown?: number;
  }

  interface ClockResult {
    success: boolean;
    hoursWorked?: number;
    payment?: number;
    error?: string;
  }

  interface TaskResult {
    success: boolean;
    payment?: number;
    error?: string;
  }

  interface PaySlip {
    id: number;
    characterId: number;
    amount: string;
    reason: string;
    jobHandle: string;
    bankId: string;
    redeemed: boolean;
    createdAt: number;
  }

  /** Who is on shift right now, for seeding a game-server mirror after a reconnect. */
  interface ClockedInEntry {
    characterId: number;
    jobHandle: string;
  }

  /**
   * Lifecycle notifications a job resource can subscribe to on the game server.
   * Notification only — a hook cannot veto, because the socket server does not
   * block on the game server. Gate up front with permissions instead.
   */
  interface HookPayloads {
    onClockIn: { characterId: number; jobHandle: string };
    onClockOut: { characterId: number; jobHandle: string; hoursWorked: number; payment: number };
    onTaskAssigned: { characterId: number; instance: TaskInstance };
    onTaskStarted: { characterId: number; instance: TaskInstance };
    onTaskProgress: { characterId: number; instance: TaskInstance };
    onTaskCompleted: { characterId: number; instance: TaskInstance; payment: number };
    onTaskFailed: { characterId: number; instance: TaskInstance; reason: string };
    /** Wages were earned and a slip was written. No money has moved yet. */
    onPaySlipIssued: { characterId: number; jobHandle: string; amount: number; reason: string };
    /** A slip was redeemed — this is the single point where money actually changes hands. */
    onPayment: { characterId: number; jobHandle: string; amount: number; reason: string };
  }

  type HookType = keyof HookPayloads;

  type Hook<TType extends HookType = HookType> = (payload: HookPayloads[TType]) => void | Promise<void>;
}
