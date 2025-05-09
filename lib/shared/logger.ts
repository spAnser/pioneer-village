export enum LogLevel {
  DEBUG,
  LOG,
  INFO,
  WARN,
  ERROR,
}

export abstract class LoggerBase {
  protected static instance: LoggerBase;

  constructor(protected readonly name?: string) {}

  abstract logMessages(level: LogLevel, messages: any[]): void;

  static debug(...messages: any[]) {
    return this.instance.debug(...messages);
  }

  static log(...messages: any[]) {
    return this.instance.log(...messages);
  }

  static info(...messages: any[]) {
    return this.instance.info(...messages);
  }

  static warn(...messages: any[]) {
    return this.instance.warn(...messages);
  }

  static error(...messages: any[]) {
    return this.instance.error(...messages);
  }

  debug(...messages: any[]) {
    this.logMessages(LogLevel.DEBUG, messages);
  }

  log(...messages: any[]) {
    this.logMessages(LogLevel.LOG, messages);
  }

  info(...messages: any[]) {
    this.logMessages(LogLevel.INFO, messages);
  }

  warn(...messages: any[]) {
    this.logMessages(LogLevel.WARN, messages);
  }

  error(...messages: any[]) {
    this.logMessages(LogLevel.ERROR, messages);
  }
}
