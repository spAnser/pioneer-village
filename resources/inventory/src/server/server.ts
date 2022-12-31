import { emitSocket } from '@lib/server';
import { PVDoors } from '@lib/client';

RegisterCommand(
  'giveItem',
  (source: number, args: string[], rawCommand: string) => {
    const characterId = Number(args[0]);
    const itemId = GetHashKey(args[1]);

    emitSocket('inventoryAddItem', `character:${characterId}`, itemId, Number(args[2] ?? 1), {}, (success: boolean) => {
      console.log('success', success);
    });
  },
  false,
);

RegisterCommand(
  'giveDoorKey',
  (source: number, args: string[], rawCommand: string) => {
    const characterId = Number(args[0]);
    const itemId = GetHashKey('PV_DOOR_KEY');
    const doorHash = Number(args[1]);

    emitSocket('inventoryAddItem', `character:${characterId}`, itemId, 1, { doorHash }, (success: boolean) => {
      console.log('success', success);
    });
  },
  false,
);
