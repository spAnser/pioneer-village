import { PrismaClient } from '@prisma/client';
import { serverNamespace, userNamespace } from '../server';
import Characters from '../managers/characters';
import Inventories from '../managers/inventories';
import { logGreen, logInfoC } from '../helpers/log';

export default (prisma: PrismaClient) => {
  Characters.setDB(prisma);

  const activeCharacters: Map<string, number> = new Map();

  serverNamespace.on('connection', (socket) => {
    logGreen('[Characters] Game server connected');
  });

  userNamespace.on('connection', (socket) => {
    logInfoC('user connected', socket.data);

    socket.on('getCharacters', async (cb) => {
      try {
        const characters: Game.Character[] = [];
        const prismaCharacters = await Characters.getCharacters(socket.data.user.userId);

        for (const character of prismaCharacters) {
          // NOTE: There are defaults just in case, but they should never really not exist in the DB
          const face: Game.Face = {
            id: character.face?.id || 0,
            noseHeight: character.face?.noseHeight.toNumber() || 0,
            lowerLipWidth: character.face?.lowerLipWidth.toNumber() || 0,
            upperLipHeight: character.face?.upperLipHeight.toNumber() || 0,
            earlobeSize: character.face?.earlobeSize.toNumber() || 0,
            lowerLipHeight: character.face?.lowerLipHeight.toNumber() || 0,
            eyebrowHeight: character.face?.eyebrowHeight.toNumber() || 0,
            jawHeight: character.face?.jawHeight.toNumber() || 0,
            eyesDistance: character.face?.eyesDistance.toNumber() || 0,
            mouthDepth: character.face?.mouthDepth.toNumber() || 0,
            mouthWidth: character.face?.mouthWidth.toNumber() || 0,
            noseCurvature: character.face?.noseCurvature.toNumber() || 0,
            eyebrowDepth: character.face?.eyebrowDepth.toNumber() || 0,
            earsHeight: character.face?.earsHeight.toNumber() || 0,
            noseSize: character.face?.noseSize.toNumber() || 0,
            headWidth: character.face?.headWidth.toNumber() || 0,
            eyelidWidth: character.face?.eyelidWidth.toNumber() || 0,
            mouthYPos: character.face?.mouthYPos.toNumber() || 0,
            earsWidth: character.face?.earsWidth.toNumber() || 0,
            jawWidth: character.face?.jawWidth.toNumber() || 0,
            nostrilsDistance: character.face?.nostrilsDistance.toNumber() || 0,
            noseWidth: character.face?.noseWidth.toNumber() || 0,
            eyesHeight: character.face?.eyesHeight.toNumber() || 0,
            chinHeight: character.face?.chinHeight.toNumber() || 0,
            upperLipWidth: character.face?.upperLipWidth.toNumber() || 0,
            eyebrowWidth: character.face?.eyebrowWidth.toNumber() || 0,
            cheekBoneWidth: character.face?.cheekBoneWidth.toNumber() || 0,
            chinWidth: character.face?.chinWidth.toNumber() || 0,
            eyesAngle: character.face?.eyesAngle.toNumber() || 0,
            earsAngle: character.face?.earsAngle.toNumber() || 0,
            jawDepth: character.face?.jawDepth.toNumber() || 0,
            eyelidHeight: character.face?.eyelidHeight.toNumber() || 0,
            cheekBoneHeight: character.face?.cheekBoneHeight.toNumber() || 0,
            chinDepth: character.face?.chinDepth.toNumber() || 0,
            cheekBoneDepth: character.face?.cheekBoneDepth.toNumber() || 0,
            upperLipDepth: character.face?.upperLipDepth.toNumber() || 0,
            noseAngle: character.face?.noseAngle.toNumber() || 0,
            mouthXPos: character.face?.mouthXPos.toNumber() || 0,
            lowerLipDepth: character.face?.lowerLipDepth.toNumber() || 0,
            eyesDepth: character.face?.eyesDepth.toNumber() || 0,
            overlays: (character.face?.overlays as Record<string, any>) || {},
          };
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

    socket.on('character-select.choose', async (characterId) => {
      // TODO: Validate player owns character.
      logInfoC('socket.data', socket.data);
      socket.data.character = { id: characterId };
      activeCharacters.set(socket.id, characterId);
      logInfoC('character-select.choose', characterId);
    });
  });
};
