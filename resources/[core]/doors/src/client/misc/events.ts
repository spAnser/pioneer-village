import doorManager from '../managers/door-manager';
import { PVBase, PVGame } from '@lib/client';
import { Vector3 } from '@lib/math';
import { Delay } from '@lib/functions';
import { doorOpenAnim } from './anim-tasks';
import { emitSocket } from '@lib/client/comms/ui';

const toggleDoor = async (doorHash: number) => {
  if (Math.abs(DoorSystemGetOpenRatio(doorHash)) > 0.15) {
    doorManager.closeDoor(doorHash, 0.25);
    await Delay(250);
  }

  const doorEntity = doorManager.getDoorEntity(doorHash);

  if (doorEntity) {
    const keyholeCoords = GetOffsetFromEntityInWorldCoords(doorEntity, 1.0, 0.0, 1.0);
    TaskTurnPedToFaceCoord(PVGame.playerPed(), keyholeCoords[0], keyholeCoords[1], keyholeCoords[2], 1250);
  }

  await Delay(1250);
  PVGame.taskPlayAnim(doorOpenAnim);
  await doorManager.toggleDoorState(doorHash);
};

on('doors:client:toggle_door', async (item: Inventory.ItemBase, itemData: UI.Inventory.ItemData) => {
  for (const metadata of itemData.metadatas) {
    let closestDoorHash = metadata.doorHash;
    let distance = doorManager.getDoorDistance(metadata.doorHash);
    for (const doorHash of metadata.doorHashes || []) {
      const curDistance = doorManager.getDoorDistance(doorHash);
      if (curDistance < distance) {
        closestDoorHash = doorHash;
        distance = curDistance;
      }
    }

    if (distance < 2.5) {
      await toggleDoor(closestDoorHash);
    }

    let keyWasUsed = false;
    for (const doorHashes of metadata.linkedDoors || []) {
      if (doorHashes.length === 0) {
        continue;
      }
      const distance = doorManager.getDoorDistance(doorHashes[0]);
      const curState = doorManager.getDoorState(doorHashes[0]);
      if (distance < 2.5) {
        await toggleDoor(doorHashes.shift());
        for (const doorHash of doorHashes) {
          if (doorManager.getDoorState(doorHash) === curState) {
            await doorManager.toggleDoorState(doorHash);
            keyWasUsed = true;
          }
        }
      }
    }

    if (keyWasUsed) {
      emitSocket('inventory.item-wear', itemData.ids[0]);
    }
  }
});
