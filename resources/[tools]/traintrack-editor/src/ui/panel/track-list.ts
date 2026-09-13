import { Component, el } from '../component';
import { type Track, configNameOf, isJunction, keyOf } from '../model/track';
import type { UiState } from '../state';

export interface TrackListHandlers {
  onSelect: (key: string) => void;
  onToggleVisible: (key: string, visible: boolean) => void;
  onFilter: (text: string) => void;
  onShowOnlySelected: () => void;
}

interface Row {
  el: HTMLElement;
  checkbox: HTMLInputElement;
  key: string;
}

export class TrackList extends Component<UiState> {
  private readonly filterInput = el('input', 'filter-input');
  private readonly list = el('div', 'track-list__rows');
  private rows: Row[] = [];
  private builtFor: readonly Track[] | null = null;

  constructor(private readonly handlers: TrackListHandlers) {
    super('section', 'panel-section track-list');

    const header = el('header', 'panel-section__header');
    header.appendChild(el('h2', undefined, 'Tracks'));
    const only = el('button', 'link-button', 'only selected');
    only.addEventListener('click', () => this.handlers.onShowOnlySelected());
    header.appendChild(only);
    this.el.appendChild(header);

    this.filterInput.type = 'text';
    this.filterInput.placeholder = 'filter…';
    this.filterInput.addEventListener('input', () => this.handlers.onFilter(this.filterInput.value));
    this.el.appendChild(this.filterInput);
    this.el.appendChild(this.list);
  }

  render(state: UiState): void {
    // Rows are rebuilt only when the track set itself changes. Everything else
    // -- selection, visibility, filtering -- is a class or property update, so
    // the checkbox you just clicked does not get replaced out from under you.
    if (this.builtFor !== state.tracks) {
      this.build(state);
      this.builtFor = state.tracks;
    }

    const filter = state.trackFilter.trim().toLowerCase();
    for (const row of this.rows) {
      const selected = row.key === state.selectedTrackKey;
      row.el.classList.toggle('track-row--selected', selected);
      row.checkbox.checked = state.visibleTracks.has(row.key) || selected;
      // The selected track is always drawn, so its checkbox is not meaningful.
      row.checkbox.disabled = selected;
      row.el.hidden = filter !== '' && !row.el.dataset.search!.includes(filter);
    }
  }

  private build(state: UiState): void {
    this.list.replaceChildren();
    this.rows = state.tracks.map((track) => {
      const key = keyOf(track);
      const configName = configNameOf(track);
      const junctions = track.nodes.filter(isJunction).length;

      const row = el('div', 'track-row');
      row.dataset.search = `${key} ${configName}`.toLowerCase();

      const checkbox = el('input', 'track-row__visible') as HTMLInputElement;
      checkbox.type = 'checkbox';
      checkbox.title = 'Draw as context';
      checkbox.addEventListener('change', () => this.handlers.onToggleVisible(key, checkbox.checked));
      row.appendChild(checkbox);

      const button = el('button', 'track-row__name');
      button.appendChild(el('span', 'track-row__config', configName));
      // Only worth showing when it differs -- which it does for exactly five
      // tracks, and those are the ones where a junction name surprises you.
      if (configName !== key) button.appendChild(el('span', 'track-row__stem', key));
      button.addEventListener('click', () => this.handlers.onSelect(key));
      row.appendChild(button);

      row.appendChild(el('span', 'track-row__meta', `${track.nodes.length}n${junctions ? ` · ${junctions}j` : ''}`));

      this.list.appendChild(row);
      return { el: row, checkbox, key };
    });
  }
}
