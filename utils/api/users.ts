
import { Trace } from "types";
import { parseTextResponseToJson } from "utils";

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

export const auth = async (email: string, password: string, trace: Trace) => {
    const { ip, uag } = trace;
    return await fetch('/api/users/auth', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email, password, ip, uag }),
    });
};

export const getUserTrace = async () => {
  const trace = await (await fetch('https://www.cloudflare.com/cdn-cgi/trace')).text();
  return parseTextResponseToJson(trace);
};
