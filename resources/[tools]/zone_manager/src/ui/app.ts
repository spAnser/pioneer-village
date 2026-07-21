import { post } from './comms';
import { GizmoOverlay } from './components/gizmo-overlay';
import { Hud } from './components/hud';
import { PointMarkers } from './components/point-markers';
import { BoundsSection } from './components/sections/bounds-section';
import { ExportSection } from './components/sections/export-section';
import { PointListSection } from './components/sections/point-list-section';
import { SelectedPointSection } from './components/sections/selected-point-section';
import { SidePanel } from './components/side-panel';
import { StatusStrip } from './components/status-strip';
import { createInitialState, UiState } from './state';

function toArray<T>(value: T[] | Record<string, never> | undefined): T[] {
  return Array.isArray(value) ? value : [];
}

export class App {
  private state: UiState = createInitialState();
  private root: HTMLElement;

  private statusStrip: StatusStrip;
  private hud: Hud;
  private pointMarkers: PointMarkers;
  private gizmoOverlay: GizmoOverlay;
  private sidePanel: SidePanel;

  constructor(root: HTMLElement) {
    this.root = root;

    this.statusStrip = new StatusStrip({
      onUndo: () => this.undoPoint(),
      onClear: () => this.clearPoints(),
    });

    this.hud = new Hud({
      onNudge: (axis, delta) => this.nudgePoint(axis, delta),
      onDismissNudge: () => this.dismissNudge(),
    });

    this.pointMarkers = new PointMarkers({
      onSelect: (index) => this.selectPoint(index),
      onHover: (index) => this.hoverPoint(index),
    });

    this.gizmoOverlay = new GizmoOverlay({
      onDragStart: (mode) => this.update({ draggingAxis: mode }),
      onDragDelta: (axis, worldDelta) => this.dragPoint(axis, worldDelta),
      onPlaneDragDelta: (worldDeltaX, worldDeltaY) => this.dragPointPlane(worldDeltaX, worldDeltaY),
      onDragEnd: () => {
        // Flush immediately rather than waiting for the throttle timer, so
        // the last bit of movement between the previous flush and mouseup
        // isn't lost/delayed.
        if (this.dragFlushTimer !== null) {
          window.clearTimeout(this.dragFlushTimer);
          this.dragFlushTimer = null;
          this.flushDrag();
        }
        this.update({ draggingAxis: null });
      },
    });

    this.sidePanel = new SidePanel({
      selectedPointSection: new SelectedPointSection({
        onSetPosition: (axis, value) => this.setSelectedAxis(axis, value),
        onDelete: () => this.deleteSelected(),
      }),
      pointListSection: new PointListSection({
        onSelect: (index) => this.selectPoint(index),
        onHover: (index) => this.hoverPoint(index),
        onDelete: (index) => this.deletePoint(index),
      }),
      boundsSection: new BoundsSection({
        onToggle: () => this.update({ boundsSectionExpanded: !this.state.boundsSectionExpanded }),
        onChange: (minZ, maxZ) => this.setBounds(minZ, maxZ),
        onSnapChange: (enabled) => this.setSnapToGround(enabled),
      }),
      exportSection: new ExportSection({
        onToggle: () => this.update({ exportSectionExpanded: !this.state.exportSectionExpanded }),
        onGenerate: () => this.generateExport(),
      }),
      onOpen: () => this.update({ panelOpen: true }),
    });

    this.statusStrip.mount(root);
    this.hud.mount(root);
    this.pointMarkers.mount(root);
    this.gizmoOverlay.mount(root);
    this.sidePanel.mount(root);

    this.wireMessages();
    this.wireInput();
  }

  private update(patch: Partial<UiState>): void {
    this.state = { ...this.state, ...patch };
    this.renderAll();
  }

  private renderAll(): void {
    this.root.classList.toggle('app--show', this.state.show);
    this.statusStrip.render(this.state);
    this.hud.render(this.state);
    this.pointMarkers.render(this.state);
    this.gizmoOverlay.render(this.state);
    this.sidePanel.render(this.state);
  }

  // Narrow update paths for the two high-frequency native feeds (cursor at
  // ~20Hz, frame/gizmo screen positions at ~30Hz). Going through update()'s
  // full renderAll() on every message was re-rendering the side panel and
  // all 4 of its sections 50 times a second for data neither of them
  // displays — the actual cause of the reported general UI lag while
  // dragging the gizmo or watching the cursor readout, not anything
  // specific to gizmo math itself. Only the components that actually read
  // the changed state are re-rendered here.
  private updateCursor(cursor: ZoneManagerNew.Point | null): void {
    this.state = { ...this.state, cursor };
    this.statusStrip.render(this.state);
  }

