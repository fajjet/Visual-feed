import { transformObjectToFormData } from "../helpers";
import { HttpResponse, Post, PostWithPopulatedUsers } from "types";

interface PostPayload extends Omit<Post, 'creationTime' | '_id' | 'image' | 'likes'> {
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

export const updateLikes = async (action: boolean, id: string)
  : Promise<HttpResponse<{ post?: PostWithPopulatedUsers, error?: string }>> => {
  return await fetch(`/api/posts/${action ? 'like' : 'dislike'}/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
    },
  });
};

export const getPosts = async (skip: number)
  : Promise<HttpResponse<{ posts: PostWithPopulatedUsers[], error?: string }>> => {
  return await fetch('/api/posts/' + skip, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
};
