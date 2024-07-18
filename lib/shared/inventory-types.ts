// Inventory.Restrictions
enum Restrictions {
  None = 0,
  Small = 1,
  Food = 2,
  Ammo = 4,
  Clothing = 8,
}

const InventoryTypes: Record<string, Inventory.Type> = {
  DEFAULT: {
    slots: 16,
    maxWeight: 50,
    restrictions: Restrictions.None,
  },
  clothing: {
    slots: 12,
    maxWeight: 40,
    restrictions: Restrictions.Clothing,
  },
  character: {
    slots: 48,
    maxWeight: 70,
    restrictions: Restrictions.None,
  },
  wagon: {
    slots: 48,
    maxWeight: 500,
    restrictions: Restrictions.None,
  },
  horse: {
    slots: 24,
    maxWeight: 100,
    restrictions: Restrictions.Small,
  },
  stash: {
    slots: 64,
    maxWeight: 500,
    restrictions: Restrictions.None,
  },
  paperBag: {
    slots: 8,
    maxWeight: 6,
    restrictions: Restrictions.Small,
  },
};

export default InventoryTypes;
