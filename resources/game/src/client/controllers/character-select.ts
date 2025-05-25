import { shuffle } from 'lodash';

import { PVGame, exports, PVCustomization } from '@lib/client';
import { PVBase, PVCamera } from '@lib/client';
import { Vector3 } from '@lib/math/vector3';
import { AnimFlag } from '@lib/flags';
import { emitUI, onUI } from '@lib/client';
import { emitSocket, focusUI, Log } from '@lib/client/comms/ui';
import { Delay } from '@lib/functions';

import gameManager from '../managers/game-manager';
import characterSpawn from '../managers/character-spawn-manager';

const characterSpots: Game.CharacterSpot[] = [
  {
    position: { x: 2949.66, y: 2378.78, z: 194.6 },
    rotation: { x: 0, y: 0, z: 115.5 },
    animation: {
      dict: 'amb_camp@prop_camp_fire_seat_bench@male_a@idle_a',
      anim: ['idle_a', 'idle_b', 'idle_c'],
      flags: AnimFlag.REPEAT + AnimFlag.OFFSET_POSITION,
      blendInSpeed: 8,
      blendOutSpeed: -8,
    },
    screenOffset: {
      x: 0.02,
      y: -0.025,
    },
  },
  {
    position: { x: 2945.54, y: 2377.16, z: 194.6 },
    rotation: { x: 0, y: 0, z: 295.5 },
    animation: {
      dict: 'amb_camp@prop_camp_fire_tend_seat_bench@poke_fire@male_a@idle_a',
      anim: 'idle_a',
      flags: AnimFlag.REPEAT + AnimFlag.OFFSET_POSITION,
      blendInSpeed: 8,
      blendOutSpeed: -8,
    },
    objects: [
      {
        model: 'P_STICKFIREPOKER01X',
        attach: 'PH_R_HAND',
      },
    ],
    screenOffset: {
      x: -0.0125,
      y: -0.0125,
    },
  },
  {
    position: { x: 2943.596, y: 2377.774, z: 194.889 },
    rotation: { x: 0, y: 0, z: 118.7 },
    animation: {
      dict: 'mech_respawn@leaning@wall@male_a@idle_a',
      anim: ['idle_a', 'idle_b', 'idle_c'],
      flags: AnimFlag.REPEAT + AnimFlag.OFFSET_POSITION,
      blendInSpeed: 8,
      blendOutSpeed: -8,
    },
  },
  {
    position: { x: 2946.65, y: 2381.2, z: 194.68 },
    rotation: { x: 0, y: 0, z: 48.7 },
    animation: {
      dict: 'amb_camp@prop_camp_dutch_chess@idle_c',
      anim: 'idle_h',
      flags: AnimFlag.REPEAT + AnimFlag.OFFSET_POSITION,
      blendInSpeed: 8,
      blendOutSpeed: -8,
    },
    screenOffset: {
      x: 0.0125,
      y: 0,
    },
  },
  {
    position: { x: 2944.76, y: 2382.62, z: 194.42 },
    rotation: { x: 0, y: 0, z: 228.7 },
    animation: {
      dict: 'amb_camp@prop_camp_dutch_chess@idle_a',
      anim: 'idle_b',
      flags: AnimFlag.REPEAT + AnimFlag.OFFSET_POSITION,
    },
    screenOffset: {
      x: -0.02,
      y: 0,
    },
  },
  {
    position: { x: 2948.4, y: 2373.39, z: 193.735 },
    rotation: { x: 0, y: 0, z: 33.75 },
    animation: {
      dict: 'amb_work@world_human_stand_fishing@male_a@idle_a',
      anim: ['idle_a', 'idle_b', 'idle_c'],
      flags: AnimFlag.REPEAT + AnimFlag.OFFSET_POSITION,
      blendInSpeed: 8,
      blendOutSpeed: -8,
    },
    objects: [
      {
        model: 'P_FISHINGPOLE01BX',
        attach: 'PH_R_HAND',
      },
    ],
    screenOffset: {
      x: 0,
      y: -0.075,
    },
  },
];

const cameraPosition = new Vector3(2948.62, 2386.09, 198.45);
const cameraRotation = new Vector3(-26.56, 0, 161.97);

const spawnedPeds: Set<number> = new Set();

const cleanupCharacters = () => {
  emitUI('character-select.state', {
    show: false,
    characters: [],
  });
  focusUI(false, false);
  PVCamera.setInactive('character-select', 0);
  Log([...spawnedPeds.values()]);
  PVBase.deleteEntities([...spawnedPeds.values()]);
  spawnedPeds.clear();
};

const setPedOutfit = async (ped: number, components: number[]) => {
  let currentComponentCount = GetNumComponentsInPed(ped);
  for (let n = currentComponentCount; n--; ) {
    const component = GetShopItemComponentAtIndex(
      ped,
      n,
      false,
      new DataView(new ArrayBuffer(255)),
      new DataView(new ArrayBuffer(255)),
    );
    if (!components.includes(component)) {
      const componentCategory = GetShopItemComponentCategory(component, 0, true);
      RemoveTagFromMetaPed(ped, componentCategory, 0); // _SET_PED_COMPONENT_DISABLED
      await Delay(1);
    }
  }

  // Set Components
  for (const component of components) {
    ApplyShopItemToPed(ped, component, false, true, false); // _SET_PED_COMPONENT_ENABLED
    await Delay(1);
  }
  Citizen.invokeNative('0x704c908e9c405136', ped); // Fix clothing???
  UpdatePedVariation(ped, false, true, true, true, false);
  await Delay(1);
};

