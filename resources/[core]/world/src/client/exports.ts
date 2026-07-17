import { exports } from '@lib/client';

import ptfxManager from './managers/ptfx-manager';

export const startFxAtCoords: World.StartFxAtCoords = async (
  id,
  looped,
  dict,
  name,
  coords,
  rot,
  scale,
  ignoreDistance = false,
) => {
  return ptfxManager.startFxAtCoords(id, looped, dict, name, coords, rot, scale, ignoreDistance);
};

export const startFxOnEntity: World.StartFxOnEntity = async (id, looped, dict, name, entity, offset, rot, scale) => {
  return ptfxManager.startFxOnEntity(id, looped, dict, name, entity, offset, rot, scale);
};

export const startFxOnEntityBone: World.StartFxOnEntityBone = async (
  id,
  looped,
  dict,
  name,
  entity,
  boneIndex,
  offset,
  rot,
  scale,
) => {
  return ptfxManager.startFxOnEntityBone(id, looped, dict, name, entity, boneIndex, offset, rot, scale);
};

export const startFxOnEntityBoneByName: World.StartFxOnEntityBoneByName = async (
  id,
  looped,
  dict,
  name,
  entity,
  boneName,
  offset,
  rot,
  scale,
) => {
  return ptfxManager.startFxOnEntityBoneByName(id, looped, dict, name, entity, boneName, offset, rot, scale);
};

export const startFxOnPedBone: World.StartFxOnPedBone = async (
  id,
  looped,
  dict,
  name,
  ped,
  boneIndex,
  offset,
  rot,
  scale,
) => {
  return ptfxManager.startFxOnPedBone(id, looped, dict, name, ped, boneIndex, offset, rot, scale);
};

export const startFxOnPedBoneByName: World.StartFxOnPedBoneByName = async (
  id,
  looped,
  dict,
  name,
  ped,
  boneName,
  offset,
  rot,
  scale,
) => {
  return ptfxManager.startFxOnPedBoneByName(id, looped, dict, name, ped, boneName, offset, rot, scale);
};

export const stopFx: World.StopPtfx = (id, removeNow = true) => {
  ptfxManager.stopFx(id, removeNow);
};

export const setFxEvolution: World.SetFxEvolution = (id, name, value) => {
  ptfxManager.setFxEvolution(id, name, value);
};

export const setFxEvolutions: World.SetFxEvolutions = (id, evolutions) => {
  ptfxManager.setFxEvolutions(id, evolutions);
};

exports<'world'>('startFxAtCoords', startFxAtCoords);
exports<'world'>('startFxOnEntity', startFxOnEntity);
exports<'world'>('startFxOnEntityBone', startFxOnEntityBone);
exports<'world'>('startFxOnEntityBoneByName', startFxOnEntityBoneByName);
// exports<'world'>('startFxOnPedBone', startFxOnPedBone);
// exports<'world'>('startFxOnPedBoneByName', startFxOnPedBoneByName);
exports<'world'>('stopFx', stopFx);
exports<'world'>('setFxEvolution', setFxEvolution);
exports<'world'>('setFxEvolutions', setFxEvolutions);
