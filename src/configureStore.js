import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';

const loggerMiddleware = createLogger()

function configureStore(preloadedState) {
    return createStore(
        rootReducer, 
        preloadedState, 
        applyMiddleware(
            thunk, 
            loggerMiddleware)
        )
}

export default configureStore
