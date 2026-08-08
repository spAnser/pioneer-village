import { PVBase } from '@lib/client';
import { Vector3 } from '@lib/math';
import BirdTypes from '@lib/shared/bird-types';
import { BlipModifiers, BlipSprites, BlipStyles } from '@lib/shared/blips';

const BLIP_ID = 'debug-bird-flight';

interface FlightSim {
  originX: number;
  originY: number;
  originZ: number;
  destX: number;
  destY: number;
  destZ: number;
  totalDistance: number;
  distanceCovered: number;
  speed: number;
  active: boolean;
}

let activeSim: FlightSim | null = null;

const cleanupSim = (): void => {
  if (!activeSim) return;
  PVBase.blipUnregister(BLIP_ID);
  activeSim = null;
};

const calculate2DDistance = (x1: number, y1: number, x2: number, y2: number): number => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
};

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

RegisterCommand(
  'birdFlight',
  async (_source: number, args: string[]) => {
    cleanupSim();

    const birdType = args[0] || 'pigeon';
    const destX = parseFloat(args[1]);
    const destY = parseFloat(args[2]);
    const destZ = parseFloat(args[3]) || 0;

    const config = BirdTypes[birdType];
    if (!config) {
      console.log(`[BirdFlight] Unknown bird type: ${birdType}. Options: pigeon, crow, owl`);
      return;
    }

    const player = PlayerPedId();
    const playerCoords = GetEntityCoords(player, true, false);
    const originX = playerCoords[0];
    const originY = playerCoords[1];
    const originZ = playerCoords[2];

    let finalDestX = destX;
    let finalDestY = destY;
    let finalDestZ = destZ;

    if (isNaN(destX) || isNaN(destY)) {
      const waypoint = GetWaypointCoords();
      if (waypoint[0] !== 0 || waypoint[1] !== 0) {
        finalDestX = waypoint[0];
        finalDestY = waypoint[1];
        finalDestZ = waypoint[2] || originZ;
        console.log(`[BirdFlight] Using waypoint as destination`);
      } else {
        finalDestX = originX;
        finalDestY = originY + 500;
        finalDestZ = originZ;
        console.log(`[BirdFlight] No destination or waypoint, flying 500 units north`);
      }
    }

    const totalDistance = Math.max(calculate2DDistance(originX, originY, finalDestX, finalDestY), 200);

    PVBase.blipRegister(BLIP_ID, {
      type: 'sprite',
      label: `${birdType} (debug flight)`,
      sprite: BlipSprites.MISSION_BG,
      modifiers: [BlipModifiers.LIGHT_BLUE],
      coords: { x: originX, y: originY, z: originZ },
      style: BlipStyles.FRIENDLY,
    });

    activeSim = {
      originX,
      originY,
      originZ,
      destX: finalDestX,
      destY: finalDestY,
      destZ: finalDestZ,
      totalDistance,
      distanceCovered: 0,
      speed: config.speed,
      active: true,
    };

    console.log(`[BirdFlight] Started: ${birdType} @ speed ${config.speed}`);
    console.log(`[BirdFlight] From: ${originX.toFixed(1)}, ${originY.toFixed(1)}`);
    console.log(`[BirdFlight] To: ${finalDestX.toFixed(1)}, ${finalDestY.toFixed(1)}`);
    console.log(
      `[BirdFlight] Distance: ${totalDistance.toFixed(1)} | ETA: ${(totalDistance / config.speed).toFixed(1)}s`,
    );
  },
  false,
);

RegisterCommand(
  'birdFlightStop',
  () => {
    cleanupSim();
    console.log('[BirdFlight] Stopped');
  },
  false,
);

setTick(() => {
  if (!activeSim || !activeSim.active) return;

  const dt = GetFrameTime();
  activeSim.distanceCovered += activeSim.speed * dt;

  const progress = Math.min(activeSim.distanceCovered / activeSim.totalDistance, 1);

  const currentX = lerp(activeSim.originX, activeSim.destX, progress);
  const currentY = lerp(activeSim.originY, activeSim.destY, progress);
  const currentZ = lerp(activeSim.originZ, activeSim.destZ, progress);

  PVBase.blipUpdateCoords(BLIP_ID, Vector3.fromArray([currentX, currentY, currentZ]));

  if (progress >= 1) {
    console.log(`[BirdFlight] Arrived! Total time: ${(activeSim.distanceCovered / activeSim.speed).toFixed(1)}s`);
    cleanupSim();
  }
});
