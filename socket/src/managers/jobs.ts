import { and, eq, isNotNull, isNull, lt, sql } from 'drizzle-orm';

import { db } from '../db/connection';
import {
  JobEmployeesSchema,
  type JobPaySlipSchemaType,
  JobPaySlipsSchema,
  JobPermissionsSchema,
  JobTaskCooldownsSchema,
  type JobTaskInstanceSchemaType,
  JobTaskInstancesSchema,
  type JobTaskSchemaType,
  JobTasksSchema,
  JobsSchema,
} from '../db/schema';
import { logInfoS } from '../helpers';

class JobSystemManager {
  static readonly instance: JobSystemManager = new JobSystemManager();

  private registeredJobs: Map<string, Jobs.JobDefinition> = new Map();
  private jobDbIds: Map<string, number> = new Map(); // handle -> DB id for FK references
  private clockedInEmployees: Map<number, { jobHandle: string; clockedInAt: Date }> = new Map();
  private taskScheduler: NodeJS.Timeout | null = null;

  constructor() {
    if (JobSystemManager.instance) {
      throw new Error('Error: Instantiation failed: Use JobSystemManager.instance instead of new.');
    }
    this.startTaskScheduler();
  }

  private toTaskDefinition(task: JobTaskSchemaType): Jobs.TaskDefinition {
    return {
      handle: task.handle,
      name: task.name,
      description: task.description || undefined,
      taskType: task.taskType || '',
      requirements: (task.requirements as Record<string, unknown>) || undefined,
      rewards: (task.rewards as Record<string, unknown>) || undefined,
      timeConstraints: (task.timeConstraints as Jobs.TaskDefinition['timeConstraints']) || undefined,
      repeatConfig: (task.repeatConfig as Jobs.TaskDefinition['repeatConfig']) || undefined,
      rateLimits: (task.rateLimits as Record<string, unknown>) || undefined,
      metadata: (task.metadata as Record<string, unknown>) || undefined,
    };
  }

  private toTaskInstance(instance: JobTaskInstanceSchemaType): Jobs.TaskInstance {
    return {
      id: instance.id,
      taskId: instance.taskId,
      assignedTo: instance.assignedTo,
      status: instance.status as Jobs.TaskInstance['status'],
      progress: (instance.progress as Record<string, unknown>) || {},
      createdAt: instance.createdAt,
      assignedAt: instance.assignedAt,
      startedAt: instance.startedAt,
      completedAt: instance.completedAt,
      scheduledFor: instance.scheduledFor || null,
      expiresAt: instance.expiresAt,
      metadata: (instance.metadata as Record<string, unknown>) || {},
    };
  }

  private toPaySlip(slip: JobPaySlipSchemaType): Jobs.PaySlip {
    return {
      id: slip.id,
      characterId: slip.characterId,
      jobId: slip.jobId,
      amount: slip.amount,
      reason: slip.reason,
      jobHandle: slip.jobHandle,
      redeemed: slip.redeemed,
      redeemedAt: slip.redeemedAt,
      createdAt: slip.createdAt,
      metadata: slip.metadata,
    };
  }

  registerJob(jobData: Jobs.JobDefinition, dbId: number): boolean {
    try {
      if (!jobData.handle || !jobData.name) {
        throw new Error('Job handle and name are required');
      }

      if (this.registeredJobs.has(jobData.handle)) {
        logInfoS('[Jobs]', `Job ${jobData.handle} already registered, updating...`);
      }

      this.registeredJobs.set(jobData.handle, jobData);
      this.jobDbIds.set(jobData.handle, dbId);

      logInfoS('[Jobs]', `Registered job: ${jobData.handle} - ${jobData.name}`);
      return true;
    } catch (error) {
      logInfoS('[Jobs]', `Failed to register job: ${error}`);
      return false;
    }
  }

