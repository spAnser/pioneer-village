import { PVBase, PVCustomization, PVGame } from '@lib/client';
import { Delay } from '@lib/functions';
import { lerp } from '@lib/math';

import HorseExpressions from '../../shared/data/horse-expressions';
import HorseModelScales from '../../shared/data/horse-model-scales';
import { CreepMutation, DNA, DNABuilder, DNAUtils, GaussianMutation } from '../../shared/dna';

RegisterCommand(
  'HorseBreedingTest',
  async (source: number, args: any[], rawCommand: string) => {
    // console.log({ source, args, rawCommand });
    const model1 =
      args[0] || Object.keys(HorseModelScales)[Math.floor(Math.random() * Object.keys(HorseModelScales).length)];
    const model2 =
      args[1] || Object.keys(HorseModelScales)[Math.floor(Math.random() * Object.keys(HorseModelScales).length)];
    console.log('Breeding', model1, 'and', model2);

    if (!(model1 in HorseModelScales)) {
      console.log('Invalid horse model1:', model1);
      return;
    }
    if (!(model2 in HorseModelScales)) {
      console.log('Invalid horse model2:', model2);
      return;
    }

    const coords = PVGame.playerCoords();
    const parent1Ped = await PVGame.createPed(model1, coords.x + 7, coords.y - 1, coords.z - 1, 90, true, true);
    const parent2Ped = await PVGame.createPed(model2, coords.x + 7, coords.y + 1, coords.z - 1, 90, true, true);

    await PVGame.pedIsReadyToRender(parent1Ped);
    await PVGame.pedIsReadyToRender(parent2Ped);

    const parent1HeadIndex = PVCustomization.getIndexForHorsePart(parent1Ped, 'hand');
    console.log('parent1HeadIndex', parent1HeadIndex);
    const parent2HeadIndex = PVCustomization.getIndexForHorsePart(parent1Ped, 'hand');
    console.log('parent2HeadIndex', parent2HeadIndex);
    const parent1ManeIndex = PVCustomization.getIndexForHorsePart(parent1Ped, 'mane');
    console.log('parent1ManeIndex', parent1ManeIndex);
    const parent2ManeIndex = PVCustomization.getIndexForHorsePart(parent1Ped, 'mane');
    console.log('parent2ManeIndex', parent2ManeIndex);

    await Delay(1_000);
    // PVBase.deleteEntities([parent1Ped, parent2Ped]);

    const parent1HeadTints = PVCustomization.getTintAtIndex(parent1Ped, parent1HeadIndex);
    // console.log('parent1HeadTints', parent1HeadTints);
    const parent2HeadTints = PVCustomization.getTintAtIndex(parent2Ped, parent2HeadIndex);
    // console.log('parent2HeadTints', parent2HeadTints);
    const parent1ManeTints = PVCustomization.getTintAtIndex(parent1Ped, parent1ManeIndex);
    // console.log('parent1ManeTints', parent1ManeTints);
    const parent2ManeTints = PVCustomization.getTintAtIndex(parent2Ped, parent2ManeIndex);
    // console.log('parent2ManeTints', parent2ManeTints);

    // @ts-ignore
    const parent1Scale = HorseModelScales[model1];
    // @ts-ignore
    const parent2Scale = HorseModelScales[model2];

    // if (Math.random() < Infinity) {
    //   return;
    // }

    // Create parent DNAs
    const parent1builder = new DNABuilder()
      .withMetadata('name', 'Parent 1')
      .withMetadata('generation', 0)
      .addGene('OffRoad', 1000 * Math.random() + 1000)
      .addGene('Health', 1000 * Math.random() + 1000)
      .addGene('Endurance', 1000 * Math.random() + 1000)
      .addGene('Handling', 1000 * Math.random() + 1000)
      .addGene('Speed', 1000 * Math.random() + 1000)
      .addGene('Acceleration', 1000 * Math.random() + 1000)
      .addGene('Scale', parent1Scale)
      .addGene('BodyTint0', parent1HeadTints.tint0)
      .addGene('BodyTint1', parent1HeadTints.tint1)
      .addGene('BodyTint2', parent1HeadTints.tint2)
      .addGene('HairTint0', parent1ManeTints.tint0)
      .addGene('HairTint1', parent1ManeTints.tint1)
      .addGene('HairTint2', parent1ManeTints.tint2);

    const parent2builder = new DNABuilder()
      .withMetadata('name', 'Parent 2')
      .withMetadata('generation', 0)
      .addGene('OffRoad', 1000 * Math.random() + 500)
      .addGene('Health', 1000 * Math.random() + 500)
      .addGene('Endurance', 1000 * Math.random() + 500)
      .addGene('Handling', 1000 * Math.random() + 500)
      .addGene('Speed', 1000 * Math.random() + 500)
      .addGene('Acceleration', 1000 * Math.random() + 500)
      .addGene('Scale', parent2Scale)
      .addGene('BodyTint0', parent2HeadTints.tint0)
      .addGene('BodyTint1', parent2HeadTints.tint1)
      .addGene('BodyTint2', parent2HeadTints.tint2)
      .addGene('HairTint0', parent2ManeTints.tint0)
      .addGene('HairTint1', parent2ManeTints.tint1)
      .addGene('HairTint2', parent2ManeTints.tint2);

    for (const [name, id] of Object.entries(HorseExpressions)) {
      const value1 = GetCharExpression(parent1Ped, id);
      const value2 = GetCharExpression(parent2Ped, id);
      parent1builder.addGene(name, value1);
      parent2builder.addGene(name, value2);
    }
    // getComponents(parent1Ped);
    // getComponents(parent2Ped);

    let parent1 = parent1builder.build();
    let parent2 = parent2builder.build();

    // console.log('Parent 1:', parent1.toString());
    // console.log('Parent 2:', parent2.toString());

    async function spawnChildHorse(child: DNA, offsetX = 0, offsetY = 0) {
      const model = Math.random() > 0.5 ? model1 : model2;
      // const model = model1;
      const coords = PVGame.playerCoords();
      // const offsety = Math.random() * 10 - 5;
      const horsePed = await PVGame.createPed(
        model,
        coords.x + 3 + offsetX,
        coords.y + offsetY,
        coords.z - 1,
        180,
        true,
        true,
      );

      for (const [name, id] of Object.entries(HorseExpressions)) {
        const gene = child.getGene<number>(name);
        if (gene) {
          SetCharExpression(horsePed, id, gene.value);
        }
      }

      // 0 = -1 | 1000 = 0 | 2000 = 1
      // 8147 | Health | Handling | Speed
      // 3015 | OffRoad | Endurance | Acceleration
      const HealthHandlingSpeed =
        (child.getGene<number>('Health')?.value || 0) +
        (child.getGene<number>('Handling')?.value || 0) +
        (child.getGene<number>('Speed')?.value || 0);
      SetCharExpression(horsePed, 8147, lerp(-1, 1, HealthHandlingSpeed / 6000));
      const OffRoadEnduranceAcceleration =
        (child.getGene<number>('OffRoad')?.value || 0) +
        (child.getGene<number>('Endurance')?.value || 0) +
        (child.getGene<number>('Acceleration')?.value || 0);
      SetCharExpression(horsePed, 3015, lerp(-1, 1, OffRoadEnduranceAcceleration / 6000));

      await PVGame.pedIsReadyToRender(horsePed);

      SetPedScale(horsePed, child.getGene<number>('Scale')?.value || 1.0);
      // console.log('Scale', child.getGene<number>('Scale')?.value || 1.0);

      for (const part of ['head', 'hand']) {
        PVCustomization.setTintByHorsePart(
          horsePed,
          // @ts-ignore
          part,
          'metaped_tint_horse',
          Math.floor(child.getGene<number>('BodyTint0')?.value || 0),
          Math.floor(child.getGene<number>('BodyTint1')?.value || 0),
          Math.floor(child.getGene<number>('BodyTint2')?.value || 0),
        );

        // console.log(
        //   `Set ${part} tint to`,
        //   Math.floor(child.getGene<number>('BodyTint0')?.value || 0),
        //   Math.floor(child.getGene<number>('BodyTint1')?.value || 0),
        //   Math.floor(child.getGene<number>('BodyTint2')?.value || 0),
        // );
      }

      for (const part of ['hair', 'mane']) {
        PVCustomization.setTintByHorsePart(
          horsePed,
          // @ts-ignore
          part,
          'metaped_tint_horse',
          Math.floor(child.getGene<number>('HairTint0')?.value || 0),
          Math.floor(child.getGene<number>('HairTint1')?.value || 0),
          Math.floor(child.getGene<number>('HairTint2')?.value || 0),
        );
        // console.log(
        //   `Set ${part} tint to`,
        //   Math.floor(child.getGene<number>('HairTint0')?.value || 0),
        //   Math.floor(child.getGene<number>('HairTint1')?.value || 0),
        //   Math.floor(child.getGene<number>('HairTint2')?.value || 0),
        // );
      }

      PVGame.finalizePedOutfit(horsePed);

      console.log('horsePed', horsePed);

      return horsePed;
    }

    const count = 20;
    for (let i = count; i--; ) {
      // Create offspring with advanced crossover
      const child1 = DNA.crossover(parent1, parent2, {
        inheritanceMode: 'random',
      });
      const child2 = DNA.crossover(parent1, parent2, {
        inheritanceMode: 'random',
      });

      console.log('Child:', child1.toString());
      console.log('Child:', child2.toString());

      child1.metadata.generation = parent1.metadata.generation + 1;
      child2.metadata.generation = parent2.metadata.generation + 1;
      // console.log('Child Metadata:', child1.metadata);
      // console.log('Child Metadata:', child2.metadata);

      const horsePed1 = await spawnChildHorse(child1, 0, (i - count / 2) * 3);
      const horsePed2 = await spawnChildHorse(child2, 1, (i - count / 2) * 3);

      setTimeout(() => {
        PVBase.deleteEntities([horsePed1, horsePed2]);
      }, 15_000);

      if (i % 5 === 0) {
        parent1 = child1;
        parent2 = child2;
      }
    }

    setTimeout(() => {
      PVBase.deleteEntities([parent1Ped, parent2Ped]);
    }, 15_000);
  },
  false,
);

