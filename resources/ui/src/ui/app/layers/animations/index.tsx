import UIComponent from '@uiLib/ui-component';
import { emitClient, onClient, LoadResourceJson } from '@lib/ui';

import { AnimationsContainer } from './styles';

export default class HUD extends UIComponent<UI.BaseProps, UI.Animations.State, {}> {
  closeOnEscape = true;

  constructor() {
    super();

    this.state = {
      show: false,
      animations: {},
      query: '',
      dict: '',
      clip: '',
      flags: 0,
      entity: 0,
      blendInSpeed: 1,
      blendOutSpeed: -1,
    };

    this.loadAnimations();

    onClient('animations.state', (data) => {
      this.setState(data);
    });
  }

  async loadAnimations() {
    const animations = await LoadResourceJson('rdr3-shared', 'resources/animations.json');

    this.setState({ animations });
  }

  onEvent(hudEvent: UI.HUD.Event) {
    this.setState(hudEvent);
  }

  onEscape() {
    this.setState({
      show: false,
    });
  }

  setQuery(target: HTMLInputElement) {
    this.setState({ query: target.value });
  }

  setDict(target: HTMLInputElement) {
    this.setState({ dict: target.value });
  }

  setClip(target: HTMLInputElement) {
    this.setState({ clip: target.value });
  }

  getFlags() {
    const flagStrings: String[] = [];
    if ((this.state.flags & 1) !== 0) {
      flagStrings.push('AnimFlag.REPEAT');
    }
    if ((this.state.flags & 2) !== 0) {
      flagStrings.push('AnimFlag.STOP_LAST_FRAME');
    }
    if ((this.state.flags & 4) !== 0) {
      flagStrings.push('AnimFlag.UNK_4');
    }
    if ((this.state.flags & 8) !== 0) {
      flagStrings.push('AnimFlag.UPPERBODY');
    }
    if ((this.state.flags & 16) !== 0) {
      flagStrings.push('AnimFlag.ENABLE_PLAYER_CONTROL');
    }
    if ((this.state.flags & 32) !== 0) {
      flagStrings.push('AnimFlag.CANCELABLE');
    }
    if ((this.state.flags & 64) !== 0) {
      flagStrings.push('AnimFlag.UNK_64');
    }
    if ((this.state.flags & 128) !== 0) {
      flagStrings.push('AnimFlag.OFFSET_POSITION');
    }
    if ((this.state.flags & 256) !== 0) {
      flagStrings.push('AnimFlag.OFFSET_POSITION_ENTITY');
    }
    if ((this.state.flags & 512) !== 0) {
      flagStrings.push('AnimFlag.UNK_512');
    }
    if ((this.state.flags & 1024) !== 0) {
      flagStrings.push('AnimFlag.UNK_1024');
    }
    if ((this.state.flags & 2048) !== 0) {
      flagStrings.push('AnimFlag.UNK_2048');
    }
    if ((this.state.flags & 4096) !== 0) {
      flagStrings.push('AnimFlag.UNK_4096');
    }
    if ((this.state.flags & 8192) !== 0) {
      flagStrings.push('AnimFlag.UNK_8192');
    }
    if ((this.state.flags & 16384) !== 0) {
      flagStrings.push('AnimFlag.UNK_16384');
    }
    if ((this.state.flags & 32768) !== 0) {
      flagStrings.push('AnimFlag.UNK_IS_ENTITY');
    }
    return flagStrings.join(' + ');
  }

  setFlags(value: number) {
    this.setState({ flags: value });
  }

  updateFlag(target: HTMLInputElement) {
    const flagNumber = Number(target.value);
    let newFlags = this.state.flags;
    if (target.checked) {
      newFlags = this.state.flags | flagNumber;
    } else {
      newFlags -= this.state.flags & flagNumber;
    }
    this.setFlags(newFlags);
  }

  setEntity(target: HTMLInputElement) {
    this.setState({ entity: Number(target.value) });
  }

  setBlendInSpeed(target: HTMLInputElement) {
    this.setState({ blendInSpeed: Number(target.value) });
  }

  setBlendOutSpeed(target: HTMLInputElement) {
    this.setState({ blendOutSpeed: Number(target.value) });
  }

  playAnim() {
    emitClient('animations.play-anim', {
      dict: this.state.dict,
      clip: this.state.clip,
      flags: this.state.flags,
      blendInSpeed: this.state.blendInSpeed,
      blendOutSpeed: this.state.blendOutSpeed,
      entity: this.state.entity,
    });
  }

  stopAnim() {
    emitClient('animations.stop-anim', { entity: this.state.entity });
  }

