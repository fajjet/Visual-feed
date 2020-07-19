import React from 'react';

import { SignUp } from 'containers';
import {Helmet} from "../components";

const SignUpPage = () => {
  return (
    <>
      <Helmet title={'Sign up'}/>
      <SignUp/>
    </>
  )
};

export default React.memo(SignUpPage);
