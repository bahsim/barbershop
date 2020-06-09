import { combineReducers, createStore, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import * as Global from './global';

const defaultState = {
  global: Global.defaultState,
};

const rootReducer = combineReducers({
  global: Global.reducer,
});

export function makeStore(initialState = defaultState) {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );

  return store;
}
