import { colorH2A, uiSize } from '@uiLib/helpers';

const theme: UI.Theme = {
  transitionSpeed: {
    slow: '375ms',
    normal: '250ms',
    fast: '125ms',
  },
  colors: {
    black: {
      hex: '#000000',
    },
    gray12: {
      hex: '#202020',
    },
    gray25: {
      hex: '#404040',
    },
    gray50: {
      hex: '#808080',
    },
    gray75: {
      hex: '#c0c0c0',
    },
    gray88: {
      hex: '#e0e0e0',
    },
    white: {
      hex: '#ffffff',
    },
    green: {
      hex: '#53ff45',
    },
    limeGreen: {
      hex: '#b0ff45',
    },
    yellow: {
      hex: '#fff145',
    },
    orange: {
      hex: '#ff9445',
    },
    red: {
      hex: '#ff4553',
    },
    pink: {
      hex: '#ff45b0',
    },
    purple: {
      hex: '#9445ff',
    },
    blue: {
      hex: '#4553ff',
    },
    lightBlue: {
      hex: '#45b0ff',
    },
  },
  borderRadius: {
    small: uiSize(2),
    normal: uiSize(4),
    large: uiSize(6),
  },
};

for (const [name, color] of Object.entries(theme.colors)) {
  const colorRGB = colorH2A(color.hex);
  theme.colors[name].rgb = colorRGB.join(', ');
  theme.colors[name].rgbRaw = colorRGB;
}

export const themeColor = (
  method: keyof UI.ColorData,
  defaultColor: keyof UI.Theme['colors'],
  color?: keyof UI.Theme['colors'],
): string | [r: number, g: number, b: number] | undefined => {
  return theme.colors[color || defaultColor][method];
};

export default theme;
