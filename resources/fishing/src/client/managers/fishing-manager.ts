import { PVBase, PVGame, PVPrompt, DrawLine, DrawTxt, TxtAtWorldCoord } from '@lib/client';
import { PedConfigFlag } from '@lib/flags/ped-config-flag';
import { Vector3 } from '@lib/math/vector3';
import { Delay, lerp } from '@lib/functions';

import FishingState from '../state/fishing-state';
import fishModels from '../state/fish-models';
import {
  FishingCodeSig,
  FishingErrorHints,
  FishingHints,
  FishingRequest,
  FishingStatus,
  FishSizeIndex,
} from '../state/fishing-enums';
import { Log } from '@lib/client/comms/ui';

const weaponFishingrod = GetHashKey('WEAPON_FISHINGROD');

Log(GetTaskFishing);
Log(SetTaskFishing);

// global.GetTaskFishing = function (ped, p1) {
//   return Citizen.invokeNative('0xf3735acd11acd500', ped, p1, Citizen.returnResultAnyway());
// };
//
// global.SetTaskFishing = function (ped, p1) {
//   return Citizen.invokeNative('0xf3735acd11acd501', ped, p1, Citizen.returnResultAnyway());
// };

class FishingManager {
  protected static instance: FishingManager;

  static getInstance(): FishingManager {
    if (!FishingManager.instance) {
      FishingManager.instance = new FishingManager();
    }
    return FishingManager.instance;
  }

  protected playerPed: number = 0;
  protected controlContext = 'OnFoot';
  protected tick?: number;
  protected state: FishingState;
  protected volumeArea: number;
  protected itemSet: number;
  protected range = 40.0;
  protected nearbyFish: Map<number, Fishing.FishInfo> = new Map();

  protected catchStart: number = 0;
  protected hookedFishInfo?: Fishing.FishInfo;

  protected isNibbling = false;
  protected nibblingFish?: number;
  protected nibbleStart: number = 0;
  protected nibbleBaitLossChance = 1 / 3;

  protected isStruggling = false;
  protected struggleStart: number = 0;

  protected splashHandle?: number;
  protected splashSoundId: number;

  protected gameTimer: number = 0;
  protected delta: number = 0;

  protected madeDecision = false;
  protected promptIsShown = false;

  protected currentBait?: string;

  protected caughtJunk = false;
  protected junkChecked = false;
  protected attachedJunk?: number;
  protected junkChance = 0.15;
  protected junkRemoveBaitChance = 0.25;
  protected junkOptions: Fishing.JunkOption[] = [
    {
      model: GetHashKey('P_BOOT_LEATHER_001'),
      offset: new Vector3(0.0, 0.0, 0.08),
      rotation: new Vector3(0.0, 75.0, 90.0),
    },
    {
      model: GetHashKey('P_CAN04X'),
      offset: new Vector3(),
      rotation: new Vector3(-90.0, 0.0, 0.0),
    },
    {
      model: GetHashKey('P_CAN05X'),
      offset: new Vector3(),
      rotation: new Vector3(-90.0, 0.0, 0.0),
    },
    {
      model: GetHashKey('P_CAN06X'),
      offset: new Vector3(),
      rotation: new Vector3(-90.0, 0.0, 0.0),
    },
    {
      model: GetHashKey('P_DOGBONE01X'),
      offset: new Vector3(0.0, 0.03, 0.0),
      rotation: new Vector3(0.0, 0.0, 90.0),
    },
    {
      model: GetHashKey('P_BONESSKELETON04X'),
      offset: new Vector3(0.05, 0.04, 0.03),
      rotation: new Vector3(-70.0, -15.0, 80.0),
    },
    {
      model: GetHashKey('P_CS_LOG01X'),
      offset: new Vector3(0.0, -0.3, 0.0),
      rotation: new Vector3(-90.0, 0.0, 0.0),
    },
    {
      model: GetHashKey('P_CS_LOOTSACK02X'),
      offset: new Vector3(0.0, 0.075, 0.0),
      rotation: new Vector3(-45.0, -55.0, -30.0),
    },
    {
      model: GetHashKey('P_CIGARBOX03X'),
      offset: new Vector3(-0.025, -0.03, 0.04),
      rotation: new Vector3(-40.0, 45.0, 50.0),
    },
    {
      model: GetHashKey('P_CHESTMEDWICKER01X'),
      offset: new Vector3(0.15, -0.65, -0.4),
      rotation: new Vector3(0.0, -5.0, 90.0),
      dragOutOfWater: true,
    },
  ];

