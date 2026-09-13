declare interface ServerExports {
  trains: Trains.ServerExports;
}

declare namespace Trains {
  type ServerExports = {};
}

// Server perspective - RPC calls to various destinations
declare namespace ServerRPC {
  interface Socket {
    // Add server-to-socket RPC calls here when needed
  }
  interface Client {
    // Add server-to-client RPC calls here when needed
  }
}

// Server perspective - events received from various sources
declare namespace ServerIn {
  interface FromSocket {
    // Add events from socket here when needed
  }
  interface FromClient {
    // Add events from client here when needed
  }
}

// Server perspective - events sent to various destinations
declare namespace ServerOut {
  interface ToSocket {
    // Add events to socket here when needed
  }
  interface ToClient {
    // Add events to client here when needed
  }
}
