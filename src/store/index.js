
import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

//搭配chrome 的react调试工具
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
    //应用react-chunk 中间件
    applyMiddleware(thunkMiddleware)
);
//创建store
const store = createStore(reducer, enhancer);

export default store;