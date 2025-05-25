import { debounce } from 'lodash';

import { Socket } from 'socket.io-client';

import UIComponent from '@uiLib/ui-component';
import { emitClient, LoadResourceJson, onClient } from '@lib/ui';

import { defaultOverlays } from './data';
import { ModalButton, ModalButtons, ModalContents, ModalLeft, ModalRight, ModalTitle } from './styled';
import StyleColorSelector from './components/StyleColorSelector';
import { GenderSelect } from './components/Gender';
import TintSelector from './components/TintSelector';
import XYSlider from './components/XYSlider';
import RangeSlider from './components/RangeSlider';

import VenusMars from '@styled/fa5/duotone/venus-mars.svg';
import InfoSquare from '@styled/fa5/duotone/info-square.svg';
import Tshirt from '@styled/fa5/duotone/tshirt.svg';
import Fingerprint from '@styled/fa5/duotone/fingerprint.svg';
import Save from '@styled/fa5/duotone/save.svg';
import HeadSide from '@styled/fa5/duotone/head-side.svg';

const componentFiles = [
  '2886757168',
  'accessories',
  'ammo_pistols',
  'ammo_rifles',
  'aprons',
  'armor',
  'badges',
  'beards_chin',
  'beards_chops',
  'beards_complete',
  'beards_mustache',
  'belt_buckles',
  'belts',
  'bodies_lower',
  'bodies_upper',
  'boot_accessories',
  'boots',
  'chaps',
  'cloaks',
  'coats',
  'coats_closed',
  'dresses',
  'eyes',
  'eyewear',
  'gauntlets',
  'gloves',
  'gunbelt_accs',
  'gunbelts',
  'hair',
  'hair_accessories',
  'hats',
  'heads',
  'holsters_crossdraw',
  'holsters_knife',
  'holsters_left',
  'holsters_right',
  'horse_accessories',
  'horse_bedrolls',
  'horse_blankets',
  'horse_bridles',
  'horse_manes',
  'horse_mustache',
  'horse_saddlebags',
  'horse_saddles',
  'horse_shoes',
  'horse_tails',
  'jewelry_bracelets',
  'jewelry_rings_left',
  'jewelry_rings_right',
  'loadouts',
  'masks',
  'masks_large',
  'neckties',
  'neckwear',
  'pants',
  'ponchos',
  'saddle_horns',
  'saddle_lanterns',
  'saddle_stirrups',
  'satchels',
  'shirts_full',
  'skirts',
  'spats',
  'suspenders',
  'talisman_belt',
  'talisman_holster',
  'talisman_satchel',
  'talisman_wrist',
  'teeth',
  'vests',
];

const ComponentsData: Record<string, UI.Customization.ComponentJson[]> = {};

const pedComponentCategories = [
  'accessories',
  'ammo_pistols',
  'ammo_rifles',
  'aprons',
  'armor',
  'badges',
  'belts',
  'belt_buckles',
  // 'bodies_lower',
  // 'bodies_upper',
  'boots',
  'boot_accessories',
  'chaps',
  'cloaks',
  'coats',
  'coats_closed',
  // 'eyes',
  'eyewear',
  'gauntlets',
  'gloves',
  'gunbelts',
  // 'hair',
  'hats',
  // 'heads',
  'holsters_crossdraw',
  'holsters_knife',
  'holsters_left',
  'holsters_right',
  'jewelry_bracelets',
  'jewelry_rings_left',
  'jewelry_rings_right',
  // 'legs_accessories',
  'loadouts',
  'masks',
  'masks_large',
  'neckties',
  'neckwear',
  'pants',
  'ponchos',
  'satchels',
  'shirts_full',
  'skirts',
  'spats',
  'suspenders',
  'vests',
];

const bodyTypes = ['Skinny', 'Athletic', 'Average', 'Heavy', 'Brawny'];

const horseComponentCategories = ['head', 'hand', 'hair', 'mane', 'teef', 'hair', 'mane'];

