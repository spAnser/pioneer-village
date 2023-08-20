import { debounce } from 'lodash';

import { Component } from 'preact';
import styled from 'styled-components';
import { emitClient } from '@lib/ui';
import { uiSize } from '@uiLib/helpers';
import theme from '@styled/theme';

const TSContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${uiSize(64)} 0;
  gap: ${uiSize(16)};
  font-family: 'Open Sans', sans-serif;
  font-size: ${uiSize(11)};
`;

const TSSelect = styled.select`
  font-size: 2rem;
`;

const TSPalettes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${uiSize(6)};
  text-transform: capitalize;
`;

const TSPalette = styled.label`
  position: relative;
  background-color: #444;
  text-align: center;
  display: inline-block;
  padding: ${uiSize(4)} ${uiSize(6)};
  border-radius: ${uiSize(4)};

  &:has(input:checked) {
    background-color: ${theme.colors.blue.hex};
  }

  input {
    display: none;
  }
`;

const TSOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: ${uiSize(16)} ${uiSize(4)};
  width: calc(100% + ${uiSize(9)});
  height: 100%;
  overflow: auto;
  margin-left: ${uiSize(-4)};

  &::-webkit-scrollbar {
    width: ${uiSize(2)};
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(${theme.colors.white.rgb}, 0.5);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(${theme.colors.white.rgb}, 0.75);
  }
`;

const TSOption = styled.div`
  width: ${uiSize(48)};
  height: ${uiSize(57)};
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  gap: ${uiSize(3)};
`;

const scale = 5.3;
const TSThumb = styled.div`
  image-rendering: pixelated;
  width: ${uiSize(8 * scale)};
  height: ${uiSize(8 * scale)};
  background-size: ${uiSize(64 * scale)};
  transform: translateX(-50%);
  transform-origin: center top;
  position: absolute;
  top: 0;
  left: 50%;
`;

const TSRadio = styled.label`
  position: relative;
  background-color: #444;
  width: 25%;
  text-align: center;

  &:has(input:checked) {
    background-color: ${theme.colors.blue.hex};
  }

  input {
    display: none;
  }
`;

const palettes: Record<string, number> = {
  metaped_tint_animal: 255, // 256
  metaped_tint_combined: 255, // 256
  metaped_tint_combined_leather: 255, // 256
  metaped_tint_generic: 255, // 256
  metaped_tint_generic_clean: 255, // 256
  metaped_tint_generic_weathered: 255, // 256
  metaped_tint_generic_worn: 255, // 256
  metaped_tint_eye: 128,
  metaped_tint_hair: 255, // 256
  metaped_tint_hat: 255, // 256
  metaped_tint_hat_clean: 255, // 256
  metaped_tint_hat_weathered: 255, // 256
  metaped_tint_hat_worn: 255, // 256
  metaped_tint_horse: 255, // 256
  metaped_tint_horse_leather: 255, // 256
  metaped_tint_leather: 128,
  metaped_tint_makeup: 64,
  metaped_tint_mpadv: 255, // 256
  metaped_tint_skirt_clean: 255, // 256
  metaped_tint_skirt_weathered: 255, // 256
  metaped_tint_skirt_worn: 255, // 256
  weapon_tint_wood: 128,
  weapon_tint_wood_working: 128,
};

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
    this.setState({ palette: target.value, tint0: 0, tint1: 0, tint2: 0 });
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

  setPalette(palette: string) {
    this.setState({ palette });
    this.sendClientData();
  }

  setTints(value: number) {
    this.setState({ tint0: value, tint1: value, tint2: value });
    this.sendClientData();
  }

  render() {
    return (
      <TSContainer>
        <h1>{this.props.label}</h1>

        <h2>Palettes</h2>
        <TSPalettes>
          {Object.keys(palettes).map((palette) => {
            return (
              <TSPalette>
                <input
                  type="radio"
                  name="palette"
                  value={palette}
                  checked={this.state.palette === palette}
                  onClick={() => this.setPalette(palette)}
                />
                {palette.replace('metaped_tint_', '').split('_').join(' ')}
              </TSPalette>
            );
          })}
        </TSPalettes>

        <h2>Dyes</h2>
        <TSOptions>
          {new Array(palettes[this.state.palette]).fill(0).map((_, i) => (
            <TSOption key={i}>
              <TSThumb
                style={{
                  backgroundImage: `url(https://p--v.b-cdn.net/customization/palettes/${this.state.palette}_thumbs.png)`,
                  backgroundPosition: `-${uiSize((i % 8) * 8 * scale)} -${uiSize(Math.floor(i / 8) * 8 * scale)}`,
                }}
                onClick={() => this.setTints(i)}
              />
              <TSRadio>
                <input
                  type="radio"
                  name="primary"
                  value={i}
                  checked={this.state.tint0 === i}
                  onChange={(e) => this.handleTint0Change(e.target as HTMLInputElement)}
                />
                1
              </TSRadio>
              <TSRadio>
                <input
                  type="radio"
                  name="secondary"
                  value={i}
                  checked={this.state.tint1 === i}
                  onChange={(e) => this.handleTint1Change(e.target as HTMLInputElement)}
                />
                2
              </TSRadio>
              <TSRadio>
                <input
                  type="radio"
                  name="tertiary"
                  value={i}
                  checked={this.state.tint2 === i}
                  onChange={(e) => this.handleTint2Change(e.target as HTMLInputElement)}
                />
                3
              </TSRadio>
            </TSOption>
          ))}
        </TSOptions>
      </TSContainer>
    );
  }
}
