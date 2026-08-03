import { PVKeymapper } from '@lib/client';

import './auto-close-layers';
import './cleanup';
import './commands';
import './crosshair';
// Import exports to register them
import './exports';

// TODO: Replace this
const DEV_ENV = true;

// Register form test command
RegisterCommand(
  'formTest',
  () => {
    // @ts-ignore - UI exports are registered
    global.exports['ui'].emitUI('form.state', { show: true, title: 'What is your name?' });
    // @ts-ignore
    global.exports['ui'].focusUI(true, true);
  },
  false,
);

// Register chat command
RegisterCommand(
  '+openChat',
  () => {
    // @ts-ignore - UI exports are registered
    global.exports['ui'].emitUI('chat.state', { show: true });
    // @ts-ignore
    global.exports['ui'].focusUI(true, true);
  },
  false,
);

// Citizen.invokeNativeByHash(0x00000000, 0xd7664fd1, '+openChat', 'Chat', 'keyboard', 't');
PVKeymapper.RegisterKeyMapping('+openChat', 'Chat', 'keyboard', 'T');

// Handle server log messages
onNet('server.log.message', (logData: { resource: string; message: string }) => {
  console.log('server.log.message', logData);
  if (DEV_ENV) {
    // @ts-ignore - UI exports are registered
    global.exports['ui'].emitUI('log.message', logData, 'server');
  }
});

on('client.copy.clipboard', (payload: string) => {
  SendNUIMessage({
    action: 'copy.clipboard',
    payload: payload,
  });
  console.log(`Copied to clipboard: ${payload}`);
});
