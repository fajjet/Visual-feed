import styled, { css } from 'styled-components';
import { View } from "./Text";
import { provider } from 'styles';

const Text: any = {};

Text.Root = styled.div<{ view: View }>`
  text-transform: inherit;
  display: inline-block;
  margin: 0;
  ${props => props.view === 'h1' && css`
    font-size: 3.5rem;
    font-weight: 900;
    color: white;
    opacity: 0.95;
    text-shadow: 
      0 0 5px ${provider.color.aquamarine300},
      0 0 10px ${provider.color.aquamarine300},
      0 0 30px ${provider.color.aquamarine300},
      0 0 50px ${provider.color.aquamarine300};
  `}
`;

export default Text;
