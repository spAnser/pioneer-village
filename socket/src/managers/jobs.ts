import { and, eq, isNotNull, isNull } from 'drizzle-orm';

import { Vector3 } from '../../../lib/math';
import { db } from '../db/connection';
import {
  type JobEmployeeSchemaType,
  JobEmployeesSchema,
  type JobPaySlipSchemaType,
  JobPaySlipsSchema,
  JobPermissionsSchema,
  JobTaskCooldownsSchema,
} from '../db/schema';
import { logInfoS } from '../helpers';

const MINUTE_MS = 60_000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

/** A shift longer than this is a missed clock-out, not work — never pay past it. */
const MAX_PAYABLE_HOURS = 16;
const DEFAULT_CLOCK_IN_RADIUS = 5;

/** Inclusive start, exclusive end, wrapping when start > end (e.g. 22 -> 6). */
const withinHours = (hour: number, start: number, end: number): boolean =>
  start <= end ? hour >= start && hour < end : hour >= start || hour < end;

const toTimestamps = (value: unknown): number[] => {
  const entries: unknown[] = Array.isArray(value) ? value : [];
  return entries.filter((entry): entry is number => typeof entry === 'number').sort((a, b) => a - b);
};

const describeError = (error: unknown): string => (error instanceof Error ? error.message : String(error));

interface SettledShift extends Jobs.ClockResult {
  /** The employment row was written: the hours are banked, so the shift must not be re-armed. */
  settled: boolean;
}

class JobSystemManager {
  static readonly instance: JobSystemManager = new JobSystemManager();

  private jobs = new Map<string, Jobs.JobDefinition>();
  private tasks = new Map<string, Map<string, Jobs.TaskDefinition>>();
  private clockedIn = new Map<number, { jobHandle: string; clockedInAt: number }>();
  private instances = new Map<string, Jobs.TaskInstance>();
  private instancesByCharacter = new Map<number, Set<string>>();
  private instanceSeq = 0;

  // Registration

  registerJob(job: Jobs.JobDefinition): boolean {
    if (!job.handle || !job.name) {
      logInfoS('[Jobs]', 'Rejected job registration: handle and name are required');
      return false;
    }

    if (this.jobs.has(job.handle)) {
      logInfoS('[Jobs]', `Job ${job.handle} already registered, updating...`);
    }

    this.jobs.set(job.handle, job);
    logInfoS('[Jobs]', `Registered job: ${job.handle} - ${job.name}`);
    return true;
  }

  registerTask(jobHandle: string, task: Jobs.TaskDefinition): boolean {
    if (!this.jobs.has(jobHandle)) {
      logInfoS('[Jobs]', `Rejected task ${task.handle}: job ${jobHandle} is not registered`);
      return false;
    }

    if (!task.handle || !task.name) {
      logInfoS('[Jobs]', `Rejected task registration for ${jobHandle}: handle and name are required`);
      return false;
    }

    let jobTasks = this.tasks.get(jobHandle);
    if (!jobTasks) {
      jobTasks = new Map();
      this.tasks.set(jobHandle, jobTasks);
    }

    jobTasks.set(task.handle, task);
    logInfoS('[Jobs]', `Registered task ${jobHandle}:${task.handle} - ${task.name}`);
    return true;
  }

  getRegisteredJobs(): Jobs.JobDefinition[] {
    return Array.from(this.jobs.values());
  }

  getJob(jobHandle: string): Jobs.JobDefinition | null {
    return this.jobs.get(jobHandle) ?? null;
  }

  getTask(jobHandle: string, taskHandle: string): Jobs.TaskDefinition | null {
    return this.tasks.get(jobHandle)?.get(taskHandle) ?? null;
  }

  // Shifts

