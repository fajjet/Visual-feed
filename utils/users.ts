import { User } from "types";

export const getUserLastSeenDate = (user: User) => {
  const dates = user.sessions.map(user => user.lastSeenDate || 0).filter(d => !!d);
  return Math.min(...dates);
};
