class InitManager {
  protected static instance: InitManager;

  static getInstance(): InitManager {
    if (!InitManager.instance) {
      InitManager.instance = new InitManager();
    }
    return InitManager.instance;
  }

  protected _resourcePrefix = 'resource::';

  protected _initializedResources: Set<string> = new Set();
  protected _initializedResolver: Map<string, () => void> = new Map();
  protected _initializedRejector: Map<string, () => void> = new Map();
  protected _initialized: Map<string, Promise<void>> = new Map();

  protected resourceInitialized = false;

  constructor() {
    const numResources = GetNumResources();
    for (let n = numResources; n--; ) {
      const resourceName = GetResourceByFindIndex(n);
      if (resourceName) {
        this.registerResource(resourceName);
      }
    }

    exports('initialized', () => {
      return this.resourceInitialized;
    });

    on('onResourceStart', (resourceName: string) => {
      console.log('!!!!!!!!!!!!!! onResourceStart', resourceName);
      this.registerResource(resourceName);
    });

    on('onResourceStop', (resourceName: string) => {
      if (!this._initializedResources.has(`${this._resourcePrefix}${resourceName}`)) {
        console.log('!!!!!!!!!!!!!! onResourceStop', resourceName);
        this.rejectResource(resourceName);
        this.registerResource(resourceName, { reset: true });
      }
    });
  }

  register: Init.register = (name, options = {}) => {
    if (options.reset && this._initialized.has(name)) {
      this.reject(name);
      this._initialized.delete(name);
      this._initializedResolver.delete(name);
      this._initializedRejector.delete(name);
    }
    if (!this._initialized.has(name)) {
      const promise = new Promise<void>((resolve, reject) => {
        this._initializedResolver.set(name, resolve);
        this._initializedRejector.set(name, reject);
      });
      promise.catch(() => {
        console.log('[INIT] Catch', name);
      });
      this._initialized.set(name, promise);

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
  };

  registerResource: Init.registerResource = (resourceName, options) => {
    this.register(`${this._resourcePrefix}${resourceName}`, options);
  };

  initialized: Init.initialized = (name) => {
    return this._initialized.get(name);
  };

  initializedResource: Init.initializedResource = (resourceName) => {
    return this.initialized(`${this._resourcePrefix}${resourceName}`);
  };

  resolve: Init.resolve = (name) => {
    if (this._initializedResolver.has(name)) {
      console.log('[Init] Resolving', name);
      // @ts-ignore
      this._initializedResolver.get(name)();
      this._initializedResolver.delete(name);
      this._initializedRejector.delete(name);
      this._initializedResources.add(name);
    }
  };

  resolveResource: Init.resolveResource = (resourceName) => {
    console.log('!!!!!!!!!!!!!! resolveResource', resourceName);
    this.resolve(`${this._resourcePrefix}${resourceName}`);
  };

  reject: Init.reject = (name) => {
    if (this._initializedRejector.has(name)) {
      // @ts-ignore
      this._initializedRejector.get(name)();
      this._initializedRejector.delete(name);
      this._initializedResolver.delete(name);
    }
  };

  rejectResource: Init.rejectResource = (resourceName) => {
    this.reject(`${this._resourcePrefix}${resourceName}`);
  };
}

export const initManager = InitManager.getInstance();
