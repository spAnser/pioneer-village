declare namespace UI {
  namespace Jobs {
    interface State {
      show: boolean;
      isClocked: boolean;
      currentJob: globalThis.Jobs.JobDefinition | null;
      availableJobs: globalThis.Jobs.JobDefinition[];
      clockedInEmployees: number;
    }
  }
}

declare namespace Jobs {
  interface JobDefinition {
    handle: string;
    name: string;
    description?: string;
    paymentType: 'HOURLY' | 'PER_TASK' | 'COMMISSION' | 'SALARY' | 'CALLBACK';
    paymentAmount: string;
    requirements?: Record<string, any>;
    inventory?: Record<string, any>;
    clockInConstraints?: {
      location?: {
        x: number;
        y: number;
        z: number;
        radius: number;
      };
      hours?: {
        start: number;
        end: number;
      };
      daysOfWeek?: number[];
    };
    metadata?: Record<string, any>;
  }

  interface TaskDefinitionBase {
    handle: string;
    name: string;
    description?: string;
    taskType: string;
    requirements?: Record<string, any>;
    rewards?: Record<string, any>;
    timeConstraints?: {
      startHour?: number;
      endHour?: number;
      daysOfWeek?: number[];
    };
    repeatConfig?: {
      type: 'COOLDOWN' | 'BURST' | 'WINDOW' | 'UNLIMITED';
      cooldownMinutes?: number;
      maxPerHour?: number;
      burstSize?: number;
      burstCooldownMinutes?: number;
      maxPerWindow?: number;
      windowMinutes?: number;
      maxPerDay?: number;
      resetHour?: number;
    };
    rateLimits?: Record<string, any>;
    metadata?: Record<string, any>;
  }

  interface TaskDefinitionInvalid {
    taskType: string;
  }

  interface TaskDefinitionEscort {
    taskType: 'escort';
    startLocation: Vector3Format;
    endLocation: Vector3Format;
  }

  interface TaskDefinitionPatrol {
    taskType: 'patrol';
    zone: string | Zones.ZoneData;
  }

  type TaskDefinition = TaskDefinitionBase & (TaskDefinitionInvalid | TaskDefinitionEscort | TaskDefinitionPatrol);

  interface TaskAvailability {
    canStart: boolean;
    reason?: string;
    nextAvailableAt?: Date;
    remainingCooldown?: number;
  }

  interface ClockResult {
    success: boolean;
    hoursWorked?: number;
    payment?: number;
    error?: string;
  }

  interface TaskInstance {
    id: number;
    taskId: number;
    assignedTo: number | null;
    status: 'AVAILABLE' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'EXPIRED';
    progress: Record<string, unknown>;
    createdAt: Date | null;
    assignedAt: Date | null;
    startedAt: Date | null;
    completedAt: Date | null;
    scheduledFor: Date | null;
    expiresAt: Date | null;
    metadata: Record<string, unknown>;
  }

  interface PaySlip {
    id: number;
    characterId: number;
    jobId: number;
    amount: string;
    reason: string;
    jobHandle: string;
    redeemed: boolean | null;
    redeemedAt: Date | null;
    createdAt: Date | null;
    metadata: unknown;
  }
}
