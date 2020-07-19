import React from 'react';

import { SignIn } from 'containers';
import { Helmet } from "components";

const SignInPage = () => {
  return (
    <>
      <Helmet title={'Sign in'}/>
      <SignIn/>
    </>
  )
};

export default React.memo(SignInPage);
