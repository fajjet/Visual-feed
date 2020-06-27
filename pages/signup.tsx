import React from 'react';
import Head from 'next/head';

import { SignUp } from 'containers';

const SignUpPage = () => {
  return (
    <>
      <Head>
        <title>Sign up page</title>
      </Head>
      <SignUp/>
    </>
  )
};

export default React.memo(SignUpPage);