  async clockIn(characterId: number, jobHandle: string, location?: Vector3Format | null): Promise<Jobs.ClockResult> {
    const job = this.jobs.get(jobHandle);
    if (!job) {
      return { success: false, error: `Job ${jobHandle} is not registered` };
    }

    const current = this.clockedIn.get(characterId);
    if (current) {
      return { success: false, error: `Already clocked in to ${current.jobHandle}` };
    }

    const clockedInAt = new Date();

    // Claim the shift before the first await. Two clock-in events for the same character delivered
    // in one tick would otherwise both pass the gate above and insert two employment rows.
    this.clockedIn.set(characterId, { jobHandle, clockedInAt: clockedInAt.getTime() });

    if (!(await this.checkPermission(characterId, 'JOB', jobHandle))) {
      this.clockedIn.delete(characterId);
      return { success: false, error: 'No permission for this job' };
    }

    const constraintError = this.checkClockInConstraints(job, location);
    if (constraintError) {
      this.clockedIn.delete(characterId);
      return { success: false, error: constraintError };
    }

    // Persisting the rate lets the shift be settled correctly even if the job's resource is gone
    // by the time it ends; only an hourly job has a rate worth remembering.
    const clockedInRate = job.paymentType === 'HOURLY' ? job.paymentAmount : null;

    try {
      const employee = await this.findEmployee(characterId, jobHandle);
      if (employee) {
        await db
          .update(JobEmployeesSchema)
          .set({ clockedInAt, clockedInRate })
          .where(eq(JobEmployeesSchema.id, employee.id));
      } else {
        await db
          .insert(JobEmployeesSchema)
          .values({ characterId, jobHandle, clockedInAt, clockedInRate, hiredAt: clockedInAt });
      }
    } catch (error) {
      this.clockedIn.delete(characterId);
      logInfoS('[Jobs]', `Clock in failed for character ${characterId}: ${describeError(error)}`);
      return { success: false, error: 'Could not record the shift' };
    }

    logInfoS('[Jobs]', `Character ${characterId} clocked in to ${jobHandle}`);

    return { success: true };
  }

  async clockOut(characterId: number): Promise<Jobs.ClockResult> {
    const shift = this.clockedIn.get(characterId);
    if (!shift) {
      return { success: false, error: 'Not clocked in to any job' };
    }

    // Release the shift before the first await. Two clock-out events in one tick would otherwise
    // both pass the gate above and each credit the hours and cut a wage slip.
    this.clockedIn.delete(characterId);

    const { settled, ...result } = await this.settleShift(characterId, shift.jobHandle, shift.clockedInAt);
    if (!settled) {
      this.clockedIn.set(characterId, shift);
    }

    return result;
  }

  isCharacterClockedIn(characterId: number): boolean {
    return this.clockedIn.has(characterId);
  }

  getCharacterJob(characterId: number): Jobs.JobDefinition | null {
    const shift = this.clockedIn.get(characterId);
    if (!shift) return null;
    return this.jobs.get(shift.jobHandle) ?? null;
  }

  getClockedInCount(): number {
    return this.clockedIn.size;
  }

  getClockedIn(): Jobs.ClockedInEntry[] {
    return Array.from(this.clockedIn, ([characterId, shift]) => ({ characterId, jobHandle: shift.jobHandle }));
  }

  // Tasks

  async getAvailableTasks(characterId: number, jobHandle?: string): Promise<Jobs.TaskDefinition[]> {
    const resolvedHandle = jobHandle ?? this.clockedIn.get(characterId)?.jobHandle;
    if (!resolvedHandle || !this.jobs.has(resolvedHandle)) return [];

    const jobTasks = this.tasks.get(resolvedHandle);
    if (!jobTasks) return [];

    if (!(await this.checkPermission(characterId, 'JOB', resolvedHandle))) return [];

    const available: Jobs.TaskDefinition[] = [];
    for (const task of jobTasks.values()) {
      const availability = await this.canStartTask(characterId, resolvedHandle, task.handle);
      if (availability.canStart) {
        available.push(task);
      }
    }

    return available;
  }

