import { Component, el } from '../component';
import { FLAG, type Track, isCurved, isJunction, keyOf } from '../model/track';
import { brokenKey } from '../scene/track-meshes';
import type { UiState } from '../state';

export interface NodeListHandlers {
  onSelect: (index: number) => void;
  onFocus: (index: number) => void;
}

/** Above this, a stored length disagrees with the geometry enough to flag. */
const LENGTH_DELTA_WARN = 0.05;

interface Row {
  el: HTMLElement;
  badges: HTMLElement;
  delta: HTMLElement;
  index: number;
}

export class NodeList extends Component<UiState> {
  private readonly list = el('div', 'node-list__rows');
  private readonly summary = el('p', 'panel-note');
  private rows: Row[] = [];
  private builtFor: Track | null = null;
  private builtCount = -1;
  private lastSelected: number | null = null;

  constructor(private readonly handlers: NodeListHandlers) {
    super('section', 'panel-section node-list');
    const header = el('header', 'panel-section__header');
    header.appendChild(el('h2', undefined, 'Nodes'));
    this.el.appendChild(header);
    this.el.appendChild(this.summary);
    this.el.appendChild(this.list);
  }

  render(state: UiState): void {
    const track = state.tracks.find((t) => keyOf(t) === state.selectedTrackKey) ?? null;
    if (!track) {
      this.list.replaceChildren();
      this.rows = [];
      this.builtFor = null;
      this.builtCount = -1;
      this.summary.textContent = 'Select a track to edit its nodes.';
      return;
    }

    // Rebuilding 473 rows on every drag frame would be the single most
    // expensive thing this UI does, so rows are rebuilt only when the track or
    // its node count changes; per-node content that can change under a drag is
    // patched in place below.
    if (this.builtFor !== track || this.builtCount !== track.nodes.length) {
      this.build(track);
      this.builtFor = track;
      this.builtCount = track.nodes.length;
      this.lastSelected = null;
    }

    this.summary.textContent =
      `${track.nodes.length} nodes · ${track.nodes.filter(isCurved).length} curved · ` +
      `${track.nodes.filter(isJunction).length} junction · ${track._type}`;

    const trackKey = keyOf(track);
    const selected = state.selection?.nodeIndex ?? null;
    if (selected !== this.lastSelected) {
      if (this.lastSelected !== null) this.rows[this.lastSelected]?.el.classList.remove('node-row--selected');
      if (selected !== null) {
        const row = this.rows[selected];
        row?.el.classList.add('node-row--selected');
        row?.el.scrollIntoView({ block: 'nearest' });
      }
      this.lastSelected = selected;
    }

    track.nodes.forEach((node, index) => {
      const row = this.rows[index];
      if (!row) return;
      row.el.classList.toggle('node-row--broken', state.broken.has(brokenKey(trackKey, index)));
      row.badges.textContent = badgesFor(node.flags, state.selfReferencing.has(brokenKey(trackKey, index)));

      const delta = state.lengthDeltas[index];
      const flagged = delta !== null && delta !== undefined && Math.abs(delta) > LENGTH_DELTA_WARN;
      row.delta.textContent = flagged ? `${delta > 0 ? '+' : ''}${delta.toFixed(2)}m` : '';
      row.delta.classList.toggle('node-row__delta--warn', flagged);
    });
  }

  private build(track: Track): void {
    this.list.replaceChildren();
    this.rows = track.nodes.map((node, index) => {
      const row = el('div', 'node-row');

      const button = el('button', 'node-row__index', String(index));
      button.addEventListener('click', () => this.handlers.onSelect(index));
      button.addEventListener('dblclick', () => this.handlers.onFocus(index));
      button.title = 'Click to select, double-click to fly the camera there';
      row.appendChild(button);

      row.appendChild(el('span', 'node-row__type', isCurved(node) ? 'c' : '·'));
      const name = el('span', 'node-row__name', node.name ?? '');
      row.appendChild(name);

      const badges = el('span', 'node-row__badges');
      row.appendChild(badges);
      const delta = el('span', 'node-row__delta');
      row.appendChild(delta);

      this.list.appendChild(row);
      return { el: row, badges, delta, index };
    });
  }
}

function badgesFor(flags: number, selfReferencing: boolean): string {
  const badges: string[] = [];
  if (flags & FLAG.JUNCTION) badges.push(selfReferencing ? 'J*' : 'J');
  if (flags & (FLAG.STATION_A | FLAG.STATION_B)) badges.push('S');
  if (flags & FLAG.LOW_CEILING) badges.push('L');
  if (flags & FLAG.TUNNEL) badges.push('T');
  return badges.join(' ');
}
