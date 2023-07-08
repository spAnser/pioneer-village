import theme, { themeColor } from '../theme';
import styled from 'styled-components';

import { RenderableProps } from 'preact';
import { HTMLAttributes } from 'react';
import { uiSize } from '@uiLib/helpers';

const FillContainer = styled.div`
  position: relative;
  background-color: rgba(${theme.colors.white.rgb}, 0.05);
  border: 0 solid rgba(${theme.colors.white.rgb}, 0.5);
  //overflow: hidden;

  &.border {
    &.horizontal {
      border-left-width: ${uiSize(2)};
      border-right-width: ${uiSize(2)};
    }

    &.vertical {
      border-top-width: ${uiSize(2)};
      border-bottom-width: ${uiSize(2)};
    }
  }
`;

const FillBar = styled.div`
  transition: 255ms;
  position: absolute;
`;

const FillBarHorizontal = styled(FillBar)`
  top: 0;
  bottom: 0;
`;

const FillBarLeft = styled(FillBar)`
  left: 0;
`;

const FillBarCenter = styled(FillBar)`
  left: 50%;
  transform: translateX(-50%);
`;

const FillBarRight = styled(FillBar)`
  right: 0;
`;

const FillBarVertical = styled(FillBar)`
  left: 0;
  right: 0;
`;

const FillBarTop = styled(FillBar)`
  top: 0;
`;

const FillBarBottom = styled(FillBar)`
  bottom: 0;
`;

const FillBarMiddle = styled(FillBar)`
  top: 50%;
  transform: translateY(-50%);
`;

interface ProgressBarProps {
  progress: number;
  width?: number | string;
  height?: number | string;
  color?: keyof UI.Theme['colors'];
  backgroundColor?: string;
  source?: 'left' | 'right' | 'center' | 'top' | 'bottom' | 'middle';
  border?: boolean;
}

const defaultProps = {
  width: uiSize(120),
  height: uiSize(8),
  color: 'blue',
  backgroundColor: undefined,
  source: 'left',
  border: false,
};

export default function ProgressBar(props: RenderableProps<ProgressBarProps>) {
  const { width, height, backgroundColor, source } = { ...defaultProps, ...props };
  const isVertical = source === 'top' || source === 'bottom' || source === 'middle';
  const color = themeColor('hex', defaultProps.color, props.color);

  const style: HTMLAttributes<HTMLDivElement>['style'] = { backgroundColor: color };
  if (isVertical) {
    style.width = '100%';
    style.height = `${props.progress * 100}%`;
  } else {
    style.width = `${props.progress * 100}%`;
    style.height = '100%';
  }

  const classes = [];
  if (props.border) {
    classes.push('border');
  }
  if (isVertical) {
    classes.push('vertical');
  } else {
    classes.push('horizontal');
  }

  return (
    <FillContainer style={{ width, height, backgroundColor }} className={classes.join(' ')}>
      {source === 'left' && <FillBarLeft style={style} />}
      {source === 'center' && <FillBarCenter style={style} />}
      {source === 'right' && <FillBarRight style={style} />}
      {source === 'top' && <FillBarTop style={style} />}
      {source === 'middle' && <FillBarMiddle style={style} />}
      {source === 'bottom' && <FillBarBottom style={style} />}
      {props.children}
    </FillContainer>
  );
}
