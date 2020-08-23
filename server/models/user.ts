import { Document, Schema, Model, model } from 'mongoose';
import bcrypt from 'bcrypt';

import {Trace, User, UserCreationPayload, Map, LogoutSelectionType} from "../../types";
import { capitalizeFirstLetter } from "../../utils";

const jwt = require('jsonwebtoken');

export type IUserDocument = Document & User;

export interface IUser extends IUserDocument {
  generateAuthToken(trace: Trace) : { token: string, id: string };
  getClientData() : IUser;
  updateLastSeenDate(cookies: Map): Promise<void>;
  logout(token: string, selection: LogoutSelectionType): Promise<void>;
  updateUser(data: Pick<IUser,'firstName' | 'lastName'>): Promise<void>;
  changePassword(current: string, newPassword: string): Promise<void>;
}

export interface IUserModel extends Model<IUser> {
  findByCredentials(email: string, password: string): IUser;
  pushNewSessionMutation(user: IUser, trace: Trace, token: string): void;
  getAllUsers(): Promise<IUser[]>;
  getUserById(id: string): Promise<IUser | null>;
  createUser(userData: UserCreationPayload): Promise<IUser>;
}

export const UserSchema = new Schema({
  firstName: { type: String, required: true, minlength: 2, maxlength: 30, lowercase: true },
  lastName: { type: String, required: true, minlength: 2, maxlength: 30, lowercase: true },
  password: { type: String, required: true, minlength: 6, maxlength: 500 },
  email: { type: String, required: true, unique: true, lowercase: true, maxlength: 30 },
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
  const throwAnErr = () => { throw { status: 401, error: 'Invalid login credentials' } };
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
    options: { sort: { creationTime: -1 }, limit: 5 },
    populate: { path: 'likes', select: 'firstName lastName fullName' },
  });
  if (!user) throw { status: 404, error: 'User not found' };
  return user;
};

UserSchema.statics.createUser = async (userData: UserCreationPayload) : Promise<IUser> => {
  const existedUser = await User.findOne({ email: userData.email }, { posts: 0, ...sensetiveFields });
  if (existedUser) throw { status: 409, error: 'User with the same email already exists' };
  const user = new User(userData);
  await user.save();
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

UserSchema.methods.updateLastSeenDate = async function(this: IUser, cookies: Map) {
  const user = this;
  const { token: cookieToken } = cookies;
  const now = Date.now();
  user.sessions = user.sessions.map(s => {
    if (s.token === cookieToken) s.lastSeenDate = now;
    return s;
  });
  await user.save();
};

UserSchema.methods.logout = async function(this: IUser, token: string, selection: LogoutSelectionType) {
  const user = this;
  if (selection === 'all') {
    user.sessions = [];
  } else {
    user.sessions = user.sessions.filter((session) => {
      return selection === 'current' ? session.token !== token : String(session._id) !== selection.id;
    });
  }
  await user.save();
};

UserSchema.methods.updateUser = async function(this: IUser, data: Pick<IUser,'firstName' | 'lastName'>) {
  const user = this;
  if (typeof data !== 'object') throw { status: 400, error: 'Bad input' };
  const { firstName, lastName } = data;
  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (user.isModified()) {
    await user.save();
  } else {
    throw { status: 400, error: 'Nothing to update' };
  }
};

UserSchema.methods.changePassword = async function(this: IUser, current: string, newPassword: string) {
  const user = this;
  if (!(current || newPassword)) throw { status: 400, error: 'Bad input' };
  const isPasswordMatch = await bcrypt.compare(current, user.password || '');
  if (!isPasswordMatch) throw { status: 409, error: 'Current password does not match' };
  user.password = newPassword;
  await user.save();
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
