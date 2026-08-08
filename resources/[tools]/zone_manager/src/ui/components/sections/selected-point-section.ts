import { Component, el } from '../../component';
import { UiState } from '../../state';

export class SelectedPointSection extends Component<UiState> {
  private title: HTMLElement;
  private inputs: Record<ZoneManagerNew.Axis, HTMLInputElement>;
  private deleteBtn: HTMLButtonElement;

  private onSetPosition: (axis: ZoneManagerNew.Axis, value: number) => void;
  private onDelete: () => void;

  constructor(handlers: { onSetPosition: (axis: ZoneManagerNew.Axis, value: number) => void; onDelete: () => void }) {
    super('div', 'panel-section panel-section--selected-point');
    this.onSetPosition = handlers.onSetPosition;
    this.onDelete = handlers.onDelete;

    this.title = el('h2', 'panel-section__title');
    const fields = el('div', 'selected-point__fields');

    const makeField = (axis: ZoneManagerNew.Axis) => {
      const wrap = el('label', `selected-point__field selected-point__field--${axis}`);
      wrap.append(el('span', 'selected-point__axis-label', axis.toUpperCase()));
      const input = document.createElement('input');
      input.type = 'number';
      input.step = '0.01';
      input.addEventListener('change', () => this.onSetPosition(axis, Number(input.value)));
      wrap.appendChild(input);
      fields.appendChild(wrap);
      return input;
    };

    this.inputs = { x: makeField('x'), y: makeField('y'), z: makeField('z') };

    // The green preview wall's vertical extent comes from Bounds' Min/Max Z
    // only — the zones resource's AddPoly takes a flat 2D footprint plus one
    // shared floor/ceiling for the whole shape, not a per-vertex height, so
    // nudging a point's own Z (exported for reference/precision) can never
    // visibly reshape the preview. Flagging this here since it's easy to
    // expect otherwise.
    const zHint = el(
      'p',
      'panel-section__hint',
      "The Z axis doesn't affect the rendered green preview section's height, that only follows Bounds' Min/Max Z set below.",
    );

    this.deleteBtn = el('button', 'panel-button panel-button--danger', 'Delete point') as HTMLButtonElement;
    this.deleteBtn.addEventListener('click', () => this.onDelete());

    this.el.append(this.title, fields, zHint, this.deleteBtn);
  }

  render(state: UiState): void {
    const active = state.selectedIndex !== null && !!state.points[state.selectedIndex];
    this.el.classList.toggle('panel-section--hidden', !active);
    if (!active) return;

    const point = state.points[state.selectedIndex!];
    this.title.textContent = `Point ${state.selectedIndex}`;
    (['x', 'y', 'z'] as ZoneManagerNew.Axis[]).forEach((axis) => {
      if (document.activeElement !== this.inputs[axis]) {
        this.inputs[axis].value = point[axis].toFixed(2);
      }
    });
  }
}
