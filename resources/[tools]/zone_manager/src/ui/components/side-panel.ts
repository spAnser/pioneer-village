import { Component, el } from '../component';
import { UiState } from '../state';
import { BoundsSection } from './sections/bounds-section';
import { ExportSection } from './sections/export-section';
import { PointListSection } from './sections/point-list-section';
import { SelectedPointSection } from './sections/selected-point-section';

// Floating overlay, slides in/out on Tab — see plan: "no permanent panels,"
// the viewport never resizes/letterboxes when this opens. Left visibly
// peeking (not fully off-screen) when closed via CSS transform, with a
// clickable handle, so the panel's existence is discoverable without
// already knowing the Tab shortcut.
export class SidePanel extends Component<UiState> {
  readonly selectedPointSection: SelectedPointSection;
  readonly pointListSection: PointListSection;
  readonly boundsSection: BoundsSection;
  readonly exportSection: ExportSection;

  constructor(sections: {
    selectedPointSection: SelectedPointSection;
    pointListSection: PointListSection;
    boundsSection: BoundsSection;
    exportSection: ExportSection;
    onOpen: () => void;
  }) {
    super('div', 'side-panel');
    this.selectedPointSection = sections.selectedPointSection;
    this.pointListSection = sections.pointListSection;
    this.boundsSection = sections.boundsSection;
    this.exportSection = sections.exportSection;

    const peekHandle = el('div', 'side-panel__peek-handle', 'Press Tab to expand');
    peekHandle.addEventListener('click', () => sections.onOpen());
    this.el.appendChild(peekHandle);

    // The peek handle sits outside the panel's left edge (translate -100%)
    // when closed — it must not be inside the scrollable/clipped content
    // area, so scrolling content lives in its own inner wrapper instead of
    // directly on this.el.
    const scroll = el('div', 'side-panel__scroll');
    this.selectedPointSection.mount(scroll);
    this.pointListSection.mount(scroll);
    this.boundsSection.mount(scroll);
    this.exportSection.mount(scroll);
    this.el.appendChild(scroll);
  }

  render(state: UiState): void {
    this.el.classList.toggle('side-panel--open', state.panelOpen);
    this.selectedPointSection.render(state);
    this.pointListSection.render(state);
    this.boundsSection.render(state);
    this.exportSection.render(state);
  }
}
