import ItemPlacer from '../item-placer';

export default class PlacementManager {
  protected static instance: PlacementManager;

  static getInstance(): PlacementManager {
    if (!PlacementManager.instance) {
      PlacementManager.instance = new PlacementManager();
    }
    return PlacementManager.instance;
  }

  curId = 0;

  isPlacingItem = false;
  itemPlacers: Map<number, ItemPlacer> = new Map();
  finishedPlacement: Map<number, Promise<number[]>> = new Map();

  constructor() {
    on('place-object::place::completed', this.promptPlaceHandler.bind(this));

    on('place-object::ground::completed', this.promptGroundHandler.bind(this));

    on('place-object::cancel::completed', this.promptCancelHandler.bind(this));
  }

  promptPlaceHandler() {
    for (const [id, itemPlacer] of this.itemPlacers.entries()) {
      itemPlacer.promptPlaceHandler();
    }
  }

  promptGroundHandler() {
    for (const [id, itemPlacer] of this.itemPlacers.entries()) {
      itemPlacer.promptGroundHandler();
    }
  }

  promptCancelHandler() {
    for (const [id, itemPlacer] of this.itemPlacers.entries()) {
      itemPlacer.destroy();
    }
  }

  async handleQueue(): Promise<void> {
    if (!this.isPlacingItem && this.itemPlacers.size) {
      this.isPlacingItem = true;
      const firstKey = [...this.itemPlacers.keys()][0];
      this.itemPlacers.get(firstKey)?.start();
      await this.finishedPlacement.get(firstKey);
      this.itemPlacers.delete(firstKey);
      this.finishedPlacement.delete(firstKey);
      this.isPlacingItem = false;
      this.handleQueue();
    }
  }

  async queuePlaceObject(model: number, amount = 1, groundOnly = true): Promise<number[]> {
    const itemPlacer = new ItemPlacer(model, amount, groundOnly);
    this.itemPlacers.set(++this.curId, itemPlacer);
    this.finishedPlacement.set(this.curId, itemPlacer.finished);
    this.handleQueue();
    const items = await itemPlacer.finished;
    this.itemPlacers.delete(this.curId);
    return items;
  }

  async queuePlaceObjectAdv(
    model: number,
    amount = 1,
    uprightLimit: number,
    subItems: PlaceObject.SubItem[],
    groundOnly = true,
  ): Promise<number[]> {
    const itemPlacer = new ItemPlacer(model, amount, groundOnly);
    itemPlacer.uprightLimit = uprightLimit;
    itemPlacer.subItems = subItems;
    this.itemPlacers.set(++this.curId, itemPlacer);
    this.finishedPlacement.set(this.curId, itemPlacer.finished);
    this.handleQueue();
    const items = await itemPlacer.finished;
    this.itemPlacers.delete(this.curId);
    return items;
  }
}
