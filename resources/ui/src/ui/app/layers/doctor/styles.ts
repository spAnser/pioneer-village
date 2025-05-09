import styled from 'styled-components';
import { uiSize } from '@uiLib/helpers';

export const DoctorWrapper = styled.div`
  &:hover {
    div {
      opacity: 0.75;
      transform: scale(0.5);

      &:hover {
        transform: scale(1);
        opacity: 1;
      }
    }
  }
`;

export const DoctorCircle = styled.div`
  transition: 250ms;
  position: absolute;
  border-radius: 50%;
  width: ${uiSize(48)};
  height: ${uiSize(48)};
  border: ${uiSize(3)} dashed #aaa;
  color: #fff;

  transform: scale(0.666);

  display: flex;
  align-items: center;
  justify-content: center;

  flex-wrap: wrap;

  &:after {
    transition: 250ms;
    content: attr(data-name);
    position: absolute;
    top: calc(100% + ${uiSize(4)});
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    pointer-events: none;
    text-transform: capitalize;
    width: 300%;
    text-align: center;
    filter: drop-shadow(0 -2px 0 black) drop-shadow(0 2px 0 black) drop-shadow(-2px 0 0 black)
      drop-shadow(2px 0 0 black);

    font-size: ${uiSize(20)};
    font-family: 'Caveat', cursive;
  }

  &:hover {
    border-width: ${uiSize(2)};
    border-color: #fff;

    z-index: 1;

    &:after {
      opacity: 1;
    }
  }

  svg {
    margin: ${uiSize(2)};
    width: ${uiSize(16)};
    height: ${uiSize(16)};
  }

  .borderCircle {
    position: absolute;
    inset: -3px;
    width: calc(100% + 6px);
    height: calc(100% + 6px);
    margin: 0;

    opacity: 0;

    &.slowest {
      circle {
        transition: 7500ms linear;
      }
    }

    &.slower {
      circle {
        transition: 2000ms linear;
      }
    }

    &.slow {
      circle {
        transition: 1500ms linear;
      }
    }

    &.normal {
      circle {
        transition: 1250ms linear;
      }
    }

    &.fast {
      circle {
        transition: 1000ms linear;
      }
    }

    &.faster {
      circle {
        transition: 750ms linear;
      }
    }

    &.fastest {
      circle {
        transition: 500ms linear;
      }
    }
  }

  &:not(.inspected) {
    .borderCircle {
      circle {
        stroke-dashoffset: 314px;
      }
    }
  }

  &.inspecting {
    border-color: transparent;

    .borderCircle {
      opacity: 1;

      circle {
        stroke-dashoffset: 0;
      }
    }
  }

  &.inspected {
    border-style: solid;
    border-color: transparent;

    width: ${uiSize(48)};
    height: ${uiSize(48)};

    .borderCircle {
      opacity: 1;

      circle {
        transition: 250ms linear;
      }
    }
  }
`;
