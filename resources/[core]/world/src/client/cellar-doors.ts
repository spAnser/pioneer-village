import { PVGame, PVTarget, onResourceInit } from '@lib/client';
import { Vector3 } from '@lib/math';

import worldController from './controllers/world-controller';

const DOOR_L_NAME = 'serial::cellar-door-l';
const DOOR_R_NAME = 'serial::cellar-door-r';
const DOOR_NAMES = [DOOR_L_NAME, DOOR_R_NAME];
const ANIM_DICT = 'script_rc@sklr@ig@ig1_opendoor';

const setDoorOpen = (open: boolean) => {
  for (const name of DOOR_NAMES) {
    worldController.updateState(name, { open });
  }
};

const isDoorOpen = (entity: number | undefined): boolean => {
  if (!entity) return false;
  const name = worldController.getName(entity);
  if (!name) return false;
  return worldController.getState(name).open === true;
};

const isLeftDoor = (entity: number): boolean => GetEntityModel(entity) === GetHashKey('P_CS_LUC_BASEDR');

// Play a single door's swing animation. Used by the close interaction and for doors
// animated remotely (another player changed the state).
const playDoorAnim = (entity: number, open: boolean): void => {
  const side = isLeftDoor(entity) ? 'l' : 'r';

  const task: Anim.EntityTask = {
    obj: entity,
    dict: ANIM_DICT,
    anim: open ? `arthur_open_doors_luc_basedr_${side}_door` : `enter_closed_doors_luc_basedr_${side}_door`,
    stayInAnim: true,
    flags: 32768,
  };
  if (open) {
    task.delta = 0.4;
  }

  PVGame.taskPlayEntityAnim([task]);
};

// Snap a door to its fully-open pose without playing the swing. Used when a door spawns
// already-open (restored from persisted state) so the player sees the end state, not the animation.
const snapDoorOpen = (entity: number) => {
  PVGame.taskPlayEntityAnim([
    {
      obj: entity,
      dict: ANIM_DICT,
      anim: isLeftDoor(entity) ? 'arthur_open_doors_luc_basedr_l_door' : 'arthur_open_doors_luc_basedr_r_door',
      delta: 0.9,
      stayInAnim: true,
      flags: 32768,
    },
  ]);
};

for (const name of DOOR_NAMES) {
  worldController.onSpawn(name, (entityId, state) => {
    if (state.open === true) {
      snapDoorOpen(entityId);
    }
  });

  worldController.onStateChange(name, (entityId, patch) => {
    if (entityId === undefined || !('open' in patch)) return;
    playDoorAnim(entityId, patch.open === true);
  });
}

const registerTargets = () => {
  PVTarget.AddTarget({
    id: 'open_cellar',
    type: 'model',
    group: [GetHashKey('P_CS_LUC_BASEDR'), GetHashKey('P_CS_LUC_BASEDR_1')],
    data: [
      {
        id: 'open_cellar',
        label: 'Open Cellar',
        icon: 'door-open',
        event: 'world:client:open-cellar',
      },
    ],
    options: {
      distance: 3.0,
      isEnabled(data) {
        if (!data.entity) return false;
        return !isDoorOpen(data.entity);
      },
    },
  });
  PVTarget.AddTarget({
    id: 'close_cellar',
    type: 'model',
    group: [GetHashKey('P_CS_LUC_BASEDR'), GetHashKey('P_CS_LUC_BASEDR_1')],
    data: [
      {
        id: 'close_cellar',
        label: 'Close Cellar',
        icon: 'door-closed',
        event: 'world:client:close-cellar',
      },
    ],
    options: {
      distance: 3.0,
      isEnabled(data) {
        if (!data.entity) return false;
        return isDoorOpen(data.entity);
      },
    },
  });
};

onResourceInit('target', registerTargets);

on('world:client:open-cellar', async (_pEntity: number, _pArgs: Record<string, any>) => {
  const animOffset = { x: -0.03258881, y: -1.82538, z: 0.7651197 };

  const doorLeft = worldController.getEntity(DOOR_L_NAME);
  const doorRight = worldController.getEntity(DOOR_R_NAME);
  if (!doorLeft || !doorRight) return;

  const coords = Vector3.fromArray(
    GetOffsetFromEntityInWorldCoords(doorLeft, animOffset.x, animOffset.y, animOffset.z),
  );
  coords.z -= 1.0;
  const doorRot = Vector3.fromArray(GetEntityRotation(doorLeft, 2));
  const rot = new Vector3(0.0, 0.0, doorRot.z);
  rot.z -= 40.0;

  if (PVGame.playerCoords().z > 96.0) {
    TaskGoToCoordAnyMeans(PVGame.playerPed(), coords.x, coords.y, coords.z, 1.5, 0, false, 0, 0);
    await PVGame.reachedCoords(coords, 0.5);

    setDoorOpen(true);
    PVGame.taskPlayAnimAdvArray(coords.toObject(), rot.toObject(), [
      {
        dict: ANIM_DICT,
        anim: 'arthur_open_doors_arthur',
        delta: 0.0,
        duration: 1150,
      },
      {
        dict: ANIM_DICT,
        anim: 'arthur_open_doors_arthur',
        delta: 0.4666,
        additional: [
          {
            obj: doorLeft,
            anim: 'arthur_open_doors_luc_basedr_l_door',
            stayInAnim: true,
            flags: 32768,
          },
          {
            obj: doorRight,
            anim: 'arthur_open_doors_luc_basedr_r_door',
            stayInAnim: true,
            flags: 32768,
          },
        ],
      },
    ]);
  } else {
    setDoorOpen(true);
    playDoorAnim(doorLeft, true);
    playDoorAnim(doorRight, true);
  }
});

on('world:client:close-cellar', async (_pEntity: number, _pArgs: Record<string, any>) => {
  setDoorOpen(false);

  const doorLeft = worldController.getEntity(DOOR_L_NAME);
  const doorRight = worldController.getEntity(DOOR_R_NAME);
  if (!doorLeft || !doorRight) return;

  playDoorAnim(doorLeft, false);
  playDoorAnim(doorRight, false);
});
