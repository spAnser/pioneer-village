import styled from 'styled-components';
import { uiSize } from '@uiLib/helpers';
import theme from '@styled/theme';

export const POI = styled.div`
  position: absolute;

  width: ${uiSize(16)};
  height: ${uiSize(16)};

  border-radius: ${uiSize(8)};
  border: ${uiSize(3)} solid ${theme.colors.red.hex};

  &.active {
    width: ${uiSize(32)};
    height: ${uiSize(32)};
    border-radius: ${uiSize(4)};

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: ${uiSize(24)};

    color: ${theme.colors.white.hex};
    background-color: rgba(${theme.colors.black.rgb}, 0.5);
  }
`;
