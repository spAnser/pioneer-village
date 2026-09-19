// Inventory.Restrictions
enum Restrictions {
  None = 0,
  Tiny = 1,
  Small = 2,
  Food = 4,
  Ammo = 8,
  Clothing = 16,
  Bird = 32,
}

const InventoryTypes: Record<string, Inventory.Type> = {
  _WORLD_: {
    slots: 32,
    maxWeight: Infinity,
    restrictions: Restrictions.None,
  },
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
    restrictions: Restrictions.None,
  },
  stash: {
    slots: 64,
    maxWeight: 500,
    restrictions: Restrictions.None,
  },
  safetybox: {
    slots: 8,
    maxWeight: 100,
    restrictions: Restrictions.None,
  },
  paperBag: {
    slots: 8,
    maxWeight: 6,
    restrictions: Restrictions.Tiny + Restrictions.Small,
  },
  // Character bird slots
  birds: {
    slots: 4,
    maxWeight: Infinity,
    restrictions: Restrictions.Bird,
  },
  // Bird letter slots
  bird: {
    slots: 1,
    maxWeight: Infinity,
    restrictions: Restrictions.Tiny,
  },
  // Envelope slots
  envelope: {
    slots: 5,
    maxWeight: Infinity,
    restrictions: Restrictions.Tiny,
  },
};

export default InventoryTypes;
