import { IUser } from "../models/user";

export const clearUserData = (user: IUser) => {
  if (!user) return null;
  return false;
};

export const capitalizeFirstLetter = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};
