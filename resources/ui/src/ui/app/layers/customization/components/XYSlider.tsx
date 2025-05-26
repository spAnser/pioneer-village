import { Component, createRef } from 'preact';
import styled from 'styled-components';

import theme from '@styled/theme';
import { uiSize } from '@uiLib/helpers';
import { clamp } from 'lodash';

const XYContainer = styled.div`
  border-top: 2px solid ${theme.colors.white.hex};
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: ${uiSize(18)};
  user-select: none;

  &.cheek-bone {
    position: absolute;
    top: 50%;
    left: 25%;
    transform: translate(-50%, -50%);
  }
`;

const XYTitle = styled.div`
  font-size: ${uiSize(32)};
`;

const XYContents = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  padding: ${uiSize(32)};

  &.active {
    display: flex;
  }
`;

const XYGrid = styled.div`
  position: relative;
  width: 50%;
  aspect-ratio: 1;

  border: 2px solid ${theme.colors.white.hex};

  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 0;
    border-top: 1px solid ${theme.colors.white.hex};
    border-bottom: 1px solid ${theme.colors.white.hex};
    top: 50%;
    transform: translateY(-50%);
  }

  &::after {
    transform: translateY(-50%) rotateZ(90deg);
  }
`;

const XYGridMarker = styled.div`
  position: absolute;
  width: ${uiSize(16)};
  height: ${uiSize(16)};
  background-color: ${theme.colors.white.hex};
  border-radius: 50%;
  transform: translate(-50%, -50%);
`;

const XYLabel = styled.div`
  position: absolute;
  font-size: ${uiSize(16)};
  width: 100%;
  text-align: center;
`;

const XLabel = styled(XYLabel)`
  left: 50%;
  transform: translateX(-50%);
`;

const YLabel = styled(XYLabel)`
  transform: translateY(-100%) rotateZ(-90deg);
`;

const XStartLabel = styled(XLabel)`
  top: -${uiSize(32)};
  transform-origin: center bottom;
`;
const XEndLabel = styled(XLabel)`
  bottom: -${uiSize(32)};
  transform-origin: center top;
`;
const YStartLabel = styled(YLabel)`
  top: 0;
  left: calc(-100% - ${uiSize(16)});

  transform-origin: right bottom;
`;
const YEndLabel = styled(YLabel)`
  top: 100%;
  right: calc(-100% - ${uiSize(32)});

  transform-origin: left bottom;
`;

interface Props {
  label: string;
  onChange: (xValue: number, yValue: number) => void;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  step: number;
  xDefaultValue?: number;
  yDefaultValue?: number;
  className?: string;
}

interface State {
  isDragging: boolean;
  active: boolean;
  xValue: number;
  yValue: number;
}

export default class XYSlider extends Component<Props, State> {
  refContent = createRef<HTMLDivElement>();
  refGrid = createRef<HTMLDivElement>();

  mouseupBinding = this.onmouseup.bind(this);
  mousemoveBinding = this.onmousemove.bind(this);

  constructor(props: Props) {
    super();

    this.state = {
      isDragging: false,
      active: false,
      xValue: props.xDefaultValue || 0,
      yValue: props.yDefaultValue || 0,
    };
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.mouseupBinding);
    document.addEventListener('mousemove', this.mousemoveBinding);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.mouseupBinding);
    document.removeEventListener('mousemove', this.mousemoveBinding);
  }

  toggleContent() {
    // const contentHeight = this.refContent?.current?.scrollHeight || 'auto';
    this.setState({ active: !this.state.active });
  }

  onmousedown(e: MouseEvent) {
    if (e.button === 2) {
      this.setState({
        xValue: this.props.xDefaultValue || 0,
        yValue: this.props.yDefaultValue || 0,
      });
      this.props.onChange(this.props.xDefaultValue || 0, this.props.yDefaultValue || 0);
      return;
    }
    if (e.button !== 0) return;

    const target = e.target as HTMLElement;
    this.setState({ isDragging: true });
    this.onmousemove(e, true);
  }

  onmousemove(e: MouseEvent, force = false) {
    if (!this.state.isDragging && !force) return;

    const grid = this.refGrid.current;

    if (!grid) return;

    const rect = grid.getBoundingClientRect();

    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;

    let xValue = xPos * (this.props.xMax - this.props.xMin) + this.props.xMin;
    let yValue = yPos * (this.props.yMax - this.props.yMin) + this.props.yMin;

    const step = this.props.step;
    xValue = Math.round(xValue / step) * step;
    yValue = Math.round(yValue / step) * step;

    xValue = clamp(xValue, this.props.xMin, this.props.xMax);
    yValue = clamp(yValue, this.props.yMin, this.props.yMax);

    if (this.state.xValue !== xValue || this.state.yValue !== yValue) {
      this.setState({ xValue, yValue });

      this.props.onChange(xValue, yValue);
    }
  }
  onmouseup(e: MouseEvent) {
    this.setState({ isDragging: false });
  }

  top() {
    let value = (this.state.yValue - this.props.yMin) / (this.props.yMax - this.props.yMin);

    return `${value * 100}%`;
  }

  left() {
    let value = (this.state.xValue - this.props.xMin) / (this.props.xMax - this.props.xMin);

    return `${value * 100}%`;
  }

  render() {
    return (
      <XYContainer className={this.props.className}>
        <XYTitle onClick={this.toggleContent.bind(this)}>{this.props.label}</XYTitle>
        <XYContents ref={this.refContent} className={this.state.active ? 'active' : ''}>
          <XYGrid ref={this.refGrid} onMousedown={this.onmousedown.bind(this)}>
            <XStartLabel>X Start Axis</XStartLabel>
            <XEndLabel>X End Axis</XEndLabel>
            <YStartLabel>Y Start Axis</YStartLabel>
            <YEndLabel>Y End Axis</YEndLabel>
            <XYGridMarker style={{ top: this.top(), left: this.left() }} />
          </XYGrid>
        </XYContents>
      </XYContainer>
    );
  }
}