  render() {
    return (
      this.state.show && (
        <AnimationsContainer>
          <div>
            <input
              name="query"
              type="text"
              value={this.state.query}
              onChange={(e) => this.setQuery(e.target as HTMLInputElement)}
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <select
              style={{ width: '66%' }}
              onChange={(e) => this.setDict(e.target as HTMLInputElement)}
              value={this.state.dict}
            >
              <option value="" selected>
                Choose Dictionary
              </option>
              {Object.keys(this.state.animations).map((animationDict) => {
                let matches = true;
                if (this.state.query !== '') {
                  const terms = this.state.query.toLowerCase().split(' ');
                  for (const term of terms) {
                    if (term.startsWith('!')) {
                      matches = !animationDict.toLowerCase().includes(term.substring(1));
                    } else {
                      matches = animationDict.toLowerCase().includes(term);
                    }
                    if (!matches) {
                      break;
                    }
                  }
                }
                return (
                  matches && (
                    <option key={animationDict} value={animationDict}>
                      {animationDict}
                    </option>
                  )
                );
              })}
            </select>
            <select
              style={{ width: '33%' }}
              onChange={(e) => this.setClip(e.target as HTMLInputElement)}
              value={this.state.clip}
              disabled={this.state.dict === ''}
            >
              <option value="" selected>
                Choose Clip
              </option>
              {this.state.dict !== '' &&
                Object.values(this.state.animations[this.state.dict]).map((animation) => (
                  <option key={animation} value={animation}>
                    {animation}
                  </option>
                ))}
            </select>
            <button onClick={this.playAnim.bind(this)}>Play</button>
            <button onClick={this.stopAnim.bind(this)}>Stop</button>
          </div>
          <div>
            <table>
              <tr>
                <td>
                  <label>
                    <input type="checkbox" value={0} checked={true} disabled />
                    <span>Normal</span>
                  </label>
                </td>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      value={1}
                      checked={(this.state.flags & 1) !== 0}
                      onChange={(e) => this.updateFlag(e.target as HTMLInputElement)}
                    />
                    <span>Repeat</span>
                  </label>
                </td>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      value={2}
                      checked={(this.state.flags & 2) !== 0}
                      onChange={(e) => this.updateFlag(e.target as HTMLInputElement)}
                    />
                    <span>Stop Last Frame</span>
                  </label>
                </td>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      value={4}
                      checked={(this.state.flags & 4) !== 0}
                      onChange={(e) => this.updateFlag(e.target as HTMLInputElement)}
                    />
                    <span>Unknown 4</span>
                  </label>
                </td>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      value={8}
                      checked={(this.state.flags & 8) !== 0}
                      onChange={(e) => this.updateFlag(e.target as HTMLInputElement)}
                    />
                    <span>UpperBody</span>
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      value={16}
                      checked={(this.state.flags & 16) !== 0}
                      onChange={(e) => this.updateFlag(e.target as HTMLInputElement)}
                    />
                    <span>Enable Player Control</span>
                  </label>
                </td>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      value={32}
                      checked={(this.state.flags & 32) !== 0}
                      onChange={(e) => this.updateFlag(e.target as HTMLInputElement)}
                    />
                    <span>Cancelable</span>
                  </label>
                </td>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      value={64}
                      checked={(this.state.flags & 64) !== 0}
                      onChange={(e) => this.updateFlag(e.target as HTMLInputElement)}
                    />
                    <span>Unknown 64</span>
                  </label>
                </td>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      value={128}
                      checked={(this.state.flags & 128) !== 0}
                      onChange={(e) => this.updateFlag(e.target as HTMLInputElement)}
                    />
                    <span>Offset Position</span>
                  </label>
                </td>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      value={256}
                      checked={(this.state.flags & 256) !== 0}
                      onChange={(e) => this.updateFlag(e.target as HTMLInputElement)}
                    />
                    <span>Offset Position Entity</span>
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      value={512}
                      checked={(this.state.flags & 512) !== 0}
                      onChange={(e) => this.updateFlag(e.target as HTMLInputElement)}
                    />
                    <span>Unk 512</span>
                  </label>
                </td>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      value={1024}
                      checked={(this.state.flags & 1024) !== 0}
                      onChange={(e) => this.updateFlag(e.target as HTMLInputElement)}
                    />
                    <span>Unk 1024</span>
                  </label>
                </td>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      value={2048}
                      checked={(this.state.flags & 2048) !== 0}
                      onChange={(e) => this.updateFlag(e.target as HTMLInputElement)}
                    />
                    <span>Unk 2048</span>
                  </label>
                </td>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      value={4096}
                      checked={(this.state.flags & 4096) !== 0}
                      onChange={(e) => this.updateFlag(e.target as HTMLInputElement)}
                    />
                    <span>Unk 4096</span>
                  </label>
                </td>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      value={8192}
                      checked={(this.state.flags & 8192) !== 0}
                      onChange={(e) => this.updateFlag(e.target as HTMLInputElement)}
                    />
                    <span>Unk 8192</span>
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      value={16384}
                      checked={(this.state.flags & 16384) !== 0}
                      onChange={(e) => this.updateFlag(e.target as HTMLInputElement)}
                    />
                    <span>Unk 16384</span>
                  </label>
                </td>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      value={32768}
                      checked={(this.state.flags & 32768) !== 0}
                      onChange={(e) => this.updateFlag(e.target as HTMLInputElement)}
                    />
                    <span>Unknown Is Entity</span>
                  </label>
                </td>
              </tr>
            </table>
          </div>
          <div>
            <label>Entity:</label>
            <input
              name="entity"
              type="number"
              step={1}
              value={this.state.entity}
              onChange={(e) => this.setEntity(e.target as HTMLInputElement)}
            />
            <label>Blend In Speed:</label>
            <input
              name="blendInSpeed"
              type="number"
              step={1}
              value={this.state.blendInSpeed}
              onChange={(e) => this.setBlendInSpeed(e.target as HTMLInputElement)}
            />
            <label>Blend Out Speed:</label>
            <input
              name="blendOutSpeed"
              type="number"
              step={1}
              value={this.state.blendOutSpeed}
              onChange={(e) => this.setBlendOutSpeed(e.target as HTMLInputElement)}
            />
          </div>
          <div>
            <pre contentEditable={true}>{`{
    dict: '${this.state.dict}',
    anim: '${this.state.clip}',${
              this.state.flags !== 0
                ? `
    flags: ${this.getFlags()},`
                : ''
            }
    blendInSpeed: ${this.state.blendInSpeed},
    blendOutSpeed: ${this.state.blendOutSpeed},
}`}</pre>
          </div>
        </AnimationsContainer>
      )
    );
  }
}
