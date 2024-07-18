import { PVGame, PVTarget } from '@lib/client';
import { Log } from '@lib/client/comms/ui';
import { Delay } from '@lib/functions';

const attackControls = ['INPUT_HORSE_MELEE', 'INPUT_MELEE_ATTACK', 'INPUT_ATTACK'];

const attackReleased = () => {
  for (const attackControl of attackControls) {
    if (IsControlJustReleased(0, attackControl) || IsDisabledControlJustReleased(0, attackControl)) {
      return true;
    }
  }
};

interface Animal {
  model: number;
  weapon: number;
  cantAttack?: boolean;
  attack?: number;
  execution_front?: number;
  execution_back?: number;
  ramming?: boolean;
}

let currentAnimal: Animal;
let currentTarget: number | null;

const animals: Record<string, Animal> = {
  alligator: {
    model: GetHashKey('A_C_ALLIGATOR_01'),
    weapon: GetHashKey('WEAPON_ALLIGATOR'),
    attack: GetHashKey('AR_ALLIGATOR_ATTACK'),
    execution_front: GetHashKey('AR_ALLIGATOR_EXECUTION_ENTER_FROM_FRONT'),
  },
  badger: {
    model: GetHashKey('A_C_BADGER_01'),
    weapon: GetHashKey('WEAPON_BADGER'),
  },
  bear: {
    model: GetHashKey('A_C_BEAR_01'),
    weapon: GetHashKey('WEAPON_BEAR'),
    attack: GetHashKey('AR_BEAR_CHALLENGE_FRONT_SHORT_KILL'),
  },
  blackbear: {
    model: GetHashKey('A_C_BEARBLACK_01'),
    weapon: GetHashKey('WEAPON_BEAR'),
  },
  boar: {
    model: GetHashKey('A_C_BOAR_01'),
    weapon: GetHashKey('WEAPON_BOAR'),
    ramming: true,
  },
  beaver: {
    model: GetHashKey('A_C_BEAVER_01'),
    weapon: GetHashKey('WEAPON_BEAVER'),
  },
  bighornram: {
    model: GetHashKey('A_C_BIGHORNRAM_01'),
    weapon: GetHashKey('WEAPON_DEER'),
    ramming: true,
  },
  buffalo: {
    model: GetHashKey('A_C_BUFFALO_01'),
    weapon: GetHashKey('WEAPON_BUFFALO'),
    cantAttack: true,
  },
  cougar: {
    model: GetHashKey('A_C_COUGAR_01'),
    weapon: GetHashKey('WEAPON_COUGAR'),
    attack: GetHashKey('AR_COUGAR_ATTACK'),
    execution_front: GetHashKey('AR_COUGAR_EXECUTION_ENTER_FROM_FRONT'),
    execution_back: GetHashKey('AR_COUGAR_EXECUTION_ENTER_FROM_BACK'),
  },
  coyote: {
    model: GetHashKey('A_C_COYOTE_01'),
    weapon: GetHashKey('WEAPON_COYOTE'),
  },
  deer: {
    model: GetHashKey('A_C_DEER_01'),
    weapon: GetHashKey('WEAPON_DEER'),
    ramming: true,
  },
  fox: {
    model: GetHashKey('A_C_FOX_01'),
    weapon: GetHashKey('WEAPON_FOX'),
    attack: GetHashKey('AR_FOX_ATTACK'),
  },
  horse: {
    model: GetHashKey('A_C_HORSE_ARABIAN_WHITE'),
    weapon: GetHashKey('WEAPON_HORSE'),
  },
  muskrat: {
    model: GetHashKey('A_C_MUSKRAT_01'),
    weapon: GetHashKey('WEAPON_MUSKRAT'),
  },
  ox: {
    model: GetHashKey('A_C_OX_01'),
    weapon: GetHashKey('WEAPON_OX'),
    cantAttack: true,
  },
  panther: {
    model: GetHashKey('A_C_PANTHER_01'),
    weapon: GetHashKey('WEAPON_PANTHER'),
    attack: GetHashKey('AR_COUGAR_ATTACK'),
    execution_front: GetHashKey('AR_COUGAR_EXECUTION_ENTER_FROM_FRONT'),
    execution_back: GetHashKey('AR_COUGAR_EXECUTION_ENTER_FROM_BACK'),
  },
  raccoon: {
    model: GetHashKey('A_C_RACCOON_01'),
    weapon: GetHashKey('WEAPON_RACCOON'),
  },
  snake: {
    model: GetHashKey('A_C_SNAKE_01'),
    weapon: GetHashKey('WEAPON_SNAKE'),
  },
  wolf: {
    model: GetHashKey('A_C_WOLF'),
    weapon: GetHashKey('WEAPON_WOLF'),
    attack: GetHashKey('AR_WOLF_ATTACK'),
    execution_front: GetHashKey('AR_WOLF_EXECUTION_ENTER_FROM_FRONT'),
    execution_back: GetHashKey('AR_WOLF_EXECUTION_ENTER_FROM_BACK'),
  },
  wolf_medium: {
    model: GetHashKey('A_C_WOLF_MEDIUM'),
    weapon: GetHashKey('WEAPON_WOLF_MEDIUM'),
    attack: GetHashKey('AR_WOLF_ATTACK'),
    execution_front: GetHashKey('AR_WOLF_EXECUTION_ENTER_FROM_FRONT'),
    execution_back: GetHashKey('AR_WOLF_EXECUTION_ENTER_FROM_BACK'),
  },
  wolf_small: {
    model: GetHashKey('A_C_WOLF_SMALL'),
    weapon: GetHashKey('WEAPON_WOLF_SMALL'),
    attack: GetHashKey('AR_WOLF_ATTACK'),
    execution_front: GetHashKey('AR_WOLF_EXECUTION_ENTER_FROM_FRONT'),
    execution_back: GetHashKey('AR_WOLF_EXECUTION_ENTER_FROM_BACK'),
  },
  eagle: {
    model: GetHashKey('A_C_Eagle_01'),
    weapon: GetHashKey('WEAPON_ANIMAL'),
    cantAttack: true,
  },
  rooster: {
    model: GetHashKey('A_C_Rooster_01'),
    weapon: GetHashKey('WEAPON_ANIMAL'),
  },
  chicken: {
    model: GetHashKey('A_C_Chicken_01'),
    weapon: GetHashKey('WEAPON_ANIMAL'),
  },
};

