// hand-paper
import { RenderableProps } from 'preact';

import UIComponent from '@uiLib/ui-component';
import { emitClient, onClient } from '@lib/ui';
import { uiSize } from '@uiLib/helpers';
import theme from '@styled/theme';

import Hand from '@styled/fa5/light/hand-paper.svg';
import Person from '@styled/fa5/light/male.svg';
import Car from '@styled/fa5/light/car.svg';
import Bus from '@styled/fa5/light/bus-alt.svg';
import Truck from '@styled/fa5/light/truck.svg';
import Pickup from '@styled/fa5/light/truck-pickup.svg';
import Eye from '@styled/fa5/light/eye.svg';
import CashRegister from '@styled/fa5/light/cash-register.svg';

import { Frame, Choices } from './styled';
import Icon from './components/icon';

export default class Target extends UIComponent<UI.BaseProps, UI.TargetLayer.State, {}> {
  closeOnEscape = true;
  // resolver: ((value: { action: Target.Item; context: number|string }) => void) | null;

  state = {
    show: false,
    active: false,
    context: 0,
    type: -1,
    flag: '',
    actions: [],
  };

  constructor() {
    super();

    onClient('target.state', (data) => {
      if (!data.show && this.state.actions.length) {
        return;
      }
      this.onEvent(data);
    });
  }

  onEvent(targetEvent: UI.TargetLayer.Event) {
    this.setState(targetEvent);
  }

  onEscape() {
    this.setState({ show: false, active: false, type: -1, flag: '', context: 0, actions: [] });
  }

  performAction(action: Target.Item) {
    console.log('performAction', action);
    emitClient('target.action', this.state.context, action);
    this.onEscape();
    this.closeUI();
  }

  getIcon(): { style?: 'light' | 'regular' | 'solid' | 'duotone'; icon: string } {
    console.log(this.state.flag);
    switch (this.state.flag) {
      case 'isHorse':
        return { style: 'solid', icon: 'horse-saddle' };
      case 'isCashRegister':
        return { style: 'duotone', icon: 'cash-register' };
    }

    switch (this.state.type) {
      case 3:
        return { style: 'solid', icon: 'hand-paper' }; // Objects / Doors
      case 2:
        return { style: 'solid', icon: 'wagon-covered' };
      case 1:
        return { style: 'solid', icon: 'male' };
      case 0:
        return { style: 'solid', icon: 'hand-paper' };
      default:
        return { style: 'light', icon: 'eye' };
    }
  }

  render(props: RenderableProps<UI.BaseProps>, state: Readonly<UI.TargetLayer.State>) {
    const InteractIcon = this.getIcon();
    return (
      <Frame>
        {this.state.show && state.actions.length === 0 && (
          <Icon
            width={uiSize(28)}
            height={uiSize(28)}
            color={theme.colors[this.state.active ? 'white' : 'gray50'].hex}
            style={InteractIcon.style}
            name={InteractIcon.icon}
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
