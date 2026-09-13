import { arcLength, distance, splitSegment } from './bezier';
import {
  FLAG,
  type JunctionLink,
  type Node,
  type Track,
  type Vec3,
  cloneTrack,
  cloneVec,
  configNameOf,
  isCurved,
  isJunction,
  keyOf,
  nextIndex,
} from './track';

export type NodePart = 'node' | 'handleIn' | 'handleOut';

export interface Selection {
  trackKey: string;
  nodeIndex: number;
  part: NodePart;
}

/**
 * Two junction nodes count as the same weld when they sit within this distance.
 *
 * Every one of the 145 paired references in the shipped corpus agrees to well
 * under a millimetre; 1cm is loose enough to survive the 6-significant-digit
 * rounding in the files and tight enough that two genuinely different nodes on
 * the same track never collapse together.
 */
const WELD_EPSILON = 0.01;

/** Snapshot of every track an edit touched, for undo. */
interface UndoEntry {
  label: string;
  tracks: Track[];
}

const UNDO_LIMIT = 50;

export class TrackStore {
  private tracks: Track[] = [];
  private byKey = new Map<string, Track>();
  private junctions: JunctionLink[] = [];
  /** trackKey#nodeIndex -> the other ends of its weld. */
  private partners = new Map<string, Selection[]>();
  /** Junction nodes naming a loaded track but with no partner at their position. */
  private broken = new Set<string>();
  /** Junction nodes naming their own track. Shipped data; not an error. */
  private selfReferencing = new Set<string>();
  private undoStack: UndoEntry[] = [];
  private pending: UndoEntry | null = null;

  load(tracks: Track[]): void {
    this.tracks = tracks;
    this.byKey = new Map(tracks.map((t) => [keyOf(t), t]));
    this.undoStack = [];
    this.pending = null;
    this.rebuildJunctions();
  }

  getTracks(): readonly Track[] {
    return this.tracks;
  }

  getTrack(key: string): Track | undefined {
    return this.byKey.get(key);
  }

  getJunctions(): readonly JunctionLink[] {
    return this.junctions;
  }

  getBroken(): ReadonlySet<string> {
    return this.broken;
  }

  /* ------------------------------------------------------------ junctions */

  /**
   * Find every weld: a pair of nodes, one in each of two tracks, at the same
   * position, both carrying bit 8, each naming the other's trainConfigName.
   *
   * Names resolve against configName rather than the filename stem -- they
   * differ for trains1 ("freight_group"), trains2, trolley1, trolley2 and
   * rivers1 -- and case-insensitively, because the cable tracks register
   * lowercase but are referenced as "SD_trolley_cable01".
   *
   * The weld is positional, not index-based, which is exactly why this has to
   * be tracked: drag one side without the other and the file still parses and
   * the track still draws, trains just stop crossing.
   */
  private rebuildJunctions(): void {
    const byConfigName = new Map<string, Track>();
    for (const track of this.tracks) byConfigName.set(configNameOf(track).toLowerCase(), track);

    this.junctions = [];
    this.partners.clear();
    this.broken.clear();
    this.selfReferencing.clear();

    const listed = new Set<string>();

    for (const track of this.tracks) {
      const trackKey = keyOf(track);
      track.nodes.forEach((node, nodeIndex) => {
        if (!isJunction(node) || !node.name) return;

        const target = byConfigName.get(node.name.toLowerCase());

        // A name that resolves to no loaded track is not this node's fault --
        // sd_trolley_cable06 and 11 are registered by no XML list at all -- so
        // it is skipped rather than reported broken.
        if (!target) return;

        /**
         * A junction node naming its OWN track has no partner and is not
         * supposed to have one. trains_old_west02 does this at nodes 99, 199,
         * 299 and 399; trolley3 at 31, 51, 69; trains_old_west01 at 45, 61, 87
         * -- and none of those positions is touched by any other track, in that
         * track or out of it. Whatever bit 8 means on a self-naming node, it is
         * not a weld, so pairing it would be wrong and flagging it broken would
         * cry wolf on shipped data.
         */
        if (target === track) {
          this.selfReferencing.add(partnerKey(trackKey, nodeIndex));
          return;
        }

        const matchIndex = target.nodes.findIndex(
          (other) => isJunction(other) && distance(other.position, node.position) < WELD_EPSILON,
        );

        if (matchIndex === -1) {
          this.broken.add(partnerKey(trackKey, nodeIndex));
          return;
        }

        // Recorded from BOTH ends on the strength of this one reference. The
        // far node does not have to name its way back for the weld to be real:
        // it is the shared position that connects them, and a one-directional
        // record would let a drag move one side and strand the other.
        const targetKey = keyOf(target);
        addPartner(this.partners, partnerKey(trackKey, nodeIndex), {
          trackKey: targetKey,
          nodeIndex: matchIndex,
          part: 'node',
        });
        addPartner(this.partners, partnerKey(targetKey, matchIndex), { trackKey, nodeIndex, part: 'node' });

        const canonical =
          trackKey < targetKey || (trackKey === targetKey && nodeIndex < matchIndex)
            ? `${trackKey}#${nodeIndex}|${targetKey}#${matchIndex}`
            : `${targetKey}#${matchIndex}|${trackKey}#${nodeIndex}`;
        if (listed.has(canonical)) return;
        listed.add(canonical);
        this.junctions.push({ trackA: trackKey, nodeA: nodeIndex, trackB: targetKey, nodeB: matchIndex });
      });
    }
  }

