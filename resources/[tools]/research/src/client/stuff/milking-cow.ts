import { DrawTxt, PVBase, PVCamera, PVGame, PVTarget, onResourceInit, onResourceStop } from '@lib/client';
import { Delay } from '@lib/functions';
import { Vector3 } from '@lib/math';

// Offsets relative to the cow's position + heading. Pulled verbatim from RDR2
// decompiled script milking_cow.c lines 33-40.
const COW_ANIM_OFFSET = new Vector3(1.47681, -0.749695, -0.0486145);
const STOOL_OFFSET = new Vector3(0.75708, -0.630981, -0.0272522);
const BUCKET_OFFSET = new Vector3(1.47479, -0.239473, -0.0476227);
const HEADING_OFFSET = 170.7721;

// Camera offsets from RDR2 milking_cow.c lines 37-38 (vLocal_8 / vLocal_11)
// applied in func_110 lines 1979-1983. Position is relative to the scene
// anchor + heading. Rotation is added to the scene rotation Vector3.
const CAM_POS_OFFSET = new Vector3(0.7006, 0.094, 1.076);
const CAM_ROT_OFFSET = new Vector3(-49.5998, 0, -107.2854);
const CAM_FOV = 37.85;
const CAM_ID = 'MilkingCowCam';

const STOOL_MODEL = 'P_STOOL02X';
const BUCKET_MODEL = 'S_BUCKETMILK01X';

// A_C_COW's root coord is consistently 0.9067538169 units above the visual
// ground level (measured empirically). Subtract this from GetEntityCoords(cow).z
// to get the true ground-level Z to use as the scene anchor's Z. Deterministic
// and avoids raycast unreliability from probes hitting the cow's own collision.
const COW_ROOT_HEIGHT_ABOVE_GROUND = 0.6067538169;

// Move network defs — these are the actual state machines R* ships for the
// milking minigame. They handle blending between clips additively, which is
// why we can drive squeeze overlays without clobbering the idle loop.
const PLAYER_NETWORK = 'script_mar5_milkcow_john';
const COW_NETWORK = 'script_mar5_milkcow_cow';
const BUCKET_NETWORK = 'script_mar5_milkcow_bucket';
const CLIP_SET = 'CLIPSET@MINI_GAMES@STORY@MAR5@MILK_COW';

// Move network IDs we use to identify our networks to the manager.
const PLAYER_NET_ID = 'milking-cow:player';
const COW_NET_ID = 'milking-cow:cow';
const BUCKET_NET_ID = 'milking-cow:bucket';

// Initial state for the player/cow networks — matches sLocal_20.f_43.f_30
// at milking_cow.c:2146.
const INITIAL_STATE = 'Milking';
const BUCKET_INITIAL_STATE = 'Wobble';

// Outro transition state — what we request when the bucket is full.
const OUTRO_STATE = 'Outro';

// Anim event the player's move network fires when the outro completes.
// milking_cow.c:1298, 2247: `HAS_ANIM_EVENT_FIRED(Global_35, joaat("GAMEFINISHED"))`.
const GAMEFINISHED_EVENT_HASH = GetHashKey('GAMEFINISHED');

// Gameplay tuning from milking_cow.c — SHORT_TIMED_EVENT duration (line 1189-1190)
// and the rising-edge yield formula (line 3904).
const RAMP_MS = 570;
const DECAY_PER_FRAME = 0.05;
const SWEET_SPOT_MAX = 0.8;
const MILK_GAIN_MULT = 12.0;
const BUCKET_FULL = 100;

// Control hashes derived from the same strings RDR2's own milking_cow.c uses.
const LEFT_CONTROL_HASH = GetHashKey('INPUT_MINIGAME_MILKING_LEFT_ACTION');
const RIGHT_CONTROL_HASH = GetHashKey('INPUT_MINIGAME_MILKING_RIGHT_ACTION');
// INPUT_MINIGAME_QUIT is the specific minigame-context cancel binding (Esc/B
// per the engine's input map). INPUT_FRONTEND_CANCEL is for menu navigation
// and doesn't fire during minigame contexts.
const CANCEL_CONTROL_HASH = GetHashKey('INPUT_MINIGAME_QUIT');

// If the cow drifts further than this from where we started milking, bail out.
const SESSION_MAX_DRIFT = 3.0;

interface TriggerState {
  current: number;
  previous: number;
  pressedAt: number;
}

interface ActiveSession {
  cowEntity: number;
  stoolEntity: number;
  bucketEntity: number;
  cowAnchorCoords: Vector3;
  animCoords: Vector3;
  propRotation: Vector3;
  progress: number;
  left: TriggerState;
  right: TriggerState;
  lastRawLeft: number;
  lastRawRight: number;
  lastProgressLogMs: number;
  outroRequested: boolean;
  // Whether the intro sit-down animation has finished playing. Until true,
  // we don't apply LeftReach/RightReach signals or accrue milk — matches
  // milking_cow.c func_119 state machine: state 0 starts intro, state 1
  // waits for mgBlendOut event, state 2 is active milking.
  introComplete: boolean;
  introStartedAt: number;
  tickHandle: number;
}

class MilkingCowManager {
  protected static instance: MilkingCowManager;

  static getInstance(): MilkingCowManager {
    if (!MilkingCowManager.instance) {
      MilkingCowManager.instance = new MilkingCowManager();
    }
    return MilkingCowManager.instance;
  }

  private session: ActiveSession | null = null;

  isActive(): boolean {
    return this.session !== null;
  }

