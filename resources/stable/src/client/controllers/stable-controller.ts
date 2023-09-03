import Horse from '../classes/horse';
import Stable from '../classes/stable';
import { awaitUI, Log } from '@lib/client/comms/ui';
import { onResourceInit, PVBase, PVGame, PVInit } from '@lib/client';
import { Delay } from '@lib/functions';
import { PedConfigFlag } from '@lib/flags';

class StableController {
  protected static instance: StableController;

  protected _horses: Map<Horse.Id, Horse> = new Map();

  protected _stables: Map<Stable.Id, Stable> = new Map();
  protected _stabledHorses: Map<Horse.Id, Stable.Id> = new Map();

  protected _currentStable: Stable.Id = '';
  protected _currentStableStalls: Vector4Format[] = [];

  // protected _characterInStables: Map<Stable.Id, Set<number>> = new Map(); // Map<StableId, Set<CharacterId>>
  protected _stableHorsePeds: Map<Stable.Id, Map<number, Set<number>>> = new Map(); // Map<StableId, Map<CharacterId, Set<EntityId>>

  static getInstance(): StableController {
    if (!StableController.instance) {
      StableController.instance = new StableController();
    }
    return StableController.instance;
  }

  constructor() {
    onResourceInit('game', () => {
      const character = PVGame.getCurrentCharacter();
      if (character) {
        this.loadHorses(character.id);
      }
    });
    onNet('game:character-selected', async (characterId: number) => {
      this.loadHorses(characterId);
    });
  }

  async loadHorses(characterId: number) {
    Log('Load Horses Started');
    PVInit.register('stable::load-hoses', { reset: true });
    const horses = await awaitUI('stable.load-character-horses', characterId);
    for (const horse of horses) {
      // Log('horse', horse);
      this._horses.set(horse.id, new Horse(horse));
      this._stabledHorses.set(horse.id, horse.stable || '');
    }
    PVInit.resolve('stable::load-hoses');
    Log('Load Horses Finished');
  }

  addStable(data: Stable.Data): void {
    const stable = new Stable(data.identifier, data.name);
    stable.addStalls(data.stalls);

    this._stables.set(stable.id, stable);
  }

  getById(id: Stable.Id): Stable | undefined {
    return this._stables.get(id);
  }

  getByHorseId(horseId: Horse.Id): Stable | undefined {
    const stableId = this._stabledHorses.get(horseId);
    if (stableId) {
      return this.getById(stableId);
    }
  }

  async enterStable(stableId: Stable.Id): Promise<void> {
    if (this._currentStable === stableId) {
      Log('Already in stable');
      return;
    }

    this._currentStable = stableId;

    const stable = this.getById(stableId);

    if (!stable) {
      Log('Stable not found');
      return;
    }

    let usedStalls = 0;

    const stableHorsePeds = this._stableHorsePeds.get(stableId) || new Map<number, Set<number>>();

    const characterId = PVGame.getCurrentCharacter().id;

    Log('characterId', characterId);

    if (!characterId) {
      Log('Character not found');
      return;
    }

    await PVInit.initialized('stable::load-hoses');
    Log('Spawn Horses');

    const characterHorsePeds = stableHorsePeds.get(characterId) || new Set<number>();

    for (const horse of this._horses.values()) {
      if (horse.stable === stableId) {
        const stall = stable.stalls[usedStalls];
        const horsePed = await this.spawnHorse(horse, {
          local: true,
          overrideCoord: {
            x: stall.x,
            y: stall.y,
            z: stall.z,
            w: stall.w,
          },
        });
        characterHorsePeds.add(horsePed);
        usedStalls++;
      }
    }

    stableHorsePeds.set(characterId, characterHorsePeds);
    this._stableHorsePeds.set(stableId, stableHorsePeds);
  }

  async exitStable(stableId: Stable.Id): Promise<void> {
    const stableHorsePeds = this._stableHorsePeds.get(stableId) || new Map<number, Set<number>>();

    const characterId = PVGame.getCurrentCharacter().id;

    const characterHorsePeds = stableHorsePeds.get(characterId) || new Set<number>();

    PVBase.deleteEntities([...characterHorsePeds]);

    stableHorsePeds.delete(characterId);
    this._stableHorsePeds.set(stableId, stableHorsePeds);

    this._currentStable = '';
  }

  isStabled(horseId: Horse.Id): boolean {
    return this._stabledHorses.has(horseId);
  }

  stableHorse(stableId: Stable.Id, horseId: Horse.Id): void {
    const stable = this.getById(stableId);

    if (!stable || stable.horses.includes(horseId)) {
      return;
    }

    const horses = [...stable.horses];
    horses.push(horseId);

    this._stabledHorses.set(horseId, stableId);

    const horse = this._horses.get(horseId);
    if (horse) {
      horse.stable = stable.id;
      horse.save();
    }
  }

