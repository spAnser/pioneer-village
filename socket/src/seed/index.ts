import { PrismaClient } from '@prisma/client';

import { developers, datas } from './data';

export const seedDB = async (prisma: PrismaClient) => {
  for (const developer of developers) {
    const account = await prisma.accounts.findFirst({
      where: {
        identifier_steam: `steam:${developer}`,
      },
    });
    const accountNotExists = !account;
    const results = await prisma.accounts.upsert({
      where: {
        identifier_steam: `steam:${developer}`,
      },
      create: {
        identifier_steam: `steam:${developer}`,
        allowed: true,
        role: 'DEVELOPER',
        priority: 69,
      },
      update: {
        allowed: true,
        role: 'DEVELOPER',
        priority: 69,
      },
    });

    if (accountNotExists && results && datas[developer]) {
      for (const data of datas[developer]) {
        const character = await prisma.characters.create({
          data: {
            accountId: results.id,
            ...data.character,
          },
        });

        if (character) {
          await prisma.faces.create({
            data: {
              characterId: character.id,
              ...data.face,
            },
          });

          await prisma.inventory.create({
            data: {
              identifier: `character:${character.id}`,
              container: {
                create: {},
              },
            },
          });

          await prisma.inventory.create({
            data: {
              identifier: `clothing:${character.id}`,
              container: {
                create: {},
              },
            },
          });

          if (data.horses) {
            for (const horseData of data.horses) {
              const horse = await prisma.horses.create({
                data: {
                  ownerId: character.id,
                  stable: '',
                  age: 5,
                  ...horseData,
                },
              });
            }
          }
        }
      }
    }
  }
};
