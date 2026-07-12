import { Socket } from 'socket.io-client';

import { Delay } from '@lib/functions';
import { onClient } from '@lib/ui';

// Store state interface
interface LogState {
  show: boolean;
  autoScroll: boolean;
  scrollOverride: number;
  filter: Set<string>;
  reverseFilter: Set<string>;
  messages: UI.Log.LogData[];
  colors: Record<string, UI.Log.ColorData>;
}

type StateListener = (state: LogState) => void;

class LogStore {
  private static instance: LogStore;
  private socket: Socket<UISocketEvents, SocketServer.Client & SocketServer.ClientEvents> | null = null;
  private state: LogState;
  private listeners = new Set<StateListener>();
  private logRef: React.RefObject<HTMLDivElement | null> | null = null;
  private initialized = false;
  private handlersInitialized = false;

  private constructor() {
    this.state = {
      show: false,
      autoScroll: true,
      scrollOverride: 0,
      filter: new Set(),
      reverseFilter: new Set(),
      messages: [],
      colors: {},
    };
  }

  static getInstance(): LogStore {
    if (!LogStore.instance) {
      LogStore.instance = new LogStore();
    }
    return LogStore.instance;
  }

  // Initialize the store with socket connection
  initialize(socket: Socket<UISocketEvents, SocketServer.Client & SocketServer.ClientEvents>): void {
    if (this.initialized) {
      this.cleanup();
    }

    this.socket = socket;
    this.initialized = true;

    // Don't set up handlers here - they'll be set up from the component
  }

  // Set the log ref for scrolling
  setLogRef(ref: React.RefObject<HTMLDivElement | null>): void {
    this.logRef = ref;
  }

  private setupClientHandlers(): void {
    // Handle log state updates from client
    onClient('log.state', this.handleLogState);

    // Handle log messages from client
    onClient('log.message', this.handleLogMessage);
  }

  // Initialize client handlers (called from component)
  initializeClientHandlers(): void {
    if (this.handlersInitialized) {
      return;
    }
    this.setupClientHandlers();
    this.handlersInitialized = true;
  }

  // Handle log state update from client
  private handleLogState = (event: Partial<UI.Log.State>): void => {
    this.updateState(event);
  };

  // Handle log message from client
  private handleLogMessage = (data: UI.Log.Data, overrideSource: UI.Log.Source = 'client'): void => {
    this.addMessage(overrideSource, data);
  };

  // Generate a random color that's distinct from existing colors
  private randomColor(): UI.Log.ColorData {
    let isNew = false;
    let h: number;
    let s: number;
    let l: number;
    let tries = 0;

    do {
      h = Math.floor(Math.random() * 360);
      s = 50 + Math.floor(Math.random() * 50);
      l = 70 + Math.floor(Math.random() * 10);

      isNew = true;
      for (const color of Object.values(this.state.colors)) {
        if (Math.abs(color.h - h) < 10 && Math.abs(color.s - s) < 5) {
          isNew = false;
        }
      }
      tries++;
      if (tries > 200) {
        isNew = true;
      }
    } while (!isNew);

    const hsl = `hsl(${h}, ${s}%, ${l}%)`;
    return { h, s, l, hsl };
  }

  // Add a message to the log
  addMessage(source: UI.Log.Source, data: UI.Log.Data): void {
    if (!data.message) {
      console.error('No log message', data);
      return;
    }

    let colors = this.state.colors;
    const color = colors[data.resource];

    if (!color) {
      colors = { ...colors, [data.resource]: this.randomColor() };
    }

    const newMessages = [
      ...this.state.messages.slice(-1999),
      {
        _type: data._type,
        source,
        resource: data.resource,
        message: data.message,
        timestamp: Date.now(),
      },
    ];

    this.updateState({
      messages: newMessages,
      colors,
    });
  }

  // Clear all messages
  clearMessages(): void {
    this.updateState({ messages: [] });
  }

  // Randomize all resource colors
  randomizeColors(): void {
    const colors = { ...this.state.colors };

    for (const resource of Object.keys(this.state.colors)) {
      colors[resource] = this.randomColor();
    }

    this.updateState({ colors });
  }

  // Clear all filters
  clearFilter(): void {
    this.updateState({
      filter: new Set(),
      reverseFilter: new Set(),
    });
  }

  // Toggle a resource in the filter
  toggleResource(resource: string): void {
    const filter = new Set(this.state.filter);
    const reverseFilter = new Set(this.state.reverseFilter);

    if (filter.has(resource)) {
      filter.delete(resource);
    } else {
      if (filter.size > 0 || !reverseFilter.has(resource)) {
        filter.add(resource);
      }
      reverseFilter.delete(resource);
    }

    this.updateState({
      filter,
      reverseFilter,
    });
  }

  // Toggle a resource in the reverse filter (right-click)
  toggleReverseResource(resource: string): void {
    const filter = new Set(this.state.filter);
    const reverseFilter = new Set(this.state.reverseFilter);

    if (reverseFilter.has(resource)) {
      reverseFilter.delete(resource);
    } else {
      if (!filter.has(resource) && filter.size === 0) {
        reverseFilter.add(resource);
      }
      filter.delete(resource);
    }

    this.updateState({
      filter,
      reverseFilter,
    });
  }

  // Get class name for a resource filter button
  getResourceClassName(resource: string): string {
    if (this.state.filter.has(resource)) {
      return 'active';
    }
    if (!this.state.reverseFilter.has(resource) && this.state.filter.size === 0) {
      return '';
    }
    return 'inactive';
  }

  // Check if a message should be shown based on filters
  shouldShowMessage(resource: string): boolean {
    if (this.state.filter.size > 0 && !this.state.filter.has(resource)) {
      return false;
    }
    if (this.state.reverseFilter.has(resource)) {
      return false;
    }
    return true;
  }

  // Handle mouse wheel scrolling
  setAutoScroll(value: boolean): void {
    this.updateState({ autoScroll: value });
  }

  // Check if should auto-scroll based on current scroll position
  checkAutoScroll(deltaY: number): void {
    if (!this.logRef?.current) return;

    const logElement = this.logRef.current;
    window.requestAnimationFrame(() => {
      const autoScroll = logElement.scrollTop >= logElement.scrollHeight - logElement.clientHeight - deltaY;
      if (autoScroll !== this.state.autoScroll) {
        this.setAutoScroll(autoScroll);
      }
    });
  }

  // Scroll to bottom
  scrollToBottom(): void {
    if (!this.logRef?.current) return;
    this.logRef.current.scrollTo({ top: this.logRef.current.scrollHeight });
  }

  // Close the log UI (escape key handling)
  async close(): Promise<void> {
    this.updateState({
      show: false,
      autoScroll: true,
    });

    // Scroll to bottom after closing
    setTimeout(async () => {
      if (this.logRef?.current && this.state.autoScroll) {
        this.scrollToBottom();
      }
      await Delay(100);
      if (this.logRef?.current && this.state.autoScroll) {
        this.scrollToBottom();
      }
    }, 400);
  }

  // Update state and notify listeners
  updateState(newState: Partial<LogState>): void {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((listener) => listener(this.state));
  }

  // Subscribe to state changes
  subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    listener(this.state); // Call immediately with current state

    return () => {
      this.listeners.delete(listener);
    };
  }

  // Get current state
  getState(): LogState {
    return this.state;
  }

  // Cleanup when store is destroyed
  cleanup(): void {
    // Note: onClient doesn't provide cleanup mechanism
    // so we just clear internal state
    this.listeners.clear();
    this.initialized = false;
    this.logRef = null;
  }
}

export default LogStore.getInstance();