  async canStartTask(characterId: number, jobHandle: string, taskHandle: string): Promise<Jobs.TaskAvailability> {
    if (!this.jobs.has(jobHandle)) {
      return { canStart: false, reason: `Job ${jobHandle} is not registered` };
    }

    const task = this.getTask(jobHandle, taskHandle);
    if (!task) {
      return { canStart: false, reason: `Task ${taskHandle} is not registered` };
    }

    const timeError = this.checkTimeConstraints(task);
    if (timeError) {
      return { canStart: false, reason: timeError };
    }

    // Sole gate on the execution path: assignTask and acceptTask reach a task through here and
    // nothing else, so the job-level checks clock-in makes have to be repeated.
    if (this.clockedIn.get(characterId)?.jobHandle !== jobHandle) {
      return { canStart: false, reason: 'Not clocked in to this job' };
    }

    if (!(await this.checkPermission(characterId, 'JOB', jobHandle))) {
      return { canStart: false, reason: 'No permission for this job' };
    }

    if (!(await this.checkPermission(characterId, 'TASK', this.taskPermissionId(jobHandle, taskHandle)))) {
      return { canStart: false, reason: 'No permission for this task' };
    }

    const repeatConfig: Jobs.RepeatConfig = task.repeatConfig ?? { type: 'UNLIMITED' };
    if (repeatConfig.type === 'UNLIMITED') {
      return { canStart: true };
    }

    let completions: number[];
    try {
      completions = await this.getCompletions(characterId, jobHandle, taskHandle);
    } catch (error) {
      logInfoS('[Jobs]', `Cooldown lookup failed for ${jobHandle}:${taskHandle}: ${describeError(error)}`);
      return { canStart: false, reason: 'Could not read task cooldowns' };
    }

    const now = Date.now();
    const lastCompletion = completions.length > 0 ? completions[completions.length - 1] : null;

    switch (repeatConfig.type) {
      case 'COOLDOWN': {
        if (lastCompletion !== null) {
          const nextAvailableAt = lastCompletion + repeatConfig.cooldownMinutes * MINUTE_MS;
          if (now < nextAvailableAt) {
            return {
              canStart: false,
              reason: 'Task is on cooldown',
              nextAvailableAt,
              remainingCooldown: nextAvailableAt - now,
            };
          }
        }

        return this.checkWindow(completions, now, DAY_MS, repeatConfig.maxPerDay, 'Daily limit reached');
      }

      case 'BURST': {
        if (lastCompletion !== null) {
          const burstCooldownMs = repeatConfig.burstCooldownMinutes * MINUTE_MS;
          const nextAvailableAt = lastCompletion + burstCooldownMs;
          if (this.burstLength(completions, burstCooldownMs) >= repeatConfig.burstSize && now < nextAvailableAt) {
            return {
              canStart: false,
              reason: 'Burst cooldown active',
              nextAvailableAt,
              remainingCooldown: nextAvailableAt - now,
            };
          }
        }

        return this.checkWindow(completions, now, HOUR_MS, repeatConfig.maxPerHour, 'Hourly limit reached');
      }

      case 'WINDOW': {
        const windowed = this.checkWindow(
          completions,
          now,
          repeatConfig.windowMinutes * MINUTE_MS,
          repeatConfig.maxPerWindow,
          'Window limit reached',
        );
        if (!windowed.canStart) return windowed;

        return this.checkWindow(completions, now, DAY_MS, repeatConfig.maxPerDay, 'Daily limit reached');
      }
    }
  }

  async assignTask(characterId: number, jobHandle: string, taskHandle: string): Promise<Jobs.TaskInstance | null> {
    // Track before the eligibility await, not after. Cooldowns only exist once a task is
    // completed, so two assignments racing on the same task would both read a clean slate
    // and both be allowed; claiming the slot synchronously makes the second one lose.
    if (this.hasLiveInstance(characterId, jobHandle, taskHandle)) {
      logInfoS('[Jobs]', `Cannot assign ${jobHandle}:${taskHandle} to ${characterId}: already in progress`);
      return null;
    }

    const instance: Jobs.TaskInstance = {
      id: `${jobHandle}:${taskHandle}:${characterId}:${++this.instanceSeq}`,
      jobHandle,
      taskHandle,
      characterId,
      status: 'ASSIGNED',
      progress: {},
      assignedAt: Date.now(),
      startedAt: null,
    };

    this.trackInstance(instance);

    const availability = await this.canStartTask(characterId, jobHandle, taskHandle);
    if (!availability.canStart) {
      this.dropInstance(instance);
      logInfoS('[Jobs]', `Cannot assign ${jobHandle}:${taskHandle} to ${characterId}: ${availability.reason}`);
      return null;
    }

    logInfoS('[Jobs]', `Assigned ${jobHandle}:${taskHandle} to character ${characterId} (${instance.id})`);
    return instance;
  }

  private hasLiveInstance(characterId: number, jobHandle: string, taskHandle: string): boolean {
    return this.getActiveTasks(characterId).some(
      (instance) => instance.jobHandle === jobHandle && instance.taskHandle === taskHandle,
    );
  }

  async acceptTask(characterId: number, jobHandle: string, taskHandle: string): Promise<Jobs.TaskInstance | null> {
    const instance = await this.assignTask(characterId, jobHandle, taskHandle);
    if (!instance) return null;

    return this.startTask(characterId, instance.id);
  }