/*
const ped = 166404;
// PVCustomization.setTint(ped, 'metaped_tint_horse', 0, 0, 0);
// PVCustomization.removeTint(ped);
PVCustomization.setTintByHorsePart(
  ped,
  'head',
  'metaped_tint_horse',
  Math.floor(Math.random() * 255),
  Math.floor(Math.random() * 255),
  Math.floor(Math.random() * 255),
);
PVCustomization.setTintByHorsePart(
  ped,
  'hand',
  'metaped_tint_horse',
  Math.floor(Math.random() * 255),
  Math.floor(Math.random() * 255),
  Math.floor(Math.random() * 255),
);
PVCustomization.setTintByHorsePart(
  ped,
  'hair',
  'metaped_tint_horse',
  Math.floor(Math.random() * 255),
  Math.floor(Math.random() * 255),
  Math.floor(Math.random() * 255),
);
PVCustomization.setTintByHorsePart(
  ped,
  'mane',
  'metaped_tint_horse',
  Math.floor(Math.random() * 255),
  Math.floor(Math.random() * 255),
  Math.floor(Math.random() * 255),
);
PVGame.finalizePedOutfit(ped);
*/

function getComponents(entity: number) {
  const metaPedType = GetMetaPedType(entity);
  const componentCount = GetNumComponentsInPed(entity);

  for (let i = componentCount; i--; ) {
    const struct1 = new DataView(new ArrayBuffer(4));
    const struct2 = new DataView(new ArrayBuffer(4));

    // @ts-ignore
    const [component, argStruct, wearableState] = GetShopItemComponentAtIndex(entity, i, true, struct1, struct2) as [
      number,
      number,
      number,
    ];
    const componentCategory = GetShopItemComponentCategory(component, metaPedType, true);

    const palette = PVCustomization.getTintAtIndex(entity, i);
    if (palette.palette !== 0) {
      console.log(i, component, componentCategory, palette.palette, palette.tint0, palette.tint1, palette.tint2);
    }
  }
}

