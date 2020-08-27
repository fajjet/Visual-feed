import {Document, Schema, model, Model} from 'mongoose';
import { Request } from "express";

import {Post, CloudinaryImage} from "../../types";
import {IUser} from "./user";

export type IPostDocument = Document & Post;

export interface IPost extends IPostDocument {

}

export interface IPostModel extends Model<IPost> {
  createPost(req: Request, image: CloudinaryImage): Promise<IPost>;
  getPostsByPage(page: number, authorId?: string) : Promise<IPost[]>;
  likePost(id: string, user: IUser) : Promise<IPost>;
  dislikePost(id: string, user: IUser) : Promise<IPost>;
}

export const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true, minlength: 2, maxlength: 100 },
  image: {
    id: { type: String, required: true },
    format: { type: String, required: true },
    height: { type: Number, required: true },
    width: { type: Number, required: true },
  },
  description: { type: String, maxlength: 500 },
  creationTime: { type: Number },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

PostSchema.statics.createPost = async function(req: Request, image: CloudinaryImage) {
  const { title, description, author } = req.body;
  const creationTime = Date.now();
  const post = new Post({ title, description, creationTime, author, image });
  await post.save();
  return post;
};

const pop = [{
  path: 'author',
  select: 'firstName lastName fullName',
},{
  path: 'likes',
  select: 'firstName lastName fullName',
}];

PostSchema.statics.getPostsByPage = async function(page: number, authorId?: string) {
  const where: Partial<Post> = {};
  if (authorId) where.author = authorId;
  return await Post.find(where)
    .sort({ creationTime: -1 }).limit(5).skip(Number(page) || 0)
    .populate(pop)
};

PostSchema.statics.likePost = async function(id: string, user: IUser) {
  const post = await Post.findOne({ _id: id }).populate(pop);
  if (!post) throw { status: 404, error: 'Post not found' };
  const postIsLiked = post.likes.filter(u => !!u).some(u => user._id.equals(u._id));
  if (!postIsLiked) {
    post.likes = post.likes.concat(user);
    await post.save();
  }
  return post;
};

PostSchema.statics.dislikePost = async function(id: string, user: IUser) {
  const post = await Post.findOne({ _id: id }).populate(pop)
  if (!post) throw { status: 404, error: 'Post not found' };
  const postIsLiked = post.likes.filter(u => !!u).some(u => user._id.equals(u._id));
  if (postIsLiked) {
    post.likes = post.likes.filter(u => !!u && !user._id.equals(u._id));
    await post.save();
  }
  return post;
};

const Post: IPostModel = model<IPost, IPostModel>('Post', PostSchema);

export default Post;