  protected struggleDuration = 3000;
  protected struggleDelay = 6000;
  protected struggleInitialDelay = 3000;

  //crun AttachEntityToEntity(junk, fish, 0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, true, false, false, false, 0, true, false, false)

  constructor() {
    this.state = new FishingState();
    this.volumeArea = CreateVolumeCylinder(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, this.range, this.range, this.range);
    // this.volumeArea = CreateVolumeSphere(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, this.range, this.range, this.range);
    this.itemSet = CreateItemset(true);

    this.splashSoundId = GetSoundId();

    onNet('game:character-selected', (charId: number) => {
      this.playerPed = PVGame.playerPed();
    });
  }

  registerPrompts() {
    PVPrompt.register(
      () => {
        this.fishDecision(FishingRequest.KEEP_FISH);
      },
      'createHold',
      'fishing:keep-fish',
      GetHashKey('INPUT_MINIGAME_FISHING_KEEP_FISH'),
      'Keep',
    );

    PVPrompt.register(
      () => {
        this.fishDecision(FishingRequest.DISCARD_FISH);
      },
      'createHold',
      'fishing:release-fish',
      GetHashKey('INPUT_MINIGAME_FISHING_RELEASE_FISH'),
      'Release',
    );
  }

  startFishing() {
    if (!this.tick) {
      this.tick = setTick(() => {
        const timer = GetGameTimer();
        this.delta = (timer - this.gameTimer) / 1000;
        this.gameTimer = timer;
        this.update();
      });
    }
  }

  stopFishing() {
    if (this.tick) {
      SetControlContext(0, GetHashKey('OnFoot'));
      clearTick(this.tick);
      this.tick = undefined;
    }
  }

  useBait(baitHash: string): boolean {
    if (this.state.status === FishingStatus.IDLE_OUT_WATER && this.currentBait !== baitHash) {
      this.currentBait = baitHash;
      TaskSwapFishingBait(this.playerPed, baitHash, false);
      return true;
    }
    return false;
  }

  removeBait() {
    if (this.currentBait) {
      this.currentBait = undefined;
      SetFishingBait(PlayerPedId(), 'p_fishHook02x', false, true);
    }
  }

  fishDecision(request: FishingRequest) {
    Log('fishDecision', request);
    const hookedFish = this.state.hookedEntity;
    this.madeDecision = true;
    PVPrompt.hide('fishing:keep-fish');
    PVPrompt.hide('fishing:release-fish');
    this.promptIsShown = false;
    this.getState();
    this.state.request = request;
    this.setState();

    if (request === FishingRequest.KEEP_FISH || (request === FishingRequest.DISCARD_FISH && this.attachedJunk)) {
      setTimeout(() => {
        PVBase.deleteEntity(hookedFish);
        if (this.attachedJunk) {
          if (request === FishingRequest.KEEP_FISH) {
            PVBase.deleteEntity(this.attachedJunk);
          } else {
            PVBase.deleteEntity(this.attachedJunk);
          }
        }
      }, 2000);
    }
  }

