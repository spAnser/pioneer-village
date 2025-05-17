import type { Socket } from 'socket.io-client';

import { onClient } from '@lib/ui';
import UIComponent from '@uiLib/ui-component';

import Server from '@styled/fa5/solid/server.svg';
import Desktop from '@styled/fa5/solid/desktop.svg';
import Info from '@styled/fa5/solid/info.svg';
import TrashAlt from '@styled/fa5/solid/trash-alt.svg';
import DiceOne from '@styled/fa5/solid/dice-one.svg';
import DiceTwo from '@styled/fa5/solid/dice-two.svg';
import DiceThree from '@styled/fa5/solid/dice-three.svg';
import DiceFour from '@styled/fa5/solid/dice-four.svg';
import DiceFive from '@styled/fa5/solid/dice-five.svg';
import DiceSix from '@styled/fa5/solid/dice-six.svg';

import { Frame, Item, List, Filter, FilterItem } from './styled';
import { debounce } from 'lodash';
import { createRef } from 'preact';
import { Delay } from '@lib/functions';

export default class Log extends UIComponent<UI.BaseProps, UI.Log.State, {}> {
  refLog = createRef<HTMLDivElement>();

  closeOnEscape = true;

  constructor(
    props: UI.BaseProps,
    context: { socket: Socket<UISocketEvents, SocketServer.Client & SocketServer.ClientEvents> },
  ) {
    super();

    this.state = {
      show: false,
      autoScroll: true,
      scrollOverride: 0,
      filter: new Set(),
      reverseFilter: new Set(),
      messages: [],
      colors: {},
    };

    onClient('log.state', (event) => {
      this.setState(event);
    });

    onClient('log.message', (data, overrideSource = 'client') => {
      this.addMessage(overrideSource, data);
    });

    context.socket.on('log.message', (data) => {
      this.addMessage('server', data);
    });
  }

  addMessage(source: UI.Log.Source, data: UI.Log.Data) {
    let colors = this.state.colors;
    const color = colors[data.resource];

    if (!color) {
      colors = { ...colors, [data.resource]: this.randomColor() };
    }

    // console.log('addMessage', data);
    if (!data.message) {
      console.error('No log message', data);
      return;
    }

    this.setState({
      messages: [
        ...this.state.messages.splice(-999),
        {
          source,
          resource: data.resource,
          message: data.message,
        },
      ],
      colors,
    });
  }

  randomizeColors() {
    const colors = this.state.colors;

    for (const resource of Object.keys(this.state.colors)) {
      colors[resource] = this.randomColor();
    }

    this.setState({ colors });
  }

  randomColor(): UI.Log.ColorData {
    let isNew = false;
    let h: number;
    let s: number;
    let l: number;
    let tries = 0;
    do {
      h = Math.floor(Math.random() * 360);
      s = 50 + Math.floor(Math.random() * 50);
      l = 70 + Math.floor(Math.random() * 10);

      isNew = true;
      for (const color of Object.values(this.state.colors)) {
        if (Math.abs(color.h - h) < 10 && Math.abs(color.s - s) < 5) {
          isNew = false;
        }
      }
      tries++;
      if (tries > 200) {
        isNew = true;
      }
    } while (!isNew);

    const hsl = `hsl(${h}, ${s}%, ${l}%)`;

    return { h, s, l, hsl };
  }

  componentDidUpdate() {
    if (this.state.autoScroll) {
      const logRef = this.refLog.current;
      if (logRef) {
        logRef.scrollTo({ top: logRef.scrollHeight });
      }
    }
  }

  handleMousewheel = debounce((e: WheelEvent) => {
    if (e.deltaY < 0) {
      this.setState({ autoScroll: false });
    } else {
      const logRef = this.refLog?.current;
      if (logRef) {
        window.requestAnimationFrame(() => {
          const autoScroll = logRef.scrollTop >= logRef.scrollHeight - logRef.clientHeight - e.deltaY;
          if (autoScroll !== this.state.autoScroll) {
            this.setState({ autoScroll });
          }
        });
      }
    }
  }, 125);

