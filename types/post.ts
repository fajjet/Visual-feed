import { User } from "./user";
import { CloudinaryImage } from "./common";

export interface Comment {
  _id: string;
  author: User;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export interface Post {
  _id: string;
  author: string;
  title: string;
  image: CloudinaryImage;
  creationTime: number;
  description?: string;
  likes: User[];
  comments: Comment[];
}

export interface PostWithPopulatedUsers extends Omit<Post, "author"> {
  author: User;
}
