import { Component, el } from '../../component';
import { UiState } from '../../state';

// Distance the mouse must move from mousedown before a press becomes a
// drag — without this, every plain click would immediately register as a
// (zero-distance) drag and fight with the click-to-select handler below.
const DRAG_START_THRESHOLD_PX = 4;

export class PointListSection extends Component<UiState> {
  private list: HTMLElement;
  private emptyState: HTMLElement;

  private onSelect: (index: number) => void;
  private onHover: (index: number | null) => void;
  private onDelete: (index: number) => void;
  private onReorder: (fromIndex: number, toIndex: number) => void;

  // Native HTML5 drag-and-drop (draggable + dragstart/dragover/drop) does
  // not fire reliably inside FiveM's CEF browser, so reordering is done
  // with plain mouse events instead — same approach already used for the
  // gizmo/plane dragging elsewhere in this UI.
  private dragFromIndex: number | null = null;
  private dragStartY: number | null = null;
  private dragging = false;
  private dragOverIndex: number | null = null;

  constructor(handlers: {
    onSelect: (index: number) => void;
    onHover: (index: number | null) => void;
    onDelete: (index: number) => void;
    onReorder: (fromIndex: number, toIndex: number) => void;
  }) {
    super('div', 'panel-section panel-section--points');
    this.onSelect = handlers.onSelect;
    this.onHover = handlers.onHover;
    this.onDelete = handlers.onDelete;
    this.onReorder = handlers.onReorder;

    this.el.appendChild(el('h2', 'panel-section__title', 'Points'));
    this.emptyState = el('p', 'panel-section__hint');
    this.emptyState.append('No points placed yet — click or press ', el('kbd', undefined, 'F'), ' in the world to place your first point.');
    this.list = el('ol', 'point-list');
    this.el.append(this.emptyState, this.list);

    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('mouseup', () => this.onMouseUp());
  }

  render(state: UiState): void {
    this.emptyState.classList.toggle('panel-section--hidden', state.points.length > 0);
    this.list.classList.toggle('panel-section--hidden', state.points.length === 0);

    if (this.list.childElementCount !== state.points.length) {
      this.list.innerHTML = '';
      state.points.forEach(() => {
        const row = el('li', 'point-list__row');

        // Index read fresh from the row's dataset at event time, not
        // captured in this closure — rows are only rebuilt when the point
        // COUNT changes, so a pure reorder leaves the same row elements in
        // place and just reassigns their dataset.index each render. A
        // closure-captured index would go stale after any earlier reorder.
        row.addEventListener('mousedown', (e) => {
          if ((e.target as HTMLElement).closest('.point-list__remove')) return;
          this.dragFromIndex = Number(row.dataset.index);
          this.dragStartY = e.clientY;
          this.dragging = false;
        });
        row.addEventListener('click', () => {
          if (this.dragging) return;
          this.onSelect(Number(row.dataset.index));
        });
        row.addEventListener('mouseenter', () => {
          if (!this.dragging) this.onHover(Number(row.dataset.index));
        });
        row.addEventListener('mouseleave', () => {
          if (!this.dragging) this.onHover(null);
        });

        const label = el('span', 'point-list__label');
        const remove = el('span', 'point-list__remove', '×');
        remove.addEventListener('click', (e) => {
          e.stopPropagation();
          this.onDelete(Number(row.dataset.index));
        });

        row.append(label, remove);
        this.list.appendChild(row);
      });
    }

    state.points.forEach((p, index) => {
      const row = this.list.children[index] as HTMLElement;
      row.dataset.index = String(index);
      row.classList.toggle('point-list__row--selected', state.selectedIndex === index);
      row.classList.toggle('point-list__row--dragging', this.dragging && this.dragFromIndex === index);
      row.classList.toggle('point-list__row--drag-over', this.dragging && this.dragOverIndex === index);
      row.querySelector('.point-list__label')!.textContent = `[${index}] ${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(2)}`;
    });
  }

  private onMouseMove(e: MouseEvent): void {
    if (this.dragFromIndex === null || this.dragStartY === null) return;

    if (!this.dragging) {
      if (Math.abs(e.clientY - this.dragStartY) < DRAG_START_THRESHOLD_PX) return;
      this.dragging = true;
    }

    const rows = Array.from(this.list.children) as HTMLElement[];
    let overIndex: number | null = null;
    for (const row of rows) {
      const rect = row.getBoundingClientRect();
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        overIndex = Number(row.dataset.index);
        break;
      }
    }
    if (overIndex !== this.dragOverIndex) {
      this.dragOverIndex = overIndex;
      this.renderDragState();
    }
  }

  private onMouseUp(): void {
    if (this.dragging && this.dragFromIndex !== null && this.dragOverIndex !== null && this.dragOverIndex !== this.dragFromIndex) {
      this.onReorder(this.dragFromIndex, this.dragOverIndex);
    }
    this.dragFromIndex = null;
    this.dragStartY = null;
    this.dragOverIndex = null;
    if (this.dragging) {
      this.dragging = false;
      this.renderDragState();
    }
  }

  private renderDragState(): void {
    Array.from(this.list.children).forEach((child) => {
      const row = child as HTMLElement;
      const index = Number(row.dataset.index);
      row.classList.toggle('point-list__row--dragging', this.dragging && this.dragFromIndex === index);
      row.classList.toggle('point-list__row--drag-over', this.dragging && this.dragOverIndex === index);
    });
  }
}
