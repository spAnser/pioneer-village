import { Component, createRef } from 'preact';
import styled from 'styled-components';

import theme from '@styled/theme';
import { uiSize } from '@uiLib/helpers';

const SCSContainer = styled.div`
  border-top: 2px solid ${theme.colors.white.hex};
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: ${uiSize(18)};
  user-select: none;
`;

const SCSTitle = styled.div`
  font-size: ${uiSize(32)};
`;

const SCSContent = styled.div`
  display: grid;
  transition: grid-template-rows ${theme.transitionSpeed.fast};
  grid-template-rows: 0fr;
  overflow: hidden;

  &.active {
    grid-template-rows: 1fr;
  }
`;

const SCSContentWrapper = styled.div`
  overflow: hidden;
`;

const SCSSelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  margin-bottom: 10px;
`;

const SCSOptions = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const SCSOption = styled.div`
  border: ${uiSize(1)} solid ${theme.colors.white.hex};
  margin: ${uiSize(16)} ${uiSize(8)};
  font-family: 'Redressed', cursive;
  text-align: center;
  font-size: 0;
  line-height: 0;

  img,
  span {
    display: inline-block;
    width: ${uiSize(56)};
    height: ${uiSize(56)};
  }

  span {
    font-size: ${uiSize(24)};
    line-height: ${uiSize(60)};
  }

  &.active {
    border-color: ${theme.colors.red.hex};
  }
`;

interface Props {
  label: string;
  onChange: (style: number, option: number) => void;
  components: { name: string; components: any[] }[];
  gender: 'male' | 'female';
}

interface State {
  active: boolean;
  currentStyle: number;
  currentOption: number;
  erroredImages: Set<number>;
}

export default class StyleColorSelector extends Component<Props, State> {
  refContent = createRef<HTMLDivElement>();

  constructor() {
    super();

    this.state = {
      active: false,
      currentStyle: -1,
      currentOption: 0,
      erroredImages: new Set(),
    };
  }

  decrement() {
    const newStyle = Math.max(this.state.currentStyle - 1, -1);
    if (newStyle === this.state.currentStyle) {
      return;
    }
    this.setState({ currentStyle: newStyle, currentOption: 0 });
    this.props.onChange(newStyle, 0);
  }

  increment() {
    const newStyle = Math.min(this.state.currentStyle + 1, this.props.components.length - 1);
    if (newStyle === this.state.currentStyle) {
      return;
    }
    this.setState({ currentStyle: newStyle, currentOption: 0 });
    this.props.onChange(newStyle, 0);
  }

  optionError(component: number) {
    const erroredImages = this.state.erroredImages;
    erroredImages.add(component);
    this.setState({ erroredImages });
  }

  toggleContent() {
    // const contentHeight = this.refContent?.current?.scrollHeight || 'auto';
    this.setState({ active: !this.state.active });
  }

  render() {
    return (
      <SCSContainer>
        <SCSTitle onClick={this.toggleContent.bind(this)}>{this.props.label}</SCSTitle>
        <SCSContent ref={this.refContent} className={this.state.active ? 'active' : ''}>
          <SCSContentWrapper>
            <SCSSelector>
              <div
                style={{ cursor: 'pointer', fontSize: uiSize(48), paddingRight: uiSize(8) }}
                onClick={this.decrement.bind(this)}
              >
                &lt;
              </div>
              <p>
                {this.state.currentStyle === -1
                  ? 'None'
                  : this.props.components[this.state.currentStyle]?.name ?? 'Misc'}
                <br />
                {this.state.currentStyle + 1} of {this.props.components.length}
              </p>
              <div
                style={{ cursor: 'pointer', fontSize: uiSize(48), paddingRight: uiSize(8) }}
                onClick={this.increment.bind(this)}
              >
                &gt;
              </div>
            </SCSSelector>
            <SCSOptions>
              {this.props.components[this.state.currentStyle]?.components.map((component, index) => {
                if (
                  (this.props.gender === 'male' && component.type === '1') ||
                  (this.props.gender === 'female' && component.type === '0')
                ) {
                  return null;
                }
                return (
                  <SCSOption
                    key={index}
                    onClick={() => {
                      this.setState({ currentOption: index });
                      this.props.onChange(this.state.currentStyle, index);
                    }}
                    className={index === this.state.currentOption ? 'active' : ''}
                  >
                    {this.state.erroredImages.has(component.component) ? (
                      <span>{index + 1}</span>
                    ) : (
                      <img
                        src={`https://p--v.b-cdn.net/swatches/components/${component.component}.png`}
                        onError={() => this.optionError(component.component)}
                      />
                    )}
                  </SCSOption>
                );
              })}
            </SCSOptions>
          </SCSContentWrapper>
        </SCSContent>
      </SCSContainer>
    );
  }
}
