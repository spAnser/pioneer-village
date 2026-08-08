import { Component, el } from '../component';
import { UiState } from '../state';

const NUDGE_STEP = 0.1;
const NUDGE_STEP_FAST = 0.5;

export class Hud extends Component<UiState> {
  private nudge: HTMLElement;
  private nudgeRows: Record<ZoneManagerNew.Axis, { value: HTMLElement; minus: HTMLButtonElement; plus: HTMLButtonElement }>;

  private onNudge: (axis: ZoneManagerNew.Axis, delta: number) => void;
  private onDismissNudge: () => void;

  constructor(handlers: { onNudge: (axis: ZoneManagerNew.Axis, delta: number) => void; onDismissNudge: () => void }) {
    super('div', 'hud');
    this.onNudge = handlers.onNudge;
    this.onDismissNudge = handlers.onDismissNudge;

    this.nudge = el('div', 'hud__nudge');

    const makeRow = (axis: ZoneManagerNew.Axis) => {
      const row = el('div', `hud__nudge-row hud__nudge-row--${axis}`);
      const label = el('span', 'hud__nudge-label', axis.toUpperCase());
      const minus = el('button', 'hud__nudge-btn', '−');
      const value = el('span', 'hud__nudge-value', '0.00');
      const plus = el('button', 'hud__nudge-btn', '+');
      minus.addEventListener('click', (e) => this.onNudge(axis, (e.shiftKey ? -NUDGE_STEP_FAST : -NUDGE_STEP)));
      plus.addEventListener('click', (e) => this.onNudge(axis, e.shiftKey ? NUDGE_STEP_FAST : NUDGE_STEP));
      row.append(label, minus, value, plus);
      this.nudge.appendChild(row);
      return { value, minus, plus };
    };

    this.nudgeRows = {
      x: makeRow('x'),
      y: makeRow('y'),
      z: makeRow('z'),
    };

    const dismiss = el('button', 'hud__nudge-dismiss', 'Done');
    dismiss.addEventListener('click', () => this.onDismissNudge());
    this.nudge.appendChild(dismiss);

    this.el.append(this.nudge);
  }

  render(state: UiState): void {
    const showNudge = state.nudgeIndex !== null && state.points[state.nudgeIndex];
    this.nudge.classList.toggle('hud--visible', !!showNudge);

    if (showNudge) {
      const p = state.points[state.nudgeIndex!];
      (['x', 'y', 'z'] as ZoneManagerNew.Axis[]).forEach((axis) => {
        this.nudgeRows[axis].value.textContent = p[axis].toFixed(2);
      });
    }
  }
}
