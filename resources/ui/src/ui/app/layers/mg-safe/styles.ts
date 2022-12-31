import styled from 'styled-components';
import { uiSize } from '@uiLib/helpers';

const dialSize = uiSize(200);
const dialSizeHalf = uiSize(100);

export const MGSafeFrame = styled.div`
  position: fixed;
  inset: 0;
`;

export const MGDial = styled.div`
  position: absolute;
  top: calc(50% - ${dialSizeHalf});
  left: calc(50% - ${dialSizeHalf});
  width: ${dialSize};
  height: ${dialSize};
  border-radius: 50%;
  background-color: #fff;
  z-index: 1;
  border: ${uiSize(2)} solid black;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: ${uiSize(2)};
    height: 25%;
    background-color: #000;
    z-index: -1;
    transform: translateX(-50%);
  }
`;
