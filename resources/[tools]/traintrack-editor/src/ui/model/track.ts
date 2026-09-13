/**
 * Local aliases for the ambient track types, plus the small pure helpers that
 * would otherwise get re-derived at every call site.
 *
 * The types themselves live in src/types.d.ts because the client half shares
 * them; these re-exports just let UI modules `import type { Node }` instead of
 * spelling out the namespace everywhere.
 */

export type Vec3 = TraintrackEditor.Vec3;
export type Node = TraintrackEditor.Node;
export type Track = TraintrackEditor.Track;
export type TrackType = TraintrackEditor.TrackType;
export type JunctionLink = TraintrackEditor.JunctionLink;

/**
 * Flag bits. Only JUNCTION is confirmed; the rest are the parser's read of
 * observed usage, which is mostly but not perfectly consistent -- possibly
 * authoring mistakes in the shipped data rather than a misreading.
 */
export const FLAG = {
  /** Station. 1 vs 2 may encode direction. */
  STATION_A: 1,
  STATION_B: 2,
  LOW_CEILING: 4,
  /** Confirmed. The node's `name` cross-references another track's configName. */
  JUNCTION: 8,
  UNUSED: 16,
  TUNNEL: 32,
} as const;

export const FLAG_LABELS: { bit: number; label: string; confirmed: boolean }[] = [
  { bit: FLAG.STATION_A, label: 'station A', confirmed: false },
  { bit: FLAG.STATION_B, label: 'station B', confirmed: false },
  { bit: FLAG.LOW_CEILING, label: 'low ceiling', confirmed: false },
  { bit: FLAG.JUNCTION, label: 'junction', confirmed: true },
  { bit: FLAG.UNUSED, label: 'unused', confirmed: false },
  { bit: FLAG.TUNNEL, label: 'tunnel', confirmed: false },
];

export function isJunction(node: Node): boolean {
  return (node.flags & FLAG.JUNCTION) !== 0;
}

export function isStation(node: Node): boolean {
  return (node.flags & (FLAG.STATION_A | FLAG.STATION_B)) !== 0;
}

/**
 * The name this track is referenced BY. Junction `name` fields hold the other
 * track's trainConfigName, which is not the filename stem for trains1
 * ("freight_group"), trains2, trolley1, trolley2 or rivers1.
 */
export function configNameOf(track: Track): string {
  return track.configName ?? track.source ?? '';
}

/** Stable key for a track within the editor. Filenames are unique; names are not. */
export function keyOf(track: Track): string {
  return track.source ?? configNameOf(track);
}

/** A node carries handles as a pair or not at all -- the `c` marker follows. */
export function isCurved(node: Node): boolean {
  return node.handleIn !== undefined && node.handleOut !== undefined;
}

export function cloneVec(v: Vec3): Vec3 {
  return [v[0], v[1], v[2]];
}

export function cloneNode(node: Node): Node {
  return {
    position: cloneVec(node.position),
    ...(node.handleIn ? { handleIn: cloneVec(node.handleIn) } : {}),
    ...(node.handleOut ? { handleOut: cloneVec(node.handleOut) } : {}),
    length: node.length,
    flags: node.flags,
    ...(node.name !== undefined ? { name: node.name } : {}),
    ...(node.marker !== undefined ? { marker: node.marker } : {}),
    ...(node.extra ? { extra: [...node.extra] } : {}),
  };
}

export function cloneTrack(track: Track): Track {
  return { ...track, nodes: track.nodes.map(cloneNode) };
}

/**
 * Index of the node a segment starting at `index` ends on, or null when there
 * is none. Closed tracks wrap from the last node back to node 0; open ones stop.
 */
export function nextIndex(track: Track, index: number): number | null {
  if (index < track.nodes.length - 1) return index + 1;
  return track._type === 'closed' && track.nodes.length > 1 ? 0 : null;
}
