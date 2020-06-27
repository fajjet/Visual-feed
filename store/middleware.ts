import { Dispatch, Action, Store } from 'redux';
import { TYPES } from './actions';

const middlewares = {};

middlewares[TYPES.SET_TITLE] = (store: Store, next: Dispatch, action: Action) => {
  next(action);
};

export default (store: Store) => (next: Dispatch) => (action: Action) => {
  middlewares[action.type] ? middlewares[action.type](store, next, action) : next(action);
};
