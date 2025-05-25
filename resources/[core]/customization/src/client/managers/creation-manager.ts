import { emitUI, focusUI, PVBase, PVCamera, PVGame } from '@lib/client';
import { Delay } from '@lib/functions';
import { PedMotionState } from '@lib/flags/ped-motion-state';
import { Log } from '@lib/client/comms/ui';
import { componentManager } from './component-manager';
import waists from '../data/waists';
import bodyTypes from '../data/body-types';

enum CreationState {
  None = -1,
  GenderSelection = 0,
  NameSelection = 1,
  ClothingSelection = 2,
}

const faceFeatures: Record<string, number> = {
  headWidth: 0x84d6,
  eyebrowHeight: 0x3303,
  eyebrowWidth: 0x2ff9,
  eyebrowDepth: 0x4ad1,
  earsWidth: 0xc04f,
  earsAngle: 0xb6ce,
  earsHeight: 0x2844,
  earlobeSize: 0xed30,
  cheekBoneHeight: 0x6a0b,
  cheekBoneWidth: 0xabcf,
  cheekBoneDepth: 0x358d,
  jawHeight: 0x8d0a,
  jawWidth: 0xebae,
  jawDepth: 0x1df6,
  chinHeight: 0x3c0f,
  chinWidth: 0xc3b2,
  chinDepth: 0xe323,
  eyelidHeight: 0x8b2b,
  eyelidWidth: 0x1b6b,
  eyesDepth: 0xee44,
  eyesAngle: 0xd266,
  eyesDistance: 0xa54e,
  eyesHeight: 0xddfb,
  noseWidth: 0x6e7f,
  noseSize: 0x3471,
  noseHeight: 0x03f5,
  noseAngle: 0x34b1,
  noseCurvature: 0xf156,
  nostrilsDistance: 0x561e,
  mouthWidth: 0xf065,
  mouthDepth: 0xaa69,
  mouthXPos: 0x7ac3,
  mouthYPos: 0x410d,
  upperLipHeight: 0x1a00,
  upperLipWidth: 0x91c1,
  upperLipDepth: 0xc375,
  lowerLipHeight: 0xbb4d,
  lowerLipWidth: 0xb0b0,
  lowerLipDepth: 0x5d16,
  horseGender: 0xa28b,
};

class CreationManager {
  protected static instance: CreationManager;

  static getInstance(): CreationManager {
    if (!CreationManager.instance) {
      CreationManager.instance = new CreationManager();
    }
    return CreationManager.instance;
  }

  private currentState: Customization.CreationState = CreationState.None;

  private maleComponents = [
    bodyTypes[2].hash,
    waists[0],
    // 1537699023, // Prison Shirt
    // 560337648, // Prison Pants
    // -1136463505, // Darned Stockings
    // 1963778820, // Darned Stockings Blue
    GetHashKey('CLOTHING_ITEM_M_TEETH_000'),
    // GetHashKey('CLOTHING_M_SEASON3_NIGHTGOWN_001_TINT_001'),
    // GetHashKey('CLOTHING_ITEM_M_SHIRT_000_TINT_001'),
    // GetHashKey('CLOTHING_ITEM_M_PANTS_000_TINT_001'),
    GetHashKey('CLOTHING_ITEM_M_BODIES_UPPER_001_V_001'),
    GetHashKey('CLOTHING_ITEM_M_BODIES_LOWER_001_V_001'),
    GetHashKey('CLOTHING_ITEM_M_EYES_001_TINT_001'),
    GetHashKey('CLOTHING_ITEM_M_HEAD_001_V_001'),
    GetHashKey('CLOTHING_ITEM_M_HAIR_001_BLONDE'),
  ];
  private femaleComponents = [
    bodyTypes[2].hash,
    waists[0],
    // 1790080661, // Prison Shirt
    // 1975258357, // Prison Pants
    // -755702786, // Darned Stockings
    // -864332025, // Darned Stockings Blue
    GetHashKey('CLOTHING_ITEM_F_TEETH_000'),
    // GetHashKey('CLOTHING_F_SEASON3_NIGHTGOWN_001_TINT_001'),
    // GetHashKey('CLOTHING_ITEM_F_SHIRT_000_TINT_001'),
    // GetHashKey('CLOTHING_ITEM_F_PANTS_000_TINT_001'),
    GetHashKey('CLOTHING_ITEM_F_BODIES_UPPER_001_V_001'),
    GetHashKey('CLOTHING_ITEM_F_BODIES_LOWER_001_V_001'),
    GetHashKey('CLOTHING_ITEM_F_EYES_001_TINT_001'),
    GetHashKey('CLOTHING_ITEM_F_HEAD_001_V_001'),
    GetHashKey('CLOTHING_ITEM_F_HAIR_001_BLONDE'),
  ];

