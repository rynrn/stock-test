import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import stocks from './reducers/stocks';
import stock from './reducers/stock';

const logger = createLogger();
const reducer = combineReducers({
	stocks,
	stock
});

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore);

// const createStoreWithMiddleware = applyMiddleware(
  // thunkMiddleware,
  // logger
// )(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}
