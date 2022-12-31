import { Socket } from 'socket.io-client';

import UIComponent from '@uiLib/ui-component';
import { emitClient, onClient, onClientCall } from '@lib/ui';

import { Characters, CreateCharacter, CharacterLabel } from './styled';

export default class CharacterSelect extends UIComponent<UI.BaseProps, UI.CharacterSelect.State, {}> {
  constructor(
    props: UI.BaseProps,
    context: { socket: Socket<UISocketEvents, SocketServer.Client & SocketServer.ClientEvents> },
  ) {
    super();

    this.state = {
      show: false,
      characters: [],
    };

    onClient('character-select.state', (state) => {
      this.setState(state);
    });

    onClientCall('getCharacters', () => {
      return new Promise((resolve) => {
        context.socket.emit('getCharacters', (characters) => {
          resolve(characters);
        });
      });
    });

    onClientCall('createCharacter', (character, face) => {
      return new Promise((resolve) => {
        context.socket.emit('createCharacter', character, face, () => {
          resolve();
        });
      });
    });
  }

  onEvent(event: UI.CharacterSelect.Event) {
    this.setState(event);
  }

  characterStyle(character: UI.CharacterSelect.CharacterData) {
    if (!character.pos) {
      return {};
    }
    return {
      position: 'fixed',
      top: `${character.pos.y * 100}%`,
      left: `${character.pos.x * 100}%`,
    };
  }

  chooseCharacter(characterId: number) {
    this.setState({ show: false });
    emitClient('character-select.choose', characterId);
    this.context.socket.emit('character-select.choose', characterId);
  }

  createCharacter() {
    this.setState({ show: false });
    emitClient('character-select.create');
    console.log('character-select.create');
  }

  render() {
    return (
      <>
        {this.state.show && (
          <>
            <Characters>
              {this.state.characters.map((character) => {
                return (
                  <CharacterLabel
                    style={this.characterStyle(character)}
                    className={character.pos ? 'positioned' : ''}
                    onClick={() => this.chooseCharacter(character.id)}
                  >
                    {character.firstName} {character.lastName}
                  </CharacterLabel>
                );
              })}
            </Characters>
            <CreateCharacter onClick={this.createCharacter.bind(this)}>Create Character</CreateCharacter>
          </>
        )}
      </>
    );
  }
}
