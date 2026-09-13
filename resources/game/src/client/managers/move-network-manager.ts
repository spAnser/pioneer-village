import { Vector3 } from '@lib/math';

// Init-params struct layout for TaskMoveNetworkAdvancedByNameWithInitParams.
// Reverse-engineered from milking_cow.c lines 2146-2150 (8-byte field stride):
//   offset  0 (f_0)  — clipset hash (joaat)
//   offset  8 (f_1)  — default hash (joaat "DEFAULT")
//   offset 48 (f_6)  — float, blend-in speed (-1.0 = engine default)
//   offset 72 (f_9)  — float, blend-out speed (-1.0 = engine default)
//   offset 240 (f_30) — string pointer, initial state name (LITERAL_STRING)
// Total struct size: 31 fields × 8 bytes = 248 bytes.
const INIT_PARAMS_SIZE_BYTES = 512;
const INIT_PARAMS_OFFSET_CLIPSET = 0;
const INIT_PARAMS_OFFSET_DEFAULT = 8;
const INIT_PARAMS_OFFSET_BLEND_IN = 48;
const INIT_PARAMS_OFFSET_BLEND_OUT = 72;
const INIT_PARAMS_OFFSET_INITIAL_STATE = 240;

export interface MoveNetworkConfig {
  // Unique identifier the consumer chooses (used for all subsequent operations).
  id: string;
  // Ped or object the network attaches to.
  entity: number;
  // The move network definition name, e.g. 'script_mar5_milkcow_john'.
  networkDef: string;
  // Optional clipset to bind via init params, e.g. 'CLIPSET@MINI_GAMES@STORY@MAR5@MILK_COW'.
  // The manager will RequestClipSet + wait for it to load before attaching.
  clipSet?: string;
  // Optional anim dicts the network references. The manager will RequestAnimDict
  // + wait for each to load before attaching. Without this, the network may
  // attach but have no clips to play (first-attempt-fails-second-works race).
  animDicts?: string[];
  // Optional initial state name (the move network state to enter on attach).
  initialState?: string;
  // For TaskMoveNetworkAdvancedByNameWithInitParams: world position anchor.
  // Required if isAdvanced is true (default).
  anchorCoords?: { x: number; y: number; z: number };
  anchorRotation?: { x: number; y: number; z: number };
  // false → use TaskMoveNetworkByNameWithInitParams (no position arg, used for
  // objects like the milking bucket). Default true (uses Advanced).
  isAdvanced?: boolean;
  // Blend-in time when attaching the network (default 0.0 — instant).
  blendInTime?: number;
  // Final flag argument to the native — combined flag bits (default 128 = OFFSET_POSITION).
  // The decomp at line 2157 uses 128; at line 1189 of the simpler script uses 1154.
  flags?: number;
  // Max ms to wait for each asset to stream in (default 3000).
  loadTimeoutMs?: number;
}

interface ActiveMoveNetwork {
  config: MoveNetworkConfig;
  invokingResource: string;
  startedAt: number;
}

class MoveNetworkManager {
  protected static instance: MoveNetworkManager;

  static getInstance(): MoveNetworkManager {
    if (!MoveNetworkManager.instance) {
      MoveNetworkManager.instance = new MoveNetworkManager();
    }
    return MoveNetworkManager.instance;
  }

  private active = new Map<string, ActiveMoveNetwork>();
  private initialized = false;

  init() {
    if (this.initialized) return;
    this.initialized = true;
    // Cross-resource cleanup: when any resource stops, tear down any networks
    // it requested. Handles consumer hot-reloads automatically — the consumer
    // doesn't need to manually register cleanup. The current resource (game)
    // surviving means the manager state persists across consumer reloads.
    on('onResourceStop', (resource: string) => {
      this.stopAllForResource(resource);
    });
  }

  private async loadNetworkDef(name: string, timeoutMs: number): Promise<boolean> {
    if (HasMoveNetworkDefLoaded(name)) return true;
    RequestMoveNetworkDef(name);
    const start = GetGameTimer();
    while (!HasMoveNetworkDefLoaded(name)) {
      if (GetGameTimer() - start > timeoutMs) {
        console.warn(`[move-network] Network def "${name}" failed to load in ${timeoutMs}ms`);
        return false;
      }
      await new Promise((r) => setTimeout(r, 50));
    }
    return true;
  }

