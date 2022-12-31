import theme from '../theme';
import styled from 'styled-components';

const BoxBg = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  bottom: 5px;
  left: 5px;
`;

const BoxCorner = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
`;

const BoxContent = styled.div`
  padding: 30px;
`;

export default function Border(props: any) {
  let color = 'transparent';
  if (props.highlight) {
    color = theme.colors[props.color] ? theme.colors[props.color].hex : theme.colors.green.hex;
  }

  return (
    <div style={{ position: 'relative' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={460}
        height={460}
        style={{ position: 'absolute', inset: '0', width: '100%', height: '100%' }}
        preserveAspectRatio="none"
      >
        <defs>
          <rect id="bg" width="35" height="35" transform="translate(5 5)" fill="#fff" opacity="0.1" />
          <symbol id="box-bg" viewBox="5 5 35 35" preserveAspectRatio="none">
            <use xlinkHref="#bg" style="overflow:none;" />
          </symbol>
          <g id="top-left" transform="translate(-5 -5)">
            <line
              x2="15"
              transform="translate(5 5.5)"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              opacity="0.5"
            />
            <line
              y2="15"
              transform="translate(5.5 5)"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              opacity="0.5"
            />
            <line x2="10" transform="translate(5 6)" fill="none" stroke="currentColor" stroke-width="2" />
            <line y2="10" transform="translate(6 5)" fill="none" stroke="currentColor" stroke-width="2" />
            <line x2="10" transform="translate(10 10.5)" fill="none" stroke="#fff" stroke-width="1" opacity="0.5" />
            <line y2="10" transform="translate(10.5 10)" fill="none" stroke="#fff" stroke-width="1" opacity="0.5" />
            <rect width="2" height="2" transform="translate(10 10)" fill="#fff" />
          </g>
          <symbol id="box-top-left" viewBox="0 0 15 15" preserveAspectRatio="none">
            <use xlinkHref="#top-left" style="overflow:none;" />
          </symbol>
          <symbol id="box-top-right" viewBox="-15 0 15 15" preserveAspectRatio="none">
            <use xlinkHref="#top-left" style="overflow:none;transform:rotateZ(90deg)" />
          </symbol>
          <symbol id="box-bottom-right" viewBox="-15 -15 15 15" preserveAspectRatio="none">
            <use xlinkHref="#top-left" style="overflow:none;;transform:rotateZ(180deg)" />
          </symbol>
          <symbol id="box-bottom-left" viewBox="0 -15 15 15" preserveAspectRatio="none">
            <use xlinkHref="#top-left" style="overflow:none;transform:rotateZ(270deg)" />
          </symbol>
        </defs>
        <foreignObject
          x="0"
          y="0"
          width="100%"
          height="100%"
          style={{ transition: theme.transitionSpeed.normal, color }}
        >
          <BoxBg>
            <svg
              width="100%"
              height="100%"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <use xlinkHref="#box-bg" />
            </svg>
          </BoxBg>
          <BoxCorner style={{ top: 0, left: 0 }}>
            <svg
              width="100%"
              height="100%"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <use xlinkHref="#box-top-left" />
            </svg>
          </BoxCorner>
          <BoxCorner style={{ top: 0, right: 0 }}>
            <svg
              width="100%"
              height="100%"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <use xlinkHref="#box-top-right" />
            </svg>
          </BoxCorner>
          <BoxCorner style={{ bottom: 0, left: 0 }}>
            <svg
              width="100%"
              height="100%"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <use xlinkHref="#box-bottom-left" />
            </svg>
          </BoxCorner>
          <BoxCorner style={{ bottom: 0, right: 0 }}>
            <svg
              width="100%"
              height="100%"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <use xlinkHref="#box-bottom-right" />
            </svg>
          </BoxCorner>
        </foreignObject>
      </svg>
      <BoxContent>{props.children}</BoxContent>
    </div>
  );
}
