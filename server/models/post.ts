import { Document, Schema, model } from 'mongoose';
import { Post } from "../../types";

export type IPostDocument = Document & Post;

export const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true, minlength: 2 },
  image: { type: String, required: true },
  description: { type: String },
  creationTime: { type: Number },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User'  }],
});

const Post = model<IPostDocument>('Post', PostSchema);

export default Post;
