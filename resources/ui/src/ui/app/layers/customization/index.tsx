import { Socket } from 'socket.io-client';

import UIComponent from '@uiLib/ui-component';
import { emitClient, LoadResourceJson, onClient } from '@lib/ui';

import { defaultOverlays } from './data';
import { Container, Modal, ModalTitle } from './styled';
import StyleColorSelector from './components/StyleColorSelector';
import { GenderSelect } from './components/Gender';
import TintSelector from './components/TintSelector';

const componentFiles = [
  '2886757168',
  'accessories',
  'ammo-pistols',
  'ammo-rifles',
  'aprons',
  'armor',
  'badges',
  'beards-chin',
  'beards-chops',
  'beards-complete',
  'beards-mustache',
  'belt-buckles',
  'belts',
  'bodies-lower',
  'bodies-upper',
  'boot-accessories',
  'boots',
  'chaps',
  'cloaks',
  'coats',
  'coats-closed',
  'dresses',
  'eyes',
  'eyewear',
  'gauntlets',
  'gloves',
  'gunbelt-accs',
  'gunbelts',
  'hair',
  'hair-accessories',
  'hats',
  'heads',
  'holsters-crossdraw',
  'holsters-knife',
  'holsters-left',
  'holsters-right',
  'horse-accessories',
  'horse-bedrolls',
  'horse-blankets',
  'horse-bridles',
  'horse-manes',
  'horse-mustache',
  'horse-saddlebags',
  'horse-saddles',
  'horse-shoes',
  'horse-tails',
  'jewelry-bracelets',
  'jewelry-rings-left',
  'jewelry-rings-right',
  'loadouts',
  'masks',
  'masks-large',
  'neckties',
  'neckwear',
  'pants',
  'ponchos',
  'saddle-horns',
  'saddle-lanterns',
  'saddle-stirrups',
  'satchels',
  'shirts-full',
  'skirts',
  'spats',
  'suspenders',
  'talisman-belt',
  'talisman-holster',
  'talisman-satchel',
  'talisman-wrist',
  'teeth',
  'vests',
];

const ComponentsData: Record<string, UI.Customization.ComponentJson[]> = {};

export default class Customization extends UIComponent<UI.BaseProps, UI.Customization.State, {}> {
  constructor(
    props: UI.BaseProps,
    context: { socket: Socket<UISocketEvents, SocketServer.Client & SocketServer.ClientEvents> },
  ) {
    super();

    this.state = {
      show: false,
      state: 'gender',
      components: {},
      model: '',
      gender: 'male',
      currentComponents: {
        boots: {
          style: -1,
          option: 0,
        },
        shirts: {
          style: -1,
          option: 0,
        },
      },
      hiddenComponents: {},
      currentFaceOptions: {},
      currentBodyOptions: {},
      currentOverlays: defaultOverlays,
      currentWhistle: {},
      firstName: '',
      lastName: '',
      dateOfBirth: {
        day: 1,
        month: 1,
        year: 1800,
      },
    };

    onClient('customization.state', (state) => {
      this.setState(state);
    });

    this.loadComponents();
  }

  async loadComponents() {
    for (const componentFile of componentFiles) {
      ComponentsData[componentFile] = (await LoadResourceJson(
        'rdr3-shared',
        `components-ui/${componentFile}.json`,
      )) as UI.Customization.ComponentJson[];
    }
  }

  onEvent(event: UI.Customization.Event) {
    this.setState(event);
  }

  setComponent(componentType: string, style: number, option: number) {
    console.log('component', componentType, style, option);
    this.setState({ currentComponents: { ...this.state.currentComponents, [componentType]: { style, option } } });
    const components = [];
    for (const [category, data] of Object.entries(this.state.currentComponents)) {
      if (data.style > -1) {
        const component = ComponentsData[category][data.style].components[data.option];
        components.push(component.component);
      }
    }
    console.log('customization.set-components', components);
    emitClient('customization.set-components', components);
  }

  handleHighlightGender(gender: 'male' | 'female', e: MouseEvent) {
    this.setState({ gender });
    emitClient('customization.highlight', gender);
  }

  handleChooseGender(e: MouseEvent) {
    console.log('handleChooseGender');
    emitClient('customization.choose-gender');
  }

  render() {
    return (
      <>
        {this.state.show && this.state.state === 'gender' && (
          <>
            <GenderSelect
              className={this.state.gender === 'male' ? 'active' : ''}
              style={{ left: 0 }}
              onMouseEnter={this.handleHighlightGender.bind(this, 'male')}
              onMouseDown={this.handleChooseGender.bind(this)}
            />
            <GenderSelect
              className={this.state.gender === 'female' ? 'active' : ''}
              style={{ right: 0 }}
              onMouseEnter={this.handleHighlightGender.bind(this, 'female')}
              onMouseDown={this.handleChooseGender.bind(this)}
            />
          </>
        )}
        {this.state.show && this.state.state === 'creation' && (
          <>
            <Modal>
              <ModalTitle>{`Information`}</ModalTitle>
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Last Name" />
              <input type="date" />
            </Modal>
          </>
        )}
        {this.state.show && this.state.state === 'tailor' && (
          <>
            <Modal>
              <ModalTitle>{`Clothes`}</ModalTitle>
              <StyleColorSelector
                label={`Boots`}
                onChange={(style, option) => this.setComponent('boots', style, option)}
                components={ComponentsData.boots}
                gender={this.state.gender}
              />
              <StyleColorSelector
                label={`Shirts`}
                onChange={(style, option) => this.setComponent('shirts', style, option)}
                components={ComponentsData['shirts-full']}
                gender={this.state.gender}
              />
              <pre>{JSON.stringify(this.state.currentComponents, null, 2)}</pre>
            </Modal>
          </>
        )}
        {this.state.show && (this.state.state === 'creation' || this.state.state === 'barber') && (
          <>
            <h1>Barber</h1>
          </>
        )}
        {this.state.show && (
          <>
            <Modal>
              <TintSelector
                label="Tint Test"
                onChange={() => {}}
                palette="metaped_tint_generic"
                tint0={0}
                tint1={0}
                tint2={0}
              />
            </Modal>
          </>
        )}
      </>
    );
  }
}