RegisterCommand(
  'animal',
  async (source: number, args: string[]) => {
    if (!animals[args[0]]) {
      return;
    }
    currentAnimal = animals[args[0]];
    await PVGame.loadModel(currentAnimal.model);
    const cid = DecorGetInt(PVGame.playerPed(), 'CID');
    const sex = DecorGetInt(PVGame.playerPed(), 'SEX');
    const inventory = DecorGetInt(PVGame.playerPed(), 'Inventory');
    SetPlayerModel(PlayerId(), currentAnimal.model, true);

    DecorSetInt(PVGame.playerPed(), 'CID', cid);
    DecorSetInt(PVGame.playerPed(), 'SEX', sex);
    DecorSetInt(PVGame.playerPed(), 'Inventory', inventory);

    SetPedConfigFlag(PVGame.playerPed(), 409, false);

    GiveDelayedWeaponToPed(PVGame.playerPed(), currentAnimal.weapon, 0, true, 0);
  },
  false,
);

const checkAnimalModel = () => {
  const playerModel = GetEntityModel(PVGame.playerPed());
  for (const animal of Object.values(animals)) {
    if (playerModel === animal.model) {
      currentAnimal = animal;
    }
  }
};

checkAnimalModel();

setTick(async () => {
  if (GetIsAnimal(PVGame.playerPed())) {
    SetControlContext(2, GetHashKey('OnMount'));

    if (currentAnimal.model !== GetEntityModel(PVGame.playerPed())) {
      checkAnimalModel();
    }

    if (!currentAnimal.ramming && !currentAnimal.cantAttack && attackReleased()) {
      const entityHit = await PVTarget.GetEntityPlayerIsLookingAt(9.9, 2.5, 4 + 1024);
      if (entityHit && IsEntityAPed(entityHit)) {
        currentTarget = entityHit;
      }
      if (!currentTarget || IsPedFatallyInjured(currentTarget)) {
        currentTarget = null;
      }

      setImmediate(() => {
        if (currentTarget && IsEntityAPed(currentTarget) && !IsPedPerformingMeleeAction(PVGame.playerPed(), 32768, 0)) {
          ResetPedModelPersonality(GetEntityModel(PVGame.playerPed()));
          ClearPedTasks(PVGame.playerPed());
          TaskMelee(PVGame.playerPed(), currentTarget, currentAnimal.attack || 0, 1, 1, 1.75, 0, -1.0);
          // Log(`TaskMelee(${PVGame.playerPed()}, ${currentTarget}, ${currentAnimal.attack || 0}, 1, 1, 1.75, 0, -1.0);`);
        }
      });
    }
  }
});
