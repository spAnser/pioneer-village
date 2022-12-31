import { creationManager } from '../managers/creation-manager';
import { emitUI, focusUI, onUI } from '@lib/client';

on('customization:client:character_creation', () => {
  creationManager.start();
});

onUI('customization.set-components', (components) => {
  creationManager.setComponents(components);
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
  'create_highlight',
  async (source: number, args: string[]) => {
    // @ts-ignore
    creationManager.highlightGender(args[0]);
  },
  false,
);

RegisterCommand(
  'create_choose',
  async (source: number, args: string[]) => {
    creationManager.chooseGender();
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

let ui = false;
RegisterCommand(
  'create_ui',
  () => {
    if (ui) {
      emitUI('customization.state', { show: false });
      focusUI(false, false);
    } else {
      emitUI('customization.state', { show: true });
      focusUI(true, true);
    }
    ui = !ui;
  },
  false,
);
