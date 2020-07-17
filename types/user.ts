import { PostWithPopulatedUsers } from './post';

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
  posts?: PostWithPopulatedUsers[];
}

export interface Trace {
  ip: string;
  uag: string;
  city: string;
}
