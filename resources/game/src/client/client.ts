import { Delay } from '@lib/functions';
import { awaitUI, emitUI, focusUI, onUI, PVDoors, PVGame, PVInit } from '@lib/client';
import gameManager from './managers/game-manager';

import { spawnCharacters } from './controllers/character-select';

import './exports';
import { emitSocket } from '@lib/client/comms/ui';

let shouldHideLoadscreen = false;
let firstRun = true;

const playerId = PlayerId();

const spawnCoords = { x: 2948.702, y: 2387.352, z: 196.847 };

const loadedIn = (): Promise<void> => {
  let player;
  return new Promise((resolve) => {
    const loadedInterval = setInterval(() => {
      player = PlayerPedId();
      if (player) {
        SetEntityCoordsNoOffset(player, spawnCoords.x, spawnCoords.y, spawnCoords.z, false, false, false);
      }
      if (!GetIsLoadingScreenActive() && player && HasCollisionLoadedAroundEntity(player)) {
        clearInterval(loadedInterval);
        resolve();
      }
    }, 100);
  });
};

let characterSelectionRunning = false;

const characterSelection = async () => {
  if (characterSelectionRunning) {
    return;
  }
  characterSelectionRunning = true;
  let male = 0;
  let female = 0;
  if (firstRun) {
    // Game acts weird with the first ped created so lets spawn some trash ones to start.
    male = await gameManager.createPed('MP_MALE', spawnCoords.x, spawnCoords.y, spawnCoords.z);
    female = await gameManager.createPed('MP_FEMALE', spawnCoords.x, spawnCoords.y, spawnCoords.z);
    await Delay(5000);
  }

  const characters = await awaitUI('getCharacters');

  const uiCharacters = await spawnCharacters(characters);

  if (firstRun) {
    gameManager.deleteEntity(male);
    gameManager.deleteEntity(female);
  }
  firstRun = false;

  NetworkSetFriendlyFireOption(true);
  ShutdownLoadingScreen();

  await loadedIn();
  await Delay(1000);
  DoScreenFadeIn(500);

  shouldHideLoadscreen = true;
  emitUI('character-select.state', {
    show: true,
    characters: uiCharacters,
  });
  PVInit.resolveResource('game');
  focusUI(true, true);
  characterSelectionRunning = false;
};

const initTick = setTick(() => {
  if (NetworkIsSessionStarted()) {
    DoScreenFadeOut(0);
    characterSelection();

    clearTick(initTick);
  }
});

onUI('socket.connected', async () => {
  console.log('socket.connected');
  // console.log('socket.connected', PVGame.getCurrentCharacter(), !PVGame.getCurrentCharacter());
  const character = PVGame.getCurrentCharacter();
  if (character) {
    const steamId = await PVGame.getPlayerSteamId();
    emitSocket('character-select.choose', character.id, steamId);
  } else {
    characterSelection();
  }
});

on('game:client:new_character', async (characterData: Game.Character, faceData: Game.Face) => {
  DoScreenFadeOut(500);
  console.log(characterData);
  await awaitUI('createCharacter', characterData, faceData);
  characterSelection();
  // TODO: This step will be unnecessary when custimization UI is ported to new UI system.
});

RegisterNuiCallbackType('loadscreen-shutdown-check');
on('__cfx_nui:loadscreen-shutdown-check', (data: Record<string, any>, cb: (res: any) => void) => {
  cb({ shutdown: shouldHideLoadscreen });
});
