declare namespace SocketServer {
  type Server = {
    getAccount: (identifiers: Record<string, string>, callback: (whitelist: {}) => void) => void;
    generateJWT: (serverId: number, identifiers: Record<string, string>, callback: (jwt: string) => void) => void;

    createInventory: (identifier: string, inventoryType: number, callback: (inventory: boolean) => void) => void;
    inventoryAddItem: (
      identifier: string,
      itemId: number,
      amount: number,
      metadata: Record<string, any>,
      callback: (success: boolean) => void,
    ) => void;
    ['world.registered-objects']: (callback: (data: Record<string, number>) => void) => void;
    ['stable.load-character-horses']: (characterId: number, callback: (data: Horse.Data[]) => void) => void;
  };

  type ServerEvents = {
    connectedPlayers: (players: Base.PlayerInfo[]) => void;
    inventoryAddItem: (
      identifier: string,
      itemId: number,
      amount: number,
      metadata: Record<string, any>,
      callback: (success: boolean) => void,
    ) => void;
    ['world.register-object']: (name: string, netId: number) => void;
    ['world.unregister-object']: (name: string) => void;
  };

  type Client = {
    ['doors.get-door-states']: (callback: (data: [number, number][]) => void) => void;
    ['doors.set-door-state']: (doorHash: number, state: number) => void;
  };

  type ClientEvents = {
    chatSend: (chatSend: UI.Chat.Send) => void;

    getCharacters: (callback: (characters: Game.Character[]) => void) => void;
    createCharacter: (characterData: Game.Character, faceData: Game.Face, callback: () => void) => void;

    ['character-select.choose']: (characterId: number) => void;

    inventorySubscribe: (identifier: string) => void;
    inventoryUnsubscribe: (identifier: string) => void;
    inventoryStack: (oldIdentifier: string, oldSlot: number, newIdentifier: string, newSlot: number) => void;
    inventoryMove: (oldIdentifier: string, oldSlot: number, newIdentifier: string, newSlot: number) => void;

    ['world.registered-objects']: (callback: (data: Record<string, number>) => void) => void;
    ['world.request-creation']: (name: string, callback: (success: boolean) => void) => void;
    ['world.register-object']: (name: string, id: number) => void;
    ['world.unregister-object']: (name: string) => void;

    ['stable.load-character-horses']: (characterId: number, callback: (data: Horse.Data[]) => void) => void;

    ['doors.get-door-states']: (callback: (data: [number, number][]) => void) => void;
    ['doors.set-door-state']: (doorHash: number, state: number) => void;
  };
}

// type onClient = <T extends keyof NetEvents>(evtName: T, callback: (...args: Parameters<NetEvents[T]>) => void) => void;

declare namespace Collection {
  type inventory = {
    _id?: number;
    identifier: string;
    metadata: string;
    container: {
      _id?: number;
      locked: boolean;
      sealed: 'NONE' | 'SEALED' | 'BROKEN';
      items: {
        _id?: number;
        identifier: number;
        metadata: string;
        quantity: number;
        createdAt: Date;
        deletedAt: Date;
      }[];
    };
  };
}

declare interface String {
  GetHashKey(): number;
}
