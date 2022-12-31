import { DrawTxt, emitUI, focusUI, PVBase, PVGame, PVPlaceObject, PVPrompt, zoneBoxSetup } from '@lib/client';
import saloonController from './controllers/saloon-controller';
import { Delay } from '@lib/functions';

global.playerPed = PlayerPedId();

RegisterCommand(
  'saloonTest',
  async () => {
    const objects = await PVPlaceObject.placeObject('P_BOTTLEBEER03X', 3);
  },
  false,
);

// TODO: Ask Plouffe about this
// zoneBoxSetup({
//   name: 'saloon:valentine:dining',
//   minZ: 118.0,
//   maxZ: 123.275,
//   coords: [
//     { x: -302.075, y: 799.85 },
//     { x: -313.15, y: 797.875 },
//     { x: -315.95, y: 813.1 },
//     { x: -304.75, y: 815.075 },
//   ],
//   onEnter() {
//     console.log('Entered saloon:valentine:dining');
//   },
//   onExit() {
//     console.log('Exited saloon:valentine:dining');
//   },
// });
//
// zoneBoxSetup({
//   name: 'saloon:valentine:bartending',
//   minZ: 118.0,
//   maxZ: 119.5,
//   coords: [
//     { x: -313.40609741211, y: 808.71539306641 },
//     { x: -312.7209777832, y: 804.50512695313 },
//     { x: -313.91357421875, y: 804.23004150391 },
//     { x: -314.35192871094, y: 808.02435302734 },
//   ],
//   onEnter() {
//     console.log('Entered saloon:valentine:bartending');
//   },
//   onExit() {
//     console.log('Exited saloon:valentine:bartending');
//   },
// });

const holdInteractions = [
  GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-55_H18_Neck_A8_B1-8_HOLD'),
  GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-55_H18_Neck_A8_B1-8_TABLE_HOLD'),
  GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-3_H30-5_Neck_A13_B2-5_HOLD'),
  GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-3_H30-5_Neck_A13_B2-5_TABLE_HOLD'),
];

const drinkInteractions = [
  GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-55_H18_Neck_A8_B1-8_CHUG_A'),
  GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-55_H18_Neck_A8_B1-8_CHUG_B'),
  GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-55_H18_Neck_A8_B1-8_CHUG_C'),
  GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-55_H18_Neck_A8_B1-8_TABLE_CHUG_A'),
  GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-3_H30-5_Neck_A13_B2-5_CHUG_A'),
  GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-3_H30-5_Neck_A13_B2-5_CHUG_B'),
  GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-3_H30-5_Neck_A13_B2-5_CHUG_C'),
  GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-3_H30-5_Neck_A13_B2-5_TABLE_CHUG_A'),
];

const drinkTransitionInteractions = [
  GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-55_H18_Neck_A8_B1-8_CHUG_TRANS'),
  GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-55_H18_Neck_A8_B1-8_TABLE_CHUG_TRANS'),
  GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-3_H30-5_Neck_A13_B2-5_CHUG_TRANS'),
  GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-3_H30-5_Neck_A13_B2-5_TABLE_CHUG_TRANS'),
];

/*
DRINK_CHAMPAGNE_HOLD

DRINK_CHAMPAGNE_DRINK

DRINK_COFFEE_HOLD

DRINK_COFFEE_DRINK

DRINK_COFFEE_PUT_AWAY
DRINK_COFFEE_PUT_AWAY_KNEELING

EAT_STEW_BOWL_BASE
EAT_STEW_BOWL_CHAIR_BASE
EAT_STEW_BOWL_TABLE_BASE

EAT_STEW_BOWL_EAT_FINISH_DISCARD
EAT_STEW_BOWL_CHAIR_EAT_FINISH_DISCARD
EAT_STEW_BOWL_TABLE_EAT_FINISH_HOLD

EAT_STEW_BOWL_EAT_TRANS
EAT_STEW_BOWL_CHAIR_EAT_TRANS
EAT_STEW_BOWL_TABLE_EAT_TRANS
 */

const pickupItem = async (entityId: number, networkId: number) => {
  console.log('pickupItem', entityId, networkId);

  const propId = GetHashKey('P_BOTTLEBEER01X_PH_R_HAND');
  const itemInteractionState = GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-55_H18_Neck_A8_B1-8_UNCORK');

  RemovePedBlackboardBool(playerPed, 'GENERIC_ALCOHOL_BLOCK_CHUG_A');
  RemovePedBlackboardBool(playerPed, 'GENERIC_ALCOHOL_BLOCK_CHUG_B');
  RemovePedBlackboardBool(playerPed, 'GENERIC_ALCOHOL_BLOCK_CHUG_C');

  TaskItemInteraction_2(
    playerPed,
    GetHashKey('CONSUMABLE_SALOON_BEER'),
    entityId,
    propId,
    itemInteractionState,
    1,
    0,
    -1.0,
  );
};

const pickupModel = new Set();
pickupModel.add(GetHashKey('P_BOTTLEBEER03X'));

