import { User } from './user';

export interface Post {
  _id: string;
  author: string;
  title: string;
  image: string;
  creationTime: number;
  description?: string;
  likes: User[];
}

export interface PostWithPopulatedUsers extends Omit<Post, 'author'>{
  author: User;
}
