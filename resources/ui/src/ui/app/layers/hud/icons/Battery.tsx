import theme from '@styled/theme';

export default function Battery(props: any) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fad"
      data-icon="battery-full"
      class="svg-inline--fa fa-battery-full fa-w-20"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
      style={{ width: '3.5vh', height: '3.5vh' }}
    >
      <g class="fa-group">
        <path
          class="fa-secondary"
          fill={props.charging ? theme.colors.green.hex : props.discharging ? theme.colors.red.hex : '#333'}
          d="M616 160h-8v-16a48 48 0 0 0-48-48H48a48 48 0 0 0-48 48v224a48 48 0 0 0 48 48h512a48 48 0 0 0 48-48v-16h8a24 24 0 0 0 24-24V184a24 24 0 0 0-24-24zm-40 128h-32v64H64V160h480v64h32z"
        />
        <path
          class="fa-primary"
          fill={props.percentage > 95 ? theme.colors.green.hex : props.percentage > 25 ? '#333' : theme.colors.red.hex}
          d="M512 320H96V192h416z"
          style={{ transform: `scaleX(${props.percentage / 100})`, transformOrigin: '96px 0' }}
        />
      </g>
    </svg>
  );
}
