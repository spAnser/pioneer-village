// hand-paper
import { RenderableProps } from 'preact';

import UIComponent from '@uiLib/ui-component';
import { emitClient, onClient } from '@lib/ui';
import Hand from '@styled/fa5/light/hand-paper.svg';
import { uiSize } from '@uiLib/helpers';
import theme from '@styled/theme';

import { Frame, Choices } from './styled';
import Icon from './components/icon';

export default class Target extends UIComponent<UI.BaseProps, UI.TargetLayer.State, {}> {
  closeOnEscape = true;
  // resolver: ((value: { action: Target.Item; context: number|string }) => void) | null;

  state = {
    show: false,
    active: false,
    context: 0,
    actions: [],
  };

  constructor() {
    super();

    onClient('target.state', (data) => {
      if (!data.show && this.state.actions.length) {
        return;
      }
      this.onEvent(data);
      // return new Promise((resolve) => {
      //   this.resolver = resolve;
      // });
    });
  }

  onEvent(targetEvent: UI.TargetLayer.Event) {
    this.setState(targetEvent);
  }

  onEscape() {
    this.setState({ show: false, context: 0, actions: [] });
    // if (this.resolver) {
    //   this.resolver({ action: 'interact.cancelled', context: this.state.context });
    //   this.resolver = null;
    // }
  }

  performAction(action: Target.Item) {
    // if (this.resolver) {
    //   this.resolver({ action, context: this.state.context });
    //   this.resolver = null;
    // }
    console.log('performAction', action);
    emitClient('target.action', this.state.context, action);
    this.onEscape();
    this.closeUI();
  }

  render(props: RenderableProps<UI.BaseProps>, state: Readonly<UI.TargetLayer.State>) {
    return (
      <Frame>
        {this.state.show && state.actions.length === 0 && (
          <Hand
            width={uiSize(28)}
            height={uiSize(28)}
            color={theme.colors[this.state.active ? 'white' : 'gray50'].hex}
          />
        )}
        <Choices>
          {state.actions.map((action) => (
            <li key={action.id} onClick={() => this.performAction(action)}>
              <Icon name={action.icon} /> {action.label}
            </li>
          ))}
        </Choices>
      </Frame>
    );
  }
}
