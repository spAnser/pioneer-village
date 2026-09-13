import { DrawLine, PVBase, PVGame, TxtAtWorldCoord } from '@lib/client';
import { Vector3, lerp } from '@lib/math';
import { BlipModifiers, BlipSprites, BlipStyles } from '@lib/shared/blips';
import { MarkerTypes } from '@lib/shared/markers';

import TrainData from './data/index';

/**
 * In-world debug view of the parsed track data.
 *
 * Node positions and handles are `[x, y, z]` tuples, not `{x, y, z}` objects.
 * Vector3 has getDistanceFromArray / getOffsetFromArray / fromArray for exactly
 * this, so tuples are converted at the point of use rather than eagerly -- an
 * earlier version passed them straight into the object-shaped APIs, which read
 * undefined on every axis and threw on the first `.toFixed()`.
 *
 * For anything beyond eyeballing a few nodes, use the traintrack-editor: these
 * DrawLine calls can only draw straight chords between nodes, so a curved
 * segment renders as the chord it is emphatically not, and the native has a
 * hard ceiling well below the ~3,000 nodes in the corpus.
 */

const MARKER_DRAW_DIST = 100;
/** Squared, so the per-node cull below does not take a square root it discards. */
const MARKER_DRAW_DIST_SQ = MARKER_DRAW_DIST * MARKER_DRAW_DIST;

/**
 Flags
 0b000001 | 1 = Station?
 0b000010 | 2 = Station?
 0b000100 | 4 = Low Ceiling/Tunnel?
 0b001000 | 8 = Junction
 0b010000 | 16 = Unused
 0b100000 | 32 = Tunnel?
*/
const FLAG_STATION_A = 1;
const FLAG_STATION_B = 2;
const FLAG_JUNCTION = 8;

function distanceSq(from: Vector3Format, to: TrainData.Vec3): number {
  const dx = from.x - to[0];
  const dy = from.y - to[1];
  const dz = from.z - to[2];
  return dx * dx + dy * dy + dz * dz;
}

for (const [trainTrackName, trainTrack] of Object.entries(TrainData.TrainTracks)) {
  trainTrack.nodes.forEach((node, index) => {
    if (node.flags & (FLAG_STATION_A | FLAG_STATION_B)) {
      PVBase.blipRegister(`${trainTrackName}_station_${index}`, {
        type: 'sprite',
        style: BlipStyles.NEUTRAL,
        label: `${trainTrackName} - Node ${index}${node.name ? ` (${node.name})` : ''}`,
        sprite: BlipSprites.POI,
        modifiers: [BlipModifiers.TRAIN_MISSION, BlipModifiers.SCALE_2],
        coords: Vector3.fromArray(node.position),
      });
    }
    if (node.flags & FLAG_JUNCTION) {
      // Distinct id prefix: a node can carry both bits, and reusing the station
      // id would have the second registration overwrite the first.
      PVBase.blipRegister(`${trainTrackName}_junction_${index}`, {
        type: 'sprite',
        style: BlipStyles.NEUTRAL,
        label: `${trainTrackName} - Node ${index}${node.name ? ` -> ${node.name}` : ''}`,
        sprite: BlipSprites.SWAP,
        modifiers: [BlipModifiers.TRAIN_MISSION, BlipModifiers.SCALE_2],
        coords: Vector3.fromArray(node.position),
      });
    }
  });
}

// Train Coord is Vector3(0, 0, -0.01) from nearest track

/**
 * Entity to follow with the nearest-track readout.
 *
 * A hardcoded handle from a debugging session -- handles are per-session, so
 * this is almost always stale. Every use is guarded by DoesEntityExist, because
 * GetEntityCoords on a dead handle returns garbage that then propagates into
 * GetNearestTrainTrackPosition.
 */

