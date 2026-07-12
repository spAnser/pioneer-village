import { type EventData, PVGame, PVGameEvents, awaitUI } from '@lib/client';
import { SetPlayerControlFlags } from '@lib/flags/set-player-control';
import { Delay } from '@lib/functions';
import { Vector3 } from '@lib/math';

import { PELTS_HASHED, PROVISION_HASHES } from '../../shared/data/pelts';
import stableController from './stable-controller';

export class PeltController {
  protected static instance: PeltController;

  static getInstance(): PeltController {
    if (!PeltController.instance) {
      PeltController.instance = new PeltController();
    }
    return PeltController.instance;
  }

  initialized = false;

  constructor() {
    PVGameEvents.register('EVENT_PLACE_CARRIABLE_ONTO_PARENT', (data) => {
      this.eventPlaceCarriable(data);
    });

    PVGameEvents.register('EVENT_PICKUP_CARRIABLE', (data) => {
      this.eventPickupCarriable(data);
    });

    this.init();
  }

  async init() {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
  }

  eventPlaceCarriable(data: EventData['EVENT_PLACE_CARRIABLE_ONTO_PARENT']) {
    // console.log('EVENT_PLACE_CARRIABLE_ONTO_PARENT', data);

    const horseId = Entity(data.carrier).state.horseId;
    // console.log('Horse ID:', horseId);
    if (!horseId || !stableController.isUnstabled(horseId)) {
      return;
    }

    if (data.inventoryItemHash === 0) {
      this.storeCorpse(horseId, data);
    } else {
      this.storePelt(horseId, data);
    }
  }

  storeCorpse(horseId: number, data: EventData['EVENT_PLACE_CARRIABLE_ONTO_PARENT']) {
    const model = GetEntityModel(data.carriable);

    const horseState = Entity(data.carrier).state;

    const corpses: Record<string, [number, number, number, number]> = horseState.corpses || {};

    let outfit: number;
    let quality = -1;
    let looted = IsEntityFullyLooted(data.carriable) ? 1 : 0;

    if (IsEntityAPed(data.carriable)) {
      outfit = GetPedMetaOutfitHash(data.carriable);
      quality = GetPedDamageCleanliness(data.carriable) || 0;
    } else {
      outfit = GetCarriableFromEntity(data.carriable);
    }

    corpses[data.slot] = [model, outfit, quality, looted];

    horseState.set('corpses', corpses, true);
    console.log('Corpses\n', JSON.stringify(corpses, null, 2));

    this.updateHorseCorpses(horseId, corpses);
  }

  storePelt(horseId: number, data: EventData['EVENT_PLACE_CARRIABLE_ONTO_PARENT']) {
    if (!GetIsCarriablePelt(data.carriable)) return;

    const peltTexture = Citizen.invokeNative<number>('0x120376c23f019c6c', data.carriable, Citizen.pointerValueInt());
    const horseState = Entity(data.carrier).state;

    // console.log('Pelt with texture placed on horse', peltTexture);

    const pelts: [number, number][] = horseState.pelts || [];

    // console.log(`Horse ${horseEntity} last pelts:`, pelts);

    pelts.push([data.inventoryItemHash, peltTexture]);

    horseState.set('pelts', pelts, true);
    console.log('Pelts\n', pelts.join('\n '));

    this.updateHorsePelts(horseId, pelts);
  }

  eventPickupCarriable(data: EventData['EVENT_PICKUP_CARRIABLE']) {
    if (!data.isPickupDoneFromParent) {
      return;
    }

    const horseState = Entity(data.carrierMount).state;
    const horseId = horseState.horseId;
    // console.log('Horse ID:', horseId);
    if (!horseId || !stableController.isUnstabled(horseId)) {
      return;
    }
    console.log('Picked up carriable from horse', data);

    const model = GetEntityModel(data.carriable);

    const corpses: Record<string, [number, number, number, number]> = horseState.corpses || {};
    const matchedSlots: string[] = [];
    for (const [slot, corpse] of Object.entries(corpses)) {
      if (corpse[0] === model) {
        matchedSlots.push(slot);
      }
    }

    if (matchedSlots.length === 0) {
      return;
    }

    if (matchedSlots.length > 1) {
      const isLeft = this.fromLeft(data.carrierMount);
      if (isLeft && matchedSlots.includes('5')) {
        //left corpses are slot 5
        delete corpses[5];
      } else if (!isLeft && matchedSlots.includes('6')) {
        //right corpses are slot 6
        delete corpses[6];
      }
    } else {
      delete corpses[matchedSlots[0]];
    }

    this.updateHorseCorpses(horseId, corpses);
    horseState.set('corpses', corpses, true);
    console.log('Corpses\n', JSON.stringify(corpses, null, 2));
  }

