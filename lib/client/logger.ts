import { LoggerBase, LogLevel } from '@lib/shared/logger';
import { emitUI } from './comms/ui';

// TODO: Replace this
const DEV_ENV = true;
export class Logger extends LoggerBase {
  protected static instance = new Logger();

  logMessages(level: LogLevel, messages: any[]): void {
    if (!DEV_ENV) return;
    if (this.name) {
      messages.unshift(`[${this.name}]`);
    }

    emitUI('log.message', {
      resource: GetCurrentResourceName(),
      level,
      message: messages
        .map((item) => {
          if (typeof item === 'object') {
            return JSON.stringify(item, null, 2);
          }
          return item;
        })
        .join(' '),
    });
  }
}
