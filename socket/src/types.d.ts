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
    ['character-update.last-position']: (serverId: number, coords: Vector3Format) => void;
    ['character-event.disconnected']: (serverId: number) => void;
    ['character-get.food-drink']: (charId: number, cb: (food: number, drink: number) => void) => void;
    ['character-get.health-metadata']: (charId: number, cb: (metadata: CharacterHealthMetadata) => void) => void;
    ['character-get.currencies']: (serverId: number, cb: (currencies: CharacterCurrencies) => void) => void;
  };

  type Client = {
    ['doors.get-door-states']: (callback: (data: [number, number][]) => void) => void;
    ['doors.set-door-state']: (doorHash: number, state: number) => void;
  };

  type ClientEvents = {
    chatSend: (chatSend: UI.Chat.Send) => void;

    getCharacters: (callback: (characters: Game.Character[]) => void) => void;
    createCharacter: (characterData: Game.Character, faceData: Game.Face, callback: () => void) => void;

    ['character-select.choose']: (characterId: number, steam: Game.playerSteamId) => void;

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
    ['character-update.food-drink']: (food: number, water: number) => void;
    ['character-update.health-status']: (
      boneHealth: Map<number, number>,
      boneStatus: Map<number, Health.BoneStatus>,
      sick: boolean,
      activeTonic: boolean,
      health: number,
      stamina: number,
      litersOfBlood: number,
    ) => void;
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

declare interface CharacterHealthMetadata {
  health: number;
  stamina: number;
  boneHealth: any[];
  boneStatus: any[];
  sick: boolean;
  activeTonic: boolean;
  litersOfBlood: number;
}

declare interface CharacterCurrencies {
  dollars: number;
  gold: number;
}

declare interface CharacterData {
  id: number;
  accountId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  createdAt: string;
  deletedAt: string | undefined;
  lastX: number;
  lastY: number;
  lastZ: number;
  model: string;
  food: number;
  steamId: string;
  currencies: CharacterCurrencies;
  healthMetadata: CharacterHealthMetadata;
  drink: number;
  face: Game.Face;
  components: number[];
  source: number;
  socket: any;
  userId: number;
  offline: boolean;
}
