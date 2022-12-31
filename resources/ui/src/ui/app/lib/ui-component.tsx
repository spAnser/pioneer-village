import { emitClient } from '@lib/ui/comms/client';
import { Component, ComponentChild, RenderableProps } from 'preact';
import EventBus from './event-bus';
import { Socket } from 'socket.io-client';

export default abstract class UIComponent<P, S extends UI.BaseState, C> extends Component<P, S> {
  context: { socket: Socket<UISocketEvents, SocketServer.Client & SocketServer.ClientEvents> } & C;

  closeOnEscape?: boolean;
  onEscape?(): void;

  keyupWrapperHandler: (e: KeyboardEvent) => void;

  _onKeyupWrapper(e: KeyboardEvent) {
    if (!this.state.show) {
      return;
    }
    if (e.key === 'Escape') {
      this.onEscape && this.onEscape();
      this.closeOnEscape && this.closeUI();
    }
  }

  closeUI() {
    emitClient('nui.close');
  }

  componentWillMount() {
    if (this.onEscape) {
      this.keyupWrapperHandler = this._onKeyupWrapper.bind(this);

      EventBus.on<KeyboardEvent>('keyup', this.keyupWrapperHandler);
    }
  }

  componentWillUnmount() {
    if (this.keyupWrapperHandler) {
      EventBus.off('keyup', this.keyupWrapperHandler);
    }
  }

  componentDidCatch(error: Error, info: any) {
    console.log('ComponentDidCatch 2');
    // console.error('error', error);
    // console.info('info', info);
  }
}