  async start(cowEntityId: number, sceneHeadingOverride?: number): Promise<void> {
    if (this.session) return;
    if (!DoesEntityExist(cowEntityId)) return;
    if (Entity(cowEntityId).state.inUse) return;

    // Lock the cow IMMEDIATELY, before any await, so it can't wander while we set up.
    Entity(cowEntityId).state.set('inUse', true, true);
    ClearPedTasksImmediately(cowEntityId, false, false);
    TaskStandStill(cowEntityId, -1);
    SetPedKeepTask(cowEntityId, true);
    SetBlockingOfNonTemporaryEvents(cowEntityId, true);
    SetEntityInvincible(cowEntityId, true);
    // Disable collision between the player and the cow. The seated player
    // partially overlaps the cow's flank during milking; without this, the
    // cow's collision pushes the player around. Persistent (thisFrameOnly=false)
    // so it stays in effect for the whole session. Applied in both directions
    // since collision pairing in this native is unidirectional per call.
    SetEntityNoCollisionEntity(PVGame.playerPed(), cowEntityId, false);
    SetEntityNoCollisionEntity(cowEntityId, PVGame.playerPed(), false);
    // NOTE: deliberately NOT freezing the cow yet — we need to SetEntityCoords
    // it to ground level below, and FreezeEntityPosition would lock it at its
    // current (possibly elevated) Z and ignore the SetEntityCoords call.

    // Push the MinigameMilking control context. Re-applied every tick in
    // rhythmFrame because contexts drift away if not asserted per frame.
    SetControlContext(0, GetHashKey('MinigameMilking'));
    SetPlayerControl(PlayerId(), false, 0, false);

    // sceneHeading is the rotation of the scene anchor's reference frame —
    // distinct from the cow's physical heading. They MAY match (if the cow
    // was placed with this in mind) but they don't have to. R*'s decomp
    // passes scene heading from the scene table (-14.4° at Beecher's Hope),
    // independent of the cow's actual facing. Callers can override via
    // the sceneHeadingOverride arg; default falls back to cowHeading for
    // freely-spawned cows where there's no separately-known scene heading.
    const cowHeading = GetEntityHeading(cowEntityId);
    // A_C_COW's root coord sits 0.9067538169 units above visual ground level.
    // Subtract the known constant to get the true ground-level Z for the
    // scene anchor — more reliable than ground-raycasting, which could hit
    // the cow's own collision or off-target terrain.
    const cowCoordsRaw = Vector3.fromArray(GetEntityCoords(cowEntityId, false, false));
    // cowCoords is where we REPRESENT the cow's ground-level anchor position
    // for scene-anchor derivation. The cow's actual entity position is left
    // alone (no SetEntityCoords) — the move network's OFFSET_POSITION flag
    // drives the visual render based on sceneAnchor anyway, and we've
    // disabled player↔cow collision so physical position doesn't matter.
    // Subtract:
    //   - 0.01 X: decomp's +0.01 nudge is baked into the cow's stored pos;
    //             reverse it here so sceneAnchor is correct.
    //   - COW_ROOT_HEIGHT_ABOVE_GROUND: cow entity root sits this far above
    //             true ground; subtract to get the ground-level Z.
    const cowCoords = new Vector3(cowCoordsRaw.x - 0.01, cowCoordsRaw.y, cowCoordsRaw.z - COW_ROOT_HEIGHT_ABOVE_GROUND);

    // The scene anchor is the reference point everything offsets from. The
    // decomp picks an arbitrary world location for it; the cow is placed at
    // sceneAnchor + offset(vLocal_0_player) rotated by sceneHeading. To keep
    // a freely-spawned cow visually in place, we derive the scene anchor by
    // REVERSING that offset — sceneAnchor = cowCoords - offset(vLocal_0).
    // Then when the move network plays the cow's authored anim anchored at
    // sceneAnchor, the visual cow lands back at cowCoords.
    // Resolve scene heading: explicit override > entity state > cowHeading-180°.
    // The cow's BODY is authored to face 180° from the scene's forward direction
    // (confirmed empirically: cow@165.6° with sceneHeading=-14.4° aligns perfectly,
    // and 165.6 - (-14.4) = 180°). R*'s authoring convention has the cow's
    // rear-end toward the player's milking spot, so sceneHeading = cowHeading - 180°.
    // The entity state lets /placeMilkingCowBeechers (and any future spawner
    // that knows the scene-authored heading) record it on the cow itself.
    const stateHeading = Entity(cowEntityId).state.milkingSceneHeading as number | undefined;
    const sceneHeading = sceneHeadingOverride ?? stateHeading ?? cowHeading - 180;
    console.log(
      `[milking-cow] cowHeading=${cowHeading.toFixed(2)}° sceneHeading=${sceneHeading.toFixed(2)}° ` +
        `(source: ${sceneHeadingOverride !== undefined ? 'override' : stateHeading !== undefined ? 'state' : 'cowHeading-180'})`,
    );
    const offsetFromAnchor = (anchorCoords: Vector3, heading: number, offset: Vector3): Vector3 => {
      const raw = GetOffsetFromCoordAndHeadingInWorldCoords(
        anchorCoords.x,
        anchorCoords.y,
        anchorCoords.z,
        heading,
        offset.x,
        offset.y,
        offset.z,
      );
      // Apply the +0.01 X nudge that the decomp's func_110 / func_12 apply
      // (vVar0 = vVar0 + Vector(0.01f, 0.0f, 0.0f)) before storing the final
      // position. Originally added for the ground raycast to clear the cow's
      // collision, but R* left it in the stored value — so all R*'s anims are
      // calibrated to positions WITH the nudge. Without it, our hand-reach
      // positions are 1cm off from the udders, visible as "udders slightly
      // to the left." Apply nudge to all derived prop positions.
      const nudgedX = raw[0] + 0.01;
      const [hit, groundZ] = GetGroundZFor_3DCoord(nudgedX, raw[1], raw[2] + 1.0, false);
      return new Vector3(nudgedX, raw[1], hit ? groundZ : raw[2]);
    };

    // Compute scene anchor by reversing the cow placement formula. The cow
    // sits at sceneAnchor + offset(COW_ANIM_OFFSET) rotated by sceneHeading.
    // Solving for sceneAnchor: sceneAnchor = cowCoords - offset(COW_ANIM_OFFSET).
    // Apply the rotation backwards (negate the offset vector before transforming).
    const negatedAnimOffset = new Vector3(-COW_ANIM_OFFSET.x, -COW_ANIM_OFFSET.y, -COW_ANIM_OFFSET.z);
    const sceneAnchorRaw = GetOffsetFromCoordAndHeadingInWorldCoords(
      cowCoords.x,
      cowCoords.y,
      cowCoords.z,
      sceneHeading,
      negatedAnimOffset.x,
      negatedAnimOffset.y,
      negatedAnimOffset.z,
    );
    // No ground-snap on sceneAnchor — we already adjusted cowCoords.z down by
    // COW_ROOT_HEIGHT_ABOVE_GROUND, so sceneAnchor inherits that ground-level
    // Z. Snapping here would override the constant adjustment with whatever
    // the raycast returns (likely the cow's own collision), defeating the fix.
    const sceneAnchor = new Vector3(sceneAnchorRaw[0], sceneAnchorRaw[1], sceneAnchorRaw[2]);
    const camCoordsRaw = GetOffsetFromCoordAndHeadingInWorldCoords(
      sceneAnchor.x,
      sceneAnchor.y,
      sceneAnchor.z,
      sceneHeading,
      CAM_POS_OFFSET.x,
      CAM_POS_OFFSET.y,
      CAM_POS_OFFSET.z,
    );
    PVCamera.create({
      id: CAM_ID,
      coords: { x: camCoordsRaw[0], y: camCoordsRaw[1], z: camCoordsRaw[2] },
      rot: {
        x: CAM_ROT_OFFSET.x,
        y: CAM_ROT_OFFSET.y,
        z: (sceneHeading + CAM_ROT_OFFSET.z) % 360,
      },
      fov: CAM_FOV,
    });

    // Freeze the cow at its spawn position. Don't SetEntityCoords — the move
    // network's OFFSET_POSITION flag re-renders the cow visually at the anim's
    // authored position relative to sceneAnchor anyway, and forcing the cow's
    // physical position to a different X creates a discrepancy with where the
    // player's anim places its hands (both networks share sceneAnchor, so the
    // hand-udder alignment should come purely from the anims, not from
    // physical-position forcing). Player↔cow collision is already disabled.
    FreezeEntityPosition(cowEntityId, true);

    // Now compute all the world positions from the scene anchor as
    // milking_cow.c func_110 does. NOTE: vLocal_0 is the COW position offset
    // from scene anchor (NOT the player's anim spot). The player goes to
    // wherever the move-network anim places them when anchored at sceneAnchor.
    // We slide the player to sceneAnchor itself as a reasonable pre-position
    // and let the anim handle the final body placement.
    // Player pre-position is the stool's world location — that's where the
    // player will end up sitting once the anim plays. Sliding them to bare
    // sceneAnchor was leaving them 1.48m away from the actual seat.
    const stoolCoords = offsetFromAnchor(sceneAnchor, sceneHeading, STOOL_OFFSET);
    const bucketCoords = offsetFromAnchor(sceneAnchor, sceneHeading, BUCKET_OFFSET);
    const animCoords = stoolCoords;
    // HEADING_OFFSET (170.77°) applies to the PLAYER's rotation, not the props.
    // The decomp's func_110 doesn't explicitly rotate the stool or bucket.
    // Using bare sceneHeading aligns the props with the scene's natural axis.
    const playerRotation = new Vector3(0, 0, sceneHeading + HEADING_OFFSET);
    const propRotation = new Vector3(0, 0, sceneHeading);
    const facePlayerHeading = (sceneHeading + HEADING_OFFSET) % 360;

    // Spawn props.
    const stoolEntity = await PVGame.createObject(GetHashKey(STOOL_MODEL), stoolCoords, propRotation);
    const bucketEntity = await PVGame.createObject(GetHashKey(BUCKET_MODEL), bucketCoords, propRotation);
    FreezeEntityPosition(stoolEntity, true);
    FreezeEntityPosition(bucketEntity, true);
    SetEntityCollision(stoolEntity, false, false);
    SetEntityCollision(bucketEntity, false, false);

    // Walk-to-coords + force-snap pattern from gold-panning.ts:263-282.
    const playerPed = PVGame.playerPed();
    TaskGoToCoordAnyMeans(playerPed, animCoords.x, animCoords.y, animCoords.z, 1.5, 0, false, 0, 0);
    await PVGame.reachedCoords(animCoords, 0.75, 5000);
    await Delay(100);
    SetPedDesiredHeading(playerPed, facePlayerHeading);
    await Delay(900);
    TaskPedSlideToCoord(playerPed, animCoords.x, animCoords.y, animCoords.z, facePlayerHeading, 0.75);
    await Delay(750);
    PVCamera.setActive(CAM_ID, 500);

    console.log('[milking-cow] Props spawned, player positioned, starting session');

    this.session = {
      cowEntity: cowEntityId,
      stoolEntity,
      bucketEntity,
      cowAnchorCoords: cowCoords,
      animCoords,
      propRotation,
      progress: 0,
      left: { current: 0, previous: 0, pressedAt: 0 },
      right: { current: 0, previous: 0, pressedAt: 0 },
      lastRawLeft: 0,
      lastRawRight: 0,
      lastProgressLogMs: 0,
      outroRequested: false,
      introComplete: false,
      introStartedAt: 0, // set when intro tick first runs
      tickHandle: 0,
    };

    // Cinematic camera — mirrors milking_cow.c func_110 lines 1979-1983.
    // Camera anchor is the SCENE anchor (f_6), not the anim spot, with the
    // unmodified sceneHeading (f_9.z). The decomp adds vLocal_11 to the
    // scene rotation Vector3 (NOT HEADING_OFFSET). vLocal_11.z = -107.2854°.
    // const camCoordsRaw = GetOffsetFromCoordAndHeadingInWorldCoords(
    //   sceneAnchor.x,
    //   sceneAnchor.y,
    //   sceneAnchor.z,
    //   sceneHeading,
    //   CAM_POS_OFFSET.x,
    //   CAM_POS_OFFSET.y,
    //   CAM_POS_OFFSET.z,
    // );
    // PVCamera.create({
    //   id: CAM_ID,
    //   coords: { x: camCoordsRaw[0], y: camCoordsRaw[1], z: camCoordsRaw[2] },
    //   rot: {
    //     x: CAM_ROT_OFFSET.x,
    //     y: CAM_ROT_OFFSET.y,
    //     z: (sceneHeading + CAM_ROT_OFFSET.z) % 360,
    //   },
    //   fov: CAM_FOV,
    // });
    // PVCamera.setActive(CAM_ID, 3000);

    // Disable leg IK on both ped and cow before the network attaches — matches
    // milking_cow.c func_118 lines 2151-2154.
    SetPedCanLegIk(playerPed, false);
    SetPedLegIkMode(playerPed, 0);
    SetPedCanLegIk(cowEntityId, false);
    SetPedLegIkMode(cowEntityId, 0);

    // Diagnostic: check that the move-network exports are actually wired up.
    // If `startMoveNetwork` is undefined, the `game` resource hasn't been
    // rebuilt since the export was added — restart/rebuild game first.
    console.log(`[milking-cow] PVGame.startMoveNetwork typeof: ${typeof PVGame.startMoveNetwork}`);
    if (typeof PVGame.startMoveNetwork !== 'function') {
      console.error('[milking-cow] PVGame.startMoveNetwork is not a function — rebuild the `game` resource');
      this.cancel();
      return;
    }

    // Attach the three move networks. Player and cow get the Advanced variant
    // with the shared scene anchor (matches milking_cow.c:2157-2158 where both
    // calls receive identical f_6/f_9). Bucket gets the non-Advanced variant
    // (matches line 2159).
    //
    // Each call wrapped in try/catch so a thrown TypeError or rejection in
    // one network doesn't silently abort all three via Promise.all rejection.
    const safeStart = async (label: string, config: Game.MoveNetworkConfig): Promise<boolean> => {
      try {
        const ok = await PVGame.startMoveNetwork(config);
        console.log(`[milking-cow] startMoveNetwork(${label}) returned ${ok}`);
        return ok;
      } catch (err) {
        console.error(`[milking-cow] startMoveNetwork(${label}) threw:`, err);
        return false;
      }
    };

    // Player + cow share the player anim dict; bucket has its own. The
    // manager streams all referenced anim dicts + the clipset before
    // attaching the network. Without this, the network attaches but the
    // clips aren't loaded yet — first-attempt-fails-second-works race.
    //
    // The move-network anchor is the SCENE anchor (f_6/f_9 in the decomp).
    // milking_cow.c func_118 lines 2157-2158 pass iParam0->f_6 (scene coords)
    // and f_9 (= (0, 0, sceneHeading)). The anims are authored relative to
    // this anchor; the cow's authored frames place its body at the correct
    // visual position which equals sceneAnchor + vLocal_0_offset, which is
    // the cowCoords we derived sceneAnchor from.
    const sceneAnchorRotation = new Vector3(0, 0, sceneHeading);
    const forward = Vector3.fromArray(GetEntityForwardVector(cowEntityId));
    const cowAnchor = sceneAnchor
      .copy()
      .add(new Vector3(0, 0, 0.075))
      .add(forward.multiplyScalar(0.099));
    const networksReady = await Promise.all([
      safeStart('player', {
        id: PLAYER_NET_ID,
        entity: playerPed,
        networkDef: PLAYER_NETWORK,
        clipSet: CLIP_SET,
        animDicts: ['mini_games@story@mar5@milk_cow'],
        initialState: INITIAL_STATE,
        anchorCoords: sceneAnchor,
        anchorRotation: sceneAnchorRotation,
        isAdvanced: true,
        flags: 128,
      }),
      safeStart('bucket', {
        id: BUCKET_NET_ID,
        entity: bucketEntity,
        networkDef: BUCKET_NETWORK,
        animDicts: ['mini_games@story@mar5@milk_cow@bucket'],
        initialState: BUCKET_INITIAL_STATE,
        isAdvanced: false,
        flags: 128,
      }),
      safeStart('cow', {
        id: COW_NET_ID,
        entity: cowEntityId,
        networkDef: COW_NETWORK,
        clipSet: CLIP_SET,
        animDicts: ['mini_games@story@mar5@milk_cow'],
        initialState: INITIAL_STATE,
        anchorCoords: cowAnchor,
        anchorRotation: sceneAnchorRotation,
        isAdvanced: true,
        flags: 128,
      }),
    ]);

    if (!networksReady.every(Boolean)) {
      const failed = ['player', 'cow', 'bucket'].filter((_, i) => !networksReady[i]);
      console.warn(`[milking-cow] Move networks failed to start: ${failed.join(', ')} — cancelling session`);
      this.cancel();
      return;
    }
    if (!this.session) return;

    // Re-apply control state after the networks attach. TaskMoveNetwork* calls
    // can wipe scripted input-control state set up earlier.
    SetControlContext(0, GetHashKey('MinigameMilking'));
    SetPlayerControl(PlayerId(), false, 0, false);

    // Mirror the decomp's state 0 → state 1 startup sequence (milking_cow.c
    // func_176 + func_177 + state 1 setting reach=1.0):
    //   1. Zero all signals (matches func_176)
    //   2. Push them to the network (matches func_177 first call)
    //   3. Set reach signals to 1.0 (matches state 1 entry)
    //   4. Wait briefly so the network can begin its intro→active blend
    //      while we're paused, before our rhythm tick takes over the signals
    // The intro animation is part of the move network's "Milking" state's
    // blend tree — it plays the intro pose when reach=0, then blends to the
    // active milking pose as reach→1. By zeroing first, then jumping to 1.0,
    // we replicate the decomp's signal trajectory exactly. The brief settle
    // delay (no rhythm tick running) lets the engine play the intro blend
    // without our per-frame signal writes interfering.
    PVGame.setMoveNetworkSignalFloat(PLAYER_NET_ID, 'LeftReach', 0);
    PVGame.setMoveNetworkSignalFloat(PLAYER_NET_ID, 'RightReach', 0);
    PVGame.setMoveNetworkSignalFloat(PLAYER_NET_ID, 'LeftTrigger', 0);
    PVGame.setMoveNetworkSignalFloat(PLAYER_NET_ID, 'RightTrigger', 0);
    PVGame.setMoveNetworkSignalFloat(COW_NET_ID, 'LeftReach', 0);
    PVGame.setMoveNetworkSignalFloat(COW_NET_ID, 'RightReach', 0);
    PVGame.setMoveNetworkSignalFloat(COW_NET_ID, 'LeftTrigger', 0);
    PVGame.setMoveNetworkSignalFloat(COW_NET_ID, 'RightTrigger', 0);
    await Delay(50); // single tick at zero signals (matches decomp state 0 → state 1)
    if (!this.session) return;

    PVGame.setMoveNetworkSignalFloat(PLAYER_NET_ID, 'LeftReach', 1.0);
    PVGame.setMoveNetworkSignalFloat(PLAYER_NET_ID, 'RightReach', 1.0);
    PVGame.setMoveNetworkSignalFloat(COW_NET_ID, 'LeftReach', 1.0);
    PVGame.setMoveNetworkSignalFloat(COW_NET_ID, 'RightReach', 1.0);

    this.startRhythmTick();
  }

