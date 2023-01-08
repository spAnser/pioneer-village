import styled from 'styled-components';

export const GenderSelect = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: ${(1 / 3) * 100}%;
  height: 100vh;
  transition: 500ms;

  &.active {
    width: ${(2 / 3) * 100}%;
  }
`;
