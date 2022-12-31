import { PrismaClient } from '@prisma/client';

import { serverNamespace, userNamespace } from '../server';
import Stables from '../managers/stables';
import { logInfoC, logInfoS } from '../helpers/log';

export default (prisma: PrismaClient) => {
  Stables.setDB(prisma);

  serverNamespace.on('connection', (socket) => {
    //
  });

  userNamespace.on('connection', (socket) => {
    socket.on('stable.load-character-horses', async (characterId: number, cb) => {
      logInfoC('stable.load-character-horses', characterId);

      const horses: Horse.Data[] = [];
      for (const prismaHorse of await Stables.loadCharacterHorses(characterId)) {
        const horse: Horse.Data = {
          id: prismaHorse.id,
          name: prismaHorse.name,
          ownerId: prismaHorse.ownerId,
          stable: prismaHorse.stable,
          brandId: prismaHorse.brandId,
          breeds: JSON.parse(JSON.stringify(prismaHorse.breeds || {})),
          components: prismaHorse.components,
          model: prismaHorse.model,
          gender: prismaHorse.gender,
          age: prismaHorse.age,
          weight: prismaHorse.weight.toNumber(),
          food: prismaHorse.food.toNumber(),
          water: prismaHorse.water.toNumber(),
          health: prismaHorse.health.toNumber(),
          cleanliness: prismaHorse.cleanliness.toNumber(),
          neuteredFixed: prismaHorse.neuteredFixed,
          statOffRoad: prismaHorse.statOffRoad,
          statHealth: prismaHorse.statHealth,
          statEndurance: prismaHorse.statEndurance,
          statFertility: prismaHorse.statFertility,
          statHandling: prismaHorse.statHandling,
          statSpeed: prismaHorse.statSpeed,
          statAcceleration: prismaHorse.statAcceleration,
          statBonding: JSON.parse(JSON.stringify(prismaHorse.statBonding || {})),
          hooves: prismaHorse.hooves.toNumber(),
          horseshoes: prismaHorse.horseshoes.toNumber(),
          metadata: JSON.parse(JSON.stringify(prismaHorse.metadata || {})),
          lastX: prismaHorse.lastX.toNumber(),
          lastY: prismaHorse.lastY.toNumber(),
          lastZ: prismaHorse.lastZ.toNumber(),
          createdAt: prismaHorse.createdAt.toISOString(),
        };
        horses.push(horse);
      }

      cb(horses);
    });
  });
};
