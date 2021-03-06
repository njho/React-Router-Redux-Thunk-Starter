import {applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import common from './Reducers/common.js';

const reducer = combineReducers({
    common,
});

const middleware = applyMiddleware(thunk/*, localStorageMiddleware*/);

const store = createStore(reducer, middleware);

export default store;