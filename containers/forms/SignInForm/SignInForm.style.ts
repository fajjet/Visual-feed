import styled from 'styled-components';
// import { provider } from 'styles';

const SignInForm: any = {};

SignInForm.Root = styled.div`
  display: inline-block;
  text-align: center;
  h2{
    text-align: center;
  }
`;

SignInForm.Field = styled.div`
  padding-bottom: 0.5rem;
  &:last-of-type{
    padding-bottom: 1.5rem;
  }
`;

export default SignInForm;
