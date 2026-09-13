import { post } from './comms';
import { el } from './component';
import { InputController } from './input';
import { type Vec3, cloneVec, isCurved, keyOf, nextIndex } from './model/track';
import { type Selection, TrackStore } from './model/track-store';
import { ExportPanel } from './panel/export-panel';
import { Inspector } from './panel/inspector';
import { NodeList } from './panel/node-list';
import { StatusBar } from './panel/status-bar';
import { TrackList } from './panel/track-list';
import { Gizmo, type TranslationSnap } from './scene/gizmo';
import { Overlay } from './scene/overlay';
import { TrackScene } from './scene/track-meshes';
import { type UiState, createInitialState, selectedTrack } from './state';

/** Value compare, because the model mutates node positions in place. */
function sameVec(a: Vec3 | null, b: Vec3 | null): boolean {
  if (a === null || b === null) return a === b;
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}

/**
 * Wires the overlay, the model and the panels together.
 *
 * Rendering is split in two on purpose. The three.js scene redraws every
 * animation frame so the overlay tracks the game camera with no lag; the DOM
 * panels redraw only when the model or selection actually changes. Re-rendering
 * a 473-row node list at 60Hz would cost far more than the whole scene does.
 */
export class App {
  private readonly state: UiState = createInitialState();
  private readonly store = new TrackStore();
  private readonly overlay = new Overlay();
  private readonly scene: TrackScene;
  private readonly gizmo: Gizmo;
  private readonly input: InputController;

  private readonly root: HTMLElement;
  private readonly panel = el('aside', 'panel');
  private readonly trackList: TrackList;
  private readonly nodeList: NodeList;
  private readonly inspector: Inspector;
  private readonly exportPanel: ExportPanel;
  private readonly statusBar: StatusBar;

  /** Set when something changed; drained once per frame. */
  private panelsDirty = true;
  /** Set when track geometry changed and the scene buffers must be rebuilt. */
  private sceneDirty = true;
  /**
   * Last position pushed to the client's in-world marker.
   *
   * Held as a copy, not a reference into the model: TrackStore moves nodes in
   * place, so a reference would compare equal to itself after every drag step
   * and the marker would never move.
   */
  private markerPosition: Vec3 | null = null;

  constructor(root: HTMLElement) {
    this.root = root;
    this.root.classList.add('editor-root');
    this.overlay.mount(this.root);
    this.scene = new TrackScene(this.overlay);

    this.gizmo = new Gizmo(this.overlay, {
      onDragStart: () => this.beginDrag(),
      onDrag: (position) => this.applyDrag(position),
      onDragEnd: () => this.store.commitEdit(),
    });

    this.trackList = new TrackList({
      onSelect: (key) => this.selectTrack(key),
      onToggleVisible: (key, visible) => {
        if (visible) this.state.visibleTracks.add(key);
        else this.state.visibleTracks.delete(key);
        this.markScene();
      },
      onFilter: (text) => {
        this.state.trackFilter = text;
        this.markPanels();
      },
      onShowOnlySelected: () => {
        this.state.visibleTracks.clear();
        this.markScene();
      },
    });

    this.nodeList = new NodeList({
      onSelect: (index) => this.select({ trackKey: this.state.selectedTrackKey!, nodeIndex: index, part: 'node' }),
      onFocus: (index) => {
        this.select({ trackKey: this.state.selectedTrackKey!, nodeIndex: index, part: 'node' });
        this.focusSelection();
      },
    });

    this.inspector = new Inspector({
      onPosition: (part, axis, value) => this.setAxis(part, axis, value),
      onFlags: (flags) => this.withSelection((s) => this.store.setFlags(s.trackKey, s.nodeIndex, flags)),
      onName: (name) => this.withSelection((s) => this.store.setName(s.trackKey, s.nodeIndex, name)),
      onCurved: (curved) => this.withSelection((s) => this.store.setCurved(s.trackKey, s.nodeIndex, curved)),
      onInsertAfter: () => this.insertAfterSelection(),
      onDelete: () => this.deleteSelection(),
      onReorder: (delta) => this.reorderSelection(delta),
      onSnapGround: () => void this.snapSelectionToGround(),
      onSelectPart: (part) => this.withSelection((s) => this.select({ ...s, part })),
    });

    this.exportPanel = new ExportPanel({
      onToggle: () => {
        this.state.exportOpen = !this.state.exportOpen;
        this.markPanels();
      },
    });

    this.statusBar = new StatusBar({
      onSnap: (snap) => this.setSnap(snap),
      onToggleMirror: () => this.toggleMirror(),
      onUndo: () => this.undo(),
      onClose: () => this.close(),
    });

    this.trackList.mount(this.panel);
    this.nodeList.mount(this.panel);
    this.inspector.mount(this.panel);
    this.exportPanel.mount(this.panel);
    this.root.appendChild(this.panel);
    this.statusBar.mount(this.root);

    this.input = new InputController({
      onClose: () => this.close(),
      onUndo: () => this.undo(),
      onDelete: () => this.deleteSelection(),
      onInsert: () => this.insertAfterSelection(),
      onFocusSelection: () => this.focusSelection(),
      onToggleMirror: () => this.toggleMirror(),
      onCycleSelection: (delta) => this.cycleSelection(delta),
    });

    this.overlay.canvas.addEventListener('mousedown', this.onCanvasMouseDown);
    window.addEventListener('message', this.onHostMessage);

    this.setVisible(false);
    requestAnimationFrame(this.frame);
  }

