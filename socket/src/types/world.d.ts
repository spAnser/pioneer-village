declare namespace SocketServer {
  interface Server {
    ['world.registered-objects']: (callback: (data: Record<string, number>) => void) => void;
  }

  interface ServerEvents {
    ['world.register-object']: (name: string, netId: number) => void;
    ['world.unregister-object']: (name: string) => void;
  }

  interface Client {}

  interface ClientEvents {
    ['world.registered-objects']: (callback: (data: Record<string, number>) => void) => void;
    ['world.request-creation']: (name: string, callback: (success: boolean) => void) => void;
    ['world.register-object']: (name: string, id: number) => void;
    ['world.unregister-object']: (name: string) => void;
  }
}
