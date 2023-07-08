import styled, { createGlobalStyle } from 'styled-components';
import { uiSize } from '@uiLib/helpers';
import theme from '@styled/theme';
import { clamp } from '@lib/functions';

const radialGradient = (color: keyof UI.Theme['colors'], startOpacity: number, endOpacity: number) => {
  return `radial-gradient(at 7.5% 7.5%, rgba(${theme.colors[color].rgb}, ${startOpacity}) 0%, rgba(${theme.colors[color].rgb}, ${endOpacity}) 75%);`;
};

export const InventoryTooltip = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  //border: ${uiSize(2)} solid rgba(${theme.colors.white.rgb}, 0.25);
  transform: translateY(-100%) translateY(${uiSize(-2)});
  padding: ${uiSize(12)} ${uiSize(16)};
  color: ${theme.colors.white.hex};

  border-radius: ${uiSize(4)};
  background-image: ${radialGradient('red', 0.25, 0.05)};
  background-size: 100% 100%;
  background-color: rgba(${theme.colors.redGray12.rgb}, 0.95);
  backdrop-filter: blur(${uiSize(4)});

  width: ${uiSize(298)};

  &.below {
    transform: translateY(10vh) translateY(${uiSize(-8)});
    // border-top: ${uiSize(2)} solid rgba(${theme.colors.white.rgb}, 0.5);
  }

  &.above {
    // border-bottom: ${uiSize(2)} solid rgba(${theme.colors.white.rgb}, 0.5);
  }

  h1 {
    font-family: 'Oxygen', sans-serif;
    font-size: ${uiSize(16)};
    margin-bottom: ${uiSize(8)};
  }

  p {
    font-family: 'Open Sans', sans-serif;
    font-size: ${uiSize(12)};
    margin-bottom: ${uiSize(12)};
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: ${uiSize(6)};
    font-size: ${uiSize(9)};

    li {
      padding: ${uiSize(3)} ${uiSize(6)};
      background-color: rgba(${theme.colors.redGray12.rgb}, 0.75);
      border-radius: ${uiSize(4)};
    }
  }
`;

const containerRowsColumns = () => {
  let styles = '';

  for (let n = 1; n < 4; n++) {
    styles += `
    &.rows--${n} {
      height: calc(${n}0vh + ${uiSize(32)});
    }
`;
  }

  for (let n = 1; n < 8; n++) {
    styles += `
    &.columns--${n} {
      width: calc(${n}0vh - ${uiSize(32)});
    }
`;
  }

  return styles;
};

export const InventoryContainer = styled.div`
  position: absolute;
  left: 50%;
  width: calc(80vh - ${uiSize(32)});
  height: calc(40vh + ${uiSize(32)});
  transform: translateX(-50%);

  border-radius: ${uiSize(4)};
  background-color: rgba(${theme.colors.redGray12.rgb}, 0.95);

  ${containerRowsColumns()};
`;

export const MainInventoryContainer = styled(InventoryContainer)`
  bottom: ${uiSize(64)};
`;

const targetContainerRowsColumns = () => {
  let styles = '';

  for (let n = 1; n < 4; n++) {
    styles += `
    &.rows--${n} {
      top: calc(${4 - n}0vh + ${uiSize(64)});
    }
`;
  }

  return styles;
};

export const TargetInventoryContainer = styled(InventoryContainer)`
  top: ${uiSize(64)};

  ${targetContainerRowsColumns()}
`;

export const InventoryDetailsStats = styled.div`
  position: absolute;
  height: ${uiSize(16)};
  right: ${uiSize(16)};
  left: ${uiSize(16)};
  display: flex;
  align-items: center;
  gap: ${uiSize(6)};
  color: ${theme.colors.white.hex};
  white-space: nowrap;

  font-family: 'Caveat', monospace;
  font-size: ${uiSize(9)};

  code {
    font-family: 'Caveat', monospace;
    opacity: 0.25;
  }
`;

export const InventoryHeader = styled(InventoryDetailsStats)`
  top: 0;
`;

export const InventoryFooter = styled(InventoryDetailsStats)`
  bottom: 0;
