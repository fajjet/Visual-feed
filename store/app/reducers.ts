import ACTION, { AppActionTypes } from './types';
import initialState, { State } from '../initialState';
import { AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

export default function AppReducer(
  state = initialState.app,
  action: AppActionTypes | AnyAction,
) : State['app'] {
  switch (action.type) {
    case HYDRATE: {
      const addState: any = {};
      const branchState = action.payload.app;
      const { user } = branchState;
      if (state.user === null && !user) addState.user = user;
      return {...branchState, ...addState };
    }
    case ACTION.SET_TITLE: {
      const { title } = action.payload;
      return {
        ...state,
        title,
      };
    }
    case ACTION.CHANGE_DIMENSIONS: {
      const { width, height } = action.payload;
      return {
        ...state,
        width,
        height,
      };
    }
    case ACTION.SET_USER: {
      const { user } = action.payload;
      if (user === null) return state;
      return {
        ...state,
        user,
      };
    }
    default: {
      return state;
    }
  }
}
