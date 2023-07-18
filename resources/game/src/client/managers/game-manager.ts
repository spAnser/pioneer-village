import Timer = NodeJS.Timer;
import { Vector3 } from '@lib/math/vector3';
import { AnimFlag } from '@lib/flags';
import { Delay } from '@lib/functions';

class GameManager {
  protected static instance: GameManager;

  static getInstance(): GameManager {
    if (!GameManager.instance) {
      GameManager.instance = new GameManager();
    }
    return GameManager.instance;
  }

  _interval: Timer;

  protected _playerId: number = PlayerId();
  protected _playerPed: number = PlayerPedId();
  protected _playerIsAnimal: boolean = false;
  protected _playerCoords: Vector3;
  protected _mountPed: number | null = null;
  protected _characterId: number | null = null;
  protected _inventoryId: number | null = null;
  protected _target: number | null = null;
  protected _targetIsHorse = false;
  protected _targetIsVehicle = false;
  protected _animWalkTick: number | null = null;
  protected _limitSpeedTick: number | null = null;
  protected _movementSpeed: number | null = null;

  protected _animLoopTasks: Map<string, Anim.LoopInfo> = new Map();

  private constructor() {
    on('target:changed', (target: number, type: number, coord: Vector3) => {
      this.handleTargetChange(target, type, coord);
    });

    this.playerId = PlayerId();
    this.playerPed = GetPlayerPed(this.playerId);
    this._playerCoords = Vector3.fromArray(GetEntityCoords(this.playerPed, false));
    this.mountPed = GetMount(this.playerPed);

    this._interval = setInterval(() => {
      this.playerPed = GetPlayerPed(this.playerId);
      this.playerIsAnimal = GetIsAnimal(this.playerPed);
      this._playerCoords.setFromArray(GetEntityCoords(this.playerPed, false));
      this.mountPed = GetMount(this.playerPed);
      this._movementSpeed = GetPedDesiredMoveBlendRatio(this.playerPed);
    }, 5000);

    onNet('game:character-selected', (charId: number) => {
      this.playerPed = GetPlayerPed(this.playerId);
      this._characterId = charId;
      this._playerCoords.setFromArray(GetEntityCoords(this.playerPed, false));
      this.mountPed = GetMount(this.playerPed);
    });
  }

  get playerId(): number {
    return this._playerId;
  }
  set playerId(id: number) {
    this._playerId = id;
  }

  get playerPed(): number {
    return this._playerPed;
  }
  set playerPed(ped: number) {
    if (this._playerPed !== ped && DoesEntityExist(ped)) {
      this._playerPed = ped;
      this._characterId = DecorGetInt(ped, 'CID');
      this._inventoryId = DecorGetInt(ped, 'Inventory');
    }
  }

  get mountPed(): number | null {
    return this._mountPed;
  }
  set mountPed(ped: number | null) {
    if (this._mountPed !== ped) {
      this._mountPed = ped;
    }
  }

  get playerIsAnimal(): boolean {
    return this._playerIsAnimal;
  }
  set playerIsAnimal(isAnimal: boolean) {
    this._playerIsAnimal = isAnimal;
  }

  get playerCoords(): Vector3 {
    return this._playerCoords;
  }

  get characterId(): number | null {
    return this._characterId;
  }

  get movementSpeed(): number | null {
    return this._movementSpeed;
  }

  get inventoryId(): number | null {
    return this._inventoryId;
  }

  get target(): number | null {
    return this._target;
  }

  get targetIsHorse(): boolean {
    return this._targetIsHorse;
  }

  get targetIsVehicle(): boolean {
    return this._targetIsVehicle;
  }

  updatePlayerCoords(): void {
    this._playerCoords.setFromArray(GetEntityCoords(this.playerPed, false));
  }

  getInventoryIdForEntity(entity: number): number | void {
    if (entity) {
      return DecorGetInt(entity, 'Inventory');
    }
  }

  registerNetworkEntity(entity: number): Promise<void> {
    return new Promise((resolve) => {
      const networkInterval = setInterval(() => {
        if (!NetworkGetEntityIsNetworked(entity)) {
          NetworkRegisterEntityAsNetworked(entity);
        } else {
          clearInterval(networkInterval);
          resolve();
        }
      }, 50);
    });
  }

  async getNetworkControlOfAnimScene(entity: number): Promise<void> {
    do {
      NetworkRequestControlOfAnimScene(entity);
      await Delay(5);
    } while (!NetworkHasControlOfAnimScene(entity));
  }