export default class Customization extends UIComponent<UI.Customization.Props, UI.Customization.State, {}> {
  constructor(
    props: UI.Customization.Props,
    context: { socket: Socket<UISocketEvents, SocketServer.Client & SocketServer.ClientEvents> },
  ) {
    super();

    this.state = {
      show: false,
      state: 'gender',
      components: {},
      model: '',
      gender: 'male',
      currentComponents: {},
      hiddenComponents: {},
      currentFaceOptions: {},
      currentBodyOptions: {},
      currentOverlays: defaultOverlays,
      currentWhistle: {},
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      tints: {},
    };

    onClient('customization.state', (state) => {
      this.setState(state);
    });

    onClient('customization.set-tint-by-category', (category, tint) => {
      this.setState({ tints: { ...this.state.tints, [category]: tint } });
    });

    this.resetComponents();
    this.loadComponents();
  }

  async resetComponents() {
    const tints: Record<string, CustomizationPalette> = {};
    const currentComponents: Record<string, any> = {};

    for (const category of [...pedComponentCategories, ...horseComponentCategories]) {
      tints[category] = {
        palette: -1,
        tint0: 0,
        tint1: 0,
        tint2: 0,
      };

      currentComponents[category] = {
        style: -1,
        option: 0,
      };
    }

    this.setState({ tints, currentComponents });
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
    console.log('setState', event);
    this.setState(event);
    if (!event.show) {
      this.resetComponents();
    }
  }

  sendClientData = debounce((updateCategory: string) => {
    for (const [category, data] of Object.entries(this.state.tints)) {
      if (category !== updateCategory) continue;
      if (data.palette === 0) {
        emitClient('customization.set-tint-by-category', category, {
          palette: -1,
          tint0: 0,
          tint1: 0,
          tint2: 0,
        });
      } else {
        emitClient('customization.set-tint-by-category', category, data);
      }
    }
  }, 1000);

  setTintByCategory(category: string, tint: Customization.Palette) {
    this.setState({ tints: { ...this.state.tints, [category]: tint } });
    this.sendClientData(category);
  }