const skinPed = async (ped: number, character: Game.Character) => {
  // for (const [feature, hash] of Object.entries(faceFeatures)) {
  //     Citizen.invokeNative('0x5653AB26C82938CF', ped, hash, character.wardrobe.face[feature] + 0.000001);
  //     await Delay(1);
  // }

  await setPedOutfit(ped, character.components);
  await PVCustomization.equipItems(ped, character.clothing);

  // setTimeout(() => {
  //   setPedOutfit(ped, character.components);
  //   PVCustomization.equipItems(ped, character.clothing);
  // }, 2500);

  // if (character.wardrobe.face.overlays) {
  //     emit('customization:update_overlays', character.wardrobe.face.overlays);
  // }
};

exports<'game'>('skinPed', skinPed);

const spawnCharacter = async (
  character: Game.Character,
  x: number,
  y: number,
  z: number,
  h: number,
): Promise<number> => {
  const modelHash = GetHashKey(character.model);

  await gameManager.loadModel(modelHash);
  const ped = CreatePed(modelHash, x, y, z, h, false, false, false, false);
  Log(`Creating ped with model: ${modelHash} @ ${x}, ${y}, ${z} (${ped})`);

  await gameManager.pedIsReadyToRender(ped);

  Log('spawned', character.id, ped);

  SetRandomOutfitVariation(ped, true);
  FreezeEntityPosition(ped, true);
  SetEntityInvincible(ped, true);
  SetBlockingOfNonTemporaryEvents(ped, true);
  SetEntityCollision(ped, false, false);

  await skinPed(ped, character);

  SetModelAsNoLongerNeeded(modelHash);

  return ped;
};

const playerCharacters: Map<number, Game.Character> = new Map();

export const spawnCharacters = async (characters: Game.Character[]): Promise<UI.CharacterSelect.CharacterData[]> => {
  cleanupCharacters();
  playerCharacters.clear();
  for (const character of characters) {
    playerCharacters.set(character.id, character);
  }

  PVCamera.create({
    id: 'character-select',
    _type: 'DEFAULT_SCRIPTED_CAMERA',
    coords: cameraPosition.toObject(),
    rot: cameraRotation.toObject(),
    fov: 50,
  });
  PVCamera.setActive('character-select', 0);
  const uiCharacters: UI.CharacterSelect.CharacterData[] = [];
  const shuffledSpots = shuffle(characterSpots);
  for (const character of characters) {
    const spot = shuffledSpots.pop();
    if (!spot) {
      uiCharacters.push({
        id: character.id,
        firstName: character.firstName,
        lastName: character.lastName,
      });
      continue;
    }
    const { position, rotation, animation, objects, screenOffset } = spot;
    const characterPed = await spawnCharacter(character, position.x, position.y, position.z, rotation.z);
    spawnedPeds.add(characterPed);
    if (objects) {
      for (const object of objects) {
        const { model, attach } = object;
        const objectId = await gameManager.createObject(model);
        await gameManager.attachEntityToBoneName(objectId, attach, characterPed);
        spawnedPeds.add(objectId);
      }
    }

    gameManager.taskPlayAnimAdvArray(
      Vector3.fromObject(position),
      Vector3.fromObject(rotation),
      [animation],
      true,
      characterPed,
    );

    const [, x, y] = GetHudScreenPositionFromWorldPosition(position.x, position.y, position.z);

    uiCharacters.push({
      id: character.id,
      firstName: character.firstName,
      lastName: character.lastName,
      pos: { x: x + (screenOffset?.x ?? 0), y: y + (screenOffset?.y ?? 0) },
    });
    focusUI(true, true);
  }

  return uiCharacters;
};

let currentCharacter: Game.Character | undefined;

onUI('character-select.choose', async (characterId) => {
  Log('character-select.choose', characterId);
  const steam = await PVGame.getPlayerSteamId();
  const character = playerCharacters.get(characterId);
  if (!character) {
    return;
  }
  currentCharacter = character;

  DoScreenFadeOut(500);

  const playerPed = await gameManager.setPlayerModel(GetHashKey(character.model));
  await Delay(500);
  await skinPed(playerPed, character);
  await Delay(500);
  SetEntityCoords(playerPed, character.lastX, character.lastY, character.lastZ - 1.0, false, false, false, false);

  cleanupCharacters();

  emit('game:character-selected', characterId);
  // Log('game:character-selected');
  await gameManager.collisionLoadedAtEntity(playerPed);
  await Delay(1000);
  await characterSpawn.setCoords(new Vector3().setFromArray([character.lastX, character.lastY, character.lastZ]));
  emitSocket('character-select.choose', characterId, steam);
});

onUI('character-select.create', () => {
  // Log('character-select.create');
  emit('customization:client:character_creation');
  cleanupCharacters();
});

on('onResourceStop', (resourceName: string) => {
  // Current Resource Stops
  if (resourceName === GetCurrentResourceName()) {
    cleanupCharacters();
  }
  if (resourceName === 'ui' && !currentCharacter) {
    cleanupCharacters();
    DoScreenFadeOut(0);
  }
});

RegisterCommand(
  'reset_ped',
  async () => {
    if (!currentCharacter) return;

    const playerPed = await gameManager.setPlayerModel(GetHashKey(currentCharacter.model));
    await Delay(500);
    await skinPed(playerPed, currentCharacter);
  },
  false,
);

exports<'game'>('getCurrentCharacter', () => currentCharacter);
