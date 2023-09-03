import { Log } from '@lib/client/comms/ui';

export class EventManager {
  protected static instance: EventManager;
  protected events: Map<string, Map<string, Function>> = new Map();

  static getInstance(): EventManager {
    if (!EventManager.instance) {
      EventManager.instance = new EventManager();
    }
    return EventManager.instance;
  }

  // @ts-ignore
  register(identifier: string, event: string, callback: (...args) => void): boolean {
    const eventsForType = this.events.get(event) || new Map();

    eventsForType.set(identifier, callback);
    // Log('eventsforType', eventsForType)
    this.events.set(event, eventsForType);
    // Log('events: ', this.events.get(event));

    return true;
  }

  unregister(identifier: string, event: string): boolean {
    const eventsForType = this.events.get(event);
    if (eventsForType) {
      return eventsForType.delete(identifier);
    }
    return false;
  }

  // @ts-ignore
  trigger(event: string, ...args): void {
    if (!this.events.has(event)) {
      return;
    }
    const eventsForType = this.events.get(event);
    if (!eventsForType) {
      return;
    }
    Log('events for type:', eventsForType);
    for (const [ident, callback] of eventsForType.entries()) {
      // Log('calling callback', ...args);
      callback(...args);
    }
  }
}
