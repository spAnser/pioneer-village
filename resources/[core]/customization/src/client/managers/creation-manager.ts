import { emitUI, focusUI, PVBase, PVCamera, PVGame } from '@lib/client';
import { Delay } from '@lib/functions';

class CreationManager {
  protected static instance: CreationManager;

  static getInstance(): CreationManager {
    if (!CreationManager.instance) {
      CreationManager.instance = new CreationManager();
    }
    return CreationManager.instance;
  }

  private currentState: Customization.CreationState = -1;

  private maleComponents = [
    -1241887289, // Skinny
    -2045421226, // Waist 0
    // 1537699023, // Prison Shirt
    // 560337648, // Prison Pants
    // -1136463505, // Darned Stockings
    1963778820, // Darned Stockings Blue
    GetHashKey('CLOTHING_ITEM_M_TEETH_000'),
    GetHashKey('CLOTHING_M_SEASON3_NIGHTGOWN_001_TINT_001'),
    // GetHashKey('CLOTHING_ITEM_M_SHIRT_000_TINT_001'),
    // GetHashKey('CLOTHING_ITEM_M_PANTS_000_TINT_001'),
    GetHashKey('CLOTHING_ITEM_M_BODIES_UPPER_001_V_001'),
    GetHashKey('CLOTHING_ITEM_M_BODIES_LOWER_001_V_001'),
    GetHashKey('CLOTHING_ITEM_M_EYES_001_TINT_001'),
    GetHashKey('CLOTHING_ITEM_M_HEAD_001_V_001'),
    GetHashKey('CLOTHING_ITEM_M_HAIR_001_BLONDE'),
  ];
  private femaleComponents = [
    -1241887289, // Skinny
    -2045421226, // Waits 0
    // 1790080661, // Prison Shirt
    // 1975258357, // Prison Pants
    // -755702786, // Darned Stockings
    -864332025, // Darned Stockings Blue
    GetHashKey('CLOTHING_ITEM_F_TEETH_000'),
    GetHashKey('CLOTHING_F_SEASON3_NIGHTGOWN_001_TINT_001'),
    // GetHashKey('CLOTHING_ITEM_F_SHIRT_000_TINT_001'),
    // GetHashKey('CLOTHING_ITEM_F_PANTS_000_TINT_001'),
    GetHashKey('CLOTHING_ITEM_F_BODIES_UPPER_001_V_001'),
    GetHashKey('CLOTHING_ITEM_F_BODIES_LOWER_001_V_001'),
    GetHashKey('CLOTHING_ITEM_F_EYES_001_TINT_001'),
    GetHashKey('CLOTHING_ITEM_F_HEAD_001_V_001'),
    GetHashKey('CLOTHING_ITEM_F_HAIR_002_BLONDE'),
  ];

  private male = 0;
  private female = 0;
  private chosen = 0;

  private currentGender: 'male' | 'female' = 'male';

  constructor() {
    on('onResourceStop', (resourceName: string) => {
      if (this.currentState === -1) {
        return;
      }
      this.destroyCameras();
      this.destroyScene();
      this.destroyPeds();
    });
  }

  destroy() {
    if (this.currentState === -1) {
      return;
    }

    this.destroyCameras();
    this.destroyScene();
    this.destroyPeds();

    this.currentState = -1;
    this.currentGender = 'male';

    emitUI('customization.state', { show: false });
    focusUI(false, false);
  }

  async start() {
    if (this.currentState !== -1) {
      return;
    }
    this.currentState = 0;

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
    N_0xd97d8d905f1562f2(-641739913); // _PARSEDDATA_LOAD_FILE_HASH
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
    await PVGame.pedIsReadyToRender(this.male);
    await PVGame.setPedComponentsMp(this.chosen, this.maleComponents);
    PVGame.finalizePedOutfit(this.chosen);
    ForcePedMotionState(this.chosen, 247561816, false, 0, false);
    FreezeEntityPosition(this.chosen, true);
    await PVCamera.interpolate('CreationTransition', 1500);
    PVCamera.interpolate('CreationDressing', 750);
    emitUI('customization.state', { state: 'creation' });
    this.currentState = 1;
  }

  private async createMFPeds() {
    this.male = await PVGame.createPed('mp_male', -558.5, -3775.45, 237.66, 90, true);
    await PVGame.pedIsReadyToRender(this.male);
    await PVGame.setPedComponentsMp(this.male, this.maleComponents);
    PVGame.finalizePedOutfit(this.male);
    ForcePedMotionState(this.male, 247561816, false, 0, false);

    this.female = await PVGame.createPed('mp_female', -558.5, -3776.9, 237.66, 90, true);
    await PVGame.pedIsReadyToRender(this.female);
    await PVGame.setPedComponentsMp(this.female, this.femaleComponents);
    PVGame.finalizePedOutfit(this.female);
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
    if (this.currentState !== 1) {
      return;
    }
    SetPedDesiredHeading(this.chosen, heading);
  }

  chooseCamera(camera: 'body' | 'face') {
    if (this.currentState !== 1) {
      return;
    }
    if (camera === 'body') {
      PVCamera.interpolate('CreationDressing', 750);
    } else {
      PVCamera.interpolate('CreationFace', 750);
    }
  }

  setComponents(components: number[]) {
    if (this.currentState !== 1) {
      return;
    }
    PVGame.setPedComponentsMp(this.chosen, components);
    PVGame.finalizePedOutfit(this.chosen);
  }
}

export const creationManager = CreationManager.getInstance();
