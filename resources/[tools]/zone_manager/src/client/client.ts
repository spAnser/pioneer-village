import { FreeCamera, MoveKey } from './camera';
import { buildExport } from './export';
import { MarkerRenderer } from './markers';
import { onNuiCallback, sendToUI } from './nui-bridge';
import { PointStore } from './point-store';
import { raycastFromCursor, raycastGroundZ, round2, worldToScreen } from './raycast';
import { ScreenSmoother } from './screen-smoother';

let menuOpen = false;
let selectedIndex: number | null = null;
let lastCursorHit: ZoneManagerNew.Point | null = null;
// True while the user is right/middle-click-dragging to free-look. The
// cursor raycast target is meaningless while the camera itself is actively
// rotating — the cyan sphere should only track where a STATIC camera is
// aiming, not chase a moving one, which is what produced the jumpy/snapping
// sphere while flying around (compounded by the raycast direction itself
// depending on camera rotation, so mid-rotation hits are inherently noisy).
let cameraRotating = false;

// When enabled, any point whose X/Y changes (placement, plane drag, direct
// position edit) has its Z snapped to whatever world surface a straight-down
// raycast finds at that X/Y, rather than keeping the caller-supplied Z.
let snapToGround = false;

function applyGroundSnap(point: ZoneManagerNew.Point): ZoneManagerNew.Point {
  if (!snapToGround) return point;
  const { hit, z } = raycastGroundZ(point.x, point.y, point.z, 1);
  return hit ? { ...point, z } : point;
}

const camera = new FreeCamera();
const points = new PointStore(() => {
  sendToUI({ action: 'points_updated', points: points.getPoints() });
});
const markers = new MarkerRenderer({
  points: () => points.getPoints(),
  selectedIndex: () => selectedIndex,
  cursorHit: () => lastCursorHit,
});

function toPoint(v: Vector3Format): ZoneManagerNew.Point {
  return { x: v.x, y: v.y, z: v.z };
}

function addPointAtCursor(): boolean {
  const { hit, coords } = raycastFromCursor(camera.getCoord(), camera.getRot(), 1);
  if (hit) {
    points.add(applyGroundSnap(toPoint(coords)));
  }
  return hit;
}

function closeUI(): void {
  menuOpen = false;
  selectedIndex = null;
  SetNuiFocus(false, false);
  camera.destroy();
  markers.stop();
  points.reset();
  sendToUI({ action: 'hide' });
}

on('onResourceStop', (resourceName: string) => {
  if (GetCurrentResourceName() !== resourceName) return;
  closeUI();
  clearTick(cursorFeedTick);
  clearTick(frameFeedTick);
});

RegisterCommand(
  'zone_manager',
  () => {
    if (menuOpen) return;

    const playerZ = GetEntityCoords(PlayerPedId(), false)[2];
    points.seedBoundsFromZ(playerZ);

    camera.create();
    menuOpen = true;
    selectedIndex = null;
    SetNuiFocus(true, true);
    markers.start();

    const bounds = points.getBounds();
    sendToUI({ action: 'show', points: points.getPoints(), minZ: bounds.minZ, maxZ: bounds.maxZ, snapToGround });
  },
  false,
);

onNuiCallback('set_snap_to_ground', (data: ZoneManagerNew.SetSnapToGroundPayload) => {
  snapToGround = data.enabled;
});

onNuiCallback('close_ui', () => {
  closeUI();
});

onNuiCallback('place_point_key', (): ZoneManagerNew.PlacePointResult => {
  const ok = addPointAtCursor();
  return { ok };
});

onNuiCallback('select_point', (data: { index: number | null }) => {
  selectedIndex = data.index;
});

onNuiCallback('set_point_position', (data: ZoneManagerNew.SetPointPositionPayload) => {
  points.setPosition(data.index, applyGroundSnap({ x: data.x, y: data.y, z: data.z }));
});

// Gizmo drag: NUI does 2D hit-testing/handle rendering only (per the review's
// recommendation) and reports which axis is being dragged plus a scalar
// distance-along-that-axis; the actual world-space translation is computed
// here, once, using the real (unprojected) world axis direction.
onNuiCallback('drag_point_axis', (data: { index: number; axis: ZoneManagerNew.Axis; delta: number }): ZoneManagerNew.PointsResult => {
  const p = points.getPoints()[data.index];
  if (p) {
    const next = { ...p };
    next[data.axis] = p[data.axis] + data.delta;
    // Dragging the Z handle itself is an explicit manual override — ground
    // snap only reacts to X/Y moving, so it must not immediately fight it.
    points.setPosition(data.index, data.axis === 'z' ? next : applyGroundSnap(next));
  }
  return { points: points.getPoints() };
});

