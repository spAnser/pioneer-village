import { FreeCamera } from '@lib/client/free-camera';
import { DrawMarkerSphere } from '@lib/client/functions';
import { raycastFromCursor, raycastGroundZ } from '@lib/client/screen-world';

import { onNuiCallback, sendToUI } from './nui-bridge';
import { loadTracks } from './track-data';

/**
 * Client half of the traintrack editor.
 *
 * It owns exactly two things: the fly camera, and the world (shape tests). The
 * track model itself lives in the NUI, because that is where the three.js scene
 * needs it -- see src/types.d.ts for why that split is what keeps this cheap.
 */

// Walk speed is noclip's default; sprint takes its alt tier rather than its
// shift tier, because trains1 is a 15km loop and the flight between two ends of
// it should not be the slow part.
const camera = new FreeCamera({ sprintSpeed: 5.0 });

/**
 * In-world marker for whatever the gizmo is on, pushed over from the NUI.
 *
 * The scale is small on purpose. This ball exists to be OCCLUDED -- it is the
 * only part of the editor the world can hide, which is how you tell a node
 * sitting on the rail bed from one buried in the embankment beside it. A large
 * marker pokes out of whatever it is inside and loses exactly that signal.
 */
const SELECTION_MARKER_SCALE = 0.25;
// 0xffd24a, the overlay's "selected" colour, so the in-world ball and the
// highlighted track line are visibly the same idea.
const SELECTION_MARKER_COLOR = [255, 210, 74, 220] as const;

let selectionMarker: TraintrackEditor.Vec3 | null = null;
let menuOpen = false;
// The cursor raycast target is meaningless while the camera is rotating: the
// ray direction depends on camera rotation, so mid-rotation hits are noise, and
// the marker chases a moving camera instead of showing where a static one aims.
let cameraRotating = false;

function closeUI(): void {
  if (!menuOpen) return;
  menuOpen = false;
  cameraRotating = false;
  selectionMarker = null;
  SetNuiFocus(false, false);
  camera.destroy();
  sendToUI({ action: 'hide' });
}

RegisterCommand(
  'traintrack_editor',
  () => {
    if (menuOpen) return;

    const { tracks, failures } = loadTracks();
    for (const failure of failures) console.log(`[traintrack-editor] ${failure}`);
    if (!tracks.length) {
      console.log('[traintrack-editor] no tracks loaded, refusing to open');
      return;
    }

    camera.create();
    menuOpen = true;
    SetNuiFocus(true, true);
    sendToUI({ action: 'show', tracks, failures });
  },
  false,
);

on('onResourceStop', (resourceName: string) => {
  if (GetCurrentResourceName() !== resourceName) return;
  closeUI();
  // Unconditional, and separate from closeUI's menuOpen guard: a hot reload
  // that catches the tool in any unexpected state must still hand the player
  // back an unfrozen, visible ped with the scripted camera torn down. destroy()
  // is a no-op when there was no camera.
  camera.destroy();
  clearTick(frameFeedTick);
  clearTick(cursorFeedTick);
  clearTick(selectionMarkerTick);
});

onNuiCallback('close_ui', () => {
  closeUI();
});

onNuiCallback('move_input', (data: TraintrackEditor.MoveInputPayload) => {
  camera.setMoveKey(data.key, data.pressed);
});

onNuiCallback('rotate_camera', (data: TraintrackEditor.RotateCameraPayload) => {
  camera.queueRotate(data.dx, data.dy);
});

onNuiCallback('set_camera_rotating', (data: { rotating: boolean }) => {
  cameraRotating = data.rotating;
});

onNuiCallback('move_camera', (data: TraintrackEditor.MoveCameraPayload) => {
  camera.moveTo(data);
});

onNuiCallback('selection_marker', (data: TraintrackEditor.SelectionMarkerPayload) => {
  selectionMarker = data.position;
});

onNuiCallback(
  'snap_ground',
  (data: TraintrackEditor.GroundSnapPayload): TraintrackEditor.GroundSnapResult =>
    // 1 = world geometry (ground / walls / rocks), which is what rail sits on.
    raycastGroundZ(data.x, data.y, data.z, 1),
);

/**
 * Camera feed. Unlike object_manager and zone_manager this runs every frame
 * with no time gate, and that is affordable rather than sloppy: the payload is
 * a fixed seven numbers and two native reads, independent of how many nodes are
 * on screen. Those tools had to gate because their per-frame cost scaled with
 * the scene -- object_manager serialised an entity transform at 100Hz,
 * zone_manager made up to four GetScreenCoordFromWorldCoord calls per point.
 * Nothing here scales with the track, and gating the camera would show up
 * directly as the overlay lagging behind the game render.
 */
const frameFeedTick = setTick(() => {
  if (!menuOpen) return;
  sendToUI({
    action: 'frame',
    cam: { position: camera.getCoord(), rotation: camera.getRot(), fov: camera.getFov() },
  });
});

// Cursor world-hit feed, for placing a node on the ground. Throttled, because
// this one DOES cost a shape test per tick.
const CURSOR_FEED_INTERVAL_MS = 50;
let lastCursorFeedAt = 0;

const cursorFeedTick = setTick(() => {
  if (!menuOpen || cameraRotating) return;
  const now = GetGameTimer();
  if (now - lastCursorFeedAt < CURSOR_FEED_INTERVAL_MS) return;
  lastCursorFeedAt = now;

  const { hit, coords } = raycastFromCursor(camera.getCoord(), camera.getRot(), 1);
  sendToUI({ action: 'cursor', hit: hit ? coords : null });
});

/**
 * The one piece of the editor's visuals the game draws rather than the overlay.
 *
 * Kept as its own tick rather than folded into the camera feed: an uncaught
 * error inside a FiveM tick kills that thread permanently, and the camera feed
 * going down would freeze the whole overlay in place. Same reasoning as
 * zone_manager's separate points/cursor threads.
 */
const selectionMarkerTick = setTick(() => {
  if (!menuOpen || !selectionMarker) return;
  const [r, g, b, a] = SELECTION_MARKER_COLOR;
  DrawMarkerSphere(
    selectionMarker[0],
    selectionMarker[1],
    selectionMarker[2],
    SELECTION_MARKER_SCALE,
    r,
    g,
    b,
    a,
  );
});
