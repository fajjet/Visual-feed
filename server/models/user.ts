import { Document, Schema, Model, model } from 'mongoose';
import bcrypt from 'bcrypt';

import { Trace, User } from "../../types";
import { capitalizeFirstLetter } from "../../utils";

const jwt = require('jsonwebtoken');

export type IUserDocument = Document & User;

export interface IUser extends IUserDocument {
  generateAuthToken(trace: Trace) : { token: string, id: string };
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
  role: { type: String, enum: ['member', 'admin'], default: 'member' },
  sessions: [{
    token: { type: String,  required: true },
    ip: { type: String },
    uag: { type: String },
    city: { type: String },
    lastSeenDate: { type: Number },
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
  const isPasswordMatch = await bcrypt.compare(password, user?.password || '');
  if (!isPasswordMatch) throwAnErr();
  return user;
};

UserSchema.methods.generateAuthToken = async function(this: IUser, trace: Trace) {
  const user = this;
  const { uag, ip } = trace;
  const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
  const sessions = user.sessions.filter(session => {
    return !(session.ip === ip && session.uag === uag);
  });
  const date = Date.now();
  user.sessions = [ ...sessions, { token, lastSeenDate: date, ...trace } ];
  await user.save();
  const createdTokenId = user.sessions[user.sessions.length - 1]._id;
  return { token, id: createdTokenId };
};

UserSchema.methods.getClientData = function(this: IUser) {
  return this.toObject({ transform: (doc, ret: IUser, opt) => {
    ret.sessions = ret.sessions?.map(({ token, ...rest }) => {
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
