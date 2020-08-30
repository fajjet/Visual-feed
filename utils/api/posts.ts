import { transformObjectToFormData } from "../helpers";
import { HttpResponse, Post, PostWithPopulatedUsers, ErrorResponse } from "types";

interface PostPayload extends Omit<Post, 'creationTime' | '_id' | 'image' | 'likes'> {
  image: File;
}

export const createPost = async (data: PostPayload)
  : Promise<HttpResponse<{ post?: PostWithPopulatedUsers } & ErrorResponse>> => {
  const formData = transformObjectToFormData(data);
  return await fetch('/api/posts', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: formData,
  });
};

export const updateLikes = async (action: boolean, id: string)
  : Promise<HttpResponse<{ post?: PostWithPopulatedUsers } & ErrorResponse>> => {
  return await fetch(`/api/posts/${action ? 'like' : 'dislike'}/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
    },
  });
};

export const getPosts = async (skip: number = 0, authorId: string = '')
  : Promise<HttpResponse<{ posts: PostWithPopulatedUsers[] } & ErrorResponse>> => {
  return await fetch('/api/posts/all/' + skip + `/${authorId}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
};
