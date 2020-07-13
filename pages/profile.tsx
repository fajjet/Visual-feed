import React from 'react';
import Head from 'next/head';
import Cookies from "js-cookie";

import { Profile } from 'containers';

interface Props {
  pageProps: {
    tokenId: string;
  }
}

const ProfilePage = (props: Props) => {
  const { tokenId } = props.pageProps || {};
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Profile tokenId={tokenId}/>
    </>
  )
};

ProfilePage.getInitialProps = async (context: any) => {
  let tokenId = '';
  if (context.req) {
    tokenId = context.req?.cookies?.tokenId;
  } else {
    tokenId = Cookies.get('tokenId') || '';
  }
  return {
    tokenId,
  }
};

export default ProfilePage;