  async getNetworkControlOfEntity(entity: number): Promise<void> {
    do {
      NetworkRequestControlOfEntity(entity);
      await Delay(5);
    } while (!NetworkHasControlOfEntity(entity));
  }

  async getNetworkControlOfNetworkId(entity: number): Promise<void> {
    do {
      NetworkRequestControlOfNetworkId(entity);
      await Delay(5);
    } while (!NetworkHasControlOfNetworkId(entity));
  }

  async getNetworkControlOfPickupPlacement(entity: number): Promise<void> {
    do {
      NetworkRequestControlOfPickupPlacement(entity);
      await Delay(5);
    } while (!NetworkHasControlOfPickupPlacement(entity));
  }

  async deleteEntity(entity: number): Promise<void> {
    if (!DoesEntityExist(entity)) {
      return;
    }
    if (NetworkGetEntityIsNetworked(entity)) {
      await this.getNetworkControlOfEntity(entity);
    }

    await Delay(5);
    SetEntityAsMissionEntity(entity, true, true);

    await Delay(5);
    if (IsEntityAPed(entity)) {
      DeletePed(entity);
    }

    await Delay(5);
    console.log(`DeleteEntity(${entity})`);
    DeleteEntity(entity);

    await Delay(10);
    if (DoesEntityExist(entity)) {
      SetEntityAsMissionEntity(entity, false, false);

      await Delay(5);
      SetEntityCoords(entity, -10000.0, -10000.0, 0.0, 0.0, 0.0, 0.0, false);
    }
  }

  async reachedCoords(destCoords: Vector3Format, distance = 0.51, timeout = 10000): Promise<boolean> {
    let resolver: (value?: unknown) => void;
    let rejecter: () => void;
    const distancePromise = new Promise((resolve, reject) => {
      resolver = resolve;
      rejecter = reject;
    });
    const distanceInterval = setInterval(() => {
      const coords = Vector3.fromArray(GetEntityCoords(this.playerPed, false, false));
      coords.z -= 1;
      if (coords.getDistance(destCoords) <= distance) {
        resolver();
      }
    }, 100);
    const distanceTimeout = setTimeout(() => {
      rejecter();
    }, timeout);
    let success = false;
    try {
      await distancePromise;
      success = true;
    } catch (e) {}
    clearTimeout(distanceTimeout);
    clearInterval(distanceInterval);
    return success;
  }

  handleTargetChange(target: number, type: number, coord: Vector3): void {
    // console.log('target:changed', target, type, coord)
    this._target = target;
    this._targetIsHorse = false;
    this._targetIsVehicle = false;
    switch (type) {
      case 1:
        // console.log('handleTargetPed', target, type)
        this.handleTargetPed(target, type, coord);
        break;
      case 2:
        this.handleTargetVehicle(target, type, coord);
        break;
      case 3:
        this.handleTargetObject(target, type, coord);
        break;
      default:
      // Nothing
    }
  }

  handleTargetPed(target: number, type: number, coord: Vector3): void {
    // console.log('PED', target, GetPedType(target), type, coord)
    this._targetIsHorse = IsThisModelAHorse(GetEntityModel(target));
  }

  handleTargetVehicle(target: number, type: number, coord: Vector3): void {
    // console.log('VEHICLE', target, type, coord)
    this._targetIsVehicle = true;
  }

  handleTargetObject(target: number, type: number, coord: Vector3): void {
    // console.log('OBJECT', target, type, coord)
  }

  isHorse(target: number): boolean {
    return IsThisModelAHorse(GetEntityModel(target));
  }

  async createPed(
    model: string,
    x: number,
    y: number,
    z: number,
    heading = 0.0,
    randomOutfit = true,
    networked = false,
  ): Promise<number> {
    await this.loadModel(GetHashKey(model));
    const ped = CreatePed(model, x, y, z, heading, networked, true, false, false);
    if (randomOutfit) {
      SetRandomOutfitVariation(ped, true);
    }
    await this.pedIsReadyToRender(ped);
    return ped;
  }

  async pedIsReadyToRender(ped: number, delay = 125): Promise<void> {
    if (!IsEntityAPed(ped)) {
      return;
    }
    return new Promise((resolve) => {
      if (IsPedReadyToRender(ped)) {
        resolve();
      } else {
        const pedLoadedCheck = setInterval(() => {
          if (IsPedReadyToRender(ped)) {
            resolve();
            clearInterval(pedLoadedCheck);
          }
        }, delay);
      }
    });
  }

