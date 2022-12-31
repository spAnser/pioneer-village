import { RenderableProps } from 'preact';

import { Headline, Modal } from '@styled/core';
import UIComponent from '@uiLib/ui-component';
import { emitClient, onClient } from '@lib/ui';

export default class Form extends UIComponent<UI.BaseProps, UI.Form.State, {}> {
  closeOnEscape = true;
  state = {
    show: false,
    title: '',
    text: '',
  };

  constructor() {
    super();

    onClient('form.state', (data) => {
      this.setState(data);
    });
  }

  onEvent(formEvent: UI.Form.Event) {
    this.setState(formEvent);
  }

  onEscape() {
    this.setState({ show: false });
  }

  updateText(text: string) {
    this.setState({ text });
  }

  submit() {
    this.setState({ show: false });
    emitClient('form.answer', { title: this.state.title, text: this.state.text });
  }

  render(props: RenderableProps<UI.BaseProps>, state: Readonly<UI.Form.State>) {
    return (
      this.state.show && (
        <Modal>
          <Headline>{this.state.title}</Headline>
          <form>
            <div>
              <input type={this.state.text} onInput={(e: any) => this.updateText(e.target?.value ?? '')} />
            </div>
            <br />
            <br />
            <button type="submit" onClick={() => this.submit()}>
              Submit
            </button>
          </form>
        </Modal>
      )
    );
  }
}
