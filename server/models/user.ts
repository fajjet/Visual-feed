import * as mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