`;

export const InventoryWrapper = styled.div`
  user-select: none;
  position: absolute;
  top: ${uiSize(16)};
  right: ${uiSize(7)};
  bottom: ${uiSize(16)};
  left: ${uiSize(16)};
  overflow-x: hidden;
  overflow-y: auto;
  padding-right: ${uiSize(7)};

  display: flex;
  gap: ${uiSize(2)};
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;

  &::-webkit-scrollbar {
    width: ${uiSize(2)};
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(${theme.colors.white.rgb}, 0.5);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(${theme.colors.white.rgb}, 0.75);
  }
`;

const slotsRowsColumns = () => {
  let styles = '';

  for (let n = 1; n < 4; n++) {
    styles += `
    .rows--${n} & {
      height: calc(${(1 / n) * 100}% - ${uiSize(2)});
    }
`;
  }

  for (let n = 1; n < 8; n++) {
    styles += `
    .columns--${n} & {
      width: calc(${(1 / n) * 100}% - ${uiSize(2)});
    }
`;
  }

  return styles;
};

export const InventorySlot = styled.div`
  position: relative;
  width: calc(${(1 / 8) * 100}% - ${uiSize(2)});
  height: calc(${(1 / 4) * 100}% - ${uiSize(2)});

  ${slotsRowsColumns()};

  //border: ${uiSize(2)} dotted rgba(${theme.colors.gray25.rgb}, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: ${uiSize(4)};
  background-image: ${radialGradient('white', 0.025, 0.0125)};
  background-size: 100% 100%;

  &:before {
    transition: 250ms ease;
    content: '';
    position: absolute;
    //z-index: -1;
    inset: 0;
    opacity: 0;
    background-image: ${radialGradient('white', 0.25, 0.0125)};
  }

  &[data-has-item='true'] {
    //border-style: solid;
    //border-color: rgba(${theme.colors.gray25.rgb}, 0.25);
    background-image: ${radialGradient('white', 0.25, 0.05)};
  }

  &[data-broken='true'] {
    background-image: ${radialGradient('red', 0.5, 0.05)};

    &:before {
      background-image: ${radialGradient('red', 0.25, 0.025)};
    }
  }

  &:hover {
    body:has(#drag-item) &,
    &[data-has-item='true'] {
      //border-color: rgba(${theme.colors.white.rgb}, 0.5);
      &:before {
        opacity: 1;
      }
    }

    body:has(#drag-item) & {
      &:before {
        background-image: ${radialGradient('blue', 0.85, 0.125)};
      }
    }
  }

  > * {
    position: relative;
  }

  img,
  span {
    pointer-events: none;
  }

  svg {
    max-width: 66.6%;
  }

  img {
    max-width: 80%;
  }

  .quantity,
  .weight {
    color: white;
    position: absolute;
    color: ${theme.colors.gray88.hex};
    bottom: ${uiSize(1)};
  }

  .quantity {
    font-family: 'Caveat', monospace;
    font-size: ${uiSize(14)};
    right: ${uiSize(3)};
  }

  .weight {
    font-family: 'Caveat', monospace;
    font-size: ${uiSize(10)};
    left: ${uiSize(3)};
  }

  &.dragged-source {
    //background-color: rgba(${theme.colors.blue.rgb}, 0.15);
    background-image: ${radialGradient('blue', 0.425, 0.0625)};

    img,
    span {
      opacity: 0;
    }
  }

  &.dragged-item {
    //background-image: none;
    background-color: rgba(${theme.colors.redGray12.rgb}, 0.9);

    &:after {
      font-family: 'Caveat', monospace;
      font-size: ${uiSize(20)};
      content: '! DROP !';
      position: absolute;
      right: 0;
      top: 75%;
      transform: translateY(-50%);
      left: 0;
      text-align: center;
      color: ${theme.colors.red.hex};
    }
  }
`;

export const InventoryGlobalStyle = createGlobalStyle`
  body:has(#drag-item):has(${InventorySlot}:hover) {
    #drag-item:after {
      opacity: 0;
    }
  }
`;

export const InventorySlotBackground = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
`;
