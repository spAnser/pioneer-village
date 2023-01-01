import { PrismaClient, Characters as PrismaCharacter, Faces as PrismaFace } from '@prisma/client';

type PrismaCharacterWithFace = PrismaCharacter & { face: PrismaFace | null };

class Characters {
  static readonly instance: Characters = new Characters();

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
}

export default Characters.instance;
