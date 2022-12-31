import { blue, green, yellow } from 'colors';
import { inspect } from 'util';

export const log = (...args: any[]) => {
  console.log(...args.map((arg) => (typeof arg === 'string' ? arg : inspect(arg, { depth: 4, colors: true }))));
};

export const logGreen = (name: string, ...args: any[]) => {
  log(green(name), ...args);
};

export const logEvent = (event: string, ...args: any[]) => {
  // log(yellow(event), ...args);
};

export const logInfo = (name: string, ...args: any[]) => {
  log(blue(name), ...args);
};

export const logInfoS = (name: string, ...args: any[]) => {
  log(green('|S|'), blue(name), ...args);
};

export const logInfoC = (name: string, ...args: any[]) => {
  log(yellow('|C|'), blue(name), ...args);
};