  async clockIn(
    characterId: number,
    jobHandle: string,
    location?: { x: number; y: number; z: number },
  ): Promise<boolean> {
    try {
      const job = this.registeredJobs.get(jobHandle);
      if (!job) {
        throw new Error(`Job ${jobHandle} not found`);
      }

      const jobDbId = this.jobDbIds.get(jobHandle);
      if (!jobDbId) {
        throw new Error(`Job ${jobHandle} has no DB reference`);
      }

      if (this.clockedInEmployees.has(characterId)) {
        throw new Error('Already clocked in to a job');
      }

      if (!this.validateClockInConstraints(job, location)) {
        throw new Error('Clock-in constraints not met');
      }

      const clockInTime = new Date();

      const existingEmployees = await db
        .select()
        .from(JobEmployeesSchema)
        .where(
          and(
            eq(JobEmployeesSchema.characterId, characterId),
            eq(JobEmployeesSchema.jobId, jobDbId),
            isNull(JobEmployeesSchema.firedAt),
          ),
        );

      if (existingEmployees.length > 0) {
        await db
          .update(JobEmployeesSchema)
          .set({ clockedInAt: clockInTime })
          .where(eq(JobEmployeesSchema.id, existingEmployees[0].id));
      } else {
        await db.insert(JobEmployeesSchema).values({
          characterId,
          jobId: jobDbId,
          clockedInAt: clockInTime,
          hiredAt: clockInTime,
        });
      }

      this.clockedInEmployees.set(characterId, {
        jobHandle,
        clockedInAt: clockInTime,
      });

      logInfoS('[Jobs]', `Character ${characterId} clocked in to ${jobHandle}`);

      return true;
    } catch (error) {
      logInfoS('[Jobs]', `Clock in failed: ${error}`);
      return false;
    }
  }

  async clockOut(characterId: number): Promise<{ success: boolean; hoursWorked?: number; payment?: number }> {
    try {
      const clockInData = this.clockedInEmployees.get(characterId);
      if (!clockInData) {
        throw new Error('Not clocked in to any job');
      }

      const clockOutTime = new Date();
      const hoursWorked = (clockOutTime.getTime() - clockInData.clockedInAt.getTime()) / (1000 * 60 * 60);

      const job = this.registeredJobs.get(clockInData.jobHandle);
      const jobDbId = this.jobDbIds.get(clockInData.jobHandle);
      let payment = 0;

      if (job && job.paymentType === 'HOURLY' && job.paymentAmount) {
        const parsedAmount = parseFloat(job.paymentAmount);
        if (!isNaN(parsedAmount)) {
          payment = parsedAmount * hoursWorked;
        }
      }

      if (jobDbId) {
        const currentEmployee = await db
          .select()
          .from(JobEmployeesSchema)
          .where(
            and(
              eq(JobEmployeesSchema.characterId, characterId),
              eq(JobEmployeesSchema.jobId, jobDbId),
              isNull(JobEmployeesSchema.firedAt),
            ),
          );

        if (currentEmployee.length > 0) {
          const currentHours = currentEmployee[0].totalHoursWorked || '0';
          const newTotalHours = parseFloat(currentHours) + hoursWorked;
          await db
            .update(JobEmployeesSchema)
            .set({
              clockedInAt: null,
              totalHoursWorked: newTotalHours.toString(),
            })
            .where(eq(JobEmployeesSchema.id, currentEmployee[0].id));
        }
      }

      this.clockedInEmployees.delete(characterId);

      logInfoS(
        '[Jobs]',
        `Character ${characterId} clocked out. Hours: ${hoursWorked.toFixed(2)}, Payment: $${payment.toFixed(2)}`,
      );

      if (payment > 0) {
        await this.processPayment(characterId, payment, 'Hourly wages', job?.handle);
      }

      return { success: true, hoursWorked, payment };
    } catch (error) {
      logInfoS('[Jobs]', `Clock out failed: ${error}`);
      return { success: false };
    }
  }

