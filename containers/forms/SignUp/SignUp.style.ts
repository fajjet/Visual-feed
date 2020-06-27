import styled from 'styled-components';
// import { provider } from 'styles';

const SignUpStyle: any = {};

SignUpStyle.Root = styled.div`
  display: inline-block;
  text-align: center;
  h2{
    text-align: center;
  }
`;

SignUpStyle.Field = styled.div`
  padding-bottom: 1rem;
  &:last-of-type{
    padding-bottom: 2rem;
  }
`;

export default SignUpStyle;
