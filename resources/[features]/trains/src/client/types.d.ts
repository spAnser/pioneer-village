declare interface ClientExports {
  trains: Trains.ClientExports;
}

/**
 * Shape of the JSON emitted by the track parser (rdr3-trains/script.ts).
 *
 * These types describe what the files on disk actually contain. Everything here
 * is type-only; nothing emits code.
 *
 * Two things about the source format are easy to get backwards and are worth
 * stating once here:
 *
 *  - `position`, `handleIn` and `handleOut` are `[x, y, z]` TUPLES, not
 *    `{x, y, z}` objects. Passing one to something expecting Vector3Format
 *    yields undefined on every axis and NaN downstream, silently.
 *  - `length` is the distance to the next node measured ALONG the bezier, not
 *    the straight-line chord. Verified against the shipped corpus: arc matches
 *    to a mean of 0.0024m over 3,861 segments, while chord is consistently
 *    short. The engine uses this to place a train, and chainage is a running
 *    sum, so the difference accumulates.
 */
declare namespace TrainData {
  /** World position or bezier control point, in game coordinates. */
  type Vec3 = [number, number, number];

  /** Header's third token, normalised. `typeRaw` keeps the original ("close"). */
  type TrackType = 'open' | 'closed' | (string & {});

  /** Which XML list registered the track. Absent when neither one names it. */
  type TrackList = 'train' | 'trolley-cable';

  /* ------------------------------------------------------------------ nodes */

  /**
   * One row of the .dat.
   *
   * `handleIn` and `handleOut` are present together on a `c` row and absent
   * together on a plain one, so a single check narrows both:
   *
   *   if (node.handleIn) {
   *     node.handleOut[0]   // no non-null assertion needed
   *   }
   */
  interface NodeData {
    position: Vec3;
    /** Incoming control point, absolute. Equals `position` at an open track's start. */
    handleIn?: Vec3;
    /** Outgoing control point, absolute. Equals `position` at an open track's end. */
    handleOut?: Vec3;
    /** Bezier arc distance to the next node. `0` on the last node of an open track. */
    length: number;
    flags: number;
    /**
     * Does double duty. On a junction node (bit 8) it is the OTHER track's
     * trainConfigName -- which is not its filename stem for trains1
     * ("freight_group"), trains2, trolley1, trolley2 or rivers1. On a station
     * node (bits 1/2) it is just a label and resolves to nothing.
     */
    name?: string;
    /** Only when the leading token was something other than the usual c/C. */
    marker?: string;
    /** Numeric fields past the known layout. Empty for every shipped track. */
    extra?: number[];

    /* Only present when the parser ran with --derived. */
    /** Running sum of `length` from node 0. */
    chainage?: number;
    /** Straight-line distance to the next node. `null` at an open track's end. */
    distance?: number | null;
    /** Distance to the next node along the bezier. `null` at an open track's end. */
    arcDistance?: number | null;
    /** `length - arcDistance`. Sits near zero once handles are read correctly. */
    lengthDelta?: number | null;
    /** Rise over run to the next node, as a percentage. */
    grade?: number | null;
    /** Degrees clockwise from +Y (north) toward the next node. */
    bearing?: number | null;
    /** Signed bearing change from the previous segment, -180 to 180. */
    turn?: number | null;
  }

  /* ------------------------------------------------------------------ flags */

  interface FlagNodeRef {
    index: number;
    /** The node's full flags value, so combinations stay visible in a bit group. */
    flags: number;
    name?: string;
  }

  interface FlagBitGroup {
    bit: number;
    /** Labels ending in "?" are the parser's read of observed usage, not gospel. */
    label: string;
    count: number;
    nodes: FlagNodeRef[];
  }

  /**
   * Nodes grouped by flag bit. A node with flags 9 appears under both 1 and 8;
   * bits that never occur in a file are omitted entirely.
   */
  interface FlagGroups {
    /** Count of each distinct flags value in the file. */
    byValue: Record<string, number>;
    bits: Record<string, FlagBitGroup>;
    /** Bits outside the documented range, ORed together. 0 when none. */
    unknownMask: number;
    /** Named nodes with no flags set -- they appear in no bit group otherwise. */
    namedWithoutFlags: { index: number; name: string }[];
  }

