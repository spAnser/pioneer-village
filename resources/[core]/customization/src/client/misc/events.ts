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

onUI('customization.set-body-type', (bodyType) => {
  creationManager.setBodyType(bodyType);
});

onUI('customization.set-waist', (waist) => {
  creationManager.setWaist(waist);
});

onUI('customization.set-face-option', (options) => {
  Log(options);
  creationManager.setFaceOptions(options);
});

RegisterCommand(
  'set_face_option',
  async (source: number, args: string[]) => {
    const ped = args[2] ? Number(args[2]) : PlayerPedId();
    SetCharExpression(ped, Number(args[0]), Number(args[1]));
    UpdatePedVariation(ped, false, true, true, true, false);
  },
  false,
);

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
