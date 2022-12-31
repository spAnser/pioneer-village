import { PVGame } from '@lib/client';
import { AnimFlag } from '@lib/flags';
import { EmoteInterface, EMOTES } from '../data';

export class EmoteManager {
  protected static instance: EmoteManager;

  static getInstance(): EmoteManager {
    if (!EmoteManager.instance) {
      EmoteManager.instance = new EmoteManager();
    }
    return EmoteManager.instance;
  }

  processRawAnim(dict: string, anim: string): void {
    this.cancelCurrentEmote();
    const emote: EmoteInterface = {
      animation: [
        {
          dict: dict,
          anim: anim,
        },
      ],
    };

    this.doAnimation(emote);
  }

  processRawScenario(scenario: string): void {
    this.cancelCurrentEmote();

    const emote: EmoteInterface = {
      scenario: scenario,
    };
    this.doScenario(emote);
  }

  processEmoteRequest(request: string, type = 0): void {
    if (request === undefined) {
      // list all emotes
      const emotes = Object.keys(EMOTES);
      console.log('Emote List: ', emotes);
      return;
    }
    console.log('Request: ', request.toLowerCase());
    if (request.toLowerCase() == 'c' || request.toLowerCase() == 'cancel') {
      this.cancelCurrentEmote();
    } else if (request.toLowerCase() in EMOTES) {
      this.cancelCurrentEmote();
      const emote = EMOTES[request.toLowerCase()];
      if ('scenario' in emote) {
        this.doScenario(emote);
      } else if ('emote' in emote) {
        this.doEmote(emote, type);
      } else if ('animation' in emote) {
        this.doAnimation(emote);
      } else {
        console.error("Someone made a boo boo, shouldn't of received this!");
      }
    } else {
      console.error('Requested emote does not exist');
    }
  }

  cancelCurrentEmote(): void {
    console.log('Canceling emote');
    ClearPedTasks(PVGame.playerPed());
    //ClearPedTasksImmediately(PVGame.playerPed, true, true)
  }

  doScenario(emote: EmoteInterface): void {
    if (IsPedOnMount(PVGame.playerPed()) || !emote.scenario) {
      return;
    }
    TaskStartScenarioInPlaceHash(PVGame.playerPed(), emote.scenario, 0, true, 0, -1.0, false);
  }

  doEmote(emote: EmoteInterface, type: number): void {
    if (!emote.emote) {
      return;
    }
    // Citizen.invokeNative('0xB31A277C1AC7B7FF', PVGame.playerPed, 0, 0, GetHashKey(emote.emote), true, true, false, false, false);
    console.log('Emote: ', emote);
    TaskPlayEmoteWithHash(
      PVGame.playerPed(),
      emote.category || 0,
      emote.type || type,
      GetHashKey(emote.emote),
      true,
      true,
      false,
      false,
      false,
    );
  }

  doAnimation(emote: EmoteInterface): void {
    if (!emote.animation) {
      return;
    }
    const flags = (Array.isArray(emote.animation) ? emote.animation[0].flags : emote.animation.flags) || 0;
    if (IsPedOnMount(PVGame.playerPed()) && (flags & AnimFlag.UPPERBODY) === 0) {
      return;
    }
    PVGame.taskPlayAnimArrayNew(emote.animation);
  }
}
