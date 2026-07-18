// Client perspective - events received from various sources
declare namespace ClientIn {
  interface FromServer {
    ['gametime.sync']: (state: import('../shared/types').GameTimeState) => void;
  }
}

// Client perspective - RPC calls to various destinations
declare namespace ClientRPC {
  interface Server {
    ['gametime.getState']: () => import('../shared/types').GameTimeState;
  }
}
