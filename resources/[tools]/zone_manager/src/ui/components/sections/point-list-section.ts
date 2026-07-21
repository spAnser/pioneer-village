import { Component, el } from '../../component';
import { UiState } from '../../state';

export class PointListSection extends Component<UiState> {
  private list: HTMLElement;
  private emptyState: HTMLElement;

  private onSelect: (index: number) => void;
  private onHover: (index: number | null) => void;
  private onDelete: (index: number) => void;

  constructor(handlers: { onSelect: (index: number) => void; onHover: (index: number | null) => void; onDelete: (index: number) => void }) {
    super('div', 'panel-section panel-section--points');
    this.onSelect = handlers.onSelect;
    this.onHover = handlers.onHover;
    this.onDelete = handlers.onDelete;

    this.el.appendChild(el('h2', 'panel-section__title', 'Points'));
    this.emptyState = el('p', 'panel-section__hint', 'No points placed yet — click or press F in the world to place your first point.');
    this.list = el('ol', 'point-list');
    this.el.append(this.emptyState, this.list);
  }

  render(state: UiState): void {
    this.emptyState.classList.toggle('panel-section--hidden', state.points.length > 0);
    this.list.classList.toggle('panel-section--hidden', state.points.length === 0);

    if (this.list.childElementCount !== state.points.length) {
      this.list.innerHTML = '';
      state.points.forEach((_, index) => {
        const row = el('li', 'point-list__row');
        row.addEventListener('click', () => this.onSelect(index));
        row.addEventListener('mouseenter', () => this.onHover(index));
        row.addEventListener('mouseleave', () => this.onHover(null));

        const label = el('span', 'point-list__label');
        const remove = el('span', 'point-list__remove', '×');
        remove.addEventListener('click', (e) => {
          e.stopPropagation();
          this.onDelete(index);
        });

        row.append(label, remove);
        this.list.appendChild(row);
      });
    }

    state.points.forEach((p, index) => {
      const row = this.list.children[index] as HTMLElement;
      row.classList.toggle('point-list__row--selected', state.selectedIndex === index);
      row.querySelector('.point-list__label')!.textContent = `[${index}] ${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(2)}`;
    });
  }
}
