declare namespace SocketServer {
  interface ServerExports {
    base: Base.ServerExports;
  }

  interface SocketEvents {
    test: (one: string) => void;
    ['player-management.kick']: (serverId: number, reason: string) => void;
  }
}

declare namespace Base {
  type ServerExports = {
    emitSocket: emitSocket;
    awaitSocket: awaitSocket;
    onSocket: onSocket;
  };

  type emitSocket = <T extends keyof SocketServer.ServerEvents>(
    evtName: T,
    ...params: Parameters<SocketServer.ServerEvents[T]>
  ) => void;

  type awaitSocket = <
    T extends keyof {
      [K in keyof SocketServer.Server]: LastParam<SocketServer.Server[K]> extends () => any ? T : never;
    },
  >(
    evtName: T,
    ...params: DropLastParam<SocketServer.Server[T]>
  ) => Promise<Parameters<LastParam<SocketServer.Server[T]>>[0]>;

  type onSocket = <T extends keyof SocketServer.SocketEvents>(
    evtName: T,
    callback: SocketServer.SocketEvents[T],
  ) => void;

  type PlayerInfo = {
    serverId: number;
    coords?: [number, number, number];
  };
}
