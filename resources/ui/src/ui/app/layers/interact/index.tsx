import UIComponent from '@uiLib/ui-component';
import { onClient } from '@lib/ui';

import { POI } from './styled';

export default class Interact extends UIComponent<UI.BaseProps, UI.Interact.State, {}> {
  constructor() {
    super();

    this.state = {
      show: true,
      pois: [],
      active: null,
    };

    onClient('interact.pois', (pois) => {
      this.setState({ ...this.state, pois });
    });

    onClient('interact.active', (active) => {
      this.setState({ ...this.state, active });
    });
  }

  render() {
    return this.state.pois.map(
      (poi) =>
        poi.distance < 5 && (
          <POI
            className={poi.id === this.state.active ? 'active' : ''}
            style={{
              left: `${poi.screenX * 100}%`,
              top: `${poi.screenY * 100}%`,
              transform: `scale(${(5 - poi.distance) / 5})`,
            }}
          >
            {poi.id === this.state.active && 'E'}
          </POI>
        ),
    );
  }
}
