import { PVGame } from '@lib/client';
import { awaitUI } from '@lib/client/comms/ui';

import bankController from './controllers/bank-controller';

on('banking:client:sell-minerals', async (_entity: number, pArgs: Record<string, any>) => {
  const bankId = pArgs?.bankId ?? bankController.currentBank;
  if (!bankId) return;

  const characterId = PVGame.characterId();

  // Fetch current prices and remaining budget
  const { prices, budget } = await bankController.getMineralPrices(bankId);

  if (budget.budgetRemaining <= 0) {
    console.log('[Banking] This bank has exhausted its daily mineral purchasing budget. Try another bank.');
    return;
  }

  console.log(`[Banking] Mineral prices at this bank (budget remaining: $${budget.budgetRemaining.toFixed(2)}):`);
  for (const p of prices) {
    console.log(`  ${p.label}: $${p.pricePerUnit.toFixed(2)}/unit`);
  }

  // TODO: Open a UI dialog so the player can pick items and quantities.
  // For now, use the inventory player-get-items call to find minerals in the player's inventory
  // and sell all of them as a proof-of-concept.
  const playerItems: Record<number, UI.Inventory.ItemData> = await awaitUI('inventory.player-get-items');

  const sellLines: { itemIdentifier: string; itemIds: number[]; quantity: number }[] = [];

  for (const price of prices) {
    const hashKey = GetHashKey(price.itemIdentifier);
    for (const [, slotData] of Object.entries(playerItems)) {
      if ((slotData as any).identifier === hashKey) {
        const data = slotData as UI.Inventory.ItemData;
        sellLines.push({
          itemIdentifier: price.itemIdentifier,
          itemIds: data.ids,
          quantity: data.quantity,
        });
      }
    }
  }

  if (!sellLines.length) {
    console.log('[Banking] No minerals found in inventory.');
    return;
  }

  const result = await bankController.sellMinerals(characterId, bankId, sellLines);

  if (result.success) {
    console.log(`[Banking] Sold minerals for $${result.payout.toFixed(2)}. Bank budget remaining: $${result.budgetRemaining.toFixed(2)}`);
  } else {
    console.log(`[Banking] Mineral sale failed: ${result.message}`);
  }
});
