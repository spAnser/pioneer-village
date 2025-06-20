import { debounce } from 'lodash';

import { Socket } from 'socket.io-client';

import UIComponent from '@uiLib/ui-component';
import { emitClient, LoadResourceJson, onClient } from '@lib/ui';

import { defaultOverlays } from './data';
import { ModalButton, ModalButtons, ModalContents, ModalLeft, ModalRight, BottomControls, ModalTitle } from './styled';
import StyleColorSelector from './components/StyleColorSelector';
import { GenderSelect } from './components/Gender';
import TintSelector from './components/TintSelector';
import XYSlider from './components/XYSlider';
import RangeSlider from './components/RangeSlider';

import VenusMars from '@styled/fa5/duotone/venus-mars.svg';
import InfoSquare from '@styled/fa5/duotone/info-square.svg';
import Tshirt from '@styled/fa5/duotone/tshirt.svg';
import Child from '@styled/fa5/duotone/child.svg';
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
  'hats',
  'eyewear',
  'neckties',
  'neckwear',

  'shirts_full',
  'suspenders',
  'vests',
  'coats',
  'coats_closed',
  'cloaks',
  'ponchos',

  'gauntlets',
  'gloves',

  'belts',
  'belt_buckles',
  'gunbelts',
  'skirts',
  'pants',
  'boots',
  'boot_accessories',
  'spats',
  'chaps',

  'accessories',
  'jewelry_bracelets',
  'jewelry_rings_left',
  'jewelry_rings_right',
];

const bodyTypes = ['Athletic', 'Skinny', 'Average', 'Brawny', 'Heavy'];
const teethTypes = [
  'The Chompers',
  'The Gilded',
  'Plumb Wore Out',
  'The Hayseed',
  'The Long-Dead',
  'The Gummer',
  'The Yokel',
];

