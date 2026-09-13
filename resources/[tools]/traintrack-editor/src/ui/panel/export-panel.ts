import { Component, el } from '../component';
import { writeRegistration, writeTrack } from '../model/dat-writer';
import { cloneTrack } from '../model/track';
import { type UiState, selectedTrack } from '../state';

export interface ExportHandlers {
  onToggle: () => void;
}

export class ExportPanel extends Component<UiState> {
  private readonly toggle = el('button', 'link-button', 'show');
  private readonly body = el('div', 'export__body');
  private readonly datArea = el('textarea', 'export__text') as HTMLTextAreaElement;
  private readonly xmlArea = el('textarea', 'export__text export__text--short') as HTMLTextAreaElement;
  private readonly status = el('p', 'panel-note');
  private lastSignature = '';

  constructor(private readonly handlers: ExportHandlers) {
    super('section', 'panel-section export');

    const header = el('header', 'panel-section__header');
    header.appendChild(el('h2', undefined, 'Export'));
    this.toggle.addEventListener('click', () => this.handlers.onToggle());
    header.appendChild(this.toggle);
    this.el.appendChild(header);

    this.el.appendChild(this.body);
    this.body.appendChild(this.status);

    this.body.appendChild(this.buildBlock('.dat  —  save as <name>.dat', this.datArea));
    this.body.appendChild(
      this.buildBlock('traintracks.xml entry  —  a .dat no list names is never loaded', this.xmlArea),
    );
  }

  private buildBlock(label: string, area: HTMLTextAreaElement): HTMLElement {
    const block = el('div', 'export__block');
    const head = el('div', 'export__block-head');
    head.appendChild(el('span', 'export__label', label));

    const copy = el('button', 'link-button', 'copy');
    copy.addEventListener('click', () => {
      area.focus();
      area.select();
      // execCommand rather than navigator.clipboard: the async clipboard API
      // needs a secure-context permission that the NUI browser does not
      // reliably grant, and it fails silently when it is not granted.
      const ok = document.execCommand('copy');
      copy.textContent = ok ? 'copied' : 'select + Ctrl+C';
      setTimeout(() => (copy.textContent = 'copy'), 1500);
    });
    head.appendChild(copy);
    block.appendChild(head);

    area.readOnly = true;
    area.spellcheck = false;
    // Clicking anywhere in the box selects the lot, so Ctrl+C always works even
    // if execCommand is unavailable.
    area.addEventListener('focus', () => area.select());
    block.appendChild(area);
    return block;
  }

  render(state: UiState): void {
    this.body.hidden = !state.exportOpen;
    this.toggle.textContent = state.exportOpen ? 'hide' : 'show';
    if (!state.exportOpen) return;

    const track = selectedTrack(state);
    if (!track) {
      this.status.textContent = 'Select a track to export it.';
      this.datArea.value = '';
      this.xmlArea.value = '';
      return;
    }

    // Re-serialising a 473-node track on every render would run on every drag
    // frame. The revision counter is O(1) -- an earlier version hashed the nodes
    // with JSON.stringify, which cost more than the export it was avoiding.
    const signature = `${state.selectedTrackKey}|${state.revision}`;
    if (signature === this.lastSignature) return;
    this.lastSignature = signature;

    // Written from a clone: writeTrack recomputes length and the header counts
    // in place, and the live model should only change through the store.
    const copy = cloneTrack(track);
    this.datArea.value = writeTrack(copy);
    this.xmlArea.value = writeRegistration(copy);
    this.status.textContent =
      `${copy.count} nodes · ${copy.curveCount} curved · lengths recomputed as bezier arc length, ` +
      '6 significant digits';
  }
}
