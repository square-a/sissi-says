import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRoutes } from 'redux-first-router';
import createHistory from 'history/createBrowserHistory';

import routes from './router/routes';
import routerOptions from './router/options';
import * as reducers from './reducers/index';

// Setup Redux Devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const history = createHistory();

const {
    reducer: locationReducer,
    middleware: locationMiddleware,
    enhancer: locationEnhancer,
} = connectRoutes(history, routes, routerOptions);

const middleware = applyMiddleware(locationMiddleware);

const store = createStore(
    combineReducers({ location: locationReducer, ...reducers }),
    composeEnhancers(locationEnhancer, middleware)
);

export default store;
