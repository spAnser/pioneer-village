import { LoggerBase, LogLevel } from '@lib/shared/logger';

// TODO: Replace this
const DEV_ENV = true;
export class Logger extends LoggerBase {
  protected static instance = new Logger();

  logMessages(level: LogLevel, messages: any[]): void {
    if (!DEV_ENV) return;
    if (this.name) {
      messages.unshift(`[${this.name}]`);
    }

    console.log(...messages);
  }
}