  async createTask(jobHandle: string, taskData: Jobs.TaskDefinition): Promise<Jobs.TaskDefinition | null> {
    try {
      const job = this.registeredJobs.get(jobHandle);
      if (!job) {
        throw new Error(`Job ${jobHandle} not found`);
      }

      const jobDbId = this.jobDbIds.get(jobHandle);
      if (!jobDbId) {
        throw new Error(`Job ${jobHandle} has no DB reference`);
      }

      // Check for existing task by (jobId, handle) to prevent duplicates on restart
      const existing = await db
        .select()
        .from(JobTasksSchema)
        .where(and(eq(JobTasksSchema.jobId, jobDbId), eq(JobTasksSchema.handle, taskData.handle)));

      let task: JobTaskSchemaType;

      if (existing.length > 0) {
        const [updated] = await db
          .update(JobTasksSchema)
          .set({
            name: taskData.name,
            description: taskData.description,
            taskType: taskData.taskType,
            requirements: taskData.requirements || {},
            rewards: taskData.rewards || {},
            timeConstraints: taskData.timeConstraints || {},
            repeatConfig: taskData.repeatConfig || {},
            rateLimits: taskData.rateLimits || {},
            metadata: taskData.metadata || {},
            active: true,
            updatedAt: new Date(),
          })
          .where(eq(JobTasksSchema.id, existing[0].id))
          .returning();
        task = updated;
        logInfoS('[Jobs]', `Updated task ${task.handle} for job ${jobHandle}`);
      } else {
        const [created] = await db
          .insert(JobTasksSchema)
          .values({
            jobId: jobDbId,
            handle: taskData.handle,
            name: taskData.name,
            description: taskData.description,
            taskType: taskData.taskType,
            requirements: taskData.requirements || {},
            rewards: taskData.rewards || {},
            timeConstraints: taskData.timeConstraints || {},
            repeatConfig: taskData.repeatConfig || {},
            rateLimits: taskData.rateLimits || {},
            metadata: taskData.metadata || {},
          })
          .returning();
        task = created;
        logInfoS('[Jobs]', `Created task ${task.handle} for job ${jobHandle}`);
      }

      return this.toTaskDefinition(task);
    } catch (error) {
      logInfoS('[Jobs]', `Task creation failed: ${error}`);
      return null;
    }
  }

  async getAvailableTasks(characterId: number, jobHandle?: string): Promise<Jobs.TaskDefinition[]> {
    try {
      const clockInData = this.clockedInEmployees.get(characterId);
      const resolvedHandle = jobHandle || (clockInData ? clockInData.jobHandle : undefined);
      const job = resolvedHandle ? this.registeredJobs.get(resolvedHandle) : null;

      if (!job || !resolvedHandle) return [];

      const jobDbId = this.jobDbIds.get(resolvedHandle);
      if (!jobDbId) return [];

      const hasJobPermission = await this.checkPermission(characterId, 'JOB', job.handle);
      if (!hasJobPermission) return [];

      const tasks = await db
        .select()
        .from(JobTasksSchema)
        .where(and(eq(JobTasksSchema.jobId, jobDbId), eq(JobTasksSchema.active, true)));

      const available: Jobs.TaskDefinition[] = [];
      for (const task of tasks) {
        const availability = await this.canStartTask(characterId, task.id);
        if (availability.canStart) {
          available.push(this.toTaskDefinition(task));
        }
      }

      return available;
    } catch (error) {
      logInfoS('[Jobs]', `Failed to get available tasks: ${error}`);
      return [];
    }
  }

