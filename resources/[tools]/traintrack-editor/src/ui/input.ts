import { post } from './comms';

/**
 * Keyboard and camera-look input.
 *
 * Movement keys are forwarded to the client as press/release rather than as a
 * per-frame "move" call, so the actual stepping happens in the game's own tick
 * -- see FreeCamera. Mouse look posts raw deltas for the same reason: the
 * client queues them and drains them in that same tick.
 */

const MOVE_KEYS: Record<string, TraintrackEditor.MoveKey> = {
  KeyW: 'w',
  KeyS: 's',
  KeyA: 'a',
  KeyD: 'd',
  KeyQ: 'q',
  KeyE: 'e',
  ShiftLeft: 'sprint',
  ShiftRight: 'sprint',
};

export interface InputHandlers {
  onClose: () => void;
  onUndo: () => void;
  onDelete: () => void;
  onInsert: () => void;
  onFocusSelection: () => void;
  onToggleMirror: () => void;
  onCycleSelection: (delta: number) => void;
}

/** Typing in a field must not fly the camera or delete the selected node. */
function isTextEntry(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
}

export class InputController {
  private active = false;
  private looking = false;
  private held = new Set<TraintrackEditor.MoveKey>();

  constructor(private readonly handlers: InputHandlers) {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    // Losing focus mid-flight would otherwise leave a key latched down on the
    // client and the camera drifting forever.
    window.addEventListener('blur', () => this.releaseAll());
  }

  setActive(active: boolean): void {
    this.active = active;
    if (!active) this.releaseAll();
  }

  private releaseAll(): void {
    for (const key of this.held) void post('move_input', { key, pressed: false });
    this.held.clear();
    if (this.looking) {
      this.looking = false;
      void post('set_camera_rotating', { rotating: false });
    }
  }

  private setMoveKey(key: TraintrackEditor.MoveKey, pressed: boolean): void {
    if (pressed === this.held.has(key)) return;
    if (pressed) this.held.add(key);
    else this.held.delete(key);
    void post('move_input', { key, pressed });
  }

  private onKeyDown = (event: KeyboardEvent): void => {
    if (!this.active) return;
    if (isTextEntry(event.target)) return;

    const moveKey = MOVE_KEYS[event.code];
    if (moveKey) {
      // Held keys repeat; the client only cares about the transition.
      if (!event.repeat) this.setMoveKey(moveKey, true);
      event.preventDefault();
      return;
    }

    if (event.ctrlKey && event.code === 'KeyZ') {
      this.handlers.onUndo();
      event.preventDefault();
      return;
    }

    switch (event.code) {
      case 'Delete':
        this.handlers.onDelete();
        break;
      case 'KeyI':
        this.handlers.onInsert();
        break;
      case 'KeyF':
        this.handlers.onFocusSelection();
        break;
      case 'KeyM':
        this.handlers.onToggleMirror();
        break;
      case 'BracketLeft':
        this.handlers.onCycleSelection(-1);
        break;
      case 'BracketRight':
        this.handlers.onCycleSelection(1);
        break;
      default:
        return;
    }
    event.preventDefault();
  };

  private onKeyUp = (event: KeyboardEvent): void => {
    if (event.code === 'Escape') {
      if (isTextEntry(event.target)) {
        (event.target as HTMLElement).blur();
        return;
      }
      this.handlers.onClose();
      return;
    }
    if (!this.active) return;
    const moveKey = MOVE_KEYS[event.code];
    // Released outside the guard above so a key held while focus moves into a
    // field still gets its release sent.
    if (moveKey) this.setMoveKey(moveKey, false);
  };

  private onMouseDown = (event: MouseEvent): void => {
    if (!this.active || event.button !== 2) return;
    this.looking = true;
    void post('set_camera_rotating', { rotating: true });
  };

  private onMouseUp = (event: MouseEvent): void => {
    if (event.button !== 2 || !this.looking) return;
    this.looking = false;
    void post('set_camera_rotating', { rotating: false });
  };

  private onMouseMove = (event: MouseEvent): void => {
    if (!this.looking) return;
    void post('rotate_camera', { dx: event.movementX, dy: event.movementY });
  };
}
