import React from 'react';
import Head from 'next/head';

import { Profile } from 'containers';

const ProfilePage = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Profile/>
    </>
  )
};

export default React.memo(ProfilePage);
