import React from 'react';
import Head from 'next/head';

import { Home } from 'containers';

const HomePage = (props: any) => {
  console.log(props)
  return (
    <>
      <Head>
        <title>Home page</title>
      </Head>
      <Home />
    </>
  )
};

export default React.memo(HomePage);