RegisterCommand(
  'GetDNA',
  async (source: number, args: any[], rawCommand: string) => {
    // console.log({ source, args, rawCommand });
    const ped = Number(args[0] || 0);
    if (!ped || !DoesEntityExist(ped)) {
      console.log('Invalid ped:', ped);
      return;
    }

    const builder = new DNABuilder().withMetadata('name', 'Kevin').withMetadata('generation', 0);
    const headIndex = PVCustomization.getIndexForHorsePart(ped, 'hand');
    console.log('headIndex', headIndex);
    const maneIndex = PVCustomization.getIndexForHorsePart(ped, 'mane');
    console.log('maneIndex', maneIndex);
    const headTints = PVCustomization.getTintAtIndex(ped, headIndex);
    console.log('headTints', headTints);
    const maneTints = PVCustomization.getTintAtIndex(ped, maneIndex);
    console.log('maneTints', maneTints);

    const pedScale = 0.91875;
    console.log('pedScale', pedScale);

    builder
      .addGene('OffRoad', GetAttributePoints(ped, 0))
      .addGene('Health', GetAttributePoints(ped, 1))
      .addGene('Endurance', GetAttributePoints(ped, 2))
      .addGene('Handling', GetAttributePoints(ped, 5))
      .addGene('Speed', GetAttributePoints(ped, 4))
      .addGene('Acceleration', GetAttributePoints(ped, 6))
      .addGene('Scale', pedScale)
      .addGene('BodyTint0', headTints.tint0)
      .addGene('BodyTint1', headTints.tint1)
      .addGene('BodyTint2', headTints.tint2)
      .addGene('HairTint0', maneTints.tint0)
      .addGene('HairTint1', maneTints.tint1)
      .addGene('HairTint2', maneTints.tint2);
    for (const [name, id] of Object.entries(HorseExpressions)) {
      const value = GetCharExpression(ped, id);
      builder.addGene(name, value);
    }
    console.log(builder.build().toJSON());
  },
  false,
);

