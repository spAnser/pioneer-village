import { screenResolution } from './screen-world';

/**
 * Detached WASD/QE fly camera for editor-style dev tools.
 *
 * The camera mechanism here is dev-lua/client/noclip.lua's, not
 * object_manager's. The difference that matters is ATTACHMENT: noclip attaches
 * the camera to the player ped and then moves only the ped, so there is exactly
 * one position in play. object_manager (and the zone_manager port of it) drives
 * SetCamCoord and SetEntityCoords as two independent writes every frame and
 * hopes they stay in agreement -- which is the shape of bug that shows up as the
 * camera drifting from where the tool thinks it is.
 *
 * Two smaller things come from the same source: CreateCam(..., true) returns an
 * already-active camera, which removes object_manager's need to split creation
 * across frame boundaries to avoid a freeze; and rotation is written with
 * rotation order 2, matching the GetGameplayCamRot(2) it was seeded from.
 *
 * What is NOT taken from noclip is the input: it reads the game's own
 * INPUT_LOOK_LR/UD through GetControlNormal, which a tool holding NUI focus
 * never receives. Callers here feed mouse deltas in via queueRotate instead.
 */

export interface FreeCameraOptions {
  /** Metres per frame while walking. */
  speed?: number;
  /** Metres per frame while the sprint key is held. */
  sprintSpeed?: number;
  /**
   * Vertical FOV in degrees. Defaults to whatever the gameplay camera was
   * using, so opening the tool does not visibly change the framing.
   */
  fov?: number;
}

// noclip.lua's own walk and shift tiers. It also has an alt tier at 5.0 and
// an alt+shift tier at 15.0; a caller that needs to cross the map passes one
// of those as sprintSpeed rather than this class growing more modifier keys.
const DEFAULT_SPEED = 0.5;
const DEFAULT_SPRINT_SPEED = 1.0;
/** noclip scales vertical movement down relative to horizontal. */
const VERTICAL_SPEED_SCALE = 0.75;
const DEG_TO_RAD = Math.PI / 180;

/**
 * GetCamCoord / GetGameplayCamCoord / GetGameplayCamRot all return a plain
 * number[] in the JS/TS native bindings, NOT the {x,y,z} vector Lua gets.
 * Reading .x/.y/.z straight off one silently yields undefined, which then
 * propagates as NaN into the camera natives. Convert once at the boundary.
 */
function toVector3(arr: number[]): Vector3Format {
  return { x: arr[0], y: arr[1], z: arr[2] };
}

export type FreeCameraMoveKey = 'w' | 's' | 'a' | 'd' | 'q' | 'e' | 'sprint';

export class FreeCamera {
  private camera: number | false = false;
  private moveTickHandle: number | false = false;
  private readonly speed: number;
  private readonly sprintSpeed: number;
  private readonly fovOverride: number | undefined;

  private moveState: Record<FreeCameraMoveKey, boolean> = {
    w: false,
    s: false,
    a: false,
    d: false,
    q: false,
    e: false,
    sprint: false,
  };

  /**
   * Position and orientation are tracked here and written out each frame; they
   * are never read back from the natives.
   *
   * Reading back is what made the original port stutter. NUI mousemove events
   * are not frame-rate limited, so two rotate calls can land in one game frame,
   * and GetCamRot immediately after a same-frame SetCamRot can still return the
   * PRE-write value -- so the second call's read-modify-write silently discards
   * the first one's contribution. Keeping the truth in JS means every update
   * builds on what this class actually last wrote.
   */
  private posX = 0;
  private posY = 0;
  private posZ = 0;
  private pitch = 0;
  private roll = 0;
  private yaw = 0;
  private fov = 50;

  /** Mouse delta accumulated between frames, drained in the movement tick. */
  private pendingRotateDx = 0;
  private pendingRotateDy = 0;

  constructor(options: FreeCameraOptions = {}) {
    this.speed = options.speed ?? DEFAULT_SPEED;
    this.sprintSpeed = options.sprintSpeed ?? DEFAULT_SPRINT_SPEED;
    this.fovOverride = options.fov;
  }

  isActive(): boolean {
    return this.camera !== false && DoesCamExist(this.camera);
  }

