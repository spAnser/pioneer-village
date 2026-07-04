import { and, eq } from 'drizzle-orm';
import { Socket } from 'socket.io';

import { db } from '../db/connection';
import {
  AccountsSchema,
  type CharacterSchemaType,
  CharactersSchema,
  type FaceSchemaType,
  FacesSchema,
  type NewCharacterSchemaType,
  type NewFaceSchemaType,
} from '../db/schema';
import zpc from '../db/zpc';
import { logInfoC, logInfoS } from '../helpers';

type CharacterWithFace = CharacterSchemaType & { face: FaceSchemaType | null };

const COORDS_ZERO = { x: 0, y: 0, z: 0 };
const COORD_THRESHOLD = 0.001;
const COORD_PERSIST_INTERVAL_MS = 30_000;

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

  characters: PVCharacterData[] = []; // TODO This needs to be a Map<number, PVCharacterData> for faster access
  private lastCoordsPersist: Map<number, number> = new Map();

  constructor() {
    if (Characters.instance) {
      throw new Error('Error: Instantiation failed: Use Characters.Instance instead of new.');
    }
    this.startIntervals();
  }

  async getCharacters(accountId: number): Promise<CharacterWithFace[]> {
    const result = await db
      .select()
      .from(CharactersSchema)
      .leftJoin(FacesSchema, eq(CharactersSchema.id, FacesSchema.characterId))
      .where(eq(CharactersSchema.accountId, accountId));

    return result
      .map((row) => ({
        ...row.Characters,
        face: row.Faces,
      }))
      .filter((char) => !char.deletedAt);
  }

  private async getCharacter(charId: number): Promise<PVCharacterData | undefined> {
    const result = await db
      .select()
      .from(CharactersSchema)
      .leftJoin(FacesSchema, eq(CharactersSchema.id, FacesSchema.characterId))
      .leftJoin(AccountsSchema, eq(CharactersSchema.accountId, AccountsSchema.id))
      .where(eq(CharactersSchema.id, charId))
      .limit(1);

    if (result.length === 0) return;

    const row = result[0];
    const characterData = row.Characters;
    const faceData = row.Faces;
    const role = (row.Accounts?.role ?? 'USER') as 'USER' | 'DEVELOPER' | 'ADMIN';

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
      lastNow: Date.now(),
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
      role,
    };
  }

  getActiveCharacterForServerId(serverId: number) {
    for (const char of this.characters) {
      if (!char) continue;
      if (char.source !== serverId) continue;
      return char;
    }
  }

  getServerIdForCharacterId(characterId: number): number | undefined {
    for (const char of this.characters) {
      if (!char) continue;
      if (char.id !== characterId) continue;
      return char.source;
    }
    return undefined; // If character not found
  }

  getActiveCharacterForCharacterId(characterId: number) {
    for (const char of this.characters) {
      if (!char) continue;
      if (char.id !== characterId) continue;
      return char;
    }
  }

  updateLocalCharacterAtributeWithCharId(charId: number, attribute: keyof PVCharacterData, newValue: any) {
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

  getCharacterSocket(charId: number) {
    for (const char of this.characters) {
      if (!char) continue;
      if (char.id !== charId) continue;
      return char.socket;
    }
  }

  getLocalCharacterAtributeWithCharId(charId: number, attribute: keyof PVCharacterData): any {
    for (const char of this.characters) {
      if (!char) continue;
      if (char.id !== charId) continue;
      return char[attribute];
    }
    return null; // If character not found
  }

  async doesCharacterIdExist(charId: number): Promise<boolean> {
    const result = await db
      .select({ id: CharactersSchema.id })
      .from(CharactersSchema)
      .where(eq(CharactersSchema.id, charId))
      .limit(1);

    return result.length > 0;
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

    const newCharacter: NewCharacterSchemaType = {
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

    const character = await db.insert(CharactersSchema).values(newCharacter).returning();

    if (character.length === 0) return null;

    const newFace: NewFaceSchemaType = {
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

    await db.insert(FacesSchema).values(newFace);

    // Return the character with face
    const result = await db
      .select()
      .from(CharactersSchema)
      .leftJoin(FacesSchema, eq(CharactersSchema.id, FacesSchema.characterId))
      .where(eq(CharactersSchema.id, character[0].id))
      .limit(1);

    if (result.length === 0) return null;

    return {
      ...result[0].Characters,
      face: result[0].Faces,
    };
  }

  async forceCoordsUpdate(characterId: number): Promise<Vector3Format | void> {
    const serverId = this.getServerIdForCharacterId(characterId);
    if (!serverId) {
      logInfoS('[Characters]', 'Attempted to force coords update for character', characterId, 'but is offline');
      return;
    }

    const [, coords] = await zpc.awaitServer(
      'character-update.last-position',
      'base.force-coords-update',
      {},
      serverId,
    );

    logInfoS('coords', coords);

    return coords;
  }

  async setLastCoords(characterId: number, coords: Vector3Format) {
    const currentX = this.getLocalCharacterAtributeWithCharId(characterId, 'lastX') ?? 0;
    const currentY = this.getLocalCharacterAtributeWithCharId(characterId, 'lastY') ?? 0;
    const currentZ = this.getLocalCharacterAtributeWithCharId(characterId, 'lastZ') ?? 0;

    const hasChanged =
      Math.abs(coords.x - currentX) > COORD_THRESHOLD ||
      Math.abs(coords.y - currentY) > COORD_THRESHOLD ||
      Math.abs(coords.z - currentZ) > COORD_THRESHOLD;

    if (hasChanged) {
      const newX = Number(coords.x.toFixed(3));
      const newY = Number(coords.y.toFixed(3));
      const newZ = Number(coords.z.toFixed(3));

      this.updateLocalCharacterAtributeWithCharId(characterId, 'lastX', newX);
      this.updateLocalCharacterAtributeWithCharId(characterId, 'lastY', newY);
      this.updateLocalCharacterAtributeWithCharId(characterId, 'lastZ', newZ);

      // Coords arrive every few seconds; the in-memory cache always tracks them, but
      // persisting every push would hammer the database for data only read on login.
      const lastPersist = this.lastCoordsPersist.get(characterId) ?? 0;
      if (Date.now() - lastPersist >= COORD_PERSIST_INTERVAL_MS) {
        this.lastCoordsPersist.set(characterId, Date.now());

        await db
          .update(CharactersSchema)
          .set({
            lastX: newX.toFixed(3), // DB expects string for decimal type
            lastY: newY.toFixed(3),
            lastZ: newZ.toFixed(3),
          })
          .where(eq(CharactersSchema.id, characterId));
      }
    }

    this.updateLocalCharacterAtributeWithCharId(characterId, 'lastNow', Date.now());
  }

  async getLastCoords(characterId: number, allowedAge = 15_000): Promise<Vector3Format> {
    const character = this.getActiveCharacterForCharacterId(characterId);

    if (!character) {
      logInfoS('[Characters]', 'Attempted to get last coords for character', characterId, 'but is offline');
      return COORDS_ZERO;
    }

    const lastNow = this.getLocalCharacterAtributeWithCharId(characterId, 'lastNow');
    const now = Date.now();

    if (lastNow && now - lastNow > allowedAge) {
      logInfoS('[Characters]', 'Last coords for character', characterId, 'are too old. Fetching new coords');
      const coords = await this.forceCoordsUpdate(characterId);

      if (!coords) {
        logInfoS(
          '[Characters]',
          'Failed to force coords update for character',
          characterId,
          'returning default coords',
        );
        return COORDS_ZERO;
      }

      return coords;
    }

    const lastX = this.getLocalCharacterAtributeWithCharId(characterId, 'lastX');
    const lastY = this.getLocalCharacterAtributeWithCharId(characterId, 'lastY');
    const lastZ = this.getLocalCharacterAtributeWithCharId(characterId, 'lastZ');
    if (lastX === undefined || lastY === undefined || lastZ === undefined) {
      logInfoS('[Characters]', 'Last coords for character', characterId, 'are not set. Returning default coords');
      return COORDS_ZERO;
    }

    const x = Number(lastX);
    const y = Number(lastY);
    const z = Number(lastZ);

    if (isNaN(x) || isNaN(y) || isNaN(z)) {
      logInfoS(
        '[Characters]',
        'Last coords for character',
        characterId,
        'contain NaN values. Returning default coords',
      );
      return COORDS_ZERO;
    }

    return { x, y, z };
  }

  private async updateCharacterFoodAndDrink(characterId: number, food: number, drink: number) {
    await db
      .update(CharactersSchema)
      .set({
        food: food.toString(),
        drink: drink.toString(),
      })
      .where(eq(CharactersSchema.id, characterId));
  }

  async getCharacterFoodAndDrink(characterId: number) {
    const result = await db
      .select({
        food: CharactersSchema.food,
        drink: CharactersSchema.drink,
      })
      .from(CharactersSchema)
      .where(eq(CharactersSchema.id, characterId))
      .limit(1);

    if (result.length === 0) return null;

    return {
      food: result[0].food,
      drink: result[0].drink,
    };
  }

  async updateCharacterHealthMetadata(characterId: number, metadata: CharacterHealthMetadata) {
    const result = await db
      .update(CharactersSchema)
      .set({
        healthMetadata: metadata as any,
      })
      .where(eq(CharactersSchema.id, characterId))
      .returning();

    return result[0];
  }

  async getCharacterHealthMetadata(characterId: number): Promise<CharacterHealthMetadata | undefined> {
    const result = await db
      .select({
        healthMetadata: CharactersSchema.healthMetadata,
      })
      .from(CharactersSchema)
      .where(eq(CharactersSchema.id, characterId))
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

  private async updateDatabaseWithPlayerMetadata(character: PVCharacterData) {
    if (!character) return;
    await this.updateCharacterCurrencies(character.id, character.currencies);
    await this.updateCharacterHealthMetadata(character.id, character.healthMetadata);
    await this.updateCharacterFoodAndDrink(character.id, character.food, character.drink);

    return true;
  }

  async getCharacterCurrencies(charId: number): Promise<CharacterCurrencies | undefined> {
    const result = await db
      .select({
        currencies: CharactersSchema.currencies,
      })
      .from(CharactersSchema)
      .where(eq(CharactersSchema.id, charId))
      .limit(1);

    if (result.length === 0 || !result[0].currencies) {
      return undefined;
    }

    return result[0].currencies as unknown as CharacterCurrencies;
  }

  async updateCharacterCurrencies(characterId: number, currencies: CharacterCurrencies) {
    const result = await db
      .update(CharactersSchema)
      .set({
        currencies: currencies as any,
      })
      .where(eq(CharactersSchema.id, characterId))
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
        id: AccountsSchema.id,
      })
      .from(AccountsSchema)
      .where(eq(AccountsSchema.identifier_steam, steamId))
      .limit(1);

    if (accountResult.length === 0) {
      return false;
    }

    const accountId = accountResult[0].id;
    const charactersResult = await db
      .select({
        id: CharactersSchema.id,
      })
      .from(CharactersSchema)
      .where(and(eq(CharactersSchema.accountId, accountId), eq(CharactersSchema.id, characterId)))
      .limit(1);

    return charactersResult.length > 0;
  }

  async deleteCharacter(characterId: number): Promise<boolean> {
    const result = await db
      .update(CharactersSchema)
      .set({
        deletedAt: new Date(),
      })
      .where(eq(CharactersSchema.id, characterId))
      .returning();

    logInfoC('Deleted character', characterId, 'result:', result);

    return result.length > 0;
  }

  startIntervals() {
    setInterval(
      async () => {
        const characterCount = this.characters.filter(Boolean).length;
        if (characterCount === 0) return;
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
          characterCount,
          `character${characterCount > 1 ? 's' : ''} has been saved. It took:`,
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
