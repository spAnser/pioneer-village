interface InitOptions {
  reset?: boolean;
  resolveAfter?: number;
  rejectAfter?: number;
}

const initSteps = ['base'];

const currentResourceName = GetCurrentResourceName();
const isServer = IsDuplicityVersion();

class InitManager {
  protected static instance: InitManager;

  static getInstance(): InitManager {
    if (!InitManager.instance) {
      InitManager.instance = new InitManager();
    }
    return InitManager.instance;
  }

  protected _initializedResolver: Map<string, () => void> = new Map();
  protected _initializedRejector: Map<string, () => void> = new Map();
  protected _initialized: Map<string, Promise<void>> = new Map();

  protected resourceInitialized = false;

  constructor() {
    for (const initStep of initSteps) {
      this.register(initStep);
    }

    this.register(currentResourceName);
    exports('initialized', () => {
      return this.resourceInitialized;
    });

    on('init-manager:resource', (resourceName: string): void => {
      if (resourceName !== currentResourceName) {
        this.registerResource(resourceName);
      }
    });
    emit('init-manager:get-resources', currentResourceName);
    on('init-manager:initialize:resource', (resourceName: string): void => {
      if (resourceName !== currentResourceName) {
        this.resolve(resourceName);
      }
    });
  }

  registerResource(resourceName: string): void {
    const resourceExports = exports[resourceName];
    this.register(resourceName);
    if (GetResourceState(resourceName) === 'started' && resourceExports.initialized()) {
      this.resolve(resourceName);
    }
  }

  resolveThisResource(): void {
    this.resourceInitialized = true;
    this.resolve(currentResourceName);
    emit('init-manager:initialize:resource', currentResourceName);
  }

  initializedThisResource(): Promise<void> | undefined {
    return this._initialized.get(currentResourceName);
  }

  register(name: string, options: InitOptions = {}): void {
    if (options.reset && this._initialized.has(name)) {
      this.reject(name);
      this._initialized.delete(name);
      this._initializedResolver.delete(name);
      this._initializedRejector.delete(name);
    }
    if (!this._initialized.has(name)) {
      this._initialized.set(
        name,
        new Promise((resolve, reject) => {
          this._initializedResolver.set(name, resolve);
          this._initializedRejector.set(name, reject);
        }),
      );

      if (typeof options.resolveAfter === 'number') {
        setTimeout(() => {
          this.resolve(name);
        }, options.resolveAfter);
      }
      if (typeof options.rejectAfter === 'number') {
        setTimeout(() => {
          this.reject(name);
        }, options.rejectAfter);
      }
    }
  }

  registerMultiple(names: string[], options: InitOptions = {}): void {
    for (const name of names) {
      this.register(name, options);
    }
  }

  initialized(name: string): Promise<void> | undefined {
    return this._initialized.get(name);
  }

  resolve(name: string): void {
    if (this._initializedResolver.has(name)) {
      // @ts-ignore
      this._initializedResolver.get(name)();
      this._initializedResolver.delete(name);
    }
  }

  reject(name: string): void {
    if (this._initializedRejector.has(name)) {
      // @ts-ignore
      this._initializedRejector.get(name)();
      this._initializedRejector.delete(name);
    }
  }
}

export const initManager = InitManager.getInstance();