  async canStartTask(
    characterId: number,
    taskId: number,
  ): Promise<{
    canStart: boolean;
    reason?: string;
    nextAvailableAt?: Date;
    remainingCooldown?: number;
  }> {
    try {
      const hasPermission = await this.checkPermission(characterId, 'TASK', taskId.toString());
      if (!hasPermission) {
        return { canStart: false, reason: 'No permission for this task' };
      }

      const [task] = await db.select().from(JobTasksSchema).where(eq(JobTasksSchema.id, taskId));

      if (!task || !task.active) {
        return { canStart: false, reason: 'Task not found or inactive' };
      }

      const repeatConfig = task.repeatConfig as Jobs.TaskDefinition['repeatConfig'];
      if (!repeatConfig || repeatConfig.type === 'UNLIMITED') {
        return { canStart: true };
      }

      const cooldowns = await db
        .select()
        .from(JobTaskCooldownsSchema)
        .where(and(eq(JobTaskCooldownsSchema.characterId, characterId), eq(JobTaskCooldownsSchema.taskId, taskId)));

      if (cooldowns.length === 0) {
        return { canStart: true };
      }

      const cooldown = cooldowns[0];
      const now = new Date();

      switch (repeatConfig.type) {
        case 'COOLDOWN': {
          const cooldownMs = (repeatConfig.cooldownMinutes || 0) * 60 * 1000;
          const nextAvailableAt = new Date(cooldown.lastCompletedAt.getTime() + cooldownMs);
          if (now < nextAvailableAt) {
            return {
              canStart: false,
              reason: 'Task is on cooldown',
              nextAvailableAt,
              remainingCooldown: nextAvailableAt.getTime() - now.getTime(),
            };
          }
          return { canStart: true };
        }

        case 'BURST': {
          const maxPerHour = repeatConfig.maxPerHour || Infinity;
          if ((cooldown.hourlyCount || 0) >= maxPerHour) {
            const nextAvailableAt = cooldown.hourlyResetAt;
            return {
              canStart: false,
              reason: 'Hourly limit reached',
              nextAvailableAt,
              remainingCooldown: nextAvailableAt.getTime() - now.getTime(),
            };
          }

          const burstSize = repeatConfig.burstSize || 1;
          const totalCount = cooldown.completionCount || 0;
          if (totalCount > 0 && totalCount % burstSize === 0) {
            const burstCooldownMs = (repeatConfig.burstCooldownMinutes || 0) * 60 * 1000;
            const nextAvailableAt = new Date(cooldown.lastCompletedAt.getTime() + burstCooldownMs);
            if (now < nextAvailableAt) {
              return {
                canStart: false,
                reason: 'Burst cooldown active',
                nextAvailableAt,
                remainingCooldown: nextAvailableAt.getTime() - now.getTime(),
              };
            }
          }
          return { canStart: true };
        }

        case 'WINDOW': {
          const maxPerDay = repeatConfig.maxPerDay || Infinity;
          if ((cooldown.dailyCount || 0) >= maxPerDay) {
            const nextAvailableAt = cooldown.dailyResetAt;
            return {
              canStart: false,
              reason: 'Daily limit reached',
              nextAvailableAt,
              remainingCooldown: nextAvailableAt.getTime() - now.getTime(),
            };
          }
          return { canStart: true };
        }

        default:
          return { canStart: true };
      }
    } catch (error) {
      return { canStart: false, reason: 'Error checking task availability' };
    }
  }

  async checkPermission(characterId: number, type: 'JOB' | 'TASK', typeId: string): Promise<boolean> {
    try {
      // Check if any permissions of this type+typeId exist at all
      const allPermissions = await db
        .select()
        .from(JobPermissionsSchema)
        .where(
          and(
            eq(JobPermissionsSchema.type, type),
            eq(JobPermissionsSchema.typeId, typeId),
            isNull(JobPermissionsSchema.revokedAt),
          ),
        );

      // If no permissions are configured for this type+typeId, treat as open access
      if (allPermissions.length === 0) {
        return true;
      }

      // Permissions exist — check if this character has one
      return allPermissions.some((p) => p.characterId === characterId);
    } catch (error) {
      logInfoS('[Jobs]', `Permission check failed: ${error}`);
      return false;
    }
  }

