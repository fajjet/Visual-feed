import { Trace, LogoutSelectionType } from "types";
import {IUserDocument} from "../../server/models/user";

interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

export const createUser = async (data: any) => {
  const trace = await getUserTrace();
  const date = new Date().getTime();
  return await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        user: data,
        trace,
        date,
      }),
    });
};

export const auth = async (email: string, password: string) => {
  const trace = await getUserTrace();
  const date = new Date().getTime();
    return await fetch('/api/users/auth', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email, password, trace, date }),
    });
};

export const logout = async (selection: LogoutSelectionType)
  : Promise<HttpResponse<{ user?: IUserDocument, error?: string  }>> => {
    return await fetch('/api/users/logout', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ selection }),
    });
};

export const getUserTrace = async () : Promise<Trace> => {
  const trace = await (await fetch('http://www.geoplugin.net/json.gp')).json();
  const { geoplugin_city: city, geoplugin_request: ip } = trace || {};
  const uag = navigator.userAgent;
  return { city: city || '', ip: ip || '', uag: uag || '' };
};