  async startTask(characterId: number, instanceId: string): Promise<Jobs.TaskInstance | null> {
    const instance = this.ownedInstance(characterId, instanceId);
    if (!instance || instance.status !== 'ASSIGNED') return null;

    instance.status = 'IN_PROGRESS';
    instance.startedAt = Date.now();

    logInfoS('[Jobs]', `Character ${characterId} started ${instanceId}`);
    return instance;
  }

  async updateTaskProgress(
    characterId: number,
    instanceId: string,
    progress: Record<string, unknown>,
  ): Promise<Jobs.TaskInstance | null> {
    const instance = this.ownedInstance(characterId, instanceId);
    if (!instance || instance.status !== 'IN_PROGRESS') return null;

    instance.progress = { ...instance.progress, ...progress };
    return instance;
  }

  async completeTask(characterId: number, instanceId: string): Promise<Jobs.TaskResult> {
    const instance = this.ownedInstance(characterId, instanceId);
    if (!instance) {
      return { success: false, error: 'No such task instance for this character' };
    }

    if (instance.status !== 'IN_PROGRESS') {
      return { success: false, error: 'Task has not been started' };
    }

    const job = this.jobs.get(instance.jobHandle);
    const task = this.getTask(instance.jobHandle, instance.taskHandle);
    if (!job || !task) {
      return { success: false, error: 'Task is no longer registered' };
    }

    // Retire the instance before the first await. Two completion events for the same instance in
    // one tick would otherwise both pass the gate above, metering two completions and paying twice.
    this.dropInstance(instance);

    const recorded = await this.recordCompletion(characterId, instance.jobHandle, instance.taskHandle, Date.now());
    if (!recorded) {
      this.trackInstance(instance);
      return { success: false, error: 'Could not record the completion' };
    }

    let payment = 0;
    if (job.paymentType === 'PER_TASK') {
      const parsed = parseFloat(task.rewards?.payment ?? job.paymentAmount);
      if (!isNaN(parsed) && parsed > 0) {
        payment = parsed;
      }
    }

    if (payment > 0) {
      const paid = await this.processPayment(characterId, instance.jobHandle, payment, `Task completion: ${task.name}`);
      if (!paid) {
        // The completion is already metered, so the instance stays retired: re-arming it would let
        // the same work count against the rate limit a second time.
        return { success: false, error: 'Task recorded but the pay slip could not be created' };
      }
    }

    logInfoS('[Jobs]', `Character ${characterId} completed ${instanceId}`);

    return { success: true, payment };
  }

  async failTask(characterId: number, instanceId: string, reason?: string): Promise<boolean> {
    const instance = this.ownedInstance(characterId, instanceId);
    if (!instance) return false;

    this.dropInstance(instance);
    logInfoS('[Jobs]', `Character ${characterId} failed ${instanceId}${reason ? `: ${reason}` : ''}`);
    return true;
  }

  getActiveTasks(characterId: number): Jobs.TaskInstance[] {
    const owned = this.instancesByCharacter.get(characterId);
    if (!owned) return [];

    const active: Jobs.TaskInstance[] = [];
    for (const id of owned) {
      const instance = this.instances.get(id);
      if (instance) active.push(instance);
    }

    return active;
  }

  // Permissions

  /**
   * Open access until somebody is granted the permission — a deliberate framework
   * default so a job without a roster is usable by everyone.
   */
  async checkPermission(characterId: number, type: 'JOB' | 'TASK', typeId: string): Promise<boolean> {
    try {
      const granted = await db
        .select()
        .from(JobPermissionsSchema)
        .where(
          and(
            eq(JobPermissionsSchema.type, type),
            eq(JobPermissionsSchema.typeId, typeId),
            isNull(JobPermissionsSchema.revokedAt),
          ),
        );

      if (granted.length === 0) return true;

      return granted.some((permission) => permission.characterId === characterId);
    } catch (error) {
      logInfoS('[Jobs]', `Permission check failed for ${type}:${typeId}: ${describeError(error)}`);
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

      await db.insert(JobPermissionsSchema).values({ characterId, type, typeId, grantedBy });

      logInfoS('[Jobs]', `Granted ${type} permission ${typeId} to character ${characterId}`);
      return true;
    } catch (error) {
      logInfoS('[Jobs]', `Permission grant failed for ${type}:${typeId}: ${describeError(error)}`);
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
      logInfoS('[Jobs]', `Permission revoke failed for ${type}:${typeId}: ${describeError(error)}`);
      return false;
    }
  }

