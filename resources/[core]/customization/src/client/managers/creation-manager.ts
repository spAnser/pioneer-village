import { PVBase, PVCamera, PVGame, emitUI, focusUI } from '@lib/client';
import { AnimFlag } from '@lib/flags/anim-flag';
import { PedMotionState } from '@lib/flags/ped-motion-state';
import { Delay, debounce } from '@lib/functions';

import BaseOverlay from '../data/base-overlay';
import bodyTypes from '../data/body-types';
import heads from '../data/heads';
import OverlayInfo from '../data/overlay-info';
import skinTones from '../data/skin-tones';
import teeth from '../data/teeth';
import waists from '../data/waists';
import { componentManager, isMpComponent } from './component-manager';
import { paletteManager } from './palette-manager';

enum CreationState {
  None = -1,
  GenderSelection = 0,
  NameSelection = 1,
  ClothingSelection = 2,
}

const faceFeatures: Record<string, number> = {
  headWidth: 34006,
  faceWidth: 41396,
  eyebrowHeight: 13059,
  eyebrowWidth: 12281,
  eyebrowDepth: 19153,
  earsDepth: 49231,
  earsAngle: 46798,
  earsHeight: 10308,
  earlobeSize: 60720,
  cheekBoneHeight: 27147,
  cheekBoneWidth: 43983,
  cheekBoneDepth: 13709,
  chinHeight: 15375,
  chinWidth: 50098,
  chinDepth: 58147,
  eyelidHeight: 35627,
  eyelidWidth: 7019,
  eyesDepth: 60996,
  eyesAngle: 53862,
  eyesDistance: 42318,
  eyesHeight: 56827,
  noseWidth: 28287,
  noseSize: 13425,
  noseHeight: 1013,
  noseAngle: 13489,
  noseCurvature: 61782,
  nostrilsDistance: 22046,
  mouthWidth: 61541,
  mouthDepth: 43625,
  mouthXPos: 31427,
  mouthYPos: 16653,
  upperLipHeight: 6656,
  upperLipWidth: 37313,
  upperLipDepth: 50037,
  lowerLipHeight: 47949,
  lowerLipWidth: 45232,
  lowerLipDepth: 23830,
  jawHeight: 36106,
  jawWidth: 60334,
  jawDepth: 7670,
  jawYPos: 55182,
  mouthCornerLeftWidth: 57350,
  mouthCornerLeftDepth: 40950,
  mouthCornerLeftHeight: 46661,
  mouthCornerLeftUpperLipDistance: 22344,
  mouthCornerRightUpperLipDistance: 60292,
  mouthCornerRightHeight: 49299,
  mouthCornerRightDepth: 9423,
  mouthCornerRightWidth: 55718,
  rightEyelidOpenClose: 22421,
  leftEyelidOpenClose: 52902,
  neckWidth: 36277,
  neckDepth: 60890,
  shoulderHeight: 15833,
  backWidth: 41478,
  forearms: 8420,
  shoulderBlades: 18046,
  armsSize: 46032,
  chest: 27779,
  waistWidth: 50460,
  hipWidth: 49787,
  thighs: 64834,
  calves: 42067,
  shoulders: 50039,
  shoulderThickness: 7010,
  anteriorTrapezius: 33485,
  chestHeight: 46240,
  buttHipSize: 8991,
  bodyWeight: 2007,
  muscles: 65374,
  shoulderSizeFemales: 50957,
  leftMouthCornerYPosition: 18365,
  leftMouthCornerXPosition: 56529,
  leftMouthCornerDepth: 38761,
  rightMouthCornerYPosition: 18269,
  rightMouthCornerXPosition: 26786,
  rightMouthCornerDepth: 37225,
  rightMouthWidth: 64491,
  leftMouthWidth: 65229,
  leftEarHeight: 47172,
  leftEarWidth: 50511,
  leftEarAngle: 55285,
  leftEarlobeSize: 60384,
  rightEarHeight: 38980,
  rightEarWidth: 51023,
  rightEarAngle: 53071,
  rightEarlobeSize: 60352,
  leftBrowYPosition: 12691,
  leftBrowXPosition: 16401,
  leftBrowDepth: 45521,
  rightBrowYPosition: 12723,
  rightBrowXPosition: 4593,
  rightBrowDepth: 46033,
  leftEyeYPosition: 53838,
  leftEyeXPosition: 50805,
  leftEyeDepth: 60884,
  leftEyeAngle: 30023,
  rightEyeYPosition: 47265,
  rightEyeXPosition: 48591,
  rightEyeDepth: 60852,
  rightEyeAngle: 41831,
  leftEyelidHeight: 38948,
  leftEyelidWidth: 60155,
  rightEyelidHeight: 38210,
  rightEyelidWidth: 48347,
  leftCheekboneYPosition: 28571,
  leftCheekboneXPosition: 51671,
  leftCheekboneDepth: 3213,
  rightCheekboneYPosition: 28603,
  rightCheekboneXPosition: 39863,
  rightCheekboneDepth: 3725,
  rightNostrilSize: 21326,
  leftNostrilSize: 21422,
  skullWidth: 58204,
  skullHeight: 38632,
  skullDepth: 35929,
  horseGender: 41611,
};

