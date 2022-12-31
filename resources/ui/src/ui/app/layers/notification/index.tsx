import UIComponent from '@uiLib/ui-component';
import { onClient } from '@lib/ui';

import { Notif } from './styled';
import theme from '@styled/theme';

export default class Notification extends UIComponent<UI.BaseProps, UI.Notification.State, {}> {
  constructor() {
    super();

    this.state = {
      show: true,
      active: false,
      notifications: [],
      currentNotification: null,
    };

    onClient('notification.notify', (text, duration = 3000, bgColor = 'blue', fgColor = 'white', centered = false) => {
      this.setState({ notifications: [...this.state.notifications, { text, duration, bgColor, fgColor, centered }] });
    });
  }

  componentDidUpdate() {
    this.handleActive();
  }

  handleActive() {
    if (this.state.active) {
      return;
    }
    const notification = this.state.notifications.shift();
    if (!notification) {
      return;
    }
    this.setState({ currentNotification: notification, active: true });
    setTimeout(() => {
      this.setState({ active: false, currentNotification: null });
    }, notification.duration);
  }

  onEvent(notificationEvent: UI.Notification.Event) {
    this.setState(notificationEvent);
  }

  render() {
    return (
      <>
        {this.state.currentNotification && (
          <Notif
            className={`${this.state.active ? 'active' : ''}${
              this.state.currentNotification.centered ? ' centered' : ''
            }`}
            style={{
              backgroundColor: theme.colors[this.state.currentNotification.bgColor].hex,
              color: theme.colors[this.state.currentNotification.fgColor].hex,
            }}
          >
            {this.state.currentNotification.text}
          </Notif>
        )}
      </>
    );
  }
}
