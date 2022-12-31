import { Horses as PrismaHorses } from '../../../node_modules/.prisma/client/index';

import { PrismaClient } from '@prisma/client';
import { logInfo } from '../helpers/log';

class Stables {
  static readonly instance: Stables = new Stables();

  prisma: PrismaClient;

  constructor() {
    if (Stables.instance) {
      throw new Error('Error: Instantiation failed: Use Stables.Instance instead of new.');
    }
  }

  async setDB(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async loadCharacterHorses(characterId: number): Promise<PrismaHorses[]> {
    return await this.prisma.horses.findMany({
      where: {
        owner: {
          id: characterId,
        },
      },
      include: {
        brand: true,
      },
    });
  }
}

export default Stables.instance;
