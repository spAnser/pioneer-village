class SaloonController {
  protected static instance: SaloonController;

  static getInstance(): SaloonController {
    if (!SaloonController.instance) {
      SaloonController.instance = new SaloonController();
    }
    return SaloonController.instance;
  }

  drinks: Map<number, number> = new Map();
  currentDrink: number = 0;
  isDrinking: boolean = false;
  startingDrinkingAt: number = 0;

  holdingDrink(entity: number) {
    if (!this.drinks.has(entity)) {
      this.drinks.set(entity, 0);
    }
    this.currentDrink = entity;
  }

  startDrinking() {
    this.isDrinking = true;
    this.startingDrinkingAt = GetGameTimer();
  }

  async endDrinking() {
    if (!this.isDrinking) {
      return;
    }
    this.isDrinking = false;
    const endDrinkingAt = GetGameTimer();
    let timeDrinking = endDrinkingAt - this.startingDrinkingAt;

    let totalDrinkingTime = this.drinks.get(this.currentDrink) ?? 0;

    if (totalDrinkingTime + timeDrinking > 5250) {
      timeDrinking = 5250 - totalDrinkingTime;
    }

    totalDrinkingTime += timeDrinking;
    this.drinks.set(this.currentDrink, totalDrinkingTime);
    console.log('time drinking: ' + timeDrinking);
    console.log('total drinking: ', totalDrinkingTime);

    const drinkPercent = timeDrinking / 5250;
    emit('saloon::client::add-to-alcohol-content', drinkPercent * 0.2);

    if (totalDrinkingTime >= 5250) {
      SetPedBlackboardBool(playerPed, 'GENERIC_ALCOHOL_BLOCK_CHUG_A', true, -1);
      SetPedBlackboardBool(playerPed, 'GENERIC_ALCOHOL_BLOCK_CHUG_B', true, -1);
      SetPedBlackboardBool(playerPed, 'GENERIC_ALCOHOL_BLOCK_CHUG_C', true, -1);
      // const itemInteractionState = GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-55_H18_Neck_A8_B1-8_DISCARD');
      // TaskItemInteraction(playerPed, GetHashKey('p_bottlebeer01x_ph_r_hand'), itemInteractionState, 1, 0, -1.0);
      // PVBase.deleteEntity(this.currentDrink);
    }
  }
}

const saloonController = SaloonController.getInstance();

export default saloonController;