  /**
   * Where the camera ACTUALLY is, read back from the engine rather than assumed
   * from what we last asked for.
   *
   * This matters because the camera is attached to the ped: its position is
   * whatever the engine put the ped at, which is not necessarily the Z that was
   * requested. Anything reasoning about the world from the camera -- a
   * screen-space overlay, a cursor raycast -- has to use the real value or it
   * is silently projecting from the wrong place.
   *
   * Reading back here is safe in a way that reading rotation back was not: this
   * is a plain read for reporting, not the read-modify-write that let same-frame
   * rotation updates overwrite each other. It also costs no extra latency --
   * callers' per-frame ticks are registered before the movement tick below, so
   * they were already seeing the previous frame's value either way.
   */
  getCoord(): Vector3Format {
    if (this.isActive()) return toVector3(GetCamCoord(this.camera as number));
    return toVector3(GetGameplayCamCoord());
  }

  /** x = pitch, y = roll, z = yaw, in degrees. */
  getRot(): Vector3Format {
    if (this.isActive()) return { x: this.pitch, y: this.roll, z: this.yaw };
    return toVector3(GetGameplayCamRot(2));
  }

  getFov(): number {
    return this.fov;
  }

  create(): void {
    // A hot reload can leave the previous instance's camera alive; creating a
    // second one on top of it is what leaves the view stuck until the tool is
    // closed and reopened.
    if (this.camera !== false) this.destroy();

    const coords = toVector3(GetGameplayCamCoord());
    const rotation = toVector3(GetGameplayCamRot(2));
    this.posX = coords.x;
    this.posY = coords.y;
    this.posZ = coords.z;
    this.pitch = rotation.x;
    this.roll = rotation.y;
    this.yaw = rotation.z;
    this.fov = this.fovOverride ?? GetGameplayCamFov();

    const player = PlayerPedId();
    FreezeEntityPosition(player, true);

    // `true` creates the camera already active, so there is no separate
    // SetCamActive and no frame to survive in between.
    this.camera = CreateCam('DEFAULT_SCRIPTED_CAMERA', true);
    if (!DoesCamExist(this.camera)) {
      this.camera = false;
      FreezeEntityPosition(player, false);
      return;
    }

    // NoOffset: plain SetEntityCoords applies a grounding adjustment to a ped,
    // which moves the attached camera off the position that was asked for.
    SetEntityCoordsNoOffset(player, this.posX, this.posY, this.posZ, false, false, false);
    SetCamRot(this.camera, this.pitch, this.roll, this.yaw, 2);
    SetCamFov(this.camera, this.fov);

    // The whole point: from here the camera IS the ped's position, so moving
    // the ped moves the view and nothing can drift out of sync.
    AttachCamToEntity(this.camera, player, 0.0, 0.0, 0.0, true);
    SetEntityVisible(player, false);

    // RenderScriptCams takes 5 params in the JS/TS bindings (render, ease,
    // easeTime, easeCoordsAnim, p4). Lua fills missing trailing args with
    // defaults; the JS bindings pass undefined straight through as garbage,
    // which is what froze the game in an earlier port that passed only 3.
    RenderScriptCams(true, true, 500, true, true, 0);

    this.startMoveThread();
  }

  destroy(): void {
    // Idempotent, so callers can tear down unconditionally on resource stop
    // without having to know whether the camera was ever opened. Without this
    // guard the unfreeze / make-visible / drop-to-ground below would fire on a
    // player who is simply walking around, which is worse than doing nothing.
    if (this.camera === false && this.moveTickHandle === false) return;

    const player = PlayerPedId();

    if (this.camera !== false && DoesCamExist(this.camera)) {
      RenderScriptCams(false, true, 500, true, true, 0);
      DestroyCam(this.camera, false);
    }
    this.camera = false;

    FreezeEntityPosition(player, false);
    // Mirrors noclip. A no-op when nothing is attached, but the camera
    // attachment above is exactly the state worth clearing explicitly.
    DetachEntity(player, false, false);
    SetEntityVisible(player, true);

    // Drop to the ground where the camera stopped, which is noclip's behaviour.
    // object_manager and zone_manager instead teleported the player back to
    // wherever they opened the tool -- less useful here, where flying to a
    // junction and then standing at it is usually the point.
    const height = GetEntityHeightAboveGround(player);
    if (height < 15) {
      const grounded = GetOffsetFromEntityInWorldCoords(player, 0.0, 0.0, -height);
      SetEntityCoords(player, grounded[0], grounded[1], grounded[2], false, false, false, false);
    }

    // setTick returns a handle that must reach clearTick -- gating on a boolean
    // inside the callback leaves it running every frame for the resource's life.
    if (this.moveTickHandle !== false) {
      clearTick(this.moveTickHandle);
      this.moveTickHandle = false;
    }
    this.pendingRotateDx = 0;
    this.pendingRotateDy = 0;
    for (const key of Object.keys(this.moveState) as FreeCameraMoveKey[]) {
      this.moveState[key] = false;
    }
  }

