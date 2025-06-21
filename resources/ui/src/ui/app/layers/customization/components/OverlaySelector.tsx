import { Component, createRef } from 'preact';
import styled from 'styled-components';

import theme from '@styled/theme';
import { uiSize } from '@uiLib/helpers';
import { emitClient } from '@lib/ui';

const OSContainer = styled.div`
  border-top: 2px solid ${theme.colors.white.hex};
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: ${uiSize(18)};
  user-select: none;
`;

interface Props {
  onChange?: (style: number, option: number) => void;
  overlays: Record<string, UI.Customization.OverlayJson>;
}

interface State {
  active: boolean;
  layers: UI.Customization.OverlayJson[];
}

export default class OverlaySelector extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      active: false,
      layers: [],
    };
  }

  addLayer(overlay: UI.Customization.OverlayJsonData) {
    console.log('Adding layer:', overlay);
    emitClient('overlay.test.thing', overlay);
  }

  render() {
    return (
      <OSContainer>
        {/*list of overlay layers*/}
        {this.state.layers.map((layer, index) => (
          <div key={index} className="overlay-layer">
            <span>{layer.name}</span>
          </div>
        ))}

        {/*list overlays by category the category is the overlays object key*/}
        {Object.entries(this.props.overlays).map(([category, overlays]) => (
          <div key={category} className="overlay-category">
            <h3>{category}</h3>
            {overlays.components.map((overlay, index) => (
              <div key={index} className="overlay-item" onClick={() => this.addLayer(overlay)}>
                <span>{overlay.id}</span>
              </div>
            ))}
          </div>
        ))}
      </OSContainer>
    );
  }
}
