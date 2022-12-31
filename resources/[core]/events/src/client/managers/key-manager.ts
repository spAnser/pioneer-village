//RegisterKeyMapping('+whistle', 'Police Whistle', 'keyboard', 'k');

export class KeyManager {
  protected static instance: KeyManager;

  static getInstance(): KeyManager {
    if (!KeyManager.instance) {
      KeyManager.instance = new KeyManager();
    }
    return KeyManager.instance;
  }

  protected keys: Map<string, Set<string>> = new Map();
  protected keyIsDown: Map<string, boolean> = new Map();

  register(command: string, key: string): void {
    if (!this.keys.has(key)) {
      this.keys.set(key, new Set());
    }
    this.keys.get(key)?.add(command);
  }

  unregister(command: string, key: string): void {
    if (this.keys.has(key)) {
      this.keys.get(key)?.delete(command);
    }
  }

  tick(): void {
    for (const key of this.keys.keys()) {
      let keyChanged = false;
      const wasPressed = this.keyIsDown.get(key);
      const currentlyPressed = IsControlPressed(0, key);
      if (!wasPressed && currentlyPressed) {
        this.keyIsDown.set(key, true);
        keyChanged = true;
      } else if (wasPressed && !currentlyPressed) {
        this.keyIsDown.set(key, false);
        keyChanged = true;
      }
      if (keyChanged) {
        if (this.keyIsDown.get(key)) {
          for (const command of this.keys.get(key) ?? []) {
            ExecuteCommand(command);
          }
        } else {
          for (const command of this.keys.get(key) ?? []) {
            ExecuteCommand(command.replace('+', '-'));
          }
        }
      }
    }
  }
}

export default KeyManager.getInstance();