  getFishBodySize(model: number): number {
    switch (model) {
      case GetHashKey('A_C_FISHBLUEGIL_01_SM'):
      case GetHashKey('A_C_FISHROCKBASS_01_SM'):
      case GetHashKey('A_C_FISHCHAINPICKEREL_01_SM'):
      case GetHashKey('A_C_FISHREDFINPICKEREL_01_SM'):
      case GetHashKey('A_C_FISHPERCH_01_SM'):
      case GetHashKey('A_C_FISHBULLHEADCAT_01_SM'):
        return FishSizeIndex.SMALL;
      case GetHashKey('A_C_FISHROCKBASS_01_MS'):
      case GetHashKey('A_C_FISHCHAINPICKEREL_01_MS'):
      case GetHashKey('A_C_FISHPERCH_01_MS'):
      case GetHashKey('A_C_FISHREDFINPICKEREL_01_MS'):
      case GetHashKey('A_C_FISHSALMONSOCKEYE_01_MS'):
      case GetHashKey('A_C_FISHLARGEMOUTHBASS_01_MS'):
      case GetHashKey('A_C_FISHRAINBOWTROUT_01_MS'):
      case GetHashKey('A_C_FISHBULLHEADCAT_01_MS'):
      case GetHashKey('A_C_FISHSMALLMOUTHBASS_01_MS'):
      case GetHashKey('A_C_FISHBLUEGIL_01_MS'):
        return FishSizeIndex.MEDIUM;
      case GetHashKey('A_C_FISHCHANNELCATFISH_01_XL'):
      case GetHashKey('A_C_FISHSMALLMOUTHBASS_01_LG'):
      case GetHashKey('A_C_FISHMUSKIE_01_LG'):
      case GetHashKey('A_C_FISHLONGNOSEGAR_01_LG'):
      case GetHashKey('A_C_FISHLAKESTURGEON_01_LG'):
      case GetHashKey('A_C_FISHRAINBOWTROUT_01_LG'):
      case GetHashKey('A_C_FISHLARGEMOUTHBASS_01_LG'):
      case GetHashKey('A_C_FISHSALMONSOCKEYE_01_LG'):
      case GetHashKey('A_C_FISHNORTHERNPIKE_01_LG'):
      case GetHashKey('A_C_FISHCHANNELCATFISH_01_LG'):
        return FishSizeIndex.LARGE;
      default:
        return FishSizeIndex.MEDIUM;
    }
  }

  getState() {
    // Log('GetTaskFishing', GetTaskFishing);
    GetTaskFishing(this.playerPed, this.state.getState());
  }

  setState() {
    if (this.state.modified) {
      Log('SetTaskFishing', SetTaskFishing);
      SetTaskFishing(this.playerPed, this.state.getState());
      this.state.modified = false;
    }
  }

  splashAtFish(fish: number, scale: number) {
    if (DoesEntityExist(fish)) {
      const fishCoords = Vector3.fromArray(GetEntityCoords(fish, false, false));
      // fishCoords.add(new Vector3(0.0, 0.0, 0.25));
      UseParticleFxAsset('scr_mg_fishing');
      StartNetworkedParticleFxNonLoopedAtCoord(
        'scr_mg_fish_struggle',
        fishCoords.x,
        fishCoords.y,
        fishCoords.z,
        0.0,
        0.0,
        Math.random() * 360.0,
        scale,
        false,
        false,
        false,
      );
      PlaySoundFromPositionWithId(
        this.splashSoundId,
        'VFX_SPLASH',
        fishCoords.x,
        fishCoords.y,
        fishCoords.z,
        0,
        false,
        0,
        true,
      );
      SetVariableOnSound(this.splashSoundId, 'FishSize', 1.0);
    }
  }

  startFishSplash(fish: number, scale: number) {
    if (this.splashHandle) {
      StopParticleFxLooped(this.splashHandle, true);
    }
    UseParticleFxAsset('scr_mg_fishing');
    this.splashHandle = StartNetworkedParticleFxLoopedOnEntity(
      'scr_mg_fish_struggle',
      fish,
      0,
      0,
      0.25,
      0.0,
      0.0,
      Math.random() * 360.0,
      scale,
      false,
      false,
      false,
    );
  }

  stopFishSplash() {
    if (this.splashHandle) {
      StopParticleFxLooped(this.splashHandle, true);
    }
  }

