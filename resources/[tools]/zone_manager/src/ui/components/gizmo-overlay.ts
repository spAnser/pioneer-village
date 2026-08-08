import { Component } from '../component';
import { UiState } from '../state';

interface HandleEls {
  line: SVGLineElement;
  hit: SVGLineElement;
}

interface Px {
  x: number;
  y: number;
}

type DragMode = ZoneManagerNew.Axis | 'plane';

// Screen-projected, native-truth 2D axis handles — no canvas, no mesh
// raycasting, no WebGL. Endpoints come from the client's per-frame
// GetScreenCoordFromWorldCoord projection (see client.ts's frame_updated
// message); this component only does 2D hit-testing and drag-delta
// reporting, per the architecture review's recommendation.
//
// A 4th handle (the flat plane square) moves the point freely along BOTH
// world X and Y at once. Its drag math is different from a single axis: a
// 2D mouse delta is decomposed against the screen-space directions of both
// X and Y (solving a 2x2 system), rather than projected onto one line —
// dragging diagonally on screen produces a proportional diagonal move in
// world space instead of only ever moving one axis at a time.
export class GizmoOverlay extends Component<UiState> {
  private svg: SVGSVGElement;
  private handles: Record<ZoneManagerNew.Axis, HandleEls>;
  private planeQuad: SVGPolygonElement;

  private draggingMode: DragMode | null = null;
  private dragOrigin: { x: number; y: number } | null = null;
  private currentGizmo: ZoneManagerNew.GizmoScreenPositions | null = null;

  private onDragStart: (mode: DragMode) => void;
  private onDragDelta: (axis: ZoneManagerNew.Axis, worldDelta: number) => void;
  private onPlaneDragDelta: (worldDeltaX: number, worldDeltaY: number) => void;
  private onDragEnd: () => void;

  constructor(handlers: {
    onDragStart: (mode: DragMode) => void;
    onDragDelta: (axis: ZoneManagerNew.Axis, worldDelta: number) => void;
    onPlaneDragDelta: (worldDeltaX: number, worldDeltaY: number) => void;
    onDragEnd: () => void;
  }) {
    super('div', 'gizmo-overlay');
    this.onDragStart = handlers.onDragStart;
    this.onDragDelta = handlers.onDragDelta;
    this.onPlaneDragDelta = handlers.onPlaneDragDelta;
    this.onDragEnd = handlers.onDragEnd;

    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('class', 'gizmo-overlay__svg');
    this.el.appendChild(this.svg);

    const makeHandle = (axis: ZoneManagerNew.Axis): HandleEls => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('class', `gizmo-handle gizmo-handle--${axis}`);
      this.svg.appendChild(line);

      // Same endpoints as the visible line (kept in sync every render, not
      // positioned separately), just a much wider invisible stroke — a
      // circular hit div centered on the leg's midpoint drifted from the
      // actual rendered leg the more the camera skewed it at oblique angles
      // (same class of bug the plane handle's hit-testing comment below
      // describes), so this hit-tests the real leg geometry instead.
      const hit = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      hit.setAttribute('class', `gizmo-handle-hit gizmo-handle-hit--${axis}`);
      hit.addEventListener('mousedown', (e) => this.startDrag(axis, e));
      // Hover state lives on the SVG line (not the hit line itself) since the
      // line is what's visually confirming "you're on the right handle" —
      // toggled here rather than pure CSS :hover because line/hit are
      // separate sibling elements, not parent/child.
      hit.addEventListener('mouseenter', () => line.classList.add('gizmo-handle--hovered'));
      hit.addEventListener('mouseleave', () => line.classList.remove('gizmo-handle--hovered'));
      this.svg.appendChild(hit);

      return { line, hit };
    };

    this.handles = { x: makeHandle('x'), y: makeHandle('y'), z: makeHandle('z') };

