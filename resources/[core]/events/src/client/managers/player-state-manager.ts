import { Delay } from '@lib/functions';

const IS_PED_AIMING_IN_AIR = '0x8785E6E40C7A8819';
const GET_ITEM_INTERACTION_STATE = '0x6AA3DCA2C6F5EB6D';
const GET_ITEM_INTERACTION_ENTITY_FROM_PED = '0x05A0100EA714DB68';
const IS_WEAPON_THROWABLE = '0x30E7C16B12DA8211';
const IS_PED_ON_ROAD = '0xE631EAF35828FA67';

const MELEE_COMBAT_LINGER_MS = 250;
const CACHE_BROADCAST_INTERVAL_MS = 10 * 1000;

/**
 * Ports the derived player-state cache from the retired events_manager
 * resource: polls RDR3 natives once per frame and emits events only on
 * state transitions, so consumers don't need to poll natives themselves.
 */
export class PlayerStateManager {
  protected static instance: PlayerStateManager;

  static getInstance(): PlayerStateManager {
    if (!PlayerStateManager.instance) {
      PlayerStateManager.instance = new PlayerStateManager();
    }
    return PlayerStateManager.instance;
  }

  protected playerId = PlayerId();
  protected ped = PlayerPedId();
  protected lastCacheBroadcast = 0;
  protected onRoad = false;

  protected currentRightHandWeapon = 0;
  protected currentLeftHandWeapon = 0;
  protected isAimingInAir = false;
  protected isInMeleeCombat = false;
  protected meleeCombatTimer = 0;
  protected isInFirstPerson = false;
  protected isAiming = false;
  protected lastInteraction = 0;
  protected lastInteractionEntity = 0;
  protected wasOnMount = false;
  protected wasLeading = false;
  protected wasInVehicle = false;
  protected currentSeat: number | undefined;
  protected lastSeat: number | undefined;
  protected lastMount = 0;
  protected lastVehicle = 0;
  protected throwableThreadRunning = false;

  protected getPedSeat(vehicle: number, ped: number): number | undefined {
    for (let i = -1; i <= 10; i++) {
      if (GetPedInVehicleSeat(vehicle, i) === ped) {
        return i;
      }
    }
    return undefined;
  }

  protected manageThrowables(weapon: number): void {
    if (this.throwableThreadRunning) return;
    this.throwableThreadRunning = true;

    CreateThread(async () => {
      let ammo = GetAmmoInClip(this.ped, weapon);

      while (Citizen.invokeNative<boolean>(IS_WEAPON_THROWABLE, weapon)) {
        const currentAmmo = GetAmmoInClip(this.ped, weapon);

        if (IsPedShooting(this.ped) || ammo !== currentAmmo) {
          ammo = currentAmmo;
          emit('events:throwing', this.currentRightHandWeapon);
        }

        await Delay(0);
      }

      this.throwableThreadRunning = false;
    });
  }