  /** Junction nodes naming their own track. Legal, partnerless, not broken. */
  getSelfReferencing(): ReadonlySet<string> {
    return this.selfReferencing;
  }

  partnersOf(trackKey: string, nodeIndex: number): Selection[] {
    return this.partners.get(partnerKey(trackKey, nodeIndex)) ?? [];
  }

  /* ----------------------------------------------------------------- undo */

  /**
   * Open an undo transaction. A drag calls this once on mouse-down rather than
   * on every mouse-move, so one drag is one undo step instead of hundreds.
   */
  beginEdit(label: string, trackKeys: string[]): void {
    if (this.pending) return;
    const seen = new Set(trackKeys);
    // A junction move writes to the partner's track too, so both have to be in
    // the snapshot or undo would restore one side and leave the weld broken.
    for (const key of trackKeys) {
      const track = this.byKey.get(key);
      if (!track) continue;
      track.nodes.forEach((_, index) => {
        for (const partner of this.partnersOf(key, index)) seen.add(partner.trackKey);
      });
    }
    this.pending = {
      label,
      tracks: [...seen]
        .map((key) => this.byKey.get(key))
        .filter((t): t is Track => !!t)
        .map(cloneTrack),
    };
  }

  commitEdit(): void {
    if (!this.pending) return;
    this.undoStack.push(this.pending);
    if (this.undoStack.length > UNDO_LIMIT) this.undoStack.shift();
    this.pending = null;
  }

  /** One-shot edits that are not part of a drag. */
  private edit<T>(label: string, trackKeys: string[], run: () => T): T {
    this.beginEdit(label, trackKeys);
    const result = run();
    this.commitEdit();
    return result;
  }

  canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  undoLabel(): string | null {
    return this.undoStack[this.undoStack.length - 1]?.label ?? null;
  }

  undo(): boolean {
    const entry = this.undoStack.pop();
    if (!entry) return false;
    for (const snapshot of entry.tracks) {
      const live = this.byKey.get(keyOf(snapshot));
      if (!live) continue;
      // Restore INTO the existing object rather than swapping in the snapshot.
      // Swapping leaves anything holding a Track reference -- a panel row, a
      // scene view -- pointing at a detached pre-undo copy that still looks
      // valid and silently stops tracking edits.
      Object.assign(live, snapshot);
    }
    this.rebuildJunctions();
    return true;
  }

  /* ---------------------------------------------------------------- edits */