/** *
const TRACKED_TRAIN_ENTITY = 463619;

setTick(async () => {
  const playerCoords = Vector3.fromObject(PVGame.playerCoords());

  if (DoesEntityExist(TRACKED_TRAIN_ENTITY)) {
    const trainCoords = Vector3.fromArray(GetEntityCoords(TRACKED_TRAIN_ENTITY, true, true));

    DrawMarker(
      MarkerTypes.HALO,
      trainCoords.x,
      trainCoords.y,
      trainCoords.z,
      0,
      0,
      0,
      0,
      0,
      0,
      2.75,
      2.75,
      1,
      255,
      0,
      0,
      255,
      false,
      false,
      2,
      false,
      0,
      0,
      false,
    );

    const nearestTrack = Vector3.fromArray(GetNearestTrainTrackPosition(trainCoords.x, trainCoords.y, trainCoords.z));

    const trackDistance = trainCoords.getDistance(nearestTrack);
    const offset = trainCoords.getOffsetFrom(nearestTrack);

    TxtAtWorldCoord(
      trainCoords.x,
      trainCoords.y,
      trainCoords.z + 2.5,
      `Nearest Track: ${nearestTrack.x.toFixed(3)}, ${nearestTrack.y.toFixed(3)}, ${nearestTrack.z.toFixed(3)}\nDistance: ${trackDistance.toFixed(3)}\nOffset: ${offset.x.toFixed(3)}, ${offset.y.toFixed(3)}, ${offset.z.toFixed(3)}`,
      0.25,
      0,
    );

    DrawMarker(
      MarkerTypes.HALO,
      nearestTrack.x,
      nearestTrack.y,
      nearestTrack.z,
      0,
      0,
      0,
      0,
      0,
      0,
      3,
      3,
      1,
      0,
      0,
      255,
      255,
      false,
      false,
      2,
      false,
      0,
      0,
      false,
    );
  }

  for (const [trainTrackName, trainTrack] of Object.entries(TrainData.TrainTracks)) {
    // Junctions are numbered across the whole track, so the counter has to keep
    // advancing through nodes that get culled for distance.
    let junctionCount = 0;

    trainTrack.nodes.forEach((node, index) => {
      const isJunction = (node.flags & FLAG_JUNCTION) !== 0;

      if (distanceSq(playerCoords, node.position) > MARKER_DRAW_DIST_SQ) {
        if (isJunction) junctionCount++;
        return;
      }

      const isStart = index === 0;
      const isEnd = index === trainTrack.nodes.length - 1;
      const nextNode = trainTrack.nodes[index + 1];
      const coords = Vector3.fromArray(node.position);

      const info = [
        `${trainTrackName} - Node ${index}`,
        `${coords.x.toFixed(3)}, ${coords.y.toFixed(3)}, ${coords.z.toFixed(3)}`,
      ];

      if (node.flags !== 0) {
        info.push(`Flags: ${node.flags}`);
      }
      if (isJunction) {
        info.push(`Junction: ${junctionCount}${node.name ? ` -> ${node.name}` : ''}`);
        junctionCount++;
      }

      const distanceFromPlayer = playerCoords.getDistanceFromArray(node.position);
      const txtSize = lerp(0.1, 0.3, 1 - distanceFromPlayer / MARKER_DRAW_DIST);

      TxtAtWorldCoord(
        coords.x,
        coords.y,
        coords.z + 1.25 - (isStart || isEnd ? 0.5 : 0),
        info.join('\n'),
        txtSize,
        0,
        255,
      );
      DrawMarker(
        MarkerTypes.SPHERE,
        coords.x,
        coords.y,
        coords.z - 0.666,
        0,
        0,
        0,
        0,
        0,
        0,
        0.75,
        0.75,
        0.75,
        255,
        255,
        255,
        255,
        false,
        false,
        2,
        false,
        0,
        0,
        false,
      );

      if (node.handleIn) {
        DrawLine(coords.x, coords.y, coords.z, node.handleIn[0], node.handleIn[1], node.handleIn[2], 0, 0, 255, 255);
      }
      if (node.handleOut) {
        DrawLine(coords.x, coords.y, coords.z, node.handleOut[0], node.handleOut[1], node.handleOut[2], 255, 0, 0, 255);
      }

      // Straight chord to the next node -- NOT the curve the segment actually
      // follows. DrawLine cannot draw a bezier, which is the whole reason the
      // traintrack-editor renders these in a three.js overlay instead.
      if (!nextNode) return;
      DrawLine(
        coords.x,
        coords.y,
        coords.z,
        nextNode.position[0],
        nextNode.position[1],
        nextNode.position[2],
        255,
        255,
        0,
        255,
      );
    });
  }
});
/** */
