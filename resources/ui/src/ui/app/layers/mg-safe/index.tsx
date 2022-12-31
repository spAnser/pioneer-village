import { Howl, Howler } from 'howler';
import UIComponent from '@uiLib/ui-component';

import { MGSafeFrame, MGDial } from './styles';
import throttle from 'lodash/throttle';

export default class MGSafe extends UIComponent<UI.BaseProps, UI.BaseState, {}> {
  lastClick = Date.now();
  throttledOnmousemove = throttle(this.onmousemove, 5);
  mousedownBinding = this.onmousedown.bind(this);
  mousemoveBinding = this.throttledOnmousemove.bind(this);
  mouseupBinding = this.onmouseup.bind(this);

  centerX = window.innerWidth / 2;
  centerY = window.innerHeight / 2;

  mouseDown = false;
  dial = 0;
  dialMax = 100;
  rotationOffset = 0;
  rotation = 0;

  clicks = [
    new Howl({
      src: ['https://p--v.b-cdn.net/Safe-Lock-Click-A1.mp3'],
      html5: true,
    }),
    new Howl({
      src: ['https://p--v.b-cdn.net/Safe-Lock-Click-A2.mp3'],
      html5: true,
    }),
    new Howl({
      src: ['https://p--v.b-cdn.net/Safe-Lock-Click-A3.mp3'],
      html5: true,
    }),
    new Howl({
      src: ['https://p--v.b-cdn.net/Safe-Lock-Click-A4.mp3'],
      html5: true,
    }),
  ];

  constructor() {
    super();

    this.state = {
      show: false,
    };
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.mouseupBinding);
    document.addEventListener('mousemove', this.mousemoveBinding, { passive: true });
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.mouseupBinding);
    document.removeEventListener('mousemove', this.mousemoveBinding);
  }

  getRotation(e: MouseEvent) {
    const { clientX, clientY } = e;

    const angle = (Math.atan2(clientY - this.centerY, clientX - this.centerX) * 180) / Math.PI;

    return (Math.round(angle) + 90) % 360;
  }

  onmousedown(e: MouseEvent) {
    this.mouseDown = true;
    this.rotationOffset = this.getRotation(e) - this.rotation;
  }

  onmousemove(e: MouseEvent) {
    if (!this.mouseDown) {
      return;
    }
    this.rotation = (this.getRotation(e) - this.rotationOffset + 360) % 360;
    const newDial = Math.floor((this.rotation / 360) * this.dialMax);
    if (newDial !== this.dial) {
      const nextClick = Date.now();
      const deltaClick = nextClick - this.lastClick;
      this.lastClick = nextClick;
      const volumeAdjust = Math.min(Math.max((200 - deltaClick) / 100, 0), 1);

      this.clicks[newDial % this.clicks.length].volume(Math.random() * 0.25 + 0.15 - volumeAdjust * 0.05);
      this.clicks[newDial % this.clicks.length].rate(1 + volumeAdjust);
      this.clicks[newDial % this.clicks.length].play();
    }
    this.dial = newDial;
    this.forceUpdate();
  }

  onmouseup(e: MouseEvent) {
    this.mouseDown = false;
    this.forceUpdate();
  }

  render() {
    return (
      this.state.show && (
        <MGSafeFrame>
          <MGDial onMousedown={this.mousedownBinding} style={{ transform: `rotateZ(${this.rotation}deg)` }} />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              zIndex: 1,
              fontSize: '12px',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {this.dial}
          </div>
        </MGSafeFrame>
      )
    );
  }
}
