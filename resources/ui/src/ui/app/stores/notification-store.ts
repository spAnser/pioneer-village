import { Socket } from 'socket.io-client';

import { onClient } from '@lib/ui';

// Maximum number of notifications shown at once; the oldest is evicted once exceeded
const MAX_ACTIVE_NOTIFICATIONS = 3;
// How long a notification holds on screen before it starts fading out
const MIN_HOLD_MS = 3000;
// Must match the CSS opacity transition duration for fade-out
const FADE_OUT_MS = 1200;

// Store state interface
interface NotificationState {
  show: boolean;
  notifications: UI.Notification.Notification[];
  activeNotifications: UI.Notification.ActiveNotification[];
}

type StateListener = (state: NotificationState) => void;

class NotificationStore {
  private static instance: NotificationStore;
  private socket: Socket<SocketOut.ToClient, SocketIn.FromClient> | null = null;
  private state: NotificationState;
  private listeners = new Set<StateListener>();
  private timeouts = new Map<number, { hide: NodeJS.Timeout; remove?: NodeJS.Timeout }>();
  private nextId = 1;
  private initialized = false;

  private constructor() {
    this.state = {
      show: true,
      notifications: [],
      activeNotifications: [],
    };
  }

  static getInstance(): NotificationStore {
    if (!NotificationStore.instance) {
      NotificationStore.instance = new NotificationStore();
    }
    return NotificationStore.instance;
  }

  // Initialize the store with socket connection
  initialize(socket: Socket<SocketOut.ToClient, SocketIn.FromClient>): void {
    if (this.initialized) {
      this.cleanup();
    }

    this.socket = socket;
    this.initialized = true;

    // Set up socket event handlers
    this.setupSocketHandlers();

    // Set up client event handlers
    this.setupClientHandlers();
  }

  private setupSocketHandlers(): void {
    if (!this.socket) return;

    // Handle incoming notifications from socket
    this.socket.on('notification.notify', this.handleSocketNotification);
  }

  private setupClientHandlers(): void {
    // Handle notification events from client
    onClient('notification.state', this.handleNotificationState);
    onClient('notification.notify', this.handleClientNotification);
  }

  // Handle notification from socket
  private handleSocketNotification = (data: UI.Notification.Notification): void => {
    this.addNotification(data);
  };

  // Handle notification from client
  private handleClientNotification = (
    text: string,
    duration?: number,
    type?: UI.Notification.Type,
    centered?: boolean,
  ): void => {
    this.addNotification({
      text,
      duration: duration || 3000,
      type: type || 'info',
      centered: centered || false,
    });
  };

  // Handle notification state update from client
  private handleNotificationState = (event: UI.Notification.Event): void => {
    this.updateState((prevState) => ({ ...prevState, ...event }));
  };

  // Add a notification to the stack (newest first, each tracked independently)
  addNotification(notification: UI.Notification.Notification): void {
    const id = this.nextId++;
    const active: UI.Notification.ActiveNotification = {
      text: notification.text,
      duration: notification.duration || 3000,
      type: notification.type || 'info',
      centered: notification.centered || false,
      id,
      active: false,
    };

    this.updateState((prevState) => {
      const activeNotifications = [active, ...prevState.activeNotifications];

      // Evict the oldest notification(s) once the stack exceeds the max size
      while (activeNotifications.length > MAX_ACTIVE_NOTIFICATIONS) {
        const evicted = activeNotifications.pop();
        if (evicted) {
          this.clearTimeoutsFor(evicted.id);
        }
      }

      return {
        ...prevState,
        activeNotifications,
      };
    });

    // Fade in on the next tick so the mount-time opacity:0 has a chance to paint first
    setTimeout(() => {
      this.updateState((prevState) => ({
        ...prevState,
        activeNotifications: prevState.activeNotifications.map((n) => (n.id === id ? { ...n, active: true } : n)),
      }));
    }, 0);

    // Schedule this notification's own fade-out, independent of the others
    const hide = setTimeout(() => {
      this.hideNotificationById(id);
    }, Math.max(active.duration, MIN_HOLD_MS));

    this.timeouts.set(id, { hide });
  }

