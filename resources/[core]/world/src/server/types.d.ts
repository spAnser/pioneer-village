declare namespace SocketServer {
  interface SocketEvents {
    netIdExists: (id: number, cb: (valid: boolean) => void) => void;
  }
}

declare namespace World {}
