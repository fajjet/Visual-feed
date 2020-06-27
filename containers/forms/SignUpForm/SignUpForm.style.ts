import styled from 'styled-components';
// import { provider } from 'styles';

const SignUpForm: any = {};

SignUpForm.Root = styled.div`
  display: inline-block;
  text-align: center;
  h2{
    text-align: center;
  }
`;

SignUpForm.Field = styled.div`
  padding-bottom: 1rem;
  &:last-of-type{
    padding-bottom: 2rem;
  }
`;

export default SignUpForm;