  private startRhythmTick(): void {
    if (!this.session) return;
    if (this.session.tickHandle) {
      clearTick(this.session.tickHandle);
      this.session.tickHandle = 0;
    }
    this.session.tickHandle = setTick(() => this.rhythmFrame());
  }

  private rhythmFrame(): void {
    const s = this.session;
    if (!s) return;

    // Re-push context and disable first-person every frame (milking_cow.c:3634, 2167).
    SetControlContext(4, GetHashKey('MinigameMilking'));
    DisableOnFootFirstPersonViewThisUpdate();

    // Bail-out: Esc (INPUT_MINIGAME_QUIT). Check both enabled and disabled
    // variants since SetPlayerControl(false) gates the non-Disabled variants.
    // Also check IsControlJustPressed in case Released doesn't fire under
    // the active control context. Log each detection so we can see which
    // path fires (or that nothing fires, which would mean the binding
    // doesn't include the key we expect).
    if (
      IsDisabledControlJustReleased(0, CANCEL_CONTROL_HASH) ||
      IsControlJustReleased(0, CANCEL_CONTROL_HASH) ||
      IsDisabledControlJustPressed(0, CANCEL_CONTROL_HASH) ||
      IsControlJustPressed(0, CANCEL_CONTROL_HASH)
    ) {
      console.log('[milking-cow] CANCEL detected via INPUT_MINIGAME_QUIT — cancelling');
      this.cancel();
      return;
    }
    if (!DoesEntityExist(s.cowEntity)) {
      this.cancel();
      return;
    }
    const cowNow = Vector3.fromArray(GetEntityCoords(s.cowEntity, false, false));
    const dx = cowNow.x - s.cowAnchorCoords.x;
    const dy = cowNow.y - s.cowAnchorCoords.y;
    const dz = cowNow.z - s.cowAnchorCoords.z;
    if (dx * dx + dy * dy + dz * dz > SESSION_MAX_DRIFT * SESSION_MAX_DRIFT) {
      this.cancel();
      return;
    }

    // Read raw inputs via GetControlNormal group 2 (matches milking_cow.c:3637-3638).
    const leftAnalog = GetControlNormal(2, LEFT_CONTROL_HASH);
    const rightAnalog = GetControlNormal(2, RIGHT_CONTROL_HASH);
    const now = GetGameTimer();

    // Diagnostic edge logs.
    if (leftAnalog > 0 && s.lastRawLeft === 0) {
      console.log(`[milking-cow] LEFT pressed (value=${leftAnalog})`);
    } else if (leftAnalog === 0 && s.lastRawLeft > 0) {
      console.log('[milking-cow] LEFT released');
    }
    if (rightAnalog > 0 && s.lastRawRight === 0) {
      console.log(`[milking-cow] RIGHT pressed (value=${rightAnalog})`);
    } else if (rightAnalog === 0 && s.lastRawRight > 0) {
      console.log('[milking-cow] RIGHT released');
    }
    s.lastRawLeft = leftAnalog;
    s.lastRawRight = rightAnalog;

    this.updateTrigger(s.left, leftAnalog, now);
    this.updateTrigger(s.right, rightAnalog, now);

    // First tick: record when the intro started so we have a timeout fallback.
    if (s.introStartedAt === 0) {
      s.introStartedAt = now;
      console.log('[milking-cow] Intro started — waiting for mgBlendOut event before active milking');
    }

    // INTRO PHASE: Let the move network's "Milking" state play its authored
    // sit-down animation. Leave reach signals at 0 so we don't actively push
    // the network toward the active pose — the network appears to play the
    // intro clip on its own when reach is 0, and we just wait for the
    // mgBlendOut event (or a 5s timeout safety) to know when to start
    // accruing milk. (Previous attempt with reach=1.0 immediately collapsed
    // the intro into a snap-to-active-pose; reach=0 during intro produced
    // a partial visible sit-down. Both wrong. Keeping reach=0 here is the
    // less-bad path while we figure out the right state-transition sequence.)
    if (!s.introComplete) {
      PVGame.setMoveNetworkSignalFloat(PLAYER_NET_ID, 'LeftTrigger', 0);
      PVGame.setMoveNetworkSignalFloat(PLAYER_NET_ID, 'RightTrigger', 0);
      PVGame.setMoveNetworkSignalFloat(COW_NET_ID, 'LeftTrigger', 0);
      PVGame.setMoveNetworkSignalFloat(COW_NET_ID, 'RightTrigger', 0);
      PVGame.setMoveNetworkSignalFloat(BUCKET_NET_ID, 'level', 0);
      PVGame.setMoveNetworkSignalFloat(BUCKET_NET_ID, 'WobbleAmount', 0);

      const blendOutFired = PVGame.getMoveNetworkEvent(PLAYER_NET_ID, 'mgBlendOut');
      const timedOut = now - s.introStartedAt > 5000;
      if (blendOutFired || timedOut) {
        console.log(
          `[milking-cow] Intro complete (mgBlendOut=${blendOutFired}, timeout=${timedOut}) — entering active milking`,
        );
        s.introComplete = true;
        // Engage reach signals NOW to transition the network into active pose.
        PVGame.setMoveNetworkSignalFloat(PLAYER_NET_ID, 'LeftReach', 1.0);
        PVGame.setMoveNetworkSignalFloat(PLAYER_NET_ID, 'RightReach', 1.0);
        PVGame.setMoveNetworkSignalFloat(COW_NET_ID, 'LeftReach', 1.0);
        PVGame.setMoveNetworkSignalFloat(COW_NET_ID, 'RightReach', 1.0);
      }
      // Don't accrue milk during intro.
      return;
    }

    // ACTIVE MILKING PHASE: accrue milk via the rising-edge sweet-spot
    // formula (milking_cow.c:3904), then drive the move-network signals
    // every frame (milking_cow.c:2564-2567 for both player and cow).
    for (const t of [s.left, s.right]) {
      if (t.current > t.previous && t.current > 0 && t.current < SWEET_SPOT_MAX) {
        s.progress += (t.current - t.previous) * MILK_GAIN_MULT;
      }
      t.previous = t.current;
    }

    PVGame.setMoveNetworkSignalFloat(PLAYER_NET_ID, 'LeftTrigger', s.left.current);
    PVGame.setMoveNetworkSignalFloat(PLAYER_NET_ID, 'RightTrigger', s.right.current);
    PVGame.setMoveNetworkSignalFloat(COW_NET_ID, 'LeftTrigger', s.left.current);
    PVGame.setMoveNetworkSignalFloat(COW_NET_ID, 'RightTrigger', s.right.current);
    PVGame.setMoveNetworkSignalFloat(PLAYER_NET_ID, 'LeftReach', 1.0);
    PVGame.setMoveNetworkSignalFloat(PLAYER_NET_ID, 'RightReach', 1.0);
    PVGame.setMoveNetworkSignalFloat(COW_NET_ID, 'LeftReach', 1.0);
    PVGame.setMoveNetworkSignalFloat(COW_NET_ID, 'RightReach', 1.0);
    PVGame.setMoveNetworkSignalFloat(BUCKET_NET_ID, 'level', s.progress / BUCKET_FULL);
    const wobble = Math.max(s.left.current, s.right.current);
    PVGame.setMoveNetworkSignalFloat(BUCKET_NET_ID, 'WobbleAmount', wobble);

    // Periodic progress log.
    if (now - s.lastProgressLogMs > 1000) {
      console.log(
        `[milking-cow] progress=${s.progress.toFixed(1)} L=${s.left.current.toFixed(2)} R=${s.right.current.toFixed(2)}`,
      );
      s.lastProgressLogMs = now;
    }

    // Bucket full → request outro state on the player network. The outro
    // anim plays, fires GAMEFINISHED when done, which we detect below.
    if (s.progress >= BUCKET_FULL && !s.outroRequested) {
      s.progress = BUCKET_FULL;
      s.outroRequested = true;
      console.log(`[milking-cow] Bucket full! Requesting outro transition`);
      PVGame.requestMoveNetworkStateTransition(PLAYER_NET_ID, OUTRO_STATE);
      PVGame.requestMoveNetworkStateTransition(COW_NET_ID, OUTRO_STATE);
      PVCamera.setInactive(CAM_ID, 500);
    }

    // If outro was requested, watch for the GAMEFINISHED anim event.
    if (s.outroRequested && PVGame.hasMoveNetworkAnimEventFired(PLAYER_NET_ID, GAMEFINISHED_EVENT_HASH)) {
      console.log(`[milking-cow] GAMEFINISHED event fired — completing`);
      this.complete();
      return;
    }
  }

