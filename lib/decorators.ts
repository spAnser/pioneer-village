import objectHash from 'object-hash';
import { clamp } from '@lib/math';

export function get<T>(target: T, name: string): void {
  Object.defineProperty(target, name, {
    get: function () {
      return this['_' + name];
    },
    enumerable: true,
    configurable: true,
  });
}

export function set<T>(target: T, name: string): void {
  Object.defineProperty(target, name, {
    set: function (value) {
      if (this['_' + name] !== value) {
        this._dirty = true;
        this['_' + name] = value;
      }
    },
    enumerable: true,
    configurable: true,
  });
}

export function setDate<T>(target: T, name: string): void {
  Object.defineProperty(target, name, {
    set: function (value) {
      if (!this['_' + name] || this['_' + name].toISOString() !== value.toISOString()) {
        this._dirty = true;
        this['_' + name] = value;
      }
    },
    enumerable: true,
    configurable: true,
  });
}

export function setObj<T>(target: T, name: string): void {
  Object.defineProperty(target, name, {
    set: function (value) {
      if ((!this['_' + name] && value) || objectHash(this['_' + name]) !== objectHash(value)) {
        this._dirty = true;
        this['_' + name] = value;
      }
    },
    enumerable: true,
    configurable: true,
  });
}

export function setBase<T>(target: T, name: string): void {
  Object.defineProperty(target, name, {
    set: function (value) {
      if ((!this['_' + name] && value) || this['_' + name].id !== value.id) {
        this._dirty = true;
        this['_' + name] = value;
      }
    },
    enumerable: true,
    configurable: true,
  });
}

export function setRegEx(regEx: RegExp): Function {
  function setRegExDecorator<T>(target: T, name: string): void {
    Object.defineProperty(target, name, {
      set: function (value: string) {
        if (value.match(regEx) && this['_' + name] !== value) {
          this._dirty = true;
          this['_' + name] = value;
        }
      },
      enumerable: true,
      configurable: true,
    });
  }

  return setRegExDecorator;
}

export function setClamp(min: number, max: number): Function {
  function setClampDecorator<T>(target: T, name: string): void {
    Object.defineProperty(target, name, {
      set: function (value) {
        value = clamp(value, min, max);
        if (this['_' + name] !== value) {
          this._dirty = true;
          this['_' + name] = value;
        }
      },
      enumerable: true,
      configurable: true,
    });
  }

  return setClampDecorator;
}

export function setLock(lockValue: unknown): Function {
  function setLockDecorator<T>(target: T, name: string): void {
    Object.defineProperty(target, name, {
      set: function (value) {
        if (this['_' + name] !== lockValue && this['_' + name] !== value) {
          this._dirty = true;
          this['_' + name] = value;
        }
      },
      enumerable: true,
      configurable: true,
    });
  }

  return setLockDecorator;
}

export function setLockIncrease<T>(target: T, name: string): void {
  Object.defineProperty(target, name, {
    set: function (value) {
      if (this['_' + name] < value) {
        this._dirty = true;
        this['_' + name] = value;
      }
    },
    enumerable: true,
    configurable: true,
  });
}

export function setLockDecrease<T>(target: T, name: string): void {
  Object.defineProperty(target, name, {
    set: function (value) {
      if (this['_' + name] > value) {
        this._dirty = true;
        this['_' + name] = value;
      }
    },
    enumerable: true,
    configurable: true,
  });
}
