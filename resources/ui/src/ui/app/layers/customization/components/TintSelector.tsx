import styled from 'styled-components';
import { emitClient } from '@lib/ui';
import { uiSize } from '@uiLib/helpers';
import theme from '@styled/theme';
import { ColorPaletteNames, ColorPalettes } from '@lib/shared/color-palettes';

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

const tsThumbScale = 5.3;
const TSThumb = styled.div`
  image-rendering: pixelated;
  width: ${uiSize(8 * tsThumbScale)};
  height: ${uiSize(8 * tsThumbScale)};
  background-size: ${uiSize(64 * tsThumbScale)};
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

interface Props {
  label: string;
  category: string;
  palette: number;
  tint0: number;
  tint1: number;
  tint2: number;
  onChange: (category: string, tint: Customization.Palette) => void;
}

export default function TintSelector({ label, category, palette, tint0, tint1, tint2, onChange }: Props) {
  const handleTint0Change = (target: HTMLInputElement) => {
    onChange(category, { palette, tint0: Number(target.value), tint1, tint2 });
  };

  const handleTint1Change = (target: HTMLInputElement) => {
    onChange(category, { palette, tint0, tint1: Number(target.value), tint2 });
  };

  const handleTint2Change = (target: HTMLInputElement) => {
    onChange(category, { palette, tint0, tint1, tint2: Number(target.value) });
  };

  const removePalette = () => {
    onChange(category, { palette: -1, tint0, tint1, tint2 });
  };

  const setPalette = (palette: Customization.Palettes) => {
    onChange(category, { palette: ColorPalettes[palette].hash, tint0, tint1, tint2 });
  };

  const setTints = (value: number) => {
    onChange(category, { palette, tint0: value, tint1: value, tint2: value });
  };

  return (
    <TSContainer>
      <h1>{label}</h1>

      <h2>Presets</h2>
      {/* TODO */}

      <h2>Palettes</h2>
      <TSPalettes>
        <TSPalette>
          <input type="radio" name="palette" value={0} checked={palette === -1} onClick={() => removePalette()} />
          None
        </TSPalette>
        {Object.keys(ColorPalettes).map((p: Customization.Palettes) => {
          return (
            <TSPalette>
              <input
                type="radio"
                name={`palette-${category}`}
                value={ColorPalettes[p].hash}
                checked={ColorPalettes[p].hash === palette >>> 0}
                onClick={() => setPalette(p)}
              />
              {p.replace('metaped_tint_', '').split('_').join(' ')}
            </TSPalette>
          );
        })}
      </TSPalettes>

      <h2>Dyes</h2>
      <TSOptions>
        {palette !== -1 &&
          new Array(ColorPalettes[ColorPaletteNames[palette >>> 0]]?.count || 0).fill(0).map((_, i) => (
            <TSOption key={i}>
              <TSThumb
                style={{
                  backgroundImage: `url(https://p--v.b-cdn.net/customization/palettes/${
                    ColorPaletteNames[palette >>> 0]
                  }_thumbs.png)`,
                  backgroundPosition: `-${uiSize((i % 8) * 8 * tsThumbScale)} -${uiSize(
                    Math.floor(i / 8) * 8 * tsThumbScale,
                  )}`,
                }}
                onClick={() => setTints(i)}
              />
              <TSRadio>
                <input
                  type="radio"
                  name={`primary-${category}`}
                  value={i}
                  checked={tint0 === i}
                  onChange={(e) => handleTint0Change(e.target as HTMLInputElement)}
                />
                1
              </TSRadio>
              <TSRadio>
                <input
                  type="radio"
                  name={`secondary-${category}`}
                  value={i}
                  checked={tint1 === i}
                  onChange={(e) => handleTint1Change(e.target as HTMLInputElement)}
                />
                2
              </TSRadio>
              <TSRadio>
                <input
                  type="radio"
                  name={`tertiary-${category}`}
                  value={i}
                  checked={tint2 === i}
                  onChange={(e) => handleTint2Change(e.target as HTMLInputElement)}
                />
                3
              </TSRadio>
            </TSOption>
          ))}
      </TSOptions>
    </TSContainer>
  );
}