  private updateTrigger(t: TriggerState, analog: number, now: number): void {
    const isBinary = analog === 0 || analog === 1;
    if (isBinary) {
      if (analog > 0) {
        if (t.pressedAt === 0) t.pressedAt = now;
        t.current = Math.min(1, (now - t.pressedAt) / RAMP_MS);
      } else {
        t.pressedAt = 0;
        t.current = Math.max(0, t.current - DECAY_PER_FRAME);
      }
    } else {
      t.pressedAt = 0;
      t.current = analog;
    }
  }

  private async complete(): Promise<void> {
    const s = this.session;
    if (!s) return;

    console.log(`[milking-cow] Bucket full! Milk yielded: ${s.progress.toFixed(1)} units`);
    // TODO: emitServer('inventory.add-item', 'fresh_milk', 1) once the inventory path exists

    // Stop the tick before cleanup so we don't run any more frames.
    if (s.tickHandle) {
      clearTick(s.tickHandle);
      s.tickHandle = 0;
    }

    await Delay(500);
    this.cleanup();
  }

  cancel(): void {
    if (!this.session) return;
    console.log('[milking-cow] Cancelling session');
    if (this.session.tickHandle) {
      clearTick(this.session.tickHandle);
      this.session.tickHandle = 0;
    }
    ClearPedTasksImmediately(PVGame.playerPed(), false, true);
    this.cleanup();
  }

