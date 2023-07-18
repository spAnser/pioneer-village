import { PrismaClient, Characters as PrismaCharacter, Faces as PrismaFace } from '@prisma/client';
import { logInfoC } from '../helpers/log';

type PrismaCharacterWithFace = PrismaCharacter & { face: PrismaFace | null };

class Characters {
  static readonly instance: Characters = new Characters();

  characters: CharacterData[] = []

  prisma: PrismaClient;

  constructor() {
    if (Characters.instance) {
      throw new Error('Error: Instantiation failed: Use Characters.Instance instead of new.');
    }
  }

  async setDB(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getCharacters(accountId: number): Promise<PrismaCharacterWithFace[]> {
    return this.prisma.characters.findMany({ where: { accountId }, include: { face: true } });
  }

  private async getCharacter(charId: number): Promise<CharacterData | undefined> {
    const result = await this.prisma.characters.findFirst({where: {id: charId}, include: {face: true}})
    if (!result) return 
    const face: Game.Face = {
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
      face,
      components: result.components as number[],
      source: -1,
      socketId: "", 
    };
  }

  getActiveCharacterForServerId(serverId: number) {
    for (const char of this.characters) {
      if (char.source !== serverId) continue
      return char
    }
  }

  private updateCharacterAtributeWithCharId(charId: number, attribute: keyof CharacterData, newValue: any) {
    for (const [index, char] of this.characters.entries()) {
      if (char.id !== charId) continue
      (this.characters[index][attribute] as any) = newValue 
      break
    }
  }

  private updateCharacterAtributeWithServerId(serverId: number, attribute: keyof CharacterData, newValue: any) {
    for (const [index, char] of this.characters.entries()) {
      if (char.source !== serverId) continue
      (this.characters[index][attribute] as any) = newValue 
      break
    }
  }

  async createCharacter(
    ownerId: number,
    characterData: Game.Character,
    faceData: Game.Face,
  ): Promise<PrismaCharacterWithFace | null> {
    // @ts-ignore
    characterData.dateOfBirth = new Date(characterData.dateOfBirth);
    // @ts-ignore
    const character = await this.prisma.characters.create({ data: { ...characterData, accountId: ownerId } });
    await this.prisma.faces.create({ data: { ...faceData, characterId: character.id } });
    return this.prisma.characters.findFirst({ where: { id: character.id }, include: { face: true } });
  }

  async setLastCoords(characterId: number, coords: Vector3Format) {
    await this.prisma.characters.update({
      where: {
        id: characterId
      },
      data: {
        lastX: coords.x.toFixed(3), // Limit the coords to 3 decimal places because more are useless 
        lastY: coords.y.toFixed(3), 
        lastZ: coords.z.toFixed(3)
      }
    })
    this.updateCharacterAtributeWithCharId(characterId, 'lastX', coords.x.toFixed(3))
    this.updateCharacterAtributeWithCharId(characterId, 'lastY', coords.y.toFixed(3))
    this.updateCharacterAtributeWithCharId(characterId, 'lastZ', coords.z.toFixed(3))
  }


  async updateCharacterFoodAndDrink(characterId: number, food: number, drink: number) { 
    await this.prisma.characters.update({
      where: {
        id: characterId
      },
      data: {
        food, 
        drink
      }
    })
    this.updateCharacterAtributeWithCharId(characterId, 'food', food)
    this.updateCharacterAtributeWithCharId(characterId, 'drink', drink)
  }

  async getCharacterFoodAndDrink(characterId: number)  {
    return this.prisma.characters.findFirst({
      where: {
        id: characterId
      },
      select: {
        food: true, 
        drink: true
      }
    })    
  }


  async setActiveCharacter(charId: number, source: number, socketId: string) {
    const character = await this.getCharacter(charId)
    if (!character) {
      logInfoC('Attempted to get character with id', charId, 'but returned null')
      return 
    }
    character.source = source
    character.socketId = socketId
    this.characters.push(character)
    logInfoC('Registered active character', charId, 'for server id', source)
  }

  setCharacterAsNoLongerActive(serverId: number) {
    for (const [index, character] of this.characters.entries()) {
      if (character.source !== serverId) continue
      delete this.characters[index]
      break
    }
  }
}

export default Characters.instance;
