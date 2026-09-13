/**
 * Shared client <-> UI types for the traintrack editor.
 *
 * The split here is deliberate and is the main thing that makes this tool
 * cheap to run: the NUI owns the track model, the client owns the camera and
 * the world. object_manager has to push a transform to the browser every tick
 * because a game entity is its source of truth; there are no entities here, so
 * once the tracks are handed over at open time the only per-frame payload is
 * the camera -- seven numbers, whether the open track has 8 nodes or 473.
 */

declare namespace TraintrackEditor {
  /** Matches the .dat row layout exactly: [x, y, z] in game coordinates. */
  type Vec3 = [number, number, number];

  /** Which XML list registered a track. Absent when neither one names it. */
  type TrackList = 'train' | 'trolley-cable';

  /** Normalised header token. `typeRaw` keeps the original ("close"). */
  type TrackType = 'open' | 'closed';

  /**
   * One node, holding exactly what its .dat row carries. `handleIn`/`handleOut`
   * are absent together on a plain row and present together on a `c` row -- the
   * marker is implied by them rather than stored.
   */
  interface Node {
    position: Vec3;
    handleIn?: Vec3;
    handleOut?: Vec3;
    /**
     * Distance to the NEXT node, measured along the bezier -- not the chord.
     * 0 on the final node of an open track. Recomputed on write; see
     * format/dat-writer.ts for why the distinction matters.
     */
    length: number;
    flags: number;
    /**
     * On a junction node (bit 8) this is the OTHER track's configName. On a
     * station node (bits 1/2) it is just a label. Same field, two meanings.
     */
    name?: string;
    /** Only when the leading token was something other than the usual c/C. */
    marker?: string;
    /** Numeric fields past the known layout. Empty for every shipped track. */
    extra?: number[];
  }

  interface Track {
    /** Header field 1 -- node count. */
    count: number;
    /** Header field 2 -- rows marked `c`. */
    curveCount: number;
    _type: TrackType;
    /** Type token as written, when it differs from `_type`. */
    typeRaw?: string;
    /** Filename stem. What the .dat is saved as. */
    source?: string;
    /**
     * trainConfigName -- the name this track's junctions are referenced BY.
     * Falls back to `source` when the JSON predates the parser change that
     * started recording it.
     */
    configName?: string;
    list?: TrackList;
    headerExtra?: string[];
    nodes: Node[];
  }

  /**
   * A junction: one node in each of two tracks, at the same position, each
   * carrying bit 8 and each naming the other track's configName. The weld is
   * positional, so moving one side without the other silently breaks the
   * connection -- the file still parses and the track still draws, trains just
   * stop crossing. Detected on load and kept paired while dragging.
   */
  interface JunctionLink {
    trackA: string;
    nodeA: number;
    trackB: string;
    nodeB: number;
  }

  /** Camera state in GAME coordinates; the overlay converts to three.js space. */
  interface CameraFrame {
    position: Vector3Format;
    /** Degrees. x = pitch, y = roll, z = yaw. */
    rotation: Vector3Format;
    fov: number;
  }

  type MoveKey = 'w' | 's' | 'a' | 'd' | 'q' | 'e' | 'sprint';

  /* ------------------------------------------------------- host -> ui */

  type HostMessage =
    | { action: 'show'; tracks: Track[]; failures: string[] }
    | { action: 'hide' }
    | { action: 'frame'; cam: CameraFrame }
    | { action: 'cursor'; hit: Vector3Format | null };

  /* ------------------------------------------------------- ui -> host */

  interface MoveInputPayload {
    key: MoveKey;
    pressed: boolean;
  }

  interface RotateCameraPayload {
    dx: number;
    dy: number;
  }

  /** Teleport the free camera. Needed to reach node 400 of 473 in one step. */
  interface MoveCameraPayload {
    x: number;
    y: number;
    z: number;
  }

  interface GroundSnapPayload {
    x: number;
    y: number;
    z: number;
  }

  interface GroundSnapResult {
    hit: boolean;
    z: number;
  }

  /**
   * Where to draw the in-world selection marker, or null to stop drawing it.
   *
   * This is the one thing the NUI cannot render itself. The three.js overlay
   * has no access to the game's depth buffer, so a sphere drawn there would
   * float over the hill it is actually buried in -- exactly the question you
   * are asking when you drag a node. Handing the position back lets the engine
   * draw it, depth-tested against the world.
   *
   * Pushed from the UI's frame loop and only when the value changes, so a drag
   * costs at most one call per animation frame and an idle selection costs
   * nothing.
   */
  interface SelectionMarkerPayload {
    position: Vec3 | null;
  }
}
