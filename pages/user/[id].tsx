import React from 'react';
import Head from 'next/head';

import { User as UserType } from 'types';
import { User } from 'containers';
import {NextPageContext} from "next";
import absoluteUrl from "next-absolute-url";
import nodeFetch from "isomorphic-fetch";

interface Props {
  pageProps: {
    user: UserType | null;
  }
}

const UserPage = (props: Props) => {
  console.log(props)
  return (
    <>
      <Head>
        <title>User page</title>
      </Head>
      <User data={props.pageProps.user}/>
    </>
  )
};

export const getServerSideProps = async (context: NextPageContext) => {
  const result = { user: null };
  if (context.req) {
    const id = context.query.id;
    const { origin } = absoluteUrl(context.req);
    const res = await nodeFetch(origin + '/api/users/' + id, { method: 'GET' });
    if (res.status === 200) {
      const response = await res.json();
      result.user = response?.user;
    }
  }
  return { props: result };
};


export default React.memo(UserPage);
