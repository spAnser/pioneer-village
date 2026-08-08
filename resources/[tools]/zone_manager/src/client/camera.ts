import { rotationToDirection } from './raycast';

const CAM_SPEED = 0.15;
const CAM_SPEED_FAST = 0.6;

// One-shot "run this on the next game frame" — setTick has no built-in
// one-shot mode, so this registers, fires once, and immediately clears
// itself. Used as the yield-point equivalent of Lua's implicit
// Citizen.CreateThread frame boundary (see create() below).
function nextFrame(fn: () => void): void {
  const handle = setTick(() => {
    clearTick(handle);
    fn();
  });
}

// GetCamCoord/GetGameplayCamCoord/GetCamRot/GetGameplayCamRot all return
// plain number[] in the JS/TS native bindings, not {x,y,z} objects (unlike
// Lua, where they return a vector3 with named fields) — every .x/.y/.z
// access on a raw native return in this file was silently reading
// `undefined`, which is the actual root cause of the freeze/corruption:
// camera position and rotation were being set from NaN/undefined every time
// the tool opened. This converts once at the boundary so the rest of the
// file can keep using Vector3Format as originally intended.
function toVector3(arr: number[]): Vector3Format {
  return { x: arr[0], y: arr[1], z: arr[2] };
}

export type MoveKey = 'w' | 's' | 'a' | 'd' | 'q' | 'e' | 'sprint';

export class FreeCamera {
  private camera: number | false = false;
  private playerOriginalCoords: Vector3Format | false = false;
  private moveState: Record<MoveKey, boolean> = {
    w: false,
    s: false,
    a: false,
    d: false,
    q: false,
    e: false,
    sprint: false,
  };
  private moveTickHandle: number | false = false;

  // Locally-tracked pitch (x) and yaw (z) — the single source of truth for
  // where the camera is pointed, NOT re-derived from GetCamRot on every
  // call. Diagnostic logging confirmed the actual cause of the "jumping
  // while flying" stutter: NUI mousemove events are not frame-rate-limited,
  // so multiple rotate() calls can land within the same game frame; when
  // that happens, GetCamRot right after a same-frame SetCamRot sometimes
  // still returns the PRE-write value (the native hasn't caught up within
  // the frame), so the second call's read-modify-write silently overwrote
  // the first call's contribution instead of building on it — visible as
  // dropped/stuttering rotation, worse the more often two calls landed
  // together. Tracking rotation in JS means every call always builds on the
  // value this script actually last wrote, with no native round-trip in
  // between to go stale.
  private trackedRotX = 0;
  private trackedRotZ = 0;

  isActive(): boolean {
    return this.camera !== false && DoesCamExist(this.camera as number) && IsCamActive(this.camera as number);
  }

  getCoord(): Vector3Format {
    if (this.isActive()) return toVector3(GetCamCoord(this.camera as number));
    return toVector3(GetGameplayCamCoord());
  }

  getRot(): Vector3Format {
    if (this.isActive()) return { x: this.trackedRotX, y: 0, z: this.trackedRotZ };
    return toVector3(GetGameplayCamRot(0));
  }

  // Split across a frame boundary deliberately. The old Lua tool wrapped this
  // whole sequence in Citizen.CreateThread, which yields at native-call
  // boundaries as part of how FiveM's Lua coroutine scheduler runs scripts —
  // giving the engine a frame between CreateCamera registering the new camera
  // object and RenderScriptCams/SetCamActive acting on it. The TS port
  // originally ran all of this synchronously in one call stack with no yield
  // point at all, which reproduced a game-freeze-on-open symptom; nextFrame()
  // (a one-shot setTick that clears itself) is the equivalent yield here.
  create(): void {
    this.camera = CreateCamera(`DEFAULT_SCRIPTED_CAMERA`, false);
    if (!DoesCamExist(this.camera)) {
      this.camera = false;
      return;
    }

    nextFrame(() => {
      if (this.camera === false) return;
      const gameplayCoord = toVector3(GetGameplayCamCoord());
      const gameplayRot = toVector3(GetGameplayCamRot(0));
      SetCamCoord(this.camera, gameplayCoord.x, gameplayCoord.y, gameplayCoord.z);
      SetCamRot(this.camera, gameplayRot.x, gameplayRot.y, gameplayRot.z, 0);
      SetCamFov(this.camera, 70.0);
      this.trackedRotX = gameplayRot.x;
      this.trackedRotZ = gameplayRot.z;

      nextFrame(() => {
        if (this.camera === false) return;
        SetCamActive(this.camera, true);
        // RenderScriptCams takes 5 params in the JS/TS native bindings
        // (render, ease, easeTime, easeCoordsAnim, p4) — the old Lua tool
        // called it with only 3, which worked because Lua's native
        // marshalling fills missing trailing args with sensible defaults.
        // The JS bindings pass through exactly what's given (undefined for
        // the missing two), which reached the native as garbage and is the
        // actual cause of the game freeze on open — not a script-side loop
        // at all, an invalid native call.
        RenderScriptCams(true, true, 1000, false, false);

        const player = PlayerPedId();
        const coords = GetEntityCoords(player, false);
        this.playerOriginalCoords = { x: coords[0], y: coords[1], z: coords[2] - 1.0 };
        FreezeEntityPosition(player, true);
        SetEntityVisible(player, false, false);
        SetEntityCoords(player, gameplayCoord.x, gameplayCoord.y, gameplayCoord.z, false, false, false, false);

        this.startMoveThread();
      });
    });
  }

