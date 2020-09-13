import styled from 'styled-components';
// import { provider } from 'styles';

const SignUpForm: any = {};

SignUpForm.Root = styled.div`
  display: inline-block;
  text-align: center;
  width: 15rem;
  h2{
    text-align: center;
  }
`;

SignUpForm.Field = styled.div`
  padding-bottom: 0.5rem;
  &:last-of-type{
    padding-bottom: 1.5rem;
  }
`;

export default SignUpForm;
