declare interface ClientExports {
  ['traintrack-editor']: TraintrackEditor.ClientExports;
}

declare namespace TraintrackEditor {
  type ClientExports = {};
}

// Client perspective - RPC calls to various destinations
declare namespace ClientRPC {
  interface Socket {
    // Add resource RPC calls here when needed
  }
}

// Client perspective - events received from various sources
declare namespace ClientIn {
  interface FromSocket {
    // Add resource events from socket here when needed
  }
}

// Client perspective - events sent to various destinations
declare namespace ClientOut {
  interface ToSocket {
    // Add resource events to socket here when needed
  }
}

// Raw Socket.io events for UI layer typing
// Set any events also in /socket/src/types.d.ts
declare namespace SocketIO {
  interface Events {
    // Add resource socket.io events here when needed
  }
}
