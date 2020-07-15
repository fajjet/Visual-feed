import nodeFetch from 'isomorphic-fetch';

import { Trace, LogoutSelectionType, HttpResponse, User } from "types";

type UserPayload = Omit<User, 'sessions' | '_id'>;

export const getUsers = async (isServer: boolean)
  : Promise<HttpResponse<{ users?: User[], error?: string  }>> => {
  const fetchEntity = isServer ? nodeFetch : fetch;
  return await fetchEntity('/api/users', {
    method: 'GET',
  });
};

export const createUser = async (data: UserPayload)
  : Promise<HttpResponse<{ user?: User, tokenId?: string, error?: string  }>> => {
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

export const updateUser = async (data: {
  firstName: string;
  lastName: string;
}) : Promise<HttpResponse<{ user?: User, error?: string  }>> => {
  return await fetch('/api/users', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        user: data,
      }),
    });
};

export const updateUserPassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) : Promise<HttpResponse<{ user?: User, error?: string  }>> => {
  return await fetch('/api/users/password', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
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
  : Promise<HttpResponse<{ user?: User, error?: string  }>> => {
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