  // Start fading out a single notification by id
  private hideNotificationById(id: number): void {
    this.updateState((prevState) => ({
      ...prevState,
      activeNotifications: prevState.activeNotifications.map((n) => (n.id === id ? { ...n, active: false } : n)),
    }));

    // Remove it from the stack once the fade-out transition finishes
    const remove = setTimeout(() => {
      this.updateState((prevState) => ({
        ...prevState,
        activeNotifications: prevState.activeNotifications.filter((n) => n.id !== id),
      }));
      this.timeouts.delete(id);
    }, FADE_OUT_MS);

    const existing = this.timeouts.get(id);
    if (existing) {
      existing.remove = remove;
    }
  }

  // Clear any pending timers for a given notification id
  private clearTimeoutsFor(id: number): void {
    const existing = this.timeouts.get(id);
    if (existing) {
      clearTimeout(existing.hide);
      if (existing.remove) {
        clearTimeout(existing.remove);
      }
      this.timeouts.delete(id);
    }
  }

  // Clear all notifications
  clearNotifications(): void {
    this.timeouts.forEach(({ hide, remove }) => {
      clearTimeout(hide);
      if (remove) clearTimeout(remove);
    });
    this.timeouts.clear();

    this.updateState((prevState) => ({
      ...prevState,
      notifications: [],
      activeNotifications: [],
    }));
  }

  // Skip (immediately start fading out) a specific active notification
  skipNotification(id: number): void {
    this.clearTimeoutsFor(id);
    this.hideNotificationById(id);
  }

  // Check if there's an active notification
  hasActiveNotification(): boolean {
    return this.state.activeNotifications.length > 0;
  }

  // Toggle notification visibility
  toggleVisibility(show?: boolean): void {
    const newShow = show !== undefined ? show : !this.state.show;
    this.updateState((prevState) => ({ ...prevState, show: newShow }));
  }

  // Create a quick notification helper
  notify(
    text: string,
    options?: {
      duration?: number;
      type?: UI.Notification.Type;
      centered?: boolean;
    },
  ): void {
    this.addNotification({
      text,
      duration: options?.duration || 3000,
      type: options?.type || 'info',
      centered: options?.centered || false,
    });
  }

  // Create notification with success styling
  notifySuccess(text: string, duration?: number, centered?: boolean): void {
    this.addNotification({
      text,
      duration: duration || 3000,
      type: 'success',
      centered: centered || false,
    });
  }

  // Create notification with error styling
  notifyError(text: string, duration?: number, centered?: boolean): void {
    this.addNotification({
      text,
      duration: duration || 5000,
      type: 'error',
      centered: centered || false,
    });
  }

  // Create notification with info styling
  notifyInfo(text: string, duration?: number, centered?: boolean): void {
    this.addNotification({
      text,
      duration: duration || 3000,
      type: 'info',
      centered: centered || false,
    });
  }

  // Update state helper with callback support
  private updateState(updater: ((state: NotificationState) => NotificationState) | NotificationState): void {
    if (typeof updater === 'function') {
      this.state = updater(this.state);
    } else {
      this.state = updater;
    }
    this.notifyListeners();
  }

  // Notify all listeners of state change
  private notifyListeners(): void {
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
  getState(): NotificationState {
    return this.state;
  }

  // Cleanup when store is destroyed
  cleanup(): void {
    // Clear all pending timers
    this.timeouts.forEach(({ hide, remove }) => {
      clearTimeout(hide);
      if (remove) clearTimeout(remove);
    });
    this.timeouts.clear();

    // Clear all listeners
    this.listeners.clear();
    this.initialized = false;

    // Reset to initial state
    this.state = {
      show: true,
      notifications: [],
      activeNotifications: [],
    };
  }
}

export default NotificationStore.getInstance();