  async setPlayerModel(model: string | number): Promise<number> {
    if (typeof model === 'string') {
      model = GetHashKey(model);
    }
    await this.loadModel(model);
    SetPlayerModel(this.playerId, model, true);
    this.playerPed = PlayerPedId();
    SetPedConfigFlag(this.playerPed, 409, true);
    return this.playerPed;
  }

  async setPedComponents(ped: number, components: number[]): Promise<void> {
    if (!IsEntityAPed(ped)) {
      return;
    }
    for (const component of components) {
      ApplyShopItemToPed(ped, component, false, false, false);
      await Delay(1);
    }
  }

  async setPedComponentsMp(ped: number, components: number[]): Promise<void> {
    if (!IsEntityAPed(ped)) {
      return;
    }
    for (const component of components) {
      ApplyShopItemToPed(ped, component, false, true, false);
      await Delay(1);
    }
  }

  finalizePedOutfit(ped: number): void {
    N_0x704c908e9c405136(ped);
    UpdatePedVariation(ped, false, true, true, true, false);
  }

  async loadTexture(textureId: number, delay = 250): Promise<void> {
    if (IsTextureValid(textureId)) {
      return;
    }
    return new Promise((resolve) => {
      if (IsTextureValid(textureId)) {
        resolve();
      } else {
        const textureLoadedCheck = setInterval(() => {
          if (IsTextureValid(textureId)) {
            resolve();
            clearInterval(textureLoadedCheck);
          }
        }, delay);
      }
    });
  }

  async loadModel(hash: number | string, delay = 250): Promise<void> {
    if (typeof hash === 'string') {
      hash = GetHashKey(hash);
    }
    if (HasModelLoaded(hash) || !IsModelValid(hash)) {
      return;
    }
    return new Promise((resolve) => {
      RequestModel(hash, false);
      if (HasModelLoaded(hash)) {
        resolve();
      } else {
        const modelLoadedCheck = setInterval(() => {
          if (HasModelLoaded(hash)) {
            resolve();
            clearInterval(modelLoadedCheck);
          }
        }, delay);
      }
    });
  }

  async requestTxd(txd: string | number, delay = 250): Promise<void> {
    if (HasStreamedTxdLoaded(txd)) {
      return;
    }
    return new Promise((resolve) => {
      RequestStreamedTxd(txd, false);
      if (HasStreamedTxdLoaded(txd)) {
        resolve();
      } else {
        const txdLoadedCheck = setInterval(() => {
          if (HasStreamedTxdLoaded(txd)) {
            resolve();
            clearInterval(txdLoadedCheck);
          }
        }, delay);
      }
    });
  }

  async collisionLoadedAtEntity(entity: number): Promise<void> {
    if (HasCollisionLoadedAroundEntity(entity)) {
      return;
    }
    return new Promise((resolve) => {
      const collisionLoadedCheck = setInterval(() => {
        if (HasCollisionLoadedAroundEntity(entity)) {
          resolve();
          clearInterval(collisionLoadedCheck);
        }
      }, 250);
    });
  }

  async loadModelByName(name: string): Promise<void> {
    await this.loadModel(GetHashKey(name));
  }

  async loadStream(streamSet: string, streamName: string, delay = 250, maxTries = 20): Promise<boolean> {
    if (LoadStream(streamName, streamSet)) {
      return true;
    }
    return new Promise((resolve) => {
      let tries = 0;
      const modelLoadedCheck = setInterval(() => {
        if (LoadStream(streamName, streamSet)) {
          resolve(true);
          clearInterval(modelLoadedCheck);
        }
        tries++;
        if (tries >= maxTries) {
          resolve(false);
          clearInterval(modelLoadedCheck);
        }
      }, delay);
    });
  }

  async playStreamFromPed(ped: number, streamSet: string, streamName: string): Promise<void> {
    await this.loadStream(streamSet, streamName);
    PlayStreamFromPed(ped, GetLoadedStreamIdFromCreation(streamName, streamSet));
  }

  stopStream(streamSet: string, streamName: string) {
    StopStream(GetLoadedStreamIdFromCreation(streamName, streamSet));
  }

  requestFlowblock(flowblock: number, delay = 250): Promise<number> {
    const flowblockId = UiflowblockRequest(flowblock);
    return new Promise((resolve) => {
      if (UiflowblockIsLoaded(flowblockId)) {
        resolve(flowblockId);
      } else {
        const flowblockLoadedCheck = setInterval(() => {
          if (UiflowblockIsLoaded(flowblockId)) {
            resolve(flowblockId);
            clearInterval(flowblockLoadedCheck);
          }
        }, delay);
      }
    });
  }

