// Ported 1:1 from the old zone_manager's cl_main.lua screen<->world math.
// This logic is proven in production; only the language changed.

export interface ScreenPoint {
  x: number;
  y: number;
}

export function round2(n: number): number {
  return Math.floor(n * 100 + 0.5) / 100;
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

// Raw projection, unrounded — used internally by screenToWorld's calibration
// math (scaleX/scaleY are a DIVISION by the difference of two of these
// points; rounding the inputs there corrupts the result, especially at long
// range where a small denominator gets divided into a large one, which is
// what caused the cursor-follow marker to visibly jump/snap at distance
// after an earlier attempt at rounding this function directly). Anything
// that only needs a screen position for DISPLAY (markers, gizmo handles)
// should use worldToScreen below instead, which rounds for visual stability.
function worldToScreenRaw(position: Vector3Format): ScreenPoint | null {
  const [onScreen, x, y] = GetScreenCoordFromWorldCoord(position.x, position.y, position.z);
  if (!onScreen) return null;
  return { x: (x - 0.5) * 2, y: (y - 0.5) * 2 };
}

// Unrounded, for callers doing further math (screenToWorld's calibration —
// see worldToScreenRaw above for why rounding there corrupts the result).
export function worldToScreen(position: Vector3Format): ScreenPoint | null {
  return worldToScreenRaw(position);
}

export function processCoordinates(x: number, y: number): ScreenPoint {
  const [screenX, screenY] = GetCurrentScreenResolution();

  let relativeX = 1 - (x / screenX) * 1.0 * 2;
  let relativeY = 1 - (y / screenY) * 1.0 * 2;

  relativeX = relativeX > 0.0 ? -relativeX : Math.abs(relativeX);
  relativeY = relativeY > 0.0 ? -relativeY : Math.abs(relativeY);

  return { x: relativeX, y: relativeY };
}

export function screenToWorld(camPos: Vector3Format, camRot: Vector3Format, relX: number, relY: number): Vector3Format {
  const camForward = rotationToDirection(camRot);
  const camRight = vSub(rotationToDirection(vAdd(camRot, { x: 0, y: 0, z: 10 })), rotationToDirection(vAdd(camRot, { x: 0, y: 0, z: -10 })));
  const camUp = vSub(rotationToDirection(vAdd(camRot, { x: 10, y: 0, z: 0 })), rotationToDirection(vAdd(camRot, { x: -10, y: 0, z: 0 })));

  const rollRad = (-camRot.y * Math.PI) / 180;
  const camRightRoll = vSub(vScale(camRight, Math.cos(rollRad)), vScale(camUp, Math.sin(rollRad)));
  const camUpRoll = vAdd(vScale(camRight, Math.sin(rollRad)), vScale(camUp, Math.cos(rollRad)));

  const point3DZero = vAdd(camPos, vScale(camForward, 10.0));
  const point2DZero = worldToScreenRaw(point3DZero);
  if (point2DZero === null) return point3DZero;

  const point3D = vAdd(vAdd(camPos, vScale(camForward, 10.0)), vAdd(camRightRoll, camUpRoll));
  const point2D = worldToScreenRaw(point3D);
  if (point2D === null) return point3DZero;

  const eps = 0.001;
  if (Math.abs(point2D.x - point2DZero.x) < eps || Math.abs(point2D.y - point2DZero.y) < eps) {
    return point3DZero;
  }

  const scaleX = (relX - point2DZero.x) / (point2D.x - point2DZero.x);
  const scaleY = (relY - point2DZero.y) / (point2D.y - point2DZero.y);

  return vAdd(vAdd(camPos, vScale(camForward, 10.0)), vAdd(vScale(camRightRoll, scaleX), vScale(camUpRoll, scaleY)));
}

// Straight-down ray through the given X/Y, used to snap a point's Z to
// whatever world surface (ground/building/rock) sits near it — same
// shape-test flag convention (1 = World) as raycastFromCursor. Ranges
// +/-150 around the point's current Z rather than a fixed world-absolute
// span: raycastFromCursor's proven working ray is only ~300 units long
// end-to-end, and a much longer ray here was found to break the shape test
// (silently, no error, but the result was never usable).
export function raycastGroundZ(x: number, y: number, currentZ: number, flags: number): { hit: boolean; z: number } {
  const from = { x, y, z: currentZ + 150.0 };
  const to = { x, y, z: currentZ - 150.0 };
  const ray = StartShapeTestRay(from.x, from.y, from.z, to.x, to.y, to.z, flags, 0, 0);
  const [, hit, endCoords] = GetShapeTestResult(ray);
  return { hit, z: endCoords[2] };
}

// 1 World - Ground / Walls / Rocks
export function raycastFromCursor(camPos: Vector3Format, camRot: Vector3Format, flags: number): { hit: boolean; coords: Vector3Format } {
  const [x, y] = GetNuiCursorPosition();
  const processed = processCoordinates(x, y);
  const target = screenToWorld(camPos, camRot, processed.x, processed.y);

  const dir = vSub(target, camPos);
  const from = vAdd(camPos, vScale(dir, 0.05));
  const to = vAdd(camPos, vScale(dir, 300));

  const ray = StartShapeTestRay(from.x, from.y, from.z, to.x, to.y, to.z, flags, 0, 0);
  const [, hit, endCoords] = GetShapeTestResult(ray);
  // GetShapeTestResult's coords come back as number[], not {x,y,z} — this was
  // previously hidden behind an `as unknown as Vector3Format` cast, the same
  // class of bug as the camera coord/rot natives (see camera.ts's toVector3).
  return { hit, coords: { x: endCoords[0], y: endCoords[1], z: endCoords[2] } };
}
