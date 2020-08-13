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
  pushNewSessionMutation(user: IUser, trace: Trace, token: string): void;
  getAllUsers(): Promise<IUser[]>;
  getUserById(id: string): Promise<IUser | null>;
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
  }],
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
  const user = await User.findOne({ email }, { posts: 0 });
  const throwAnErr = () => { throw { error: 'Invalid login credentials' } };
  if (!user) throwAnErr();
  const isPasswordMatch = await bcrypt.compare(password, user?.password || '');
  if (!isPasswordMatch) throwAnErr();
  return user;
};

UserSchema.statics.pushNewSessionMutation = (user: IUser, trace: Trace, token: string): void => {
  const { uag, ip } = trace;
  const date = Date.now();
  const sessions = user.sessions.filter(session => {
    return !(session.ip === ip && session.uag === uag);
  });
  user.sessions = [ ...sessions, { token, lastSeenDate: date, ...trace } ];
};

const sensetiveFields = {
  password: 0,
  sessions: 0,
};

UserSchema.statics.getAllUsers = async () : Promise<IUser[]> => {
  return await User.find({}, {
    ...sensetiveFields,
    posts: 0,
  });
};

UserSchema.statics.getUserById = async (id: string) : Promise<IUser | null> => {
  const user = await User.findOne({ _id: id }, {
    ...sensetiveFields
  }).populate({
    path: 'posts',
    options: { sort: { creationTime: -1 } },
    populate: { path: 'likes', select: 'firstName lastName fullName' },
  });
  if (!user) throw { status: 404, error: 'User not found' };
  return user;
};

UserSchema.methods.generateAuthToken = async function(this: IUser, trace: Trace) {
  const user = this;
  const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
  UserSchema.statics.pushNewSessionMutation(user, trace, token);
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
  if (!(this.firstName && this.lastName)) return '';
  return capitalizeFirstLetter(this.firstName) + ' ' + capitalizeFirstLetter(this.lastName);
});

UserSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author',
});

const User: IUserModel = model<IUser, IUserModel>('User', UserSchema);

export default User;
