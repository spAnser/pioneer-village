import { Component, el } from '../component';
import { modeLabel, UiState } from '../state';

// The cursor-position readout lives inside this component (as a second row
// in the same element), not as a separately fixed-positioned box — two
// independently `position: fixed` elements can only ever be visually fused
// by guessing pixel offsets, which drifts/overlaps. Being true DOM
// parent/child means normal document flow keeps them seamless automatically.
export class StatusStrip extends Component<UiState> {
  private countEl: HTMLElement;
  private modeEl: HTMLElement;
  private undoBtn: HTMLButtonElement;
  private clearBtn: HTMLButtonElement;
  private cursorRow: HTMLElement;
  private cursorValue: HTMLElement;

  private onUndo: () => void;
  private onClear: () => void;

  constructor(handlers: { onUndo: () => void; onClear: () => void }) {
    super('div', 'status-strip');
    this.onUndo = handlers.onUndo;
    this.onClear = handlers.onClear;

    const mainRow = el('div', 'status-strip__row');

    this.countEl = el('span', 'status-strip__count');
    this.modeEl = el('span', 'status-strip__mode');
    const hint = el('span', 'status-strip__hints');
    hint.append(
      el('kbd', undefined, 'F'), ' place point  ',
      el('kbd', undefined, 'Tab'), ' open / close panel  ',
      el('kbd', undefined, 'Esc'), ' deselect / exit ',
    );

    this.undoBtn = el('button', 'status-strip__icon-btn', '↶');
    this.undoBtn.title = 'Undo last point';
    this.undoBtn.addEventListener('click', () => this.onUndo());

    this.clearBtn = el('button', 'status-strip__icon-btn', '✕');
    this.clearBtn.title = 'Clear all points';
    this.clearBtn.addEventListener('click', () => this.onClear());

    mainRow.append(this.countEl, this.undoBtn, this.clearBtn, this.modeEl, hint);

    this.cursorRow = el('div', 'status-strip__cursor-row');
    const cursorLabel = el('span', 'status-strip__cursor-label', 'Cursor position');
    this.cursorValue = el('span', 'status-strip__cursor-value');
    this.cursorRow.append(cursorLabel, this.cursorValue);

    this.el.append(mainRow, this.cursorRow);
  }

  render(state: UiState): void {
    this.countEl.textContent = `${state.points.length} point${state.points.length === 1 ? '' : 's'}`;
    this.modeEl.textContent = modeLabel(state);
    this.undoBtn.disabled = state.points.length === 0;
    this.clearBtn.disabled = state.points.length === 0;

    // Shown whenever we're not in the middle of the nudge stepper, whether
    // or not the raycast actually hit something — a raycast miss (aiming
    // past the max ray distance, or at open sky) is meaningfully different
    // from "no data yet," and hiding the row entirely for it read as the
    // readout being broken rather than as "nothing there to place on."
    const showCursor = state.nudgeIndex === null;
    this.cursorRow.classList.toggle('status-strip__cursor-row--visible', showCursor);
    this.cursorRow.classList.toggle('status-strip__cursor-row--out-of-range', showCursor && !state.cursor);
    if (showCursor) {
      this.cursorValue.textContent = state.cursor
        ? `${state.cursor.x.toFixed(2)}, ${state.cursor.y.toFixed(2)}, ${state.cursor.z.toFixed(2)}`
        : 'Target out of range';
    }
  }
}
