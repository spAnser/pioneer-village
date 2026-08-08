import { ScreenPoint } from './raycast';

// GetScreenCoordFromWorldCoord carries tiny per-frame floating point noise
// from the camera's own position/rotation, even when the camera and the
// world point are both completely stationary — visible as markers/gizmo
// handles vibrating in place. A fixed-grid rounding of each frame's raw
// value (tried first) reduces the noise amplitude but doesn't eliminate it:
// whenever the true value sits near a grid boundary, it still flickers
// between the two adjacent rounded values every frame. Hysteresis avoids
// that: a new raw value only replaces the displayed one once it has moved
// far enough from the LAST DISPLAYED value, not from a fixed grid — so
// there's no boundary to straddle, and genuine camera/point movement above
// the threshold still tracks immediately and smoothly.
const DEADZONE = 0.0015; // ~1.5px of movement at common resolutions, normalized (-1..1) units

export class ScreenSmoother {
  private lastByKey = new Map<string, ScreenPoint>();

  smooth(key: string, raw: ScreenPoint): ScreenPoint {
    const last = this.lastByKey.get(key);
    if (!last) {
      this.lastByKey.set(key, raw);
      return raw;
    }
    const dx = raw.x - last.x;
    const dy = raw.y - last.y;
    if (Math.hypot(dx, dy) < DEADZONE) {
      return last;
    }
    this.lastByKey.set(key, raw);
    return raw;
  }

  // Drop entries for keys that are no longer in use (deleted points, or the
  // gizmo when nothing is selected) so this doesn't grow unbounded over a
  // long editing session.
  prune(activeKeys: Set<string>): void {
    for (const key of this.lastByKey.keys()) {
      if (!activeKeys.has(key)) this.lastByKey.delete(key);
    }
  }
}