  /* --------------------------------------------------------------- host IO */

  private onHostMessage = (event: MessageEvent<TraintrackEditor.HostMessage>): void => {
    if (!event.isTrusted) return;
    const message = event.data;
    switch (message?.action) {
      case 'show':
        this.store.load(message.tracks);
        this.state.tracks = this.store.getTracks();
        this.state.loadFailures = message.failures ?? [];
        this.state.selection = null;
        this.state.selectedTrackKey = null;
        this.refreshDerived();
        this.setVisible(true);
        this.markScene();
        break;
      case 'hide':
        this.setVisible(false);
        break;
      case 'frame':
        this.overlay.syncCamera(message.cam);
        break;
      case 'cursor':
        this.state.cursor = message.hit;
        this.markPanels();
        break;
    }
  };

  private setVisible(show: boolean): void {
    this.state.show = show;
    this.root.classList.toggle('editor-root--visible', show);
    this.input.setActive(show);
    if (!show) {
      this.gizmo.detach();
      // The frame loop returns early while hidden and will never notice the
      // marker should go. The client clears its own on close_ui, but a
      // host-driven 'hide' does not come through that path.
      this.pushMarker(null);
    }
    this.markPanels();
  }

  private close(): void {
    this.setVisible(false);
    void post('close_ui');
  }

  /* ----------------------------------------------------------- render loop */

  private frame = (): void => {
    requestAnimationFrame(this.frame);
    if (!this.state.show) return;

    if (this.sceneDirty) {
      this.sceneDirty = false;
      this.scene.rebuild(this.state.tracks, this.state.selectedTrackKey, this.state.visibleTracks, this.state.broken);
    }
    if (this.panelsDirty) {
      this.panelsDirty = false;
      this.trackList.render(this.state);
      this.nodeList.render(this.state);
      this.inspector.render(this.state);
      this.exportPanel.render(this.state);
      this.statusBar.render(this.state);
    }
    // The client's in-world marker rides the gizmo target. Driven from here
    // rather than from each of the nine places that can move the selection
    // (pick, cycle, drag, numeric entry, insert, delete, reorder, ground snap,
    // undo): one call site reading the same selectedPosition() the gizmo reads
    // cannot drift out of sync with it, and the frame is the natural rate limit
    // for a drag that otherwise fires on every mouse move.
    this.pushMarker(this.selectedPosition());
    this.overlay.render();
  };

  /** Tell the client where to draw the in-world marker, only when it moved. */
  private pushMarker(position: Vec3 | null): void {
    if (sameVec(position, this.markerPosition)) return;
    this.markerPosition = position ? cloneVec(position) : null;
    void post('selection_marker', { position: this.markerPosition });
  }

