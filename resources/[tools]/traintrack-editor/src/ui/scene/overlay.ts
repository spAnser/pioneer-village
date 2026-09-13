import * as THREE from 'three';

import type { Vec3 } from '../model/track';

/**
 * The transparent WebGL layer that sits over the game, with a camera slaved to
 * the game camera.
 *
 * This is the one idea worth keeping from object_manager: because the three.js
 * camera mirrors the game camera exactly -- position, orientation and vertical
 * FOV -- anything added to this scene lands in the right place in world space,
 * with correct perspective, and depth-sorts against the rest of the overlay.
 * That is what makes drawing curves possible at all. DrawLine can only do
 * straight segments and falls over well before a few thousand of them;
 * zone_manager's alternative (project a few world points per frame with
 * GetScreenCoordFromWorldCoord and draw SVG) is fine for three gizmo arms but
 * would need a native call per vertex per frame here.
 *
 * The overlay cannot be occluded by world geometry -- three.js has no access to
 * the game's depth buffer -- so track lines always draw on top. For a track
 * editor that is the behaviour you want: rail is usually in a cutting or behind
 * a hill exactly when you need to see it.
 */

/**
 * Game coordinates are Z-up (X east, Y north, Z up); three.js is Y-up. The
 * mapping is a basis swap, not a rotation:
 *
 *   three.x =  game.x        game.x =  three.x
 *   three.y =  game.z        game.y = -three.z
 *   three.z = -game.y        game.z =  three.y
 */
export function gameToThree(p: Vec3): THREE.Vector3 {
  return new THREE.Vector3(p[0], p[2], -p[1]);
}

export function gameToThreeInto(p: Vec3, target: THREE.Vector3): THREE.Vector3 {
  return target.set(p[0], p[2], -p[1]);
}

export function threeToGame(v: THREE.Vector3): Vec3 {
  return [v.x, -v.z, v.y];
}

const NEAR = 0.5;
// Far enough to see a whole rail loop from altitude. Nothing but our own lines
// is in the scene, so the near/far ratio costs no depth precision that matters.
const FAR = 20000;

export class Overlay {
  readonly scene = new THREE.Scene();
  readonly camera = new THREE.PerspectiveCamera(50, 1, NEAR, FAR);
  readonly renderer: THREE.WebGLRenderer;
  readonly canvas: HTMLCanvasElement;

  private onResize = (): void => this.resize();

  constructor() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.canvas = this.renderer.domElement;
    this.canvas.className = 'overlay-canvas';

    /**
     * Yaw about the world up axis, then pitch, then roll -- the FPS camera
     * convention. three applies an Euler in the named order as intrinsic
     * rotations, so 'YXZ' builds Ry * Rx * Rz, which is what puts yaw on the
     * world axis and pitch on the already-yawed right axis.
     *
     * object_manager uses 'YZX' here, which is the correct order for the OBJECT
     * it also drives with this code but not for a camera.
     */
    this.camera.rotation.order = 'YXZ';

    window.addEventListener('resize', this.onResize);
    this.resize();
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.canvas);
  }

  dispose(): void {
    window.removeEventListener('resize', this.onResize);
    this.renderer.dispose();
    this.canvas.remove();
  }

  resize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  /**
   * Point the three.js camera exactly where the game camera is.
   *
   * Rotation maps term for term once the basis swap is applied: a game yaw of 0
   * looks along +Y (north), which is three's -Z, which is also three's default
   * camera forward -- so zero maps to zero and both yaw and pitch carry
   * straight across in radians.
   *
   * Roll is negated for the handedness flip. It is untested in practice because
   * FreeCamera pins roll to 0 on every frame; the term is here so a camera that
   * did bank would not silently render level.
   */
  syncCamera(cam: TraintrackEditor.CameraFrame): void {
    this.camera.position.set(cam.position.x, cam.position.z, -cam.position.y);
    this.camera.rotation.set(
      THREE.MathUtils.degToRad(cam.rotation.x),
      THREE.MathUtils.degToRad(cam.rotation.z),
      THREE.MathUtils.degToRad(-cam.rotation.y),
    );
    if (this.camera.fov !== cam.fov) {
      this.camera.fov = cam.fov;
      this.camera.updateProjectionMatrix();
    }
  }

  render(): void {
    this.renderer.render(this.scene, this.camera);
  }
}
