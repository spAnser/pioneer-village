import { emitUI, focusUI } from '@lib/client';
import { Log } from '@lib/client/comms/ui';

on('onResourceStop', (resourceName: string) => {
  switch (resourceName) {
    case 'customization':
      Log('Closing customization layer');
      emitUI('customization.state', { show: false });
      focusUI(false, false);
      break;
  }
});