  private markPanels(): void {
    this.panelsDirty = true;
  }

  /** Geometry changed: the scene buffers and the panels both need a pass. */
  private markScene(): void {
    this.sceneDirty = true;
    this.panelsDirty = true;
    this.state.revision++;
  }

  private refreshDerived(): void {
    this.state.tracks = this.store.getTracks();
    this.state.broken = this.store.getBroken();
    this.state.selfReferencing = this.store.getSelfReferencing();
    this.state.undoLabel = this.store.undoLabel();
    this.state.lengthDeltas = this.state.selectedTrackKey ? this.store.lengthDeltas(this.state.selectedTrackKey) : [];
  }

  /* ------------------------------------------------------------- selection */

  private selectTrack(key: string): void {
    this.state.selectedTrackKey = key;
    this.state.selection = null;
    this.gizmo.detach();
    this.refreshDerived();
    this.markScene();
  }

  private select(selection: Selection | null): void {
    this.state.selection = selection;
    const position = this.selectedPosition();
    if (position) this.gizmo.attach(position);
    else this.gizmo.detach();
    this.markPanels();
  }

  private withSelection(run: (selection: Selection) => void): void {
    if (!this.state.selection) return;
    run(this.state.selection);
    this.afterEdit();
  }

  /** World position of whatever the gizmo is on. */
  private selectedPosition(): Vec3 | null {
    const selection = this.state.selection;
    const track = selectedTrack(this.state);
    const node = selection && track ? track.nodes[selection.nodeIndex] : undefined;
    if (!selection || !node) return null;
    if (selection.part === 'node') return node.position;
    return node[selection.part] ?? null;
  }

  private afterEdit(): void {
    this.refreshDerived();
    const position = this.selectedPosition();
    if (position) this.gizmo.sync(position);
    else this.gizmo.detach();
    this.markScene();
  }

  private onCanvasMouseDown = (event: MouseEvent): void => {
    if (!this.state.show || event.button !== 0) return;
    // A click that lands on a gizmo arrow belongs to the drag, not to picking.
    if (this.gizmo.engaged || this.gizmo.dragging) return;

    const hit = this.scene.pick(event);
    if (!hit) {
      this.select(null);
      return;
    }
    if (hit.trackKey !== this.state.selectedTrackKey) {
      this.selectTrack(hit.trackKey);
    }
    this.select({ trackKey: hit.trackKey, nodeIndex: hit.nodeIndex, part: hit.part });
  };

  private cycleSelection(delta: number): void {
    const track = selectedTrack(this.state);
    if (!track) return;
    const current = this.state.selection?.nodeIndex ?? -1;
    const count = track.nodes.length;
    const next = (((current + delta) % count) + count) % count;
    this.select({ trackKey: keyOf(track), nodeIndex: next, part: 'node' });
  }

  private focusSelection(): void {
    const position = this.selectedPosition();
    if (!position) return;
    // Stand back and above rather than inside the node, so it is actually in
    // frame when the camera arrives.
    void post('move_camera', { x: position[0], y: position[1] - 12, z: position[2] + 8 });
  }

  /* ----------------------------------------------------------------- edits */

  private beginDrag(): void {
    if (!this.state.selection) return;
    const { trackKey, part } = this.state.selection;
    this.store.beginEdit(part === 'node' ? 'move node' : 'move handle', [trackKey]);
  }

  private applyDrag(position: Vec3): void {
    const selection = this.state.selection;
    if (!selection) return;
    if (selection.part === 'node') {
      this.store.moveNode(selection.trackKey, selection.nodeIndex, position);
    } else {
      this.store.moveHandle(
        selection.trackKey,
        selection.nodeIndex,
        selection.part,
        position,
        this.state.mirrorHandles,
      );
    }
    this.refreshDerived();
    this.markScene();
  }

