import { createStore, applyMiddleware, Action } from 'redux';
import thunk from 'redux-thunk';
// @ts-ignore
import { createLogger } from 'redux-logger';

import reducers from './reducers';
import initial from './initialState';
import middleware from './middleware';

const loggerIgnoreList: string[] = [];

const logger = createLogger({
  predicate: (getState: any, action: Action) => !loggerIgnoreList.includes(action.type)
});

const middlewares = [middleware, thunk, process.browser && logger];

export const initStore = (initialState = initial) => {
  return createStore(
    reducers,
    initialState,
    applyMiddleware(...middlewares.filter(item => !!item)),
  );
};