  /**
   * Move a node, carrying its handles rigidly with it and dragging any junction
   * partner along so the weld survives.
   */
  moveNode(trackKey: string, nodeIndex: number, position: Vec3): void {
    const track = this.byKey.get(trackKey);
    const node = track?.nodes[nodeIndex];
    if (!track || !node) return;

    const delta: Vec3 = [
      position[0] - node.position[0],
      position[1] - node.position[1],
      position[2] - node.position[2],
    ];
    applyDelta(node, delta);

    for (const partner of this.partnersOf(trackKey, nodeIndex)) {
      const other = this.byKey.get(partner.trackKey)?.nodes[partner.nodeIndex];
      // Set the partner to the same absolute position rather than applying the
      // same delta: any rounding drift between the two then gets corrected
      // instead of accumulating over repeated drags.
      if (other) {
        applyDelta(other, [
          position[0] - other.position[0],
          position[1] - other.position[1],
          position[2] - other.position[2],
        ]);
      }
    }
  }

  /**
   * Move one bezier handle. With `mirror` on, the opposite handle is reflected
   * through the node so the curve stays smooth across it -- which is how nearly
   * every shipped node is authored. Turn it off to author a deliberate kink.
   */
  moveHandle(
    trackKey: string,
    nodeIndex: number,
    part: 'handleIn' | 'handleOut',
    position: Vec3,
    mirror: boolean,
  ): void {
    const node = this.byKey.get(trackKey)?.nodes[nodeIndex];
    if (!node || !isCurved(node)) return;

    node[part] = cloneVec(position);
    if (!mirror) return;

    const opposite = part === 'handleIn' ? 'handleOut' : 'handleIn';
    const current = node[opposite];
    if (!current) return;
    // Reflect through the node, preserving the opposite handle's own LENGTH so
    // mirroring only straightens the tangent and does not also rescale it.
    const dir: Vec3 = [node.position[0] - position[0], node.position[1] - position[1], node.position[2] - position[2]];
    const dirLength = Math.hypot(dir[0], dir[1], dir[2]);
    if (dirLength < 1e-6) return;
    const oppositeLength = distance(node.position, current);
    const scale = oppositeLength / dirLength;
    node[opposite] = [
      node.position[0] + dir[0] * scale,
      node.position[1] + dir[1] * scale,
      node.position[2] + dir[2] * scale,
    ];
  }

  setFlags(trackKey: string, nodeIndex: number, flags: number): void {
    this.edit('flags', [trackKey], () => {
      const node = this.byKey.get(trackKey)?.nodes[nodeIndex];
      if (node) node.flags = flags;
      this.rebuildJunctions();
    });
  }

  setName(trackKey: string, nodeIndex: number, name: string): void {
    this.edit('name', [trackKey], () => {
      const node = this.byKey.get(trackKey)?.nodes[nodeIndex];
      if (!node) return;
      if (name) node.name = name;
      else delete node.name;
      this.rebuildJunctions();
    });
  }

  /**
   * Give a plain node handles, or take them away.
   *
   * Adding them seeds both handles a third of the way toward each neighbour,
   * which is the classic Catmull-Rom-to-bezier tangent and produces a curve
   * that starts out visually identical to the straight run it replaces.
   */
  setCurved(trackKey: string, nodeIndex: number, curved: boolean): void {
    this.edit(curved ? 'add handles' : 'remove handles', [trackKey], () => {
      const track = this.byKey.get(trackKey);
      const node = track?.nodes[nodeIndex];
      if (!track || !node) return;

      if (!curved) {
        delete node.handleIn;
        delete node.handleOut;
        return;
      }

      const previous =
        track.nodes[nodeIndex - 1] ?? (track._type === 'closed' ? track.nodes[track.nodes.length - 1] : undefined);
      const next = track.nodes[nodeIndex + 1] ?? (track._type === 'closed' ? track.nodes[0] : undefined);
      const before = previous?.position ?? node.position;
      const after = next?.position ?? node.position;
      const tangent: Vec3 = [(after[0] - before[0]) / 6, (after[1] - before[1]) / 6, (after[2] - before[2]) / 6];
      node.handleIn = [node.position[0] - tangent[0], node.position[1] - tangent[1], node.position[2] - tangent[2]];
      node.handleOut = [node.position[0] + tangent[0], node.position[1] + tangent[1], node.position[2] + tangent[2]];
    });
  }