  private cleanup(): void {
    const s = this.session;
    if (!s) return;
    // Stop the move networks first — the manager handles ClearPedTasks on the
    // entities it owns.
    PVGame.stopMoveNetwork(PLAYER_NET_ID);
    PVGame.stopMoveNetwork(COW_NET_ID);
    PVGame.stopMoveNetwork(BUCKET_NET_ID);

    if (DoesEntityExist(s.stoolEntity)) PVBase.deleteEntity(s.stoolEntity);
    if (DoesEntityExist(s.bucketEntity)) PVBase.deleteEntity(s.bucketEntity);
    if (DoesEntityExist(s.cowEntity)) {
      FreezeEntityPosition(s.cowEntity, false);
      SetBlockingOfNonTemporaryEvents(s.cowEntity, false);
      SetEntityInvincible(s.cowEntity, false);
      SetPedCanLegIk(s.cowEntity, true);
      SetPedLegIkMode(s.cowEntity, 2);
      Entity(s.cowEntity).state.set('inUse', false, true);
    }
    // Restore the player's leg IK that we disabled before the network attached.
    SetPedCanLegIk(PVGame.playerPed(), true);
    SetPedLegIkMode(PVGame.playerPed(), 2);
    // Tear down the scripted camera.
    PVCamera.destroy(CAM_ID);
    // Restore default control context and player control.
    SetControlContext(0, GetHashKey('OnFoot'));
    SetPlayerControl(PlayerId(), true, 0, false);
    this.session = null;
  }
}

