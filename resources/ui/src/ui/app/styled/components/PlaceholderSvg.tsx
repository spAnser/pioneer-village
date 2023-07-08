import { uiSize } from '@uiLib/helpers';
import { themeColor } from '@styled/theme';
import { RenderableProps } from 'preact';

interface PlaceholderSvgProps {
  width?: number;
  height?: number;
  text?: string;
  bgColor?: keyof UI.Theme['colors'];
  fgColor?: keyof UI.Theme['colors'];
}

const defaultProps: Required<PlaceholderSvgProps> = {
  width: 100,
  height: 100,
  text: 'svg',
  bgColor: 'black',
  fgColor: 'white',
};

export default function PlaceholderSvg(props: RenderableProps<PlaceholderSvgProps>) {
  const { width, height, text } = { ...defaultProps, ...props };
  const bgColor = themeColor('hex', defaultProps.bgColor, props.bgColor) as string;
  const fgColor = themeColor('hex', defaultProps.fgColor, props.fgColor) as string;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ pointerEvents: 'none' }}
    >
      <rect fill={bgColor} width={width} height={height} />
      <text
        fill={fgColor}
        fontFamily="'Caveat', cursive"
        fontSize={20}
        fontWeight={400}
        dy={10}
        x="50%"
        y="50%"
        textAnchor="middle"
      >
        {text}
      </text>
    </svg>
  );
}
