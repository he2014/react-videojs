import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as chat from './chartDetail/reducer';
import thunk from 'redux-thunk';

let store = createStore(
    combineReducers({ ...chat }),
    applyMiddleware(thunk)
);

export default store;