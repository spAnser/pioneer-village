import styled from 'styled-components';
import { uiSize } from '@uiLib/helpers';
import theme from '@styled/theme';

export const Container = styled.div``;

export const Modal = styled.div`
  position: absolute;
  top: ${uiSize(91)}; // = (1080 - 898) / 2
  width: ${uiSize(555.5)};
  height: ${uiSize(898)};
  background-image: url(https://p--v.b-cdn.net/customization/background.webp);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  color: ${theme.colors.white.hex};
  font-family: 'Caveat', cursive;
  user-select: none;

  input {
    width: 100%;
    background-color: transparent;
    border: none;
    border-bottom: 2px dashed ${theme.colors.gray50.hex};
    font-size: ${uiSize(30)};
    color: ${theme.colors.white.hex};

    &:focus {
      outline: none;
      border-bottom-color: ${theme.colors.white.hex};
    }
  }
`;

export const ModalLeft = styled(Modal)`
  right: ${uiSize(1337)};
`;

export const ModalRight = styled(Modal)`
  left: ${uiSize(1337)};
`;

export const ModalContents = styled.div`
  position: absolute;
  inset: ${uiSize(75)} ${uiSize(60)} ${uiSize(60)};
  //padding: ${uiSize(40)} ${uiSize(60)};
  overflow: auto;

  > * {
    max-width: 99%;
  }

  &::-webkit-scrollbar {
    width: ${uiSize(2)};
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(${theme.colors.black.rgb}, 0.75);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.black.hex};
  }
`;

export const ModalTitle = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  text-align: center;
  font-family: 'Homemade Apple', cursive;
  font-size: ${uiSize(50)};
  transform: translateY(-50%);
`;

export const ModalButtons = styled.div`
  position: absolute;
  bottom: ${uiSize(40)};
  right: ${uiSize(60)};
  left: ${uiSize(30)};
  transform: translateY(50%);
  display: flex;
  gap: ${uiSize(30)};
  justify-content: space-between;
`;

export const ModalButton = styled.button`
  padding: ${uiSize(10)} ${uiSize(20)};
  background-color: transparent;
  border: none;
  color: ${theme.colors.white.hex};

  &:hover,
  &.active {
    color: ${theme.colors.red.hex};
  }

  svg {
    height: ${uiSize(32)};
  }
`;
