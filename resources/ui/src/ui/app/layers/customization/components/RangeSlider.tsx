import { Component } from 'preact';
import styled from 'styled-components';

import theme from '@styled/theme';
import { uiSize } from '@uiLib/helpers';

const RContainer = styled.div`
  border-top: 2px solid ${theme.colors.white.hex};
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: ${uiSize(18)};
  user-select: none;

  input {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;

    border: 2px solid ${theme.colors.white.hex};

    height: ${uiSize(20)};
    padding: ${uiSize(2)};

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: ${uiSize(14)};
      height: ${uiSize(14)};
      background-color: ${theme.colors.white.hex};
    }
  }

  &.layer {
    border: none;
    padding: 0;

    display: flex;
    align-items: center;
    gap: ${uiSize(16)};
  }

  &.vertical {
    input {
      transform: rotateZ(-90deg);
    }
  }

  &.head-width {
    position: absolute;
    top: 5%;
    left: 50%;
    transform: translateX(-50%);
  }

  &.cheek-depth {
    position: absolute;
    top: 50%;
    left: 75%;
    transform: translate(-50%, -50%);
  }

  &.rotation {
    border-top: none;
    padding: 0;

    input {
      width: 100%;
    }
  }

  .markers {
    display: flex;
    justify-content: space-between;
    margin-top: ${uiSize(10)};
    font-size: ${uiSize(14)};
    font-weight: bold;
    color: ${theme.colors.gray50.hex};
    width: calc(100% + ${uiSize(70)});
    margin-left: -${uiSize(35)};

    span {
      width: 100%;
      text-align: center;
    }
  }
`;

const RTitle = styled.div`
  font-size: ${uiSize(32)};
  margin-bottom: ${uiSize(10)};

  .layer & {
    font-size: ${uiSize(18)};
    margin-bottom: 0;
  }
`;

type Props = {
  label?: string;
  labels?: string[];
  labelsAlt?: string[];
  defaultValue?: number;
  min?: number;
  max: number;
  step?: number;
  className?: string;
  vertical?: boolean;
  onChange: (value: number) => void;
};

interface State {
  isDragging: boolean;
  active: boolean;
  value: number;
}

export default class XYSlider extends Component<Props, State> {
  constructor(props: Props) {
    super();

    this.state = {
      isDragging: false,
      active: false,
      value: props.defaultValue || 0,
    };
  }

  updateValue(e: InputEvent) {
    const value = Number((e.target as HTMLInputElement).value);
    this.setState({ value });
    this.props.onChange(value);
  }

  onMouseDown = (e: MouseEvent) => {
    if (e.button === 2) {
      const value = this.props.defaultValue || 0;
      console.log('value', value);
      this.setState({ value });
      this.props.onChange(value);
      return;
    }
    if (e.button !== 0) return;
  };

  render() {
    return (
      <RContainer className={[this.props.className, this.props.vertical && 'vertical'].join(' ')}>
        {(this.props.label || this.props.labels) && (
          <RTitle>
            {this.props.label}
            {this.props.labels && `: ${this.props.labels[this.state.value]}`}
          </RTitle>
        )}
        <input
          type="range"
          onChange={this.updateValue.bind(this)}
          value={this.state.value}
          min={this.props.min || 0}
          max={this.props.max}
          step={this.props.step || 1}
          onMouseDown={this.onMouseDown.bind(this)}
        />
        {this.props.labelsAlt && (
          <div className="markers">
            {this.props.labelsAlt.map((label, index) => (
              <span key={index}>{label}</span>
            ))}
          </div>
        )}
      </RContainer>
    );
  }
}
