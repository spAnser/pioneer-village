import { PVBase, PVGame } from '@lib/client';
import { AnimFlag } from '@lib/flags';
import { Delay } from '@lib/functions';
import BirdTypes from '@lib/shared/bird-types';

const BIRD_MODELS = Object.fromEntries(
  Object.entries(BirdTypes).map(([birdType, data]) => [birdType, data.model && GetHashKey(data.model)]),
) as Record<CarrierBirds.BirdTypes, number>;

const LETTER_MODEL = GetHashKey('p_letterenvelope_cs01x');

const getBirdModel = (birdType: CarrierBirds.BirdTypes): number => BIRD_MODELS[birdType] || BIRD_MODELS.pigeon;

// TODO: The pool should not be delayed by the awaiting deletion of the bird.

export class BirdManager {
  protected static instance: BirdManager;
  protected pool = new Set<CarrierBirds.BirdEvent>();
  protected isBirdActive = false;

  static getInstance(): BirdManager {
    if (!BirdManager.instance) {
      BirdManager.instance = new BirdManager();
    }
    return BirdManager.instance;
  }

  initialized = false;

  async init() {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
  }

  registerEvent(event: CarrierBirds.BirdEvent) {
    this.pool.add(event);
    this.handleEvent();
  }

  async handleEvent() {
    if (this.isBirdActive) {
      return;
    }
    const event = this.pool.values().next().value;
    if (!event) {
      return;
    }
    this.pool.delete(event);
    this.isBirdActive = true;

    console.log('[BirdManager] Handling bird event', event);

    switch (event.type) {
      case 'return':
        await this.playReturnAnimation(event.birdType);
        break;
      case 'arrival':
        await this.playArriveAnimation(event.birdType);
        break;
      case 'send':
        await this.playSendAnimation(event.birdType);
        break;
    }

    this.isBirdActive = false;
    this.handleEvent();
  }

  async spawnBird(birdType: CarrierBirds.BirdTypes) {
    const model = getBirdModel(birdType);
    await PVGame.loadModel(model);
    await PVGame.loadModel(LETTER_MODEL);

    const player = PVGame.playerPed();
    const spawnCoords = GetOffsetFromEntityInWorldCoords(player, 5.0, 5.0, 5.0);
    const bird = CreatePed(model, spawnCoords[0], spawnCoords[1], spawnCoords[2], 0.0, false, false, false, false);

    if (birdType === 'owl') {
      SetPedScale(bird, 0.5);
    }

    SetPedPromptName(bird, '');
    SetEntityCollision(bird, false, false);
    SetEntityCompletelyDisableCollision(bird, false, false);
    Citizen.invokeNative('0x283978a15512b2fe', bird, 1);

    return bird;
  }

  async flyBirdToShoulder(bird: number, birdType: CarrierBirds.BirdTypes) {
    const player = PVGame.playerPed();
    const shoulderBoneIndex = GetEntityBoneIndexByName(player, 'CP_L_Shoulder');

    let arrived = false;
    while (!arrived) {
      const shoulderCoords = GetWorldPositionOfEntityBone(player, shoulderBoneIndex);
      const speed = GetEntitySpeed(player);
      const forward = GetEntityForwardVector(player);
      TaskFlyToCoord(
        bird,
        100.0,
        shoulderCoords[0] + forward[0] * speed,
        shoulderCoords[1] + forward[1] * speed,
        shoulderCoords[2] + forward[2] * speed,
        true,
        true,
      );
      await Delay(500);

      const birdCoords = GetEntityCoords(bird, false, false);
      const currentShoulderCoords = GetWorldPositionOfEntityBone(player, shoulderBoneIndex);
      const dx = birdCoords[0] - currentShoulderCoords[0];
      const dy = birdCoords[1] - currentShoulderCoords[1];
      const dz = birdCoords[2] - currentShoulderCoords[2];
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (distance <= 1) {
        arrived = true;
      }
    }

    ClearPedTasksImmediately(bird, false, false);
    AttachEntityToEntity(
      bird,
      player,
      shoulderBoneIndex,
      0.02,
      0.0,
      birdType === 'owl' ? 0.16 : 0.06,
      0.0,
      0.0,
      180.0,
      true,
      true,
      true,
      true,
      1,
      true,
      false,
      false,
    );
  }

