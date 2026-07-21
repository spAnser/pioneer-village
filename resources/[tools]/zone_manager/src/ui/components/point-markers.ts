import { Component, el } from '../component';
import { UiState } from '../state';

export class PointMarkers extends Component<UiState> {
  private markerEls: HTMLElement[] = [];
  private onSelect: (index: number) => void;
  private onHover: (index: number | null) => void;

  constructor(handlers: { onSelect: (index: number) => void; onHover: (index: number | null) => void }) {
    super('div', 'point-markers');
    this.onSelect = handlers.onSelect;
    this.onHover = handlers.onHover;
  }

  render(state: UiState): void {
    // Rebuild only when point count changes; otherwise just reposition/restyle
    // existing nodes — repositioning happens every frame (screen coords are
    // pushed at native tick rate) so avoiding a DOM rebuild here matters.
    if (this.markerEls.length !== state.points.length) {
      this.el.innerHTML = '';
      this.markerEls = state.points.map((_, index) => {
        const marker = el('div', 'point-marker', String(index));
        marker.addEventListener('click', (e) => {
          e.stopPropagation();
          this.onSelect(index);
        });
        marker.addEventListener('mouseenter', () => this.onHover(index));
        marker.addEventListener('mouseleave', () => this.onHover(null));
        this.el.appendChild(marker);
        return marker;
      });
    }

    state.points.forEach((_, index) => {
      const markerEl = this.markerEls[index];
      const screen = state.pointScreens.find((p) => p.index === index);
      if (!screen) {
        markerEl.style.display = 'none';
        return;
      }
      markerEl.style.display = '';
      markerEl.style.left = `${((screen.pos.x + 1) / 2) * 100}%`;
      markerEl.style.top = `${((screen.pos.y + 1) / 2) * 100}%`;
      markerEl.classList.toggle('point-marker--selected', state.selectedIndex === index);
      markerEl.classList.toggle('point-marker--hovered', state.hoveredIndex === index);
    });
  }
}
