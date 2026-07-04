declare namespace UI {}

// Extend ClientIn.FromServer and ClientOut.ToServer with base events
declare namespace ClientIn {
  interface FromServer {
    //
  }
}

declare namespace ClientOut {
  interface ToServer {
    //
  }
}

// Extend ClientIn.FromSocket with base UI events
declare namespace ClientIn {
  interface FromSocket {
    ['character-client-update.getCharacter']: (charData: string) => void;
    ['character-client-update.updateAttribute']: (attribute: keyof CharacterData, newValue: any) => void;
  }
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
  userId: number;
  offline: boolean;
  role: 'USER' | 'DEVELOPER' | 'ADMIN';
}
