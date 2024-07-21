import Blips, { BlipColors } from './data/blips';

const createdBlips: Set<number> = new Set();

const createBlip = (blip: Base.BlipData) => {
  const blipId = BlipAddForCoords(1664425300, blip.coords.x, blip.coords.y, blip.coords.z);
  createdBlips.add(blipId);
  SetBlipSprite(blipId, blip.sprite, true);
  if (blip.color) {
    BlipAddModifier(blipId, blip.color);
  } else {
    BlipAddModifier(blipId, BlipColors.WHITE);
  }
  // TODO: Update to SetBlipName ???
  // SetBlipNameFromPlayerString(blipId, blip.name);
  SetBlipName(blipId, blip.name);
};

setTimeout(() => {
  for (const blip of Blips) {
    createBlip(blip);
  }
}, 5e3);

on('onResourceStop', (resourceName: string) => {
  if (resourceName === 'base') {
    for (const blipId of createdBlips) {
      RemoveBlip(blipId);
    }
  }
});