const milkingCowManager = MilkingCowManager.getInstance();
export default milkingCowManager;

on('milking:start', async (cowEntityId: number) => {
  await milkingCowManager.start(cowEntityId);
});

// Hot-reload safety: on resource stop, tear down the active milking session.
// The move-network manager's own onResourceStop handler will also fire and
// clean up any networks registered by this resource — defense in depth.
onResourceStop(() => {
  milkingCowManager.cancel();
});

onResourceInit('target', async () => {
  PVTarget.AddTarget({
    id: 'milking_cow',
    type: 'model',
    group: [GetHashKey('A_C_COW')],
    data: [
      {
        id: 'milking_cow',
        label: 'Milk Cow',
        icon: 'paw',
        event: 'milking:start',
      },
    ],
    options: {
      distance: 2.0,
      isEnabled(data) {
        console.log('[milking-cow] Target isEnabled check, data:', data);
        if (!data.entity) return false;
        if (milkingCowManager.isActive()) return false;
        return !Entity(data.entity).state.inUse;
      },
    },
  });
});

// Lock a freshly-spawned cow down so it can't flee or wander before milking
// starts. Some scene placements (e.g. inside the Beecher's Hope barn) are
// tight enough that the cow panics during the brief window between CreatePed
// and the first AI tick — by then it's already running. All these calls are
// synchronous and applied immediately after CreatePed returns, before any
// frame can elapse.
const lockDownCow = (cow: number) => {
  SetEntityInvincible(cow, true);
  SetBlockingOfNonTemporaryEvents(cow, true);
  ClearPedTasksImmediately(cow, false, false);
  TaskStandStill(cow, -1);
  SetPedKeepTask(cow, true);
  // Block panic/flee responses specifically — ConfigFlag 154 (CPED_CONFIG_FLAG_DontInfluenceWantedLevel)
  // and 252 (DontBlip) aren't relevant, but 32 (RagdollOnCollision) and 17 (DontStandStillSkipNetworking)
  // and 297 (DisableFleeFromIndirectThreats) are. Use 297 if available — defensive.
  SetPedConfigFlag(cow, 297, true);
  FreezeEntityPosition(cow, true);
};

