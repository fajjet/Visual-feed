import React from 'react';
import Head from 'next/head';

import { SignIn } from 'containers';

const SignInPage = () => {
  return (
    <>
      <Head>
        <title>Sign in page</title>
      </Head>
      <SignIn/>
    </>
  )
};

export default React.memo(SignInPage);
