import { RenderableProps } from 'preact';
import { CSSProperties } from 'styled-components';

import { uiSize } from '@uiLib/helpers';

import theme from '@styled/theme';
import { HiddenActiveVisible } from '@styled/core';

interface FoodAndDrinkProps {
  width: number;
  height: number;
  food: number;
  drink: number;
  style?: CSSProperties;
  className?: string | undefined;
}

export default function FoodAndDrink(props: RenderableProps<FoodAndDrinkProps>) {
  return (
    <HiddenActiveVisible
      className={props.className}
      style={{ width: uiSize(props.width), height: uiSize(props.height), ...props.style }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
        <defs>
          <path
            id="soda"
            fill="currentColor"
            d="M336 128H206.73l20-80H272a16 16 0 0 0 16-16V16a16 16 0 0 0-16-16h-51.5a40 40 0 0 0-38.81 30.3L157.26 128H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-44.62 96H38.27l25.78 258.29A31.87 31.87 0 0 0 96 512h160a31.59 31.59 0 0 0 13.65-3.36A79.55 79.55 0 0 1 256 464a47.93 47.93 0 0 1 17-36.61 63.91 63.91 0 0 1 4.58-91.27 64 64 0 0 1-14-17.9 64.71 64.71 0 0 1 3.74-66.82c6.68-9.87 15.04-18.86 24.06-27.4z"
          />
          <path
            id="burger"
            fill="currentColor"
            d="M624 448H304a16 16 0 0 0-16 16 48 48 0 0 0 48 48h256a48 48 0 0 0 48-48 16 16 0 0 0-16-16zM319.27 320h289.46c25.35 0 40-29.27 25.54-50.59C604.8 226.13 539.94 192.07 464 192s-140.79 34.13-170.26 77.41c-14.53 21.32.19 50.59 25.53 50.59zM544 240a16 16 0 1 1-16 16 16 16 0 0 1 16-16zm-80-16a16 16 0 1 1-16 16 16 16 0 0 1 16-16zm-80 16a16 16 0 1 1-16 16 16 16 0 0 1 16-16zm-64 176h288a32 32 0 0 0 0-64H320a32 32 0 0 0 0 64z"
          />
        </defs>
        <use xlinkHref="#soda" style={{ color: '#333' }} />
        <use xlinkHref="#burger" style={{ color: '#333' }} />
        <use
          xlinkHref="#soda"
          style={{
            color: theme.colors.blue.hex,
            transition: `clip-path ${theme.transitionSpeed.fast}`,
            clipPath: `polygon(0 ${100 - props.drink}%, 100% ${100 - props.drink}%, 100% 100%, 0 100%)`,
          }}
        />
        <use
          xlinkHref="#burger"
          style={{
            color: theme.colors.orange.hex,
            transition: `clip-path ${theme.transitionSpeed.fast}`,
            clipPath: `polygon(0 ${100 - props.food}%, 100% ${100 - props.food}%, 100% 100%, 0 100%)`,
          }}
        />
      </svg>
    </HiddenActiveVisible>
  );
}
