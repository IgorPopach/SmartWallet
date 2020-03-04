import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { sessionReducer } from './session/reducer';
import { snackbarReducer } from './snackbar/reducer';
import { sidebarReducer } from './sidebar/reducer';

const rootReducer = combineReducers({
    session: sessionReducer,
    snackbar: snackbarReducer,
    sidebar: sidebarReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const configureStore = () => {
    const middleWares = [thunk];
    const middleWareEnhancer = applyMiddleware(...middleWares);

    const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer));

    return store;
};

export default configureStore;
