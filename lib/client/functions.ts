import { MarkerTypes } from '@lib/shared/markers';

function _fv(flt: number) {
  return flt === 0.0 ? flt : flt + 0.0000001;
}

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
  Citizen.invokeNative('0xb3426bcc', _fv(x1), _fv(y1), _fv(z1), _fv(x2), _fv(y2), _fv(z2), red, green, blue, alpha);
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

/**
 * Sphere marker at a world point.
 *
 * The engine draws this inside the world, so it is depth-tested against terrain
 * and buildings. That is the whole reason to reach for it from a tool that
 * already has a three.js overlay: the overlay has no access to the game's depth
 * buffer and therefore always draws on top, which is right for track lines but
 * useless for judging whether a point sits above or below the ground in front
 * of it.
 *
 * p19 and the texture pair are pinned to 0 rather than left to the caller: no
 * call site in this repo has ever needed a textured or bobbing marker, and the
 * native's twenty-four positional arguments are the thing worth hiding.
 */
export const DrawMarkerSphere = (
  x: number,
  y: number,
  z: number,
  /** Uniform scale, fed to the native's scaleX/Y/Z. */
  scale: number,
  red: number,
  green: number,
  blue: number,
  alpha: number,
): void => {
  DrawMarker(
    MarkerTypes.SPHERE,
    x,
    y,
    z,
    0,
    0,
    0,
    0,
    0,
    0,
    scale,
    scale,
    scale,
    red,
    green,
    blue,
    alpha,
    false,
    false,
    0,
    false,
    0,
    0,
    false,
  );
};
