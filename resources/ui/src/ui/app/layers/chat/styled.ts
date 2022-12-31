import styled from 'styled-components';
import { uiSize } from '@uiLib/helpers';
import theme from '@styled/theme';

export const Frame = styled.div`
  position: absolute;
  top: ${uiSize(12)};
  left: ${uiSize(12)};
  font-size: ${uiSize(12)};
  line-height: ${uiSize(14)};
  font-family: 'Open Sans', sans-serif;
  opacity: 0;
  transition: ${theme.transitionSpeed.slow};

  &.active {
    opacity: 1;
  }

  &.partial {
    opacity: 0.75;
  }
`;

export const Messages = styled.div`
  width: 30vh;
  height: 20vh;
  overflow-y: scroll;
  color: ${theme.colors.white.hex};
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Message = styled.div`
  display: inline-block;
  border-radius: ${theme.borderRadius.small};
  background-color: ${theme.colors.black.hex};
  padding: ${uiSize(4)} ${uiSize(6)};
  margin-bottom: ${uiSize(4)};
  scroll-behavior: smooth;
`;

export const Channel = styled.span`
  display: inline-block;
  font-size: ${uiSize(8)};
  font-weight: 600;
  margin-right: ${uiSize(4)};
  user-select: none;
  transform: translateY(-${uiSize(1.75)});
`;

export const Sender = styled.span`
  display: inline-block;
  font-weight: 600;
  font-size: ${uiSize(10)};
  margin-right: ${uiSize(2)};
  transform: translateY(-${uiSize(1)});

  &:after {
    content: ':';
  }
`;

export const Input = styled.div`
  display: flex;
  padding: ${uiSize(2)} ${uiSize(6)};
  border-radius: ${theme.borderRadius.small};
  background-color: ${theme.colors.black.hex};
  opacity: 0;
  visibility: hidden;

  &.active {
    opacity: 1;
    visibility: visible;
  }

  input {
    flex-grow: 1;
    border: none;
    background: transparent;
    outline: none;
    color: currentColor;
    line-height: ${uiSize(17)};
  }
`;

export const channels: Record<string, UI.Channel> = {
  general: {
    label: 'General',
    bg: 'black',
    fg: 'white',
  },
  ooc: {
    label: 'OOC',
    bg: 'gray25',
    fg: 'white',
  },
  admin: {
    label: 'Admin',
    bg: 'red',
    fg: 'white',
  },
};