  createStateMachine(id: number, flowblock: number) {
    if (!UiStateMachineExists(id)) {
      UiStateMachineCreate(id, flowblock);
    }
  }

  destroyStateMachine(id: number) {
    if (UiStateMachineExists(id)) {
      UiStateMachineDestroy(id);
    }
  }

  async loadAnimDict(hash: string, delay = 250): Promise<void> {
    if (HasAnimDictLoaded(hash)) {
      return;
    }
    return new Promise((resolve) => {
      RequestAnimDict(hash);
      if (HasAnimDictLoaded(hash)) {
        resolve();
      } else {
        const animDictLoadedCheck = setInterval(() => {
          if (HasAnimDictLoaded(hash)) {
            resolve();
            clearInterval(animDictLoadedCheck);
          }
        }, delay);
      }
    });
  }

  setAnimWalk(animWalk: Anim.Walk): void {
    this.clearAnimWalk();
    let isStanding = false;
    let isWalking = false;
    let isRunning = false;
    if (!animWalk.running) {
      animWalk.running = animWalk.walking;
    }

    let lastGameTime = GetGameTimer();
    this._animWalkTick = setTick(() => {
      const gameTime = GetGameTimer();
      const delta = (gameTime - lastGameTime) / 1000;
      lastGameTime = gameTime;
      let updateAnim = false;
      const inputUp =
        IsControlPressed(0, GetHashKey('INPUT_MOVE_UP_ONLY')) &&
        !IsControlPressed(0, GetHashKey('INPUT_MOVE_DOWN_ONLY'));
      const inputDown =
        IsControlPressed(0, GetHashKey('INPUT_MOVE_DOWN_ONLY')) &&
        !IsControlPressed(0, GetHashKey('INPUT_MOVE_UP_ONLY'));
      const inputLeft =
        IsControlPressed(0, GetHashKey('INPUT_MOVE_LEFT_ONLY')) &&
        !IsControlPressed(0, GetHashKey('INPUT_MOVE_RIGHT_ONLY'));
      const inputRight =
        IsControlPressed(0, GetHashKey('INPUT_MOVE_RIGHT_ONLY')) &&
        !IsControlPressed(0, GetHashKey('INPUT_MOVE_LEFT_ONLY'));
      const requestingMovement = inputUp || inputDown || inputLeft || inputRight;

      const requestingRunning = IsControlPressed(0, GetHashKey('INPUT_SPRINT'));
      if (requestingMovement && requestingRunning && !isRunning) {
        isStanding = false;
        isWalking = false;
        isRunning = true;
        updateAnim = true;
      } else if (requestingMovement && !requestingRunning && !isWalking) {
        isStanding = false;
        isWalking = true;
        isRunning = false;
        updateAnim = true;
      } else if (!requestingMovement && !isStanding) {
        isStanding = true;
        isWalking = false;
        isRunning = false;
        updateAnim = true;
      }
      const currentAnim = isRunning ? animWalk.running : isWalking ? animWalk.walking : animWalk.standing;

      if (requestingMovement && ((currentAnim?.flags ?? 0) & AnimFlag.ENABLE_PLAYER_CONTROL) === 0) {
        let camRelativeHeading = GetGameplayCamRelativeHeading();
        const currentHeading = GetEntityHeading(this.playerPed);

        if (inputLeft && inputUp) {
          camRelativeHeading += 45;
        } else if (inputRight && inputUp) {
          camRelativeHeading -= 45;
        } else if (inputLeft && inputDown) {
          camRelativeHeading += 135;
        } else if (inputRight && inputDown) {
          camRelativeHeading -= 135;
        } else if (inputLeft) {
          if (camRelativeHeading > 90) {
            camRelativeHeading -= 270;
          } else {
            camRelativeHeading += 90;
          }
        } else if (inputRight) {
          if (camRelativeHeading < -90) {
            camRelativeHeading += 270;
          } else {
            camRelativeHeading -= 90;
          }
        } else if (inputDown) {
          if (camRelativeHeading < 0) {
            camRelativeHeading += 180;
          } else {
            camRelativeHeading -= 180;
          }
        }

        if (Math.abs(currentHeading - camRelativeHeading) > 1) {
          const newHeading = currentHeading + camRelativeHeading * delta;
          SetEntityHeading(this.playerPed, newHeading % 360);
        }
      }

      if (updateAnim || !GetIsTaskActive(this.playerPed, 3)) {
        this.taskPlayAnim({
          dict: currentAnim?.dict ?? '',
          anim: currentAnim?.anim ?? '',
          flags: currentAnim?.flags ?? AnimFlag.REPEAT,
          blendInSpeed: 1.0,
          blendOutSpeed: -1.0,
        });
      }
    });
  }

