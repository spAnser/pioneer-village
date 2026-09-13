import { Component, el } from '../component';
import { TRANSLATION_SNAPS, type TranslationSnap } from '../scene/gizmo';
import { type UiState, selectionLabel } from '../state';

export interface StatusHandlers {
  onSnap: (snap: TranslationSnap) => void;
  onToggleMirror: () => void;
  onUndo: () => void;
  onClose: () => void;
}

export class StatusBar extends Component<UiState> {
  private readonly selection = el('span', 'status__selection');
  private readonly cursor = el('span', 'status__cursor');
  private readonly mirror = el('button', 'chip');
  private readonly undo = el('button', 'chip') as HTMLButtonElement;
  private readonly snapChips = new Map<TranslationSnap, HTMLButtonElement>();
  private readonly failures = el('div', 'status__failures');

  constructor(private readonly handlers: StatusHandlers) {
    super('div', 'status');

    const main = el('div', 'status__row');
    main.appendChild(this.selection);
    main.appendChild(this.cursor);

    const snapGroup = el('div', 'chip-group');
    snapGroup.appendChild(el('span', 'chip-group__label', 'snap'));
    for (const snap of TRANSLATION_SNAPS) {
      const chip = el('button', 'chip', snap === null ? 'off' : String(snap));
      chip.addEventListener('click', () => this.handlers.onSnap(snap));
      snapGroup.appendChild(chip);
      this.snapChips.set(snap, chip);
    }
    main.appendChild(snapGroup);

    this.mirror.addEventListener('click', () => this.handlers.onToggleMirror());
    this.mirror.title = 'Reflect the opposite handle when dragging one (M)';
    main.appendChild(this.mirror);

    this.undo.addEventListener('click', () => this.handlers.onUndo());
    main.appendChild(this.undo);

    const close = el('button', 'chip chip--danger', 'close (Esc)');
    close.addEventListener('click', () => this.handlers.onClose());
    main.appendChild(close);

    this.el.appendChild(main);
    this.el.appendChild(this.failures);
    this.el.appendChild(
      el(
        'div',
        'status__hints',
        'WASD/QE fly · Shift sprint · right-drag look · click node or handle · ' +
          'I insert · Del delete · F focus · [ ] step node · Ctrl+Z undo',
      ),
    );
  }

  render(state: UiState): void {
    this.selection.textContent = `${state.selectedTrackKey ?? 'no track'} — ${selectionLabel(state)}`;
    this.cursor.textContent = state.cursor
      ? `cursor ${state.cursor.x.toFixed(2)}, ${state.cursor.y.toFixed(2)}, ${state.cursor.z.toFixed(2)}`
      : 'cursor —';

    for (const [snap, chip] of this.snapChips) {
      chip.classList.toggle('chip--active', snap === state.translationSnap);
    }

    this.mirror.textContent = `mirror ${state.mirrorHandles ? 'on' : 'off'}`;
    this.mirror.classList.toggle('chip--active', state.mirrorHandles);

    this.undo.textContent = state.undoLabel ? `undo: ${state.undoLabel}` : 'undo';
    this.undo.disabled = !state.undoLabel;

    if (this.failures.childElementCount !== state.loadFailures.length) {
      this.failures.replaceChildren(...state.loadFailures.map((text) => el('p', 'panel-warning', text)));
    }
  }
}
