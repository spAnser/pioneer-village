import { emitUI } from '@lib/client';
import { mpMaleBoneNames, mpMaleBones } from '../data/bones-mp-male';
import { mpFemaleBoneNames, mpFemaleBones } from '../data/bones-mp-female';
import {
  boneBulletFragmentChance,
  boneRedirection,
  injuryBodyBones,
  injuryBodyInfo,
  injuryHeadBones,
  injuryHeadInfo,
  injuryLimbBones,
  injuryLimbInfo,
  injuryOtherBones,
  injuryOtherInfo,
  mpBoneHealth,
} from '../data/bones-mp';
import { horseWildlife, wildlife } from '../data/wildlife';
import { Vector3 } from '@lib/math';
import { clamp, Delay, distanceVector, lerp } from '@lib/functions';
import { DamageType, weapons } from '../data/weapons';
import { AttachPoint, PedConfigFlag } from '@lib/flags';
import { Log } from '@lib/client/comms/ui';

const playerId = PlayerId();

const currentAlcoholContent = 'CUR_ALC_CNT';
const targetAlcoholContnet = 'TAR_ALC_CNT';

const skelStart = 'SKEL_';

const moveSpeedSkels = ['SKEL_L_THIGH', 'SKEL_L_CALF', 'SKEL_L_FOOT', 'SKEL_R_THIGH', 'SKEL_R_CALF', 'SKEL_R_FOOT'];
const handShakeSkels = [
  'SKEL_L_HAND',
  'SKEL_R_HAND',
  'SKEL_L_FOREARM',
  'SKEL_R_FOREARM',
  'SKEL_L_UPPERARM',
  'SKEL_R_UPPERARM',
];
let lastHandShake = 0.0;

const TickDelay = 2500;
const TempChangPerSecond = 1 / (60 * 5); // 1 degree in 5 Minutes

const FoodLength = 60 * 60 * 2; // 2 Hours
const WaterLength = 60 * 60 * 2; // 2 Hours

const FoodPerSecond = 100 / FoodLength;
const WaterPerSecond = 100 / WaterLength;

export class HealthManager {
  protected static instance: HealthManager;

  static getInstance(): HealthManager {
    if (!HealthManager.instance) {
      HealthManager.instance = new HealthManager();
    }
    return HealthManager.instance;
  }

  initialized = false;
  // tick: number;
  interval: NodeJS.Timeout | undefined;
  playerPed: number = 0;
  isRagdolling: boolean = false;
  _isBleeding: boolean = false;
  _hasBrokenBone: boolean = false;
  lastCustomWalk: string = '__reset__';

  ragdollStart: number | undefined;
  ragdollLastDamagedBone: number | undefined;
  ragdollMaxZ: number | undefined;
  ragdollLastZ: number = 0;
  ragdollDidDamage: boolean = false;
  canRagdollWithKey = true;

  bones: Map<number, string> = new Map();
  boneNames: Record<string, Health.BoneInfo> = {};

  hunger = 100;
  thirst = 100;
  alcoholContent = {
    // still part of saloon script
    current: 0,
    target: 0,
  };
  // diseases = {}
  // diseases_treated = {}

  warmth = 0;
  temperature = 37;

  isHot = false;
  isCold = false;

  internalTemperature = 37;
  litersOfBlood = 5;
  food = 100;
  water = 100;
  herbalTea = 0;
  poppedOxy = 0;

  burned = 0;

  boneHealth: Map<number, number> = new Map();
  boneStatus: Map<number, Health.BoneStatus> = new Map();
  infectionStabilized: boolean = false; // TODO: Timed to require repeat medicine taking?

  sick = false;
  activeTonic = false;
  recoveryMultiplier = 1.0;

  lastGameTime = GetGameTimer();
  health = 100.0;
  stamina = 100.0;
  desiredMaxBlendRatio = 3.0;
  blendRatioForcedMax = 3.0;

  constructor() {
    // ClearPedDesiredLocoForModel(this.playerPed);
    // SetPedDesiredLocoForModel(this.playerPed, 'default');
    // ClearPedDesiredLocoMotionType(this.playerPed);
  }

  init() {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    emitUI('hud.state', { bleeding: false, brokenBone: false });

    this.checkUpdatePed();
    this.resetHealth();

    on('saloon::client::alcohol-content', (current: number, target: number) => {
      this.alcoholContent.current = current;
      this.alcoholContent.target = target;
    });

    on('health:client:trigger-fall-damage', this.triggerFallDamage.bind(this));

    on('temperature_change', (temperature: { warmth: number; temperature: number }) => {
      this.warmth = temperature.warmth;
      this.temperature = temperature.temperature;
    });

    // this.tick = setTick(this.handleTick.bind(this));
    this.interval = setInterval(async () => {
      const delta = (GetGameTimer() - this.lastGameTime) / 1000;
      this.lastGameTime = GetGameTimer();
      await Delay(150);
      this.checkUpdatePed();
      await Delay(150);
      this.screenFxTick();
      await Delay(150);
      this.updateCurrentHealth();
      await Delay(150);
      this.updateGameHealth();
      await Delay(150);
      this.checkPlayerStatus();
      await Delay(150);
      this.checkMoveSpeedSkels();
      await Delay(150);
      this.checkHandShakeSkels();
      await Delay(150);
      this.handleBoneTick(delta);
      await Delay(150);
      this.foodWaterTick(delta);
      await Delay(150);
      this.warmthTick(delta);
      await Delay(150);
      this.checkWalkCycle();
      await Delay(50);
      emitUI('hud.state', { food: this.food, drink: this.water });
    }, TickDelay);
  }

  get isBleeding() {
    return this._isBleeding;
  }
  set isBleeding(value) {
    if (value === this._isBleeding) return;
    this._isBleeding = value;
    emitUI('hud.state', { bleeding: value });
  }

  get hasBrokenBone() {
    return this._hasBrokenBone;
  }
  set hasBrokenBone(value) {
    if (value === this._hasBrokenBone) return;
    this._hasBrokenBone = value;
    emitUI('hud.state', { brokenBone: value });
  }

