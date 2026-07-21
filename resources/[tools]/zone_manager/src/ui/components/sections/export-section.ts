import { Component, el } from '../../component';
import { UiState } from '../../state';

export class ExportSection extends Component<UiState> {
  private toggle: HTMLElement;
  private body: HTMLElement;
  private hint: HTMLElement;
  private generateBtn: HTMLButtonElement;
  private tsArea: HTMLTextAreaElement;
  private luaArea: HTMLTextAreaElement;
  private tsCopyBtn: HTMLButtonElement;
  private luaCopyBtn: HTMLButtonElement;

  private onToggle: () => void;
  private onGenerate: () => void;

  constructor(handlers: { onToggle: () => void; onGenerate: () => void }) {
    super('div', 'panel-section panel-section--export');
    this.onToggle = handlers.onToggle;
    this.onGenerate = handlers.onGenerate;

    this.toggle = el('h2', 'panel-section__title panel-section__title--toggle', 'Export');
    this.toggle.addEventListener('click', () => this.onToggle());

    this.body = el('div', 'panel-section__body');
    this.hint = el('p', 'panel-section__hint', 'Add at least 3 points to export a polygon.');

    this.generateBtn = el('button', 'panel-button', 'Generate') as HTMLButtonElement;
    this.generateBtn.addEventListener('click', () => this.onGenerate());

    const tsBlock = this.makeCopyBlock('TypeScript');
    this.tsArea = tsBlock.area;
    this.tsCopyBtn = tsBlock.copyBtn;

    const luaBlock = this.makeCopyBlock('Lua');
    this.luaArea = luaBlock.area;
    this.luaCopyBtn = luaBlock.copyBtn;

    this.body.append(this.hint, this.generateBtn, tsBlock.el, luaBlock.el);
    this.el.append(this.toggle, this.body);
  }

  private makeCopyBlock(labelText: string) {
    const wrap = el('div', 'export-block');
    const labelRow = el('div', 'export-block__label-row');
    labelRow.appendChild(el('span', '', labelText));
    const copyBtn = el('button', 'panel-button panel-button--small', 'Copy') as HTMLButtonElement;
    labelRow.appendChild(copyBtn);

    const area = document.createElement('textarea');
    area.readOnly = true;
    area.rows = 10;

    copyBtn.addEventListener('click', () => this.copyText(area.value, copyBtn));

    wrap.append(labelRow, area);
    return { el: wrap, area, copyBtn };
  }

  private copyText(text: string, button: HTMLButtonElement): void {
    const helper = document.createElement('textarea');
    helper.value = text;
    helper.style.position = 'fixed';
    helper.style.opacity = '0';
    document.body.appendChild(helper);
    helper.focus();
    helper.select();
    document.execCommand('copy');
    document.body.removeChild(helper);

    const original = button.textContent;
    button.textContent = 'Copied!';
    setTimeout(() => {
      button.textContent = original;
    }, 1200);
  }

  render(state: UiState): void {
    this.body.classList.toggle('panel-section--hidden', !state.exportSectionExpanded);
    this.toggle.classList.toggle('panel-section__title--expanded', state.exportSectionExpanded);

    const canExport = state.points.length >= 3;
    this.generateBtn.disabled = !canExport;
    this.hint.classList.toggle('panel-section--hidden', canExport);

    const hasData = !!state.exportData;
    this.tsArea.style.display = hasData ? '' : 'none';
    this.luaArea.style.display = hasData ? '' : 'none';
    this.tsCopyBtn.style.display = hasData ? '' : 'none';
    this.luaCopyBtn.style.display = hasData ? '' : 'none';

    if (state.exportData) {
      this.tsArea.value = state.exportData.ts;
      this.luaArea.value = state.exportData.lua;
    }
  }
}