  private male = 0;
  private female = 0;
  private chosen = 0;

  private currentGender: 'male' | 'female' = 'male';

  constructor() {
    on('onResourceStop', (resourceName: string) => {
      console.log('onResourceStop', resourceName);
      if (resourceName !== GetCurrentResourceName()) {
        return;
      }
      this.destroy();
    });
  }

  destroy() {
    if (this.currentState === CreationState.None) {
      return;
    }

    emitUI('customization.state', { show: false });
    focusUI(false, false);

    this.destroyCameras();
    this.destroyScene();
    this.destroyPeds();

    this.currentState = CreationState.None;
    this.currentGender = 'male';
  }

  async start() {
    if (this.currentState !== -1) {
      return;
    }
    this.currentState = CreationState.GenderSelection;

    DoScreenFadeOut(500);
    await Delay(500);

    this.createCameras();
    this.createScene();

    await this.createMFPeds();

    // SetCamActive(cameraMale, true);
    // RenderScriptCams(true, false, 2000, true, false, 0);
    // PointCamAtEntity(cameraMale, male, 0.0, 0.0, 0.0, true);
    PVCamera.setActive('CreationMale', 0);
    PVCamera.pointAtEntity('CreationMale', this.male);

    SetEntityAlpha(this.male, 255, false);
    SetEntityAlpha(this.female, 50, false);

    DoScreenFadeIn(500);

    emitUI('customization.state', { show: true, state: 'gender', gender: 'male' });
    focusUI(true, true);
  }

  private createCameras() {
    PVCamera.create({
      id: 'CreationMale',
      coords: { x: -564.0, y: -3776.0, z: 239.0 },
      rot: { x: -4.0, y: 0.0, z: -85.0 },
      fov: 30,
    });

    PVCamera.create({
      id: 'CreationFemale',
      coords: { x: -564.0, y: -3776.0, z: 239.0 },
      rot: { x: -4.0, y: 0.0, z: -100.0 },
      fov: 30,
    });

    PVCamera.create({
      id: 'CreationTransition',
      coords: { x: -558.5, y: -3779.25, z: 239.0 },
      rot: { x: -4.0, y: 0.0, z: -180.0 },
      fov: 30,
    });

    PVCamera.create({
      id: 'CreationDressing',
      coords: { x: -562.5, y: -3781.0, z: 238.9 },
      rot: { x: -4.0, y: 0.0, z: -90.0 },
      fov: 30,
    });

    PVCamera.create({
      id: 'CreationFace',
      coords: { x: -559.5, y: -3781.0, z: 239.25 },
      rot: { x: -4.0, y: 0.0, z: -90.0 },
      fov: 30,
    });
  }

  private destroyCameras() {
    PVCamera.destroy('CreationMale');
    PVCamera.destroy('CreationFemale');
    PVCamera.destroy('CreationTransition');
    PVCamera.destroy('CreationDressing');
    PVCamera.destroy('CreationFace');
  }

  private createScene() {
    SetOverrideWeather(`sunny`);

    NetworkClockTimeOverride(10, 0, 0, 0, true);
    SetTimecycleModifier('Online_Character_Editor');

    ReserveNetworkClientMissionPeds(4);
    // Citizen.InvokeNative(0x4CC5F2FC1332577F, 1779876696)
    ParseddataLoadFileHash(-641739913);
    RequestIplHash(GetHashKey('MP001_MP_LOBBY_CHARMILO_EXT'));
    RequestIplHash(1679934574);
    RequestIplHash(183712523);
    LoadSceneStartSphere(-561.4, -3782.6, 237.6, 50.0, 4);
  }

