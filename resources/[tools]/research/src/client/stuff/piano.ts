// const promptManager = PromptManager.getInstance();
import { PVGame, PVInit, PVPrompt, PVTarget } from '@lib/client';
import { Vector3 } from '@lib/math';

const registerPrompts = async () => {
  await PVInit.initializedResource('prompts');
  console.log('research: registering prompts');
  PVPrompt.registerWithEvent('createHold', 'research::skip_piano', 0xe30cd707, 'Next Song');
  PVPrompt.registerWithEvent('createHold', 'research::stop_piano', 0x760a9c6f, 'Stand Up');
};

on('onResourceStart', (resource: string) => {
  if (resource !== 'prompts') {
    return;
  }
  registerPrompts();
});

if (GetResourceState('prompts') === 'started') {
  registerPrompts();
}

let pianoEntity = 0;
let isPlayingPiano = false;

// PROP_HUMAN_PIANO
// PROP_HUMAN_PIANO_RIVERBOAT
// PROP_HUMAN_PIANO_SKETCHY
// PROP_HUMAN_PIANO_UPPERCLASS

const pianoModelData = {
  [GetHashKey('P_PIANO02X')]: { x: 0, y: -0.7125, z: 0.5, scenario: 'PROP_HUMAN_PIANO_UPPERCLASS' },
  [GetHashKey('P_PIANO03X')]: { x: 0, y: -0.7125, z: 0.5, scenario: 'PROP_HUMAN_PIANO' },
  [GetHashKey('P_NBMPIANO01X')]: { x: 0, y: -0.8, z: 0.5, scenario: 'PROP_HUMAN_PIANO' },
  [GetHashKey('P_NBXPIANO01X')]: { x: -0.15, y: -0.7625, z: 0.5, scenario: 'PROP_HUMAN_PIANO' },
  [GetHashKey('SHA_MAN_PIANO01')]: { x: 0, y: -0.8, z: 0.5, scenario: 'PROP_HUMAN_PIANO_SKETCHY' },
};

const playPiano = (piano: number) => {
  PVPrompt.show('research::skip_piano');
  PVPrompt.show('research::stop_piano');
  const pianoModel = GetEntityModel(piano);
  const pianoData = pianoModelData[pianoModel] || { x: 0, y: 0, z: 0.5, scenario: 'PROP_HUMAN_PIANO' };
  const playerPed = PVGame.playerPed();
  const pianoCoords = Vector3.fromArray(GetOffsetFromEntityInWorldCoords(piano, pianoData.x, pianoData.y, pianoData.z));
  const pianoHeading = GetEntityHeading(piano);
  ClearPedTasksImmediately(playerPed, false, false);
  TaskStartScenarioAtPosition(
    playerPed,
    pianoData.scenario,
    pianoCoords.x,
    pianoCoords.y,
    pianoCoords.z,
    pianoHeading,
    -1,
    false,
    isPlayingPiano,
    '',
    0,
    false,
  );

  isPlayingPiano = true;
  pianoEntity = piano;
};

on('researh:play_piano', async (pEntity: number, pArgs: Record<string, any>) => {
  playPiano(pEntity);
});

on('research::skip_piano::completed', () => {
  if (!isPlayingPiano || !pianoEntity) return;
  playPiano(pianoEntity);
});

on('research::stop_piano::completed', () => {
  if (!isPlayingPiano) return;
  isPlayingPiano = false;
  PVPrompt.hide('research::skip_piano');
  PVPrompt.hide('research::stop_piano');
  ClearPedTasks(PVGame.playerPed(), false, false);
});

PVTarget.AddTarget({
  id: 'research::play_piano',
  type: 'flag',
  group: ['isPiano'],
  data: [
    {
      id: 'play_piano',
      label: 'Play Piano',
      icon: 'piano-keyboard',
      event: 'researh:play_piano',
      parameters: {},
    },
  ],
  options: {
    distance: 2.0,
    isEnabled() {
      return !isPlayingPiano;
    },
  },
});

PVTarget.AddTarget({
  id: 'research::register_steal',
  type: 'flag',
  group: ['isCashRegister'],
  data: [
    {
      id: 'register_steal',
      label: 'Steal',
      icon: 'dollar-sign',
      event: 'researh:register_steal',
      parameters: {},
    },
  ],
  options: {
    distance: 2.0,
  },
});
