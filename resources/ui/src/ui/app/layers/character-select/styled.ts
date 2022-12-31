import styled from 'styled-components';
import { uiSize } from '@uiLib/helpers';
import theme from '@styled/theme';

const black50 = `rgba(${theme.colors.gray12.rgb}, 0.5)`;
const black25 = `rgba(${theme.colors.gray12.rgb}, 0.25)`;

export const Characters = styled.div`
  user-select: none;
  position: fixed;
  right: ${uiSize(64)};
  bottom: ${uiSize(96)};
  left: ${uiSize(64)};
`;

export const CreateCharacter = styled.div`
  user-select: none;
  position: fixed;
  bottom: ${uiSize(16)};
  left: 50%;
  font-family: 'Caveat', cursive;
  display: inline-block;
  color: ${theme.colors.white.hex};
  font-size: ${uiSize(24)};
  transform: translateX(-50%);
  // filter: drop-shadow(0 ${uiSize(1)} ${uiSize(1)} ${black50}) drop-shadow(0 -${uiSize(1)} ${uiSize(1)} ${black50})
  //   drop-shadow(${uiSize(1)} 0 ${uiSize(1)} ${black50}) drop-shadow(-${uiSize(1)} 0 ${uiSize(1)} ${black50});
  transition: ${theme.transitionSpeed.normal};
  opacity: 0.75;

  text-align: center;
  width: 355px;
  height: 64px;
  line-height: 56px;
  background-image: url(https://p--v.b-cdn.net/smear-1.png);

  &:hover {
    opacity: 1;
    // filter: drop-shadow(0 ${uiSize(1)} ${uiSize(2)} ${black25}) drop-shadow(0 -${uiSize(1)} ${uiSize(2)} ${black25})
    //   drop-shadow(${uiSize(1)} 0 ${uiSize(2)} ${black25}) drop-shadow(-${uiSize(1)} 0 ${uiSize(2)} ${black25});
  }
`;

export const CharacterLabel = styled.div`
  display: inline-block;
  margin-left: ${uiSize(16)};
  margin-right: ${uiSize(16)};
  font-family: 'Caveat', cursive;
  color: ${theme.colors.white.hex};
  font-size: ${uiSize(24)};
  filter: drop-shadow(0 ${uiSize(1)} ${uiSize(1)} ${black50}) drop-shadow(0 -${uiSize(1)} ${uiSize(1)} ${black50})
    drop-shadow(${uiSize(1)} 0 ${uiSize(1)} ${black50}) drop-shadow(-${uiSize(1)} 0 ${uiSize(1)} ${black50});
  transition: ${theme.transitionSpeed.normal};
  opacity: 0.75;

  &.positioned {
    margin: 0;
    padding: ${uiSize(72)} ${uiSize(32)};
    transform: translateX(-50%) translateY(-50%);
    opacity: 0;
  }

  &:hover {
    opacity: 1;
  }

  //&:nth-child(1) {
  //  font-family: 'Caveat', cursive;
  //  &:before {
  //    content: 'Caveat : ';
  //  }
  //}
  //&:nth-child(2) {
  //  font-family: 'Dancing Script', cursive;
  //  &:before {
  //    content: 'Dancing Script : ';
  //  }
  //}
  //&:nth-child(3) {
  //  font-family: 'Josefin Sans', sans-serif;
  //  &:before {
  //    content: 'Josefin Sans : ';
  //  }
  //}
  //&:nth-child(4) {
  //  font-family: 'Redressed', cursive;
  //  &:before {
  //    content: 'Redressed : ';
  //  }
  //}
  //&:nth-child(5) {
  //  font-family: 'Satisfy', cursive;
  //  &:before {
  //    content: 'Satisfy : ';
  //  }
  //}
  //&:nth-child(6) {
  //  font-family: 'Waiting for the Sunrise', cursive;
  //  &:before {
  //    content: 'Waiting for the Sunrise : ';
  //  }
  //}
`;
