import { Component, el } from '../component';
import { FLAG, FLAG_LABELS, type Node, type Vec3, isCurved, keyOf } from '../model/track';
import { brokenKey } from '../scene/track-meshes';
import { type UiState, selectedTrack, selectionLabel } from '../state';

export interface InspectorHandlers {
  onPosition: (part: 'node' | 'handleIn' | 'handleOut', axis: 0 | 1 | 2, value: number) => void;
  onFlags: (flags: number) => void;
  onName: (name: string) => void;
  onCurved: (curved: boolean) => void;
  onInsertAfter: () => void;
  onDelete: () => void;
  onReorder: (delta: number) => void;
  onSnapGround: () => void;
  onSelectPart: (part: 'node' | 'handleIn' | 'handleOut') => void;
}

interface AxisInputs {
  row: HTMLElement;
  inputs: HTMLInputElement[];
}

const AXES = ['X', 'Y', 'Z'] as const;

export class Inspector extends Component<UiState> {
  private readonly title = el('h2');
  private readonly partTabs = el('div', 'part-tabs');
  private readonly position: AxisInputs;
  private readonly handleIn: AxisInputs;
  private readonly handleOut: AxisInputs;
  private readonly curvedToggle = el('input') as HTMLInputElement;
  private readonly nameInput = el('input', 'text-input') as HTMLInputElement;
  private readonly flagBoxes = new Map<number, HTMLInputElement>();
  private readonly warning = el('p', 'panel-warning');
  private readonly body = el('div', 'inspector__body');
  private readonly empty = el('p', 'panel-note', 'Click a node in the scene or the list to edit it.');
  private readonly partButtons = new Map<'node' | 'handleIn' | 'handleOut', HTMLButtonElement>();

  constructor(private readonly handlers: InspectorHandlers) {
    super('section', 'panel-section inspector');

    const header = el('header', 'panel-section__header');
    header.appendChild(this.title);
    this.el.appendChild(header);
    this.el.appendChild(this.empty);
    this.el.appendChild(this.body);

    for (const part of ['node', 'handleIn', 'handleOut'] as const) {
      const button = el('button', 'part-tab', part === 'node' ? 'node' : part === 'handleIn' ? 'in' : 'out');
      button.addEventListener('click', () => this.handlers.onSelectPart(part));
      this.partTabs.appendChild(button);
      this.partButtons.set(part, button);
    }
    this.body.appendChild(this.partTabs);

    this.body.appendChild(this.warning);

    this.position = this.buildAxisRow('Position', 'node');
    this.handleIn = this.buildAxisRow('Handle in', 'handleIn');
    this.handleOut = this.buildAxisRow('Handle out', 'handleOut');

    const curvedLabel = el('label', 'checkbox-row');
    this.curvedToggle.type = 'checkbox';
    this.curvedToggle.addEventListener('change', () => this.handlers.onCurved(this.curvedToggle.checked));
    curvedLabel.appendChild(this.curvedToggle);
    curvedLabel.appendChild(el('span', undefined, 'Curved (has bezier handles)'));
    this.body.appendChild(curvedLabel);

    const flags = el('div', 'flag-grid');
    for (const { bit, label, confirmed } of FLAG_LABELS) {
      const box = el('input') as HTMLInputElement;
      box.type = 'checkbox';
      box.addEventListener('change', () => this.emitFlags());
      const wrapper = el('label', 'checkbox-row');
      wrapper.appendChild(box);
      // Only bit 8 is confirmed; the rest are the parser's read of observed
      // usage, and saying so beats implying the labels are authoritative.
      wrapper.appendChild(el('span', undefined, `${bit} · ${label}${confirmed ? '' : '?'}`));
      flags.appendChild(wrapper);
      this.flagBoxes.set(bit, box);
    }
    this.body.appendChild(flags);

    const nameRow = el('label', 'field-row');
    nameRow.appendChild(el('span', 'field-row__label', 'Name'));
    this.nameInput.placeholder = 'junction target / station label';
    this.nameInput.addEventListener('change', () => this.handlers.onName(this.nameInput.value.trim()));
    nameRow.appendChild(this.nameInput);
    this.body.appendChild(nameRow);

    const actions = el('div', 'button-row');
    for (const [label, title, run] of [
      ['Insert after', 'Split the next segment exactly (I)', () => this.handlers.onInsertAfter()],
      ['Snap to ground', 'Drop this node onto the world surface below it', () => this.handlers.onSnapGround()],
      ['Move up', 'Earlier in the running order', () => this.handlers.onReorder(-1)],
      ['Move down', 'Later in the running order', () => this.handlers.onReorder(1)],
      ['Delete', 'Remove this node (Del)', () => this.handlers.onDelete()],
    ] as const) {
      const button = el('button', 'button', label);
      button.title = title;
      if (label === 'Delete') button.classList.add('button--danger');
      button.addEventListener('click', run);
      actions.appendChild(button);
    }
    this.body.appendChild(actions);
  }

