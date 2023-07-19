import { emitSocket, onClientCall } from '@lib/server';

onClientCall('health.getFoodAndDrink', async (_, charId) => {
  return new Promise((res, rej) => {
    emitSocket('character-get.food-drink', charId, (food, drink) => {
      res({ food, drink });
    });
  });
});

onClientCall('health.getHealthMetadata', async (_, charId) => {
  return new Promise((res, rej) => {
    emitSocket('character-get.health-metadata', charId, (metadata) => {
      res(metadata);
    });
  });
});