  async grantPermission(
    characterId: number,
    type: 'JOB' | 'TASK',
    typeId: string,
    grantedBy: number,
  ): Promise<boolean> {
    try {
      const existing = await db
        .select()
        .from(JobPermissionsSchema)
        .where(
          and(
            eq(JobPermissionsSchema.characterId, characterId),
            eq(JobPermissionsSchema.type, type),
            eq(JobPermissionsSchema.typeId, typeId),
            isNull(JobPermissionsSchema.revokedAt),
          ),
        );

      if (existing.length > 0) {
        logInfoS('[Jobs]', `Permission ${type}:${typeId} already granted to character ${characterId}`);
        return true;
      }

      await db.insert(JobPermissionsSchema).values({
        characterId,
        type,
        typeId,
        grantedBy,
      });

      logInfoS('[Jobs]', `Granted ${type} permission ${typeId} to character ${characterId}`);
      return true;
    } catch (error) {
      logInfoS('[Jobs]', `Permission grant failed: ${error}`);
      return false;
    }
  }

  async revokePermission(characterId: number, type: 'JOB' | 'TASK', typeId: string): Promise<boolean> {
    try {
      await db
        .update(JobPermissionsSchema)
        .set({ revokedAt: new Date() })
        .where(
          and(
            eq(JobPermissionsSchema.characterId, characterId),
            eq(JobPermissionsSchema.type, type),
            eq(JobPermissionsSchema.typeId, typeId),
            isNull(JobPermissionsSchema.revokedAt),
          ),
        );
      logInfoS('[Jobs]', `Revoked ${type} permission ${typeId} from character ${characterId}`);
      return true;
    } catch (error) {
      logInfoS('[Jobs]', `Permission revoke failed: ${error}`);
      return false;
    }
  }

  async assignTask(characterId: number, taskId: number): Promise<Jobs.TaskInstance | null> {
    try {
      const availability = await this.canStartTask(characterId, taskId);
      if (!availability.canStart) {
        logInfoS('[Jobs]', `Cannot assign task ${taskId}: ${availability.reason}`);
        return null;
      }

      const [instance] = await db
        .insert(JobTaskInstancesSchema)
        .values({
          taskId,
          assignedTo: characterId,
          status: 'ASSIGNED',
          assignedAt: new Date(),
        })
        .returning();

      logInfoS('[Jobs]', `Assigned task ${taskId} to character ${characterId}`);
      return this.toTaskInstance(instance);
    } catch (error) {
      logInfoS('[Jobs]', `Task assignment failed: ${error}`);
      return null;
    }
  }

  // async startTask(jobHandle: string, taskHandle: string): Promise<boolean> {
  //   try {
  //     const [instance] = await db
  //       .select()
  //       .from(JobTaskInstancesSchema)
  //       .where(eq(JobTaskInstancesSchema.id, instanceId));
  //
  //     if (!instance || instance.status !== 'ASSIGNED') {
  //       return false;
  //     }
  //
  //     await db
  //       .update(JobTaskInstancesSchema)
  //       .set({ status: 'IN_PROGRESS', startedAt: new Date() })
  //       .where(eq(JobTaskInstancesSchema.id, instanceId));
  //
  //     logInfoS('[Jobs]', `Started task instance ${instanceId}`);
  //     return true;
  //   } catch (error) {
  //     logInfoS('[Jobs]', `Task start failed: ${error}`);
  //     return false;
  //   }
  // }

