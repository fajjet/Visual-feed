import { Trace } from "types";

export const createUser = async (data: any, trace: Trace) => {
    return await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        user: data,
        trace,
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

export const getUserTrace = async () : Promise<Trace> => {
  const trace = await (await fetch('http://www.geoplugin.net/json.gp')).json();
  const { geoplugin_city: city, geoplugin_request: ip } = trace || {};
  return { city, ip, uag: navigator.userAgent };
};