  setMoveKey(key: FreeCameraMoveKey, pressed: boolean): void {
    this.moveState[key] = pressed;
  }

  queueRotate(dx: number, dy: number): void {
    this.pendingRotateDx += dx;
    this.pendingRotateDy += dy;
  }

  moveTo(pos: Vector3Format): void {
    if (this.camera === false) return;
    this.posX = pos.x;
    this.posY = pos.y;
    this.posZ = pos.z;
    SetEntityCoordsNoOffset(PlayerPedId(), pos.x, pos.y, pos.z, false, false, false);
  }

  private startMoveThread(): void {
    if (this.moveTickHandle !== false) return;
    this.moveTickHandle = setTick(() => {
      if (!this.isActive()) return;

      if (this.pendingRotateDx !== 0 || this.pendingRotateDy !== 0) {
        const [screenX, screenY] = screenResolution();
        this.yaw -= this.pendingRotateDx * ((2 * 360) / screenX);
        this.pitch -= this.pendingRotateDy * ((2 * 360) / screenY);
        this.pendingRotateDx = 0;
        this.pendingRotateDy = 0;
      }

      const speed = this.moveState.sprint ? this.sprintSpeed : this.speed;

      // Movement decomposition ported from noclip.lua unchanged. Forward
      // carries the pitch, so W flies along the look direction; strafe is a
      // flat yaw+90 with no pitch component.
      //
      // The floor() on the strafe angle is noclip's, kept as-is: it quantises
      // strafing to whole degrees, which is imperceptible, and this is the
      // version that has been shown to behave. Lua's % always returns a
      // non-negative result where JS keeps the dividend's sign, but sin and cos
      // are 360-periodic so the two agree for every input.
      const forwardRad = -this.yaw * DEG_TO_RAD;
      const strafeRad = (Math.floor(this.yaw + 90.0) % 360) * -1.0 * DEG_TO_RAD;
      const pitchRad = this.pitch * DEG_TO_RAD;

      const forwardX = speed * Math.sin(forwardRad);
      const forwardY = speed * Math.cos(forwardRad);
      const forwardZ = speed * Math.sin(pitchRad);
      const strafeX = speed * Math.sin(strafeRad);
      const strafeY = speed * Math.cos(strafeRad);

      let moved = false;
      if (this.moveState.w !== this.moveState.s) {
        const sign = this.moveState.w ? 1 : -1;
        this.posX += forwardX * sign;
        this.posY += forwardY * sign;
        this.posZ += forwardZ * sign;
        moved = true;
      }
      if (this.moveState.a !== this.moveState.d) {
        const sign = this.moveState.a ? 1 : -1;
        this.posX += strafeX * sign;
        this.posY += strafeY * sign;
        moved = true;
      }
      if (this.moveState.q !== this.moveState.e) {
        this.posZ += (this.moveState.e ? 1 : -1) * speed * VERTICAL_SPEED_SCALE;
        moved = true;
      }

      // Only the ped is positioned; the attached camera follows it.
      if (moved) {
        SetEntityCoordsNoOffset(PlayerPedId(), this.posX, this.posY, this.posZ, false, false, false);
      }
      SetCamRot(this.camera as number, this.pitch, this.roll, this.yaw, 2);
    });
  }
}