  async handleStateIdleInWater() {
    const hookCoords = Vector3.fromArray(GetEntityCoords(this.state.hookEntity, false));
    SetVolumeCoords(this.volumeArea, hookCoords.x, hookCoords.y, hookCoords.z - this.range / 2);
    SetVolumeScale(this.volumeArea, this.range, this.range, this.range);
    // SetVolumeCoords(this.volumeArea, hookCoords.x, hookCoords.y, hookCoords.z - this.range / 2);
    // 1 Peds | 2 Vehicles | 3 Entities
    const itemsFound = GetEntitiesInVolume(this.volumeArea, this.itemSet, 1);

    // Log('itemsFound', itemsFound);
    if (itemsFound) {
      for (let i = itemsFound; i--; ) {
        const ped = GetIndexedItemInItemset(i, this.itemSet);
        const pedModel = GetEntityModel(ped);

        if (fishModels.has(pedModel) && !this.nearbyFish.has(ped)) {
          const fishInfo: Fishing.FishInfo = {
            size: (80 + Math.random() * 80) / 100,
            baitInterest: 0.0,
            hasGoToTask: false,
          };

          this.nearbyFish.set(ped, fishInfo);
        }
      }
    }
    ClearItemset(this.itemSet);

    if (this.isNibbling && this.nibblingFish) {
      Log('this.isNibbling', this.isNibbling, this.nibblingFish);
      if (this.state.codeSig & FishingCodeSig.FLICK_BAIT) {
        this.isNibbling = false;

        // SetEntityAsMissionEntity(this.nibblingFish, true, true);
        SetEntityInvincible(this.nibblingFish, true);
        SetPedConfigFlag(this.nibblingFish, PedConfigFlag.DontActivateRagdollFromExplosions, true);
        N_0x1F298C7BD30D1240(this.playerPed);
        ClearPedTasksImmediately(this.nibblingFish, false, true);
        PedFishingrodHookEntity(this.playerPed, this.nibblingFish); // _PED_FISHINGROD_HOOK_ENTITY

        this.state.request = FishingRequest.FISH_HOOKED;
        this.state.hookedEntity = this.nibblingFish;
        this.state.fishWeight = 100.0;
        this.state.fishPower = 100.0;
        this.state.fishSizeIndex = this.getFishBodySize(GetEntityModel(this.nibblingFish));

        this.catchStart = this.gameTimer;
        this.struggleStart = this.gameTimer - this.struggleInitialDelay;

        SetBlockingOfNonTemporaryEvents(this.nibblingFish, true);
        ClearPedTasks(this.nibblingFish, true, false);

        for (let n = 5; n--; ) {
          this.splashAtFish(this.nibblingFish, (this.hookedFishInfo?.size ?? 4) + Math.random());
        }

        Log('Roll for Junk');
        if (Math.random() < this.junkChance) {
          Log('Caught Junk');
          this.caughtJunk = true;
          SetEntityVisible(this.nibblingFish, false, false);
        }
        if (!this.caughtJunk || Math.random() < this.junkRemoveBaitChance) {
          this.removeBait();
        }
      } else if (this.nibbleStart + 1000 < this.gameTimer) {
        if (Math.random() < this.nibbleBaitLossChance) {
          this.removeBait();
        }
        this.state.request = FishingRequest.MISSED_BITE;
        if (this.hookedFishInfo) {
          this.hookedFishInfo.baitInterest = 0;
          this.hookedFishInfo.hasGoToTask = false;
        }
        TaskSmartFleeCoord(this.nibblingFish, hookCoords.x, hookCoords.y, hookCoords.z, 10.0, 6000, 8, 3.0);
        SetBlockingOfNonTemporaryEvents(this.nibblingFish, false);
        this.isNibbling = false;
        this.nibblingFish = undefined;
        this.nibbleStart = 0;
        this.hookedFishInfo = undefined;
      }
    } else if (this.currentBait) {
      for (const [fish, fishInfo] of this.nearbyFish.entries()) {
        if (this.isNibbling) {
          continue;
        }
        const fishCoords = Vector3.fromArray(GetEntityCoords(fish, true));
        const distance = hookCoords.getDistance(fishCoords);

        if (distance > 30) {
          this.nearbyFish.delete(fish);
        }

        fishInfo.baitInterest += lerp(0.1, 0.0, distance / 10);
        fishInfo.baitInterest += lerp(0.2, 0.0, distance / 10);

        if (fishInfo.hasGoToTask) {
          if (distance < 0.75 && !this.isNibbling) {
            this.state.request = FishingRequest.FISH_NIBBLING;
            this.isNibbling = true;
            this.nibblingFish = fish;
            this.nibbleStart = this.gameTimer;
            this.hookedFishInfo = fishInfo;
            this.resetFishInterest();
          }
        } else if (fishInfo.baitInterest > 100) {
          SetBlockingOfNonTemporaryEvents(fish, true);
          fishInfo.hasGoToTask = true;
          await PVGame.getNetworkControlOfEntity(fish);
          TaskGoToEntity(fish, this.state.hookEntity, -1, 0, 2.0, 0, 0);
        } else if (fishInfo.baitInterest < 0) {
          fishInfo.baitInterest = 0;
        }
      }
    }
  }

