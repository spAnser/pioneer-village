import styled from 'styled-components';
import { uiSize } from '@uiLib/helpers';
import theme, { themeColor } from './theme';

export const Headline = styled.h1`
  font-size: ${uiSize(24)};
  color: ${theme.colors.white.hex};
  line-height: ${uiSize(24)};
  margin-bottom: ${uiSize(24)};
`;

export const Center = styled.h1`
  text-align: center;
`;

export const Button = styled.button`
  background-color: ${theme.colors.blue.hex};
  color: ${theme.colors.white.hex};
  font-weight: 600;
  text-transform: uppercase;
  font-size: ${uiSize(12)};
  line-height: ${uiSize(12)};
  padding: ${uiSize(6)} ${uiSize(8)};
  border: none;
  border-radius: ${theme.borderRadius.normal};
  margin: ${uiSize(4)};
  outline: none;
`;

export const HiddenActiveVisible = styled.div`
  opacity: 0;
  visibility: hidden;
  transition-property: opacity, visibility, width, height, margin;
  transition-duration: ${theme.transitionSpeed.slow}, ${theme.transitionSpeed.slow}, ${theme.transitionSpeed.slow},
    ${theme.transitionSpeed.slow}, ${theme.transitionSpeed.slow};
  transition-delay: 2s, 2s, 2.375s, 2.375s, 2.375s;

  &.active {
    opacity: 1;
    visibility: visible;
    transition-delay: ${theme.transitionSpeed.slow}, ${theme.transitionSpeed.slow}, 0s, 0s, 0s;
  }

  &:not(.active) {
    width: 0 !important;
    height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
  }
`;

export const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 20vh;
  padding: 4vh 3vh;
  text-align: center;
  transform: translate(-50%, -50%);
  background-color: rgba(${theme.colors.black.rgb}, 0.8);
  border-radius: ${theme.borderRadius.normal};
`;

export const Snackbar = styled.div`
  background-color: ${(props) => themeColor('hex', 'blue', props?.bgColor)};
  color: ${(props) => theme.colors[props?.color]?.hex || theme.colors.white.hex};

  position: absolute;
  bottom: ${uiSize(100)};
  left: 50%;
  transform: translateX(-50%);
  padding: ${uiSize(16)} ${uiSize(24)};
  border-radius: ${theme.borderRadius.normal};
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
  text-align: center;
  z-index: 1;
`;