  clearAnimWalk(): void {
    if (this._animWalkTick) {
      clearTick(this._animWalkTick);
      this._animWalkTick = null;
      ClearPedTasks(this.playerPed, false, false);
    }
  }

  async taskPlayAnim(animTask: Anim.Task): Promise<void> {
    if (!DoesAnimDictExist(animTask.dict)) {
      return;
    }
    await this.loadAnimDict(animTask.dict);
    const animName = Array.isArray(animTask.anim)
      ? animTask.anim[Math.floor(Math.random() * animTask.anim.length)]
      : animTask.anim;
    // console.log(animName);
    if (animTask.speed) {
      console.warn('Deprecated: speed is no longer supported use blendInSpeed');
      animTask.blendInSpeed = animTask.speed;
    }
    if (animTask.speedMultiplier) {
      console.warn('Deprecated: speedMultiplier is no longer supported use blendOutSpeed');
      animTask.blendOutSpeed = animTask.speedMultiplier;
    }
    if (animTask.onStart) {
      animTask.onStart(animTask.dict, animName);
    }
    TaskPlayAnim(
      animTask.entity ?? this.playerPed,
      animTask.dict,
      animName,
      animTask.blendInSpeed ?? 1.0,
      animTask.blendOutSpeed ?? -1.0,
      animTask.duration ?? -1,
      animTask.flags ?? 0,
      animTask.delta ?? 0.0,
      false,
      0,
      false,
      0,
      false,
    );
    await Delay(animTask.duration ?? GetAnimDuration(animTask.dict, animName) * 1000 * (1 - (animTask?.delta ?? 0)));
  }

  async taskPlayAnimArray(anims: [string, string | string[], number?, number?][], ped = this.playerPed): Promise<void> {
    for (const anim of anims) {
      await this.loadAnimDict(anim[0]);
      const animName = Array.isArray(anim[1]) ? anim[1][Math.floor(Math.random() * anim[1].length)] : anim[1];
      TaskPlayAnim(ped, anim[0], animName, 1.0, -1.0, anim[3] ?? -1, anim[2] ?? 0, 0.0, false, 0, false, 0, false);
      await Delay(anim[3] ?? GetAnimDuration(anim[0], animName) * 1000);
    }
  }

  handleAnimTaskEntities(dict: string, animName: string, entities: Anim.AdvTaskEntity[], duration?: number) {
    for (const entityTask of entities) {
      let entityAnimName = '';
      if (entityTask.prefix) {
        entityAnimName = `${entityTask.prefix}${animName}`;
      }
      if (entityTask.suffix) {
        entityAnimName = `${animName}${entityTask.suffix}`;
      }
      this.taskPlayEntityAnim([
        {
          obj: entityTask.obj,
          dict: dict,
          anim: entityAnimName,
          duration,
          flags: entityTask.flags,
        },
      ]);
    }
  }

  async playAnimTask(animTask: Anim.Task, ped = this.playerPed): Promise<void> {
    await this.loadAnimDict(animTask.dict);
    for (let r = animTask.repeat ?? 1; r--; ) {
      const animName = Array.isArray(animTask.anim)
        ? animTask.anim[Math.floor(Math.random() * animTask.anim.length)]
        : animTask.anim;
      if (animTask.entities) {
        this.handleAnimTaskEntities(animTask.dict, animName, animTask.entities, animTask.duration);
      }
      // console.log('animTask.flags', animTask.flags);

      if (animTask.speed) {
        console.warn('Deprecated: speed is no longer supported use blendInSpeed');
        animTask.blendInSpeed = animTask.speed;
      }
      if (animTask.speedMultiplier) {
        console.warn('Deprecated: speedMultiplier is no longer supported use blendOutSpeed');
        animTask.blendOutSpeed = animTask.speedMultiplier;
      }
      TaskPlayAnim(
        animTask.entity || ped,
        animTask.dict,
        animName,
        animTask.blendInSpeed ?? 1.0,
        animTask.blendOutSpeed ?? -1.0,
        animTask.duration ?? -1,
        animTask.flags ?? 0,
        animTask.delta ?? 0.0,
        false,
        0,
        false,
        0,
        false,
      );
      if (animTask.onStart) {
        animTask.onStart(animName, animTask.dict);
      }
      await Delay(animTask.duration ?? GetAnimDuration(animTask.dict, animName) * 1000);
    }
    if (animTask.onEnd) {
      animTask.onEnd();
    }
  }