  private buildAxisRow(label: string, part: 'node' | 'handleIn' | 'handleOut'): AxisInputs {
    const row = el('div', 'axis-row');
    row.appendChild(el('span', 'axis-row__label', label));
    const inputs = AXES.map((axis, index) => {
      const input = el('input', `axis-input axis-input--${axis.toLowerCase()}`) as HTMLInputElement;
      input.type = 'number';
      input.step = '0.01';
      input.title = axis;
      input.addEventListener('change', () => {
        const value = Number(input.value);
        if (Number.isFinite(value)) this.handlers.onPosition(part, index as 0 | 1 | 2, value);
      });
      row.appendChild(input);
      return input;
    });
    this.body.appendChild(row);
    return { row, inputs };
  }

  private emitFlags(): void {
    let flags = 0;
    for (const [bit, box] of this.flagBoxes) if (box.checked) flags |= bit;
    this.handlers.onFlags(flags);
  }

  render(state: UiState): void {
    const track = selectedTrack(state);
    const node = state.selection && track ? track.nodes[state.selection.nodeIndex] : undefined;

    this.title.textContent = selectionLabel(state);
    this.empty.hidden = !!node;
    this.body.hidden = !node;
    if (!node || !track || !state.selection) return;

    for (const [part, button] of this.partButtons) {
      button.classList.toggle('part-tab--active', state.selection.part === part);
      button.disabled = part !== 'node' && !isCurved(node);
    }

    this.setAxis(this.position, node.position);
    this.handleIn.row.hidden = !node.handleIn;
    this.handleOut.row.hidden = !node.handleOut;
    if (node.handleIn) this.setAxis(this.handleIn, node.handleIn);
    if (node.handleOut) this.setAxis(this.handleOut, node.handleOut);

    this.curvedToggle.checked = isCurved(node);
    for (const [bit, box] of this.flagBoxes) box.checked = (node.flags & bit) !== 0;
    // Overwriting the field mid-edit would fight the user's typing.
    if (document.activeElement !== this.nameInput) this.nameInput.value = node.name ?? '';

    this.warning.textContent = warningFor(node, state, keyOf(track), state.selection.nodeIndex);
    this.warning.hidden = this.warning.textContent === '';
  }

  private setAxis({ inputs }: AxisInputs, value: Vec3): void {
    inputs.forEach((input, index) => {
      // Same reason as the name field: do not clobber a half-typed number.
      if (document.activeElement === input) return;
      input.value = String(Number(value[index].toFixed(4)));
    });
  }
}

function warningFor(node: Node, state: UiState, trackKey: string, nodeIndex: number): string {
  const key = brokenKey(trackKey, nodeIndex);
  if (state.broken.has(key)) {
    return `Junction names "${node.name}" but no node in that track sits at this position. The weld is broken — trains will not cross here.`;
  }
  if (state.selfReferencing.has(key)) {
    return 'Junction names its own track. Shipped tracks do this and it has no partner node, so nothing here is wrong.';
  }
  if (node.flags & FLAG.JUNCTION && !node.name) {
    return 'Junction flag set with no name. It needs the other track’s trainConfigName to connect to anything.';
  }
  return '';
}
