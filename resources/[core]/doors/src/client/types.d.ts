declare interface ClientExports {
  doors: Doors.ClientExports;
}

declare namespace Doors {
  type LockDoor = (doorHash: number) => void;
  type UnlockDoor = (doorHash: number) => void;
  type SetDoorState = (doorHash: number, state: number) => void;
  type GetClosestDoor = () => number | null;
  type CloseDoor = (doorHash: number, durationMultiplier?: number) => void;

  interface ClientExports {
    lockDoor: LockDoor;
    unlockDoor: UnlockDoor;
    setDoorState: SetDoorState;
    getClosestDoor: GetClosestDoor;
    closeDoor: CloseDoor;
  }

  namespace Events {
    type SetDoorState = (doorHash: number, state: number) => void;
  }
}

declare interface UIRPC {}

declare interface UIEvents {
  ['doors.set-door-state']: Doors.Events.SetDoorState;
}

declare interface ClientForwardEvents {
  ['doors.set-door-state']: Doors.Events.SetDoorState;
}

declare interface SocketForwardEvents {
  ['doors.set-door-state']: Doors.Events.SetDoorState;
}
