import { Socket } from 'socket.io-client';

import { onClientCall } from '@lib/ui';

/**
 * Every jobs call is a plain RPC relay: the game client owns the player context
 * (coords, ped state) and the socket server owns the truth, so the UI only
 * carries the request across. Each forward is spelled out rather than looped so
 * the arity and payload of both halves are checked against the contract — the
 * loop this replaced hid a forward for `jobs.assign-task`, a game-server-only
 * event the client could never have called.
 */
export default (socket: Socket<SocketOut.ToClient, SocketIn.FromClient>): void => {
  onClientCall('jobs.get-state', () => new Promise((resolve) => socket.emit('jobs.get-state', resolve)));

  onClientCall(
    'jobs.clock-in',
    (jobHandle, location) => new Promise((resolve) => socket.emit('jobs.clock-in', jobHandle, location, resolve)),
  );

  onClientCall('jobs.clock-out', () => new Promise((resolve) => socket.emit('jobs.clock-out', resolve)));

  onClientCall(
    'jobs.get-available-tasks',
    (jobHandle) => new Promise((resolve) => socket.emit('jobs.get-available-tasks', jobHandle, resolve)),
  );

  onClientCall(
    'jobs.can-start-task',
    (jobHandle, taskHandle) =>
      new Promise((resolve) => socket.emit('jobs.can-start-task', jobHandle, taskHandle, resolve)),
  );

  onClientCall(
    'jobs.accept-task',
    (jobHandle, taskHandle) => new Promise((resolve) => socket.emit('jobs.accept-task', jobHandle, taskHandle, resolve)),
  );

  onClientCall(
    'jobs.start-task',
    (instanceId) => new Promise((resolve) => socket.emit('jobs.start-task', instanceId, resolve)),
  );

  onClientCall(
    'jobs.update-task-progress',
    (instanceId, progress) =>
      new Promise((resolve) => socket.emit('jobs.update-task-progress', instanceId, progress, resolve)),
  );

  onClientCall(
    'jobs.complete-task',
    (instanceId) => new Promise((resolve) => socket.emit('jobs.complete-task', instanceId, resolve)),
  );

  onClientCall(
    'jobs.fail-task',
    (instanceId, reason) => new Promise((resolve) => socket.emit('jobs.fail-task', instanceId, reason, resolve)),
  );

  onClientCall('jobs.get-active-tasks', () => new Promise((resolve) => socket.emit('jobs.get-active-tasks', resolve)));

  onClientCall('jobs.get-pay-slips', () => new Promise((resolve) => socket.emit('jobs.get-pay-slips', resolve)));

  onClientCall(
    'jobs.redeem-pay-slip',
    (paySlipId, bankId) => new Promise((resolve) => socket.emit('jobs.redeem-pay-slip', paySlipId, bankId, resolve)),
  );
};
