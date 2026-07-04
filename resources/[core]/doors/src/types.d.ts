declare namespace Doors {
  enum State {
    Invalid = -1,
    UNLOCKED,
    LOCKED_UNBREAKABLE,
    LOCKED_BREAKABLE,
    HOLD_OPEN_POSITIVE,
    HOLD_OPEN_NEGATIVE,
  }

  interface Data {
    entity: number;
    netId: number;
    state: State;
    coords: Vector3Format;
  }
}

// Extend the ClientOut.ToSocket namespace with doors-specific socket events
declare namespace ClientOut {
  interface ToSocket {
    'doors.set-door-state': (doorHash: number, state: Doors.State) => void;
    'doors.set-door-state-bypass': (doorHash: number, state: Doors.State) => void;
  }
}
