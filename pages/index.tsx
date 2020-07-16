import React from 'react';
import Head from 'next/head';

import { Post } from "types";
import { Home } from 'containers';
import absoluteUrl from "next-absolute-url";
import nodeFetch from "isomorphic-fetch";

interface Props {
  pageProps: {
    posts: Post[];
  }
}

const HomePage = (props: Props) => {
  return (
    <>
      <Head>
        <title>Home page</title>
      </Head>
      <Home posts={props.pageProps.posts}/>
    </>
  )
};

export const getServerSideProps = async (context: any) => {
  let posts = [];
  if (context.req) {
    const { origin } = absoluteUrl(context.req);
    const res = await nodeFetch(origin + '/api/posts', {
      method: 'GET',
      headers: { Accept: 'application/json' }
    });
    const response = await res.json();
    posts = response?.posts;
  }
  return { props: { posts } };
};

export default React.memo(HomePage);
