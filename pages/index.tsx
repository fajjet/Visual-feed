import React from 'react';

import { Helmet } from 'components';
import { PostWithPopulatedUsers } from "types";
import { Home } from 'containers';
import absoluteUrl from "next-absolute-url";
import nodeFetch from "isomorphic-fetch";
import { NextPageContext } from "next";

interface Props {
  pageProps: {
    posts: PostWithPopulatedUsers[];
  }
}

const HomePage = (props: Props) => {
  return (
    <>
      <Helmet title={'Home'}/>
      <Home posts={props.pageProps.posts}/>
    </>
  )
};

export const getServerSideProps = async (context: NextPageContext) => {
  const props = {
    posts: [],
  };
  if (context.req) {
    const { origin } = absoluteUrl(context.req);
    const res = await nodeFetch(origin + '/api/posts', {
      method: 'GET',
      headers: { Accept: 'application/json' }
    });
    const response = await res.json();
    props.posts = response?.posts || [];
  }
  return { props };
};

export default React.memo(HomePage);