  tick(): void {
    const now = GetGameTimer();
    const ped = PlayerPedId();

    if (now - this.lastCacheBroadcast > CACHE_BROADCAST_INTERVAL_MS || this.ped !== ped) {
      this.lastCacheBroadcast = now;
      emit('events:cache', { playerId: this.playerId, ped, onRoad: this.onRoad });
    }
    this.ped = ped;

    if (!DoesEntityExist(this.ped)) return;

    const meleeCombat = IsPedInMeleeCombat(this.ped);
    const firstPerson = IsFirstPersonCameraActive(false, false, false) === 1;

    const [hasRightHandWeapon, rightHandWeapon] = GetCurrentPedWeapon(this.ped, true, 0, false);
    const [hasLeftHandWeapon, leftHandWeapon] = GetCurrentPedWeapon(this.ped, true, 1, false);

    const currentlyAiming = IsPlayerFreeAiming(this.playerId);
    const aimingInAir = Citizen.invokeNative<boolean>(IS_PED_AIMING_IN_AIR, this.ped);

    const vehicle = GetVehiclePedIsIn(this.ped, false);
    const inVehicle = vehicle !== 0;

    const mount = GetMount(this.ped);
    const onMount = mount !== 0;

    const leading = GetLastLedMount(this.ped);
    const isLeading = IsPedLeadingHorse(this.ped) !== 0;

    const interaction = Citizen.invokeNative<number>(GET_ITEM_INTERACTION_STATE, this.ped);

    if (
      (hasRightHandWeapon && this.currentRightHandWeapon !== rightHandWeapon) ||
      (hasLeftHandWeapon && this.currentLeftHandWeapon !== leftHandWeapon)
    ) {
      this.currentRightHandWeapon = rightHandWeapon;
      this.currentLeftHandWeapon = leftHandWeapon;

      if (Citizen.invokeNative<boolean>(IS_WEAPON_THROWABLE, rightHandWeapon)) {
        this.manageThrowables(rightHandWeapon);
      }

      emit('events:weapon', [this.currentRightHandWeapon, this.currentLeftHandWeapon]);
    }

    if (aimingInAir && !this.isAimingInAir) {
      this.isAimingInAir = true;
      emit('events:aimingInAir', this.isAimingInAir);
    } else if (this.isAimingInAir && !aimingInAir) {
      this.isAimingInAir = false;
      emit('events:aimingInAir', this.isAimingInAir);
    }

    if (meleeCombat && !this.isInMeleeCombat) {
      this.isInMeleeCombat = true;
      this.meleeCombatTimer = now;
      emit('events:meleCombat', this.isInMeleeCombat);
    } else if (!meleeCombat && this.isInMeleeCombat && now - this.meleeCombatTimer > MELEE_COMBAT_LINGER_MS) {
      this.isInMeleeCombat = false;
      emit('events:meleCombat', this.isInMeleeCombat);
    }

    if (firstPerson && !this.isInFirstPerson) {
      this.isInFirstPerson = true;
      emit('events:firstPerson', this.isInFirstPerson);
    } else if (!firstPerson && this.isInFirstPerson) {
      this.isInFirstPerson = false;
      emit('events:firstPerson', this.isInFirstPerson);
    }

    if (HaveControlsChanged(0)) {
      emit('events:controlsChanged');
    }

    if (currentlyAiming && !this.isAiming) {
      this.isAiming = true;
      emit('events:aiming', this.isAiming);
    } else if (!currentlyAiming && this.isAiming) {
      this.isAiming = false;
      emit('events:aiming', this.isAiming);
    }

    if (interaction && this.lastInteraction !== interaction) {
      this.lastInteractionEntity = Citizen.invokeNative<number>(GET_ITEM_INTERACTION_ENTITY_FROM_PED, this.ped);
      this.lastInteraction = interaction;
      emit('events:itemInteraction', true, this.lastInteraction, this.lastInteractionEntity);
    } else if (this.lastInteraction && !interaction) {
      emit('events:itemInteraction', false, this.lastInteraction, this.lastInteractionEntity);
      this.lastInteraction = 0;
      this.lastInteractionEntity = 0;
    }

    if (!this.wasOnMount && onMount) {
      this.wasOnMount = true;
      this.currentSeat = this.getPedSeat(mount, this.ped);
      this.lastMount = mount;
      this.lastSeat = this.currentSeat;
      emit('events:mount', onMount, mount, this.currentSeat);
    } else if (this.wasOnMount && !onMount) {
      this.wasOnMount = false;
      this.currentSeat = undefined;
      emit('events:mount', onMount, this.lastMount, this.lastSeat);
      this.lastSeat = undefined;
      this.lastMount = 0;
    }

    if (!this.wasLeading && isLeading) {
      this.wasLeading = true;
      emit('events:leading', isLeading, leading);
    } else if (this.wasLeading && !isLeading) {
      this.wasLeading = false;
      emit('events:leading', isLeading, leading);
    }

    if (!this.wasInVehicle && inVehicle) {
      this.wasInVehicle = true;
      this.currentSeat = this.getPedSeat(vehicle, this.ped);
      this.lastVehicle = vehicle;
      this.lastSeat = this.currentSeat;
      emit('events:vehicle', inVehicle, vehicle, this.currentSeat);
    } else if (this.wasInVehicle && !inVehicle) {
      this.wasInVehicle = false;
      this.currentSeat = undefined;
      emit('events:vehicle', inVehicle, this.lastVehicle, this.lastSeat);
      this.lastSeat = undefined;
      this.lastVehicle = 0;
    }

    if (this.currentSeat !== undefined) {
      const seat = this.getPedSeat(inVehicle ? vehicle : mount, this.ped);
      if (seat !== this.currentSeat) {
        emit('events:seat', seat, this.currentSeat);
        this.currentSeat = seat;
        this.lastSeat = this.currentSeat;
      }
    }

    const onRoad = Citizen.invokeNative<boolean>(IS_PED_ON_ROAD, this.playerId);
    if (onRoad && !this.onRoad) {
      this.onRoad = true;
      emit('events:onRoad', true);
    } else if (!onRoad && this.onRoad) {
      this.onRoad = false;
      emit('events:onRoad', false);
    }
  }
}

export default PlayerStateManager.getInstance();
