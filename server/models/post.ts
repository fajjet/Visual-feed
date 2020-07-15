import { Document, Schema, model } from 'mongoose';

import { Post } from "../../types";

export type IPostDocument = Document & Post;

export const PostSchema = new Schema({
  authorId: { type: String, required: true },
  title: { type: String, required: true, minlength: 2 },
  description: { type: String },
  creationTime: { type: Number },
});

const Post = model<IPostDocument>('Post', PostSchema);

export default Post;
