import { creationManager } from '../managers/creation-manager';
import { emitUI, focusUI, onUI } from '@lib/client';

on('customization:client:character_creation', () => {
  creationManager.start();
});

onUI('customization.set-components', (components) => {
  creationManager.setComponents(components);
});

onUI('customization.highlight', (gender) => {
  creationManager.highlightGender(gender);
});

onUI('customization.choose-gender', () => {
  creationManager.chooseGender();
});

onUI('customization.set-information-firstname', (firstname) => {
  creationManager.setFirstName(firstname);
});

onUI('customization.set-information-lastname', (lastname) => {
  creationManager.setLastName(lastname);
});

onUI('customization.set-information-dateofbirth', (dateOfBirth) => {
  creationManager.setDateOfBirth(dateOfBirth);
});

onUI('customization.set-information', () => {
  creationManager.setInformation();
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
