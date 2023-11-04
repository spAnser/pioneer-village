import { creationManager } from '../managers/creation-manager';
import { onUI } from '@lib/client';
import { Log } from '@lib/client/comms/ui';

on('customization:client:character_creation', () => {
  creationManager.start();
});

onUI('customization.set-components', (components) => {
  Log('customization.set-components', components);
  creationManager.setComponents(components);
});

onUI('customization.highlight', (gender) => {
  creationManager.highlightGender(gender);
});

onUI('customization.choose-gender', () => {
  creationManager.chooseGender();
});

onUI('customization.set-state', (state) => {
  creationManager.setState(state);
});

RegisterCommand(
  'create_start',
  () => {
    creationManager.start();
  },
  false,
);

RegisterCommand(
  'create_end',
  () => {
    creationManager.destroy();
  },
  false,
);

RegisterCommand(
  'create_rotate',
  async (source: number, args: string[]) => {
    creationManager.rotateChosen(Number(args[0]));
  },
  false,
);

RegisterCommand(
  'create_camera',
  async (source: number, args: string[]) => {
    // @ts-ignore
    creationManager.chooseCamera(args[0]);
  },
  false,
);