  async taskPlayAnimArrayNew(animTasks: Anim.Task | Anim.Task[], ped = this.playerPed): Promise<void> {
    if (Array.isArray(animTasks)) {
      for (const animTask of animTasks) {
        await this.playAnimTask(animTask, ped);
      }
    } else {
      await this.playAnimTask(animTasks, ped);
    }
  }

  taskStartAnimLoop(start: Anim.Task, loop: Anim.Task | Anim.Task[], end?: Anim.Task, ped = this.playerPed): string {
    let id;
    do {
      id = Math.round(Math.random() * 0xffff).toString(24);
    } while (this._animLoopTasks.has(id));
    this._animLoopTasks.set(id, { start, loop, end, ped, active: true });

    (async () => {
      await this.taskPlayAnimArrayNew(start, ped);
      this.taskNextAnimLoop(id);
    })();

    return id;
  }

  async taskNextAnimLoop(id: string): Promise<void> {
    const animLoopTask = this._animLoopTasks.get(id);
    if (!animLoopTask || !animLoopTask.active) {
      return;
    }
    const loopAnim = Array.isArray(animLoopTask.loop)
      ? animLoopTask.loop[Math.floor(Math.random() * animLoopTask.loop.length)]
      : animLoopTask.loop;
    await this.taskPlayAnimArrayNew(loopAnim, animLoopTask.ped);
    if (animLoopTask.active) {
      this.taskNextAnimLoop(id);
    }
  }

  async taskEndAnimLoop(id: string, end?: Anim.Task): Promise<void> {
    const animLoopTask = this._animLoopTasks.get(id);
    if (!animLoopTask) {
      return;
    }
    animLoopTask.active = false;
    const endLoopAnimTask = end || animLoopTask.end;
    if (endLoopAnimTask) {
      ClearPedTasks(animLoopTask.ped, false, false);
      await this.taskPlayAnimArrayNew(endLoopAnimTask, animLoopTask.ped);
    }
    this._animLoopTasks.delete(id);
  }

  async taskPlayAnimSequence(animTasks: Anim.AdvTask[]): Promise<number> {
    const sequenceId = OpenSequenceTask();

    for (const animTask of animTasks) {
      await this.loadAnimDict(animTask.dict);
      const animName = Array.isArray(animTask.anim)
        ? animTask.anim[Math.floor(Math.random() * animTask.anim.length)]
        : animTask.anim;
      TaskPlayAnim(
        0,
        animTask.dict,
        animName,
        1.0,
        -1.0,
        animTask.duration ?? -1,
        animTask.flags ?? 0,
        0.0,
        false,
        0,
        false,
        0,
        false,
      );
      // TaskPause(0, anim[3])
    }
    CloseSequenceTask(sequenceId);
    TaskPerformSequence(this.playerPed, sequenceId);
    ClearSequenceTask();
    return sequenceId;
  }

  async taskPlayEntityAnim(anims: Anim.EntityTask[]) {
    for (const anim of anims) {
      await this.loadAnimDict(anim.dict);
      const animName = Array.isArray(anim.anim) ? anim.anim[Math.floor(Math.random() * anim.anim.length)] : anim.anim;
      const entityId = typeof anim.obj === 'function' ? anim.obj() : anim.obj;
      if (anim.position) {
        SetEntityCoords(entityId, anim.position.x, anim.position.y, anim.position.z, 0, 0, 0, false);
      }
      if (anim.rotation) {
        SetEntityRotation(entityId, anim.rotation.x, anim.rotation.y, anim.rotation.z, 0);
      }
      PlayEntityAnim(
        entityId,
        animName,
        anim.dict,
        1.0,
        anim.loop ?? false,
        anim.stayInAnim ?? true,
        false,
        anim.delta ?? 0.0,
        anim.flags ?? 0,
      );
      if (anim.duration) {
        setTimeout(() => {
          console.log(entityId, animName, anim.dict, 0);
          StopEntityAnim(entityId, animName, anim.dict, 0);
        }, anim.duration);
      }
    }
  }

