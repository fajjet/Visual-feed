import { Document, Schema, Model, model } from 'mongoose';
// @ts-ignore
import bcrypt from 'bcrypt';
import { Trace } from "../../types";
import { capitalizeFirstLetter } from '../utils';
const jwt = require('jsonwebtoken');

export interface ITokenDocument {
  _id?: string;
  ip?: string;
  uag?: string;
  city?: string;
  token?: string;
  lastSeenDate?: number;
}

export interface IUserDocument extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  password?: string;
  fullName?: string;
  email: string;
  tokens: ITokenDocument[],
}

export interface IUser extends IUserDocument {
  generateAuthToken(trace: Trace, date: number) : { token: string, id: string };
  getClientData() : IUser;
}

export interface IUserModel extends Model<IUser> {
  findByCredentials(email: string, password: string): IUser;
}

export const UserSchema = new Schema({
  firstName: { type: String, required: true, minlength: 2, lowercase: true },
  lastName: { type: String, required: true, minlength: 2, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  email: { type: String, required: true, unique: true, lowercase: true },
  tokens: [{
    token: { type: String,  required: true },
    ip: { type: String },
    uag: { type: String },
    city: { type: String },
    lastSeenDate: { type: Date },
  }]
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
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
  const throwAnErr = () => { throw { error: 'Invalid login credentials' } };
  if (!user) throwAnErr();
  const isPasswordMatch = await bcrypt.compare(password, user?.password);
  if (!isPasswordMatch) throwAnErr();
  return user;
};

UserSchema.methods.generateAuthToken = async function(this: IUser, trace: Trace, date: number) {
  const user = this;
  const { uag, ip } = trace;
  const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
  const tokens = user.tokens.filter(token => {
    return !(token.ip === ip && token.uag === uag);
  });
  user.tokens = [ ...tokens, { token, lastSeenDate: date, ...trace } ];
  await user.save();
  const createdTokenId = user.tokens[user.tokens.length - 1]._id;
  return { token, id: createdTokenId };
};

UserSchema.methods.getClientData = function(this: IUser) {
  return this.toObject({ transform: (doc, ret: IUser, opt) => {
    ret.tokens = ret.tokens?.map(({ token, ...rest }) => {
      return { ...rest };
    });
    delete ret.password;
    return ret;
  }});
};

UserSchema.virtual('fullName').get(function (this: IUser) {
  return capitalizeFirstLetter(this.firstName) + ' ' + capitalizeFirstLetter(this.lastName);
});

const User: IUserModel = model<IUser, IUserModel>('User', UserSchema);

export default User;
