declare namespace World {}

declare interface UIRPC {
  ['world.registered-objects']: () => Record<string, number>;
  ['world.request-creation']: (name: string) => boolean;

  ['stable.load-character-horses']: (characterId: number) => Horse.Data[];

  ['doors.get-door-states']: () => [doorHash: number, state: number][];
}

declare interface SocketForwardEvents {
  ['world.register-object']: (name: string, id: number) => void;
  ['world.unregister-object']: (name: string) => void;
}
