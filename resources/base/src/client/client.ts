import { exports } from '@lib/client';
import { Delay } from '@lib/functions';

import './blip-setup';
import './door-register';
import './characterData';

const getNetworkControlOfEntity: Base.getNetworkControlOfEntity = async (entity) => {
  do {
    NetworkRequestControlOfEntity(entity);
    await Delay(5);
  } while (!NetworkHasControlOfEntity(entity));
};

const deleteEntity: Base.deleteEntity = async (entity: number): Promise<void> => {
  if (!DoesEntityExist(entity)) {
    return;
  }
  if (NetworkGetEntityIsNetworked(entity)) {
    await getNetworkControlOfEntity(entity);
  }

  await Delay(5);
  SetEntityAsMissionEntity(entity, true, true);

  await Delay(5);
  if (IsEntityAPed(entity)) {
    DeletePed(entity);
  }

  await Delay(5);
  // console.log(`DeleteEntity(${entity})`);
  DeleteEntity(entity);

  await Delay(10);
  if (DoesEntityExist(entity)) {
    SetEntityAsMissionEntity(entity, false, false);

    await Delay(5);
    SetEntityCoords(entity, -10000.0, -10000.0, 0.0, false, false, false, false);
  }
};

const deleteEntities: Base.deleteEntities = (entities: number[]): void => {
  for (const entity of entities) {
    deleteEntity(entity);
  }
};

exports<'base'>('getNetworkControlOfEntity', getNetworkControlOfEntity);
exports<'base'>('deleteEntity', deleteEntity);
exports<'base'>('deleteEntities', deleteEntities);
