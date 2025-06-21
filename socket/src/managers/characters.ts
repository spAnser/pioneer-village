import { eq, and } from 'drizzle-orm';
import { db } from '../db/connection';
import { characters, faces, accounts, type Character, type Face, type NewCharacter, type NewFace } from '../db/schema';
import { logInfoC, logInfoS } from '../helpers/log';
import { Socket } from 'socket.io';
import { JSONObject } from 'three/examples/jsm/loaders/IFCLoader';

type CharacterWithFace = Character & { face: Face | null };

export const GetFaceDataFromDatabase = (result: CharacterWithFace): Game.Face => {
  // NOTE: There are defaults just in case, but they should never really not exist in the DB
  return {
    id: result.face?.id || 0,
    noseHeight: Number(result.face?.noseHeight || '0'),
    lowerLipWidth: Number(result.face?.lowerLipWidth || '0'),
    upperLipHeight: Number(result.face?.upperLipHeight || '0'),
    earlobeSize: Number(result.face?.earlobeSize || '0'),
    lowerLipHeight: Number(result.face?.lowerLipHeight || '0'),
    eyebrowHeight: Number(result.face?.eyebrowHeight || '0'),
    jawHeight: Number(result.face?.jawHeight || '0'),
    eyesDistance: Number(result.face?.eyesDistance || '0'),
    mouthDepth: Number(result.face?.mouthDepth || '0'),
    mouthWidth: Number(result.face?.mouthWidth || '0'),
    noseCurvature: Number(result.face?.noseCurvature || '0'),
    eyebrowDepth: Number(result.face?.eyebrowDepth || '0'),
    earsHeight: Number(result.face?.earsHeight || '0'),
    noseSize: Number(result.face?.noseSize || '0'),
    headWidth: Number(result.face?.headWidth || '0'),
    eyelidWidth: Number(result.face?.eyelidWidth || '0'),
    mouthYPos: Number(result.face?.mouthYPos || '0'),
    earsWidth: Number(result.face?.earsWidth || '0'),
    jawWidth: Number(result.face?.jawWidth || '0'),
    nostrilsDistance: Number(result.face?.nostrilsDistance || '0'),
    noseWidth: Number(result.face?.noseWidth || '0'),
    eyesHeight: Number(result.face?.eyesHeight || '0'),
    chinHeight: Number(result.face?.chinHeight || '0'),
    upperLipWidth: Number(result.face?.upperLipWidth || '0'),
    eyebrowWidth: Number(result.face?.eyebrowWidth || '0'),
    cheekBoneWidth: Number(result.face?.cheekBoneWidth || '0'),
    chinWidth: Number(result.face?.chinWidth || '0'),
    eyesAngle: Number(result.face?.eyesAngle || '0'),
    earsAngle: Number(result.face?.earsAngle || '0'),
    jawDepth: Number(result.face?.jawDepth || '0'),
    eyelidHeight: Number(result.face?.eyelidHeight || '0'),
    cheekBoneHeight: Number(result.face?.cheekBoneHeight || '0'),
    chinDepth: Number(result.face?.chinDepth || '0'),
    cheekBoneDepth: Number(result.face?.cheekBoneDepth || '0'),
    upperLipDepth: Number(result.face?.upperLipDepth || '0'),
    noseAngle: Number(result.face?.noseAngle || '0'),
    mouthXPos: Number(result.face?.mouthXPos || '0'),
    lowerLipDepth: Number(result.face?.lowerLipDepth || '0'),
    eyesDepth: Number(result.face?.eyesDepth || '0'),
    overlays: (result.face?.overlays as Record<string, any>) || {},
  };
};

class Characters {
  static readonly instance: Characters = new Characters();

  characters: CharacterData[] = [];

  constructor() {
    if (Characters.instance) {
      throw new Error('Error: Instantiation failed: Use Characters.Instance instead of new.');
    }
    this.startIntervals();
  }

  async getCharacters(accountId: number): Promise<CharacterWithFace[]> {
    const result = await db
      .select()
      .from(characters)
      .leftJoin(faces, eq(characters.id, faces.characterId))
      .where(eq(characters.accountId, accountId));

    return result.map((row) => ({
      ...row.Characters,
      face: row.Faces,
    }));
  }

