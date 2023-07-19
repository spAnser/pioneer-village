import { onUI } from '@lib/client/comms/ui';
import { exports } from '@lib/client';
let character: CharacterData | null = null;

onUI('character-client-update.getCharacter', (pCharacter) => {
  character = JSON.parse(pCharacter) as CharacterData;
  console.log('character-client-update.getCharacter', pCharacter);
});

onUI('character-client-update.updateAttribute', (attribute, newVal) => {
  if (!character) return;
  (character[attribute] as any) = newVal;

  console.log(
    'character-client-update.updateAttribute',
    attribute,
    typeof newVal === 'object' ? JSON.stringify(newVal) : newVal,
  );
});

const getCurrentCharacter = (): CharacterData | null => {
  return character;
};

exports<'base'>('getCurrentCharacter', getCurrentCharacter);