  async taskPlayAnimAdvArray2(animTasks: Anim.AdvTask[], freeze = false): Promise<void> {
    if (freeze) {
      FreezeEntityPosition(this.playerPed, true);
    }
    ClearPedTasksImmediately(this.playerPed, true, true);
    for (const animTask of animTasks) {
      await this.loadAnimDict(animTask.dict);
      const animName = Array.isArray(animTask.anim)
        ? animTask.anim[Math.floor(Math.random() * animTask.anim.length)]
        : animTask.anim;
      if (animTask.onStart) {
        animTask.onStart(animName, animTask.dict);
      }
      if (animTask.entities) {
        this.handleAnimTaskEntities(animTask.dict, animName, animTask.entities, animTask.duration);
      }
      const coords = animTask.coords ?? Vector3.fromArray(GetEntityCoords(gameManager.playerPed, false));
      const rotation = animTask.rotation ?? Vector3.fromArray(GetEntityRotation(gameManager.playerPed, 2));
      TaskPlayAnimAdvanced(
        this.playerPed,
        animTask.dict,
        animName,
        coords.x,
        coords.y,
        coords.z,
        rotation.x,
        rotation.y,
        rotation.z,
        animTask.blendInSpeed ?? 1.0,
        animTask.blendOutSpeed ?? -1.0,
        animTask.duration ?? -1,
        animTask.flags ?? 0,
        animTask.delta ?? 0.0,
        2,
        0,
        0,
      );
      if (animTask.additional) {
        for (const addAnimTask of animTask.additional) {
          PlayEntityAnim(
            typeof addAnimTask.obj === 'function' ? addAnimTask.obj() : addAnimTask.obj,
            addAnimTask.suffix ? `${animTask.anim}${addAnimTask.suffix}` : addAnimTask.anim ?? '',
            addAnimTask.dict ?? animTask.dict,
            1.0,
            addAnimTask.loop ?? false,
            addAnimTask.stayInAnim ?? true,
            false,
            addAnimTask.delta ?? animTask.delta ?? 0.0,
            addAnimTask.flags ?? 0,
          );
        }
      }
      await Delay(animTask.duration ?? GetAnimDuration(animTask.dict, animName) * 1000 - 1);
    }
    if (freeze) {
      FreezeEntityPosition(this.playerPed, false);
    }
  }

  getAnimOffset(
    animDict: string,
    animName: string,
    coords: Vector3 | Vector3Format,
    rotation: Vector3 | Vector3Format,
  ): [Vector3, Vector3] {
    const animCoords = Vector3.fromArray(
      GetAnimInitialOffsetPosition(
        animDict,
        animName,
        coords.x,
        coords.y,
        coords.z,
        rotation.x,
        rotation.y,
        rotation.z,
        0.0,
        2,
      ),
    );
    const animRot = Vector3.fromArray(
      GetAnimInitialOffsetRotation(
        animDict,
        animName,
        coords.x,
        coords.y,
        coords.z,
        rotation.x,
        rotation.y,
        rotation.z,
        0.0,
        2,
      ),
    );
    console.log(animCoords, animRot);
    return [animCoords, animRot];
  }

  async taskPlayAnimAdvArray(
    coords: Vector3Format,
    rotation: Vector3Format,
    animTasks: Anim.AdvTask[],
    freeze = false,
    animPed = this.playerPed,
  ): Promise<void> {
    if (freeze) {
      FreezeEntityPosition(animPed, true);
    }
    ClearPedTasksImmediately(animPed, true, true);
    let l = 0;
    for (const animTask of animTasks) {
      await this.loadAnimDict(animTask.dict);
      const animName = Array.isArray(animTask.anim)
        ? animTask.anim[Math.floor(Math.random() * animTask.anim.length)]
        : animTask.anim;
      if (animTask.onStart) {
        animTask.onStart(animName, animTask.dict);
      }
      if (animTask.entities) {
        this.handleAnimTaskEntities(animTask.dict, animName, animTask.entities, animTask.duration);
      }
      const [animCoords, animRot] =
        ((animTask?.flags ?? 0) & AnimFlag.OFFSET_POSITION) === AnimFlag.OFFSET_POSITION
          ? [coords, rotation]
          : l === 0
          ? this.getAnimOffset(animTask.dict, animName, coords, rotation)
          : [Vector3.fromArray(GetEntityCoords(animPed, false)), Vector3.fromArray(GetEntityRotation(animPed, 2))];
      TaskPlayAnimAdvanced(
        animPed,
        animTask.dict,
        animName,
        animCoords.x,
        animCoords.y,
        animCoords.z,
        animRot.x,
        animRot.y,
        animRot.z,
        animTask.blendInSpeed ?? 1.0,
        animTask.blendOutSpeed ?? -1.0,
        animTask.duration ?? -1,
        animTask.flags ?? 0,
        animTask.delta ?? 0.0,
        2,
        1,
        0,
      );
      if (animTask.additional) {
        for (const addAnimTask of animTask.additional) {
          const addAnimTaskObj = typeof addAnimTask.obj === 'function' ? addAnimTask.obj() : addAnimTask.obj;
          const addAnimTaskAnim = addAnimTask.suffix ? `${animTask.anim}${addAnimTask.suffix}` : addAnimTask.anim ?? '';
          const addAnimTaskDict = addAnimTask.dict ?? animTask.dict;
          const [addAnimCoords, addAnimRot] = this.getAnimOffset(addAnimTaskDict, addAnimTaskAnim, coords, rotation);
          if (addAnimTask.updatePosition) {
            SetEntityCoords(addAnimTaskObj, addAnimCoords.x, addAnimCoords.y, addAnimCoords.z, 0.0, 0.0, 0.0, false);
            SetEntityRotation(addAnimTaskObj, addAnimRot.x, addAnimRot.y, addAnimRot.z, 2, true);
          }
          PlayEntityAnim(
            addAnimTaskObj,
            addAnimTaskAnim,
            addAnimTaskDict,
            1.0,
            addAnimTask.loop ?? false,
            addAnimTask.stayInAnim ?? true,
            false,
            addAnimTask.delta ?? animTask.delta ?? 0.0,
            addAnimTask.flags ?? 0,
          );
        }
      }
      await Delay(animTask.duration ?? GetAnimDuration(animTask.dict, animName) * 1000 - 1);
      l++;
    }
    if (freeze) {
      FreezeEntityPosition(animPed, false);
    }
  }