  private async loadClipSet(name: string, timeoutMs: number): Promise<boolean> {
    if (HasClipSetLoaded(name)) return true;
    RequestClipSet(name);
    const start = GetGameTimer();
    while (!HasClipSetLoaded(name)) {
      if (GetGameTimer() - start > timeoutMs) {
        console.warn(`[move-network] Clipset "${name}" failed to load in ${timeoutMs}ms`);
        return false;
      }
      await new Promise((r) => setTimeout(r, 50));
    }
    return true;
  }

  private async loadAnimDict(name: string, timeoutMs: number): Promise<boolean> {
    if (HasAnimDictLoaded(name)) return true;
    RequestAnimDict(name);
    const start = GetGameTimer();
    while (!HasAnimDictLoaded(name)) {
      if (GetGameTimer() - start > timeoutMs) {
        console.warn(`[move-network] Anim dict "${name}" failed to load in ${timeoutMs}ms`);
        return false;
      }
      await new Promise((r) => setTimeout(r, 50));
    }
    return true;
  }

  private diffStructBytes(id: string, beforeBytes: Uint8Array, afterView: DataView): void {
    const afterBytes = new Uint8Array(afterView.buffer);
    // Group changed bytes into contiguous 8-byte-aligned regions so the
    // output is readable as "this qword field changed from X to Y" rather
    // than a sea of individual bytes.
    const changedQwords: { offset: number; before: string; after: string }[] = [];
    for (let qword = 0; qword < beforeBytes.length; qword += 8) {
      let anyDiff = false;
      for (let i = 0; i < 8 && qword + i < beforeBytes.length; i++) {
        if (beforeBytes[qword + i] !== afterBytes[qword + i]) {
          anyDiff = true;
          break;
        }
      }
      if (!anyDiff) continue;
      const toHex = (bytes: Uint8Array, off: number) => {
        const parts: string[] = [];
        for (let i = 0; i < 8 && off + i < bytes.length; i++) {
          parts.push(bytes[off + i].toString(16).padStart(2, '0'));
        }
        return parts.join(' ');
      };
      changedQwords.push({
        offset: qword,
        before: toHex(beforeBytes, qword),
        after: toHex(afterBytes, qword),
      });
    }
    if (changedQwords.length === 0) {
      console.log(`[move-network] struct diff "${id}": no engine writes (struct is input-only)`);
      return;
    }
    console.log(`[move-network] struct diff "${id}": ${changedQwords.length} qword(s) changed by engine:`);
    for (const c of changedQwords) {
      // Decode the after-value as both uint32 (low 4 bytes) and float32 since
      // we don't know what type the engine wrote. Most milking-related fields
      // are hashes (uint32) or floats.
      const u32 = afterView.getUint32(c.offset, true);
      const f32 = afterView.getFloat32(c.offset, true);
      console.log(
        `  +${c.offset.toString().padStart(3)} (field f_${c.offset / 8}): ${c.before} → ${c.after}  ` +
          `u32=0x${u32.toString(16).toUpperCase()} f32=${f32.toFixed(4)}`,
      );
    }
  }

  private buildInitParams(clipSet?: string, initialState?: string): DataView {
    const buf = new DataView(new ArrayBuffer(INIT_PARAMS_SIZE_BYTES));
    // Hash fields are 32-bit unsigned, written into the low 4 bytes of their
    // 8-byte qword slot. The upper 4 bytes stay as the ArrayBuffer's default
    // zero. Using `>>> 0` to convert GetHashKey's signed int to unsigned —
    // many hashes have the high bit set (e.g. "DEFAULT" = 0xE4DF46D5) and
    // setBigInt64 on a negative BigInt would sign-extend to 8 bytes of FF.
    buf.setUint32(INIT_PARAMS_OFFSET_DEFAULT, GetHashKey('DEFAULT') >>> 0, true);
    if (clipSet) {
      buf.setUint32(INIT_PARAMS_OFFSET_CLIPSET, GetHashKey(clipSet) >>> 0, true);
    }
    // Blend speeds default to -1.0 (engine default) — matches sVar18.f_6/f_9 in decomp.
    buf.setFloat32(INIT_PARAMS_OFFSET_BLEND_IN, -1.0, true);
    buf.setFloat32(INIT_PARAMS_OFFSET_BLEND_OUT, -1.0, true);
    if (initialState) {
      // String pointer is a FULL 64-bit value (game runs 64-bit). Unlike the
      // 32-bit hash fields above, this needs all 8 bytes written. Matches
      // game-manager.ts:1149-1150 which uses setBigInt64 for VarString refs.
      // The earlier setUint32 truncation here corrupted the pointer and
      // caused the engine to fault dereferencing it.
      const stateRef = VarString(10, 'LITERAL_STRING', initialState);
      buf.setBigInt64(INIT_PARAMS_OFFSET_INITIAL_STATE, BigInt(stateRef), true);
    }
    return buf;
  }

