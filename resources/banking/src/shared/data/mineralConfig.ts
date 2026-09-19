// Base price per unit for each mineral. Actual prices are scaled by the bank's
// priceMultiplier, which decays after large purchase events and recovers hourly.
export interface MineralDefinition {
  itemIdentifier: string;
  label: string;
  basePricePerUnit: number;
}

export const MINERALS: MineralDefinition[] = [
  { itemIdentifier: 'PV_GOLD_NUGGET', label: 'Gold Nugget',  basePricePerUnit: 45  },
  { itemIdentifier: 'PV_SILVER_ORE',  label: 'Silver Ore',   basePricePerUnit: 18  },
  { itemIdentifier: 'PV_DIAMOND',     label: 'Diamond',       basePricePerUnit: 120 },
  { itemIdentifier: 'PV_RUBY',        label: 'Ruby',          basePricePerUnit: 95  },
  { itemIdentifier: 'PV_EMERALD',     label: 'Emerald',       basePricePerUnit: 80  },
];

// Daily purchasing budget (dollars) each bank can spend before it runs dry.
// Resets at midnight server time.
export const DAILY_BUDGET_BY_BANK: Record<string, number> = {
  'valentine':   3000,
  'rhodes':      4000,
  'blackwater':  6000,
  'saint-denis': 12000,
  'annesburg':   2500,
  'strawberry':  2000,
  'tumbleweed':  1500,
};

// How much the price multiplier drops per dollar spent (relative to daily limit).
// e.g. spending 10% of daily budget in one sale drops multiplier by PRICE_DECAY_PER_PCT * 10.
export const PRICE_DECAY_PER_PCT = 0.005;

// Minimum multiplier floor — prices never drop below this fraction of base.
export const PRICE_MULTIPLIER_MIN = 0.5;

// How much the multiplier recovers each hour (additive).
export const PRICE_RECOVERY_PER_HOUR = 0.02;