  private setAxis(part: 'node' | 'handleIn' | 'handleOut', axis: 0 | 1 | 2, value: number): void {
    const selection = this.state.selection;
    const track = selectedTrack(this.state);
    const node = selection && track ? track.nodes[selection.nodeIndex] : undefined;
    if (!selection || !node) return;

    const current = part === 'node' ? node.position : node[part];
    if (!current) return;
    const next = cloneVec(current);
    next[axis] = value;

    this.store.beginEdit(part === 'node' ? 'set position' : 'set handle', [selection.trackKey]);
    if (part === 'node') this.store.moveNode(selection.trackKey, selection.nodeIndex, next);
    else this.store.moveHandle(selection.trackKey, selection.nodeIndex, part, next, this.state.mirrorHandles);
    this.store.commitEdit();
    this.afterEdit();
  }

  private insertAfterSelection(): void {
    const selection = this.state.selection;
    const track = selectedTrack(this.state);
    if (!track) return;

    // With no node selected, or on the last node of an open track, there is no
    // following segment to split -- so extend the track to the cursor instead,
    // which is how a new track gets drawn in the first place.
    const index = selection?.nodeIndex ?? track.nodes.length - 1;
    const hasNext = nextIndex(track, index) !== null;
    const key = keyOf(track);

    const newIndex = hasNext
      ? this.store.insertAfter(key, index)
      : this.state.cursor
        ? this.store.appendNode(key, [this.state.cursor.x, this.state.cursor.y, this.state.cursor.z])
        : null;

    if (newIndex === null) return;
    this.select({ trackKey: key, nodeIndex: newIndex, part: 'node' });
    this.afterEdit();
  }

  private deleteSelection(): void {
    this.withSelection((selection) => {
      if (!this.store.deleteNode(selection.trackKey, selection.nodeIndex)) return;
      const track = this.store.getTrack(selection.trackKey);
      const next = track ? Math.min(selection.nodeIndex, track.nodes.length - 1) : null;
      this.state.selection = next === null ? null : { ...selection, nodeIndex: next, part: 'node' };
    });
  }

  private reorderSelection(delta: number): void {
    this.withSelection((selection) => {
      const to = selection.nodeIndex + delta;
      if (!this.store.reorderNode(selection.trackKey, selection.nodeIndex, to)) return;
      this.state.selection = { ...selection, nodeIndex: to, part: 'node' };
    });
  }

  private async snapSelectionToGround(): Promise<void> {
    const selection = this.state.selection;
    const position = this.selectedPosition();
    if (!selection || !position) return;

    const result = await post<TraintrackEditor.GroundSnapResult>('snap_ground', {
      x: position[0],
      y: position[1],
      z: position[2],
    });
    if (!result?.hit) return;

    this.store.beginEdit('snap to ground', [selection.trackKey]);
    const target: Vec3 = [position[0], position[1], result.z + 0.16666666666];
    if (selection.part === 'node') this.store.moveNode(selection.trackKey, selection.nodeIndex, target);
    else
      this.store.moveHandle(selection.trackKey, selection.nodeIndex, selection.part, target, this.state.mirrorHandles);
    this.store.commitEdit();
    this.afterEdit();
  }

  private undo(): void {
    if (!this.store.undo()) return;
    // The node the gizmo was on may not exist any more after undoing a delete
    // or an insert.
    const track = selectedTrack(this.state);
    if (this.state.selection && track && this.state.selection.nodeIndex >= track.nodes.length) {
      this.state.selection = null;
    }
    // A handle can also have vanished, if the undo restored a plain node.
    const node = this.state.selection && track ? track.nodes[this.state.selection.nodeIndex] : undefined;
    if (this.state.selection && this.state.selection.part !== 'node' && node && !isCurved(node)) {
      this.state.selection = { ...this.state.selection, part: 'node' };
    }
    this.afterEdit();
  }

  private setSnap(snap: TranslationSnap): void {
    this.state.translationSnap = snap;
    this.gizmo.setSnap(snap);
    this.markPanels();
  }

  private toggleMirror(): void {
    this.state.mirrorHandles = !this.state.mirrorHandles;
    this.markPanels();
  }
}
