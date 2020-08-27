import nodeFetch from 'isomorphic-fetch';

import {Trace, LogoutSelectionType, HttpResponse, User, UserCreationPayload, ErrorResponse } from "types";

export const getUsers = async (isServer: boolean)
  : Promise<HttpResponse<{ users?: User[], error?: string  }>> => {
  const fetchEntity = isServer ? nodeFetch : fetch;
  return await fetchEntity('/api/users', {
    method: 'GET',
    headers: { Accept: 'application/json' }
  });
};

export const createUser = async (data: UserCreationPayload)
  : Promise<HttpResponse<{ user?: User, tokenId?: string } & ErrorResponse>> => {
  const trace = await getUserTrace();
  return await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ user: data, trace }),
    });
};

export const updateUser = async (data: {
  firstName: string;
  lastName: string;
}) : Promise<HttpResponse<{ user?: User } & ErrorResponse>> => {
  return await fetch('/api/users', {
      method: 'PUT',
      headers: { 'Content-type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ user: data }),
    });
};

export const updateUserPassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) : Promise<HttpResponse<{ user?: User } & ErrorResponse>> => {
  return await fetch('/api/users/password', {
      method: 'PUT',
      headers: { 'Content-type': 'application/json', Accept: 'application/json', },
      body: JSON.stringify({ ...data }),
    });
};

export const auth = async (email: string, password: string) => {
  const trace = await getUserTrace();
  return await fetch('/api/users/auth', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ email, password, trace }),
  });
};

export const logout = async (selection: LogoutSelectionType)
  : Promise<HttpResponse<{ user?: User } & ErrorResponse>> => {
    return await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ selection }),
    });
};

export const getUserTrace = async () : Promise<Trace> => {
  const trace = await (await fetch('https://ipinfo.io?token=d162c66cb8560f')).json();
  const { city, ip } = trace || {};
  const uag = navigator.userAgent;
  return { city: city || '', ip: ip || '', uag: uag || '' };
};
