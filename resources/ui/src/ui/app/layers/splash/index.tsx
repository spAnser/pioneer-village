import styled from 'styled-components';

import UIComponent from '@uiLib/ui-component';
import { onClient } from '@lib/ui';
import { uiSize } from '@uiLib/helpers';
import { FadeIn, FadeOut } from '@styled/animations';
import theme from '@styled/theme';

const SplashContainer = styled.div`
  position: fixed;
  inset: 0;
  background-color: #222;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Homemade Apple', cursive;
  color: ${theme.colors.white.hex};
  pointer-events: none;
  z-index: 10000;
  animation: ${FadeIn} 1s forwards;

  &.fade-out {
    animation: ${FadeOut} 2s forwards;
  }

  h1 {
    font-size: ${uiSize(50)};
  }

  p {
    font-size: ${uiSize(16)};
  }
`;

export default class Splash extends UIComponent<UI.BaseProps, UI.Splash.State, {}> {
  constructor() {
    super();

    this.state = {
      show: false,
      fadeOut: false,
    };

    onClient('splash.state', (data) => {
      if (data.show) {
        this.setState({ ...data, fadeOut: false });
      } else {
        this.setState({ fadeOut: true });
        setTimeout(() => {
          this.setState(data);
        }, 2000);
      }
    });
  }

  onEvent(hudEvent: UI.HUD.Event) {
    this.setState(hudEvent);
  }

  render() {
    return (
      this.state.show && (
        <SplashContainer className={this.state.fadeOut ? 'fade-out' : ''}>
          <h1>Pioneer Village</h1>
          <p>Never break character!</p>
        </SplashContainer>
      )
    );
  }
}
