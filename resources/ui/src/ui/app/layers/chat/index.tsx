import type { Socket } from 'socket.io-client';

import { createRef } from 'preact';
import { debounce } from 'lodash';

import { onClient } from '@lib/ui';
import UIComponent from '@uiLib/ui-component';
import { uiSize } from '@uiLib/helpers';
import theme from '@styled/theme';
import Select from '@styled/components/Select';
import Suggestions from '@styled/components/Suggestions';

import { Frame, Messages, Message, Channel, Sender, Input, channels } from './styled';

export default class Chat extends UIComponent<UI.BaseProps, UI.Chat.State, {}> {
  closeOnEscape = true;
  refMessages = createRef<HTMLDivElement>();
  refInput = createRef<HTMLInputElement>();
  pastMessages: string[] = [];
  currentPastMessage: number = -1;

  constructor(
    props: UI.BaseProps,
    context: { socket: Socket<UISocketEvents, SocketServer.Client & SocketServer.ClientEvents> },
  ) {
    super();

    this.state = {
      show: false,
      partialShow: false,
      autoScroll: true,
      currentChannel: 'general',
      currentInput: '',
      suggestions: {
        '/ooc': {
          description: 'Out of Character',
        },
        '/emote': {
          description: 'Play an emote animation',
          children: ['sit1', 'sit2', 'sit3', 'sit4', 'sit5', 'dance', 'dance2', 'dance3'],
        },
        '/me': {
          description: 'Show me popup on character.',
        },
      },
      messages: [],
    };

    onClient('chat.state', (event) => {
      this.onEvent(event);
    });

    context.socket.on('chatMessage', (data) => {
      this.onMessage(data);
    });
  }

  onEvent(event: UI.Chat.Event) {
    if (!this.state.show && event.show) {
      setTimeout(() => {
        this.refInput.current?.focus();
      }, 10);
      event = { ...event, partialShow: false };
    }
    this.setState(event);
  }

  onMessage(chatMessages: UI.Chat.Message) {
    this.setState({
      messages: [...this.state.messages, chatMessages],
    });
    if (!this.state.show) {
      this.setState({
        partialShow: true,
      });
      this.closePartial();
    }
  }

  onEscape() {
    this.setState({
      show: false,
    });
  }

  closePartial = debounce(() => {
    if (this.state.partialShow) {
      this.setState({
        partialShow: false,
      });
    }
  }, 3000);

  componentDidUpdate() {
    if (this.state.autoScroll) {
      const messagesRef = this.refMessages.current;
      if (messagesRef) {
        messagesRef.scrollTo({ top: messagesRef.scrollHeight });
      }
    }
  }

  getChannelStyle(channel: string) {
    let backgroundColor = theme.colors.black.hex;
    let color = theme.colors.white.hex;
    if (channels[channel]) {
      if (theme.colors[channels[channel].bg]) {
        backgroundColor = theme.colors[channels[channel].bg].hex;
      }
      if (theme.colors[channels[channel].fg]) {
        color = theme.colors[channels[channel].fg].hex;
      }
    }
    return { backgroundColor, color };
  }

  handleMousewheel = debounce((e: WheelEvent) => {
    if (e.deltaY < 0) {
      this.setState({ autoScroll: false });
    } else {
      const messagesRef = this.refMessages?.current;
      if (messagesRef) {
        window.requestAnimationFrame(() => {
          const autoScroll = messagesRef.scrollTop >= messagesRef.scrollHeight - messagesRef.clientHeight - e.deltaY;
          if (autoScroll !== this.state.autoScroll) {
            this.setState({ autoScroll });
          }
        });
      }
    }
  }, 125);

  checkChannels(input: HTMLInputElement): boolean {
    for (const channel of Object.keys(channels)) {
      if (input.value.toLowerCase() === `/${channel} `) {
        input.value = '';
        this.selectChannel(channel);
      }
    }
    for (const channel of Object.keys(channels)) {
      if (input.value.toLowerCase() === '/s ' || input.value.toLowerCase() === '/g ') {
        input.value = '';
        this.selectChannel('general');
      }
    }
    return false;
  }

  handleKeyUp(e: KeyboardEvent) {
    const input = this.refInput?.current;
    if (input) {
      let text = input.value;
      if (this.state.currentInput !== text) {
        if (this.checkChannels(input)) {
          return;
        }
        if (input.value === '') {
          this.currentPastMessage = -1;
        }
        this.setState({
          currentInput: text,
        });
      }
      if (e.key === 'Enter') {
        input.value = '';
        if (text) {
          this.pastMessages.unshift(text);
          this.currentPastMessage = -1;
          console.log(this.context.socket);
          this.context.socket.emit('chatSend', {
            channel: this.state.currentChannel,
            text,
          });
        }
      }
      if (e.key === 'ArrowUp') {
        if (this.currentPastMessage < this.pastMessages.length - 1) {
          this.currentPastMessage++;
          input.value = this.pastMessages[this.currentPastMessage];
        }
      }
      if (e.key === 'ArrowDown') {
        if (this.currentPastMessage > -1) {
          this.currentPastMessage--;
          input.value = this.pastMessages[this.currentPastMessage] || '';
        }
      }
    }
  }

  selectChannel(channel: string) {
    this.setState({ currentChannel: channel });
  }

  render() {
    return (
      <Frame className={this.state.show ? 'active' : this.state.partialShow ? 'partial' : ''}>
        <Messages ref={this.refMessages} onWheel={this.handleMousewheel.bind(this)}>
          {this.state.messages.map((message) => (
            <Message style={this.getChannelStyle(message.channel)}>
              {message.channel && message.channel !== 'general' && (
                <Channel>[{channels[message.channel].label}]</Channel>
              )}
              {message.sender && (
                <Sender>
                  {message.sender} {message.id && <>[{message.id}]</>}
                </Sender>
              )}
              {message.text}
            </Message>
          ))}
        </Messages>
        <Input style={this.getChannelStyle(this.state.currentChannel)} className={this.state.show ? 'active' : ''}>
          <Select
            style="chat"
            options={channels}
            selected={this.state.currentChannel}
            onChange={(option) => this.selectChannel(option)}
          />
          <input ref={this.refInput} type="text" onKeyUp={(e) => this.handleKeyUp(e)} />
          <Suggestions
            input={this.refInput?.current?.value || ''}
            suggestions={this.state.suggestions}
            active={!!this.refInput?.current?.value}
            style={{
              position: 'absolute',
              top: `calc(100% + ${uiSize(8)})`,
              right: 0,
              left: 0,
            }}
          />
        </Input>
      </Frame>
    );
  }
}
