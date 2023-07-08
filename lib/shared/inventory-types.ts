// Inventory.Restrictions
enum Restrictions {
  None = 0,
  OnlySmall = 1,
  OnlyFood = 2,
  OnlyAmmo = 4,
}

const InventoryTypes: Record<string, Inventory.Type> = {
  DEFAULT: {
    slots: 16,
    maxWeight: 50,
    restrictions: Restrictions.None,
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
    restrictions: Restrictions.OnlySmall,
  },
  stash: {
    slots: 64,
    maxWeight: 500,
    restrictions: Restrictions.None,
  },
  paperBag: {
    slots: 8,
    maxWeight: 6,
    restrictions: Restrictions.OnlySmall,
  },
};

export default InventoryTypes;
