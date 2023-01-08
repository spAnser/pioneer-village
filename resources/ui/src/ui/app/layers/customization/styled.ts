import styled from 'styled-components';
import { uiSize } from '@uiLib/helpers';
import theme from '@styled/theme';

export const Container = styled.div``;

export const Modal = styled.div`
  position: absolute;
  top: ${uiSize(91)}; // = (1080 - 898) / 2
  left: ${uiSize(1337)};
  width: ${uiSize(555.5)};
  height: ${uiSize(898)};
  padding-left: ${uiSize(60)};
  padding-right: ${uiSize(60)};
  background-image: url(https://p--v.b-cdn.net/customization/background.webp);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  color: ${theme.colors.white.hex};
  font-family: 'Caveat', cursive;

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
  
  input[type="submit"] {
    width: 100%;
    background-color: transparent;
    border: none;
    border-bottom: 2px dashed ${theme.colors.gray50.hex};
    font-size: ${uiSize(30)};
    color: ${theme.colors.white.hex};
    cursor: pointer;
    margin-top: ${uiSize(20)};
`;

export const ModalTitle = styled.div`
  text-align: center;
  font-family: 'Homemade Apple', cursive;
  font-size: ${uiSize(50)};
  transform: translateY(-50%);
  user-select: none;
`;
