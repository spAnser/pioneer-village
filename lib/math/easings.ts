export const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
// Ease Linear
export const lerp = (min: number, max: number, percent: number) => min * (1 - percent) + max * percent;
// no easing, no acceleration
export const linear = (t: number): number => {
  t = clamp(t, 0, 1);
  return t;
};
// accelerating from zero velocity
export const easeInSine = (x: number): number => {
  return 1 - Math.cos((x * Math.PI) / 2);
};
// decelerating to zero velocity
export const easeOutSine = (x: number): number => {
  return Math.sin((x * Math.PI) / 2);
};
// acceleration until halfway, then deceleration
export const easeInOutSine = (x: number): number => {
  return -(Math.cos(Math.PI * x) - 1) / 2;
};
// accelerating from zero velocity
export const easeInQuad = (t: number): number => {
  t = clamp(t, 0, 1);
  return t * t;
};
// decelerating to zero velocity
export const easeOutQuad = (t: number): number => {
  t = clamp(t, 0, 1);
  return t * (2 - t);
};
// acceleration until halfway, then deceleration
export const easeInOutQuad = (t: number): number => {
  t = clamp(t, 0, 1);
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};
// accelerating from zero velocity
export const easeInCubic = (t: number): number => {
  t = clamp(t, 0, 1);
  return t * t * t;
};
// decelerating to zero velocity
export const easeOutCubic = (t: number): number => {
  t = clamp(t, 0, 1);
  return --t * t * t + 1;
};
// acceleration until halfway, then deceleration
export const easeInOutCubic = (t: number): number => {
  t = clamp(t, 0, 1);
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};
// accelerating from zero velocity
export const easeInQuart = (t: number): number => {
  t = clamp(t, 0, 1);
  return t * t * t * t;
};
// decelerating to zero velocity
export const easeOutQuart = (t: number): number => {
  t = clamp(t, 0, 1);
  return 1 - --t * t * t * t;
};
// acceleration until halfway, then deceleration
export const easeInOutQuart = (t: number): number => {
  t = clamp(t, 0, 1);
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
};
// accelerating from zero velocity
export const easeInQuint = (t: number): number => {
  t = clamp(t, 0, 1);
  return t * t * t * t * t;
};
// decelerating to zero velocity
export const easeOutQuint = (t: number): number => {
  t = clamp(t, 0, 1);
  return 1 + --t * t * t * t * t;
};
// acceleration until halfway, then deceleration
export const easeInOutQuint = (t: number): number => {
  t = clamp(t, 0, 1);
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
};

export const easeCubicBezier = (t: number, p1X: number, p1Y: number, p2X: number, p2Y: number): number => {
  return 3 * t * Math.pow(1 - t, 2) * p1X + 3 * t * t * (1 - t) * p2X + t * t * t;
};