// Spawn a test cow ~2.5m in front of the player, snapped to the ground.
RegisterCommand(
  'placeMilkingCow',
  async () => {
    const playerPed = PVGame.playerPed();
    const playerHeading = GetEntityHeading(playerPed);
    const inFrontCoords = Vector3.fromArray(GetOffsetFromEntityInWorldCoords(playerPed, 0, 2.5, 0));
    const [, groundZ] = GetGroundZFor_3DCoord(inFrontCoords.x, inFrontCoords.y, inFrontCoords.z + 1.0, false);
    const z = groundZ || inFrontCoords.z;
    const cowHeading = (playerHeading - 135) % 360;
    const cow = await PVGame.createPed('A_C_COW', inFrontCoords.x, inFrontCoords.y, z, cowHeading, true, true);
    // lockDownCow(cow);
    console.log('[milking-cow] Placed test cow:', cow);
  },
  false,
);

// Spawn the cow at the EXACT decomp coords for the Beecher's Hope milking
// scene. From milking_cow_launch.c scene table entry 21:
//   scene position = (-1603.485, -1414.838, 81.1)
//   scene heading  = -14.4°
// The cow's BODY faces 180° from sceneHeading (R*'s authoring convention:
// rear-end toward the player's milking spot). Confirmed empirically — cow
// at 165.6° with sceneHeading=-14.4° aligns perfectly visually.
RegisterCommand(
  'placeMilkingCowBeechers',
  async () => {
    const SCENE_X = -1603.485;
    const SCENE_Y = -1414.838;
    const SCENE_Z = 81.1;
    const SCENE_HEADING = -14.4;
    const COW_BODY_HEADING = SCENE_HEADING + 180; // = 165.6°

    // Cow position = sceneAnchor + offset(vLocal_0) rotated by sceneHeading.
    const cowPosRaw = GetOffsetFromCoordAndHeadingInWorldCoords(
      SCENE_X,
      SCENE_Y,
      SCENE_Z,
      SCENE_HEADING,
      COW_ANIM_OFFSET.x,
      COW_ANIM_OFFSET.y,
      COW_ANIM_OFFSET.z,
    );
    const cow = await PVGame.createPed(
      'A_C_COW',
      cowPosRaw[0],
      cowPosRaw[1],
      cowPosRaw[2],
      COW_BODY_HEADING,
      true,
      true,
    );
    lockDownCow(cow);
    // Record the authored scene heading on the cow. start() reads this and
    // uses it directly as sceneHeading — independent of the cow's physical
    // heading (which is rotated 180° from sceneHeading per R*'s convention).
    Entity(cow).state.set('milkingSceneHeading', SCENE_HEADING, true);
    console.log(
      `[milking-cow] Placed Beecher's Hope cow at (${cowPosRaw[0].toFixed(2)}, ${cowPosRaw[1].toFixed(2)}, ${cowPosRaw[2].toFixed(2)}) body=${COW_BODY_HEADING}° scene=${SCENE_HEADING}°`,
    );
  },
  false,
);

