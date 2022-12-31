import { RenderableProps } from 'preact';
import styled, { CSSProperties } from 'styled-components';

import { uiSize } from '@uiLib/helpers';
import theme, { themeColor } from '@styled/theme';

const SuggestionsContainer = styled.ul`
  margin: 0;
  padding: 0;
  border-radius: ${theme.borderRadius.small};
  background-color: ${theme.colors.black.hex};
  opacity: 0;
  pointer-events: none;
  visibility: unset;
  transition: ${theme.transitionSpeed.fast};
  list-style: none;

  &.active {
    opacity: 1;
    visibility: visible;
  }

  li {
    display: flex;
    padding: ${uiSize(4)} ${uiSize(8)};
    border-radius: ${theme.borderRadius.small};
    color: ${theme.colors.white.hex};

    span {
      opacity: 0.333;
      text-align: right;
      flex-grow: 1;
    }
  }
`;

interface SuggestionsProps {
  input: string;
  suggestions: UI.Chat.Suggestions;
  active?: boolean;
  style?: CSSProperties;
}

const defaultProps = {
  input: '',
  suggestions: [],
  active: false,
  style: {},
};

export default function Suggestions(props: RenderableProps<SuggestionsProps>) {
  const { input, suggestions, active, style } = { ...defaultProps, ...props };

  const inputs = input.split(' ');
  let matchingSuggestions = Object.keys(suggestions).filter((key) =>
    key.toLowerCase().startsWith(inputs[0].toLowerCase()),
  );

  let prefix = '';
  if (matchingSuggestions.length === 1 && (inputs.length > 1 || inputs[0] === matchingSuggestions[0])) {
    const suggestion = suggestions[matchingSuggestions[0]];
    if (suggestion.children) {
      prefix = matchingSuggestions[0];
      const remainingInput = inputs.slice(1).join(' ');
      matchingSuggestions = suggestion.children?.filter((key) =>
        key.toLowerCase().startsWith(remainingInput.toLowerCase()),
      );
    }
  }

  matchingSuggestions = matchingSuggestions.slice(0, 6);

  return (
    <SuggestionsContainer style={style} className={active ? 'active' : ''}>
      {input &&
        matchingSuggestions.map((suggestion) => (
          <li key={suggestion}>
            {prefix} {suggestion} <span>{suggestions[suggestion]?.description}</span>
          </li>
        ))}
    </SuggestionsContainer>
  );
}
