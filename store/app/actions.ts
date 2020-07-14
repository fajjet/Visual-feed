import ACTIONS, { AppActionTypes } from './types';
import { User } from "types";

// import { AnyAction } from "redux";

export const setTitle = (title: string): AppActionTypes => {
  return {
    type: ACTIONS.SET_TITLE,
    payload: { title }
  }
};

export const changeDimensions = (width: number, height: number): AppActionTypes => {
  return {
    type: ACTIONS.CHANGE_DIMENSIONS,
    payload: { width, height }
  }
};

export const setUser = (user: User | undefined): AppActionTypes => {
  return {
    type: ACTIONS.SET_USER,
    payload: { user }
  }
};