  async createObject(
    model: number | string,
    coord: Vector3 = new Vector3(),
    rotation: Vector3 = new Vector3(),
    network = true,
  ): Promise<number> {
    if (typeof model === 'string') {
      model = GetHashKey(model);
    }
    await this.loadModel(model);
    const objectId = CreateObjectNoOffset(model, coord.x, coord.y, coord.z, network, true, false, false);
    SetEntityRotation(objectId, rotation.x, rotation.y, rotation.z, 0, false);
    return objectId;
  }

  attachEntityToBoneIndex(
    attacher: number,
    boneIndex: number,
    attachee = this.playerPed,
    offset: Vector3 = new Vector3(0, 0, 0),
    rotation: Vector3 = new Vector3(0, 0, 0),
  ): void {
    AttachEntityToEntity(
      attacher,
      attachee,
      boneIndex,
      offset.x,
      offset.y,
      offset.z,
      rotation.x,
      rotation.y,
      rotation.z,
      true,
      false,
      false,
      false,
      0,
      true,
      false,
      false,
    );
  }

  attachEntityToBoneName(
    attacher: number,
    boneName: string,
    attachee = this.playerPed,
    offset: Vector3 = new Vector3(0, 0, 0),
    rotation: Vector3 = new Vector3(0, 0, 0),
  ): void {
    this.attachEntityToBoneIndex(attacher, GetEntityBoneIndexByName(attachee, boneName), attachee, offset, rotation);
  }

  playAmbientSpeechFromEntity(
    entity: number,
    ref: string,
    name: string,
    speechParamsString: string,
    speechLine: number,
  ) {
    const struct = new DataView(new ArrayBuffer(128));
    const soundName = VarString(10, 'LITERAL_STRING', name);
    const soundRef = VarString(10, 'LITERAL_STRING', ref);
    const speechParams = GetHashKey(speechParamsString);

    struct.setBigInt64(0, BigInt(soundName), true);
    struct.setBigInt64(8, BigInt(soundRef), true);
    struct.setInt32(16, speechLine, true);
    struct.setBigInt64(24, BigInt(speechParams), true);
    struct.setInt32(32, 0, true);
    struct.setInt32(40, 1, true);
    struct.setInt32(48, 1, true);
    struct.setInt32(56, 1, true);

    PlayPedAmbientSpeechNative(entity, struct);
  }

  getEntityComponents(entity: number): number[] {
    const metaPedType = GetMetaPedType(entity);
    const componentCount = GetNumComponentsInPed(entity);
    const components = [];
    for (let i = componentCount; i--; ) {
      const struct1 = new DataView(new ArrayBuffer(4));
      const struct2 = new DataView(new ArrayBuffer(4));
      const component = GetPedComponentAtIndex(entity, i, true, struct1, struct2);
      if (!component) {
        continue;
      }
      components.push(component << 0);
    }

    return components;
  }

  getPlayerServerId() {
    return GetPlayerServerId(PlayerId())
  }

  // getComponentById(id: number): Component {
  //   return exports['research'].getComponentById(id);
  // }
}

const gameManager = GameManager.getInstance();

export default gameManager;
