import {createStore, applyMiddleware, Action, Middleware} from 'redux';
import thunk from 'redux-thunk';
import { MakeStore, Context, createWrapper } from 'next-redux-wrapper';
import { createLogger } from 'redux-logger';
import { State } from './initialState';

import reducers from './reducers';

const loggerIgnoreList: string[] = [];

const logger = createLogger({
  predicate: (getState: any, action: Action) => !loggerIgnoreList.includes(action.type)
});

const middlewares: Array<Middleware> = [thunk];

if (process.browser) middlewares.push(logger);

const makeStore: MakeStore<State> = (context: Context) => createStore(
  reducers,
  applyMiddleware(...middlewares.filter(item => !!item)),
);

export const wrapper = createWrapper<State>(makeStore);
