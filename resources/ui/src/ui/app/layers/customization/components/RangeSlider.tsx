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
`;

const RTitle = styled.div`
  font-size: ${uiSize(32)};
  margin-bottom: ${uiSize(10)};
`;

interface Props {
  label: string;
  labels?: string[];
  onChange: (value: number) => void;
  defaultValue?: number;
  min?: number;
  max: number;
  step?: number;
}

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

  render() {
    return (
      <RContainer>
        <RTitle>
          {this.props.label}
          {this.props.labels && `: ${this.props.labels[this.state.value]}`}
        </RTitle>
        <input
          type="range"
          onChange={this.updateValue.bind(this)}
          value={this.state.value}
          min={this.props.min || 0}
          max={this.props.max}
          step={this.props.step || 1}
        />
      </RContainer>
    );
  }
}
