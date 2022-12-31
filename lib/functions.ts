declare function GetPlayerIdentifier(playerSrc: number, identifier: number): string;

export const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));

export const boolval = (mixedVar: any): boolean =>
  !(
    mixedVar === false ||
    mixedVar === 0 ||
    mixedVar === 0.0 ||
    mixedVar === '' ||
    mixedVar === '0' ||
    (Array.isArray(mixedVar) && mixedVar.length === 0) ||
    mixedVar === null ||
    mixedVar === undefined
  );

export const debounce = (wait: number, cb: Function): Function => {
  let h: NodeJS.Timeout;
  return (...args: any[]): void => {
    clearTimeout(h);
    h = setTimeout(() => cb(...args), wait);
  };
};

export const distanceVector2 = (v1: Vector2Format | [number, number], v2: Vector2Format | [number, number]): number => {
  if (!Array.isArray(v1)) {
    v1 = [v1.x, v1.y];
  }
  if (!Array.isArray(v2)) {
    v2 = [v2.x, v2.y];
  }
  const dx = v1[0] - v2[0];
  const dy = v1[1] - v2[1];

  return Math.sqrt(dx * dx + dy * dy);
};

export const distanceVector = (
  v1: Vector3Format | [number, number, number],
  v2: Vector3Format | [number, number, number],
): number => {
  if (!Array.isArray(v1)) {
    v1 = [v1.x, v1.y, v1.z];
  }
  if (!Array.isArray(v2)) {
    v2 = [v2.x, v2.y, v2.z];
  }

  const dx = v1[0] - v2[0];
  const dy = v1[1] - v2[1];
  const dz = v1[2] - v2[2];

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

export const lerp = (min: number, max: number, percent: number): number => min * (1 - percent) + max * percent;

export const now = (unit = 'milli'): number => {
  const hrTime = process.hrtime();

  switch (unit) {
    case 'milli':
      return hrTime[0] * 1000 + hrTime[1] / 1000000;
    case 'micro':
      return hrTime[0] * 1000000 + hrTime[1] / 1000;
    case 'nano':
      return hrTime[0] * 1000000000 + hrTime[1];
    default:
      return now('nano');
  }
};

// export const GetCommunityId = (source: number): string | void => {
//   const hexId = GetIdType(source, 'steam');
//   if (!hexId) {
//     return;
//   }
//   return bigInt(hexId.substr(6), 16).toString();
// };

// export const GetSteamId = (source: number): string | void => {
//   const cid = GetCommunityId(source);
//   if (!cid) {
//     return;
//   }
//
//   const steam64 = Math.floor(Number(cid.substr(1)));
//   const a = (steam64 % 2 == 0 && 0) || 1;
//   const b = Math.floor(Math.abs(6561197960265728 - steam64 - a) / 2);
//   return 'STEAM_0:' + a + ':' + ((a == 1 && b - 1) || b);
// };

export const Delay = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, Math.max(1, ms)));

export const padStart = (num: number | string, length: number, fill: string): string => {
  return `${num}`.padStart(length, fill);
};

export const msToHMS = (ms: number): string => {
  // 1- Convert to seconds:
  let seconds = ms / 1000;
  // 2- Extract hours:
  const hours = Math.floor(seconds / 3600);
  seconds = seconds % 3600; // seconds remaining after extracting hours
  // 3- Extract minutes:
  const minutes = Math.floor(seconds / 60);
  // 4- Keep only seconds not extracted to minutes:
  seconds = Math.floor(seconds % 60);
  return `${padStart(hours, 2, '0')}:${padStart(minutes, 2, '0')}:${padStart(seconds, 2, '0')}`;
};

export const randomRange = (min: number, max: number): number => Math.floor(Math.random() * (max - min) + min);
export const randomRangeFloat = (min: number, max: number): number => Math.random() * (max - min) + min;

export const formatError = (err: any, includeStack = true): string | void => {
  if (!err) return;

  let errString = '';
  // Set text color to bright red
  errString += `^1${err.toString()}^7\n`;
  const stack = err.stack;
  if (includeStack && stack && stack.length > 0) {
    for (let i = stack.length - 1; i >= 0; i--) {
      const frame = stack[i];
      errString += `^1  at ${frame.name || 'main'} (${frame.file}:${frame.line})^7`;
      if (i > 0) errString += '\n';
    }
  }
  return errString;
};

export const clone = <T extends {}>(instance: T): T => {
  const copy = new (instance.constructor as { new (): T })();
  Object.assign(copy, instance);
  return copy;
};

export const inRange = (n: number, start: number, end: number): boolean => {
  return (n - start) * (n - end) <= 0;
};

export const Entity = <T>(entityId: number) => {
  return global.Entity(entityId) as {
    state: T & {
      set<Key extends keyof T>(key: Key, value: T[Key], replicated: boolean): void;
    };
  };
};
