import * as THREE from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';

import { sampleSegment } from '../model/bezier';
import { type Track, type Vec3, isJunction, isStation, keyOf, nextIndex } from '../model/track';
import { type Overlay, gameToThree } from './overlay';

/**
 * Track geometry in the overlay scene.
 *
 * Centrelines are Line2 rather than THREE.Line because plain lines ignore
 * linewidth on every platform that matters -- Line2 builds screen-space quads,
 * so a track stays legible at range instead of thinning to an invisible hair.
 *
 * Handle colours follow the convention already used in trains/src/client/
 * debug.ts, so the two views agree: incoming handle blue, outgoing handle red,
 * centreline yellow when selected.
 */

const COLOR = {
  dim: new THREE.Color(0x3f4a5c),
  selected: new THREE.Color(0xffd24a),
  node: new THREE.Color(0xf2f4f8),
  junction: new THREE.Color(0x38d9d0),
  station: new THREE.Color(0xe86ad6),
  handleIn: new THREE.Color(0x4d8cff),
  handleOut: new THREE.Color(0xff5a4d),
  broken: new THREE.Color(0xff2d2d),
};

const NODE_POINT_SIZE = 9;
const HANDLE_POINT_SIZE = 6;

/** Which part of a node a pick landed on. */
export type NodePart = 'node' | 'handleIn' | 'handleOut';

export interface PickResult {
  trackKey: string;
  nodeIndex: number;
  part: NodePart;
}

interface PickCandidate extends PickResult {
  world: THREE.Vector3;
}

/** Junction nodes whose partner has drifted away from them. */
export type BrokenSet = ReadonlySet<string>;

export function brokenKey(trackKey: string, nodeIndex: number): string {
  return `${trackKey}#${nodeIndex}`;
}

class TrackView {
  readonly group = new THREE.Group();
  private line: Line2 | null = null;
  private lineMaterial: LineMaterial;
  private nodePoints: THREE.Points | null = null;
  private handleLines: THREE.LineSegments | null = null;
  private handlePoints: THREE.Points | null = null;

  constructor(private readonly resolution: THREE.Vector2) {
    this.lineMaterial = new LineMaterial({
      color: 0xffffff,
      linewidth: 2,
      transparent: true,
      opacity: 1,
      // Line2 sizes its quads in screen space, so it needs the drawing buffer
      // dimensions; without this the line renders at a wildly wrong thickness.
      resolution: this.resolution,
      // The overlay has no depth information about the world, and rail is
      // routinely behind a hill exactly when you want to see it.
      depthTest: false,
    });
    this.group.renderOrder = 1;
  }

  /**
   * Rebuild every buffer for this track.
   *
   * Deliberately a full rebuild rather than an incremental patch: it runs on
   * model change (a drag emits one per mouse move, not one per frame), and the
   * largest shipped track is 473 nodes, so the whole thing is a few thousand
   * floats. Incremental updates would be measurable work to save time that is
   * not currently being spent.
   */
  build(track: Track, selected: boolean, broken: BrokenSet, candidates: PickCandidate[]): void {
    this.disposeChildren();

    const trackKey = keyOf(track);
    const centreline: number[] = [];
    for (let i = 0; i < track.nodes.length; i++) {
      const next = nextIndex(track, i);
      if (next === null) break;
      const samples = sampleSegment(track.nodes[i], track.nodes[next]);
      // Drop each segment's last sample: it is the next segment's first, and
      // Line2 draws one continuous polyline, so keeping both doubles vertices
      // and puts a zero-length join at every node.
      for (let s = 0; s < samples.length - 1; s++) pushVec(centreline, samples[s]);
    }
    const lastNode = track.nodes[track.nodes.length - 1];
    if (track._type === 'closed') pushVec(centreline, track.nodes[0].position);
    else if (lastNode) pushVec(centreline, lastNode.position);

    if (centreline.length >= 6) {
      const geometry = new LineGeometry();
      geometry.setPositions(centreline);
      this.lineMaterial.color = selected ? COLOR.selected : COLOR.dim;
      this.lineMaterial.linewidth = selected ? 3 : 1.5;
      this.lineMaterial.opacity = selected ? 1 : 0.5;
      this.line = new Line2(geometry, this.lineMaterial);
      // Line2 needs this to size its instanced quads correctly.
      this.line.computeLineDistances();
      this.group.add(this.line);
    }

    // Unselected tracks show only their junction nodes: enough to line a new
    // connection up against, without 3,000 points of visual noise.
    const nodePositions: number[] = [];
    const nodeColors: number[] = [];
    track.nodes.forEach((node, index) => {
      const junction = isJunction(node);
      if (!selected && !junction) return;

      pushVec(nodePositions, node.position);
      const color = broken.has(brokenKey(trackKey, index))
        ? COLOR.broken
        : junction
          ? COLOR.junction
          : isStation(node)
            ? COLOR.station
            : COLOR.node;
      nodeColors.push(color.r, color.g, color.b);

      if (selected) {
        candidates.push({ trackKey, nodeIndex: index, part: 'node', world: gameToThree(node.position) });
      }
    });

    if (nodePositions.length) {
      this.nodePoints = new THREE.Points(
        buildGeometry(nodePositions, nodeColors),
        new THREE.PointsMaterial({
          size: selected ? NODE_POINT_SIZE : NODE_POINT_SIZE - 2,
          // Constant pixel size, so a node at the far end of a 15km loop is
          // still clickable rather than sub-pixel.
          sizeAttenuation: false,
          vertexColors: true,
          depthTest: false,
          transparent: true,
          opacity: selected ? 1 : 0.75,
        }),
      );
      this.nodePoints.renderOrder = 3;
      this.group.add(this.nodePoints);
    }

    if (!selected) return;

    // Handles, selected track only.
    const handleLinePositions: number[] = [];
    const handleLineColors: number[] = [];
    const handlePositions: number[] = [];
    const handleColors: number[] = [];

    track.nodes.forEach((node, index) => {
      for (const part of ['handleIn', 'handleOut'] as const) {
        const handle = node[part];
        if (!handle) continue;
        const color = part === 'handleIn' ? COLOR.handleIn : COLOR.handleOut;

        pushVec(handleLinePositions, node.position);
        pushVec(handleLinePositions, handle);
        for (let i = 0; i < 2; i++) handleLineColors.push(color.r, color.g, color.b);

        pushVec(handlePositions, handle);
        handleColors.push(color.r, color.g, color.b);

        candidates.push({ trackKey, nodeIndex: index, part, world: gameToThree(handle) });
      }
    });

    if (handleLinePositions.length) {
      this.handleLines = new THREE.LineSegments(
        buildGeometry(handleLinePositions, handleLineColors),
        new THREE.LineBasicMaterial({ vertexColors: true, depthTest: false, transparent: true, opacity: 0.8 }),
      );
      this.handleLines.renderOrder = 2;
      this.group.add(this.handleLines);

      this.handlePoints = new THREE.Points(
        buildGeometry(handlePositions, handleColors),
        new THREE.PointsMaterial({
          size: HANDLE_POINT_SIZE,
          sizeAttenuation: false,
          vertexColors: true,
          depthTest: false,
          transparent: true,
        }),
      );
      this.handlePoints.renderOrder = 3;
      this.group.add(this.handlePoints);
    }
  }

