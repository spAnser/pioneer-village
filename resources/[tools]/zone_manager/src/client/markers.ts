// Native marker drawing. Kept as independent threads, same as the old tool:
// an uncaught error inside one draw call permanently kills that FiveM
// thread, so points/cursor-marker must not share a thread with each other.
//
// Point-index labels are NOT drawn here with native text commands
// (SetTextFont/BeginTextCommandDisplayText/etc.) — those natives are dead/
// no-op in RDR3 since build 1436 (confirmed via a comment on the equivalent
// SetTextColor native in the rdr3-shared native shim; RDR3 replaced this
// whole API with a different _BG_-prefixed "big text"/UI-feed system). The
// old Lua tool called these same natives, but Lua silently no-ops calls to
// natives it can't resolve rather than throwing, so the label simply never
// rendered there — porting it to JS surfaced a hard ReferenceError instead
// (JS throws on a truly undefined global). The point index is already shown
// inside each point's 2D marker div in the NUI (see PointMarkers component),
// so the native label was redundant even before this was noticed.

function drawMarkerSphere(x: number, y: number, z: number, radius: number, r: number, g: number, b: number, a: number): void {
  DrawMarker(0x50638ab9, x, y, z, 0, 0, 0, 0, 0, 0, radius, radius, radius, r, g, b, a, false, false, 0, false, null, null, false);
}

export class MarkerRenderer {
  private active = false;
  private tickHandles: number[] = [];
  private points: () => ZoneManagerNew.Point[];
  private selectedIndex: () => number | null;
  private cursorHit: () => ZoneManagerNew.Point | null;

  constructor(deps: { points: () => ZoneManagerNew.Point[]; selectedIndex: () => number | null; cursorHit: () => ZoneManagerNew.Point | null }) {
    this.points = deps.points;
    this.selectedIndex = deps.selectedIndex;
    this.cursorHit = deps.cursorHit;
  }

  start(): void {
    if (this.active) return;
    this.active = true;
    this.tickHandles = [this.startPointsThread(), this.startCursorThread()];
  }

  // Actually deregisters the tick handlers (clearTick), matching this repo's
  // convention elsewhere (see resources/game/src/client/client.ts) — merely
  // gating on a boolean flag inside the callback still leaves the handler
  // running forever, every frame, for the lifetime of the resource. Called
  // from client.ts's onResourceStop as well as on every tool close, so
  // handles never accumulate across repeated open/close cycles or resource
  // restarts during dev iteration.
  stop(): void {
    this.active = false;
    this.tickHandles.forEach((handle) => clearTick(handle));
    this.tickHandles = [];
  }

  private startPointsThread(): number {
    return setTick(() => {
      if (!this.active) return;
      const selected = this.selectedIndex();
      this.points().forEach((p, i) => {
        if (typeof p.x === 'number' && typeof p.y === 'number' && typeof p.z === 'number') {
          if (selected === i) {
            drawMarkerSphere(p.x, p.y, p.z, 0.4, 80, 180, 255, 230);
          } else {
            drawMarkerSphere(p.x, p.y, p.z, 0.3, 255, 255, 0, 200);
          }
        }
      });
    });
  }

  private startCursorThread(): number {
    return setTick(() => {
      if (!this.active) return;
      const hit = this.cursorHit();
      if (hit) {
        drawMarkerSphere(hit.x, hit.y, hit.z, 0.2, 0, 220, 255, 220);
      }
    });
  }
}