  resetFishInterest() {
    for (const [fish, fishInfo] of this.nearbyFish.entries()) {
      fishInfo.baitInterest = 0;
      if (fishInfo.hasGoToTask) {
        ClearPedTasks(fish);
        fishInfo.hasGoToTask = false;
      }
    }
  }

  clearNearbyFish() {
    for (const [fish, fishInfo] of this.nearbyFish.entries()) {
      this.nearbyFish.delete(fish);
      if (fishInfo.hasGoToTask && this.state.hookedEntity !== fish) {
        fishInfo.hasGoToTask = false;
        ClearPedTasks(fish);
      }
    }
  }

  handleStateFishHooked() {
    if (this.isStruggling && Math.random() < 0.1) {
      this.splashAtFish(this.state.hookedEntity, this.hookedFishInfo?.size ?? 4);
    }
    if (this.isStruggling && this.state.reelSpeed > 0.0) {
      this.state.tension += this.state.reelSpeed * this.delta;
    } else if (this.state.tension > 0.5) {
      if (this.isStruggling) {
        this.state.tension -= lerp(0.1, 0.05, this.state.reelSpeed) * this.delta;
      } else {
        this.state.tension -= lerp(0.5, 0.25, this.state.reelSpeed) * this.delta;
      }
    }
    if (this.state.tension < 0.5) {
      this.state.tension = 0.5;
    }

    let newRodShakeMultiplier = this.state.tension - 0.75;
    if (newRodShakeMultiplier < 0) {
      newRodShakeMultiplier = 0;
    }
    this.state.rodShakeMultiplier = newRodShakeMultiplier;

    if (this.state.tension > 1.25) {
      this.state.request = FishingRequest.LINE_SNAPPED;
    }

    if (!this.caughtJunk && this.gameTimer - this.struggleStart > this.struggleDelay && this.nibblingFish) {
      this.state.shakeFightMultiplier = 5.0;
      Log('start struggle');
      this.state.request = FishingRequest.FISH_STRUGGLING;
      this.struggleStart = this.gameTimer;
      this.isStruggling = true;

      // SetPedResetFlag(this.nibblingFish, 64, true);
      SetBlockingOfNonTemporaryEvents(this.nibblingFish, true);
      ClearPedTasks(this.nibblingFish, true, false);
      const playerCoords = PVGame.playerCoords();
      TaskSmartFleeCoord(
        this.state.fishWeight,
        playerCoords.x,
        playerCoords.y,
        playerCoords.z,
        40.0,
        this.struggleDuration,
        8,
        3.0,
      );
    }

    if (this.isStruggling && this.gameTimer - this.struggleStart > this.struggleDuration && this.nibblingFish) {
      this.state.shakeFightMultiplier = 0;
      Log('stop struggle');
      this.state.request = FishingRequest.NONE;
      this.struggleStart = this.gameTimer;
      this.isStruggling = false;
      SetBlockingOfNonTemporaryEvents(this.nibblingFish, false);
    }
  }

  getRandomJunk(): Fishing.JunkOption {
    let junkOptions = this.junkOptions;
    if (FishingCodeSig.IS_BOAT_FISHING & this.state.codeSig) {
      junkOptions = this.junkOptions.filter((junk) => !junk.dragOutOfWater);
    }
    return junkOptions[Math.floor(Math.random() * this.junkOptions.length)];
  }

  async attachJunk() {
    this.junkChecked = true;
    if (this.caughtJunk) {
      const junkData = this.getRandomJunk();

      if (junkData.dragOutOfWater) {
        PVBase.deleteEntity(this.state.hookedEntity);
        this.dragOutOfWater(junkData);
      } else {
        const hookCoords = Vector3.fromArray(GetEntityCoords(this.state.hookEntity, false));
        this.attachedJunk = await PVGame.createObject(junkData.model, hookCoords, new Vector3(0, 0, 0), true);
        if (this.attachedJunk) {
          SetEntityCollision(this.attachedJunk, false, false);
        }
        SetEntityVisible(this.state.hookedEntity, false);

        Log('attached junk', this.attachedJunk, this.state.hookedEntity);
        SetEntityHealth(this.state.hookedEntity, 0, this.playerPed);
        ChangeEntityHealth(this.state.hookedEntity, -200.0, this.playerPed, weaponFishingrod);
        PVGame.attachEntityToBoneIndex(
          this.attachedJunk,
          0,
          this.state.hookedEntity,
          junkData.offset,
          junkData.rotation,
        );
      }
    }
  }

