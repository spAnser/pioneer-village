import theme, { themeColor } from '../theme';
import styled from 'styled-components';

import { RenderableProps } from 'preact';

const FillContainer = styled.div`
  position: relative;
  background-color: rgba(${theme.colors.white.rgb}, 0.05);
  border: 0 solid rgba(${theme.colors.white.rgb}, 0.5);
  border-left-width: 2px;
  border-right-width: 2px;
  //overflow: hidden;
`;

const FillBar = styled.div`
  transition: 255ms;
  position: absolute;
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

interface ProgressBarProps {
  progress: number;
  width?: number;
  height?: number;
  color?: keyof UI.Theme['colors'];
  source?: 'left' | 'right' | 'center';
}

const defaultProps = {
  width: 120,
  height: 8,
  color: 'blue',
  source: 'left',
};

export default function ProgressBar(props: RenderableProps<ProgressBarProps>) {
  const { width, height, source } = { ...defaultProps, ...props };
  const color = themeColor('hex', defaultProps.color, props.color);

  const style = { backgroundColor: color, width: `${props.progress * 100}%` };

  return (
    <FillContainer style={{ width, height }}>
      {source === 'left' && <FillBarLeft style={style} />}
      {source === 'center' && <FillBarCenter style={style} />}
      {source === 'right' && <FillBarRight style={style} />}
      {props.children}
    </FillContainer>
  );
}