  attachLetterToBird(bird: number) {
    const birdCoords = GetEntityCoords(bird, false, false);
    const letter = CreateObject(LETTER_MODEL, birdCoords[0], birdCoords[1], birdCoords[2], true, false, false);
    const boneIndex = GetEntityBoneIndexByName(bird, 'PH_R_Foot');
    AttachEntityToEntity(
      letter,
      bird,
      boneIndex,
      0.0,
      0.0,
      0.0,
      90.0,
      0.0,
      0.0,
      true,
      false,
      false,
      true,
      1,
      true,
      false,
      false,
    );
    return letter;
  }

  async playGiveBirdLetter() {
    await PVGame.playAnimTask({
      dict: 'mech_inspection@generic@lh@satchel',
      anim: 'enter',
      flags: AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
      delta: 0,
      duration: 1000,
    });

    const letter = await PVGame.createObject(LETTER_MODEL);
    PVGame.attachEntityToBoneName(
      letter,
      'SKEL_L_HAND',
      PVGame.playerPed(),
      { x: 0.075, y: 0, z: 0.075 },
      { x: 90, y: 0, z: 45 },
    );

    await PVGame.playAnimTask({
      dict: 'mech_skin@raven@carried@human',
      anim: 'grip_lt_shoulder',
      flags: AnimFlag.REPEAT + AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
      duration: 900,
    });
    PVBase.deleteEntity(letter);
  }

  async flyAway(bird: number, withLetter: boolean) {
    let letter: number | undefined;
    if (withLetter) {
      letter = this.attachLetterToBird(bird);
    }

    ClearPedTasks(bird, false, false);
    TaskFlyAway(bird, 0);
    await Delay(500);
    DetachEntity(bird, false, false);
    SetEntityCollision(bird, false, false);
    SetEntityCompletelyDisableCollision(bird, false, false);
    await Delay(500);
    SetEntityCollision(bird, true, true);
    SetEntityCompletelyDisableCollision(bird, true, true);

    await Delay(10000);
    if (letter !== undefined) PVBase.deleteEntity(letter);
    PVBase.deleteEntity(bird);
  }

  async playArriveAnimation(birdType: CarrierBirds.BirdTypes) {
    console.log('[Pigeons] Playing arrive animation');
    const bird = await this.spawnBird(birdType);
    const letter = this.attachLetterToBird(bird);
    await this.flyBirdToShoulder(bird, birdType);
    const tick = setTick(() => {
      TaskAnimalUnalerted(bird, -1, 0, 0, 0);
    });
    await PVGame.playAnimTask({
      dict: 'mech_skin@raven@carried@human',
      anim: 'grip_lt_shoulder',
      flags: AnimFlag.REPEAT + AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
      duration: 900,
    });

    DetachEntity(letter, false, false);
    PVGame.attachEntityToBoneName(
      letter,
      'SKEL_L_HAND',
      PVGame.playerPed(),
      { x: 0.075, y: 0, z: 0.075 },
      { x: 90, y: 0, z: 45 },
    );
    await PVGame.playAnimTask({
      dict: 'mech_inspection@generic@lh@satchel',
      anim: 'enter',
      flags: AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
      delta: 0.35,
      duration: 500,
    });

    await PVGame.playAnimTask({
      dict: 'mech_inspection@generic@lh@satchel',
      anim: 'exit_satchel',
      flags: AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
      async onStart() {
        await Delay(1000);
        PVBase.deleteEntity(letter);
      },
    });
    clearTick(tick);
    this.flyAway(bird, false);
  }

  async playReturnAnimation(birdType: CarrierBirds.BirdTypes) {
    console.log('[Birds] Playing return animation');
    const bird = await this.spawnBird(birdType);
    await this.flyBirdToShoulder(bird, birdType);
    const tick = setTick(() => {
      TaskAnimalUnalerted(bird, -1, 0, 0, 0);
    });

    await PVGame.playAnimTask({
      dict: 'mech_skin@raven@carried@human',
      anim: 'grip_lt_shoulder',
      flags: AnimFlag.REPEAT + AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
      duration: 900,
    });

    clearTick(tick);
    PVBase.deleteEntity(bird);

    await PVGame.playAnimTask({
      dict: 'mech_inspection@generic@lh@satchel',
      anim: 'exit_satchel',
      flags: AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
    });
  }

  async playSendAnimation(birdType: CarrierBirds.BirdTypes) {
    console.log('[Pigeons] Playing send animation');
    const bird = await this.spawnBird(birdType);
    await this.flyBirdToShoulder(bird, birdType);
    const tick = setTick(() => {
      TaskAnimalUnalerted(bird, -1, 0, 0, 0);
    });
    await this.playGiveBirdLetter();
    clearTick(tick);
    await this.flyAway(bird, true);
  }
}

const birdManager = BirdManager.getInstance();

export default birdManager;
