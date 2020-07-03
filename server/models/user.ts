import { Document, Schema, Model, model } from 'mongoose';
// @ts-ignore
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');

export interface ITokenDocument {
  token: string;
  ip?: string;
  uag?: string;
}

export interface IUserDocument extends Document {
  firstName: string;
  lastName: string;
  password?: string;
  email: string;
  tokens: ITokenDocument[],
}

export interface IUser extends IUserDocument {
  generateAuthToken(ip: string, uag: string) : string;
}

export interface IUserModel extends Model<IUser> {
  findByCredentials(email: string, password: string): IUser;
}

export const UserSchema = new Schema({
  firstName: { type: String, required: true, minlength: 2 },
  lastName: { type: String, required: true, minlength: 2 },
  password: { type: String, required: true, minlength: 6 },
  email: { type: String, required: true, unique: true, lowercase: true },
  tokens: [{
    token: { type: String,  required: true },
    ip: { type: String },
    uag: { type: String },
  }]
});

UserSchema.pre<IUser>('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next();
});

UserSchema.statics.findByCredentials = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid login credentials');
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error('Invalid login credentials');
  }
  return user;
};

UserSchema.methods.generateAuthToken = async function(this: IUser, ip: string, uag: string) {
  const user = this;
  const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
  const tokens = user.tokens.filter(token => {
    return !(token.ip === ip && token.uag === uag);
  });
  user.tokens = [ ...tokens, { token, ip, uag } ];
  await user.save();
  return token;
};

const User: IUserModel = model<IUser, IUserModel>('User', UserSchema);
export default User;
