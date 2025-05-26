import { PrismaClient } from '@prisma/client';
import { serverNamespace, userNamespace } from '../server';
import Characters, { GetFaceDataFromDatabase } from '../managers/characters';
import Inventories from '../managers/inventories';
import { logGreen, logInfoC, logInfoS } from '../helpers/log';

export default (prisma: PrismaClient, userAccessKey: string) => {
  Characters.setDB(prisma);

  serverNamespace.on('connection', (socket) => {
    logGreen('[Characters]', 'Game server connected');

    socket.on('character-update.last-position', async (serverId, coords) => {
      const selectedCharacter = Characters.getActiveCharacterForServerId(serverId);
      if (selectedCharacter !== undefined) {
        logInfoS(
          '[Characters]',
          `Player ${serverId} updated character ${
            selectedCharacter.id
          } and set last position ${JSON.stringify(coords)}`,
        );
        await Characters.setLastCoords(selectedCharacter.id, coords);
      }
    });

    socket.on('character-event.disconnected', (serverId) => {
      Characters.setCharacterAsNoLongerActive(serverId);
      logInfoS('[Characters]', `Player ${serverId} was just disconnected and performed character cleanup`);
    });

    socket.on('character-get.food-drink', async (charId, cb) => {
      if (!charId) {
        cb(0, 0);
      } else {
        const result = await Characters.getCharacterFoodAndDrink(charId);
        logInfoS('[Characters]', 'character-get.food-drink', charId, JSON.stringify(result));
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

    socket.on('customization.finalize', async (json) => {
      const data = JSON.parse(json);
      logInfoC('[Characters]', 'customization.finalize', data);

      const character = await Characters.createCharacter(
        socket.data.user.userId,
        {
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth,
          lastX: 0,
          lastY: 0,
          lastZ: 0,
          model: data.model || data.gender === 'female' ? 'MP_FEMALE' : 'MP_MALE',
          components: [], // data.components
          clothing: data.clothing,
        },
        data.currentFaceOptions,
      );

      if (character) {
        await Inventories.createInventory(`character:${character.id}`);
        const clothingInv = await Inventories.createInventory(`clothing:${character.id}`);

        if (clothingInv) {
          for (const [category, item] of Object.entries<Record<string, any>>(data.currentComponents)) {
            await Inventories.addItem(clothingInv.identifier, -1007727220, 1, item);
          }
        }
      }
    });

    socket.on('getCharacters', async (cb) => {
      try {
        const characters: Game.Character[] = [];
        const prismaCharacters = await Characters.getCharacters(socket.data.user.userId);

        for (const character of prismaCharacters) {
          const clothingInventory = await Inventories.getInventoryForUI(`clothing:${character.id}`);

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
            clothing: Object.values(clothingInventory?.items || []),
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
        await Inventories.createInventory(`clothing:${character.id}`);
      }
      cb();
    });

    socket.on('character-select.choose', async (characterId, steamId) => {
      const ownsCharacter = await Characters.doesPlayerOwnCharacter(characterId, steamId);
      if (!ownsCharacter) {
        serverNamespace.emit(
          'player-management.kick',
          socket.data.user.serverId,
          'You do not own this character please try again later.',
        );
        return;
      }
      logInfoC('socket.data', socket.data);
      socket.data.character = { id: characterId };
      socket.data.serverId = socket.data.user.serverId;
      await Characters.setActiveCharacter(
        characterId,
        socket.data.user.serverId,
        socket,
        steamId,
        socket.data.user.userId,
      );
      logInfoC('character-select.choose', characterId);
    });

    socket.on('character-update.food-drink', async (food, drink) => {
      if (!socket.data.character || !socket.data.character.id) return;
      Characters.updateLocalCharacterAtributeWithCharId(socket.data.character.id, 'food', food);
      Characters.updateLocalCharacterAtributeWithCharId(socket.data.character.id, 'drink', drink);
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

        logInfoC(
          'character-update.health-status',
          socket.data.character.id,
          // JSON.stringify(boneHealth, null, 2),
          // JSON.stringify(boneStatus, null, 2),
          sick,
          activeTonic,
          health,
          stamina,
          litersOfBlood,
        );

        Characters.updateLocalCharacterAtributeWithCharId(socket.data.character.id, 'healthMetadata', metadata);
        Characters.updateCharacterHealthMetadata(socket.data.character.id, metadata);
      },
    );
  });
};

// declare interface CharacterHealthMetadata {
//   health: number;
//   stamina: number;
//   boneHealth: any[];
//   boneStatus: any[];
//   sick: boolean;
//   activeTonic: boolean;
//   litersOfBlood: number;
// }
