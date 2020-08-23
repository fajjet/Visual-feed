import { User } from './user';
import { CloudinaryImage } from './global';

export interface Post {
  _id: string;
  author: string;
  title: string;
  image: CloudinaryImage;
  creationTime: number;
  description?: string;
  likes: User[];
}

export interface PostWithPopulatedUsers extends Omit<Post, 'author'>{
  author: User;
}
