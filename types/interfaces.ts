import { IUserDocument } from "server/models/user";

export enum Roles {
  member = 'member',
  admin = 'admin',
}

export interface Session {
  _id?: string;
  ip?: string;
  uag?: string;
  city?: string;
  token?: string;
  lastSeenDate?: number;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Roles;
  sessions: Session[];
  password?: string;
  fullName?: string;
}

export interface Trace {
  ip: string;
  uag: string;
  city: string;
}

export interface AuthResponse {
  user?: IUserDocument;
  error?: string;
  tokenId?: string;
}

export interface HttpResponse<T> extends Response {
  json(): Promise<T>;
}

export interface Post {
  _id: string;
  authorId: string;
  title: string;
  creationTime: number;
  description?: string;
}
