// Base for the "small typed class, cached DOM refs, targeted render()"
// pattern used throughout this UI instead of a VDOM framework — see plan
// rationale: avoids reinventing React badly, avoids innerHTML churn
// destroying focus/scroll state on frequently-updated elements like the HUD.
export abstract class Component<S> {
  readonly el: HTMLElement;

  protected constructor(tagName: string, className: string) {
    this.el = document.createElement(tagName);
    this.el.className = className;
  }

  abstract render(state: S): void;

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }
}

export function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