  async start(config: MoveNetworkConfig): Promise<boolean> {
    if (!DoesEntityExist(config.entity)) {
      console.warn(`[move-network] start("${config.id}"): entity ${config.entity} does not exist`);
      return false;
    }
    if (this.active.has(config.id)) {
      console.warn(`[move-network] start("${config.id}"): already active — call stop() first`);
      return false;
    }

    const timeoutMs = config.loadTimeoutMs ?? 3000;
    // Load all referenced assets in parallel: the move-network def, the
    // optional clipset, and any optional anim dicts. Without these, the
    // network attaches but has no clips to play — visible as
    // "first-attempt-fails-second-works" (the second attempt finds the
    // assets cached from the first attempt's incidental triggering).
    const loadResults = await Promise.all([
      this.loadNetworkDef(config.networkDef, timeoutMs),
      config.clipSet ? this.loadClipSet(config.clipSet, timeoutMs) : Promise.resolve(true),
      ...(config.animDicts ?? []).map((dict) => this.loadAnimDict(dict, timeoutMs)),
    ]);
    if (!loadResults.every(Boolean)) {
      console.warn(`[move-network] start("${config.id}"): one or more assets failed to load`);
      return false;
    }

    const initParams = this.buildInitParams(config.clipSet, config.initialState);
    const isAdvanced = config.isAdvanced !== false;
    const flags = config.flags ?? 128;
    const blendIn = config.blendInTime ?? 0.0;

    // Snapshot the DataView contents BEFORE the native call. After the call
    // we'll diff against this to see if the engine wrote any bytes back —
    // useful for figuring out whether the struct is bidirectional, and if so,
    // which offsets the engine populates.
    const beforeBytes = new Uint8Array(initParams.byteLength);
    new Uint8Array(initParams.buffer).forEach((b, i) => {
      beforeBytes[i] = b;
    });

    // The auto-generated wrappers
    // (TaskMoveNetworkAdvancedByNameWithInitParams /
    // TaskMoveNetworkByNameWithInitParams) don't marshal the DataView struct
    // arg correctly — they just pass JS values raw to _in(), causing engine
    // faults. Using Citizen.invokeNative directly with the native hash gives
    // us proper struct + string marshaling, following the same pattern as
    // horses.ts:535-542 (which calls a struct-arg native this way).
    if (isAdvanced) {
      const pos = config.anchorCoords ?? { x: 0, y: 0, z: 0 };
      const rot = config.anchorRotation ?? { x: 0, y: 0, z: 0 };
      Citizen.invokeNative(
        '0x7b6a04f98bbafb2c',
        config.entity,
        config.networkDef,
        initParams,
        pos.x,
        pos.y,
        pos.z,
        rot.x,
        rot.y,
        rot.z,
        2, // rotation order — always 2 in the decomp
        blendIn,
        0,
        0,
        flags,
        0,
      );
    } else {
      // Non-advanced variant for object move networks like the bucket.
      // Decomp at milking_cow.c:2159:
      //   TASK_MOVE_NETWORK_BY_NAME_WITH_INIT_PARAMS(
      //     bucket, networkDef, &struct, 0.0f, false, animDict, flags)
      Citizen.invokeNative(
        '0x139805c2a67c4795',
        config.entity,
        config.networkDef,
        initParams,
        blendIn,
        false, // isAttached / bool
        config.clipSet ?? '',
        flags,
      );
    }

    // Diff the DataView contents AFTER the native call against the snapshot.
    // If any bytes changed, the struct is bidirectional and the engine wrote
    // back state we may need to read or initialize differently. We only log
    // offsets where bytes actually differ to keep output manageable on a
    // 512-byte struct.
    this.diffStructBytes(config.id, beforeBytes, initParams);

    // Force an immediate AI+animation update so the network attaches this frame
    // instead of waiting for the next natural tick. Matches decomp lines 2160-2162.
    if (IsEntityAPed(config.entity)) {
      ForcePedAiAndAnimationUpdate(config.entity, true, false);
    } else {
      ForceEntityAiAndAnimationUpdate(config.entity, true);
    }

    this.active.set(config.id, {
      config,
      invokingResource: GetInvokingResource() || GetCurrentResourceName(),
      startedAt: GetGameTimer(),
    });

    // Diagnostic: confirm the engine actually attached the network. We have
    // to wait for the task system to register the active task — checking
    // immediately after the native call returns "not active" even when the
    // network successfully attaches (the task takes a frame or two to
    // register as active in the task system's query path). Defer the check
    // to next tick + a few extra frames for safety.
    setTimeout(() => {
      if (!DoesEntityExist(config.entity)) {
        console.log(`[move-network] Started "${config.id}" — entity gone before active check`);
        return;
      }
      const isActive = IsTaskMoveNetworkActive(config.entity);
      const currentState = isActive ? GetTaskMoveNetworkState(config.entity) : '<not active>';
      console.log(
        `[move-network] "${config.id}" (${config.networkDef}) on entity ${config.entity} ` +
          `— active=${isActive} state="${currentState}" (checked after ~100ms)`,
      );
    }, 100);
    console.log(`[move-network] Started "${config.id}" (${config.networkDef}) on entity ${config.entity}`);
    return true;
  }