  setComponent(componentType: string, style: number, option: number) {
    console.log('component', componentType, style, option);
    const currentComponents = { ...this.state.currentComponents, [componentType]: { style, option } };
    this.setState({ currentComponents });
    const components = [];
    for (const [category, data] of Object.entries(currentComponents)) {
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

  handleSetState(state: Customization.State) {
    console.log('handleSetState', state);
    if (state === 'finalize') {
      console.log(this.state);
      console.log(this.props.socket.emit);
      this.props.socket.emit('customization.finalize', JSON.stringify(this.state));
    } else {
      emitClient('customization.set-state', state);
    }
  }

  handleChangeBodyType(value: number) {
    console.log('handleChangeBodyType', value);
    emitClient('customization.set-body-type', value);
  }

  handleChangeWaist(value: number) {
    console.log('handleChangeWasit', value);
    emitClient('customization.set-waist', value);
  }

  updateFirstName(target: HTMLInputElement) {
    console.log('updateFirstName', target.value);
    this.setState({ firstName: target.value });
  }

  updateLastName(target: HTMLInputElement) {
    console.log('updateLastName', target.value);
    this.setState({ lastName: target.value });
  }

  updateDateOfBirth(target: HTMLInputElement) {
    console.log('updateDateOfBirth', target.value);
    this.setState({ dateOfBirth: target.value });
  }

  handleFaceChange(option: string, value: number, option2?: string, value2?: number) {
    console.log('handleFaceChange', option, value, option2, value2);
    this.setState((prevState) => {
      const currentFaceOptions = { ...prevState.currentFaceOptions, [option]: value };
      if (option2 && value2 !== undefined) {
        currentFaceOptions[option2] = value2;
      }
      return { currentFaceOptions };
    });

    emitClient('customization.set-face-option', this.state.currentFaceOptions);
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
        {this.state.show && this.state.state !== 'gender' && this.state.state !== 'transition' && (
          <>
            <ModalRight>
              {this.state.state === 'info' && (
                <>
                  <ModalContents>
                    <input
                      type="text"
                      placeholder="First Name"
                      onChange={(e) => this.updateFirstName(e.target as HTMLInputElement)}
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      onChange={(e) => this.updateLastName(e.target as HTMLInputElement)}
                    />
                    <input type="date" onChange={(e) => this.updateDateOfBirth(e.target as HTMLInputElement)} />
                    <XYSlider
                      label="Test XY Grid"
                      xMin={-1}
                      xMax={1}
                      yMin={-1}
                      yMax={1}
                      step={0.1}
                      onChange={(xValue, yValue) => console.log('onChange', xValue, yValue)}
                    />
                  </ModalContents>
                </>
              )}
              {this.state.state === 'head' && (
                <>
                  <RangeSlider
                    label="Head Width"
                    min={-2}
                    max={3}
                    step={0.1}
                    onChange={(value) => this.handleFaceChange('headWidth', value)}
                  />
                  <XYSlider
                    label="Cheek Bone"
                    xMin={-4}
                    xMax={3.5}
                    yMin={-2.5}
                    yMax={2.5}
                    step={0.1}
                    onChange={(xValue, yValue) =>
                      this.handleFaceChange('cheekBoneWidth', xValue, 'cheekBoneHeight', yValue)
                    }
                  />
                  <RangeSlider
                    label="Cheek Depth"
                    min={-2.5}
                    max={2.5}
                    step={0.1}
                    onChange={(value) => {
                      this.handleFaceChange('cheekBoneDepth', value);
                    }}
                  />
                </>
              )}
              {this.state.state === 'body' && (
                <>
                  <ModalContents>
                    <RangeSlider
                      label="Body Type"
                      labels={bodyTypes}
                      defaultValue={2}
                      max={4}
                      onChange={this.handleChangeBodyType.bind(this)}
                    />
                    <RangeSlider label="Waist" max={20} onChange={this.handleChangeWaist.bind(this)} />
                  </ModalContents>
                </>
              )}
              {this.state.state === 'clothing' && (
                <>
                  <ModalContents>
                    {pedComponentCategories.map((category) => (
                      <StyleColorSelector
                        label={category}
                        onChange={(style, option) => this.setComponent(category, style, option)}
                        components={ComponentsData[category]}
                        gender={this.state.gender}
                      />
                    ))}
                    <pre>{JSON.stringify(this.state.currentComponents, null, 2)}</pre>
                  </ModalContents>
                </>
              )}
              <ModalButtons>
                <ModalButton onClick={this.handleSetState.bind(this, 'gender')}>
                  <VenusMars />
                </ModalButton>
                <ModalButton
                  className={this.state.state === 'info' ? 'active' : ''}
                  onClick={this.handleSetState.bind(this, 'info')}
                >
                  <InfoSquare />
                </ModalButton>
                <ModalButton
                  className={this.state.state === 'body' ? 'active' : ''}
                  onClick={this.handleSetState.bind(this, 'body')}
                >
                  <Fingerprint />
                </ModalButton>
                <ModalButton
                  className={this.state.state === 'head' ? 'active' : ''}
                  onClick={this.handleSetState.bind(this, 'head')}
                >
                  <HeadSide />
                </ModalButton>
                <ModalButton
                  className={this.state.state === 'clothing' ? 'active' : ''}
                  onClick={this.handleSetState.bind(this, 'clothing')}
                >
                  <Tshirt />
                </ModalButton>
                <ModalButton onClick={this.handleSetState.bind(this, 'finalize')}>
                  <Save />
                </ModalButton>
              </ModalButtons>
            </ModalRight>
          </>
        )}
        {this.state.show && false && (
          <>
            <ModalLeft>
              <ModalContents>
                <TintSelector
                  label="Hat Tint"
                  onChange={this.setTintByCategory.bind(this)}
                  category="hats"
                  palette={this.state.tints.hats.palette}
                  tint0={this.state.tints.hats.tint0}
                  tint1={this.state.tints.hats.tint1}
                  tint2={this.state.tints.hats.tint2}
                />
                <TintSelector
                  label="Coat Tint"
                  onChange={this.setTintByCategory.bind(this)}
                  category="coats"
                  palette={this.state.tints.coats.palette}
                  tint0={this.state.tints.coats.tint0}
                  tint1={this.state.tints.coats.tint1}
                  tint2={this.state.tints.coats.tint2}
                />
              </ModalContents>
            </ModalLeft>
          </>
        )}
      </>
    );
  }
}