  /* ------------------------------------------------------------ track file */

  /** One `<name>.json`. */
  interface Track {
    /** Header field 1 -- node count. */
    count: number;
    /** Header field 2 -- rows marked `c`. */
    curveCount: number;
    _type: TrackType;
    /** Type token as written, when it differs from `_type`. */
    typeRaw?: string;
    /** Filename stem. */
    source?: string;
    /**
     * trainConfigName -- the name this track's junctions are referenced BY.
     * Absent when no XML list registers the .dat, in which case the game never
     * loads it: sd_trolley_cable06 and 11, and trolley_intersection1_2/4/6/7.
     */
    configName?: string;
    list?: TrackList;
    /** Header tokens past the third, if a file ever carries more. */
    headerExtra?: string[];
    flags: FlagGroups;
    nodes: NodeData[];
  }

  /* ------------------------------------------------------------- index.json */

  /** Which reading of the handle fields best fits the file's own length values. */
  interface HandleFit {
    curvedSegments: number;
    /** Mean |length - arcLength| in metres per reading. Lower is better. */
    candidates: Record<string, number> | null;
    best: string | null;
    bestError: number | null;
  }

  interface NamedNode {
    index: number;
    name: string;
    flags: number;
  }

  /** A junction name this track references, and the file it resolves to. */
  interface ResolvedLink {
    name: string;
    loaded: boolean;
    /** Filename stem of the target. Absent when nothing loaded matches. */
    file?: string;
  }

  interface TrackIndexEntry {
    /** Path of the source .dat, relative to the parser's input directory. */
    file: string;
    /** Filename stem. The per-track JSON is `<name>.json`. */
    name: string;
    configName?: string;
    list?: TrackList;
    count: number;
    curveCount: number;
    _type: TrackType;
    typeRaw?: string;
    nodeCount: number;
    curveRowCount: number;
    /** Sum of the `length` fields. */
    totalLength: number;
    /** Sum of node-to-node distances measured along the bezier. */
    measuredArcLength: number;
    handleFit: HandleFit;
    markers: Record<string, number>;
    flags: FlagGroups;
    namedNodes: NamedNode[];
    resolvedLinks: ResolvedLink[];
  }

  interface JunctionMember {
    /** Filename stem of the track this node belongs to. */
    file: string;
    index: number;
  }

  /**
   * A position shared by nodes in two or more files -- the weld that makes a
   * junction. Note this one is a `{x, y, z}` object, unlike the tuples on
   * NodeData: it comes from the parser's internal vector type rather than
   * straight off a .dat row.
   */
  interface Junction {
    position: Vector3Format;
    members: JunctionMember[];
  }

  interface ParseFailure {
    /** Path relative to the input directory. */
    rel: string;
    error: string;
  }

  /** `index.json` -- the manifest of everything the parser wrote. */
  interface TrackIndex {
    generatedAt: string;
    inputDir: string;
    trackCount: number;
    /** Total nodes across every parsed track. */
    nodeCount: number;
    tracks: TrackIndexEntry[];
    junctions: Junction[];
    failures: ParseFailure[];
  }
}

declare namespace Trains {
  type ClientExports = {};
}

// Client perspective - RPC calls to various destinations
declare namespace ClientRPC {
  interface Socket {
    // Add resource RPC calls here when needed
  }
}

// Client perspective - events received from various sources
declare namespace ClientIn {
  interface FromSocket {
    // Add resource events from socket here when needed
  }
}

// Client perspective - events sent to various destinations
declare namespace ClientOut {
  interface ToSocket {
    // Add resource events to socket here when needed
  }
}

// Raw Socket.io events for UI layer typing
// Set any events also in /socket/src/types.d.ts
declare namespace SocketIO {
  interface Events {
    // Add resource socket.io events here when needed
  }
}
