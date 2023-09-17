import { exports } from '@lib/client';
import { paletteManager } from '../managers/palette-manager';
import { componentManager } from '../managers/component-manager';

const getGuidsAtIndex: Customization.GetGuidsAtIndex = (...args) => {
  return paletteManager.getGuidsAtIndex(...args);
};

const getDrawableAtIndex: Customization.GetDrawableAtIndex = (...args) => {
  return paletteManager.getDrawableAtIndex(...args);
};

const getAlbedoAtIndex: Customization.GetAlbedoAtIndex = (...args) => {
  return paletteManager.getAlbedoAtIndex(...args);
};

const getNormalAtIndex: Customization.GetNormalAtIndex = (...args) => {
  return paletteManager.getNormalAtIndex(...args);
};

const getMaterialAtIndex: Customization.GetMaterialAtIndex = (...args) => {
  return paletteManager.getMaterialAtIndex(...args);
};

const getTintAtIndex: Customization.GetTintAtIndex = (...args) => {
  return paletteManager.getTintAtIndex(...args);
};

const getPaletteAtIndex: Customization.GetPaletteAtIndex = (...args) => {
  return paletteManager.getPaletteAtIndex(...args);
};

const getTint0AtIndex: Customization.GetTint0AtIndex = (...args) => {
  return paletteManager.getTint0AtIndex(...args);
};

const getTint1AtIndex: Customization.GetTint1AtIndex = (...args) => {
  return paletteManager.getTint1AtIndex(...args);
};

const getTint2AtIndex: Customization.GetTint2AtIndex = (...args) => {
  return paletteManager.getTint2AtIndex(...args);
};

const getIndexForDrawable: Customization.GetIndexForDrawable = (...args) => {
  return paletteManager.getIndexForDrawable(...args);
};

const getTintForDrawable: Customization.GetTintForDrawable = (...args) => {
  return paletteManager.getTintForDrawable(...args);
};

const getIndexForCategory: Customization.GetIndexForCategory = (...args) => {
  return paletteManager.getIndexForCategory(...args);
};

const getTintForCategory: Customization.GetTintForCategory = (...args) => {
  return paletteManager.getTintForCategory(...args);
};

const setTintAtIndex: Customization.SetTintAtIndex = (...args) => {
  return paletteManager.setTintAtIndex(...args);
};

const setTint: Customization.SetTint = (...args) => {
  return paletteManager.setTint(...args);
};

const removeTint: Customization.RemoveTint = (...args) => {
  return paletteManager.removeTint(...args);
};

const removeTintByindex: Customization.RemoveTintByIndex = (...args) => {
  return paletteManager.removeTintByIndex(...args);
};

const removeTintByCategory: Customization.RemoveTintByCategory = (...args) => {
  return paletteManager.removeTintByCategory(...args);
};

const setTintByCategory: Customization.SetTintByCategory = (...args) => {
  return paletteManager.setTintByCategory(...args);
};

const setTintByDrawable: Customization.SetTintByDrawable = (...args) => {
  return paletteManager.setTintByDrawable(...args);
};

const getHorseDrawableAtIndex: Customization.GetHorseDrawableAtIndex = (...args) => {
  return paletteManager.getHorseDrawableAtIndex(...args);
};

const getIndexForHorsePart: Customization.GetIndexForHorsePart = (...args) => {
  return paletteManager.getIndexForHorsePart(...args);
};

const setTintByHorsePart: Customization.SetTintByHorsePart = (...args) => {
  return paletteManager.setTintByHorsePart(...args);
};

const equipItems: Customization.EquipItems = (...args) => {
  return componentManager.equipItems(...args);
};

exports<'customization'>('getGuidsAtIndex', getGuidsAtIndex);
exports<'customization'>('getDrawableAtIndex', getDrawableAtIndex);
exports<'customization'>('getAlbedoAtIndex', getAlbedoAtIndex);
exports<'customization'>('getNormalAtIndex', getNormalAtIndex);
exports<'customization'>('getMaterialAtIndex', getMaterialAtIndex);
exports<'customization'>('getTintAtIndex', getTintAtIndex);
exports<'customization'>('getPaletteAtIndex', getPaletteAtIndex);
exports<'customization'>('getTint0AtIndex', getTint0AtIndex);
exports<'customization'>('getTint1AtIndex', getTint1AtIndex);
exports<'customization'>('getTint2AtIndex', getTint2AtIndex);
exports<'customization'>('getIndexForDrawable', getIndexForDrawable);
exports<'customization'>('getTintForDrawable', getTintForDrawable);
exports<'customization'>('getIndexForCategory', getIndexForCategory);
exports<'customization'>('getTintForCategory', getTintForCategory);
exports<'customization'>('setTintAtIndex', setTintAtIndex);
exports<'customization'>('setTint', setTint);
exports<'customization'>('removeTint', removeTint);
exports<'customization'>('removeTintByIndex', removeTintByindex);
exports<'customization'>('removeTintByCategory', removeTintByCategory);
exports<'customization'>('setTintByCategory', setTintByCategory);
exports<'customization'>('setTintByDrawable', setTintByDrawable);
exports<'customization'>('getHorseDrawableAtIndex', getHorseDrawableAtIndex);
exports<'customization'>('getIndexForHorsePart', getIndexForHorsePart);
exports<'customization'>('setTintByHorsePart', setTintByHorsePart);
exports<'customization'>('equipItems', equipItems);