  async completeTask(instanceId: number): Promise<{ success: boolean; payment?: number }> {
    try {
      const [instance] = await db
        .select()
        .from(JobTaskInstancesSchema)
        .where(eq(JobTaskInstancesSchema.id, instanceId));

      if (!instance || instance.status !== 'IN_PROGRESS') {
        return { success: false };
      }

      const now = new Date();

      await db
        .update(JobTaskInstancesSchema)
        .set({ status: 'COMPLETED', completedAt: now })
        .where(eq(JobTaskInstancesSchema.id, instanceId));

      await this.updateCooldownOnCompletion(instance.assignedTo!, instance.taskId, now);

      const [task] = await db.select().from(JobTasksSchema).where(eq(JobTasksSchema.id, instance.taskId));

      let payment = 0;
      if (task) {
        const job = this.getJobByDbId(task.jobId);
        if (job && job.paymentType === 'PER_TASK') {
          const rewards = task.rewards as Record<string, string>;
          payment = parseFloat(rewards?.payment || job.paymentAmount || '0');
          if (!isNaN(payment) && payment > 0) {
            await this.processPayment(instance.assignedTo!, payment, `Task completion: ${task.name}`, job.handle);
          }
        }
      }

      logInfoS('[Jobs]', `Completed task instance ${instanceId}`);
      return { success: true, payment };
    } catch (error) {
      logInfoS('[Jobs]', `Task completion failed: ${error}`);
      return { success: false };
    }
  }

  async failTask(instanceId: number): Promise<boolean> {
    try {
      await db
        .update(JobTaskInstancesSchema)
        .set({ status: 'FAILED', completedAt: new Date() })
        .where(eq(JobTaskInstancesSchema.id, instanceId));

      logInfoS('[Jobs]', `Failed task instance ${instanceId}`);
      return true;
    } catch (error) {
      logInfoS('[Jobs]', `Task failure recording failed: ${error}`);
      return false;
    }
  }

  private async processPayment(characterId: number, amount: number, reason: string, jobHandle?: string): Promise<void> {
    try {
      if (isNaN(amount) || amount <= 0) {
        logInfoS('[Jobs]', `Invalid payment amount: ${amount}`);
        return;
      }

      const job = jobHandle ? this.registeredJobs.get(jobHandle) : null;

      await db.insert(JobPaySlipsSchema).values({
        characterId,
        jobId: (jobHandle && this.jobDbIds.get(jobHandle)) || 0,
        amount: amount.toFixed(2),
        reason,
        jobHandle: jobHandle || 'unknown',
      });

      logInfoS('[Jobs]', `Pay slip created for character ${characterId}: $${amount.toFixed(2)} - ${reason}`);
    } catch (error) {
      logInfoS('[Jobs]', `Payment processing failed: ${error}`);
    }
  }

  async getUnredeemedPaySlips(characterId: number): Promise<Jobs.PaySlip[]> {
    try {
      const slips = await db
        .select()
        .from(JobPaySlipsSchema)
        .where(and(eq(JobPaySlipsSchema.characterId, characterId), eq(JobPaySlipsSchema.redeemed, false)));
      return slips.map((slip) => this.toPaySlip(slip));
    } catch (error) {
      logInfoS('[Jobs]', `Failed to get pay slips: ${error}`);
      return [];
    }
  }

  async redeemPaySlip(paySlipId: number): Promise<boolean> {
    try {
      await db
        .update(JobPaySlipsSchema)
        .set({ redeemed: true, redeemedAt: new Date() })
        .where(eq(JobPaySlipsSchema.id, paySlipId));
      return true;
    } catch (error) {
      logInfoS('[Jobs]', `Pay slip redemption failed: ${error}`);
      return false;
    }
  }

  private validateClockInConstraints(job: Jobs.JobDefinition, location?: { x: number; y: number; z: number }): boolean {
    try {
      const constraints = job.clockInConstraints;
      if (!constraints) return true;

      if (constraints.location && location) {
        const distance = Math.sqrt(
          Math.pow(location.x - constraints.location.x, 2) +
            Math.pow(location.y - constraints.location.y, 2) +
            Math.pow(location.z - constraints.location.z, 2),
        );

        if (distance > (constraints.location.radius || 5)) {
          logInfoS('[Jobs]', `Clock-in location constraint not met. Distance: ${distance.toFixed(2)}m`);
          logInfoS('[Jobs]', location, constraints.location);
          return false;
        }
      }

      if (constraints.hours) {
        const currentHour = new Date().getHours();
        if (currentHour < constraints.hours.start || currentHour > constraints.hours.end) {
          logInfoS('[Jobs]', `Clock-in hour constraint not met. Current hour: ${currentHour}`);
          return false;
        }
      }

      if (constraints.daysOfWeek && constraints.daysOfWeek.length > 0) {
        const currentDay = new Date().getDay();
        if (!constraints.daysOfWeek.includes(currentDay)) {
          logInfoS('[Jobs]', `Clock-in day constraint not met. Current day: ${currentDay}`);
          return false;
        }
      }

      return true;
    } catch (error) {
      logInfoS('[Jobs]', `Constraint validation failed: ${error}`);
      return false;
    }
  }