  destroy(): void {
    if (this.camera !== false && DoesCamExist(this.camera)) {
      RenderScriptCams(false, true, 1000, false, false);
      const cam = this.camera;
      setTimeout(() => {
        if (DoesCamExist(cam)) DestroyCam(cam, false);
      }, 250);
    }
    const player = PlayerPedId();
    if (!IsEntityVisible(player)) {
      FreezeEntityPosition(player, false);
      SetEntityVisible(player, true, false);
      if (this.playerOriginalCoords) {
        const p = this.playerOriginalCoords;
        SetEntityCoords(player, p.x, p.y, p.z, false, false, false, false);
      }
    }
    if (this.moveTickHandle !== false) {
      clearTick(this.moveTickHandle);
      this.moveTickHandle = false;
    }
    this.camera = false;
    this.playerOriginalCoords = false;
    this.pendingRotateDx = 0;
    this.pendingRotateDy = 0;
    for (const key of Object.keys(this.moveState) as MoveKey[]) {
      this.moveState[key] = false;
    }
  }

  setMoveKey(key: MoveKey, pressed: boolean): void {
    this.moveState[key] = pressed;
  }

  // Accumulates raw mouse delta rather than applying it immediately. WASD
  // movement was always smooth because it's driven entirely by the client's
  // own per-frame tick with zero network calls once a key is held; rotation
  // was choppier by comparison because every individual mousemove fired its
  // own NUI->client fetch() round-trip, and mousemove events arrive at
  // uneven, browser-driven intervals rather than the game's own frame
  // pacing. Queuing here and draining/applying the total in the SAME
  // per-frame tick as movement (see startMoveThread below) makes rotation
  // driven by the identical mechanism as WASD, closing that gap instead of
  // just reducing the number of individual rotate calls.
  private pendingRotateDx = 0;
  private pendingRotateDy = 0;

  queueRotate(dx: number, dy: number): void {
    this.pendingRotateDx += dx;
    this.pendingRotateDy += dy;
  }

  moveTo(pos: Vector3Format): void {
    if (this.camera === false) return;
    SetCamCoord(this.camera, pos.x, pos.y, pos.z);
    SetEntityCoords(PlayerPedId(), pos.x, pos.y, pos.z, false, false, false, false);
  }

  // setTick registers a persistent per-frame callback and returns a handle
  // that must be passed to clearTick to actually stop it — a boolean "started"
  // flag alone would leave the handler running forever, every frame, for the
  // lifetime of the resource. Torn down in destroy() above.
  private startMoveThread(): void {
    if (this.moveTickHandle !== false) return;
    this.moveTickHandle = setTick(() => {
      if (!this.isActive()) return;

      // Drain any queued rotation first (see queueRotate above), applying it
      // in this same per-frame tick rather than from a separate NUI-driven
      // callback — this is what makes rotation share WASD's exact update
      // mechanism instead of merely approximating it.
      if (this.pendingRotateDx !== 0 || this.pendingRotateDy !== 0) {
        const [screenX, screenY] = GetCurrentScreenResolution();
        const xMult = (2 * 360) / screenX;
        const yMult = (2 * 360) / screenY;
        this.trackedRotX -= this.pendingRotateDy * yMult;
        this.trackedRotZ -= this.pendingRotateDx * xMult;
        this.pendingRotateDx = 0;
        this.pendingRotateDy = 0;
        SetCamRot(this.camera as number, this.trackedRotX, 0.0, this.trackedRotZ, 0);
      }

      const speed = this.moveState.sprint ? CAM_SPEED_FAST : CAM_SPEED;
      const camRot: Vector3Format = { x: this.trackedRotX, y: 0, z: this.trackedRotZ };
      const forward = rotationToDirection(camRot);
      const right = rotationToDirection({ x: camRot.x, y: camRot.y, z: camRot.z + 90 });
      const up: Vector3Format = { x: 0, y: 0, z: 1 };

      let move: Vector3Format = { x: 0, y: 0, z: 0 };
      if (this.moveState.w) move = addV(move, forward);
      if (this.moveState.s) move = subV(move, forward);
      if (this.moveState.a) move = addV(move, right);
      if (this.moveState.d) move = subV(move, right);
      if (this.moveState.q) move = subV(move, up);
      if (this.moveState.e) move = addV(move, up);

      const len = Math.hypot(move.x, move.y, move.z);
      if (len > 0.0) {
        const camCoords = toVector3(GetCamCoord(this.camera as number));
        const newCoords = addV(camCoords, scaleV(move, speed / len));
        SetCamCoord(this.camera as number, newCoords.x, newCoords.y, newCoords.z);
        SetEntityCoords(PlayerPedId(), newCoords.x, newCoords.y, newCoords.z, false, false, false, false);
      }
    });
  }
}

function addV(a: Vector3Format, b: Vector3Format): Vector3Format {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}
function subV(a: Vector3Format, b: Vector3Format): Vector3Format {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}
function scaleV(a: Vector3Format, s: number): Vector3Format {
  return { x: a.x * s, y: a.y * s, z: a.z * s };
}
