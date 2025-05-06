import styled from 'styled-components';
import { uiSize } from '@uiLib/helpers';
import theme from '@styled/theme';
import { FadeOut } from '@styled/animations';

export const Frame = styled.div`
  position: absolute;
  top: ${uiSize(32)};
  left: ${uiSize(16)};
  font-size: ${uiSize(12)};
  line-height: ${uiSize(14)};
  font-family: 'Open Sans', sans-serif;
  transition: ${theme.transitionSpeed.slow};
  width: 30vw;
  height: 20vh;
  padding-right: ${uiSize(32)};
  overflow: auto;

  &:has(.active) {
    height: 70vh;
  }

  &::-webkit-scrollbar {
    width: ${uiSize(2)};
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(${theme.colors.black.rgb}, 0.5);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(${theme.colors.black.rgb}, 0.75);
  }

  &:not(:hover),
  &:not(:has(> .active)) {
    &::-webkit-scrollbar-thumb {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: transparent;
    }
  }
`;

export const List = styled.div`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${uiSize(2)};
  margin: 0;
  padding: 0;

  &.active {
    > div {
      animation: none;
    }
  }
`;

export const Item = styled.div`
  background-color: rgba(${theme.colors.black.rgb}, 0.75);
  color: ${theme.colors.white.hex};
  border-radius: ${uiSize(3)};

  animation: ${FadeOut} 250ms forwards;
  animation-delay: 5s;

  padding-right: ${uiSize(5)};

  display: flex;

  i,
  span {
    user-select: none;
  }

  i {
    display: inline-block;
    padding: ${uiSize(5)} ${uiSize(5)};
    vertical-align: top;
    border-top-left-radius: ${uiSize(3)};
    border-bottom-left-radius: ${uiSize(3)};

    &[data-source='server'] {
      background-color: #fff;
      color: #000;
    }
  }

  svg {
    width: ${uiSize(10)};
    height: ${uiSize(10)};
  }

  span {
    display: inline-block;
    margin-right: ${uiSize(4)};
    padding: ${uiSize(3)} ${uiSize(5)};
    font-weight: bold;
    font-size: ${uiSize(10)};

    color: ${theme.colors.black.hex};
  }

  pre {
    margin: 0;
    padding-top: ${uiSize(3)};
    padding-bottom: ${uiSize(3)};
    white-space: pre-wrap;
    word-break: break-word;
  }
`;

export const Filter = styled.div`
  position: absolute;
  top: ${uiSize(32)};
  left: calc(30vw + ${uiSize(32)});
  font-size: ${uiSize(12)};
  line-height: ${uiSize(14)};
  font-family: 'Open Sans', sans-serif;
  width: 10vw;

  display: flex;
  gap: ${uiSize(3)};
  margin-top: ${uiSize(16)};
  flex-wrap: wrap;

  user-select: none;
`;

export const FilterItem = styled.div`
  background-color: ${theme.colors.white.hex};
  border-radius: ${uiSize(3)};
  padding: ${uiSize(3)} ${uiSize(5)};

  svg {
    width: ${uiSize(10)};
    height: ${uiSize(14)};

    color: ${theme.colors.black.hex};
  }

  &.red {
    background-color: ${theme.colors.red.hex};

    svg {
      color: ${theme.colors.white.hex};
    }
  }

  &.inactive {
    background-color: #222 !important;
    color: #fff !important;
  }
`;
