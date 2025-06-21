import { serverNamespace, userNamespace } from '../server';
import Stables from '../managers/stables';
import { logInfoC, logInfoS } from '../helpers/log';

export default () => {

  serverNamespace.on('connection', (socket) => {
    //
  });

  userNamespace.on('connection', (socket) => {
    socket.on('stable.load-character-horses', async (characterId: number, cb) => {
      logInfoC('stable.load-character-horses', characterId);

      const horses: Horse.Data[] = [];
      for (const drizzleHorse of await Stables.loadCharacterHorses(characterId)) {
        const horse: Horse.Data = {
          id: drizzleHorse.id,
          name: drizzleHorse.name,
          ownerId: drizzleHorse.ownerId,
          stable: drizzleHorse.stable,
          brandId: drizzleHorse.brandId,
          breeds: JSON.parse(JSON.stringify(drizzleHorse.breeds || {})),
          components: drizzleHorse.components,
          model: drizzleHorse.model,
          gender: drizzleHorse.gender,
          age: drizzleHorse.age,
          weight: Number(drizzleHorse.weight || '0'),
          food: Number(drizzleHorse.food || '0'),
          water: Number(drizzleHorse.water || '0'),
          health: Number(drizzleHorse.health || '0'),
          cleanliness: Number(drizzleHorse.cleanliness || '0'),
          neuteredFixed: drizzleHorse.neuteredFixed || false,
          statOffRoad: drizzleHorse.statOffRoad,
          statHealth: drizzleHorse.statHealth,
          statEndurance: drizzleHorse.statEndurance,
          statFertility: drizzleHorse.statFertility,
          statHandling: drizzleHorse.statHandling,
          statSpeed: drizzleHorse.statSpeed,
          statAcceleration: drizzleHorse.statAcceleration,
          statBonding: JSON.parse(JSON.stringify(drizzleHorse.statBonding || {})),
          hooves: Number(drizzleHorse.hooves || '0'),
          horseshoes: Number(drizzleHorse.horseshoes || '0'),
          metadata: JSON.parse(JSON.stringify(drizzleHorse.metadata || {})),
          lastX: Number(drizzleHorse.lastX || '0'),
          lastY: Number(drizzleHorse.lastY || '0'),
          lastZ: Number(drizzleHorse.lastZ || '0'),
          createdAt: drizzleHorse.createdAt?.toISOString() || new Date().toISOString(),
        };
        horses.push(horse);
      }

      cb(horses);
    });
  });
};
