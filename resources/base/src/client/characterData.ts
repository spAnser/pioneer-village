import { Log, onUI } from '@lib/client/comms/ui';
import { exports } from '@lib/client';

let character: CharacterData | null = null;

onUI('character-client-update.getCharacter', (pCharacter) => {
  character = JSON.parse(pCharacter) as CharacterData;
  // Log('character-client-update.getCharacter', character);
});

onUI('character-client-update.updateAttribute', (attribute, newVal) => {
  if (!character) return;
  (character[attribute] as any) = newVal;

  // Log(
  //   'character-client-update.updateAttribute',
  //   attribute,
  //   typeof newVal === 'object' ? JSON.stringify(newVal, null, 2) : newVal,
  // );
});

const getCurrentCharacter = (): CharacterData | null => {
  return character;
};

exports<'base'>('getCurrentCharacter', getCurrentCharacter);
