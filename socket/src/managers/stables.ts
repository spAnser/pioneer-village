import { eq } from 'drizzle-orm';
import { db } from '../db/connection';
import { horses, brands, type Horse } from '../db/schema';
import { logInfo } from '../helpers/log';

type HorseWithBrand = Horse & { brand?: typeof brands.$inferSelect | null };

class Stables {
  static readonly instance: Stables = new Stables();

  constructor() {
    if (Stables.instance) {
      throw new Error('Error: Instantiation failed: Use Stables.Instance instead of new.');
    }
  }

  async loadCharacterHorses(characterId: number): Promise<HorseWithBrand[]> {
    const result = await db
      .select()
      .from(horses)
      .leftJoin(brands, eq(horses.brandId, brands.id))
      .where(eq(horses.ownerId, characterId));

    return result.map(row => ({
      ...row.Horses,
      brand: row.Brands,
    }));
  }
}

export default Stables.instance;