  /**
   * Insert a node halfway along the segment after `nodeIndex`, splitting the
   * curve exactly so the rail does not move.
   */
  insertAfter(trackKey: string, nodeIndex: number): number | null {
    return this.edit('insert node', [trackKey], () => {
      const track = this.byKey.get(trackKey);
      if (!track) return null;
      const next = nextIndex(track, nodeIndex);
      if (next === null) return null;

      const from = track.nodes[nodeIndex];
      const to = track.nodes[next];
      const split = splitSegment(from, to);
      const curved = isCurved(from) || isCurved(to);

      const inserted: Node = curved
        ? { position: split.position, handleIn: split.handleIn, handleOut: split.handleOut, length: 0, flags: 0 }
        : { position: split.position, length: 0, flags: 0 };

      if (curved) {
        if (isCurved(from)) from.handleOut = split.fromHandleOut;
        if (isCurved(to)) to.handleIn = split.toHandleIn;
      }

      track.nodes.splice(nodeIndex + 1, 0, inserted);
      this.afterStructuralChange(track);
      return nodeIndex + 1;
    });
  }

  /** Append a node at a world position, after the last node. */
  appendNode(trackKey: string, position: Vec3): number | null {
    return this.edit('append node', [trackKey], () => {
      const track = this.byKey.get(trackKey);
      if (!track) return null;
      track.nodes.push({ position: cloneVec(position), length: 0, flags: 0 });
      this.afterStructuralChange(track);
      return track.nodes.length - 1;
    });
  }

  deleteNode(trackKey: string, nodeIndex: number): boolean {
    return this.edit('delete node', [trackKey], () => {
      const track = this.byKey.get(trackKey);
      if (!track || track.nodes.length <= 2) return false;
      track.nodes.splice(nodeIndex, 1);
      this.afterStructuralChange(track);
      return true;
    });
  }

  /** Move a node to a different position in the running order. */
  reorderNode(trackKey: string, from: number, to: number): boolean {
    return this.edit('reorder node', [trackKey], () => {
      const track = this.byKey.get(trackKey);
      if (!track || from === to) return false;
      if (from < 0 || to < 0 || from >= track.nodes.length || to >= track.nodes.length) return false;
      const [node] = track.nodes.splice(from, 1);
      track.nodes.splice(to, 0, node);
      this.afterStructuralChange(track);
      return true;
    });
  }

  /**
   * Node indices shifted, so every weld recorded against this track points at
   * the wrong node until it is recomputed.
   */
  private afterStructuralChange(track: Track): void {
    track.count = track.nodes.length;
    track.curveCount = track.nodes.filter(isCurved).length;
    this.rebuildJunctions();
  }

  /**
   * How far each node's stored length is from the arc actually implied by the
   * geometry. Non-zero on load for a handful of shipped nodes, which is worth
   * showing rather than quietly overwriting on export.
   */
  lengthDeltas(trackKey: string): (number | null)[] {
    const track = this.byKey.get(trackKey);
    if (!track) return [];
    return track.nodes.map((node, index) => {
      const next = nextIndex(track, index);
      if (next === null) return null;
      return arcLength(node, track.nodes[next]) - node.length;
    });
  }
}

function partnerKey(trackKey: string, nodeIndex: number): string {
  return `${trackKey}#${nodeIndex}`;
}

function addPartner(map: Map<string, Selection[]>, key: string, value: Selection): void {
  const list = map.get(key);
  if (!list) {
    map.set(key, [value]);
    return;
  }
  // Both ends record the weld, and a node can be named by more than one track,
  // so the same partner can arrive twice.
  if (list.some((p) => p.trackKey === value.trackKey && p.nodeIndex === value.nodeIndex)) return;
  list.push(value);
}

/** Translate a node and its handles together, so a move never reshapes a curve. */
function applyDelta(node: Node, delta: Vec3): void {
  node.position = [node.position[0] + delta[0], node.position[1] + delta[1], node.position[2] + delta[2]];
  if (node.handleIn) {
    node.handleIn = [node.handleIn[0] + delta[0], node.handleIn[1] + delta[1], node.handleIn[2] + delta[2]];
  }
  if (node.handleOut) {
    node.handleOut = [node.handleOut[0] + delta[0], node.handleOut[1] + delta[1], node.handleOut[2] + delta[2]];
  }
}

export { FLAG };
