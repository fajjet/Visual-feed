// import nodeFetch from 'isomorphic-fetch';

import { transformObjectToFormData } from "../helpers";

import { HttpResponse, Post, PostWithPopulatedUsers } from "types";

interface PostPayload extends Omit<Post, 'creationTime' | '_id' | 'image'> {
  image: File;
}

export const createPost = async (data: PostPayload)
  : Promise<HttpResponse<{ post?: PostWithPopulatedUsers, error?: string }>> => {
  const formData = transformObjectToFormData(data);
  return await fetch('/api/posts', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: formData,
  });
};

export const getPosts = async ()
  : Promise<HttpResponse<{ posts: Post[], error?: string }>> => {
  return await fetch('/api/posts', {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
};
