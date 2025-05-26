import { PrismaClient, Characters as PrismaCharacter, Faces as PrismaFace, Prisma } from '@prisma/client';
import { logInfoC, logInfoS } from '../helpers/log';
import { Socket } from 'socket.io';
import { JSONObject } from 'three/examples/jsm/loaders/IFCLoader';

type PrismaCharacterWithFace = PrismaCharacter & { face: PrismaFace | null };

export const GetFaceDataFromDatabase = (result: PrismaCharacterWithFace): Game.Face => {
  // NOTE: There are defaults just in case, but they should never really not exist in the DB
  return {
    id: result.face?.id || 0,
    noseHeight: result.face?.noseHeight.toNumber() || 0,
    lowerLipWidth: result.face?.lowerLipWidth.toNumber() || 0,
    upperLipHeight: result.face?.upperLipHeight.toNumber() || 0,
    earlobeSize: result.face?.earlobeSize.toNumber() || 0,
    lowerLipHeight: result.face?.lowerLipHeight.toNumber() || 0,
    eyebrowHeight: result.face?.eyebrowHeight.toNumber() || 0,
    jawHeight: result.face?.jawHeight.toNumber() || 0,
    eyesDistance: result.face?.eyesDistance.toNumber() || 0,
    mouthDepth: result.face?.mouthDepth.toNumber() || 0,
    mouthWidth: result.face?.mouthWidth.toNumber() || 0,
    noseCurvature: result.face?.noseCurvature.toNumber() || 0,
    eyebrowDepth: result.face?.eyebrowDepth.toNumber() || 0,
    earsHeight: result.face?.earsHeight.toNumber() || 0,
    noseSize: result.face?.noseSize.toNumber() || 0,
    headWidth: result.face?.headWidth.toNumber() || 0,
    eyelidWidth: result.face?.eyelidWidth.toNumber() || 0,
    mouthYPos: result.face?.mouthYPos.toNumber() || 0,
    earsWidth: result.face?.earsWidth.toNumber() || 0,
    jawWidth: result.face?.jawWidth.toNumber() || 0,
    nostrilsDistance: result.face?.nostrilsDistance.toNumber() || 0,
    noseWidth: result.face?.noseWidth.toNumber() || 0,
    eyesHeight: result.face?.eyesHeight.toNumber() || 0,
    chinHeight: result.face?.chinHeight.toNumber() || 0,
    upperLipWidth: result.face?.upperLipWidth.toNumber() || 0,
    eyebrowWidth: result.face?.eyebrowWidth.toNumber() || 0,
    cheekBoneWidth: result.face?.cheekBoneWidth.toNumber() || 0,
    chinWidth: result.face?.chinWidth.toNumber() || 0,
    eyesAngle: result.face?.eyesAngle.toNumber() || 0,
    earsAngle: result.face?.earsAngle.toNumber() || 0,
    jawDepth: result.face?.jawDepth.toNumber() || 0,
    eyelidHeight: result.face?.eyelidHeight.toNumber() || 0,
    cheekBoneHeight: result.face?.cheekBoneHeight.toNumber() || 0,
    chinDepth: result.face?.chinDepth.toNumber() || 0,
    cheekBoneDepth: result.face?.cheekBoneDepth.toNumber() || 0,
    upperLipDepth: result.face?.upperLipDepth.toNumber() || 0,
    noseAngle: result.face?.noseAngle.toNumber() || 0,
    mouthXPos: result.face?.mouthXPos.toNumber() || 0,
    lowerLipDepth: result.face?.lowerLipDepth.toNumber() || 0,
    eyesDepth: result.face?.eyesDepth.toNumber() || 0,
    overlays: (result.face?.overlays as Record<string, any>) || {},
  };
};

class Characters {
  static readonly instance: Characters = new Characters();

  characters: CharacterData[] = [];

  prisma: PrismaClient;

  constructor() {
    if (Characters.instance) {
      throw new Error('Error: Instantiation failed: Use Characters.Instance instead of new.');
    }
    this.startIntervals();
  }

