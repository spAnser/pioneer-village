import styled from 'styled-components';
import { uiSize } from '@uiLib/helpers';
import theme from '@styled/theme';
import { FadeIn } from '@styled/animations';

export const Notif = styled.div`
  position: absolute;
  bottom: ${uiSize(100)};
  left: ${uiSize(40)};
  max-width: ${uiSize(300)};
  background-color: ${theme.colors.blue.hex};
  color: ${theme.colors.white.hex};
  padding: ${uiSize(6)} ${uiSize(10)};
  border-radius: ${theme.borderRadius.large};
  font-size: ${uiSize(12)};
  font-weight: 600;
  animation: ${FadeIn} ${theme.transitionSpeed.normal} forwards;

  &.centered {
    bottom: ${uiSize(11.5)};
    left: 50%;
    transform: translateX(-50%);
  }
`;