// Manually override the scene heading on the closest cow — useful for
// iterating on the scene-heading value without re-spawning. Usage:
//   /setMilkingHeading 0      (set to 0°)
//   /setMilkingHeading -14.4  (set to Beecher's Hope authored value)
RegisterCommand(
  'setMilkingHeading',
  (_source: number, args: string[]) => {
    if (args.length === 0) {
      console.log('[milking-cow] Usage: /setMilkingHeading <degrees>');
      return;
    }
    const heading = parseFloat(args[0]);
    if (isNaN(heading)) {
      console.log(`[milking-cow] Invalid heading: ${args[0]}`);
      return;
    }
    // Find nearest A_C_COW to player.
    const playerCoords = PVGame.playerCoords();
    const cows = GetGamePool('CPed');
    let nearest = 0;
    let nearestDist = Infinity;
    for (const ped of cows) {
      if (GetEntityModel(ped) !== GetHashKey('A_C_COW')) continue;
      const [px, py, pz] = GetEntityCoords(ped, false, false);
      const dx = px - playerCoords.x;
      const dy = py - playerCoords.y;
      const dz = pz - playerCoords.z;
      const d = dx * dx + dy * dy + dz * dz;
      if (d < nearestDist) {
        nearestDist = d;
        nearest = ped;
      }
    }
    if (!nearest) {
      console.log('[milking-cow] No A_C_COW found nearby');
      return;
    }
    Entity(nearest).state.set('milkingSceneHeading', heading, true);
    console.log(`[milking-cow] Set milkingSceneHeading=${heading}° on cow ${nearest}`);
  },
  false,
);

RegisterCommand(
  'cancelMilkingCow',
  () => {
    milkingCowManager.cancel();
  },
  false,
);
