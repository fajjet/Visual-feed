import React from 'react';
import Head from 'next/head';

import { Users } from 'containers';
import absoluteUrl from "next-absolute-url";
import nodeFetch from "isomorphic-fetch";
import { User } from "types";

interface Props {
  pageProps: {
    users: User[] | null;
  }
}

const UsersPage = (props: Props) => {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Users users={props.pageProps.users}/>
    </>
  )
};

export const getServerSideProps = async (context: any) => {
  let users = null;
  if (context.req) {
    const { origin } = absoluteUrl(context.req);
    const res = await nodeFetch(origin + '/api/users', { method: 'GET' });
    const response = await res.json();
    users = response?.users;
  }
  return { props: { users } };
};

export default UsersPage;
