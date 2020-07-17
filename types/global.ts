import { IUserDocument } from "server/models/user";

export interface AuthResponse {
  user?: IUserDocument;
  error?: string;
  tokenId?: string;
}

export interface HttpResponse<T> extends Response {
  json(): Promise<T>;
}

export type LogoutSelectionType = 'current' | 'all' | { id: string | undefined };
