import { IUserDocument } from "server/models/user";
import {AppContext} from "next/app";
import {NextPageContext} from "next/dist/next-server/lib/utils";
import {IncomingMessage} from "connect";

export interface AuthResponse {
  user?: IUserDocument;
  error?: string;
  tokenId?: string;
}

export interface HttpResponse<T> extends Response {
  json(): Promise<T>;
}

export type LogoutSelectionType = 'current' | 'all' | { id: string | undefined };

export interface AppContextWithCookies extends AppContext{
  ctx: NextPageContext & { req?: IncomingMessage & { cookies: { [key: string]: any } } };
}

export interface NextPageContextWithCookies extends NextPageContext{
  req?: IncomingMessage & { [key: string]: any };
}
