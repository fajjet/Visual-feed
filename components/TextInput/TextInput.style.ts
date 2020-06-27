import styled from 'styled-components';
// import { provider } from 'styles';

const TextInput: any = {};

TextInput.Root = styled.div`
  text-align: left;
  input {
    height: 35px;
    display: block;
    padding: 0 5px;
    appearance: none;
    border: 1px solid black;
    outline: none;
    &:not([value=""]):not(:focus):invalid{
      border-color: red;
    }
  }
`;

TextInput.Label = styled.span`
  display: block;
  margin-right: 1rem;
  font-size: 14px;
`;

export default TextInput;
