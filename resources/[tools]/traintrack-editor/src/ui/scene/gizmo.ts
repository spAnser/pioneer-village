import * as THREE from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';

import type { Vec3 } from '../model/track';
import { type Overlay, gameToThreeInto, threeToGame } from './overlay';

/**
 * Translate gizmo for the selected node or handle.
 *
 * It drives an invisible proxy Object3D rather than any scene geometry: the
 * track meshes are rebuilt wholesale on every model change, so a gizmo attached
 * to one of them would lose its target on the first drag. The proxy survives
 * rebuilds, and the model stays the single source of truth.
 *
 * Unlike object_manager's vendored r121 copy, modern TransformControls is a
 * Controls subclass and NOT an Object3D -- its visuals come from getHelper(),
 * and adding the controls object to the scene (as the old code does) silently
 * renders nothing.
 */

export const TRANSLATION_SNAPS = [null, 0.05, 0.1, 0.25, 0.5, 1, 2, 5] as const;
export type TranslationSnap = (typeof TRANSLATION_SNAPS)[number];

export interface GizmoHandlers {
  /** Drag started. Open one undo transaction for the whole drag. */
  onDragStart: () => void;
  /** New world position, in game coordinates, on every mouse move. */
  onDrag: (position: Vec3) => void;
  onDragEnd: () => void;
}

export class Gizmo {
  private readonly controls: TransformControls;
  private readonly proxy = new THREE.Object3D();
  private attached = false;
  /** Guards the change handler while this class is the one moving the proxy. */
  private suppress = false;

  constructor(
    private readonly overlay: Overlay,
    private readonly handlers: GizmoHandlers,
  ) {
    this.proxy.name = 'traintrack-editor:gizmo-proxy';
    this.overlay.scene.add(this.proxy);

    this.controls = new TransformControls(this.overlay.camera, this.overlay.canvas);
    this.controls.setMode('translate');
    this.controls.setSpace('world');
    this.controls.setTranslationSnap(null);
    this.controls.size = 0.9;

    this.controls.addEventListener('objectChange', () => {
      if (this.suppress || !this.attached) return;
      this.handlers.onDrag(threeToGame(this.proxy.position));
    });
    this.controls.addEventListener('mouseDown', () => this.handlers.onDragStart());
    this.controls.addEventListener('mouseUp', () => this.handlers.onDragEnd());

    this.overlay.scene.add(this.controls.getHelper());
    this.setVisible(false);
  }

  /** True while the user is actually dragging an axis, so clicks can be ignored. */
  get dragging(): boolean {
    return this.controls.dragging;
  }

  /**
   * True when the pointer is over a gizmo axis. A click there must not fall
   * through to node picking, or selecting a node and then grabbing its gizmo
   * would immediately reselect whatever is behind the arrow.
   */
  get engaged(): boolean {
    return this.controls.axis !== null;
  }

  attach(position: Vec3): void {
    this.suppress = true;
    gameToThreeInto(position, this.proxy.position);
    this.suppress = false;
    if (!this.attached) {
      this.controls.attach(this.proxy);
      this.attached = true;
    }
    this.setVisible(true);
  }

  detach(): void {
    if (this.attached) {
      this.controls.detach();
      this.attached = false;
    }
    this.setVisible(false);
  }

  /** Re-seat the proxy after an external model change (undo, numeric entry). */
  sync(position: Vec3): void {
    if (!this.attached || this.controls.dragging) return;
    this.suppress = true;
    gameToThreeInto(position, this.proxy.position);
    this.suppress = false;
  }

  setSnap(snap: TranslationSnap): void {
    this.controls.setTranslationSnap(snap);
  }

  private setVisible(visible: boolean): void {
    this.controls.enabled = visible;
    this.controls.getHelper().visible = visible;
  }

  dispose(): void {
    this.detach();
    this.controls.getHelper().removeFromParent();
    this.controls.dispose();
    this.proxy.removeFromParent();
  }
}
