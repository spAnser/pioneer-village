declare namespace UI {}

interface NetEvents {
  myEvent: (blah: string) => void;
}

declare interface UIEvents {
  ['character-client-update.getCharacter']: (charData: string) => void;
  ['character-client-update.updateAttribute']: (attribute: keyof CharacterData, newValue: any) => void;
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
  userId: number;
  offline: boolean;
}
