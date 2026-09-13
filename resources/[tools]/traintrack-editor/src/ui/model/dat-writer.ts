import { arcLength } from './bezier';
import { type Node, type Track, isCurved, nextIndex } from './track';

/**
 * Serialise a track back to the .dat text the game reads.
 *
 *   <count> <curveCount> <open|close>
 *   [c ]X Y Z [hInX hInY hInZ hOutX hOutY hOutZ ]LENGTH FLAGS[ NAME]
 *
 * The `c` prefix marks a row carrying bezier handles (11 numeric fields);
 * without it a row is 5 fields and runs straight through. Handles are written
 * in handleIn-then-handleOut order.
 */

/**
 * Format a number the way the game's own files do: 6 significant digits, with a
 * decimal point always present.
 *
 * Both halves were measured against the shipped corpus rather than assumed.
 * Precision: all 29,032 numbers round-trip through 6 significant digits
 * exactly, while fixed 4-decimal rounding loses data on 1,997 of them
 * (5.77081 -> 5.7708). Decimal point: across every game-authored .dat, zero
 * coordinates and zero non-zero lengths are written without one -- so an
 * integral value appears as "-1512.0", never "-1512", which plain %g would give.
 *
 * Exact zero is the one exception: the 36 zero-length terminators are all bare
 * "0". Getting both rules right is what makes an unedited track re-export
 * byte-identical, so a diff shows only what was actually changed.
 */
export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return '0';
  if (value === 0) return '0';

  const rounded = Number(value.toPrecision(6));
  let text = String(rounded);
  // String() switches to exponent notation below ~1e-7, which the .dat format
  // never uses. Nothing shipped comes near it -- the smallest magnitude is a
  // handle offset in the centimetres -- but a hand-nudged handle could, and an
  // "1e-7" in the file would not parse.
  if (text.includes('e') || text.includes('E')) {
    text = rounded.toFixed(6).replace(/0+$/, '').replace(/\.$/, '');
    if (!text || Number(text) === 0) return '0';
  }
  return text.includes('.') ? text : `${text}.0`;
}

function writeVec(v: readonly number[]): string {
  return `${formatNumber(v[0])} ${formatNumber(v[1])} ${formatNumber(v[2])}`;
}

/**
 * Recompute every node's length as the arc to the next node.
 *
 * Open tracks terminate with 0. Closed tracks wrap the final node back to node
 * 0 -- verified against all six shipped closed tracks, which agree to within
 * 0.008m. rivers1 is the one exception: it is marked `close` but ships a 0
 * terminator, which the parser already flags as a length mismatch. Exporting it
 * unedited will therefore change that single line, which is a fix rather than
 * a regression.
 */
export function recomputeLengths(track: Track): void {
  track.nodes.forEach((node, index) => {
    const next = nextIndex(track, index);
    node.length = next === null ? 0 : arcLength(node, track.nodes[next]);
  });
}

/** Header counts must agree with the rows, or the game rejects the file. */
export function recomputeCounts(track: Track): void {
  track.count = track.nodes.length;
  track.curveCount = track.nodes.filter(isCurved).length;
}

function writeNode(node: Node): string {
  const parts: string[] = [];

  // An unrecognised leading token is preserved verbatim; otherwise the marker
  // is implied by whether the node carries handles, so it is not stored.
  if (node.marker) parts.push(node.marker);
  else if (isCurved(node)) parts.push('c');

  parts.push(writeVec(node.position));
  if (isCurved(node)) {
    parts.push(writeVec(node.handleIn!));
    parts.push(writeVec(node.handleOut!));
  }
  parts.push(formatNumber(node.length));
  parts.push(String(node.flags));
  if (node.extra?.length) parts.push(node.extra.map(formatNumber).join(' '));
  if (node.name) parts.push(node.name);

  return parts.join(' ');
}

export interface WriteOptions {
  /**
   * Recompute length and the header counts before writing. On by default --
   * turning it off preserves the file's own numbers verbatim, which is only
   * useful for confirming a byte-exact round-trip of an unedited track.
   */
  recompute?: boolean;
}

export function writeTrack(track: Track, { recompute = true }: WriteOptions = {}): string {
  if (recompute) {
    recomputeLengths(track);
    recomputeCounts(track);
  }

  const type = track.typeRaw ?? (track._type === 'closed' ? 'close' : 'open');
  const header = [String(track.count), String(track.curveCount), type];
  if (track.headerExtra?.length) header.push(...track.headerExtra);

  return [header.join(' '), ...track.nodes.map(writeNode)].join('\n') + '\n';
}

/**
 * The `<train_track>` element this track needs in traintracks.xml (or
 * trolleycabletracks.xml) to be loaded at all. A .dat no list names is inert --
 * which is exactly why sd_trolley_cable06 and sd_trolley_cable11 ship with the
 * game but never appear in it.
 */
export function writeRegistration(track: Track): string {
  const stem = track.source ?? track.configName ?? 'track';
  const configName = track.configName ?? stem;
  const attrs = [
    `filename="resources:/traintracks/data/${stem}.dat"`,
    `trainConfigName="${configName}"`,
    ...(track.list === 'trolley-cable'
      ? ['isPingPongTrack="true"', 'isBranchingTrack="true"']
      : ['stopsAtStations="true"', 'brakingDist="10"']),
  ];

  // Two tabs of body indent under a one-tab element, matching the shipped XML.
  return `\t<train_track\n${attrs.map((a) => `\t\t${a}`).join('\n')}/>`;
}
