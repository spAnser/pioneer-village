import { Component } from 'preact';

import theme from '@styled/theme';
import { uiSize } from '@uiLib/helpers';

const requiredIcons: Record<string, any> = {
  light: require.context('../../../styled/fa5/light', false, /.*\.svg$/),
  regular: require.context('../../../styled/fa5/regular', false, /.*\.svg$/),
  solid: require.context('../../../styled/fa5/solid', false, /.*\.svg$/),
};

interface Props {
  style?: string;
  name: string;
}

export default class Icon extends Component<Props> {
  constructor() {
    super();
  }

  render() {
    const Icon = requiredIcons[this.props.style || 'solid'](`./${this.props.name}.svg`);
    return <Icon.default />;
  }
}