  taskPermissionId(jobHandle: string, taskHandle: string): string {
    return `${jobHandle}:${taskHandle}`;
  }

  // Pay

  async getUnredeemedPaySlips(characterId: number): Promise<Jobs.PaySlip[]> {
    try {
      const slips = await db
        .select()
        .from(JobPaySlipsSchema)
        .where(and(eq(JobPaySlipsSchema.characterId, characterId), eq(JobPaySlipsSchema.redeemed, false)));

      return slips.map((slip) => this.toPaySlip(slip));
    } catch (error) {
      logInfoS('[Jobs]', `Failed to read pay slips for character ${characterId}: ${describeError(error)}`);
      return [];
    }
  }

  async redeemPaySlip(
    paySlipId: number,
    characterId: number,
    bankId: string,
  ): Promise<{ success: boolean; amount: number; message?: string; paySlip?: Jobs.PaySlip }> {
    try {
      const [redeemed] = await db
        .update(JobPaySlipsSchema)
        .set({ redeemed: true, redeemedAt: new Date(), bankId })
        .where(
          and(
            eq(JobPaySlipsSchema.id, paySlipId),
            eq(JobPaySlipsSchema.characterId, characterId),
            eq(JobPaySlipsSchema.redeemed, false),
          ),
        )
        .returning();

      if (!redeemed) {
        const message = await this.explainUnredeemable(paySlipId, characterId);
        logInfoS('[Jobs]', `Pay slip ${paySlipId} is not redeemable by character ${characterId}: ${message}`);
        return { success: false, amount: 0, message };
      }

      const amount = parseFloat(redeemed.amount);
      logInfoS(
        '[Jobs]',
        `Pay slip ${paySlipId} redeemed for character ${characterId}: $${amount.toFixed(2)} at bank ${bankId}`,
      );
      return { success: true, amount, paySlip: this.toPaySlip(redeemed) };
    } catch (error) {
      logInfoS('[Jobs]', `Pay slip redemption failed for ${paySlipId}: ${describeError(error)}`);
      return { success: false, amount: 0, message: 'Redemption failed' };
    }
  }

  // Liveness

  async restoreState(): Promise<void> {
    let settled = 0;

    try {
      const orphaned = await db
        .select()
        .from(JobEmployeesSchema)
        .where(and(isNull(JobEmployeesSchema.firedAt), isNotNull(JobEmployeesSchema.clockedInAt)));

      for (const employee of orphaned) {
        if (!employee.clockedInAt) continue;

        const result = await this.settleShift(employee.characterId, employee.jobHandle, employee.clockedInAt.getTime());
        if (result.success) settled++;
      }
    } catch (error) {
      logInfoS('[Jobs]', `State restoration failed: ${describeError(error)}`);
      return;
    }

    logInfoS('[Jobs]', `Settled ${settled} shift(s) orphaned by a restart`);
  }

  async handleDisconnect(characterId: number): Promise<Jobs.ClockResult | null> {
    for (const instance of this.getActiveTasks(characterId)) {
      this.dropInstance(instance);
    }

    const shift = this.clockedIn.get(characterId);
    if (!shift) return null;

    this.clockedIn.delete(characterId);

    const { settled: _settled, ...result } = await this.settleShift(characterId, shift.jobHandle, shift.clockedInAt);
    return result;
  }

  // Internals

  private toPaySlip(slip: JobPaySlipSchemaType): Jobs.PaySlip {
    return {
      id: slip.id,
      characterId: slip.characterId,
      amount: slip.amount,
      reason: slip.reason,
      jobHandle: slip.jobHandle,
      bankId: slip.bankId,
      redeemed: slip.redeemed ?? false,
      createdAt: (slip.createdAt ?? new Date()).getTime(),
    };
  }

  /** Only runs after an atomic redeem matched no row, to report which guard rejected it. */
  private async explainUnredeemable(paySlipId: number, characterId: number): Promise<string> {
    const [slip] = await db.select().from(JobPaySlipsSchema).where(eq(JobPaySlipsSchema.id, paySlipId));

    if (!slip) return 'Pay slip not found';
    if (slip.characterId !== characterId) return 'Pay slip does not belong to this character';
    if (slip.redeemed) return 'Pay slip already redeemed';
    return 'Pay slip is not redeemable';
  }

