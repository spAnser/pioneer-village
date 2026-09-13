import { awaitSocket, exports } from '@lib/server';

import { registerJobHook } from './hooks';

/**
 * Who is on the clock, keyed by character id, valued by job handle.
 *
 * The socket server stays authoritative. This mirror only exists because the two
 * lookups below are declared synchronous and an RPC round trip cannot answer
 * synchronously. server.ts keeps it current from the `jobs.hook` envelope.
 */
const clockedIn = new Map<number, string>();

export const setClockedIn = (characterId: number, jobHandle: string): void => {
  clockedIn.set(characterId, jobHandle);
};

export const setClockedOut = (characterId: number): void => {
  clockedIn.delete(characterId);
};

/**
 * Replace the mirror with the socket server's roster of open shifts.
 *
 * A shift already in progress emits no further `onClockIn`, so an incremental feed
 * alone can never recover the entries this resource missed while it was down. The
 * map is only cleared once the roster has arrived, so a failed round trip leaves
 * whatever the mirror already knew intact.
 */
export const seedClockedIn = async (): Promise<void> => {
  try {
    const entries = await awaitSocket('jobs.get-clocked-in');
    clockedIn.clear();
    for (const entry of entries) {
      clockedIn.set(entry.characterId, entry.jobHandle);
    }
  } catch (error) {
    console.log(`[Jobs] Clocked-in seed failed:`, error);
  }
};

const registerJob: Jobs.ServerExports['registerJob'] = async (jobData) => {
  try {
    return await awaitSocket('jobs.register-job', jobData);
  } catch (error) {
    console.log(`[Jobs] Job registration failed:`, jobData.handle, error);
    return false;
  }
};

const registerTask: Jobs.ServerExports['registerTask'] = async (jobHandle, taskData) => {
  try {
    return await awaitSocket('jobs.register-task', jobHandle, taskData);
  } catch (error) {
    console.log(`[Jobs] Task registration failed:`, jobHandle, taskData.handle, error);
    return false;
  }
};

const grantPermission: Jobs.ServerExports['grantPermission'] = async (characterId, type, typeId, grantedBy) => {
  try {
    return await awaitSocket('jobs.grant-permission', characterId, type, typeId, grantedBy);
  } catch (error) {
    console.log(`[Jobs] Permission grant failed:`, characterId, type, typeId, error);
    return false;
  }
};

const revokePermission: Jobs.ServerExports['revokePermission'] = async (characterId, type, typeId) => {
  try {
    return await awaitSocket('jobs.revoke-permission', characterId, type, typeId);
  } catch (error) {
    console.log(`[Jobs] Permission revoke failed:`, characterId, type, typeId, error);
    return false;
  }
};

const taskPermissionId: Jobs.ServerExports['taskPermissionId'] = (jobHandle, taskHandle) =>
  `${jobHandle}:${taskHandle}`;

const assignTask: Jobs.ServerExports['assignTask'] = async (characterId, jobHandle, taskHandle) => {
  try {
    return await awaitSocket('jobs.assign-task', characterId, jobHandle, taskHandle);
  } catch (error) {
    console.log(`[Jobs] Task assign failed:`, characterId, jobHandle, taskHandle, error);
    return null;
  }
};

const completeTask: Jobs.ServerExports['completeTask'] = async (characterId, instanceId) => {
  try {
    return await awaitSocket('jobs.complete-task', characterId, instanceId);
  } catch (error) {
    console.log(`[Jobs] Task complete failed:`, characterId, instanceId, error);
    return { success: false, error: 'Socket server unreachable' };
  }
};

const failTask: Jobs.ServerExports['failTask'] = async (characterId, instanceId, reason) => {
  try {
    return await awaitSocket('jobs.fail-task', characterId, instanceId, reason ?? '');
  } catch (error) {
    console.log(`[Jobs] Task fail failed:`, characterId, instanceId, error);
    return false;
  }
};

const getActiveTasks: Jobs.ServerExports['getActiveTasks'] = async (characterId) => {
  try {
    return await awaitSocket('jobs.get-active-tasks', characterId);
  } catch (error) {
    console.log(`[Jobs] Active task lookup failed:`, characterId, error);
    return [];
  }
};

const isCharacterClockedIn: Jobs.ServerExports['isCharacterClockedIn'] = (characterId) => clockedIn.has(characterId);

const getCharacterJob: Jobs.ServerExports['getCharacterJob'] = (characterId) => clockedIn.get(characterId) ?? null;

exports<'jobs'>('registerJob', registerJob);
exports<'jobs'>('registerTask', registerTask);
exports<'jobs'>('grantPermission', grantPermission);
exports<'jobs'>('revokePermission', revokePermission);
exports<'jobs'>('taskPermissionId', taskPermissionId);
exports<'jobs'>('assignTask', assignTask);
exports<'jobs'>('completeTask', completeTask);
exports<'jobs'>('failTask', failTask);
exports<'jobs'>('getActiveTasks', getActiveTasks);
exports<'jobs'>('isCharacterClockedIn', isCharacterClockedIn);
exports<'jobs'>('getCharacterJob', getCharacterJob);
exports<'jobs'>('registerJobHook', registerJobHook);