  stop(): void {
    // clearTick(this.tick);
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  foodWaterTick(delta: number): void {
    this.food -= FoodPerSecond * delta;
    this.water -= WaterPerSecond * delta;

    if (this.isCold) {
      this.food -= FoodPerSecond * delta * 2;
    }

    if (this.isHot) {
      this.water -= WaterPerSecond * delta * 2;
    }

    this.food = clamp(this.food, 0, 100);
    this.water = clamp(this.water, 0, 100);
  }

  warmthTick(delta: number): void {
    // Log('LocalPlayer.state.temperature', LocalPlayer.state.temperature);
    const targetWarmthLevel = Math.max(-1.0, lerp(10, 0, (this.temperature + 10) / 38));
    const warmthDelta = Math.min(Math.max(Math.abs(this.warmth - targetWarmthLevel), 0), 10);
    const isHot = this.warmth > targetWarmthLevel && warmthDelta > 3;
    const isCold = this.warmth < targetWarmthLevel && warmthDelta > 4;

    const lowestTemp = 37 - warmthDelta;
    const highestTemp = 37 + warmthDelta;
    if (isCold && this.internalTemperature > lowestTemp) {
      this.internalTemperature = this.internalTemperature - warmthDelta * TempChangPerSecond * delta;
    } else if (isHot && this.internalTemperature < highestTemp) {
      this.internalTemperature = this.internalTemperature + warmthDelta * TempChangPerSecond * delta;
    } else if (!isCold && this.internalTemperature < 37 - warmthDelta / 5) {
      this.internalTemperature = this.internalTemperature + warmthDelta * TempChangPerSecond * delta;
    } else if (!isHot && this.internalTemperature > 37 + warmthDelta / 5) {
      this.internalTemperature = this.internalTemperature - warmthDelta * TempChangPerSecond * delta;
    }

    if (!this.isCold && isCold) {
      emit('health:client:warmthSpeedLimit', 2);
    } else if (this.isCold && !isCold) {
      emit('health:client:warmthSpeedLimit', 3);
    }

    this.isHot = isHot;
    this.isCold = isCold;
  }

  updateCurrentHealth(): void {
    let health = 100;
    for (const [name, bone] of Object.entries(this.boneNames)) {
      const boneHealth = this.boneHealth.get(bone.id);
      if (!boneHealth && boneHealth !== 0) {
        continue;
      }
      const currentBoneStatus = this.boneStatus.get(bone.id);
      if (!currentBoneStatus) {
        continue;
      }
      if (name.startsWith(skelStart) && boneHealth < 100) {
        let boneHealthPercent = mpBoneHealth[name].percent;
        if ((currentBoneStatus.shot > 0 || currentBoneStatus.slash > 0) && currentBoneStatus.bandaged) {
          boneHealthPercent = boneHealthPercent - mpBoneHealth[name].percent * 0.25;
          if (!currentBoneStatus.broken) {
            boneHealthPercent = boneHealthPercent - mpBoneHealth[name].percent * 0.25;
          }
        }
        if (currentBoneStatus.broken && currentBoneStatus.stabilized) {
          boneHealthPercent = boneHealthPercent - mpBoneHealth[name].percent * 0.25;
          if (currentBoneStatus.shot === 0 && currentBoneStatus.slash === 0) {
            boneHealthPercent = boneHealthPercent - mpBoneHealth[name].percent * 0.25;
          }
        }
        health = health - ((100 - boneHealth) / 100.0) * boneHealthPercent;
        health = health - (currentBoneStatus.infection / 100.0) * (boneHealthPercent * 0.333);
      }
    }
    this.health = health;
  }

  updateGameHealth(): void {
    // const maxHealth = GetEntityMaxHealth(this.playerPed);
    // const healthPercent = this.health / 100.0;
    // const gameHealth = Math.ceil(healthPercent * maxHealth);
    if (
      DoesEntityExist(this.playerPed) &&
      !GetPedResetFlag(this.playerPed, 139) &&
      IsPedFatallyInjured(this.playerPed)
    ) {
      const speed = GetEntitySpeed(this.playerPed);
      if (speed < 0.5 || IsEntityInWater(this.playerPed)) {
        const velocity = Vector3.fromArray(GetEntityVelocity(this.playerPed));
        const pCoords = Vector3.fromArray(GetEntityCoords(this.playerPed));
        const pHeading = GetEntityHeading(this.playerPed);
        const cid = DecorGetInt(this.playerPed, 'CID');
        const sex = DecorGetInt(this.playerPed, 'SEX');
        const inventory = DecorGetInt(this.playerPed, 'Inventory');
        // NetworkResurrectLocalPlayer(pCoords.x, pCoords.y, pCoords.z, pHeading, this.playerPed, true, 1, false);
        NetworkResurrectLocalPlayer(pCoords.x, pCoords.y, pCoords.z, pHeading, 0, false, 0, true);
        SetPedToRagdoll(this.playerPed, speed * 100, speed * 100);
        SetEntityVelocity(this.playerPed, velocity.x, velocity.y, velocity.z);
        Log('NetworkResurrectLocalPlayer');
        DecorSetInt(this.playerPed, 'CID', cid);
        DecorSetInt(this.playerPed, 'SEX', sex);
        DecorSetInt(this.playerPed, 'Inventory', inventory);
      }
    }
    if (!IsPedFatallyInjured(this.playerPed)) {
      // SetEntityHealth(this.playerPed, Math.max(1, gameHealth));
      // SetAttributeCoreValue(this.playerPed, 0, clamp(gameHealth, 1, 100));
      SetEntityHealth(this.playerPed, GetEntityMaxHealth(this.playerPed));
      SetAttributeCoreValue(this.playerPed, 0, 100); // Health
      SetAttributeCoreValue(this.playerPed, 1, 100); // Stamina
    }
    // const boneHealthForUI = {};
    // for (const [bone, boneHealth] of this.boneHealth.entries()) {
    //   const name = this.bones.get(bone);
    //   const currentBoneStatus = this.boneStatus.get(bone);
    //   boneHealthForUI[name] = {
    //     health: boneHealth,
    //     bandaged: currentBoneStatus.bandaged,
    //     stabilized: currentBoneStatus.stabilized,
    //     broken: currentBoneStatus.broken,
    //     shot: currentBoneStatus.shot,
    //     wound: currentBoneStatus.slash,
    //     bulletFragment: currentBoneStatus.bulletFragment,
    //     infection: currentBoneStatus.infection,
    //     infection_stabilized: currentBoneStatus.stabilized,
    //   };
    // }

    // SendNuiMessage(JSON.stringify({ action: 'update_health', health: boneHealthForUI }));

    if (this.health <= 0 || this.litersOfBlood <= 3) {
      if (!GetPedConfigFlag(this.playerPed, PedConfigFlag.Knockedout) && !IsPedFatallyInjured(this.playerPed)) {
        SetCurrentPedWeapon(this.playerPed, `WEAPON_UNARMED`, true, AttachPoint.MainHand, false, false);
        SetCurrentPedWeapon(this.playerPed, `WEAPON_UNARMED`, true, AttachPoint.OffHand, false, false);
        ClearPedTasksImmediately(this.playerPed);
        SetPedConfigFlag(this.playerPed, PedConfigFlag.DisableMelee, true);
        SetPedConfigFlag(this.playerPed, PedConfigFlag.Unk_170, true);
        TaskKnockedOut(this.playerPed, 30.0, true);
      }
    } else if (GetPedConfigFlag(this.playerPed, PedConfigFlag.Knockedout)) {
      SetPedConfigFlag(this.playerPed, PedConfigFlag.DisableMelee, false);
      SetPedConfigFlag(this.playerPed, PedConfigFlag.Unk_170, false);
      ClearPedTasks(this.playerPed);
      SetPedToRagdoll(this.playerPed, 0, 0, 1, false, true, false);
    }

    emitUI('hud.state', { health: clamp(this.health, 0, 100) });
  }

  checkPlayerStatus(): void {
    let modifier = 0.0;
    let modifiers = 0;
    if (this.sick) {
      modifier += 0.75;
      modifiers++;
    }
    if (this.activeTonic) {
      modifier += 1.5;
      modifiers++;
    }
    if (modifiers > 0) {
      this.recoveryMultiplier = modifier / modifiers;
    } else {
      this.recoveryMultiplier = 1.0;
    }
  }

  // PlayerHealthLow
  // PlayerRPGCore | Blurred Screen
  // MP_RiderFormation | Constant Blue Tint
  // RespawnPulse01
  // MP_Downed
  // PlayerRPGEmptyCoreHealth
  // PlayerRPGEmptyCoreStamina
  // PlayerRPGEmptyCoreDeadEye
  // CamTransitionBlink
  // PedKill
  // MP_InRegion_NetPlayer00-10 | COLORED FLASHES
  // MP_InRegion_NetPlayer00 - White
  // MP_InRegion_NetPlayer01 - Blue/Teal
  // MP_InRegion_NetPlayer02 - Red
  // MP_InRegion_NetPlayer03 - Pink/Purple
  // MP_InRegion_NetPlayer04 - Orange
  // MP_InRegion_NetPlayer05 - Green/Teal
  // MP_InRegion_NetPlayer06 - Yellow
  // MP_InRegion_NetPlayer07 - Pink
  // MP_InRegion_NetPlayer08 - Green
  // MP_InRegion_NetPlayer09 - Teal
  // MP_InRegion_NetPlayer10 - Red
  screenFxTick(): void {
    let doRagdoll = false;
    let ragdollDuration = 0;
    let doScreenFx = false;
    for (const [name, bone] of Object.entries(this.boneNames)) {
      const boneHealth = this.boneHealth.get(bone.id);
      if (typeof boneHealth === 'number') {
        if (name === 'SKEL_HEAD' && boneHealth < 50.0) {
          if (!AnimpostfxIsRunning('PlayerRPGCoreDeadEye')) {
            AnimpostfxPlay('PlayerRPGCoreDeadEye');
          }
          const strength = lerp(1.0, 0.0, boneHealth / 50.0);
          N_0xcab4dd2d5b2b7246('PlayerRPGCoreDeadEye', strength);
          const chance = lerp(0.004, 0.0, boneHealth / 50.0);
          if (Math.random() < chance) {
            doScreenFx = true;
            Log('doScreenFx', doScreenFx);
          }
          if (boneHealth < 10.0 && !IsPedRagdoll(this.playerPed) && Math.random() < chance) {
            ragdollDuration = lerp(5000, 2000, boneHealth / 10.0);
            doRagdoll = true;
          }
        }
        if (name === 'SKEL_HEAD' && boneHealth > 50.0) {
          if (AnimpostfxIsRunning('PlayerRPGCoreDeadEye') && this.litersOfBlood >= 4.75) {
            AnimpostfxStop('PlayerRPGCoreDeadEye');
          }
        }
      }
    }

    if (this.litersOfBlood < 4.75) {
      if (!AnimpostfxIsRunning('PlayerRPGCoreDeadEye')) {
        AnimpostfxPlay('PlayerRPGCoreDeadEye');
      }
      const strength = lerp(1.0, 0.0, (this.litersOfBlood - 4.0) / 0.75);
      N_0xcab4dd2d5b2b7246('PlayerRPGCoreDeadEye', strength);
      const chance = lerp(0.004, 0.0, (this.litersOfBlood - 4.0) / 0.75);

      if (Math.random() < chance) {
        if (this.litersOfBlood < 3.825 && !IsPedRagdoll(this.playerPed) && Math.random() < chance * 25.0) {
          ragdollDuration = lerp(5000, 2000, (this.litersOfBlood - 3.5) / 0.325);
          doRagdoll = true;
        }
        doScreenFx = true;
      }
    }

    if (doRagdoll) {
      SetPedToRagdoll(this.playerPed, ragdollDuration, ragdollDuration, 0, false, true, false);
      Log('doRagdoll');
    }

    if (doScreenFx) {
      DoScreenFadeOut(375);
      Wait(500);
      DoScreenFadeIn(375);
      AnimpostfxPlay('RespawnMissionCheckpoint');
      Wait(5000);
    }
  }

  checkUpdatePed(): void {
    const playerPed = PlayerPedId();
    if (this.playerPed !== playerPed) {
      this.playerPed = playerPed;
      if (IsPedMale(playerPed)) {
        this.bones = mpMaleBones;
        this.boneNames = mpMaleBoneNames;
      } else {
        this.bones = mpFemaleBones;
        this.boneNames = mpFemaleBoneNames;
      }

      for (const [boneName, boneInfo] of Object.entries(this.boneNames)) {
        boneInfo.index = GetEntityBoneIndexByName(this.playerPed, boneName);
      }
    }
  }

  resetHealth(): void {
    this.stamina = 100.0;
    // SetAttributeCoreValue(this.playerPed, 1, this.stamina);
    for (const [boneName, boneInfo] of Object.entries(this.boneNames)) {
      // Log('set health/status', boneName, boneInfo.id);
      this.boneHealth.set(boneInfo.id, 100.0);
      this.boneStatus.set(boneInfo.id, {
        index: boneInfo.index,
        bulletFragment: 0,
        shot: 0,
        burned: false,
        slash: 0,
        broken: false,
        bandaged: false,
        stabilized: false,
        infected: false,
        infectedBySelf: false,
        infectionMultiplier: 1.0,
        infection: 0.0,
        bleedingParticleId: false,
        bleedingParticleSize: 0.0,
      });
    }
  }

  randomBone(): number {
    const boneIds = [];
    for (const [boneId, boneName] of this.bones.entries()) {
      if (boneName.startsWith('SKEL_')) {
        boneIds.push(boneId);
      }
    }
    return boneIds[Math.floor(Math.random() * boneIds.length)];
  }

  damageBone(boneId: number, damage = 10): void {
    const boneHealth = this.boneHealth.get(boneId);
    if (!boneHealth) {
      return;
    }
    this.boneHealth.set(boneId, clamp(boneHealth - damage, 0, 100));
  }

  damageBoneByName(boneName: string, damage = 10): void {
    const bone = this.boneNames[boneName];
    this.damageBone(bone.id, damage);
  }

  shootBoneByName(boneName: string): void {
    const bone = this.boneNames[boneName];
    const boneStatus = this.boneStatus.get(bone.id);
    if (!boneStatus) {
      return;
    }
    boneStatus.shot++;
  }

  getBoneNameFromId(boneId: number): string | undefined {
    return this.bones.get(boneId);
  }

  checkForBoneDamage(
    modifier: number,
    force = false,
    damageType = DamageType.DEFAULT,
    infect = false,
    infectionMultiplier = 0.0,
    boneId?: number,
  ): void {
    const hasBoneOverride = !!boneId;
    let hasDamagedBone: boolean;
    let damagedBoneId: number;
    if (hasBoneOverride) {
      hasDamagedBone = true;
      damagedBoneId = boneId;
    } else {
      [hasDamagedBone, damagedBoneId] = GetPedLastDamageBone(this.playerPed);
    }

    if (!hasDamagedBone || !this.bones.has(damagedBoneId)) {
      return;
    }

    if (damageType === DamageType.FIRE) {
      damagedBoneId = this.randomBone();
    }

    let boneName = this.bones.get(damagedBoneId);

    if (!boneName) {
      return;
    }

    const redirectBone = boneRedirection[boneName];
    if (redirectBone) {
      boneName = redirectBone;
      damagedBoneId = this.boneNames[redirectBone].id;
    }

    const boneHealth = this.boneHealth.get(damagedBoneId);
    if (!boneHealth) {
      return;
    }
    const boneStatus = this.boneStatus.get(damagedBoneId);
    if (!boneStatus) {
      return;
    }

    // Log(boneName, damagedBoneId, mpBoneHealth[boneName]);
    const boneDamage = (1 + Math.random() * 2) * mpBoneHealth[boneName].multiplier * modifier;
    const newBoneHealth = boneHealth - boneDamage;

    if ((boneDamage > 20 || boneHealth < 25) && boneStatus.stabilized) {
      boneStatus.stabilized = false;
    }

    this.boneHealth.set(damagedBoneId, clamp(newBoneHealth, 0, 100));

    if (damageType === DamageType.GUN) {
      boneStatus.shot++;
      boneStatus.bandaged = false;
      if (Math.random() < boneBulletFragmentChance[boneName]) {
        boneStatus.bulletFragment++;
      }
    }

    if (damageType === DamageType.SHARP) {
      boneStatus.slash++;
    }

    if (damageType === DamageType.EXPLOSIVE) {
      this.damageNearby(boneName, damagedBoneId, modifier);
    }

    if (damageType === DamageType.FIRE) {
      boneStatus.burned = true;
    }

    if (damageType === DamageType.FALL && modifier > 8 + Math.random() * 3) {
      boneStatus.broken = true;
    }

    if (infect) {
      boneStatus.infectedBySelf = false;
      boneStatus.infected = true;
      boneStatus.infectionMultiplier = infectionMultiplier;
    }

    // this.boneStatus.set(damagedBoneId, boneStatus);

    if (boneName === 'SKEL_HEAD') {
      if (Math.random() < 0.3) {
        AnimpostfxPlay('RespawnPulse01');
      } else {
        AnimpostfxPlay('MP_SuddenDeath');
      }
      UseParticleFxAsset('scr_winter2');
      const x = (Math.random() - 0.5) * 0.1;
      const z = (Math.random() - 0.5) * 0.2;
      const particleFxId = StartNetworkedParticleFxLoopedOnEntityBone(
        'scr_blood_drips',
        this.playerPed,
        x,
        0.1,
        z,
        0.0,
        0.0,
        0.0,
        damagedBoneId,
        0.5,
        false,
        false,
        false,
      );
      setTimeout(() => {
        if (DoesParticleFxLoopedExist(particleFxId)) {
          StopParticleFxLooped(particleFxId, false);
        }
      }, 1500);
    } else if (boneDamage > 50) {
      // AnimpostfxPlay('MP_HealthDrop');
    }
    if (!hasBoneOverride) {
      ClearPedLastDamageBone(this.playerPed);
    }
  }

  getRedirectBone(boneName: string, boneId: number): [string, number] {
    if (boneRedirection[boneName]) {
      boneName = boneRedirection[boneName];
      boneId = this.boneNames[boneName].id;
    }
    return [boneName, boneId];
  }

  damageNearby(boneName: string, boneId: number, damage: number) {
    [boneName, boneId] = this.getRedirectBone(boneName, boneId);
    const currentDamaged = { [boneId]: true };
    let bones = { [boneName]: boneId };
    Log('boneName', boneName);
    for (let n = 0; n < 10; n++) {
      damage *= 0.666;
      if (damage >= 0.5) {
        const newBones: Record<string, number> = {};
        for ([boneName, boneId] of Object.entries(bones)) {
          const attachedTo = this.boneNames[boneName]?.attachedTo;
          if (attachedTo) {
            for (const attachedBoneName of attachedTo) {
              boneName = attachedBoneName;
              boneId = this.boneNames[attachedBoneName].id;
              if (!currentDamaged[boneId]) {
                currentDamaged[boneId] = true;
                newBones[boneName] = boneId;
                Log(`Also Damage ${n} ${boneName} for: ${damage}`);
                this.checkForBoneDamage(damage, undefined, DamageType.FALL, undefined, undefined, boneId);
              }
            }
          }
        }
        bones = newBones;
      }
    }
  }

  damageNearbyFromFall(boneName: string, boneId: number, fallHeight: number) {
    [boneName, boneId] = this.getRedirectBone(boneName, boneId);
    const currentDamaged = { [boneId]: true };
    let bones = { [boneName]: boneId };
    for (let n = 0; n < 10; n++) {
      const damageModifier = fallHeight - n * 4;
      if (damageModifier > 3) {
        const newBones: Record<string, number> = {};
        for ([boneName, boneId] of Object.entries(bones)) {
          // Log(boneName, boneId);
          const attachedTo = this.boneNames[boneName]?.attachedTo;
          if (attachedTo) {
            for (const attachedBoneName of attachedTo) {
              boneName = attachedBoneName;
              boneId = this.boneNames[attachedBoneName].id;
              // Log(`${n} ${boneName}`);
              if (!currentDamaged[boneId]) {
                currentDamaged[boneId] = true;
                newBones[boneName] = boneId;
                // Log(
                //     `Also Damage ${n} ${boneName} for: ${(fallHeight + 1.0 - modifier) * (2.0 - modifier)}`,
                // );
                Log(`Also Damage ${n} ${boneName} for: ${damageModifier}`);
                this.checkForBoneDamage(damageModifier, undefined, DamageType.FALL, undefined, undefined, boneId);
              }
            }
          }
        }
        bones = newBones;
      }
    }
  }

  damageNearbyFromFallBoneId(boneId: number, fallHeight: number) {
    const boneName = this.getBoneNameFromId(boneId);
    this.damageNearbyFromFall(boneName || 'SKEL_SPINE4', boneId, fallHeight);
  }

  handleBoneTick(delta: number): void {
    const healthPercent = this.health / 100.0;

    let currentlyBleeding = false;
    let bloodRecoveryMultiplier = 1.0;
    let bloodLossMultiplier = 0.25;
    let hasBrokenBone = false;
    for (const [name, bone] of Object.entries(this.boneNames)) {
      if (!name.startsWith(skelStart) || !this.boneStatus.has(bone.id)) {
        continue;
      }
      let currentLimbInfo: Health.InjuryInfo[] = [];
      if (injuryLimbBones.includes(name)) {
        currentLimbInfo = injuryLimbInfo;
      } else if (injuryBodyBones.includes(name)) {
        currentLimbInfo = injuryBodyInfo;
      } else if (injuryHeadBones.includes(name)) {
        currentLimbInfo = injuryHeadInfo;
      } else if (injuryOtherBones.includes(name)) {
        currentLimbInfo = injuryOtherInfo;
      }

      let currentLimbBoneInfo = { recoveryMultiplier: 1.0 };

      const currentBoneStatus = this.boneStatus.get(bone.id);
      if (!currentBoneStatus) {
        continue;
      }

      const boneHealth = this.boneHealth.get(bone.id);
      if (!boneHealth && boneHealth !== 0) {
        continue;
      }

      for (const info of currentLimbInfo) {
        if (boneHealth <= info.threshold) {
          currentLimbBoneInfo = info;
          if (info.boneBroken) {
            currentBoneStatus.broken = true;
            hasBrokenBone = true;
          }
          break;
        }
      }

      if (this.health <= 0) {
        currentLimbBoneInfo.recoveryMultiplier = 0;
      }

      // Get Recovery Base Multiplier
      let baseMultiplier = 0.0;
      if (currentBoneStatus.shot > 0 || currentBoneStatus.slash > 0) {
        bloodRecoveryMultiplier = 0.1;
        if (currentBoneStatus.bandaged) {
          // stopBoneBleeding(bone.id)
          baseMultiplier += 0.25;

          if (!currentBoneStatus.broken && (!currentBoneStatus.burned || boneHealth > 85)) {
            baseMultiplier += 0.5;
          }
        } else {
          // startBoneBleeding(bone.id, currentBoneStatus.shot + currentBoneStatus.slash)
          const movementSpeed = GetEntitySpeed(this.playerPed);
          bloodLossMultiplier = lerp(0.25, 1.0, movementSpeed / 7.5);
          if (IsPedInAnyTrain(this.playerPed)) {
            bloodLossMultiplier = 0.25;
          } else if (IsPedOnFoot(this.playerPed)) {
            bloodLossMultiplier *= 0.333;
            bloodLossMultiplier = Math.max(0.25, bloodLossMultiplier);
          }
          const bloodToRemove =
            (currentBoneStatus.shot + currentBoneStatus.slash) * (0.00125 * delta) * bloodLossMultiplier;
          this.litersOfBlood -= bloodToRemove;
          if (Math.random() < Math.min(bloodToRemove * 100, 0.1)) {
            setImmediate(() => {
              SetPedWoundEffect(
                this.playerPed,
                2,
                bone.id,
                0.0,
                0.0,
                0.0,
                -1.0,
                0.0,
                0.0,
                Math.min(bloodToRemove * 500, 0.999),
              );
            });
          }
          if (this.litersOfBlood < 0) {
            this.litersOfBlood = 0;
          }
          currentlyBleeding = true;
        }
      } else {
        // stopBoneBleeding(bone.id)
        RemovePedWoundEffect(this.playerPed, 0);
      }
      if (currentBoneStatus.broken && currentBoneStatus.stabilized) {
        baseMultiplier += 0.25;

        if (
          currentBoneStatus.shot === 0 &&
          currentBoneStatus.slash === 0 &&
          (!currentBoneStatus.burned || boneHealth > 85)
        ) {
          baseMultiplier += 0.5;
        }
      }
      if (currentBoneStatus.burned && currentBoneStatus.bandaged) {
        baseMultiplier += 0.25;

        if (currentBoneStatus.shot === 0 && currentBoneStatus.slash === 0 && !currentBoneStatus.broken) {
          baseMultiplier += 0.5;
        }
      }
      if (
        currentBoneStatus.shot === 0 &&
        currentBoneStatus.slash === 0 &&
        !currentBoneStatus.broken &&
        (!currentBoneStatus.burned || boneHealth > 85)
      ) {
        baseMultiplier += 0.75;
      }
      if (currentBoneStatus.infected) {
        if (this.infectionStabilized) {
          baseMultiplier = baseMultiplier * ((100.0 - currentBoneStatus.infection) / 100.0);
          currentBoneStatus.infection = currentBoneStatus.infection - 0.175 * delta;
          if (currentBoneStatus.infection <= 0) {
            currentBoneStatus.infection = 0;
            currentBoneStatus.infected = false;
          }
        } else {
          baseMultiplier = 0.0;
          currentBoneStatus.infection =
            currentBoneStatus.infection + 0.25 * delta * currentBoneStatus.infectionMultiplier;
          if (Math.random() < 0.01 * (currentBoneStatus.infection / 100.0)) {
            const attachedBones = bone.attachedTo;
            if (attachedBones) {
              const infectBoneName = attachedBones[Math.floor(Math.random() * attachedBones.length)];
              const infectBone = this.boneNames[infectBoneName];
              const infectBoneStatus = this.boneStatus.get(infectBone.id);

              if (infectBoneStatus?.infected === false) {
                Log('Infect nearby bone:', infectBoneName);
                infectBoneStatus.infected = true;
              }
            }
          }
        }
        currentBoneStatus.infection = clamp(currentBoneStatus.infection, 0, 100);
        if (currentBoneStatus.stabilized && currentBoneStatus.infection <= 0.0) {
          currentBoneStatus.infected = false;
          currentBoneStatus.infectionMultiplier = 1.0;
        }
      }
      if (baseMultiplier > 0 && boneHealth < 100) {
        const boneHealthMultiplier = mpBoneHealth[name].percent / 100;
        if (this.food > 0.0) {
          baseMultiplier += 0.1;
          this.food -= 0.075 * delta * boneHealthMultiplier;
        }
        if (this.herbalTea > 0.0) {
          baseMultiplier += 0.15;
          this.herbalTea -= 0.125 * delta * boneHealthMultiplier;
        }
        if (this.poppedOxy > 0.0) {
          baseMultiplier += 0.2;
          this.poppedOxy -= 0.075 * delta * boneHealthMultiplier;
        }
      }
      baseMultiplier = baseMultiplier * this.recoveryMultiplier;
      // Recover Bone Health
      const newBoneHealth = boneHealth + 0.25 * delta * baseMultiplier * currentLimbBoneInfo.recoveryMultiplier;
      this.boneHealth.set(bone.id, clamp(newBoneHealth, 0, 100));
      if (newBoneHealth >= 100.0) {
        const newBoneStatus = this.boneStatus.get(bone.id) ?? currentBoneStatus;
        newBoneStatus.bandaged = false;
        newBoneStatus.stabilized = false;
        newBoneStatus.broken = false;
        newBoneStatus.burned = false;
        newBoneStatus.shot = 0;
        newBoneStatus.slash = 0;
        this.boneStatus.set(bone.id, newBoneStatus);
      }
    }
    this.hasBrokenBone = hasBrokenBone;

    if (!currentlyBleeding && this.litersOfBlood < 5.0) {
      if (this.water > 0.0) {
        bloodRecoveryMultiplier += 0.2;
        this.water -= 0.1 * delta;
      }

      const newLitersOfBlood = this.litersOfBlood + healthPercent * 0.0125 * delta * bloodRecoveryMultiplier;
      this.litersOfBlood = clamp(newLitersOfBlood, 0, 5);
    }

    this.isBleeding = currentlyBleeding;
  }

  isBoneHealthUnderN(boneName: string, n: number) {
    const boneInfo = this.boneNames[boneName];
    const boneHealth = this.boneHealth.get(boneInfo.id);
    if (typeof boneHealth === 'number') {
      if (boneHealth < n) {
        return true;
      }
    }
    return false;
  }

  isBonesHealthUnderN(boneNames: string[], n: number) {
    let healthAverage = 0;
    for (const boneName of boneNames) {
      const boneInfo = this.boneNames[boneName];
      const boneHealth = this.boneHealth.get(boneInfo.id);
      if (typeof boneHealth === 'number') {
        healthAverage += boneHealth;
      }
    }
    healthAverage = healthAverage / boneNames.length;
    return healthAverage < n;
  }

  checkWalkCycle() {
    let useCustomWalk = '';
    for (let n = 1; n < 4; n++) {
      const threshold = n * 25;
      if (this.isBonesHealthUnderN(['SKEL_L_FOOT', 'SKEL_L_CALF', 'SKEL_L_THIGH'], threshold)) {
        useCustomWalk = 'injured_left_leg';
        break;
      } else if (this.isBonesHealthUnderN(['SKEL_R_FOOT', 'SKEL_R_CALF', 'SKEL_R_THIGH'], threshold)) {
        useCustomWalk = 'injured_right_leg';
        break;
      } else if (this.isBonesHealthUnderN(['SKEL_L_HAND', 'SKEL_L_FOREARM', 'SKEL_L_UPPERARM'], threshold)) {
        useCustomWalk = 'injured_left_arm';
        break;
      } else if (this.isBonesHealthUnderN(['SKEL_R_HAND', 'SKEL_R_FOREARM', 'SKEL_R_UPPERARM'], threshold)) {
        useCustomWalk = 'injured_right_arm';
        break;
      } else if (this.isBoneHealthUnderN('SKEL_HEAD', threshold)) {
        useCustomWalk = 'injured_head';
        break;
      } else if (this.isBoneHealthUnderN('SKEL_SPINE4', threshold)) {
        useCustomWalk = 'injured_torso';
        break;
      } else if (this.health < threshold) {
        useCustomWalk = 'injured_torso';
        break;
      }
    }

    // if (this.alcoholContent.current > 0.666) {
    //   useCustomWalk = 'very_drunk';
    // } else if (this.alcoholContent.current > 0.333) {
    //   useCustomWalk = 'slightly_drunk';
    // } else if (this.alcoholContent.current > 0) {
    //   useCustomWalk = 'sober';
    // }
    SetPedDrunkness(this.playerPed, true, Math.min(this.alcoholContent.current, 0.999));
    // if (this.lastCustomWalk !== useCustomWalk) {
    //   this.lastCustomWalk = useCustomWalk;
    //   // Log(`SetPedDesiredLocoForModel(${this.playerPed}, 'default');`);
    //   if (useCustomWalk) {
    //     SetPedDesiredLocoForModel(this.playerPed, 'default');
    //     SetPedDesiredLocoMotionType(this.playerPed, useCustomWalk);
    //     // Log(`SetPedDesiredLocoMotionType(${this.playerPed}, ${useCustomWalk});`);
    //   } else {
    //     ClearPedDesiredLocoForModel(this.playerPed);
    //     ClearPedDesiredLocoMotionType(this.playerPed);
    //     // Log(`ClearPedDesiredLocoMotionType(${this.playerPed});`);
    //   }
    // }
  }

  handleDamageEvent(
    attacker: number,
    attacked: number,
    weaponHash: number,
    ammoHash: number,
    x: number,
    y: number,
    z: number,
  ): void {
    if (
      attacker === this.playerPed &&
      weaponHash === GetHashKey('WEAPON_UNARMED') &&
      IsPedInMeleeCombat(this.playerPed)
    ) {
      for (const name of ['SKEL_R_HAND', 'SKEL_L_HAND']) {
        const bone = this.boneNames[name];
        const boneHealth = this.boneHealth.get(bone.id);
        if (!boneHealth && boneHealth !== 0) {
          continue;
        }
        if (boneHealth > 0) {
          this.damageBone(bone.id, Math.random() * 4);
        } else if (bone.attachedTo) {
          for (const attachedName of bone.attachedTo) {
            this.damageBoneByName(attachedName, Math.random() * 4);
          }
        }
      }
      return;
    }
    if (attacked !== this.playerPed || weaponHash === GetHashKey('WEAPON_FALL')) {
      return;
    }
    let attackDistance = 0.0;
    Log('Attack distance:', attackDistance);
    // Log('handleEntityDamage', attacker, attacked, weaponHash, ammoHash, x, y, z);

    const weaponStats = weapons[weaponHash] ?? weapons['DEFAULT'];

    if (weaponStats.effectiveRange) {
      const attackerCoord = Vector3.fromArray(GetEntityCoords(attacker));
      const attackedCoord = Vector3.fromArray(GetEntityCoords(attacked));
      attackDistance = distanceVector(attackerCoord, attackedCoord);
    }

    Log(`Player hit by ${attacker} using ${weaponHash} ${weaponStats.name}`);

    let damageModifier = weaponStats.modifier;
    let damageType = weaponStats.damageType;
    if (this.health <= 0 && damageType === DamageType.GUN) {
      return;
    }
    if (damageType === DamageType.BLUNT && damageModifier > 4.0) {
      AnimpostfxPlay('CamTransitionBlink');
    }
    let infect = false;
    let infectionMultiplier = 0.0;
    const attackerModel = GetEntityModel(attacker);
    if (wildlife[attackerModel]) {
      damageModifier = wildlife[attackerModel].modifier;
      damageType = wildlife[attackerModel].damageType;
      if (Math.random() < wildlife[attackerModel].infectious) {
        infect = true;
        infectionMultiplier = wildlife[attackerModel].infectionMultiplier ?? 0.75;
      }
    } else if (IsThisModelAHorse(attackerModel)) {
      damageModifier = horseWildlife.modifier;
      damageType = horseWildlife.damageType;
    }

    if (weaponStats.name === 'WEAPON_RUN_OVER_BY_CAR') {
      const velocity = GetEntitySpeed(attacker);
      const [min, max] = GetModelDimensions(attackerModel);
      const minBounding = Vector3.fromArray(min);
      const maxBounding = Vector3.fromArray(max);
      maxBounding.sub(minBounding);

      const cartVolume = maxBounding.x * maxBounding.y * maxBounding.z;
      damageModifier = (cartVolume / 3) * lerp(0.25, 1, velocity / 20);
    }

    if (attackDistance > 0.0) {
      const effectiveRange = weaponStats.effectiveRange;
      if (effectiveRange) {
        let difference = 0;
        if (attackDistance < effectiveRange.min) {
          difference = Math.abs(attackDistance - effectiveRange.min);
        } else if (attackDistance > effectiveRange.max) {
          difference = Math.abs(attackDistance - effectiveRange.max);
        }
        if (difference > 0) {
          damageModifier -= difference * effectiveRange.falloff;
          damageModifier = Math.max(effectiveRange.minModifier ?? 0.1, damageModifier);
        }
      }
    }

    this.checkForBoneDamage(damageModifier, false, damageType, infect, infectionMultiplier);
    ClearEntityLastDamageEntity(this.playerPed);
  }

  checkMoveSpeedSkels(): void {
    let boneSpeedLimit = 3;
    for (const moveSpeedSkel of moveSpeedSkels) {
      const boneInfo = this.boneNames[moveSpeedSkel];
      const boneHealth = this.boneHealth.get(boneInfo.id);
      if (!boneHealth && boneHealth !== 0) {
        continue;
      }
      boneSpeedLimit -= lerp(0.25, 0.0, boneHealth / 100);
    }
    emit('health:client:boneSpeedLimit', boneSpeedLimit);
  }

  checkHandShakeSkels(): void {
    let handShake = 0;
    if (IsPlayerFreeAiming(playerId)) {
      for (const handShakeSkel of handShakeSkels) {
        const boneInfo = this.boneNames[handShakeSkel];
        const boneHealth = this.boneHealth.get(boneInfo.id);
        if (!boneHealth && boneHealth !== 0) {
          continue;
        }
        handShake += lerp(0.2, 0.0, boneHealth / 100);
      }
      handShake = Math.round(handShake * 100) / 100;
    }
    if (handShake !== lastHandShake) {
      ShakeGameplayCam('HAND_SHAKE', handShake);
      lastHandShake = handShake;
    }
  }

  handleTick(): void {
    /*
    const damagedByAnyPed = HasEntityBeenDamagedByAnyPed(this.playerPed);
    const damagedByAnyVehicle = HasEntityBeenDamagedByAnyVehicle(this.playerPed);
    for (const [weaponHash, weaponName] of Object.entries(weapons)) {
        if (HasEntityBeenDamagedByWeapon(this.playerPed, weaponHash, 0)) {
            Log(0, weaponName);
        }
    }
    if (damagedByAnyPed || damagedByAnyVehicle) {
        let damageModifier = 1.0;
        let bySharp = false;
        let infect = false;
        let infectionMultiplier = 1.0;
        const hitBy = GetMeleeTargetForPed(this.playerPed);
        const pedModel = GetEntityModel(hitBy);
        if (wildlife[pedModel]) {
            bySharp = wildlife[pedModel].damageType === DamageType.SHARP;
            damageModifier = wildlife[pedModel].modifier;
            if (Math.random() < wildlife[pedModel].infectious) {
                infect = true;
                infectionMultiplier = wildlife[pedModel].infectionMultiplier;
            }
        } else if (GetPedType(hitBy) === 28) {
            damageModifier = 5.0;
        }
        const byMelee = false;
        const byGun = false;
        // const byMelee = HasEntityBeenDamagedByWeapon(this.playerPed, 0, 1);
        // const byGun = HasEntityBeenDamagedByWeapon(this.playerPed, 0, 2);
        // const byFire = HasEntityBeenDamagedByWeapon(this.playerPed, GetHashKey('WEAPON_FIRE'), 0);
        const isOnFire = IsEntityOnFire(this.playerPed);

        // Log('byMelee', byMelee);
        // Log('byGun', byGun);
        // Log('byFire', byFire);
        // Log('isOnFire', isOnFire);

        if (isOnFire) {
            this.burned += 1.0;
            // Log(this.burned);
        }

        let damageType = DamageType.DEFAULT;
        if (!byMelee && byGun) {
            damageType = DamageType.GUN;
            damageModifier = 2.5;
        }
        if (bySharp) {
            damageType = DamageType.SHARP;
        }
        this.checkForBoneDamage(damageModifier, false, damageType, infect, infectionMultiplier);
        ClearEntityLastDamageEntity(this.playerPed);
    }
    */
    /*
    if (IsPedOnFoot(this.playerPed)) {
      const currentMoveBlend = GetPedDesiredMoveBlendRatio(this.playerPed);
      const isCarryingSomething = IsPedCarryingSomething(this.playerPed);
      if (IsPedJumping(this.playerPed)) {
        this.stamina = clamp(this.stamina - lerp(0.05, 0.25, currentMoveBlend / 3.0), 0, 100);
      }
      if (currentMoveBlend >= 2.0 || (isCarryingSomething && currentMoveBlend >= 1.0)) {
        this.stamina = clamp(
          this.stamina - lerp(0.0, isCarryingSomething ? 0.05 : 0.025, currentMoveBlend / 3.0),
          0,
          100,
        );
        // SetAttributeCoreValue(this.playerPed, 1, this.stamina);
      } else if (this.stamina < 100) {
        this.stamina = clamp(
          this.stamina + lerp(isCarryingSomething ? 0.025 : 0.05, 0.0, currentMoveBlend / 1.5),
          0,
          100,
        );
        // SetAttributeCoreValue(this.playerPed, 1, this.stamina);
      }
      const maxMoveBlendRatio = Math.min(lerp(1.0, 5.0, this.stamina / 100.0), this.desiredMaxBlendRatio);

      if (this.stamina < 10) {
        DisableControlAction(0, `INPUT_JUMP`, true);
      } else {
        EnableControlAction(0, `INPUT_JUMP`, true);
      }

      let boneSpeedLimit = 3;
      for (const moveSpeedSkel of moveSpeedSkels) {
        const boneInfo = this.boneNames[moveSpeedSkel];
        const boneHealth = this.boneHealth.get(boneInfo.id);
        if (!boneHealth && boneHealth !== 0) {
          continue;
        }
        boneSpeedLimit -= lerp(0.25, 0.0, boneHealth / 100);
      }

      let handShake = 0;
      if (IsPlayerFreeAiming(PlayerId())) {
        for (const handShakeSkel of handShakeSkels) {
          const boneInfo = this.boneNames[handShakeSkel];
          const boneHealth = this.boneHealth.get(boneInfo.id);
          if (!boneHealth && boneHealth !== 0) {
            continue;
          }
          handShake += lerp(0.2, 0.0, boneHealth / 100);
        }
        handShake = Math.round(handShake * 100) / 100;
      }
      if (handShake !== lastHandShake) {
        ShakeGameplayCam('HAND_SHAKE', handShake);
        lastHandShake = handShake;
      }

      SetPedMaxMoveBlendRatio(this.playerPed, Math.min(boneSpeedLimit, maxMoveBlendRatio, this.blendRatioForcedMax));
    } else if (this.stamina < 100) {
      this.stamina = clamp(this.stamina + 0.025, 0, 100);
      // SetAttributeCoreValue(this.playerPed, 1, this.stamina);
    }
    */
    /*
    const isRagdollThisTick = IsPedRagdoll(this.playerPed);

    if (!this.isRagdolling && isRagdollThisTick) {
      this.ragdollStart = GetGameTimer();
      this.ragdollDidDamage = false;
      const [hasDamagedBone, damagedBoneId] = GetPedLastDamageBone(this.playerPed);
      if (hasDamagedBone) {
        this.ragdollLastDamagedBone = damagedBoneId;
      }
      const coords = Vector3.fromArray(GetEntityCoords(this.playerPed));
      Log('=== [JS] === Start Z: ', coords.z);
      this.ragdollMaxZ = coords.z;
      this.ragdollLastZ = coords.z;
      this.isRagdolling = true;
    } else if (this.ragdollStart) {
      const coords = Vector3.fromArray(GetEntityCoords(this.playerPed));
      this.ragdollMaxZ = Math.max(this.ragdollMaxZ ?? -500, coords.z);
      if (isRagdollThisTick) {
        this.ragdollLastZ = Math.max(this.ragdollLastZ ?? -500, coords.z);
        const [hasDamagedBone, damagedBoneId] = GetPedLastDamageBone(this.playerPed);
        if (hasDamagedBone && this.ragdollLastDamagedBone !== damagedBoneId) {
          // TODO: Use max velocity to increase damage
          const fallHeight = Math.abs(this.ragdollLastZ - coords.z);
          if (fallHeight > 4.0) {
            this.ragdollDidDamage = true;
            const boneName = this.bones.get(damagedBoneId);
            if (boneName) {
              Log(`=== [JS] === Player hit bone ${boneName} for fall height of ${fallHeight}`);
              this.checkForBoneDamage(fallHeight, true, DamageType.FALL);
              this.ragdollLastDamagedBone = damagedBoneId;

              this.damageNearbyFromFall(boneName, damagedBoneId, fallHeight / 1.5);
              this.ragdollLastZ = coords.z;
            } else {
              console.error(`=== [JS] === Bone ${damagedBoneId} not found in boneNames`);
            }
          }
        }
      } else if (this.isRagdolling) {
        if (!this.ragdollDidDamage) {
          Log('=== [JS] === Ragdoll ended and no damage occurred');
        }
        const fallHeight = Math.abs(this.ragdollLastZ - coords.z);
        if (fallHeight > 4.0) {
          let [, damagedBoneId] = GetPedLastDamageBone(this.playerPed);
          damagedBoneId = damagedBoneId || this.randomBone();
          this.ragdollDidDamage = true;
          const boneName = this.bones.get(damagedBoneId);
          if (boneName) {
            Log(`=== [JS] === Player hit bone ${boneName} for fall height of ${fallHeight}`);
            this.checkForBoneDamage(fallHeight, true, DamageType.FALL);

            this.damageNearbyFromFall(boneName, damagedBoneId, fallHeight / 1.5);
            this.ragdollLastZ = coords.z;
          } else {
            console.error(`=== [JS] === Bone ${damagedBoneId} not found in boneNames`);
          }
        }
        // End Fall
        this.ragdollStart = undefined;
        this.isRagdolling = false;
        this.ragdollLastDamagedBone = undefined;
      }
    }
    */
    /*
    if (!this.isRagdolling) {
      if (IsControlPressed(0, GetHashKey('INPUT_SNIPER_ZOOM_IN_ONLY')) && this.desiredMaxBlendRatio < 3.0) {
        this.desiredMaxBlendRatio += 0.25;
        emitUI('hud.state', { moveSpeed: (this.desiredMaxBlendRatio / 3.0) * 100 });
      } else if (IsControlPressed(0, GetHashKey('INPUT_SNIPER_ZOOM_OUT_ONLY')) && this.desiredMaxBlendRatio > 0.25) {
        this.desiredMaxBlendRatio -= 0.25;
        emitUI('hud.state', { moveSpeed: (this.desiredMaxBlendRatio / 3.0) * 100 });
      }
      // Ragdoll with ]
      const ragdollKeyDown = IsControlPressed(0, 'INPUT_FRONTEND_RS');
      if (ragdollKeyDown && this.canRagdollWithKey) {
        Log('Ragdoll Key Pressed');
        SetPedToRagdoll(this.playerPed, 3000, 3000);
        this.canRagdollWithKey = false;
      } else if (!ragdollKeyDown && !this.canRagdollWithKey) {
        this.canRagdollWithKey = true;
      }
    }
    */
    // this.checkWalkCycle();
  }

  triggerFallDamage(fallHeight: number, damagedBoneId: number) {
    if (damagedBoneId === 0 || damagedBoneId === 694201337) {
      damagedBoneId = this.randomBone();
    }

    const boneName = this.bones.get(damagedBoneId);

    if (boneName) {
      Log(`Player hit bone ${boneName} for fall height of ${fallHeight}`);
      this.checkForBoneDamage(fallHeight, true, DamageType.FALL);
      this.damageNearbyFromFall(boneName, damagedBoneId, fallHeight / 1.5);
    } else {
      console.error(`Bone ${damagedBoneId} not found in boneNames`);
    }
  }

  bandageBone(infectionChance = 0): boolean {
    let itemWasUsed = false;
    for (const [name, bone] of Object.entries(this.boneNames)) {
      if (this.boneStatus.has(bone.id)) {
        const boneStatus = this.boneStatus.get(bone.id);
        if (boneStatus && (boneStatus.shot > 0 || boneStatus.slash > 0 || boneStatus.burned) && !boneStatus.bandaged) {
          itemWasUsed = true;
          Log('Bandaging', name);
          boneStatus.bandaged = true;
          if (Math.random() < infectionChance) {
            boneStatus.infectedBySelf = true;
            boneStatus.infected = true;
          }
          break;
        }
      }
    }
    return itemWasUsed;
  }

  splintBone(): boolean {
    let itemWasUsed = false;
    for (const [name, bone] of Object.entries(this.boneNames)) {
      if (this.boneStatus.has(bone.id)) {
        const boneStatus = this.boneStatus.get(bone.id);
        if (boneStatus?.broken && !boneStatus.stabilized) {
          itemWasUsed = true;
          Log('Splinting', name);
          boneStatus.stabilized = true;
          break;
        }
      }
    }
    return itemWasUsed;
  }

  popOxy(): boolean {
    if (this.infectionStabilized) {
      return false;
    }
    let itemWasUsed = false;
    for (const [name, bone] of Object.entries(this.boneNames)) {
      if (this.boneStatus.has(bone.id)) {
        const boneStatus = this.boneStatus.get(bone.id);
        if (boneStatus?.infected && !this.infectionStabilized) {
          itemWasUsed = true;
          Log('Anti-Infection', name);
          this.infectionStabilized = true;
          break;
        }
      }
    }
    return itemWasUsed;
  }
}

const healthManager = HealthManager.getInstance();

export default healthManager;
