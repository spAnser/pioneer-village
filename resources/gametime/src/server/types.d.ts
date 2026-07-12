// Server perspective - events sent to various destinations
declare namespace ServerOut {
  interface ToClient {
    ['gametime:sync']: (state: import('../shared/types').GameTimeState) => void;
  }
}

// Server perspective - RPC calls from client
declare namespace ServerRPC {
  interface Client {
    ['gametime.getState']: () => import('../shared/types').GameTimeState;
  }
}
