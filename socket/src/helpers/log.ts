import { blue, green, yellow } from 'colors';
import { inspect } from 'util';

/**
 * Console Log with auto color formating objects
 */
export const log = (...args: any[]) => {
  console.log(...args.map((arg) => (typeof arg === 'string' ? arg : inspect(arg, { depth: 4, colors: true }))));
};

/**
 * Log first argument in green
 */
export const logGreen = (name: string, ...args: any[]) => {
  log(green(name), ...args);
};

export const logEvent = (event: string, ...args: any[]) => {
  // log(yellow(event), ...args);
};

/**
 * Log first argument in blue
 */
export const logInfo = (name: string, ...args: any[]) => {
  log(blue(name), ...args);
};

/**
 * Log Info Server Prefix
 */
export const logInfoS = (name: string, ...args: any[]) => {
  log(green('|S|'), blue(name), ...args);
};

/**
 * Log Info Client Prefix
 */
export const logInfoC = (name: string, ...args: any[]) => {
  log(yellow('|C|'), blue(name), ...args);
};