  fromLeft(horsePed: number) {
    const coords = PVGame.playerCoords(true);
    const offset = GetOffsetFromEntityGivenWorldCoords(horsePed, coords.x, coords.y, coords.z);

    if (offset[0] < 0) {
      return true;
    }
  }

  async removePelt(horsePed: number) {
    const horseState = Entity(horsePed).state;
    const pelts: [number, number][] = horseState.pelts || [];
    if (pelts.length === 0) {
      return;
    }

    const player = PVGame.playerPed();
    const horseHeading = GetEntityHeading(horsePed);

    const playerPosition = Vector3.fromObject(PVGame.playerCoords(true));
    const left = Vector3.fromArray(GetOffsetFromEntityInWorldCoords(horsePed, -0.7, -0.45, 0));
    const right = Vector3.fromArray(GetOffsetFromEntityInWorldCoords(horsePed, 0.7, -0.45, 0));

    const leftDistance = playerPosition.getDistance(left);
    const rightDistance = playerPosition.getDistance(right);

    SetPlayerControl(PlayerId(), false, SetPlayerControlFlags.SPC_LEAVE_CAMERA_CONTROL_ON, true);
    if (leftDistance < rightDistance) {
      TaskGoToCoordAnyMeans(player, left.x, left.y, left.z, 1.5, 0, false, 0, 0);
      await PVGame.reachedCoords(left, 1.0, 3_000);
      SetPedDesiredHeading(player, horseHeading - 90);
    } else {
      TaskGoToCoordAnyMeans(player, right.x, right.y, right.z, 1.5, 0, false, 0, 0);
      await PVGame.reachedCoords(right, 1.0, 3_000);
      SetPedDesiredHeading(player, horseHeading + 90);
    }

    await Delay(1_000);

    const pelt = pelts.pop();
    if (!pelt) {
      return false;
    }

    const spawned = await this.spawnPelt(pelt);
    if (!spawned) {
      return false;
    }
    SetPlayerControl(PlayerId(), true, 0, false);

    horseState.set('pelts', pelts, true);
    console.log('Pelts\n', pelts.join('\n '));

    stableController.setupHorsePelts(horsePed);

    const horseId = horseState.horseId;
    if (horseId) {
      this.updateHorsePelts(horseId, pelts);
    }
    return true;
  }

  async spawnPelt(pelt: [number, number]) {
    const [provision, texture] = pelt;

    const provisionData = PROVISION_HASHES[provision];
    const textureData = PELTS_HASHED[texture];
    if (!provisionData || !textureData) {
      return false;
    }

    console.log('Spawning pelt with provision:', provisionData, textureData);

    const { model, carryConfig } = provisionData;
    const { albedo, normal, material } = textureData;

    const coords = PVGame.playerCoords();
    coords.z -= 2;

    const object = await PVGame.createObject(model, coords);
    if (!object) {
      return false;
    }

    TaskCarriable(object, carryConfig, 0, 0, 0);
    SetEntityCarcassType(object, provision);

    RequestStreamedTxd(albedo, false);
    RequestStreamedTxd(normal, false);
    RequestStreamedTxd(material, false);

    await Delay(100);

    Citizen.invokeNative(
      '0xDD03FC2089AD093C', // Apply pelt texture
      object,
      provision,
      texture,
      0,
    );

    await PVGame.playAnimTask({
      dict: 'mech_skin@armadillo@horse_satchel@remove@lt',
      anim: 'enter_lf',
    });

    TaskPickupCarriableEntity(PlayerPedId(), object);

    return true;
  }

  updateHorseCorpses(horseId: number, corpses: Record<string, [number, number, number, number]>) {
    const horse = stableController.getHorseById(horseId);
    if (!horse) {
      return;
    }
    horse.corpses = corpses;
    horse.save();
  }

  updateHorsePelts(horseId: number, pelts: [number, number][]) {
    const horse = stableController.getHorseById(horseId);
    if (!horse) {
      return;
    }
    horse.pelts = pelts;
    horse.save();
  }
}

const peltController = PeltController.getInstance();

export default peltController;
