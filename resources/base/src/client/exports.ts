import { exports } from '@lib/client';
import { onUI } from '@lib/client/comms/ui';
import { Delay } from '@lib/functions';

import blipController from './controllers/blip-controller';

// Character data management
let character: CharacterData | null = null;

onUI('character-client-update.getCharacter', (pCharacter) => {
  character = JSON.parse(pCharacter) as CharacterData;
  // console.log('character-client-update.getCharacter', character);
});

onUI('character-client-update.updateAttribute', (attribute, newVal) => {
  if (!character) return;
  (character[attribute] as any) = newVal;

  // console.log(
  //   'character-client-update.updateAttribute',
  //   attribute,
  //   typeof newVal === 'object' ? JSON.stringify(newVal, null, 2) : newVal,
  // );
});

const getCurrentCharacter = (): CharacterData | null => {
  return character;
};

// Entity management functions
const getNetworkControlOfEntity: Base.getNetworkControlOfEntity = async (entity) => {
  do {
    NetworkRequestControlOfEntity(entity);
    await Delay(5);
  } while (!NetworkHasControlOfEntity(entity));
};

const deleteEntity: Base.deleteEntity = async (entity: number, attached?: boolean): Promise<void> => {
  if (!DoesEntityExist(entity)) {
    console.log(`Entity doesn't exist ${entity}`);
    return;
  }
  if (NetworkGetEntityIsNetworked(entity)) {
    console.log(`Requesting control ${entity}`);
    await getNetworkControlOfEntity(entity);
  }

  const attachedEntity = GetEntityAttachedTo(entity);
  if (attachedEntity) {
    DetachEntity(entity, true, false);
  }

  if (attached) {
    const itemSet = CreateItemset(true);
    FindAllAttachedCarriableEntities(entity, itemSet);
    const itemSetSize = GetItemsetSize(itemSet);
    for (let i = 0; i < itemSetSize; i++) {
      const attachedEntity = GetIndexedItemInItemset(i, itemSet);
      if (DoesEntityExist(attachedEntity)) {
        DetachEntity(attachedEntity, true, false);
        SetEntityAsMissionEntity(attachedEntity, true, true);
        DeleteEntity(attachedEntity);
      }
    }
  }

  await Delay(5);
  SetEntityAsMissionEntity(entity, true, true);

  // await Delay(5);
  // if (IsEntityAPed(entity)) {
  //   console.log(`DeletePed(${entity})`);
  //   DeletePed(entity);
  // }
  //
  // await Delay(5);
  // if (IsEntityAnObject(entity)) {
  //   console.log(`DeleteObject(${entity})`);
  //   DeleteObject(entity);
  // }
  //
  // if (!DoesEntityExist(entity)) {
  //   console.log(`Entity doesn't exist ${entity}`);
  //   return;
  // }

  await Delay(5);
  console.log(`DeleteEntity(${entity})`);
  DeleteEntity(entity);

  await Delay(10);
  if (DoesEntityExist(entity)) {
    console.log(`Entity Still exists: ${entity}`);
    SetEntityAsMissionEntity(entity, false, false);

    await Delay(5);
    SetEntityCoords(entity, -10000.0, -10000.0, 0.0, false, false, false, false);
  }
};

const deleteEntities: Base.deleteEntities = (entities: number[], attached = false): void => {
  for (const entity of entities) {
    deleteEntity(entity, attached);
  }
};

const blipRegister: Base.blipRegister = (id, data, constraints) => {
  return blipController.register(id, GetInvokingResource(), data, constraints);
};

const blipUnregister: Base.blipUnregister = (id) => {
  blipController.unregister(id);
};

const blipUpdateCoords: Base.blipUpdateCoords = (id, coords) => {
  blipController.updateCoords(id, coords);
};

const blipUpdateSprite: Base.blipUpdateSprite = (id, sprite) => {
  blipController.updateSprite(id, sprite);
};

const blipGetHandle: Base.blipGetHandle = (id) => {
  return blipController.getHandle(id);
};

const blipUpdateLabel: Base.blipUpdateLabel = (id, label) => {
  blipController.updateLabel(id, label);
};

const blipAddModifier: Base.blipAddModifier = (id: string, modifier: number) => {
  blipController.addModifier(id, modifier);
};

const blipRemoveModifier: Base.blipRemoveModifier = (id: string, modifier: number) => {
  blipController.removeModifier(id, modifier);
};

// Register all exports
exports<'base'>('getCurrentCharacter', getCurrentCharacter);
exports<'base'>('getNetworkControlOfEntity', getNetworkControlOfEntity);
exports<'base'>('deleteEntity', deleteEntity);
exports<'base'>('deleteEntities', deleteEntities);
exports<'base'>('blipRegister', blipRegister);
exports<'base'>('blipGetHandle', blipGetHandle);
exports<'base'>('blipUpdateCoords', blipUpdateCoords);
exports<'base'>('blipUpdateSprite', blipUpdateSprite);
exports<'base'>('blipUpdateLabel', blipUpdateLabel);
exports<'base'>('blipAddModifier', blipAddModifier);
exports<'base'>('blipRemoveModifier', blipRemoveModifier);
exports<'base'>('blipUnregister', blipUnregister);
