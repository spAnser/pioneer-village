import { Component } from 'preact';
import styled from 'styled-components';

import theme from '@styled/theme';
import { uiSize } from '@uiLib/helpers';
import { emitClient } from '@lib/ui';
import RangeSlider from '../components/RangeSlider';
import TrashAlt from '@styled/fa5/solid/trash-alt.svg';
import TintSelector from './TintSelector';

const OSContainer = styled.div`
  border-top: 2px solid ${theme.colors.white.hex};
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: ${uiSize(18)};
  user-select: none;
`;

const OSLayer = styled.div`
  border-bottom: 2px dashed ${theme.colors.white.hex};
  padding-block: ${uiSize(16)};
  display: flex;
  flex-direction: column;
  gap: ${uiSize(8)};
`;

const OSRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${uiSize(16)};
  justify-content: space-between;

  svg {
    margin: ${uiSize(4)};
  }
`;

const OSAddLayer = styled.button`
  margin-top: ${uiSize(16)};
`;

interface Props {
  onChange?: (layers: UI.Customization.LayerData[]) => void;
  overlays: Record<string, UI.Customization.OverlayJson>;
}

interface State {
  active: boolean;
  layers: UI.Customization.LayerData[];
}

export default class OverlaySelector extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      active: false,
      layers: [
        {
          uid: 'a',
          id: '',
          opacity: 1.0,
        },
        {
          uid: 'b',
          id: '',
          opacity: 1.0,
        },
        {
          uid: 'c',
          id: '',
          opacity: 1.0,
        },
      ],
    };
  }

  getUniqueId() {
    while (true) {
      const uid = Math.random().toString(36).substring(2, 15);
      if (!this.state.layers.some((layer) => layer.uid === uid)) {
        return uid;
      }
      console.warn('Duplicate UID found, generating a new one.');
    }
  }

  addLayer() {
    console.log(this.props.overlays);
    const layers = [...this.state.layers];

    layers.push({
      uid: this.getUniqueId(),
      id: '',
      opacity: 1.0,
    });

    this.setState({ layers });
  }

  setLayerId(uid: string, id: string) {
    const layers = [...this.state.layers];
    const index = layers.findIndex((layer) => layer.uid === uid);
    if (index === -1) {
      console.error('Layer not found:', uid);
      return;
    }
    layers[index].id = id;

    this.setState({ layers });
    this.props.onChange(layers);
  }

  setLayerOpacity(uid: string, value: number) {
    const layers = [...this.state.layers];
    const index = layers.findIndex((layer) => layer.uid === uid);
    if (index === -1) {
      console.error('Layer not found:', uid);
      return;
    }
    layers[index].opacity = value;

    this.setState({ layers });
    this.props.onChange(layers);
  }

  setLayerPalette(uid: string, palette: UI.Customization.Palette) {
    const layers = [...this.state.layers];
    const index = layers.findIndex((layer) => layer.uid === uid);
    if (index === -1) {
      console.error('Layer not found:', uid);
      return;
    }
    layers[index].palette = palette;

    this.setState({ layers });
    this.props.onChange(layers);
  }

  canUsePalette(uid: string): boolean {
    const layer = this.state.layers.find((layer) => layer.uid === uid);
    if (!layer) {
      console.error('Layer not found:', uid);
      return false;
    }
    for (const overlay of Object.entries(this.props.overlays)) {
      const [_category, overlayData] = overlay;
      if (overlayData.canUsePalette && overlayData.components.some((comp) => comp.id === layer.id)) {
        return true;
      }
    }
    return false;
  }

  deleteLayer(uid: string) {
    const layers = [...this.state.layers];
    const index = layers.findIndex((layer) => layer.uid === uid);
    if (index === -1) {
      console.error('Layer not found:', uid);
      return;
    }
    layers.splice(index, 1);
    this.setState({ layers });
  }

  render() {
    return (
      <OSContainer>
        {this.state.layers.map((layer, index) => (
          <OSLayer key={layer.uid}>
            <OSRow>
              <div>
                Layer Id: {index} | {layer.uid}
              </div>
              <TrashAlt
                width={uiSize(16)}
                onClick={() => {
                  this.deleteLayer(layer.uid);
                }}
              />
            </OSRow>

            <OSRow>
              <div>Texture:</div>
              <select
                onChange={(e) => {
                  const value = (e.target as HTMLSelectElement).value;
                  this.setLayerId(layer.uid, value);
                }}
                data-layer={index}
              >
                <option>Choose Layer Texture</option>
                {Object.entries(this.props.overlays).map(([category, overlays]) => (
                  <optgroup key={category} label={category}>
                    {overlays.components.map((overlay, index) => (
                      <option key={index} value={overlay.id}>
                        {overlay.id}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </OSRow>
            <RangeSlider
              label="Opacity"
              min={0}
              max={1}
              step={0.01}
              defaultValue={layer.opacity}
              className="layer"
              onChange={(value) => {
                this.setLayerOpacity(layer.uid, value);
              }}
            />
            {this.canUsePalette(layer.uid) && (
              <TintSelector
                onChange={(uid, palette) => {
                  this.setLayerPalette(uid, palette);
                }}
                identifier={layer.uid}
                palette={layer.palette?.palette || 0}
                tint0={layer.palette?.tint0 || 0}
                tint1={layer.palette?.tint1 || 0}
                tint2={layer.palette?.tint2 || 0}
              />
            )}
          </OSLayer>
        ))}
        <OSAddLayer onClick={this.addLayer.bind(this)}>Add Layer</OSAddLayer>
      </OSContainer>
    );
  }
}
