import { EmoteManager } from './managers/emote-manager';

const emoteManager = EmoteManager.getInstance();

RegisterCommand(
  'e',
  (source: number, args: string[]) => {
    emoteManager.processEmoteRequest(args[0], Number(args[1]));
  },
  false,
);

RegisterCommand(
  'c',
  () => {
    emoteManager.cancelCurrentEmote();
  },
  false,
);

RegisterCommand(
  'erawanim',
  (source: number, args: string[]) => {
    emoteManager.processRawAnim(args[0], args[1]);
  },
  false,
);

RegisterCommand(
  'erawscenario',
  (source: number, args: string[]) => {
    emoteManager.processRawScenario(args[0]);
  },
  false,
);
