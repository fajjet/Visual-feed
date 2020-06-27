import styled from 'styled-components';
import { provider } from 'styles';

const Button: any = {};

Button.Root = styled.div`
  appearance: none;
  border-radius: 0;
  user-select: none;
  outline: none;
  border: none;
  background: none;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${provider.color.blue};
  &:hover{
    color: white;
  }
`;

export default Button;
