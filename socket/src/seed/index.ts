import { eq } from 'drizzle-orm';
import { db } from '../db/connection';
import { accounts, characters, faces, inventory, container, horses } from '../db/schema';

import { developers, datas } from './data';

export const seedDB = async () => {
  for (const developer of developers) {
    const existingAccount = await db
      .select()
      .from(accounts)
      .where(eq(accounts.identifier_steam, `steam:${developer}`))
      .limit(1);

    const accountNotExists = existingAccount.length === 0;
    
    let results;
    if (accountNotExists) {
      results = await db.insert(accounts).values({
        identifier_steam: `steam:${developer}`,
        allowed: true,
        role: 'DEVELOPER',
        priority: 69,
      }).returning();
    } else {
      results = await db
        .update(accounts)
        .set({
          allowed: true,
          role: 'DEVELOPER',
          priority: 69,
        })
        .where(eq(accounts.identifier_steam, `steam:${developer}`))
        .returning();
    }

    if (accountNotExists && results && results.length > 0 && datas[developer]) {
      for (const data of datas[developer]) {
        const character = await db.insert(characters).values({
          accountId: results[0].id,
          firstName: data.character.firstName,
          lastName: data.character.lastName,
          dateOfBirth: new Date(data.character.dateOfBirth),
          lastX: data.character.lastX?.toString() || '0.0',
          lastY: data.character.lastY?.toString() || '0.0',
          lastZ: data.character.lastZ?.toString() || '0.0',
          food: data.character.food?.toString() || '100.0',
          drink: data.character.drink?.toString() || '100.0',
          currencies: data.character.currencies || { dollars: 20, gold: 0 },
          healthMetadata: data.character.healthMetadata || {
            health: 100,
            stamina: 100,
            litersOfBlood: 5,
            boneHealth: [],
            activeTonic: false,
            sick: false,
            boneStatus: [],
          },
          components: data.character.components || [],
          model: data.character.model || 'mp_male',
          whistle: data.character.whistle || { pitch: 0.5, shape: 5, clarity: 0.5 },
          features: data.character.features || {},
        }).returning();

        if (character && character.length > 0) {
          await db.insert(faces).values({
            characterId: character[0].id,
            noseHeight: data.face.noseHeight?.toString() || '0.0',
            lowerLipWidth: data.face.lowerLipWidth?.toString() || '0.0',
            upperLipHeight: data.face.upperLipHeight?.toString() || '0.0',
            earlobeSize: data.face.earlobeSize?.toString() || '0.0',
            lowerLipHeight: data.face.lowerLipHeight?.toString() || '0.0',
            eyebrowHeight: data.face.eyebrowHeight?.toString() || '0.0',
            jawHeight: data.face.jawHeight?.toString() || '0.0',
            eyesDistance: data.face.eyesDistance?.toString() || '0.0',
            mouthDepth: data.face.mouthDepth?.toString() || '0.0',
            mouthWidth: data.face.mouthWidth?.toString() || '0.0',
            noseCurvature: data.face.noseCurvature?.toString() || '0.0',
            eyebrowDepth: data.face.eyebrowDepth?.toString() || '0.0',
            earsHeight: data.face.earsHeight?.toString() || '0.0',
            noseSize: data.face.noseSize?.toString() || '0.0',
            headWidth: data.face.headWidth?.toString() || '0.0',
            eyelidWidth: data.face.eyelidWidth?.toString() || '0.0',
            mouthYPos: data.face.mouthYPos?.toString() || '0.0',
            earsWidth: data.face.earsWidth?.toString() || '0.0',
            jawWidth: data.face.jawWidth?.toString() || '0.0',
            nostrilsDistance: data.face.nostrilsDistance?.toString() || '0.0',
            noseWidth: data.face.noseWidth?.toString() || '0.0',
            eyesHeight: data.face.eyesHeight?.toString() || '0.0',
            chinHeight: data.face.chinHeight?.toString() || '0.0',
            upperLipWidth: data.face.upperLipWidth?.toString() || '0.0',
            eyebrowWidth: data.face.eyebrowWidth?.toString() || '0.0',
            cheekBoneWidth: data.face.cheekBoneWidth?.toString() || '0.0',
            chinWidth: data.face.chinWidth?.toString() || '0.0',
            eyesAngle: data.face.eyesAngle?.toString() || '0.0',
            earsAngle: data.face.earsAngle?.toString() || '0.0',
            jawDepth: data.face.jawDepth?.toString() || '0.0',
            eyelidHeight: data.face.eyelidHeight?.toString() || '0.0',
            cheekBoneHeight: data.face.cheekBoneHeight?.toString() || '0.0',
            chinDepth: data.face.chinDepth?.toString() || '0.0',
            cheekBoneDepth: data.face.cheekBoneDepth?.toString() || '0.0',
            upperLipDepth: data.face.upperLipDepth?.toString() || '0.0',
            noseAngle: data.face.noseAngle?.toString() || '0.0',
            mouthXPos: data.face.mouthXPos?.toString() || '0.0',
            lowerLipDepth: data.face.lowerLipDepth?.toString() || '0.0',
            eyesDepth: data.face.eyesDepth?.toString() || '0.0',
            overlays: data.face.overlays || {},
          });

          // Create character inventory container
          const characterContainer = await db.insert(container).values({}).returning();
          await db.insert(inventory).values({
            identifier: `character:${character[0].id}`,
            containerId: characterContainer[0].id,
          });

          // Create clothing inventory container
          const clothingContainer = await db.insert(container).values({}).returning();
          await db.insert(inventory).values({
            identifier: `clothing:${character[0].id}`,
            containerId: clothingContainer[0].id,
          });

          if (data.horses) {
            for (const horseData of data.horses) {
              await db.insert(horses).values({
                ownerId: character[0].id,
                stable: '',
                age: 5,
                name: horseData.name,
                breeds: horseData.breeds,
                components: horseData.components || [],
                model: horseData.model,
                gender: horseData.gender,
                weight: horseData.weight?.toString() || '500.0',
                food: horseData.food?.toString() || '100.0',
                water: horseData.water?.toString() || '100.0',
                health: horseData.health?.toString() || '100.0',
                cleanliness: horseData.cleanliness?.toString() || '100.0',
                neuteredFixed: horseData.neuteredFixed || false,
                statOffRoad: horseData.statOffRoad || 50,
                statHealth: horseData.statHealth || 50,
                statEndurance: horseData.statEndurance || 50,
                statFertility: horseData.statFertility || 50,
                statHandling: horseData.statHandling || 50,
                statSpeed: horseData.statSpeed || 50,
                statAcceleration: horseData.statAcceleration || 50,
                statBonding: horseData.statBonding || {},
                hooves: horseData.hooves?.toString() || '100.0',
                horseshoes: horseData.horseshoes?.toString() || '0.0',
                metadata: horseData.metadata || {},
                lastX: horseData.lastX?.toString() || '0.0',
                lastY: horseData.lastY?.toString() || '0.0',
                lastZ: horseData.lastZ?.toString() || '0.0',
              });
            }
          }
        }
      }
    }
  }
};
