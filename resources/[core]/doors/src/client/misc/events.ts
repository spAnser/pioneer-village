import doorManager from '../managers/door-manager';
import { PVBase, PVGame } from '@lib/client';
import { Vector3 } from '@lib/math';
import { Delay } from '@lib/functions';
import { doorOpenAnim } from './anim-tasks';

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
      if (Math.abs(DoorSystemGetOpenRatio(closestDoorHash)) > 0.15) {
        doorManager.closeDoor(closestDoorHash, 0.25);
        await Delay(250);
      }

      const doorEntity = doorManager.getDoorEntity(closestDoorHash);

      if (doorEntity) {
        const keyholeCoords = GetOffsetFromEntityInWorldCoords(doorEntity, 1.0, 0.0, 1.0);
        TaskTurnPedToFaceCoord(PVGame.playerPed(), keyholeCoords[0], keyholeCoords[1], keyholeCoords[2], 1250);
      }

      await Delay(1250);
      PVGame.taskPlayAnim(doorOpenAnim);
      doorManager.toggleDoorState(closestDoorHash);
    }
  }
});
