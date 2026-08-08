import { Socket } from 'socket.io-client';

import { emitClient, onClient, onClientCall } from '@lib/ui';

// Store state interface matching the Target component's state
interface TargetState {
  show: boolean;
  active: boolean;
  context: number | string;
  type: number;
  flag: string;
  actions: Target.Item[];
}

type StateListener = (state: TargetState) => void;

class TargetStore {
  private static instance: TargetStore;
  private socket: Socket<SocketOut.ToClient, SocketIn.FromClient> | null = null;
  private state: TargetState;
  private listeners = new Set<StateListener>();
  private initialized = false;

  private constructor() {
    this.state = {
      show: false,
      active: false,
      context: 0,
      type: -1,
      flag: '',
      actions: [],
    };
  }

  static getInstance(): TargetStore {
    if (!TargetStore.instance) {
      TargetStore.instance = new TargetStore();
    }
    return TargetStore.instance;
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

    // Socket handlers can be added here if needed for real-time target updates
    // Example:
    // this.socket.on('target.update', this.handleTargetUpdate);
  }

  private setupClientHandlers(): void {
    // Handle target state updates from client
    onClient('target.state', this.handleTargetState);
  }

  // Handle target state update from client
  private handleTargetState = (event: UI.TargetLayer.Event): void => {
    if (!event) return;

    // Don't hide if we have actions displayed
    if (!event.show && this.state.actions.length > 0) {
      return;
    }

    this.updateState(event);
  };

  // Show target with configuration
  showTarget(context: number | string, type: number, flag?: string): void {
    this.updateState({
      show: true,
      active: false,
      context,
      type,
      flag: flag || '',
      actions: [],
    });
  }

  // Hide target
  hideTarget(): void {
    this.updateState({
      show: false,
      active: false,
      context: 0,
      type: -1,
      flag: '',
      actions: [],
    });
  }

  // Set active state (when player is in range)
  setActive(active: boolean): void {
    this.updateState({ active });
  }

  // Set target actions
  setActions(actions: Target.Item[]): void {
    this.updateState({ actions, show: true });
  }

  // Add a single action
  addAction(action: Target.Item): void {
    const actions = [...this.state.actions, action];
    this.updateState({ actions, show: true });
  }

  // Remove an action by id
  removeAction(actionId: string): void {
    const actions = this.state.actions.filter((a) => a.id !== actionId);
    this.updateState({ actions });
  }

  // Clear all actions
  clearActions(): void {
    this.updateState({ actions: [] });
  }

  // Perform an action
  performAction(action: Target.Item): void {
    console.log('performAction', action);
    emitClient('target.action', this.state.context, action);
    this.hideTarget();
  }

  // Update target context
  setContext(context: number | string): void {
    this.updateState({ context });
  }

  // Update target type
  setType(type: number): void {
    this.updateState({ type });
  }

  // Update target flag
  setFlag(flag: string): void {
    this.updateState({ flag });
  }

  // Get icon configuration based on current state
  getIcon(): { style?: 'light' | 'regular' | 'solid' | 'duotone'; icon: string } {
    // Special flags override type
    switch (this.state.flag) {
      case 'isHorse':
        return { style: 'solid', icon: 'horse-saddle' };
      case 'isPiano':
        return { style: 'solid', icon: 'piano' };
      case 'isCashRegister':
        return { style: 'duotone', icon: 'cash-register' };
    }

    // Default icons based on type
    switch (this.state.type) {
      case 3:
        return { style: 'solid', icon: 'hand-paper' }; // Objects / Doors
      case 2:
        return { style: 'solid', icon: 'wagon-covered' }; // Vehicles
      case 1:
        return { style: 'solid', icon: 'male' }; // NPCs/Players
      case 0:
        return { style: 'solid', icon: 'hand-paper' }; // Default interact
      default:
        return { style: 'light', icon: 'eye' }; // Look/examine
    }
  }

  // Check if target has actions
  hasActions(): boolean {
    return this.state.actions.length > 0;
  }

  // Check if target is visible
  isVisible(): boolean {
    return this.state.show;
  }

  // Check if target is active (in range)
  isActive(): boolean {
    return this.state.active;
  }

  // Get action by id
  getAction(actionId: string): Target.Item | undefined {
    return this.state.actions.find((a) => a.id === actionId);
  }

  // Batch update multiple values
  updateValues(updates: Partial<TargetState>): void {
    this.updateState({ ...updates });
  }

  // Update state and notify listeners
  updateState(newState: Partial<TargetState>): void {
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
  getState(): TargetState {
    return this.state;
  }

  // Get specific state value
  getValue<K extends keyof TargetState>(key: K): TargetState[K] {
    return this.state[key];
  }

  // Reset target to default state
  reset(): void {
    this.updateState({
      show: false,
      active: false,
      context: 0,
      type: -1,
      flag: '',
      actions: [],
    });
  }

  // Handle escape key press
  handleEscape(): void {
    this.hideTarget();
  }

  // Cleanup when store is destroyed
  cleanup(): void {
    if (this.socket) {
      // Remove socket handlers if any were added
      // Example:
      // this.socket.off('target.update', this.handleTargetUpdate);
    }

    this.listeners.clear();
    this.initialized = false;
  }
}

export default TargetStore.getInstance();