RegisterCommand(
  'placeBeer',
  async () => {
    const objects = await PVPlaceObject.placeObjectAdvanced({ model: 'P_BOTTLEBEER03X', uprightLimit: 0.25 });
    for (const object of objects) {
      const networkId = NetworkGetNetworkIdFromEntity(object);
      if (!networkId) {
        continue;
      }
      TaskCarriable(object, `USABLE_ITEM`, 0, 0, 4);
      PVPrompt.register(
        () => pickupItem(object, networkId),
        'createHold',
        `saloon:pickup-beer:${networkId}`,
        GetHashKey('INPUT_PICKUP_CARRIABLE'),
        'Pickup Beer',
      );
      PVPrompt.addToEntity(`saloon:pickup-beer:${networkId}`, object);
    }
  },
  false,
);

on('events_manager:itemInteraction', async (state: boolean, interactionHash: number, entity: number) => {
  console.log('events_manager:itemInteraction', state, interactionHash, entity);
  if (holdInteractions.includes(interactionHash)) {
    saloonController.holdingDrink(entity);
    saloonController.endDrinking();
  } else if (drinkInteractions.includes(interactionHash)) {
    if (state) {
      await Delay(850);
      saloonController.startDrinking();
    } else {
      saloonController.endDrinking();
    }
  } else if (drinkTransitionInteractions.includes(interactionHash)) {
    saloonController.endDrinking();
  }
});

// SetPedBlackboardBool(playerPed, 'MP_Style_Default', false, -1);
// SetPedBlackboardBool(playerPed, 'MP_Style_Casual', false, -1);
// SetPedBlackboardBool(playerPed, 'MP_Style_Crazy', false, -1);
// SetPedBlackboardBool(playerPed, 'MP_Style_Flamboyant', false, -1);
// SetPedBlackboardBool(playerPed, 'MP_Style_Gunslinger', false, -1);
// SetPedBlackboardBool(playerPed, 'MP_Style_Refined', false, -1);
// SetPedBlackboardBool(playerPed, 'MP_Style_SilentType', false, -1);
// SetPedBlackboardBool(playerPed, 'MP_Style_Greenhorn', false, -1);
// SetPedBlackboardBool(playerPed, 'MP_Style_Veteran', false, -1);
// SetPedBlackboardBool(playerPed, 'MP_Style_EasyRider', false, -1);
// SetPedBlackboardBool(playerPed, 'MP_Style_Drunk', false, -1);
// SetPedBlackboardBool(playerPed, 'MP_Style_Inquisitive', false, -1);
// SetPedBlackboardBool(playerPed, 'MP_Style_Casual', false, -1);

// SetPedBlackboardBool(playerPed, 'Stealth', false, -1);

// setTick(() => {
//   SetPedIsDrunk(playerPed, true);
//   SetPedDrunkness(playerPed, true, 0.99);
//   SetPedBlackboardBool(playerPed, 'IsDrunk', true, -1);
//   SetPedBlackboardFloat(playerPed, 'Drunkness', 0.99, -1);
//
//   SetPedIsDrunk(2947586, true);
//   SetPedDrunkness(2947586, true, 0.99);
//   SetPedBlackboardBool(2947586, 'IsDrunk', true, -1);
//   SetPedBlackboardFloat(2947586, 'Drunkness', 0.99, -1);
//
//   SetPedIsDrunk(873986, true);
//   SetPedDrunkness(873986, true, 0.99);
//   SetPedBlackboardBool(873986, 'IsDrunk', true, -1);
//   SetPedBlackboardFloat(873986, 'Drunkness', 0.99, -1);
// });

RegisterCommand(
  'bb_bool',
  async (src: number, args: string[]) => {
    const name = args[0];
    const value = args[1] === 'true';
    SetPedBlackboardBool(playerPed, name, value, -1);
    await Delay(5000);
    RemovePedBlackboardBool(playerPed, name);
    console.log('removed');
  },
  false,
);

RegisterCommand(
  'bb_float',
  async (src: number, args: string[]) => {
    const name = args[0];
    const value = Number(args[1]);
    SetPedBlackboardFloat(playerPed, name, value, -1);
    await Delay(5000);
    RemovePedBlackboardFloat(playerPed, name);
    console.log('removed');
  },
  false,
);

RegisterCommand(
  'bb_int',
  async (src: number, args: string[]) => {
    const name = args[0];
    const value = Number(args[1]);
    SetPedBlackboardInt(playerPed, name, value, -1);
    await Delay(5000);
    RemovePedBlackboardInt(playerPed, name);
    console.log('removed');
  },
  false,
);

RegisterCommand(
  'bb_hash',
  async (src: number, args: string[]) => {
    const name = args[0];
    const value = args[1];
    SetPedBlackboardHash(playerPed, name, value, -1);
    await Delay(5000);
    RemovePedBlackboardHash(playerPed, name);
    console.log('removed');
  },
  false,
);
