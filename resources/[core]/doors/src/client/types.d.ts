declare interface ClientExports {
  doors: Doors.ClientExports;
}

declare namespace Doors {
  type HookType =
    | 'beforeUnlock'
    | 'afterUnlock'
    | 'beforeLock'
    | 'afterLock'
    | 'onInteract'
    | 'onLockpick';

  type HookCallback = (doorHash: number) => boolean | void | Promise<boolean | void>;

  type LockDoor = (doorHash: number) => void;
  type UnlockDoor = (doorHash: number) => void;
  type SetDoorState = (doorHash: number, state: number) => void;
  type GetClosestDoor = () => number | null;
  type GetClosestDoorToCoords = (coords: Vector3Format) => number | null;
  type CloseDoor = (doorHash: number, durationMultiplier?: number) => void;
  type AttemptLockpick = (doorHash: number) => void;
  /** Register a hook callback for a door. Returns an unregister function. */
  type OnDoorHook = (id: string, type: HookType, doorHash: number, fn: HookCallback) => () => void;

  interface ClientExports {
    lockDoor: LockDoor;
    unlockDoor: UnlockDoor;
    setDoorState: SetDoorState;
    getClosestDoor: GetClosestDoor;
    getClosestDoorToCoords: GetClosestDoorToCoords;
    closeDoor: CloseDoor;
    attemptLockpick: AttemptLockpick;
    onDoorHook: OnDoorHook;
  }
}

// Client perspective - RPC calls to various destinations
declare namespace ClientRPC {
  interface Socket {
    ['doors.get-door-states']: () => [doorHash: number, state: number][];
  }
}

// Client perspective - events received from various sources
declare namespace ClientIn {
  interface FromSocket {
    ['doors.set-door-state']: (doorHash: number, state: number, pairedHash?: number) => void;
    ['doors.indicator']: (indicators: UI.Door.Indicator[]) => void;
  }
}

// Client perspective - events sent to various destinations
declare namespace ClientOut {
  interface ToSocket {
    ['doors.set-door-state']: (doorHash: number, state: number, pairedHash?: number) => void;
  }
}

// Raw Socket.io events for UI layer typing - DEDUPLICATED
// Note: SocketIO.Events eliminated - use ClientRPC.Socket for RPC calls and ClientIn/ClientOut for events