  async dragOutOfWater(junkData: Fishing.JunkOption) {
    const object = await PVGame.createObject(junkData.model);
    const objectCoords = Vector3.fromArray(GetEntityCoords(this.playerPed, false));
    const forward = Vector3.fromArray(GetEntityForwardVector(this.playerPed));
    forward.multiplyScalar(2);
    objectCoords.add(forward);

    const [ret, groundZ] = GetGroundZAndNormalFor_3dCoord(objectCoords.x, objectCoords.y, objectCoords.z);

    SetEntityCoords(object, objectCoords.x, objectCoords.y, groundZ, false, false, false, false);
    SetEntityHeading(object, GetEntityHeading(this.playerPed) + 90);
    SetEntityCollision(object, false, true);

    forward.multiplyScalar(0.25);
    objectCoords.sub(forward);

    SetCurrentPedWeapon(this.playerPed, `WEAPON_UNARMED`, false, 0, false, false);
    await Delay(4500);

    TaskGoToCoordAnyMeans(this.playerPed, objectCoords.x, objectCoords.y, groundZ, 1.0, 0, false, 0, 0);
    await Delay(2000);

    PVGame.taskPlayAnim({
      dict: 'ai_combat@drag_ped@base',
      anim: 'injured_pickup_front_plyr',
      delta: 0.5,
    });

    await Delay(1000);

    setImmediate(() => {
      PVGame.attachEntityToBoneName(object, 'MH_SCARF', this.playerPed, junkData.offset, junkData.rotation);
    });

    await PVGame.taskPlayAnim({
      dict: 'ai_combat@drag_ped@base',
      anim: 'injured_drag_plyr',
      duration: 3000,
    });

    Log('detach junk');
    setImmediate(() => {
      DetachEntity(object, false, false);
      SetEntityCollision(object, true, true);
    });

    await Delay(2000);

    setImmediate(() => {
      FreezeEntityPosition(object, true);
    });
  }

  update() {
    this.playerPed = PVGame.playerPed();

    this.getState();
    this.debug();

    const isFishingContext =
      this.state.status === FishingStatus.IDLE_IN_WATER ||
      this.state.status === FishingStatus.FISH_HOOKED ||
      this.state.status === FishingStatus.HOLDING_FISH;

    if (isFishingContext && this.controlContext !== 'MinigameFishing') {
      SetControlContext(0, GetHashKey('MinigameFishing'));
      this.controlContext = 'MinigameFishing';
    } else if (!isFishingContext && this.controlContext !== 'OnFoot') {
      SetControlContext(0, GetHashKey('OnFoot'));
      this.controlContext = 'OnFoot';
    }

    if (this.state.status === FishingStatus.HOLDING_FISH && !this.junkChecked) {
      this.attachJunk();
    } else if (this.state.status !== FishingStatus.HOLDING_FISH && this.junkChecked) {
      this.junkChecked = false;
      this.attachedJunk = undefined;
    }

    if (this.state.status === FishingStatus.IDLE_IN_WATER || this.state.status === FishingStatus.MISSED_BITE) {
      this.handleStateIdleInWater();
    } else {
      this.clearNearbyFish();
    }

    if (this.state.codeSig & FishingCodeSig.CAN_MAKE_UNHOOK_DECISION && !this.madeDecision) {
      if (this.caughtJunk) {
        this.fishDecision(FishingRequest.KEEP_FISH);
        this.caughtJunk = false;
      } else if (!this.madeDecision && !this.promptIsShown) {
        this.promptIsShown = true;
        PVPrompt.show('fishing:keep-fish');
        PVPrompt.show('fishing:release-fish');
      }
    } else if (!(this.state.codeSig & FishingCodeSig.CAN_MAKE_UNHOOK_DECISION) && this.madeDecision) {
      this.madeDecision = false;
    }

    if (this.state.codeSig & FishingCodeSig.FISH_DIED_IN_UNHOOK && !this.madeDecision) {
      // TODO: Handle died in unhook?
    }

    if (this.state.status === FishingStatus.FISH_HOOKED) {
      this.handleStateFishHooked();
    } else {
      if (this.state.tension !== 0) {
        this.state.tension = 0;
      }
      if (this.state.rodShakeMultiplier !== 0) {
        this.state.rodShakeMultiplier = 0;
      }
    }

    if (this.state.status === FishingStatus.LINE_SNAP) {
      this.removeBait();
    }

    Object.keys(FishingCodeSig).map((key) => {
      const keyAsNumber = Number(key);
      if (
        keyAsNumber & this.state.codeSig &&
        !(keyAsNumber & FishingCodeSig.FLICK_BAIT) &&
        !(keyAsNumber & FishingCodeSig.CAN_MAKE_UNHOOK_DECISION) &&
        !(keyAsNumber & FishingCodeSig.RELEASED_FISH_IN_WATER) &&
        !(keyAsNumber & FishingCodeSig.FISH_DIED_IN_UNHOOK) &&
        !(keyAsNumber & FishingCodeSig.IS_BOAT_FISHING)
      ) {
        Log(FishingCodeSig[keyAsNumber]);
      }
    });

    this.setState();
  }

