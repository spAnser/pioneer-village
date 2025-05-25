declare namespace SocketServer {
  interface Server {}

  interface ServerEvents {
    ['character-update.last-position']: (serverId: number, coords: Vector3Format) => void;
    ['character-event.disconnected']: (serverId: number) => void;
    ['character-get.food-drink']: (charId: number, cb: (food: number, drink: number) => void) => void;
    ['character-get.health-metadata']: (charId: number, cb: (metadata: CharacterHealthMetadata) => void) => void;
  }

  interface Client {}

  interface ClientEvents {
    getCharacters: (callback: (characters: Game.Character[]) => void) => void;
    createCharacter: (characterData: Game.Character, faceData: Game.Face, callback: () => void) => void;

    ['character-select.choose']: (characterId: number, steam: Game.playerSteamId) => void;
    ['character-update.food-drink']: (food: number, water: number) => void;
    ['character-update.health-status']: (
      boneHealth: [number, number][],
      boneStatus: [number, Health.BoneStatus][],
      sick: boolean,
      activeTonic: boolean,
      health: number,
      stamina: number,
      litersOfBlood: number,
    ) => void;

    ['customization.finalize']: (json: string) => void;
  }
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
