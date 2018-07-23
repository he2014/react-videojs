import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as chat from './chartDetail/reducer';
import * as header from "./header/reducer"
import thunk from 'redux-thunk';
// redux-thunk中间件可以让action创建函数先不返回一个action对象，
//而是返回一个函数，函数传递两个参数(dispatch,getState),在函数体内进行业务逻辑的封装
//applyMiddleware方法主要是对redux的dispacth方法进行封装
//console.log(header)
let store = createStore(
    combineReducers({ ...chat, ...header }),
    applyMiddleware(thunk)
);

export default store;