  debugText() {
    return `status: ${this.state.status} ${FishingStatus[this.state.status]}
maxLineLength: ${this.state.maxLineLength}
lineLength: ${this.state.lineLength}
lineSlack: ${this.state.lineSlack}
reelSpeed: ${this.state.reelSpeed}
codeSig: ${this.state.codeSig}${Object.keys(FishingCodeSig).reduce(
      (prev, key: string) => prev + (Number(key) & this.state.codeSig ? ` ${FishingCodeSig[<any>key]}` : ''),
      '',
    )}
request: ${this.state.request}${Object.keys(FishingRequest).reduce(
      (prev, key) => prev + (Number(key) & this.state.request ? ` ${FishingRequest[<any>key]}` : ''),
      '',
    )}
hookedEntity: ${this.state.hookedEntity}
fishWeight: ${this.state.fishWeight}
fishPower: ${this.state.fishPower}
scriptTimer: ${this.state.scriptTimer}
bobberEntity: ${this.state.bobberEntity}
hookEntity: ${this.state.hookEntity}
rodShakeMultiplier: ${this.state.rodShakeMultiplier}
unk1: ${this.state.unk1}
unk2: ${this.state.unk2}
errorCode: ${this.state.errorCode} ${FishingHints[FishingErrorHints[this.state.errorCode]]}
shakeFightMultiplier: ${this.state.shakeFightMultiplier}
fishSizeIndex: ${this.state.fishSizeIndex}
unk4: ${this.state.unk4}
unk5: ${this.state.unk5}
tension: ${this.state.tension}
rodDirX: ${this.state.rodDirX}
rodDirY: ${this.state.rodDirY}
minCastDistanceOverride: ${this.state.minCastDistanceOverride}
maxCastDistanceOverride: ${this.state.maxCastDistanceOverride}
unk6: ${this.state.unk6}
unk7: ${this.state.unk7}`;
  }

  debugIntText() {
    let str = '';
    let offset = 0;
    while (offset < 0xe0) {
      str += offset + ': ' + this.state.theData.getInt32(offset, true) + '\n';
      offset += 4;
    }
    return str;
  }

  debugFloatText() {
    let str = '';
    let offset = 0;
    while (offset < 0xe0) {
      str += offset + ': ' + this.state.theData.getFloat32(offset, true) + '\n';
      offset += 4;
    }
    return str;
  }

  debugFish() {
    for (const [fish, fishInfo] of this.nearbyFish.entries()) {
      const fishCoords = Vector3.fromArray(GetEntityCoords(fish, true));
      // const fishModel = GetEntityModel(fish);
      const r = 0;
      const g = 127;
      const b = 255;

      TxtAtWorldCoord(fishCoords.x, fishCoords.y, fishCoords.z, `${Math.round(fishInfo.baitInterest)}`, 0.25);
      DrawLine(fishCoords.x, fishCoords.y, fishCoords.z, fishCoords.x, fishCoords.y, fishCoords.z + 2.0, r, g, b, 255);
    }
  }

  debug() {
    DrawTxt(this.debugText(), 0.05, 0.05, 0.275);
    // DrawTxt(this.debugFloatText(), 0.8, 0.025, 0.275);
    // DrawTxt(this.debugIntText(), 0.7, 0.025, 0.275);
    this.debugFish();
  }
}

const fishingManager = FishingManager.getInstance();

export default fishingManager;
