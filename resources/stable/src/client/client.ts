import { PVCustomization, PVDoors, PVGame, TxtAtWorldCoord, awaitUI } from '@lib/client';
import { emitSocket } from '@lib/client/comms/ui';
import { Delay } from '@lib/functions';
import { lerp } from '@lib/math';

import HorseExpressions from '../shared/data/horse-expressions';
import { DNA } from '../shared/dna';
import './classes/horse-genetics';
import peltController from './controllers/pelt-controller';
import stableController from './controllers/stable-controller';
import './events';
import './targets';
import './zones';

peltController;

async function spawnChildHorse(child: DNA, model: string | number) {
  // const model = model1;
  const coords = PVGame.playerCoords();
  // const offsety = Math.random() * 10 - 5;
  const horsePed = await PVGame.createPed(model, coords.x + 3, coords.y, coords.z - 1, 180, true, true);

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

RegisterCommand(
  'breedHorses',
  async (source: number, args: any[], rawCommand: string) => {
    // console.log({ source, args, rawCommand });
    const horses = await awaitUI('stable.breed-horses', Number(args[0]), Number(args[1]));

    // if (args.length < 2 || args[0] === args[1]) {
    //   console.log('Usage: /breedHorses [horseId1] [horseId2]');
    //   return;
    // }
    //
    // const horseId1 = Number(args[0]);
    // const horseId2 = Number(args[1]);
    //
    // const horse1 = stableController.getHorseById(horseId1);
    // const horse2 = stableController.getHorseById(horseId2);
    //
    // if (!horse1 || !horse2 || horse1.gender === horse2.gender || horse1.neuteredFixed || horse2.neuteredFixed) {
    //   return;
    // }
    //
    // console.log('awaitUI', horseId1, horseId2);
    // const horses = await awaitUI('stable.breed-horses', horseId1, horseId2);
    //
    // if (!horses) {
    //   return;
    // }
    //
    // const [Mother, Foal] = horses;

    //

    // console.log('Breeding horses', horse1.name, '<->', horse2.name);
    // console.log(horse1.dna);
    //
    // const child = DNA.crossover(horse1.dna, horse2.dna, {
    //   inheritanceMode: 'random',
    // });
    //
    // console.log('Child:', child.toString());
    //
    // child.metadata.generation = horse1.dna.metadata.generation + 1;
    // // console.log('Child Metadata:', child.metadata);
    //
    // const horsePed = await spawnChildHorse(child, Math.random() < 0.5 ? horse1.model : horse2.model);
    //
    // console.log('horsePed', horsePed);
  },
  false,
);

RegisterCommand(
  'debugStalls',
  async (source: number, args: any[], rawCommand: string) => {
    // console.log({ source, args, rawCommand });

    const start = Date.now();
    while (true) {
      await Delay(0);

      const stableData = stableController.currentStableData();

      if (!stableData) {
        console.log('No stable data');
        break;
      }

      let doors = [];
      let n = 0;
      for (const stall of stableData.stalls) {
        TxtAtWorldCoord(stall.x, stall.y, stall.z, `${n}`, 0.25);
        const door = PVDoors.getClosestDoorToCoords({
          x: stall.x,
          y: stall.y,
          z: stall.z,
        });

        if (door) {
          doors.push(door);
        }
        n++;
      }

      if (Date.now() - start > 2_000) {
        console.log('Stall Doors', `${doors.length}/${stableData.stalls.length}`, `stallDoors: [${doors.join(',')}]`);
        break;
      }
    }
  },
  false,
);
