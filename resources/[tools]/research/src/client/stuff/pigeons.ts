import { PVBase, PVGame } from '@lib/client';
import { Delay } from '@lib/functions';
import { Vector3 } from '@lib/math';

const birdModel = GetHashKey('A_C_PIGEON'); // A_C_OWL_01
const letterModel = GetHashKey('p_letterenvelope_cs01x');

// NOTE: Outside check options
// GetInteriorFromEntity(PlayerPedId())
// IsCollisionMarkedOutside(GetEntityCoords(PlayerPedId()))

const attachLetterToBird = (bird: number): number => {
  const birdCoords = GetEntityCoords(bird, false, false);
  const letter = CreateObject(letterModel, birdCoords[0], birdCoords[1], birdCoords[2], true, false, false);
  const boneIndex = GetEntityBoneIndexByName(bird, 'PH_R_Foot');
  AttachEntityToEntity(
    letter,
    bird,
    boneIndex,
    0.0,
    0.0,
    0.0,
    90.0,
    0.0,
    0.0,
    true,
    false,
    false,
    true,
    1,
    true,
    false,
    false,
  );
  return letter;
};

const detachLetterFromBird = (letter: number, bird: number) => {
  if (IsEntityAttachedToEntity(letter, bird)) {
    DetachEntity(letter, false, false);
    DeleteEntity(letter);
  }
};

const birdTakeOff = async (bird: number, withLetter: boolean) => {
  let letter: number | undefined;
  if (withLetter) {
    letter = attachLetterToBird(bird);
  }
  TaskFlyAway(bird, 0);
  await Delay(500);
  DetachEntity(bird, false, false);
  SetEntityCollision(bird, false, false);
  SetEntityCompletelyDisableCollision(bird, false, false);
  await Delay(500);
  SetEntityCollision(bird, true, true);
  SetEntityCompletelyDisableCollision(bird, true, true);
  await Delay(5_000);
  PVBase.deleteEntities([bird, letter].filter(Boolean) as number[]);
};

const birdLand = async (hasLetter = false) => {
  await PVGame.loadModel(birdModel);
  await PVGame.loadModel(letterModel);

  const player = PVGame.playerPed();
  const spawnCoords = GetOffsetFromEntityInWorldCoords(player, 5.0, 5.0, 5.0);
  const bird = CreatePed(birdModel, spawnCoords[0], spawnCoords[1], spawnCoords[2], 0.0, false, false, false, false);

  SetPedPromptName(bird, 'Flying Shitbag');
  SetEntityCollision(bird, false, false);
  SetEntityCompletelyDisableCollision(bird, false, false);

  let letter: number | undefined;
  if (hasLetter) {
    letter = attachLetterToBird(bird);
  }

  Citizen.invokeNative('0x283978a15512b2fe', bird, 1);

  const playerShoulderBoneIndex = GetEntityBoneIndexByName(player, 'CP_R_Shoulder');

  let success = false;
  while (!success) {
    const shoulderCoords = GetWorldPositionOfEntityBone(player, playerShoulderBoneIndex);
    const speed = GetEntitySpeed(player);
    const forward = GetEntityForwardVector(player);
    TaskFlyToCoord(
      bird,
      100.0,
      shoulderCoords[0] + forward[0] * speed,
      shoulderCoords[1] + forward[1] * speed,
      shoulderCoords[2] + forward[2] * speed,
      true,
      true,
    );
    await Delay(500);

    const birdCoords = GetEntityCoords(bird, false, false);
    const currentShoulderCoords = GetWorldPositionOfEntityBone(player, playerShoulderBoneIndex);
    const dx = birdCoords[0] - currentShoulderCoords[0];
    const dy = birdCoords[1] - currentShoulderCoords[1];
    const dz = birdCoords[2] - currentShoulderCoords[2];
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

    if (distance <= 1) {
      ClearPedTasksImmediately(bird, false, false);
      AttachEntityToEntity(
        bird,
        player,
        playerShoulderBoneIndex,
        0.02,
        0.0,
        0.06,
        0.0,
        0.0,
        0.0,
        true,
        true,
        true,
        true,
        1,
        true,
        false,
        false,
      );
      if (letter !== undefined) {
        detachLetterFromBird(letter, bird);
      }
      success = true;
    }
  }

  const startTime = GetGameTimer();
  while (GetGameTimer() - startTime < 5000) {
    TaskAnimalUnalerted(bird, 0, 0, 0, 0);
    await Delay(1);
  }

  ClearPedTasks(bird, false, false);
  birdTakeOff(bird, !hasLetter);
};

RegisterCommand('bird', () => birdLand(false), false);
RegisterCommand('bird2', () => birdLand(true), false);

// Every 37.5 units = 1 second
RegisterCommand(
  'birdTime',
  async (source: number, args: any[], rawCommand: string) => {
    // console.log({ source, args, rawCommand });

    const [marker, x, y] = GetWaypointPosition();

    const playerCoords = Vector3.fromObject(PVGame.playerCoords());

    const distance = playerCoords.getDistance2D(x, y);

    const time = distance / 37.5;

    console.log(`Distance: ${distance.toFixed(2)} units, Estimated time: ${time.toFixed(2)} seconds`);
  },
  false,
);
