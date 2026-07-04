// Socket perspective - what the socket server receives
declare namespace SocketIn {
  interface FromGameServer {}
  
  interface FromClient {
    'doors.get-door-states': (callback: (doorStates: [number, number][]) => void) => void;
    'doors.set-door-state': (doorHash: number, state: number, pairedHash?: number) => void;
    'doors.set-door-state-bypass': (doorHash: number, state: number, pairedHash?: number) => void;
  }
}

// Socket perspective - what the socket server sends
declare namespace SocketOut {
  interface ToGameServer {}
  
  interface ToClient {
    'doors.set-door-state': (doorHash: number, state: number) => void;
  }
}

// Keep backward compatibility during migration
declare namespace SocketServer {
  interface Server extends SocketIn.FromGameServer {}
  interface ServerEvents extends SocketOut.ToGameServer {}
  interface Client extends SocketOut.ToClient {}
  interface ClientEvents extends SocketIn.FromClient {}
}