  private startTaskScheduler(): void {
    this.taskScheduler = setInterval(() => {
      this.updateTaskAvailability();
      this.processResets();
      this.cleanupExpiredTasks();
    }, 60000);
    logInfoS('[Jobs]', 'Task scheduler started');
  }

  private async updateTaskAvailability(): Promise<void> {
    try {
      const now = new Date();
      const tasks = await db.select().from(JobTasksSchema).where(eq(JobTasksSchema.active, true));

      for (const task of tasks) {
        const timeConstraints = task.timeConstraints as Jobs.TaskDefinition['timeConstraints'];
        if (!timeConstraints) continue;

        const currentHour = now.getHours();
        const currentDay = now.getDay();

        let withinTimeWindow = true;

        if (timeConstraints.startHour !== undefined && timeConstraints.endHour !== undefined) {
          withinTimeWindow = currentHour >= timeConstraints.startHour && currentHour <= timeConstraints.endHour;
        }

        if (withinTimeWindow && timeConstraints.daysOfWeek && timeConstraints.daysOfWeek.length > 0) {
          withinTimeWindow = timeConstraints.daysOfWeek.includes(currentDay);
        }

        if (!withinTimeWindow) {
          await db
            .update(JobTaskInstancesSchema)
            .set({ status: 'EXPIRED' })
            .where(and(eq(JobTaskInstancesSchema.taskId, task.id), eq(JobTaskInstancesSchema.status, 'AVAILABLE')));
        }
      }
    } catch (error) {
      logInfoS('[Jobs]', `Task availability update failed: ${error}`);
    }
  }

  private async processResets(): Promise<void> {
    try {
      const now = new Date();

      if (now.getMinutes() === 0) {
        const nextHourlyReset = new Date(now);
        nextHourlyReset.setHours(nextHourlyReset.getHours() + 1, 0, 0, 0);

        await db
          .update(JobTaskCooldownsSchema)
          .set({
            hourlyCount: 0,
            hourlyResetAt: nextHourlyReset,
          })
          .where(lt(JobTaskCooldownsSchema.hourlyResetAt, now));

        logInfoS('[Jobs]', 'Processed hourly resets');
      }

      if (now.getHours() === 0 && now.getMinutes() === 0) {
        const nextDailyReset = new Date(now);
        nextDailyReset.setDate(nextDailyReset.getDate() + 1);
        nextDailyReset.setHours(0, 0, 0, 0);

        await db
          .update(JobTaskCooldownsSchema)
          .set({
            dailyCount: 0,
            dailyResetAt: nextDailyReset,
          })
          .where(lt(JobTaskCooldownsSchema.dailyResetAt, now));

        logInfoS('[Jobs]', 'Processed daily resets');
      }
    } catch (error) {
      logInfoS('[Jobs]', `Reset processing failed: ${error}`);
    }
  }

  private async cleanupExpiredTasks(): Promise<void> {
    try {
      const now = new Date();

      const result = await db
        .update(JobTaskInstancesSchema)
        .set({ status: 'EXPIRED' })
        .where(
          and(
            eq(JobTaskInstancesSchema.status, 'AVAILABLE'),
            lt(JobTaskInstancesSchema.expiresAt, now),
            isNotNull(JobTaskInstancesSchema.expiresAt),
          ),
        )
        .returning();

      if (result.length > 0) {
        logInfoS('[Jobs]', `Expired ${result.length} task instances`);
      }
    } catch (error) {
      logInfoS('[Jobs]', `Task cleanup failed: ${error}`);
    }
  }