  setVisible(visible: boolean): void {
    this.group.visible = visible;
  }

  private disposeChildren(): void {
    for (const child of [...this.group.children]) {
      this.group.remove(child);
      const geometry = (child as THREE.Mesh).geometry;
      if (geometry) geometry.dispose();
      const material = (child as THREE.Mesh).material;
      // The Line2 material is shared across rebuilds and owned by this view, so
      // it is disposed in dispose() rather than here.
      if (material && material !== this.lineMaterial) {
        (Array.isArray(material) ? material : [material]).forEach((m) => m.dispose());
      }
    }
    this.line = null;
    this.nodePoints = null;
    this.handleLines = null;
    this.handlePoints = null;
  }

  dispose(): void {
    this.disposeChildren();
    this.lineMaterial.dispose();
    this.group.removeFromParent();
  }
}

// The basis swap is inlined rather than going through gameToThree: this runs
// once per sampled vertex, and allocating a Vector3 for each one produced a few
// thousand short-lived objects per rebuild -- on every mouse move during a drag.
function pushVec(into: number[], v: Vec3): void {
  into.push(v[0], v[2], -v[1]);
}

function buildGeometry(positions: number[], colors: number[]): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  return geometry;
}

/** How near the cursor a point has to be, in pixels, to be picked. */
const PICK_RADIUS_PX = 12;

export class TrackScene {
  private views = new Map<string, TrackView>();
  private candidates: PickCandidate[] = [];
  private resolution = new THREE.Vector2();
  private projected = new THREE.Vector3();

  private readonly onResize = (): void => this.updateResolution();

  constructor(private readonly overlay: Overlay) {
    this.updateResolution();
    window.addEventListener('resize', this.onResize);
  }

  private updateResolution(): void {
    this.overlay.renderer.getSize(this.resolution);
    this.resolution.multiplyScalar(this.overlay.renderer.getPixelRatio());
  }

  /** Full rebuild. Called on load and whenever the selected track changes. */
  rebuild(tracks: readonly Track[], selectedKey: string | null, visible: ReadonlySet<string>, broken: BrokenSet): void {
    this.candidates = [];
    const seen = new Set<string>();

    for (const track of tracks) {
      const key = keyOf(track);
      seen.add(key);
      const isVisible = visible.has(key) || key === selectedKey;

      let view = this.views.get(key);
      if (!view) {
        view = new TrackView(this.resolution);
        this.views.set(key, view);
        this.overlay.scene.add(view.group);
      }
      view.setVisible(isVisible);
      // Building geometry for a hidden track is wasted work, and its nodes must
      // not be pickable either.
      if (isVisible) view.build(track, key === selectedKey, broken, this.candidates);
    }

    for (const [key, view] of this.views) {
      if (seen.has(key)) continue;
      view.dispose();
      this.views.delete(key);
    }
  }

  /**
   * Nearest pickable point to the cursor, in screen space.
   *
   * Screen-space rather than THREE.Raycaster because the points are drawn with
   * sizeAttenuation off -- their on-screen size is fixed in pixels and has no
   * relationship to any world-space raycast threshold, so a raycaster would be
   * either unpickable at range or grabby up close.
   */
  pick(event: MouseEvent): PickResult | null {
    const halfW = window.innerWidth / 2;
    const halfH = window.innerHeight / 2;
    let best: PickCandidate | null = null;
    let bestDistance = PICK_RADIUS_PX;

    for (const candidate of this.candidates) {
      this.projected.copy(candidate.world).project(this.overlay.camera);
      if (this.projected.z > 1) continue; // behind the camera
      const x = (this.projected.x + 1) * halfW;
      const y = (1 - this.projected.y) * halfH;
      const distance = Math.hypot(x - event.clientX, y - event.clientY);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = candidate;
      }
    }

    return best ? { trackKey: best.trackKey, nodeIndex: best.nodeIndex, part: best.part } : null;
  }

  dispose(): void {
    window.removeEventListener('resize', this.onResize);
    for (const view of this.views.values()) view.dispose();
    this.views.clear();
    this.candidates = [];
  }
}
