import { Socket } from 'socket.io-client';

import { onClient } from '@lib/ui';

interface JobsState {
  show: boolean;
  loading: boolean;
  error: string | null;
  isClocked: boolean;
  currentJob: Jobs.JobDefinition | null;
  availableJobs: Jobs.JobDefinition[];
  clockedInEmployees: number;
  activeTasks: Jobs.TaskInstance[];
}

type StateListener = (state: JobsState) => void;

const REFRESH_INTERVAL = 30000;

/**
 * Read-mostly panel over the socket server's jobs state.
 *
 * Clocking in is deliberately absent: a job may carry a location constraint and
 * only the game client knows where the ped is standing, so clock-in belongs to
 * the jobs client resource, which passes real coords. Clocking out has no such
 * constraint and is safe to drive from here.
 *
 * Nothing pushes jobs updates into NUI — the socket server broadcasts under the
 * `__client__` envelope, which the app forwards on to the game client rather
 * than back into the UI — so the panel polls while it is open instead.
 */
class JobsStore {
  private static instance: JobsStore;
  private socket: Socket<SocketOut.ToClient, SocketIn.FromClient> | null = null;
  private state: JobsState;
  private listeners = new Set<StateListener>();
  private clientHandlersSetup = false;
  private refreshInterval: NodeJS.Timeout | null = null;
  /** Discards responses from a refresh the panel has already moved past. */
  private refreshToken = 0;

  private constructor() {
    this.state = {
      show: false,
      loading: false,
      error: null,
      isClocked: false,
      currentJob: null,
      availableJobs: [],
      clockedInEmployees: 0,
      activeTasks: [],
    };
  }

  static getInstance(): JobsStore {
    if (!JobsStore.instance) {
      JobsStore.instance = new JobsStore();
    }
    return JobsStore.instance;
  }

  initialize(socket: Socket<SocketOut.ToClient, SocketIn.FromClient>): void {
    this.cleanup();

    this.socket = socket;
    this.setupClientHandlers();

    if (this.state.show) {
      this.refreshJobState();
      this.startPolling();
    }
  }

  private setupClientHandlers(): void {
    // @lib/ui offers no way to unregister, so these are registered exactly once
    // for the lifetime of the page.
    if (this.clientHandlersSetup) return;
    this.clientHandlersSetup = true;

    onClient('jobs.toggle', this.handleToggle);
    onClient('jobs.show', this.handleShow);
    onClient('jobs.hide', this.handleHide);
  }

  private handleToggle = (show: boolean): void => {
    if (show) {
      this.handleShow();
    } else {
      this.handleHide();
    }
  };

  private handleShow = (): void => {
    if (this.state.show) return;

    this.updateState({ show: true });
    this.refreshJobState();
    this.startPolling();
  };

  private handleHide = (): void => {
    if (!this.state.show) return;

    this.stopPolling();
    this.refreshToken += 1;
    this.updateState({ show: false, loading: false });
  };

  private startPolling(): void {
    this.stopPolling();
    this.refreshInterval = setInterval(this.refreshJobState, REFRESH_INTERVAL);
  }

  private stopPolling(): void {
    if (!this.refreshInterval) return;

    clearInterval(this.refreshInterval);
    this.refreshInterval = null;
  }

  private refreshJobState = (): void => {
    if (!this.socket) {
      this.updateState({ loading: false, error: 'Not connected' });
      return;
    }

    this.refreshToken += 1;
    const token = this.refreshToken;

    this.updateState({ loading: true, error: null });

    this.socket.emit('jobs.get-state', (state) => {
      if (token !== this.refreshToken) return;

      if (state.error) {
        this.updateState({ loading: false, error: state.error });
        return;
      }

      this.updateState({
        loading: false,
        error: null,
        isClocked: state.isClocked,
        currentJob: state.currentJob,
        availableJobs: state.availableJobs,
        clockedInEmployees: state.clockedInEmployees,
      });
    });

    this.socket.emit('jobs.get-active-tasks', (instances) => {
      if (token !== this.refreshToken) return;

      this.updateState({ activeTasks: instances });
    });
  };

  performClockOut(): Promise<Jobs.ClockResult> {
    return new Promise((resolve) => {
      if (!this.socket) {
        resolve({ success: false, error: 'Not connected' });
        return;
      }

      this.socket.emit('jobs.clock-out', (result) => {
        if (result.success) {
          this.refreshJobState();
        } else {
          this.updateState({ error: result.error ?? 'Unable to clock out' });
        }
        resolve(result);
      });
    });
  }

  close(): void {
    this.handleHide();
  }

  updateState(newState: Partial<JobsState>): void {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((listener) => listener(this.state));
  }

  subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => {
      this.listeners.delete(listener);
    };
  }

  getState(): JobsState {
    return this.state;
  }

  /**
   * Drops the poll timer bound to the previous socket. React subscribers are owned
   * by the components that added them and deliberately survive a re-initialize.
   */
  cleanup(): void {
    this.stopPolling();
    this.refreshToken += 1;
  }
}

export default JobsStore.getInstance();
