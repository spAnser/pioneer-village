import styled from 'styled-components';
import { uiSize } from '@uiLib/helpers';
import theme from '@styled/theme';

export const AnimationsContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: ${uiSize(960)};
  background-color: rgba(${theme.colors.black.rgb}, 0.75);
  color: ${theme.colors.white.hex};
  padding: ${uiSize(16)} ${uiSize(24)};
  font-size: ${uiSize(12)};

  label {
    color: ${theme.colors.white.hex};
  }

  [type='checkbox'] {
    margin-right: ${uiSize(8)};
  }
`;