  private async updateCooldownOnCompletion(characterId: number, taskId: number, completedAt: Date): Promise<void> {
    try {
      const existing = await db
        .select()
        .from(JobTaskCooldownsSchema)
        .where(and(eq(JobTaskCooldownsSchema.characterId, characterId), eq(JobTaskCooldownsSchema.taskId, taskId)));

      const nextHourlyReset = new Date(completedAt);
      nextHourlyReset.setHours(nextHourlyReset.getHours() + 1, 0, 0, 0);

      const nextDailyReset = new Date(completedAt);
      nextDailyReset.setDate(nextDailyReset.getDate() + 1);
      nextDailyReset.setHours(0, 0, 0, 0);

      if (existing.length > 0) {
        await db
          .update(JobTaskCooldownsSchema)
          .set({
            lastCompletedAt: completedAt,
            completionCount: sql`${JobTaskCooldownsSchema.completionCount} + 1`,
            hourlyCount: sql`${JobTaskCooldownsSchema.hourlyCount} + 1`,
            dailyCount: sql`${JobTaskCooldownsSchema.dailyCount} + 1`,
          })
          .where(and(eq(JobTaskCooldownsSchema.characterId, characterId), eq(JobTaskCooldownsSchema.taskId, taskId)));
      } else {
        await db.insert(JobTaskCooldownsSchema).values({
          characterId,
          taskId,
          lastCompletedAt: completedAt,
          completionCount: 1,
          hourlyResetAt: nextHourlyReset,
          hourlyCount: 1,
          dailyResetAt: nextDailyReset,
          dailyCount: 1,
        });
      }
    } catch (error) {
      logInfoS('[Jobs]', `Cooldown update failed: ${error}`);
    }
  }

  async restoreState(): Promise<void> {
    try {
      // Restore DB id mappings for FK references (config comes from game server registration)
      const allJobs = await db.select().from(JobsSchema);
      for (const job of allJobs) {
        this.jobDbIds.set(job.handle, job.id);
      }

      // Restore clocked-in employees — resolve jobId back to handle
      const clockedInEmployees = await db
        .select()
        .from(JobEmployeesSchema)
        .where(and(isNull(JobEmployeesSchema.firedAt), isNotNull(JobEmployeesSchema.clockedInAt)));

      for (const employee of clockedInEmployees) {
        if (employee.clockedInAt) {
          const jobRow = allJobs.find((j) => j.id === employee.jobId);
          if (jobRow) {
            this.clockedInEmployees.set(employee.characterId, {
              jobHandle: jobRow.handle,
              clockedInAt: employee.clockedInAt,
            });
          }
        }
      }

      logInfoS('[Jobs]', `Restored ${this.clockedInEmployees.size} clocked-in employees`);
    } catch (error) {
      logInfoS('[Jobs]', `State restoration failed: ${error}`);
    }
  }

  getRegisteredJobs(): Jobs.JobDefinition[] {
    return Array.from(this.registeredJobs.values());
  }

  getClockedInCount(): number {
    return this.clockedInEmployees.size;
  }

  isCharacterClockedIn(characterId: number): boolean {
    return this.clockedInEmployees.has(characterId);
  }

  getCharacterJob(characterId: number): Jobs.JobDefinition | null {
    const clockInData = this.clockedInEmployees.get(characterId);
    if (!clockInData) return null;
    return this.registeredJobs.get(clockInData.jobHandle) || null;
  }

  private getJobByDbId(dbId: number): Jobs.JobDefinition | null {
    for (const [handle, id] of this.jobDbIds) {
      if (id === dbId) {
        return this.registeredJobs.get(handle) || null;
      }
    }
    return null;
  }

  getJobDbId(handle: string): number | undefined {
    return this.jobDbIds.get(handle);
  }
}

export default JobSystemManager.instance;