  setSignalFloat(id: string, signal: string, value: number): void {
    const net = this.active.get(id);
    if (!net) return;
    if (!DoesEntityExist(net.config.entity)) return;
    SetTaskMoveNetworkSignalFloat(net.config.entity, signal, value);
  }

  setSignalBool(id: string, signal: string, value: boolean): void {
    const net = this.active.get(id);
    if (!net) return;
    if (!DoesEntityExist(net.config.entity)) return;
    SetTaskMoveNetworkSignalBool(net.config.entity, signal, value);
  }

  setSignalVector(id: string, signal: string, x: number, y: number, z: number): void {
    const net = this.active.get(id);
    if (!net) return;
    if (!DoesEntityExist(net.config.entity)) return;
    SetTaskMoveNetworkSignalVector(net.config.entity, signal, x, y, z);
  }

  requestStateTransition(id: string, stateName: string): void {
    const net = this.active.get(id);
    if (!net) return;
    if (!DoesEntityExist(net.config.entity)) return;
    RequestTaskMoveNetworkStateTransition(net.config.entity, stateName);
  }

  getEvent(id: string, eventName: string): boolean {
    const net = this.active.get(id);
    if (!net) return false;
    if (!DoesEntityExist(net.config.entity)) return false;
    return GetTaskMoveNetworkEvent(net.config.entity, eventName);
  }

  hasAnimEventFired(id: string, eventHash: number): boolean {
    const net = this.active.get(id);
    if (!net) return false;
    if (!DoesEntityExist(net.config.entity)) return false;
    return HasAnimEventFired(net.config.entity, eventHash);
  }

  isActive(id: string): boolean {
    const net = this.active.get(id);
    if (!net) return false;
    if (!DoesEntityExist(net.config.entity)) return false;
    return IsTaskMoveNetworkActive(net.config.entity);
  }

  isReadyForTransition(id: string): boolean {
    const net = this.active.get(id);
    if (!net) return false;
    if (!DoesEntityExist(net.config.entity)) return false;
    return IsTaskMoveNetworkReadyForTransition(net.config.entity);
  }

  stop(id: string): void {
    const net = this.active.get(id);
    if (!net) return;
    if (DoesEntityExist(net.config.entity) && IsEntityAPed(net.config.entity)) {
      ClearPedTasks(net.config.entity, false, false);
    }
    this.active.delete(id);
    // Best-effort: remove the network def to free streaming. Safe to call
    // even if the def is still referenced by other active networks — the
    // engine refcounts these.
    RemoveMoveNetworkDef(net.config.networkDef);
    console.log(`[move-network] Stopped "${id}"`);
  }

  stopAll(): void {
    for (const id of Array.from(this.active.keys())) {
      this.stop(id);
    }
  }

  stopAllForResource(resourceName: string): void {
    const toStop: string[] = [];
    for (const [id, net] of this.active.entries()) {
      if (net.invokingResource === resourceName) {
        toStop.push(id);
      }
    }
    if (toStop.length > 0) {
      console.log(`[move-network] Resource "${resourceName}" stopping — tearing down ${toStop.length} network(s)`);
      for (const id of toStop) this.stop(id);
    }
  }
}

const moveNetworkManager = MoveNetworkManager.getInstance();
moveNetworkManager.init();

export default moveNetworkManager;