  private updateFrame(pointScreens: ZoneManagerNew.PointScreenEntry[], selectedGizmo: ZoneManagerNew.GizmoScreenPositions | null): void {
    this.state = { ...this.state, pointScreens, selectedGizmo };
    this.pointMarkers.render(this.state);
    this.gizmoOverlay.render(this.state);
  }

  private wireMessages(): void {
    window.addEventListener('message', (event) => {
      const message = (typeof event.data === 'string' ? JSON.parse(event.data) : event.data) as ZoneManagerNew.HostMessage;
      switch (message.action) {
        case 'show':
          this.update({
            show: true,
            points: toArray(message.points),
            minZ: message.minZ,
            maxZ: message.maxZ,
            selectedIndex: null,
            panelOpen: false,
            exportData: null,
            snapToGround: message.snapToGround,
          });
          break;
        case 'hide':
          this.update({ show: false, selectedIndex: null, panelOpen: false });
          break;
        case 'points_updated':
          this.update({ points: toArray(message.points), exportData: null });
          break;
        case 'cursor_updated':
          this.updateCursor(message.cursor);
          break;
        case 'frame_updated':
          this.updateFrame(toArray(message.pointScreens), message.selectedGizmo);
          break;
      }
    });
  }

  private wireInput(): void {
    const moveKeys: Record<string, ZoneManagerNew.MoveInputPayload['key']> = {
      KeyW: 'w',
      KeyS: 's',
      KeyA: 'a',
      KeyD: 'd',
      KeyQ: 'q',
      KeyE: 'e',
      ShiftLeft: 'sprint',
      ShiftRight: 'sprint',
    };
    const pressedKeys = new Set<string>();

    const isTextInputFocused = () => {
      const tag = document.activeElement && document.activeElement.tagName;
      return tag === 'INPUT' || tag === 'TEXTAREA';
    };

    document.addEventListener('keydown', (event) => {
      if (!this.state.show) return;

      if (event.key === 'Escape') {
        // Escape steps backward exactly one state at a time: panel, then
        // selection, then close — never more than one per press.
        if (this.state.panelOpen) {
          this.update({ panelOpen: false });
        } else if (this.state.selectedIndex !== null) {
          this.update({ selectedIndex: null });
        } else {
          this.close();
        }
        return;
      }

      if (isTextInputFocused()) return;

      if (event.code === 'Tab' && !event.repeat) {
        event.preventDefault();
        this.update({ panelOpen: !this.state.panelOpen });
        return;
      }

      if (event.code === 'KeyF' && !event.repeat) {
        this.placePoint();
        return;
      }

      const key = moveKeys[event.code];
      if (key && !pressedKeys.has(key)) {
        pressedKeys.add(key);
        post('move_input', { key, pressed: true });
      }
    });

    document.addEventListener('keyup', (event) => {
      const key = moveKeys[event.code];
      if (key && pressedKeys.has(key)) {
        pressedKeys.delete(key);
        post('move_input', { key, pressed: false });
      }
    });

    let dragging = false;

    window.addEventListener('blur', () => {
      for (const key of pressedKeys) {
        post('move_input', { key, pressed: false });
      }
      pressedKeys.clear();

      // Losing window focus mid-rotate-drag (e.g. alt-tab) would otherwise
      // leave the client stuck thinking the camera is still rotating —
      // permanently suppressing the cursor raycast/sphere until the mouse
      // button happens to be released somewhere this window can see.
      if (dragging) {
        dragging = false;
        post('set_camera_rotating', { rotating: false });
      }
    });
    let lastX = 0;
    let lastY = 0;

    document.addEventListener('mousedown', (event) => {
      if (!this.state.show || this.state.draggingAxis) return;
      const target = event.target as HTMLElement;
      if (target.closest('.gizmo-handle-hit') || target.closest('.gizmo-plane-square')) return;
      // Any click on UI chrome (status strip buttons, side panel, HUD
      // controls) must never fall through to world-interaction handling —
      // previously only .side-panel/.point-marker were excluded here, so
      // clicking the status strip's Undo/Clear buttons both fired the
      // button's own click handler AND placed a stray point in the world
      // via this document-level listener, which looked like "the undo
      // button does nothing" since the visible symptom was an unwanted
      // point appearing instead of an obviously-broken undo.
      if (target.closest('.status-strip') || target.closest('.hud') || target.closest('.side-panel')) return;

      if (event.button === 1 || event.button === 2) {
        dragging = true;
        lastX = event.clientX;
        lastY = event.clientY;
        // The cursor raycast target is meaningless while the camera is
        // actively rotating (both because it's not what the tool is
        // currently doing, and because the ray direction depends on camera
        // rotation, so mid-rotation hits are inherently noisy) — tell the
        // client to stop computing it, which also hides the cyan sphere.
        post('set_camera_rotating', { rotating: true });
      } else if (event.button === 0) {
        if (target.closest('.point-marker')) return;
        // Left click on empty world space deselects (if something is
        // selected) rather than placing — placement stays bound to F/explicit
        // click-to-place semantics unaffected; a bare click on the world
        // background otherwise reads as "click away to deselect," standard
        // CAD/DCC convention.
        if (this.state.selectedIndex !== null) {
          this.update({ selectedIndex: null });
        } else {
          this.placePoint();
        }
      }
    });

    document.addEventListener('mouseup', () => {
      if (dragging) {
        post('set_camera_rotating', { rotating: false });
      }
      dragging = false;
    });

    document.addEventListener('mousemove', (event) => {
      if (!this.state.show) return;

      // Moving the cursor to aim the next placement dismisses any active
      // nudge stepper — it's a transient correction for "the point I just
      // placed," not a persistent editor (see plan: Placing a point).
      if (this.state.nudgeIndex !== null) {
        this.update({ nudgeIndex: null });
      }

      if (!dragging || this.state.draggingAxis) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;
      this.sendRotate(dx, dy);
    });
  }

