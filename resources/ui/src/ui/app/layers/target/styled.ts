import styled from 'styled-components';
import { uiSize } from '@uiLib/helpers';
import theme from '@styled/theme';

export const Frame = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Choices = styled.ul`
  position: absolute;
  top: 0;
  left: -${uiSize(16)};
  list-style: none;
  margin: 0;
  padding: 0;
  width: ${uiSize(128)};

  li {
    display: flex;
    align-items: center;
    transition: ${theme.transitionSpeed.normal};
    position: relative;
    font-size: ${uiSize(12)};
    font-weight: 600;
    margin-bottom: ${uiSize(6)};
    padding: ${uiSize(4)} ${uiSize(6)};
    border-radius: ${theme.borderRadius.normal};
    color: ${theme.colors.white.hex};
    text-shadow: 0 0 2px ${theme.colors.black.hex};
    cursor: pointer;

    &:before {
      display: block;
      content: '';
      position: absolute;
      z-index: -1;
      left: -${uiSize(24)};
      width: calc(100% + ${uiSize(48)});
      height: calc(100% + ${uiSize(8)});
      top: -${uiSize(2)};
      transition: ${theme.transitionSpeed.normal};

      opacity: 0;

      background-image: url(https://p--v.b-cdn.net/smear-1.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
    }

    svg {
      width: ${uiSize(14)};
      height: ${uiSize(14)};
      min-width: ${uiSize(14)};
      min-height: ${uiSize(14)};
      margin-right: ${uiSize(6)};
    }

    &:hover {
      // background-color: rgba(${theme.colors.black.rgb}, 0.95);
      //color: ${theme.colors.black.hex};
      text-shadow: none;

      &:before {
        opacity: 1;
      }
    }
  }
`;
