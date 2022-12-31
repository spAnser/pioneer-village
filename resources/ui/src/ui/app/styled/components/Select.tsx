import { RenderableProps } from 'preact';
import { useState } from 'preact/hooks';
import styled, { StyledComponent } from 'styled-components';

import theme from '../theme';
import { uiSize } from '@uiLib/helpers';

const NormalSelect = styled.div``;

const ChatSelect = styled.div`
  color: currentColor;
  position: relative;
  user-select: none;

  ul {
    position: absolute;
    top: calc(100% + ${uiSize(8)});
    left: -${uiSize(6)};
    margin: 0;
    padding: 0;
    border-radius: ${theme.borderRadius.small};
    background-color: ${theme.colors.black.hex};
    opacity: 0;
    pointer-events: none;
    visibility: unset;
    transition: ${theme.transitionSpeed.fast};
    list-style: none;

    &.active {
      opacity: 1;
      pointer-events: all;
      visibility: visible;
    }
  }

  li {
    display: flex;
    padding: ${uiSize(4)} ${uiSize(8)};
    border-radius: ${theme.borderRadius.small};
    color: ${theme.colors.white.hex};

    &:hover {
      background-color: ${theme.colors.lightBlue.hex};
      color: ${theme.colors.black.hex};
    }
  }
`;

const SelectLabel = styled.label`
  display: inline-block;
  font-size: ${uiSize(11)};
  font-weight: 600;
  margin-top: ${uiSize(2.5)};
  margin-right: ${uiSize(4)};
`;

const Selects: Record<'normal' | 'chat', typeof NormalSelect> = {
  normal: NormalSelect,
  chat: ChatSelect,
};

interface SelectProps {
  style?: 'normal' | 'chat';
  selected?: string;
  options: Record<string, UI.Channel>;
  onChange?: (option: string) => void;
}

const defaultProps: SelectProps = {
  style: 'normal',
  options: {},
};

export default function Select(props: RenderableProps<SelectProps>) {
  let { style, options, selected } = { ...defaultProps, ...props };

  const [isOpen, setIsOpen] = useState(false);

  if (!selected) {
    selected = Object.keys(options)[0];
  }
  const SelectStyle = Selects[style || 'normal'];

  const chooseOption = (option: string) => {
    setIsOpen(false);
    selected = option;

    if (props.onChange) {
      props.onChange(option);
    }
  };

  return (
    <SelectStyle>
      <SelectLabel onClick={() => setIsOpen(!isOpen)}>{options[selected].label}</SelectLabel>
      <ul className={isOpen ? 'active' : ''}>
        {Object.entries(options).map(([key, value]) => (
          <li key={key} onClick={() => chooseOption(key)}>
            {value.label}
          </li>
        ))}
      </ul>
    </SelectStyle>
  );
}
