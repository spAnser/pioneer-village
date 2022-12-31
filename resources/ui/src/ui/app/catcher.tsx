import { Component, RenderableProps } from 'preact';

import { Snackbar } from '@styled/core';

// TODO: Might need a better way than reload the window but re-rendering with preact seems to be problematic.
export class Catcher extends Component<UI.Catcher.Props, UI.Catcher.State> {
  state = { errored: false };

  componentDidCatch(error: Error, info: any) {
    this.setState({ errored: true });

    console.log('ComponentDidCatch');
    console.error('error', error);

    if (this.props.reloadWindow) {
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }
  }

  render(props: RenderableProps<any>, state: Readonly<any>) {
    if (state.errored) {
      return (
        <Snackbar bgColor="red" color="black">
          UI Crash ... Restarting
        </Snackbar>
      );
    }
    return props.children;
  }
}
