import styled from 'styled-components';
import { uiSize } from '@uiLib/helpers';

const bottom = uiSize(20);
const leftRight = uiSize(40);
const height = uiSize(60);
const spacing = uiSize(16);

export const Crosshair = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${uiSize(6)};
  height: ${uiSize(6)};
  border-radius: 50%;
  background-color: #999;
  border: ${uiSize(1)} solid #333;
  opacity: 0.75;
  user-select: none;
`;

export const HudBottomLeft = styled.div`
  position: absolute;
  bottom: ${bottom};
  left: ${leftRight};
  display: flex;
  align-items: center;
  height: ${height};
  user-select: none;

  > *:not(:last-child) {
    &.active {
      margin-right: ${spacing};
    }
  }
`;

export const HudBottomCenter = styled.div`
  position: absolute;
  bottom: ${bottom};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  height: ${height};
  user-select: none;
  margin-left: ${spacing};
  margin-right: ${spacing};
`;

export const HudBottomRight = styled.div`
  position: absolute;
  bottom: ${bottom};
  right: ${leftRight};
  display: flex;
  align-items: center;
  height: ${height};
  user-select: none;

  > *:not(:first-child) {
    margin-left: ${spacing};
  }
`;
