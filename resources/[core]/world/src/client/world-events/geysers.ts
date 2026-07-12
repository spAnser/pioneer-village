import { PVGame, PVWorld, addZone } from '@lib/client';
import { onSocket } from '@lib/client/comms/ui';
import { Delay } from '@lib/functions';
import { Vector3, lerp } from '@lib/math';

import ptfxManager from '../managers/ptfx-manager';

const GeyserDict = 'scr_discoverables';
const GeyserFx = 'ent_amb_steam_geyser';
const CameraShakeName = 'LARGE_EXPLOSION_SHAKE';

// <editor-fold desc="Geyser Show">
const Geysers = [
  {
    name: 'geyser_1',
    coords: { x: 224.4436, y: 1906.525, z: 206.0843 },
    zoneOffset: { x: 0, y: 0, z: 0.823 },
    force: 32,
  },
  {
    name: 'geyser_2',
    coords: { x: 191.666, y: 1831.29, z: 200.4614 },
    zoneOffset: { x: 0, y: 0, z: 1.4 },
    force: 28,
  },
  {
    name: 'geyser_3',
    coords: { x: 129.107, y: 1878.372, z: 200.1505 },
    zoneOffset: { x: 0, y: 0, z: 1.0 },
    force: 24,
  },
];

let geysersActive = false;

const distanceFromGeyser = (id: string): number => {
  const geyser = Geysers.find((g) => g.name === id);
  if (!geyser) return Infinity;

  const playerCoords = Vector3.fromObject(PVGame.playerCoords(true));
  return playerCoords.getDistance(geyser.coords);
};

const getShakeIntensity = (distance: number): number => {
  if (distance > 25) return 0;
  return lerp(0.25, 0.01, distance / 25);
};

onSocket('world.geyser-show', async (steps: World.GeyserShowSteps) => {
  if (geysersActive) return;
  geysersActive = true;
  console.log('[Geysers]', 'Playing geyser show sequence');

  for (const step of steps) {
    switch (step._type) {
      case 'start': {
        const geyser = Geysers.find((g) => g.name === step.id);
        if (geyser) {
          await ptfxManager.startFxAtCoords(geyser.name, true, GeyserDict, GeyserFx, geyser.coords);
        }
        break;
      }

      case 'evolve': {
        if (step.evolutions) {
          ptfxManager.setFxEvolutions(step.id, step.evolutions);

          // Camera shake when erupting
          if (step.evolutions.erupt && step.evolutions.erupt > 0) {
            const shakeIntensity = getShakeIntensity(distanceFromGeyser(step.id));
            console.log('[Geysers]', `Eruption camera shake intensity: ${shakeIntensity.toFixed(3)}`);
            if (shakeIntensity > 0) {
              ShakeGameplayCam(CameraShakeName, shakeIntensity);

              const playerPed = PVGame.playerPed();

              SetPedWetnessHeight(playerPed, 1.0);
              // @ts-ignore GetPedWetness not defined currently
              const wetness = Math.max(GetPedWetness(playerPed), lerp(0, 1, shakeIntensity / 0.25));
              console.log('[Geysers]', `Setting player wetness to: ${wetness.toFixed(3)}`);
              SetPedWetness(playerPed, wetness);

              if (shakeIntensity > 0.2) {
                const playerCoords = Vector3.fromObject(PVGame.playerCoords(true));
                SetPedToRagdoll(playerPed, 2000, 3000, 0, false, false, false);
                await Delay(1);
                const geyserData = Geysers.find((g) => g.name === step.id);
                if (!geyserData) break;
                let directionVector = playerCoords.sub(geyserData.coords);
                directionVector.z = 0;
                directionVector = directionVector.normalize();
                const forceVector = directionVector.multiplyScalar(lerp(2, 15, (shakeIntensity - 0.2) / 0.05));
                ApplyForceToEntity(
                  playerPed,
                  1,
                  forceVector.x,
                  forceVector.y,
                  forceVector.z,
                  0.0,
                  0.0,
                  0.0,
                  0,
                  false,
                  false,
                  true,
                  false,
                  true,
                );
              }
            }
          } else if (step.evolutions.erupt === 0) {
            StopGameplayCamShakingWithName(CameraShakeName, false);
          }
        }
        break;
      }

      case 'stop': {
        ptfxManager.stopFx(step.id);
        break;
      }
    }

    if (step.delayAfter) {
      await Delay(step.delayAfter);
    }
  }

  geysersActive = false;
  console.log('[Geysers]', 'Geyser show complete');
});

// </editor-fold>

// <editor-fold desc="Geyser Ejection">
AddStateBagChangeHandler(
  'applyForce',
  '',
  (bag: string, key: string, value: [number, number, number], reserved: number, replicated: boolean) => {
    if (!value || replicated) return;
    const player = GetPlayerFromStateBagName(bag);
    const entity = GetPlayerPed(player);

    const forceVector = Vector3.fromArray(value);

    ApplyForceToEntity(
      entity,
      1,
      forceVector.x,
      forceVector.y,
      forceVector.z,
      0.0,
      0.0,
      0.0,
      0,
      false,
      false,
      true,
      false,
      true,
    );
  },
);

const geyserEject = async (name: string, coords: Vector3Format, force: number) => {
  const playerPed = PlayerPedId();
  const playerCoords = Vector3.fromArray(GetEntityCoords(playerPed, true));

  await PVWorld.startFxAtCoords(name, true, GeyserDict, GeyserFx, coords);
  PVWorld.setFxEvolutions(name, {
    steam: 0.5,
    erupt: 1.0,
  });
  ShakeGameplayCam(CameraShakeName, 0.25);

  let forceVector = playerCoords.sub({ x: coords.x, y: coords.y, z: playerCoords.z - 3.0 });
  forceVector = forceVector.magnitude() !== 0 ? forceVector.normalize() : new Vector3(0, 0, 0);
  forceVector = forceVector.multiplyScalar(force);

  SetPedToRagdoll(playerPed, 3000, 5000, 0, false, false, false);
  await Delay(25);
  LocalPlayer.state.set('applyForce', forceVector.toArray(), true);

  SetPedToRagdoll(playerPed, 3000, 5000, 0, false, false, false);

  await Delay(2_000);
  LocalPlayer.state.set('applyForce', undefined, true);
  PVWorld.setFxEvolutions(name, {
    erupt: 0.0,
    steam: 1.0,
  });
  StopGameplayCamShakingWithName(CameraShakeName, false);

  await Delay(5_000);
  PVWorld.setFxEvolution(name, 'steam', 0.75);

  await Delay(5_000);
  PVWorld.setFxEvolution(name, 'steam', 0.5);

  await Delay(5_000);
  PVWorld.setFxEvolution(name, 'steam', 0.25);

  await Delay(5_000);
  PVWorld.stopFx(name);
};

for (const geyser of Geysers) {
  const coords = Vector3.fromObject(geyser.coords);

  addZone({
    _type: 'sphere',
    coords: coords.add(geyser.zoneOffset).toObject(),
    radius: 1.25,
    name: `zone_${geyser.name}`,
    onEnter: () => {
      // console.log('Entered geyser zone 1');
      geyserEject('geyser', geyser.coords, 32);
    },
    // onExit: () => {
    //   console.log('Exited geyser zone 1');
    // },
  });
}
// </editor-fold>