  private async getCharacter(charId: number): Promise<CharacterData | undefined> {
    const result = await db
      .select()
      .from(characters)
      .leftJoin(faces, eq(characters.id, faces.characterId))
      .where(eq(characters.id, charId))
      .limit(1);

    if (result.length === 0) return;

    const row = result[0];
    const characterData = row.Characters;
    const faceData = row.Faces;

    const characterWithFace: CharacterWithFace = {
      ...characterData,
      face: faceData,
    };

    const face = GetFaceDataFromDatabase(characterWithFace);

    return {
      id: characterData.id,
      accountId: characterData.accountId,
      firstName: characterData.firstName,
      lastName: characterData.lastName,
      dateOfBirth: characterData.dateOfBirth?.toISOString() || '',
      createdAt: characterData.createdAt?.toISOString() || '',
      deletedAt: characterData.deletedAt?.toISOString(),
      lastX: Number(characterData.lastX || '0'),
      lastY: Number(characterData.lastY || '0'),
      lastZ: Number(characterData.lastZ || '0'),
      model: characterData.model || 'mp_male',
      food: Number(characterData.food || '100'),
      drink: Number(characterData.drink || '100'),
      currencies: {
        dollars: (characterData.currencies as Record<string, number>)?.dollars || 20,
        gold: (characterData.currencies as Record<string, number>)?.gold || 0,
      },
      healthMetadata: {
        health: Number((characterData.healthMetadata as Record<string, unknown>)?.health) || 100,
        stamina: Number((characterData.healthMetadata as Record<string, unknown>)?.stamina) || 100,
        litersOfBlood: Number((characterData.healthMetadata as Record<string, unknown>)?.litersOfBlood) || 5,
        boneHealth: ((characterData.healthMetadata as Record<string, unknown>)?.boneHealth as unknown[]) || [],
        activeTonic: Boolean((characterData.healthMetadata as Record<string, unknown>)?.activeTonic) || false,
        sick: Boolean((characterData.healthMetadata as Record<string, unknown>)?.sick) || false,
        boneStatus: ((characterData.healthMetadata as Record<string, unknown>)?.boneStatus as unknown[]) || [],
      },
      face,
      components: (characterData.components as number[]) || [],
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
    characterData: Omit<Game.Character, 'accountId' | 'id' | 'createdAt' | 'face'>, // Using any to avoid type conflicts between Game.Character and our schema
    faceData: Game.Face,
    faceFeatures?: Game.FaceFeatures,
  ): Promise<CharacterWithFace | null> {
    console.log('ownerId', ownerId);

    const newCharacter: NewCharacter = {
      accountId: ownerId,
      firstName: characterData.firstName,
      lastName: characterData.lastName,
      dateOfBirth: new Date(characterData.dateOfBirth),
      lastX: characterData.lastX?.toString() || '0.0',
      lastY: characterData.lastY?.toString() || '0.0',
      lastZ: characterData.lastZ?.toString() || '0.0',
      food: '100.0',
      drink: '100.0',
      currencies: { dollars: 20, gold: 0 },
      healthMetadata: {
        health: 100,
        stamina: 100,
        litersOfBlood: 5,
        boneHealth: [],
        activeTonic: false,
        sick: false,
        boneStatus: [],
      },
      components: characterData.components || [],
      model: characterData.model || 'mp_male',
      whistle: characterData.whistle || { pitch: 0.5, shape: 5, clarity: 0.5 },
      features: faceFeatures || {},
    };

    const character = await db.insert(characters).values(newCharacter).returning();

    if (character.length === 0) return null;

    const newFace: NewFace = {
      characterId: character[0].id,
      noseHeight: faceData.noseHeight?.toString() || '0.0',
      lowerLipWidth: faceData.lowerLipWidth?.toString() || '0.0',
      upperLipHeight: faceData.upperLipHeight?.toString() || '0.0',
      earlobeSize: faceData.earlobeSize?.toString() || '0.0',
      lowerLipHeight: faceData.lowerLipHeight?.toString() || '0.0',
      eyebrowHeight: faceData.eyebrowHeight?.toString() || '0.0',
      jawHeight: faceData.jawHeight?.toString() || '0.0',
      eyesDistance: faceData.eyesDistance?.toString() || '0.0',
      mouthDepth: faceData.mouthDepth?.toString() || '0.0',
      mouthWidth: faceData.mouthWidth?.toString() || '0.0',
      noseCurvature: faceData.noseCurvature?.toString() || '0.0',
      eyebrowDepth: faceData.eyebrowDepth?.toString() || '0.0',
      earsHeight: faceData.earsHeight?.toString() || '0.0',
      noseSize: faceData.noseSize?.toString() || '0.0',
      headWidth: faceData.headWidth?.toString() || '0.0',
      eyelidWidth: faceData.eyelidWidth?.toString() || '0.0',
      mouthYPos: faceData.mouthYPos?.toString() || '0.0',
      earsWidth: faceData.earsWidth?.toString() || '0.0',
      jawWidth: faceData.jawWidth?.toString() || '0.0',
      nostrilsDistance: faceData.nostrilsDistance?.toString() || '0.0',
      noseWidth: faceData.noseWidth?.toString() || '0.0',
      eyesHeight: faceData.eyesHeight?.toString() || '0.0',
      chinHeight: faceData.chinHeight?.toString() || '0.0',
      upperLipWidth: faceData.upperLipWidth?.toString() || '0.0',
      eyebrowWidth: faceData.eyebrowWidth?.toString() || '0.0',
      cheekBoneWidth: faceData.cheekBoneWidth?.toString() || '0.0',
      chinWidth: faceData.chinWidth?.toString() || '0.0',
      eyesAngle: faceData.eyesAngle?.toString() || '0.0',
      earsAngle: faceData.earsAngle?.toString() || '0.0',
      jawDepth: faceData.jawDepth?.toString() || '0.0',
      eyelidHeight: faceData.eyelidHeight?.toString() || '0.0',
      cheekBoneHeight: faceData.cheekBoneHeight?.toString() || '0.0',
      chinDepth: faceData.chinDepth?.toString() || '0.0',
      cheekBoneDepth: faceData.cheekBoneDepth?.toString() || '0.0',
      upperLipDepth: faceData.upperLipDepth?.toString() || '0.0',
      noseAngle: faceData.noseAngle?.toString() || '0.0',
      mouthXPos: faceData.mouthXPos?.toString() || '0.0',
      lowerLipDepth: faceData.lowerLipDepth?.toString() || '0.0',
      eyesDepth: faceData.eyesDepth?.toString() || '0.0',
      overlays: faceData.overlays || {},
    };

    await db.insert(faces).values(newFace);

    // Return the character with face
    const result = await db
      .select()
      .from(characters)
      .leftJoin(faces, eq(characters.id, faces.characterId))
      .where(eq(characters.id, character[0].id))
      .limit(1);

    if (result.length === 0) return null;

    return {
      ...result[0].Characters,
      face: result[0].Faces,
    };
  }

  async setLastCoords(characterId: number, coords: Vector3Format) {
    await db
      .update(characters)
      .set({
        lastX: coords.x.toFixed(3), // Limit the coords to 3 decimal places because more are useless
        lastY: coords.y.toFixed(3),
        lastZ: coords.z.toFixed(3),
      })
      .where(eq(characters.id, characterId));

    this.updateLocalCharacterAtributeWithCharId(characterId, 'lastX', coords.x.toFixed(3));
    this.updateLocalCharacterAtributeWithCharId(characterId, 'lastY', coords.y.toFixed(3));
    this.updateLocalCharacterAtributeWithCharId(characterId, 'lastZ', coords.z.toFixed(3));
  }

  private async updateCharacterFoodAndDrink(characterId: number, food: number, drink: number) {
    await db
      .update(characters)
      .set({
        food: food.toString(),
        drink: drink.toString(),
      })
      .where(eq(characters.id, characterId));
  }

  async getCharacterFoodAndDrink(characterId: number) {
    const result = await db
      .select({
        food: characters.food,
        drink: characters.drink,
      })
      .from(characters)
      .where(eq(characters.id, characterId))
      .limit(1);

    if (result.length === 0) return null;

    return {
      food: result[0].food,
      drink: result[0].drink,
    };
  }

  async updateCharacterHealthMetadata(characterId: number, metadata: CharacterHealthMetadata) {
    const result = await db
      .update(characters)
      .set({
        healthMetadata: metadata as any,
      })
      .where(eq(characters.id, characterId))
      .returning();

    return result[0];
  }

  async getCharacterHealthMetadata(characterId: number): Promise<CharacterHealthMetadata | undefined> {
    const result = await db
      .select({
        healthMetadata: characters.healthMetadata,
      })
      .from(characters)
      .where(eq(characters.id, characterId))
      .limit(1);

    if (result.length === 0 || !result[0].healthMetadata) {
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

    return result[0].healthMetadata as unknown as CharacterHealthMetadata;
  }

  private async updateDatabaseWithPlayerMetadata(character: CharacterData) {
    if (!character) return;
    await this.updateCharacterCurrencies(character.id, character.currencies);
    await this.updateCharacterHealthMetadata(character.id, character.healthMetadata);
    await this.updateCharacterFoodAndDrink(character.id, character.food, character.drink);

    return true;
  }

  async getCharacterCurrencies(charId: number): Promise<CharacterCurrencies | undefined> {
    const result = await db
      .select({
        currencies: characters.currencies,
      })
      .from(characters)
      .where(eq(characters.id, charId))
      .limit(1);

    if (result.length === 0 || !result[0].currencies) {
      return undefined;
    }

    return result[0].currencies as unknown as CharacterCurrencies;
  }

  async updateCharacterCurrencies(characterId: number, currencies: CharacterCurrencies) {
    const result = await db
      .update(characters)
      .set({
        currencies: currencies as any,
      })
      .where(eq(characters.id, characterId))
      .returning();

    return result[0];
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
    const accountResult = await db
      .select({
        id: accounts.id,
      })
      .from(accounts)
      .where(eq(accounts.identifier_steam, steamId))
      .limit(1);

    if (accountResult.length === 0) {
      return false;
    }

    const accountId = accountResult[0].id;
    const charactersResult = await db
      .select({
        id: characters.id,
      })
      .from(characters)
      .where(and(eq(characters.accountId, accountId), eq(characters.id, characterId)))
      .limit(1);

    return charactersResult.length > 0;
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
