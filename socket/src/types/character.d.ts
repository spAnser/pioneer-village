// Extend the socket namespaces with character-specific events
declare namespace SocketIn {
  interface FromGameServer {
    ['character-update.last-position']: (serverId: number, coords: Vector3Format) => void;
    ['character-event.disconnected']: (serverId: number) => void;
    ['character-get.food-drink']: (charId: number, cb: (food: number, drink: number) => void) => void;
    ['character-get.health-metadata']: (charId: number, cb: (metadata: CharacterHealthMetadata) => void) => void;
  }

  interface FromClient {
    getCharacters: (callback: (characters: Game.Character[]) => void) => void;
    createCharacter: (characterData: any, faceData: any, callback: () => void) => void;
    ['character-select.choose']: (characterId: number, steamId: string) => void;
    ['character-select.delete']: (characterId: number, callback: () => void) => void;
    ['character-update.food-drink']: (food: number, drink: number) => void;
    ['character-update.health-status']: (
      boneHealth: any,
      boneStatus: any,
      sick: any,
      activeTonic: any,
      health: any,
      stamina: any,
      litersOfBlood: any,
    ) => void;
    ['customization.finalize']: (json: string) => void;
    ['customization.finalized']: () => void;
  }
}

declare namespace SocketOut {
  interface ToGameServer {
    'player-management.kick': () => void;
    ['character-update.last-position']: (serverId: number, coords: Vector3Format) => void;
  }

  interface ToClient {
    ['character-select.characters']: (characters: UI.CharacterSelect.CharacterData[]) => void;
    ['character-select.created']: (character: UI.CharacterSelect.CharacterData) => void;
    ['character-select.deleted']: (characterId: number) => void;
    ['customization.finalized']: () => void;
  }
}

// Keep backward compatibility during migration
declare namespace SocketServer {
  interface Server extends SocketIn.FromGameServer {}
  interface ServerEvents extends SocketOut.ToGameServer {}
  interface Client extends SocketOut.ToClient {}
  interface ClientEvents extends SocketIn.FromClient {}
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

declare interface PVCharacterData {
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
  lastNow: number;
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
  role: 'USER' | 'DEVELOPER' | 'ADMIN';
}