  async setDB(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getCharacters(accountId: number): Promise<PrismaCharacterWithFace[]> {
    return this.prisma.characters.findMany({ where: { accountId }, include: { face: true } });
  }

  private async getCharacter(charId: number): Promise<CharacterData | undefined> {
    const result = await this.prisma.characters.findFirst({ where: { id: charId }, include: { face: true } });
    if (!result) return;
    const face = GetFaceDataFromDatabase(result);
    return {
      id: result.id,
      accountId: result.accountId,
      firstName: result.firstName,
      lastName: result.lastName,
      dateOfBirth: result.dateOfBirth.toISOString(),
      createdAt: result.createdAt.toISOString(),
      deletedAt: result.deletedAt?.toISOString(),
      lastX: result.lastX.toNumber(),
      lastY: result.lastY.toNumber(),
      lastZ: result.lastZ.toNumber(),
      model: result.model,
      food: result.food.toNumber(),
      drink: result.drink.toNumber(),
      currencies: {
        dollars: (result.currencies as JSONObject).dollars,
        gold: (result.currencies as JSONObject).gold,
      },
      healthMetadata: {
        health: (result.healthMetadata as JSONObject).health,
        stamina: (result.healthMetadata as JSONObject).stamina,
        litersOfBlood: (result.healthMetadata as JSONObject).litersOfBlood,
        boneHealth: (result.healthMetadata as JSONObject).boneHealth,
        activeTonic: (result.healthMetadata as JSONObject).activeTonic,
        sick: (result.healthMetadata as JSONObject).sick,
        boneStatus: (result.healthMetadata as JSONObject).boneStatus,
      },
      face,
      components: result.components as number[],
      source: -1,
      socket: null,
      steamId: '',
      offline: true,
      userId: -1,
    };
  }

  getActiveCharacterForServerId(serverId: number) {
    for (const char of this.characters) {
      if (!char) continue;
      if (char.source !== serverId) continue;
      return char;
    }
  }

  getActiveCharacterForCharacterId(characterId: number) {
    for (const char of this.characters) {
      if (!char) continue;
      if (char.id !== characterId) continue;
      return char;
    }
  }

  updateLocalCharacterAtributeWithCharId(charId: number, attribute: keyof CharacterData, newValue: any) {
    for (const [index, char] of this.characters.entries()) {
      if (!char) continue;
      if (char.id !== charId) continue;
      (this.characters[index][attribute] as any) = newValue;
      if (char.socket) {
        char.socket.emit('character-client-update.updateAttribute', attribute, newValue);
      }
      break;
    }
  }

  /**

export type Prisma.AccountsCreateNestedOneWithoutCharactersInput = {
  create?: XOR<AccountsCreateWithoutCharactersInput, AccountsUncheckedCreateWithoutCharactersInput>
  connectOrCreate?: AccountsCreateOrConnectWithoutCharactersInput
  connect?: AccountsWhereUniqueInput
}

export type Prisma.CharactersCreateInput = {
  firstName: string
  lastName: string
  dateOfBirth: Date | string
  createdAt?: Date | string
  deletedAt?: Date | string | null
  lastX?: Decimal | DecimalJsLike | number | string
  lastY?: Decimal | DecimalJsLike | number | string
  lastZ?: Decimal | DecimalJsLike | number | string
  food?: Decimal | DecimalJsLike | number | string
  drink?: Decimal | DecimalJsLike | number | string
  currencies?: JsonNullValueInput | InputJsonValue
  healthMetadata?: JsonNullValueInput | InputJsonValue
  components?: JsonNullValueInput | InputJsonValue
  model?: string
  whistle?: JsonNullValueInput | InputJsonValue
  brand?: BrandsCreateNestedOneWithoutOwnerInput
  account: AccountsCreateNestedOneWithoutCharactersInput
  face?: FacesCreateNestedOneWithoutCharacterInput
  horses?: HorsesCreateNestedManyWithoutOwnerInput
  livestock?: LivestockCreateNestedOneWithoutOwnerInput
  outfits?: OutfitsCreateNestedManyWithoutCharacterInput
}

   */

  async createCharacter(
    ownerId: number,
    characterData: Omit<Game.Character, 'accountId' | 'id' | 'createdAt' | 'face'>,
    faceData: Game.Face,
  ): Promise<PrismaCharacterWithFace | null> {
    console.log('ownerId', ownerId);
    const character = await this.prisma.characters.create({
      data: {
        accountId: ownerId,
        ...characterData,
        dateOfBirth: new Date(characterData.dateOfBirth),
      },
    });
    await this.prisma.faces.create({ data: { ...faceData, characterId: character.id } });
    return this.prisma.characters.findFirst({ where: { id: character.id }, include: { face: true } });
  }

  async setLastCoords(characterId: number, coords: Vector3Format) {
    await this.prisma.characters.update({
      where: {
        id: characterId,
      },
      data: {
        lastX: coords.x.toFixed(3), // Limit the coords to 3 decimal places because more are useless
        lastY: coords.y.toFixed(3),
        lastZ: coords.z.toFixed(3),
      },
    });
    this.updateLocalCharacterAtributeWithCharId(characterId, 'lastX', coords.x.toFixed(3));
    this.updateLocalCharacterAtributeWithCharId(characterId, 'lastY', coords.y.toFixed(3));
    this.updateLocalCharacterAtributeWithCharId(characterId, 'lastZ', coords.z.toFixed(3));
  }

  private async updateCharacterFoodAndDrink(characterId: number, food: number, drink: number) {
    await this.prisma.characters.update({
      where: {
        id: characterId,
      },
      data: {
        food,
        drink,
      },
    });
  }

  async getCharacterFoodAndDrink(characterId: number) {
    return this.prisma.characters.findFirst({
      where: {
        id: characterId,
      },
      select: {
        food: true,
        drink: true,
      },
    });
  }

  async updateCharacterHealthMetadata(characterId: number, metadata: CharacterHealthMetadata) {
    return this.prisma.characters.update({
      where: {
        id: characterId,
      },
      data: {
        healthMetadata: metadata as any,
      },
    });
  }

  async getCharacterHealthMetadata(characterId: number): Promise<CharacterHealthMetadata | undefined> {
    const result = await this.prisma.characters.findFirst({
      where: {
        id: characterId,
      },
      select: {
        healthMetadata: true,
      },
    });
    if (result && result.healthMetadata) {
      let finalData = result.healthMetadata as Prisma.JsonObject;
      return finalData as unknown as CharacterHealthMetadata;
    } else {
      logInfoS(
        '[Characters]',
        'Attempted to find character',
        characterId,
        'health metadata but database returned a null value. Returning defaults',
      );
      return {
        health: 50,
        stamina: 50,
        litersOfBlood: 5,
        boneHealth: [],
        activeTonic: false,
        sick: false,
        boneStatus: [],
      };
    }
  }

  private async updateDatabaseWithPlayerMetadata(character: CharacterData) {
    if (!character) return;
    await this.updateCharacterCurrencies(character.id, character.currencies);
    await this.updateCharacterHealthMetadata(character.id, character.healthMetadata);
    await this.updateCharacterFoodAndDrink(character.id, character.food, character.drink);

    return true;
  }

  async getCharacterCurrencies(charId: number): Promise<CharacterCurrencies | undefined> {
    const result = await this.prisma.characters.findFirst({
      where: {
        id: charId,
      },
      select: {
        currencies: true,
      },
    });
    if (result && result.currencies) {
      return result.currencies as unknown as CharacterCurrencies;
    } else {
      return undefined;
    }
  }

  async updateCharacterCurrencies(characterId: number, currencies: CharacterCurrencies) {
    return this.prisma.characters.update({
      where: {
        id: characterId,
      },
      data: {
        // @ts-ignore
        currencies: currencies,
      },
    });
  }

  // Start of money management
  setCharacterCurrency(characterId: number, type: keyof CharacterCurrencies, amount: number): boolean {
    let character = this.getActiveCharacterForCharacterId(characterId);
    if (!character) {
      logInfoS('[Characters]', 'Attempted to get character', characterId, 'but is offline aborting');
      return false;
    }
    character.currencies[type] = amount;
    this.updateLocalCharacterAtributeWithCharId(characterId, 'currencies', character.currencies);
    return true;
  }

  addCharacterCurrency(characterId: number, type: keyof CharacterCurrencies, amount: number): boolean {
    let character = this.getActiveCharacterForCharacterId(characterId);
    if (!character) {
      logInfoS('[Characters]', 'Attempted to get character', characterId, 'but is offline aborting');
      return false;
    }
    character.currencies[type] += amount;
    this.updateLocalCharacterAtributeWithCharId(characterId, 'currencies', character.currencies);
    return true;
  }

  removeCharacterCurrency(characterId: number, type: keyof CharacterCurrencies, amount: number) {
    let character = this.getActiveCharacterForCharacterId(characterId);
    if (!character) {
      logInfoS('[Characters]', 'Attempted to get character', characterId, 'but is offline aborting');
      return false;
    }
    character.currencies[type] -= amount;
    if (character.currencies[type] < 0) {
      return false;
    } else {
      this.updateLocalCharacterAtributeWithCharId(characterId, 'currencies', character.currencies);
      return true;
    }
  }

  // End of money management

  async setActiveCharacter(charId: number, source: number, socket: Socket, steamId: string, userId: number) {
    const character = await this.getCharacter(charId);
    if (!character) {
      logInfoC('Attempted to get character with id', charId, 'but returned null');
      return;
    }
    character.source = source;
    character.offline = false;
    character.steamId = steamId;
    character.userId = userId;
    socket.emit('character-client-update.getCharacter', JSON.stringify(character));
    character.socket = socket;
    this.characters.push(character);
    logInfoC('Registered active character', charId, 'for server id', source);
  }

  async setCharacterAsNoLongerActive(serverId: number) {
    for (const [index, character] of this.characters.entries()) {
      if (!character) continue;
      if (character.source !== serverId) continue;
      await this.updateDatabaseWithPlayerMetadata(character);
      delete this.characters[index];
      break;
    }
  }

  async doesPlayerOwnCharacter(characterId: number, steamId: string): Promise<boolean> {
    const accountResult = await this.prisma.accounts.findFirst({
      where: {
        identifier_steam: steamId,
      },
      select: {
        id: true,
      },
    });

    if (!accountResult || !accountResult.id) {
      return false;
    }

    const accountId = accountResult.id;
    const charactersResult = await this.prisma.characters.findFirst({
      where: {
        accountId: accountId,
        id: characterId,
      },
      select: {
        id: true,
      },
    });

    return !(!charactersResult || !charactersResult.id);
  }

  startIntervals() {
    setInterval(
      async () => {
        const nowTime = Date.now();
        let saved = 0;
        let failed = 0;
        for (const char of this.characters) {
          if (!char) return;
          const success = await this.updateDatabaseWithPlayerMetadata(char);
          if (success) {
            saved++;
          } else {
            failed++;
          }
        }
        logInfoS(
          '[Characters]',
          'Information of',
          this.characters.filter(Boolean).length,
          'character(s) has been saved. It took:',
          Date.now() - nowTime,
          'ms',
          `Saved: ${saved}, Failed: ${failed}`,
        );

        // logInfoS(
        //   '[Characters]',
        //   this.characters.map((c) => ({
        //     id: c.id,
        //     firstName: c.firstName,
        //     lastName: c.lastName,
        //     source: c.source,
        //     model: c.model,
        //     lastX: c.lastX,
        //     lastY: c.lastY,
        //     lastZ: c.lastZ,
        //     userId: c.userId,
        //   })),
        // );
      },
      2 * 60 * 1000,
    );
  }
}

export default Characters.instance;
