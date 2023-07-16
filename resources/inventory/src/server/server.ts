import { emitSocket } from '@lib/server';

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

    const metadata: { doorHashes?: number[]; doorHash?: number } = {};

    if (args[1].includes(',')) {
      metadata.doorHashes = args[1].split(',').map((doorHash) => Number(doorHash) << 0);
    } else {
      metadata.doorHash = Number(args[1]) << 0;
    }

    emitSocket('inventoryAddItem', `character:${characterId}`, itemId, 1, metadata, (success: boolean) => {
      console.log('success', success);
    });
  },
  false,
);
