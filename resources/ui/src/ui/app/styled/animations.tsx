import styled, { keyframes } from 'styled-components';
import theme from '@styled/theme';
import { uiSize } from '@uiLib/helpers';

export const FadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const FadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Infection = keyframes`
  0% {
    color: ${theme.colors.green.hex};
  }
  50% {
    color: ${theme.colors.yellow.hex};
  }
  100% {
    color: ${theme.colors.green.hex};
  }
`;

export const AnimInfection = styled.div`
  color: ${theme.colors.limeGreen.hex};
  &.active {
    animation: ${Infection} 5s linear infinite;
  }
`;

const Bleeding = keyframes`
  0% {
    color: ${theme.colors.gray50.hex};
  }
  50% {
    color: ${theme.colors.red.hex};
  }
  100% {
    color: ${theme.colors.gray50.hex};
  }
`;

const BloodOne = keyframes`
  0% {
      top: 200%;
  }
  9.999% {
      top: 200%;
  }
  10% {
      top: 30%;
  }
  25% {
    top: 200%;
  }
  100% {
    top: 200%;
  }
`;

const BloodTwo = keyframes`
  0% {
      top: 200%;
  }
  74.999% {
      top: 200%;
  }
  75% {
      top: 0%;
  }
  90% {
    top: 200%;
  }
  100% {
    top: 200%;
  }
`;

const BloodThree = keyframes`
  0% {
      top: 200%;
  }
  39.999% {
      top: 200%;
  }
  40% {
      top: -20%;
  }
  75% {
    top: 200%;
  }
  100% {
    top: 200%;
  }
`;

export const AnimBleeding = styled.div`
  color: ${theme.colors.yellow.hex};
  &.active {
    .clawMarks {
      animation: ${Bleeding} 2.5s linear infinite;
    }

    .blood {
      position: absolute;
      color: ${theme.colors.red.hex};

      &:nth-child(2) {
        animation: ${BloodOne} 7.5s linear infinite;
        left: ${uiSize(-10)};
        transform: scale(0.4);
      }

      &:nth-child(3) {
        animation: ${BloodTwo} 7.5s linear infinite;
        left: ${uiSize(12)};
        transform: scale(0.35);
      }

      &:nth-child(4) {
        animation: ${BloodThree} 7.5s linear infinite;
        left: ${uiSize(-5)};
        transform: scale(0.45);
      }
    }
  }
`;
