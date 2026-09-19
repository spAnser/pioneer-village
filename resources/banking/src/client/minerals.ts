import { PVGame } from '@lib/client';
import { awaitUI, emitUINotify } from '@lib/client/comms/ui';

import bankController from './controllers/bank-controller';

on('banking:client:sell-minerals', async (_entity: number, pArgs: Record<string, any>) => {
  const bankId = pArgs?.bankId ?? bankController.currentBank;
  if (!bankId) return;

  const characterId = PVGame.characterId();

  // Fetch current prices and remaining budget
  const { prices, budget } = await bankController.getMineralPrices(bankId);

  if (budget.budgetRemaining <= 0) {
    console.log('[Banking] This bank has exhausted its daily mineral purchasing budget. Try another bank.');
    emitUINotify('This bank has exhausted its purchasing budget. Try another bank.', 'error');
    return;
  }

  console.log(`[Banking] Mineral prices at this bank (budget remaining: $${budget.budgetRemaining.toFixed(2)}):`);
  for (const p of prices) {
    console.log(`  ${p.label}: $${p.pricePerUnit.toFixed(2)}/unit`);
  }

  // TODO: Open a UI dialog so the player can pick items and quantities.
  // For now, use the inventory player-get-items call to find minerals in the player's inventory
  // and sell all of them as a proof-of-concept.
  const sellLines: { itemIdentifier: string; itemIds: number[]; quantity: number }[] = [];

  for (const price of prices) {
    const hashKey = GetHashKey(price.itemIdentifier);
    const matches: UI.Inventory.ItemData[] = await awaitUI('inventory.player-get-items', hashKey);
    for (const data of matches) {
      if (data.quantity > 0) {
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
    emitUINotify('No minerals found in inventory.', 'error');
    return;
  }

  const result = await bankController.sellMinerals(characterId, bankId, sellLines);

  if (result.success) {
    console.log(`[Banking] Sold minerals for $${result.payout.toFixed(2)}. Bank budget remaining: $${result.budgetRemaining.toFixed(2)}`);
    emitUINotify(`Sold minerals for $${result.payout.toFixed(2)}.`, 'success');
  } else {
    console.log(`[Banking] Mineral sale failed: ${result.message}`);
  }
});
