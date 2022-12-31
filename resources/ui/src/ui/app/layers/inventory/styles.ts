import styled from 'styled-components';
import { uiSize } from '@uiLib/helpers';
import theme from '@styled/theme';

export const InventoryContainer = styled.div`
  position: absolute;
  bottom: ${uiSize(64)};
  left: 50%;
  height: 40vh;
  width: calc(80vh - ${uiSize(31)});
  transform: translateX(-50%);

  background-color: rgba(${theme.colors.black.rgb}, 0.9);
`;

export const InventoryWrapper = styled.div`
  user-select: none;
  position: absolute;
  top: ${uiSize(16)};
  right: ${uiSize(9)};
  bottom: ${uiSize(16)};
  left: ${uiSize(16)};
  overflow-x: hidden;
  overflow-y: auto;
  padding-right: ${uiSize(7)};

  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;

  &::-webkit-scrollbar {
    width: ${uiSize(1)};
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(${theme.colors.red.rgb}, 0.5);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(${theme.colors.red.rgb}, 0.75);
  }
`;

export const InventorySlot = styled.div`
  position: relative;
  width: ${(1 / 8) * 100}%;
  height: ${(1 / 4) * 100}%;

  background-image: url(https://p--v.b-cdn.net/inventory/border-square-gray.svg);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-image: url(https://p--v.b-cdn.net/inventory/border-square-red.svg);
  }

  img,
  span {
    pointer-events: none;
  }

  img {
    max-width: 85%;
  }

  span {
    color: white;
    position: absolute;
    font-family: 'Caveat', cursive;
    font-size: ${uiSize(20)};
    right: ${uiSize(8)};
    bottom: ${uiSize(2)};
  }

  &.dragged-source {
    img,
    span {
      opacity: 0;
    }
  }

  &.dragged-item {
    background-image: none;
  }
`;