// Flat plane drag: same split as drag_point_axis — the NUI reports raw
// world-space deltas along X and Y (calibrated from the plane handle's own
// screen-space offset from origin, same technique as the axis handles), and
// both are applied together here so the point moves freely across the
// ground plane in one continuous motion instead of one axis at a time.
onNuiCallback('drag_point_plane', (data: ZoneManagerNew.DragPointPlanePayload): ZoneManagerNew.PointsResult => {
  const p = points.getPoints()[data.index];
  if (p) {
    points.setPosition(data.index, applyGroundSnap({ x: p.x + data.deltaX, y: p.y + data.deltaY, z: p.z }));
  }
  return { points: points.getPoints() };
});

onNuiCallback('undo_point', (): ZoneManagerNew.PointsResult => {
  points.undo();
  if (selectedIndex !== null && selectedIndex >= points.getPoints().length) selectedIndex = null;
  return { points: points.getPoints() };
});

onNuiCallback('clear_points', (): ZoneManagerNew.PointsResult => {
  points.clear();
  selectedIndex = null;
  return { points: points.getPoints() };
});

onNuiCallback('delete_point', (data: ZoneManagerNew.DeletePointPayload): ZoneManagerNew.PointsResult => {
  points.delete(data.index);
  if (selectedIndex === data.index) selectedIndex = null;
  else if (selectedIndex !== null && selectedIndex > data.index) selectedIndex -= 1;
  return { points: points.getPoints() };
});

onNuiCallback('reorder_point', (data: ZoneManagerNew.ReorderPointPayload): ZoneManagerNew.PointsResult => {
  points.reorder(data.fromIndex, data.toIndex);
  // Keep the selection following the moved point, and shift anything that
  // sat between the old/new slot the same way splice() just shifted it —
  // same "selection tracks the underlying data" contract as delete_point.
  if (selectedIndex === data.fromIndex) {
    selectedIndex = data.toIndex;
  } else if (selectedIndex !== null) {
    if (data.fromIndex < selectedIndex && selectedIndex <= data.toIndex) selectedIndex -= 1;
    else if (data.toIndex <= selectedIndex && selectedIndex < data.fromIndex) selectedIndex += 1;
  }
  return { points: points.getPoints() };
});

onNuiCallback('set_bounds', (data: ZoneManagerNew.SetBoundsPayload) => {
  points.setBounds(data.minZ, data.maxZ);
  return points.getBounds();
});

onNuiCallback('get_export', (): ZoneManagerNew.ExportResult => {
  const bounds = points.getBounds();
  return buildExport(points.getPoints(), bounds.minZ, bounds.maxZ);
});

onNuiCallback('rotate_camera', (data: ZoneManagerNew.RotateCameraPayload) => {
  // Queues rather than applies immediately — actually applied once per
  // frame from the camera's own move tick, the same mechanism WASD already
  // uses, instead of a discrete SetCamRot per NUI callback (see queueRotate
  // in camera.ts for why).
  camera.queueRotate(data.x, data.y);
});

onNuiCallback('set_camera_rotating', (data: ZoneManagerNew.SetCameraRotatingPayload) => {
  cameraRotating = data.rotating;
  if (cameraRotating) {
    // Clear immediately rather than waiting for the throttled cursor tick to
    // notice — hides the cyan sphere/HUD readout the instant rotation
    // starts, not up to CURSOR_FEED_INTERVAL_MS later.
    lastCursorHit = null;
    sendToUI({ action: 'cursor_updated', cursor: null });
  }
});

onNuiCallback('move_camera', (data: { x: number; y: number; z: number }) => {
  camera.moveTo(data);
});

onNuiCallback('move_input', (data: ZoneManagerNew.MoveInputPayload) => {
  camera.setMoveKey(data.key as MoveKey, data.pressed);
});

// Live cursor world-hit feed, throttled to ~50ms. setTick fires every game
// frame with no built-in delay (unlike Lua's Wait(n)) — without an explicit
// time gate this was firing a full shape-test raycast plus a JSON-serialized
// SendNuiMessage on every single frame, which is what caused the 275-586ms
// resource CPU time and client freeze.
const CURSOR_FEED_INTERVAL_MS = 50;
let lastCursorFeedAt = 0;

const cursorFeedTick = setTick(() => {
  if (!menuOpen || cameraRotating) return;
  const now = GetGameTimer();
  if (now - lastCursorFeedAt < CURSOR_FEED_INTERVAL_MS) return;
  lastCursorFeedAt = now;

  const { hit, coords } = raycastFromCursor(camera.getCoord(), camera.getRot(), 1);
  lastCursorHit = hit ? toPoint(coords) : null;
  sendToUI({ action: 'cursor_updated', cursor: lastCursorHit });
});

