/**
 * Cubic bezier maths for track segments, in game coordinates.
 *
 * A segment runs from node i to node i+1. Its control points are node i's
 * handleOut and node i+1's handleIn, both stored as ABSOLUTE world positions
 * rather than offsets -- the parser tested all four readings across the whole
 * shipped corpus and `absolute:in-out` won on every one of the 27 files with
 * curves, at 0.0024m mean error against the length field, while the relative
 * readings were off by ~5km. A node with no handles contributes its own
 * position, which collapses that end to a straight pull.
 */
import type { Vec3 } from './track';

export function pointAt(p0: Vec3, c1: Vec3, c2: Vec3, p3: Vec3, t: number): Vec3 {
  const u = 1 - t;
  const w0 = u * u * u;
  const w1 = 3 * u * u * t;
  const w2 = 3 * u * t * t;
  const w3 = t * t * t;
  return [
    w0 * p0[0] + w1 * c1[0] + w2 * c2[0] + w3 * p3[0],
    w0 * p0[1] + w1 * c1[1] + w2 * c2[1] + w3 * p3[1],
    w0 * p0[2] + w1 * c1[2] + w2 * c2[2] + w3 * p3[2],
  ];
}

export function distance(a: Vec3, b: Vec3): number {
  return Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
}

/**
 * Control points for the segment between two nodes.
 *
 * A straight segment (neither end has handles) degenerates to a line, and
 * pointAt still returns the correct linear interpolation for it, so callers do
 * not need a separate code path.
 */
export function controlsFor(
  from: { position: Vec3; handleOut?: Vec3 },
  to: { position: Vec3; handleIn?: Vec3 },
): [Vec3, Vec3] {
  return [from.handleOut ?? from.position, to.handleIn ?? to.position];
}

/**
 * Length of a segment measured ALONG the curve, which is what the .dat's length
 * field holds -- not the chord.
 *
 * This distinction is the single most important thing in the writer. The engine
 * uses length to place a train along the track, and chainage is a running sum,
 * so writing chord instead understates every curved segment (by up to ~0.011m
 * each here) and the error accumulates: roughly 4.5m around trains1's 473-node
 * loop, silently, with the track still looking perfect.
 *
 * 64 steps matches the parser that produced the source JSON and is well past
 * convergence -- re-integrating at 2000 steps moves the answer by under 0.0001.
 */
export function arcLength(
  from: { position: Vec3; handleOut?: Vec3 },
  to: { position: Vec3; handleIn?: Vec3 },
  steps = 64,
): number {
  const [c1, c2] = controlsFor(from, to);
  let length = 0;
  let prev = from.position;
  for (let i = 1; i <= steps; i++) {
    const point = pointAt(from.position, c1, c2, to.position, i / steps);
    length += distance(prev, point);
    prev = point;
  }
  return length;
}

function lerp(a: Vec3, b: Vec3, t: number): Vec3 {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

/** The pieces de Casteljau produces when splitting one segment in two. */
export interface SplitResult {
  /** Replaces the starting node's handleOut. */
  fromHandleOut: Vec3;
  /** The inserted node. */
  position: Vec3;
  handleIn: Vec3;
  handleOut: Vec3;
  /** Replaces the ending node's handleIn. */
  toHandleIn: Vec3;
}

/**
 * Split a segment at `t` using de Casteljau's algorithm.
 *
 * This matters more than it looks: subdividing this way reproduces the original
 * curve exactly as two curves, so inserting a node changes the node count
 * without moving the rail by a millimetre. Placing the new node at the
 * midpoint and guessing handles would visibly deform the track every time you
 * added a node to a curve -- and on a junction approach that silently breaks
 * alignment with the track on the other side.
 */
export function splitSegment(
  from: { position: Vec3; handleOut?: Vec3 },
  to: { position: Vec3; handleIn?: Vec3 },
  t = 0.5,
): SplitResult {
  const [c1, c2] = controlsFor(from, to);
  const a = lerp(from.position, c1, t);
  const b = lerp(c1, c2, t);
  const c = lerp(c2, to.position, t);
  const d = lerp(a, b, t);
  const e = lerp(b, c, t);
  const f = lerp(d, e, t);

  return { fromHandleOut: a, handleIn: d, position: f, handleOut: e, toHandleIn: c };
}

/**
 * Sample a segment into points for rendering.
 *
 * Straight segments emit just their endpoints: subdividing a line adds vertices
 * that render identically. Curved ones scale their subdivision with chord
 * length so a 70m junction sweep does not get the same eight samples as a 2m
 * trolley-cable step, clamped at both ends to keep long tracks bounded.
 */
export function sampleSegment(
  from: { position: Vec3; handleOut?: Vec3 },
  to: { position: Vec3; handleIn?: Vec3 },
  { minSteps = 6, maxSteps = 32, metresPerStep = 2.5 } = {},
): Vec3[] {
  if (!from.handleOut && !to.handleIn) return [from.position, to.position];

  const chord = distance(from.position, to.position);
  const steps = Math.max(minSteps, Math.min(maxSteps, Math.ceil(chord / metresPerStep)));
  const [c1, c2] = controlsFor(from, to);

  const points: Vec3[] = [from.position];
  for (let i = 1; i <= steps; i++) {
    points.push(pointAt(from.position, c1, c2, to.position, i / steps));
  }
  return points;
}
