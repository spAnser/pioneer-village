export const DrawLine = (
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number,
  red: number,
  green: number,
  blue: number,
  alpha: number,
): void => {
  Citizen.invokeNative('0xb3426bcc', x1, y1, z1, x2, y2, z2, red, green, blue, alpha);
};

export const DrawTxt = (
  rawString: string,
  x: number,
  y: number,
  size: number,
  enableShadow = true,
  r = 255,
  g = 255,
  b = 255,
  a = 255,
  centre = false,
  font = 0,
) => {
  const str = VarString(10, 'LITERAL_STRING', rawString);
  BgSetTextScale(1, size);
  BgSetTextColor(Math.floor(r), Math.floor(g), Math.floor(b), Math.floor(a));
  SetTextCentre(centre);
  if (enableShadow) {
    SetTextDropshadow(1, 0, 0, 0, 255);
  }
  SetTextFontForCurrentCommand(font);
  BgDisplayText(str, x, y);
};

export const TxtAtWorldCoord = (x: number, y: number, z: number, txt: string, size: number, font = 0, alpha = 255) => {
  const [s, sx, sy] = GetScreenCoordFromWorldCoord(x, y, z);
  if ((sx > 0 && sx < 1) || (sy > 0 && sy < 1)) {
    const [h, hx, hy] = GetHudScreenPositionFromWorldPosition(x, y, z);
    DrawTxt(txt, hx, hy, size, true, 255, 255, 255, alpha, true, font); // Font 2 has some symbol conversions ex. @ becomes the rockstar logo
  }
};
