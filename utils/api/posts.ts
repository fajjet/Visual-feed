// import nodeFetch from 'isomorphic-fetch';

import { HttpResponse, Post } from "types";

type PostPayload = Omit<Post, 'creationTime' | '_id'>;

export const createPost = async (data: PostPayload)
  : Promise<HttpResponse<{ post?: Post, error?: string }>> => {
  return await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      post: data,
    }),
  });
};