  private destroyScene() {
    ClearOverrideWeather();
    NetworkClearClockTimeOverride();
    ClearTimecycleModifier();
    RemoveIplHash(GetHashKey('MP001_MP_LOBBY_CHARMILO_EXT'));
    RemoveIplHash(1679934574);
    RemoveIplHash(183712523);
  }

  highlightGender(gender: 'male' | 'female') {
    if (this.currentGender !== gender) {
      this.currentGender = gender;

      PlaySoundFrontend('SELECT', 'RDRO_Character_Creator_Sounds', true, 0);

      if (gender === 'male') {
        PVCamera.interpolate('CreationMale', 500);
        SetEntityAlpha(this.male, 255, false);
        SetEntityAlpha(this.female, 50, false);
      } else {
        PVCamera.interpolate('CreationFemale', 500);
        SetEntityAlpha(this.male, 50, false);
        SetEntityAlpha(this.female, 255, false);
      }
    }
  }

  async chooseGender() {
    emitUI('customization.state', { state: 'transition' });
    this.chosen = await PVGame.createPed(
      this.currentGender === 'male' ? 'mp_male' : 'mp_female',
      -558.5,
      -3781.05,
      237.66,
      90,
      true,
    );
    await PVGame.pedIsReadyToRender(this.chosen);
    // await PVGame.setPedComponentsMp(this.chosen, this.maleComponents);
    ClonePedToTarget(this.currentGender === 'male' ? this.male : this.female, this.chosen);
    await PVGame.pedIsReadyToRender(this.chosen);
    PVGame.finalizePedOutfit(this.chosen);
    Log('Create Chosen Ped', this.chosen);
    ForcePedMotionState(this.chosen, PedMotionState.DoNothing, false, 0, false);
    TaskForceMotionState(this.chosen, PedMotionState.DoNothing, false);
    // FreezeEntityPosition(this.chosen, true);
    await PVCamera.interpolate('CreationTransition', 1500);
    await PVCamera.interpolate('CreationDressing', 750);
    emitUI('customization.state', { state: 'info' });
    this.currentState = CreationState.NameSelection;
  }

  async setState(state: Customization.State) {
    if (this.currentState === CreationState.None || this.currentState === CreationState.GenderSelection) {
      return;
    }

    switch (state) {
      case 'gender':
        emitUI('customization.state', { state: 'transition' });
        await PVCamera.interpolate('CreationTransition', 1500);
        await PVCamera.interpolate(this.currentGender === 'male' ? 'CreationMale' : 'CreationFemale', 750);
        emitUI('customization.state', { state: 'gender' });
        this.currentState = CreationState.GenderSelection;
        PVBase.deleteEntity(this.chosen);
        break;
      case 'head':
        PVCamera.interpolate('CreationFace', 750);
        emitUI('customization.state', { state });
        break;
      case 'info':
      case 'body':
      case 'clothing':
        PVCamera.interpolate('CreationDressing', 750);
        emitUI('customization.state', { state });
        break;
      default:
        emitUI('customization.state', { state });
        break;
    }
  }

