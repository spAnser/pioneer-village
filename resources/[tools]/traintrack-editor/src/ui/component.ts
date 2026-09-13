/**
 * Base for the small typed class + cached DOM refs + targeted render() pattern
 * this UI uses instead of a VDOM. Same approach as zone_manager: an innerHTML
 * rebuild on every state change destroys focus and scroll position, which is
 * fatal for a node list you are typing coordinates into.
 */
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

export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
