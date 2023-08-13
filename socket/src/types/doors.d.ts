declare namespace SocketServer {
  interface Server {}

  interface ServerEvents {}

  interface Client {
    ['doors.get-door-states']: (callback: (data: [number, number][]) => void) => void;
    ['doors.set-door-state']: (doorHash: number, state: number) => void;
  }

  interface ClientEvents {
    ['doors.get-door-states']: (callback: (data: [number, number][]) => void) => void;
    ['doors.set-door-state']: (doorHash: number, state: number) => void;
  }
}
