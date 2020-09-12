import { User } from "./user";
import { CloudinaryImage } from "./common";

export interface Post {
  _id: string;
  author: string;
  title: string;
  image: CloudinaryImage;
  creationTime: number;
  description?: string;
  likes: User[];
}

export interface Comment {
  _id: string;
  author: string;
  creationTime: number;
  content: string;
}

export interface PostWithPopulatedUsers extends Omit<Post, "author"> {
  author: User;
}
