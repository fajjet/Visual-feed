import { Document, Schema, Model, model } from "mongoose";

import { Comment } from "../../types";

export type ICommentDocument = Document & Comment;

export interface IComment extends ICommentDocument {}

export interface ICommentModel extends Model<IComment> {}

export const CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  creationTime: { type: Number, required: true },
  content: { type: String, required: true },
});

const Comment: ICommentModel = model<IComment, ICommentModel>(
  "Comment",
  CommentSchema
);

export default Comment;