  private async createMFPeds() {
    this.male = await PVGame.createPed('mp_male', -558.5, -3775.45, 237.66, 90, true);
    await PVGame.pedIsReadyToRender(this.male);
    await PVGame.setPedComponentsMp(this.male, this.maleComponents);
    await PVGame.removePedComponentCategory(this.male, GetHashKey('PANTS'));
    UpdateShopItemWearableState(
      this.male,
      GetHashKey('CLOTHING_ITEM_M_BODIES_UPPER_001_V_001'),
      GetHashKey('BASE'),
      0,
      true,
      0,
    );
    UpdateShopItemWearableState(
      this.male,
      GetHashKey('CLOTHING_ITEM_M_BODIES_LOWER_001_V_001'),
      GetHashKey('BASE'),
      0,
      true,
      0,
    );

    await PVGame.pedIsReadyToRender(this.male);
    PVGame.finalizePedOutfit(this.male);
    Log('Create Male Ped', this.male);
    console.log('Create Male Ped', this.male);
    ForcePedMotionState(this.male, 247561816, false, 0, false);

    this.female = await PVGame.createPed('mp_female', -558.5, -3776.9, 237.66, 90, true);
    await PVGame.pedIsReadyToRender(this.female);
    await PVGame.setPedComponentsMp(this.female, this.femaleComponents);
    // await PVGame.removePedComponent(this.female, GetHashKey('CLOTHING_ITEM_F_PANTS_000_TINT_001'));

    UpdateShopItemWearableState(
      this.female,
      GetHashKey('CLOTHING_ITEM_F_BODIES_UPPER_001_V_001'),
      GetHashKey('BASE'),
      0,
      true,
      0,
    );
    UpdateShopItemWearableState(
      this.female,
      GetHashKey('CLOTHING_ITEM_F_BODIES_LOWER_001_V_001'),
      GetHashKey('BASE'),
      0,
      true,
      0,
    );

    await PVGame.pedIsReadyToRender(this.female);
    PVGame.finalizePedOutfit(this.female);
    Log('Create Female Ped', this.female);
    console.log('Create Female Ped', this.female);
    ForcePedMotionState(this.female, 247561816, false, 0, false);
  }

  private destroyPeds() {
    PVBase.deleteEntity(this.male);
    PVBase.deleteEntity(this.female);
    PVBase.deleteEntity(this.chosen);
    this.male = 0;
    this.female = 0;
    this.chosen = 0;
  }

  rotateChosen(heading: number) {
    if (this.currentState !== CreationState.NameSelection) {
      return;
    }
    SetPedDesiredHeading(this.chosen, heading);
  }

  chooseCamera(camera: 'body' | 'face') {
    if (this.currentState !== CreationState.NameSelection) {
      return;
    }
    if (camera === 'body') {
      PVCamera.interpolate('CreationDressing', 750);
    } else {
      PVCamera.interpolate('CreationFace', 750);
    }
  }

  async setBodyType(bodyType: number) {
    if (this.currentState !== CreationState.NameSelection) {
      return;
    }

    if (bodyType in bodyTypes) {
      Log('setBodyType', bodyTypes[bodyType]);
      await PVGame.equipMetaPedOutfit(this.chosen, bodyTypes[bodyType].hash);
      await PVGame.pedIsReadyToRender(this.chosen);
      PVGame.finalizePedOutfit(this.chosen);
    }
  }

  async setWaist(waist: number) {
    if (this.currentState !== CreationState.NameSelection) {
      return;
    }

    if (waist in waists) {
      Log('setWaist', waists[waist]);
      await PVGame.equipMetaPedOutfit(this.chosen, waists[waist]);
      await PVGame.pedIsReadyToRender(this.chosen);
      PVGame.finalizePedOutfit(this.chosen);
    }
  }

  async setFaceOption(option: string, value: number) {
    if (option in faceFeatures) {
      const feature = faceFeatures[option];
      SetCharExpression(this.chosen, feature, value);
      UpdatePedVariation(this.chosen, false, true, true, true, false);
    }
  }

  async setFaceOptions(options: Record<string, number>) {
    if (this.currentState !== CreationState.NameSelection) {
      return;
    }
    Log('setFaceOptions', options);
    for (const [option, value] of Object.entries(options)) {
      if (option in faceFeatures) {
        const feature = faceFeatures[option];
        SetCharExpression(this.chosen, feature, value);
      }
    }
    UpdatePedVariation(this.chosen, false, true, true, true, false);
  }

  async setComponents(components: number[]) {
    if (this.currentState !== CreationState.NameSelection) {
      return;
    }
    Log('setComponents', components);
    await componentManager.unequipClothing(this.chosen);
    await PVGame.setPedComponentsMp(this.chosen, components);
    await PVGame.pedIsReadyToRender(this.chosen);
    PVGame.finalizePedOutfit(this.chosen);
  }
}

export const creationManager = CreationManager.getInstance();