/**
headWidth

eyebrowHeight|eyebrowWidth|eyebrowDepth

eyelidHeight|eyelidWidth|eyesDepth|eyesAngle|eyesDistance|eyesHeight

earsWidth|earsAngle|earsHeight|earlobeSize

noseWidth|noseSize|noseHeight|noseAngle|noseCurvature|nostrilsDistance

cheekBoneHeight|cheekBoneWidth|cheekBoneDepth

mouthWidth|mouthDepth|mouthXPos|mouthYPos

upperLipHeight|upperLipWidth|upperLipDepth|lowerLipHeight|lowerLipWidth|lowerLipDepth

jawHeight|jawWidth|jawDepth

chinHeight|chinWidth|chinDepth

              headWidth
          _____________________
        /                       \
       |                        |
       |   eyebrow    eyelid    |
   ear /|                       |\
      | |             cheek    | |

 */

type BaseComponents = {
  body?: number;
  waist?: number;
  teeth?: number;
  upperBody?: number;
  lowerBody?: number;
  eyes?: number;
  head?: number;
  hair?: number;
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

  private maleComponents: BaseComponents = {
    body: bodyTypes[2].hash,
    // waist: waists[0],
    // 1537699023, // Prison Shirt
    // 560337648, // Prison Pants
    // -1136463505, // Darned Stockings
    // 1963778820, // Darned Stockings Blue
    teeth: GetHashKey('CLOTHING_ITEM_M_TEETH_000'),
    // GetHashKey('CLOTHING_M_SEASON3_NIGHTGOWN_001_TINT_001'),
    // GetHashKey('CLOTHING_ITEM_M_SHIRT_000_TINT_001'),
    // GetHashKey('CLOTHING_ITEM_M_PANTS_000_TINT_001'),
    upperBody: GetHashKey('CLOTHING_ITEM_M_BODIES_UPPER_001_V_001'),
    lowerBody: GetHashKey('CLOTHING_ITEM_M_BODIES_LOWER_001_V_001'),
    eyes: GetHashKey('CLOTHING_ITEM_M_EYES_001_TINT_001'),
    head: GetHashKey('CLOTHING_ITEM_M_HEAD_001_V_001'),
    hair: GetHashKey('CLOTHING_ITEM_M_HAIR_001_BLONDE'),
  };
  private femaleComponents: BaseComponents = {
    body: bodyTypes[2].hash,
    // waist: waists[0],
    // 1790080661, // Prison Shirt
    // 1975258357, // Prison Pants
    // -755702786, // Darned Stockings
    // -864332025, // Darned Stockings Blue
    teeth: GetHashKey('CLOTHING_ITEM_F_TEETH_000'),
    // GetHashKey('CLOTHING_F_SEASON3_NIGHTGOWN_001_TINT_001'),
    // GetHashKey('CLOTHING_ITEM_F_SHIRT_000_TINT_001'),
    // GetHashKey('CLOTHING_ITEM_F_PANTS_000_TINT_001'),
    upperBody: GetHashKey('CLOTHING_ITEM_F_BODIES_UPPER_001_V_001'),
    lowerBody: GetHashKey('CLOTHING_ITEM_F_BODIES_LOWER_001_V_001'),
    eyes: GetHashKey('CLOTHING_ITEM_F_EYES_001_TINT_001'),
    head: GetHashKey('CLOTHING_ITEM_F_HEAD_001_V_001'),
    hair: GetHashKey('CLOTHING_ITEM_F_HAIR_001_BLONDE'),
  };

  private chosenComponents: BaseComponents = {};

  private chosenSkinTones = skinTones.male;
  private chosenHeads = heads.male;

  private chosenSkinTone = 0;
  private chosenHead = 0;

  private male = 0;
  private female = 0;
  private chosen = 0;

  private currentGender: 'male' | 'female' = 'male';
  private wasRunning = false;

  private cameraFaceMalePos = { x: -559.25, y: -3781.125, z: 239.315 };
  private cameraFaceFemalePos = { x: -559.25, y: -3781.125, z: 239.2 };

  constructor() {
    on('onResourceStop', (resourceName: string) => {
      console.log('onResourceStop', resourceName);
      if (resourceName !== GetCurrentResourceName() && resourceName !== 'ui') {
        return;
      }
      if (resourceName === 'ui') {
        if (this.currentState !== CreationState.None) {
          this.wasRunning = true;
        }
      }
      this.destroy();
    });

    on('onResourceStart', async (resourceName: string) => {
      if (resourceName === 'ui' && this.wasRunning) {
        await Delay(1000); // Wait for UI to be ready
        this.wasRunning = false;
        this.start();
      }

      if (resourceName === 'camera') {
        this.initLight();
      }
    });

    if (GetResourceState('camera') === 'started') {
      this.initLight();
    }
  }

  async initLight() {
    PVCamera.lightCreateOrUpdate({
      id: 'CreationLight',
      x: this.cameraFaceMalePos.x,
      y: this.cameraFaceMalePos.y,
      z: this.cameraFaceMalePos.z,
      r: 255,
      g: 255,
      b: 255,
      intensity: 50,
      range: 25,
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

    PVCamera.lightTurnOff('CreationLight');
  }

  get isActive() {
    return this.currentState !== CreationState.None;
  }

  getChosen() {
    return this.chosen;
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

    emitUI('customization.state', {
      show: true,
      state: 'gender',
      components: {},
      model: '',
      gender: 'male',
      currentComponents: {},
      hiddenComponents: {},
      currentFaceOptions: {},
      currentFaceFeatures: {},
      currentBodyOptions: {},
      currentLayers: [],
      currentWhistle: {},
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      tints: {},
      head: 0,
      teeth: 0,
      skinTone: 0,
      bodyType: 2,
    });
    focusUI(true, true);

    PVCamera.lightTurnOn('CreationLight');
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
      coords: { x: -562.5, y: -3781.125, z: 238.9 },
      rot: { x: -4.0, y: 0.0, z: -90.0 },
      fov: 30,
    });

    PVCamera.create({
      id: 'CreationFace',
      coords: this.cameraFaceMalePos,
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

    const faceCamPos = this.currentGender === 'male' ? this.cameraFaceMalePos : this.cameraFaceFemalePos;
    PVCamera.setCoord('CreationFace', faceCamPos);

    this.chosenComponents = this.currentGender === 'male' ? this.maleComponents : this.femaleComponents;
    this.chosenSkinTones = this.currentGender === 'male' ? skinTones.male : skinTones.female;
    this.chosenHeads = this.currentGender === 'male' ? heads.male : heads.female;
    this.chosen = await PVGame.createPed(
      this.currentGender === 'male' ? 'mp_male' : 'mp_female',
      -558.5,
      -3781.05,
      237.66,
      90,
      true,
      true,
    );
    NetworkSetEntityOnlyExistsForParticipants(this.chosen, true);
    await PVGame.pedIsReadyToRender(this.chosen);
    // await PVGame.setPedComponentsMp(this.chosen, this.maleComponents);
    ClonePedToTarget(this.currentGender === 'male' ? this.male : this.female, this.chosen);
    await PVGame.pedIsReadyToRender(this.chosen);
    PVGame.finalizePedOutfit(this.chosen);
    console.log('Create Chosen Ped', this.chosen);
    ForcePedMotionState(this.chosen, PedMotionState.DoNothing, false, 0, false);
    TaskForceMotionState(this.chosen, PedMotionState.DoNothing, false);

    this.freezeChosen();
    this.setIdleFaceAnim();

    // FreezeEntityPosition(this.chosen, true);
    await PVCamera.interpolate('CreationTransition', 1500);
    await PVCamera.interpolate('CreationDressing', 750);
    // Filter out undefined values to match Record<string, number> type
    const definedComponents = Object.entries(this.chosenComponents).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, number>,
    );
    emitUI('customization.state', { state: 'info', components: definedComponents });
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
      case 'overlays':
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
    await PVGame.setPedComponentsMp(this.male, Object.values(this.maleComponents));
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
    console.log('Create Male Ped', this.male);
    console.log('Create Male Ped', this.male);
    ForcePedMotionState(this.male, 247561816, false, 0, false);

    this.female = await PVGame.createPed('mp_female', -558.5, -3776.9, 237.66, 90, true);
    await PVGame.pedIsReadyToRender(this.female);
    await PVGame.setPedComponentsMp(this.female, Object.values(this.femaleComponents));
    await PVGame.removePedComponent(this.female, GetHashKey('CLOTHING_ITEM_F_PANTS_000_TINT_001'));

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
    console.log('Create Female Ped', this.female);
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

  private freezeChosen = debounce(1500, () => {
    PVGame.playAnimTask(
      {
        dict: 'amb_misc@world_human_door_knock@male_a@stand_exit',
        anim: 'exit_front',
        flags: AnimFlag.STOP_LAST_FRAME + AnimFlag.ENABLE_PLAYER_CONTROL,
        delta: 1,
        blendInSpeed: 1,
        blendOutSpeed: -1,
      },
      this.chosen,
    );
  });

  private unfreezeChosen() {
    StopAnimTask(this.chosen, 'amb_misc@world_human_door_knock@male_a@stand_exit', 'exit_front', -8.0);
  }

  async rotateChosen(heading: number) {
    if (this.currentState !== CreationState.NameSelection) {
      return;
    }

    this.unfreezeChosen();
    await Delay(100);
    SetPedDesiredHeading(this.chosen, heading);
    this.freezeChosen();
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

  setUIComponents() {
    // Filter out undefined values to match Record<string, number> type
    const definedComponents = Object.entries(this.chosenComponents).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, number>,
    );
    emitUI('customization.state', { components: definedComponents });
  }

  async setSkinTone(skinTone: number, updatePed = true) {
    if (this.currentState !== CreationState.NameSelection) {
      return;
    }

    const bodyTypeIndex = Object.entries(bodyTypes).findIndex(
      ([key, value]) => value.hash === this.chosenComponents.body,
    );

    console.log('setSkinTone', skinTone);
    if (skinTone >= 0 && skinTone < this.chosenSkinTones.length) {
      this.chosenSkinTone = skinTone;
      this.chosenComponents.upperBody = this.chosenSkinTones[skinTone][bodyTypeIndex].upperBody;
      this.chosenComponents.lowerBody = this.chosenSkinTones[skinTone][bodyTypeIndex].lowerBody;
      await PVGame.setPedComponentsMp(this.chosen, Object.values(this.chosenSkinTones[skinTone][bodyTypeIndex]));

      this.setHead(this.chosenHead, false);

      if (updatePed) {
        await PVGame.pedIsReadyToRender(this.chosen);
        PVGame.finalizePedOutfit(this.chosen);
        this.setUIComponents();
      }
    }
  }

  async setHead(headIndex: number, updatePed = true) {
    const start = Date.now();
    if (this.currentState !== CreationState.NameSelection) {
      return;
    }
    console.log('setHead', headIndex);

    if (headIndex >= 0 && headIndex < this.chosenHeads[this.chosenSkinTone].length) {
      this.chosenHead = headIndex;

      const head = this.chosenHeads[this.chosenSkinTone][headIndex];
      console.log('head', head);

      this.chosenComponents.head = head;

      await PVGame.setPedComponentsMp(this.chosen, [head]);
      console.log('ready to render', IsPedReadyToRender(this.chosen));

      if (updatePed) {
        await Delay(1);
        await PVGame.pedIsReadyToRender(this.chosen);
        PVGame.finalizePedOutfit(this.chosen);
        this.setUIComponents();
      }
    }

    console.log('setHead duration', Date.now() - start);
  }

  setIdleFaceAnim() {
    console.log('Clear Facial Idle Anim Override', this.chosen);
    ClearFacialIdleAnimOverride(this.chosen);
    SetFacialIdleAnimOverride(this.chosen, 'eyefocus', 'FACE_HUMAN@GEN_MALE@BASE');
  }

  setIdleFaceAnimDebounce = debounce(10_000, () => {
    this.setIdleFaceAnim();
  });

  async setTeeth(teethIndex: number) {
    if (this.currentState !== CreationState.NameSelection) {
      return;
    }

    const teethOptions = teeth[this.currentGender === 'male' ? 'male' : 'female'];

    ClearFacialIdleAnimOverride(this.chosen);
    SetFacialIdleAnimOverride(this.chosen, 'Face_Dentistry_Loop', 'FACE_HUMAN@GEN_MALE@BASE');
    this.setIdleFaceAnimDebounce();

    console.log('setTeeth', teethIndex);
    if (teethIndex >= 0 && teethIndex < teethOptions.length) {
      this.chosenComponents.teeth = teethOptions[teethIndex];
      await PVGame.setPedComponentsMp(this.chosen, [this.chosenComponents.teeth]);
      await PVGame.pedIsReadyToRender(this.chosen);
      PVGame.finalizePedOutfit(this.chosen);
      this.setUIComponents();
    }
  }

  async setBodyType(bodyType: number) {
    if (this.currentState !== CreationState.NameSelection) {
      return;
    }

    if (bodyType in bodyTypes) {
      console.log('setBodyType', bodyTypes[bodyType]);
      this.chosenComponents.body = bodyTypes[bodyType].hash;
      this.setSkinTone(this.chosenSkinTone, false);
      await PVGame.equipMetaPedOutfit(this.chosen, bodyTypes[bodyType].hash);
      await PVGame.pedIsReadyToRender(this.chosen);
      PVGame.finalizePedOutfit(this.chosen);
      this.setUIComponents();
    }
  }

  async setWaist(waist: number) {
    if (this.currentState !== CreationState.NameSelection) {
      return;
    }

    if (waist in waists) {
      console.log('setWaist', waists[waist]);
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
    console.log('setFaceOptions', options);
    for (const [option, value] of Object.entries(options)) {
      if (option in faceFeatures) {
        const feature = faceFeatures[option];
        SetCharExpression(this.chosen, feature, value);
      }
    }
    UpdatePedVariation(this.chosen, false, true, true, true, false);
  }

  async setFaceFeature(feature: number, value: number) {
    if (this.currentState !== CreationState.NameSelection) {
      return;
    }
    console.log('setFaceFeature', this.chosen, feature, value);
    SetCharExpression(this.chosen, feature, value);
    await Delay(1);
    // UpdatePedVariation(this.chosen, false, true, true, true, false);
    PVGame.finalizePedOutfit(this.chosen);
  }

  async setComponents(components: number[]) {
    if (this.currentState !== CreationState.NameSelection) {
      return;
    }
    await componentManager.unequipClothing(this.chosen);
    await PVGame.setPedComponentsMp(this.chosen, components);
    await PVGame.pedIsReadyToRender(this.chosen);
    PVGame.finalizePedOutfit(this.chosen);
  }

  async setComponentsWithTints(
    components: { hash: number; palette?: number | string; tint0?: number; tint1?: number; tint2?: number }[],
  ) {
    if (this.currentState !== CreationState.NameSelection) {
      return;
    }
    await componentManager.unequipClothing(this.chosen);
    const spComponents: number[] = [];
    const mpComponents: number[] = [];
    for (const component of components) {
      if (isMpComponent(component.hash)) {
        mpComponents.push(component.hash);
      } else {
        spComponents.push(component.hash);
      }
    }
    if (mpComponents.length > 0) {
      await PVGame.setPedComponentsMp(this.chosen, mpComponents);
    }
    if (spComponents.length > 0) {
      await PVGame.setPedComponents(this.chosen, spComponents);
    }
    await PVGame.pedIsReadyToRender(this.chosen);
    PVGame.finalizePedOutfit(this.chosen);
    await Delay(100);

    for (const comp of components) {
      if (comp.palette && comp.palette !== -1 && comp.palette !== 0) {
        const category = GetShopItemComponentCategory(comp.hash, 0, true);
        paletteManager.setTintByCategory(this.chosen, category, comp.palette, comp.tint0!, comp.tint1!, comp.tint2!);
        await Delay(1);
      }
    }
  }

  getBaseOverlay(name: string): Customization.BaseOverlayItem | undefined {
    if (name in BaseOverlay) {
      return BaseOverlay[name];
    }
  }

  getOverlayInfo(id: string | number): [string, UI.Customization.OverlayJsonData] | [] {
    if (typeof id === 'string') {
      id = GetHashKey(id);
    }
    for (const [category, overlays] of Object.entries(OverlayInfo)) {
      if (overlays.length > 0) {
        for (const overlay of overlays) {
          if (overlay.id === id) {
            // console.log('getOverlayInfo', id, overlay);
            return [category, overlay];
          }
        }
      }
    }

    return [];
  }

  addLayer(textureId: number, overlay: Customization.Overlay) {
    const [overlayCategory, overlayInfo] = this.getOverlayInfo(overlay.id);
    if (!overlayCategory || !overlayInfo) {
      // console.log('Overlay not found', overlay.id);
      return;
    }
    const baseOverlay = this.getBaseOverlay(overlayCategory);

    // console.log('addLayer', textureId, overlay, baseOverlay, overlayInfo);

    if (!baseOverlay || !overlayInfo) {
      return;
    }

    const layerId = AddTextureLayer(
      textureId,
      overlayInfo.id,
      overlayInfo.normal || 0,
      overlayInfo.ma || 0,
      baseOverlay.tx_color_type,
      overlay.opacity,
      baseOverlay.var,
    );
    // console.log(
    //   `AddTextureLayer(${textureId}, ${overlayInfo.id}, ${overlayInfo.normal || 0}, ${overlayInfo.ma || 0}, ${baseOverlay.tx_color_type}, ${overlay.opacity}, ${baseOverlay.var});`,
    // );
    // console.log('layerId', layerId);
    if (layerId === -1) {
      return;
    }

    Citizen.invokeNative('0xfc23348f0f4e245f', textureId, layerId, 3.5, 2.5);

    if (overlay.palette) {
      SetTextureLayerPallete(textureId, layerId, overlay.palette.palette);
      // console.log(`SetTextureLayerPallete(${textureId}, ${layerId}, ${overlay.palette.palette});`);
      SetTextureLayerTint(textureId, layerId, overlay.palette.tint0, overlay.palette.tint1, overlay.palette.tint2);
      // console.log(
      //   `SetTextureLayerTint(${textureId}, ${layerId}, ${overlay.palette.tint0}, ${overlay.palette.tint1}, ${overlay.palette.tint2});`,
      // );
    }

    // SetTextureLayerMod(textureId, layerId, overlayInfo.id, 5, 0);
    // SetTextureLayerMod(textureId, layerId, overlayInfo.id, 5, 1);
    // SetTextureLayerMod(textureId, layerId, overlayInfo.id, 5, 2);

    if ('roughness' in overlay && overlay.roughness !== undefined) {
      SetTextureLayerRoughness(textureId, layerId, overlay.roughness);
      // console.log(`SetTextureLayerRoughness(${textureId}, ${layerId}, ${overlay.roughness});`);
    }
    SetTextureLayerSheetGridIndex(textureId, layerId, baseOverlay.var);
    // console.log(`SetTextureLayerSheetGridIndex(${textureId}, ${layerId}, ${baseOverlay.var});`);
    SetTextureLayerAlpha(textureId, layerId, overlay.opacity);
    // console.log(`SetTextureLayerAlpha(${textureId}, ${layerId}, ${overlay.opacity});`);
  }

  async setOverlays(overlays: Customization.Overlay[], ped: number = this.chosen) {
    // console.log('setOverlays', ped, overlays);
    await this.releasePedTextures(ped, true);

    const textureIds: number[] = [];

    const index = paletteManager.getIndexForCategory(ped, 'HEADS');
    const { albedo, normal, material } = paletteManager.getGuidsAtIndex(ped, index);
    // console.log('heads guids', index, albedo, normal, material);

    const textureId = RequestTexture(albedo, normal, material);
    // console.log('textureId', textureId);
    await this.textureId(textureId, 1, 25);
    textureIds.push(textureId);

    for (const overlay of overlays) {
      this.addLayer(textureId, overlay);
    }

    await PVGame.waitTextureIsValid(textureId);
    ApplyTextureOnPed(ped, GetHashKey('HEADS'), textureId);
    UpdatePedTexture(textureId);

    this.setPedTextures(textureIds, ped);

    await PVGame.pedIsReadyToRender(ped);
    PVGame.finalizePedOutfit(ped);
    // console.log('DONE');
  }

  // Stuff to maybe move to PVGame

  setPedTextures(texturesIds: number[], ped: number = this.chosen) {
    const textureIdsString = texturesIds.join(',');
    // console.log('setPedTextures', ped, textureIdsString);
    Entity(ped).state.set('textures', textureIdsString, false);
  }

  getPedTextures(ped: number = this.chosen): number[] {
    const textures = Entity(ped).state.textures || '';
    // console.log('getPedTextures', ped, textures);
    if (typeof textures === 'string') {
      return textures.split(',').map((id) => parseInt(id, 10));
    }
    return [];
  }

  async releasePedTextures(ped: number = this.chosen, awaitRemoval = false) {
    const pedTextures = this.getPedTextures(ped);
    // console.log('releasePedTextures', ped, pedTextures);
    for (const textureId of pedTextures) {
      // console.log('Removing texture', textureId);
      RemoveTexture(textureId);
      if (awaitRemoval) {
        await this.textureId(textureId, false, 25);
      }
    }
    this.setPedTextures([], ped);
  }

  async textureId(textureId: number, exists: 1 | false = 1, delay = 125): Promise<boolean> {
    return new Promise((resolve) => {
      if (DoesTextureExist(textureId) === exists) {
        resolve(true);
      } else {
        const interval = setInterval(() => {
          if (DoesTextureExist(textureId) === exists) {
            resolve(true);
            clearInterval(interval);
          }
        }, delay);
      }
    });
  }
}

export const creationManager = CreationManager.getInstance();
