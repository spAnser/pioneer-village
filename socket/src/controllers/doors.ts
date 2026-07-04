import { eq } from 'drizzle-orm';

import { db } from '../db/connection';
import { DoorSchema } from '../db/schema';
import { logInfoC } from '../helpers';
import Inventories from '../managers/inventories';
import { serverNamespace, userNamespace } from '../server';

// TODO: Ability to re-key doors via a version number or something.

export default () => {
  const DoorState = new Map<number, number>();

  const persistAndBroadcastState = async (doorHash: number, state: number) => {
    DoorState.set(doorHash << 0, state);
    userNamespace.emit('__client__', 'doors.set-door-state', doorHash, state);
    await db
      .update(DoorSchema)
      .set({ state })
      .where(eq(DoorSchema.hash, doorHash << 0));
  };

  db.select()
    .from(DoorSchema)
    .then((doors) => {
      for (const doorRecord of doors) {
        DoorState.set(doorRecord.hash << 0, doorRecord.state || -1);
      }
    });

  serverNamespace.on('connection', (socket) => {
    //
  });

  userNamespace.on('connection', (socket) => {
    socket.on('doors.get-door-states', (cb) => {
      cb(Array.from(DoorState.entries()));
    });

    socket.on('doors.set-door-state', async (doorHash, state, pairedHash?) => {
      logInfoC('doors.set-door-state', doorHash, state, pairedHash);
      if (state < -1 || state > 4) {
        return;
      }
      let currentDoorState = DoorState.get(doorHash);
      if (currentDoorState === state) {
        return;
      }

      if (currentDoorState === undefined) {
        await db.insert(DoorSchema).values({
          hash: doorHash << 0,
          state,
        });
      }

      const inventoryIdentifier = `character:${socket.data?.character?.id || 0}`;
      let hasKey = await Inventories.hasDoorKey(inventoryIdentifier, doorHash);
      if (hasKey || currentDoorState === undefined) {
        await persistAndBroadcastState(doorHash, state);

        if (pairedHash !== undefined && pairedHash !== null) {
          await persistAndBroadcastState(pairedHash, state);
        }
      } else {
        userNamespace.emit('__client__', 'doors.set-door-state', doorHash, currentDoorState);
      }
    });

    // Bypass used by dev toggle / lockpicking — no key check
    socket.on('doors.set-door-state-bypass', async (doorHash, state, pairedHash?) => {
      logInfoC('doors.set-door-state-bypass', doorHash, state, pairedHash);
      if (state < 0 || state > 1) return;
      const currentDoorState = DoorState.get(doorHash);
      if (currentDoorState !== state) {
        await persistAndBroadcastState(doorHash, state);
      }
      if (pairedHash !== undefined && pairedHash !== null) {
        const currentPairedState = DoorState.get(pairedHash);
        if (currentPairedState !== state) {
          await persistAndBroadcastState(pairedHash, state);
        }
      }
    });
  });
};