const overlays: Record<string, UI.Customization.OverlayJson> = {
  eyebrows: {
    name: 'Eyebrows',
    components: [
      {
        id: 'mp_u_faov_eyebrow_m_000',
        albedo: 'mp_u_faov_eyebrow_m_000_ab',
        normal: 'mp_u_faov_eyebrow_m_000_nm',
        ma: 'mp_u_faov_eyebrow_m_000_ma',
        type: '0',
      },
      {
        id: 'mp_u_faov_eyebrow_m_001',
        albedo: 'mp_u_faov_eyebrow_m_001_ab',
        normal: 'mp_u_faov_eyebrow_m_001_nm',
        ma: 'mp_u_faov_eyebrow_m_001_ma',
        type: '0',
      },
      {
        id: 'mp_u_faov_eyebrow_m_002',
        albedo: 'mp_u_faov_eyebrow_m_002_ab',
        normal: 'mp_u_faov_eyebrow_m_002_nm',
        ma: 'mp_u_faov_eyebrow_m_002_ma',
        type: '0',
      },
      {
        id: 'mp_u_faov_eyebrow_m_003',
        albedo: 'mp_u_faov_eyebrow_m_003_ab',
        normal: 'mp_u_faov_eyebrow_m_003_nm',
        ma: 'mp_u_faov_eyebrow_m_003_ma',
        type: '0',
      },
      {
        id: 'mp_u_faov_eyebrow_m_004',
        albedo: 'mp_u_faov_eyebrow_m_004_ab',
        normal: 'mp_u_faov_eyebrow_m_004_nm',
        ma: 'mp_u_faov_eyebrow_m_004_ma',
        type: '0',
      },
      {
        id: 'mp_u_faov_eyebrow_m_005',
        albedo: 'mp_u_faov_eyebrow_m_005_ab',
        normal: 'mp_u_faov_eyebrow_m_005_nm',
        ma: 'mp_u_faov_eyebrow_m_005_ma',
        type: '0',
      },
      {
        id: 'mp_u_faov_eyebrow_m_006',
        albedo: 'mp_u_faov_eyebrow_m_006_ab',
        normal: 'mp_u_faov_eyebrow_m_006_nm',
        ma: 'mp_u_faov_eyebrow_m_006_ma',
        type: '0',
      },
      {
        id: 'mp_u_faov_eyebrow_m_007',
        albedo: 'mp_u_faov_eyebrow_m_007_ab',
        normal: 'mp_u_faov_eyebrow_m_007_nm',
        ma: 'mp_u_faov_eyebrow_m_007_ma',
        type: '0',
      },
      {
        id: 'mp_u_faov_eyebrow_m_008',
        albedo: 'mp_u_faov_eyebrow_m_008_ab',
        normal: 'mp_u_faov_eyebrow_m_008_nm',
        ma: 'mp_u_faov_eyebrow_m_008_ma',
        type: '0',
      },
      {
        id: 'mp_u_faov_eyebrow_m_009',
        albedo: 'mp_u_faov_eyebrow_m_009_ab',
        normal: 'mp_u_faov_eyebrow_m_009_nm',
        ma: 'mp_u_faov_eyebrow_m_009_ma',
        type: '0',
      },
      {
        id: 'mp_u_faov_eyebrow_m_010',
        albedo: 'mp_u_faov_eyebrow_m_010_ab',
        normal: 'mp_u_faov_eyebrow_m_010_nm',
        ma: 'mp_u_faov_eyebrow_m_010_ma',
        type: '0',
      },
      {
        id: 'mp_u_faov_eyebrow_m_011',
        albedo: 'mp_u_faov_eyebrow_m_011_ab',
        normal: 'mp_u_faov_eyebrow_m_011_nm',
        ma: 'mp_u_faov_eyebrow_m_011_ma',
        type: '0',
      },
      {
        id: 'mp_u_faov_eyebrow_m_012',
        albedo: 'mp_u_faov_eyebrow_m_012_ab',
        normal: 'mp_u_faov_eyebrow_m_012_nm',
        ma: 'mp_u_faov_eyebrow_m_012_ma',
        type: '0',
      },
      {
        id: 'mp_u_faov_eyebrow_m_013',
        albedo: 'mp_u_faov_eyebrow_m_013_ab',
        normal: 'mp_u_faov_eyebrow_m_013_nm',
        ma: 'mp_u_faov_eyebrow_m_013_ma',
        type: '0',
      },
      {
        id: 'mp_u_faov_eyebrow_m_014',
        albedo: 'mp_u_faov_eyebrow_m_014_ab',
        normal: 'mp_u_faov_eyebrow_m_014_nm',
        ma: 'mp_u_faov_eyebrow_m_014_ma',
        type: '0',
      },
      {
        id: 'mp_u_faov_eyebrow_m_015',
        albedo: 'mp_u_faov_eyebrow_m_015_ab',
        normal: 'mp_u_faov_eyebrow_m_015_nm',
        ma: 'mp_u_faov_eyebrow_m_015_ma',
        type: '0',
      },
      {
        id: 'mp_u_faov_eyebrow_f_000',
        albedo: 'mp_u_faov_eyebrow_f_000_ab',
        normal: 'mp_u_faov_eyebrow_f_000_nm',
        ma: 'mp_u_faov_eyebrow_f_000_ma',
        type: '1',
      },
      {
        id: 'mp_u_faov_eyebrow_f_001',
        albedo: 'mp_u_faov_eyebrow_f_001_ab',
        normal: 'mp_u_faov_eyebrow_f_001_nm',
        ma: 'mp_u_faov_eyebrow_f_001_ma',
        type: '1',
      },
      {
        id: 'mp_u_faov_eyebrow_f_002',
        albedo: 'mp_u_faov_eyebrow_f_002_ab',
        normal: 'mp_u_faov_eyebrow_f_002_nm',
        ma: 'mp_u_faov_eyebrow_f_002_ma',
        type: '1',
      },
      {
        id: 'mp_u_faov_eyebrow_f_003',
        albedo: 'mp_u_faov_eyebrow_f_003_ab',
        normal: 'mp_u_faov_eyebrow_f_003_nm',
        ma: 'mp_u_faov_eyebrow_f_003_ma',
        type: '1',
      },
      {
        id: 'mp_u_faov_eyebrow_f_004',
        albedo: 'mp_u_faov_eyebrow_f_004_ab',
        normal: 'mp_u_faov_eyebrow_f_004_nm',
        ma: 'mp_u_faov_eyebrow_f_004_ma',
        type: '1',
      },
      {
        id: 'mp_u_faov_eyebrow_f_005',
        albedo: 'mp_u_faov_eyebrow_f_005_ab',
        normal: 'mp_u_faov_eyebrow_f_005_nm',
        ma: 'mp_u_faov_eyebrow_f_005_ma',
        type: '1',
      },
      {
        id: 'mp_u_faov_eyebrow_f_006',
        albedo: 'mp_u_faov_eyebrow_f_006_ab',
        normal: 'mp_u_faov_eyebrow_f_006_nm',
        ma: 'mp_u_faov_eyebrow_f_006_ma',
        type: '1',
      },
      {
        id: 'mp_u_faov_eyebrow_f_007',
        albedo: 'mp_u_faov_eyebrow_f_007_ab',
        normal: 'mp_u_faov_eyebrow_f_007_nm',
        ma: 'mp_u_faov_eyebrow_f_007_ma',
        type: '1',
      },
    ],
  },
};

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
      currentFaceFeatures: {},
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

  getComponentArray(currentComponents?: Record<string, any>) {
    if (!currentComponents) {
      currentComponents = this.state.currentComponents;
    }

    const components = [];
    for (const [category, data] of Object.entries(currentComponents)) {
      if (data.style > -1) {
        const component = ComponentsData[category][data.style].components[data.option];
        components.push(component.component);
      }
    }

    return components;
  }

  setComponent(componentType: string, style: number, option: number) {
    console.log('component', componentType, style, option);
    const currentComponents = { ...this.state.currentComponents, [componentType]: { style, option } };
    this.setState({ currentComponents });

    const components = this.getComponentArray(currentComponents);

    console.log('customization.set-components', components);
    console.log('this.getComponentDataArray()', this.getComponentDataArray());
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

  getComponentDataArray() {
    const comp = {
      name: 'Paisley Vest',
      tint0: 16,
      tint1: 21,
      tint2: 20,
      palette: 'metaped_tint_generic',
      category: 'VESTS',
      shopItem: 'CLOTHING_ITEM_M_VEST_000_TINT_001',
    };

    const currentComponents = this.state.currentComponents;

    const components: Record<string, any> = {};
    for (const [category, data] of Object.entries(currentComponents)) {
      if (data.style > -1) {
        const component = ComponentsData[category][data.style].components[data.option];
        let name = component.friendlyName || component.name || component.category;

        if (typeof name === 'string') {
          name = name.replace(/^CLOTHING_ITEM_[A-Z]{1,2}_/, '');
          name = name.replace(/_[0-9]{3}_TINT_[0-9]{3}$/, '');
          name.replace(/_/g, ' ');
          name = name
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
        }

        components[category] = {
          name,
          // tint0: comp.tint0,
          // tint1: comp.tint1,
          // tint2: comp.tint2,
          // palette: comp.palette,
          category: category.toUpperCase(),
          shopItem: component.name || component.component,
        };
      }
    }

    return components;
  }

  handleSetState(state: Customization.State) {
    console.log('handleSetState', state);
    if (state === 'finalize') {
      console.log(this.state);
      console.log(this.props.socket.emit);
      const state = { ...this.state, currentComponents: this.getComponentDataArray(), tints: {}, currentOverlays: {} };
      // TODO: Send current body/head components and face features
      console.log(JSON.stringify(state, null, 2));
      this.props.socket.emit('customization.finalize', JSON.stringify(state));
    } else {
      emitClient('customization.set-state', state);
    }
  }

  handleChangeSkinTone(value: number) {
    console.log('handleChangeSkinTone', value);
    emitClient('customization.set-skin-tone', value);
  }

  handleChangeHead(value: number) {
    console.log('handleChangeHead', value);
    emitClient('customization.set-head', value);
  }

  handleChangeTeeth(value: number) {
    console.log('handleChangeTeeth', value);
    emitClient('customization.set-teeth', value);
  }

  handleChangeBodyType(value: number) {
    console.log('handleChangeBodyType', value);
    emitClient('customization.set-body-type', value);
  }

  handleChangeWaist(value: number) {
    console.log('handleChangeWasit', value);
    emitClient('customization.set-waist', value);
  }

  handleChangeFaceFeature(feature: number, value: number) {
    console.log('handleChangeFaceFeature', feature, value);
    emitClient('customization.set-face-feature', feature, value);
    this.setState((prevState) => ({
      currentFaceFeatures: { ...prevState.currentFaceFeatures, [`${feature}`]: value },
    }));
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
      emitClient('customization.set-face-option', currentFaceOptions);
      return { currentFaceOptions };
    });
  }

  handleRotation(value: number) {
    console.log('handleRotation', value);
    emitClient('customization.rotate-chosen', value);
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
                  <ModalContents>
                    <RangeSlider label="Head" min={0} max={19} onChange={this.handleChangeHead.bind(this)} />
                    <RangeSlider
                      label="Teeth"
                      labels={teethTypes}
                      min={0}
                      max={6}
                      onChange={this.handleChangeTeeth.bind(this)}
                    />
                    {/*<RangeSlider*/}
                    {/*  label="Head Width"*/}
                    {/*  min={-2}*/}
                    {/*  max={3}*/}
                    {/*  step={0.1}*/}
                    {/*  onChange={this.handleFaceChange.bind(this, 'headWidth')}*/}
                    {/*  className="head-width"*/}
                    {/*/>*/}
                    {/*<XYSlider*/}
                    {/*  label="Cheek Bone"*/}
                    {/*  xMin={-4}*/}
                    {/*  xMax={3.5}*/}
                    {/*  yMin={-2.5}*/}
                    {/*  yMax={2.5}*/}
                    {/*  step={0.1}*/}
                    {/*  onChange={(xValue, yValue) =>*/}
                    {/*    this.handleFaceChange('cheekBoneWidth', xValue, 'cheekBoneHeight', yValue)*/}
                    {/*  }*/}
                    {/*  className="cheek-bone"*/}
                    {/*/>*/}
                    {/*<RangeSlider*/}
                    {/*  label="Cheek Depth"*/}
                    {/*  min={-2.5}*/}
                    {/*  max={2.5}*/}
                    {/*  step={0.1}*/}
                    {/*  onChange={this.handleFaceChange.bind(this, 'cheekBoneDepth')}*/}
                    {/*  className="cheek-depth"*/}
                    {/*  vertical={true}*/}
                    {/*/>*/}

                    {/*<RangeSlider*/}
                    {/*  label="mouth corner left width"*/}
                    {/*  min={0}*/}
                    {/*  max={1.5}*/}
                    {/*  step={0.1}*/}
                    {/*  onChange={this.handleChangeFaceFeature.bind(this, 57350)}*/}
                    {/*/>*/}
                    {/*<RangeSlider*/}
                    {/*  label="mouth corner left depth"*/}
                    {/*  min={0}*/}
                    {/*  max={1.5}*/}
                    {/*  step={0.1}*/}
                    {/*  onChange={this.handleChangeFaceFeature.bind(this, 40950)}*/}
                    {/*/>*/}
                    <RangeSlider
                      label="mouth corner left height"
                      min={0}
                      max={1.5}
                      step={0.1}
                      onChange={this.handleChangeFaceFeature.bind(this, 46661)}
                    />
                    <RangeSlider
                      label="mouth corner left upper lip distance"
                      min={0}
                      max={1.5}
                      step={0.1}
                      onChange={this.handleChangeFaceFeature.bind(this, 22344)}
                    />
                    <RangeSlider
                      label="mouth corner right upper lip distance"
                      min={0}
                      max={1.5}
                      step={0.1}
                      onChange={this.handleChangeFaceFeature.bind(this, 60292)}
                    />
                    <RangeSlider
                      label="mouth corner right height"
                      min={0}
                      max={1.5}
                      step={0.1}
                      onChange={this.handleChangeFaceFeature.bind(this, 49299)}
                    />
                    {/*<RangeSlider*/}
                    {/*  label="mouth corner right width"*/}
                    {/*  min={0}*/}
                    {/*  max={1.5}*/}
                    {/*  step={0.1}*/}
                    {/*  onChange={this.handleChangeFaceFeature.bind(this, 55718)}*/}
                    {/*/>*/}
                    {/*<RangeSlider*/}
                    {/*  label="mouth corner right depth"*/}
                    {/*  min={0}*/}
                    {/*  max={1.5}*/}
                    {/*  step={0.1}*/}
                    {/*  onChange={this.handleChangeFaceFeature.bind(this, 9423)}*/}
                    {/*/>*/}

                    <RangeSlider
                      label="upper lip height"
                      min={-1.5}
                      max={1.5}
                      step={0.1}
                      onChange={this.handleChangeFaceFeature.bind(this, 6656)}
                    />
                    {/*<RangeSlider*/}
                    {/*  label="upper lip width"*/}
                    {/*  min={-1.5}*/}
                    {/*  max={1.5}*/}
                    {/*  step={0.1}*/}
                    {/*  onChange={this.handleChangeFaceFeature.bind(this, 37313)}*/}
                    {/*/>*/}
                    {/*<RangeSlider*/}
                    {/*  label="upper lip depth"*/}
                    {/*  min={-1.5}*/}
                    {/*  max={1.5}*/}
                    {/*  step={0.1}*/}
                    {/*  onChange={this.handleChangeFaceFeature.bind(this, 50037)}*/}
                    {/*/>*/}
                    <RangeSlider
                      label="lower lip height"
                      min={-1.5}
                      max={1.5}
                      step={0.1}
                      onChange={this.handleChangeFaceFeature.bind(this, 47949)}
                    />
                    {/*<RangeSlider*/}
                    {/*  label="lower lip width"*/}
                    {/*  min={-1.5}*/}
                    {/*  max={1.5}*/}
                    {/*  step={0.1}*/}
                    {/*  onChange={this.handleChangeFaceFeature.bind(this, 45232)}*/}
                    {/*/>*/}
                    {/*<RangeSlider*/}
                    {/*  label="lower lip depth"*/}
                    {/*  min={-1.5}*/}
                    {/*  max={1.5}*/}
                    {/*  step={0.1}*/}
                    {/*  onChange={this.handleChangeFaceFeature.bind(this, 23830)}*/}
                    {/*/>*/}

                    {/*<RangeSlider*/}
                    {/*  label="jaw height"*/}
                    {/*  min={-2.5}*/}
                    {/*  max={1.5}*/}
                    {/*  step={0.1}*/}
                    {/*  onChange={this.handleChangeFaceFeature.bind(this, 36106)}*/}
                    {/*/>*/}
                    {/*<RangeSlider*/}
                    {/*  label="jaw width"*/}
                    {/*  min={-2}*/}
                    {/*  max={2.5}*/}
                    {/*  step={0.1}*/}
                    {/*  onChange={this.handleChangeFaceFeature.bind(this, 60334)}*/}
                    {/*/>*/}
                    {/*<RangeSlider*/}
                    {/*  label="jaw depth"*/}
                    {/*  min={-2.5}*/}
                    {/*  max={2.5}*/}
                    {/*  step={0.1}*/}
                    {/*  onChange={this.handleChangeFaceFeature.bind(this, 7670)}*/}
                    {/*/>*/}
                    <RangeSlider
                      label="jaw y pos"
                      min={-1}
                      max={1}
                      step={0.1}
                      onChange={this.handleChangeFaceFeature.bind(this, 55182)}
                    />

                    {/*<RangeSlider*/}
                    {/*  label="Hat Rotation"*/}
                    {/*  min={-6.5}*/}
                    {/*  max={6.5}*/}
                    {/*  step={0.1}*/}
                    {/*  onChange={this.handleChangeFaceFeature.bind(this, 9584)}*/}
                    {/*/>*/}
                    {/*<RangeSlider*/}
                    {/*  label="Hat Angle Forward/Backward"*/}
                    {/*  min={-2}*/}
                    {/*  max={1}*/}
                    {/*  step={0.1}*/}
                    {/*  onChange={this.handleChangeFaceFeature.bind(this, 9586)}*/}
                    {/*/>*/}
                    {/*<RangeSlider*/}
                    {/*  label="Hat Angle Left/Right"*/}
                    {/*  min={-1.5}*/}
                    {/*  max={1.5}*/}
                    {/*  step={0.1}*/}
                    {/*  onChange={this.handleChangeFaceFeature.bind(this, 3437)}*/}
                    {/*/>*/}
                    {/*<RangeSlider*/}
                    {/*  label="Hat X Position"*/}
                    {/*  min={-1}*/}
                    {/*  max={1}*/}
                    {/*  step={0.1}*/}
                    {/*  onChange={this.handleChangeFaceFeature.bind(this, 52553)}*/}
                    {/*/>*/}
                    {/*<RangeSlider*/}
                    {/*  label="Hat Y Position"*/}
                    {/*  min={-1}*/}
                    {/*  max={1}*/}
                    {/*  step={0.1}*/}
                    {/*  onChange={this.handleChangeFaceFeature.bind(this, 16009)}*/}
                    {/*/>*/}
                    {/*<RangeSlider*/}
                    {/*  label="Hat Z Position"*/}
                    {/*  min={-1}*/}
                    {/*  max={0.5}*/}
                    {/*  step={0.1}*/}
                    {/*  onChange={this.handleChangeFaceFeature.bind(this, 38169)}*/}
                    {/*/>*/}
                  </ModalContents>
                </>
              )}
              {this.state.state === 'body' && (
                <>
                  <ModalContents>
                    <RangeSlider label="Skin Tone" min={0} max={5} onChange={this.handleChangeSkinTone.bind(this)} />
                    {/*<RangeSlider label="Eyes" min={0} max={1} onChange={this.handleChangeEyes.bind(this)} />*/}
                    <RangeSlider
                      label="Body Type"
                      labels={bodyTypes}
                      defaultValue={2}
                      max={4}
                      onChange={this.handleChangeBodyType.bind(this)}
                    />
                    {/*<RangeSlider label="Waist" max={20} onChange={this.handleChangeWaist.bind(this)} />*/}
                    <RangeSlider
                      label="Bodyweight"
                      min={-10}
                      max={10}
                      step={0.1}
                      onChange={this.handleChangeFaceFeature.bind(this, 2007)}
                    />
                    <RangeSlider
                      label="Muscles"
                      min={-2.5}
                      max={2.5}
                      step={0.1}
                      onChange={this.handleChangeFaceFeature.bind(this, 65374)}
                    />
                    <RangeSlider
                      label="Anterior Trapezius"
                      min={-1}
                      max={1}
                      step={0.1}
                      onChange={this.handleChangeFaceFeature.bind(this, 33485)}
                    />

                    {this.state.gender === 'female' && (
                      <>
                        <RangeSlider
                          label="Chest Height"
                          min={-1.5}
                          max={2.5}
                          step={0.1}
                          onChange={this.handleChangeFaceFeature.bind(this, 46240)}
                        />
                        <RangeSlider
                          label="Butt/Hip Size"
                          min={-1}
                          max={2.5}
                          step={0.1}
                          onChange={this.handleChangeFaceFeature.bind(this, 8991)}
                        />
                      </>
                    )}
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
                  <Child />
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
            <BottomControls>
              <RangeSlider
                min={-90}
                max={270}
                step={45}
                labelsAlt={['-180°', '-135°', '-90°', '-45°', '0°', '45°', '90°', '135°', '180°']}
                defaultValue={90}
                onChange={this.handleRotation.bind(this)}
                className="rotation"
              />
            </BottomControls>
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
