/**
 * Lifecycle subscriptions for job resources.
 *
 * Hooks are notification only. The socket server owns job state and never blocks on
 * the game server, so by the time a hook runs the action has already happened and
 * there is nothing a return value could cancel. Gate work up front with permissions.
 */

/** Widened shape the registry stores under; the public API keeps the payload narrowed. */
type StoredHook = (payload: Jobs.HookPayloads[Jobs.HookType]) => void | Promise<void>;

const hooks = new Map<Jobs.HookType, Map<string, Map<string, StoredHook>>>();

const getMap = (type: Jobs.HookType, jobHandle: string): Map<string, StoredHook> => {
  if (!hooks.has(type)) hooks.set(type, new Map());
  const byJob = hooks.get(type)!;
  if (!byJob.has(jobHandle)) byJob.set(jobHandle, new Map());
  return byJob.get(jobHandle)!;
};

/**
 * Register a callback for a hook type on a specific job.
 * Returns an unregister function.
 */
export const registerJobHook = <TType extends Jobs.HookType>(
  id: string,
  type: TType,
  jobHandle: string,
  fn: Jobs.Hook<TType>,
): (() => void) => {
  console.log(`[Jobs] Registering hook '${id}' for ${type} on job ${jobHandle}`);
  const map = getMap(type, jobHandle);
  map.set(id, fn as StoredHook);
  return () => {
    map.delete(id);
  };
};

/**
 * Dispatch a lifecycle notification to every hook registered for the job.
 * A throwing or rejecting hook is logged and skipped so it cannot silence the rest.
 */
export const runJobHooks = (
  type: Jobs.HookType,
  jobHandle: string,
  payload: Jobs.HookPayloads[Jobs.HookType],
): void => {
  const map = hooks.get(type)?.get(jobHandle);
  if (!map || map.size === 0) return;

  for (const [id, fn] of map) {
    try {
      const result = fn(payload);
      if (result instanceof Promise) {
        result.catch((error: unknown) => {
          console.log(`[Jobs] Hook '${id}' for ${type} on job ${jobHandle} rejected:`, error);
        });
      }
    } catch (error) {
      console.log(`[Jobs] Hook '${id}' for ${type} on job ${jobHandle} threw:`, error);
    }
  }
};