  unstableHorse(horseId: Horse.Id): void {
    const stable = this.getByHorseId(horseId);

    if (!stable) {
      return;
    }

    this._stabledHorses.delete(horseId);

    if (stable.horses.includes(horseId)) {
      const horses = [...stable.horses];
      horses.splice(horses.indexOf(horseId), 1);
      stable.horses = horses;
    }

    const horse = this._horses.get(horseId);
    if (horse) {
      horse.stable = null;
      horse.save();
    }
  }

  /**
   * horse stuff
   */

  async spawnHorse(horse: Horse, options: Horse.SpawnOptions = {}): Promise<number> {
    // if (this._spawningHorse.get(horse.id)) {
    //   return;
    // }
    // this._spawningHorse.set(horse.id, true);

    Log('spawning horse', horse.name);

    const playerPed = PVGame.playerPed();
    const characterId = PVGame.getCurrentCharacter()?.id;
    if (!characterId) {
      Log('Error no character');
      return 0;
    }

    let spawnCoord = {
      x: horse.lastX,
      y: horse.lastY,
      z: horse.lastZ - 1.0,
      w: 0.0,
    };
    if (options.overrideCoord) {
      spawnCoord = {
        x: options.overrideCoord.x,
        y: options.overrideCoord.y,
        z: options.overrideCoord.z,
        w: options.overrideCoord.w,
      };
    }

    await PVGame.loadModel(horse.model);
    const horsePed = CreatePed(
      horse.model,
      spawnCoord.x,
      spawnCoord.y,
      spawnCoord.z,
      spawnCoord.w,
      false,
      false,
      false,
      false,
    );

    SetAttributePoints(horsePed, 0, horse.statHealth);
    SetAttributePoints(horsePed, 1, horse.statEndurance);
    SetAttributePoints(horsePed, 4, horse.statHandling);
    SetAttributePoints(horsePed, 5, horse.statSpeed);
    SetAttributePoints(horsePed, 6, horse.statAcceleration);
    if (horse.statBonding[characterId]) {
      SetAttributePoints(horsePed, 7, horse.statBonding[characterId]);
    }

    // Log('spawnedHorse', horsePed);

    await Delay(1);
    await PVGame.pedIsReadyToRender(horsePed);

    SetPedConfigFlag(horsePed, PedConfigFlag.BlockHorsePromptsForTargetPed, true);

    SetEntityVisible(horsePed, true);
    SetEntityAlpha(horsePed, 255, false);
    SetRandomOutfitVariation(horsePed, true);

    if (options.scale) {
      SetPedScale(horsePed, options.scale);
    }

    await Delay(100);

    if (horse.gender === 'MALE') {
      Log('Set Horse Face Features to Male');
      SetPedFaceFeature(horsePed, 0xa28b, 0.0); // Default
    } else if (horse.gender === 'FEMALE') {
      Log('Set Horse Face Features to Female');
      SetPedFaceFeature(horsePed, 0xa28b, 1.0);
    }
    // HORSE_EQUIPMENT_MALE_GENITALS
    // HORSE_EQUIPMENT_FEMALE_GENITALS
    await Delay(1);
    N_0x704c908e9c405136(horsePed); // FIX_OUTFIT

    await Delay(50);

    for (const component of horse.components) {
      // Log('component', component);
      const componentData = PVGame.getComponentById(component);
      Log('componentData', componentData);
      ApplyShopItemToPed(horsePed, component, false, componentData?.isMp || false, false); // _SET_PED_COMPONENT_ENABLED
      await Delay(1);
    }
    await Delay(1);
    N_0x704c908e9c405136(horsePed); // FIX_OUTFIT
    N_0xaab86462966168ce(horsePed, true);
    await Delay(1);
    UpdatePedVariation(horsePed, false, true, true, true, false); // _UPDATE_PED_VARIATION
    SetModelAsNoLongerNeeded(horse.model);
    await Delay(50);

    // Citizen.invokeNative('0xD2CB0FB0FDCB473D', gameManager.playerId, horsePed) // _SET_PED_AS_SADDLE_HORSE_FOR_PLAYER
    // Citizen.invokeNative('0xE6D4E435B56D5BD0', gameManager.playerId, horsePed) // _SET_PLAYER_N*
    SetPedRelationshipGroupHash(horsePed, GetPedRelationshipGroupHash(horsePed));
    Citizen.invokeNative('0x931B241409216C1F', playerPed, horsePed);

    if (options.local) {
      NetworkSetEntityInvisibleToNetwork(horsePed, true);
    } else {
      await PVGame.registerNetworkEntity(horsePed);
      // SET_PED_MOOD_TOWARDS_PED
      // for (let n = 10; n--; ) {
      //   Citizen.invokeNative('0x06D26A96CA1BCA75', horsePed, n, 0.0, gameManager.playerPed)
      // }
      // Citizen.invokeNative('0x06D26A96CA1BCA75', horsePed, 0, 0.8, gameManager.playerPed);
    }

    // this._spawningHorse.set(horse.id, false);

    // this.entitySetHorse(horsePed, horse);

    return horsePed;
  }
}

export default StableController.getInstance();