    // The hit area is the SVG polygon itself, not a separate CSS box — a
    // fixed-size div centered on the plane point drifted further from the
    // visible parallelogram the more the camera angle skewed the X/Y legs,
    // so at oblique angles you could click squarely on the rendered shape
    // and miss the hit target (or vice versa). SVG shapes accept pointer
    // events natively and hit-test against their own actual geometry, so
    // this stays correct at any skew with no separate box to keep in sync.
    this.planeQuad = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    this.planeQuad.setAttribute('class', 'gizmo-plane-square');
    this.planeQuad.addEventListener('mousedown', (e) => this.startDrag('plane', e));
    this.svg.appendChild(this.planeQuad);

    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('mouseup', () => this.endDrag());
  }

  render(state: UiState): void {
    const gizmo = state.selectedGizmo;
    this.currentGizmo = gizmo;
    this.el.classList.toggle('gizmo-overlay--visible', !!gizmo);
    if (!gizmo) return;

    const originPx = toPx(gizmo.origin);

    (['x', 'y', 'z'] as ZoneManagerNew.Axis[]).forEach((axis) => {
      const { line, hit } = this.handles[axis];
      const endPx = toPx(gizmo[axis]);

      line.setAttribute('x1', String(originPx.x));
      line.setAttribute('y1', String(originPx.y));
      line.setAttribute('x2', String(endPx.x));
      line.setAttribute('y2', String(endPx.y));
      line.classList.toggle('gizmo-handle--dragging', this.draggingMode === axis);

      hit.setAttribute('x1', String(originPx.x));
      hit.setAttribute('y1', String(originPx.y));
      hit.setAttribute('x2', String(endPx.x));
      hit.setAttribute('y2', String(endPx.y));
    });

    // The plane handle is a true perspective-skewed parallelogram bound to
    // the actual projected X/Y leg directions, not an axis-aligned box — an
    // axis-aligned square looked flat/disconnected from the gizmo, since it
    // ignored whatever skew the camera angle put on the X/Y legs themselves.
    // gizmo.plane is the far corner (origin + frac*xVec + frac*yVec); the
    // near corners are derived by solving for frac against the known xVec/
    // yVec, then scaling each leg vector by that same frac.
    const xVec = { x: toPx(gizmo.x).x - originPx.x, y: toPx(gizmo.x).y - originPx.y };
    const yVec = { x: toPx(gizmo.y).x - originPx.x, y: toPx(gizmo.y).y - originPx.y };
    const planePx = toPx(gizmo.plane);
    const diagVec = { x: planePx.x - originPx.x, y: planePx.y - originPx.y };

    const det = xVec.x * yVec.y - xVec.y * yVec.x;
    const frac = Math.abs(det) < 1e-6 ? 0 : (diagVec.x * yVec.y - diagVec.y * yVec.x) / det;

    const xCorner: Px = { x: originPx.x + xVec.x * frac, y: originPx.y + xVec.y * frac };
    const yCorner: Px = { x: originPx.x + yVec.x * frac, y: originPx.y + yVec.y * frac };

    this.planeQuad.setAttribute(
      'points',
      `${originPx.x},${originPx.y} ${xCorner.x},${xCorner.y} ${planePx.x},${planePx.y} ${yCorner.x},${yCorner.y}`,
    );
    this.planeQuad.classList.toggle('gizmo-plane-square--dragging', this.draggingMode === 'plane');
  }

  private startDrag(mode: DragMode, e: MouseEvent): void {
    e.stopPropagation();
    e.preventDefault();
    this.draggingMode = mode;
    this.dragOrigin = { x: e.clientX, y: e.clientY };
    this.onDragStart(mode);
  }

  private onMouseMove(e: MouseEvent): void {
    if (!this.draggingMode || !this.dragOrigin || !this.currentGizmo) return;

    const mouseDelta = { x: e.clientX - this.dragOrigin.x, y: e.clientY - this.dragOrigin.y };
    this.dragOrigin = { x: e.clientX, y: e.clientY };

    if (this.draggingMode === 'plane') {
      this.handlePlaneDrag(mouseDelta);
    } else {
      this.handleAxisDrag(this.draggingMode, mouseDelta);
    }
  }

  private handleAxisDrag(axis: ZoneManagerNew.Axis, mouseDelta: { x: number; y: number }): void {
    const gizmo = this.currentGizmo!;
    const originPx = toPx(gizmo.origin);
    const endPx = toPx(gizmo[axis]);
    const handleVec = { x: endPx.x - originPx.x, y: endPx.y - originPx.y };
    const handleLenPx = Math.hypot(handleVec.x, handleVec.y);
    if (handleLenPx < 1) return;
    const handleDir = { x: handleVec.x / handleLenPx, y: handleVec.y / handleLenPx };

    const signedPx = mouseDelta.x * handleDir.x + mouseDelta.y * handleDir.y;
    const worldPerPx = gizmo.handleLength / handleLenPx;
    const worldDelta = signedPx * worldPerPx;

    this.onDragDelta(axis, worldDelta);
  }

  // Decomposes a 2D screen-space mouse delta into independent world X and Y
  // deltas by solving the 2x2 system [xDirPx yDirPx] * [dx dy]^T = mouseDelta,
  // where xDirPx/yDirPx are the screen-space directions the X/Y axis handles
  // already give us (same vectors handleAxisDrag uses one at a time). This
  // is what lets a single diagonal mouse drag move both axes proportionally
  // in one motion instead of forcing the user to drag one axis, release,
  // then drag the other.
  private handlePlaneDrag(mouseDelta: { x: number; y: number }): void {
    const gizmo = this.currentGizmo!;
    const originPx = toPx(gizmo.origin);
    const xEndPx = toPx(gizmo.x);
    const yEndPx = toPx(gizmo.y);

    const xVec = { x: xEndPx.x - originPx.x, y: xEndPx.y - originPx.y };
    const yVec = { x: yEndPx.x - originPx.x, y: yEndPx.y - originPx.y };

    // Solve [xVec yVec] * [a b]^T = mouseDelta for a, b (Cramer's rule) —
    // a/b are mouseDelta expressed in units of "how far along the X/Y arm's
    // full screen-space length", which then scales directly to world units
    // via handleLength since each arm's screen length already corresponds
    // to exactly handleLength world units (same calibration as axis drag).
    const det = xVec.x * yVec.y - xVec.y * yVec.x;
    if (Math.abs(det) < 1e-6) return;

    const a = (mouseDelta.x * yVec.y - mouseDelta.y * yVec.x) / det;
    const b = (xVec.x * mouseDelta.y - xVec.y * mouseDelta.x) / det;

    const worldDeltaX = a * gizmo.handleLength;
    const worldDeltaY = b * gizmo.handleLength;

    this.onPlaneDragDelta(worldDeltaX, worldDeltaY);
  }

  private endDrag(): void {
    if (!this.draggingMode) return;
    this.draggingMode = null;
    this.dragOrigin = null;
    this.onDragEnd();
  }
}

function toPx(pos: ZoneManagerNew.ScreenPos): { x: number; y: number } {
  return {
    x: ((pos.x + 1) / 2) * window.innerWidth,
    y: ((pos.y + 1) / 2) * window.innerHeight,
  };
}
