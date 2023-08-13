declare namespace SocketServer {
  interface Server {
    ['stable.load-character-horses']: (characterId: number, callback: (data: Horse.Data[]) => void) => void;
  }

  interface ServerEvents {}

  interface Client {}

  interface ClientEvents {
    ['stable.load-character-horses']: (characterId: number, callback: (data: Horse.Data[]) => void) => void;
  }
}
