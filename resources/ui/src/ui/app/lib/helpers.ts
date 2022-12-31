export const uiSize = (size: number) => `${(size / 1080) * 100}vh`;

export const colorH2A = (hex: string): [r: number, g: number, b: number] => {
  if (hex.startsWith('#')) {
    hex = hex.slice(1);
  }
  return [parseInt(hex, 16) >> 16, (parseInt(hex, 16) >> 8) & 0xff, parseInt(hex, 16) & 0xff];
};