/*
const PedAttribute = {
    PA_HEALTH: 0, // 1100 | 1700
    PA_STAMINA: 1, // 1100 | 1700
    PA_SPECIALABILITY: 2, // 1100 | 0
    PA_COURAGE: 3, // 0 | 1700
    PA_AGILITY: 4, // 0 | 1700
    PA_SPEED: 5, // 0 | 1700
    PA_ACCELERATION: 6, // 0 | 1700
    PA_BONDING: 7, // 0 | 2450
    SA_HUNGER: 8, // 100 | 100
    SA_FATIGUED: 9, // 100 100
    SA_INEBRIATED: 10, // 100 | 0
    SA_POISONED: 11, // 100 | 0
    SA_BODYHEAT: 12, // 100 | 100
    SA_BODYWEIGHT: 13, // 100 | 100
    SA_OVERFED: 14, // 100 | 100
    SA_SICKNESS: 15, // 100 | 0
    SA_DIRTINESS: 16, // 10000 | 10000
    SA_DIRTINESSHAT: 17, // 10000 | 10000
    MTR_STRENGTH: 18, // 100 | 100
    MTR_GRIT: 19, // 100 | 100
    MTR_INSTINCT: 20, // 100 | 0
    PA_UNRULINESS: 21, // 0 | 100
    SA_DIRTINESSSKIN: 22, // 10000 | 10000
};

Horse Attribute Ranks 0,1,3
Rank | Points
  3  | 0
  4  | 50
  5  | 100
  6  | 200
  7  | 350
  8  | 550
  9  | 800
 10  | 1100
 11  | 1400
 12  | 1700

Horse Attribute Ranks 4,5,6
Rank | Points
  0   | 0
  1  | 50
  2  | 100
  3  | 200
  4  | 350
  5  | 550
  6  | 800
  7  | 1100
  8  | 1400
  9  | 1700

Horse Attribute Ranks 7
Rank | Points
  0  | 0 | 0-49 Knocks off less frequently the higher number
  1  | 50 | 50+ Whistle Distance?
  2  | 400
  3  | 1150
  4  | 2450

Horse Attribute Points 8 = Unknown < & >= 25 Checks

Horse Attribute Points 13 = Weight
  0  | Malnourished
 10  | Thin
 30  | Fit
 70  | Overweight
 90  | Obese

SetAttributePoints(horse, 7, n) // Bonding
GetAttributeRank(horse, 7) // Bonding

TaskHorseAction
1,5, Rear
2,10, Rear Knock Off
8,9, Jump a bit

Citizen.InvokeNative(0x3B005FF0538ED2A9, entityId) // _GET_IS_WILD
Citizen.InvokeNative(0xAEB97D84CDF3C00B, entityId, 1) // _SET_IS_WILD

*/

function pointsToRank(points: number): number {
  if (points < 50) {
    return 0;
  }
  if (points < 100) {
    return 1;
  }
  if (points < 200) {
    return 2;
  }
  if (points < 350) {
    return 3;
  }
  if (points < 550) {
    return 4;
  }
  if (points < 800) {
    return 5;
  }
  if (points < 1100) {
    return 6;
  }
  if (points < 1400) {
    return 7;
  }
  if (points < 1700) {
    return 8;
  }
  return 9;
}

RegisterCommand(
  'getAttributes',
  async (source: number, args: any[], rawCommand: string) => {
    for (let n = 0; n <= 22; n++) {
      const attr = GetAttributePoints(Number(args[0]), n);
      console.log(`Attribute ${n}: ${attr} Rank: ${pointsToRank(attr)}`);
    }
  },
  false,
);
