// Callback return value — return false to cancel the action, anything else proceeds.
type DoorHookResult = boolean | void;
type DoorHook = (doorHash: number) => DoorHookResult | Promise<DoorHookResult>;

export type DoorHookType =
  | 'beforeUnlock'
  | 'afterUnlock'
  | 'beforeLock'
  | 'afterLock'
  | 'onInteract'
  | 'onLockpick';

const hooks = new Map<DoorHookType, Map<number, Map<string, DoorHook>>>();

const getMap = (type: DoorHookType, doorHash: number): Map<string, DoorHook> => {
  if (!hooks.has(type)) hooks.set(type, new Map());
  const byDoor = hooks.get(type)!;
  if (!byDoor.has(doorHash)) byDoor.set(doorHash, new Map());
  return byDoor.get(doorHash)!;
};

/**
 * Register a callback for a specific hook type and door hash.
 * Returns an unregister function.
 *
 * Returning false from a hook cancels the action (only applies to before* and onInteract/onLockpick).
 */
export const registerDoorHook = (id: string, type: DoorHookType, doorHash: number, fn: DoorHook): (() => void) => {
  console.log(`[Doors] Registering hook '${id}' for ${type} on door ${doorHash}`);
  getMap(type, doorHash).set(id, fn);
  return () => getMap(type, doorHash).delete(id);
};

/**
 * Run all hooks for a given type and door.
 * Returns false if any hook cancelled, true otherwise.
 */
export const runDoorHooks = async (type: DoorHookType, doorHash: number): Promise<boolean> => {
  console.log(`[Doors] Running hooks for ${type} on door ${doorHash}`);
  const map = hooks.get(type)?.get(doorHash);
  if (!map || map.size === 0) return true;
  console.log(`[Doors] Found ${map.size} hooks to run for ${type} on door ${doorHash}`);

  for (const [, fn] of map) {
    const result = await fn(doorHash);
    if (result === false) return false;
  }

  console.log(`[Doors] All hooks completed for ${type} on door ${doorHash}`);
  return true;
};
