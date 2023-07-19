import { PrismaClient } from '@prisma/client';
import { serverNamespace, userNamespace } from '../server';
import Characters, { GetFaceDataFromDatabase } from '../managers/characters';
import Inventories from '../managers/inventories';
import { logGreen, logInfoC, logInfoS } from '../helpers/log';

export default (prisma: PrismaClient) => {
  Characters.setDB(prisma);

  serverNamespace.on('connection', (socket) => {
    logGreen('[Characters] Game server connected');

    socket.on('character-update.last-position', async (serverId, coords) => {
      const selectedCharacter = Characters.getActiveCharacterForServerId(serverId);
      if (selectedCharacter !== undefined) {
        logInfoS(
          `[Characters] Player ${serverId} updated character ${
            selectedCharacter.id
          } and set last position ${JSON.stringify(coords)}`,
        );
        await Characters.setLastCoords(selectedCharacter.id, coords);
      }
    });

    socket.on('character-event.disconnected', (serverId) => {
      Characters.setCharacterAsNoLongerActive(serverId);
      logInfoS(`[Characters] character ${serverId} was just disconnected and performed character cleanup`);
    });

    socket.on('character-get.food-drink', async (charId, cb) => {
      if (!charId) {
        cb(0, 0);
      } else {
        const result = await Characters.getCharacterFoodAndDrink(charId);
        logInfoS('character-get.food-drink', charId, JSON.stringify(result));
        if (!result) {
          cb(0, 0);
        } else {
          cb(result.food.toNumber(), result.drink.toNumber());
        }
      }
    });

    socket.on('character-get.health-metadata', async (charId, cb) => {
      if (!charId) {
        cb({
          health: 100,
          stamina: 100,
          litersOfBlood: 5,
          boneHealth: [],
          activeTonic: false,
          sick: false,
          boneStatus: [],
        });
      } else {
        const result = await Characters.getCharacterHealthMetadata(charId);
        if (!result) {
          cb({
            health: 100,
            stamina: 100,
            litersOfBlood: 5,
            boneHealth: [],
            activeTonic: false,
            sick: false,
            boneStatus: [],
          });
          logInfoS(
            'Attempted to get health metadata for character',
            charId,
            'but returned undefined falling back to defaults',
          );
        } else {
          cb(result);
        }
      }
    });
  });

  userNamespace.on('connection', (socket) => {
    logInfoC('user connected', socket.data);

    socket.on('getCharacters', async (cb) => {
      try {
        const characters: Game.Character[] = [];
        const prismaCharacters = await Characters.getCharacters(socket.data.user.userId);

        for (const character of prismaCharacters) {
          const face = GetFaceDataFromDatabase(character);
          characters.push({
            id: character.id,
            accountId: character.accountId,
            firstName: character.firstName,
            lastName: character.lastName,
            dateOfBirth: character.dateOfBirth.toISOString(),
            createdAt: character.createdAt.toISOString(),
            deletedAt: character.deletedAt?.toISOString(),
            lastX: character.lastX.toNumber(),
            lastY: character.lastY.toNumber(),
            lastZ: character.lastZ.toNumber(),
            model: character.model,
            face,
            components: character.components as number[],
          });
        }

        cb(characters);
      } catch (e) {
        console.error('getCharacters error', e);
        cb([]);
      }
    });

    socket.on('createCharacter', async (characterData, faceData, cb) => {
      const character = await Characters.createCharacter(socket.data.user.userId, characterData, faceData);
      if (character) {
        await Inventories.createInventory(`character:${character.id}`);
      }
      cb();
    });

    socket.on('character-select.choose', async (characterId, serverId, steamId) => {
      const ownsCharacter = await Characters.doesPlayerOwnCharacter(characterId, steamId);
      if (!ownsCharacter) {
        serverNamespace.emit(
          'player-management.kick',
          serverId,
          'You do not own this character please try again later.',
        );
        return;
      }
      logInfoC('socket.data', socket.data);
      socket.data.character = { id: characterId };
      socket.data.serverId = serverId;
      await Characters.setActiveCharacter(characterId, serverId, socket, steamId);
      logInfoC('character-select.choose', characterId);
    });

    socket.on('character-update.food-drink', async (food, drink) => {
      if (!socket.data.character || !socket.data.character.id) return;
      await Characters.updateLocalCharacterAtributeWithCharId(socket.data.character.id, 'food', food);
      await Characters.updateLocalCharacterAtributeWithCharId(socket.data.character.id, 'drink', drink);
      logInfoC('character-update.food-drink', food, drink, socket.data.character.id);
    });

    socket.on(
      'character-update.health-status',
      (boneHealth, boneStatus, sick, activeTonic, health, stamina, litersOfBlood) => {
        if (!socket.data.character || !socket.data.character.id) return;
        const metadata = {
          boneHealth,
          boneStatus,
          sick,
          activeTonic,
          health,
          stamina,
          litersOfBlood,
        };
        Characters.updateLocalCharacterAtributeWithCharId(socket.data.character, 'healthMetadata', metadata);
        logInfoC(
          'character-update.health-status',
          socket.data.character.id,
          JSON.stringify(boneHealth),
          JSON.stringify(boneStatus),
          sick,
          activeTonic,
          health,
          stamina,
          litersOfBlood,
        );
      },
    );
  });
};