  private ownedInstance(characterId: number, instanceId: string): Jobs.TaskInstance | null {
    const instance = this.instances.get(instanceId);
    if (!instance || instance.characterId !== characterId) return null;
    return instance;
  }

  private trackInstance(instance: Jobs.TaskInstance): void {
    this.instances.set(instance.id, instance);

    let owned = this.instancesByCharacter.get(instance.characterId);
    if (!owned) {
      owned = new Set();
      this.instancesByCharacter.set(instance.characterId, owned);
    }

    owned.add(instance.id);
  }

  private dropInstance(instance: Jobs.TaskInstance): void {
    this.instances.delete(instance.id);

    const owned = this.instancesByCharacter.get(instance.characterId);
    if (!owned) return;

    owned.delete(instance.id);
    if (owned.size === 0) {
      this.instancesByCharacter.delete(instance.characterId);
    }
  }

  private checkClockInConstraints(job: Jobs.JobDefinition, location?: Vector3Format | null): string | null {
    const constraints = job.clockInConstraints;
    if (!constraints) return null;

    const now = new Date();

    if (constraints.location) {
      if (!location) return 'A clock-in location is required for this job';

      const distance = Vector3.fromObject(location).getDistance(constraints.location);
      if (distance > (constraints.location.radius || DEFAULT_CLOCK_IN_RADIUS)) {
        return `Too far from the clock-in point (${distance.toFixed(1)}m)`;
      }
    }

    if (constraints.hours && !withinHours(now.getHours(), constraints.hours.start, constraints.hours.end)) {
      return `This job only takes clock-ins between ${constraints.hours.start}:00 and ${constraints.hours.end}:00`;
    }

    if (constraints.daysOfWeek?.length && !constraints.daysOfWeek.includes(now.getDay())) {
      return 'This job is not worked today';
    }

    return null;
  }

  private checkTimeConstraints(task: Jobs.TaskDefinition): string | null {
    const constraints = task.timeConstraints;
    if (!constraints) return null;

    const now = new Date();

    if (
      constraints.startHour !== undefined &&
      constraints.endHour !== undefined &&
      !withinHours(now.getHours(), constraints.startHour, constraints.endHour)
    ) {
      return `Task is only available between ${constraints.startHour}:00 and ${constraints.endHour}:00`;
    }

    if (constraints.daysOfWeek?.length && !constraints.daysOfWeek.includes(now.getDay())) {
      return 'Task is not available today';
    }

    return null;
  }

  /** Blocks once `max` completions sit inside the trailing window; the ETA is when the oldest of them ages out. */
  private checkWindow(
    completions: number[],
    now: number,
    windowMs: number,
    max: number | undefined,
    reason: string,
  ): Jobs.TaskAvailability {
    if (max === undefined) return { canStart: true };
    if (max <= 0) return { canStart: false, reason };

    const inWindow = completions.filter((completedAt) => completedAt > now - windowMs);
    if (inWindow.length < max) return { canStart: true };

    const nextAvailableAt = inWindow[inWindow.length - max] + windowMs;
    return { canStart: false, reason, nextAvailableAt, remainingCooldown: Math.max(0, nextAvailableAt - now) };
  }

  /** Completions since the last gap long enough to have ended a burst. */
  private burstLength(completions: number[], burstCooldownMs: number): number {
    let length = 0;

    for (let index = completions.length - 1; index >= 0; index--) {
      if (index < completions.length - 1 && completions[index + 1] - completions[index] >= burstCooldownMs) break;
      length++;
    }

    return length;
  }

  private async findEmployee(characterId: number, jobHandle: string): Promise<JobEmployeeSchemaType | null> {
    const [employee] = await db
      .select()
      .from(JobEmployeesSchema)
      .where(
        and(
          eq(JobEmployeesSchema.characterId, characterId),
          eq(JobEmployeesSchema.jobHandle, jobHandle),
          isNull(JobEmployeesSchema.firedAt),
        ),
      );

    return employee ?? null;
  }

