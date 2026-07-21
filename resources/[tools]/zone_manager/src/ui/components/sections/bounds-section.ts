import { Component, el } from '../../component';
import { UiState } from '../../state';

export class BoundsSection extends Component<UiState> {
  private toggle: HTMLElement;
  private body: HTMLElement;
  private minInput: HTMLInputElement;
  private maxInput: HTMLInputElement;
  private snapInput: HTMLInputElement;

  private onToggle: () => void;
  private onChange: (minZ: number, maxZ: number) => void;
  private onSnapChange: (enabled: boolean) => void;

  constructor(handlers: {
    onToggle: () => void;
    onChange: (minZ: number, maxZ: number) => void;
    onSnapChange: (enabled: boolean) => void;
  }) {
    super('div', 'panel-section panel-section--bounds');
    this.onToggle = handlers.onToggle;
    this.onChange = handlers.onChange;
    this.onSnapChange = handlers.onSnapChange;

    this.toggle = el('h2', 'panel-section__title panel-section__title--toggle', 'Bounds');
    this.toggle.addEventListener('click', () => this.onToggle());

    this.body = el('div', 'panel-section__body');
    const hint = el('p', 'panel-section__hint', 'Sets the green preview’s floor and ceiling — shared by the whole zone, not per point.');
    const row = el('div', 'bounds__row');

    const makeInput = (labelText: string) => {
      const label = el('label', 'bounds__field');
      label.append(el('span', '', labelText));
      const input = document.createElement('input');
      input.type = 'number';
      input.step = '0.5';
      label.appendChild(input);
      row.appendChild(label);
      return input;
    };

    this.minInput = makeInput('Min Z');
    this.maxInput = makeInput('Max Z');
    const commit = () => this.onChange(Number(this.minInput.value), Number(this.maxInput.value));
    this.minInput.addEventListener('change', commit);
    this.maxInput.addEventListener('change', commit);

    const snapLabel = el('label', 'bounds__snap');
    this.snapInput = document.createElement('input');
    this.snapInput.type = 'checkbox';
    this.snapInput.addEventListener('change', () => this.onSnapChange(this.snapInput.checked));
    snapLabel.append(this.snapInput, el('span', '', 'Snap Z axis of point to detected ground height.'));

    this.body.append(hint, row, snapLabel);
    this.el.append(this.toggle, this.body);
  }

  render(state: UiState): void {
    this.body.classList.toggle('panel-section--hidden', !state.boundsSectionExpanded);
    this.toggle.classList.toggle('panel-section__title--expanded', state.boundsSectionExpanded);
    if (document.activeElement !== this.minInput) this.minInput.value = String(state.minZ);
    if (document.activeElement !== this.maxInput) this.maxInput.value = String(state.maxZ);
    this.snapInput.checked = state.snapToGround;
  }
}
