import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as chat from './chartDetail/reducer';
import * as header from "./header/reducer"
import thunk from 'redux-thunk';

console.log(header)
let store = createStore(
    combineReducers({ ...chat, ...header }),
    applyMiddleware(thunk)
);

export default store;