  private async settleShift(characterId: number, jobHandle: string, clockedInAt: number): Promise<SettledShift> {
    const hoursWorked = Math.min(Math.max(0, (Date.now() - clockedInAt) / HOUR_MS), MAX_PAYABLE_HOURS);

    let payment = 0;

    try {
      const employee = await this.findEmployee(characterId, jobHandle);
      if (!employee) {
        return { settled: false, success: false, error: `No employment record for ${jobHandle}` };
      }

      payment = this.hourlyPayment(jobHandle, employee.clockedInRate, hoursWorked);

      await db
        .update(JobEmployeesSchema)
        .set({
          clockedInAt: null,
          clockedInRate: null,
          totalHoursWorked: (parseFloat(employee.totalHoursWorked ?? '0') + hoursWorked).toFixed(4),
        })
        .where(eq(JobEmployeesSchema.id, employee.id));
    } catch (error) {
      logInfoS('[Jobs]', `Clock out failed for character ${characterId}: ${describeError(error)}`);
      return { settled: false, success: false, error: 'Could not record the shift' };
    }

    if (payment > 0 && !(await this.processPayment(characterId, jobHandle, payment, 'Hourly wages'))) {
      return {
        settled: true,
        success: false,
        hoursWorked,
        error: 'Shift recorded but the pay slip could not be created',
      };
    }

    logInfoS(
      '[Jobs]',
      `Character ${characterId} clocked out of ${jobHandle}. Hours: ${hoursWorked.toFixed(2)}, Payment: $${payment.toFixed(2)}`,
    );

    return { settled: true, success: true, hoursWorked, payment };
  }

  /**
   * The live job definition is authoritative, but a shift can outlive it — a boot-time settle runs
   * before any resource has re-registered its job — so the rate captured at clock-in is the
   * fallback that keeps those wages from settling at zero.
   */
  private hourlyPayment(jobHandle: string, clockedInRate: string | null, hoursWorked: number): number {
    const job = this.jobs.get(jobHandle);
    const source = job ? (job.paymentType === 'HOURLY' ? job.paymentAmount : null) : clockedInRate;
    if (source === null) return 0;

    const rate = parseFloat(source);
    if (isNaN(rate) || rate <= 0) return 0;

    return rate * hoursWorked;
  }

  private async processPayment(
    characterId: number,
    jobHandle: string,
    amount: number,
    reason: string,
  ): Promise<boolean> {
    if (isNaN(amount) || amount <= 0) {
      logInfoS('[Jobs]', `Refused pay slip for character ${characterId}: invalid amount ${amount}`);
      return false;
    }

    try {
      await db.insert(JobPaySlipsSchema).values({ characterId, jobHandle, amount: amount.toFixed(2), reason });
    } catch (error) {
      logInfoS('[Jobs]', `Pay slip creation failed for character ${characterId}: ${describeError(error)}`);
      return false;
    }

    logInfoS('[Jobs]', `Pay slip created for character ${characterId}: $${amount.toFixed(2)} - ${reason}`);
    return true;
  }

  private async getCompletions(characterId: number, jobHandle: string, taskHandle: string): Promise<number[]> {
    const [cooldown] = await db
      .select()
      .from(JobTaskCooldownsSchema)
      .where(
        and(
          eq(JobTaskCooldownsSchema.characterId, characterId),
          eq(JobTaskCooldownsSchema.jobHandle, jobHandle),
          eq(JobTaskCooldownsSchema.taskHandle, taskHandle),
        ),
      );

    return toTimestamps(cooldown?.completions);
  }

  /** Keeps a trailing day of completion stamps; every rate limit is derived from them. */
  private async recordCompletion(
    characterId: number,
    jobHandle: string,
    taskHandle: string,
    completedAt: number,
  ): Promise<boolean> {
    try {
      // Pruning needs the stamps that are already stored and a json column cannot be filtered in
      // place, so the array is merged here. The upsert is what makes the write safe: a completion
      // racing this one merges into the same row instead of adding a second one for the pair.
      const completions = [...(await this.getCompletions(characterId, jobHandle, taskHandle)), completedAt].filter(
        (stamp) => stamp > completedAt - DAY_MS,
      );
      const lastCompletedAt = new Date(completedAt);

      await db
        .insert(JobTaskCooldownsSchema)
        .values({ characterId, jobHandle, taskHandle, lastCompletedAt, completions })
        .onConflictDoUpdate({
          target: [
            JobTaskCooldownsSchema.characterId,
            JobTaskCooldownsSchema.jobHandle,
            JobTaskCooldownsSchema.taskHandle,
          ],
          set: { lastCompletedAt, completions },
        });

      return true;
    } catch (error) {
      logInfoS('[Jobs]', `Cooldown update failed for ${jobHandle}:${taskHandle}: ${describeError(error)}`);
      return false;
    }
  }
}

export default JobSystemManager.instance;
