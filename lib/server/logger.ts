import { LoggerBase, LogLevel } from '@lib/shared/logger';

// TODO: Replace this
const DEV_ENV = true;
export class Logger extends LoggerBase {
  logMessages(level: LogLevel, messages: any[]): void {
    if (!DEV_ENV) return;
    console.log(...messages);
  }
}
