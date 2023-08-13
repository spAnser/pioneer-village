import { Vector3 } from '@lib/math';
import { Delay, randomRange } from '@lib/functions';
import { onResourceInit, PVBase, PVPrompt } from '@lib/client';

const CityScenarios = [
  'WORLD_HUMAN_LEAN_READ_PAPER',
  'WORLD_HUMAN_SMOKE_INTERACTION',
  'WORLD_HUMAN_SMOKE',
  'WORLD_HUMAN_WAITING_IMPATIENT',
];
const WildernessScenarios = [
  'WORLD_PLAYER_CAMP_FIRE_SIT',
  'WORLD_PLAYER_DYNAMIC_KNEEL',
  'WORLD_HUMAN_WAITING_IMPATIENT',
];
class CharacterSpawnManager {
  protected static instance: CharacterSpawnManager;

  private coords: Vector3 = new Vector3(0, 0, 0);
  public promptLoopRunning = false;

  static getInstance(): CharacterSpawnManager {
    if (!CharacterSpawnManager.instance) {
      CharacterSpawnManager.instance = new CharacterSpawnManager();
    }
    return CharacterSpawnManager.instance;
  }

  public async setCoords(coords: Vector3) {
    ClearPedTasksImmediately(PlayerPedId());
    DoScreenFadeOut(500);
    await Delay(1000);
    this.coords = coords;
    const scenarioFound = await this.getScenariosInArea();

    await Delay(100);
    if (!scenarioFound) {
      SetEntityCoordsNoOffset(PlayerPedId(), this.coords.x, this.coords.y, this.coords.z, false, false, false);
      const position = this.isPlayerInsideCity() ? 'city' : 'wilderness';
      let scenario = 0;
      if (position === 'wilderness') {
        scenario = Citizen.invokeNative('0x569F1E1237508DEB', PlayerPedId(), Citizen.resultAsInteger());
        if (scenario === 0) {
          scenario = GetHashKey(WildernessScenarios[randomRange(1, WildernessScenarios.length)]);
          console.log('predetermined wilderness scenario', scenario);
        } else {
          console.log('dynamic wilderness scenario', scenario);
        }
      } else {
        scenario = GetHashKey(CityScenarios[randomRange(1, CityScenarios.length)]);
        console.log('predetermined city scenario', scenario);
      }

      await Delay(200);
      // @ts-ignore
      TaskStartScenarioInPlace(PlayerPedId(), scenario, 0, false, false, 0, -1.0, false);
    } else {
      console.log('dynamic place scenario is now playing');
    }

    await Delay(800);
    DoScreenFadeIn(500);
    await Delay(800);
    PVPrompt.show('character-spawn:cancel:task');
    this.promptLoopRunning = true;
    while (this.promptLoopRunning) {
      const currentCoords = new Vector3().setFromArray(GetEntityCoords(PlayerPedId()));
      if (currentCoords.getDistance(this.coords) >= 2.0) {
        PVPrompt.hide('character-spawn:cancel:task');
        this.promptLoopRunning = false;
      }
      await Delay(100);
    }
  }

  async getScenariosInArea() {
    ClearPedTasksImmediately(PlayerPedId());
    let buffer = new ArrayBuffer(256 * 4);
    let view = new DataView(buffer);

    const foundScenarios: number | boolean = Citizen.invokeNative(
      '0x345EC3B7EBDE1CB5', // GetScenarioPointsInArea
      this.coords.x,
      this.coords.y,
      this.coords.z,
      2.5,
      view,
      10,
      Citizen.returnResultAnyway(),
    );

    const result = new Int32Array(buffer);
    let finalScenarios: { hash: number; coords: Vector3 }[] = [];

    console.log('found', foundScenarios, 'scenarios');

    if (foundScenarios === false) return false;
    for (const [index, data] of result.entries()) {
      if (data !== 0) {
        const hash = GetScenarioPointType(data);
        const coords = new Vector3().setFromArray(GetScenarioPointCoords(data, true));
        finalScenarios.push({ hash, coords });
      }
    }

    const index = randomRange(0, finalScenarios.length);

    const distanceBetweenPlayerAndScenario = finalScenarios[index].coords.getDistance(this.coords);

    if (distanceBetweenPlayerAndScenario < 15.0) {
      SetEntityCoords(
        PlayerPedId(),
        finalScenarios[index].coords.x,
        finalScenarios[index].coords.y,
        finalScenarios[index].coords.z,
        0.0,
        0.0,
        0.0,
        false,
      );
    } else {
      const [found, groundZ] = GetGroundZFor_3dCoord(this.coords.x, this.coords.y, this.coords.z, true);
      if (found) {
        SetEntityCoordsNoOffset(PlayerPedId(), this.coords.x, this.coords.y, groundZ, false, false, false);
      }
    }

    // @ts-ignore
    TaskStartScenarioInPlace(PlayerPedId(), finalScenarios[index].hash, 0, false, false, 0, -1.0, false);
    return true;
  }

  isPlayerInsideCity() {
    const ZoneHash: number = Citizen.invokeNative(
      '0x43AD8FC02B429D33',
      this.coords.x,
      this.coords.y,
      this.coords.z,
      1,
      Citizen.resultAsInteger(),
    ); // 1 flag is town
    return ZoneHash !== 0;
  }

  async destroyPedSpawn(immediate: boolean) {
    const heldEntity = GetCurrentPedWeaponEntityIndex(PlayerPedId(), 0);
    PVPrompt.hide('character-spawn:cancel:task');
    if (immediate) {
      ClearPedTasksImmediately(PlayerPedId());
    } else {
      ClearPedTasks(PlayerPedId());
    }
    characterSpawn.promptLoopRunning = false;
    await Delay(2500);
    ClearPedTasksImmediately(PlayerPedId());
    FreezeEntityPosition(PlayerPedId(), false);
    await Delay(500);
    if (DoesEntityExist(heldEntity)) {
      SetEntityAsMissionEntity(heldEntity, true, true);
      PVBase.deleteEntity(heldEntity);
    }
  }
}

const characterSpawn = CharacterSpawnManager.getInstance();

onResourceInit('prompts', () => {
  PVPrompt.register(
    () => {
      characterSpawn.destroyPedSpawn(false);
    },
    'createHold',
    'character-spawn:cancel:task',
    GetHashKey('INPUT_ENTER'),
    'Stop Task',
  );
});

on('onResourceStop', async (pResName: string) => {
  if (pResName !== GetCurrentResourceName()) return;
  await characterSpawn.destroyPedSpawn(true);
});

export default characterSpawn;
