import { Component } from 'preact';

import 'normalize.css';
import './app.scss';
import { Catcher } from './catcher';

import { Button } from '@styled/core';
import { Socket } from 'socket.io-client';

String.prototype.GetHashKey = function (this: string): number {
  const keyLowered = this.toLowerCase();
  const length = this.length;
  let hash, i;

  for (hash = i = 0; i < length; i++) {
    hash += keyLowered.charCodeAt(i);
    hash += hash << 10;
    hash ^= hash >>> 6;
  }

  hash += hash << 3;
  hash ^= hash >>> 11;
  hash += hash << 15;

  return hash;
};

// @ts-expect-error
const requiredLayers = require.context('./layers', true, /index\.tsx$/);
const layers: any[] = [];
for (const layer of requiredLayers.keys()) {
  const layerDefault = requiredLayers(layer);
  layers.push(layerDefault);
}

export default class App extends Component<UI.App.Props, UI.App.State> {
  state = {
    isFramed: !!window.frameElement,
    bg: '',
  };

  constructor() {
    super();

    if (!this.state.isFramed) {
      this.setBG('daytime');
    }
  }

  setBG(bg: string) {
    this.setState({ bg });
  }

  getChildContext(): { socket: Socket<SocketServer.Client & SocketServer.ClientEvents, UISocketEvents> } {
    return {
      socket: this.props.socket,
    };
  }

  render() {
    return (
      <div id="app" className={`${this.state.bg ? `app--${this.state.bg}` : ''} app--16-9`}>
        {!this.state.isFramed && (
          <div style={{ position: 'absolute', top: 0, right: 0 }}>
            <Button onClick={() => this.setBG('daytime')}>Daytime</Button>
            <Button onClick={() => this.setBG('inside')}>Inside</Button>
            <Button onClick={() => this.setBG('nighttime')}>Nighttime</Button>
          </div>
        )}
        <Catcher reloadWindow={this.state.isFramed}>
          {layers.map((layer: any) => (
            <layer.default socket={this.props.socket} />
          ))}
        </Catcher>
      </div>
    );
  }
}