  private placePoint(): void {
    post<ZoneManagerNew.PlacePointResult>('place_point_key').then(() => {
      // Server-of-truth points array arrives via the points_updated message;
      // the nudge stepper targets whatever the new last index will be.
      this.update({ nudgeIndex: this.state.points.length });
    });
  }

  private selectPoint(index: number | null): void {
    post('select_point', { index });
    this.update({ selectedIndex: index, nudgeIndex: null });
  }

  private hoverPoint(index: number | null): void {
    this.update({ hoveredIndex: index });
  }

  private deletePoint(index: number): void {
    post<ZoneManagerNew.PointsResult>('delete_point', { index }).then((res) => {
      const selectedIndex = this.state.selectedIndex === index ? null : this.state.selectedIndex;
      this.update({ points: toArray(res.points), selectedIndex, exportData: null });
    });
  }

  private deleteSelected(): void {
    if (this.state.selectedIndex === null) return;
    this.deletePoint(this.state.selectedIndex);
  }

  private undoPoint(): void {
    post<ZoneManagerNew.PointsResult>('undo_point').then((res) => {
      const points = toArray(res.points);
      const selectedIndex = this.state.selectedIndex !== null && this.state.selectedIndex >= points.length ? null : this.state.selectedIndex;
      this.update({ points, selectedIndex, exportData: null });
    });
  }

  private clearPoints(): void {
    post<ZoneManagerNew.PointsResult>('clear_points').then((res) => {
      this.update({ points: toArray(res.points), selectedIndex: null, exportData: null });
    });
  }

  private setBounds(minZ: number, maxZ: number): void {
    post('set_bounds', { minZ, maxZ });
    this.update({ minZ, maxZ });
  }

  private setSnapToGround(enabled: boolean): void {
    post('set_snap_to_ground', { enabled });
    this.update({ snapToGround: enabled });
  }

  private generateExport(): void {
    post<ZoneManagerNew.ExportResult>('get_export').then((res) => {
      this.update({ exportData: res, exportSectionExpanded: true });
    });
  }

  private setSelectedAxis(axis: ZoneManagerNew.Axis, value: number): void {
    if (this.state.selectedIndex === null) return;
    this.setPointAxis(this.state.selectedIndex, axis, value);
  }

  private nudgePoint(axis: ZoneManagerNew.Axis, delta: number): void {
    if (this.state.nudgeIndex === null) return;
    const point = this.state.points[this.state.nudgeIndex];
    if (!point) return;
    this.setPointAxis(this.state.nudgeIndex, axis, point[axis] + delta);
  }

