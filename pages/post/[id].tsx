import React from 'react';

import { CustomNextPageContext, PostWithPopulatedUsers } from 'types';
import { Post } from 'containers';
import absoluteUrl from "next-absolute-url";
import nodeFetch from "isomorphic-fetch";
import { Helmet } from "components";

interface Props {
  pageProps: {
    post: PostWithPopulatedUsers | null;
  }
}

const PostPage = (props: Props) => {
  const post = props.pageProps.post;
  return (
    <>
      <Post data={post}/>
      <Helmet title={(post ? `${post.title} by ${post.author.fullName}` : 'Post not found')}/>
    </>
  )
};

export const getServerSideProps = async (context: CustomNextPageContext) => {
  const props = { post: null };
  if (context.req) {
    const id = context.query.id;
    const { origin } = absoluteUrl(context.req);
    const res = await nodeFetch(origin + '/api/posts/' + id, { method: 'GET' });
    if (res.status === 200) {
      const response = await res.json();
      props.post = response.post;
    }
  }
  return { props };
};


export default React.memo(PostPage);
