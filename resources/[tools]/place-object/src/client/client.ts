import './helpers';

import { exports, PVInit, PVPrompt } from '@lib/client';

import PlacementManager from './managers/placement-manager';

const placementManager = PlacementManager.getInstance();

RegisterCommand(
  'placeObject',
  async (source: number, args: string[]) => {
    const objects = await placementManager.queuePlaceObject(GetHashKey(args[0]), Number(args[1] || 1));
    console.log('done placing objects');
    console.log([...objects]);
  },
  false,
);

RegisterCommand(
  'placeObjects',
  async (source: number, args: string[]) => {
    const allObjects = [];
    for (const arg of args) {
      allObjects.push(...(await placementManager.queuePlaceObject(GetHashKey(arg))));
    }
    console.log('done placing objects');
    console.log(allObjects);
  },
  false,
);

const placeObject: PlaceObject.placeObject = async (model, amount = 1, groundOnly = true) => {
  return await placementManager.queuePlaceObject(GetHashKey(model), amount, groundOnly);
};

const placeObjectAdvanced: PlaceObject.placeObjectAdvanced = async (
  { model, amount = 1, uprightLimit = 1.0, subItems = [] }: PlaceObject.Advanced,
  groundOnly = true,
  cb = undefined,
) => {
  const objects = await placementManager.queuePlaceObjectAdv(
    GetHashKey(model),
    amount,
    uprightLimit,
    subItems,
    groundOnly,
  );
  return objects;
};

const placeObjects: PlaceObject.placeObjects = async (objects, cb = undefined) => {
  const allObjects = [];
  for (const obj of objects) {
    allObjects.push(...(await placementManager.queuePlaceObject(obj.model, obj.amount, obj.groundOnly)));
  }
  return allObjects;
};

exports<'place-object'>('placeObject', placeObject);

exports<'place-object'>('placeObjectAdvanced', placeObjectAdvanced);

exports<'place-object'>('placeObjects', placeObjects);

const registerPrompts = async () => {
  await PVInit.initializedResource('prompts');
  console.log('place-object: registering prompts');
  PVPrompt.registerWithEvent('createHold', 'place-object::place', 0xcefd9220, 'Place Object');

  PVPrompt.registerWithEvent('createHold', 'place-object::ground', 0x760a9c6f, 'Un-Ground');

  PVPrompt.registerWithEvent('createHold', 'place-object::cancel', 0xde794e3e, 'Cancel');
};

on('onResourceStart', (resource: string) => {
  if (resource === 'prompts') {
    registerPrompts();
  }
});

if (GetResourceState('prompts') === 'started') {
  registerPrompts();
}