  private setPointAxis(index: number, axis: ZoneManagerNew.Axis, value: number): void {
    const point = this.state.points[index];
    if (!point) return;
    const next = { ...point, [axis]: value };
    post('set_point_position', { index, ...next });
    const points = this.state.points.slice();
    points[index] = next;
    this.update({ points, exportData: null });
  }

  private dismissNudge(): void {
    this.update({ nudgeIndex: null });
  }

  // Mousemove can fire far faster than the gizmo's own 30Hz screen-position
  // feed — without coalescing, every single pixel of mouse movement during a
  // drag fired its own fetch() round-trip AND a full renderAll(), which was
  // the other half of the reported drag lag (the message-handling side is
  // fixed by updateFrame/updateCursor above). Deltas accumulate locally and
  // flush to the client on a fixed interval instead of once per mousemove;
  // the visual gizmo position itself still comes from the frame_updated
  // feed, not from this call's response, so throttling the network side
  // doesn't affect how often the handle visually redraws.
  private static readonly DRAG_FLUSH_INTERVAL_MS = 50;
  private pendingAxisDrag: { axis: ZoneManagerNew.Axis; delta: number } | null = null;
  private pendingPlaneDrag: { deltaX: number; deltaY: number } | null = null;
  private dragFlushTimer: number | null = null;

  private dragPoint(axis: ZoneManagerNew.Axis, worldDelta: number): void {
    if (this.state.selectedIndex === null) return;
    if (this.pendingAxisDrag && this.pendingAxisDrag.axis === axis) {
      this.pendingAxisDrag.delta += worldDelta;
    } else {
      this.pendingAxisDrag = { axis, delta: worldDelta };
    }
    this.scheduleDragFlush();
  }

  private dragPointPlane(worldDeltaX: number, worldDeltaY: number): void {
    if (this.state.selectedIndex === null) return;
    if (this.pendingPlaneDrag) {
      this.pendingPlaneDrag.deltaX += worldDeltaX;
      this.pendingPlaneDrag.deltaY += worldDeltaY;
    } else {
      this.pendingPlaneDrag = { deltaX: worldDeltaX, deltaY: worldDeltaY };
    }
    this.scheduleDragFlush();
  }

  private scheduleDragFlush(): void {
    if (this.dragFlushTimer !== null) return;
    this.dragFlushTimer = window.setTimeout(() => this.flushDrag(), App.DRAG_FLUSH_INTERVAL_MS);
  }

  private flushDrag(): void {
    this.dragFlushTimer = null;
    const index = this.state.selectedIndex;
    if (index === null) {
      this.pendingAxisDrag = null;
      this.pendingPlaneDrag = null;
      return;
    }

    if (this.pendingAxisDrag) {
      const { axis, delta } = this.pendingAxisDrag;
      this.pendingAxisDrag = null;
      post<ZoneManagerNew.PointsResult>('drag_point_axis', { index, axis, delta }).then((res) => {
        this.updatePointsLight(toArray(res.points));
      });
    }

    if (this.pendingPlaneDrag) {
      const { deltaX, deltaY } = this.pendingPlaneDrag;
      this.pendingPlaneDrag = null;
      post<ZoneManagerNew.PointsResult>('drag_point_plane', { index, deltaX, deltaY }).then((res) => {
        this.updatePointsLight(toArray(res.points));
      });
    }
  }

  // Deliberately NOT batched, unlike gizmo dragging — camera rotation has no
  // separate live redraw feed; this network call is the ONLY thing that
  // moves the camera. Batching it (an earlier attempt at this) meant the
  // camera sat still for the whole batch window and then jumped the full
  // accumulated angle in one step, which is worse than the per-pixel calls
  // it was meant to fix: visibly stuttering/stepped rotation instead of
  // continuous look. Gizmo drags are fine to batch because the point's
  // screen position is server-authoritative and redraws from a separate
  // always-live frame_updated feed regardless of when the drag call lands.
  private sendRotate(dx: number, dy: number): void {
    post('rotate_camera', { x: dx, y: dy });
  }

  // Same "only render what actually reads this state" principle as
  // updateCursor/updateFrame — a drag response only needs to keep the panel
  // (if open) and export-staleness in sync, not re-render the gizmo/markers
  // (those already redraw from the next frame_updated message).
  private updatePointsLight(points: ZoneManagerNew.Point[]): void {
    this.state = { ...this.state, points, exportData: null };
    this.sidePanel.render(this.state);
  }

  private close(): void {
    post('close_ui');
    this.update({ show: false, selectedIndex: null, panelOpen: false });
  }
}
