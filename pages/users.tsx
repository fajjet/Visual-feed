import React from 'react';
import Head from 'next/head';

import { Users } from 'containers';
import {NextPageContext} from "next";

const UsersPage = () => {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Users/>
    </>
  )
};

UsersPage.getInitialProps = (context: NextPageContext) => {
  if (context.req) {

  }
};

export default UsersPage;
