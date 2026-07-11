import { emitUI } from '@lib/client/comms/ui';

const consoleLog = console.log;
const consoleInfo = console.info;
const consoleWarn = console.warn;
const consoleError = console.error;

let LOG_METHOD: 'console' | 'ui' | 'both' | string = 'both';

const DEV_ENV = true;
console.log = (...messages: any[]) => {
  if (!DEV_ENV) return;

  if (LOG_METHOD === 'both' || LOG_METHOD === 'console') {
    consoleLog(...messages);
  }

  if (LOG_METHOD === 'both' || LOG_METHOD === 'ui') {
    emitUI('log.message', {
      resource: GetCurrentResourceName(),
      message: messages
        .map((item) => {
          if (typeof item === 'object') {
            if (
              item &&
              'toString' in item &&
              typeof item.toString === 'function' &&
              item.toString() !== '[object Object]'
            ) {
              return item.toString();
            }
            return JSON.stringify(item, null, 2);
          }
          return item;
        })
        .join(' '),
    });
  }
};

console.info = (...messages: any[]) => {
  if (!DEV_ENV) return;

  if (LOG_METHOD === 'both' || LOG_METHOD === 'console') {
    consoleInfo(...messages);
  }

  if (LOG_METHOD === 'both' || LOG_METHOD === 'ui') {
    emitUI('log.message', {
      _type: 'info',
      resource: GetCurrentResourceName(),
      message: messages
        .map((item) => {
          if (typeof item === 'object') {
            if (
              item &&
              'toString' in item &&
              typeof item.toString === 'function' &&
              item.toString() !== '[object Object]'
            ) {
              return item.toString();
            }
            return JSON.stringify(item, null, 2);
          }
          return item;
        })
        .join(' '),
    });
  }
};

console.warn = (...messages: any[]) => {
  if (!DEV_ENV) return;

  if (LOG_METHOD === 'both' || LOG_METHOD === 'console') {
    consoleWarn(...messages);
  }

  if (LOG_METHOD === 'both' || LOG_METHOD === 'ui') {
    emitUI('log.message', {
      _type: 'warn',
      resource: GetCurrentResourceName(),
      message: messages
        .map((item) => {
          if (typeof item === 'object') {
            if (
              item &&
              'toString' in item &&
              typeof item.toString === 'function' &&
              item.toString() !== '[object Object]'
            ) {
              return item.toString();
            }
            return JSON.stringify(item, null, 2);
          }
          return item;
        })
        .join(' '),
    });
  }
};

console.error = (...messages: any[]) => {
  if (!DEV_ENV) return;

  if (LOG_METHOD === 'both' || LOG_METHOD === 'console') {
    consoleError(...messages);
  }

  if (LOG_METHOD === 'both' || LOG_METHOD === 'ui') {
    emitUI('log.message', {
      _type: 'error',
      resource: GetCurrentResourceName(),
      message: messages
        .map((item) => {
          if (typeof item === 'object') {
            if (
              item &&
              'toString' in item &&
              typeof item.toString === 'function' &&
              item.toString() !== '[object Object]'
            ) {
              return item.toString();
            }
            return JSON.stringify(item, null, 2);
          }
          return item;
        })
        .join(' '),
    });
  }
};
