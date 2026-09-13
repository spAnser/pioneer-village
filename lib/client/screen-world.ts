/**
 * Screen <-> world projection and shape-test helpers for free-camera dev tools.
 *
 * Extracted from zone_manager's client/raycast.ts, which was itself a 1:1 port
 * of the original object_manager cl_main.lua. The math is unchanged and proven
 * in production; only the packaging moved, so a second tool does not need a
 * second copy.
 */

export interface ScreenPoint {
  /** Normalised device coords, -1..1, origin at screen centre. */
  x: number;
  y: number;
}

export interface RaycastHit {
  hit: boolean;
  coords: Vector3Format;
}

/**
 * Screen size in pixels.
 *
 * Prefers GetCurrentScreenResolution, which reports the actual backbuffer size,
 * and falls back to GetScreenResolution. The fallback is not cosmetic: the
 * preferred native is declared in neither rdr3-shared's types nor
 * @citizenfx/client, and a native that does not resolve is a hard ReferenceError
 * in JS rather than the silent no-op Lua gives -- which would take the whole
 * per-frame tick down with it. Both callers here run every frame.
 */
export function screenResolution(): [number, number] {
  const globals = globalThis as { GetCurrentScreenResolution?: () => [number, number] };
  if (typeof globals.GetCurrentScreenResolution === 'function') {
    return globals.GetCurrentScreenResolution();
  }
  return GetScreenResolution();
}

export function rotationToDirection(rotation: Vector3Format): Vector3Format {
  const z = (rotation.z * Math.PI) / 180;
  const x = (rotation.x * Math.PI) / 180;
  const num = Math.abs(Math.cos(x));
  return {
    x: -Math.sin(z) * num,
    y: Math.cos(z) * num,
    z: Math.sin(x),
  };
}

function vAdd(a: Vector3Format, b: Vector3Format): Vector3Format {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

function vSub(a: Vector3Format, b: Vector3Format): Vector3Format {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function vScale(a: Vector3Format, s: number): Vector3Format {
  return { x: a.x * s, y: a.y * s, z: a.z * s };
}

/**
 * Project a world point to normalised screen coords, or null when it is behind
 * the camera / off screen.
 *
 * Deliberately unrounded. screenToWorld's calibration DIVIDES by the difference
 * of two of these, and rounding the inputs there corrupts the result -- at long
 * range a small denominator divided into a large one is what made an earlier
 * attempt's cursor marker visibly jump. Callers that only need a position for
 * DISPLAY should smooth it instead (see ScreenSmoother in the consuming tool).
 */
export function worldToScreen(position: Vector3Format): ScreenPoint | null {
  const [onScreen, x, y] = GetScreenCoordFromWorldCoord(position.x, position.y, position.z);
  if (!onScreen) return null;
  return { x: (x - 0.5) * 2, y: (y - 0.5) * 2 };
}

/** Absolute cursor pixels -> the normalised coords screenToWorld expects. */
export function processCoordinates(x: number, y: number): ScreenPoint {
  const [screenX, screenY] = screenResolution();

  let relativeX = 1 - (x / screenX) * 1.0 * 2;
  let relativeY = 1 - (y / screenY) * 1.0 * 2;

  relativeX = relativeX > 0.0 ? -relativeX : Math.abs(relativeX);
  relativeY = relativeY > 0.0 ? -relativeY : Math.abs(relativeY);

  return { x: relativeX, y: relativeY };
}

/**
 * Unproject a normalised screen point onto the plane 10 units in front of the
 * camera, by calibrating against two reference points whose screen positions
 * the engine will tell us. Returns the camera's forward point unchanged when
 * the calibration degenerates.
 */
export function screenToWorld(camPos: Vector3Format, camRot: Vector3Format, relX: number, relY: number): Vector3Format {
  const camForward = rotationToDirection(camRot);
  const camRight = vSub(
    rotationToDirection(vAdd(camRot, { x: 0, y: 0, z: 10 })),
    rotationToDirection(vAdd(camRot, { x: 0, y: 0, z: -10 })),
  );
  const camUp = vSub(
    rotationToDirection(vAdd(camRot, { x: 10, y: 0, z: 0 })),
    rotationToDirection(vAdd(camRot, { x: -10, y: 0, z: 0 })),
  );

  const rollRad = (-camRot.y * Math.PI) / 180;
  const camRightRoll = vSub(vScale(camRight, Math.cos(rollRad)), vScale(camUp, Math.sin(rollRad)));
  const camUpRoll = vAdd(vScale(camRight, Math.sin(rollRad)), vScale(camUp, Math.cos(rollRad)));

  const point3DZero = vAdd(camPos, vScale(camForward, 10.0));
  const point2DZero = worldToScreen(point3DZero);
  if (point2DZero === null) return point3DZero;

  const point3D = vAdd(point3DZero, vAdd(camRightRoll, camUpRoll));
  const point2D = worldToScreen(point3D);
  if (point2D === null) return point3DZero;

  const eps = 0.001;
  if (Math.abs(point2D.x - point2DZero.x) < eps || Math.abs(point2D.y - point2DZero.y) < eps) {
    return point3DZero;
  }

  const scaleX = (relX - point2DZero.x) / (point2D.x - point2DZero.x);
  const scaleY = (relY - point2DZero.y) / (point2D.y - point2DZero.y);

  return vAdd(point3DZero, vAdd(vScale(camRightRoll, scaleX), vScale(camUpRoll, scaleY)));
}

/**
 * Straight-down ray through the given X/Y, to snap a Z onto whatever surface
 * sits near it.
 *
 * Ranges +/-150 around the supplied Z rather than a fixed world-absolute span:
 * raycastFromCursor's proven working ray is only ~300 units end to end, and a
 * much longer ray here was found to break the shape test silently -- no error,
 * but the result was never usable.
 */
export function raycastGroundZ(x: number, y: number, currentZ: number, flags: number): { hit: boolean; z: number } {
  const ray = StartShapeTestRay(x, y, currentZ + 150.0, x, y, currentZ - 150.0, flags, 0, 0);
  const [, hit, endCoords] = GetShapeTestResult(ray);
  return { hit, z: endCoords[2] };
}

/**
 * Shape-test from the camera through the NUI cursor.
 *
 * `flags` is a bitmask of what the ray collides with:
 *   1 world (ground/walls/rocks)   2 vehicle    4 ped         8 entity
 *  16 items                       32 pickups   64 glass     128 water
 * 256 shrubs/bushes              512 road    1024 horse ped
 */
export function raycastFromCursor(
  camPos: Vector3Format,
  camRot: Vector3Format,
  flags: number,
  ignoreEntity = 0,
): RaycastHit {
  const [x, y] = GetNuiCursorPosition();
  const processed = processCoordinates(x, y);
  const target = screenToWorld(camPos, camRot, processed.x, processed.y);

  const dir = vSub(target, camPos);
  const from = vAdd(camPos, vScale(dir, 0.05));
  const to = vAdd(camPos, vScale(dir, 300));

  const ray = StartShapeTestRay(from.x, from.y, from.z, to.x, to.y, to.z, flags, ignoreEntity, 0);
  // GetShapeTestResult's coords come back as number[], not {x,y,z} -- the same
  // shape trap as the camera coord/rot natives (see free-camera.ts's toVector3).
  const [, hit, endCoords] = GetShapeTestResult(ray);
  return { hit, coords: { x: endCoords[0], y: endCoords[1], z: endCoords[2] } };
}
