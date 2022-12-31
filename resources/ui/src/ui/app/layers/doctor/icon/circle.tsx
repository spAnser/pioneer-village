import theme from '@styled/theme';

export default function Battery(props: any) {
  return (
    <svg className={props.className} viewBox="0 0 106 106" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="53"
        cy="53"
        r="50"
        fill="none"
        stroke-dasharray="314.159"
        stroke={theme.colors.gray50.hex}
        stroke-width={props.width ?? '6px'}
        opacity="0.75"
      />
      <circle
        cx="53"
        cy="53"
        r="50"
        fill="none"
        stroke-dasharray="314.159"
        stroke={theme.colors[props.color ?? 'white'].hex}
        stroke-width={props.width ?? '6px'}
        stroke-dashoffset={`${2 * Math.PI * 50 * ((100 - (props.percentage ?? 100)) / 100)}px`}
      />
    </svg>
  );
}
