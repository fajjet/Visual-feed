import React from 'react';

import { SignInForm } from 'containers';
import Styled from './SignIn.style';

interface Props {

}

const SignIn = (props: Props) => {
  return (
    <Styled.Root>
      <div className={'content-wrapper'}>
        <SignInForm/>
      </div>
    </Styled.Root>
  )
};

export default React.memo(SignIn);
