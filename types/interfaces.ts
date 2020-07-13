import { IUserDocument } from "server/models/user";

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
