declare interface RPC {}

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
