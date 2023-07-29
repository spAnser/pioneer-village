import { debounce } from 'lodash';

import { Component, createRef } from 'preact';
import styled from 'styled-components';
import { emitClient } from '@lib/ui';
import { Socket } from 'socket.io-client';

const TSSelect = styled.select`
  font-size: 2rem;
`;

const TSInput = styled.input`
  color: red;
`;

const Palette = styled.div`
  position: relative;
`;

const PaletteMarker = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 1px;
`;

const palettes = [
  'metaped_tint_animal',
  'metaped_tint_combined',
  'metaped_tint_combined_leather',
  'metaped_tint_eye',
  'metaped_tint_generic',
  'metaped_tint_generic_clean',
  'metaped_tint_generic_weathered',
  'metaped_tint_generic_worn',
  'metaped_tint_hair',
  'metaped_tint_hat',
  'metaped_tint_hat_clean',
  'metaped_tint_hat_weathered',
  'metaped_tint_hat_worn',
  'metaped_tint_horse',
  'metaped_tint_horse_leather',
  'metaped_tint_leather',
  'metaped_tint_makeup',
  'metaped_tint_mpadv',
  'metaped_tint_skirt_clean',
  'metaped_tint_skirt_weathered',
  'metaped_tint_skirt_worn',
  'metaped_tint_swatch_000',
  'metaped_tint_swatch_001',
  'metaped_tint_swatch_002',
  'metaped_tint_swatch_003',
];

interface Props {
  label: string;
  onChange: (palette: string, tint0: number, tint1: number, tint2: number) => void;
  palette: string;
  tint0: number;
  tint1: number;
  tint2: number;
}

interface State {
  palette: string;
  tint0: number;
  tint1: number;
  tint2: number;
}

export default class TintSelector extends Component<Props, State> {
  constructor(props: Props) {
    super();
    this.state = {
      palette: props.palette,
      tint0: props.tint0,
      tint1: props.tint1,
      tint2: props.tint2,
    };
  }

  sendClientData = debounce(() => {
    // @ts-ignore
    emitClient('customization.tint-test', this.state.palette, this.state.tint0, this.state.tint1, this.state.tint2);
  }, 1000);

  handleSelectChange(target: HTMLSelectElement) {
    this.setState({ palette: target.value });
    this.sendClientData();
  }

  handleTint0Change(target: HTMLInputElement) {
    this.setState({ tint0: Number(target.value) });
    this.sendClientData();
  }

  handleTint1Change(target: HTMLInputElement) {
    this.setState({ tint1: Number(target.value) });
    this.sendClientData();
  }

  handleTint2Change(target: HTMLInputElement) {
    this.setState({ tint2: Number(target.value) });
    this.sendClientData();
  }

  render() {
    return (
      <div>
        <h1>{this.props.label}</h1>
        <TSSelect
          name="palette"
          id="palette"
          value={this.state.palette}
          onChange={(e: InputEvent) => this.handleSelectChange(e.target as HTMLSelectElement)}
        >
          {palettes.map((palette) => {
            return <option value={palette}>{palette}</option>;
          })}
        </TSSelect>

        <TSInput
          type="range"
          value={this.state.tint0}
          min={0}
          max={255}
          step={1}
          onChange={(e: InputEvent) => this.handleTint0Change(e.target as HTMLInputElement)}
        />
        <TSInput
          type="range"
          value={this.state.tint1}
          min={0}
          max={255}
          step={1}
          onChange={(e: InputEvent) => this.handleTint1Change(e.target as HTMLInputElement)}
        />
        <TSInput
          type="range"
          value={this.state.tint2}
          min={0}
          max={255}
          step={1}
          onChange={(e: InputEvent) => this.handleTint2Change(e.target as HTMLInputElement)}
        />

        <Palette>
          <img
            style={{ width: 64 * 4, imageRendering: 'pixelated' }}
            src={`https://p--v.b-cdn.net/customization/palettes/${this.state.palette}.png`}
            alt={this.state.palette}
          />
          <PaletteMarker style={{ top: this.state.tint0 * 4, backgroundColor: '#f00' }} />
          <PaletteMarker style={{ top: this.state.tint1 * 4, backgroundColor: '#0f0' }} />
          <PaletteMarker style={{ top: this.state.tint2 * 4, backgroundColor: '#00f' }} />
        </Palette>
      </div>
    );
  }
}
