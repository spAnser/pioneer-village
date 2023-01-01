import { PrismaClient, Accounts as PrismaAccount } from '@prisma/client';

class Accounts {
  static readonly instance: Accounts = new Accounts();

  prisma: PrismaClient;

  constructor() {
    if (Accounts.instance) {
      throw new Error('Error: Instantiation failed: Use Accounts.Instance instead of new.');
    }
  }

  async setDB(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getOrCreate(identifiers: Record<string, string>): Promise<PrismaAccount> {
    const where: Record<string, string> = {};
    for (const key in identifiers) {
      if (key === 'ip' || key === 'license' || key === 'license2' || key === 'discord') {
        continue;
      }
      where[`identifier_${key}`] = identifiers[key];
    }
    const account = await this.prisma.accounts.findFirst({
      where,
    });
    if (account) {
      return account;
    }
    return this.createAccount(identifiers);
  }

  async createAccount(identifiers: Record<string, string>): Promise<PrismaAccount> {
    return await this.prisma.accounts.create({
      data: {
        identifier_steam: identifiers.steam,
        identifier_fivem: identifiers.fivem,
        identifier_discord: identifiers.discord,
        identifier_ip: identifiers.ip,
      },
    });
  }
}

export default Accounts.instance;