// Screen-projection feed: every point's marker position, plus (only for the
// selected point) the 3 short world-axis offset endpoints the NUI needs to
// draw/hit-test the gizmo. Replaces the old Three.js camera-sync thread
// entirely, but still needs an explicit time gate — up to 4 native
// GetScreenCoordFromWorldCoord calls per point plus a SendNuiMessage, run
// with no delay, was a second source of the runaway per-frame cost. ~33ms
// (~30Hz) keeps markers/gizmo visually smooth without the every-frame cost.
// 3x the original 0.5 — the old length made handles hard to see/click,
// especially at a distance from the camera. Now used as the calibration
// point for computeHandleLength's distance scaling below: at
// MIN_GIZMO_SCALE_DISTANCE the world length is exactly this value, and it
// scales proportionally with distance in both directions from there so the
// ON-SCREEN size stays roughly constant instead of ballooning up close or
// shrinking to a sliver far away.
const AXIS_HANDLE_LENGTH = 1.5;
const MIN_GIZMO_SCALE_DISTANCE = 5;
// World length floor/ceiling — without these, a camera clipped right up
// against the point (near-zero distance) would collapse the handles to
// nothing, and extreme range would grow them large enough to overlap
// neighboring points.
const MIN_GIZMO_HANDLE_LENGTH = 0.5;
const MAX_GIZMO_HANDLE_LENGTH = 12;

function computeHandleLength(camPos: Vector3Format, point: Vector3Format): number {
  const dx = point.x - camPos.x;
  const dy = point.y - camPos.y;
  const dz = point.z - camPos.z;
  const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
  const scale = distance / MIN_GIZMO_SCALE_DISTANCE;
  return Math.min(Math.max(AXIS_HANDLE_LENGTH * scale, MIN_GIZMO_HANDLE_LENGTH), MAX_GIZMO_HANDLE_LENGTH);
}
// Where along the X/Y arms the flat plane-drag square sits, as a fraction of
// AXIS_HANDLE_LENGTH — inset from the arm tips so it reads as a distinct
// "square between the two arms" rather than overlapping either handle.
const PLANE_HANDLE_FRACTION = 0.4;
const FRAME_FEED_INTERVAL_MS = 33;
let lastFrameFeedAt = 0;

// Hysteresis-smooths marker/gizmo screen positions against per-frame camera
// projection noise (see screen-smoother.ts) — NOT applied to the cursor-
// follow raycast (that's a native world-space marker, unrelated to this
// feed, and should track the cursor immediately/live rather than being
// smoothed like a "should be stable" point marker).
const screenSmoother = new ScreenSmoother();

const frameFeedTick = setTick(() => {
  if (!menuOpen) return;
  const now = GetGameTimer();
  if (now - lastFrameFeedAt < FRAME_FEED_INTERVAL_MS) return;
  lastFrameFeedAt = now;

  const activeKeys = new Set<string>();
  const pointScreens: ZoneManagerNew.PointScreenEntry[] = [];
  points.getPoints().forEach((p, index) => {
    const screen = worldToScreen(p);
    if (screen) {
      const key = `marker:${index}`;
      activeKeys.add(key);
      pointScreens.push({ index, pos: screenSmoother.smooth(key, screen) });
    }
  });

  let selectedGizmo: ZoneManagerNew.GizmoScreenPositions | null = null;
  if (selectedIndex !== null && points.getPoints()[selectedIndex]) {
    const p = points.getPoints()[selectedIndex];
    const handleLength = computeHandleLength(camera.getCoord(), p);
    const origin = worldToScreen(p);
    const xEnd = worldToScreen({ x: p.x + handleLength, y: p.y, z: p.z });
    const yEnd = worldToScreen({ x: p.x, y: p.y + handleLength, z: p.z });
    const zEnd = worldToScreen({ x: p.x, y: p.y, z: p.z + handleLength });
    const planeOffset = handleLength * PLANE_HANDLE_FRACTION;
    const planePos = worldToScreen({ x: p.x + planeOffset, y: p.y + planeOffset, z: p.z });
    if (origin && xEnd && yEnd && zEnd && planePos) {
      activeKeys.add('gizmo:origin').add('gizmo:x').add('gizmo:y').add('gizmo:z').add('gizmo:plane');
      selectedGizmo = {
        origin: screenSmoother.smooth('gizmo:origin', origin),
        x: screenSmoother.smooth('gizmo:x', xEnd),
        y: screenSmoother.smooth('gizmo:y', yEnd),
        z: screenSmoother.smooth('gizmo:z', zEnd),
        plane: screenSmoother.smooth('gizmo:plane', planePos),
        handleLength,
      };
    }
  }

  screenSmoother.prune(activeKeys);
  sendToUI({ action: 'frame_updated', pointScreens, selectedGizmo });
});