  onEscape() {
    this.setState({
      show: false,
      autoScroll: true,
    });
    setTimeout(async () => {
      this.componentDidUpdate();
      await Delay(100);
      this.componentDidUpdate();
    }, 400);
  }

  clearFilter() {
    this.setState({ filter: new Set(), reverseFilter: new Set() });
  }

  toggleResource(resource: string) {
    if (this.state.filter.has(resource)) {
      this.state.filter.delete(resource);
      // if (this.state.filter.size === 0) {
      //   this.state.reverseFilter.clear();
      // }
    } else {
      if (this.state.filter.size > 0 || !this.state.reverseFilter.has(resource)) {
        this.state.filter.add(resource);
      }
      this.state.reverseFilter.delete(resource);
    }
    this.setState({
      filter: new Set(this.state.filter.values()),
      reverseFilter: new Set(this.state.reverseFilter.values()),
    });
  }

  toggleReverseResource(resource: string) {
    if (this.state.reverseFilter.has(resource)) {
      this.state.reverseFilter.delete(resource);
    } else {
      if (!this.state.filter.has(resource) && this.state.filter.size === 0) {
        this.state.reverseFilter.add(resource);
      }

      this.state.filter.delete(resource);
    }
    this.setState({
      filter: new Set(this.state.filter.values()),
      reverseFilter: new Set(this.state.reverseFilter.values()),
    });
  }

  getClassName(resource: string) {
    if (this.state.filter.has(resource)) {
      return 'active';
    }
    if (!this.state.reverseFilter.has(resource) && this.state.filter.size === 0) {
      return '';
    }
    return 'inactive';
  }

  shouldShow(resource: string) {
    if (this.state.filter.size > 0 && !this.state.filter.has(resource)) {
      return false;
    }
    if (this.state.reverseFilter.has(resource)) {
      return false;
    }
    return true;
  }

  render() {
    const randomDice = () => {
      const dice = [DiceOne, DiceTwo, DiceThree, DiceFour, DiceFive, DiceSix];
      const random = Math.floor(Math.random() * 6);
      return dice[random];
    };

    const Dice = randomDice();

    return (
      <>
        <Frame ref={this.refLog}>
          <List id="log" className={this.state.show ? 'active' : undefined} onWheel={this.handleMousewheel.bind(this)}>
            {this.state.messages.map(
              ({ source, resource, message }) =>
                this.shouldShow(resource) && (
                  <Item>
                    <i data-source={source}>
                      {source === 'server' && <Server />} {source === 'client' && <Desktop />}
                    </i>
                    <span style={{ backgroundColor: this.state.colors[resource].hsl }}>{resource}</span>
                    <pre>{message}</pre>
                  </Item>
                ),
            )}
            {this.state.messages.length === 0 && (
              <Item>
                <i data-source="client">
                  <Info />
                </i>
                <pre>No messages</pre>
              </Item>
            )}
          </List>
        </Frame>
        {this.state.show && (
          <Filter>
            <FilterItem className="red">
              <TrashAlt onClick={() => this.setState({ messages: [] })} />
            </FilterItem>
            <FilterItem>
              <Dice className="dice" onClick={() => this.randomizeColors()} />
            </FilterItem>
            <FilterItem
              className={
                this.state.filter.size === 0 &&
                this.state.reverseFilter.size !== Object.values(this.state.colors).length
                  ? ''
                  : 'inactive'
              }
              onClick={this.clearFilter.bind(this)}
            >
              all
            </FilterItem>
            {Object.entries(this.state.colors).map(([resource, color]) => (
              <FilterItem
                style={{ backgroundColor: color.hsl }}
                className={this.getClassName(resource)}
                onClick={() => {
                  this.toggleResource(resource);
                }}
                onContextMenu={() => {
                  this.toggleReverseResource(resource);
                }}
              >
                {resource}
              </FilterItem>
            ))}
          </Filter>
        )}
      </>
    );
  }
}
