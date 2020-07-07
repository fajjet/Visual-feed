import { createStore, applyMiddleware, Action } from 'redux';
import thunk from 'redux-thunk';
import { MakeStore, Context, createWrapper } from 'next-redux-wrapper';
// @ts-ignore
import { createLogger } from 'redux-logger';
import { State } from './initialState';

import reducers from './reducers';
// import initial from './initialState';
// import middleware from './middleware';

const loggerIgnoreList: string[] = [];

const logger = createLogger({
  predicate: (getState: any, action: Action) => !loggerIgnoreList.includes(action.type)
});

const middlewares = [thunk, process.browser && logger];

const makeStore: MakeStore<State> = (context: Context) => createStore(
  reducers,
  applyMiddleware(...middlewares.filter(item => !!item)),
);

// export an assembled wrapper
export const wrapper = createWrapper<State>(makeStore);
