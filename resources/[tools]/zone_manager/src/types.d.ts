declare namespace ZoneManagerNew {
  interface Point {
    x: number;
    y: number;
    z: number;
  }

  interface ScreenPos {
    x: number;
    y: number;
  }

  // Screen-projected point marker plus the 3 short axis-offset endpoints used
  // to draw the gizmo, only computed for the currently selected point.
  // handleLength is the real world-unit distance the axis endpoints were
  // projected from (see client.ts's AXIS_HANDLE_LENGTH) — sent explicitly
  // rather than duplicated as a hardcoded constant in the NUI, so the two
  // sides can never drift out of sync (drag-delta math depends on this
  // matching exactly, or drag distances get silently miscalibrated).
  interface GizmoScreenPositions {
    origin: ScreenPos;
    x: ScreenPos;
    y: ScreenPos;
    z: ScreenPos;
    // Screen position of a point offset along BOTH world X and Y (a fraction
    // of handleLength on each) — used to draw/anchor the flat plane-drag
    // square, which moves the point freely along X and Y together instead
    // of being constrained to a single axis line.
    plane: ScreenPos;
    handleLength: number;
  }

  interface PointScreenEntry {
    index: number;
    pos: ScreenPos;
  }

  type Axis = 'x' | 'y' | 'z';

  // Client (Lua host) -> NUI messages, sent via SendNuiMessage.
  type HostMessage =
    | { action: 'show'; points: Point[]; minZ: number; maxZ: number; snapToGround: boolean }
    | { action: 'hide' }
    | { action: 'points_updated'; points: Point[] }
    | { action: 'cursor_updated'; cursor: Point | null }
    | {
        action: 'frame_updated';
        pointScreens: PointScreenEntry[];
        selectedGizmo: GizmoScreenPositions | null;
      };

  // NUI -> Client callback payloads, sent via fetch(`https://${resource}/<name>`).
  interface PlacePointResult {
    ok: boolean;
  }

  interface SetPointPositionPayload {
    index: number;
    x: number;
    y: number;
    z: number;
  }

  interface DeletePointPayload {
    index: number;
  }

  interface ReorderPointPayload {
    fromIndex: number;
    toIndex: number;
  }

  interface DragPointPlanePayload {
    index: number;
    deltaX: number;
    deltaY: number;
  }

  interface SetBoundsPayload {
    minZ: number;
    maxZ: number;
  }

  interface SetSnapToGroundPayload {
    enabled: boolean;
  }

  interface RotateCameraPayload {
    x: number;
    y: number;
  }

  interface SetCameraRotatingPayload {
    rotating: boolean;
  }

  interface MoveInputPayload {
    key: 'w' | 's' | 'a' | 'd' | 'q' | 'e' | 'sprint';
    pressed: boolean;
  }

  interface ExportResult {
    ts: string;
    lua: string;
    minZ: number;
    maxZ: number;
  }

  interface PointsResult {
    points: Point[];
  }
}
